// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type OverrideModule =
//   | "DISPATCH"
//   | "SUSPENSIONS"
//   | "CANCELLATIONS";

// type OverrideStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// type OverrideActivity = {
//   id: string;
//   module: OverrideModule;
//   title: string;
//   description: string;
//   referenceId: string;
//   requestedBy: string;
//   status: OverrideStatus;
//   createdAt: string;
// };

// const INITIAL_ACTIVITIES: OverrideActivity[] = [
//   {
//     id: "OVR-1001",
//     module: "DISPATCH",
//     title: "Captain reassignment requested",
//     description:
//       "Order requires reassignment because the currently assigned captain is unavailable.",
//     referenceId: "DSP-OVR-1001",
//     requestedBy: "STATE_ADMIN",
//     status: "EXECUTED",
//     createdAt: "05 Oct 2026, 09:20 AM",
//   },
//   {
//     id: "OVR-1002",
//     module: "SUSPENSIONS",
//     title: "Captain suspension request",
//     description:
//       "Temporary captain suspension requested following an operational safety issue.",
//     referenceId: "SUS-OVR-1001",
//     requestedBy: "STATE_ADMIN",
//     status: "EXECUTED",
//     createdAt: "05 Oct 2026, 09:20 AM",
//   },
//   {
//     id: "OVR-1003",
//     module: "DISPATCH",
//     title: "Captain reassignment pending",
//     description:
//       "District administrator requested reassignment due to service-area mismatch.",
//     referenceId: "DSP-OVR-1002",
//     requestedBy: "DISTRICT_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 10:15 AM",
//   },
//   {
//     id: "OVR-1004",
//     module: "SUSPENSIONS",
//     title: "Vendor suspension review",
//     description:
//       "Vendor KYC documentation requires administrative verification.",
//     referenceId: "SUS-OVR-1002",
//     requestedBy: "DISTRICT_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 09:30 AM",
//   },
//   {
//     id: "OVR-1005",
//     module: "CANCELLATIONS",
//     title: "Order cancellation override",
//     description:
//       "Administrative cancellation requested because of a service issue.",
//     referenceId: "CAN-OVR-1004",
//     requestedBy: "STATE_ADMIN",
//     status: "APPROVED",
//     createdAt: "05 Oct 2026, 11:10 AM",
//   },
//   {
//     id: "OVR-1006",
//     module: "DISPATCH",
//     title: "Emergency dispatch reassignment",
//     description:
//       "Emergency captain reassignment requested by district operations.",
//     referenceId: "DSP-OVR-1006",
//     requestedBy: "SUPER_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 01:10 PM",
//   },
//   {
//     id: "OVR-1007",
//     module: "SUSPENSIONS",
//     title: "Customer account suspension review",
//     description:
//       "Customer account flagged for administrative investigation.",
//     referenceId: "SUS-OVR-1003",
//     requestedBy: "TECHNICAL_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 10:05 AM",
//   },
//   {
//     id: "OVR-1008",
//     module: "CANCELLATIONS",
//     title: "Booking cancellation rejected",
//     description:
//       "Requested cancellation override did not satisfy governance requirements.",
//     referenceId: "CAN-OVR-1005",
//     requestedBy: "DISTRICT_ADMIN",
//     status: "REJECTED",
//     createdAt: "04 Oct 2026, 04:20 PM",
//   },
// ];

// function getStatusClasses(status: OverrideStatus) {
//   switch (status) {
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "APPROVED":
//       return "bg-blue-100 text-blue-700";

//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     case "EXECUTED":
//       return "bg-green-100 text-green-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: OverrideModule) {
//   switch (module) {
//     case "DISPATCH":
//       return "bg-blue-100 text-blue-700";

//     case "SUSPENSIONS":
//       return "bg-red-100 text-red-700";

//     case "CANCELLATIONS":
//       return "bg-orange-100 text-orange-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleLabel(module: OverrideModule) {
//   switch (module) {
//     case "DISPATCH":
//       return "Dispatch";

//     case "SUSPENSIONS":
//       return "Suspensions";

//     case "CANCELLATIONS":
//       return "Cancellations";

//     default:
//       return module;
//   }
// }

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// export default function OverridesPage() {
//   const [activities] = useState<OverrideActivity[]>(
//     INITIAL_ACTIVITIES
//   );

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | OverrideStatus>("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState<"ALL" | OverrideModule>("ALL");

//   const filteredActivities = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();

//     return activities.filter((item) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         item.id.toLowerCase().includes(searchValue) ||
//         item.referenceId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.title.toLowerCase().includes(searchValue) ||
//         item.description
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.requestedBy
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         item.status === statusFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         item.module === moduleFilter;

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

//   const summary = useMemo(() => {
//     return {
//       total: activities.length,

//       pending: activities.filter(
//         (item) => item.status === "PENDING"
//       ).length,

//       approved: activities.filter(
//         (item) => item.status === "APPROVED"
//       ).length,

//       rejected: activities.filter(
//         (item) => item.status === "REJECTED"
//       ).length,

//       executed: activities.filter(
//         (item) => item.status === "EXECUTED"
//       ).length,

//       dispatch: activities.filter(
//         (item) => item.module === "DISPATCH"
//       ).length,

//       suspensions: activities.filter(
//         (item) => item.module === "SUSPENSIONS"
//       ).length,

//       cancellations: activities.filter(
//         (item) => item.module === "CANCELLATIONS"
//       ).length,
//     };
//   }, [activities]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6">

//         <div className="mb-3 flex items-center gap-2 text-sm">

//           <span className="font-semibold text-slate-800">
//             Overrides
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
//                   ⚙
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Administrative Overrides
//                   </h1>

//                   <p className="mt-1 max-w-2xl text-sm text-slate-500">
//                     Central governance dashboard for
//                     exceptional dispatch, suspension and
//                     cancellation operations.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

//               <p className="text-xs font-bold text-orange-800">
//                 Protected Operations
//               </p>

//               <p className="mt-1 text-xs leading-5 text-orange-700">
//                 Overrides require authorized administrative
//                 scope and trusted backend validation.
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SUMMARY CARDS */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">

//         <SummaryCard
//           title="Total"
//           value={summary.total}
//         />

//         <SummaryCard
//           title="Pending"
//           value={summary.pending}
//         />

//         <SummaryCard
//           title="Approved"
//           value={summary.approved}
//         />

//         <SummaryCard
//           title="Rejected"
//           value={summary.rejected}
//         />

//         <SummaryCard
//           title="Executed"
//           value={summary.executed}
//         />

//         <SummaryCard
//           title="Dispatch"
//           value={summary.dispatch}
//         />

//         <SummaryCard
//           title="Suspensions"
//           value={summary.suspensions}
//         />

//         <SummaryCard
//           title="Cancellations"
//           value={summary.cancellations}
//         />

//       </div>

//       {/* OVERRIDE MODULES */}

//       <div className="mb-6">

//         <div className="mb-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Override Modules
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Open the appropriate governance workflow.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

//           {/* DISPATCH */}

//           <Link
//             href="/overrides/dispatch"
//             className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//           >

//             <div className="flex items-start justify-between">

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600">
//                 ⇄
//               </div>

//               <span className="text-slate-300 transition group-hover:text-blue-500">
//                 →
//               </span>

//             </div>

//             <h3 className="mt-5 text-lg font-bold text-slate-900">
//               Dispatch Overrides
//             </h3>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Review captain assignment,
//               reassignment and exceptional dispatch
//               requests.
//             </p>

//             <div className="mt-5 flex items-center justify-between">

//               <span className="text-xs font-semibold text-blue-600">
//                 {summary.dispatch} requests
//               </span>

//               <span className="text-xs font-semibold text-slate-400">
//                 Manage →
//               </span>

//             </div>

//           </Link>

//           {/* SUSPENSIONS */}

//           <Link
//             href="/overrides/suspensions"
//             className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//           >

//             <div className="flex items-start justify-between">

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
//                 !
//               </div>

//               <span className="text-slate-300 transition group-hover:text-red-500">
//                 →
//               </span>

//             </div>

//             <h3 className="mt-5 text-lg font-bold text-slate-900">
//               Suspension Overrides
//             </h3>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Govern exceptional customer, vendor and
//               captain suspension operations.
//             </p>

//             <div className="mt-5 flex items-center justify-between">

//               <span className="text-xs font-semibold text-red-600">
//                 {summary.suspensions} requests
//               </span>

//               <span className="text-xs font-semibold text-slate-400">
//                 Manage →
//               </span>

//             </div>

//           </Link>

//           {/* CANCELLATIONS */}

//           <Link
//             href="/overrides/cancellations"
//             className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//           >

//             <div className="flex items-start justify-between">

//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
//                 ×
//               </div>

//               <span className="text-slate-300 transition group-hover:text-orange-500">
//                 →
//               </span>

//             </div>

//             <h3 className="mt-5 text-lg font-bold text-slate-900">
//               Cancellation Overrides
//             </h3>

//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               Review protected order, booking, ride and
//               delivery cancellation requests.
//             </p>

//             <div className="mt-5 flex items-center justify-between">

//               <span className="text-xs font-semibold text-orange-600">
//                 {summary.cancellations} requests
//               </span>

//               <span className="text-xs font-semibold text-slate-400">
//                 Manage →
//               </span>

//             </div>

//           </Link>

//         </div>

//       </div>

//       {/* WORKFLOW */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

//           <div>

//             <h2 className="text-lg font-bold text-slate-900">
//               Override Governance Flow
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Common lifecycle for protected administrative
//               overrides.
//             </p>

//           </div>

//           <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
//             JUERP Governance
//           </div>

//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">

//           <WorkflowStep
//             number="1"
//             title="Request"
//             description="Authorized administrator submits an exception request."
//           />

//           <WorkflowStep
//             number="2"
//             title="Validate"
//             description="Trusted backend validates identity, scope and current state."
//           />

//           <WorkflowStep
//             number="3"
//             title="Approve"
//             description="Appropriate administrative authority approves or rejects."
//           />

//           <WorkflowStep
//             number="4"
//             title="Execute"
//             description="Trusted backend performs the protected state transition."
//           />

//           <WorkflowStep
//             number="5"
//             title="Audit"
//             description="Action is recorded for governance and investigation."
//           />

//         </div>

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

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
//               placeholder="Search override ID, reference, title or administrator..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div className="w-full lg:w-48">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | OverrideStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="PENDING">
//                 Pending
//               </option>

//               <option value="APPROVED">
//                 Approved
//               </option>

//               <option value="REJECTED">
//                 Rejected
//               </option>

//               <option value="EXECUTED">
//                 Executed
//               </option>

//             </select>

//           </div>

//           <div className="w-full lg:w-48">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Module
//             </label>

//             <select
//               value={moduleFilter}
//               onChange={(event) =>
//                 setModuleFilter(
//                   event.target.value as
//                     | "ALL"
//                     | OverrideModule
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Modules
//               </option>

//               <option value="DISPATCH">
//                 Dispatch
//               </option>

//               <option value="SUSPENSIONS">
//                 Suspensions
//               </option>

//               <option value="CANCELLATIONS">
//                 Cancellations
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
//             {filteredActivities.length}
//           </span>

//           {" "}of{" "}

//           <span className="font-semibold text-slate-700">
//             {activities.length}
//           </span>

//           {" "}override activities

//         </p>

//       </div>

//       {/* RECENT ACTIVITY */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Recent Override Activity
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Central view of administrative override
//             activity.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Override
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Activity
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Requested By
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Time
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredActivities.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {item.id}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {item.referenceId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                         item.module
//                       )}`}
//                     >
//                       {getModuleLabel(item.module)}
//                     </span>

//                   </td>

//                   <td className="max-w-md px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {item.title}
//                     </p>

//                     <p className="mt-1 text-xs leading-5 text-slate-400">
//                       {item.description}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
//                       {item.requestedBy}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         item.status
//                       )}`}
//                     >
//                       {item.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="text-xs text-slate-500">
//                       {item.createdAt}
//                     </span>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredActivities.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE ACTIVITY */}

//       <div className="space-y-4 md:hidden">

//         <div>

//           <h2 className="text-lg font-bold text-slate-900">
//             Recent Override Activity
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Central view of administrative override
//             activity.
//           </p>

//         </div>

//         {filteredActivities.map((item) => (
//           <div
//             key={item.id}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {item.id}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {item.referenceId}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   item.status
//                 )}`}
//               >
//                 {item.status}
//               </span>

//             </div>

//             <div className="mt-4">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getModuleClasses(
//                   item.module
//                 )}`}
//               >
//                 {getModuleLabel(item.module)}
//               </span>

//             </div>

//             <h3 className="mt-4 text-sm font-bold text-slate-800">
//               {item.title}
//             </h3>

//             <p className="mt-2 text-xs leading-5 text-slate-500">
//               {item.description}
//             </p>

//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

//               <MobileInfo
//                 label="Requested By"
//                 value={item.requestedBy}
//               />

//               <MobileInfo
//                 label="Created At"
//                 value={item.createdAt}
//               />

//             </div>

//           </div>
//         ))}

//         {filteredActivities.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           JUERP Override Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Overrides are privileged administrative
//           operations. JUERP provides the governance
//           interface, while authoritative validation and
//           execution must remain on the trusted backend.
//           Client applications must not independently
//           redefine account status, dispatch eligibility,
//           cancellation outcomes or other protected business
//           rules.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="Authorization"
//             description="Validate the authenticated administrator and their state, district or pincode scope."
//           />

//           <GovernanceCard
//             title="Backend Validation"
//             description="Validate entity state, eligibility and allowed state transitions before execution."
//           />

//           <GovernanceCard
//             title="Idempotency"
//             description="Protected operations should use correlationId and idempotencyKey to prevent duplicate execution."
//           />

//           <GovernanceCard
//             title="Audit"
//             description="Record protected actions and administrative decisions in the authoritative audit trail."
//           />

//         </div>

//       </div>

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

// function WorkflowStep({
//   number,
//   title,
//   description,
// }: {
//   number: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

//       <div className="flex items-center gap-3">

//         <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
//           {number}
//         </div>

//         <p className="text-sm font-bold text-slate-800">
//           {title}
//         </p>

//       </div>

//       <p className="mt-3 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function MobileInfo({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">

//       <p className="text-[10px] font-medium text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-xs font-bold text-slate-800">
//         {value}
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

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">

//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         ⚙
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No override activity found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useOperationalOverrides,
  type OverrideModule,
  type OverrideWorkflowStatus,
} from "@/hooks/useOperationalOverrides";

function getStatusClasses(status: OverrideWorkflowStatus) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "APPROVED":
      return "bg-blue-100 text-blue-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "EXECUTED":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(module: OverrideModule) {
  switch (module) {
    case "DISPATCH":
      return "bg-blue-100 text-blue-700";
    case "SUSPENSIONS":
      return "bg-red-100 text-red-700";
    case "CANCELLATIONS":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleLabel(module: OverrideModule) {
  switch (module) {
    case "DISPATCH":
      return "Dispatch";
    case "SUSPENSIONS":
      return "Suspensions";
    case "CANCELLATIONS":
      return "Cancellations";
    default:
      return module;
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function OverridesPage() {
  const { activities, loading, error, refresh } = useOperationalOverrides();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | OverrideWorkflowStatus>("ALL");
  const [moduleFilter, setModuleFilter] = useState<"ALL" | OverrideModule>("ALL");

  const filteredActivities = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return activities.filter((item) => {
      const matchesSearch =
        searchValue.length === 0 ||
        item.id.toLowerCase().includes(searchValue) ||
        item.referenceId.toLowerCase().includes(searchValue) ||
        item.title.toLowerCase().includes(searchValue) ||
        item.description.toLowerCase().includes(searchValue) ||
        item.requestedBy.toLowerCase().includes(searchValue);
      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const matchesModule =
        moduleFilter === "ALL" || item.module === moduleFilter;
      return matchesSearch && matchesStatus && matchesModule;
    });
  }, [activities, search, statusFilter, moduleFilter]);

  const summary = useMemo(
    () => ({
      total: activities.length,
      pending: activities.filter((i) => i.status === "PENDING").length,
      approved: activities.filter((i) => i.status === "APPROVED").length,
      rejected: activities.filter((i) => i.status === "REJECTED").length,
      executed: activities.filter((i) => i.status === "EXECUTED").length,
      dispatch: activities.filter((i) => i.module === "DISPATCH").length,
      suspensions: activities.filter((i) => i.module === "SUSPENSIONS").length,
      cancellations: activities.filter((i) => i.module === "CANCELLATIONS")
        .length,
    }),
    [activities]
  );

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setModuleFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-800">Overrides</span>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
                ⚙
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Administrative Overrides
                </h1>
                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Live governance dashboard for dispatch, suspension and
                  cancellation exceptions (Firestore).
                </p>
              </div>
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
              <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
                <p className="text-xs font-bold text-orange-800">
                  Protected Operations
                </p>
                <p className="mt-1 text-xs leading-5 text-orange-700">
                  Overrides require authorized scope and trusted backend
                  validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <SummaryCard title="Total" value={summary.total} />
        <SummaryCard title="Pending" value={summary.pending} />
        <SummaryCard title="Approved" value={summary.approved} />
        <SummaryCard title="Rejected" value={summary.rejected} />
        <SummaryCard title="Executed" value={summary.executed} />
        <SummaryCard title="Dispatch" value={summary.dispatch} />
        <SummaryCard title="Suspensions" value={summary.suspensions} />
        <SummaryCard title="Cancellations" value={summary.cancellations} />
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Override Modules</h2>
          <p className="mt-1 text-sm text-slate-500">
            Open the appropriate governance workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <ModuleCard
            href="/overrides/dispatch"
            icon="⇄"
            iconClass="bg-blue-100 text-blue-600"
            title="Dispatch Overrides"
            description="Review captain assignment, reassignment and exceptional dispatch requests."
            count={summary.dispatch}
            countClass="text-blue-600"
          />
          <ModuleCard
            href="/overrides/suspensions"
            icon="!"
            iconClass="bg-red-100 text-red-600"
            title="Suspension Overrides"
            description="Govern exceptional customer, vendor and captain suspension operations."
            count={summary.suspensions}
            countClass="text-red-600"
          />
          <ModuleCard
            href="/overrides/cancellations"
            icon="×"
            iconClass="bg-orange-100 text-orange-600"
            title="Cancellation Overrides"
            description="Review protected order, booking, ride and delivery cancellation requests."
            count={summary.cancellations}
            countClass="text-orange-600"
          />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Override Governance Flow
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Common lifecycle for protected administrative overrides.
            </p>
          </div>
          <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
            JUERP Governance
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
          <WorkflowStep number="1" title="Request" description="Authorized administrator submits an exception request." />
          <WorkflowStep number="2" title="Validate" description="Trusted backend validates identity, scope and current state." />
          <WorkflowStep number="3" title="Approve" description="Appropriate administrative authority approves or rejects." />
          <WorkflowStep number="4" title="Execute" description="Trusted backend performs the protected state transition." />
          <WorkflowStep number="5" title="Audit" description="Action is recorded for governance and investigation." />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search override ID, reference, title or administrator..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="w-full lg:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | OverrideWorkflowStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="EXECUTED">Executed</option>
            </select>
          </div>
          <div className="w-full lg:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Module
            </label>
            <select
              value={moduleFilter}
              onChange={(e) =>
                setModuleFilter(e.target.value as "ALL" | OverrideModule)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Modules</option>
              <option value="DISPATCH">Dispatch</option>
              <option value="SUSPENSIONS">Suspensions</option>
              <option value="CANCELLATIONS">Cancellations</option>
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
            {filteredActivities.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{activities.length}</span>{" "}
          override activities
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Override Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Aggregated from dispatch, suspension and cancellation collections.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Override</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Module</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Activity</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Requested By</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredActivities.map((item) => (
                <tr key={`${item.module}-${item.id}`} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{item.id}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.referenceId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getModuleClasses(item.module)}`}>
                      {getModuleLabel(item.module)}
                    </span>
                  </td>
                  <td className="max-w-md px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                      {item.requestedBy}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-500">{item.createdAt}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredActivities.length === 0 && <EmptyState />}
        {loading && activities.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading overrides from Firestore…
          </div>
        )}
      </div>

      <div className="space-y-4 md:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Override Activity</h2>
          <p className="mt-1 text-xs text-slate-500">Live Firestore activity feed.</p>
        </div>
        {filteredActivities.map((item) => (
          <div key={`${item.module}-${item.id}`} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{item.id}</p>
                <p className="mt-1 text-xs text-slate-400">{item.referenceId}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-4">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getModuleClasses(item.module)}`}>
                {getModuleLabel(item.module)}
              </span>
            </div>
            <h3 className="mt-4 text-sm font-bold text-slate-800">{item.title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-500">{item.description}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MobileInfo label="Requested By" value={item.requestedBy} />
              <MobileInfo label="Created At" value={item.createdAt} />
            </div>
          </div>
        ))}
        {!loading && filteredActivities.length === 0 && (
          <div className="rounded-2xl bg-white shadow-sm">
            <EmptyState />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">JUERP Override Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          Overrides are privileged administrative operations. This dashboard
          displays Firestore documents only. Authorization, eligibility, state
          transitions and audit logging must remain on the trusted backend.
        </p>
      </div>
    </div>
  );
}

function ModuleCard({
  href,
  icon,
  iconClass,
  title,
  description,
  count,
  countClass,
}: {
  href: string;
  icon: string;
  iconClass: string;
  title: string;
  description: string;
  count: number;
  countClass: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl ${iconClass}`}>
          {icon}
        </div>
        <span className="text-slate-300 transition group-hover:text-orange-500">→</span>
      </div>
      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className={`text-xs font-semibold ${countClass}`}>
          {count} requests
        </span>
        <span className="text-xs font-semibold text-slate-400">Manage →</span>
      </div>
    </Link>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{formatNumber(value)}</p>
    </div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
          {number}
        </div>
        <p className="text-sm font-bold text-slate-800">{title}</p>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function MobileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 break-words text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        ⚙
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">No override activity found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty collections or filters too narrow.
      </p>
    </div>
  );
}