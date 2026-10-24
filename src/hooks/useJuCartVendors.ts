"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  JUCART_VENDOR_TYPES,
  MODULE_JUCART,
  type JuCartServiceId,
} from "@/lib/constants/modules";

export type JuCartVendorRow = {
  id: string;
  vendorId: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  vendorType: string;
  moduleId: string;
  modules: string[];
  verificationStatus: string;
  status: string;
  stateName: string;
  districtName: string;
  isOpen: boolean;
};

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function isJuCartVendor(raw: Record<string, unknown>): boolean {
  const moduleId = str(raw.moduleId).toUpperCase();
  if (moduleId === MODULE_JUCART) return true;

  const vendorType = str(raw.vendorType || raw.type).toUpperCase();
  if (JUCART_VENDOR_TYPES.includes(vendorType as JuCartServiceId)) return true;

  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  return modules.some((m) =>
    JUCART_VENDOR_TYPES.includes(m as JuCartServiceId)
  );
}

function mapVendor(
  raw: Record<string, unknown> & { id: string }
): JuCartVendorRow | null {
  if (!isJuCartVendor(raw)) return null;

  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  const vendorType =
    str(raw.vendorType || raw.type).toUpperCase() || modules[0] || "FOOD";

  return {
    id: raw.id,
    vendorId: str(raw.vendorId) || raw.id,
    businessName:
      str(raw.businessName) || str(raw.name) || str(raw.vendorId) || raw.id,
    ownerName: str(raw.ownerName) || str(raw.owner) || "—",
    phone: str(raw.phone) || str(raw.mobile) || "",
    email: str(raw.email),
    vendorType,
    moduleId: str(raw.moduleId).toUpperCase() || MODULE_JUCART,
    modules: modules.length ? modules : [vendorType],
    verificationStatus: str(
      raw.verificationStatus || raw.kycStatus
    ).toUpperCase() || "PENDING",
    status: str(raw.status || raw.accountStatus).toUpperCase() || "ACTIVE",
    stateName: str(raw.stateName) || str(raw.stateId) || "—",
    districtName: str(raw.districtName) || str(raw.districtId) || "—",
    isOpen: raw.isOpen === true || str(raw.isOpen).toLowerCase() === "true",
  };
}

export function useJuCartVendors(serviceFilter?: JuCartServiceId | "ALL") {
  const [vendors, setVendors] = useState<JuCartVendorRow[]>([]);
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
        .filter((v): v is JuCartVendorRow => v !== null)
        .sort((a, b) => a.businessName.localeCompare(b.businessName));
      setVendors(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuCart vendors."
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
    return vendors.filter(
      (v) =>
        v.vendorType === serviceFilter ||
        v.modules.includes(serviceFilter)
    );
  }, [vendors, serviceFilter]);

  const summary = useMemo(
    () => ({
      total: filtered.length,
      active: filtered.filter((v) => v.status === "ACTIVE").length,
      pending: filtered.filter((v) =>
        ["PENDING", "SUBMITTED"].includes(v.verificationStatus)
      ).length,
      food: vendors.filter((v) => v.vendorType === "FOOD" || v.modules.includes("FOOD")).length,
      mart: vendors.filter((v) => v.vendorType === "MART" || v.modules.includes("MART")).length,
      pharmacy: vendors.filter(
        (v) => v.vendorType === "PHARMACY" || v.modules.includes("PHARMACY")
      ).length,
    }),
    [filtered, vendors]
  );

  return {
    vendors: filtered,
    allVendors: vendors,
    summary,
    loading,
    error,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuCartVendors;