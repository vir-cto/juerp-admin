// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type AdminRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN";

// export type AdminStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

// export type AdminUser = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: AdminRole;
//   status: AdminStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type CreateAdminInput = {
//   name: string;
//   email: string;
//   phone?: string;
//   role: AdminRole;
//   stateId?: string;
//   stateName?: string;
//   districtId?: string;
//   districtName?: string;
// };

// export type HierarchyOption = {
//   id: string;
//   name: string;
//   code?: string;
//   stateId?: string;
// };

// const ADMIN_ROLES: AdminRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// function str(v: unknown): string {
//   if (typeof v === "string") return v.trim();
//   if (typeof v === "number") return String(v);
//   return "";
// }

// function parseRole(v: unknown): AdminRole | null {
//   const s = str(v).toUpperCase();
//   return ADMIN_ROLES.includes(s as AdminRole) ? (s as AdminRole) : null;
// }

// function parseStatus(v: unknown): AdminStatus {
//   const s = str(v).toUpperCase();
//   if (s === "INACTIVE" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function dateLabel(v: unknown): string {
//   if (!v) return "—";
//   try {
//     if (typeof v === "object" && v !== null && "toDate" in v) {
//       const d = (v as { toDate: () => Date }).toDate();
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//     if (typeof v === "string" || typeof v === "number") {
//       const d = new Date(v);
//       if (!Number.isNaN(d.getTime())) {
//         return d.toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//       }
//     }
//   } catch {
//     /* ignore */
//   }
//   return "—";
// }

// function mapAdmin(
//   raw: Record<string, unknown> & { id: string }
// ): AdminUser | null {
//   const role =
//     parseRole(raw.role) ||
//     parseRole(raw.roleId) ||
//     parseRole(raw.userRole) ||
//     parseRole(raw.adminRole);

//   if (!role) return null;

//   const email = str(raw.email).toLowerCase();
//   const name =
//     str(raw.name) ||
//     str(raw.displayName) ||
//     str(raw.fullName) ||
//     email ||
//     raw.id;

//   return {
//     id: raw.id,
//     name,
//     email,
//     phone: str(raw.phone) || str(raw.mobile) || "",
//     role,
//     status: parseStatus(raw.status),
//     stateId: str(raw.stateId),
//     stateName: str(raw.stateName),
//     districtId: str(raw.districtId),
//     districtName: str(raw.districtName),
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt),
//   };
// }

// function slugId(email: string, role: AdminRole): string {
//   const base = email
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-|-$/g, "")
//     .slice(0, 40);
//   const suffix = Date.now().toString(36).slice(-4);
//   return `admin-${role.toLowerCase().replace(/_/g, "-")}-${base || "user"}-${suffix}`;
// }

// export function useAdminUsers(pollMs = 45000) {
//   const [admins, setAdmins] = useState<AdminUser[]>([]);
//   const [states, setStates] = useState<HierarchyOption[]>([]);
//   const [districts, setDistricts] = useState<HierarchyOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setAdmins([]);
//       setStates([]);
//       setDistricts([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const [userDocs, stateDocs, districtDocs] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.USERS,
//           [],
//           undefined,
//           2000
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.STATES,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.DISTRICTS,
//           [],
//           undefined,
//           2000
//         ),
//       ]);

//       const mapped = userDocs
//         .map((d) => mapAdmin(d as Record<string, unknown> & { id: string }))
//         .filter((a): a is AdminUser => a !== null)
//         .sort((a, b) => a.name.localeCompare(b.name));

//       setAdmins(mapped);

//       setStates(
//         stateDocs.map((s) => ({
//           id: s.id,
//           name: str(s.name) || str(s.stateName) || s.id,
//           code: str(s.code) || str(s.stateCode),
//         }))
//       );

//       setDistricts(
//         districtDocs.map((d) => ({
//           id: d.id,
//           name: str(d.name) || str(d.districtName) || d.id,
//           code: str(d.code),
//           stateId: str(d.stateId),
//         }))
//       );
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load admin users."
//       );
//       setAdmins([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     if (!pollMs || pollMs <= 0 || isFirestoreDemoMode) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   const createAdmin = useCallback(
//     async (input: CreateAdminInput) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Creates are disabled in demo mode.");
//       }

//       const name = input.name.trim();
//       const email = input.email.trim().toLowerCase();
//       const role = input.role;

//       if (!name) throw new Error("Name is required.");
//       if (!email || !email.includes("@")) {
//         throw new Error("A valid email is required.");
//       }

//       if (role === "STATE_ADMIN" && !input.stateId) {
//         throw new Error("State is required for State Admin.");
//       }
//       if (role === "DISTRICT_ADMIN") {
//         if (!input.stateId) throw new Error("State is required for District Admin.");
//         if (!input.districtId) {
//           throw new Error("District is required for District Admin.");
//         }
//       }

//       const existing = admins.find((a) => a.email === email);
//       if (existing) {
//         throw new Error("An admin with this email already exists.");
//       }

//       setSaving(true);
//       try {
//         const documentId = slugId(email, role);

//         const payload: Record<string, unknown> = {
//           name,
//           email,
//           phone: input.phone?.trim() || "",
//           role,
//           status: "ACTIVE",
//           userType: "ADMIN",
//           isAdmin: true,
//           stateId: input.stateId || "",
//           stateName: input.stateName || "",
//           districtId: input.districtId || "",
//           districtName: input.districtName || "",
//         };

//         await createDocumentWithId(
//           FIRESTORE_COLLECTIONS.USERS,
//           documentId,
//           payload
//         );

//         await load();
//         return documentId;
//       } finally {
//         setSaving(false);
//       }
//     },
//     [admins, load]
//   );

//   const updateAdminStatus = useCallback(
//     async (adminId: string, status: AdminStatus) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Updates are disabled in demo mode.");
//       }
//       setSaving(true);
//       try {
//         await updateDocument(FIRESTORE_COLLECTIONS.USERS, adminId, {
//           status,
//         });
//         await load();
//       } finally {
//         setSaving(false);
//       }
//     },
//     [load]
//   );

//   const summary = useMemo(
//     () => ({
//       total: admins.length,
//       active: admins.filter((a) => a.status === "ACTIVE").length,
//       superAdmins: admins.filter((a) => a.role === "SUPER_ADMIN").length,
//       stateAdmins: admins.filter((a) => a.role === "STATE_ADMIN").length,
//       districtAdmins: admins.filter((a) => a.role === "DISTRICT_ADMIN").length,
//       technicalAdmins: admins.filter((a) => a.role === "TECHNICAL_ADMIN").length,
//     }),
//     [admins]
//   );

//   return {
//     admins,
//     states,
//     districts,
//     summary,
//     loading,
//     saving,
//     error,
//     refresh: load,
//     createAdmin,
//     updateAdminStatus,
//     isDemoMode: isFirestoreDemoMode,
//   };
// }

// export default useAdminUsers;



// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import { auth } from "@/lib/firebase/config";

// export type AdminRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN";

// export type AdminStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

// export type AdminUser = {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   role: AdminRole;
//   status: AdminStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   createdAt: string;
//   updatedAt: string;
// };

// export type CreateAdminInput = {
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   role: AdminRole;
//   stateId?: string;
//   stateName?: string;
//   districtId?: string;
//   districtName?: string;
// };

// export type HierarchyOption = {
//   id: string;
//   name: string;
//   code?: string;
//   stateId?: string;
// };

// const ADMIN_ROLES: AdminRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// function str(v: unknown): string {
//   if (typeof v === "string") return v.trim();
//   if (typeof v === "number") return String(v);
//   return "";
// }

// function parseRole(v: unknown): AdminRole | null {
//   const s = str(v).toUpperCase();
//   return ADMIN_ROLES.includes(s as AdminRole) ? (s as AdminRole) : null;
// }

// function parseStatus(v: unknown): AdminStatus {
//   const s = str(v).toUpperCase();
//   if (s === "INACTIVE" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function dateLabel(v: unknown): string {
//   if (!v) return "—";
//   try {
//     if (typeof v === "object" && v !== null && "toDate" in v) {
//       const d = (v as { toDate: () => Date }).toDate();
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//     if (typeof v === "string" || typeof v === "number") {
//       const d = new Date(v);
//       if (!Number.isNaN(d.getTime())) {
//         return d.toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//       }
//     }
//   } catch {
//     /* ignore */
//   }
//   return "—";
// }

// function mapAdmin(
//   raw: Record<string, unknown> & { id: string }
// ): AdminUser | null {
//   const role =
//     parseRole(raw.role) ||
//     parseRole(raw.roleId) ||
//     parseRole(raw.userRole) ||
//     parseRole(raw.adminRole);

//   if (!role) return null;

//   const email = str(raw.email).toLowerCase();
//   const name =
//     str(raw.name) ||
//     str(raw.displayName) ||
//     str(raw.fullName) ||
//     email ||
//     raw.id;

//   return {
//     id: raw.id,
//     name,
//     email,
//     phone: str(raw.phone) || str(raw.mobile) || "",
//     role,
//     status: parseStatus(raw.status),
//     stateId: str(raw.stateId),
//     stateName: str(raw.stateName),
//     districtId: str(raw.districtId),
//     districtName: str(raw.districtName),
//     createdAt: dateLabel(raw.createdAt),
//     updatedAt: dateLabel(raw.updatedAt),
//   };
// }

// export function useAdminUsers(pollMs = 45000) {
//   const [admins, setAdmins] = useState<AdminUser[]>([]);
//   const [states, setStates] = useState<HierarchyOption[]>([]);
//   const [districts, setDistricts] = useState<HierarchyOption[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setAdmins([]);
//       setStates([]);
//       setDistricts([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const [userDocs, stateDocs, districtDocs] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.USERS,
//           [],
//           undefined,
//           2000
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.STATES,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.DISTRICTS,
//           [],
//           undefined,
//           2000
//         ),
//       ]);

//       const mapped = userDocs
//         .map((d) => mapAdmin(d as Record<string, unknown> & { id: string }))
//         .filter((a): a is AdminUser => a !== null)
//         .sort((a, b) => a.name.localeCompare(b.name));

//       setAdmins(mapped);

//       setStates(
//         stateDocs.map((s) => ({
//           id: s.id,
//           name: str(s.name) || str(s.stateName) || s.id,
//           code: str(s.code) || str(s.stateCode),
//         }))
//       );

//       setDistricts(
//         districtDocs.map((d) => ({
//           id: d.id,
//           name: str(d.name) || str(d.districtName) || d.id,
//           code: str(d.code),
//           stateId: str(d.stateId),
//         }))
//       );
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load admin users."
//       );
//       setAdmins([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     if (!pollMs || pollMs <= 0 || isFirestoreDemoMode) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   const createAdmin = useCallback(
//     async (input: CreateAdminInput) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Creates are disabled in demo mode.");
//       }

//       const name = input.name.trim();
//       const email = input.email.trim().toLowerCase();
//       const password = input.password;
//       const role = input.role;

//       if (!name) throw new Error("Name is required.");
//       if (!email || !email.includes("@")) {
//         throw new Error("A valid email is required.");
//       }
//       if (!password || password.length < 8) {
//         throw new Error("Password must be at least 8 characters.");
//       }
//       if (role === "STATE_ADMIN" && !input.stateId) {
//         throw new Error("State is required for State Admin.");
//       }
//       if (role === "DISTRICT_ADMIN") {
//         if (!input.stateId) throw new Error("State is required for District Admin.");
//         if (!input.districtId) {
//           throw new Error("District is required for District Admin.");
//         }
//       }

//       const existing = admins.find((a) => a.email === email);
//       if (existing) {
//         throw new Error("An admin with this email already exists.");
//       }

//       const currentUser = auth.currentUser;
//       if (!currentUser) {
//         throw new Error("You must be signed in to create an admin.");
//       }

//       setSaving(true);
//       try {
//         const idToken = await currentUser.getIdToken(true);

//         const response = await fetch("/api/admin/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${idToken}`,
//           },
//           body: JSON.stringify({
//             name,
//             email,
//             password,
//             phone: input.phone?.trim() || "",
//             role,
//             stateId: input.stateId || "",
//             stateName: input.stateName || "",
//             districtId: input.districtId || "",
//             districtName: input.districtName || "",
//             correlationId: `admin-create-${Date.now().toString(36)}`,
//           }),
//         });

//         const result = (await response.json()) as {
//           success?: boolean;
//           message?: string;
//           data?: { uid?: string };
//         };

//         if (!response.ok || !result.success) {
//           throw new Error(result.message || "Unable to create admin.");
//         }

//         await load();
//         return result.data?.uid || email;
//       } finally {
//         setSaving(false);
//       }
//     },
//     [admins, load]
//   );

//   const updateAdminStatus = useCallback(
//     async (adminId: string, status: AdminStatus) => {
//       if (isFirestoreDemoMode) {
//         throw new Error("Updates are disabled in demo mode.");
//       }
//       setSaving(true);
//       try {
//         await updateDocument(FIRESTORE_COLLECTIONS.USERS, adminId, {
//           status,
//         });
//         await load();
//       } finally {
//         setSaving(false);
//       }
//     },
//     [load]
//   );

//   const summary = useMemo(
//     () => ({
//       total: admins.length,
//       active: admins.filter((a) => a.status === "ACTIVE").length,
//       superAdmins: admins.filter((a) => a.role === "SUPER_ADMIN").length,
//       stateAdmins: admins.filter((a) => a.role === "STATE_ADMIN").length,
//       districtAdmins: admins.filter((a) => a.role === "DISTRICT_ADMIN").length,
//       technicalAdmins: admins.filter((a) => a.role === "TECHNICAL_ADMIN").length,
//     }),
//     [admins]
//   );

//   return {
//     admins,
//     states,
//     districts,
//     summary,
//     loading,
//     saving,
//     error,
//     refresh: load,
//     createAdmin,
//     updateAdminStatus,
//     isDemoMode: isFirestoreDemoMode,
//   };
// }

// export default useAdminUsers;


"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  FIRESTORE_COLLECTIONS,
  createDocumentWithId,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";

export type AdminRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

export type AdminStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  status: AdminStatus;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  updatedAt: string;
};

export type CreateAdminInput = {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: AdminRole;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
};

export type HierarchyOption = { id: string; name: string; stateId?: string };

const ADMIN_ROLES: AdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
];

function str(value: unknown, fallback = ""): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function timestampLabel(value: unknown): string {
  let ms = 0;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      ms = (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      ms = 0;
    }
  } else if (value instanceof Date) {
    ms = value.getTime();
  } else if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) ms = d.getTime();
  }
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function asRole(value: unknown): AdminRole | null {
  const s = String(value ?? "").toUpperCase();
  return ADMIN_ROLES.includes(s as AdminRole) ? (s as AdminRole) : null;
}

function asStatus(value: unknown): AdminStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "SUSPENDED") return s;
  return "ACTIVE";
}

function mapAdmin(
  raw: Record<string, unknown> & { id: string }
): AdminUser | null {
  const role = asRole(raw.role);
  if (!role) return null;
  return {
    id: raw.id,
    name: str(raw.name ?? raw.displayName ?? raw.fullName, "Admin"),
    email: str(raw.email),
    phone: str(raw.phone ?? raw.phoneNumber),
    role,
    status: asStatus(raw.status ?? raw.accountStatus),
    stateId: str(raw.stateId),
    stateName: str(raw.stateName),
    districtId: str(raw.districtId),
    districtName: str(raw.districtName),
    updatedAt: timestampLabel(raw.updatedAt ?? raw.createdAt),
  };
}

export function useAdminUsers(pollMs = 30000) {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [states, setStates] = useState<HierarchyOption[]>([]);
  const [districts, setDistricts] = useState<HierarchyOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setAdmins([]);
      setStates([]);
      setDistricts([]);
      setLoading(false);
      return;
    }

    try {
      const [userDocs, stateDocs, districtDocs] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.USERS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.STATES,
          [],
          undefined,
          200
        ).catch(() => []),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.DISTRICTS,
          [],
          undefined,
          500
        ).catch(() => []),
      ]);

      const mapped = userDocs
        .map(mapAdmin)
        .filter((a): a is AdminUser => a !== null);

      setAdmins(mapped);
      setStates(
        stateDocs.map((s) => ({
          id: str(s.stateId ?? s.id, s.id),
          name: str(s.stateName ?? s.name, s.id),
        }))
      );
      setDistricts(
        districtDocs.map((d) => ({
          id: str(d.districtId ?? d.id, d.id),
          name: str(d.districtName ?? d.name, d.id),
          stateId: str(d.stateId),
        }))
      );
    } catch (err) {
      console.error("useAdminUsers:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load admin users from Firestore."
      );
      setAdmins([]);
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

  const summary = useMemo(
    () => ({
      total: admins.length,
      active: admins.filter((a) => a.status === "ACTIVE").length,
      superAdmins: admins.filter((a) => a.role === "SUPER_ADMIN").length,
      stateAdmins: admins.filter((a) => a.role === "STATE_ADMIN").length,
      districtAdmins: admins.filter((a) => a.role === "DISTRICT_ADMIN").length,
      technicalAdmins: admins.filter((a) => a.role === "TECHNICAL_ADMIN")
        .length,
    }),
    [admins]
  );

  const createAdmin = useCallback(
    async (input: CreateAdminInput): Promise<string> => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes disabled in demo mode.");
      }

      setSaving(true);
      try {
        const auth = getAuth();
        const current = auth.currentUser;
        if (!current) throw new Error("You must be signed in as Super Admin.");

        // Snapshot current session (restore after create — client Auth limitation)
        const currentEmail = current.email;
        // Password restore is not available from client; production must use Admin SDK.
        // We still create Auth user + Firestore profile. Claims need set-super-admin style script or CF.

        const cred = await createUserWithEmailAndPassword(
          auth,
          input.email.trim(),
          input.password
        );
        const uid = cred.user.uid;

        const profile = {
          name: input.name.trim(),
          displayName: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone.trim(),
          role: input.role,
          status: "ACTIVE",
          accountStatus: "ACTIVE",
          stateId: input.stateId || null,
          stateName: input.stateName || null,
          districtId: input.districtId || null,
          districtName: input.districtName || null,
          isAdmin: true,
        };

        await createDocumentWithId(
          FIRESTORE_COLLECTIONS.USERS,
          uid,
          profile
        );

        // Optional audit log
        try {
          await createDocumentWithId(
            FIRESTORE_COLLECTIONS.AUDIT_LOGS,
            `admin_create_${uid}_${Date.now()}`,
            {
              action: "ADMIN_USER_CREATED",
              category: "RBAC",
              status: "SUCCESS",
              actor: currentEmail || current.uid,
              actorRole: "SUPER_ADMIN",
              target: uid,
              correlationId: `admin-create-${uid}`,
              createdAt: new Date().toISOString(),
            }
          );
        } catch {
          // non-blocking
        }

        // NOTE: Browser is now signed in as the NEW user.
        // Sign out and tell operator to re-login as Super Admin, OR use Cloud Function.
        await auth.signOut();

        await load();
        return uid;
      } finally {
        setSaving(false);
      }
    },
    [load]
  );

  const updateAdminStatus = useCallback(
    async (adminId: string, status: AdminStatus) => {
      if (isFirestoreDemoMode) {
        throw new Error("Writes disabled in demo mode.");
      }
      setSaving(true);
      try {
        await updateDocument(FIRESTORE_COLLECTIONS.USERS, adminId, {
          status,
          accountStatus: status,
        });
        await load();
      } finally {
        setSaving(false);
      }
    },
    [load]
  );

  return {
    admins,
    states,
    districts,
    summary,
    loading,
    saving,
    error,
    refresh: load,
    createAdmin,
    updateAdminStatus,
    isDemoMode: isFirestoreDemoMode,
  };
}

export default useAdminUsers;