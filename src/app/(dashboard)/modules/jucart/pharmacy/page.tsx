"use client";

import Link from "next/link";
import useJuCartVendors from "@/hooks/useJuCartVendors";

export default function JuCartPharmacyPage() {
  const { vendors, summary, loading, error, refresh } =
    useJuCartVendors("PHARMACY");

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/jucart"
        className="text-xs font-bold text-orange-600 hover:text-orange-700"
      >
        ← JuCart
      </Link>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            JuCart · Pharmacy
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Pharmacy vendors (Drug licence / GST). Filtered where{" "}
            <code className="text-xs">vendorType</code> or{" "}
            <code className="text-xs">modules</code> includes{" "}
            <code className="text-xs">PHARMACY</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
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
        {loading && vendors.length === 0 && (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading pharmacy vendors…
          </p>
        )}

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
                <span className="rounded-md bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700">
                  {v.vendorType || "PHARMACY"}
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
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-bold text-orange-600 hover:bg-orange-50"
            >
              Open vendor →
            </Link>
          </div>
        ))}

        {!loading && vendors.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-bold text-slate-800">
              No pharmacy vendors found
            </p>
            <p className="mt-2 max-w-lg mx-auto text-xs text-slate-500">
              Add a document in Firestore <code>vendors</code> with one of:
            </p>
            <ul className="mt-3 text-left text-xs text-slate-600 max-w-md mx-auto list-disc pl-5 space-y-1">
              <li>
                <code>vendorType: &quot;PHARMACY&quot;</code>
              </li>
              <li>
                <code>modules: [&quot;PHARMACY&quot;]</code>
              </li>
              <li>
                <code>moduleId: &quot;JUCART&quot;</code> and type/modules
                including PHARMACY
              </li>
            </ul>
            <Link
              href="/entity-management/vendors"
              className="mt-4 inline-block text-xs font-bold text-orange-600"
            >
              Open all vendors →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}