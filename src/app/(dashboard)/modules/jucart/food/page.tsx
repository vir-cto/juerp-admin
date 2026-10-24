"use client";

import Link from "next/link";
import useJuCartVendors from "@/hooks/useJuCartVendors";

export default function JuCartFoodPage() {
  const { vendors, summary, loading, error, refresh } =
    useJuCartVendors("FOOD");

  return (
    <ServiceVendorsPage
      title="JuCart · Food"
      description="Restaurants and food vendors (vendorType / modules includes FOOD)."
      backHref="/modules/jucart"
      vendors={vendors}
      total={summary.total}
      active={summary.active}
      loading={loading}
      error={error}
      onRefresh={() => void refresh()}
    />
  );
}

function ServiceVendorsPage({
  title,
  description,
  backHref,
  vendors,
  total,
  active,
  loading,
  error,
  onRefresh,
}: {
  title: string;
  description: string;
  backHref: string;
  vendors: ReturnType<typeof useJuCartVendors>["vendors"];
  total: number;
  active: number;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link href={backHref} className="text-xs font-bold text-orange-600">
        ← JuCart
      </Link>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold"
        >
          Refresh
        </button>
      </div>
      <div className="mt-4 flex gap-3 text-sm">
        <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
          Total <strong>{loading ? "…" : total}</strong>
        </span>
        <span className="rounded-lg bg-white px-3 py-2 shadow-sm">
          Active <strong>{loading ? "…" : active}</strong>
        </span>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      <div className="mt-6 space-y-3">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div>
              <p className="font-bold text-slate-900">{v.businessName}</p>
              <p className="text-xs text-slate-500">
                {v.vendorId} · {v.districtName}, {v.stateName}
              </p>
              <p className="text-[10px] text-slate-400">
                KYC {v.verificationStatus} · {v.status}
              </p>
            </div>
            <Link
              href={`/entity-management/vendors/${v.vendorId}`}
              className="text-xs font-bold text-orange-600"
            >
              Open vendor →
            </Link>
          </div>
        ))}
        {!loading && vendors.length === 0 && (
          <p className="text-sm text-slate-500">No vendors for this service.</p>
        )}
      </div>
    </div>
  );
}