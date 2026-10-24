// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// type OperationalStatus =
//   | "HEALTHY"
//   | "MONITORING"
//   | "ATTENTION"
//   | "CRITICAL";

// interface ModuleHealth {
//   module: ModuleId;
//   activeOrders: number;
//   pendingPayments: number;
//   dispatchQueue: number;
//   bottlenecks: number;
//   status: OperationalStatus;
// }

// interface ActivityItem {
//   id: string;
//   title: string;
//   description: string;
//   module: ModuleId;
//   time: string;
//   severity: "INFO" | "WARNING" | "CRITICAL";
// }

// const MODULE_HEALTH: ModuleHealth[] = [
//   {
//     module: "JUCART",
//     activeOrders: 18,
//     pendingPayments: 3,
//     dispatchQueue: 5,
//     bottlenecks: 2,
//     status: "ATTENTION",
//   },
//   {
//     module: "JURIDE",
//     activeOrders: 12,
//     pendingPayments: 1,
//     dispatchQueue: 4,
//     bottlenecks: 1,
//     status: "MONITORING",
//   },
//   {
//     module: "JUSTAY",
//     activeOrders: 7,
//     pendingPayments: 1,
//     dispatchQueue: 0,
//     bottlenecks: 1,
//     status: "HEALTHY",
//   },
//   {
//     module: "JUHOME",
//     activeOrders: 9,
//     pendingPayments: 0,
//     dispatchQueue: 3,
//     bottlenecks: 1,
//     status: "MONITORING",
//   },
//   {
//     module: "JUSHOPPING",
//     activeOrders: 14,
//     pendingPayments: 5,
//     dispatchQueue: 4,
//     bottlenecks: 2,
//     status: "ATTENTION",
//   },
// ];

// const RECENT_ACTIVITY: ActivityItem[] = [
//   {
//     id: "ACT-001",
//     title: "Captain assignment delay",
//     description:
//       "Several READY orders are waiting for captain assignment.",
//     module: "JUCART",
//     time: "2 min ago",
//     severity: "CRITICAL",
//   },
//   {
//     id: "ACT-002",
//     title: "Payment pending queue increased",
//     description:
//       "JUSHOPPING has multiple orders awaiting payment confirmation.",
//     module: "JUSHOPPING",
//     time: "5 min ago",
//     severity: "WARNING",
//   },
//   {
//     id: "ACT-003",
//     title: "Order processing stable",
//     description:
//       "JUSTAY booking operations are currently within normal conditions.",
//     module: "JUSTAY",
//     time: "8 min ago",
//     severity: "INFO",
//   },
//   {
//     id: "ACT-004",
//     title: "Home service assignment monitored",
//     description:
//       "JUHOME service requests are being monitored for assignment delay.",
//     module: "JUHOME",
//     time: "11 min ago",
//     severity: "WARNING",
//   },
//   {
//     id: "ACT-005",
//     title: "Ride dispatch monitoring",
//     description:
//       "JURIDE captain availability is being monitored.",
//     module: "JURIDE",
//     time: "14 min ago",
//     severity: "INFO",
//   },
// ];

// const MODULES: ModuleId[] = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

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

// function getHealthClasses(status: OperationalStatus) {
//   switch (status) {
//     case "HEALTHY":
//       return "bg-green-100 text-green-700";

//     case "MONITORING":
//       return "bg-blue-100 text-blue-700";

//     case "ATTENTION":
//       return "bg-orange-100 text-orange-700";

//     case "CRITICAL":
//       return "bg-red-100 text-red-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getActivityClasses(
//   severity: ActivityItem["severity"]
// ) {
//   switch (severity) {
//     case "CRITICAL":
//       return "bg-red-100 text-red-700";

//     case "WARNING":
//       return "bg-orange-100 text-orange-700";

//     case "INFO":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function ControlRoomPage() {
//   const [selectedModule, setSelectedModule] =
//     useState<ModuleId | "ALL">("ALL");

//   const filteredModules = useMemo(() => {
//     if (selectedModule === "ALL") {
//       return MODULE_HEALTH;
//     }

//     return MODULE_HEALTH.filter(
//       (item) => item.module === selectedModule
//     );
//   }, [selectedModule]);

//   const totalActiveOrders = MODULE_HEALTH.reduce(
//     (total, item) => total + item.activeOrders,
//     0
//   );

//   const totalPendingPayments = MODULE_HEALTH.reduce(
//     (total, item) => total + item.pendingPayments,
//     0
//   );

//   const totalDispatchQueue = MODULE_HEALTH.reduce(
//     (total, item) => total + item.dispatchQueue,
//     0
//   );

//   const totalBottlenecks = MODULE_HEALTH.reduce(
//     (total, item) => total + item.bottlenecks,
//     0
//   );

//   const criticalActivities = RECENT_ACTIVITY.filter(
//     (item) => item.severity === "CRITICAL"
//   ).length;

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}
//       <div className="mb-6">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>

//             <div className="flex flex-wrap items-center gap-3">

//               <h1 className="text-2xl font-bold text-slate-900">
//                 Control Room
//               </h1>

//               <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">

//                 <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

//                 LIVE

//               </span>

//             </div>

//             <p className="mt-1 text-sm text-slate-500">
//               Central operational monitoring for the JUONE ecosystem.
//             </p>

//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

//             <p className="text-xs font-semibold text-orange-700">
//               JUERP Operations
//             </p>

//             <p className="mt-1 text-xs text-orange-600">
//               Real-time operational overview
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* TOP METRICS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

//         {/* ACTIVE ORDERS */}
//         <Link
//           href="/control-room/active-orders"
//           className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >

//           <div className="flex items-start justify-between">

//             <div>
//               <p className="text-xs font-medium text-slate-500">
//                 Active Orders
//               </p>

//               <p className="mt-2 text-3xl font-bold text-slate-900">
//                 {totalActiveOrders}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Across JUONE modules
//               </p>
//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">

//               <span className="text-lg font-bold text-orange-600">
//                 O
//               </span>

//             </div>

//           </div>

//           <p className="mt-4 text-xs font-semibold text-orange-600">
//             View Active Orders →
//           </p>

//         </Link>

//         {/* PAYMENT */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <div className="flex items-start justify-between">

//             <div>

//               <p className="text-xs font-medium text-slate-500">
//                 Pending Payments
//               </p>

//               <p className="mt-2 text-3xl font-bold text-yellow-600">
//                 {totalPendingPayments}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Awaiting confirmation
//               </p>

//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">

//               <span className="text-lg font-bold text-yellow-600">
//                 ₹
//               </span>

//             </div>

//           </div>

//         </div>

//         {/* DISPATCH */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <div className="flex items-start justify-between">

//             <div>

//               <p className="text-xs font-medium text-slate-500">
//                 Dispatch Queue
//               </p>

//               <p className="mt-2 text-3xl font-bold text-blue-600">
//                 {totalDispatchQueue}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Awaiting operational action
//               </p>

//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">

//               <span className="text-lg font-bold text-blue-600">
//                 D
//               </span>

//             </div>

//           </div>

//         </div>

//         {/* BOTTLENECKS */}
//         <Link
//           href="/control-room/bottlenecks"
//           className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >

//           <div className="flex items-start justify-between">

//             <div>

//               <p className="text-xs font-medium text-slate-500">
//                 Bottlenecks
//               </p>

//               <p className="mt-2 text-3xl font-bold text-red-600">
//                 {totalBottlenecks}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Operational exceptions
//               </p>

//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">

//               <span className="text-lg font-bold text-red-600">
//                 !
//               </span>

//             </div>

//           </div>

//           <p className="mt-4 text-xs font-semibold text-red-600">
//             Investigate Bottlenecks →
//           </p>

//         </Link>

//         {/* SYSTEM */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <div className="flex items-start justify-between">

//             <div>

//               <p className="text-xs font-medium text-slate-500">
//                 System Health
//               </p>

//               <p className="mt-2 text-3xl font-bold text-green-600">
//                 GOOD
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Operational monitoring
//               </p>

//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">

//               <span className="text-lg font-bold text-green-600">
//                 ✓
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

//         <div className="mb-5">

//           <h2 className="text-lg font-semibold text-slate-900">
//             Control Room Actions
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Quickly access the main operational monitoring areas.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//           <Link
//             href="/control-room/active-orders"
//             className="group rounded-xl border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50"
//           >

//             <div className="flex items-center justify-between">

//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">

//                 <span className="font-bold text-orange-600">
//                   O
//                 </span>

//               </div>

//               <span className="text-slate-400 group-hover:text-orange-500">
//                 →
//               </span>

//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-slate-900">
//               Active Orders
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Monitor active orders, payment status,
//               vendor processing, and captain assignment.
//             </p>

//           </Link>

//           <Link
//             href="/control-room/bottlenecks"
//             className="group rounded-xl border border-slate-200 p-5 transition hover:border-red-300 hover:bg-red-50"
//           >

//             <div className="flex items-center justify-between">

//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">

//                 <span className="font-bold text-red-600">
//                   !
//                 </span>

//               </div>

//               <span className="text-slate-400 group-hover:text-red-500">
//                 →
//               </span>

//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-slate-900">
//               Bottlenecks
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Identify operational delays and investigate
//               critical exceptions.
//             </p>

//           </Link>

//           <div className="rounded-xl border border-slate-200 p-5">

//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">

//               <span className="font-bold text-blue-600">
//                 D
//               </span>

//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-slate-900">
//               Dispatch Monitoring
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Monitor captain assignment and delivery
//               operational queues.
//             </p>

//           </div>

//           <div className="rounded-xl border border-slate-200 p-5">

//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

//               <span className="font-bold text-green-600">
//                 S
//               </span>

//             </div>

//             <h3 className="mt-4 text-sm font-semibold text-slate-900">
//               Service Health
//             </h3>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Review operational health across JUONE
//               modules.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* MODULE HEALTH */}
//       <div className="mb-6 rounded-xl bg-white shadow-sm">

//         <div className="border-b border-slate-200 p-6">

//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//             <div>

//               <h2 className="text-lg font-semibold text-slate-900">
//                 Module Operational Health
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Current operational condition across JUONE modules.
//               </p>

//             </div>

//             <select
//               value={selectedModule}
//               onChange={(event) =>
//                 setSelectedModule(
//                   event.target.value as ModuleId | "ALL"
//                 )
//               }
//               className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Modules
//               </option>

//               {MODULES.map((module) => (
//                 <option
//                   key={module}
//                   value={module}
//                 >
//                   {module}
//                 </option>
//               ))}

//             </select>

//           </div>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Active Orders
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Payments
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Dispatch
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Bottlenecks
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Health
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredModules.map((item) => (

//                 <tr
//                   key={item.module}
//                   className="transition hover:bg-slate-50"
//                 >

//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-md px-3 py-1 text-xs font-semibold ${getModuleClasses(
//                         item.module
//                       )}`}
//                     >
//                       {item.module}
//                     </span>

//                   </td>

//                   <td className="px-6 py-4">

//                     <span className="text-sm font-bold text-slate-800">
//                       {item.activeOrders}
//                     </span>

//                   </td>

//                   <td className="px-6 py-4">

//                     <span
//                       className={
//                         item.pendingPayments > 0
//                           ? "text-sm font-semibold text-yellow-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.pendingPayments}
//                     </span>

//                   </td>

//                   <td className="px-6 py-4">

//                     <span
//                       className={
//                         item.dispatchQueue > 0
//                           ? "text-sm font-semibold text-blue-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.dispatchQueue}
//                     </span>

//                   </td>

//                   <td className="px-6 py-4">

//                     <span
//                       className={
//                         item.bottlenecks > 0
//                           ? "text-sm font-bold text-red-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.bottlenecks}
//                     </span>

//                   </td>

//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${getHealthClasses(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//       {/* ACTIVITY + PRIORITY */}
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* RECENT ACTIVITY */}
//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">

//           <div className="border-b border-slate-200 p-6">

//             <div className="flex items-center justify-between">

//               <div>

//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Recent Operational Activity
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Latest events requiring monitoring.
//                 </p>

//               </div>

//               <span className="flex items-center gap-2 text-xs font-semibold text-green-600">

//                 <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

//                 LIVE

//               </span>

//             </div>

//           </div>

//           <div className="divide-y divide-slate-100">

//             {RECENT_ACTIVITY.map((activity) => (

//               <div
//                 key={activity.id}
//                 className="flex gap-4 p-5 transition hover:bg-slate-50"
//               >

//                 <div className="mt-1">

//                   <div
//                     className={`flex h-9 w-9 items-center justify-center rounded-full ${getActivityClasses(
//                       activity.severity
//                     )}`}
//                   >

//                     <span className="text-xs font-bold">
//                       {activity.severity === "CRITICAL"
//                         ? "!"
//                         : activity.severity === "WARNING"
//                         ? "W"
//                         : "i"}
//                     </span>

//                   </div>

//                 </div>

//                 <div className="min-w-0 flex-1">

//                   <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {activity.title}
//                     </p>

//                     <span className="text-xs text-slate-400">
//                       {activity.time}
//                     </span>

//                   </div>

//                   <p className="mt-1 text-xs leading-5 text-slate-500">
//                     {activity.description}
//                   </p>

//                   <span
//                     className={`mt-2 inline-block rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
//                       activity.module
//                     )}`}
//                   >
//                     {activity.module}
//                   </span>

//                 </div>

//               </div>

//             ))}

//           </div>

//         </div>

//         {/* PRIORITY PANEL */}
//         <div className="rounded-xl bg-white shadow-sm">

//           <div className="border-b border-slate-200 p-6">

//             <h2 className="text-lg font-semibold text-slate-900">
//               Priority Monitoring
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Areas requiring operational attention.
//             </p>

//           </div>

//           <div className="space-y-4 p-6">

//             {/* CRITICAL */}
//             <Link
//               href="/control-room/bottlenecks"
//               className="block rounded-xl border border-red-200 bg-red-50 p-4 transition hover:bg-red-100"
//             >

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-semibold text-red-700">
//                     Critical Bottlenecks
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-red-800">
//                     {criticalActivities}
//                   </p>

//                 </div>

//                 <span className="text-red-600">
//                   →
//                 </span>

//               </div>

//               <p className="mt-2 text-xs leading-5 text-red-600">
//                 Immediate investigation may be required.
//               </p>

//             </Link>

//             {/* PAYMENTS */}
//             <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-semibold text-yellow-700">
//                     Payment Queue
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-yellow-800">
//                     {totalPendingPayments}
//                   </p>

//                 </div>

//                 <span className="text-yellow-600">
//                   ₹
//                 </span>

//               </div>

//               <p className="mt-2 text-xs leading-5 text-yellow-600">
//                 Monitor server-confirmed payment status.
//               </p>

//             </div>

//             {/* DISPATCH */}
//             <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-semibold text-blue-700">
//                     Dispatch Queue
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-blue-800">
//                     {totalDispatchQueue}
//                   </p>

//                 </div>

//                 <span className="text-blue-600">
//                   D
//                 </span>

//               </div>

//               <p className="mt-2 text-xs leading-5 text-blue-600">
//                 Monitor assignment and delivery operations.
//               </p>

//             </div>

//             {/* SYSTEM */}
//             <div className="rounded-xl border border-green-200 bg-green-50 p-4">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-xs font-semibold text-green-700">
//                     Overall Health
//                   </p>

//                   <p className="mt-1 text-2xl font-bold text-green-800">
//                     GOOD
//                   </p>

//                 </div>

//                 <span className="text-green-600">
//                   ✓
//                 </span>

//               </div>

//               <p className="mt-2 text-xs leading-5 text-green-600">
//                 Continue operational monitoring.
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* ARCHITECTURE NOTE */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

//         <h2 className="text-sm font-semibold text-slate-900">
//           Control Room Architecture
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-slate-500">
//           The JUERP Control Room is an operational monitoring
//           layer. Authoritative order, payment, dispatch,
//           booking, settlement, and verification states must
//           remain controlled by the trusted backend and
//           authoritative Firestore data. Client-side values shown
//           in this development page are presentation data and
//           must not become the source of financial or operational
//           truth.
//         </p>

//         <div className="mt-5 overflow-x-auto">

//           <div className="flex min-w-[850px] items-center gap-3">

//             <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">

//               <p className="text-xs font-semibold text-orange-700">
//                 JUONE / JUVendor / JuCaptain
//               </p>

//               <p className="mt-1 text-[11px] text-orange-600">
//                 Operational clients
//               </p>

//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">

//               <p className="text-xs font-semibold text-blue-700">
//                 Trusted Backend
//               </p>

//               <p className="mt-1 text-[11px] text-blue-600">
//                 Validation / orchestration
//               </p>

//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3">

//               <p className="text-xs font-semibold text-purple-700">
//                 Firestore
//               </p>

//               <p className="mt-1 text-[11px] text-purple-600">
//                 Operational state
//               </p>

//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">

//               <p className="text-xs font-semibold text-green-700">
//                 JUERP Control Room
//               </p>

//               <p className="mt-1 text-[11px] text-green-600">
//                 Monitor / authorize
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useControlRoomData, {
//   type ModuleId,
//   type OperationalStatus,
//   type ActivityItem,
// } from "@/hooks/useControlRoomData";

// const MODULES: ModuleId[] = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// function getModuleClasses(module: ModuleId | "SYSTEM") {
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

// function getHealthClasses(status: OperationalStatus) {
//   switch (status) {
//     case "HEALTHY":
//       return "bg-green-100 text-green-700";
//     case "MONITORING":
//       return "bg-blue-100 text-blue-700";
//     case "ATTENTION":
//       return "bg-orange-100 text-orange-700";
//     case "CRITICAL":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getActivityClasses(severity: ActivityItem["severity"]) {
//   switch (severity) {
//     case "CRITICAL":
//       return "bg-red-100 text-red-700";
//     case "WARNING":
//       return "bg-orange-100 text-orange-700";
//     case "INFO":
//       return "bg-blue-100 text-blue-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function ControlRoomPage() {
//   const { data, loading, error, demoMode, lastRefreshedAt, refresh } =
//     useControlRoomData(15000);

//   const [selectedModule, setSelectedModule] = useState<ModuleId | "ALL">("ALL");

//   const filteredModules = useMemo(() => {
//     if (selectedModule === "ALL") return data.modules;
//     return data.modules.filter((item) => item.module === selectedModule);
//   }, [data.modules, selectedModule]);

//   const systemHealthColor =
//     data.systemHealth === "GOOD"
//       ? "text-green-600"
//       : data.systemHealth === "ATTENTION"
//         ? "text-orange-600"
//         : "text-red-600";

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       {/* HEADER */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <div className="flex flex-wrap items-center gap-3">
//               <h1 className="text-2xl font-bold text-slate-900">Control Room</h1>
//               <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
//                 <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
//                 {loading ? "LOADING" : "LIVE"}
//               </span>
//             </div>
//             <p className="mt-1 text-sm text-slate-500">
//               Central operational monitoring for the JUONE ecosystem.
//               {lastRefreshedAt
//                 ? ` · Updated ${new Date(lastRefreshedAt).toLocaleTimeString("en-IN")}`
//                 : ""}
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               disabled={loading}
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//             >
//               {loading ? "Refreshing…" : "Refresh"}
//             </button>
//             <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-semibold text-orange-700">JUERP Operations</p>
//               <p className="mt-1 text-xs text-orange-600">Firestore operational state</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
//           <p className="text-sm font-semibold text-red-800">Unable to load control room data</p>
//           <p className="mt-1 text-xs text-red-700">{error}</p>
//         </div>
//       )}

//       {/* {demoMode && (
//         <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
//           <p className="text-sm font-semibold text-amber-800">Demo mode</p>
//           <p className="mt-1 text-xs text-amber-700">
//             Set <code>NEXT_PUBLIC_DEMO_MODE=false</code> for live Firestore reads.
//           </p>
//         </div>
//       )} */}

//       {/* TOP METRICS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Link
//           href="/control-room/active-orders"
//           className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs font-medium text-slate-500">Active Orders</p>
//               <p className="mt-2 text-3xl font-bold text-slate-900">
//                 {loading ? "…" : data.totalActiveOrders}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">Across JUONE modules</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
//               <span className="text-lg font-bold text-orange-600">O</span>
//             </div>
//           </div>
//           <p className="mt-4 text-xs font-semibold text-orange-600">View Active Orders →</p>
//         </Link>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs font-medium text-slate-500">Pending Payments</p>
//               <p className="mt-2 text-3xl font-bold text-yellow-600">
//                 {loading ? "…" : data.totalPendingPayments}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">Awaiting confirmation</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
//               <span className="text-lg font-bold text-yellow-600">₹</span>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs font-medium text-slate-500">Dispatch Queue</p>
//               <p className="mt-2 text-3xl font-bold text-blue-600">
//                 {loading ? "…" : data.totalDispatchQueue}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">READY / ASSIGNED</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
//               <span className="text-lg font-bold text-blue-600">D</span>
//             </div>
//           </div>
//         </div>

//         <Link
//           href="/control-room/bottlenecks"
//           className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs font-medium text-slate-500">Bottlenecks</p>
//               <p className="mt-2 text-3xl font-bold text-red-600">
//                 {loading ? "…" : data.totalBottlenecks}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">Operational exceptions</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
//               <span className="text-lg font-bold text-red-600">!</span>
//             </div>
//           </div>
//           <p className="mt-4 text-xs font-semibold text-red-600">Investigate Bottlenecks →</p>
//         </Link>

//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-xs font-medium text-slate-500">System Health</p>
//               <p className={`mt-2 text-3xl font-bold ${systemHealthColor}`}>
//                 {loading ? "…" : data.systemHealth}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">Derived from live queues</p>
//             </div>
//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
//               <span className="text-lg font-bold text-green-600">✓</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
//         <div className="mb-5">
//           <h2 className="text-lg font-semibold text-slate-900">Control Room Actions</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Main operational monitoring areas.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           <Link
//             href="/control-room/active-orders"
//             className="group rounded-xl border border-slate-200 p-5 transition hover:border-orange-300 hover:bg-orange-50"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
//                 <span className="font-bold text-orange-600">O</span>
//               </div>
//               <span className="text-slate-400 group-hover:text-orange-500">→</span>
//             </div>
//             <h3 className="mt-4 text-sm font-semibold text-slate-900">Active Orders</h3>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Monitor active orders, payment status, vendor processing, and captain assignment.
//             </p>
//           </Link>

//           <Link
//             href="/control-room/bottlenecks"
//             className="group rounded-xl border border-slate-200 p-5 transition hover:border-red-300 hover:bg-red-50"
//           >
//             <div className="flex items-center justify-between">
//               <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
//                 <span className="font-bold text-red-600">!</span>
//               </div>
//               <span className="text-slate-400 group-hover:text-red-500">→</span>
//             </div>
//             <h3 className="mt-4 text-sm font-semibold text-slate-900">Bottlenecks</h3>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Identify operational delays and investigate critical exceptions.
//             </p>
//           </Link>

//           <div className="rounded-xl border border-slate-200 p-5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
//               <span className="font-bold text-blue-600">D</span>
//             </div>
//             <h3 className="mt-4 text-sm font-semibold text-slate-900">Dispatch Monitoring</h3>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               READY / ASSIGNED queues from Firestore order status.
//             </p>
//           </div>

//           <div className="rounded-xl border border-slate-200 p-5">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
//               <span className="font-bold text-green-600">S</span>
//             </div>
//             <h3 className="mt-4 text-sm font-semibold text-slate-900">Service Health</h3>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Module health derived from live operational counts.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* MODULE HEALTH */}
//       <div className="mb-6 rounded-xl bg-white shadow-sm">
//         <div className="border-b border-slate-200 p-6">
//           <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Module Operational Health
//               </h2>
//               <p className="mt-1 text-xs text-slate-500">
//                 Computed from <code>orders</code> and <code>payments</code>.
//               </p>
//             </div>
//             <select
//               value={selectedModule}
//               onChange={(e) =>
//                 setSelectedModule(e.target.value as ModuleId | "ALL")
//               }
//               className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >
//               <option value="ALL">All Modules</option>
//               {MODULES.map((module) => (
//                 <option key={module} value={module}>
//                   {module}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Active Orders
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Payments
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Dispatch
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Bottlenecks
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Health
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredModules.map((item) => (
//                 <tr key={item.module} className="transition hover:bg-slate-50">
//                   <td className="px-6 py-4">
//                     <span
//                       className={`rounded-md px-3 py-1 text-xs font-semibold ${getModuleClasses(
//                         item.module
//                       )}`}
//                     >
//                       {item.module}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-bold text-slate-800">
//                     {item.activeOrders}
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={
//                         item.pendingPayments > 0
//                           ? "text-sm font-semibold text-yellow-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.pendingPayments}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={
//                         item.dispatchQueue > 0
//                           ? "text-sm font-semibold text-blue-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.dispatchQueue}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={
//                         item.bottlenecks > 0
//                           ? "text-sm font-bold text-red-600"
//                           : "text-sm font-semibold text-green-600"
//                       }
//                     >
//                       {item.bottlenecks}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${getHealthClasses(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* ACTIVITY + PRIORITY */}
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Recent Operational Activity
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   From <code>audit_logs</code> plus derived queue signals.
//                 </p>
//               </div>
//               <span className="flex items-center gap-2 text-xs font-semibold text-green-600">
//                 <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
//                 LIVE
//               </span>
//             </div>
//           </div>

//           <div className="divide-y divide-slate-100">
//             {loading && data.recentActivity.length === 0 ? (
//               <p className="p-8 text-center text-sm text-slate-500">Loading activity…</p>
//             ) : data.recentActivity.length === 0 ? (
//               <p className="p-8 text-center text-sm text-slate-500">
//                 No recent activity. Empty <code>audit_logs</code> / queues.
//               </p>
//             ) : (
//               data.recentActivity.map((activity) => (
//                 <div
//                   key={activity.id}
//                   className="flex gap-4 p-5 transition hover:bg-slate-50"
//                 >
//                   <div className="mt-1">
//                     <div
//                       className={`flex h-9 w-9 items-center justify-center rounded-full ${getActivityClasses(
//                         activity.severity
//                       )}`}
//                     >
//                       <span className="text-xs font-bold">
//                         {activity.severity === "CRITICAL"
//                           ? "!"
//                           : activity.severity === "WARNING"
//                             ? "W"
//                             : "i"}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {activity.title}
//                       </p>
//                       <span className="text-xs text-slate-400">{activity.time}</span>
//                     </div>
//                     <p className="mt-1 text-xs leading-5 text-slate-500">
//                       {activity.description}
//                     </p>
//                     <span
//                       className={`mt-2 inline-block rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
//                         activity.module
//                       )}`}
//                     >
//                       {activity.module}
//                     </span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="rounded-xl bg-white shadow-sm">
//           <div className="border-b border-slate-200 p-6">
//             <h2 className="text-lg font-semibold text-slate-900">Priority Monitoring</h2>
//             <p className="mt-1 text-xs text-slate-500">Areas requiring attention.</p>
//           </div>
//           <div className="space-y-4 p-6">
//             <Link
//               href="/control-room/bottlenecks"
//               className="block rounded-xl border border-red-200 bg-red-50 p-4 transition hover:bg-red-100"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-xs font-semibold text-red-700">Critical signals</p>
//                   <p className="mt-1 text-2xl font-bold text-red-800">
//                     {data.criticalActivities}
//                   </p>
//                 </div>
//                 <span className="text-red-600">→</span>
//               </div>
//             </Link>

//             <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
//               <p className="text-xs font-semibold text-yellow-700">Payment Queue</p>
//               <p className="mt-1 text-2xl font-bold text-yellow-800">
//                 {data.totalPendingPayments}
//               </p>
//             </div>

//             <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
//               <p className="text-xs font-semibold text-blue-700">Dispatch Queue</p>
//               <p className="mt-1 text-2xl font-bold text-blue-800">
//                 {data.totalDispatchQueue}
//               </p>
//             </div>

//             <div className="rounded-xl border border-green-200 bg-green-50 p-4">
//               <p className="text-xs font-semibold text-green-700">Overall Health</p>
//               <p className={`mt-1 text-2xl font-bold ${systemHealthColor}`}>
//                 {data.systemHealth}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
//         <h2 className="text-sm font-semibold text-slate-900">Control Room Architecture</h2>
//         <p className="mt-2 text-xs leading-6 text-slate-500">
//           Monitoring only. Authoritative order, payment, dispatch, booking, settlement and
//           verification state remain in the trusted backend and Firestore. This page does not
//           write financial or status transitions.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useControlRoomData, {
  type ModuleId,
  type OperationalStatus,
  type ActivityItem,
} from "@/hooks/useControlRoomData";
import useScope from "@/hooks/useScope";
import OrdersPanel from "@/components/control-room/OrdersPanel";
import CaptainPanel from "@/components/control-room/CaptainPanel";
import DispatchPanel from "@/components/control-room/DispatchPanel";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";

const MODULES: ModuleId[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
];

function getModuleClasses(module: ModuleId | "SYSTEM") {
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
      return "bg-slate-50 text-slate-700";
  }
}

function getHealthClasses(status: OperationalStatus) {
  switch (status) {
    case "HEALTHY":
      return "bg-green-100 text-green-700";
    case "MONITORING":
      return "bg-blue-100 text-blue-700";
    case "ATTENTION":
      return "bg-orange-100 text-orange-700";
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getActivityClasses(severity: ActivityItem["severity"]) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "WARNING":
      return "bg-orange-100 text-orange-700";
    case "INFO":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function ControlRoomPage() {
  const scope = useScope();
  const { data, loading, error, lastRefreshedAt, refresh } =
    useControlRoomData(15000, {
      stateId: scope.stateId,
      districtId: scope.districtId,
      role: scope.role,
    });

  const [selectedModule, setSelectedModule] = useState<ModuleId | "ALL">("ALL");
  const [activeTab, setActiveTab] = useState<"overview" | "dispatch">("overview");

  const filteredModules = useMemo(() => {
    if (selectedModule === "ALL") return data.modules;
    return data.modules.filter((item) => item.module === selectedModule);
  }, [data.modules, selectedModule]);

  const systemHealthColor =
    data.systemHealth === "GOOD"
      ? "text-green-600"
      : data.systemHealth === "ATTENTION"
        ? "text-orange-600"
        : "text-red-600";

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">Control Room</h1>
              <span className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                {loading ? "LOADING" : "LIVE"}
              </span>
              <ScopeBadge />
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Operational monitoring + live dispatch
              {scope.scope?.name ? ` · Scope: ${scope.scope.name}` : ""}
              {lastRefreshedAt
                ? ` · Updated ${new Date(lastRefreshedAt).toLocaleTimeString("en-IN")}`
                : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="mt-4 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2.5 text-sm font-semibold ${
              activeTab === "overview"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-slate-500"
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("dispatch")}
            className={`px-4 py-2.5 text-sm font-semibold ${
              activeTab === "dispatch"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-slate-500"
            }`}
          >
            Live Dispatch
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            Unable to load control room data
          </p>
          <p className="mt-1 text-xs text-red-700">{error}</p>
        </div>
      )}

      {activeTab === "dispatch" ? (
        /* ===================== LIVE DISPATCH TAB ===================== */
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-6">
            <OrdersPanel
              stateId={scope.stateId}
              districtId={scope.districtId}
              role={scope.role}
            />
            <DispatchPanel
              stateId={scope.stateId}
              districtId={scope.districtId}
              role={scope.role}
            />
          </div>
          <div>
            <CaptainPanel
              stateId={scope.stateId}
              districtId={scope.districtId}
              role={scope.role}
            />
          </div>
        </div>
      ) : (
        /* ===================== OVERVIEW TAB (your existing UI) ===================== */
        <>
          {/* TOP METRICS */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <Link
              href="/control-room/active-orders"
              className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Active Orders</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loading ? "…" : data.totalActiveOrders}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Across JUONE modules</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-lg font-bold text-orange-600">O</span>
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold text-orange-600">
                View Active Orders →
              </p>
            </Link>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Pending Payments</p>
                  <p className="mt-2 text-3xl font-bold text-yellow-600">
                    {loading ? "…" : data.totalPendingPayments}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Awaiting confirmation</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-100">
                  <span className="text-lg font-bold text-yellow-600">₹</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Dispatch Queue</p>
                  <p className="mt-2 text-3xl font-bold text-blue-600">
                    {loading ? "…" : data.totalDispatchQueue}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">READY / ASSIGNED</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
                  <span className="text-lg font-bold text-blue-600">D</span>
                </div>
              </div>
            </div>

            <Link
              href="/control-room/bottlenecks"
              className="rounded-xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Bottlenecks</p>
                  <p className="mt-2 text-3xl font-bold text-red-600">
                    {loading ? "…" : data.totalBottlenecks}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Operational exceptions</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                  <span className="text-lg font-bold text-red-600">!</span>
                </div>
              </div>
              <p className="mt-4 text-xs font-semibold text-red-600">
                Investigate Bottlenecks →
              </p>
            </Link>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">System Health</p>
                  <p className={`mt-2 text-3xl font-bold ${systemHealthColor}`}>
                    {loading ? "…" : data.systemHealth}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">Derived from live queues</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                  <span className="text-lg font-bold text-green-600">✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* MODULE HEALTH TABLE */}
          <div className="mb-6 rounded-xl bg-white shadow-sm">
            <div className="border-b border-slate-200 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Module Operational Health
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Scoped to your role · from orders + payments
                  </p>
                </div>
                <select
                  value={selectedModule}
                  onChange={(e) =>
                    setSelectedModule(e.target.value as ModuleId | "ALL")
                  }
                  className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
                >
                  <option value="ALL">All Modules</option>
                  {MODULES.map((module) => (
                    <option key={module} value={module}>
                      {module}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    {["Module", "Active Orders", "Payments", "Dispatch", "Bottlenecks", "Health"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredModules.map((item) => (
                    <tr key={item.module} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-md px-3 py-1 text-xs font-semibold ${getModuleClasses(
                            item.module,
                          )}`}
                        >
                          {item.module}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-800">
                        {item.activeOrders}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-yellow-600">
                        {item.pendingPayments}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                        {item.dispatchQueue}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-red-600">
                        {item.bottlenecks}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getHealthClasses(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIVITY + PRIORITY */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Operational Activity
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {data.recentActivity.length === 0 ? (
                  <p className="p-8 text-center text-sm text-slate-500">
                    No recent activity.
                  </p>
                ) : (
                  data.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex gap-4 p-5 hover:bg-slate-50">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${getActivityClasses(
                          activity.severity,
                        )}`}
                      >
                        <span className="text-xs font-bold">
                          {activity.severity === "CRITICAL"
                            ? "!"
                            : activity.severity === "WARNING"
                              ? "W"
                              : "i"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-sm font-semibold text-slate-800">
                            {activity.title}
                          </p>
                          <span className="text-xs text-slate-400">{activity.time}</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {activity.description}
                        </p>
                        <span
                          className={`mt-2 inline-block rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
                            activity.module,
                          )}`}
                        >
                          {activity.module}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm">
              <div className="border-b border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Priority Monitoring
                </h2>
              </div>
              <div className="space-y-4 p-6">
                <Link
                  href="/control-room/bottlenecks"
                  className="block rounded-xl border border-red-200 bg-red-50 p-4 hover:bg-red-100"
                >
                  <p className="text-xs font-semibold text-red-700">Critical signals</p>
                  <p className="mt-1 text-2xl font-bold text-red-800">
                    {data.criticalActivities}
                  </p>
                </Link>
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-xs font-semibold text-yellow-700">Payment Queue</p>
                  <p className="mt-1 text-2xl font-bold text-yellow-800">
                    {data.totalPendingPayments}
                  </p>
                </div>
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                  <p className="text-xs font-semibold text-blue-700">Dispatch Queue</p>
                  <p className="mt-1 text-2xl font-bold text-blue-800">
                    {data.totalDispatchQueue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}