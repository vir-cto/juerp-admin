// "use client";

// import { FormEvent, useState } from "react";


// type CommissionRule = {
//   id: string;
//   module: string;
//   commissionType: "PERCENTAGE" | "FIXED";
//   commissionValue: number;
//   effectiveFrom: string;
//   status: "ACTIVE" | "INACTIVE";
// };

// const INITIAL_RULES: CommissionRule[] = [
//   {
//     id: "RULE-JUCART-001",
//     module: "JUCART",
//     commissionType: "PERCENTAGE",
//     commissionValue: 10,
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
//   {
//     id: "RULE-JURIDE-001",
//     module: "JURIDE",
//     commissionType: "PERCENTAGE",
//     commissionValue: 15,
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
//   {
//     id: "RULE-JUSTAY-001",
//     module: "JUSTAY",
//     commissionType: "PERCENTAGE",
//     commissionValue: 12,
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
//   {
//     id: "RULE-JUHOME-001",
//     module: "JUHOME",
//     commissionType: "PERCENTAGE",
//     commissionValue: 10,
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
//   {
//     id: "RULE-JUSHOPPING-001",
//     module: "JUSHOPPING",
//     commissionType: "PERCENTAGE",
//     commissionValue: 8,
//     effectiveFrom: "2026-01-01",
//     status: "ACTIVE",
//   },
// ];

// const MODULES = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// export default function GlobalRulesPage() {
//   const [rules, setRules] = useState<CommissionRule[]>(INITIAL_RULES);

//   const [module, setModule] = useState("JUCART");
//   const [commissionType, setCommissionType] =
//     useState<"PERCENTAGE" | "FIXED">("PERCENTAGE");
//   const [commissionValue, setCommissionValue] = useState("");
//   const [effectiveFrom, setEffectiveFrom] = useState("");

//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // ---------------------------------------------------
//   // Add / Update Rule
//   // ---------------------------------------------------

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     setMessage("");
//     setError("");

//     const value = Number(commissionValue);

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

//       /*
//        * IMPORTANT:
//        * In the production JUERP architecture, this operation should
//        * be sent to a secured Cloud Function / backend endpoint.
//        *
//        * The client must NOT directly calculate commissions or
//        * modify financial settlement values.
//        *
//        * This local update keeps the page functional until the
//        * backend service is connected.
//        */

//       const existingRule = rules.find(
//         (rule) => rule.module === module
//       );

//       if (existingRule) {
//         setRules((currentRules) =>
//           currentRules.map((rule) =>
//             rule.module === module
//               ? {
//                   ...rule,
//                   commissionType,
//                   commissionValue: value,
//                   effectiveFrom,
//                   status: "ACTIVE",
//                 }
//               : rule
//           )
//         );

//         setMessage(`Commission rule for ${module} updated successfully.`);
//       } else {
//         const newRule: CommissionRule = {
//           id: `RULE-${module}-${Date.now()}`,
//           module,
//           commissionType,
//           commissionValue: value,
//           effectiveFrom,
//           status: "ACTIVE",
//         };

//         setRules((currentRules) => [...currentRules, newRule]);

//         setMessage(`Commission rule for ${module} created successfully.`);
//       }

//       setCommissionValue("");
//     } catch (err) {
//       console.error("Commission rule error:", err);
//       setError("Unable to save commission rule.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------------------------------------------------
//   // Toggle Rule Status
//   // ---------------------------------------------------

//   const toggleStatus = (ruleId: string) => {
//     setRules((currentRules) =>
//       currentRules.map((rule) =>
//         rule.id === ruleId
//           ? {
//               ...rule,
//               status:
//                 rule.status === "ACTIVE"
//                   ? "INACTIVE"
//                   : "ACTIVE",
//             }
//           : rule
//       )
//     );

//     setMessage("Rule status updated.");
//     setError("");
//   };

//   // ---------------------------------------------------
//   // Search
//   // ---------------------------------------------------

//   const filteredRules = rules.filter((rule) => {
//     const searchValue = search.toLowerCase();

//     return (
//       rule.module.toLowerCase().includes(searchValue) ||
//       rule.id.toLowerCase().includes(searchValue) ||
//       rule.status.toLowerCase().includes(searchValue)
//     );
//   });

//   // ---------------------------------------------------
//   // UI
//   // ---------------------------------------------------

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Global Commission Rules
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Configure platform commission rules for JUONE modules.
//             </p>
//           </div>

//           <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-medium text-orange-700">
//               JUERP Financial Control
//             </p>

//             <p className="mt-1 text-xs text-orange-600">
//               Commission rules are authoritative ERP configuration.
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

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* Create / Update Rule */}
//         <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">

//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-slate-900">
//               Commission Rule
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Create or update a module-level commission rule.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">

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
//                 onChange={(event) => setModule(event.target.value)}
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="PERCENTAGE">
//                   Percentage
//                 </option>

//                 <option value="FIXED">
//                   Fixed Amount
//                 </option>
//               </select>
//             </div>

//             {/* Value */}
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
//                     setCommissionValue(event.target.value)
//                   }
//                   placeholder={
//                     commissionType === "PERCENTAGE"
//                       ? "Example: 10"
//                       : "Example: 100"
//                   }
//                   className={`w-full rounded-lg border border-slate-300 bg-white py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED"
//                       ? "pl-8 pr-12"
//                       : "px-3 pr-12"
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
//                   setEffectiveFrom(event.target.value)
//                 }
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? "Saving..." : "Save Commission Rule"}
//             </button>
//           </form>
//         </div>

//         {/* Rules Table */}
//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">

//           {/* Table Header */}
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Global Rules
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Active commission configuration by module.
//                 </p>
//               </div>

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 placeholder="Search rules..."
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           {/* Desktop Table */}
//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">

//               <thead className="bg-slate-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Rule ID
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Module
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Type
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Value
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Effective
//                   </th>

//                   <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Status
//                   </th>

//                   <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {filteredRules.map((rule) => (
//                   <tr
//                     key={rule.id}
//                     className="transition hover:bg-slate-50"
//                   >
//                     <td className="px-6 py-4">
//                       <span className="text-xs font-medium text-slate-700">
//                         {rule.id}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                         {rule.module}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4 text-sm text-slate-600">
//                       {rule.commissionType}
//                     </td>

//                     <td className="px-6 py-4 text-sm font-semibold text-slate-900">
//                       {rule.commissionType === "PERCENTAGE"
//                         ? `${rule.commissionValue}%`
//                         : `₹${rule.commissionValue.toFixed(2)}`}
//                     </td>

//                     <td className="px-6 py-4 text-sm text-slate-600">
//                       {rule.effectiveFrom}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           rule.status === "ACTIVE"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-slate-100 text-slate-600"
//                         }`}
//                       >
//                         {rule.status}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4 text-right">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           toggleStatus(rule.id)
//                         }
//                         className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         {rule.status === "ACTIVE"
//                           ? "Disable"
//                           : "Enable"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}

//                 {filteredRules.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No commission rules found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Cards */}
//           <div className="space-y-4 p-4 md:hidden">
//             {filteredRules.map((rule) => (
//               <div
//                 key={rule.id}
//                 className="rounded-lg border border-slate-200 p-4"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Rule ID
//                     </p>

//                     <p className="mt-1 text-xs font-semibold text-slate-700">
//                       {rule.id}
//                     </p>
//                   </div>

//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       rule.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {rule.status}
//                   </span>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-4">

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Module
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-orange-600">
//                       {rule.module}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Commission
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {rule.commissionType === "PERCENTAGE"
//                         ? `${rule.commissionValue}%`
//                         : `₹${rule.commissionValue.toFixed(2)}`}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Type
//                     </p>

//                     <p className="mt-1 text-sm text-slate-700">
//                       {rule.commissionType}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">
//                       Effective From
//                     </p>

//                     <p className="mt-1 text-sm text-slate-700">
//                       {rule.effectiveFrom}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => toggleStatus(rule.id)}
//                   className="mt-4 w-full rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
//                 >
//                   {rule.status === "ACTIVE"
//                     ? "Disable Rule"
//                     : "Enable Rule"}
//                 </button>
//               </div>
//             ))}

//             {filteredRules.length === 0 && (
//               <p className="py-8 text-center text-sm text-slate-500">
//                 No commission rules found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Architecture Note */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Financial Governance
//         </h3>

//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Commission rules configured in JUERP are authoritative
//           financial configuration. Order totals, vendor commission,
//           platform margin, settlements, and payouts must be calculated
//           and persisted by the trusted backend using the applicable
//           ERP rule version.
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { FormEvent, useState } from "react";
// import { useGlobalCommissionRules } from "@/hooks/useCommissionEngine";

// const MODULES = ["JUCART", "JURIDE", "JUSTAY", "JUHOME", "JUSHOPPING"];

// export default function GlobalRulesPage() {
//   const {
//     rules,
//     loading: dataLoading,
//     error: dataError,
//     saveRule,
//     toggleStatus,
//     refresh,
//   } = useGlobalCommissionRules();

//   const [module, setModule] = useState("JUCART");
//   const [commissionType, setCommissionType] = useState<"PERCENTAGE" | "FIXED">(
//     "PERCENTAGE"
//   );
//   const [commissionValue, setCommissionValue] = useState("");
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
//       await saveRule({
//         module,
//         commissionType,
//         commissionValue: value,
//         effectiveFrom,
//       });
//       setMessage(`Commission rule for ${module} saved successfully.`);
//       setCommissionValue("");
//     } catch (err) {
//       console.error("Commission rule error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to save commission rule."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (ruleId: string) => {
//     setMessage("");
//     setError("");
//     try {
//       await toggleStatus(ruleId);
//       setMessage("Rule status updated.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to update status."
//       );
//     }
//   };

//   const filteredRules = rules.filter((rule) => {
//     const q = search.toLowerCase();
//     return (
//       rule.module.toLowerCase().includes(q) ||
//       rule.id.toLowerCase().includes(q) ||
//       rule.status.toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Global Commission Rules
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Live data from Firestore <code>commission_rules</code>.
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
//             <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-medium text-orange-700">
//                 JUERP Financial Control
//               </p>
//               <p className="mt-1 text-xs text-orange-600">
//                 Commission rules are authoritative ERP configuration.
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
//               Commission Rule
//             </h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Create or update a module-level commission rule.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-5">
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
//                   className={`w-full rounded-lg border border-slate-300 bg-white py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED" ? "pl-8 pr-12" : "px-3 pr-12"
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
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-lg bg-orange-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? "Saving..." : "Save Commission Rule"}
//             </button>
//           </form>
//         </div>

//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Global Rules
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Active commission configuration by module.
//                 </p>
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search rules..."
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {["Rule ID", "Module", "Type", "Value", "Effective", "Status", "Action"].map(
//                     (h) => (
//                       <th
//                         key={h}
//                         className={`px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
//                           h === "Action" ? "text-right" : "text-left"
//                         }`}
//                       >
//                         {h}
//                       </th>
//                     )
//                   )}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {dataLoading && filteredRules.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       Loading rules…
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredRules.map((rule) => (
//                     <tr key={rule.id} className="transition hover:bg-slate-50">
//                       <td className="px-6 py-4">
//                         <span className="text-xs font-medium text-slate-700">
//                           {rule.id}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                           {rule.module}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-slate-600">
//                         {rule.commissionType}
//                       </td>
//                       <td className="px-6 py-4 text-sm font-semibold text-slate-900">
//                         {rule.commissionType === "PERCENTAGE"
//                           ? `${rule.commissionValue}%`
//                           : `₹${rule.commissionValue.toFixed(2)}`}
//                       </td>
//                       <td className="px-6 py-4 text-sm text-slate-600">
//                         {rule.effectiveFrom}
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                             rule.status === "ACTIVE"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {rule.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <button
//                           type="button"
//                           onClick={() => void handleToggle(rule.id)}
//                           className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           {rule.status === "ACTIVE" ? "Disable" : "Enable"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 {!dataLoading && filteredRules.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No commission rules found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="space-y-4 p-4 md:hidden">
//             {filteredRules.map((rule) => (
//               <div
//                 key={rule.id}
//                 className="rounded-lg border border-slate-200 p-4"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-slate-400">Rule ID</p>
//                     <p className="mt-1 text-xs font-semibold text-slate-700">
//                       {rule.id}
//                     </p>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       rule.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {rule.status}
//                   </span>
//                 </div>
//                 <div className="mt-4 grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-xs text-slate-400">Module</p>
//                     <p className="mt-1 text-sm font-semibold text-orange-600">
//                       {rule.module}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Commission</p>
//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {rule.commissionType === "PERCENTAGE"
//                         ? `${rule.commissionValue}%`
//                         : `₹${rule.commissionValue.toFixed(2)}`}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Type</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {rule.commissionType}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Effective From</p>
//                     <p className="mt-1 text-sm text-slate-700">
//                       {rule.effectiveFrom}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   type="button"
//                   onClick={() => void handleToggle(rule.id)}
//                   className="mt-4 w-full rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 hover:bg-orange-50"
//                 >
//                   {rule.status === "ACTIVE" ? "Disable Rule" : "Enable Rule"}
//                 </button>
//               </div>
//             ))}
//             {!dataLoading && filteredRules.length === 0 && (
//               <p className="py-8 text-center text-sm text-slate-500">
//                 No commission rules found.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           Financial Governance
//         </h3>
//         <p className="mt-2 text-xs leading-5 text-slate-500">
//           Commission rules are written to Firestore and reloaded live. Order
//           totals, vendor commission, platform margin, settlements, and payouts
//           must still be calculated by the trusted backend using the applicable
//           ERP rule version.
//         </p>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { FormEvent, useEffect, useState } from "react";
// import {
//   useGlobalCommissionRules,
//   COMMISSION_MODULES,
//   type GlobalCommissionRule,
//   type CommissionType,
// } from "@/hooks/useCommissionEngine";

// const MODULE_LABELS: Record<string, string> = {
//   FOOD: "JuCart · Food (restaurant)",
//   MART: "JuCart · Mart (grocery)",
//   PHARMACY: "JuCart · Pharmacy",
//   JUCART: "JuCart · All (legacy umbrella)",
//   JURIDE: "JuRide (rides / logistics family)",
//   JUSTAY: "JuStay (hotels / PG / halls / tourism)",
//   JUHOME: "JuHome (home services)",
//   JUSHOPPING: "JuShopping (marketplace)",
// };

// const DEFAULT_GST: Record<string, number> = {
//   FOOD: 5,
//   MART: 5,
//   PHARMACY: 5,
//   JUCART: 5,
//   JURIDE: 5,
//   JUSTAY: 18,
//   JUHOME: 18,
//   JUSHOPPING: 18,
// };

// export default function GlobalRulesPage() {
//   const {
//     rules,
//     loading: dataLoading,
//     error: dataError,
//     saveRule,
//     toggleStatus,
//     refresh,
//   } = useGlobalCommissionRules();

//   const [module, setModule] = useState("FOOD");
//   const [commissionType, setCommissionType] = useState<CommissionType>(
//     "PERCENTAGE"
//   );
//   const [commissionValue, setCommissionValue] = useState("");
//   const [platformFee, setPlatformFee] = useState("0");
//   const [juoneExtra, setJuoneExtra] = useState("0");
//   const [gstPercent, setGstPercent] = useState("5");
//   const [effectiveFrom, setEffectiveFrom] = useState("");
//   const [notes, setNotes] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [editingId, setEditingId] = useState<string | null>(null);

//   useEffect(() => {
//     if (!effectiveFrom) {
//       setEffectiveFrom(new Date().toISOString().slice(0, 10));
//     }
//   }, [effectiveFrom]);

//   useEffect(() => {
//     const def = DEFAULT_GST[module];
//     if (def !== undefined && !editingId) {
//       setGstPercent(String(def));
//     }
//   }, [module, editingId]);

//   function loadRuleIntoForm(rule: GlobalCommissionRule) {
//     setEditingId(rule.id);
//     setModule(rule.module);
//     setCommissionType(rule.commissionType);
//     setCommissionValue(String(rule.commissionValue));
//     setPlatformFee(String(rule.platformFee ?? 0));
//     setJuoneExtra(String(rule.juoneExtra ?? 0));
//     setGstPercent(String(rule.gstPercent ?? DEFAULT_GST[rule.module] ?? 0));
//     setEffectiveFrom(
//       rule.effectiveFrom && rule.effectiveFrom !== "—"
//         ? rule.effectiveFrom
//         : new Date().toISOString().slice(0, 10)
//     );
//     setNotes(rule.notes ?? "");
//     setMessage("");
//     setError("");
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }

//   function resetForm() {
//     setEditingId(null);
//     setCommissionValue("");
//     setPlatformFee("0");
//     setJuoneExtra("0");
//     setGstPercent(String(DEFAULT_GST[module] ?? 5));
//     setNotes("");
//     setEffectiveFrom(new Date().toISOString().slice(0, 10));
//   }

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     setMessage("");
//     setError("");

//     const value = Number(commissionValue);
//     const fee = Number(platformFee);
//     const extra = Number(juoneExtra);
//     const gst = Number(gstPercent);

//     if (!module) {
//       setError("Please select a module.");
//       return;
//     }
//     if (commissionValue === "" || Number.isNaN(value)) {
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
//     if (Number.isNaN(fee) || fee < 0) {
//       setError("Platform fee must be a non-negative number.");
//       return;
//     }
//     if (Number.isNaN(extra) || extra < 0) {
//       setError("JUONE extra must be a non-negative number.");
//       return;
//     }
//     if (Number.isNaN(gst) || gst < 0 || gst > 100) {
//       setError("GST % must be between 0 and 100.");
//       return;
//     }
//     if (!effectiveFrom) {
//       setError("Please select the effective date.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const id = await saveRule({
//         module,
//         commissionType,
//         commissionValue: value,
//         platformFee: fee,
//         juoneExtra: extra,
//         gstPercent: gst,
//         effectiveFrom,
//         notes: notes.trim(),
//         status: "ACTIVE",
//       });
//       setMessage(
//         `Global rule for ${MODULE_LABELS[module] ?? module} saved (${id}).`
//       );
//       resetForm();
//     } catch (err) {
//       console.error("Commission rule error:", err);
//       setError(
//         err instanceof Error ? err.message : "Unable to save commission rule."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (ruleId: string) => {
//     setMessage("");
//     setError("");
//     try {
//       await toggleStatus(ruleId);
//       setMessage("Rule status updated.");
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to update status."
//       );
//     }
//   };

//   const filteredRules = rules.filter((rule) => {
//     const q = search.toLowerCase();
//     if (!q) return true;
//     return (
//       rule.module.toLowerCase().includes(q) ||
//       rule.id.toLowerCase().includes(q) ||
//       rule.status.toLowerCase().includes(q) ||
//       (MODULE_LABELS[rule.module] ?? "").toLowerCase().includes(q)
//     );
//   });

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Global Commission Rules
//             </h1>
//             <p className="mt-1 text-sm text-slate-500">
//               Default ERP rates per module (Food / Mart / Pharmacy / Ride / Stay
//               / Home / Shopping). Vendor-specific deals go under{" "}
//               <strong>Vendor Rates</strong>. Hierarchy overrides go under{" "}
//               <strong>Overrides</strong>.
//             </p>
//             <p className="mt-1 text-xs text-slate-400">
//               Collection: <code>commission_rules</code> · Doc id pattern:{" "}
//               <code>GLOBAL_&lt;MODULE&gt;</code>
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
//             <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-medium text-orange-700">
//                 JUERP Financial Control
//               </p>
//               <p className="mt-1 text-xs text-orange-600">
//                 Authoritative defaults for settlements &amp; order pricing.
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
//         {/* Form */}
//         <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
//           <div className="mb-6 flex items-start justify-between gap-2">
//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 {editingId ? "Edit global rule" : "Set global rule"}
//               </h2>
//               <p className="mt-1 text-xs text-slate-500">
//                 {editingId
//                   ? `Updating ${editingId}`
//                   : "One active rule per module (upsert)."}
//               </p>
//             </div>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="text-xs font-semibold text-slate-500 hover:text-orange-600"
//               >
//                 Clear
//               </button>
//             )}
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label
//                 htmlFor="module"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Module / vertical
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
//                 <option value="PERCENTAGE">Percentage of order value</option>
//                 <option value="FIXED">Fixed ₹ per order</option>
//               </select>
//             </div>

//             <div>
//               <label
//                 htmlFor="commissionValue"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 JUONE commission
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
//                     commissionType === "PERCENTAGE" ? "e.g. 18" : "e.g. 50"
//                   }
//                   className={`w-full rounded-lg border border-slate-300 bg-white py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
//                     commissionType === "FIXED" ? "pl-8 pr-12" : "px-3 pr-12"
//                   }`}
//                 />
//                 {commissionType === "PERCENTAGE" && (
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
//                     %
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div>
//                 <label
//                   htmlFor="platformFee"
//                   className="mb-2 block text-sm font-medium text-slate-700"
//                 >
//                   Platform fee (₹)
//                 </label>
//                 <input
//                   id="platformFee"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={platformFee}
//                   onChange={(e) => setPlatformFee(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="juoneExtra"
//                   className="mb-2 block text-sm font-medium text-slate-700"
//                 >
//                   JUONE extra (₹)
//                 </label>
//                 <input
//                   id="juoneExtra"
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={juoneExtra}
//                   onChange={(e) => setJuoneExtra(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 />
//               </div>
//             </div>

//             <div>
//               <label
//                 htmlFor="gstPercent"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 GST % (config reference)
//               </label>
//               <input
//                 id="gstPercent"
//                 type="number"
//                 min="0"
//                 max="100"
//                 step="0.01"
//                 value={gstPercent}
//                 onChange={(e) => setGstPercent(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//               <p className="mt-1 text-[11px] text-slate-400">
//                 Food/Mart/Pharmacy typically 5%; Stay/Home/Shopping typically
//                 18%. Final tax logic stays on backend.
//               </p>
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
//                 className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="notes"
//                 className="mb-2 block text-sm font-medium text-slate-700"
//               >
//                 Notes (optional)
//               </label>
//               <textarea
//                 id="notes"
//                 rows={2}
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="e.g. Board-approved default for AP Food"
//                 className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
//                   ? "Update global rule"
//                   : "Save global rule"}
//             </button>
//           </form>
//         </div>

//         {/* Table */}
//         <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
//           <div className="border-b border-slate-200 p-6">
//             <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-900">
//                   Configured global rules
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Click a row to edit. Disable keeps history without applying to
//                   new orders.
//                 </p>
//               </div>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search module / id…"
//                 className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
//               />
//             </div>
//           </div>

//           <div className="hidden overflow-x-auto md:block">
//             <table className="w-full">
//               <thead className="bg-slate-50">
//                 <tr>
//                   {[
//                     "Module",
//                     "Commission",
//                     "Platform / Extra",
//                     "GST",
//                     "Effective",
//                     "Status",
//                     "Action",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
//                         h === "Action" ? "text-right" : "text-left"
//                       }`}
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {dataLoading && filteredRules.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       Loading rules…
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredRules.map((rule) => (
//                     <tr
//                       key={rule.id}
//                       className="cursor-pointer transition hover:bg-orange-50/40"
//                       onClick={() => loadRuleIntoForm(rule)}
//                     >
//                       <td className="px-4 py-3">
//                         <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
//                           {rule.module}
//                         </span>
//                         <p className="mt-1 max-w-[180px] text-[11px] text-slate-400">
//                           {MODULE_LABELS[rule.module] ?? rule.id}
//                         </p>
//                       </td>
//                       <td className="px-4 py-3 text-sm font-semibold text-slate-900">
//                         {rule.commissionType === "PERCENTAGE"
//                           ? `${rule.commissionValue}%`
//                           : `₹${rule.commissionValue.toFixed(2)}`}
//                         <p className="text-[11px] font-normal text-slate-400">
//                           {rule.commissionType}
//                         </p>
//                       </td>
//                       <td className="px-4 py-3 text-xs text-slate-600">
//                         Fee ₹{Number(rule.platformFee || 0).toFixed(2)}
//                         <br />
//                         Extra ₹{Number(rule.juoneExtra || 0).toFixed(2)}
//                       </td>
//                       <td className="px-4 py-3 text-sm text-slate-600">
//                         {rule.gstPercent}%
//                       </td>
//                       <td className="px-4 py-3 text-sm text-slate-600">
//                         {rule.effectiveFrom}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                             rule.status === "ACTIVE"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-slate-100 text-slate-600"
//                           }`}
//                         >
//                           {rule.status}
//                         </span>
//                       </td>
//                       <td
//                         className="px-4 py-3 text-right"
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <button
//                           type="button"
//                           onClick={() => void handleToggle(rule.id)}
//                           className="text-xs font-semibold text-orange-600 hover:text-orange-700"
//                         >
//                           {rule.status === "ACTIVE" ? "Disable" : "Enable"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//                 {!dataLoading && filteredRules.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-6 py-10 text-center text-sm text-slate-500"
//                     >
//                       No global rules yet. Save Food, Mart, Pharmacy, etc.
//                       above.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="space-y-4 p-4 md:hidden">
//             {filteredRules.map((rule) => (
//               <div
//                 key={rule.id}
//                 className="rounded-lg border border-slate-200 p-4"
//                 onClick={() => loadRuleIntoForm(rule)}
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-sm font-semibold text-orange-600">
//                       {rule.module}
//                     </p>
//                     <p className="mt-0.5 text-[11px] text-slate-400">
//                       {MODULE_LABELS[rule.module]}
//                     </p>
//                   </div>
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                       rule.status === "ACTIVE"
//                         ? "bg-green-100 text-green-700"
//                         : "bg-slate-100 text-slate-600"
//                     }`}
//                   >
//                     {rule.status}
//                   </span>
//                 </div>
//                 <p className="mt-3 text-sm font-semibold text-slate-900">
//                   {rule.commissionType === "PERCENTAGE"
//                     ? `${rule.commissionValue}%`
//                     : `₹${rule.commissionValue.toFixed(2)}`}{" "}
//                   · Fee ₹{rule.platformFee} · Extra ₹{rule.juoneExtra}
//                 </p>
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     void handleToggle(rule.id);
//                   }}
//                   className="mt-3 w-full rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600"
//                 >
//                   {rule.status === "ACTIVE" ? "Disable" : "Enable"}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="mt-6 grid gap-4 md:grid-cols-3">
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">
//             Resolution order
//           </p>
//           <p className="mt-2 text-xs leading-5 text-slate-600">
//             1) Vendor rate → 2) District/State override → 3){" "}
//             <strong>Global rule</strong> (this page). Backend must enforce this
//             stack.
//           </p>
//         </div>
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">
//             Vendor settlement sketch
//           </p>
//           <p className="mt-2 text-xs leading-5 text-slate-600">
//             payout ≈ order value − commission − captain delivery − platform fee
//             − JUONE extra (weekly).
//           </p>
//         </div>
//         <div className="rounded-xl border border-slate-200 bg-white p-4">
//           <p className="text-xs font-bold uppercase text-slate-500">
//             Per-vendor deals
//           </p>
//           <p className="mt-2 text-xs leading-5 text-slate-600">
//             Negotiated restaurant rates: use{" "}
//             <code>/commission-engine/vendor-rates</code> after KYC approval in
//             ERP.
//           </p>
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
  useGlobalCommissionRules,
  COMMISSION_MODULES,
  type GlobalCommissionRule,
  type CommissionType,
} from "@/hooks/useCommissionEngine";

const MODULE_LABELS: Record<string, string> = {
  FOOD: "JuCart · Food (restaurant)",
  MART: "JuCart · Mart (grocery)",
  PHARMACY: "JuCart · Pharmacy",
  JUCART: "JuCart · All (legacy umbrella)",
  JURIDE: "JuRide (rides / logistics family)",
  JUSTAY: "JuStay (hotels / PG / halls / tourism)",
  JUHOME: "JuHome (home services)",
  JUSHOPPING: "JuShopping (marketplace)",
};

const DEFAULT_GST: Record<string, number> = {
  FOOD: 5,
  MART: 5,
  PHARMACY: 5,
  JUCART: 5,
  JURIDE: 5,
  JUSTAY: 18,
  JUHOME: 18,
  JUSHOPPING: 18,
};

type Toast = {
  id: number;
  type: "success" | "error";
  text: string;
};

export default function GlobalRulesPage() {
  const {
    rules,
    loading: dataLoading,
    error: dataError,
    saveRule,
    toggleStatus,
    deleteRule,
    refresh,
  } = useGlobalCommissionRules();

  const [module, setModule] = useState("FOOD");
  const [commissionType, setCommissionType] = useState<CommissionType>(
    "PERCENTAGE"
  );
  const [commissionValue, setCommissionValue] = useState("");
  const [platformFee, setPlatformFee] = useState("0");
  const [juoneExtra, setJuoneExtra] = useState("0");
  const [gstPercent, setGstPercent] = useState("5");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [notes, setNotes] = useState("");
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

  useEffect(() => {
    const def = DEFAULT_GST[module];
    if (def !== undefined && !editingId) {
      setGstPercent(String(def));
    }
  }, [module, editingId]);

  function loadRuleIntoForm(rule: GlobalCommissionRule) {
    setEditingId(rule.id);
    setModule(rule.module);
    setCommissionType(rule.commissionType);
    setCommissionValue(String(rule.commissionValue));
    setPlatformFee(String(rule.platformFee ?? 0));
    setJuoneExtra(String(rule.juoneExtra ?? 0));
    setGstPercent(String(rule.gstPercent ?? DEFAULT_GST[rule.module] ?? 0));
    setEffectiveFrom(
      rule.effectiveFrom && rule.effectiveFrom !== "—"
        ? rule.effectiveFrom
        : new Date().toISOString().slice(0, 10)
    );
    setNotes(rule.notes ?? "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setCommissionValue("");
    setPlatformFee("0");
    setJuoneExtra("0");
    setGstPercent(String(DEFAULT_GST[module] ?? 5));
    setNotes("");
    setEffectiveFrom(new Date().toISOString().slice(0, 10));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const value = Number(commissionValue);
    const fee = Number(platformFee);
    const extra = Number(juoneExtra);
    const gst = Number(gstPercent);

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
    if (Number.isNaN(fee) || fee < 0) {
      pushToast("error", "Platform fee must be non-negative.");
      return;
    }
    if (Number.isNaN(extra) || extra < 0) {
      pushToast("error", "JUONE extra must be non-negative.");
      return;
    }
    if (Number.isNaN(gst) || gst < 0 || gst > 100) {
      pushToast("error", "GST % must be between 0 and 100.");
      return;
    }
    if (!effectiveFrom) {
      pushToast("error", "Please select the effective date.");
      return;
    }

    try {
      setLoading(true);
      const id = await saveRule({
        module,
        commissionType,
        commissionValue: value,
        platformFee: fee,
        juoneExtra: extra,
        gstPercent: gst,
        effectiveFrom,
        notes: notes.trim(),
        status: "ACTIVE",
      });
      pushToast(
        "success",
        editingId
          ? `Rule updated · ${MODULE_LABELS[module] ?? module}`
          : `Rule saved · ${MODULE_LABELS[module] ?? module} (${id})`
      );
      resetForm();
    } catch (err) {
      console.error("Commission rule error:", err);
      pushToast(
        "error",
        err instanceof Error ? err.message : "Unable to save commission rule."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (rule: GlobalCommissionRule) => {
    try {
      setActionId(rule.id);
      await toggleStatus(rule.id);
      pushToast(
        "success",
        rule.status === "ACTIVE"
          ? `${rule.module} disabled`
          : `${rule.module} enabled`
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

  const handleDelete = async (rule: GlobalCommissionRule) => {
    const ok = window.confirm(
      `Delete global rule for ${rule.module}?\n\nThis removes ${rule.id} from Firestore.`
    );
    if (!ok) return;

    try {
      setActionId(rule.id);
      await deleteRule(rule.id);
      if (editingId === rule.id) resetForm();
      pushToast("success", `Deleted ${rule.module} rule`);
    } catch (err) {
      pushToast(
        "error",
        err instanceof Error ? err.message : "Unable to delete rule."
      );
    } finally {
      setActionId(null);
    }
  };

  const filteredRules = rules.filter((rule) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      rule.module.toLowerCase().includes(q) ||
      rule.id.toLowerCase().includes(q) ||
      rule.status.toLowerCase().includes(q) ||
      (MODULE_LABELS[rule.module] ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Floating toasts — top right */}
      <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[min(100vw-2rem,22rem)] flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 ${
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
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Global Commission Rules
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Default ERP rates per module. Vendor deals → Vendor Rates.
              Hierarchy → Overrides.
            </p>
            <p className="mt-1 text-xs text-slate-400">
              <code>commission_rules</code> · ids{" "}
              <code>GLOBAL_&lt;MODULE&gt;</code>
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
            <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="text-xs font-medium text-orange-700">
                JUERP Financial Control
              </p>
              <p className="mt-1 text-xs text-orange-600">
                Authoritative defaults for settlements &amp; pricing.
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
        {/* Form */}
        <div className="rounded-xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="mb-6 flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {editingId ? "Edit global rule" : "Set global rule"}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {editingId
                  ? `Updating ${editingId}`
                  : "One active rule per module (upsert)."}
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
                htmlFor="module"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Module / vertical
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
                <option value="PERCENTAGE">Percentage of order value</option>
                <option value="FIXED">Fixed ₹ per order</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="commissionValue"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                JUONE commission
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
                    commissionType === "PERCENTAGE" ? "e.g. 18" : "e.g. 50"
                  }
                  className={`w-full rounded-lg border border-slate-300 bg-white py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 ${
                    commissionType === "FIXED" ? "pl-8 pr-12" : "px-3 pr-12"
                  }`}
                />
                {commissionType === "PERCENTAGE" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    %
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="platformFee"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Platform fee (₹)
                </label>
                <input
                  id="platformFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={platformFee}
                  onChange={(e) => setPlatformFee(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
              <div>
                <label
                  htmlFor="juoneExtra"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  JUONE extra (₹)
                </label>
                <input
                  id="juoneExtra"
                  type="number"
                  min="0"
                  step="0.01"
                  value={juoneExtra}
                  onChange={(e) => setJuoneExtra(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="gstPercent"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                GST % (config reference)
              </label>
              <input
                id="gstPercent"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={gstPercent}
                onChange={(e) => setGstPercent(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
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
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Board-approved default for AP Food"
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
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
                  ? "Update global rule"
                  : "Save global rule"}
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="rounded-xl bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Configured global rules
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
                placeholder="Search module / id…"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-500 md:w-64"
              />
            </div>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  {[
                    "Module",
                    "Commission",
                    "Platform / Extra",
                    "GST",
                    "Effective",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
                        h === "Actions" ? "text-right" : "text-left"
                      }`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dataLoading && filteredRules.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      Loading rules…
                    </td>
                  </tr>
                ) : (
                  filteredRules.map((rule) => {
                    const busy = actionId === rule.id;
                    return (
                      <tr key={rule.id} className="transition hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <span className="rounded-md bg-orange-50 px-2 py-1 text-xs font-semibold text-orange-700">
                            {rule.module}
                          </span>
                          <p className="mt-1 max-w-[180px] text-[11px] text-slate-400">
                            {MODULE_LABELS[rule.module] ?? rule.id}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                          {rule.commissionType === "PERCENTAGE"
                            ? `${rule.commissionValue}%`
                            : `₹${rule.commissionValue.toFixed(2)}`}
                          <p className="text-[11px] font-normal text-slate-400">
                            {rule.commissionType}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-600">
                          Fee ₹{Number(rule.platformFee || 0).toFixed(2)}
                          <br />
                          Extra ₹{Number(rule.juoneExtra || 0).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {rule.gstPercent}%
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">
                          {rule.effectiveFrom}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              rule.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {rule.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              title="Edit"
                              disabled={busy}
                              onClick={() => loadRuleIntoForm(rule)}
                              className="rounded-lg p-2 text-slate-500 transition hover:bg-orange-50 hover:text-orange-600 disabled:opacity-40"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              title={
                                rule.status === "ACTIVE"
                                  ? "Disable"
                                  : "Enable"
                              }
                              disabled={busy}
                              onClick={() => void handleToggle(rule)}
                              className={`rounded-lg p-2 transition disabled:opacity-40 ${
                                rule.status === "ACTIVE"
                                  ? "text-amber-600 hover:bg-amber-50"
                                  : "text-green-600 hover:bg-green-50"
                              }`}
                            >
                              {rule.status === "ACTIVE" ? (
                                <Ban className="h-4 w-4" />
                              ) : (
                                <Power className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              type="button"
                              title="Delete"
                              disabled={busy}
                              onClick={() => void handleDelete(rule)}
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
                {!dataLoading && filteredRules.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-10 text-center text-sm text-slate-500"
                    >
                      No global rules yet. Save Food, Mart, Pharmacy, etc.
                      above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 p-4 md:hidden">
            {filteredRules.map((rule) => {
              const busy = actionId === rule.id;
              return (
                <div
                  key={rule.id}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-orange-600">
                        {rule.module}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {MODULE_LABELS[rule.module]}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        rule.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {rule.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">
                    {rule.commissionType === "PERCENTAGE"
                      ? `${rule.commissionValue}%`
                      : `₹${rule.commissionValue.toFixed(2)}`}{" "}
                    · Fee ₹{rule.platformFee} · Extra ₹{rule.juoneExtra}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => loadRuleIntoForm(rule)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleToggle(rule)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-amber-200 py-2 text-xs font-semibold text-amber-700"
                    >
                      {rule.status === "ACTIVE" ? (
                        <>
                          <Ban className="h-3.5 w-3.5" /> Disable
                        </>
                      ) : (
                        <>
                          <Power className="h-3.5 w-3.5" /> Enable
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => void handleDelete(rule)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 py-2 text-xs font-semibold text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">
            Resolution order
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            1) Vendor rate → 2) District/State override → 3){" "}
            <strong>Global rule</strong>. Backend must enforce this stack.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">
            Vendor settlement sketch
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            payout ≈ order value − commission − captain delivery − platform fee
            − JUONE extra (weekly).
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold uppercase text-slate-500">
            Per-vendor deals
          </p>
          <p className="mt-2 text-xs leading-5 text-slate-600">
            Negotiated rates:{" "}
            <code>/commission-engine/vendor-rates</code> after KYC in ERP.
          </p>
        </div>
      </div>
    </div>
  );
}