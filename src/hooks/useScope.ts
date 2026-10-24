// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";

// export type ERPAdminRole =
//   | "SUPER_ADMIN"
//   | "ADMIN"
//   | "OPERATIONS_ADMIN"
//   | "FINANCE_ADMIN"
//   | "SUPPORT_ADMIN"
//   | "KYC_ADMIN"
//   | "DISPATCH_ADMIN"
//   | "VIEWER";

// export type ERPScope = {
//   organizationId?: string;

//   /**
//    * Optional geographic/operational scope.
//    */
//   regionIds?: string[];
//   districtIds?: string[];
//   cityIds?: string[];

//   /**
//    * Optional module restrictions.
//    */
//   moduleIds?: string[];

//   /**
//    * Optional vendor restrictions.
//    */
//   vendorIds?: string[];

//   /**
//    * Optional captain restrictions.
//    */
//   captainIds?: string[];

//   /**
//    * Permissions returned by the trusted backend/custom claims.
//    */
//   permissions?: string[];
// };

// export type AuthScope = {
//   userId: string;
//   role: ERPAdminRole;
//   scope: ERPScope;
// };

// type UseScopeOptions = {
//   enabled?: boolean;
// };

// type UseScopeReturn = {
//   scope: AuthScope | null;

//   userId: string | null;
//   role: ERPAdminRole | null;

//   loading: boolean;
//   error: string | null;

//   isSuperAdmin: boolean;
//   isAdmin: boolean;

//   permissions: string[];

//   hasPermission: (
//     permission: string,
//   ) => boolean;

//   hasAnyPermission: (
//     permissions: string[],
//   ) => boolean;

//   hasAllPermissions: (
//     permissions: string[],
//   ) => boolean;

//   canAccessModule: (
//     moduleId: string,
//   ) => boolean;

//   canAccessVendor: (
//     vendorId: string,
//   ) => boolean;

//   canAccessCaptain: (
//     captainId: string,
//   ) => boolean;

//   refresh: () => Promise<void>;
// };

// const ADMIN_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "OPERATIONS_ADMIN",
//   "FINANCE_ADMIN",
//   "SUPPORT_ADMIN",
//   "KYC_ADMIN",
//   "DISPATCH_ADMIN",
//   "VIEWER",
// ];

// function isValidRole(
//   value: unknown,
// ): value is ERPAdminRole {
//   return (
//     typeof value === "string" &&
//     ADMIN_ROLES.includes(
//       value as ERPAdminRole,
//     )
//   );
// }

// function normalizeScope(
//   value: unknown,
// ): AuthScope | null {
//   if (!value || typeof value !== "object") {
//     return null;
//   }

//   const data =
//     value as Record<string, unknown>;

//   if (
//     typeof data.userId !== "string" ||
//     !isValidRole(data.role)
//   ) {
//     return null;
//   }

//   const rawScope =
//     data.scope &&
//     typeof data.scope === "object"
//       ? (data.scope as Record<string, unknown>)
//       : {};

//   const stringArray = (
//     key: string,
//   ): string[] | undefined => {
//     const value =
//       rawScope[key];

//     if (!Array.isArray(value)) {
//       return undefined;
//     }

//     return value.filter(
//       (item): item is string =>
//         typeof item === "string",
//     );
//   };

//   return {
//     userId: data.userId,

//     role: data.role,

//     scope: {
//       organizationId:
//         typeof rawScope.organizationId ===
//         "string"
//           ? rawScope.organizationId
//           : undefined,

//       regionIds:
//         stringArray("regionIds"),

//       districtIds:
//         stringArray("districtIds"),

//       cityIds:
//         stringArray("cityIds"),

//       moduleIds:
//         stringArray("moduleIds"),

//       vendorIds:
//         stringArray("vendorIds"),

//       captainIds:
//         stringArray("captainIds"),

//       permissions:
//         stringArray("permissions"),
//     },
//   };
// }

// export function useScope(
//   options: UseScopeOptions = {},
// ): UseScopeReturn {
//   const {
//     enabled = true,
//   } = options;

//   const [scope, setScope] =
//     useState<AuthScope | null>(null);

//   const [loading, setLoading] =
//     useState<boolean>(true);

//   const [error, setError] =
//     useState<string | null>(null);

//   const refresh = useCallback(
//     async () => {
//       if (!enabled) {
//         setScope(null);
//         setLoading(false);
//         setError(null);
//         return;
//       }

//       setLoading(true);
//       setError(null);

//       try {
//         /*
//          * The ERP scope must come from the trusted
//          * authentication/backend layer.
//          *
//          * The frontend must not allow an admin to
//          * manufacture or elevate their own scope.
//          */

//         const demoMode =
//           process.env.NEXT_PUBLIC_DEMO_MODE ===
//           "true";

//         if (demoMode) {
//           /*
//            * Demo mode intentionally provides a
//            * read-oriented viewer scope.
//            *
//            * It does not grant production privileges.
//            */
//           setScope({
//             userId: "demo-user",
//             role: "VIEWER",
//             scope: {
//               permissions: [
//                 "dashboard.read",
//                 "orders.read",
//                 "vendors.read",
//                 "captains.read",
//                 "settlements.read",
//                 "ledger.read",
//                 "audit.read",
//                 "map.read",
//               ],
//             },
//           });

//           return;
//         }

//         const response = await fetch(
//           "/api/auth/scope",
//           {
//             method: "GET",

//             headers: {
//               Accept: "application/json",
//             },

//             credentials: "include",

//             cache: "no-store",
//           },
//         );

//         if (!response.ok) {
//           if (
//             response.status === 401 ||
//             response.status === 403
//           ) {
//             throw new Error(
//               "You are not authorized to access the JuERP scope.",
//             );
//           }

//           throw new Error(
//             `Failed to load ERP scope (${response.status})`,
//           );
//         }

//         const data: unknown =
//           await response.json();

//         const normalizedScope =
//           normalizeScope(data);

//         if (!normalizedScope) {
//           throw new Error(
//             "Invalid ERP scope returned by the server.",
//           );
//         }

//         setScope(normalizedScope);
//       } catch (err) {
//         const message =
//           err instanceof Error
//             ? err.message
//             : "Unable to load ERP scope.";

//         setError(message);
//         setScope(null);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [enabled],
//   );

//   useEffect(() => {
//     void refresh();
//   }, [refresh]);

//   const permissions = useMemo(
//     () =>
//       scope?.scope.permissions ?? [],
//     [scope],
//   );

//   const isSuperAdmin =
//     scope?.role === "SUPER_ADMIN";

//   const isAdmin =
//     scope?.role === "SUPER_ADMIN" ||
//     scope?.role === "ADMIN";

//   const hasPermission = useCallback(
//     (permission: string): boolean => {
//       if (!scope) {
//         return false;
//       }

//       /*
//        * SUPER_ADMIN access is determined by
//        * the trusted backend role.
//        */
//       if (scope.role === "SUPER_ADMIN") {
//         return true;
//       }

//       return permissions.includes(
//         permission,
//       );
//     },
//     [scope, permissions],
//   );

//   const hasAnyPermission =
//     useCallback(
//       (
//         requiredPermissions: string[],
//       ): boolean => {
//         if (
//           requiredPermissions.length === 0
//         ) {
//           return true;
//         }

//         return requiredPermissions.some(
//           (permission) =>
//             hasPermission(permission),
//         );
//       },
//       [hasPermission],
//     );

//   const hasAllPermissions =
//     useCallback(
//       (
//         requiredPermissions: string[],
//       ): boolean => {
//         if (
//           requiredPermissions.length === 0
//         ) {
//           return true;
//         }

//         return requiredPermissions.every(
//           (permission) =>
//             hasPermission(permission),
//         );
//       },
//       [hasPermission],
//     );

//   const canAccessModule =
//     useCallback(
//       (moduleId: string): boolean => {
//         if (!scope) {
//           return false;
//         }

//         if (
//           scope.role === "SUPER_ADMIN"
//         ) {
//           return true;
//         }

//         const moduleIds =
//           scope.scope.moduleIds;

//         /*
//          * An undefined module list means the
//          * backend did not impose a module
//          * restriction.
//          */
//         if (!moduleIds) {
//           return true;
//         }

//         return moduleIds.includes(
//           moduleId,
//         );
//       },
//       [scope],
//     );

//   const canAccessVendor =
//     useCallback(
//       (vendorId: string): boolean => {
//         if (!scope) {
//           return false;
//         }

//         if (
//           scope.role === "SUPER_ADMIN"
//         ) {
//           return true;
//         }

//         const vendorIds =
//           scope.scope.vendorIds;

//         if (!vendorIds) {
//           return true;
//         }

//         return vendorIds.includes(
//           vendorId,
//         );
//       },
//       [scope],
//     );

//   const canAccessCaptain =
//     useCallback(
//       (captainId: string): boolean => {
//         if (!scope) {
//           return false;
//         }

//         if (
//           scope.role === "SUPER_ADMIN"
//         ) {
//           return true;
//         }

//         const captainIds =
//           scope.scope.captainIds;

//         if (!captainIds) {
//           return true;
//         }

//         return captainIds.includes(
//           captainId,
//         );
//       },
//       [scope],
//     );

//   return {
//     scope,

//     userId:
//       scope?.userId ?? null,

//     role:
//       scope?.role ?? null,

//     loading,
//     error,

//     isSuperAdmin,
//     isAdmin,

//     permissions,

//     hasPermission,
//     hasAnyPermission,
//     hasAllPermissions,

//     canAccessModule,
//     canAccessVendor,
//     canAccessCaptain,

//     refresh,
//   };
// }

// export default useScope;


"use client";

import { useMemo } from "react";
import useAuthScope, {
  type AuthRole,
  type AuthScope,
  type AuthScopeType,
} from "@/hooks/useAuthScope";

export type { AuthRole, AuthScope, AuthScopeType };

export type UseScopeReturn = {
  // identity
  userId: string | null;
  role: AuthRole | null;
  scope: AuthScope | null;

  // loading / error
  loading: boolean;
  error: string | null;

  // convenience flags
  isSuperAdmin: boolean;
  isStateAdmin: boolean;
  isDistrictAdmin: boolean;
  isTechnicalAdmin: boolean;
  isGlobalAdmin: boolean;

  // scope ids
  stateId: string | null;
  districtId: string | null;
  pincode: string | null;

  // helpers
  hasRole: (roles: AuthRole | AuthRole[]) => boolean;
  canAccessScope: (scope: AuthScope) => boolean;
  setSelectedScope: (scope: AuthScope | null) => void;
  clearSelectedScope: () => void;
  refresh: () => Promise<void>;
};

/**
 * Unified scope hook for the entire JUERP admin.
 * All geographic scoping (Super → State → District) flows through here.
 */
export default function useScope(): UseScopeReturn {
  const auth = useAuthScope();

  return useMemo(
    () => ({
      userId: auth.uid,
      role: auth.role,
      scope: auth.scope,

      loading: auth.loading,
      error: auth.error,

      isSuperAdmin: auth.role === "SUPER_ADMIN",
      isStateAdmin: auth.isStateAdmin,
      isDistrictAdmin: auth.isDistrictAdmin,
      isTechnicalAdmin: auth.isTechnicalAdmin,
      isGlobalAdmin: auth.isGlobalAdmin,

      stateId: auth.stateId,
      districtId: auth.districtId,
      pincode: auth.pincode,

      hasRole: auth.hasRole,
      canAccessScope: auth.canAccessScope,
      setSelectedScope: auth.setSelectedScope,
      clearSelectedScope: auth.clearSelectedScope,
      refresh: auth.refreshAuthScope,
    }),
    [auth],
  );
}