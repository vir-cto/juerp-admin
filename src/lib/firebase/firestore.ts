/**
 * JUONE / JuERP Firestore Helpers
 *
 * Firebase Cloud Firestore access helpers for JuERP.
 *
 * Important:
 * - Firestore security rules remain the security boundary.
 * - Backend validation is authoritative for business-critical
 *   operations.
 * - Financial values must come from trusted backend data.
 * - Do not calculate commission, settlement, payout, tax,
 *   platform margin, or other ERP-authoritative financial
 *   values in this file.
 * - Use canonical JUONE collection names.
 */

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type DocumentData,
  type DocumentSnapshot,
  type QueryConstraint,
  type QuerySnapshot,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "./config";

/* -------------------------------------------------------------------------- */
/* Canonical Collections                                                      */
/* -------------------------------------------------------------------------- */

export const FIRESTORE_COLLECTIONS = {
  USERS: "users",
  USER_PROFILES: "user_profiles",

  VENDORS: "vendors",
  VENDOR_DOCUMENTS: "vendor_documents",
  VENDOR_MODULES: "vendor_modules",
  VENDOR_CATALOGS: "vendor_catalogs",
  VENDOR_INVENTORY: "vendor_inventory",

  CAPTAINS: "captains",
  CAPTAIN_SERVICES: "captain_services",
  CAPTAIN_DOCUMENTS: "captain_documents",
  CAPTAIN_VEHICLES: "captain_vehicles", // add this

  ORDERS: "orders",
  ORDER_ITEMS: "order_items",

  BOOKINGS: "bookings",
  RIDES: "rides",
  DELIVERIES: "deliveries",

  PAYMENTS: "payments",
  CASHFREE_EVENTS: "cashfree_events",

  SETTLEMENTS: "settlements",
  LEDGER_ENTRIES: "ledger_entries",
  REFUNDS: "refunds",

  NOTIFICATIONS: "notifications",
  SUPPORT_TICKETS: "support_tickets",

  AUDIT_LOGS: "audit_logs",

  STATES: "states",
  DISTRICTS: "districts",
  PINCODES: "pincodes",
  CLUSTERS: "clusters",
  ZONES: "zones",

  COMMISSION_RULES: "commission_rules",
  COMMISSION_OVERRIDES: "commission_overrides",
  VENDOR_COMMISSION_RATES: "vendor_commission_rates",

  DISPATCH_OVERRIDES: "dispatch_overrides",
  SUSPENSION_OVERRIDES: "suspension_overrides",
  CANCELLATION_OVERRIDES: "cancellation_overrides",

  APP_CONFIGS: "app_configs",
  FEATURE_FLAGS: "feature_flags",
} as const;

export type FirestoreCollectionName =
  (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];

/* -------------------------------------------------------------------------- */
/* Generic Types                                                              */
/* -------------------------------------------------------------------------- */

export type FirestoreDocument = {
  id: string;
  [key: string]: unknown;
};

export type FirestoreWriteData =
  Record<string, unknown>;

export type FirestoreWhereFilter = {
  fieldPath: string;
  operator:
    | "=="
    | "!="
    | "<"
    | "<="
    | ">"
    | ">="
    | "array-contains"
    | "array-contains-any"
    | "in"
    | "not-in";
  value: unknown;
};

export type FirestoreOrderBy = {
  fieldPath: string;
  direction?: "asc" | "desc";
};

/* -------------------------------------------------------------------------- */
/* Demo Mode                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Demo mode is useful for opening the JuERP UI without requiring
 * live Firestore data.
 *
 * It must not be treated as a production data source.
 */
export const isFirestoreDemoMode =
  process.env.NEXT_PUBLIC_DEMO_MODE ===
  "true";

/* -------------------------------------------------------------------------- */
/* Collection Reference                                                       */
/* -------------------------------------------------------------------------- */

export function getCollectionRef(
  collectionName: FirestoreCollectionName,
) {
  return collection(
    db,
    collectionName,
  );
}

/* -------------------------------------------------------------------------- */
/* Document Reference                                                         */
/* -------------------------------------------------------------------------- */

export function getDocumentRef(
  collectionName: FirestoreCollectionName,
  documentId: string,
) {
  if (!documentId.trim()) {
    throw new Error(
      "Firestore document ID is required.",
    );
  }

  return doc(
    db,
    collectionName,
    documentId,
  );
}

/* -------------------------------------------------------------------------- */
/* Get One Document                                                           */
/* -------------------------------------------------------------------------- */

export async function getDocument<T extends DocumentData>(
  collectionName: FirestoreCollectionName,
  documentId: string,
): Promise<(T & { id: string }) | null> {
  if (isFirestoreDemoMode) {
    return null;
  }

  const documentReference =
    getDocumentRef(
      collectionName,
      documentId,
    );

  const snapshot =
    await getDoc(documentReference);

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as T),
  };
}

/* -------------------------------------------------------------------------- */
/* Get Collection                                                             */
/* -------------------------------------------------------------------------- */

export async function getCollection<
  T extends DocumentData,
>(
  collectionName: FirestoreCollectionName,
  constraints: QueryConstraint[] = [],
): Promise<Array<T & { id: string }>> {
  if (isFirestoreDemoMode) {
    return [];
  }

  const collectionReference =
    getCollectionRef(collectionName);

  const firestoreQuery =
    query(
      collectionReference,
      ...constraints,
    );

  const snapshot =
    await getDocs(firestoreQuery);

  return snapshot.docs.map(
    (document) => ({
      id: document.id,
      ...(document.data() as T),
    }),
  );
}

/* -------------------------------------------------------------------------- */
/* Create Document                                                            */
/* -------------------------------------------------------------------------- */

export async function createDocument<
  T extends FirestoreWriteData,
>(
  collectionName: FirestoreCollectionName,
  data: T,
): Promise<string> {
  if (isFirestoreDemoMode) {
    throw new Error(
      "Firestore writes are disabled in demo mode.",
    );
  }

  const collectionReference =
    getCollectionRef(collectionName);

  const documentReference =
    await addDoc(
      collectionReference,
      {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
    );

  return documentReference.id;
}

/* -------------------------------------------------------------------------- */
/* Create Document With ID                                                    */
/* -------------------------------------------------------------------------- */

export async function createDocumentWithId<
  T extends FirestoreWriteData,
>(
  collectionName: FirestoreCollectionName,
  documentId: string,
  data: T,
): Promise<void> {
  if (isFirestoreDemoMode) {
    throw new Error(
      "Firestore writes are disabled in demo mode.",
    );
  }

  const documentReference =
    getDocumentRef(
      collectionName,
      documentId,
    );

  await setDoc(
    documentReference,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Update Document                                                             */
/* -------------------------------------------------------------------------- */

export async function updateDocument<
  T extends FirestoreWriteData,
>(
  collectionName: FirestoreCollectionName,
  documentId: string,
  data: T,
): Promise<void> {
  if (isFirestoreDemoMode) {
    throw new Error(
      "Firestore writes are disabled in demo mode.",
    );
  }

  const documentReference =
    getDocumentRef(
      collectionName,
      documentId,
    );

  await updateDoc(
    documentReference,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Delete Document                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Deletion should normally be restricted to trusted backend
 * workflows for production JuERP data.
 */
export async function deleteDocument(
  collectionName: FirestoreCollectionName,
  documentId: string,
): Promise<void> {
  if (isFirestoreDemoMode) {
    throw new Error(
      "Firestore writes are disabled in demo mode.",
    );
  }

  const documentReference =
    getDocumentRef(
      collectionName,
      documentId,
    );

  await deleteDoc(
    documentReference,
  );
}

/* -------------------------------------------------------------------------- */
/* Query Helpers                                                              */
/* -------------------------------------------------------------------------- */

export function createWhereConstraint(
  filter: FirestoreWhereFilter,
): QueryConstraint {
  return where(
    filter.fieldPath,
    filter.operator,
    filter.value,
  );
}

export function createOrderByConstraint(
  sorting: FirestoreOrderBy,
): QueryConstraint {
  return orderBy(
    sorting.fieldPath,
    sorting.direction ?? "asc",
  );
}

export function createLimitConstraint(
  maximum: number,
): QueryConstraint {
  if (
    !Number.isInteger(maximum) ||
    maximum <= 0
  ) {
    throw new Error(
      "Firestore query limit must be a positive integer.",
    );
  }

  return limit(maximum);
}

/* -------------------------------------------------------------------------- */
/* Filtered Collection                                                        */
/* -------------------------------------------------------------------------- */

export async function getFilteredCollection<
  T extends DocumentData,
>(
  collectionName: FirestoreCollectionName,
  filters: FirestoreWhereFilter[] = [],
  sorting?: FirestoreOrderBy,
  maximum?: number,
): Promise<Array<T & { id: string }>> {
  if (isFirestoreDemoMode) {
    return [];
  }

  const constraints: QueryConstraint[] =
    filters.map(
      createWhereConstraint,
    );

  if (sorting) {
    constraints.push(
      createOrderByConstraint(
        sorting,
      ),
    );
  }

  if (maximum !== undefined) {
    constraints.push(
      createLimitConstraint(
        maximum,
      ),
    );
  }

  return getCollection<T>(
    collectionName,
    constraints,
  );
}

/* -------------------------------------------------------------------------- */
/* Snapshot Mapping                                                           */
/* -------------------------------------------------------------------------- */

// export function mapDocumentSnapshot<
//   T extends DocumentData,
// >(
//   snapshot: DocumentSnapshot<T>,
// ): (T & { id: string }) | null {
//   if (!snapshot.exists()) {
//     return null;
//   }

//   return {
//     id: snapshot.id,
//     ...snapshot.data(),
//   };
// }

export function mapDocumentSnapshot<
  T extends DocumentData,
>(
  snapshot: DocumentSnapshot,          // ← remove <T>
): (T & { id: string }) | null {
  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as T),
  };
}

// export function mapQuerySnapshot<
//   T extends DocumentData,
// >(
//   snapshot: QuerySnapshot<T>,
// ): Array<T & { id: string }> {
//   return snapshot.docs.map(
//     (document) => ({
//       id: document.id,
//       ...document.data(),
//     }),
//   );
// }

export function mapQuerySnapshot<
  T extends DocumentData,
>(
  snapshot: QuerySnapshot,             // ← remove <T>
): Array<T & { id: string }> {
  return snapshot.docs.map((document) => ({
    id: document.id,
    ...(document.data() as T),
  }));
}

/* -------------------------------------------------------------------------- */
/* Realtime Document Listener                                                 */
/* -------------------------------------------------------------------------- */

// export function subscribeToDocument<
//   T extends DocumentData,
// >(
//   collectionName: FirestoreCollectionName,
//   documentId: string,
//   callback: (
//     document: (T & { id: string }) | null,
//   ) => void,
//   onError?: (error: Error) => void,
// ): Unsubscribe {
//   if (isFirestoreDemoMode) {
//     callback(null);

//     return () => {
//       // No realtime listener in demo mode.
//     };
//   }

//   const documentReference =
//     getDocumentRef(
//       collectionName,
//       documentId,
//     );

//   return onSnapshot(
//     documentReference,
//     (snapshot) => {
//       callback(
//         mapDocumentSnapshot<T>(
//           snapshot,
//         ),
//       );
//     },
//     (error) => {
//       onError?.(error);
//     },
//   );
// }

export function subscribeToDocument<
  T extends DocumentData,
>(
  collectionName: FirestoreCollectionName,
  documentId: string,
  callback: (
    document: (T & { id: string }) | null,
  ) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (isFirestoreDemoMode) {
    callback(null);
    return () => {
      // No realtime listener in demo mode.
    };
  }

  const documentReference = getDocumentRef(
    collectionName,
    documentId,
  );

  return onSnapshot(
    documentReference,
    (snapshot) => {
      callback(mapDocumentSnapshot<T>(snapshot));
    },
    (error) => {
      onError?.(error);
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Realtime Collection Listener                                               */
/* -------------------------------------------------------------------------- */

// export function subscribeToCollection<
//   T extends DocumentData,
// >(
//   collectionName: FirestoreCollectionName,
//   constraints: QueryConstraint[],
//   callback: (
//     documents: Array<T & { id: string }>,
//   ) => void,
//   onError?: (error: Error) => void,
// ): Unsubscribe {
//   if (isFirestoreDemoMode) {
//     callback([]);

//     return () => {
//       // No realtime listener in demo mode.
//     };
//   }

//   const collectionReference =
//     getCollectionRef(collectionName);

//   const firestoreQuery =
//     query(
//       collectionReference,
//       ...constraints,
//     );

//   return onSnapshot(
//     firestoreQuery,
//     (snapshot) => {
//       callback(
//         mapQuerySnapshot<T>(
//           snapshot,
//         ),
//       );
//     },
//     (error) => {
//       onError?.(error);
//     },
//   );
// }

export function subscribeToCollection<
  T extends DocumentData,
>(
  collectionName: FirestoreCollectionName,
  constraints: QueryConstraint[],
  callback: (
    documents: Array<T & { id: string }>,
  ) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (isFirestoreDemoMode) {
    callback([]);
    return () => {
      // No realtime listener in demo mode.
    };
  }

  const collectionReference = getCollectionRef(collectionName);

  const firestoreQuery = query(
    collectionReference,
    ...constraints,
  );

  return onSnapshot(
    firestoreQuery,
    (snapshot) => {
      callback(mapQuerySnapshot<T>(snapshot));
    },
    (error) => {
      onError?.(error);
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Common JUONE Collection Helpers                                             */
/* -------------------------------------------------------------------------- */

/**
 * Get a user by userId.
 */
export async function getUser<
  T extends DocumentData,
>(
  userId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.USERS,
    userId,
  );
}

/**
 * Get a vendor by vendorId.
 */
export async function getVendor<
  T extends DocumentData,
>(
  vendorId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.VENDORS,
    vendorId,
  );
}

/**
 * Get a captain by captainId.
 */
export async function getCaptain<
  T extends DocumentData,
>(
  captainId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.CAPTAINS,
    captainId,
  );
}

/**
 * Get an order by orderId.
 */
export async function getOrder<
  T extends DocumentData,
>(
  orderId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.ORDERS,
    orderId,
  );
}

/**
 * Get a booking by bookingId.
 */
export async function getBooking<
  T extends DocumentData,
>(
  bookingId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.BOOKINGS,
    bookingId,
  );
}

/**
 * Get a ride by rideId.
 */
export async function getRide<
  T extends DocumentData,
>(
  rideId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.RIDES,
    rideId,
  );
}

/**
 * Get a delivery by deliveryId.
 */
export async function getDelivery<
  T extends DocumentData,
>(
  deliveryId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.DELIVERIES,
    deliveryId,
  );
}

/**
 * Get a settlement by settlementId.
 */
export async function getSettlement<
  T extends DocumentData,
>(
  settlementId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.SETTLEMENTS,
    settlementId,
  );
}

/**
 * Get a payment by paymentId.
 */
export async function getPayment<
  T extends DocumentData,
>(
  paymentId: string,
): Promise<(T & { id: string }) | null> {
  return getDocument<T>(
    FIRESTORE_COLLECTIONS.PAYMENTS,
    paymentId,
  );
}

/* -------------------------------------------------------------------------- */
/* Export                                                                      */
/* -------------------------------------------------------------------------- */

export default {
  FIRESTORE_COLLECTIONS,
  isFirestoreDemoMode,
  getCollectionRef,
  getDocumentRef,
  getDocument,
  getCollection,
  createDocument,
  createDocumentWithId,
  updateDocument,
  deleteDocument,
  createWhereConstraint,
  createOrderByConstraint,
  createLimitConstraint,
  getFilteredCollection,
  mapDocumentSnapshot,
  mapQuerySnapshot,
  subscribeToDocument,
  subscribeToCollection,
  getUser,
  getVendor,
  getCaptain,
  getOrder,
  getBooking,
  getRide,
  getDelivery,
  getSettlement,
  getPayment,
};