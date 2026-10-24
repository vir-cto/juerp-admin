// /**
//  * JUONE / JuERP Firebase Authentication
//  *
//  * Firebase Authentication is the authentication layer.
//  *
//  * Important:
//  * - Authentication proves who the user is.
//  * - Authorization must be enforced by backend/API and
//  *   Firestore security rules.
//  * - Do not trust frontend role checks as the security boundary.
//  * - Admin scope should come from trusted backend/custom claims.
//  */

// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signOut,
//   updateProfile,
//   type User,
//   type Unsubscribe,
// } from "firebase/auth";

// import { auth } from "./config";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type FirebaseAuthUser = {
//   uid: string;
//   email: string | null;
//   displayName: string | null;
//   photoURL: string | null;
//   emailVerified: boolean;
// };

// export type SignInResult = {
//   user: FirebaseAuthUser;
// };

// export type RegisterResult = {
//   user: FirebaseAuthUser;
// };

// export type AuthStateCallback = (
//   user: FirebaseAuthUser | null,
// ) => void;

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// /**
//  * Converts Firebase User into the smaller object used by JuERP.
//  */
// export function mapFirebaseUser(
//   user: User | null,
// ): FirebaseAuthUser | null {
//   if (!user) {
//     return null;
//   }

//   return {
//     uid: user.uid,
//     email: user.email,
//     displayName: user.displayName,
//     photoURL: user.photoURL,
//     emailVerified: user.emailVerified,
//   };
// }

// /**
//  * Returns the currently authenticated Firebase user.
//  */
// export function getCurrentFirebaseUser(): User | null {
//   return auth.currentUser;
// }

// /**
//  * Returns the currently authenticated JuERP user.
//  */
// export function getCurrentAuthUser(): FirebaseAuthUser | null {
//   return mapFirebaseUser(auth.currentUser);
// }

// /* -------------------------------------------------------------------------- */
// /* Sign In                                                                    */
// /* -------------------------------------------------------------------------- */

// /**
//  * Signs an admin into Firebase Authentication.
//  *
//  * This only authenticates the user.
//  * JuERP role/scope must be resolved separately from the
//  * trusted backend/custom claims.
//  */
// export async function signIn(
//   email: string,
//   password: string,
// ): Promise<SignInResult> {
//   const normalizedEmail = email
//     .trim()
//     .toLowerCase();

//   if (!normalizedEmail) {
//     throw new Error(
//       "Email address is required.",
//     );
//   }

//   if (!password) {
//     throw new Error(
//       "Password is required.",
//     );
//   }

//   try {
//     const credential =
//       await signInWithEmailAndPassword(
//         auth,
//         normalizedEmail,
//         password,
//       );

//     const user =
//       mapFirebaseUser(credential.user);

//     if (!user) {
//       throw new Error(
//         "Authentication succeeded, but the user could not be loaded.",
//       );
//     }

//     return {
//       user,
//     };
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Registration                                                               */
// /* -------------------------------------------------------------------------- */

// /**
//  * Creates a Firebase Authentication account.
//  *
//  * Creating the account does NOT automatically make the
//  * user a JuERP administrator.
//  *
//  * Backend authorization/custom claims must determine
//  * whether the account has JuERP access.
//  */
// export async function register(
//   email: string,
//   password: string,
//   displayName?: string,
// ): Promise<RegisterResult> {
//   const normalizedEmail = email
//     .trim()
//     .toLowerCase();

//   if (!normalizedEmail) {
//     throw new Error(
//       "Email address is required.",
//     );
//   }

//   if (!password) {
//     throw new Error(
//       "Password is required.",
//     );
//   }

//   try {
//     const credential =
//       await createUserWithEmailAndPassword(
//         auth,
//         normalizedEmail,
//         password,
//       );

//     if (displayName?.trim()) {
//       await updateProfile(
//         credential.user,
//         {
//           displayName:
//             displayName.trim(),
//         },
//       );
//     }

//     const user =
//       mapFirebaseUser(credential.user);

//     if (!user) {
//       throw new Error(
//         "Registration succeeded, but the user could not be loaded.",
//       );
//     }

//     return {
//       user,
//     };
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Password Reset                                                             */
// /* -------------------------------------------------------------------------- */

// /**
//  * Sends a Firebase password-reset email.
//  */
// export async function resetPassword(
//   email: string,
// ): Promise<void> {
//   const normalizedEmail = email
//     .trim()
//     .toLowerCase();

//   if (!normalizedEmail) {
//     throw new Error(
//       "Email address is required.",
//     );
//   }

//   try {
//     await sendPasswordResetEmail(
//       auth,
//       normalizedEmail,
//     );
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Sign Out                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Signs the current user out of Firebase.
//  */
// export async function logout(): Promise<void> {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Auth State                                                                 */
// /* -------------------------------------------------------------------------- */

// /**
//  * Listens for Firebase Authentication state changes.
//  *
//  * Returns an unsubscribe function.
//  */
// export function subscribeToAuthState(
//   callback: AuthStateCallback,
// ): Unsubscribe {
//   return onAuthStateChanged(
//     auth,
//     (user) => {
//       callback(
//         mapFirebaseUser(user),
//       );
//     },
//   );
// }

// /**
//  * Alias commonly useful in auth providers.
//  */
// export const onAuthChange =
//   subscribeToAuthState;

// /* -------------------------------------------------------------------------- */
// /* ID Token                                                                   */
// /* -------------------------------------------------------------------------- */

// /**
//  * Returns the Firebase ID token for the current user.
//  *
//  * The token can be sent to trusted backend APIs for
//  * authorization and scope resolution.
//  */
// export async function getIdToken(
//   forceRefresh = false,
// ): Promise<string | null> {
//   const user = auth.currentUser;

//   if (!user) {
//     return null;
//   }

//   try {
//     return await user.getIdToken(
//       forceRefresh,
//     );
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /**
//  * Returns the ID token result including claims.
//  *
//  * Custom claims are trusted only after Firebase verifies
//  * the token. The backend remains the authoritative
//  * security boundary.
//  */
// export async function getIdTokenResult(
//   forceRefresh = false,
// ) {
//   const user = auth.currentUser;

//   if (!user) {
//     return null;
//   }

//   try {
//     return await user.getIdTokenResult(
//       forceRefresh,
//     );
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /**
//  * Forces Firebase to refresh the ID token.
//  *
//  * Useful after an administrator's custom claims
//  * have been changed by the trusted backend.
//  */
// export async function refreshIdToken(): Promise<
//   string | null
// > {
//   return getIdToken(true);
// }

// /* -------------------------------------------------------------------------- */
// /* Email Verification                                                         */
// /* -------------------------------------------------------------------------- */

// /**
//  * Returns whether the current user has verified
//  * their Firebase email address.
//  */
// export function isEmailVerified(): boolean {
//   return (
//     auth.currentUser?.emailVerified ??
//     false
//   );
// }

// /**
//  * Reloads the current Firebase user.
//  *
//  * This is useful after email verification.
//  */
// export async function reloadCurrentUser(): Promise<
//   FirebaseAuthUser | null
// > {
//   const user = auth.currentUser;

//   if (!user) {
//     return null;
//   }

//   try {
//     await user.reload();

//     return mapFirebaseUser(
//       auth.currentUser,
//     );
//   } catch (error) {
//     throw normalizeFirebaseAuthError(error);
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Error Handling                                                             */
// /* -------------------------------------------------------------------------- */

// type FirebaseErrorLike = {
//   code?: unknown;
//   message?: unknown;
// };

// function normalizeFirebaseAuthError(
//   error: unknown,
// ): Error {
//   const firebaseError =
//     error as FirebaseErrorLike;

//   const code =
//     typeof firebaseError?.code ===
//     "string"
//       ? firebaseError.code
//       : "";

//   switch (code) {
//     case "auth/invalid-email":
//       return new Error(
//         "Please enter a valid email address.",
//       );

//     case "auth/user-disabled":
//       return new Error(
//         "This account has been disabled.",
//       );

//     case "auth/user-not-found":
//       return new Error(
//         "No account was found with this email address.",
//       );

//     case "auth/wrong-password":
//       return new Error(
//         "Incorrect email or password.",
//       );

//     case "auth/invalid-credential":
//       return new Error(
//         "Incorrect email or password.",
//       );

//     case "auth/email-already-in-use":
//       return new Error(
//         "An account already exists with this email address.",
//       );

//     case "auth/weak-password":
//       return new Error(
//         "The password is too weak. Please choose a stronger password.",
//       );

//     case "auth/too-many-requests":
//       return new Error(
//         "Too many authentication attempts. Please try again later.",
//       );

//     case "auth/network-request-failed":
//       return new Error(
//         "Network error. Please check your internet connection.",
//       );

//     case "auth/requires-recent-login":
//       return new Error(
//         "Please sign in again before performing this action.",
//       );

//     case "auth/operation-not-allowed":
//       return new Error(
//         "This authentication method is not enabled in Firebase.",
//       );

//     default: {
//       const message =
//         typeof firebaseError?.message ===
//         "string"
//           ? firebaseError.message
//           : "Authentication failed.";

//       return new Error(message);
//     }
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Default Export                                                             */
// /* -------------------------------------------------------------------------- */

// export default {
//   signIn,
//   register,
//   resetPassword,
//   logout,
//   getCurrentFirebaseUser,
//   getCurrentAuthUser,
//   subscribeToAuthState,
//   onAuthChange,
//   getIdToken,
//   getIdTokenResult,
//   refreshIdToken,
//   isEmailVerified,
//   reloadCurrentUser,
// };

// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   getIdTokenResult,
//   User,
//   UserCredential,
// } from "firebase/auth";
// import { auth } from "./config";

// /** Canonical ERP roles from JUONE MSD Section 4 */
// export const ERP_ROLES = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ] as const;

// export type ERPAdminRole = (typeof ERP_ROLES)[number];

// export function isERPAdminRole(value: unknown): value is ERPAdminRole {
//   return (
//     typeof value === "string" &&
//     (ERP_ROLES as readonly string[]).includes(value)
//   );
// }

// export async function signInAdmin(
//   email: string,
//   password: string
// ): Promise<{
//   user: User;
//   role: ERPAdminRole;
// }> {
//   const credential: UserCredential = await signInWithEmailAndPassword(
//     auth,
//     email.trim(),
//     password
//   );

//   const tokenResult = await getIdTokenResult(credential.user, true);
//   const role = tokenResult.claims.role;

//   if (!isERPAdminRole(role)) {
//     await signOut(auth);
//     throw new Error(
//       "Access denied. This account does not have a valid JUERP administrator role."
//     );
//   }

//   return {
//     user: credential.user,
//     role,
//   };
// }

// export async function signOutAdmin(): Promise<void> {
//   await signOut(auth);
//   try {
//     sessionStorage.removeItem("juerp_session");
//   } catch {
//     // ignore storage errors
//   }
// }

// export async function resetAdminPassword(email: string): Promise<void> {
//   await sendPasswordResetEmail(auth, email.trim());
// }

// export function subscribeToAuth(
//   callback: (user: User | null) => void
// ): () => void {
//   return onAuthStateChanged(auth, callback);
// }

// export async function getCurrentAdminRole(
//   user: User
// ): Promise<ERPAdminRole | null> {
//   const tokenResult = await getIdTokenResult(user, true);
//   const role = tokenResult.claims.role;
//   return isERPAdminRole(role) ? role : null;
// }

// import {
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signOut,
//   sendPasswordResetEmail,
//   getIdTokenResult,
//   User,
//   UserCredential,
// } from "firebase/auth";
// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   limit,
//   query,
//   where,
// } from "firebase/firestore";
// import { auth, db } from "./config";

// /** Canonical ERP roles from JUONE MSD Section 4 */
// export const ERP_ROLES = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ] as const;

// export type ERPAdminRole = (typeof ERP_ROLES)[number];

// /** Map UI / legacy labels → canonical role codes */
// const ROLE_ALIASES: Record<string, ERPAdminRole> = {
//   SUPER_ADMIN: "SUPER_ADMIN",
//   STATE_ADMIN: "STATE_ADMIN",
//   DISTRICT_ADMIN: "DISTRICT_ADMIN",
//   TECHNICAL_ADMIN: "TECHNICAL_ADMIN",
//   "SUPER ADMIN": "SUPER_ADMIN",
//   "STATE ADMIN": "STATE_ADMIN",
//   "DISTRICT ADMIN": "DISTRICT_ADMIN",
//   "TECHNICAL ADMIN": "TECHNICAL_ADMIN",
// };

// export function isERPAdminRole(value: unknown): value is ERPAdminRole {
//   return (
//     typeof value === "string" &&
//     (ERP_ROLES as readonly string[]).includes(value)
//   );
// }

// /** Normalize claim / Firestore role strings to ERPAdminRole */
// export function normalizeERPAdminRole(value: unknown): ERPAdminRole | null {
//   if (typeof value !== "string") return null;

//   const trimmed = value.trim();
//   if (!trimmed) return null;

//   if (isERPAdminRole(trimmed)) return trimmed;

//   const upper = trimmed.toUpperCase().replace(/[\s-]+/g, "_");
//   if (isERPAdminRole(upper)) return upper;

//   const spaced = trimmed.toUpperCase().replace(/_/g, " ");
//   if (ROLE_ALIASES[spaced]) return ROLE_ALIASES[spaced];
//   if (ROLE_ALIASES[upper]) return ROLE_ALIASES[upper];

//   return null;
// }

// function isActiveAdminStatus(status: unknown): boolean {
//   if (status == null || status === "") return true;
//   if (typeof status !== "string") return false;
//   const s = status.trim().toUpperCase();
//   return s === "ACTIVE" || s === "ENABLED";
// }

// /**
//  * Resolve role from:
//  * 1) Firebase custom claims (preferred)
//  * 2) Firestore users/{uid}
//  * 3) Firestore users where email == user.email (registry created before Auth uid linked)
//  */
// export async function resolveAdminRole(
//   user: User
// ): Promise<ERPAdminRole | null> {
//   // 1) Custom claims
//   try {
//     const tokenResult = await getIdTokenResult(user, true);
//     const fromClaims = normalizeERPAdminRole(tokenResult.claims.role);
//     if (fromClaims) return fromClaims;
//   } catch (err) {
//     console.warn("JUERP: failed to read ID token claims", err);
//   }

//   // 2) users/{uid}
//   try {
//     const byUid = await getDoc(doc(db, "users", user.uid));
//     if (byUid.exists()) {
//       const data = byUid.data();
//       if (!isActiveAdminStatus(data.status ?? data.accountStatus)) {
//         return null;
//       }
//       const fromUid = normalizeERPAdminRole(
//         data.role ?? data.adminRole ?? data.erpRole
//       );
//       if (fromUid) return fromUid;
//     }
//   } catch (err) {
//     console.warn("JUERP: failed to read users/{uid}", err);
//   }

//   // 3) Lookup by email (admin registry row may use a different doc id)
//   const email = user.email?.trim().toLowerCase();
//   if (!email) return null;

//   try {
//     const q = query(
//       collection(db, "users"),
//       where("email", "==", email),
//       limit(5)
//     );
//     const snap = await getDocs(q);

//     for (const d of snap.docs) {
//       const data = d.data();
//       if (!isActiveAdminStatus(data.status ?? data.accountStatus)) {
//         continue;
//       }
//       const fromEmail = normalizeERPAdminRole(
//         data.role ?? data.adminRole ?? data.erpRole
//       );
//       if (fromEmail) return fromEmail;
//     }
//   } catch (err) {
//     // If email is not indexed / rules block, ignore and fail closed
//     console.warn("JUERP: failed to query users by email", err);
//   }

//   return null;
// }

// export async function signInAdmin(
//   email: string,
//   password: string
// ): Promise<{
//   user: User;
//   role: ERPAdminRole;
// }> {
//   const credential: UserCredential = await signInWithEmailAndPassword(
//     auth,
//     email.trim(),
//     password
//   );

//   const role = await resolveAdminRole(credential.user);

//   if (!role) {
//     await signOut(auth);
//     throw new Error(
//       "Access denied. This account does not have a valid JUERP administrator role. Ensure the user exists in Authentication and has role SUPER_ADMIN | STATE_ADMIN | DISTRICT_ADMIN | TECHNICAL_ADMIN in custom claims or Firestore users."
//     );
//   }

//   return {
//     user: credential.user,
//     role,
//   };
// }

// export async function signOutAdmin(): Promise<void> {
//   await signOut(auth);
//   try {
//     sessionStorage.removeItem("juerp_session");
//   } catch {
//     // ignore storage errors
//   }
// }

// export async function resetAdminPassword(email: string): Promise<void> {
//   await sendPasswordResetEmail(auth, email.trim());
// }

// export function subscribeToAuth(
//   callback: (user: User | null) => void
// ): () => void {
//   return onAuthStateChanged(auth, callback);
// }

// export async function getCurrentAdminRole(
//   user: User
// ): Promise<ERPAdminRole | null> {
//   return resolveAdminRole(user);
// }


import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  getIdToken as firebaseGetIdToken,
  getIdTokenResult as firebaseGetIdTokenResult,
  User,
  UserCredential,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "./config";

/** Re-export the Firebase User type so other modules can use it as AuthUser */
export type AuthUser = User;

/** Canonical ERP roles from JUONE MSD Section 4 */
export const ERP_ROLES = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
] as const;

export type ERPAdminRole = (typeof ERP_ROLES)[number];

/** Map UI / legacy labels → canonical role codes */
const ROLE_ALIASES: Record<string, ERPAdminRole> = {
  SUPER_ADMIN: "SUPER_ADMIN",
  STATE_ADMIN: "STATE_ADMIN",
  DISTRICT_ADMIN: "DISTRICT_ADMIN",
  TECHNICAL_ADMIN: "TECHNICAL_ADMIN",
  "SUPER ADMIN": "SUPER_ADMIN",
  "STATE ADMIN": "STATE_ADMIN",
  "DISTRICT ADMIN": "DISTRICT_ADMIN",
  "TECHNICAL ADMIN": "TECHNICAL_ADMIN",
};

export function isERPAdminRole(value: unknown): value is ERPAdminRole {
  return (
    typeof value === "string" &&
    (ERP_ROLES as readonly string[]).includes(value)
  );
}

/** Normalize claim / Firestore role strings to ERPAdminRole */
export function normalizeERPAdminRole(value: unknown): ERPAdminRole | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (isERPAdminRole(trimmed)) return trimmed;

  const upper = trimmed.toUpperCase().replace(/[\s-]+/g, "_");
  if (isERPAdminRole(upper)) return upper;

  const spaced = trimmed.toUpperCase().replace(/_/g, " ");
  if (ROLE_ALIASES[spaced]) return ROLE_ALIASES[spaced];
  if (ROLE_ALIASES[upper]) return ROLE_ALIASES[upper];

  return null;
}

function isActiveAdminStatus(status: unknown): boolean {
  if (status == null || status === "") return true;
  if (typeof status !== "string") return false;
  const s = status.trim().toUpperCase();
  return s === "ACTIVE" || s === "ENABLED";
}

/**
 * Resolve role from:
 * 1) Firebase custom claims (preferred)
 * 2) Firestore users/{uid}
 * 3) Firestore users where email == user.email
 */
export async function resolveAdminRole(
  user: User,
): Promise<ERPAdminRole | null> {
  // 1) Custom claims
  try {
    const tokenResult = await firebaseGetIdTokenResult(user, true);
    const fromClaims = normalizeERPAdminRole(tokenResult.claims.role);
    if (fromClaims) return fromClaims;
  } catch (err) {
    console.warn("JUERP: failed to read ID token claims", err);
  }

  // 2) users/{uid}
  try {
    const byUid = await getDoc(doc(db, "users", user.uid));
    if (byUid.exists()) {
      const data = byUid.data();
      if (!isActiveAdminStatus(data.status ?? data.accountStatus)) {
        return null;
      }
      const fromUid = normalizeERPAdminRole(
        data.role ?? data.adminRole ?? data.erpRole,
      );
      if (fromUid) return fromUid;
    }
  } catch (err) {
    console.warn("JUERP: failed to read users/{uid}", err);
  }

  // 3) Lookup by email
  const email = user.email?.trim().toLowerCase();
  if (!email) return null;

  try {
    const q = query(
      collection(db, "users"),
      where("email", "==", email),
      limit(5),
    );
    const snap = await getDocs(q);

    for (const d of snap.docs) {
      const data = d.data();
      if (!isActiveAdminStatus(data.status ?? data.accountStatus)) {
        continue;
      }
      const fromEmail = normalizeERPAdminRole(
        data.role ?? data.adminRole ?? data.erpRole,
      );
      if (fromEmail) return fromEmail;
    }
  } catch (err) {
    console.warn("JUERP: failed to query users by email", err);
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/* Public Auth Actions                                                        */
/* -------------------------------------------------------------------------- */

export async function signInAdmin(
  email: string,
  password: string,
): Promise<{
  user: User;
  role: ERPAdminRole;
}> {
  const credential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );

  const role = await resolveAdminRole(credential.user);

  if (!role) {
    await signOut(auth);
    throw new Error(
      "Access denied. This account does not have a valid JUERP administrator role. Ensure the user exists in Authentication and has role SUPER_ADMIN | STATE_ADMIN | DISTRICT_ADMIN | TECHNICAL_ADMIN in custom claims or Firestore users.",
    );
  }

  return {
    user: credential.user,
    role,
  };
}

export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
  try {
    sessionStorage.removeItem("juerp_session");
  } catch {
    // ignore storage errors
  }
}

/** Alias used by authStore */
export async function logout(): Promise<void> {
  return signOutAdmin();
}

export async function resetAdminPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email.trim());
}

/* -------------------------------------------------------------------------- */
/* Token Helpers (required by authStore)                                      */
/* -------------------------------------------------------------------------- */

export async function getIdToken(
  user: User,
  forceRefresh = false,
): Promise<string> {
  return firebaseGetIdToken(user, forceRefresh);
}

export async function getIdTokenResult(
  user: User,
  forceRefresh = false,
) {
  return firebaseGetIdTokenResult(user, forceRefresh);
}

/* -------------------------------------------------------------------------- */
/* Auth State Subscription                                                    */
/* -------------------------------------------------------------------------- */

export function subscribeToAuth(
  callback: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, callback);
}

/** Alias used by authStore */
export function subscribeToAuthState(
  callback: (user: User | null) => void,
): () => void {
  return onAuthStateChanged(auth, callback);
}

export async function getCurrentAdminRole(
  user: User,
): Promise<ERPAdminRole | null> {
  return resolveAdminRole(user);
}