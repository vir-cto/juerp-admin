"use client";

import { useCallback, useEffect, useState } from "react";

export type RealtimeOrderStatus =
  | "NONE"
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
  | "CANCELLED";

export type RealtimeOrder = {
  orderId: string;

  userId?: string;
  vendorId?: string;
  captainId?: string;

  status: RealtimeOrderStatus;

  itemSubtotalPaise?: number;
  packagingChargePaise?: number;
  platformFeePaise?: number;
  juoneExtraAmountPaise?: number;
  deliveryFeePaise?: number;
  taxPaise?: number;
  discountPaise?: number;

  vendorCommissionPaise?: number;
  captainDeliveryEarningPaise?: number;
  vendorPayoutPaise?: number;
  captainPayoutPaise?: number;
  platformMarginPaise?: number;
  gatewayFeePaise?: number;
  platformProfitPaise?: number;

  calculationVersion?: string;

  correlationId?: string;

  createdAt?: string;
  updatedAt?: string;
};

type UseRealtimeOrdersOptions = {
  enabled?: boolean;

  vendorId?: string;
  captainId?: string;
  userId?: string;

  status?: RealtimeOrderStatus;

  /**
   * Maximum number of orders returned by the backend.
   */
  limit?: number;
};

type UseRealtimeOrdersReturn = {
  orders: RealtimeOrder[];

  loading: boolean;
  error: string | null;

  lastUpdatedAt: string | null;

  pendingOrders: RealtimeOrder[];
  activeOrders: RealtimeOrder[];
  completedOrders: RealtimeOrder[];

  refresh: () => Promise<void>;

  getOrderById: (
    orderId: string,
  ) => RealtimeOrder | undefined;
};

const ACTIVE_ORDER_STATUSES: RealtimeOrderStatus[] = [
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

const COMPLETED_ORDER_STATUSES: RealtimeOrderStatus[] = [
  "DELIVERED",
  "SETTLED",
];

function normalizeOrder(
  value: unknown,
): RealtimeOrder | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.orderId !== "string" ||
    typeof item.status !== "string"
  ) {
    return null;
  }

  const validStatuses: RealtimeOrderStatus[] = [
    "NONE",
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
    "SETTLED",
    "CANCELLED",
  ];

  if (
    !validStatuses.includes(
      item.status as RealtimeOrderStatus,
    )
  ) {
    return null;
  }

  const numberField = (
    key: string,
  ): number | undefined => {
    return typeof item[key] === "number"
      ? (item[key] as number)
      : undefined;
  };

  const stringField = (
    key: string,
  ): string | undefined => {
    return typeof item[key] === "string"
      ? (item[key] as string)
      : undefined;
  };

  return {
    orderId: item.orderId,

    userId: stringField("userId"),
    vendorId: stringField("vendorId"),
    captainId: stringField("captainId"),

    status:
      item.status as RealtimeOrderStatus,

    itemSubtotalPaise:
      numberField("itemSubtotalPaise"),

    packagingChargePaise:
      numberField("packagingChargePaise"),

    platformFeePaise:
      numberField("platformFeePaise"),

    juoneExtraAmountPaise:
      numberField("juoneExtraAmountPaise"),

    deliveryFeePaise:
      numberField("deliveryFeePaise"),

    taxPaise:
      numberField("taxPaise"),

    discountPaise:
      numberField("discountPaise"),

    vendorCommissionPaise:
      numberField("vendorCommissionPaise"),

    captainDeliveryEarningPaise:
      numberField(
        "captainDeliveryEarningPaise",
      ),

    vendorPayoutPaise:
      numberField("vendorPayoutPaise"),

    captainPayoutPaise:
      numberField("captainPayoutPaise"),

    platformMarginPaise:
      numberField("platformMarginPaise"),

    gatewayFeePaise:
      numberField("gatewayFeePaise"),

    platformProfitPaise:
      numberField("platformProfitPaise"),

    calculationVersion:
      stringField("calculationVersion"),

    correlationId:
      stringField("correlationId"),

    createdAt:
      stringField("createdAt"),

    updatedAt:
      stringField("updatedAt"),
  };
}

function extractOrders(
  data: unknown,
): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object"
  ) {
    const object =
      data as Record<string, unknown>;

    if (Array.isArray(object.orders)) {
      return object.orders;
    }

    if (
      object.data &&
      typeof object.data === "object"
    ) {
      const nested =
        object.data as Record<
          string,
          unknown
        >;

      if (Array.isArray(nested.orders)) {
        return nested.orders;
      }
    }
  }

  return [];
}

export function useRealtimeOrders(
  options: UseRealtimeOrdersOptions = {},
): UseRealtimeOrdersReturn {
  const {
    enabled = true,
    vendorId,
    captainId,
    userId,
    status,
    limit = 100,
  } = options;

  const [orders, setOrders] = useState<
    RealtimeOrder[]
  >([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  const [lastUpdatedAt, setLastUpdatedAt] =
    useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setOrders([]);
      setLoading(false);
      setError(null);
      setLastUpdatedAt(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (vendorId) {
        params.set("vendorId", vendorId);
      }

      if (captainId) {
        params.set("captainId", captainId);
      }

      if (userId) {
        params.set("userId", userId);
      }

      if (status) {
        params.set("status", status);
      }

      params.set(
        "limit",
        String(Math.max(1, limit)),
      );

      /*
       * In demo mode we deliberately return an empty
       * realtime feed.
       *
       * We do not manufacture fake orders because the
       * JuERP dashboard must not present fake operational
       * or financial data as real data.
       */
      const demoMode =
        process.env.NEXT_PUBLIC_DEMO_MODE ===
        "true";

      if (demoMode) {
        setOrders([]);
        setLastUpdatedAt(null);
        return;
      }

      const queryString =
        params.toString();

      const response = await fetch(
        `/api/realtime/orders${
          queryString
            ? `?${queryString}`
            : ""
        }`,
        {
          method: "GET",

          headers: {
            Accept: "application/json",
          },

          credentials: "include",

          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load realtime orders (${response.status})`,
        );
      }

      const data: unknown =
        await response.json();

      const rawOrders =
        extractOrders(data);

      const normalizedOrders =
        rawOrders
          .map(normalizeOrder)
          .filter(
            (
              order,
            ): order is RealtimeOrder =>
              order !== null,
          );

      setOrders(normalizedOrders);

      /*
       * Determine the newest backend timestamp.
       */
      let newestTimestamp: string | null =
        null;

      for (const order of normalizedOrders) {
        const timestamp =
          order.updatedAt ??
          order.createdAt;

        if (!timestamp) {
          continue;
        }

        if (
          newestTimestamp === null ||
          new Date(timestamp).getTime() >
            new Date(
              newestTimestamp,
            ).getTime()
        ) {
          newestTimestamp = timestamp;
        }
      }

      setLastUpdatedAt(
        newestTimestamp,
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load realtime orders.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [
    enabled,
    vendorId,
    captainId,
    userId,
    status,
    limit,
  ]);

  useEffect(() => {
    void refresh();

    if (!enabled) {
      return;
    }

    /*
     * The backend should preferably provide Firestore
     * realtime subscriptions for production.
     *
     * This polling interval is a safe fallback for the
     * admin web application.
     */
    const intervalId =
      window.setInterval(() => {
        void refresh();
      }, 10000);

    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    enabled,
    refresh,
  ]);

  const pendingOrders =
    orders.filter(
      (order) =>
        order.status === "CREATED" ||
        order.status ===
          "PAYMENT_PENDING" ||
        order.status === "PAID",
    );

  const activeOrders =
    orders.filter((order) =>
      ACTIVE_ORDER_STATUSES.includes(
        order.status,
      ),
    );

  const completedOrders =
    orders.filter((order) =>
      COMPLETED_ORDER_STATUSES.includes(
        order.status,
      ),
    );

  const getOrderById = useCallback(
    (
      requestedOrderId: string,
    ): RealtimeOrder | undefined => {
      return orders.find(
        (order) =>
          order.orderId ===
          requestedOrderId,
      );
    },
    [orders],
  );

  return {
    orders,

    loading,
    error,

    lastUpdatedAt,

    pendingOrders,
    activeOrders,
    completedOrders,

    refresh,

    getOrderById,
  };
}

export default useRealtimeOrders;