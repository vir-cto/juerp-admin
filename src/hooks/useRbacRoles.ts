// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type RoleId =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN"
//   | "VENDOR_OWNER"
//   | "CAPTAIN"
//   | "CUSTOMER";

// export type RoleStatus = "ACTIVE" | "RESTRICTED";

// export type ScopeType =
//   | "GLOBAL"
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "CUSTOMER";

// export type Role = {
//   id: RoleId;
//   name: string;
//   description: string;
//   status: RoleStatus;
//   scope: ScopeType;
//   users: number;
//   permissions: number;
//   lastUpdated: string;
// };

// /** Static JUERP role registry (platform policy — not loaded from Firestore). */
// const ROLE_DEFINITIONS: Omit<Role, "users" | "lastUpdated">[] = [
//   {
//     id: "SUPER_ADMIN",
//     name: "Super Admin",
//     description:
//       "Highest JUERP administrative authority with platform-wide governance access.",
//     status: "ACTIVE",
//     scope: "GLOBAL",
//     permissions: 42,
//   },
//   {
//     id: "STATE_ADMIN",
//     name: "State Admin",
//     description:
//       "Administrative authority for assigned state-level operational scope.",
//     status: "ACTIVE",
//     scope: "STATE",
//     permissions: 31,
//   },
//   {
//     id: "DISTRICT_ADMIN",
//     name: "District Admin",
//     description:
//       "Administrative authority for assigned district and subordinate pincode scope.",
//     status: "ACTIVE",
//     scope: "DISTRICT",
//     permissions: 24,
//   },
//   {
//     id: "TECHNICAL_ADMIN",
//     name: "Technical Admin",
//     description:
//       "Privileged technical operations and system governance role.",
//     status: "ACTIVE",
//     scope: "GLOBAL",
//     permissions: 28,
//   },
//   {
//     id: "VENDOR_OWNER",
//     name: "Vendor Owner",
//     description:
//       "Vendor-side access for authorized business and module operations.",
//     status: "ACTIVE",
//     scope: "VENDOR",
//     permissions: 18,
//   },
//   {
//     id: "CAPTAIN",
//     name: "Captain",
//     description:
//       "Captain-side access for authorized service and assignment operations.",
//     status: "ACTIVE",
//     scope: "CAPTAIN",
//     permissions: 14,
//   },
//   {
//     id: "CUSTOMER",
//     name: "Customer",
//     description:
//       "Customer application role with access to customer-owned operations.",
//     status: "ACTIVE",
//     scope: "CUSTOMER",
//     permissions: 11,
//   },
// ];

// const KNOWN_ROLES = new Set<string>(ROLE_DEFINITIONS.map((r) => r.id));

// function str(v: unknown): string {
//   if (typeof v === "string") return v.trim();
//   if (typeof v === "number") return String(v);
//   return "";
// }

// function normalizeRole(raw: unknown): RoleId | null {
//   const s = str(raw).toUpperCase().replace(/[\s-]+/g, "_");
//   if (!s) return null;
//   if (KNOWN_ROLES.has(s)) return s as RoleId;
//   if (s === "ADMIN" || s === "SUPERADMIN") return "SUPER_ADMIN";
//   if (s === "STATEADMIN" || s === "STATE") return "STATE_ADMIN";
//   if (s === "DISTRICTADMIN" || s === "DISTRICT") return "DISTRICT_ADMIN";
//   if (s === "TECHADMIN" || s === "TECHNICAL") return "TECHNICAL_ADMIN";
//   if (s === "VENDOR" || s === "VENDOROWNER" || s === "OWNER") return "VENDOR_OWNER";
//   if (s === "DRIVER" || s === "RIDER") return "CAPTAIN";
//   if (s === "USER" || s === "CLIENT") return "CUSTOMER";
//   return null;
// }

// function extractRole(doc: Record<string, unknown>): RoleId | null {
//   return (
//     normalizeRole(doc.role) ||
//     normalizeRole(doc.roleId) ||
//     normalizeRole(doc.userRole) ||
//     normalizeRole(doc.adminRole) ||
//     normalizeRole(doc.type)
//   );
// }

// function nowLabel(): string {
//   return new Date().toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// export function useRbacRoles(pollMs = 60000) {
//   const [userCounts, setUserCounts] = useState<Record<RoleId, number>>({
//     SUPER_ADMIN: 0,
//     STATE_ADMIN: 0,
//     DISTRICT_ADMIN: 0,
//     TECHNICAL_ADMIN: 0,
//     VENDOR_OWNER: 0,
//     CAPTAIN: 0,
//     CUSTOMER: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [loadedAt, setLoadedAt] = useState(nowLabel());

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setUserCounts({
//         SUPER_ADMIN: 0,
//         STATE_ADMIN: 0,
//         DISTRICT_ADMIN: 0,
//         TECHNICAL_ADMIN: 0,
//         VENDOR_OWNER: 0,
//         CAPTAIN: 0,
//         CUSTOMER: 0,
//       });
//       setLoadedAt(nowLabel());
//       setLoading(false);
//       return;
//     }

//     try {
//       const counts: Record<RoleId, number> = {
//         SUPER_ADMIN: 0,
//         STATE_ADMIN: 0,
//         DISTRICT_ADMIN: 0,
//         TECHNICAL_ADMIN: 0,
//         VENDOR_OWNER: 0,
//         CAPTAIN: 0,
//         CUSTOMER: 0,
//       };

//       const [users, vendors, captains] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.USERS,
//           [],
//           undefined,
//           5000
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           5000
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           5000
//         ),
//       ]);

//       for (const u of users) {
//         const role = extractRole(u);
//         if (role) {
//           counts[role] += 1;
//         } else {
//           // Users without an admin/vendor/captain role count as customers
//           counts.CUSTOMER += 1;
//         }
//       }

//       // Prefer dedicated collections when role field is missing on users
//       if (counts.VENDOR_OWNER === 0 && vendors.length > 0) {
//         counts.VENDOR_OWNER = vendors.length;
//       } else {
//         // Also count vendors not already tagged on users
//         for (const v of vendors) {
//           const role = extractRole(v);
//           if (role === "VENDOR_OWNER") counts.VENDOR_OWNER += 1;
//         }
//         // If still zero but vendors exist, use collection size
//         if (counts.VENDOR_OWNER === 0 && vendors.length > 0) {
//           counts.VENDOR_OWNER = vendors.length;
//         }
//       }

//       if (counts.CAPTAIN === 0 && captains.length > 0) {
//         counts.CAPTAIN = captains.length;
//       } else if (counts.CAPTAIN === 0) {
//         for (const c of captains) {
//           const role = extractRole(c);
//           if (role === "CAPTAIN") counts.CAPTAIN += 1;
//         }
//         if (counts.CAPTAIN === 0 && captains.length > 0) {
//           counts.CAPTAIN = captains.length;
//         }
//       }

//       setUserCounts(counts);
//       setLoadedAt(nowLabel());
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load role assignment counts."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     if (!pollMs || pollMs <= 0 || isFirestoreDemoMode) return;
//     const id = window.setInterval(() => {
//       void load();
//     }, pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   const roles: Role[] = useMemo(
//     () =>
//       ROLE_DEFINITIONS.map((def) => ({
//         ...def,
//         users: userCounts[def.id] ?? 0,
//         lastUpdated: loadedAt,
//       })),
//     [userCounts, loadedAt]
//   );

//   const summary = useMemo(() => {
//     const totalUsers = roles.reduce((t, r) => t + r.users, 0);
//     const totalPermissions = roles.reduce((t, r) => t + r.permissions, 0);
//     return {
//       totalRoles: roles.length,
//       activeRoles: roles.filter((r) => r.status === "ACTIVE").length,
//       restrictedRoles: roles.filter((r) => r.status === "RESTRICTED").length,
//       totalUsers,
//       totalPermissions,
//       adminRoles: roles.filter((r) =>
//         ["SUPER_ADMIN", "STATE_ADMIN", "DISTRICT_ADMIN", "TECHNICAL_ADMIN"].includes(
//           r.id
//         )
//       ).length,
//     };
//   }, [roles]);

//   return {
//     roles,
//     summary,
//     loading,
//     error,
//     refresh: load,
//     isDemoMode: isFirestoreDemoMode,
//   };
// }

// export default useRbacRoles;

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export type RoleId =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN"
  | "VENDOR_OWNER"
  | "CAPTAIN"
  | "CUSTOMER";

export type RoleStatus = "ACTIVE" | "RESTRICTED";

export type ScopeType =
  | "GLOBAL"
  | "STATE"
  | "DISTRICT"
  | "PINCODE"
  | "VENDOR"
  | "CAPTAIN"
  | "CUSTOMER";

export type RbacRole = {
  id: RoleId;
  name: string;
  description: string;
  scope: ScopeType;
  status: RoleStatus;
  users: number;
  permissions: number;
  lastUpdated: string;
};

const ROLE_DEFS: Omit<RbacRole, "users" | "lastUpdated">[] = [
  {
    id: "SUPER_ADMIN",
    name: "Super Admin",
    description: "Platform-wide authority across all states and modules.",
    scope: "GLOBAL",
    status: "ACTIVE",
    permissions: 35,
  },
  {
    id: "STATE_ADMIN",
    name: "State Admin",
    description: "Governs one state subtree (districts, vendors, captains).",
    scope: "STATE",
    status: "ACTIVE",
    permissions: 28,
  },
  {
    id: "DISTRICT_ADMIN",
    name: "District Admin",
    description: "Operational control within one district.",
    scope: "DISTRICT",
    status: "ACTIVE",
    permissions: 22,
  },
  {
    id: "TECHNICAL_ADMIN",
    name: "Technical Admin",
    description: "Privileged technical and audit access without commercial scope.",
    scope: "GLOBAL",
    status: "ACTIVE",
    permissions: 24,
  },
  {
    id: "VENDOR_OWNER",
    name: "Vendor Owner",
    description: "Vendor-scoped catalog and order operations.",
    scope: "VENDOR",
    status: "ACTIVE",
    permissions: 12,
  },
  {
    id: "CAPTAIN",
    name: "Captain",
    description: "Rider / delivery partner role for JuRide and logistics.",
    scope: "CAPTAIN",
    status: "ACTIVE",
    permissions: 10,
  },
  {
    id: "CUSTOMER",
    name: "Customer",
    description: "End-user role for the JuOne consumer apps.",
    scope: "CUSTOMER",
    status: "ACTIVE",
    permissions: 8,
  },
];

function str(value: unknown): string {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function nowLabel() {
  return new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function useRbacRoles(pollMs = 60000) {
  const [counts, setCounts] = useState<Record<RoleId, number>>({
    SUPER_ADMIN: 0,
    STATE_ADMIN: 0,
    DISTRICT_ADMIN: 0,
    TECHNICAL_ADMIN: 0,
    VENDOR_OWNER: 0,
    CAPTAIN: 0,
    CUSTOMER: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState("—");

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setLoading(false);
      return;
    }

    try {
      const [users, vendors, captains] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.USERS,
          [],
          undefined,
          1000
        ).catch(() => []),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.VENDORS,
          [],
          undefined,
          1000
        ).catch(() => []),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          [],
          undefined,
          1000
        ).catch(() => []),
      ]);

      const next: Record<RoleId, number> = {
        SUPER_ADMIN: 0,
        STATE_ADMIN: 0,
        DISTRICT_ADMIN: 0,
        TECHNICAL_ADMIN: 0,
        VENDOR_OWNER: 0,
        CAPTAIN: 0,
        CUSTOMER: 0,
      };

      // for (const u of users) {
      //   const role = str(u.role) as RoleId;
      //   if (role in next) next[role] += 1;
      //   else if (!role || role === "USER") next.CUSTOMER += 1;
      // }

      for (const u of users) {
        const roleRaw = str(u.role); // already uppercased in str()

        if (
          roleRaw === "SUPER_ADMIN" ||
          roleRaw === "STATE_ADMIN" ||
          roleRaw === "DISTRICT_ADMIN" ||
          roleRaw === "TECHNICAL_ADMIN" ||
          roleRaw === "VENDOR_OWNER" ||
          roleRaw === "CAPTAIN" ||
          roleRaw === "CUSTOMER"
        ) {
          next[roleRaw] += 1;
        } else {
          // USER / empty / unknown → treat as customer
          next.CUSTOMER += 1;
        }
      }

      // Vendors / captains as role counts if not already in users
      next.VENDOR_OWNER = Math.max(next.VENDOR_OWNER, vendors.length);
      next.CAPTAIN = Math.max(next.CAPTAIN, captains.length);

      setCounts(next);
      setLastUpdated(nowLabel());
    } catch (err) {
      console.error("useRbacRoles:", err);
      setError(
        err instanceof Error ? err.message : "Unable to load role counts."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  const roles: RbacRole[] = useMemo(
    () =>
      ROLE_DEFS.map((r) => ({
        ...r,
        users: counts[r.id] ?? 0,
        lastUpdated,
      })),
    [counts, lastUpdated]
  );

  const summary = useMemo(
    () => ({
      totalRoles: roles.length,
      activeRoles: roles.filter((r) => r.status === "ACTIVE").length,
      restrictedRoles: roles.filter((r) => r.status === "RESTRICTED").length,
      adminRoles: roles.filter((r) =>
        ["SUPER_ADMIN", "STATE_ADMIN", "DISTRICT_ADMIN", "TECHNICAL_ADMIN"].includes(
          r.id
        )
      ).length,
      totalUsers: roles.reduce((t, r) => t + r.users, 0),
      totalPermissions: roles.reduce((t, r) => t + r.permissions, 0),
    }),
    [roles]
  );

  return { roles, summary, loading, error, refresh: load };
}

export default useRbacRoles;