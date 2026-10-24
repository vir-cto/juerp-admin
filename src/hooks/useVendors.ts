// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type VendorStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// export type VerificationStatus =
//   | "DRAFT"
//   | "SUBMITTED"
//   | "PENDING"
//   | "ACTIVE"
//   | "REJECTED";

// export type VendorModule =
//   | "FOOD"
//   | "MART"
//   | "PHARMACY"
//   | "SHOPPING"
//   | "STAY"
//   | "HOME_SERVICES"
//   | string;

// export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED" | string;

// export type VendorDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: DocumentStatus;
//   uploadedAt: string;
// };

// export type VendorModuleInfo = {
//   moduleId: VendorModule;
//   status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
//   joinedAt: string;
// };

// export type Vendor = {
//   vendorId: string;
//   userId: string;
//   businessName: string;
//   ownerName: string;
//   phone: string;
//   email: string;
//   status: VendorStatus;
//   verificationStatus: VerificationStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
//   documents: VendorDocument[];
//   gstNumber: string;
//   panNumber: string;
//   businessType: string;
//   bankAccountLast4: string;
//   ifscCode: string;
// };

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function asVendorStatus(value: unknown): VendorStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function asVerification(value: unknown): VerificationStatus {
//   const s = String(value ?? "PENDING").toUpperCase();
//   if (
//     s === "DRAFT" ||
//     s === "SUBMITTED" ||
//     s === "PENDING" ||
//     s === "ACTIVE" ||
//     s === "REJECTED"
//   ) {
//     return s;
//   }
//   if (s === "VERIFIED" || s === "APPROVED") return "ACTIVE";
//   return "PENDING";
// }

// function normalizeModule(value: unknown): VendorModule {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, VendorModule> = {
//     FOOD: "FOOD",
//     JUCART: "FOOD",
//     MART: "MART",
//     PHARMACY: "PHARMACY",
//     SHOPPING: "SHOPPING",
//     JUSHOPPING: "SHOPPING",
//     STAY: "STAY",
//     JUSTAY: "STAY",
//     HOME_SERVICES: "HOME_SERVICES",
//     HOMESERVICES: "HOME_SERVICES",
//     JUHOME: "HOME_SERVICES",
//   };
//   return map[s] ?? (s || "FOOD");
// }

// function parseModules(raw: Record<string, unknown>): {
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
// } {
//   const modules: VendorModule[] = [];
//   const moduleDetails: VendorModuleInfo[] = [];

//   const src =
//     raw.modules ??
//     raw.enabledModules ??
//     raw.vendorModules ??
//     raw.moduleIds;

//   if (Array.isArray(src)) {
//     for (const item of src) {
//       if (typeof item === "string") {
//         const m = normalizeModule(item);
//         modules.push(m);
//         moduleDetails.push({
//           moduleId: m,
//           status: "ACTIVE",
//           joinedAt: "—",
//         });
//       } else if (item && typeof item === "object") {
//         const obj = item as Record<string, unknown>;
//         const m = normalizeModule(obj.moduleId ?? obj.module ?? obj.id);
//         modules.push(m);
//         moduleDetails.push({
//           moduleId: m,
//           status: String(obj.status ?? "ACTIVE").toUpperCase(),
//           joinedAt: timestampLabel(obj.joinedAt ?? obj.createdAt),
//         });
//       }
//     }
//   } else if (typeof src === "string" && src.trim()) {
//     const m = normalizeModule(src);
//     modules.push(m);
//     moduleDetails.push({ moduleId: m, status: "ACTIVE", joinedAt: "—" });
//   }

//   return { modules, moduleDetails };
// }

// function parseDocuments(raw: Record<string, unknown>): VendorDocument[] {
//   const src = raw.documents ?? raw.kycDocuments ?? raw.docs;
//   if (!Array.isArray(src)) return [];

//   return src.map((item, index) => {
//     const obj = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(obj.documentId ?? obj.id, `DOC-${index + 1}`),
//       documentType: str(obj.documentType ?? obj.type, "Document"),
//       documentNumber: str(obj.documentNumber ?? obj.number, "—"),
//       status: str(obj.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(obj.uploadedAt ?? obj.createdAt),
//     };
//   });
// }

// function mapVendor(
//   raw: Record<string, unknown> & { id: string },
//   orderStats?: { total: number; completed: number; cancelled: number }
// ): Vendor {
//   const { modules, moduleDetails } = parseModules(raw);
//   const documents = parseDocuments(raw);

//   const bank =
//     raw.bankAccountLast4 ??
//     raw.bankLast4 ??
//     (typeof raw.bankAccountNumber === "string"
//       ? String(raw.bankAccountNumber).slice(-4)
//       : "");

//   return {
//     vendorId: str(raw.vendorId ?? raw.id, raw.id),
//     userId: str(raw.userId ?? raw.ownerUid ?? raw.uid, "—"),
//     businessName: str(
//       raw.businessName ?? raw.shopName ?? raw.name,
//       "Vendor"
//     ),
//     ownerName: str(
//       raw.ownerName ?? raw.ownerDisplayName ?? raw.contactName,
//       "—"
//     ),
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asVendorStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus ?? raw.verification
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     totalOrders: orderStats?.total ?? num(raw.totalOrders),
//     completedOrders: orderStats?.completed ?? num(raw.completedOrders),
//     cancelledOrders: orderStats?.cancelled ?? num(raw.cancelledOrders),
//     modules,
//     moduleDetails,
//     documents,
//     gstNumber: str(raw.gstNumber ?? raw.gstin, "—"),
//     panNumber: str(raw.panNumber ?? raw.pan, "—"),
//     businessType: str(raw.businessType ?? raw.category, "—"),
//     bankAccountLast4: str(bank, "—"),
//     ifscCode: str(raw.ifscCode ?? raw.ifsc, "—"),
//   };
// }

// export function useVendors(pollMs = 20000) {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendors([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [vendorDocs, orders] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ORDERS,
//           [],
//           undefined,
//           500
//         ).catch(() => [] as Array<Record<string, unknown> & { id: string }>),
//       ]);

//       const statsByVendor = new Map<
//         string,
//         { total: number; completed: number; cancelled: number }
//       >();

//       for (const o of orders) {
//         const vid = str(o.vendorId, "");
//         if (!vid || vid === "—") continue;
//         const cur = statsByVendor.get(vid) ?? {
//           total: 0,
//           completed: 0,
//           cancelled: 0,
//         };
//         cur.total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) {
//           cur.completed += 1;
//         }
//         if (["CANCELLED", "REJECTED"].includes(st)) {
//           cur.cancelled += 1;
//         }
//         statsByVendor.set(vid, cur);
//       }

//       const mapped = vendorDocs.map((v) => {
//         const id = str(v.vendorId ?? v.id, v.id);
//         return mapVendor(v, statsByVendor.get(id) ?? statsByVendor.get(v.id));
//       });

//       setVendors(mapped);
//     } catch (err) {
//       console.error("useVendors error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendors from Firestore."
//       );
//       setVendors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { vendors, loading, error, demoMode, refresh: load };
// }

// export function useVendor(vendorId: string | undefined) {
//   const [vendor, setVendor] = useState<Vendor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!vendorId) {
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           vendorId
//         )) ?? null;

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find(
//             (v) =>
//               v.id === vendorId || str(v.vendorId, "") === vendorId
//           ) ?? null;
//       }

//       if (!doc) {
//         setVendor(null);
//         setLoading(false);
//         return;
//       }

//       const orders = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.ORDERS,
//         [],
//         undefined,
//         500
//       ).catch(() => [] as Array<Record<string, unknown> & { id: string }>);

//       const vid = str(doc.vendorId ?? doc.id, doc.id);
//       let total = 0;
//       let completed = 0;
//       let cancelled = 0;

//       for (const o of orders) {
//         if (str(o.vendorId, "") !== vid && str(o.vendorId, "") !== doc.id) {
//           continue;
//         }
//         total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cancelled += 1;
//       }

//       // Optional: vendor_documents collection
//       let documents: VendorDocument[] = parseDocuments(doc);
//       try {
//         const docs = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
//           [{ fieldPath: "vendorId", operator: "==", value: vid }],
//           undefined,
//           50
//         );
//         if (docs.length > 0) {
//           documents = docs.map((d, i) => ({
//             documentId: d.id,
//             documentType: str(d.documentType ?? d.type, "Document"),
//             documentNumber: str(d.documentNumber ?? d.number, "—"),
//             status: str(d.status, "PENDING").toUpperCase(),
//             uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//           }));
//         }
//       } catch {
//         // index may be missing — keep embedded docs
//       }

//       const mapped = mapVendor(doc, { total, completed, cancelled });
//       mapped.documents = documents;
//       setVendor(mapped);
//     } catch (err) {
//       console.error("useVendor error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendor from Firestore."
//       );
//       setVendor(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [vendorId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { vendor, loading, error, demoMode, refresh: load, setVendor };
// }

// export default useVendors;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type VendorStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// export type VerificationStatus =
//   | "DRAFT"
//   | "SUBMITTED"
//   | "PENDING"
//   | "ACTIVE"
//   | "REJECTED";

// export type VendorModule =
//   | "FOOD"
//   | "MART"
//   | "PHARMACY"
//   | "SHOPPING"
//   | "STAY"
//   | "HOME_SERVICES"
//   | string;

// export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED" | string;

// export type VendorDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: DocumentStatus;
//   uploadedAt: string;
// };

// export type VendorModuleInfo = {
//   moduleId: VendorModule;
//   status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
//   joinedAt: string;
// };

// export type Vendor = {
//   /** Firestore document id — always use this for updateDocument */
//   docId: string;
//   vendorId: string;
//   userId: string;
//   businessName: string;
//   ownerName: string;
//   phone: string;
//   email: string;
//   status: VendorStatus;
//   verificationStatus: VerificationStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
//   documents: VendorDocument[];
//   gstNumber: string;
//   panNumber: string;
//   businessType: string;
//   bankAccountLast4: string;
//   ifscCode: string;
// };

// /** Verification states that must keep the vendor account inactive */
// export const NON_ACTIVE_VERIFICATION: VerificationStatus[] = [
//   "DRAFT",
//   "SUBMITTED",
//   "PENDING",
//   "REJECTED",
// ];

// export function isVerificationBlockingActive(
//   verification: VerificationStatus
// ): boolean {
//   return NON_ACTIVE_VERIFICATION.includes(verification);
// }

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function asVendorStatus(value: unknown): VendorStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function asVerification(value: unknown): VerificationStatus {
//   const s = String(value ?? "PENDING").toUpperCase();
//   if (
//     s === "DRAFT" ||
//     s === "SUBMITTED" ||
//     s === "PENDING" ||
//     s === "ACTIVE" ||
//     s === "REJECTED"
//   ) {
//     return s;
//   }
//   if (s === "VERIFIED" || s === "APPROVED") return "ACTIVE";
//   return "PENDING";
// }

// function normalizeModule(value: unknown): VendorModule {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, VendorModule> = {
//     FOOD: "FOOD",
//     JUCART: "FOOD",
//     MART: "MART",
//     PHARMACY: "PHARMACY",
//     SHOPPING: "SHOPPING",
//     JUSHOPPING: "SHOPPING",
//     STAY: "STAY",
//     JUSTAY: "STAY",
//     HOME_SERVICES: "HOME_SERVICES",
//     HOMESERVICES: "HOME_SERVICES",
//     JUHOME: "HOME_SERVICES",
//   };
//   return map[s] ?? (s || "FOOD");
// }

// function parseModules(raw: Record<string, unknown>): {
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
// } {
//   const modules: VendorModule[] = [];
//   const moduleDetails: VendorModuleInfo[] = [];

//   const src =
//     raw.modules ??
//     raw.enabledModules ??
//     raw.vendorModules ??
//     raw.moduleIds;

//   if (Array.isArray(src)) {
//     for (const item of src) {
//       if (typeof item === "string") {
//         const m = normalizeModule(item);
//         modules.push(m);
//         moduleDetails.push({
//           moduleId: m,
//           status: "ACTIVE",
//           joinedAt: "—",
//         });
//       } else if (item && typeof item === "object") {
//         const obj = item as Record<string, unknown>;
//         const m = normalizeModule(obj.moduleId ?? obj.module ?? obj.id);
//         modules.push(m);
//         moduleDetails.push({
//           moduleId: m,
//           status: String(obj.status ?? "ACTIVE").toUpperCase(),
//           joinedAt: timestampLabel(obj.joinedAt ?? obj.createdAt),
//         });
//       }
//     }
//   } else if (typeof src === "string" && src.trim()) {
//     const m = normalizeModule(src);
//     modules.push(m);
//     moduleDetails.push({ moduleId: m, status: "ACTIVE", joinedAt: "—" });
//   }

//   return { modules, moduleDetails };
// }

// function parseDocuments(raw: Record<string, unknown>): VendorDocument[] {
//   const src = raw.documents ?? raw.kycDocuments ?? raw.docs;
//   if (!Array.isArray(src)) return [];

//   return src.map((item, index) => {
//     const obj = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(obj.documentId ?? obj.id, `DOC-${index + 1}`),
//       documentType: str(obj.documentType ?? obj.type, "Document"),
//       documentNumber: str(obj.documentNumber ?? obj.number, "—"),
//       status: str(obj.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(obj.uploadedAt ?? obj.createdAt),
//     };
//   });
// }

// function mapVendor(
//   raw: Record<string, unknown> & { id: string },
//   orderStats?: { total: number; completed: number; cancelled: number }
// ): Vendor {
//   const { modules, moduleDetails } = parseModules(raw);
//   const documents = parseDocuments(raw);

//   const bank =
//     raw.bankAccountLast4 ??
//     raw.bankLast4 ??
//     (typeof raw.bankAccountNumber === "string"
//       ? String(raw.bankAccountNumber).slice(-4)
//       : "");

//   const verificationStatus = asVerification(
//     raw.verificationStatus ?? raw.kycStatus ?? raw.verification
//   );

//   // Prefer accountStatus (common in JU vendor docs), then status
//   let status = asVendorStatus(raw.accountStatus ?? raw.status);

//   // Enforce: non-active verification → cannot be ACTIVE
//   if (isVerificationBlockingActive(verificationStatus) && status === "ACTIVE") {
//     status = "INACTIVE";
//   }

//   return {
//     docId: raw.id,
//     vendorId: str(raw.vendorId ?? raw.id, raw.id),
//     userId: str(raw.userId ?? raw.ownerUid ?? raw.uid, "—"),
//     businessName: str(
//       raw.businessName ?? raw.shopName ?? raw.name,
//       "Vendor"
//     ),
//     ownerName: str(
//       raw.ownerName ?? raw.ownerDisplayName ?? raw.contactName,
//       "—"
//     ),
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status,
//     verificationStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     totalOrders: orderStats?.total ?? num(raw.totalOrders),
//     completedOrders: orderStats?.completed ?? num(raw.completedOrders),
//     cancelledOrders: orderStats?.cancelled ?? num(raw.cancelledOrders),
//     modules,
//     moduleDetails,
//     documents,
//     gstNumber: str(raw.gstNumber ?? raw.gstin, "—"),
//     panNumber: str(raw.panNumber ?? raw.pan, "—"),
//     businessType: str(raw.businessType ?? raw.category, "—"),
//     bankAccountLast4: str(bank, "—"),
//     ifscCode: str(raw.ifscCode ?? raw.ifsc, "—"),
//   };
// }

// export function useVendors(pollMs = 20000) {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendors([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [vendorDocs, orders] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ORDERS,
//           [],
//           undefined,
//           500
//         ).catch(() => [] as Array<Record<string, unknown> & { id: string }>),
//       ]);

//       const statsByVendor = new Map<
//         string,
//         { total: number; completed: number; cancelled: number }
//       >();

//       for (const o of orders) {
//         const vid = str(o.vendorId, "");
//         if (!vid || vid === "—") continue;
//         const cur = statsByVendor.get(vid) ?? {
//           total: 0,
//           completed: 0,
//           cancelled: 0,
//         };
//         cur.total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) {
//           cur.completed += 1;
//         }
//         if (["CANCELLED", "REJECTED"].includes(st)) {
//           cur.cancelled += 1;
//         }
//         statsByVendor.set(vid, cur);
//       }

//       const mapped = vendorDocs.map((v) => {
//         const id = str(v.vendorId ?? v.id, v.id);
//         return mapVendor(v, statsByVendor.get(id) ?? statsByVendor.get(v.id));
//       });

//       setVendors(mapped);
//     } catch (err) {
//       console.error("useVendors error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendors from Firestore."
//       );
//       setVendors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { vendors, loading, error, demoMode, refresh: load };
// }

// export function useVendor(vendorId: string | undefined) {
//   const [vendor, setVendor] = useState<Vendor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!vendorId) {
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           vendorId
//         )) ?? null;

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find(
//             (v) =>
//               v.id === vendorId || str(v.vendorId, "") === vendorId
//           ) ?? null;
//       }

//       if (!doc) {
//         setVendor(null);
//         setLoading(false);
//         return;
//       }

//       const orders = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.ORDERS,
//         [],
//         undefined,
//         500
//       ).catch(() => [] as Array<Record<string, unknown> & { id: string }>);

//       const vid = str(doc.vendorId ?? doc.id, doc.id);
//       let total = 0;
//       let completed = 0;
//       let cancelled = 0;

//       for (const o of orders) {
//         if (str(o.vendorId, "") !== vid && str(o.vendorId, "") !== doc.id) {
//           continue;
//         }
//         total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cancelled += 1;
//       }

//       let documents: VendorDocument[] = parseDocuments(doc);
//       try {
//         const docs = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
//           [{ fieldPath: "vendorId", operator: "==", value: vid }],
//           undefined,
//           50
//         );
//         if (docs.length > 0) {
//           documents = docs.map((d) => ({
//             documentId: d.id,
//             documentType: str(d.documentType ?? d.type, "Document"),
//             documentNumber: str(d.documentNumber ?? d.number, "—"),
//             status: str(d.status, "PENDING").toUpperCase(),
//             uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//           }));
//         }
//       } catch {
//         // keep embedded docs
//       }

//       const mapped = mapVendor(doc, { total, completed, cancelled });
//       mapped.documents = documents;
//       setVendor(mapped);
//     } catch (err) {
//       console.error("useVendor error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendor from Firestore."
//       );
//       setVendor(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [vendorId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { vendor, loading, error, demoMode, refresh: load, setVendor };
// }

// export default useVendors;


// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "SUSPENDED";

// export type VerificationStatus =
//   | "DRAFT"
//   | "SUBMITTED"
//   | "PENDING"
//   | "ACTIVE"
//   | "REJECTED";

// export type VendorModule =
//   | "FOOD"
//   | "MART"
//   | "PHARMACY"
//   | "SHOPPING"
//   | "STAY"
//   | "HOME_SERVICES"
//   | string;

// export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED" | string;

// export type VendorDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: DocumentStatus;
//   uploadedAt: string;
// };

// export type VendorModuleInfo = {
//   moduleId: VendorModule;
//   status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
//   joinedAt: string;
// };

// export type Vendor = {
//   docId: string;
//   vendorId: string;
//   userId: string;
//   businessName: string;
//   ownerName: string;
//   phone: string;
//   email: string;
//   status: VendorStatus;
//   verificationStatus: VerificationStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
//   documents: VendorDocument[];
//   gstNumber: string;
//   panNumber: string;
//   businessType: string;
//   bankAccountLast4: string;
//   ifscCode: string;
// };

// export type UseVendorsResult = {
//   vendors: Vendor[];
//   loading: boolean;
//   error: string | null;
//   demoMode: boolean;
//   refresh: () => Promise<void>;
// };

// export type UseVendorResult = {
//   vendor: Vendor | null;
//   loading: boolean;
//   error: string | null;
//   demoMode: boolean;
//   refresh: () => Promise<void>;
//   setVendor: React.Dispatch<React.SetStateAction<Vendor | null>>;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// export const NON_ACTIVE_VERIFICATION: VerificationStatus[] = [
//   "DRAFT",
//   "SUBMITTED",
//   "PENDING",
//   "REJECTED",
// ];

// export function isVerificationBlockingActive(
//   verification: VerificationStatus
// ): boolean {
//   return NON_ACTIVE_VERIFICATION.includes(verification);
// }

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function asVendorStatus(value: unknown): VendorStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function asVerification(value: unknown): VerificationStatus {
//   const s = String(value ?? "PENDING").toUpperCase();
//   if (
//     s === "DRAFT" ||
//     s === "SUBMITTED" ||
//     s === "PENDING" ||
//     s === "ACTIVE" ||
//     s === "REJECTED"
//   ) {
//     return s;
//   }
//   if (s === "VERIFIED" || s === "APPROVED") return "ACTIVE";
//   return "PENDING";
// }

// function normalizeModule(value: unknown): VendorModule {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, VendorModule> = {
//     FOOD: "FOOD",
//     JUCART: "FOOD",
//     MART: "MART",
//     PHARMACY: "PHARMACY",
//     SHOPPING: "SHOPPING",
//     JUSHOPPING: "SHOPPING",
//     STAY: "STAY",
//     JUSTAY: "STAY",
//     HOME_SERVICES: "HOME_SERVICES",
//     HOMESERVICES: "HOME_SERVICES",
//     JUHOME: "HOME_SERVICES",
//   };
//   return map[s] ?? (s || "FOOD");
// }

// function parseModules(raw: Record<string, unknown>): {
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
// } {
//   const modules: VendorModule[] = [];
//   const moduleDetails: VendorModuleInfo[] = [];
//   const src =
//     raw.modules ?? raw.enabledModules ?? raw.vendorModules ?? raw.moduleIds;

//   if (Array.isArray(src)) {
//     for (const item of src) {
//       if (typeof item === "string") {
//         const m = normalizeModule(item);
//         modules.push(m);
//         moduleDetails.push({ moduleId: m, status: "ACTIVE", joinedAt: "—" });
//       } else if (item && typeof item === "object") {
//         const obj = item as Record<string, unknown>;
//         const m = normalizeModule(obj.moduleId ?? obj.module ?? obj.id);
//         modules.push(m);
//         moduleDetails.push({
//           moduleId: m,
//           status: String(obj.status ?? "ACTIVE").toUpperCase(),
//           joinedAt: timestampLabel(obj.joinedAt ?? obj.createdAt),
//         });
//       }
//     }
//   } else if (typeof src === "string" && src.trim()) {
//     const m = normalizeModule(src);
//     modules.push(m);
//     moduleDetails.push({ moduleId: m, status: "ACTIVE", joinedAt: "—" });
//   }

//   return { modules, moduleDetails };
// }

// function parseDocuments(raw: Record<string, unknown>): VendorDocument[] {
//   const src = raw.documents ?? raw.kycDocuments ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, index) => {
//     const obj = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(obj.documentId ?? obj.id, `DOC-${index + 1}`),
//       documentType: str(obj.documentType ?? obj.type, "Document"),
//       documentNumber: str(obj.documentNumber ?? obj.number, "—"),
//       status: str(obj.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(obj.uploadedAt ?? obj.createdAt),
//     };
//   });
// }

// function mapVendor(
//   raw: Record<string, unknown> & { id: string },
//   orderStats?: { total: number; completed: number; cancelled: number }
// ): Vendor {
//   const { modules, moduleDetails } = parseModules(raw);
//   const documents = parseDocuments(raw);

//   const bank =
//     raw.bankAccountLast4 ??
//     raw.bankLast4 ??
//     (typeof raw.bankAccountNumber === "string"
//       ? String(raw.bankAccountNumber).slice(-4)
//       : "");

//   const verificationStatus = asVerification(
//     raw.verificationStatus ?? raw.kycStatus ?? raw.verification
//   );

//   let status = asVendorStatus(raw.accountStatus ?? raw.status);
//   if (isVerificationBlockingActive(verificationStatus) && status === "ACTIVE") {
//     status = "INACTIVE";
//   }

//   return {
//     docId: raw.id,
//     vendorId: str(raw.vendorId ?? raw.id, raw.id),
//     userId: str(raw.userId ?? raw.ownerUid ?? raw.uid, "—"),
//     businessName: str(raw.businessName ?? raw.shopName ?? raw.name, "Vendor"),
//     ownerName: str(
//       raw.ownerName ?? raw.ownerDisplayName ?? raw.contactName,
//       "—"
//     ),
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status,
//     verificationStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     totalOrders: orderStats?.total ?? num(raw.totalOrders),
//     completedOrders: orderStats?.completed ?? num(raw.completedOrders),
//     cancelledOrders: orderStats?.cancelled ?? num(raw.cancelledOrders),
//     modules,
//     moduleDetails,
//     documents,
//     gstNumber: str(raw.gstNumber ?? raw.gstin, "—"),
//     panNumber: str(raw.panNumber ?? raw.pan, "—"),
//     businessType: str(raw.businessType ?? raw.category, "—"),
//     bankAccountLast4: str(bank, "—"),
//     ifscCode: str(raw.ifscCode ?? raw.ifsc, "—"),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendors                                                                 */
// /* -------------------------------------------------------------------------- */

// export function useVendors(pollMs = 20000): UseVendorsResult {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendors([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [vendorDocs, orders] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ORDERS,
//           [],
//           undefined,
//           500
//         ).catch(() => [] as Array<Record<string, unknown> & { id: string }>),
//       ]);

//       const statsByVendor = new Map<
//         string,
//         { total: number; completed: number; cancelled: number }
//       >();

//       for (const o of orders) {
//         const vid = str(o.vendorId, "");
//         if (!vid || vid === "—") continue;
//         const cur = statsByVendor.get(vid) ?? {
//           total: 0,
//           completed: 0,
//           cancelled: 0,
//         };
//         cur.total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) cur.completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cur.cancelled += 1;
//         statsByVendor.set(vid, cur);
//       }

//       const mapped = vendorDocs.map((v) => {
//         const id = str(v.vendorId ?? v.id, v.id);
//         return mapVendor(v, statsByVendor.get(id) ?? statsByVendor.get(v.id));
//       });

//       setVendors(mapped);
//     } catch (err) {
//       console.error("useVendors error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendors from Firestore."
//       );
//       setVendors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { vendors, loading, error, demoMode, refresh: load };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendor                                                                  */
// /* -------------------------------------------------------------------------- */

// export function useVendor(vendorId: string | undefined): UseVendorResult {
//   const [vendor, setVendor] = useState<Vendor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!vendorId) {
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let docData =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           vendorId
//         )) ?? null;

//       if (!docData) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         );
//         docData =
//           all.find(
//             (v) => v.id === vendorId || str(v.vendorId, "") === vendorId
//           ) ?? null;
//       }

//       if (!docData) {
//         setVendor(null);
//         setLoading(false);
//         return;
//       }

//       const orders = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.ORDERS,
//         [],
//         undefined,
//         500
//       ).catch(() => [] as Array<Record<string, unknown> & { id: string }>);

//       const vid = str(docData.vendorId ?? docData.id, docData.id);
//       let total = 0;
//       let completed = 0;
//       let cancelled = 0;

//       for (const o of orders) {
//         if (str(o.vendorId, "") !== vid && str(o.vendorId, "") !== docData.id) {
//           continue;
//         }
//         total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cancelled += 1;
//       }

//       let documents: VendorDocument[] = parseDocuments(docData);
//       try {
//         const docs = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
//           [{ fieldPath: "vendorId", operator: "==", value: vid }],
//           undefined,
//           50
//         );
//         if (docs.length > 0) {
//           documents = docs.map((d) => ({
//             documentId: d.id,
//             documentType: str(d.documentType ?? d.type, "Document"),
//             documentNumber: str(d.documentNumber ?? d.number, "—"),
//             status: str(d.status, "PENDING").toUpperCase(),
//             uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//           }));
//         }
//       } catch {
//         // keep embedded
//       }

//       const mapped = mapVendor(docData, { total, completed, cancelled });
//       mapped.documents = documents;
//       setVendor(mapped);
//     } catch (err) {
//       console.error("useVendor error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendor from Firestore."
//       );
//       setVendor(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [vendorId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { vendor, loading, error, demoMode, refresh: load, setVendor };
// }

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// /* -------------------------------------------------------------------------- */
// /* Types                                                                      */
// /* -------------------------------------------------------------------------- */

// export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "SUSPENDED";

// export type VerificationStatus =
//   | "DRAFT"
//   | "SUBMITTED"
//   | "PENDING"
//   | "ACTIVE"
//   | "REJECTED";

// export type VendorModule =
//   | "FOOD"
//   | "MART"
//   | "PHARMACY"
//   | "SHOPPING"
//   | "STAY"
//   | "HOME_SERVICES"
//   | string;

// export type DocumentStatus = "PENDING" | "VERIFIED" | "REJECTED" | string;

// export type VendorDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: DocumentStatus;
//   uploadedAt: string;
// };

// export type VendorModuleInfo = {
//   moduleId: VendorModule;
//   status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
//   joinedAt: string;
// };

// export type Vendor = {
//   docId: string;
//   vendorId: string;
//   userId: string;
//   businessName: string;
//   ownerName: string;
//   phone: string;
//   email: string;
//   status: VendorStatus;
//   verificationStatus: VerificationStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
//   documents: VendorDocument[];
//   gstNumber: string;
//   panNumber: string;
//   businessType: string;
//   bankAccountLast4: string;
//   ifscCode: string;
// };

// export type UseVendorsResult = {
//   vendors: Vendor[];
//   loading: boolean;
//   error: string | null;
//   demoMode: boolean;
//   refresh: () => Promise<void>;
// };

// export type UseVendorResult = {
//   vendor: Vendor | null;
//   loading: boolean;
//   error: string | null;
//   demoMode: boolean;
//   refresh: () => Promise<void>;
//   setVendor: React.Dispatch<React.SetStateAction<Vendor | null>>;
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// export const NON_ACTIVE_VERIFICATION: VerificationStatus[] = [
//   "DRAFT",
//   "SUBMITTED",
//   "PENDING",
//   "REJECTED",
// ];

// export function isVerificationBlockingActive(
//   verification: VerificationStatus
// ): boolean {
//   return NON_ACTIVE_VERIFICATION.includes(verification);
// }

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number") return String(value);
//   return fallback;
// }

// function firstStr(
//   values: unknown[],
//   fallback = "—"
// ): string {
//   for (const value of values) {
//     const next = str(value, "");
//     if (next) return next;
//   }
//   return fallback;
// }

// function num(value: unknown): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string") {
//     const n = Number(value);
//     return Number.isFinite(n) ? n : 0;
//   }
//   return 0;
// }

// function timestampLabel(value: unknown): string {
//   let ms = 0;
//   if (value && typeof value === "object" && "toDate" in value) {
//     try {
//       ms = (value as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       ms = 0;
//     }
//   } else if (value instanceof Date) {
//     ms = value.getTime();
//   } else if (typeof value === "string" || typeof value === "number") {
//     const d = new Date(value);
//     if (!Number.isNaN(d.getTime())) ms = d.getTime();
//   }
//   if (!ms) return "—";
//   return new Date(ms).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function asVendorStatus(value: unknown): VendorStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function asVerification(value: unknown): VerificationStatus {
//   const s = String(value ?? "PENDING").toUpperCase();
//   if (
//     s === "DRAFT" ||
//     s === "SUBMITTED" ||
//     s === "PENDING" ||
//     s === "ACTIVE" ||
//     s === "REJECTED"
//   ) {
//     return s;
//   }
//   if (s === "VERIFIED" || s === "APPROVED") return "ACTIVE";
//   return "PENDING";
// }

// function normalizeModule(value: unknown): VendorModule {
//   const s = String(value ?? "")
//     .toUpperCase()
//     .replace(/\s+/g, "_");
//   const map: Record<string, VendorModule> = {
//     FOOD: "FOOD",
//     JUCART: "FOOD",
//     MART: "MART",
//     PHARMACY: "PHARMACY",
//     SHOPPING: "SHOPPING",
//     JUSHOPPING: "SHOPPING",
//     STAY: "STAY",
//     JUSTAY: "STAY",
//     HOME_SERVICES: "HOME_SERVICES",
//     HOMESERVICES: "HOME_SERVICES",
//     JUHOME: "HOME_SERVICES",
//   };
//   return map[s] ?? (s || "FOOD");
// }

// /**
//  * JUVENDOR stores a single selectedModule / moduleId, not always a modules[].
//  * Also recover module from vendorId suffix: "..._FOOD".
//  */
// // function parseModules(raw: Record<string, unknown>): {
// //   modules: VendorModule[];
// //   moduleDetails: VendorModuleInfo[];
// // } {
// //   const modules: VendorModule[] = [];
// //   const moduleDetails: VendorModuleInfo[] = [];
// //   const seen = new Set<string>();

// //   const push = (value: unknown, status = "ACTIVE", joinedAt: unknown = null) => {
// //     const m = normalizeModule(value);
// //     if (!m || seen.has(String(m))) return;
// //     seen.add(String(m));
// //     modules.push(m);
// //     moduleDetails.push({
// //       moduleId: m,
// //       status: String(status ?? "ACTIVE").toUpperCase(),
// //       joinedAt: timestampLabel(joinedAt) === "—" ? "—" : timestampLabel(joinedAt),
// //     });
// //   };

// //   const src =
// //     raw.modules ??
// //     raw.enabledModules ??
// //     raw.vendorModules ??
// //     raw.moduleIds;

// //   if (Array.isArray(src)) {
// //     for (const item of src) {
// //       if (typeof item === "string") {
// //         push(item);
// //       } else if (item && typeof item === "object") {
// //         const obj = item as Record<string, unknown>;
// //         push(
// //           obj.moduleId ?? obj.module ?? obj.id,
// //           obj.status ?? "ACTIVE",
// //           obj.joinedAt ?? obj.createdAt
// //         );
// //       }
// //     }
// //   } else if (typeof src === "string" && src.trim()) {
// //     push(src);
// //   }

// //   // JUVENDOR primary fields
// //   if (modules.length === 0) {
// //     push(raw.selectedModule ?? raw.moduleId ?? raw.module ?? raw.vendorType);
// //   } else {
// //     // still register selectedModule if present and not already listed
// //     if (raw.selectedModule) push(raw.selectedModule);
// //     if (raw.moduleId) push(raw.moduleId);
// //   }

// //   // Fallback: vendorId suffix "..._FOOD"
// //   if (modules.length === 0) {
// //     const id = str(raw.vendorId ?? raw.id, "");
// //     const match = id.match(/_([A-Z_]+)$/i);
// //     if (match?.[1]) push(match[1]);
// //   }

// //   return { modules, moduleDetails };
// // }

// function parseModules(raw: Record<string, unknown>): {
//   modules: VendorModule[];
//   moduleDetails: VendorModuleInfo[];
// } {
//   const modules: VendorModule[] = [];
//   const moduleDetails: VendorModuleInfo[] = [];
//   const seen = new Set<string>();

//   const push = (
//     value: unknown,
//     statusValue: unknown = "ACTIVE",
//     joinedAt: unknown = null
//   ) => {
//     const m = normalizeModule(value);
//     if (!m || seen.has(String(m))) return;

//     seen.add(String(m));
//     modules.push(m);

//     const status = String(statusValue ?? "ACTIVE").toUpperCase() || "ACTIVE";

//     moduleDetails.push({
//       moduleId: m,
//       status,
//       joinedAt:
//         timestampLabel(joinedAt) === "—"
//           ? "—"
//           : timestampLabel(joinedAt),
//     });
//   };

//   const src =
//     raw.modules ??
//     raw.enabledModules ??
//     raw.vendorModules ??
//     raw.moduleIds;

//   if (Array.isArray(src)) {
//     for (const item of src) {
//       if (typeof item === "string") {
//         push(item);
//       } else if (item && typeof item === "object") {
//         const obj = item as Record<string, unknown>;
//         push(
//           obj.moduleId ?? obj.module ?? obj.id,
//           obj.status != null ? String(obj.status) : "ACTIVE",
//           obj.joinedAt ?? obj.createdAt
//         );
//       }
//     }
//   } else if (typeof src === "string" && src.trim()) {
//     push(src);
//   }

//   // JUVENDOR primary fields
//   if (modules.length === 0) {
//     push(raw.selectedModule ?? raw.moduleId ?? raw.module ?? raw.vendorType);
//   } else {
//     if (raw.selectedModule) push(raw.selectedModule);
//     if (raw.moduleId) push(raw.moduleId);
//   }

//   // Fallback: vendorId suffix "..._FOOD"
//   if (modules.length === 0) {
//     const id = str(raw.vendorId ?? raw.id, "");
//     const match = id.match(/_([A-Z_]+)$/i);
//     if (match?.[1]) push(match[1]);
//   }

//   return { modules, moduleDetails };
// }

// function parseDocuments(raw: Record<string, unknown>): VendorDocument[] {
//   const src = raw.documents ?? raw.kycDocuments ?? raw.docs;
//   if (!Array.isArray(src)) {
//     // JUVENDOR often only stores documentTypesSubmitted: string[]
//     const types = raw.documentTypesSubmitted;
//     if (Array.isArray(types) && types.length > 0) {
//       return types.map((t, index) => ({
//         documentId: `DOC-${index + 1}`,
//         documentType: str(t, "Document"),
//         documentNumber: "—",
//         status: raw.documentsSubmitted === true ? "VERIFIED" : "PENDING",
//         uploadedAt: timestampLabel(raw.submittedAt ?? raw.updatedAt),
//       }));
//     }
//     return [];
//   }

//   return src.map((item, index) => {
//     const obj = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(obj.documentId ?? obj.id, `DOC-${index + 1}`),
//       documentType: str(obj.documentType ?? obj.type, "Document"),
//       documentNumber: str(obj.documentNumber ?? obj.number, "—"),
//       status: str(obj.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(obj.uploadedAt ?? obj.createdAt),
//     };
//   });
// }

// function mapVendor(
//   raw: Record<string, unknown> & { id: string },
//   orderStats?: { total: number; completed: number; cancelled: number }
// ): Vendor {
//   const { modules, moduleDetails } = parseModules(raw);
//   const documents = parseDocuments(raw);

//   const bank =
//     raw.bankAccountLast4 ??
//     raw.bankLast4 ??
//     (typeof raw.bankAccountNumber === "string"
//       ? String(raw.bankAccountNumber).slice(-4)
//       : "");

//   const verificationStatus = asVerification(
//     raw.verificationStatus ?? raw.kycStatus ?? raw.verification
//   );

//   // Prefer accountStatus (JUVENDOR), then status, then vendorStatus
//   let status = asVendorStatus(
//     raw.accountStatus ?? raw.status ?? raw.vendorStatus
//   );
//   if (isVerificationBlockingActive(verificationStatus) && status === "ACTIVE") {
//     status = "INACTIVE";
//   }

//   return {
//     docId: raw.id,
//     vendorId: str(raw.vendorId ?? raw.id, raw.id),
//     userId: str(raw.userId ?? raw.ownerUid ?? raw.uid, "—"),
//     businessName: str(raw.businessName ?? raw.shopName ?? raw.name, "Vendor"),
//     // JUVENDOR uses fullName (and often bankAccountHolder for owner)
//     ownerName: firstStr(
//       [
//         raw.ownerName,
//         raw.ownerDisplayName,
//         raw.contactName,
//         raw.fullName,
//         raw.bankAccountHolder,
//         raw.owner,
//       ],
//       "—"
//     ),
//     phone: firstStr([raw.phone, raw.phoneNumber, raw.mobile], "—"),
//     email: str(raw.email, "—"),
//     status,
//     verificationStatus,
//     stateId: str(raw.stateId, "—"),
//     stateName: firstStr([raw.stateName, raw.state], "—"),
//     districtId: str(raw.districtId, "—"),
//     // No districtName in many JUVENDOR docs — fall back to city
//     districtName: firstStr(
//       [raw.districtName, raw.district, raw.city],
//       "—"
//     ),
//     pincode: firstStr([raw.pincode, raw.pinCode, raw.postalCode], "—"),
//     address: firstStr(
//       [raw.address, raw.fullAddress, raw.addressLine1, raw.city],
//       "—"
//     ),
//     joinedAt: timestampLabel(
//       raw.joinedAt ?? raw.submittedAt ?? raw.createdAt
//     ),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ??
//         raw.lastLoginAt ??
//         raw.storeStatusUpdatedAt ??
//         raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     totalOrders: orderStats?.total ?? num(raw.totalOrders),
//     completedOrders: orderStats?.completed ?? num(raw.completedOrders),
//     cancelledOrders: orderStats?.cancelled ?? num(raw.cancelledOrders),
//     modules,
//     moduleDetails,
//     documents,
//     gstNumber: firstStr([raw.gstNumber, raw.gstin, raw.gst], "—"),
//     panNumber: firstStr([raw.panNumber, raw.pan], "—"),
//     businessType: firstStr([raw.businessType, raw.category], "—"),
//     bankAccountLast4: str(bank, "—"),
//     ifscCode: firstStr([raw.ifscCode, raw.ifsc, raw.bankIfsc], "—"),
//   };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendors                                                                 */
// /* -------------------------------------------------------------------------- */

// export function useVendors(pollMs = 20000): UseVendorsResult {
//   const [vendors, setVendors] = useState<Vendor[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendors([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const [vendorDocs, orders] = await Promise.all([
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         ),
//         getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.ORDERS,
//           [],
//           undefined,
//           500
//         ).catch(() => [] as Array<Record<string, unknown> & { id: string }>),
//       ]);

//       const statsByVendor = new Map<
//         string,
//         { total: number; completed: number; cancelled: number }
//       >();

//       for (const o of orders) {
//         const vid = str(o.vendorId, "");
//         if (!vid || vid === "—") continue;
//         const cur = statsByVendor.get(vid) ?? {
//           total: 0,
//           completed: 0,
//           cancelled: 0,
//         };
//         cur.total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) cur.completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cur.cancelled += 1;
//         statsByVendor.set(vid, cur);
//       }

//       const mapped = vendorDocs.map((v) => {
//         const id = str(v.vendorId ?? v.id, v.id);
//         return mapVendor(v, statsByVendor.get(id) ?? statsByVendor.get(v.id));
//       });

//       setVendors(mapped);
//     } catch (err) {
//       console.error("useVendors error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendors from Firestore."
//       );
//       setVendors([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//     if (pollMs <= 0) return;
//     const id = window.setInterval(() => void load(), pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   return { vendors, loading, error, demoMode, refresh: load };
// }

// /* -------------------------------------------------------------------------- */
// /* useVendor                                                                  */
// /* -------------------------------------------------------------------------- */

// export function useVendor(vendorId: string | undefined): UseVendorResult {
//   const [vendor, setVendor] = useState<Vendor | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!vendorId) {
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setVendor(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let docData =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           vendorId
//         )) ?? null;

//       if (!docData) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDORS,
//           [],
//           undefined,
//           500
//         );
//         docData =
//           all.find(
//             (v) => v.id === vendorId || str(v.vendorId, "") === vendorId
//           ) ?? null;
//       }

//       if (!docData) {
//         setVendor(null);
//         setLoading(false);
//         return;
//       }

//       const orders = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.ORDERS,
//         [],
//         undefined,
//         500
//       ).catch(() => [] as Array<Record<string, unknown> & { id: string }>);

//       const vid = str(docData.vendorId ?? docData.id, docData.id);
//       let total = 0;
//       let completed = 0;
//       let cancelled = 0;

//       for (const o of orders) {
//         if (str(o.vendorId, "") !== vid && str(o.vendorId, "") !== docData.id) {
//           continue;
//         }
//         total += 1;
//         const st = String(o.status ?? "").toUpperCase();
//         if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) completed += 1;
//         if (["CANCELLED", "REJECTED"].includes(st)) cancelled += 1;
//       }

//       let documents: VendorDocument[] = parseDocuments(docData);
//       try {
//         const docs = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
//           [{ fieldPath: "vendorId", operator: "==", value: vid }],
//           undefined,
//           50
//         );
//         if (docs.length > 0) {
//           documents = docs.map((d) => ({
//             documentId: d.id,
//             documentType: str(d.documentType ?? d.type, "Document"),
//             documentNumber: str(d.documentNumber ?? d.number, "—"),
//             status: str(d.status, "PENDING").toUpperCase(),
//             uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//           }));
//         }
//       } catch {
//         // keep embedded / documentTypesSubmitted fallback
//       }

//       const mapped = mapVendor(docData, { total, completed, cancelled });
//       mapped.documents = documents;
//       setVendor(mapped);
//     } catch (err) {
//       console.error("useVendor error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load vendor from Firestore."
//       );
//       setVendor(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [vendorId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { vendor, loading, error, demoMode, refresh: load, setVendor };
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import { storage } from "@/lib/firebase/config";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type VendorStatus = "ACTIVE" | "INACTIVE" | "BLOCKED" | "SUSPENDED";

export type VerificationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

export type VendorModule =
  | "FOOD"
  | "MART"
  | "PHARMACY"
  | "SHOPPING"
  | "STAY"
  | "HOME_SERVICES"
  | string;

export type DocumentStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED"
  | "ACTIVE"
  | string;

export type VendorDocument = {
  documentId: string;
  documentType: string;
  documentNumber: string;
  status: DocumentStatus;
  uploadedAt: string;
  fileName: string;
  fileUrl: string;
  storagePath: string;
  contentType: string;
};

export type VendorModuleInfo = {
  moduleId: VendorModule;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | string;
  joinedAt: string;
};

export type Vendor = {
  docId: string;
  vendorId: string;
  userId: string;
  businessName: string;
  ownerName: string;
  phone: string;
  email: string;
  status: VendorStatus;
  verificationStatus: VerificationStatus;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  pincode: string;
  address: string;
  joinedAt: string;
  updatedAt: string;
  lastActiveAt: string;
  rating: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  modules: VendorModule[];
  moduleDetails: VendorModuleInfo[];
  documents: VendorDocument[];
  gstNumber: string;
  panNumber: string;
  businessType: string;
  bankAccountLast4: string;
  ifscCode: string;
};

export type UseVendorsResult = {
  vendors: Vendor[];
  loading: boolean;
  error: string | null;
  demoMode: boolean;
  refresh: () => Promise<void>;
};

export type UseVendorResult = {
  vendor: Vendor | null;
  loading: boolean;
  error: string | null;
  demoMode: boolean;
  refresh: () => Promise<void>;
  setVendor: React.Dispatch<React.SetStateAction<Vendor | null>>;
};

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const NON_ACTIVE_VERIFICATION: VerificationStatus[] = [
  "DRAFT",
  "SUBMITTED",
  "PENDING",
  "REJECTED",
];

export function isVerificationBlockingActive(
  verification: VerificationStatus
): boolean {
  return NON_ACTIVE_VERIFICATION.includes(verification);
}

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function firstStr(values: unknown[], fallback = "—"): string {
  for (const value of values) {
    const next = str(value, "");
    if (next) return next;
  }
  return fallback;
}

function num(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
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

function asVendorStatus(value: unknown): VendorStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
  return "ACTIVE";
}

function asVerification(value: unknown): VerificationStatus {
  const s = String(value ?? "PENDING").toUpperCase();
  if (
    s === "DRAFT" ||
    s === "SUBMITTED" ||
    s === "PENDING" ||
    s === "ACTIVE" ||
    s === "REJECTED"
  ) {
    return s;
  }
  if (s === "VERIFIED" || s === "APPROVED") return "ACTIVE";
  return "PENDING";
}

function normalizeModule(value: unknown): VendorModule {
  const s = String(value ?? "")
    .toUpperCase()
    .replace(/\s+/g, "_");
  const map: Record<string, VendorModule> = {
    FOOD: "FOOD",
    JUCART: "FOOD",
    MART: "MART",
    PHARMACY: "PHARMACY",
    SHOPPING: "SHOPPING",
    JUSHOPPING: "SHOPPING",
    STAY: "STAY",
    JUSTAY: "STAY",
    HOME_SERVICES: "HOME_SERVICES",
    HOMESERVICES: "HOME_SERVICES",
    JUHOME: "HOME_SERVICES",
  };
  return map[s] ?? (s || "FOOD");
}

function parseModules(raw: Record<string, unknown>): {
  modules: VendorModule[];
  moduleDetails: VendorModuleInfo[];
} {
  const modules: VendorModule[] = [];
  const moduleDetails: VendorModuleInfo[] = [];
  const seen = new Set<string>();

  const push = (
    value: unknown,
    statusValue: unknown = "ACTIVE",
    joinedAt: unknown = null
  ) => {
    const m = normalizeModule(value);
    if (!m || seen.has(String(m))) return;
    seen.add(String(m));
    modules.push(m);
    const status = String(statusValue ?? "ACTIVE").toUpperCase() || "ACTIVE";
    moduleDetails.push({
      moduleId: m,
      status,
      joinedAt:
        timestampLabel(joinedAt) === "—"
          ? "—"
          : timestampLabel(joinedAt),
    });
  };

  const src =
    raw.modules ??
    raw.enabledModules ??
    raw.vendorModules ??
    raw.moduleIds;

  if (Array.isArray(src)) {
    for (const item of src) {
      if (typeof item === "string") {
        push(item);
      } else if (item && typeof item === "object") {
        const obj = item as Record<string, unknown>;
        push(
          obj.moduleId ?? obj.module ?? obj.id,
          obj.status != null ? String(obj.status) : "ACTIVE",
          obj.joinedAt ?? obj.createdAt
        );
      }
    }
  } else if (typeof src === "string" && src.trim()) {
    push(src);
  }

  if (modules.length === 0) {
    push(raw.selectedModule ?? raw.moduleId ?? raw.module ?? raw.vendorType);
  } else {
    if (raw.selectedModule) push(raw.selectedModule);
    if (raw.moduleId) push(raw.moduleId);
  }

  if (modules.length === 0) {
    const id = str(raw.vendorId ?? raw.id, "");
    const match = id.match(/_([A-Z_]+)$/i);
    if (match?.[1]) push(match[1]);
  }

  return { modules, moduleDetails };
}

function mapEmbeddedDocument(
  item: Record<string, unknown>,
  index: number
): VendorDocument {
  return {
    documentId: str(item.documentId ?? item.id, `DOC-${index + 1}`),
    documentType: str(item.documentType ?? item.type, "Document"),
    documentNumber: str(item.documentNumber ?? item.number, "—"),
    status: str(
      item.reviewStatus ?? item.status,
      "PENDING"
    ).toUpperCase(),
    uploadedAt: timestampLabel(
      item.uploadedAt ?? item.createdAt
    ),
    fileName: str(item.fileName ?? item.name, "—"),
    fileUrl: str(
      item.fileUrl ??
        item.downloadUrl ??
        item.url ??
        item.storageUrl ??
        item.imageUrl,
      ""
    ),
    storagePath: str(item.storagePath, ""),
    contentType: str(item.contentType ?? item.mimeType, ""),
  };
}

function parseDocuments(raw: Record<string, unknown>): VendorDocument[] {
  const src = raw.documents ?? raw.kycDocuments ?? raw.docs;
  if (Array.isArray(src) && src.length > 0) {
    return src.map((item, index) => {
      const obj = (
        item && typeof item === "object" ? item : {}
      ) as Record<string, unknown>;
      return mapEmbeddedDocument(obj, index);
    });
  }

  const types = raw.documentTypesSubmitted;
  if (Array.isArray(types) && types.length > 0) {
    return types.map((t, index) => ({
      documentId: `DOC-${index + 1}`,
      documentType: str(t, "Document"),
      documentNumber: "—",
      status: raw.documentsSubmitted === true ? "PENDING" : "PENDING",
      uploadedAt: timestampLabel(raw.submittedAt ?? raw.updatedAt),
      fileName: "—",
      fileUrl: "",
      storagePath: "",
      contentType: "",
    }));
  }

  return [];
}

async function resolveFileUrl(
  storagePath: string,
  existingUrl: string
): Promise<string> {
  if (existingUrl) return existingUrl;
  if (!storagePath) return "";
  try {
    return await getDownloadURL(ref(storage, storagePath));
  } catch (err) {
    console.warn("Storage URL resolve failed:", storagePath, err);
    return "";
  }
}

/**
 * Load vendor_documents for a vendor.
 * JUVENDOR writes: applicationId, vendorId, ownerUid, storagePath, reviewStatus.
 */
export async function loadVendorDocuments(options: {
  vendorId: string;
  docId?: string;
  ownerUid?: string;
}): Promise<VendorDocument[]> {
  const { vendorId, docId, ownerUid } = options;
  const ids = new Set(
    [vendorId, docId, ownerUid].filter((v): v is string => Boolean(v && v !== "—"))
  );

  if (ids.size === 0 || isFirestoreDemoMode) return [];

  const byId = new Map<string, Record<string, unknown> & { id: string }>();

  const queries: Array<Promise<Array<Record<string, unknown> & { id: string }>>> =
    [];

  for (const id of ids) {
    queries.push(
      getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
        [{ fieldPath: "vendorId", operator: "==", value: id }],
        undefined,
        50
      ).catch(() => [])
    );
    queries.push(
      getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
        [{ fieldPath: "applicationId", operator: "==", value: id }],
        undefined,
        50
      ).catch(() => [])
    );
  }

  if (ownerUid && ownerUid !== "—") {
    queries.push(
      getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
        [{ fieldPath: "ownerUid", operator: "==", value: ownerUid }],
        undefined,
        50
      ).catch(() => [])
    );
  }

  const batches = await Promise.all(queries);
  for (const batch of batches) {
    for (const d of batch) {
      byId.set(d.id, d);
    }
  }

  const rows = Array.from(byId.values());
  if (rows.length === 0) return [];

  const mapped = await Promise.all(
    rows.map(async (d, index) => {
      const storagePath = str(d.storagePath, "");
      const existingUrl = str(
        d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl,
        ""
      );
      const fileUrl = await resolveFileUrl(storagePath, existingUrl);

      return {
        documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
        documentType: str(d.documentType ?? d.type, "Document"),
        documentNumber: str(d.documentNumber ?? d.number, "—"),
        status: str(
          d.reviewStatus ?? d.status ?? d.verificationStatus,
          "PENDING"
        ).toUpperCase(),
        uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
        fileName: str(d.fileName ?? d.name, "—"),
        fileUrl,
        storagePath,
        contentType: str(d.contentType ?? d.mimeType, ""),
      } satisfies VendorDocument;
    })
  );

  mapped.sort((a, b) => a.documentType.localeCompare(b.documentType));
  return mapped;
}

function mapVendor(
  raw: Record<string, unknown> & { id: string },
  orderStats?: { total: number; completed: number; cancelled: number }
): Vendor {
  const { modules, moduleDetails } = parseModules(raw);
  const documents = parseDocuments(raw);

  const bank =
    raw.bankAccountLast4 ??
    raw.bankLast4 ??
    (typeof raw.bankAccountNumber === "string"
      ? String(raw.bankAccountNumber).slice(-4)
      : "");

  const verificationStatus = asVerification(
    raw.verificationStatus ?? raw.kycStatus ?? raw.verification
  );

  let status = asVendorStatus(
    raw.accountStatus ?? raw.status ?? raw.vendorStatus
  );
  if (isVerificationBlockingActive(verificationStatus) && status === "ACTIVE") {
    status = "INACTIVE";
  }

  return {
    docId: raw.id,
    vendorId: str(raw.vendorId ?? raw.id, raw.id),
    userId: str(raw.userId ?? raw.ownerUid ?? raw.uid, "—"),
    businessName: str(raw.businessName ?? raw.shopName ?? raw.name, "Vendor"),
    ownerName: firstStr(
      [
        raw.ownerName,
        raw.ownerDisplayName,
        raw.contactName,
        raw.fullName,
        raw.bankAccountHolder,
        raw.owner,
      ],
      "—"
    ),
    phone: firstStr([raw.phone, raw.phoneNumber, raw.mobile], "—"),
    email: str(raw.email, "—"),
    status,
    verificationStatus,
    stateId: str(raw.stateId, "—"),
    stateName: firstStr([raw.stateName, raw.state], "—"),
    districtId: str(raw.districtId, "—"),
    districtName: firstStr([raw.districtName, raw.district, raw.city], "—"),
    pincode: firstStr([raw.pincode, raw.pinCode, raw.postalCode], "—"),
    address: firstStr(
      [raw.address, raw.fullAddress, raw.addressLine1, raw.city],
      "—"
    ),
    joinedAt: timestampLabel(
      raw.joinedAt ?? raw.submittedAt ?? raw.createdAt
    ),
    updatedAt: timestampLabel(raw.updatedAt),
    lastActiveAt: timestampLabel(
      raw.lastActiveAt ??
        raw.lastLoginAt ??
        raw.storeStatusUpdatedAt ??
        raw.updatedAt
    ),
    rating: num(raw.rating ?? raw.averageRating),
    totalOrders: orderStats?.total ?? num(raw.totalOrders),
    completedOrders: orderStats?.completed ?? num(raw.completedOrders),
    cancelledOrders: orderStats?.cancelled ?? num(raw.cancelledOrders),
    modules,
    moduleDetails,
    documents,
    gstNumber: firstStr([raw.gstNumber, raw.gstin, raw.gst], "—"),
    panNumber: firstStr([raw.panNumber, raw.pan], "—"),
    businessType: firstStr([raw.businessType, raw.category], "—"),
    bankAccountLast4: str(bank, "—"),
    ifscCode: firstStr([raw.ifscCode, raw.ifsc, raw.bankIfsc], "—"),
  };
}

/* -------------------------------------------------------------------------- */
/* useVendors                                                                 */
/* -------------------------------------------------------------------------- */

export function useVendors(pollMs = 20000): UseVendorsResult {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setVendors([]);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      const [vendorDocs, orders] = await Promise.all([
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.VENDORS,
          [],
          undefined,
          500
        ),
        getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.ORDERS,
          [],
          undefined,
          500
        ).catch(() => [] as Array<Record<string, unknown> & { id: string }>),
      ]);

      const statsByVendor = new Map<
        string,
        { total: number; completed: number; cancelled: number }
      >();

      for (const o of orders) {
        const vid = str(o.vendorId, "");
        if (!vid || vid === "—") continue;
        const cur = statsByVendor.get(vid) ?? {
          total: 0,
          completed: 0,
          cancelled: 0,
        };
        cur.total += 1;
        const st = String(o.status ?? "").toUpperCase();
        if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st))
          cur.completed += 1;
        if (["CANCELLED", "REJECTED"].includes(st)) cur.cancelled += 1;
        statsByVendor.set(vid, cur);
      }

      const mapped = vendorDocs.map((v) => {
        const id = str(v.vendorId ?? v.id, v.id);
        return mapVendor(v, statsByVendor.get(id) ?? statsByVendor.get(v.id));
      });

      setVendors(mapped);
    } catch (err) {
      console.error("useVendors error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load vendors from Firestore."
      );
      setVendors([]);
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

  return { vendors, loading, error, demoMode, refresh: load };
}

/* -------------------------------------------------------------------------- */
/* useVendor                                                                  */
/* -------------------------------------------------------------------------- */

export function useVendor(vendorId: string | undefined): UseVendorResult {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    if (!vendorId) {
      setVendor(null);
      setLoading(false);
      return;
    }

    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setVendor(null);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      let docData =
        (await getDocument<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.VENDORS,
          vendorId
        )) ?? null;

      if (!docData) {
        const all = await getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.VENDORS,
          [],
          undefined,
          500
        );
        docData =
          all.find(
            (v) => v.id === vendorId || str(v.vendorId, "") === vendorId
          ) ?? null;
      }

      if (!docData) {
        setVendor(null);
        setLoading(false);
        return;
      }

      const orders = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.ORDERS,
        [],
        undefined,
        500
      ).catch(() => [] as Array<Record<string, unknown> & { id: string }>);

      const vid = str(docData.vendorId ?? docData.id, docData.id);
      const ownerUid = str(docData.ownerUid ?? docData.userId, "");
      let total = 0;
      let completed = 0;
      let cancelled = 0;

      for (const o of orders) {
        if (str(o.vendorId, "") !== vid && str(o.vendorId, "") !== docData.id) {
          continue;
        }
        total += 1;
        const st = String(o.status ?? "").toUpperCase();
        if (["DELIVERED", "SETTLED", "COMPLETED"].includes(st)) completed += 1;
        if (["CANCELLED", "REJECTED"].includes(st)) cancelled += 1;
      }

      const mapped = mapVendor(docData, { total, completed, cancelled });

      const fromCollection = await loadVendorDocuments({
        vendorId: vid,
        docId: docData.id,
        ownerUid,
      });

      mapped.documents =
        fromCollection.length > 0 ? fromCollection : mapped.documents;

      setVendor(mapped);
    } catch (err) {
      console.error("useVendor error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load vendor from Firestore."
      );
      setVendor(null);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    void load();
  }, [load]);

  return { vendor, loading, error, demoMode, refresh: load, setVendor };
}