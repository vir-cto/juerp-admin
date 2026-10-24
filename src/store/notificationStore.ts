/**
 * JUERP - Notification Store
 *
 * File:
 * src/store/notificationStore.ts
 *
 * Purpose:
 * - Manage ERP notification UI state.
 * - Store notifications received from backend/realtime services.
 * - Track read/unread state.
 * - Support filtering and notification panel state.
 *
 * IMPORTANT:
 * - This is a client-side UI store.
 * - It does not create fake production notifications.
 * - Backend/Firestore/FCM remains authoritative.
 * - Notification permissions and delivery are handled by the
 *   appropriate backend/Firebase services.
 */

"use client";

import { useEffect, useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type NotificationType =
  | "INFO"
  | "SUCCESS"
  | "WARNING"
  | "ERROR"
  | "ORDER"
  | "DISPATCH"
  | "CAPTAIN"
  | "VENDOR"
  | "PAYMENT"
  | "SETTLEMENT"
  | "KYC"
  | "SUPPORT"
  | "SYSTEM";

export type NotificationPriority =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export type NotificationEntityType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY"
  | "CAPTAIN"
  | "VENDOR"
  | "PAYMENT"
  | "SETTLEMENT"
  | "TICKET"
  | "USER"
  | "SYSTEM";

export interface ERPNotification {
  id: string;

  title: string;

  message: string;

  type: NotificationType;

  priority: NotificationPriority;

  read: boolean;

  createdAt: string | number | Date;

  updatedAt?: string | number | Date;

  /**
   * Optional entity information supplied by backend.
   */
  entityType?: NotificationEntityType;

  entityId?: string;

  /**
   * Canonical correlation identifier for tracing
   * cross-system operations.
   */
  correlationId?: string;

  /**
   * Optional module supplied by backend.
   */
  module?:
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING"
    | string;

  /**
   * Optional route supplied by the application.
   *
   * This is only a navigation hint.
   * Authorization remains backend-controlled.
   */
  actionUrl?: string;

  /**
   * Optional metadata supplied by backend.
   *
   * The store does not interpret financial/business rules
   * from this object.
   */
  metadata?: Record<
    string,
    unknown
  >;
}

export type NotificationFilter =
  | "ALL"
  | "UNREAD"
  | "READ";

export type NotificationTypeFilter =
  | "ALL"
  | NotificationType;

export interface NotificationFilters {
  read: NotificationFilter;

  type: NotificationTypeFilter;

  search: string;
}

export interface NotificationState {
  notifications: ERPNotification[];

  filters: NotificationFilters;

  panelOpen: boolean;

  centerOpen: boolean;

  loading: boolean;

  refreshing: boolean;

  error: string | null;

  lastFetchedAt: number | null;

  /**
   * Number of notifications displayed per page.
   */
  pageSize: number;

  currentPage: number;
}

export interface NotificationActions {
  setNotifications: (
    notifications: ERPNotification[],
  ) => void;

  addNotification: (
    notification: ERPNotification,
  ) => void;

  addNotifications: (
    notifications: ERPNotification[],
  ) => void;

  updateNotification: (
    id: string,
    updates: Partial<ERPNotification>,
  ) => void;

  removeNotification: (
    id: string,
  ) => void;

  markAsRead: (
    id: string,
  ) => void;

  markAsUnread: (
    id: string,
  ) => void;

  markAllAsRead: () => void;

  markAllAsUnread: () => void;

  clearNotifications: () => void;

  setReadFilter: (
    filter: NotificationFilter,
  ) => void;

  setTypeFilter: (
    filter: NotificationTypeFilter,
  ) => void;

  setSearch: (
    search: string,
  ) => void;

  setFilters: (
    filters: Partial<NotificationFilters>,
  ) => void;

  resetFilters: () => void;

  setPanelOpen: (
    open: boolean,
  ) => void;

  togglePanel: () => void;

  setCenterOpen: (
    open: boolean,
  ) => void;

  toggleCenter: () => void;

  setLoading: (
    loading: boolean,
  ) => void;

  setRefreshing: (
    refreshing: boolean,
  ) => void;

  markFetched: () => void;

  setError: (
    error: string | null,
  ) => void;

  clearError: () => void;

  setPageSize: (
    pageSize: number,
  ) => void;

  setCurrentPage: (
    page: number,
  ) => void;

  nextPage: () => void;

  previousPage: () => void;

  resetNotificationStore: () => void;
}

export interface NotificationDerivedState {
  unreadCount: number;

  readCount: number;

  totalCount: number;

  filteredCount: number;

  criticalCount: number;

  highPriorityCount: number;

  currentPageCount: number;

  totalPages: number;

  filteredNotifications: ERPNotification[];

  paginatedNotifications: ERPNotification[];
}

export type NotificationStore =
  NotificationState &
  NotificationActions &
  NotificationDerivedState;

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

export const DEFAULT_NOTIFICATION_PAGE_SIZE =
  20;

export const MIN_NOTIFICATION_PAGE_SIZE =
  5;

export const MAX_NOTIFICATION_PAGE_SIZE =
  100;

export const DEFAULT_NOTIFICATION_FILTERS:
  NotificationFilters = {
  read: "ALL",
  type: "ALL",
  search: "",
};

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

export const initialNotificationState:
  NotificationState = {
  notifications: [],

  filters: {
    ...DEFAULT_NOTIFICATION_FILTERS,
  },

  panelOpen: false,

  centerOpen: false,

  loading: false,

  refreshing: false,

  error: null,

  lastFetchedAt: null,

  pageSize:
    DEFAULT_NOTIFICATION_PAGE_SIZE,

  currentPage: 1,
};

/* -------------------------------------------------------------------------- */
/* Internal Store                                                             */
/* -------------------------------------------------------------------------- */

let storeState: NotificationState = {
  ...initialNotificationState,

  notifications: [],

  filters: {
    ...DEFAULT_NOTIFICATION_FILTERS,
  },
};

const listeners = new Set<
  (state: NotificationState) => void
>();

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function notify(): void {
  const snapshot =
    getNotificationState();

  listeners.forEach(
    (listener) => {
      listener(snapshot);
    },
  );
}

function setStoreState(
  updates: Partial<NotificationState>,
): void {
  storeState = {
    ...storeState,
    ...updates,
  };

  notify();
}

function normalizeSearch(
  value: string,
): string {
  return value.trim();
}

function normalizePageSize(
  pageSize: number,
): number {
  if (!Number.isFinite(pageSize)) {
    return DEFAULT_NOTIFICATION_PAGE_SIZE;
  }

  return Math.min(
    MAX_NOTIFICATION_PAGE_SIZE,
    Math.max(
      MIN_NOTIFICATION_PAGE_SIZE,
      Math.round(pageSize),
    ),
  );
}

function normalizeNotificationDate(
  value:
    | string
    | number
    | Date,
): number {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === "number") {
    return value;
  }

  const parsed =
    new Date(value).getTime();

  return Number.isNaN(parsed)
    ? 0
    : parsed;
}

function sortNotifications(
  notifications: ERPNotification[],
): ERPNotification[] {
  return [...notifications].sort(
    (a, b) =>
      normalizeNotificationDate(
        b.createdAt,
      ) -
      normalizeNotificationDate(
        a.createdAt,
      ),
  );
}

/**
 * Reset page when filters change.
 */
function resetToFirstPage(): void {
  storeState = {
    ...storeState,
    currentPage: 1,
  };
}

/* -------------------------------------------------------------------------- */
/* State Access                                                               */
/* -------------------------------------------------------------------------- */

export function getNotificationState():
  NotificationState {
  return {
    ...storeState,

    notifications: [
      ...storeState.notifications,
    ],

    filters: {
      ...storeState.filters,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Subscription                                                               */
/* -------------------------------------------------------------------------- */

export function subscribeToNotifications(
  listener: (
    state: NotificationState,
  ) => void,
): () => void {
  listeners.add(listener);

  listener(
    getNotificationState(),
  );

  return () => {
    listeners.delete(listener);
  };
}

/* -------------------------------------------------------------------------- */
/* Notification CRUD                                                          */
/* -------------------------------------------------------------------------- */

export function setNotifications(
  notifications: ERPNotification[],
): void {
  setStoreState({
    notifications:
      sortNotifications(
        notifications,
      ),

    currentPage: 1,
  });
}

export function addNotification(
  notification: ERPNotification,
): void {
  const existing =
    storeState.notifications.find(
      (item) =>
        item.id === notification.id,
    );

  if (existing) {
    updateNotification(
      notification.id,
      notification,
    );

    return;
  }

  setStoreState({
    notifications:
      sortNotifications([
        notification,
        ...storeState.notifications,
      ]),
  });
}

export function addNotifications(
  notifications: ERPNotification[],
): void {
  if (
    notifications.length === 0
  ) {
    return;
  }

  const notificationMap =
    new Map<
      string,
      ERPNotification
    >();

  storeState.notifications.forEach(
    (notification) => {
      notificationMap.set(
        notification.id,
        notification,
      );
    },
  );

  notifications.forEach(
    (notification) => {
      notificationMap.set(
        notification.id,
        notification,
      );
    },
  );

  setStoreState({
    notifications:
      sortNotifications(
        Array.from(
          notificationMap.values(),
        ),
      ),
  });
}

export function updateNotification(
  id: string,
  updates: Partial<ERPNotification>,
): void {
  const exists =
    storeState.notifications.some(
      (notification) =>
        notification.id === id,
    );

  if (!exists) {
    return;
  }

  setStoreState({
    notifications:
      storeState.notifications.map(
        (notification) =>
          notification.id === id
            ? {
                ...notification,
                ...updates,
              }
            : notification,
      ),
  });
}

export function removeNotification(
  id: string,
): void {
  setStoreState({
    notifications:
      storeState.notifications.filter(
        (notification) =>
          notification.id !== id,
      ),
  });
}

/* -------------------------------------------------------------------------- */
/* Read / Unread                                                              */
/* -------------------------------------------------------------------------- */

export function markNotificationAsRead(
  id: string,
): void {
  updateNotification(
    id,
    {
      read: true,
    },
  );
}

export function markNotificationAsUnread(
  id: string,
): void {
  updateNotification(
    id,
    {
      read: false,
    },
  );
}

export function markAllNotificationsAsRead():
  void {
  setStoreState({
    notifications:
      storeState.notifications.map(
        (notification) => ({
          ...notification,
          read: true,
        }),
      ),
  });
}

export function markAllNotificationsAsUnread():
  void {
  setStoreState({
    notifications:
      storeState.notifications.map(
        (notification) => ({
          ...notification,
          read: false,
        }),
      ),
  });
}

export function clearNotifications(): void {
  setStoreState({
    notifications: [],
    currentPage: 1,
  });
}

/* -------------------------------------------------------------------------- */
/* Filters                                                                    */
/* -------------------------------------------------------------------------- */

export function setNotificationReadFilter(
  filter: NotificationFilter,
): void {
  resetToFirstPage();

  setStoreState({
    filters: {
      ...storeState.filters,
      read: filter,
    },

    currentPage: 1,
  });
}

export function setNotificationTypeFilter(
  filter: NotificationTypeFilter,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      type: filter,
    },

    currentPage: 1,
  });
}

export function setNotificationSearch(
  search: string,
): void {
  setStoreState({
    filters: {
      ...storeState.filters,
      search:
        normalizeSearch(search),
    },

    currentPage: 1,
  });
}

export function setNotificationFilters(
  filters: Partial<NotificationFilters>,
): void {
  const nextFilters: NotificationFilters =
    {
      ...storeState.filters,
      ...filters,
    };

  if (
    filters.search !==
    undefined
  ) {
    nextFilters.search =
      normalizeSearch(
        filters.search,
      );
  }

  setStoreState({
    filters: nextFilters,
    currentPage: 1,
  });
}

export function resetNotificationFilters():
  void {
  setStoreState({
    filters: {
      ...DEFAULT_NOTIFICATION_FILTERS,
    },

    currentPage: 1,
  });
}

/* -------------------------------------------------------------------------- */
/* Panel State                                                                */
/* -------------------------------------------------------------------------- */

export function setNotificationPanelOpen(
  open: boolean,
): void {
  setStoreState({
    panelOpen: open,
  });
}

export function toggleNotificationPanel():
  void {
  setStoreState({
    panelOpen:
      !storeState.panelOpen,
  });
}

export function setNotificationCenterOpen(
  open: boolean,
): void {
  setStoreState({
    centerOpen: open,
  });
}

export function toggleNotificationCenter():
  void {
  setStoreState({
    centerOpen:
      !storeState.centerOpen,
  });
}

/* -------------------------------------------------------------------------- */
/* Loading / Refresh                                                          */
/* -------------------------------------------------------------------------- */

export function setNotificationLoading(
  loading: boolean,
): void {
  setStoreState({
    loading,
  });
}

export function setNotificationRefreshing(
  refreshing: boolean,
): void {
  setStoreState({
    refreshing,
  });
}

export function markNotificationsFetched():
  void {
  setStoreState({
    refreshing: false,
    loading: false,
    lastFetchedAt: Date.now(),
    error: null,
  });
}

/* -------------------------------------------------------------------------- */
/* Error                                                                      */
/* -------------------------------------------------------------------------- */

export function setNotificationError(
  error: string | null,
): void {
  setStoreState({
    error,
  });
}

export function clearNotificationError():
  void {
  setStoreState({
    error: null,
  });
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                 */
/* -------------------------------------------------------------------------- */

export function setNotificationPageSize(
  pageSize: number,
): void {
  setStoreState({
    pageSize:
      normalizePageSize(
        pageSize,
      ),

    currentPage: 1,
  });
}

export function setNotificationCurrentPage(
  page: number,
): void {
  if (!Number.isFinite(page)) {
    return;
  }

  setStoreState({
    currentPage:
      Math.max(
        1,
        Math.round(page),
      ),
  });
}

/* -------------------------------------------------------------------------- */
/* Derived Data                                                               */
/* -------------------------------------------------------------------------- */

export function getFilteredNotifications():
  ERPNotification[] {
  const {
    notifications,
    filters,
  } = storeState;

  const search =
    filters.search.toLowerCase();

  return notifications.filter(
    (notification) => {
      if (
        filters.read ===
          "UNREAD" &&
        notification.read
      ) {
        return false;
      }

      if (
        filters.read ===
          "READ" &&
        !notification.read
      ) {
        return false;
      }

      if (
        filters.type !==
          "ALL" &&
        notification.type !==
          filters.type
      ) {
        return false;
      }

      if (search.length > 0) {
        const searchableText =
          [
            notification.title,
            notification.message,
            notification.type,
            notification.priority,
            notification.entityType,
            notification.entityId,
            notification.correlationId,
            notification.module,
          ]
            .filter(
              (
                value,
              ) =>
                value !==
                  undefined &&
                value !== null,
            )
            .join(" ")
            .toLowerCase();

        if (
          !searchableText.includes(
            search,
          )
        ) {
          return false;
        }
      }

      return true;
    },
  );
}

export function getUnreadNotificationCount():
  number {
  return storeState.notifications.filter(
    (notification) =>
      !notification.read,
  ).length;
}

export function getReadNotificationCount():
  number {
  return storeState.notifications.filter(
    (notification) =>
      notification.read,
  ).length;
}

export function getCriticalNotificationCount():
  number {
  return storeState.notifications.filter(
    (notification) =>
      notification.priority ===
      "CRITICAL",
  ).length;
}

export function getHighPriorityNotificationCount():
  number {
  return storeState.notifications.filter(
    (notification) =>
      notification.priority ===
        "HIGH" ||
      notification.priority ===
        "CRITICAL",
  ).length;
}

export function getPaginatedNotifications():
  ERPNotification[] {
  const filtered =
    getFilteredNotifications();

  const start =
    (storeState.currentPage -
      1) *
    storeState.pageSize;

  const end =
    start +
    storeState.pageSize;

  return filtered.slice(
    start,
    end,
  );
}

export function getTotalNotificationPages():
  number {
  const count =
    getFilteredNotifications()
      .length;

  if (count === 0) {
    return 1;
  }

  return Math.ceil(
    count /
      storeState.pageSize,
  );
}

/* -------------------------------------------------------------------------- */
/* Pagination Navigation                                                      */
/* -------------------------------------------------------------------------- */

export function nextNotificationPage():
  void {
  const totalPages =
    getTotalNotificationPages();

  if (
    storeState.currentPage <
    totalPages
  ) {
    setStoreState({
      currentPage:
        storeState.currentPage +
        1,
    });
  }
}

export function previousNotificationPage():
  void {
  if (
    storeState.currentPage >
    1
  ) {
    setStoreState({
      currentPage:
        storeState.currentPage -
        1,
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Derived Store                                                              */
/* -------------------------------------------------------------------------- */

export function getNotificationDerivedState():
  NotificationDerivedState {
  const filtered =
    getFilteredNotifications();

  const totalPages =
    filtered.length === 0
      ? 1
      : Math.ceil(
          filtered.length /
            storeState.pageSize,
        );

  return {
    unreadCount:
      getUnreadNotificationCount(),

    readCount:
      getReadNotificationCount(),

    totalCount:
      storeState.notifications.length,

    filteredCount:
      filtered.length,

    criticalCount:
      getCriticalNotificationCount(),

    highPriorityCount:
      getHighPriorityNotificationCount(),

    currentPageCount:
      getPaginatedNotifications()
        .length,

    totalPages,

    filteredNotifications:
      filtered,

    paginatedNotifications:
      getPaginatedNotifications(),
  };
}

/* -------------------------------------------------------------------------- */
/* React Hook                                                                 */
/* -------------------------------------------------------------------------- */

export function useNotificationStore():
  NotificationStore {
  const [state, setState] =
    useState<NotificationState>(
      getNotificationState(),
    );

  useEffect(() => {
    return subscribeToNotifications(
      (nextState) => {
        setState(nextState);
      },
    );
  }, []);

  const derived =
    useMemo(
      () => {
        /**
         * Recalculate derived values from
         * the latest local state.
         */
        const notifications =
          state.notifications;

        const filters =
          state.filters;

        const filtered =
          notifications.filter(
            (notification) => {
              if (
                filters.read ===
                  "UNREAD" &&
                notification.read
              ) {
                return false;
              }

              if (
                filters.read ===
                  "READ" &&
                !notification.read
              ) {
                return false;
              }

              if (
                filters.type !==
                  "ALL" &&
                notification.type !==
                  filters.type
              ) {
                return false;
              }

              const search =
                filters.search
                  .trim()
                  .toLowerCase();

              if (
                search.length ===
                0
              ) {
                return true;
              }

              const searchableText =
                [
                  notification.title,
                  notification.message,
                  notification.type,
                  notification.priority,
                  notification.entityType,
                  notification.entityId,
                  notification.correlationId,
                  notification.module,
                ]
                  .filter(
                    (
                      value,
                    ) =>
                      value !==
                        undefined &&
                      value !==
                        null,
                  )
                  .join(" ")
                  .toLowerCase();

              return searchableText.includes(
                search,
              );
            },
          );

        const unreadCount =
          notifications.filter(
            (notification) =>
              !notification.read,
          ).length;

        const readCount =
          notifications.filter(
            (notification) =>
              notification.read,
          ).length;

        const criticalCount =
          notifications.filter(
            (notification) =>
              notification.priority ===
              "CRITICAL",
          ).length;

        const highPriorityCount =
          notifications.filter(
            (notification) =>
              notification.priority ===
                "HIGH" ||
              notification.priority ===
                "CRITICAL",
          ).length;

        const totalPages =
          filtered.length === 0
            ? 1
            : Math.ceil(
                filtered.length /
                  state.pageSize,
              );

        const safeCurrentPage =
          Math.min(
            Math.max(
              1,
              state.currentPage,
            ),
            totalPages,
          );

        const start =
          (safeCurrentPage -
            1) *
          state.pageSize;

        const paginated =
          filtered.slice(
            start,
            start +
              state.pageSize,
          );

        return {
          unreadCount,

          readCount,

          totalCount:
            notifications.length,

          filteredCount:
            filtered.length,

          criticalCount,

          highPriorityCount,

          currentPageCount:
            paginated.length,

          totalPages,

          filteredNotifications:
            filtered,

          paginatedNotifications:
            paginated,
        };
      },
      [
        state.notifications,
        state.filters,
        state.pageSize,
        state.currentPage,
      ],
    );

  return {
    ...state,

    ...derived,

    setNotifications,

    addNotification,

    addNotifications,

    updateNotification,

    removeNotification,

    markAsRead:
      markNotificationAsRead,

    markAsUnread:
      markNotificationAsUnread,

    markAllAsRead:
      markAllNotificationsAsRead,

    markAllAsUnread:
      markAllNotificationsAsUnread,

    clearNotifications,

    setReadFilter:
      setNotificationReadFilter,

    setTypeFilter:
      setNotificationTypeFilter,

    setSearch:
      setNotificationSearch,

    setFilters:
      setNotificationFilters,

    resetFilters:
      resetNotificationFilters,

    setPanelOpen:
      setNotificationPanelOpen,

    togglePanel:
      toggleNotificationPanel,

    setCenterOpen:
      setNotificationCenterOpen,

    toggleCenter:
      toggleNotificationCenter,

    setLoading:
      setNotificationLoading,

    setRefreshing:
      setNotificationRefreshing,

    markFetched:
      markNotificationsFetched,

    setError:
      setNotificationError,

    clearError:
      clearNotificationError,

    setPageSize:
      setNotificationPageSize,

    setCurrentPage:
      setNotificationCurrentPage,

    nextPage:
      nextNotificationPage,

    previousPage:
      previousNotificationPage,

    resetNotificationStore,
  };
}

/* -------------------------------------------------------------------------- */
/* Reset                                                                      */
/* -------------------------------------------------------------------------- */

export function resetNotificationStore():
  void {
  setStoreState({
    ...initialNotificationState,

    notifications: [],

    filters: {
      ...DEFAULT_NOTIFICATION_FILTERS,
    },
  });
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const notificationStore = {
  initialNotificationState,

  getNotificationState,

  subscribeToNotifications,

  setNotifications,

  addNotification,

  addNotifications,

  updateNotification,

  removeNotification,

  markNotificationAsRead,

  markNotificationAsUnread,

  markAllNotificationsAsRead,

  markAllNotificationsAsUnread,

  clearNotifications,

  setNotificationReadFilter,

  setNotificationTypeFilter,

  setNotificationSearch,

  setNotificationFilters,

  resetNotificationFilters,

  setNotificationPanelOpen,

  toggleNotificationPanel,

  setNotificationCenterOpen,

  toggleNotificationCenter,

  setNotificationLoading,

  setNotificationRefreshing,

  markNotificationsFetched,

  setNotificationError,

  clearNotificationError,

  setNotificationPageSize,

  setNotificationCurrentPage,

  nextNotificationPage,

  previousNotificationPage,

  getFilteredNotifications,

  getUnreadNotificationCount,

  getReadNotificationCount,

  getCriticalNotificationCount,

  getHighPriorityNotificationCount,

  getPaginatedNotifications,

  getTotalNotificationPages,

  getNotificationDerivedState,

  resetNotificationStore,
};

export default notificationStore;