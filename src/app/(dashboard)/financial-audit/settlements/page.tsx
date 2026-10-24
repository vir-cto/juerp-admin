"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFinancialAudit } from "@/hooks/useFinancialAudit";

type SettlementStatus =
  | "PENDING"
  | "CALCULATED"
  | "APPROVED"
  | "PAID"
  | "HELD"
  | "FAILED"
  | "CANCELLED";

type SettlementRow = {
  id: string;
  settlementId: string;
  beneficiaryType: string;
  beneficiaryId: string;
  beneficiaryName: string;
  moduleId: string;
  amountPaise: number;
  status: SettlementStatus;
  periodLabel: string;
  referenceId: string;
  correlationId: string;
  createdAt: string;
  description: string;
};

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function str(v: unknown, fallback = "—"): string {
  if (typeof v === "string" && v.trim()) return v.trim();
  if (typeof v === "number") return String(v);
  return fallback;
}

function num(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function dateLabel(v: unknown): string {
  if (typeof v === "string" && v.trim()) {
    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return v.trim();
  }
  if (v && typeof v === "object" && "toDate" in v) {
    try {
      return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  }
  return "—";
}

function asStatus(v: unknown): SettlementStatus {
  const s = String(v ?? "PENDING").toUpperCase();
  const allowed: SettlementStatus[] = [
    "PENDING",
    "CALCULATED",
    "APPROVED",
    "PAID",
    "HELD",
    "FAILED",
    "CANCELLED",
  ];
  return (allowed as string[]).includes(s) ? (s as SettlementStatus) : "PENDING";
}

function mapSettlement(
  raw: Record<string, unknown> & { id: string }
): SettlementRow {
  return {
    id: raw.id,
    settlementId: str(raw.settlementId ?? raw.id, raw.id),
    beneficiaryType: str(
      raw.beneficiaryType ?? raw.partyType ?? raw.accountType,
      "VENDOR"
    ).toUpperCase(),
    beneficiaryId: str(
      raw.beneficiaryId ?? raw.vendorId ?? raw.captainId ?? raw.accountId,
      "—"
    ),
    beneficiaryName: str(
      raw.beneficiaryName ?? raw.vendorName ?? raw.captainName ?? raw.accountName,
      "—"
    ),
    moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
    amountPaise: num(
      raw.amountPaise ?? raw.totalPaise ?? raw.netPaise ?? raw.amount
    ),
    status: asStatus(raw.status),
    periodLabel: str(
      raw.periodLabel ?? raw.period ?? raw.settlementPeriod,
      "—"
    ),
    referenceId: str(raw.referenceId ?? raw.orderId ?? raw.rideId, "—"),
    correlationId: str(raw.correlationId, "—"),
    createdAt: dateLabel(raw.createdAt ?? raw.updatedAt),
    description: str(
      raw.description,
      `Settlement ${str(raw.settlementId ?? raw.id)}`
    ),
  };
}

function getStatusClasses(status: SettlementStatus) {
  switch (status) {
    case "PAID":
    case "APPROVED":
      return "bg-green-100 text-green-700";
    case "CALCULATED":
      return "bg-blue-100 text-blue-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "HELD":
      return "bg-orange-100 text-orange-700";
    case "FAILED":
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function SettlementsPage() {
  const { settlementDocs, loading, error, refresh } = useFinancialAudit();

  const settlements = useMemo(
    () => settlementDocs.map(mapSettlement),
    [settlementDocs]
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | SettlementStatus>(
    "ALL"
  );
  const [selected, setSelected] = useState<SettlementRow | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return settlements.filter((s) => {
      const matchesSearch =
        !q ||
        s.settlementId.toLowerCase().includes(q) ||
        s.beneficiaryId.toLowerCase().includes(q) ||
        s.beneficiaryName.toLowerCase().includes(q) ||
        s.referenceId.toLowerCase().includes(q) ||
        s.correlationId.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "ALL" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [settlements, search, statusFilter]);

  const totalAmount = settlements.reduce((t, s) => t + s.amountPaise, 0);
  const pendingCount = settlements.filter((s) => s.status === "PENDING").length;
  const paidCount = settlements.filter((s) => s.status === "PAID").length;
  const heldCount = settlements.filter((s) => s.status === "HELD").length;

  function openDetails(row: SettlementRow) {
    setSelected(row);
    setShowDetails(true);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/financial-audit"
          className="text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          Financial Audit
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-sm font-medium text-slate-800">Settlements</span>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Settlements
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Live settlement records from Firestore. Amounts are authoritative
            backend values — this screen is monitoring only.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs text-slate-500">Settlements</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {settlements.length}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Amount"
          value={formatCurrency(totalAmount)}
          description="All settlements"
        />
        <SummaryCard
          title="Pending"
          value={String(pendingCount)}
          description="Awaiting workflow"
        />
        <SummaryCard
          title="Paid"
          value={String(paidCount)}
          description="Completed payouts"
        />
        <SummaryCard
          title="Held"
          value={String(heldCount)}
          description="On hold / review"
        />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Settlement ID, beneficiary, reference..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | SettlementStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CALCULATED">Calculated</option>
              <option value="APPROVED">Approved</option>
              <option value="PAID">Paid</option>
              <option value="HELD">Held</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">
            {settlements.length}
          </span>{" "}
          settlements
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Settlement
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Beneficiary
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Module
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Amount
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Period
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {row.settlementId}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {row.referenceId}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-slate-800">
                      {row.beneficiaryType}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {row.beneficiaryId}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {row.beneficiaryName}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-700">
                      {row.moduleId}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {formatCurrency(row.amountPaise)}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-600">
                    {row.periodLabel}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => openDetails(row)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && <EmptyState />}
        {loading && settlements.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading settlements from Firestore…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filtered.map((row) => (
          <div key={row.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {row.settlementId}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {row.beneficiaryName}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(row.status)}`}
              >
                {row.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-slate-400">Amount</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {formatCurrency(row.amountPaise)}
                </p>
              </div>
              <div>
                <p className="text-slate-400">Module</p>
                <p className="mt-1 font-semibold text-slate-800">
                  {row.moduleId}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openDetails(row)}
              className="mt-4 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700"
            >
              View Details
            </button>
          </div>
        ))}
        {!loading && filtered.length === 0 && <EmptyState />}
      </div>

      {showDetails && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Settlement Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selected.settlementId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-4 p-6">
              <DetailItem label="Status" value={selected.status} />
              <DetailItem label="Amount" value={formatCurrency(selected.amountPaise)} />
              <DetailItem label="Beneficiary Type" value={selected.beneficiaryType} />
              <DetailItem label="Beneficiary ID" value={selected.beneficiaryId} />
              <DetailItem label="Beneficiary Name" value={selected.beneficiaryName} />
              <DetailItem label="Module" value={selected.moduleId} />
              <DetailItem label="Period" value={selected.periodLabel} />
              <DetailItem label="Reference" value={selected.referenceId} />
              <DetailItem label="Correlation ID" value={selected.correlationId} />
              <DetailItem label="Created" value={selected.createdAt} />
              <DetailItem label="Description" value={selected.description} />
            </div>
            <div className="border-t border-slate-200 p-6">
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">
          Financial Governance
        </h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          Settlement amounts are calculated by the trusted backend using ERP
          rules. This page only displays Firestore settlement documents and must
          not recompute commissions, payouts, or tax.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
        ⌁
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">
        No settlements found
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Empty <code className="text-xs">settlements</code> collection or filters
        too narrow.
      </p>
    </div>
  );
}