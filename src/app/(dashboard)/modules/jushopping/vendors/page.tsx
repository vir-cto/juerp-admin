"use client";

import Link from "next/link";
import useJuShoppingVendors from "@/hooks/useJuShoppingVendors";

export default function JuShoppingVendorsPage() {
  const { vendors, summary, loading, error, refresh } = useJuShoppingVendors();

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/jushopping"
        className="text-xs font-bold text-pink-600 hover:text-pink-700"
      >
        ← JuShopping
      </Link>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            JuShopping · Vendors
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Vendors with <code className="text-xs">SHOPPING</code> /{" "}
            <code className="text-xs">moduleId: JUSHOPPING</code>.
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

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] text-slate-400">Total</p>
          <p className="text-lg font-black text-slate-900">
            {loading ? "…" : summary.total}
          </p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] text-slate-400">Active</p>
          <p className="text-lg font-black text-slate-900">
            {loading ? "…" : summary.active}
          </p>
        </div>
        <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
          <p className="text-[10px] text-slate-400">Pending KYC</p>
          <p className="text-lg font-black text-slate-900">
            {loading ? "…" : summary.pending}
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 space-y-3">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-bold text-slate-900">{v.businessName}</p>
              <p className="mt-1 text-xs text-slate-500">
                {v.vendorId} · {v.ownerName}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                {v.districtName}, {v.stateName}
                {v.phone ? ` · ${v.phone}` : ""}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-md bg-pink-50 px-2 py-0.5 text-[10px] font-bold text-pink-700">
                  {v.vendorType}
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                  {v.status}
                </span>
                <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-[10px] font-bold text-yellow-700">
                  KYC {v.verificationStatus}
                </span>
              </div>
            </div>
            <Link
              href={`/entity-management/vendors/${v.vendorId}`}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-bold text-pink-600 hover:bg-pink-50"
            >
              Open vendor →
            </Link>
          </div>
        ))}

        {!loading && vendors.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-bold text-slate-800">
              No shopping vendors found
            </p>
            <p className="mx-auto mt-2 max-w-lg text-xs text-slate-500">
              Use <code>vendorType: &quot;SHOPPING&quot;</code> or{" "}
              <code>moduleId: &quot;JUSHOPPING&quot;</code> on vendor documents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}