"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  MODULE_JUSHOPPING,
  JUSHOPPING_VENDOR_TYPES,
} from "@/lib/constants/modules";

export type JuShoppingVendorRow = {
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
};

function str(v: unknown): string {
  if (typeof v === "string") return v.trim();
  if (typeof v === "number") return String(v);
  return "";
}

function isShoppingVendor(raw: Record<string, unknown>): boolean {
  const moduleId = str(raw.moduleId).toUpperCase();
  if (moduleId === MODULE_JUSHOPPING) return true;

  const vendorType = str(raw.vendorType || raw.type).toUpperCase();
  if ((JUSHOPPING_VENDOR_TYPES as readonly string[]).includes(vendorType)) {
    return true;
  }

  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  return modules.some((m) =>
    (JUSHOPPING_VENDOR_TYPES as readonly string[]).includes(m)
  );
}

function mapVendor(
  raw: Record<string, unknown> & { id: string }
): JuShoppingVendorRow | null {
  if (!isShoppingVendor(raw)) return null;

  const modules = Array.isArray(raw.modules)
    ? raw.modules.map((m) => str(m).toUpperCase())
    : [];
  const vendorType =
    str(raw.vendorType || raw.type).toUpperCase() || modules[0] || "SHOPPING";

  return {
    id: raw.id,
    vendorId: str(raw.vendorId) || raw.id,
    businessName:
      str(raw.businessName) || str(raw.name) || str(raw.vendorId) || raw.id,
    ownerName: str(raw.ownerName) || str(raw.owner) || "—",
    phone: str(raw.phone) || str(raw.mobile) || "",
    email: str(raw.email),
    vendorType,
    moduleId: str(raw.moduleId).toUpperCase() || MODULE_JUSHOPPING,
    modules: modules.length ? modules : [vendorType],
    verificationStatus: str(
      raw.verificationStatus || raw.kycStatus
    ).toUpperCase() || "PENDING",
    status: str(raw.status || raw.accountStatus).toUpperCase() || "ACTIVE",
    stateName: str(raw.stateName) || str(raw.stateId) || "—",
    districtName: str(raw.districtName) || str(raw.districtId) || "—",
  };
}

export function useJuShoppingVendors() {
  const [vendors, setVendors] = useState<JuShoppingVendorRow[]>([]);
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
        .filter((v): v is JuShoppingVendorRow => v !== null)
        .sort((a, b) => a.businessName.localeCompare(b.businessName));
      setVendors(mapped);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load JuShopping vendors."
      );
      setVendors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const summary = useMemo(
    () => ({
      total: vendors.length,
      active: vendors.filter((v) => v.status === "ACTIVE").length,
      pending: vendors.filter((v) =>
        ["PENDING", "SUBMITTED"].includes(v.verificationStatus)
      ).length,
    }),
    [vendors]
  );

  return {
    vendors,
    summary,
    loading,
    error,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuShoppingVendors;