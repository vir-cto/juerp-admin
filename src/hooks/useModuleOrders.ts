// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
//   onSnapshot,
//   type QueryConstraint,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config"; // adjust path to your firestore init
// import type { CustomerModuleId } from "@/lib/constants/modules";

// export interface ModuleOrderSummary {
//   orderId: string;
//   userId: string;
//   moduleId: CustomerModuleId;
//   status: string;
//   paymentStatus?: string;
//   vendorIds?: string[];
//   totalPaise: number;
//   stateId?: string;
//   districtId?: string;
//   createdAt?: Date | null;
//   updatedAt?: Date | null;
// }

// interface UseModuleOrdersOptions {
//   moduleId: CustomerModuleId;
//   status?: string;
//   max?: number;
//   realtime?: boolean;
// }

// export function useModuleOrders(options: UseModuleOrdersOptions) {
//   const { moduleId, status, max = 50, realtime = true } = options;

//   const [orders, setOrders] = useState<ModuleOrderSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const mapDoc = (id: string, data: Record<string, unknown>): ModuleOrderSummary => ({
//     orderId: (data.orderId as string) || id,
//     userId: (data.userId as string) || "",
//     moduleId: (data.moduleId as CustomerModuleId) || moduleId,
//     status: (data.status as string) || "CREATED",
//     paymentStatus: data.paymentStatus as string | undefined,
//     vendorIds: (data.vendorIds as string[]) || [],
//     totalPaise: Number(data.totalPaise ?? 0),
//     stateId: data.stateId as string | undefined,
//     districtId: data.districtId as string | undefined,
//     createdAt: data.createdAt
//       ? (data.createdAt as { toDate?: () => Date }).toDate?.() ?? new Date(data.createdAt as string)
//       : null,
//     updatedAt: data.updatedAt
//       ? (data.updatedAt as { toDate?: () => Date }).toDate?.() ?? new Date(data.updatedAt as string)
//       : null,
//   });

//   const buildQuery = useCallback(() => {
//     const constraints: QueryConstraint[] = [
//       where("moduleId", "==", moduleId),
//       orderBy("createdAt", "desc"),
//       limit(max),
//     ];
//     if (status) {
//       constraints.splice(1, 0, where("status", "==", status));
//     }
//     return query(collection(db, "orders"), ...constraints);
//   }, [moduleId, status, max]);

//   const refresh = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const snap = await getDocs(buildQuery());
//       setOrders(snap.docs.map((d) => mapDoc(d.id, d.data())));
//     } catch (err) {
//       console.error("useModuleOrders error:", err);
//       setError(err instanceof Error ? err.message : "Failed to load orders");
//     } finally {
//       setLoading(false);
//     }
//   }, [buildQuery]);

//   useEffect(() => {
//     if (!realtime) {
//       void refresh();
//       return;
//     }

//     setLoading(true);
//     const unsub = onSnapshot(
//       buildQuery(),
//       (snap) => {
//         setOrders(snap.docs.map((d) => mapDoc(d.id, d.data())));
//         setLoading(false);
//         setError(null);
//       },
//       (err) => {
//         console.error("useModuleOrders snapshot error:", err);
//         setError(err.message);
//         setLoading(false);
//       },
//     );

//     return () => unsub();
//   }, [buildQuery, realtime, refresh]);

//   return { orders, loading, error, refresh };
// }

// "use client";

// import { useCallback, useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   getDocs,
//   onSnapshot,
//   type QueryConstraint,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import type { CustomerModuleId } from "@/lib/constants/modules";

// export interface ModuleOrderSummary {
//   orderId: string;
//   userId: string;
//   moduleId: CustomerModuleId;
//   status: string;
//   paymentStatus?: string;
//   vendorIds?: string[];
//   totalPaise: number;
//   stateId?: string;
//   districtId?: string;
//   createdAt?: Date | null;
//   updatedAt?: Date | null;
// }

// interface UseModuleOrdersOptions {
//   moduleId: CustomerModuleId;
//   status?: string;
//   max?: number;
//   realtime?: boolean;
// }

// function mapDoc(id: string, data: Record<string, unknown>, moduleId: CustomerModuleId): ModuleOrderSummary {
//   return {
//     orderId: (data.orderId as string) || id,
//     userId: (data.userId as string) || "",
//     moduleId: (data.moduleId as CustomerModuleId) || moduleId,
//     status: (data.status as string) || "CREATED",
//     paymentStatus: data.paymentStatus as string | undefined,
//     vendorIds: (data.vendorIds as string[]) || [],
//     totalPaise: Number(data.totalPaise ?? 0),
//     stateId: data.stateId as string | undefined,
//     districtId: data.districtId as string | undefined,
//     createdAt: data.createdAt
//       ? (data.createdAt as { toDate?: () => Date }).toDate?.() ?? new Date(data.createdAt as string)
//       : null,
//     updatedAt: data.updatedAt
//       ? (data.updatedAt as { toDate?: () => Date }).toDate?.() ?? new Date(data.updatedAt as string)
//       : null,
//   };
// }

// function isIndexError(err: unknown): boolean {
//   const msg = err instanceof Error ? err.message : String(err);
//   return (
//     msg.includes("requires an index") ||
//     msg.includes("failed-precondition") ||
//     msg.includes("The query requires an index")
//   );
// }

// export function useModuleOrders(options: UseModuleOrdersOptions) {
//   const { moduleId, status, max = 50, realtime = true } = options;

//   const [orders, setOrders] = useState<ModuleOrderSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchOnce = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // 1) Preferred query (needs composite index)
//       const constraints: QueryConstraint[] = [
//         where("moduleId", "==", moduleId),
//         orderBy("createdAt", "desc"),
//         limit(max),
//       ];
//       if (status) constraints.splice(1, 0, where("status", "==", status));

//       const snap = await getDocs(query(collection(db, "orders"), ...constraints));
//       setOrders(snap.docs.map((d) => mapDoc(d.id, d.data(), moduleId)));
//     } catch (err) {
//       if (isIndexError(err)) {
//         // 2) Fallback – no orderBy, sort in memory (works with zero docs)
//         try {
//           const fallbackConstraints: QueryConstraint[] = [
//             where("moduleId", "==", moduleId),
//             limit(max),
//           ];
//           if (status) fallbackConstraints.push(where("status", "==", status));

//           const snap = await getDocs(
//             query(collection(db, "orders"), ...fallbackConstraints),
//           );
//           const mapped = snap.docs
//             .map((d) => mapDoc(d.id, d.data(), moduleId))
//             .sort(
//               (a, b) =>
//                 (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
//             );
//           setOrders(mapped);
//           // Soft warning only – page stays usable
//           setError(
//             "Firestore index missing for moduleId + createdAt. Using client-side sort. Create the index for best performance.",
//           );
//         } catch (fallbackErr) {
//           console.error("useModuleOrders fallback error:", fallbackErr);
//           setOrders([]);
//           setError(
//             fallbackErr instanceof Error
//               ? fallbackErr.message
//               : "Failed to load orders",
//           );
//         }
//       } else {
//         console.error("useModuleOrders error:", err);
//         setOrders([]);
//         setError(err instanceof Error ? err.message : "Failed to load orders");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }, [moduleId, status, max]);

//   useEffect(() => {
//     // Always start with a one-shot fetch (safe even without index)
//     void fetchOnce();

//     if (!realtime) return;

//     // Realtime only when index is ready – otherwise we already have data from fetchOnce
//     const constraints: QueryConstraint[] = [
//       where("moduleId", "==", moduleId),
//       orderBy("createdAt", "desc"),
//       limit(max),
//     ];
//     if (status) constraints.splice(1, 0, where("status", "==", status));

//     const unsub = onSnapshot(
//       query(collection(db, "orders"), ...constraints),
//       (snap) => {
//         setOrders(snap.docs.map((d) => mapDoc(d.id, d.data(), moduleId)));
//         setLoading(false);
//         setError(null); // clear the soft index warning once realtime works
//       },
//       (err) => {
//         // Ignore index errors in listener – we already have fallback data
//         if (!isIndexError(err)) {
//           console.error("useModuleOrders snapshot error:", err);
//           setError(err.message);
//         }
//       },
//     );

//     return () => unsub();
//   }, [moduleId, status, max, realtime, fetchOnce]);

//   return { orders, loading, error, refresh: fetchOnce };
// }

// src/hooks/useModuleOrders.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { CustomerModuleId } from "@/lib/constants/modules";

export interface ModuleOrderSummary {
  orderId: string;
  userId: string;
  moduleId: CustomerModuleId;
  status: string;
  paymentStatus?: string;
  vendorIds?: string[];
  totalPaise: number;
  stateId?: string;
  districtId?: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

interface Options {
  moduleId: CustomerModuleId;
  max?: number;
}

export function useModuleOrders({ moduleId, max = 50 }: Options) {
  const [orders, setOrders] = useState<ModuleOrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => {
    // realtime listener already keeps data live; this is just a no-op trigger
    setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "orders"),
      where("moduleId", "==", moduleId),
      limit(max),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: ModuleOrderSummary[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            orderId: (data.orderId as string) || d.id,
            userId: (data.userId as string) || "",
            moduleId: (data.moduleId as CustomerModuleId) || moduleId,
            status: (data.status as string) || "CREATED",
            paymentStatus: data.paymentStatus as string | undefined,
            vendorIds: (data.vendorIds as string[]) || [],
            totalPaise: Number(data.totalPaise ?? 0),
            stateId: data.stateId as string | undefined,
            districtId: data.districtId as string | undefined,
            createdAt: data.createdAt?.toDate?.() ?? null,
            updatedAt: data.updatedAt?.toDate?.() ?? null,
          };
        });

        // client-side sort (newest first) – no composite index needed
        list.sort(
          (a, b) =>
            (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0),
        );

        setOrders(list);
        setLoading(false);
      },
      (err) => {
        console.error("useModuleOrders:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [moduleId, max]);

  return { orders, loading, error, refresh };
}