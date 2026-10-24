"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useJuStayBookings from "@/hooks/useJuStayBookings";
import {
  JUSTAY_SERVICES,
  type JuStayServiceId,
} from "@/lib/constants/modules";

function formatPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function JuStayBookingsPage() {
  const { bookings, summary, loading, error, refresh } = useJuStayBookings();
  const [search, setSearch] = useState("");
  const [service, setService] = useState<"ALL" | JuStayServiceId>("ALL");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchQ =
        !q ||
        b.bookingId.toLowerCase().includes(q) ||
        b.vendorId.toLowerCase().includes(q) ||
        b.userId.toLowerCase().includes(q);
      const matchS = service === "ALL" || b.service === service;
      const matchSt = status === "ALL" || b.status === status;
      return matchQ && matchS && matchSt;
    });
  }, [bookings, search, service, status]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link href="/modules/justay" className="text-xs font-semibold text-purple-600">
            ← JuStay
          </Link>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            JuStay Bookings
          </h1>
          <p className="text-sm text-slate-500">
            collection <code>bookings</code> · module JUSTAY · {summary.total} rows
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
          placeholder="Search booking / vendor / user…"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          value={service}
          onChange={(e) =>
            setService(e.target.value as "ALL" | JuStayServiceId)
          }
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">All services</option>
          {JUSTAY_SERVICES.map((s) => (
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
            "CREATED",
            "PAYMENT_PENDING",
            "ADVANCE_PAID",
            "CONFIRMED",
            "CHECKED_IN",
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
          <table className="w-full min-w-[1000px] text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Booking</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Advance / Remaining</th>
                <th className="px-4 py-3">Check-in</th>
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
                    <span className="rounded-md bg-purple-50 px-2 py-1 text-[10px] font-bold text-purple-700">
                      {b.service}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold">{b.status}</td>
                  <td className="px-4 py-3 text-xs">
                    <p>{formatPaise(b.advancePaise)} paid</p>
                    <p className="text-slate-400">
                      {formatPaise(b.remainingPaise)} left
                    </p>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {b.checkInLabel}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/modules/justay/bookings/${b.id}`}
                      className="text-xs font-bold text-purple-600"
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
            No JuStay bookings. Ensure <code>bookings.moduleId</code> ={" "}
            <code>JUSTAY</code> or service is HOTELS / HOSTEL_PG / HALLS / TOURISM.
          </p>
        )}
      </div>
    </div>
  );
}