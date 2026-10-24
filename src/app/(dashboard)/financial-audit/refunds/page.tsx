"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFinancialAudit } from "@/hooks/useFinancialAudit";

type RefundStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REVIEW";

type RefundRow = {
  id: string;
  refundId: string;
  paymentId: string;
  orderId: string;
  customerId: string;
  moduleId: string;
  amountPaise: number;
  status: RefundStatus;
  reason: string;
  correlationId: string;
  createdAt: string;
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

function asStatus(v: unknown): RefundStatus {
  const s = String(v ?? "PENDING").toUpperCase();
  const allowed: RefundStatus[] = [
    "PENDING",
    "PROCESSING",
    "COMPLETED",
    "FAILED",
    "CANCELLED",
    "REVIEW",
  ];
  return (allowed as string[]).includes(s) ? (s as RefundStatus) : "PENDING";
}

function mapRefund(
  raw: Record<string, unknown> & { id: string }
): RefundRow {
  return {
    id: raw.id,
    refundId: str(raw.refundId ?? raw.id, raw.id),
    paymentId: str(raw.paymentId, "—"),
    orderId: str(raw.orderId ?? raw.entityId ?? raw.referenceId, "—"),
    customerId: str(raw.customerId ?? raw.userId, "—"),
    moduleId: str(raw.moduleId ?? raw.module, "JUCART").toUpperCase(),
    amountPaise: num(raw.amountPaise ?? raw.amount),
    status: asStatus(raw.status),
    reason: str(raw.reason ?? raw.description, "—"),
    correlationId: str(raw.correlationId, "—"),
    createdAt: dateLabel(raw.createdAt),
  };
}

function getStatusClasses(status: RefundStatus) {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-700";
    case "PROCESSING":
      return "bg-blue-100 text-blue-700";
    case "PENDING":
    case "REVIEW":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
    case "CANCELLED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function RefundsPage() {
  const { refundDocs, loading, error, refresh } = useFinancialAudit();

  const refunds = useMemo(() => refundDocs.map(mapRefund), [refundDocs]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | RefundStatus>("ALL");
  const [selected, setSelected] = useState<RefundRow | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return refunds.filter((r) => {
      const matchesSearch =
        !q ||
        r.refundId.toLowerCase().includes(q) ||
        r.paymentId.toLowerCase().includes(q) ||
        r.orderId.toLowerCase().includes(q) ||
        r.customerId.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "ALL" || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [refunds, search, statusFilter]);

  const totalAmount = refunds.reduce((t, r) => t + r.amountPaise, 0);
  const pendingCount = refunds.filter(
    (r) => r.status === "PENDING" || r.status === "REVIEW"
  ).length;
  const completedCount = refunds.filter(
    (r) => r.status === "COMPLETED"
  ).length;
  const failedCount = refunds.filter((r) => r.status === "FAILED").length;

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
        <span className="text-sm font-medium text-slate-800">Refunds</span>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Refunds
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Live refund records from Firestore. Refund amounts are backend-
            authoritative.
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
            <p className="text-xs text-slate-500">Refunds</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {refunds.length}
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
        <SummaryCard title="Total Amount" value={formatCurrency(totalAmount)} description="All refunds" />
        <SummaryCard title="Pending / Review" value={String(pendingCount)} description="Need attention" />
        <SummaryCard title="Completed" value={String(completedCount)} description="Successfully refunded" />
        <SummaryCard title="Failed" value={String(failedCount)} description="Failed attempts" />
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
              placeholder="Refund ID, payment, order, customer..."
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
                setStatusFilter(e.target.value as "ALL" | RefundStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REVIEW">Review</option>
            </select>
          </div>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-800">{filtered.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-800">{refunds.length}</span>{" "}
          refunds
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Refund</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Payment / Order</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Customer</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Amount</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Module</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{row.refundId}</p>
                    <p className="mt-1 text-xs text-slate-400">{row.createdAt}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-slate-800">{row.paymentId}</p>
                    <p className="mt-1 text-xs text-slate-400">{row.orderId}</p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-700">{row.customerId}</td>
                  <td className="px-5 py-4 text-sm font-bold text-slate-900">
                    {formatCurrency(row.amountPaise)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-700">
                      {row.moduleId}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(row);
                          setShowDetails(true);
                        }}
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
        {loading && refunds.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading refunds from Firestore…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filtered.map((row) => (
          <div key={row.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{row.refundId}</p>
                <p className="mt-1 text-xs text-slate-500">{row.paymentId}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(row.status)}`}>
                {row.status}
              </span>
            </div>
            <p className="mt-3 text-sm font-bold text-slate-900">
              {formatCurrency(row.amountPaise)}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelected(row);
                setShowDetails(true);
              }}
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
                <h2 className="text-lg font-bold text-slate-900">Refund Details</h2>
                <p className="mt-1 text-xs text-slate-500">{selected.refundId}</p>
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
              <DetailItem label="Payment ID" value={selected.paymentId} />
              <DetailItem label="Order / Entity" value={selected.orderId} />
              <DetailItem label="Customer" value={selected.customerId} />
              <DetailItem label="Module" value={selected.moduleId} />
              <DetailItem label="Reason" value={selected.reason} />
              <DetailItem label="Correlation ID" value={selected.correlationId} />
              <DetailItem label="Created" value={selected.createdAt} />
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
          Refund execution is controlled by the trusted backend and payment
          gateway. This page only monitors Firestore refund documents.
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
        ↩
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">
        No refunds found
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Empty <code className="text-xs">refunds</code> collection or filters too
        narrow.
      </p>
    </div>
  );
}