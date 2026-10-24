"use client";

import {
  ReactNode,
} from "react";

export interface RadarStatsData {
  activeOrders: number;
  pendingPayments: number;
  activeCaptains: number;
  availableCaptains: number;
  busyCaptains: number;
  bottlenecks: number;
  criticalBottlenecks: number;
  systemHealth: number;
}

interface RadarStatsBarProps {
  stats: RadarStatsData;

  loading?: boolean;

  onActiveOrdersClick?: () => void;

  onPendingPaymentsClick?: () => void;

  onCaptainsClick?: () => void;

  onBottlenecksClick?: () => void;

  onSystemHealthClick?: () => void;

  className?: string;
}

interface StatItemProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBackground: string;
  iconColor: string;
  valueColor?: string;
  onClick?: () => void;
  loading?: boolean;
}

function formatNumber(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
}

function StatItem({
  label,
  value,
  subtitle,
  icon,
  iconBackground,
  iconColor,
  valueColor = "text-slate-900",
  onClick,
  loading = false,
}: StatItemProps) {
  const content = (
    <div
      className={`flex min-w-0 items-center gap-3 ${
        onClick
          ? "cursor-pointer"
          : ""
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBackground} ${iconColor}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-[9px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        {loading ? (
          <div className="mt-1 h-6 w-16 animate-pulse rounded-md bg-slate-200" />
        ) : (
          <p
            className={`mt-0.5 text-lg font-black ${valueColor}`}
          >
            {value}
          </p>
        )}

        {subtitle && !loading && (
          <p className="mt-0.5 truncate text-[8px] font-medium text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );

  if (!onClick) {
    return (
      <div className="flex-1">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 rounded-xl text-left transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
    >
      {content}
    </button>
  );
}

function OrdersIcon() {
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

function PaymentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path
        strokeLinecap="round"
        d="M3 10h18"
      />

      <path
        strokeLinecap="round"
        d="M7 15h3"
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
      className="h-5 w-5"
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

function AlertIcon() {
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

function HealthIcon() {
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
        d="M4 12h3l2-6 4 12 2-6h5"
      />

      <circle
        cx="12"
        cy="12"
        r="9"
      />
    </svg>
  );
}

export default function RadarStatsBar({
  stats,
  loading = false,
  onActiveOrdersClick,
  onPendingPaymentsClick,
  onCaptainsClick,
  onBottlenecksClick,
  onSystemHealthClick,
  className = "",
}: RadarStatsBarProps) {
  const captainSubtitle = `${formatNumber(
    stats.availableCaptains
  )} available · ${formatNumber(
    stats.busyCaptains
  )} busy`;

  const bottleneckSubtitle =
    stats.criticalBottlenecks > 0
      ? `${formatNumber(
          stats.criticalBottlenecks
        )} critical`
      : "No critical issues";

  const healthValue = `${Math.round(
    stats.systemHealth
  )}%`;

  const healthColor =
    stats.systemHealth >= 90
      ? "text-green-600"
      : stats.systemHealth >= 70
      ? "text-amber-600"
      : "text-red-600";

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}
      aria-label="Control room operational statistics"
    >
      {/* HEADER */}

      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">

            <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
              <span className="absolute h-2 w-2 animate-ping rounded-full bg-orange-400 opacity-50" />

              <span className="relative">
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

                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                  />

                  <path
                    strokeLinecap="round"
                    d="M12 2v3M12 19v3M2 12h3M19 12h3"
                  />
                </svg>
              </span>
            </span>

            <div>
              <h2 className="text-sm font-black text-slate-900">
                Operations Radar
              </h2>

              <p className="text-[9px] font-medium text-slate-400">
                Real-time operational overview
              </p>
            </div>

          </div>
        </div>

        <div className="flex items-center gap-2">

          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-[9px] font-black text-green-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            LIVE
          </span>

          <span className="text-[9px] font-medium text-slate-400">
            Operational data
          </span>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5">

        {/* ACTIVE ORDERS */}

        <div className="px-0 py-3 first:pt-0 sm:px-4 sm:py-2 sm:first:pl-0 lg:py-1">
          <StatItem
            label="Active Orders"
            value={formatNumber(
              stats.activeOrders
            )}
            subtitle="Currently in operation"
            icon={<OrdersIcon />}
            iconBackground="bg-orange-100"
            iconColor="text-orange-600"
            onClick={
              onActiveOrdersClick
            }
            loading={loading}
          />
        </div>

        {/* PENDING PAYMENTS */}

        <div className="px-0 py-3 sm:px-4 sm:py-2 lg:py-1">
          <StatItem
            label="Pending Payments"
            value={formatNumber(
              stats.pendingPayments
            )}
            subtitle="Awaiting confirmation"
            icon={<PaymentIcon />}
            iconBackground="bg-amber-100"
            iconColor="text-amber-600"
            valueColor="text-amber-700"
            onClick={
              onPendingPaymentsClick
            }
            loading={loading}
          />
        </div>

        {/* CAPTAINS */}

        <div className="px-0 py-3 sm:px-4 sm:py-2 lg:py-1">
          <StatItem
            label="Active Captains"
            value={formatNumber(
              stats.activeCaptains
            )}
            subtitle={captainSubtitle}
            icon={<CaptainIcon />}
            iconBackground="bg-blue-100"
            iconColor="text-blue-600"
            onClick={
              onCaptainsClick
            }
            loading={loading}
          />
        </div>

        {/* BOTTLENECKS */}

        <div className="px-0 py-3 sm:px-4 sm:py-2 lg:py-1">
          <StatItem
            label="Bottlenecks"
            value={formatNumber(
              stats.bottlenecks
            )}
            subtitle={
              bottleneckSubtitle
            }
            icon={<AlertIcon />}
            iconBackground={
              stats.bottlenecks > 0
                ? "bg-red-100"
                : "bg-green-100"
            }
            iconColor={
              stats.bottlenecks > 0
                ? "text-red-600"
                : "text-green-600"
            }
            valueColor={
              stats.bottlenecks > 0
                ? "text-red-600"
                : "text-green-600"
            }
            onClick={
              onBottlenecksClick
            }
            loading={loading}
          />
        </div>

        {/* SYSTEM HEALTH */}

        <div className="px-0 py-3 last:pb-0 sm:px-4 sm:py-2 sm:last:pr-0 lg:py-1">
          <StatItem
            label="System Health"
            value={healthValue}
            subtitle={
              stats.systemHealth >= 90
                ? "Healthy"
                : stats.systemHealth >=
                  70
                ? "Needs attention"
                : "Critical"
            }
            icon={<HealthIcon />}
            iconBackground={
              stats.systemHealth >= 90
                ? "bg-green-100"
                : stats.systemHealth >=
                  70
                ? "bg-amber-100"
                : "bg-red-100"
            }
            iconColor={
              stats.systemHealth >= 90
                ? "text-green-600"
                : stats.systemHealth >=
                  70
                ? "text-amber-600"
                : "text-red-600"
            }
            valueColor={healthColor}
            onClick={
              onSystemHealthClick
            }
            loading={loading}
          />
        </div>

      </div>

      {/* CAPTAIN AVAILABILITY BAR */}

      {!loading && (
        <div className="mt-4 border-t border-slate-100 pt-4">

          <div className="mb-2 flex items-center justify-between">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Captain Availability
            </p>

            <p className="text-[9px] font-black text-slate-600">
              {stats.activeCaptains > 0
                ? Math.round(
                    (stats.availableCaptains /
                      stats.activeCaptains) *
                      100
                  )
                : 0}
              % available
            </p>

          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">

            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${
                  stats.activeCaptains >
                  0
                    ? Math.min(
                        100,
                        Math.max(
                          0,
                          (stats.availableCaptains /
                            stats.activeCaptains) *
                            100
                        )
                      )
                    : 0
                }%`,
              }}
            />

          </div>

          <div className="mt-2 flex flex-wrap items-center gap-4">

            <AvailabilityItem
              label="Available"
              value={
                stats.availableCaptains
              }
              dot="bg-green-500"
            />

            <AvailabilityItem
              label="Busy"
              value={
                stats.busyCaptains
              }
              dot="bg-amber-500"
            />

            <AvailabilityItem
              label="Total Active"
              value={
                stats.activeCaptains
              }
              dot="bg-blue-500"
            />

          </div>

        </div>
      )}

      {/* GOVERNANCE NOTE */}

      <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/60 px-3 py-2.5">

        <div className="flex items-start gap-2">

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500"
          >
            <circle
              cx="12"
              cy="12"
              r="9"
            />

            <path
              strokeLinecap="round"
              d="M12 11v5"
            />

            <circle
              cx="12"
              cy="7.5"
              r=".75"
              fill="currentColor"
              stroke="none"
            />
          </svg>

          <p className="text-[8px] leading-4 text-orange-800">
            Statistics are display values
            from the authoritative
            operational source. Financial,
            dispatch, payment, and status
            decisions must remain under the
            trusted backend and JUERP
            governance layer.
          </p>

        </div>

      </div>

    </section>
  );
}

function AvailabilityItem({
  label,
  value,
  dot,
}: {
  label: string;
  value: number;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-1.5">

      <span
        className={`h-1.5 w-1.5 rounded-full ${dot}`}
      />

      <span className="text-[8px] font-medium text-slate-400">
        {label}
      </span>

      <span className="text-[9px] font-black text-slate-700">
        {formatNumber(value)}
      </span>

    </div>
  );
}