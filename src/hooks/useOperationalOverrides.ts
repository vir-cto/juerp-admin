// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Shared types                                                                */
// /* -------------------------------------------------------------------------- */

// export type OverrideWorkflowStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// export type OverrideModule =
//   | "DISPATCH"
//   | "SUSPENSIONS"
//   | "CANCELLATIONS";

// export type OverrideActivity = {
//   id: string;
//   module: OverrideModule;
//   title: string;
//   description: string;
//   referenceId: string;
//   requestedBy: string;
//   status: OverrideWorkflowStatus;
//   createdAt: string;
//   sortKey: number;
// };

// export type DispatchEntity = "ORDER" | "DELIVERY" | "RIDE" | "BOOKING";
// export type DispatchReason =
//   | "CAPTAIN_UNAVAILABLE"
//   | "CAPTAIN_REASSIGNMENT"
//   | "VENDOR_DELAY"
//   | "CUSTOMER_REQUEST"
//   | "SYSTEM_ISSUE"
//   | "SERVICE_ISSUE"
//   | "EMERGENCY"
//   | "OTHER";

// export type DispatchOverride = {
//   id: string;
//   overrideId: string;
//   entityId: string;
//   entityType: DispatchEntity;
//   moduleId: string;
//   customerId: string;
//   customerName: string;
//   vendorId?: string;
//   vendorName?: string;
//   currentCaptainId?: string;
//   currentCaptainName?: string;
//   requestedCaptainId?: string;
//   requestedCaptainName?: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: DispatchReason;
//   reasonText: string;
//   requestedBy: string;
//   approvedBy?: string;
//   status: OverrideWorkflowStatus;
//   createdAt: string;
//   updatedAt: string;
// };

// export type SuspensionEntity = "CUSTOMER" | "VENDOR" | "CAPTAIN";
// export type SuspensionReason =
//   | "POLICY_VIOLATION"
//   | "KYC_ISSUE"
//   | "FRAUD_SUSPECTED"
//   | "SAFETY_ISSUE"
//   | "PAYMENT_ISSUE"
//   | "SERVICE_ISSUE"
//   | "ADMINISTRATIVE"
//   | "OTHER";

// export type SuspensionOverride = {
//   id: string;
//   overrideId: string;
//   entityId: string;
//   entityType: SuspensionEntity;
//   entityName: string;
//   moduleId?: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: SuspensionReason;
//   reasonText: string;
//   requestedBy: string;
//   approvedBy?: string;
//   duration?: string;
//   status: OverrideWorkflowStatus;
//   createdAt: string;
//   updatedAt: string;
// };

// export type CancellationEntity = "ORDER" | "BOOKING" | "RIDE" | "DELIVERY";
// export type CancellationReason =
//   | "CUSTOMER_REQUEST"
//   | "VENDOR_REQUEST"
//   | "CAPTAIN_ISSUE"
//   | "SYSTEM_ISSUE"
//   | "SERVICE_UNAVAILABLE"
//   | "PAYMENT_ISSUE"
//   | "OTHER";

// export type CancellationOverride = {
//   id: string;
//   overrideId: string;
//   entityId: string;
//   entityType: CancellationEntity;
//   customerId: string;
//   customerName: string;
//   vendorId?: string;
//   vendorName?: string;
//   moduleId: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: CancellationReason;
//   reasonText: string;
//   refundRequired: boolean;
//   refundAmountPaise: number;
//   requestedBy: string;
//   approvedBy?: string;
//   status: OverrideWorkflowStatus;
//   createdAt: string;
//   updatedAt: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                     */
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

// function bool(v: unknown): boolean {
//   if (typeof v === "boolean") return v;
//   if (v === "true" || v === 1 || v === "1") return true;
//   return false;
// }

// function dateLabel(v: unknown): string {
//   if (typeof v === "string" && v.trim()) {
//     const d = new Date(v);
//     if (!Number.isNaN(d.getTime())) {
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//     return v.trim();
//   }
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch {
//       return "—";
//     }
//   }
//   return "—";
// }

// function sortMs(v: unknown): number {
//   if (typeof v === "string") {
//     const t = Date.parse(v);
//     return Number.isNaN(t) ? 0 : t;
//   }
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       return 0;
//     }
//   }
//   if (v && typeof v === "object" && "seconds" in v) {
//     return Number((v as { seconds: number }).seconds) * 1000;
//   }
//   return 0;
// }

// function asStatus(v: unknown): OverrideWorkflowStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   if (
//     s === "PENDING" ||
//     s === "APPROVED" ||
//     s === "REJECTED" ||
//     s === "EXECUTED"
//   ) {
//     return s;
//   }
//   return "PENDING";
// }

// function asDispatchEntity(v: unknown): DispatchEntity {
//   const s = String(v ?? "ORDER").toUpperCase();
//   if (s === "ORDER" || s === "DELIVERY" || s === "RIDE" || s === "BOOKING") {
//     return s;
//   }
//   return "ORDER";
// }

// function asDispatchReason(v: unknown): DispatchReason {
//   const s = String(v ?? "OTHER").toUpperCase();
//   const allowed: DispatchReason[] = [
//     "CAPTAIN_UNAVAILABLE",
//     "CAPTAIN_REASSIGNMENT",
//     "VENDOR_DELAY",
//     "CUSTOMER_REQUEST",
//     "SYSTEM_ISSUE",
//     "SERVICE_ISSUE",
//     "EMERGENCY",
//     "OTHER",
//   ];
//   return (allowed as string[]).includes(s) ? (s as DispatchReason) : "OTHER";
// }

// function asSuspensionEntity(v: unknown): SuspensionEntity {
//   const s = String(v ?? "CUSTOMER").toUpperCase();
//   if (s === "CUSTOMER" || s === "VENDOR" || s === "CAPTAIN") return s;
//   return "CUSTOMER";
// }

// function asSuspensionReason(v: unknown): SuspensionReason {
//   const s = String(v ?? "OTHER").toUpperCase();
//   const allowed: SuspensionReason[] = [
//     "POLICY_VIOLATION",
//     "KYC_ISSUE",
//     "FRAUD_SUSPECTED",
//     "SAFETY_ISSUE",
//     "PAYMENT_ISSUE",
//     "SERVICE_ISSUE",
//     "ADMINISTRATIVE",
//     "OTHER",
//   ];
//   return (allowed as string[]).includes(s)
//     ? (s as SuspensionReason)
//     : "OTHER";
// }

// function asCancellationEntity(v: unknown): CancellationEntity {
//   const s = String(v ?? "ORDER").toUpperCase();
//   if (s === "ORDER" || s === "BOOKING" || s === "RIDE" || s === "DELIVERY") {
//     return s;
//   }
//   return "ORDER";
// }

// function asCancellationReason(v: unknown): CancellationReason {
//   const s = String(v ?? "OTHER").toUpperCase();
//   const allowed: CancellationReason[] = [
//     "CUSTOMER_REQUEST",
//     "VENDOR_REQUEST",
//     "CAPTAIN_ISSUE",
//     "SYSTEM_ISSUE",
//     "SERVICE_UNAVAILABLE",
//     "PAYMENT_ISSUE",
//     "OTHER",
//   ];
//   return (allowed as string[]).includes(s)
//     ? (s as CancellationReason)
//     : "OTHER";
// }

// /* -------------------------------------------------------------------------- */
// /* Mappers                                                                     */
// /* -------------------------------------------------------------------------- */

// function mapDispatch(
//   raw: Record<string, unknown> & { id: string }
// ): DispatchOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId ?? raw.deliveryId, "—"),
//     entityType: asDispatchEntity(raw.entityType),
//     moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     customerName: str(raw.customerName ?? raw.userName, "—"),
//     vendorId: str(raw.vendorId) || undefined,
//     vendorName: str(raw.vendorName) || undefined,
//     currentCaptainId: str(raw.currentCaptainId) || undefined,
//     currentCaptainName: str(raw.currentCaptainName) || undefined,
//     requestedCaptainId: str(raw.requestedCaptainId) || undefined,
//     requestedCaptainName: str(raw.requestedCaptainName) || undefined,
//     currentStatus: str(raw.currentStatus, "UNKNOWN"),
//     requestedStatus: str(raw.requestedStatus, "ASSIGNED"),
//     reason: asDispatchReason(raw.reason),
//     reasonText: str(raw.reasonText ?? raw.description, "—"),
//     requestedBy: str(raw.requestedBy, "—"),
//     approvedBy: str(raw.approvedBy) || undefined,
//     status: asStatus(raw.status),
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapSuspension(
//   raw: Record<string, unknown> & { id: string }
// ): SuspensionOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityId: str(raw.entityId, "—"),
//     entityType: asSuspensionEntity(raw.entityType),
//     entityName: str(raw.entityName ?? raw.name, "—"),
//     moduleId: str(raw.moduleId ?? raw.module) || undefined,
//     currentStatus: str(raw.currentStatus, "ACTIVE"),
//     requestedStatus: str(raw.requestedStatus, "SUSPENDED"),
//     reason: asSuspensionReason(raw.reason),
//     reasonText: str(raw.reasonText ?? raw.description, "—"),
//     requestedBy: str(raw.requestedBy, "—"),
//     approvedBy: str(raw.approvedBy) || undefined,
//     duration: str(raw.duration) || undefined,
//     status: asStatus(raw.status),
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapCancellation(
//   raw: Record<string, unknown> & { id: string }
// ): CancellationOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityId: str(raw.entityId ?? raw.orderId, "—"),
//     entityType: asCancellationEntity(raw.entityType),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     customerName: str(raw.customerName ?? raw.userName, "—"),
//     vendorId: str(raw.vendorId) || undefined,
//     vendorName: str(raw.vendorName) || undefined,
//     moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
//     currentStatus: str(raw.currentStatus, "UNKNOWN"),
//     requestedStatus: str(raw.requestedStatus, "CANCELLED"),
//     reason: asCancellationReason(raw.reason),
//     reasonText: str(raw.reasonText ?? raw.description, "—"),
//     refundRequired: bool(raw.refundRequired),
//     refundAmountPaise: num(raw.refundAmountPaise ?? raw.refundAmount),
//     requestedBy: str(raw.requestedBy, "—"),
//     approvedBy: str(raw.approvedBy) || undefined,
//     status: asStatus(raw.status),
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Hook                                                                        */
// /* -------------------------------------------------------------------------- */

// export function useOperationalOverrides(pollMs = 30000) {
//   const [dispatchOverrides, setDispatchOverrides] = useState<DispatchOverride[]>(
//     []
//   );
//   const [suspensionOverrides, setSuspensionOverrides] = useState<
//     SuspensionOverride[]
//   >([]);
//   const [cancellationOverrides, setCancellationOverrides] = useState<
//     CancellationOverride[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDispatchOverrides([]);
//       setSuspensionOverrides([]);
//       setCancellationOverrides([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const [dispatchRaw, suspensionRaw, cancellationRaw] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.DISPATCH_OVERRIDES,
//           [],
//           undefined,
//           200
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.SUSPENSION_OVERRIDES,
//           [],
//           undefined,
//           200
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CANCELLATION_OVERRIDES,
//           [],
//           undefined,
//           200
//         ),
//       ]);

//       setDispatchOverrides(dispatchRaw.map(mapDispatch));
//       setSuspensionOverrides(suspensionRaw.map(mapSuspension));
//       setCancellationOverrides(cancellationRaw.map(mapCancellation));
//     } catch (err) {
//       const message =
//         err instanceof Error
//           ? err.message
//           : "Unable to load operational overrides.";
//       setError(message);
//       setDispatchOverrides([]);
//       setSuspensionOverrides([]);
//       setCancellationOverrides([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     if (!pollMs || pollMs <= 0 || isFirestoreDemoMode) return;
//     const id = window.setInterval(() => {
//       void load();
//     }, pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   const activities: OverrideActivity[] = useMemo(() => {
//     const rows: OverrideActivity[] = [];

//     for (const d of dispatchOverrides) {
//       rows.push({
//         id: d.overrideId,
//         module: "DISPATCH",
//         title: d.requestedCaptainId
//           ? "Captain reassignment requested"
//           : "Dispatch override requested",
//         description: d.reasonText,
//         referenceId: d.overrideId,
//         requestedBy: d.requestedBy,
//         status: d.status,
//         createdAt: d.createdAt,
//         sortKey: sortMs(d.createdAt) || 0,
//       });
//     }

//     for (const s of suspensionOverrides) {
//       rows.push({
//         id: s.overrideId,
//         module: "SUSPENSIONS",
//         title: `${s.entityType} suspension request`,
//         description: s.reasonText,
//         referenceId: s.overrideId,
//         requestedBy: s.requestedBy,
//         status: s.status,
//         createdAt: s.createdAt,
//         sortKey: sortMs(s.createdAt) || 0,
//       });
//     }

//     for (const c of cancellationOverrides) {
//       rows.push({
//         id: c.overrideId,
//         module: "CANCELLATIONS",
//         title: `${c.entityType} cancellation override`,
//         description: c.reasonText,
//         referenceId: c.overrideId,
//         requestedBy: c.requestedBy,
//         status: c.status,
//         createdAt: c.createdAt,
//         sortKey: sortMs(c.createdAt) || 0,
//       });
//     }

//     return rows.sort((a, b) => b.sortKey - a.sortKey);
//   }, [dispatchOverrides, suspensionOverrides, cancellationOverrides]);

//   const updateStatus = useCallback(
//     async (
//       collection:
//         | typeof FIRESTORE_COLLECTIONS.DISPATCH_OVERRIDES
//         | typeof FIRESTORE_COLLECTIONS.SUSPENSION_OVERRIDES
//         | typeof FIRESTORE_COLLECTIONS.CANCELLATION_OVERRIDES,
//       documentId: string,
//       status: OverrideWorkflowStatus,
//       approvedBy?: string
//     ) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       const payload: Record<string, unknown> = { status };
//       if (approvedBy) payload.approvedBy = approvedBy;

//       await updateDocument(collection, documentId, payload);
//       await load();
//     },
//     [load]
//   );

//   const updateDispatchStatus = useCallback(
//     (id: string, status: OverrideWorkflowStatus, approvedBy?: string) =>
//       updateStatus(
//         FIRESTORE_COLLECTIONS.DISPATCH_OVERRIDES,
//         id,
//         status,
//         approvedBy
//       ),
//     [updateStatus]
//   );

//   const updateSuspensionStatus = useCallback(
//     (id: string, status: OverrideWorkflowStatus, approvedBy?: string) =>
//       updateStatus(
//         FIRESTORE_COLLECTIONS.SUSPENSION_OVERRIDES,
//         id,
//         status,
//         approvedBy
//       ),
//     [updateStatus]
//   );

//   const updateCancellationStatus = useCallback(
//     (id: string, status: OverrideWorkflowStatus, approvedBy?: string) =>
//       updateStatus(
//         FIRESTORE_COLLECTIONS.CANCELLATION_OVERRIDES,
//         id,
//         status,
//         approvedBy
//       ),
//     [updateStatus]
//   );

//   return {
//     activities,
//     dispatchOverrides,
//     suspensionOverrides,
//     cancellationOverrides,
//     loading,
//     error,
//     refresh: load,
//     updateDispatchStatus,
//     updateSuspensionStatus,
//     updateCancellationStatus,
//     isDemoMode: isFirestoreDemoMode,
//   };
// }

// export default useOperationalOverrides;


// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type OverrideWorkflowStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// export type OverrideModule = "DISPATCH" | "SUSPENSIONS" | "CANCELLATIONS";

// export type DispatchEntity = "ORDER" | "DELIVERY" | "RIDE" | "BOOKING" | string;
// export type CancellationEntity =
//   | "ORDER"
//   | "BOOKING"
//   | "RIDE"
//   | "DELIVERY"
//   | string;
// export type SuspensionEntity =
//   | "CUSTOMER"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "ACCOUNT"
//   | string;

// export type DispatchReason =
//   | "CAPTAIN_UNAVAILABLE"
//   | "CAPTAIN_REASSIGNMENT"
//   | "VENDOR_DELAY"
//   | "CUSTOMER_REQUEST"
//   | "SYSTEM_ISSUE"
//   | "SERVICE_ISSUE"
//   | "EMERGENCY"
//   | "OTHER"
//   | string;

// export type CancellationReason =
//   | "CUSTOMER_REQUEST"
//   | "VENDOR_REQUEST"
//   | "CAPTAIN_ISSUE"
//   | "SYSTEM_ISSUE"
//   | "SERVICE_UNAVAILABLE"
//   | "PAYMENT_ISSUE"
//   | "OTHER"
//   | string;

// export type SuspensionReason =
//   | "FRAUD"
//   | "POLICY_VIOLATION"
//   | "NON_PAYMENT"
//   | "ABUSE"
//   | "KYC_FAILURE"
//   | "OTHER"
//   | string;

// export type DispatchOverride = {
//   id: string;
//   overrideId: string;
//   entityType: DispatchEntity;
//   entityId: string;
//   moduleId: string;
//   customerId: string;
//   customerName: string;
//   vendorId?: string;
//   vendorName?: string;
//   currentCaptainId?: string;
//   currentCaptainName?: string;
//   requestedCaptainId?: string;
//   requestedCaptainName?: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: DispatchReason;
//   reasonText: string;
//   status: OverrideWorkflowStatus;
//   requestedBy: string;
//   approvedBy?: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type CancellationOverride = {
//   id: string;
//   overrideId: string;
//   entityType: CancellationEntity;
//   entityId: string;
//   moduleId: string;
//   customerId: string;
//   customerName: string;
//   vendorId?: string;
//   vendorName?: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: CancellationReason;
//   reasonText: string;
//   refundRequired: boolean;
//   refundAmountPaise: number;
//   status: OverrideWorkflowStatus;
//   requestedBy: string;
//   approvedBy?: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type SuspensionOverride = {
//   id: string;
//   overrideId: string;
//   entityType: SuspensionEntity;
//   entityId: string;
//   entityName: string;
//   moduleId: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: SuspensionReason;
//   reasonText: string;
//   durationLabel: string;
//   status: OverrideWorkflowStatus;
//   requestedBy: string;
//   approvedBy?: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type OverrideActivity = {
//   id: string;
//   referenceId: string;
//   title: string;
//   description: string;
//   module: OverrideModule;
//   status: OverrideWorkflowStatus;
//   requestedBy: string;
//   createdAt: string;
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

// function dateLabel(v: unknown): string {
//   if (typeof v === "string" && v.trim()) {
//     const d = new Date(v);
//     if (!Number.isNaN(d.getTime())) {
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//     return v.trim();
//   }
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch {
//       return "—";
//     }
//   }
//   return "—";
// }

// function asWorkflowStatus(v: unknown): OverrideWorkflowStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   if (s === "APPROVED" || s === "REJECTED" || s === "EXECUTED") return s;
//   return "PENDING";
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

// /** Collection names — adjust if your firestore.ts uses different keys */
// const COL = {
//   DISPATCH:
//     (FIRESTORE_COLLECTIONS as Record<string, string>).DISPATCH_OVERRIDES ??
//     "dispatch_overrides",
//   CANCELLATION:
//     (FIRESTORE_COLLECTIONS as Record<string, string>).CANCELLATION_OVERRIDES ??
//     "cancellation_overrides",
//   SUSPENSION:
//     (FIRESTORE_COLLECTIONS as Record<string, string>).SUSPENSION_OVERRIDES ??
//     "suspension_overrides",
// };

// function mapDispatch(
//   raw: Record<string, unknown> & { id: string }
// ): DispatchOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityType: str(raw.entityType, "ORDER").toUpperCase() as DispatchEntity,
//     entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId, "—"),
//     moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     customerName: str(raw.customerName ?? raw.userName, "—"),
//     vendorId: str(raw.vendorId, "") || undefined,
//     vendorName: str(raw.vendorName, "") || undefined,
//     currentCaptainId: str(raw.currentCaptainId ?? raw.captainId, "") || undefined,
//     currentCaptainName:
//       str(raw.currentCaptainName ?? raw.captainName, "") || undefined,
//     requestedCaptainId: str(raw.requestedCaptainId, "") || undefined,
//     requestedCaptainName: str(raw.requestedCaptainName, "") || undefined,
//     currentStatus: str(raw.currentStatus ?? raw.fromStatus, "—"),
//     requestedStatus: str(raw.requestedStatus ?? raw.toStatus, "—"),
//     reason: str(raw.reason, "OTHER").toUpperCase() as DispatchReason,
//     reasonText: str(raw.reasonText ?? raw.notes ?? raw.description, "—"),
//     status: asWorkflowStatus(raw.status),
//     requestedBy: str(raw.requestedBy ?? raw.createdBy, "—"),
//     approvedBy: str(raw.approvedBy, "") || undefined,
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapCancellation(
//   raw: Record<string, unknown> & { id: string }
// ): CancellationOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityType: str(raw.entityType, "ORDER").toUpperCase() as CancellationEntity,
//     entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId, "—"),
//     moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     customerName: str(raw.customerName ?? raw.userName, "—"),
//     vendorId: str(raw.vendorId, "") || undefined,
//     vendorName: str(raw.vendorName, "") || undefined,
//     currentStatus: str(raw.currentStatus ?? raw.fromStatus, "—"),
//     requestedStatus: str(
//       raw.requestedStatus ?? raw.toStatus,
//       "CANCELLED"
//     ),
//     reason: str(raw.reason, "OTHER").toUpperCase() as CancellationReason,
//     reasonText: str(raw.reasonText ?? raw.notes ?? raw.description, "—"),
//     refundRequired: Boolean(
//       raw.refundRequired ?? (num(raw.refundAmountPaise ?? raw.refundAmount) > 0)
//     ),
//     refundAmountPaise: num(raw.refundAmountPaise ?? raw.refundAmount),
//     status: asWorkflowStatus(raw.status),
//     requestedBy: str(raw.requestedBy ?? raw.createdBy, "—"),
//     approvedBy: str(raw.approvedBy, "") || undefined,
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// function mapSuspension(
//   raw: Record<string, unknown> & { id: string }
// ): SuspensionOverride {
//   return {
//     id: raw.id,
//     overrideId: str(raw.overrideId ?? raw.id, raw.id),
//     entityType: str(raw.entityType ?? raw.partyType, "VENDOR").toUpperCase() as SuspensionEntity,
//     entityId: str(
//       raw.entityId ?? raw.vendorId ?? raw.captainId ?? raw.customerId,
//       "—"
//     ),
//     entityName: str(
//       raw.entityName ?? raw.vendorName ?? raw.captainName ?? raw.customerName,
//       "—"
//     ),
//     moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
//     currentStatus: str(raw.currentStatus ?? raw.fromStatus, "ACTIVE"),
//     requestedStatus: str(
//       raw.requestedStatus ?? raw.toStatus,
//       "SUSPENDED"
//     ),
//     reason: str(raw.reason, "OTHER").toUpperCase() as SuspensionReason,
//     reasonText: str(raw.reasonText ?? raw.notes ?? raw.description, "—"),
//     durationLabel: str(raw.durationLabel ?? raw.duration, "Until review"),
//     status: asWorkflowStatus(raw.status),
//     requestedBy: str(raw.requestedBy ?? raw.createdBy, "—"),
//     approvedBy: str(raw.approvedBy, "") || undefined,
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt ?? raw.createdAt),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Hook                                                                       */
// /* -------------------------------------------------------------------------- */

// export function useOperationalOverrides(pollMs = 30000) {
//   const [dispatchOverrides, setDispatchOverrides] = useState<DispatchOverride[]>(
//     []
//   );
//   const [cancellationOverrides, setCancellationOverrides] = useState<
//     CancellationOverride[]
//   >([]);
//   const [suspensionOverrides, setSuspensionOverrides] = useState<
//     SuspensionOverride[]
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const isDemoMode = isFirestoreDemoMode;

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDispatchOverrides([]);
//       setCancellationOverrides([]);
//       setSuspensionOverrides([]);
//       setLoading(false);
//       return;
//     }
//     try {
//       const [dispatchRaw, cancelRaw, suspendRaw] = await Promise.all([
//         loadRaw(COL.DISPATCH),
//         loadRaw(COL.CANCELLATION),
//         loadRaw(COL.SUSPENSION),
//       ]);
//       setDispatchOverrides(dispatchRaw.map(mapDispatch));
//       setCancellationOverrides(cancelRaw.map(mapCancellation));
//       setSuspensionOverrides(suspendRaw.map(mapSuspension));
//     } catch (err) {
//       console.error("useOperationalOverrides error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to load overrides."
//       );
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

//   const activities: OverrideActivity[] = useMemo(() => {
//     const fromDispatch: OverrideActivity[] = dispatchOverrides.map((d) => ({
//       id: d.overrideId,
//       referenceId: d.entityId,
//       title: `Dispatch · ${d.entityType}`,
//       description: d.reasonText || `${d.currentStatus} → ${d.requestedStatus}`,
//       module: "DISPATCH",
//       status: d.status,
//       requestedBy: d.requestedBy,
//       createdAt: d.createdAt,
//     }));
//     const fromCancel: OverrideActivity[] = cancellationOverrides.map((c) => ({
//       id: c.overrideId,
//       referenceId: c.entityId,
//       title: `Cancellation · ${c.entityType}`,
//       description: c.reasonText || `${c.currentStatus} → ${c.requestedStatus}`,
//       module: "CANCELLATIONS",
//       status: c.status,
//       requestedBy: c.requestedBy,
//       createdAt: c.createdAt,
//     }));
//     const fromSuspend: OverrideActivity[] = suspensionOverrides.map((s) => ({
//       id: s.overrideId,
//       referenceId: s.entityId,
//       title: `Suspension · ${s.entityType}`,
//       description: s.reasonText || `${s.entityName}`,
//       module: "SUSPENSIONS",
//       status: s.status,
//       requestedBy: s.requestedBy,
//       createdAt: s.createdAt,
//     }));
//     return [...fromDispatch, ...fromCancel, ...fromSuspend].sort((a, b) =>
//       a.createdAt < b.createdAt ? 1 : -1
//     );
//   }, [dispatchOverrides, cancellationOverrides, suspensionOverrides]);

//   async function patchStatus(
//     collection: string,
//     docId: string,
//     status: OverrideWorkflowStatus,
//     approvedBy?: string
//   ) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }
//     const payload: Record<string, unknown> = {
//       status,
//       updatedAt: new Date().toISOString(),
//     };
//     if (status === "APPROVED" && approvedBy) {
//       payload.approvedBy = approvedBy;
//       payload.approvedAt = new Date().toISOString();
//     }
//     if (status === "EXECUTED") {
//       payload.executedAt = new Date().toISOString();
//     }
//     if (status === "REJECTED") {
//       payload.rejectedAt = new Date().toISOString();
//     }
//     await updateDocument(collection, docId, payload);
//     await load();
//   }

//   const updateDispatchStatus = useCallback(
//     async (
//       id: string,
//       status: OverrideWorkflowStatus,
//       approvedBy?: string
//     ) => {
//       await patchStatus(COL.DISPATCH, id, status, approvedBy);
//     },
//     [load]
//   );

//   const updateCancellationStatus = useCallback(
//     async (
//       id: string,
//       status: OverrideWorkflowStatus,
//       approvedBy?: string
//     ) => {
//       await patchStatus(COL.CANCELLATION, id, status, approvedBy);
//     },
//     [load]
//   );

//   const updateSuspensionStatus = useCallback(
//     async (
//       id: string,
//       status: OverrideWorkflowStatus,
//       approvedBy?: string
//     ) => {
//       await patchStatus(COL.SUSPENSION, id, status, approvedBy);
//     },
//     [load]
//   );

//   return {
//     activities,
//     dispatchOverrides,
//     cancellationOverrides,
//     suspensionOverrides,
//     loading,
//     error,
//     isDemoMode,
//     refresh: load,
//     updateDispatchStatus,
//     updateCancellationStatus,
//     updateSuspensionStatus,
//   };
// }

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type OverrideWorkflowStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "EXECUTED";

export type OverrideModule =
  | "DISPATCH"
  | "SUSPENSIONS"
  | "CANCELLATIONS";

export type DispatchEntity =
  | "ORDER"
  | "DELIVERY"
  | "RIDE"
  | "BOOKING"
  | string;

export type CancellationEntity =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY"
  | string;

export type SuspensionEntity =
  | "CUSTOMER"
  | "VENDOR"
  | "CAPTAIN"
  | "ACCOUNT"
  | string;

export type DispatchReason =
  | "CAPTAIN_UNAVAILABLE"
  | "CAPTAIN_REASSIGNMENT"
  | "VENDOR_DELAY"
  | "CUSTOMER_REQUEST"
  | "SYSTEM_ISSUE"
  | "SERVICE_ISSUE"
  | "EMERGENCY"
  | "OTHER"
  | string;

export type CancellationReason =
  | "CUSTOMER_REQUEST"
  | "VENDOR_REQUEST"
  | "CAPTAIN_ISSUE"
  | "SYSTEM_ISSUE"
  | "SERVICE_UNAVAILABLE"
  | "PAYMENT_ISSUE"
  | "OTHER"
  | string;

export type SuspensionReason =
  | "FRAUD"
  | "POLICY_VIOLATION"
  | "NON_PAYMENT"
  | "ABUSE"
  | "KYC_FAILURE"
  | "OTHER"
  | string;

export type DispatchOverride = {
  id: string;
  overrideId: string;
  entityType: DispatchEntity;
  entityId: string;
  moduleId: string;
  customerId: string;
  customerName: string;
  vendorId?: string;
  vendorName?: string;
  currentCaptainId?: string;
  currentCaptainName?: string;
  requestedCaptainId?: string;
  requestedCaptainName?: string;
  currentStatus: string;
  requestedStatus: string;
  reason: DispatchReason;
  reasonText: string;
  status: OverrideWorkflowStatus;
  requestedBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type CancellationOverride = {
  id: string;
  overrideId: string;
  entityType: CancellationEntity;
  entityId: string;
  moduleId: string;
  customerId: string;
  customerName: string;
  vendorId?: string;
  vendorName?: string;
  currentStatus: string;
  requestedStatus: string;
  reason: CancellationReason;
  reasonText: string;
  refundRequired: boolean;
  refundAmountPaise: number;
  status: OverrideWorkflowStatus;
  requestedBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type SuspensionOverride = {
  id: string;
  overrideId: string;
  entityType: SuspensionEntity;
  entityId: string;
  entityName: string;
  moduleId: string;
  currentStatus: string;
  requestedStatus: string;
  reason: SuspensionReason;
  reasonText: string;
  durationLabel: string;
  status: OverrideWorkflowStatus;
  requestedBy: string;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
};

export type OverrideActivity = {
  id: string;
  referenceId: string;
  title: string;
  description: string;
  module: OverrideModule;
  status: OverrideWorkflowStatus;
  requestedBy: string;
  createdAt: string;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function str(v: unknown, fallback = ""): string {
  if (typeof v === "string" && v.trim()) {
    return v.trim();
  }

  if (typeof v === "number") {
    return String(v);
  }

  return fallback;
}

function num(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) {
    return v;
  }

  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  return 0;
}

function dateLabel(v: unknown): string {
  if (typeof v === "string" && v.trim()) {
    const d = new Date(v);

    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return v.trim();
  }

  if (v && typeof v === "object" && "toDate" in v) {
    try {
      return (v as { toDate: () => Date })
        .toDate()
        .toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
    } catch {
      return "—";
    }
  }

  return "—";
}

function asWorkflowStatus(v: unknown): OverrideWorkflowStatus {
  const status = String(v ?? "PENDING").toUpperCase();

  if (
    status === "APPROVED" ||
    status === "REJECTED" ||
    status === "EXECUTED"
  ) {
    return status;
  }

  return "PENDING";
}

/* -------------------------------------------------------------------------- */
/* Firestore collection loading                                               */
/* -------------------------------------------------------------------------- */

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
      console.error(
        `loadRaw(${collectionName}) failed:`,
        err
      );

      return [];
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Firestore collection constants                                             */
/* -------------------------------------------------------------------------- */

/**
 * These keys should also exist in FIRESTORE_COLLECTIONS in
 * src/lib/firebase/firestore.ts.
 *
 * The fallback strings keep the runtime collection names explicit.
 */
const DISPATCH_COLLECTION =
  (FIRESTORE_COLLECTIONS as Record<string, string>)
    .DISPATCH_OVERRIDES ?? "dispatch_overrides";

const CANCELLATION_COLLECTION =
  (FIRESTORE_COLLECTIONS as Record<string, string>)
    .CANCELLATION_OVERRIDES ?? "cancellation_overrides";

const SUSPENSION_COLLECTION =
  (FIRESTORE_COLLECTIONS as Record<string, string>)
    .SUSPENSION_OVERRIDES ?? "suspension_overrides";

/**
 * Use the parameter types declared by updateDocument instead of passing
 * an arbitrary string and Record<string, unknown> directly.
 */
type UpdateDocumentCollection = Parameters<
  typeof updateDocument
>[0];

type UpdateDocumentPayload = Parameters<
  typeof updateDocument
>[2];

/* -------------------------------------------------------------------------- */
/* Data mapping                                                               */
/* -------------------------------------------------------------------------- */

function mapDispatch(
  raw: Record<string, unknown> & { id: string }
): DispatchOverride {
  return {
    id: raw.id,
    overrideId: str(raw.overrideId ?? raw.id, raw.id),
    entityType: str(
      raw.entityType,
      "ORDER"
    ).toUpperCase() as DispatchEntity,
    entityId: str(
      raw.entityId ?? raw.orderId ?? raw.rideId,
      "—"
    ),
    moduleId: str(
      raw.moduleId ?? raw.module,
      "JUCART"
    ).toUpperCase(),
    customerId: str(
      raw.customerId ?? raw.userId,
      "—"
    ),
    customerName: str(
      raw.customerName ?? raw.userName,
      "—"
    ),
    vendorId: str(raw.vendorId, "") || undefined,
    vendorName: str(raw.vendorName, "") || undefined,
    currentCaptainId:
      str(raw.currentCaptainId ?? raw.captainId, "") ||
      undefined,
    currentCaptainName:
      str(
        raw.currentCaptainName ?? raw.captainName,
        ""
      ) || undefined,
    requestedCaptainId:
      str(raw.requestedCaptainId, "") || undefined,
    requestedCaptainName:
      str(raw.requestedCaptainName, "") || undefined,
    currentStatus: str(
      raw.currentStatus ?? raw.fromStatus,
      "—"
    ),
    requestedStatus: str(
      raw.requestedStatus ?? raw.toStatus,
      "—"
    ),
    reason: str(
      raw.reason,
      "OTHER"
    ).toUpperCase() as DispatchReason,
    reasonText: str(
      raw.reasonText ?? raw.notes ?? raw.description,
      "—"
    ),
    status: asWorkflowStatus(raw.status),
    requestedBy: str(
      raw.requestedBy ?? raw.createdBy,
      "—"
    ),
    approvedBy: str(raw.approvedBy, "") || undefined,
    createdAt: dateLabel(raw.createdAt),
    updatedAt: dateLabel(
      raw.updatedAt ?? raw.createdAt
    ),
  };
}

function mapCancellation(
  raw: Record<string, unknown> & { id: string }
): CancellationOverride {
  return {
    id: raw.id,
    overrideId: str(raw.overrideId ?? raw.id, raw.id),
    entityType: str(
      raw.entityType,
      "ORDER"
    ).toUpperCase() as CancellationEntity,
    entityId: str(
      raw.entityId ?? raw.orderId ?? raw.rideId,
      "—"
    ),
    moduleId: str(
      raw.moduleId ?? raw.module,
      "JUCART"
    ).toUpperCase(),
    customerId: str(
      raw.customerId ?? raw.userId,
      "—"
    ),
    customerName: str(
      raw.customerName ?? raw.userName,
      "—"
    ),
    vendorId: str(raw.vendorId, "") || undefined,
    vendorName: str(raw.vendorName, "") || undefined,
    currentStatus: str(
      raw.currentStatus ?? raw.fromStatus,
      "—"
    ),
    requestedStatus: str(
      raw.requestedStatus ?? raw.toStatus,
      "CANCELLED"
    ),
    reason: str(
      raw.reason,
      "OTHER"
    ).toUpperCase() as CancellationReason,
    reasonText: str(
      raw.reasonText ?? raw.notes ?? raw.description,
      "—"
    ),
    refundRequired: Boolean(
      raw.refundRequired ??
        (num(
          raw.refundAmountPaise ?? raw.refundAmount
        ) > 0)
    ),
    refundAmountPaise: num(
      raw.refundAmountPaise ?? raw.refundAmount
    ),
    status: asWorkflowStatus(raw.status),
    requestedBy: str(
      raw.requestedBy ?? raw.createdBy,
      "—"
    ),
    approvedBy: str(raw.approvedBy, "") || undefined,
    createdAt: dateLabel(raw.createdAt),
    updatedAt: dateLabel(
      raw.updatedAt ?? raw.createdAt
    ),
  };
}

function mapSuspension(
  raw: Record<string, unknown> & { id: string }
): SuspensionOverride {
  return {
    id: raw.id,
    overrideId: str(raw.overrideId ?? raw.id, raw.id),
    entityType: str(
      raw.entityType ?? raw.partyType,
      "VENDOR"
    ).toUpperCase() as SuspensionEntity,
    entityId: str(
      raw.entityId ??
        raw.vendorId ??
        raw.captainId ??
        raw.customerId,
      "—"
    ),
    entityName: str(
      raw.entityName ??
        raw.vendorName ??
        raw.captainName ??
        raw.customerName,
      "—"
    ),
    moduleId: str(
      raw.moduleId ?? raw.module,
      "JUCART"
    ).toUpperCase(),
    currentStatus: str(
      raw.currentStatus ?? raw.fromStatus,
      "ACTIVE"
    ),
    requestedStatus: str(
      raw.requestedStatus ?? raw.toStatus,
      "SUSPENDED"
    ),
    reason: str(
      raw.reason,
      "OTHER"
    ).toUpperCase() as SuspensionReason,
    reasonText: str(
      raw.reasonText ?? raw.notes ?? raw.description,
      "—"
    ),
    durationLabel: str(
      raw.durationLabel ?? raw.duration,
      "Until review"
    ),
    status: asWorkflowStatus(raw.status),
    requestedBy: str(
      raw.requestedBy ?? raw.createdBy,
      "—"
    ),
    approvedBy: str(raw.approvedBy, "") || undefined,
    createdAt: dateLabel(raw.createdAt),
    updatedAt: dateLabel(
      raw.updatedAt ?? raw.createdAt
    ),
  };
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useOperationalOverrides(
  pollMs = 30000
) {
  const [dispatchOverrides, setDispatchOverrides] =
    useState<DispatchOverride[]>([]);

  const [cancellationOverrides, setCancellationOverrides] =
    useState<CancellationOverride[]>([]);

  const [suspensionOverrides, setSuspensionOverrides] =
    useState<SuspensionOverride[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const isDemoMode = isFirestoreDemoMode;

  /* ------------------------------------------------------------------------ */
  /* Load override records                                                    */
  /* ------------------------------------------------------------------------ */

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setDispatchOverrides([]);
      setCancellationOverrides([]);
      setSuspensionOverrides([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const [
        dispatchRaw,
        cancellationRaw,
        suspensionRaw,
      ] = await Promise.all([
        loadRaw(DISPATCH_COLLECTION),
        loadRaw(CANCELLATION_COLLECTION),
        loadRaw(SUSPENSION_COLLECTION),
      ]);

      setDispatchOverrides(
        dispatchRaw.map(mapDispatch)
      );

      setCancellationOverrides(
        cancellationRaw.map(mapCancellation)
      );

      setSuspensionOverrides(
        suspensionRaw.map(mapSuspension)
      );
    } catch (err) {
      console.error(
        "useOperationalOverrides error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load overrides."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /* ------------------------------------------------------------------------ */
  /* Initial load and polling                                                 */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    void load();

    if (pollMs <= 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void load();
    }, pollMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [load, pollMs]);

  /* ------------------------------------------------------------------------ */
  /* Activity feed                                                            */
  /* ------------------------------------------------------------------------ */

  const activities: OverrideActivity[] = useMemo(() => {
    const fromDispatch: OverrideActivity[] =
      dispatchOverrides.map((dispatch) => ({
        id: dispatch.overrideId,
        referenceId: dispatch.entityId,
        title: `Dispatch · ${dispatch.entityType}`,
        description:
          dispatch.reasonText ||
          `${dispatch.currentStatus} → ${dispatch.requestedStatus}`,
        module: "DISPATCH",
        status: dispatch.status,
        requestedBy: dispatch.requestedBy,
        createdAt: dispatch.createdAt,
      }));

    const fromCancellation: OverrideActivity[] =
      cancellationOverrides.map((cancellation) => ({
        id: cancellation.overrideId,
        referenceId: cancellation.entityId,
        title: `Cancellation · ${cancellation.entityType}`,
        description:
          cancellation.reasonText ||
          `${cancellation.currentStatus} → ${cancellation.requestedStatus}`,
        module: "CANCELLATIONS",
        status: cancellation.status,
        requestedBy: cancellation.requestedBy,
        createdAt: cancellation.createdAt,
      }));

    const fromSuspension: OverrideActivity[] =
      suspensionOverrides.map((suspension) => ({
        id: suspension.overrideId,
        referenceId: suspension.entityId,
        title: `Suspension · ${suspension.entityType}`,
        description:
          suspension.reasonText ||
          suspension.entityName,
        module: "SUSPENSIONS",
        status: suspension.status,
        requestedBy: suspension.requestedBy,
        createdAt: suspension.createdAt,
      }));

    return [
      ...fromDispatch,
      ...fromCancellation,
      ...fromSuspension,
    ].sort((a, b) =>
      a.createdAt < b.createdAt ? 1 : -1
    );
  }, [
    dispatchOverrides,
    cancellationOverrides,
    suspensionOverrides,
  ]);

  /* ------------------------------------------------------------------------ */
  /* Update workflow status                                                   */
  /* ------------------------------------------------------------------------ */

  const patchStatus = useCallback(
    async (
      collectionName: string,
      docId: string,
      status: OverrideWorkflowStatus,
      approvedBy?: string
    ) => {
      if (isFirestoreDemoMode) {
        throw new Error(
          "Writes are disabled in demo mode."
        );
      }

      const now = new Date().toISOString();

      const payload: Record<string, unknown> = {
        status,
        updatedAt: now,
      };

      if (status === "APPROVED" && approvedBy) {
        payload.approvedBy = approvedBy;
        payload.approvedAt = now;
      }

      if (status === "EXECUTED") {
        payload.executedAt = now;
      }

      if (status === "REJECTED") {
        payload.rejectedAt = now;
      }

      /**
       * This uses the argument types defined by updateDocument,
       * preventing the generic string/payload signature mismatch.
       */
      await updateDocument(
        collectionName as UpdateDocumentCollection,
        docId,
        payload as UpdateDocumentPayload
      );

      await load();
    },
    [load]
  );

  /* ------------------------------------------------------------------------ */
  /* Dispatch status updater                                                  */
  /* ------------------------------------------------------------------------ */

  const updateDispatchStatus = useCallback(
    async (
      id: string,
      status: OverrideWorkflowStatus,
      approvedBy?: string
    ) => {
      await patchStatus(
        DISPATCH_COLLECTION,
        id,
        status,
        approvedBy
      );
    },
    [patchStatus]
  );

  /* ------------------------------------------------------------------------ */
  /* Cancellation status updater                                              */
  /* ------------------------------------------------------------------------ */

  const updateCancellationStatus = useCallback(
    async (
      id: string,
      status: OverrideWorkflowStatus,
      approvedBy?: string
    ) => {
      await patchStatus(
        CANCELLATION_COLLECTION,
        id,
        status,
        approvedBy
      );
    },
    [patchStatus]
  );

  /* ------------------------------------------------------------------------ */
  /* Suspension status updater                                                */
  /* ------------------------------------------------------------------------ */

  const updateSuspensionStatus = useCallback(
    async (
      id: string,
      status: OverrideWorkflowStatus,
      approvedBy?: string
    ) => {
      await patchStatus(
        SUSPENSION_COLLECTION,
        id,
        status,
        approvedBy
      );
    },
    [patchStatus]
  );

  /* ------------------------------------------------------------------------ */
  /* Hook return                                                              */
  /* ------------------------------------------------------------------------ */

  return {
    activities,
    dispatchOverrides,
    cancellationOverrides,
    suspensionOverrides,
    loading,
    error,
    isDemoMode,
    refresh: load,
    updateDispatchStatus,
    updateCancellationStatus,
    updateSuspensionStatus,
  };
}