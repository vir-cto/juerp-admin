"use client";

import {
  ReactNode,
} from "react";

export type DiscrepancySeverity =
  | "CRITICAL"
  | "HIGH"
  | "MEDIUM"
  | "LOW";

export type DiscrepancyStatus =
  | "OPEN"
  | "INVESTIGATING"
  | "RESOLVED";

interface DiscrepancyBadgeProps {
  severity?: DiscrepancySeverity;

  status?: DiscrepancyStatus;

  label?: string;

  amountPaise?: number;

  showAmount?: boolean;

  icon?: ReactNode;

  size?: "sm" | "md" | "lg";

  variant?: "badge" | "card";

  className?: string;
}

const SEVERITY_CONFIG: Record<
  DiscrepancySeverity,
  {
    label: string;
    background: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  CRITICAL: {
    label: "Critical",
    background: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },

  HIGH: {
    label: "High",
    background: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "bg-orange-500",
  },

  MEDIUM: {
    label: "Medium",
    background: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  LOW: {
    label: "Low",
    background: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },
};

const STATUS_CONFIG: Record<
  DiscrepancyStatus,
  {
    label: string;
    background: string;
    text: string;
    dot: string;
  }
> = {
  OPEN: {
    label: "Open",
    background: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },

  INVESTIGATING: {
    label: "Investigating",
    background: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },

  RESOLVED: {
    label: "Resolved",
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },
};

const SIZE_CONFIG = {
  sm: {
    container:
      "px-2 py-0.5 text-[8px]",
    dot: "h-1.5 w-1.5",
    gap: "gap-1",
  },

  md: {
    container:
      "px-2.5 py-1 text-[9px]",
    dot: "h-1.5 w-1.5",
    gap: "gap-1.5",
  },

  lg: {
    container:
      "px-3 py-1.5 text-[10px]",
    dot: "h-2 w-2",
    gap: "gap-2",
  },
};

function formatCurrency(
  amountPaise: number
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }
  ).format(amountPaise / 100);
}

function formatLabel(
  value: string
): string {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function DefaultWarningIcon({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const iconSize =
    size === "sm"
      ? "h-3 w-3"
      : size === "lg"
      ? "h-4 w-4"
      : "h-3.5 w-3.5";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={iconSize}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.3 4.6L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.6a2 2 0 00-3.4 0z"
      />

      <path
        strokeLinecap="round"
        d="M12 9v4"
      />

      <circle
        cx="12"
        cy="16.5"
        r=".75"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

function ResolvedIcon({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const iconSize =
    size === "sm"
      ? "h-3 w-3"
      : size === "lg"
      ? "h-4 w-4"
      : "h-3.5 w-3.5";

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={iconSize}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12l4 4L19 6"
      />
    </svg>
  );
}

export default function DiscrepancyBadge({
  severity,
  status,
  label,
  amountPaise,
  showAmount = false,
  icon,
  size = "md",
  variant = "badge",
  className = "",
}: DiscrepancyBadgeProps) {
  const sizeConfig =
    SIZE_CONFIG[size];

  const activeSeverity =
    severity
      ? SEVERITY_CONFIG[severity]
      : null;

  const activeStatus =
    status
      ? STATUS_CONFIG[status]
      : null;

  /*
   * When a status is supplied, status determines
   * the primary visual treatment. Severity is still
   * shown separately when available.
   */
  const background =
    activeStatus?.background ??
    activeSeverity?.background ??
    "bg-slate-100";

  const text =
    activeStatus?.text ??
    activeSeverity?.text ??
    "text-slate-600";

  const border =
    activeSeverity?.border ??
    "border-slate-200";

  const dot =
    activeStatus?.dot ??
    activeSeverity?.dot ??
    "bg-slate-400";

  const displayLabel =
    label ??
    activeStatus?.label ??
    activeSeverity?.label ??
    "Discrepancy";

  const displayIcon =
    icon ??
    (status === "RESOLVED" ? (
      <ResolvedIcon size={size} />
    ) : (
      <DefaultWarningIcon
        size={size}
      />
    ));

  if (variant === "card") {
    return (
      <div
        className={`rounded-xl border ${border} ${background} p-3 ${className}`}
      >
        <div className="flex items-center justify-between gap-3">

          <div className="flex min-w-0 items-center gap-2">

            <span
              className={`flex shrink-0 items-center justify-center rounded-lg ${background} ${text}`}
            >
              {displayIcon}
            </span>

            <div className="min-w-0">

              <p
                className={`truncate text-[10px] font-black ${text}`}
              >
                {displayLabel}
              </p>

              {severity && (
                <p className="mt-0.5 text-[8px] font-medium text-slate-500">
                  Severity:{" "}
                  {formatLabel(
                    severity
                  )}
                </p>
              )}

            </div>

          </div>

          {amountPaise !==
            undefined &&
            showAmount && (
              <p
                className={`shrink-0 text-xs font-black ${text}`}
              >
                {formatCurrency(
                  amountPaise
                )}
              </p>
            )}

        </div>

        {status && (
          <div className="mt-2 flex items-center gap-1.5">

            <span
              className={`h-1.5 w-1.5 rounded-full ${dot}`}
            />

            <span
              className={`text-[8px] font-bold uppercase tracking-wide ${text}`}
            >
              {formatLabel(status)}
            </span>

          </div>
        )}

      </div>
    );
  }

  return (
    <span
      className={`inline-flex w-fit items-center ${sizeConfig.gap} rounded-full border ${border} ${background} ${text} ${sizeConfig.container} font-black ${className}`}
    >
      {displayIcon}

      <span>
        {displayLabel}
      </span>

      {amountPaise !==
        undefined &&
        showAmount && (
          <>
            <span className="opacity-40">
              •
            </span>

            <span>
              {formatCurrency(
                amountPaise
              )}
            </span>
          </>
        )}
    </span>
  );
}