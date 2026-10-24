"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export type CustomerStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "SUSPENDED";

export type PaymentStatus =
  | "PAID"
  | "PENDING"
  | "FAILED"
  | "REFUNDED"
  | string;

export type OrderStatus = string;

export type CustomerModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | string;

export type CustomerOrder = {
  orderId: string;
  moduleId: CustomerModule;
  vendorName: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  amountPaise: number;
  createdAt: string;
};

export type Customer = {
  customerId: string;
  uid: string;
  name: string;
  phone: string;
  email: string;
  status: CustomerStatus;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  pincode: string;
  address: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt: string;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalSpentPaise: number;
  orders: CustomerOrder[];
};

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function num(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function timestampLabel(value: unknown): string {
  let ms = 0;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      ms = (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      ms = 0;
    }
  } else if (value instanceof Date) {
    ms = value.getTime();
  } else if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) ms = d.getTime();
  }
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function asStatus(value: unknown): CustomerStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") {
    return s;
  }
  return "ACTIVE";
}

function isCustomerDoc(raw: Record<string, unknown>): boolean {
  const role = String(raw.role ?? raw.userRole ?? raw.userType ?? "")
    .toUpperCase();
  if (role === "CUSTOMER" || role === "USER") return true;
  // If role is explicitly another entity, skip
  if (
    role === "VENDOR" ||
    role === "VENDOR_OWNER" ||
    role === "CAPTAIN" ||
    role === "SUPER_ADMIN" ||
    role === "STATE_ADMIN" ||
    role === "DISTRICT_ADMIN" ||
    role === "TECHNICAL_ADMIN"
  ) {
    return false;
  }
  // Prefer docs with customer-like markers
  if (raw.isCustomer === true) return true;
  // Default: treat as customer if no conflicting role
  return role === "" || role === "CUSTOMER";
}

function mapOrder(raw: Record<string, unknown> & { id: string }): CustomerOrder {
  const amountPaise =
    num(raw.amountPaise) ||
    Math.round(num(raw.totalAmount ?? raw.amount ?? raw.payableAmount) * 100);

  return {
    orderId: raw.id,
    moduleId: str(raw.moduleId ?? raw.module, "JUCART"),
    vendorName: str(raw.vendorName ?? raw.vendorId, "—"),
    status: str(raw.status, "CREATED"),
    paymentStatus: str(raw.paymentStatus ?? raw.payment_status, "—"),
    amountPaise,
    createdAt: timestampLabel(raw.createdAt),
  };
}

function mapCustomer(
  raw: Record<string, unknown> & { id: string },
  orders: CustomerOrder[]
): Customer {
  const completed = orders.filter((o) =>
    ["DELIVERED", "SETTLED", "COMPLETED"].includes(o.status.toUpperCase())
  ).length;
  const cancelled = orders.filter((o) =>
    ["CANCELLED", "REJECTED"].includes(o.status.toUpperCase())
  ).length;
  const spent = orders.reduce((s, o) => s + o.amountPaise, 0);

  const name =
    str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
    [str(raw.firstName, ""), str(raw.lastName, "")].filter(Boolean).join(" ") ||
    "Customer";

  return {
    customerId: str(raw.customerId ?? raw.id, raw.id),
    uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
    name,
    phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
    email: str(raw.email, "—"),
    status: asStatus(raw.status ?? raw.accountStatus),
    stateId: str(raw.stateId, "—"),
    stateName: str(raw.stateName ?? raw.state, "—"),
    districtId: str(raw.districtId, "—"),
    districtName: str(raw.districtName ?? raw.district, "—"),
    pincode: str(raw.pincode ?? raw.pinCode, "—"),
    address: str(raw.address ?? raw.fullAddress, "—"),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt),
    lastActiveAt: timestampLabel(raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt),
    totalOrders: orders.length || num(raw.totalOrders),
    completedOrders: completed || num(raw.completedOrders),
    cancelledOrders: cancelled || num(raw.cancelledOrders),
    totalSpentPaise: spent || num(raw.totalSpentPaise),
    orders,
  };
}

export function useCustomers(pollMs = 20000) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setCustomers([]);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      const [users, orders] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.USERS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.ORDERS,
          [],
          undefined,
          500
        ),
      ]);

      const customerUsers = users.filter(isCustomerDoc);
      const orderByCustomer = new Map<string, CustomerOrder[]>();

      for (const o of orders) {
        const mapped = mapOrder(o);
        const keys = [
          str(o.customerId, ""),
          str(o.userId, ""),
          str(o.uid, ""),
        ].filter((k) => k && k !== "—");

        for (const key of keys) {
          const list = orderByCustomer.get(key) ?? [];
          list.push(mapped);
          orderByCustomer.set(key, list);
        }
      }

      const mappedCustomers = customerUsers.map((u) => {
        const keys = [u.id, str(u.uid, ""), str(u.customerId, "")];
        let userOrders: CustomerOrder[] = [];
        for (const key of keys) {
          if (key && orderByCustomer.has(key)) {
            userOrders = orderByCustomer.get(key) ?? [];
            break;
          }
        }
        return mapCustomer(u, userOrders);
      });

      setCustomers(mappedCustomers);
    } catch (err) {
      console.error("useCustomers error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load customers from Firestore."
      );
      setCustomers([]);
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
    customers,
    loading,
    error,
    demoMode,
    refresh: load,
  };
}

export function useCustomer(customerId: string | undefined) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    if (!customerId) {
      setCustomer(null);
      setLoading(false);
      return;
    }

    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setCustomer(null);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      let user =
        (await getDocument<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.USERS,
          customerId
        )) ?? null;

      // Fallback: scan users if doc id differs from customerId field
      if (!user) {
        const users = await getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.USERS,
          [],
          undefined,
          500
        );
        const found = users.find(
          (u) =>
            u.id === customerId ||
            str(u.customerId, "") === customerId ||
            str(u.uid, "") === customerId
        );
        user = found ?? null;
      }

      if (!user) {
        setCustomer(null);
        setLoading(false);
        return;
      }

      const ordersRaw = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.ORDERS,
        [],
        undefined,
        500
      );

      const uid = str(user.uid ?? user.id, user.id);
      const cid = str(user.customerId ?? user.id, user.id);

      const orders = ordersRaw
        .filter((o) => {
          const keys = [
            str(o.customerId, ""),
            str(o.userId, ""),
            str(o.uid, ""),
          ];
          return keys.includes(uid) || keys.includes(cid) || keys.includes(user!.id);
        })
        .map(mapOrder);

      setCustomer(mapCustomer(user, orders));
    } catch (err) {
      console.error("useCustomer error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load customer from Firestore."
      );
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  }, [customerId]);

  useEffect(() => {
    void load();
  }, [load]);

  return {
    customer,
    loading,
    error,
    demoMode,
    refresh: load,
    setCustomer,
  };
}

export default useCustomers;