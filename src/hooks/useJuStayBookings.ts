"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  MODULE_JUSTAY,
  JUSTAY_SERVICES,
  type JuStayServiceId,
} from "@/lib/constants/modules";

export type JuStayBookingRow = {
  id: string;
  bookingId: string;
  userId: string;
  vendorId: string;
  moduleId: string;
  service: string;
  status: string;
  paymentStatus: string;
  totalPaise: number;
  advancePaise: number;
  remainingPaise: number;
  checkInLabel: string;
  checkOutLabel: string;
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
): JuStayBookingRow | null {
  const moduleId = str(raw.moduleId || raw.module).toUpperCase();
  const service = str(raw.service || raw.serviceId || raw.stayType).toUpperCase();

  const isStayModule = moduleId === MODULE_JUSTAY || moduleId === "JUSTAY";
  const isStayService = JUSTAY_SERVICES.includes(service as JuStayServiceId);

  if (!isStayModule && !isStayService) return null;

  const totalPaise =
    typeof raw.totalPaise === "number"
      ? raw.totalPaise
      : typeof raw.totalAmountPaise === "number"
        ? raw.totalAmountPaise
        : 0;

  const advancePaise =
    typeof raw.advancePaise === "number"
      ? raw.advancePaise
      : typeof raw.advanceAmountPaise === "number"
        ? raw.advanceAmountPaise
        : Math.round(totalPaise * 0.5);

  const remainingPaise =
    typeof raw.remainingPaise === "number"
      ? raw.remainingPaise
      : Math.max(0, totalPaise - advancePaise);

  return {
    id: raw.id,
    bookingId: str(raw.bookingId) || raw.id,
    userId: str(raw.userId),
    vendorId: str(raw.vendorId) || str(raw.propertyId),
    moduleId: isStayModule ? MODULE_JUSTAY : moduleId || MODULE_JUSTAY,
    service: service || "HOTELS",
    status: str(raw.status).toUpperCase() || "CREATED",
    paymentStatus: str(raw.paymentStatus).toUpperCase() || "—",
    totalPaise,
    advancePaise,
    remainingPaise,
    checkInLabel: formatTs(raw.checkInAt || raw.checkInDate || raw.startAt),
    checkOutLabel: formatTs(raw.checkOutAt || raw.checkOutDate || raw.endAt),
    createdAtLabel: formatTs(raw.createdAt),
  };
}

export function useJuStayBookings(pollMs = 45000) {
  const [bookings, setBookings] = useState<JuStayBookingRow[]>([]);
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
        .filter((b): b is JuStayBookingRow => b !== null)
        .sort((a, b) => b.createdAtLabel.localeCompare(a.createdAtLabel));
      setBookings(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuStay bookings."
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

  const getBookingById = useCallback(async (bookingId: string) => {
    if (isFirestoreDemoMode) return null;
    const doc = await getDocument<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.BOOKINGS,
      bookingId
    );
    if (!doc) return null;
    return mapBooking(doc as Record<string, unknown> & { id: string });
  }, []);

  const summary = useMemo(() => {
    return {
      total: bookings.length,
      active: bookings.filter(
        (b) => !["COMPLETED", "CANCELLED", "SETTLED", "REJECTED"].includes(b.status)
      ).length,
      hotels: bookings.filter((b) => b.service === "HOTELS").length,
      hostelPg: bookings.filter((b) => b.service === "HOSTEL_PG").length,
      halls: bookings.filter((b) => b.service === "HALLS").length,
      tourism: bookings.filter((b) => b.service === "TOURISM").length,
      advancePending: bookings.filter(
        (b) =>
          b.paymentStatus === "PENDING" ||
          b.status === "PAYMENT_PENDING" ||
          b.status === "ADVANCE_PENDING"
      ).length,
    };
  }, [bookings]);

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

export default useJuStayBookings;