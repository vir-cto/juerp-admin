// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type ReconciliationStatus =
//   | "MATCHED"
//   | "MISMATCH"
//   | "PENDING"
//   | "INVESTIGATING"
//   | "RESOLVED";

// type PaymentStatus =
//   | "CREATED"
//   | "PENDING"
//   | "PAID"
//   | "FAILED"
//   | "REFUNDED"
//   | "PARTIALLY_REFUNDED"
//   | "CANCELLED";

// type TransactionType =
//   | "ORDER"
//   | "BOOKING"
//   | "RIDE";

// type ReconciliationRecord = {
//   reconciliationId: string;
//   paymentId: string;
//   cashfreeOrderId: string;

//   entityId: string;
//   entityType: TransactionType;

//   customerId: string;

//   amountPaise: number;
//   cashfreeAmountPaise: number;

//   paymentStatus: PaymentStatus;
//   reconciliationStatus: ReconciliationStatus;

//   eventType: string;
//   signatureVerified: boolean;

//   currency: string;

//   receivedAt: string;
//   reconciledAt?: string;

//   mismatchReason?: string;

//   correlationId: string;
// };

// const INITIAL_RECORDS: ReconciliationRecord[] = [
//   {
//     reconciliationId: "REC-10001",
//     paymentId: "PAY-10001",
//     cashfreeOrderId: "CF-ORDER-10001",
//     entityId: "ORD-10001",
//     entityType: "ORDER",
//     customerId: "CUS-10001",
//     amountPaise: 101500,
//     cashfreeAmountPaise: 101500,
//     paymentStatus: "PAID",
//     reconciliationStatus: "MATCHED",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 09:12 AM",
//     reconciledAt: "05 Oct 2026, 09:13 AM",
//     correlationId: "CORR-20261005-10001",
//   },
//   {
//     reconciliationId: "REC-10002",
//     paymentId: "PAY-10002",
//     cashfreeOrderId: "CF-ORDER-10002",
//     entityId: "ORD-10002",
//     entityType: "ORDER",
//     customerId: "CUS-10002",
//     amountPaise: 68760,
//     cashfreeAmountPaise: 68760,
//     paymentStatus: "PAID",
//     reconciliationStatus: "MATCHED",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 09:25 AM",
//     reconciledAt: "05 Oct 2026, 09:26 AM",
//     correlationId: "CORR-20261005-10002",
//   },
//   {
//     reconciliationId: "REC-10003",
//     paymentId: "PAY-10003",
//     cashfreeOrderId: "CF-ORDER-10003",
//     entityId: "ORD-10003",
//     entityType: "ORDER",
//     customerId: "CUS-10003",
//     amountPaise: 245000,
//     cashfreeAmountPaise: 250000,
//     paymentStatus: "PAID",
//     reconciliationStatus: "MISMATCH",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 10:04 AM",
//     mismatchReason:
//       "Internal payment amount differs from Cashfree amount.",
//     correlationId: "CORR-20261005-10003",
//   },
//   {
//     reconciliationId: "REC-10004",
//     paymentId: "PAY-10004",
//     cashfreeOrderId: "CF-BOOKING-10004",
//     entityId: "BOOK-10004",
//     entityType: "BOOKING",
//     customerId: "CUS-10004",
//     amountPaise: 500000,
//     cashfreeAmountPaise: 500000,
//     paymentStatus: "PENDING",
//     reconciliationStatus: "PENDING",
//     eventType: "PAYMENT_PENDING",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 10:35 AM",
//     correlationId: "CORR-20261005-10004",
//   },
//   {
//     reconciliationId: "REC-10005",
//     paymentId: "PAY-10005",
//     cashfreeOrderId: "CF-RIDE-10005",
//     entityId: "RIDE-10005",
//     entityType: "RIDE",
//     customerId: "CUS-10005",
//     amountPaise: 18000,
//     cashfreeAmountPaise: 18000,
//     paymentStatus: "PAID",
//     reconciliationStatus: "MATCHED",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 11:02 AM",
//     reconciledAt: "05 Oct 2026, 11:03 AM",
//     correlationId: "CORR-20261005-10005",
//   },
//   {
//     reconciliationId: "REC-10006",
//     paymentId: "PAY-10006",
//     cashfreeOrderId: "CF-ORDER-10006",
//     entityId: "ORD-10006",
//     entityType: "ORDER",
//     customerId: "CUS-10006",
//     amountPaise: 125000,
//     cashfreeAmountPaise: 125000,
//     paymentStatus: "PAID",
//     reconciliationStatus: "INVESTIGATING",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 11:20 AM",
//     correlationId: "CORR-20261005-10006",
//     mismatchReason:
//       "Payment matched but settlement reference is awaiting verification.",
//   },
//   {
//     reconciliationId: "REC-10007",
//     paymentId: "PAY-10007",
//     cashfreeOrderId: "CF-ORDER-10007",
//     entityId: "ORD-10007",
//     entityType: "ORDER",
//     customerId: "CUS-10007",
//     amountPaise: 76000,
//     cashfreeAmountPaise: 76000,
//     paymentStatus: "REFUNDED",
//     reconciliationStatus: "MATCHED",
//     eventType: "REFUND_SUCCESS",
//     signatureVerified: true,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 12:15 PM",
//     reconciledAt: "05 Oct 2026, 12:16 PM",
//     correlationId: "CORR-20261005-10007",
//   },
//   {
//     reconciliationId: "REC-10008",
//     paymentId: "PAY-10008",
//     cashfreeOrderId: "CF-ORDER-10008",
//     entityId: "ORD-10008",
//     entityType: "ORDER",
//     customerId: "CUS-10008",
//     amountPaise: 95000,
//     cashfreeAmountPaise: 90000,
//     paymentStatus: "PAID",
//     reconciliationStatus: "MISMATCH",
//     eventType: "PAYMENT_SUCCESS",
//     signatureVerified: false,
//     currency: "INR",
//     receivedAt: "05 Oct 2026, 01:05 PM",
//     correlationId: "CORR-20261005-10008",
//     mismatchReason:
//       "Webhook signature verification failed and amount differs.",
//   },
// ];

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function getStatusClasses(
//   status: ReconciliationStatus
// ) {
//   switch (status) {
//     case "MATCHED":
//       return "bg-green-100 text-green-700";

//     case "MISMATCH":
//       return "bg-red-100 text-red-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "INVESTIGATING":
//       return "bg-orange-100 text-orange-700";

//     case "RESOLVED":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getPaymentClasses(
//   status: PaymentStatus
// ) {
//   switch (status) {
//     case "PAID":
//       return "bg-green-100 text-green-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "FAILED":
//       return "bg-red-100 text-red-700";

//     case "REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     case "PARTIALLY_REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     case "CANCELLED":
//       return "bg-slate-100 text-slate-700";

//     case "CREATED":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getEntityClasses(
//   type: TransactionType
// ) {
//   switch (type) {
//     case "ORDER":
//       return "bg-orange-50 text-orange-700";

//     case "BOOKING":
//       return "bg-purple-50 text-purple-700";

//     case "RIDE":
//       return "bg-blue-50 text-blue-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// export default function CashfreeReconciliationPage() {
//   const [records, setRecords] =
//     useState<ReconciliationRecord[]>(
//       INITIAL_RECORDS
//     );

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<
//       "ALL" | ReconciliationStatus
//     >("ALL");

//   const [paymentFilter, setPaymentFilter] =
//     useState<"ALL" | PaymentStatus>("ALL");

//   const [entityFilter, setEntityFilter] =
//     useState<"ALL" | TransactionType>("ALL");

//   const [selectedRecord, setSelectedRecord] =
//     useState<ReconciliationRecord | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredRecords = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return records.filter((record) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         record.reconciliationId
//           .toLowerCase()
//           .includes(searchValue) ||
//         record.paymentId
//           .toLowerCase()
//           .includes(searchValue) ||
//         record.cashfreeOrderId
//           .toLowerCase()
//           .includes(searchValue) ||
//         record.entityId
//           .toLowerCase()
//           .includes(searchValue) ||
//         record.customerId
//           .toLowerCase()
//           .includes(searchValue) ||
//         record.correlationId
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         record.reconciliationStatus ===
//           statusFilter;

//       const matchesPayment =
//         paymentFilter === "ALL" ||
//         record.paymentStatus === paymentFilter;

//       const matchesEntity =
//         entityFilter === "ALL" ||
//         record.entityType === entityFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesPayment &&
//         matchesEntity
//       );
//     });
//   }, [
//     records,
//     search,
//     statusFilter,
//     paymentFilter,
//     entityFilter,
//   ]);

//   const totalCount = records.length;

//   const matchedCount = records.filter(
//     (record) =>
//       record.reconciliationStatus ===
//       "MATCHED"
//   ).length;

//   const mismatchCount = records.filter(
//     (record) =>
//       record.reconciliationStatus ===
//       "MISMATCH"
//   ).length;

//   const pendingCount = records.filter(
//     (record) =>
//       record.reconciliationStatus ===
//         "PENDING" ||
//       record.reconciliationStatus ===
//         "INVESTIGATING"
//   ).length;

//   const matchedAmount = records
//     .filter(
//       (record) =>
//         record.reconciliationStatus ===
//         "MATCHED"
//     )
//     .reduce(
//       (total, record) =>
//         total + record.amountPaise,
//       0
//     );

//   const mismatchAmount = records
//     .filter(
//       (record) =>
//         record.reconciliationStatus ===
//         "MISMATCH"
//     )
//     .reduce(
//       (total, record) =>
//         total +
//         Math.abs(
//           record.cashfreeAmountPaise -
//             record.amountPaise
//         ),
//       0
//     );

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setPaymentFilter("ALL");
//     setEntityFilter("ALL");
//   }

//   function openDetails(
//     record: ReconciliationRecord
//   ) {
//     setSelectedRecord(record);
//     setShowDetails(true);
//   }

//   function markResolved() {
//     if (!selectedRecord) {
//       return;
//     }

//     setRecords((currentRecords) =>
//       currentRecords.map((record) =>
//         record.reconciliationId ===
//         selectedRecord.reconciliationId
//           ? {
//               ...record,
//               reconciliationStatus:
//                 "RESOLVED",
//               reconciledAt:
//                 "Just now",
//             }
//           : record
//       )
//     );

//     setSelectedRecord((current) =>
//       current
//         ? {
//             ...current,
//             reconciliationStatus:
//               "RESOLVED",
//             reconciledAt:
//               "Just now",
//           }
//         : null
//     );

//     setSuccessMessage(
//       `${selectedRecord.reconciliationId} marked as resolved.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* BREADCRUMB */}

//       <div className="mb-4 flex flex-wrap items-center gap-2">

//         <Link
//           href="/financial-audit"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Financial Audit
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <span className="text-sm font-medium text-slate-800">
//           Cashfree Reconciliation
//         </span>

//       </div>

//       {/* HEADER */}

//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

//         <div>

//           <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
//             Cashfree Reconciliation
//           </h1>

//           <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
//             Monitor Cashfree payment events against
//             authoritative payment records and identify
//             financial reconciliation exceptions.
//           </p>

//         </div>

//         <div className="rounded-xl bg-white px-5 py-4 shadow-sm">

//           <p className="text-xs text-slate-500">
//             Reconciliation Records
//           </p>

//           <p className="mt-1 text-2xl font-bold text-slate-900">
//             {totalCount}
//           </p>

//         </div>

//       </div>

//       {/* SUCCESS */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* GOVERNANCE FLOW */}

//       <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">

//         <p className="text-sm font-bold text-blue-900">
//           Cashfree Reconciliation Flow
//         </p>

//         <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

//           <FlowStep
//             number="1"
//             title="Cashfree Event"
//             description="Webhook received"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="2"
//             title="Signature Check"
//             description="Verify authenticity"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="3"
//             title="Payment Record"
//             description="Compare authoritative record"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="4"
//             title="Reconciliation"
//             description="Match or investigate"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="5"
//             title="Audit"
//             description="Record outcome"
//           />

//         </div>

//       </div>

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         <SummaryCard
//           title="Total Records"
//           value={totalCount.toString()}
//           description="Events under review"
//           icon="≡"
//           iconClass="bg-slate-100 text-slate-700"
//         />

//         <SummaryCard
//           title="Matched"
//           value={matchedCount.toString()}
//           description={formatCurrency(matchedAmount)}
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />

//         <SummaryCard
//           title="Mismatches"
//           value={mismatchCount.toString()}
//           description={formatCurrency(mismatchAmount)}
//           icon="!"
//           iconClass="bg-red-100 text-red-700"
//         />

//         <SummaryCard
//           title="Pending"
//           value={pendingCount.toString()}
//           description="Need review"
//           icon="◷"
//           iconClass="bg-yellow-100 text-yellow-700"
//         />

//         <SummaryCard
//           title="Verified"
//           value={`${records.filter((record) => record.signatureVerified).length}/${totalCount}`}
//           description="Webhook signatures"
//           icon="✓"
//           iconClass="bg-blue-100 text-blue-700"
//         />

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Payment ID, Cashfree ID, Order ID..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Reconciliation Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ReconciliationStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Statuses
//               </option>
//               <option value="MATCHED">
//                 Matched
//               </option>
//               <option value="MISMATCH">
//                 Mismatch
//               </option>
//               <option value="PENDING">
//                 Pending
//               </option>
//               <option value="INVESTIGATING">
//                 Investigating
//               </option>
//               <option value="RESOLVED">
//                 Resolved
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Payment Status
//             </label>

//             <select
//               value={paymentFilter}
//               onChange={(event) =>
//                 setPaymentFilter(
//                   event.target.value as
//                     | "ALL"
//                     | PaymentStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Payment Statuses
//               </option>
//               <option value="CREATED">
//                 Created
//               </option>
//               <option value="PENDING">
//                 Pending
//               </option>
//               <option value="PAID">
//                 Paid
//               </option>
//               <option value="FAILED">
//                 Failed
//               </option>
//               <option value="REFUNDED">
//                 Refunded
//               </option>
//               <option value="PARTIALLY_REFUNDED">
//                 Partially Refunded
//               </option>
//               <option value="CANCELLED">
//                 Cancelled
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Transaction Type
//             </label>

//             <select
//               value={entityFilter}
//               onChange={(event) =>
//                 setEntityFilter(
//                   event.target.value as
//                     | "ALL"
//                     | TransactionType
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Transactions
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
//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredRecords.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {records.length}
//             </span>{" "}
//             reconciliation records
//           </p>

//           {(search ||
//             statusFilter !== "ALL" ||
//             paymentFilter !== "ALL" ||
//             entityFilter !== "ALL") && (
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

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1250px]">

//             <thead className="border-b border-slate-200 bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Reconciliation
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Cashfree
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Transaction
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Amount
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Payment
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Signature
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredRecords.map((record) => {

//                 const difference =
//                   record.cashfreeAmountPaise -
//                   record.amountPaise;

//                 return (
//                   <tr
//                     key={record.reconciliationId}
//                     className="hover:bg-slate-50"
//                   >

//                     <td className="px-5 py-4">

//                       <p className="text-sm font-bold text-slate-900">
//                         {record.reconciliationId}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-500">
//                         {record.paymentId}
//                       </p>

//                     </td>

//                     <td className="px-5 py-4">

//                       <p className="max-w-[190px] truncate text-xs font-semibold text-slate-800">
//                         {record.cashfreeOrderId}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {record.eventType}
//                       </p>

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-md px-2 py-1 text-[10px] font-bold ${getEntityClasses(
//                           record.entityType
//                         )}`}
//                       >
//                         {record.entityType}
//                       </span>

//                       <p className="mt-2 text-xs font-semibold text-slate-800">
//                         {record.entityId}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {record.customerId}
//                       </p>

//                     </td>

//                     <td className="px-5 py-4">

//                       <p className="text-sm font-bold text-slate-900">
//                         {formatCurrency(
//                           record.amountPaise
//                         )}
//                       </p>

//                       {difference !== 0 && (
//                         <p className="mt-1 text-xs font-semibold text-red-600">
//                           CF:{" "}
//                           {formatCurrency(
//                             record.cashfreeAmountPaise
//                           )}
//                         </p>
//                       )}

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getPaymentClasses(
//                           record.paymentStatus
//                         )}`}
//                       >
//                         {record.paymentStatus}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4">

//                       {record.signatureVerified ? (
//                         <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700">
//                           VERIFIED
//                         </span>
//                       ) : (
//                         <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold text-red-700">
//                           FAILED
//                         </span>
//                       )}

//                     </td>

//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                           record.reconciliationStatus
//                         )}`}
//                       >
//                         {record.reconciliationStatus}
//                       </span>

//                     </td>

//                     <td className="px-5 py-4">

//                       <div className="flex justify-end">

//                         <button
//                           type="button"
//                           onClick={() =>
//                             openDetails(record)
//                           }
//                           className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                         >
//                           View
//                         </button>

//                       </div>

//                     </td>

//                   </tr>
//                 );
//               })}

//             </tbody>

//           </table>

//         </div>

//         {filteredRecords.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="grid grid-cols-1 gap-4 lg:hidden">

//         {filteredRecords.map((record) => {

//           const difference =
//             record.cashfreeAmountPaise -
//             record.amountPaise;

//           return (
//             <div
//               key={record.reconciliationId}
//               className="rounded-2xl bg-white p-5 shadow-sm"
//             >

//               <div className="flex items-start justify-between gap-3">

//                 <div>

//                   <p className="text-sm font-bold text-slate-900">
//                     {record.reconciliationId}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {record.paymentId}
//                   </p>

//                 </div>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                     record.reconciliationStatus
//                   )}`}
//                 >
//                   {record.reconciliationStatus}
//                 </span>

//               </div>

//               <div className="mt-5 grid grid-cols-2 gap-4">

//                 <MobileInfo
//                   label="Cashfree Order"
//                   value={record.cashfreeOrderId}
//                 />

//                 <MobileInfo
//                   label="Transaction"
//                   value={`${record.entityType} / ${record.entityId}`}
//                 />

//                 <MobileInfo
//                   label="Amount"
//                   value={formatCurrency(
//                     record.amountPaise
//                   )}
//                 />

//                 <MobileInfo
//                   label="Payment"
//                   value={record.paymentStatus}
//                 />

//                 <MobileInfo
//                   label="Event"
//                   value={record.eventType}
//                 />

//                 <MobileInfo
//                   label="Signature"
//                   value={
//                     record.signatureVerified
//                       ? "VERIFIED"
//                       : "FAILED"
//                   }
//                 />

//               </div>

//               {difference !== 0 && (
//                 <div className="mt-4 rounded-lg bg-red-50 p-3">

//                   <p className="text-xs font-bold text-red-700">
//                     Amount Difference
//                   </p>

//                   <p className="mt-1 text-sm font-bold text-red-700">
//                     {formatCurrency(
//                       Math.abs(difference)
//                     )}
//                   </p>

//                 </div>
//               )}

//               <button
//                 type="button"
//                 onClick={() =>
//                   openDetails(record)
//                 }
//                 className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 View Reconciliation Details
//               </button>

//             </div>
//           );
//         })}

//         {filteredRecords.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedRecord && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             {/* MODAL HEADER */}

//             <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Reconciliation Details
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {selectedRecord.reconciliationId}
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

//             <div className="space-y-6 p-6">

//               {/* STATUS */}

//               <div className="rounded-xl bg-slate-50 p-5">

//                 <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Reconciliation Status
//                     </p>

//                     <span
//                       className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
//                         selectedRecord.reconciliationStatus
//                       )}`}
//                     >
//                       {
//                         selectedRecord.reconciliationStatus
//                       }
//                     </span>

//                   </div>

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Payment Status
//                     </p>

//                     <span
//                       className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getPaymentClasses(
//                         selectedRecord.paymentStatus
//                       )}`}
//                     >
//                       {selectedRecord.paymentStatus}
//                     </span>

//                   </div>

//                 </div>

//               </div>

//               {/* IDENTIFIERS */}

//               <DetailsSection title="Payment Identifiers">

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                   <DetailItem
//                     label="Reconciliation ID"
//                     value={
//                       selectedRecord.reconciliationId
//                     }
//                   />

//                   <DetailItem
//                     label="Payment ID"
//                     value={
//                       selectedRecord.paymentId
//                     }
//                   />

//                   <DetailItem
//                     label="Cashfree Order ID"
//                     value={
//                       selectedRecord.cashfreeOrderId
//                     }
//                   />

//                   <DetailItem
//                     label="Entity ID"
//                     value={selectedRecord.entityId}
//                   />

//                   <DetailItem
//                     label="Entity Type"
//                     value={selectedRecord.entityType}
//                   />

//                   <DetailItem
//                     label="Customer ID"
//                     value={
//                       selectedRecord.customerId
//                     }
//                   />

//                 </div>

//               </DetailsSection>

//               {/* AMOUNTS */}

//               <DetailsSection title="Financial Comparison">

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

//                   <AmountCard
//                     label="Internal Amount"
//                     amount={
//                       selectedRecord.amountPaise
//                     }
//                   />

//                   <AmountCard
//                     label="Cashfree Amount"
//                     amount={
//                       selectedRecord.cashfreeAmountPaise
//                     }
//                   />

//                   <AmountCard
//                     label="Difference"
//                     amount={Math.abs(
//                       selectedRecord
//                         .cashfreeAmountPaise -
//                         selectedRecord.amountPaise
//                     )}
//                     highlight={
//                       selectedRecord
//                         .cashfreeAmountPaise !==
//                       selectedRecord.amountPaise
//                     }
//                   />

//                 </div>

//                 <p className="mt-4 text-xs text-slate-500">
//                   Currency:{" "}
//                   <span className="font-semibold">
//                     {selectedRecord.currency}
//                   </span>
//                 </p>

//               </DetailsSection>

//               {/* CASHFREE EVENT */}

//               <DetailsSection title="Cashfree Event">

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                   <DetailItem
//                     label="Event Type"
//                     value={
//                       selectedRecord.eventType
//                     }
//                   />

//                   <DetailItem
//                     label="Signature"
//                     value={
//                       selectedRecord.signatureVerified
//                         ? "VERIFIED"
//                         : "FAILED"
//                     }
//                   />

//                   <DetailItem
//                     label="Received At"
//                     value={
//                       selectedRecord.receivedAt
//                     }
//                   />

//                   <DetailItem
//                     label="Reconciled At"
//                     value={
//                       selectedRecord.reconciledAt ||
//                       "Not reconciled"
//                     }
//                   />

//                 </div>

//               </DetailsSection>

//               {/* MISMATCH */}

//               {selectedRecord.mismatchReason && (
//                 <div className="rounded-xl border border-red-200 bg-red-50 p-5">

//                   <p className="text-sm font-bold text-red-800">
//                     Investigation / Exception
//                   </p>

//                   <p className="mt-2 text-sm leading-6 text-red-700">
//                     {selectedRecord.mismatchReason}
//                   </p>

//                 </div>
//               )}

//               {/* CORRELATION */}

//               <DetailsSection title="Audit Metadata">

//                 <DetailItem
//                   label="Correlation ID"
//                   value={
//                     selectedRecord.correlationId
//                   }
//                 />

//               </DetailsSection>

//               {/* ACTION */}

//               {(selectedRecord.reconciliationStatus ===
//                 "MISMATCH" ||
//                 selectedRecord.reconciliationStatus ===
//                   "INVESTIGATING") && (
//                 <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">

//                   <p className="text-sm font-bold text-orange-800">
//                     Review Required
//                   </p>

//                   <p className="mt-2 text-xs leading-6 text-orange-700">
//                     This record requires authoritative
//                     backend/finance review before it is
//                     considered financially resolved.
//                   </p>

//                   <button
//                     type="button"
//                     onClick={markResolved}
//                     className="mt-4 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//                   >
//                     Mark as Resolved
//                   </button>

//                 </div>
//               )}

//             </div>

//             <div className="border-t border-slate-200 p-6">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowDetails(false)
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-800">
//           Financial Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Cashfree reconciliation is an audit and control
//           function. Cashfree webhook events must be received
//           and signature-verified by the trusted backend.
//           Payment records, financial snapshots and ledger
//           entries remain authoritative backend/JUERP data.
//           The client must not independently mark a payment as
//           financially successful or alter payment amounts.
//         </p>

//         <div className="mt-4 rounded-lg border border-orange-200 bg-white p-4">

//           <p className="text-xs font-bold text-slate-700">
//             Production flow
//           </p>

//           <p className="mt-2 text-xs leading-6 text-slate-500">
//             Cashfree Webhook → Signature Verification →
//             cashfree_events → payments → Reconciliation →
//             Financial Exception / Audit Log → Ledger /
//             Settlement
//           </p>

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

//           <p className="mt-2 text-2xl font-bold text-slate-900">
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

// function FlowStep({
//   number,
//   title,
//   description,
// }: {
//   number: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-center gap-3">

//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
//         {number}
//       </div>

//       <div>

//         <p className="text-xs font-bold text-blue-900">
//           {title}
//         </p>

//         <p className="mt-0.5 text-[10px] text-blue-700">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }

// function FlowArrow() {
//   return (
//     <div className="hidden text-blue-300 md:block">
//       →
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
//     <div>

//       <p className="text-[11px] font-medium text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-xs font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function DetailsSection({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section>

//       <h3 className="text-sm font-bold text-slate-900">
//         {title}
//       </h3>

//       <div className="mt-4">
//         {children}
//       </div>

//     </section>
//   );
// }

// function DetailItem({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div>

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-1 break-all text-sm font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function AmountCard({
//   label,
//   amount,
//   highlight = false,
// }: {
//   label: string;
//   amount: number;
//   highlight?: boolean;
// }) {
//   return (
//     <div
//       className={`rounded-xl border p-4 ${
//         highlight
//           ? "border-red-200 bg-red-50"
//           : "border-slate-200 bg-slate-50"
//       }`}
//     >

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p
//         className={`mt-2 text-lg font-bold ${
//           highlight
//             ? "text-red-700"
//             : "text-slate-900"
//         }`}
//       >
//         {formatCurrency(amount)}
//       </p>

//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center">

//       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
//         🔍
//       </div>

//       <h3 className="mt-4 text-base font-bold text-slate-900">
//         No reconciliation records found
//       </h3>

//       <p className="mt-1 text-sm text-slate-500">
//         Try changing your search or filter options.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useFinancialAudit,
  type EntityType,
  type PaymentStatus,
  type ReconciliationRecord,
  type ReconciliationStatus,
} from "@/hooks/useFinancialAudit";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function getStatusClasses(status: ReconciliationStatus) {
  switch (status) {
    case "MATCHED":
      return "bg-green-100 text-green-700";
    case "MISMATCH":
      return "bg-red-100 text-red-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "INVESTIGATING":
      return "bg-orange-100 text-orange-700";
    case "RESOLVED":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPaymentClasses(status: PaymentStatus) {
  switch (status) {
    case "PAID":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
      return "bg-purple-100 text-purple-700";
    case "CANCELLED":
      return "bg-slate-100 text-slate-700";
    case "CREATED":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getEntityClasses(type: EntityType) {
  switch (type) {
    case "ORDER":
      return "bg-orange-50 text-orange-700";
    case "BOOKING":
      return "bg-purple-50 text-purple-700";
    case "RIDE":
      return "bg-blue-50 text-blue-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

export default function CashfreeReconciliationPage() {
  const {
    cashfreeRecords: records,
    loading,
    error,
    refresh,
    markReconResolved,
  } = useFinancialAudit();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | ReconciliationStatus
  >("ALL");
  const [paymentFilter, setPaymentFilter] = useState<"ALL" | PaymentStatus>(
    "ALL"
  );
  const [entityFilter, setEntityFilter] = useState<"ALL" | EntityType>("ALL");
  const [selectedRecord, setSelectedRecord] =
    useState<ReconciliationRecord | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredRecords = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return records.filter((record) => {
      const matchesSearch =
        searchValue.length === 0 ||
        record.reconciliationId.toLowerCase().includes(searchValue) ||
        record.paymentId.toLowerCase().includes(searchValue) ||
        record.cashfreeOrderId.toLowerCase().includes(searchValue) ||
        record.entityId.toLowerCase().includes(searchValue) ||
        record.customerId.toLowerCase().includes(searchValue) ||
        record.correlationId.toLowerCase().includes(searchValue);
      const matchesStatus =
        statusFilter === "ALL" ||
        record.reconciliationStatus === statusFilter;
      const matchesPayment =
        paymentFilter === "ALL" || record.paymentStatus === paymentFilter;
      const matchesEntity =
        entityFilter === "ALL" || record.entityType === entityFilter;
      return matchesSearch && matchesStatus && matchesPayment && matchesEntity;
    });
  }, [records, search, statusFilter, paymentFilter, entityFilter]);

  const totalCount = records.length;
  const matchedCount = records.filter(
    (r) => r.reconciliationStatus === "MATCHED"
  ).length;
  const mismatchCount = records.filter(
    (r) => r.reconciliationStatus === "MISMATCH"
  ).length;
  const pendingCount = records.filter(
    (r) =>
      r.reconciliationStatus === "PENDING" ||
      r.reconciliationStatus === "INVESTIGATING"
  ).length;
  const matchedAmount = records
    .filter((r) => r.reconciliationStatus === "MATCHED")
    .reduce((t, r) => t + r.amountPaise, 0);
  const mismatchAmount = records
    .filter((r) => r.reconciliationStatus === "MISMATCH")
    .reduce(
      (t, r) => t + Math.abs(r.cashfreeAmountPaise - r.amountPaise),
      0
    );

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setPaymentFilter("ALL");
    setEntityFilter("ALL");
  }

  function openDetails(record: ReconciliationRecord) {
    setSelectedRecord(record);
    setShowDetails(true);
  }

  async function markResolved() {
    if (!selectedRecord) return;
    try {
      setActionLoading(true);
      await markReconResolved(selectedRecord.reconciliationId);
      setSelectedRecord((current) =>
        current
          ? {
              ...current,
              reconciliationStatus: "RESOLVED",
              reconciledAt: "Just now",
            }
          : null
      );
      setSuccessMessage(
        `${selectedRecord.reconciliationId} marked as resolved.`
      );
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: unknown) {
      setSuccessMessage(
        err instanceof Error ? err.message : "Failed to update status."
      );
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/financial-audit"
          className="text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          Financial Audit
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-sm font-medium text-slate-800">
          Cashfree Reconciliation
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Cashfree Reconciliation
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Live Cashfree events from Firestore compared against payment
            records for financial exceptions.
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
            <p className="text-xs text-slate-500">Reconciliation Records</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalCount}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm font-bold text-blue-900">
          Cashfree Reconciliation Flow
        </p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <FlowStep number="1" title="Cashfree Event" description="Webhook received" />
          <FlowArrow />
          <FlowStep number="2" title="Signature Check" description="Verify authenticity" />
          <FlowArrow />
          <FlowStep number="3" title="Payment Record" description="Compare authoritative record" />
          <FlowArrow />
          <FlowStep number="4" title="Reconciliation" description="Match or investigate" />
          <FlowArrow />
          <FlowStep number="5" title="Audit" description="Record outcome" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard title="Total Records" value={totalCount.toString()} description="Events under review" icon="≡" iconClass="bg-slate-100 text-slate-700" />
        <SummaryCard title="Matched" value={matchedCount.toString()} description={formatCurrency(matchedAmount)} icon="✓" iconClass="bg-green-100 text-green-700" />
        <SummaryCard title="Mismatches" value={mismatchCount.toString()} description={formatCurrency(mismatchAmount)} icon="!" iconClass="bg-red-100 text-red-700" />
        <SummaryCard title="Pending" value={pendingCount.toString()} description="Need review" icon="◷" iconClass="bg-yellow-100 text-yellow-700" />
        <SummaryCard
          title="Verified"
          value={`${records.filter((r) => r.signatureVerified).length}/${totalCount || 0}`}
          description="Webhook signatures"
          icon="✓"
          iconClass="bg-blue-100 text-blue-700"
        />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Payment ID, Cashfree ID, Order ID..." className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Reconciliation Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "ALL" | ReconciliationStatus)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Statuses</option>
              <option value="MATCHED">Matched</option>
              <option value="MISMATCH">Mismatch</option>
              <option value="PENDING">Pending</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Payment Status</label>
            <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value as "ALL" | PaymentStatus)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Payment Statuses</option>
              <option value="CREATED">Created</option>
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
              <option value="PARTIALLY_REFUNDED">Partially Refunded</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Transaction Type</label>
            <select value={entityFilter} onChange={(e) => setEntityFilter(e.target.value as "ALL" | EntityType)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Transactions</option>
              <option value="ORDER">Order</option>
              <option value="BOOKING">Booking</option>
              <option value="RIDE">Ride</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{filteredRecords.length}</span> of{" "}
            <span className="font-semibold text-slate-800">{records.length}</span> reconciliation records
            {loading ? " · Loading…" : ""}
          </p>
          {(search || statusFilter !== "ALL" || paymentFilter !== "ALL" || entityFilter !== "ALL") && (
            <button type="button" onClick={clearFilters} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Reconciliation</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Cashfree</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Transaction</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Amount</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Payment</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Signature</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => {
                const difference = record.cashfreeAmountPaise - record.amountPaise;
                return (
                  <tr key={record.reconciliationId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">{record.reconciliationId}</p>
                      <p className="mt-1 text-xs text-slate-500">{record.paymentId}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="max-w-[190px] truncate text-xs font-semibold text-slate-800">{record.cashfreeOrderId}</p>
                      <p className="mt-1 text-xs text-slate-400">{record.eventType}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${getEntityClasses(record.entityType)}`}>{record.entityType}</span>
                      <p className="mt-2 text-xs font-semibold text-slate-800">{record.entityId}</p>
                      <p className="mt-1 text-xs text-slate-400">{record.customerId}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(record.amountPaise)}</p>
                      {difference !== 0 && (
                        <p className="mt-1 text-xs font-semibold text-red-600">
                          CF: {formatCurrency(record.cashfreeAmountPaise)}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getPaymentClasses(record.paymentStatus)}`}>{record.paymentStatus}</span>
                    </td>
                    <td className="px-5 py-4">
                      {record.signatureVerified ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold text-green-700">VERIFIED</span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-semibold text-red-700">FAILED</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(record.reconciliationStatus)}`}>{record.reconciliationStatus}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <button type="button" onClick={() => openDetails(record)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {!loading && filteredRecords.length === 0 && <EmptyState />}
        {loading && records.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading Cashfree events from Firestore…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredRecords.map((record) => {
          const difference = record.cashfreeAmountPaise - record.amountPaise;
          return (
            <div key={record.reconciliationId} className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-slate-900">{record.reconciliationId}</p>
                  <p className="mt-1 text-xs text-slate-500">{record.paymentId}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(record.reconciliationStatus)}`}>{record.reconciliationStatus}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <MobileInfo label="Cashfree Order" value={record.cashfreeOrderId} />
                <MobileInfo label="Transaction" value={`${record.entityType} / ${record.entityId}`} />
                <MobileInfo label="Amount" value={formatCurrency(record.amountPaise)} />
                <MobileInfo label="Payment" value={record.paymentStatus} />
                <MobileInfo label="Event" value={record.eventType} />
                <MobileInfo label="Signature" value={record.signatureVerified ? "VERIFIED" : "FAILED"} />
              </div>
              {difference !== 0 && (
                <div className="mt-4 rounded-lg bg-red-50 p-3">
                  <p className="text-xs font-bold text-red-700">Amount Difference</p>
                  <p className="mt-1 text-sm font-bold text-red-700">{formatCurrency(Math.abs(difference))}</p>
                </div>
              )}
              <button type="button" onClick={() => openDetails(record)} className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                View Reconciliation Details
              </button>
            </div>
          );
        })}
        {!loading && filteredRecords.length === 0 && <EmptyState />}
      </div>

      {showDetails && selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Reconciliation Details</h2>
                <p className="mt-1 text-xs text-slate-500">{selectedRecord.reconciliationId}</p>
              </div>
              <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400 hover:text-slate-700">×</button>
            </div>
            <div className="space-y-6 p-6">
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Reconciliation Status</p>
                    <span className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(selectedRecord.reconciliationStatus)}`}>{selectedRecord.reconciliationStatus}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Payment Status</p>
                    <span className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getPaymentClasses(selectedRecord.paymentStatus)}`}>{selectedRecord.paymentStatus}</span>
                  </div>
                </div>
              </div>
              <DetailsSection title="Payment Identifiers">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DetailItem label="Reconciliation ID" value={selectedRecord.reconciliationId} />
                  <DetailItem label="Payment ID" value={selectedRecord.paymentId} />
                  <DetailItem label="Cashfree Order ID" value={selectedRecord.cashfreeOrderId} />
                  <DetailItem label="Entity ID" value={selectedRecord.entityId} />
                  <DetailItem label="Entity Type" value={selectedRecord.entityType} />
                  <DetailItem label="Customer ID" value={selectedRecord.customerId} />
                </div>
              </DetailsSection>
              <DetailsSection title="Financial Comparison">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <AmountCard label="Internal Amount" amount={selectedRecord.amountPaise} />
                  <AmountCard label="Cashfree Amount" amount={selectedRecord.cashfreeAmountPaise} />
                  <AmountCard
                    label="Difference"
                    amount={Math.abs(selectedRecord.cashfreeAmountPaise - selectedRecord.amountPaise)}
                    highlight={selectedRecord.cashfreeAmountPaise !== selectedRecord.amountPaise}
                  />
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Currency: <span className="font-semibold">{selectedRecord.currency}</span>
                </p>
              </DetailsSection>
              <DetailsSection title="Cashfree Event">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DetailItem label="Event Type" value={selectedRecord.eventType} />
                  <DetailItem label="Signature" value={selectedRecord.signatureVerified ? "VERIFIED" : "FAILED"} />
                  <DetailItem label="Received At" value={selectedRecord.receivedAt} />
                  <DetailItem label="Reconciled At" value={selectedRecord.reconciledAt || "Not reconciled"} />
                </div>
              </DetailsSection>
              {selectedRecord.mismatchReason && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <p className="text-sm font-bold text-red-800">Investigation / Exception</p>
                  <p className="mt-2 text-sm leading-6 text-red-700">{selectedRecord.mismatchReason}</p>
                </div>
              )}
              <DetailsSection title="Audit Metadata">
                <DetailItem label="Correlation ID" value={selectedRecord.correlationId} />
              </DetailsSection>
              {(selectedRecord.reconciliationStatus === "MISMATCH" ||
                selectedRecord.reconciliationStatus === "INVESTIGATING") && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-5">
                  <p className="text-sm font-bold text-orange-800">Review Required</p>
                  <p className="mt-2 text-xs leading-6 text-orange-700">
                    Requires authoritative backend/finance review before financial resolution.
                  </p>
                  <button
                    type="button"
                    onClick={() => void markResolved()}
                    disabled={actionLoading}
                    className="mt-4 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                  >
                    {actionLoading ? "Updating…" : "Mark as Resolved"}
                  </button>
                </div>
              )}
            </div>
            <div className="border-t border-slate-200 p-6">
              <button type="button" onClick={() => setShowDetails(false)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">Financial Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          Cashfree reconciliation is an audit control. Webhooks must be
          signature-verified by the trusted backend. Payment and ledger data in
          Firestore remain authoritative.
        </p>
        <div className="mt-4 rounded-lg border border-orange-200 bg-white p-4">
          <p className="text-xs font-bold text-slate-700">Production flow</p>
          <p className="mt-2 text-xs leading-6 text-slate-500">
            Cashfree Webhook → Signature Verification → cashfree_events →
            payments → Reconciliation → Exception / Audit Log → Ledger /
            Settlement
          </p>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, description, icon, iconClass }: { title: string; value: string; description: string; icon: string; iconClass: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}>{icon}</div>
      </div>
    </div>
  );
}

function FlowStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{number}</div>
      <div>
        <p className="text-xs font-bold text-blue-900">{title}</p>
        <p className="mt-0.5 text-[10px] text-blue-700">{description}</p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return <div className="hidden text-blue-300 md:block">→</div>;
}

function MobileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 break-words text-xs font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function DetailsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-all text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function AmountCard({ label, amount, highlight = false }: { label: string; amount: number; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-4 ${highlight ? "border-red-200 bg-red-50" : "border-slate-200 bg-slate-50"}`}>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-lg font-bold ${highlight ? "text-red-700" : "text-slate-900"}`}>{formatCurrency(amount)}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">🔍</div>
      <h3 className="mt-4 text-base font-bold text-slate-900">No reconciliation records found</h3>
      <p className="mt-1 text-sm text-slate-500">
        Empty cashfree_events collection or filters too narrow.
      </p>
    </div>
  );
}