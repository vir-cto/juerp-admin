// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type RuleStatus = "ACTIVE" | "INACTIVE";

// type RuleSummary = {
//   id: string;
//   name: string;
//   scope: string;
//   module: string;
//   value: string;
//   status: RuleStatus;
//   updatedAt: string;
// };

// const GLOBAL_RULES: RuleSummary[] = [
//   {
//     id: "RULE-JUCART-001",
//     name: "JUCART Global Commission",
//     scope: "GLOBAL",
//     module: "JUCART",
//     value: "10%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "RULE-JURIDE-001",
//     name: "JURIDE Global Commission",
//     scope: "GLOBAL",
//     module: "JURIDE",
//     value: "15%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "RULE-JUSTAY-001",
//     name: "JUSTAY Global Commission",
//     scope: "GLOBAL",
//     module: "JUSTAY",
//     value: "12%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "RULE-JUHOME-001",
//     name: "JUHOME Global Commission",
//     scope: "GLOBAL",
//     module: "JUHOME",
//     value: "10%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "RULE-JUSHOPPING-001",
//     name: "JUSHOPPING Global Commission",
//     scope: "GLOBAL",
//     module: "JUSHOPPING",
//     value: "8%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
// ];

// const NODE_OVERRIDES: RuleSummary[] = [
//   {
//     id: "OVR-STATE-AP-001",
//     name: "Andhra Pradesh JUCART Override",
//     scope: "STATE",
//     module: "JUCART",
//     value: "9%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "OVR-DIST-GNT-001",
//     name: "Guntur JURIDE Override",
//     scope: "DISTRICT",
//     module: "JURIDE",
//     value: "13%",
//     status: "ACTIVE",
//     updatedAt: "2026-02-01",
//   },
// ];

// const VENDOR_RATES: RuleSummary[] = [
//   {
//     id: "VR-JUCART-001",
//     name: "Sample Food Vendor",
//     scope: "VENDOR",
//     module: "JUCART",
//     value: "8%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
//   {
//     id: "VR-JUSHOPPING-001",
//     name: "Sample Shopping Vendor",
//     scope: "VENDOR",
//     module: "JUSHOPPING",
//     value: "7%",
//     status: "ACTIVE",
//     updatedAt: "2026-01-01",
//   },
// ];

// const MODULES = [
//   "JUCART",
//   "JURIDE",
//   "JUSTAY",
//   "JUHOME",
//   "JUSHOPPING",
// ];

// export default function CommissionEnginePage() {
//   const [search, setSearch] = useState("");
//   const [selectedModule, setSelectedModule] = useState("ALL");
//   const [selectedScope, setSelectedScope] = useState("ALL");

//   const allRules = useMemo(
//     () => [
//       ...GLOBAL_RULES,
//       ...NODE_OVERRIDES,
//       ...VENDOR_RATES,
//     ],
//     []
//   );

//   // ---------------------------------------------------
//   // Filtering
//   // ---------------------------------------------------

//   const filteredRules = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();

//     return allRules.filter((rule) => {
//       const matchesSearch =
//         !searchValue ||
//         rule.id.toLowerCase().includes(searchValue) ||
//         rule.name.toLowerCase().includes(searchValue) ||
//         rule.module.toLowerCase().includes(searchValue) ||
//         rule.scope.toLowerCase().includes(searchValue);

//       const matchesModule =
//         selectedModule === "ALL" ||
//         rule.module === selectedModule;

//       const matchesScope =
//         selectedScope === "ALL" ||
//         rule.scope === selectedScope;

//       return matchesSearch && matchesModule && matchesScope;
//     });
//   }, [
//     allRules,
//     search,
//     selectedModule,
//     selectedScope,
//   ]);

//   // ---------------------------------------------------
//   // Statistics
//   // ---------------------------------------------------

//   const totalRules = allRules.length;

//   const activeRules = allRules.filter(
//     (rule) => rule.status === "ACTIVE"
//   ).length;

//   const globalRulesCount = GLOBAL_RULES.length;

//   const nodeOverridesCount = NODE_OVERRIDES.length;

//   const vendorRatesCount = VENDOR_RATES.length;

//   // ---------------------------------------------------
//   // UI
//   // ---------------------------------------------------

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>
//             <h1 className="text-2xl font-bold text-slate-900">
//               Commission Engine
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage global commission rules, node overrides,
//               and vendor-specific rates.
//             </p>
//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-semibold text-orange-700">
//               JUERP Financial Authority
//             </p>

//             <p className="mt-1 text-xs leading-5 text-orange-600">
//               Commission configuration is controlled by
//               authorized JUERP administration.
//             </p>
//           </div>

//         </div>
//       </div>

//       {/* Statistics */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         {/* Total */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Total Rules
//           </p>

//           <p className="mt-2 text-3xl font-bold text-slate-900">
//             {totalRules}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             All configured rules
//           </p>
//         </div>

//         {/* Active */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Active Rules
//           </p>

//           <p className="mt-2 text-3xl font-bold text-green-600">
//             {activeRules}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Currently active
//           </p>
//         </div>

//         {/* Global */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Global Rules
//           </p>

//           <p className="mt-2 text-3xl font-bold text-orange-500">
//             {globalRulesCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Platform-level rules
//           </p>
//         </div>

//         {/* Node */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Node Overrides
//           </p>

//           <p className="mt-2 text-3xl font-bold text-blue-600">
//             {nodeOverridesCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Geographic / node rules
//           </p>
//         </div>

//         {/* Vendor */}
//         <div className="rounded-xl bg-white p-5 shadow-sm">
//           <p className="text-xs font-medium text-slate-500">
//             Vendor Rates
//           </p>

//           <p className="mt-2 text-3xl font-bold text-purple-600">
//             {vendorRatesCount}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             Vendor-specific rates
//           </p>
//         </div>

//       </div>

//       {/* Management Cards */}
//       <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">

//         {/* Global Rules */}
//         <Link
//           href="/commission-engine/global-rules"
//           className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >
//           <div className="flex items-start justify-between">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
//               <span className="text-xl font-bold text-orange-600">
//                 G
//               </span>
//             </div>

//             <span className="text-slate-400 transition group-hover:text-orange-500">
//               →
//             </span>

//           </div>

//           <h2 className="mt-5 text-lg font-semibold text-slate-900">
//             Global Rules
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-slate-500">
//             Configure platform-level commission rules
//             applicable across JUONE modules.
//           </p>

//           <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

//             <span className="text-xs font-medium text-slate-500">
//               {globalRulesCount} configured
//             </span>

//             <span className="text-xs font-semibold text-orange-600">
//               Manage Rules
//             </span>

//           </div>
//         </Link>

//         {/* Node Overrides */}
//         <Link
//           href="/commission-engine/node-overrides"
//           className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >
//           <div className="flex items-start justify-between">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
//               <span className="text-xl font-bold text-blue-600">
//                 N
//               </span>
//             </div>

//             <span className="text-slate-400 transition group-hover:text-blue-500">
//               →
//             </span>

//           </div>

//           <h2 className="mt-5 text-lg font-semibold text-slate-900">
//             Node Overrides
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-slate-500">
//             Configure authorized overrides for states,
//             districts, pincodes, vendors, and captains.
//           </p>

//           <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

//             <span className="text-xs font-medium text-slate-500">
//               {nodeOverridesCount} configured
//             </span>

//             <span className="text-xs font-semibold text-blue-600">
//               Manage Overrides
//             </span>

//           </div>
//         </Link>

//         {/* Vendor Rates */}
//         <Link
//           href="/commission-engine/vendor-rates"
//           className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
//         >
//           <div className="flex items-start justify-between">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
//               <span className="text-xl font-bold text-purple-600">
//                 V
//               </span>
//             </div>

//             <span className="text-slate-400 transition group-hover:text-purple-500">
//               →
//             </span>

//           </div>

//           <h2 className="mt-5 text-lg font-semibold text-slate-900">
//             Vendor Rates
//           </h2>

//           <p className="mt-2 text-sm leading-6 text-slate-500">
//             Manage negotiated commission rates for
//             individual vendors.
//           </p>

//           <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">

//             <span className="text-xs font-medium text-slate-500">
//               {vendorRatesCount} configured
//             </span>

//             <span className="text-xs font-semibold text-purple-600">
//               Manage Rates
//             </span>

//           </div>
//         </Link>

//       </div>

//       {/* Rules Overview */}
//       <div className="rounded-xl bg-white shadow-sm">

//         {/* Header */}
//         <div className="border-b border-slate-200 p-6">

//           <div className="flex flex-col gap-4">

//             <div>
//               <h2 className="text-lg font-semibold text-slate-900">
//                 Commission Configuration
//               </h2>

//               <p className="mt-1 text-xs text-slate-500">
//                 Review configured commission rules across the
//                 JUONE ecosystem.
//               </p>
//             </div>

//             {/* Filters */}
//             <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

//               {/* Search */}
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 placeholder="Search rules..."
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />

//               {/* Module */}
//               <select
//                 value={selectedModule}
//                 onChange={(event) =>
//                   setSelectedModule(event.target.value)
//                 }
//                 className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="ALL">
//                   All Modules
//                 </option>

//                 {MODULES.map((module) => (
//                   <option
//                     key={module}
//                     value={module}
//                   >
//                     {module}
//                   </option>
//                 ))}
//               </select>

//               {/* Scope */}
//               <select
//                 value={selectedScope}
//                 onChange={(event) =>
//                   setSelectedScope(event.target.value)
//                 }
//                 className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               >
//                 <option value="ALL">
//                   All Scopes
//                 </option>

//                 <option value="GLOBAL">
//                   GLOBAL
//                 </option>

//                 <option value="STATE">
//                   STATE
//                 </option>

//                 <option value="DISTRICT">
//                   DISTRICT
//                 </option>

//                 <option value="PINCODE">
//                   PINCODE
//                 </option>

//                 <option value="VENDOR">
//                   VENDOR
//                 </option>

//                 <option value="CAPTAIN">
//                   CAPTAIN
//                 </option>
//               </select>

//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead className="bg-slate-50">
//               <tr>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Rule
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Scope
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Rate
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Effective
//                 </th>

//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredRules.map((rule) => (
//                 <tr
//                   key={rule.id}
//                   className="transition hover:bg-slate-50"
//                 >

//                   {/* Rule */}
//                   <td className="px-6 py-4">

//                     <p className="text-sm font-semibold text-slate-900">
//                       {rule.name}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {rule.id}
//                     </p>

//                   </td>

//                   {/* Scope */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-md px-2 py-1 text-xs font-semibold ${
//                         rule.scope === "GLOBAL"
//                           ? "bg-orange-50 text-orange-700"
//                           : rule.scope === "VENDOR"
//                           ? "bg-purple-50 text-purple-700"
//                           : "bg-blue-50 text-blue-700"
//                       }`}
//                     >
//                       {rule.scope}
//                     </span>

//                   </td>

//                   {/* Module */}
//                   <td className="px-6 py-4">

//                     <span className="text-sm font-medium text-slate-700">
//                       {rule.module}
//                     </span>

//                   </td>

//                   {/* Rate */}
//                   <td className="px-6 py-4">

//                     <span className="text-sm font-bold text-slate-900">
//                       {rule.value}
//                     </span>

//                   </td>

//                   {/* Status */}
//                   <td className="px-6 py-4">

//                     <span
//                       className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                         rule.status === "ACTIVE"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {rule.status}
//                     </span>

//                   </td>

//                   {/* Effective */}
//                   <td className="px-6 py-4 text-sm text-slate-600">
//                     {rule.updatedAt}
//                   </td>

//                 </tr>
//               ))}

//               {filteredRules.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-6 py-12 text-center"
//                   >
//                     <p className="text-sm font-medium text-slate-600">
//                       No commission rules found.
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Try changing your search or filters.
//                     </p>
//                   </td>
//                 </tr>
//               )}

//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Financial Architecture */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">

//         <h2 className="text-sm font-semibold text-slate-900">
//           Commission Engine Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-slate-500">
//           The Commission Engine is the configuration layer for
//           applicable commission rules. In the production JUONE
//           architecture, the trusted backend must resolve the
//           applicable rule and calculate the financial result.
//           Client applications must not independently determine
//           commissions, settlement totals, platform margin, or
//           payout values.
//         </p>

//         {/* Flow */}
//         <div className="mt-5 overflow-x-auto">

//           <div className="flex min-w-[700px] items-center gap-3">

//             <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
//               <p className="text-xs font-semibold text-orange-700">
//                 Rule Configuration
//               </p>
//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3">
//               <p className="text-xs font-semibold text-blue-700">
//                 Trusted Backend
//               </p>
//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-3">
//               <p className="text-xs font-semibold text-purple-700">
//                 Financial Snapshot
//               </p>
//             </div>

//             <span className="text-slate-400">
//               →
//             </span>

//             <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3">
//               <p className="text-xs font-semibold text-green-700">
//                 Settlement / Ledger
//               </p>
//             </div>

//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCommissionEngine } from "@/hooks/useCommissionEngine";

const MODULES = ["JUCART", "JURIDE", "JUSTAY", "JUHOME", "JUSHOPPING"];

export default function CommissionEnginePage() {
  const {
    allSummaries,
    globalRules,
    overrides,
    vendorRates,
    loading,
    error,
    refresh,
  } = useCommissionEngine();

  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("ALL");
  const [selectedScope, setSelectedScope] = useState("ALL");

  const filteredRules = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allSummaries.filter((rule) => {
      const matchesSearch =
        !q ||
        rule.id.toLowerCase().includes(q) ||
        rule.name.toLowerCase().includes(q) ||
        rule.module.toLowerCase().includes(q) ||
        rule.scope.toLowerCase().includes(q);
      const matchesModule =
        selectedModule === "ALL" || rule.module === selectedModule;
      const matchesScope =
        selectedScope === "ALL" || rule.scope === selectedScope;
      return matchesSearch && matchesModule && matchesScope;
    });
  }, [allSummaries, search, selectedModule, selectedScope]);

  const totalRules = allSummaries.length;
  const activeRules = allSummaries.filter((r) => r.status === "ACTIVE").length;
  const globalRulesCount = globalRules.length;
  const nodeOverridesCount = overrides.length;
  const vendorRatesCount = vendorRates.length;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Commission Engine
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Live data from Firestore commission collections.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
              <p className="text-xs font-semibold text-orange-700">
                JUERP Financial Authority
              </p>
              <p className="mt-1 text-xs leading-5 text-orange-600">
                Commission configuration is controlled by authorized JUERP
                administration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Rules" value={totalRules} sub="All configured rules" color="text-slate-900" />
        <StatCard title="Active Rules" value={activeRules} sub="Currently active" color="text-green-600" />
        <StatCard title="Global Rules" value={globalRulesCount} sub="Platform-level rules" color="text-orange-500" />
        <StatCard title="Node Overrides" value={nodeOverridesCount} sub="Geographic / node rules" color="text-blue-600" />
        <StatCard title="Vendor Rates" value={vendorRatesCount} sub="Vendor-specific rates" color="text-purple-600" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ManageCard
          href="/commission-engine/global-rules"
          letter="G"
          letterBg="bg-orange-100"
          letterColor="text-orange-600"
          title="Global Rules"
          description="Configure platform-level commission rules applicable across JUONE modules."
          count={globalRulesCount}
          action="Manage Rules"
          actionColor="text-orange-600"
        />
        <ManageCard
          href="/commission-engine/node-overrides"
          letter="N"
          letterBg="bg-blue-100"
          letterColor="text-blue-600"
          title="Node Overrides"
          description="Configure authorized overrides for states, districts, pincodes, vendors, and captains."
          count={nodeOverridesCount}
          action="Manage Overrides"
          actionColor="text-blue-600"
        />
        <ManageCard
          href="/commission-engine/vendor-rates"
          letter="V"
          letterBg="bg-purple-100"
          letterColor="text-purple-600"
          title="Vendor Rates"
          description="Manage negotiated commission rates for individual vendors."
          count={vendorRatesCount}
          action="Manage Rates"
          actionColor="text-purple-600"
        />
      </div>

      <div className="rounded-xl bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Commission Configuration
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Review configured commission rules across the JUONE ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rules..."
                className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="ALL">All Modules</option>
                {MODULES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              >
                <option value="ALL">All Scopes</option>
                <option value="GLOBAL">GLOBAL</option>
                <option value="STATE">STATE</option>
                <option value="DISTRICT">DISTRICT</option>
                <option value="PINCODE">PINCODE</option>
                <option value="VENDOR">VENDOR</option>
                <option value="CAPTAIN">CAPTAIN</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Rule", "Scope", "Module", "Rate", "Status", "Effective"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filteredRules.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading commission rules…
                  </td>
                </tr>
              ) : (
                filteredRules.map((rule) => (
                  <tr key={rule.id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {rule.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{rule.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-semibold ${
                          rule.scope === "GLOBAL"
                            ? "bg-orange-50 text-orange-700"
                            : rule.scope === "VENDOR"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {rule.scope}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">
                      {rule.module}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-900">
                      {rule.value}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {rule.updatedAt}
                    </td>
                  </tr>
                ))
              )}
              {!loading && filteredRules.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-slate-600">
                      No commission rules found.
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Empty Firestore collections or filters too narrow.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">
          Commission Engine Governance
        </h2>
        <p className="mt-2 text-xs leading-6 text-slate-500">
          Data is loaded from Firestore. In production, the trusted backend must
          resolve the applicable rule and calculate financial results. Client
          apps must not independently determine commissions, settlements, or
          payouts.
        </p>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  sub,
  color,
}: {
  title: string;
  value: number;
  sub: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className={`mt-2 text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

function ManageCard({
  href,
  letter,
  letterBg,
  letterColor,
  title,
  description,
  count,
  action,
  actionColor,
}: {
  href: string;
  letter: string;
  letterBg: string;
  letterColor: string;
  title: string;
  description: string;
  count: number;
  action: string;
  actionColor: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${letterBg}`}
        >
          <span className={`text-xl font-bold ${letterColor}`}>{letter}</span>
        </div>
        <span className="text-slate-400 transition group-hover:text-orange-500">
          →
        </span>
      </div>
      <h2 className="mt-5 text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-xs font-medium text-slate-500">
          {count} configured
        </span>
        <span className={`text-xs font-semibold ${actionColor}`}>{action}</span>
      </div>
    </Link>
  );
}