// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";

// type CustomerStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// type PaymentStatus =
//   | "PAID"
//   | "PENDING"
//   | "FAILED"
//   | "REFUNDED";

// type OrderStatus =
//   | "CREATED"
//   | "PAYMENT_PENDING"
//   | "PAID"
//   | "ACCEPTED"
//   | "PREPARING"
//   | "READY"
//   | "ASSIGNED"
//   | "PICKED_UP"
//   | "OUT_FOR_DELIVERY"
//   | "DELIVERED"
//   | "CANCELLED"
//   | "REJECTED"
//   | "REFUND_PENDING"
//   | "REFUNDED";

// type CustomerModule =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// interface CustomerOrder {
//   orderId: string;
//   moduleId: CustomerModule;
//   vendorName: string;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   amountPaise: number;
//   createdAt: string;
// }

// interface Customer {
//   customerId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CustomerStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;
//   createdAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   totalSpentPaise: number;
//   orders: CustomerOrder[];
// }

// const INITIAL_CUSTOMER: Customer = {
//   customerId: "CUS-10021",
//   uid: "USR-CUS-10021",
//   name: "Ananya Reddy",
//   phone: "+91 98765 12345",
//   email: "ananya.reddy@example.com",
//   status: "ACTIVE",
//   stateId: "AP",
//   stateName: "Andhra Pradesh",
//   districtId: "GNT",
//   districtName: "Guntur",
//   pincode: "522001",
//   address: "Guntur, Andhra Pradesh",
//   createdAt: "15 Aug 2026",
//   updatedAt: "05 Oct 2026",
//   lastActiveAt: "Today, 8:42 PM",
//   totalOrders: 24,
//   completedOrders: 20,
//   cancelledOrders: 2,
//   totalSpentPaise: 684500,
//   orders: [
//     {
//       orderId: "ORD-50021",
//       moduleId: "JUCART",
//       vendorName: "JuFood Restaurant",
//       status: "OUT_FOR_DELIVERY",
//       paymentStatus: "PAID",
//       amountPaise: 125000,
//       createdAt: "05 Oct 2026, 7:50 PM",
//     },
//     {
//       orderId: "ORD-50020",
//       moduleId: "JUSHOPPING",
//       vendorName: "JuOne Shopping Store",
//       status: "DELIVERED",
//       paymentStatus: "PAID",
//       amountPaise: 249900,
//       createdAt: "03 Oct 2026, 4:20 PM",
//     },
//     {
//       orderId: "ORD-50019",
//       moduleId: "JUSTAY",
//       vendorName: "JuStay Hotel",
//       status: "COMPLETED" as OrderStatus,
//       paymentStatus: "PAID",
//       amountPaise: 185000,
//       createdAt: "28 Sep 2026, 11:10 AM",
//     },
//     {
//       orderId: "ORD-50018",
//       moduleId: "JUHOME",
//       vendorName: "Home Service Partner",
//       status: "DELIVERED",
//       paymentStatus: "PAID",
//       amountPaise: 75000,
//       createdAt: "25 Sep 2026, 3:40 PM",
//     },
//     {
//       orderId: "ORD-50017",
//       moduleId: "JURIDE",
//       vendorName: "JuRide",
//       status: "CANCELLED",
//       paymentStatus: "REFUNDED",
//       amountPaise: 49000,
//       createdAt: "21 Sep 2026, 9:15 AM",
//     },
//   ],
// };

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amountPaise / 100);
// }

// function getStatusClasses(status: CustomerStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getOrderStatusClasses(status: OrderStatus) {
//   switch (status) {
//     case "DELIVERED":
//       return "bg-green-100 text-green-700";

//     case "PAID":
//     case "ACCEPTED":
//     case "PREPARING":
//     case "READY":
//     case "ASSIGNED":
//     case "PICKED_UP":
//     case "OUT_FOR_DELIVERY":
//       return "bg-blue-100 text-blue-700";

//     case "PAYMENT_PENDING":
//     case "REFUND_PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "CANCELLED":
//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     case "REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getPaymentStatusClasses(status: PaymentStatus) {
//   switch (status) {
//     case "PAID":
//       return "bg-green-100 text-green-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "FAILED":
//       return "bg-red-100 text-red-700";

//     case "REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: CustomerModule) {
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

// export default function CustomerDetailsPage() {
//   const params = useParams();

//   const customerId = Array.isArray(params.customerId)
//     ? params.customerId[0]
//     : params.customerId;

//   const [customer, setCustomer] =
//     useState<Customer>(INITIAL_CUSTOMER);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "orders" | "activity"
//   >("overview");

//   const [orderFilter, setOrderFilter] = useState<
//     "ALL" | CustomerModule
//   >("ALL");

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [statusMessage, setStatusMessage] =
//     useState("");

//   const filteredOrders = useMemo(() => {
//     if (orderFilter === "ALL") {
//       return customer.orders;
//     }

//     return customer.orders.filter(
//       (order) => order.moduleId === orderFilter
//     );
//   }, [customer.orders, orderFilter]);

//   const activeOrders = customer.orders.filter(
//     (order) =>
//       ![
//         "DELIVERED",
//         "CANCELLED",
//         "REJECTED",
//         "REFUNDED",
//       ].includes(order.status)
//   ).length;

//   const paidOrders = customer.orders.filter(
//     (order) => order.paymentStatus === "PAID"
//   ).length;

//   function updateCustomerStatus(
//     newStatus: CustomerStatus
//   ) {
//     setCustomer((current) => ({
//       ...current,
//       status: newStatus,
//       updatedAt: "Just now",
//     }));

//     setShowStatusModal(false);

//     setStatusMessage(
//       `Customer status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setStatusMessage("");
//     }, 3000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}
//       <div className="mb-6">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

//           <div>

//             <div className="mb-3 flex flex-wrap items-center gap-2">

//               <Link
//                 href="/entity-management/customers"
//                 className="text-sm font-medium text-slate-500 hover:text-orange-600"
//               >
//                 Customers
//               </Link>

//               <span className="text-slate-400">
//                 /
//               </span>

//               <span className="text-sm text-slate-700">
//                 {customer.customerId}
//               </span>

//             </div>

//             <div className="flex flex-wrap items-center gap-3">

//               <h1 className="text-2xl font-bold text-slate-900">
//                 {customer.name}
//               </h1>

//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                   customer.status
//                 )}`}
//               >
//                 {customer.status}
//               </span>

//             </div>

//             <p className="mt-1 text-sm text-slate-500">
//               Customer ID:{" "}
//               {customerId || customer.customerId}
//             </p>

//           </div>

//           <div className="flex flex-wrap gap-2">

//             <Link
//               href="/entity-management/customers"
//               className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
//             >
//               ← Back
//             </Link>

//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
//             >
//               Change Status
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS MESSAGE */}
//       {statusMessage && (
//         <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {statusMessage}
//         </div>
//       )}

//       {/* CUSTOMER PROFILE */}
//       <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

//         <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

//           <div className="flex items-center gap-4">

//             <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-600">
//               {customer.name
//                 .split(" ")
//                 .map((name) => name.charAt(0))
//                 .join("")
//                 .slice(0, 2)}
//             </div>

//             <div>

//               <h2 className="text-lg font-semibold text-slate-900">
//                 {customer.name}
//               </h2>

//               <p className="mt-1 text-sm text-slate-500">
//                 {customer.phone}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 {customer.email}
//               </p>

//             </div>

//           </div>

//           <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">

//             <div>
//               <p className="text-xs text-slate-500">
//                 Total Orders
//               </p>

//               <p className="mt-1 text-xl font-bold text-slate-900">
//                 {customer.totalOrders}
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-500">
//                 Active Orders
//               </p>

//               <p className="mt-1 text-xl font-bold text-blue-600">
//                 {activeOrders}
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-500">
//                 Paid Orders
//               </p>

//               <p className="mt-1 text-xl font-bold text-green-600">
//                 {paidOrders}
//               </p>
//             </div>

//             <div>
//               <p className="text-xs text-slate-500">
//                 Total Spent
//               </p>

//               <p className="mt-1 text-xl font-bold text-slate-900">
//                 {formatCurrency(
//                   customer.totalSpentPaise
//                 )}
//               </p>
//             </div>

//           </div>

//         </div>

//       </div>

//       {/* TABS */}
//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">

//         <div className="flex min-w-max border-b border-slate-200">

//           <button
//             type="button"
//             onClick={() => setActiveTab("overview")}
//             className={`px-6 py-4 text-sm font-semibold transition ${
//               activeTab === "overview"
//                 ? "border-b-2 border-orange-500 text-orange-600"
//                 : "text-slate-500 hover:text-slate-900"
//             }`}
//           >
//             Overview
//           </button>

//           <button
//             type="button"
//             onClick={() => setActiveTab("orders")}
//             className={`px-6 py-4 text-sm font-semibold transition ${
//               activeTab === "orders"
//                 ? "border-b-2 border-orange-500 text-orange-600"
//                 : "text-slate-500 hover:text-slate-900"
//             }`}
//           >
//             Orders
//           </button>

//           <button
//             type="button"
//             onClick={() => setActiveTab("activity")}
//             className={`px-6 py-4 text-sm font-semibold transition ${
//               activeTab === "activity"
//                 ? "border-b-2 border-orange-500 text-orange-600"
//                 : "text-slate-500 hover:text-slate-900"
//             }`}
//           >
//             Activity
//           </button>

//         </div>

//       </div>

//       {/* OVERVIEW */}
//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//           {/* PERSONAL INFORMATION */}
//           <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Personal Information
//             </h2>

//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Full Name
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.name}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Customer ID
//                 </p>

//                 <p className="mt-1 break-all text-sm font-semibold text-slate-900">
//                   {customer.customerId}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Firebase UID
//                 </p>

//                 <p className="mt-1 break-all text-sm font-semibold text-slate-900">
//                   {customer.uid}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Phone
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.phone}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Email
//                 </p>

//                 <p className="mt-1 break-all text-sm font-semibold text-slate-900">
//                   {customer.email}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   Pincode
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.pincode}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   State
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.stateName}
//                 </p>

//                 <p className="text-xs text-slate-400">
//                   {customer.stateId}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs font-medium text-slate-500">
//                   District
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.districtName}
//                 </p>

//                 <p className="text-xs text-slate-400">
//                   {customer.districtId}
//                 </p>
//               </div>

//               <div className="sm:col-span-2">

//                 <p className="text-xs font-medium text-slate-500">
//                   Address
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-900">
//                   {customer.address}
//                 </p>

//               </div>

//             </div>

//           </div>

//           {/* ACCOUNT INFORMATION */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Account Information
//             </h2>

//             <div className="mt-5 space-y-4">

//               <div className="rounded-lg bg-slate-50 p-4">

//                 <p className="text-xs text-slate-500">
//                   Account Status
//                 </p>

//                 <span
//                   className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     customer.status
//                   )}`}
//                 >
//                   {customer.status}
//                 </span>

//               </div>

//               <div className="rounded-lg bg-slate-50 p-4">

//                 <p className="text-xs text-slate-500">
//                   Created At
//                 </p>

//                 <p className="mt-2 text-sm font-semibold text-slate-900">
//                   {customer.createdAt}
//                 </p>

//               </div>

//               <div className="rounded-lg bg-slate-50 p-4">

//                 <p className="text-xs text-slate-500">
//                   Last Updated
//                 </p>

//                 <p className="mt-2 text-sm font-semibold text-slate-900">
//                   {customer.updatedAt}
//                 </p>

//               </div>

//               <div className="rounded-lg bg-slate-50 p-4">

//                 <p className="text-xs text-slate-500">
//                   Last Active
//                 </p>

//                 <p className="mt-2 text-sm font-semibold text-slate-900">
//                   {customer.lastActiveAt}
//                 </p>

//               </div>

//             </div>

//           </div>

//           {/* CUSTOMER STATISTICS */}
//           <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-3">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Customer Statistics
//             </h2>

//             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//               <div className="rounded-xl border border-slate-200 p-5">

//                 <p className="text-xs text-slate-500">
//                   Total Orders
//                 </p>

//                 <p className="mt-2 text-2xl font-bold text-slate-900">
//                   {customer.totalOrders}
//                 </p>

//               </div>

//               <div className="rounded-xl border border-green-200 bg-green-50 p-5">

//                 <p className="text-xs text-green-700">
//                   Completed Orders
//                 </p>

//                 <p className="mt-2 text-2xl font-bold text-green-700">
//                   {customer.completedOrders}
//                 </p>

//               </div>

//               <div className="rounded-xl border border-red-200 bg-red-50 p-5">

//                 <p className="text-xs text-red-700">
//                   Cancelled Orders
//                 </p>

//                 <p className="mt-2 text-2xl font-bold text-red-700">
//                   {customer.cancelledOrders}
//                 </p>

//               </div>

//               <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

//                 <p className="text-xs text-orange-700">
//                   Total Spent
//                 </p>

//                 <p className="mt-2 text-2xl font-bold text-orange-700">
//                   {formatCurrency(
//                     customer.totalSpentPaise
//                   )}
//                 </p>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* ORDERS */}
//       {activeTab === "orders" && (
//         <div className="rounded-xl bg-white shadow-sm">

//           <div className="border-b border-slate-200 p-6">

//             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//               <div>

//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Customer Orders
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Orders associated with this customer.
//                 </p>

//               </div>

//               <select
//                 value={orderFilter}
//                 onChange={(event) =>
//                   setOrderFilter(
//                     event.target.value as
//                       | "ALL"
//                       | CustomerModule
//                   )
//                 }
//                 className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >

//                 <option value="ALL">
//                   All Modules
//                 </option>

//                 <option value="JUCART">
//                   JUCART
//                 </option>

//                 <option value="JURIDE">
//                   JURIDE
//                 </option>

//                 <option value="JUSTAY">
//                   JUSTAY
//                 </option>

//                 <option value="JUHOME">
//                   JUHOME
//                 </option>

//                 <option value="JUSHOPPING">
//                   JUSHOPPING
//                 </option>

//               </select>

//             </div>

//           </div>

//           {/* DESKTOP TABLE */}
//           <div className="hidden overflow-x-auto md:block">

//             <table className="w-full">

//               <thead className="bg-slate-50">

//                 <tr>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Order
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Module
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Vendor / Provider
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Status
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Payment
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Amount
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Created
//                   </th>

//                 </tr>

//               </thead>

//               <tbody className="divide-y divide-slate-100">

//                 {filteredOrders.map((order) => (

//                   <tr
//                     key={order.orderId}
//                     className="transition hover:bg-slate-50"
//                   >

//                     <td className="px-6 py-4">

//                       <p className="text-sm font-semibold text-slate-900">
//                         {order.orderId}
//                       </p>

//                     </td>

//                     <td className="px-6 py-4">

//                       <span
//                         className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                           order.moduleId
//                         )}`}
//                       >
//                         {order.moduleId}
//                       </span>

//                     </td>

//                     <td className="px-6 py-4 text-sm text-slate-700">
//                       {order.vendorName}
//                     </td>

//                     <td className="px-6 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOrderStatusClasses(
//                           order.status
//                         )}`}
//                       >
//                         {order.status}
//                       </span>

//                     </td>

//                     <td className="px-6 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getPaymentStatusClasses(
//                           order.paymentStatus
//                         )}`}
//                       >
//                         {order.paymentStatus}
//                       </span>

//                     </td>

//                     <td className="px-6 py-4 text-sm font-semibold text-slate-900">
//                       {formatCurrency(
//                         order.amountPaise
//                       )}
//                     </td>

//                     <td className="px-6 py-4 text-xs text-slate-500">
//                       {order.createdAt}
//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>

//           {/* MOBILE CARDS */}
//           <div className="space-y-3 p-4 md:hidden">

//             {filteredOrders.map((order) => (

//               <div
//                 key={order.orderId}
//                 className="rounded-xl border border-slate-200 p-4"
//               >

//                 <div className="flex items-start justify-between gap-3">

//                   <div>

//                     <p className="text-sm font-bold text-slate-900">
//                       {order.orderId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {order.vendorName}
//                     </p>

//                   </div>

//                   <span
//                     className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
//                       order.moduleId
//                     )}`}
//                   >
//                     {order.moduleId}
//                   </span>

//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-3">

//                   <div>

//                     <p className="text-[11px] text-slate-400">
//                       Order Status
//                     </p>

//                     <span
//                       className={`mt-1 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getOrderStatusClasses(
//                         order.status
//                       )}`}
//                     >
//                       {order.status}
//                     </span>

//                   </div>

//                   <div>

//                     <p className="text-[11px] text-slate-400">
//                       Payment
//                     </p>

//                     <span
//                       className={`mt-1 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getPaymentStatusClasses(
//                         order.paymentStatus
//                       )}`}
//                     >
//                       {order.paymentStatus}
//                     </span>

//                   </div>

//                   <div>

//                     <p className="text-[11px] text-slate-400">
//                       Amount
//                     </p>

//                     <p className="mt-1 text-sm font-bold text-slate-900">
//                       {formatCurrency(
//                         order.amountPaise
//                       )}
//                     </p>

//                   </div>

//                   <div>

//                     <p className="text-[11px] text-slate-400">
//                       Created
//                     </p>

//                     <p className="mt-1 text-xs font-medium text-slate-700">
//                       {order.createdAt}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//             ))}

//           </div>

//           {filteredOrders.length === 0 && (
//             <div className="p-10 text-center">

//               <p className="text-sm font-semibold text-slate-700">
//                 No orders found
//               </p>

//               <p className="mt-1 text-xs text-slate-500">
//                 No orders match the selected module.
//               </p>

//             </div>
//           )}

//         </div>
//       )}

//       {/* ACTIVITY */}
//       {activeTab === "activity" && (
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//           <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Customer Activity
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Operational activity summary for this customer.
//             </p>

//             <div className="mt-6 space-y-4">

//               <div className="flex gap-4 rounded-xl border border-slate-200 p-4">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">

//                   <span className="font-bold text-green-600">
//                     ✓
//                   </span>

//                 </div>

//                 <div>

//                   <p className="text-sm font-semibold text-slate-900">
//                     Customer account is active
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Current account status is{" "}
//                     {customer.status}.
//                   </p>

//                 </div>

//               </div>

//               <div className="flex gap-4 rounded-xl border border-slate-200 p-4">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">

//                   <span className="font-bold text-blue-600">
//                     O
//                   </span>

//                 </div>

//                 <div>

//                   <p className="text-sm font-semibold text-slate-900">
//                     Order activity
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     The customer has{" "}
//                     {customer.totalOrders} total orders,
//                     including{" "}
//                     {customer.completedOrders} completed
//                     orders.
//                   </p>

//                 </div>

//               </div>

//               <div className="flex gap-4 rounded-xl border border-slate-200 p-4">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100">

//                   <span className="font-bold text-orange-600">
//                     ₹
//                   </span>

//                 </div>

//                 <div>

//                   <p className="text-sm font-semibold text-slate-900">
//                     Spending activity
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Recorded customer order value is{" "}
//                     {formatCurrency(
//                       customer.totalSpentPaise
//                     )}.
//                   </p>

//                 </div>

//               </div>

//               <div className="flex gap-4 rounded-xl border border-slate-200 p-4">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100">

//                   <span className="font-bold text-purple-600">
//                     L
//                   </span>

//                 </div>

//                 <div>

//                   <p className="text-sm font-semibold text-slate-900">
//                     Last activity
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Last active:{" "}
//                     {customer.lastActiveAt}.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* MODULE SUMMARY */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Module Activity
//             </h2>

//             <div className="mt-5 space-y-3">

//               {(
//                 [
//                   "JUCART",
//                   "JURIDE",
//                   "JUSTAY",
//                   "JUHOME",
//                   "JUSHOPPING",
//                 ] as CustomerModule[]
//               ).map((module) => {

//                 const count =
//                   customer.orders.filter(
//                     (order) =>
//                       order.moduleId === module
//                   ).length;

//                 return (
//                   <div
//                     key={module}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >

//                     <span
//                       className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                         module
//                       )}`}
//                     >
//                       {module}
//                     </span>

//                     <span className="text-sm font-bold text-slate-900">
//                       {count}
//                     </span>

//                   </div>
//                 );
//               })}

//             </div>

//           </div>

//         </div>
//       )}

//       {/* STATUS MODAL */}
//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Change Customer Status
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Select the account status.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowStatusModal(false)
//                 }
//                 className="text-xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="mt-6 space-y-2">

//               {(
//                 [
//                   "ACTIVE",
//                   "INACTIVE",
//                   "BLOCKED",
//                   "SUSPENDED",
//                 ] as CustomerStatus[]
//               ).map((status) => (

//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() =>
//                     updateCustomerStatus(status)
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
//                     customer.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >

//                   <span className="text-sm font-semibold text-slate-800">
//                     {status}
//                   </span>

//                   {customer.status === status && (
//                     <span className="text-orange-600">
//                       ✓
//                     </span>
//                   )}

//                 </button>

//               ))}

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowStatusModal(false)
//               }
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Cancel
//             </button>

//           </div>

//         </div>
//       )}

//       {/* GOVERNANCE NOTE */}
//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-semibold text-orange-800">
//           JUERP Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Customer identity and account information should
//           originate from the authoritative user/customer
//           records. Order, payment, refund, and financial
//           information must remain authoritative in the trusted
//           backend and Firestore operational records. Status
//           changes shown here are development UI actions and
//           must be replaced by authorized backend operations
//           before production use.
//         </p>

//       </div>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  useCustomer,
  type CustomerModule,
  type CustomerStatus,
  type OrderStatus,
  type PaymentStatus,
} from "@/hooks/useCustomers";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amountPaise / 100);
}

function getStatusClasses(status: CustomerStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-slate-100 text-slate-700";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    case "SUSPENDED":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getOrderStatusClasses(status: OrderStatus) {
  const s = String(status).toUpperCase();
  if (s === "DELIVERED" || s === "SETTLED" || s === "COMPLETED")
    return "bg-green-100 text-green-700";
  if (
    ["PAID", "ACCEPTED", "PREPARING", "READY", "ASSIGNED", "PICKED_UP", "OUT_FOR_DELIVERY"].includes(
      s
    )
  )
    return "bg-blue-100 text-blue-700";
  if (["PAYMENT_PENDING", "REFUND_PENDING"].includes(s))
    return "bg-yellow-100 text-yellow-700";
  if (["CANCELLED", "REJECTED"].includes(s)) return "bg-red-100 text-red-700";
  if (s === "REFUNDED") return "bg-purple-100 text-purple-700";
  return "bg-slate-100 text-slate-700";
}

function getPaymentStatusClasses(status: PaymentStatus) {
  switch (String(status).toUpperCase()) {
    case "PAID":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(module: CustomerModule) {
  switch (String(module).toUpperCase()) {
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
      return "bg-slate-50 text-slate-700";
  }
}

export default function CustomerDetailsPage() {
  const params = useParams();
  const customerId = Array.isArray(params.customerId)
    ? params.customerId[0]
    : params.customerId;

  const { customer, loading, error, demoMode, refresh, setCustomer } =
    useCustomer(customerId);

  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "activity">(
    "overview"
  );
  const [orderFilter, setOrderFilter] = useState<"ALL" | CustomerModule>("ALL");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredOrders = useMemo(() => {
    if (!customer) return [];
    if (orderFilter === "ALL") return customer.orders;
    return customer.orders.filter(
      (o) => String(o.moduleId).toUpperCase() === String(orderFilter)
    );
  }, [customer, orderFilter]);

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading customer…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-600">{error}</p>
        <Link
          href="/entity-management/customers"
          className="mt-4 inline-block text-sm text-orange-600"
        >
          ← Back to customers
        </Link>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">Customer not found</p>
        <p className="mt-1 text-xs text-slate-500">
          No document in <code>users</code> for id{" "}
          <code>{customerId}</code>
          {demoMode ? " (demo mode)" : ""}.
        </p>
        <Link
          href="/entity-management/customers"
          className="mt-4 inline-block text-sm font-semibold text-orange-600"
        >
          ← Back to customers
        </Link>
      </div>
    );
  }

  const activeOrders = customer.orders.filter(
    (o) =>
      !["DELIVERED", "CANCELLED", "REJECTED", "REFUNDED", "SETTLED"].includes(
        o.status.toUpperCase()
      )
  ).length;

  const paidOrders = customer.orders.filter(
    (o) => String(o.paymentStatus).toUpperCase() === "PAID"
  ).length;

  function updateCustomerStatus(newStatus: CustomerStatus) {
    if (!customer) return;
    setCustomer({
      ...customer,
      status: newStatus,
      updatedAt: "Just now (local UI)",
    });
    setShowStatusModal(false);
    setStatusMessage(
      `Local UI status → ${newStatus}. Persist via authorized backend.`
    );
    setTimeout(() => setStatusMessage(""), 4000);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href="/entity-management/customers"
              className="text-sm font-medium text-slate-500 hover:text-orange-600"
            >
              Customers
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-sm text-slate-700">{customer.customerId}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">{customer.name}</h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                customer.status
              )}`}
            >
              {customer.status}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            Refresh
          </button>
          <Link
            href="/entity-management/customers"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
          >
            ← Back
          </Link>
          <button
            type="button"
            onClick={() => setShowStatusModal(true)}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Change Status
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {statusMessage}
        </div>
      )}

      <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate-500">Total Orders</p>
            <p className="mt-1 text-xl font-bold">{customer.totalOrders}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Active Orders</p>
            <p className="mt-1 text-xl font-bold text-blue-600">{activeOrders}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Paid Orders</p>
            <p className="mt-1 text-xl font-bold text-green-600">{paidOrders}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Spent</p>
            <p className="mt-1 text-xl font-bold">
              {formatCurrency(customer.totalSpentPaise)}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex border-b border-slate-200 bg-white rounded-xl overflow-x-auto">
        {(["overview", "orders", "activity"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold capitalize ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-slate-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="text-lg font-semibold">Personal Information</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={customer.name} />
              <Field label="Customer ID" value={customer.customerId} />
              <Field label="Firebase UID" value={customer.uid} />
              <Field label="Phone" value={customer.phone} />
              <Field label="Email" value={customer.email} />
              <Field label="Pincode" value={customer.pincode} />
              <Field label="State" value={customer.stateName} />
              <Field label="District" value={customer.districtName} />
              <div className="sm:col-span-2">
                <Field label="Address" value={customer.address} />
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Account</h2>
            <Field label="Status" value={customer.status} />
            <Field label="Created" value={customer.createdAt} />
            <Field label="Updated" value={customer.updatedAt} />
            <Field label="Last Active" value={customer.lastActiveAt} />
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="rounded-xl bg-white shadow-sm">
          <div className="border-b border-slate-200 p-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <h2 className="text-lg font-semibold">Customer Orders</h2>
            <select
              value={orderFilter}
              onChange={(e) =>
                setOrderFilter(e.target.value as "ALL" | CustomerModule)
              }
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="ALL">All Modules</option>
              <option value="JUCART">JUCART</option>
              <option value="JURIDE">JURIDE</option>
              <option value="JUSTAY">JUSTAY</option>
              <option value="JUHOME">JUHOME</option>
              <option value="JUSHOPPING">JUSHOPPING</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Module
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Vendor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-slate-500">
                      No orders for this customer.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="px-6 py-3 text-sm font-semibold">
                        {order.orderId}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-md px-2 py-1 text-xs font-semibold ${getModuleClasses(
                            order.moduleId
                          )}`}
                        >
                          {order.moduleId}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm">{order.vendorName}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${getOrderStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${getPaymentStatusClasses(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-sm font-semibold">
                        {formatCurrency(order.amountPaise)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "activity" && (
        <div className="rounded-xl bg-white p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700">
            Account status: <strong>{customer.status}</strong>
          </p>
          <p className="text-sm text-slate-700">
            Orders: {customer.totalOrders} total · {customer.completedOrders}{" "}
            completed · {customer.cancelledOrders} cancelled
          </p>
          <p className="text-sm text-slate-700">
            Spend: {formatCurrency(customer.totalSpentPaise)}
          </p>
          <p className="text-sm text-slate-700">
            Last active: {customer.lastActiveAt}
          </p>
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Change Customer Status</h2>
            <div className="mt-6 space-y-2">
              {(["ACTIVE", "INACTIVE", "BLOCKED", "SUSPENDED"] as CustomerStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateCustomerStatus(status)}
                    className={`flex w-full justify-between rounded-lg border px-4 py-3 text-left text-sm font-semibold ${
                      customer.status === status
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {status}
                    {customer.status === status && (
                      <span className="text-orange-600">✓</span>
                    )}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="mt-5 w-full rounded-lg border border-slate-300 py-2 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}