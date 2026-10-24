/**
 * JUERP - Monetary Rounding Utilities
 *
 * File:
 * src/lib/math/rounding.ts
 *
 * Purpose:
 * - Safe rounding helpers for financial values.
 * - Monetary values are represented in paise.
 * - Avoids JavaScript floating-point issues where possible.
 * - Does NOT define tax, commission, platform fee, or payout rules.
 *
 * IMPORTANT:
 * Backend / ERP-authoritative calculations remain the source of truth.
 * These helpers are only reusable mathematical utilities.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type RoundingMode =
  | "HALF_UP"
  | "HALF_DOWN"
  | "HALF_EVEN"
  | "UP"
  | "DOWN"
  | "CEIL"
  | "FLOOR"
  | "TRUNCATE";

export interface RoundingOptions {
  mode?: RoundingMode;

  /**
   * Number of decimal places to keep when rounding a decimal number.
   *
   * Example:
   * 2 -> 123.456 becomes 123.46 with HALF_UP
   */
  decimals?: number;
}

/* -------------------------------------------------------------------------- */
/* Validation                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Checks whether a value is a finite number.
 */
export function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

/**
 * Validates a non-negative paise amount.
 */
export function isValidPaise(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0;
}

/**
 * Validates an integer paise amount.
 */
export function assertValidPaise(
  value: number,
  fieldName = "amountPaise",
): void {
  if (!isValidPaise(value)) {
    throw new Error(
      `${fieldName} must be a non-negative safe integer representing paise.`,
    );
  }
}

/**
 * Validates decimal places.
 */
export function assertValidDecimals(decimals: number): void {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new Error("decimals must be an integer between 0 and 20.");
  }
}

/* -------------------------------------------------------------------------- */
/* Basic Rounding                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Round using HALF_UP.
 *
 * Examples:
 * 1.4 -> 1
 * 1.5 -> 2
 * 1.6 -> 2
 *
 * This is commonly expected human-readable rounding.
 */
export function roundHalfUp(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  return value >= 0 ? Math.floor(value + 0.5) : Math.ceil(value - 0.5);
}

/**
 * Round using HALF_DOWN.
 *
 * Examples:
 * 1.4 -> 1
 * 1.5 -> 1
 * 1.6 -> 2
 */
export function roundHalfDown(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  if (value >= 0) {
    const floor = Math.floor(value);
    const fraction = value - floor;

    return fraction > 0.5 ? floor + 1 : floor;
  }

  const ceil = Math.ceil(value);
  const fraction = ceil - value;

  return fraction > 0.5 ? ceil - 1 : ceil;
}

/**
 * Round using HALF_EVEN (banker's rounding).
 *
 * Examples:
 * 2.5 -> 2
 * 3.5 -> 4
 */
export function roundHalfEven(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  const lower = Math.floor(value);
  const upper = Math.ceil(value);

  const lowerDistance = Math.abs(value - lower);
  const upperDistance = Math.abs(upper - value);

  if (lowerDistance < upperDistance) {
    return lower;
  }

  if (upperDistance < lowerDistance) {
    return upper;
  }

  // Exactly halfway.
  return lower % 2 === 0 ? lower : upper;
}

/**
 * Round away from zero.
 */
export function roundUp(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  return value >= 0 ? Math.ceil(value) : Math.floor(value);
}

/**
 * Round toward zero.
 */
export function roundDown(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  return value >= 0 ? Math.floor(value) : Math.ceil(value);
}

/* -------------------------------------------------------------------------- */
/* Generic Rounding                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Apply a selected rounding mode.
 */
export function roundWithMode(
  value: number,
  mode: RoundingMode = "HALF_UP",
): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  switch (mode) {
    case "HALF_UP":
      return roundHalfUp(value);

    case "HALF_DOWN":
      return roundHalfDown(value);

    case "HALF_EVEN":
      return roundHalfEven(value);

    case "UP":
      return roundUp(value);

    case "DOWN":
      return roundDown(value);

    case "CEIL":
      return Math.ceil(value);

    case "FLOOR":
      return Math.floor(value);

    case "TRUNCATE":
      return Math.trunc(value);

    default:
      throw new Error(`Unsupported rounding mode: ${mode}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Decimal Rounding                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Round a decimal number to the requested number of decimal places.
 *
 * Example:
 * roundDecimal(123.456, 2) -> 123.46
 */
export function roundDecimal(
  value: number,
  decimals = 2,
  mode: RoundingMode = "HALF_UP",
): number {
  if (!isFiniteNumber(value)) {
    throw new Error("value must be a finite number.");
  }

  assertValidDecimals(decimals);

  if (decimals === 0) {
    return roundWithMode(value, mode);
  }

  const factor = 10 ** decimals;

  if (!Number.isFinite(factor)) {
    throw new Error("Rounding factor is outside the supported range.");
  }

  const scaled = value * factor;
  const rounded = roundWithMode(scaled, mode);

  return rounded / factor;
}

/* -------------------------------------------------------------------------- */
/* Paise Helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Round paise to a multiple of another paise unit.
 *
 * Example:
 * roundPaiseToUnit(123, 10) -> 120
 *
 * Useful only when a business rule explicitly requires a particular unit.
 * The function does NOT decide which unit should be used.
 */
export function roundPaiseToUnit(
  amountPaise: number,
  unitPaise: number,
  mode: RoundingMode = "HALF_UP",
): number {
  assertValidPaise(amountPaise, "amountPaise");

  if (!Number.isSafeInteger(unitPaise) || unitPaise <= 0) {
    throw new Error("unitPaise must be a positive safe integer.");
  }

  const quotient = amountPaise / unitPaise;
  const roundedQuotient = roundWithMode(quotient, mode);

  const result = roundedQuotient * unitPaise;

  if (!Number.isSafeInteger(result)) {
    throw new Error("Rounded paise result exceeds safe integer range.");
  }

  return result;
}

/**
 * Ensure a paise amount is an integer.
 *
 * This is mainly useful when receiving calculated values from other code.
 */
export function normalizePaise(value: number): number {
  if (!isFiniteNumber(value)) {
    throw new Error("Paise value must be a finite number.");
  }

  const rounded = roundHalfUp(value);

  assertValidPaise(rounded, "amountPaise");

  return rounded;
}

/* -------------------------------------------------------------------------- */
/* Percentage / Ratio Helpers                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Calculate a percentage amount from a paise base.
 *
 * Example:
 *
 * basePaise = 10000
 * percentage = 10
 *
 * result = 1000 paise
 *
 * IMPORTANT:
 * This function only performs arithmetic.
 * It does not decide whether a percentage should be applied.
 */
export function calculatePercentagePaise(
  basePaise: number,
  percentage: number,
  mode: RoundingMode = "HALF_UP",
): number {
  assertValidPaise(basePaise, "basePaise");

  if (!isFiniteNumber(percentage) || percentage < 0) {
    throw new Error("percentage must be a finite non-negative number.");
  }

  const rawAmount = (basePaise * percentage) / 100;

  if (!Number.isFinite(rawAmount)) {
    throw new Error("Percentage calculation exceeded numeric limits.");
  }

  const roundedAmount = roundWithMode(rawAmount, mode);

  if (!Number.isSafeInteger(roundedAmount) || roundedAmount < 0) {
    throw new Error("Calculated percentage amount is invalid.");
  }

  return roundedAmount;
}

/**
 * Calculate a ratio from paise values.
 *
 * Example:
 * 2500 / 10000 = 0.25
 */
export function calculateRatio(
  numeratorPaise: number,
  denominatorPaise: number,
): number {
  assertValidPaise(numeratorPaise, "numeratorPaise");
  assertValidPaise(denominatorPaise, "denominatorPaise");

  if (denominatorPaise === 0) {
    throw new Error("denominatorPaise cannot be zero.");
  }

  return numeratorPaise / denominatorPaise;
}

/* -------------------------------------------------------------------------- */
/* Currency Conversion                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Convert rupees to paise.
 *
 * Example:
 * ₹101.50 -> 10150 paise
 *
 * The result is rounded according to the supplied mode.
 */
export function rupeesToPaise(
 rupees: number,
  mode: RoundingMode = "HALF_UP",
): number {
  if (!isFiniteNumber(rupees)) {
    throw new Error("rupees must be a finite number.");
  }

  if (rupees < 0) {
    throw new Error("rupees cannot be negative.");
  }

  const paise = rupees * 100;

  if (!Number.isFinite(paise)) {
    throw new Error("Rupee value exceeds numeric limits.");
  }

  const rounded = roundWithMode(paise, mode);

  assertValidPaise(rounded, "amountPaise");

  return rounded;
}

/**
 * Convert paise to rupees.
 *
 * Example:
 * 10150 paise -> 101.50
 */
export function paiseToRupees(amountPaise: number): number {
  assertValidPaise(amountPaise, "amountPaise");

  return amountPaise / 100;
}

/* -------------------------------------------------------------------------- */
/* Financial Sum Helpers                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Safely add paise values.
 */
export function addPaise(...amountsPaise: number[]): number {
  let total = 0;

  for (const amount of amountsPaise) {
    assertValidPaise(amount, "amountPaise");

    total += amount;

    if (!Number.isSafeInteger(total)) {
      throw new Error("Paise total exceeds JavaScript safe integer range.");
    }
  }

  return total;
}

/**
 * Safely subtract paise values.
 *
 * By default, negative results are rejected because monetary fields in the
 * JUONE client financial model are represented as non-negative paise amounts.
 */
export function subtractPaise(
  fromPaise: number,
  ...subtractAmountsPaise: number[]
): number {
  assertValidPaise(fromPaise, "fromPaise");

  let result = fromPaise;

  for (const amount of subtractAmountsPaise) {
    assertValidPaise(amount, "subtractAmountPaise");

    result -= amount;
  }

  if (result < 0) {
    throw new Error("Paise subtraction cannot produce a negative result.");
  }

  if (!Number.isSafeInteger(result)) {
    throw new Error("Paise result exceeds JavaScript safe integer range.");
  }

  return result;
}

/**
 * Add paise values while allowing the caller to explicitly permit
 * a negative result.
 */
export function addSignedPaise(...amountsPaise: number[]): number {
  let total = 0;

  for (const amount of amountsPaise) {
    if (!Number.isSafeInteger(amount)) {
      throw new Error("Signed paise values must be safe integers.");
    }

    total += amount;

    if (!Number.isSafeInteger(total)) {
      throw new Error("Paise total exceeds JavaScript safe integer range.");
    }
  }

  return total;
}

/* -------------------------------------------------------------------------- */
/* Allocation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Allocate an amount across weighted recipients.
 *
 * The function ensures that the allocated values add up exactly to the
 * original amount.
 *
 * Example:
 * allocatePaise(100, [1, 1, 1])
 * -> [34, 33, 33]
 *
 * This is a mathematical helper only.
 * It does not define JUONE settlement or payout rules.
 */
export function allocatePaise(
  totalPaise: number,
  weights: number[],
  mode: RoundingMode = "HALF_UP",
): number[] {
  assertValidPaise(totalPaise, "totalPaise");

  if (!Array.isArray(weights) || weights.length === 0) {
    throw new Error("weights must contain at least one value.");
  }

  for (const weight of weights) {
    if (!isFiniteNumber(weight) || weight < 0) {
      throw new Error(
        "Each allocation weight must be a finite non-negative number.",
      );
    }
  }

  const totalWeight = weights.reduce(
    (sum, weight) => sum + weight,
    0,
  );

  if (totalWeight <= 0 || !Number.isFinite(totalWeight)) {
    throw new Error("Total allocation weight must be greater than zero.");
  }

  const allocations = weights.map((weight) => {
    const raw = (totalPaise * weight) / totalWeight;

    return roundWithMode(raw, mode);
  });

  const currentTotal = allocations.reduce(
    (sum, value) => sum + value,
    0,
  );

  const difference = totalPaise - currentTotal;

  if (difference === 0) {
    return allocations;
  }

  /*
   * Put any rounding remainder onto the largest-weight recipient.
   *
   * This only resolves mathematical rounding remainder.
   * It does not represent a business payout rule.
   */
  let largestWeightIndex = 0;

  for (let index = 1; index < weights.length; index += 1) {
    if (weights[index] > weights[largestWeightIndex]) {
      largestWeightIndex = index;
    }
  }

  allocations[largestWeightIndex] += difference;

  if (allocations.some((value) => !Number.isSafeInteger(value) || value < 0)) {
    throw new Error("Invalid allocation result.");
  }

  return allocations;
}

/* -------------------------------------------------------------------------- */
/* Display Helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Format paise as INR for UI display.
 *
 * This is display formatting only.
 * It must not be used as the source for financial calculations.
 */
export function formatPaiseAsINR(
  amountPaise: number,
  options?: Intl.NumberFormatOptions,
): string {
  assertValidPaise(amountPaise, "amountPaise");

  const amountRupees = paiseToRupees(amountPaise);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(amountRupees);
}

/**
 * Return a plain decimal INR string without the currency symbol.
 *
 * Example:
 * 10150 -> "101.50"
 */
export function formatPaiseAsRupeesString(
  amountPaise: number,
  decimals = 2,
): string {
  assertValidPaise(amountPaise, "amountPaise");
  assertValidDecimals(decimals);

  return paiseToRupees(amountPaise).toFixed(decimals);
}

/* -------------------------------------------------------------------------- */
/* Comparison                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Compare two paise values.
 *
 * Returns:
 * - -1 when first < second
 * -  0 when first === second
 * -  1 when first > second
 */
export function comparePaise(
  firstPaise: number,
  secondPaise: number,
): -1 | 0 | 1 {
  assertValidPaise(firstPaise, "firstPaise");
  assertValidPaise(secondPaise, "secondPaise");

  if (firstPaise < secondPaise) {
    return -1;
  }

  if (firstPaise > secondPaise) {
    return 1;
  }

  return 0;
}

/**
 * Check whether two paise values are equal.
 */
export function arePaiseEqual(
  firstPaise: number,
  secondPaise: number,
): boolean {
  return comparePaise(firstPaise, secondPaise) === 0;
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const rounding = {
  isFiniteNumber,
  isValidPaise,
  assertValidPaise,
  assertValidDecimals,

  roundHalfUp,
  roundHalfDown,
  roundHalfEven,
  roundUp,
  roundDown,
  roundWithMode,
  roundDecimal,

  roundPaiseToUnit,
  normalizePaise,

  calculatePercentagePaise,
  calculateRatio,

  rupeesToPaise,
  paiseToRupees,

  addPaise,
  subtractPaise,
  addSignedPaise,

  allocatePaise,

  formatPaiseAsINR,
  formatPaiseAsRupeesString,

  comparePaise,
  arePaiseEqual,
};

export default rounding;