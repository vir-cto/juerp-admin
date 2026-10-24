"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export type ModuleId =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export type HealthStatus = "HEALTHY" | "WARNING" | "CRITICAL";

export type ModuleHealth = {
  moduleId: ModuleId;
  name: string;
  activeOrders: number;
  pendingPayments: number;
  activeVendors: number;
  activeCaptains: number;
  health: HealthStatus;
};

export type RecentActivity = {
  id: string;
  action: string;
  entity: string;
  referenceId: string;
  actor: string;
  status: "SUCCESS" | "WARNING" | "PENDING";
  timestamp: string;
};

export type DashboardStats = {
  totalActiveOrders: number;
  totalPendingPayments: number;
  totalActiveVendors: number;
  totalActiveCaptains: number;
  modules: ModuleHealth[];
  recentActivity: RecentActivity[];
};

const MODULE_META: Array<{ moduleId: ModuleId; name: string }> = [
  { moduleId: "JUCART", name: "JuCart" },
  { moduleId: "JURIDE", name: "JuRide" },
  { moduleId: "JUSTAY", name: "JuStay" },
  { moduleId: "JUHOME", name: "JuHome" },
  { moduleId: "JUSHOPPING", name: "JuShopping" },
];

const ACTIVE_ORDER_STATUSES = new Set([
  "CREATED",
  "PAYMENT_PENDING",
  "PAID",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "ASSIGNED",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
]);

function formatTimestamp(value: unknown): string {
  if (!value) return "—";

  let date: Date | null = null;

  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      date = (value as { toDate: () => Date }).toDate();
    } catch {
      date = null;
    }
  } else if (value instanceof Date) {
    date = value;
  } else if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) date = parsed;
  }

  if (!date) return "—";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function mapAuditStatus(value: unknown): RecentActivity["status"] {
  const status = String(value ?? "").toUpperCase();
  if (status === "FAILED" || status === "REJECTED" || status === "WARNING") {
    return "WARNING";
  }
  if (status === "PENDING") return "PENDING";
  return "SUCCESS";
}

function deriveHealth(activeOrders: number, pendingPayments: number): HealthStatus {
  if (pendingPayments > 20 || activeOrders > 500) return "CRITICAL";
  if (pendingPayments > 10 || activeOrders > 200) return "WARNING";
  return "HEALTHY";
}

const EMPTY_STATS: DashboardStats = {
  totalActiveOrders: 0,
  totalPendingPayments: 0,
  totalActiveVendors: 0,
  totalActiveCaptains: 0,
  modules: MODULE_META.map((m) => ({
    ...m,
    activeOrders: 0,
    pendingPayments: 0,
    activeVendors: 0,
    activeCaptains: 0,
    health: "HEALTHY",
  })),
  recentActivity: [],
};

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setStats(EMPTY_STATS);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      const [orders, vendors, captains, payments, audits] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.ORDERS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.VENDORS,
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
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.PAYMENTS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.AUDIT_LOGS,
          [],
          { fieldPath: "createdAt", direction: "desc" },
          10
        ).catch(() =>
          getFilteredCollection<Record<string, unknown>>(
            FIRESTORE_COLLECTIONS.AUDIT_LOGS,
            [],
            undefined,
            10
          )
        ),
      ]);

      const activeOrders = orders.filter((o) =>
        ACTIVE_ORDER_STATUSES.has(String(o.status ?? "").toUpperCase())
      );

      const pendingPayments = payments.filter((p) => {
        const s = String(p.status ?? "").toUpperCase();
        return s === "PENDING" || s === "CREATED" || s === "PAYMENT_PENDING";
      });

      const activeVendors = vendors.filter((v) => {
        const s = String(
          v.verificationStatus ?? v.status ?? ""
        ).toUpperCase();
        return s === "ACTIVE";
      });

      const activeCaptains = captains.filter((c) => {
        const verification = String(c.verificationStatus ?? "").toUpperCase();
        const online = String(c.onlineStatus ?? "").toUpperCase();
        return verification === "ACTIVE" || online === "ONLINE";
      });

      const modules: ModuleHealth[] = MODULE_META.map((meta) => {
        const moduleOrders = activeOrders.filter(
          (o) => String(o.moduleId ?? o.module ?? "").toUpperCase() === meta.moduleId
        );
        const moduleVendors = activeVendors.filter(
          (v) => String(v.moduleId ?? "").toUpperCase() === meta.moduleId
        );
        // Captains are often service-scoped; if no module field, count only in JUCART/JURIDE buckets as 0 elsewhere
        const moduleCaptains = activeCaptains.filter((c) => {
          const mid = String(c.moduleId ?? c.serviceId ?? "").toUpperCase();
          if (!mid) return false;
          return mid === meta.moduleId || mid.startsWith(meta.moduleId);
        });
        const modulePending = pendingPayments.filter((p) => {
          const mid = String(p.moduleId ?? "").toUpperCase();
          return mid === meta.moduleId;
        });

        return {
          ...meta,
          activeOrders: moduleOrders.length,
          pendingPayments: modulePending.length,
          activeVendors: moduleVendors.length,
          activeCaptains: moduleCaptains.length,
          health: deriveHealth(moduleOrders.length, modulePending.length),
        };
      });

      const recentActivity: RecentActivity[] = audits.map((a) => ({
        id: a.id,
        action: String(a.action ?? a.description ?? "System event"),
        entity: String(a.entityType ?? a.entity ?? "SYSTEM"),
        referenceId: String(a.entityId ?? a.referenceId ?? a.correlationId ?? a.id),
        actor: String(a.actorName ?? a.actorUid ?? a.actorType ?? "SYSTEM"),
        status: mapAuditStatus(a.status),
        timestamp: formatTimestamp(a.createdAt),
      }));

      setStats({
        totalActiveOrders: activeOrders.length,
        totalPendingPayments: pendingPayments.length,
        totalActiveVendors: activeVendors.length,
        totalActiveCaptains: activeCaptains.length,
        modules,
        recentActivity,
      });
    } catch (err) {
      console.error("Dashboard stats error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data from Firestore."
      );
      setStats(EMPTY_STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    stats,
    loading,
    error,
    demoMode,
    refresh: load,
  };
}

export default useDashboardStats;