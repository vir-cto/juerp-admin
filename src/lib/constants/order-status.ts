/**
 * JUONE Order Status Constants
 *
 * Source of truth:
 * JUONE Ecosystem Master Specification Document (MSD)
 *
 * Important:
 * - Do not invent alternate order statuses.
 * - Backend is authoritative for state transitions.
 * - This file is for shared UI/type/constants usage.
 */

export const ORDER_STATUSES = [
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
] as const;

export type OrderStatus =
  (typeof ORDER_STATUSES)[number];

/**
 * Canonical order status labels for JuERP UI.
 */
export const ORDER_STATUS_LABELS: Record<
  OrderStatus,
  string
> = {
  NONE: "None",
  CREATED: "Created",
  PAYMENT_PENDING: "Payment Pending",
  PAID: "Paid",
  ACCEPTED: "Accepted",
  PREPARING: "Preparing",
  READY: "Ready",
  ASSIGNED: "Assigned",
  PICKED_UP: "Picked Up",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  SETTLED: "Settled",
};

/**
 * Status order used only for display/progress purposes.
 *
 * This does NOT perform or authorize state transitions.
 * Actual transitions must be validated by the backend.
 */
export const ORDER_STATUS_ORDER: Record<
  OrderStatus,
  number
> = {
  NONE: 0,
  CREATED: 1,
  PAYMENT_PENDING: 2,
  PAID: 3,
  ACCEPTED: 4,
  PREPARING: 5,
  READY: 6,
  ASSIGNED: 7,
  PICKED_UP: 8,
  OUT_FOR_DELIVERY: 9,
  DELIVERED: 10,
  SETTLED: 11,
};

/**
 * Canonical order flow from the MSD:
 *
 * NONE
 *   ↓
 * CREATED
 *   ↓
 * PAYMENT_PENDING
 *   ↓
 * PAID
 *   ↓
 * ACCEPTED
 *   ↓
 * PREPARING
 *   ↓
 * READY
 *   ↓
 * ASSIGNED
 *   ↓
 * PICKED_UP
 *   ↓
 * OUT_FOR_DELIVERY
 *   ↓
 * DELIVERED
 *   ↓
 * SETTLED
 */
export const ORDER_STATUS_FLOW: OrderStatus[] = [
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
];

/**
 * Returns true when the supplied value is
 * a canonical JUONE order status.
 */
export function isOrderStatus(
  value: unknown,
): value is OrderStatus {
  return (
    typeof value === "string" &&
    ORDER_STATUSES.includes(
      value as OrderStatus,
    )
  );
}

/**
 * Returns the display label for an order status.
 */
export function getOrderStatusLabel(
  status: OrderStatus,
): string {
  return ORDER_STATUS_LABELS[status];
}

/**
 * Returns the numeric display position of
 * an order status.
 */
export function getOrderStatusOrder(
  status: OrderStatus,
): number {
  return ORDER_STATUS_ORDER[status];
}

/**
 * Returns the next status in the canonical
 * display flow.
 *
 * This is only a UI helper.
 * It must NOT be used to authorize a backend
 * state transition.
 */
export function getNextOrderStatus(
  status: OrderStatus,
): OrderStatus | null {
  const currentIndex =
    ORDER_STATUS_FLOW.indexOf(status);

  if (currentIndex === -1) {
    return null;
  }

  if (
    currentIndex >=
    ORDER_STATUS_FLOW.length - 1
  ) {
    return null;
  }

  return ORDER_STATUS_FLOW[
    currentIndex + 1
  ];
}

/**
 * Returns the previous status in the canonical
 * display flow.
 *
 * This is a UI helper only.
 */
export function getPreviousOrderStatus(
  status: OrderStatus,
): OrderStatus | null {
  const currentIndex =
    ORDER_STATUS_FLOW.indexOf(status);

  if (currentIndex <= 0) {
    return null;
  }

  return ORDER_STATUS_FLOW[
    currentIndex - 1
  ];
}

/**
 * Returns true when the order has reached
 * the delivery-completed stage.
 */
export function isOrderDelivered(
  status: OrderStatus,
): boolean {
  return (
    status === "DELIVERED" ||
    status === "SETTLED"
  );
}

/**
 * Returns true when the order has reached
 * the final settlement state.
 */
export function isOrderSettled(
  status: OrderStatus,
): boolean {
  return status === "SETTLED";
}

/**
 * Returns true for statuses where the order
 * is still active in the operational workflow.
 */
export function isOrderActive(
  status: OrderStatus,
): boolean {
  return (
    status !== "NONE" &&
    status !== "DELIVERED" &&
    status !== "SETTLED"
  );
}

/**
 * Returns true when the order has been paid.
 */
export function isOrderPaid(
  status: OrderStatus,
): boolean {
  return [
    "PAID",
    "ACCEPTED",
    "PREPARING",
    "READY",
    "ASSIGNED",
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "SETTLED",
  ].includes(status);
}

/**
 * Returns true when the order is currently
 * waiting for payment.
 */
export function isPaymentPending(
  status: OrderStatus,
): boolean {
  return status === "PAYMENT_PENDING";
}

/**
 * Returns true when the order is waiting
 * for vendor acceptance.
 */
export function isAwaitingAcceptance(
  status: OrderStatus,
): boolean {
  return status === "PAID";
}

/**
 * Returns true when the order is in preparation.
 */
export function isPreparingOrder(
  status: OrderStatus,
): boolean {
  return status === "PREPARING";
}

/**
 * Returns true when the order is ready
 * for assignment/pickup.
 */
export function isOrderReady(
  status: OrderStatus,
): boolean {
  return status === "READY";
}

/**
 * Returns true when a captain has been assigned
 * or the delivery is already underway.
 */
export function isAssignedOrder(
  status: OrderStatus,
): boolean {
  return [
    "ASSIGNED",
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
  ].includes(status);
}

/**
 * Returns true when the order is currently
 * being delivered.
 */
export function isOutForDelivery(
  status: OrderStatus,
): boolean {
  return status === "OUT_FOR_DELIVERY";
}

/**
 * Returns a human-readable representation
 * suitable for badges and tables.
 */
export function formatOrderStatus(
  status: OrderStatus,
): string {
  return ORDER_STATUS_LABELS[status];
}

/**
 * Status groups for JuERP dashboards.
 *
 * These groups are UI classifications only.
 */
export const ORDER_STATUS_GROUPS = {
  pending: [
    "CREATED",
    "PAYMENT_PENDING",
  ] as OrderStatus[],

  paid: [
    "PAID",
  ] as OrderStatus[],

  processing: [
    "ACCEPTED",
    "PREPARING",
    "READY",
  ] as OrderStatus[],

  delivery: [
    "ASSIGNED",
    "PICKED_UP",
    "OUT_FOR_DELIVERY",
  ] as OrderStatus[],

  completed: [
    "DELIVERED",
    "SETTLED",
  ] as OrderStatus[],
} as const;

/**
 * Default export for convenient imports.
 */
export default {
  ORDER_STATUSES,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_ORDER,
  ORDER_STATUS_FLOW,
  ORDER_STATUS_GROUPS,
};