"use client";

import Link from "next/link";
import useDashboardStats from "@/hooks/useDashboardStats";
import useJuStayBookings from "@/hooks/useJuStayBookings";
import useJuStayVendors from "@/hooks/useJuStayVendors";

export default function JuStayModulePage() {
  const { stats, loading: dashLoading } = useDashboardStats();
  const { summary: bookingSummary, loading: bookingsLoading } =
    useJuStayBookings();
  const { summary: vendorSummary, loading: vendorsLoading } =
    useJuStayVendors();

  const moduleHealth = stats.modules.find((m) => m.moduleId === "JUSTAY");
  const loading = dashLoading || bookingsLoading || vendorsLoading;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
            Modules / JuStay
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">JuStay ERP</h1>
          <p className="mt-1 text-sm text-slate-500">
            Hotels, Hostel/PG, Halls and Tourism — bookings use 50% advance model
            (display from Firestore).
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/modules/justay/bookings"
            className="rounded-xl bg-purple-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-purple-400"
          >
            View Bookings
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
        <Kpi
          title="Active stay bookings"
          value={moduleHealth?.activeOrders ?? bookingSummary.active}
          loading={loading}
        />
        <Kpi title="Booking rows" value={bookingSummary.total} loading={loading} />
        <Kpi title="Stay vendors" value={vendorSummary.total} loading={loading} />
        <Kpi
          title="Advance / payment pending"
          value={bookingSummary.advancePending}
          loading={loading}
        />
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            href: "/modules/justay/hotels",
            label: "Hotels",
            count: vendorSummary.hotels,
            desc: "Hotel properties",
          },
          {
            href: "/modules/justay/hostel-pg",
            label: "Hostel / PG",
            count: vendorSummary.hostelPg,
            desc: "Hostel & paying guest",
          },
          {
            href: "/modules/justay/halls",
            label: "Halls",
            count: vendorSummary.halls,
            desc: "Function halls",
          },
          {
            href: "/modules/justay/tourism",
            label: "Tourism",
            count: vendorSummary.tourism,
            desc: "Packages & experiences",
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:bg-purple-50"
          >
            <p className="text-sm font-bold text-slate-900">{c.label}</p>
            <p className="mt-1 text-xs text-slate-500">{c.desc}</p>
            <p className="mt-4 text-2xl font-black text-purple-600">
              {loading ? "…" : c.count}
            </p>
            <p className="text-[10px] text-slate-400">vendors</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-black text-slate-900">Booking mix</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Mini label="Hotels" value={bookingSummary.hotels} />
          <Mini label="Hostel/PG" value={bookingSummary.hostelPg} />
          <Mini label="Halls" value={bookingSummary.halls} />
          <Mini label="Tourism" value={bookingSummary.tourism} />
        </div>
        <Link
          href="/modules/justay/bookings"
          className="mt-4 inline-block text-xs font-bold text-purple-600"
        >
          Open booking registry →
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