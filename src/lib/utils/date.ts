/**
 * JUERP - Date Utilities
 *
 * File:
 * src/lib/utils/date.ts
 *
 * Purpose:
 * - Safe date parsing and formatting helpers.
 * - Consistent date/time display across JUERP.
 * - Supports Firestore Timestamp, Date, string, and numeric timestamps.
 *
 * IMPORTANT:
 * - Date utilities do not define business status transitions.
 * - Backend timestamps remain authoritative.
 * - Dates received from Firestore/backend should be preserved accurately.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type DateInput =
  | Date
  | string
  | number
  | {
      toDate: () => Date;
    }
  | null
  | undefined;

export type DateFormatStyle =
  | "date"
  | "time"
  | "datetime"
  | "short"
  | "long"
  | "relative";

export interface DateFormatOptions {
  locale?: string;
  timeZone?: string;
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "short" | "long" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  hour12?: boolean;
}

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_LOCALE = "en-IN";

/**
 * India is the primary timezone for the current JUONE operating context.
 *
 * This is used only as the display default.
 * Backend timestamps should remain timezone-aware/UTC-based.
 */
export const DEFAULT_TIME_ZONE = "Asia/Kolkata";

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a Date object contains a valid date.
 */
export function isValidDate(date: Date): boolean {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

/**
 * Check whether a value can be interpreted as a date.
 */
export function isValidDateInput(value: DateInput): boolean {
  try {
    return parseDate(value) !== null;
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* Parsing                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Convert supported date input into a native Date object.
 *
 * Supported:
 * - Date
 * - ISO date string
 * - timestamp in milliseconds
 * - Firestore-like Timestamp with toDate()
 *
 * Invalid values return null.
 */
export function parseDate(value: DateInput): Date | null {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return isValidDate(value)
      ? new Date(value.getTime())
      : null;
  }

  if (
    typeof value === "object" &&
    "toDate" in value &&
    typeof value.toDate === "function"
  ) {
    const date = value.toDate();

    return isValidDate(date)
      ? new Date(date.getTime())
      : null;
  }

  if (typeof value === "number") {
    const date = new Date(value);

    return isValidDate(date) ? date : null;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (!trimmed) {
      return null;
    }

    const date = new Date(trimmed);

    return isValidDate(date) ? date : null;
  }

  return null;
}

/**
 * Parse a date and throw when invalid.
 *
 * Useful when a date is required.
 */
export function requireDate(
  value: DateInput,
  fieldName = "date",
): Date {
  const date = parseDate(value);

  if (!date) {
    throw new Error(`Invalid ${fieldName}.`);
  }

  return date;
}

/* -------------------------------------------------------------------------- */
/* Timestamp Helpers                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Convert a date into milliseconds since Unix epoch.
 */
export function toTimestampMs(value: DateInput): number | null {
  const date = parseDate(value);

  return date ? date.getTime() : null;
}

/**
 * Convert a date into Unix seconds.
 */
export function toTimestampSeconds(value: DateInput): number | null {
  const timestampMs = toTimestampMs(value);

  return timestampMs === null
    ? null
    : Math.floor(timestampMs / 1000);
}

/**
 * Convert a date into an ISO-8601 string.
 */
export function toISOString(value: DateInput): string | null {
  const date = parseDate(value);

  return date ? date.toISOString() : null;
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Format date as DD/MM/YYYY.
 *
 * Example:
 * 05/10/2026
 */
export function formatDate(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Format date using a long readable format.
 *
 * Example:
 * 5 October 2026
 */
export function formatLongDate(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format time.
 *
 * Example:
 * 09:30 PM
 */
export function formatTime(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
    hour12 = true,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  }).format(date);
}

/**
 * Format date and time together.
 *
 * Example:
 * 05/10/2026, 09:30 PM
 */
export function formatDateTime(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
    hour12 = true,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  }).format(date);
}

/**
 * Format date and time in a more readable long form.
 *
 * Example:
 * 5 October 2026 at 09:30 PM
 */
export function formatLongDateTime(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
    hour12 = true,
  } = options;

  const formatted = new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12,
  }).format(date);

  return formatted.replace(" at ", " • ");
}

/* -------------------------------------------------------------------------- */
/* Short Display Helpers                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Format a compact date.
 *
 * Example:
 * 05 Oct 2026
 */
export function formatShortDate(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Format month and year.
 *
 * Example:
 * October 2026
 */
export function formatMonthYear(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    month: "long",
    year: "numeric",
  }).format(date);
}

/**
 * Format weekday.
 *
 * Example:
 * Monday
 */
export function formatWeekday(
  value: DateInput,
  options: DateFormatOptions = {},
): string {
  const date = parseDate(value);

  if (!date) {
    return "-";
  }

  const {
    locale = DEFAULT_LOCALE,
    timeZone = DEFAULT_TIME_ZONE,
  } = options;

  return new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "long",
  }).format(date);
}

/* -------------------------------------------------------------------------- */
/* Relative Time                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Return a human-readable relative time.
 *
 * Examples:
 * - Just now
 * - 5 minutes ago
 * - 2 hours ago
 * - Yesterday
 * - 3 days ago
 *
 * This is display-only and does not affect business logic.
 */
export function formatRelativeTime(
  value: DateInput,
  now: DateInput = new Date(),
): string {
  const date = parseDate(value);
  const current = parseDate(now);

  if (!date || !current) {
    return "-";
  }

  const differenceMs = current.getTime() - date.getTime();

  const future = differenceMs < 0;
  const absoluteMs = Math.abs(differenceMs);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (absoluteMs < minute) {
    return future ? "In a few seconds" : "Just now";
  }

  if (absoluteMs < hour) {
    const minutes = Math.floor(absoluteMs / minute);

    return future
      ? `In ${minutes} minute${minutes === 1 ? "" : "s"}`
      : `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  }

  if (absoluteMs < day) {
    const hours = Math.floor(absoluteMs / hour);

    return future
      ? `In ${hours} hour${hours === 1 ? "" : "s"}`
      : `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (absoluteMs < week) {
    const days = Math.floor(absoluteMs / day);

    if (days === 1) {
      return future ? "Tomorrow" : "Yesterday";
    }

    return future
      ? `In ${days} days`
      : `${days} days ago`;
  }

  const weeks = Math.floor(absoluteMs / week);

  return future
    ? `In ${weeks} week${weeks === 1 ? "" : "s"}`
    : `${weeks} week${weeks === 1 ? "" : "s"} ago`;
}

/* -------------------------------------------------------------------------- */
/* Date Difference                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Difference between two dates in milliseconds.
 */
export function differenceInMilliseconds(
  first: DateInput,
  second: DateInput,
): number | null {
  const firstDate = parseDate(first);
  const secondDate = parseDate(second);

  if (!firstDate || !secondDate) {
    return null;
  }

  return firstDate.getTime() - secondDate.getTime();
}

/**
 * Difference between two dates in seconds.
 */
export function differenceInSeconds(
  first: DateInput,
  second: DateInput,
): number | null {
  const difference = differenceInMilliseconds(first, second);

  return difference === null
    ? null
    : Math.floor(difference / 1000);
}

/**
 * Difference between two dates in minutes.
 */
export function differenceInMinutes(
  first: DateInput,
  second: DateInput,
): number | null {
  const difference = differenceInMilliseconds(first, second);

  return difference === null
    ? null
    : Math.floor(difference / (60 * 1000));
}

/**
 * Difference between two dates in hours.
 */
export function differenceInHours(
  first: DateInput,
  second: DateInput,
): number | null {
  const difference = differenceInMilliseconds(first, second);

  return difference === null
    ? null
    : Math.floor(difference / (60 * 60 * 1000));
}

/**
 * Difference between two dates in days.
 */
export function differenceInDays(
  first: DateInput,
  second: DateInput,
): number | null {
  const difference = differenceInMilliseconds(first, second);

  return difference === null
    ? null
    : Math.floor(difference / (24 * 60 * 60 * 1000));
}

/* -------------------------------------------------------------------------- */
/* Date Comparison                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Check whether two dates represent the same instant.
 */
export function isSameDate(
  first: DateInput,
  second: DateInput,
): boolean {
  const firstDate = parseDate(first);
  const secondDate = parseDate(second);

  if (!firstDate || !secondDate) {
    return false;
  }

  return firstDate.getTime() === secondDate.getTime();
}

/**
 * Check whether first date is before second date.
 */
export function isBefore(
  first: DateInput,
  second: DateInput,
): boolean {
  const firstDate = parseDate(first);
  const secondDate = parseDate(second);

  if (!firstDate || !secondDate) {
    return false;
  }

  return firstDate.getTime() < secondDate.getTime();
}

/**
 * Check whether first date is after second date.
 */
export function isAfter(
  first: DateInput,
  second: DateInput,
): boolean {
  const firstDate = parseDate(first);
  const secondDate = parseDate(second);

  if (!firstDate || !secondDate) {
    return false;
  }

  return firstDate.getTime() > secondDate.getTime();
}

/**
 * Check whether a date is between two dates.
 *
 * Boundaries are inclusive.
 */
export function isBetween(
  value: DateInput,
  start: DateInput,
  end: DateInput,
): boolean {
  const valueDate = parseDate(value);
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  if (!valueDate || !startDate || !endDate) {
    return false;
  }

  const timestamp = valueDate.getTime();
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  return (
    timestamp >= startTimestamp &&
    timestamp <= endTimestamp
  );
}

/* -------------------------------------------------------------------------- */
/* Date Creation                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Return the current Date.
 */
export function now(): Date {
  return new Date();
}

/**
 * Return the current time as an ISO string.
 */
export function nowISOString(): string {
  return new Date().toISOString();
}

/**
 * Add milliseconds to a date.
 */
export function addMilliseconds(
  value: DateInput,
  milliseconds: number,
): Date {
  const date = requireDate(value);

  if (!Number.isFinite(milliseconds)) {
    throw new Error("milliseconds must be a finite number.");
  }

  return new Date(date.getTime() + milliseconds);
}

/**
 * Add seconds to a date.
 */
export function addSeconds(
  value: DateInput,
  seconds: number,
): Date {
  return addMilliseconds(value, seconds * 1000);
}

/**
 * Add minutes to a date.
 */
export function addMinutes(
  value: DateInput,
  minutes: number,
): Date {
  return addMilliseconds(value, minutes * 60 * 1000);
}

/**
 * Add hours to a date.
 */
export function addHours(
  value: DateInput,
  hours: number,
): Date {
  return addMilliseconds(value, hours * 60 * 60 * 1000);
}

/**
 * Add days to a date.
 */
export function addDays(
  value: DateInput,
  days: number,
): Date {
  return addMilliseconds(value, days * 24 * 60 * 60 * 1000);
}

/* -------------------------------------------------------------------------- */
/* Start / End Helpers                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Start of day in the local JavaScript timezone.
 *
 * Use timezone-aware formatting for display where needed.
 */
export function startOfDay(value: DateInput): Date {
  const date = requireDate(value);

  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  return result;
}

/**
 * End of day in the local JavaScript timezone.
 */
export function endOfDay(value: DateInput): Date {
  const date = requireDate(value);

  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
}

/* -------------------------------------------------------------------------- */
/* Safe Display                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Format a date safely.
 *
 * Invalid/missing values return "-".
 */
export function safeFormatDate(
  value: DateInput,
  style: DateFormatStyle = "datetime",
): string {
  switch (style) {
    case "date":
      return formatDate(value);

    case "time":
      return formatTime(value);

    case "datetime":
      return formatDateTime(value);

    case "short":
      return formatShortDate(value);

    case "long":
      return formatLongDateTime(value);

    case "relative":
      return formatRelativeTime(value);

    default:
      return "-";
  }
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const dateUtils = {
  DEFAULT_LOCALE,
  DEFAULT_TIME_ZONE,

  isValidDate,
  isValidDateInput,

  parseDate,
  requireDate,

  toTimestampMs,
  toTimestampSeconds,
  toISOString,

  formatDate,
  formatLongDate,
  formatTime,
  formatDateTime,
  formatLongDateTime,

  formatShortDate,
  formatMonthYear,
  formatWeekday,

  formatRelativeTime,

  differenceInMilliseconds,
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,

  isSameDate,
  isBefore,
  isAfter,
  isBetween,

  now,
  nowISOString,

  addMilliseconds,
  addSeconds,
  addMinutes,
  addHours,
  addDays,

  startOfDay,
  endOfDay,

  safeFormatDate,
};

export default dateUtils;