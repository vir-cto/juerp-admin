"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  MODULE_JUCART,
  type JuCartServiceId,
  JUCART_SERVICES,
} from "@/lib/constants/modules";
import {
  isOrderStatus,
  type OrderStatus,
} from "@/types/order";

export type JuCartOrderRow = {
  id: string;
  orderId: string;
  userId: string;
  vendorId: string;
  captainId: string;
  moduleId: string;
  service: string;
  status: OrderStatus | string;
  paymentStatus: string;
  totalPaise: number;
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

function mapOrder(
  raw: Record<string, unknown> & { id: string }
): JuCartOrderRow | null {
  const moduleId = str(raw.moduleId || raw.module).toUpperCase();
  if (moduleId && moduleId !== MODULE_JUCART) return null;

  // If module missing, still include when service is a JuCart service
  const service = str(raw.service || raw.serviceId || raw.orderService).toUpperCase();
  if (!moduleId && service && !JUCART_SERVICES.includes(service as JuCartServiceId)) {
    return null;
  }
  if (!moduleId && !service) {
    // Prefer only explicit JUCART when possible; skip ambiguous rows
    return null;
  }

  const statusRaw = str(raw.status).toUpperCase();
  const status = isOrderStatus(statusRaw) ? statusRaw : statusRaw || "CREATED";

  const totalPaise =
    typeof raw.totalPaise === "number"
      ? raw.totalPaise
      : typeof (raw.financialSnapshot as { totalAmountPaise?: number })
            ?.totalAmountPaise === "number"
        ? (raw.financialSnapshot as { totalAmountPaise: number }).totalAmountPaise
        : 0;

  return {
    id: raw.id,
    orderId: str(raw.orderId) || raw.id,
    userId: str(raw.userId),
    vendorId: str(raw.vendorId) || (Array.isArray(raw.vendorIds) ? str(raw.vendorIds[0]) : ""),
    captainId: str(raw.captainId),
    moduleId: moduleId || MODULE_JUCART,
    service: service || "—",
    status,
    paymentStatus: str(raw.paymentStatus).toUpperCase() || "—",
    totalPaise,
    stateId: str(raw.stateId),
    districtId: str(raw.districtId),
    createdAtLabel: formatTs(raw.createdAt),
    updatedAtLabel: formatTs(raw.updatedAt),
  };
}

export function useJuCartOrders(pollMs = 45000) {
  const [orders, setOrders] = useState<JuCartOrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.ORDERS,
        [],
        undefined,
        500
      );

      const mapped = docs
        .map((d) => mapOrder(d as Record<string, unknown> & { id: string }))
        .filter((o): o is JuCartOrderRow => o !== null)
        .sort((a, b) => b.createdAtLabel.localeCompare(a.createdAtLabel));

      setOrders(mapped);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load JuCart orders."
      );
      setOrders([]);
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

  const getOrderById = useCallback(async (orderId: string) => {
    if (isFirestoreDemoMode) return null;
    const doc = await getDocument<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.ORDERS,
      orderId
    );
    if (!doc) return null;
    return mapOrder(doc as Record<string, unknown> & { id: string });
  }, []);

  const summary = useMemo(() => {
    const active = orders.filter(
      (o) => !["SETTLED", "CANCELLED", "REJECTED", "NONE"].includes(o.status)
    );
    return {
      total: orders.length,
      active: active.length,
      food: orders.filter((o) => o.service === "FOOD").length,
      mart: orders.filter((o) => o.service === "MART").length,
      pharmacy: orders.filter((o) => o.service === "PHARMACY").length,
      paymentPending: orders.filter(
        (o) =>
          o.status === "PAYMENT_PENDING" || o.paymentStatus === "PENDING"
      ).length,
    };
  }, [orders]);

  return {
    orders,
    summary,
    loading,
    error,
    refresh: load,
    getOrderById,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useJuCartOrders;