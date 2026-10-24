"use client";

import {
  ReactNode,
} from "react";

export type StatCardTrend =
  | "up"
  | "down"
  | "neutral";

export type StatCardVariant =
  | "orange"
  | "blue"
  | "green"
  | "red"
  | "amber"
  | "purple"
  | "slate";

interface StatCardProps {
  title: string;
  value: string | number;

  subtitle?: string;

  icon?: ReactNode;

  trend?: StatCardTrend;
  trendValue?: string;

  variant?: StatCardVariant;

  loading?: boolean;

  onClick?: () => void;

  className?: string;
}

const VARIANT_CLASSES: Record<
  StatCardVariant,
  {
    iconBackground: string;
    iconText: string;
    accent: string;
  }
> = {
  orange: {
    iconBackground: "bg-orange-100",
    iconText: "text-orange-600",
    accent: "border-orange-100",
  },

  blue: {
    iconBackground: "bg-blue-100",
    iconText: "text-blue-600",
    accent: "border-blue-100",
  },

  green: {
    iconBackground: "bg-green-100",
    iconText: "text-green-600",
    accent: "border-green-100",
  },

  red: {
    iconBackground: "bg-red-100",
    iconText: "text-red-600",
    accent: "border-red-100",
  },

  amber: {
    iconBackground: "bg-amber-100",
    iconText: "text-amber-600",
    accent: "border-amber-100",
  },

  purple: {
    iconBackground: "bg-purple-100",
    iconText: "text-purple-600",
    accent: "border-purple-100",
  },

  slate: {
    iconBackground: "bg-slate-100",
    iconText: "text-slate-600",
    accent: "border-slate-100",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = "orange",
  loading = false,
  onClick,
  className = "",
}: StatCardProps) {
  const styles =
    VARIANT_CLASSES[variant];

  const isClickable =
    typeof onClick === "function";

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition sm:p-5 ${
        isClickable
          ? "cursor-pointer hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md"
          : ""
      } ${styles.accent} ${className}`}
      role={
        isClickable
          ? "button"
          : undefined
      }
      tabIndex={
        isClickable ? 0 : undefined
      }
      onKeyDown={(event) => {
        if (
          isClickable &&
          (event.key === "Enter" ||
            event.key === " ")
        ) {
          event.preventDefault();
          onClick?.();
        }
      }}
    >
      {loading ? (
        <LoadingContent />
      ) : (
        <>

          {/* TOP SECTION */}

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0">

              <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {title}
              </p>

              <p className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {value}
              </p>

            </div>

            {icon && (
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.iconBackground} ${styles.iconText}`}
              >
                {icon}
              </div>
            )}

          </div>

          {/* BOTTOM SECTION */}

          {(subtitle ||
            trendValue) && (
            <div className="mt-4 flex flex-wrap items-center gap-2">

              {trendValue && (
                <TrendBadge
                  trend={trend}
                  value={trendValue}
                />
              )}

              {subtitle && (
                <p className="text-[10px] font-medium text-slate-400">
                  {subtitle}
                </p>
              )}

            </div>
          )}

        </>
      )}
    </div>
  );
}

function TrendBadge({
  trend,
  value,
}: {
  trend?: StatCardTrend;
  value: string;
}) {
  if (!trend || trend === "neutral") {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">
        {value}
      </span>
    );
  }

  if (trend === "up") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
        <span aria-hidden="true">
          ↑
        </span>

        {value}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold text-red-700">
      <span aria-hidden="true">
        ↓
      </span>

      {value}
    </span>
  );
}

function LoadingContent() {
  return (
    <div className="animate-pulse">

      <div className="flex items-start justify-between gap-3">

        <div className="flex-1">

          <div className="h-3 w-24 rounded bg-slate-200" />

          <div className="mt-3 h-8 w-28 rounded bg-slate-200" />

        </div>

        <div className="h-11 w-11 rounded-xl bg-slate-200" />

      </div>

      <div className="mt-4 h-3 w-36 rounded bg-slate-200" />

    </div>
  );
}