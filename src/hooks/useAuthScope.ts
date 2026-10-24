// "use client";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import {
//   getAuth,
//   onAuthStateChanged,
//   type User,
// } from "firebase/auth";

// export type AuthRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN"
//   | "VENDOR_OWNER"
//   | "CAPTAIN"
//   | "CUSTOMER";

// export type AuthScopeType =
//   | "GLOBAL"
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN";

// export interface AuthScope {
//   type: AuthScopeType;

//   id: string;

//   name?: string;

//   parentId?: string;

//   parentName?: string;

//   pincode?: string;
// }

// export interface AuthScopeState {
//   loading: boolean;

//   authenticated: boolean;

//   user: User | null;

//   uid: string | null;

//   role: AuthRole | null;

//   scope: AuthScope | null;

//   allowedScopeTypes: AuthScopeType[];

//   stateId: string | null;

//   districtId: string | null;

//   pincode: string | null;

//   vendorId: string | null;

//   captainId: string | null;

//   error: string | null;
// }

// export interface UseAuthScopeResult
//   extends AuthScopeState {
//   hasRole: (
//     roles: AuthRole | AuthRole[]
//   ) => boolean;

//   hasScopeType: (
//     scopeType: AuthScopeType
//   ) => boolean;

//   canAccessScope: (
//     scope: AuthScope
//   ) => boolean;

//   isGlobalAdmin: boolean;

//   isStateAdmin: boolean;

//   isDistrictAdmin: boolean;

//   isTechnicalAdmin: boolean;

//   canManageGovernance: boolean;

//   canAccessFinancialAudit: boolean;

//   canAccessTechnicalAudit: boolean;

//   setSelectedScope: (
//     scope: AuthScope | null
//   ) => void;

//   clearSelectedScope: () => void;

//   refreshAuthScope: () => Promise<void>;
// }

// /* -------------------------------------------------------------------------- */
// /* ROLE → DEFAULT SCOPE                                                       */
// /* -------------------------------------------------------------------------- */

// const ROLE_ALLOWED_SCOPE_TYPES: Record<
//   AuthRole,
//   AuthScopeType[]
// > = {
//   SUPER_ADMIN: [
//     "GLOBAL",
//     "STATE",
//     "DISTRICT",
//     "PINCODE",
//   ],

//   STATE_ADMIN: [
//     "STATE",
//     "DISTRICT",
//     "PINCODE",
//   ],

//   DISTRICT_ADMIN: [
//     "DISTRICT",
//     "PINCODE",
//   ],

//   TECHNICAL_ADMIN: [
//     "GLOBAL",
//   ],

//   VENDOR_OWNER: [
//     "VENDOR",
//   ],

//   CAPTAIN: [
//     "CAPTAIN",
//   ],

//   CUSTOMER: [],
// };

// /* -------------------------------------------------------------------------- */
// /* ROLE HELPERS                                                               */
// /* -------------------------------------------------------------------------- */

// const GOVERNANCE_ROLES: AuthRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
// ];

// const FINANCIAL_AUDIT_ROLES: AuthRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// const TECHNICAL_AUDIT_ROLES: AuthRole[] = [
//   "SUPER_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// /* -------------------------------------------------------------------------- */
// /* SAFE ROLE PARSER                                                           */
// /* -------------------------------------------------------------------------- */

// function parseRole(
//   value: unknown
// ): AuthRole | null {
//   if (
//     typeof value !== "string"
//   ) {
//     return null;
//   }

//   const validRoles: AuthRole[] = [
//     "SUPER_ADMIN",
//     "STATE_ADMIN",
//     "DISTRICT_ADMIN",
//     "TECHNICAL_ADMIN",
//     "VENDOR_OWNER",
//     "CAPTAIN",
//     "CUSTOMER",
//   ];

//   if (
//     validRoles.includes(
//       value as AuthRole
//     )
//   ) {
//     return value as AuthRole;
//   }

//   return null;
// }

// /* -------------------------------------------------------------------------- */
// /* SAFE STRING                                                                 */
// /* -------------------------------------------------------------------------- */

// function getStringClaim(
//   value: unknown
// ): string | null {
//   return typeof value ===
//     "string" &&
//     value.trim().length > 0
//     ? value.trim()
//     : null;
// }

// /* -------------------------------------------------------------------------- */
// /* CLAIM SCOPE BUILDER                                                         */
// /* -------------------------------------------------------------------------- */

// function buildScopeFromClaims(
//   claims: Record<string, unknown>,
//   role: AuthRole | null
// ): AuthScope | null {
//   if (!role) {
//     return null;
//   }

//   const stateId =
//     getStringClaim(
//       claims.stateId
//     );

//   const stateName =
//     getStringClaim(
//       claims.stateName
//     );

//   const districtId =
//     getStringClaim(
//       claims.districtId
//     );

//   const districtName =
//     getStringClaim(
//       claims.districtName
//     );

//   const pincode =
//     getStringClaim(
//       claims.pincode
//     );

//   const vendorId =
//     getStringClaim(
//       claims.vendorId
//     );

//   const captainId =
//     getStringClaim(
//       claims.captainId
//     );

//   if (
//     role ===
//     "SUPER_ADMIN"
//   ) {
//     return {
//       type: "GLOBAL",
//       id: "GLOBAL",
//       name: "Global",
//     };
//   }

//   if (
//     role ===
//     "TECHNICAL_ADMIN"
//   ) {
//     return {
//       type: "GLOBAL",
//       id: "GLOBAL",
//       name: "Technical Administration",
//     };
//   }

//   if (
//     role ===
//     "STATE_ADMIN"
//   ) {
//     if (!stateId) {
//       return null;
//     }

//     return {
//       type: "STATE",
//       id: stateId,
//       name:
//         stateName ||
//         stateId,
//     };
//   }

//   if (
//     role ===
//     "DISTRICT_ADMIN"
//   ) {
//     if (!districtId) {
//       return null;
//     }

//     return {
//       type: "DISTRICT",
//       id: districtId,
//       name:
//         districtName ||
//         districtId,
//       parentId:
//         stateId ||
//         undefined,
//       parentName:
//         stateName ||
//         undefined,
//     };
//   }

//   if (
//     role ===
//     "VENDOR_OWNER"
//   ) {
//     if (!vendorId) {
//       return null;
//     }

//     return {
//       type: "VENDOR",
//       id: vendorId,
//     };
//   }

//   if (
//     role ===
//     "CAPTAIN"
//   ) {
//     if (!captainId) {
//       return null;
//     }

//     return {
//       type: "CAPTAIN",
//       id: captainId,
//     };
//   }

//   if (
//     role ===
//     "CUSTOMER"
//   ) {
//     return null;
//   }

//   if (pincode) {
//     return {
//       type: "PINCODE",
//       id: pincode,
//       name: pincode,
//       parentId:
//         districtId ||
//         undefined,
//       parentName:
//         districtName ||
//         undefined,
//       pincode,
//     };
//   }

//   return null;
// }

// /* -------------------------------------------------------------------------- */
// /* SCOPE ACCESS                                                                */
// /* -------------------------------------------------------------------------- */

// function canScopeBeAccessed(
//   role: AuthRole | null,
//   currentScope: AuthScope | null,
//   requestedScope: AuthScope
// ): boolean {
//   if (!role) {
//     return false;
//   }

//   if (
//     role ===
//     "SUPER_ADMIN"
//   ) {
//     return true;
//   }

//   if (
//     role ===
//     "TECHNICAL_ADMIN"
//   ) {
//     return (
//       requestedScope.type ===
//         "GLOBAL" ||
//       requestedScope.type ===
//         "STATE" ||
//       requestedScope.type ===
//         "DISTRICT" ||
//       requestedScope.type ===
//         "PINCODE"
//     );
//   }

//   if (!currentScope) {
//     return false;
//   }

//   if (
//     role ===
//     "STATE_ADMIN"
//   ) {
//     if (
//       requestedScope.type ===
//       "STATE"
//     ) {
//       return (
//         requestedScope.id ===
//         currentScope.id
//       );
//     }

//     if (
//       requestedScope.type ===
//       "DISTRICT"
//     ) {
//       return (
//         requestedScope.parentId ===
//           currentScope.id ||
//         requestedScope.id ===
//           currentScope.id
//       );
//     }

//     if (
//       requestedScope.type ===
//       "PINCODE"
//     ) {
//       return (
//         requestedScope.parentId ===
//           currentScope.id ||
//         requestedScope.id ===
//           currentScope.id
//       );
//     }

//     return false;
//   }

//   if (
//     role ===
//     "DISTRICT_ADMIN"
//   ) {
//     if (
//       requestedScope.type ===
//       "DISTRICT"
//     ) {
//       return (
//         requestedScope.id ===
//         currentScope.id
//       );
//     }

//     if (
//       requestedScope.type ===
//       "PINCODE"
//     ) {
//       return (
//         requestedScope.parentId ===
//           currentScope.id ||
//         requestedScope.id ===
//           currentScope.id
//       );
//     }

//     return false;
//   }

//   if (
//     role ===
//     "VENDOR_OWNER"
//   ) {
//     return (
//       requestedScope.type ===
//         "VENDOR" &&
//       requestedScope.id ===
//         currentScope.id
//     );
//   }

//   if (
//     role ===
//     "CAPTAIN"
//   ) {
//     return (
//       requestedScope.type ===
//         "CAPTAIN" &&
//       requestedScope.id ===
//         currentScope.id
//     );
//   }

//   return false;
// }

// /* -------------------------------------------------------------------------- */
// /* HOOK                                                                        */
// /* -------------------------------------------------------------------------- */

// export default function useAuthScope(): UseAuthScopeResult {
//   const [loading, setLoading] =
//     useState(true);

//   const [
//     authenticated,
//     setAuthenticated,
//   ] = useState(false);

//   const [user, setUser] =
//     useState<User | null>(null);

//   const [role, setRole] =
//     useState<AuthRole | null>(
//       null
//     );

//   const [scope, setScope] =
//     useState<AuthScope | null>(
//       null
//     );

//   const [
//     selectedScope,
//     setSelectedScopeState,
//   ] =
//     useState<AuthScope | null>(
//       null
//     );

//   const [error, setError] =
//     useState<string | null>(
//       null
//     );

//   const loadAuthScope =
//     useCallback(
//       async (
//         firebaseUser: User | null
//       ) => {
//         if (!firebaseUser) {
//           setAuthenticated(false);
//           setUser(null);
//           setRole(null);
//           setScope(null);
//           setSelectedScopeState(
//             null
//           );
//           setError(null);
//           setLoading(false);
//           return;
//         }

//         try {
//           setLoading(true);
//           setError(null);

//           const tokenResult =
//             await firebaseUser.getIdTokenResult(
//               true
//             );

//           const claims =
//             tokenResult.claims as Record<
//               string,
//               unknown
//             >;

//           const resolvedRole =
//             parseRole(
//               claims.role
//             );

//           if (!resolvedRole) {
//             setAuthenticated(true);
//             setUser(
//               firebaseUser
//             );
//             setRole(null);
//             setScope(null);
//             setSelectedScopeState(
//               null
//             );
//             setError(
//               "No valid JUERP role was found for this account."
//             );
//             setLoading(false);
//             return;
//           }

//           const resolvedScope =
//             buildScopeFromClaims(
//               claims,
//               resolvedRole
//             );

//           setAuthenticated(
//             true
//           );

//           setUser(
//             firebaseUser
//           );

//           setRole(
//             resolvedRole
//           );

//           setScope(
//             resolvedScope
//           );

//           setSelectedScopeState(
//             (previousScope) => {
//               if (
//                 previousScope &&
//                 canScopeBeAccessed(
//                   resolvedRole,
//                   resolvedScope,
//                   previousScope
//                 )
//               ) {
//                 return previousScope;
//               }

//               return resolvedScope;
//             }
//           );
//         } catch (authError) {
//           console.error(
//             "Failed to load JUERP auth scope:",
//             authError
//           );

//           setAuthenticated(
//             Boolean(
//               firebaseUser
//             )
//           );

//           setUser(
//             firebaseUser
//           );

//           setRole(null);
//           setScope(null);
//           setSelectedScopeState(
//             null
//           );

//           setError(
//             authError instanceof
//               Error
//               ? authError.message
//               : "Unable to load authentication scope."
//           );
//         } finally {
//           setLoading(false);
//         }
//       },
//       []
//     );

//   useEffect(() => {
//     let unsubscribe:
//       | (() => void)
//       | undefined;

//     try {
//       const auth =
//         getAuth();

//       unsubscribe =
//         onAuthStateChanged(
//           auth,
//           (firebaseUser) => {
//             void loadAuthScope(
//               firebaseUser
//             );
//           }
//         );
//     } catch (authError) {
//       console.error(
//         "Firebase Auth is not available:",
//         authError
//       );

//       setError(
//         "Firebase authentication is not configured."
//       );

//       setLoading(false);
//     }

//     return () => {
//       unsubscribe?.();
//     };
//   }, [
//     loadAuthScope,
//   ]);

//   const allowedScopeTypes =
//     useMemo(() => {
//       if (!role) {
//         return [];
//       }

//       return (
//         ROLE_ALLOWED_SCOPE_TYPES[
//           role
//         ] || []
//       );
//     }, [role]);

//   const activeScope =
//     selectedScope ||
//     scope;

//   const hasRole =
//     useCallback(
//       (
//         roles:
//           | AuthRole
//           | AuthRole[]
//       ) => {
//         if (!role) {
//           return false;
//         }

//         const roleList =
//           Array.isArray(
//             roles
//           )
//             ? roles
//             : [roles];

//         return roleList.includes(
//           role
//         );
//       },
//       [role]
//     );

//   const hasScopeType =
//     useCallback(
//       (
//         scopeType: AuthScopeType
//       ) => {
//         return allowedScopeTypes.includes(
//           scopeType
//         );
//       },
//       [
//         allowedScopeTypes,
//       ]
//     );

//   const canAccessScope =
//     useCallback(
//       (
//         requestedScope: AuthScope
//       ) => {
//         return canScopeBeAccessed(
//           role,
//           scope,
//           requestedScope
//         );
//       },
//       [role, scope]
//     );

//   const setSelectedScope =
//     useCallback(
//       (
//         nextScope: AuthScope | null
//       ) => {
//         if (!nextScope) {
//           setSelectedScopeState(
//             scope
//           );
//           return;
//         }

//         if (
//           !canScopeBeAccessed(
//             role,
//             scope,
//             nextScope
//           )
//         ) {
//           console.warn(
//             "Attempted to select an unauthorized scope:",
//             nextScope
//           );

//           return;
//         }

//         setSelectedScopeState(
//           nextScope
//         );
//       },
//       [role, scope]
//     );

//   const clearSelectedScope =
//     useCallback(() => {
//       setSelectedScopeState(
//         scope
//       );
//     }, [scope]);

//   const refreshAuthScope =
//     useCallback(
//       async () => {
//         try {
//           const auth =
//             getAuth();

//           const currentUser =
//             auth.currentUser;

//           await loadAuthScope(
//             currentUser
//           );
//         } catch (refreshError) {
//           console.error(
//             "Unable to refresh JUERP auth scope:",
//             refreshError
//           );

//           setError(
//             refreshError instanceof
//               Error
//               ? refreshError.message
//               : "Unable to refresh authentication scope."
//           );
//         }
//       },
//       [loadAuthScope]
//     );

//   const stateId =
//     getScopeId(
//       activeScope,
//       "STATE"
//     );

//   const districtId =
//     getScopeId(
//       activeScope,
//       "DISTRICT"
//     );

//   const pincode =
//     activeScope?.type ===
//       "PINCODE"
//       ? activeScope.pincode ||
//         activeScope.id
//       : null;

//   const vendorId =
//     activeScope?.type ===
//       "VENDOR"
//       ? activeScope.id
//       : null;

//   const captainId =
//     activeScope?.type ===
//       "CAPTAIN"
//       ? activeScope.id
//       : null;

//   const isGlobalAdmin =
//     role ===
//       "SUPER_ADMIN" ||
//     role ===
//       "TECHNICAL_ADMIN";

//   const isStateAdmin =
//     role ===
//     "STATE_ADMIN";

//   const isDistrictAdmin =
//     role ===
//     "DISTRICT_ADMIN";

//   const isTechnicalAdmin =
//     role ===
//     "TECHNICAL_ADMIN";

//   const canManageGovernance =
//     GOVERNANCE_ROLES.includes(
//       role as AuthRole
//     );

//   const canAccessFinancialAudit =
//     FINANCIAL_AUDIT_ROLES.includes(
//       role as AuthRole
//     );

//   const canAccessTechnicalAudit =
//     TECHNICAL_AUDIT_ROLES.includes(
//       role as AuthRole
//     );

//   return {
//     loading,

//     authenticated,

//     user,

//     uid:
//       user?.uid || null,

//     role,

//     scope:
//       activeScope,

//     allowedScopeTypes,

//     stateId,

//     districtId,

//     pincode,

//     vendorId,

//     captainId,

//     error,

//     hasRole,

//     hasScopeType,

//     canAccessScope,

//     isGlobalAdmin,

//     isStateAdmin,

//     isDistrictAdmin,

//     isTechnicalAdmin,

//     canManageGovernance,

//     canAccessFinancialAudit,

//     canAccessTechnicalAudit,

//     setSelectedScope,

//     clearSelectedScope,

//     refreshAuthScope,
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* SCOPE ID HELPER                                                             */
// /* -------------------------------------------------------------------------- */

// function getScopeId(
//   scope: AuthScope | null,
//   type: AuthScopeType
// ): string | null {
//   if (!scope) {
//     return null;
//   }

//   if (
//     scope.type ===
//     type
//   ) {
//     return scope.id;
//   }

//   if (
//     type ===
//     "STATE"
//   ) {
//     return (
//       scope.parentId ||
//       null
//     );
//   }

//   if (
//     type ===
//     "DISTRICT"
//   ) {
//     return (
//       scope.parentId ||
//       null
//     );
//   }

//   return null;
// }


"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getAuth,
  onAuthStateChanged,
  type User,
} from "firebase/auth";

export type AuthRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

export type AuthScopeType =
  | "GLOBAL"
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export interface AuthScope {
  type: AuthScopeType;
  id: string;
  name?: string;
  parentId?: string;
  parentName?: string;
  pincode?: string;
}

export interface AuthScopeState {
  loading: boolean;
  authenticated: boolean;
  user: User | null;
  uid: string | null;
  role: AuthRole | null;
  scope: AuthScope | null;
  allowedScopeTypes: AuthScopeType[];
  stateId: string | null;
  districtId: string | null;
  pincode: string | null;
  error: string | null;
}

export interface UseAuthScopeResult extends AuthScopeState {
  hasRole: (roles: AuthRole | AuthRole[]) => boolean;
  hasScopeType: (scopeType: AuthScopeType) => boolean;
  canAccessScope: (scope: AuthScope) => boolean;
  isGlobalAdmin: boolean;
  isStateAdmin: boolean;
  isDistrictAdmin: boolean;
  isTechnicalAdmin: boolean;
  canManageGovernance: boolean;
  canAccessFinancialAudit: boolean;
  canAccessTechnicalAudit: boolean;
  setSelectedScope: (scope: AuthScope | null) => void;
  clearSelectedScope: () => void;
  refreshAuthScope: () => Promise<void>;
}

/* -------------------------------------------------------------------------- */
/* ROLE → ALLOWED SCOPE TYPES                                                 */
/* -------------------------------------------------------------------------- */

const ROLE_ALLOWED_SCOPE_TYPES: Record<AuthRole, AuthScopeType[]> = {
  SUPER_ADMIN: ["GLOBAL", "STATE", "DISTRICT", "PINCODE"],
  STATE_ADMIN: ["STATE", "DISTRICT", "PINCODE"],
  DISTRICT_ADMIN: ["DISTRICT", "PINCODE"],
  TECHNICAL_ADMIN: ["GLOBAL"],
};

const GOVERNANCE_ROLES: AuthRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
];

const FINANCIAL_AUDIT_ROLES: AuthRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
];

const TECHNICAL_AUDIT_ROLES: AuthRole[] = [
  "SUPER_ADMIN",
  "TECHNICAL_ADMIN",
];

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

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

function getStringClaim(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function buildScopeFromClaims(
  claims: Record<string, unknown>,
  role: AuthRole | null,
): AuthScope | null {
  if (!role) return null;

  const stateId = getStringClaim(claims.stateId);
  const stateName = getStringClaim(claims.stateName);
  const districtId = getStringClaim(claims.districtId);
  const districtName = getStringClaim(claims.districtName);
  const pincode = getStringClaim(claims.pincode);

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

  // Fallback for pincode-level if ever needed
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

function canScopeBeAccessed(
  role: AuthRole | null,
  currentScope: AuthScope | null,
  requestedScope: AuthScope,
): boolean {
  if (!role) return false;

  // Super Admin can access everything
  if (role === "SUPER_ADMIN") return true;

  // Technical Admin can view any geographic scope (read-only mostly)
  if (role === "TECHNICAL_ADMIN") {
    return ["GLOBAL", "STATE", "DISTRICT", "PINCODE"].includes(
      requestedScope.type,
    );
  }

  if (!currentScope) return false;

  if (role === "STATE_ADMIN") {
    if (requestedScope.type === "STATE") {
      return requestedScope.id === currentScope.id;
    }
    if (requestedScope.type === "DISTRICT" || requestedScope.type === "PINCODE") {
      return (
        requestedScope.parentId === currentScope.id ||
        requestedScope.id === currentScope.id
      );
    }
    return false;
  }

  if (role === "DISTRICT_ADMIN") {
    if (requestedScope.type === "DISTRICT") {
      return requestedScope.id === currentScope.id;
    }
    if (requestedScope.type === "PINCODE") {
      return (
        requestedScope.parentId === currentScope.id ||
        requestedScope.id === currentScope.id
      );
    }
    return false;
  }

  return false;
}

function getScopeId(
  scope: AuthScope | null,
  type: AuthScopeType,
): string | null {
  if (!scope) return null;

  if (scope.type === type) return scope.id;

  // When viewing a deeper scope, still expose parent IDs
  if (type === "STATE") {
    if (scope.type === "DISTRICT" || scope.type === "PINCODE") {
      return scope.parentId ?? null;
    }
  }

  if (type === "DISTRICT") {
    if (scope.type === "PINCODE") {
      return scope.parentId ?? null;
    }
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* HOOK                                                                       */
/* -------------------------------------------------------------------------- */

export default function useAuthScope(): UseAuthScopeResult {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AuthRole | null>(null);
  const [scope, setScope] = useState<AuthScope | null>(null);
  const [selectedScope, setSelectedScopeState] = useState<AuthScope | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const loadAuthScope = useCallback(async (firebaseUser: User | null) => {
    if (!firebaseUser) {
      setAuthenticated(false);
      setUser(null);
      setRole(null);
      setScope(null);
      setSelectedScopeState(null);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const tokenResult = await firebaseUser.getIdTokenResult(true);
      const claims = tokenResult.claims as Record<string, unknown>;

      const resolvedRole = parseRole(claims.role);

      if (!resolvedRole) {
        setAuthenticated(true);
        setUser(firebaseUser);
        setRole(null);
        setScope(null);
        setSelectedScopeState(null);
        setError(
          "No valid JUERP hierarchy role found. Expected SUPER_ADMIN, STATE_ADMIN, DISTRICT_ADMIN or TECHNICAL_ADMIN.",
        );
        setLoading(false);
        return;
      }

      const resolvedScope = buildScopeFromClaims(claims, resolvedRole);

      setAuthenticated(true);
      setUser(firebaseUser);
      setRole(resolvedRole);
      setScope(resolvedScope);

      setSelectedScopeState((previous) => {
        if (
          previous &&
          canScopeBeAccessed(resolvedRole, resolvedScope, previous)
        ) {
          return previous;
        }
        return resolvedScope;
      });
    } catch (authError) {
      console.error("Failed to load JUERP auth scope:", authError);
      setAuthenticated(Boolean(firebaseUser));
      setUser(firebaseUser);
      setRole(null);
      setScope(null);
      setSelectedScopeState(null);
      setError(
        authError instanceof Error
          ? authError.message
          : "Unable to load authentication scope.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const auth = getAuth();
      unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        void loadAuthScope(firebaseUser);
      });
    } catch (authError) {
      console.error("Firebase Auth is not available:", authError);
      setError("Firebase authentication is not configured.");
      setLoading(false);
    }

    return () => {
      unsubscribe?.();
    };
  }, [loadAuthScope]);

  const allowedScopeTypes = useMemo(() => {
    if (!role) return [];
    return ROLE_ALLOWED_SCOPE_TYPES[role] || [];
  }, [role]);

  const activeScope = selectedScope || scope;

  const hasRole = useCallback(
    (roles: AuthRole | AuthRole[]) => {
      if (!role) return false;
      const list = Array.isArray(roles) ? roles : [roles];
      return list.includes(role);
    },
    [role],
  );

  const hasScopeType = useCallback(
    (scopeType: AuthScopeType) => allowedScopeTypes.includes(scopeType),
    [allowedScopeTypes],
  );

  const canAccessScope = useCallback(
    (requestedScope: AuthScope) =>
      canScopeBeAccessed(role, scope, requestedScope),
    [role, scope],
  );

  const setSelectedScope = useCallback(
    (nextScope: AuthScope | null) => {
      if (!nextScope) {
        setSelectedScopeState(scope);
        return;
      }
      if (!canScopeBeAccessed(role, scope, nextScope)) {
        console.warn("Attempted to select an unauthorized scope:", nextScope);
        return;
      }
      setSelectedScopeState(nextScope);
    },
    [role, scope],
  );

  const clearSelectedScope = useCallback(() => {
    setSelectedScopeState(scope);
  }, [scope]);

  const refreshAuthScope = useCallback(async () => {
    try {
      const auth = getAuth();
      await loadAuthScope(auth.currentUser);
    } catch (refreshError) {
      console.error("Unable to refresh JUERP auth scope:", refreshError);
      setError(
        refreshError instanceof Error
          ? refreshError.message
          : "Unable to refresh authentication scope.",
      );
    }
  }, [loadAuthScope]);

  const stateId = getScopeId(activeScope, "STATE");
  const districtId = getScopeId(activeScope, "DISTRICT");
  const pincode =
    activeScope?.type === "PINCODE"
      ? activeScope.pincode || activeScope.id
      : null;

  return {
    loading,
    authenticated,
    user,
    uid: user?.uid || null,
    role,
    scope: activeScope,
    allowedScopeTypes,
    stateId,
    districtId,
    pincode,
    error,

    hasRole,
    hasScopeType,
    canAccessScope,

    isGlobalAdmin: role === "SUPER_ADMIN" || role === "TECHNICAL_ADMIN",
    isStateAdmin: role === "STATE_ADMIN",
    isDistrictAdmin: role === "DISTRICT_ADMIN",
    isTechnicalAdmin: role === "TECHNICAL_ADMIN",

    canManageGovernance: GOVERNANCE_ROLES.includes(role as AuthRole),
    canAccessFinancialAudit: FINANCIAL_AUDIT_ROLES.includes(role as AuthRole),
    canAccessTechnicalAudit: TECHNICAL_AUDIT_ROLES.includes(role as AuthRole),

    setSelectedScope,
    clearSelectedScope,
    refreshAuthScope,
  };
}