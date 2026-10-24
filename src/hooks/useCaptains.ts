// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   licenseNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JULOGISTICS: "JULOGISTICS",
//     LOGISTICS: "JULOGISTICS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(o.serviceId ?? o.moduleId ?? o.id);
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type, "Document"),
//       documentNumber: str(o.documentNumber ?? o.number, "—"),
//       status: str(o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//     };
//   });
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")].filter(Boolean).join(" ") ||
//     "Captain";

//   return {
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: str(
//       raw.vehicleType ?? (raw.vehicle as Record<string, unknown>)?.type,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.vehicleRegNo ??
//         (raw.vehicle as Record<string, unknown>)?.number,
//       "—"
//     ),
//     licenseNumber: str(
//       raw.licenseNumber ?? raw.drivingLicense ?? raw.dlNumber,
//       "—"
//     ),
//     kycDocuments: parseDocuments(raw),
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find(
//             (c) =>
//               c.id === captainId || str(c.captainId, "") === captainId
//           ) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       const mapped = mapCaptain(doc);

//       // Optional captain_documents
//       try {
//         const docs = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//           [{ fieldPath: "captainId", operator: "==", value: mapped.captainId }],
//           undefined,
//           50
//         );
//         if (docs.length > 0) {
//           mapped.kycDocuments = docs.map((d, i) => ({
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

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { captain, loading, error, demoMode, refresh: load, setCaptain };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   licenseNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JULOGISTICS: "JULOGISTICS",
//     LOGISTICS: "JULOGISTICS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(o.serviceId ?? o.moduleId ?? o.id);
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: str(o.documentNumber ?? o.number, "—"),
//       status: str(o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: str(d.documentNumber ?? d.number, "—"),
//     status: str(d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: Captain,
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) =>
//     id.startsWith("CAP_") ? id.slice(4) : id;
//   const withCap = (id: string) =>
//     id.startsWith("CAP_") ? id : `CAP_${id}`;

//   const raw = [
//     routeId,
//     mapped.captainId,
//     mapped.uid,
//     firestoreDocId,
//     stripCap(routeId),
//     stripCap(mapped.captainId),
//     stripCap(mapped.uid),
//     withCap(mapped.uid),
//     withCap(firestoreDocId),
//   ];

//   return Array.from(
//     new Set(raw.map((x) => String(x || "").trim()).filter(Boolean))
//   );
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   return {
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: str(
//       raw.vehicleType ?? (raw.vehicle as Record<string, unknown>)?.type,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.vehicleRegNo ??
//         (raw.vehicle as Record<string, unknown>)?.number,
//       "—"
//     ),
//     licenseNumber: str(
//       raw.licenseNumber ?? raw.drivingLicense ?? raw.dlNumber,
//       "—"
//     ),
//     kycDocuments: parseDocuments(raw),
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       const mapped = mapCaptain(doc);
//       const byId = new Map(
//         mapped.kycDocuments.map((d) => [d.documentId, d])
//       );

//       const lookupIds = captainLookupIds(captainId, mapped, doc.id);
//       const docErrors: string[] = [];

//       for (const id of lookupIds) {
//         for (const field of ["captainId", "uid", "userId"] as const) {
//           try {
//             const rows = await getFilteredCollection<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               [{ fieldPath: field, operator: "==", value: id }],
//               undefined,
//               50
//             );
//             rows.forEach((row, i) => {
//               const mappedDoc = mapExternalDoc(
//                 row as Record<string, unknown> & { id: string },
//                 i
//               );
//               byId.set(mappedDoc.documentId, mappedDoc);
//             });
//           } catch (err) {
//             docErrors.push(
//               `${field}=${id}: ${
//                 err instanceof Error ? err.message : "query failed"
//               }`
//             );
//           }
//         }
//       }

//       mapped.kycDocuments = Array.from(byId.values());

//       if (docErrors.length > 0 && mapped.kycDocuments.length === 0) {
//         console.warn("Captain documents query issues:", docErrors);
//       }

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   return { captain, loading, error, demoMode, refresh: load, setCaptain };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   /** Actual Firestore document id (for updates) */
//   firestoreId: string;
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   licenseNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
// };

// function pickVehicle(raw: Record<string, unknown>) {
//   const v =
//     raw.vehicle && typeof raw.vehicle === "object"
//       ? (raw.vehicle as Record<string, unknown>)
//       : {};

//   const vehicleType = str(
//     raw.vehicleType ??
//       raw.vehicle_type ??
//       v.type ??
//       v.vehicleType ??
//       v.category ??
//       v.model ??
//       raw.vehicleCategory,
//     "—"
//   );

//   const vehicleNumber = str(
//     raw.vehicleNumber ??
//       raw.vehicleRegNo ??
//       raw.registrationNumber ??
//       raw.regNo ??
//       raw.regNumber ??
//       v.number ??
//       v.regNo ??
//       v.registrationNumber ??
//       v.vehicleNumber ??
//       v.plateNumber,
//     "—"
//   );

//   const licenseNumber = str(
//     raw.licenseNumber ??
//       raw.drivingLicense ??
//       raw.dlNumber ??
//       raw.dlNo ??
//       raw.licenceNumber ??
//       v.licenseNumber ??
//       v.dlNumber ??
//       v.drivingLicense,
//     "—"
//   );

//   return { vehicleType, vehicleNumber, licenseNumber };
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JULOGISTICS: "JULOGISTICS",
//     LOGISTICS: "JULOGISTICS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(o.serviceId ?? o.moduleId ?? o.id);
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: str(o.documentNumber ?? o.number, "—"),
//       status: str(o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: str(d.documentNumber ?? d.number, "—"),
//     status: str(d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: Captain,
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) =>
//     id.startsWith("CAP_") ? id.slice(4) : id;
//   const withCap = (id: string) =>
//     id.startsWith("CAP_") ? id : `CAP_${id}`;

//   const raw = [
//     routeId,
//     mapped.captainId,
//     mapped.uid,
//     firestoreDocId,
//     stripCap(routeId),
//     stripCap(mapped.captainId),
//     stripCap(mapped.uid),
//     withCap(mapped.uid),
//     withCap(firestoreDocId),
//   ];

//   return Array.from(
//     new Set(raw.map((x) => String(x || "").trim()).filter(Boolean))
//   );
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   return {
//     firestoreId: raw.id,
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: str(
//       raw.vehicleType ?? (raw.vehicle as Record<string, unknown>)?.type,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.vehicleRegNo ??
//         (raw.vehicle as Record<string, unknown>)?.number,
//       "—"
//     ),
//     licenseNumber: str(
//       raw.licenseNumber ?? raw.drivingLicense ?? raw.dlNumber,
//       "—"
//     ),
//     kycDocuments: parseDocuments(raw),
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       const mapped = mapCaptain(doc);
//       const byId = new Map(
//         mapped.kycDocuments.map((d) => [d.documentId, d])
//       );

//       const lookupIds = captainLookupIds(captainId, mapped, doc.id);

//       for (const id of lookupIds) {
//         for (const field of ["captainId", "uid", "userId"] as const) {
//           try {
//             const rows = await getFilteredCollection<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               [{ fieldPath: field, operator: "==", value: id }],
//               undefined,
//               50
//             );
//             rows.forEach((row, i) => {
//               const mappedDoc = mapExternalDoc(
//                 row as Record<string, unknown> & { id: string },
//                 i
//               );
//               byId.set(mappedDoc.documentId, mappedDoc);
//             });
//           } catch {
//             // ignore individual query failures
//           }
//         }
//       }

//       mapped.kycDocuments = Array.from(byId.values());
//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   /**
//    * Accept → ACTIVE | Reject → REJECTED
//    * Writes captains/{firestoreId}.verificationStatus (+ kycStatus).
//    * Best-effort updates captain_documents status when doc ids look like Firestore ids.
//    */
//   const setVerificationStatus = useCallback(
//     async (next: "ACTIVE" | "REJECTED", reason?: string) => {
//       if (!captain) throw new Error("Captain not loaded.");
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       setSaving(true);
//       try {
//         const payload: Record<string, unknown> = {
//           verificationStatus: next,
//           kycStatus: next,
//         };
//         if (reason) payload.verificationRejectReason = reason;
//         if (next === "ACTIVE") payload.verifiedAt = new Date().toISOString();
//         if (next === "REJECTED") payload.rejectedAt = new Date().toISOString();

//         await updateDocument(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captain.firestoreId,
//           payload
//         );

//         // Best-effort: mark related document rows
//         for (const d of captain.kycDocuments) {
//           if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
//           try {
//             await updateDocument(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               d.documentId,
//               { status: next }
//             );
//           } catch {
//             // document may be embedded-only
//           }
//         }

//         setCaptain({
//           ...captain,
//           verificationStatus: next,
//           kycDocuments: captain.kycDocuments.map((d) => ({
//             ...d,
//             status: next,
//           })),
//           updatedAt: "Just now",
//         });
//       } finally {
//         setSaving(false);
//       }
//     },
//     [captain]
//   );

//   return {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh: load,
//     setCaptain,
//     setVerificationStatus,
//   };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   firestoreId: string;
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   licenseNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JULOGISTICS: "JULOGISTICS",
//     LOGISTICS: "JULOGISTICS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// /** Manually entered id / number on a KYC doc — try common field names */
// function extractDocumentNumber(o: Record<string, unknown>): string {
//   const candidates = [
//     o.documentNumber,
//     o.docNumber,
//     o.number,
//     o.value,
//     o.idNumber,
//     o.idNo,
//     o.licenceNumber,
//     o.licenseNumber,
//     o.dlNumber,
//     o.dlNo,
//     o.pan,
//     o.panNumber,
//     o.rcNumber,
//     o.registrationNumber,
//     o.accountNumber,
//     o.passbookNumber,
//     o.metadata &&
//       typeof o.metadata === "object" &&
//       (o.metadata as Record<string, unknown>).documentNumber,
//     o.metadata &&
//       typeof o.metadata === "object" &&
//       (o.metadata as Record<string, unknown>).number,
//     o.metadata &&
//       typeof o.metadata === "object" &&
//       (o.metadata as Record<string, unknown>).value,
//   ];
//   for (const c of candidates) {
//     const s = str(c, "");
//     if (s && s !== "—") return s;
//   }
//   return "—";
// }

// function pickVehicle(raw: Record<string, unknown>) {
//   const v =
//     raw.vehicle && typeof raw.vehicle === "object"
//       ? (raw.vehicle as Record<string, unknown>)
//       : {};

//   const vehicleType = str(
//     raw.vehicleType ??
//       raw.vehicle_type ??
//       v.type ??
//       v.vehicleType ??
//       v.category ??
//       v.model ??
//       raw.vehicleCategory,
//     "—"
//   );

//   const vehicleNumber = str(
//     raw.vehicleNumber ??
//       raw.vehicleRegNo ??
//       raw.registrationNumber ??
//       raw.regNo ??
//       raw.regNumber ??
//       v.number ??
//       v.regNo ??
//       v.registrationNumber ??
//       v.vehicleNumber ??
//       v.plateNumber,
//     "—"
//   );

//   const licenseNumber = str(
//     raw.licenseNumber ??
//       raw.drivingLicense ??
//       raw.dlNumber ??
//       raw.dlNo ??
//       raw.licenceNumber ??
//       v.licenseNumber ??
//       v.dlNumber ??
//       v.drivingLicense,
//     "—"
//   );

//   return { vehicleType, vehicleNumber, licenseNumber };
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices ??
//     raw.serviceList ??
//     raw.activeServices ??
//     raw.modules;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(o.serviceId ?? o.moduleId ?? o.id);
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: extractDocumentNumber(o),
//       status: str(o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: extractDocumentNumber(d),
//     status: str(d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: Captain,
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) =>
//     id.startsWith("CAP_") ? id.slice(4) : id;
//   const withCap = (id: string) =>
//     id.startsWith("CAP_") ? id : `CAP_${id}`;

//   const raw = [
//     routeId,
//     mapped.captainId,
//     mapped.uid,
//     firestoreDocId,
//     stripCap(routeId),
//     stripCap(mapped.captainId),
//     stripCap(mapped.uid),
//     withCap(mapped.uid),
//     withCap(firestoreDocId),
//   ];

//   return Array.from(
//     new Set(raw.map((x) => String(x || "").trim()).filter(Boolean))
//   );
// }

// /** Fill license / RC from KYC docs when profile vehicle fields are empty */
// function enrichVehicleFromDocs(
//   vehicle: { vehicleType: string; vehicleNumber: string; licenseNumber: string },
//   docs: CaptainDocument[]
// ) {
//   const next = { ...vehicle };
//   const byType = (t: string) =>
//     docs.find((d) => d.documentType.toUpperCase().includes(t));

//   if (next.licenseNumber === "—") {
//     const dl = byType("DRIVING") || byType("LICENCE") || byType("LICENSE");
//     if (dl && dl.documentNumber !== "—") next.licenseNumber = dl.documentNumber;
//   }
//   if (next.vehicleNumber === "—") {
//     const rc = byType("RC");
//     if (rc && rc.documentNumber !== "—") next.vehicleNumber = rc.documentNumber;
//   }
//   return next;
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   // IMPORTANT: use pickVehicle (was defined before but never called)
//   const vehicle = pickVehicle(raw);
//   const kycDocuments = parseDocuments(raw);
//   const enriched = enrichVehicleFromDocs(vehicle, kycDocuments);

//   return {
//     firestoreId: raw.id,
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address: str(raw.address ?? raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: enriched.vehicleType,
//     vehicleNumber: enriched.vehicleNumber,
//     licenseNumber: enriched.licenseNumber,
//     kycDocuments,
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       let mapped = mapCaptain(doc);
//       const byId = new Map(
//         mapped.kycDocuments.map((d) => [d.documentId, d])
//       );

//       const lookupIds = captainLookupIds(captainId, mapped, doc.id);

//       // KYC documents
//       for (const id of lookupIds) {
//         for (const field of ["captainId", "uid", "userId"] as const) {
//           try {
//             const rows = await getFilteredCollection<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               [{ fieldPath: field, operator: "==", value: id }],
//               undefined,
//               50
//             );
//             rows.forEach((row, i) => {
//               const mappedDoc = mapExternalDoc(
//                 row as Record<string, unknown> & { id: string },
//                 i
//               );
//               byId.set(mappedDoc.documentId, mappedDoc);
//             });
//           } catch {
//             // ignore
//           }
//         }
//       }

//       mapped.kycDocuments = Array.from(byId.values());

//       // Re-enrich vehicle from full KYC list (DL / RC numbers)
//       const veh = enrichVehicleFromDocs(
//         {
//           vehicleType: mapped.vehicleType,
//           vehicleNumber: mapped.vehicleNumber,
//           licenseNumber: mapped.licenseNumber,
//         },
//         mapped.kycDocuments
//       );
//       mapped = {
//         ...mapped,
//         vehicleType: veh.vehicleType,
//         vehicleNumber: veh.vehicleNumber,
//         licenseNumber: veh.licenseNumber,
//       };

//       // Services from captain_services collection
//       if (mapped.services.length === 0) {
//         const serviceSet = new Set<ServiceId>();
//         for (const id of lookupIds) {
//           for (const field of ["captainId", "uid", "userId"] as const) {
//             try {
//               const rows = await getFilteredCollection<Record<string, unknown>>(
//                 FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,
//                 [{ fieldPath: field, operator: "==", value: id }],
//                 undefined,
//                 50
//               );
//               rows.forEach((r) => {
//                 serviceSet.add(
//                   normalizeService(
//                     r.serviceId ?? r.moduleId ?? r.service ?? r.type ?? r.id
//                   )
//                 );
//               });
//             } catch {
//               // ignore
//             }
//           }
//         }
//         if (serviceSet.size > 0) {
//           mapped.services = Array.from(serviceSet);
//           mapped.serviceIds = mapped.services;
//         }
//       }

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   const setVerificationStatus = useCallback(
//     async (next: "ACTIVE" | "REJECTED", reason?: string) => {
//       if (!captain) throw new Error("Captain not loaded.");
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       setSaving(true);
//       try {
//         const payload: Record<string, unknown> = {
//           verificationStatus: next,
//           kycStatus: next,
//         };
//         if (reason) payload.verificationRejectReason = reason;
//         if (next === "ACTIVE") payload.verifiedAt = new Date().toISOString();
//         if (next === "REJECTED") payload.rejectedAt = new Date().toISOString();

//         await updateDocument(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captain.firestoreId,
//           payload
//         );

//         for (const d of captain.kycDocuments) {
//           if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
//           try {
//             await updateDocument(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               d.documentId,
//               { status: next }
//             );
//           } catch {
//             // embedded-only
//           }
//         }

//         setCaptain({
//           ...captain,
//           verificationStatus: next,
//           kycDocuments: captain.kycDocuments.map((d) => ({
//             ...d,
//             status: next,
//           })),
//           updatedAt: "Just now",
//         });
//       } finally {
//         setSaving(false);
//       }
//     },
//     [captain]
//   );

//   return {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh: load,
//     setCaptain,
//     setVerificationStatus,
//   };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   firestoreId: string;
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   vehicleModel: string;
//   vehicleYear: string;
//   vehicleColor: string;
//   licenseNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     BIKE: "BIKE",
//     AUTO: "AUTO",
//     CAR: "CAR",
//     DELIVERY: "DELIVERY",
//     LOGISTICS: "JULOGISTICS",
//     JULOGISTICS: "JULOGISTICS",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// function extractDocumentNumber(o: Record<string, unknown>): string {
//   const candidates = [
//     o.documentNumber,
//     o.docNumber,
//     o.number,
//     o.value,
//     o.idNumber,
//     o.idNo,
//     o.licenceNumber,
//     o.licenseNumber,
//     o.dlNumber,
//     o.dlNo,
//     o.pan,
//     o.panNumber,
//     o.aadhaarNumber,
//     o.aadhaar,
//     o.rcNumber,
//     o.registrationNumber,
//     o.accountNumber,
//     o.passbookNumber,
//   ];
//   for (const c of candidates) {
//     const s = str(c, "");
//     if (s && s !== "—") return s;
//   }
//   return "—";
// }

// function pickVehicleFromCaptainDoc(raw: Record<string, unknown>) {
//   const v =
//     raw.vehicle && typeof raw.vehicle === "object"
//       ? (raw.vehicle as Record<string, unknown>)
//       : {};

//   return {
//     vehicleType: str(
//       raw.vehicleType ?? raw.vehicle_type ?? v.type ?? v.vehicleType,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.registrationNumber ??
//         raw.vehicleRegNo ??
//         v.registrationNumber ??
//         v.vehicleNumber ??
//         v.number,
//       "—"
//     ),
//     vehicleModel: str(raw.vehicleModel ?? v.vehicleModel ?? v.model, "—"),
//     vehicleYear: str(raw.vehicleYear ?? v.vehicleYear ?? v.year, "—"),
//     vehicleColor: str(raw.vehicleColor ?? v.vehicleColor ?? v.color, "—"),
//     licenseNumber: str(
//       raw.drivingLicenseNumber ??
//         raw.licenseNumber ??
//         raw.dlNumber ??
//         raw.licenceNumber ??
//         v.licenseNumber,
//       "—"
//     ),
//   };
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices ??
//     raw.serviceType;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(
//           o.serviceId ?? o.serviceType ?? o.moduleId ?? o.id
//         );
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: extractDocumentNumber(o),
//       status: str(
//         o.verificationStatus ?? o.status,
//         "PENDING"
//       ).toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: extractDocumentNumber(d),
//     status: str(d.verificationStatus ?? d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: { captainId: string; uid: string },
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) =>
//     id.startsWith("CAP_") ? id.slice(4) : id;
//   const withCap = (id: string) =>
//     id.startsWith("CAP_") ? id : `CAP_${id}`;

//   const raw = [
//     routeId,
//     mapped.captainId,
//     mapped.uid,
//     firestoreDocId,
//     stripCap(routeId),
//     stripCap(mapped.captainId),
//     stripCap(mapped.uid),
//     withCap(mapped.uid),
//     withCap(firestoreDocId),
//   ];

//   return Array.from(
//     new Set(raw.map((x) => String(x || "").trim()).filter(Boolean))
//   );
// }

// function enrichFromKycDocs(
//   vehicle: {
//     vehicleType: string;
//     vehicleNumber: string;
//     licenseNumber: string;
//   },
//   docs: CaptainDocument[]
// ) {
//   const next = { ...vehicle };
//   const byType = (t: string) =>
//     docs.find((d) => d.documentType.toUpperCase().includes(t));

//   if (next.licenseNumber === "—") {
//     const dl = byType("DRIVING") || byType("LICENCE") || byType("LICENSE");
//     if (dl && dl.documentNumber !== "—") next.licenseNumber = dl.documentNumber;
//   }
//   if (next.vehicleNumber === "—") {
//     const rc = byType("RC");
//     if (rc && rc.documentNumber !== "—") next.vehicleNumber = rc.documentNumber;
//   }
//   return next;
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   const vehicle = pickVehicleFromCaptainDoc(raw);
//   const kycDocuments = parseDocuments(raw);
//   const enriched = enrichFromKycDocs(vehicle, kycDocuments);

//   const addressParts = [
//     str(raw.address, ""),
//     str(raw.city, ""),
//     str(raw.state, ""),
//   ].filter((p) => p && p !== "—");

//   return {
//     firestoreId: raw.id,
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(
//       raw.status ?? raw.accountStatus ?? raw.accountBlockStatus
//     ),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address:
//       addressParts.length > 0
//         ? addressParts.join(", ")
//         : str(raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: enriched.vehicleType,
//     vehicleNumber: enriched.vehicleNumber,
//     vehicleModel: vehicle.vehicleModel,
//     vehicleYear: vehicle.vehicleYear,
//     vehicleColor: vehicle.vehicleColor,
//     licenseNumber: enriched.licenseNumber,
//     kycDocuments,
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       let mapped = mapCaptain(doc);
//       const lookupIds = captainLookupIds(captainId, mapped, doc.id);

//       // KYC documents
//       const byId = new Map(
//         mapped.kycDocuments.map((d) => [d.documentId, d])
//       );
//       for (const id of lookupIds) {
//         for (const field of ["captainId", "uid", "userId"] as const) {
//           try {
//             const rows = await getFilteredCollection<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               [{ fieldPath: field, operator: "==", value: id }],
//               undefined,
//               50
//             );
//             rows.forEach((row, i) => {
//               const mappedDoc = mapExternalDoc(
//                 row as Record<string, unknown> & { id: string },
//                 i
//               );
//               byId.set(mappedDoc.documentId, mappedDoc);
//             });
//           } catch {
//             /* ignore */
//           }
//         }
//       }
//       mapped.kycDocuments = Array.from(byId.values());

//       // captain_vehicles (rider app source of truth)
//       try {
//         for (const id of lookupIds) {
//           const vehicles = await getFilteredCollection<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAIN_VEHICLES,
//             [{ fieldPath: "captainId", operator: "==", value: id }],
//             undefined,
//             10
//           );
//           if (vehicles.length === 0) continue;
//           const v = vehicles[0]!;
//           mapped = {
//             ...mapped,
//             vehicleType:
//               mapped.vehicleType !== "—"
//                 ? mapped.vehicleType
//                 : str(v.vehicleType, "—"),
//             vehicleNumber:
//               mapped.vehicleNumber !== "—"
//                 ? mapped.vehicleNumber
//                 : str(
//                     v.registrationNumber ?? v.vehicleNumber ?? v.regNo,
//                     "—"
//                   ),
//             vehicleModel:
//               mapped.vehicleModel !== "—"
//                 ? mapped.vehicleModel
//                 : str(v.vehicleModel, "—"),
//             vehicleYear:
//               mapped.vehicleYear !== "—"
//                 ? mapped.vehicleYear
//                 : str(v.vehicleYear, "—"),
//             vehicleColor:
//               mapped.vehicleColor !== "—"
//                 ? mapped.vehicleColor
//                 : str(v.vehicleColor, "—"),
//           };
//           break;
//         }
//       } catch {
//         /* ignore */
//       }

//       // Enrich license / RC from KYC numbers
//       const veh = enrichFromKycDocs(
//         {
//           vehicleType: mapped.vehicleType,
//           vehicleNumber: mapped.vehicleNumber,
//           licenseNumber: mapped.licenseNumber,
//         },
//         mapped.kycDocuments
//       );
//       mapped = {
//         ...mapped,
//         vehicleType: veh.vehicleType,
//         vehicleNumber: veh.vehicleNumber,
//         licenseNumber: veh.licenseNumber,
//       };

//       // captain_services
//       if (mapped.services.length === 0) {
//         const serviceSet = new Set<ServiceId>();
//         for (const id of lookupIds) {
//           for (const field of ["captainId", "uid", "userId"] as const) {
//             try {
//               const rows = await getFilteredCollection<Record<string, unknown>>(
//                 FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,
//                 [{ fieldPath: field, operator: "==", value: id }],
//                 undefined,
//                 50
//               );
//               rows.forEach((r) => {
//                 serviceSet.add(
//                   normalizeService(
//                     r.serviceId ?? r.serviceType ?? r.service ?? r.type
//                   )
//                 );
//               });
//             } catch {
//               /* ignore */
//             }
//           }
//         }
//         if (serviceSet.size > 0) {
//           mapped.services = Array.from(serviceSet);
//           mapped.serviceIds = mapped.services;
//         }
//       }

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   const setVerificationStatus = useCallback(
//     async (next: "ACTIVE" | "REJECTED", reason?: string) => {
//       if (!captain) throw new Error("Captain not loaded.");
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       setSaving(true);
//       try {
//         const payload: Record<string, unknown> = {
//           verificationStatus: next,
//           kycStatus: next,
//         };
//         if (reason) payload.verificationRejectReason = reason;
//         if (next === "ACTIVE") payload.verifiedAt = new Date().toISOString();
//         if (next === "REJECTED") payload.rejectedAt = new Date().toISOString();

//         await updateDocument(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captain.firestoreId,
//           payload
//         );

//         for (const d of captain.kycDocuments) {
//           if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
//           try {
//             await updateDocument(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               d.documentId,
//               { status: next, verificationStatus: next }
//             );
//           } catch {
//             /* embedded-only */
//           }
//         }

//         setCaptain({
//           ...captain,
//           verificationStatus: next,
//           kycDocuments: captain.kycDocuments.map((d) => ({
//             ...d,
//             status: next,
//           })),
//           updatedAt: "Just now",
//         });
//       } finally {
//         setSaving(false);
//       }
//     },
//     [captain]
//   );

//   return {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh: load,
//     setCaptain,
//     setVerificationStatus,
//   };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   firestoreId: string;
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   vehicleModel: string;
//   vehicleYear: string;
//   vehicleColor: string;
//   licenseNumber: string;
//   aadhaarNumber: string;
//   panNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
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

// function asCaptainStatus(value: unknown): CaptainStatus {
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

// function asOnline(value: unknown): OnlineStatus {
//   return String(value ?? "").toUpperCase() === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "").toUpperCase().replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     BIKE: "BIKE",
//     AUTO: "AUTO",
//     CAR: "CAR",
//     DELIVERY: "DELIVERY",
//     LOGISTICS: "JULOGISTICS",
//     JULOGISTICS: "JULOGISTICS",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// function extractDocumentNumber(o: Record<string, unknown>): string {
//   const candidates = [
//     o.documentNumber,
//     o.docNumber,
//     o.number,
//     o.value,
//     o.idNumber,
//     o.idNo,
//     o.licenceNumber,
//     o.licenseNumber,
//     o.dlNumber,
//     o.dlNo,
//     o.pan,
//     o.panNumber,
//     o.aadhaarNumber,
//     o.aadhaar,
//     o.rcNumber,
//     o.registrationNumber,
//     o.accountNumber,
//     o.passbookNumber,
//   ];
//   for (const c of candidates) {
//     const s = str(c, "");
//     if (s && s !== "—") return s;
//   }
//   return "—";
// }

// function pickVehicleFromCaptainDoc(raw: Record<string, unknown>) {
//   const v =
//     raw.vehicle && typeof raw.vehicle === "object"
//       ? (raw.vehicle as Record<string, unknown>)
//       : {};

//   return {
//     vehicleType: str(
//       raw.vehicleType ?? raw.vehicle_type ?? v.type ?? v.vehicleType,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.registrationNumber ??
//         raw.vehicleRegNo ??
//         v.registrationNumber ??
//         v.vehicleNumber ??
//         v.number,
//       "—"
//     ),
//     vehicleModel: str(raw.vehicleModel ?? v.vehicleModel ?? v.model, "—"),
//     vehicleYear: str(raw.vehicleYear ?? v.vehicleYear ?? v.year, "—"),
//     vehicleColor: str(raw.vehicleColor ?? v.vehicleColor ?? v.color, "—"),
//     licenseNumber: str(
//       raw.drivingLicenseNumber ??
//         raw.licenseNumber ??
//         raw.dlNumber ??
//         raw.licenceNumber ??
//         v.licenseNumber,
//       "—"
//     ),
//   };
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices ??
//     raw.serviceType;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(
//           o.serviceId ?? o.serviceType ?? o.moduleId ?? o.id
//         );
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: extractDocumentNumber(o),
//       status: str(o.verificationStatus ?? o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: extractDocumentNumber(d),
//     status: str(d.verificationStatus ?? d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: { captainId: string; uid: string },
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) =>
//     id.startsWith("CAP_") ? id.slice(4) : id;
//   const withCap = (id: string) =>
//     id.startsWith("CAP_") ? id : `CAP_${id}`;

//   const raw = [
//     routeId,
//     mapped.captainId,
//     mapped.uid,
//     firestoreDocId,
//     stripCap(routeId),
//     stripCap(mapped.captainId),
//     stripCap(mapped.uid),
//     withCap(mapped.uid),
//     withCap(firestoreDocId),
//   ];

//   return Array.from(
//     new Set(raw.map((x) => String(x || "").trim()).filter(Boolean))
//   );
// }

// function enrichFromKycDocs(
//   vehicle: {
//     vehicleType: string;
//     vehicleNumber: string;
//     licenseNumber: string;
//   },
//   docs: CaptainDocument[]
// ) {
//   const next = { ...vehicle };
//   const byType = (t: string) =>
//     docs.find((d) => d.documentType.toUpperCase().includes(t));

//   if (next.licenseNumber === "—") {
//     const dl = byType("DRIVING") || byType("LICENCE") || byType("LICENSE");
//     if (dl && dl.documentNumber !== "—") next.licenseNumber = dl.documentNumber;
//   }
//   if (next.vehicleNumber === "—") {
//     const rc = byType("RC");
//     if (rc && rc.documentNumber !== "—") next.vehicleNumber = rc.documentNumber;
//   }
//   return next;
// }

// /** Fill empty documentNumber from captain master / vehicle fields */
// function fillDocumentNumbersFromMaster(
//   docs: CaptainDocument[],
//   master: Record<string, unknown>,
//   vehicleNumber: string,
//   licenseNumber: string
// ): CaptainDocument[] {
//   const numberFallbacks: Record<string, string> = {
//     GOVT_ID: str(master.aadhaarNumber ?? master.aadhaar, ""),
//     DRIVING_LICENCE: str(
//       master.drivingLicenseNumber ??
//         master.licenseNumber ??
//         master.dlNumber ??
//         (licenseNumber !== "—" ? licenseNumber : ""),
//       ""
//     ),
//     PAN: str(master.panNumber ?? master.pan, ""),
//     RC_BOOK: str(
//       master.vehicleNumber ??
//         master.registrationNumber ??
//         (vehicleNumber !== "—" ? vehicleNumber : ""),
//       ""
//     ),
//   };

//   return docs.map((d) => {
//     if (d.documentNumber && d.documentNumber !== "—") return d;

//     const key = d.documentType.toUpperCase().replace(/\s+/g, "_");
//     let fallback =
//       numberFallbacks[key] ||
//       (key.includes("DRIVING") || key.includes("LICEN")
//         ? numberFallbacks.DRIVING_LICENCE
//         : "") ||
//       (key.includes("GOVT") || key.includes("AADHAAR")
//         ? numberFallbacks.GOVT_ID
//         : "") ||
//       (key.includes("PAN") ? numberFallbacks.PAN : "") ||
//       (key.includes("RC") ? numberFallbacks.RC_BOOK : "");

//     if (!fallback || fallback === "—") {
//       return d;
//     }
//     return { ...d, documentNumber: fallback };
//   });
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   const vehicle = pickVehicleFromCaptainDoc(raw);
//   const kycDocuments = parseDocuments(raw);
//   const enriched = enrichFromKycDocs(vehicle, kycDocuments);

//   const addressParts = [
//     str(raw.address, ""),
//     str(raw.city, ""),
//     str(raw.state, ""),
//   ].filter((p) => p && p !== "—");

//   return {
//     firestoreId: raw.id,
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email, "—"),
//     status: asCaptainStatus(
//       raw.status ?? raw.accountStatus ?? raw.accountBlockStatus
//     ),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: str(raw.stateId, "—"),
//     stateName: str(raw.stateName ?? raw.state, "—"),
//     districtId: str(raw.districtId, "—"),
//     districtName: str(raw.districtName ?? raw.district, "—"),
//     pincode: str(raw.pincode ?? raw.pinCode, "—"),
//     address:
//       addressParts.length > 0
//         ? addressParts.join(", ")
//         : str(raw.fullAddress, "—"),
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) ||
//       Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: enriched.vehicleType,
//     vehicleNumber: enriched.vehicleNumber,
//     vehicleModel: vehicle.vehicleModel,
//     vehicleYear: vehicle.vehicleYear,
//     vehicleColor: vehicle.vehicleColor,
//     licenseNumber: enriched.licenseNumber,
//     aadhaarNumber: str(raw.aadhaarNumber ?? raw.aadhaar, "—"),
//     panNumber: str(raw.panNumber ?? raw.pan, "—"),
//     kycDocuments,
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       let mapped = mapCaptain(doc);
//       const lookupIds = captainLookupIds(captainId, mapped, doc.id);

//       // KYC documents from captain_documents
//       const byId = new Map(
//         mapped.kycDocuments.map((d) => [d.documentId, d])
//       );
//       for (const id of lookupIds) {
//         for (const field of ["captainId", "uid", "userId"] as const) {
//           try {
//             const rows = await getFilteredCollection<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               [{ fieldPath: field, operator: "==", value: id }],
//               undefined,
//               50
//             );
//             rows.forEach((row, i) => {
//               const mappedDoc = mapExternalDoc(
//                 row as Record<string, unknown> & { id: string },
//                 i
//               );
//               byId.set(mappedDoc.documentId, mappedDoc);
//             });
//           } catch {
//             /* ignore */
//           }
//         }
//       }
//       mapped.kycDocuments = Array.from(byId.values());

//       // captain_vehicles
//       try {
//         for (const id of lookupIds) {
//           const vehicles = await getFilteredCollection<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAIN_VEHICLES,
//             [{ fieldPath: "captainId", operator: "==", value: id }],
//             undefined,
//             10
//           );
//           if (vehicles.length === 0) continue;
//           const v = vehicles[0]!;
//           mapped = {
//             ...mapped,
//             vehicleType:
//               mapped.vehicleType !== "—"
//                 ? mapped.vehicleType
//                 : str(v.vehicleType, "—"),
//             vehicleNumber:
//               mapped.vehicleNumber !== "—"
//                 ? mapped.vehicleNumber
//                 : str(
//                     v.registrationNumber ?? v.vehicleNumber ?? v.regNo,
//                     "—"
//                   ),
//             vehicleModel:
//               mapped.vehicleModel !== "—"
//                 ? mapped.vehicleModel
//                 : str(v.vehicleModel, "—"),
//             vehicleYear:
//               mapped.vehicleYear !== "—"
//                 ? mapped.vehicleYear
//                 : str(v.vehicleYear, "—"),
//             vehicleColor:
//               mapped.vehicleColor !== "—"
//                 ? mapped.vehicleColor
//                 : str(v.vehicleColor, "—"),
//           };
//           break;
//         }
//       } catch {
//         /* ignore */
//       }

//       // Enrich vehicle from KYC when still empty
//       const veh = enrichFromKycDocs(
//         {
//           vehicleType: mapped.vehicleType,
//           vehicleNumber: mapped.vehicleNumber,
//           licenseNumber: mapped.licenseNumber,
//         },
//         mapped.kycDocuments
//       );
//       mapped = {
//         ...mapped,
//         vehicleType: veh.vehicleType,
//         vehicleNumber: veh.vehicleNumber,
//         licenseNumber: veh.licenseNumber,
//       };

//       // Fill missing document numbers from captain master + vehicle
//       mapped.kycDocuments = fillDocumentNumbersFromMaster(
//         mapped.kycDocuments,
//         doc as Record<string, unknown>,
//         mapped.vehicleNumber,
//         mapped.licenseNumber
//       );

//       // captain_services
//       if (mapped.services.length === 0) {
//         const serviceSet = new Set<ServiceId>();
//         for (const id of lookupIds) {
//           for (const field of ["captainId", "uid", "userId"] as const) {
//             try {
//               const rows = await getFilteredCollection<Record<string, unknown>>(
//                 FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,
//                 [{ fieldPath: field, operator: "==", value: id }],
//                 undefined,
//                 50
//               );
//               rows.forEach((r) => {
//                 serviceSet.add(
//                   normalizeService(
//                     r.serviceId ?? r.serviceType ?? r.service ?? r.type
//                   )
//                 );
//               });
//             } catch {
//               /* ignore */
//             }
//           }
//         }
//         if (serviceSet.size > 0) {
//           mapped.services = Array.from(serviceSet);
//           mapped.serviceIds = mapped.services;
//         }
//       }

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       setCaptain(null);
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   const setVerificationStatus = useCallback(
//     async (next: "ACTIVE" | "REJECTED", reason?: string) => {
//       if (!captain) throw new Error("Captain not loaded.");
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       setSaving(true);
//       try {
//         const payload: Record<string, unknown> = {
//           verificationStatus: next,
//           kycStatus: next,
//         };
//         if (reason) payload.verificationRejectReason = reason;
//         if (next === "ACTIVE") payload.verifiedAt = new Date().toISOString();
//         if (next === "REJECTED") payload.rejectedAt = new Date().toISOString();

//         await updateDocument(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captain.firestoreId,
//           payload
//         );

//         for (const d of captain.kycDocuments) {
//           if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
//           try {
//             await updateDocument(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               d.documentId,
//               { status: next, verificationStatus: next }
//             );
//           } catch {
//             /* embedded-only */
//           }
//         }

//         setCaptain({
//           ...captain,
//           verificationStatus: next,
//           kycDocuments: captain.kycDocuments.map((d) => ({
//             ...d,
//             status: next,
//           })),
//           updatedAt: "Just now",
//         });
//       } finally {
//         setSaving(false);
//       }
//     },
//     [captain]
//   );

//   return {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh: load,
//     setCaptain,
//     setVerificationStatus,
//   };
// }

// export default useCaptains;

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getDocument,
//   getFilteredCollection,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// export type CaptainStatus =
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

// export type AvailabilityStatus = "AVAILABLE" | "BUSY" | "BLOCKED";

// export type OnlineStatus = "ONLINE" | "OFFLINE";

// export type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS"
//   | string;

// export type CaptainDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus | string;
//   uploadedAt: string;
//   fileUrl: string;
// };

// export type CaptainActivity = {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
// };

// export type Captain = {
//   firestoreId: string;
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;
//   createdAt: string;
//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;
//   totalEarningsPaise: number;
//   serviceIds: ServiceId[];
//   services: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   vehicleModel: string;
//   vehicleYear: string;
//   vehicleColor: string;
//   licenseNumber: string;
//   aadhaarNumber: string;
//   panNumber: string;
//   kycDocuments: CaptainDocument[];
//   activity: CaptainActivity[];
// };

// function str(value: unknown, fallback = "—"): string {
//   if (typeof value === "string" && value.trim()) return value.trim();
//   if (typeof value === "number" && Number.isFinite(value)) return String(value);
//   return fallback;
// }

// function num(value: unknown, fallback = 0): number {
//   if (typeof value === "number" && Number.isFinite(value)) return value;
//   if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
//     return Number(value);
//   }
//   return fallback;
// }

// function timestampLabel(value: unknown): string {
//   if (!value) return "—";
//   try {
//     // Firestore Timestamp
//     if (
//       typeof value === "object" &&
//       value !== null &&
//       "toDate" in value &&
//       typeof (value as { toDate: () => Date }).toDate === "function"
//     ) {
//       return (value as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     }
//     if (typeof value === "object" && value !== null && "seconds" in value) {
//       const seconds = Number((value as { seconds: number }).seconds);
//       if (Number.isFinite(seconds)) {
//         return new Date(seconds * 1000).toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         });
//       }
//     }
//     const d = new Date(value as string | number);
//     if (!Number.isNaN(d.getTime())) {
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     }
//   } catch {
//     // fall through
//   }
//   return str(value);
// }

// function asStatus(value: unknown): CaptainStatus {
//   const s = String(value ?? "ACTIVE").toUpperCase();
//   if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
//   return "ACTIVE";
// }

// function asVerification(value: unknown): VerificationStatus {
//   const s = String(value ?? "DRAFT").toUpperCase();
//   if (
//     s === "SUBMITTED" ||
//     s === "PENDING" ||
//     s === "ACTIVE" ||
//     s === "REJECTED"
//   ) {
//     return s;
//   }
//   return "DRAFT";
// }

// function asOnline(value: unknown): OnlineStatus {
//   const s = String(value ?? "OFFLINE").toUpperCase();
//   return s === "ONLINE" ? "ONLINE" : "OFFLINE";
// }

// function asAvailability(value: unknown): AvailabilityStatus {
//   const s = String(value ?? "AVAILABLE").toUpperCase();
//   if (s === "BUSY" || s === "BLOCKED") return s;
//   return "AVAILABLE";
// }

// function normalizeService(value: unknown): ServiceId {
//   const s = String(value ?? "")
//     .toUpperCase()
//     .replace(/\s+/g, "_");
//   const map: Record<string, ServiceId> = {
//     JURIDE: "JURIDE",
//     RIDE: "JURIDE",
//     BIKE: "BIKE",
//     AUTO: "AUTO",
//     CAR: "CAR",
//     DELIVERY: "DELIVERY",
//     LOGISTICS: "JULOGISTICS",
//     JULOGISTICS: "JULOGISTICS",
//     JURENTALS: "JURENTALS",
//     RENTALS: "JURENTALS",
//     JUPARCEL: "JUPARCEL",
//     PARCEL: "JUPARCEL",
//     JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
//     PACKERS: "JUPACKERS_MOVERS",
//     JUCART: "JULOGISTICS",
//   };
//   return map[s] ?? (s || "JURIDE");
// }

// /** Nested object helper */
// function asObj(value: unknown): Record<string, unknown> {
//   return value && typeof value === "object" && !Array.isArray(value)
//     ? (value as Record<string, unknown>)
//     : {};
// }

// /**
//  * Resolve state / district / pincode from many possible Firestore shapes.
//  */
// function pickLocation(raw: Record<string, unknown>) {
//   const location = asObj(raw.location ?? raw.serviceArea ?? raw.geo);
//   const addressObj = asObj(raw.addressObject ?? raw.addressInfo);
//   const scope = asObj(raw.scope ?? raw.hierarchy);

//   const stateId = str(
//     raw.stateId ??
//       location.stateId ??
//       scope.stateId ??
//       addressObj.stateId,
//     "—"
//   );

//   const stateName = str(
//     raw.stateName ??
//       raw.state ??
//       location.stateName ??
//       location.state ??
//       scope.stateName ??
//       addressObj.stateName ??
//       addressObj.state,
//     "—"
//   );

//   const districtId = str(
//     raw.districtId ??
//       location.districtId ??
//       scope.districtId ??
//       addressObj.districtId,
//     "—"
//   );

//   const districtName = str(
//     raw.districtName ??
//       raw.district ??
//       location.districtName ??
//       location.district ??
//       scope.districtName ??
//       scope.district ??
//       addressObj.districtName ??
//       addressObj.district,
//     "—"
//   );

//   const pincode = str(
//     raw.pincode ??
//       raw.pinCode ??
//       raw.postalCode ??
//       location.pincode ??
//       location.pinCode ??
//       addressObj.pincode ??
//       addressObj.pinCode,
//     "—"
//   );

//   const addressLine = str(
//     typeof raw.address === "string"
//       ? raw.address
//       : raw.fullAddress ??
//           location.address ??
//           addressObj.line1 ??
//           addressObj.addressLine1,
//     ""
//   );

//   const city = str(raw.city ?? location.city ?? addressObj.city, "");

//   const addressParts = [addressLine, city, stateName !== "—" ? stateName : ""]
//     .filter((p) => p && p !== "—");

//   return {
//     stateId,
//     stateName,
//     districtId,
//     // Prefer name; if only id exists, show id so field is never blank-looking
//     districtName:
//       districtName !== "—"
//         ? districtName
//         : districtId !== "—"
//           ? districtId
//           : "—",
//     pincode,
//     address:
//       addressParts.length > 0 ? addressParts.join(", ") : str(raw.fullAddress, "—"),
//   };
// }

// function extractDocumentNumber(o: Record<string, unknown>): string {
//   const candidates = [
//     o.documentNumber,
//     o.docNumber,
//     o.number,
//     o.value,
//     o.idNumber,
//     o.idNo,
//     o.licenceNumber,
//     o.licenseNumber,
//     o.dlNumber,
//     o.dlNo,
//     o.pan,
//     o.panNumber,
//     o.aadhaarNumber,
//     o.aadhaar,
//     o.rcNumber,
//     o.registrationNumber,
//     o.accountNumber,
//     o.passbookNumber,
//   ];
//   for (const c of candidates) {
//     const s = str(c, "");
//     if (s && s !== "—") return s;
//   }
//   return "—";
// }

// function pickVehicleFromCaptainDoc(raw: Record<string, unknown>) {
//   const v = asObj(raw.vehicle);

//   return {
//     vehicleType: str(
//       raw.vehicleType ?? raw.vehicle_type ?? v.type ?? v.vehicleType,
//       "—"
//     ),
//     vehicleNumber: str(
//       raw.vehicleNumber ??
//         raw.registrationNumber ??
//         raw.vehicleRegNo ??
//         v.registrationNumber ??
//         v.vehicleNumber ??
//         v.number,
//       "—"
//     ),
//     vehicleModel: str(raw.vehicleModel ?? v.vehicleModel ?? v.model, "—"),
//     vehicleYear: str(raw.vehicleYear ?? v.vehicleYear ?? v.year, "—"),
//     vehicleColor: str(raw.vehicleColor ?? v.vehicleColor ?? v.color, "—"),
//     licenseNumber: str(
//       raw.drivingLicenseNumber ??
//         raw.licenseNumber ??
//         raw.dlNumber ??
//         raw.licenceNumber ??
//         v.licenseNumber,
//       "—"
//     ),
//   };
// }

// function parseServices(raw: Record<string, unknown>): ServiceId[] {
//   const src =
//     raw.serviceIds ??
//     raw.services ??
//     raw.enabledServices ??
//     raw.captainServices ??
//     raw.serviceType;

//   if (Array.isArray(src)) {
//     return src.map((item) => {
//       if (typeof item === "string") return normalizeService(item);
//       if (item && typeof item === "object") {
//         const o = item as Record<string, unknown>;
//         return normalizeService(
//           o.serviceId ?? o.serviceType ?? o.moduleId ?? o.id
//         );
//       }
//       return "JURIDE";
//     });
//   }
//   if (typeof src === "string" && src.trim()) {
//     return [normalizeService(src)];
//   }
//   return [];
// }

// function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
//   const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
//   if (!Array.isArray(src)) return [];
//   return src.map((item, i) => {
//     const o = (item && typeof item === "object" ? item : {}) as Record<
//       string,
//       unknown
//     >;
//     return {
//       documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
//       documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
//       documentNumber: extractDocumentNumber(o),
//       status: str(o.verificationStatus ?? o.status, "PENDING").toUpperCase(),
//       uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
//       fileUrl: str(
//         o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
//         ""
//       ),
//     };
//   });
// }

// function mapExternalDoc(
//   d: Record<string, unknown> & { id: string },
//   index: number
// ): CaptainDocument {
//   return {
//     documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
//     documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
//     documentNumber: extractDocumentNumber(d),
//     status: str(d.verificationStatus ?? d.status, "PENDING").toUpperCase(),
//     uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
//     fileUrl: str(
//       d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
//       ""
//     ),
//   };
// }

// function enrichFromKycDocs(
//   vehicle: {
//     vehicleType: string;
//     vehicleNumber: string;
//     licenseNumber: string;
//   },
//   docs: CaptainDocument[]
// ) {
//   const next = { ...vehicle };
//   const byType = (partial: string) =>
//     docs.find((d) =>
//       d.documentType.toUpperCase().replace(/\s+/g, "_").includes(partial)
//     );

//   const dl = byType("DRIVING") || byType("LICEN");
//   if (dl && dl.documentNumber !== "—" && next.licenseNumber === "—") {
//     next.licenseNumber = dl.documentNumber;
//   }
//   const rc = byType("RC");
//   if (rc && rc.documentNumber !== "—" && next.vehicleNumber === "—") {
//     next.vehicleNumber = rc.documentNumber;
//   }
//   return next;
// }

// function fillDocumentNumbersFromMaster(
//   docs: CaptainDocument[],
//   master: Record<string, unknown>,
//   vehicleNumber: string,
//   licenseNumber: string
// ): CaptainDocument[] {
//   const numberFallbacks: Record<string, string> = {
//     GOVT_ID: str(master.aadhaarNumber ?? master.aadhaar, ""),
//     DRIVING_LICENCE: str(
//       master.drivingLicenseNumber ??
//         master.licenseNumber ??
//         master.dlNumber ??
//         (licenseNumber !== "—" ? licenseNumber : ""),
//       ""
//     ),
//     PAN: str(master.panNumber ?? master.pan, ""),
//     RC_BOOK: str(
//       master.vehicleNumber ??
//         master.registrationNumber ??
//         (vehicleNumber !== "—" ? vehicleNumber : ""),
//       ""
//     ),
//   };

//   return docs.map((d) => {
//     if (d.documentNumber && d.documentNumber !== "—") return d;
//     const key = d.documentType.toUpperCase().replace(/\s+/g, "_");
//     let fallback =
//       numberFallbacks[key] ||
//       (key.includes("DRIVING") || key.includes("LICEN")
//         ? numberFallbacks.DRIVING_LICENCE
//         : "") ||
//       (key.includes("GOVT") || key.includes("AADHAAR")
//         ? numberFallbacks.GOVT_ID
//         : "") ||
//       (key.includes("PAN") ? numberFallbacks.PAN : "") ||
//       (key.includes("RC") ? numberFallbacks.RC_BOOK : "");
//     if (!fallback || fallback === "—") return d;
//     return { ...d, documentNumber: fallback };
//   });
// }

// function captainLookupIds(
//   routeId: string,
//   mapped: { captainId: string; uid: string },
//   firestoreDocId: string
// ): string[] {
//   const stripCap = (id: string) => (id.startsWith("CAP_") ? id.slice(4) : id);
//   const withCap = (id: string) => (id.startsWith("CAP_") ? id : `CAP_${id}`);

//   const set = new Set<string>();
//   [routeId, mapped.captainId, mapped.uid, firestoreDocId].forEach((id) => {
//     if (!id || id === "—") return;
//     set.add(id);
//     set.add(stripCap(id));
//     set.add(withCap(id));
//   });
//   return Array.from(set);
// }

// function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
//   const services = parseServices(raw);
//   const name =
//     str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
//     [str(raw.firstName, ""), str(raw.lastName, "")]
//       .filter(Boolean)
//       .join(" ") ||
//     "Captain";

//   const vehicle = pickVehicleFromCaptainDoc(raw);
//   const kycDocuments = parseDocuments(raw);
//   const enriched = enrichFromKycDocs(vehicle, kycDocuments);
//   const loc = pickLocation(raw);

//   return {
//     firestoreId: raw.id,
//     captainId: str(raw.captainId ?? raw.id, raw.id),
//     uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
//     name,
//     phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
//     email: str(raw.email ?? raw.emailId, "—"),
//     status: asStatus(raw.status ?? raw.accountStatus),
//     verificationStatus: asVerification(
//       raw.verificationStatus ?? raw.kycStatus ?? raw.kycVerificationStatus
//     ),
//     onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
//     availabilityStatus: asAvailability(
//       raw.availabilityStatus ?? raw.availability
//     ),
//     stateId: loc.stateId,
//     stateName: loc.stateName,
//     districtId: loc.districtId,
//     districtName: loc.districtName,
//     pincode: loc.pincode,
//     address: loc.address,
//     joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
//     createdAt: timestampLabel(raw.createdAt),
//     updatedAt: timestampLabel(raw.updatedAt),
//     lastActiveAt: timestampLabel(
//       raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
//     ),
//     rating: num(raw.rating ?? raw.averageRating),
//     completedTrips: num(raw.completedTrips ?? raw.completedRides),
//     completedDeliveries: num(raw.completedDeliveries),
//     cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
//     totalEarningsPaise:
//       num(raw.totalEarningsPaise) || Math.round(num(raw.totalEarnings) * 100),
//     serviceIds: services,
//     services,
//     vehicleType: enriched.vehicleType,
//     vehicleNumber: enriched.vehicleNumber,
//     vehicleModel: vehicle.vehicleModel,
//     vehicleYear: vehicle.vehicleYear,
//     vehicleColor: vehicle.vehicleColor,
//     licenseNumber: enriched.licenseNumber,
//     aadhaarNumber: str(raw.aadhaarNumber ?? raw.aadhaar, "—"),
//     panNumber: str(raw.panNumber ?? raw.pan, "—"),
//     kycDocuments,
//     activity: [],
//   };
// }

// export function useCaptains(pollMs = 20000) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       setCaptains([]);
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       const docs = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.CAPTAINS,
//         [],
//         undefined,
//         500
//       );
//       setCaptains(docs.map(mapCaptain));
//     } catch (err) {
//       console.error("useCaptains error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captains from Firestore."
//       );
//       setCaptains([]);
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

//   return { captains, loading, error, demoMode, refresh: load };
// }

// export function useCaptain(captainId: string | undefined) {
//   const [captain, setCaptain] = useState<Captain | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [demoMode, setDemoMode] = useState(false);
//   const [saving, setSaving] = useState(false);

//   const load = useCallback(async () => {
//     if (!captainId) {
//       setCaptain(null);
//       setLoading(false);
//       return;
//     }

//     // Always show refresh activity
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setDemoMode(true);
//       // Do NOT clear an already-loaded captain in demo — only skip network
//       setLoading(false);
//       return;
//     }

//     setDemoMode(false);

//     try {
//       let doc =
//         (await getDocument<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captainId
//         )) ?? null;

//       if (!doc) {
//         const bare = captainId.startsWith("CAP_")
//           ? captainId.slice(4)
//           : captainId;
//         doc =
//           (await getDocument<Record<string, unknown>>(
//             FIRESTORE_COLLECTIONS.CAPTAINS,
//             bare
//           )) ?? null;
//       }

//       if (!doc) {
//         const all = await getFilteredCollection<Record<string, unknown>>(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           [],
//           undefined,
//           500
//         );
//         doc =
//           all.find((c) => {
//             const cid = str(c.captainId, "");
//             const uid = str(c.uid ?? c.userId, "");
//             const bareRoute = captainId.replace(/^CAP_/, "");
//             return (
//               c.id === captainId ||
//               cid === captainId ||
//               uid === captainId ||
//               c.id === bareRoute ||
//               cid === `CAP_${bareRoute}` ||
//               uid === bareRoute
//             );
//           }) ?? null;
//       }

//       if (!doc) {
//         setCaptain(null);
//         setLoading(false);
//         return;
//       }

//       let mapped = mapCaptain(doc as Record<string, unknown> & { id: string });
//       const lookupIds = captainLookupIds(
//         captainId,
//         mapped,
//         mapped.firestoreId
//       );

//       // External KYC documents collection
//       try {
//         const externalDocs: CaptainDocument[] = [];
//         for (const id of lookupIds) {
//           for (const field of ["captainId", "uid", "userId"] as const) {
//             try {
//               const rows = await getFilteredCollection<
//                 Record<string, unknown>
//               >(
//                 FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//                 [{ fieldPath: field, operator: "==", value: id }],
//                 undefined,
//                 50
//               );
//               rows.forEach((r, i) => {
//                 externalDocs.push(
//                   mapExternalDoc(
//                     { ...r, id: str(r.id, `EXT-${i}`) } as Record<
//                       string,
//                       unknown
//                     > & { id: string },
//                     i
//                   )
//                 );
//               });
//             } catch {
//               // ignore secondary collection errors
//             }
//           }
//         }
//         if (externalDocs.length > 0) {
//           const seen = new Set(mapped.kycDocuments.map((d) => d.documentId));
//           externalDocs.forEach((d) => {
//             if (!seen.has(d.documentId)) {
//               mapped.kycDocuments.push(d);
//               seen.add(d.documentId);
//             }
//           });
//         }
//       } catch {
//         // ignore
//       }

//       // Vehicle sub-doc fallback
//       try {
//         for (const id of lookupIds) {
//           const v =
//             // (await getDocument<Record<string, unknown>>(
//             //   FIRESTORE_COLLECTIONS.CAPTAIN_VEHICLES ?? "captainVehicles",
//             //   id
//             // )) ?? null;
//             (await getDocument<Record<string, unknown>>(
//               FIRESTORE_COLLECTIONS.CAPTAIN_VEHICLES,
//               id
//             )) ?? null;
//           if (v) {
//             mapped = {
//               ...mapped,
//               vehicleType:
//                 mapped.vehicleType !== "—"
//                   ? mapped.vehicleType
//                   : str(v.vehicleType, "—"),
//               vehicleNumber:
//                 mapped.vehicleNumber !== "—"
//                   ? mapped.vehicleNumber
//                   : str(
//                       v.registrationNumber ?? v.vehicleNumber ?? v.regNo,
//                       "—"
//                     ),
//               vehicleModel:
//                 mapped.vehicleModel !== "—"
//                   ? mapped.vehicleModel
//                   : str(v.vehicleModel, "—"),
//               vehicleYear:
//                 mapped.vehicleYear !== "—"
//                   ? mapped.vehicleYear
//                   : str(v.vehicleYear, "—"),
//               vehicleColor:
//                 mapped.vehicleColor !== "—"
//                   ? mapped.vehicleColor
//                   : str(v.vehicleColor, "—"),
//             };
//             break;
//           }
//         }
//       } catch {
//         // optional collection
//       }

//       const veh = enrichFromKycDocs(
//         {
//           vehicleType: mapped.vehicleType,
//           vehicleNumber: mapped.vehicleNumber,
//           licenseNumber: mapped.licenseNumber,
//         },
//         mapped.kycDocuments
//       );
//       mapped = {
//         ...mapped,
//         vehicleType: veh.vehicleType,
//         vehicleNumber: veh.vehicleNumber,
//         licenseNumber: veh.licenseNumber,
//       };

//       mapped.kycDocuments = fillDocumentNumbersFromMaster(
//         mapped.kycDocuments,
//         doc as Record<string, unknown>,
//         mapped.vehicleNumber,
//         mapped.licenseNumber
//       );

//       if (mapped.services.length === 0) {
//         const serviceSet = new Set<ServiceId>();
//         for (const id of lookupIds) {
//           for (const field of ["captainId", "uid", "userId"] as const) {
//             try {
//               const rows = await getFilteredCollection<
//                 Record<string, unknown>
//               >(
//                 FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,
//                 [{ fieldPath: field, operator: "==", value: id }],
//                 undefined,
//                 20
//               );
//               rows.forEach((r) => {
//                 serviceSet.add(
//                   normalizeService(
//                     r.serviceId ?? r.serviceType ?? r.service ?? r.type
//                   )
//                 );
//               });
//             } catch {
//               // ignore
//             }
//           }
//         }
//         if (serviceSet.size > 0) {
//           mapped.services = Array.from(serviceSet);
//           mapped.serviceIds = mapped.services;
//         }
//       }

//       setCaptain(mapped);
//     } catch (err) {
//       console.error("useCaptain error:", err);
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load captain from Firestore."
//       );
//       // Keep previous captain data on refresh failure
//     } finally {
//       setLoading(false);
//     }
//   }, [captainId]);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   const setVerificationStatus = useCallback(
//     async (next: "ACTIVE" | "REJECTED", reason?: string) => {
//       if (!captain) throw new Error("Captain not loaded.");
//       if (isFirestoreDemoMode) {
//         throw new Error("Writes are disabled in demo mode.");
//       }

//       setSaving(true);
//       try {
//         const payload: Record<string, unknown> = {
//           verificationStatus: next,
//           kycStatus: next,
//         };
//         if (reason) payload.verificationRejectReason = reason;
//         if (next === "ACTIVE") payload.verifiedAt = new Date().toISOString();
//         if (next === "REJECTED") payload.rejectedAt = new Date().toISOString();

//         await updateDocument(
//           FIRESTORE_COLLECTIONS.CAPTAINS,
//           captain.firestoreId,
//           payload
//         );

//         for (const d of captain.kycDocuments) {
//           if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
//           try {
//             await updateDocument(
//               FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
//               d.documentId,
//               { status: next, verificationStatus: next }
//             );
//           } catch {
//             // ignore per-doc failures
//           }
//         }

//         setCaptain({
//           ...captain,
//           verificationStatus: next,
//           kycDocuments: captain.kycDocuments.map((d) => ({
//             ...d,
//             status: next,
//           })),
//           updatedAt: "Just now",
//         });
//       } finally {
//         setSaving(false);
//       }
//     },
//     [captain]
//   );

//   return {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh: load,
//     setCaptain,
//     setVerificationStatus,
//   };
// }

// export default useCaptains;

"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";

export type CaptainStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "SUSPENDED";

export type VerificationStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "PENDING"
  | "ACTIVE"
  | "REJECTED";

/** Account-level gate used by JuCaptain (separate from availabilityStatus) */
export type AccountBlockStatus =
  | "NONE"
  | "PENDING_VERIFICATION"
  | "BLOCKED"
  | "SUSPENDED"
  | string;

export type AvailabilityStatus = "AVAILABLE" | "BUSY" | "BLOCKED";

export type OnlineStatus = "ONLINE" | "OFFLINE";

export type ServiceId =
  | "JURIDE"
  | "JURENTALS"
  | "JULOGISTICS"
  | "JUPARCEL"
  | "JUPACKERS_MOVERS"
  | string;

export type CaptainDocument = {
  documentId: string;
  documentType: string;
  documentNumber: string;
  status: VerificationStatus | string;
  uploadedAt: string;
  fileUrl: string;
};

export type CaptainActivity = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP" | string;
};

export type Captain = {
  firestoreId: string;
  captainId: string;
  uid: string;
  name: string;
  phone: string;
  email: string;
  status: CaptainStatus;
  verificationStatus: VerificationStatus;
  accountBlockStatus: AccountBlockStatus;
  onlineStatus: OnlineStatus;
  availabilityStatus: AvailabilityStatus;
  stateId: string;
  stateName: string;
  districtId: string;
  districtName: string;
  pincode: string;
  address: string;
  joinedAt: string;
  lastActiveAt: string;
  updatedAt: string;
  createdAt: string;
  rating: number;
  completedTrips: number;
  completedDeliveries: number;
  cancelledTrips: number;
  totalEarningsPaise: number;
  serviceIds: ServiceId[];
  services: ServiceId[];
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  licenseNumber: string;
  aadhaarNumber: string;
  panNumber: string;
  kycDocuments: CaptainDocument[];
  activity: CaptainActivity[];
};

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
}

function num(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) {
    return Number(value);
  }
  return fallback;
}

function timestampLabel(value: unknown): string {
  if (!value) return "—";
  try {
    if (
      typeof value === "object" &&
      value !== null &&
      "toDate" in value &&
      typeof (value as { toDate: () => Date }).toDate === "function"
    ) {
      return (value as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
    if (typeof value === "object" && value !== null && "seconds" in value) {
      const seconds = Number((value as { seconds: number }).seconds);
      if (Number.isFinite(seconds)) {
        return new Date(seconds * 1000).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
      }
    }
    const d = new Date(value as string | number);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    }
  } catch {
    // fall through
  }
  return str(value);
}

function asStatus(value: unknown): CaptainStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "BLOCKED" || s === "SUSPENDED") return s;
  return "ACTIVE";
}

function asVerification(value: unknown): VerificationStatus {
  const s = String(value ?? "DRAFT").toUpperCase();
  if (
    s === "SUBMITTED" ||
    s === "PENDING" ||
    s === "ACTIVE" ||
    s === "REJECTED"
  ) {
    return s;
  }
  return "DRAFT";
}

function asAccountBlockStatus(value: unknown): AccountBlockStatus {
  const s = String(value ?? "NONE").toUpperCase();
  if (
    s === "PENDING_VERIFICATION" ||
    s === "BLOCKED" ||
    s === "SUSPENDED" ||
    s === "NONE"
  ) {
    return s;
  }
  return s || "NONE";
}

function asOnline(value: unknown): OnlineStatus {
  const s = String(value ?? "OFFLINE").toUpperCase();
  return s === "ONLINE" ? "ONLINE" : "OFFLINE";
}

function asAvailability(value: unknown): AvailabilityStatus {
  const s = String(value ?? "AVAILABLE").toUpperCase();
  if (s === "BUSY" || s === "BLOCKED") return s;
  return "AVAILABLE";
}

function normalizeService(value: unknown): ServiceId {
  const s = String(value ?? "")
    .toUpperCase()
    .replace(/\s+/g, "_");
  const map: Record<string, ServiceId> = {
    JURIDE: "JURIDE",
    RIDE: "JURIDE",
    BIKE: "BIKE",
    AUTO: "AUTO",
    CAR: "CAR",
    DELIVERY: "DELIVERY",
    LOGISTICS: "JULOGISTICS",
    JULOGISTICS: "JULOGISTICS",
    JURENTALS: "JURENTALS",
    RENTALS: "JURENTALS",
    JUPARCEL: "JUPARCEL",
    PARCEL: "JUPARCEL",
    JUPACKERS_MOVERS: "JUPACKERS_MOVERS",
    PACKERS: "JUPACKERS_MOVERS",
    JUCART: "JULOGISTICS",
  };
  return map[s] ?? (s || "JURIDE");
}

function asObj(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function pickLocation(raw: Record<string, unknown>) {
  const location = asObj(raw.location ?? raw.serviceArea ?? raw.geo);
  const addressObj = asObj(raw.addressObject ?? raw.addressInfo);
  const scope = asObj(raw.scope ?? raw.hierarchy);

  const stateId = str(
    raw.stateId ?? location.stateId ?? scope.stateId ?? addressObj.stateId,
    "—"
  );

  const stateName = str(
    raw.stateName ??
      raw.state ??
      location.stateName ??
      location.state ??
      scope.stateName ??
      addressObj.stateName ??
      addressObj.state,
    "—"
  );

  const districtId = str(
    raw.districtId ??
      location.districtId ??
      scope.districtId ??
      addressObj.districtId,
    "—"
  );

  const districtName = str(
    raw.districtName ??
      raw.district ??
      location.districtName ??
      location.district ??
      scope.districtName ??
      scope.district ??
      addressObj.districtName ??
      addressObj.district,
    "—"
  );

  const pincode = str(
    raw.pincode ??
      raw.pinCode ??
      raw.postalCode ??
      location.pincode ??
      location.pinCode ??
      addressObj.pincode ??
      addressObj.pinCode,
    "—"
  );

  const addressLine = str(
    typeof raw.address === "string"
      ? raw.address
      : raw.fullAddress ??
          location.address ??
          addressObj.line1 ??
          addressObj.addressLine1,
    ""
  );

  const city = str(raw.city ?? location.city ?? addressObj.city, "");

  const addressParts = [addressLine, city, stateName !== "—" ? stateName : ""]
    .filter((p) => p && p !== "—");

  return {
    stateId,
    stateName,
    districtId,
    districtName:
      districtName !== "—"
        ? districtName
        : districtId !== "—"
          ? districtId
          : "—",
    pincode,
    address:
      addressParts.length > 0
        ? addressParts.join(", ")
        : str(raw.fullAddress, "—"),
  };
}

function extractDocumentNumber(o: Record<string, unknown>): string {
  const candidates = [
    o.documentNumber,
    o.docNumber,
    o.number,
    o.value,
    o.idNumber,
    o.idNo,
    o.licenceNumber,
    o.licenseNumber,
    o.dlNumber,
    o.dlNo,
    o.pan,
    o.panNumber,
    o.aadhaarNumber,
    o.aadhaar,
    o.rcNumber,
    o.registrationNumber,
    o.accountNumber,
    o.passbookNumber,
  ];
  for (const c of candidates) {
    const s = str(c, "");
    if (s && s !== "—") return s;
  }
  return "—";
}

function pickVehicleFromCaptainDoc(raw: Record<string, unknown>) {
  const v = asObj(raw.vehicle);

  return {
    vehicleType: str(
      raw.vehicleType ?? raw.vehicle_type ?? v.type ?? v.vehicleType,
      "—"
    ),
    vehicleNumber: str(
      raw.vehicleNumber ??
        raw.registrationNumber ??
        raw.vehicleRegNo ??
        v.registrationNumber ??
        v.vehicleNumber ??
        v.number,
      "—"
    ),
    vehicleModel: str(raw.vehicleModel ?? v.vehicleModel ?? v.model, "—"),
    vehicleYear: str(raw.vehicleYear ?? v.vehicleYear ?? v.year, "—"),
    vehicleColor: str(raw.vehicleColor ?? v.vehicleColor ?? v.color, "—"),
    licenseNumber: str(
      raw.drivingLicenseNumber ??
        raw.licenseNumber ??
        raw.dlNumber ??
        raw.licenceNumber ??
        v.licenseNumber,
      "—"
    ),
  };
}

function parseServices(raw: Record<string, unknown>): ServiceId[] {
  const src =
    raw.serviceIds ??
    raw.services ??
    raw.enabledServices ??
    raw.captainServices ??
    raw.serviceType;

  if (Array.isArray(src)) {
    return src.map((item) => {
      if (typeof item === "string") return normalizeService(item);
      if (item && typeof item === "object") {
        const o = item as Record<string, unknown>;
        return normalizeService(
          o.serviceId ?? o.serviceType ?? o.moduleId ?? o.id
        );
      }
      return "JURIDE";
    });
  }
  if (typeof src === "string" && src.trim()) {
    return [normalizeService(src)];
  }
  return [];
}

function parseDocuments(raw: Record<string, unknown>): CaptainDocument[] {
  const src = raw.kycDocuments ?? raw.documents ?? raw.docs;
  if (!Array.isArray(src)) return [];
  return src.map((item, i) => {
    const o = (item && typeof item === "object" ? item : {}) as Record<
      string,
      unknown
    >;
    return {
      documentId: str(o.documentId ?? o.id, `DOC-${i + 1}`),
      documentType: str(o.documentType ?? o.type ?? o.name, "Document"),
      documentNumber: extractDocumentNumber(o),
      status: str(o.verificationStatus ?? o.status, "PENDING").toUpperCase(),
      uploadedAt: timestampLabel(o.uploadedAt ?? o.createdAt),
      fileUrl: str(
        o.fileUrl ?? o.downloadUrl ?? o.url ?? o.storageUrl ?? o.imageUrl,
        ""
      ),
    };
  });
}

function mapExternalDoc(
  d: Record<string, unknown> & { id: string },
  index: number
): CaptainDocument {
  return {
    documentId: d.id || str(d.documentId, `DOC-${index + 1}`),
    documentType: str(d.documentType ?? d.type ?? d.name, "Document"),
    documentNumber: extractDocumentNumber(d),
    status: str(d.verificationStatus ?? d.status, "PENDING").toUpperCase(),
    uploadedAt: timestampLabel(d.uploadedAt ?? d.createdAt),
    fileUrl: str(
      d.fileUrl ?? d.downloadUrl ?? d.url ?? d.storageUrl ?? d.imageUrl,
      ""
    ),
  };
}

function enrichFromKycDocs(
  vehicle: {
    vehicleType: string;
    vehicleNumber: string;
    licenseNumber: string;
  },
  docs: CaptainDocument[]
) {
  const next = { ...vehicle };
  const byType = (partial: string) =>
    docs.find((d) =>
      d.documentType.toUpperCase().replace(/\s+/g, "_").includes(partial)
    );

  const dl = byType("DRIVING") || byType("LICEN");
  if (dl && dl.documentNumber !== "—" && next.licenseNumber === "—") {
    next.licenseNumber = dl.documentNumber;
  }
  const rc = byType("RC");
  if (rc && rc.documentNumber !== "—" && next.vehicleNumber === "—") {
    next.vehicleNumber = rc.documentNumber;
  }
  return next;
}

function fillDocumentNumbersFromMaster(
  docs: CaptainDocument[],
  master: Record<string, unknown>,
  vehicleNumber: string,
  licenseNumber: string
): CaptainDocument[] {
  const numberFallbacks: Record<string, string> = {
    GOVT_ID: str(master.aadhaarNumber ?? master.aadhaar, ""),
    DRIVING_LICENCE: str(
      master.drivingLicenseNumber ??
        master.licenseNumber ??
        master.dlNumber ??
        (licenseNumber !== "—" ? licenseNumber : ""),
      ""
    ),
    PAN: str(master.panNumber ?? master.pan, ""),
    RC_BOOK: str(
      master.vehicleNumber ??
        master.registrationNumber ??
        (vehicleNumber !== "—" ? vehicleNumber : ""),
      ""
    ),
  };

  return docs.map((d) => {
    if (d.documentNumber && d.documentNumber !== "—") return d;
    const key = d.documentType.toUpperCase().replace(/\s+/g, "_");
    const fallback =
      numberFallbacks[key] ||
      (key.includes("DRIVING") || key.includes("LICEN")
        ? numberFallbacks.DRIVING_LICENCE
        : "") ||
      (key.includes("GOVT") || key.includes("AADHAAR")
        ? numberFallbacks.GOVT_ID
        : "") ||
      (key.includes("PAN") ? numberFallbacks.PAN : "") ||
      (key.includes("RC") ? numberFallbacks.RC_BOOK : "");
    if (!fallback || fallback === "—") return d;
    return { ...d, documentNumber: fallback };
  });
}

function captainLookupIds(
  routeId: string,
  mapped: { captainId: string; uid: string },
  firestoreDocId: string
): string[] {
  const stripCap = (id: string) => (id.startsWith("CAP_") ? id.slice(4) : id);
  const withCap = (id: string) => (id.startsWith("CAP_") ? id : `CAP_${id}`);

  const set = new Set<string>();
  [routeId, mapped.captainId, mapped.uid, firestoreDocId].forEach((id) => {
    if (!id || id === "—") return;
    set.add(id);
    set.add(stripCap(id));
    set.add(withCap(id));
  });
  return Array.from(set);
}

function mapCaptain(raw: Record<string, unknown> & { id: string }): Captain {
  const services = parseServices(raw);
  const name =
    str(raw.displayName ?? raw.name ?? raw.fullName, "") ||
    [str(raw.firstName, ""), str(raw.lastName, "")]
      .filter(Boolean)
      .join(" ") ||
    "Captain";

  const vehicle = pickVehicleFromCaptainDoc(raw);
  const kycDocuments = parseDocuments(raw);
  const enriched = enrichFromKycDocs(vehicle, kycDocuments);
  const loc = pickLocation(raw);

  return {
    firestoreId: raw.id,
    captainId: str(raw.captainId ?? raw.id, raw.id),
    uid: str(raw.uid ?? raw.userId ?? raw.id, raw.id),
    name,
    phone: str(raw.phone ?? raw.phoneNumber ?? raw.mobile, "—"),
    email: str(raw.email ?? raw.emailId, "—"),
    status: asStatus(raw.status ?? raw.accountStatus),
    verificationStatus: asVerification(
      raw.verificationStatus ?? raw.kycStatus ?? raw.kycVerificationStatus
    ),
    accountBlockStatus: asAccountBlockStatus(
      raw.accountBlockStatus ?? raw.blockStatus ?? raw.accountStatus
    ),
    onlineStatus: asOnline(raw.onlineStatus ?? raw.isOnline),
    availabilityStatus: asAvailability(
      raw.availabilityStatus ?? raw.availability
    ),
    stateId: loc.stateId,
    stateName: loc.stateName,
    districtId: loc.districtId,
    districtName: loc.districtName,
    pincode: loc.pincode,
    address: loc.address,
    joinedAt: timestampLabel(raw.joinedAt ?? raw.createdAt),
    createdAt: timestampLabel(raw.createdAt),
    updatedAt: timestampLabel(raw.updatedAt),
    lastActiveAt: timestampLabel(
      raw.lastActiveAt ?? raw.lastLoginAt ?? raw.updatedAt
    ),
    rating: num(raw.rating ?? raw.averageRating),
    completedTrips: num(raw.completedTrips ?? raw.completedRides),
    completedDeliveries: num(raw.completedDeliveries),
    cancelledTrips: num(raw.cancelledTrips ?? raw.cancelledRides),
    totalEarningsPaise:
      num(raw.totalEarningsPaise) || Math.round(num(raw.totalEarnings) * 100),
    serviceIds: services,
    services,
    vehicleType: enriched.vehicleType,
    vehicleNumber: enriched.vehicleNumber,
    vehicleModel: vehicle.vehicleModel,
    vehicleYear: vehicle.vehicleYear,
    vehicleColor: vehicle.vehicleColor,
    licenseNumber: enriched.licenseNumber,
    aadhaarNumber: str(raw.aadhaarNumber ?? raw.aadhaar, "—"),
    panNumber: str(raw.panNumber ?? raw.pan, "—"),
    kycDocuments,
    activity: [],
  };
}

export function useCaptains(pollMs = 20000) {
  const [captains, setCaptains] = useState<Captain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setCaptains([]);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.CAPTAINS,
        [],
        undefined,
        500
      );
      setCaptains(docs.map(mapCaptain));
    } catch (err) {
      console.error("useCaptains error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load captains from Firestore."
      );
      setCaptains([]);
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

  return { captains, loading, error, demoMode, refresh: load };
}

export function useCaptain(captainId: string | undefined) {
  const [captain, setCaptain] = useState<Captain | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoMode, setDemoMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!captainId) {
      setCaptain(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (isFirestoreDemoMode) {
      setDemoMode(true);
      setLoading(false);
      return;
    }

    setDemoMode(false);

    try {
      let doc =
        (await getDocument<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          captainId
        )) ?? null;

      if (!doc) {
        const bare = captainId.startsWith("CAP_")
          ? captainId.slice(4)
          : captainId;
        doc =
          (await getDocument<Record<string, unknown>>(
            FIRESTORE_COLLECTIONS.CAPTAINS,
            bare
          )) ?? null;
      }

      if (!doc) {
        const all = await getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          [],
          undefined,
          500
        );
        doc =
          all.find((c) => {
            const cid = str(c.captainId, "");
            const uid = str(c.uid ?? c.userId, "");
            const bareRoute = captainId.replace(/^CAP_/, "");
            return (
              c.id === captainId ||
              cid === captainId ||
              uid === captainId ||
              c.id === bareRoute ||
              cid === `CAP_${bareRoute}` ||
              uid === bareRoute
            );
          }) ?? null;
      }

      if (!doc) {
        setCaptain(null);
        setLoading(false);
        return;
      }

      let mapped = mapCaptain(doc as Record<string, unknown> & { id: string });
      const lookupIds = captainLookupIds(
        captainId,
        mapped,
        mapped.firestoreId
      );

      try {
        const externalDocs: CaptainDocument[] = [];
        for (const id of lookupIds) {
          for (const field of ["captainId", "uid", "userId"] as const) {
            try {
              const rows = await getFilteredCollection<
                Record<string, unknown>
              >(
                FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
                [{ fieldPath: field, operator: "==", value: id }],
                undefined,
                50
              );
              rows.forEach((r, i) => {
                externalDocs.push(
                  mapExternalDoc(
                    { ...r, id: str(r.id, `EXT-${i}`) } as Record<
                      string,
                      unknown
                    > & { id: string },
                    i
                  )
                );
              });
            } catch {
              // ignore
            }
          }
        }
        if (externalDocs.length > 0) {
          const seen = new Set(mapped.kycDocuments.map((d) => d.documentId));
          externalDocs.forEach((d) => {
            if (!seen.has(d.documentId)) {
              mapped.kycDocuments.push(d);
              seen.add(d.documentId);
            }
          });
        }
      } catch {
        // ignore
      }

      try {
        for (const id of lookupIds) {
          const v =
            (await getDocument<Record<string, unknown>>(
              FIRESTORE_COLLECTIONS.CAPTAIN_VEHICLES,
              id
            )) ?? null;
          if (v) {
            mapped = {
              ...mapped,
              vehicleType:
                mapped.vehicleType !== "—"
                  ? mapped.vehicleType
                  : str(v.vehicleType, "—"),
              vehicleNumber:
                mapped.vehicleNumber !== "—"
                  ? mapped.vehicleNumber
                  : str(
                      v.registrationNumber ?? v.vehicleNumber ?? v.regNo,
                      "—"
                    ),
              vehicleModel:
                mapped.vehicleModel !== "—"
                  ? mapped.vehicleModel
                  : str(v.vehicleModel, "—"),
              vehicleYear:
                mapped.vehicleYear !== "—"
                  ? mapped.vehicleYear
                  : str(v.vehicleYear, "—"),
              vehicleColor:
                mapped.vehicleColor !== "—"
                  ? mapped.vehicleColor
                  : str(v.vehicleColor, "—"),
            };
            break;
          }
        }
      } catch {
        // optional
      }

      const veh = enrichFromKycDocs(
        {
          vehicleType: mapped.vehicleType,
          vehicleNumber: mapped.vehicleNumber,
          licenseNumber: mapped.licenseNumber,
        },
        mapped.kycDocuments
      );
      mapped = {
        ...mapped,
        vehicleType: veh.vehicleType,
        vehicleNumber: veh.vehicleNumber,
        licenseNumber: veh.licenseNumber,
      };

      mapped.kycDocuments = fillDocumentNumbersFromMaster(
        mapped.kycDocuments,
        doc as Record<string, unknown>,
        mapped.vehicleNumber,
        mapped.licenseNumber
      );

      if (mapped.services.length === 0) {
        const serviceSet = new Set<ServiceId>();
        for (const id of lookupIds) {
          for (const field of ["captainId", "uid", "userId"] as const) {
            try {
              const rows = await getFilteredCollection<
                Record<string, unknown>
              >(
                FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,
                [{ fieldPath: field, operator: "==", value: id }],
                undefined,
                20
              );
              rows.forEach((r) => {
                serviceSet.add(
                  normalizeService(
                    r.serviceId ?? r.serviceType ?? r.service ?? r.type
                  )
                );
              });
            } catch {
              // ignore
            }
          }
        }
        if (serviceSet.size > 0) {
          mapped.services = Array.from(serviceSet);
          mapped.serviceIds = mapped.services;
        }
      }

      setCaptain(mapped);
    } catch (err) {
      console.error("useCaptain error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load captain from Firestore."
      );
    } finally {
      setLoading(false);
    }
  }, [captainId]);

  useEffect(() => {
    void load();
  }, [load]);

  // /**
  //  * KYC Accept / Reject — updates fields JuCaptain reads for dashboard access.
  //  *
  //  * ACCEPT:
  //  *  - verificationStatus / kycStatus → ACTIVE
  //  *  - accountBlockStatus → NONE  (clears PENDING_VERIFICATION gate)
  //  *  - status → ACTIVE
  //  *  - does NOT change availabilityStatus (online is separate)
  //  *
  //  * REJECT:
  //  *  - verificationStatus / kycStatus → REJECTED
  //  *  - accountBlockStatus → PENDING_VERIFICATION
  //  *  - optional reject reason
  //  */
  // const setVerificationStatus = useCallback(
  //   async (next: "ACTIVE" | "REJECTED", reason?: string) => {
  //     if (!captain) throw new Error("Captain not loaded.");
  //     if (isFirestoreDemoMode) {
  //       throw new Error("Writes are disabled in demo mode.");
  //     }

  //     setSaving(true);
  //     try {
  //       const payload: Record<string, unknown> = {
  //         verificationStatus: next,
  //         kycStatus: next,
  //       };

  //       if (next === "ACTIVE") {
  //         // Unblock account for JuCaptain dashboard access
  //         payload.accountBlockStatus = "NONE";
  //         payload.status = "ACTIVE";
  //         payload.verifiedAt = new Date().toISOString();
  //         // Do NOT set availabilityStatus — captain goes online via app CF
  //       } else {
  //         // Rejected: keep out of dashboard until resubmit / re-approve
  //         payload.accountBlockStatus = "PENDING_VERIFICATION";
  //         payload.rejectedAt = new Date().toISOString();
  //         if (reason?.trim()) {
  //           payload.verificationRejectReason = reason.trim();
  //         }
  //       }

  //       await updateDocument(
  //         FIRESTORE_COLLECTIONS.CAPTAINS,
  //         captain.firestoreId,
  //         payload
  //       );

  //       // Mirror status on external document docs when present
  //       for (const d of captain.kycDocuments) {
  //         if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
  //         try {
  //           await updateDocument(
  //             FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
  //             d.documentId,
  //             { status: next, verificationStatus: next }
  //           );
  //         } catch {
  //           // ignore per-doc failures
  //         }
  //       }

  //       setCaptain({
  //         ...captain,
  //         verificationStatus: next,
  //         accountBlockStatus:
  //           next === "ACTIVE" ? "NONE" : "PENDING_VERIFICATION",
  //         status: next === "ACTIVE" ? "ACTIVE" : captain.status,
  //         kycDocuments: captain.kycDocuments.map((d) => ({
  //           ...d,
  //           status: next,
  //         })),
  //         updatedAt: "Just now",
  //       });
  //     } finally {
  //       setSaving(false);
  //     }
  //   },
  //   [captain]
  // );

    /**
   * KYC Accept / Reject — authoritative ERP approval write to captains/{firestoreId}.
   *
   * ACCEPT (eligible Captain only):
   *  - verificationStatus / kycStatus → ACTIVE
   *  - accountBlockStatus → NONE
   *  - availabilityStatus → AVAILABLE   ← required for setCaptainOnlineStatus
   *  - status → ACTIVE
   *  - does NOT set onlineStatus (Captain toggles ONLINE/OFFLINE themselves)
   *
   * REJECT:
   *  - verificationStatus / kycStatus → REJECTED
   *  - availabilityStatus → BLOCKED     ← keeps GO ONLINE blocked
   *  - optional reject reason
   *
   * updatedAt is set by updateDocument via serverTimestamp().
   */
  const setVerificationStatus = useCallback(
    async (next: "ACTIVE" | "REJECTED", reason?: string) => {
      if (!captain) throw new Error("Captain not loaded.");
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }

      setSaving(true);
      try {
        const payload: Record<string, unknown> = {
          verificationStatus: next,
          kycStatus: next,
        };

        if (next === "ACTIVE") {
          payload.accountBlockStatus = "NONE";
          payload.availabilityStatus = "AVAILABLE";
          payload.status = "ACTIVE";
          payload.verifiedAt = new Date().toISOString();
          // Do NOT set onlineStatus — leave OFFLINE until Captain goes online in JuCaptain
        } else {
          payload.availabilityStatus = "BLOCKED";
          payload.rejectedAt = new Date().toISOString();
          if (reason?.trim()) {
            payload.verificationRejectReason = reason.trim();
          }
        }

        await updateDocument(
          FIRESTORE_COLLECTIONS.CAPTAINS,
          captain.firestoreId,
          payload
        );

        for (const d of captain.kycDocuments) {
          if (!d.documentId || d.documentId.startsWith("DOC-")) continue;
          try {
            await updateDocument(
              FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,
              d.documentId,
              { status: next, verificationStatus: next }
            );
          } catch {
            // non-fatal per-doc failure
          }
        }

        setCaptain({
          ...captain,
          verificationStatus: next,
          accountBlockStatus:
            next === "ACTIVE" ? "NONE" : captain.accountBlockStatus,
          availabilityStatus: next === "ACTIVE" ? "AVAILABLE" : "BLOCKED",
          status: next === "ACTIVE" ? "ACTIVE" : captain.status,
          kycDocuments: captain.kycDocuments.map((d) => ({
            ...d,
            status: next,
          })),
          updatedAt: "Just now",
        });
      } finally {
        setSaving(false);
      }
    },
    [captain]
  );

  return {
    captain,
    loading,
    error,
    demoMode,
    saving,
    refresh: load,
    setCaptain,
    setVerificationStatus,
  };
}

export default useCaptains;