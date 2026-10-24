"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

export type HeaderAdminRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

export type HeaderScopeType =
  | "GLOBAL"
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export interface HeaderUser {
  name?: string;
  email?: string;
  role?: HeaderAdminRole;
  scopeType?: HeaderScopeType;
  scopeId?: string;
  scopeName?: string;
}

export interface HeaderNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read?: boolean;
  severity?:
    | "INFO"
    | "SUCCESS"
    | "WARNING"
    | "CRITICAL";
}

export interface HeaderProps {
  user?: HeaderUser;

  notifications?: HeaderNotification[];

  sidebarOpen?: boolean;

  onMenuClick?: () => void;

  onNotificationClick?: (
    notification: HeaderNotification
  ) => void;

  onNotificationsClick?: () => void;

  onProfileClick?: () => void;

  onLogout?: () => void;

  showNotifications?: boolean;

  showProfile?: boolean;

  showSystemStatus?: boolean;

  className?: string;
}

const ROLE_LABELS: Record<
  HeaderAdminRole,
  string
> = {
  SUPER_ADMIN: "Super Admin",
  STATE_ADMIN: "State Admin",
  DISTRICT_ADMIN: "District Admin",
  TECHNICAL_ADMIN: "Technical Admin",
};

const SCOPE_LABELS: Record<
  HeaderScopeType,
  string
> = {
  GLOBAL: "Global",
  STATE: "State",
  DISTRICT: "District",
  PINCODE: "Pincode",
};

const SEVERITY_CLASSES: Record<
  NonNullable<
    HeaderNotification["severity"]
  >,
  string
> = {
  INFO:
    "bg-blue-100 text-blue-700",

  SUCCESS:
    "bg-green-100 text-green-700",

  WARNING:
    "bg-amber-100 text-amber-700",

  CRITICAL:
    "bg-red-100 text-red-700",
};

export default function Header({
  user,
  notifications = [],
  sidebarOpen = false,
  onMenuClick,
  onNotificationClick,
  onNotificationsClick,
  onProfileClick,
  onLogout,
  showNotifications = true,
  showProfile = true,
  showSystemStatus = true,
  className = "",
}: HeaderProps) {
  const [
    currentTime,
    setCurrentTime,
  ] = useState(
    new Date()
  );

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  useEffect(() => {
    const timer =
      window.setInterval(() => {
        setCurrentTime(
          new Date()
        );
      }, 1000);

    return () =>
      window.clearInterval(
        timer
      );
  }, []);

  const unreadCount =
    useMemo(
      () =>
        notifications.filter(
          (notification) =>
            !notification.read
        ).length,
      [notifications]
    );

  const roleLabel =
    user?.role
      ? ROLE_LABELS[
          user.role
        ]
      : "Administrator";

  const scopeLabel =
    user?.scopeType
      ? SCOPE_LABELS[
          user.scopeType
        ]
      : undefined;

  const displayName =
    user?.name?.trim() ||
    "Administrator";

  const initials =
    getInitials(
      displayName
    );

  const formattedTime =
    currentTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  const formattedDate =
    currentTime.toLocaleDateString(
      "en-IN",
      {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const closeAllMenus =
    () => {
      setNotificationOpen(
        false
      );
      setProfileOpen(false);
    };

  const handleMenuClick =
    () => {
      closeAllMenus();
      onMenuClick?.();
    };

  const handleNotificationToggle =
    () => {
      setNotificationOpen(
        (current) => !current
      );
      setProfileOpen(false);
    };

  const handleProfileToggle =
    () => {
      setProfileOpen(
        (current) => !current
      );
      setNotificationOpen(
        false
      );
    };

  const handleNotificationSelect =
    (
      notification: HeaderNotification
    ) => {
      setNotificationOpen(
        false
      );

      onNotificationClick?.(
        notification
      );
    };

  const handleProfile =
    () => {
      setProfileOpen(false);
      onProfileClick?.();
    };

  const handleLogout =
    () => {
      setProfileOpen(false);
      onLogout?.();
    };

  return (
    <header
      className={`sticky top-0 z-[100] flex h-16 shrink-0 items-center border-b border-slate-200 bg-white/95 px-3 shadow-sm backdrop-blur-md sm:px-5 ${className}`}
    >
      {/* LEFT SIDE */}

      <div className="flex min-w-0 flex-1 items-center gap-3">

        {/* MOBILE MENU */}

        {onMenuClick && (
          <button
            type="button"
            onClick={
              handleMenuClick
            }
            aria-label={
              sidebarOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={
              sidebarOpen
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 lg:hidden"
          >
            <MenuIcon
              open={
                sidebarOpen
              }
            />
          </button>
        )}

        {/* BRAND */}

        <div className="flex min-w-0 items-center gap-2.5">

          <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm sm:flex">
            <span className="text-sm font-black text-white">
              J
            </span>
          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <h1 className="truncate text-sm font-black tracking-tight text-slate-900 sm:text-base">
                JUERP
              </h1>

              <span className="hidden rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-[7px] font-black uppercase tracking-wider text-orange-700 md:inline-flex">
                Administration
              </span>

            </div>

            <p className="hidden truncate text-[8px] font-medium text-slate-400 sm:block">
              JUONE Governance Platform
            </p>

          </div>

        </div>

      </div>

      {/* CENTER / SYSTEM INFORMATION */}

      <div className="hidden items-center gap-4 xl:flex">

        {showSystemStatus && (
          <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />

            </span>

            <span className="text-[8px] font-black uppercase tracking-wider text-green-700">
              System Operational
            </span>

          </div>
        )}

        <div className="text-right">

          <p className="text-[9px] font-black text-slate-700">
            {formattedTime}
          </p>

          <p className="text-[7px] font-medium text-slate-400">
            {formattedDate}
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2">

        {/* MOBILE SYSTEM STATUS */}

        {showSystemStatus && (
          <div
            className="mr-1 flex h-9 w-9 items-center justify-center rounded-xl border border-green-100 bg-green-50 xl:hidden"
            title="System Operational"
          >
            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />

            </span>
          </div>
        )}

        {/* NOTIFICATIONS */}

        {showNotifications && (
          <div className="relative">

            <button
              type="button"
              onClick={
                handleNotificationToggle
              }
              aria-label="Notifications"
              aria-expanded={
                notificationOpen
              }
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
            >
              <BellIcon />

              {unreadCount >
                0 && (
                <span className="absolute -right-0.5 -top-0.5 flex min-h-4 min-w-4 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[7px] font-black text-white">
                  {unreadCount >
                  9
                    ? "9+"
                    : unreadCount}
                </span>
              )}

            </button>

            {notificationOpen && (
              <NotificationDropdown
                notifications={
                  notifications
                }
                onNotificationClick={
                  handleNotificationSelect
                }
                onViewAll={() => {
                  setNotificationOpen(
                    false
                  );
                  onNotificationsClick?.();
                }}
              />
            )}

          </div>
        )}

        {/* PROFILE */}

        {showProfile && (
          <div className="relative">

            <button
              type="button"
              onClick={
                handleProfileToggle
              }
              aria-label="Administrator profile"
              aria-expanded={
                profileOpen
              }
              className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 transition hover:border-slate-200 hover:bg-slate-50"
            >

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[10px] font-black text-orange-700">
                {initials}
              </div>

              <div className="hidden max-w-[150px] text-left md:block">

                <p className="truncate text-[10px] font-black text-slate-800">
                  {displayName}
                </p>

                <p className="truncate text-[8px] font-medium text-slate-400">
                  {roleLabel}
                </p>

              </div>

              <ChevronDownIcon
                className="hidden h-3.5 w-3.5 text-slate-400 md:block"
              />

            </button>

            {profileOpen && (
              <ProfileDropdown
                user={
                  user
                }
                roleLabel={
                  roleLabel
                }
                scopeLabel={
                  scopeLabel
                }
                onProfileClick={
                  handleProfile
                }
                onLogout={
                  handleLogout
                }
              />
            )}

          </div>
        )}

      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* NOTIFICATION DROPDOWN */
/* -------------------------------------------------------------------------- */

function NotificationDropdown({
  notifications,
  onNotificationClick,
  onViewAll,
}: {
  notifications: HeaderNotification[];

  onNotificationClick: (
    notification: HeaderNotification
  ) => void;

  onViewAll: () => void;
}) {
  const recentNotifications =
    notifications.slice(
      0,
      6
    );

  return (
    <div className="absolute right-0 top-12 z-[120] w-[calc(100vw-24px)] max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

        <div>

          <h3 className="text-xs font-black text-slate-900">
            Notifications
          </h3>

          <p className="mt-0.5 text-[8px] text-slate-400">
            Operational and administrative
            alerts
          </p>

        </div>

        <span className="rounded-full bg-orange-50 px-2 py-1 text-[7px] font-black text-orange-600">
          {notifications.length}
        </span>

      </div>

      <div className="max-h-[360px] overflow-y-auto">

        {recentNotifications.length ===
        0 ? (
          <div className="px-5 py-10 text-center">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <BellIcon />
            </div>

            <p className="mt-3 text-[10px] font-bold text-slate-600">
              No notifications
            </p>

            <p className="mt-1 text-[8px] text-slate-400">
              You are all caught up.
            </p>

          </div>
        ) : (
          recentNotifications.map(
            (
              notification
            ) => (
              <button
                key={
                  notification.id
                }
                type="button"
                onClick={() =>
                  onNotificationClick(
                    notification
                  )
                }
                className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 ${
                  notification.read
                    ? "bg-white"
                    : "bg-orange-50/40"
                }`}
              >

                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    notification.severity
                      ? SEVERITY_CLASSES[
                          notification.severity
                        ]
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  <NotificationIcon
                    severity={
                      notification.severity
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-start justify-between gap-2">

                    <p className="text-[9px] font-black text-slate-800">
                      {
                        notification.title
                      }
                    </p>

                    {!notification.read && (
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                    )}

                  </div>

                  <p className="mt-1 line-clamp-2 text-[8px] leading-4 text-slate-500">
                    {
                      notification.message
                    }
                  </p>

                  <p className="mt-1 text-[7px] font-medium text-slate-400">
                    {
                      formatNotificationDate(
                        notification.createdAt
                      )
                    }
                  </p>

                </div>

              </button>
            )
          )
        )}

      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 p-2">

        <button
          type="button"
          onClick={
            onViewAll
          }
          className="w-full rounded-xl px-3 py-2 text-[9px] font-black text-orange-600 transition hover:bg-orange-50"
        >
          View All Notifications
        </button>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PROFILE DROPDOWN */
/* -------------------------------------------------------------------------- */

function ProfileDropdown({
  user,
  roleLabel,
  scopeLabel,
  onProfileClick,
  onLogout,
}: {
  user?: HeaderUser;

  roleLabel: string;

  scopeLabel?: string;

  onProfileClick: () => void;

  onLogout: () => void;
}) {
  return (
    <div className="absolute right-0 top-12 z-[120] w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

      {/* USER */}

      <div className="border-b border-slate-100 bg-slate-50/70 px-4 py-4">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xs font-black text-orange-700">
            {getInitials(
              user?.name ||
                "Administrator"
            )}
          </div>

          <div className="min-w-0">

            <p className="truncate text-xs font-black text-slate-900">
              {user?.name ||
                "Administrator"}
            </p>

            {user?.email && (
              <p className="mt-0.5 truncate text-[8px] text-slate-400">
                {user.email}
              </p>
            )}

          </div>

        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">

          <span className="rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[7px] font-black uppercase text-orange-700">
            {roleLabel}
          </span>

          {scopeLabel && (
            <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-1 text-[7px] font-black uppercase text-blue-700">
              {scopeLabel}
            </span>
          )}

        </div>

        {user?.scopeName && (
          <p className="mt-2 truncate text-[8px] font-medium text-slate-500">
            Scope:{" "}
            <span className="font-bold text-slate-700">
              {user.scopeName}
            </span>
          </p>
        )}

      </div>

      {/* ACTIONS */}

      <div className="p-2">

        <button
          type="button"
          onClick={
            onProfileClick
          }
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            <UserIcon />
          </span>

          <span>
            <span className="block text-[9px] font-black text-slate-700">
              Administrator Profile
            </span>

            <span className="mt-0.5 block text-[7px] text-slate-400">
              View account information
            </span>
          </span>
        </button>

        <div className="my-1 border-t border-slate-100" />

        <button
          type="button"
          onClick={
            onLogout
          }
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-red-50"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500">
            <LogoutIcon />
          </span>

          <span>
            <span className="block text-[9px] font-black text-red-600">
              Sign Out
            </span>

            <span className="mt-0.5 block text-[7px] text-red-400">
              End this admin session
            </span>
          </span>
        </button>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function MenuIcon({
  open,
}: {
  open: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      {open ? (
        <path
          strokeLinecap="round"
          d="M6 6l12 12M18 6 6 18"
        />
      ) : (
        <>
          <path
            strokeLinecap="round"
            d="M4 6h16"
          />
          <path
            strokeLinecap="round"
            d="M4 12h16"
          />
          <path
            strokeLinecap="round"
            d="M4 18h16"
          />
        </>
      )}
    </svg>
  );
}

function BellIcon() {
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
        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
      />

      <path
        strokeLinecap="round"
        d="M10 21h4"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 21a7 7 0 0 1 14 0"
      />
    </svg>
  );
}

function LogoutIcon() {
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
        d="M10 17l5-5-5-5"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12H3"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 19V5a2 2 0 0 0-2-2h-6"
      />
    </svg>
  );
}

function ChevronDownIcon({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

function NotificationIcon({
  severity,
}: {
  severity?: HeaderNotification["severity"];
}) {
  if (
    severity ===
    "CRITICAL"
  ) {
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
          d="M12 3 2.5 20h19L12 3Z"
        />

        <path
          strokeLinecap="round"
          d="M12 9v4"
        />

        <path
          strokeLinecap="round"
          d="M12 17h.01"
        />
      </svg>
    );
  }

  if (
    severity ===
    "WARNING"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path
          strokeLinecap="round"
          d="M12 8v4"
        />

        <path
          strokeLinecap="round"
          d="M12 16h.01"
        />
      </svg>
    );
  }

  if (
    severity ===
    "SUCCESS"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m8 12 2.5 2.5L16 9"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
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

      <path
        strokeLinecap="round"
        d="M12 8h.01"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function getInitials(
  name: string
): string {
  const parts =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

  if (
    parts.length ===
    0
  ) {
    return "A";
  }

  if (
    parts.length ===
    1
  ) {
    return parts[0]
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    parts[0][0] +
    parts[
      parts.length - 1
    ][0]
  ).toUpperCase();
}

function formatNotificationDate(
  value: string
): string {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return value;
  }

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}