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
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import { MODULE_JUSHOPPING } from "@/lib/constants/modules";

// export interface CatalogItemSummary {
//   catalogItemId: string;
//   vendorId: string;
//   name: string;
//   sellingPricePaise: number;
//   mrpPaise?: number;
//   quantity: number;
//   isAvailable: boolean;
//   status: string;
//   categoryName?: string;
//   imageUrl?: string;
// }

// interface UseCatalogItemsOptions {
//   moduleId?: string;
//   vendorId?: string;
//   max?: number;
//   realtime?: boolean;
// }

// export function useCatalogItems(options: UseCatalogItemsOptions = {}) {
//   const {
//     moduleId = MODULE_JUSHOPPING,
//     vendorId,
//     max = 40,
//     realtime = false,
//   } = options;

//   const [items, setItems] = useState<CatalogItemSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const mapDoc = (id: string, data: Record<string, unknown>): CatalogItemSummary => ({
//     catalogItemId: (data.catalogItemId as string) || id,
//     vendorId: (data.vendorId as string) || "",
//     name: (data.name as string) || "—",
//     sellingPricePaise: Number(data.sellingPricePaise ?? 0),
//     mrpPaise: data.mrpPaise != null ? Number(data.mrpPaise) : undefined,
//     quantity: Number(data.quantity ?? 0),
//     isAvailable: Boolean(data.isAvailable ?? true),
//     status: (data.status as string) || "ACTIVE",
//     categoryName: data.categoryName as string | undefined,
//     imageUrl: Array.isArray(data.images) && data.images[0]
//       ? String(data.images[0])
//       : undefined,
//   });

//   const buildQuery = useCallback(() => {
//     const constraints = [
//       where("moduleId", "==", moduleId),
//       orderBy("updatedAt", "desc"),
//       limit(max),
//     ];
//     if (vendorId) {
//       constraints.unshift(where("vendorId", "==", vendorId) as any);
//     }
//     return query(collection(db, "vendor_catalogs"), ...constraints);
//   }, [moduleId, vendorId, max]);

//   const refresh = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const snap = await getDocs(buildQuery());
//       setItems(snap.docs.map((d) => mapDoc(d.id, d.data())));
//     } catch (err) {
//       console.error("useCatalogItems error:", err);
//       setError(err instanceof Error ? err.message : "Failed to load catalog");
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
//         setItems(snap.docs.map((d) => mapDoc(d.id, d.data())));
//         setLoading(false);
//       },
//       (err) => {
//         setError(err.message);
//         setLoading(false);
//       },
//     );
//     return () => unsub();
//   }, [buildQuery, realtime, refresh]);

//   return { items, loading, error, refresh };
// }

// src/hooks/useCatalogItems.ts
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
import { MODULE_JUSHOPPING } from "@/lib/constants/modules";

export interface CatalogItemSummary {
  catalogItemId: string;
  vendorId: string;
  name: string;
  sellingPricePaise: number;
  mrpPaise?: number;
  quantity: number;
  isAvailable: boolean;
  status: string;
  categoryName?: string;
  imageUrl?: string;
}

interface Options {
  moduleId?: string;
  max?: number;
}

export function useCatalogItems({
  moduleId = MODULE_JUSHOPPING,
  max = 40,
}: Options = {}) {
  const [items, setItems] = useState<CatalogItemSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(() => setLoading(true), []);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "vendor_catalogs"),
      where("moduleId", "==", moduleId),
      limit(max),
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: CatalogItemSummary[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            catalogItemId: (data.catalogItemId as string) || d.id,
            vendorId: (data.vendorId as string) || "",
            name: (data.name as string) || "—",
            sellingPricePaise: Number(data.sellingPricePaise ?? 0),
            mrpPaise:
              data.mrpPaise != null ? Number(data.mrpPaise) : undefined,
            quantity: Number(data.quantity ?? 0),
            isAvailable: Boolean(data.isAvailable ?? true),
            status: (data.status as string) || "ACTIVE",
            categoryName: data.categoryName as string | undefined,
            imageUrl:
              Array.isArray(data.images) && data.images[0]
                ? String(data.images[0])
                : undefined,
          };
        });

        setItems(list);
        setLoading(false);
      },
      (err) => {
        console.error("useCatalogItems:", err);
        setError(err.message);
        setLoading(false);
      },
    );

    return () => unsub();
  }, [moduleId, max]);

  return { items, loading, error, refresh };
}