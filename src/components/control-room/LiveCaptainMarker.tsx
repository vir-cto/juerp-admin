"use client";

import {
  ReactNode,
} from "react";

export type CaptainOnlineStatus =
  | "ONLINE"
  | "OFFLINE";

export type CaptainAvailabilityStatus =
  | "AVAILABLE"
  | "BUSY"
  | "BLOCKED";

export interface CaptainLocation {
  latitude: number;
  longitude: number;
  accuracy?: number;
  heading?: number;
  speedKmph?: number;
  updatedAt?: string;
}

export interface LiveCaptainMarkerData {
  captainId: string;
  name: string;
  phone?: string;
  onlineStatus: CaptainOnlineStatus;
  availability: CaptainAvailabilityStatus;
  vehicleType?: string;
  vehicleNumber?: string;
  serviceId?: string;
  location: CaptainLocation;
}

interface LiveCaptainMarkerProps {
  captain: LiveCaptainMarkerData;

  selected?: boolean;

  showDetails?: boolean;

  onClick?: (
    captain: LiveCaptainMarkerData
  ) => void;

  onViewDetails?: (
    captain: LiveCaptainMarkerData
  ) => void;

  className?: string;
}

const AVAILABILITY_CONFIG: Record<
  CaptainAvailabilityStatus,
  {
    label: string;
    background: string;
    text: string;
    dot: string;
  }
> = {
  AVAILABLE: {
    label: "Available",
    background: "bg-green-100",
    text: "text-green-700",
    dot: "bg-green-500",
  },

  BUSY: {
    label: "Busy",
    background: "bg-amber-100",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },

  BLOCKED: {
    label: "Blocked",
    background: "bg-red-100",
    text: "text-red-700",
    dot: "bg-red-500",
  },
};

function formatUpdatedAt(
  value?: string
): string {
  if (!value) {
    return "Location update unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function formatCoordinate(
  value: number
): string {
  return value.toFixed(6);
}

function getHeadingRotation(
  heading?: number
): string {
  if (
    heading === undefined ||
    Number.isNaN(heading)
  ) {
    return "rotate-0";
  }

  return `rotate-[${Math.round(
    heading
  )}deg]`;
}

function LocationIcon(): ReactNode {
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
        d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
      />

      <circle
        cx="12"
        cy="9"
        r="2.5"
      />
    </svg>
  );
}

function CaptainIcon({
  heading,
}: {
  heading?: number;
}) {
  return (
    <div
      className="relative flex h-11 w-11 items-center justify-center"
      style={{
        transform: `rotate(${
          heading ?? 0
        }deg)`,
      }}
    >
      {/* OUTER PULSE */}

      <span className="absolute h-11 w-11 animate-ping rounded-full bg-orange-400 opacity-20" />

      {/* MARKER */}

      <div className="relative flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-orange-500 text-white shadow-lg">
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
            d="M5 17h14"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 17l1-6h8l2 6"
          />

          <circle
            cx="8"
            cy="18"
            r="1.5"
          />

          <circle
            cx="16"
            cy="18"
            r="1.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default function LiveCaptainMarker({
  captain,
  selected = false,
  showDetails = true,
  onClick,
  onViewDetails,
  className = "",
}: LiveCaptainMarkerProps) {
  const availability =
    AVAILABILITY_CONFIG[
      captain.availability
    ];

  const isOnline =
    captain.onlineStatus ===
    "ONLINE";

  return (
    <div
      className={`relative ${className}`}
    >

      {/* MAP MARKER */}

      <button
        type="button"
        aria-label={`Captain ${captain.name}`}
        onClick={() =>
          onClick?.(captain)
        }
        className={`group relative flex items-center justify-center rounded-full transition-transform ${
          selected
            ? "scale-110"
            : "hover:scale-105"
        }`}
      >
        <CaptainIcon
          heading={captain.location.heading}
        />

        {/* ONLINE INDICATOR */}

        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            isOnline
              ? "bg-green-500"
              : "bg-slate-400"
          }`}
        />
      </button>

      {/* INFORMATION CARD */}

      {showDetails && (
        <div
          className={`absolute bottom-14 left-1/2 z-30 w-72 -translate-x-1/2 rounded-2xl border bg-white p-4 shadow-xl transition ${
            selected
              ? "border-orange-300"
              : "border-slate-200"
          }`}
        >

          {/* HEADER */}

          <div className="flex items-start gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <LocationIcon />
            </div>

            <div className="min-w-0 flex-1">

              <div className="flex items-center gap-2">

                <h3 className="truncate text-sm font-black text-slate-900">
                  {captain.name}
                </h3>

                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    isOnline
                      ? "bg-green-500"
                      : "bg-slate-400"
                  }`}
                />

              </div>

              <p className="mt-1 text-[10px] font-medium text-slate-400">
                {captain.captainId}
              </p>

            </div>

          </div>

          {/* STATUS */}

          <div className="mt-4 flex flex-wrap gap-2">

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${
                isOnline
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline
                    ? "bg-green-500"
                    : "bg-slate-400"
                }`}
              />

              {isOnline
                ? "Online"
                : "Offline"}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold ${availability.background} ${availability.text}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${availability.dot}`}
              />

              {availability.label}
            </span>

          </div>

          {/* VEHICLE */}

          {(captain.vehicleType ||
            captain.vehicleNumber) && (
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">

              <InfoItem
                label="Vehicle"
                value={
                  captain.vehicleType ||
                  "—"
                }
              />

              <InfoItem
                label="Number"
                value={
                  captain.vehicleNumber ||
                  "—"
                }
              />

            </div>
          )}

          {/* LOCATION */}

          <div className="mt-3 rounded-xl border border-slate-100 p-3">

            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
              Live Location
            </p>

            <div className="mt-2 grid grid-cols-2 gap-3">

              <InfoItem
                label="Latitude"
                value={formatCoordinate(
                  captain.location.latitude
                )}
              />

              <InfoItem
                label="Longitude"
                value={formatCoordinate(
                  captain.location.longitude
                )}
              />

            </div>

            {captain.location.speedKmph !==
              undefined && (
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">

                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  Speed
                </span>

                <span className="text-xs font-black text-slate-700">
                  {captain.location.speedKmph.toFixed(
                    1
                  )}{" "}
                  km/h
                </span>

              </div>
            )}

          </div>

          {/* UPDATED */}

          <p className="mt-3 text-[9px] font-medium text-slate-400">
            Updated{" "}
            {formatUpdatedAt(
              captain.location.updatedAt
            )}
          </p>

          {/* ACTION */}

          {onViewDetails && (
            <button
              type="button"
              onClick={() =>
                onViewDetails(captain)
              }
              className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-orange-600"
            >
              View Captain Details
            </button>
          )}

        </div>
      )}

    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">

      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-[10px] font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}