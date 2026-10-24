// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useStates,
//   type StateRecord,
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

// export default function StatesPage() {
//   const { states, loading, error, demoMode, refresh } = useStates();
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selected, setSelected] = useState<StateRecord | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return states.filter((s) => {
//       const matchSearch =
//         !q ||
//         s.stateId.toLowerCase().includes(q) ||
//         s.stateName.toLowerCase().includes(q) ||
//         s.code.toLowerCase().includes(q);
//       const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
//       return matchSearch && matchStatus;
//     });
//   }, [states, search, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: states.length,
//       active: states.filter((s) => s.status === "ACTIVE").length,
//       inactive: states.filter((s) => s.status === "INACTIVE").length,
//       blocked: states.filter((s) => s.status === "BLOCKED").length,
//       districts: states.reduce((t, s) => t + s.districtCount, 0),
//       vendors: states.reduce((t, s) => t + s.vendorCount, 0),
//       captains: states.reduce((t, s) => t + s.captainCount, 0),
//       customers: states.reduce((t, s) => t + s.customerCount, 0),
//       orders: states.reduce((t, s) => t + s.orderCount, 0),
//     }),
//     [states]
//   );

//   function handleStatusChange(status: HierarchyStatus) {
//     if (!selected) return;
//     setSelected({ ...selected, status, updatedAt: "Just now (local UI)" });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `State status → ${status}. Local UI only — persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 3500);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link href="/hierarchy" className="font-medium text-slate-500 hover:text-orange-600">
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">States</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 S
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">States</h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>states</code> collection.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
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
//         {[
//           ["Total", summary.total],
//           ["Active", summary.active],
//           ["Inactive", summary.inactive],
//           ["Blocked", summary.blocked],
//           ["Districts", summary.districts],
//           ["Vendors", summary.vendors],
//           ["Captains", summary.captains],
//           ["Customers", summary.customers],
//           ["Orders", summary.orders],
//         ].map(([title, value]) => (
//           <div key={String(title)} className="rounded-2xl bg-white p-4 shadow-sm">
//             <p className="text-[11px] font-medium text-slate-500">{title}</p>
//             <p className="mt-2 text-lg font-bold text-slate-900">
//               {formatNumber(value as number)}
//             </p>
//           </div>
//         ))}
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
//               placeholder="Search state name, ID or code..."
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
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("ALL");
//             }}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//           >
//             Clear
//           </button>
//         </div>
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
//           <span className="font-semibold text-slate-700">{states.length}</span> states
//         </p>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">State Directory</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {["State", "Code", "Status", "Districts", "Vendors", "Captains", "Customers", "Orders", "Action"].map(
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
//               {loading && filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="px-5 py-12 text-center text-sm text-slate-500">
//                     Loading states…
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((s) => (
//                   <tr key={s.stateId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">{s.stateName}</p>
//                       <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">{s.code}</td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           s.status
//                         )}`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.districtCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowDetails(true);
//                           }}
//                           className="text-sm font-semibold text-orange-600"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowStatusModal(true);
//                           }}
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
//         {!loading && filtered.length === 0 && (
//           <div className="px-5 py-14 text-center text-sm text-slate-500">
//             No states found. Empty Firestore collection or filters too narrow.
//           </div>
//         )}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filtered.map((s) => (
//           <div key={s.stateId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-sm font-bold">{s.stateName}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   s.status
//                 )}`}
//               >
//                 {s.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowDetails(true);
//                 }}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
//               >
//                 View
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">State Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           States load from Firestore. Status changes are local UI only until
//           authorized backend writes exist.
//         </p>
//       </div>

//       {showDetails && selected && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">{selected.stateName}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selected.stateId}</p>
//               </div>
//               <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400">
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 grid grid-cols-2 gap-4">
//               {[
//                 ["Code", selected.code],
//                 ["Country", selected.country],
//                 ["Status", selected.status],
//                 ["Districts", formatNumber(selected.districtCount)],
//                 ["Vendors", formatNumber(selected.vendorCount)],
//                 ["Captains", formatNumber(selected.captainCount)],
//                 ["Customers", formatNumber(selected.customerCount)],
//                 ["Orders", formatNumber(selected.orderCount)],
//                 ["Created", selected.createdAt],
//                 ["Updated", selected.updatedAt],
//               ].map(([label, value]) => (
//                 <div key={label} className="rounded-xl bg-slate-50 p-4">
//                   <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
//                   <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
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

//       {showStatusModal && selected && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage State Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selected.stateName}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map((st) => (
//                 <button
//                   key={st}
//                   type="button"
//                   onClick={() => handleStatusChange(st)}
//                   className={`w-full rounded-xl border p-4 text-left text-sm font-semibold ${
//                     selected.status === st
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {st}
//                 </button>
//               ))}
//             </div>
//             <p className="mt-5 rounded-xl bg-yellow-50 p-4 text-xs text-yellow-700">
//               Local UI only. Production requires trusted backend.
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

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useStates,
//   type StateRecord,
//   type HierarchyStatus,
// } from "@/hooks/useHierarchy";
// import {
//   FIRESTORE_COLLECTIONS,
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

// export default function StatesPage() {
//   const { states, loading, error, demoMode, refresh } = useStates();
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selected, setSelected] = useState<StateRecord | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [statusSaving, setStatusSaving] = useState(false);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return states.filter((s) => {
//       const matchSearch =
//         !q ||
//         s.stateId.toLowerCase().includes(q) ||
//         s.stateName.toLowerCase().includes(q) ||
//         s.code.toLowerCase().includes(q);
//       const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
//       return matchSearch && matchStatus;
//     });
//   }, [states, search, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: states.length,
//       active: states.filter((s) => s.status === "ACTIVE").length,
//       inactive: states.filter((s) => s.status === "INACTIVE").length,
//       blocked: states.filter((s) => s.status === "BLOCKED").length,
//       districts: states.reduce((t, s) => t + s.districtCount, 0),
//       vendors: states.reduce((t, s) => t + s.vendorCount, 0),
//       captains: states.reduce((t, s) => t + s.captainCount, 0),
//       customers: states.reduce((t, s) => t + s.customerCount, 0),
//       orders: states.reduce((t, s) => t + s.orderCount, 0),
//     }),
//     [states]
//   );

//   async function handleStatusChange(status: HierarchyStatus) {
//     if (!selected) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       await updateDocument(FIRESTORE_COLLECTIONS.STATES, selected.stateId, {
//         status,
//       });
//       setSelected({ ...selected, status, updatedAt: "Just now" });
//       setShowStatusModal(false);
//       setSuccessMessage(`State "${selected.stateName}" → ${status}`);
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

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link href="/hierarchy" className="font-medium text-slate-500 hover:text-orange-600">
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">States</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 S
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">States</h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>states</code> collection.
//                   {demoMode ? " (demo mode — writes disabled)" : ""}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
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
//         {[
//           ["Total", summary.total],
//           ["Active", summary.active],
//           ["Inactive", summary.inactive],
//           ["Blocked", summary.blocked],
//           ["Districts", summary.districts],
//           ["Vendors", summary.vendors],
//           ["Captains", summary.captains],
//           ["Customers", summary.customers],
//           ["Orders", summary.orders],
//         ].map(([title, value]) => (
//           <div key={String(title)} className="rounded-2xl bg-white p-4 shadow-sm">
//             <p className="text-[11px] font-medium text-slate-500">{title}</p>
//             <p className="mt-2 text-lg font-bold text-slate-900">
//               {formatNumber(value as number)}
//             </p>
//           </div>
//         ))}
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
//               placeholder="Search state name, ID or code..."
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
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("ALL");
//             }}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//           >
//             Clear
//           </button>
//         </div>
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
//           <span className="font-semibold text-slate-700">{states.length}</span> states
//         </p>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">State Directory</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {["State", "Code", "Status", "Districts", "Vendors", "Captains", "Customers", "Orders", "Action"].map(
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
//               {loading && filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="px-5 py-12 text-center text-sm text-slate-500">
//                     Loading states…
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((s) => (
//                   <tr key={s.stateId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">{s.stateName}</p>
//                       <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">{s.code}</td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           s.status
//                         )}`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.districtCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowDetails(true);
//                           }}
//                           className="text-sm font-semibold text-orange-600"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowStatusModal(true);
//                           }}
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
//         {!loading && filtered.length === 0 && (
//           <div className="px-5 py-14 text-center text-sm text-slate-500">
//             No states found. Empty Firestore collection or filters too narrow.
//           </div>
//         )}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filtered.map((s) => (
//           <div key={s.stateId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-sm font-bold">{s.stateName}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   s.status
//                 )}`}
//               >
//                 {s.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowDetails(true);
//                 }}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
//               >
//                 View
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">State Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           States load from Firestore. Status changes are written to Firestore
//           and reflected after refresh.
//         </p>
//       </div>

//       {showDetails && selected && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">{selected.stateName}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selected.stateId}</p>
//               </div>
//               <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400">
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 grid grid-cols-2 gap-4">
//               {[
//                 ["Code", selected.code],
//                 ["Country", selected.country],
//                 ["Status", selected.status],
//                 ["Districts", formatNumber(selected.districtCount)],
//                 ["Vendors", formatNumber(selected.vendorCount)],
//                 ["Captains", formatNumber(selected.captainCount)],
//                 ["Customers", formatNumber(selected.customerCount)],
//                 ["Orders", formatNumber(selected.orderCount)],
//                 ["Created", selected.createdAt],
//                 ["Updated", selected.updatedAt],
//               ].map(([label, value]) => (
//                 <div key={label} className="rounded-xl bg-slate-50 p-4">
//                   <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
//                   <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
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

//       {showStatusModal && selected && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage State Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selected.stateName}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map((st) => (
//                 <button
//                   key={st}
//                   type="button"
//                   disabled={statusSaving}
//                   onClick={() => void handleStatusChange(st)}
//                   className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     selected.status === st
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {statusSaving ? "Saving…" : st}
//                 </button>
//               ))}
//             </div>
//             <p className="mt-5 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
//               Status is written to Firestore collection <code>states</code>.
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
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useStates,
//   type StateRecord,
//   type HierarchyStatus,
// } from "@/hooks/useHierarchy";
// import {
//   FIRESTORE_COLLECTIONS,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import { cascadeStateStatus } from "@/lib/hierarchy/cascadeStatus";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: HierarchyStatus) {
//   if (status === "ACTIVE") return "bg-green-100 text-green-700";
//   if (status === "INACTIVE") return "bg-slate-100 text-slate-600";
//   return "bg-red-100 text-red-700";
// }

// export default function StatesPage() {
//   const { states, loading, error, demoMode, refresh } = useStates();
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
//   const [selected, setSelected] = useState<StateRecord | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [statusSaving, setStatusSaving] = useState(false);

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return states.filter((s) => {
//       const matchSearch =
//         !q ||
//         s.stateId.toLowerCase().includes(q) ||
//         s.stateName.toLowerCase().includes(q) ||
//         s.code.toLowerCase().includes(q);
//       const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
//       return matchSearch && matchStatus;
//     });
//   }, [states, search, statusFilter]);

//   const summary = useMemo(
//     () => ({
//       total: states.length,
//       active: states.filter((s) => s.status === "ACTIVE").length,
//       inactive: states.filter((s) => s.status === "INACTIVE").length,
//       blocked: states.filter((s) => s.status === "BLOCKED").length,
//       districts: states.reduce((t, s) => t + s.districtCount, 0),
//       vendors: states.reduce((t, s) => t + s.vendorCount, 0),
//       captains: states.reduce((t, s) => t + s.captainCount, 0),
//       customers: states.reduce((t, s) => t + s.customerCount, 0),
//       orders: states.reduce((t, s) => t + s.orderCount, 0),
//     }),
//     [states]
//   );

//   async function handleStatusChange(status: HierarchyStatus) {
//     if (!selected) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       await updateDocument(FIRESTORE_COLLECTIONS.STATES, selected.stateId, {
//         status,
//       });

//       let cascadeNote = "";
//       if (status === "INACTIVE" || status === "BLOCKED") {
//         // const result = await cascadeStateStatus(selected.stateId, status);
//         const result = await cascadeStateStatus(
//           selected.stateId,
//           selected.stateName,
//           status
//         );
//         cascadeNote = ` Cascaded to ${result.districts} districts, ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
//       }

//       setSelected({ ...selected, status, updatedAt: "Just now" });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `State "${selected.stateName}" → ${status}.${cascadeNote}`
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
//     } finally {
//       setStatusSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
//           <Link href="/hierarchy" className="font-medium text-slate-500 hover:text-orange-600">
//             Hierarchy
//           </Link>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">States</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
//                 S
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">States</h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live data from Firestore <code>states</code>.
//                   {demoMode ? " (demo mode — writes disabled)" : ""}
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               <Link
//                 href="/hierarchy"
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
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
//         {[
//           ["Total", summary.total],
//           ["Active", summary.active],
//           ["Inactive", summary.inactive],
//           ["Blocked", summary.blocked],
//           ["Districts", summary.districts],
//           ["Vendors", summary.vendors],
//           ["Captains", summary.captains],
//           ["Customers", summary.customers],
//           ["Orders", summary.orders],
//         ].map(([title, value]) => (
//           <div key={String(title)} className="rounded-2xl bg-white p-4 shadow-sm">
//             <p className="text-[11px] font-medium text-slate-500">{title}</p>
//             <p className="mt-2 text-lg font-bold text-slate-900">
//               {formatNumber(value as number)}
//             </p>
//           </div>
//         ))}
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
//               placeholder="Search state name, ID or code..."
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
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("ALL");
//             }}
//             className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//           >
//             Clear
//           </button>
//         </div>
//         <p className="mt-4 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
//           <span className="font-semibold text-slate-700">{states.length}</span> states
//         </p>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">State Directory</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 {["State", "Code", "Status", "Districts", "Vendors", "Captains", "Customers", "Orders", "Action"].map(
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
//               {loading && filtered.length === 0 ? (
//                 <tr>
//                   <td colSpan={9} className="px-5 py-12 text-center text-sm text-slate-500">
//                     Loading states…
//                   </td>
//                 </tr>
//               ) : (
//                 filtered.map((s) => (
//                   <tr key={s.stateId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-bold text-slate-900">{s.stateName}</p>
//                       <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//                     </td>
//                     <td className="px-5 py-4 text-sm text-slate-600">{s.code}</td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           s.status
//                         )}`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.districtCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.vendorCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.captainCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.customerCount)}
//                     </td>
//                     <td className="px-5 py-4 text-sm font-semibold">
//                       {formatNumber(s.orderCount)}
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex gap-3">
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowDetails(true);
//                           }}
//                           className="text-sm font-semibold text-orange-600"
//                         >
//                           View
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => {
//                             setSelected(s);
//                             setShowStatusModal(true);
//                           }}
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
//         {!loading && filtered.length === 0 && (
//           <div className="px-5 py-14 text-center text-sm text-slate-500">
//             No states found. Empty Firestore collection or filters too narrow.
//           </div>
//         )}
//       </div>

//       <div className="mt-4 space-y-4 md:hidden">
//         {filtered.map((s) => (
//           <div key={s.stateId} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-sm font-bold">{s.stateName}</h3>
//                 <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   s.status
//                 )}`}
//               >
//                 {s.status}
//               </span>
//             </div>
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowDetails(true);
//                 }}
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
//               >
//                 View
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSelected(s);
//                   setShowStatusModal(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
//               >
//                 Status
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-900">State Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Setting a state to <strong>INACTIVE</strong> or <strong>BLOCKED</strong>{" "}
//           automatically sets the same status on all districts, pincodes, clusters
//           and zones under that state. Setting a state to ACTIVE does not
//           auto-activate children.
//         </p>
//       </div>

//       {showDetails && selected && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-xl font-bold">{selected.stateName}</h2>
//                 <p className="mt-1 text-xs text-slate-400">{selected.stateId}</p>
//               </div>
//               <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400">
//                 ×
//               </button>
//             </div>
//             <div className="mt-6 grid grid-cols-2 gap-4">
//               {[
//                 ["Code", selected.code],
//                 ["Country", selected.country],
//                 ["Status", selected.status],
//                 ["Districts", formatNumber(selected.districtCount)],
//                 ["Vendors", formatNumber(selected.vendorCount)],
//                 ["Captains", formatNumber(selected.captainCount)],
//                 ["Customers", formatNumber(selected.customerCount)],
//                 ["Orders", formatNumber(selected.orderCount)],
//                 ["Created", selected.createdAt],
//                 ["Updated", selected.updatedAt],
//               ].map(([label, value]) => (
//                 <div key={label} className="rounded-xl bg-slate-50 p-4">
//                   <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
//                   <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-6 flex justify-end gap-3">
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

//       {showStatusModal && selected && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Manage State Status</h2>
//             <p className="mt-1 text-sm text-slate-500">{selected.stateName}</p>
//             <div className="mt-6 space-y-3">
//               {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map((st) => (
//                 <button
//                   key={st}
//                   type="button"
//                   disabled={statusSaving}
//                   onClick={() => void handleStatusChange(st)}
//                   className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     selected.status === st
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {statusSaving ? "Saving…" : st}
//                   {(st === "INACTIVE" || st === "BLOCKED") && (
//                     <span className="mt-1 block text-xs font-normal text-slate-500">
//                       Also deactivates all districts, pincodes, clusters & zones under this state
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
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
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useStates,
  type StateRecord,
  type HierarchyStatus,
} from "@/hooks/useHierarchy";
import useAuthScope from "@/hooks/useAuthScope";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";
import {
  FIRESTORE_COLLECTIONS,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";
import { cascadeStateStatus } from "@/lib/hierarchy/cascadeStatus";
import {
  filterStatesByScope,
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

export default function StatesPage() {
  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = {
    role: auth.role,
    stateId: auth.stateId,
    districtId: auth.districtId,
    isGlobalAdmin: auth.isGlobalAdmin,
  };

  const { states: allStates, loading, error, demoMode, refresh } = useStates();
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

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | HierarchyStatus>("ALL");
  const [selected, setSelected] = useState<StateRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [statusSaving, setStatusSaving] = useState(false);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return states.filter((s) => {
      const matchSearch =
        !q ||
        s.stateId.toLowerCase().includes(q) ||
        s.stateName.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q);
      const matchStatus = statusFilter === "ALL" || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [states, search, statusFilter]);

  const summary = useMemo(
    () => ({
      total: states.length,
      active: states.filter((s) => s.status === "ACTIVE").length,
      inactive: states.filter((s) => s.status === "INACTIVE").length,
      blocked: states.filter((s) => s.status === "BLOCKED").length,
      districts: states.reduce((t, s) => t + s.districtCount, 0),
      vendors: states.reduce((t, s) => t + s.vendorCount, 0),
      captains: states.reduce((t, s) => t + s.captainCount, 0),
      customers: states.reduce((t, s) => t + s.customerCount, 0),
      orders: states.reduce((t, s) => t + s.orderCount, 0),
    }),
    [states]
  );

  async function handleStatusChange(status: HierarchyStatus) {
    if (!selected) return;

    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }

    setStatusSaving(true);
    try {
      await updateDocument(FIRESTORE_COLLECTIONS.STATES, selected.stateId, {
        status,
      });

      let cascadeNote = "";
      if (status === "INACTIVE" || status === "BLOCKED") {
        const result = await cascadeStateStatus(
          selected.stateId,
          selected.stateName,
          status
        );
        cascadeNote = ` Cascaded to ${result.districts} districts, ${result.pincodes} pincodes, ${result.clusters} clusters, ${result.zones} zones.`;
      }

      setSelected({ ...selected, status, updatedAt: "Just now" });
      setShowStatusModal(false);
      setSuccessMessage(
        `State "${selected.stateName}" → ${status}.${cascadeNote}`
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
    } finally {
      setStatusSaving(false);
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
          <span className="font-semibold text-slate-800">States</span>
          <ScopeBadge />
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl">
                S
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">States</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live data from Firestore <code>states</code> (role-scoped).
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
        {[
          ["Total", summary.total],
          ["Active", summary.active],
          ["Inactive", summary.inactive],
          ["Blocked", summary.blocked],
          ["Districts", summary.districts],
          ["Vendors", summary.vendors],
          ["Captains", summary.captains],
          ["Customers", summary.customers],
          ["Orders", summary.orders],
        ].map(([title, value]) => (
          <div key={String(title)} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-[11px] font-medium text-slate-500">{title}</p>
            <p className="mt-2 text-lg font-bold text-slate-900">
              {formatNumber(value as number)}
            </p>
          </div>
        ))}
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
              placeholder="Search state name, ID or code..."
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
            onClick={() => {
              setSearch("");
              setStatusFilter("ALL");
            }}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
          >
            Clear
          </button>
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700">{filtered.length}</span> of{" "}
          <span className="font-semibold text-slate-700">{states.length}</span>{" "}
          states in your scope
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">State Directory</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                {[
                  "State",
                  "Code",
                  "Status",
                  "Districts",
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
              {loading && filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading states…
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.stateId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {s.stateName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{s.code}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          s.status
                        )}`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(s.districtCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(s.vendorCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(s.captainCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(s.customerCount)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold">
                      {formatNumber(s.orderCount)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(s);
                            setShowDetails(true);
                          }}
                          className="text-sm font-semibold text-orange-600"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected(s);
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
        {!loading && filtered.length === 0 && (
          <div className="px-5 py-14 text-center text-sm text-slate-500">
            No states in your scope. Empty collection or role has no state access.
          </div>
        )}
      </div>

      <div className="mt-4 space-y-4 md:hidden">
        {filtered.map((s) => (
          <div key={s.stateId} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-bold">{s.stateName}</h3>
                <p className="mt-1 text-xs text-slate-400">{s.stateId}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
                  s.status
                )}`}
              >
                {s.status}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelected(s);
                  setShowDetails(true);
                }}
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelected(s);
                  setShowStatusModal(true);
                }}
                className="rounded-lg bg-orange-500 px-3 py-2.5 text-sm font-semibold text-white"
              >
                Status
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">State Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          Lists are filtered by your auth claims. STATE_ADMIN sees only their
          state; SUPER_ADMIN sees all. INACTIVE/BLOCKED cascades to children.
        </p>
      </div>

      {showDetails && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{selected.stateName}</h2>
                <p className="mt-1 text-xs text-slate-400">{selected.stateId}</p>
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
              {[
                ["Code", selected.code],
                ["Country", selected.country],
                ["Status", selected.status],
                ["Districts", formatNumber(selected.districtCount)],
                ["Vendors", formatNumber(selected.vendorCount)],
                ["Captains", formatNumber(selected.captainCount)],
                ["Customers", formatNumber(selected.customerCount)],
                ["Orders", formatNumber(selected.orderCount)],
                ["Created", selected.createdAt],
                ["Updated", selected.updatedAt],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-[10px] font-bold uppercase text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {value}
                  </p>
                </div>
              ))}
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

      {showStatusModal && selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Manage State Status</h2>
            <p className="mt-1 text-sm text-slate-500">{selected.stateName}</p>
            <div className="mt-6 space-y-3">
              {(["ACTIVE", "INACTIVE", "BLOCKED"] as HierarchyStatus[]).map(
                (st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={statusSaving}
                    onClick={() => void handleStatusChange(st)}
                    className={`w-full rounded-xl border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
                      selected.status === st
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {statusSaving ? "Saving…" : st}
                    {(st === "INACTIVE" || st === "BLOCKED") && (
                      <span className="mt-1 block text-xs font-normal text-slate-500">
                        Also deactivates children under this state
                      </span>
                    )}
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
    </div>
  );
}