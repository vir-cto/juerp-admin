"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

export type UserNavRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

export type UserNavScopeType =
  | "GLOBAL"
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export interface UserNavUser {
  name?: string;
  email?: string;
  role?: UserNavRole;
  scopeType?: UserNavScopeType;
  scopeId?: string;
  scopeName?: string;
  avatarUrl?: string;
}

export interface UserNavProps {
  user?: UserNavUser;

  onProfile?: () => void;

  onSettings?: () => void;

  onLogout?: () => void;

  showProfile?: boolean;

  showSettings?: boolean;

  showLogout?: boolean;

  compact?: boolean;

  disabled?: boolean;

  className?: string;
}

const ROLE_LABELS: Record<
  UserNavRole,
  string
> = {
  SUPER_ADMIN: "Super Admin",
  STATE_ADMIN: "State Admin",
  DISTRICT_ADMIN: "District Admin",
  TECHNICAL_ADMIN: "Technical Admin",
};

const SCOPE_LABELS: Record<
  UserNavScopeType,
  string
> = {
  GLOBAL: "Global",
  STATE: "State",
  DISTRICT: "District",
  PINCODE: "Pincode",
};

const SCOPE_CLASSES: Record<
  UserNavScopeType,
  string
> = {
  GLOBAL:
    "border-slate-200 bg-slate-100 text-slate-700",

  STATE:
    "border-orange-200 bg-orange-50 text-orange-700",

  DISTRICT:
    "border-blue-200 bg-blue-50 text-blue-700",

  PINCODE:
    "border-purple-200 bg-purple-50 text-purple-700",
};

export default function UserNav({
  user,
  onProfile,
  onSettings,
  onLogout,
  showProfile = true,
  showSettings = true,
  showLogout = true,
  compact = false,
  disabled = false,
  className = "",
}: UserNavProps) {
  const [
    open,
    setOpen,
  ] = useState(false);

  const containerRef =
    useRef<HTMLDivElement>(
      null
    );

  const displayName =
    user?.name?.trim() ||
    "Administrator";

  const email =
    user?.email?.trim() ||
    "";

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

  const initials =
    getInitials(
      displayName
    );

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        !containerRef.current
      ) {
        return;
      }

      if (
        !containerRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  function handleToggle() {
    if (disabled) {
      return;
    }

    setOpen(
      (current) =>
        !current
    );
  }

  function handleProfile() {
    setOpen(false);
    onProfile?.();
  }

  function handleSettings() {
    setOpen(false);
    onSettings?.();
  }

  function handleLogout() {
    setOpen(false);
    onLogout?.();
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
    >
      {/* USER BUTTON */}

      <button
        type="button"
        disabled={disabled}
        onClick={
          handleToggle
        }
        aria-haspopup="menu"
        aria-expanded={
          open
        }
        aria-label={`Open user menu for ${displayName}`}
        className={`group flex items-center rounded-xl border border-transparent transition ${
          compact
            ? "gap-1.5 p-1"
            : "gap-2 p-1.5 sm:pr-2"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "hover:border-slate-200 hover:bg-slate-50"
        }`}
      >
        {/* AVATAR */}

        <UserAvatar
          name={
            displayName
          }
          avatarUrl={
            user?.avatarUrl
          }
          compact={
            compact
          }
        />

        {/* USER DETAILS */}

        {!compact && (
          <div className="hidden min-w-0 text-left sm:block">

            <p className="max-w-[150px] truncate text-[10px] font-black text-slate-800">
              {
                displayName
              }
            </p>

            <p className="max-w-[150px] truncate text-[8px] font-medium text-slate-400">
              {
                roleLabel
              }
            </p>

          </div>
        )}

        {!compact && (
          <ChevronDownIcon
            className={`hidden h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform sm:block ${
              open
                ? "rotate-180"
                : ""
            }`}
          />
        )}

      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-[180] w-[290px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        >
          {/* USER INFORMATION */}

          <div className="border-b border-slate-100 bg-slate-50/70 p-4">

            <div className="flex items-center gap-3">

              <UserAvatar
                name={
                  displayName
                }
                avatarUrl={
                  user?.avatarUrl
                }
              />

              <div className="min-w-0">

                <p className="truncate text-xs font-black text-slate-900">
                  {
                    displayName
                  }
                </p>

                {email && (
                  <p className="mt-0.5 truncate text-[8px] font-medium text-slate-400">
                    {email}
                  </p>
                )}

              </div>

            </div>

            {/* ROLE */}

            <div className="mt-3 flex flex-wrap gap-1.5">

              <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2 py-1 text-[7px] font-black uppercase tracking-wide text-orange-700">
                <ShieldIcon />
                {
                  roleLabel
                }
              </span>

              {scopeLabel &&
                user?.scopeType && (
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-1 text-[7px] font-black uppercase tracking-wide ${
                      SCOPE_CLASSES[
                        user.scopeType
                      ]
                    }`}
                  >
                    {
                      scopeLabel
                    }
                  </span>
                )}

            </div>

            {/* SCOPE */}

            {user?.scopeName && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2">

                <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">
                  Administrative Scope
                </p>

                <div className="mt-1 flex items-center justify-between gap-2">

                  <p className="truncate text-[9px] font-black text-slate-700">
                    {
                      user.scopeName
                    }
                  </p>

                  {user.scopeId && (
                    <span className="shrink-0 font-mono text-[7px] text-slate-400">
                      {
                        user.scopeId
                      }
                    </span>
                  )}

                </div>

              </div>
            )}

          </div>

          {/* MENU ITEMS */}

          <div className="p-2">

            {showProfile && (
              <UserNavItem
                icon={
                  <ProfileIcon />
                }
                title="Administrator Profile"
                description="View account information"
                onClick={
                  handleProfile
                }
              />
            )}

            {showSettings && (
              <UserNavItem
                icon={
                  <SettingsIcon />
                }
                title="Settings"
                description="Manage JUERP preferences"
                onClick={
                  handleSettings
                }
              />
            )}

            {showLogout && (
              <>
                <div className="my-1.5 border-t border-slate-100" />

                <UserNavItem
                  icon={
                    <LogoutIcon />
                  }
                  title="Sign Out"
                  description="End this administrator session"
                  onClick={
                    handleLogout
                  }
                  danger
                />
              </>
            )}

          </div>

          {/* GOVERNANCE */}

          <div className="border-t border-orange-100 bg-orange-50/60 px-4 py-3">

            <div className="flex items-start gap-2">

              <div className="mt-0.5 text-orange-600">
                <ShieldIcon />
              </div>

              <div>

                <p className="text-[7px] font-black uppercase tracking-wider text-orange-800">
                  JUERP Security
                </p>

                <p className="mt-1 text-[8px] leading-4 text-orange-700">
                  Role and scope information is
                  governed by the authenticated
                  JUERP security context.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* USER NAV ITEM */
/* -------------------------------------------------------------------------- */

function UserNavItem({
  icon,
  title,
  description,
  onClick,
  danger = false,
}: {
  icon: React.ReactNode;

  title: string;

  description: string;

  onClick: () => void;

  danger?: boolean;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={
        onClick
      }
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
        danger
          ? "hover:bg-red-50"
          : "hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
          danger
            ? "bg-red-50 text-red-500"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        {icon}
      </span>

      <span className="min-w-0">

        <span
          className={`block text-[9px] font-black ${
            danger
              ? "text-red-600"
              : "text-slate-700"
          }`}
        >
          {title}
        </span>

        <span
          className={`mt-0.5 block text-[7px] ${
            danger
              ? "text-red-400"
              : "text-slate-400"
          }`}
        >
          {description}
        </span>

      </span>

    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* AVATAR */
/* -------------------------------------------------------------------------- */

function UserAvatar({
  name,
  avatarUrl,
  compact = false,
}: {
  name: string;

  avatarUrl?: string;

  compact?: boolean;
}) {
  const sizeClass =
    compact
      ? "h-8 w-8 text-[9px]"
      : "h-9 w-9 text-[10px]";

  if (avatarUrl) {
    return (
      <div
        className={`shrink-0 overflow-hidden rounded-xl bg-orange-100 ${sizeClass}`}
      >
        <img
          src={
            avatarUrl
          }
          alt={`${name} avatar`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-xl bg-orange-100 font-black text-orange-700 ${sizeClass}`}
    >
      {getInitials(
        name
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function ProfileIcon() {
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

function SettingsIcon() {
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
        r="3"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V7h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.7V16h-.7a1.7 1.7 0 0 0-1.6 1Z"
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
        d="M15 12H3"
      />

      <path
        strokeLinecap="round"
        d="M21 19V5a2 2 0 0 0-2-2h-6"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
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