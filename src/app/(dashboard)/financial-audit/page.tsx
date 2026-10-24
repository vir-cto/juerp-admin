// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type AuditModule =
//   | "GENERAL_LEDGER"
//   | "PAYOUTS"
//   | "CASHFREE"
//   | "SETTLEMENTS"
//   | "REFUNDS";

// type AuditStatus =
//   | "HEALTHY"
//   | "REVIEW"
//   | "CRITICAL"
//   | "PENDING";

// type FinancialActivity = {
//   id: string;
//   module: AuditModule;
//   title: string;
//   description: string;
//   referenceId: string;
//   amountPaise: number;
//   status: AuditStatus;
//   createdAt: string;
// };

// type AuditMetric = {
//   title: string;
//   value: string;
//   description: string;
//   icon: string;
//   iconClass: string;
// };

// const INITIAL_ACTIVITIES: FinancialActivity[] = [
//   {
//     id: "AUD-10001",
//     module: "GENERAL_LEDGER",
//     title: "Ledger batch posted",
//     description:
//       "Daily financial ledger entries posted successfully.",
//     referenceId: "LED-BATCH-10001",
//     amountPaise: 1850000,
//     status: "HEALTHY",
//     createdAt: "05 Oct 2026, 09:15 AM",
//   },
//   {
//     id: "AUD-10002",
//     module: "PAYOUTS",
//     title: "Vendor payout processing",
//     description:
//       "Vendor settlement payout is currently processing.",
//     referenceId: "PAY-10003",
//     amountPaise: 707780,
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 11:20 AM",
//   },
//   {
//     id: "AUD-10003",
//     module: "CASHFREE",
//     title: "Cashfree reconciliation mismatch",
//     description:
//       "Payment amount requires financial reconciliation review.",
//     referenceId: "REC-10003",
//     amountPaise: 125000,
//     status: "REVIEW",
//     createdAt: "05 Oct 2026, 11:45 AM",
//   },
//   {
//     id: "AUD-10004",
//     module: "SETTLEMENTS",
//     title: "Settlement calculation completed",
//     description:
//       "Settlement calculation completed for the current period.",
//     referenceId: "SET-10005",
//     amountPaise: 3703500,
//     status: "HEALTHY",
//     createdAt: "05 Oct 2026, 01:15 PM",
//   },
//   {
//     id: "AUD-10005",
//     module: "PAYOUTS",
//     title: "Payout held",
//     description:
//       "Payout requires authorization before release.",
//     referenceId: "PAY-10007",
//     amountPaise: 1527550,
//     status: "CRITICAL",
//     createdAt: "05 Oct 2026, 02:20 PM",
//   },
//   {
//     id: "AUD-10006",
//     module: "REFUNDS",
//     title: "Refund awaiting reconciliation",
//     description:
//       "Refund transaction is waiting for financial verification.",
//     referenceId: "REF-10006",
//     amountPaise: 76000,
//     status: "REVIEW",
//     createdAt: "05 Oct 2026, 02:45 PM",
//   },
// ];

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function getStatusClasses(status: AuditStatus) {
//   switch (status) {
//     case "HEALTHY":
//       return "bg-green-100 text-green-700";

//     case "REVIEW":
//       return "bg-yellow-100 text-yellow-700";

//     case "CRITICAL":
//       return "bg-red-100 text-red-700";

//     case "PENDING":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: AuditModule) {
//   switch (module) {
//     case "GENERAL_LEDGER":
//       return "bg-blue-50 text-blue-700";

//     case "PAYOUTS":
//       return "bg-green-50 text-green-700";

//     case "CASHFREE":
//       return "bg-purple-50 text-purple-700";

//     case "SETTLEMENTS":
//       return "bg-orange-50 text-orange-700";

//     case "REFUNDS":
//       return "bg-red-50 text-red-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getModuleLabel(module: AuditModule) {
//   switch (module) {
//     case "GENERAL_LEDGER":
//       return "General Ledger";

//     case "PAYOUTS":
//       return "Payouts";

//     case "CASHFREE":
//       return "Cashfree";

//     case "SETTLEMENTS":
//       return "Settlements";

//     case "REFUNDS":
//       return "Refunds";

//     default:
//       return module;
//   }
// }

// export default function FinancialAuditPage() {
//   const [activities] = useState<FinancialActivity[]>(
//     INITIAL_ACTIVITIES
//   );

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | AuditStatus>("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState<"ALL" | AuditModule>("ALL");

//   const filteredActivities = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return activities.filter((activity) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         activity.id
//           .toLowerCase()
//           .includes(searchValue) ||
//         activity.title
//           .toLowerCase()
//           .includes(searchValue) ||
//         activity.description
//           .toLowerCase()
//           .includes(searchValue) ||
//         activity.referenceId
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         activity.status === statusFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         activity.module === moduleFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesModule
//       );
//     });
//   }, [
//     activities,
//     search,
//     statusFilter,
//     moduleFilter,
//   ]);

//   const metrics: AuditMetric[] = [
//     {
//       title: "Ledger Entries",
//       value: "12",
//       description: "Today's ledger records",
//       icon: "₹",
//       iconClass: "bg-blue-100 text-blue-700",
//     },
//     {
//       title: "Payouts",
//       value: "₹84.25K",
//       description: "Current payout queue",
//       icon: "↗",
//       iconClass: "bg-green-100 text-green-700",
//     },
//     {
//       title: "Reconciliation",
//       value: "96.8%",
//       description: "Cashfree matched",
//       icon: "✓",
//       iconClass: "bg-purple-100 text-purple-700",
//     },
//     {
//       title: "Settlements",
//       value: "18",
//       description: "Active settlement records",
//       icon: "⌁",
//       iconClass: "bg-orange-100 text-orange-700",
//     },
//     {
//       title: "Exceptions",
//       value: "3",
//       description: "Requires financial review",
//       icon: "!",
//       iconClass: "bg-red-100 text-red-700",
//     },
//   ];

//   const totalActivityAmount = activities.reduce(
//     (total, activity) =>
//       total + activity.amountPaise,
//     0
//   );

//   const healthyCount = activities.filter(
//     (activity) =>
//       activity.status === "HEALTHY"
//   ).length;

//   const reviewCount = activities.filter(
//     (activity) =>
//       activity.status === "REVIEW"
//   ).length;

//   const criticalCount = activities.filter(
//     (activity) =>
//       activity.status === "CRITICAL"
//   ).length;

//   const pendingCount = activities.filter(
//     (activity) =>
//       activity.status === "PENDING"
//   ).length;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

//         <div>

//           <div className="mb-3 flex items-center gap-2">

//             <span className="text-sm font-medium text-slate-500">
//               Dashboard
//             </span>

//             <span className="text-slate-400">
//               /
//             </span>

//             <span className="text-sm font-medium text-slate-800">
//               Financial Audit
//             </span>

//           </div>

//           <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
//             Financial Audit
//           </h1>

//           <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
//             Central financial monitoring for ledger entries,
//             settlements, payouts, Cashfree reconciliation
//             and financial exceptions across JUONE.
//           </p>

//         </div>

//         <div className="rounded-xl bg-white px-5 py-4 shadow-sm">

//           <p className="text-xs text-slate-500">
//             Financial Activity
//           </p>

//           <p className="mt-1 text-2xl font-bold text-slate-900">
//             {activities.length}
//           </p>

//         </div>

//       </div>

//       {/* FINANCIAL FLOW */}

//       <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">

//         <div className="flex flex-col gap-4">

//           <div>

//             <p className="text-sm font-bold text-orange-900">
//               JUERP Financial Control Flow
//             </p>

//             <p className="mt-1 text-xs leading-5 text-orange-700">
//               Financial transactions move through trusted
//               backend calculation, ledger posting,
//               settlement, payout and reconciliation.
//             </p>

//           </div>

//           <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">

//             <FlowBox
//               number="01"
//               title="Transaction"
//               description="Order / Ride / Booking"
//             />

//             <FlowBox
//               number="02"
//               title="Payment"
//               description="Payment verification"
//             />

//             <FlowBox
//               number="03"
//               title="Ledger"
//               description="Debit / Credit"
//             />

//             <FlowBox
//               number="04"
//               title="Settlement"
//               description="Financial calculation"
//             />

//             <FlowBox
//               number="05"
//               title="Payout"
//               description="Vendor / Captain"
//             />

//             <FlowBox
//               number="06"
//               title="Reconciliation"
//               description="Audit verification"
//             />

//           </div>

//         </div>

//       </div>

//       {/* METRICS */}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         {metrics.map((metric) => (
//           <SummaryCard
//             key={metric.title}
//             title={metric.title}
//             value={metric.value}
//             description={metric.description}
//             icon={metric.icon}
//             iconClass={metric.iconClass}
//           />
//         ))}

//       </div>

//       {/* HEALTH OVERVIEW */}

//       <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

//         <HealthCard
//           title="Healthy"
//           value={healthyCount}
//           description="Financial operations normal"
//           className="border-green-200 bg-green-50"
//           valueClass="text-green-700"
//         />

//         <HealthCard
//           title="Pending"
//           value={pendingCount}
//           description="Awaiting workflow completion"
//           className="border-blue-200 bg-blue-50"
//           valueClass="text-blue-700"
//         />

//         <HealthCard
//           title="Review Required"
//           value={reviewCount}
//           description="Requires financial verification"
//           className="border-yellow-200 bg-yellow-50"
//           valueClass="text-yellow-700"
//         />

//         <HealthCard
//           title="Critical"
//           value={criticalCount}
//           description="Immediate attention required"
//           className="border-red-200 bg-red-50"
//           valueClass="text-red-700"
//         />

//       </div>

//       {/* QUICK ACTIONS */}

//       <div className="mb-6">

//         <h2 className="mb-4 text-lg font-bold text-slate-900">
//           Financial Audit Modules
//         </h2>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

//           <AuditModuleCard
//             href="/financial-audit/general-ledger"
//             title="General Ledger"
//             description="Review debit, credit and ledger entries."
//             icon="₹"
//             iconClass="bg-blue-100 text-blue-700"
//           />

//           <AuditModuleCard
//             href="/financial-audit/payouts"
//             title="Payouts"
//             description="Monitor vendor and captain payouts."
//             icon="↗"
//             iconClass="bg-green-100 text-green-700"
//           />

//           <AuditModuleCard
//             href="/financial-audit/cashfree-reconciliation"
//             title="Cashfree Reconciliation"
//             description="Verify gateway transactions and mismatches."
//             icon="✓"
//             iconClass="bg-purple-100 text-purple-700"
//           />

//           <AuditModuleCard
//             href="/financial-audit/settlements"
//             title="Settlements"
//             description="Review settlement calculations and status."
//             icon="⌁"
//             iconClass="bg-orange-100 text-orange-700"
//           />

//           <AuditModuleCard
//             href="/financial-audit/refunds"
//             title="Refunds"
//             description="Monitor refunds and financial reversals."
//             icon="↩"
//             iconClass="bg-red-100 text-red-700"
//           />

//         </div>

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search Activity
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search reference or activity..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | AuditStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Statuses
//               </option>
//               <option value="HEALTHY">
//                 Healthy
//               </option>
//               <option value="PENDING">
//                 Pending
//               </option>
//               <option value="REVIEW">
//                 Review
//               </option>
//               <option value="CRITICAL">
//                 Critical
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Audit Module
//             </label>

//             <select
//               value={moduleFilter}
//               onChange={(event) =>
//                 setModuleFilter(
//                   event.target.value as
//                     | "ALL"
//                     | AuditModule
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Modules
//               </option>
//               <option value="GENERAL_LEDGER">
//                 General Ledger
//               </option>
//               <option value="PAYOUTS">
//                 Payouts
//               </option>
//               <option value="CASHFREE">
//                 Cashfree
//               </option>
//               <option value="SETTLEMENTS">
//                 Settlements
//               </option>
//               <option value="REFUNDS">
//                 Refunds
//               </option>
//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredActivities.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {activities.length}
//             </span>{" "}
//             activities
//           </p>

//           {(search ||
//             statusFilter !== "ALL" ||
//             moduleFilter !== "ALL") && (
//             <button
//               type="button"
//               onClick={clearFilters}
//               className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//             >
//               Clear Filters
//             </button>
//           )}

//         </div>

//       </div>

//       {/* MAIN CONTENT */}

//       <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

//         {/* ACTIVITY */}

//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm xl:col-span-2">

//           <div className="border-b border-slate-200 p-5">

//             <div className="flex items-center justify-between gap-4">

//               <div>

//                 <h2 className="text-base font-bold text-slate-900">
//                   Recent Financial Activity
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Latest financial audit events
//                 </p>

//               </div>

//               <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
//                 {filteredActivities.length}
//               </span>

//             </div>

//           </div>

//           <div className="divide-y divide-slate-100">

//             {filteredActivities.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="p-5 transition hover:bg-slate-50"
//               >

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

//                   <div className="flex gap-4">

//                     <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
//                       {activity.module ===
//                       "GENERAL_LEDGER"
//                         ? "₹"
//                         : activity.module ===
//                           "PAYOUTS"
//                         ? "↗"
//                         : activity.module ===
//                           "CASHFREE"
//                         ? "✓"
//                         : activity.module ===
//                           "SETTLEMENTS"
//                         ? "⌁"
//                         : "↩"}
//                     </div>

//                     <div>

//                       <div className="flex flex-wrap items-center gap-2">

//                         <h3 className="text-sm font-bold text-slate-900">
//                           {activity.title}
//                         </h3>

//                         <span
//                           className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                             activity.module
//                           )}`}
//                         >
//                           {getModuleLabel(
//                             activity.module
//                           )}
//                         </span>

//                       </div>

//                       <p className="mt-1 text-xs leading-5 text-slate-500">
//                         {activity.description}
//                       </p>

//                       <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-400">

//                         <span>
//                           {activity.referenceId}
//                         </span>

//                         <span>
//                           {activity.createdAt}
//                         </span>

//                       </div>

//                     </div>

//                   </div>

//                   <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">

//                     <p className="text-sm font-bold text-slate-800">
//                       {formatCurrency(
//                         activity.amountPaise
//                       )}
//                     </p>

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                         activity.status
//                       )}`}
//                     >
//                       {activity.status}
//                     </span>

//                   </div>

//                 </div>

//               </div>
//             ))}

//             {filteredActivities.length === 0 && (
//               <EmptyState />
//             )}

//           </div>

//         </div>

//         {/* AUDIT CONTROL PANEL */}

//         <div className="space-y-6">

//           {/* AUDIT HEALTH */}

//           <div className="rounded-2xl bg-white p-5 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Audit Health
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Current financial control status
//             </p>

//             <div className="mt-5">

//               <div className="mb-2 flex items-center justify-between">

//                 <span className="text-xs font-semibold text-slate-600">
//                   Overall Health
//                 </span>

//                 <span className="text-sm font-bold text-green-600">
//                   94%
//                 </span>

//               </div>

//               <div className="h-2 overflow-hidden rounded-full bg-slate-100">

//                 <div
//                   className="h-full rounded-full bg-green-500"
//                   style={{ width: "94%" }}
//                 />

//               </div>

//             </div>

//             <div className="mt-6 space-y-4">

//               <AuditHealthRow
//                 title="Ledger Integrity"
//                 value="100%"
//                 status="Healthy"
//               />

//               <AuditHealthRow
//                 title="Payout Processing"
//                 value="92%"
//                 status="Healthy"
//               />

//               <AuditHealthRow
//                 title="Cashfree Matching"
//                 value="96.8%"
//                 status="Healthy"
//               />

//               <AuditHealthRow
//                 title="Settlement Review"
//                 value="91%"
//                 status="Review"
//               />

//               <AuditHealthRow
//                 title="Refund Controls"
//                 value="95%"
//                 status="Healthy"
//               />

//             </div>

//           </div>

//           {/* EXCEPTIONS */}

//           <div className="rounded-2xl bg-white p-5 shadow-sm">

//             <div className="flex items-center justify-between">

//               <div>

//                 <h2 className="text-base font-bold text-slate-900">
//                   Financial Exceptions
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Items requiring attention
//                 </p>

//               </div>

//               <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
//                 {reviewCount + criticalCount}
//               </span>

//             </div>

//             <div className="mt-5 space-y-3">

//               <ExceptionRow
//                 title="Cashfree mismatch"
//                 description="1 transaction"
//                 severity="Review"
//                 href="/financial-audit/cashfree-reconciliation"
//               />

//               <ExceptionRow
//                 title="Held payout"
//                 description="1 payout"
//                 severity="Critical"
//                 href="/financial-audit/payouts"
//               />

//               <ExceptionRow
//                 title="Refund review"
//                 description="1 refund"
//                 severity="Review"
//                 href="/financial-audit/refunds"
//               />

//             </div>

//           </div>

//           {/* TOTAL MOVEMENT */}

//           <div className="rounded-2xl bg-slate-900 p-5 text-white">

//             <p className="text-xs text-slate-400">
//               Tracked Financial Movement
//             </p>

//             <p className="mt-2 text-2xl font-bold">
//               {formatCurrency(
//                 totalActivityAmount
//               )}
//             </p>

//             <p className="mt-2 text-xs leading-5 text-slate-400">
//               Combined amount represented by the
//               currently monitored financial activities.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-800">
//           Financial Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           JUERP Financial Audit is a governance and
//           monitoring layer. Financial authority remains with
//           the trusted backend and ERP-controlled rules.
//           Client screens must not independently calculate
//           commissions, settlement values, payout amounts,
//           refunds or other authoritative financial values.
//         </p>

//         <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceBox
//             title="Ledger"
//             description="Debit / credit audit trail"
//           />

//           <GovernanceBox
//             title="Settlement"
//             description="Authoritative financial calculation"
//           />

//           <GovernanceBox
//             title="Payout"
//             description="Authorized financial disbursement"
//           />

//           <GovernanceBox
//             title="Reconciliation"
//             description="Payment and ledger verification"
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// function SummaryCard({
//   title,
//   value,
//   description,
//   icon,
//   iconClass,
// }: {
//   title: string;
//   value: string;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">

//       <div className="flex items-start justify-between gap-3">

//         <div>

//           <p className="text-xs font-medium text-slate-500">
//             {title}
//           </p>

//           <p className="mt-2 text-xl font-bold text-slate-900">
//             {value}
//           </p>

//           <p className="mt-1 text-xs text-slate-400">
//             {description}
//           </p>

//         </div>

//         <div
//           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//         >
//           {icon}
//         </div>

//       </div>

//     </div>
//   );
// }

// function FlowBox({
//   number,
//   title,
//   description,
// }: {
//   number: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-orange-200 bg-white p-4">

//       <div className="flex items-center gap-3">

//         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
//           {number}
//         </div>

//         <div>

//           <p className="text-xs font-bold text-orange-900">
//             {title}
//           </p>

//           <p className="mt-0.5 text-[10px] text-orange-700">
//             {description}
//           </p>

//         </div>

//       </div>

//     </div>
//   );
// }

// function AuditModuleCard({
//   href,
//   title,
//   description,
//   icon,
//   iconClass,
// }: {
//   href: string;
//   title: string;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//     >

//       <div
//         className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//       >
//         {icon}
//       </div>

//       <h3 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-orange-600">
//         {title}
//       </h3>

//       <p className="mt-1 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//       <div className="mt-4 text-xs font-semibold text-orange-600">
//         Open Module →
//       </div>

//     </Link>
//   );
// }

// function HealthCard({
//   title,
//   value,
//   description,
//   className,
//   valueClass,
// }: {
//   title: string;
//   value: number;
//   description: string;
//   className: string;
//   valueClass: string;
// }) {
//   return (
//     <div
//       className={`rounded-xl border p-5 ${className}`}
//     >

//       <p className="text-xs font-semibold text-slate-600">
//         {title}
//       </p>

//       <p
//         className={`mt-2 text-2xl font-bold ${valueClass}`}
//       >
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function AuditHealthRow({
//   title,
//   value,
//   status,
// }: {
//   title: string;
//   value: string;
//   status: "Healthy" | "Review";
// }) {
//   return (
//     <div>

//       <div className="flex items-center justify-between gap-3">

//         <p className="text-xs font-semibold text-slate-700">
//           {title}
//         </p>

//         <div className="flex items-center gap-2">

//           <span className="text-xs font-bold text-slate-800">
//             {value}
//           </span>

//           <span
//             className={`h-2 w-2 rounded-full ${
//               status === "Healthy"
//                 ? "bg-green-500"
//                 : "bg-yellow-500"
//             }`}
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// function ExceptionRow({
//   title,
//   description,
//   severity,
//   href,
// }: {
//   title: string;
//   description: string;
//   severity: "Review" | "Critical";
//   href: string;
// }) {
//   return (
//     <Link
//       href={href}
//       className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-orange-200 hover:bg-orange-50"
//     >

//       <div>

//         <p className="text-xs font-bold text-slate-800">
//           {title}
//         </p>

//         <p className="mt-1 text-[11px] text-slate-400">
//           {description}
//         </p>

//       </div>

//       <span
//         className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
//           severity === "Critical"
//             ? "bg-red-100 text-red-700"
//             : "bg-yellow-100 text-yellow-700"
//         }`}
//       >
//         {severity}
//       </span>

//     </Link>
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
//     <div className="rounded-lg border border-orange-200 bg-white p-4">

//       <p className="text-xs font-bold text-slate-800">
//         {title}
//       </p>

//       <p className="mt-1 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-6 py-12 text-center">

//       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
//         ₹
//       </div>

//       <h3 className="mt-4 text-base font-bold text-slate-900">
//         No financial activity found
//       </h3>

//       <p className="mt-1 text-sm text-slate-500">
//         Try changing your filters.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useFinancialAudit,
  type AuditModule,
  type AuditStatus,
} from "@/hooks/useFinancialAudit";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function formatCompact(amountPaise: number) {
  const rupees = amountPaise / 100;
  if (rupees >= 100000) return `₹${(rupees / 100000).toFixed(2)}L`;
  if (rupees >= 1000) return `₹${(rupees / 1000).toFixed(2)}K`;
  return formatCurrency(amountPaise);
}

function getStatusClasses(status: AuditStatus) {
  switch (status) {
    case "HEALTHY":
      return "bg-green-100 text-green-700";
    case "REVIEW":
      return "bg-yellow-100 text-yellow-700";
    case "CRITICAL":
      return "bg-red-100 text-red-700";
    case "PENDING":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(module: AuditModule) {
  switch (module) {
    case "GENERAL_LEDGER":
      return "bg-blue-50 text-blue-700";
    case "PAYOUTS":
      return "bg-green-50 text-green-700";
    case "CASHFREE":
      return "bg-purple-50 text-purple-700";
    case "SETTLEMENTS":
      return "bg-orange-50 text-orange-700";
    case "REFUNDS":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

function getModuleLabel(module: AuditModule) {
  switch (module) {
    case "GENERAL_LEDGER":
      return "General Ledger";
    case "PAYOUTS":
      return "Payouts";
    case "CASHFREE":
      return "Cashfree";
    case "SETTLEMENTS":
      return "Settlements";
    case "REFUNDS":
      return "Refunds";
    default:
      return module;
  }
}

export default function FinancialAuditPage() {
  const { activities, metrics, loading, error, refresh } = useFinancialAudit();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AuditStatus>("ALL");
  const [moduleFilter, setModuleFilter] = useState<"ALL" | AuditModule>("ALL");

  const filteredActivities = useMemo(() => {
    const q = search.trim().toLowerCase();
    return activities.filter((activity) => {
      const matchesSearch =
        !q ||
        activity.id.toLowerCase().includes(q) ||
        activity.title.toLowerCase().includes(q) ||
        activity.description.toLowerCase().includes(q) ||
        activity.referenceId.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "ALL" || activity.status === statusFilter;
      const matchesModule =
        moduleFilter === "ALL" || activity.module === moduleFilter;
      return matchesSearch && matchesStatus && matchesModule;
    });
  }, [activities, search, statusFilter, moduleFilter]);

  const metricCards = [
    {
      title: "Ledger Entries",
      value: String(metrics.ledgerCount),
      description: loading ? "Loading…" : "From ledger_entries",
      icon: "₹",
      iconClass: "bg-blue-100 text-blue-700",
    },
    {
      title: "Payouts",
      value: formatCompact(metrics.payoutAmountPaise),
      description: "Current payout queue",
      icon: "↗",
      iconClass: "bg-green-100 text-green-700",
    },
    {
      title: "Reconciliation",
      value: `${metrics.reconciliationPct}%`,
      description: "Cashfree matched",
      icon: "✓",
      iconClass: "bg-purple-100 text-purple-700",
    },
    {
      title: "Settlements",
      value: String(metrics.settlementCount),
      description: "Active settlement records",
      icon: "⌁",
      iconClass: "bg-orange-100 text-orange-700",
    },
    {
      title: "Exceptions",
      value: String(metrics.exceptions),
      description: "Requires financial review",
      icon: "!",
      iconClass: "bg-red-100 text-red-700",
    },
  ];

  const healthyCount = activities.filter((a) => a.status === "HEALTHY").length;
  const reviewCount = activities.filter((a) => a.status === "REVIEW").length;
  const criticalCount = activities.filter((a) => a.status === "CRITICAL").length;
  const pendingCount = activities.filter((a) => a.status === "PENDING").length;
  const totalActivityAmount = activities.reduce(
    (t, a) => t + a.amountPaise,
    0
  );
  const overallHealth =
    activities.length === 0
      ? 100
      : Math.round((healthyCount / activities.length) * 100);

  const exceptionItems = useMemo(() => {
    return activities
      .filter((a) => a.status === "REVIEW" || a.status === "CRITICAL")
      .slice(0, 5)
      .map((a) => ({
        title: a.title,
        description: a.referenceId,
        severity: (a.status === "CRITICAL" ? "Critical" : "Review") as
          | "Review"
          | "Critical",
        href:
          a.module === "CASHFREE"
            ? "/financial-audit/cashfree-reconciliation"
            : a.module === "PAYOUTS"
              ? "/financial-audit/payouts"
              : a.module === "REFUNDS"
                ? "/financial-audit/refunds"
                : a.module === "SETTLEMENTS"
                  ? "/financial-audit/settlements"
                  : "/financial-audit/general-ledger",
      }));
  }, [activities]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setModuleFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm font-medium text-slate-500">Dashboard</span>
            <span className="text-slate-400">/</span>
            <span className="text-sm font-medium text-slate-800">
              Financial Audit
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Financial Audit
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Live Firestore monitoring for ledger entries, settlements, payouts,
            Cashfree reconciliation and financial exceptions across JUONE.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <div className="rounded-xl bg-white px-5 py-4 shadow-sm">
            <p className="text-xs text-slate-500">Financial Activity</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {activities.length}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-bold text-orange-900">
              JUERP Financial Control Flow
            </p>
            <p className="mt-1 text-xs leading-5 text-orange-700">
              Financial transactions move through trusted backend calculation,
              ledger posting, settlement, payout and reconciliation.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <FlowBox number="01" title="Transaction" description="Order / Ride / Booking" />
            <FlowBox number="02" title="Payment" description="Payment verification" />
            <FlowBox number="03" title="Ledger" description="Debit / Credit" />
            <FlowBox number="04" title="Settlement" description="Financial calculation" />
            <FlowBox number="05" title="Payout" description="Vendor / Captain" />
            <FlowBox number="06" title="Reconciliation" description="Audit verification" />
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((metric) => (
          <SummaryCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <HealthCard title="Healthy" value={healthyCount} description="Financial operations normal" className="border-green-200 bg-green-50" valueClass="text-green-700" />
        <HealthCard title="Pending" value={pendingCount} description="Awaiting workflow completion" className="border-blue-200 bg-blue-50" valueClass="text-blue-700" />
        <HealthCard title="Review Required" value={reviewCount} description="Requires financial verification" className="border-yellow-200 bg-yellow-50" valueClass="text-yellow-700" />
        <HealthCard title="Critical" value={criticalCount} description="Immediate attention required" className="border-red-200 bg-red-50" valueClass="text-red-700" />
      </div>

      <div className="mb-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">
          Financial Audit Modules
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <AuditModuleCard href="/financial-audit/general-ledger" title="General Ledger" description="Review debit, credit and ledger entries." icon="₹" iconClass="bg-blue-100 text-blue-700" />
          <AuditModuleCard href="/financial-audit/payouts" title="Payouts" description="Monitor vendor and captain payouts." icon="↗" iconClass="bg-green-100 text-green-700" />
          <AuditModuleCard href="/financial-audit/cashfree-reconciliation" title="Cashfree Reconciliation" description="Verify gateway transactions and mismatches." icon="✓" iconClass="bg-purple-100 text-purple-700" />
          <AuditModuleCard href="/financial-audit/settlements" title="Settlements" description="Review settlement calculations and status." icon="⌁" iconClass="bg-orange-100 text-orange-700" />
          <AuditModuleCard href="/financial-audit/refunds" title="Refunds" description="Monitor refunds and financial reversals." icon="↩" iconClass="bg-red-100 text-red-700" />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Search Activity
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search reference or activity..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | AuditStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="HEALTHY">Healthy</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEW">Review</option>
              <option value="CRITICAL">Critical</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">
              Audit Module
            </label>
            <select
              value={moduleFilter}
              onChange={(e) =>
                setModuleFilter(e.target.value as "ALL" | AuditModule)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Modules</option>
              <option value="GENERAL_LEDGER">General Ledger</option>
              <option value="PAYOUTS">Payouts</option>
              <option value="CASHFREE">Cashfree</option>
              <option value="SETTLEMENTS">Settlements</option>
              <option value="REFUNDS">Refunds</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredActivities.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">
              {activities.length}
            </span>{" "}
            activities
            {loading ? " · Loading…" : ""}
          </p>
          {(search || statusFilter !== "ALL" || moduleFilter !== "ALL") && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm xl:col-span-2">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Recent Financial Activity
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Live from Firestore · auto-refreshes
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {filteredActivities.length}
              </span>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-5 transition hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-700">
                      {activity.module === "GENERAL_LEDGER"
                        ? "₹"
                        : activity.module === "PAYOUTS"
                          ? "↗"
                          : activity.module === "CASHFREE"
                            ? "✓"
                            : activity.module === "SETTLEMENTS"
                              ? "⌁"
                              : "↩"}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900">
                          {activity.title}
                        </h3>
                        <span
                          className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(activity.module)}`}
                        >
                          {getModuleLabel(activity.module)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-slate-400">
                        <span>{activity.referenceId}</span>
                        <span>{activity.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-sm font-bold text-slate-800">
                      {formatCurrency(activity.amountPaise)}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(activity.status)}`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {!loading && filteredActivities.length === 0 && <EmptyState />}
            {loading && activities.length === 0 && (
              <div className="px-6 py-12 text-center text-sm text-slate-500">
                Loading financial data from Firestore…
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="text-base font-bold text-slate-900">Audit Health</h2>
            <p className="mt-1 text-xs text-slate-500">
              Derived from live activity status
            </p>
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">
                  Overall Health
                </span>
                <span className="text-sm font-bold text-green-600">
                  {overallHealth}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${overallHealth}%` }}
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <AuditHealthRow
                title="Ledger Integrity"
                value={`${metrics.ledgerCount} entries`}
                status="Healthy"
              />
              <AuditHealthRow
                title="Cashfree Matching"
                value={`${metrics.reconciliationPct}%`}
                status={
                  metrics.reconciliationPct >= 95 ? "Healthy" : "Review"
                }
              />
              <AuditHealthRow
                title="Settlements"
                value={String(metrics.settlementCount)}
                status="Healthy"
              />
              <AuditHealthRow
                title="Exceptions"
                value={String(metrics.exceptions)}
                status={metrics.exceptions > 0 ? "Review" : "Healthy"}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Financial Exceptions
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Items requiring attention
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">
                {reviewCount + criticalCount}
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {exceptionItems.length === 0 && (
                <p className="text-xs text-slate-500">No open exceptions.</p>
              )}
              {exceptionItems.map((item) => (
                <ExceptionRow key={item.title + item.description} {...item} />
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5 text-white">
            <p className="text-xs text-slate-400">Tracked Financial Movement</p>
            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(totalActivityAmount)}
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Combined amount from currently monitored Firestore activities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">
          Financial Governance
        </h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          JUERP Financial Audit is a governance and monitoring layer. Financial
          authority remains with the trusted backend and ERP-controlled rules.
          Client screens must not independently calculate commissions,
          settlement values, payout amounts, refunds or other authoritative
          financial values.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          <GovernanceBox title="Ledger" description="Debit / credit audit trail" />
          <GovernanceBox title="Settlement" description="Authoritative financial calculation" />
          <GovernanceBox title="Payout" description="Authorized financial disbursement" />
          <GovernanceBox title="Reconciliation" description="Payment and ledger verification" />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: string;
  description: string;
  icon: string;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function FlowBox({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-orange-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
          {number}
        </div>
        <div>
          <p className="text-xs font-bold text-orange-900">{title}</p>
          <p className="mt-0.5 text-[10px] text-orange-700">{description}</p>
        </div>
      </div>
    </div>
  );
}

function AuditModuleCard({
  href,
  title,
  description,
  icon,
  iconClass,
}: {
  href: string;
  title: string;
  description: string;
  icon: string;
  iconClass: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
      >
        {icon}
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-orange-600">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
      <div className="mt-4 text-xs font-semibold text-orange-600">
        Open Module →
      </div>
    </Link>
  );
}

function HealthCard({
  title,
  value,
  description,
  className,
  valueClass,
}: {
  title: string;
  value: number;
  description: string;
  className: string;
  valueClass: string;
}) {
  return (
    <div className={`rounded-xl border p-5 ${className}`}>
      <p className="text-xs font-semibold text-slate-600">{title}</p>
      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

function AuditHealthRow({
  title,
  value,
  status,
}: {
  title: string;
  value: string;
  status: "Healthy" | "Review";
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-700">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-800">{value}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              status === "Healthy" ? "bg-green-500" : "bg-yellow-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

function ExceptionRow({
  title,
  description,
  severity,
  href,
}: {
  title: string;
  description: string;
  severity: "Review" | "Critical";
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-orange-200 hover:bg-orange-50"
    >
      <div>
        <p className="text-xs font-bold text-slate-800">{title}</p>
        <p className="mt-1 text-[11px] text-slate-400">{description}</p>
      </div>
      <span
        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
          severity === "Critical"
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {severity}
      </span>
    </Link>
  );
}

function GovernanceBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-orange-200 bg-white p-4">
      <p className="text-xs font-bold text-slate-800">{title}</p>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
        ₹
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-900">
        No financial activity found
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Empty collections or filters too narrow. Data comes from
        ledger_entries, settlements, refunds, cashfree_events.
      </p>
    </div>
  );
}