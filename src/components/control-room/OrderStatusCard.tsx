"use client";

import {
  ReactNode,
} from "react";

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
  | "CANCELLED"
  | "REJECTED"
  | "REFUND_PENDING"
  | "REFUNDED";

export type OrderPaymentStatus =
  | "CREATED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "CANCELLED";

export type OrderModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export interface OrderStatusCardData {
  orderId: string;
  userId: string;
  vendorId?: string;
  vendorName?: string;
  moduleId: OrderModule;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  amountPaise: number;
  captainId?: string;
  captainName?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStatusCardProps {
  order: OrderStatusCardData;

  compact?: boolean;

  showPaymentStatus?: boolean;

  showCaptain?: boolean;

  showAmount?: boolean;

  showTimestamps?: boolean;

  onClick?: (
    order: OrderStatusCardData
  ) => void;

  onViewDetails?: (
    order: OrderStatusCardData
  ) => void;

  className?: string;
}

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    description: string;
    background: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  CREATED: {
    label: "Created",
    description:
      "Order has been created.",
    background: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-500",
  },

  PAYMENT_PENDING: {
    label: "Payment Pending",
    description:
      "Payment confirmation is pending.",
    background: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  PAID: {
    label: "Paid",
    description:
      "Payment has been confirmed.",
    background: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },

  ACCEPTED: {
    label: "Accepted",
    description:
      "Vendor has accepted the order.",
    background: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },

  PREPARING: {
    label: "Preparing",
    description:
      "Order is being prepared.",
    background: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },

  READY: {
    label: "Ready",
    description:
      "Order is ready for pickup.",
    background: "bg-cyan-100",
    text: "text-cyan-700",
    border: "border-cyan-200",
    dot: "bg-cyan-500",
  },

  ASSIGNED: {
    label: "Assigned",
    description:
      "A captain has been assigned.",
    background: "bg-indigo-100",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },

  PICKED_UP: {
    label: "Picked Up",
    description:
      "Captain has picked up the order.",
    background: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },

  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    description:
      "Order is on the way.",
    background: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },

  DELIVERED: {
    label: "Delivered",
    description:
      "Order has been delivered.",
    background: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },

  CANCELLED: {
    label: "Cancelled",
    description:
      "Order has been cancelled.",
    background: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },

  REJECTED: {
    label: "Rejected",
    description:
      "Order has been rejected.",
    background: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },

  REFUND_PENDING: {
    label: "Refund Pending",
    description:
      "Refund processing is pending.",
    background: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  REFUNDED: {
    label: "Refunded",
    description:
      "Order amount has been refunded.",
    background: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

const PAYMENT_CONFIG: Record<
  OrderPaymentStatus,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
  CREATED: {
    label: "Created",
    background: "bg-slate-100",
    text: "text-slate-600",
  },

  PENDING: {
    label: "Pending",
    background: "bg-amber-100",
    text: "text-amber-700",
  },

  PAID: {
    label: "Paid",
    background: "bg-green-100",
    text: "text-green-700",
  },

  FAILED: {
    label: "Failed",
    background: "bg-red-100",
    text: "text-red-700",
  },

  REFUNDED: {
    label: "Refunded",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  PARTIALLY_REFUNDED: {
    label: "Partially Refunded",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  CANCELLED: {
    label: "Cancelled",
    background: "bg-slate-100",
    text: "text-slate-600",
  },
};

const MODULE_CONFIG: Record<
  OrderModule,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
  JUCART: {
    label: "JuCart",
    background: "bg-orange-100",
    text: "text-orange-700",
  },

  JURIDE: {
    label: "JuRide",
    background: "bg-blue-100",
    text: "text-blue-700",
  },

  JUSTAY: {
    label: "JuStay",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  JUHOME: {
    label: "JuHome",
    background: "bg-green-100",
    text: "text-green-700",
  },

  JUSHOPPING: {
    label: "JuShopping",
    background: "bg-indigo-100",
    text: "text-indigo-700",
  },
};

function formatCurrency(
  amountPaise: number
): string {
  const amount =
    amountPaise / 100;

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }
  ).format(amount);
}

function formatDate(
  value: string
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function StatusIcon({
  status,
}: {
  status: OrderStatus;
}) {
  if (
    status === "DELIVERED"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12l4 4L19 6"
        />
      </svg>
    );
  }

  if (
    status === "CANCELLED" ||
    status === "REJECTED"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6l12 12M18 6L6 18"
        />
      </svg>
    );
  }

  if (
    status === "OUT_FOR_DELIVERY" ||
    status === "PICKED_UP"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12h13"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7l5 5-5 5"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path
        strokeLinecap="round"
        d="M12 8v4l3 2"
      />
    </svg>
  );
}

function OrderIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 4h12v16H6z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8h6M9 12h6M9 16h4"
      />
    </svg>
  );
}

function CaptainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <circle
        cx="12"
        cy="7"
        r="3"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 21a7 7 0 0114 0"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10h16"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 10v9h14v-9"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10l2-6h14l2 6"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19v-5h6v5"
      />
    </svg>
  );
}

export default function OrderStatusCard({
  order,
  compact = false,
  showPaymentStatus = true,
  showCaptain = true,
  showAmount = true,
  showTimestamps = true,
  onClick,
  onViewDetails,
  className = "",
}: OrderStatusCardProps) {
  const status =
    STATUS_CONFIG[order.status];

  const payment =
    PAYMENT_CONFIG[
      order.paymentStatus
    ];

  const module =
    MODULE_CONFIG[order.moduleId];

  const isInteractive =
    Boolean(onClick);

  return (
    <article
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm transition ${
        isInteractive
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          : ""
      } ${className}`}
      onClick={() =>
        onClick?.(order)
      }
      role={
        isInteractive
          ? "button"
          : undefined
      }
      tabIndex={
        isInteractive
          ? 0
          : undefined
      }
      onKeyDown={(event) => {
        if (
          !isInteractive
        ) {
          return;
        }

        if (
          event.key ===
            "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          onClick?.(order);
        }
      }}
    >
      {/* HEADER */}

      <div
        className={`flex items-start gap-3 border-b border-slate-100 ${
          compact
            ? "p-3"
            : "p-4"
        }`}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <OrderIcon />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">

            <h3 className="truncate text-sm font-black text-slate-900">
              {order.orderId}
            </h3>

            <span
              className={`rounded-full px-2 py-0.5 text-[8px] font-black uppercase ${module.background} ${module.text}`}
            >
              {module.label}
            </span>

          </div>

          <p className="mt-1 truncate text-[10px] text-slate-400">
            Customer: {order.userId}
          </p>
        </div>

        {showAmount && (
          <div className="shrink-0 text-right">
            <p className="text-sm font-black text-slate-900">
              {formatCurrency(
                order.amountPaise
              )}
            </p>

            <p className="mt-1 text-[8px] font-bold uppercase tracking-wide text-slate-400">
              Order Value
            </p>
          </div>
        )}
      </div>

      {/* STATUS */}

      <div
        className={`${
          compact
            ? "p-3"
            : "p-4"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 rounded-xl border ${status.border} ${status.background} p-3`}
        >
          <div className="flex min-w-0 items-center gap-3">

            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${status.background} ${status.text}`}
            >
              <StatusIcon
                status={
                  order.status
                }
              />
            </span>

            <div className="min-w-0">
              <div className="flex items-center gap-2">

                <span
                  className={`h-2 w-2 rounded-full ${status.dot}`}
                />

                <p
                  className={`text-xs font-black ${status.text}`}
                >
                  {status.label}
                </p>

              </div>

              {!compact && (
                <p className="mt-0.5 truncate text-[9px] text-slate-500">
                  {status.description}
                </p>
              )}
            </div>

          </div>

          <span
            className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-black uppercase tracking-wide ${status.background} ${status.text}`}
          >
            {order.status}
          </span>
        </div>

        {/* PAYMENT */}

        {showPaymentStatus && (
          <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-3">

            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Payment
            </span>

            <span
              className={`rounded-full px-2.5 py-1 text-[8px] font-black ${payment.background} ${payment.text}`}
            >
              {payment.label}
            </span>

          </div>
        )}

        {/* DETAILS */}

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

          {/* VENDOR */}

          <div className="flex min-w-0 items-center gap-2">

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
              <StoreIcon />
            </span>

            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Vendor
              </p>

              <p className="mt-0.5 truncate text-[10px] font-bold text-slate-700">
                {order.vendorName ||
                  order.vendorId ||
                  "Not assigned"}
              </p>
            </div>

          </div>

          {/* CAPTAIN */}

          {showCaptain && (
            <div className="flex min-w-0 items-center gap-2">

              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <CaptainIcon />
              </span>

              <div className="min-w-0">
                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Captain
                </p>

                <p className="mt-0.5 truncate text-[10px] font-bold text-slate-700">
                  {order.captainName ||
                    order.captainId ||
                    "Not assigned"}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* TIMESTAMPS */}

        {showTimestamps && (
          <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl bg-slate-50 p-3 sm:grid-cols-2">

            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Created
              </p>

              <p className="mt-1 text-[9px] font-semibold text-slate-600">
                {formatDate(
                  order.createdAt
                )}
              </p>
            </div>

            <div>
              <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                Updated
              </p>

              <p className="mt-1 text-[9px] font-semibold text-slate-600">
                {formatDate(
                  order.updatedAt
                )}
              </p>
            </div>

          </div>
        )}

        {/* ACTION */}

        {onViewDetails && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              onViewDetails(order);
            }}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-orange-500"
          >
            View Order Details

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 6l6 6-6 6"
              />
            </svg>
          </button>
        )}

      </div>

      {/* GOVERNANCE FOOTER */}

      {!compact && (
        <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5">
          <p className="text-[8px] leading-4 text-slate-400">
            Order status displayed from
            the authoritative operational
            source. Status transitions must
            be executed through the trusted
            backend.
          </p>
        </div>
      )}

    </article>
  );
}