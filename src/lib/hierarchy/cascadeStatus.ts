// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CascadeStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// /** Only force children when parent is restricted */
// export function shouldCascadeToChildren(status: CascadeStatus): boolean {
//   return status === "INACTIVE" || status === "BLOCKED";
// }

// /**
//  * When a STATE becomes INACTIVE/BLOCKED:
//  * → all districts, pincodes, clusters, zones under that state get the same status.
//  */
// export async function cascadeStateStatus(
//   stateId: string,
//   status: CascadeStatus
// ): Promise<{ districts: number; pincodes: number; clusters: number; zones: number }> {
//   if (!shouldCascadeToChildren(status)) {
//     return { districts: 0, pincodes: 0, clusters: 0, zones: 0 };
//   }

//   const [districts, pincodes, clusters, zones] = await Promise.all([
//     getFilteredCollection(FIRESTORE_COLLECTIONS.DISTRICTS, [], undefined, 1000),
//     getFilteredCollection(FIRESTORE_COLLECTIONS.PINCODES, [], undefined, 2000),
//     getFilteredCollection(FIRESTORE_COLLECTIONS.CLUSTERS, [], undefined, 1000),
//     getFilteredCollection(FIRESTORE_COLLECTIONS.ZONES, [], undefined, 1000),
//   ]);

//   const stateDistricts = districts.filter(
//     (d) => String(d.stateId ?? "") === stateId
//   );
//   const districtIds = new Set(stateDistricts.map((d) => String(d.id)));

//   const statePincodes = pincodes.filter(
//     (p) =>
//       String(p.stateId ?? "") === stateId ||
//       districtIds.has(String(p.districtId ?? ""))
//   );
//   const stateClusters = clusters.filter(
//     (c) => String(c.stateId ?? "") === stateId
//   );
//   const stateZones = zones.filter((z) => String(z.stateId ?? "") === stateId);

//   await Promise.all([
//     ...stateDistricts.map((d) =>
//       updateDocument(FIRESTORE_COLLECTIONS.DISTRICTS, String(d.id), { status })
//     ),
//     ...statePincodes.map((p) =>
//       updateDocument(FIRESTORE_COLLECTIONS.PINCODES, String(p.id), { status })
//     ),
//     ...stateClusters.map((c) =>
//       updateDocument(FIRESTORE_COLLECTIONS.CLUSTERS, String(c.id), { status })
//     ),
//     ...stateZones.map((z) =>
//       updateDocument(FIRESTORE_COLLECTIONS.ZONES, String(z.id), { status })
//     ),
//   ]);

//   return {
//     districts: stateDistricts.length,
//     pincodes: statePincodes.length,
//     clusters: stateClusters.length,
//     zones: stateZones.length,
//   };
// }

// /**
//  * When a DISTRICT becomes INACTIVE/BLOCKED:
//  * → all pincodes under that district get the same status.
//  * (Clusters/zones linked only by districtId are also updated.)
//  */
// export async function cascadeDistrictStatus(
//   districtId: string,
//   status: CascadeStatus
// ): Promise<{ pincodes: number; clusters: number; zones: number }> {
//   if (!shouldCascadeToChildren(status)) {
//     return { pincodes: 0, clusters: 0, zones: 0 };
//   }

//   const [pincodes, clusters, zones] = await Promise.all([
//     getFilteredCollection(FIRESTORE_COLLECTIONS.PINCODES, [], undefined, 2000),
//     getFilteredCollection(FIRESTORE_COLLECTIONS.CLUSTERS, [], undefined, 1000),
//     getFilteredCollection(FIRESTORE_COLLECTIONS.ZONES, [], undefined, 1000),
//   ]);

//   const districtPincodes = pincodes.filter(
//     (p) => String(p.districtId ?? "") === districtId
//   );
//   const districtClusters = clusters.filter(
//     (c) => String(c.districtId ?? "") === districtId
//   );
//   const districtZones = zones.filter(
//     (z) => String(z.districtId ?? "") === districtId
//   );

//   await Promise.all([
//     ...districtPincodes.map((p) =>
//       updateDocument(FIRESTORE_COLLECTIONS.PINCODES, String(p.id), { status })
//     ),
//     ...districtClusters.map((c) =>
//       updateDocument(FIRESTORE_COLLECTIONS.CLUSTERS, String(c.id), { status })
//     ),
//     ...districtZones.map((z) =>
//       updateDocument(FIRESTORE_COLLECTIONS.ZONES, String(z.id), { status })
//     ),
//   ]);

//   return {
//     pincodes: districtPincodes.length,
//     clusters: districtClusters.length,
//     zones: districtZones.length,
//   };
// }

import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  updateDocument,
} from "@/lib/firebase/firestore";

export type CascadeStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export function shouldCascadeToChildren(status: CascadeStatus): boolean {
  return status === "INACTIVE" || status === "BLOCKED";
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function idsMatch(a: string, b: string): boolean {
  if (!a || !b) return false;
  return a === b || a.toLowerCase() === b.toLowerCase();
}

/**
 * STATE → INACTIVE/BLOCKED
 * cascades to districts, pincodes, clusters, zones under that state.
 */
export async function cascadeStateStatus(
  stateId: string,
  stateName: string,
  status: CascadeStatus
): Promise<{ districts: number; pincodes: number; clusters: number; zones: number }> {
  if (!shouldCascadeToChildren(status)) {
    return { districts: 0, pincodes: 0, clusters: 0, zones: 0 };
  }

  const [districts, pincodes, clusters, zones] = await Promise.all([
    getFilteredCollection(FIRESTORE_COLLECTIONS.DISTRICTS, [], undefined, 1000),
    getFilteredCollection(FIRESTORE_COLLECTIONS.PINCODES, [], undefined, 2000),
    getFilteredCollection(FIRESTORE_COLLECTIONS.CLUSTERS, [], undefined, 1000),
    getFilteredCollection(FIRESTORE_COLLECTIONS.ZONES, [], undefined, 1000),
  ]);

  const underState = (doc: Record<string, unknown>) => {
    const sid = str(doc.stateId);
    const sname = str(doc.stateName ?? doc.state);
    return (
      idsMatch(sid, stateId) ||
      idsMatch(sname, stateName) ||
      idsMatch(sname, stateId)
    );
  };

  const stateDistricts = districts.filter(underState);
  const districtIds = new Set(
    stateDistricts.map((d) => str(d.id) || str(d.districtId))
  );

  const statePincodes = pincodes.filter((p) => {
    if (underState(p)) return true;
    return districtIds.has(str(p.districtId));
  });

  const stateClusters = clusters.filter(underState);
  const stateZones = zones.filter(underState);

  await Promise.all([
    ...stateDistricts.map((d) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.DISTRICTS,
        str(d.id) || str(d.districtId),
        { status }
      )
    ),
    ...statePincodes.map((p) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.PINCODES,
        str(p.id) || str(p.pincode),
        { status }
      )
    ),
    ...stateClusters.map((c) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.CLUSTERS,
        str(c.id) || str(c.clusterId),
        { status }
      )
    ),
    ...stateZones.map((z) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.ZONES,
        str(z.id) || str(z.zoneId),
        { status }
      )
    ),
  ]);

  return {
    districts: stateDistricts.length,
    pincodes: statePincodes.length,
    clusters: stateClusters.length,
    zones: stateZones.length,
  };
}

/**
 * DISTRICT → INACTIVE/BLOCKED
 * cascades to pincodes, clusters, zones under that district.
 */
export async function cascadeDistrictStatus(
  districtId: string,
  districtName: string,
  status: CascadeStatus
): Promise<{ pincodes: number; clusters: number; zones: number }> {
  if (!shouldCascadeToChildren(status)) {
    return { pincodes: 0, clusters: 0, zones: 0 };
  }

  const [pincodes, clusters, zones] = await Promise.all([
    getFilteredCollection(FIRESTORE_COLLECTIONS.PINCODES, [], undefined, 2000),
    getFilteredCollection(FIRESTORE_COLLECTIONS.CLUSTERS, [], undefined, 1000),
    getFilteredCollection(FIRESTORE_COLLECTIONS.ZONES, [], undefined, 1000),
  ]);

  const underDistrict = (doc: Record<string, unknown>) => {
    const did = str(doc.districtId);
    const dname = str(doc.districtName ?? doc.district);
    return (
      idsMatch(did, districtId) ||
      idsMatch(dname, districtName) ||
      idsMatch(dname, districtId)
    );
  };

  const districtPincodes = pincodes.filter(underDistrict);
  const districtClusters = clusters.filter(underDistrict);
  const districtZones = zones.filter(underDistrict);

  await Promise.all([
    ...districtPincodes.map((p) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.PINCODES,
        str(p.id) || str(p.pincode),
        { status }
      )
    ),
    ...districtClusters.map((c) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.CLUSTERS,
        str(c.id) || str(c.clusterId),
        { status }
      )
    ),
    ...districtZones.map((z) =>
      updateDocument(
        FIRESTORE_COLLECTIONS.ZONES,
        str(z.id) || str(z.zoneId),
        { status }
      )
    ),
  ]);

  return {
    pincodes: districtPincodes.length,
    clusters: districtClusters.length,
    zones: districtZones.length,
  };
}