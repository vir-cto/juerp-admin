"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import { MODULE_JUHOME } from "@/lib/constants/modules";

export type JuHomeBookingRow = {
  id: string;
  bookingId: string;
  userId: string;
  vendorId: string;
  captainId: string;
  moduleId: string;
  service: string;
  status: string;
  paymentStatus: string;
  totalPaise: number;
  scheduledLabel: string;
  createdAtLabel: string;
};

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function formatTs(v: unknown): string {
  if (!v) return "—";
  try {
    if (typeof v === "object" && v !== null && "toDate" in v) {
      return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    const d = new Date(v as string | number);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch {
    /* ignore */
  }
  return "—";
}

function mapBooking(
  raw: Record<string, unknown> & { id: string }
): JuHomeBookingRow | null {
  const moduleId = str(raw.moduleId || raw.module).toUpperCase();
  const service = str(
    raw.service || raw.serviceId || raw.serviceType || raw.category
  ).toUpperCase();

  const isHome =
    moduleId === MODULE_JUHOME ||
    moduleId === "JUHOME" ||
    str(raw.bookingType).toUpperCase() === "HOME_SERVICE";

  if (!isHome) return null;

  const totalPaise =
    typeof raw.totalPaise === "number"
      ? raw.totalPaise
      : typeof raw.totalAmountPaise === "number"
        ? raw.totalAmountPaise
        : 0;

  return {
    id: raw.id,
    bookingId: str(raw.bookingId) || raw.id,
    userId: str(raw.userId),
    vendorId: str(raw.vendorId),
    captainId: str(raw.captainId) || str(raw.workerId),
    moduleId: MODULE_JUHOME,
    service: service || "OTHER",
    status: str(raw.status).toUpperCase() || "CREATED",
    paymentStatus: str(raw.paymentStatus).toUpperCase() || "—",
    totalPaise,
    scheduledLabel: formatTs(
      raw.scheduledAt || raw.slotStartAt || raw.serviceAt
    ),
    createdAtLabel: formatTs(raw.createdAt),
  };
}

export function useJuHomeBookings(pollMs = 45000) {
  const [bookings, setBookings] = useState<JuHomeBookingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (isFirestoreDemoMode) {
      setBookings([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.BOOKINGS,
        [],
        undefined,
        500
      );
      const mapped = docs
        .map((d) => mapBooking(d as Record<string, unknown> & { id: string }))
        .filter((b): b is JuHomeBookingRow => b !== null)
        .sort((a, b) => b.createdAtLabel.localeCompare(a.createdAtLabel));
      setBookings(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuHome bookings."
      );
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (!pollMs || isFirestoreDemoMode) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  const getBookingById = useCallback(async (id: string) => {
    if (isFirestoreDemoMode) return null;
    const doc = await getDocument<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.BOOKINGS,
      id
    );
    if (!doc) return null;
    return mapBooking(doc as Record<string, unknown> & { id: string });
  }, []);

  const summary = useMemo(
    () => ({
      total: bookings.length,
      active: bookings.filter(
        (b) =>
          !["COMPLETED", "CANCELLED", "SETTLED", "REJECTED"].includes(b.status)
      ).length,
      paymentPending: bookings.filter(
        (b) =>
          b.paymentStatus === "PENDING" || b.status === "PAYMENT_PENDING"
      ).length,
    }),
    [bookings]
  );

  return {
    bookings,
    summary,
    loading,
    error,
    refresh: load,
    getBookingById,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuHomeBookings;