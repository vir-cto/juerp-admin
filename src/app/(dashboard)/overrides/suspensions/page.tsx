// "use client";

// import { useMemo, useState } from "react";

// type SuspensionStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// type SuspensionEntity =
//   | "CUSTOMER"
//   | "VENDOR"
//   | "CAPTAIN";

// type SuspensionReason =
//   | "POLICY_VIOLATION"
//   | "KYC_ISSUE"
//   | "FRAUD_SUSPECTED"
//   | "SAFETY_ISSUE"
//   | "PAYMENT_ISSUE"
//   | "SERVICE_ISSUE"
//   | "ADMINISTRATIVE"
//   | "OTHER";

// type SuspensionOverride = {
//   overrideId: string;
//   entityId: string;
//   entityType: SuspensionEntity;
//   entityName: string;
//   moduleId?: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: SuspensionReason;
//   reasonText: string;
//   requestedBy: string;
//   approvedBy?: string;
//   duration?: string;
//   status: SuspensionStatus;
//   createdAt: string;
//   updatedAt: string;
// };

// const INITIAL_SUSPENSIONS: SuspensionOverride[] = [
//   {
//     overrideId: "SUS-OVR-1001",
//     entityId: "CAP-301",
//     entityType: "CAPTAIN",
//     entityName: "Ramesh Kumar",
//     moduleId: "JURIDE",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "SAFETY_ISSUE",
//     reasonText:
//       "Temporary suspension requested following an operational safety complaint.",
//     requestedBy: "STATE_ADMIN",
//     approvedBy: "SUPER_ADMIN",
//     duration: "7 Days",
//     status: "EXECUTED",
//     createdAt: "05 Oct 2026, 08:45 AM",
//     updatedAt: "05 Oct 2026, 09:20 AM",
//   },
//   {
//     overrideId: "SUS-OVR-1002",
//     entityId: "VEN-2045",
//     entityType: "VENDOR",
//     entityName: "Fresh Food Corner",
//     moduleId: "JUCART",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "KYC_ISSUE",
//     reasonText:
//       "Vendor documentation requires administrative verification before continued operations.",
//     requestedBy: "DISTRICT_ADMIN",
//     duration: "Until Review",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 09:30 AM",
//     updatedAt: "05 Oct 2026, 09:30 AM",
//   },
//   {
//     overrideId: "SUS-OVR-1003",
//     entityId: "CUS-1045",
//     entityType: "CUSTOMER",
//     entityName: "Anjali Reddy",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "FRAUD_SUSPECTED",
//     reasonText:
//       "Account activity has been flagged for administrative investigation.",
//     requestedBy: "TECHNICAL_ADMIN",
//     duration: "Until Investigation",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 10:05 AM",
//     updatedAt: "05 Oct 2026, 10:05 AM",
//   },
//   {
//     overrideId: "SUS-OVR-1004",
//     entityId: "CAP-417",
//     entityType: "CAPTAIN",
//     entityName: "Vijay Kumar",
//     moduleId: "JUCART",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "POLICY_VIOLATION",
//     reasonText:
//       "Repeated operational policy violations reported by the district operations team.",
//     requestedBy: "DISTRICT_ADMIN",
//     approvedBy: "STATE_ADMIN",
//     duration: "14 Days",
//     status: "APPROVED",
//     createdAt: "04 Oct 2026, 03:15 PM",
//     updatedAt: "05 Oct 2026, 11:00 AM",
//   },
//   {
//     overrideId: "SUS-OVR-1005",
//     entityId: "VEN-4102",
//     entityType: "VENDOR",
//     entityName: "Green Valley Resort",
//     moduleId: "JUSTAY",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "SERVICE_ISSUE",
//     reasonText:
//       "Repeated service complaints require temporary operational review.",
//     requestedBy: "STATE_ADMIN",
//     duration: "3 Days",
//     status: "REJECTED",
//     createdAt: "03 Oct 2026, 01:20 PM",
//     updatedAt: "04 Oct 2026, 04:10 PM",
//   },
//   {
//     overrideId: "SUS-OVR-1006",
//     entityId: "CUS-1102",
//     entityType: "CUSTOMER",
//     entityName: "Vikram Patel",
//     currentStatus: "ACTIVE",
//     requestedStatus: "SUSPENDED",
//     reason: "PAYMENT_ISSUE",
//     reasonText:
//       "Multiple payment-related exceptions require account review.",
//     requestedBy: "TECHNICAL_ADMIN",
//     duration: "Until Review",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 12:10 PM",
//     updatedAt: "05 Oct 2026, 12:10 PM",
//   },
// ];

// function getStatusClasses(status: SuspensionStatus) {
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

// function getEntityClasses(entityType: SuspensionEntity) {
//   switch (entityType) {
//     case "CUSTOMER":
//       return "bg-purple-100 text-purple-700";

//     case "VENDOR":
//       return "bg-orange-100 text-orange-700";

//     case "CAPTAIN":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getReasonLabel(reason: SuspensionReason) {
//   switch (reason) {
//     case "POLICY_VIOLATION":
//       return "Policy Violation";

//     case "KYC_ISSUE":
//       return "KYC Issue";

//     case "FRAUD_SUSPECTED":
//       return "Fraud Suspected";

//     case "SAFETY_ISSUE":
//       return "Safety Issue";

//     case "PAYMENT_ISSUE":
//       return "Payment Issue";

//     case "SERVICE_ISSUE":
//       return "Service Issue";

//     case "ADMINISTRATIVE":
//       return "Administrative";

//     case "OTHER":
//       return "Other";

//     default:
//       return reason;
//   }
// }

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// export default function SuspensionOverridesPage() {
//   const [suspensions, setSuspensions] = useState<
//     SuspensionOverride[]
//   >(INITIAL_SUSPENSIONS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] = useState<
//     "ALL" | SuspensionStatus
//   >("ALL");

//   const [entityFilter, setEntityFilter] = useState<
//     "ALL" | SuspensionEntity
//   >("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState("ALL");

//   const [selectedSuspension, setSelectedSuspension] =
//     useState<SuspensionOverride | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [showActionModal, setShowActionModal] =
//     useState(false);

//   const [actionType, setActionType] = useState<
//     "APPROVE" | "REJECT" | "EXECUTE" | null
//   >(null);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredSuspensions = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();

//     return suspensions.filter((item) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         item.overrideId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.entityId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.entityName
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.requestedBy
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.reasonText
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         item.status === statusFilter;

//       const matchesEntity =
//         entityFilter === "ALL" ||
//         item.entityType === entityFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         item.moduleId === moduleFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesEntity &&
//         matchesModule
//       );
//     });
//   }, [
//     suspensions,
//     search,
//     statusFilter,
//     entityFilter,
//     moduleFilter,
//   ]);

//   const summary = useMemo(() => {
//     return {
//       total: suspensions.length,

//       pending: suspensions.filter(
//         (item) => item.status === "PENDING"
//       ).length,

//       approved: suspensions.filter(
//         (item) => item.status === "APPROVED"
//       ).length,

//       rejected: suspensions.filter(
//         (item) => item.status === "REJECTED"
//       ).length,

//       executed: suspensions.filter(
//         (item) => item.status === "EXECUTED"
//       ).length,

//       captains: suspensions.filter(
//         (item) => item.entityType === "CAPTAIN"
//       ).length,

//       vendors: suspensions.filter(
//         (item) => item.entityType === "VENDOR"
//       ).length,

//       customers: suspensions.filter(
//         (item) => item.entityType === "CUSTOMER"
//       ).length,
//     };
//   }, [suspensions]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setEntityFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openDetails(
//     item: SuspensionOverride
//   ) {
//     setSelectedSuspension(item);
//     setShowDetails(true);
//   }

//   function openAction(
//     item: SuspensionOverride,
//     action: "APPROVE" | "REJECT" | "EXECUTE"
//   ) {
//     setSelectedSuspension(item);
//     setActionType(action);
//     setShowActionModal(true);
//   }

//   function executeAction() {
//     if (!selectedSuspension || !actionType) {
//       return;
//     }

//     let newStatus: SuspensionStatus;

//     if (actionType === "APPROVE") {
//       newStatus = "APPROVED";
//     } else if (actionType === "REJECT") {
//       newStatus = "REJECTED";
//     } else {
//       newStatus = "EXECUTED";
//     }

//     setSuspensions((current) =>
//       current.map((item) =>
//         item.overrideId ===
//         selectedSuspension.overrideId
//           ? {
//               ...item,
//               status: newStatus,
//               approvedBy:
//                 actionType === "APPROVE"
//                   ? "CURRENT_ADMIN"
//                   : item.approvedBy,
//               updatedAt:
//                 "05 Oct 2026, 02:30 PM",
//             }
//           : item
//       )
//     );

//     setShowActionModal(false);

//     setSuccessMessage(
//       `${selectedSuspension.overrideId} marked as ${newStatus}. This is currently a UI-only action.`
//     );

//     setSelectedSuspension(null);
//     setActionType(null);

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 4000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6">

//         <div className="mb-3 flex items-center gap-2 text-sm">

//           <span className="text-slate-400">
//             Overrides
//           </span>

//           <span className="text-slate-400">
//             /
//           </span>

//           <span className="font-semibold text-slate-800">
//             Suspensions
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
//                   !
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Suspension Overrides
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Review and govern exceptional
//                     customer, vendor and captain
//                     suspension requests.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

//               <p className="text-xs font-bold text-red-800">
//                 Protected Operation
//               </p>

//               <p className="mt-1 text-xs text-red-700">
//                 Suspension decisions require
//                 authorization, validation and audit
//                 logging.
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS MESSAGE */}

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
//           title="Captains"
//           value={summary.captains}
//         />

//         <SummaryCard
//           title="Vendors"
//           value={summary.vendors}
//         />

//         <SummaryCard
//           title="Customers"
//           value={summary.customers}
//         />

//       </div>

//       {/* WORKFLOW */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <h2 className="text-lg font-bold text-slate-900">
//           Suspension Override Workflow
//         </h2>

//         <p className="mt-1 text-xs text-slate-500">
//           Protected administrative suspension workflow.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">

//           <WorkflowStep
//             number="1"
//             title="Request"
//             description="Suspension request is submitted."
//           />

//           <WorkflowStep
//             number="2"
//             title="Validate"
//             description="Backend validates entity and authorization scope."
//           />

//           <WorkflowStep
//             number="3"
//             title="Approve"
//             description="Authorized admin reviews and approves."
//           />

//           <WorkflowStep
//             number="4"
//             title="Execute"
//             description="Trusted backend applies the suspension."
//           />

//           <WorkflowStep
//             number="5"
//             title="Audit"
//             description="Action and reason are recorded."
//           />

//         </div>

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
//               placeholder="Search override ID, entity, name or reason..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div className="w-full xl:w-48">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | SuspensionStatus
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

//           <div className="w-full xl:w-48">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Entity
//             </label>

//             <select
//               value={entityFilter}
//               onChange={(event) =>
//                 setEntityFilter(
//                   event.target.value as
//                     | "ALL"
//                     | SuspensionEntity
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Entities
//               </option>

//               <option value="CUSTOMER">
//                 Customer
//               </option>

//               <option value="VENDOR">
//                 Vendor
//               </option>

//               <option value="CAPTAIN">
//                 Captain
//               </option>

//             </select>

//           </div>

//           <div className="w-full xl:w-48">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Module
//             </label>

//             <select
//               value={moduleFilter}
//               onChange={(event) =>
//                 setModuleFilter(event.target.value)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Modules
//               </option>

//               <option value="JUCART">
//                 JuCart
//               </option>

//               <option value="JURIDE">
//                 JuRide
//               </option>

//               <option value="JUSTAY">
//                 JuStay
//               </option>

//               <option value="JUHOME">
//                 JuHome
//               </option>

//               <option value="JUSHOPPING">
//                 JuShopping
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
//             {filteredSuspensions.length}
//           </span>

//           {" "}of{" "}

//           <span className="font-semibold text-slate-700">
//             {suspensions.length}
//           </span>

//           {" "}suspension requests

//         </p>

//       </div>

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Suspension Requests
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Protected account status changes requiring
//             administrative governance.
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
//                   Entity
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status Change
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Reason
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Requested By
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredSuspensions.map((item) => (
//                 <tr
//                   key={item.overrideId}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {item.overrideId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {item.entityId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(
//                         item.entityType
//                       )}`}
//                     >
//                       {item.entityType}
//                     </span>

//                     <p className="mt-2 text-sm font-semibold text-slate-800">
//                       {item.entityName}
//                     </p>

//                     {item.moduleId && (
//                       <p className="mt-1 text-xs font-semibold text-slate-400">
//                         {item.moduleId}
//                       </p>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-2">

//                       <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
//                         {item.currentStatus}
//                       </span>

//                       <span className="text-slate-400">
//                         →
//                       </span>

//                       <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
//                         {item.requestedStatus}
//                       </span>

//                     </div>

//                     {item.duration && (
//                       <p className="mt-2 text-xs text-slate-400">
//                         Duration:{" "}
//                         <span className="font-semibold text-slate-600">
//                           {item.duration}
//                         </span>
//                       </p>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-medium text-slate-700">
//                       {getReasonLabel(item.reason)}
//                     </p>

//                     <p className="mt-1 max-w-xs text-xs text-slate-400">
//                       {item.reasonText}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {item.requestedBy}
//                     </p>

//                     {item.approvedBy && (
//                       <p className="mt-1 text-xs text-slate-400">
//                         Approved:{" "}
//                         {item.approvedBy}
//                       </p>
//                     )}

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

//                     <div className="flex flex-wrap gap-3">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(item)
//                         }
//                         className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//                       >
//                         View
//                       </button>

//                       {item.status === "PENDING" && (
//                         <>
//                           <button
//                             type="button"
//                             onClick={() =>
//                               openAction(
//                                 item,
//                                 "APPROVE"
//                               )
//                             }
//                             className="text-sm font-semibold text-green-600 hover:text-green-700"
//                           >
//                             Approve
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() =>
//                               openAction(
//                                 item,
//                                 "REJECT"
//                               )
//                             }
//                             className="text-sm font-semibold text-red-600 hover:text-red-700"
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {item.status === "APPROVED" && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             openAction(
//                               item,
//                               "EXECUTE"
//                             )
//                           }
//                           className="text-sm font-semibold text-blue-600 hover:text-blue-700"
//                         >
//                           Execute
//                         </button>
//                       )}

//                     </div>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredSuspensions.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="space-y-4 md:hidden">

//         {filteredSuspensions.map((item) => (
//           <div
//             key={item.overrideId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {item.overrideId}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {item.entityId}
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

//             <div className="mt-4 flex flex-wrap gap-2">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(
//                   item.entityType
//                 )}`}
//               >
//                 {item.entityType}
//               </span>

//               {item.moduleId && (
//                 <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                   {item.moduleId}
//                 </span>
//               )}

//             </div>

//             <div className="mt-4">

//               <p className="text-xs text-slate-400">
//                 Entity
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 {item.entityName}
//               </p>

//             </div>

//             <div className="mt-4 flex items-center gap-2">

//               <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
//                 {item.currentStatus}
//               </span>

//               <span className="text-slate-400">
//                 →
//               </span>

//               <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
//                 {item.requestedStatus}
//               </span>

//             </div>

//             <div className="mt-4 rounded-xl bg-slate-50 p-4">

//               <p className="text-xs font-semibold text-slate-700">
//                 {getReasonLabel(item.reason)}
//               </p>

//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 {item.reasonText}
//               </p>

//             </div>

//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">

//               <MobileInfo
//                 label="Requested By"
//                 value={item.requestedBy}
//               />

//               <MobileInfo
//                 label="Duration"
//                 value={
//                   item.duration || "Not specified"
//                 }
//               />

//               <MobileInfo
//                 label="Created"
//                 value={item.createdAt}
//               />

//               <MobileInfo
//                 label="Updated"
//                 value={item.updatedAt}
//               />

//             </div>

//             <div className="mt-4 flex flex-wrap gap-2">

//               <button
//                 type="button"
//                 onClick={() =>
//                   openDetails(item)
//                 }
//                 className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 View
//               </button>

//               {item.status === "PENDING" && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={() =>
//                       openAction(
//                         item,
//                         "APPROVE"
//                       )
//                     }
//                     className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white"
//                   >
//                     Approve
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() =>
//                       openAction(
//                         item,
//                         "REJECT"
//                       )
//                     }
//                     className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white"
//                   >
//                     Reject
//                   </button>
//                 </>
//               )}

//               {item.status === "APPROVED" && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     openAction(
//                       item,
//                       "EXECUTE"
//                     )
//                   }
//                   className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white"
//                 >
//                   Execute
//                 </button>
//               )}

//             </div>

//           </div>
//         ))}

//         {filteredSuspensions.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">

//         <h2 className="text-sm font-bold text-red-900">
//           Suspension Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-red-800">
//           Suspension is a protected administrative
//           operation. The client must not independently
//           decide account eligibility or permanently change
//           authoritative status. Production suspension
//           requests must be validated by the trusted backend
//           and JUERP authorization scope before the account
//           status is changed.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="Authorization"
//             description="Only an authorized JUERP role should approve protected suspension actions."
//           />

//           <GovernanceCard
//             title="Validation"
//             description="Backend validates entity identity, current status, scope and reason."
//           />

//           <GovernanceCard
//             title="Status"
//             description="Authoritative account status must be changed through the trusted backend."
//           />

//           <GovernanceCard
//             title="Audit"
//             description="Protected actions should include correlationId, idempotencyKey and audit logging."
//           />

//         </div>

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedSuspension && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">

//               <div>

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedSuspension.overrideId}
//                   </h2>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedSuspension.status
//                     )}`}
//                   >
//                     {selectedSuspension.status}
//                   </span>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedSuspension.entityId}
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

//               {/* ENTITY */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Entity Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Entity ID"
//                     value={
//                       selectedSuspension.entityId
//                     }
//                   />

//                   <InfoItem
//                     label="Entity Type"
//                     value={
//                       selectedSuspension.entityType
//                     }
//                   />

//                   <InfoItem
//                     label="Entity Name"
//                     value={
//                       selectedSuspension.entityName
//                     }
//                   />

//                   <InfoItem
//                     label="Module"
//                     value={
//                       selectedSuspension.moduleId ||
//                       "Platform-wide"
//                     }
//                   />

//                 </div>

//               </div>

//               {/* STATUS */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Status Change
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

//                   <InfoItem
//                     label="Current Status"
//                     value={
//                       selectedSuspension.currentStatus
//                     }
//                   />

//                   <InfoItem
//                     label="Requested Status"
//                     value={
//                       selectedSuspension.requestedStatus
//                     }
//                   />

//                   <InfoItem
//                     label="Duration"
//                     value={
//                       selectedSuspension.duration ||
//                       "Not specified"
//                     }
//                   />

//                 </div>

//               </div>

//               {/* REASON */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Suspension Reason
//                 </h3>

//                 <div className="mt-4 rounded-xl bg-slate-50 p-4">

//                   <p className="text-sm font-bold text-slate-800">
//                     {getReasonLabel(
//                       selectedSuspension.reason
//                     )}
//                   </p>

//                   <p className="mt-2 text-sm leading-6 text-slate-600">
//                     {selectedSuspension.reasonText}
//                   </p>

//                 </div>

//               </div>

//               {/* AUTHORIZATION */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Authorization
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Requested By"
//                     value={
//                       selectedSuspension.requestedBy
//                     }
//                   />

//                   <InfoItem
//                     label="Approved By"
//                     value={
//                       selectedSuspension.approvedBy ||
//                       "Not approved"
//                     }
//                   />

//                 </div>

//               </div>

//               {/* TIMELINE */}

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Timeline
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Created At"
//                     value={
//                       selectedSuspension.createdAt
//                     }
//                   />

//                   <InfoItem
//                     label="Updated At"
//                     value={
//                       selectedSuspension.updatedAt
//                     }
//                   />

//                 </div>

//               </div>

//               <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//                 <p className="text-xs font-bold text-yellow-800">
//                   Production Safety
//                 </p>

//                 <p className="mt-2 text-xs leading-5 text-yellow-700">
//                   This page currently demonstrates the
//                   administrative UI using sample data.
//                   Production suspension execution must be
//                   performed through the trusted backend with
//                   authorization, validation, idempotency and
//                   audit logging.
//                 </p>

//               </div>

//               {/* ACTIONS */}

//               <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowDetails(false)
//                   }
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Close
//                 </button>

//                 {selectedSuspension.status ===
//                   "PENDING" && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowDetails(false);
//                         openAction(
//                           selectedSuspension,
//                           "REJECT"
//                         );
//                       }}
//                       className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
//                     >
//                       Reject
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowDetails(false);
//                         openAction(
//                           selectedSuspension,
//                           "APPROVE"
//                         );
//                       }}
//                       className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
//                     >
//                       Approve
//                     </button>
//                   </>
//                 )}

//                 {selectedSuspension.status ===
//                   "APPROVED" && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowDetails(false);
//                       openAction(
//                         selectedSuspension,
//                         "EXECUTE"
//                       );
//                     }}
//                     className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
//                   >
//                     Execute
//                   </button>
//                 )}

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* ACTION CONFIRMATION MODAL */}

//       {showActionModal &&
//         selectedSuspension &&
//         actionType && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">

//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//               <h2 className="text-lg font-bold text-slate-900">

//                 {actionType === "APPROVE" &&
//                   "Approve Suspension"}

//                 {actionType === "REJECT" &&
//                   "Reject Suspension"}

//                 {actionType === "EXECUTE" &&
//                   "Execute Suspension"}

//               </h2>

//               <p className="mt-2 text-sm leading-6 text-slate-500">

//                 You are about to{" "}

//                 <span className="font-semibold text-slate-800">
//                   {actionType.toLowerCase()}
//                 </span>

//                 {" "}suspension request{" "}

//                 <span className="font-semibold text-slate-800">
//                   {selectedSuspension.overrideId}
//                 </span>
//                 .

//               </p>

//               <div className="mt-5 rounded-xl bg-slate-50 p-4">

//                 <p className="text-xs text-slate-400">
//                   Entity
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-800">
//                   {selectedSuspension.entityName}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedSuspension.entityId}
//                 </p>

//                 <p className="mt-3 text-xs text-slate-400">
//                   Status Change
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-red-700">
//                   {selectedSuspension.currentStatus}
//                   {" → "}
//                   {selectedSuspension.requestedStatus}
//                 </p>

//                 <p className="mt-3 text-xs text-slate-400">
//                   Reason
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-800">
//                   {getReasonLabel(
//                     selectedSuspension.reason
//                   )}
//                 </p>

//               </div>

//               <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//                 <p className="text-xs leading-5 text-yellow-700">
//                   This demo changes local UI state only.
//                   Production execution must call a protected
//                   backend command. The browser must not be
//                   the authoritative source for account
//                   suspension.
//                 </p>

//               </div>

//               <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowActionModal(false);
//                     setActionType(null);
//                   }}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="button"
//                   onClick={executeAction}
//                   className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${
//                     actionType === "REJECT"
//                       ? "bg-red-600 hover:bg-red-700"
//                       : actionType === "APPROVE"
//                         ? "bg-green-600 hover:bg-green-700"
//                         : "bg-blue-600 hover:bg-blue-700"
//                   }`}
//                 >
//                   Confirm{" "}
//                   {actionType === "APPROVE"
//                     ? "Approval"
//                     : actionType === "REJECT"
//                       ? "Rejection"
//                       : "Execution"}
//                 </button>

//               </div>

//             </div>

//           </div>
//         )}

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

//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
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
//     <div className="rounded-xl border border-red-200 bg-white p-4">

//       <p className="text-xs font-bold text-red-800">
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
//         !
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No suspension requests found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

// "use client";

// import { useMemo, useState } from "react";
// import {
//   useOperationalOverrides,
//   type OverrideWorkflowStatus,
//   type SuspensionEntity,
//   type SuspensionOverride,
//   type SuspensionReason,
// } from "@/hooks/useOperationalOverrides";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: OverrideWorkflowStatus) {
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

// function getEntityClasses(entityType: SuspensionEntity) {
//   switch (entityType) {
//     case "CUSTOMER":
//       return "bg-purple-100 text-purple-700";
//     case "VENDOR":
//       return "bg-orange-100 text-orange-700";
//     case "CAPTAIN":
//       return "bg-blue-100 text-blue-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getReasonLabel(reason: SuspensionReason) {
//   switch (reason) {
//     case "POLICY_VIOLATION":
//       return "Policy Violation";
//     case "KYC_ISSUE":
//       return "KYC Issue";
//     case "FRAUD_SUSPECTED":
//       return "Fraud Suspected";
//     case "SAFETY_ISSUE":
//       return "Safety Issue";
//     case "PAYMENT_ISSUE":
//       return "Payment Issue";
//     case "SERVICE_ISSUE":
//       return "Service Issue";
//     case "ADMINISTRATIVE":
//       return "Administrative";
//     case "OTHER":
//       return "Other";
//     default:
//       return reason;
//   }
// }

// export default function SuspensionOverridesPage() {
//   const {
//     suspensionOverrides: suspensions,
//     loading,
//     error,
//     refresh,
//     updateSuspensionStatus,
//     isDemoMode,
//   } = useOperationalOverrides();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | OverrideWorkflowStatus>("ALL");
//   const [entityFilter, setEntityFilter] = useState<"ALL" | SuspensionEntity>("ALL");
//   const [moduleFilter, setModuleFilter] = useState("ALL");
//   const [selectedSuspension, setSelectedSuspension] = useState<SuspensionOverride | null>(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showActionModal, setShowActionModal] = useState(false);
//   const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | "EXECUTE" | null>(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [actionLoading, setActionLoading] = useState(false);

//   const filteredSuspensions = useMemo(() => {
//     const searchValue = search.trim().toLowerCase();
//     return suspensions.filter((item) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         item.overrideId.toLowerCase().includes(searchValue) ||
//         item.entityId.toLowerCase().includes(searchValue) ||
//         item.entityName.toLowerCase().includes(searchValue) ||
//         item.requestedBy.toLowerCase().includes(searchValue) ||
//         item.reasonText.toLowerCase().includes(searchValue);
//       const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
//       const matchesEntity = entityFilter === "ALL" || item.entityType === entityFilter;
//       const matchesModule = moduleFilter === "ALL" || item.moduleId === moduleFilter;
//       return matchesSearch && matchesStatus && matchesEntity && matchesModule;
//     });
//   }, [suspensions, search, statusFilter, entityFilter, moduleFilter]);

//   const summary = useMemo(
//     () => ({
//       total: suspensions.length,
//       pending: suspensions.filter((i) => i.status === "PENDING").length,
//       approved: suspensions.filter((i) => i.status === "APPROVED").length,
//       rejected: suspensions.filter((i) => i.status === "REJECTED").length,
//       executed: suspensions.filter((i) => i.status === "EXECUTED").length,
//       captains: suspensions.filter((i) => i.entityType === "CAPTAIN").length,
//       vendors: suspensions.filter((i) => i.entityType === "VENDOR").length,
//       customers: suspensions.filter((i) => i.entityType === "CUSTOMER").length,
//     }),
//     [suspensions]
//   );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setEntityFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openDetails(item: SuspensionOverride) {
//     setSelectedSuspension(item);
//     setShowDetails(true);
//   }

//   function openAction(
//     item: SuspensionOverride,
//     action: "APPROVE" | "REJECT" | "EXECUTE"
//   ) {
//     setSelectedSuspension(item);
//     setActionType(action);
//     setShowActionModal(true);
//   }

//   async function executeAction() {
//     if (!selectedSuspension || !actionType) return;

//     const newStatus: OverrideWorkflowStatus =
//       actionType === "APPROVE"
//         ? "APPROVED"
//         : actionType === "REJECT"
//           ? "REJECTED"
//           : "EXECUTED";

//     setActionLoading(true);
//     try {
//       await updateSuspensionStatus(
//         selectedSuspension.id,
//         newStatus,
//         actionType === "APPROVE" ? "CURRENT_ADMIN" : undefined
//       );
//       setSuccessMessage(
//         isDemoMode
//           ? "Demo mode: Firestore writes are disabled."
//           : `${selectedSuspension.overrideId} marked as ${newStatus}.`
//       );
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error ? err.message : "Unable to update suspension."
//       );
//     } finally {
//       setActionLoading(false);
//       setShowActionModal(false);
//       setSelectedSuspension(null);
//       setActionType(null);
//       setTimeout(() => setSuccessMessage(""), 4000);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6">
//         <div className="mb-3 flex items-center gap-2 text-sm">
//           <span className="text-slate-400">Overrides</span>
//           <span className="text-slate-400">/</span>
//           <span className="font-semibold text-slate-800">Suspensions</span>
//         </div>
//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//             <div className="flex items-center gap-3">
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
//                 !
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   Suspension Overrides
//                 </h1>
//                 <p className="mt-1 text-sm text-slate-500">
//                   Live Firestore review of customer, vendor and captain
//                   suspension requests.
//                 </p>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => void refresh()}
//                 disabled={loading}
//                 className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//               >
//                 {loading ? "Refreshing…" : "Refresh"}
//               </button>
//               <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
//                 <p className="text-xs font-bold text-red-800">Protected Operation</p>
//                 <p className="mt-1 text-xs text-red-700">
//                   Suspension decisions require authorization and audit logging.
//                 </p>
//               </div>
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
//         <SummaryCard title="Pending" value={summary.pending} />
//         <SummaryCard title="Approved" value={summary.approved} />
//         <SummaryCard title="Rejected" value={summary.rejected} />
//         <SummaryCard title="Executed" value={summary.executed} />
//         <SummaryCard title="Captains" value={summary.captains} />
//         <SummaryCard title="Vendors" value={summary.vendors} />
//         <SummaryCard title="Customers" value={summary.customers} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <h2 className="text-lg font-bold text-slate-900">Suspension Override Workflow</h2>
//         <p className="mt-1 text-xs text-slate-500">Protected administrative suspension workflow.</p>
//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
//           <WorkflowStep number="1" title="Request" description="Suspension request is submitted." />
//           <WorkflowStep number="2" title="Validate" description="Backend validates entity and authorization scope." />
//           <WorkflowStep number="3" title="Approve" description="Authorized admin reviews and approves." />
//           <WorkflowStep number="4" title="Execute" description="Trusted backend applies the suspension." />
//           <WorkflowStep number="5" title="Audit" description="Action and reason are recorded." />
//         </div>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
//           <div className="flex-1">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search</label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search override ID, entity, name or reason..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div className="w-full xl:w-48">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Status</label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | OverrideWorkflowStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="PENDING">Pending</option>
//               <option value="APPROVED">Approved</option>
//               <option value="REJECTED">Rejected</option>
//               <option value="EXECUTED">Executed</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-48">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Entity</label>
//             <select
//               value={entityFilter}
//               onChange={(e) =>
//                 setEntityFilter(e.target.value as "ALL" | SuspensionEntity)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Entities</option>
//               <option value="CUSTOMER">Customer</option>
//               <option value="VENDOR">Vendor</option>
//               <option value="CAPTAIN">Captain</option>
//             </select>
//           </div>
//           <div className="w-full xl:w-48">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Module</label>
//             <select
//               value={moduleFilter}
//               onChange={(e) => setModuleFilter(e.target.value)}
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Modules</option>
//               <option value="JUCART">JuCart</option>
//               <option value="JURIDE">JuRide</option>
//               <option value="JUSTAY">JuStay</option>
//               <option value="JUHOME">JuHome</option>
//               <option value="JUSHOPPING">JuShopping</option>
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
//           <span className="font-semibold text-slate-700">{filteredSuspensions.length}</span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">{suspensions.length}</span>{" "}
//           suspension requests
//           {loading ? " · Loading…" : ""}
//         </p>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Suspension Requests</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             From collection <code className="text-[10px]">suspension_overrides</code>
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Override</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Entity</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status Change</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Reason</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Requested By</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {filteredSuspensions.map((item) => (
//                 <tr key={item.id} className="hover:bg-slate-50">
//                   <td className="px-5 py-4">
//                     <p className="text-sm font-bold text-slate-900">{item.overrideId}</p>
//                     <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}>
//                       {item.entityType}
//                     </span>
//                     <p className="mt-2 text-sm font-semibold text-slate-800">{item.entityName}</p>
//                     {item.moduleId && (
//                       <p className="mt-1 text-xs font-semibold text-slate-400">{item.moduleId}</p>
//                     )}
//                   </td>
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
//                         {item.currentStatus}
//                       </span>
//                       <span className="text-slate-400">→</span>
//                       <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
//                         {item.requestedStatus}
//                       </span>
//                     </div>
//                     {item.duration && (
//                       <p className="mt-2 text-xs text-slate-400">
//                         Duration:{" "}
//                         <span className="font-semibold text-slate-600">{item.duration}</span>
//                       </p>
//                     )}
//                   </td>
//                   <td className="px-5 py-4">
//                     <p className="text-sm font-medium text-slate-700">{getReasonLabel(item.reason)}</p>
//                     <p className="mt-1 max-w-xs text-xs text-slate-400">{item.reasonText}</p>
//                   </td>
//                   <td className="px-5 py-4">
//                     <p className="text-sm font-semibold text-slate-800">{item.requestedBy}</p>
//                     {item.approvedBy && (
//                       <p className="mt-1 text-xs text-slate-400">Approved: {item.approvedBy}</p>
//                     )}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(item.status)}`}>
//                       {item.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4">
//                     <div className="flex flex-wrap gap-3">
//                       <button type="button" onClick={() => openDetails(item)} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
//                         View
//                       </button>
//                       {item.status === "PENDING" && (
//                         <>
//                           <button type="button" onClick={() => openAction(item, "APPROVE")} className="text-sm font-semibold text-green-600 hover:text-green-700">
//                             Approve
//                           </button>
//                           <button type="button" onClick={() => openAction(item, "REJECT")} className="text-sm font-semibold text-red-600 hover:text-red-700">
//                             Reject
//                           </button>
//                         </>
//                       )}
//                       {item.status === "APPROVED" && (
//                         <button type="button" onClick={() => openAction(item, "EXECUTE")} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
//                           Execute
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredSuspensions.length === 0 && <EmptyState />}
//         {loading && suspensions.length === 0 && (
//           <div className="px-6 py-12 text-center text-sm text-slate-500">
//             Loading suspensions from Firestore…
//           </div>
//         )}
//       </div>

//       <div className="space-y-4 md:hidden">
//         {filteredSuspensions.map((item) => (
//           <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <p className="text-sm font-bold text-slate-900">{item.overrideId}</p>
//                 <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
//               </div>
//               <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(item.status)}`}>
//                 {item.status}
//               </span>
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}>
//                 {item.entityType}
//               </span>
//               {item.moduleId && (
//                 <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                   {item.moduleId}
//                 </span>
//               )}
//             </div>
//             <div className="mt-4">
//               <p className="text-xs text-slate-400">Entity</p>
//               <p className="mt-1 text-sm font-semibold text-slate-800">{item.entityName}</p>
//             </div>
//             <div className="mt-4 flex items-center gap-2">
//               <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
//                 {item.currentStatus}
//               </span>
//               <span className="text-slate-400">→</span>
//               <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
//                 {item.requestedStatus}
//               </span>
//             </div>
//             <div className="mt-4 rounded-xl bg-slate-50 p-4">
//               <p className="text-xs font-semibold text-slate-700">{getReasonLabel(item.reason)}</p>
//               <p className="mt-1 text-xs leading-5 text-slate-500">{item.reasonText}</p>
//             </div>
//             <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
//               <MobileInfo label="Requested By" value={item.requestedBy} />
//               <MobileInfo label="Duration" value={item.duration || "Not specified"} />
//               <MobileInfo label="Created" value={item.createdAt} />
//               <MobileInfo label="Updated" value={item.updatedAt} />
//             </div>
//             <div className="mt-4 flex flex-wrap gap-2">
//               <button type="button" onClick={() => openDetails(item)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700">
//                 View
//               </button>
//               {item.status === "PENDING" && (
//                 <>
//                   <button type="button" onClick={() => openAction(item, "APPROVE")} className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white">
//                     Approve
//                   </button>
//                   <button type="button" onClick={() => openAction(item, "REJECT")} className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white">
//                     Reject
//                   </button>
//                 </>
//               )}
//               {item.status === "APPROVED" && (
//                 <button type="button" onClick={() => openAction(item, "EXECUTE")} className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">
//                   Execute
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//         {!loading && filteredSuspensions.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
//         <h2 className="text-sm font-bold text-red-900">Suspension Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-red-800">
//           Status updates write to Firestore for governance tracking. Authoritative
//           account suspension must still be applied by the trusted backend.
//         </p>
//       </div>

//       {showDetails && selectedSuspension && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
//               <div>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-xl font-bold text-slate-900">{selectedSuspension.overrideId}</h2>
//                   <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(selectedSuspension.status)}`}>
//                     {selectedSuspension.status}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-xs text-slate-400">{selectedSuspension.entityId}</p>
//               </div>
//               <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400 hover:text-slate-700">
//                 ×
//               </button>
//             </div>
//             <div className="space-y-6 p-5 md:p-6">
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Entity Information</h3>
//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <InfoItem label="Entity ID" value={selectedSuspension.entityId} />
//                   <InfoItem label="Entity Type" value={selectedSuspension.entityType} />
//                   <InfoItem label="Entity Name" value={selectedSuspension.entityName} />
//                   <InfoItem label="Module" value={selectedSuspension.moduleId || "Platform-wide"} />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Status Change</h3>
//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
//                   <InfoItem label="Current Status" value={selectedSuspension.currentStatus} />
//                   <InfoItem label="Requested Status" value={selectedSuspension.requestedStatus} />
//                   <InfoItem label="Duration" value={selectedSuspension.duration || "Not specified"} />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Suspension Reason</h3>
//                 <div className="mt-4 rounded-xl bg-slate-50 p-4">
//                   <p className="text-sm font-bold text-slate-800">{getReasonLabel(selectedSuspension.reason)}</p>
//                   <p className="mt-2 text-sm leading-6 text-slate-600">{selectedSuspension.reasonText}</p>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Authorization</h3>
//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <InfoItem label="Requested By" value={selectedSuspension.requestedBy} />
//                   <InfoItem label="Approved By" value={selectedSuspension.approvedBy || "Not approved"} />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-sm font-bold text-slate-900">Timeline</h3>
//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <InfoItem label="Created At" value={selectedSuspension.createdAt} />
//                   <InfoItem label="Updated At" value={selectedSuspension.updatedAt} />
//                 </div>
//               </div>
//               <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
//                 <button type="button" onClick={() => setShowDetails(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
//                   Close
//                 </button>
//                 {selectedSuspension.status === "PENDING" && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowDetails(false);
//                         openAction(selectedSuspension, "REJECT");
//                       }}
//                       className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
//                     >
//                       Reject
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowDetails(false);
//                         openAction(selectedSuspension, "APPROVE");
//                       }}
//                       className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
//                     >
//                       Approve
//                     </button>
//                   </>
//                 )}
//                 {selectedSuspension.status === "APPROVED" && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowDetails(false);
//                       openAction(selectedSuspension, "EXECUTE");
//                     }}
//                     className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
//                   >
//                     Execute
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {showActionModal && selectedSuspension && actionType && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold text-slate-900">
//               {actionType === "APPROVE" && "Approve Suspension"}
//               {actionType === "REJECT" && "Reject Suspension"}
//               {actionType === "EXECUTE" && "Execute Suspension"}
//             </h2>
//             <p className="mt-2 text-sm leading-6 text-slate-500">
//               You are about to {actionType.toLowerCase()} suspension request{" "}
//               <span className="font-semibold text-slate-800">{selectedSuspension.overrideId}</span>.
//             </p>
//             <div className="mt-5 rounded-xl bg-slate-50 p-4">
//               <p className="text-xs text-slate-400">Entity</p>
//               <p className="mt-1 text-sm font-semibold text-slate-800">{selectedSuspension.entityName}</p>
//               <p className="mt-1 text-xs text-slate-400">{selectedSuspension.entityId}</p>
//               <p className="mt-3 text-xs text-slate-400">Status Change</p>
//               <p className="mt-1 text-sm font-semibold text-red-700">
//                 {selectedSuspension.currentStatus} → {selectedSuspension.requestedStatus}
//               </p>
//               <p className="mt-3 text-xs text-slate-400">Reason</p>
//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 {getReasonLabel(selectedSuspension.reason)}
//               </p>
//             </div>
//             <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
//               <p className="text-xs leading-5 text-yellow-700">
//                 This updates Firestore status only. Authoritative account suspension
//                 must run through the trusted backend.
//               </p>
//             </div>
//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 disabled={actionLoading}
//                 onClick={() => {
//                   setShowActionModal(false);
//                   setActionType(null);
//                 }}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 disabled={actionLoading}
//                 onClick={() => void executeAction()}
//                 className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
//                   actionType === "REJECT"
//                     ? "bg-red-600 hover:bg-red-700"
//                     : actionType === "APPROVE"
//                       ? "bg-green-600 hover:bg-green-700"
//                       : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {actionLoading
//                   ? "Saving…"
//                   : `Confirm ${
//                       actionType === "APPROVE"
//                         ? "Approval"
//                         : actionType === "REJECT"
//                           ? "Rejection"
//                           : "Execution"
//                     }`}
//               </button>
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
//       <p className="mt-2 text-lg font-bold text-slate-900">{formatNumber(value)}</p>
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
//         <p className="text-sm font-bold text-slate-800">{title}</p>
//       </div>
//       <p className="mt-3 text-xs leading-5 text-slate-500">{description}</p>
//     </div>
//   );
// }

// function MobileInfo({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-3">
//       <p className="text-[10px] font-medium text-slate-400">{label}</p>
//       <p className="mt-1 break-words text-xs font-bold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">
//       <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">
//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         !
//       </div>
//       <p className="mt-3 text-sm font-bold text-slate-800">No suspension requests found</p>
//       <p className="mt-1 text-xs text-slate-500">
//         Empty <code className="text-[10px]">suspension_overrides</code> or filters too narrow.
//       </p>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useOperationalOverrides,
  type OverrideWorkflowStatus,
  type SuspensionEntity,
  type SuspensionOverride,
  type SuspensionReason,
} from "@/hooks/useOperationalOverrides";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

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

function getEntityClasses(entityType: SuspensionEntity) {
  switch (String(entityType).toUpperCase()) {
    case "CUSTOMER":
      return "bg-blue-100 text-blue-700";
    case "VENDOR":
      return "bg-orange-100 text-orange-700";
    case "CAPTAIN":
      return "bg-green-100 text-green-700";
    case "ACCOUNT":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getReasonLabel(reason: SuspensionReason) {
  switch (String(reason).toUpperCase()) {
    case "FRAUD":
      return "Fraud";
    case "POLICY_VIOLATION":
      return "Policy Violation";
    case "NON_PAYMENT":
      return "Non Payment";
    case "ABUSE":
      return "Abuse";
    case "KYC_FAILURE":
      return "KYC Failure";
    case "OTHER":
      return "Other";
    default:
      return String(reason);
  }
}

export default function SuspensionOverridesPage() {
  const {
    suspensionOverrides: overrides,
    loading,
    error,
    refresh,
    updateSuspensionStatus,
    isDemoMode,
  } = useOperationalOverrides();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | OverrideWorkflowStatus
  >("ALL");
  const [entityFilter, setEntityFilter] = useState<"ALL" | SuspensionEntity>(
    "ALL"
  );
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [selectedOverride, setSelectedOverride] =
    useState<SuspensionOverride | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<
    "APPROVE" | "REJECT" | "EXECUTE" | null
  >(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredOverrides = useMemo(() => {
    const q = search.trim().toLowerCase();
    return overrides.filter((item) => {
      const matchesSearch =
        q.length === 0 ||
        item.overrideId.toLowerCase().includes(q) ||
        item.entityId.toLowerCase().includes(q) ||
        item.entityName.toLowerCase().includes(q) ||
        item.requestedBy.toLowerCase().includes(q) ||
        item.reasonText.toLowerCase().includes(q);

      const matchesStatus =
        statusFilter === "ALL" || item.status === statusFilter;
      const matchesEntity =
        entityFilter === "ALL" ||
        String(item.entityType).toUpperCase() ===
          String(entityFilter).toUpperCase();
      const matchesModule =
        moduleFilter === "ALL" || item.moduleId === moduleFilter;

      return matchesSearch && matchesStatus && matchesEntity && matchesModule;
    });
  }, [overrides, search, statusFilter, entityFilter, moduleFilter]);

  const summary = useMemo(
    () => ({
      total: overrides.length,
      pending: overrides.filter((i) => i.status === "PENDING").length,
      approved: overrides.filter((i) => i.status === "APPROVED").length,
      rejected: overrides.filter((i) => i.status === "REJECTED").length,
      executed: overrides.filter((i) => i.status === "EXECUTED").length,
      vendors: overrides.filter(
        (i) => String(i.entityType).toUpperCase() === "VENDOR"
      ).length,
      captains: overrides.filter(
        (i) => String(i.entityType).toUpperCase() === "CAPTAIN"
      ).length,
      customers: overrides.filter(
        (i) => String(i.entityType).toUpperCase() === "CUSTOMER"
      ).length,
    }),
    [overrides]
  );

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setEntityFilter("ALL");
    setModuleFilter("ALL");
  }

  function openDetails(item: SuspensionOverride) {
    setSelectedOverride(item);
    setShowDetails(true);
  }

  function openAction(
    item: SuspensionOverride,
    action: "APPROVE" | "REJECT" | "EXECUTE"
  ) {
    setSelectedOverride(item);
    setActionType(action);
    setShowActionModal(true);
  }

  async function executeAction() {
    if (!selectedOverride || !actionType) return;

    const newStatus: OverrideWorkflowStatus =
      actionType === "APPROVE"
        ? "APPROVED"
        : actionType === "REJECT"
          ? "REJECTED"
          : "EXECUTED";

    setActionLoading(true);
    try {
      await updateSuspensionStatus(
        selectedOverride.id,
        newStatus,
        actionType === "APPROVE" ? "CURRENT_ADMIN" : undefined
      );
      setSuccessMessage(
        isDemoMode
          ? "Demo mode: Firestore writes are disabled."
          : `${selectedOverride.overrideId} marked as ${newStatus}.`
      );
    } catch (err) {
      setSuccessMessage(
        err instanceof Error ? err.message : "Unable to update suspension."
      );
    } finally {
      setActionLoading(false);
      setShowActionModal(false);
      setSelectedOverride(null);
      setActionType(null);
      setTimeout(() => setSuccessMessage(""), 4000);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-2 text-sm">
          <Link
            href="/overrides"
            className="text-slate-400 hover:text-orange-600"
          >
            Overrides
          </Link>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-800">Suspensions</span>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600">
                !
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Suspension Overrides
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live Firestore review of customer, vendor and captain
                  suspension exceptions.
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
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-xs font-bold text-red-800">
                  Suspension Governance
                </p>
                <p className="mt-1 text-xs text-red-700">
                  Status writes to Firestore only. Account lock must run on the
                  trusted backend.
                </p>
              </div>
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
        <SummaryCard title="Pending" value={summary.pending} />
        <SummaryCard title="Approved" value={summary.approved} />
        <SummaryCard title="Rejected" value={summary.rejected} />
        <SummaryCard title="Executed" value={summary.executed} />
        <SummaryCard title="Vendors" value={summary.vendors} />
        <SummaryCard title="Captains" value={summary.captains} />
        <SummaryCard title="Customers" value={summary.customers} />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Suspension Override Workflow
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Privileged account restriction flow.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          <WorkflowStep
            number="1"
            title="Request"
            description="Suspension exception is submitted."
          />
          <WorkflowStep
            number="2"
            title="Validate"
            description="Backend checks entity and eligibility."
          />
          <WorkflowStep
            number="3"
            title="Approve"
            description="Authorized admin approves or rejects."
          />
          <WorkflowStep
            number="4"
            title="Execute"
            description="Trusted service applies account state."
          />
          <WorkflowStep
            number="5"
            title="Audit"
            description="Action is recorded for governance."
          />
        </div>
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
              placeholder="Override ID, entity, name, reason..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value as "ALL" | OverrideWorkflowStatus
                )
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
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Entity
            </label>
            <select
              value={entityFilter}
              onChange={(e) =>
                setEntityFilter(e.target.value as "ALL" | SuspensionEntity)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Entities</option>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="CAPTAIN">Captain</option>
              <option value="ACCOUNT">Account</option>
            </select>
          </div>
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Module
            </label>
            <select
              value={moduleFilter}
              onChange={(e) => setModuleFilter(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Modules</option>
              <option value="JUCART">JuCart</option>
              <option value="JURIDE">JuRide</option>
              <option value="JUSTAY">JuStay</option>
              <option value="JUHOME">JuHome</option>
              <option value="JUSHOPPING">JuShopping</option>
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
            {filteredOverrides.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{overrides.length}</span>{" "}
          suspension requests
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            Suspension Override Requests
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Collection <code className="text-[10px]">suspension_overrides</code>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Override
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Entity
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Name
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Transition
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Reason
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Duration
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOverrides.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {item.overrideId}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}
                    >
                      {item.entityType}
                    </span>
                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      {item.moduleId}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.entityName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.requestedBy}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-600">
                    {item.currentStatus} → {item.requestedStatus}
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">
                      {getReasonLabel(item.reason)}
                    </p>
                    <p className="mt-1 max-w-xs text-xs text-slate-400">
                      {item.reasonText}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-600">
                    {item.durationLabel}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openDetails(item)}
                        className="text-sm font-semibold text-orange-600 hover:text-orange-700"
                      >
                        View
                      </button>
                      {item.status === "PENDING" && (
                        <>
                          <button
                            type="button"
                            onClick={() => openAction(item, "APPROVE")}
                            className="text-sm font-semibold text-green-600"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => openAction(item, "REJECT")}
                            className="text-sm font-semibold text-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {item.status === "APPROVED" && (
                        <button
                          type="button"
                          onClick={() => openAction(item, "EXECUTE")}
                          className="text-sm font-semibold text-blue-600"
                        >
                          Execute
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredOverrides.length === 0 && <EmptyState />}
        {loading && overrides.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading suspensions from Firestore…
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="space-y-4 md:hidden">
        {filteredOverrides.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {item.overrideId}
                </p>
                <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(item.status)}`}
              >
                {item.status}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}
              >
                {item.entityType}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {item.moduleId}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-800">
              {item.entityName}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {getReasonLabel(item.reason)} · {item.durationLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => openDetails(item)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold"
              >
                View
              </button>
              {item.status === "PENDING" && (
                <>
                  <button
                    type="button"
                    onClick={() => openAction(item, "APPROVE")}
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => openAction(item, "REJECT")}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Reject
                  </button>
                </>
              )}
              {item.status === "APPROVED" && (
                <button
                  type="button"
                  onClick={() => openAction(item, "EXECUTE")}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  Execute
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-sm font-bold text-red-900">
          Suspension Override Governance
        </h2>
        <p className="mt-2 text-xs leading-6 text-red-800">
          Approve/Reject/Execute only update the override document status.
          Blocking login, store status, or captain availability must be done by
          the trusted backend after EXECUTED.
        </p>
      </div>

      {/* Details modal */}
      {showDetails && selectedOverride && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedOverride.overrideId}
                  </h2>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(selectedOverride.status)}`}
                  >
                    {selectedOverride.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">
                  {selectedOverride.entityId}
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
            <div className="space-y-6 p-5 md:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem label="Entity Type" value={selectedOverride.entityType} />
                <InfoItem label="Entity Name" value={selectedOverride.entityName} />
                <InfoItem label="Entity ID" value={selectedOverride.entityId} />
                <InfoItem label="Module" value={selectedOverride.moduleId} />
                <InfoItem
                  label="Current Status"
                  value={selectedOverride.currentStatus}
                />
                <InfoItem
                  label="Requested Status"
                  value={selectedOverride.requestedStatus}
                />
                <InfoItem
                  label="Duration"
                  value={selectedOverride.durationLabel}
                />
                <InfoItem
                  label="Requested By"
                  value={selectedOverride.requestedBy}
                />
                <InfoItem
                  label="Approved By"
                  value={selectedOverride.approvedBy || "Not approved"}
                />
                <InfoItem label="Created" value={selectedOverride.createdAt} />
                <InfoItem label="Updated" value={selectedOverride.updatedAt} />
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-800">
                  {getReasonLabel(selectedOverride.reason)}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  {selectedOverride.reasonText}
                </p>
              </div>
              <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowDetails(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
                >
                  Close
                </button>
                {selectedOverride.status === "PENDING" && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDetails(false);
                        openAction(selectedOverride, "REJECT");
                      }}
                      className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowDetails(false);
                        openAction(selectedOverride, "APPROVE");
                      }}
                      className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
                    >
                      Approve
                    </button>
                  </>
                )}
                {selectedOverride.status === "APPROVED" && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowDetails(false);
                      openAction(selectedOverride, "EXECUTE");
                    }}
                    className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Execute
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action modal */}
      {showActionModal && selectedOverride && actionType && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              {actionType === "APPROVE" && "Approve Suspension"}
              {actionType === "REJECT" && "Reject Suspension"}
              {actionType === "EXECUTE" && "Execute Suspension"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              You are about to {actionType.toLowerCase()}{" "}
              <span className="font-semibold text-slate-800">
                {selectedOverride.overrideId}
              </span>
              .
            </p>
            <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm">
              <p className="text-xs text-slate-400">Entity</p>
              <p className="mt-1 font-semibold">
                {selectedOverride.entityName} ({selectedOverride.entityType})
              </p>
              <p className="mt-3 text-xs text-slate-400">Transition</p>
              <p className="mt-1 font-semibold">
                {selectedOverride.currentStatus} →{" "}
                {selectedOverride.requestedStatus}
              </p>
            </div>
            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-xs text-yellow-700">
              This updates Firestore status only. Actual account suspension must
              be applied by the trusted backend.
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => {
                  setShowActionModal(false);
                  setActionType(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => void executeAction()}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
                  actionType === "REJECT"
                    ? "bg-red-600"
                    : actionType === "APPROVE"
                      ? "bg-green-600"
                      : "bg-blue-600"
                }`}
              >
                {actionLoading ? "Saving…" : `Confirm ${actionType}`}
              </button>
            </div>
          </div>
        </div>
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        !
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">
        No suspension requests found
      </p>
      <p className="mt-1 text-xs text-slate-500">
        Empty <code className="text-[10px]">suspension_overrides</code> or
        filters too narrow.
      </p>
    </div>
  );
}