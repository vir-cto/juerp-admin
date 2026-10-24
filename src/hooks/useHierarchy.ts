// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type HierarchyStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// export type HierarchyNode = {
//   id: string;
//   name: string;
//   type: "State" | "District" | "Pincode" | "Cluster" | "Zone" | string;
//   status: HierarchyStatus;
//   parent: string;
//   children: number;
//   vendors: number;
//   captains: number;
//   customers: number;
//   orders: number;
//   updatedAt: string;
// };

// export type ClusterStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ClusterType =
//   | "STATE_CLUSTER"
//   | "DISTRICT_CLUSTER"
//   | "PINCODE_CLUSTER"
//   | "OPERATIONAL_CLUSTER"
//   | string;

// export type Cluster = {
//   clusterId: string;
//   clusterName: string;
//   clusterType: ClusterType;
//   status: ClusterStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ZoneStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ZoneType =
//   | "STATE_ZONE"
//   | "DISTRICT_ZONE"
//   | "OPERATIONAL_ZONE"
//   | "SERVICE_ZONE"
//   | string;

// export type Zone = {
//   zoneId: string;
//   zoneName: string;
//   zoneType: ZoneType;
//   status: ZoneStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   clusterCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function asStatus(value: unknown): HierarchyStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED") return s;
//   return "ACTIVE";
// }

// function parsePincodes(raw: Record<string, unknown>): string[] {
//   const src = raw.pincodes ?? raw.pincodeList ?? raw.pins;
//   if (Array.isArray(src)) {
//     return src.map((p) => str(p, "")).filter(Boolean);
//   }
//   if (typeof src === "string" && src.trim()) return [src.trim()];
//   return [];
// }

// function mapState(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.stateId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.stateName, raw.id),
//     type: "State",
//     status: asStatus(raw.status),
//     parent: str(raw.parent ?? raw.country, "India"),
//     children: num(raw.children ?? raw.districtCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapDistrict(
//   raw: Record<string, unknown> & { id: string }
// ): HierarchyNode {
//   return {
//     id: str(raw.districtId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.districtName, raw.id),
//     type: "District",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.children ?? raw.pincodeCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapPincode(
//   raw: Record<string, unknown> & { id: string }
// ): HierarchyNode {
//   return {
//     id: str(raw.pincode ?? raw.id, raw.id),
//     name: str(raw.pincode ?? raw.name ?? raw.id, raw.id),
//     type: "Pincode",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.parent, "—"),
//     children: num(raw.children),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapClusterNode(
//   raw: Record<string, unknown> & { id: string }
// ): HierarchyNode {
//   return {
//     id: str(raw.clusterId ?? raw.id, raw.id),
//     name: str(raw.clusterName ?? raw.name, raw.id),
//     type: "Cluster",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZoneNode(
//   raw: Record<string, unknown> & { id: string }
// ): HierarchyNode {
//   return {
//     id: str(raw.zoneId ?? raw.id, raw.id),
//     name: str(raw.zoneName ?? raw.name, raw.id),
//     type: "Zone",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapCluster(raw: Record<string, unknown> & { id: string }): Cluster {
//   return {
//     clusterId: str(raw.clusterId ?? raw.id, raw.id),
//     clusterName: str(raw.clusterName ?? raw.name, raw.id),
//     clusterType: str(raw.clusterType ?? raw.type, "OPERATIONAL_CLUSTER"),
//     status: asStatus(raw.status) as ClusterStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZone(raw: Record<string, unknown> & { id: string }): Zone {
//   return {
//     zoneId: str(raw.zoneId ?? raw.id, raw.id),
//     zoneName: str(raw.zoneName ?? raw.name, raw.id),
//     zoneType: str(raw.zoneType ?? raw.type, "OPERATIONAL_ZONE"),
//     status: asStatus(raw.status) as ZoneStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     clusterCount: num(raw.clusterCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// /** Unified hierarchy overview (states + districts + pincodes + clusters + zones) */
// export function useHierarchy(pollMs = 30000) {
//   const [nodes, setNodes] = useState<HierarchyNode[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setNodes([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [states, districts, pincodes, clusters, zones] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.STATES ?? "states",
//           [],
//           undefined,
//           200
//         ).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.DISTRICTS ?? "districts",
//           [],
//           undefined,
//           500
//         ).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.PINCODES ?? "pincodes",
//           [],
//           undefined,
//           500
//         ).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CLUSTERS ?? "clusters",
//           [],
//           undefined,
//           200
//         ).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ZONES ?? "zones",
//           [],
//           undefined,
//           200
//         ).catch(() => []),
//       ]);

//       const mapped: HierarchyNode[] = [
//         ...states.map(mapState),
//         ...districts.map(mapDistrict),
//         ...pincodes.map(mapPincode),
//         ...clusters.map(mapClusterNode),
//         ...zones.map(mapZoneNode),
//       ];

//       setNodes(mapped);
//     } catch (err) {
//       console.error("useHierarchy error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load hierarchy from Firestore."
//       );
//       setNodes([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { nodes, loading, error, demoMode, refresh: load };
// }

// /** Clusters only */
// export function useClusters(pollMs = 30000) {
//   const [clusters, setClusters] = useState<Cluster[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setClusters([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CLUSTERS ?? "clusters",
//         [],
//         undefined,
//         300
//       );
//       setClusters(docs.map(mapCluster));
//     } catch (err) {
//       console.error("useClusters error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load clusters from Firestore."
//       );
//       setClusters([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { clusters, loading, error, demoMode, refresh: load };
// }

// /** Zones only */
// export function useZones(pollMs = 30000) {
//   const [zones, setZones] = useState<Zone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setZones([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.ZONES ?? "zones",
//         [],
//         undefined,
//         300
//       );
//       setZones(docs.map(mapZone));
//     } catch (err) {
//       console.error("useZones error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load zones from Firestore."
//       );
//       setZones([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { zones, loading, error, demoMode, refresh: load };
// }

// export default useHierarchy;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type HierarchyStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// export type HierarchyNode = {
//   id: string;
//   name: string;
//   type: string;
//   status: HierarchyStatus;
//   parent: string;
//   children: number;
//   vendors: number;
//   captains: number;
//   customers: number;
//   orders: number;
//   updatedAt: string;
// };

// export type ClusterStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ClusterType =
//   | "STATE_CLUSTER"
//   | "DISTRICT_CLUSTER"
//   | "PINCODE_CLUSTER"
//   | "OPERATIONAL_CLUSTER"
//   | string;

// export type Cluster = {
//   clusterId: string;
//   clusterName: string;
//   clusterType: ClusterType;
//   status: ClusterStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ZoneStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ZoneType =
//   | "STATE_ZONE"
//   | "DISTRICT_ZONE"
//   | "OPERATIONAL_ZONE"
//   | "SERVICE_ZONE"
//   | string;

// export type Zone = {
//   zoneId: string;
//   zoneName: string;
//   zoneType: ZoneType;
//   status: ZoneStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   clusterCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function asStatus(value: unknown): HierarchyStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED") return s;
//   return "ACTIVE";
// }

// function parsePincodes(raw: Record<string, unknown>): string[] {
//   const src = raw.pincodes ?? raw.pincodeList ?? raw.pins;
//   if (Array.isArray(src)) return src.map((p) => str(p, "")).filter(Boolean);
//   if (typeof src === "string" && src.trim()) return [src.trim()];
//   return [];
// }

// function col(name: string, fallback: string) {
//   const c = (FIRESTORE_COLLECTIONS as Record<string, string | undefined>)[name];
//   return c || fallback;
// }

// function mapState(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.stateId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.stateName, raw.id),
//     type: "State",
//     status: asStatus(raw.status),
//     parent: str(raw.parent ?? raw.country, "India"),
//     children: num(raw.children ?? raw.districtCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapDistrict(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.districtId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.districtName, raw.id),
//     type: "District",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.children ?? raw.pincodeCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapPincode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.pincode ?? raw.id, raw.id),
//     name: str(raw.pincode ?? raw.name ?? raw.id, raw.id),
//     type: "Pincode",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.parent, "—"),
//     children: num(raw.children),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapClusterNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.clusterId ?? raw.id, raw.id),
//     name: str(raw.clusterName ?? raw.name, raw.id),
//     type: "Cluster",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZoneNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.zoneId ?? raw.id, raw.id),
//     name: str(raw.zoneName ?? raw.name, raw.id),
//     type: "Zone",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapCluster(raw: Record<string, unknown> & { id: string }): Cluster {
//   return {
//     clusterId: str(raw.clusterId ?? raw.id, raw.id),
//     clusterName: str(raw.clusterName ?? raw.name, raw.id),
//     clusterType: str(raw.clusterType ?? raw.type, "OPERATIONAL_CLUSTER"),
//     status: asStatus(raw.status) as ClusterStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZone(raw: Record<string, unknown> & { id: string }): Zone {
//   return {
//     zoneId: str(raw.zoneId ?? raw.id, raw.id),
//     zoneName: str(raw.zoneName ?? raw.name, raw.id),
//     zoneType: str(raw.zoneType ?? raw.type, "OPERATIONAL_ZONE"),
//     status: asStatus(raw.status) as ZoneStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     clusterCount: num(raw.clusterCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// export function useHierarchy(pollMs = 30000) {
//   const [nodes, setNodes] = useState<HierarchyNode[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setNodes([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [states, districts, pincodes, clusters, zones] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(col("STATES", "states"), [], undefined, 200).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(col("DISTRICTS", "districts"), [], undefined, 500).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(col("PINCODES", "pincodes"), [], undefined, 500).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(col("CLUSTERS", "clusters"), [], undefined, 200).catch(() => []),
//         getFilteredCollection<Record<string, unknown>>(col("ZONES", "zones"), [], undefined, 200).catch(() => []),
//       ]);
//       setNodes([
//         ...states.map(mapState),
//         ...districts.map(mapDistrict),
//         ...pincodes.map(mapPincode),
//         ...clusters.map(mapClusterNode),
//         ...zones.map(mapZoneNode),
//       ]);
//     } catch (err) {
//       console.error("useHierarchy error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load hierarchy.");
//       setNodes([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { nodes, loading, error, demoMode, refresh: load };
// }

// export function useClusters(pollMs = 30000) {
//   const [clusters, setClusters] = useState<Cluster[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setClusters([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         col("CLUSTERS", "clusters"),
//         [],
//         undefined,
//         300
//       );
//       setClusters(docs.map(mapCluster));
//     } catch (err) {
//       console.error("useClusters error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load clusters.");
//       setClusters([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { clusters, loading, error, demoMode, refresh: load };
// }

// export function useZones(pollMs = 30000) {
//   const [zones, setZones] = useState<Zone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setZones([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         col("ZONES", "zones"),
//         [],
//         undefined,
//         300
//       );
//       setZones(docs.map(mapZone));
//     } catch (err) {
//       console.error("useZones error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load zones.");
//       setZones([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { zones, loading, error, demoMode, refresh: load };
// }

// export default useHierarchy;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type HierarchyStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// export type HierarchyNode = {
//   id: string;
//   name: string;
//   type: string;
//   status: HierarchyStatus;
//   parent: string;
//   children: number;
//   vendors: number;
//   captains: number;
//   customers: number;
//   orders: number;
//   updatedAt: string;
// };

// export type StateRecord = {
//   stateId: string;
//   stateName: string;
//   status: HierarchyStatus;
//   country: string;
//   districtCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   code: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type DistrictRecord = {
//   districtId: string;
//   districtName: string;
//   status: HierarchyStatus;
//   stateId: string;
//   stateName: string;
//   pincodeCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   code: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type PincodeRecord = {
//   pincodeId: string;
//   pincode: string;
//   status: HierarchyStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   areaName: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ClusterStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ClusterType =
//   | "STATE_CLUSTER"
//   | "DISTRICT_CLUSTER"
//   | "PINCODE_CLUSTER"
//   | "OPERATIONAL_CLUSTER"
//   | string;

// export type Cluster = {
//   clusterId: string;
//   clusterName: string;
//   clusterType: ClusterType;
//   status: ClusterStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// export type ZoneStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
// export type ZoneType =
//   | "STATE_ZONE"
//   | "DISTRICT_ZONE"
//   | "OPERATIONAL_ZONE"
//   | "SERVICE_ZONE"
//   | string;

// export type Zone = {
//   zoneId: string;
//   zoneName: string;
//   zoneType: ZoneType;
//   status: ZoneStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   clusterCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// }

// function asStatus(value: unknown): HierarchyStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED") return s;
//   return "ACTIVE";
// }

// function parsePincodes(raw: Record<string, unknown>): string[] {
//   const src = raw.pincodes ?? raw.pincodeList ?? raw.pins;
//   if (Array.isArray(src)) return src.map((p) => str(p, "")).filter(Boolean);
//   if (typeof src === "string" && src.trim()) return [src.trim()];
//   return [];
// }

// function col(name: string, fallback: string): string {
//   const c = (FIRESTORE_COLLECTIONS as Record<string, string | undefined>)[name];
//   return c || fallback;
// }

// /**
//  * Safe loader — works whether getFilteredCollection is (name) or (name, filters, order, limit).
//  * Avoids TS arity errors by calling through a loosely typed wrapper.
//  */
// async function loadCollection(
//   collectionName: string
// ): Promise<Array<Record<string, unknown> & { id: string }>> {
//   const fn = getFilteredCollection as (
//     ...args: unknown[]
//   ) => Promise<Array<Record<string, unknown> & { id: string }>>;

//   try {
//     // Prefer (name, filters, orderBy, limit) if supported
//     const result = await fn(collectionName, [], undefined, 500);
//     return Array.isArray(result) ? result : [];
//   } catch {
//     try {
//       // Fallback: (name) only
//       const result = await fn(collectionName);
//       return Array.isArray(result) ? result : [];
//     } catch (err) {
//       console.error(`loadCollection(${collectionName}) failed:`, err);
//       return [];
//     }
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Mappers                                                                    */
// /* -------------------------------------------------------------------------- */

// function mapState(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.stateId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.stateName, raw.id),
//     type: "State",
//     status: asStatus(raw.status),
//     parent: str(raw.parent ?? raw.country, "India"),
//     children: num(raw.children ?? raw.districtCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapDistrict(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.districtId ?? raw.id, raw.id),
//     name: str(raw.name ?? raw.districtName, raw.id),
//     type: "District",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.children ?? raw.pincodeCount),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapPincode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.pincode ?? raw.id, raw.id),
//     name: str(raw.pincode ?? raw.name ?? raw.id, raw.id),
//     type: "Pincode",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.parent, "—"),
//     children: num(raw.children),
//     vendors: num(raw.vendors ?? raw.vendorCount),
//     captains: num(raw.captains ?? raw.captainCount),
//     customers: num(raw.customers ?? raw.customerCount),
//     orders: num(raw.orders ?? raw.orderCount),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapClusterNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.clusterId ?? raw.id, raw.id),
//     name: str(raw.clusterName ?? raw.name, raw.id),
//     type: "Cluster",
//     status: asStatus(raw.status),
//     parent: str(raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZoneNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
//   return {
//     id: str(raw.zoneId ?? raw.id, raw.id),
//     name: str(raw.zoneName ?? raw.name, raw.id),
//     type: "Zone",
//     status: asStatus(raw.status),
//     parent: str(raw.districtName ?? raw.stateName ?? raw.parent, "—"),
//     children: num(raw.nodeCount ?? raw.children),
//     vendors: num(raw.vendorCount ?? raw.vendors),
//     captains: num(raw.captainCount ?? raw.captains),
//     customers: num(raw.customerCount ?? raw.customers),
//     orders: num(raw.orderCount ?? raw.orders),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapStateRecord(raw: Record<string, unknown> & { id: string }): StateRecord {
//   return {
//     stateId: str(raw.stateId ?? raw.id, raw.id),
//     stateName: str(raw.name ?? raw.stateName, raw.id),
//     status: asStatus(raw.status),
//     country: str(raw.country ?? raw.parent, "India"),
//     districtCount: num(raw.districtCount ?? raw.children),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     code: str(raw.code ?? raw.stateCode, "—"),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapDistrictRecord(
//   raw: Record<string, unknown> & { id: string }
// ): DistrictRecord {
//   return {
//     districtId: str(raw.districtId ?? raw.id, raw.id),
//     districtName: str(raw.name ?? raw.districtName, raw.id),
//     status: asStatus(raw.status),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     pincodeCount: num(raw.pincodeCount ?? raw.children),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     code: str(raw.code ?? raw.districtCode, "—"),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapPincodeRecord(
//   raw: Record<string, unknown> & { id: string }
// ): PincodeRecord {
//   return {
//     pincodeId: str(raw.id, raw.id),
//     pincode: str(raw.pincode ?? raw.name ?? raw.id, raw.id),
//     status: asStatus(raw.status),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     areaName: str(raw.areaName ?? raw.area ?? raw.locality, "—"),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapCluster(raw: Record<string, unknown> & { id: string }): Cluster {
//   return {
//     clusterId: str(raw.clusterId ?? raw.id, raw.id),
//     clusterName: str(raw.clusterName ?? raw.name, raw.id),
//     clusterType: str(raw.clusterType ?? raw.type, "OPERATIONAL_CLUSTER"),
//     status: asStatus(raw.status) as ClusterStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapZone(raw: Record<string, unknown> & { id: string }): Zone {
//   return {
//     zoneId: str(raw.zoneId ?? raw.id, raw.id),
//     zoneName: str(raw.zoneName ?? raw.name, raw.id),
//     zoneType: str(raw.zoneType ?? raw.type, "OPERATIONAL_ZONE"),
//     status: asStatus(raw.status) as ZoneStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: raw.districtId ? str(raw.districtId) : undefined,
//     districtName: raw.districtName ? str(raw.districtName) : undefined,
//     pincodes: parsePincodes(raw),
//     description: str(raw.description, "—"),
//     nodeCount: num(raw.nodeCount),
//     clusterCount: num(raw.clusterCount),
//     vendorCount: num(raw.vendorCount ?? raw.vendors),
//     captainCount: num(raw.captainCount ?? raw.captains),
//     customerCount: num(raw.customerCount ?? raw.customers),
//     orderCount: num(raw.orderCount ?? raw.orders),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Hooks                                                                      */
// /* -------------------------------------------------------------------------- */

// export function useHierarchy(pollMs = 30000) {
//   const [nodes, setNodes] = useState<HierarchyNode[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setNodes([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [states, districts, pincodes, clusters, zones] = await Promise.all([
//         loadCollection(col("STATES", "states")),
//         loadCollection(col("DISTRICTS", "districts")),
//         loadCollection(col("PINCODES", "pincodes")),
//         loadCollection(col("CLUSTERS", "clusters")),
//         loadCollection(col("ZONES", "zones")),
//       ]);
//       setNodes([
//         ...states.map(mapState),
//         ...districts.map(mapDistrict),
//         ...pincodes.map(mapPincode),
//         ...clusters.map(mapClusterNode),
//         ...zones.map(mapZoneNode),
//       ]);
//     } catch (err) {
//       console.error("useHierarchy error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load hierarchy.");
//       setNodes([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { nodes, loading, error, demoMode, refresh: load };
// }

// export function useStates(pollMs = 30000) {
//   const [states, setStates] = useState<StateRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setStates([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await loadCollection(col("STATES", "states"));
//       setStates(docs.map(mapStateRecord));
//     } catch (err) {
//       console.error("useStates error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load states.");
//       setStates([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { states, loading, error, demoMode, refresh: load };
// }

// export function useDistricts(pollMs = 30000) {
//   const [districts, setDistricts] = useState<DistrictRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setDistricts([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await loadCollection(col("DISTRICTS", "districts"));
//       setDistricts(docs.map(mapDistrictRecord));
//     } catch (err) {
//       console.error("useDistricts error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load districts.");
//       setDistricts([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { districts, loading, error, demoMode, refresh: load };
// }

// export function usePincodes(pollMs = 30000) {
//   const [pincodes, setPincodes] = useState<PincodeRecord[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setPincodes([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await loadCollection(col("PINCODES", "pincodes"));
//       setPincodes(docs.map(mapPincodeRecord));
//     } catch (err) {
//       console.error("usePincodes error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load pincodes.");
//       setPincodes([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { pincodes, loading, error, demoMode, refresh: load };
// }

// export function useClusters(pollMs = 30000) {
//   const [clusters, setClusters] = useState<Cluster[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setClusters([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await loadCollection(col("CLUSTERS", "clusters"));
//       setClusters(docs.map(mapCluster));
//     } catch (err) {
//       console.error("useClusters error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load clusters.");
//       setClusters([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { clusters, loading, error, demoMode, refresh: load };
// }

// export function useZones(pollMs = 30000) {
//   const [zones, setZones] = useState<Zone[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setZones([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const docs = await loadCollection(col("ZONES", "zones"));
//       setZones(docs.map(mapZone));
//     } catch (err) {
//       console.error("useZones error:", err);
//       setError(err instanceof Error ? err.message : "Unable to load zones.");
//       setZones([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { zones, loading, error, demoMode, refresh: load };
// }

// export default useHierarchy;

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type HierarchyStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type HierarchyNode = {
  id: string;
  name: string;
  type: string;
  status: HierarchyStatus;
  parent: string;
  children: number;
  vendors: number;
  captains: number;
  customers: number;
  orders: number;
  updatedAt: string;
};

export type StateRecord = {
  stateId: string;
  stateName: string;
  status: HierarchyStatus;
  country: string;
  districtCount: number;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type DistrictRecord = {
  districtId: string;
  districtName: string;
  status: HierarchyStatus;
  stateId: string;
  stateName: string;
  pincodeCount: number;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  code: string;
  createdAt: string;
  updatedAt: string;
};

export type PincodeRecord = {
  pincodeId: string;
  pincode: string;
  status: HierarchyStatus;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  areaName: string;
  createdAt: string;
  updatedAt: string;
};

export type ClusterStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type ClusterType =
  | "STATE_CLUSTER"
  | "DISTRICT_CLUSTER"
  | "PINCODE_CLUSTER"
  | "OPERATIONAL_CLUSTER"
  | string;

export type Cluster = {
  clusterId: string;
  clusterName: string;
  clusterType: ClusterType;
  status: ClusterStatus;
  stateId: string;
  stateName: string;
  districtId?: string;
  districtName?: string;
  pincodes: string[];
  description: string;
  nodeCount: number;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
};

export type ZoneStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";
export type ZoneType =
  | "STATE_ZONE"
  | "DISTRICT_ZONE"
  | "OPERATIONAL_ZONE"
  | "SERVICE_ZONE"
  | string;

export type Zone = {
  zoneId: string;
  zoneName: string;
  zoneType: ZoneType;
  status: ZoneStatus;
  stateId: string;
  stateName: string;
  districtId?: string;
  districtName?: string;
  pincodes: string[];
  description: string;
  nodeCount: number;
  clusterCount: number;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  createdAt: string;
  updatedAt: string;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function num(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function timestampLabel(value: unknown): string {
  let ms = 0;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      ms = (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      ms = 0;
    }
  } else if (value instanceof Date) {
    ms = value.getTime();
  } else if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) ms = d.getTime();
  }
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function asStatus(value: unknown): HierarchyStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "BLOCKED") return s;
  return "ACTIVE";
}

function parsePincodes(raw: Record<string, unknown>): string[] {
  const src = raw.pincodes ?? raw.pincodeList ?? raw.pins;
  if (Array.isArray(src)) return src.map((p) => str(p, "")).filter(Boolean);
  if (typeof src === "string" && src.trim()) return [src.trim()];
  return [];
}

function col(name: string, fallback: string): string {
  const c = (FIRESTORE_COLLECTIONS as Record<string, string | undefined>)[name];
  return c || fallback;
}

async function loadCollection(
  collectionName: string
): Promise<Array<Record<string, unknown> & { id: string }>> {
  const fn = getFilteredCollection as (
    ...args: unknown[]
  ) => Promise<Array<Record<string, unknown> & { id: string }>>;

  try {
    const result = await fn(collectionName, [], undefined, 500);
    return Array.isArray(result) ? result : [];
  } catch {
    try {
      const result = await fn(collectionName);
      return Array.isArray(result) ? result : [];
    } catch (err) {
      console.error(`loadCollection(${collectionName}) failed:`, err);
      return [];
    }
  }
}

function idsMatch(a: string, b: string): boolean {
  if (!a || !b || a === "—" || b === "—") return false;
  return a === b || a.toLowerCase() === b.toLowerCase();
}

/* -------------------------------------------------------------------------- */
/* Mappers                                                                    */
/* -------------------------------------------------------------------------- */

function mapState(raw: Record<string, unknown> & { id: string }): HierarchyNode {
  return {
    id: str(raw.stateId ?? raw.id, raw.id),
    name: str(raw.name ?? raw.stateName, raw.id),
    type: "State",
    status: asStatus(raw.status),
    parent: str(raw.parent ?? raw.country, "India"),
    children: num(raw.children ?? raw.districtCount),
    vendors: num(raw.vendors ?? raw.vendorCount),
    captains: num(raw.captains ?? raw.captainCount),
    customers: num(raw.customers ?? raw.customerCount),
    orders: num(raw.orders ?? raw.orderCount),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapDistrict(raw: Record<string, unknown> & { id: string }): HierarchyNode {
  return {
    id: str(raw.districtId ?? raw.id, raw.id),
    name: str(raw.name ?? raw.districtName, raw.id),
    type: "District",
    status: asStatus(raw.status),
    parent: str(raw.stateName ?? raw.parent, "—"),
    children: num(raw.children ?? raw.pincodeCount),
    vendors: num(raw.vendors ?? raw.vendorCount),
    captains: num(raw.captains ?? raw.captainCount),
    customers: num(raw.customers ?? raw.customerCount),
    orders: num(raw.orders ?? raw.orderCount),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapPincode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
  return {
    id: str(raw.pincode ?? raw.id, raw.id),
    name: str(raw.areaName ?? raw.pincode ?? raw.name ?? raw.id, raw.id),
    type: "Pincode",
    status: asStatus(raw.status),
    parent: str(raw.districtName ?? raw.parent, "—"),
    children: num(raw.children),
    vendors: num(raw.vendors ?? raw.vendorCount),
    captains: num(raw.captains ?? raw.captainCount),
    customers: num(raw.customers ?? raw.customerCount),
    orders: num(raw.orders ?? raw.orderCount),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapClusterNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
  return {
    id: str(raw.clusterId ?? raw.id, raw.id),
    name: str(raw.clusterName ?? raw.name, raw.id),
    type: "Cluster",
    status: asStatus(raw.status),
    parent: str(raw.stateName ?? raw.parent, "—"),
    children: num(raw.nodeCount ?? raw.children),
    vendors: num(raw.vendorCount ?? raw.vendors),
    captains: num(raw.captainCount ?? raw.captains),
    customers: num(raw.customerCount ?? raw.customers),
    orders: num(raw.orderCount ?? raw.orders),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapZoneNode(raw: Record<string, unknown> & { id: string }): HierarchyNode {
  return {
    id: str(raw.zoneId ?? raw.id, raw.id),
    name: str(raw.zoneName ?? raw.name, raw.id),
    type: "Zone",
    status: asStatus(raw.status),
    parent: str(raw.districtName ?? raw.stateName ?? raw.parent, "—"),
    children: num(raw.nodeCount ?? raw.children),
    vendors: num(raw.vendorCount ?? raw.vendors),
    captains: num(raw.captainCount ?? raw.captains),
    customers: num(raw.customerCount ?? raw.customers),
    orders: num(raw.orderCount ?? raw.orders),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapStateRecord(raw: Record<string, unknown> & { id: string }): StateRecord {
  return {
    stateId: str(raw.stateId ?? raw.id, raw.id),
    stateName: str(raw.name ?? raw.stateName, raw.id),
    status: asStatus(raw.status),
    country: str(raw.country ?? raw.parent, "India"),
    districtCount: num(raw.districtCount ?? raw.children),
    vendorCount: num(raw.vendorCount ?? raw.vendors),
    captainCount: num(raw.captainCount ?? raw.captains),
    customerCount: num(raw.customerCount ?? raw.customers),
    orderCount: num(raw.orderCount ?? raw.orders),
    code: str(raw.code ?? raw.stateCode, "—"),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapDistrictRecord(
  raw: Record<string, unknown> & { id: string }
): DistrictRecord {
  return {
    districtId: str(raw.districtId ?? raw.id, raw.id),
    districtName: str(raw.name ?? raw.districtName, raw.id),
    status: asStatus(raw.status),
    stateId: str(raw.stateId, "—"),
    stateName: str(raw.stateName ?? raw.state, "—"),
    pincodeCount: num(raw.pincodeCount ?? raw.children),
    vendorCount: num(raw.vendorCount ?? raw.vendors),
    captainCount: num(raw.captainCount ?? raw.captains),
    customerCount: num(raw.customerCount ?? raw.customers),
    orderCount: num(raw.orderCount ?? raw.orders),
    code: str(raw.code ?? raw.districtCode, "—"),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapPincodeRecord(
  raw: Record<string, unknown> & { id: string }
): PincodeRecord {
  return {
    pincodeId: str(raw.id, raw.id),
    pincode: str(raw.pincode ?? raw.name ?? raw.id, raw.id),
    status: asStatus(raw.status),
    stateId: str(raw.stateId, "—"),
    stateName: str(raw.stateName ?? raw.state, "—"),
    districtId: str(raw.districtId, "—"),
    districtName: str(raw.districtName ?? raw.district, "—"),
    vendorCount: num(raw.vendorCount ?? raw.vendors),
    captainCount: num(raw.captainCount ?? raw.captains),
    customerCount: num(raw.customerCount ?? raw.customers),
    orderCount: num(raw.orderCount ?? raw.orders),
    areaName: str(raw.areaName ?? raw.area ?? raw.locality, "—"),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapCluster(raw: Record<string, unknown> & { id: string }): Cluster {
  return {
    clusterId: str(raw.clusterId ?? raw.id, raw.id),
    clusterName: str(raw.clusterName ?? raw.name, raw.id),
    clusterType: str(raw.clusterType ?? raw.type, "OPERATIONAL_CLUSTER"),
    status: asStatus(raw.status) as ClusterStatus,
    stateId: str(raw.stateId, "—"),
    stateName: str(raw.stateName ?? raw.state, "—"),
    districtId: raw.districtId ? str(raw.districtId) : undefined,
    districtName: raw.districtName ? str(raw.districtName) : undefined,
    pincodes: parsePincodes(raw),
    description: str(raw.description, "—"),
    nodeCount: num(raw.nodeCount),
    vendorCount: num(raw.vendorCount ?? raw.vendors),
    captainCount: num(raw.captainCount ?? raw.captains),
    customerCount: num(raw.customerCount ?? raw.customers),
    orderCount: num(raw.orderCount ?? raw.orders),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

function mapZone(raw: Record<string, unknown> & { id: string }): Zone {
  return {
    zoneId: str(raw.zoneId ?? raw.id, raw.id),
    zoneName: str(raw.zoneName ?? raw.name, raw.id),
    zoneType: str(raw.zoneType ?? raw.type, "OPERATIONAL_ZONE"),
    status: asStatus(raw.status) as ZoneStatus,
    stateId: str(raw.stateId, "—"),
    stateName: str(raw.stateName ?? raw.state, "—"),
    districtId: raw.districtId ? str(raw.districtId) : undefined,
    districtName: raw.districtName ? str(raw.districtName) : undefined,
    pincodes: parsePincodes(raw),
    description: str(raw.description, "—"),
    nodeCount: num(raw.nodeCount),
    clusterCount: num(raw.clusterCount),
    vendorCount: num(raw.vendorCount ?? raw.vendors),
    captainCount: num(raw.captainCount ?? raw.captains),
    customerCount: num(raw.customerCount ?? raw.customers),
    orderCount: num(raw.orderCount ?? raw.orders),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

/* -------------------------------------------------------------------------- */
/* Hooks                                                                      */
/* -------------------------------------------------------------------------- */

export function useHierarchy(pollMs = 30000) {
  const [nodes, setNodes] = useState<HierarchyNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setNodes([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const [stateDocs, districtDocs, pincodeDocs, clusterDocs, zoneDocs] =
        await Promise.all([
          loadCollection(col("STATES", "states")),
          loadCollection(col("DISTRICTS", "districts")),
          loadCollection(col("PINCODES", "pincodes")),
          loadCollection(col("CLUSTERS", "clusters")),
          loadCollection(col("ZONES", "zones")),
        ]);

      // Live children: State → count districts; District → count pincodes
      const stateNodes = stateDocs.map((raw) => {
        const node = mapState(raw);
        const childCount = districtDocs.filter((d) => {
          const sid = str(d.stateId, "");
          const sname = str(d.stateName ?? d.state, "");
          return (
            idsMatch(sid, node.id) ||
            idsMatch(sname, node.name) ||
            idsMatch(sid, str(raw.id, ""))
          );
        }).length;
        return { ...node, children: childCount };
      });

      const districtNodes = districtDocs.map((raw) => {
        const node = mapDistrict(raw);
        const childCount = pincodeDocs.filter((d) => {
          const did = str(d.districtId, "");
          const dname = str(d.districtName ?? d.district, "");
          return (
            idsMatch(did, node.id) ||
            idsMatch(dname, node.name) ||
            idsMatch(did, str(raw.id, ""))
          );
        }).length;
        return { ...node, children: childCount };
      });

      setNodes([
        ...stateNodes,
        ...districtNodes,
        ...pincodeDocs.map(mapPincode),
        ...clusterDocs.map(mapClusterNode),
        ...zoneDocs.map(mapZoneNode),
      ]);
    } catch (err) {
      console.error("useHierarchy error:", err);
      setError(err instanceof Error ? err.message : "Unable to load hierarchy.");
      setNodes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { nodes, loading, error, demoMode, refresh: load };
}

export function useStates(pollMs = 30000) {
  const [states, setStates] = useState<StateRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setStates([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const docs = await loadCollection(col("STATES", "states"));
      setStates(docs.map(mapStateRecord));
    } catch (err) {
      console.error("useStates error:", err);
      setError(err instanceof Error ? err.message : "Unable to load states.");
      setStates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { states, loading, error, demoMode, refresh: load };
}

export function useDistricts(pollMs = 30000) {
  const [districts, setDistricts] = useState<DistrictRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setDistricts([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const docs = await loadCollection(col("DISTRICTS", "districts"));
      setDistricts(docs.map(mapDistrictRecord));
    } catch (err) {
      console.error("useDistricts error:", err);
      setError(err instanceof Error ? err.message : "Unable to load districts.");
      setDistricts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { districts, loading, error, demoMode, refresh: load };
}

export function usePincodes(pollMs = 30000) {
  const [pincodes, setPincodes] = useState<PincodeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setPincodes([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const docs = await loadCollection(col("PINCODES", "pincodes"));
      setPincodes(docs.map(mapPincodeRecord));
    } catch (err) {
      console.error("usePincodes error:", err);
      setError(err instanceof Error ? err.message : "Unable to load pincodes.");
      setPincodes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { pincodes, loading, error, demoMode, refresh: load };
}

export function useClusters(pollMs = 30000) {
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setClusters([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const docs = await loadCollection(col("CLUSTERS", "clusters"));
      setClusters(docs.map(mapCluster));
    } catch (err) {
      console.error("useClusters error:", err);
      setError(err instanceof Error ? err.message : "Unable to load clusters.");
      setClusters([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { clusters, loading, error, demoMode, refresh: load };
}

export function useZones(pollMs = 30000) {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setZones([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const docs = await loadCollection(col("ZONES", "zones"));
      setZones(docs.map(mapZone));
    } catch (err) {
      console.error("useZones error:", err);
      setError(err instanceof Error ? err.message : "Unable to load zones.");
      setZones([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return { zones, loading, error, demoMode, refresh: load };
}

export default useHierarchy;