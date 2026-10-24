"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useJuStayBookings, {
  type JuStayBookingRow,
} from "@/hooks/useJuStayBookings";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
} from "@/lib/firebase/firestore";

export default function JuStayBookingDetailPage() {
  const params = useParams();
  const bookingId = String(params.bookingId ?? "");
  const { getBookingById } = useJuStayBookings();
  const [row, setRow] = useState<JuStayBookingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const mapped = await getBookingById(bookingId);
        await getDocument(FIRESTORE_COLLECTIONS.BOOKINGS, bookingId);
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
        href="/modules/justay/bookings"
        className="text-xs font-bold text-purple-600"
      >
        ← JuStay bookings
      </Link>
      <h1 className="mt-2 text-2xl font-black text-slate-900">
        Booking {bookingId}
      </h1>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}
      {row && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm space-y-2 text-xs">
            <p className="text-sm font-black text-slate-900">Lifecycle</p>
            <Row label="Status" value={row.status} />
            <Row label="Payment" value={row.paymentStatus} />
            <Row label="Service" value={row.service} />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm space-y-2 text-xs">
            <p className="text-sm font-black text-slate-900">Money (display)</p>
            <Row label="Total" value={`₹${(row.totalPaise / 100).toFixed(2)}`} />
            <Row
              label="Advance (≈50%)"
              value={`₹${(row.advancePaise / 100).toFixed(2)}`}
            />
            <Row
              label="Remaining"
              value={`₹${(row.remainingPaise / 100).toFixed(2)}`}
            />
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-sm space-y-2 text-xs">
            <p className="text-sm font-black text-slate-900">Stay</p>
            <Row label="Check-in" value={row.checkInLabel} />
            <Row label="Check-out" value={row.checkOutLabel} />
            <Row label="Vendor" value={row.vendorId || "—"} />
            <Row label="User" value={row.userId || "—"} />
          </div>
        </div>
      )}
      {!loading && !row && !error && (
        <p className="mt-6 text-sm text-slate-500">Booking not found.</p>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800 break-all">{value}</span>
    </div>
  );
}