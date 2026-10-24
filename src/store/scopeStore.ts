// /**
//  * JUERP - Scope Store
//  *
//  * File:
//  * src/store/scopeStore.ts
//  *
//  * Purpose:
//  * - Keep the currently authenticated ERP user's scope in client memory.
//  * - Provide convenient permission/module/vendor/captain access checks.
//  * - Support hierarchy-aware UI decisions.
//  *
//  * IMPORTANT:
//  * - This store is NOT a security boundary.
//  * - Backend authorization and Firebase/Firestore rules remain authoritative.
//  * - Never use this store to grant permissions that the backend has not granted.
//  * - Do not store Firebase ID tokens in localStorage.
//  */

// "use client";

// import { useEffect, useState } from "react";

// import type {
//   AuthScope,
//   ERPAdminRole,
// } from "../hooks/useScope";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export interface ScopeStoreState {
//   /**
//    * Whether scope information has been loaded.
//    */
//   initialized: boolean;

//   /**
//    * Whether scope information is currently being loaded.
//    */
//   loading: boolean;

//   /**
//    * Current authenticated user's ERP scope.
//    */
//   scope: AuthScope | null;

//   /**
//    * Last scope loading error.
//    */
//   error: string | null;

//   /**
//    * Timestamp of the last successful scope update.
//    */
//   lastLoadedAt: number | null;
// }

// export interface ScopeStoreActions {
//   setScope: (
//     scope: AuthScope | null,
//   ) => void;

//   clearScope: () => void;

//   setLoading: (
//     loading: boolean,
//   ) => void;

//   setError: (
//     error: string | null,
//   ) => void;

//   clearError: () => void;

//   markInitialized: () => void;

//   markLoaded: (
//     scope: AuthScope | null,
//   ) => void;

//   hasRole: (
//     role: ERPAdminRole,
//   ) => boolean;

//   hasAnyRole: (
//     roles: ERPAdminRole[],
//   ) => boolean;

//   hasPermission: (
//     permission: string,
//   ) => boolean;

//   hasAnyPermission: (
//     permissions: string[],
//   ) => boolean;

//   hasAllPermissions: (
//     permissions: string[],
//   ) => boolean;

//   hasModuleAccess: (
//     moduleId: string,
//   ) => boolean;

//   hasVendorAccess: (
//     vendorId: string,
//   ) => boolean;

//   hasCaptainAccess: (
//     captainId: string,
//   ) => boolean;

//   isSuperAdmin: () => boolean;

//   isAdmin: () => boolean;

//   canViewERP: () => boolean;

//   resetScopeStore: () => void;
// }

// export type ScopeStore =
//   ScopeStoreState &
//   ScopeStoreActions;

// /* -------------------------------------------------------------------------- */
// /* Initial State                                                              */
// /* -------------------------------------------------------------------------- */

// export const initialScopeStoreState:
//   ScopeStoreState = {
//   initialized: false,

//   loading: false,

//   scope: null,

//   error: null,

//   lastLoadedAt: null,
// };

// /* -------------------------------------------------------------------------- */
// /* Internal Store                                                             */
// /* -------------------------------------------------------------------------- */

// let storeState: ScopeStoreState = {
//   ...initialScopeStoreState,
// };

// const listeners = new Set<
//   (state: ScopeStoreState) => void
// >();

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// function notify(): void {
//   const snapshot =
//     getScopeStoreState();

//   listeners.forEach(
//     (listener) => {
//       listener(snapshot);
//     },
//   );
// }

// function setStoreState(
//   updates: Partial<ScopeStoreState>,
// ): void {
//   storeState = {
//     ...storeState,
//     ...updates,
//   };

//   notify();
// }

// /**
//  * Read a potentially optional array safely.
//  *
//  * This keeps the store tolerant of scope objects where
//  * some optional access lists are absent.
//  */
// function getStringArray(
//   value: unknown,
// ): string[] {
//   if (!Array.isArray(value)) {
//     return [];
//   }

//   return value.filter(
//     (
//       item,
//     ): item is string =>
//       typeof item === "string" &&
//       item.trim().length > 0,
//   );
// }

// /**
//  * Read the permission collection from the current scope.
//  */
// function getPermissions(
//   scope: AuthScope | null,
// ): string[] {
//   if (!scope) {
//     return [];
//   }

//   return getStringArray(
//     (
//       scope as unknown as {
//         permissions?: unknown;
//       }
//     ).permissions,
//   );
// }

// /**
//  * Read module IDs from the current scope.
//  *
//  * The existing project scope may expose module access
//  * as `moduleIds` or `modules`. Both are supported here
//  * without changing the backend contract.
//  */
// function getModuleIds(
//   scope: AuthScope | null,
// ): string[] {
//   if (!scope) {
//     return [];
//   }

//   const value =
//     scope as unknown as {
//       moduleIds?: unknown;
//       modules?: unknown;
//     };

//   const moduleIds =
//     getStringArray(
//       value.moduleIds,
//     );

//   if (moduleIds.length > 0) {
//     return moduleIds;
//   }

//   return getStringArray(
//     value.modules,
//   );
// }

// /**
//  * Read vendor IDs from the current scope.
//  */
// function getVendorIds(
//   scope: AuthScope | null,
// ): string[] {
//   if (!scope) {
//     return [];
//   }

//   return getStringArray(
//     (
//       scope as unknown as {
//         vendorIds?: unknown;
//       }
//     ).vendorIds,
//   );
// }

// /**
//  * Read captain IDs from the current scope.
//  */
// function getCaptainIds(
//   scope: AuthScope | null,
// ): string[] {
//   if (!scope) {
//     return [];
//   }

//   return getStringArray(
//     (
//       scope as unknown as {
//         captainIds?: unknown;
//       }
//     ).captainIds,
//   );
// }

// /**
//  * Compare IDs without changing their canonical value.
//  */
// function containsId(
//   ids: string[],
//   id: string,
// ): boolean {
//   const normalizedId =
//     id.trim();

//   if (!normalizedId) {
//     return false;
//   }

//   return ids.includes(
//     normalizedId,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* State Access                                                               */
// /* -------------------------------------------------------------------------- */

// export function getScopeStoreState():
//   ScopeStoreState {
//   return {
//     ...storeState,
//   };
// }

// export function getCurrentAuthScope():
//   AuthScope | null {
//   return storeState.scope;
// }

// export function getCurrentERPAdminRole():
//   ERPAdminRole | null {
//   return (
//     storeState.scope?.role ??
//     null
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Subscription                                                               */
// /* -------------------------------------------------------------------------- */

// export function subscribeToScopeStore(
//   listener: (
//     state: ScopeStoreState,
//   ) => void,
// ): () => void {
//   listeners.add(listener);

//   listener(
//     getScopeStoreState(),
//   );

//   return () => {
//     listeners.delete(listener);
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Scope Management                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Set the authenticated user's scope.
//  *
//  * The scope should normally come from the backend
//  * `/api/auth/scope` response or an equivalent
//  * authoritative source.
//  */
// export function setScope(
//   scope: AuthScope | null,
// ): void {
//   setStoreState({
//     scope,

//     initialized: true,

//     loading: false,

//     error: null,

//     lastLoadedAt:
//       Date.now(),
//   });
// }

// /**
//  * Clear the current scope.
//  */
// export function clearScope(): void {
//   setStoreState({
//     scope: null,

//     initialized: true,

//     loading: false,

//     lastLoadedAt: null,
//   });
// }

// /**
//  * Set loading state.
//  */
// export function setScopeLoading(
//   loading: boolean,
// ): void {
//   setStoreState({
//     loading,
//   });
// }

// /**
//  * Set scope error.
//  */
// export function setScopeError(
//   error: string | null,
// ): void {
//   setStoreState({
//     error,
//   });
// }

// /**
//  * Clear scope error.
//  */
// export function clearScopeError(): void {
//   setStoreState({
//     error: null,
//   });
// }

// /**
//  * Mark the store initialized without changing the scope.
//  */
// export function markScopeInitialized(): void {
//   setStoreState({
//     initialized: true,
//   });
// }

// /**
//  * Mark a successful scope load.
//  */
// export function markScopeLoaded(
//   scope: AuthScope | null,
// ): void {
//   setStoreState({
//     scope,

//     initialized: true,

//     loading: false,

//     error: null,

//     lastLoadedAt:
//       Date.now(),
//   });
// }

// /* -------------------------------------------------------------------------- */
// /* Role Checks                                                                */
// /* -------------------------------------------------------------------------- */

// export function hasScopeRole(
//   role: ERPAdminRole,
// ): boolean {
//   return (
//     storeState.scope?.role ===
//     role
//   );
// }

// export function hasAnyScopeRole(
//   roles: ERPAdminRole[],
// ): boolean {
//   if (!storeState.scope) {
//     return false;
//   }

//   return roles.includes(
//     storeState.scope.role,
//   );
// }

// /**
//  * SUPER_ADMIN check.
//  */
// export function isSuperAdmin(): boolean {
//   return hasScopeRole(
//     "SUPER_ADMIN",
//   );
// }

// /**
//  * ADMIN check.
//  *
//  * SUPER_ADMIN is also treated as an administrative
//  * role for UI visibility.
//  */
// export function isAdmin(): boolean {
//   const role =
//     storeState.scope?.role;

//   return (
//     role === "SUPER_ADMIN" ||
//     role === "ADMIN"
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Permission Checks                                                          */
// /* -------------------------------------------------------------------------- */

// export function hasScopePermission(
//   permission: string,
// ): boolean {
//   const normalized =
//     permission.trim();

//   if (!normalized) {
//     return false;
//   }

//   const permissions =
//     getPermissions(
//       storeState.scope,
//     );

//   if (
//     permissions.includes(
//       "*",
//     )
//   ) {
//     return true;
//   }

//   return permissions.includes(
//     normalized,
//   );
// }

// export function hasAnyScopePermission(
//   permissions: string[],
// ): boolean {
//   return permissions.some(
//     (permission) =>
//       hasScopePermission(
//         permission,
//       ),
//   );
// }

// export function hasAllScopePermissions(
//   permissions: string[],
// ): boolean {
//   return permissions.every(
//     (permission) =>
//       hasScopePermission(
//         permission,
//       ),
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Module Access                                                              */
// /* -------------------------------------------------------------------------- */

// export function hasScopeModuleAccess(
//   moduleId: string,
// ): boolean {
//   const normalized =
//     moduleId.trim();

//   if (!normalized) {
//     return false;
//   }

//   if (isSuperAdmin()) {
//     return true;
//   }

//   const moduleIds =
//     getModuleIds(
//       storeState.scope,
//     );

//   if (
//     moduleIds.includes(
//       "*",
//     )
//   ) {
//     return true;
//   }

//   return moduleIds.includes(
//     normalized,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Vendor Access                                                              */
// /* -------------------------------------------------------------------------- */

// export function hasScopeVendorAccess(
//   vendorId: string,
// ): boolean {
//   const normalized =
//     vendorId.trim();

//   if (!normalized) {
//     return false;
//   }

//   if (isSuperAdmin()) {
//     return true;
//   }

//   const vendorIds =
//     getVendorIds(
//       storeState.scope,
//     );

//   if (
//     vendorIds.includes(
//       "*",
//     )
//   ) {
//     return true;
//   }

//   return containsId(
//     vendorIds,
//     normalized,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Captain Access                                                             */
// /* -------------------------------------------------------------------------- */

// export function hasScopeCaptainAccess(
//   captainId: string,
// ): boolean {
//   const normalized =
//     captainId.trim();

//   if (!normalized) {
//     return false;
//   }

//   if (isSuperAdmin()) {
//     return true;
//   }

//   const captainIds =
//     getCaptainIds(
//       storeState.scope,
//     );

//   if (
//     captainIds.includes(
//       "*",
//     )
//   ) {
//     return true;
//   }

//   return containsId(
//     captainIds,
//     normalized,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* ERP Access                                                                 */
// /* -------------------------------------------------------------------------- */

// /**
//  * Basic UI-level check for whether the user has an ERP scope.
//  *
//  * Actual authorization remains backend-controlled.
//  */
// export function canViewERP(): boolean {
//   return (
//     storeState.scope !== null
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Reset                                                                      */
// /* -------------------------------------------------------------------------- */

// export function resetScopeStore(): void {
//   setStoreState({
//     ...initialScopeStoreState,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /* React Hook                                                                 */
// /* -------------------------------------------------------------------------- */

// export function useScopeStore():
//   ScopeStore {
//   const [state, setState] =
//     useState<ScopeStoreState>(
//       getScopeStoreState(),
//     );

//   useEffect(() => {
//     return subscribeToScopeStore(
//       (nextState) => {
//         setState(nextState);
//       },
//     );
//   }, []);

//   return {
//     ...state,

//     setScope,

//     clearScope,

//     setLoading:
//       setScopeLoading,

//     setError:
//       setScopeError,

//     clearError:
//       clearScopeError,

//     markInitialized:
//       markScopeInitialized,

//     markLoaded:
//       markScopeLoaded,

//     hasRole:
//       hasScopeRole,

//     hasAnyRole:
//       hasAnyScopeRole,

//     hasPermission:
//       hasScopePermission,

//     hasAnyPermission:
//       hasAnyScopePermission,

//     hasAllPermissions:
//       hasAllScopePermissions,

//     hasModuleAccess:
//       hasScopeModuleAccess,

//     hasVendorAccess:
//       hasScopeVendorAccess,

//     hasCaptainAccess:
//       hasScopeCaptainAccess,

//     isSuperAdmin,

//     isAdmin,

//     canViewERP,

//     resetScopeStore,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Default Export                                                             */
// /* -------------------------------------------------------------------------- */

// const scopeStore = {
//   initialScopeStoreState,

//   getScopeStoreState,

//   getCurrentAuthScope,

//   getCurrentERPAdminRole,

//   subscribeToScopeStore,

//   setScope,

//   clearScope,

//   setScopeLoading,

//   setScopeError,

//   clearScopeError,

//   markScopeInitialized,

//   markScopeLoaded,

//   hasScopeRole,

//   hasAnyScopeRole,

//   hasScopePermission,

//   hasAnyScopePermission,

//   hasAllScopePermissions,

//   hasScopeModuleAccess,

//   hasScopeVendorAccess,

//   hasScopeCaptainAccess,

//   isSuperAdmin,

//   isAdmin,

//   canViewERP,

//   resetScopeStore,
// };

// export default scopeStore;


/**
 * JUERP - Scope Store
 *
 * File: src/store/scopeStore.ts
 *
 * Purpose:
 * - Keep the currently selected geographic scope in client memory.
 * - Provide hierarchy-aware UI helpers.
 *
 * IMPORTANT:
 * - This store is NOT a security boundary.
 * - Backend authorization and Firebase/Firestore rules remain authoritative.
 */

"use client";

import { useEffect, useState } from "react";

import type { AuthRole, AuthScope } from "../hooks/useAuthScope";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface ScopeStoreState {
  initialized: boolean;
  loading: boolean;
  scope: AuthScope | null;
  role: AuthRole | null;
  error: string | null;
  lastLoadedAt: number | null;
}

export interface ScopeStoreActions {
  setScope: (scope: AuthScope | null) => void;
  setRole: (role: AuthRole | null) => void;
  clearScope: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  markInitialized: () => void;
  markLoaded: (scope: AuthScope | null, role?: AuthRole | null) => void;

  hasRole: (role: AuthRole) => boolean;
  hasAnyRole: (roles: AuthRole[]) => boolean;

  isSuperAdmin: () => boolean;
  isStateAdmin: () => boolean;
  isDistrictAdmin: () => boolean;
  isTechnicalAdmin: () => boolean;
  isGlobalAdmin: () => boolean;

  canViewERP: () => boolean;
  resetScopeStore: () => void;
}

export type ScopeStore = ScopeStoreState & ScopeStoreActions;

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

export const initialScopeStoreState: ScopeStoreState = {
  initialized: false,
  loading: false,
  scope: null,
  role: null,
  error: null,
  lastLoadedAt: null,
};

/* -------------------------------------------------------------------------- */
/* Internal Store                                                             */
/* -------------------------------------------------------------------------- */

let storeState: ScopeStoreState = { ...initialScopeStoreState };

const listeners = new Set<(state: ScopeStoreState) => void>();

function notify(): void {
  const snapshot = getScopeStoreState();
  listeners.forEach((listener) => listener(snapshot));
}

function setStoreState(updates: Partial<ScopeStoreState>): void {
  storeState = { ...storeState, ...updates };
  notify();
}

/* -------------------------------------------------------------------------- */
/* State Access                                                               */
/* -------------------------------------------------------------------------- */

export function getScopeStoreState(): ScopeStoreState {
  return { ...storeState };
}

export function getCurrentAuthScope(): AuthScope | null {
  return storeState.scope;
}

export function getCurrentERPAdminRole(): AuthRole | null {
  return storeState.role;
}

/* -------------------------------------------------------------------------- */
/* Subscription                                                               */
/* -------------------------------------------------------------------------- */

export function subscribeToScopeStore(
  listener: (state: ScopeStoreState) => void,
): () => void {
  listeners.add(listener);
  listener(getScopeStoreState());
  return () => {
    listeners.delete(listener);
  };
}

/* -------------------------------------------------------------------------- */
/* Scope Management                                                           */
/* -------------------------------------------------------------------------- */

export function setScope(scope: AuthScope | null): void {
  setStoreState({
    scope,
    initialized: true,
    loading: false,
    error: null,
    lastLoadedAt: Date.now(),
  });
}

export function setRole(role: AuthRole | null): void {
  setStoreState({ role });
}

export function clearScope(): void {
  setStoreState({
    scope: null,
    role: null,
    initialized: true,
    loading: false,
    lastLoadedAt: null,
  });
}

export function setScopeLoading(loading: boolean): void {
  setStoreState({ loading });
}

export function setScopeError(error: string | null): void {
  setStoreState({ error });
}

export function clearScopeError(): void {
  setStoreState({ error: null });
}

export function markScopeInitialized(): void {
  setStoreState({ initialized: true });
}

export function markScopeLoaded(
  scope: AuthScope | null,
  role: AuthRole | null = null,
): void {
  setStoreState({
    scope,
    role: role ?? storeState.role,
    initialized: true,
    loading: false,
    error: null,
    lastLoadedAt: Date.now(),
  });
}

/* -------------------------------------------------------------------------- */
/* Role Checks                                                                */
/* -------------------------------------------------------------------------- */

export function hasScopeRole(role: AuthRole): boolean {
  return storeState.role === role;
}

export function hasAnyScopeRole(roles: AuthRole[]): boolean {
  if (!storeState.role) return false;
  return roles.includes(storeState.role);
}

export function isSuperAdmin(): boolean {
  return storeState.role === "SUPER_ADMIN";
}

export function isStateAdmin(): boolean {
  return storeState.role === "STATE_ADMIN";
}

export function isDistrictAdmin(): boolean {
  return storeState.role === "DISTRICT_ADMIN";
}

export function isTechnicalAdmin(): boolean {
  return storeState.role === "TECHNICAL_ADMIN";
}

export function isGlobalAdmin(): boolean {
  return (
    storeState.role === "SUPER_ADMIN" ||
    storeState.role === "TECHNICAL_ADMIN"
  );
}

/* -------------------------------------------------------------------------- */
/* ERP Access                                                                 */
/* -------------------------------------------------------------------------- */

export function canViewERP(): boolean {
  return storeState.scope !== null && storeState.role !== null;
}

/* -------------------------------------------------------------------------- */
/* Reset                                                                      */
/* -------------------------------------------------------------------------- */

export function resetScopeStore(): void {
  setStoreState({ ...initialScopeStoreState });
}

/* -------------------------------------------------------------------------- */
/* React Hook                                                                 */
/* -------------------------------------------------------------------------- */

export function useScopeStore(): ScopeStore {
  const [state, setState] = useState<ScopeStoreState>(getScopeStoreState());

  useEffect(() => {
    return subscribeToScopeStore((nextState) => {
      setState(nextState);
    });
  }, []);

  return {
    ...state,
    setScope,
    setRole,
    clearScope,
    setLoading: setScopeLoading,
    setError: setScopeError,
    clearError: clearScopeError,
    markInitialized: markScopeInitialized,
    markLoaded: markScopeLoaded,
    hasRole: hasScopeRole,
    hasAnyRole: hasAnyScopeRole,
    isSuperAdmin,
    isStateAdmin,
    isDistrictAdmin,
    isTechnicalAdmin,
    isGlobalAdmin,
    canViewERP,
    resetScopeStore,
  };
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const scopeStore = {
  initialScopeStoreState,
  getScopeStoreState,
  getCurrentAuthScope,
  getCurrentERPAdminRole,
  subscribeToScopeStore,
  setScope,
  setRole,
  clearScope,
  setScopeLoading,
  setScopeError,
  clearScopeError,
  markScopeInitialized,
  markScopeLoaded,
  hasScopeRole,
  hasAnyScopeRole,
  isSuperAdmin,
  isStateAdmin,
  isDistrictAdmin,
  isTechnicalAdmin,
  isGlobalAdmin,
  canViewERP,
  resetScopeStore,
};

export default scopeStore;