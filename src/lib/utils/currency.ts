/**
 * JUERP - Currency Utilities
 *
 * File:
 * src/lib/utils/currency.ts
 *
 * Purpose:
 * - Currency display and conversion helpers.
 * - JUONE financial values are stored in paise.
 * - INR is the canonical currency used by the current JUONE financial model.
 *
 * IMPORTANT:
 * - This file does NOT define commission, GST, platform fees, delivery fees,
 *   settlement rules, or payout rules.
 * - Backend/ERP-authoritative financial values remain the source of truth.
 * - These utilities are for formatting, safe conversion, and UI usage.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type SupportedCurrency = "INR";

export interface CurrencyFormatOptions {
  currency?: SupportedCurrency;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  showCurrencySymbol?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_CURRENCY: SupportedCurrency = "INR";

export const DEFAULT_LOCALE = "en-IN";

export const PAISE_PER_RUPEE = 100;

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a value is a valid paise amount.
 */
export function isValidPaise(value: number): boolean {
  return Number.isSafeInteger(value) && value >= 0;
}

/**
 * Ensure a value is a valid paise amount.
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
 * Check whether a currency is supported.
 */
export function isSupportedCurrency(
  currency: string,
): currency is SupportedCurrency {
  return currency === "INR";
}

/**
 * Ensure the currency is supported.
 */
export function assertSupportedCurrency(
  currency: string,
): asserts currency is SupportedCurrency {
  if (!isSupportedCurrency(currency)) {
    throw new Error(`Unsupported currency: ${currency}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Paise <-> Rupees                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Convert paise to rupees.
 *
 * Example:
 * 10150 -> 101.50
 */
export function paiseToRupees(amountPaise: number): number {
  assertValidPaise(amountPaise);

  return amountPaise / PAISE_PER_RUPEE;
}

/**
 * Convert rupees to paise.
 *
 * Example:
 * 101.50 -> 10150
 *
 * HALF_UP-style rounding is used because paise must be an integer.
 */
export function rupeesToPaise(amountRupees: number): number {
  if (!Number.isFinite(amountRupees)) {
    throw new Error("amountRupees must be a finite number.");
  }

  if (amountRupees < 0) {
    throw new Error("amountRupees cannot be negative.");
  }

  const paise = Math.round(amountRupees * PAISE_PER_RUPEE);

  assertValidPaise(paise);

  return paise;
}

/**
 * Convert a numeric value to paise while allowing the caller to explicitly
 * identify the input unit.
 */
export function toPaise(
  value: number,
  unit: "PAISE" | "RUPEES",
): number {
  if (!Number.isFinite(value)) {
    throw new Error("Currency value must be a finite number.");
  }

  if (value < 0) {
    throw new Error("Currency value cannot be negative.");
  }

  if (unit === "PAISE") {
    assertValidPaise(value);

    return value;
  }

  return rupeesToPaise(value);
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Format a paise amount as INR.
 *
 * Example:
 * 10150 -> ₹101.50
 */
export function formatINR(
  amountPaise: number,
  options: CurrencyFormatOptions = {},
): string {
  assertValidPaise(amountPaise);

  const {
    currency = DEFAULT_CURRENCY,
    locale = DEFAULT_LOCALE,
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    showCurrencySymbol = true,
  } = options;

  assertSupportedCurrency(currency);

  const amountRupees = paiseToRupees(amountPaise);

  if (!showCurrencySymbol) {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amountRupees);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amountRupees);
}

/**
 * Format paise as a plain rupee number string.
 *
 * Example:
 * 10150 -> "101.50"
 */
export function formatRupees(
  amountPaise: number,
  decimals = 2,
): string {
  assertValidPaise(amountPaise);

  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 20) {
    throw new Error("decimals must be an integer between 0 and 20.");
  }

  return paiseToRupees(amountPaise).toFixed(decimals);
}

/**
 * Format paise using the INR currency symbol.
 *
 * Alias useful for UI components.
 */
export function formatCurrency(
  amountPaise: number,
  options: CurrencyFormatOptions = {},
): string {
  return formatINR(amountPaise, options);
}

/**
 * Return only the currency symbol.
 */
export function getCurrencySymbol(
  currency: SupportedCurrency = DEFAULT_CURRENCY,
): string {
  assertSupportedCurrency(currency);

  if (currency === "INR") {
    return "₹";
  }

  return currency;
}

/* -------------------------------------------------------------------------- */
/* Display Helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Format an amount without decimals when the UI requires whole rupees.
 *
 * Example:
 * 10000 -> "₹100"
 */
export function formatWholeINR(amountPaise: number): string {
  assertValidPaise(amountPaise);

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(paiseToRupees(amountPaise));
}

/**
 * Format an amount without the currency symbol.
 *
 * Example:
 * 10150 -> "101.50"
 */
export function formatAmountOnly(amountPaise: number): string {
  return formatINR(amountPaise, {
    showCurrencySymbol: false,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Return a compact display for large INR amounts.
 *
 * Examples:
 * 100000 -> ₹1,000.00
 * 1000000 -> ₹10,000.00
 *
 * This intentionally keeps exact INR formatting rather than introducing
 * business-specific abbreviations such as "L" or "Cr".
 */
export function formatCompactINR(amountPaise: number): string {
  assertValidPaise(amountPaise);

  const amountRupees = paiseToRupees(amountPaise);

  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
    notation: "compact",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amountRupees);
}

/* -------------------------------------------------------------------------- */
/* Arithmetic Helpers                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Add multiple paise amounts safely.
 */
export function addCurrency(
  ...amountsPaise: number[]
): number {
  let total = 0;

  for (const amount of amountsPaise) {
    assertValidPaise(amount);

    total += amount;

    if (!Number.isSafeInteger(total)) {
      throw new Error("Currency total exceeds safe integer range.");
    }
  }

  return total;
}

/**
 * Subtract paise amounts safely.
 *
 * Negative monetary results are rejected.
 */
export function subtractCurrency(
  fromPaise: number,
  ...amountsPaise: number[]
): number {
  assertValidPaise(fromPaise, "fromPaise");

  let result = fromPaise;

  for (const amount of amountsPaise) {
    assertValidPaise(amount);

    result -= amount;
  }

  if (result < 0) {
    throw new Error("Currency result cannot be negative.");
  }

  if (!Number.isSafeInteger(result)) {
    throw new Error("Currency result exceeds safe integer range.");
  }

  return result;
}

/**
 * Calculate a percentage amount from a paise base.
 *
 * This is arithmetic only.
 *
 * It does NOT decide which percentage applies.
 */
export function percentageOfCurrency(
  basePaise: number,
  percentage: number,
): number {
  assertValidPaise(basePaise, "basePaise");

  if (!Number.isFinite(percentage) || percentage < 0) {
    throw new Error(
      "percentage must be a finite non-negative number.",
    );
  }

  const result = Math.round(
    (basePaise * percentage) / 100,
  );

  assertValidPaise(result, "percentageAmountPaise");

  return result;
}

/* -------------------------------------------------------------------------- */
/* Comparison                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Compare two paise amounts.
 */
export function compareCurrency(
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
 * Check whether two paise amounts are equal.
 */
export function isSameCurrency(
  firstPaise: number,
  secondPaise: number,
): boolean {
  return compareCurrency(firstPaise, secondPaise) === 0;
}

/**
 * Check whether an amount is zero.
 */
export function isZeroCurrency(amountPaise: number): boolean {
  assertValidPaise(amountPaise);

  return amountPaise === 0;
}

/* -------------------------------------------------------------------------- */
/* Parsing                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Parse a rupee string into paise.
 *
 * Examples:
 * "₹101.50" -> 10150
 * "101.50"  -> 10150
 * "1,015.50" -> 101550
 *
 * This function is intended for user/display input.
 * Production financial values should preferably come from the backend
 * as integer paise.
 */
export function parseRupeesToPaise(value: string): number {
  if (typeof value !== "string") {
    throw new Error("Currency input must be a string.");
  }

  const cleaned = value
    .trim()
    .replace(/₹/g, "")
    .replace(/,/g, "")
    .replace(/\s/g, "");

  if (cleaned.length === 0) {
    throw new Error("Currency input cannot be empty.");
  }

  const numericValue = Number(cleaned);

  if (!Number.isFinite(numericValue)) {
    throw new Error(`Invalid currency value: ${value}`);
  }

  return rupeesToPaise(numericValue);
}

/**
 * Safely parse an optional currency value.
 *
 * Returns null instead of throwing for empty input.
 */
export function parseOptionalRupeesToPaise(
  value: string | null | undefined,
): number | null {
  if (value === null || value === undefined || value.trim() === "") {
    return null;
  }

  return parseRupeesToPaise(value);
}

/* -------------------------------------------------------------------------- */
/* Input Helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Convert a paise amount into a value suitable for an HTML number input.
 */
export function paiseToInputValue(
  amountPaise: number,
): string {
  assertValidPaise(amountPaise);

  return paiseToRupees(amountPaise).toFixed(2);
}

/**
 * Convert a currency input value into paise.
 */
export function inputValueToPaise(
  value: string,
): number {
  return parseRupeesToPaise(value);
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const currency = {
  DEFAULT_CURRENCY,
  DEFAULT_LOCALE,
  PAISE_PER_RUPEE,

  isValidPaise,
  assertValidPaise,
  isSupportedCurrency,
  assertSupportedCurrency,

  paiseToRupees,
  rupeesToPaise,
  toPaise,

  formatINR,
  formatRupees,
  formatCurrency,
  getCurrencySymbol,

  formatWholeINR,
  formatAmountOnly,
  formatCompactINR,

  addCurrency,
  subtractCurrency,
  percentageOfCurrency,

  compareCurrency,
  isSameCurrency,
  isZeroCurrency,

  parseRupeesToPaise,
  parseOptionalRupeesToPaise,

  paiseToInputValue,
  inputValueToPaise,
};

export default currency;