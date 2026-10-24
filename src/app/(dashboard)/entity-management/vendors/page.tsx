// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type VendorStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// type VerificationStatus =
//   | "DRAFT"
//   | "SUBMITTED"
//   | "PENDING"
//   | "ACTIVE"
//   | "REJECTED";

// type VendorModule =
//   | "FOOD"
//   | "MART"
//   | "PHARMACY"
//   | "SHOPPING"
//   | "STAY"
//   | "HOME_SERVICES";

// type Vendor = {
//   vendorId: string;
//   userId: string;

//   businessName: string;
//   ownerName: string;
//   phone: string;
//   email: string;

//   status: VendorStatus;
//   verificationStatus: VerificationStatus;

//   stateId: string;
//   stateName: string;

//   districtId: string;
//   districtName: string;

//   pincode: string;
//   address: string;

//   joinedAt: string;
//   lastActiveAt: string;

//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;

//   modules: VendorModule[];

//   businessType: string;
// };

// const INITIAL_VENDORS: Vendor[] = [
//   {
//     vendorId: "VEN-10001",
//     userId: "USR-VEN-10001",
//     businessName: "Fresh Food Restaurant",
//     ownerName: "Ravi Kumar",
//     phone: "+91 98765 30001",
//     email: "freshfood@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522001",
//     address: "Lakshmipuram Main Road, Guntur",
//     joinedAt: "12 Aug 2026",
//     lastActiveAt: "Today, 8:35 PM",
//     rating: 4.6,
//     totalOrders: 1250,
//     completedOrders: 1185,
//     cancelledOrders: 28,
//     modules: ["FOOD", "MART"],
//     businessType: "Restaurant",
//   },
//   {
//     vendorId: "VEN-10002",
//     userId: "USR-VEN-10002",
//     businessName: "Sri Lakshmi Mart",
//     ownerName: "Lakshmi Devi",
//     phone: "+91 98765 30002",
//     email: "srilakshmimart@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522007",
//     address: "Brodipet, Guntur",
//     joinedAt: "18 Aug 2026",
//     lastActiveAt: "Today, 7:42 PM",
//     rating: 4.4,
//     totalOrders: 892,
//     completedOrders: 850,
//     cancelledOrders: 16,
//     modules: ["MART"],
//     businessType: "Retail Store",
//   },
//   {
//     vendorId: "VEN-10003",
//     userId: "USR-VEN-10003",
//     businessName: "HealthCare Pharmacy",
//     ownerName: "Suresh Rao",
//     phone: "+91 98765 30003",
//     email: "healthcare@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VJA",
//     districtName: "NTR",
//     pincode: "520010",
//     address: "MG Road, Vijayawada",
//     joinedAt: "22 Aug 2026",
//     lastActiveAt: "Today, 6:58 PM",
//     rating: 4.8,
//     totalOrders: 1560,
//     completedOrders: 1492,
//     cancelledOrders: 21,
//     modules: ["PHARMACY"],
//     businessType: "Pharmacy",
//   },
//   {
//     vendorId: "VEN-10004",
//     userId: "USR-VEN-10004",
//     businessName: "Urban Fashion Hub",
//     ownerName: "Anil Reddy",
//     phone: "+91 98765 30004",
//     email: "urbanfashion@example.com",
//     status: "PENDING" as VendorStatus,
//     verificationStatus: "PENDING",
//     stateId: "TS",
//     stateName: "Telangana",
//     districtId: "HYD",
//     districtName: "Hyderabad",
//     pincode: "500001",
//     address: "Abids, Hyderabad",
//     joinedAt: "28 Sep 2026",
//     lastActiveAt: "Yesterday, 5:20 PM",
//     rating: 0,
//     totalOrders: 0,
//     completedOrders: 0,
//     cancelledOrders: 0,
//     modules: ["SHOPPING"],
//     businessType: "Fashion Store",
//   },
//   {
//     vendorId: "VEN-10005",
//     userId: "USR-VEN-10005",
//     businessName: "Green Leaf Stay",
//     ownerName: "Priya Sharma",
//     phone: "+91 98765 30005",
//     email: "greenleaf@example.com",
//     status: "SUSPENDED",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VSK",
//     districtName: "Visakhapatnam",
//     pincode: "530017",
//     address: "MVP Colony, Visakhapatnam",
//     joinedAt: "04 Jul 2026",
//     lastActiveAt: "02 Oct 2026",
//     rating: 4.2,
//     totalOrders: 425,
//     completedOrders: 389,
//     cancelledOrders: 14,
//     modules: ["STAY"],
//     businessType: "Hotel",
//   },
//   {
//     vendorId: "VEN-10006",
//     userId: "USR-VEN-10006",
//     businessName: "HomeCare Services",
//     ownerName: "Mahesh Kumar",
//     phone: "+91 98765 30006",
//     email: "homecare@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522034",
//     address: "Nallapadu, Guntur",
//     joinedAt: "10 Sep 2026",
//     lastActiveAt: "Today, 4:25 PM",
//     rating: 4.5,
//     totalOrders: 315,
//     completedOrders: 294,
//     cancelledOrders: 8,
//     modules: ["HOME_SERVICES"],
//     businessType: "Home Services",
//   },
//   {
//     vendorId: "VEN-10007",
//     userId: "USR-VEN-10007",
//     businessName: "Royal Biryani House",
//     ownerName: "Venkatesh",
//     phone: "+91 98765 30007",
//     email: "royalbiryani@example.com",
//     status: "INACTIVE",
//     verificationStatus: "ACTIVE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522003",
//     address: "Arundelpet, Guntur",
//     joinedAt: "15 Jun 2026",
//     lastActiveAt: "25 Sep 2026",
//     rating: 4.1,
//     totalOrders: 680,
//     completedOrders: 621,
//     cancelledOrders: 32,
//     modules: ["FOOD"],
//     businessType: "Restaurant",
//   },
//   {
//     vendorId: "VEN-10008",
//     userId: "USR-VEN-10008",
//     businessName: "Quick Basket",
//     ownerName: "Kiran Kumar",
//     phone: "+91 98765 30008",
//     email: "quickbasket@example.com",
//     status: "BLOCKED",
//     verificationStatus: "REJECTED",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522006",
//     address: "AT Agraharam, Guntur",
//     joinedAt: "02 May 2026",
//     lastActiveAt: "18 Sep 2026",
//     rating: 3.8,
//     totalOrders: 240,
//     completedOrders: 201,
//     cancelledOrders: 25,
//     modules: ["MART"],
//     businessType: "Retail Store",
//   },
// ];

// function getStatusClasses(status: VendorStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getVerificationClasses(
//   status: VerificationStatus
// ) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "SUBMITTED":
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: VendorModule) {
//   switch (module) {
//     case "FOOD":
//       return "bg-orange-50 text-orange-700";

//     case "MART":
//       return "bg-blue-50 text-blue-700";

//     case "PHARMACY":
//       return "bg-green-50 text-green-700";

//     case "SHOPPING":
//       return "bg-pink-50 text-pink-700";

//     case "STAY":
//       return "bg-purple-50 text-purple-700";

//     case "HOME_SERVICES":
//       return "bg-cyan-50 text-cyan-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getModuleLabel(module: VendorModule) {
//   switch (module) {
//     case "HOME_SERVICES":
//       return "HOME SERVICES";

//     default:
//       return module;
//   }
// }

// export default function VendorsPage() {
//   const [vendors, setVendors] =
//     useState<Vendor[]>(INITIAL_VENDORS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | VendorStatus>("ALL");

//   const [verificationFilter, setVerificationFilter] =
//     useState<"ALL" | VerificationStatus>("ALL");

//   const [moduleFilter, setModuleFilter] =
//     useState<"ALL" | VendorModule>("ALL");

//   const [selectedVendor, setSelectedVendor] =
//     useState<Vendor | null>(null);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredVendors = useMemo(() => {
//     const searchValue = search
//       .trim()
//       .toLowerCase();

//     return vendors.filter((vendor) => {
//       const matchesSearch =
//         searchValue.length === 0 ||
//         vendor.vendorId
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.businessName
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.ownerName
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.phone
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.email
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.districtName
//           .toLowerCase()
//           .includes(searchValue) ||
//         vendor.stateName
//           .toLowerCase()
//           .includes(searchValue);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         vendor.status === statusFilter;

//       const matchesVerification =
//         verificationFilter === "ALL" ||
//         vendor.verificationStatus ===
//           verificationFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         vendor.modules.includes(moduleFilter);

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesVerification &&
//         matchesModule
//       );
//     });
//   }, [
//     vendors,
//     search,
//     statusFilter,
//     verificationFilter,
//     moduleFilter,
//   ]);

//   const activeCount = vendors.filter(
//     (vendor) => vendor.status === "ACTIVE"
//   ).length;

//   const pendingCount = vendors.filter(
//     (vendor) =>
//       vendor.verificationStatus === "PENDING" ||
//       vendor.verificationStatus === "SUBMITTED"
//   ).length;

//   const suspendedCount = vendors.filter(
//     (vendor) => vendor.status === "SUSPENDED"
//   ).length;

//   const blockedCount = vendors.filter(
//     (vendor) => vendor.status === "BLOCKED"
//   ).length;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setVerificationFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openStatusModal(vendor: Vendor) {
//     setSelectedVendor(vendor);
//     setShowStatusModal(true);
//   }

//   function updateVendorStatus(
//     status: VendorStatus
//   ) {
//     if (!selectedVendor) {
//       return;
//     }

//     setVendors((currentVendors) =>
//       currentVendors.map((vendor) =>
//         vendor.vendorId ===
//         selectedVendor.vendorId
//           ? {
//               ...vendor,
//               status,
//             }
//           : vendor
//       )
//     );

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `${selectedVendor.businessName} status changed to ${status}.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//           <div>

//             <div className="flex flex-wrap items-center gap-2">

//               <Link
//                 href="/entity-management"
//                 className="text-sm font-medium text-slate-500 hover:text-orange-600"
//               >
//                 Entity Management
//               </Link>

//               <span className="text-slate-400">
//                 /
//               </span>

//               <span className="text-sm font-medium text-slate-800">
//                 Vendors
//               </span>

//             </div>

//             <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
//               Vendor Management
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage vendor accounts, verification,
//               modules and operational status.
//             </p>

//           </div>

//           <div className="rounded-xl bg-white px-4 py-3 shadow-sm">

//             <p className="text-xs text-slate-500">
//               Total Vendors
//             </p>

//             <p className="mt-1 text-2xl font-bold text-slate-900">
//               {vendors.length}
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS MESSAGE */}

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//         <SummaryCard
//           title="Active Vendors"
//           value={activeCount}
//           description="Currently active"
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />

//         <SummaryCard
//           title="Pending Verification"
//           value={pendingCount}
//           description="Need verification"
//           icon="!"
//           iconClass="bg-yellow-100 text-yellow-700"
//         />

//         <SummaryCard
//           title="Suspended"
//           value={suspendedCount}
//           description="Temporarily suspended"
//           icon="⏸"
//           iconClass="bg-orange-100 text-orange-700"
//         />

//         <SummaryCard
//           title="Blocked"
//           value={blockedCount}
//           description="Access blocked"
//           icon="×"
//           iconClass="bg-red-100 text-red-700"
//         />

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

//           {/* SEARCH */}

//           <div className="lg:col-span-2">

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search Vendor
//             </label>

//             <div className="relative">

//               <input
//                 type="text"
//                 value={search}
//                 onChange={(event) =>
//                   setSearch(event.target.value)
//                 }
//                 placeholder="Search ID, business, owner, phone..."
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//               />

//             </div>

//           </div>

//           {/* STATUS */}

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | VendorStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Statuses
//               </option>
//               <option value="ACTIVE">
//                 Active
//               </option>
//               <option value="INACTIVE">
//                 Inactive
//               </option>
//               <option value="SUSPENDED">
//                 Suspended
//               </option>
//               <option value="BLOCKED">
//                 Blocked
//               </option>
//             </select>

//           </div>

//           {/* VERIFICATION */}

//           <div>

//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Verification
//             </label>

//             <select
//               value={verificationFilter}
//               onChange={(event) =>
//                 setVerificationFilter(
//                   event.target.value as
//                     | "ALL"
//                     | VerificationStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Verification
//               </option>
//               <option value="ACTIVE">
//                 Active
//               </option>
//               <option value="SUBMITTED">
//                 Submitted
//               </option>
//               <option value="PENDING">
//                 Pending
//               </option>
//               <option value="DRAFT">
//                 Draft
//               </option>
//               <option value="REJECTED">
//                 Rejected
//               </option>
//             </select>

//           </div>

//           {/* MODULE */}

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
//                     | VendorModule
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">
//                 All Modules
//               </option>
//               <option value="FOOD">
//                 Food
//               </option>
//               <option value="MART">
//                 Mart
//               </option>
//               <option value="PHARMACY">
//                 Pharmacy
//               </option>
//               <option value="SHOPPING">
//                 Shopping
//               </option>
//               <option value="STAY">
//                 Stay
//               </option>
//               <option value="HOME_SERVICES">
//                 Home Services
//               </option>
//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredVendors.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {vendors.length}
//             </span>{" "}
//             vendors
//           </p>

//           {(search ||
//             statusFilter !== "ALL" ||
//             verificationFilter !== "ALL" ||
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

//       {/* DESKTOP TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1100px]">

//             <thead className="border-b border-slate-200 bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Vendor
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Owner / Contact
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Location
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Modules
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Verification
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

//               {filteredVendors.map((vendor) => (

//                 <tr
//                   key={vendor.vendorId}
//                   className="hover:bg-slate-50"
//                 >

//                   {/* VENDOR */}

//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-3">

//                       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                         {vendor.businessName
//                           .split(" ")
//                           .map((word) =>
//                             word.charAt(0)
//                           )
//                           .join("")
//                           .slice(0, 2)
//                           .toUpperCase()}
//                       </div>

//                       <div>

//                         <p className="text-sm font-bold text-slate-900">
//                           {vendor.businessName}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-500">
//                           {vendor.vendorId}
//                         </p>

//                       </div>

//                     </div>

//                   </td>

//                   {/* CONTACT */}

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {vendor.ownerName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {vendor.phone}
//                     </p>

//                     <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
//                       {vendor.email}
//                     </p>

//                   </td>

//                   {/* LOCATION */}

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {vendor.districtName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {vendor.stateName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {vendor.pincode}
//                     </p>

//                   </td>

//                   {/* MODULES */}

//                   <td className="px-5 py-4">

//                     <div className="flex max-w-[210px] flex-wrap gap-1.5">

//                       {vendor.modules.map((module) => (

//                         <span
//                           key={module}
//                           className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                             module
//                           )}`}
//                         >
//                           {getModuleLabel(module)}
//                         </span>

//                       ))}

//                     </div>

//                   </td>

//                   {/* VERIFICATION */}

//                   <td className="px-5 py-4">

//                     <span
//                       className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
//                         vendor.verificationStatus
//                       )}`}
//                     >
//                       {vendor.verificationStatus}
//                     </span>

//                   </td>

//                   {/* STATUS */}

//                   <td className="px-5 py-4">

//                     <span
//                       className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                         vendor.status
//                       )}`}
//                     >
//                       {vendor.status}
//                     </span>

//                   </td>

//                   {/* ACTION */}

//                   <td className="px-5 py-4">

//                     <div className="flex items-center justify-end gap-2">

//                       <Link
//                         href={`/entity-management/vendors/${vendor.vendorId}`}
//                         className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                       >
//                         View Details
//                       </Link>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openStatusModal(vendor)
//                         }
//                         className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
//                       >
//                         Status
//                       </button>

//                     </div>

//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredVendors.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE / TABLET CARDS */}

//       <div className="grid grid-cols-1 gap-4 lg:hidden">

//         {filteredVendors.map((vendor) => (

//           <div
//             key={vendor.vendorId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div className="flex items-start gap-3">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                   {vendor.businessName
//                     .split(" ")
//                     .map((word) =>
//                       word.charAt(0)
//                     )
//                     .join("")
//                     .slice(0, 2)
//                     .toUpperCase()}
//                 </div>

//                 <div>

//                   <h2 className="text-sm font-bold text-slate-900">
//                     {vendor.businessName}
//                   </h2>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.vendorId}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.ownerName}
//                   </p>

//                 </div>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   vendor.status
//                 )}`}
//               >
//                 {vendor.status}
//               </span>

//             </div>

//             <div className="mt-5 grid grid-cols-2 gap-4">

//               <MobileInfo
//                 label="Phone"
//                 value={vendor.phone}
//               />

//               <MobileInfo
//                 label="Location"
//                 value={`${vendor.districtName}, ${vendor.stateName}`}
//               />

//               <MobileInfo
//                 label="Verification"
//                 value={vendor.verificationStatus}
//               />

//               <MobileInfo
//                 label="Orders"
//                 value={vendor.totalOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//             </div>

//             <div className="mt-4">

//               <p className="mb-2 text-xs font-semibold text-slate-500">
//                 Modules
//               </p>

//               <div className="flex flex-wrap gap-1.5">

//                 {vendor.modules.map((module) => (

//                   <span
//                     key={module}
//                     className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                       module
//                     )}`}
//                   >
//                     {getModuleLabel(module)}
//                   </span>

//                 ))}

//               </div>

//             </div>

//             <div className="mt-5 flex gap-2">

//               <Link
//                 href={`/entity-management/vendors/${vendor.vendorId}`}
//                 className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 View Details
//               </Link>

//               <button
//                 type="button"
//                 onClick={() =>
//                   openStatusModal(vendor)
//                 }
//                 className="flex-1 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white hover:bg-orange-600"
//               >
//                 Change Status
//               </button>

//             </div>

//           </div>

//         ))}

//         {filteredVendors.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* STATUS MODAL */}

//       {showStatusModal &&
//         selectedVendor && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <h2 className="text-lg font-bold text-slate-900">
//                     Change Vendor Status
//                   </h2>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {selectedVendor.businessName}
//                   </p>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowStatusModal(false)
//                   }
//                   className="text-2xl text-slate-400 hover:text-slate-700"
//                 >
//                   ×
//                 </button>

//               </div>

//               <div className="mt-6 space-y-2">

//                 {(
//                   [
//                     "ACTIVE",
//                     "INACTIVE",
//                     "SUSPENDED",
//                     "BLOCKED",
//                   ] as VendorStatus[]
//                 ).map((status) => (

//                   <button
//                     key={status}
//                     type="button"
//                     onClick={() =>
//                       updateVendorStatus(status)
//                     }
//                     className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
//                       selectedVendor.status ===
//                       status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200 hover:bg-slate-50"
//                     }`}
//                   >

//                     <span className="text-sm font-semibold text-slate-800">
//                       {status}
//                     </span>

//                     {selectedVendor.status ===
//                       status && (
//                       <span className="font-bold text-orange-600">
//                         ✓
//                       </span>
//                     )}

//                   </button>

//                 ))}

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowStatusModal(false)
//                 }
//                 className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>
//         )}

//       {/* GOVERNANCE NOTE */}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">

//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Vendor Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           This development page displays vendor information
//           using local sample data. In the production JUONE
//           ecosystem, vendor identity and account information
//           should come from the authoritative backend and
//           Firestore records. Vendor verification, module
//           eligibility, activation, administrative scope,
//           pricing, commission, settlement and financial
//           operations must not be independently decided by
//           the client.
//         </p>

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
//   value: number;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">

//       <div className="flex items-start justify-between">

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
//           className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//         >
//           {icon}
//         </div>

//       </div>

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

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">

//       <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
//         🔍
//       </div>

//       <h3 className="mt-4 text-base font-bold text-slate-900">
//         No vendors found
//       </h3>

//       <p className="mt-1 text-sm text-slate-500">
//         Try changing your search or filter options.
//       </p>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useVendors, {
//   type Vendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
// } from "@/hooks/useVendors";

// function getStatusClasses(status: VendorStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getVerificationClasses(status: VerificationStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "SUBMITTED":
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: VendorModule) {
//   switch (String(module).toUpperCase()) {
//     case "FOOD":
//       return "bg-orange-50 text-orange-700";
//     case "MART":
//       return "bg-blue-50 text-blue-700";
//     case "PHARMACY":
//       return "bg-green-50 text-green-700";
//     case "SHOPPING":
//       return "bg-pink-50 text-pink-700";
//     case "STAY":
//       return "bg-purple-50 text-purple-700";
//     case "HOME_SERVICES":
//       return "bg-cyan-50 text-cyan-700";
//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getModuleLabel(module: VendorModule) {
//   if (String(module).toUpperCase() === "HOME_SERVICES") return "HOME SERVICES";
//   return String(module);
// }

// function initials(name: string) {
//   return name
//     .split(" ")
//     .map((w) => w.charAt(0))
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// export default function VendorsPage() {
//   const { vendors, loading, error, demoMode, refresh } = useVendors();

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | VendorStatus>("ALL");
//   const [verificationFilter, setVerificationFilter] = useState<
//     "ALL" | VerificationStatus
//   >("ALL");
//   const [moduleFilter, setModuleFilter] = useState<"ALL" | VendorModule>("ALL");
//   const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredVendors = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return vendors.filter((vendor) => {
//       const matchesSearch =
//         !q ||
//         vendor.vendorId.toLowerCase().includes(q) ||
//         vendor.businessName.toLowerCase().includes(q) ||
//         vendor.ownerName.toLowerCase().includes(q) ||
//         vendor.phone.toLowerCase().includes(q) ||
//         vendor.email.toLowerCase().includes(q) ||
//         vendor.districtName.toLowerCase().includes(q) ||
//         vendor.stateName.toLowerCase().includes(q);

//       const matchesStatus =
//         statusFilter === "ALL" || vendor.status === statusFilter;
//       const matchesVerification =
//         verificationFilter === "ALL" ||
//         vendor.verificationStatus === verificationFilter;
//       const matchesModule =
//         moduleFilter === "ALL" ||
//         vendor.modules.some(
//           (m) => String(m).toUpperCase() === String(moduleFilter).toUpperCase()
//         );

//       return (
//         matchesSearch && matchesStatus && matchesVerification && matchesModule
//       );
//     });
//   }, [vendors, search, statusFilter, verificationFilter, moduleFilter]);

//   const activeCount = vendors.filter((v) => v.status === "ACTIVE").length;
//   const pendingCount = vendors.filter(
//     (v) =>
//       v.verificationStatus === "PENDING" ||
//       v.verificationStatus === "SUBMITTED"
//   ).length;
//   const suspendedCount = vendors.filter((v) => v.status === "SUSPENDED").length;
//   const blockedCount = vendors.filter((v) => v.status === "BLOCKED").length;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setVerificationFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openStatusModal(vendor: Vendor) {
//     setSelectedVendor(vendor);
//     setShowStatusModal(true);
//   }

//   function updateVendorStatus(status: VendorStatus) {
//     if (!selectedVendor) return;
//     setSelectedVendor({ ...selectedVendor, status });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `${selectedVendor.businessName}: local UI status → ${status}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="flex flex-wrap items-center gap-2">
//             <Link
//               href="/entity-management"
//               className="text-sm font-medium text-slate-500 hover:text-orange-600"
//             >
//               Entity Management
//             </Link>
//             <span className="text-slate-400">/</span>
//             <span className="text-sm font-medium text-slate-800">Vendors</span>
//           </div>
//           <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
//             Vendor Management
//           </h1>
//           <p className="mt-1 text-sm text-slate-500">
//             Live data from Firestore <code>vendors</code> (+ order counts).
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-3">
//           <button
//             type="button"
//             onClick={() => void refresh()}
//             disabled={loading}
//             className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//           >
//             {loading ? "Refreshing…" : "Refresh"}
//           </button>
//           <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//             <p className="text-xs text-slate-500">Total Vendors</p>
//             <p className="mt-1 text-2xl font-bold text-slate-900">
//               {loading ? "…" : vendors.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}
//       {/* {demoMode && (
//         <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           Demo mode — set <code>NEXT_PUBLIC_DEMO_MODE=false</code>.
//         </div>
//       )} */}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <SummaryCard
//           title="Active Vendors"
//           value={loading ? 0 : activeCount}
//           description="Currently active"
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />
//         <SummaryCard
//           title="Pending Verification"
//           value={loading ? 0 : pendingCount}
//           description="Need verification"
//           icon="!"
//           iconClass="bg-yellow-100 text-yellow-700"
//         />
//         <SummaryCard
//           title="Suspended"
//           value={loading ? 0 : suspendedCount}
//           description="Temporarily suspended"
//           icon="⏸"
//           iconClass="bg-orange-100 text-orange-700"
//         />
//         <SummaryCard
//           title="Blocked"
//           value={loading ? 0 : blockedCount}
//           description="Access blocked"
//           icon="×"
//           iconClass="bg-red-100 text-red-700"
//         />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
//           <div className="lg:col-span-2">
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search Vendor
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, business, owner, phone…"
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | VendorStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="SUSPENDED">Suspended</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Verification
//             </label>
//             <select
//               value={verificationFilter}
//               onChange={(e) =>
//                 setVerificationFilter(
//                   e.target.value as "ALL" | VerificationStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Verification</option>
//               <option value="ACTIVE">Active</option>
//               <option value="SUBMITTED">Submitted</option>
//               <option value="PENDING">Pending</option>
//               <option value="DRAFT">Draft</option>
//               <option value="REJECTED">Rejected</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Module
//             </label>
//             <select
//               value={moduleFilter}
//               onChange={(e) =>
//                 setModuleFilter(e.target.value as "ALL" | VendorModule)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Modules</option>
//               <option value="FOOD">Food</option>
//               <option value="MART">Mart</option>
//               <option value="PHARMACY">Pharmacy</option>
//               <option value="SHOPPING">Shopping</option>
//               <option value="STAY">Stay</option>
//               <option value="HOME_SERVICES">Home Services</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredVendors.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">{vendors.length}</span>{" "}
//             vendors
//           </p>
//           {(search ||
//             statusFilter !== "ALL" ||
//             verificationFilter !== "ALL" ||
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

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1100px]">
//             <thead className="border-b border-slate-200 bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Vendor
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Owner / Contact
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Location
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Modules
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Verification
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Status
//                 </th>
//                 <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredVendors.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading vendors…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredVendors.map((vendor) => (
//                   <tr key={vendor.vendorId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                           {initials(vendor.businessName)}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-slate-900">
//                             {vendor.businessName}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {vendor.vendorId}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.ownerName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">{vendor.phone}</p>
//                       <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
//                         {vendor.email}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.districtName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {vendor.stateName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {vendor.pincode}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex max-w-[210px] flex-wrap gap-1.5">
//                         {vendor.modules.length === 0 ? (
//                           <span className="text-xs text-slate-400">—</span>
//                         ) : (
//                           vendor.modules.map((module) => (
//                             <span
//                               key={String(module)}
//                               className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                                 module
//                               )}`}
//                             >
//                               {getModuleLabel(module)}
//                             </span>
//                           ))
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
//                           vendor.verificationStatus
//                         )}`}
//                       >
//                         {vendor.verificationStatus}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                           vendor.status
//                         )}`}
//                       >
//                         {vendor.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <Link
//                           href={`/entity-management/vendors/${vendor.vendorId}`}
//                           className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                         >
//                           View Details
//                         </Link>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(vendor)}
//                           className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       <div className="grid grid-cols-1 gap-4 lg:hidden">
//         {filteredVendors.map((vendor) => (
//           <div
//             key={vendor.vendorId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                   {initials(vendor.businessName)}
//                 </div>
//                 <div>
//                   <h2 className="text-sm font-bold text-slate-900">
//                     {vendor.businessName}
//                   </h2>
//                   <p className="mt-1 text-xs text-slate-500">{vendor.vendorId}</p>
//                   <p className="mt-1 text-xs text-slate-500">{vendor.ownerName}</p>
//                 </div>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   vendor.status
//                 )}`}
//               >
//                 {vendor.status}
//               </span>
//             </div>
//             <div className="mt-5 flex gap-2">
//               <Link
//                 href={`/entity-management/vendors/${vendor.vendorId}`}
//                 className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-700"
//               >
//                 View Details
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(vendor)}
//                 className="flex-1 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white"
//               >
//                 Change Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       {showStatusModal && selectedVendor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold text-slate-900">
//               Change Vendor Status
//             </h2>
//             <p className="mt-1 text-xs text-slate-500">
//               {selectedVendor.businessName} · UI-only until backend write
//             </p>
//             <div className="mt-6 space-y-2">
//               {(["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]).map(
//                 (status) => (
//                   <button
//                     key={status}
//                     type="button"
//                     onClick={() => updateVendorStatus(status)}
//                     className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
//                       selectedVendor.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200 hover:bg-slate-50"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold">{status}</span>
//                     {selectedVendor.status === status && (
//                       <span className="font-bold text-orange-600">✓</span>
//                     )}
//                   </button>
//                 )
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Vendor Governance
//         </h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Vendor rows load from Firestore <code>vendors</code>. Status controls are
//           local UI only until an authorized Cloud Function + audit trail is wired.
//         </p>
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
//   value: number;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium text-slate-500">{title}</p>
//           <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
//           <p className="mt-1 text-xs text-slate-400">{description}</p>
//         </div>
//         <div
//           className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
//       <h3 className="text-base font-bold text-slate-900">No vendors found</h3>
//       <p className="mt-1 text-sm text-slate-500">
//         Empty <code>vendors</code> collection or filters too narrow.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useVendors, {
//   type Vendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   isVerificationBlockingActive,
// } from "@/hooks/useVendors";
// import useAuthScope from "@/hooks/useAuthScope";
// import ScopeBadge from "@/components/hierarchy/ScopeBadge";
// import {
//   FIRESTORE_COLLECTIONS,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import {
//   filterByStateAndDistrict,
//   type HierarchyScopeFilter,
// } from "@/lib/hierarchy/scopeFilter";


// function getStatusClasses(status: VendorStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getVerificationClasses(status: VerificationStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "SUBMITTED":
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: VendorModule) {
//   switch (String(module).toUpperCase()) {
//     case "FOOD":
//       return "bg-orange-50 text-orange-700";
//     case "MART":
//       return "bg-blue-50 text-blue-700";
//     case "PHARMACY":
//       return "bg-green-50 text-green-700";
//     case "SHOPPING":
//       return "bg-pink-50 text-pink-700";
//     case "STAY":
//       return "bg-purple-50 text-purple-700";
//     case "HOME_SERVICES":
//       return "bg-cyan-50 text-cyan-700";
//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getModuleLabel(module: VendorModule) {
//   if (String(module).toUpperCase() === "HOME_SERVICES") return "HOME SERVICES";
//   return String(module);
// }

// function initials(name: string) {
//   return name
//     .split(" ")
//     .map((w) => w.charAt(0))
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// export default function VendorsPage() {
//   const auth = useAuthScope();
//   const scopeFilter: HierarchyScopeFilter = {
//     role: auth.role,
//     stateId: auth.stateId,
//     districtId: auth.districtId,
//     isGlobalAdmin: auth.isGlobalAdmin,
//   };

//   const { vendors: allVendors, loading, error, demoMode, refresh } =
//     useVendors();

//   const vendors = useMemo(
//     () => filterByStateAndDistrict(allVendors, scopeFilter),
//     [
//       allVendors,
//       scopeFilter.role,
//       scopeFilter.stateId,
//       scopeFilter.districtId,
//       scopeFilter.isGlobalAdmin,
//     ]
//   );

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | VendorStatus>("ALL");
//   const [verificationFilter, setVerificationFilter] = useState<
//     "ALL" | VerificationStatus
//   >("ALL");
//   const [moduleFilter, setModuleFilter] = useState<"ALL" | VendorModule>("ALL");
//   const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [statusSaving, setStatusSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredVendors = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return vendors.filter((vendor) => {
//       const matchesSearch =
//         !q ||
//         vendor.vendorId.toLowerCase().includes(q) ||
//         vendor.businessName.toLowerCase().includes(q) ||
//         vendor.ownerName.toLowerCase().includes(q) ||
//         vendor.phone.toLowerCase().includes(q) ||
//         vendor.email.toLowerCase().includes(q) ||
//         vendor.districtName.toLowerCase().includes(q) ||
//         vendor.stateName.toLowerCase().includes(q);

//       const matchesStatus =
//         statusFilter === "ALL" || vendor.status === statusFilter;
//       const matchesVerification =
//         verificationFilter === "ALL" ||
//         vendor.verificationStatus === verificationFilter;
//       const matchesModule =
//         moduleFilter === "ALL" ||
//         vendor.modules.some(
//           (m) => String(m).toUpperCase() === String(moduleFilter).toUpperCase()
//         );

//       return (
//         matchesSearch && matchesStatus && matchesVerification && matchesModule
//       );
//     });
//   }, [vendors, search, statusFilter, verificationFilter, moduleFilter]);

//   const activeCount = vendors.filter((v) => v.status === "ACTIVE").length;
//   const pendingCount = vendors.filter(
//     (v) =>
//       v.verificationStatus === "PENDING" ||
//       v.verificationStatus === "SUBMITTED"
//   ).length;
//   const suspendedCount = vendors.filter((v) => v.status === "SUSPENDED").length;
//   const blockedCount = vendors.filter((v) => v.status === "BLOCKED").length;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setVerificationFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openStatusModal(vendor: Vendor) {
//     setSelectedVendor(vendor);
//     setShowStatusModal(true);
//   }

//   // async function updateVendorStatus(status: VendorStatus) {
//   //   if (!selectedVendor) return;

//   //   if (isFirestoreDemoMode) {
//   //     setSuccessMessage("Writes are disabled in demo mode.");
//   //     setTimeout(() => setSuccessMessage(""), 3500);
//   //     return;
//   //   }

//   //   setStatusSaving(true);
//   //   try {
//   //     await updateDocument(
//   //       FIRESTORE_COLLECTIONS.VENDORS,
//   //       selectedVendor.vendorId,
//   //       { status }
//   //     );
//   //     setShowStatusModal(false);
//   //     setSuccessMessage(
//   //       `${selectedVendor.businessName} → ${status} (saved to Firestore)`
//   //     );
//   //     setTimeout(() => setSuccessMessage(""), 4000);
//   //     await refresh();
//   //   } catch (err) {
//   //     setSuccessMessage(
//   //       err instanceof Error
//   //         ? err.message
//   //         : "Failed to update vendor status (check Firestore rules)."
//   //     );
//   //     setTimeout(() => setSuccessMessage(""), 5000);
//   //   } finally {
//   //     setStatusSaving(false);
//   //   }
//   // }

//     async function updateVendorStatus(status: VendorStatus) {
//     if (!selectedVendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     // Cannot set ACTIVE while verification is not ACTIVE
//     if (
//       status === "ACTIVE" &&
//       isVerificationBlockingActive(selectedVendor.verificationStatus)
//     ) {
//       setSuccessMessage(
//         `Cannot set ACTIVE: verification is ${selectedVendor.verificationStatus}. Approve verification first.`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       const writeId = selectedVendor.docId || selectedVendor.vendorId;
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, writeId, {
//         status,
//         accountStatus: status,
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `${selectedVendor.businessName} → ${status} (saved · doc ${writeId})`
//       );
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update vendor status (check Firestore rules / doc id)."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } finally {
//       setStatusSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="flex flex-wrap items-center gap-2">
//             <Link
//               href="/entity-management"
//               className="text-sm font-medium text-slate-500 hover:text-orange-600"
//             >
//               Entity Management
//             </Link>
//             <span className="text-slate-400">/</span>
//             <span className="text-sm font-medium text-slate-800">Vendors</span>
//             <ScopeBadge />
//           </div>
//           <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
//             Vendor Management
//           </h1>
//           <p className="mt-1 text-sm text-slate-500">
//             Live data from Firestore <code>vendors</code> (role-scoped)
//             {demoMode ? " · demo mode" : ""}.
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-3">
//           <button
//             type="button"
//             onClick={() => void refresh()}
//             disabled={loading}
//             className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//           >
//             {loading ? "Refreshing…" : "Refresh"}
//           </button>
//           <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//             <p className="text-xs text-slate-500">Vendors in scope</p>
//             <p className="mt-1 text-2xl font-bold text-slate-900">
//               {loading ? "…" : vendors.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <SummaryCard
//           title="Active Vendors"
//           value={loading ? 0 : activeCount}
//           description="Currently active"
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />
//         <SummaryCard
//           title="Pending Verification"
//           value={loading ? 0 : pendingCount}
//           description="Need verification"
//           icon="!"
//           iconClass="bg-yellow-100 text-yellow-700"
//         />
//         <SummaryCard
//           title="Suspended"
//           value={loading ? 0 : suspendedCount}
//           description="Temporarily suspended"
//           icon="⏸"
//           iconClass="bg-orange-100 text-orange-700"
//         />
//         <SummaryCard
//           title="Blocked"
//           value={loading ? 0 : blockedCount}
//           description="Access blocked"
//           icon="×"
//           iconClass="bg-red-100 text-red-700"
//         />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
//           <div className="lg:col-span-2">
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search Vendor
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, business, owner, phone…"
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | VendorStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="SUSPENDED">Suspended</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Verification
//             </label>
//             <select
//               value={verificationFilter}
//               onChange={(e) =>
//                 setVerificationFilter(
//                   e.target.value as "ALL" | VerificationStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Verification</option>
//               <option value="ACTIVE">Active</option>
//               <option value="SUBMITTED">Submitted</option>
//               <option value="PENDING">Pending</option>
//               <option value="DRAFT">Draft</option>
//               <option value="REJECTED">Rejected</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Module
//             </label>
//             <select
//               value={moduleFilter}
//               onChange={(e) =>
//                 setModuleFilter(e.target.value as "ALL" | VendorModule)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Modules</option>
//               <option value="FOOD">Food</option>
//               <option value="MART">Mart</option>
//               <option value="PHARMACY">Pharmacy</option>
//               <option value="SHOPPING">Shopping</option>
//               <option value="STAY">Stay</option>
//               <option value="HOME_SERVICES">Home Services</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredVendors.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">{vendors.length}</span>{" "}
//             vendors in your scope
//           </p>
//           {(search ||
//             statusFilter !== "ALL" ||
//             verificationFilter !== "ALL" ||
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

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1100px]">
//             <thead className="border-b border-slate-200 bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Vendor
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Owner / Contact
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Location
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Modules
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Verification
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Status
//                 </th>
//                 <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredVendors.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading vendors…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredVendors.map((vendor) => (
//                   <tr key={vendor.vendorId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                           {initials(vendor.businessName)}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-slate-900">
//                             {vendor.businessName}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {vendor.vendorId}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.ownerName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {vendor.phone}
//                       </p>
//                       <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
//                         {vendor.email}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.districtName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {vendor.stateName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {vendor.pincode}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex max-w-[210px] flex-wrap gap-1.5">
//                         {vendor.modules.length === 0 ? (
//                           <span className="text-xs text-slate-400">—</span>
//                         ) : (
//                           vendor.modules.map((module) => (
//                             <span
//                               key={String(module)}
//                               className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                                 module
//                               )}`}
//                             >
//                               {getModuleLabel(module)}
//                             </span>
//                           ))
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
//                           vendor.verificationStatus
//                         )}`}
//                       >
//                         {vendor.verificationStatus}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                           vendor.status
//                         )}`}
//                       >
//                         {vendor.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <Link
//                           href={`/entity-management/vendors/${vendor.vendorId}`}
//                           className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                         >
//                           View Details
//                         </Link>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(vendor)}
//                           className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       <div className="grid grid-cols-1 gap-4 lg:hidden">
//         {filteredVendors.map((vendor) => (
//           <div
//             key={vendor.vendorId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                   {initials(vendor.businessName)}
//                 </div>
//                 <div>
//                   <h2 className="text-sm font-bold text-slate-900">
//                     {vendor.businessName}
//                   </h2>
//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.vendorId}
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.ownerName}
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   vendor.status
//                 )}`}
//               >
//                 {vendor.status}
//               </span>
//             </div>
//             <div className="mt-5 flex gap-2">
//               <Link
//                 href={`/entity-management/vendors/${vendor.vendorId}`}
//                 className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-700"
//               >
//                 View Details
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(vendor)}
//                 className="flex-1 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white"
//               >
//                 Change Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       {showStatusModal && selectedVendor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold text-slate-900">
//               Change Vendor Status
//             </h2>
//             <p className="mt-1 text-xs text-slate-500">
//               {selectedVendor.businessName} · writes to Firestore
//             </p>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   disabled={statusSaving}
//                   onClick={() => void updateVendorStatus(status)}
//                   className={`flex w-full items-center justify-between rounded-lg border p-4 text-left disabled:opacity-60 ${
//                     selectedVendor.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >
//                   <span className="text-sm font-semibold">
//                     {statusSaving ? "Saving…" : status}
//                   </span>
//                   {selectedVendor.status === status && (
//                     <span className="font-bold text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={statusSaving}
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Vendor Governance
//         </h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Lists are filtered by auth claims (state / district). Status updates
//           write to <code>vendors</code>. Production should also enforce the same
//           scope in Firestore rules and audit logs.
//         </p>
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
//   value: number;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium text-slate-500">{title}</p>
//           <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
//           <p className="mt-1 text-xs text-slate-400">{description}</p>
//         </div>
//         <div
//           className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
//       <h3 className="text-base font-bold text-slate-900">No vendors found</h3>
//       <p className="mt-1 text-sm text-slate-500">
//         Empty <code>vendors</code> collection, filters too narrow, or outside
//         your role scope.
//       </p>
//     </div>
//   );
// }


// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import {
//   useVendors,
//   type Vendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   isVerificationBlockingActive,
// } from "@/hooks/useVendors";
// import useAuthScope from "@/hooks/useAuthScope";
// import ScopeBadge from "@/components/hierarchy/ScopeBadge";
// import {
//   FIRESTORE_COLLECTIONS,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import {
//   filterByStateAndDistrict,
//   type HierarchyScopeFilter,
// } from "@/lib/hierarchy/scopeFilter";

// function getStatusClasses(status: VendorStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";
//     case "BLOCKED":
//       return "bg-red-100 text-red-700";
//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getVerificationClasses(status: VerificationStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "SUBMITTED":
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: VendorModule) {
//   switch (String(module).toUpperCase()) {
//     case "FOOD":
//       return "bg-orange-50 text-orange-700";
//     case "MART":
//       return "bg-blue-50 text-blue-700";
//     case "PHARMACY":
//       return "bg-green-50 text-green-700";
//     case "SHOPPING":
//       return "bg-pink-50 text-pink-700";
//     case "STAY":
//       return "bg-purple-50 text-purple-700";
//     case "HOME_SERVICES":
//       return "bg-cyan-50 text-cyan-700";
//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// function getModuleLabel(module: VendorModule) {
//   if (String(module).toUpperCase() === "HOME_SERVICES") return "HOME SERVICES";
//   return String(module);
// }

// function initials(name: string) {
//   return name
//     .split(" ")
//     .map((w) => w.charAt(0))
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// export default function EntityVendorsPage() {
//   const auth = useAuthScope();
//   const scopeFilter: HierarchyScopeFilter = {
//     role: auth.role,
//     stateId: auth.stateId,
//     districtId: auth.districtId,
//     isGlobalAdmin: auth.isGlobalAdmin,
//   };

//   const { vendors: allVendors, loading, error, demoMode, refresh } =
//     useVendors();

//   const vendors = useMemo(
//     () => filterByStateAndDistrict(allVendors, scopeFilter),
//     [
//       allVendors,
//       scopeFilter.role,
//       scopeFilter.stateId,
//       scopeFilter.districtId,
//       scopeFilter.isGlobalAdmin,
//     ]
//   );

//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | VendorStatus>("ALL");
//   const [verificationFilter, setVerificationFilter] = useState<
//     "ALL" | VerificationStatus
//   >("ALL");
//   const [moduleFilter, setModuleFilter] = useState<"ALL" | VendorModule>("ALL");
//   const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [statusSaving, setStatusSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const filteredVendors = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return vendors.filter((vendor) => {
//       const matchesSearch =
//         !q ||
//         vendor.vendorId.toLowerCase().includes(q) ||
//         vendor.businessName.toLowerCase().includes(q) ||
//         vendor.ownerName.toLowerCase().includes(q) ||
//         vendor.phone.toLowerCase().includes(q) ||
//         vendor.email.toLowerCase().includes(q) ||
//         vendor.districtName.toLowerCase().includes(q) ||
//         vendor.stateName.toLowerCase().includes(q);

//       const matchesStatus =
//         statusFilter === "ALL" || vendor.status === statusFilter;
//       const matchesVerification =
//         verificationFilter === "ALL" ||
//         vendor.verificationStatus === verificationFilter;
//       const matchesModule =
//         moduleFilter === "ALL" ||
//         vendor.modules.some(
//           (m) => String(m).toUpperCase() === String(moduleFilter).toUpperCase()
//         );

//       return (
//         matchesSearch && matchesStatus && matchesVerification && matchesModule
//       );
//     });
//   }, [vendors, search, statusFilter, verificationFilter, moduleFilter]);

//   const activeCount = vendors.filter((v) => v.status === "ACTIVE").length;
//   const pendingCount = vendors.filter(
//     (v) =>
//       v.verificationStatus === "PENDING" ||
//       v.verificationStatus === "SUBMITTED"
//   ).length;
//   const suspendedCount = vendors.filter((v) => v.status === "SUSPENDED").length;
//   const blockedCount = vendors.filter((v) => v.status === "BLOCKED").length;

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setVerificationFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   function openStatusModal(vendor: Vendor) {
//     setSelectedVendor(vendor);
//     setShowStatusModal(true);
//   }

//   async function updateVendorStatus(status: VendorStatus) {
//     if (!selectedVendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     if (
//       status === "ACTIVE" &&
//       isVerificationBlockingActive(selectedVendor.verificationStatus)
//     ) {
//       setSuccessMessage(
//         `Cannot set ACTIVE: verification is ${selectedVendor.verificationStatus}. Approve verification first.`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       return;
//     }

//     setStatusSaving(true);
//     try {
//       const writeId = selectedVendor.docId || selectedVendor.vendorId;
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, writeId, {
//         status,
//         accountStatus: status,
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(
//         `${selectedVendor.businessName} → ${status} (saved · ${writeId})`
//       );
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update vendor status (check Firestore rules / doc id)."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } finally {
//       setStatusSaving(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="flex flex-wrap items-center gap-2">
//             <Link
//               href="/entity-management"
//               className="text-sm font-medium text-slate-500 hover:text-orange-600"
//             >
//               Entity Management
//             </Link>
//             <span className="text-slate-400">/</span>
//             <span className="text-sm font-medium text-slate-800">Vendors</span>
//             <ScopeBadge />
//           </div>
//           <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
//             Vendor Management
//           </h1>
//           <p className="mt-1 text-sm text-slate-500">
//             Live data from Firestore <code>vendors</code> (role-scoped)
//             {demoMode ? " · demo mode" : ""}.
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-3">
//           <button
//             type="button"
//             onClick={() => void refresh()}
//             disabled={loading}
//             className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//           >
//             {loading ? "Refreshing…" : "Refresh"}
//           </button>
//           <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//             <p className="text-xs text-slate-500">Vendors in scope</p>
//             <p className="mt-1 text-2xl font-bold text-slate-900">
//               {loading ? "…" : vendors.length}
//             </p>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <SummaryCard
//           title="Active Vendors"
//           value={loading ? 0 : activeCount}
//           description="Currently active"
//           icon="✓"
//           iconClass="bg-green-100 text-green-700"
//         />
//         <SummaryCard
//           title="Pending Verification"
//           value={loading ? 0 : pendingCount}
//           description="Need verification"
//           icon="!"
//           iconClass="bg-yellow-100 text-yellow-700"
//         />
//         <SummaryCard
//           title="Suspended"
//           value={loading ? 0 : suspendedCount}
//           description="Temporarily suspended"
//           icon="⏸"
//           iconClass="bg-orange-100 text-orange-700"
//         />
//         <SummaryCard
//           title="Blocked"
//           value={loading ? 0 : blockedCount}
//           description="Access blocked"
//           icon="×"
//           iconClass="bg-red-100 text-red-700"
//         />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
//           <div className="lg:col-span-2">
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Search Vendor
//             </label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search ID, business, owner, phone…"
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | VendorStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="SUSPENDED">Suspended</option>
//               <option value="BLOCKED">Blocked</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Verification
//             </label>
//             <select
//               value={verificationFilter}
//               onChange={(e) =>
//                 setVerificationFilter(
//                   e.target.value as "ALL" | VerificationStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Verification</option>
//               <option value="ACTIVE">Active</option>
//               <option value="SUBMITTED">Submitted</option>
//               <option value="PENDING">Pending</option>
//               <option value="DRAFT">Draft</option>
//               <option value="REJECTED">Rejected</option>
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-semibold text-slate-600">
//               Module
//             </label>
//             <select
//               value={moduleFilter}
//               onChange={(e) =>
//                 setModuleFilter(e.target.value as "ALL" | VendorModule)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All Modules</option>
//               <option value="FOOD">Food</option>
//               <option value="MART">Mart</option>
//               <option value="PHARMACY">Pharmacy</option>
//               <option value="SHOPPING">Shopping</option>
//               <option value="STAY">Stay</option>
//               <option value="HOME_SERVICES">Home Services</option>
//             </select>
//           </div>
//         </div>
//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredVendors.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">{vendors.length}</span>{" "}
//             vendors in your scope
//           </p>
//           {(search ||
//             statusFilter !== "ALL" ||
//             verificationFilter !== "ALL" ||
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

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm lg:block">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1100px]">
//             <thead className="border-b border-slate-200 bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Vendor
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Owner / Contact
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Location
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Modules
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Verification
//                 </th>
//                 <th className="px-5 py-4 text-left text-xs font-bold uppercase text-slate-500">
//                   Status
//                 </th>
//                 <th className="px-5 py-4 text-right text-xs font-bold uppercase text-slate-500">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {loading && filteredVendors.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-5 py-12 text-center text-sm text-slate-500"
//                   >
//                     Loading vendors…
//                   </td>
//                 </tr>
//               ) : (
//                 filteredVendors.map((vendor) => (
//                   <tr key={vendor.docId || vendor.vendorId} className="hover:bg-slate-50">
//                     <td className="px-5 py-4">
//                       <div className="flex items-center gap-3">
//                         <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                           {initials(vendor.businessName)}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-slate-900">
//                             {vendor.businessName}
//                           </p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {vendor.vendorId}
//                           </p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.ownerName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {vendor.phone}
//                       </p>
//                       <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
//                         {vendor.email}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <p className="text-sm font-semibold text-slate-800">
//                         {vendor.districtName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-500">
//                         {vendor.stateName}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         {vendor.pincode}
//                       </p>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex max-w-[210px] flex-wrap gap-1.5">
//                         {vendor.modules.length === 0 ? (
//                           <span className="text-xs text-slate-400">—</span>
//                         ) : (
//                           vendor.modules.map((module) => (
//                             <span
//                               key={String(module)}
//                               className={`rounded-md px-2 py-1 text-[10px] font-bold ${getModuleClasses(
//                                 module
//                               )}`}
//                             >
//                               {getModuleLabel(module)}
//                             </span>
//                           ))
//                         )}
//                       </div>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
//                           vendor.verificationStatus
//                         )}`}
//                       >
//                         {vendor.verificationStatus}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <span
//                         className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                           vendor.status
//                         )}`}
//                       >
//                         {vendor.status}
//                       </span>
//                     </td>
//                     <td className="px-5 py-4">
//                       <div className="flex items-center justify-end gap-2">
//                         <Link
//                           href={`/entity-management/vendors/${vendor.vendorId}`}
//                           className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
//                         >
//                           View Details
//                         </Link>
//                         <button
//                           type="button"
//                           onClick={() => openStatusModal(vendor)}
//                           className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
//                         >
//                           Status
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       <div className="grid grid-cols-1 gap-4 lg:hidden">
//         {filteredVendors.map((vendor) => (
//           <div
//             key={vendor.docId || vendor.vendorId}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >
//             <div className="flex items-start justify-between gap-3">
//               <div className="flex items-start gap-3">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//                   {initials(vendor.businessName)}
//                 </div>
//                 <div>
//                   <h2 className="text-sm font-bold text-slate-900">
//                     {vendor.businessName}
//                   </h2>
//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.vendorId}
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     {vendor.ownerName}
//                   </p>
//                 </div>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${getStatusClasses(
//                   vendor.status
//                 )}`}
//               >
//                 {vendor.status}
//               </span>
//             </div>
//             <div className="mt-5 flex gap-2">
//               <Link
//                 href={`/entity-management/vendors/${vendor.vendorId}`}
//                 className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-center text-xs font-semibold text-slate-700"
//               >
//                 View Details
//               </Link>
//               <button
//                 type="button"
//                 onClick={() => openStatusModal(vendor)}
//                 className="flex-1 rounded-lg bg-orange-500 px-3 py-2.5 text-xs font-semibold text-white"
//               >
//                 Change Status
//               </button>
//             </div>
//           </div>
//         ))}
//         {!loading && filteredVendors.length === 0 && <EmptyState />}
//       </div>

//       {showStatusModal && selectedVendor && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold text-slate-900">
//               Change Vendor Status
//             </h2>
//             <p className="mt-1 text-xs text-slate-500">
//               {selectedVendor.businessName} · doc{" "}
//               {selectedVendor.docId || selectedVendor.vendorId}
//             </p>
//             {isVerificationBlockingActive(selectedVendor.verificationStatus) && (
//               <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
//                 ACTIVE blocked until verification is ACTIVE (
//                 {selectedVendor.verificationStatus}).
//               </p>
//             )}
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
//               ).map((status) => {
//                 const blocked =
//                   status === "ACTIVE" &&
//                   isVerificationBlockingActive(
//                     selectedVendor.verificationStatus
//                   );
//                 return (
//                   <button
//                     key={status}
//                     type="button"
//                     disabled={statusSaving || blocked}
//                     onClick={() => void updateVendorStatus(status)}
//                     className={`flex w-full items-center justify-between rounded-lg border p-4 text-left disabled:opacity-50 ${
//                       selectedVendor.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200 hover:bg-slate-50"
//                     }`}
//                   >
//                     <span className="text-sm font-semibold">
//                       {statusSaving ? "Saving…" : status}
//                       {blocked ? " (blocked)" : ""}
//                     </span>
//                     {selectedVendor.status === status && (
//                       <span className="font-bold text-orange-600">✓</span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={statusSaving}
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-5">
//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Vendor Governance
//         </h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Lists are filtered by auth claims. Status writes both{" "}
//           <code>status</code> and <code>accountStatus</code> using Firestore
//           document id (<code>docId</code>).
//         </p>
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
//   value: number;
//   description: string;
//   icon: string;
//   iconClass: string;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs font-medium text-slate-500">{title}</p>
//           <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
//           <p className="mt-1 text-xs text-slate-400">{description}</p>
//         </div>
//         <div
//           className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold ${iconClass}`}
//         >
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
//       <h3 className="text-base font-bold text-slate-900">No vendors found</h3>
//       <p className="mt-1 text-sm text-slate-500">
//         Empty <code>vendors</code> collection, filters too narrow, or outside
//         your role scope.
//       </p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useVendors,
  type Vendor,
  type VendorModule,
  type VendorStatus,
  type VerificationStatus,
  isVerificationBlockingActive,
} from "@/hooks/useVendors";
import useAuthScope from "@/hooks/useAuthScope";
import ScopeBadge from "@/components/hierarchy/ScopeBadge";
import {
  FIRESTORE_COLLECTIONS,
  isFirestoreDemoMode,
  updateDocument,
} from "@/lib/firebase/firestore";
import {
  filterByStateAndDistrict,
  type HierarchyScopeFilter,
} from "@/lib/hierarchy/scopeFilter";

function getStatusClasses(status: VendorStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-slate-100 text-slate-700";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    case "SUSPENDED":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getVerificationClasses(status: VerificationStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "SUBMITTED":
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "DRAFT":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getModuleClasses(module: VendorModule) {
  switch (String(module).toUpperCase()) {
    case "FOOD":
      return "bg-orange-50 text-orange-700";
    case "MART":
      return "bg-blue-50 text-blue-700";
    case "PHARMACY":
      return "bg-green-50 text-green-700";
    case "SHOPPING":
      return "bg-pink-50 text-pink-700";
    case "STAY":
      return "bg-purple-50 text-purple-700";
    case "HOME_SERVICES":
      return "bg-cyan-50 text-cyan-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

function getModuleLabel(module: VendorModule) {
  if (String(module).toUpperCase() === "HOME_SERVICES") return "HOME SERVICES";
  return String(module);
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function EntityVendorsPage() {
  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = useMemo(
    () => ({
      role: auth.role,
      stateId: auth.stateId,
      districtId: auth.districtId,
      isGlobalAdmin: auth.isGlobalAdmin,
    }),
    [auth.role, auth.stateId, auth.districtId, auth.isGlobalAdmin]
  );

  const vendorsApi = useVendors();
  const allVendors = vendorsApi.vendors ?? [];
  const loading = vendorsApi.loading;
  const error = vendorsApi.error;
  const demoMode = vendorsApi.demoMode;
  const refresh = vendorsApi.refresh;

  const vendors = useMemo(
    () => filterByStateAndDistrict(allVendors, scopeFilter),
    [allVendors, scopeFilter]
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | VendorStatus>("ALL");
  const [verificationFilter, setVerificationFilter] = useState<
    "ALL" | VerificationStatus
  >("ALL");
  const [moduleFilter, setModuleFilter] = useState<"ALL" | VendorModule>("ALL");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusSaving, setStatusSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredVendors = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vendors.filter((vendor) => {
      const matchesSearch =
        !q ||
        vendor.vendorId.toLowerCase().includes(q) ||
        vendor.businessName.toLowerCase().includes(q) ||
        vendor.ownerName.toLowerCase().includes(q) ||
        vendor.phone.toLowerCase().includes(q) ||
        vendor.email.toLowerCase().includes(q) ||
        vendor.districtName.toLowerCase().includes(q) ||
        vendor.stateName.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "ALL" || vendor.status === statusFilter;
      const matchesVerification =
        verificationFilter === "ALL" ||
        vendor.verificationStatus === verificationFilter;
      const matchesModule =
        moduleFilter === "ALL" ||
        vendor.modules.some(
          (m) => String(m).toUpperCase() === String(moduleFilter).toUpperCase()
        );
      return (
        matchesSearch && matchesStatus && matchesVerification && matchesModule
      );
    });
  }, [vendors, search, statusFilter, verificationFilter, moduleFilter]);

  const activeCount = vendors.filter((v) => v.status === "ACTIVE").length;
  const pendingCount = vendors.filter(
    (v) =>
      v.verificationStatus === "PENDING" ||
      v.verificationStatus === "SUBMITTED"
  ).length;
  const suspendedCount = vendors.filter((v) => v.status === "SUSPENDED").length;
  const blockedCount = vendors.filter((v) => v.status === "BLOCKED").length;

  async function updateVendorStatus(status: VendorStatus) {
    if (!selectedVendor) return;
    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }
    if (
      status === "ACTIVE" &&
      isVerificationBlockingActive(selectedVendor.verificationStatus)
    ) {
      setSuccessMessage(
        `Cannot set ACTIVE: verification is ${selectedVendor.verificationStatus}.`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }
    setStatusSaving(true);
    try {
      const writeId = selectedVendor.docId || selectedVendor.vendorId;
      await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, writeId, {
        status,
        accountStatus: status,
      });
      setShowStatusModal(false);
      setSuccessMessage(`${selectedVendor.businessName} → ${status}`);
      setTimeout(() => setSuccessMessage(""), 4000);
      await refresh();
    } catch (err) {
      setSuccessMessage(
        err instanceof Error ? err.message : "Failed to update status."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    } finally {
      setStatusSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/entity-management"
              className="text-sm font-medium text-slate-500 hover:text-orange-600"
            >
              Entity Management
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-sm font-medium text-slate-800">Vendors</span>
            <ScopeBadge />
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
            Vendor Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Firestore <code>vendors</code>
            {demoMode ? " · demo mode" : ""}.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          ["Active", activeCount],
          ["Pending KYC", pendingCount],
          ["Suspended", suspendedCount],
          ["Blocked", blockedCount],
        ].map(([t, v]) => (
          <div key={String(t)} className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">{t}</p>
            <p className="mt-1 text-2xl font-bold">{loading ? "…" : v}</p>
          </div>
        ))}
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <input
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm lg:col-span-2"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "ALL" | VendorStatus)
            }
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="BLOCKED">Blocked</option>
          </select>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            value={verificationFilter}
            onChange={(e) =>
              setVerificationFilter(
                e.target.value as "ALL" | VerificationStatus
              )
            }
          >
            <option value="ALL">All Verification</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="DRAFT">Draft</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm"
            value={moduleFilter}
            onChange={(e) =>
              setModuleFilter(e.target.value as "ALL" | VendorModule)
            }
          >
            <option value="ALL">All Modules</option>
            <option value="FOOD">Food</option>
            <option value="MART">Mart</option>
            <option value="PHARMACY">Pharmacy</option>
            <option value="SHOPPING">Shopping</option>
            <option value="STAY">Stay</option>
            <option value="HOME_SERVICES">Home Services</option>
          </select>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Showing {filteredVendors.length} of {vendors.length}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left">
            <thead className="border-b bg-slate-50 text-xs font-bold uppercase text-slate-500">
              <tr>
                <th className="px-5 py-4">Vendor</th>
                <th className="px-5 py-4">Owner</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Modules</th>
                <th className="px-5 py-4">Verification</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm">
                    Loading…
                  </td>
                </tr>
              ) : filteredVendors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm">
                    No vendors in scope
                  </td>
                </tr>
              ) : (
                filteredVendors.map((vendor) => (
                  <tr
                    key={vendor.docId || vendor.vendorId}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-xs font-bold text-orange-600">
                          {initials(vendor.businessName)}
                        </div>
                        <div>
                          <p className="text-sm font-bold">
                            {vendor.businessName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {vendor.vendorId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p className="font-semibold">{vendor.ownerName}</p>
                      <p className="text-xs text-slate-500">{vendor.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <p>{vendor.districtName}</p>
                      <p className="text-xs text-slate-500">
                        {vendor.stateName}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {vendor.modules.map((m) => (
                          <span
                            key={String(m)}
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${getModuleClasses(
                              m
                            )}`}
                          >
                            {getModuleLabel(m)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
                          vendor.verificationStatus
                        )}`}
                      >
                        {vendor.verificationStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                          vendor.status
                        )}`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/entity-management/vendors/${encodeURIComponent(
                            vendor.vendorId
                          )}`}
                          className="rounded-lg border px-3 py-2 text-xs font-semibold"
                        >
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedVendor(vendor);
                            setShowStatusModal(true);
                          }}
                          className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
                        >
                          Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showStatusModal && selectedVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6">
            <h2 className="text-lg font-bold">Change Status</h2>
            <p className="mt-1 text-xs text-slate-500">
              {selectedVendor.businessName} ·{" "}
              {selectedVendor.docId || selectedVendor.vendorId}
            </p>
            <div className="mt-4 space-y-2">
              {(
                ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
              ).map((st) => {
                const blocked =
                  st === "ACTIVE" &&
                  isVerificationBlockingActive(
                    selectedVendor.verificationStatus
                  );
                return (
                  <button
                    key={st}
                    type="button"
                    disabled={statusSaving || blocked}
                    onClick={() => void updateVendorStatus(st)}
                    className={`flex w-full justify-between rounded-lg border p-4 text-sm font-semibold disabled:opacity-50 ${
                      selectedVendor.status === st
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {statusSaving ? "Saving…" : st}
                    {blocked ? " (blocked)" : ""}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-lg border py-2.5 text-sm font-semibold"
              onClick={() => setShowStatusModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}