// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Shared types for dashboard                                                 */
// /* -------------------------------------------------------------------------- */

// export type AuditModule =
//   | "GENERAL_LEDGER"
//   | "PAYOUTS"
//   | "CASHFREE"
//   | "SETTLEMENTS"
//   | "REFUNDS";

// export type AuditStatus = "HEALTHY" | "REVIEW" | "CRITICAL" | "PENDING";

// export type FinancialActivity = {
//   id: string;
//   module: AuditModule;
//   title: string;
//   description: string;
//   referenceId: string;
//   amountPaise: number;
//   status: AuditStatus;
//   createdAt: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Ledger (UI shape used by general-ledger page)                              */
// /* -------------------------------------------------------------------------- */

// export type AccountType =
//   | "CUSTOMER"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "JUONE"
//   | "PLATFORM"
//   | "TAX"
//   | "GATEWAY";

// export type TransactionType =
//   | "ORDER_PAYMENT"
//   | "COMMISSION"
//   | "CAPTAIN_EARNING"
//   | "TAX"
//   | "GATEWAY_FEE"
//   | "REFUND"
//   | "SETTLEMENT"
//   | "ADJUSTMENT";

// export type LedgerStatus = "POSTED" | "PENDING" | "REVERSED" | "HELD";

// export type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// export type LedgerEntry = {
//   ledgerEntryId: string;
//   transactionId: string;
//   accountType: AccountType;
//   accountId: string;
//   accountName: string;
//   transactionType: TransactionType;
//   moduleId: ModuleId;
//   debitPaise: number;
//   creditPaise: number;
//   currency: string;
//   status: LedgerStatus;
//   description: string;
//   referenceId: string;
//   correlationId: string;
//   createdAt: string;
//   postedAt?: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Cashfree reconciliation                                                    */
// /* -------------------------------------------------------------------------- */

// export type ReconciliationStatus =
//   | "MATCHED"
//   | "MISMATCH"
//   | "PENDING"
//   | "INVESTIGATING"
//   | "RESOLVED";

// export type PaymentStatus =
//   | "CREATED"
//   | "PENDING"
//   | "PAID"
//   | "FAILED"
//   | "REFUNDED"
//   | "PARTIALLY_REFUNDED"
//   | "CANCELLED";

// export type EntityType = "ORDER" | "BOOKING" | "RIDE";

// export type ReconciliationRecord = {
//   reconciliationId: string;
//   paymentId: string;
//   cashfreeOrderId: string;
//   entityId: string;
//   entityType: EntityType;
//   customerId: string;
//   amountPaise: number;
//   cashfreeAmountPaise: number;
//   paymentStatus: PaymentStatus;
//   reconciliationStatus: ReconciliationStatus;
//   eventType: string;
//   signatureVerified: boolean;
//   currency: string;
//   receivedAt: string;
//   reconciledAt?: string;
//   mismatchReason?: string;
//   correlationId: string;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// function str(v: unknown, fallback = "—"): string {
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

// function asLedgerStatus(v: unknown): LedgerStatus {
//   const s = String(v ?? "POSTED").toUpperCase();
//   if (s === "PENDING" || s === "REVERSED" || s === "HELD") return s;
//   return "POSTED";
// }

// function asAccountType(v: unknown): AccountType {
//   const s = String(v ?? "PLATFORM").toUpperCase();
//   const allowed: AccountType[] = [
//     "CUSTOMER",
//     "VENDOR",
//     "CAPTAIN",
//     "JUONE",
//     "PLATFORM",
//     "TAX",
//     "GATEWAY",
//   ];
//   return (allowed as string[]).includes(s) ? (s as AccountType) : "PLATFORM";
// }

// function asTxnType(v: unknown): TransactionType {
//   const s = String(v ?? "ADJUSTMENT").toUpperCase();
//   const allowed: TransactionType[] = [
//     "ORDER_PAYMENT",
//     "COMMISSION",
//     "CAPTAIN_EARNING",
//     "TAX",
//     "GATEWAY_FEE",
//     "REFUND",
//     "SETTLEMENT",
//     "ADJUSTMENT",
//   ];
//   return (allowed as string[]).includes(s) ? (s as TransactionType) : "ADJUSTMENT";
// }

// function asModuleId(v: unknown): ModuleId {
//   const s = String(v ?? "JUCART").toUpperCase();
//   const allowed: ModuleId[] = [
//     "JUCART",
//     "JURIDE",
//     "JUSTAY",
//     "JUHOME",
//     "JUSHOPPING",
//   ];
//   return (allowed as string[]).includes(s) ? (s as ModuleId) : "JUCART";
// }

// function mapLedger(raw: Record<string, unknown> & { id: string }): LedgerEntry {
//   const debit = num(raw.debitPaise ?? raw.debit);
//   const credit = num(raw.creditPaise ?? raw.credit);
//   const amount = num(raw.amountPaise ?? raw.amount);
//   const type = str(raw.type ?? raw.entryType, "").toUpperCase();

//   let debitPaise = debit;
//   let creditPaise = credit;
//   if (!debit && !credit && amount) {
//     if (type === "DEBIT") debitPaise = amount;
//     else creditPaise = amount;
//   }

//   return {
//     ledgerEntryId: str(raw.ledgerEntryId ?? raw.id, raw.id),
//     transactionId: str(raw.transactionId ?? raw.txnId, "—"),
//     accountType: asAccountType(raw.accountType),
//     accountId: str(raw.accountId, "—"),
//     accountName: str(raw.accountName, "—"),
//     transactionType: asTxnType(raw.transactionType ?? raw.type),
//     moduleId: asModuleId(raw.moduleId ?? raw.module),
//     debitPaise,
//     creditPaise,
//     currency: str(raw.currency, "INR"),
//     status: asLedgerStatus(raw.status),
//     description: str(raw.description, "—"),
//     referenceId: str(raw.referenceId ?? raw.orderId ?? raw.rideId, "—"),
//     correlationId: str(raw.correlationId, "—"),
//     createdAt: dateLabel(raw.createdAt),
//     postedAt: raw.postedAt ? dateLabel(raw.postedAt) : undefined,
//   };
// }

// function asReconStatus(v: unknown): ReconciliationStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   if (
//     s === "MATCHED" ||
//     s === "MISMATCH" ||
//     s === "INVESTIGATING" ||
//     s === "RESOLVED"
//   )
//     return s;
//   return "PENDING";
// }

// function asPaymentStatus(v: unknown): PaymentStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   const allowed: PaymentStatus[] = [
//     "CREATED",
//     "PENDING",
//     "PAID",
//     "FAILED",
//     "REFUNDED",
//     "PARTIALLY_REFUNDED",
//     "CANCELLED",
//   ];
//   return (allowed as string[]).includes(s) ? (s as PaymentStatus) : "PENDING";
// }

// function asEntityType(v: unknown): EntityType {
//   const s = String(v ?? "ORDER").toUpperCase();
//   if (s === "BOOKING" || s === "RIDE") return s;
//   return "ORDER";
// }

// function mapCashfree(
//   raw: Record<string, unknown> & { id: string }
// ): ReconciliationRecord {
//   const amount = num(raw.amountPaise ?? raw.amount);
//   const cfAmount = num(
//     raw.cashfreeAmountPaise ?? raw.cfAmountPaise ?? raw.amountPaise ?? amount
//   );
//   return {
//     reconciliationId: str(raw.reconciliationId ?? raw.id, raw.id),
//     paymentId: str(raw.paymentId, "—"),
//     cashfreeOrderId: str(
//       raw.cashfreeOrderId ?? raw.cfOrderId ?? raw.orderId,
//       "—"
//     ),
//     entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId, "—"),
//     entityType: asEntityType(raw.entityType ?? raw.transactionType),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     amountPaise: amount,
//     cashfreeAmountPaise: cfAmount,
//     paymentStatus: asPaymentStatus(raw.paymentStatus ?? raw.status),
//     reconciliationStatus: asReconStatus(
//       raw.reconciliationStatus ?? raw.reconStatus
//     ),
//     eventType: str(raw.eventType ?? raw.type, "PAYMENT_SUCCESS"),
//     signatureVerified: Boolean(
//       raw.signatureVerified ?? raw.signatureValid ?? true
//     ),
//     currency: str(raw.currency, "INR"),
//     receivedAt: dateLabel(raw.receivedAt ?? raw.createdAt),
//     reconciledAt: raw.reconciledAt ? dateLabel(raw.reconciledAt) : undefined,
//     mismatchReason: raw.mismatchReason
//       ? str(raw.mismatchReason)
//       : amount !== cfAmount
//         ? "Internal amount differs from Cashfree amount."
//         : undefined,
//     correlationId: str(raw.correlationId, "—"),
//   };
// }

// function mapSettlementActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING") || statusRaw.includes("PROCESS"))
//     status = "PENDING";
//   else if (statusRaw.includes("HOLD") || statusRaw.includes("BLOCK"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW") || statusRaw.includes("MISMATCH"))
//     status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "SETTLEMENTS",
//     title: str(raw.title ?? "Settlement record", "Settlement record"),
//     description: str(
//       raw.description ?? `Settlement ${str(raw.settlementId ?? raw.id)}`
//     ),
//     referenceId: str(raw.settlementId ?? raw.referenceId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.totalPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt ?? raw.updatedAt),
//   };
// }

// function mapRefundActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING")) status = "PENDING";
//   else if (statusRaw.includes("FAIL") || statusRaw.includes("REJECT"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW")) status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "REFUNDS",
//     title: str(raw.title ?? "Refund processed", "Refund processed"),
//     description: str(
//       raw.description ?? `Refund ${str(raw.refundId ?? raw.id)}`
//     ),
//     referenceId: str(raw.refundId ?? raw.referenceId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt),
//   };
// }

// function mapPayoutActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING") || statusRaw.includes("PROCESS"))
//     status = "PENDING";
//   else if (statusRaw.includes("HOLD") || statusRaw.includes("BLOCK"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW")) status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "PAYOUTS",
//     title: str(raw.title ?? "Payout record", "Payout record"),
//     description: str(
//       raw.description ??
//         `Payout to ${str(raw.vendorId ?? raw.captainId ?? "recipient")}`
//     ),
//     referenceId: str(raw.payoutId ?? raw.settlementId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.payoutPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt ?? raw.updatedAt),
//   };
// }

// function mapLedgerActivity(entry: LedgerEntry): FinancialActivity {
//   let status: AuditStatus = "HEALTHY";
//   if (entry.status === "PENDING") status = "PENDING";
//   else if (entry.status === "HELD") status = "CRITICAL";
//   else if (entry.status === "REVERSED") status = "REVIEW";

//   return {
//     id: entry.ledgerEntryId,
//     module: "GENERAL_LEDGER",
//     title: entry.description || "Ledger entry",
//     description: `${entry.accountType} · ${entry.transactionType}`,
//     referenceId: entry.referenceId || entry.ledgerEntryId,
//     amountPaise: entry.debitPaise || entry.creditPaise,
//     status,
//     createdAt: entry.createdAt,
//   };
// }

// function mapCashfreeActivity(rec: ReconciliationRecord): FinancialActivity {
//   let status: AuditStatus = "HEALTHY";
//   if (rec.reconciliationStatus === "PENDING") status = "PENDING";
//   else if (rec.reconciliationStatus === "MISMATCH") status = "CRITICAL";
//   else if (rec.reconciliationStatus === "INVESTIGATING") status = "REVIEW";

//   return {
//     id: rec.reconciliationId,
//     module: "CASHFREE",
//     title:
//       rec.reconciliationStatus === "MISMATCH"
//         ? "Cashfree reconciliation mismatch"
//         : "Cashfree payment event",
//     description: rec.mismatchReason || rec.eventType,
//     referenceId: rec.paymentId || rec.reconciliationId,
//     amountPaise: rec.amountPaise,
//     status,
//     createdAt: rec.receivedAt,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Hook                                                                       */
// /* -------------------------------------------------------------------------- */

// export function useFinancialAudit(pollMs = 30000) {
//   const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
//   const [cashfreeRecords, setCashfreeRecords] = useState<
//     ReconciliationRecord[]
//   >([]);
//   const [settlementDocs, setSettlementDocs] = useState<
//     Array<Record<string, unknown> & { id: string }>
//   >([]);
//   const [refundDocs, setRefundDocs] = useState<
//     Array<Record<string, unknown> & { id: string }>
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setLedgerEntries([]);
//       setCashfreeRecords([]);
//       setSettlementDocs([]);
//       setRefundDocs([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [ledger, cashfree, settlements, refunds] = await Promise.all([
//         loadRaw(FIRESTORE_COLLECTIONS.LEDGER_ENTRIES),
//         loadRaw(FIRESTORE_COLLECTIONS.CASHFREE_EVENTS),
//         loadRaw(FIRESTORE_COLLECTIONS.SETTLEMENTS),
//         loadRaw(FIRESTORE_COLLECTIONS.REFUNDS),
//       ]);
//       setLedgerEntries(ledger.map(mapLedger));
//       setCashfreeRecords(cashfree.map(mapCashfree));
//       setSettlementDocs(settlements);
//       setRefundDocs(refunds);
//     } catch (err) {
//       console.error("useFinancialAudit error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load financial audit data."
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

//   const activities: FinancialActivity[] = useMemo(() => {
//     const fromLedger = ledgerEntries.map(mapLedgerActivity);
//     const fromCashfree = cashfreeRecords.map(mapCashfreeActivity);
//     const fromSettlements = settlementDocs.map(mapSettlementActivity);
//     const fromRefunds = refundDocs.map(mapRefundActivity);
//     // Payouts approximated from settlements with payout-like status
//     const fromPayouts = settlementDocs
//       .filter((d) => {
//         const s = String(d.status ?? "").toUpperCase();
//         return (
//           s.includes("PAYOUT") ||
//           s.includes("DISBURSE") ||
//           Boolean(d.payoutId)
//         );
//       })
//       .map(mapPayoutActivity);

//     return [
//       ...fromLedger,
//       ...fromCashfree,
//       ...fromSettlements,
//       ...fromRefunds,
//       ...fromPayouts,
//     ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
//   }, [ledgerEntries, cashfreeRecords, settlementDocs, refundDocs]);

//   const metrics = useMemo(() => {
//     const ledgerCount = ledgerEntries.length;
//     const payoutAmount = activities
//       .filter((a) => a.module === "PAYOUTS")
//       .reduce((t, a) => t + a.amountPaise, 0);
//     const matched = cashfreeRecords.filter(
//       (r) => r.reconciliationStatus === "MATCHED"
//     ).length;
//     const reconPct =
//       cashfreeRecords.length > 0
//         ? Math.round((matched / cashfreeRecords.length) * 1000) / 10
//         : 100;
//     const settlementCount = settlementDocs.length;
//     const exceptions = activities.filter(
//       (a) => a.status === "REVIEW" || a.status === "CRITICAL"
//     ).length;

//     return {
//       ledgerCount,
//       payoutAmountPaise: payoutAmount,
//       reconciliationPct: reconPct,
//       settlementCount,
//       exceptions,
//     };
//   }, [ledgerEntries, activities, cashfreeRecords, settlementDocs]);

//   const markLedgerPosted = useCallback(
//     async (ledgerEntryId: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.LEDGER_ENTRIES,
//         ledgerEntryId,
//         { status: "POSTED", postedAt: new Date().toISOString() }
//       );
//       await load();
//     },
//     [load]
//   );

//   const markReconResolved = useCallback(
//     async (reconciliationId: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.CASHFREE_EVENTS,
//         reconciliationId,
//         {
//           reconciliationStatus: "RESOLVED",
//           reconciledAt: new Date().toISOString(),
//         }
//       );
//       await load();
//     },
//     [load]
//   );

//   return {
//     activities,
//     ledgerEntries,
//     cashfreeRecords,
//     settlementDocs,
//     refundDocs,
//     metrics,
//     loading,
//     error,
//     demoMode,
//     refresh: load,
//     markLedgerPosted,
//     markReconResolved,
//   };
// }

// export default useFinancialAudit;

// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type AuditModule =
//   | "GENERAL_LEDGER"
//   | "PAYOUTS"
//   | "CASHFREE"
//   | "SETTLEMENTS"
//   | "REFUNDS";

// export type AuditStatus = "HEALTHY" | "REVIEW" | "CRITICAL" | "PENDING";

// export type FinancialActivity = {
//   id: string;
//   module: AuditModule;
//   title: string;
//   description: string;
//   referenceId: string;
//   amountPaise: number;
//   status: AuditStatus;
//   createdAt: string;
// };

// export type AccountType =
//   | "CUSTOMER"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "JUONE"
//   | "PLATFORM"
//   | "TAX"
//   | "GATEWAY";

// export type TransactionType =
//   | "ORDER_PAYMENT"
//   | "COMMISSION"
//   | "CAPTAIN_EARNING"
//   | "TAX"
//   | "GATEWAY_FEE"
//   | "REFUND"
//   | "SETTLEMENT"
//   | "ADJUSTMENT";

// export type LedgerStatus = "POSTED" | "PENDING" | "REVERSED" | "HELD";

// export type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// export type LedgerEntry = {
//   ledgerEntryId: string;
//   transactionId: string;
//   accountType: AccountType;
//   accountId: string;
//   accountName: string;
//   transactionType: TransactionType;
//   moduleId: ModuleId;
//   debitPaise: number;
//   creditPaise: number;
//   currency: string;
//   status: LedgerStatus;
//   description: string;
//   referenceId: string;
//   correlationId: string;
//   createdAt: string;
//   postedAt?: string;
// };

// export type ReconciliationStatus =
//   | "MATCHED"
//   | "MISMATCH"
//   | "PENDING"
//   | "INVESTIGATING"
//   | "RESOLVED";

// export type PaymentStatus =
//   | "CREATED"
//   | "PENDING"
//   | "PAID"
//   | "FAILED"
//   | "REFUNDED"
//   | "PARTIALLY_REFUNDED"
//   | "CANCELLED";

// export type EntityType = "ORDER" | "BOOKING" | "RIDE";

// export type ReconciliationRecord = {
//   reconciliationId: string;
//   paymentId: string;
//   cashfreeOrderId: string;
//   entityId: string;
//   entityType: EntityType;
//   customerId: string;
//   amountPaise: number;
//   cashfreeAmountPaise: number;
//   paymentStatus: PaymentStatus;
//   reconciliationStatus: ReconciliationStatus;
//   eventType: string;
//   signatureVerified: boolean;
//   currency: string;
//   receivedAt: string;
//   reconciledAt?: string;
//   mismatchReason?: string;
//   correlationId: string;
// };

// function str(v: unknown, fallback = "—"): string {
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

// function asLedgerStatus(v: unknown): LedgerStatus {
//   const s = String(v ?? "POSTED").toUpperCase();
//   if (s === "PENDING" || s === "REVERSED" || s === "HELD") return s;
//   return "POSTED";
// }

// function asAccountType(v: unknown): AccountType {
//   const s = String(v ?? "PLATFORM").toUpperCase();
//   const allowed: AccountType[] = [
//     "CUSTOMER",
//     "VENDOR",
//     "CAPTAIN",
//     "JUONE",
//     "PLATFORM",
//     "TAX",
//     "GATEWAY",
//   ];
//   return (allowed as string[]).includes(s) ? (s as AccountType) : "PLATFORM";
// }

// function asTxnType(v: unknown): TransactionType {
//   const s = String(v ?? "ADJUSTMENT").toUpperCase();
//   const allowed: TransactionType[] = [
//     "ORDER_PAYMENT",
//     "COMMISSION",
//     "CAPTAIN_EARNING",
//     "TAX",
//     "GATEWAY_FEE",
//     "REFUND",
//     "SETTLEMENT",
//     "ADJUSTMENT",
//   ];
//   return (allowed as string[]).includes(s) ? (s as TransactionType) : "ADJUSTMENT";
// }

// function asModuleId(v: unknown): ModuleId {
//   const s = String(v ?? "JUCART").toUpperCase();
//   const allowed: ModuleId[] = [
//     "JUCART",
//     "JURIDE",
//     "JUSTAY",
//     "JUHOME",
//     "JUSHOPPING",
//   ];
//   return (allowed as string[]).includes(s) ? (s as ModuleId) : "JUCART";
// }

// function mapLedger(raw: Record<string, unknown> & { id: string }): LedgerEntry {
//   const debit = num(raw.debitPaise ?? raw.debit);
//   const credit = num(raw.creditPaise ?? raw.credit);
//   const amount = num(raw.amountPaise ?? raw.amount);
//   const type = str(raw.type ?? raw.entryType, "").toUpperCase();

//   let debitPaise = debit;
//   let creditPaise = credit;
//   if (!debit && !credit && amount) {
//     if (type === "DEBIT") debitPaise = amount;
//     else creditPaise = amount;
//   }

//   return {
//     ledgerEntryId: str(raw.ledgerEntryId ?? raw.id, raw.id),
//     transactionId: str(raw.transactionId ?? raw.txnId, "—"),
//     accountType: asAccountType(raw.accountType),
//     accountId: str(raw.accountId, "—"),
//     accountName: str(raw.accountName, "—"),
//     transactionType: asTxnType(raw.transactionType ?? raw.type),
//     moduleId: asModuleId(raw.moduleId ?? raw.module),
//     debitPaise,
//     creditPaise,
//     currency: str(raw.currency, "INR"),
//     status: asLedgerStatus(raw.status),
//     description: str(raw.description, "—"),
//     referenceId: str(raw.referenceId ?? raw.orderId ?? raw.rideId, "—"),
//     correlationId: str(raw.correlationId, "—"),
//     createdAt: dateLabel(raw.createdAt),
//     postedAt: raw.postedAt ? dateLabel(raw.postedAt) : undefined,
//   };
// }

// function asReconStatus(v: unknown): ReconciliationStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   if (
//     s === "MATCHED" ||
//     s === "MISMATCH" ||
//     s === "INVESTIGATING" ||
//     s === "RESOLVED"
//   )
//     return s;
//   return "PENDING";
// }

// function asPaymentStatus(v: unknown): PaymentStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   const allowed: PaymentStatus[] = [
//     "CREATED",
//     "PENDING",
//     "PAID",
//     "FAILED",
//     "REFUNDED",
//     "PARTIALLY_REFUNDED",
//     "CANCELLED",
//   ];
//   return (allowed as string[]).includes(s) ? (s as PaymentStatus) : "PENDING";
// }

// function asEntityType(v: unknown): EntityType {
//   const s = String(v ?? "ORDER").toUpperCase();
//   if (s === "BOOKING" || s === "RIDE") return s;
//   return "ORDER";
// }

// function mapCashfree(
//   raw: Record<string, unknown> & { id: string }
// ): ReconciliationRecord {
//   const amount = num(raw.amountPaise ?? raw.amount);
//   const cfAmount = num(
//     raw.cashfreeAmountPaise ?? raw.cfAmountPaise ?? raw.amountPaise ?? amount
//   );
//   return {
//     reconciliationId: str(raw.reconciliationId ?? raw.id, raw.id),
//     paymentId: str(raw.paymentId, "—"),
//     cashfreeOrderId: str(
//       raw.cashfreeOrderId ?? raw.cfOrderId ?? raw.orderId,
//       "—"
//     ),
//     entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId, "—"),
//     entityType: asEntityType(raw.entityType ?? raw.transactionType),
//     customerId: str(raw.customerId ?? raw.userId, "—"),
//     amountPaise: amount,
//     cashfreeAmountPaise: cfAmount,
//     paymentStatus: asPaymentStatus(raw.paymentStatus ?? raw.status),
//     reconciliationStatus: asReconStatus(
//       raw.reconciliationStatus ?? raw.reconStatus
//     ),
//     eventType: str(raw.eventType ?? raw.type, "PAYMENT_SUCCESS"),
//     signatureVerified: Boolean(
//       raw.signatureVerified ?? raw.signatureValid ?? true
//     ),
//     currency: str(raw.currency, "INR"),
//     receivedAt: dateLabel(raw.receivedAt ?? raw.createdAt),
//     reconciledAt: raw.reconciledAt ? dateLabel(raw.reconciledAt) : undefined,
//     mismatchReason: raw.mismatchReason
//       ? str(raw.mismatchReason)
//       : amount !== cfAmount
//         ? "Internal amount differs from Cashfree amount."
//         : undefined,
//     correlationId: str(raw.correlationId, "—"),
//   };
// }

// function mapSettlementActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING") || statusRaw.includes("PROCESS"))
//     status = "PENDING";
//   else if (statusRaw.includes("HOLD") || statusRaw.includes("BLOCK"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW") || statusRaw.includes("MISMATCH"))
//     status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "SETTLEMENTS",
//     title: str(raw.title ?? "Settlement record", "Settlement record"),
//     description: str(
//       raw.description ?? `Settlement ${str(raw.settlementId ?? raw.id)}`
//     ),
//     referenceId: str(raw.settlementId ?? raw.referenceId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.totalPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt ?? raw.updatedAt),
//   };
// }

// function mapRefundActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING")) status = "PENDING";
//   else if (statusRaw.includes("FAIL") || statusRaw.includes("REJECT"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW")) status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "REFUNDS",
//     title: str(raw.title ?? "Refund processed", "Refund processed"),
//     description: str(
//       raw.description ?? `Refund ${str(raw.refundId ?? raw.id)}`
//     ),
//     referenceId: str(raw.refundId ?? raw.referenceId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt),
//   };
// }

// function mapPayoutActivity(
//   raw: Record<string, unknown> & { id: string }
// ): FinancialActivity {
//   const statusRaw = String(raw.status ?? "COMPLETED").toUpperCase();
//   let status: AuditStatus = "HEALTHY";
//   if (statusRaw.includes("PENDING") || statusRaw.includes("PROCESS"))
//     status = "PENDING";
//   else if (statusRaw.includes("HOLD") || statusRaw.includes("BLOCK"))
//     status = "CRITICAL";
//   else if (statusRaw.includes("REVIEW")) status = "REVIEW";

//   return {
//     id: str(raw.id),
//     module: "PAYOUTS",
//     title: str(raw.title ?? "Payout record", "Payout record"),
//     description: str(
//       raw.description ??
//         `Payout to ${str(raw.vendorId ?? raw.captainId ?? "recipient")}`
//     ),
//     referenceId: str(raw.payoutId ?? raw.settlementId ?? raw.id),
//     amountPaise: num(raw.amountPaise ?? raw.payoutPaise ?? raw.amount),
//     status,
//     createdAt: dateLabel(raw.createdAt ?? raw.updatedAt),
//   };
// }

// function mapLedgerActivity(entry: LedgerEntry): FinancialActivity {
//   let status: AuditStatus = "HEALTHY";
//   if (entry.status === "PENDING") status = "PENDING";
//   else if (entry.status === "HELD") status = "CRITICAL";
//   else if (entry.status === "REVERSED") status = "REVIEW";

//   return {
//     id: entry.ledgerEntryId,
//     module: "GENERAL_LEDGER",
//     title: entry.description || "Ledger entry",
//     description: `${entry.accountType} · ${entry.transactionType}`,
//     referenceId: entry.referenceId || entry.ledgerEntryId,
//     amountPaise: entry.debitPaise || entry.creditPaise,
//     status,
//     createdAt: entry.createdAt,
//   };
// }

// function mapCashfreeActivity(rec: ReconciliationRecord): FinancialActivity {
//   let status: AuditStatus = "HEALTHY";
//   if (rec.reconciliationStatus === "PENDING") status = "PENDING";
//   else if (rec.reconciliationStatus === "MISMATCH") status = "CRITICAL";
//   else if (rec.reconciliationStatus === "INVESTIGATING") status = "REVIEW";

//   return {
//     id: rec.reconciliationId,
//     module: "CASHFREE",
//     title:
//       rec.reconciliationStatus === "MISMATCH"
//         ? "Cashfree reconciliation mismatch"
//         : "Cashfree payment event",
//     description: rec.mismatchReason || rec.eventType,
//     referenceId: rec.paymentId || rec.reconciliationId,
//     amountPaise: rec.amountPaise,
//     status,
//     createdAt: rec.receivedAt,
//   };
// }

// export function useFinancialAudit(pollMs = 30000) {
//   const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
//   const [cashfreeRecords, setCashfreeRecords] = useState<
//     ReconciliationRecord[]
//   >([]);
//   const [settlementDocs, setSettlementDocs] = useState<
//     Array<Record<string, unknown> & { id: string }>
//   >([]);
//   const [refundDocs, setRefundDocs] = useState<
//     Array<Record<string, unknown> & { id: string }>
//   >([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);
//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setLedgerEntries([]);
//       setCashfreeRecords([]);
//       setSettlementDocs([]);
//       setRefundDocs([]);
//       setLoading(false);
//       return;
//     }
//     setDemoMode(false);
//     try {
//       const [ledger, cashfree, settlements, refunds] = await Promise.all([
//         loadRaw(FIRESTORE_COLLECTIONS.LEDGER_ENTRIES),
//         loadRaw(FIRESTORE_COLLECTIONS.CASHFREE_EVENTS),
//         loadRaw(FIRESTORE_COLLECTIONS.SETTLEMENTS),
//         loadRaw(FIRESTORE_COLLECTIONS.REFUNDS),
//       ]);
//       setLedgerEntries(ledger.map(mapLedger));
//       setCashfreeRecords(cashfree.map(mapCashfree));
//       setSettlementDocs(settlements);
//       setRefundDocs(refunds);
//     } catch (err) {
//       console.error("useFinancialAudit error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load financial audit data."
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

//   const activities: FinancialActivity[] = useMemo(() => {
//     const fromLedger = ledgerEntries.map(mapLedgerActivity);
//     const fromCashfree = cashfreeRecords.map(mapCashfreeActivity);
//     const fromSettlements = settlementDocs.map(mapSettlementActivity);
//     const fromRefunds = refundDocs.map(mapRefundActivity);
//     const fromPayouts = settlementDocs
//       .filter((d) => {
//         const s = String(d.status ?? "").toUpperCase();
//         return (
//           s.includes("PAYOUT") ||
//           s.includes("DISBURSE") ||
//           Boolean(d.payoutId)
//         );
//       })
//       .map(mapPayoutActivity);

//     return [
//       ...fromLedger,
//       ...fromCashfree,
//       ...fromSettlements,
//       ...fromRefunds,
//       ...fromPayouts,
//     ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
//   }, [ledgerEntries, cashfreeRecords, settlementDocs, refundDocs]);

//   const metrics = useMemo(() => {
//     const ledgerCount = ledgerEntries.length;
//     const payoutAmount = activities
//       .filter((a) => a.module === "PAYOUTS")
//       .reduce((t, a) => t + a.amountPaise, 0);
//     const matched = cashfreeRecords.filter(
//       (r) => r.reconciliationStatus === "MATCHED"
//     ).length;
//     const reconPct =
//       cashfreeRecords.length > 0
//         ? Math.round((matched / cashfreeRecords.length) * 1000) / 10
//         : 100;
//     const settlementCount = settlementDocs.length;
//     const exceptions = activities.filter(
//       (a) => a.status === "REVIEW" || a.status === "CRITICAL"
//     ).length;

//     return {
//       ledgerCount,
//       payoutAmountPaise: payoutAmount,
//       reconciliationPct: reconPct,
//       settlementCount,
//       exceptions,
//     };
//   }, [ledgerEntries, activities, cashfreeRecords, settlementDocs]);

//   const markLedgerPosted = useCallback(
//     async (ledgerEntryId: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.LEDGER_ENTRIES,
//         ledgerEntryId,
//         { status: "POSTED", postedAt: new Date().toISOString() }
//       );
//       await load();
//     },
//     [load]
//   );

//   const markReconResolved = useCallback(
//     async (reconciliationId: string) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.CASHFREE_EVENTS,
//         reconciliationId,
//         {
//           reconciliationStatus: "RESOLVED",
//           reconciledAt: new Date().toISOString(),
//         }
//       );
//       await load();
//     },
//     [load]
//   );

//   return {
//     activities,
//     ledgerEntries,
//     cashfreeRecords,
//     settlementDocs,
//     refundDocs,
//     metrics,
//     loading,
//     error,
//     demoMode,
//     refresh: load,
//     markLedgerPosted,
//     markReconResolved,
//   };
// }

// export default useFinancialAudit;

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";

/* -------------------------------------------------------------------------- */
/* Shared types                                                               */
/* -------------------------------------------------------------------------- */

export type AuditStatus = "HEALTHY" | "PENDING" | "REVIEW" | "CRITICAL";
export type AuditModule =
  | "GENERAL_LEDGER"
  | "PAYOUTS"
  | "CASHFREE"
  | "SETTLEMENTS"
  | "REFUNDS";

export type AccountType =
  | "CUSTOMER"
  | "VENDOR"
  | "CAPTAIN"
  | "JUONE"
  | "PLATFORM"
  | "TAX"
  | "GATEWAY"
  | string;

export type TransactionType =
  | "ORDER_PAYMENT"
  | "COMMISSION"
  | "CAPTAIN_EARNING"
  | "TAX"
  | "GATEWAY_FEE"
  | "REFUND"
  | "SETTLEMENT"
  | "ADJUSTMENT"
  | "PAYOUT"
  | string;

export type LedgerStatus = "POSTED" | "PENDING" | "REVERSED" | "HELD" | string;

export type ModuleId =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | "FOOD"
  | "MART"
  | "PHARMACY"
  | string;

export type LedgerEntry = {
  ledgerEntryId: string;
  transactionId: string;
  accountType: AccountType;
  accountId: string;
  accountName: string;
  transactionType: TransactionType;
  moduleId: ModuleId;
  debitPaise: number;
  creditPaise: number;
  currency: string;
  status: LedgerStatus;
  description: string;
  referenceId: string;
  correlationId: string;
  createdAt: string;
  postedAt?: string;
};

export type EntityType = "ORDER" | "BOOKING" | "RIDE" | string;
export type PaymentStatus =
  | "CREATED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "CANCELLED"
  | string;
export type ReconciliationStatus =
  | "MATCHED"
  | "MISMATCH"
  | "PENDING"
  | "INVESTIGATING"
  | "RESOLVED"
  | string;

export type ReconciliationRecord = {
  reconciliationId: string;
  paymentId: string;
  cashfreeOrderId: string;
  entityType: EntityType;
  entityId: string;
  customerId: string;
  amountPaise: number;
  cashfreeAmountPaise: number;
  currency: string;
  paymentStatus: PaymentStatus;
  reconciliationStatus: ReconciliationStatus;
  eventType: string;
  signatureVerified: boolean;
  receivedAt: string;
  reconciledAt?: string;
  mismatchReason?: string;
  correlationId: string;
};

export type PayoutStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "HELD"
  | "CANCELLED"
  | string;

export type PayoutRecord = {
  payoutId: string;
  beneficiaryType: string;
  beneficiaryId: string;
  beneficiaryName: string;
  moduleId: string;
  amountPaise: number;
  status: PayoutStatus;
  settlementId: string;
  referenceId: string;
  correlationId: string;
  createdAt: string;
  paidAt?: string;
  description: string;
};

export type AuditActivity = {
  id: string;
  title: string;
  description: string;
  referenceId: string;
  module: AuditModule;
  status: AuditStatus;
  amountPaise: number;
  createdAt: string;
};

export type AuditMetrics = {
  ledgerCount: number;
  payoutAmountPaise: number;
  reconciliationPct: number;
  settlementCount: number;
  exceptions: number;
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
      return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
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

function mapLedger(
  raw: Record<string, unknown> & { id: string }
): LedgerEntry {
  return {
    ledgerEntryId: str(raw.ledgerEntryId ?? raw.id, raw.id),
    transactionId: str(raw.transactionId ?? raw.txnId, "—"),
    accountType: str(raw.accountType, "PLATFORM").toUpperCase(),
    accountId: str(raw.accountId, "—"),
    accountName: str(raw.accountName, "—"),
    transactionType: str(raw.transactionType, "ADJUSTMENT").toUpperCase(),
    moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
    debitPaise: num(raw.debitPaise ?? raw.debit),
    creditPaise: num(raw.creditPaise ?? raw.credit),
    currency: str(raw.currency, "INR"),
    status: str(raw.status, "PENDING").toUpperCase(),
    description: str(raw.description, "Ledger entry"),
    referenceId: str(raw.referenceId ?? raw.orderId, "—"),
    correlationId: str(raw.correlationId, "—"),
    createdAt: dateLabel(raw.createdAt),
    postedAt: raw.postedAt ? dateLabel(raw.postedAt) : undefined,
  };
}

function mapRecon(
  raw: Record<string, unknown> & { id: string }
): ReconciliationRecord {
  const amountPaise = num(raw.amountPaise ?? raw.orderAmountPaise ?? raw.amount);
  const cfAmount = num(
    raw.cashfreeAmountPaise ?? raw.cfAmountPaise ?? amountPaise
  );
  const statusRaw = str(raw.reconciliationStatus ?? raw.status, "PENDING").toUpperCase();
  let reconciliationStatus: ReconciliationStatus = statusRaw;
  if (!["MATCHED", "MISMATCH", "PENDING", "INVESTIGATING", "RESOLVED"].includes(statusRaw)) {
    if (amountPaise === cfAmount && amountPaise > 0) reconciliationStatus = "MATCHED";
    else if (amountPaise !== cfAmount && (amountPaise > 0 || cfAmount > 0))
      reconciliationStatus = "MISMATCH";
    else reconciliationStatus = "PENDING";
  }

  return {
    reconciliationId: str(raw.reconciliationId ?? raw.id, raw.id),
    paymentId: str(raw.paymentId, "—"),
    cashfreeOrderId: str(
      raw.cashfreeOrderId ?? raw.cfOrderId ?? raw.orderId,
      "—"
    ),
    entityType: str(raw.entityType, "ORDER").toUpperCase() as EntityType,
    entityId: str(raw.entityId ?? raw.orderId ?? raw.rideId, "—"),
    customerId: str(raw.customerId ?? raw.userId, "—"),
    amountPaise,
    cashfreeAmountPaise: cfAmount,
    currency: str(raw.currency, "INR"),
    paymentStatus: str(raw.paymentStatus ?? raw.status, "PENDING").toUpperCase(),
    reconciliationStatus,
    eventType: str(raw.eventType ?? raw.type, "PAYMENT"),
    signatureVerified: Boolean(
      raw.signatureVerified ?? raw.signatureValid ?? true
    ),
    receivedAt: dateLabel(raw.receivedAt ?? raw.createdAt),
    reconciledAt: raw.reconciledAt ? dateLabel(raw.reconciledAt) : undefined,
    mismatchReason: str(raw.mismatchReason ?? raw.reason, "") || undefined,
    correlationId: str(raw.correlationId, "—"),
  };
}

function mapPayout(
  raw: Record<string, unknown> & { id: string }
): PayoutRecord {
  return {
    payoutId: str(raw.payoutId ?? raw.id, raw.id),
    beneficiaryType: str(
      raw.beneficiaryType ?? raw.partyType ?? raw.accountType,
      "VENDOR"
    ).toUpperCase(),
    beneficiaryId: str(
      raw.beneficiaryId ?? raw.vendorId ?? raw.captainId,
      "—"
    ),
    beneficiaryName: str(
      raw.beneficiaryName ?? raw.vendorName ?? raw.captainName,
      "—"
    ),
    moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
    amountPaise: num(
      raw.amountPaise ?? raw.payoutAmountPaise ?? raw.netPaise ?? raw.amount
    ),
    status: str(raw.status ?? raw.payoutStatus, "PENDING").toUpperCase(),
    settlementId: str(raw.settlementId, "—"),
    referenceId: str(raw.referenceId ?? raw.orderId, "—"),
    correlationId: str(raw.correlationId, "—"),
    createdAt: dateLabel(raw.createdAt),
    paidAt: raw.paidAt ? dateLabel(raw.paidAt) : undefined,
    description: str(raw.description, "Payout"),
  };
}

function ledgerToActivity(e: LedgerEntry): AuditActivity {
  const amount = Math.max(e.debitPaise, e.creditPaise);
  let status: AuditStatus = "HEALTHY";
  if (e.status === "HELD") status = "CRITICAL";
  else if (e.status === "PENDING") status = "PENDING";
  else if (e.status === "REVERSED") status = "REVIEW";
  return {
    id: e.ledgerEntryId,
    title: e.description || "Ledger entry",
    description: `${e.accountType} · ${e.transactionType}`,
    referenceId: e.referenceId,
    module: "GENERAL_LEDGER",
    status,
    amountPaise: amount,
    createdAt: e.createdAt,
  };
}

function reconToActivity(r: ReconciliationRecord): AuditActivity {
  let status: AuditStatus = "HEALTHY";
  if (r.reconciliationStatus === "MISMATCH") status = "CRITICAL";
  else if (
    r.reconciliationStatus === "PENDING" ||
    r.reconciliationStatus === "INVESTIGATING"
  )
    status = "REVIEW";
  else if (r.reconciliationStatus === "RESOLVED") status = "HEALTHY";
  return {
    id: r.reconciliationId,
    title: `Cashfree · ${r.eventType}`,
    description: `${r.entityType} ${r.entityId}`,
    referenceId: r.paymentId,
    module: "CASHFREE",
    status,
    amountPaise: r.amountPaise,
    createdAt: r.receivedAt,
  };
}

function payoutToActivity(p: PayoutRecord): AuditActivity {
  let status: AuditStatus = "HEALTHY";
  if (p.status === "FAILED") status = "CRITICAL";
  else if (p.status === "HELD") status = "REVIEW";
  else if (p.status === "PENDING" || p.status === "PROCESSING")
    status = "PENDING";
  return {
    id: p.payoutId,
    title: `Payout · ${p.beneficiaryName}`,
    description: `${p.beneficiaryType} · ${p.moduleId}`,
    referenceId: p.referenceId,
    module: "PAYOUTS",
    status,
    amountPaise: p.amountPaise,
    createdAt: p.createdAt,
  };
}

function settlementToActivity(
  raw: Record<string, unknown> & { id: string }
): AuditActivity {
  const statusRaw = str(raw.status, "PENDING").toUpperCase();
  let status: AuditStatus = "HEALTHY";
  if (statusRaw === "FAILED" || statusRaw === "CANCELLED") status = "CRITICAL";
  else if (statusRaw === "HELD") status = "REVIEW";
  else if (statusRaw === "PENDING" || statusRaw === "CALCULATED")
    status = "PENDING";
  return {
    id: str(raw.settlementId ?? raw.id, raw.id),
    title: str(raw.description, `Settlement ${raw.id}`),
    description: str(raw.beneficiaryName ?? raw.vendorName, "Settlement"),
    referenceId: str(raw.referenceId ?? raw.orderId, "—"),
    module: "SETTLEMENTS",
    status,
    amountPaise: num(raw.amountPaise ?? raw.totalPaise ?? raw.netPaise),
    createdAt: dateLabel(raw.createdAt),
  };
}

function refundToActivity(
  raw: Record<string, unknown> & { id: string }
): AuditActivity {
  const statusRaw = str(raw.status, "PENDING").toUpperCase();
  let status: AuditStatus = "HEALTHY";
  if (statusRaw === "FAILED") status = "CRITICAL";
  else if (statusRaw === "REVIEW") status = "REVIEW";
  else if (statusRaw === "PENDING" || statusRaw === "PROCESSING")
    status = "PENDING";
  return {
    id: str(raw.refundId ?? raw.id, raw.id),
    title: str(raw.reason, "Refund"),
    description: str(raw.paymentId, "Refund"),
    referenceId: str(raw.orderId ?? raw.referenceId, "—"),
    module: "REFUNDS",
    status,
    amountPaise: num(raw.amountPaise ?? raw.amount),
    createdAt: dateLabel(raw.createdAt),
  };
}

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useFinancialAudit(pollMs = 30000) {
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([]);
  const [cashfreeRecords, setCashfreeRecords] = useState<
    ReconciliationRecord[]
  >([]);
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [settlementDocs, setSettlementDocs] = useState<
    Array<Record<string, unknown> & { id: string }>
  >([]);
  const [refundDocs, setRefundDocs] = useState<
    Array<Record<string, unknown> & { id: string }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    if (isFirestoreDemoMode) {
      setLedgerEntries([]);
      setCashfreeRecords([]);
      setPayouts([]);
      setSettlementDocs([]);
      setRefundDocs([]);
      setLoading(false);
      return;
    }
    try {
      const [ledgerRaw, cfRaw, settlementsRaw, refundsRaw, paymentsRaw] =
        await Promise.all([
          loadRaw(FIRESTORE_COLLECTIONS.LEDGER_ENTRIES),
          loadRaw(FIRESTORE_COLLECTIONS.CASHFREE_EVENTS),
          loadRaw(FIRESTORE_COLLECTIONS.SETTLEMENTS),
          loadRaw(FIRESTORE_COLLECTIONS.REFUNDS),
          loadRaw(FIRESTORE_COLLECTIONS.PAYMENTS),
        ]);

      setLedgerEntries(ledgerRaw.map(mapLedger));
      setCashfreeRecords(cfRaw.map(mapRecon));
      setSettlementDocs(settlementsRaw);
      setRefundDocs(refundsRaw);

      // Payouts: prefer settlement docs marked as payouts / PAID pipeline,
      // or payments with type PAYOUT. Merge both sources by id.
      const fromSettlements = settlementsRaw
        .filter((s) => {
          const t = str(s.type ?? s.recordType ?? s.kind, "").toUpperCase();
          const st = str(s.status, "").toUpperCase();
          return (
            t === "PAYOUT" ||
            st === "PAID" ||
            st === "APPROVED" ||
            Boolean(s.payoutId) ||
            Boolean(s.beneficiaryId)
          );
        })
        .map(mapPayout);

      const fromPayments = paymentsRaw
        .filter((p) => {
          const t = str(p.type ?? p.paymentType ?? p.kind, "").toUpperCase();
          return t === "PAYOUT" || t === "DISBURSEMENT";
        })
        .map(mapPayout);

      const byId = new Map<string, PayoutRecord>();
      [...fromSettlements, ...fromPayments].forEach((p) => {
        byId.set(p.payoutId, p);
      });
      setPayouts(Array.from(byId.values()));
    } catch (err) {
      console.error("useFinancialAudit error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load financial audit data."
      );
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

  const activities: AuditActivity[] = useMemo(() => {
    const list = [
      ...ledgerEntries.map(ledgerToActivity),
      ...cashfreeRecords.map(reconToActivity),
      ...payouts.map(payoutToActivity),
      ...settlementDocs.map(settlementToActivity),
      ...refundDocs.map(refundToActivity),
    ];
    return list.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)).slice(0, 100);
  }, [ledgerEntries, cashfreeRecords, payouts, settlementDocs, refundDocs]);

  const metrics: AuditMetrics = useMemo(() => {
    const matched = cashfreeRecords.filter(
      (r) => r.reconciliationStatus === "MATCHED"
    ).length;
    const reconPct =
      cashfreeRecords.length === 0
        ? 100
        : Math.round((matched / cashfreeRecords.length) * 100);
    const exceptions = activities.filter(
      (a) => a.status === "REVIEW" || a.status === "CRITICAL"
    ).length;
    const payoutAmountPaise = payouts
      .filter((p) => p.status === "PENDING" || p.status === "PROCESSING")
      .reduce((t, p) => t + p.amountPaise, 0);

    return {
      ledgerCount: ledgerEntries.length,
      payoutAmountPaise,
      reconciliationPct: reconPct,
      settlementCount: settlementDocs.length,
      exceptions,
    };
  }, [ledgerEntries, cashfreeRecords, payouts, settlementDocs, activities]);

  const markLedgerPosted = useCallback(
    async (ledgerEntryId: string) => {
      if (isFirestoreDemoMode) throw new Error("Writes disabled in demo mode.");
      await updateDocument(FIRESTORE_COLLECTIONS.LEDGER_ENTRIES, ledgerEntryId, {
        status: "POSTED",
        postedAt: new Date().toISOString(),
      });
      await load();
    },
    [load]
  );

  const markReconResolved = useCallback(
    async (reconciliationId: string) => {
      if (isFirestoreDemoMode) throw new Error("Writes disabled in demo mode.");
      await updateDocument(
        FIRESTORE_COLLECTIONS.CASHFREE_EVENTS,
        reconciliationId,
        {
          reconciliationStatus: "RESOLVED",
          status: "RESOLVED",
          reconciledAt: new Date().toISOString(),
        }
      );
      await load();
    },
    [load]
  );

  const markPayoutPaid = useCallback(
    async (payoutId: string) => {
      if (isFirestoreDemoMode) throw new Error("Writes disabled in demo mode.");
      // Prefer settlements doc id if present
      try {
        await updateDocument(FIRESTORE_COLLECTIONS.SETTLEMENTS, payoutId, {
          status: "PAID",
          paidAt: new Date().toISOString(),
        });
      } catch {
        await updateDocument(FIRESTORE_COLLECTIONS.PAYMENTS, payoutId, {
          status: "PAID",
          paidAt: new Date().toISOString(),
        });
      }
      await load();
    },
    [load]
  );

  return {
    activities,
    metrics,
    ledgerEntries,
    cashfreeRecords,
    payouts,
    settlementDocs,
    refundDocs,
    loading,
    error,
    refresh: load,
    markLedgerPosted,
    markReconResolved,
    markPayoutPaid,
  };
}