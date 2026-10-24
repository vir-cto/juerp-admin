"use client";

import { useCallback, useEffect, useState } from "react";

export type CaptainOnlineStatus =
  | "ONLINE"
  | "OFFLINE";

export type CaptainAvailabilityStatus =
  | "AVAILABLE"
  | "BUSY"
  | "BLOCKED";

export type LiveCaptainLocation = {
  captainId: string;

  latitude: number;
  longitude: number;

  accuracyMeters: number;

  heading?: number;
  speedKmh?: number;

  onlineStatus: CaptainOnlineStatus;
  availabilityStatus: CaptainAvailabilityStatus;

  updatedAt: string;
};

export type LiveMapData = {
  captains: LiveCaptainLocation[];
  updatedAt?: string;
};

type UseLiveMapDataOptions = {
  enabled?: boolean;
  refreshIntervalMs?: number;

  /**
   * Optional filtering.
   */
  onlineOnly?: boolean;
  availableOnly?: boolean;

  /**
   * Optional module/service filter if the backend supports it.
   */
  serviceType?: string;
};

type UseLiveMapDataReturn = {
  captains: LiveCaptainLocation[];

  loading: boolean;
  error: string | null;

  lastUpdatedAt: string | null;

  onlineCaptains: LiveCaptainLocation[];
  availableCaptains: LiveCaptainLocation[];
  busyCaptains: LiveCaptainLocation[];

  refresh: () => Promise<void>;
};

function isValidLatitude(
  latitude: number,
): boolean {
  return (
    Number.isFinite(latitude) &&
    latitude >= -90 &&
    latitude <= 90
  );
}

function isValidLongitude(
  longitude: number,
): boolean {
  return (
    Number.isFinite(longitude) &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function normalizeCaptainLocation(
  value: unknown,
): LiveCaptainLocation | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.captainId !== "string" ||
    typeof item.latitude !== "number" ||
    typeof item.longitude !== "number" ||
    typeof item.accuracyMeters !== "number" ||
    typeof item.onlineStatus !== "string" ||
    typeof item.availabilityStatus !== "string" ||
    typeof item.updatedAt !== "string"
  ) {
    return null;
  }

  if (
    !isValidLatitude(item.latitude) ||
    !isValidLongitude(item.longitude)
  ) {
    return null;
  }

  if (
    item.onlineStatus !== "ONLINE" &&
    item.onlineStatus !== "OFFLINE"
  ) {
    return null;
  }

  if (
    item.availabilityStatus !== "AVAILABLE" &&
    item.availabilityStatus !== "BUSY" &&
    item.availabilityStatus !== "BLOCKED"
  ) {
    return null;
  }

  return {
    captainId: item.captainId,

    latitude: item.latitude,
    longitude: item.longitude,

    accuracyMeters: Math.max(
      0,
      item.accuracyMeters,
    ),

    heading:
      typeof item.heading === "number"
        ? item.heading
        : undefined,

    speedKmh:
      typeof item.speedKmh === "number"
        ? item.speedKmh
        : undefined,

    onlineStatus:
      item.onlineStatus as CaptainOnlineStatus,

    availabilityStatus:
      item.availabilityStatus as CaptainAvailabilityStatus,

    updatedAt: item.updatedAt,
  };
}

function extractCaptains(
  data: unknown,
): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object"
  ) {
    const object =
      data as Record<string, unknown>;

    if (Array.isArray(object.captains)) {
      return object.captains;
    }

    if (
      object.data &&
      typeof object.data === "object"
    ) {
      const nested =
        object.data as Record<
          string,
          unknown
        >;

      if (Array.isArray(nested.captains)) {
        return nested.captains;
      }
    }
  }

  return [];
}

export function useLiveMapData(
  options: UseLiveMapDataOptions = {},
): UseLiveMapDataReturn {
  const {
    enabled = true,
    refreshIntervalMs = 10000,
    onlineOnly = false,
    availableOnly = false,
    serviceType,
  } = options;

  const [captains, setCaptains] = useState<
    LiveCaptainLocation[]
  >([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [error, setError] =
    useState<string | null>(null);

  const [lastUpdatedAt, setLastUpdatedAt] =
    useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setCaptains([]);
      setLoading(false);
      setError(null);
      setLastUpdatedAt(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (onlineOnly) {
        params.set("onlineStatus", "ONLINE");
      }

      if (availableOnly) {
        params.set(
          "availabilityStatus",
          "AVAILABLE",
        );
      }

      if (serviceType) {
        params.set(
          "serviceType",
          serviceType,
        );
      }

      /*
       * Demo mode is intentionally empty.
       *
       * We do NOT create fake captain locations because
       * live location is operational data and should come
       * from the backend/Firestore location contract.
       */
      const demoMode =
        process.env.NEXT_PUBLIC_DEMO_MODE ===
        "true";

      if (demoMode) {
        setCaptains([]);
        setLastUpdatedAt(null);
        return;
      }

      const queryString =
        params.toString();

      const response = await fetch(
        `/api/live-map/captains${
          queryString
            ? `?${queryString}`
            : ""
        }`,
        {
          method: "GET",

          headers: {
            Accept: "application/json",
          },

          credentials: "include",

          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to load live map data (${response.status})`,
        );
      }

      const data: unknown =
        await response.json();

      const rawCaptains =
        extractCaptains(data);

      const normalizedCaptains =
        rawCaptains
          .map(normalizeCaptainLocation)
          .filter(
            (
              captain,
            ): captain is LiveCaptainLocation =>
              captain !== null,
          );

      setCaptains(normalizedCaptains);

      /*
       * Prefer the backend supplied timestamp.
       * If unavailable, use the latest captain update.
       */
      let newestTimestamp: string | null =
        null;

      for (const captain of normalizedCaptains) {
        if (
          newestTimestamp === null ||
          new Date(
            captain.updatedAt,
          ).getTime() >
            new Date(
              newestTimestamp,
            ).getTime()
        ) {
          newestTimestamp =
            captain.updatedAt;
        }
      }

      setLastUpdatedAt(
        newestTimestamp,
      );
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load live map data.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }, [
    enabled,
    onlineOnly,
    availableOnly,
    serviceType,
  ]);

  useEffect(() => {
    void refresh();

    if (
      !enabled ||
      refreshIntervalMs <= 0
    ) {
      return;
    }

    const intervalId =
      window.setInterval(() => {
        void refresh();
      }, refreshIntervalMs);

    return () => {
      window.clearInterval(
        intervalId,
      );
    };
  }, [
    enabled,
    refresh,
    refreshIntervalMs,
  ]);

  const onlineCaptains =
    captains.filter(
      (captain) =>
        captain.onlineStatus ===
        "ONLINE",
    );

  const availableCaptains =
    captains.filter(
      (captain) =>
        captain.onlineStatus ===
          "ONLINE" &&
        captain.availabilityStatus ===
          "AVAILABLE",
    );

  const busyCaptains =
    captains.filter(
      (captain) =>
        captain.onlineStatus ===
          "ONLINE" &&
        captain.availabilityStatus ===
          "BUSY",
    );

  return {
    captains,

    loading,
    error,

    lastUpdatedAt,

    onlineCaptains,
    availableCaptains,
    busyCaptains,

    refresh,
  };
}

export default useLiveMapData;