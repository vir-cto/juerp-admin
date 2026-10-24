"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export const LOGISTICS_SERVICE_IDS = [
  "JULOGISTICS",
  "LOGISTICS",
  "JUPARCEL",
  "PARCEL",
];

const TRUCK_VEHICLES = [
  "3W",
  "3_WHEELER",
  "THREE_WHEELER",
  "4W",
  "4_WHEELER",
  "FOUR_WHEELER",
  "CONTAINER",
  "TRUCK",
];

// Captains with outstanding dues above Rs 2,000 are blocked from dispatch.
export const CAPTAIN_BLOCK_LIMIT_PAISE = 200000;

export type LogisticsRow = {
  id: string;
  rideId: string;
  serviceId: string;
  status: string;
  captainId: string;
  userId: string;
  vehicleType: string;
  weightKg: number;
  pickupLabel: string;
  dropLabel: string;
  totalPaise: number;
  stage1Paid: boolean;
  stage2Paid: boolean;
  callConfirmed: boolean;
  pinVerified: boolean;
  districtId: string;
  createdAtLabel: string;
  createdAtMs: number;
};

export type LogisticsCaptainRow = {
  id: string;
  captainId: string;
  name: string;
  phone: string;
  vehicleType: string;
  vehicleNumber: string;
  verificationStatus: string;
  onlineStatus: string;
  districtName: string;
  outstandingDuePaise: number;
  blocked: boolean;
};

type Raw = Record<string, unknown> & { id: string };

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function num(...vals: unknown[]): number {
  for (const v of vals) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) {
      return Number(v);
    }
  }
  return 0;
}

function flag(...vals: unknown[]): boolean {
  return vals.some(
    (v) =>
      v === true ||
      (typeof v === "string" &&
        ["PAID", "SUCCESS", "COMPLETED", "COLLECTED", "VERIFIED"].includes(
          v.toUpperCase()
        ))
  );
}

function toMs(v: unknown): number {
  if (!v) return 0;
  if (typeof v === "object" && v !== null && "toDate" in v) {
    return (v as { toDate: () => Date }).toDate().getTime();
  }
  const d = new Date(v as string | number);
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
}

function formatMs(ms: number): string {
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function placeLabel(place: unknown): string {
  if (!place) return "—";
  if (typeof place === "string") return place;
  if (typeof place === "object") {
    const p = place as Record<string, unknown>;
    return str(p.address) || str(p.label) || str(p.name) || "—";
  }
  return "—";
}

function mapShipment(raw: Raw): LogisticsRow | null {
  const serviceId = str(
    raw.serviceId || raw.serviceType || raw.service
  ).toUpperCase();
  if (!LOGISTICS_SERVICE_IDS.includes(serviceId)) return null;

  const pay = (raw.payment ?? raw.paymentSplit ?? {}) as Record<
    string,
    unknown
  >;
  const parcel = (raw.parcel ?? raw.shipment ?? {}) as Record<string, unknown>;
  const fin = (raw.financialSnapshot ?? {}) as Record<string, unknown>;
  const createdAtMs = toMs(raw.createdAt);

  return {
    id: raw.id,
    rideId: str(raw.rideId) || raw.id,
    serviceId,
    status: str(raw.status).toUpperCase() || "REQUESTED",
    captainId: str(raw.captainId),
    userId: str(raw.userId),
    vehicleType: str(raw.vehicleType || parcel.vehicleType).toUpperCase() || "—",
    weightKg: num(raw.weightKg, parcel.weightKg, parcel.weight),
    pickupLabel: placeLabel(raw.pickup || raw.pickupLocation),
    dropLabel: placeLabel(raw.drop || raw.dropLocation || raw.destination),
    totalPaise: num(raw.totalPaise, fin.totalAmountPaise, raw.farePaise),
    stage1Paid: flag(
      raw.stage1Paid,
      raw.firstHalfPaid,
      raw.firstPaymentStatus,
      pay.stage1Status,
      pay.stage1Paid
    ),
    stage2Paid: flag(
      raw.stage2Paid,
      raw.secondHalfPaid,
      raw.secondPaymentStatus,
      pay.stage2Status,
      pay.stage2Paid
    ),
    callConfirmed: flag(
      raw.confirmationCallDone,
      raw.callConfirmed,
      (raw.confirmationCall as Record<string, unknown> | undefined)?.completed
    ),
    pinVerified: flag(raw.pinVerified, raw.customerPinVerified),
    districtId: str(raw.districtId),
    createdAtLabel: formatMs(createdAtMs),
    createdAtMs,
  };
}

function mapCaptain(raw: Raw): LogisticsCaptainRow | null {
  const vehicleType = str(raw.vehicleType).toUpperCase();
  const serviceType = str(raw.serviceType || raw.serviceId).toUpperCase();
  const services = Array.isArray(raw.approvedServices)
    ? (raw.approvedServices as unknown[]).map((s) => str(s).toUpperCase())
    : [];

  const isLogistics =
    TRUCK_VEHICLES.includes(vehicleType) ||
    LOGISTICS_SERVICE_IDS.includes(serviceType) ||
    services.some((s) => LOGISTICS_SERVICE_IDS.includes(s));
  if (!isLogistics) return null;

  const outstandingDuePaise =
    typeof raw.outstandingDuePaise === "number"
      ? raw.outstandingDuePaise
      : Math.round(
          num(raw.captainOutstandingDue, raw.outstandingDue, 0) * 100
        );

  return {
    id: raw.id,
    captainId: str(raw.captainId) || raw.id,
    name: str(raw.name) || str(raw.displayName) || "Captain",
    phone: str(raw.phone) || str(raw.mobile),
    vehicleType: vehicleType || "—",
    vehicleNumber:
      str(raw.vehicleNumber || raw.registrationNumber).toUpperCase() || "—",
    verificationStatus:
      str(raw.verificationStatus || raw.kycStatus).toUpperCase() || "PENDING",
    onlineStatus: str(raw.onlineStatus).toUpperCase() || "OFFLINE",
    districtName: str(raw.districtName) || str(raw.district) || "—",
    outstandingDuePaise,
    blocked:
      str(raw.accountBlockStatus).toUpperCase() === "BLOCKED_DUE" ||
      outstandingDuePaise > CAPTAIN_BLOCK_LIMIT_PAISE,
  };
}

export function useJuRideLogistics(pollMs = 45000) {
  const [shipments, setShipments] = useState<LogisticsRow[]>([]);
  const [captains, setCaptains] = useState<LogisticsCaptainRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setShipments([]);
      setCaptains([]);
      setLoading(false);
      return;
    }

    try {
      const [rideDocs, captainDocs] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.RIDES,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          [],
          undefined,
          500
        ),
      ]);

      setShipments(
        rideDocs
          .map((d) => mapShipment(d as Raw))
          .filter((r): r is LogisticsRow => r !== null)
          .sort((a, b) => b.createdAtMs - a.createdAtMs)
      );
      setCaptains(
        captainDocs
          .map((d) => mapCaptain(d as Raw))
          .filter((c): c is LogisticsCaptainRow => c !== null)
          .sort((a, b) => b.outstandingDuePaise - a.outstandingDuePaise)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load logistics data."
      );
      setShipments([]);
      setCaptains([]);
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

  const summary = useMemo(() => {
    const terminal = new Set(["COMPLETED", "CANCELLED", "REJECTED", "SETTLED"]);
    const active = shipments.filter((s) => !terminal.has(s.status));
    return {
      total: shipments.length,
      active: active.length,
      awaitingCall: active.filter((s) => !s.callConfirmed).length,
      stage2Due: active.filter((s) => s.stage1Paid && !s.stage2Paid).length,
      bookingValuePaise: shipments.reduce((a, s) => a + s.totalPaise, 0),
      blockedCaptains: captains.filter((c) => c.blocked).length,
      onlineCaptains: captains.filter((c) => c.onlineStatus === "ONLINE")
        .length,
    };
  }, [shipments, captains]);

  return {
    shipments,
    captains,
    summary,
    loading,
    error,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuRideLogistics;