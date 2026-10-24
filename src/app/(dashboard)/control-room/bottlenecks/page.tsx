// "use client";

// import { useMemo, useState } from "react";

// type BottleneckSeverity =
//   | "CRITICAL"
//   | "HIGH"
//   | "MEDIUM"
//   | "LOW";

// type BottleneckStatus =
//   | "OPEN"
//   | "INVESTIGATING"
//   | "MONITORING"
//   | "RESOLVED";

// type BottleneckModule =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING"
//   | "PLATFORM";

// interface Bottleneck {
//   id: string;
//   title: string;
//   description: string;
//   module: BottleneckModule;
//   severity: BottleneckSeverity;
//   status: BottleneckStatus;
//   affectedCount: number;
//   affectedEntity: string;
//   detectedAt: string;
//   lastUpdated: string;
//   owner: string;
// }

// const INITIAL_BOTTLENECKS: Bottleneck[] = [
//   {
//     id: "BOT-001",
//     title: "Vendor Acceptance Delay",
//     description:
//       "Multiple JUCART orders are waiting for vendor acceptance beyond the expected operational window.",
//     module: "JUCART",
//     severity: "HIGH",
//     status: "OPEN",
//     affectedCount: 8,
//     affectedEntity: "Orders",
//     detectedAt: "2026-10-05 18:20",
//     lastUpdated: "2026-10-05 18:52",
//     owner: "Operations",
//   },
//   {
//     id: "BOT-002",
//     title: "Captain Assignment Delay",
//     description:
//       "Orders marked READY are waiting for captain assignment.",
//     module: "JUCART",
//     severity: "CRITICAL",
//     status: "INVESTIGATING",
//     affectedCount: 5,
//     affectedEntity: "Orders",
//     detectedAt: "2026-10-05 18:15",
//     lastUpdated: "2026-10-05 18:50",
//     owner: "Dispatch",
//   },
//   {
//     id: "BOT-003",
//     title: "Payment Pending Queue",
//     description:
//       "Orders remain in PAYMENT_PENDING and require payment confirmation.",
//     module: "JUSHOPPING",
//     severity: "MEDIUM",
//     status: "MONITORING",
//     affectedCount: 11,
//     affectedEntity: "Payments",
//     detectedAt: "2026-10-05 17:55",
//     lastUpdated: "2026-10-05 18:45",
//     owner: "Payments",
//   },
//   {
//     id: "BOT-004",
//     title: "Delivery Completion Delay",
//     description:
//       "Several orders remain OUT_FOR_DELIVERY longer than the configured operational threshold.",
//     module: "JUSHOPPING",
//     severity: "HIGH",
//     status: "OPEN",
//     affectedCount: 4,
//     affectedEntity: "Deliveries",
//     detectedAt: "2026-10-05 18:05",
//     lastUpdated: "2026-10-05 18:48",
//     owner: "Dispatch",
//   },
//   {
//     id: "BOT-005",
//     title: "Home Service Assignment Queue",
//     description:
//       "JUHOME service requests are waiting for service-partner assignment.",
//     module: "JUHOME",
//     severity: "MEDIUM",
//     status: "OPEN",
//     affectedCount: 6,
//     affectedEntity: "Service Requests",
//     detectedAt: "2026-10-05 17:40",
//     lastUpdated: "2026-10-05 18:30",
//     owner: "Operations",
//   },
//   {
//     id: "BOT-006",
//     title: "Stay Booking Verification",
//     description:
//       "Some JUSTAY bookings require operational verification before confirmation.",
//     module: "JUSTAY",
//     severity: "LOW",
//     status: "MONITORING",
//     affectedCount: 3,
//     affectedEntity: "Bookings",
//     detectedAt: "2026-10-05 16:50",
//     lastUpdated: "2026-10-05 18:10",
//     owner: "Stay Operations",
//   },
// ];

// const MODULES: BottleneckModule[] = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
//   "PLATFORM",
// ];

// const SEVERITIES: BottleneckSeverity[] = [
//   "CRITICAL",
//   "HIGH",
//   "MEDIUM",
//   "LOW",
// ];

// const STATUSES: BottleneckStatus[] = [
//   "OPEN",
//   "INVESTIGATING",
//   "MONITORING",
//   "RESOLVED",
// ];

// function getSeverityClasses(
//   severity: BottleneckSeverity
// ) {
//   switch (severity) {
//     case "CRITICAL":
//       return "bg-red-100 text-red-700";

//     case "HIGH":
//       return "bg-orange-100 text-orange-700";

//     case "MEDIUM":
//       return "bg-yellow-100 text-yellow-700";

//     case "LOW":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getStatusClasses(
//   status: BottleneckStatus
// ) {
//   switch (status) {
//     case "OPEN":
//       return "bg-red-100 text-red-700";

//     case "INVESTIGATING":
//       return "bg-orange-100 text-orange-700";

//     case "MONITORING":
//       return "bg-blue-100 text-blue-700";

//     case "RESOLVED":
//       return "bg-green-100 text-green-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(
//   module: BottleneckModule
// ) {
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

//     case "PLATFORM":
//       return "bg-slate-100 text-slate-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function BottlenecksPage() {
//   const [bottlenecks, setBottlenecks] = useState<
//     Bottleneck[]
//   >(INITIAL_BOTTLENECKS);

//   const [search, setSearch] = useState("");
//   const [moduleFilter, setModuleFilter] =
//     useState("ALL");

//   const [severityFilter, setSeverityFilter] =
//     useState("ALL");

//   const [statusFilter, setStatusFilter] =
//     useState("ALL");

//   const [selectedBottleneck, setSelectedBottleneck] =
//     useState<Bottleneck | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const totalBottlenecks = bottlenecks.filter(
//     (item) => item.status !== "RESOLVED"
//   ).length;

//   const criticalCount = bottlenecks.filter(
//     (item) =>
//       item.severity === "CRITICAL" &&
//       item.status !== "RESOLVED"
//   ).length;

//   const highCount = bottlenecks.filter(
//     (item) =>
//       item.severity === "HIGH" &&
//       item.status !== "RESOLVED"
//   ).length;

//   const affectedEntities = bottlenecks
//     .filter((item) => item.status !== "RESOLVED")
//     .reduce(
//       (total, item) => total + item.affectedCount,
//       0
//     );

//   const resolvedCount = bottlenecks.filter(
//     (item) => item.status === "RESOLVED"
//   ).length;

//   const filteredBottlenecks = useMemo(() => {
//     const searchText = search.trim().toLowerCase();

//     return bottlenecks.filter((item) => {
//       const matchesSearch =
//         !searchText ||
//         item.id.toLowerCase().includes(searchText) ||
//         item.title.toLowerCase().includes(searchText) ||
//         item.description.toLowerCase().includes(searchText) ||
//         item.module.toLowerCase().includes(searchText) ||
//         item.owner.toLowerCase().includes(searchText);

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         item.module === moduleFilter;

//       const matchesSeverity =
//         severityFilter === "ALL" ||
//         item.severity === severityFilter;

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         item.status === statusFilter;

//       return (
//         matchesSearch &&
//         matchesModule &&
//         matchesSeverity &&
//         matchesStatus
//       );
//     });
//   }, [
//     bottlenecks,
//     search,
//     moduleFilter,
//     severityFilter,
//     statusFilter,
//   ]);

//   function openDetails(item: Bottleneck) {
//     setSelectedBottleneck(item);
//     setShowDetails(true);
//   }

//   function closeDetails() {
//     setSelectedBottleneck(null);
//     setShowDetails(false);
//   }

//   function updateStatus(
//     bottleneckId: string,
//     status: BottleneckStatus
//   ) {
//     setBottlenecks((current) =>
//       current.map((item) =>
//         item.id === bottleneckId
//           ? {
//               ...item,
//               status,
//               lastUpdated:
//                 new Date().toLocaleString("en-IN"),
//             }
//           : item
//       )
//     );

//     setSelectedBottleneck((current) =>
//       current && current.id === bottleneckId
//         ? {
//             ...current,
//             status,
//             lastUpdated:
//               new Date().toLocaleString("en-IN"),
//           }
//         : current
//     );
//   }

//   function clearFilters() {
//     setSearch("");
//     setModuleFilter("ALL");
//     setSeverityFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>
//             <div className="flex items-center gap-3">

//               <h1 className="text-2xl font-bold text-slate-900">
//                 Operational Bottlenecks
//               </h1>

//               <span className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
//                 <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
//                 LIVE
//               </span>

//             </div>

//             <p className="mt-1 text-sm text-slate-500">
//               Identify, monitor, and investigate operational
//               bottlenecks across the JUONE ecosystem.
//             </p>
//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

//             <p className="text-xs font-semibold text-orange-700">
//               JUERP Control Room
//             </p>

//             <p className="mt-1 text-xs text-orange-600">
//               Operational exception monitoring
//             </p>

//           </div>

//         </div>
//       </div>

//       {/* SUMMARY */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         {/* TOTAL */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Open Bottlenecks
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {totalBottlenecks}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Unresolved issues
//           </p>

//         </div>

//         {/* CRITICAL */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Critical
//           </p>

//           <p className="mt-2 text-3xl font-bold text-red-600">
//             {criticalCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Immediate attention
//           </p>

//         </div>

//         {/* HIGH */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             High Priority
//           </p>

//           <p className="mt-2 text-3xl font-bold text-orange-600">
//             {highCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Requires investigation
//           </p>

//         </div>

//         {/* AFFECTED */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Affected Entities
//           </p>

//           <p className="mt-2 text-3xl font-bold text-blue-600">
//             {affectedEntities}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Orders / services / payments
//           </p>

//         </div>

//         {/* RESOLVED */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Resolved
//           </p>

//           <p className="mt-2 text-3xl font-bold text-green-600">
//             {resolvedCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Recently resolved
//           </p>

//         </div>

//       </div>

//       {/* BOTTLENECK AREAS */}
//       <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">

//         <div className="rounded-xl border border-red-200 bg-red-50 p-5">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs font-semibold text-red-700">
//                 Critical Queue
//               </p>

//               <p className="mt-1 text-2xl font-bold text-red-800">
//                 {criticalCount}
//               </p>
//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
//               <span className="text-lg font-bold text-red-600">
//                 !
//               </span>
//             </div>

//           </div>

//           <p className="mt-3 text-xs leading-5 text-red-600">
//             Bottlenecks that may significantly affect
//             customer operations and require immediate
//             investigation.
//           </p>

//         </div>

//         <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs font-semibold text-orange-700">
//                 Dispatch / Processing
//               </p>

//               <p className="mt-1 text-2xl font-bold text-orange-800">
//                 {
//                   bottlenecks.filter(
//                     (item) =>
//                       item.module === "JUCART" ||
//                       item.module === "JURIDE"
//                   ).length
//                 }
//               </p>
//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
//               <span className="text-lg font-bold text-orange-600">
//                 D
//               </span>
//             </div>

//           </div>

//           <p className="mt-3 text-xs leading-5 text-orange-600">
//             Issues affecting vendor acceptance,
//             captain assignment, and operational dispatch.
//           </p>

//         </div>

//         <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

//           <div className="flex items-center justify-between">

//             <div>
//               <p className="text-xs font-semibold text-blue-700">
//                 Monitoring
//               </p>

//               <p className="mt-1 text-2xl font-bold text-blue-800">
//                 {
//                   bottlenecks.filter(
//                     (item) =>
//                       item.status === "MONITORING"
//                   ).length
//                 }
//               </p>
//             </div>

//             <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
//               <span className="text-lg font-bold text-blue-600">
//                 M
//               </span>
//             </div>

//           </div>

//           <p className="mt-3 text-xs leading-5 text-blue-600">
//             Known conditions currently being monitored
//             without an immediate escalation.
//           </p>

//         </div>

//       </div>

//       {/* FILTERS */}
//       <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

//         <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <div>
//             <h2 className="text-base font-semibold text-slate-900">
//               Bottleneck Queue
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Search and filter operational exceptions.
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
//             placeholder="Search bottlenecks..."
//             className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           />

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

//           {/* SEVERITY */}
//           <select
//             value={severityFilter}
//             onChange={(event) =>
//               setSeverityFilter(event.target.value)
//             }
//             className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           >

//             <option value="ALL">
//               All Severities
//             </option>

//             {SEVERITIES.map((severity) => (
//               <option
//                 key={severity}
//                 value={severity}
//               >
//                 {severity}
//               </option>
//             ))}

//           </select>

//           {/* STATUS */}
//           <select
//             value={statusFilter}
//             onChange={(event) =>
//               setStatusFilter(event.target.value)
//             }
//             className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//           >

//             <option value="ALL">
//               All Statuses
//             </option>

//             {STATUSES.map((status) => (
//               <option
//                 key={status}
//                 value={status}
//               >
//                 {status}
//               </option>
//             ))}

//           </select>

//         </div>

//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm lg:block">

//         <div className="border-b border-slate-200 px-6 py-4">

//           <div className="flex items-center justify-between">

//             <div>
//               <h2 className="text-base font-semibold text-slate-900">
//                 Operational Exceptions
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Showing {filteredBottlenecks.length} of{" "}
//                 {bottlenecks.length} bottlenecks
//               </p>
//             </div>

//             <span className="flex items-center gap-2 text-xs font-semibold text-green-600">

//               <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

//               Monitoring

//             </span>

//           </div>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Bottleneck
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Severity
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Affected
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Owner
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Updated
//                 </th>

//                 <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredBottlenecks.map((item) => (

//                 <tr
//                   key={item.id}
//                   className="transition hover:bg-slate-50"
//                 >

//                   {/* BOTTLENECK */}
//                   <td className="max-w-sm px-6 py-4">

//                     <p className="text-sm font-semibold text-slate-900">
//                       {item.title}
//                     </p>

//                     <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
//                       {item.description}
//                     </p>

//                     <p className="mt-1 text-[11px] text-slate-300">
//                       {item.id}
//                     </p>

//                   </td>

//                   {/* MODULE */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                         item.module
//                       )}`}
//                     >
//                       {item.module}
//                     </span>

//                   </td>

//                   {/* SEVERITY */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(
//                         item.severity
//                       )}`}
//                     >
//                       {item.severity}
//                     </span>

//                   </td>

//                   {/* STATUS */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>

//                   </td>

//                   {/* AFFECTED */}
//                   <td className="px-6 py-4">

//                     <p className="text-sm font-bold text-slate-800">
//                       {item.affectedCount}
//                     </p>

//                     <p className="text-xs text-slate-400">
//                       {item.affectedEntity}
//                     </p>

//                   </td>

//                   {/* OWNER */}
//                   <td className="px-6 py-4">

//                     <span className="text-sm text-slate-700">
//                       {item.owner}
//                     </span>

//                   </td>

//                   {/* UPDATED */}
//                   <td className="px-6 py-4">

//                     <span className="text-xs text-slate-500">
//                       {item.lastUpdated}
//                     </span>

//                   </td>

//                   {/* ACTION */}
//                   <td className="px-6 py-4 text-right">

//                     <button
//                       type="button"
//                       onClick={() => openDetails(item)}
//                       className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
//                     >
//                       Investigate
//                     </button>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//           {filteredBottlenecks.length === 0 && (
//             <div className="px-6 py-16 text-center">

//               <p className="text-sm font-semibold text-slate-600">
//                 No bottlenecks found.
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 Try changing your search or filters.
//               </p>

//             </div>
//           )}

//         </div>

//       </div>

//       {/* MOBILE CARDS */}
//       <div className="space-y-4 lg:hidden">

//         {filteredBottlenecks.map((item) => (

//           <div
//             key={item.id}
//             className="rounded-xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {item.title}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {item.id}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getSeverityClasses(
//                   item.severity
//                 )}`}
//               >
//                 {item.severity}
//               </span>

//             </div>

//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {item.description}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-4">

//               <div>

//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Module
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-md px-2 py-1 text-xs font-semibold ${getModuleClasses(
//                     item.module
//                   )}`}
//                 >
//                   {item.module}
//                 </span>

//               </div>

//               <div>

//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Status
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                     item.status
//                   )}`}
//                 >
//                   {item.status}
//                 </span>

//               </div>

//               <div>

//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Affected
//                 </p>

//                 <p className="mt-1 text-sm font-bold text-slate-800">
//                   {item.affectedCount}
//                 </p>

//                 <p className="text-xs text-slate-400">
//                   {item.affectedEntity}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-[11px] uppercase tracking-wide text-slate-400">
//                   Owner
//                 </p>

//                 <p className="mt-1 text-sm font-medium text-slate-700">
//                   {item.owner}
//                 </p>

//               </div>

//             </div>

//             <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

//               <p className="text-[11px] text-slate-400">
//                 Updated {item.lastUpdated}
//               </p>

//               <button
//                 type="button"
//                 onClick={() => openDetails(item)}
//                 className="rounded-lg bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
//               >
//                 Investigate
//               </button>

//             </div>

//           </div>

//         ))}

//         {filteredBottlenecks.length === 0 && (
//           <div className="rounded-xl bg-white px-6 py-12 text-center shadow-sm">

//             <p className="text-sm font-semibold text-slate-600">
//               No bottlenecks found.
//             </p>

//             <p className="mt-1 text-xs text-slate-400">
//               Try changing your filters.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* DETAILS MODAL */}
//       {showDetails && selectedBottleneck && (

//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

//             {/* MODAL HEADER */}
//             <div className="flex items-start justify-between border-b border-slate-200 p-6">

//               <div>

//                 <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
//                   Bottleneck Investigation
//                 </p>

//                 <h2 className="mt-1 text-xl font-bold text-slate-900">
//                   {selectedBottleneck.title}
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedBottleneck.id}
//                 </p>

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

//               {/* ALERT */}
//               <div
//                 className={`rounded-xl p-5 ${
//                   selectedBottleneck.severity ===
//                   "CRITICAL"
//                     ? "bg-red-50"
//                     : selectedBottleneck.severity ===
//                       "HIGH"
//                     ? "bg-orange-50"
//                     : "bg-slate-50"
//                 }`}
//               >

//                 <div className="flex flex-wrap items-center gap-2">

//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(
//                       selectedBottleneck.severity
//                     )}`}
//                   >
//                     {selectedBottleneck.severity}
//                   </span>

//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedBottleneck.status
//                     )}`}
//                   >
//                     {selectedBottleneck.status}
//                   </span>

//                 </div>

//                 <p className="mt-4 text-sm leading-6 text-slate-600">
//                   {selectedBottleneck.description}
//                 </p>

//               </div>

//               {/* DETAILS */}
//               <div>

//                 <h3 className="mb-3 text-sm font-semibold text-slate-900">
//                   Bottleneck Information
//                 </h3>

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Module
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedBottleneck.module}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Affected Count
//                     </p>

//                     <p className="mt-1 text-lg font-bold text-slate-800">
//                       {selectedBottleneck.affectedCount}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Affected Entity
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedBottleneck.affectedEntity}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Owner
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedBottleneck.owner}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Detected At
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedBottleneck.detectedAt}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-400">
//                       Last Updated
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {selectedBottleneck.lastUpdated}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* STATUS CONTROL */}
//               <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

//                 <p className="text-xs font-semibold text-orange-700">
//                   Investigation Status
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-orange-600">
//                   These controls are for UI development.
//                   Production status changes must go through
//                   an authorized backend operation and audit
//                   record.
//                 </p>

//                 <div className="mt-4 flex flex-wrap gap-2">

//                   {STATUSES.map((status) => (

//                     <button
//                       key={status}
//                       type="button"
//                       onClick={() =>
//                         updateStatus(
//                           selectedBottleneck.id,
//                           status
//                         )
//                       }
//                       className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${
//                         selectedBottleneck.status === status
//                           ? "border-orange-500 bg-orange-500 text-white"
//                           : "border-slate-300 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600"
//                       }`}
//                     >
//                       {status}
//                     </button>

//                   ))}

//                 </div>

//               </div>

//               {/* GOVERNANCE */}
//               <div className="rounded-xl border border-slate-200 p-5">

//                 <h3 className="text-sm font-semibold text-slate-900">
//                   Control Room Governance
//                 </h3>

//                 <p className="mt-2 text-xs leading-6 text-slate-500">
//                   Bottleneck detection should be based on
//                   authoritative operational data. Resolution
//                   actions should not bypass order, payment,
//                   dispatch, verification, or settlement
//                   controls defined by JUERP and the trusted
//                   backend.
//                 </p>

//               </div>

//             </div>

//             {/* FOOTER */}
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

//       {/* FOOTER GOVERNANCE */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

//         <h2 className="text-sm font-semibold text-slate-900">
//           Bottleneck Monitoring Architecture
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-slate-500">
//           The Control Room should identify operational
//           exceptions from authoritative JUONE data rather than
//           allowing individual client applications to define
//           financial or operational truth. Detection, escalation,
//           investigation, and resolution actions should be
//           traceable through authorized backend operations and
//           audit logs.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <div className="rounded-lg bg-slate-50 p-4">

//             <p className="text-xs font-semibold text-slate-700">
//               Detection
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Identify abnormal operational delays.
//             </p>

//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">

//             <p className="text-xs font-semibold text-slate-700">
//               Investigation
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Review the affected operational entities.
//             </p>

//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">

//             <p className="text-xs font-semibold text-slate-700">
//               Resolution
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Execute only authorized corrective actions.
//             </p>

//           </div>

//           <div className="rounded-lg bg-slate-50 p-4">

//             <p className="text-xs font-semibold text-slate-700">
//               Audit
//             </p>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Record important operational changes.
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
  type BottleneckGroup,
} from "@/hooks/useControlRoomOrders";

type BottleneckSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
type BottleneckStatus = "OPEN" | "INVESTIGATING" | "MONITORING" | "RESOLVED";
type BottleneckModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING"
  | "PLATFORM";

const MODULES: BottleneckModule[] = [
  "JUCART",
  "JURIDE",
  "JUSTAY",
  "JUHOME",
  "JUSHOPPING",
  "PLATFORM",
];

const SEVERITIES: BottleneckSeverity[] = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
const STATUSES: BottleneckStatus[] = [
  "OPEN",
  "INVESTIGATING",
  "MONITORING",
  "RESOLVED",
];

function getSeverityClasses(severity: BottleneckSeverity) {
  switch (severity) {
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "HIGH":
      return "bg-orange-100 text-orange-700";
    case "MEDIUM":
      return "bg-yellow-100 text-yellow-700";
    case "LOW":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusClasses(status: BottleneckStatus) {
  switch (status) {
    case "OPEN":
      return "bg-red-100 text-red-700";
    case "INVESTIGATING":
      return "bg-orange-100 text-orange-700";
    case "MONITORING":
      return "bg-blue-100 text-blue-700";
    case "RESOLVED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(module: BottleneckModule) {
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
    case "PLATFORM":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function BottlenecksPage() {
  const {
    bottleneckGroups,
    loading,
    error,
    demoMode,
    lastRefreshedAt,
    refresh,
  } = useControlRoomOrders(15000);

  /** Local UI-only investigation labels — not written to Firestore */
  const [localStatus, setLocalStatus] = useState<Record<string, BottleneckStatus>>(
    {}
  );

  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selected, setSelected] = useState<BottleneckGroup | null>(null);

  const bottlenecks = useMemo(() => {
    return bottleneckGroups.map((g) => ({
      ...g,
      status: localStatus[g.id] ?? g.status,
    }));
  }, [bottleneckGroups, localStatus]);

  const totalBottlenecks = bottlenecks.filter((i) => i.status !== "RESOLVED").length;
  const criticalCount = bottlenecks.filter(
    (i) => i.severity === "CRITICAL" && i.status !== "RESOLVED"
  ).length;
  const highCount = bottlenecks.filter(
    (i) => i.severity === "HIGH" && i.status !== "RESOLVED"
  ).length;
  const affectedEntities = bottlenecks
    .filter((i) => i.status !== "RESOLVED")
    .reduce((t, i) => t + i.affectedCount, 0);
  const resolvedCount = bottlenecks.filter((i) => i.status === "RESOLVED").length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bottlenecks.filter((item) => {
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.module.toLowerCase().includes(q) ||
        item.owner.toLowerCase().includes(q);

      const matchesModule =
        moduleFilter === "ALL" || item.module === moduleFilter;
      const matchesSeverity =
        severityFilter === "ALL" || item.severity === severityFilter;
      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;

      return matchesSearch && matchesModule && matchesSeverity && matchesStatus;
    });
  }, [bottlenecks, search, moduleFilter, severityFilter, statusFilter]);

  function updateLocalStatus(id: string, status: BottleneckStatus) {
    setLocalStatus((prev) => ({ ...prev, [id]: status }));
    setSelected((cur) => (cur && cur.id === id ? { ...cur, status } : cur));
  }

  function clearFilters() {
    setSearch("");
    setModuleFilter("ALL");
    setSeverityFilter("ALL");
    setStatusFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900">
              Operational Bottlenecks
            </h1>
            <span className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
              {loading ? "LOADING" : "LIVE"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Derived from live order status in Firestore.
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
            href="/control-room/active-orders"
            className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
          >
            Active Orders
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
          <p className="text-sm font-semibold text-red-800">Unable to load bottlenecks</p>
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

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Open Bottlenecks</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">
            {loading ? "…" : totalBottlenecks}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Critical</p>
          <p className="mt-2 text-3xl font-bold text-red-600">
            {loading ? "…" : criticalCount}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">High Priority</p>
          <p className="mt-2 text-3xl font-bold text-orange-600">
            {loading ? "…" : highCount}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Affected Orders</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">
            {loading ? "…" : affectedEntities}
          </p>
        </div>
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-xs font-medium text-slate-500">Resolved (UI)</p>
          <p className="mt-2 text-3xl font-bold text-green-600">
            {loading ? "…" : resolvedCount}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Bottleneck Queue</h2>
            <p className="mt-1 text-xs text-slate-500">
              Grouped from order states: PAYMENT_PENDING, READY without captain, etc.
            </p>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="w-fit rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bottlenecks…"
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
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
          >
            <option value="ALL">All Severities</option>
            {SEVERITIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
          >
            <option value="ALL">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <p className="text-xs text-slate-500">
            Showing {filtered.length} of {bottlenecks.length} bottleneck groups
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Bottleneck
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Module
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Severity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Affected
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Owner
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-sm text-slate-500">
                    Loading bottlenecks…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-sm text-slate-500">
                    No bottlenecks. Empty orders or no matching exception states.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="max-w-sm px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                        {item.description}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-300">{item.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-md px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
                          item.module
                        )}`}
                      >
                        {item.module}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getSeverityClasses(
                          item.severity
                        )}`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-800">
                        {item.affectedCount}
                      </p>
                      <p className="text-xs text-slate-400">{item.affectedEntity}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{item.owner}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelected(item)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                      >
                        Investigate
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
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Bottleneck investigation
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {selected.title}
                </h2>
                <p className="mt-1 text-xs text-slate-400">{selected.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="space-y-6 p-6">
              <p className="text-sm text-slate-600">{selected.description}</p>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Module</p>
                  <p className="mt-1 text-sm font-semibold">{selected.module}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Affected</p>
                  <p className="mt-1 text-lg font-bold">{selected.affectedCount}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Owner</p>
                  <p className="mt-1 text-sm font-semibold">{selected.owner}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-4">
                  <p className="text-xs text-slate-400">Last Updated</p>
                  <p className="mt-1 text-sm font-semibold">{selected.lastUpdated}</p>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold text-slate-500">
                  Affected order IDs
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.orderIds.map((id) => (
                    <span
                      key={id}
                      className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-mono text-slate-700"
                    >
                      {id}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                <p className="text-xs font-semibold text-orange-700">
                  Investigation status (UI only)
                </p>
                <p className="mt-1 text-xs text-orange-600">
                  Does not write to Firestore. Production resolution requires authorized
                  backend + audit.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {STATUSES.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => updateLocalStatus(selected.id, status)}
                      className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                        selected.status === status
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "border-slate-300 bg-white text-slate-600 hover:border-orange-400"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-200 p-6">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Bottleneck monitoring
        </h2>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          Groups are computed from authoritative order documents. Client UI status is
          investigation labeling only and is not the operational source of truth.
        </p>
      </div>
    </div>
  );
}