/**
 * JUONE / JuERP Firebase Realtime Helpers
 *
 * Realtime Firestore listeners used by JuERP for operational
 * dashboards and live status updates.
 *
 * Canonical realtime topics from the JUONE MSD include:
 *
 * - vendorOrderInbox
 * - captainDispatchFeed
 * - orderStatus
 * - rideStatus
 * - captainLocation
 * - vendorAvailability
 * - catalogAvailability
 * - bookingAvailability
 * - settlementStatus
 * - verificationStatus
 * - ticketStatus
 *
 * Important:
 * - This file only subscribes to realtime data.
 * - Backend remains authoritative for state transitions.
 * - Firestore Security Rules remain the authorization boundary.
 * - Do not calculate financial rules here.
 * - Do not invent fake realtime production data.
 */

import {
  collection,
  doc,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from "firebase/firestore";

import { db } from "./config";
import {
  FIRESTORE_COLLECTIONS,
  isFirestoreDemoMode,
} from "./firestore";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type RealtimeErrorHandler = (
  error: Error,
) => void;

export type RealtimeDocumentHandler<
  T extends DocumentData,
> = (
  document: (T & { id: string }) | null,
) => void;

export type RealtimeCollectionHandler<
  T extends DocumentData,
> = (
  documents: Array<T & { id: string }>,
) => void;

/* -------------------------------------------------------------------------- */
/* Canonical Realtime Topics                                                  */
/* -------------------------------------------------------------------------- */

export const REALTIME_TOPICS = {
  VENDOR_ORDER_INBOX:
    "vendorOrderInbox",

  CAPTAIN_DISPATCH_FEED:
    "captainDispatchFeed",

  ORDER_STATUS:
    "orderStatus",

  RIDE_STATUS:
    "rideStatus",

  CAPTAIN_LOCATION:
    "captainLocation",

  VENDOR_AVAILABILITY:
    "vendorAvailability",

  CATALOG_AVAILABILITY:
    "catalogAvailability",

  BOOKING_AVAILABILITY:
    "bookingAvailability",

  SETTLEMENT_STATUS:
    "settlementStatus",

  VERIFICATION_STATUS:
    "verificationStatus",

  TICKET_STATUS:
    "ticketStatus",
} as const;

export type RealtimeTopic =
  (typeof REALTIME_TOPICS)[keyof typeof REALTIME_TOPICS];

/* -------------------------------------------------------------------------- */
/* Canonical Realtime Collections                                             */
/* -------------------------------------------------------------------------- */

export const REALTIME_COLLECTIONS = {
  ORDERS:
    FIRESTORE_COLLECTIONS.ORDERS,

  RIDES:
    FIRESTORE_COLLECTIONS.RIDES,

  CAPTAINS:
    FIRESTORE_COLLECTIONS.CAPTAINS,

  CAPTAIN_SERVICES:
    FIRESTORE_COLLECTIONS.CAPTAIN_SERVICES,

  CAPTAIN_DOCUMENTS:
    FIRESTORE_COLLECTIONS.CAPTAIN_DOCUMENTS,

  VENDORS:
    FIRESTORE_COLLECTIONS.VENDORS,

  VENDOR_MODULES:
    FIRESTORE_COLLECTIONS.VENDOR_MODULES,

  VENDOR_CATALOGS:
    FIRESTORE_COLLECTIONS.VENDOR_CATALOGS,

  BOOKINGS:
    FIRESTORE_COLLECTIONS.BOOKINGS,

  SETTLEMENTS:
    FIRESTORE_COLLECTIONS.SETTLEMENTS,

  VENDOR_DOCUMENTS:
    FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,

  SUPPORT_TICKETS:
    FIRESTORE_COLLECTIONS.SUPPORT_TICKETS,
} as const;

/* -------------------------------------------------------------------------- */
/* Snapshot Helpers                                                           */
/* -------------------------------------------------------------------------- */

// function mapDocumentSnapshot<
//   T extends DocumentData,
// >(
//   snapshot: {
//     exists: () => boolean;
//     id: string;
//     data: () => T;
//   },
// ): (T & { id: string }) | null {
//   if (!snapshot.exists()) {
//     return null;
//   }

//   return {
//     id: snapshot.id,
//     ...snapshot.data(),
//   };
// }

function mapDocumentSnapshot<T extends DocumentData>(
  snapshot: {
    exists: () => boolean;
    id: string;
    data: () => DocumentData | undefined;
  }
): (T & { id: string }) | null {
  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data() ?? {};

  return {
    id: snapshot.id,
    ...(data as T),
  };
}

// function mapQuerySnapshot<
//   T extends DocumentData,
// >(
//   snapshot: {
//     docs: Array<{
//       id: string;
//       data: () => T;
//     }>;
//   },
// ): Array<T & { id: string }> {
//   return snapshot.docs.map(
//     (document) => ({
//       id: document.id,
//       ...document.data(),
//     }),
//   );
// }

function mapQuerySnapshot<T extends DocumentData>(
  snapshot: {
    docs: Array<{
      id: string;
      data: () => DocumentData | undefined;
    }>;
  }
): Array<T & { id: string }> {
  return snapshot.docs.map((document) => {
    const data = document.data() ?? {};
    return {
      id: document.id,
      ...(data as T),
    };
  });
}


/* -------------------------------------------------------------------------- */
/* Error Helper                                                               */
/* -------------------------------------------------------------------------- */

function normalizeRealtimeError(
  error: unknown,
): Error {
  if (error instanceof Error) {
    return error;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    const message =
      (error as { message?: unknown })
        .message;

    if (typeof message === "string") {
      return new Error(message);
    }
  }

  return new Error(
    "Realtime Firestore subscription failed.",
  );
}

/* -------------------------------------------------------------------------- */
/* Document Listener                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a single Firestore document.
 *
 * This is useful for topics such as:
 *
 * - orderStatus
 * - rideStatus
 * - settlementStatus
 * - verificationStatus
 * - ticketStatus
 */
export function subscribeToRealtimeDocument<
  T extends DocumentData,
>(
  collectionName:
    | keyof typeof REALTIME_COLLECTIONS
    | string,
  documentId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  if (!documentId.trim()) {
    throw new Error(
      "Realtime document ID is required.",
    );
  }

  if (isFirestoreDemoMode) {
    callback(null);

    return () => {
      // Demo mode has no Firestore listener.
    };
  }

  const resolvedCollection =
    resolveRealtimeCollection(
      collectionName,
    );

  const documentReference = doc(
    db,
    resolvedCollection,
    documentId,
  );

  return onSnapshot(
    documentReference,
    (snapshot) => {
      callback(
        mapDocumentSnapshot<T>(
          snapshot,
        ),
      );
    },
    (error) => {
      onError?.(
        normalizeRealtimeError(error),
      );
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Collection Listener                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to an entire Firestore collection.
 */
export function subscribeToRealtimeCollection<
  T extends DocumentData,
>(
  collectionName:
    | keyof typeof REALTIME_COLLECTIONS
    | string,
  callback: RealtimeCollectionHandler<T>,
  constraints: QueryConstraint[] = [],
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  if (isFirestoreDemoMode) {
    callback([]);

    return () => {
      // Demo mode has no Firestore listener.
    };
  }

  const resolvedCollection =
    resolveRealtimeCollection(
      collectionName,
    );

  const collectionReference =
    collection(
      db,
      resolvedCollection,
    );

  const firestoreQuery =
    query(
      collectionReference,
      ...constraints,
    );

  return onSnapshot(
    firestoreQuery,
    (snapshot) => {
      callback(
        mapQuerySnapshot<T>(
          snapshot,
        ),
      );
    },
    (error) => {
      onError?.(
        normalizeRealtimeError(error),
      );
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Filtered Collection Listener                                               */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a filtered Firestore collection.
 */
export function subscribeToFilteredCollection<
  T extends DocumentData,
>(
  collectionName:
    | keyof typeof REALTIME_COLLECTIONS
    | string,
  filters: QueryConstraint[],
  callback: RealtimeCollectionHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeCollection<T>(
    collectionName,
    callback,
    filters,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Order Status                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a specific order.
 *
 * Backend is authoritative for the order state machine.
 */
export function subscribeToOrderStatus<
  T extends DocumentData,
>(
  orderId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.ORDERS,
    orderId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Vendor Order Inbox                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to orders belonging to a vendor.
 *
 * The backend/Firestore rules must ensure that the caller
 * can access the requested vendor.
 */
export function subscribeToVendorOrderInbox<
  T extends DocumentData,
>(
  vendorId: string,
  callback: RealtimeCollectionHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  if (!vendorId.trim()) {
    throw new Error(
      "Vendor ID is required.",
    );
  }

  return subscribeToRealtimeCollection<T>(
    FIRESTORE_COLLECTIONS.ORDERS,
    callback,
    [
      where(
        "vendorId",
        "==",
        vendorId,
      ),
    ],
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Captain Dispatch Feed                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to delivery/job records associated with a captain.
 *
 * This helper does not assign a captain.
 * Assignment remains a backend-authoritative operation.
 */
export function subscribeToCaptainDispatchFeed<
  T extends DocumentData,
>(
  captainId: string,
  callback: RealtimeCollectionHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  if (!captainId.trim()) {
    throw new Error(
      "Captain ID is required.",
    );
  }

  return subscribeToRealtimeCollection<T>(
    FIRESTORE_COLLECTIONS.DELIVERIES,
    callback,
    [
      where(
        "captainId",
        "==",
        captainId,
      ),
    ],
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Ride Status                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a specific ride.
 */
export function subscribeToRideStatus<
  T extends DocumentData,
>(
  rideId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.RIDES,
    rideId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Captain Location                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a captain's realtime location document.
 *
 * The MSD location contract includes:
 *
 * captainId
 * latitude
 * longitude
 * accuracyMeters
 * heading (optional)
 * speedKmh (optional)
 * onlineStatus
 * availabilityStatus
 * updatedAt
 *
 * This helper only reads the data.
 */
export function subscribeToCaptainLocation<
  T extends DocumentData,
>(
  captainId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  if (!captainId.trim()) {
    throw new Error(
      "Captain ID is required.",
    );
  }

  /**
   * The MSD describes captain_locations/{captainId}
   * as the captain location contract.
   *
   * It is intentionally addressed directly rather than
   * inventing a different collection name.
   */
  const documentReference = doc(
    db,
    "captain_locations",
    captainId,
  );

  if (isFirestoreDemoMode) {
    callback(null);

    return () => {
      // Demo mode has no realtime listener.
    };
  }

  return onSnapshot(
    documentReference,
    (snapshot) => {
      callback(
        mapDocumentSnapshot<T>(
          snapshot,
        ),
      );
    },
    (error) => {
      onError?.(
        normalizeRealtimeError(error),
      );
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Vendor Availability                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a vendor's availability record.
 */
export function subscribeToVendorAvailability<
  T extends DocumentData,
>(
  vendorId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.VENDORS,
    vendorId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Catalog Availability                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a vendor catalog.
 */
export function subscribeToCatalogAvailability<
  T extends DocumentData,
>(
  catalogId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.VENDOR_CATALOGS,
    catalogId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Booking Availability                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a booking.
 */
export function subscribeToBookingAvailability<
  T extends DocumentData,
>(
  bookingId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.BOOKINGS,
    bookingId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Settlement Status                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a settlement.
 *
 * Financial values are read-only here.
 * Settlement calculations and payout decisions remain
 * backend/ERP authoritative.
 */
export function subscribeToSettlementStatus<
  T extends DocumentData,
>(
  settlementId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.SETTLEMENTS,
    settlementId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Verification Status                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to vendor verification status.
 */
export function subscribeToVendorVerification<
  T extends DocumentData,
>(
  vendorId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.VENDORS,
    vendorId,
    callback,
    onError,
  );
}

/**
 * Subscribe to captain verification status.
 */
export function subscribeToCaptainVerification<
  T extends DocumentData,
>(
  captainId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.CAPTAINS,
    captainId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Ticket Status                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Subscribe to a support ticket.
 *
 * Canonical ticket lifecycle is handled by the backend.
 */
export function subscribeToTicketStatus<
  T extends DocumentData,
>(
  ticketId: string,
  callback: RealtimeDocumentHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  return subscribeToRealtimeDocument<T>(
    FIRESTORE_COLLECTIONS.SUPPORT_TICKETS,
    ticketId,
    callback,
    onError,
  );
}

/* -------------------------------------------------------------------------- */
/* Generic Topic Subscription                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Maps a canonical realtime topic to its corresponding
 * Firestore subscription.
 *
 * Only topics that have a direct document/collection
 * representation are handled here.
 */
export function subscribeToTopic<
  T extends DocumentData,
>(
  topic: RealtimeTopic,
  identifier: string,
  callback:
    | RealtimeDocumentHandler<T>
    | RealtimeCollectionHandler<T>,
  onError?: RealtimeErrorHandler,
): Unsubscribe {
  switch (topic) {
    case REALTIME_TOPICS.ORDER_STATUS:
      return subscribeToOrderStatus<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.RIDE_STATUS:
      return subscribeToRideStatus<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.CAPTAIN_LOCATION:
      return subscribeToCaptainLocation<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.VENDOR_AVAILABILITY:
      return subscribeToVendorAvailability<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.CATALOG_AVAILABILITY:
      return subscribeToCatalogAvailability<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.BOOKING_AVAILABILITY:
      return subscribeToBookingAvailability<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.SETTLEMENT_STATUS:
      return subscribeToSettlementStatus<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.VERIFICATION_STATUS:
      return subscribeToVendorVerification<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.TICKET_STATUS:
      return subscribeToTicketStatus<T>(
        identifier,
        callback as RealtimeDocumentHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.VENDOR_ORDER_INBOX:
      return subscribeToVendorOrderInbox<T>(
        identifier,
        callback as RealtimeCollectionHandler<T>,
        onError,
      );

    case REALTIME_TOPICS.CAPTAIN_DISPATCH_FEED:
      return subscribeToCaptainDispatchFeed<T>(
        identifier,
        callback as RealtimeCollectionHandler<T>,
        onError,
      );

    default:
      throw new Error(
        `Realtime topic "${topic}" is not supported by this helper.`,
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Collection Resolver                                                        */
/* -------------------------------------------------------------------------- */

function resolveRealtimeCollection(
  collectionName:
    | keyof typeof REALTIME_COLLECTIONS
    | string,
): string {
  if (
    collectionName in
    REALTIME_COLLECTIONS
  ) {
    return REALTIME_COLLECTIONS[
      collectionName as keyof typeof REALTIME_COLLECTIONS
    ];
  }

  return collectionName;
}

/* -------------------------------------------------------------------------- */
/* Export                                                                     */
/* -------------------------------------------------------------------------- */

export default {
  REALTIME_TOPICS,
  REALTIME_COLLECTIONS,
  subscribeToRealtimeDocument,
  subscribeToRealtimeCollection,
  subscribeToFilteredCollection,
  subscribeToOrderStatus,
  subscribeToVendorOrderInbox,
  subscribeToCaptainDispatchFeed,
  subscribeToRideStatus,
  subscribeToCaptainLocation,
  subscribeToVendorAvailability,
  subscribeToCatalogAvailability,
  subscribeToBookingAvailability,
  subscribeToSettlementStatus,
  subscribeToVendorVerification,
  subscribeToCaptainVerification,
  subscribeToTicketStatus,
  subscribeToTopic,
};