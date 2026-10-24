"use client";

import Link from "next/link";
import useDashboardStats from "@/hooks/useDashboardStats";
import useJuHomeBookings from "@/hooks/useJuHomeBookings";
import useJuHomeVendors from "@/hooks/useJuHomeVendors";

export default function JuHomeModulePage() {
  const { stats, loading: dashLoading } = useDashboardStats();
  const { summary: bookingSummary, loading: bookingsLoading } =
    useJuHomeBookings();
  const { summary: vendorSummary, loading: vendorsLoading } =
    useJuHomeVendors();

  const moduleHealth = stats.modules.find((m) => m.moduleId === "JUHOME");
  const loading = dashLoading || bookingsLoading || vendorsLoading;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-green-700">
            Modules / JuHome
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">JuHome ERP</h1>
          <p className="mt-1 text-sm text-slate-500">
            Home services — bookings and HOME_SERVICES vendors from Firestore.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/modules/juhome/bookings"
            className="rounded-xl bg-green-400 px-4 py-2.5 text-xs font-bold text-white hover:bg-green-500"
          >
            View Bookings
          </Link>
          <Link
            href="/modules/juhome/services"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            Service providers
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          title="Active home bookings"
          value={moduleHealth?.activeOrders ?? bookingSummary.active}
          loading={loading}
        />
        <Kpi title="Booking rows" value={bookingSummary.total} loading={loading} />
        <Kpi
          title="Home vendors"
          value={vendorSummary.total}
          loading={loading}
        />
        <Kpi
          title="Payment pending"
          value={bookingSummary.paymentPending}
          loading={loading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/modules/juhome/bookings"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-200 hover:bg-green-50"
        >
          <p className="text-sm font-bold text-slate-900">Bookings</p>
          <p className="mt-1 text-xs text-slate-500">
            Scheduled jobs · status · payment
          </p>
          <p className="mt-4 text-2xl font-black text-green-700">
            {loading ? "…" : bookingSummary.total}
          </p>
        </Link>
        <Link
          href="/modules/juhome/services"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-green-200 hover:bg-green-50"
        >
          <p className="text-sm font-bold text-slate-900">Service providers</p>
          <p className="mt-1 text-xs text-slate-500">
            HOME_SERVICES vendors · skills · KYC
          </p>
          <p className="mt-4 text-2xl font-black text-green-700">
            {loading ? "…" : vendorSummary.total}
          </p>
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