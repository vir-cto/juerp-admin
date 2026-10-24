"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";

export const PM_SERVICE_IDS = [
  "PACKERS_MOVERS",
  "PACKERS_AND_MOVERS",
  "PACKERS",
  "JUPACKERS",
];

export const PM_SLA_HOURS = 2;

export type PmMode = "LOCAL" | "INTERCITY" | "BOTH" | "—";

export type PmPartnerRow = {
  id: string;
  captainId: string;
  businessName: string;
  headName: string;
  phone: string;
  districtName: string;
  mode: PmMode;
  verificationStatus: string;
  rejectionReason: string;
  trucks: number;
  helpers: number;
  gstin: string;
  hasAadhaar: boolean;
  hasPan: boolean;
  hasBusinessProof: boolean;
  submittedAtMs: number;
  submittedAtLabel: string;
  hoursInQueue: number;
  missingDocs: string[];
};

export type PmJobRow = {
  id: string;
  rideId: string;
  status: string;
  captainId: string;
  userId: string;
  moveType: string;
  pickupLabel: string;
  dropLabel: string;
  totalPaise: number;
  startPaid: boolean;
  endPaid: boolean;
  pinVerified: boolean;
  createdAtMs: number;
  createdAtLabel: string;
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

function hasDoc(raw: Raw, keys: string[]): boolean {
  const docs = (raw.documents ?? raw.kyc ?? {}) as Record<string, unknown>;
  return keys.some((k) => Boolean(raw[k]) || Boolean(docs[k]));
}

function normalizeMode(v: unknown): PmMode {
  const s = str(v).toUpperCase().replace(/[\s-]/g, "_");
  if (s.includes("BOTH")) return "BOTH";
  if (s.includes("INTER")) return "INTERCITY";
  if (s.includes("LOCAL")) return "LOCAL";
  return "—";
}

function isPmPartner(raw: Raw): boolean {
  const candidates = [
    raw.onboardingMode,
    raw.serviceType,
    raw.serviceId,
    raw.partnerType,
  ].map((v) => str(v).toUpperCase());
  const services = Array.isArray(raw.approvedServices)
    ? (raw.approvedServices as unknown[]).map((s) => str(s).toUpperCase())
    : [];
  return [...candidates, ...services].some((s) => PM_SERVICE_IDS.includes(s));
}

function mapPartner(raw: Raw): PmPartnerRow {
  const mode = normalizeMode(
    raw.operationMode || raw.serviceMode || raw.moveMode || raw.mode
  );
  const gstin = str(raw.gstin || raw.gstNumber);
  const hasAadhaar = hasDoc(raw, ["aadhaar", "aadhaarUrl", "aadhaarDocument"]);
  const hasPan = hasDoc(raw, ["pan", "panUrl", "panDocument"]);
  const hasBusinessProof = hasDoc(raw, [
    "businessProof",
    "businessProofUrl",
    "businessProofDocument",
  ]);

  const missing: string[] = [];
  if (!hasAadhaar) missing.push("Aadhaar");
  if (!hasPan) missing.push("PAN");
  if (!hasBusinessProof) missing.push("Business proof");
  if ((mode === "INTERCITY" || mode === "BOTH") && !gstin) {
    missing.push("GSTIN / GST certificate");
  }

  const fleet = Array.isArray(raw.fleet)
    ? raw.fleet.length
    : Array.isArray(raw.trucks)
      ? raw.trucks.length
      : num(raw.truckCount, raw.fleetCount);

  const submittedAtMs = toMs(
    raw.kycSubmittedAt || raw.submittedAt || raw.updatedAt || raw.createdAt
  );

  return {
    id: raw.id,
    captainId: str(raw.captainId) || raw.id,
    businessName:
      str(raw.businessName) || str(raw.name) || str(raw.displayName) || "—",
    headName: str(raw.headName) || str(raw.ownerName) || str(raw.name) || "—",
    phone: str(raw.phone) || str(raw.mobile),
    districtName: str(raw.districtName) || str(raw.district) || "—",
    mode,
    verificationStatus:
      str(raw.verificationStatus || raw.kycStatus).toUpperCase() || "DRAFT",
    rejectionReason: str(raw.rejectionReason),
    trucks: fleet,
    helpers: num(raw.helperCount, raw.helpersCount, raw.crewCount),
    gstin,
    hasAadhaar,
    hasPan,
    hasBusinessProof,
    submittedAtMs,
    submittedAtLabel: formatMs(submittedAtMs),
    hoursInQueue: submittedAtMs
      ? Math.max(0, (Date.now() - submittedAtMs) / 3600000)
      : 0,
    missingDocs: missing,
  };
}

function mapJob(raw: Raw): PmJobRow | null {
  const serviceId = str(
    raw.serviceId || raw.serviceType || raw.service
  ).toUpperCase();
  if (!PM_SERVICE_IDS.includes(serviceId)) return null;

  const pay = (raw.payment ?? raw.paymentSplit ?? {}) as Record<
    string,
    unknown
  >;
  const fin = (raw.financialSnapshot ?? {}) as Record<string, unknown>;
  const createdAtMs = toMs(raw.createdAt);

  return {
    id: raw.id,
    rideId: str(raw.rideId || raw.jobId) || raw.id,
    status: str(raw.status).toUpperCase() || "REQUESTED",
    captainId: str(raw.captainId),
    userId: str(raw.userId),
    moveType: str(raw.moveType || raw.operationMode).toUpperCase() || "—",
    pickupLabel: placeLabel(raw.pickup || raw.pickupLocation),
    dropLabel: placeLabel(raw.drop || raw.dropLocation || raw.destination),
    totalPaise: num(raw.totalPaise, fin.totalAmountPaise, raw.farePaise),
    startPaid: flag(
      raw.startPaid,
      raw.stage1Paid,
      raw.firstHalfPaid,
      pay.stage1Status,
      pay.startStatus
    ),
    endPaid: flag(
      raw.endPaid,
      raw.stage2Paid,
      raw.secondHalfPaid,
      pay.stage2Status,
      pay.endStatus
    ),
    pinVerified: flag(raw.pinVerified, raw.customerPinVerified),
    createdAtMs,
    createdAtLabel: formatMs(createdAtMs),
  };
}

export function useJuRidePackersMovers(pollMs = 45000) {
  const [partners, setPartners] = useState<PmPartnerRow[]>([]);
  const [jobs, setJobs] = useState<PmJobRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setPartners([]);
      setJobs([]);
      setLoading(false);
      return;
    }

    try {
      const [captainDocs, rideDocs] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.RIDES,
          [],
          undefined,
          500
        ),
      ]);

      setPartners(
        captainDocs
          .filter((d) => isPmPartner(d as Raw))
          .map((d) => mapPartner(d as Raw))
          .sort((a, b) => b.submittedAtMs - a.submittedAtMs)
      );
      setJobs(
        rideDocs
          .map((d) => mapJob(d as Raw))
          .filter((j): j is PmJobRow => j !== null)
          .sort((a, b) => b.createdAtMs - a.createdAtMs)
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load Packers & Movers data."
      );
      setPartners([]);
      setJobs([]);
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

  const approvePartner = useCallback(
    async (id: string) => {
      setActionId(id);
      setError(null);
      try {
        await updateDocument(FIRESTORE_COLLECTIONS.CAPTAINS, id, {
          verificationStatus: "ACTIVE",
          rejectionReason: "",
          reviewedAt: new Date().toISOString(),
        });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Approval failed.");
      } finally {
        setActionId(null);
      }
    },
    [load]
  );

  const rejectPartner = useCallback(
    async (id: string, reason: string) => {
      setActionId(id);
      setError(null);
      try {
        await updateDocument(FIRESTORE_COLLECTIONS.CAPTAINS, id, {
          verificationStatus: "REJECTED",
          rejectionReason: reason,
          reviewedAt: new Date().toISOString(),
        });
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Rejection failed.");
      } finally {
        setActionId(null);
      }
    },
    [load]
  );

  const summary = useMemo(() => {
    const queue = partners.filter((p) =>
      ["SUBMITTED", "PENDING"].includes(p.verificationStatus)
    );
    const terminal = new Set(["COMPLETED", "CANCELLED", "REJECTED", "SETTLED"]);
    return {
      partners: partners.length,
      active: partners.filter((p) => p.verificationStatus === "ACTIVE").length,
      queue: queue.length,
      slaBreached: queue.filter((p) => p.hoursInQueue > PM_SLA_HOURS).length,
      jobs: jobs.length,
      jobsActive: jobs.filter((j) => !terminal.has(j.status)).length,
      jobValuePaise: jobs.reduce((a, j) => a + j.totalPaise, 0),
    };
  }, [partners, jobs]);

  return {
    partners,
    jobs,
    summary,
    loading,
    error,
    actionId,
    refresh: load,
    approvePartner,
    rejectPartner,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuRidePackersMovers;