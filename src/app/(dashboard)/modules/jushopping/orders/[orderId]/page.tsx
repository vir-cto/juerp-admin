// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import { ModuleStatusBadge } from "@/components/modules/ModuleStatusBadge";
// import Link from "next/link";

// function formatPaise(paise?: number) {
//   if (paise == null || !Number.isFinite(paise)) return "—";
//   return `₹${(paise / 100).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//   })}`;
// }

// export default function JuShoppingOrderDetailPage() {
//   const params = useParams();
//   const router = useRouter();
//   const orderId = params.orderId as string;

//   const [order, setOrder] = useState<Record<string, any> | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!orderId) return;
//     async function load() {
//       setLoading(true);
//       setError(null);
//       try {
//         const snap = await getDoc(doc(db, "orders", orderId));
//         if (!snap.exists()) {
//           setError("Order not found.");
//           setOrder(null);
//         } else {
//           const data = snap.data();
//           if (data.moduleId !== "JUSHOPPING") {
//             setError("This order does not belong to JuShopping.");
//             setOrder(null);
//           } else {
//             setOrder({ orderId: snap.id, ...data });
//           }
//         }
//       } catch (err) {
//         console.error(err);
//         setError(err instanceof Error ? err.message : "Failed to load order");
//       } finally {
//         setLoading(false);
//       }
//     }
//     void load();
//   }, [orderId]);

//   if (loading) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <p className="text-sm text-slate-500">Loading order…</p>
//       </div>
//     );
//   }

//   if (error || !order) {
//     return (
//       <div className="min-h-screen bg-slate-100 p-6">
//         <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
//           {error || "Order not found"}
//         </div>
//         <button
//           type="button"
//           onClick={() => router.back()}
//           className="mt-4 text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </button>
//       </div>
//     );
//   }

//   const snap = order.financialSnapshot || {};

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <Link
//             href="/modules/jushopping/orders"
//             className="text-xs font-medium text-orange-600 hover:text-orange-700"
//           >
//             ← All Shopping Orders
//           </Link>
//           <h1 className="mt-2 text-2xl font-bold text-slate-900">
//             Order {order.orderId}
//           </h1>
//           <div className="mt-2 flex flex-wrap gap-2">
//             <ModuleStatusBadge status={order.status} />
//             {order.paymentStatus && (
//               <ModuleStatusBadge status={order.paymentStatus} />
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//         {/* Main */}
//         <div className="space-y-6 lg:col-span-2">
//           <div className="rounded-xl bg-white p-6 shadow-sm">
//             <h2 className="text-sm font-semibold text-slate-900">Order Summary</h2>
//             <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <dt className="text-slate-500">Customer</dt>
//                 <dd className="mt-0.5 font-mono text-xs text-slate-800">
//                   {order.userId}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-slate-500">Vendors</dt>
//                 <dd className="mt-0.5 text-slate-800">
//                   {(order.vendorIds || []).join(", ") || "—"}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-slate-500">State / District</dt>
//                 <dd className="mt-0.5 text-slate-800">
//                   {order.stateId || "—"} / {order.districtId || "—"}
//                 </dd>
//               </div>
//               <div>
//                 <dt className="text-slate-500">Captain</dt>
//                 <dd className="mt-0.5 text-slate-800">{order.captainId || "—"}</dd>
//               </div>
//               <div>
//                 <dt className="text-slate-500">Correlation ID</dt>
//                 <dd className="mt-0.5 font-mono text-xs text-slate-600">
//                   {order.correlationId || "—"}
//                 </dd>
//               </div>
//             </dl>
//           </div>

//           {/* Items – if stored on order or via order_items */}
//           {Array.isArray(order.items) && order.items.length > 0 && (
//             <div className="rounded-xl bg-white p-6 shadow-sm">
//               <h2 className="text-sm font-semibold text-slate-900">Line Items</h2>
//               <ul className="mt-4 divide-y divide-slate-100">
//                 {order.items.map((item: any) => (
//                   <li
//                     key={item.orderItemId || item.catalogItemId}
//                     className="flex justify-between py-3 text-sm"
//                   >
//                     <div>
//                       <p className="font-medium text-slate-900">{item.name}</p>
//                       <p className="text-xs text-slate-500">
//                         Qty {item.quantity} · {formatPaise(item.unitPricePaise)} each
//                       </p>
//                     </div>
//                     <p className="font-semibold text-slate-900">
//                       {formatPaise(item.itemTotalPaise)}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>

//         {/* Financial snapshot – read-only */}
//         <div className="rounded-xl bg-white p-6 shadow-sm">
//           <h2 className="text-sm font-semibold text-slate-900">
//             Financial Snapshot
//           </h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Version: {snap.calculationVersion || order.calculationVersion || "—"}
//           </p>
//           <dl className="mt-4 space-y-2 text-sm">
//             {[
//               ["Item Subtotal", snap.itemSubtotalPaise ?? order.subtotalPaise],
//               ["Platform Fee", snap.platformFeePaise ?? order.platformFeePaise],
//               ["JUONE Extra", snap.juoneExtraAmountPaise ?? order.juoneExtraAmountPaise],
//               ["Delivery Fee", snap.deliveryFeePaise ?? order.deliveryFeePaise],
//               ["Tax", snap.taxPaise ?? order.taxPaise],
//               ["Discount", snap.discountPaise ?? order.discountPaise],
//               ["Vendor Commission", snap.vendorCommissionPaise],
//               ["Vendor Payout", snap.vendorPayoutPaise],
//               ["Platform Margin", snap.platformMarginPaise],
//               ["Gateway Fee", snap.gatewayFeePaise],
//             ].map(([label, value]) => (
//               <div key={label as string} className="flex justify-between">
//                 <dt className="text-slate-500">{label}</dt>
//                 <dd className="font-medium text-slate-900">
//                   {formatPaise(value as number)}
//                 </dd>
//               </div>
//             ))}
//             <div className="flex justify-between border-t border-slate-100 pt-2">
//               <dt className="font-semibold text-slate-900">Customer Total</dt>
//               <dd className="font-bold text-orange-600">
//                 {formatPaise(order.totalPaise ?? snap.grossOrderValuePaise)}
//               </dd>
//             </div>
//           </dl>
//           <p className="mt-4 text-xs leading-5 text-slate-400">
//             This snapshot is immutable after calculation. Changing ERP rules does
//             not alter historical amounts.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useJuShoppingOrders, {
  type JuShoppingOrderRow,
} from "@/hooks/useJuShoppingOrders";

export default function JuShoppingOrderDetailPage() {
  const params = useParams();
  const orderId = String(params.orderId ?? "");
  const { getOrderById } = useJuShoppingOrders();
  const [row, setRow] = useState<JuShoppingOrderRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      try {
        const mapped = await getOrderById(orderId);
        if (!cancelled) setRow(mapped);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Load failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (orderId) void run();
    return () => {
      cancelled = true;
    };
  }, [orderId, getOrderById]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/jushopping/orders"
        className="text-xs font-bold text-pink-600"
      >
        ← JuShopping orders
      </Link>
      <h1 className="mt-2 text-2xl font-black text-slate-900">
        Order {orderId}
      </h1>
      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {row && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card title="Lifecycle">
            <Row label="Status" value={row.status} />
            <Row label="Payment" value={row.paymentStatus} />
            <Row label="Service" value={row.service} />
            <Row label="Module" value={row.moduleId} />
          </Card>
          <Card title="Parties">
            <Row label="User" value={row.userId || "—"} />
            <Row label="Vendor" value={row.vendorId || "—"} />
            <Row label="Captain" value={row.captainId || "—"} />
            <Row
              label="Total"
              value={`₹${(row.totalPaise / 100).toFixed(2)}`}
            />
          </Card>
          <Card title="Timestamps">
            <Row label="Created" value={row.createdAtLabel} />
            <Row label="Updated" value={row.updatedAtLabel} />
          </Card>
        </div>
      )}
      {!loading && !row && !error && (
        <p className="mt-6 text-sm text-slate-500">Order not found.</p>
      )}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-black text-slate-900">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="break-all font-semibold text-slate-800">{value}</span>
    </div>
  );
}