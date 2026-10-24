// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type HierarchyStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

// type HierarchyNode = {
//   id: string;
//   name: string;
//   type: string;
//   status: HierarchyStatus;
//   parent: string;
//   children: number;
//   vendors: number;
//   captains: number;
//   customers: number;
//   orders: number;
//   updatedAt: string;
// };

// const INITIAL_NODES: HierarchyNode[] = [
//   {
//     id: "STATE-AP",
//     name: "Andhra Pradesh",
//     type: "State",
//     status: "ACTIVE",
//     parent: "India",
//     children: 26,
//     vendors: 312,
//     captains: 684,
//     customers: 48250,
//     orders: 86540,
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     id: "DIST-GNT",
//     name: "Guntur",
//     type: "District",
//     status: "ACTIVE",
//     parent: "Andhra Pradesh",
//     children: 8,
//     vendors: 52,
//     captains: 96,
//     customers: 7850,
//     orders: 13720,
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     id: "DIST-KNL",
//     name: "Kurnool",
//     type: "District",
//     status: "ACTIVE",
//     parent: "Andhra Pradesh",
//     children: 7,
//     vendors: 38,
//     captains: 74,
//     customers: 5620,
//     orders: 9820,
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     id: "PIN-522001",
//     name: "522001",
//     type: "Pincode",
//     status: "ACTIVE",
//     parent: "Guntur",
//     children: 3,
//     vendors: 18,
//     captains: 27,
//     customers: 1950,
//     orders: 3280,
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     id: "CLUSTER-AP-001",
//     name: "Andhra Pradesh Central Zone",
//     type: "Cluster",
//     status: "ACTIVE",
//     parent: "Andhra Pradesh",
//     children: 4,
//     vendors: 78,
//     captains: 142,
//     customers: 12450,
//     orders: 21860,
//     updatedAt: "05 Oct 2026",
//   },
//   {
//     id: "ZONE-AP-001",
//     name: "Guntur Service Zone",
//     type: "Zone",
//     status: "ACTIVE",
//     parent: "Guntur",
//     children: 3,
//     vendors: 46,
//     captains: 89,
//     customers: 6410,
//     orders: 11180,
//     updatedAt: "05 Oct 2026",
//   },
// ];

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: HierarchyStatus) {
//   if (status === "ACTIVE") {
//     return "bg-green-100 text-green-700";
//   }

//   if (status === "INACTIVE") {
//     return "bg-slate-100 text-slate-600";
//   }

//   return "bg-red-100 text-red-700";
// }

// function getTypeClasses(type: string) {
//   switch (type) {
//     case "State":
//       return "bg-blue-100 text-blue-700";

//     case "District":
//       return "bg-orange-100 text-orange-700";

//     case "Pincode":
//       return "bg-green-100 text-green-700";

//     case "Cluster":
//       return "bg-purple-100 text-purple-700";

//     case "Zone":
//       return "bg-pink-100 text-pink-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function HierarchyPage() {
//   const [nodes, setNodes] =
//     useState<HierarchyNode[]>(INITIAL_NODES);

//   const [search, setSearch] = useState("");

//   const [typeFilter, setTypeFilter] =
//     useState("ALL");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | HierarchyStatus>("ALL");

//   const [selectedNode, setSelectedNode] =
//     useState<HierarchyNode | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredNodes = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return nodes.filter((node) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         node.id.toLowerCase().includes(searchValue) ||
//         node.name.toLowerCase().includes(searchValue) ||
//         node.type.toLowerCase().includes(searchValue) ||
//         node.parent.toLowerCase().includes(searchValue);

//       const matchesType =
//         typeFilter === "ALL" ||
//         node.type === typeFilter;

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         node.status === statusFilter;

//       return (
//         matchesSearch &&
//         matchesType &&
//         matchesStatus
//       );
//     });
//   }, [
//     nodes,
//     search,
//     typeFilter,
//     statusFilter,
//   ]);

//   const summary = useMemo(() => {
//     return {
//       total: nodes.length,

//       active: nodes.filter(
//         (node) => node.status === "ACTIVE"
//       ).length,

//       inactive: nodes.filter(
//         (node) => node.status === "INACTIVE"
//       ).length,

//       blocked: nodes.filter(
//         (node) => node.status === "BLOCKED"
//       ).length,

//       states: nodes.filter(
//         (node) => node.type === "State"
//       ).length,

//       districts: nodes.filter(
//         (node) => node.type === "District"
//       ).length,

//       pincodes: nodes.filter(
//         (node) => node.type === "Pincode"
//       ).length,

//       clusters: nodes.filter(
//         (node) => node.type === "Cluster"
//       ).length,

//       zones: nodes.filter(
//         (node) => node.type === "Zone"
//       ).length,

//       vendors: nodes.reduce(
//         (sum, node) => sum + node.vendors,
//         0
//       ),

//       captains: nodes.reduce(
//         (sum, node) => sum + node.captains,
//         0
//       ),

//       customers: nodes.reduce(
//         (sum, node) => sum + node.customers,
//         0
//       ),

//       orders: nodes.reduce(
//         (sum, node) => sum + node.orders,
//         0
//       ),
//     };
//   }, [nodes]);

//   function clearFilters() {
//     setSearch("");
//     setTypeFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   function openDetails(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowDetails(true);
//   }

//   function openStatus(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowStatusModal(true);
//   }

//   function updateStatus(
//     newStatus: HierarchyStatus
//   ) {
//     if (!selectedNode) {
//       return;
//     }

//     setNodes((currentNodes) =>
//       currentNodes.map((node) =>
//         node.id === selectedNode.id
//           ? {
//               ...node,
//               status: newStatus,
//               updatedAt: "05 Oct 2026",
//             }
//           : node
//       )
//     );

//     setSelectedNode((current) =>
//       current
//         ? {
//             ...current,
//             status: newStatus,
//             updatedAt: "05 Oct 2026",
//           }
//         : null
//     );

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `${selectedNode.name} status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* PAGE HEADER */}

//       <div className="mb-6">

//         <div className="mb-3 flex items-center gap-2 text-sm">

//           <span className="font-semibold text-slate-800">
//             Hierarchy
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                   ◎
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Hierarchy Management
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Manage JUERP administrative and
//                     operational hierarchy.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <button
//               type="button"
//               className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//             >
//               + Create Node
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS MESSAGE */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* SUMMARY CARDS */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">

//         <SummaryCard
//           title="Total Nodes"
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
//           title="States"
//           value={summary.states}
//         />

//         <SummaryCard
//           title="Districts"
//           value={summary.districts}
//         />

//         <SummaryCard
//           title="Clusters"
//           value={summary.clusters}
//         />

//         <SummaryCard
//           title="Zones"
//           value={summary.zones}
//         />

//       </div>

//       {/* HIERARCHY NAVIGATION */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="mb-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Hierarchy Sections
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Open each hierarchy level for detailed
//             management.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//           <HierarchyLink
//             href="/hierarchy/states"
//             title="States"
//             description="Manage state-level scope."
//             value={summary.states}
//             icon="S"
//           />

//           <HierarchyLink
//             href="/hierarchy/districts"
//             title="Districts"
//             description="Manage district-level scope."
//             value={summary.districts}
//             icon="D"
//           />

//           <HierarchyLink
//             href="/hierarchy/pincodes"
//             title="Pincodes"
//             description="Manage pincode coverage."
//             value={summary.pincodes}
//             icon="P"
//           />

//           <HierarchyLink
//             href="/hierarchy/clusters"
//             title="Clusters"
//             description="Manage hierarchy clusters."
//             value={summary.clusters}
//             icon="C"
//           />

//           <HierarchyLink
//             href="/hierarchy/zones"
//             title="Zones"
//             description="Manage operational zones."
//             value={summary.zones}
//             icon="Z"
//           />

//         </div>

//       </div>

//       {/* SEARCH AND FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">

//           <div className="flex-1">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search Hierarchy
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search ID, name, type or parent..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div className="w-full xl:w-52">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Node Type
//             </label>

//             <select
//               value={typeFilter}
//               onChange={(event) =>
//                 setTypeFilter(event.target.value)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Types
//               </option>

//               <option value="State">
//                 State
//               </option>

//               <option value="District">
//                 District
//               </option>

//               <option value="Pincode">
//                 Pincode
//               </option>

//               <option value="Cluster">
//                 Cluster
//               </option>

//               <option value="Zone">
//                 Zone
//               </option>
//             </select>

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
//                     | HierarchyStatus
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

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear
//           </button>

//         </div>

//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredNodes.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">
//             {nodes.length}
//           </span>{" "}
//           hierarchy nodes
//         </p>

//       </div>

//       {/* HIERARCHY FLOW */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <h2 className="text-lg font-bold text-slate-900">
//           Hierarchy Flow
//         </h2>

//         <p className="mt-1 text-xs text-slate-500">
//           High-level administrative scope.
//         </p>

//         <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">

//           <FlowNode
//             title="State"
//             value={summary.states}
//           />

//           <FlowArrow />

//           <FlowNode
//             title="District"
//             value={summary.districts}
//           />

//           <FlowArrow />

//           <FlowNode
//             title="Pincode"
//             value={summary.pincodes}
//           />

//           <FlowArrow />

//           <FlowNode
//             title="Cluster"
//             value={summary.clusters}
//           />

//           <FlowArrow />

//           <FlowNode
//             title="Zone"
//             value={summary.zones}
//           />

//         </div>

//       </div>

//       {/* NODE DIRECTORY */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Hierarchy Node Directory
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative nodes currently visible to
//             JUERP.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Node
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Type
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Parent
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Children
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

//               {filteredNodes.map((node) => (
//                 <tr
//                   key={node.id}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {node.name}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {node.id}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                         node.type
//                       )}`}
//                     >
//                       {node.type}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4 text-sm text-slate-600">
//                     {node.parent}
//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         node.status
//                       )}`}
//                     >
//                       {node.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(node.children)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(node.vendors)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(node.captains)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(node.customers)}
//                   </td>

//                   <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                     {formatNumber(node.orders)}
//                   </td>

//                   <td className="px-5 py-4">

//                     <div className="flex gap-3">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(node)
//                         }
//                         className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         View
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openStatus(node)
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

//         {filteredNodes.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE DIRECTORY */}

//       <div className="space-y-4 md:hidden">

//         {filteredNodes.map((node) => (
//           <div
//             key={node.id}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   {node.name}
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {node.id}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   node.status
//                 )}`}
//               >
//                 {node.status}
//               </span>

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                   node.type
//                 )}`}
//               >
//                 {node.type}
//               </span>

//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
//                 Parent: {node.parent}
//               </span>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileStat
//                 label="Children"
//                 value={node.children}
//               />

//               <MobileStat
//                 label="Vendors"
//                 value={node.vendors}
//               />

//               <MobileStat
//                 label="Captains"
//                 value={node.captains}
//               />

//               <MobileStat
//                 label="Customers"
//                 value={node.customers}
//               />

//               <MobileStat
//                 label="Orders"
//                 value={node.orders}
//               />

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   openDetails(node)
//                 }
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View Details
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   openStatus(node)
//                 }
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>

//             </div>

//           </div>
//         ))}

//         {filteredNodes.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           Hierarchy Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           JUERP hierarchy defines administrative and
//           operational scope. State, district and pincode
//           scope must be enforced from authenticated
//           authorization claims and authoritative scope
//           records. Vendors, captains, customers, orders,
//           bookings and other entities must not be assigned
//           to a scope based only on client-side state.
//           Protected hierarchy changes must go through the
//           trusted backend and JUERP authorization layer.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">

//           <GovernanceCard
//             title="Scope Control"
//             description="State, district and pincode authorization must be enforced by the backend."
//           />

//           <GovernanceCard
//             title="No Business Rule Duplication"
//             description="Clients must not independently calculate commissions, pricing, settlements or payouts."
//           />

//           <GovernanceCard
//             title="Auditability"
//             description="Protected hierarchy changes should use correlation IDs, authorization and audit logging."
//           />

//         </div>

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedNode && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">

//               <div>

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedNode.name}
//                   </h2>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedNode.status
//                     )}`}
//                   >
//                     {selectedNode.status}
//                   </span>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedNode.id}
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

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Node Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Node ID"
//                     value={selectedNode.id}
//                   />

//                   <InfoItem
//                     label="Node Type"
//                     value={selectedNode.type}
//                   />

//                   <InfoItem
//                     label="Parent"
//                     value={selectedNode.parent}
//                   />

//                   <InfoItem
//                     label="Status"
//                     value={selectedNode.status}
//                   />

//                   <InfoItem
//                     label="Children"
//                     value={formatNumber(
//                       selectedNode.children
//                     )}
//                   />

//                   <InfoItem
//                     label="Last Updated"
//                     value={selectedNode.updatedAt}
//                   />

//                 </div>

//               </div>

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Operational Scope
//                 </h3>

//                 <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

//                   <DetailStat
//                     title="Vendors"
//                     value={selectedNode.vendors}
//                   />

//                   <DetailStat
//                     title="Captains"
//                     value={selectedNode.captains}
//                   />

//                   <DetailStat
//                     title="Customers"
//                     value={selectedNode.customers}
//                   />

//                   <DetailStat
//                     title="Orders"
//                     value={selectedNode.orders}
//                   />

//                 </div>

//               </div>

//               <div className="rounded-xl border border-slate-200 p-4">

//                 <p className="text-xs text-slate-500">
//                   Governance
//                 </p>

//                 <p className="mt-2 text-sm leading-6 text-slate-600">
//                   This hierarchy node is displayed from
//                   sample UI data. In production, the
//                   authenticated user's scope and the
//                   authoritative hierarchy records must be
//                   validated by the trusted backend.
//                 </p>

//               </div>

//               <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowDetails(false)
//                   }
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

//       {/* STATUS MODAL */}

//       {showStatusModal && selectedNode && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Node Status
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   {selectedNode.name}
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
//                 description="Node is active and available."
//                 active={
//                   selectedNode.status === "ACTIVE"
//                 }
//                 onClick={() =>
//                   updateStatus("ACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Inactive"
//                 description="Node is temporarily inactive."
//                 active={
//                   selectedNode.status === "INACTIVE"
//                 }
//                 onClick={() =>
//                   updateStatus("INACTIVE")
//                 }
//               />

//               <StatusOption
//                 title="Blocked"
//                 description="Node is blocked from operational use."
//                 active={
//                   selectedNode.status === "BLOCKED"
//                 }
//                 onClick={() =>
//                   updateStatus("BLOCKED")
//                 }
//               />

//             </div>

//             <div className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs leading-5 text-yellow-700">
//               This is currently a UI-only status change.
//               Production status changes must be authorized
//               and persisted through the trusted backend.
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

// function HierarchyLink({
//   href,
//   title,
//   description,
//   value,
//   icon,
// }: {
//   href: string;
//   title: string;
//   description: string;
//   value: number;
//   icon: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
//     >

//       <div className="flex items-start justify-between">

//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700">
//           {icon}
//         </div>

//         <span className="text-lg text-slate-300 group-hover:text-orange-500">
//           →
//         </span>

//       </div>

//       <h3 className="mt-4 text-sm font-bold text-slate-900">
//         {title}
//       </h3>

//       <p className="mt-1 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//       <p className="mt-3 text-lg font-bold text-orange-600">
//         {formatNumber(value)}
//       </p>

//     </Link>
//   );
// }

// function FlowNode({
//   title,
//   value,
// }: {
//   title: string;
//   value: number;
// }) {
//   return (
//     <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center md:w-36">

//       <p className="text-xs font-semibold text-slate-500">
//         {title}
//       </p>

//       <p className="mt-1 text-xl font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function FlowArrow() {
//   return (
//     <div className="rotate-90 text-xl font-bold text-orange-400 md:rotate-0">
//       →
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
//         ◎
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No hierarchy nodes found
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
// import useHierarchy, {
//   type HierarchyNode,
//   type HierarchyStatus,
// } from "@/hooks/useHierarchy";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: HierarchyStatus) {
//   if (status === "ACTIVE") return "bg-green-100 text-green-700";
//   if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
//   return "bg-red-100 text-red-700";
// }

// function getTypeClasses(type: string) {
//   switch (type) {
//     case "State":
//       return "bg-blue-100 text-blue-700";
//     case "District":
//       return "bg-orange-100 text-orange-700";
//     case "Pincode":
//       return "bg-green-100 text-green-700";
//     case "Cluster":
//       return "bg-purple-100 text-purple-700";
//     case "Zone":
//       return "bg-pink-100 text-pink-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function HierarchyPage() {
//   const { nodes, loading, error, demoMode, refresh } = useHierarchy();

//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("ALL");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredNodes = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return nodes.filter((node) => {
//       const matchesSearch =
//         !q ||
//         node.id.toLowerCase().includes(q) ||
//         node.name.toLowerCase().includes(q) ||
//         node.type.toLowerCase().includes(q) ||
//         node.parent.toLowerCase().includes(q);
//       const matchesType = typeFilter === "ALL" || node.type === typeFilter;
//       const matchesStatus =
//         statusFilter === "ALL" || node.status === statusFilter;
//       return matchesSearch && matchesType && matchesStatus;
//     });
//   }, [nodes, search, typeFilter, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: nodes.length,
//       active: nodes.filter((n) => n.status === "ACTIVE").length,
//       inactive: nodes.filter((n) => n.status === "INACTIVE").length,
//       blocked: nodes.filter((n) => n.status === "BLOCKED").length,
//       states: nodes.filter((n) => n.type === "State").length,
//       districts: nodes.filter((n) => n.type === "District").length,
//       pincodes: nodes.filter((n) => n.type === "Pincode").length,
//       clusters: nodes.filter((n) => n.type === "Cluster").length,
//       zones: nodes.filter((n) => n.type === "Zone").length,
//     }),
//     [nodes]
//   );

//   function clearFilters() {
//     setSearch("");
//     setTypeFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   function openDetails(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowDetails(true);
//   }

//   function openStatus(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowStatusModal(true);
//   }

//   function updateStatus(newStatus: HierarchyStatus) {
//     if (!selectedNode) return;
//     setSelectedNode({
//       ...selectedNode,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `${selectedNode.name}: local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex items-center gap-2 text-sm">
//           <span className="font-semibold text-slate-800">Hierarchy</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◎
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Management
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore states / districts / pincodes /
//                   clusters / zones.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
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
//                 className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Node
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
//         <SummaryCard title="Total Nodes" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="States" value={summary.states} />
//         <SummaryCard title="Districts" value={summary.districts} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Zones" value={summary.zones} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="mb-4">
//           <h2 className="text-lg font-bold text-slate-900">Hierarchy Sections</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Open each hierarchy level for detailed management.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//           <HierarchyLink href="/hierarchy/states" title="States" description="Manage state-level scope." value={summary.states} icon="S" />
//           <HierarchyLink href="/hierarchy/districts" title="Districts" description="Manage district-level scope." value={summary.districts} icon="D" />
//           <HierarchyLink href="/hierarchy/pincodes" title="Pincodes" description="Manage pincode coverage." value={summary.pincodes} icon="P" />
//           <HierarchyLink href="/hierarchy/clusters" title="Clusters" description="Manage hierarchy clusters." value={summary.clusters} icon="C" />
//           <HierarchyLink href="/hierarchy/zones" title="Zones" description="Manage operational zones." value={summary.zones} icon="Z" />
//         </div>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search Hierarchy
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, name, type or parent..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Node Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="State">State</option>
//               <option value="District">District</option>
//               <option value="Pincode">Pincode</option>
//               <option value="Cluster">Cluster</option>
//               <option value="Zone">Zone</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | HierarchyStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
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
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredNodes.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{nodes.length}</span>{" "}
//           hierarchy nodes
//         </p>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <h2 className="text-lg font-bold text-slate-900">Hierarchy Flow</h2>
//         <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
//           <FlowNode title="State" value={summary.states} />
//           <FlowArrow />
//           <FlowNode title="District" value={summary.districts} />
//           <FlowArrow />
//           <FlowNode title="Pincode" value={summary.pincodes} />
//           <FlowArrow />
//           <FlowNode title="Cluster" value={summary.clusters} />
//           <FlowArrow />
//           <FlowNode title="Zone" value={summary.zones} />
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">
//             Hierarchy Node Directory
//           </h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {["Node", "Type", "Parent", "Status", "Children", "Vendors", "Captains", "Customers", "Orders", "Action"].map(
//                   (h) => (
//                     <th
//                       key={h}
//                       className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
//                     >
//                       {h}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredNodes.length === 0 ? (
//                 <tr>
//                   <td colSpan={10} className="px-5 py-12 text-center text-sm text-slate-500">
//                     Loading hierarchy…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredNodes.map((node) => (
//                   <tr key={node.id} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">{node.name}</p>
//                       <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(node.type)}`}>
//                         {node.type}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">{node.parent}</td>
//                     <td className="px-5 py-4">
//                       <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(node.status)}`}>
//                         {node.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">{formatNumber(node.children)}</td>
//                     <td className="px-5 py-4 text-sm font-semibold">{formatNumber(node.vendors)}</td>
//                     <td className="px-5 py-4 text-sm font-semibold">{formatNumber(node.captains)}</td>
//                     <td className="px-5 py-4 text-sm font-semibold">{formatNumber(node.customers)}</td>
//                     <td className="px-5 py-4 text-sm font-semibold">{formatNumber(node.orders)}</td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button type="button" onClick={() => openDetails(node)} className="text-sm font-semibold text-orange-600">
//                           View
//                         </button>
//                         <button type="button" onClick={() => openStatus(node)} className="text-sm font-semibold text-slate-600">
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
//         {!loading && filteredNodes.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredNodes.map((node) => (
//           <div key={node.id} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">{node.name}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//               </div>
//               <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(node.status)}`}>
//                 {node.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button type="button" onClick={() => openDetails(node)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold">
//                 View Details
//               </button>
//               <button type="button" onClick={() => openStatus(node)} className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white">
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Hierarchy Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Nodes load from Firestore. Status controls are local UI only until
//           wired to authorized backend operations.
//         </p>
//       </div>

//       {showDetails && selectedNode && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5">
//               <div>
//                 <h2 className="text-xl font-bold">{selectedNode.name}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selectedNode.id}</p>
//               </div>
//               <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400">
//                 ×
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4 p-5">
//               <InfoItem label="Type" value={selectedNode.type} />
//               <InfoItem label="Parent" value={selectedNode.parent} />
//               <InfoItem label="Status" value={selectedNode.status} />
//               <InfoItem label="Updated" value={selectedNode.updatedAt} />
//               <InfoItem label="Vendors" value={formatNumber(selectedNode.vendors)} />
//               <InfoItem label="Captains" value={formatNumber(selectedNode.captains)} />
//               <InfoItem label="Customers" value={formatNumber(selectedNode.customers)} />
//               <InfoItem label="Orders" value={formatNumber(selectedNode.orders)} />
//             </div>
//             <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
//               <button type="button" onClick={() => setShowDetails(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold">
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDetails(false);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && selectedNode && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage Node Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selectedNode.name}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map((s) => (
//                 <button
//                   key={s}
//                   type="button"
//                   onClick={() => updateStatus(s)}
//                   className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
//                     selectedNode.status === s
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//             <p className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs text-yellow-700">
//               UI-only until authorized backend write.
//             </p>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
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
//       <p className="mt-2 text-lg font-bold text-slate-900">{formatNumber(value)}</p>
//     </div>
//   );
// }

// function HierarchyLink({
//   href,
//   title,
//   description,
//   value,
//   icon,
// }: {
//   href: string;
//   title: string;
//   description: string;
//   value: number;
//   icon: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700">
//           {icon}
//         </div>
//         <span className="text-lg text-slate-300 group-hover:text-orange-500">→</span>
//       </div>
//       <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
//       <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
//       <p className="mt-3 text-lg font-bold text-orange-600">{formatNumber(value)}</p>
//     </Link>
//   );
// }

// function FlowNode({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center md:w-36">
//       <p className="text-xs font-semibold text-slate-500">{title}</p>
//       <p className="mt-1 text-xl font-bold text-slate-900">{formatNumber(value)}</p>
//     </div>
//   );
// }

// function FlowArrow() {
//   return (
//     <div className="rotate-90 text-xl font-bold text-orange-400 md:rotate-0">→</div>
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

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <p className="text-sm font-bold text-slate-800">No hierarchy nodes found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collections or filters too narrow.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useHierarchy, {
//   type HierarchyNode,
//   type HierarchyStatus,
//   useStates,
//   useDistricts,
// } from "@/hooks/useHierarchy";
// import NodeCreateModal, {
//   type HierarchyNodeCreateData,
// } from "@/components/hierarchy/NodeCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";



// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: HierarchyStatus) {
//   if (status === "ACTIVE") return "bg-green-100 text-green-700";
//   if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
//   return "bg-red-100 text-red-700";
// }

// function getTypeClasses(type: string) {
//   switch (type) {
//     case "State":
//       return "bg-blue-100 text-blue-700";
//     case "District":
//       return "bg-orange-100 text-orange-700";
//     case "Pincode":
//       return "bg-green-100 text-green-700";
//     case "Cluster":
//       return "bg-purple-100 text-purple-700";
//     case "Zone":
//       return "bg-pink-100 text-pink-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function HierarchyPage() {
//   const { nodes, loading, error, demoMode, refresh } = useHierarchy();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("ALL");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredNodes = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return nodes.filter((node) => {
//       const matchesSearch =
//         !q ||
//         node.id.toLowerCase().includes(q) ||
//         node.name.toLowerCase().includes(q) ||
//         node.type.toLowerCase().includes(q) ||
//         node.parent.toLowerCase().includes(q);
//       const matchesType = typeFilter === "ALL" || node.type === typeFilter;
//       const matchesStatus =
//         statusFilter === "ALL" || node.status === statusFilter;
//       return matchesSearch && matchesType && matchesStatus;
//     });
//   }, [nodes, search, typeFilter, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: nodes.length,
//       active: nodes.filter((n) => n.status === "ACTIVE").length,
//       inactive: nodes.filter((n) => n.status === "INACTIVE").length,
//       blocked: nodes.filter((n) => n.status === "BLOCKED").length,
//       states: nodes.filter((n) => n.type === "State").length,
//       districts: nodes.filter((n) => n.type === "District").length,
//       pincodes: nodes.filter((n) => n.type === "Pincode").length,
//       clusters: nodes.filter((n) => n.type === "Cluster").length,
//       zones: nodes.filter((n) => n.type === "Zone").length,
//     }),
//     [nodes]
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
//       })),
//     [districts]
//   );

//   function clearFilters() {
//     setSearch("");
//     setTypeFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   function openDetails(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowDetails(true);
//   }

//   function openStatus(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowStatusModal(true);
//   }

//   // function updateStatus(newStatus: HierarchyStatus) {
//   //   if (!selectedNode) return;
//   //   setSelectedNode({
//   //     ...selectedNode,
//   //     status: newStatus,
//   //     updatedAt: "Just now (local UI)",
//   //   });
//   //   setShowStatusModal(false);
//   //   setSuccessMessage(
//   //     `${selectedNode.name}: local UI status → ${newStatus}. Persist via authorized backend.`
//   //   );
//   //   setTimeout(() => setSuccessMessage(""), 3500);
//   // }
//     async function updateStatus(newStatus: HierarchyStatus) {
//     if (!selectedNode) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     const collectionName =
//       selectedNode.type === "State"
//         ? FIRESTORE_COLLECTIONS.STATES
//         : selectedNode.type === "District"
//           ? FIRESTORE_COLLECTIONS.DISTRICTS
//           : selectedNode.type === "Pincode"
//             ? FIRESTORE_COLLECTIONS.PINCODES
//             : selectedNode.type === "Cluster"
//               ? FIRESTORE_COLLECTIONS.CLUSTERS
//               : selectedNode.type === "Zone"
//                 ? FIRESTORE_COLLECTIONS.ZONES
//                 : null;

//     if (!collectionName) {
//       setSuccessMessage("Unknown node type — cannot update status.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     try {
//       await updateDocument(collectionName, selectedNode.id, {
//         status: newStatus,
//       });

//       setSelectedNode({
//         ...selectedNode,
//         status: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `${selectedNode.name}: status updated to ${newStatus}.`
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
//     }
//   }

//   async function handleCreateNode(data: HierarchyNodeCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       if (data.nodeType === "STATE") {
//         const id = data.nodeCode.toLowerCase();
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.STATES, id, {
//           stateId: id,
//           stateName: data.nodeName,
//           code: data.nodeCode,
//           status: "ACTIVE",
//           country: "India",
//           districtCount: 0,
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });
//       } 
//       // else if (data.nodeType === "DISTRICT") {
//       //   const id = `${data.stateId}_${data.nodeCode}`.toLowerCase();
//       //   await createDocumentWithId(FIRESTORE_COLLECTIONS.DISTRICTS, id, {
//       //     districtId: id,
//       //     districtName: data.nodeName,
//       //     code: data.nodeCode,
//       //     stateId: data.stateId,
//       //     stateName: data.stateName,
//       //     status: "ACTIVE",
//       //     pincodeCount: 0,
//       //     vendorCount: 0,
//       //     captainCount: 0,
//       //     customerCount: 0,
//       //     orderCount: 0,
//       //     description: data.description ?? null,
//       //   });
//       // } 
//       else if (data.nodeType === "DISTRICT") {
//         const id = `${data.stateId}_${data.nodeCode}`.toLowerCase();
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.DISTRICTS, id, {
//           districtId: id,
//           districtName: data.nodeName,
//           code: data.nodeCode,
//           stateId: data.stateId,
//           stateName: data.stateName,
//           status: "ACTIVE",
//           pincodeCount: 0,
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });
//       }
//       else if (data.nodeType === "PINCODE") {
//         const id = data.pincode!;
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.PINCODES, id, {
//           pincode: id,
//           areaName: data.nodeName,
//           stateId: data.stateId,
//           stateName: data.stateName,
//           districtId: data.districtId,
//           districtName: data.districtName,
//           status: "ACTIVE",
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });
//       }

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.nodeName} created successfully.`);
//       setTimeout(() => setSuccessMessage(""), 3500);
//       await refresh();
//     } finally {
//       setCreateLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex items-center gap-2 text-sm">
//           <span className="font-semibold text-slate-800">Hierarchy</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◎
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Management
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore states / districts / pincodes /
//                   clusters / zones.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
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
//                 className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Node
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
//         <SummaryCard title="Total Nodes" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="States" value={summary.states} />
//         <SummaryCard title="Districts" value={summary.districts} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Zones" value={summary.zones} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="mb-4">
//           <h2 className="text-lg font-bold text-slate-900">Hierarchy Sections</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Open each hierarchy level for detailed management.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//           <HierarchyLink
//             href="/hierarchy/states"
//             title="States"
//             description="Manage state-level scope."
//             value={summary.states}
//             icon="S"
//           />
//           <HierarchyLink
//             href="/hierarchy/districts"
//             title="Districts"
//             description="Manage district-level scope."
//             value={summary.districts}
//             icon="D"
//           />
//           <HierarchyLink
//             href="/hierarchy/pincodes"
//             title="Pincodes"
//             description="Manage pincode coverage."
//             value={summary.pincodes}
//             icon="P"
//           />
//           <HierarchyLink
//             href="/hierarchy/clusters"
//             title="Clusters"
//             description="Manage hierarchy clusters."
//             value={summary.clusters}
//             icon="C"
//           />
//           <HierarchyLink
//             href="/hierarchy/zones"
//             title="Zones"
//             description="Manage operational zones."
//             value={summary.zones}
//             icon="Z"
//           />
//         </div>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search Hierarchy
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, name, type or parent..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Node Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="State">State</option>
//               <option value="District">District</option>
//               <option value="Pincode">Pincode</option>
//               <option value="Cluster">Cluster</option>
//               <option value="Zone">Zone</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | HierarchyStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
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
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredNodes.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{nodes.length}</span>{" "}
//           hierarchy nodes
//         </p>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <h2 className="text-lg font-bold text-slate-900">Hierarchy Flow</h2>
//         <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
//           <FlowNode title="State" value={summary.states} />
//           <FlowArrow />
//           <FlowNode title="District" value={summary.districts} />
//           <FlowArrow />
//           <FlowNode title="Pincode" value={summary.pincodes} />
//           <FlowArrow />
//           <FlowNode title="Cluster" value={summary.clusters} />
//           <FlowArrow />
//           <FlowNode title="Zone" value={summary.zones} />
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">
//             Hierarchy Node Directory
//           </h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Node",
//                   "Type",
//                   "Parent",
//                   "Status",
//                   "Children",
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
//               {loading && filteredNodes.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={10}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading hierarchy…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredNodes.map((node) => (
//                   <tr key={node.id} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {node.name}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           node.type
//                         )}`}
//                       >
//                         {node.type}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">
//                       {node.parent}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           node.status
//                         )}`}
//                       >
//                         {node.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.children)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.vendors)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.captains)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.customers)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.orders)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(node)}
//                           className="text-sm font-semibold text-orange-600"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatus(node)}
//                           className="text-sm font-semibold text-slate-600"
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
//         {!loading && filteredNodes.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredNodes.map((node) => (
//           <div key={node.id} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">{node.name}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   node.status
//                 )}`}
//               >
//                 {node.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(node)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatus(node)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Hierarchy Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Nodes load from Firestore. Status controls are local UI only until
//           wired to authorized backend operations.
//         </p>
//       </div>

//       {/* Details Modal */}
//       {showDetails && selectedNode && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5">
//               <div>
//                 <h2 className="text-xl font-bold">{selectedNode.name}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selectedNode.id}</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4 p-5">
//               <InfoItem label="Type" value={selectedNode.type} />
//               <InfoItem label="Parent" value={selectedNode.parent} />
//               <InfoItem label="Status" value={selectedNode.status} />
//               <InfoItem label="Updated" value={selectedNode.updatedAt} />
//               <InfoItem
//                 label="Vendors"
//                 value={formatNumber(selectedNode.vendors)}
//               />
//               <InfoItem
//                 label="Captains"
//                 value={formatNumber(selectedNode.captains)}
//               />
//               <InfoItem
//                 label="Customers"
//                 value={formatNumber(selectedNode.customers)}
//               />
//               <InfoItem
//                 label="Orders"
//                 value={formatNumber(selectedNode.orders)}
//               />
//             </div>
//             <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDetails(false);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Status Modal */}
//       {showStatusModal && selectedNode && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage Node Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selectedNode.name}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map(
//                 (s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => updateStatus(s)}
//                     className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
//                       selectedNode.status === s
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 )
//               )}
//             </div>
//             <p className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs text-yellow-700">
//               UI-only until authorized backend write.
//             </p>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Create Node Modal */}
//       <NodeCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateNode}
//         states={stateOptions}
//         districts={districtOptions}
//         loading={createLoading}
//         defaultNodeType="STATE"
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

// function HierarchyLink({
//   href,
//   title,
//   description,
//   value,
//   icon,
// }: {
//   href: string;
//   title: string;
//   description: string;
//   value: number;
//   icon: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700">
//           {icon}
//         </div>
//         <span className="text-lg text-slate-300 group-hover:text-orange-500">
//           →
//         </span>
//       </div>
//       <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
//       <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
//       <p className="mt-3 text-lg font-bold text-orange-600">
//         {formatNumber(value)}
//       </p>
//     </Link>
//   );
// }

// function FlowNode({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center md:w-36">
//       <p className="text-xs font-semibold text-slate-500">{title}</p>
//       <p className="mt-1 text-xl font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function FlowArrow() {
//   return (
//     <div className="rotate-90 text-xl font-bold text-orange-400 md:rotate-0">
//       →
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

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <p className="text-sm font-bold text-slate-800">No hierarchy nodes found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collections or filters too narrow.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useHierarchy, {
//   type HierarchyNode,
//   type HierarchyStatus,
//   useStates,
//   useDistricts,
// } from "@/hooks/useHierarchy";
// import NodeCreateModal, {
//   type HierarchyNodeCreateData,
// } from "@/components/hierarchy/NodeCreateModal";
// import {
//   FIRESTORE_COLLECTIONS,
//   createDocumentWithId,
//   getDocument,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import {
//   cascadeStateStatus,
//   cascadeDistrictStatus,
// } from "@/lib/hierarchy/cascadeStatus";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: HierarchyStatus) {
//   if (status === "ACTIVE") return "bg-green-100 text-green-700";
//   if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
//   return "bg-red-100 text-red-700";
// }

// function getTypeClasses(type: string) {
//   switch (type) {
//     case "State":
//       return "bg-blue-100 text-blue-700";
//     case "District":
//       return "bg-orange-100 text-orange-700";
//     case "Pincode":
//       return "bg-green-100 text-green-700";
//     case "Cluster":
//       return "bg-purple-100 text-purple-700";
//     case "Zone":
//       return "bg-pink-100 text-pink-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// /** Safely increment a numeric counter field on a parent document */
// async function incrementParentCount(
//   collectionName: (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS],
//   documentId: string,
//   field: string
// ) {
//   if (!documentId) return;
//   try {
//     const parent = await getDocument<Record<string, unknown>>(
//       collectionName,
//       documentId
//     );
//     const current = Number(parent?.[field] ?? 0);
//     await updateDocument(collectionName, documentId, {
//       [field]: (Number.isFinite(current) ? current : 0) + 1,
//     });
//   } catch (err) {
//     console.warn(`Failed to increment ${field} on ${documentId}:`, err);
//   }
// }

// export default function HierarchyPage() {
//   const { nodes, loading, error, demoMode, refresh } = useHierarchy();
//   const { states } = useStates();
//   const { districts } = useDistricts();

//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("ALL");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [createLoading, setCreateLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredNodes = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return nodes.filter((node) => {
//       const matchesSearch =
//         !q ||
//         node.id.toLowerCase().includes(q) ||
//         node.name.toLowerCase().includes(q) ||
//         node.type.toLowerCase().includes(q) ||
//         node.parent.toLowerCase().includes(q);
//       const matchesType = typeFilter === "ALL" || node.type === typeFilter;
//       const matchesStatus =
//         statusFilter === "ALL" || node.status === statusFilter;
//       return matchesSearch && matchesType && matchesStatus;
//     });
//   }, [nodes, search, typeFilter, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: nodes.length,
//       active: nodes.filter((n) => n.status === "ACTIVE").length,
//       inactive: nodes.filter((n) => n.status === "INACTIVE").length,
//       blocked: nodes.filter((n) => n.status === "BLOCKED").length,
//       states: nodes.filter((n) => n.type === "State").length,
//       districts: nodes.filter((n) => n.type === "District").length,
//       pincodes: nodes.filter((n) => n.type === "Pincode").length,
//       clusters: nodes.filter((n) => n.type === "Cluster").length,
//       zones: nodes.filter((n) => n.type === "Zone").length,
//     }),
//     [nodes]
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
//       })),
//     [districts]
//   );

//   function clearFilters() {
//     setSearch("");
//     setTypeFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   function openDetails(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowDetails(true);
//   }

//   function openStatus(node: HierarchyNode) {
//     setSelectedNode(node);
//     setShowStatusModal(true);
//   }

//   // async function updateStatus(newStatus: HierarchyStatus) {
//   //   if (!selectedNode) return;

//   //   if (isFirestoreDemoMode) {
//   //     setSuccessMessage("Writes are disabled in demo mode.");
//   //     setTimeout(() => setSuccessMessage(""), 3500);
//   //     return;
//   //   }

//   //   const collectionName =
//   //     selectedNode.type === "State"
//   //       ? FIRESTORE_COLLECTIONS.STATES
//   //       : selectedNode.type === "District"
//   //         ? FIRESTORE_COLLECTIONS.DISTRICTS
//   //         : selectedNode.type === "Pincode"
//   //           ? FIRESTORE_COLLECTIONS.PINCODES
//   //           : selectedNode.type === "Cluster"
//   //             ? FIRESTORE_COLLECTIONS.CLUSTERS
//   //             : selectedNode.type === "Zone"
//   //               ? FIRESTORE_COLLECTIONS.ZONES
//   //               : null;

//   //   if (!collectionName) {
//   //     setSuccessMessage("Unknown node type — cannot update status.");
//   //     setTimeout(() => setSuccessMessage(""), 3500);
//   //     return;
//   //   }

//   //   try {
//   //     await updateDocument(collectionName, selectedNode.id, {
//   //       status: newStatus,
//   //     });

//   //     setSelectedNode({
//   //       ...selectedNode,
//   //       status: newStatus,
//   //       updatedAt: "Just now",
//   //     });
//   //     setShowStatusModal(false);
//   //     setSuccessMessage(
//   //       `${selectedNode.name}: status updated to ${newStatus}.`
//   //     );
//   //     setTimeout(() => setSuccessMessage(""), 3500);
//   //     await refresh();
//   //   } catch (err) {
//   //     setSuccessMessage(
//   //       err instanceof Error
//   //         ? err.message
//   //         : "Failed to update status (check Firestore rules)."
//   //     );
//   //     setTimeout(() => setSuccessMessage(""), 5000);
//   //   }
//   // }

//     async function updateStatus(newStatus: HierarchyStatus) {
//     if (!selectedNode) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     const collectionName =
//       selectedNode.type === "State"
//         ? FIRESTORE_COLLECTIONS.STATES
//         : selectedNode.type === "District"
//           ? FIRESTORE_COLLECTIONS.DISTRICTS
//           : selectedNode.type === "Pincode"
//             ? FIRESTORE_COLLECTIONS.PINCODES
//             : selectedNode.type === "Cluster"
//               ? FIRESTORE_COLLECTIONS.CLUSTERS
//               : selectedNode.type === "Zone"
//                 ? FIRESTORE_COLLECTIONS.ZONES
//                 : null;

//     if (!collectionName) {
//       setSuccessMessage("Unknown node type — cannot update status.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     try {
//       await updateDocument(collectionName, selectedNode.id, {
//         status: newStatus,
//       });

//       let cascadeNote = "";

//       if (
//         selectedNode.type === "State" &&
//         (newStatus === "INACTIVE" || newStatus === "BLOCKED")
//       ) {
//         const result = await cascadeStateStatus(
//           selectedNode.id,
//           selectedNode.name,
//           newStatus
//         );
//         cascadeNote = ` Cascaded → ${result.districts} districts, ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
//       }

//       if (
//         selectedNode.type === "District" &&
//         (newStatus === "INACTIVE" || newStatus === "BLOCKED")
//       ) {
//         const result = await cascadeDistrictStatus(
//           selectedNode.id,
//           selectedNode.name,
//           newStatus
//         );
//         cascadeNote = ` Cascaded → ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
//       }

//       setSelectedNode({
//         ...selectedNode,
//         status: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `${selectedNode.name}: status updated to ${newStatus}.${cascadeNote}`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update status (check Firestore rules)."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     }
//   }

//   async function handleCreateNode(data: HierarchyNodeCreateData) {
//     if (isFirestoreDemoMode) {
//       throw new Error("Writes are disabled in demo mode.");
//     }

//     setCreateLoading(true);
//     try {
//       if (data.nodeType === "STATE") {
//         const id = data.nodeCode.toLowerCase();
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.STATES, id, {
//           stateId: id,
//           stateName: data.nodeName,
//           code: data.nodeCode,
//           status: "ACTIVE",
//           country: "India",
//           districtCount: 0,
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });
//       } else if (data.nodeType === "DISTRICT") {
//         if (!data.stateId) {
//           throw new Error("State is required to create a district.");
//         }

//         const id = `${data.stateId}_${data.nodeCode}`.toLowerCase();
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.DISTRICTS, id, {
//           districtId: id,
//           districtName: data.nodeName,
//           code: data.nodeCode,
//           stateId: data.stateId,
//           stateName: data.stateName,
//           status: "ACTIVE",
//           pincodeCount: 0,
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });

//         // Parent state: children / districtCount + 1
//         await incrementParentCount(
//           FIRESTORE_COLLECTIONS.STATES,
//           data.stateId,
//           "districtCount"
//         );
//       } else if (data.nodeType === "PINCODE") {
//         if (!data.pincode) {
//           throw new Error("Pincode is required.");
//         }
//         if (!data.districtId) {
//           throw new Error("District is required to create a pincode.");
//         }

//         const id = data.pincode;
//         await createDocumentWithId(FIRESTORE_COLLECTIONS.PINCODES, id, {
//           pincode: id,
//           areaName: data.nodeName,
//           stateId: data.stateId,
//           stateName: data.stateName,
//           districtId: data.districtId,
//           districtName: data.districtName,
//           status: "ACTIVE",
//           vendorCount: 0,
//           captainCount: 0,
//           customerCount: 0,
//           orderCount: 0,
//           description: data.description ?? null,
//         });

//         // Parent district: children / pincodeCount + 1
//         await incrementParentCount(
//           FIRESTORE_COLLECTIONS.DISTRICTS,
//           data.districtId,
//           "pincodeCount"
//         );
//       }

//       setShowCreateModal(false);
//       setSuccessMessage(`${data.nodeName} created successfully.`);
//       setTimeout(() => setSuccessMessage(""), 3500);
//       await refresh();
//     } finally {
//       setCreateLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex items-center gap-2 text-sm">
//           <span className="font-semibold text-slate-800">Hierarchy</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 ◎
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Hierarchy Management
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore states / districts / pincodes /
//                   clusters / zones.
//                   {demoMode ? " (demo mode — writes disabled)" : ""}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
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
//                 className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Node
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
//         <SummaryCard title="Total Nodes" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Inactive" value={summary.inactive} />
//         <SummaryCard title="Blocked" value={summary.blocked} />
//         <SummaryCard title="States" value={summary.states} />
//         <SummaryCard title="Districts" value={summary.districts} />
//         <SummaryCard title="Clusters" value={summary.clusters} />
//         <SummaryCard title="Zones" value={summary.zones} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="mb-4">
//           <h2 className="text-lg font-bold text-slate-900">Hierarchy Sections</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Open each hierarchy level for detailed management.
//           </p>
//         </div>
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//           <HierarchyLink
//             href="/hierarchy/states"
//             title="States"
//             description="Manage state-level scope."
//             value={summary.states}
//             icon="S"
//           />
//           <HierarchyLink
//             href="/hierarchy/districts"
//             title="Districts"
//             description="Manage district-level scope."
//             value={summary.districts}
//             icon="D"
//           />
//           <HierarchyLink
//             href="/hierarchy/pincodes"
//             title="Pincodes"
//             description="Manage pincode coverage."
//             value={summary.pincodes}
//             icon="P"
//           />
//           <HierarchyLink
//             href="/hierarchy/clusters"
//             title="Clusters"
//             description="Manage hierarchy clusters."
//             value={summary.clusters}
//             icon="C"
//           />
//           <HierarchyLink
//             href="/hierarchy/zones"
//             title="Zones"
//             description="Manage operational zones."
//             value={summary.zones}
//             icon="Z"
//           />
//         </div>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search Hierarchy
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, name, type or parent..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Node Type
//             </label>
//             <select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Types</option>
//               <option value="State">State</option>
//               <option value="District">District</option>
//               <option value="Pincode">Pincode</option>
//               <option value="Cluster">Cluster</option>
//               <option value="Zone">Zone</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-52">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | HierarchyStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="BLOCKED">Blocked</option>
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
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">
//             {filteredNodes.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{nodes.length}</span>{" "}
//           hierarchy nodes
//         </p>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <h2 className="text-lg font-bold text-slate-900">Hierarchy Flow</h2>
//         <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
//           <FlowNode title="State" value={summary.states} />
//           <FlowArrow />
//           <FlowNode title="District" value={summary.districts} />
//           <FlowArrow />
//           <FlowNode title="Pincode" value={summary.pincodes} />
//           <FlowArrow />
//           <FlowNode title="Cluster" value={summary.clusters} />
//           <FlowArrow />
//           <FlowNode title="Zone" value={summary.zones} />
//         </div>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">
//             Hierarchy Node Directory
//           </h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {[
//                   "Node",
//                   "Type",
//                   "Parent",
//                   "Status",
//                   "Children",
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
//               {loading && filteredNodes.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={10}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading hierarchy…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredNodes.map((node) => (
//                   <tr key={node.id} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">
//                         {node.name}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
//                           node.type
//                         )}`}
//                       >
//                         {node.type}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">
//                       {node.parent}
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           node.status
//                         )}`}
//                       >
//                         {node.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.children)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.vendors)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.captains)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.customers)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(node.orders)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => openDetails(node)}
//                           className="text-sm font-semibold text-orange-600"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => openStatus(node)}
//                           className="text-sm font-semibold text-slate-600"
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
//         {!loading && filteredNodes.length === 0 && <EmptyState />}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filteredNodes.map((node) => (
//           <div key={node.id} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">{node.name}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{node.id}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   node.status
//                 )}`}
//               >
//                 {node.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => openDetails(node)}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
//               >
//                 View Details
//               </button>
//               <button
//                 type="button"
//                 onClick={() => openStatus(node)}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">Hierarchy Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Create writes ACTIVE nodes to Firestore. Creating a district
//           increments the parent state&apos;s districtCount; creating a pincode
//           increments the parent district&apos;s pincodeCount. Status changes are
//           persisted to Firestore.
//         </p>
//       </div>

//       {showDetails && selectedNode && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5">
//               <div>
//                 <h2 className="text-xl font-bold">{selectedNode.name}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selectedNode.id}</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="text-2xl text-slate-400"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-4 p-5">
//               <InfoItem label="Type" value={selectedNode.type} />
//               <InfoItem label="Parent" value={selectedNode.parent} />
//               <InfoItem label="Status" value={selectedNode.status} />
//               <InfoItem label="Updated" value={selectedNode.updatedAt} />
//               <InfoItem
//                 label="Children"
//                 value={formatNumber(selectedNode.children)}
//               />
//               <InfoItem
//                 label="Vendors"
//                 value={formatNumber(selectedNode.vendors)}
//               />
//               <InfoItem
//                 label="Captains"
//                 value={formatNumber(selectedNode.captains)}
//               />
//               <InfoItem
//                 label="Customers"
//                 value={formatNumber(selectedNode.customers)}
//               />
//               <InfoItem
//                 label="Orders"
//                 value={formatNumber(selectedNode.orders)}
//               />
//             </div>
//             <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
//               <button
//                 type="button"
//                 onClick={() => setShowDetails(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowDetails(false);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Manage Status
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && selectedNode && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage Node Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selectedNode.name}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map(
//                 (s) => (
//                   <button
//                     key={s}
//                     type="button"
//                     onClick={() => void updateStatus(s)}
//                     className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
//                       selectedNode.status === s
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     {s}
//                   </button>
//                 )
//               )}
//             </div>
//             <p className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
//               Status is written to Firestore. Ensure security rules allow admin
//               updates on hierarchy collections.
//             </p>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <NodeCreateModal
//         isOpen={showCreateModal}
//         onClose={() => setShowCreateModal(false)}
//         onSubmit={handleCreateNode}
//         states={stateOptions}
//         districts={districtOptions}
//         loading={createLoading}
//         defaultNodeType="STATE"
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

// function HierarchyLink({
//   href,
//   title,
//   description,
//   value,
//   icon,
// }: {
//   href: string;
//   title: string;
//   description: string;
//   value: number;
//   icon: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
//     >
//       <div className="flex items-start justify-between">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700">
//           {icon}
//         </div>
//         <span className="text-lg text-slate-300 group-hover:text-orange-500">
//           →
//         </span>
//       </div>
//       <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
//       <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
//       <p className="mt-3 text-lg font-bold text-orange-600">
//         {formatNumber(value)}
//       </p>
//     </Link>
//   );
// }

// function FlowNode({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center md:w-36">
//       <p className="text-xs font-semibold text-slate-500">{title}</p>
//       <p className="mt-1 text-xl font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>
//     </div>
//   );
// }

// function FlowArrow() {
//   return (
//     <div className="rotate-90 text-xl font-bold text-orange-400 md:rotate-0">
//       →
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

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <p className="text-sm font-bold text-slate-800">No hierarchy nodes found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty collections or filters too narrow.
//       </p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useHierarchy, {
  type HierarchyNode,
  type HierarchyStatus,
  useStates,
  useDistricts,
  usePincodes,
  useClusters,
  useZones,
} from "@/hooks/useHierarchy";
import useAuthScope from "@/hooks/useAuthScope";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";
import NodeCreateModal, {
  type HierarchyNodeCreateData,
} from "@/components/hierarchy/NodeCreateModal";
import {
  FIRESTORE_COLLECTIONS,
  createDocumentWithId,
  getDocument,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";
import {
  cascadeStateStatus,
  cascadeDistrictStatus,
} from "@/lib/hierarchy/cascadeStatus";
import {
  filterStatesByScope,
  filterDistrictsByScope,
  filterPincodesByScope,
  filterByStateAndDistrict,
  getCreateCapabilities,
  type HierarchyScopeFilter,
} from "@/lib/hierarchy/scopeFilter";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getStatusClasses(status: HierarchyStatus) {
  if (status === "ACTIVE") return "bg-green-100 text-green-700";
  if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
  return "bg-red-100 text-red-700";
}

function getTypeClasses(type: string) {
  switch (type) {
    case "State":
      return "bg-blue-100 text-blue-700";
    case "District":
      return "bg-orange-100 text-orange-700";
    case "Pincode":
      return "bg-green-100 text-green-700";
    case "Cluster":
      return "bg-purple-100 text-purple-700";
    case "Zone":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

async function incrementParentCount(
  collectionName: (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS],
  documentId: string,
  field: string
) {
  if (!documentId) return;
  try {
    const parent = await getDocument<Record<string, unknown>>(
      collectionName,
      documentId
    );
    const current = Number(parent?.[field] ?? 0);
    await updateDocument(collectionName, documentId, {
      [field]: (Number.isFinite(current) ? current : 0) + 1,
    });
  } catch (err) {
    console.warn(`Failed to increment ${field} on ${documentId}:`, err);
  }
}

export default function HierarchyPage() {
  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = {
    role: auth.role,
    stateId: auth.stateId,
    districtId: auth.districtId,
    isGlobalAdmin: auth.isGlobalAdmin,
  };

  const { nodes, loading, error, demoMode, refresh } = useHierarchy();
  const { states } = useStates();
  const { districts } = useDistricts();
  const { pincodes } = usePincodes();
  const { clusters } = useClusters();
  const { zones } = useZones();

  const scopedStates = useMemo(
    () => filterStatesByScope(states, scopeFilter),
    [states, scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin]
  );
  const scopedDistricts = useMemo(
    () => filterDistrictsByScope(districts, scopeFilter),
    [districts, scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin]
  );
  const scopedPincodes = useMemo(
    () => filterPincodesByScope(pincodes, scopeFilter),
    [pincodes, scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin]
  );
  const scopedClusters = useMemo(
    () => filterByStateAndDistrict(clusters, scopeFilter),
    [clusters, scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin]
  );
  const scopedZones = useMemo(
    () => filterByStateAndDistrict(zones, scopeFilter),
    [zones, scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin]
  );

  /** Rebuild node list from scoped collections so role filter is consistent */
  const scopedNodes = useMemo(() => {
    const stateIds = new Set(scopedStates.map((s) => s.stateId));
    const districtIds = new Set(scopedDistricts.map((d) => d.districtId));
    const pincodeIds = new Set(scopedPincodes.map((p) => p.pincode));
    const clusterIds = new Set(scopedClusters.map((c) => c.clusterId));
    const zoneIds = new Set(scopedZones.map((z) => z.zoneId));

    return nodes.filter((n) => {
      if (n.type === "State") return stateIds.has(n.id);
      if (n.type === "District") return districtIds.has(n.id);
      if (n.type === "Pincode") return pincodeIds.has(n.id);
      if (n.type === "Cluster") return clusterIds.has(n.id);
      if (n.type === "Zone") return zoneIds.has(n.id);
      return false;
    });
  }, [nodes, scopedStates, scopedDistricts, scopedPincodes, scopedClusters, scopedZones]);

  const createCaps = useMemo(
    () => getCreateCapabilities(scopeFilter, auth.scope?.name),
    [scopeFilter.role, scopeFilter.stateId, scopeFilter.districtId, scopeFilter.isGlobalAdmin, auth.scope?.name]
  );

  const canCreateAny =
    createCaps.canCreateState ||
    createCaps.canCreateDistrict ||
    createCaps.canCreatePincode;

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
  const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredNodes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return scopedNodes.filter((node) => {
      const matchesSearch =
        !q ||
        node.id.toLowerCase().includes(q) ||
        node.name.toLowerCase().includes(q) ||
        node.type.toLowerCase().includes(q) ||
        node.parent.toLowerCase().includes(q);
      const matchesType = typeFilter === "ALL" || node.type === typeFilter;
      const matchesStatus =
        statusFilter === "ALL" || node.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [scopedNodes, search, typeFilter, statusFilter]);

  const summary = useMemo(
    () => ({
      total: scopedNodes.length,
      active: scopedNodes.filter((n) => n.status === "ACTIVE").length,
      inactive: scopedNodes.filter((n) => n.status === "INACTIVE").length,
      blocked: scopedNodes.filter((n) => n.status === "BLOCKED").length,
      states: scopedNodes.filter((n) => n.type === "State").length,
      districts: scopedNodes.filter((n) => n.type === "District").length,
      pincodes: scopedNodes.filter((n) => n.type === "Pincode").length,
      clusters: scopedNodes.filter((n) => n.type === "Cluster").length,
      zones: scopedNodes.filter((n) => n.type === "Zone").length,
    }),
    [scopedNodes]
  );

  const stateOptions = useMemo(
    () =>
      scopedStates.map((s) => ({
        id: s.stateId,
        name: s.stateName,
        code: s.code,
      })),
    [scopedStates]
  );

  const districtOptions = useMemo(
    () =>
      scopedDistricts.map((d) => ({
        id: d.districtId,
        name: d.districtName,
        code: d.code,
      })),
    [scopedDistricts]
  );

  function clearFilters() {
    setSearch("");
    setTypeFilter("ALL");
    setStatusFilter("ALL");
  }

  function openDetails(node: HierarchyNode) {
    setSelectedNode(node);
    setShowDetails(true);
  }

  function openStatus(node: HierarchyNode) {
    setSelectedNode(node);
    setShowStatusModal(true);
  }

  async function updateStatus(newStatus: HierarchyStatus) {
    if (!selectedNode) return;

    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    const collectionName =
      selectedNode.type === "State"
        ? FIRESTORE_COLLECTIONS.STATES
        : selectedNode.type === "District"
          ? FIRESTORE_COLLECTIONS.DISTRICTS
          : selectedNode.type === "Pincode"
            ? FIRESTORE_COLLECTIONS.PINCODES
            : selectedNode.type === "Cluster"
              ? FIRESTORE_COLLECTIONS.CLUSTERS
              : selectedNode.type === "Zone"
                ? FIRESTORE_COLLECTIONS.ZONES
                : null;

    if (!collectionName) {
      setSuccessMessage("Unknown node type — cannot update status.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    try {
      await updateDocument(collectionName, selectedNode.id, {
        status: newStatus,
      });

      let cascadeNote = "";

      if (
        selectedNode.type === "State" &&
        (newStatus === "INACTIVE" || newStatus === "BLOCKED")
      ) {
        const result = await cascadeStateStatus(
          selectedNode.id,
          selectedNode.name,
          newStatus
        );
        cascadeNote = ` Cascaded → ${result.districts} districts, ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
      }

      if (
        selectedNode.type === "District" &&
        (newStatus === "INACTIVE" || newStatus === "BLOCKED")
      ) {
        const result = await cascadeDistrictStatus(
          selectedNode.id,
          selectedNode.name,
          newStatus
        );
        cascadeNote = ` Cascaded → ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
      }

      setSelectedNode({
        ...selectedNode,
        status: newStatus,
        updatedAt: "Just now",
      });
      setShowStatusModal(false);
      setSuccessMessage(
        `${selectedNode.name}: status updated to ${newStatus}.${cascadeNote}`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      await refresh();
    } catch (err) {
      setSuccessMessage(
        err instanceof Error
          ? err.message
          : "Failed to update status (check Firestore rules)."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    }
  }

  async function handleCreateNode(data: HierarchyNodeCreateData) {
    if (isFirestoreDemoMode) {
      throw new Error("Writes are disabled in demo mode.");
    }

    if (data.nodeType === "STATE" && !createCaps.canCreateState) {
      throw new Error("Your role cannot create states.");
    }
    if (data.nodeType === "DISTRICT" && !createCaps.canCreateDistrict) {
      throw new Error("Your role cannot create districts.");
    }
    if (data.nodeType === "PINCODE" && !createCaps.canCreatePincode) {
      throw new Error("Your role cannot create pincodes.");
    }

    // Force locked scope for state/district admins
    if (createCaps.lockedStateId && data.nodeType !== "STATE") {
      data.stateId = createCaps.lockedStateId;
      if (createCaps.lockedStateName) data.stateName = createCaps.lockedStateName;
    }
    if (createCaps.lockedDistrictId && data.nodeType === "PINCODE") {
      data.districtId = createCaps.lockedDistrictId;
      if (createCaps.lockedDistrictName) {
        data.districtName = createCaps.lockedDistrictName;
      }
    }

    setCreateLoading(true);
    try {
      if (data.nodeType === "STATE") {
        const id = data.nodeCode.toLowerCase();
        await createDocumentWithId(FIRESTORE_COLLECTIONS.STATES, id, {
          stateId: id,
          stateName: data.nodeName,
          code: data.nodeCode,
          status: "ACTIVE",
          country: "India",
          districtCount: 0,
          vendorCount: 0,
          captainCount: 0,
          customerCount: 0,
          orderCount: 0,
          description: data.description ?? null,
        });
      } else if (data.nodeType === "DISTRICT") {
        if (!data.stateId) {
          throw new Error("State is required to create a district.");
        }

        const id = `${data.stateId}_${data.nodeCode}`.toLowerCase();
        await createDocumentWithId(FIRESTORE_COLLECTIONS.DISTRICTS, id, {
          districtId: id,
          districtName: data.nodeName,
          code: data.nodeCode,
          stateId: data.stateId,
          stateName: data.stateName,
          status: "ACTIVE",
          pincodeCount: 0,
          vendorCount: 0,
          captainCount: 0,
          customerCount: 0,
          orderCount: 0,
          description: data.description ?? null,
        });

        await incrementParentCount(
          FIRESTORE_COLLECTIONS.STATES,
          data.stateId,
          "districtCount"
        );
      } else if (data.nodeType === "PINCODE") {
        if (!data.pincode) {
          throw new Error("Pincode is required.");
        }
        if (!data.districtId) {
          throw new Error("District is required to create a pincode.");
        }

        const id = data.pincode;
        await createDocumentWithId(FIRESTORE_COLLECTIONS.PINCODES, id, {
          pincode: id,
          areaName: data.nodeName,
          stateId: data.stateId,
          stateName: data.stateName,
          districtId: data.districtId,
          districtName: data.districtName,
          status: "ACTIVE",
          vendorCount: 0,
          captainCount: 0,
          customerCount: 0,
          orderCount: 0,
          description: data.description ?? null,
        });

        await incrementParentCount(
          FIRESTORE_COLLECTIONS.DISTRICTS,
          data.districtId,
          "pincodeCount"
        );
      }

      setShowCreateModal(false);
      setSuccessMessage(`${data.nodeName} created successfully.`);
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
          <span className="font-semibold text-slate-800">Hierarchy</span>
          <ScopeBadge />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                ◎
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Hierarchy Management
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live data scoped to your role
                  {auth.scope?.name ? ` (${auth.scope.name})` : ""}.
                  {demoMode ? " (demo mode — writes disabled)" : ""}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void refresh()}
                disabled={loading}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
              >
                {loading ? "Refreshing…" : "Refresh"}
              </button>
              {canCreateAny && (
                <button
                  type="button"
                  onClick={() => setShowCreateModal(true)}
                  className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
                >
                  + Create Node
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
      {auth.error && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Auth scope: {auth.error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <SummaryCard title="Total Nodes" value={summary.total} />
        <SummaryCard title="Active" value={summary.active} />
        <SummaryCard title="Inactive" value={summary.inactive} />
        <SummaryCard title="Blocked" value={summary.blocked} />
        <SummaryCard title="States" value={summary.states} />
        <SummaryCard title="Districts" value={summary.districts} />
        <SummaryCard title="Clusters" value={summary.clusters} />
        <SummaryCard title="Zones" value={summary.zones} />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Hierarchy Sections</h2>
          <p className="mt-1 text-xs text-slate-500">
            Open each hierarchy level for detailed management (role-scoped).
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <HierarchyLink
            href="/hierarchy/states"
            title="States"
            description="Manage state-level scope."
            value={summary.states}
            icon="S"
          />
          <HierarchyLink
            href="/hierarchy/districts"
            title="Districts"
            description="Manage district-level scope."
            value={summary.districts}
            icon="D"
          />
          <HierarchyLink
            href="/hierarchy/pincodes"
            title="Pincodes"
            description="Manage pincode coverage."
            value={summary.pincodes}
            icon="P"
          />
          <HierarchyLink
            href="/hierarchy/clusters"
            title="Clusters"
            description="Manage hierarchy clusters."
            value={summary.clusters}
            icon="C"
          />
          <HierarchyLink
            href="/hierarchy/zones"
            title="Zones"
            description="Manage operational zones."
            value={summary.zones}
            icon="Z"
          />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search Hierarchy
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ID, name, type or parent..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="w-full xl:w-52">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Node Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Types</option>
              <option value="State">State</option>
              <option value="District">District</option>
              <option value="Pincode">Pincode</option>
              <option value="Cluster">Cluster</option>
              <option value="Zone">Zone</option>
            </select>
          </div>
          <div className="w-full xl:w-52">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | HierarchyStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
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
        <p className="mt-4 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredNodes.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{scopedNodes.length}</span>{" "}
          hierarchy nodes (your scope)
        </p>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Hierarchy Flow</h2>
        <div className="mt-6 flex flex-col items-center gap-3 md:flex-row md:justify-center">
          <FlowNode title="State" value={summary.states} />
          <FlowArrow />
          <FlowNode title="District" value={summary.districts} />
          <FlowArrow />
          <FlowNode title="Pincode" value={summary.pincodes} />
          <FlowArrow />
          <FlowNode title="Cluster" value={summary.clusters} />
          <FlowArrow />
          <FlowNode title="Zone" value={summary.zones} />
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            Hierarchy Node Directory
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "Node",
                  "Type",
                  "Parent",
                  "Status",
                  "Children",
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
              {loading && filteredNodes.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading hierarchy…
                  </td>
                </tr>
              ) : (
                filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {node.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{node.id}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getTypeClasses(
                          node.type
                        )}`}
                      >
                        {node.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {node.parent}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          node.status
                        )}`}
                      >
                        {node.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(node.children)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(node.vendors)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(node.captains)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(node.customers)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(node.orders)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => openDetails(node)}
                          className="text-sm font-semibold text-orange-600"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openStatus(node)}
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
        {!loading && filteredNodes.length === 0 && <EmptyState />}
      </div>

      <div className="mt-4 space-y-4 md:hidden">
        {filteredNodes.map((node) => (
          <div key={node.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{node.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{node.id}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  node.status
                )}`}
              >
                {node.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => openDetails(node)}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => openStatus(node)}
                className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
              >
                Manage Status
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">Role scoping</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          SUPER_ADMIN sees all. STATE_ADMIN is limited to their stateId claim.
          DISTRICT_ADMIN is limited to their districtId claim. Create is limited
          by role (state admins cannot create states; district admins cannot
          create districts/states).
        </p>
      </div>

      {showDetails && selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold">{selectedNode.name}</h2>
                <p className="mt-1 text-xs text-slate-400">{selectedNode.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                className="text-2xl text-slate-400"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 p-5">
              <InfoItem label="Type" value={selectedNode.type} />
              <InfoItem label="Parent" value={selectedNode.parent} />
              <InfoItem label="Status" value={selectedNode.status} />
              <InfoItem label="Updated" value={selectedNode.updatedAt} />
              <InfoItem
                label="Children"
                value={formatNumber(selectedNode.children)}
              />
              <InfoItem
                label="Vendors"
                value={formatNumber(selectedNode.vendors)}
              />
              <InfoItem
                label="Captains"
                value={formatNumber(selectedNode.captains)}
              />
              <InfoItem
                label="Customers"
                value={formatNumber(selectedNode.customers)}
              />
              <InfoItem
                label="Orders"
                value={formatNumber(selectedNode.orders)}
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-200 p-5">
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

      {showStatusModal && selectedNode && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Manage Node Status</h2>
            <p className="mt-1 text-sm text-slate-500">{selectedNode.name}</p>
            <div className="mt-6 space-y-3">
              {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void updateStatus(s)}
                    className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
                      selectedNode.status === s
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="mt-4 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {canCreateAny && (
        <NodeCreateModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateNode}
          states={stateOptions}
          districts={districtOptions}
          loading={createLoading}
          defaultNodeType={
            createCaps.canCreateState
              ? "STATE"
              : createCaps.canCreateDistrict
                ? "DISTRICT"
                : "PINCODE"
          }
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

function HierarchyLink({
  href,
  title,
  description,
  value,
  icon,
}: {
  href: string;
  title: string;
  description: string;
  value: number;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 p-4 transition hover:border-orange-300 hover:bg-orange-50"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700 group-hover:bg-orange-100 group-hover:text-orange-700">
          {icon}
        </div>
        <span className="text-lg text-slate-300 group-hover:text-orange-500">
          →
        </span>
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      <p className="mt-3 text-lg font-bold text-orange-600">
        {formatNumber(value)}
      </p>
    </Link>
  );
}

function FlowNode({ title, value }: { title: string; value: number }) {
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-center md:w-36">
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-bold text-slate-900">
        {formatNumber(value)}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="rotate-90 text-xl font-bold text-orange-400 md:rotate-0">
      →
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
      <p className="text-sm font-bold text-slate-800">No hierarchy nodes found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty collections, filters too narrow, or outside your role scope.
      </p>
    </div>
  );
}