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
// import { useVendorCommissionRates } from "@/hooks/useCommissionEngine";

// const MODULES = ["JUCART", "JURIDE", "JUSTAY", "JUHOME", "JUSHOPPING"];

// export default function VendorRatesPage() {
//   const {
//     rates,
//     loading: dataLoading,
//     error: dataError,
//     createRate,
//     toggleStatus,
//     removeRate,
//     refresh,
//   } = useVendorCommissionRates();

//   const [vendorId, setVendorId] = useState("");
//   const [vendorName, setVendorName] = useState("");
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

//     if (!vendorId.trim()) {
//       setError("Please enter the vendor ID.");
//       return;
//     }
//     if (!vendorName.trim()) {
//       setError("Please enter the vendor name.");
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

//     try {
//       setLoading(true);
//       await createRate({
//         vendorId: vendorId.trim(),
//         vendorName: vendorName.trim(),
//         module,
//         commissionType,
//         commissionValue: value,
//         reason: reason.trim() || "Vendor-negotiated rate",
//         effectiveFrom,
//       });
//       setMessage(
//         `Vendor rate created successfully for ${vendorName.trim()}.`
//       );
//       setVendorId("");
//       setVendorName("");
//       setCommissionValue("");
//       setReason("");
//     } catch (err) {
//       console.error("Vendor rate creation error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to create vendor rate."
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
//       setMessage("Vendor rate status updated.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to update status."
//       );
//     }
//   };

//   const handleDelete = async (id: string) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to remove this vendor rate?"
//     );
//     if (!confirmed) return;
//     setMessage("");
//     setError("");
//     try {
//       await removeRate(id);
//       setMessage("Vendor rate removed.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to remove rate."
//       );
//     }
//   };

//   const filteredRates = rates.filter((rate) => {
//     const q = search.trim().toLowerCase();
//     if (!q) return true;
//     return (
//       rate.id.toLowerCase().includes(q) ||
//       rate.vendorId.toLowerCase().includes(q) ||
//       rate.vendorName.toLowerCase().includes(q) ||
//       rate.module.toLowerCase().includes(q) ||
//       rate.status.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">Vendor Rates</h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Live data from Firestore <code>vendor_commission_rates</code>.
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
//                 Vendor rates must remain under ERP authorization and audit
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
//               Create Vendor Rate
//             </h2>
//             <p className="mt-1 text-xs leading-5 text-slate-500">
//               Set a negotiated commission rate for an individual vendor.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label
//                 htmlFor="vendorId"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Vendor ID
//               </label>
//               <input
//                 id="vendorId"
//                 type="text"
//                 value={vendorId}
//                 onChange={(e) => setVendorId(e.target.value)}
//                 placeholder="Example: VND_001"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="vendorName"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Vendor Name
//               </label>
//               <input
//                 id="vendorName"
//                 type="text"
//                 value={vendorName}
//                 onChange={(e) => setVendorName(e.target.value)}
//                 placeholder="Example: Sample Food Vendor"
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
//                     commissionType === "PERCENTAGE" ? "Example: 8" : "Example: 50"
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
//                 Reason (optional)
//               </label>
//               <textarea
//                 id="reason"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 rows={3}
//                 placeholder="Negotiated rate reason..."
//                 className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? "Creating Rate..." : "Create Vendor Rate"}
//             </button>
//           </form>
//         </div>

//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Existing Vendor Rates
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Review and manage negotiated vendor rates.
//                 </p>
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search rates..."
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {["Vendor", "Module", "Commission", "Effective", "Status", "Actions"].map(
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
//                 {dataLoading && filteredRates.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       Loading rates…
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredRates.map((rate) => (
//                     <tr key={rate.id} className="transition hover:bg-slate-50">
//                       <td className="px-5 py-4">
//                         <p className="text-sm font-semibold text-slate-900">
//                           {rate.vendorName}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           {rate.vendorId}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4">
//                         <span className="rounded-md bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-700">
//                           {rate.module}
//                         </span>
//                       </td>
//                       <td className="px-5 py-4">
//                         <p className="text-sm font-semibold text-slate-900">
//                           {rate.commissionType === "PERCENTAGE"
//                             ? `${rate.commissionValue}%`
//                             : `₹${rate.commissionValue.toFixed(2)}`}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           {rate.commissionType}
//                         </p>
//                       </td>
//                       <td className="px-5 py-4 text-sm text-slate-600">
//                         {rate.effectiveFrom}
//                       </td>
//                       <td className="px-5 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                             rate.status === "ACTIVE"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {rate.status}
//                         </span>
//                       </td>
//                       <td className="px-5 py-4">
//                         <div className="flex justify-end gap-3">
//                           <button
//                             type="button"
//                             onClick={() => void handleToggle(rate.id)}
//                             className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                           >
//                             {rate.status === "ACTIVE" ? "Disable" : "Enable"}
//                           </button>
//                           <button
//                             type="button"
//                             onClick={() => void handleDelete(rate.id)}
//                             className="text-xs font-semibold text-red-600 hover:text-red-700"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 {!dataLoading && filteredRates.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No vendor rates found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="space-y-4 p-4 md:hidden">
//             {filteredRates.map((rate) => (
//               <div
//                 key={rate.id}
//                 className="rounded-xl border border-slate-200 p-4"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="text-sm font-semibold text-slate-900">
//                       {rate.vendorName}
//                     </h3>
//                     <p className="mt-1 text-xs text-slate-400">
//                       {rate.vendorId}
//                     </p>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       rate.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {rate.status}
//                   </span>
//                 </div>
//                 <div className="mt-4 grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-xs text-slate-400">Module</p>
//                     <p className="mt-1 text-sm font-semibold text-purple-600">
//                       {rate.module}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Commission</p>
//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {rate.commissionType === "PERCENTAGE"
//                         ? `${rate.commissionValue}%`
//                         : `₹${rate.commissionValue.toFixed(2)}`}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Effective From</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {rate.effectiveFrom}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Type</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {rate.commissionType}
//                     </p>
//                   </div>
//                 </div>
//                 {rate.reason && (
//                   <div className="mt-4 rounded-lg bg-slate-50 p-3">
//                     <p className="text-xs font-medium text-slate-500">Reason</p>
//                     <p className="mt-1 text-xs leading-5 text-slate-600">
//                       {rate.reason}
//                     </p>
//                   </div>
//                 )}
//                 <div className="mt-4 flex gap-3">
//                   <button
//                     type="button"
//                     onClick={() => void handleToggle(rate.id)}
//                     className="flex-1 rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50"
//                   >
//                     {rate.status === "ACTIVE" ? "Disable" : "Enable"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => void handleDelete(rate.id)}
//                     className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//             {!dataLoading && filteredRates.length === 0 && (
//               <p className="py-8 text-center text-sm text-slate-500">
//                 No vendor rates found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Vendor Rate Governance
//         </h3>
//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Vendor rates are stored in Firestore. Applicable rate resolution and
//           financial calculation must remain in the trusted backend — the client
//           only configures and displays rates.
//         </p>
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
  useVendorCommissionRates,
  COMMISSION_MODULES,
  type CommissionType,
  type VendorCommissionRate,
} from "@/hooks/useCommissionEngine";

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

export default function VendorRatesPage() {
  const {
    rates,
    loading: dataLoading,
    error: dataError,
    createRate,
    updateRate,
    toggleStatus,
    removeRate,
    refresh,
  } = useVendorCommissionRates();

  const [vendorId, setVendorId] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [module, setModule] = useState("FOOD");
  const [commissionType, setCommissionType] = useState<CommissionType>(
    "PERCENTAGE"
  );
  const [commissionValue, setCommissionValue] = useState("");
  const [reason, setReason] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  function pushToast(type: Toast["type"], text: string) {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, text }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    if (!effectiveFrom) {
      setEffectiveFrom(new Date().toISOString().slice(0, 10));
    }
  }, [effectiveFrom]);

  function loadIntoForm(rate: VendorCommissionRate) {
    setEditingId(rate.id);
    setVendorId(rate.vendorId === "—" ? "" : rate.vendorId);
    setVendorName(rate.vendorName === "—" ? "" : rate.vendorName);
    setModule(rate.module);
    setCommissionType(rate.commissionType);
    setCommissionValue(String(rate.commissionValue));
    setReason(rate.reason === "—" ? "" : rate.reason);
    setEffectiveFrom(
      rate.effectiveFrom && rate.effectiveFrom !== "—"
        ? rate.effectiveFrom
        : new Date().toISOString().slice(0, 10)
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setVendorId("");
    setVendorName("");
    setCommissionValue("");
    setReason("");
    setEffectiveFrom(new Date().toISOString().slice(0, 10));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = Number(commissionValue);

    if (!vendorId.trim()) {
      pushToast("error", "Please enter the vendor ID.");
      return;
    }
    if (!vendorName.trim()) {
      pushToast("error", "Please enter the vendor name.");
      return;
    }
    if (!module) {
      pushToast("error", "Please select a module.");
      return;
    }
    if (commissionValue === "" || Number.isNaN(value)) {
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

    const payload = {
      vendorId: vendorId.trim(),
      vendorName: vendorName.trim(),
      module,
      commissionType,
      commissionValue: value,
      reason: reason.trim() || "Vendor-negotiated rate",
      effectiveFrom,
    };

    try {
      setLoading(true);
      if (editingId) {
        await updateRate(editingId, payload);
        pushToast(
          "success",
          `Rate updated · ${vendorName.trim()} (${module})`
        );
      } else {
        await createRate(payload);
        pushToast(
          "success",
          `Rate created · ${vendorName.trim()} (${module})`
        );
      }
      resetForm();
    } catch (err) {
      console.error("Vendor rate error:", err);
      pushToast(
        "error",
        err instanceof Error ? err.message : "Unable to save vendor rate."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (rate: VendorCommissionRate) => {
    try {
      setActionId(rate.id);
      await toggleStatus(rate.id);
      pushToast(
        "success",
        rate.status === "ACTIVE"
          ? `${rate.vendorName} disabled`
          : `${rate.vendorName} enabled`
      );
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Unable to update status."
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (rate: VendorCommissionRate) => {
    const ok = window.confirm(
      `Delete rate for ${rate.vendorName} (${rate.module})?\n\n${rate.id}`
    );
    if (!ok) return;
    try {
      setActionId(rate.id);
      await removeRate(rate.id);
      if (editingId === rate.id) resetForm();
      pushToast("success", `Deleted · ${rate.vendorName}`);
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Unable to remove rate."
      );
    } finally {
      setActionId(null);
    }
  };

  const filteredRates = rates.filter((rate) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      rate.id.toLowerCase().includes(q) ||
      rate.vendorId.toLowerCase().includes(q) ||
      rate.vendorName.toLowerCase().includes(q) ||
      rate.module.toLowerCase().includes(q) ||
      rate.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Floating toasts — top right */}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(100vw-2rem,22rem)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm ${
              t.type === "success"
                ? "border-green-200 bg-green-50/95 text-green-800"
                : "border-red-200 bg-red-50/95 text-red-800"
            }`}
            role="status"
          >
            {t.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <Ban className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <p className="flex-1 text-sm font-medium leading-5">{t.text}</p>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              className="rounded-md p-0.5 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vendor Rates</h1>
            <p className="mt-1 text-sm text-slate-500">
              Negotiated commission per vendor (wins over global &amp; node
              rules). Collection:{" "}
              <code>vendor_commission_rates</code>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={dataLoading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
            >
              {dataLoading ? "Refreshing…" : "Refresh"}
            </button>
            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="text-xs font-semibold text-orange-700">
                JUERP Governance
              </p>
              <p className="mt-1 text-xs text-orange-600">
                Rates stay under ERP authorization and audit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {dataError && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">{dataError}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="mb-6 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit vendor rate" : "Create vendor rate"}
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {editingId
                  ? `Updating ${editingId}`
                  : "Per-vendor deal after KYC / negotiation."}
              </p>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-500 hover:text-orange-600"
              >
                Clear
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="vendorId"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Vendor ID
              </label>
              <input
                id="vendorId"
                type="text"
                value={vendorId}
                onChange={(e) => setVendorId(e.target.value)}
                placeholder="e.g. 3eWSP…_FOOD"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="vendorName"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Vendor name
              </label>
              <input
                id="vendorName"
                type="text"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                placeholder="e.g. Amma Hotel"
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                onChange={(e) => setModule(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                onChange={(e) =>
                  setCommissionType(e.target.value as CommissionType)
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
                  step="0.01"
                  value={commissionValue}
                  onChange={(e) => setCommissionValue(e.target.value)}
                  placeholder={
                    commissionType === "PERCENTAGE" ? "e.g. 12" : "e.g. 40"
                  }
                  className={`w-full rounded-lg border border-slate-300 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
                    commissionType === "FIXED" ? "pl-8 pr-10" : "px-3 pr-10"
                  }`}
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
                onChange={(e) => setEffectiveFrom(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason (optional)
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                placeholder="Negotiated rate reason…"
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                  ? "Update vendor rate"
                  : "Create vendor rate"}
            </button>
          </form>
        </div>

        <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Existing vendor rates
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Pencil className="h-3 w-3" /> Edit
                  </span>
                  {" · "}
                  <span className="inline-flex items-center gap-1">
                    <Power className="h-3 w-3" /> Enable / Disable
                  </span>
                  {" · "}
                  <span className="inline-flex items-center gap-1">
                    <Trash2 className="h-3 w-3" /> Delete
                  </span>
                </p>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rates…"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
              />
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Vendor",
                    "Module",
                    "Commission",
                    "Effective",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                        h === "Actions" ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataLoading && filteredRates.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      Loading rates…
                    </td>
                  </tr>
                ) : (
                  filteredRates.map((rate) => {
                    const busy = actionId === rate.id;
                    return (
                      <tr key={rate.id} className="transition hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {rate.vendorName}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {rate.vendorId}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="rounded-md bg-purple-50 px-2 py-1 text-xs font-semibold text-purple-700">
                            {rate.module}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-slate-900">
                            {rate.commissionType === "PERCENTAGE"
                              ? `${rate.commissionValue}%`
                              : `₹${rate.commissionValue.toFixed(2)}`}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {rate.commissionType}
                          </p>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {rate.effectiveFrom}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              rate.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {rate.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Edit"
                              disabled={busy}
                              onClick={() => loadIntoForm(rate)}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:opacity-40"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              title={
                                rate.status === "ACTIVE" ? "Disable" : "Enable"
                              }
                              disabled={busy}
                              onClick={() => void handleToggle(rate)}
                              className={`rounded-lg p-2 transition disabled:opacity-40 ${
                                rate.status === "ACTIVE"
                                  ? "text-amber-600 hover:bg-amber-50"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                            >
                              {rate.status === "ACTIVE" ? (
                                <Ban className="h-4 w-4" />
                              ) : (
                                <Power className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              disabled={busy}
                              onClick={() => void handleDelete(rate)}
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
                {!dataLoading && filteredRates.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No vendor rates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 p-4 md:hidden">
            {filteredRates.map((rate) => {
              const busy = actionId === rate.id;
              return (
                <div
                  key={rate.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {rate.vendorName}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {rate.vendorId}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        rate.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {rate.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {rate.module} ·{" "}
                    {rate.commissionType === "PERCENTAGE"
                      ? `${rate.commissionValue}%`
                      : `₹${rate.commissionValue.toFixed(2)}`}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => loadIntoForm(rate)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleToggle(rate)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-200 py-2 text-xs font-semibold text-amber-700"
                    >
                      {rate.status === "ACTIVE" ? (
                        <>
                          <Ban className="h-3.5 w-3.5" /> Off
                        </>
                      ) : (
                        <>
                          <Power className="h-3.5 w-3.5" /> On
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleDelete(rate)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Del
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-slate-900">
          Vendor rate governance
        </h3>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Resolution order (backend):{" "}
          <strong>vendor rate → node override → global rule</strong>. This page
          only configures rates; settlement math stays on the trusted backend.
        </p>
      </div>
    </div>
  );
}