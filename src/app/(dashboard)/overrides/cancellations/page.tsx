// "use client";

// import { useMemo, useState } from "react";

// type CancellationStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// type CancellationEntity =
//   | "ORDER"
//   | "BOOKING"
//   | "RIDE"
//   | "DELIVERY";

// type OverrideReason =
//   | "CUSTOMER_REQUEST"
//   | "VENDOR_REQUEST"
//   | "CAPTAIN_ISSUE"
//   | "SYSTEM_ISSUE"
//   | "SERVICE_UNAVAILABLE"
//   | "PAYMENT_ISSUE"
//   | "OTHER";

// type CancellationOverride = {
//   overrideId: string;
//   entityId: string;
//   entityType: CancellationEntity;
//   customerId: string;
//   customerName: string;
//   vendorId?: string;
//   vendorName?: string;
//   moduleId: string;
//   currentStatus: string;
//   requestedStatus: string;
//   reason: OverrideReason;
//   reasonText: string;
//   refundRequired: boolean;
//   refundAmountPaise: number;
//   requestedBy: string;
//   approvedBy?: string;
//   status: CancellationStatus;
//   createdAt: string;
//   updatedAt: string;
// };

// const INITIAL_OVERRIDES: CancellationOverride[] = [
//   {
//     overrideId: "CAN-OVR-1001",
//     entityId: "ORD-100245",
//     entityType: "ORDER",
//     customerId: "CUS-1001",
//     customerName: "Rahul Kumar",
//     vendorId: "VEN-2001",
//     vendorName: "Fresh Food Corner",
//     moduleId: "JUCART",
//     currentStatus: "PREPARING",
//     requestedStatus: "CANCELLED",
//     reason: "CUSTOMER_REQUEST",
//     reasonText:
//       "Customer requested cancellation before dispatch.",
//     refundRequired: true,
//     refundAmountPaise: 48500,
//     requestedBy: "STATE_ADMIN",
//     approvedBy: "SUPER_ADMIN",
//     status: "EXECUTED",
//     createdAt: "05 Oct 2026, 09:15 AM",
//     updatedAt: "05 Oct 2026, 09:42 AM",
//   },
//   {
//     overrideId: "CAN-OVR-1002",
//     entityId: "BOOK-30215",
//     entityType: "BOOKING",
//     customerId: "CUS-1022",
//     customerName: "Priya Sharma",
//     vendorId: "VEN-3042",
//     vendorName: "Green Valley Resort",
//     moduleId: "JUSTAY",
//     currentStatus: "CONFIRMED",
//     requestedStatus: "CANCELLED",
//     reason: "SERVICE_UNAVAILABLE",
//     reasonText:
//       "Property reported that the selected room is unavailable.",
//     refundRequired: true,
//     refundAmountPaise: 725000,
//     requestedBy: "DISTRICT_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 10:20 AM",
//     updatedAt: "05 Oct 2026, 10:20 AM",
//   },
//   {
//     overrideId: "CAN-OVR-1003",
//     entityId: "RIDE-77881",
//     entityType: "RIDE",
//     customerId: "CUS-1045",
//     customerName: "Anjali Reddy",
//     moduleId: "JURIDE",
//     currentStatus: "ASSIGNED",
//     requestedStatus: "CANCELLED",
//     reason: "CAPTAIN_ISSUE",
//     reasonText:
//       "Captain was unable to reach the pickup location.",
//     refundRequired: false,
//     refundAmountPaise: 0,
//     requestedBy: "TECHNICAL_ADMIN",
//     approvedBy: "STATE_ADMIN",
//     status: "APPROVED",
//     createdAt: "05 Oct 2026, 11:05 AM",
//     updatedAt: "05 Oct 2026, 11:18 AM",
//   },
//   {
//     overrideId: "CAN-OVR-1004",
//     entityId: "ORD-100267",
//     entityType: "ORDER",
//     customerId: "CUS-1068",
//     customerName: "Suresh Rao",
//     vendorId: "VEN-2055",
//     vendorName: "Daily Mart",
//     moduleId: "JUCART",
//     currentStatus: "ACCEPTED",
//     requestedStatus: "CANCELLED",
//     reason: "PAYMENT_ISSUE",
//     reasonText:
//       "Payment status requires cancellation review.",
//     refundRequired: true,
//     refundAmountPaise: 120000,
//     requestedBy: "TECHNICAL_ADMIN",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 11:45 AM",
//     updatedAt: "05 Oct 2026, 11:45 AM",
//   },
//   {
//     overrideId: "CAN-OVR-1005",
//     entityId: "DEL-55021",
//     entityType: "DELIVERY",
//     customerId: "CUS-1088",
//     customerName: "Kavya Singh",
//     vendorId: "VEN-2108",
//     vendorName: "Health Plus Pharmacy",
//     moduleId: "JUCART",
//     currentStatus: "OUT_FOR_DELIVERY",
//     requestedStatus: "CANCELLED",
//     reason: "SYSTEM_ISSUE",
//     reasonText:
//       "Dispatch service experienced a technical failure.",
//     refundRequired: true,
//     refundAmountPaise: 29900,
//     requestedBy: "SUPER_ADMIN",
//     status: "REJECTED",
//     createdAt: "04 Oct 2026, 04:10 PM",
//     updatedAt: "04 Oct 2026, 05:02 PM",
//   },
//   {
//     overrideId: "CAN-OVR-1006",
//     entityId: "ORD-100289",
//     entityType: "ORDER",
//     customerId: "CUS-1102",
//     customerName: "Vikram Patel",
//     vendorId: "VEN-2204",
//     vendorName: "Home Essentials",
//     moduleId: "JUSHOPPING",
//     currentStatus: "PAID",
//     requestedStatus: "CANCELLED",
//     reason: "VENDOR_REQUEST",
//     reasonText:
//       "Vendor requested cancellation due to stock issue.",
//     refundRequired: true,
//     refundAmountPaise: 159900,
//     requestedBy: "VENDOR_OWNER",
//     status: "PENDING",
//     createdAt: "05 Oct 2026, 01:25 PM",
//     updatedAt: "05 Oct 2026, 01:25 PM",
//   },
// ];

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getStatusClasses(status: CancellationStatus) {
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

// function getEntityClasses(entityType: CancellationEntity) {
//   switch (entityType) {
//     case "ORDER":
//       return "bg-orange-100 text-orange-700";

//     case "BOOKING":
//       return "bg-purple-100 text-purple-700";

//     case "RIDE":
//       return "bg-blue-100 text-blue-700";

//     case "DELIVERY":
//       return "bg-green-100 text-green-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getReasonLabel(reason: OverrideReason) {
//   switch (reason) {
//     case "CUSTOMER_REQUEST":
//       return "Customer Request";

//     case "VENDOR_REQUEST":
//       return "Vendor Request";

//     case "CAPTAIN_ISSUE":
//       return "Captain Issue";

//     case "SYSTEM_ISSUE":
//       return "System Issue";

//     case "SERVICE_UNAVAILABLE":
//       return "Service Unavailable";

//     case "PAYMENT_ISSUE":
//       return "Payment Issue";

//     case "OTHER":
//       return "Other";

//     default:
//       return reason;
//   }
// }

// export default function CancellationOverridesPage() {
//   const [overrides, setOverrides] =
//     useState<CancellationOverride[]>(
//       INITIAL_OVERRIDES
//     );

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | CancellationStatus>("ALL");

//   const [entityFilter, setEntityFilter] =
//     useState<"ALL" | CancellationEntity>("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState("ALL");

//   const [selectedOverride, setSelectedOverride] =
//     useState<CancellationOverride | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [showActionModal, setShowActionModal] =
//     useState(false);

//   const [actionType, setActionType] =
//     useState<"APPROVE" | "REJECT" | "EXECUTE" | null>(
//       null
//     );

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredOverrides = useMemo(() => {
//     const searchValue =
//       search.trim().toLowerCase();

//     return overrides.filter((item) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         item.overrideId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.entityId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.customerName
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.customerId
//           .toLowerCase()
//           .includes(searchValue) ||
//         item.vendorName
//           ?.toLowerCase()
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
//     overrides,
//     search,
//     statusFilter,
//     entityFilter,
//     moduleFilter,
//   ]);

//   const summary = useMemo(() => {
//     const pending = overrides.filter(
//       (item) => item.status === "PENDING"
//     );

//     const approved = overrides.filter(
//       (item) => item.status === "APPROVED"
//     );

//     const rejected = overrides.filter(
//       (item) => item.status === "REJECTED"
//     );

//     const executed = overrides.filter(
//       (item) => item.status === "EXECUTED"
//     );

//     const refundTotal = overrides
//       .filter((item) => item.refundRequired)
//       .reduce(
//         (sum, item) =>
//           sum + item.refundAmountPaise,
//         0
//       );

//     return {
//       total: overrides.length,
//       pending: pending.length,
//       approved: approved.length,
//       rejected: rejected.length,
//       executed: executed.length,
//       refundTotal,
//     };
//   }, [overrides]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setEntityFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openDetails(
//     item: CancellationOverride
//   ) {
//     setSelectedOverride(item);
//     setShowDetails(true);
//   }

//   function openAction(
//     item: CancellationOverride,
//     action: "APPROVE" | "REJECT" | "EXECUTE"
//   ) {
//     setSelectedOverride(item);
//     setActionType(action);
//     setShowActionModal(true);
//   }

//   function executeAction() {
//     if (!selectedOverride || !actionType) {
//       return;
//     }

//     let newStatus: CancellationStatus;

//     if (actionType === "APPROVE") {
//       newStatus = "APPROVED";
//     } else if (actionType === "REJECT") {
//       newStatus = "REJECTED";
//     } else {
//       newStatus = "EXECUTED";
//     }

//     setOverrides((current) =>
//       current.map((item) =>
//         item.overrideId ===
//         selectedOverride.overrideId
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
//       `${selectedOverride.overrideId} marked as ${newStatus}. This is currently a UI-only action.`
//     );

//     setSelectedOverride(null);
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
//             Cancellations
//           </span>

//         </div>

//         <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">

//           <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//             <div>

//               <div className="flex items-center gap-3">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
//                   ×
//                 </div>

//                 <div>

//                   <h1 className="text-2xl font-bold text-slate-900">
//                     Cancellation Overrides
//                   </h1>

//                   <p className="mt-1 text-sm text-slate-500">
//                     Review and govern exceptional
//                     cancellation requests.
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

//               <p className="text-xs font-bold text-orange-800">
//                 Governance Required
//               </p>

//               <p className="mt-1 text-xs text-orange-700">
//                 Protected cancellation actions require
//                 authorized backend execution.
//               </p>

//             </div>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

//         <SummaryCard
//           title="Total Requests"
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

//         <div className="rounded-2xl bg-white p-4 shadow-sm">

//           <p className="text-[11px] font-medium text-slate-500">
//             Refund Exposure
//           </p>

//           <p className="mt-2 text-lg font-bold text-slate-900">
//             {formatCurrency(
//               summary.refundTotal
//             )}
//           </p>

//         </div>

//       </div>

//       {/* WORKFLOW */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <h2 className="text-lg font-bold text-slate-900">
//           Cancellation Override Workflow
//         </h2>

//         <p className="mt-1 text-xs text-slate-500">
//           Administrative exception flow.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">

//           <WorkflowStep
//             number="1"
//             title="Request"
//             description="Cancellation exception is submitted."
//           />

//           <WorkflowStep
//             number="2"
//             title="Review"
//             description="Authorized admin reviews the request."
//           />

//           <WorkflowStep
//             number="3"
//             title="Approve"
//             description="Eligible override is approved."
//           />

//           <WorkflowStep
//             number="4"
//             title="Execute"
//             description="Trusted backend applies the transition."
//           />

//           <WorkflowStep
//             number="5"
//             title="Audit"
//             description="Action is recorded for governance."
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
//               placeholder="Search override ID, entity, customer or vendor..."
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
//                     | CancellationStatus
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
//                     | CancellationEntity
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Entities
//               </option>

//               <option value="ORDER">
//                 Order
//               </option>

//               <option value="BOOKING">
//                 Booking
//               </option>

//               <option value="RIDE">
//                 Ride
//               </option>

//               <option value="DELIVERY">
//                 Delivery
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
//             {filteredOverrides.length}
//           </span>{" "}
//           of{" "}
//           <span className="font-semibold text-slate-700">
//             {overrides.length}
//           </span>{" "}
//           cancellation requests
//         </p>

//       </div>

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Cancellation Override Requests
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative exception requests requiring
//             governance review.
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
//                   Customer
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Module
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Reason
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Refund
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

//               {filteredOverrides.map((item) => (
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

//                     <p className="mt-2 text-xs text-slate-500">
//                       {item.currentStatus} →{" "}
//                       {item.requestedStatus}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {item.customerName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {item.customerId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
//                       {item.moduleId}
//                     </span>

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

//                     {item.refundRequired ? (
//                       <>
//                         <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
//                           Required
//                         </span>

//                         <p className="mt-2 text-xs font-semibold text-slate-700">
//                           {formatCurrency(
//                             item.refundAmountPaise
//                           )}
//                         </p>
//                       </>
//                     ) : (
//                       <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                         No Refund
//                       </span>
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

//                       {item.status ===
//                         "PENDING" && (
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

//                       {item.status ===
//                         "APPROVED" && (
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

//         {filteredOverrides.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="space-y-4 md:hidden">

//         {filteredOverrides.map((item) => (
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

//               <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                 {item.moduleId}
//               </span>

//             </div>

//             <div className="mt-4">

//               <p className="text-xs text-slate-400">
//                 Customer
//               </p>

//               <p className="mt-1 text-sm font-semibold text-slate-800">
//                 {item.customerName}
//               </p>

//               <p className="mt-1 text-xs text-slate-400">
//                 {item.customerId}
//               </p>

//             </div>

//             <div className="mt-4 rounded-xl bg-slate-50 p-4">

//               <p className="text-xs font-semibold text-slate-700">
//                 {getReasonLabel(item.reason)}
//               </p>

//               <p className="mt-1 text-xs leading-5 text-slate-500">
//                 {item.reasonText}
//               </p>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileInfo
//                 label="Current"
//                 value={item.currentStatus}
//               />

//               <MobileInfo
//                 label="Requested"
//                 value={item.requestedStatus}
//               />

//               <MobileInfo
//                 label="Refund"
//                 value={
//                   item.refundRequired
//                     ? formatCurrency(
//                         item.refundAmountPaise
//                       )
//                     : "No Refund"
//                 }
//               />

//               <MobileInfo
//                 label="Requested By"
//                 value={item.requestedBy}
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

//         {filteredOverrides.length === 0 && (
//           <div className="rounded-2xl bg-white shadow-sm">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-900">
//           Cancellation Override Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-800">
//           Cancellation overrides are privileged
//           administrative operations. The client should
//           request the override, while authorization,
//           eligibility, order/booking/ride state transition,
//           refund calculation, payment reversal and audit
//           logging must be controlled by the trusted backend
//           and JUERP governance layer.
//         </p>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="Authorization"
//             description="Only an authorized JUERP role should be able to approve protected overrides."
//           />

//           <GovernanceCard
//             title="Validation"
//             description="Backend validates entity state, scope, cancellation eligibility and policy."
//           />

//           <GovernanceCard
//             title="Financial Safety"
//             description="Refund and ledger amounts must never be independently calculated by the browser."
//           />

//           <GovernanceCard
//             title="Audit"
//             description="Protected actions should include correlationId, idempotencyKey and audit logging."
//           />

//         </div>

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedOverride && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">

//               <div>

//                 <div className="flex flex-wrap items-center gap-2">

//                   <h2 className="text-xl font-bold text-slate-900">
//                     {selectedOverride.overrideId}
//                   </h2>

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                       selectedOverride.status
//                     )}`}
//                   >
//                     {selectedOverride.status}
//                   </span>

//                 </div>

//                 <p className="mt-1 text-xs text-slate-400">
//                   {selectedOverride.entityId}
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
//                   Request Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Override ID"
//                     value={
//                       selectedOverride.overrideId
//                     }
//                   />

//                   <InfoItem
//                     label="Entity ID"
//                     value={
//                       selectedOverride.entityId
//                     }
//                   />

//                   <InfoItem
//                     label="Entity Type"
//                     value={
//                       selectedOverride.entityType
//                     }
//                   />

//                   <InfoItem
//                     label="Module"
//                     value={
//                       selectedOverride.moduleId
//                     }
//                   />

//                   <InfoItem
//                     label="Current Status"
//                     value={
//                       selectedOverride.currentStatus
//                     }
//                   />

//                   <InfoItem
//                     label="Requested Status"
//                     value={
//                       selectedOverride.requestedStatus
//                     }
//                   />

//                   <InfoItem
//                     label="Requested By"
//                     value={
//                       selectedOverride.requestedBy
//                     }
//                   />

//                   <InfoItem
//                     label="Approved By"
//                     value={
//                       selectedOverride.approvedBy ||
//                       "Not approved"
//                     }
//                   />

//                 </div>

//               </div>

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Customer & Vendor
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Customer"
//                     value={`${selectedOverride.customerName} (${selectedOverride.customerId})`}
//                   />

//                   <InfoItem
//                     label="Vendor"
//                     value={
//                       selectedOverride.vendorName
//                         ? `${selectedOverride.vendorName} (${selectedOverride.vendorId})`
//                         : "Not applicable"
//                     }
//                   />

//                 </div>

//               </div>

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Cancellation Reason
//                 </h3>

//                 <div className="mt-4 rounded-xl bg-slate-50 p-4">

//                   <p className="text-sm font-bold text-slate-800">
//                     {getReasonLabel(
//                       selectedOverride.reason
//                     )}
//                   </p>

//                   <p className="mt-2 text-sm leading-6 text-slate-600">
//                     {selectedOverride.reasonText}
//                   </p>

//                 </div>

//               </div>

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Financial Impact
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Refund Required"
//                     value={
//                       selectedOverride.refundRequired
//                         ? "Yes"
//                         : "No"
//                     }
//                   />

//                   <InfoItem
//                     label="Refund Amount"
//                     value={
//                       selectedOverride.refundRequired
//                         ? formatCurrency(
//                             selectedOverride.refundAmountPaise
//                           )
//                         : "₹0.00"
//                     }
//                   />

//                 </div>

//               </div>

//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Timeline
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <InfoItem
//                     label="Created At"
//                     value={
//                       selectedOverride.createdAt
//                     }
//                   />

//                   <InfoItem
//                     label="Updated At"
//                     value={
//                       selectedOverride.updatedAt
//                     }
//                   />

//                 </div>

//               </div>

//               <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//                 <p className="text-xs font-bold text-yellow-800">
//                   Production Safety
//                 </p>

//                 <p className="mt-2 text-xs leading-5 text-yellow-700">
//                   The displayed refund amount is sample
//                   UI data. The browser must not directly
//                   create refunds, alter ledger entries or
//                   bypass backend cancellation validation.
//                 </p>

//               </div>

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

//                 {selectedOverride.status ===
//                   "PENDING" && (
//                   <>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setShowDetails(false);
//                         openAction(
//                           selectedOverride,
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
//                           selectedOverride,
//                           "APPROVE"
//                         );
//                       }}
//                       className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
//                     >
//                       Approve
//                     </button>
//                   </>
//                 )}

//                 {selectedOverride.status ===
//                   "APPROVED" && (
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowDetails(false);
//                       openAction(
//                         selectedOverride,
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
//         selectedOverride &&
//         actionType && (
//           <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">

//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//               <h2 className="text-lg font-bold text-slate-900">
//                 {actionType === "APPROVE" &&
//                   "Approve Cancellation"}

//                 {actionType === "REJECT" &&
//                   "Reject Cancellation"}

//                 {actionType === "EXECUTE" &&
//                   "Execute Cancellation"}
//               </h2>

//               <p className="mt-2 text-sm leading-6 text-slate-500">
//                 You are about to{" "}
//                 {actionType.toLowerCase()} the
//                 cancellation override{" "}
//                 <span className="font-semibold text-slate-800">
//                   {selectedOverride.overrideId}
//                 </span>
//                 .
//               </p>

//               <div className="mt-5 rounded-xl bg-slate-50 p-4">

//                 <p className="text-xs text-slate-400">
//                   Entity
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-800">
//                   {selectedOverride.entityId}
//                 </p>

//                 <p className="mt-3 text-xs text-slate-400">
//                   Requested Transition
//                 </p>

//                 <p className="mt-1 text-sm font-semibold text-slate-800">
//                   {selectedOverride.currentStatus}{" "}
//                   →{" "}
//                   {selectedOverride.requestedStatus}
//                 </p>

//                 {selectedOverride.refundRequired && (
//                   <>
//                     <p className="mt-3 text-xs text-slate-400">
//                       Sample Refund Exposure
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-purple-700">
//                       {formatCurrency(
//                         selectedOverride.refundAmountPaise
//                       )}
//                     </p>
//                   </>
//                 )}

//               </div>

//               <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//                 <p className="text-xs leading-5 text-yellow-700">
//                   This demo page changes local UI state
//                   only. In production, this operation
//                   must be sent to a protected backend
//                   command with authorization,
//                   idempotency and audit logging.
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
//         ×
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No cancellation requests found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import {
  useOperationalOverrides,
  type CancellationEntity,
  type CancellationOverride,
  type CancellationReason,
  type OverrideWorkflowStatus,
} from "@/hooks/useOperationalOverrides";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

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

function getEntityClasses(entityType: CancellationEntity) {
  switch (entityType) {
    case "ORDER":
      return "bg-orange-100 text-orange-700";
    case "BOOKING":
      return "bg-purple-100 text-purple-700";
    case "RIDE":
      return "bg-blue-100 text-blue-700";
    case "DELIVERY":
      return "bg-green-100 text-green-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getReasonLabel(reason: CancellationReason) {
  switch (reason) {
    case "CUSTOMER_REQUEST":
      return "Customer Request";
    case "VENDOR_REQUEST":
      return "Vendor Request";
    case "CAPTAIN_ISSUE":
      return "Captain Issue";
    case "SYSTEM_ISSUE":
      return "System Issue";
    case "SERVICE_UNAVAILABLE":
      return "Service Unavailable";
    case "PAYMENT_ISSUE":
      return "Payment Issue";
    case "OTHER":
      return "Other";
    default:
      return reason;
  }
}

export default function CancellationOverridesPage() {
  const {
    cancellationOverrides: overrides,
    loading,
    error,
    refresh,
    updateCancellationStatus,
    isDemoMode,
  } = useOperationalOverrides();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | OverrideWorkflowStatus>("ALL");
  const [entityFilter, setEntityFilter] = useState<"ALL" | CancellationEntity>("ALL");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [selectedOverride, setSelectedOverride] = useState<CancellationOverride | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState<"APPROVE" | "REJECT" | "EXECUTE" | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredOverrides = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return overrides.filter((item) => {
      const matchesSearch =
        searchValue.length === 0 ||
        item.overrideId.toLowerCase().includes(searchValue) ||
        item.entityId.toLowerCase().includes(searchValue) ||
        item.customerName.toLowerCase().includes(searchValue) ||
        item.customerId.toLowerCase().includes(searchValue) ||
        item.vendorName?.toLowerCase().includes(searchValue);
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      const matchesEntity = entityFilter === "ALL" || item.entityType === entityFilter;
      const matchesModule = moduleFilter === "ALL" || item.moduleId === moduleFilter;
      return matchesSearch && matchesStatus && matchesEntity && matchesModule;
    });
  }, [overrides, search, statusFilter, entityFilter, moduleFilter]);

  const summary = useMemo(() => {
    const refundTotal = overrides
      .filter((i) => i.refundRequired)
      .reduce((sum, i) => sum + i.refundAmountPaise, 0);
    return {
      total: overrides.length,
      pending: overrides.filter((i) => i.status === "PENDING").length,
      approved: overrides.filter((i) => i.status === "APPROVED").length,
      rejected: overrides.filter((i) => i.status === "REJECTED").length,
      executed: overrides.filter((i) => i.status === "EXECUTED").length,
      refundTotal,
    };
  }, [overrides]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setEntityFilter("ALL");
    setModuleFilter("ALL");
  }

  function openDetails(item: CancellationOverride) {
    setSelectedOverride(item);
    setShowDetails(true);
  }

  function openAction(
    item: CancellationOverride,
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
      await updateCancellationStatus(
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
        err instanceof Error ? err.message : "Unable to update cancellation."
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
          <span className="text-slate-400">Overrides</span>
          <span className="text-slate-400">/</span>
          <span className="font-semibold text-slate-800">Cancellations</span>
        </div>
        <div className="rounded-2xl bg-white p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-xl">
                ×
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Cancellation Overrides
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                  Live Firestore review of exceptional cancellation requests.
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
                <p className="text-xs font-bold text-orange-800">Governance Required</p>
                <p className="mt-1 text-xs text-orange-700">
                  Protected cancellation actions require authorized backend execution.
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

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <SummaryCard title="Total Requests" value={summary.total} />
        <SummaryCard title="Pending" value={summary.pending} />
        <SummaryCard title="Approved" value={summary.approved} />
        <SummaryCard title="Rejected" value={summary.rejected} />
        <SummaryCard title="Executed" value={summary.executed} />
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium text-slate-500">Refund Exposure</p>
          <p className="mt-2 text-lg font-bold text-slate-900">
            {formatCurrency(summary.refundTotal)}
          </p>
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Cancellation Override Workflow</h2>
        <p className="mt-1 text-xs text-slate-500">Administrative exception flow.</p>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-5">
          <WorkflowStep number="1" title="Request" description="Cancellation exception is submitted." />
          <WorkflowStep number="2" title="Review" description="Authorized admin reviews the request." />
          <WorkflowStep number="3" title="Approve" description="Eligible override is approved." />
          <WorkflowStep number="4" title="Execute" description="Trusted backend applies the transition." />
          <WorkflowStep number="5" title="Audit" description="Action is recorded for governance." />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search override ID, entity, customer or vendor..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Status</label>
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
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Entity</label>
            <select
              value={entityFilter}
              onChange={(e) =>
                setEntityFilter(e.target.value as "ALL" | CancellationEntity)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Entities</option>
              <option value="ORDER">Order</option>
              <option value="BOOKING">Booking</option>
              <option value="RIDE">Ride</option>
              <option value="DELIVERY">Delivery</option>
            </select>
          </div>
          <div className="w-full xl:w-48">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">Module</label>
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
          <span className="font-semibold text-slate-700">{filteredOverrides.length}</span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">{overrides.length}</span>{" "}
          cancellation requests
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Cancellation Override Requests</h2>
          <p className="mt-1 text-xs text-slate-500">
            From collection <code className="text-[10px]">cancellation_overrides</code>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Override</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Entity</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Customer</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Module</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Reason</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Refund</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOverrides.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{item.overrideId}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}>
                      {item.entityType}
                    </span>
                    <p className="mt-2 text-xs text-slate-500">
                      {item.currentStatus} → {item.requestedStatus}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">{item.customerName}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.customerId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {item.moduleId}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">{getReasonLabel(item.reason)}</p>
                    <p className="mt-1 max-w-xs text-xs text-slate-400">{item.reasonText}</p>
                  </td>
                  <td className="px-5 py-4">
                    {item.refundRequired ? (
                      <>
                        <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-purple-700">
                          Required
                        </span>
                        <p className="mt-2 text-xs font-semibold text-slate-700">
                          {formatCurrency(item.refundAmountPaise)}
                        </p>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400">No refund</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-3">
                      <button type="button" onClick={() => openDetails(item)} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
                        View
                      </button>
                      {item.status === "PENDING" && (
                        <>
                          <button type="button" onClick={() => openAction(item, "APPROVE")} className="text-sm font-semibold text-green-600 hover:text-green-700">
                            Approve
                          </button>
                          <button type="button" onClick={() => openAction(item, "REJECT")} className="text-sm font-semibold text-red-600 hover:text-red-700">
                            Reject
                          </button>
                        </>
                      )}
                      {item.status === "APPROVED" && (
                        <button type="button" onClick={() => openAction(item, "EXECUTE")} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
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
            Loading cancellations from Firestore…
          </div>
        )}
      </div>

      <div className="space-y-4 md:hidden">
        {filteredOverrides.map((item) => (
          <div key={item.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{item.overrideId}</p>
                <p className="mt-1 text-xs text-slate-400">{item.entityId}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(item.status)}`}>
                {item.status}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getEntityClasses(item.entityType)}`}>
                {item.entityType}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                {item.moduleId}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-xs text-slate-400">Customer</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{item.customerName}</p>
              <p className="mt-1 text-xs text-slate-400">{item.customerId}</p>
            </div>
            <div className="mt-4 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-700">{getReasonLabel(item.reason)}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{item.reasonText}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <MobileInfo label="Current" value={item.currentStatus} />
              <MobileInfo label="Requested" value={item.requestedStatus} />
              <MobileInfo
                label="Refund"
                value={
                  item.refundRequired
                    ? formatCurrency(item.refundAmountPaise)
                    : "No Refund"
                }
              />
              <MobileInfo label="Requested By" value={item.requestedBy} />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => openDetails(item)} className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700">
                View
              </button>
              {item.status === "PENDING" && (
                <>
                  <button type="button" onClick={() => openAction(item, "APPROVE")} className="rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white">
                    Approve
                  </button>
                  <button type="button" onClick={() => openAction(item, "REJECT")} className="rounded-lg bg-red-600 px-3 py-2.5 text-sm font-semibold text-white">
                    Reject
                  </button>
                </>
              )}
              {item.status === "APPROVED" && (
                <button type="button" onClick={() => openAction(item, "EXECUTE")} className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">
                  Execute
                </button>
              )}
            </div>
          </div>
        ))}
        {!loading && filteredOverrides.length === 0 && (
          <div className="rounded-2xl bg-white shadow-sm">
            <EmptyState />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-900">Cancellation Override Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-800">
          Refund amounts shown are from Firestore documents and must not be
          recalculated in the browser. Cancellation and refund execution remain
          backend-authoritative.
        </p>
      </div>

      {showDetails && selectedOverride && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-200 p-5 md:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{selectedOverride.overrideId}</h2>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(selectedOverride.status)}`}>
                    {selectedOverride.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-400">{selectedOverride.entityId}</p>
              </div>
              <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400 hover:text-slate-700">
                ×
              </button>
            </div>
            <div className="space-y-6 p-5 md:p-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Request Information</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem label="Override ID" value={selectedOverride.overrideId} />
                  <InfoItem label="Entity ID" value={selectedOverride.entityId} />
                  <InfoItem label="Entity Type" value={selectedOverride.entityType} />
                  <InfoItem label="Module" value={selectedOverride.moduleId} />
                  <InfoItem label="Current Status" value={selectedOverride.currentStatus} />
                  <InfoItem label="Requested Status" value={selectedOverride.requestedStatus} />
                  <InfoItem label="Requested By" value={selectedOverride.requestedBy} />
                  <InfoItem label="Approved By" value={selectedOverride.approvedBy || "Not approved"} />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Customer & Vendor</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem
                    label="Customer"
                    value={`${selectedOverride.customerName} (${selectedOverride.customerId})`}
                  />
                  <InfoItem
                    label="Vendor"
                    value={
                      selectedOverride.vendorName
                        ? `${selectedOverride.vendorName} (${selectedOverride.vendorId})`
                        : "Not applicable"
                    }
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Cancellation Reason</h3>
                <div className="mt-4 rounded-xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-800">{getReasonLabel(selectedOverride.reason)}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{selectedOverride.reasonText}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Financial Impact</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem label="Refund Required" value={selectedOverride.refundRequired ? "Yes" : "No"} />
                  <InfoItem
                    label="Refund Amount"
                    value={
                      selectedOverride.refundRequired
                        ? formatCurrency(selectedOverride.refundAmountPaise)
                        : "₹0.00"
                    }
                  />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Timeline</h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem label="Created At" value={selectedOverride.createdAt} />
                  <InfoItem label="Updated At" value={selectedOverride.updatedAt} />
                </div>
              </div>
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <button type="button" onClick={() => setShowDetails(false)} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700">
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

      {showActionModal && selectedOverride && actionType && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              {actionType === "APPROVE" && "Approve Cancellation"}
              {actionType === "REJECT" && "Reject Cancellation"}
              {actionType === "EXECUTE" && "Execute Cancellation"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to {actionType.toLowerCase()} cancellation override{" "}
              <span className="font-semibold text-slate-800">{selectedOverride.overrideId}</span>.
            </p>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Entity</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">{selectedOverride.entityId}</p>
              <p className="mt-3 text-xs text-slate-400">Requested Transition</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {selectedOverride.currentStatus} → {selectedOverride.requestedStatus}
              </p>
              {selectedOverride.refundRequired && (
                <>
                  <p className="mt-3 text-xs text-slate-400">Refund Exposure (from Firestore)</p>
                  <p className="mt-1 text-sm font-semibold text-purple-700">
                    {formatCurrency(selectedOverride.refundAmountPaise)}
                  </p>
                </>
              )}
            </div>
            <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-xs leading-5 text-yellow-700">
                This updates Firestore status only. Cancellation, refund, and
                ledger changes must be executed by the trusted backend.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => {
                  setShowActionModal(false);
                  setActionType(null);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => void executeAction()}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
                  actionType === "REJECT"
                    ? "bg-red-600 hover:bg-red-700"
                    : actionType === "APPROVE"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {actionLoading
                  ? "Saving…"
                  : `Confirm ${
                      actionType === "APPROVE"
                        ? "Approval"
                        : actionType === "REJECT"
                          ? "Rejection"
                          : "Execution"
                    }`}
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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        ×
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">No cancellation requests found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty <code className="text-[10px]">cancellation_overrides</code> or filters too narrow.
      </p>
    </div>
  );
}