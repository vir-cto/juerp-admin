// "use client";

// import { useMemo, useState } from "react";

// type OrderStatus =
//   | "CREATED"
//   | "PAYMENT_PENDING"
//   | "PAID"
//   | "ACCEPTED"
//   | "PREPARING"
//   | "READY"
//   | "ASSIGNED"
//   | "PICKED_UP"
//   | "OUT_FOR_DELIVERY";

// type PaymentStatus =
//   | "CREATED"
//   | "PENDING"
//   | "PAID"
//   | "FAILED"
//   | "REFUNDED";

// type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// interface ActiveOrder {
//   orderId: string;
//   userId: string;
//   vendorId: string;
//   vendorName: string;
//   moduleId: ModuleId;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   amountPaise: number;
//   captainId?: string;
//   createdAt: string;
//   updatedAt: string;
// }

// const INITIAL_ORDERS: ActiveOrder[] = [
//   {
//     orderId: "ORD-JUCART-1001",
//     userId: "USR-10001",
//     vendorId: "VEN-FOOD-001",
//     vendorName: "JuFood Restaurant",
//     moduleId: "JUCART",
//     status: "PREPARING",
//     paymentStatus: "PAID",
//     amountPaise: 45800,
//     captainId: "CAP-1001",
//     createdAt: "2026-10-05 18:42",
//     updatedAt: "2026-10-05 18:48",
//   },
//   {
//     orderId: "ORD-JUCART-1002",
//     userId: "USR-10002",
//     vendorId: "VEN-MART-001",
//     vendorName: "JuMart Grocery",
//     moduleId: "JUCART",
//     status: "READY",
//     paymentStatus: "PAID",
//     amountPaise: 72500,
//     captainId: "CAP-1002",
//     createdAt: "2026-10-05 18:35",
//     updatedAt: "2026-10-05 18:51",
//   },
//   {
//     orderId: "ORD-JUCART-1003",
//     userId: "USR-10003",
//     vendorId: "VEN-PHAR-001",
//     vendorName: "Ju Pharmacy",
//     moduleId: "JUCART",
//     status: "ASSIGNED",
//     paymentStatus: "PAID",
//     amountPaise: 32000,
//     captainId: "CAP-1003",
//     createdAt: "2026-10-05 18:20",
//     updatedAt: "2026-10-05 18:45",
//   },
//   {
//     orderId: "ORD-SHOP-1004",
//     userId: "USR-10004",
//     vendorId: "VEN-SHOP-001",
//     vendorName: "Fashion Hub",
//     moduleId: "JUSHOPPING",
//     status: "OUT_FOR_DELIVERY",
//     paymentStatus: "PAID",
//     amountPaise: 149900,
//     captainId: "CAP-1004",
//     createdAt: "2026-10-05 17:55",
//     updatedAt: "2026-10-05 18:40",
//   },
//   {
//     orderId: "ORD-SHOP-1005",
//     userId: "USR-10005",
//     vendorId: "VEN-SHOP-002",
//     vendorName: "Electro World",
//     moduleId: "JUSHOPPING",
//     status: "ACCEPTED",
//     paymentStatus: "PAID",
//     createdAt: "2026-10-05 18:50",
//     updatedAt: "2026-10-05 18:52",
//   },
//   {
//     orderId: "ORD-HOME-1006",
//     userId: "USR-10006",
//     vendorId: "VEN-HOME-001",
//     vendorName: "HomeCare Services",
//     moduleId: "JUHOME",
//     status: "PAID",
//     paymentStatus: "PAID",
//     amountPaise: 85000,
//     createdAt: "2026-10-05 18:47",
//     updatedAt: "2026-10-05 18:49",
//   },
// ];

// const ORDER_STATUSES: OrderStatus[] = [
//   "CREATED",
//   "PAYMENT_PENDING",
//   "PAID",
//   "ACCEPTED",
//   "PREPARING",
//   "READY",
//   "ASSIGNED",
//   "PICKED_UP",
//   "OUT_FOR_DELIVERY",
// ];

// const MODULES: ModuleId[] = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// function formatAmount(amountPaise: number) {
//   return `₹${(amountPaise / 100).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// }

// function getStatusClasses(status: OrderStatus) {
//   switch (status) {
//     case "CREATED":
//       return "bg-slate-100 text-slate-700";

//     case "PAYMENT_PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "PAID":
//       return "bg-green-100 text-green-700";

//     case "ACCEPTED":
//       return "bg-blue-100 text-blue-700";

//     case "PREPARING":
//       return "bg-orange-100 text-orange-700";

//     case "READY":
//       return "bg-cyan-100 text-cyan-700";

//     case "ASSIGNED":
//       return "bg-indigo-100 text-indigo-700";

//     case "PICKED_UP":
//       return "bg-purple-100 text-purple-700";

//     case "OUT_FOR_DELIVERY":
//       return "bg-emerald-100 text-emerald-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: ModuleId) {
//   switch (module) {
//     case "JUCART":
//       return "bg-orange-50 text-orange-700";

//     case "JURIDE":
//       return "bg-blue-50 text-blue-700";

//     case "JUSTAY":
//       return "bg-purple-50 text-purple-700";

//     case "JUHOME":
//       return "bg-green-50 text-green-700";

//     case "JUSHOPPING":
//       return "bg-pink-50 text-pink-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// export default function ActiveOrdersPage() {
//   const [orders, setOrders] = useState<ActiveOrder[]>(INITIAL_ORDERS);

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [moduleFilter, setModuleFilter] = useState("ALL");
//   const [paymentFilter, setPaymentFilter] = useState("ALL");

//   const [selectedOrder, setSelectedOrder] =
//     useState<ActiveOrder | null>(null);

//   const [showDetails, setShowDetails] = useState(false);

//   const filteredOrders = useMemo(() => {
//     const searchText = search.trim().toLowerCase();

//     return orders.filter((order) => {
//       const matchesSearch =
//         !searchText ||
//         order.orderId.toLowerCase().includes(searchText) ||
//         order.userId.toLowerCase().includes(searchText) ||
//         order.vendorId.toLowerCase().includes(searchText) ||
//         order.vendorName.toLowerCase().includes(searchText) ||
//         order.captainId?.toLowerCase().includes(searchText);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         order.status === statusFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         order.moduleId === moduleFilter;

//       const matchesPayment =
//         paymentFilter === "ALL" ||
//         order.paymentStatus === paymentFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesModule &&
//         matchesPayment
//       );
//     });
//   }, [
//     orders,
//     search,
//     statusFilter,
//     moduleFilter,
//     paymentFilter,
//   ]);

//   const totalOrders = orders.length;

//   const paidOrders = orders.filter(
//     (order) => order.paymentStatus === "PAID"
//   ).length;

//   const preparingOrders = orders.filter(
//     (order) =>
//       order.status === "PREPARING" ||
//       order.status === "ACCEPTED"
//   ).length;

//   const deliveryOrders = orders.filter(
//     (order) =>
//       order.status === "ASSIGNED" ||
//       order.status === "PICKED_UP" ||
//       order.status === "OUT_FOR_DELIVERY"
//   ).length;

//   const totalValuePaise = orders.reduce(
//     (total, order) => total + order.amountPaise,
//     0
//   );

//   function openOrder(order: ActiveOrder) {
//     setSelectedOrder(order);
//     setShowDetails(true);
//   }

//   function closeDetails() {
//     setSelectedOrder(null);
//     setShowDetails(false);
//   }

//   function updateLocalStatus(
//     orderId: string,
//     newStatus: OrderStatus
//   ) {
//     setOrders((currentOrders) =>
//       currentOrders.map((order) =>
//         order.orderId === orderId
//           ? {
//               ...order,
//               status: newStatus,
//               updatedAt: new Date().toLocaleString("en-IN"),
//             }
//           : order
//       )
//     );

//     setSelectedOrder((currentOrder) =>
//       currentOrder && currentOrder.orderId === orderId
//         ? {
//             ...currentOrder,
//             status: newStatus,
//             updatedAt: new Date().toLocaleString("en-IN"),
//           }
//         : currentOrder
//     );
//   }

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setModuleFilter("ALL");
//     setPaymentFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* PAGE HEADER */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>
//             <div className="flex items-center gap-3">
//               <h1 className="text-2xl font-bold text-slate-900">
//                 Active Orders
//               </h1>

//               <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                 LIVE
//               </span>
//             </div>

//             <p className="mt-1 text-sm text-slate-500">
//               Monitor active JUONE orders and their operational
//               status from the JUERP control room.
//             </p>
//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-semibold text-orange-700">
//               Control Room
//             </p>

//             <p className="mt-1 text-xs text-orange-600">
//               Operational monitoring view
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Active Orders
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {totalOrders}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Currently being processed
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Paid Orders
//           </p>

//           <p className="mt-2 text-3xl font-bold text-green-600">
//             {paidOrders}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Payment confirmed
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Processing
//           </p>

//           <p className="mt-2 text-3xl font-bold text-orange-600">
//             {preparingOrders}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Accepted / preparing
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Delivery
//           </p>

//           <p className="mt-2 text-3xl font-bold text-blue-600">
//             {deliveryOrders}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Assigned / pickup / delivery
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Active Order Value
//           </p>

//           <p className="mt-2 text-2xl font-bold text-purple-600">
//             {formatAmount(totalValuePaise)}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Current order snapshot
//           </p>
//         </div>

//       </div>

//       {/* FILTERS */}
//       <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

//         <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <h2 className="text-base font-semibold text-slate-900">
//               Order Monitoring
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Search and filter active orders.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="w-fit rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
//           >
//             Clear Filters
//           </button>

//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">

//           {/* SEARCH */}
//           <input
//             type="text"
//             value={search}
//             onChange={(event) =>
//               setSearch(event.target.value)
//             }
//             placeholder="Search order, vendor, user..."
//             className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           />

//           {/* STATUS */}
//           <select
//             value={statusFilter}
//             onChange={(event) =>
//               setStatusFilter(event.target.value)
//             }
//             className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           >
//             <option value="ALL">
//               All Order Statuses
//             </option>

//             {ORDER_STATUSES.map((status) => (
//               <option
//                 key={status}
//                 value={status}
//               >
//                 {status}
//               </option>
//             ))}
//           </select>

//           {/* MODULE */}
//           <select
//             value={moduleFilter}
//             onChange={(event) =>
//               setModuleFilter(event.target.value)
//             }
//             className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           >
//             <option value="ALL">
//               All Modules
//             </option>

//             {MODULES.map((module) => (
//               <option
//                 key={module}
//                 value={module}
//               >
//                 {module}
//               </option>
//             ))}
//           </select>

//           {/* PAYMENT */}
//           <select
//             value={paymentFilter}
//             onChange={(event) =>
//               setPaymentFilter(event.target.value)
//             }
//             className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           >
//             <option value="ALL">
//               All Payment Statuses
//             </option>

//             <option value="CREATED">
//               CREATED
//             </option>

//             <option value="PENDING">
//               PENDING
//             </option>

//             <option value="PAID">
//               PAID
//             </option>

//             <option value="FAILED">
//               FAILED
//             </option>

//             <option value="REFUNDED">
//               REFUNDED
//             </option>
//           </select>

//         </div>
//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm lg:block">

//         <div className="border-b border-slate-200 px-6 py-4">

//           <div className="flex items-center justify-between">

//             <div>
//               <h2 className="text-base font-semibold text-slate-900">
//                 Active Order Queue
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Showing {filteredOrders.length} of{" "}
//                 {orders.length} active orders
//               </p>
//             </div>

//             <div className="flex items-center gap-2">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

//               <span className="text-xs font-medium text-green-600">
//                 Monitoring
//               </span>

//             </div>

//           </div>
//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Order
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Vendor
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Payment
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Captain
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Amount
//                 </th>

//                 <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredOrders.map((order) => (

//                 <tr
//                   key={order.orderId}
//                   className="transition hover:bg-slate-50"
//                 >

//                   {/* ORDER */}
//                   <td className="px-6 py-4">

//                     <p className="text-sm font-semibold text-slate-900">
//                       {order.orderId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {order.userId}
//                     </p>

//                   </td>

//                   {/* VENDOR */}
//                   <td className="px-6 py-4">

//                     <p className="text-sm font-medium text-slate-700">
//                       {order.vendorName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {order.vendorId}
//                     </p>

//                   </td>

//                   {/* MODULE */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                         order.moduleId
//                       )}`}
//                     >
//                       {order.moduleId}
//                     </span>

//                   </td>

//                   {/* STATUS */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                         order.status
//                       )}`}
//                     >
//                       {order.status}
//                     </span>

//                   </td>

//                   {/* PAYMENT */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                         order.paymentStatus === "PAID"
//                           ? "bg-green-100 text-green-700"
//                           : order.paymentStatus === "PENDING"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {order.paymentStatus}
//                     </span>

//                   </td>

//                   {/* CAPTAIN */}
//                   <td className="px-6 py-4">

//                     {order.captainId ? (
//                       <span className="text-sm font-medium text-slate-700">
//                         {order.captainId}
//                       </span>
//                     ) : (
//                       <span className="text-xs text-slate-400">
//                         Not Assigned
//                       </span>
//                     )}

//                   </td>

//                   {/* AMOUNT */}
//                   <td className="px-6 py-4">

//                     <span className="text-sm font-bold text-slate-900">
//                       {formatAmount(order.amountPaise)}
//                     </span>

//                   </td>

//                   {/* ACTION */}
//                   <td className="px-6 py-4 text-right">

//                     <button
//                       type="button"
//                       onClick={() => openOrder(order)}
//                       className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
//                     >
//                       View
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//           {filteredOrders.length === 0 && (
//             <div className="px-6 py-16 text-center">

//               <p className="text-sm font-semibold text-slate-600">
//                 No active orders found.
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Change the search or filter values.
//               </p>

//             </div>
//           )}

//         </div>
//       </div>

//       {/* MOBILE ORDER CARDS */}
//       <div className="space-y-4 lg:hidden">

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <div className="flex items-center justify-between">

//             <div>
//               <h2 className="text-base font-semibold text-slate-900">
//                 Active Order Queue
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 {filteredOrders.length} orders
//               </p>
//             </div>

//             <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
//               <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
//               LIVE
//             </span>

//           </div>

//         </div>

//         {filteredOrders.map((order) => (

//           <div
//             key={order.orderId}
//             className="rounded-xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {order.orderId}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {order.userId}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                   order.status
//                 )}`}
//               >
//                 {order.status}
//               </span>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-4">

//               <div>
//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Vendor
//                 </p>

//                 <p className="mt-1 text-sm font-medium text-slate-700">
//                   {order.vendorName}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Module
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-md px-2 py-1 text-xs font-semibold ${getModuleClasses(
//                     order.moduleId
//                   )}`}
//                 >
//                   {order.moduleId}
//                 </span>
//               </div>

//               <div>
//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Payment
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-green-600">
//                   {order.paymentStatus}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Amount
//                 </p>

//                 <p className="mt-1 text-sm font-bold text-slate-900">
//                   {formatAmount(order.amountPaise)}
//                 </p>
//               </div>

//             </div>

//             <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

//               <div>

//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Captain
//                 </p>

//                 <p className="mt-1 text-xs font-medium text-slate-600">
//                   {order.captainId || "Not Assigned"}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() => openOrder(order)}
//                 className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
//               >
//                 View Order
//               </button>

//             </div>

//           </div>

//         ))}

//         {filteredOrders.length === 0 && (
//           <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">

//             <p className="text-sm font-semibold text-slate-600">
//               No active orders found.
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Try changing your filters.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* ORDER DETAILS MODAL */}
//       {showDetails && selectedOrder && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             {/* MODAL HEADER */}
//             <div className="flex items-start justify-between border-b border-slate-200 p-6">

//               <div>

//                 <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                   Order Details
//                 </p>

//                 <h2 className="mt-1 text-xl font-bold text-slate-900">
//                   {selectedOrder.orderId}
//                 </h2>

//               </div>

//               <button
//                 type="button"
//                 onClick={closeDetails}
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             {/* MODAL CONTENT */}
//             <div className="space-y-6 p-6">

//               {/* STATUS */}
//               <div className="rounded-xl border border-slate-200 p-5">

//                 <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//                   <div>
//                     <p className="text-xs font-medium text-slate-400">
//                       Current Order Status
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedOrder.status}
//                     </p>
//                   </div>

//                   <span
//                     className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedOrder.status
//                     )}`}
//                   >
//                     {selectedOrder.status}
//                   </span>

//                 </div>

//               </div>

//               {/* ORDER INFORMATION */}
//               <div>

//                 <h3 className="mb-3 text-sm font-semibold text-slate-900">
//                   Order Information
//                 </h3>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       Order ID
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.orderId}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       User ID
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.userId}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       Vendor ID
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.vendorId}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       Vendor Name
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.vendorName}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       Module
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.moduleId}
//                     </p>
//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">
//                     <p className="text-xs text-slate-400">
//                       Captain
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedOrder.captainId ||
//                         "Not Assigned"}
//                     </p>
//                   </div>

//                 </div>

//               </div>

//               {/* PAYMENT */}
//               <div>

//                 <h3 className="mb-3 text-sm font-semibold text-slate-900">
//                   Payment Information
//                 </h3>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <div className="rounded-lg bg-green-50 p-4">

//                     <p className="text-xs text-green-600">
//                       Payment Status
//                     </p>

//                     <p className="mt-1 text-sm font-bold text-green-700">
//                       {selectedOrder.paymentStatus}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-orange-50 p-4">

//                     <p className="text-xs text-orange-600">
//                       Order Amount
//                     </p>

//                     <p className="mt-1 text-lg font-bold text-orange-700">
//                       {formatAmount(
//                         selectedOrder.amountPaise
//                       )}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* TIMELINE */}
//               <div>

//                 <h3 className="mb-3 text-sm font-semibold text-slate-900">
//                   Operational Timeline
//                 </h3>

//                 <div className="space-y-3">

//                   <div className="flex gap-3">

//                     <div className="mt-1 h-2.5 w-2.5 rounded-full bg-green-500" />

//                     <div>
//                       <p className="text-sm font-medium text-slate-700">
//                         Order Created
//                       </p>

//                       <p className="text-xs text-slate-400">
//                         {selectedOrder.createdAt}
//                       </p>
//                     </div>

//                   </div>

//                   <div className="flex gap-3">

//                     <div className="mt-1 h-2.5 w-2.5 rounded-full bg-orange-500" />

//                     <div>
//                       <p className="text-sm font-medium text-slate-700">
//                         Last Updated
//                       </p>

//                       <p className="text-xs text-slate-400">
//                         {selectedOrder.updatedAt}
//                       </p>
//                     </div>

//                   </div>

//                 </div>

//               </div>

//               {/* LOCAL STATUS CONTROL */}
//               <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

//                 <p className="text-xs font-semibold text-orange-700">
//                   Development Status Control
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-orange-600">
//                   These controls update the local page state
//                   only. Production order transitions must be
//                   performed through the trusted backend.
//                 </p>

//                 <div className="mt-4 flex flex-wrap gap-2">

//                   {[
//                     "ACCEPTED",
//                     "PREPARING",
//                     "READY",
//                     "ASSIGNED",
//                     "PICKED_UP",
//                     "OUT_FOR_DELIVERY",
//                   ].map((status) => (

//                     <button
//                       key={status}
//                       type="button"
//                       onClick={() =>
//                         updateLocalStatus(
//                           selectedOrder.orderId,
//                           status as OrderStatus
//                         )
//                       }
//                       className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
//                         selectedOrder.status === status
//                           ? "border-orange-500 bg-orange-500 text-white"
//                           : "border-slate-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600"
//                       }`}
//                     >
//                       {status}
//                     </button>

//                   ))}

//                 </div>

//               </div>

//             </div>

//             {/* MODAL FOOTER */}
//             <div className="flex justify-end border-t border-slate-200 p-6">

//               <button
//                 type="button"
//                 onClick={closeDetails}
//                 className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//       {/* GOVERNANCE NOTE */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

//         <h2 className="text-sm font-semibold text-slate-900">
//           Control Room Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-slate-500">
//           Active Orders is an operational monitoring screen.
//           The authoritative order state is maintained by the
//           JUONE backend and Firestore according to the JUONE
//           specification. JUERP should monitor and perform only
//           authorized operational actions. Client-side status
//           changes shown above are for UI development and must be
//           replaced with secured backend commands before production.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <div className="rounded-lg bg-slate-50 p-4">
//             <p className="text-xs font-semibold text-slate-700">
//               Orders
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Authoritative order state
//             </p>
//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">
//             <p className="text-xs font-semibold text-slate-700">
//               Payments
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Server-verified payment state
//             </p>
//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">
//             <p className="text-xs font-semibold text-slate-700">
//               Dispatch
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Backend dispatch orchestration
//             </p>
//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">
//             <p className="text-xs font-semibold text-slate-700">
//               Audit
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Authorized actions must be auditable
//             </p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useControlRoomOrders, {
  type ControlRoomOrder,
  type ModuleId,
} from "@/hooks/useControlRoomOrders";

const MODULES: Array<ModuleId | "UNKNOWN"> = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
  "UNKNOWN",
];

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function moduleClass(module: string) {
  switch (module) {
    case "JUCART":
      return "bg-orange-50 text-orange-700";
    case "JURIDE":
      return "bg-blue-50 text-blue-700";
    case "JUSTAY":
      return "bg-purple-50 text-purple-700";
    case "JUHOME":
      return "bg-green-50 text-green-700";
    case "JUSHOPPING":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function statusClass(status: string) {
  const s = status.toUpperCase();
  if (s === "PAYMENT_PENDING") return "bg-yellow-100 text-yellow-800";
  if (s === "READY") return "bg-orange-100 text-orange-800";
  if (s === "ASSIGNED" || s === "OUT_FOR_DELIVERY")
    return "bg-blue-100 text-blue-800";
  if (s === "DELIVERED" || s === "PAID" || s === "ACCEPTED")
    return "bg-green-100 text-green-800";
  if (s === "CANCELLED" || s === "FAILED") return "bg-red-100 text-red-800";
  return "bg-slate-100 text-slate-700";
}

export default function ActiveOrdersPage() {
  const {
    activeOrders,
    loading,
    error,
    demoMode,
    lastRefreshedAt,
    refresh,
  } = useControlRoomOrders(15000);

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<ControlRoomOrder | null>(null);

  const statuses = useMemo(() => {
    const set = new Set(activeOrders.map((o) => o.status.toUpperCase()));
    return Array.from(set).sort();
  }, [activeOrders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return activeOrders.filter((o) => {
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customerId.toLowerCase().includes(q) ||
        o.vendorId.toLowerCase().includes(q) ||
        o.captainId.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q);

      const matchesModule =
        moduleFilter === "ALL" || o.moduleId === moduleFilter;

      const matchesStatus =
        statusFilter === "ALL" ||
        o.status.toUpperCase() === statusFilter.toUpperCase();

      return matchesSearch && matchesModule && matchesStatus;
    });
  }, [activeOrders, search, moduleFilter, statusFilter]);

  const bottleneckCount = activeOrders.filter((o) => o.isBottleneck).length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">Active Orders</h1>
            <span className="flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
              {loading ? "LOADING" : "LIVE"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Live operational orders from Firestore.
            {lastRefreshedAt
              ? ` · Updated ${new Date(lastRefreshedAt).toLocaleTimeString("en-IN")}`
              : ""}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/control-room"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            ← Control Room
          </Link>
          <Link
            href="/control-room/bottlenecks"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 hover:bg-red-100"
          >
            Bottlenecks
          </Link>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Unable to load orders</p>
          <p className="mt-1 text-xs text-red-700">{error}</p>
        </div>
      )}

      {demoMode && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">Demo mode</p>
          <p className="mt-1 text-xs text-amber-700">
            Set <code>NEXT_PUBLIC_DEMO_MODE=false</code> for live reads.
          </p>
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Active Orders</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "…" : activeOrders.length}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">In Bottleneck</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "…" : bottleneckCount}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Filtered View</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{filtered.length}</p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Source</p>
          <p className="mt-2 text-lg font-bold text-slate-800">orders</p>
          <p className="mt-1 text-xs text-slate-400">Firestore collection</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search order / customer / vendor / captain…"
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          />
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
          >
            <option value="ALL">All Modules</option>
            {MODULES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
          >
            <option value="ALL">All Statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">Order Queue</h2>
          <p className="mt-1 text-xs text-slate-500">
            Showing {filtered.length} of {activeOrders.length} active orders
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Module
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Vendor
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                  Captain
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-500">
                    Loading orders…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-slate-500">
                    No active orders. Empty collection or filters too narrow.
                  </td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-slate-900">{order.id}</p>
                      <p className="text-[11px] text-slate-400">{order.updatedAtLabel}</p>
                      {order.isBottleneck && (
                        <p className="mt-1 text-[11px] font-semibold text-red-600">
                          {order.bottleneckReason}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${moduleClass(
                          order.moduleId
                        )}`}
                      >
                        {order.moduleId}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {order.paymentStatus}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                      {formatInr(order.amount)}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">{order.vendorId}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{order.captainId}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(order)}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">Order detail</p>
                <h2 className="mt-1 text-lg font-bold text-slate-900">{selected.id}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 p-6 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Module</p>
                <p className="mt-1 font-semibold">{selected.moduleId}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Status</p>
                <p className="mt-1 font-semibold">{selected.status}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Customer</p>
                <p className="mt-1 font-semibold break-all">{selected.customerId}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Amount</p>
                <p className="mt-1 font-semibold">{formatInr(selected.amount)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Vendor</p>
                <p className="mt-1 font-semibold break-all">{selected.vendorId}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Captain</p>
                <p className="mt-1 font-semibold break-all">{selected.captainId}</p>
              </div>
              {selected.isBottleneck && (
                <div className="col-span-2 rounded-lg border border-red-200 bg-red-50 p-3">
                  <p className="text-xs font-semibold text-red-700">Bottleneck</p>
                  <p className="mt-1 text-sm text-red-800">{selected.bottleneckReason}</p>
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 p-4 text-right">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs leading-6 text-slate-500">
          Monitoring surface only. Status transitions, dispatch assignment, and payment
          confirmation remain under the trusted backend. This page does not write order state.
        </p>
      </div>
    </div>
  );
}