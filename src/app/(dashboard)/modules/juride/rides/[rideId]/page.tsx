"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useJuRideRides, { type JuRideRow } from "@/hooks/useJuRideRides";

export default function JuRideDetailPage() {
  const params = useParams();
  const rideId = String(params.rideId ?? "");
  const { getRideById } = useJuRideRides();
  const [row, setRow] = useState<JuRideRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const mapped = await getRideById(rideId);
        if (!cancelled) setRow(mapped);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Load failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (rideId) void run();
    return () => {
      cancelled = true;
    };
  }, [rideId, getRideById]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/juride/rides"
        className="text-xs font-bold text-blue-600"
      >
        ← JuRide rides
      </Link>
      <h1 className="mt-2 text-2xl font-black text-slate-900">
        Ride {rideId}
      </h1>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {row && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card title="Lifecycle">
            <Row label="Status" value={row.status} />
            <Row label="Payment" value={row.paymentStatus} />
            <Row label="Service" value={row.serviceId} />
            <Row label="Module" value={row.moduleId} />
          </Card>
          <Card title="Parties">
            <Row label="User" value={row.userId || "—"} />
            <Row label="Captain" value={row.captainId || "—"} />
            <Row
              label="Fare"
              value={`₹${(row.totalPaise / 100).toFixed(2)}`}
            />
          </Card>
          <Card title="Route">
            <Row label="Pickup" value={row.pickupLabel} />
            <Row label="Drop" value={row.dropLabel} />
          </Card>
          <Card title="Timestamps">
            <Row label="Created" value={row.createdAtLabel} />
            <Row label="Updated" value={row.updatedAtLabel} />
          </Card>
        </div>
      )}
      {!loading && !row && !error && (
        <p className="mt-6 text-sm text-slate-500">Ride not found.</p>
      )}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-black text-slate-900">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="break-all text-right font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}