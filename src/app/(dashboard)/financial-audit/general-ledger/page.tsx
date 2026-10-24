// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type AccountType =
//   | "CUSTOMER"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "JUONE"
//   | "PLATFORM"
//   | "TAX"
//   | "GATEWAY";

// type TransactionType =
//   | "ORDER_PAYMENT"
//   | "COMMISSION"
//   | "CAPTAIN_EARNING"
//   | "TAX"
//   | "GATEWAY_FEE"
//   | "REFUND"
//   | "SETTLEMENT"
//   | "ADJUSTMENT";

// type LedgerStatus =
//   | "POSTED"
//   | "PENDING"
//   | "REVERSED"
//   | "HELD";

// type ModuleId =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// type LedgerEntry = {
//   ledgerEntryId: string;
//   transactionId: string;
//   accountType: AccountType;
//   accountId: string;
//   accountName: string;

//   transactionType: TransactionType;
//   moduleId: ModuleId;

//   debitPaise: number;
//   creditPaise: number;

//   currency: string;
//   status: LedgerStatus;

//   description: string;

//   referenceId: string;
//   correlationId: string;

//   createdAt: string;
//   postedAt?: string;
// };

// const INITIAL_ENTRIES: LedgerEntry[] = [
//   {
//     ledgerEntryId: "LED-10001",
//     transactionId: "TXN-10001",
//     accountType: "CUSTOMER",
//     accountId: "CUS-10001",
//     accountName: "Customer Account",
//     transactionType: "ORDER_PAYMENT",
//     moduleId: "JUCART",
//     debitPaise: 101500,
//     creditPaise: 0,
//     currency: "INR",
//     status: "POSTED",
//     description: "Customer payment for food order",
//     referenceId: "ORD-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:12 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10002",
//     transactionId: "TXN-10001",
//     accountType: "VENDOR",
//     accountId: "VEN-10001",
//     accountName: "Food Vendor",
//     transactionType: "SETTLEMENT",
//     moduleId: "JUCART",
//     debitPaise: 0,
//     creditPaise: 68760,
//     currency: "INR",
//     status: "POSTED",
//     description: "Vendor share from completed order",
//     referenceId: "ORD-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:13 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10003",
//     transactionId: "TXN-10001",
//     accountType: "CAPTAIN",
//     accountId: "CAP-10001",
//     accountName: "Captain Account",
//     transactionType: "CAPTAIN_EARNING",
//     moduleId: "JUCART",
//     debitPaise: 0,
//     creditPaise: 8000,
//     currency: "INR",
//     status: "POSTED",
//     description: "Captain delivery earning",
//     referenceId: "ORD-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:13 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10004",
//     transactionId: "TXN-10001",
//     accountType: "TAX",
//     accountId: "GST-INDIA",
//     accountName: "GST Account",
//     transactionType: "TAX",
//     moduleId: "JUCART",
//     debitPaise: 0,
//     creditPaise: 4500,
//     currency: "INR",
//     status: "POSTED",
//     description: "GST component from customer transaction",
//     referenceId: "ORD-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:13 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10005",
//     transactionId: "TXN-10001",
//     accountType: "JUONE",
//     accountId: "JUONE-PLATFORM",
//     accountName: "JUONE Commission",
//     transactionType: "COMMISSION",
//     moduleId: "JUCART",
//     debitPaise: 0,
//     creditPaise: 18000,
//     currency: "INR",
//     status: "POSTED",
//     description: "Platform commission",
//     referenceId: "ORD-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:13 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10006",
//     transactionId: "TXN-10001",
//     accountType: "GATEWAY",
//     accountId: "CASHFREE",
//     accountName: "Cashfree Gateway",
//     transactionType: "GATEWAY_FEE",
//     moduleId: "JUCART",
//     debitPaise: 0,
//     creditPaise: 1000,
//     currency: "INR",
//     status: "POSTED",
//     description: "Payment gateway fee",
//     referenceId: "PAY-10001",
//     correlationId: "CORR-20261005-10001",
//     createdAt: "05 Oct 2026, 09:13 AM",
//     postedAt: "05 Oct 2026, 09:13 AM",
//   },
//   {
//     ledgerEntryId: "LED-10007",
//     transactionId: "TXN-10002",
//     accountType: "CUSTOMER",
//     accountId: "CUS-10002",
//     accountName: "Customer Account",
//     transactionType: "ORDER_PAYMENT",
//     moduleId: "JURIDE",
//     debitPaise: 18000,
//     creditPaise: 0,
//     currency: "INR",
//     status: "POSTED",
//     description: "Ride payment",
//     referenceId: "RIDE-10002",
//     correlationId: "CORR-20261005-10002",
//     createdAt: "05 Oct 2026, 10:02 AM",
//     postedAt: "05 Oct 2026, 10:03 AM",
//   },
//   {
//     ledgerEntryId: "LED-10008",
//     transactionId: "TXN-10002",
//     accountType: "CAPTAIN",
//     accountId: "CAP-10002",
//     accountName: "Captain Account",
//     transactionType: "CAPTAIN_EARNING",
//     moduleId: "JURIDE",
//     debitPaise: 0,
//     creditPaise: 14000,
//     currency: "INR",
//     status: "POSTED",
//     description: "Captain ride earning",
//     referenceId: "RIDE-10002",
//     correlationId: "CORR-20261005-10002",
//     createdAt: "05 Oct 2026, 10:03 AM",
//     postedAt: "05 Oct 2026, 10:03 AM",
//   },
//   {
//     ledgerEntryId: "LED-10009",
//     transactionId: "TXN-10002",
//     accountType: "JUONE",
//     accountId: "JUONE-PLATFORM",
//     accountName: "JUONE Platform",
//     transactionType: "COMMISSION",
//     moduleId: "JURIDE",
//     debitPaise: 0,
//     creditPaise: 3000,
//     currency: "INR",
//     status: "POSTED",
//     description: "Ride platform commission",
//     referenceId: "RIDE-10002",
//     correlationId: "CORR-20261005-10002",
//     createdAt: "05 Oct 2026, 10:03 AM",
//     postedAt: "05 Oct 2026, 10:03 AM",
//   },
//   {
//     ledgerEntryId: "LED-10010",
//     transactionId: "TXN-10003",
//     accountType: "VENDOR",
//     accountId: "VEN-10002",
//     accountName: "Hotel Vendor",
//     transactionType: "SETTLEMENT",
//     moduleId: "JUSTAY",
//     debitPaise: 0,
//     creditPaise: 450000,
//     currency: "INR",
//     status: "PENDING",
//     description: "Hotel booking settlement pending approval",
//     referenceId: "BOOK-10003",
//     correlationId: "CORR-20261005-10003",
//     createdAt: "05 Oct 2026, 11:15 AM",
//   },
//   {
//     ledgerEntryId: "LED-10011",
//     transactionId: "TXN-10004",
//     accountType: "CUSTOMER",
//     accountId: "CUS-10004",
//     accountName: "Customer Account",
//     transactionType: "REFUND",
//     moduleId: "JUSHOPPING",
//     debitPaise: 76000,
//     creditPaise: 0,
//     currency: "INR",
//     status: "REVERSED",
//     description: "Customer refund for cancelled order",
//     referenceId: "ORD-10004",
//     correlationId: "CORR-20261005-10004",
//     createdAt: "05 Oct 2026, 12:05 PM",
//     postedAt: "05 Oct 2026, 12:06 PM",
//   },
//   {
//     ledgerEntryId: "LED-10012",
//     transactionId: "TXN-10005",
//     accountType: "PLATFORM",
//     accountId: "JUONE-PLATFORM",
//     accountName: "Platform Adjustment",
//     transactionType: "ADJUSTMENT",
//     moduleId: "JUHOME",
//     debitPaise: 5000,
//     creditPaise: 0,
//     currency: "INR",
//     status: "HELD",
//     description: "Manual adjustment awaiting audit approval",
//     referenceId: "ADJ-10005",
//     correlationId: "CORR-20261005-10005",
//     createdAt: "05 Oct 2026, 01:10 PM",
//   },
// ];

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function getStatusClasses(status: LedgerStatus) {
//   switch (status) {
//     case "POSTED":
//       return "bg-green-100 text-green-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "REVERSED":
//       return "bg-purple-100 text-purple-700";

//     case "HELD":
//       return "bg-red-100 text-red-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getAccountClasses(accountType: AccountType) {
//   switch (accountType) {
//     case "CUSTOMER":
//       return "bg-blue-50 text-blue-700";

//     case "VENDOR":
//       return "bg-orange-50 text-orange-700";

//     case "CAPTAIN":
//       return "bg-green-50 text-green-700";

//     case "JUONE":
//       return "bg-purple-50 text-purple-700";

//     case "PLATFORM":
//       return "bg-slate-100 text-slate-700";

//     case "TAX":
//       return "bg-yellow-50 text-yellow-700";

//     case "GATEWAY":
//       return "bg-pink-50 text-pink-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(moduleId: ModuleId) {
//   switch (moduleId) {
//     case "JUCART":
//       return "bg-orange-50 text-orange-700";

//     case "JURIDE":
//       return "bg-blue-50 text-blue-700";

//     case "JUSTAY":
//       return "bg-purple-50 text-purple-700";

//     case "JUHOME":
//       return "bg-green-50 text-green-700";

//     case "JUSHOPPING":
//       return "bg-pink-50 text-pink-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getTransactionLabel(
//   transactionType: TransactionType
// ) {
//   switch (transactionType) {
//     case "ORDER_PAYMENT":
//       return "Order Payment";

//     case "COMMISSION":
//       return "Commission";

//     case "CAPTAIN_EARNING":
//       return "Captain Earning";

//     case "TAX":
//       return "Tax";

//     case "GATEWAY_FEE":
//       return "Gateway Fee";

//     case "REFUND":
//       return "Refund";

//     case "SETTLEMENT":
//       return "Settlement";

//     case "ADJUSTMENT":
//       return "Adjustment";

//     default:
//       return transactionType;
//   }
// }

// export default function GeneralLedgerPage() {
//   const [entries, setEntries] =
//     useState<LedgerEntry[]>(INITIAL_ENTRIES);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | LedgerStatus>("ALL");

//   const [accountFilter, setAccountFilter] =
//     useState<"ALL" | AccountType>("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState<"ALL" | ModuleId>("ALL");

//   const [transactionFilter, setTransactionFilter] =
//     useState<
//       "ALL" | TransactionType
//     >("ALL");

//   const [selectedEntry, setSelectedEntry] =
//     useState<LedgerEntry | null>(null);

//   const [showDetails, setShowDetails] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredEntries = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return entries.filter((entry) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         entry.ledgerEntryId
//           .toLowerCase()
//           .includes(searchValue) ||
//         entry.transactionId
//           .toLowerCase()
//           .includes(searchValue) ||
//         entry.accountId
//           .toLowerCase()
//           .includes(searchValue) ||
//         entry.accountName
//           .toLowerCase()
//           .includes(searchValue) ||
//         entry.referenceId
//           .toLowerCase()
//           .includes(searchValue) ||
//         entry.correlationId
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         entry.status === statusFilter;

//       const matchesAccount =
//         accountFilter === "ALL" ||
//         entry.accountType === accountFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         entry.moduleId === moduleFilter;

//       const matchesTransaction =
//         transactionFilter === "ALL" ||
//         entry.transactionType ===
//           transactionFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesAccount &&
//         matchesModule &&
//         matchesTransaction
//       );
//     });
//   }, [
//     entries,
//     search,
//     statusFilter,
//     accountFilter,
//     moduleFilter,
//     transactionFilter,
//   ]);

//   const totalDebit = entries.reduce(
//     (total, entry) =>
//       total + entry.debitPaise,
//     0
//   );

//   const totalCredit = entries.reduce(
//     (total, entry) =>
//       total + entry.creditPaise,
//     0
//   );

//   const postedCount = entries.filter(
//     (entry) => entry.status === "POSTED"
//   ).length;

//   const pendingCount = entries.filter(
//     (entry) => entry.status === "PENDING"
//   ).length;

//   const heldCount = entries.filter(
//     (entry) => entry.status === "HELD"
//   ).length;

//   const reversedCount = entries.filter(
//     (entry) => entry.status === "REVERSED"
//   ).length;

//   const netMovement =
//     totalCredit - totalDebit;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setAccountFilter("ALL");
//     setModuleFilter("ALL");
//     setTransactionFilter("ALL");
//   }

//   function openDetails(entry: LedgerEntry) {
//     setSelectedEntry(entry);
//     setShowDetails(true);
//   }

//   function markAsPosted() {
//     if (!selectedEntry) {
//       return;
//     }

//     setEntries((currentEntries) =>
//       currentEntries.map((entry) =>
//         entry.ledgerEntryId ===
//         selectedEntry.ledgerEntryId
//           ? {
//               ...entry,
//               status: "POSTED",
//               postedAt: "Just now",
//             }
//           : entry
//       )
//     );

//     setSelectedEntry((current) =>
//       current
//         ? {
//             ...current,
//             status: "POSTED",
//             postedAt: "Just now",
//           }
//         : null
//     );

//     setSuccessMessage(
//       `${selectedEntry.ledgerEntryId} marked as posted.`
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
//           General Ledger
//         </span>

//       </div>

//       {/* HEADER */}

//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

//         <div>

//           <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
//             General Ledger
//           </h1>

//           <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
//             Review authoritative financial ledger entries
//             across JUONE modules, vendors, captains,
//             customers, taxes and platform accounts.
//           </p>

//         </div>

//         <div className="rounded-xl bg-white px-5 py-4 shadow-sm">

//           <p className="text-xs text-slate-500">
//             Ledger Entries
//           </p>

//           <p className="mt-1 text-2xl font-bold text-slate-900">
//             {entries.length}
//           </p>

//         </div>

//       </div>

//       {/* SUCCESS */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* ACCOUNTING FLOW */}

//       <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">

//         <p className="text-sm font-bold text-blue-900">
//           JUERP Ledger Flow
//         </p>

//         <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

//           <FlowStep
//             number="1"
//             title="Transaction"
//             description="Order / Ride / Booking"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="2"
//             title="Trusted Calculation"
//             description="Backend / ERP rules"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="3"
//             title="Ledger Entry"
//             description="Debit / Credit"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="4"
//             title="Audit"
//             description="Correlation & reference"
//           />

//           <FlowArrow />

//           <FlowStep
//             number="5"
//             title="Settlement"
//             description="Vendor / Captain / Platform"
//           />

//         </div>

//       </div>

//       {/* SUMMARY CARDS */}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

//         <SummaryCard
//           title="Total Debit"
//           value={formatCurrency(totalDebit)}
//           description="All ledger debits"
//           icon="↓"
//           iconClass="bg-red-100 text-red-700"
//         />

//         <SummaryCard
//           title="Total Credit"
//           value={formatCurrency(totalCredit)}
//           description="All ledger credits"
//           icon="↑"
//           iconClass="bg-green-100 text-green-700"
//         />

//         <SummaryCard
//           title="Net Movement"
//           value={formatCurrency(
//             Math.abs(netMovement)
//           )}
//           description={
//             netMovement >= 0
//               ? "Net credit movement"
//               : "Net debit movement"
//           }
//           icon="₹"
//           iconClass="bg-blue-100 text-blue-700"
//         />

//         <SummaryCard
//           title="Posted"
//           value={postedCount.toString()}
//           description="Posted entries"
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />

//         <SummaryCard
//           title="Needs Review"
//           value={(
//             pendingCount +
//             heldCount
//           ).toString()}
//           description={`${reversedCount} reversed`}
//           icon="!"
//           iconClass="bg-orange-100 text-orange-700"
//         />

//       </div>

//       {/* BALANCE INFORMATION */}

//       <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">

//         <BalanceCard
//           title="Debit Entries"
//           value={entries.filter(
//             (entry) => entry.debitPaise > 0
//           ).length}
//           description="Entries containing debit movement"
//         />

//         <BalanceCard
//           title="Credit Entries"
//           value={entries.filter(
//             (entry) => entry.creditPaise > 0
//           ).length}
//           description="Entries containing credit movement"
//         />

//         <BalanceCard
//           title="Pending / Held"
//           value={
//             entries.filter(
//               (entry) =>
//                 entry.status === "PENDING" ||
//                 entry.status === "HELD"
//             ).length
//           }
//           description="Entries requiring financial review"
//         />

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

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
//               placeholder="Ledger ID, account, reference..."
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
//                     | LedgerStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Statuses
//               </option>
//               <option value="POSTED">
//                 Posted
//               </option>
//               <option value="PENDING">
//                 Pending
//               </option>
//               <option value="REVERSED">
//                 Reversed
//               </option>
//               <option value="HELD">
//                 Held
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Account
//             </label>

//             <select
//               value={accountFilter}
//               onChange={(event) =>
//                 setAccountFilter(
//                   event.target.value as
//                     | "ALL"
//                     | AccountType
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Accounts
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
//               <option value="JUONE">
//                 JUONE
//               </option>
//               <option value="PLATFORM">
//                 Platform
//               </option>
//               <option value="TAX">
//                 Tax
//               </option>
//               <option value="GATEWAY">
//                 Gateway
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Module
//             </label>

//             <select
//               value={moduleFilter}
//               onChange={(event) =>
//                 setModuleFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ModuleId
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Modules
//               </option>
//               <option value="JUCART">
//                 JUCART
//               </option>
//               <option value="JURIDE">
//                 JURIDE
//               </option>
//               <option value="JUSTAY">
//                 JUSTAY
//               </option>
//               <option value="JUHOME">
//                 JUHOME
//               </option>
//               <option value="JUSHOPPING">
//                 JUSHOPPING
//               </option>
//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Transaction
//             </label>

//             <select
//               value={transactionFilter}
//               onChange={(event) =>
//                 setTransactionFilter(
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
//               <option value="ORDER_PAYMENT">
//                 Order Payment
//               </option>
//               <option value="COMMISSION">
//                 Commission
//               </option>
//               <option value="CAPTAIN_EARNING">
//                 Captain Earning
//               </option>
//               <option value="TAX">
//                 Tax
//               </option>
//               <option value="GATEWAY_FEE">
//                 Gateway Fee
//               </option>
//               <option value="REFUND">
//                 Refund
//               </option>
//               <option value="SETTLEMENT">
//                 Settlement
//               </option>
//               <option value="ADJUSTMENT">
//                 Adjustment
//               </option>
//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredEntries.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {entries.length}
//             </span>{" "}
//             ledger entries
//           </p>

//           {(search ||
//             statusFilter !== "ALL" ||
//             accountFilter !== "ALL" ||
//             moduleFilter !== "ALL" ||
//             transactionFilter !== "ALL") && (
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

//           <table className="w-full min-w-[1450px]">

//             <thead className="border-b border-slate-200 bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Ledger Entry
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Account
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Transaction
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Debit
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Credit
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Module
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

//               {filteredEntries.map((entry) => (
//                 <tr
//                   key={entry.ledgerEntryId}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-bold text-slate-900">
//                       {entry.ledgerEntryId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {entry.transactionId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {entry.referenceId}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-md px-2 py-1 text-[10px] font-bold ${getAccountClasses(
//                         entry.accountType
//                       )}`}
//                     >
//                       {entry.accountType}
//                     </span>

//                     <p className="mt-2 text-xs font-semibold text-slate-800">
//                       {entry.accountId}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {entry.accountName}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-xs font-bold text-slate-800">
//                       {getTransactionLabel(
//                         entry.transactionType
//                       )}
//                     </p>

//                     <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-400">
//                       {entry.description}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     {entry.debitPaise > 0 ? (
//                       <p className="text-sm font-bold text-red-600">
//                         {formatCurrency(
//                           entry.debitPaise
//                         )}
//                       </p>
//                     ) : (
//                       <span className="text-sm text-slate-300">
//                         —
//                       </span>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     {entry.creditPaise > 0 ? (
//                       <p className="text-sm font-bold text-green-600">
//                         {formatCurrency(
//                           entry.creditPaise
//                         )}
//                       </p>
//                     ) : (
//                       <span className="text-sm text-slate-300">
//                         —
//                       </span>
//                     )}

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                         entry.moduleId
//                       )}`}
//                     >
//                       {entry.moduleId}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                         entry.status
//                       )}`}
//                     >
//                       {entry.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <div className="flex justify-end">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(entry)
//                         }
//                         className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                       >
//                         View
//                       </button>

//                     </div>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredEntries.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}

//       <div className="grid grid-cols-1 gap-4 lg:hidden">

//         {filteredEntries.map((entry) => (
//           <div
//             key={entry.ledgerEntryId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {entry.ledgerEntryId}
//                 </p>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {entry.transactionId}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   entry.status
//                 )}`}
//               >
//                 {entry.status}
//               </span>

//             </div>

//             <div className="mt-5 grid grid-cols-2 gap-4">

//               <MobileInfo
//                 label="Account"
//                 value={`${entry.accountType} / ${entry.accountId}`}
//               />

//               <MobileInfo
//                 label="Transaction"
//                 value={getTransactionLabel(
//                   entry.transactionType
//                 )}
//               />

//               <MobileInfo
//                 label="Debit"
//                 value={
//                   entry.debitPaise > 0
//                     ? formatCurrency(
//                         entry.debitPaise
//                       )
//                     : "—"
//                 }
//               />

//               <MobileInfo
//                 label="Credit"
//                 value={
//                   entry.creditPaise > 0
//                     ? formatCurrency(
//                         entry.creditPaise
//                       )
//                     : "—"
//                 }
//               />

//               <MobileInfo
//                 label="Module"
//                 value={entry.moduleId}
//               />

//               <MobileInfo
//                 label="Reference"
//                 value={entry.referenceId}
//               />

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 openDetails(entry)
//               }
//               className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               View Ledger Details
//             </button>

//           </div>
//         ))}

//         {filteredEntries.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* DETAILS MODAL */}

//       {showDetails && selectedEntry && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             {/* HEADER */}

//             <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Ledger Entry Details
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {selectedEntry.ledgerEntryId}
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
//                       Ledger Status
//                     </p>

//                     <span
//                       className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
//                         selectedEntry.status
//                       )}`}
//                     >
//                       {selectedEntry.status}
//                     </span>

//                   </div>

//                   <div>

//                     <p className="text-xs text-slate-500">
//                       Module
//                     </p>

//                     <span
//                       className={`mt-2 inline-flex rounded-md px-3 py-1.5 text-xs font-semibold ${getModuleClasses(
//                         selectedEntry.moduleId
//                       )}`}
//                     >
//                       {selectedEntry.moduleId}
//                     </span>

//                   </div>

//                 </div>

//               </div>

//               {/* IDENTIFIERS */}

//               <DetailsSection title="Ledger Identifiers">

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                   <DetailItem
//                     label="Ledger Entry ID"
//                     value={
//                       selectedEntry.ledgerEntryId
//                     }
//                   />

//                   <DetailItem
//                     label="Transaction ID"
//                     value={
//                       selectedEntry.transactionId
//                     }
//                   />

//                   <DetailItem
//                     label="Reference ID"
//                     value={
//                       selectedEntry.referenceId
//                     }
//                   />

//                   <DetailItem
//                     label="Correlation ID"
//                     value={
//                       selectedEntry.correlationId
//                     }
//                   />

//                 </div>

//               </DetailsSection>

//               {/* ACCOUNT */}

//               <DetailsSection title="Account">

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                   <DetailItem
//                     label="Account Type"
//                     value={
//                       selectedEntry.accountType
//                     }
//                   />

//                   <DetailItem
//                     label="Account ID"
//                     value={
//                       selectedEntry.accountId
//                     }
//                   />

//                   <DetailItem
//                     label="Account Name"
//                     value={
//                       selectedEntry.accountName
//                     }
//                   />

//                   <DetailItem
//                     label="Module"
//                     value={
//                       selectedEntry.moduleId
//                     }
//                   />

//                 </div>

//               </DetailsSection>

//               {/* TRANSACTION */}

//               <DetailsSection title="Transaction">

//                 <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

//                   <DetailItem
//                     label="Transaction Type"
//                     value={getTransactionLabel(
//                       selectedEntry.transactionType
//                     )}
//                   />

//                   <DetailItem
//                     label="Currency"
//                     value={
//                       selectedEntry.currency
//                     }
//                   />

//                   <DetailItem
//                     label="Created At"
//                     value={
//                       selectedEntry.createdAt
//                     }
//                   />

//                   <DetailItem
//                     label="Posted At"
//                     value={
//                       selectedEntry.postedAt ||
//                       "Not posted"
//                     }
//                   />

//                 </div>

//                 <div className="mt-5 rounded-xl bg-slate-50 p-4">

//                   <p className="text-xs font-medium text-slate-500">
//                     Description
//                   </p>

//                   <p className="mt-1 text-sm leading-6 font-semibold text-slate-800">
//                     {selectedEntry.description}
//                   </p>

//                 </div>

//               </DetailsSection>

//               {/* DEBIT CREDIT */}

//               <DetailsSection title="Financial Movement">

//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

//                   <AmountCard
//                     label="Debit"
//                     amount={
//                       selectedEntry.debitPaise
//                     }
//                     type="debit"
//                   />

//                   <AmountCard
//                     label="Credit"
//                     amount={
//                       selectedEntry.creditPaise
//                     }
//                     type="credit"
//                   />

//                   <AmountCard
//                     label="Net"
//                     amount={Math.abs(
//                       selectedEntry.creditPaise -
//                         selectedEntry.debitPaise
//                     )}
//                     type="net"
//                   />

//                 </div>

//                 <p className="mt-4 text-xs text-slate-500">
//                   All money values are represented in
//                   minor currency units in the backend
//                   ledger model.
//                 </p>

//               </DetailsSection>

//               {/* ACTION */}

//               {selectedEntry.status ===
//                 "PENDING" && (
//                 <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

//                   <p className="text-sm font-bold text-yellow-800">
//                     Pending Ledger Entry
//                   </p>

//                   <p className="mt-2 text-xs leading-6 text-yellow-700">
//                     This entry is waiting for the
//                     authoritative financial workflow to
//                     complete.
//                   </p>

//                   <button
//                     type="button"
//                     onClick={markAsPosted}
//                     className="mt-4 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//                   >
//                     Mark as Posted
//                   </button>

//                 </div>
//               )}

//               {selectedEntry.status === "HELD" && (
//                 <div className="rounded-xl border border-red-200 bg-red-50 p-5">

//                   <p className="text-sm font-bold text-red-800">
//                     Ledger Entry on Hold
//                   </p>

//                   <p className="mt-2 text-xs leading-6 text-red-700">
//                     This entry should not be included in
//                     final settlement until the authorized
//                     financial review is completed.
//                   </p>

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
//           The General Ledger is an authoritative financial
//           record. JUERP clients must not independently
//           calculate or rewrite commission, settlement,
//           payment, tax, refund or other financial values.
//           Ledger entries should be generated by the trusted
//           backend using the applicable ERP rules and
//           financial snapshot.
//         </p>

//         <div className="mt-4 rounded-lg border border-orange-200 bg-white p-4">

//           <p className="text-xs font-bold text-slate-700">
//             Production ledger flow
//           </p>

//           <p className="mt-2 text-xs leading-6 text-slate-500">
//             Transaction → Trusted Backend → ERP Financial
//             Rules → Financial Snapshot → ledger_entries →
//             Settlement / Reconciliation → Audit Log
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

// function BalanceCard({
//   title,
//   value,
//   description,
// }: {
//   title: string;
//   value: number;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-5">

//       <p className="text-xs font-medium text-slate-500">
//         {title}
//       </p>

//       <p className="mt-2 text-2xl font-bold text-slate-900">
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-slate-400">
//         {description}
//       </p>

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
//   type = "net",
// }: {
//   label: string;
//   amount: number;
//   type?: "debit" | "credit" | "net";
// }) {
//   const classes =
//     type === "debit"
//       ? "border-red-200 bg-red-50 text-red-700"
//       : type === "credit"
//       ? "border-green-200 bg-green-50 text-green-700"
//       : "border-blue-200 bg-blue-50 text-blue-700";

//   return (
//     <div
//       className={`rounded-xl border p-4 ${classes}`}
//     >

//       <p className="text-xs font-medium">
//         {label}
//       </p>

//       <p className="mt-2 text-lg font-bold">
//         {formatCurrency(amount)}
//       </p>

//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center">

//       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
//         ₹
//       </div>

//       <h3 className="mt-4 text-base font-bold text-slate-900">
//         No ledger entries found
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
  type AccountType,
  type LedgerEntry,
  type LedgerStatus,
  type ModuleId,
  type TransactionType,
} from "@/hooks/useFinancialAudit";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function getStatusClasses(status: LedgerStatus) {
  switch (status) {
    case "POSTED":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "REVERSED":
      return "bg-purple-100 text-purple-700";
    case "HELD":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getAccountClasses(accountType: AccountType) {
  switch (accountType) {
    case "CUSTOMER":
      return "bg-blue-50 text-blue-700";
    case "VENDOR":
      return "bg-orange-50 text-orange-700";
    case "CAPTAIN":
      return "bg-green-50 text-green-700";
    case "JUONE":
      return "bg-purple-50 text-purple-700";
    case "PLATFORM":
      return "bg-slate-100 text-slate-700";
    case "TAX":
      return "bg-yellow-50 text-yellow-700";
    case "GATEWAY":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(moduleId: ModuleId) {
  switch (moduleId) {
    case "JUCART":
      return "bg-orange-50 text-orange-700";
    case "JURIDE":
      return "bg-blue-50 text-blue-700";
    case "JUSTAY":
      return "bg-purple-50 text-purple-700";
    case "JUHOME":
      return "bg-green-50 text-green-700";
    case "JUSHOPPING":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

function getTransactionLabel(transactionType: TransactionType) {
  switch (transactionType) {
    case "ORDER_PAYMENT":
      return "Order Payment";
    case "COMMISSION":
      return "Commission";
    case "CAPTAIN_EARNING":
      return "Captain Earning";
    case "TAX":
      return "Tax";
    case "GATEWAY_FEE":
      return "Gateway Fee";
    case "REFUND":
      return "Refund";
    case "SETTLEMENT":
      return "Settlement";
    case "ADJUSTMENT":
      return "Adjustment";
    default:
      return transactionType;
  }
}

export default function GeneralLedgerPage() {
  const {
    ledgerEntries: entries,
    loading,
    error,
    refresh,
    markLedgerPosted,
  } = useFinancialAudit();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | LedgerStatus>("ALL");
  const [accountFilter, setAccountFilter] = useState<"ALL" | AccountType>("ALL");
  const [moduleFilter, setModuleFilter] = useState<"ALL" | ModuleId>("ALL");
  const [transactionFilter, setTransactionFilter] = useState<
    "ALL" | TransactionType
  >("ALL");
  const [selectedEntry, setSelectedEntry] = useState<LedgerEntry | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const filteredEntries = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesSearch =
        searchValue.length === 0 ||
        entry.ledgerEntryId.toLowerCase().includes(searchValue) ||
        entry.transactionId.toLowerCase().includes(searchValue) ||
        entry.accountId.toLowerCase().includes(searchValue) ||
        entry.accountName.toLowerCase().includes(searchValue) ||
        entry.referenceId.toLowerCase().includes(searchValue) ||
        entry.correlationId.toLowerCase().includes(searchValue);
      const matchesStatus =
        statusFilter === "ALL" || entry.status === statusFilter;
      const matchesAccount =
        accountFilter === "ALL" || entry.accountType === accountFilter;
      const matchesModule =
        moduleFilter === "ALL" || entry.moduleId === moduleFilter;
      const matchesTransaction =
        transactionFilter === "ALL" ||
        entry.transactionType === transactionFilter;
      return (
        matchesSearch &&
        matchesStatus &&
        matchesAccount &&
        matchesModule &&
        matchesTransaction
      );
    });
  }, [
    entries,
    search,
    statusFilter,
    accountFilter,
    moduleFilter,
    transactionFilter,
  ]);

  const totalDebit = entries.reduce((t, e) => t + e.debitPaise, 0);
  const totalCredit = entries.reduce((t, e) => t + e.creditPaise, 0);
  const postedCount = entries.filter((e) => e.status === "POSTED").length;
  const pendingCount = entries.filter((e) => e.status === "PENDING").length;
  const heldCount = entries.filter((e) => e.status === "HELD").length;
  const reversedCount = entries.filter((e) => e.status === "REVERSED").length;
  const netMovement = totalCredit - totalDebit;

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setAccountFilter("ALL");
    setModuleFilter("ALL");
    setTransactionFilter("ALL");
  }

  function openDetails(entry: LedgerEntry) {
    setSelectedEntry(entry);
    setShowDetails(true);
  }

  async function markAsPosted() {
    if (!selectedEntry) return;
    try {
      setActionLoading(true);
      await markLedgerPosted(selectedEntry.ledgerEntryId);
      setSelectedEntry((current) =>
        current
          ? { ...current, status: "POSTED", postedAt: "Just now" }
          : null
      );
      setSuccessMessage(`${selectedEntry.ledgerEntryId} marked as posted.`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err: unknown) {
      setSuccessMessage(
        err instanceof Error ? err.message : "Failed to update ledger status."
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
          General Ledger
        </span>
      </div>

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            General Ledger
          </h1>
          <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
            Live ledger entries from Firestore across JUONE modules, vendors,
            captains, customers, taxes and platform accounts.
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
            <p className="text-xs text-slate-500">Ledger Entries</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">
              {entries.length}
            </p>
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
        <p className="text-sm font-bold text-blue-900">JUERP Ledger Flow</p>
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <FlowStep number="1" title="Transaction" description="Order / Ride / Booking" />
          <FlowArrow />
          <FlowStep number="2" title="Trusted Calculation" description="Backend / ERP rules" />
          <FlowArrow />
          <FlowStep number="3" title="Ledger Entry" description="Debit / Credit" />
          <FlowArrow />
          <FlowStep number="4" title="Audit" description="Correlation & reference" />
          <FlowArrow />
          <FlowStep number="5" title="Settlement" description="Vendor / Captain / Platform" />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SummaryCard title="Total Debit" value={formatCurrency(totalDebit)} description="All ledger debits" icon="↓" iconClass="bg-red-100 text-red-700" />
        <SummaryCard title="Total Credit" value={formatCurrency(totalCredit)} description="All ledger credits" icon="↑" iconClass="bg-green-100 text-green-700" />
        <SummaryCard title="Net Movement" value={formatCurrency(Math.abs(netMovement))} description={netMovement >= 0 ? "Net credit movement" : "Net debit movement"} icon="₹" iconClass="bg-blue-100 text-blue-700" />
        <SummaryCard title="Posted" value={postedCount.toString()} description="Posted entries" icon="✓" iconClass="bg-green-100 text-green-700" />
        <SummaryCard title="Needs Review" value={(pendingCount + heldCount).toString()} description={`${reversedCount} reversed`} icon="!" iconClass="bg-orange-100 text-orange-700" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <BalanceCard title="Debit Entries" value={entries.filter((e) => e.debitPaise > 0).length} description="Entries containing debit movement" />
        <BalanceCard title="Credit Entries" value={entries.filter((e) => e.creditPaise > 0).length} description="Entries containing credit movement" />
        <BalanceCard title="Pending / Held" value={entries.filter((e) => e.status === "PENDING" || e.status === "HELD").length} description="Entries requiring financial review" />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Search</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ledger ID, account, reference..." className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Status</label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as "ALL" | LedgerStatus)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Statuses</option>
              <option value="POSTED">Posted</option>
              <option value="PENDING">Pending</option>
              <option value="REVERSED">Reversed</option>
              <option value="HELD">Held</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Account</label>
            <select value={accountFilter} onChange={(e) => setAccountFilter(e.target.value as "ALL" | AccountType)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Accounts</option>
              <option value="CUSTOMER">Customer</option>
              <option value="VENDOR">Vendor</option>
              <option value="CAPTAIN">Captain</option>
              <option value="JUONE">JUONE</option>
              <option value="PLATFORM">Platform</option>
              <option value="TAX">Tax</option>
              <option value="GATEWAY">Gateway</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Module</label>
            <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value as "ALL" | ModuleId)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Modules</option>
              <option value="JUCART">JUCART</option>
              <option value="JURIDE">JURIDE</option>
              <option value="JUSTAY">JUSTAY</option>
              <option value="JUHOME">JUHOME</option>
              <option value="JUSHOPPING">JUSHOPPING</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold text-slate-600">Transaction</label>
            <select value={transactionFilter} onChange={(e) => setTransactionFilter(e.target.value as "ALL" | TransactionType)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500">
              <option value="ALL">All Transactions</option>
              <option value="ORDER_PAYMENT">Order Payment</option>
              <option value="COMMISSION">Commission</option>
              <option value="CAPTAIN_EARNING">Captain Earning</option>
              <option value="TAX">Tax</option>
              <option value="GATEWAY_FEE">Gateway Fee</option>
              <option value="REFUND">Refund</option>
              <option value="SETTLEMENT">Settlement</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing <span className="font-semibold text-slate-800">{filteredEntries.length}</span> of{" "}
            <span className="font-semibold text-slate-800">{entries.length}</span> ledger entries
            {loading ? " · Loading…" : ""}
          </p>
          {(search || statusFilter !== "ALL" || accountFilter !== "ALL" || moduleFilter !== "ALL" || transactionFilter !== "ALL") && (
            <button type="button" onClick={clearFilters} className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1450px]">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Ledger Entry</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Account</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Transaction</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Debit</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Credit</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Module</th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEntries.map((entry) => (
                <tr key={entry.ledgerEntryId} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{entry.ledgerEntryId}</p>
                    <p className="mt-1 text-xs text-slate-500">{entry.transactionId}</p>
                    <p className="mt-1 text-xs text-slate-400">{entry.referenceId}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${getAccountClasses(entry.accountType)}`}>{entry.accountType}</span>
                    <p className="mt-2 text-xs font-semibold text-slate-800">{entry.accountId}</p>
                    <p className="mt-1 text-xs text-slate-400">{entry.accountName}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-slate-800">{getTransactionLabel(entry.transactionType)}</p>
                    <p className="mt-1 max-w-[230px] text-xs leading-5 text-slate-400">{entry.description}</p>
                  </td>
                  <td className="px-5 py-4">
                    {entry.debitPaise > 0 ? (
                      <p className="text-sm font-bold text-red-600">{formatCurrency(entry.debitPaise)}</p>
                    ) : (
                      <span className="text-sm text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {entry.creditPaise > 0 ? (
                      <p className="text-sm font-bold text-green-600">{formatCurrency(entry.creditPaise)}</p>
                    ) : (
                      <span className="text-sm text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(entry.moduleId)}`}>{entry.moduleId}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(entry.status)}`}>{entry.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button type="button" onClick={() => openDetails(entry)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600">
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredEntries.length === 0 && <EmptyState />}
        {loading && entries.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading ledger entries from Firestore…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:hidden">
        {filteredEntries.map((entry) => (
          <div key={entry.ledgerEntryId} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{entry.ledgerEntryId}</p>
                <p className="mt-1 text-xs text-slate-500">{entry.transactionId}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(entry.status)}`}>{entry.status}</span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <MobileInfo label="Account" value={`${entry.accountType} / ${entry.accountId}`} />
              <MobileInfo label="Transaction" value={getTransactionLabel(entry.transactionType)} />
              <MobileInfo label="Debit" value={entry.debitPaise > 0 ? formatCurrency(entry.debitPaise) : "—"} />
              <MobileInfo label="Credit" value={entry.creditPaise > 0 ? formatCurrency(entry.creditPaise) : "—"} />
              <MobileInfo label="Module" value={entry.moduleId} />
              <MobileInfo label="Reference" value={entry.referenceId} />
            </div>
            <button type="button" onClick={() => openDetails(entry)} className="mt-5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              View Ledger Details
            </button>
          </div>
        ))}
        {!loading && filteredEntries.length === 0 && <EmptyState />}
      </div>

      {showDetails && selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Ledger Entry Details</h2>
                <p className="mt-1 text-xs text-slate-500">{selectedEntry.ledgerEntryId}</p>
              </div>
              <button type="button" onClick={() => setShowDetails(false)} className="text-2xl text-slate-400 hover:text-slate-700">×</button>
            </div>
            <div className="space-y-6 p-6">
              <div className="rounded-xl bg-slate-50 p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-slate-500">Ledger Status</p>
                    <span className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(selectedEntry.status)}`}>{selectedEntry.status}</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Module</p>
                    <span className={`mt-2 inline-flex rounded-md px-3 py-1.5 text-xs font-semibold ${getModuleClasses(selectedEntry.moduleId)}`}>{selectedEntry.moduleId}</span>
                  </div>
                </div>
              </div>
              <DetailsSection title="Ledger Identifiers">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DetailItem label="Ledger Entry ID" value={selectedEntry.ledgerEntryId} />
                  <DetailItem label="Transaction ID" value={selectedEntry.transactionId} />
                  <DetailItem label="Reference ID" value={selectedEntry.referenceId} />
                  <DetailItem label="Correlation ID" value={selectedEntry.correlationId} />
                </div>
              </DetailsSection>
              <DetailsSection title="Account">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DetailItem label="Account Type" value={selectedEntry.accountType} />
                  <DetailItem label="Account ID" value={selectedEntry.accountId} />
                  <DetailItem label="Account Name" value={selectedEntry.accountName} />
                  <DetailItem label="Module" value={selectedEntry.moduleId} />
                </div>
              </DetailsSection>
              <DetailsSection title="Transaction">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <DetailItem label="Transaction Type" value={getTransactionLabel(selectedEntry.transactionType)} />
                  <DetailItem label="Currency" value={selectedEntry.currency} />
                  <DetailItem label="Created At" value={selectedEntry.createdAt} />
                  <DetailItem label="Posted At" value={selectedEntry.postedAt || "Not posted"} />
                </div>
                <div className="mt-5 rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-medium text-slate-500">Description</p>
                  <p className="mt-1 text-sm font-semibold leading-6 text-slate-800">{selectedEntry.description}</p>
                </div>
              </DetailsSection>
              <DetailsSection title="Financial Movement">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <AmountCard label="Debit" amount={selectedEntry.debitPaise} type="debit" />
                  <AmountCard label="Credit" amount={selectedEntry.creditPaise} type="credit" />
                  <AmountCard label="Net" amount={Math.abs(selectedEntry.creditPaise - selectedEntry.debitPaise)} type="net" />
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Values come from Firestore ledger_entries (authoritative backend data).
                </p>
              </DetailsSection>
              {selectedEntry.status === "PENDING" && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">
                  <p className="text-sm font-bold text-yellow-800">Pending Ledger Entry</p>
                  <p className="mt-2 text-xs leading-6 text-yellow-700">
                    Waiting for the authoritative financial workflow to complete.
                  </p>
                  <button
                    type="button"
                    onClick={() => void markAsPosted()}
                    disabled={actionLoading}
                    className="mt-4 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                  >
                    {actionLoading ? "Updating…" : "Mark as Posted"}
                  </button>
                </div>
              )}
              {selectedEntry.status === "HELD" && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <p className="text-sm font-bold text-red-800">Ledger Entry on Hold</p>
                  <p className="mt-2 text-xs leading-6 text-red-700">
                    Should not be included in final settlement until authorized review is completed.
                  </p>
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
          The General Ledger is an authoritative financial record from Firestore.
          Clients must not independently calculate commission, settlement, payment,
          tax, refund or other financial values.
        </p>
        <div className="mt-4 rounded-lg border border-orange-200 bg-white p-4">
          <p className="text-xs font-bold text-slate-700">Production ledger flow</p>
          <p className="mt-2 text-xs leading-6 text-slate-500">
            Transaction → Trusted Backend → ERP Rules → Financial Snapshot →
            ledger_entries → Settlement / Reconciliation → Audit Log
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
          <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}>{icon}</div>
      </div>
    </div>
  );
}

function BalanceCard({ title, value, description }: { title: string; value: number; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
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

function AmountCard({ label, amount, type = "net" }: { label: string; amount: number; type?: "debit" | "credit" | "net" }) {
  const classes =
    type === "debit"
      ? "border-red-200 bg-red-50 text-red-700"
      : type === "credit"
        ? "border-green-200 bg-green-50 text-green-700"
        : "border-blue-200 bg-blue-50 text-blue-700";
  return (
    <div className={`rounded-xl border p-4 ${classes}`}>
      <p className="text-xs font-medium">{label}</p>
      <p className="mt-2 text-lg font-bold">{formatCurrency(amount)}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">₹</div>
      <h3 className="mt-4 text-base font-bold text-slate-900">No ledger entries found</h3>
      <p className="mt-1 text-sm text-slate-500">
        Empty ledger_entries collection or filters too narrow.
      </p>
    </div>
  );
}