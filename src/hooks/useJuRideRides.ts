"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import { MODULE_JURIDE } from "@/lib/constants/modules";

export type JuRideRow = {
  id: string;
  rideId: string;
  userId: string;
  captainId: string;
  moduleId: string;
  serviceId: string;
  status: string;
  paymentStatus: string;
  totalPaise: number;
  pickupLabel: string;
  dropLabel: string;
  stateId: string;
  districtId: string;
  createdAtLabel: string;
  updatedAtLabel: string;
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

function placeLabel(place: unknown): string {
  if (!place) return "—";
  if (typeof place === "string") return place;
  if (typeof place === "object") {
    const p = place as Record<string, unknown>;
    return (
      str(p.address) ||
      str(p.label) ||
      str(p.name) ||
      [str(p.lat) || str(p.latitude), str(p.lng) || str(p.longitude)]
        .filter(Boolean)
        .join(", ") ||
      "—"
    );
  }
  return "—";
}

function mapRide(
  raw: Record<string, unknown> & { id: string }
): JuRideRow | null {
  const moduleId = str(raw.moduleId || raw.module).toUpperCase();
  const serviceId = str(
    raw.serviceId || raw.serviceType || raw.service || raw.vehicleType
  ).toUpperCase();

  const isRide =
    moduleId === MODULE_JURIDE ||
    moduleId === "JURIDE" ||
    Boolean(str(raw.rideId)) ||
    // treat docs in rides collection as rides even without module tag
    true;

  if (!isRide) return null;

  const totalPaise =
    typeof raw.totalPaise === "number"
      ? raw.totalPaise
      : typeof (raw.financialSnapshot as { totalAmountPaise?: number })
            ?.totalAmountPaise === "number"
        ? (raw.financialSnapshot as { totalAmountPaise: number })
            .totalAmountPaise
        : typeof raw.farePaise === "number"
          ? raw.farePaise
          : 0;

  return {
    id: raw.id,
    rideId: str(raw.rideId) || raw.id,
    userId: str(raw.userId),
    captainId: str(raw.captainId),
    moduleId: MODULE_JURIDE,
    serviceId: serviceId || "RIDE",
    status: str(raw.status).toUpperCase() || "REQUESTED",
    paymentStatus: str(raw.paymentStatus).toUpperCase() || "—",
    totalPaise,
    pickupLabel: placeLabel(raw.pickup || raw.pickupLocation),
    dropLabel: placeLabel(raw.drop || raw.dropLocation || raw.destination),
    stateId: str(raw.stateId),
    districtId: str(raw.districtId),
    createdAtLabel: formatTs(raw.createdAt),
    updatedAtLabel: formatTs(raw.updatedAt),
  };
}

export function useJuRideRides(pollMs = 45000) {
  const [rides, setRides] = useState<JuRideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setRides([]);
      setLoading(false);
      return;
    }

    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.RIDES,
        [],
        undefined,
        500
      );

      const mapped = docs
        .map((d) => mapRide(d as Record<string, unknown> & { id: string }))
        .filter((r): r is JuRideRow => r !== null)
        .sort((a, b) => b.createdAtLabel.localeCompare(a.createdAtLabel));

      setRides(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuRide rides."
      );
      setRides([]);
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

  const getRideById = useCallback(async (rideId: string) => {
    if (isFirestoreDemoMode) return null;
    const doc = await getDocument<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.RIDES,
      rideId
    );
    if (!doc) return null;
    return mapRide(doc as Record<string, unknown> & { id: string });
  }, []);

  const summary = useMemo(() => {
    const terminal = new Set([
      "COMPLETED",
      "CANCELLED",
      "REJECTED",
      "SETTLED",
    ]);
    return {
      total: rides.length,
      active: rides.filter((r) => !terminal.has(r.status)).length,
      paymentPending: rides.filter(
        (r) =>
          r.paymentStatus === "PENDING" || r.status === "PAYMENT_PENDING"
      ).length,
      completed: rides.filter((r) => r.status === "COMPLETED").length,
    };
  }, [rides]);

  return {
    rides,
    summary,
    loading,
    error,
    refresh: load,
    getRideById,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuRideRides;