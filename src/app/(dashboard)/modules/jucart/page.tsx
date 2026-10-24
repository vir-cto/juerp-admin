"use client";

import Link from "next/link";
import useDashboardStats from "@/hooks/useDashboardStats";
import useJuCartOrders from "@/hooks/useJuCartOrders";
import useJuCartVendors from "@/hooks/useJuCartVendors";

export default function JuCartModulePage() {
  const { stats, loading: dashLoading } = useDashboardStats();
  const { summary: orderSummary, loading: ordersLoading } = useJuCartOrders();
  const { summary: vendorSummary, loading: vendorsLoading } = useJuCartVendors();

  const moduleHealth = stats.modules.find((m) => m.moduleId === "JUCART");
  const loading = dashLoading || ordersLoading || vendorsLoading;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-orange-600">
            Modules / JuCart
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">JuCart ERP</h1>
          <p className="mt-1 text-sm text-slate-500">
            Food, Mart and Pharmacy operations — orders and vendors from Firestore.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/modules/jucart/orders"
            className="rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-orange-600"
          >
            View Orders
          </Link>
          <Link
            href="/entity-management/vendors"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            All Vendors
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi title="Active JuCart orders" value={moduleHealth?.activeOrders ?? orderSummary.active} loading={loading} />
        <Kpi title="JuCart order rows" value={orderSummary.total} loading={loading} />
        <Kpi title="JuCart vendors" value={vendorSummary.total} loading={loading} />
        <Kpi title="Pending vendor KYC" value={vendorSummary.pending} loading={loading} />
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { href: "/modules/jucart/food", label: "Food", count: vendorSummary.food, desc: "Restaurants · FSSAI" },
          { href: "/modules/jucart/mart", label: "Mart", count: vendorSummary.mart, desc: "Grocery · GST + FSSAI" },
          { href: "/modules/jucart/pharmacy", label: "Pharmacy", count: vendorSummary.pharmacy, desc: "Medicines · Drug licence" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:bg-orange-50"
          >
            <p className="text-sm font-bold text-slate-900">{c.label}</p>
            <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
            <p className="mt-4 text-2xl font-black text-orange-600">
              {loading ? "…" : c.count}
            </p>
            <p className="text-[10px] text-slate-400">vendors</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-black text-slate-900">Order mix</h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <Mini label="Food orders" value={orderSummary.food} />
          <Mini label="Mart orders" value={orderSummary.mart} />
          <Mini label="Pharmacy orders" value={orderSummary.pharmacy} />
        </div>
        <Link
          href="/modules/jucart/orders"
          className="mt-4 inline-block text-xs font-bold text-orange-600"
        >
          Open order registry →
        </Link>
      </div>
    </div>
  );
}

function Kpi({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-2xl font-black text-slate-900">
        {loading ? "…" : value}
      </p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-black text-slate-800">{value}</p>
    </div>
  );
}