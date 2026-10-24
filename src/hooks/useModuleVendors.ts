// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import type { VendorModuleId } from "@/lib/constants/modules";

// export interface ModuleVendorSummary {
//   vendorId: string;
//   businessName: string;
//   vendorType: VendorModuleId;
//   moduleId?: string;
//   verificationStatus: string;
//   isOpen?: boolean;
//   stateId?: string;
//   districtId?: string;
//   createdAt?: Date | null;
// }

// interface UseModuleVendorsOptions {
//   vendorType: VendorModuleId;
//   max?: number;
//   realtime?: boolean;
// }

// export function useModuleVendors(options: UseModuleVendorsOptions) {
//   const { vendorType, max = 50, realtime = true } = options;

//   const [vendors, setVendors] = useState<ModuleVendorSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const mapDoc = (id: string, data: Record<string, unknown>): ModuleVendorSummary => ({
//     vendorId: (data.vendorId as string) || id,
//     businessName: (data.businessName as string) || "—",
//     vendorType: (data.vendorType as VendorModuleId) || vendorType,
//     moduleId: data.moduleId as string | undefined,
//     verificationStatus: (data.verificationStatus as string) || "PENDING",
//     isOpen: data.isOpen as boolean | undefined,
//     stateId: data.stateId as string | undefined,
//     districtId: data.districtId as string | undefined,
//     createdAt: data.createdAt
//       ? (data.createdAt as { toDate?: () => Date }).toDate?.() ?? null
//       : null,
//   });

//   const buildQuery = useCallback(
//     () =>
//       query(
//         collection(db, "vendors"),
//         where("vendorType", "==", vendorType),
//         orderBy("createdAt", "desc"),
//         limit(max),
//       ),
//     [vendorType, max],
//   );

//   const refresh = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const snap = await getDocs(buildQuery());
//       setVendors(snap.docs.map((d) => mapDoc(d.id, d.data())));
//     } catch (err) {
//       console.error("useModuleVendors error:", err);
//       setError(err instanceof Error ? err.message : "Failed to load vendors");
//     } finally {
//       setLoading(false);
//     }
//   }, [buildQuery]);

//   useEffect(() => {
//     if (!realtime) {
//       void refresh();
//       return;
//     }

//     setLoading(true);
//     const unsub = onSnapshot(
//       buildQuery(),
//       (snap) => {
//         setVendors(snap.docs.map((d) => mapDoc(d.id, d.data())));
//         setLoading(false);
//         setError(null);
//       },
//       (err) => {
//         setError(err.message);
//         setLoading(false);
//       },
//     );
//     return () => unsub();
//   }, [buildQuery, realtime, refresh]);

//   return { vendors, loading, error, refresh };
// }

// src/hooks/useModuleVendors.ts


// "use client";

// import { useEffect, useState, useCallback } from "react";
// import {
//   collection,
//   query,
//   where,
//   limit,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import type { VendorModuleId } from "@/lib/constants/modules";

// export interface ModuleVendorSummary {
//   vendorId: string;
//   businessName: string;
//   vendorType: VendorModuleId;
//   moduleId?: string;
//   verificationStatus: string;
//   isOpen?: boolean;
//   stateId?: string;
//   districtId?: string;
//   createdAt?: Date | null;
// }

// interface Options {
//   vendorType: VendorModuleId;
//   max?: number;
// }

// export function useModuleVendors({ vendorType, max = 50 }: Options) {
//   const [vendors, setVendors] = useState<ModuleVendorSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const refresh = useCallback(() => setLoading(true), []);

//   useEffect(() => {
//     setLoading(true);
//     setError(null);

//     const q = query(
//       collection(db, "vendors"),
//       where("vendorType", "==", vendorType),
//       limit(max),
//     );

//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         const list: ModuleVendorSummary[] = snap.docs.map((d) => {
//           const data = d.data();
//           return {
//             vendorId: (data.vendorId as string) || d.id,
//             businessName: (data.businessName as string) || "—",
//             vendorType: (data.vendorType as VendorModuleId) || vendorType,
//             moduleId: data.moduleId as string | undefined,
//             verificationStatus: (data.verificationStatus as string) || "PENDING",
//             isOpen: data.isOpen as boolean | undefined,
//             stateId: data.stateId as string | undefined,
//             districtId: data.districtId as string | undefined,
//             createdAt: data.createdAt?.toDate?.() ?? null,
//           };
//         });

//         list.sort(
//           (a, b) =>
//             (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
//         );

//         setVendors(list);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("useModuleVendors:", err);
//         setError(err.message);
//         setLoading(false);
//       },
//     );

//     return () => unsub();
//   }, [vendorType, max]);

//   return { vendors, loading, error, refresh };
// }


"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export type VendorModuleId =
  | "FOOD"
  | "MART"
  | "PHARMACY"
  | "HOTELS"
  | "HALLS"
  | "MEETING_EVENT_HALL"
  | "PG"
  | "TOURISM"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | "JUCART"
  | string;

export interface ModuleVendorSummary {
  vendorId: string;
  businessName: string;
  vendorType: VendorModuleId;
  moduleId?: string;
  verificationStatus: string;
  isOpen?: boolean;
  stateId?: string;
  districtId?: string;
  createdAt?: Date | null;
}

interface Options {
  vendorType: VendorModuleId;
  max?: number;
}

export function useModuleVendors({ vendorType, max = 50 }: Options) {
  const [vendors, setVendors] = useState<ModuleVendorSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => setLoading(true), []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "vendors"),
      where("vendorType", "==", vendorType),
      limit(max)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: ModuleVendorSummary[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            vendorId: (data.vendorId as string) || d.id,
            businessName: (data.businessName as string) || "—",
            vendorType: (data.vendorType as VendorModuleId) || vendorType,
            moduleId: data.moduleId as string | undefined,
            verificationStatus:
              (data.verificationStatus as string) || "PENDING",
            isOpen: data.isOpen as boolean | undefined,
            stateId: data.stateId as string | undefined,
            districtId: data.districtId as string | undefined,
            createdAt: data.createdAt?.toDate?.() ?? null,
          };
        });

        list.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0)
        );

        setVendors(list);
        setLoading(false);
      },
      (err) => {
        console.error("useModuleVendors:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, [vendorType, max]);

  return { vendors, loading, error, refresh };
}