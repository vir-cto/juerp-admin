"use client";

import {
  useMemo,
  useState,
} from "react";

import LiveCaptainMarker, {
  type LiveCaptainMarkerData,
} from "./LiveCaptainMarker";

export type OperationsMapEntityType =
  | "CAPTAIN"
  | "ORDER"
  | "VENDOR"
  | "CUSTOMER";

export interface OperationsMapLocation {
  latitude: number;
  longitude: number;
}

export interface OperationsMapEntity {
  id: string;
  type: OperationsMapEntityType;
  name: string;
  location: OperationsMapLocation;
  status?: string;
  subtitle?: string;
}

interface OperationsMapProps {
  center?: OperationsMapLocation;

  zoom?: number;

  captains?: LiveCaptainMarkerData[];

  entities?: OperationsMapEntity[];

  selectedCaptainId?: string;

  onCaptainClick?: (
    captain: LiveCaptainMarkerData
  ) => void;

  onEntityClick?: (
    entity: OperationsMapEntity
  ) => void;

  onViewCaptainDetails?: (
    captain: LiveCaptainMarkerData
  ) => void;

  showCaptains?: boolean;

  showOtherEntities?: boolean;

  showLegend?: boolean;

  height?: number | string;

  loading?: boolean;

  className?: string;
}

const DEFAULT_CENTER: OperationsMapLocation = {
  latitude: 16.3067,
  longitude: 80.4365,
};

const DEFAULT_ZOOM = 12;

function clamp(
  value: number,
  minimum: number,
  maximum: number
): number {
  return Math.min(
    Math.max(value, minimum),
    maximum
  );
}

function normalizeLongitude(
  longitude: number
): number {
  if (longitude >= -180 && longitude <= 180) {
    return longitude;
  }

  const normalized =
    ((longitude + 180) % 360 + 360) %
      360 -
    180;

  return normalized;
}

function isValidCoordinate(
  location?: OperationsMapLocation
): boolean {
  if (!location) {
    return false;
  }

  return (
    Number.isFinite(
      location.latitude
    ) &&
    Number.isFinite(
      location.longitude
    ) &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
}

function projectCoordinate(
  location: OperationsMapLocation,
  center: OperationsMapLocation,
  zoom: number
): {
  left: number;
  top: number;
} {
  const safeLatitude = clamp(
    location.latitude,
    -85.05112878,
    85.05112878
  );

  const safeCenterLatitude = clamp(
    center.latitude,
    -85.05112878,
    85.05112878
  );

  const longitude =
    normalizeLongitude(
      location.longitude
    );

  const centerLongitude =
    normalizeLongitude(
      center.longitude
    );

  const latitudeRadians =
    (safeLatitude * Math.PI) / 180;

  const centerLatitudeRadians =
    (safeCenterLatitude * Math.PI) / 180;

  const scale =
    Math.pow(2, zoom);

  const x =
    ((longitude + 180) / 360) *
    scale;

  const centerX =
    ((centerLongitude + 180) / 360) *
    scale;

  const mercatorY =
    (1 -
      Math.log(
        Math.tan(
          latitudeRadians
        ) +
          1 /
            Math.cos(
              latitudeRadians
            )
      ) /
        Math.PI) /
    2 *
    scale;

  const centerMercatorY =
    (1 -
      Math.log(
        Math.tan(
          centerLatitudeRadians
        ) +
          1 /
            Math.cos(
              centerLatitudeRadians
            )
      ) /
        Math.PI) /
    2 *
    scale;

  /*
   * Convert the projected difference
   * into a percentage-like map position.
   *
   * The visible viewport is intentionally
   * larger than the coordinate range so that
   * markers remain inside the operational map.
   */

  const worldWidth = 256;

  const offsetX =
    (x - centerX) *
    worldWidth;

  const offsetY =
    (mercatorY -
      centerMercatorY) *
    worldWidth;

  const viewportScale =
    0.65;

  return {
    left:
      50 +
      offsetX *
        viewportScale,
    top:
      50 +
      offsetY *
        viewportScale,
  };
}

function getEntityColor(
  type: OperationsMapEntityType
): string {
  switch (type) {
    case "CAPTAIN":
      return "bg-orange-500";

    case "ORDER":
      return "bg-blue-500";

    case "VENDOR":
      return "bg-green-500";

    case "CUSTOMER":
      return "bg-purple-500";

    default:
      return "bg-slate-500";
  }
}

function getEntityLabel(
  type: OperationsMapEntityType
): string {
  switch (type) {
    case "CAPTAIN":
      return "Captain";

    case "ORDER":
      return "Order";

    case "VENDOR":
      return "Vendor";

    case "CUSTOMER":
      return "Customer";

    default:
      return "Entity";
  }
}

function getMapBackgroundStyle() {
  return {
    backgroundImage: `
      linear-gradient(
        to right,
        rgba(148, 163, 184, 0.12) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgba(148, 163, 184, 0.12) 1px,
        transparent 1px
      )
    `,
    backgroundSize:
      "48px 48px",
  };
}

export default function OperationsMap({
  center = DEFAULT_CENTER,
  zoom = DEFAULT_ZOOM,
  captains = [],
  entities = [],
  selectedCaptainId,
  onCaptainClick,
  onEntityClick,
  onViewCaptainDetails,
  showCaptains = true,
  showOtherEntities = true,
  showLegend = true,
  height = 520,
  loading = false,
  className = "",
}: OperationsMapProps) {
  const [
    internalSelectedCaptainId,
    setInternalSelectedCaptainId,
  ] = useState<
    string | undefined
  >(selectedCaptainId);

  const [
    mapZoom,
    setMapZoom,
  ] = useState(zoom);

  const [
    showOnlineCaptains,
    setShowOnlineCaptains,
  ] = useState(true);

  const [
    showBusyCaptains,
    setShowBusyCaptains,
  ] = useState(true);

  const [
    showOtherMapEntities,
    setShowOtherMapEntities,
  ] = useState(
    showOtherEntities
  );

  const activeCenter =
    isValidCoordinate(center)
      ? center
      : DEFAULT_CENTER;

  const validCaptains =
    useMemo(() => {
      return captains.filter(
        (captain) =>
          isValidCoordinate(
            captain.location
          )
      );
    }, [captains]);

  const visibleCaptains =
    useMemo(() => {
      if (!showCaptains) {
        return [];
      }

      return validCaptains.filter(
        (captain) => {
          if (
            captain.onlineStatus ===
            "OFFLINE"
          ) {
            return false;
          }

          if (
            captain.availability ===
              "AVAILABLE" &&
            !showOnlineCaptains
          ) {
            return false;
          }

          if (
            captain.availability ===
              "BUSY" &&
            !showBusyCaptains
          ) {
            return false;
          }

          return true;
        }
      );
    }, [
      validCaptains,
      showCaptains,
      showOnlineCaptains,
      showBusyCaptains,
    ]);

  const validEntities =
    useMemo(() => {
      if (!showOtherMapEntities) {
        return [];
      }

      return entities.filter(
        (entity) =>
          isValidCoordinate(
            entity.location
          )
      );
    }, [
      entities,
      showOtherMapEntities,
    ]);

  const selectedId =
    selectedCaptainId ??
    internalSelectedCaptainId;

  const handleCaptainClick = (
    captain: LiveCaptainMarkerData
  ) => {
    setInternalSelectedCaptainId(
      captain.captainId
    );

    onCaptainClick?.(captain);
  };

  const increaseZoom = () => {
    setMapZoom((current) =>
      clamp(
        current + 1,
        5,
        18
      )
    );
  };

  const decreaseZoom = () => {
    setMapZoom((current) =>
      clamp(
        current - 1,
        5,
        18
      )
    );
  };

  const resetZoom = () => {
    setMapZoom(zoom);
  };

  return (
    <section
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}
    >

      {/* HEADER */}

      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <div className="flex items-center gap-2">

            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
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
                  d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
                />

                <circle
                  cx="12"
                  cy="9"
                  r="2.5"
                />
              </svg>
            </span>

            <div>
              <h2 className="text-sm font-black text-slate-900">
                Operations Map
              </h2>

              <p className="text-[10px] font-medium text-slate-400">
                Live operational activity
              </p>
            </div>

          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">

          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1.5 text-[9px] font-bold text-green-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Live
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1.5 text-[9px] font-bold text-slate-600">
            {visibleCaptains.length} Captains
          </span>

        </div>

      </div>

      {/* MAP */}

      <div
        className="relative overflow-hidden bg-slate-100"
        style={{
          height,
          ...getMapBackgroundStyle(),
        }}
      >

        {/* DECORATIVE MAP AREAS */}

        <div className="absolute left-[8%] top-[12%] h-32 w-52 rotate-12 rounded-[40%] border border-slate-300/40 bg-white/40" />

        <div className="absolute right-[12%] top-[20%] h-44 w-64 -rotate-6 rounded-[45%] border border-slate-300/40 bg-white/40" />

        <div className="absolute bottom-[12%] left-[22%] h-36 w-72 rotate-3 rounded-[45%] border border-slate-300/40 bg-white/40" />

        {/* ROAD LINES */}

        <div className="absolute left-0 top-[45%] h-px w-full rotate-[-8deg] bg-slate-300/60" />

        <div className="absolute left-[-10%] top-[60%] h-px w-[120%] rotate-[12deg] bg-slate-300/50" />

        <div className="absolute left-[38%] top-[-20%] h-[140%] w-px rotate-[15deg] bg-slate-300/50" />

        <div className="absolute left-[70%] top-[-20%] h-[140%] w-px rotate-[-20deg] bg-slate-300/40" />

        {/* MAP CENTER */}

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-50">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-orange-300 bg-orange-100 text-orange-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-6 w-6"
            >
              <circle
                cx="12"
                cy="12"
                r="8"
              />

              <path
                strokeLinecap="round"
                d="M12 8v8M8 12h8"
              />
            </svg>
          </div>

          <p className="mt-2 text-[9px] font-bold text-slate-500">
            Operations Area
          </p>

        </div>

        {/* OTHER ENTITIES */}

        {validEntities.map(
          (entity) => {
            const position =
              projectCoordinate(
                entity.location,
                activeCenter,
                mapZoom
              );

            return (
              <button
                key={entity.id}
                type="button"
                onClick={() =>
                  onEntityClick?.(
                    entity
                  )
                }
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
                title={entity.name}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-md ${getEntityColor(
                    entity.type
                  )}`}
                >
                  <span className="text-[9px] font-black text-white">
                    {entity.type ===
                    "ORDER"
                      ? "O"
                      : entity.type ===
                        "VENDOR"
                      ? "V"
                      : entity.type ===
                        "CUSTOMER"
                      ? "C"
                      : "P"}
                  </span>
                </span>

                <span className="absolute left-1/2 top-8 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[8px] font-bold text-white group-hover:block">
                  {entity.name}
                </span>
              </button>
            );
          }
        )}

        {/* CAPTAIN MARKERS */}

        {visibleCaptains.map(
          (captain) => {
            const position =
              projectCoordinate(
                captain.location,
                activeCenter,
                mapZoom
              );

            const isSelected =
              selectedId ===
              captain.captainId;

            return (
              <div
                key={captain.captainId}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${position.left}%`,
                  top: `${position.top}%`,
                }}
              >
                <LiveCaptainMarker
                  captain={captain}
                  selected={
                    isSelected
                  }
                  onClick={
                    handleCaptainClick
                  }
                  onViewDetails={
                    onViewCaptainDetails
                  }
                />
              </div>
            );
          }
        )}

        {/* LOADING */}

        {loading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">

            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center shadow-xl">

              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />

              <p className="mt-3 text-xs font-bold text-slate-700">
                Loading operations...
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Synchronizing operational data
              </p>

            </div>

          </div>
        )}

        {/* EMPTY STATE */}

        {!loading &&
          visibleCaptains.length ===
            0 &&
          validEntities.length ===
            0 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">

              <div className="rounded-2xl border border-slate-200 bg-white/95 px-6 py-5 text-center shadow-lg backdrop-blur">

                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
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
                      d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
                    />

                    <circle
                      cx="12"
                      cy="9"
                      r="2.5"
                    />
                  </svg>
                </div>

                <p className="mt-3 text-xs font-black text-slate-800">
                  No live activity
                </p>

                <p className="mt-1 max-w-xs text-[10px] leading-4 text-slate-400">
                  No authorized operational
                  locations are currently
                  available for this map.
                </p>

              </div>

            </div>
          )}

        {/* MAP CONTROLS */}

        <div className="absolute right-4 top-4 z-40 flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">

          <button
            type="button"
            onClick={increaseZoom}
            className="flex h-9 w-9 items-center justify-center border-b border-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-50"
            aria-label="Zoom in"
          >
            +
          </button>

          <button
            type="button"
            onClick={decreaseZoom}
            className="flex h-9 w-9 items-center justify-center border-b border-slate-100 text-lg font-bold text-slate-600 hover:bg-slate-50"
            aria-label="Zoom out"
          >
            −
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className="flex h-9 w-9 items-center justify-center text-[9px] font-bold text-slate-500 hover:bg-slate-50"
            aria-label="Reset zoom"
          >
            R
          </button>

        </div>

        {/* FILTER CONTROL */}

        <div className="absolute bottom-4 left-4 z-40 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">

          <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-slate-500">
            Map Filters
          </p>

          <div className="space-y-2">

            <FilterCheckbox
              label="Available Captains"
              checked={
                showOnlineCaptains
              }
              onChange={
                setShowOnlineCaptains
              }
              color="bg-green-500"
            />

            <FilterCheckbox
              label="Busy Captains"
              checked={
                showBusyCaptains
              }
              onChange={
                setShowBusyCaptains
              }
              color="bg-amber-500"
            />

            <FilterCheckbox
              label="Other Entities"
              checked={
                showOtherMapEntities
              }
              onChange={
                setShowOtherMapEntities
              }
              color="bg-blue-500"
            />

          </div>

        </div>

        {/* LEGEND */}

        {showLegend && (
          <div className="absolute bottom-4 right-4 z-40 hidden rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur sm:block">

            <p className="mb-2 text-[9px] font-black uppercase tracking-wider text-slate-500">
              Legend
            </p>

            <div className="space-y-1.5">

              <LegendItem
                color="bg-orange-500"
                label="Captain"
              />

              <LegendItem
                color="bg-blue-500"
                label="Order"
              />

              <LegendItem
                color="bg-green-500"
                label="Vendor"
              />

              <LegendItem
                color="bg-purple-500"
                label="Customer"
              />

            </div>

          </div>
        )}

      </div>

      {/* FOOTER */}

      <div className="flex flex-col gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex flex-wrap items-center gap-3">

          <span className="text-[9px] font-bold text-slate-400">
            Center:
          </span>

          <span className="text-[9px] font-semibold text-slate-600">
            {activeCenter.latitude.toFixed(
              4
            )}
            ,{" "}
            {activeCenter.longitude.toFixed(
              4
            )}
          </span>

          <span className="text-[9px] font-bold text-slate-400">
            Zoom {mapZoom}
          </span>

        </div>

        <div className="text-[9px] font-medium text-slate-400">
          Live location data is controlled
          by the trusted operational backend.
        </div>

      </div>

    </section>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
  color,
}: {
  label: string;
  checked: boolean;
  onChange: (
    value: boolean
  ) => void;
  color: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2">

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked
          )
        }
        className="sr-only"
      />

      <span
        className={`flex h-4 w-4 items-center justify-center rounded border ${
          checked
            ? `${color} border-transparent`
            : "border-slate-300 bg-white"
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            className="h-3 w-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 10l4 4 8-8"
            />
          </svg>
        )}
      </span>

      <span className="text-[9px] font-semibold text-slate-600">
        {label}
      </span>

    </label>
  );
}

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${color}`}
      />

      <span className="text-[9px] font-semibold text-slate-600">
        {label}
      </span>

    </div>
  );
}