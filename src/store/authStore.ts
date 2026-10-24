// /**
//  * JUERP - Authentication Store
//  *
//  * File:
//  * src/store/authStore.ts
//  *
//  * Purpose:
//  * - Keep the currently authenticated ERP administrator in application state.
//  * - Store Firebase authentication identity information.
//  * - Store backend-provided ERP authorization scope.
//  * - Provide login/logout/session actions to the UI.
//  *
//  * IMPORTANT:
//  * - Authentication is handled by Firebase Authentication.
//  * - Authorization is authoritative on the backend.
//  * - Frontend role/scope values are for UI behavior only.
//  * - This store must NOT be treated as a security boundary.
//  * - Commission, settlement, payout, KYC approval, refund and other
//  *   business-critical permissions must be validated by the backend.
//  */

// "use client";

// import { useEffect, useState } from "react";

// import {
//   getIdToken,
//   getIdTokenResult,
//   logout as firebaseLogout,
//   subscribeToAuthState,
//   type AuthUser,
// } from "../lib/firebase/auth";

// import type {
//   AuthScope,
//   ERPAdminRole,
//   ERPScope,
// } from "../hooks/useScope";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export interface AuthStoreUser {
//   /**
//    * Firebase Authentication UID.
//    */
//   userId: string;

//   /**
//    * Firebase user's email.
//    */
//   email: string | null;

//   /**
//    * Display name, when available.
//    */
//   displayName: string | null;

//   /**
//    * Phone number, when available.
//    */
//   phoneNumber: string | null;

//   /**
//    * Firebase email verification state.
//    */
//   emailVerified: boolean;

//   /**
//    * Firebase photo URL, when available.
//    */
//   photoURL: string | null;

//   /**
//    * Firebase authentication provider.
//    */
//   providerId: string | null;
// }

// export interface AuthStoreState {
//   /**
//    * Current authenticated user.
//    */
//   user: AuthStoreUser | null;

//   /**
//    * Firebase ID token.
//    *
//    * This is kept in memory only.
//    */
//   idToken: string | null;

//   /**
//    * Backend-provided authorization scope.
//    */
//   scope: AuthScope | null;

//   /**
//    * Current primary ERP role.
//    */
//   role: ERPAdminRole | null;

//   /**
//    * Authentication initialization state.
//    */
//   initialized: boolean;

//   /**
//    * Authentication loading state.
//    */
//   loading: boolean;

//   /**
//    * Authentication error.
//    */
//   error: string | null;
// }

// export interface AuthStoreActions {
//   /**
//    * Refresh Firebase ID token.
//    */
//   refreshToken: () => Promise<string | null>;

//   /**
//    * Refresh the current Firebase authentication information.
//    */
//   refreshAuth: () => Promise<void>;

//   /**
//    * Set backend authorization scope.
//    */
//   setScope: (scope: AuthScope | null) => void;

//   /**
//    * Clear authentication state.
//    */
//   clearAuth: () => void;

//   /**
//    * Sign out from Firebase.
//    */
//   logout: () => Promise<void>;

//   /**
//    * Clear current authentication error.
//    */
//   clearError: () => void;
// }

// export type AuthStore = AuthStoreState & AuthStoreActions;

// /* -------------------------------------------------------------------------- */
// /* Initial State                                                              */
// /* -------------------------------------------------------------------------- */

// export const initialAuthState: AuthStoreState = {
//   user: null,
//   idToken: null,
//   scope: null,
//   role: null,
//   initialized: false,
//   loading: true,
//   error: null,
// };

// /* -------------------------------------------------------------------------- */
// /* Module State                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * The store is intentionally kept in memory.
//  *
//  * Firebase Authentication remains responsible for persistent authentication
//  * state. We do not store Firebase ID tokens in localStorage.
//  */
// let storeState: AuthStoreState = {
//   ...initialAuthState,
// };

// let unsubscribeAuthListener: (() => void) | null = null;

// const listeners = new Set<
//   (state: AuthStoreState) => void
// >();

// let initializationPromise: Promise<void> | null = null;

// /* -------------------------------------------------------------------------- */
// /* Internal Helpers                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Notify all subscribers that the store changed.
//  */
// function notify(): void {
//   const snapshot = getAuthState();

//   listeners.forEach((listener) => {
//     listener(snapshot);
//   });
// }

// /**
//  * Update store state.
//  */
// function setStoreState(
//   updates: Partial<AuthStoreState>,
// ): void {
//   storeState = {
//     ...storeState,
//     ...updates,
//   };

//   notify();
// }

// /**
//  * Convert Firebase user to our application user shape.
//  */
// function mapFirebaseUser(
//   firebaseUser: AuthUser | null,
// ): AuthStoreUser | null {
//   if (!firebaseUser) {
//     return null;
//   }

//   return {
//     userId: firebaseUser.uid,
//     email: firebaseUser.email ?? null,
//     displayName: firebaseUser.displayName ?? null,
//     phoneNumber: firebaseUser.phoneNumber ?? null,
//     emailVerified: firebaseUser.emailVerified,
//     photoURL: firebaseUser.photoURL ?? null,
//     providerId:
//       firebaseUser.providerData?.[0]?.providerId ??
//       null,
//   };
// }

// /**
//  * Get the primary role from a backend-provided scope.
//  */
// function getPrimaryRole(
//   scope: AuthScope | null,
// ): ERPAdminRole | null {
//   if (!scope) {
//     return null;
//   }

//   return scope.role ?? null;
// }

// /**
//  * Normalize unknown errors.
//  */
// function getErrorMessage(
//   error: unknown,
// ): string {
//   if (error instanceof Error) {
//     return error.message;
//   }

//   if (
//     typeof error === "object" &&
//     error !== null &&
//     "message" in error
//   ) {
//     const message = (
//       error as {
//         message?: unknown;
//       }
//     ).message;

//     if (typeof message === "string") {
//       return message;
//     }
//   }

//   return "An authentication error occurred.";
// }

// /* -------------------------------------------------------------------------- */
// /* State Access                                                                */
// /* -------------------------------------------------------------------------- */

// /**
//  * Get a snapshot of the current auth state.
//  */
// export function getAuthState(): AuthStoreState {
//   return {
//     ...storeState,
//   };
// }

// /**
//  * Get the currently authenticated user.
//  */
// export function getCurrentAuthUser(): AuthStoreUser | null {
//   return storeState.user;
// }

// /**
//  * Get the current Firebase ID token stored in memory.
//  */
// export function getCurrentIdToken(): string | null {
//   return storeState.idToken;
// }

// /**
//  * Get the current ERP authorization scope.
//  */
// export function getCurrentAuthScope(): AuthScope | null {
//   return storeState.scope;
// }

// /**
//  * Get the current ERP role.
//  */
// export function getCurrentRole(): ERPAdminRole | null {
//   return storeState.role;
// }

// /**
//  * Check whether a user is currently authenticated.
//  */
// export function isAuthenticated(): boolean {
//   return storeState.user !== null;
// }

// /**
//  * Check whether authentication initialization has completed.
//  */
// export function isAuthInitialized(): boolean {
//   return storeState.initialized;
// }

// /* -------------------------------------------------------------------------- */
// /* Subscription                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Subscribe to auth-store changes.
//  */
// export function subscribeToAuthStore(
//   listener: (state: AuthStoreState) => void,
// ): () => void {
//   listeners.add(listener);

//   /**
//    * Send the current snapshot immediately.
//    */
//   listener(getAuthState());

//   return () => {
//     listeners.delete(listener);
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Firebase Auth Initialization                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Start listening to Firebase Authentication state.
//  *
//  * This function is safe to call multiple times.
//  */
// export function initializeAuthStore(): Promise<void> {
//   if (initializationPromise) {
//     return initializationPromise;
//   }

//   initializationPromise = new Promise<void>(
//     (resolve) => {
//       setStoreState({
//         loading: true,
//         error: null,
//       });

//       if (unsubscribeAuthListener) {
//         unsubscribeAuthListener();
//         unsubscribeAuthListener = null;
//       }

//       unsubscribeAuthListener =
//         subscribeToAuthState(
//           async (firebaseUser) => {
//             try {
//               if (!firebaseUser) {
//                 setStoreState({
//                   user: null,
//                   idToken: null,
//                   scope: null,
//                   role: null,
//                   initialized: true,
//                   loading: false,
//                   error: null,
//                 });

//                 resolve();

//                 return;
//               }

//               const user =
//                 mapFirebaseUser(firebaseUser);

//               let idToken: string | null = null;

//               try {
//                 idToken = await getIdToken(
//                   firebaseUser,
//                 );
//               } catch {
//                 /**
//                  * Token retrieval failure should not manufacture a token.
//                  *
//                  * The user can still remain represented by Firebase auth,
//                  * while protected backend calls may fail until the token
//                  * becomes available.
//                  */
//                 idToken = null;
//               }

//               setStoreState({
//                 user,
//                 idToken,
//                 initialized: true,
//                 loading: false,
//                 error: null,
//               });

//               resolve();
//             } catch (error) {
//               setStoreState({
//                 user: null,
//                 idToken: null,
//                 scope: null,
//                 role: null,
//                 initialized: true,
//                 loading: false,
//                 error: getErrorMessage(error),
//               });

//               resolve();
//             }
//           },
//         );
//     },
//   );

//   return initializationPromise;
// }

// /* -------------------------------------------------------------------------- */
// /* Token Management                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Refresh the Firebase ID token.
//  *
//  * The refreshed token is kept only in memory.
//  */
// export async function refreshAuthToken(): Promise<
//   string | null
// > {
//   const firebaseUser = await getFirebaseCurrentUser();

//   if (!firebaseUser) {
//     setStoreState({
//       idToken: null,
//     });

//     return null;
//   }

//   try {
//     const token = await getIdToken(
//       firebaseUser,
//       true,
//     );

//     setStoreState({
//       idToken: token,
//       error: null,
//     });

//     return token;
//   } catch (error) {
//     setStoreState({
//       error: getErrorMessage(error),
//     });

//     return null;
//   }
// }

// /**
//  * Get the Firebase ID token without necessarily forcing a refresh.
//  */
// export async function getAuthToken(): Promise<
//   string | null
// > {
//   const firebaseUser =
//     await getFirebaseCurrentUser();

//   if (!firebaseUser) {
//     return null;
//   }

//   try {
//     const token = await getIdToken(
//       firebaseUser,
//     );

//     setStoreState({
//       idToken: token,
//       error: null,
//     });

//     return token;
//   } catch (error) {
//     setStoreState({
//       error: getErrorMessage(error),
//     });

//     return null;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Token Claims                                                               */
// /* -------------------------------------------------------------------------- */

// export interface AuthTokenClaims {
//   [key: string]: unknown;
// }

// /**
//  * Read Firebase ID token claims.
//  *
//  * Claims are informational on the client.
//  * Backend authorization remains authoritative.
//  */
// export async function getAuthTokenClaims(): Promise<
//   AuthTokenClaims | null
// > {
//   const firebaseUser =
//     await getFirebaseCurrentUser();

//   if (!firebaseUser) {
//     return null;
//   }

//   try {
//     const tokenResult =
//       await getIdTokenResult(
//         firebaseUser,
//       );

//     return {
//       ...tokenResult.claims,
//     };
//   } catch (error) {
//     setStoreState({
//       error: getErrorMessage(error),
//     });

//     return null;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Scope Management                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Store the backend-provided ERP scope.
//  */
// export function setAuthScope(
//   scope: AuthScope | null,
// ): void {
//   setStoreState({
//     scope,
//     role: getPrimaryRole(scope),
//     error: null,
//   });
// }

// /**
//  * Clear only the backend authorization scope.
//  *
//  * Firebase authentication remains active.
//  */
// export function clearAuthScope(): void {
//   setStoreState({
//     scope: null,
//     role: null,
//   });
// }

// /**
//  * Get scope from a backend API.
//  *
//  * The backend endpoint is authoritative.
//  */
// export async function fetchAuthScope(): Promise<
//   AuthScope | null
// > {
//   const token = await getAuthToken();

//   if (!token) {
//     setAuthScope(null);

//     return null;
//   }

//   try {
//     const response = await fetch(
//       "/api/auth/scope",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type":
//             "application/json",
//         },
//         cache: "no-store",
//       },
//     );

//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch authorization scope (${response.status}).`,
//       );
//     }

//     const data = (await response.json()) as {
//       scope?: AuthScope;
//     };

//     const scope =
//       data.scope ?? null;

//     setAuthScope(scope);

//     return scope;
//   } catch (error) {
//     setStoreState({
//       error: getErrorMessage(error),
//     });

//     return null;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Auth Refresh                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Refresh all authentication-related state.
//  *
//  * This:
//  * 1. Reads Firebase user.
//  * 2. Refreshes the ID token.
//  * 3. Fetches backend authorization scope.
//  */
// export async function refreshAuth(): Promise<void> {
//   setStoreState({
//     loading: true,
//     error: null,
//   });

//   try {
//     const firebaseUser =
//       await getFirebaseCurrentUser();

//     if (!firebaseUser) {
//       clearAuth();

//       setStoreState({
//         initialized: true,
//         loading: false,
//       });

//       return;
//     }

//     const user =
//       mapFirebaseUser(firebaseUser);

//     const token =
//       await getIdToken(
//         firebaseUser,
//         true,
//       );

//     setStoreState({
//       user,
//       idToken: token,
//       initialized: true,
//       loading: false,
//       error: null,
//     });

//     await fetchAuthScope();
//   } catch (error) {
//     setStoreState({
//       initialized: true,
//       loading: false,
//       error: getErrorMessage(error),
//     });
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Logout                                                                     */
// /* -------------------------------------------------------------------------- */

// /**
//  * Clear local authentication state.
//  */
// export function clearAuth(): void {
//   setStoreState({
//     user: null,
//     idToken: null,
//     scope: null,
//     role: null,
//     initialized: true,
//     loading: false,
//     error: null,
//   });
// }

// /**
//  * Sign out from Firebase and clear local auth state.
//  */
// export async function logout(): Promise<void> {
//   setStoreState({
//     loading: true,
//     error: null,
//   });

//   try {
//     await firebaseLogout();

//     clearAuth();
//   } catch (error) {
//     setStoreState({
//       loading: false,
//       error: getErrorMessage(error),
//     });

//     throw error;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Error Management                                                           */
// /* -------------------------------------------------------------------------- */

// /**
//  * Clear the current authentication error.
//  */
// export function clearAuthError(): void {
//   setStoreState({
//     error: null,
//   });
// }

// /* -------------------------------------------------------------------------- */
// /* React Hook                                                                 */
// /* -------------------------------------------------------------------------- */

// /**
//  * React hook for consuming the auth store.
//  *
//  * Example:
//  *
//  * const {
//  *   user,
//  *   role,
//  *   loading,
//  *   initialized,
//  * } = useAuthStore();
//  */
// export function useAuthStore(): AuthStore {
//   const [state, setState] =
//     useState<AuthStoreState>(
//       getAuthState(),
//     );

//   useEffect(() => {
//     let mounted = true;

//     const unsubscribe =
//       subscribeToAuthStore(
//         (nextState) => {
//           if (mounted) {
//             setState(nextState);
//           }
//         },
//       );

//     void initializeAuthStore();

//     return () => {
//       mounted = false;
//       unsubscribe();
//     };
//   }, []);

//   return {
//     ...state,

//     refreshToken:
//       refreshAuthToken,

//     refreshAuth,

//     setScope:
//       setAuthScope,

//     clearAuth,

//     logout,

//     clearError:
//       clearAuthError,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* Firebase Current User Helper                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Retrieve the Firebase current user through the auth module.
//  *
//  * We dynamically access Firebase auth state through the existing auth helper
//  * rather than storing a second independent authentication source.
//  */
// async function getFirebaseCurrentUser(): Promise<
//   AuthUser | null
// > {
//   /**
//    * The existing firebase/auth module exposes auth-state subscription.
//    *
//    * We resolve the current state through a one-time subscription.
//    */
//   return new Promise<AuthUser | null>(
//     (resolve) => {
//       let resolved = false;

//       const unsubscribe =
//         subscribeToAuthState(
//           (user) => {
//             if (resolved) {
//               return;
//             }

//             resolved = true;

//             unsubscribe();

//             resolve(user);
//           },
//         );
//     },
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Permission Helpers                                                         */
// /* -------------------------------------------------------------------------- */

// /**
//  * Check whether the current user has a particular role.
//  *
//  * This is for UI visibility only.
//  */
// export function hasAuthRole(
//   role: ERPAdminRole,
// ): boolean {
//   return storeState.role === role;
// }

// /**
//  * Check whether the current user has one of the supplied roles.
//  *
//  * This is for UI visibility only.
//  */
// export function hasAnyAuthRole(
//   roles: ERPAdminRole[],
// ): boolean {
//   if (!storeState.role) {
//     return false;
//   }

//   return roles.includes(
//     storeState.role,
//   );
// }

// /**
//  * Check whether the current user has a permission.
//  *
//  * Backend authorization remains authoritative.
//  */
// export function hasAuthPermission(
//   permission: string,
// ): boolean {
//   const scope =
//     storeState.scope;

//   if (!scope) {
//     return false;
//   }

//   /**
//    * Support the common permission shape:
//    *
//    * permissions: string[]
//    */
//   const permissions =
//     scope.permissions;

//   if (!Array.isArray(permissions)) {
//     return false;
//   }

//   return permissions.includes(
//     permission,
//   );
// }

// /**
//  * Check whether the current scope includes a module.
//  *
//  * This is only a UI helper.
//  */
// export function hasModuleAccess(
//   moduleId: string,
// ): boolean {
//   const scope =
//     storeState.scope;

//   if (!scope) {
//     return false;
//   }

//   if (
//     !Array.isArray(scope.modules)
//   ) {
//     return false;
//   }

//   return scope.modules.includes(
//     moduleId,
//   );
// }

// /**
//  * Check whether the current scope includes a vendor.
//  *
//  * This is only a UI helper.
//  */
// export function hasVendorAccess(
//   vendorId: string,
// ): boolean {
//   const scope =
//     storeState.scope;

//   if (!scope) {
//     return false;
//   }

//   if (
//     !Array.isArray(
//       scope.vendorIds,
//     )
//   ) {
//     return false;
//   }

//   return scope.vendorIds.includes(
//     vendorId,
//   );
// }

// /**
//  * Check whether the current scope includes a captain.
//  *
//  * This is only a UI helper.
//  */
// export function hasCaptainAccess(
//   captainId: string,
// ): boolean {
//   const scope =
//     storeState.scope;

//   if (!scope) {
//     return false;
//   }

//   if (
//     !Array.isArray(
//       scope.captainIds,
//     )
//   ) {
//     return false;
//   }

//   return scope.captainIds.includes(
//     captainId,
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* Default Export                                                             */
// /* -------------------------------------------------------------------------- */

// const authStore = {
//   initialAuthState,

//   getAuthState,
//   getCurrentAuthUser,
//   getCurrentIdToken,
//   getCurrentAuthScope,
//   getCurrentRole,

//   isAuthenticated,
//   isAuthInitialized,

//   subscribeToAuthStore,
//   initializeAuthStore,

//   refreshAuthToken,
//   getAuthToken,
//   getAuthTokenClaims,

//   setAuthScope,
//   clearAuthScope,
//   fetchAuthScope,

//   refreshAuth,

//   clearAuth,
//   logout,

//   clearAuthError,

//   hasAuthRole,
//   hasAnyAuthRole,
//   hasAuthPermission,
//   hasModuleAccess,
//   hasVendorAccess,
//   hasCaptainAccess,
// };

// export default authStore;

/**
 * JUERP - Authentication Store
 *
 * File: src/store/authStore.ts
 *
 * Purpose:
 * - Keep the currently authenticated ERP administrator in application state.
 * - Store Firebase authentication identity information.
 * - Store hierarchy role + geographic scope.
 *
 * IMPORTANT:
 * - Authentication is handled by Firebase Authentication.
 * - Authorization is authoritative on the backend / custom claims.
 * - Frontend role/scope values are for UI behavior only.
 * - This store must NOT be treated as a security boundary.
 */

"use client";

import { useEffect, useState } from "react";

import {
  getIdToken,
  getIdTokenResult,
  logout as firebaseLogout,
  subscribeToAuthState,
  type AuthUser,
} from "../lib/firebase/auth";

import type {
  AuthRole,
  AuthScope,
} from "../hooks/useAuthScope";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export interface AuthStoreUser {
  userId: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  emailVerified: boolean;
  photoURL: string | null;
  providerId: string | null;
}

export interface AuthStoreState {
  user: AuthStoreUser | null;
  idToken: string | null;

  /** Hierarchy role from custom claims */
  role: AuthRole | null;

  /** Geographic scope (GLOBAL / STATE / DISTRICT / PINCODE) */
  scope: AuthScope | null;

  initialized: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthStoreActions {
  refreshToken: () => Promise<string | null>;
  refreshAuth: () => Promise<void>;
  setScope: (scope: AuthScope | null) => void;
  setRole: (role: AuthRole | null) => void;
  clearAuth: () => void;
  logout: () => Promise<void>;
  clearError: () => void;
}

export type AuthStore = AuthStoreState & AuthStoreActions;

/* -------------------------------------------------------------------------- */
/* Initial State                                                              */
/* -------------------------------------------------------------------------- */

export const initialAuthState: AuthStoreState = {
  user: null,
  idToken: null,
  role: null,
  scope: null,
  initialized: false,
  loading: true,
  error: null,
};

/* -------------------------------------------------------------------------- */
/* Module State                                                               */
/* -------------------------------------------------------------------------- */

let storeState: AuthStoreState = { ...initialAuthState };
let unsubscribeAuthListener: (() => void) | null = null;
const listeners = new Set<(state: AuthStoreState) => void>();
let initializationPromise: Promise<void> | null = null;

/* -------------------------------------------------------------------------- */
/* Internal Helpers                                                           */
/* -------------------------------------------------------------------------- */

function notify(): void {
  const snapshot = getAuthState();
  listeners.forEach((listener) => listener(snapshot));
}

function setStoreState(updates: Partial<AuthStoreState>): void {
  storeState = { ...storeState, ...updates };
  notify();
}

function mapFirebaseUser(firebaseUser: AuthUser | null): AuthStoreUser | null {
  if (!firebaseUser) return null;

  return {
    userId: firebaseUser.uid,
    email: firebaseUser.email ?? null,
    displayName: firebaseUser.displayName ?? null,
    phoneNumber: firebaseUser.phoneNumber ?? null,
    emailVerified: firebaseUser.emailVerified,
    photoURL: firebaseUser.photoURL ?? null,
    providerId: firebaseUser.providerData?.[0]?.providerId ?? null,
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }

  return "An authentication error occurred.";
}

function parseRole(value: unknown): AuthRole | null {
  if (typeof value !== "string") return null;
  const valid: AuthRole[] = [
    "SUPER_ADMIN",
    "STATE_ADMIN",
    "DISTRICT_ADMIN",
    "TECHNICAL_ADMIN",
  ];
  return valid.includes(value as AuthRole) ? (value as AuthRole) : null;
}

function buildScopeFromClaims(
  claims: Record<string, unknown>,
  role: AuthRole | null,
): AuthScope | null {
  if (!role) return null;

  const stateId =
    typeof claims.stateId === "string" ? claims.stateId.trim() : null;
  const stateName =
    typeof claims.stateName === "string" ? claims.stateName.trim() : null;
  const districtId =
    typeof claims.districtId === "string" ? claims.districtId.trim() : null;
  const districtName =
    typeof claims.districtName === "string"
      ? claims.districtName.trim()
      : null;
  const pincode =
    typeof claims.pincode === "string" ? claims.pincode.trim() : null;

  if (role === "SUPER_ADMIN") {
    return { type: "GLOBAL", id: "GLOBAL", name: "All India" };
  }

  if (role === "TECHNICAL_ADMIN") {
    return {
      type: "GLOBAL",
      id: "GLOBAL",
      name: "Technical Administration",
    };
  }

  if (role === "STATE_ADMIN") {
    if (!stateId) return null;
    return {
      type: "STATE",
      id: stateId,
      name: stateName || stateId,
    };
  }

  if (role === "DISTRICT_ADMIN") {
    if (!districtId) return null;
    return {
      type: "DISTRICT",
      id: districtId,
      name: districtName || districtId,
      parentId: stateId || undefined,
      parentName: stateName || undefined,
    };
  }

  if (pincode) {
    return {
      type: "PINCODE",
      id: pincode,
      name: pincode,
      parentId: districtId || undefined,
      parentName: districtName || undefined,
      pincode,
    };
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* State Access                                                               */
/* -------------------------------------------------------------------------- */

export function getAuthState(): AuthStoreState {
  return { ...storeState };
}

export function getCurrentAuthUser(): AuthStoreUser | null {
  return storeState.user;
}

export function getCurrentIdToken(): string | null {
  return storeState.idToken;
}

export function getCurrentAuthScope(): AuthScope | null {
  return storeState.scope;
}

export function getCurrentRole(): AuthRole | null {
  return storeState.role;
}

export function isAuthenticated(): boolean {
  return storeState.user !== null;
}

export function isAuthInitialized(): boolean {
  return storeState.initialized;
}

/* -------------------------------------------------------------------------- */
/* Subscription                                                               */
/* -------------------------------------------------------------------------- */

export function subscribeToAuthStore(
  listener: (state: AuthStoreState) => void,
): () => void {
  listeners.add(listener);
  listener(getAuthState());
  return () => {
    listeners.delete(listener);
  };
}

/* -------------------------------------------------------------------------- */
/* Firebase Auth Initialization                                               */
/* -------------------------------------------------------------------------- */

export function initializeAuthStore(): Promise<void> {
  if (initializationPromise) return initializationPromise;

  initializationPromise = new Promise<void>((resolve) => {
    setStoreState({ loading: true, error: null });

    if (unsubscribeAuthListener) {
      unsubscribeAuthListener();
      unsubscribeAuthListener = null;
    }

    unsubscribeAuthListener = subscribeToAuthState(async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setStoreState({
            user: null,
            idToken: null,
            role: null,
            scope: null,
            initialized: true,
            loading: false,
            error: null,
          });
          resolve();
          return;
        }

        const user = mapFirebaseUser(firebaseUser);
        let idToken: string | null = null;
        let role: AuthRole | null = null;
        let scope: AuthScope | null = null;

        try {
          idToken = await getIdToken(firebaseUser);
          const tokenResult = await getIdTokenResult(firebaseUser, true);
          const claims = tokenResult.claims as Record<string, unknown>;

          role = parseRole(claims.role);
          scope = buildScopeFromClaims(claims, role);
        } catch {
          idToken = null;
        }

        setStoreState({
          user,
          idToken,
          role,
          scope,
          initialized: true,
          loading: false,
          error: role
            ? null
            : "No valid JUERP hierarchy role found on this account.",
        });

        resolve();
      } catch (error) {
        setStoreState({
          user: null,
          idToken: null,
          role: null,
          scope: null,
          initialized: true,
          loading: false,
          error: getErrorMessage(error),
        });
        resolve();
      }
    });
  });

  return initializationPromise;
}

/* -------------------------------------------------------------------------- */
/* Token Management                                                           */
/* -------------------------------------------------------------------------- */

export async function refreshAuthToken(): Promise<string | null> {
  const firebaseUser = await getFirebaseCurrentUser();
  if (!firebaseUser) {
    setStoreState({ idToken: null });
    return null;
  }

  try {
    const token = await getIdToken(firebaseUser, true);
    setStoreState({ idToken: token, error: null });
    return token;
  } catch (error) {
    setStoreState({ error: getErrorMessage(error) });
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const firebaseUser = await getFirebaseCurrentUser();
  if (!firebaseUser) return null;

  try {
    const token = await getIdToken(firebaseUser);
    setStoreState({ idToken: token, error: null });
    return token;
  } catch (error) {
    setStoreState({ error: getErrorMessage(error) });
    return null;
  }
}

export interface AuthTokenClaims {
  [key: string]: unknown;
}

export async function getAuthTokenClaims(): Promise<AuthTokenClaims | null> {
  const firebaseUser = await getFirebaseCurrentUser();
  if (!firebaseUser) return null;

  try {
    const tokenResult = await getIdTokenResult(firebaseUser);
    return { ...tokenResult.claims };
  } catch (error) {
    setStoreState({ error: getErrorMessage(error) });
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Scope / Role Management                                                    */
/* -------------------------------------------------------------------------- */

export function setAuthScope(scope: AuthScope | null): void {
  setStoreState({ scope, error: null });
}

export function setAuthRole(role: AuthRole | null): void {
  setStoreState({ role, error: null });
}

export function clearAuthScope(): void {
  setStoreState({ scope: null });
}

/* -------------------------------------------------------------------------- */
/* Auth Refresh                                                               */
/* -------------------------------------------------------------------------- */

export async function refreshAuth(): Promise<void> {
  setStoreState({ loading: true, error: null });

  try {
    const firebaseUser = await getFirebaseCurrentUser();

    if (!firebaseUser) {
      clearAuth();
      setStoreState({ initialized: true, loading: false });
      return;
    }

    const user = mapFirebaseUser(firebaseUser);
    const token = await getIdToken(firebaseUser, true);
    const tokenResult = await getIdTokenResult(firebaseUser, true);
    const claims = tokenResult.claims as Record<string, unknown>;

    const role = parseRole(claims.role);
    const scope = buildScopeFromClaims(claims, role);

    setStoreState({
      user,
      idToken: token,
      role,
      scope,
      initialized: true,
      loading: false,
      error: role
        ? null
        : "No valid JUERP hierarchy role found on this account.",
    });
  } catch (error) {
    setStoreState({
      initialized: true,
      loading: false,
      error: getErrorMessage(error),
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Logout                                                                     */
/* -------------------------------------------------------------------------- */

export function clearAuth(): void {
  setStoreState({
    user: null,
    idToken: null,
    role: null,
    scope: null,
    initialized: true,
    loading: false,
    error: null,
  });
}

export async function logout(): Promise<void> {
  setStoreState({ loading: true, error: null });

  try {
    await firebaseLogout();
    clearAuth();
  } catch (error) {
    setStoreState({
      loading: false,
      error: getErrorMessage(error),
    });
    throw error;
  }
}

export function clearAuthError(): void {
  setStoreState({ error: null });
}

/* -------------------------------------------------------------------------- */
/* React Hook                                                                 */
/* -------------------------------------------------------------------------- */

export function useAuthStore(): AuthStore {
  const [state, setState] = useState<AuthStoreState>(getAuthState());

  useEffect(() => {
    let mounted = true;

    const unsubscribe = subscribeToAuthStore((nextState) => {
      if (mounted) setState(nextState);
    });

    void initializeAuthStore();

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return {
    ...state,
    refreshToken: refreshAuthToken,
    refreshAuth,
    setScope: setAuthScope,
    setRole: setAuthRole,
    clearAuth,
    logout,
    clearError: clearAuthError,
  };
}

/* -------------------------------------------------------------------------- */
/* Firebase Current User Helper                                               */
/* -------------------------------------------------------------------------- */

async function getFirebaseCurrentUser(): Promise<AuthUser | null> {
  return new Promise<AuthUser | null>((resolve) => {
    let resolved = false;

    const unsubscribe = subscribeToAuthState((user) => {
      if (resolved) return;
      resolved = true;
      unsubscribe();
      resolve(user);
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Permission Helpers (UI only)                                               */
/* -------------------------------------------------------------------------- */

export function hasAuthRole(role: AuthRole): boolean {
  return storeState.role === role;
}

export function hasAnyAuthRole(roles: AuthRole[]): boolean {
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

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const authStore = {
  initialAuthState,
  getAuthState,
  getCurrentAuthUser,
  getCurrentIdToken,
  getCurrentAuthScope,
  getCurrentRole,
  isAuthenticated,
  isAuthInitialized,
  subscribeToAuthStore,
  initializeAuthStore,
  refreshAuthToken,
  getAuthToken,
  getAuthTokenClaims,
  setAuthScope,
  setAuthRole,
  clearAuthScope,
  refreshAuth,
  clearAuth,
  logout,
  clearAuthError,
  hasAuthRole,
  hasAnyAuthRole,
  isSuperAdmin,
  isStateAdmin,
  isDistrictAdmin,
  isTechnicalAdmin,
};

export default authStore;