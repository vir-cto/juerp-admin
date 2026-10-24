/**
 * JUERP - Audit Types
 *
 * File:
 * src/types/audit.ts
 *
 * Purpose:
 * - Shared client-side TypeScript types for ERP audit records.
 * - Represents audit information returned by the backend.
 * - Supports correlation and traceability across JUONE systems.
 *
 * IMPORTANT:
 * - Audit records are authoritative backend records.
 * - This file contains types only.
 * - It does not create, modify, or delete audit records.
 * - Financial values are represented in paise.
 * - Do not put Cashfree secrets, tokens, passwords, OTPs, or private keys
 *   into audit records.
 */

/* -------------------------------------------------------------------------- */
/* Audit Action                                                               */
/* -------------------------------------------------------------------------- */

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "VIEW"
  | "LOGIN"
  | "LOGOUT"
  | "APPROVE"
  | "REJECT"
  | "SUBMIT"
  | "ASSIGN"
  | "REASSIGN"
  | "CANCEL"
  | "REFUND"
  | "PAYMENT"
  | "SETTLEMENT"
  | "EXPORT"
  | "OVERRIDE"
  | "MANUAL_ACTION"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Audit Status                                                               */
/* -------------------------------------------------------------------------- */

export type AuditStatus =
  | "SUCCESS"
  | "FAILED"
  | "PENDING"
  | "REJECTED";

/* -------------------------------------------------------------------------- */
/* Audit Actor                                                                */
/* -------------------------------------------------------------------------- */

export type AuditActorType =
  | "USER"
  | "ADMIN"
  | "VENDOR"
  | "CAPTAIN"
  | "SYSTEM"
  | "WEBHOOK"
  | "SERVICE";

/* -------------------------------------------------------------------------- */
/* Audit Entity                                                               */
/* -------------------------------------------------------------------------- */

export type AuditEntityType =
  | "USER"
  | "VENDOR"
  | "VENDOR_DOCUMENT"
  | "VENDOR_MODULE"
  | "CAPTAIN"
  | "CAPTAIN_DOCUMENT"
  | "ORDER"
  | "ORDER_ITEM"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY"
  | "PAYMENT"
  | "REFUND"
  | "SETTLEMENT"
  | "LEDGER_ENTRY"
  | "SUPPORT_TICKET"
  | "NOTIFICATION"
  | "CASHFREE_EVENT"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Audit Module                                                               */
/* -------------------------------------------------------------------------- */

export type AuditModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | "JUERP"
  | "SYSTEM";

/* -------------------------------------------------------------------------- */
/* Hierarchy Scope                                                            */
/* -------------------------------------------------------------------------- */

export type AuditHierarchyLevel =
  | "NATIONAL"
  | "STATE"
  | "DISTRICT"
  | "CITY"
  | "LOCAL";

/* -------------------------------------------------------------------------- */
/* Audit Metadata                                                             */
/* -------------------------------------------------------------------------- */

export interface AuditMetadata {
  /**
   * Additional non-sensitive context supplied by backend.
   */
  [key: string]: unknown;
}

/* -------------------------------------------------------------------------- */
/* Audit Financial Snapshot                                                   */
/* -------------------------------------------------------------------------- */

export interface AuditFinancialSnapshot {
  /**
   * All monetary values are in paise.
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
/* Audit Change                                                               */
/* -------------------------------------------------------------------------- */

export interface AuditChange {
  field: string;

  before?: unknown;

  after?: unknown;
}

/* -------------------------------------------------------------------------- */
/* Main Audit Record                                                          */
/* -------------------------------------------------------------------------- */

export interface AuditRecord {
  /**
   * Unique audit record ID.
   */
  auditId: string;

  /**
   * Action performed.
   */
  action: AuditAction;

  /**
   * Result of the action.
   */
  status: AuditStatus;

  /**
   * Entity affected by the action.
   */
  entityType: AuditEntityType;

  /**
   * ID of the affected entity.
   */
  entityId?: string;

  /**
   * Actor who initiated the operation.
   */
  actorType: AuditActorType;

  /**
   * User/admin/service identifier.
   */
  actorId?: string;

  /**
   * Optional actor display name.
   *
   * This should be backend-provided and should not
   * be treated as an authorization field.
   */
  actorName?: string;

  /**
   * ERP module associated with the operation.
   */
  module?: AuditModule;

  /**
   * Cross-system correlation ID.
   */
  correlationId?: string;

  /**
   * Optional idempotency key.
   */
  idempotencyKey?: string;

  /**
   * Hierarchy information.
   */
  hierarchyLevel?: AuditHierarchyLevel;

  hierarchyNodeId?: string;

  /**
   * Human-readable description.
   */
  description?: string;

  /**
   * State transition information.
   */
  previousStatus?: string;

  nextStatus?: string;

  /**
   * Changed fields when applicable.
   */
  changes?: AuditChange[];

  /**
   * Backend-provided financial snapshot.
   *
   * This is informational/audit data only.
   */
  financialSnapshot?: AuditFinancialSnapshot;

  /**
   * Backend metadata.
   */
  metadata?: AuditMetadata;

  /**
   * Client/request information when provided
   * by the backend.
   */
  ipAddress?: string;

  userAgent?: string;

  requestId?: string;

  /**
   * Timestamps.
   */
  createdAt:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Audit Log Entry                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Alias used by audit-log screens.
 */
export type AuditLogEntry =
  AuditRecord;

/* -------------------------------------------------------------------------- */
/* Audit Query                                                                */
/* -------------------------------------------------------------------------- */

export interface AuditQuery {
  action?: AuditAction;

  status?: AuditStatus;

  entityType?: AuditEntityType;

  entityId?: string;

  actorType?: AuditActorType;

  actorId?: string;

  module?: AuditModule;

  correlationId?: string;

  hierarchyLevel?: AuditHierarchyLevel;

  hierarchyNodeId?: string;

  from?: string;

  to?: string;

  search?: string;

  page?: number;

  pageSize?: number;
}

/* -------------------------------------------------------------------------- */
/* Audit Pagination                                                           */
/* -------------------------------------------------------------------------- */

export interface AuditPagination {
  page: number;

  pageSize: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

/* -------------------------------------------------------------------------- */
/* Audit List Response                                                        */
/* -------------------------------------------------------------------------- */

export interface AuditListResponse {
  records: AuditRecord[];

  pagination?: AuditPagination;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Audit Detail Response                                                      */
/* -------------------------------------------------------------------------- */

export interface AuditDetailResponse {
  record: AuditRecord;

  relatedRecords?: AuditRecord[];

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Audit Summary                                                              */
/* -------------------------------------------------------------------------- */

export interface AuditSummary {
  total: number;

  successful: number;

  failed: number;

  pending: number;

  rejected: number;

  creates: number;

  updates: number;

  deletes: number;

  approvals: number;

  rejections: number;

  payments: number;

  refunds: number;

  settlements: number;

  overrides: number;
}

/* -------------------------------------------------------------------------- */
/* Audit Export                                                               */
/* -------------------------------------------------------------------------- */

export interface AuditExportOptions {
  format:
    | "CSV"
    | "JSON";

  query?: AuditQuery;

  includeMetadata?: boolean;

  includeFinancialSnapshot?: boolean;

  includeChanges?: boolean;

  fileName?: string;
}

/* -------------------------------------------------------------------------- */
/* Audit Event                                                                */
/* -------------------------------------------------------------------------- */

export interface AuditEvent {
  eventId: string;

  eventType: string;

  entityType: AuditEntityType;

  entityId?: string;

  correlationId?: string;

  actorId?: string;

  actorType?: AuditActorType;

  occurredAt:
    | string
    | number
    | Date;

  metadata?: AuditMetadata;
}

/* -------------------------------------------------------------------------- */
/* Audit State Transition                                                     */
/* -------------------------------------------------------------------------- */

export interface AuditStateTransition {
  entityType: AuditEntityType;

  entityId: string;

  previousStatus: string;

  nextStatus: string;

  action: AuditAction;

  correlationId?: string;

  changedAt:
    | string
    | number
    | Date;

  changedBy?: string;

  changedByType?: AuditActorType;
}

/* -------------------------------------------------------------------------- */
/* Audit Permission Context                                                   */
/* -------------------------------------------------------------------------- */

/**
 * UI helper type.
 *
 * This does NOT replace backend authorization.
 */
export interface AuditPermissionContext {
  canView: boolean;

  canExport: boolean;

  canViewFinancialData: boolean;

  canViewSensitiveMetadata: boolean;
}

/* -------------------------------------------------------------------------- */
/* Audit Filter State                                                         */
/* -------------------------------------------------------------------------- */

export interface AuditFilterState {
  action: AuditAction | "ALL";

  status: AuditStatus | "ALL";

  entityType:
    | AuditEntityType
    | "ALL";

  actorType:
    | AuditActorType
    | "ALL";

  module:
    | AuditModule
    | "ALL";

  search: string;

  from: string;

  to: string;
}

/* -------------------------------------------------------------------------- */
/* Audit Constants                                                            */
/* -------------------------------------------------------------------------- */

export const AUDIT_ACTIONS:
  readonly AuditAction[] = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "VIEW",
  "LOGIN",
  "LOGOUT",
  "APPROVE",
  "REJECT",
  "SUBMIT",
  "ASSIGN",
  "REASSIGN",
  "CANCEL",
  "REFUND",
  "PAYMENT",
  "SETTLEMENT",
  "EXPORT",
  "OVERRIDE",
  "MANUAL_ACTION",
  "SYSTEM",
];

export const AUDIT_STATUSES:
  readonly AuditStatus[] = [
  "SUCCESS",
  "FAILED",
  "PENDING",
  "REJECTED",
];

export const AUDIT_ACTOR_TYPES:
  readonly AuditActorType[] = [
  "USER",
  "ADMIN",
  "VENDOR",
  "CAPTAIN",
  "SYSTEM",
  "WEBHOOK",
  "SERVICE",
];

export const AUDIT_ENTITY_TYPES:
  readonly AuditEntityType[] = [
  "USER",
  "VENDOR",
  "VENDOR_DOCUMENT",
  "VENDOR_MODULE",
  "CAPTAIN",
  "CAPTAIN_DOCUMENT",
  "ORDER",
  "ORDER_ITEM",
  "BOOKING",
  "RIDE",
  "DELIVERY",
  "PAYMENT",
  "REFUND",
  "SETTLEMENT",
  "LEDGER_ENTRY",
  "SUPPORT_TICKET",
  "NOTIFICATION",
  "CASHFREE_EVENT",
  "SYSTEM",
];

export const AUDIT_MODULES:
  readonly AuditModule[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
  "JUERP",
  "SYSTEM",
];

export const AUDIT_HIERARCHY_LEVELS:
  readonly AuditHierarchyLevel[] = [
  "NATIONAL",
  "STATE",
  "DISTRICT",
  "CITY",
  "LOCAL",
];

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isAuditAction(
  value: unknown,
): value is AuditAction {
  return (
    typeof value === "string" &&
    (
      AUDIT_ACTIONS as readonly string[]
    ).includes(value)
  );
}

export function isAuditStatus(
  value: unknown,
): value is AuditStatus {
  return (
    typeof value === "string" &&
    (
      AUDIT_STATUSES as readonly string[]
    ).includes(value)
  );
}

export function isAuditActorType(
  value: unknown,
): value is AuditActorType {
  return (
    typeof value === "string" &&
    (
      AUDIT_ACTOR_TYPES as readonly string[]
    ).includes(value)
  );
}

export function isAuditEntityType(
  value: unknown,
): value is AuditEntityType {
  return (
    typeof value === "string" &&
    (
      AUDIT_ENTITY_TYPES as readonly string[]
    ).includes(value)
  );
}

export function isAuditModule(
  value: unknown,
): value is AuditModule {
  return (
    typeof value === "string" &&
    (
      AUDIT_MODULES as readonly string[]
    ).includes(value)
  );
}

export function isAuditHierarchyLevel(
  value: unknown,
): value is AuditHierarchyLevel {
  return (
    typeof value === "string" &&
    (
      AUDIT_HIERARCHY_LEVELS as readonly string[]
    ).includes(value)
  );
}

/* -------------------------------------------------------------------------- */
/* Utility Helpers                                                            */
/* -------------------------------------------------------------------------- */

export function getAuditActionLabel(
  action: AuditAction,
): string {
  switch (action) {
    case "CREATE":
      return "Create";

    case "UPDATE":
      return "Update";

    case "DELETE":
      return "Delete";

    case "VIEW":
      return "View";

    case "LOGIN":
      return "Login";

    case "LOGOUT":
      return "Logout";

    case "APPROVE":
      return "Approve";

    case "REJECT":
      return "Reject";

    case "SUBMIT":
      return "Submit";

    case "ASSIGN":
      return "Assign";

    case "REASSIGN":
      return "Reassign";

    case "CANCEL":
      return "Cancel";

    case "REFUND":
      return "Refund";

    case "PAYMENT":
      return "Payment";

    case "SETTLEMENT":
      return "Settlement";

    case "EXPORT":
      return "Export";

    case "OVERRIDE":
      return "Override";

    case "MANUAL_ACTION":
      return "Manual Action";

    case "SYSTEM":
      return "System";

    default:
      return action;
  }
}

export function getAuditStatusLabel(
  status: AuditStatus,
): string {
  switch (status) {
    case "SUCCESS":
      return "Success";

    case "FAILED":
      return "Failed";

    case "PENDING":
      return "Pending";

    case "REJECTED":
      return "Rejected";

    default:
      return status;
  }
}

export function getAuditEntityLabel(
  entityType: AuditEntityType,
): string {
  return entityType
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

export function getAuditModuleLabel(
  module: AuditModule,
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

/**
 * Returns true when an audit record contains a financial snapshot.
 */
export function hasAuditFinancialSnapshot(
  record: AuditRecord,
): boolean {
  return (
    record.financialSnapshot !==
      undefined &&
    record.financialSnapshot !==
      null
  );
}

/**
 * Returns true when an audit record can be traced
 * across systems using correlationId.
 */
export function hasAuditCorrelationId(
  record: AuditRecord,
): boolean {
  return (
    typeof record.correlationId ===
      "string" &&
    record.correlationId.length >
      0
  );
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const auditTypes = {
  AUDIT_ACTIONS,
  AUDIT_STATUSES,
  AUDIT_ACTOR_TYPES,
  AUDIT_ENTITY_TYPES,
  AUDIT_MODULES,
  AUDIT_HIERARCHY_LEVELS,

  isAuditAction,
  isAuditStatus,
  isAuditActorType,
  isAuditEntityType,
  isAuditModule,
  isAuditHierarchyLevel,

  getAuditActionLabel,
  getAuditStatusLabel,
  getAuditEntityLabel,
  getAuditModuleLabel,

  hasAuditFinancialSnapshot,
  hasAuditCorrelationId,
};

export default auditTypes;