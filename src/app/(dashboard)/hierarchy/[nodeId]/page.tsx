// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";

// type NodeType =
//   | "ROOT"
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE";

// type NodeStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED";

// type EntityStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// type HierarchyNode = {
//   nodeId: string;
//   nodeType: NodeType;
//   name: string;
//   code: string;
//   status: NodeStatus;
//   parentNodeId?: string;
//   parentName?: string;
//   stateId?: string;
//   stateName?: string;
//   districtId?: string;
//   districtName?: string;
//   pincode?: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
//   childCount: number;
//   vendorCount: number;
//   captainCount: number;
//   customerCount: number;
//   orderCount: number;
// };

// type ScopedEntity = {
//   id: string;
//   name: string;
//   type: "VENDOR" | "CAPTAIN" | "CUSTOMER";
//   status: EntityStatus;
//   phone: string;
//   module?: string;
//   joinedAt: string;
// };

// const INITIAL_NODE: HierarchyNode = {
//   nodeId: "STATE-AP",
//   nodeType: "STATE",
//   name: "Andhra Pradesh",
//   code: "AP",
//   status: "ACTIVE",
//   parentNodeId: "ROOT",
//   parentName: "JUONE India",
//   stateId: "STATE-AP",
//   stateName: "Andhra Pradesh",
//   description:
//     "State-level administrative scope for JUONE operations in Andhra Pradesh.",
//   createdAt: "01 Jan 2026",
//   updatedAt: "05 Oct 2026",
//   childCount: 4,
//   vendorCount: 128,
//   captainCount: 246,
//   customerCount: 18450,
//   orderCount: 32580,
// };

// const INITIAL_CHILD_NODES: HierarchyNode[] = [
//   {
//     nodeId: "DIST-GNT",
//     nodeType: "DISTRICT",
//     name: "Guntur",
//     code: "GNT",
//     status: "ACTIVE",
//     parentNodeId: "STATE-AP",
//     parentName: "Andhra Pradesh",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-GNT",
//     districtName: "Guntur",
//     description: "District operational scope.",
//     createdAt: "02 Jan 2026",
//     updatedAt: "05 Oct 2026",
//     childCount: 6,
//     vendorCount: 42,
//     captainCount: 78,
//     customerCount: 6240,
//     orderCount: 11480,
//   },
//   {
//     nodeId: "DIST-KNL",
//     nodeType: "DISTRICT",
//     name: "Kurnool",
//     code: "KNL",
//     status: "ACTIVE",
//     parentNodeId: "STATE-AP",
//     parentName: "Andhra Pradesh",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-KNL",
//     districtName: "Kurnool",
//     description: "District operational scope.",
//     createdAt: "03 Jan 2026",
//     updatedAt: "05 Oct 2026",
//     childCount: 5,
//     vendorCount: 31,
//     captainCount: 61,
//     customerCount: 4810,
//     orderCount: 8360,
//   },
//   {
//     nodeId: "DIST-VJA",
//     nodeType: "DISTRICT",
//     name: "NTR",
//     code: "NTR",
//     status: "ACTIVE",
//     parentNodeId: "STATE-AP",
//     parentName: "Andhra Pradesh",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VJA",
//     districtName: "NTR",
//     description: "District operational scope.",
//     createdAt: "05 Jan 2026",
//     updatedAt: "05 Oct 2026",
//     childCount: 8,
//     vendorCount: 38,
//     captainCount: 74,
//     customerCount: 5290,
//     orderCount: 9040,
//   },
//   {
//     nodeId: "DIST-VSP",
//     nodeType: "DISTRICT",
//     name: "Visakhapatnam",
//     code: "VSP",
//     status: "ACTIVE",
//     parentNodeId: "STATE-AP",
//     parentName: "Andhra Pradesh",
//     stateId: "STATE-AP",
//     stateName: "Andhra Pradesh",
//     districtId: "DIST-VSP",
//     districtName: "Visakhapatnam",
//     description: "District operational scope.",
//     createdAt: "07 Jan 2026",
//     updatedAt: "05 Oct 2026",
//     childCount: 9,
//     vendorCount: 17,
//     captainCount: 33,
//     customerCount: 2110,
//     orderCount: 3700,
//   },
// ];

// const INITIAL_ENTITIES: ScopedEntity[] = [
//   {
//     id: "VEN-GNT-001",
//     name: "Guntur Food Hub",
//     type: "VENDOR",
//     status: "ACTIVE",
//     phone: "+91 9876543210",
//     module: "FOOD",
//     joinedAt: "12 Feb 2026",
//   },
//   {
//     id: "VEN-GNT-002",
//     name: "AP Mart Store",
//     type: "VENDOR",
//     status: "ACTIVE",
//     phone: "+91 9876543211",
//     module: "MART",
//     joinedAt: "18 Feb 2026",
//   },
//   {
//     id: "CAP-AP-1001",
//     name: "Ravi Kumar",
//     type: "CAPTAIN",
//     status: "ACTIVE",
//     phone: "+91 9876543220",
//     joinedAt: "20 Feb 2026",
//   },
//   {
//     id: "CAP-AP-1002",
//     name: "Suresh Babu",
//     type: "CAPTAIN",
//     status: "ACTIVE",
//     phone: "+91 9876543221",
//     joinedAt: "22 Feb 2026",
//   },
//   {
//     id: "CUS-AP-10001",
//     name: "Priya",
//     type: "CUSTOMER",
//     status: "ACTIVE",
//     phone: "+91 9876543230",
//     joinedAt: "25 Feb 2026",
//   },
//   {
//     id: "CUS-AP-10002",
//     name: "Anil",
//     type: "CUSTOMER",
//     status: "ACTIVE",
//     phone: "+91 9876543231",
//     joinedAt: "27 Feb 2026",
//   },
// ];

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getNodeTypeClasses(type: NodeType) {
//   switch (type) {
//     case "ROOT":
//       return "bg-purple-100 text-purple-700";

//     case "STATE":
//       return "bg-blue-100 text-blue-700";

//     case "DISTRICT":
//       return "bg-orange-100 text-orange-700";

//     case "PINCODE":
//       return "bg-green-100 text-green-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getStatusClasses(status: NodeStatus | EntityStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     case "SUSPENDED":
//       return "bg-yellow-100 text-yellow-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getEntityTypeClasses(type: ScopedEntity["type"]) {
//   switch (type) {
//     case "VENDOR":
//       return "bg-orange-100 text-orange-700";

//     case "CAPTAIN":
//       return "bg-blue-100 text-blue-700";

//     case "CUSTOMER":
//       return "bg-purple-100 text-purple-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function HierarchyNodePage() {
//   const params = useParams();

//   const nodeId = String(
//     params?.nodeId || INITIAL_NODE.nodeId
//   );

//   const [node, setNode] =
//     useState<HierarchyNode>(INITIAL_NODE);

//   const [children] = useState<HierarchyNode[]>(
//     INITIAL_CHILD_NODES
//   );

//   const [entities] =
//     useState<ScopedEntity[]>(INITIAL_ENTITIES);

//   const [activeTab, setActiveTab] = useState<
//     "OVERVIEW" | "CHILDREN" | "ENTITIES" | "ACTIVITY"
//   >("OVERVIEW");

//   const [entityFilter, setEntityFilter] =
//     useState<
//       "ALL" | ScopedEntity["type"]
//     >("ALL");

//   const [search, setSearch] = useState("");

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredEntities = useMemo(() => {
//     const searchValue =
//       search.trim().toLowerCase();

//     return entities.filter((entity) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         entity.id
//           .toLowerCase()
//           .includes(searchValue) ||
//         entity.name
//           .toLowerCase()
//           .includes(searchValue) ||
//         entity.phone
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesType =
//         entityFilter === "ALL" ||
//         entity.type === entityFilter;

//       return (
//         matchesSearch &&
//         matchesType
//       );
//     });
//   }, [entities, search, entityFilter]);

//   function handleStatusChange(
//     status: NodeStatus
//   ) {
//     setNode((current) => ({
//       ...current,
//       status,
//       updatedAt: "05 Oct 2026",
//     }));

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `Node status changed to ${status}. This is currently a UI-only action.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* BREADCRUMB */}

//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">

//         <Link
//           href="/hierarchy"
//           className="font-medium text-slate-500 hover:text-orange-600"
//         >
//           Hierarchy
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <span className="font-medium text-slate-800">
//           {node.name}
//         </span>

//       </div>

//       {/* SUCCESS MESSAGE */}

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* HEADER */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

//           <div className="flex gap-4">

//             <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
//               {node.nodeType === "STATE"
//                 ? "S"
//                 : node.nodeType === "DISTRICT"
//                 ? "D"
//                 : node.nodeType === "PINCODE"
//                 ? "P"
//                 : "R"}
//             </div>

//             <div>

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {node.name}
//                 </h1>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getNodeTypeClasses(
//                     node.nodeType
//                   )}`}
//                 >
//                   {node.nodeType}
//                 </span>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     node.status
//                   )}`}
//                 >
//                   {node.status}
//                 </span>

//               </div>

//               <p className="mt-1 text-sm text-slate-500">
//                 Node ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {nodeId}
//                 </span>
//               </p>

//               <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
//                 {node.description}
//               </p>

//             </div>

//           </div>

//           <div className="flex flex-wrap gap-3">

//             <Link
//               href="/hierarchy"
//               className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               ← Back to Hierarchy
//             </Link>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowStatusModal(true)
//               }
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//             >
//               Manage Status
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* PARENT PATH */}

//       <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

//         <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//           Hierarchy Scope
//         </p>

//         <div className="flex flex-wrap items-center gap-2">

//           <ScopeItem
//             label="JUONE India"
//             active={
//               node.nodeType === "ROOT"
//             }
//           />

//           <ScopeArrow />

//           <ScopeItem
//             label={
//               node.stateName ||
//               "State"
//             }
//             active={
//               node.nodeType === "STATE"
//             }
//           />

//           {node.nodeType !== "STATE" &&
//             node.nodeType !== "ROOT" && (
//               <>
//                 <ScopeArrow />

//                 <ScopeItem
//                   label={
//                     node.districtName ||
//                     "District"
//                   }
//                   active={
//                     node.nodeType ===
//                     "DISTRICT"
//                   }
//                 />
//               </>
//             )}

//           {node.nodeType === "PINCODE" && (
//             <>
//               <ScopeArrow />

//               <ScopeItem
//                 label={
//                   node.pincode ||
//                   node.name
//                 }
//                 active
//               />
//             </>
//           )}

//         </div>

//       </div>

//       {/* STATISTICS */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

//         <StatCard
//           title="Child Nodes"
//           value={formatNumber(node.childCount)}
//           icon="⌂"
//         />

//         <StatCard
//           title="Vendors"
//           value={formatNumber(node.vendorCount)}
//           icon="V"
//         />

//         <StatCard
//           title="Captains"
//           value={formatNumber(node.captainCount)}
//           icon="C"
//         />

//         <StatCard
//           title="Customers"
//           value={formatNumber(node.customerCount)}
//           icon="U"
//         />

//         <StatCard
//           title="Orders"
//           value={formatNumber(node.orderCount)}
//           icon="O"
//         />

//         <StatCard
//           title="Status"
//           value={node.status}
//           icon="✓"
//         />

//       </div>

//       {/* TABS */}

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">

//         <div className="flex min-w-max border-b border-slate-200">

//           <TabButton
//             active={
//               activeTab === "OVERVIEW"
//             }
//             onClick={() =>
//               setActiveTab("OVERVIEW")
//             }
//           >
//             Overview
//           </TabButton>

//           <TabButton
//             active={
//               activeTab === "CHILDREN"
//             }
//             onClick={() =>
//               setActiveTab("CHILDREN")
//             }
//           >
//             Child Nodes
//           </TabButton>

//           <TabButton
//             active={
//               activeTab === "ENTITIES"
//             }
//             onClick={() =>
//               setActiveTab("ENTITIES")
//             }
//           >
//             Scoped Entities
//           </TabButton>

//           <TabButton
//             active={
//               activeTab === "ACTIVITY"
//             }
//             onClick={() =>
//               setActiveTab("ACTIVITY")
//             }
//           >
//             Activity
//           </TabButton>

//         </div>

//       </div>

//       {/* OVERVIEW */}

//       {activeTab === "OVERVIEW" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

//           <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">

//             <h2 className="text-lg font-bold text-slate-900">
//               Node Information
//             </h2>

//             <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

//               <InfoItem
//                 label="Node ID"
//                 value={node.nodeId}
//               />

//               <InfoItem
//                 label="Node Type"
//                 value={node.nodeType}
//               />

//               <InfoItem
//                 label="Node Code"
//                 value={node.code}
//               />

//               <InfoItem
//                 label="Status"
//                 value={node.status}
//               />

//               <InfoItem
//                 label="Parent Node"
//                 value={
//                   node.parentName ||
//                   "JUONE India"
//                 }
//               />

//               <InfoItem
//                 label="Parent Node ID"
//                 value={
//                   node.parentNodeId ||
//                   "ROOT"
//                 }
//               />

//               <InfoItem
//                 label="State"
//                 value={
//                   node.stateName ||
//                   "-"
//                 }
//               />

//               <InfoItem
//                 label="District"
//                 value={
//                   node.districtName ||
//                   "-"
//                 }
//               />

//               <InfoItem
//                 label="Pincode"
//                 value={
//                   node.pincode ||
//                   "-"
//                 }
//               />

//               <InfoItem
//                 label="Created At"
//                 value={node.createdAt}
//               />

//               <InfoItem
//                 label="Updated At"
//                 value={node.updatedAt}
//               />

//             </div>

//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">

//             <h2 className="text-lg font-bold text-slate-900">
//               Scope Summary
//             </h2>

//             <div className="mt-5 space-y-4">

//               <ScopeSummary
//                 label="Vendors"
//                 value={node.vendorCount}
//               />

//               <ScopeSummary
//                 label="Captains"
//                 value={node.captainCount}
//               />

//               <ScopeSummary
//                 label="Customers"
//                 value={node.customerCount}
//               />

//               <ScopeSummary
//                 label="Orders"
//                 value={node.orderCount}
//               />

//             </div>

//           </div>

//         </div>
//       )}

//       {/* CHILDREN */}

//       {activeTab === "CHILDREN" && (
//         <div className="rounded-2xl bg-white shadow-sm">

//           <div className="border-b border-slate-200 p-5">

//             <h2 className="text-lg font-bold text-slate-900">
//               Child Nodes
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Administrative nodes directly under this
//               hierarchy scope.
//             </p>

//           </div>

//           <div className="hidden overflow-x-auto md:block">

//             <table className="w-full text-left">

//               <thead className="bg-slate-50">

//                 <tr>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Node
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Type
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Status
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Vendors
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Captains
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Customers
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Action
//                   </th>

//                 </tr>

//               </thead>

//               <tbody className="divide-y divide-slate-100">

//                 {children.map((child) => (
//                   <tr
//                     key={child.nodeId}
//                     className="hover:bg-slate-50"
//                   >

//                     <td className="px-5 py-4">

//                       <p className="text-sm font-bold text-slate-900">
//                         {child.name}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {child.nodeId}
//                       </p>

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getNodeTypeClasses(
//                           child.nodeType
//                         )}`}
//                       >
//                         {child.nodeType}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           child.status
//                         )}`}
//                       >
//                         {child.status}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(
//                         child.vendorCount
//                       )}
//                     </td>

//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(
//                         child.captainCount
//                       )}
//                     </td>

//                     <td className="px-5 py-4 text-sm font-semibold text-slate-700">
//                       {formatNumber(
//                         child.customerCount
//                       )}
//                     </td>

//                     <td className="px-5 py-4">

//                       <Link
//                         href={`/hierarchy/${child.nodeId}`}
//                         className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         View →
//                       </Link>

//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//           <div className="divide-y divide-slate-100 md:hidden">

//             {children.map((child) => (
//               <div
//                 key={child.nodeId}
//                 className="p-5"
//               >

//                 <div className="flex items-start justify-between gap-3">

//                   <div>

//                     <p className="text-sm font-bold text-slate-900">
//                       {child.name}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {child.nodeId}
//                     </p>

//                   </div>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                       child.status
//                     )}`}
//                   >
//                     {child.status}
//                   </span>

//                 </div>

//                 <div className="mt-4 grid grid-cols-3 gap-3">

//                   <MiniStat
//                     label="Vendors"
//                     value={child.vendorCount}
//                   />

//                   <MiniStat
//                     label="Captains"
//                     value={child.captainCount}
//                   />

//                   <MiniStat
//                     label="Customers"
//                     value={child.customerCount}
//                   />

//                 </div>

//                 <Link
//                   href={`/hierarchy/${child.nodeId}`}
//                   className="mt-4 block text-center text-sm font-semibold text-orange-600"
//                 >
//                   View Node →
//                 </Link>

//               </div>
//             ))}

//           </div>

//         </div>
//       )}

//       {/* ENTITIES */}

//       {activeTab === "ENTITIES" && (
//         <div className="rounded-2xl bg-white shadow-sm">

//           <div className="border-b border-slate-200 p-5">

//             <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Scoped Entities
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Vendors, captains and customers within
//                   this hierarchy scope.
//                 </p>

//               </div>

//               <div className="flex flex-col gap-3 sm:flex-row">

//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(event) =>
//                     setSearch(event.target.value)
//                   }
//                   placeholder="Search entity..."
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />

//                 <select
//                   value={entityFilter}
//                   onChange={(event) =>
//                     setEntityFilter(
//                       event.target.value as
//                         | "ALL"
//                         | ScopedEntity["type"]
//                     )
//                   }
//                   className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 >
//                   <option value="ALL">
//                     All Entities
//                   </option>

//                   <option value="VENDOR">
//                     Vendors
//                   </option>

//                   <option value="CAPTAIN">
//                     Captains
//                   </option>

//                   <option value="CUSTOMER">
//                     Customers
//                   </option>
//                 </select>

//               </div>

//             </div>

//           </div>

//           <div className="hidden overflow-x-auto md:block">

//             <table className="w-full text-left">

//               <thead className="bg-slate-50">

//                 <tr>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Entity
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Type
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Phone
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Module
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Status
//                   </th>

//                   <th className="px-5 py-4 text-xs font-bold uppercase text-slate-500">
//                     Joined
//                   </th>

//                 </tr>

//               </thead>

//               <tbody className="divide-y divide-slate-100">

//                 {filteredEntities.map((entity) => (
//                   <tr
//                     key={entity.id}
//                     className="hover:bg-slate-50"
//                   >

//                     <td className="px-5 py-4">

//                       <p className="text-sm font-bold text-slate-900">
//                         {entity.name}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {entity.id}
//                       </p>

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityTypeClasses(
//                           entity.type
//                         )}`}
//                       >
//                         {entity.type}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4 text-sm text-slate-600">
//                       {entity.phone}
//                     </td>

//                     <td className="px-5 py-4 text-sm text-slate-600">
//                       {entity.module || "-"}
//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           entity.status
//                         )}`}
//                       >
//                         {entity.status}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4 text-sm text-slate-500">
//                       {entity.joinedAt}
//                     </td>

//                   </tr>
//                 ))}

//               </tbody>

//             </table>

//           </div>

//           <div className="divide-y divide-slate-100 md:hidden">

//             {filteredEntities.map((entity) => (
//               <div
//                 key={entity.id}
//                 className="p-5"
//               >

//                 <div className="flex items-start justify-between gap-3">

//                   <div>

//                     <p className="text-sm font-bold text-slate-900">
//                       {entity.name}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {entity.id}
//                     </p>

//                   </div>

//                   <span
//                     className={`rounded-full px-2 py-1 text-[10px] font-semibold ${getStatusClasses(
//                       entity.status
//                     )}`}
//                   >
//                     {entity.status}
//                   </span>

//                 </div>

//                 <div className="mt-4 space-y-2 text-xs">

//                   <p className="text-slate-500">
//                     <span className="font-semibold text-slate-700">
//                       Type:
//                     </span>{" "}
//                     {entity.type}
//                   </p>

//                   <p className="text-slate-500">
//                     <span className="font-semibold text-slate-700">
//                       Phone:
//                     </span>{" "}
//                     {entity.phone}
//                   </p>

//                   <p className="text-slate-500">
//                     <span className="font-semibold text-slate-700">
//                       Module:
//                     </span>{" "}
//                     {entity.module || "-"}
//                   </p>

//                 </div>

//               </div>
//             ))}

//             {filteredEntities.length === 0 && (
//               <EmptyState />
//             )}

//           </div>

//         </div>
//       )}

//       {/* ACTIVITY */}

//       {activeTab === "ACTIVITY" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

//           <div className="rounded-2xl bg-white p-6 shadow-sm">

//             <h2 className="text-lg font-bold text-slate-900">
//               Node Activity
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Administrative activity associated with
//               this hierarchy node.
//             </p>

//             <div className="mt-6 space-y-5">

//               <ActivityItem
//                 title="Node scope updated"
//                 description="Administrative scope was reviewed."
//                 time="05 Oct 2026, 09:20 AM"
//               />

//               <ActivityItem
//                 title="Vendor count synchronized"
//                 description="Vendor scope statistics were refreshed."
//                 time="05 Oct 2026, 10:15 AM"
//               />

//               <ActivityItem
//                 title="Captain count synchronized"
//                 description="Captain scope statistics were refreshed."
//                 time="05 Oct 2026, 11:10 AM"
//               />

//               <ActivityItem
//                 title="Hierarchy audit completed"
//                 description="Scope validation completed successfully."
//                 time="05 Oct 2026, 01:30 PM"
//               />

//             </div>

//           </div>

//           <div className="rounded-2xl bg-white p-6 shadow-sm">

//             <h2 className="text-lg font-bold text-slate-900">
//               Governance Scope
//             </h2>

//             <div className="mt-5 space-y-4">

//               <GovernanceItem
//                 title="Administrative Scope"
//                 description="Actions are limited to the authenticated administrator's hierarchy scope."
//               />

//               <GovernanceItem
//                 title="Entity Visibility"
//                 description="Vendors, captains, customers and operational records must respect scope authorization."
//               />

//               <GovernanceItem
//                 title="No Impersonation"
//                 description="Higher-level administrators drill into lower scopes without impersonating another administrator."
//               />

//               <GovernanceItem
//                 title="Authoritative Backend"
//                 description="Hierarchy permissions and sensitive changes must be enforced by trusted backend rules."
//               />

//             </div>

//           </div>

//         </div>
//       )}

//       {/* GOVERNANCE NOTE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           JUERP Hierarchy Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           This screen represents hierarchy scope and
//           administrative visibility. The browser must not
//           become the authority for permissions, financial
//           rules, verification, commission, settlement,
//           pricing, or other protected business operations.
//           Authenticated claims and authoritative hierarchy
//           records must enforce State, District and Pincode
//           scope on the backend.
//         </p>

//         <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceBox
//             title="SUPER_ADMIN"
//             description="Global administrative scope."
//           />

//           <GovernanceBox
//             title="STATE_ADMIN"
//             description="State-scoped administrative control."
//           />

//           <GovernanceBox
//             title="DISTRICT_ADMIN"
//             description="District-scoped administrative control."
//           />

//           <GovernanceBox
//             title="PINCODE_SCOPE"
//             description="Localized operational scope."
//           />

//         </div>

//       </div>

//       {/* STATUS MODAL */}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Manage Node Status
//                 </h2>

//                 <p className="mt-1 text-sm text-slate-500">
//                   Select the status for {node.name}.
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

//             <div className="mt-6 space-y-3">

//               <StatusButton
//                 label="Active"
//                 description="Node is operational."
//                 active={node.status === "ACTIVE"}
//                 onClick={() =>
//                   handleStatusChange("ACTIVE")
//                 }
//               />

//               <StatusButton
//                 label="Inactive"
//                 description="Node is temporarily inactive."
//                 active={
//                   node.status === "INACTIVE"
//                 }
//                 onClick={() =>
//                   handleStatusChange("INACTIVE")
//                 }
//               />

//               <StatusButton
//                 label="Blocked"
//                 description="Node access is blocked."
//                 active={
//                   node.status === "BLOCKED"
//                 }
//                 onClick={() =>
//                   handleStatusChange("BLOCKED")
//                 }
//               />

//             </div>

//             <div className="mt-5 rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
//               In the current implementation this changes
//               only the local UI state. Production status
//               changes must be authorized and persisted by
//               the trusted backend/JUERP governance layer.
//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// function StatCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: string;
//   icon: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-[11px] font-medium text-slate-500">
//             {title}
//           </p>

//           <p className="mt-2 text-lg font-bold text-slate-900">
//             {value}
//           </p>

//         </div>

//         <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-600">
//           {icon}
//         </div>

//       </div>

//     </div>
//   );
// }

// function ScopeItem({
//   label,
//   active,
// }: {
//   label: string;
//   active: boolean;
// }) {
//   return (
//     <div
//       className={`rounded-lg px-3 py-2 text-xs font-semibold ${
//         active
//           ? "bg-orange-100 text-orange-700"
//           : "bg-slate-100 text-slate-600"
//       }`}
//     >
//       {label}
//     </div>
//   );
// }

// function ScopeArrow() {
//   return (
//     <span className="text-slate-400">
//       →
//     </span>
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

//       <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function ScopeSummary({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="flex items-center justify-between border-b border-slate-100 pb-3">

//       <span className="text-sm text-slate-500">
//         {label}
//       </span>

//       <span className="text-sm font-bold text-slate-900">
//         {formatNumber(value)}
//       </span>

//     </div>
//   );
// }

// function MiniStat({
//   label,
//   value,
// }: {
//   label: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-lg bg-slate-50 p-3">

//       <p className="text-[10px] text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function TabButton({
//   active,
//   onClick,
//   children,
// }: {
//   active: boolean;
//   onClick: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
//         active
//           ? "border-orange-500 text-orange-600"
//           : "border-transparent text-slate-500 hover:text-slate-800"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// function ActivityItem({
//   title,
//   description,
//   time,
// }: {
//   title: string;
//   description: string;
//   time: string;
// }) {
//   return (
//     <div className="flex gap-3">

//       <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500" />

//       <div>

//         <p className="text-sm font-semibold text-slate-800">
//           {title}
//         </p>

//         <p className="mt-1 text-xs leading-5 text-slate-500">
//           {description}
//         </p>

//         <p className="mt-1 text-[10px] text-slate-400">
//           {time}
//         </p>

//       </div>

//     </div>
//   );
// }

// function GovernanceItem({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 p-4">

//       <p className="text-sm font-bold text-slate-800">
//         {title}
//       </p>

//       <p className="mt-1 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function GovernanceBox({
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

// function StatusButton({
//   label,
//   description,
//   active,
//   onClick,
// }: {
//   label: string;
//   description: string;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`w-full rounded-xl border p-4 text-left transition ${
//         active
//           ? "border-orange-300 bg-orange-50"
//           : "border-slate-200 hover:border-orange-200 hover:bg-slate-50"
//       }`}
//     >

//       <div className="flex items-center justify-between">

//         <div>

//           <p className="text-sm font-bold text-slate-800">
//             {label}
//           </p>

//           <p className="mt-1 text-xs text-slate-500">
//             {description}
//           </p>

//         </div>

//         {active && (
//           <span className="text-sm font-bold text-orange-600">
//             ✓
//           </span>
//         )}

//       </div>

//     </button>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-12 text-center">

//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
//         ⌕
//       </div>

//       <p className="mt-3 text-sm font-semibold text-slate-800">
//         No entities found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing your search or filter.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  getFilteredCollection,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";
import {
  cascadeStateStatus,
  cascadeDistrictStatus,
} from "@/lib/hierarchy/cascadeStatus";

type NodeType = "STATE" | "DISTRICT" | "PINCODE" | "CLUSTER" | "ZONE";
type NodeStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

type HierarchyNodeDetail = {
  nodeId: string;
  nodeType: NodeType;
  name: string;
  code: string;
  status: NodeStatus;
  parentNodeId?: string;
  parentName?: string;
  stateId?: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  pincode?: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  childCount: number;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
  orderCount: number;
  clusterCount?: number;
  nodeCount?: number;
  pincodes?: string[];
};

type ChildNode = {
  nodeId: string;
  name: string;
  nodeType: NodeType;
  status: NodeStatus;
  vendorCount: number;
  captainCount: number;
  customerCount: number;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function asStatus(value: unknown): NodeStatus {
  const s = String(value ?? "ACTIVE").toUpperCase();
  if (s === "INACTIVE" || s === "BLOCKED") return s;
  return "ACTIVE";
}

function timestampLabel(value: unknown): string {
  let ms = 0;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      ms = (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      ms = 0;
    }
  } else if (value instanceof Date) {
    ms = value.getTime();
  } else if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) ms = d.getTime();
  }
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function num(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

function getNodeTypeClasses(type: NodeType) {
  switch (type) {
    case "STATE":
      return "bg-blue-100 text-blue-700";
    case "DISTRICT":
      return "bg-orange-100 text-orange-700";
    case "PINCODE":
      return "bg-green-100 text-green-700";
    case "CLUSTER":
      return "bg-purple-100 text-purple-700";
    case "ZONE":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusClasses(status: NodeStatus) {
  if (status === "ACTIVE") return "bg-green-100 text-green-700";
  if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
  return "bg-red-100 text-red-700";
}

export default function HierarchyNodePage() {
  const params = useParams();
  const nodeId = String(params?.nodeId ?? "").trim();

  const [node, setNode] = useState<HierarchyNodeDetail | null>(null);
  const [children, setChildren] = useState<ChildNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"OVERVIEW" | "CHILDREN" | "ACTIVITY">(
    "OVERVIEW"
  );
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const load = useCallback(async () => {
    if (!nodeId) {
      setError("Missing node ID.");
      setLoading(false);
      return;
    }

    if (isFirestoreDemoMode) {
      setError("Demo mode — hierarchy detail is disabled.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Resolve document across hierarchy collections
      const collections: Array<{
        name: (typeof FIRESTORE_COLLECTIONS)[keyof typeof FIRESTORE_COLLECTIONS];
        type: NodeType;
      }> = [
        { name: FIRESTORE_COLLECTIONS.STATES, type: "STATE" },
        { name: FIRESTORE_COLLECTIONS.DISTRICTS, type: "DISTRICT" },
        { name: FIRESTORE_COLLECTIONS.PINCODES, type: "PINCODE" },
        { name: FIRESTORE_COLLECTIONS.CLUSTERS, type: "CLUSTER" },
        { name: FIRESTORE_COLLECTIONS.ZONES, type: "ZONE" },
      ];

      let found: Record<string, unknown> | null = null;
      let foundType: NodeType | null = null;

      for (const col of collections) {
        const doc = await getDocument<Record<string, unknown>>(col.name, nodeId);
        if (doc) {
          found = doc;
          foundType = col.type;
          break;
        }
      }

      // Pincode docs sometimes use pincode as id — already tried PINCODES by id
      if (!found) {
        setError(`No hierarchy node found for ID "${nodeId}".`);
        setNode(null);
        setChildren([]);
        setLoading(false);
        return;
      }

      const type = foundType!;
      let detail: HierarchyNodeDetail;

      if (type === "STATE") {
        detail = {
          nodeId: str(found.stateId ?? found.id, nodeId),
          nodeType: "STATE",
          name: str(found.stateName ?? found.name, nodeId),
          code: str(found.code ?? found.stateCode, "—"),
          status: asStatus(found.status),
          parentName: str(found.country ?? found.parent, "India"),
          parentNodeId: "ROOT",
          stateId: str(found.stateId ?? found.id, nodeId),
          stateName: str(found.stateName ?? found.name, nodeId),
          description: str(found.description, ""),
          createdAt: timestampLabel(found.createdAt),
          updatedAt: timestampLabel(found.updatedAt ?? found.createdAt),
          childCount: num(found.districtCount ?? found.children),
          vendorCount: num(found.vendorCount ?? found.vendors),
          captainCount: num(found.captainCount ?? found.captains),
          customerCount: num(found.customerCount ?? found.customers),
          orderCount: num(found.orderCount ?? found.orders),
        };

        const districtDocs = await getFilteredCollection(
          FIRESTORE_COLLECTIONS.DISTRICTS,
          [],
          undefined,
          500
        );
        const kids = districtDocs
          .filter(
            (d) =>
              str(d.stateId) === detail.stateId ||
              str(d.stateName).toLowerCase() === detail.name.toLowerCase()
          )
          .map((d) => ({
            nodeId: str(d.districtId ?? d.id),
            name: str(d.districtName ?? d.name),
            nodeType: "DISTRICT" as const,
            status: asStatus(d.status),
            vendorCount: num(d.vendorCount ?? d.vendors),
            captainCount: num(d.captainCount ?? d.captains),
            customerCount: num(d.customerCount ?? d.customers),
          }));
        detail.childCount = kids.length;
        setChildren(kids);
      } else if (type === "DISTRICT") {
        detail = {
          nodeId: str(found.districtId ?? found.id, nodeId),
          nodeType: "DISTRICT",
          name: str(found.districtName ?? found.name, nodeId),
          code: str(found.code ?? found.districtCode, "—"),
          status: asStatus(found.status),
          parentNodeId: str(found.stateId, undefined as unknown as string),
          parentName: str(found.stateName ?? found.state, "—"),
          stateId: str(found.stateId, "—"),
          stateName: str(found.stateName ?? found.state, "—"),
          districtId: str(found.districtId ?? found.id, nodeId),
          districtName: str(found.districtName ?? found.name, nodeId),
          description: str(found.description, ""),
          createdAt: timestampLabel(found.createdAt),
          updatedAt: timestampLabel(found.updatedAt ?? found.createdAt),
          childCount: num(found.pincodeCount ?? found.children),
          vendorCount: num(found.vendorCount ?? found.vendors),
          captainCount: num(found.captainCount ?? found.captains),
          customerCount: num(found.customerCount ?? found.customers),
          orderCount: num(found.orderCount ?? found.orders),
        };

        const pincodeDocs = await getFilteredCollection(
          FIRESTORE_COLLECTIONS.PINCODES,
          [],
          undefined,
          1000
        );
        const kids = pincodeDocs
          .filter(
            (p) =>
              str(p.districtId) === detail.districtId ||
              str(p.districtName).toLowerCase() === detail.name.toLowerCase()
          )
          .map((p) => ({
            nodeId: str(p.pincode ?? p.id),
            name: str(p.areaName ?? p.pincode ?? p.name),
            nodeType: "PINCODE" as const,
            status: asStatus(p.status),
            vendorCount: num(p.vendorCount ?? p.vendors),
            captainCount: num(p.captainCount ?? p.captains),
            customerCount: num(p.customerCount ?? p.customers),
          }));
        detail.childCount = kids.length;
        setChildren(kids);
      } else if (type === "PINCODE") {
        detail = {
          nodeId: str(found.pincode ?? found.id, nodeId),
          nodeType: "PINCODE",
          name: str(found.areaName ?? found.pincode ?? found.name, nodeId),
          code: str(found.pincode ?? found.id, nodeId),
          status: asStatus(found.status),
          parentNodeId: str(found.districtId, undefined as unknown as string),
          parentName: str(found.districtName ?? found.district, "—"),
          stateId: str(found.stateId, "—"),
          stateName: str(found.stateName ?? found.state, "—"),
          districtId: str(found.districtId, "—"),
          districtName: str(found.districtName ?? found.district, "—"),
          pincode: str(found.pincode ?? found.id, nodeId),
          description: str(found.description, ""),
          createdAt: timestampLabel(found.createdAt),
          updatedAt: timestampLabel(found.updatedAt ?? found.createdAt),
          childCount: 0,
          vendorCount: num(found.vendorCount ?? found.vendors),
          captainCount: num(found.captainCount ?? found.captains),
          customerCount: num(found.customerCount ?? found.customers),
          orderCount: num(found.orderCount ?? found.orders),
        };
        setChildren([]);
      } else if (type === "CLUSTER") {
        const pins = Array.isArray(found.pincodes)
          ? (found.pincodes as unknown[]).map((p) => str(p, "")).filter(Boolean)
          : [];
        detail = {
          nodeId: str(found.clusterId ?? found.id, nodeId),
          nodeType: "CLUSTER",
          name: str(found.clusterName ?? found.name, nodeId),
          code: str(found.clusterType ?? found.type, "—"),
          status: asStatus(found.status),
          parentNodeId: str(found.stateId, undefined as unknown as string),
          parentName: str(found.stateName ?? found.state, "—"),
          stateId: str(found.stateId, "—"),
          stateName: str(found.stateName ?? found.state, "—"),
          districtId: found.districtId ? str(found.districtId) : undefined,
          districtName: found.districtName ? str(found.districtName) : undefined,
          description: str(found.description, ""),
          createdAt: timestampLabel(found.createdAt),
          updatedAt: timestampLabel(found.updatedAt ?? found.createdAt),
          childCount: pins.length,
          vendorCount: num(found.vendorCount ?? found.vendors),
          captainCount: num(found.captainCount ?? found.captains),
          customerCount: num(found.customerCount ?? found.customers),
          orderCount: num(found.orderCount ?? found.orders),
          pincodes: pins,
        };
        setChildren(
          pins.map((p) => ({
            nodeId: p,
            name: p,
            nodeType: "PINCODE" as const,
            status: "ACTIVE" as const,
            vendorCount: 0,
            captainCount: 0,
            customerCount: 0,
          }))
        );
      } else {
        // ZONE
        const pins = Array.isArray(found.pincodes)
          ? (found.pincodes as unknown[]).map((p) => str(p, "")).filter(Boolean)
          : [];
        detail = {
          nodeId: str(found.zoneId ?? found.id, nodeId),
          nodeType: "ZONE",
          name: str(found.zoneName ?? found.name, nodeId),
          code: str(found.zoneType ?? found.type, "—"),
          status: asStatus(found.status),
          parentNodeId: str(found.stateId, undefined as unknown as string),
          parentName: str(found.stateName ?? found.state, "—"),
          stateId: str(found.stateId, "—"),
          stateName: str(found.stateName ?? found.state, "—"),
          districtId: found.districtId ? str(found.districtId) : undefined,
          districtName: found.districtName ? str(found.districtName) : undefined,
          description: str(found.description, ""),
          createdAt: timestampLabel(found.createdAt),
          updatedAt: timestampLabel(found.updatedAt ?? found.createdAt),
          childCount: pins.length,
          vendorCount: num(found.vendorCount ?? found.vendors),
          captainCount: num(found.captainCount ?? found.captains),
          customerCount: num(found.customerCount ?? found.customers),
          orderCount: num(found.orderCount ?? found.orders),
          clusterCount: num(found.clusterCount),
          nodeCount: num(found.nodeCount),
          pincodes: pins,
        };
        setChildren(
          pins.map((p) => ({
            nodeId: p,
            name: p,
            nodeType: "PINCODE" as const,
            status: "ACTIVE" as const,
            vendorCount: 0,
            captainCount: 0,
            customerCount: 0,
          }))
        );
      }

      setNode(detail);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to load node.");
      setNode(null);
      setChildren([]);
    } finally {
      setLoading(false);
    }
  }, [nodeId]);

  useEffect(() => {
    void load();
  }, [load]);

  const collectionForType = useMemo(() => {
    if (!node) return null;
    switch (node.nodeType) {
      case "STATE":
        return FIRESTORE_COLLECTIONS.STATES;
      case "DISTRICT":
        return FIRESTORE_COLLECTIONS.DISTRICTS;
      case "PINCODE":
        return FIRESTORE_COLLECTIONS.PINCODES;
      case "CLUSTER":
        return FIRESTORE_COLLECTIONS.CLUSTERS;
      case "ZONE":
        return FIRESTORE_COLLECTIONS.ZONES;
      default:
        return null;
    }
  }, [node]);

  async function handleStatusChange(status: NodeStatus) {
    if (!node || !collectionForType) return;

    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    setStatusSaving(true);
    try {
      await updateDocument(collectionForType, node.nodeId, { status });

      let cascadeNote = "";
      if (
        node.nodeType === "STATE" &&
        (status === "INACTIVE" || status === "BLOCKED")
      ) {
        const result = await cascadeStateStatus(
          node.nodeId,
          node.name,
          status
        );
        cascadeNote = ` Cascaded → ${result.districts} districts, ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
      }
      if (
        node.nodeType === "DISTRICT" &&
        (status === "INACTIVE" || status === "BLOCKED")
      ) {
        const result = await cascadeDistrictStatus(
          node.nodeId,
          node.name,
          status
        );
        cascadeNote = ` Cascaded → ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
      }

      setNode({ ...node, status, updatedAt: "Just now" });
      setShowStatusModal(false);
      setSuccessMessage(`${node.name}: ${status}.${cascadeNote}`);
      setTimeout(() => setSuccessMessage(""), 5000);
      await load();
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
        <p className="text-sm text-slate-500">Loading hierarchy node…</p>
      </div>
    );
  }

  if (error || !node) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 md:p-8">
        <Link
          href="/hierarchy"
          className="text-sm font-semibold text-orange-600"
        >
          ← Hierarchy
        </Link>
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error || "Node not found."}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/hierarchy"
          className="font-medium text-slate-500 hover:text-orange-600"
        >
          Hierarchy
        </Link>
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-800">{node.name}</span>
      </div>

      {successMessage && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-2xl font-bold text-orange-700">
              {node.nodeType.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">{node.name}</h1>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getNodeTypeClasses(
                    node.nodeType
                  )}`}
                >
                  {node.nodeType}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    node.status
                  )}`}
                >
                  {node.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Node ID:{" "}
                <span className="font-semibold text-slate-700">{node.nodeId}</span>
              </p>
              {node.description && (
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
                  {node.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/hierarchy"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Back to Hierarchy
            </Link>
            <button
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Manage Status
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
          Hierarchy Scope
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <ScopeItem label="India" active={false} />
          <span className="text-slate-400">→</span>
          <ScopeItem
            label={node.stateName || "State"}
            active={node.nodeType === "STATE"}
          />
          {(node.nodeType === "DISTRICT" ||
            node.nodeType === "PINCODE" ||
            node.districtName) && (
            <>
              <span className="text-slate-400">→</span>
              <ScopeItem
                label={node.districtName || "District"}
                active={node.nodeType === "DISTRICT"}
              />
            </>
          )}
          {node.nodeType === "PINCODE" && (
            <>
              <span className="text-slate-400">→</span>
              <ScopeItem label={node.pincode || node.name} active />
            </>
          )}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard title="Child Nodes" value={formatNumber(node.childCount)} />
        <StatCard title="Vendors" value={formatNumber(node.vendorCount)} />
        <StatCard title="Captains" value={formatNumber(node.captainCount)} />
        <StatCard title="Customers" value={formatNumber(node.customerCount)} />
        <StatCard title="Orders" value={formatNumber(node.orderCount)} />
        <StatCard title="Status" value={node.status} />
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="flex min-w-max border-b border-slate-200">
          {(
            [
              ["OVERVIEW", "Overview"],
              ["CHILDREN", "Child Nodes"],
              ["ACTIVITY", "Activity"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
                activeTab === key
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "OVERVIEW" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Node Information</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
              <InfoItem label="Node ID" value={node.nodeId} />
              <InfoItem label="Node Type" value={node.nodeType} />
              <InfoItem label="Code / Type label" value={node.code} />
              <InfoItem label="Status" value={node.status} />
              <InfoItem label="Parent" value={node.parentName || "—"} />
              <InfoItem label="State" value={node.stateName || "—"} />
              <InfoItem label="District" value={node.districtName || "—"} />
              <InfoItem label="Pincode" value={node.pincode || "—"} />
              <InfoItem label="Created At" value={node.createdAt} />
              <InfoItem label="Updated At" value={node.updatedAt} />
            </div>
            {node.pincodes && node.pincodes.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-slate-900">Pincode scope</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {node.pincodes.map((p) => (
                    <span
                      key={p}
                      className="rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Scope Summary</h2>
            <div className="mt-5 space-y-4">
              <ScopeSummary label="Vendors" value={node.vendorCount} />
              <ScopeSummary label="Captains" value={node.captainCount} />
              <ScopeSummary label="Customers" value={node.customerCount} />
              <ScopeSummary label="Orders" value={node.orderCount} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "CHILDREN" && (
        <div className="rounded-2xl bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold text-slate-900">Child Nodes</h2>
            <p className="mt-1 text-sm text-slate-500">
              Loaded live from Firestore under this scope.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  {["Node", "Type", "Status", "Vendors", "Captains", "Customers", "Action"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-xs font-bold uppercase text-slate-500"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {children.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No child nodes under this scope.
                    </td>
                  </tr>
                ) : (
                  children.map((child) => (
                    <tr key={child.nodeId} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {child.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {child.nodeId}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getNodeTypeClasses(
                            child.nodeType
                          )}`}
                        >
                          {child.nodeType}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            child.status
                          )}`}
                        >
                          {child.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatNumber(child.vendorCount)}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatNumber(child.captainCount)}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold">
                        {formatNumber(child.customerCount)}
                      </td>
                      <td className="px-5 py-4">
                        <Link
                          href={`/hierarchy/${child.nodeId}`}
                          className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "ACTIVITY" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Node activity</h2>
          <p className="mt-2 text-sm text-slate-500">
            Live audit activity can be wired to <code>audit_logs</code> later.
            Status changes on this page are already persisted to Firestore.
          </p>
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            Last loaded: {node.updatedAt}
          </div>
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">
          Hierarchy node (live)
        </h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          This page reads from Firestore collections states / districts /
          pincodes / clusters / zones. Status updates write back to the same
          document. State and District INACTIVE/BLOCKED cascade to children.
        </p>
      </div>

      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Manage Node Status
                </h2>
                <p className="mt-1 text-sm text-slate-500">{node.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowStatusModal(false)}
                className="text-xl text-slate-400"
              >
                ×
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {(["ACTIVE", "INACTIVE", "BLOCKED"] as NodeStatus[]).map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={statusSaving}
                  onClick={() => void handleStatusChange(st)}
                  className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
                    node.status === st
                      ? "border-orange-300 bg-orange-50"
                      : "border-slate-200"
                  }`}
                >
                  {statusSaving ? "Saving…" : st}
                  {(st === "INACTIVE" || st === "BLOCKED") &&
                    (node.nodeType === "STATE" ||
                      node.nodeType === "DISTRICT") && (
                      <span className="mt-1 block text-xs font-normal text-slate-500">
                        Cascades to children under this node
                      </span>
                    )}
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
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function ScopeItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div
      className={`rounded-lg px-3 py-2 text-xs font-semibold ${
        active ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {label}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function ScopeSummary({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-900">
        {formatNumber(value)}
      </span>
    </div>
  );
}