// "use client";

// import { FormEvent, useState } from "react";

// type NodeType =
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN";

// type OverrideStatus = "ACTIVE" | "INACTIVE";

// type NodeOverride = {
//   id: string;
//   nodeType: NodeType;
//   nodeId: string;
//   nodeName: string;
//   module: string;
//   commissionType: "PERCENTAGE" | "FIXED";
//   commissionValue: number;
//   reason: string;
//   effectiveFrom: string;
//   status: OverrideStatus;
// };

// const MODULES = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// const NODE_TYPES: NodeType[] = [
//   "STATE",
//   "DISTRICT",
//   "PINCODE",
//   "VENDOR",
//   "CAPTAIN",
// ];

// const INITIAL_OVERRIDES: NodeOverride[] = [
//   {
//     id: "OVR-STATE-AP-001",
//     nodeType: "STATE",
//     nodeId: "STATE_AP",
//     nodeName: "Andhra Pradesh",
//     module: "JUCART",
//     commissionType: "PERCENTAGE",
//     commissionValue: 9,
//     reason: "State-level commercial override",
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
//   {
//     id: "OVR-DIST-GNT-001",
//     nodeType: "DISTRICT",
//     nodeId: "DISTRICT_GUNTUR",
//     nodeName: "Guntur",
//     module: "JURIDE",
//     commissionType: "PERCENTAGE",
//     commissionValue: 13,
//     reason: "District operational override",
//     effectiveFrom: "2026-02-01",
//     status: "ACTIVE",
//   },
// ];

// export default function NodeOverridesPage() {
//   const [overrides, setOverrides] =
//     useState<NodeOverride[]>(INITIAL_OVERRIDES);

//   const [nodeType, setNodeType] =
//     useState<NodeType>("STATE");

//   const [nodeId, setNodeId] = useState("");
//   const [nodeName, setNodeName] = useState("");

//   const [module, setModule] = useState("JUCART");

//   const [commissionType, setCommissionType] =
//     useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");

//   const [commissionValue, setCommissionValue] =
//     useState("");

//   const [reason, setReason] = useState("");
//   const [effectiveFrom, setEffectiveFrom] =
//     useState("");

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // ---------------------------------------------------
//   // Create Node Override
//   // ---------------------------------------------------

//   const handleSubmit = async (
//     event: FormEvent<HTMLFormElement>
//   ) => {
//     event.preventDefault();

//     setMessage("");
//     setError("");

//     const value = Number(commissionValue);

//     if (!nodeId.trim()) {
//       setError("Please enter the node ID.");
//       return;
//     }

//     if (!nodeName.trim()) {
//       setError("Please enter the node name.");
//       return;
//     }

//     if (!module) {
//       setError("Please select a module.");
//       return;
//     }

//     if (!commissionValue || Number.isNaN(value)) {
//       setError("Please enter a valid commission value.");
//       return;
//     }

//     if (value < 0) {
//       setError("Commission value cannot be negative.");
//       return;
//     }

//     if (
//       commissionType === "PERCENTAGE" &&
//       value > 100
//     ) {
//       setError(
//         "Percentage commission cannot be greater than 100%."
//       );
//       return;
//     }

//     if (!effectiveFrom) {
//       setError("Please select the effective date.");
//       return;
//     }

//     if (!reason.trim()) {
//       setError("Please provide a reason for the override.");
//       return;
//     }

//     try {
//       setLoading(true);

//       /*
//        * Production architecture:
//        *
//        * This operation should be sent to a secured
//        * Cloud Function / backend endpoint.
//        *
//        * The client must not independently determine
//        * financial outcomes.
//        *
//        * This local state implementation keeps the
//        * screen functional until the backend is connected.
//        */

//       const newOverride: NodeOverride = {
//         id: `OVR-${nodeType}-${Date.now()}`,
//         nodeType,
//         nodeId: nodeId.trim(),
//         nodeName: nodeName.trim(),
//         module,
//         commissionType,
//         commissionValue: value,
//         reason: reason.trim(),
//         effectiveFrom,
//         status: "ACTIVE",
//       };

//       setOverrides((current) => [
//         ...current,
//         newOverride,
//       ]);

//       setMessage(
//         `Node override created successfully for ${nodeName.trim()}.`
//       );

//       // Clear form
//       setNodeId("");
//       setNodeName("");
//       setCommissionValue("");
//       setReason("");
//     } catch (err) {
//       console.error(
//         "Node override creation error:",
//         err
//       );

//       setError(
//         "Unable to create node override."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // Toggle Status
//   // ---------------------------------------------------

//   const toggleStatus = (id: string) => {
//     setOverrides((current) =>
//       current.map((override) =>
//         override.id === id
//           ? {
//               ...override,
//               status:
//                 override.status === "ACTIVE"
//                   ? "INACTIVE"
//                   : "ACTIVE",
//             }
//           : override
//       )
//     );

//     setMessage("Node override status updated.");
//     setError("");
//   };

//   // ---------------------------------------------------
//   // Delete Override
//   // ---------------------------------------------------

//   const deleteOverride = (id: string) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this node override?"
//     );

//     if (!confirmed) {
//       return;
//     }

//     setOverrides((current) =>
//       current.filter(
//         (override) => override.id !== id
//       )
//     );

//     setMessage("Node override removed.");
//     setError("");
//   };

//   // ---------------------------------------------------
//   // Search
//   // ---------------------------------------------------

//   const filteredOverrides = overrides.filter(
//     (override) => {
//       const searchText = search
//         .trim()
//         .toLowerCase();

//       if (!searchText) {
//         return true;
//       }

//       return (
//         override.id
//           .toLowerCase()
//           .includes(searchText) ||
//         override.nodeId
//           .toLowerCase()
//           .includes(searchText) ||
//         override.nodeName
//           .toLowerCase()
//           .includes(searchText) ||
//         override.nodeType
//           .toLowerCase()
//           .includes(searchText) ||
//         override.module
//           .toLowerCase()
//           .includes(searchText) ||
//         override.status
//           .toLowerCase()
//           .includes(searchText)
//       );
//     }
//   );

//   // ---------------------------------------------------
//   // UI
//   // ---------------------------------------------------

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* Page Header */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Node Overrides
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Configure authorized commission overrides
//               for specific geographic or operational nodes.
//             </p>
//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-semibold text-orange-700">
//               JUERP Governance
//             </p>

//             <p className="mt-1 text-xs text-orange-600">
//               Node overrides must remain under ERP
//               authorization and audit control.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       {message && (
//         <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
//           <p className="text-sm text-green-700">
//             {message}
//           </p>
//         </div>
//       )}

//       {error && (
//         <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
//           <p className="text-sm text-red-700">
//             {error}
//           </p>
//         </div>
//       )}

//       {/* Main Layout */}
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* Create Override */}
//         <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">

//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Create Node Override
//             </h2>

//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Apply a module-specific commission override
//               to an authorized node.
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-5"
//           >

//             {/* Node Type */}
//             <div>
//               <label
//                 htmlFor="nodeType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node Type
//               </label>

//               <select
//                 id="nodeType"
//                 value={nodeType}
//                 onChange={(event) =>
//                   setNodeType(
//                     event.target.value as NodeType
//                   )
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {NODE_TYPES.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Node ID */}
//             <div>
//               <label
//                 htmlFor="nodeId"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node ID
//               </label>

//               <input
//                 id="nodeId"
//                 type="text"
//                 value={nodeId}
//                 onChange={(event) =>
//                   setNodeId(event.target.value)
//                 }
//                 placeholder="Example: STATE_AP"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Node Name */}
//             <div>
//               <label
//                 htmlFor="nodeName"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node Name
//               </label>

//               <input
//                 id="nodeName"
//                 type="text"
//                 value={nodeName}
//                 onChange={(event) =>
//                   setNodeName(event.target.value)
//                 }
//                 placeholder="Example: Andhra Pradesh"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Module */}
//             <div>
//               <label
//                 htmlFor="module"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Module
//               </label>

//               <select
//                 id="module"
//                 value={module}
//                 onChange={(event) =>
//                   setModule(event.target.value)
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {MODULES.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Commission Type */}
//             <div>
//               <label
//                 htmlFor="commissionType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission Type
//               </label>

//               <select
//                 id="commissionType"
//                 value={commissionType}
//                 onChange={(event) =>
//                   setCommissionType(
//                     event.target.value as
//                       | "PERCENTAGE"
//                       | "FIXED"
//                   )
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="PERCENTAGE">
//                   Percentage
//                 </option>

//                 <option value="FIXED">
//                   Fixed Amount
//                 </option>
//               </select>
//             </div>

//             {/* Commission Value */}
//             <div>
//               <label
//                 htmlFor="commissionValue"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission Value
//               </label>

//               <div className="relative">
//                 {commissionType === "FIXED" && (
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     ₹
//                   </span>
//                 )}

//                 <input
//                   id="commissionValue"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={commissionValue}
//                   onChange={(event) =>
//                     setCommissionValue(
//                       event.target.value
//                     )
//                   }
//                   placeholder={
//                     commissionType === "PERCENTAGE"
//                       ? "Example: 10"
//                       : "Example: 100"
//                   }
//                   className={`w-full rounded-lg border border-slate-300 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED"
//                       ? "pl-8 pr-10"
//                       : "px-3 pr-10"
//                   }`}
//                 />

//                 {commissionType === "PERCENTAGE" && (
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     %
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Effective Date */}
//             <div>
//               <label
//                 htmlFor="effectiveFrom"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Effective From
//               </label>

//               <input
//                 id="effectiveFrom"
//                 type="date"
//                 value={effectiveFrom}
//                 onChange={(event) =>
//                   setEffectiveFrom(
//                     event.target.value
//                   )
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Reason */}
//             <div>
//               <label
//                 htmlFor="reason"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Reason
//               </label>

//               <textarea
//                 id="reason"
//                 value={reason}
//                 onChange={(event) =>
//                   setReason(event.target.value)
//                 }
//                 rows={4}
//                 placeholder="Enter the reason for this override..."
//                 className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "Creating Override..."
//                 : "Create Node Override"}
//             </button>
//           </form>
//         </div>

//         {/* Existing Overrides */}
//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">

//           {/* Header */}
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Existing Overrides
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Review and manage configured node overrides.
//                 </p>
//               </div>

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 placeholder="Search overrides..."
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">

//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Node
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Module
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Commission
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Effective
//                   </th>

//                   <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Status
//                   </th>

//                   <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">

//                 {filteredOverrides.map((override) => (
//                   <tr
//                     key={override.id}
//                     className="transition hover:bg-slate-50"
//                   >

//                     {/* Node */}
//                     <td className="px-5 py-4">
//                       <div>
//                         <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                           {override.nodeType}
//                         </span>

//                         <p className="mt-2 text-sm font-semibold text-slate-900">
//                           {override.nodeName}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-400">
//                           {override.nodeId}
//                         </p>
//                       </div>
//                     </td>

//                     {/* Module */}
//                     <td className="px-5 py-4">
//                       <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                         {override.module}
//                       </span>
//                     </td>

//                     {/* Commission */}
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-900">
//                         {override.commissionType ===
//                         "PERCENTAGE"
//                           ? `${override.commissionValue}%`
//                           : `₹${override.commissionValue.toFixed(
//                               2
//                             )}`}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {override.commissionType}
//                       </p>
//                     </td>

//                     {/* Effective */}
//                     <td className="px-5 py-4 text-sm text-slate-600">
//                       {override.effectiveFrom}
//                     </td>

//                     {/* Status */}
//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           override.status === "ACTIVE"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         {override.status}
//                       </span>
//                     </td>

//                     {/* Actions */}
//                     <td className="px-5 py-4">
//                       <div className="flex justify-end gap-3">

//                         <button
//                           type="button"
//                           onClick={() =>
//                             toggleStatus(
//                               override.id
//                             )
//                           }
//                           className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           {override.status === "ACTIVE"
//                             ? "Disable"
//                             : "Enable"}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             deleteOverride(
//                               override.id
//                             )
//                           }
//                           className="text-xs font-semibold text-red-600 hover:text-red-700"
//                         >
//                           Remove
//                         </button>

//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredOverrides.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No node overrides found.
//                     </td>
//                   </tr>
//                 )}

//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="space-y-4 p-4 md:hidden">

//             {filteredOverrides.map((override) => (
//               <div
//                 key={override.id}
//                 className="rounded-xl border border-slate-200 p-4"
//               >

//                 <div className="flex items-start justify-between gap-3">

//                   <div>
//                     <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                       {override.nodeType}
//                     </span>

//                     <h3 className="mt-2 text-sm font-semibold text-slate-900">
//                       {override.nodeName}
//                     </h3>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {override.nodeId}
//                     </p>
//                   </div>

//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       override.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {override.status}
//                   </span>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-4">

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Module
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-orange-600">
//                       {override.module}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Commission
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {override.commissionType ===
//                       "PERCENTAGE"
//                         ? `${override.commissionValue}%`
//                         : `₹${override.commissionValue.toFixed(
//                             2
//                           )}`}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Effective From
//                     </p>

//                     <p className="mt-1 text-sm text-slate-700">
//                       {override.effectiveFrom}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Type
//                     </p>

//                     <p className="mt-1 text-sm text-slate-700">
//                       {override.commissionType}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-4 rounded-lg bg-slate-50 p-3">
//                   <p className="text-xs font-medium text-slate-500">
//                     Reason
//                   </p>

//                   <p className="mt-1 text-xs leading-5 text-slate-600">
//                     {override.reason}
//                   </p>
//                 </div>

//                 <div className="mt-4 flex gap-3">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       toggleStatus(override.id)
//                     }
//                     className="flex-1 rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50"
//                   >
//                     {override.status === "ACTIVE"
//                       ? "Disable"
//                       : "Enable"}
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       deleteOverride(override.id)
//                     }
//                     className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
//                   >
//                     Remove
//                   </button>

//                 </div>
//               </div>
//             ))}

//             {filteredOverrides.length === 0 && (
//               <p className="py-8 text-center text-sm text-slate-500">
//                 No node overrides found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Rule Precedence Information */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">

//         <h3 className="text-sm font-semibold text-slate-900">
//           Override Governance
//         </h3>

//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Node-specific overrides must be evaluated by the trusted
//           JUERP/backend rule engine. The client must not independently
//           decide which commission rule wins when multiple rules apply.
//           Every approved override should be versioned, authorized,
//           auditable, and applied through the authoritative financial
//           calculation flow.
//         </p>

//         <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">

//           {NODE_TYPES.map((type) => (
//             <div
//               key={type}
//               className="rounded-lg border border-slate-200 bg-slate-50 p-3"
//             >
//               <p className="text-xs font-semibold text-slate-700">
//                 {type}
//               </p>

//               <p className="mt-1 text-[11px] leading-4 text-slate-500">
//                 Authorized scope
//               </p>
//             </div>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { FormEvent, useState } from "react";
// import {
//   useCommissionOverrides,
//   type NodeType,
// } from "@/hooks/useCommissionEngine";

// const MODULES = ["JUCART", "JURIDE", "JUSTAY", "JUHOME", "JUSHOPPING"];
// const NODE_TYPES: NodeType[] = [
//   "STATE",
//   "DISTRICT",
//   "PINCODE",
//   "VENDOR",
//   "CAPTAIN",
// ];

// export default function NodeOverridesPage() {
//   const {
//     overrides,
//     loading: dataLoading,
//     error: dataError,
//     createOverride,
//     toggleStatus,
//     removeOverride,
//     refresh,
//   } = useCommissionOverrides();

//   const [nodeType, setNodeType] = useState<NodeType>("STATE");
//   const [nodeId, setNodeId] = useState("");
//   const [nodeName, setNodeName] = useState("");
//   const [module, setModule] = useState("JUCART");
//   const [commissionType, setCommissionType] = useState<"PERCENTAGE" | "FIXED">(
//     "PERCENTAGE"
//   );
//   const [commissionValue, setCommissionValue] = useState("");
//   const [reason, setReason] = useState("");
//   const [effectiveFrom, setEffectiveFrom] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setMessage("");
//     setError("");

//     const value = Number(commissionValue);

//     if (!nodeId.trim()) {
//       setError("Please enter the node ID.");
//       return;
//     }
//     if (!nodeName.trim()) {
//       setError("Please enter the node name.");
//       return;
//     }
//     if (!module) {
//       setError("Please select a module.");
//       return;
//     }
//     if (!commissionValue || Number.isNaN(value)) {
//       setError("Please enter a valid commission value.");
//       return;
//     }
//     if (value < 0) {
//       setError("Commission value cannot be negative.");
//       return;
//     }
//     if (commissionType === "PERCENTAGE" && value > 100) {
//       setError("Percentage commission cannot be greater than 100%.");
//       return;
//     }
//     if (!effectiveFrom) {
//       setError("Please select the effective date.");
//       return;
//     }
//     if (!reason.trim()) {
//       setError("Please provide a reason for the override.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await createOverride({
//         nodeType,
//         nodeId: nodeId.trim(),
//         nodeName: nodeName.trim(),
//         module,
//         commissionType,
//         commissionValue: value,
//         reason: reason.trim(),
//         effectiveFrom,
//       });
//       setMessage(
//         `Node override created successfully for ${nodeName.trim()}.`
//       );
//       setNodeId("");
//       setNodeName("");
//       setCommissionValue("");
//       setReason("");
//     } catch (err) {
//       console.error("Node override creation error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to create node override."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (id: string) => {
//     setMessage("");
//     setError("");
//     try {
//       await toggleStatus(id);
//       setMessage("Node override status updated.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to update status."
//       );
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this node override?"
//     );
//     if (!confirmed) return;
//     setMessage("");
//     setError("");
//     try {
//       await removeOverride(id);
//       setMessage("Node override removed.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to remove override."
//       );
//     }
//   };

//   const filteredOverrides = overrides.filter((override) => {
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       override.id.toLowerCase().includes(q) ||
//       override.nodeId.toLowerCase().includes(q) ||
//       override.nodeName.toLowerCase().includes(q) ||
//       override.nodeType.toLowerCase().includes(q) ||
//       override.module.toLowerCase().includes(q) ||
//       override.status.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Node Overrides
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Live data from Firestore <code>commission_overrides</code>.
//             </p>
//           </div>
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               disabled={dataLoading}
//               className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//             >
//               {dataLoading ? "Refreshing…" : "Refresh"}
//             </button>
//             <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-semibold text-orange-700">
//                 JUERP Governance
//               </p>
//               <p className="mt-1 text-xs text-orange-600">
//                 Node overrides must remain under ERP authorization and audit
//                 control.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {message && (
//         <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
//           <p className="text-sm text-green-700">{message}</p>
//         </div>
//       )}
//       {(error || dataError) && (
//         <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
//           <p className="text-sm text-red-700">{error || dataError}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Create Node Override
//             </h2>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Apply a module-specific commission override to an authorized
//               node.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label
//                 htmlFor="nodeType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node Type
//               </label>
//               <select
//                 id="nodeType"
//                 value={nodeType}
//                 onChange={(e) => setNodeType(e.target.value as NodeType)}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {NODE_TYPES.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="nodeId"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node ID
//               </label>
//               <input
//                 id="nodeId"
//                 type="text"
//                 value={nodeId}
//                 onChange={(e) => setNodeId(e.target.value)}
//                 placeholder="Example: STATE_AP"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="nodeName"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node Name
//               </label>
//               <input
//                 id="nodeName"
//                 type="text"
//                 value={nodeName}
//                 onChange={(e) => setNodeName(e.target.value)}
//                 placeholder="Example: Andhra Pradesh"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="module"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Module
//               </label>
//               <select
//                 id="module"
//                 value={module}
//                 onChange={(e) => setModule(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {MODULES.map((item) => (
//                   <option key={item} value={item}>
//                     {item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="commissionType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission Type
//               </label>
//               <select
//                 id="commissionType"
//                 value={commissionType}
//                 onChange={(e) =>
//                   setCommissionType(e.target.value as "PERCENTAGE" | "FIXED")
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="PERCENTAGE">Percentage</option>
//                 <option value="FIXED">Fixed Amount</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="commissionValue"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission Value
//               </label>
//               <div className="relative">
//                 {commissionType === "FIXED" && (
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     ₹
//                   </span>
//                 )}
//                 <input
//                   id="commissionValue"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={commissionValue}
//                   onChange={(e) => setCommissionValue(e.target.value)}
//                   placeholder={
//                     commissionType === "PERCENTAGE" ? "Example: 10" : "Example: 100"
//                   }
//                   className={`w-full rounded-lg border border-slate-300 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED" ? "pl-8 pr-10" : "px-3 pr-10"
//                   }`}
//                 />
//                 {commissionType === "PERCENTAGE" && (
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     %
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="effectiveFrom"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Effective From
//               </label>
//               <input
//                 id="effectiveFrom"
//                 type="date"
//                 value={effectiveFrom}
//                 onChange={(e) => setEffectiveFrom(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="reason"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Reason
//               </label>
//               <textarea
//                 id="reason"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 rows={4}
//                 placeholder="Enter the reason for this override..."
//                 className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? "Creating Override..." : "Create Node Override"}
//             </button>
//           </form>
//         </div>

//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Existing Overrides
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Review and manage configured node overrides.
//                 </p>
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search overrides..."
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {["Node", "Module", "Commission", "Effective", "Status", "Actions"].map(
//                     (h) => (
//                       <th
//                         key={h}
//                         className={`px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
//                           h === "Actions" ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {h}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {dataLoading && filteredOverrides.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       Loading overrides…
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredOverrides.map((override) => (
//                     <tr
//                       key={override.id}
//                       className="transition hover:bg-slate-50"
//                     >
//                       <td className="px-5 py-4">
//                         <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                           {override.nodeType}
//                         </span>
//                         <p className="mt-2 text-sm font-semibold text-slate-900">
//                           {override.nodeName}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           {override.nodeId}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                           {override.module}
//                         </span>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="text-sm font-semibold text-slate-900">
//                           {override.commissionType === "PERCENTAGE"
//                             ? `${override.commissionValue}%`
//                             : `₹${override.commissionValue.toFixed(2)}`}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           {override.commissionType}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4 text-sm text-slate-600">
//                         {override.effectiveFrom}
//                       </td>
//                       <td className="px-5 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                             override.status === "ACTIVE"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {override.status}
//                         </span>
//                       </td>
//                       <td className="px-5 py-4">
//                         <div className="flex justify-end gap-3">
//                           <button
//                             type="button"
//                             onClick={() => void handleToggle(override.id)}
//                             className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                           >
//                             {override.status === "ACTIVE" ? "Disable" : "Enable"}
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => void handleDelete(override.id)}
//                             className="text-xs font-semibold text-red-600 hover:text-red-700"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 {!dataLoading && filteredOverrides.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No node overrides found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="space-y-4 p-4 md:hidden">
//             {filteredOverrides.map((override) => (
//               <div
//                 key={override.id}
//                 className="rounded-xl border border-slate-200 p-4"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                       {override.nodeType}
//                     </span>
//                     <h3 className="mt-2 text-sm font-semibold text-slate-900">
//                       {override.nodeName}
//                     </h3>
//                     <p className="mt-1 text-xs text-slate-400">
//                       {override.nodeId}
//                     </p>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       override.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {override.status}
//                   </span>
//                 </div>
//                 <div className="mt-4 grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-xs text-slate-400">Module</p>
//                     <p className="mt-1 text-sm font-semibold text-orange-600">
//                       {override.module}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Commission</p>
//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {override.commissionType === "PERCENTAGE"
//                         ? `${override.commissionValue}%`
//                         : `₹${override.commissionValue.toFixed(2)}`}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Effective From</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {override.effectiveFrom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Type</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {override.commissionType}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="mt-4 rounded-lg bg-slate-50 p-3">
//                   <p className="text-xs font-medium text-slate-500">Reason</p>
//                   <p className="mt-1 text-xs leading-5 text-slate-600">
//                     {override.reason}
//                   </p>
//                 </div>
//                 <div className="mt-4 flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => void handleToggle(override.id)}
//                     className="flex-1 rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50"
//                   >
//                     {override.status === "ACTIVE" ? "Disable" : "Enable"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => void handleDelete(override.id)}
//                     className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {!dataLoading && filteredOverrides.length === 0 && (
//               <p className="py-8 text-center text-sm text-slate-500">
//                 No node overrides found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Override Governance
//         </h3>
//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Node-specific overrides are stored in Firestore and must be evaluated
//           by the trusted JUERP/backend rule engine. The client must not
//           independently decide which commission rule wins when multiple rules
//           apply.
//         </p>
//         <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
//           {NODE_TYPES.map((type) => (
//             <div
//               key={type}
//               className="rounded-lg border border-slate-200 bg-slate-50 p-3"
//             >
//               <p className="text-xs font-semibold text-slate-700">{type}</p>
//               <p className="mt-1 text-[11px] leading-4 text-slate-500">
//                 Authorized scope
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { FormEvent, useEffect, useState } from "react";
// import {
//   Pencil,
//   Ban,
//   Trash2,
//   X,
//   CheckCircle2,
//   Power,
// } from "lucide-react";
// import {
//   useCommissionOverrides,
//   COMMISSION_MODULES,
//   type NodeType,
//   type CommissionType,
//   type CommissionOverride,
// } from "@/hooks/useCommissionEngine";

// const NODE_TYPES: NodeType[] = [
//   "STATE",
//   "DISTRICT",
//   "PINCODE",
//   "VENDOR",
//   "CAPTAIN",
// ];

// const MODULE_LABELS: Record<string, string> = {
//   FOOD: "JuCart · Food",
//   MART: "JuCart · Mart",
//   PHARMACY: "JuCart · Pharmacy",
//   JUCART: "JuCart · All",
//   JURIDE: "JuRide",
//   JUSTAY: "JuStay",
//   JUHOME: "JuHome",
//   JUSHOPPING: "JuShopping",
// };

// type Toast = {
//   id: number;
//   type: "success" | "error";
//   text: string;
// };

// export default function NodeOverridesPage() {
//   const {
//     overrides,
//     loading: dataLoading,
//     error: dataError,
//     createOverride,
//     updateOverride,
//     toggleStatus,
//     removeOverride,
//     refresh,
//   } = useCommissionOverrides();

//   const [nodeType, setNodeType] = useState<NodeType>("STATE");
//   const [nodeId, setNodeId] = useState("");
//   // IMPORTANT: do not name this nodeName — clashes with DOM nodeName in React/DevTools
//   const [nodeLabel, setNodeLabel] = useState("");
//   const [module, setModule] = useState("FOOD");
//   const [commissionType, setCommissionType] = useState<CommissionType>(
//     "PERCENTAGE"
//   );
//   const [commissionValue, setCommissionValue] = useState("");
//   const [reason, setReason] = useState("");
//   const [effectiveFrom, setEffectiveFrom] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [actionId, setActionId] = useState<string | null>(null);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   function pushToast(type: Toast["type"], text: string) {
//     const id = Date.now() + Math.random();
//     setToasts((prev) => [...prev, { id, type, text }]);
//     window.setTimeout(() => {
//       setToasts((prev) => prev.filter((t) => t.id !== id));
//     }, 4000);
//   }

//   function dismissToast(id: number) {
//     setToasts((prev) => prev.filter((t) => t.id !== id));
//   }

//   useEffect(() => {
//     if (!effectiveFrom) {
//       setEffectiveFrom(new Date().toISOString().slice(0, 10));
//     }
//   }, [effectiveFrom]);

//   function loadIntoForm(row: CommissionOverride) {
//     setEditingId(row.id);
//     setNodeType(row.nodeType);
//     setNodeId(row.nodeId === "—" ? "" : row.nodeId);
//     setNodeLabel(row.nodeLabel === "—" ? "" : row.nodeLabel);
//     setModule(row.module);
//     setCommissionType(row.commissionType);
//     setCommissionValue(String(row.commissionValue));
//     setReason(row.reason === "—" ? "" : row.reason);
//     setEffectiveFrom(
//       row.effectiveFrom && row.effectiveFrom !== "—"
//         ? row.effectiveFrom
//         : new Date().toISOString().slice(0, 10)
//     );
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   function resetForm() {
//     setEditingId(null);
//     setNodeId("");
//     setNodeLabel("");
//     setCommissionValue("");
//     setReason("");
//     setEffectiveFrom(new Date().toISOString().slice(0, 10));
//   }

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const value = Number(commissionValue);

//     if (!nodeId.trim()) {
//       pushToast("error", "Please enter the node ID.");
//       return;
//     }
//     if (!nodeLabel.trim()) {
//       pushToast("error", "Please enter the node name.");
//       return;
//     }
//     if (!module) {
//       pushToast("error", "Please select a module.");
//       return;
//     }
//     if (commissionValue === "" || Number.isNaN(value)) {
//       pushToast("error", "Please enter a valid commission value.");
//       return;
//     }
//     if (value < 0) {
//       pushToast("error", "Commission value cannot be negative.");
//       return;
//     }
//     if (commissionType === "PERCENTAGE" && value > 100) {
//       pushToast("error", "Percentage cannot be greater than 100%.");
//       return;
//     }
//     if (!effectiveFrom) {
//       pushToast("error", "Please select the effective date.");
//       return;
//     }
//     if (!reason.trim()) {
//       pushToast("error", "Please provide a reason for the override.");
//       return;
//     }

//     const payload = {
//       nodeType,
//       nodeId: nodeId.trim(),
//       nodeLabel: nodeLabel.trim(),
//       module,
//       commissionType,
//       commissionValue: value,
//       reason: reason.trim(),
//       effectiveFrom,
//     };

//     try {
//       setLoading(true);
//       if (editingId) {
//         await updateOverride(editingId, payload);
//         pushToast(
//           "success",
//           `Override updated · ${nodeLabel.trim()} (${module})`
//         );
//       } else {
//         await createOverride(payload);
//         pushToast(
//           "success",
//           `Override created · ${nodeLabel.trim()} (${module})`
//         );
//       }
//       resetForm();
//     } catch (err) {
//       console.error("Node override error:", err);
//       pushToast(
//         "error",
//         err instanceof Error ? err.message : "Unable to save node override."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (row: CommissionOverride) => {
//     try {
//       setActionId(row.id);
//       await toggleStatus(row.id);
//       pushToast(
//         "success",
//         row.status === "ACTIVE"
//           ? `${row.nodeLabel} disabled`
//           : `${row.nodeLabel} enabled`
//       );
//     } catch (err) {
//       pushToast(
//         "error",
//         err instanceof Error ? err.message : "Unable to update status."
//       );
//     } finally {
//       setActionId(null);
//     }
//   };

//   const handleDelete = async (row: CommissionOverride) => {
//     const ok = window.confirm(
//       `Delete override for ${row.nodeLabel} (${row.module})?\n\n${row.id}`
//     );
//     if (!ok) return;
//     try {
//       setActionId(row.id);
//       await removeOverride(row.id);
//       if (editingId === row.id) resetForm();
//       pushToast("success", `Deleted override · ${row.nodeLabel}`);
//     } catch (err) {
//       pushToast(
//         "error",
//         err instanceof Error ? err.message : "Unable to remove override."
//       );
//     } finally {
//       setActionId(null);
//     }
//   };

//   const filteredOverrides = overrides.filter((override) => {
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       override.id.toLowerCase().includes(q) ||
//       override.nodeId.toLowerCase().includes(q) ||
//       String(override.nodeLabel ?? "")
//         .toLowerCase()
//         .includes(q) ||
//       override.nodeType.toLowerCase().includes(q) ||
//       override.module.toLowerCase().includes(q) ||
//       override.status.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="relative min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       {/* Floating toasts — top right */}
//       <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(100vw-2rem,22rem)] flex-col gap-2">
//         {toasts.map((t) => (
//           <div
//             key={t.id}
//             className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
//               t.type === "success"
//                 ? "border-green-200 bg-green-50/95 text-green-800"
//                 : "border-red-200 bg-red-50/95 text-red-800"
//             }`}
//             role="status"
//           >
//             {t.type === "success" ? (
//               <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
//             ) : (
//               <Ban className="mt-0.5 h-4 w-4 shrink-0" />
//             )}
//             <p className="flex-1 text-sm font-medium leading-5">{t.text}</p>
//             <button
//               type="button"
//               onClick={() => dismissToast(t.id)}
//               className="rounded-md p-0.5 opacity-60 hover:opacity-100"
//               aria-label="Dismiss"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Node Overrides
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               State / district / pincode / vendor / captain overrides. Wins over
//               global rules; loses to vendor-negotiated rates when both exist
//               (backend resolution).
//             </p>
//             <p className="mt-1 text-xs text-slate-400">
//               Collection: <code>commission_overrides</code>
//             </p>
//           </div>
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               disabled={dataLoading}
//               className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//             >
//               {dataLoading ? "Refreshing…" : "Refresh"}
//             </button>
//             <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-semibold text-orange-700">
//                 JUERP Governance
//               </p>
//               <p className="mt-1 text-xs text-orange-600">
//                 Overrides require a reason and stay under ERP audit.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {dataError && (
//         <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
//           <p className="text-sm text-red-700">{dataError}</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
//         <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
//           <div className="mb-6 flex items-start justify-between gap-2">
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 {editingId ? "Edit node override" : "Create node override"}
//               </h2>
//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 {editingId
//                   ? `Updating ${editingId}`
//                   : "Module-specific rate for an authorized node."}
//               </p>
//             </div>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500 hover:text-orange-600"
//               >
//                 Clear
//               </button>
//             )}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="nodeType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node type
//               </label>
//               <select
//                 id="nodeType"
//                 value={nodeType}
//                 onChange={(e) => setNodeType(e.target.value as NodeType)}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {NODE_TYPES.map((type) => (
//                   <option key={type} value={type}>
//                     {type}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="nodeId"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node ID
//               </label>
//               <input
//                 id="nodeId"
//                 type="text"
//                 value={nodeId}
//                 onChange={(e) => setNodeId(e.target.value)}
//                 placeholder="e.g. STATE_AP · DIST_GNT · PIN_522001"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="nodeLabel"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Node name
//               </label>
//               <input
//                 id="nodeLabel"
//                 type="text"
//                 value={nodeLabel}
//                 onChange={(e) => setNodeLabel(e.target.value)}
//                 placeholder="e.g. Andhra Pradesh · Guntur"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="module"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Module
//               </label>
//               <select
//                 id="module"
//                 value={module}
//                 onChange={(e) => setModule(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 {COMMISSION_MODULES.map((item) => (
//                   <option key={item} value={item}>
//                     {MODULE_LABELS[item] ?? item}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="commissionType"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission type
//               </label>
//               <select
//                 id="commissionType"
//                 value={commissionType}
//                 onChange={(e) =>
//                   setCommissionType(e.target.value as CommissionType)
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="PERCENTAGE">Percentage</option>
//                 <option value="FIXED">Fixed amount (₹)</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="commissionValue"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Commission value
//               </label>
//               <div className="relative">
//                 {commissionType === "FIXED" && (
//                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     ₹
//                   </span>
//                 )}
//                 <input
//                   id="commissionValue"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={commissionValue}
//                   onChange={(e) => setCommissionValue(e.target.value)}
//                   placeholder={
//                     commissionType === "PERCENTAGE" ? "e.g. 15" : "e.g. 40"
//                   }
//                   className={`w-full rounded-lg border border-slate-300 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED" ? "pl-8 pr-10" : "px-3 pr-10"
//                   }`}
//                 />
//                 {commissionType === "PERCENTAGE" && (
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     %
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="effectiveFrom"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Effective from
//               </label>
//               <input
//                 id="effectiveFrom"
//                 type="date"
//                 value={effectiveFrom}
//                 onChange={(e) => setEffectiveFrom(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="reason"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Reason (required)
//               </label>
//               <textarea
//                 id="reason"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 rows={3}
//                 placeholder="Why this node differs from global rule…"
//                 className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading
//                 ? "Saving…"
//                 : editingId
//                   ? "Update override"
//                   : "Create override"}
//             </button>
//           </form>
//         </div>

//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Existing overrides
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   <span className="inline-flex items-center gap-1">
//                     <Pencil className="h-3 w-3" /> Edit
//                   </span>
//                   {" · "}
//                   <span className="inline-flex items-center gap-1">
//                     <Power className="h-3 w-3" /> Enable / Disable
//                   </span>
//                   {" · "}
//                   <span className="inline-flex items-center gap-1">
//                     <Trash2 className="h-3 w-3" /> Delete
//                   </span>
//                 </p>
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search overrides…"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {[
//                     "Node",
//                     "Module",
//                     "Commission",
//                     "Effective",
//                     "Status",
//                     "Actions",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className={`px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
//                         h === "Actions" ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {dataLoading && filteredOverrides.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       Loading overrides…
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredOverrides.map((override) => {
//                     const busy = actionId === override.id;
//                     return (
//                       <tr
//                         key={override.id}
//                         className="transition hover:bg-slate-50"
//                       >
//                         <td className="px-5 py-4">
//                           <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                             {override.nodeType}
//                           </span>
//                           <p className="mt-2 text-sm font-semibold text-slate-900">
//                             {String(override.nodeLabel ?? "")}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-400">
//                             {override.nodeId}
//                           </p>
//                         </td>
//                         <td className="px-5 py-4">
//                           <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                             {override.module}
//                           </span>
//                         </td>
//                         <td className="px-5 py-4">
//                           <p className="text-sm font-semibold text-slate-900">
//                             {override.commissionType === "PERCENTAGE"
//                               ? `${override.commissionValue}%`
//                               : `₹${override.commissionValue.toFixed(2)}`}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-400">
//                             {override.commissionType}
//                           </p>
//                         </td>
//                         <td className="px-5 py-4 text-sm text-slate-600">
//                           {override.effectiveFrom}
//                         </td>
//                         <td className="px-5 py-4">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                               override.status === "ACTIVE"
//                                 ? "bg-green-100 text-green-700"
//                                 : "bg-slate-100 text-slate-600"
//                             }`}
//                           >
//                             {override.status}
//                           </span>
//                         </td>
//                         <td className="px-5 py-4">
//                           <div className="flex items-center justify-end gap-1">
//                             <button
//                               type="button"
//                               title="Edit"
//                               disabled={busy}
//                               onClick={() => loadIntoForm(override)}
//                               className="rounded-lg p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:opacity-40"
//                             >
//                               <Pencil className="h-4 w-4" />
//                             </button>
//                             <button
//                               type="button"
//                               title={
//                                 override.status === "ACTIVE"
//                                   ? "Disable"
//                                   : "Enable"
//                               }
//                               disabled={busy}
//                               onClick={() => void handleToggle(override)}
//                               className={`rounded-lg p-2 transition disabled:opacity-40 ${
//                                 override.status === "ACTIVE"
//                                   ? "text-amber-600 hover:bg-amber-50"
//                                   : "text-green-600 hover:bg-green-50"
//                               }`}
//                             >
//                               {override.status === "ACTIVE" ? (
//                                 <Ban className="h-4 w-4" />
//                               ) : (
//                                 <Power className="h-4 w-4" />
//                               )}
//                             </button>
//                             <button
//                               type="button"
//                               title="Delete"
//                               disabled={busy}
//                               onClick={() => void handleDelete(override)}
//                               className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
//                             >
//                               <Trash2 className="h-4 w-4" />
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//                 {!dataLoading && filteredOverrides.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No node overrides found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="space-y-4 p-4 md:hidden">
//             {filteredOverrides.map((override) => {
//               const busy = actionId === override.id;
//               return (
//                 <div
//                   key={override.id}
//                   className="rounded-xl border border-slate-200 p-4"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div>
//                       <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
//                         {override.nodeType}
//                       </span>
//                       <h3 className="mt-2 text-sm font-semibold text-slate-900">
//                         {String(override.nodeLabel ?? "")}
//                       </h3>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {override.nodeId}
//                       </p>
//                     </div>
//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                         override.status === "ACTIVE"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {override.status}
//                     </span>
//                   </div>
//                   <p className="mt-3 text-sm font-semibold text-slate-900">
//                     {override.module} ·{" "}
//                     {override.commissionType === "PERCENTAGE"
//                       ? `${override.commissionValue}%`
//                       : `₹${override.commissionValue.toFixed(2)}`}
//                   </p>
//                   <div className="mt-3 flex gap-2">
//                     <button
//                       type="button"
//                       disabled={busy}
//                       onClick={() => loadIntoForm(override)}
//                       className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700"
//                     >
//                       <Pencil className="h-3.5 w-3.5" /> Edit
//                     </button>
//                     <button
//                       type="button"
//                       disabled={busy}
//                       onClick={() => void handleToggle(override)}
//                       className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-200 py-2 text-xs font-semibold text-amber-700"
//                     >
//                       {override.status === "ACTIVE" ? (
//                         <>
//                           <Ban className="h-3.5 w-3.5" /> Off
//                         </>
//                       ) : (
//                         <>
//                           <Power className="h-3.5 w-3.5" /> On
//                         </>
//                       )}
//                     </button>
//                     <button
//                       type="button"
//                       disabled={busy}
//                       onClick={() => void handleDelete(override)}
//                       className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600"
//                     >
//                       <Trash2 className="h-3.5 w-3.5" /> Del
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Override governance
//         </h3>
//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Resolution order (backend): vendor rate → node override → global
//           rule. This UI only stores config; calculation stays server-side.
//         </p>
//         <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
//           {NODE_TYPES.map((type) => (
//             <div
//               key={type}
//               className="rounded-lg border border-slate-200 bg-slate-50 p-3"
//             >
//               <p className="text-xs font-semibold text-slate-700">{type}</p>
//               <p className="mt-1 text-[11px] text-slate-500">Authorized scope</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Pencil,
  Ban,
  Trash2,
  X,
  CheckCircle2,
  Power,
} from "lucide-react";
import {
  useCommissionOverrides,
  COMMISSION_MODULES,
  type NodeType,
  type CommissionType,
  type CommissionOverride,
} from "@/hooks/useCommissionEngine";

const NODE_TYPES: NodeType[] = [
  "STATE",
  "DISTRICT",
  "PINCODE",
  "VENDOR",
  "CAPTAIN",
];

const MODULE_LABELS: Record<string, string> = {
  FOOD: "JuCart · Food",
  MART: "JuCart · Mart",
  PHARMACY: "JuCart · Pharmacy",
  JUCART: "JuCart · All",
  JURIDE: "JuRide",
  JUSTAY: "JuStay",
  JUHOME: "JuHome",
  JUSHOPPING: "JuShopping",
};

type Toast = {
  id: number;
  type: "success" | "error";
  text: string;
};

export default function NodeOverridesPage() {
  const {
    overrides,
    loading: dataLoading,
    error: dataError,
    createOverride,
    updateOverride,
    toggleStatus,
    removeOverride,
    refresh,
  } = useCommissionOverrides();

  const [nodeType, setNodeType] = useState<NodeType>("STATE");
  const [nodeId, setNodeId] = useState("");
  const [nodeLabel, setNodeLabel] = useState("");
  const [module, setModule] = useState("FOOD");
  const [commissionType, setCommissionType] =
    useState<CommissionType>("PERCENTAGE");
  const [commissionValue, setCommissionValue] = useState("");
  const [reason, setReason] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    if (!effectiveFrom) {
      setEffectiveFrom(new Date().toISOString().slice(0, 10));
    }
  }, [effectiveFrom]);

  function pushToast(type: Toast["type"], text: string) {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setToasts((previous) => [...previous, { id, type, text }]);

    window.setTimeout(() => {
      setToasts((previous) =>
        previous.filter((toast) => toast.id !== id)
      );
    }, 4000);
  }

  function dismissToast(id: number) {
    setToasts((previous) =>
      previous.filter((toast) => toast.id !== id)
    );
  }

  function resetForm() {
    setEditingId(null);
    setNodeType("STATE");
    setNodeId("");
    setNodeLabel("");
    setModule("FOOD");
    setCommissionType("PERCENTAGE");
    setCommissionValue("");
    setReason("");
    setEffectiveFrom(new Date().toISOString().slice(0, 10));
  }

  function loadIntoForm(row: CommissionOverride) {
    setEditingId(row.id);
    setNodeType(row.nodeType);
    setNodeId(row.nodeId === "—" ? "" : row.nodeId);
    setNodeLabel(row.nodeLabel === "—" ? "" : row.nodeLabel);
    setModule(row.module);
    setCommissionType(row.commissionType);
    setCommissionValue(String(row.commissionValue));
    setReason(row.reason === "—" ? "" : row.reason);

    setEffectiveFrom(
      row.effectiveFrom && row.effectiveFrom !== "—"
        ? row.effectiveFrom
        : new Date().toISOString().slice(0, 10)
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value = Number(commissionValue);

    if (!nodeId.trim()) {
      pushToast("error", "Please enter the node ID.");
      return;
    }

    if (!nodeLabel.trim()) {
      pushToast("error", "Please enter the node name.");
      return;
    }

    if (!module) {
      pushToast("error", "Please select a module.");
      return;
    }

    if (
      commissionValue.trim() === "" ||
      !Number.isFinite(value)
    ) {
      pushToast("error", "Please enter a valid commission value.");
      return;
    }

    if (value < 0) {
      pushToast("error", "Commission value cannot be negative.");
      return;
    }

    if (commissionType === "PERCENTAGE" && value > 100) {
      pushToast("error", "Percentage cannot be greater than 100%.");
      return;
    }

    if (!effectiveFrom) {
      pushToast("error", "Please select the effective date.");
      return;
    }

    if (!reason.trim()) {
      pushToast("error", "Please provide a reason for the override.");
      return;
    }

    const payload = {
      nodeType,
      nodeId: nodeId.trim(),
      nodeLabel: nodeLabel.trim(),
      module,
      commissionType,
      commissionValue: value,
      reason: reason.trim(),
      effectiveFrom,
    };

    try {
      setLoading(true);

      if (editingId) {
        await updateOverride(editingId, payload);

        pushToast(
          "success",
          `Override updated · ${nodeLabel.trim()} (${module})`
        );
      } else {
        await createOverride(payload);

        pushToast(
          "success",
          `Override created · ${nodeLabel.trim()} (${module})`
        );
      }

      resetForm();
    } catch (error: unknown) {
      console.error("Node override error:", error);

      pushToast(
        "error",
        error instanceof Error
          ? error.message
          : "Unable to save node override."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (row: CommissionOverride) => {
    try {
      setActionId(row.id);

      await toggleStatus(row.id);

      pushToast(
        "success",
        row.status === "ACTIVE"
          ? `${row.nodeLabel} disabled`
          : `${row.nodeLabel} enabled`
      );
    } catch (error: unknown) {
      pushToast(
        "error",
        error instanceof Error
          ? error.message
          : "Unable to update status."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (row: CommissionOverride) => {
    const confirmed = window.confirm(
      `Delete override for ${row.nodeLabel} (${row.module})?\n\n${row.id}`
    );

    if (!confirmed) return;

    try {
      setActionId(row.id);

      await removeOverride(row.id);

      if (editingId === row.id) {
        resetForm();
      }

      pushToast("success", `Deleted override · ${row.nodeLabel}`);
    } catch (error: unknown) {
      pushToast(
        "error",
        error instanceof Error
          ? error.message
          : "Unable to remove override."
      );
    } finally {
      setActionId(null);
    }
  };

  const query = search.trim().toLowerCase();

  const filteredOverrides = overrides.filter((override) => {
    if (!query) return true;

    return (
      String(override.id ?? "").toLowerCase().includes(query) ||
      String(override.nodeId ?? "").toLowerCase().includes(query) ||
      String(override.nodeLabel ?? "").toLowerCase().includes(query) ||
      String(override.nodeType ?? "").toLowerCase().includes(query) ||
      String(override.module ?? "").toLowerCase().includes(query) ||
      String(override.status ?? "").toLowerCase().includes(query)
    );
  });

  function formatCommission(override: CommissionOverride) {
    const value = Number(override.commissionValue);

    return override.commissionType === "PERCENTAGE"
      ? `${value}%`
      : `₹${value.toFixed(2)}`;
  }

  function StatusBadge({ status }: { status: string }) {
    return (
      <span
        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
          status === "ACTIVE"
            ? "bg-green-100 text-green-700"
            : "bg-slate-100 text-slate-600"
        }`}
      >
        {status}
      </span>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Toast notifications */}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[calc(100vw-2rem)] max-w-[22rem] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
              toast.type === "success"
                ? "border-green-200 bg-green-50/95 text-green-800"
                : "border-red-200 bg-red-50/95 text-red-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <Ban className="mt-0.5 h-4 w-4 shrink-0" />
            )}

            <p className="flex-1 text-sm font-medium leading-5">
              {toast.text}
            </p>

            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="rounded-md p-0.5 opacity-60 hover:opacity-100"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Page header */}
      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Node Overrides
            </h1>

            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              State / district / pincode / vendor / captain overrides.
              Wins over global rules; loses to vendor-negotiated rates
              when both exist, according to backend resolution.
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Collection: <code>commission_overrides</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={dataLoading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {dataLoading ? "Refreshing…" : "Refresh"}
            </button>

            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="text-xs font-semibold text-orange-700">
                JUERP Governance
              </p>
              <p className="mt-1 text-xs text-orange-600">
                Overrides require a reason and stay under ERP audit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {dataError && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
        >
          <p className="text-sm text-red-700">{dataError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Create / Edit form */}
        <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="mb-6 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit node override" : "Create node override"}
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {editingId
                  ? `Updating ${editingId}`
                  : "Module-specific rate for an authorized node."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-orange-600"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="nodeType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Node type
              </label>

              <select
                id="nodeType"
                value={nodeType}
                onChange={(event) =>
                  setNodeType(event.target.value as NodeType)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                {NODE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="nodeId"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Node ID
              </label>

              <input
                id="nodeId"
                type="text"
                value={nodeId}
                onChange={(event) => setNodeId(event.target.value)}
                placeholder="e.g. STATE_AP · DIST_GNT · PIN_522001"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nodeLabel"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Node name
              </label>

              <input
                id="nodeLabel"
                type="text"
                value={nodeLabel}
                onChange={(event) => setNodeLabel(event.target.value)}
                placeholder="e.g. Andhra Pradesh · Guntur"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="module"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Module
              </label>

              <select
                id="module"
                value={module}
                onChange={(event) => setModule(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              >
                {COMMISSION_MODULES.map((item) => (
                  <option key={item} value={item}>
                    {MODULE_LABELS[item] ?? item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="commissionType"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Commission type
              </label>

              <select
                id="commissionType"
                value={commissionType}
                onChange={(event) =>
                  setCommissionType(
                    event.target.value as CommissionType
                  )
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FIXED">Fixed amount (₹)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="commissionValue"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Commission value
              </label>

              <div className="relative">
                {commissionType === "FIXED" && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    ₹
                  </span>
                )}

                <input
                  id="commissionValue"
                  type="number"
                  min="0"
                  max={
                    commissionType === "PERCENTAGE" ? "100" : undefined
                  }
                  step="0.01"
                  value={commissionValue}
                  onChange={(event) =>
                    setCommissionValue(event.target.value)
                  }
                  placeholder={
                    commissionType === "PERCENTAGE" ? "e.g. 15" : "e.g. 40"
                  }
                  className={`w-full rounded-lg border border-slate-300 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
                    commissionType === "FIXED"
                      ? "pl-8 pr-10"
                      : "pl-3 pr-10"
                  }`}
                  required
                />

                {commissionType === "PERCENTAGE" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    %
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="effectiveFrom"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Effective from
              </label>

              <input
                id="effectiveFrom"
                type="date"
                value={effectiveFrom}
                onChange={(event) =>
                  setEffectiveFrom(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason (required)
              </label>

              <textarea
                id="reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                rows={3}
                placeholder="Why this node differs from global rule…"
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Saving…"
                : editingId
                  ? "Update override"
                  : "Create override"}
            </button>
          </form>
        </div>

        {/* Existing overrides */}
        <div className="min-w-0 rounded-xl bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Existing overrides
                </h2>

                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Pencil className="h-3 w-3" /> Edit
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Power className="h-3 w-3" /> Enable / Disable
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /> Delete
                  </span>
                </p>
              </div>

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search overrides…"
                aria-label="Search overrides"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
              />
            </div>
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Node",
                    "Module",
                    "Commission",
                    "Effective",
                    "Status",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className={`whitespace-nowrap px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                        heading === "Actions" ? "text-right" : ""
                      }`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {dataLoading && filteredOverrides.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      Loading overrides…
                    </td>
                  </tr>
                ) : filteredOverrides.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No node overrides found.
                    </td>
                  </tr>
                ) : (
                  filteredOverrides.map((override) => {
                    const busy = actionId === override.id;

                    return (
                      <tr
                        key={override.id}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                            {override.nodeType}
                          </span>

                          <p className="mt-2 text-sm font-semibold text-slate-900">
                            {String(override.nodeLabel ?? "")}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {override.nodeId}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="whitespace-nowrap rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
                            {MODULE_LABELS[override.module] ??
                              override.module}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {formatCommission(override)}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {override.commissionType}
                          </p>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                          {override.effectiveFrom}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={override.status} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Edit"
                              aria-label={`Edit ${override.nodeLabel}`}
                              disabled={busy}
                              onClick={() => loadIntoForm(override)}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:opacity-40"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              title={
                                override.status === "ACTIVE"
                                  ? "Disable"
                                  : "Enable"
                              }
                              aria-label={
                                override.status === "ACTIVE"
                                  ? `Disable ${override.nodeLabel}`
                                  : `Enable ${override.nodeLabel}`
                              }
                              disabled={busy}
                              onClick={() => void handleToggle(override)}
                              className={`rounded-lg p-2 transition disabled:opacity-40 ${
                                override.status === "ACTIVE"
                                  ? "text-amber-600 hover:bg-amber-50"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                            >
                              {override.status === "ACTIVE" ? (
                                <Ban className="h-4 w-4" />
                              ) : (
                                <Power className="h-4 w-4" />
                              )}
                            </button>

                            <button
                              type="button"
                              title="Delete"
                              aria-label={`Delete ${override.nodeLabel}`}
                              disabled={busy}
                              onClick={() => void handleDelete(override)}
                              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 disabled:opacity-40"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 p-4 md:hidden">
            {dataLoading && filteredOverrides.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                Loading overrides…
              </p>
            ) : filteredOverrides.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                No node overrides found.
              </p>
            ) : (
              filteredOverrides.map((override) => {
                const busy = actionId === override.id;

                return (
                  <div
                    key={override.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                          {override.nodeType}
                        </span>

                        <h3 className="mt-2 break-words text-sm font-semibold text-slate-900">
                          {String(override.nodeLabel ?? "")}
                        </h3>

                        <p className="mt-1 break-all text-xs text-slate-400">
                          {override.nodeId}
                        </p>
                      </div>

                      <StatusBadge status={override.status} />
                    </div>

                    <p className="mt-3 break-words text-sm font-semibold text-slate-900">
                      {MODULE_LABELS[override.module] ?? override.module}
                      {" · "}
                      {formatCommission(override)}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Effective from: {override.effectiveFrom}
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => loadIntoForm(override)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>

                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleToggle(override)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-200 py-2 text-xs font-semibold text-amber-700 transition hover:bg-amber-50 disabled:opacity-40"
                      >
                        {override.status === "ACTIVE" ? (
                          <>
                            <Ban className="h-3.5 w-3.5" />
                            Off
                          </>
                        ) : (
                          <>
                            <Power className="h-3.5 w-3.5" />
                            On
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => void handleDelete(override)}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Governance information */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Override governance
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Resolution order (backend): vendor rate → node override → global
          rule. This UI stores configuration; commission calculation stays
          server-side.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {NODE_TYPES.map((type) => (
            <div
              key={type}
              className="rounded-lg border border-slate-200 bg-slate-50 p-3"
            >
              <p className="text-xs font-semibold text-slate-700">
                {type}
              </p>

              <p className="mt-1 text-[11px] text-slate-500">
                Authorized scope
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}