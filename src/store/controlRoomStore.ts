/**
 * JUERP - Control Room Store
 *
 * File:
 * src/store/controlRoomStore.ts
 *
 * Purpose:
 * - Manage UI state for the ERP Control Room.
 * - Track selected modules, filters, live refresh state,
 *   selected orders/captains/vendors, and control-room view state.
 *
 * IMPORTANT:
 * - This is a client-side UI store.
 * - It does NOT become the source of truth for orders, dispatch,
 *   captain location, settlements, payments, KYC, or financial data.
 * - Backend/Firestore data remains authoritative.
 * - This store must never directly modify ERP financial rules.
 */

"use client";

import { useEffect, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type ControlRoomModule =
  | "ALL"
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export type ControlRoomView =
  | "OVERVIEW"
  | "ORDERS"
  | "DISPATCH"
  | "CAPTAINS"
  | "VENDORS"
  | "MAP"
  | "ALERTS";

export type ControlRoomOrderFilter =
  | "ALL"
  | "NEW"
  | "ACTIVE"
  | "READY"
  | "ASSIGNED"
  | "OUT_FOR_DELIVERY"
  | "COMPLETED";

export type ControlRoomCaptainFilter =
  | "ALL"
  | "ONLINE"
  | "AVAILABLE"
  | "BUSY"
  | "OFFLINE"
  | "BLOCKED";

export type ControlRoomVendorFilter =
  | "ALL"
  | "ACTIVE"
  | "PENDING"
  | "REJECTED"
  | "INACTIVE";

export interface ControlRoomFilters {
  module: ControlRoomModule;

  orderStatus: ControlRoomOrderFilter;

  captainStatus: ControlRoomCaptainFilter;

  vendorStatus: ControlRoomVendorFilter;

  search: string;

  city: string;

  district: string;

  state: string;
}

export interface ControlRoomSelection {
  orderId: string | null;

  captainId: string | null;

  vendorId: string | null;

  deliveryId: string | null;

  rideId: string | null;

  bookingId: string | null;
}

export interface ControlRoomState {
  view: ControlRoomView;

  filters: ControlRoomFilters;

  selection: ControlRoomSelection;

  /**
   * Whether the Control Room should actively refresh live data.
   */
  liveMode: boolean;

  /**
   * Refresh interval in milliseconds.
   */
  refreshIntervalMs: number;

  /**
   * Whether a refresh is currently in progress.
   */
  refreshing: boolean;

  /**
   * Last successful refresh timestamp.
   */
  lastRefreshedAt: number | null;

  /**
   * Whether the map is expanded.
   */
  mapExpanded: boolean;

  /**
   * Whether the sidebar is collapsed.
   */
  sidebarCollapsed: boolean;

  /**
   * Whether filters panel is open.
   */
  filtersOpen: boolean;

  /**
   * Whether notification/alert panel is open.
   */
  alertsOpen: boolean;

  /**
   * UI error only.
   */
  error: string | null;
}

export interface ControlRoomActions {
  setView: (view: ControlRoomView) => void;

  setModule: (
    module: ControlRoomModule,
  ) => void;

  setOrderStatus: (
    status: ControlRoomOrderFilter,
  ) => void;

  setCaptainStatus: (
    status: ControlRoomCaptainFilter,
  ) => void;

  setVendorStatus: (
    status: ControlRoomVendorFilter,
  ) => void;

  setSearch: (
    search: string,
  ) => void;

  setCity: (
    city: string,
  ) => void;

  setDistrict: (
    district: string,
  ) => void;

  setState: (
    state: string,
  ) => void;

  setFilters: (
    filters: Partial<ControlRoomFilters>,
  ) => void;

  resetFilters: () => void;

  selectOrder: (
    orderId: string | null,
  ) => void;

  selectCaptain: (
    captainId: string | null,
  ) => void;

  selectVendor: (
    vendorId: string | null,
  ) => void;

  selectDelivery: (
    deliveryId: string | null,
  ) => void;

  selectRide: (
    rideId: string | null,
  ) => void;

  selectBooking: (
    bookingId: string | null,
  ) => void;

  clearSelection: () => void;

  setLiveMode: (
    enabled: boolean,
  ) => void;

  setRefreshInterval: (
    milliseconds: number,
  ) => void;

  setRefreshing: (
    refreshing: boolean,
  ) => void;

  markRefreshed: () => void;

  toggleMapExpanded: () => void;

  toggleSidebar: () => void;

  toggleFilters: () => void;

  toggleAlerts: () => void;

  setError: (
    error: string | null,
  ) => void;

  clearError: () => void;

  resetControlRoom: () => void;
}

export type ControlRoomStore =
  ControlRoomState & ControlRoomActions;

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_REFRESH_INTERVAL_MS =
  10_000;

export const MIN_REFRESH_INTERVAL_MS =
  5_000;

export const MAX_REFRESH_INTERVAL_MS =
  300_000;

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

export const DEFAULT_CONTROL_ROOM_FILTERS: ControlRoomFilters =
  {
    module: "ALL",
    orderStatus: "ALL",
    captainStatus: "ALL",
    vendorStatus: "ALL",
    search: "",
    city: "",
    district: "",
    state: "",
  };

export const DEFAULT_CONTROL_ROOM_SELECTION: ControlRoomSelection =
  {
    orderId: null,
    captainId: null,
    vendorId: null,
    deliveryId: null,
    rideId: null,
    bookingId: null,
  };

export const initialControlRoomState: ControlRoomState =
  {
    view: "OVERVIEW",

    filters: {
      ...DEFAULT_CONTROL_ROOM_FILTERS,
    },

    selection: {
      ...DEFAULT_CONTROL_ROOM_SELECTION,
    },

    liveMode: true,

    refreshIntervalMs:
      DEFAULT_REFRESH_INTERVAL_MS,

    refreshing: false,

    lastRefreshedAt: null,

    mapExpanded: false,

    sidebarCollapsed: false,

    filtersOpen: false,

    alertsOpen: false,

    error: null,
  };

/* -------------------------------------------------------------------------- */
/* Module State                                                               */
/* -------------------------------------------------------------------------- */

let storeState: ControlRoomState = {
  ...initialControlRoomState,

  filters: {
    ...DEFAULT_CONTROL_ROOM_FILTERS,
  },

  selection: {
    ...DEFAULT_CONTROL_ROOM_SELECTION,
  },
};

const listeners = new Set<
  (state: ControlRoomState) => void
>();

/* -------------------------------------------------------------------------- */
/* Internal Helpers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Notify subscribers.
 */
function notify(): void {
  const snapshot = getControlRoomState();

  listeners.forEach((listener) => {
    listener(snapshot);
  });
}

/**
 * Update store state.
 */
function setStoreState(
  updates: Partial<ControlRoomState>,
): void {
  storeState = {
    ...storeState,
    ...updates,
  };

  notify();
}

/**
 * Normalize refresh interval.
 */
function normalizeRefreshInterval(
  milliseconds: number,
): number {
  if (!Number.isFinite(milliseconds)) {
    return DEFAULT_REFRESH_INTERVAL_MS;
  }

  return Math.min(
    MAX_REFRESH_INTERVAL_MS,
    Math.max(
      MIN_REFRESH_INTERVAL_MS,
      Math.round(milliseconds),
    ),
  );
}

/**
 * Normalize search text.
 */
function normalizeSearch(
  search: string,
): string {
  return search.trim();
}

/* -------------------------------------------------------------------------- */
/* State Access                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Get current Control Room state.
 */
export function getControlRoomState(): ControlRoomState {
  return {
    ...storeState,

    filters: {
      ...storeState.filters,
    },

    selection: {
      ...storeState.selection,
    },
  };
}

/**
 * Get current filters.
 */
export function getControlRoomFilters(): ControlRoomFilters {
  return {
    ...storeState.filters,
  };
}

/**
 * Get current selection.
 */
export function getControlRoomSelection(): ControlRoomSelection {
  return {
    ...storeState.selection,
  };
}

/**
 * Get currently selected order.
 */
export function getSelectedOrderId(): string | null {
  return storeState.selection.orderId;
}

/**
 * Get currently selected captain.
 */
export function getSelectedCaptainId(): string | null {
  return storeState.selection.captainId;
}

/**
 * Get currently selected vendor.
 */
export function getSelectedVendorId(): string | null {
  return storeState.selection.vendorId;
}

/* -------------------------------------------------------------------------- */
/* Subscription                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to Control Room state changes.
 */
export function subscribeToControlRoom(
  listener: (
    state: ControlRoomState,
  ) => void,
): () => void {
  listeners.add(listener);

  listener(getControlRoomState());

  return () => {
    listeners.delete(listener);
  };
}

/* -------------------------------------------------------------------------- */
/* View                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Change Control Room view.
 */
export function setControlRoomView(
  view: ControlRoomView,
): void {
  setStoreState({
    view,
  });
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Set selected module.
 */
export function setControlRoomModule(
  module: ControlRoomModule,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      module,
    },
  });
}

/**
 * Set order filter.
 */
export function setControlRoomOrderStatus(
  status: ControlRoomOrderFilter,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      orderStatus: status,
    },
  });
}

/**
 * Set captain filter.
 */
export function setControlRoomCaptainStatus(
  status: ControlRoomCaptainFilter,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      captainStatus: status,
    },
  });
}

/**
 * Set vendor filter.
 */
export function setControlRoomVendorStatus(
  status: ControlRoomVendorFilter,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      vendorStatus: status,
    },
  });
}

/**
 * Set search text.
 */
export function setControlRoomSearch(
  search: string,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      search: normalizeSearch(search),
    },
  });
}

/**
 * Set city filter.
 */
export function setControlRoomCity(
  city: string,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      city: city.trim(),
    },
  });
}

/**
 * Set district filter.
 */
export function setControlRoomDistrict(
  district: string,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      district: district.trim(),
    },
  });
}

/**
 * Set state filter.
 */
export function setControlRoomStateFilter(
  state: string,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      state: state.trim(),
    },
  });
}

/**
 * Update multiple filters.
 */
export function setControlRoomFilters(
  filters: Partial<ControlRoomFilters>,
): void {
  const nextFilters: ControlRoomFilters = {
    ...storeState.filters,
    ...filters,
  };

  if (filters.search !== undefined) {
    nextFilters.search =
      normalizeSearch(
        filters.search,
      );
  }

  if (filters.city !== undefined) {
    nextFilters.city =
      filters.city.trim();
  }

  if (filters.district !== undefined) {
    nextFilters.district =
      filters.district.trim();
  }

  if (filters.state !== undefined) {
    nextFilters.state =
      filters.state.trim();
  }

  setStoreState({
    filters: nextFilters,
  });
}

/**
 * Reset all Control Room filters.
 */
export function resetControlRoomFilters(): void {
  setStoreState({
    filters: {
      ...DEFAULT_CONTROL_ROOM_FILTERS,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* Selection                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Select an order.
 */
export function selectControlRoomOrder(
  orderId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      orderId,
    },
  });
}

/**
 * Select a captain.
 */
export function selectControlRoomCaptain(
  captainId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      captainId,
    },
  });
}

/**
 * Select a vendor.
 */
export function selectControlRoomVendor(
  vendorId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      vendorId,
    },
  });
}

/**
 * Select a delivery.
 */
export function selectControlRoomDelivery(
  deliveryId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      deliveryId,
    },
  });
}

/**
 * Select a ride.
 */
export function selectControlRoomRide(
  rideId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      rideId,
    },
  });
}

/**
 * Select a booking.
 */
export function selectControlRoomBooking(
  bookingId: string | null,
): void {
  setStoreState({
    selection: {
      ...storeState.selection,
      bookingId,
    },
  });
}

/**
 * Clear all selected entities.
 */
export function clearControlRoomSelection(): void {
  setStoreState({
    selection: {
      ...DEFAULT_CONTROL_ROOM_SELECTION,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* Live Mode                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Enable or disable live refresh mode.
 */
export function setControlRoomLiveMode(
  enabled: boolean,
): void {
  setStoreState({
    liveMode: enabled,
  });
}

/**
 * Set refresh interval.
 *
 * The store enforces a safe UI refresh range.
 */
export function setControlRoomRefreshInterval(
  milliseconds: number,
): void {
  setStoreState({
    refreshIntervalMs:
      normalizeRefreshInterval(
        milliseconds,
      ),
  });
}

/**
 * Mark a refresh as started/stopped.
 */
export function setControlRoomRefreshing(
  refreshing: boolean,
): void {
  setStoreState({
    refreshing,
  });
}

/**
 * Mark the latest successful refresh.
 */
export function markControlRoomRefreshed(): void {
  setStoreState({
    refreshing: false,
    lastRefreshedAt: Date.now(),
    error: null,
  });
}

/* -------------------------------------------------------------------------- */
/* Layout                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Expand/collapse map.
 */
export function toggleControlRoomMap(): void {
  setStoreState({
    mapExpanded:
      !storeState.mapExpanded,
  });
}

/**
 * Set map expanded state.
 */
export function setControlRoomMapExpanded(
  expanded: boolean,
): void {
  setStoreState({
    mapExpanded: expanded,
  });
}

/**
 * Expand/collapse sidebar.
 */
export function toggleControlRoomSidebar(): void {
  setStoreState({
    sidebarCollapsed:
      !storeState.sidebarCollapsed,
  });
}

/**
 * Set sidebar state.
 */
export function setControlRoomSidebarCollapsed(
  collapsed: boolean,
): void {
  setStoreState({
    sidebarCollapsed: collapsed,
  });
}

/**
 * Expand/collapse filters.
 */
export function toggleControlRoomFilters(): void {
  setStoreState({
    filtersOpen:
      !storeState.filtersOpen,
  });
}

/**
 * Set filter panel state.
 */
export function setControlRoomFiltersOpen(
  open: boolean,
): void {
  setStoreState({
    filtersOpen: open,
  });
}

/**
 * Expand/collapse alerts.
 */
export function toggleControlRoomAlerts(): void {
  setStoreState({
    alertsOpen:
      !storeState.alertsOpen,
  });
}

/**
 * Set alerts panel state.
 */
export function setControlRoomAlertsOpen(
  open: boolean,
): void {
  setStoreState({
    alertsOpen: open,
  });
}

/* -------------------------------------------------------------------------- */
/* Error Handling                                                             */
/* -------------------------------------------------------------------------- */

/**
 * Set UI error.
 */
export function setControlRoomError(
  error: string | null,
): void {
  setStoreState({
    error,
  });
}

/**
 * Clear UI error.
 */
export function clearControlRoomError(): void {
  setStoreState({
    error: null,
  });
}

/* -------------------------------------------------------------------------- */
/* Reset                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Reset Control Room to its initial UI state.
 */
export function resetControlRoom(): void {
  setStoreState({
    ...initialControlRoomState,

    filters: {
      ...DEFAULT_CONTROL_ROOM_FILTERS,
    },

    selection: {
      ...DEFAULT_CONTROL_ROOM_SELECTION,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* React Hook                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * React hook for Control Room components.
 *
 * Example:
 *
 * const {
 *   view,
 *   filters,
 *   selection,
 *   liveMode,
 *   setView,
 * } = useControlRoomStore();
 */
export function useControlRoomStore(): ControlRoomStore {
  const [state, setState] =
    useState<ControlRoomState>(
      getControlRoomState(),
    );

  useEffect(() => {
    return subscribeToControlRoom(
      (nextState) => {
        setState(nextState);
      },
    );
  }, []);

  return {
    ...state,

    setView:
      setControlRoomView,

    setModule:
      setControlRoomModule,

    setOrderStatus:
      setControlRoomOrderStatus,

    setCaptainStatus:
      setControlRoomCaptainStatus,

    setVendorStatus:
      setControlRoomVendorStatus,

    setSearch:
      setControlRoomSearch,

    setCity:
      setControlRoomCity,

    setDistrict:
      setControlRoomDistrict,

    setState:
      setControlRoomStateFilter,

    setFilters:
      setControlRoomFilters,

    resetFilters:
      resetControlRoomFilters,

    selectOrder:
      selectControlRoomOrder,

    selectCaptain:
      selectControlRoomCaptain,

    selectVendor:
      selectControlRoomVendor,

    selectDelivery:
      selectControlRoomDelivery,

    selectRide:
      selectControlRoomRide,

    selectBooking:
      selectControlRoomBooking,

    clearSelection:
      clearControlRoomSelection,

    setLiveMode:
      setControlRoomLiveMode,

    setRefreshInterval:
      setControlRoomRefreshInterval,

    setRefreshing:
      setControlRoomRefreshing,

    markRefreshed:
      markControlRoomRefreshed,

    toggleMapExpanded:
      toggleControlRoomMap,

    toggleSidebar:
      toggleControlRoomSidebar,

    toggleFilters:
      toggleControlRoomFilters,

    toggleAlerts:
      toggleControlRoomAlerts,

    setError:
      setControlRoomError,

    clearError:
      clearControlRoomError,

    resetControlRoom,
  };
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const controlRoomStore = {
  initialControlRoomState,

  getControlRoomState,
  getControlRoomFilters,
  getControlRoomSelection,

  getSelectedOrderId,
  getSelectedCaptainId,
  getSelectedVendorId,

  subscribeToControlRoom,

  setControlRoomView,

  setControlRoomModule,
  setControlRoomOrderStatus,
  setControlRoomCaptainStatus,
  setControlRoomVendorStatus,
  setControlRoomSearch,
  setControlRoomCity,
  setControlRoomDistrict,
  setControlRoomStateFilter,
  setControlRoomFilters,
  resetControlRoomFilters,

  selectControlRoomOrder,
  selectControlRoomCaptain,
  selectControlRoomVendor,
  selectControlRoomDelivery,
  selectControlRoomRide,
  selectControlRoomBooking,
  clearControlRoomSelection,

  setControlRoomLiveMode,
  setControlRoomRefreshInterval,
  setControlRoomRefreshing,
  markControlRoomRefreshed,

  toggleControlRoomMap,
  setControlRoomMapExpanded,

  toggleControlRoomSidebar,
  setControlRoomSidebarCollapsed,

  toggleControlRoomFilters,
  setControlRoomFiltersOpen,

  toggleControlRoomAlerts,
  setControlRoomAlertsOpen,

  setControlRoomError,
  clearControlRoomError,

  resetControlRoom,
};

export default controlRoomStore;