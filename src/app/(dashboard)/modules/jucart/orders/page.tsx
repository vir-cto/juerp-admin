"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useJuCartOrders from "@/hooks/useJuCartOrders";
import { JUCART_SERVICES, type JuCartServiceId } from "@/lib/constants/modules";

function formatPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function JuCartOrdersPage() {
  const { orders, summary, loading, error, refresh } = useJuCartOrders();
  const [search, setSearch] = useState("");
  const [service, setService] = useState<"ALL" | JuCartServiceId>("ALL");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const matchQ =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        o.vendorId.toLowerCase().includes(q) ||
        o.userId.toLowerCase().includes(q);
      const matchS = service === "ALL" || o.service === service;
      const matchSt = status === "ALL" || o.status === status;
      return matchQ && matchS && matchSt;
    });
  }, [orders, search, service, status]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link href="/modules/jucart" className="text-xs font-semibold text-orange-600">
            ← JuCart
          </Link>
          <h1 className="mt-1 text-2xl font-black text-slate-900">JuCart Orders</h1>
          <p className="text-sm text-slate-500">
            module = JUCART · {summary.total} rows loaded
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order / vendor / user…"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          value={service}
          onChange={(e) => setService(e.target.value as "ALL" | JuCartServiceId)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">All services</option>
          {JUCART_SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          {[
            "PAYMENT_PENDING",
            "PAID",
            "ACCEPTED",
            "PREPARING",
            "READY",
            "ASSIGNED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "SETTLED",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{o.orderId}</p>
                    <p className="text-[10px] text-slate-400">{o.vendorId || "—"}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-700">
                      {o.service}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold">{o.status}</td>
                  <td className="px-4 py-3 text-xs">{o.paymentStatus}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatPaise(o.totalPaise)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {o.createdAtLabel}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/modules/jucart/orders/${o.id}`}
                      className="text-xs font-bold text-orange-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <p className="py-12 text-center text-sm text-slate-500">
            No JuCart orders found. Ensure <code>orders.moduleId</code> or{" "}
            <code>module</code> is <code>JUCART</code>.
          </p>
        )}
      </div>
    </div>
  );
}