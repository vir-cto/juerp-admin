// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type ZoneStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// type ZoneType =
//   | "STATE_ZONE"
//   | "DISTRICT_ZONE"
//   | "OPERATIONAL_ZONE"
//   | "SERVICE_ZONE";

// type Zone = {
//   zoneId: string;
//   zoneName: string;
//   zoneType: ZoneType;
//   status: ZoneStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   clusterCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// const INITIAL_ZONES: Zone[] = [
//   {
//     zoneId: "ZONE-AP-001",
//     zoneName: "Andhra Pradesh Central Zone",
//     zoneType: "STATE_ZONE",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: ["522001", "522002", "522003", "522004"],
//     description:
//       "Central administrative zone covering selected operational areas of Andhra Pradesh.",
//     nodeCount: 12,
//     clusterCount: 4,
//     vendorCount: 78,
//     captainCount: 142,
//     customerCount: 12450,
//     orderCount: 21860,
//     createdAt: "05 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     zoneId: "ZONE-AP-002",
//     zoneName: "Guntur Zone",
//     zoneType: "DISTRICT_ZONE",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: ["522001", "522002", "522003"],
//     description:
//       "District-level zone for Guntur administrative and operational management.",
//     nodeCount: 8,
//     clusterCount: 3,
//     vendorCount: 52,
//     captainCount: 96,
//     customerCount: 7850,
//     orderCount: 13720,
//     createdAt: "10 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     zoneId: "ZONE-AP-003",
//     zoneName: "Kurnool Zone",
//     zoneType: "DISTRICT_ZONE",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-KNL",
//     districtName: "Kurnool",
//     pincodes: ["518001", "518002", "518003"],
//     description:
//       "District-level zone for Kurnool administrative and operational management.",
//     nodeCount: 7,
//     clusterCount: 2,
//     vendorCount: 38,
//     captainCount: 74,
//     customerCount: 5620,
//     orderCount: 9820,
//     createdAt: "12 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     zoneId: "ZONE-AP-004",
//     zoneName: "Vijayawada Service Zone",
//     zoneType: "SERVICE_ZONE",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VJA",
//     districtName: "NTR",
//     pincodes: ["520001", "520002", "520003", "520004"],
//     description:
//       "Service-focused zone for customer, vendor and captain operations around Vijayawada.",
//     nodeCount: 9,
//     clusterCount: 3,
//     vendorCount: 46,
//     captainCount: 89,
//     customerCount: 6410,
//     orderCount: 11180,
//     createdAt: "15 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     zoneId: "ZONE-AP-005",
//     zoneName: "Visakhapatnam Coastal Zone",
//     zoneType: "OPERATIONAL_ZONE",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VSP",
//     districtName: "Visakhapatnam",
//     pincodes: ["530001", "530002", "530003"],
//     description:
//       "Operational zone for Visakhapatnam service and order monitoring.",
//     nodeCount: 11,
//     clusterCount: 4,
//     vendorCount: 61,
//     captainCount: 112,
//     customerCount: 9240,
//     orderCount: 16450,
//     createdAt: "18 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     zoneId: "ZONE-AP-006",
//     zoneName: "Guntur Pincode Zone",
//     zoneType: "SERVICE_ZONE",
//     status: "INACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: ["522001", "522002"],
//     description:
//       "Localized service zone for pincode-level operational grouping.",
//     nodeCount: 3,
//     clusterCount: 1,
//     vendorCount: 18,
//     captainCount: 27,
//     customerCount: 1950,
//     orderCount: 3280,
//     createdAt: "22 Jan 2026",
//     updatedAt: "01 Oct 2026",
//   },
// ];

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ZoneStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeClasses(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "bg-blue-100 text-blue-700";

//     case "DISTRICT_ZONE":
//       return "bg-orange-100 text-orange-700";

//     case "OPERATIONAL_ZONE":
//       return "bg-purple-100 text-purple-700";

//     case "SERVICE_ZONE":
//       return "bg-green-100 text-green-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "State";

//     case "DISTRICT_ZONE":
//       return "District";

//     case "OPERATIONAL_ZONE":
//       return "Operational";

//     case "SERVICE_ZONE":
//       return "Service";

//     default:
//       return type;
//   }
// }

// export default function ZonesPage() {
//   const [zones, setZones] = useState<Zone[]>(INITIAL_ZONES);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | ZoneStatus>("ALL");

//   const [typeFilter, setTypeFilter] =
//     useState<"ALL" | ZoneType>("ALL");

//   const [selectedZone, setSelectedZone] =
//     useState<Zone | null>(null);

//   const [showDetails, setShowDetails] = useState(false);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredZones = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();

//     return zones.filter((zone) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         zone.zoneId.toLowerCase().includes(searchValue) ||
//         zone.zoneName.toLowerCase().includes(searchValue) ||
//         zone.stateName.toLowerCase().includes(searchValue) ||
//         zone.districtName?.toLowerCase().includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         zone.status === statusFilter;

//       const matchesType =
//         typeFilter === "ALL" ||
//         zone.zoneType === typeFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesType
//       );
//     });
//   }, [zones, search, statusFilter, typeFilter]);

//   const summary = useMemo(() => {
//     return {
//       total: zones.length,

//       active: zones.filter(
//         (zone) => zone.status === "ACTIVE"
//       ).length,

//       inactive: zones.filter(
//         (zone) => zone.status === "INACTIVE"
//       ).length,

//       blocked: zones.filter(
//         (zone) => zone.status === "BLOCKED"
//       ).length,

//       clusters: zones.reduce(
//         (total, zone) => total + zone.clusterCount,
//         0
//       ),

//       vendors: zones.reduce(
//         (total, zone) => total + zone.vendorCount,
//         0
//       ),

//       captains: zones.reduce(
//         (total, zone) => total + zone.captainCount,
//         0
//       ),

//       customers: zones.reduce(
//         (total, zone) => total + zone.customerCount,
//         0
//       ),

//       orders: zones.reduce(
//         (total, zone) => total + zone.orderCount,
//         0
//       ),
//     };
//   }, [zones]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(zone: Zone) {
//     setSelectedZone(zone);
//     setShowDetails(true);
//   }

//   function openStatusModal(zone: Zone) {
//     setSelectedZone(zone);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(status: ZoneStatus) {
//     if (!selectedZone) {
//       return;
//     }

//     setZones((currentZones) =>
//       currentZones.map((zone) =>
//         zone.zoneId === selectedZone.zoneId
//           ? {
//               ...zone,
//               status,
//               updatedAt: "05 Oct 2026",
//             }
//           : zone
//       )
//     );

//     setSelectedZone((current) =>
//       current
//         ? {
//             ...current,
//             status,
//             updatedAt: "05 Oct 2026",
//           }
//         : null
//     );

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `Zone status changed to ${status}. This is currently a UI-only action.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6">

//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">

//           <Link
//             href="/hierarchy"
//             className="font-medium text-slate-500 hover:text-orange-600"
//           >
//             Hierarchy
//           </Link>

//           <span className="text-slate-400">/</span>

//           <span className="font-semibold text-slate-800">
//             Zones
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                   ◉
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Hierarchy Zones
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Manage administrative, service and
//                     operational hierarchy zones.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="flex flex-wrap gap-3">

//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 ← Hierarchy
//               </Link>

//               <button
//                 type="button"
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Zone
//               </button>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">

//         <SummaryCard
//           title="Total"
//           value={summary.total}
//         />

//         <SummaryCard
//           title="Active"
//           value={summary.active}
//         />

//         <SummaryCard
//           title="Inactive"
//           value={summary.inactive}
//         />

//         <SummaryCard
//           title="Blocked"
//           value={summary.blocked}
//         />

//         <SummaryCard
//           title="Clusters"
//           value={summary.clusters}
//         />

//         <SummaryCard
//           title="Vendors"
//           value={summary.vendors}
//         />

//         <SummaryCard
//           title="Captains"
//           value={summary.captains}
//         />

//         <SummaryCard
//           title="Customers"
//           value={summary.customers}
//         />

//         <SummaryCard
//           title="Orders"
//           value={summary.orders}
//         />

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">

//           <div className="flex-1">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search zone name, ID, state or district..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div className="w-full xl:w-52">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ZoneStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="ACTIVE">
//                 Active
//               </option>

//               <option value="INACTIVE">
//                 Inactive
//               </option>

//               <option value="BLOCKED">
//                 Blocked
//               </option>
//             </select>

//           </div>

//           <div className="w-full xl:w-56">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Zone Type
//             </label>

//             <select
//               value={typeFilter}
//               onChange={(event) =>
//                 setTypeFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ZoneType
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Types
//               </option>

//               <option value="STATE_ZONE">
//                 State
//               </option>

//               <option value="DISTRICT_ZONE">
//                 District
//               </option>

//               <option value="OPERATIONAL_ZONE">
//                 Operational
//               </option>

//               <option value="SERVICE_ZONE">
//                 Service
//               </option>
//             </select>

//           </div>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear
//           </button>

//         </div>

//         <div className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredZones.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">
//             {zones.length}
//           </span>{" "}
//           zones
//         </div>

//       </div>

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Zone Directory
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and operational zone
//             visibility.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Zone
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Type
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Scope
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Clusters
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Vendors
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Captains
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Customers
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Orders
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredZones.map((zone) => (
//                 <tr
//                   key={zone.zoneId}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {zone.zoneName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {zone.zoneId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                         zone.zoneType
//                       )}`}
//                     >
//                       {getTypeLabel(zone.zoneType)}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-medium text-slate-700">
//                       {zone.stateName}
//                     </p>

//                     {zone.districtName && (
//                       <p className="mt-1 text-xs text-slate-400">
//                         {zone.districtName}
//                       </p>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         zone.status
//                       )}`}
//                     >
//                       {zone.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(zone.clusterCount)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(zone.vendorCount)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(zone.captainCount)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(zone.customerCount)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(zone.orderCount)}
//                   </td>

//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-3">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(zone)
//                         }
//                         className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         View
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openStatusModal(zone)
//                         }
//                         className="text-sm font-semibold text-slate-600 hover:text-slate-900"
//                       >
//                         Status
//                       </button>

//                     </div>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredZones.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="space-y-4 md:hidden">

//         {filteredZones.map((zone) => (
//           <div
//             key={zone.zoneId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   {zone.zoneName}
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {zone.zoneId}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   zone.status
//                 )}`}
//               >
//                 {zone.status}
//               </span>

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   zone.zoneType
//                 )}`}
//               >
//                 {getTypeLabel(zone.zoneType)}
//               </span>

//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {zone.stateName}
//               </span>

//               {zone.districtName && (
//                 <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                   {zone.districtName}
//                 </span>
//               )}

//             </div>

//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {zone.description}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileStat
//                 label="Clusters"
//                 value={zone.clusterCount}
//               />

//               <MobileStat
//                 label="Vendors"
//                 value={zone.vendorCount}
//               />

//               <MobileStat
//                 label="Captains"
//                 value={zone.captainCount}
//               />

//               <MobileStat
//                 label="Customers"
//                 value={zone.customerCount}
//               />

//               <MobileStat
//                 label="Orders"
//                 value={zone.orderCount}
//               />

//               <MobileStat
//                 label="Nodes"
//                 value={zone.nodeCount}
//               />

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   openDetails(zone)
//                 }
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 View Details
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   openStatusModal(zone)
//                 }
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Manage Status
//               </button>

//             </div>

//           </div>
//         ))}

//         {filteredZones.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           Zone Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Zones provide administrative or operational
//           grouping within the JUERP hierarchy. Zone
//           membership, authorization, state/district/
//           pincode scope and protected business operations
//           must be validated by the trusted backend and
//           JUERP governance layer. This page must not
//           independently calculate pricing, commissions,
//           settlements or payout amounts.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="State Zone"
//             description="Provides state-level administrative grouping."
//           />

//           <GovernanceCard
//             title="District Zone"
//             description="Groups operational entities within a district."
//           />

//           <GovernanceCard
//             title="Operational Zone"
//             description="Supports operational monitoring and management."
//           />

//           <GovernanceCard
//             title="Service Zone"
//             description="Supports localized service coverage."
//           />

//         </div>

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedZone && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">

//               <div>

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedZone.zoneName}
//                   </h2>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedZone.status
//                     )}`}
//                   >
//                     {selectedZone.status}
//                   </span>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedZone.zoneId}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowDetails(false)
//                 }
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="space-y-6 p-5 md:p-6">

//               {/* BASIC INFORMATION */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Zone Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Zone ID"
//                     value={selectedZone.zoneId}
//                   />

//                   <InfoItem
//                     label="Zone Type"
//                     value={getTypeLabel(
//                       selectedZone.zoneType
//                     )}
//                   />

//                   <InfoItem
//                     label="State"
//                     value={selectedZone.stateName}
//                   />

//                   <InfoItem
//                     label="District"
//                     value={
//                       selectedZone.districtName || "-"
//                     }
//                   />

//                   <InfoItem
//                     label="Node Count"
//                     value={formatNumber(
//                       selectedZone.nodeCount
//                     )}
//                   />

//                   <InfoItem
//                     label="Cluster Count"
//                     value={formatNumber(
//                       selectedZone.clusterCount
//                     )}
//                   />

//                   <InfoItem
//                     label="Created At"
//                     value={selectedZone.createdAt}
//                   />

//                   <InfoItem
//                     label="Updated At"
//                     value={selectedZone.updatedAt}
//                   />

//                 </div>

//               </div>

//               {/* DESCRIPTION */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Description
//                 </h3>

//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedZone.description}
//                 </p>

//               </div>

//               {/* PINCODES */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>

//                 <div className="mt-3 flex flex-wrap gap-2">

//                   {selectedZone.pincodes.map(
//                     (pincode) => (
//                       <span
//                         key={pincode}
//                         className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
//                       >
//                         {pincode}
//                       </span>
//                     )
//                   )}

//                 </div>

//               </div>

//               {/* OPERATIONAL COUNTS */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Operational Scope
//                 </h3>

//                 <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5">

//                   <DetailStat
//                     title="Nodes"
//                     value={selectedZone.nodeCount}
//                   />

//                   <DetailStat
//                     title="Clusters"
//                     value={selectedZone.clusterCount}
//                   />

//                   <DetailStat
//                     title="Vendors"
//                     value={selectedZone.vendorCount}
//                   />

//                   <DetailStat
//                     title="Captains"
//                     value={selectedZone.captainCount}
//                   />

//                   <DetailStat
//                     title="Customers"
//                     value={selectedZone.customerCount}
//                   />

//                 </div>

//               </div>

//               <div className="rounded-xl border border-slate-200 p-4">

//                 <div className="flex items-center justify-between">

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Orders in Scope
//                     </p>

//                     <p className="mt-1 text-2xl font-bold text-slate-900">
//                       {formatNumber(
//                         selectedZone.orderCount
//                       )}
//                     </p>

//                   </div>

//                   <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                     ↗
//                   </div>

//                 </div>

//               </div>

//               {/* ACTIONS */}

//               <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowDetails(false)
//                   }
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                 >
//                   Close
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetails(false);
//                     setShowStatusModal(true);
//                   }}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//                 >
//                   Manage Status
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* STATUS MODAL */}

//       {showStatusModal && selectedZone && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Zone Status
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedZone.zoneName}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowStatusModal(false)
//                 }
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="mt-6 space-y-3">

//               <StatusOption
//                 title="Active"
//                 description="Zone is operational."
//                 active={
//                   selectedZone.status === "ACTIVE"
//                 }
//                 onClick={() =>
//                   handleStatusChange("ACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Inactive"
//                 description="Zone is temporarily inactive."
//                 active={
//                   selectedZone.status === "INACTIVE"
//                 }
//                 onClick={() =>
//                   handleStatusChange("INACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Blocked"
//                 description="Zone access is blocked."
//                 active={
//                   selectedZone.status === "BLOCKED"
//                 }
//                 onClick={() =>
//                   handleStatusChange("BLOCKED")
//                 }
//               />

//             </div>

//             <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-700">
//               This status action currently changes
//               local UI state only. Production persistence
//               must go through the trusted backend and
//               JUERP authorization layer.
//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// function SummaryCard({
//   title,
//   value,
// }: {
//   title: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">

//       <p className="text-[11px] font-medium text-slate-500">
//         {title}
//       </p>

//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function MobileStat({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">

//       <p className="text-[10px] font-medium text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function InfoItem({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">

//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function DetailStat({
//   title,
//   value,
// }: {
//   title: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 p-4">

//       <p className="text-xs text-slate-500">
//         {title}
//       </p>

//       <p className="mt-1 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function GovernanceCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-orange-200 bg-white p-4">

//       <p className="text-xs font-bold text-orange-800">
//         {title}
//       </p>

//       <p className="mt-1 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function StatusOption({
//   title,
//   description,
//   active,
//   onClick,
// }: {
//   title: string;
//   description: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full rounded-xl border p-4 text-left ${
//         active
//           ? "border-orange-300 bg-orange-50"
//           : "border-slate-200 hover:bg-slate-50"
//       }`}
//     >

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-sm font-bold text-slate-800">
//             {title}
//           </p>

//           <p className="mt-1 text-xs text-slate-500">
//             {description}
//           </p>

//         </div>

//         {active && (
//           <span className="font-bold text-orange-600">
//             ✓
//           </span>
//         )}

//       </div>

//     </button>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">

//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         ◉
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No zones found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useZones,
//   type Zone,
//   type ZoneStatus,
//   type ZoneType,
// } from "@/hooks/useHierarchy";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ZoneStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeClasses(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_ZONE":
//       return "bg-orange-100 text-orange-700";
//     case "OPERATIONAL_ZONE":
//       return "bg-purple-100 text-purple-700";
//     case "SERVICE_ZONE":
//       return "bg-green-100 text-green-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "State";
//     case "DISTRICT_ZONE":
//       return "District";
//     case "OPERATIONAL_ZONE":
//       return "Operational";
//     case "SERVICE_ZONE":
//       return "Service";
//     default:
//       return String(type);
//   }
// }

// export default function ZonesPage() {
//   const { zones, loading, error, demoMode, refresh } = useZones();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ZoneStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ZoneType>("ALL");
//   const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredZones = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return zones.filter((zone) => {
//       const matchesSearch =
//         !q ||
//         zone.zoneId.toLowerCase().includes(q) ||
//         zone.zoneName.toLowerCase().includes(q) ||
//         zone.stateName.toLowerCase().includes(q) ||
//         (zone.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || zone.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || zone.zoneType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [zones, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: zones.length,
//       active: zones.filter((z) => z.status === "ACTIVE").length,
//       inactive: zones.filter((z) => z.status === "INACTIVE").length,
//       blocked: zones.filter((z) => z.status === "BLOCKED").length,
//       clusters: zones.reduce((t, z) => t + z.clusterCount, 0),
//       vendors: zones.reduce((t, z) => t + z.vendorCount, 0),
//       captains: zones.reduce((t, z) => t + z.captainCount, 0),
//       customers: zones.reduce((t, z) => t + z.customerCount, 0),
//       orders: zones.reduce((t, z) => t + z.orderCount, 0),
//     }),
//     [zones]
//   );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(zone: Zone) {
//     setSelectedZone(zone);
//     setShowDetails(true);
//   }

//   function openStatusModal(zone: Zone) {
//     setSelectedZone(zone);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(status: ZoneStatus) {
//     if (!selectedZone) return;
//     setSelectedZone({
//       ...selectedZone,
//       status,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `Zone status → ${status}. Local UI only — persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link
//             href="/hierarchy"
//             className="font-medium text-slate-500 hover:text-orange-600"
//           >
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">Zones</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◉
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Zones
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>zones</code> collection.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 ← Hierarchy
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => void refresh()}
//                 disabled={loading}
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//               >
//                 {loading ? "Refreshing…" : "Refresh"}
//               </button>
//               <button
//                 type="button"
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Zone
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}
//       {/* {demoMode && (
//         <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           Demo mode — set <code>NEXT_PUBLIC_DEMO_MODE=false</code>.
//         </div>
//       )} */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Vendors" value={summary.vendors} />
//         <SummaryCard title="Captains" value={summary.captains} />
//         <SummaryCard title="Customers" value={summary.customers} />
//         <SummaryCard title="Orders" value={summary.orders} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search zone name, ID, state or district..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | ZoneStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-56">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Zone Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ZoneType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_ZONE">State</option>
//               <option value="DISTRICT_ZONE">District</option>
//               <option value="OPERATIONAL_ZONE">Operational</option>
//               <option value="SERVICE_ZONE">Service</option>
//             </select>
//           </div>
//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear
//           </button>
//         </div>
//         <div className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredZones.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{zones.length}</span>{" "}
//           zones
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Zone Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and operational zone visibility.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Zone",
//                   "Type",
//                   "Scope",
//                   "Status",
//                   "Clusters",
//                   "Vendors",
//                   "Captains",
//                   "Customers",
//                   "Orders",
//                   "Action",
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredZones.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={10}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading zones…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredZones.map((zone) => (
//                   <tr key={zone.zoneId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {zone.zoneName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {zone.zoneId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           zone.zoneType
//                         )}`}
//                       >
//                         {getTypeLabel(zone.zoneType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {zone.stateName}
//                       </p>
//                       {zone.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {zone.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           zone.status
//                         )}`}
//                       >
//                         {zone.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.clusterCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(zone)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(zone)}
//                           className="text-sm font-semibold text-slate-600 hover:text-slate-900"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredZones.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredZones.map((zone) => (
//           <div key={zone.zoneId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {zone.zoneName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">{zone.zoneId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   zone.status
//                 )}`}
//               >
//                 {zone.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   zone.zoneType
//                 )}`}
//               >
//                 {getTypeLabel(zone.zoneType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {zone.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {zone.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Clusters" value={zone.clusterCount} />
//               <MobileStat label="Vendors" value={zone.vendorCount} />
//               <MobileStat label="Captains" value={zone.captainCount} />
//               <MobileStat label="Customers" value={zone.customerCount} />
//               <MobileStat label="Orders" value={zone.orderCount} />
//               <MobileStat label="Nodes" value={zone.nodeCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(zone)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(zone)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredZones.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Zone Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Zones load from Firestore. Status changes are local UI only until
//           authorized backend writes exist. Do not implement pricing, commission,
//           or settlement logic on this page.
//         </p>
//       </div>

//       {showDetails && selectedZone && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedZone.zoneName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedZone.status
//                     )}`}
//                   >
//                     {selectedZone.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedZone.zoneId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Zone ID" value={selectedZone.zoneId} />
//                 <InfoItem
//                   label="Zone Type"
//                   value={getTypeLabel(selectedZone.zoneType)}
//                 />
//                 <InfoItem label="State" value={selectedZone.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedZone.districtName || "—"}
//                 />
//                 <InfoItem
//                   label="Node Count"
//                   value={formatNumber(selectedZone.nodeCount)}
//                 />
//                 <InfoItem
//                   label="Cluster Count"
//                   value={formatNumber(selectedZone.clusterCount)}
//                 />
//                 <InfoItem label="Created At" value={selectedZone.createdAt} />
//                 <InfoItem label="Updated At" value={selectedZone.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedZone.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedZone.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedZone.pincodes.map((p) => (
//                       <span
//                         key={p}
//                         className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
//                       >
//                         {p}
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
//                 <DetailStat title="Nodes" value={selectedZone.nodeCount} />
//                 <DetailStat title="Clusters" value={selectedZone.clusterCount} />
//                 <DetailStat title="Vendors" value={selectedZone.vendorCount} />
//                 <DetailStat title="Captains" value={selectedZone.captainCount} />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedZone.customerCount}
//                 />
//               </div>
//               <div className="rounded-xl border border-slate-200 p-4">
//                 <p className="text-xs text-slate-500">Orders in Scope</p>
//                 <p className="mt-1 text-2xl font-bold text-slate-900">
//                   {formatNumber(selectedZone.orderCount)}
//                 </p>
//               </div>
//               <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
//                 <button
//                   type="button"
//                   onClick={() => setShowDetails(false)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetails(false);
//                     setShowStatusModal(true);
//                   }}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//                 >
//                   Manage Status
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && selectedZone && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Zone Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedZone.zoneName}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowStatusModal(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 space-y-3">
//               <StatusOption
//                 title="Active"
//                 description="Zone is operational."
//                 active={selectedZone.status === "ACTIVE"}
//                 onClick={() => handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Zone is temporarily inactive."
//                 active={selectedZone.status === "INACTIVE"}
//                 onClick={() => handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Zone access is blocked."
//                 active={selectedZone.status === "BLOCKED"}
//                 onClick={() => handleStatusChange("BLOCKED")}
//               />
//             </div>
//             <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-700">
//               Local UI only. Production persistence requires trusted backend /
//               JUERP authorization.
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function SummaryCard({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">
//       <p className="text-[11px] font-medium text-slate-500">{title}</p>
//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function MobileStat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">
//       <p className="text-[10px] font-medium text-slate-400">{label}</p>
//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>
//       <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function DetailStat({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-xl border border-slate-200 p-4">
//       <p className="text-xs text-slate-500">{title}</p>
//       <p className="mt-1 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function StatusOption({
//   title,
//   description,
//   active,
//   onClick,
// }: {
//   title: string;
//   description: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full rounded-xl border p-4 text-left ${
//         active
//           ? "border-orange-300 bg-orange-50"
//           : "border-slate-200 hover:bg-slate-50"
//       }`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-bold text-slate-800">{title}</p>
//           <p className="mt-1 text-xs text-slate-500">{description}</p>
//         </div>
//         {active && <span className="font-bold text-orange-600">✓</span>}
//       </div>
//     </button>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         ◉
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No zones found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collection or filters too narrow.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useZones,
//   useStates,
//   useDistricts,
//   type Zone,
//   type ZoneStatus,
//   type ZoneType,
// } from "@/hooks/useHierarchy";
// import ZoneCreateModal, {
//   type ZoneCreateData,
// } from "@/components/hierarchy/ZoneCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ZoneStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeClasses(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_ZONE":
//       return "bg-orange-100 text-orange-700";
//     case "OPERATIONAL_ZONE":
//       return "bg-purple-100 text-purple-700";
//     case "SERVICE_ZONE":
//       return "bg-green-100 text-green-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "State";
//     case "DISTRICT_ZONE":
//       return "District";
//     case "OPERATIONAL_ZONE":
//       return "Operational";
//     case "SERVICE_ZONE":
//       return "Service";
//     default:
//       return String(type);
//   }
// }

// export default function ZonesPage() {
//   const { zones, loading, error, demoMode, refresh } = useZones();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ZoneStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ZoneType>("ALL");
//   const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredZones = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return zones.filter((zone) => {
//       const matchesSearch =
//         !q ||
//         zone.zoneId.toLowerCase().includes(q) ||
//         zone.zoneName.toLowerCase().includes(q) ||
//         zone.stateName.toLowerCase().includes(q) ||
//         (zone.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || zone.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || zone.zoneType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [zones, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: zones.length,
//       active: zones.filter((z) => z.status === "ACTIVE").length,
//       inactive: zones.filter((z) => z.status === "INACTIVE").length,
//       blocked: zones.filter((z) => z.status === "BLOCKED").length,
//       clusters: zones.reduce((t, z) => t + z.clusterCount, 0),
//       vendors: zones.reduce((t, z) => t + z.vendorCount, 0),
//       captains: zones.reduce((t, z) => t + z.captainCount, 0),
//       customers: zones.reduce((t, z) => t + z.customerCount, 0),
//       orders: zones.reduce((t, z) => t + z.orderCount, 0),
//     }),
//     [zones]
//   );

//   const stateOptions = useMemo(
//     () =>
//       states.map((s) => ({
//         id: s.stateId,
//         name: s.stateName,
//         code: s.code,
//       })),
//     [states]
//   );

//   const districtOptions = useMemo(
//     () =>
//       districts.map((d) => ({
//         id: d.districtId,
//         name: d.districtName,
//         code: d.code,
//         stateId: d.stateId,
//       })),
//     [districts]
//   );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(zone: Zone) {
//     setSelectedZone(zone);
//     setShowDetails(true);
//   }

//   function openStatusModal(zone: Zone) {
//     setSelectedZone(zone);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(status: ZoneStatus) {
//     if (!selectedZone) return;
//     setSelectedZone({
//       ...selectedZone,
//       status,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `Zone status → ${status}. Local UI only — persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 3500);
//   }

//   async function handleCreateZone(data: ZoneCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       const id = `zone_${data.stateId}_${Date.now()}`.toLowerCase();

//       await createDocumentWithId(FIRESTORE_COLLECTIONS.ZONES, id, {
//         zoneId: id,
//         zoneName: data.zoneName,
//         zoneType: data.zoneType,
//         status: "ACTIVE",
//         stateId: data.stateId,
//         stateName: data.stateName,
//         districtId: data.districtId ?? null,
//         districtName: data.districtName ?? null,
//         pincodes: data.pincodes,
//         description: data.description ?? null,
//         nodeCount: 0,
//         clusterCount: 0,
//         vendorCount: 0,
//         captainCount: 0,
//         customerCount: 0,
//         orderCount: 0,
//       });

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.zoneName} created successfully.`);
//       setTimeout(() => setSuccessMessage(""), 3500);
//       await refresh();
//     } finally {
//       setCreateLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link
//             href="/hierarchy"
//             className="font-medium text-slate-500 hover:text-orange-600"
//           >
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">Zones</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◉
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Zones
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>zones</code> collection.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 ← Hierarchy
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => void refresh()}
//                 disabled={loading}
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//               >
//                 {loading ? "Refreshing…" : "Refresh"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCreateModal(true)}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Zone
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Vendors" value={summary.vendors} />
//         <SummaryCard title="Captains" value={summary.captains} />
//         <SummaryCard title="Customers" value={summary.customers} />
//         <SummaryCard title="Orders" value={summary.orders} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search zone name, ID, state or district..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | ZoneStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-56">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Zone Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ZoneType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_ZONE">State</option>
//               <option value="DISTRICT_ZONE">District</option>
//               <option value="OPERATIONAL_ZONE">Operational</option>
//               <option value="SERVICE_ZONE">Service</option>
//             </select>
//           </div>
//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear
//           </button>
//         </div>
//         <div className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredZones.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{zones.length}</span>{" "}
//           zones
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Zone Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and operational zone visibility.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Zone",
//                   "Type",
//                   "Scope",
//                   "Status",
//                   "Clusters",
//                   "Vendors",
//                   "Captains",
//                   "Customers",
//                   "Orders",
//                   "Action",
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredZones.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={10}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading zones…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredZones.map((zone) => (
//                   <tr key={zone.zoneId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {zone.zoneName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {zone.zoneId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           zone.zoneType
//                         )}`}
//                       >
//                         {getTypeLabel(zone.zoneType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {zone.stateName}
//                       </p>
//                       {zone.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {zone.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           zone.status
//                         )}`}
//                       >
//                         {zone.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.clusterCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(zone)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(zone)}
//                           className="text-sm font-semibold text-slate-600 hover:text-slate-900"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredZones.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredZones.map((zone) => (
//           <div key={zone.zoneId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {zone.zoneName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">{zone.zoneId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   zone.status
//                 )}`}
//               >
//                 {zone.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   zone.zoneType
//                 )}`}
//               >
//                 {getTypeLabel(zone.zoneType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {zone.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {zone.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Clusters" value={zone.clusterCount} />
//               <MobileStat label="Vendors" value={zone.vendorCount} />
//               <MobileStat label="Captains" value={zone.captainCount} />
//               <MobileStat label="Customers" value={zone.customerCount} />
//               <MobileStat label="Orders" value={zone.orderCount} />
//               <MobileStat label="Nodes" value={zone.nodeCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(zone)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(zone)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredZones.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Zone Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Zones load from Firestore. Status changes are local UI only until
//           authorized backend writes exist. Do not implement pricing, commission,
//           or settlement logic on this page.
//         </p>
//       </div>

//       {/* Details Modal */}
//       {showDetails && selectedZone && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedZone.zoneName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedZone.status
//                     )}`}
//                   >
//                     {selectedZone.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedZone.zoneId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Zone ID" value={selectedZone.zoneId} />
//                 <InfoItem
//                   label="Zone Type"
//                   value={getTypeLabel(selectedZone.zoneType)}
//                 />
//                 <InfoItem label="State" value={selectedZone.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedZone.districtName || "—"}
//                 />
//                 <InfoItem
//                   label="Node Count"
//                   value={formatNumber(selectedZone.nodeCount)}
//                 />
//                 <InfoItem
//                   label="Cluster Count"
//                   value={formatNumber(selectedZone.clusterCount)}
//                 />
//                 <InfoItem label="Created At" value={selectedZone.createdAt} />
//                 <InfoItem label="Updated At" value={selectedZone.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedZone.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedZone.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedZone.pincodes.map((p) => (
//                       <span
//                         key={p}
//                         className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
//                       >
//                         {p}
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
//                 <DetailStat title="Nodes" value={selectedZone.nodeCount} />
//                 <DetailStat title="Clusters" value={selectedZone.clusterCount} />
//                 <DetailStat title="Vendors" value={selectedZone.vendorCount} />
//                 <DetailStat title="Captains" value={selectedZone.captainCount} />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedZone.customerCount}
//                 />
//               </div>
//               <div className="rounded-xl border border-slate-200 p-4">
//                 <p className="text-xs text-slate-500">Orders in Scope</p>
//                 <p className="mt-1 text-2xl font-bold text-slate-900">
//                   {formatNumber(selectedZone.orderCount)}
//                 </p>
//               </div>
//               <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
//                 <button
//                   type="button"
//                   onClick={() => setShowDetails(false)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetails(false);
//                     setShowStatusModal(true);
//                   }}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//                 >
//                   Manage Status
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Status Modal */}
//       {showStatusModal && selectedZone && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Zone Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedZone.zoneName}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowStatusModal(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 space-y-3">
//               <StatusOption
//                 title="Active"
//                 description="Zone is operational."
//                 active={selectedZone.status === "ACTIVE"}
//                 onClick={() => handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Zone is temporarily inactive."
//                 active={selectedZone.status === "INACTIVE"}
//                 onClick={() => handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Zone access is blocked."
//                 active={selectedZone.status === "BLOCKED"}
//                 onClick={() => handleStatusChange("BLOCKED")}
//               />
//             </div>
//             <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-700">
//               Local UI only. Production persistence requires trusted backend /
//               JUERP authorization.
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Create Zone Modal */}
//       <ZoneCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateZone}
//         states={stateOptions}
//         districts={districtOptions}
//         loading={createLoading}
//       />
//     </div>
//   );
// }

// function SummaryCard({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">
//       <p className="text-[11px] font-medium text-slate-500">{title}</p>
//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function MobileStat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">
//       <p className="text-[10px] font-medium text-slate-400">{label}</p>
//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>
//       <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function DetailStat({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-xl border border-slate-200 p-4">
//       <p className="text-xs text-slate-500">{title}</p>
//       <p className="mt-1 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function StatusOption({
//   title,
//   description,
//   active,
//   onClick,
// }: {
//   title: string;
//   description: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full rounded-xl border p-4 text-left ${
//         active
//           ? "border-orange-300 bg-orange-50"
//           : "border-slate-200 hover:bg-slate-50"
//       }`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-bold text-slate-800">{title}</p>
//           <p className="mt-1 text-xs text-slate-500">{description}</p>
//         </div>
//         {active && <span className="font-bold text-orange-600">✓</span>}
//       </div>
//     </button>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         ◉
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No zones found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collection or filters too narrow.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useZones,
//   useStates,
//   useDistricts,
//   type Zone,
//   type ZoneStatus,
//   type ZoneType,
// } from "@/hooks/useHierarchy";
// import ZoneCreateModal, {
//   type ZoneCreateData,
// } from "@/components/hierarchy/ZoneCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ZoneStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeClasses(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_ZONE":
//       return "bg-orange-100 text-orange-700";
//     case "OPERATIONAL_ZONE":
//       return "bg-purple-100 text-purple-700";
//     case "SERVICE_ZONE":
//       return "bg-green-100 text-green-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ZoneType) {
//   switch (type) {
//     case "STATE_ZONE":
//       return "State";
//     case "DISTRICT_ZONE":
//       return "District";
//     case "OPERATIONAL_ZONE":
//       return "Operational";
//     case "SERVICE_ZONE":
//       return "Service";
//     default:
//       return String(type);
//   }
// }

// export default function ZonesPage() {
//   const { zones, loading, error, demoMode, refresh } = useZones();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ZoneStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ZoneType>("ALL");
//   const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [statusSaving, setStatusSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredZones = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return zones.filter((zone) => {
//       const matchesSearch =
//         !q ||
//         zone.zoneId.toLowerCase().includes(q) ||
//         zone.zoneName.toLowerCase().includes(q) ||
//         zone.stateName.toLowerCase().includes(q) ||
//         (zone.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || zone.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || zone.zoneType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [zones, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: zones.length,
//       active: zones.filter((z) => z.status === "ACTIVE").length,
//       inactive: zones.filter((z) => z.status === "INACTIVE").length,
//       blocked: zones.filter((z) => z.status === "BLOCKED").length,
//       clusters: zones.reduce((t, z) => t + z.clusterCount, 0),
//       vendors: zones.reduce((t, z) => t + z.vendorCount, 0),
//       captains: zones.reduce((t, z) => t + z.captainCount, 0),
//       customers: zones.reduce((t, z) => t + z.customerCount, 0),
//       orders: zones.reduce((t, z) => t + z.orderCount, 0),
//     }),
//     [zones]
//   );

//   const stateOptions = useMemo(
//     () =>
//       states.map((s) => ({
//         id: s.stateId,
//         name: s.stateName,
//         code: s.code,
//       })),
//     [states]
//   );

//   const districtOptions = useMemo(
//     () =>
//       districts.map((d) => ({
//         id: d.districtId,
//         name: d.districtName,
//         code: d.code,
//         stateId: d.stateId,
//       })),
//     [districts]
//   );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(zone: Zone) {
//     setSelectedZone(zone);
//     setShowDetails(true);
//   }

//   function openStatusModal(zone: Zone) {
//     setSelectedZone(zone);
//     setShowStatusModal(true);
//   }

//   async function handleStatusChange(status: ZoneStatus) {
//     if (!selectedZone) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.ZONES,
//         selectedZone.zoneId,
//         { status }
//       );

//       setSelectedZone({
//         ...selectedZone,
//         status,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(`Zone "${selectedZone.zoneName}" → ${status}`);
//       setTimeout(() => setSuccessMessage(""), 3500);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update status (check Firestore rules)."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } finally {
//       setStatusSaving(false);
//     }
//   }

//   async function handleCreateZone(data: ZoneCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       const id = `zone_${data.stateId}_${Date.now()}`.toLowerCase();

//       await createDocumentWithId(FIRESTORE_COLLECTIONS.ZONES, id, {
//         zoneId: id,
//         zoneName: data.zoneName,
//         zoneType: data.zoneType,
//         status: "ACTIVE",
//         stateId: data.stateId,
//         stateName: data.stateName,
//         districtId: data.districtId ?? null,
//         districtName: data.districtName ?? null,
//         pincodes: data.pincodes,
//         description: data.description ?? null,
//         nodeCount: 0,
//         clusterCount: 0,
//         vendorCount: 0,
//         captainCount: 0,
//         customerCount: 0,
//         orderCount: 0,
//       });

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.zoneName} created successfully.`);
//       setTimeout(() => setSuccessMessage(""), 3500);
//       await refresh();
//     } finally {
//       setCreateLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link
//             href="/hierarchy"
//             className="font-medium text-slate-500 hover:text-orange-600"
//           >
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">Zones</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◉
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Zones
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>zones</code>.
//                   {demoMode ? " (demo mode — writes disabled)" : ""}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 ← Hierarchy
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => void refresh()}
//                 disabled={loading}
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//               >
//                 {loading ? "Refreshing…" : "Refresh"}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowCreateModal(true)}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Zone
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Vendors" value={summary.vendors} />
//         <SummaryCard title="Captains" value={summary.captains} />
//         <SummaryCard title="Customers" value={summary.customers} />
//         <SummaryCard title="Orders" value={summary.orders} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search zone name, ID, state or district..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | ZoneStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-56">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Zone Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ZoneType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_ZONE">State</option>
//               <option value="DISTRICT_ZONE">District</option>
//               <option value="OPERATIONAL_ZONE">Operational</option>
//               <option value="SERVICE_ZONE">Service</option>
//             </select>
//           </div>
//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear
//           </button>
//         </div>
//         <div className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredZones.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{zones.length}</span>{" "}
//           zones
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Zone Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and operational zone visibility.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Zone",
//                   "Type",
//                   "Scope",
//                   "Status",
//                   "Clusters",
//                   "Vendors",
//                   "Captains",
//                   "Customers",
//                   "Orders",
//                   "Action",
//                 ].map((h) => (
//                   <th
//                     key={h}
//                     className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredZones.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={10}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading zones…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredZones.map((zone) => (
//                   <tr key={zone.zoneId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {zone.zoneName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {zone.zoneId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           zone.zoneType
//                         )}`}
//                       >
//                         {getTypeLabel(zone.zoneType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {zone.stateName}
//                       </p>
//                       {zone.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {zone.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           zone.status
//                         )}`}
//                       >
//                         {zone.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.clusterCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(zone.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(zone)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(zone)}
//                           className="text-sm font-semibold text-slate-600 hover:text-slate-900"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredZones.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredZones.map((zone) => (
//           <div key={zone.zoneId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {zone.zoneName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">{zone.zoneId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   zone.status
//                 )}`}
//               >
//                 {zone.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   zone.zoneType
//                 )}`}
//               >
//                 {getTypeLabel(zone.zoneType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {zone.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {zone.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Clusters" value={zone.clusterCount} />
//               <MobileStat label="Vendors" value={zone.vendorCount} />
//               <MobileStat label="Captains" value={zone.captainCount} />
//               <MobileStat label="Customers" value={zone.customerCount} />
//               <MobileStat label="Orders" value={zone.orderCount} />
//               <MobileStat label="Nodes" value={zone.nodeCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(zone)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(zone)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredZones.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Zone Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Zones load from Firestore. Status changes are written to the{" "}
//           <code>zones</code> collection. Parent State/District INACTIVE or
//           BLOCKED cascades to zones via the hierarchy cascade helper.
//         </p>
//       </div>

//       {showDetails && selectedZone && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedZone.zoneName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedZone.status
//                     )}`}
//                   >
//                     {selectedZone.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedZone.zoneId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Zone ID" value={selectedZone.zoneId} />
//                 <InfoItem
//                   label="Zone Type"
//                   value={getTypeLabel(selectedZone.zoneType)}
//                 />
//                 <InfoItem label="State" value={selectedZone.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedZone.districtName || "—"}
//                 />
//                 <InfoItem
//                   label="Node Count"
//                   value={formatNumber(selectedZone.nodeCount)}
//                 />
//                 <InfoItem
//                   label="Cluster Count"
//                   value={formatNumber(selectedZone.clusterCount)}
//                 />
//                 <InfoItem label="Created At" value={selectedZone.createdAt} />
//                 <InfoItem label="Updated At" value={selectedZone.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedZone.description || "—"}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedZone.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedZone.pincodes.map((p) => (
//                       <span
//                         key={p}
//                         className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
//                       >
//                         {p}
//                       </span>
//                     ))
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
//                 <DetailStat title="Nodes" value={selectedZone.nodeCount} />
//                 <DetailStat title="Clusters" value={selectedZone.clusterCount} />
//                 <DetailStat title="Vendors" value={selectedZone.vendorCount} />
//                 <DetailStat title="Captains" value={selectedZone.captainCount} />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedZone.customerCount}
//                 />
//               </div>
//               <div className="rounded-xl border border-slate-200 p-4">
//                 <p className="text-xs text-slate-500">Orders in Scope</p>
//                 <p className="mt-1 text-2xl font-bold text-slate-900">
//                   {formatNumber(selectedZone.orderCount)}
//                 </p>
//               </div>
//               <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">
//                 <button
//                   type="button"
//                   onClick={() => setShowDetails(false)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetails(false);
//                     setShowStatusModal(true);
//                   }}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//                 >
//                   Manage Status
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && selectedZone && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Zone Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedZone.zoneName}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowStatusModal(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 space-y-3">
//               <StatusOption
//                 title="Active"
//                 description="Zone is operational."
//                 active={selectedZone.status === "ACTIVE"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Zone is temporarily inactive."
//                 active={selectedZone.status === "INACTIVE"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Zone access is blocked."
//                 active={selectedZone.status === "BLOCKED"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("BLOCKED")}
//               />
//             </div>
//             <p className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
//               Status is written to Firestore collection <code>zones</code>.
//             </p>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={statusSaving}
//               className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <ZoneCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateZone}
//         states={stateOptions}
//         districts={districtOptions}
//         loading={createLoading}
//       />
//     </div>
//   );
// }

// function SummaryCard({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">
//       <p className="text-[11px] font-medium text-slate-500">{title}</p>
//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function MobileStat({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">
//       <p className="text-[10px] font-medium text-slate-400">{label}</p>
//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>
//       <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function DetailStat({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-xl border border-slate-200 p-4">
//       <p className="text-xs text-slate-500">{title}</p>
//       <p className="mt-1 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function StatusOption({
//   title,
//   description,
//   active,
//   disabled,
//   onClick,
// }: {
//   title: string;
//   description: string;
//   active: boolean;
//   disabled?: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       disabled={disabled}
//       className={`w-full rounded-xl border p-4 text-left disabled:opacity-60 ${
//         active
//           ? "border-orange-300 bg-orange-50"
//           : "border-slate-200 hover:bg-slate-50"
//       }`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm font-bold text-slate-800">
//             {disabled ? "Saving…" : title}
//           </p>
//           <p className="mt-1 text-xs text-slate-500">{description}</p>
//         </div>
//         {active && <span className="font-bold text-orange-600">✓</span>}
//       </div>
//     </button>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         ◉
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No zones found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collection or filters too narrow.
//       </p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useZones,
  useStates,
  useDistricts,
  type Zone,
  type ZoneStatus,
  type ZoneType,
} from "@/hooks/useHierarchy";
import useAuthScope from "@/hooks/useAuthScope";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";
import ZoneCreateModal, {
  type ZoneCreateData,
} from "@/components/hierarchy/ZoneCreateModal";
import {
  FIRESTORE_COLLECTIONS,
  createDocumentWithId,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";
import {
  filterByStateAndDistrict,
  filterStatesByScope,
  filterDistrictsByScope,
  getCreateCapabilities,
  type HierarchyScopeFilter,
} from "@/lib/hierarchy/scopeFilter";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getStatusClasses(status: ZoneStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-slate-100 text-slate-600";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getTypeClasses(type: ZoneType) {
  switch (type) {
    case "STATE_ZONE":
      return "bg-blue-100 text-blue-700";
    case "DISTRICT_ZONE":
      return "bg-orange-100 text-orange-700";
    case "OPERATIONAL_ZONE":
      return "bg-purple-100 text-purple-700";
    case "SERVICE_ZONE":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getTypeLabel(type: ZoneType) {
  switch (type) {
    case "STATE_ZONE":
      return "State";
    case "DISTRICT_ZONE":
      return "District";
    case "OPERATIONAL_ZONE":
      return "Operational";
    case "SERVICE_ZONE":
      return "Service";
    default:
      return String(type);
  }
}

export default function ZonesPage() {
  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = {
    role: auth.role,
    stateId: auth.stateId,
    districtId: auth.districtId,
    isGlobalAdmin: auth.isGlobalAdmin,
  };

  const { zones: allZones, loading, error, demoMode, refresh } = useZones();
  const { states: allStates } = useStates();
  const { districts: allDistricts } = useDistricts();

  const zones = useMemo(
    () => filterByStateAndDistrict(allZones, scopeFilter),
    [
      allZones,
      scopeFilter.role,
      scopeFilter.stateId,
      scopeFilter.districtId,
      scopeFilter.isGlobalAdmin,
    ]
  );

  const states = useMemo(
    () => filterStatesByScope(allStates, scopeFilter),
    [
      allStates,
      scopeFilter.role,
      scopeFilter.stateId,
      scopeFilter.districtId,
      scopeFilter.isGlobalAdmin,
    ]
  );

  const districts = useMemo(
    () => filterDistrictsByScope(allDistricts, scopeFilter),
    [
      allDistricts,
      scopeFilter.role,
      scopeFilter.stateId,
      scopeFilter.districtId,
      scopeFilter.isGlobalAdmin,
    ]
  );

  const createCaps = useMemo(
    () => getCreateCapabilities(scopeFilter, auth.scope?.name),
    [
      scopeFilter.role,
      scopeFilter.stateId,
      scopeFilter.districtId,
      scopeFilter.isGlobalAdmin,
      auth.scope?.name,
    ]
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | ZoneStatus>("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | ZoneType>("ALL");
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredZones = useMemo(() => {
    const q = search.trim().toLowerCase();
    return zones.filter((zone) => {
      const matchesSearch =
        !q ||
        zone.zoneId.toLowerCase().includes(q) ||
        zone.zoneName.toLowerCase().includes(q) ||
        zone.stateName.toLowerCase().includes(q) ||
        (zone.districtName?.toLowerCase().includes(q) ?? false);
      const matchesStatus =
        statusFilter === "ALL" || zone.status === statusFilter;
      const matchesType = typeFilter === "ALL" || zone.zoneType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [zones, search, statusFilter, typeFilter]);

  const summary = useMemo(
    () => ({
      total: zones.length,
      active: zones.filter((z) => z.status === "ACTIVE").length,
      inactive: zones.filter((z) => z.status === "INACTIVE").length,
      blocked: zones.filter((z) => z.status === "BLOCKED").length,
      clusters: zones.reduce((t, z) => t + z.clusterCount, 0),
      vendors: zones.reduce((t, z) => t + z.vendorCount, 0),
      captains: zones.reduce((t, z) => t + z.captainCount, 0),
      customers: zones.reduce((t, z) => t + z.customerCount, 0),
      orders: zones.reduce((t, z) => t + z.orderCount, 0),
    }),
    [zones]
  );

  const stateOptions = useMemo(
    () =>
      states.map((s) => ({
        id: s.stateId,
        name: s.stateName,
        code: s.code,
      })),
    [states]
  );

  const districtOptions = useMemo(
    () =>
      districts.map((d) => ({
        id: d.districtId,
        name: d.districtName,
        code: d.code,
        stateId: d.stateId,
      })),
    [districts]
  );

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setTypeFilter("ALL");
  }

  async function handleStatusChange(status: ZoneStatus) {
    if (!selectedZone) return;
    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    setStatusSaving(true);
    try {
      await updateDocument(FIRESTORE_COLLECTIONS.ZONES, selectedZone.zoneId, {
        status,
      });
      setSelectedZone({ ...selectedZone, status, updatedAt: "Just now" });
      setShowStatusModal(false);
      setSuccessMessage(`Zone "${selectedZone.zoneName}" → ${status}`);
      setTimeout(() => setSuccessMessage(""), 3500);
      await refresh();
    } catch (err) {
      setSuccessMessage(
        err instanceof Error
          ? err.message
          : "Failed to update status (check Firestore rules)."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    } finally {
      setStatusSaving(false);
    }
  }

  async function handleCreateZone(data: ZoneCreateData) {
    if (isFirestoreDemoMode) {
      throw new Error("Writes are disabled in demo mode.");
    }
    if (!createCaps.canCreateZone) {
      throw new Error("Your role cannot create zones.");
    }

    if (createCaps.lockedStateId) {
      data.stateId = createCaps.lockedStateId;
      if (createCaps.lockedStateName) data.stateName = createCaps.lockedStateName;
    }
    if (createCaps.lockedDistrictId) {
      data.districtId = createCaps.lockedDistrictId;
      if (createCaps.lockedDistrictName) {
        data.districtName = createCaps.lockedDistrictName;
      }
    }

    setCreateLoading(true);
    try {
      const id = `zone_${data.stateId}_${Date.now()}`.toLowerCase();
      await createDocumentWithId(FIRESTORE_COLLECTIONS.ZONES, id, {
        zoneId: id,
        zoneName: data.zoneName,
        zoneType: data.zoneType,
        status: "ACTIVE",
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId ?? null,
        districtName: data.districtName ?? null,
        pincodes: data.pincodes,
        description: data.description ?? null,
        nodeCount: 0,
        clusterCount: 0,
        vendorCount: 0,
        captainCount: 0,
        customerCount: 0,
        orderCount: 0,
      });
      setShowCreateModal(false);
      setSuccessMessage(`${data.zoneName} created successfully.`);
      setTimeout(() => setSuccessMessage(""), 3500);
      await refresh();
    } finally {
      setCreateLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/hierarchy"
            className="font-medium text-slate-500 hover:text-orange-600"
          >
            Hierarchy
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-800">Zones</span>
          <ScopeBadge />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                ◉
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Hierarchy Zones
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live data from Firestore <code>zones</code> (role-scoped).
                  {demoMode ? " (demo mode — writes disabled)" : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/hierarchy"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                ← Hierarchy
              </Link>
              <button
                type="button"
                onClick={() => void refresh()}
                disabled={loading}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
              {createCaps.canCreateZone && (
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  + Create Zone
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-9">
        <SummaryCard title="Total" value={summary.total} />
        <SummaryCard title="Active" value={summary.active} />
        <SummaryCard title="Inactive" value={summary.inactive} />
        <SummaryCard title="Blocked" value={summary.blocked} />
        <SummaryCard title="Clusters" value={summary.clusters} />
        <SummaryCard title="Vendors" value={summary.vendors} />
        <SummaryCard title="Captains" value={summary.captains} />
        <SummaryCard title="Customers" value={summary.customers} />
        <SummaryCard title="Orders" value={summary.orders} />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search zone name, ID, state or district..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="w-full xl:w-52">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | ZoneStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>
          <div className="w-full xl:w-56">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Zone Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "ALL" | ZoneType)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Types</option>
              <option value="STATE_ZONE">State</option>
              <option value="DISTRICT_ZONE">District</option>
              <option value="OPERATIONAL_ZONE">Operational</option>
              <option value="SERVICE_ZONE">Service</option>
            </select>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
          >
            Clear
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredZones.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{zones.length}</span>{" "}
          zones in your scope
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Zone Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Zone",
                  "Type",
                  "Scope",
                  "Status",
                  "Clusters",
                  "Vendors",
                  "Captains",
                  "Customers",
                  "Orders",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filteredZones.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading zones…
                  </td>
                </tr>
              ) : (
                filteredZones.map((zone) => (
                  <tr key={zone.zoneId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {zone.zoneName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {zone.zoneId}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
                          zone.zoneType
                        )}`}
                      >
                        {getTypeLabel(zone.zoneType)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {zone.stateName}
                      </p>
                      {zone.districtName && (
                        <p className="mt-1 text-xs text-slate-400">
                          {zone.districtName}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          zone.status
                        )}`}
                      >
                        {zone.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(zone.clusterCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(zone.vendorCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(zone.captainCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(zone.customerCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(zone.orderCount)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedZone(zone);
                            setShowDetails(true);
                          }}
                          className="text-sm font-semibold text-orange-600"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedZone(zone);
                            setShowStatusModal(true);
                          }}
                          className="text-sm font-semibold text-slate-600"
                        >
                          Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filteredZones.length === 0 && (
          <div className="px-5 py-14 text-center text-sm text-slate-500">
            No zones in your scope.
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">Zone Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          Zones are filtered by your state/district claims. Create is limited by
          role.
        </p>
      </div>

      {showDetails && selectedZone && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{selectedZone.zoneName}</h2>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedZone.zoneId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="text-2xl text-slate-400"
              >
                ×
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <InfoItem label="Type" value={getTypeLabel(selectedZone.zoneType)} />
              <InfoItem label="Status" value={selectedZone.status} />
              <InfoItem label="State" value={selectedZone.stateName} />
              <InfoItem
                label="District"
                value={selectedZone.districtName || "—"}
              />
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDetails(false);
                  setShowStatusModal(true);
                }}
                className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Manage Status
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedZone && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Manage Zone Status</h2>
            <p className="mt-1 text-sm text-slate-500">{selectedZone.zoneName}</p>
            <div className="mt-6 space-y-3">
              {(["ACTIVE", "INACTIVE", "BLOCKED"] as ZoneStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={statusSaving}
                  onClick={() => void handleStatusChange(st)}
                  className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
                    selectedZone.status === st
                      ? "border-orange-300 bg-orange-50"
                      : "border-slate-200"
                  }`}
                >
                  {statusSaving ? "Saving…" : st}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              disabled={statusSaving}
              className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {createCaps.canCreateZone && (
        <ZoneCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateZone}
          states={stateOptions}
          districts={districtOptions}
          loading={createLoading}
        />
      )}
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}