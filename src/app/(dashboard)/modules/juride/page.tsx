"use client";

import Link from "next/link";
import useDashboardStats from "@/hooks/useDashboardStats";
import useJuRideRides from "@/hooks/useJuRideRides";
import useJuRideCaptains from "@/hooks/useJuRideCaptains";

export default function JuRideModulePage() {
  const { stats, loading: dashLoading } = useDashboardStats();
  const { summary: rideSummary, loading: ridesLoading } = useJuRideRides();
  const { summary: captainSummary, loading: captainsLoading } =
    useJuRideCaptains();

  const moduleHealth = stats.modules.find((m) => m.moduleId === "JURIDE");
  const loading = dashLoading || ridesLoading || captainsLoading;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
            Modules / JuRide
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            JuRide ERP
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Rides, captains and live mobility ops from Firestore.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/modules/juride/rides"
            className="rounded-xl bg-blue-400 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-500"
          >
            View Rides
          </Link>
          <Link
            href="/modules/juride/captains"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            Ride captains
          </Link>
          <Link
            href="/entity-management/captains"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            All captains
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          title="Active rides"
          value={moduleHealth?.activeOrders ?? rideSummary.active}
          loading={loading}
        />
        <Kpi title="Ride rows" value={rideSummary.total} loading={loading} />
        <Kpi
          title="Captains"
          value={captainSummary.total}
          loading={loading}
        />
        <Kpi
          title="Online now"
          value={captainSummary.online}
          loading={loading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/modules/juride/rides"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
        >
          <p className="text-sm font-bold text-slate-900">Rides</p>
          <p className="mt-1 text-xs text-slate-500">
            <code>rides</code> collection · status · fare snapshot
          </p>
          <p className="mt-4 text-2xl font-black text-blue-600">
            {loading ? "…" : rideSummary.total}
          </p>
        </Link>
        <Link
          href="/modules/juride/captains"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
        >
          <p className="text-sm font-bold text-slate-900">Captains</p>
          <p className="mt-1 text-xs text-slate-500">
            Online · verification · vehicle
          </p>
          <p className="mt-4 text-2xl font-black text-blue-600">
            {loading ? "…" : captainSummary.total}
          </p>
        </Link>

        <Link
          href="/modules/juride/logistics"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
        >
          Logistics
        </Link>
        <Link
          href="/modules/juride/packers-movers"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
        >
          Packers &amp; Movers
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