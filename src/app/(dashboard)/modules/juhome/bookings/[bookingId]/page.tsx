"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useJuHomeBookings, {
  type JuHomeBookingRow,
} from "@/hooks/useJuHomeBookings";

export default function JuHomeBookingDetailPage() {
  const params = useParams();
  const bookingId = String(params.bookingId ?? "");
  const { getBookingById } = useJuHomeBookings();
  const [row, setRow] = useState<JuHomeBookingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const mapped = await getBookingById(bookingId);
        if (!cancelled) setRow(mapped);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Load failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (bookingId) void run();
    return () => {
      cancelled = true;
    };
  }, [bookingId, getBookingById]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/juhome/bookings"
        className="text-xs font-bold text-green-700"
      >
        ← JuHome bookings
      </Link>
      <h1 className="mt-2 text-2xl font-black text-slate-900">
        Booking {bookingId}
      </h1>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {row && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card title="Job">
            <Row label="Status" value={row.status} />
            <Row label="Service" value={row.service} />
            <Row label="Payment" value={row.paymentStatus} />
            <Row label="Scheduled" value={row.scheduledLabel} />
          </Card>
          <Card title="Parties">
            <Row label="User" value={row.userId || "—"} />
            <Row label="Vendor" value={row.vendorId || "—"} />
            <Row label="Worker / Captain" value={row.captainId || "—"} />
            <Row
              label="Total"
              value={`₹${(row.totalPaise / 100).toFixed(2)}`}
            />
          </Card>
        </div>
      )}
      {!loading && !row && !error && (
        <p className="mt-6 text-sm text-slate-500">Booking not found.</p>
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
      <span className="break-all font-semibold text-slate-800">{value}</span>
    </div>
  );
}