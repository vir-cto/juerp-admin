// "use client";

// import { useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   limit,
//   onSnapshot,
//   type Timestamp,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import type { AuthRole } from "@/hooks/useAuthScope";
// import CaptainReassignModal from "@/components/overrides/CaptainReassignModal";

// type DispatchOrder = {
//   id: string;
//   orderId: string;
//   module: string;
//   status: string;
//   vendorName?: string;
//   customerName?: string;
//   districtId?: string;
//   stateId?: string;
//   captainId?: string | null;
//   createdAt?: Timestamp | null;
//   totalAmountPaise?: number;
// };

// type Props = {
//   stateId: string | null;
//   districtId: string | null;
//   role: AuthRole | null;
// };

// export default function OrdersPanel({ stateId, districtId, role }: Props) {
//   const [orders, setOrders] = useState<DispatchOrder[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedOrder, setSelectedOrder] = useState<DispatchOrder | null>(null);
//   const [showAssign, setShowAssign] = useState(false);

//   useEffect(() => {
//     // Orders waiting for captain: PAID / READY / ACCEPTED without captain
//     let q = query(
//       collection(db, "orders"),
//       where("status", "in", ["PAID", "READY", "ACCEPTED", "ASSIGNED"]),
//       orderBy("createdAt", "desc"),
//       limit(50),
//     );

//     // Scope filter (best-effort; needs composite indexes)
//     if (role === "DISTRICT_ADMIN" && districtId) {
//       q = query(
//         collection(db, "orders"),
//         where("districtId", "==", districtId),
//         where("status", "in", ["PAID", "READY", "ACCEPTED", "ASSIGNED"]),
//         orderBy("createdAt", "desc"),
//         limit(50),
//       );
//     } else if (role === "STATE_ADMIN" && stateId) {
//       q = query(
//         collection(db, "orders"),
//         where("stateId", "==", stateId),
//         where("status", "in", ["PAID", "READY", "ACCEPTED", "ASSIGNED"]),
//         orderBy("createdAt", "desc"),
//         limit(50),
//       );
//     }

//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         const list: DispatchOrder[] = snap.docs.map((d) => {
//           const data = d.data();
//           return {
//             id: d.id,
//             orderId: data.orderId || d.id,
//             module: data.module || "JUCART",
//             status: data.status || "UNKNOWN",
//             vendorName: data.vendorName,
//             customerName: data.customerName,
//             districtId: data.districtId,
//             stateId: data.stateId,
//             captainId: data.captainId ?? null,
//             createdAt: data.createdAt ?? null,
//             totalAmountPaise: data.financialSnapshot?.totalAmountPaise,
//           };
//         });
//         setOrders(list);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("OrdersPanel snapshot error:", err);
//         setLoading(false);
//       },
//     );

//     return () => unsub();
//   }, [role, stateId, districtId]);

//   const unassigned = orders.filter((o) => !o.captainId);
//   const assigned = orders.filter((o) => !!o.captainId);

//   return (
//     <div className="rounded-xl bg-white shadow-sm">
//       <div className="border-b border-slate-200 p-5">
//         <div className="flex items-center justify-between">
//           <div>
//             <h2 className="text-lg font-semibold text-slate-900">
//               Dispatch Queue
//             </h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Live orders needing captain · scoped to your role
//             </p>
//           </div>
//           <div className="flex gap-2 text-xs">
//             <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-700">
//               {unassigned.length} Unassigned
//             </span>
//             <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
//               {assigned.length} Assigned
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="max-h-[480px] overflow-y-auto divide-y divide-slate-100">
//         {loading ? (
//           <p className="p-8 text-center text-sm text-slate-500">Loading orders…</p>
//         ) : orders.length === 0 ? (
//           <p className="p-8 text-center text-sm text-slate-500">
//             No orders in dispatch queue for your scope.
//           </p>
//         ) : (
//           orders.map((order) => (
//             <div
//               key={order.id}
//               className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50"
//             >
//               <div className="min-w-0">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <p className="text-sm font-bold text-slate-900">
//                     {order.orderId}
//                   </p>
//                   <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
//                     {order.module}
//                   </span>
//                   <span
//                     className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
//                       order.captainId
//                         ? "bg-blue-100 text-blue-700"
//                         : "bg-red-100 text-red-700"
//                     }`}
//                   >
//                     {order.status}
//                     {!order.captainId ? " · NEEDS CAPTAIN" : ""}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {order.vendorName || "Vendor"} · {order.customerName || "Customer"}
//                 </p>
//               </div>

//               <div className="flex shrink-0 gap-2">
//                 {!order.captainId ? (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowAssign(true);
//                     }}
//                     className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600"
//                   >
//                     Assign Captain
//                   </button>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedOrder(order);
//                       setShowAssign(true);
//                     }}
//                     className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                   >
//                     Re-assign
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {showAssign && selectedOrder && (
//         <CaptainReassignModal
//           isOpen={showAssign}
//           onClose={() => {
//             setShowAssign(false);
//             setSelectedOrder(null);
//           }}
//           orderId={selectedOrder.orderId}
//           currentCaptainId={selectedOrder.captainId}
//           module={selectedOrder.module}
//           districtId={selectedOrder.districtId || districtId}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  type Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { AuthRole } from "@/hooks/useAuthScope";
import CaptainReassignModal from "@/components/overrides/CaptainReassignModal";

type DispatchOrder = {
  id: string;
  orderId: string;
  module: string;
  status: string;
  vendorName?: string;
  customerName?: string;
  districtId?: string;
  stateId?: string;
  captainId?: string | null;
  captainName?: string | null;
  createdAt?: Timestamp | null;
  totalAmountPaise?: number;
};

type Props = {
  stateId: string | null;
  districtId: string | null;
  role: AuthRole | null;
};

export default function OrdersPanel({ stateId, districtId, role }: Props) {
  const [orders, setOrders] = useState<DispatchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<DispatchOrder | null>(null);
  const [showAssign, setShowAssign] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const constraints: Parameters<typeof query>[1][] = [
      where("status", "in", ["PAID", "READY", "ACCEPTED", "ASSIGNED"]),
      orderBy("createdAt", "desc"),
      limit(60),
    ];

    if (role === "DISTRICT_ADMIN" && districtId) {
      constraints.unshift(where("districtId", "==", districtId));
    } else if (role === "STATE_ADMIN" && stateId) {
      constraints.unshift(where("stateId", "==", stateId));
    }

    const q = query(collection(db, "orders"), ...constraints);

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: DispatchOrder[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            orderId: (data.orderId as string) || d.id,
            module: (data.module as string) || "JUCART",
            status: (data.status as string) || "UNKNOWN",
            vendorName: data.vendorName as string | undefined,
            customerName:
              (data.customerName as string) ||
              (data.userName as string) ||
              undefined,
            districtId: data.districtId as string | undefined,
            stateId: data.stateId as string | undefined,
            captainId: (data.captainId as string) ?? null,
            captainName: (data.captainName as string) ?? null,
            createdAt: data.createdAt as Timestamp | null,
            totalAmountPaise:
              data.financialSnapshot?.totalAmountPaise ?? data.totalAmountPaise,
          };
        });
        setOrders(list);
        setLoading(false);
      },
      (err) => {
        console.error("OrdersPanel:", err);
        setError(err.message || "Failed to load orders");
        setLoading(false);
      },
    );

    return () => unsub();
  }, [role, stateId, districtId]);

  const unassigned = orders.filter((o) => !o.captainId);
  const assigned = orders.filter((o) => !!o.captainId);

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Dispatch Queue
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Live Firestore orders · scoped to your role
            </p>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-700">
              {unassigned.length} Unassigned
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
              {assigned.length} Assigned
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mx-5 mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
          <p className="mt-1 text-[10px] text-red-500">
            Check Firestore indexes (status + createdAt + districtId/stateId).
          </p>
        </div>
      )}

      <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">
        {loading ? (
          <p className="p-8 text-center text-sm text-slate-500">
            Loading live orders…
          </p>
        ) : orders.length === 0 ? (
          <p className="p-8 text-center text-sm text-slate-500">
            No orders in dispatch queue for your scope.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between hover:bg-slate-50"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">
                    {order.orderId}
                  </p>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                    {order.module}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      order.captainId
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                    {!order.captainId ? " · NEEDS CAPTAIN" : ""}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  {order.vendorName || "Vendor"} ·{" "}
                  {order.customerName || "Customer"}
                  {order.captainName
                    ? ` · Captain: ${order.captainName}`
                    : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedOrder(order);
                  setShowAssign(true);
                }}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${
                  order.captainId
                    ? "border border-slate-300 text-slate-700 hover:bg-slate-50"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {order.captainId ? "Re-assign" : "Assign Captain"}
              </button>
            </div>
          ))
        )}
      </div>

      {showAssign && selectedOrder && (
        <CaptainReassignModal
          isOpen={showAssign}
          onClose={() => {
            setShowAssign(false);
            setSelectedOrder(null);
          }}
          orderId={selectedOrder.orderId}
          orderDocId={selectedOrder.id}
          currentCaptainId={selectedOrder.captainId}
          module={selectedOrder.module}
          districtId={selectedOrder.districtId || districtId}
          stateId={selectedOrder.stateId || stateId}
        />
      )}
    </div>
  );
}