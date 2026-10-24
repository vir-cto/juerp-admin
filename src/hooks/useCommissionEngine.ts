// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   createDocumentWithId,
//   updateDocument,
//   deleteDocument,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type CommissionStatus = "ACTIVE" | "INACTIVE";
// export type CommissionType = "PERCENTAGE" | "FIXED";

// export type GlobalCommissionRule = {
//   id: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   updatedAt?: string;
// };

// export type NodeType =
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN";

// export type CommissionOverride = {
//   id: string;
//   nodeType: NodeType;
//   nodeId: string;
//   nodeName: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   updatedAt?: string;
// };

// export type VendorCommissionRate = {
//   id: string;
//   vendorId: string;
//   vendorName: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   updatedAt?: string;
// };

// export type RuleSummary = {
//   id: string;
//   name: string;
//   scope: string;
//   module: string;
//   value: string;
//   status: CommissionStatus;
//   updatedAt: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// function str(v: unknown, fallback = ""): string {
//   if (typeof v === "string" && v.trim()) return v.trim();
//   if (typeof v === "number") return String(v);
//   return fallback;
// }

// function num(v: unknown): number {
//   if (typeof v === "number" && Number.isFinite(v)) return v;
//   if (typeof v === "string") {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function asStatus(v: unknown): CommissionStatus {
//   return String(v ?? "").toUpperCase() === "INACTIVE" ? "INACTIVE" : "ACTIVE";
// }

// function asType(v: unknown): CommissionType {
//   return String(v ?? "").toUpperCase() === "FIXED" ? "FIXED" : "PERCENTAGE";
// }

// function formatValue(type: CommissionType, value: number): string {
//   return type === "PERCENTAGE" ? `${value}%` : `₹${value.toFixed(2)}`;
// }

// function dateLabel(v: unknown): string {
//   if (typeof v === "string" && v.trim()) return v.trim().slice(0, 10);
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
//     } catch {
//       return "—";
//     }
//   }
//   return "—";
// }

// async function loadRaw(collectionName: string) {
//   const fn = getFilteredCollection as (
//     ...args: unknown[]
//   ) => Promise<Array<Record<string, unknown> & { id: string }>>;
//   try {
//     const result = await fn(collectionName, [], undefined, 500);
//     return Array.isArray(result) ? result : [];
//   } catch {
//     try {
//       const result = await fn(collectionName);
//       return Array.isArray(result) ? result : [];
//     } catch (err) {
//       console.error(`loadRaw(${collectionName}) failed:`, err);
//       return [];
//     }
//   }
// }

// function mapGlobalRule(
//   raw: Record<string, unknown> & { id: string }
// ): GlobalCommissionRule {
//   return {
//     id: str(raw.id, raw.id),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN"),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(
//       raw.commissionValue ?? raw.commissionPercentage
//     ),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(raw.status ?? (raw.active === false ? "INACTIVE" : "ACTIVE")),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// function mapOverride(
//   raw: Record<string, unknown> & { id: string }
// ): CommissionOverride {
//   return {
//     id: str(raw.id, raw.id),
//     nodeType: (str(raw.nodeType, "STATE").toUpperCase() as NodeType) || "STATE",
//     nodeId: str(raw.nodeId, "—"),
//     nodeName: str(raw.nodeName, "—"),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN"),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
//     reason: str(raw.reason, "—"),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(raw.status),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// function mapVendorRate(
//   raw: Record<string, unknown> & { id: string }
// ): VendorCommissionRate {
//   return {
//     id: str(raw.id, raw.id),
//     vendorId: str(raw.vendorId ?? raw.nodeId, "—"),
//     vendorName: str(raw.vendorName ?? raw.nodeName, "—"),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN"),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
//     reason: str(raw.reason, "—"),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(raw.status),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useCommissionEngine — dashboard aggregate                                  */
// /* -------------------------------------------------------------------------- */

// export function useCommissionEngine(pollMs = 30000) {
//   const [globalRules, setGlobalRules] = useState<GlobalCommissionRule[]>([]);
//   const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
//   const [vendorRates, setVendorRates] = useState<VendorCommissionRate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setGlobalRules([]);
//       setOverrides([]);
//       setVendorRates([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [rulesRaw, overridesRaw, ratesRaw] = await Promise.all([
//         loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES),
//         loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES),
//         loadRaw(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES),
//       ]);
//       setGlobalRules(rulesRaw.map(mapGlobalRule));
//       setOverrides(overridesRaw.map(mapOverride));
//       setVendorRates(ratesRaw.map(mapVendorRate));
//     } catch (err) {
//       console.error("useCommissionEngine error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to load commission data."
//       );
//       setGlobalRules([]);
//       setOverrides([]);
//       setVendorRates([]);
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

//   const allSummaries: RuleSummary[] = useMemo(() => {
//     const globals: RuleSummary[] = globalRules.map((r) => ({
//       id: r.id,
//       name: `${r.module} Global Commission`,
//       scope: "GLOBAL",
//       module: r.module,
//       value: formatValue(r.commissionType, r.commissionValue),
//       status: r.status,
//       updatedAt: r.updatedAt ?? r.effectiveFrom,
//     }));
//     const nodes: RuleSummary[] = overrides.map((o) => ({
//       id: o.id,
//       name: `${o.nodeName} ${o.module} Override`,
//       scope: o.nodeType,
//       module: o.module,
//       value: formatValue(o.commissionType, o.commissionValue),
//       status: o.status,
//       updatedAt: o.updatedAt ?? o.effectiveFrom,
//     }));
//     const vendors: RuleSummary[] = vendorRates.map((v) => ({
//       id: v.id,
//       name: v.vendorName,
//       scope: "VENDOR",
//       module: v.module,
//       value: formatValue(v.commissionType, v.commissionValue),
//       status: v.status,
//       updatedAt: v.updatedAt ?? v.effectiveFrom,
//     }));
//     return [...globals, ...nodes, ...vendors];
//   }, [globalRules, overrides, vendorRates]);

//   return {
//     globalRules,
//     overrides,
//     vendorRates,
//     allSummaries,
//     loading,
//     error,
//     demoMode,
//     refresh: load,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useGlobalCommissionRules                                                   */
// /* -------------------------------------------------------------------------- */

// export function useGlobalCommissionRules(pollMs = 30000) {
//   const [rules, setRules] = useState<GlobalCommissionRule[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setRules([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES);
//       setRules(docs.map(mapGlobalRule));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to load rules.");
//       setRules([]);
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

//   const saveRule = useCallback(
//     async (input: {
//       module: string;
//       commissionType: CommissionType;
//       commissionValue: number;
//       effectiveFrom: string;
//     }) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const existing = rules.find((r) => r.module === input.module);
//       const id = existing?.id ?? `RULE-${input.module}-${Date.now()}`;
//       await createDocumentWithId(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, {
//         module: input.module,
//         commissionType: input.commissionType,
//         commissionValue: input.commissionValue,
//         effectiveFrom: input.effectiveFrom,
//         status: "ACTIVE",
//       });
//       await load();
//     },
//     [rules, load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const rule = rules.find((r) => r.id === id);
//       if (!rule) return;
//       const next = rule.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [rules, load]
//   );

//   return { rules, loading, error, refresh: load, saveRule, toggleStatus };
// }

// /* -------------------------------------------------------------------------- */
// /* useCommissionOverrides                                                     */
// /* -------------------------------------------------------------------------- */

// export function useCommissionOverrides(pollMs = 30000) {
//   const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setOverrides([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES);
//       setOverrides(docs.map(mapOverride));
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load overrides."
//       );
//       setOverrides([]);
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

//   const createOverride = useCallback(
//     async (
//       input: Omit<CommissionOverride, "id" | "status" | "updatedAt">
//     ) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const id = `OVR-${input.nodeType}-${Date.now()}`;
//       await createDocumentWithId(
//         FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES,
//         id,
//         { ...input, status: "ACTIVE" }
//       );
//       await load();
//     },
//     [load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const item = overrides.find((o) => o.id === id);
//       if (!item) return;
//       const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [overrides, load]
//   );

//   const removeOverride = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id);
//       await load();
//     },
//     [load]
//   );

//   return {
//     overrides,
//     loading,
//     error,
//     refresh: load,
//     createOverride,
//     toggleStatus,
//     removeOverride,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendorCommissionRates                                                   */
// /* -------------------------------------------------------------------------- */

// export function useVendorCommissionRates(pollMs = 30000) {
//   const [rates, setRates] = useState<VendorCommissionRate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setRates([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES
//       );
//       setRates(docs.map(mapVendorRate));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to load rates.");
//       setRates([]);
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

//   const createRate = useCallback(
//     async (
//       input: Omit<VendorCommissionRate, "id" | "status" | "updatedAt">
//     ) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const id = `VR-${input.module}-${Date.now()}`;
//       await createDocumentWithId(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
//         id,
//         { ...input, status: "ACTIVE" }
//       );
//       await load();
//     },
//     [load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const item = rates.find((r) => r.id === id);
//       if (!item) return;
//       const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
//         id,
//         { status: next }
//       );
//       await load();
//     },
//     [rates, load]
//   );

//   const removeRate = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
//         id
//       );
//       await load();
//     },
//     [load]
//   );

//   return {
//     rates,
//     loading,
//     error,
//     refresh: load,
//     createRate,
//     toggleStatus,
//     removeRate,
//   };
// }


// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   createDocumentWithId,
//   updateDocument,
//   deleteDocument,
//   getDocument,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type CommissionStatus = "ACTIVE" | "INACTIVE";
// export type CommissionType = "PERCENTAGE" | "FIXED";

// /** ERP global / module keys used across JUONE */
// export const COMMISSION_MODULES = [
//   "FOOD",
//   "MART",
//   "PHARMACY",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
//   "JUCART", // parent / legacy umbrella
// ] as const;

// export type CommissionModuleKey = (typeof COMMISSION_MODULES)[number] | string;

// export type GlobalCommissionRule = {
//   id: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   /** Optional platform fee (₹) charged on top — ERP config */
//   platformFee: number;
//   /** Optional JUONE extra amount (₹) — ERP config */
//   juoneExtra: number;
//   /** GST rate % used for that module line (display/config only) */
//   gstPercent: number;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   notes: string;
//   updatedAt?: string;
// };

// export type NodeType =
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN";

// // export type CommissionOverride = {
// //   id: string;
// //   nodeType: NodeType;
// //   nodeId: string;
// //   nodeName: string;
// //   module: string;
// //   commissionType: CommissionType;
// //   commissionValue: number;
// //   reason: string;
// //   effectiveFrom: string;
// //   status: CommissionStatus;
// //   updatedAt?: string;
// // };


// export type CommissionOverride = {
//   id: string;
//   nodeType: NodeType;
//   nodeId: string;
//   /** Display name — avoid "nodeName" (clashes with DOM nodeName in React/DevTools) */
//   nodeLabel: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   updatedAt?: string;
// };

// export type SaveOverrideInput = {
//   nodeType: NodeType;
//   nodeId: string;
//   nodeLabel: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
// };

// export type VendorCommissionRate = {
//   id: string;
//   vendorId: string;
//   vendorName: string;
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
//   status: CommissionStatus;
//   updatedAt?: string;
// };

// export type RuleSummary = {
//   id: string;
//   name: string;
//   scope: string;
//   module: string;
//   value: string;
//   status: CommissionStatus;
//   updatedAt: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// function str(v: unknown, fallback = ""): string {
//   if (typeof v === "string" && v.trim()) return v.trim();
//   if (typeof v === "number") return String(v);
//   return fallback;
// }

// function num(v: unknown): number {
//   if (typeof v === "number" && Number.isFinite(v)) return v;
//   if (typeof v === "string") {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function asStatus(v: unknown): CommissionStatus {
//   return String(v ?? "").toUpperCase() === "INACTIVE" ? "INACTIVE" : "ACTIVE";
// }

// function asType(v: unknown): CommissionType {
//   return String(v ?? "").toUpperCase() === "FIXED" ? "FIXED" : "PERCENTAGE";
// }

// function formatValue(type: CommissionType, value: number): string {
//   return type === "PERCENTAGE" ? `${value}%` : `₹${value.toFixed(2)}`;
// }

// function dateLabel(v: unknown): string {
//   if (typeof v === "string" && v.trim()) return v.trim().slice(0, 10);
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
//     } catch {
//       return "—";
//     }
//   }
//   return "—";
// }

// async function loadRaw(collectionName: string) {
//   const fn = getFilteredCollection as (
//     ...args: unknown[]
//   ) => Promise<Array<Record<string, unknown> & { id: string }>>;
//   try {
//     const result = await fn(collectionName, [], undefined, 500);
//     return Array.isArray(result) ? result : [];
//   } catch {
//     try {
//       const result = await fn(collectionName);
//       return Array.isArray(result) ? result : [];
//     } catch (err) {
//       console.error(`loadRaw(${collectionName}) failed:`, err);
//       return [];
//     }
//   }
// }

// function mapGlobalRule(
//   raw: Record<string, unknown> & { id: string }
// ): GlobalCommissionRule {
//   return {
//     id: str(raw.id, raw.id),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
//     platformFee: num(raw.platformFee ?? raw.platformFeeInr),
//     juoneExtra: num(raw.juoneExtra ?? raw.extraAmount ?? raw.juoneExtraInr),
//     gstPercent: num(raw.gstPercent ?? raw.gstRate),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(
//       raw.status ?? (raw.active === false ? "INACTIVE" : "ACTIVE")
//     ),
//     notes: str(raw.notes ?? raw.reason, ""),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// // function mapOverride(
// //   raw: Record<string, unknown> & { id: string }
// // ): CommissionOverride {
// //   return {
// //     id: str(raw.id, raw.id),
// //     nodeType: (str(raw.nodeType, "STATE").toUpperCase() as NodeType) || "STATE",
// //     nodeId: str(raw.nodeId, "—"),
// //     nodeName: str(raw.nodeName, "—"),
// //     module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
// //     commissionType: asType(raw.commissionType),
// //     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
// //     reason: str(raw.reason, "—"),
// //     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
// //     status: asStatus(raw.status),
// //     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
// //   };
// // }

// function mapOverride(
//   raw: Record<string, unknown> & { id: string }
// ): CommissionOverride {
//   return {
//     id: str(raw.id, raw.id),
//     nodeType: (str(raw.nodeType, "STATE").toUpperCase() as NodeType) || "STATE",
//     nodeId: str(raw.nodeId, "—"),
//     nodeLabel: str(
//       raw.nodeLabel ?? raw.nodeName ?? raw.name,
//       "—"
//     ),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
//     reason: str(raw.reason, "—"),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(raw.status),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// function mapVendorRate(
//   raw: Record<string, unknown> & { id: string }
// ): VendorCommissionRate {
//   return {
//     id: str(raw.id, raw.id),
//     vendorId: str(raw.vendorId ?? raw.nodeId, "—"),
//     vendorName: str(raw.vendorName ?? raw.nodeName, "—"),
//     module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
//     commissionType: asType(raw.commissionType),
//     commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
//     reason: str(raw.reason, "—"),
//     effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
//     status: asStatus(raw.status),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
//   };
// }

// /** Stable doc id: one active global rule per module key */
// export function globalRuleDocId(module: string): string {
//   return `GLOBAL_${String(module).toUpperCase().replace(/\s+/g, "_")}`;
// }

// /* -------------------------------------------------------------------------- */
// /* useCommissionEngine — dashboard aggregate                                  */
// /* -------------------------------------------------------------------------- */

// export function useCommissionEngine(pollMs = 30000) {
//   const [globalRules, setGlobalRules] = useState<GlobalCommissionRule[]>([]);
//   const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
//   const [vendorRates, setVendorRates] = useState<VendorCommissionRate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setGlobalRules([]);
//       setOverrides([]);
//       setVendorRates([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [rulesRaw, overridesRaw, ratesRaw] = await Promise.all([
//         loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES),
//         loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES),
//         loadRaw(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES),
//       ]);
//       setGlobalRules(rulesRaw.map(mapGlobalRule));
//       setOverrides(overridesRaw.map(mapOverride));
//       setVendorRates(ratesRaw.map(mapVendorRate));
//     } catch (err) {
//       console.error("useCommissionEngine error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to load commission data."
//       );
//       setGlobalRules([]);
//       setOverrides([]);
//       setVendorRates([]);
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

//   const allSummaries: RuleSummary[] = useMemo(() => {
//     const globals: RuleSummary[] = globalRules.map((r) => ({
//       id: r.id,
//       name: `${r.module} Global Commission`,
//       scope: "GLOBAL",
//       module: r.module,
//       value: formatValue(r.commissionType, r.commissionValue),
//       status: r.status,
//       updatedAt: r.updatedAt ?? r.effectiveFrom,
//     }));
//     const nodes: RuleSummary[] = overrides.map((o) => ({
//       id: o.id,
//       name: `${o.nodeName} ${o.module} Override`,
//       scope: o.nodeType,
//       module: o.module,
//       value: formatValue(o.commissionType, o.commissionValue),
//       status: o.status,
//       updatedAt: o.updatedAt ?? o.effectiveFrom,
//     }));
//     const vendors: RuleSummary[] = vendorRates.map((v) => ({
//       id: v.id,
//       name: v.vendorName,
//       scope: "VENDOR",
//       module: v.module,
//       value: formatValue(v.commissionType, v.commissionValue),
//       status: v.status,
//       updatedAt: v.updatedAt ?? v.effectiveFrom,
//     }));
//     return [...globals, ...nodes, ...vendors];
//   }, [globalRules, overrides, vendorRates]);

//   return {
//     globalRules,
//     overrides,
//     vendorRates,
//     allSummaries,
//     loading,
//     error,
//     demoMode,
//     refresh: load,
//   };
// }

// export function useCommissionOverrides(pollMs = 30000) {
//   const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setOverrides([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES);
//       setOverrides(docs.map(mapOverride));
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load overrides."
//       );
//       setOverrides([]);
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

//   const createOverride = useCallback(
//     async (input: SaveOverrideInput) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const id = `OVR-${input.nodeType}-${input.nodeId}-${input.module}-${Date.now()}`;
//       await createDocumentWithId(
//         FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES,
//         id,
//         {
//           nodeType: input.nodeType,
//           nodeId: input.nodeId,
//           // Firestore keeps legacy key for other consumers
//           nodeName: input.nodeLabel,
//           nodeLabel: input.nodeLabel,
//           module: String(input.module).toUpperCase(),
//           commissionType: input.commissionType,
//           commissionValue: input.commissionValue,
//           reason: input.reason,
//           effectiveFrom: input.effectiveFrom,
//           status: "ACTIVE",
//           scope: "NODE_OVERRIDE",
//         }
//       );
//       await load();
//       return id;
//     },
//     [load]
//   );

//   const updateOverride = useCallback(
//     async (id: string, input: SaveOverrideInput) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
//         nodeType: input.nodeType,
//         nodeId: input.nodeId,
//         nodeName: input.nodeLabel,
//         nodeLabel: input.nodeLabel,
//         module: String(input.module).toUpperCase(),
//         commissionType: input.commissionType,
//         commissionValue: input.commissionValue,
//         reason: input.reason,
//         effectiveFrom: input.effectiveFrom,
//       });
//       await load();
//     },
//     [load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const item = overrides.find((o) => o.id === id);
//       if (!item) throw new Error("Override not found.");
//       const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [overrides, load]
//   );

//   const removeOverride = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id);
//       await load();
//     },
//     [load]
//   );

//   return {
//     overrides,
//     loading,
//     error,
//     refresh: load,
//     createOverride,
//     updateOverride,
//     toggleStatus,
//     removeOverride,
//   };
// }


// /* -------------------------------------------------------------------------- */
// /* useGlobalCommissionRules                                                   */
// /* -------------------------------------------------------------------------- */

// export type SaveGlobalRuleInput = {
//   module: string;
//   commissionType: CommissionType;
//   commissionValue: number;
//   platformFee?: number;
//   juoneExtra?: number;
//   gstPercent?: number;
//   effectiveFrom: string;
//   notes?: string;
//   status?: CommissionStatus;
// };

// export function useGlobalCommissionRules(pollMs = 30000) {
//   const [rules, setRules] = useState<GlobalCommissionRule[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setRules([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES);
//       const mapped = docs.map(mapGlobalRule);
//       mapped.sort((a, b) => a.module.localeCompare(b.module));
//       setRules(mapped);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to load rules.");
//       setRules([]);
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

  

//   const saveRule = useCallback(
//     async (input: SaveGlobalRuleInput) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       const moduleKey = String(input.module).toUpperCase().trim();
//       if (!moduleKey) throw new Error("Module is required.");

//       const id = globalRuleDocId(moduleKey);
//       const existing = await getDocument(
//         FIRESTORE_COLLECTIONS.COMMISSION_RULES,
//         id
//       );

//       const payload = {
//         ruleId: id,
//         scope: "GLOBAL",
//         module: moduleKey,
//         moduleId: moduleKey,
//         commissionType: input.commissionType,
//         commissionValue: input.commissionValue,
//         commissionPercentage:
//           input.commissionType === "PERCENTAGE" ? input.commissionValue : null,
//         fixedCommissionInr:
//           input.commissionType === "FIXED" ? input.commissionValue : null,
//         platformFee: input.platformFee ?? 0,
//         juoneExtra: input.juoneExtra ?? 0,
//         gstPercent: input.gstPercent ?? 0,
//         effectiveFrom: input.effectiveFrom,
//         notes: input.notes ?? "",
//         status: input.status ?? "ACTIVE",
//         calculationVersion: "erp-global-v1",
//       };

//       if (existing) {
//         await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, payload);
//       } else {
//         await createDocumentWithId(
//           FIRESTORE_COLLECTIONS.COMMISSION_RULES,
//           id,
//           payload
//         );
//       }

//       await load();
//       return id;
//     },
//     [load]
//   );
  

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const rule = rules.find((r) => r.id === id);
//       if (!rule) throw new Error("Rule not found.");
//       const next = rule.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [rules, load]
//   );

//     const deleteRule = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id);
//       await load();
//     },
//     [load]
//   );

//   // return {
//   //   rules,
//   //   loading,
//   //   error,
//   //   refresh: load,
//   //   saveRule,
//   //   toggleStatus,
//   //   deleteRule,
//   // };

//   return { rules, loading, error, refresh: load, saveRule, toggleStatus, deleteRule };

  
// }

// /* -------------------------------------------------------------------------- */
// /* useCommissionOverrides                                                     */
// /* -------------------------------------------------------------------------- */

// export function useCommissionOverrides(pollMs = 30000) {
//   const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setOverrides([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES);
//       setOverrides(docs.map(mapOverride));
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load overrides."
//       );
//       setOverrides([]);
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

//   const createOverride = useCallback(
//     async (
//       input: Omit<CommissionOverride, "id" | "status" | "updatedAt">
//     ) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const id = `OVR-${input.nodeType}-${Date.now()}`;
//       await createDocumentWithId(
//         FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES,
//         id,
//         { ...input, status: "ACTIVE" }
//       );
//       await load();
//     },
//     [load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const item = overrides.find((o) => o.id === id);
//       if (!item) return;
//       const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [overrides, load]
//   );

//   const removeOverride = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id);
//       await load();
//     },
//     [load]
//   );

//   return {
//     overrides,
//     loading,
//     error,
//     refresh: load,
//     createOverride,
//     toggleStatus,
//     removeOverride,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendorCommissionRates                                                   */
// /* -------------------------------------------------------------------------- */

// export function useVendorCommissionRates(pollMs = 30000) {
//   const [rates, setRates] = useState<VendorCommissionRate[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setRates([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const docs = await loadRaw(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES
//       );
//       setRates(docs.map(mapVendorRate));
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Unable to load rates.");
//       setRates([]);
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

//   const createRate = useCallback(
//     async (
//       input: Omit<VendorCommissionRate, "id" | "status" | "updatedAt">
//     ) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const id = `VR-${input.module}-${input.vendorId}-${Date.now()}`;
//       await createDocumentWithId(
//         FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
//         id,
//         { ...input, status: "ACTIVE" }
//       );
//       await load();
//     },
//     [load]
//   );

//   const toggleStatus = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       const item = rates.find((r) => r.id === id);
//       if (!item) return;
//       const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES, id, {
//         status: next,
//       });
//       await load();
//     },
//     [rates, load]
//   );

//   const removeRate = useCallback(
//     async (id: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await deleteDocument(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES, id);
//       await load();
//     },
//     [load]
//   );

//   return {
//     rates,
//     loading,
//     error,
//     refresh: load,
//     createRate,
//     toggleStatus,
//     removeRate,
//   };
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
  createDocumentWithId,
  updateDocument,
  deleteDocument,
  getDocument,
} from "@/lib/firebase/firestore";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type CommissionStatus = "ACTIVE" | "INACTIVE";
export type CommissionType = "PERCENTAGE" | "FIXED";

export const COMMISSION_MODULES = [
  "FOOD",
  "MART",
  "PHARMACY",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
  "JUCART",
] as const;

export type CommissionModuleKey = (typeof COMMISSION_MODULES)[number] | string;

export type GlobalCommissionRule = {
  id: string;
  module: string;
  commissionType: CommissionType;
  commissionValue: number;
  platformFee: number;
  juoneExtra: number;
  gstPercent: number;
  effectiveFrom: string;
  status: CommissionStatus;
  notes: string;
  updatedAt?: string;
};

export type NodeType =
  | "STATE"
  | "DISTRICT"
  | "PINCODE"
  | "VENDOR"
  | "CAPTAIN";

/** Do not use property name "nodeName" — clashes with DOM nodeName in React/DevTools */
export type CommissionOverride = {
  id: string;
  nodeType: NodeType;
  nodeId: string;
  nodeLabel: string;
  module: string;
  commissionType: CommissionType;
  commissionValue: number;
  reason: string;
  effectiveFrom: string;
  status: CommissionStatus;
  updatedAt?: string;
};

export type SaveOverrideInput = {
  nodeType: NodeType;
  nodeId: string;
  nodeLabel: string;
  module: string;
  commissionType: CommissionType;
  commissionValue: number;
  reason: string;
  effectiveFrom: string;
};

export type VendorCommissionRate = {
  id: string;
  vendorId: string;
  vendorName: string;
  module: string;
  commissionType: CommissionType;
  commissionValue: number;
  reason: string;
  effectiveFrom: string;
  status: CommissionStatus;
  updatedAt?: string;
};

export type RuleSummary = {
  id: string;
  name: string;
  scope: string;
  module: string;
  value: string;
  status: CommissionStatus;
  updatedAt: string;
};

export type SaveGlobalRuleInput = {
  module: string;
  commissionType: CommissionType;
  commissionValue: number;
  platformFee?: number;
  juoneExtra?: number;
  gstPercent?: number;
  effectiveFrom: string;
  notes?: string;
  status?: CommissionStatus;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function str(v: unknown, fallback = ""): string {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return fallback;
}

function num(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function asStatus(v: unknown): CommissionStatus {
  return String(v ?? "").toUpperCase() === "INACTIVE" ? "INACTIVE" : "ACTIVE";
}

function asType(v: unknown): CommissionType {
  return String(v ?? "").toUpperCase() === "FIXED" ? "FIXED" : "PERCENTAGE";
}

function formatValue(type: CommissionType, value: number): string {
  return type === "PERCENTAGE" ? `${value}%` : `₹${value.toFixed(2)}`;
}

function dateLabel(v: unknown): string {
  if (typeof v === "string" && v.trim()) return v.trim().slice(0, 10);
  if (v && typeof v === "object" && "toDate" in v) {
    try {
      return (v as { toDate: () => Date }).toDate().toISOString().slice(0, 10);
    } catch {
      return "—";
    }
  }
  return "—";
}

async function loadRaw(collectionName: string) {
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
      console.error(`loadRaw(${collectionName}) failed:`, err);
      return [];
    }
  }
}

function mapGlobalRule(
  raw: Record<string, unknown> & { id: string }
): GlobalCommissionRule {
  return {
    id: str(raw.id, raw.id),
    module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
    commissionType: asType(raw.commissionType),
    commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
    platformFee: num(raw.platformFee ?? raw.platformFeeInr),
    juoneExtra: num(raw.juoneExtra ?? raw.extraAmount ?? raw.juoneExtraInr),
    gstPercent: num(raw.gstPercent ?? raw.gstRate),
    effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
    status: asStatus(
      raw.status ?? (raw.active === false ? "INACTIVE" : "ACTIVE")
    ),
    notes: str(raw.notes ?? raw.reason, ""),
    updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
  };
}

function mapOverride(
  raw: Record<string, unknown> & { id: string }
): CommissionOverride {
  return {
    id: str(raw.id, raw.id),
    nodeType: (str(raw.nodeType, "STATE").toUpperCase() as NodeType) || "STATE",
    nodeId: str(raw.nodeId, "—"),
    nodeLabel: str(raw.nodeLabel ?? raw.nodeName ?? raw.name, "—"),
    module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
    commissionType: asType(raw.commissionType),
    commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
    reason: str(raw.reason, "—"),
    effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
    status: asStatus(raw.status),
    updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
  };
}

function mapVendorRate(
  raw: Record<string, unknown> & { id: string }
): VendorCommissionRate {
  return {
    id: str(raw.id, raw.id),
    vendorId: str(raw.vendorId ?? raw.nodeId, "—"),
    vendorName: str(raw.vendorName ?? raw.nodeName, "—"),
    module: str(raw.module ?? raw.moduleId, "UNKNOWN").toUpperCase(),
    commissionType: asType(raw.commissionType),
    commissionValue: num(raw.commissionValue ?? raw.commissionPercentage),
    reason: str(raw.reason, "—"),
    effectiveFrom: dateLabel(raw.effectiveFrom ?? raw.createdAt),
    status: asStatus(raw.status),
    updatedAt: dateLabel(raw.updatedAt ?? raw.effectiveFrom),
  };
}

export function globalRuleDocId(module: string): string {
  return `GLOBAL_${String(module).toUpperCase().replace(/\s+/g, "_")}`;
}

/* -------------------------------------------------------------------------- */
/* useCommissionEngine — dashboard aggregate                                  */
/* -------------------------------------------------------------------------- */

export function useCommissionEngine(pollMs = 30000) {
  const [globalRules, setGlobalRules] = useState<GlobalCommissionRule[]>([]);
  const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
  const [vendorRates, setVendorRates] = useState<VendorCommissionRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setGlobalRules([]);
      setOverrides([]);
      setVendorRates([]);
      setLoading(false);
      return;
    }
    setDemoMode(false);
    try {
      const [rulesRaw, overridesRaw, ratesRaw] = await Promise.all([
        loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES),
        loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES),
        loadRaw(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES),
      ]);
      setGlobalRules(rulesRaw.map(mapGlobalRule));
      setOverrides(overridesRaw.map(mapOverride));
      setVendorRates(ratesRaw.map(mapVendorRate));
    } catch (err) {
      console.error("useCommissionEngine error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load commission data."
      );
      setGlobalRules([]);
      setOverrides([]);
      setVendorRates([]);
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

  const allSummaries: RuleSummary[] = useMemo(() => {
    const globals: RuleSummary[] = globalRules.map((r) => ({
      id: r.id,
      name: `${r.module} Global Commission`,
      scope: "GLOBAL",
      module: r.module,
      value: formatValue(r.commissionType, r.commissionValue),
      status: r.status,
      updatedAt: r.updatedAt ?? r.effectiveFrom,
    }));
    const nodes: RuleSummary[] = overrides.map((o) => ({
      id: o.id,
      name: `${o.nodeLabel} ${o.module} Override`,
      scope: o.nodeType,
      module: o.module,
      value: formatValue(o.commissionType, o.commissionValue),
      status: o.status,
      updatedAt: o.updatedAt ?? o.effectiveFrom,
    }));
    const vendors: RuleSummary[] = vendorRates.map((v) => ({
      id: v.id,
      name: v.vendorName,
      scope: "VENDOR",
      module: v.module,
      value: formatValue(v.commissionType, v.commissionValue),
      status: v.status,
      updatedAt: v.updatedAt ?? v.effectiveFrom,
    }));
    return [...globals, ...nodes, ...vendors];
  }, [globalRules, overrides, vendorRates]);

  return {
    globalRules,
    overrides,
    vendorRates,
    allSummaries,
    loading,
    error,
    demoMode,
    refresh: load,
  };
}

/* -------------------------------------------------------------------------- */
/* useGlobalCommissionRules                                                   */
/* -------------------------------------------------------------------------- */

export function useGlobalCommissionRules(pollMs = 30000) {
  const [rules, setRules] = useState<GlobalCommissionRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setRules([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_RULES);
      const mapped = docs.map(mapGlobalRule);
      mapped.sort((a, b) => a.module.localeCompare(b.module));
      setRules(mapped);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load rules.");
      setRules([]);
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

  const saveRule = useCallback(
    async (input: SaveGlobalRuleInput) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }

      const moduleKey = String(input.module).toUpperCase().trim();
      if (!moduleKey) throw new Error("Module is required.");

      const id = globalRuleDocId(moduleKey);
      const existing = await getDocument(
        FIRESTORE_COLLECTIONS.COMMISSION_RULES,
        id
      );

      const payload = {
        ruleId: id,
        scope: "GLOBAL",
        module: moduleKey,
        moduleId: moduleKey,
        commissionType: input.commissionType,
        commissionValue: input.commissionValue,
        commissionPercentage:
          input.commissionType === "PERCENTAGE" ? input.commissionValue : null,
        fixedCommissionInr:
          input.commissionType === "FIXED" ? input.commissionValue : null,
        platformFee: input.platformFee ?? 0,
        juoneExtra: input.juoneExtra ?? 0,
        gstPercent: input.gstPercent ?? 0,
        effectiveFrom: input.effectiveFrom,
        notes: input.notes ?? "",
        status: input.status ?? "ACTIVE",
        calculationVersion: "erp-global-v1",
      };

      if (existing) {
        await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, payload);
      } else {
        await createDocumentWithId(
          FIRESTORE_COLLECTIONS.COMMISSION_RULES,
          id,
          payload
        );
      }

      await load();
      return id;
    },
    [load]
  );

  const toggleStatus = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      const rule = rules.find((r) => r.id === id);
      if (!rule) throw new Error("Rule not found.");
      const next = rule.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id, {
        status: next,
      });
      await load();
    },
    [rules, load]
  );

  const deleteRule = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_RULES, id);
      await load();
    },
    [load]
  );

  return {
    rules,
    loading,
    error,
    refresh: load,
    saveRule,
    toggleStatus,
    deleteRule,
  };
}

/* -------------------------------------------------------------------------- */
/* useCommissionOverrides — SINGLE definition                                 */
/* -------------------------------------------------------------------------- */

export function useCommissionOverrides(pollMs = 30000) {
  const [overrides, setOverrides] = useState<CommissionOverride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setOverrides([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await loadRaw(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES);
      setOverrides(docs.map(mapOverride));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load overrides."
      );
      setOverrides([]);
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

  const createOverride = useCallback(
    async (input: SaveOverrideInput) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      const id = `OVR-${input.nodeType}-${input.nodeId}-${input.module}-${Date.now()}`;
      await createDocumentWithId(
        FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES,
        id,
        {
          nodeType: input.nodeType,
          nodeId: input.nodeId,
          nodeName: input.nodeLabel,
          nodeLabel: input.nodeLabel,
          module: String(input.module).toUpperCase(),
          commissionType: input.commissionType,
          commissionValue: input.commissionValue,
          reason: input.reason,
          effectiveFrom: input.effectiveFrom,
          status: "ACTIVE",
          scope: "NODE_OVERRIDE",
        }
      );
      await load();
      return id;
    },
    [load]
  );

  const updateOverride = useCallback(
    async (id: string, input: SaveOverrideInput) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
        nodeType: input.nodeType,
        nodeId: input.nodeId,
        nodeName: input.nodeLabel,
        nodeLabel: input.nodeLabel,
        module: String(input.module).toUpperCase(),
        commissionType: input.commissionType,
        commissionValue: input.commissionValue,
        reason: input.reason,
        effectiveFrom: input.effectiveFrom,
      });
      await load();
    },
    [load]
  );

  const toggleStatus = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      const item = overrides.find((o) => o.id === id);
      if (!item) throw new Error("Override not found.");
      const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await updateDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id, {
        status: next,
      });
      await load();
    },
    [overrides, load]
  );

  const removeOverride = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      await deleteDocument(FIRESTORE_COLLECTIONS.COMMISSION_OVERRIDES, id);
      await load();
    },
    [load]
  );

  return {
    overrides,
    loading,
    error,
    refresh: load,
    createOverride,
    updateOverride,
    toggleStatus,
    removeOverride,
  };
}

/* -------------------------------------------------------------------------- */
/* useVendorCommissionRates                                                   */
/* -------------------------------------------------------------------------- */

export function useVendorCommissionRates(pollMs = 30000) {
  const [rates, setRates] = useState<VendorCommissionRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setRates([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await loadRaw(
        FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES
      );
      setRates(docs.map(mapVendorRate));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load rates.");
      setRates([]);
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

  // const createRate = useCallback(
  //   async (
  //     input: Omit<VendorCommissionRate, "id" | "status" | "updatedAt">
  //   ) => {
  //     if (isFirestoreDemoMode) {
  //       throw new Error("Writes are disabled in demo mode.");
  //     }
  //     const id = `VR-${input.module}-${input.vendorId}-${Date.now()}`;
  //     await createDocumentWithId(
  //       FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
  //       id,
  //       { ...input, status: "ACTIVE" }
  //     );
  //     await load();
  //   },
  //   [load]
  // );

  const createRate = useCallback(
    async (
      input: Omit<VendorCommissionRate, "id" | "status" | "updatedAt">
    ) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      const id = `VR-${input.module}-${input.vendorId}-${Date.now()}`;
      await createDocumentWithId(
        FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES,
        id,
        { ...input, module: String(input.module).toUpperCase(), status: "ACTIVE" }
      );
      await load();
      return id;
    },
    [load]
  );

  const updateRate = useCallback(
    async (
      id: string,
      input: Omit<VendorCommissionRate, "id" | "status" | "updatedAt">
    ) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      await updateDocument(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES, id, {
        ...input,
        module: String(input.module).toUpperCase(),
      });
      await load();
    },
    [load]
  );

  const toggleStatus = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      const item = rates.find((r) => r.id === id);
      if (!item) return;
      const next = item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      await updateDocument(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES, id, {
        status: next,
      });
      await load();
    },
    [rates, load]
  );

  const removeRate = useCallback(
    async (id: string) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }
      await deleteDocument(FIRESTORE_COLLECTIONS.VENDOR_COMMISSION_RATES, id);
      await load();
    },
    [load]
  );

  return {
    rates,
    loading,
    error,
    refresh: load,
    createRate,
    updateRate,
    toggleStatus,
    removeRate,
  };
}