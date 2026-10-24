/**
 * JUERP - Ledger Types
 *
 * File:
 * src/types/ledger.ts
 *
 * Purpose:
 * - Shared TypeScript types for ERP ledger records.
 * - Supports ledger entries, audit information, reconciliation,
 *   account balances, and ledger queries.
 *
 * IMPORTANT:
 * - Ledger data is backend/ERP authoritative.
 * - All monetary values are represented in paise.
 * - This file does not calculate commissions, taxes, settlements,
 *   payouts, or platform margins.
 * - Financial snapshots and calculationVersion must be preserved
 *   when supplied by the backend.
 * - correlationId is used for cross-system traceability.
 */

/* -------------------------------------------------------------------------- */
/* Ledger Entry Type                                                          */
/* -------------------------------------------------------------------------- */

export type LedgerEntryType =
  | "CREDIT"
  | "DEBIT";

/* -------------------------------------------------------------------------- */
/* Ledger Entry Status                                                        */
/* -------------------------------------------------------------------------- */

export type LedgerEntryStatus =
  | "PENDING"
  | "POSTED"
  | "REVERSED"
  | "FAILED"
  | "CANCELLED";

/* -------------------------------------------------------------------------- */
/* Ledger Account Type                                                        */
/* -------------------------------------------------------------------------- */

export type LedgerAccountType =
  | "CUSTOMER"
  | "VENDOR"
  | "CAPTAIN"
  | "PLATFORM"
  | "GATEWAY"
  | "SETTLEMENT"
  | "REFUND"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Ledger Source Type                                                         */
/* -------------------------------------------------------------------------- */

export type LedgerSourceType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY"
  | "PAYMENT"
  | "REFUND"
  | "SETTLEMENT"
  | "MANUAL"
  | "ADJUSTMENT"
  | "SYSTEM"
  | "CASHFREE";

/* -------------------------------------------------------------------------- */
/* Ledger Module                                                              */
/* -------------------------------------------------------------------------- */

export type LedgerModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | "JUERP"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Ledger Entity Type                                                         */
/* -------------------------------------------------------------------------- */

export type LedgerEntityType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY"
  | "PAYMENT"
  | "REFUND"
  | "SETTLEMENT"
  | "VENDOR"
  | "CAPTAIN"
  | "USER"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Ledger Entry                                                               */
/* -------------------------------------------------------------------------- */

export interface LedgerEntry {
  /**
   * Unique ledger entry identifier.
   */
  ledgerEntryId: string;

  /**
   * Ledger account identifier.
   */
  accountId: string;

  /**
   * Account type.
   */
  accountType: LedgerAccountType;

  /**
   * Credit or debit.
   */
  entryType: LedgerEntryType;

  /**
   * Amount in paise.
   */
  amountPaise: number;

  /**
   * Currency.
   */
  currency?: "INR";

  /**
   * Current ledger entry status.
   */
  status: LedgerEntryStatus;

  /**
   * Source that generated the ledger entry.
   */
  sourceType: LedgerSourceType;

  /**
   * Source entity ID.
   */
  sourceId?: string;

  /**
   * Related business entity.
   */
  entityType?: LedgerEntityType;

  entityId?: string;

  /**
   * JUONE module.
   */
  module?: LedgerModule;

  /**
   * Cross-system trace ID.
   */
  correlationId?: string;

  /**
   * Idempotency key when applicable.
   */
  idempotencyKey?: string;

  /**
   * Financial calculation version.
   */
  calculationVersion?: string;

  /**
   * Optional accounting description.
   */
  description?: string;

  /**
   * Optional reference number.
   */
  referenceNumber?: string;

  /**
   * Reversal information.
   */
  reversedEntryId?: string;

  reversalReason?: string;

  /**
   * Backend timestamps.
   */
  createdAt:
    | string
    | number
    | Date;

  postedAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  /**
   * Optional backend metadata.
   */
  metadata?: Record<
    string,
    unknown
  >;
}

/* -------------------------------------------------------------------------- */
/* Ledger Financial Snapshot                                                  */
/* -------------------------------------------------------------------------- */

export interface LedgerFinancialSnapshot {
  /**
   * All values are in paise.
   */

  itemSubtotalPaise?: number;

  packagingChargePaise?: number;

  platformFeePaise?: number;

  juoneExtraAmountPaise?: number;

  deliveryFeePaise?: number;

  taxPaise?: number;

  discountPaise?: number;

  vendorCommissionPaise?: number;

  captainDeliveryEarningPaise?: number;

  vendorPayoutPaise?: number;

  captainPayoutPaise?: number;

  platformMarginPaise?: number;

  gatewayFeePaise?: number;

  platformProfitPaise?: number;

  /**
   * Backend calculation version.
   */
  calculationVersion?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Audit Record                                                        */
/* -------------------------------------------------------------------------- */

export type LedgerAuditAction =
  | "ENTRY_CREATED"
  | "ENTRY_UPDATED"
  | "ENTRY_POSTED"
  | "ENTRY_REVERSED"
  | "ENTRY_CANCELLED"
  | "ENTRY_FAILED"
  | "RECONCILIATION_STARTED"
  | "RECONCILIATION_COMPLETED"
  | "RECONCILIATION_FAILED"
  | "MANUAL_ADJUSTMENT"
  | "EXPORT";

export interface LedgerAuditRecord {
  auditId: string;

  action: LedgerAuditAction;

  ledgerEntryId?: string;

  accountId?: string;

  entityType?: LedgerEntityType;

  entityId?: string;

  sourceType?: LedgerSourceType;

  sourceId?: string;

  module?: LedgerModule;

  correlationId?: string;

  actorId?: string;

  actorType?:
    | "USER"
    | "ADMIN"
    | "SYSTEM"
    | "SERVICE";

  status:
    | "SUCCESS"
    | "FAILED"
    | "PENDING"
    | "REJECTED";

  amountPaise?: number;

  description?: string;

  calculationVersion?: string;

  metadata?: Record<
    string,
    unknown
  >;

  createdAt:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Ledger Balance                                                             */
/* -------------------------------------------------------------------------- */

export interface LedgerBalance {
  accountId: string;

  accountType: LedgerAccountType;

  /**
   * Total credits in paise.
   */
  totalCreditPaise: number;

  /**
   * Total debits in paise.
   */
  totalDebitPaise: number;

  /**
   * Backend-calculated balance in paise.
   */
  balancePaise: number;

  currency: "INR";

  /**
   * Timestamp supplied by backend.
   */
  calculatedAt:
    | string
    | number
    | Date;

  calculationVersion?: string;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Summary                                                             */
/* -------------------------------------------------------------------------- */

export interface LedgerSummary {
  totalEntries: number;

  postedEntries: number;

  pendingEntries: number;

  reversedEntries: number;

  failedEntries: number;

  totalCreditPaise: number;

  totalDebitPaise: number;

  netBalancePaise: number;

  currency: "INR";

  calculationVersion?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Query                                                               */
/* -------------------------------------------------------------------------- */

export interface LedgerQuery {
  accountId?: string;

  accountType?: LedgerAccountType;

  entryType?: LedgerEntryType;

  status?: LedgerEntryStatus;

  sourceType?: LedgerSourceType;

  sourceId?: string;

  entityType?: LedgerEntityType;

  entityId?: string;

  module?: LedgerModule;

  ledgerEntryId?: string;

  correlationId?: string;

  from?: string;

  to?: string;

  search?: string;

  page?: number;

  pageSize?: number;
}

/* -------------------------------------------------------------------------- */
/* Ledger Pagination                                                          */
/* -------------------------------------------------------------------------- */

export interface LedgerPagination {
  page: number;

  pageSize: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

/* -------------------------------------------------------------------------- */
/* Ledger List Response                                                       */
/* -------------------------------------------------------------------------- */

export interface LedgerListResponse {
  entries: LedgerEntry[];

  pagination?: LedgerPagination;

  summary?: LedgerSummary;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Detail Response                                                     */
/* -------------------------------------------------------------------------- */

export interface LedgerDetailResponse {
  entry: LedgerEntry;

  relatedEntries?: LedgerEntry[];

  auditRecords?: LedgerAuditRecord[];

  balance?: LedgerBalance;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Reconciliation Status                                               */
/* -------------------------------------------------------------------------- */

export type LedgerReconciliationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "MATCHED"
  | "MISMATCH"
  | "FAILED";

/* -------------------------------------------------------------------------- */
/* Ledger Reconciliation Record                                               */
/* -------------------------------------------------------------------------- */

export interface LedgerReconciliationRecord {
  reconciliationId: string;

  accountId?: string;

  sourceType: LedgerSourceType;

  sourceId?: string;

  ledgerEntryId?: string;

  expectedAmountPaise?: number;

  actualAmountPaise?: number;

  differencePaise?: number;

  status: LedgerReconciliationStatus;

  correlationId?: string;

  calculationVersion?: string;

  message?: string;

  startedAt?:
    | string
    | number
    | Date;

  completedAt?:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Ledger Adjustment Request                                                  */
/* -------------------------------------------------------------------------- */

export interface LedgerAdjustmentRequest {
  accountId: string;

  accountType: LedgerAccountType;

  entryType: LedgerEntryType;

  amountPaise: number;

  reason: string;

  sourceType: "MANUAL" | "ADJUSTMENT";

  sourceId?: string;

  entityType?: LedgerEntityType;

  entityId?: string;

  correlationId: string;

  idempotencyKey: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Adjustment Response                                                 */
/* -------------------------------------------------------------------------- */

export interface LedgerAdjustmentResponse {
  success: boolean;

  ledgerEntryId?: string;

  status?:
    | "PENDING"
    | "POSTED"
    | "FAILED"
    | "REJECTED";

  correlationId: string;

  message?: string;
}

/* -------------------------------------------------------------------------- */
/* Ledger Export                                                              */
/* -------------------------------------------------------------------------- */

export interface LedgerExportOptions {
  format:
    | "CSV"
    | "JSON";

  query?: LedgerQuery;

  includeMetadata?: boolean;

  includeAudit?: boolean;

  includeFinancialSnapshot?: boolean;

  fileName?: string;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const LEDGER_ENTRY_TYPES:
  readonly LedgerEntryType[] = [
  "CREDIT",
  "DEBIT",
];

export const LEDGER_ENTRY_STATUSES:
  readonly LedgerEntryStatus[] = [
  "PENDING",
  "POSTED",
  "REVERSED",
  "FAILED",
  "CANCELLED",
];

export const LEDGER_ACCOUNT_TYPES:
  readonly LedgerAccountType[] = [
  "CUSTOMER",
  "VENDOR",
  "CAPTAIN",
  "PLATFORM",
  "GATEWAY",
  "SETTLEMENT",
  "REFUND",
  "SYSTEM",
];

export const LEDGER_SOURCE_TYPES:
  readonly LedgerSourceType[] = [
  "ORDER",
  "BOOKING",
  "RIDE",
  "DELIVERY",
  "PAYMENT",
  "REFUND",
  "SETTLEMENT",
  "MANUAL",
  "ADJUSTMENT",
  "SYSTEM",
  "CASHFREE",
];

export const LEDGER_MODULES:
  readonly LedgerModule[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
  "JUERP",
  "SYSTEM",
];

export const LEDGER_ENTITY_TYPES:
  readonly LedgerEntityType[] = [
  "ORDER",
  "BOOKING",
  "RIDE",
  "DELIVERY",
  "PAYMENT",
  "REFUND",
  "SETTLEMENT",
  "VENDOR",
  "CAPTAIN",
  "USER",
  "SYSTEM",
];

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isLedgerEntryType(
  value: unknown,
): value is LedgerEntryType {
  return (
    value === "CREDIT" ||
    value === "DEBIT"
  );
}

export function isLedgerEntryStatus(
  value: unknown,
): value is LedgerEntryStatus {
  return (
    value === "PENDING" ||
    value === "POSTED" ||
    value === "REVERSED" ||
    value === "FAILED" ||
    value === "CANCELLED"
  );
}

export function isLedgerAccountType(
  value: unknown,
): value is LedgerAccountType {
  return (
    typeof value === "string" &&
    (
      LEDGER_ACCOUNT_TYPES as readonly string[]
    ).includes(value)
  );
}

export function isLedgerSourceType(
  value: unknown,
): value is LedgerSourceType {
  return (
    typeof value === "string" &&
    (
      LEDGER_SOURCE_TYPES as readonly string[]
    ).includes(value)
  );
}

export function isLedgerModule(
  value: unknown,
): value is LedgerModule {
  return (
    typeof value === "string" &&
    (
      LEDGER_MODULES as readonly string[]
    ).includes(value)
  );
}

export function isLedgerEntityType(
  value: unknown,
): value is LedgerEntityType {
  return (
    typeof value === "string" &&
    (
      LEDGER_ENTITY_TYPES as readonly string[]
    ).includes(value)
  );
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Validate a paise amount.
 *
 * This validates only the numeric representation.
 * It does not apply any financial business rule.
 */
export function isValidLedgerPaise(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    Number.isInteger(value) &&
    value >= 0
  );
}

/**
 * Validate a ledger entry object at a basic structural level.
 */
export function isLedgerEntry(
  value: unknown,
): value is LedgerEntry {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const entry =
    value as Partial<LedgerEntry>;

  return (
    typeof entry.ledgerEntryId ===
      "string" &&
    typeof entry.accountId ===
      "string" &&
    typeof entry.amountPaise ===
      "number" &&
    Number.isFinite(
      entry.amountPaise,
    ) &&
    isLedgerEntryType(
      entry.entryType,
    ) &&
    isLedgerEntryStatus(
      entry.status,
    ) &&
    isLedgerSourceType(
      entry.sourceType,
    ) &&
    typeof entry.createdAt !==
      "undefined"
  );
}

/* -------------------------------------------------------------------------- */
/* Labels                                                                     */
/* -------------------------------------------------------------------------- */

export function getLedgerEntryTypeLabel(
  type: LedgerEntryType,
): string {
  switch (type) {
    case "CREDIT":
      return "Credit";

    case "DEBIT":
      return "Debit";

    default:
      return type;
  }
}

export function getLedgerEntryStatusLabel(
  status: LedgerEntryStatus,
): string {
  switch (status) {
    case "PENDING":
      return "Pending";

    case "POSTED":
      return "Posted";

    case "REVERSED":
      return "Reversed";

    case "FAILED":
      return "Failed";

    case "CANCELLED":
      return "Cancelled";

    default:
      return status;
  }
}

export function getLedgerAccountTypeLabel(
  type: LedgerAccountType,
): string {
  switch (type) {
    case "CUSTOMER":
      return "Customer";

    case "VENDOR":
      return "Vendor";

    case "CAPTAIN":
      return "Captain";

    case "PLATFORM":
      return "Platform";

    case "GATEWAY":
      return "Gateway";

    case "SETTLEMENT":
      return "Settlement";

    case "REFUND":
      return "Refund";

    case "SYSTEM":
      return "System";

    default:
      return type;
  }
}

export function getLedgerSourceTypeLabel(
  type: LedgerSourceType,
): string {
  switch (type) {
    case "ORDER":
      return "Order";

    case "BOOKING":
      return "Booking";

    case "RIDE":
      return "Ride";

    case "DELIVERY":
      return "Delivery";

    case "PAYMENT":
      return "Payment";

    case "REFUND":
      return "Refund";

    case "SETTLEMENT":
      return "Settlement";

    case "MANUAL":
      return "Manual";

    case "ADJUSTMENT":
      return "Adjustment";

    case "SYSTEM":
      return "System";

    case "CASHFREE":
      return "Cashfree";

    default:
      return type;
  }
}

export function getLedgerModuleLabel(
  module: LedgerModule,
): string {
  switch (module) {
    case "JUCART":
      return "JuCart";

    case "JURIDE":
      return "JuRide";

    case "JUSTAY":
      return "JuStay";

    case "JUHOME":
      return "JuHome";

    case "JUSHOPPING":
      return "JuShopping";

    case "JUERP":
      return "JuERP";

    case "SYSTEM":
      return "System";

    default:
      return module;
  }
}

/* -------------------------------------------------------------------------- */
/* Traceability Helpers                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a ledger entry has a correlation ID.
 */
export function hasLedgerCorrelationId(
  entry: LedgerEntry,
): boolean {
  return (
    typeof entry.correlationId ===
      "string" &&
    entry.correlationId.trim()
      .length > 0
  );
}

/**
 * Check whether a ledger entry has a calculation version.
 */
export function hasLedgerCalculationVersion(
  entry: LedgerEntry,
): boolean {
  return (
    typeof entry.calculationVersion ===
      "string" &&
    entry.calculationVersion.trim()
      .length > 0
  );
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const ledgerTypes = {
  LEDGER_ENTRY_TYPES,

  LEDGER_ENTRY_STATUSES,

  LEDGER_ACCOUNT_TYPES,

  LEDGER_SOURCE_TYPES,

  LEDGER_MODULES,

  LEDGER_ENTITY_TYPES,

  isLedgerEntryType,

  isLedgerEntryStatus,

  isLedgerAccountType,

  isLedgerSourceType,

  isLedgerModule,

  isLedgerEntityType,

  isValidLedgerPaise,

  isLedgerEntry,

  getLedgerEntryTypeLabel,

  getLedgerEntryStatusLabel,

  getLedgerAccountTypeLabel,

  getLedgerSourceTypeLabel,

  getLedgerModuleLabel,

  hasLedgerCorrelationId,

  hasLedgerCalculationVersion,
};

export default ledgerTypes;