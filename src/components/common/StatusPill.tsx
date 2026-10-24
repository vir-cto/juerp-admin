"use client";

import {
  ReactNode,
} from "react";

export type StatusPillVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "orange"
  | "purple"
  | "blue"
  | "green"
  | "red"
  | "amber"
  | "gray";

export type StatusPillSize =
  | "sm"
  | "md"
  | "lg";

interface StatusPillProps {
  status?: string | null;

  label?: string;

  variant?: StatusPillVariant;

  size?: StatusPillSize;

  icon?: ReactNode;

  dot?: boolean;

  className?: string;
}

const VARIANT_CLASSES: Record<
  StatusPillVariant,
  {
    background: string;
    text: string;
    dot: string;
  }
> = {
  success: {
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },

  warning: {
    background: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },

  danger: {
    background: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },

  info: {
    background: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },

  neutral: {
    background: "bg-slate-100",
    text: "text-slate-600",
    dot: "bg-slate-400",
  },

  orange: {
    background: "bg-orange-100",
    text: "text-orange-700",
    dot: "bg-orange-500",
  },

  purple: {
    background: "bg-purple-100",
    text: "text-purple-700",
    dot: "bg-purple-500",
  },

  blue: {
    background: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },

  green: {
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },

  red: {
    background: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },

  amber: {
    background: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },

  gray: {
    background: "bg-gray-100",
    text: "text-gray-600",
    dot: "bg-gray-400",
  },
};

const SIZE_CLASSES: Record<
  StatusPillSize,
  {
    container: string;
    text: string;
    dot: string;
    icon: string;
  }
> = {
  sm: {
    container: "px-2 py-1 gap-1.5",
    text: "text-[9px]",
    dot: "h-1.5 w-1.5",
    icon: "text-[9px]",
  },

  md: {
    container: "px-2.5 py-1.5 gap-1.5",
    text: "text-[10px]",
    dot: "h-2 w-2",
    icon: "text-[10px]",
  },

  lg: {
    container: "px-3 py-2 gap-2",
    text: "text-xs",
    dot: "h-2.5 w-2.5",
    icon: "text-xs",
  },
};

function formatStatusLabel(
  status: string
): string {
  return status
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(
      /\s+/g,
      " "
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

function getAutomaticVariant(
  status?: string | null
): StatusPillVariant {
  if (!status) {
    return "neutral";
  }

  const normalized =
    status
      .trim()
      .toUpperCase()
      .replace(/[\s-]+/g, "_");

  switch (normalized) {
    /*
     * SUCCESS / ACTIVE
     */

    case "ACTIVE":
    case "ONLINE":
    case "AVAILABLE":
    case "PAID":
    case "APPROVED":
    case "EXECUTED":
    case "COMPLETED":
    case "DELIVERED":
    case "ACCEPTED":
    case "PREPARING":
    case "READY":
    case "PICKED_UP":
    case "OUT_FOR_DELIVERY":
    case "CONFIRMED":
    case "CHECKED_IN":
    case "RESOLVED":
    case "MATCHED":
    case "SUCCESS":
    case "HEALTHY":
      return "success";

    /*
     * WARNING / PENDING
     */

    case "PENDING":
    case "DRAFT":
    case "SUBMITTED":
    case "SEARCHING_CAPTAIN":
    case "REQUESTED":
    case "ARRIVING":
    case "ARRIVED":
    case "CHECK_IN_PENDING":
    case "PAYMENT_PENDING":
    case "REFUND_PENDING":
    case "REVIEW":
    case "INVESTIGATING":
    case "MONITORING":
    case "CALCULATED":
    case "PROCESSING":
    case "WAITING":
    case "OPEN":
    case "IN_PROGRESS":
      return "warning";

    /*
     * DANGER / FAILED
     */

    case "FAILED":
    case "REJECTED":
    case "BLOCKED":
    case "SUSPENDED":
    case "CANCELLED":
    case "CRITICAL":
    case "MISMATCH":
    case "DISABLED":
      return "danger";

    /*
     * INFO
     */

    case "CREATED":
    case "ASSIGNED":
    case "STARTED":
    case "BUSY":
    case "PENDING_REVIEW":
    case "LIMITED":
    case "INFORMATION":
      return "info";

    /*
     * REFUNDS / FINANCIAL
     */

    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return "purple";

    /*
     * INACTIVE / NEUTRAL
     */

    case "INACTIVE":
    case "OFFLINE":
    case "NONE":
      return "neutral";

    default:
      return "neutral";
  }
}

export default function StatusPill({
  status,
  label,
  variant,
  size = "md",
  icon,
  dot = true,
  className = "",
}: StatusPillProps) {
  const actualVariant =
    variant ??
    getAutomaticVariant(status);

  const styles =
    VARIANT_CLASSES[
      actualVariant
    ];

  const sizeStyles =
    SIZE_CLASSES[size];

  const displayLabel =
    label ??
    (status
      ? formatStatusLabel(status)
      : "Unknown");

  return (
    <span
      className={`inline-flex w-fit items-center rounded-full font-bold whitespace-nowrap ${styles.background} ${styles.text} ${sizeStyles.container} ${className}`}
    >

      {/* STATUS DOT */}

      {dot && (
        <span
          className={`shrink-0 rounded-full ${styles.dot}`}
          aria-hidden="true"
        />
      )}

      {/* CUSTOM ICON */}

      {icon && (
        <span
          className={`shrink-0 ${sizeStyles.icon}`}
        >
          {icon}
        </span>
      )}

      {/* LABEL */}

      <span
        className={`leading-none ${sizeStyles.text}`}
      >
        {displayLabel}
      </span>

    </span>
  );
}