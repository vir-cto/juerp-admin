"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useJuHomeBookings from "@/hooks/useJuHomeBookings";

function formatPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function JuHomeBookingsPage() {
  const { bookings, summary, loading, error, refresh } = useJuHomeBookings();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchQ =
        !q ||
        b.bookingId.toLowerCase().includes(q) ||
        b.vendorId.toLowerCase().includes(q) ||
        b.userId.toLowerCase().includes(q) ||
        b.service.toLowerCase().includes(q);
      const matchSt = status === "ALL" || b.status === status;
      return matchQ && matchSt;
    });
  }, [bookings, search, status]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link href="/modules/juhome" className="text-xs font-semibold text-green-700">
            ← JuHome
          </Link>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            JuHome Bookings
          </h1>
          <p className="text-sm text-slate-500">
            <code>bookings</code> where moduleId = JUHOME · {summary.total} rows
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

      <div className="mb-4 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search booking / vendor / service…"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          {[
            "CREATED",
            "PAYMENT_PENDING",
            "CONFIRMED",
            "ASSIGNED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
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
                <th className="px-4 py-3">Booking</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Scheduled</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{b.bookingId}</p>
                    <p className="text-[10px] text-slate-400">
                      {b.vendorId || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700">
                      {b.service}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold">{b.status}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatPaise(b.totalPaise)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {b.scheduledLabel}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/modules/juhome/bookings/${b.id}`}
                      className="text-xs font-bold text-green-700"
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
            No JuHome bookings. Set <code>moduleId: &quot;JUHOME&quot;</code> on
            booking docs.
          </p>
        )}
      </div>
    </div>
  );
}