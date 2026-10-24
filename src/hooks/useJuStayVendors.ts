"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  MODULE_JUSTAY,
  JUSTAY_VENDOR_TYPES,
  type JuStayServiceId,
} from "@/lib/constants/modules";

export type JuStayVendorRow = {
  id: string;
  vendorId: string;
  businessName: string;
  ownerName: string;
  phone: string;
  vendorType: string;
  modules: string[];
  verificationStatus: string;
  status: string;
  stateName: string;
  districtName: string;
};

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function isStayVendor(raw: Record<string, unknown>): boolean {
  const moduleId = str(raw.moduleId).toUpperCase();
  if (moduleId === MODULE_JUSTAY) return true;

  const vendorType = str(raw.vendorType || raw.type).toUpperCase();
  if ((JUSTAY_VENDOR_TYPES as readonly string[]).includes(vendorType)) return true;

  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  return modules.some((m) =>
    (JUSTAY_VENDOR_TYPES as readonly string[]).includes(m)
  );
}

function mapVendor(
  raw: Record<string, unknown> & { id: string }
): JuStayVendorRow | null {
  if (!isStayVendor(raw)) return null;
  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  const vendorType =
    str(raw.vendorType || raw.type).toUpperCase() || modules[0] || "STAY";

  return {
    id: raw.id,
    vendorId: str(raw.vendorId) || raw.id,
    businessName: str(raw.businessName) || str(raw.name) || raw.id,
    ownerName: str(raw.ownerName) || "—",
    phone: str(raw.phone) || str(raw.mobile) || "",
    vendorType,
    modules: modules.length ? modules : [vendorType],
    verificationStatus: str(raw.verificationStatus).toUpperCase() || "PENDING",
    status: str(raw.status).toUpperCase() || "ACTIVE",
    stateName: str(raw.stateName) || str(raw.stateId) || "—",
    districtName: str(raw.districtName) || str(raw.districtId) || "—",
  };
}

export function useJuStayVendors(serviceFilter?: JuStayServiceId | "STAY" | "ALL") {
  const [vendors, setVendors] = useState<JuStayVendorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    if (isFirestoreDemoMode) {
      setVendors([]);
      setLoading(false);
      return;
    }
    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.VENDORS,
        [],
        undefined,
        500
      );
      const mapped = docs
        .map((d) => mapVendor(d as Record<string, unknown> & { id: string }))
        .filter((v): v is JuStayVendorRow => v !== null)
        .sort((a, b) => a.businessName.localeCompare(b.businessName));
      setVendors(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuStay vendors."
      );
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!serviceFilter || serviceFilter === "ALL") return vendors;
    if (serviceFilter === "STAY") {
      return vendors.filter(
        (v) =>
          v.vendorType === "STAY" ||
          v.modules.includes("STAY") ||
          v.modules.some((m) =>
            ["HOTELS", "HOSTEL_PG", "HALLS", "TOURISM"].includes(m)
          )
      );
    }
    return vendors.filter(
      (v) => v.vendorType === serviceFilter || v.modules.includes(serviceFilter)
    );
  }, [vendors, serviceFilter]);

  const summary = useMemo(
    () => ({
      total: filtered.length,
      active: filtered.filter((v) => v.status === "ACTIVE").length,
      pending: filtered.filter((v) =>
        ["PENDING", "SUBMITTED"].includes(v.verificationStatus)
      ).length,
      hotels: vendors.filter(
        (v) => v.vendorType === "HOTELS" || v.modules.includes("HOTELS")
      ).length,
      hostelPg: vendors.filter(
        (v) => v.vendorType === "HOSTEL_PG" || v.modules.includes("HOSTEL_PG")
      ).length,
      halls: vendors.filter(
        (v) => v.vendorType === "HALLS" || v.modules.includes("HALLS")
      ).length,
      tourism: vendors.filter(
        (v) => v.vendorType === "TOURISM" || v.modules.includes("TOURISM")
      ).length,
    }),
    [filtered, vendors]
  );

  return {
    vendors: filtered,
    summary,
    loading,
    error,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuStayVendors;