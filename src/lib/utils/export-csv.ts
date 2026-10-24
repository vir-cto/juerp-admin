/**
 * JUERP - CSV Export Utilities
 *
 * File:
 * src/lib/utils/export-csv.ts
 *
 * Purpose:
 * - Convert tabular data into CSV.
 * - Safely escape CSV values.
 * - Download CSV files from the browser.
 * - Support ERP reports, ledger exports, order exports, audit exports, etc.
 *
 * IMPORTANT:
 * - This utility only handles CSV formatting/export.
 * - It does not calculate commission, GST, settlement, payout, or tax.
 * - Financial values should come from backend/ERP-authoritative data.
 */

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

// export type CsvPrimitive =
//   | string
//   | number
//   | boolean
//   | Date
//   | null
//   | undefined;

// export type CsvRow = Record<string, CsvPrimitive>;

// export interface CsvColumn<T extends CsvRow = CsvRow> {
//   /**
//    * Property/key used to read the value from the row.
//    */
//   key: keyof T | string;

//   /**
//    * Column heading displayed in the CSV.
//    */
//   header: string;

//   /**
//    * Optional value formatter.
//    */
//   format?: (
//     value: CsvPrimitive,
//     row: T,
//     index: number,
//   ) => CsvPrimitive;
// }

// export interface CsvExportOptions<T extends CsvRow = CsvRow> {
//   /**
//    * CSV column definitions.
//    */
//   columns?: CsvColumn<T>[];

//   /**
//    * CSV delimiter.
//    *
//    * Default: comma.
//    */
//   delimiter?: string;

//   /**
//    * Include a UTF-8 BOM.
//    *
//    * Recommended for Excel compatibility.
//    */
//   includeBom?: boolean;

//   /**
//    * File name used for browser download.
//    */
//   fileName?: string;

//   /**
//    * Add a final newline.
//    */
//   finalNewLine?: boolean;
// }

// /* -------------------------------------------------------------------------- */
// /* Constants                                                                  */
// /* -------------------------------------------------------------------------- */

// export const DEFAULT_CSV_DELIMITER = ",";

// export const DEFAULT_CSV_FILE_NAME = "juerp-export.csv";

// /* -------------------------------------------------------------------------- */
// /* Value Conversion                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Convert a supported CSV value into a string.
//  */
// export function valueToCsvString(
//   value: CsvPrimitive,
// ): string {
//   if (value === null || value === undefined) {
//     return "";
//   }

//   if (value instanceof Date) {
//     return value.toISOString();
//   }

//   if (typeof value === "boolean") {
//     return value ? "true" : "false";
//   }

//   return String(value);
// }

// /* -------------------------------------------------------------------------- */
// /* Escaping                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Escape a value according to CSV rules.
//  *
//  * Values containing:
//  * - comma
//  * - quote
//  * - newline
//  *
//  * are wrapped in double quotes.
//  *
//  * Existing double quotes are escaped by doubling them.
//  */
// export function escapeCsvValue(
//   value: CsvPrimitive,
//   delimiter = DEFAULT_CSV_DELIMITER,
// ): string {
//   const stringValue = valueToCsvString(value);

//   const requiresQuotes =
//     stringValue.includes('"') ||
//     stringValue.includes("\n") ||
//     stringValue.includes("\r") ||
//     stringValue.includes(delimiter);

//   if (!requiresQuotes) {
//     return stringValue;
//   }

//   return `"${stringValue.replace(/"/g, '""')}"`;
// }

// /* -------------------------------------------------------------------------- */
// /* Row Conversion                                                             */
// /* -------------------------------------------------------------------------- */

// /**
//  * Convert an object row into CSV values using column definitions.
//  */
// export function rowToCsv(
//   row: CsvRow,
//   columns: CsvColumn[],
//   rowIndex = 0,
//   delimiter = DEFAULT_CSV_DELIMITER,
// ): string {
//   return columns
//     .map((column) => {
//       const key = String(column.key);

//       const originalValue = row[key];

//       const formattedValue = column.format
//         ? column.format(
//             originalValue,
//             row,
//             rowIndex,
//           )
//         : originalValue;

//       return escapeCsvValue(
//         formattedValue,
//         delimiter,
//       );
//     })
//     .join(delimiter);
// }

// /* -------------------------------------------------------------------------- */
// /* Header Conversion                                                          */
// /* -------------------------------------------------------------------------- */

// /**
//  * Convert column definitions into a CSV header row.
//  */
// export function columnsToCsvHeader(
//   columns: CsvColumn[],
//   delimiter = DEFAULT_CSV_DELIMITER,
// ): string {
//   return columns
//     .map((column) =>
//       escapeCsvValue(
//         column.header,
//         delimiter,
//       ),
//     )
//     .join(delimiter);
// }

// /* -------------------------------------------------------------------------- */
// /* Automatic Columns                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Generate columns automatically from the first row.
//  *
//  * Example:
//  *
//  * {
//  *   orderId: "ORD001",
//  *   status: "PAID"
//  * }
//  *
//  * becomes:
//  *
//  * orderId,status
//  */
// export function inferCsvColumns(
//   rows: CsvRow[],
// ): CsvColumn[] {
//   if (rows.length === 0) {
//     return [];
//   }

//   const keys = Object.keys(rows[0]);

//   return keys.map((key) => ({
//     key,
//     header: key,
//   }));
// }

// /* -------------------------------------------------------------------------- */
// /* CSV Generation                                                             */
// /* -------------------------------------------------------------------------- */

// /**
//  * Convert rows into CSV text.
//  */
// export function generateCsv<T extends CsvRow>(
//   rows: T[],
//   options: CsvExportOptions<T> = {},
// ): string {
//   const {
//     columns = inferCsvColumns(
//       rows as CsvRow[],
//     ) as CsvColumn<T>[],
//     delimiter = DEFAULT_CSV_DELIMITER,
//     includeBom = false,
//     finalNewLine = true,
//   } = options;

//   if (!Array.isArray(rows)) {
//     throw new Error("rows must be an array.");
//   }

//   if (!Array.isArray(columns)) {
//     throw new Error("columns must be an array.");
//   }

//   if (!delimiter) {
//     throw new Error("CSV delimiter cannot be empty.");
//   }

//   const lines: string[] = [];

//   if (columns.length > 0) {
//     lines.push(
//       columnsToCsvHeader(
//         columns,
//         delimiter,
//       ),
//     );
//   }

//   rows.forEach((row, index) => {
//     lines.push(
//       rowToCsv(
//         row,
//         columns,
//         index,
//         delimiter,
//       ),
//     );
//   });

//   let csv = lines.join("\r\n");

//   if (finalNewLine && csv.length > 0) {
//     csv += "\r\n";
//   }

//   if (includeBom) {
//     csv = `\uFEFF${csv}`;
//   }

//   return csv;
// }

// /* -------------------------------------------------------------------------- */
// /* CSV Blob                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Create a browser Blob containing CSV data.
//  */
// export function createCsvBlob(
//   csv: string,
// ): Blob {
//   return new Blob(
//     [csv],
//     {
//       type: "text/csv;charset=utf-8;",
//     },
//   );
// }

// /**
//  * Generate a CSV Blob directly from rows.
//  */
// export function generateCsvBlob<T extends CsvRow>(
//   rows: T[],
//   options: CsvExportOptions<T> = {},
// ): Blob {
//   const csv = generateCsv(
//     rows,
//     options,
//   );

//   return createCsvBlob(csv);
// }

// /* -------------------------------------------------------------------------- */
// /* File Name                                                                  */
// /* -------------------------------------------------------------------------- */

// /**
//  * Sanitize a file name so it is safe for browser download.
//  */
// export function sanitizeCsvFileName(
//   fileName: string,
// ): string {
//   const trimmed = fileName.trim();

//   if (!trimmed) {
//     return DEFAULT_CSV_FILE_NAME;
//   }

//   const withoutExtension = trimmed
//     .replace(/\.csv$/i, "");

//   const sanitized = withoutExtension
//     .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
//     .replace(/\s+/g, "_")
//     .replace(/_+/g, "_")
//     .replace(/^_+|_+$/g, "");

//   if (!sanitized) {
//     return DEFAULT_CSV_FILE_NAME;
//   }

//   return `${sanitized}.csv`;
// }

// /* -------------------------------------------------------------------------- */
// /* Browser Download                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Download a CSV string in the browser.
//  */
// export function downloadCsv(
//   csv: string,
//   fileName = DEFAULT_CSV_FILE_NAME,
// ): void {
//   if (
//     typeof window === "undefined" ||
//     typeof document === "undefined"
//   ) {
//     throw new Error(
//       "downloadCsv can only be used in a browser.",
//     );
//   }

//   const blob = createCsvBlob(csv);

//   const url = URL.createObjectURL(blob);

//   const anchor = document.createElement("a");

//   anchor.href = url;
//   anchor.download = sanitizeCsvFileName(
//     fileName,
//   );

//   anchor.style.display = "none";

//   document.body.appendChild(anchor);

//   anchor.click();

//   document.body.removeChild(anchor);

//   URL.revokeObjectURL(url);
// }

// /**
//  * Generate and download a CSV file.
//  */
// export function exportCsv<T extends CsvRow>(
//   rows: T[],
//   options: CsvExportOptions<T> = {},
// ): void {
//   const csv = generateCsv(
//     rows,
//     {
//       includeBom: true,
//       ...options,
//     },
//   );

//   downloadCsv(
//     csv,
//     options.fileName ??
//       DEFAULT_CSV_FILE_NAME,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Array-Based Export                                                         */
// /* -------------------------------------------------------------------------- */

// export type CsvArrayRow = CsvPrimitive[];

// /**
//  * Generate CSV from an array-of-arrays.
//  *
//  * Useful when the column structure is already known.
//  */
// export function generateCsvFromArrays(
//   headers: CsvPrimitive[],
//   rows: CsvArrayRow[],
//   delimiter = DEFAULT_CSV_DELIMITER,
//   includeBom = false,
//   finalNewLine = true,
// ): string {
//   if (!Array.isArray(headers)) {
//     throw new Error(
//       "headers must be an array.",
//     );
//   }

//   if (!Array.isArray(rows)) {
//     throw new Error(
//       "rows must be an array.",
//     );
//   }

//   const lines: string[] = [];

//   lines.push(
//     headers
//       .map((value) =>
//         escapeCsvValue(
//           value,
//           delimiter,
//         ),
//       )
//       .join(delimiter),
//   );

//   rows.forEach((row) => {
//     lines.push(
//       row
//         .map((value) =>
//           escapeCsvValue(
//             value,
//             delimiter,
//           ),
//         )
//         .join(delimiter),
//     );
//   });

//   let csv = lines.join("\r\n");

//   if (finalNewLine) {
//     csv += "\r\n";
//   }

//   if (includeBom) {
//     csv = `\uFEFF${csv}`;
//   }

//   return csv;
// }

// /**
//  * Download CSV from an array-of-arrays.
//  */
// export function exportCsvFromArrays(
//   headers: CsvPrimitive[],
//   rows: CsvArrayRow[],
//   fileName = DEFAULT_CSV_FILE_NAME,
//   delimiter = DEFAULT_CSV_DELIMITER,
// ): void {
//   const csv = generateCsvFromArrays(
//     headers,
//     rows,
//     delimiter,
//     true,
//     true,
//   );

//   downloadCsv(
//     csv,
//     fileName,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Financial Export Helpers                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Convert paise to a decimal rupee string for CSV display.
//  *
//  * Example:
//  * 10150 -> "101.50"
//  *
//  * This is display formatting only.
//  * It does not change the backend financial value.
//  */
// export function formatPaiseForCsv(
//   amountPaise: number | null | undefined,
// ): string {
//   if (
//     amountPaise === null ||
//     amountPaise === undefined
//   ) {
//     return "";
//   }

//   if (
//     !Number.isSafeInteger(amountPaise) ||
//     amountPaise < 0
//   ) {
//     throw new Error(
//       "amountPaise must be a non-negative safe integer.",
//     );
//   }

//   return (
//     amountPaise / 100
//   ).toFixed(2);
// }

// /**
//  * Create a CSV formatter for paise fields.
//  *
//  * Example:
//  *
//  * {
//  *   key: "vendorPayoutPaise",
//  *   header: "Vendor Payout (INR)",
//  *   format: formatPaiseColumn
//  * }
//  */
// export function formatPaiseColumn(
//   value: CsvPrimitive,
// ): string {
//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "";
//   }

//   const numericValue =
//     typeof value === "number"
//       ? value
//       : Number(value);

//   if (!Number.isSafeInteger(numericValue)) {
//     throw new Error(
//       "CSV paise value must be a safe integer.",
//     );
//   }

//   return formatPaiseForCsv(
//     numericValue,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Date Export Helpers                                                        */
// /* -------------------------------------------------------------------------- */

// /**
//  * Format a Date for CSV export as an ISO string.
//  */
// export function formatDateForCsv(
//   value: CsvPrimitive,
// ): string {
//   if (
//     value === null ||
//     value === undefined ||
//     value === ""
//   ) {
//     return "";
//   }

//   if (value instanceof Date) {
//     return value.toISOString();
//   }

//   return String(value);
// }

// /* -------------------------------------------------------------------------- */
// /* Common ERP Column Factories                                                */
// /* -------------------------------------------------------------------------- */

// /**
//  * Create a paise-based CSV column.
//  *
//  * This helper is intentionally generic.
//  * It does not assign any financial business meaning.
//  */
// export function createPaiseColumn<T extends CsvRow>(
//   key: keyof T | string,
//   header: string,
// ): CsvColumn<T> {
//   return {
//     key,
//     header,
//     format: formatPaiseColumn,
//   };
// }

// /**
//  * Create a date CSV column.
//  */
// export function createDateColumn<T extends CsvRow>(
//   key: keyof T | string,
//   header: string,
// ): CsvColumn<T> {
//   return {
//     key,
//     header,
//     format: formatDateForCsv,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Default Export                                                             */
// /* -------------------------------------------------------------------------- */

// const csvUtils = {
//   DEFAULT_CSV_DELIMITER,
//   DEFAULT_CSV_FILE_NAME,

//   valueToCsvString,
//   escapeCsvValue,

//   rowToCsv,
//   columnsToCsvHeader,

//   inferCsvColumns,

//   generateCsv,
//   createCsvBlob,
//   generateCsvBlob,

//   sanitizeCsvFileName,

//   downloadCsv,
//   exportCsv,

//   generateCsvFromArrays,
//   exportCsvFromArrays,

//   formatPaiseForCsv,
//   formatPaiseColumn,

//   formatDateForCsv,

//   createPaiseColumn,
//   createDateColumn,
// };

// export default csvUtils;


export type CsvPrimitive =
  | string
  | number
  | boolean
  | Date
  | null
  | undefined;

export type CsvRow = Record<string, CsvPrimitive>;

export interface CsvColumn<T extends CsvRow = CsvRow> {
  key: keyof T | string;
  header: string;
  format?: (
    value: CsvPrimitive,
    row: T,
    index: number
  ) => CsvPrimitive;
}

export interface CsvExportOptions<T extends CsvRow = CsvRow> {
  columns?: CsvColumn<T>[];
  delimiter?: string;
  includeBom?: boolean;
  fileName?: string;
  finalNewLine?: boolean;
}

export const DEFAULT_CSV_DELIMITER = ",";
export const DEFAULT_CSV_FILE_NAME = "juerp-export.csv";

export function valueToCsvString(value: CsvPrimitive): string {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

export function escapeCsvValue(
  value: CsvPrimitive,
  delimiter = DEFAULT_CSV_DELIMITER
): string {
  const stringValue = valueToCsvString(value);
  const requiresQuotes =
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r") ||
    stringValue.includes(delimiter);

  if (!requiresQuotes) return stringValue;
  return `"${stringValue.replace(/"/g, '""')}"`;
}

function readCell<T extends CsvRow>(row: T, key: keyof T | string): CsvPrimitive {
  return (row as CsvRow)[String(key)];
}

export function rowToCsv<T extends CsvRow>(
  row: T,
  columns: CsvColumn<T>[],
  rowIndex = 0,
  delimiter = DEFAULT_CSV_DELIMITER
): string {
  return columns
    .map((column) => {
      const originalValue = readCell(row, column.key);
      const formattedValue = column.format
        ? column.format(originalValue, row, rowIndex)
        : originalValue;
      return escapeCsvValue(formattedValue, delimiter);
    })
    .join(delimiter);
}

export function columnsToCsvHeader<T extends CsvRow>(
  columns: CsvColumn<T>[],
  delimiter = DEFAULT_CSV_DELIMITER
): string {
  return columns
    .map((column) => escapeCsvValue(column.header, delimiter))
    .join(delimiter);
}

export function inferCsvColumns<T extends CsvRow>(rows: T[]): CsvColumn<T>[] {
  if (rows.length === 0) return [];
  return Object.keys(rows[0] as CsvRow).map((key) => ({
    key,
    header: key,
  }));
}

export function generateCsv<T extends CsvRow>(
  rows: T[],
  options: CsvExportOptions<T> = {}
): string {
  if (!Array.isArray(rows)) {
    throw new Error("rows must be an array.");
  }

  const {
    columns = inferCsvColumns(rows),
    delimiter = DEFAULT_CSV_DELIMITER,
    includeBom = false,
    finalNewLine = true,
  } = options;

  if (!Array.isArray(columns)) {
    throw new Error("columns must be an array.");
  }
  if (!delimiter) {
    throw new Error("CSV delimiter cannot be empty.");
  }

  const lines: string[] = [];

  if (columns.length > 0) {
    lines.push(columnsToCsvHeader(columns, delimiter));
  }

  rows.forEach((row, index) => {
    lines.push(rowToCsv(row, columns, index, delimiter));
  });

  let csv = lines.join("\r\n");
  if (finalNewLine && csv.length > 0) csv += "\r\n";
  if (includeBom) csv = `\uFEFF${csv}`;
  return csv;
}

export function createCsvBlob(csv: string): Blob {
  return new Blob([csv], { type: "text/csv;charset=utf-8;" });
}

export function generateCsvBlob<T extends CsvRow>(
  rows: T[],
  options: CsvExportOptions<T> = {}
): Blob {
  return createCsvBlob(generateCsv(rows, options));
}

export function sanitizeCsvFileName(fileName: string): string {
  const trimmed = fileName.trim();
  if (!trimmed) return DEFAULT_CSV_FILE_NAME;

  const withoutExtension = trimmed.replace(/\.csv$/i, "");
  const sanitized = withoutExtension
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!sanitized) return DEFAULT_CSV_FILE_NAME;
  return `${sanitized}.csv`;
}

export function downloadCsv(
  csv: string,
  fileName = DEFAULT_CSV_FILE_NAME
): void {
  if (typeof window === "undefined" || typeof document === "undefined") {
    throw new Error("downloadCsv can only be used in a browser.");
  }

  const blob = createCsvBlob(csv);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = sanitizeCsvFileName(fileName);
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function exportCsv<T extends CsvRow>(
  rows: T[],
  options: CsvExportOptions<T> = {}
): void {
  const csv = generateCsv(rows, { includeBom: true, ...options });
  downloadCsv(csv, options.fileName ?? DEFAULT_CSV_FILE_NAME);
}

export type CsvArrayRow = CsvPrimitive[];

export function generateCsvFromArrays(
  headers: CsvPrimitive[],
  rows: CsvArrayRow[],
  delimiter = DEFAULT_CSV_DELIMITER,
  includeBom = false,
  finalNewLine = true
): string {
  if (!Array.isArray(headers)) throw new Error("headers must be an array.");
  if (!Array.isArray(rows)) throw new Error("rows must be an array.");

  const lines: string[] = [
    headers.map((v) => escapeCsvValue(v, delimiter)).join(delimiter),
  ];

  rows.forEach((row) => {
    lines.push(row.map((v) => escapeCsvValue(v, delimiter)).join(delimiter));
  });

  let csv = lines.join("\r\n");
  if (finalNewLine) csv += "\r\n";
  if (includeBom) csv = `\uFEFF${csv}`;
  return csv;
}

export function exportCsvFromArrays(
  headers: CsvPrimitive[],
  rows: CsvArrayRow[],
  fileName = DEFAULT_CSV_FILE_NAME,
  delimiter = DEFAULT_CSV_DELIMITER
): void {
  downloadCsv(
    generateCsvFromArrays(headers, rows, delimiter, true, true),
    fileName
  );
}

export function formatPaiseForCsv(
  amountPaise: number | null | undefined
): string {
  if (amountPaise === null || amountPaise === undefined) return "";
  if (!Number.isSafeInteger(amountPaise) || amountPaise < 0) {
    throw new Error("amountPaise must be a non-negative safe integer.");
  }
  return (amountPaise / 100).toFixed(2);
}

/** Matches CsvColumn.format signature (extra args ignored). */
export function formatPaiseColumn(
  value: CsvPrimitive,
  _row?: CsvRow,
  _index?: number
): string {
  if (value === null || value === undefined || value === "") return "";
  const numericValue = typeof value === "number" ? value : Number(value);
  if (!Number.isSafeInteger(numericValue)) {
    throw new Error("CSV paise value must be a safe integer.");
  }
  return formatPaiseForCsv(numericValue);
}

export function formatDateForCsv(
  value: CsvPrimitive,
  _row?: CsvRow,
  _index?: number
): string {
  if (value === null || value === undefined || value === "") return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

export function createPaiseColumn<T extends CsvRow>(
  key: keyof T | string,
  header: string
): CsvColumn<T> {
  return { key, header, format: formatPaiseColumn };
}

export function createDateColumn<T extends CsvRow>(
  key: keyof T | string,
  header: string
): CsvColumn<T> {
  return { key, header, format: formatDateForCsv };
}

const csvUtils = {
  DEFAULT_CSV_DELIMITER,
  DEFAULT_CSV_FILE_NAME,
  valueToCsvString,
  escapeCsvValue,
  rowToCsv,
  columnsToCsvHeader,
  inferCsvColumns,
  generateCsv,
  createCsvBlob,
  generateCsvBlob,
  sanitizeCsvFileName,
  downloadCsv,
  exportCsv,
  generateCsvFromArrays,
  exportCsvFromArrays,
  formatPaiseForCsv,
  formatPaiseColumn,
  formatDateForCsv,
  createPaiseColumn,
  createDateColumn,
};

export default csvUtils;