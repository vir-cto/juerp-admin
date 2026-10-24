"use client";

import {
  useMemo,
  useState,
} from "react";

export type RevenueModule =
  | "ALL"
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export interface RevenueDataPoint {
  label: string;

  revenuePaise: number;

  transactionCount: number;

  moduleRevenue?: Partial<
    Record<
      Exclude<RevenueModule, "ALL">,
      number
    >
  >;
}

interface RevenueChartProps {
  data: RevenueDataPoint[];

  title?: string;

  description?: string;

  currency?: string;

  loading?: boolean;

  showModuleFilter?: boolean;

  showTransactionCount?: boolean;

  height?: number;

  className?: string;

  onPointClick?: (
    point: RevenueDataPoint,
    index: number
  ) => void;
}

const MODULE_CONFIG: Record<
  Exclude<RevenueModule, "ALL">,
  {
    label: string;
    shortLabel: string;
  }
> = {
  JUCART: {
    label: "JuCart",
    shortLabel: "Cart",
  },

  JURIDE: {
    label: "JuRide",
    shortLabel: "Ride",
  },

  JUSTAY: {
    label: "JuStay",
    shortLabel: "Stay",
  },

  JUHOME: {
    label: "JuHome",
    shortLabel: "Home",
  },

  JUSHOPPING: {
    label: "JuShopping",
    shortLabel: "Shopping",
  },
};

function formatCurrency(
  amountPaise: number,
  currency = "INR"
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }
  ).format(amountPaise / 100);
}

function formatCompactCurrency(
  amountPaise: number,
  currency = "INR"
): string {
  const amount =
    amountPaise / 100;

  if (currency !== "INR") {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency,
        notation: "compact",
        maximumFractionDigits: 1,
      }
    ).format(amount);
  }

  if (amount >= 10000000) {
    return `₹${(
      amount / 10000000
    ).toFixed(1)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(
      amount / 100000
    ).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(
      amount / 1000
    ).toFixed(1)}K`;
  }

  return `₹${Math.round(amount)}`;
}

function formatNumber(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);
}

function getModuleRevenue(
  point: RevenueDataPoint,
  module: RevenueModule
): number {
  if (module === "ALL") {
    return point.revenuePaise;
  }

  return (
    point.moduleRevenue?.[
      module
    ] ?? 0
  );
}

function getNiceMax(
  value: number
): number {
  if (value <= 0) {
    return 100;
  }

  const magnitude =
    10 **
    Math.floor(
      Math.log10(value)
    );

  const normalized =
    value / magnitude;

  let niceNormalized: number;

  if (normalized <= 1) {
    niceNormalized = 1;
  } else if (normalized <= 2) {
    niceNormalized = 2;
  } else if (normalized <= 5) {
    niceNormalized = 5;
  } else {
    niceNormalized = 10;
  }

  return niceNormalized * magnitude;
}

function getYAxisTicks(
  maxValue: number
): number[] {
  const niceMax =
    getNiceMax(maxValue);

  return [
    niceMax,
    niceMax * 0.75,
    niceMax * 0.5,
    niceMax * 0.25,
    0,
  ];
}

function RevenueIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19V5"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 19h16"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 15l4-4 3 2 5-6"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 7h3v3"
      />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 17l6-6 4 4 7-8"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 7h5v5"
      />
    </svg>
  );
}

function ChartTooltip({
  point,
  module,
  currency,
  position,
}: {
  point: RevenueDataPoint;
  module: RevenueModule;
  currency: string;
  position: {
    left: number;
    top: number;
  };
}) {
  const revenue =
    getModuleRevenue(
      point,
      module
    );

  return (
    <div
      className="pointer-events-none absolute z-30 w-52 -translate-x-1/2 -translate-y-full rounded-xl border border-slate-200 bg-white p-3 shadow-xl"
      style={{
        left: `${position.left}%`,
        top: `${position.top}%`,
      }}
    >
      <p className="text-[10px] font-black text-slate-900">
        {point.label}
      </p>

      <div className="mt-2 flex items-center justify-between gap-3">

        <span className="text-[9px] font-medium text-slate-500">
          Revenue
        </span>

        <span className="text-[10px] font-black text-orange-600">
          {formatCurrency(
            revenue,
            currency
          )}
        </span>

      </div>

      <div className="mt-1 flex items-center justify-between gap-3">

        <span className="text-[9px] font-medium text-slate-500">
          Transactions
        </span>

        <span className="text-[10px] font-bold text-slate-700">
          {formatNumber(
            point.transactionCount
          )}
        </span>

      </div>

      {module === "ALL" &&
        point.moduleRevenue && (
          <div className="mt-3 border-t border-slate-100 pt-2">

            <p className="mb-1 text-[8px] font-black uppercase tracking-wider text-slate-400">
              Module Revenue
            </p>

            {(
              Object.keys(
                MODULE_CONFIG
              ) as Array<
                Exclude<
                  RevenueModule,
                  "ALL"
                >
              >
            ).map(
              (moduleId) => {
                const value =
                  point
                    .moduleRevenue?.[
                    moduleId
                  ];

                if (
                  value ===
                    undefined ||
                  value === 0
                ) {
                  return null;
                }

                return (
                  <div
                    key={moduleId}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-[8px] text-slate-500">
                      {
                        MODULE_CONFIG[
                          moduleId
                        ].shortLabel
                      }
                    </span>

                    <span className="text-[8px] font-bold text-slate-700">
                      {formatCurrency(
                        value,
                        currency
                      )}
                    </span>
                  </div>
                );
              }
            )}

          </div>
        )}

    </div>
  );
}

export default function RevenueChart({
  data,
  title = "Revenue Overview",
  description = "Revenue performance across the selected period.",
  currency = "INR",
  loading = false,
  showModuleFilter = true,
  showTransactionCount = true,
  height = 330,
  className = "",
  onPointClick,
}: RevenueChartProps) {
  const [
    selectedModule,
    setSelectedModule,
  ] = useState<RevenueModule>(
    "ALL"
  );

  const [
    selectedIndex,
    setSelectedIndex,
  ] = useState<
    number | null
  >(null);

  const chartData =
    useMemo(() => {
      return data.map(
        (point) => ({
          ...point,
          chartRevenue:
            getModuleRevenue(
              point,
              selectedModule
            ),
        })
      );
    }, [
      data,
      selectedModule,
    ]);

  const maxRevenue =
    useMemo(() => {
      return Math.max(
        ...chartData.map(
          (point) =>
            point.chartRevenue
        ),
        0
      );
    }, [chartData]);

  const yAxisMax =
    getNiceMax(maxRevenue);

  const yAxisTicks =
    getYAxisTicks(
      maxRevenue
    );

  const totalRevenue =
    chartData.reduce(
      (sum, point) =>
        sum + point.chartRevenue,
      0
    );

  const totalTransactions =
    chartData.reduce(
      (sum, point) =>
        sum +
        point.transactionCount,
      0
    );

  const averageRevenue =
    chartData.length > 0
      ? totalRevenue /
        chartData.length
      : 0;

  const previousRevenue =
    chartData.length >= 2
      ? chartData
          .slice(
            0,
            Math.max(
              1,
              Math.floor(
                chartData.length /
                  2
              )
            )
          )
          .reduce(
            (sum, point) =>
              sum +
              point.chartRevenue,
            0
          )
      : 0;

  const currentRevenue =
    chartData.length >= 2
      ? chartData
          .slice(
            Math.max(
              1,
              Math.floor(
                chartData.length /
                  2
              )
            )
          )
          .reduce(
            (sum, point) =>
              sum +
              point.chartRevenue,
            0
          )
      : totalRevenue;

  const growthPercentage =
    previousRevenue > 0
      ? ((currentRevenue -
          previousRevenue) /
          previousRevenue) *
        100
      : 0;

  const hasData =
    chartData.some(
      (point) =>
        point.chartRevenue > 0
    );

  const getXPosition = (
    index: number
  ) => {
    if (
      chartData.length <= 1
    ) {
      return 50;
    }

    return (
      3 +
      (index /
        (chartData.length -
          1)) *
        94
    );
  };

  const getYPosition = (
    revenue: number
  ) => {
    if (yAxisMax <= 0) {
      return 94;
    }

    const ratio =
      revenue / yAxisMax;

    return (
      94 -
      ratio * 84
    );
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white ${className}`}
    >
      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <RevenueIcon />
            </div>

            <div>

              <h2 className="text-sm font-black text-slate-900 sm:text-base">
                {title}
              </h2>

              <p className="mt-0.5 text-[9px] leading-4 text-slate-500 sm:text-[10px]">
                {description}
              </p>

            </div>

          </div>

        </div>

        {showModuleFilter && (
          <select
            value={selectedModule}
            onChange={(event) => {
              setSelectedModule(
                event.target
                  .value as RevenueModule
              );
              setSelectedIndex(null);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
          >
            <option value="ALL">
              All Modules
            </option>

            {(
              Object.keys(
                MODULE_CONFIG
              ) as Array<
                Exclude<
                  RevenueModule,
                  "ALL"
                >
              >
            ).map(
              (moduleId) => (
                <option
                  key={moduleId}
                  value={moduleId}
                >
                  {
                    MODULE_CONFIG[
                      moduleId
                    ].label
                  }
                </option>
              )
            )}
          </select>
        )}

      </div>

      {/* SUMMARY */}

      <div className="grid grid-cols-1 gap-px border-b border-slate-100 bg-slate-100 sm:grid-cols-3">

        <SummaryMetric
          label="Total Revenue"
          value={formatCurrency(
            totalRevenue,
            currency
          )}
        />

        <SummaryMetric
          label="Transactions"
          value={formatNumber(
            totalTransactions
          )}
        />

        <SummaryMetric
          label="Period Growth"
          value={`${growthPercentage >= 0 ? "+" : ""}${growthPercentage.toFixed(1)}%`}
          valueClassName={
            growthPercentage >= 0
              ? "text-green-600"
              : "text-red-600"
          }
          icon={
            growthPercentage >=
            0 ? (
              <TrendingUpIcon />
            ) : undefined
          }
        />

      </div>

      {/* CHART */}

      <div className="p-5 sm:p-6">

        {loading ? (
          <ChartLoading
            height={height}
          />
        ) : !hasData ? (
          <ChartEmpty
            height={height}
          />
        ) : (
          <div
            className="relative"
            style={{
              height: `${height}px`,
            }}
          >

            {/* Y AXIS */}

            <div className="absolute bottom-8 left-0 top-2 flex w-14 flex-col justify-between">

              {yAxisTicks.map(
                (
                  tick,
                  index
                ) => (
                  <span
                    key={index}
                    className="text-right text-[8px] font-medium text-slate-400"
                  >
                    {formatCompactCurrency(
                      tick,
                      currency
                    )}
                  </span>
                )
              )}

            </div>

            {/* GRAPH AREA */}

            <div className="absolute bottom-8 left-16 right-0 top-2">

              {/* GRID */}

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">

                {yAxisTicks.map(
                  (
                    _,
                    index
                  ) => (
                    <div
                      key={index}
                      className="border-t border-dashed border-slate-100"
                    />
                  )
                )}

              </div>

              {/* AREA */}

              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                viewBox="0 0 1000 400"
                preserveAspectRatio="none"
                aria-label={`${title} chart`}
                role="img"
              >

                <defs>

                  <linearGradient
                    id="revenueChartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopOpacity="0.25"
                    />

                    <stop
                      offset="100%"
                      stopOpacity="0"
                    />
                  </linearGradient>

                </defs>

                {chartData.length >
                  0 && (
                  <>
                    <path
                      d={buildAreaPath(
                        chartData,
                        yAxisMax
                      )}
                      fill="url(#revenueChartGradient)"
                    />

                    <path
                      d={buildLinePath(
                        chartData,
                        yAxisMax
                      )}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                      className="text-orange-500"
                    />
                  </>
                )}

              </svg>

              {/* INTERACTION POINTS */}

              {chartData.map(
                (
                  point,
                  index
                ) => {
                  const x =
                    getXPosition(
                      index
                    );

                  const y =
                    getYPosition(
                      point.chartRevenue
                    );

                  const selected =
                    selectedIndex ===
                    index;

                  return (
                    <button
                      key={`${point.label}-${index}`}
                      type="button"
                      aria-label={`${point.label}: ${formatCurrency(point.chartRevenue, currency)}`}
                      onMouseEnter={() =>
                        setSelectedIndex(
                          index
                        )
                      }
                      onMouseLeave={() =>
                        setSelectedIndex(
                          null
                        )
                      }
                      onFocus={() =>
                        setSelectedIndex(
                          index
                        )
                      }
                      onBlur={() =>
                        setSelectedIndex(
                          null
                        )
                      }
                      onClick={() => {
                        setSelectedIndex(
                          index
                        );
                        onPointClick?.(
                          point,
                          index
                        );
                      }}
                      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                      }}
                    >
                      <span
                        className={`block rounded-full border-2 border-white bg-orange-500 shadow-sm transition-all ${
                          selected
                            ? "h-4 w-4 ring-4 ring-orange-100"
                            : "h-3 w-3"
                        }`}
                      />
                    </button>
                  );
                }
              )}

              {/* TOOLTIP */}

              {selectedIndex !==
                null &&
                chartData[
                  selectedIndex
                ] && (
                  <ChartTooltip
                    point={
                      chartData[
                        selectedIndex
                      ]
                    }
                    module={
                      selectedModule
                    }
                    currency={
                      currency
                    }
                    position={{
                      left: getXPosition(
                        selectedIndex
                      ),
                      top: Math.max(
                        10,
                        getYPosition(
                          chartData[
                            selectedIndex
                          ]
                            .chartRevenue
                        ) - 4
                      ),
                    }}
                  />
                )}

            </div>

            {/* X AXIS */}

            <div className="absolute bottom-0 left-16 right-0 flex justify-between gap-2">

              {chartData.map(
                (
                  point,
                  index
                ) => (
                  <span
                    key={`${point.label}-axis-${index}`}
                    className={`min-w-0 flex-1 truncate text-center text-[8px] font-medium ${
                      selectedIndex ===
                      index
                        ? "font-bold text-orange-600"
                        : "text-slate-400"
                    }`}
                  >
                    {point.label}
                  </span>
                )
              )}

            </div>

          </div>
        )}

      </div>

      {/* AVERAGE */}

      {!loading &&
        hasData && (
          <div className="border-t border-slate-100 px-5 py-3 sm:px-6">

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
                  Average Revenue
                </p>

                <p className="mt-1 text-xs font-black text-slate-800">
                  {formatCurrency(
                    averageRevenue,
                    currency
                  )}
                </p>

              </div>

              {showTransactionCount && (
                <p className="text-[9px] text-slate-400">
                  Revenue is shown from
                  authoritative financial
                  reporting data.
                </p>
              )}

            </div>

          </div>
        )}

      {/* GOVERNANCE */}

      <div className="border-t border-orange-100 bg-orange-50/60 px-5 py-3 sm:px-6">

        <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
          Financial Governance
        </p>

        <p className="mt-1 text-[9px] leading-4 text-orange-700">
          This chart is a reporting and
          visualization component. Revenue,
          payment, settlement, commission,
          and ledger values must come from
          authoritative backend financial
          records. The client must not
          independently calculate or modify
          financial truth.
        </p>

      </div>

    </div>
  );
}

function buildLinePath(
  data: Array<
    RevenueDataPoint & {
      chartRevenue: number;
    }
  >,
  maxValue: number
): string {
  if (data.length === 0) {
    return "";
  }

  if (data.length === 1) {
    const x = 500;

    const y =
      376 -
      (data[0].chartRevenue /
        Math.max(maxValue, 1)) *
        336;

    return `M ${x} ${y}`;
  }

  return data
    .map((point, index) => {
      const x =
        30 +
        (index /
          (data.length - 1)) *
          940;

      const y =
        376 -
        (point.chartRevenue /
          Math.max(
            maxValue,
            1
          )) *
          336;

      return `${
        index === 0
          ? "M"
          : "L"
      } ${x} ${y}`;
    })
    .join(" ");
}

function buildAreaPath(
  data: Array<
    RevenueDataPoint & {
      chartRevenue: number;
    }
  >,
  maxValue: number
): string {
  if (data.length === 0) {
    return "";
  }

  if (data.length === 1) {
    const x = 500;

    const y =
      376 -
      (data[0].chartRevenue /
        Math.max(maxValue, 1)) *
        336;

    return `M 30 376 L ${x} ${y} L 970 ${y} L 970 376 Z`;
  }

  const points = data.map(
    (point, index) => {
      const x =
        30 +
        (index /
          (data.length - 1)) *
          940;

      const y =
        376 -
        (point.chartRevenue /
          Math.max(
            maxValue,
            1
          )) *
          336;

      return {
        x,
        y,
      };
    }
  );

  const first =
    points[0];

  const last =
    points[points.length - 1];

  const line = points
    .map(
      (
        point,
        index
      ) =>
        `${
          index === 0
            ? "M"
            : "L"
        } ${point.x} ${point.y}`
    )
    .join(" ");

  return `${line} L ${last.x} 376 L ${first.x} 376 Z`;
}

function SummaryMetric({
  label,
  value,
  valueClassName = "text-slate-900",
  icon,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="bg-white px-5 py-4 sm:px-6">

      <div className="flex items-center gap-1.5">

        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>

        {icon && (
          <span className="text-green-500">
            {icon}
          </span>
        )}

      </div>

      <p
        className={`mt-1 text-base font-black ${valueClassName}`}
      >
        {value}
      </p>

    </div>
  );
}

function ChartLoading({
  height,
}: {
  height: number;
}) {
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        height: `${height}px`,
      }}
    >

      <div className="flex flex-1 items-end gap-3">

        {Array.from({
          length: 12,
        }).map(
          (_, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse rounded-t-lg bg-slate-100"
              style={{
                height: `${
                  20 +
                  ((index * 17) %
                    60)
                }%`,
              }}
            />
          )
        )}

      </div>

      <div className="h-3 w-full animate-pulse rounded bg-slate-100" />

    </div>
  );
}

function ChartEmpty({
  height,
}: {
  height: number;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{
        height: `${height}px`,
      }}
    >

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <RevenueIcon />
      </div>

      <p className="mt-3 text-xs font-bold text-slate-600">
        No revenue data available
      </p>

      <p className="mt-1 text-[9px] text-slate-400">
        Revenue information will appear when
        authoritative financial records are
        available.
      </p>

    </div>
  );
}