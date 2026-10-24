/**
 * JUERP - Commission Types
 *
 * File:
 * src/types/commission.ts
 *
 * Purpose:
 * - Shared TypeScript types for ERP commission configuration,
 *   backend commission results, and commission audit information.
 *
 * IMPORTANT:
 * - Commission rules are ERP/backend authoritative.
 * - This file does NOT define a production commission percentage.
 * - This file does NOT calculate production commission.
 * - All monetary values are represented in paise.
 * - calculationVersion must be preserved with financial results.
 */

 /* ------------------------------------------------------------------------- */
/* Commission Base                                                            */
/* ------------------------------------------------------------------------- */

export type CommissionBaseType =
  | "ITEM_SUBTOTAL"
  | "ORDER_SUBTOTAL"
  | "CUSTOM";

/* -------------------------------------------------------------------------- */
/* Commission Rule Status                                                     */
/* -------------------------------------------------------------------------- */

export type CommissionRuleStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | "ARCHIVED";

/* -------------------------------------------------------------------------- */
/* Commission Rule Scope                                                      */
/* -------------------------------------------------------------------------- */

export type CommissionScope =
  | "GLOBAL"
  | "MODULE"
  | "SERVICE"
  | "VENDOR"
  | "VENDOR_MODULE";

/* -------------------------------------------------------------------------- */
/* Commission Module                                                          */
/* -------------------------------------------------------------------------- */

export type CommissionModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

/* -------------------------------------------------------------------------- */
/* Commission Service                                                         */
/* -------------------------------------------------------------------------- */

export type CommissionService =
  | "FOOD"
  | "MART"
  | "PHARMACY"
  | "RIDE"
  | "STAY"
  | "HOME_SERVICE"
  | "SHOPPING"
  | string;

/* -------------------------------------------------------------------------- */
/* Commission Rule                                                            */
/* -------------------------------------------------------------------------- */

export interface CommissionRule {
  /**
   * Unique backend rule ID.
   */
  ruleId: string;

  /**
   * Human-readable rule name.
   */
  name?: string;

  /**
   * Rule scope.
   */
  scope: CommissionScope;

  /**
   * Optional module.
   */
  module?: CommissionModule;

  /**
   * Optional service.
   */
  service?: CommissionService;

  /**
   * Optional vendor ID.
   */
  vendorId?: string;

  /**
   * Commission base supplied/configured by ERP.
   */
  commissionBase: CommissionBaseType;

  /**
   * Percentage configured by ERP.
   *
   * Do not hardcode a production value in the frontend.
   */
  percentage?: number;

  /**
   * Fixed commission amount, when the backend rule
   * explicitly uses a fixed amount.
   */
  fixedCommissionPaise?: number;

  /**
   * Rule status.
   */
  status: CommissionRuleStatus;

  /**
   * Effective date range.
   */
  effectiveFrom?: string | number | Date;

  effectiveTo?: string | number | Date;

  /**
   * Backend financial calculation version.
   */
  calculationVersion: string;

  /**
   * Backend timestamps.
   */
  createdAt?:
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
/* Commission Input                                                            */
/* -------------------------------------------------------------------------- */

export interface CommissionCalculationInput {
  /**
   * Canonical order identifier when available.
   */
  orderId?: string;

  /**
   * Vendor associated with the calculation.
   */
  vendorId?: string;

  /**
   * Module associated with the calculation.
   */
  module?: CommissionModule;

  /**
   * Service associated with the calculation.
   */
  service?: CommissionService;

  /**
   * Backend-provided item subtotal in paise.
   */
  itemSubtotalPaise?: number;

  /**
   * Backend-provided order subtotal in paise.
   */
  orderSubtotalPaise?: number;

  /**
   * Optional custom base supplied by backend.
   *
   * The frontend must not decide what this means.
   */
  customBasePaise?: number;

  /**
   * The rule selected by ERP/backend.
   */
  ruleId: string;

  /**
   * Calculation version returned by backend.
   */
  calculationVersion: string;
}

/* -------------------------------------------------------------------------- */
/* Backend Commission Result                                                  */
/* -------------------------------------------------------------------------- */

export interface BackendCommissionResult {
  /**
   * Backend calculation identifier.
   */
  calculationId?: string;

  /**
   * Canonical entity identifiers.
   */
  orderId?: string;

  vendorId?: string;

  module?: CommissionModule;

  service?: CommissionService;

  /**
   * Commission base used by backend.
   */
  commissionBase:
    | CommissionBaseType
    | string;

  /**
   * Backend-authoritative base amount in paise.
   */
  commissionBasePaise: number;

  /**
   * Backend-authoritative commission amount in paise.
   */
  vendorCommissionPaise: number;

  /**
   * Percentage used by backend, if applicable.
   */
  commissionPercentage?: number;

  /**
   * Fixed commission amount, if applicable.
   */
  fixedCommissionPaise?: number;

  /**
   * Financial calculation version.
   */
  calculationVersion: string;

  /**
   * Correlation ID for cross-system tracing.
   */
  correlationId?: string;

  /**
   * Backend timestamp.
   */
  calculatedAt:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Commission Preview Result                                                  */
/* -------------------------------------------------------------------------- */

export interface CommissionPreviewResult {
  /**
   * This is a UI preview only.
   *
   * It must not be used as the authoritative
   * settlement or payout value.
   */
  commissionBasePaise: number;

  commissionPaise: number;

  percentage?: number;

  ruleId?: string;

  calculationVersion?: string;

  isAuthoritative: false;
}

/* -------------------------------------------------------------------------- */
/* Commission Comparison                                                      */
/* -------------------------------------------------------------------------- */

export interface CommissionComparison {
  /**
   * Backend-authoritative value.
   */
  backendCommissionPaise: number;

  /**
   * Optional client preview.
   */
  previewCommissionPaise?: number;

  /**
   * Difference between values, when a preview exists.
   *
   * This is for diagnostic/UI purposes only.
   */
  differencePaise?: number;

  /**
   * Whether the preview matches backend output.
   */
  matchesBackend?: boolean;

  /**
   * Backend calculation version.
   */
  calculationVersion: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Query                                                           */
/* -------------------------------------------------------------------------- */

export interface CommissionRuleQuery {
  ruleId?: string;

  module?: CommissionModule;

  service?: CommissionService;

  vendorId?: string;

  scope?: CommissionScope;

  status?: CommissionRuleStatus;

  effectiveAt?: string | number | Date;

  activeOnly?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Commission Rule Response                                                   */
/* -------------------------------------------------------------------------- */

export interface CommissionRuleResponse {
  rule?: CommissionRule;

  rules?: CommissionRule[];

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Audit                                                           */
/* -------------------------------------------------------------------------- */

export type CommissionAuditAction =
  | "RULE_CREATED"
  | "RULE_UPDATED"
  | "RULE_ACTIVATED"
  | "RULE_DEACTIVATED"
  | "RULE_ARCHIVED"
  | "CALCULATION_REQUESTED"
  | "CALCULATION_COMPLETED"
  | "CALCULATION_FAILED"
  | "OVERRIDE_REQUESTED"
  | "OVERRIDE_APPROVED"
  | "OVERRIDE_REJECTED";

/* -------------------------------------------------------------------------- */
/* Commission Audit Record                                                    */
/* -------------------------------------------------------------------------- */

export interface CommissionAuditRecord {
  auditId: string;

  action: CommissionAuditAction;

  ruleId?: string;

  calculationId?: string;

  orderId?: string;

  vendorId?: string;

  module?: CommissionModule;

  service?: CommissionService;

  /**
   * Backend calculation version.
   */
  calculationVersion?: string;

  /**
   * Cross-system trace identifier.
   */
  correlationId?: string;

  /**
   * Actor who initiated the operation.
   */
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

  /**
   * Financial values are in paise.
   */
  commissionBasePaise?: number;

  vendorCommissionPaise?: number;

  /**
   * Optional change description.
   */
  description?: string;

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
/* Commission Override                                                        */
/* -------------------------------------------------------------------------- */

export interface CommissionOverrideRequest {
  ruleId?: string;

  orderId?: string;

  vendorId?: string;

  module?: CommissionModule;

  service?: CommissionService;

  /**
   * Override amount supplied to backend.
   */
  overrideCommissionPaise?: number;

  /**
   * Mandatory reason for an override request.
   */
  reason: string;

  /**
   * Correlation ID.
   */
  correlationId: string;

  /**
   * Idempotency key for the command.
   */
  idempotencyKey: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Override Result                                                 */
/* -------------------------------------------------------------------------- */

export interface CommissionOverrideResult {
  success: boolean;

  overrideId?: string;

  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED";

  correlationId: string;

  calculationVersion?: string;

  message?: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Calculation Request                                             */
/* -------------------------------------------------------------------------- */

export interface CommissionCalculationRequest {
  orderId?: string;

  vendorId?: string;

  module?: CommissionModule;

  service?: CommissionService;

  ruleId?: string;

  /**
   * Backend should normally obtain the authoritative
   * order amounts from persisted data.
   *
   * These fields are optional because clients should
   * not become the financial source of truth.
   */
  itemSubtotalPaise?: number;

  orderSubtotalPaise?: number;

  correlationId: string;

  idempotencyKey: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Calculation Response                                            */
/* -------------------------------------------------------------------------- */

export interface CommissionCalculationResponse {
  success: boolean;

  result?: BackendCommissionResult;

  correlationId: string;

  errorCode?: string;

  message?: string;
}

/* -------------------------------------------------------------------------- */
/* Commission Constants                                                       */
/* -------------------------------------------------------------------------- */

export const COMMISSION_BASE_TYPES:
  readonly CommissionBaseType[] = [
  "ITEM_SUBTOTAL",
  "ORDER_SUBTOTAL",
  "CUSTOM",
];

export const COMMISSION_RULE_STATUSES:
  readonly CommissionRuleStatus[] = [
  "DRAFT",
  "ACTIVE",
  "INACTIVE",
  "ARCHIVED",
];

export const COMMISSION_SCOPES:
  readonly CommissionScope[] = [
  "GLOBAL",
  "MODULE",
  "SERVICE",
  "VENDOR",
  "VENDOR_MODULE",
];

export const COMMISSION_MODULES:
  readonly CommissionModule[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
];

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isCommissionBaseType(
  value: unknown,
): value is CommissionBaseType {
  return (
    value === "ITEM_SUBTOTAL" ||
    value === "ORDER_SUBTOTAL" ||
    value === "CUSTOM"
  );
}

export function isCommissionRuleStatus(
  value: unknown,
): value is CommissionRuleStatus {
  return (
    value === "DRAFT" ||
    value === "ACTIVE" ||
    value === "INACTIVE" ||
    value === "ARCHIVED"
  );
}

export function isCommissionScope(
  value: unknown,
): value is CommissionScope {
  return (
    value === "GLOBAL" ||
    value === "MODULE" ||
    value === "SERVICE" ||
    value === "VENDOR" ||
    value === "VENDOR_MODULE"
  );
}

export function isCommissionModule(
  value: unknown,
): value is CommissionModule {
  return (
    value === "JUCART" ||
    value === "JURIDE" ||
    value === "JUSTAY" ||
    value === "JUHOME" ||
    value === "JUSHOPPING"
  );
}

/* -------------------------------------------------------------------------- */
/* Validation Helpers                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Validate a paise value without applying any business rule.
 */
export function isValidCommissionPaise(
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
 * Validate a commission percentage.
 *
 * This validates shape only.
 * It does not define an allowed production percentage.
 */
export function isValidCommissionPercentage(
  value: unknown,
): value is number {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= 0
  );
}

/**
 * Validate a backend commission result.
 */
export function isBackendCommissionResult(
  value: unknown,
): value is BackendCommissionResult {
  if (
    typeof value !== "object" ||
    value === null
  ) {
    return false;
  }

  const result =
    value as Partial<
      BackendCommissionResult
    >;

  return (
    typeof result.commissionBasePaise ===
      "number" &&
    Number.isFinite(
      result.commissionBasePaise,
    ) &&
    typeof result.vendorCommissionPaise ===
      "number" &&
    Number.isFinite(
      result.vendorCommissionPaise,
    ) &&
    typeof result.calculationVersion ===
      "string" &&
    typeof result.calculatedAt !==
      "undefined"
  );
}

/* -------------------------------------------------------------------------- */
/* Labels                                                                     */
/* -------------------------------------------------------------------------- */

export function getCommissionBaseLabel(
  base: CommissionBaseType,
): string {
  switch (base) {
    case "ITEM_SUBTOTAL":
      return "Item Subtotal";

    case "ORDER_SUBTOTAL":
      return "Order Subtotal";

    case "CUSTOM":
      return "Custom";

    default:
      return base;
  }
}

export function getCommissionScopeLabel(
  scope: CommissionScope,
): string {
  switch (scope) {
    case "GLOBAL":
      return "Global";

    case "MODULE":
      return "Module";

    case "SERVICE":
      return "Service";

    case "VENDOR":
      return "Vendor";

    case "VENDOR_MODULE":
      return "Vendor + Module";

    default:
      return scope;
  }
}

export function getCommissionStatusLabel(
  status: CommissionRuleStatus,
): string {
  switch (status) {
    case "DRAFT":
      return "Draft";

    case "ACTIVE":
      return "Active";

    case "INACTIVE":
      return "Inactive";

    case "ARCHIVED":
      return "Archived";

    default:
      return status;
  }
}

export function getCommissionModuleLabel(
  module: CommissionModule,
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

    default:
      return module;
  }
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const commissionTypes = {
  COMMISSION_BASE_TYPES,

  COMMISSION_RULE_STATUSES,

  COMMISSION_SCOPES,

  COMMISSION_MODULES,

  isCommissionBaseType,

  isCommissionRuleStatus,

  isCommissionScope,

  isCommissionModule,

  isValidCommissionPaise,

  isValidCommissionPercentage,

  isBackendCommissionResult,

  getCommissionBaseLabel,

  getCommissionScopeLabel,

  getCommissionStatusLabel,

  getCommissionModuleLabel,
};

export default commissionTypes;