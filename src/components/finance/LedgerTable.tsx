"use client";

import {
  ReactNode,
  useMemo,
  useState,
} from "react";

export type LedgerAccountType =
  | "CUSTOMER"
  | "VENDOR"
  | "CAPTAIN"
  | "PLATFORM"
  | "TAX"
  | "CASHFREE"
  | "SETTLEMENT"
  | "OTHER";

export type LedgerTransactionType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "PAYMENT"
  | "REFUND"
  | "COMMISSION"
  | "SETTLEMENT"
  | "PAYOUT"
  | "TAX"
  | "ADJUSTMENT";

export type LedgerEntryStatus =
  | "POSTED"
  | "PENDING"
  | "REVERSED";

export interface LedgerEntry {
  ledgerEntryId: string;

  accountType: LedgerAccountType;

  accountId: string;

  transactionType: LedgerTransactionType;

  transactionId?: string;

  creditPaise: number;

  debitPaise: number;

  currency: string;

  status: LedgerEntryStatus;

  description?: string;

  correlationId: string;

  createdAt: string;

  updatedAt?: string;
}

interface LedgerTableProps {
  entries: LedgerEntry[];

  loading?: boolean;

  onRowClick?: (
    entry: LedgerEntry
  ) => void;

  onViewDetails?: (
    entry: LedgerEntry
  ) => void;

  showSearch?: boolean;

  showFilters?: boolean;

  showPagination?: boolean;

  pageSize?: number;

  emptyMessage?: string;

  className?: string;
}

const ACCOUNT_TYPE_CONFIG: Record<
  LedgerAccountType,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
  CUSTOMER: {
    label: "Customer",
    background: "bg-blue-100",
    text: "text-blue-700",
  },

  VENDOR: {
    label: "Vendor",
    background: "bg-orange-100",
    text: "text-orange-700",
  },

  CAPTAIN: {
    label: "Captain",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  PLATFORM: {
    label: "Platform",
    background: "bg-slate-100",
    text: "text-slate-700",
  },

  TAX: {
    label: "Tax",
    background: "bg-amber-100",
    text: "text-amber-700",
  },

  CASHFREE: {
    label: "Cashfree",
    background: "bg-green-100",
    text: "text-green-700",
  },

  SETTLEMENT: {
    label: "Settlement",
    background: "bg-indigo-100",
    text: "text-indigo-700",
  },

  OTHER: {
    label: "Other",
    background: "bg-slate-100",
    text: "text-slate-600",
  },
};

const TRANSACTION_TYPE_CONFIG: Record<
  LedgerTransactionType,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
  ORDER: {
    label: "Order",
    background: "bg-blue-100",
    text: "text-blue-700",
  },

  BOOKING: {
    label: "Booking",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  RIDE: {
    label: "Ride",
    background: "bg-green-100",
    text: "text-green-700",
  },

  PAYMENT: {
    label: "Payment",
    background: "bg-emerald-100",
    text: "text-emerald-700",
  },

  REFUND: {
    label: "Refund",
    background: "bg-red-100",
    text: "text-red-700",
  },

  COMMISSION: {
    label: "Commission",
    background: "bg-orange-100",
    text: "text-orange-700",
  },

  SETTLEMENT: {
    label: "Settlement",
    background: "bg-indigo-100",
    text: "text-indigo-700",
  },

  PAYOUT: {
    label: "Payout",
    background: "bg-teal-100",
    text: "text-teal-700",
  },

  TAX: {
    label: "Tax",
    background: "bg-amber-100",
    text: "text-amber-700",
  },

  ADJUSTMENT: {
    label: "Adjustment",
    background: "bg-slate-100",
    text: "text-slate-700",
  },
};

const STATUS_CONFIG: Record<
  LedgerEntryStatus,
  {
    label: string;
    background: string;
    text: string;
    dot: string;
  }
> = {
  POSTED: {
    label: "Posted",
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },

  PENDING: {
    label: "Pending",
    background: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },

  REVERSED: {
    label: "Reversed",
    background: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

function formatCurrency(
  amountPaise: number,
  currency = "INR"
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(amountPaise / 100);
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function formatLabel(
  value: string
): string {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getNetAmount(
  entry: LedgerEntry
): number {
  return (
    entry.creditPaise -
    entry.debitPaise
  );
}

function CopyButton({
  value,
}: {
  value: string;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        value
      );
    } catch {
      // Clipboard access can be blocked
      // by browser permissions.
    }
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        void handleCopy();
      }}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[8px] font-bold text-slate-500 transition hover:border-orange-200 hover:text-orange-600"
    >
      Copy
    </button>
  );
}

function ChevronIcon({
  direction,
}: {
  direction: "left" | "right";
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 18l-6-6 6-6"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 18l6-6-6-6"
        />
      )}
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
      />

      <circle
        cx="12"
        cy="12"
        r="2.5"
      />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 19V5"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 11l6-6 6 6"
      />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 5v14"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 13l6 6 6-6"
      />
    </svg>
  );
}

export default function LedgerTable({
  entries,
  loading = false,
  onRowClick,
  onViewDetails,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  pageSize = 10,
  emptyMessage = "No ledger entries found.",
  className = "",
}: LedgerTableProps) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    accountFilter,
    setAccountFilter,
  ] = useState<
    LedgerAccountType | "ALL"
  >("ALL");

  const [
    transactionFilter,
    setTransactionFilter,
  ] = useState<
    LedgerTransactionType | "ALL"
  >("ALL");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<
    LedgerEntryStatus | "ALL"
  >("ALL");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const filteredEntries =
    useMemo(() => {
      const searchValue =
        search.trim().toLowerCase();

      return entries.filter(
        (entry) => {
          const matchesSearch =
            !searchValue ||
            entry.ledgerEntryId
              .toLowerCase()
              .includes(searchValue) ||
            entry.accountId
              .toLowerCase()
              .includes(searchValue) ||
            entry.correlationId
              .toLowerCase()
              .includes(searchValue) ||
            entry.transactionId
              ?.toLowerCase()
              .includes(searchValue) ||
            entry.description
              ?.toLowerCase()
              .includes(searchValue);

          const matchesAccount =
            accountFilter === "ALL" ||
            entry.accountType ===
              accountFilter;

          const matchesTransaction =
            transactionFilter === "ALL" ||
            entry.transactionType ===
              transactionFilter;

          const matchesStatus =
            statusFilter === "ALL" ||
            entry.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesAccount &&
            matchesTransaction &&
            matchesStatus
          );
        }
      );
    }, [
      entries,
      search,
      accountFilter,
      transactionFilter,
      statusFilter,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredEntries.length /
        pageSize
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const paginatedEntries =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        pageSize;

      return filteredEntries.slice(
        start,
        start + pageSize
      );
    }, [
      filteredEntries,
      safeCurrentPage,
      pageSize,
    ]);

  const totals =
    useMemo(() => {
      return filteredEntries.reduce(
        (result, entry) => {
          result.credit +=
            entry.creditPaise;

          result.debit +=
            entry.debitPaise;

          return result;
        },
        {
          credit: 0,
          debit: 0,
        }
      );
    }, [filteredEntries]);

  const clearFilters = () => {
    setSearch("");
    setAccountFilter("ALL");
    setTransactionFilter("ALL");
    setStatusFilter("ALL");
    setCurrentPage(1);
  };

  const hasFilters =
    search.length > 0 ||
    accountFilter !== "ALL" ||
    transactionFilter !== "ALL" ||
    statusFilter !== "ALL";

  return (
    <div
      className={`space-y-4 ${className}`}
    >
      {/* FILTER BAR */}

      {(showSearch ||
        showFilters) && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">

          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">

            {showSearch && (
              <div className="relative min-w-0 flex-1">

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                  placeholder="Search ledger ID, account ID, transaction ID..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>
            )}

            {showFilters && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 xl:w-auto">

                <select
                  value={accountFilter}
                  onChange={(event) => {
                    setAccountFilter(
                      event.target.value as
                        | LedgerAccountType
                        | "ALL"
                    );
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="ALL">
                    All Accounts
                  </option>

                  {Object.entries(
                    ACCOUNT_TYPE_CONFIG
                  ).map(
                    ([
                      value,
                      config,
                    ]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {config.label}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={
                    transactionFilter
                  }
                  onChange={(event) => {
                    setTransactionFilter(
                      event.target.value as
                        | LedgerTransactionType
                        | "ALL"
                    );
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="ALL">
                    All Transactions
                  </option>

                  {Object.entries(
                    TRANSACTION_TYPE_CONFIG
                  ).map(
                    ([
                      value,
                      config,
                    ]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {config.label}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value as
                        | LedgerEntryStatus
                        | "ALL"
                    );
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="ALL">
                    All Status
                  </option>

                  {Object.entries(
                    STATUS_CONFIG
                  ).map(
                    ([
                      value,
                      config,
                    ]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {config.label}
                      </option>
                    )
                  )}
                </select>

              </div>
            )}

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-600 transition hover:border-orange-200 hover:text-orange-600"
              >
                Clear
              </button>
            )}

          </div>

        </div>
      )}

      {/* SUMMARY */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

        <SummaryCard
          label="Entries"
          value={filteredEntries.length.toLocaleString(
            "en-IN"
          )}
        />

        <SummaryCard
          label="Total Credit"
          value={formatCurrency(
            totals.credit
          )}
          valueClassName="text-green-600"
        />

        <SummaryCard
          label="Total Debit"
          value={formatCurrency(
            totals.debit
          )}
          valueClassName="text-red-600"
        />

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1200px] border-collapse">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <TableHeader>
                  Ledger Entry
                </TableHeader>

                <TableHeader>
                  Account
                </TableHeader>

                <TableHeader>
                  Transaction
                </TableHeader>

                <TableHeader>
                  Credit
                </TableHeader>

                <TableHeader>
                  Debit
                </TableHeader>

                <TableHeader>
                  Net
                </TableHeader>

                <TableHeader>
                  Status
                </TableHeader>

                <TableHeader>
                  Created
                </TableHeader>

                <TableHeader align="right">
                  Action
                </TableHeader>

              </tr>
            </thead>

            <tbody>

              {loading ? (
                Array.from({
                  length: 6,
                }).map(
                  (_, index) => (
                    <LoadingRow
                      key={index}
                    />
                  )
                )
              ) : paginatedEntries.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-14 text-center"
                  >
                    <EmptyState
                      message={
                        emptyMessage
                      }
                    />
                  </td>
                </tr>
              ) : (
                paginatedEntries.map(
                  (entry) => (
                    <LedgerDesktopRow
                      key={
                        entry.ledgerEntryId
                      }
                      entry={entry}
                      onRowClick={
                        onRowClick
                      }
                      onViewDetails={
                        onViewDetails
                      }
                    />
                  )
                )
              )}

            </tbody>

          </table>

        </div>

        {/* MOBILE */}

        <div className="divide-y divide-slate-100 lg:hidden">

          {loading ? (
            Array.from({
              length: 5,
            }).map(
              (_, index) => (
                <MobileLoadingCard
                  key={index}
                />
              )
            )
          ) : paginatedEntries.length ===
            0 ? (
            <div className="px-5 py-14 text-center">
              <EmptyState
                message={
                  emptyMessage
                }
              />
            </div>
          ) : (
            paginatedEntries.map(
              (entry) => (
                <LedgerMobileCard
                  key={
                    entry.ledgerEntryId
                  }
                  entry={entry}
                  onRowClick={
                    onRowClick
                  }
                  onViewDetails={
                    onViewDetails
                  }
                />
              )
            )
          )}

        </div>

        {/* PAGINATION */}

        {showPagination &&
          !loading &&
          filteredEntries.length >
            0 && (
            <Pagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                filteredEntries.length
              }
              pageSize={pageSize}
              onPageChange={
                setCurrentPage
              }
            />
          )}

      </div>

      {/* GOVERNANCE */}

      <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">

        <p className="text-[9px] font-black uppercase tracking-wider text-orange-800">
          Ledger Governance
        </p>

        <p className="mt-1 text-[9px] leading-5 text-orange-700">
          Ledger entries are authoritative
          financial records. JUERP clients
          should display authorized ledger
          data but must not independently
          create, modify, reverse, settle, or
          reconcile financial entries.
          Financial writes must go through
          the trusted backend with
          authorization, correlation ID,
          idempotency protection, and audit
          logging.
        </p>

      </div>

    </div>
  );
}

function LedgerDesktopRow({
  entry,
  onRowClick,
  onViewDetails,
}: {
  entry: LedgerEntry;
  onRowClick?: (
    entry: LedgerEntry
  ) => void;
  onViewDetails?: (
    entry: LedgerEntry
  ) => void;
}) {
  const account =
    ACCOUNT_TYPE_CONFIG[
      entry.accountType
    ];

  const transaction =
    TRANSACTION_TYPE_CONFIG[
      entry.transactionType
    ];

  const status =
    STATUS_CONFIG[
      entry.status
    ];

  const netAmount =
    getNetAmount(entry);

  return (
    <tr
      onClick={() =>
        onRowClick?.(entry)
      }
      className={`border-b border-slate-100 transition last:border-b-0 ${
        onRowClick
          ? "cursor-pointer hover:bg-orange-50/40"
          : "hover:bg-slate-50/60"
      }`}
    >

      <td className="px-4 py-4">

        <div className="min-w-[170px]">

          <p className="font-mono text-[10px] font-bold text-slate-800">
            {entry.ledgerEntryId}
          </p>

          {entry.description && (
            <p className="mt-1 max-w-[200px] truncate text-[9px] text-slate-400">
              {entry.description}
            </p>
          )}

        </div>

      </td>

      <td className="px-4 py-4">

        <div className="space-y-1">

          <span
            className={`inline-flex rounded-full px-2 py-1 text-[8px] font-black ${account.background} ${account.text}`}
          >
            {account.label}
          </span>

          <div className="flex items-center gap-1">

            <span className="max-w-[130px] truncate font-mono text-[8px] text-slate-500">
              {entry.accountId}
            </span>

            <CopyButton
              value={
                entry.accountId
              }
            />

          </div>

        </div>

      </td>

      <td className="px-4 py-4">

        <div className="space-y-1">

          <span
            className={`inline-flex rounded-full px-2 py-1 text-[8px] font-black ${transaction.background} ${transaction.text}`}
          >
            {transaction.label}
          </span>

          {entry.transactionId && (
            <p className="max-w-[140px] truncate font-mono text-[8px] text-slate-400">
              {entry.transactionId}
            </p>
          )}

        </div>

      </td>

      <td className="px-4 py-4">

        <span className="inline-flex items-center gap-1 text-[10px] font-black text-green-600">
          <ArrowUpIcon />

          {formatCurrency(
            entry.creditPaise,
            entry.currency
          )}
        </span>

      </td>

      <td className="px-4 py-4">

        <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-600">
          <ArrowDownIcon />

          {formatCurrency(
            entry.debitPaise,
            entry.currency
          )}
        </span>

      </td>

      <td className="px-4 py-4">

        <span
          className={`text-[10px] font-black ${
            netAmount > 0
              ? "text-green-600"
              : netAmount < 0
              ? "text-red-600"
              : "text-slate-500"
          }`}
        >
          {netAmount > 0
            ? "+"
            : ""}
          {formatCurrency(
            netAmount,
            entry.currency
          )}
        </span>

      </td>

      <td className="px-4 py-4">

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[8px] font-black ${status.background} ${status.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
          />

          {status.label}
        </span>

      </td>

      <td className="whitespace-nowrap px-4 py-4">

        <span className="text-[9px] font-medium text-slate-500">
          {formatDate(
            entry.createdAt
          )}
        </span>

      </td>

      <td className="px-4 py-4 text-right">

        {onViewDetails && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails(entry);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <EyeIcon />
            View
          </button>
        )}

      </td>

    </tr>
  );
}

function LedgerMobileCard({
  entry,
  onRowClick,
  onViewDetails,
}: {
  entry: LedgerEntry;
  onRowClick?: (
    entry: LedgerEntry
  ) => void;
  onViewDetails?: (
    entry: LedgerEntry
  ) => void;
}) {
  const account =
    ACCOUNT_TYPE_CONFIG[
      entry.accountType
    ];

  const transaction =
    TRANSACTION_TYPE_CONFIG[
      entry.transactionType
    ];

  const status =
    STATUS_CONFIG[
      entry.status
    ];

  const netAmount =
    getNetAmount(entry);

  return (
    <div
      onClick={() =>
        onRowClick?.(entry)
      }
      className={`p-4 ${
        onRowClick
          ? "cursor-pointer active:bg-orange-50"
          : ""
      }`}
    >

      <div className="flex items-start justify-between gap-3">

        <div className="min-w-0">

          <p className="font-mono text-[10px] font-black text-slate-800">
            {entry.ledgerEntryId}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            {formatDate(
              entry.createdAt
            )}
          </p>

        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[8px] font-black ${status.background} ${status.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
          />

          {status.label}
        </span>

      </div>

      <div className="mt-3 flex flex-wrap gap-2">

        <span
          className={`rounded-full px-2 py-1 text-[8px] font-black ${account.background} ${account.text}`}
        >
          {account.label}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-[8px] font-black ${transaction.background} ${transaction.text}`}
        >
          {transaction.label}
        </span>

      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">

        <AmountBox
          label="Credit"
          amount={formatCurrency(
            entry.creditPaise,
            entry.currency
          )}
          className="text-green-600"
        />

        <AmountBox
          label="Debit"
          amount={formatCurrency(
            entry.debitPaise,
            entry.currency
          )}
          className="text-red-600"
        />

        <AmountBox
          label="Net"
          amount={`${
            netAmount > 0
              ? "+"
              : ""
          }${formatCurrency(
            netAmount,
            entry.currency
          )}`}
          className={
            netAmount > 0
              ? "text-green-600"
              : netAmount < 0
              ? "text-red-600"
              : "text-slate-600"
          }
        />

      </div>

      <div className="mt-3 rounded-xl bg-slate-50 p-3">

        <div className="flex items-center justify-between gap-3">

          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Account ID
          </span>

          <div className="flex min-w-0 items-center gap-1">

            <span className="max-w-[170px] truncate font-mono text-[8px] font-semibold text-slate-600">
              {entry.accountId}
            </span>

            <CopyButton
              value={
                entry.accountId
              }
            />

          </div>

        </div>

        {entry.transactionId && (
          <div className="mt-2 flex items-center justify-between gap-3">

            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
              Transaction
            </span>

            <span className="max-w-[170px] truncate font-mono text-[8px] font-semibold text-slate-600">
              {entry.transactionId}
            </span>

          </div>
        )}

      </div>

      <div className="mt-3 flex items-center justify-between gap-3">

        <div className="min-w-0">

          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Correlation ID
          </p>

          <p className="mt-1 max-w-[210px] truncate font-mono text-[8px] text-slate-500">
            {entry.correlationId}
          </p>

        </div>

        {onViewDetails && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails(entry);
            }}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
          >
            <EyeIcon />
            View
          </button>
        )}

      </div>

    </div>
  );
}

function AmountBox({
  label,
  amount,
  className,
}: {
  label: string;
  amount: string;
  className: string;
}) {
  return (
    <div className="rounded-lg border border-slate-100 bg-white p-2">

      <p className="text-[7px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 truncate text-[9px] font-black ${className}`}
      >
        {amount}
      </p>

    </div>
  );
}

function TableHeader({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right";
}) {
  return (
    <th
      className={`px-4 py-3 text-[8px] font-black uppercase tracking-wider text-slate-400 ${
        align === "right"
          ? "text-right"
          : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">

      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-black ${valueClassName}`}
      >
        {value}
      </p>

    </div>
  );
}

function LoadingRow() {
  return (
    <tr className="border-b border-slate-100">

      {Array.from({
        length: 9,
      }).map((_, index) => (
        <td
          key={index}
          className="px-4 py-4"
        >
          <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
        </td>
      ))}

    </tr>
  );
}

function MobileLoadingCard() {
  return (
    <div className="space-y-3 p-4">

      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />

      <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />

      <div className="grid grid-cols-3 gap-2">

        {Array.from({
          length: 3,
        }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded-xl bg-slate-100"
          />
        ))}

      </div>

    </div>
  );
}

function EmptyState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16v14H4z"
          />

          <path
            strokeLinecap="round"
            d="M8 6V4h8v2"
          />

          <path
            strokeLinecap="round"
            d="M8 11h8M8 15h5"
          />
        </svg>
      </div>

      <p className="mt-3 text-xs font-bold text-slate-600">
        {message}
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        Try changing the search or filters.
      </p>

    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (
    page: number
  ) => void;
}) {
  const start =
    (currentPage - 1) *
      pageSize +
    1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

      <p className="text-[9px] font-medium text-slate-500">
        Showing{" "}
        <span className="font-bold text-slate-700">
          {start}
        </span>{" "}
        to{" "}
        <span className="font-bold text-slate-700">
          {end}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-700">
          {totalItems}
        </span>{" "}
        entries
      </p>

      <div className="flex items-center gap-1">

        <button
          type="button"
          disabled={
            currentPage === 1
          }
          onClick={() =>
            onPageChange(
              currentPage - 1
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronIcon
            direction="left"
          />
        </button>

        <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-orange-500 px-2 text-[9px] font-black text-white">
          {currentPage}
        </span>

        <span className="px-1 text-[9px] font-medium text-slate-400">
          /
        </span>

        <span className="text-[9px] font-bold text-slate-600">
          {totalPages}
        </span>

        <button
          type="button"
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            onPageChange(
              currentPage + 1
            )
          }
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronIcon
            direction="right"
          />
        </button>

      </div>

    </div>
  );
}