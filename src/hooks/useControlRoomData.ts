// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// export type OperationalStatus =
//   | "HEALTHY"
//   | "MONITORING"
//   | "ATTENTION"
//   | "CRITICAL";

// export type ModuleHealth = {
//   module: ModuleId;
//   activeOrders: number;
//   pendingPayments: number;
//   dispatchQueue: number;
//   bottlenecks: number;
//   status: OperationalStatus;
// };

// export type ActivityItem = {
//   id: string;
//   title: string;
//   description: string;
//   module: ModuleId | "SYSTEM";
//   time: string;
//   severity: "INFO" | "WARNING" | "CRITICAL";
// };

// export type ControlRoomData = {
//   modules: ModuleHealth[];
//   totalActiveOrders: number;
//   totalPendingPayments: number;
//   totalDispatchQueue: number;
//   totalBottlenecks: number;
//   criticalActivities: number;
//   recentActivity: ActivityItem[];
//   systemHealth: "GOOD" | "ATTENTION" | "CRITICAL";
// };

// const MODULES: ModuleId[] = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// const ACTIVE_ORDER_STATUSES = new Set([
//   "CREATED",
//   "PAYMENT_PENDING",
//   "PAID",
//   "ACCEPTED",
//   "PREPARING",
//   "READY",
//   "ASSIGNED",
//   "PICKED_UP",
//   "OUT_FOR_DELIVERY",
//   "DELIVERED",
// ]);

// const DISPATCH_STATUSES = new Set(["READY", "ASSIGNED"]);

// const BOTTLENECK_STATUSES = new Set([
//   "PAYMENT_PENDING",
//   "READY",
//   "ASSIGNED",
// ]);

// function asModuleId(value: unknown): ModuleId | null {
//   const v = String(value ?? "").toUpperCase();
//   return (MODULES as string[]).includes(v) ? (v as ModuleId) : null;
// }

// function deriveStatus(
//   activeOrders: number,
//   pendingPayments: number,
//   dispatchQueue: number,
//   bottlenecks: number
// ): OperationalStatus {
//   if (bottlenecks >= 5 || pendingPayments >= 15) return "CRITICAL";
//   if (bottlenecks >= 2 || pendingPayments >= 5 || dispatchQueue >= 8) {
//     return "ATTENTION";
//   }
//   if (activeOrders > 0 || dispatchQueue > 0) return "MONITORING";
//   return "HEALTHY";
// }

// function formatRelativeTime(value: unknown): string {
//   let ms = 0;

//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }

//   if (!ms) return "—";

//   const diffSec = Math.max(0, Math.floor((Date.now() - ms) / 1000));
//   if (diffSec < 60) return `${diffSec} sec ago`;
//   if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
//   if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hr ago`;
//   return `${Math.floor(diffSec / 86400)} day ago`;
// }

// function mapSeverity(status: unknown): ActivityItem["severity"] {
//   const s = String(status ?? "").toUpperCase();
//   if (s === "FAILED" || s === "REJECTED" || s === "CRITICAL") return "CRITICAL";
//   if (s === "WARNING" || s === "PENDING") return "WARNING";
//   return "INFO";
// }

// const EMPTY: ControlRoomData = {
//   modules: MODULES.map((module) => ({
//     module,
//     activeOrders: 0,
//     pendingPayments: 0,
//     dispatchQueue: 0,
//     bottlenecks: 0,
//     status: "HEALTHY",
//   })),
//   totalActiveOrders: 0,
//   totalPendingPayments: 0,
//   totalDispatchQueue: 0,
//   totalBottlenecks: 0,
//   criticalActivities: 0,
//   recentActivity: [],
//   systemHealth: "GOOD",
// };

// export function useControlRoomData(pollMs = 15000) {
//   const [data, setData] = useState<ControlRoomData>(EMPTY);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [lastRefreshedAt, setLastRefreshedAt] = useState<number | null>(null);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setData(EMPTY);
//       setLoading(false);
//       setLastRefreshedAt(Date.now());
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [orders, payments, audits] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ORDERS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.PAYMENTS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.AUDIT_LOGS,
//           [],
//           { fieldPath: "createdAt", direction: "desc" },
//           12
//         ).catch(() =>
//           getFilteredCollection<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.AUDIT_LOGS,
//             [],
//             undefined,
//             12
//           )
//         ),
//       ]);

//       const modules: ModuleHealth[] = MODULES.map((module) => {
//         const moduleOrders = orders.filter(
//           (o) => asModuleId(o.moduleId ?? o.module) === module
//         );

//         const activeOrders = moduleOrders.filter((o) =>
//           ACTIVE_ORDER_STATUSES.has(String(o.status ?? "").toUpperCase())
//         );

//         const dispatchQueue = moduleOrders.filter((o) =>
//           DISPATCH_STATUSES.has(String(o.status ?? "").toUpperCase())
//         );

//         const bottlenecks = moduleOrders.filter((o) => {
//           const status = String(o.status ?? "").toUpperCase();
//           if (!BOTTLENECK_STATUSES.has(status)) return false;
//           // READY without captain is a bottleneck signal
//           if (status === "READY" && !o.captainId) return true;
//           if (status === "PAYMENT_PENDING") return true;
//           if (status === "ASSIGNED" && !o.deliveryId) return true;
//           return false;
//         });

//         const pendingPayments = payments.filter((p) => {
//           const mid = asModuleId(p.moduleId ?? p.module);
//           const status = String(p.status ?? "").toUpperCase();
//           const isPending =
//             status === "PENDING" ||
//             status === "CREATED" ||
//             status === "PAYMENT_PENDING";
//           return isPending && (mid === module || !mid);
//         });

//         // Attribute unscoped pending payments only once (to JUCART) to avoid double-count
//         const pendingForModule =
//           module === "JUCART"
//             ? payments.filter((p) => {
//                 const status = String(p.status ?? "").toUpperCase();
//                 return (
//                   status === "PENDING" ||
//                   status === "CREATED" ||
//                   status === "PAYMENT_PENDING"
//                 );
//               }).filter((p) => {
//                 const mid = asModuleId(p.moduleId ?? p.module);
//                 return !mid || mid === "JUCART";
//               }).length
//             : payments.filter((p) => {
//                 const status = String(p.status ?? "").toUpperCase();
//                 const isPending =
//                   status === "PENDING" ||
//                   status === "CREATED" ||
//                   status === "PAYMENT_PENDING";
//                 return isPending && asModuleId(p.moduleId ?? p.module) === module;
//               }).length;

//         return {
//           module,
//           activeOrders: activeOrders.length,
//           pendingPayments: pendingForModule,
//           dispatchQueue: dispatchQueue.length,
//           bottlenecks: bottlenecks.length,
//           status: deriveStatus(
//             activeOrders.length,
//             pendingForModule,
//             dispatchQueue.length,
//             bottlenecks.length
//           ),
//         };
//       });

//       const totalActiveOrders = modules.reduce((s, m) => s + m.activeOrders, 0);
//       const totalPendingPayments = modules.reduce(
//         (s, m) => s + m.pendingPayments,
//         0
//       );
//       const totalDispatchQueue = modules.reduce(
//         (s, m) => s + m.dispatchQueue,
//         0
//       );
//       const totalBottlenecks = modules.reduce((s, m) => s + m.bottlenecks, 0);

//       const recentActivity: ActivityItem[] = audits.map((a) => {
//         const module =
//           asModuleId(a.module ?? a.moduleId) ?? ("SYSTEM" as const);
//         const action = String(a.action ?? a.description ?? "Operational event");
//         const entity = String(a.entityType ?? a.entity ?? "SYSTEM");
//         const ref = String(
//           a.entityId ?? a.referenceId ?? a.correlationId ?? a.id
//         );

//         return {
//           id: a.id,
//           title: action,
//           description: `${entity}${ref ? ` · ${ref}` : ""}`,
//           module,
//           time: formatRelativeTime(a.createdAt),
//           severity: mapSeverity(a.status),
//         };
//       });

//       // Synthetic ops signals when queues are non-zero (not fake metrics — derived from live counts)
//       if (totalBottlenecks > 0) {
//         recentActivity.unshift({
//           id: "derived-bottleneck",
//           title: "Operational bottlenecks detected",
//           description: `${totalBottlenecks} order(s) in bottleneck states (payment pending / ready without captain / assigned incomplete).`,
//           module: "SYSTEM",
//           time: "just now",
//           severity: totalBottlenecks >= 5 ? "CRITICAL" : "WARNING",
//         });
//       }

//       const criticalActivities = recentActivity.filter(
//         (a) => a.severity === "CRITICAL"
//       ).length;

//       let systemHealth: ControlRoomData["systemHealth"] = "GOOD";
//       if (totalBottlenecks >= 5 || totalPendingPayments >= 15) {
//         systemHealth = "CRITICAL";
//       } else if (totalBottlenecks > 0 || totalPendingPayments > 5) {
//         systemHealth = "ATTENTION";
//       }

//       setData({
//         modules,
//         totalActiveOrders,
//         totalPendingPayments,
//         totalDispatchQueue,
//         totalBottlenecks,
//         criticalActivities,
//         recentActivity: recentActivity.slice(0, 12),
//         systemHealth,
//       });
//       setLastRefreshedAt(Date.now());
//     } catch (err) {
//       console.error("Control room data error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load control room data from Firestore."
//       );
//       setData(EMPTY);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return {
//     data,
//     loading,
//     error,
//     demoMode,
//     lastRefreshedAt,
//     refresh: load,
//   };
// }

// export default useControlRoomData;


"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  getCountFromServer,
  type Query,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { AuthRole } from "@/hooks/useAuthScope";

export type ModuleId =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export type OperationalStatus =
  | "HEALTHY"
  | "MONITORING"
  | "ATTENTION"
  | "CRITICAL";

export type ActivityItem = {
  id: string;
  title: string;
  description: string;
  module: ModuleId | "SYSTEM";
  severity: "INFO" | "WARNING" | "CRITICAL";
  time: string;
};

export type ModuleHealth = {
  module: ModuleId;
  activeOrders: number;
  pendingPayments: number;
  dispatchQueue: number;
  bottlenecks: number;
  status: OperationalStatus;
};

export type ControlRoomData = {
  totalActiveOrders: number;
  totalPendingPayments: number;
  totalDispatchQueue: number;
  totalBottlenecks: number;
  systemHealth: "GOOD" | "ATTENTION" | "CRITICAL";
  criticalActivities: number;
  modules: ModuleHealth[];
  recentActivity: ActivityItem[];
};

type ScopeFilter = {
  stateId: string | null;
  districtId: string | null;
  role: AuthRole | null;
};

const MODULES: ModuleId[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
];

const ACTIVE_STATUSES = [
  "CREATED",
  "PAYMENT_PENDING",
  "PAID",
  "ACCEPTED",
  "PREPARING",
  "READY",
  "ASSIGNED",
  "PICKED_UP",
  "OUT_FOR_DELIVERY",
];

const DISPATCH_STATUSES = ["PAID", "READY", "ACCEPTED", "ASSIGNED"];

function applyScope(
  base: Query<DocumentData>,
  scope?: ScopeFilter,
): Query<DocumentData> {
  if (!scope?.role) return base;

  if (scope.role === "DISTRICT_ADMIN" && scope.districtId) {
    return query(base, where("districtId", "==", scope.districtId));
  }
  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return query(base, where("stateId", "==", scope.stateId));
  }
  return base;
}

function deriveHealth(
  active: number,
  pendingPay: number,
  dispatch: number,
  bottlenecks: number,
): OperationalStatus {
  if (bottlenecks >= 5 || pendingPay >= 20) return "CRITICAL";
  if (bottlenecks >= 2 || pendingPay >= 8 || dispatch >= 15) return "ATTENTION";
  if (active > 0 || dispatch > 0) return "MONITORING";
  return "HEALTHY";
}

function deriveSystemHealth(
  modules: ModuleHealth[],
): "GOOD" | "ATTENTION" | "CRITICAL" {
  if (modules.some((m) => m.status === "CRITICAL")) return "CRITICAL";
  if (modules.some((m) => m.status === "ATTENTION")) return "ATTENTION";
  return "GOOD";
}

function formatRelative(ts: { toDate?: () => Date } | null | undefined): string {
  if (!ts?.toDate) return "—";
  const d = ts.toDate();
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return d.toLocaleDateString("en-IN");
}

const EMPTY: ControlRoomData = {
  totalActiveOrders: 0,
  totalPendingPayments: 0,
  totalDispatchQueue: 0,
  totalBottlenecks: 0,
  systemHealth: "GOOD",
  criticalActivities: 0,
  modules: MODULES.map((m) => ({
    module: m,
    activeOrders: 0,
    pendingPayments: 0,
    dispatchQueue: 0,
    bottlenecks: 0,
    status: "HEALTHY",
  })),
  recentActivity: [],
};

export default function useControlRoomData(
  _pollMs = 15000,
  scope?: ScopeFilter,
) {
  const [data, setData] = useState<ControlRoomData>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number | null>(null);

  const loadCounts = useCallback(async () => {
    try {
      setError(null);

      const moduleStats: ModuleHealth[] = [];

      for (const moduleId of MODULES) {
        let activeQ = query(
          collection(db, "orders"),
          where("module", "==", moduleId),
          where("status", "in", ACTIVE_STATUSES),
        );
        activeQ = applyScope(activeQ, scope) as typeof activeQ;

        let dispatchQ = query(
          collection(db, "orders"),
          where("module", "==", moduleId),
          where("status", "in", DISPATCH_STATUSES),
        );
        dispatchQ = applyScope(dispatchQ, scope) as typeof dispatchQ;

        let payQ = query(
          collection(db, "orders"),
          where("module", "==", moduleId),
          where("status", "==", "PAYMENT_PENDING"),
        );
        payQ = applyScope(payQ, scope) as typeof payQ;

        // Bottleneck = READY/ASSIGNED older than ~20 min is approximate;
        // we count READY without captain as bottleneck signal
        let bottleneckQ = query(
          collection(db, "orders"),
          where("module", "==", moduleId),
          where("status", "in", ["READY", "PAID", "ACCEPTED"]),
          where("captainId", "==", null),
        );
        bottleneckQ = applyScope(bottleneckQ, scope) as typeof bottleneckQ;

        const [activeSnap, dispatchSnap, paySnap, bottleneckSnap] =
          await Promise.all([
            getCountFromServer(activeQ).catch(() => null),
            getCountFromServer(dispatchQ).catch(() => null),
            getCountFromServer(payQ).catch(() => null),
            getCountFromServer(bottleneckQ).catch(() => null),
          ]);

        const activeOrders = activeSnap?.data().count ?? 0;
        const dispatchQueue = dispatchSnap?.data().count ?? 0;
        const pendingPayments = paySnap?.data().count ?? 0;
        const bottlenecks = bottleneckSnap?.data().count ?? 0;

        moduleStats.push({
          module: moduleId,
          activeOrders,
          pendingPayments,
          dispatchQueue,
          bottlenecks,
          status: deriveHealth(
            activeOrders,
            pendingPayments,
            dispatchQueue,
            bottlenecks,
          ),
        });
      }

      const totalActiveOrders = moduleStats.reduce(
        (s, m) => s + m.activeOrders,
        0,
      );
      const totalPendingPayments = moduleStats.reduce(
        (s, m) => s + m.pendingPayments,
        0,
      );
      const totalDispatchQueue = moduleStats.reduce(
        (s, m) => s + m.dispatchQueue,
        0,
      );
      const totalBottlenecks = moduleStats.reduce(
        (s, m) => s + m.bottlenecks,
        0,
      );

      setData((prev) => ({
        ...prev,
        totalActiveOrders,
        totalPendingPayments,
        totalDispatchQueue,
        totalBottlenecks,
        modules: moduleStats,
        systemHealth: deriveSystemHealth(moduleStats),
        criticalActivities: moduleStats.filter((m) => m.status === "CRITICAL")
          .length,
      }));
      setLastRefreshedAt(Date.now());
    } catch (err) {
      console.error("useControlRoomData counts error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load control room counts",
      );
    } finally {
      setLoading(false);
    }
  }, [scope?.role, scope?.stateId, scope?.districtId]);

  // Live activity from audit_logs
  useEffect(() => {
    let activityQ = query(
      collection(db, "audit_logs"),
      orderBy("createdAt", "desc"),
      limit(20),
    );
    activityQ = applyScope(activityQ, scope) as typeof activityQ;

    const unsub = onSnapshot(
      activityQ,
      (snap) => {
        const recentActivity: ActivityItem[] = snap.docs.map((d) => {
          const raw = d.data();
          return {
            id: d.id,
            title: raw.title || raw.action || "Activity",
            description: raw.description || raw.message || "",
            module: (raw.module as ModuleId) || "SYSTEM",
            severity:
              raw.severity === "CRITICAL" || raw.severity === "WARNING"
                ? raw.severity
                : "INFO",
            time: formatRelative(raw.createdAt),
          };
        });

        setData((prev) => ({
          ...prev,
          recentActivity,
          criticalActivities: recentActivity.filter(
            (a) => a.severity === "CRITICAL",
          ).length,
        }));
        setLastRefreshedAt(Date.now());
      },
      (err) => {
        console.warn("audit_logs listener:", err);
        // non-fatal — counts still work
      },
    );

    return () => unsub();
  }, [scope?.role, scope?.stateId, scope?.districtId]);

  // Initial + interval counts
  useEffect(() => {
    void loadCounts();
    const id = setInterval(() => void loadCounts(), Math.max(_pollMs, 10000));
    return () => clearInterval(id);
  }, [loadCounts, _pollMs]);

  return {
    data,
    loading,
    error,
    demoMode: false,
    lastRefreshedAt,
    refresh: loadCounts,
  };
}