"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export type JuRideCaptainRow = {
  id: string;
  captainId: string;
  name: string;
  phone: string;
  status: string;
  verificationStatus: string;
  onlineStatus: string;
  serviceType: string;
  vehicleType: string;
  vehicleNumber: string;
  stateName: string;
  districtName: string;
};

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function mapCaptain(
  raw: Record<string, unknown> & { id: string }
): JuRideCaptainRow {
  return {
    id: raw.id,
    captainId: str(raw.captainId) || raw.id,
    name: str(raw.name) || str(raw.displayName) || "Captain",
    phone: str(raw.phone) || str(raw.mobile) || "",
    status: str(raw.status || raw.accountStatus).toUpperCase() || "ACTIVE",
    verificationStatus: str(
      raw.verificationStatus || raw.kycStatus
    ).toUpperCase() || "PENDING",
    onlineStatus: str(raw.onlineStatus).toUpperCase() || "OFFLINE",
    serviceType: str(raw.serviceType || raw.serviceId).toUpperCase() || "—",
    vehicleType: str(raw.vehicleType).toUpperCase() || "—",
    vehicleNumber: str(
      raw.vehicleNumber || raw.registrationNumber
    ).toUpperCase() || "—",
    stateName: str(raw.stateName) || str(raw.state) || "—",
    districtName: str(raw.districtName) || str(raw.district) || "—",
  };
}

/**
 * Lists captains that look ride-capable (serviceType bike/auto/car/ride
 * or any captain — JuRide ops surface).
 */
export function useJuRideCaptains() {
  const [captains, setCaptains] = useState<JuRideCaptainRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (isFirestoreDemoMode) {
      setCaptains([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.CAPTAINS,
        [],
        undefined,
        500
      );
      const mapped = docs
        .map((d) => mapCaptain(d as Record<string, unknown> & { id: string }))
        .sort((a, b) => a.name.localeCompare(b.name));
      setCaptains(mapped);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load JuRide captains."
      );
      setCaptains([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const summary = useMemo(
    () => ({
      total: captains.length,
      online: captains.filter((c) => c.onlineStatus === "ONLINE").length,
      verified: captains.filter((c) => c.verificationStatus === "ACTIVE")
        .length,
    }),
    [captains]
  );

  return {
    captains,
    summary,
    loading,
    error,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuRideCaptains;