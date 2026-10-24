"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useJuRideRides from "@/hooks/useJuRideRides";

function formatPaise(paise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export default function JuRideRidesPage() {
  const { rides, summary, loading, error, refresh } = useJuRideRides();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rides.filter((r) => {
      const matchQ =
        !q ||
        r.rideId.toLowerCase().includes(q) ||
        r.captainId.toLowerCase().includes(q) ||
        r.userId.toLowerCase().includes(q);
      const matchSt = status === "ALL" || r.status === status;
      return matchQ && matchSt;
    });
  }, [rides, search, status]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/modules/juride"
            className="text-xs font-semibold text-blue-600"
          >
            ← JuRide
          </Link>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            JuRide Rides
          </h1>
          <p className="text-sm text-slate-500">
            <code>rides</code> · {summary.total} rows · {summary.active} active
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
          placeholder="Search ride / captain / user…"
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="ALL">All statuses</option>
          {[
            "REQUESTED",
            "SEARCHING_CAPTAIN",
            "ASSIGNED",
            "ACCEPTED",
            "ARRIVING",
            "ARRIVED",
            "STARTED",
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
          <table className="w-full min-w-[960px] text-left">
            <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Ride</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Pickup → Drop</th>
                <th className="px-4 py-3">Fare</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{r.rideId}</p>
                    <p className="text-[10px] text-slate-400">
                      {r.captainId || "Unassigned"}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-md bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">
                      {r.serviceId}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold">{r.status}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">
                    <p className="line-clamp-1">{r.pickupLabel}</p>
                    <p className="line-clamp-1 text-slate-400">
                      → {r.dropLabel}
                    </p>
                  </td>
                  <td className="px-4 py-3 font-semibold">
                    {formatPaise(r.totalPaise)}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {r.createdAtLabel}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/modules/juride/rides/${r.id}`}
                      className="text-xs font-bold text-blue-600"
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
            No rides in <code>rides</code> yet.
          </p>
        )}
      </div>
    </div>
  );
}