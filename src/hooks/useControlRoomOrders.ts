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

export type OrderStatus =
  | "CREATED"
  | "PAYMENT_PENDING"
  | "PAID"
  | "ACCEPTED"
  | "PREPARING"
  | "READY"
  | "ASSIGNED"
  | "PICKED_UP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "SETTLED"
  | "CANCELLED"
  | "FAILED"
  | string;

export type ControlRoomOrder = {
  id: string;
  moduleId: ModuleId | "UNKNOWN";
  status: string;
  customerId: string;
  vendorId: string;
  captainId: string;
  paymentStatus: string;
  amount: number;
  createdAtLabel: string;
  updatedAtLabel: string;
  createdAtMs: number;
  updatedAtMs: number;
  isBottleneck: boolean;
  bottleneckReason: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
};

export type BottleneckGroup = {
  id: string;
  title: string;
  description: string;
  module: ModuleId | "PLATFORM";
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "INVESTIGATING" | "MONITORING" | "RESOLVED";
  affectedCount: number;
  affectedEntity: string;
  detectedAt: string;
  lastUpdated: string;
  owner: string;
  orderIds: string[];
};

const MODULES: ModuleId[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
];

const ACTIVE_STATUSES = new Set([
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

function asModuleId(value: unknown): ModuleId | "UNKNOWN" {
  const v = String(value ?? "").toUpperCase();
  return (MODULES as string[]).includes(v) ? (v as ModuleId) : "UNKNOWN";
}

function timestampMs(value: unknown): number {
  if (!value) return 0;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    try {
      return (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      return 0;
    }
  }
  if (value instanceof Date) return value.getTime();
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? 0 : d.getTime();
  }
  return 0;
}

function formatLabel(ms: number): string {
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function money(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function classifyBottleneck(order: {
  status: string;
  captainId: string;
  vendorId: string;
  paymentStatus: string;
}): { isBottleneck: boolean; reason: string; severity: ControlRoomOrder["severity"] } {
  const status = order.status.toUpperCase();
  const pay = order.paymentStatus.toUpperCase();

  if (status === "PAYMENT_PENDING" || pay === "PENDING" || pay === "PAYMENT_PENDING") {
    return {
      isBottleneck: true,
      reason: "Payment pending confirmation",
      severity: "MEDIUM",
    };
  }

  if (status === "READY" && !order.captainId) {
    return {
      isBottleneck: true,
      reason: "READY without captain assignment",
      severity: "CRITICAL",
    };
  }

  if (status === "ASSIGNED" && !order.captainId) {
    return {
      isBottleneck: true,
      reason: "ASSIGNED missing captain reference",
      severity: "HIGH",
    };
  }

  if (
    (status === "CREATED" || status === "PAID") &&
    !order.vendorId
  ) {
    return {
      isBottleneck: true,
      reason: "Order missing vendor assignment",
      severity: "HIGH",
    };
  }

  if (status === "OUT_FOR_DELIVERY") {
    // Flag long-running OFD only if we had age; treat as monitoring signal lightly
    return {
      isBottleneck: false,
      reason: "",
      severity: "LOW",
    };
  }

  if (status === "ACCEPTED" || status === "PREPARING") {
    return { isBottleneck: false, reason: "", severity: "LOW" };
  }

  return { isBottleneck: false, reason: "", severity: "LOW" };
}

function mapOrder(raw: Record<string, unknown> & { id: string }): ControlRoomOrder {
  const status = String(raw.status ?? "UNKNOWN");
  const captainId = String(raw.captainId ?? "");
  const vendorId = String(raw.vendorId ?? "");
  const paymentStatus = String(
    raw.paymentStatus ?? raw.payment_status ?? ""
  );
  const createdAtMs = timestampMs(raw.createdAt);
  const updatedAtMs = timestampMs(raw.updatedAt) || createdAtMs;
  const bottleneck = classifyBottleneck({
    status,
    captainId,
    vendorId,
    paymentStatus,
  });

  return {
    id: raw.id,
    moduleId: asModuleId(raw.moduleId ?? raw.module),
    status,
    customerId: String(raw.customerId ?? raw.userId ?? "—"),
    vendorId: vendorId || "—",
    captainId: captainId || "—",
    paymentStatus: paymentStatus || "—",
    amount: money(raw.totalAmount ?? raw.amount ?? raw.payableAmount),
    createdAtLabel: formatLabel(createdAtMs),
    updatedAtLabel: formatLabel(updatedAtMs),
    createdAtMs,
    updatedAtMs,
    isBottleneck: bottleneck.isBottleneck,
    bottleneckReason: bottleneck.reason,
    severity: bottleneck.severity,
  };
}

function buildBottleneckGroups(orders: ControlRoomOrder[]): BottleneckGroup[] {
  const bottleneckOrders = orders.filter((o) => o.isBottleneck);
  const groups = new Map<string, BottleneckGroup>();

  for (const order of bottleneckOrders) {
    const key = `${order.moduleId}::${order.bottleneckReason}`;
    const existing = groups.get(key);
    const nowLabel = order.updatedAtLabel;

    if (existing) {
      existing.affectedCount += 1;
      existing.orderIds.push(order.id);
      if (order.updatedAtMs > timestampMs(existing.lastUpdated)) {
        existing.lastUpdated = nowLabel;
      }
      // escalate severity if any member is higher
      const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      if (rank[order.severity] > rank[existing.severity]) {
        existing.severity = order.severity;
      }
      continue;
    }

    const owner =
      order.bottleneckReason.includes("Payment")
        ? "Payments"
        : order.bottleneckReason.includes("captain")
          ? "Dispatch"
          : "Operations";

    groups.set(key, {
      id: `BN-${order.moduleId}-${groups.size + 1}`,
      title: order.bottleneckReason,
      description: `${order.bottleneckReason} detected on live order status in ${order.moduleId}.`,
      module: order.moduleId === "UNKNOWN" ? "PLATFORM" : order.moduleId,
      severity: order.severity,
      status: order.severity === "CRITICAL" ? "OPEN" : "MONITORING",
      affectedCount: 1,
      affectedEntity: "Orders",
      detectedAt: order.createdAtLabel,
      lastUpdated: nowLabel,
      owner,
      orderIds: [order.id],
    });
  }

  return Array.from(groups.values()).sort((a, b) => {
    const rank = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
    return rank[b.severity] - rank[a.severity];
  });
}

export function useControlRoomOrders(pollMs = 15000) {
  const [orders, setOrders] = useState<ControlRoomOrder[]>([]);
  const [activeOrders, setActiveOrders] = useState<ControlRoomOrder[]>([]);
  const [bottleneckGroups, setBottleneckGroups] = useState<BottleneckGroup[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setOrders([]);
      setActiveOrders([]);
      setBottleneckGroups([]);
      setLoading(false);
      setLastRefreshedAt(Date.now());
      return;
    }

    setDemoMode(false);

    try {
      const raw = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.ORDERS,
        [],
        undefined,
        500
      );

      const mapped = raw.map((doc) => mapOrder(doc));
      const active = mapped.filter((o) =>
        ACTIVE_STATUSES.has(o.status.toUpperCase())
      );
      const groups = buildBottleneckGroups(mapped);

      setOrders(mapped);
      setActiveOrders(active);
      setBottleneckGroups(groups);
      setLastRefreshedAt(Date.now());
    } catch (err) {
      console.error("useControlRoomOrders error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load orders from Firestore."
      );
      setOrders([]);
      setActiveOrders([]);
      setBottleneckGroups([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  return {
    orders,
    activeOrders,
    bottleneckGroups,
    loading,
    error,
    demoMode,
    lastRefreshedAt,
    refresh: load,
  };
}

export default useControlRoomOrders;