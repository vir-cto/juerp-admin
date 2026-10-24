/**
 * JUERP - Order Types
 *
 * File:
 * src/types/order.ts
 *
 * Purpose:
 * - Shared TypeScript types for JUONE orders.
 * - Supports order lifecycle, order items, delivery assignment,
 *   payment references, financial snapshots and API responses.
 *
 * IMPORTANT:
 * - Order state transitions are backend authoritative.
 * - Financial values are supplied by the backend and represented in paise.
 * - Do not calculate commission, GST, delivery fee, payout or platform
 *   margin in the frontend.
 * - Preserve correlationId and calculationVersion when provided.
 */

/* -------------------------------------------------------------------------- */
/* Order Status                                                               */
/* -------------------------------------------------------------------------- */

export type OrderStatus =
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
  | "SETTLED";

/* -------------------------------------------------------------------------- */
/* Order Module                                                               */
/* -------------------------------------------------------------------------- */

export type OrderModule =
  | "JUCART"
  | "JUSHOPPING";

/* -------------------------------------------------------------------------- */
/* Order Service                                                              */
/* -------------------------------------------------------------------------- */

export type OrderService =
  | "FOOD"
  | "MART"
  | "PHARMACY"
  | "SHOPPING";

/* -------------------------------------------------------------------------- */
/* Order Item                                                                 */
/* -------------------------------------------------------------------------- */

export interface OrderItem {
  orderItemId: string;

  orderId: string;

  productId?: string;

  catalogItemId?: string;

  sku?: string;

  name: string;

  description?: string;

  quantity: number;

  /**
   * Unit price supplied by backend.
   * Monetary values are in paise.
   */
  unitPricePaise: number;

  /**
   * Total item amount supplied by backend.
   */
  itemTotalPaise: number;

  imageUrl?: string;

  variantId?: string;

  variantName?: string;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Order Address                                                              */
/* -------------------------------------------------------------------------- */

export interface OrderAddress {
  addressId?: string;

  name?: string;

  phone?: string;

  addressLine1: string;

  addressLine2?: string;

  landmark?: string;

  city?: string;

  district?: string;

  state?: string;

  postalCode?: string;

  country?: string;

  latitude?: number;

  longitude?: number;
}

/* -------------------------------------------------------------------------- */
/* Order Financial Snapshot                                                   */
/* -------------------------------------------------------------------------- */

export interface OrderFinancialSnapshot {
  /**
   * All monetary values are in paise.
   */

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

  /**
   * Final order amount supplied by backend.
   */
  totalAmountPaise?: number;

  /**
   * Financial calculation version.
   */
  calculationVersion?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Payment Reference                                                    */
/* -------------------------------------------------------------------------- */

export type OrderPaymentStatus =
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED";

export interface OrderPaymentReference {
  paymentId?: string;

  orderId: string;

  status?: OrderPaymentStatus;

  amountPaise?: number;

  currency?: "INR";

  gateway?: "CASHFREE";

  gatewayOrderId?: string;

  gatewayPaymentId?: string;

  paidAt?:
    | string
    | number
    | Date;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Assignment                                                           */
/* -------------------------------------------------------------------------- */

export interface OrderAssignment {
  assignmentId?: string;

  orderId: string;

  captainId?: string;

  vendorId?: string;

  deliveryId?: string;

  status?:
    | "PENDING"
    | "ASSIGNED"
    | "PICKED_UP"
    | "COMPLETED"
    | "CANCELLED";

  assignedAt?:
    | string
    | number
    | Date;

  pickedUpAt?:
    | string
    | number
    | Date;

  completedAt?:
    | string
    | number
    | Date;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Status History                                                       */
/* -------------------------------------------------------------------------- */

export interface OrderStatusHistory {
  historyId?: string;

  orderId: string;

  previousStatus?: OrderStatus;

  nextStatus: OrderStatus;

  changedBy?: string;

  changedByType?:
    | "USER"
    | "VENDOR"
    | "CAPTAIN"
    | "ADMIN"
    | "SYSTEM";

  reason?: string;

  correlationId?: string;

  createdAt:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Order Cancellation                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Cancellation details are optional because the canonical
 * order lifecycle itself does not add cancellation as a
 * normal lifecycle state.
 *
 * Backend may expose cancellation information separately
 * when applicable.
 */
export interface OrderCancellation {
  cancelled: boolean;

  cancelledAt?:
    | string
    | number
    | Date;

  cancelledBy?: string;

  cancelledByType?:
    | "USER"
    | "VENDOR"
    | "CAPTAIN"
    | "ADMIN"
    | "SYSTEM";

  reason?: string;

  refundId?: string;

  refundAmountPaise?: number;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order                                                                      */
/* -------------------------------------------------------------------------- */

export interface Order {
  /**
   * Canonical order identifier.
   */
  orderId: string;

  /**
   * Customer/user who created the order.
   */
  userId: string;

  /**
   * Vendor associated with the order.
   */
  vendorId?: string;

  /**
   * Captain associated with delivery.
   */
  captainId?: string;

  /**
   * Delivery identifier.
   */
  deliveryId?: string;

  /**
   * Module that owns the order.
   */
  module: OrderModule;

  /**
   * Service within the module.
   */
  service?: OrderService;

  /**
   * Canonical order lifecycle state.
   */
  status: OrderStatus;

  /**
   * Items in the order.
   */
  items: OrderItem[];

  /**
   * Delivery address.
   */
  deliveryAddress?: OrderAddress;

  /**
   * Financial snapshot supplied by backend.
   */
  financialSnapshot?: OrderFinancialSnapshot;

  /**
   * Payment reference.
   */
  payment?: OrderPaymentReference;

  /**
   * Captain/vendor assignment.
   */
  assignment?: OrderAssignment;

  /**
   * Optional status history.
   */
  statusHistory?: OrderStatusHistory[];

  /**
   * Optional cancellation details.
   */
  cancellation?: OrderCancellation;

  /**
   * Cross-system correlation identifier.
   */
  correlationId?: string;

  /**
   * Idempotency key associated with creation/action.
   */
  idempotencyKey?: string;

  /**
   * Financial calculation version.
   */
  calculationVersion?: string;

  /**
   * Optional customer notes.
   */
  customerNote?: string;

  /**
   * Backend timestamps.
   */
  createdAt:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  acceptedAt?:
    | string
    | number
    | Date;

  preparingAt?:
    | string
    | number
    | Date;

  readyAt?:
    | string
    | number
    | Date;

  assignedAt?:
    | string
    | number
    | Date;

  pickedUpAt?:
    | string
    | number
    | Date;

  outForDeliveryAt?:
    | string
    | number
    | Date;

  deliveredAt?:
    | string
    | number
    | Date;

  settledAt?:
    | string
    | number
    | Date;

  metadata?: Record<string, unknown>;
}

/* -------------------------------------------------------------------------- */
/* Order Summary                                                               */
/* -------------------------------------------------------------------------- */

export interface OrderSummary {
  orderId: string;

  userId: string;

  vendorId?: string;

  captainId?: string;

  module: OrderModule;

  service?: OrderService;

  status: OrderStatus;

  itemCount: number;

  totalAmountPaise?: number;

  currency?: "INR";

  createdAt:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Query                                                                */
/* -------------------------------------------------------------------------- */

export interface OrderQuery {
  orderId?: string;

  userId?: string;

  vendorId?: string;

  captainId?: string;

  deliveryId?: string;

  module?: OrderModule;

  service?: OrderService;

  status?: OrderStatus;

  statuses?: OrderStatus[];

  correlationId?: string;

  search?: string;

  city?: string;

  district?: string;

  state?: string;

  fromDate?: string;

  toDate?: string;

  page?: number;

  pageSize?: number;
}

/* -------------------------------------------------------------------------- */
/* Order Pagination                                                           */
/* -------------------------------------------------------------------------- */

export interface OrderPagination {
  page: number;

  pageSize: number;

  total: number;

  totalPages: number;

  hasNextPage: boolean;

  hasPreviousPage: boolean;
}

/* -------------------------------------------------------------------------- */
/* Order List Response                                                        */
/* -------------------------------------------------------------------------- */

export interface OrderListResponse {
  orders: OrderSummary[];

  pagination?: OrderPagination;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Detail Response                                                      */
/* -------------------------------------------------------------------------- */

export interface OrderDetailResponse {
  order: Order;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Status Transition                                                    */
/* -------------------------------------------------------------------------- */

export interface OrderStatusTransition {
  orderId: string;

  currentStatus: OrderStatus;

  requestedStatus: OrderStatus;

  reason?: string;

  correlationId: string;

  idempotencyKey?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Status Transition Response                                           */
/* -------------------------------------------------------------------------- */

export interface OrderStatusTransitionResponse {
  success: boolean;

  orderId: string;

  previousStatus?: OrderStatus;

  currentStatus?: OrderStatus;

  message?: string;

  correlationId: string;
}

/* -------------------------------------------------------------------------- */
/* Order Assignment Request                                                   */
/* -------------------------------------------------------------------------- */

export interface OrderAssignmentRequest {
  orderId: string;

  captainId: string;

  correlationId: string;

  idempotencyKey: string;
}

/* -------------------------------------------------------------------------- */
/* Order Assignment Response                                                  */
/* -------------------------------------------------------------------------- */

export interface OrderAssignmentResponse {
  success: boolean;

  orderId: string;

  captainId?: string;

  deliveryId?: string;

  status?:
    | "PENDING"
    | "ASSIGNED"
    | "FAILED"
    | "REJECTED";

  correlationId: string;

  message?: string;
}

/* -------------------------------------------------------------------------- */
/* Order Status Constants                                                      */
/* -------------------------------------------------------------------------- */

export const ORDER_STATUSES:
  readonly OrderStatus[] = [
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

/* -------------------------------------------------------------------------- */
/* Order Module Constants                                                     */
/* -------------------------------------------------------------------------- */

export const ORDER_MODULES:
  readonly OrderModule[] = [
  "JUCART",
  "JUSHOPPING",
];

/* -------------------------------------------------------------------------- */
/* Order Service Constants                                                    */
/* -------------------------------------------------------------------------- */

export const ORDER_SERVICES:
  readonly OrderService[] = [
  "FOOD",
  "MART",
  "PHARMACY",
  "SHOPPING",
];

/* -------------------------------------------------------------------------- */
/* Order Status Labels                                                        */
/* -------------------------------------------------------------------------- */

export const ORDER_STATUS_LABELS:
  Record<OrderStatus, string> = {
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

/* -------------------------------------------------------------------------- */
/* Order Status Order                                                         */
/* -------------------------------------------------------------------------- */

export const ORDER_STATUS_ORDER:
  Record<OrderStatus, number> = {
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

/* -------------------------------------------------------------------------- */
/* Canonical Order Flow                                                       */
/* -------------------------------------------------------------------------- */

export const ORDER_STATUS_FLOW:
  readonly OrderStatus[] = [
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

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isOrderStatus(
  value: unknown,
): value is OrderStatus {
  return (
    typeof value === "string" &&
    (
      ORDER_STATUSES as readonly string[]
    ).includes(value)
  );
}

export function isOrderModule(
  value: unknown,
): value is OrderModule {
  return (
    value === "JUCART" ||
    value === "JUSHOPPING"
  );
}

export function isOrderService(
  value: unknown,
): value is OrderService {
  return (
    value === "FOOD" ||
    value === "MART" ||
    value === "PHARMACY" ||
    value === "SHOPPING"
  );
}

/* -------------------------------------------------------------------------- */
/* Status Helpers                                                             */
/* -------------------------------------------------------------------------- */

export function getOrderStatusLabel(
  status: OrderStatus,
): string {
  return ORDER_STATUS_LABELS[
    status
  ];
}

export function getOrderStatusOrder(
  status: OrderStatus,
): number {
  return ORDER_STATUS_ORDER[
    status
  ];
}

export function isTerminalOrderStatus(
  status: OrderStatus,
): boolean {
  return (
    status === "SETTLED"
  );
}

export function isActiveOrderStatus(
  status: OrderStatus,
): boolean {
  return (
    status !== "NONE" &&
    status !== "SETTLED"
  );
}

export function isPaymentPendingOrder(
  status: OrderStatus,
): boolean {
  return (
    status === "PAYMENT_PENDING"
  );
}

export function isPaidOrder(
  status: OrderStatus,
): boolean {
  return (
    status === "PAID" ||
    status === "ACCEPTED" ||
    status === "PREPARING" ||
    status === "READY" ||
    status === "ASSIGNED" ||
    status === "PICKED_UP" ||
    status === "OUT_FOR_DELIVERY" ||
    status === "DELIVERED" ||
    status === "SETTLED"
  );
}

export function isDeliveryInProgress(
  status: OrderStatus,
): boolean {
  return (
    status === "ASSIGNED" ||
    status === "PICKED_UP" ||
    status === "OUT_FOR_DELIVERY"
  );
}

export function isOrderDelivered(
  status: OrderStatus,
): boolean {
  return (
    status === "DELIVERED" ||
    status === "SETTLED"
  );
}

/* -------------------------------------------------------------------------- */
/* Status Transition Helpers                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Client-side representation of the canonical order flow.
 *
 * The backend must validate the actual state transition.
 */
export function getNextOrderStatus(
  status: OrderStatus,
): OrderStatus | null {
  const index =
    ORDER_STATUS_FLOW.indexOf(
      status,
    );

  if (
    index < 0 ||
    index >=
      ORDER_STATUS_FLOW.length - 1
  ) {
    return null;
  }

  return ORDER_STATUS_FLOW[
    index + 1
  ];
}

export function canMoveToNextOrderStatus(
  currentStatus: OrderStatus,
  requestedStatus: OrderStatus,
): boolean {
  const next =
    getNextOrderStatus(
      currentStatus,
    );

  return next === requestedStatus;
}

/**
 * This helper only checks the canonical sequence.
 * It does not authorize the transition.
 */
export function isForwardOrderTransition(
  currentStatus: OrderStatus,
  requestedStatus: OrderStatus,
): boolean {
  return (
    getOrderStatusOrder(
      requestedStatus,
    ) >
    getOrderStatusOrder(
      currentStatus,
    )
  );
}

/* -------------------------------------------------------------------------- */
/* Financial Helpers                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Return the final backend-provided order total.
 *
 * No frontend calculation is performed.
 */
export function getOrderTotalPaise(
  order: Order,
): number | null {
  const value =
    order.financialSnapshot
      ?.totalAmountPaise;

  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return null;
  }

  return value;
}

/**
 * Return the backend-provided item subtotal.
 */
export function getOrderItemSubtotalPaise(
  order: Order,
): number | null {
  const value =
    order.financialSnapshot
      ?.itemSubtotalPaise;

  if (
    typeof value !== "number" ||
    !Number.isFinite(value)
  ) {
    return null;
  }

  return value;
}

/**
 * Check whether the order has a financial calculation version.
 */
export function hasOrderCalculationVersion(
  order: Order,
): boolean {
  return (
    typeof order.calculationVersion ===
      "string" &&
    order.calculationVersion.trim()
      .length > 0
  ) ||
    (
      typeof order.financialSnapshot
        ?.calculationVersion ===
        "string" &&
      order.financialSnapshot
        .calculationVersion
        .trim()
        .length > 0
    );
}

/**
 * Check whether the order has a correlation ID.
 */
export function hasOrderCorrelationId(
  order: Order,
): boolean {
  return (
    typeof order.correlationId ===
      "string" &&
    order.correlationId.trim()
      .length > 0
  );
}

/* -------------------------------------------------------------------------- */
/* Item Helpers                                                               */
/* -------------------------------------------------------------------------- */

export function getOrderItemCount(
  order: Order,
): number {
  return order.items.reduce(
    (
      total,
      item,
    ) =>
      total +
      (
        Number.isFinite(
          item.quantity,
        )
          ? item.quantity
          : 0
      ),
    0,
  );
}

export function findOrderItem(
  order: Order,
  orderItemId: string,
): OrderItem | undefined {
  return order.items.find(
    (item) =>
      item.orderItemId ===
      orderItemId,
  );
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const orderTypes = {
  ORDER_STATUSES,

  ORDER_MODULES,

  ORDER_SERVICES,

  ORDER_STATUS_LABELS,

  ORDER_STATUS_ORDER,

  ORDER_STATUS_FLOW,

  isOrderStatus,

  isOrderModule,

  isOrderService,

  getOrderStatusLabel,

  getOrderStatusOrder,

  isTerminalOrderStatus,

  isActiveOrderStatus,

  isPaymentPendingOrder,

  isPaidOrder,

  isDeliveryInProgress,

  isOrderDelivered,

  getNextOrderStatus,

  canMoveToNextOrderStatus,

  isForwardOrderTransition,

  getOrderTotalPaise,

  getOrderItemSubtotalPaise,

  hasOrderCalculationVersion,

  hasOrderCorrelationId,

  getOrderItemCount,

  findOrderItem,
};

export default orderTypes;