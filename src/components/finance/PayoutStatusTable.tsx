"use client";

import {
  ReactNode,
  useMemo,
  useState,
} from "react";

export type PayoutStatus =
  | "PENDING"
  | "PROCESSING"
  | "PAID"
  | "FAILED"
  | "HELD";

export type PayoutPartyType =
  | "VENDOR"
  | "CAPTAIN"
  | "PLATFORM";

export interface PayoutRecord {
  payoutId: string;

  settlementId?: string;

  partyType: PayoutPartyType;

  partyId: string;

  partyName: string;

  amountPaise: number;

  currency: string;

  status: PayoutStatus;

  periodStart: string;

  periodEnd: string;

  requestedAt: string;

  processedAt?: string;

  failureReason?: string;

  correlationId: string;
}

interface PayoutStatusTableProps {
  payouts: PayoutRecord[];

  loading?: boolean;

  onRowClick?: (
    payout: PayoutRecord
  ) => void;

  onViewDetails?: (
    payout: PayoutRecord
  ) => void;

  showSearch?: boolean;

  showFilters?: boolean;

  showPagination?: boolean;

  pageSize?: number;

  emptyMessage?: string;

  className?: string;
}

const STATUS_CONFIG: Record<
  PayoutStatus,
  {
    label: string;
    background: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  PENDING: {
    label: "Pending",
    background: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  PROCESSING: {
    label: "Processing",
    background: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },

  PAID: {
    label: "Paid",
    background: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },

  FAILED: {
    label: "Failed",
    background: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },

  HELD: {
    label: "Held",
    background: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

const PARTY_CONFIG: Record<
  PayoutPartyType,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
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

function formatPeriod(
  start: string,
  end: string
): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return `${start} - ${end}`;
  }

  const formatter =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  return `${formatter.format(
    startDate
  )} - ${formatter.format(endDate)}`;
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
      // Clipboard access may be blocked.
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

function WalletIcon() {
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
        d="M4 6.5A2.5 2.5 0 016.5 4H19a1 1 0 011 1v14a1 1 0 01-1 1H6.5A2.5 2.5 0 014 17.5v-11z"
      />

      <path
        strokeLinecap="round"
        d="M4 8h15"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 13h4"
      />
    </svg>
  );
}

export default function PayoutStatusTable({
  payouts,
  loading = false,
  onRowClick,
  onViewDetails,
  showSearch = true,
  showFilters = true,
  showPagination = true,
  pageSize = 10,
  emptyMessage = "No payout records found.",
  className = "",
}: PayoutStatusTableProps) {
  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<PayoutStatus | "ALL">(
    "ALL"
  );

  const [
    partyFilter,
    setPartyFilter,
  ] = useState<
    PayoutPartyType | "ALL"
  >("ALL");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const filteredPayouts =
    useMemo(() => {
      const searchValue =
        search.trim().toLowerCase();

      return payouts.filter(
        (payout) => {
          const matchesSearch =
            !searchValue ||
            payout.payoutId
              .toLowerCase()
              .includes(searchValue) ||
            payout.partyId
              .toLowerCase()
              .includes(searchValue) ||
            payout.partyName
              .toLowerCase()
              .includes(searchValue) ||
            payout.settlementId
              ?.toLowerCase()
              .includes(searchValue) ||
            payout.correlationId
              .toLowerCase()
              .includes(searchValue);

          const matchesStatus =
            statusFilter === "ALL" ||
            payout.status ===
              statusFilter;

          const matchesParty =
            partyFilter === "ALL" ||
            payout.partyType ===
              partyFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesParty
          );
        }
      );
    }, [
      payouts,
      search,
      statusFilter,
      partyFilter,
    ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPayouts.length /
        pageSize
    )
  );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const paginatedPayouts =
    useMemo(() => {
      const start =
        (safeCurrentPage - 1) *
        pageSize;

      return filteredPayouts.slice(
        start,
        start + pageSize
      );
    }, [
      filteredPayouts,
      safeCurrentPage,
      pageSize,
    ]);

  const summary = useMemo(() => {
    return filteredPayouts.reduce(
      (result, payout) => {
        result.total +=
          payout.amountPaise;

        if (
          payout.status ===
          "PAID"
        ) {
          result.paid +=
            payout.amountPaise;
        }

        if (
          payout.status ===
            "PENDING" ||
          payout.status ===
            "PROCESSING"
        ) {
          result.pending +=
            payout.amountPaise;
        }

        if (
          payout.status ===
            "FAILED" ||
          payout.status ===
            "HELD"
        ) {
          result.exceptions +=
            payout.amountPaise;
        }

        return result;
      },
      {
        total: 0,
        paid: 0,
        pending: 0,
        exceptions: 0,
      }
    );
  }, [filteredPayouts]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setPartyFilter("ALL");
    setCurrentPage(1);
  };

  const hasFilters =
    search.length > 0 ||
    statusFilter !== "ALL" ||
    partyFilter !== "ALL";

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
              <div className="min-w-0 flex-1">

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value
                    );
                    setCurrentPage(1);
                  }}
                  placeholder="Search payout ID, party, settlement ID..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
                />

              </div>
            )}

            {showFilters && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value as
                        | PayoutStatus
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

                <select
                  value={partyFilter}
                  onChange={(event) => {
                    setPartyFilter(
                      event.target.value as
                        | PayoutPartyType
                        | "ALL"
                    );
                    setCurrentPage(1);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >
                  <option value="ALL">
                    All Parties
                  </option>

                  {Object.entries(
                    PARTY_CONFIG
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

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          label="Total Payouts"
          value={formatCurrency(
            summary.total
          )}
          icon={<WalletIcon />}
        />

        <SummaryCard
          label="Paid"
          value={formatCurrency(
            summary.paid
          )}
          valueClassName="text-green-600"
        />

        <SummaryCard
          label="Pending"
          value={formatCurrency(
            summary.pending
          )}
          valueClassName="text-amber-600"
        />

        <SummaryCard
          label="Exceptions"
          value={formatCurrency(
            summary.exceptions
          )}
          valueClassName="text-red-600"
        />

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">

        {/* DESKTOP */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full min-w-[1250px] border-collapse">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <TableHeader>
                  Payout
                </TableHeader>

                <TableHeader>
                  Party
                </TableHeader>

                <TableHeader>
                  Settlement Period
                </TableHeader>

                <TableHeader>
                  Amount
                </TableHeader>

                <TableHeader>
                  Status
                </TableHeader>

                <TableHeader>
                  Requested
                </TableHeader>

                <TableHeader>
                  Processed
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
              ) : paginatedPayouts.length ===
                0 ? (
                <tr>
                  <td
                    colSpan={8}
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
                paginatedPayouts.map(
                  (payout) => (
                    <PayoutDesktopRow
                      key={
                        payout.payoutId
                      }
                      payout={payout}
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
          ) : paginatedPayouts.length ===
            0 ? (
            <div className="px-5 py-14 text-center">
              <EmptyState
                message={
                  emptyMessage
                }
              />
            </div>
          ) : (
            paginatedPayouts.map(
              (payout) => (
                <PayoutMobileCard
                  key={
                    payout.payoutId
                  }
                  payout={payout}
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
          filteredPayouts.length >
            0 && (
            <Pagination
              currentPage={
                safeCurrentPage
              }
              totalPages={
                totalPages
              }
              totalItems={
                filteredPayouts.length
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
          Payout Governance
        </p>

        <p className="mt-1 text-[9px] leading-5 text-orange-700">
          Payout status is authoritative
          financial information. JUERP clients
          may display payout state, but payout
          approval, processing, failure
          handling, retry, and completion must
          be performed by the trusted backend
          and settlement workflow. The browser
          must not independently mark a payout
          as paid.
        </p>

      </div>

    </div>
  );
}

function PayoutDesktopRow({
  payout,
  onRowClick,
  onViewDetails,
}: {
  payout: PayoutRecord;
  onRowClick?: (
    payout: PayoutRecord
  ) => void;
  onViewDetails?: (
    payout: PayoutRecord
  ) => void;
}) {
  const status =
    STATUS_CONFIG[
      payout.status
    ];

  const party =
    PARTY_CONFIG[
      payout.partyType
    ];

  return (
    <tr
      onClick={() =>
        onRowClick?.(payout)
      }
      className={`border-b border-slate-100 transition last:border-b-0 ${
        onRowClick
          ? "cursor-pointer hover:bg-orange-50/40"
          : "hover:bg-slate-50/60"
      }`}
    >

      <td className="px-4 py-4">

        <div className="min-w-[180px]">

          <p className="font-mono text-[10px] font-black text-slate-800">
            {payout.payoutId}
          </p>

          {payout.settlementId && (
            <div className="mt-1 flex items-center gap-1">

              <span className="max-w-[130px] truncate font-mono text-[8px] text-slate-400">
                {payout.settlementId}
              </span>

              <CopyButton
                value={
                  payout.settlementId
                }
              />

            </div>
          )}

        </div>

      </td>

      <td className="px-4 py-4">

        <div className="min-w-[180px]">

          <span
            className={`inline-flex rounded-full px-2 py-1 text-[8px] font-black ${party.background} ${party.text}`}
          >
            {party.label}
          </span>

          <p className="mt-1 text-[10px] font-bold text-slate-700">
            {payout.partyName}
          </p>

          <p className="mt-0.5 font-mono text-[8px] text-slate-400">
            {payout.partyId}
          </p>

        </div>

      </td>

      <td className="px-4 py-4">

        <span className="whitespace-nowrap text-[9px] font-medium text-slate-500">
          {formatPeriod(
            payout.periodStart,
            payout.periodEnd
          )}
        </span>

      </td>

      <td className="px-4 py-4">

        <span className="text-[11px] font-black text-slate-900">
          {formatCurrency(
            payout.amountPaise,
            payout.currency
          )}
        </span>

      </td>

      <td className="px-4 py-4">

        <div className="space-y-1">

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[8px] font-black ${status.background} ${status.text}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
            />

            {status.label}
          </span>

          {payout.failureReason && (
            <p className="max-w-[150px] truncate text-[8px] font-medium text-red-500">
              {payout.failureReason}
            </p>
          )}

        </div>

      </td>

      <td className="whitespace-nowrap px-4 py-4">

        <span className="text-[9px] text-slate-500">
          {formatDate(
            payout.requestedAt
          )}
        </span>

      </td>

      <td className="whitespace-nowrap px-4 py-4">

        <span className="text-[9px] text-slate-500">
          {formatDate(
            payout.processedAt
          )}
        </span>

      </td>

      <td className="px-4 py-4 text-right">

        {onViewDetails && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails(payout);
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

function PayoutMobileCard({
  payout,
  onRowClick,
  onViewDetails,
}: {
  payout: PayoutRecord;
  onRowClick?: (
    payout: PayoutRecord
  ) => void;
  onViewDetails?: (
    payout: PayoutRecord
  ) => void;
}) {
  const status =
    STATUS_CONFIG[
      payout.status
    ];

  const party =
    PARTY_CONFIG[
      payout.partyType
    ];

  return (
    <div
      onClick={() =>
        onRowClick?.(payout)
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
            {payout.payoutId}
          </p>

          <p className="mt-1 text-[9px] text-slate-400">
            {formatDate(
              payout.requestedAt
            )}
          </p>

        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[8px] font-black ${status.background} ${status.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
          />

          {status.label}
        </span>

      </div>

      <div className="mt-3 flex items-center justify-between gap-3">

        <div>

          <span
            className={`inline-flex rounded-full px-2 py-1 text-[8px] font-black ${party.background} ${party.text}`}
          >
            {party.label}
          </span>

          <p className="mt-1 text-[10px] font-bold text-slate-700">
            {payout.partyName}
          </p>

        </div>

        <p className="text-base font-black text-slate-900">
          {formatCurrency(
            payout.amountPaise,
            payout.currency
          )}
        </p>

      </div>

      <div className="mt-4 rounded-xl bg-slate-50 p-3">

        <div className="flex items-center justify-between gap-3">

          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Party ID
          </span>

          <div className="flex min-w-0 items-center gap-1">

            <span className="max-w-[170px] truncate font-mono text-[8px] font-semibold text-slate-600">
              {payout.partyId}
            </span>

            <CopyButton
              value={
                payout.partyId
              }
            />

          </div>

        </div>

        {payout.settlementId && (
          <div className="mt-2 flex items-center justify-between gap-3">

            <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
              Settlement
            </span>

            <span className="max-w-[170px] truncate font-mono text-[8px] font-semibold text-slate-600">
              {payout.settlementId}
            </span>

          </div>
        )}

        <div className="mt-2 flex flex-col gap-1">

          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Settlement Period
          </span>

          <span className="text-[9px] font-semibold text-slate-600">
            {formatPeriod(
              payout.periodStart,
              payout.periodEnd
            )}
          </span>

        </div>

      </div>

      {payout.failureReason && (
        <div className="mt-3 rounded-xl border border-red-100 bg-red-50 p-3">

          <p className="text-[8px] font-black uppercase tracking-wider text-red-500">
            Failure Reason
          </p>

          <p className="mt-1 text-[9px] leading-4 text-red-700">
            {payout.failureReason}
          </p>

        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-3">

        <div className="min-w-0">

          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
            Correlation ID
          </p>

          <p className="mt-1 max-w-[200px] truncate font-mono text-[8px] text-slate-500">
            {payout.correlationId}
          </p>

        </div>

        {onViewDetails && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onViewDetails(payout);
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

function SummaryCard({
  label,
  value,
  valueClassName = "text-slate-900",
  icon,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">

      <div className="flex items-center justify-between gap-2">

        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        {icon && (
          <span className="text-slate-400">
            {icon}
          </span>
        )}

      </div>

      <p
        className={`mt-2 text-lg font-black ${valueClassName}`}
      >
        {value}
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

function LoadingRow() {
  return (
    <tr className="border-b border-slate-100">

      {Array.from({
        length: 8,
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

      <div className="h-12 animate-pulse rounded-xl bg-slate-100" />

      <div className="h-16 animate-pulse rounded-xl bg-slate-100" />

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
        <WalletIcon />
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
        payouts
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