// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// type HealthStatus =
//   | "HEALTHY"
//   | "WARNING"
//   | "CRITICAL";

// type DashboardMetric = {
//   title: string;
//   value: string;
//   subtitle: string;
//   icon: string;
//   status: HealthStatus;
// };

// type ModuleHealth = {
//   moduleId: ModuleId;
//   name: string;
//   activeOrders: number;
//   pendingPayments: number;
//   activeVendors: number;
//   activeCaptains: number;
//   health: HealthStatus;
// };

// type RecentActivity = {
//   id: string;
//   action: string;
//   entity: string;
//   referenceId: string;
//   actor: string;
//   status: "SUCCESS" | "WARNING" | "PENDING";
//   timestamp: string;
// };

// const MODULE_HEALTH: ModuleHealth[] = [
//   {
//     moduleId: "JUCART",
//     name: "JuCart",
//     activeOrders: 128,
//     pendingPayments: 7,
//     activeVendors: 84,
//     activeCaptains: 46,
//     health: "HEALTHY",
//   },
//   {
//     moduleId: "JURIDE",
//     name: "JuRide",
//     activeOrders: 76,
//     pendingPayments: 3,
//     activeVendors: 22,
//     activeCaptains: 138,
//     health: "HEALTHY",
//   },
//   {
//     moduleId: "JUSTAY",
//     name: "JuStay",
//     activeOrders: 31,
//     pendingPayments: 4,
//     activeVendors: 37,
//     activeCaptains: 12,
//     health: "WARNING",
//   },
//   {
//     moduleId: "JUHOME",
//     name: "JuHome",
//     activeOrders: 43,
//     pendingPayments: 2,
//     activeVendors: 51,
//     activeCaptains: 29,
//     health: "HEALTHY",
//   },
//   {
//     moduleId: "JUSHOPPING",
//     name: "JuShopping",
//     activeOrders: 92,
//     pendingPayments: 5,
//     activeVendors: 68,
//     activeCaptains: 34,
//     health: "HEALTHY",
//   },
// ];

// const RECENT_ACTIVITY: RecentActivity[] = [
//   {
//     id: "AUD-1001",
//     action: "Order payment confirmed",
//     entity: "Order",
//     referenceId: "ORD-2026-00124",
//     actor: "SYSTEM",
//     status: "SUCCESS",
//     timestamp: "05 Oct 2026, 20:14",
//   },
//   {
//     id: "AUD-1002",
//     action: "Vendor verification submitted",
//     entity: "Vendor",
//     referenceId: "VEN-00082",
//     actor: "VENDOR_OWNER",
//     status: "PENDING",
//     timestamp: "05 Oct 2026, 20:08",
//   },
//   {
//     id: "AUD-1003",
//     action: "Captain assignment completed",
//     entity: "Assignment",
//     referenceId: "ASN-00482",
//     actor: "DISPATCH_ENGINE",
//     status: "SUCCESS",
//     timestamp: "05 Oct 2026, 19:56",
//   },
//   {
//     id: "AUD-1004",
//     action: "Cashfree reconciliation exception",
//     entity: "Payment",
//     referenceId: "PAY-008921",
//     actor: "RECONCILIATION",
//     status: "WARNING",
//     timestamp: "05 Oct 2026, 19:42",
//   },
//   {
//     id: "AUD-1005",
//     action: "Customer account updated",
//     entity: "Customer",
//     referenceId: "CUS-00342",
//     actor: "STATE_ADMIN",
//     status: "SUCCESS",
//     timestamp: "05 Oct 2026, 19:31",
//   },
// ];

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amountPaise / 100);
// }

// function getHealthClasses(status: HealthStatus) {
//   if (status === "HEALTHY") {
//     return "bg-green-100 text-green-700 border-green-200";
//   }

//   if (status === "WARNING") {
//     return "bg-amber-100 text-amber-700 border-amber-200";
//   }

//   return "bg-red-100 text-red-700 border-red-200";
// }

// function getHealthLabel(status: HealthStatus) {
//   if (status === "HEALTHY") {
//     return "Healthy";
//   }

//   if (status === "WARNING") {
//     return "Warning";
//   }

//   return "Critical";
// }

// function getActivityClasses(
//   status: RecentActivity["status"]
// ) {
//   if (status === "SUCCESS") {
//     return "bg-green-100 text-green-700";
//   }

//   if (status === "WARNING") {
//     return "bg-amber-100 text-amber-700";
//   }

//   return "bg-blue-100 text-blue-700";
// }

// function getModuleClasses(moduleId: ModuleId) {
//   const classes: Record<ModuleId, string> = {
//     JUCART: "bg-orange-100 text-orange-700",
//     JURIDE: "bg-blue-100 text-blue-700",
//     JUSTAY: "bg-purple-100 text-purple-700",
//     JUHOME: "bg-green-100 text-green-700",
//     JUSHOPPING: "bg-pink-100 text-pink-700",
//   };

//   return classes[moduleId];
// }

// function SummaryCard({
//   title,
//   value,
//   subtitle,
//   icon,
//   status,
// }: DashboardMetric) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

//       <div className="flex items-start justify-between">

//         <div>

//           <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//             {title}
//           </p>

//           <p className="mt-2 text-2xl font-black text-slate-900">
//             {value}
//           </p>

//           <p className="mt-1 text-xs text-slate-500">
//             {subtitle}
//           </p>

//         </div>

//         <div
//           className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
//             status === "HEALTHY"
//               ? "bg-green-50"
//               : status === "WARNING"
//                 ? "bg-amber-50"
//                 : "bg-red-50"
//           }`}
//         >
//           {icon}
//         </div>

//       </div>

//       <div className="mt-4">
//         <span
//           className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getHealthClasses(
//             status
//           )}`}
//         >
//           {getHealthLabel(status)}
//         </span>
//       </div>

//     </div>
//   );
// }

// function ModuleCard({
//   module,
// }: {
//   module: ModuleHealth;
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

//       <div className="flex items-start justify-between">

//         <div className="flex items-center gap-3">

//           <div
//             className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${getModuleClasses(
//               module.moduleId
//             )}`}
//           >
//             {module.moduleId === "JUCART"
//               ? "JC"
//               : module.moduleId === "JURIDE"
//                 ? "JR"
//                 : module.moduleId === "JUSTAY"
//                   ? "JS"
//                   : module.moduleId === "JUHOME"
//                     ? "JH"
//                     : "JSH"}
//           </div>

//           <div>

//             <h3 className="text-sm font-bold text-slate-900">
//               {module.name}
//             </h3>

//             <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//               {module.moduleId}
//             </p>

//           </div>

//         </div>

//         <span
//           className={`rounded-full border px-2 py-1 text-[9px] font-bold ${getHealthClasses(
//             module.health
//           )}`}
//         >
//           {getHealthLabel(module.health)}
//         </span>

//       </div>

//       <div className="mt-5 grid grid-cols-2 gap-3">

//         <div className="rounded-xl bg-slate-50 p-3">
//           <p className="text-[10px] text-slate-400">
//             Active Orders
//           </p>
//           <p className="mt-1 text-lg font-black text-slate-800">
//             {formatNumber(module.activeOrders)}
//           </p>
//         </div>

//         <div className="rounded-xl bg-slate-50 p-3">
//           <p className="text-[10px] text-slate-400">
//             Pending Payments
//           </p>
//           <p className="mt-1 text-lg font-black text-slate-800">
//             {formatNumber(module.pendingPayments)}
//           </p>
//         </div>

//         <div className="rounded-xl bg-slate-50 p-3">
//           <p className="text-[10px] text-slate-400">
//             Active Vendors
//           </p>
//           <p className="mt-1 text-lg font-black text-slate-800">
//             {formatNumber(module.activeVendors)}
//           </p>
//         </div>

//         <div className="rounded-xl bg-slate-50 p-3">
//           <p className="text-[10px] text-slate-400">
//             Active Captains
//           </p>
//           <p className="mt-1 text-lg font-black text-slate-800">
//             {formatNumber(module.activeCaptains)}
//           </p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default function DashboardPage() {
//   const [selectedModule, setSelectedModule] =
//     useState<ModuleId | "ALL">("ALL");

//   const [search, setSearch] =
//     useState("");

//   const totalActiveOrders = useMemo(
//     () =>
//       MODULE_HEALTH.reduce(
//         (total, module) =>
//           total + module.activeOrders,
//         0
//       ),
//     []
//   );

//   const totalPendingPayments = useMemo(
//     () =>
//       MODULE_HEALTH.reduce(
//         (total, module) =>
//           total + module.pendingPayments,
//         0
//       ),
//     []
//   );

//   const totalVendors = useMemo(
//     () =>
//       MODULE_HEALTH.reduce(
//         (total, module) =>
//           total + module.activeVendors,
//         0
//       ),
//     []
//   );

//   const totalCaptains = useMemo(
//     () =>
//       MODULE_HEALTH.reduce(
//         (total, module) =>
//           total + module.activeCaptains,
//         0
//       ),
//     []
//   );

//   const filteredModules = useMemo(() => {
//     return MODULE_HEALTH.filter((module) => {

//       const matchesModule =
//         selectedModule === "ALL" ||
//         module.moduleId === selectedModule;

//       const searchValue =
//         search.trim().toLowerCase();

//       const matchesSearch =
//         !searchValue ||
//         module.name
//           .toLowerCase()
//           .includes(searchValue) ||
//         module.moduleId
//           .toLowerCase()
//           .includes(searchValue);

//       return (
//         matchesModule &&
//         matchesSearch
//       );
//     });
//   }, [selectedModule, search]);

//   const metrics: DashboardMetric[] = [
//     {
//       title: "Active Orders",
//       value: formatNumber(totalActiveOrders),
//       subtitle: "Across all JUONE modules",
//       icon: "🛒",
//       status: "HEALTHY",
//     },
//     {
//       title: "Pending Payments",
//       value: formatNumber(totalPendingPayments),
//       subtitle: "Requires monitoring",
//       icon: "₹",
//       status:
//         totalPendingPayments > 15
//           ? "WARNING"
//           : "HEALTHY",
//     },
//     {
//       title: "Active Vendors",
//       value: formatNumber(totalVendors),
//       subtitle: "Currently operational",
//       icon: "🏪",
//       status: "HEALTHY",
//     },
//     {
//       title: "Active Captains",
//       value: formatNumber(totalCaptains),
//       subtitle: "Online/eligible network",
//       icon: "🚗",
//       status: "HEALTHY",
//     },
//   ];

//   return (
//     <div className="p-4 md:p-6 lg:p-8">

//       {/* PAGE HEADER */}

//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//         <div>

//           <div className="mb-2 flex items-center gap-2">

//             <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700">
//               JUERP
//             </span>

//             <span className="text-xs text-slate-400">
//               /
//             </span>

//             <span className="text-xs font-medium text-slate-500">
//               Executive Dashboard
//             </span>

//           </div>

//           <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
//             JUONE Operations Dashboard
//           </h1>

//           <p className="mt-1 max-w-3xl text-sm text-slate-500">
//             Central governance and operational overview
//             for JuCart, JuRide, JuStay, JuHome and
//             JuShopping.
//           </p>

//         </div>

//         <div className="flex flex-wrap gap-2">

//           <Link
//             href="/control-room"
//             className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
//           >
//             Open Control Room
//           </Link>

//           <Link
//             href="/financial-audit"
//             className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
//           >
//             Financial Audit
//           </Link>

//         </div>

//       </div>

//       {/* SYSTEM STATUS */}

//       <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">

//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

//           <div className="flex items-start gap-3">

//             <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
//               <span className="h-3 w-3 rounded-full bg-green-500" />
//             </div>

//             <div>

//               <p className="text-sm font-bold text-green-800">
//                 Platform Operational
//               </p>

//               <p className="mt-1 text-xs text-green-700">
//                 JUONE modules are being monitored through
//                 the JUERP governance layer.
//               </p>

//             </div>

//           </div>

//           <span className="w-fit rounded-full border border-green-200 bg-white px-3 py-1.5 text-[10px] font-bold text-green-700">
//             LIVE MONITORING
//           </span>

//         </div>

//       </div>

//       {/* SUMMARY CARDS */}

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

//         {metrics.map((metric) => (
//           <SummaryCard
//             key={metric.title}
//             {...metric}
//           />
//         ))}

//       </div>

//       {/* QUICK ACTIONS */}

//       <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

//         <div className="mb-4">

//           <h2 className="text-base font-black text-slate-900">
//             Quick Actions
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Access frequently used JUERP governance
//             modules.
//           </p>

//         </div>

//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

//           <Link
//             href="/entity-management/customers"
//             className="group rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
//           >
//             <div className="flex items-center gap-3">

//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
//                 👤
//               </span>

//               <div>
//                 <p className="text-sm font-bold text-slate-800">
//                   Customers
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Entity management
//                 </p>
//               </div>

//             </div>
//           </Link>

//           <Link
//             href="/entity-management/captains"
//             className="group rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
//           >
//             <div className="flex items-center gap-3">

//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
//                 🚗
//               </span>

//               <div>
//                 <p className="text-sm font-bold text-slate-800">
//                   Captains
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Captain management
//                 </p>
//               </div>

//             </div>
//           </Link>

//           <Link
//             href="/commission-engine"
//             className="group rounded-xl border border-slate-200 p-4 transition hover:border-purple-200 hover:bg-purple-50"
//           >
//             <div className="flex items-center gap-3">

//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
//                 %
//               </span>

//               <div>
//                 <p className="text-sm font-bold text-slate-800">
//                   Commission Engine
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Rule governance
//                 </p>
//               </div>

//             </div>
//           </Link>

//           <Link
//             href="/overrides"
//             className="group rounded-xl border border-slate-200 p-4 transition hover:border-red-200 hover:bg-red-50"
//           >
//             <div className="flex items-center gap-3">

//               <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-700">
//                 ⚡
//               </span>

//               <div>
//                 <p className="text-sm font-bold text-slate-800">
//                   Overrides
//                 </p>
//                 <p className="text-[10px] text-slate-400">
//                   Protected operations
//                 </p>
//               </div>

//             </div>
//           </Link>

//         </div>

//       </div>

//       {/* MODULE MONITORING */}

//       <div className="mt-6">

//         <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

//           <div>

//             <h2 className="text-lg font-black text-slate-900">
//               Module Operations
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Current operational health across JUONE
//               modules.
//             </p>

//           </div>

//           <div className="flex flex-col gap-2 sm:flex-row">

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search module..."
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//             />

//             <select
//               value={selectedModule}
//               onChange={(event) =>
//                 setSelectedModule(
//                   event.target.value as
//                     | ModuleId
//                     | "ALL"
//                 )
//               }
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//             >
//               <option value="ALL">
//                 All Modules
//               </option>

//               <option value="JUCART">
//                 JuCart
//               </option>

//               <option value="JURIDE">
//                 JuRide
//               </option>

//               <option value="JUSTAY">
//                 JuStay
//               </option>

//               <option value="JUHOME">
//                 JuHome
//               </option>

//               <option value="JUSHOPPING">
//                 JuShopping
//               </option>
//             </select>

//           </div>

//         </div>

//         {filteredModules.length > 0 ? (
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

//             {filteredModules.map((module) => (
//               <ModuleCard
//                 key={module.moduleId}
//                 module={module}
//               />
//             ))}

//           </div>
//         ) : (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">

//             <p className="text-sm font-bold text-slate-700">
//               No modules found
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Try changing the search or module filter.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* OPERATIONS + ACTIVITY */}

//       <div className="mt-6 grid gap-6 xl:grid-cols-3">

//         {/* OPERATIONAL FLOW */}

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">

//           <h2 className="text-base font-black text-slate-900">
//             JUONE Operational Flow
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Governance path for operational actions.
//           </p>

//           <div className="mt-6 space-y-3">

//             {[
//               {
//                 step: "01",
//                 title: "Customer / Partner",
//                 description:
//                   "Action originates from JuOne, JuVendor or JuCaptain.",
//               },
//               {
//                 step: "02",
//                 title: "Trusted Backend",
//                 description:
//                   "Business rules and authorization are validated.",
//               },
//               {
//                 step: "03",
//                 title: "Firestore",
//                 description:
//                   "Operational state is stored and synchronized.",
//               },
//               {
//                 step: "04",
//                 title: "JUERP Governance",
//                 description:
//                   "Administrative scope, verification and financial governance.",
//               },
//               {
//                 step: "05",
//                 title: "Audit / Settlement",
//                 description:
//                   "Critical actions become traceable and financially reconciled.",
//               },
//             ].map((item, index) => (
//               <div
//                 key={item.step}
//                 className="relative flex gap-3"
//               >

//                 {index < 4 && (
//                   <div className="absolute left-4 top-9 h-7 border-l border-dashed border-slate-300" />
//                 )}

//                 <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-black text-white">
//                   {item.step}
//                 </div>

//                 <div className="pb-3">

//                   <p className="text-xs font-bold text-slate-800">
//                     {item.title}
//                   </p>

//                   <p className="mt-1 text-[10px] leading-4 text-slate-500">
//                     {item.description}
//                   </p>

//                 </div>

//               </div>
//             ))}

//           </div>

//         </div>

//         {/* RECENT ACTIVITY */}

//         <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">

//           <div className="mb-4 flex items-center justify-between">

//             <div>

//               <h2 className="text-base font-black text-slate-900">
//                 Recent Activity
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Latest operational and governance events.
//               </p>

//             </div>

//             <Link
//               href="/system-audit"
//               className="text-xs font-bold text-orange-600 hover:text-orange-700"
//             >
//               View Audit →
//             </Link>

//           </div>

//           {/* DESKTOP */}

//           <div className="hidden overflow-x-auto md:block">

//             <table className="w-full">

//               <thead>

//                 <tr className="border-b border-slate-100">

//                   <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                     Action
//                   </th>

//                   <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                     Reference
//                   </th>

//                   <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                     Actor
//                   </th>

//                   <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                     Status
//                   </th>

//                   <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                     Time
//                   </th>

//                 </tr>

//               </thead>

//               <tbody>

//                 {RECENT_ACTIVITY.map(
//                   (activity) => (
//                     <tr
//                       key={activity.id}
//                       className="border-b border-slate-50 last:border-0"
//                     >

//                       <td className="px-3 py-4">

//                         <p className="text-xs font-bold text-slate-800">
//                           {activity.action}
//                         </p>

//                         <p className="mt-1 text-[10px] text-slate-400">
//                           {activity.entity}
//                         </p>

//                       </td>

//                       <td className="px-3 py-4 text-xs font-semibold text-slate-600">
//                         {activity.referenceId}
//                       </td>

//                       <td className="px-3 py-4 text-[10px] font-semibold text-slate-500">
//                         {activity.actor}
//                       </td>

//                       <td className="px-3 py-4">

//                         <span
//                           className={`rounded-full px-2 py-1 text-[9px] font-bold ${getActivityClasses(
//                             activity.status
//                           )}`}
//                         >
//                           {activity.status}
//                         </span>

//                       </td>

//                       <td className="whitespace-nowrap px-3 py-4 text-[10px] text-slate-400">
//                         {activity.timestamp}
//                       </td>

//                     </tr>
//                   )
//                 )}

//               </tbody>

//             </table>

//           </div>

//           {/* MOBILE */}

//           <div className="space-y-3 md:hidden">

//             {RECENT_ACTIVITY.map(
//               (activity) => (
//                 <div
//                   key={activity.id}
//                   className="rounded-xl border border-slate-100 bg-slate-50 p-4"
//                 >

//                   <div className="flex items-start justify-between gap-3">

//                     <div>

//                       <p className="text-xs font-bold text-slate-800">
//                         {activity.action}
//                       </p>

//                       <p className="mt-1 text-[10px] text-slate-400">
//                         {activity.entity} ·{" "}
//                         {activity.referenceId}
//                       </p>

//                     </div>

//                     <span
//                       className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${getActivityClasses(
//                         activity.status
//                       )}`}
//                     >
//                       {activity.status}
//                     </span>

//                   </div>

//                   <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">

//                     <span className="text-[10px] font-semibold text-slate-500">
//                       {activity.actor}
//                     </span>

//                     <span className="text-[10px] text-slate-400">
//                       {activity.timestamp}
//                     </span>

//                   </div>

//                 </div>
//               )
//             )}

//           </div>

//         </div>

//       </div>

//       {/* GOVERNANCE NOTICE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">

//         <div className="flex items-start gap-3">

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
//             🛡
//           </div>

//           <div>

//             <h3 className="text-sm font-black text-orange-900">
//               JUERP Governance Boundary
//             </h3>

//             <p className="mt-1 max-w-5xl text-xs leading-5 text-orange-800">
//               This dashboard is an administrative monitoring
//               surface. Authoritative pricing, commissions,
//               settlements, financial calculations, payment
//               confirmation, verification, dispatch and protected
//               status transitions must remain controlled by the
//               trusted backend and JUERP governance layer.
//               Client-side values shown here must not be treated
//               as the financial or operational source of truth.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* DEVELOPMENT NOTICE */}

//       <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">

//         <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

//           <div>

//             <p className="text-xs font-bold text-slate-700">
//               Dashboard Data Mode
//             </p>

//             <p className="mt-1 text-[10px] text-slate-400">
//               The current values are sample UI data. Replace
//               these sources with authorized Firestore/backend
//               reads when connecting the real-time system.
//             </p>

//           </div>

//           <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
//             Development
//           </span>

//         </div>

//       </div>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type ModuleId =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

type HealthStatus = "HEALTHY" | "WARNING" | "CRITICAL";

type DashboardMetric = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  status: HealthStatus;
};

type ModuleHealth = {
  moduleId: ModuleId;
  name: string;
  activeOrders: number;
  pendingPayments: number;
  activeVendors: number;
  activeCaptains: number;
  health: HealthStatus;
};

type RecentActivity = {
  id: string;
  action: string;
  entity: string;
  referenceId: string;
  actor: string;
  status: "SUCCESS" | "WARNING" | "PENDING";
  timestamp: string;
};

const MODULE_HEALTH: ModuleHealth[] = [
  {
    moduleId: "JUCART",
    name: "JuCart",
    activeOrders: 128,
    pendingPayments: 7,
    activeVendors: 84,
    activeCaptains: 46,
    health: "HEALTHY",
  },
  {
    moduleId: "JURIDE",
    name: "JuRide",
    activeOrders: 76,
    pendingPayments: 3,
    activeVendors: 22,
    activeCaptains: 138,
    health: "HEALTHY",
  },
  {
    moduleId: "JUSTAY",
    name: "JuStay",
    activeOrders: 31,
    pendingPayments: 4,
    activeVendors: 37,
    activeCaptains: 12,
    health: "WARNING",
  },
  {
    moduleId: "JUHOME",
    name: "JuHome",
    activeOrders: 43,
    pendingPayments: 2,
    activeVendors: 51,
    activeCaptains: 29,
    health: "HEALTHY",
  },
  {
    moduleId: "JUSHOPPING",
    name: "JuShopping",
    activeOrders: 92,
    pendingPayments: 5,
    activeVendors: 68,
    activeCaptains: 34,
    health: "HEALTHY",
  },
];

const RECENT_ACTIVITY: RecentActivity[] = [
  {
    id: "AUD-1001",
    action: "Order payment confirmed",
    entity: "Order",
    referenceId: "ORD-2026-00124",
    actor: "SYSTEM",
    status: "SUCCESS",
    timestamp: "05 Oct 2026, 20:14",
  },
  {
    id: "AUD-1002",
    action: "Vendor verification submitted",
    entity: "Vendor",
    referenceId: "VEN-00082",
    actor: "VENDOR_OWNER",
    status: "PENDING",
    timestamp: "05 Oct 2026, 20:08",
  },
  {
    id: "AUD-1003",
    action: "Captain assignment completed",
    entity: "Assignment",
    referenceId: "ASN-00482",
    actor: "DISPATCH_ENGINE",
    status: "SUCCESS",
    timestamp: "05 Oct 2026, 19:56",
  },
  {
    id: "AUD-1004",
    action: "Cashfree reconciliation exception",
    entity: "Payment",
    referenceId: "PAY-008921",
    actor: "RECONCILIATION",
    status: "WARNING",
    timestamp: "05 Oct 2026, 19:42",
  },
  {
    id: "AUD-1005",
    action: "Customer account updated",
    entity: "Customer",
    referenceId: "CUS-00342",
    actor: "STATE_ADMIN",
    status: "SUCCESS",
    timestamp: "05 Oct 2026, 19:31",
  },
];

/** Module home routes — only JuCart is implemented so far */
const MODULE_HREF: Partial<Record<ModuleId, string>> = {
  JUCART: "/modules/jucart",
  JUSTAY: "/modules/justay",
  JUHOME: "/modules/juhome",
  JUSHOPPING: "/modules/jushopping",
  JURIDE: "/modules/juride",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getHealthClasses(status: HealthStatus) {
  if (status === "HEALTHY") {
    return "bg-green-100 text-green-700 border-green-200";
  }
  if (status === "WARNING") {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }
  return "bg-red-100 text-red-700 border-red-200";
}

function getHealthLabel(status: HealthStatus) {
  if (status === "HEALTHY") return "Healthy";
  if (status === "WARNING") return "Warning";
  return "Critical";
}

function getActivityClasses(status: RecentActivity["status"]) {
  if (status === "SUCCESS") return "bg-green-100 text-green-700";
  if (status === "WARNING") return "bg-amber-100 text-amber-700";
  return "bg-blue-100 text-blue-700";
}

function getModuleClasses(moduleId: ModuleId) {
  const classes: Record<ModuleId, string> = {
    JUCART: "bg-orange-100 text-orange-700",
    JURIDE: "bg-blue-100 text-blue-700",
    JUSTAY: "bg-purple-100 text-purple-700",
    JUHOME: "bg-green-100 text-green-700",
    JUSHOPPING: "bg-pink-100 text-pink-700",
  };
  return classes[moduleId];
}

function moduleShort(moduleId: ModuleId) {
  const map: Record<ModuleId, string> = {
    JUCART: "JC",
    JURIDE: "JR",
    JUSTAY: "JS",
    JUHOME: "JH",
    JUSHOPPING: "JSH",
  };
  return map[moduleId];
}

function SummaryCard({ title, value, subtitle, icon, status }: DashboardMetric) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {title}
          </p>
          <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg ${
            status === "HEALTHY"
              ? "bg-green-50"
              : status === "WARNING"
                ? "bg-amber-50"
                : "bg-red-50"
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getHealthClasses(
            status
          )}`}
        >
          {getHealthLabel(status)}
        </span>
      </div>
    </div>
  );
}

function ModuleCard({ module }: { module: ModuleHealth }) {
  const href = MODULE_HREF[module.moduleId];
  const body = (
    <>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${getModuleClasses(
              module.moduleId
            )}`}
          >
            {moduleShort(module.moduleId)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">{module.name}</h3>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              {module.moduleId}
            </p>
          </div>
        </div>
        <span
          className={`rounded-full border px-2 py-1 text-[9px] font-bold ${getHealthClasses(
            module.health
          )}`}
        >
          {getHealthLabel(module.health)}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] text-slate-400">Active Orders</p>
          <p className="mt-1 text-lg font-black text-slate-800">
            {formatNumber(module.activeOrders)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] text-slate-400">Pending Payments</p>
          <p className="mt-1 text-lg font-black text-slate-800">
            {formatNumber(module.pendingPayments)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] text-slate-400">Active Vendors</p>
          <p className="mt-1 text-lg font-black text-slate-800">
            {formatNumber(module.activeVendors)}
          </p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-[10px] text-slate-400">Active Captains</p>
          <p className="mt-1 text-lg font-black text-slate-800">
            {formatNumber(module.activeCaptains)}
          </p>
        </div>
      </div>
      {href && (
        <p className="mt-4 text-xs font-bold text-orange-600">Open module →</p>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-200 hover:bg-orange-50/40"
      >
        {body}
      </Link>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {body}
    </div>
  );
}

export default function DashboardPage() {
  const [selectedModule, setSelectedModule] = useState<ModuleId | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const totalActiveOrders = useMemo(
    () => MODULE_HEALTH.reduce((t, m) => t + m.activeOrders, 0),
    []
  );
  const totalPendingPayments = useMemo(
    () => MODULE_HEALTH.reduce((t, m) => t + m.pendingPayments, 0),
    []
  );
  const totalVendors = useMemo(
    () => MODULE_HEALTH.reduce((t, m) => t + m.activeVendors, 0),
    []
  );
  const totalCaptains = useMemo(
    () => MODULE_HEALTH.reduce((t, m) => t + m.activeCaptains, 0),
    []
  );

  const filteredModules = useMemo(() => {
    return MODULE_HEALTH.filter((module) => {
      const matchesModule =
        selectedModule === "ALL" || module.moduleId === selectedModule;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        module.name.toLowerCase().includes(q) ||
        module.moduleId.toLowerCase().includes(q);
      return matchesModule && matchesSearch;
    });
  }, [selectedModule, search]);

  const metrics: DashboardMetric[] = [
    {
      title: "Active Orders",
      value: formatNumber(totalActiveOrders),
      subtitle: "Across all JUONE modules",
      icon: "🛒",
      status: "HEALTHY",
    },
    {
      title: "Pending Payments",
      value: formatNumber(totalPendingPayments),
      subtitle: "Requires monitoring",
      icon: "₹",
      status: totalPendingPayments > 15 ? "WARNING" : "HEALTHY",
    },
    {
      title: "Active Vendors",
      value: formatNumber(totalVendors),
      subtitle: "Currently operational",
      icon: "🏪",
      status: "HEALTHY",
    },
    {
      title: "Active Captains",
      value: formatNumber(totalCaptains),
      subtitle: "Online/eligible network",
      icon: "🚗",
      status: "HEALTHY",
    },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700">
              JUERP
            </span>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-medium text-slate-500">
              Executive Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            JUONE Operations Dashboard
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Central governance and operational overview for JuCart, JuRide,
            JuStay, JuHome and JuShopping.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/control-room"
            className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Open Control Room
          </Link>
          <Link
            href="/financial-audit"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Financial Audit
          </Link>
        </div>
      </div>

      {/* SYSTEM STATUS */}
      <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-800">
                Platform Operational
              </p>
              <p className="mt-1 text-xs text-green-700">
                JUONE modules are monitored through the JUERP governance layer.
              </p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-green-200 bg-white px-3 py-1.5 text-[10px] font-bold text-green-700">
            LIVE MONITORING
          </span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <SummaryCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-black text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-xs text-slate-500">
            Frequently used JUERP governance modules.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Link
            href="/modules/jucart"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                🛒
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">JuCart</p>
                <p className="text-[10px] text-slate-400">Food · Mart · Pharmacy</p>
              </div>
            </div>
          </Link>

          <Link
            href="/entity-management/customers"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                👤
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">Customers</p>
                <p className="text-[10px] text-slate-400">Entity management</p>
              </div>
            </div>
          </Link>

          <Link
            href="/entity-management/captains"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                🚗
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">Captains</p>
                <p className="text-[10px] text-slate-400">Captain management</p>
              </div>
            </div>
          </Link>

          <Link
            href="/commission-engine"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-purple-200 hover:bg-purple-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                %
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">Commission Engine</p>
                <p className="text-[10px] text-slate-400">Rule governance</p>
              </div>
            </div>
          </Link>

          <Link
            href="/overrides"
            className="group rounded-xl border border-slate-200 p-4 transition hover:border-red-200 hover:bg-red-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-700">
                ⚡
              </span>
              <div>
                <p className="text-sm font-bold text-slate-800">Overrides</p>
                <p className="text-[10px] text-slate-400">Protected operations</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* MODULE MONITORING */}
      <div className="mt-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              Module Operations
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Operational health across JUONE modules. JuCart opens the live
              module ERP.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search module..."
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
            <select
              value={selectedModule}
              onChange={(e) =>
                setSelectedModule(e.target.value as ModuleId | "ALL")
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="ALL">All Modules</option>
              <option value="JUCART">JuCart</option>
              <option value="JURIDE">JuRide</option>
              <option value="JUSTAY">JuStay</option>
              <option value="JUHOME">JuHome</option>
              <option value="JUSHOPPING">JuShopping</option>
            </select>
          </div>
        </div>

        {filteredModules.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module) => (
              <ModuleCard key={module.moduleId} module={module} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-700">No modules found</p>
            <p className="mt-1 text-xs text-slate-400">
              Try changing the search or module filter.
            </p>
          </div>
        )}
      </div>

      {/* FLOW + ACTIVITY */}
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-1">
          <h2 className="text-base font-black text-slate-900">
            JUONE Operational Flow
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Governance path for operational actions.
          </p>
          <div className="mt-6 space-y-3">
            {[
              {
                step: "01",
                title: "Customer / Partner",
                description:
                  "Action originates from JuOne, JuVendor or JuCaptain.",
              },
              {
                step: "02",
                title: "Trusted Backend",
                description: "Business rules and authorization are validated.",
              },
              {
                step: "03",
                title: "Firestore",
                description: "Operational state is stored and synchronized.",
              },
              {
                step: "04",
                title: "JUERP Governance",
                description:
                  "Administrative scope, verification and financial governance.",
              },
              {
                step: "05",
                title: "Audit / Settlement",
                description:
                  "Critical actions become traceable and financially reconciled.",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative flex gap-3">
                {index < 4 && (
                  <div className="absolute left-4 top-9 h-7 border-l border-dashed border-slate-300" />
                )}
                <div className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-black text-white">
                  {item.step}
                </div>
                <div className="pb-3">
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-900">
                Recent Activity
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Latest operational and governance events.
              </p>
            </div>
            <Link
              href="/system-audit"
              className="text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              View Audit →
            </Link>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Action
                  </th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Reference
                  </th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Actor
                  </th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ACTIVITY.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b border-slate-50 last:border-0"
                  >
                    <td className="px-3 py-4">
                      <p className="text-xs font-bold text-slate-800">
                        {activity.action}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {activity.entity}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-xs font-semibold text-slate-600">
                      {activity.referenceId}
                    </td>
                    <td className="px-3 py-4 text-[10px] font-semibold text-slate-500">
                      {activity.actor}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold ${getActivityClasses(
                          activity.status
                        )}`}
                      >
                        {activity.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-[10px] text-slate-400">
                      {activity.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-3 md:hidden">
            {RECENT_ACTIVITY.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {activity.action}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {activity.entity} · {activity.referenceId}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${getActivityClasses(
                      activity.status
                    )}`}
                  >
                    {activity.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-[10px] font-semibold text-slate-500">
                    {activity.actor}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GOVERNANCE */}
      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            🛡
          </div>
          <div>
            <h3 className="text-sm font-black text-orange-900">
              JUERP Governance Boundary
            </h3>
            <p className="mt-1 max-w-5xl text-xs leading-5 text-orange-800">
              This dashboard is an administrative monitoring surface.
              Authoritative pricing, commissions, settlements, payment
              confirmation and protected status transitions remain on the trusted
              backend and JUERP governance layer.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold text-slate-700">Dashboard Data Mode</p>
            <p className="mt-1 text-[10px] text-slate-400">
              Sample UI data. Use <code>useDashboardStats</code> for live
              Firestore counts when ready.
            </p>
          </div>
          <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wide text-slate-500">
            Development
          </span>
        </div>
      </div>
    </div>
  );
}