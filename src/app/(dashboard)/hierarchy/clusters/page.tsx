// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type ClusterStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED";

// type ClusterType =
//   | "STATE_CLUSTER"
//   | "DISTRICT_CLUSTER"
//   | "PINCODE_CLUSTER"
//   | "OPERATIONAL_CLUSTER";

// type Cluster = {
//   clusterId: string;
//   clusterName: string;
//   clusterType: ClusterType;
//   status: ClusterStatus;
//   stateId: string;
//   stateName: string;
//   districtId?: string;
//   districtName?: string;
//   pincodes: string[];
//   description: string;
//   nodeCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
//   createdAt: string;
//   updatedAt: string;
// };

// const INITIAL_CLUSTERS: Cluster[] = [
//   {
//     clusterId: "CLUSTER-AP-001",
//     clusterName: "Andhra Pradesh Central",
//     clusterType: "STATE_CLUSTER",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: [
//       "522001",
//       "522002",
//       "522003",
//       "522004",
//     ],
//     description:
//       "Central operational cluster covering selected administrative areas in Andhra Pradesh.",
//     nodeCount: 8,
//     vendorCount: 56,
//     captainCount: 104,
//     customerCount: 8420,
//     orderCount: 14680,
//     createdAt: "05 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     clusterId: "CLUSTER-AP-002",
//     clusterName: "Guntur District Cluster",
//     clusterType: "DISTRICT_CLUSTER",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: [
//       "522001",
//       "522002",
//       "522003",
//     ],
//     description:
//       "District-level cluster for Guntur operational administration.",
//     nodeCount: 6,
//     vendorCount: 42,
//     captainCount: 78,
//     customerCount: 6240,
//     orderCount: 11480,
//     createdAt: "10 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     clusterId: "CLUSTER-AP-003",
//     clusterName: "Kurnool District Cluster",
//     clusterType: "DISTRICT_CLUSTER",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-KNL",
//     districtName: "Kurnool",
//     pincodes: [
//       "518001",
//       "518002",
//       "518003",
//     ],
//     description:
//       "District-level cluster for Kurnool operational administration.",
//     nodeCount: 5,
//     vendorCount: 31,
//     captainCount: 61,
//     customerCount: 4810,
//     orderCount: 8360,
//     createdAt: "12 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     clusterId: "CLUSTER-AP-004",
//     clusterName: "Vijayawada Operations",
//     clusterType: "OPERATIONAL_CLUSTER",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VJA",
//     districtName: "NTR",
//     pincodes: [
//       "520001",
//       "520002",
//       "520003",
//       "520004",
//     ],
//     description:
//       "Operational cluster for service and order monitoring around Vijayawada.",
//     nodeCount: 8,
//     vendorCount: 38,
//     captainCount: 74,
//     customerCount: 5290,
//     orderCount: 9040,
//     createdAt: "15 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     clusterId: "CLUSTER-AP-005",
//     clusterName: "Visakhapatnam Coastal",
//     clusterType: "DISTRICT_CLUSTER",
//     status: "ACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VSP",
//     districtName: "Visakhapatnam",
//     pincodes: [
//       "530001",
//       "530002",
//       "530003",
//     ],
//     description:
//       "District cluster for Visakhapatnam operational scope.",
//     nodeCount: 9,
//     vendorCount: 17,
//     captainCount: 33,
//     customerCount: 2110,
//     orderCount: 3700,
//     createdAt: "18 Jan 2026",
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     clusterId: "CLUSTER-AP-006",
//     clusterName: "Guntur Pincode Cluster",
//     clusterType: "PINCODE_CLUSTER",
//     status: "INACTIVE",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     pincodes: [
//       "522001",
//       "522002",
//     ],
//     description:
//       "Pincode-level operational grouping for localized administration.",
//     nodeCount: 2,
//     vendorCount: 12,
//     captainCount: 21,
//     customerCount: 1480,
//     orderCount: 2610,
//     createdAt: "22 Jan 2026",
//     updatedAt: "01 Oct 2026",
//   },
// ];

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ClusterStatus) {
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

// function getTypeClasses(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "bg-blue-100 text-blue-700";

//     case "DISTRICT_CLUSTER":
//       return "bg-orange-100 text-orange-700";

//     case "PINCODE_CLUSTER":
//       return "bg-green-100 text-green-700";

//     case "OPERATIONAL_CLUSTER":
//       return "bg-purple-100 text-purple-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "State";

//     case "DISTRICT_CLUSTER":
//       return "District";

//     case "PINCODE_CLUSTER":
//       return "Pincode";

//     case "OPERATIONAL_CLUSTER":
//       return "Operational";

//     default:
//       return type;
//   }
// }

// export default function ClustersPage() {
//   const [clusters, setClusters] =
//     useState<Cluster[]>(INITIAL_CLUSTERS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | ClusterStatus>("ALL");

//   const [typeFilter, setTypeFilter] =
//     useState<"ALL" | ClusterType>("ALL");

//   const [selectedCluster, setSelectedCluster] =
//     useState<Cluster | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredClusters = useMemo(() => {
//     const searchValue =
//       search.trim().toLowerCase();

//     return clusters.filter((cluster) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         cluster.clusterId
//           .toLowerCase()
//           .includes(searchValue) ||
//         cluster.clusterName
//           .toLowerCase()
//           .includes(searchValue) ||
//         cluster.stateName
//           .toLowerCase()
//           .includes(searchValue) ||
//         cluster.districtName
//           ?.toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         cluster.status === statusFilter;

//       const matchesType =
//         typeFilter === "ALL" ||
//         cluster.clusterType === typeFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesType
//       );
//     });
//   }, [
//     clusters,
//     search,
//     statusFilter,
//     typeFilter,
//   ]);

//   const summary = useMemo(() => {
//     return {
//       total: clusters.length,

//       active: clusters.filter(
//         (cluster) =>
//           cluster.status === "ACTIVE"
//       ).length,

//       inactive: clusters.filter(
//         (cluster) =>
//           cluster.status === "INACTIVE"
//       ).length,

//       blocked: clusters.filter(
//         (cluster) =>
//           cluster.status === "BLOCKED"
//       ).length,

//       vendors: clusters.reduce(
//         (total, cluster) =>
//           total + cluster.vendorCount,
//         0
//       ),

//       captains: clusters.reduce(
//         (total, cluster) =>
//           total + cluster.captainCount,
//         0
//       ),

//       customers: clusters.reduce(
//         (total, cluster) =>
//           total + cluster.customerCount,
//         0
//       ),

//       orders: clusters.reduce(
//         (total, cluster) =>
//           total + cluster.orderCount,
//         0
//       ),
//     };
//   }, [clusters]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowDetails(true);
//   }

//   function openStatusModal(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(
//     status: ClusterStatus
//   ) {
//     if (!selectedCluster) {
//       return;
//     }

//     setClusters((currentClusters) =>
//       currentClusters.map((cluster) =>
//         cluster.clusterId ===
//         selectedCluster.clusterId
//           ? {
//               ...cluster,
//               status,
//               updatedAt: "05 Oct 2026",
//             }
//           : cluster
//       )
//     );

//     setSelectedCluster((current) =>
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
//       `Cluster status changed to ${status}. This is currently a UI-only action.`
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

//           <span className="text-slate-400">
//             /
//           </span>

//           <span className="font-semibold text-slate-800">
//             Clusters
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                   ◈
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Hierarchy Clusters
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Manage grouped administrative and
//                     operational hierarchy scopes.
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
//                 + Create Cluster
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

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">

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
//               placeholder="Search cluster name, ID, state or district..."
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
//                     | ClusterStatus
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
//               Cluster Type
//             </label>

//             <select
//               value={typeFilter}
//               onChange={(event) =>
//                 setTypeFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ClusterType
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Types
//               </option>

//               <option value="STATE_CLUSTER">
//                 State
//               </option>

//               <option value="DISTRICT_CLUSTER">
//                 District
//               </option>

//               <option value="PINCODE_CLUSTER">
//                 Pincode
//               </option>

//               <option value="OPERATIONAL_CLUSTER">
//                 Operational
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
//             {filteredClusters.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">
//             {clusters.length}
//           </span>{" "}
//           clusters
//         </div>

//       </div>

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Cluster Directory
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative cluster visibility and
//             operational scope.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Cluster
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

//               {filteredClusters.map((cluster) => (
//                 <tr
//                   key={cluster.clusterId}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {cluster.clusterName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {cluster.clusterId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                         cluster.clusterType
//                       )}`}
//                     >
//                       {getTypeLabel(
//                         cluster.clusterType
//                       )}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-medium text-slate-700">
//                       {cluster.stateName}
//                     </p>

//                     {cluster.districtName && (
//                       <p className="mt-1 text-xs text-slate-400">
//                         {cluster.districtName}
//                       </p>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         cluster.status
//                       )}`}
//                     >
//                       {cluster.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(
//                       cluster.vendorCount
//                     )}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(
//                       cluster.captainCount
//                     )}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(
//                       cluster.customerCount
//                     )}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(
//                       cluster.orderCount
//                     )}
//                   </td>

//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-3">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(cluster)
//                         }
//                         className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         View
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openStatusModal(cluster)
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

//         {filteredClusters.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="space-y-4 md:hidden">

//         {filteredClusters.map((cluster) => (
//           <div
//             key={cluster.clusterId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   {cluster.clusterName}
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {cluster.clusterId}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   cluster.status
//                 )}`}
//               >
//                 {cluster.status}
//               </span>

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   cluster.clusterType
//                 )}`}
//               >
//                 {getTypeLabel(
//                   cluster.clusterType
//                 )}
//               </span>

//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {cluster.stateName}
//               </span>

//               {cluster.districtName && (
//                 <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                   {cluster.districtName}
//                 </span>
//               )}

//             </div>

//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {cluster.description}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileStat
//                 label="Vendors"
//                 value={cluster.vendorCount}
//               />

//               <MobileStat
//                 label="Captains"
//                 value={cluster.captainCount}
//               />

//               <MobileStat
//                 label="Customers"
//                 value={cluster.customerCount}
//               />

//               <MobileStat
//                 label="Orders"
//                 value={cluster.orderCount}
//               />

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   openDetails(cluster)
//                 }
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 View Details
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   openStatusModal(cluster)
//                 }
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Manage Status
//               </button>

//             </div>

//           </div>
//         ))}

//         {filteredClusters.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           Cluster Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Clusters are administrative or operational
//           groupings used for hierarchy visibility and
//           management. Cluster membership, authorization,
//           state/district/pincode scope and protected
//           business operations must be validated by the
//           trusted backend and JUERP governance layer.
//           Financial rules such as commission, settlement,
//           pricing and payout calculations must not be
//           implemented in this page.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="State Scope"
//             description="Groups entities under a state administrative scope."
//           />

//           <GovernanceCard
//             title="District Scope"
//             description="Groups entities under a district administrative scope."
//           />

//           <GovernanceCard
//             title="Pincode Scope"
//             description="Provides localized operational grouping."
//           />

//           <GovernanceCard
//             title="Operational Scope"
//             description="Supports operational monitoring without changing business authority."
//           />

//         </div>

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedCluster && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">

//               <div>

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedCluster.clusterName}
//                   </h2>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedCluster.status
//                     )}`}
//                   >
//                     {selectedCluster.status}
//                   </span>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedCluster.clusterId}
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

//               {/* BASIC */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Cluster Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Cluster ID"
//                     value={
//                       selectedCluster.clusterId
//                     }
//                   />

//                   <InfoItem
//                     label="Cluster Type"
//                     value={getTypeLabel(
//                       selectedCluster.clusterType
//                     )}
//                   />

//                   <InfoItem
//                     label="State"
//                     value={
//                       selectedCluster.stateName
//                     }
//                   />

//                   <InfoItem
//                     label="District"
//                     value={
//                       selectedCluster.districtName ||
//                       "-"
//                     }
//                   />

//                   <InfoItem
//                     label="Created At"
//                     value={
//                       selectedCluster.createdAt
//                     }
//                   />

//                   <InfoItem
//                     label="Updated At"
//                     value={
//                       selectedCluster.updatedAt
//                     }
//                   />

//                 </div>

//               </div>

//               {/* DESCRIPTION */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Description
//                 </h3>

//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedCluster.description}
//                 </p>

//               </div>

//               {/* PINCODES */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>

//                 <div className="mt-3 flex flex-wrap gap-2">

//                   {selectedCluster.pincodes.map(
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

//               {/* COUNTS */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Operational Scope
//                 </h3>

//                 <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

//                   <DetailStat
//                     title="Vendors"
//                     value={
//                       selectedCluster.vendorCount
//                     }
//                   />

//                   <DetailStat
//                     title="Captains"
//                     value={
//                       selectedCluster.captainCount
//                     }
//                   />

//                   <DetailStat
//                     title="Customers"
//                     value={
//                       selectedCluster.customerCount
//                     }
//                   />

//                   <DetailStat
//                     title="Orders"
//                     value={
//                       selectedCluster.orderCount
//                     }
//                   />

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

//       {showStatusModal && selectedCluster && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Cluster Status
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedCluster.clusterName}
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
//                 description="Cluster is operational."
//                 active={
//                   selectedCluster.status ===
//                   "ACTIVE"
//                 }
//                 onClick={() =>
//                   handleStatusChange("ACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Inactive"
//                 description="Cluster is temporarily inactive."
//                 active={
//                   selectedCluster.status ===
//                   "INACTIVE"
//                 }
//                 onClick={() =>
//                   handleStatusChange("INACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Blocked"
//                 description="Cluster access is blocked."
//                 active={
//                   selectedCluster.status ===
//                   "BLOCKED"
//                 }
//                 onClick={() =>
//                   handleStatusChange("BLOCKED")
//                 }
//               />

//             </div>

//             <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-700">
//               This status action currently updates
//               local UI state only. In production it must
//               be authorized and persisted through the
//               trusted backend/JUERP governance layer.
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
//         ◈
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No clusters found
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
//   useClusters,
//   type Cluster,
//   type ClusterStatus,
//   type ClusterType,
// } from "@/hooks/useHierarchy";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ClusterStatus) {
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

// function getTypeClasses(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_CLUSTER":
//       return "bg-orange-100 text-orange-700";
//     case "PINCODE_CLUSTER":
//       return "bg-green-100 text-green-700";
//     case "OPERATIONAL_CLUSTER":
//       return "bg-purple-100 text-purple-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "State";
//     case "DISTRICT_CLUSTER":
//       return "District";
//     case "PINCODE_CLUSTER":
//       return "Pincode";
//     case "OPERATIONAL_CLUSTER":
//       return "Operational";
//     default:
//       return String(type);
//   }
// }

// export default function ClustersPage() {
//   const { clusters, loading, error, demoMode, refresh } = useClusters();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ClusterStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ClusterType>("ALL");
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredClusters = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return clusters.filter((cluster) => {
//       const matchesSearch =
//         !q ||
//         cluster.clusterId.toLowerCase().includes(q) ||
//         cluster.clusterName.toLowerCase().includes(q) ||
//         cluster.stateName.toLowerCase().includes(q) ||
//         (cluster.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || cluster.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || cluster.clusterType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [clusters, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: clusters.length,
//       active: clusters.filter((c) => c.status === "ACTIVE").length,
//       inactive: clusters.filter((c) => c.status === "INACTIVE").length,
//       blocked: clusters.filter((c) => c.status === "BLOCKED").length,
//       vendors: clusters.reduce((t, c) => t + c.vendorCount, 0),
//       captains: clusters.reduce((t, c) => t + c.captainCount, 0),
//       customers: clusters.reduce((t, c) => t + c.customerCount, 0),
//       orders: clusters.reduce((t, c) => t + c.orderCount, 0),
//     }),
//     [clusters]
//   );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setTypeFilter("ALL");
//   }

//   function openDetails(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowDetails(true);
//   }

//   function openStatusModal(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(status: ClusterStatus) {
//     if (!selectedCluster) return;
//     setSelectedCluster({
//       ...selectedCluster,
//       status,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `Cluster status → ${status}. Local UI only — persist via authorized backend.`
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
//           <span className="font-semibold text-slate-800">Clusters</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◈
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Clusters
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>clusters</code> collection.
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
//                 + Create Cluster
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

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
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
//               placeholder="Search cluster name, ID, state or district..."
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
//                 setStatusFilter(e.target.value as "ALL" | ClusterStatus)
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
//               Cluster Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ClusterType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_CLUSTER">State</option>
//               <option value="DISTRICT_CLUSTER">District</option>
//               <option value="PINCODE_CLUSTER">Pincode</option>
//               <option value="OPERATIONAL_CLUSTER">Operational</option>
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
//             {filteredClusters.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{clusters.length}</span>{" "}
//           clusters
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Cluster Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative cluster visibility and operational scope.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Cluster",
//                   "Type",
//                   "Scope",
//                   "Status",
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
//               {loading && filteredClusters.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading clusters…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClusters.map((cluster) => (
//                   <tr key={cluster.clusterId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {cluster.clusterName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {cluster.clusterId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           cluster.clusterType
//                         )}`}
//                       >
//                         {getTypeLabel(cluster.clusterType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {cluster.stateName}
//                       </p>
//                       {cluster.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {cluster.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           cluster.status
//                         )}`}
//                       >
//                         {cluster.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(cluster)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(cluster)}
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
//         {!loading && filteredClusters.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredClusters.map((cluster) => (
//           <div
//             key={cluster.clusterId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {cluster.clusterName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {cluster.clusterId}
//                 </p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   cluster.status
//                 )}`}
//               >
//                 {cluster.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   cluster.clusterType
//                 )}`}
//               >
//                 {getTypeLabel(cluster.clusterType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {cluster.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {cluster.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Vendors" value={cluster.vendorCount} />
//               <MobileStat label="Captains" value={cluster.captainCount} />
//               <MobileStat label="Customers" value={cluster.customerCount} />
//               <MobileStat label="Orders" value={cluster.orderCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(cluster)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(cluster)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredClusters.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Cluster Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Clusters load from Firestore. Status changes are local UI only until
//           authorized backend writes exist. Do not implement pricing, commission,
//           or settlement logic on this page.
//         </p>
//       </div>

//       {showDetails && selectedCluster && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedCluster.clusterName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedCluster.status
//                     )}`}
//                   >
//                     {selectedCluster.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedCluster.clusterId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Cluster ID" value={selectedCluster.clusterId} />
//                 <InfoItem
//                   label="Cluster Type"
//                   value={getTypeLabel(selectedCluster.clusterType)}
//                 />
//                 <InfoItem label="State" value={selectedCluster.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedCluster.districtName || "—"}
//                 />
//                 <InfoItem label="Created At" value={selectedCluster.createdAt} />
//                 <InfoItem label="Updated At" value={selectedCluster.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedCluster.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedCluster.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedCluster.pincodes.map((p) => (
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
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//                 <DetailStat title="Vendors" value={selectedCluster.vendorCount} />
//                 <DetailStat
//                   title="Captains"
//                   value={selectedCluster.captainCount}
//                 />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedCluster.customerCount}
//                 />
//                 <DetailStat title="Orders" value={selectedCluster.orderCount} />
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

//       {showStatusModal && selectedCluster && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Cluster Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedCluster.clusterName}
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
//                 description="Cluster is operational."
//                 active={selectedCluster.status === "ACTIVE"}
//                 onClick={() => handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Cluster is temporarily inactive."
//                 active={selectedCluster.status === "INACTIVE"}
//                 onClick={() => handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Cluster access is blocked."
//                 active={selectedCluster.status === "BLOCKED"}
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
//         ◈
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No clusters found</p>
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
//   useClusters,
//   useStates,
//   useDistricts,
//   type Cluster,
//   type ClusterStatus,
//   type ClusterType,
// } from "@/hooks/useHierarchy";
// import ClusterCreateModal, {
//   type ClusterCreateData,
// } from "@/components/hierarchy/ClusterCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ClusterStatus) {
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

// function getTypeClasses(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_CLUSTER":
//       return "bg-orange-100 text-orange-700";
//     case "PINCODE_CLUSTER":
//       return "bg-green-100 text-green-700";
//     case "OPERATIONAL_CLUSTER":
//       return "bg-purple-100 text-purple-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "State";
//     case "DISTRICT_CLUSTER":
//       return "District";
//     case "PINCODE_CLUSTER":
//       return "Pincode";
//     case "OPERATIONAL_CLUSTER":
//       return "Operational";
//     default:
//       return String(type);
//   }
// }

// export default function ClustersPage() {
//   const { clusters, loading, error, demoMode, refresh } = useClusters();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ClusterStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ClusterType>("ALL");
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredClusters = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return clusters.filter((cluster) => {
//       const matchesSearch =
//         !q ||
//         cluster.clusterId.toLowerCase().includes(q) ||
//         cluster.clusterName.toLowerCase().includes(q) ||
//         cluster.stateName.toLowerCase().includes(q) ||
//         (cluster.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || cluster.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || cluster.clusterType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [clusters, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: clusters.length,
//       active: clusters.filter((c) => c.status === "ACTIVE").length,
//       inactive: clusters.filter((c) => c.status === "INACTIVE").length,
//       blocked: clusters.filter((c) => c.status === "BLOCKED").length,
//       vendors: clusters.reduce((t, c) => t + c.vendorCount, 0),
//       captains: clusters.reduce((t, c) => t + c.captainCount, 0),
//       customers: clusters.reduce((t, c) => t + c.customerCount, 0),
//       orders: clusters.reduce((t, c) => t + c.orderCount, 0),
//     }),
//     [clusters]
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

//   function openDetails(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowDetails(true);
//   }

//   function openStatusModal(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowStatusModal(true);
//   }

//   function handleStatusChange(status: ClusterStatus) {
//     if (!selectedCluster) return;
//     setSelectedCluster({
//       ...selectedCluster,
//       status,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `Cluster status → ${status}. Local UI only — persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 3500);
//   }

//   async function handleCreateCluster(data: ClusterCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       const id = `cluster_${data.stateId}_${Date.now()}`.toLowerCase();

//       await createDocumentWithId(FIRESTORE_COLLECTIONS.CLUSTERS, id, {
//         clusterId: id,
//         clusterName: data.clusterName,
//         clusterType: data.clusterType,
//         status: "ACTIVE",
//         stateId: data.stateId,
//         stateName: data.stateName,
//         districtId: data.districtId ?? null,
//         districtName: data.districtName ?? null,
//         pincodes: data.pincodes,
//         description: data.description ?? null,
//         nodeCount: 0,
//         vendorCount: 0,
//         captainCount: 0,
//         customerCount: 0,
//         orderCount: 0,
//       });

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.clusterName} created successfully.`);
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
//           <span className="font-semibold text-slate-800">Clusters</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◈
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Clusters
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>clusters</code> collection.
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
//                 + Create Cluster
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

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
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
//               placeholder="Search cluster name, ID, state or district..."
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
//                 setStatusFilter(e.target.value as "ALL" | ClusterStatus)
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
//               Cluster Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ClusterType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_CLUSTER">State</option>
//               <option value="DISTRICT_CLUSTER">District</option>
//               <option value="PINCODE_CLUSTER">Pincode</option>
//               <option value="OPERATIONAL_CLUSTER">Operational</option>
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
//             {filteredClusters.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{clusters.length}</span>{" "}
//           clusters
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Cluster Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative cluster visibility and operational scope.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Cluster",
//                   "Type",
//                   "Scope",
//                   "Status",
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
//               {loading && filteredClusters.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading clusters…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClusters.map((cluster) => (
//                   <tr key={cluster.clusterId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {cluster.clusterName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {cluster.clusterId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           cluster.clusterType
//                         )}`}
//                       >
//                         {getTypeLabel(cluster.clusterType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {cluster.stateName}
//                       </p>
//                       {cluster.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {cluster.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           cluster.status
//                         )}`}
//                       >
//                         {cluster.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(cluster)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(cluster)}
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
//         {!loading && filteredClusters.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredClusters.map((cluster) => (
//           <div
//             key={cluster.clusterId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {cluster.clusterName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {cluster.clusterId}
//                 </p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   cluster.status
//                 )}`}
//               >
//                 {cluster.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   cluster.clusterType
//                 )}`}
//               >
//                 {getTypeLabel(cluster.clusterType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {cluster.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {cluster.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Vendors" value={cluster.vendorCount} />
//               <MobileStat label="Captains" value={cluster.captainCount} />
//               <MobileStat label="Customers" value={cluster.customerCount} />
//               <MobileStat label="Orders" value={cluster.orderCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(cluster)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(cluster)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredClusters.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Cluster Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Clusters load from Firestore. Status changes are local UI only until
//           authorized backend writes exist. Do not implement pricing, commission,
//           or settlement logic on this page.
//         </p>
//       </div>

//       {/* Details Modal */}
//       {showDetails && selectedCluster && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedCluster.clusterName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedCluster.status
//                     )}`}
//                   >
//                     {selectedCluster.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedCluster.clusterId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Cluster ID" value={selectedCluster.clusterId} />
//                 <InfoItem
//                   label="Cluster Type"
//                   value={getTypeLabel(selectedCluster.clusterType)}
//                 />
//                 <InfoItem label="State" value={selectedCluster.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedCluster.districtName || "—"}
//                 />
//                 <InfoItem label="Created At" value={selectedCluster.createdAt} />
//                 <InfoItem label="Updated At" value={selectedCluster.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedCluster.description}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedCluster.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedCluster.pincodes.map((p) => (
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
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//                 <DetailStat title="Vendors" value={selectedCluster.vendorCount} />
//                 <DetailStat
//                   title="Captains"
//                   value={selectedCluster.captainCount}
//                 />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedCluster.customerCount}
//                 />
//                 <DetailStat title="Orders" value={selectedCluster.orderCount} />
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
//       {showStatusModal && selectedCluster && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Cluster Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedCluster.clusterName}
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
//                 description="Cluster is operational."
//                 active={selectedCluster.status === "ACTIVE"}
//                 onClick={() => handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Cluster is temporarily inactive."
//                 active={selectedCluster.status === "INACTIVE"}
//                 onClick={() => handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Cluster access is blocked."
//                 active={selectedCluster.status === "BLOCKED"}
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

//       {/* Create Cluster Modal */}
//       <ClusterCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateCluster}
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
//         ◈
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No clusters found</p>
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
//   useClusters,
//   useStates,
//   useDistricts,
//   type Cluster,
//   type ClusterStatus,
//   type ClusterType,
// } from "@/hooks/useHierarchy";
// import ClusterCreateModal, {
//   type ClusterCreateData,
// } from "@/components/hierarchy/ClusterCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: ClusterStatus) {
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

// function getTypeClasses(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_CLUSTER":
//       return "bg-orange-100 text-orange-700";
//     case "PINCODE_CLUSTER":
//       return "bg-green-100 text-green-700";
//     case "OPERATIONAL_CLUSTER":
//       return "bg-purple-100 text-purple-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getTypeLabel(type: ClusterType) {
//   switch (type) {
//     case "STATE_CLUSTER":
//       return "State";
//     case "DISTRICT_CLUSTER":
//       return "District";
//     case "PINCODE_CLUSTER":
//       return "Pincode";
//     case "OPERATIONAL_CLUSTER":
//       return "Operational";
//     default:
//       return String(type);
//   }
// }

// export default function ClustersPage() {
//   const { clusters, loading, error, demoMode, refresh } = useClusters();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | ClusterStatus>("ALL");
//   const [typeFilter, setTypeFilter] = useState<"ALL" | ClusterType>("ALL");
//   const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [statusSaving, setStatusSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredClusters = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return clusters.filter((cluster) => {
//       const matchesSearch =
//         !q ||
//         cluster.clusterId.toLowerCase().includes(q) ||
//         cluster.clusterName.toLowerCase().includes(q) ||
//         cluster.stateName.toLowerCase().includes(q) ||
//         (cluster.districtName?.toLowerCase().includes(q) ?? false);
//       const matchesStatus =
//         statusFilter === "ALL" || cluster.status === statusFilter;
//       const matchesType =
//         typeFilter === "ALL" || cluster.clusterType === typeFilter;
//       return matchesSearch && matchesStatus && matchesType;
//     });
//   }, [clusters, search, statusFilter, typeFilter]);

//   const summary = useMemo(
//     () => ({
//       total: clusters.length,
//       active: clusters.filter((c) => c.status === "ACTIVE").length,
//       inactive: clusters.filter((c) => c.status === "INACTIVE").length,
//       blocked: clusters.filter((c) => c.status === "BLOCKED").length,
//       vendors: clusters.reduce((t, c) => t + c.vendorCount, 0),
//       captains: clusters.reduce((t, c) => t + c.captainCount, 0),
//       customers: clusters.reduce((t, c) => t + c.customerCount, 0),
//       orders: clusters.reduce((t, c) => t + c.orderCount, 0),
//     }),
//     [clusters]
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

//   function openDetails(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowDetails(true);
//   }

//   function openStatusModal(cluster: Cluster) {
//     setSelectedCluster(cluster);
//     setShowStatusModal(true);
//   }

//   async function handleStatusChange(status: ClusterStatus) {
//     if (!selectedCluster) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       await updateDocument(
//         FIRESTORE_COLLECTIONS.CLUSTERS,
//         selectedCluster.clusterId,
//         { status }
//       );

//       setSelectedCluster({
//         ...selectedCluster,
//         status,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `Cluster "${selectedCluster.clusterName}" → ${status}`
//       );
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

//   async function handleCreateCluster(data: ClusterCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       const id = `cluster_${data.stateId}_${Date.now()}`.toLowerCase();

//       await createDocumentWithId(FIRESTORE_COLLECTIONS.CLUSTERS, id, {
//         clusterId: id,
//         clusterName: data.clusterName,
//         clusterType: data.clusterType,
//         status: "ACTIVE",
//         stateId: data.stateId,
//         stateName: data.stateName,
//         districtId: data.districtId ?? null,
//         districtName: data.districtName ?? null,
//         pincodes: data.pincodes,
//         description: data.description ?? null,
//         nodeCount: 0,
//         vendorCount: 0,
//         captainCount: 0,
//         customerCount: 0,
//         orderCount: 0,
//       });

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.clusterName} created successfully.`);
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
//           <span className="font-semibold text-slate-800">Clusters</span>
//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◈
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Clusters
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>clusters</code>.
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
//                 + Create Cluster
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

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
//         <SummaryCard title="Total" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
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
//               placeholder="Search cluster name, ID, state or district..."
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
//                 setStatusFilter(e.target.value as "ALL" | ClusterStatus)
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
//               Cluster Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) =>
//                 setTypeFilter(e.target.value as "ALL" | ClusterType)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="STATE_CLUSTER">State</option>
//               <option value="DISTRICT_CLUSTER">District</option>
//               <option value="PINCODE_CLUSTER">Pincode</option>
//               <option value="OPERATIONAL_CLUSTER">Operational</option>
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
//             {filteredClusters.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{clusters.length}</span>{" "}
//           clusters
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Cluster Directory</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Administrative cluster visibility and operational scope.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Cluster",
//                   "Type",
//                   "Scope",
//                   "Status",
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
//               {loading && filteredClusters.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={9}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading clusters…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredClusters.map((cluster) => (
//                   <tr key={cluster.clusterId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {cluster.clusterName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {cluster.clusterId}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           cluster.clusterType
//                         )}`}
//                       >
//                         {getTypeLabel(cluster.clusterType)}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-medium text-slate-700">
//                         {cluster.stateName}
//                       </p>
//                       {cluster.districtName && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {cluster.districtName}
//                         </p>
//                       )}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           cluster.status
//                         )}`}
//                       >
//                         {cluster.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(cluster.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(cluster)}
//                           className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(cluster)}
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
//         {!loading && filteredClusters.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredClusters.map((cluster) => (
//           <div
//             key={cluster.clusterId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   {cluster.clusterName}
//                 </h3>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {cluster.clusterId}
//                 </p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   cluster.status
//                 )}`}
//               >
//                 {cluster.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   cluster.clusterType
//                 )}`}
//               >
//                 {getTypeLabel(cluster.clusterType)}
//               </span>
//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
//                 {cluster.stateName}
//               </span>
//             </div>
//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {cluster.description}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <MobileStat label="Vendors" value={cluster.vendorCount} />
//               <MobileStat label="Captains" value={cluster.captainCount} />
//               <MobileStat label="Customers" value={cluster.customerCount} />
//               <MobileStat label="Orders" value={cluster.orderCount} />
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(cluster)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(cluster)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredClusters.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Cluster Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Clusters load from Firestore. Status changes are written to the{" "}
//           <code>clusters</code> collection and reflected after refresh. When a
//           parent State/District is set INACTIVE/BLOCKED, clusters under it are
//           cascaded from the hierarchy cascade helper.
//         </p>
//       </div>

//       {showDetails && selectedCluster && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedCluster.clusterName}
//                   </h2>
//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedCluster.status
//                     )}`}
//                   >
//                     {selectedCluster.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedCluster.clusterId}
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem label="Cluster ID" value={selectedCluster.clusterId} />
//                 <InfoItem
//                   label="Cluster Type"
//                   value={getTypeLabel(selectedCluster.clusterType)}
//                 />
//                 <InfoItem label="State" value={selectedCluster.stateName} />
//                 <InfoItem
//                   label="District"
//                   value={selectedCluster.districtName || "—"}
//                 />
//                 <InfoItem label="Created At" value={selectedCluster.createdAt} />
//                 <InfoItem label="Updated At" value={selectedCluster.updatedAt} />
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Description</h3>
//                 <p className="mt-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
//                   {selectedCluster.description || "—"}
//                 </p>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">
//                   Pincode Scope
//                 </h3>
//                 <div className="mt-3 flex flex-wrap gap-2">
//                   {selectedCluster.pincodes.length === 0 ? (
//                     <span className="text-xs text-slate-400">None</span>
//                   ) : (
//                     selectedCluster.pincodes.map((p) => (
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
//               <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//                 <DetailStat title="Vendors" value={selectedCluster.vendorCount} />
//                 <DetailStat
//                   title="Captains"
//                   value={selectedCluster.captainCount}
//                 />
//                 <DetailStat
//                   title="Customers"
//                   value={selectedCluster.customerCount}
//                 />
//                 <DetailStat title="Orders" value={selectedCluster.orderCount} />
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

//       {showStatusModal && selectedCluster && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Cluster Status
//                 </h2>
//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedCluster.clusterName}
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
//                 description="Cluster is operational."
//                 active={selectedCluster.status === "ACTIVE"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("ACTIVE")}
//               />
//               <StatusOption
//                 title="Inactive"
//                 description="Cluster is temporarily inactive."
//                 active={selectedCluster.status === "INACTIVE"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("INACTIVE")}
//               />
//               <StatusOption
//                 title="Blocked"
//                 description="Cluster access is blocked."
//                 active={selectedCluster.status === "BLOCKED"}
//                 disabled={statusSaving}
//                 onClick={() => void handleStatusChange("BLOCKED")}
//               />
//             </div>
//             <p className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
//               Status is written to Firestore collection <code>clusters</code>.
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

//       <ClusterCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateCluster}
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
//         ◈
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No clusters found</p>
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
  useClusters,
  useStates,
  useDistricts,
  type Cluster,
  type ClusterStatus,
  type ClusterType,
} from "@/hooks/useHierarchy";
import useAuthScope from "@/hooks/useAuthScope";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";
import ClusterCreateModal, {
  type ClusterCreateData,
} from "@/components/hierarchy/ClusterCreateModal";
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

function getStatusClasses(status: ClusterStatus) {
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

function getTypeClasses(type: ClusterType) {
  switch (type) {
    case "STATE_CLUSTER":
      return "bg-blue-100 text-blue-700";
    case "DISTRICT_CLUSTER":
      return "bg-orange-100 text-orange-700";
    case "PINCODE_CLUSTER":
      return "bg-green-100 text-green-700";
    case "OPERATIONAL_CLUSTER":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getTypeLabel(type: ClusterType) {
  switch (type) {
    case "STATE_CLUSTER":
      return "State";
    case "DISTRICT_CLUSTER":
      return "District";
    case "PINCODE_CLUSTER":
      return "Pincode";
    case "OPERATIONAL_CLUSTER":
      return "Operational";
    default:
      return String(type);
  }
}

export default function ClustersPage() {
  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = {
    role: auth.role,
    stateId: auth.stateId,
    districtId: auth.districtId,
    isGlobalAdmin: auth.isGlobalAdmin,
  };

  const { clusters: allClusters, loading, error, demoMode, refresh } =
    useClusters();
  const { states: allStates } = useStates();
  const { districts: allDistricts } = useDistricts();

  const clusters = useMemo(
    () => filterByStateAndDistrict(allClusters, scopeFilter),
    [
      allClusters,
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
  const [statusFilter, setStatusFilter] = useState<"ALL" | ClusterStatus>("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | ClusterType>("ALL");
  const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredClusters = useMemo(() => {
    const q = search.trim().toLowerCase();
    return clusters.filter((cluster) => {
      const matchesSearch =
        !q ||
        cluster.clusterId.toLowerCase().includes(q) ||
        cluster.clusterName.toLowerCase().includes(q) ||
        cluster.stateName.toLowerCase().includes(q) ||
        (cluster.districtName?.toLowerCase().includes(q) ?? false);
      const matchesStatus =
        statusFilter === "ALL" || cluster.status === statusFilter;
      const matchesType =
        typeFilter === "ALL" || cluster.clusterType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [clusters, search, statusFilter, typeFilter]);

  const summary = useMemo(
    () => ({
      total: clusters.length,
      active: clusters.filter((c) => c.status === "ACTIVE").length,
      inactive: clusters.filter((c) => c.status === "INACTIVE").length,
      blocked: clusters.filter((c) => c.status === "BLOCKED").length,
      vendors: clusters.reduce((t, c) => t + c.vendorCount, 0),
      captains: clusters.reduce((t, c) => t + c.captainCount, 0),
      customers: clusters.reduce((t, c) => t + c.customerCount, 0),
      orders: clusters.reduce((t, c) => t + c.orderCount, 0),
    }),
    [clusters]
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

  function openDetails(cluster: Cluster) {
    setSelectedCluster(cluster);
    setShowDetails(true);
  }

  function openStatusModal(cluster: Cluster) {
    setSelectedCluster(cluster);
    setShowStatusModal(true);
  }

  async function handleStatusChange(status: ClusterStatus) {
    if (!selectedCluster) return;

    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    setStatusSaving(true);
    try {
      await updateDocument(
        FIRESTORE_COLLECTIONS.CLUSTERS,
        selectedCluster.clusterId,
        { status }
      );

      setSelectedCluster({
        ...selectedCluster,
        status,
        updatedAt: "Just now",
      });
      setShowStatusModal(false);
      setSuccessMessage(
        `Cluster "${selectedCluster.clusterName}" → ${status}`
      );
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

  async function handleCreateCluster(data: ClusterCreateData) {
    if (isFirestoreDemoMode) {
      throw new Error("Writes are disabled in demo mode.");
    }
    if (!createCaps.canCreateCluster) {
      throw new Error("Your role cannot create clusters.");
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
      const id = `cluster_${data.stateId}_${Date.now()}`.toLowerCase();

      await createDocumentWithId(FIRESTORE_COLLECTIONS.CLUSTERS, id, {
        clusterId: id,
        clusterName: data.clusterName,
        clusterType: data.clusterType,
        status: "ACTIVE",
        stateId: data.stateId,
        stateName: data.stateName,
        districtId: data.districtId ?? null,
        districtName: data.districtName ?? null,
        pincodes: data.pincodes,
        description: data.description ?? null,
        nodeCount: 0,
        vendorCount: 0,
        captainCount: 0,
        customerCount: 0,
        orderCount: 0,
      });

      setShowCreateModal(false);
      setSuccessMessage(`${data.clusterName} created successfully.`);
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
          <span className="font-semibold text-slate-800">Clusters</span>
          <ScopeBadge />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                ◈
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Hierarchy Clusters
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live data from Firestore <code>clusters</code> (role-scoped).
                  {demoMode ? " (demo mode — writes disabled)" : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/hierarchy"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
              {createCaps.canCreateCluster && (
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  + Create Cluster
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

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <SummaryCard title="Total" value={summary.total} />
        <SummaryCard title="Active" value={summary.active} />
        <SummaryCard title="Inactive" value={summary.inactive} />
        <SummaryCard title="Blocked" value={summary.blocked} />
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
              placeholder="Search cluster name, ID, state or district..."
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
                setStatusFilter(e.target.value as "ALL" | ClusterStatus)
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
              Cluster Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value as "ALL" | ClusterType)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Types</option>
              <option value="STATE_CLUSTER">State</option>
              <option value="DISTRICT_CLUSTER">District</option>
              <option value="PINCODE_CLUSTER">Pincode</option>
              <option value="OPERATIONAL_CLUSTER">Operational</option>
            </select>
          </div>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
        </div>
        <div className="mt-4 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredClusters.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{clusters.length}</span>{" "}
          clusters in your scope
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Cluster Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Cluster",
                  "Type",
                  "Scope",
                  "Status",
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
              {loading && filteredClusters.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading clusters…
                  </td>
                </tr>
              ) : (
                filteredClusters.map((cluster) => (
                  <tr key={cluster.clusterId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {cluster.clusterName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {cluster.clusterId}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
                          cluster.clusterType
                        )}`}
                      >
                        {getTypeLabel(cluster.clusterType)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {cluster.stateName}
                      </p>
                      {cluster.districtName && (
                        <p className="mt-1 text-xs text-slate-400">
                          {cluster.districtName}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          cluster.status
                        )}`}
                      >
                        {cluster.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {formatNumber(cluster.vendorCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {formatNumber(cluster.captainCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {formatNumber(cluster.customerCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                      {formatNumber(cluster.orderCount)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => openDetails(cluster)}
                          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openStatusModal(cluster)}
                          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
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
        {!loading && filteredClusters.length === 0 && <EmptyState />}
      </div>

      <div className="mt-4 space-y-4 md:hidden">
        {filteredClusters.map((cluster) => (
          <div
            key={cluster.clusterId}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {cluster.clusterName}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {cluster.clusterId}
                </p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  cluster.status
                )}`}
              >
                {cluster.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => openDetails(cluster)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => openStatusModal(cluster)}
                className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
              >
                Manage Status
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">Cluster Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          Clusters are filtered by your state/district claims. Create is hidden
          when your role cannot create clusters.
        </p>
      </div>

      {showDetails && selectedCluster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCluster.clusterName}
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedCluster.clusterId}
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
            <div className="space-y-4 p-5 md:p-6">
              <div className="grid grid-cols-2 gap-4">
                <InfoItem label="Type" value={getTypeLabel(selectedCluster.clusterType)} />
                <InfoItem label="Status" value={selectedCluster.status} />
                <InfoItem label="State" value={selectedCluster.stateName} />
                <InfoItem
                  label="District"
                  value={selectedCluster.districtName || "—"}
                />
              </div>
              <div className="flex justify-end gap-3">
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
        </div>
      )}

      {showStatusModal && selectedCluster && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Manage Cluster Status</h2>
            <p className="mt-1 text-sm text-slate-500">
              {selectedCluster.clusterName}
            </p>
            <div className="mt-6 space-y-3">
              {(["ACTIVE", "INACTIVE", "BLOCKED"] as ClusterStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={statusSaving}
                    onClick={() => void handleStatusChange(st)}
                    className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
                      selectedCluster.status === st
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {statusSaving ? "Saving…" : st}
                  </button>
                )
              )}
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

      {createCaps.canCreateCluster && (
        <ClusterCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateCluster}
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

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <p className="text-sm font-bold text-slate-800">No clusters found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty collection or outside your role scope.
      </p>
    </div>
  );
}