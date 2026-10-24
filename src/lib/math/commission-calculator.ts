/**
 * JUONE / JuERP Commission Calculator
 *
 * IMPORTANT:
 * This module is a CLIENT-SIDE PREVIEW/HELPER only.
 *
 * The JUONE MSD requires financial calculations such as:
 * - vendor commission
 * - captain earnings
 * - vendor payout
 * - platform margin
 * - settlement
 * - taxes/fees
 *
 * to be authoritative in the trusted backend/ERP layer.
 *
 * Therefore:
 * - Do NOT put production commission percentages here.
 * - Do NOT use this file as the source of truth for settlement.
 * - Do NOT use this file to authorize payouts.
 * - Do NOT replace backend-calculated values with these results.
 *
 * All monetary values are represented in paise.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type CommissionBaseType =
  | "ITEM_SUBTOTAL"
  | "ORDER_SUBTOTAL"
  | "CUSTOM";

export type CommissionCalculationVersion =
  | string
  | undefined;

export type CommissionRule = {
  ruleId?: string;

  moduleId?: string;

  serviceId?: string;

  vendorId?: string;

  /**
   * Commission percentage supplied by the
   * trusted backend/ERP configuration.
   *
   * This file does NOT define the percentage.
   */
  commissionPercentage?: number;

  /**
   * Optional fixed commission supplied by
   * the trusted backend.
   */
  fixedCommissionPaise?: number;

  commissionBase:
    | CommissionBaseType
    | string;

  calculationVersion:
    | CommissionCalculationVersion;

  active?: boolean;
};

export type CommissionCalculationInput = {
  /**
   * Item subtotal in paise.
   */
  itemSubtotalPaise: number;

  /**
   * Optional complete order subtotal in paise.
   */
  orderSubtotalPaise?: number;

  /**
   * Optional custom base supplied by backend.
   */
  customBasePaise?: number;

  /**
   * Commission rule received from the
   * trusted backend/ERP.
   */
  rule: CommissionRule;
};

export type CommissionCalculationResult = {
  calculationVersion:
    | string
    | undefined;

  commissionBasePaise: number;

  commissionPercentage?: number;

  percentageCommissionPaise: number;

  fixedCommissionPaise: number;

  vendorCommissionPaise: number;

  vendorRemainingPaise: number;
};

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Validates a non-negative paise amount.
 */
export function isValidPaiseAmount(
  value: number,
): boolean {
  return (
    Number.isFinite(value) &&
    value >= 0 &&
    Number.isInteger(value)
  );
}

/**
 * Validates a commission percentage supplied
 * by the backend.
 *
 * This does not define the allowed production
 * percentage. It only prevents invalid numeric input.
 */
export function isValidCommissionPercentage(
  percentage: number,
): boolean {
  return (
    Number.isFinite(percentage) &&
    percentage >= 0 &&
    percentage <= 100
  );
}

/**
 * Ensures an amount is a valid paise value.
 */
function assertValidPaiseAmount(
  value: number,
  fieldName: string,
): void {
  if (!isValidPaiseAmount(value)) {
    throw new Error(
      `${fieldName} must be a non-negative integer amount in paise.`,
    );
  }
}

/**
 * Ensures the commission percentage is valid.
 */
function assertValidCommissionPercentage(
  percentage: number,
): void {
  if (
    !isValidCommissionPercentage(
      percentage,
    )
  ) {
    throw new Error(
      "Commission percentage must be between 0 and 100.",
    );
  }
}

/* -------------------------------------------------------------------------- */
/* Base Amount                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Resolves the commission base using the rule supplied
 * by the trusted backend.
 *
 * This function does NOT decide which base should be used
 * in production. The rule must come from ERP/backend config.
 */
export function getCommissionBasePaise(
  input: CommissionCalculationInput,
): number {
  const {
    itemSubtotalPaise,
    orderSubtotalPaise,
    customBasePaise,
    rule,
  } = input;

  assertValidPaiseAmount(
    itemSubtotalPaise,
    "itemSubtotalPaise",
  );

  if (
    orderSubtotalPaise !==
    undefined
  ) {
    assertValidPaiseAmount(
      orderSubtotalPaise,
      "orderSubtotalPaise",
    );
  }

  if (
    customBasePaise !==
    undefined
  ) {
    assertValidPaiseAmount(
      customBasePaise,
      "customBasePaise",
    );
  }

  switch (rule.commissionBase) {
    case "ITEM_SUBTOTAL":
      return itemSubtotalPaise;

    case "ORDER_SUBTOTAL":
      if (
        orderSubtotalPaise ===
        undefined
      ) {
        throw new Error(
          "orderSubtotalPaise is required for ORDER_SUBTOTAL.",
        );
      }

      return orderSubtotalPaise;

    case "CUSTOM":
      if (
        customBasePaise ===
        undefined
      ) {
        throw new Error(
          "customBasePaise is required for CUSTOM commission base.",
        );
      }

      return customBasePaise;

    default:
      throw new Error(
        `Unsupported commission base: ${rule.commissionBase}`,
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Percentage Calculation                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Calculates a percentage amount in paise.
 *
 * This is a mathematical helper only.
 *
 * Example:
 *
 * base = 100000 paise
 * percentage = 10
 *
 * result = 10000 paise
 */
export function calculatePercentagePaise(
  basePaise: number,
  percentage: number,
): number {
  assertValidPaiseAmount(
    basePaise,
    "basePaise",
  );

  assertValidCommissionPercentage(
    percentage,
  );

  /**
   * Convert percentage into a fraction.
   *
   * Math.round is used because monetary values
   * must remain whole paise.
   */
  return Math.round(
    (basePaise * percentage) /
      100,
  );
}

/* -------------------------------------------------------------------------- */
/* Fixed Commission                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Returns the backend-provided fixed commission.
 */
export function getFixedCommissionPaise(
  rule: CommissionRule,
): number {
  const fixedCommissionPaise =
    rule.fixedCommissionPaise ??
    0;

  assertValidPaiseAmount(
    fixedCommissionPaise,
    "fixedCommissionPaise",
  );

  return fixedCommissionPaise;
}

/* -------------------------------------------------------------------------- */
/* Main Commission Calculation                                                */
/* -------------------------------------------------------------------------- */

/**
 * Calculates a commission preview using a commission
 * rule supplied by the trusted backend.
 *
 * IMPORTANT:
 * The result must not replace an authoritative
 * backend commission value.
 */
export function calculateCommission(
  input: CommissionCalculationInput,
): CommissionCalculationResult {
  const {
    rule,
  } = input;

  const commissionBasePaise =
    getCommissionBasePaise(input);

  const percentage =
    rule.commissionPercentage ??
    0;

  assertValidCommissionPercentage(
    percentage,
  );

  const percentageCommissionPaise =
    calculatePercentagePaise(
      commissionBasePaise,
      percentage,
    );

  const fixedCommissionPaise =
    getFixedCommissionPaise(rule);

  const vendorCommissionPaise =
    Math.min(
      commissionBasePaise,
      percentageCommissionPaise +
        fixedCommissionPaise,
    );

  const vendorRemainingPaise =
    Math.max(
      0,
      commissionBasePaise -
        vendorCommissionPaise,
    );

  return {
    calculationVersion:
      rule.calculationVersion,

    commissionBasePaise,

    commissionPercentage:
      rule.commissionPercentage,

    percentageCommissionPaise,

    fixedCommissionPaise,

    vendorCommissionPaise,

    vendorRemainingPaise,
  };
}

/* -------------------------------------------------------------------------- */
/* Backend Result Protection                                                  */
/* -------------------------------------------------------------------------- */

export type BackendCommissionResult = {
  vendorCommissionPaise: number;

  calculationVersion:
    | string
    | undefined;

  ruleId?: string;

  correlationId?: string;
};

/**
 * Validates a commission value received from
 * the trusted backend.
 *
 * This does not recalculate or replace it.
 */
export function validateBackendCommissionResult(
  result: BackendCommissionResult,
): boolean {
  if (
    !isValidPaiseAmount(
      result.vendorCommissionPaise,
    )
  ) {
    return false;
  }

  if (
    !result.calculationVersion
  ) {
    return false;
  }

  return true;
}

/* -------------------------------------------------------------------------- */
/* Difference Check                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Compares a frontend preview with the
 * authoritative backend value.
 *
 * This is useful for detecting configuration
 * or calculation mismatches.
 */
export function compareCommissionWithBackend(
  preview: CommissionCalculationResult,
  backend: BackendCommissionResult,
): {
  matches: boolean;
  differencePaise: number;
} {
  const differencePaise =
    preview.vendorCommissionPaise -
    backend.vendorCommissionPaise;

  return {
    matches:
      differencePaise === 0 &&
      preview.calculationVersion ===
        backend.calculationVersion,

    differencePaise,
  };
}

/* -------------------------------------------------------------------------- */
/* Safe Display Helpers                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Converts paise to rupees for display only.
 *
 * Financial storage remains in paise.
 */
export function paiseToRupees(
  paise: number,
): number {
  assertValidPaiseAmount(
    paise,
    "paise",
  );

  return paise / 100;
}

/**
 * Converts rupees to paise.
 *
 * Use only for user-entered/display values.
 * Backend should remain authoritative for actual
 * financial amounts.
 */
export function rupeesToPaise(
  rupees: number,
): number {
  if (
    !Number.isFinite(rupees) ||
    rupees < 0
  ) {
    throw new Error(
      "Rupee amount must be a non-negative number.",
    );
  }

  return Math.round(
    rupees * 100,
  );
}

/**
 * Formats a paise amount as INR for UI display.
 */
export function formatPaiseAsINR(
  paise: number,
): string {
  assertValidPaiseAmount(
    paise,
    "paise",
  );

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ).format(
    paiseToRupees(paise),
  );
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

export default {
  isValidPaiseAmount,
  isValidCommissionPercentage,

  getCommissionBasePaise,

  calculatePercentagePaise,

  getFixedCommissionPaise,

  calculateCommission,

  validateBackendCommissionResult,

  compareCommissionWithBackend,

  paiseToRupees,

  rupeesToPaise,

  formatPaiseAsINR,
};