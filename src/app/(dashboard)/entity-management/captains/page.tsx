// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type CaptainStatus =
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

// type AvailabilityStatus =
//   | "AVAILABLE"
//   | "BUSY"
//   | "BLOCKED";

// type OnlineStatus =
//   | "ONLINE"
//   | "OFFLINE";

// type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS";

// interface Captain {
//   captainId: string;
//   uid: string;
//   name: string;
//   phone: string;
//   email: string;
//   status: CaptainStatus;
//   verificationStatus: VerificationStatus;
//   onlineStatus: OnlineStatus;
//   availabilityStatus: AvailabilityStatus;
//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   serviceIds: ServiceId[];
//   vehicleType: string;
//   vehicleNumber: string;
//   rating: number;
//   completedTrips: number;
//   cancelledTrips: number;
//   createdAt: string;
//   updatedAt: string;
//   lastActiveAt: string;
// }

// const INITIAL_CAPTAINS: Captain[] = [
//   {
//     captainId: "CAP-10001",
//     uid: "USR-CAP-10001",
//     name: "Ravi Kumar",
//     phone: "+91 98765 10001",
//     email: "ravi.kumar@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     onlineStatus: "ONLINE",
//     availabilityStatus: "AVAILABLE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522001",
//     serviceIds: ["JURIDE"],
//     vehicleType: "Bike",
//     vehicleNumber: "AP07 AB 1234",
//     rating: 4.8,
//     completedTrips: 342,
//     cancelledTrips: 8,
//     createdAt: "12 Aug 2026",
//     updatedAt: "05 Oct 2026",
//     lastActiveAt: "Today, 8:45 PM",
//   },
//   {
//     captainId: "CAP-10002",
//     uid: "USR-CAP-10002",
//     name: "Suresh Reddy",
//     phone: "+91 98765 10002",
//     email: "suresh.reddy@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     onlineStatus: "ONLINE",
//     availabilityStatus: "BUSY",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522007",
//     serviceIds: ["JURIDE", "JURENTALS"],
//     vehicleType: "Car",
//     vehicleNumber: "AP07 CD 5678",
//     rating: 4.6,
//     completedTrips: 218,
//     cancelledTrips: 5,
//     createdAt: "20 Aug 2026",
//     updatedAt: "05 Oct 2026",
//     lastActiveAt: "Today, 8:38 PM",
//   },
//   {
//     captainId: "CAP-10003",
//     uid: "USR-CAP-10003",
//     name: "Prasad Naidu",
//     phone: "+91 98765 10003",
//     email: "prasad.naidu@example.com",
//     status: "ACTIVE",
//     verificationStatus: "ACTIVE",
//     onlineStatus: "OFFLINE",
//     availabilityStatus: "AVAILABLE",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VJA",
//     districtName: "NTR",
//     pincode: "520010",
//     serviceIds: ["JULOGISTICS"],
//     vehicleType: "Mini Truck",
//     vehicleNumber: "AP16 EF 9012",
//     rating: 4.5,
//     completedTrips: 156,
//     cancelledTrips: 11,
//     createdAt: "25 Aug 2026",
//     updatedAt: "04 Oct 2026",
//     lastActiveAt: "Yesterday, 10:15 PM",
//   },
//   {
//     captainId: "CAP-10004",
//     uid: "USR-CAP-10004",
//     name: "Mahesh Babu",
//     phone: "+91 98765 10004",
//     email: "mahesh.babu@example.com",
//     status: "SUSPENDED",
//     verificationStatus: "PENDING",
//     onlineStatus: "OFFLINE",
//     availabilityStatus: "BLOCKED",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522034",
//     serviceIds: ["JUPARCEL"],
//     vehicleType: "Bike",
//     vehicleNumber: "AP07 GH 3456",
//     rating: 4.1,
//     completedTrips: 74,
//     cancelledTrips: 14,
//     createdAt: "01 Sep 2026",
//     updatedAt: "03 Oct 2026",
//     lastActiveAt: "03 Oct 2026, 6:20 PM",
//   },
//   {
//     captainId: "CAP-10005",
//     uid: "USR-CAP-10005",
//     name: "Kiran Kumar",
//     phone: "+91 98765 10005",
//     email: "kiran.kumar@example.com",
//     status: "ACTIVE",
//     verificationStatus: "SUBMITTED",
//     onlineStatus: "OFFLINE",
//     availabilityStatus: "AVAILABLE",
//     stateId: "TS",
//     stateName: "Telangana",
//     districtId: "HYD",
//     districtName: "Hyderabad",
//     pincode: "500001",
//     serviceIds: ["JUPACKERS_MOVERS"],
//     vehicleType: "Truck",
//     vehicleNumber: "TS09 IJ 7890",
//     rating: 4.7,
//     completedTrips: 89,
//     cancelledTrips: 3,
//     createdAt: "05 Sep 2026",
//     updatedAt: "05 Oct 2026",
//     lastActiveAt: "Today, 6:30 PM",
//   },
//   {
//     captainId: "CAP-10006",
//     uid: "USR-CAP-10006",
//     name: "Venkatesh Rao",
//     phone: "+91 98765 10006",
//     email: "venkatesh.rao@example.com",
//     status: "BLOCKED",
//     verificationStatus: "REJECTED",
//     onlineStatus: "OFFLINE",
//     availabilityStatus: "BLOCKED",
//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VJA",
//     districtName: "NTR",
//     pincode: "520015",
//     serviceIds: ["JURIDE"],
//     vehicleType: "Bike",
//     vehicleNumber: "AP16 KL 1122",
//     rating: 3.9,
//     completedTrips: 31,
//     cancelledTrips: 18,
//     createdAt: "10 Sep 2026",
//     updatedAt: "01 Oct 2026",
//     lastActiveAt: "01 Oct 2026, 2:10 PM",
//   },
// ];

// function getStatusClasses(status: CaptainStatus) {
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

// function getOnlineClasses(status: OnlineStatus) {
//   return status === "ONLINE"
//     ? "bg-green-100 text-green-700"
//     : "bg-slate-100 text-slate-700";
// }

// function getAvailabilityClasses(
//   status: AvailabilityStatus
// ) {
//   switch (status) {
//     case "AVAILABLE":
//       return "bg-green-100 text-green-700";

//     case "BUSY":
//       return "bg-blue-100 text-blue-700";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getServiceClasses(service: ServiceId) {
//   switch (service) {
//     case "JURIDE":
//       return "bg-blue-50 text-blue-700";

//     case "JURENTALS":
//       return "bg-purple-50 text-purple-700";

//     case "JULOGISTICS":
//       return "bg-orange-50 text-orange-700";

//     case "JUPARCEL":
//       return "bg-green-50 text-green-700";

//     case "JUPACKERS_MOVERS":
//       return "bg-pink-50 text-pink-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// export default function CaptainsPage() {
//   const [captains, setCaptains] =
//     useState<Captain[]>(INITIAL_CAPTAINS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] = useState<
//     "ALL" | CaptainStatus
//   >("ALL");

//   const [verificationFilter, setVerificationFilter] =
//     useState<"ALL" | VerificationStatus>("ALL");

//   const [onlineFilter, setOnlineFilter] = useState<
//     "ALL" | OnlineStatus
//   >("ALL");

//   const [serviceFilter, setServiceFilter] = useState<
//     "ALL" | ServiceId
//   >("ALL");

//   const [selectedCaptain, setSelectedCaptain] =
//     useState<Captain | null>(null);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [showDetailsModal, setShowDetailsModal] =
//     useState(false);

//   const [statusMessage, setStatusMessage] =
//     useState("");

//   const filteredCaptains = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return captains.filter((captain) => {
//       const matchesSearch =
//         query.length === 0 ||
//         captain.captainId
//           .toLowerCase()
//           .includes(query) ||
//         captain.name.toLowerCase().includes(query) ||
//         captain.phone.toLowerCase().includes(query) ||
//         captain.email.toLowerCase().includes(query) ||
//         captain.stateName
//           .toLowerCase()
//           .includes(query) ||
//         captain.districtName
//           .toLowerCase()
//           .includes(query) ||
//         captain.vehicleNumber
//           .toLowerCase()
//           .includes(query);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         captain.status === statusFilter;

//       const matchesVerification =
//         verificationFilter === "ALL" ||
//         captain.verificationStatus ===
//           verificationFilter;

//       const matchesOnline =
//         onlineFilter === "ALL" ||
//         captain.onlineStatus === onlineFilter;

//       const matchesService =
//         serviceFilter === "ALL" ||
//         captain.serviceIds.includes(serviceFilter);

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesVerification &&
//         matchesOnline &&
//         matchesService
//       );
//     });
//   }, [
//     captains,
//     search,
//     statusFilter,
//     verificationFilter,
//     onlineFilter,
//     serviceFilter,
//   ]);

//   const totalCaptains = captains.length;

//   const activeCaptains = captains.filter(
//     (captain) => captain.status === "ACTIVE"
//   ).length;

//   const onlineCaptains = captains.filter(
//     (captain) => captain.onlineStatus === "ONLINE"
//   ).length;

//   const availableCaptains = captains.filter(
//     (captain) =>
//       captain.availabilityStatus === "AVAILABLE"
//   ).length;

//   const pendingVerification = captains.filter(
//     (captain) =>
//       captain.verificationStatus === "SUBMITTED" ||
//       captain.verificationStatus === "PENDING"
//   ).length;

//   const blockedCaptains = captains.filter(
//     (captain) =>
//       captain.status === "BLOCKED" ||
//       captain.status === "SUSPENDED"
//   ).length;

//   function openDetails(captain: Captain) {
//     setSelectedCaptain(captain);
//     setShowDetailsModal(true);
//   }

//   function openStatusModal(captain: Captain) {
//     setSelectedCaptain(captain);
//     setShowStatusModal(true);
//   }

//   function updateCaptainStatus(
//     newStatus: CaptainStatus
//   ) {
//     if (!selectedCaptain) {
//       return;
//     }

//     setCaptains((current) =>
//       current.map((captain) =>
//         captain.captainId ===
//         selectedCaptain.captainId
//           ? {
//               ...captain,
//               status: newStatus,
//               updatedAt: "Just now",
//               availabilityStatus:
//                 newStatus === "BLOCKED" ||
//                 newStatus === "SUSPENDED"
//                   ? "BLOCKED"
//                   : captain.availabilityStatus,
//               onlineStatus:
//                 newStatus === "BLOCKED" ||
//                 newStatus === "SUSPENDED"
//                   ? "OFFLINE"
//                   : captain.onlineStatus,
//             }
//           : captain
//       )
//     );

//     setShowStatusModal(false);

//     setStatusMessage(
//       `${selectedCaptain.name} status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setStatusMessage("");
//     }, 3000);
//   }

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setVerificationFilter("ALL");
//     setOnlineFilter("ALL");
//     setServiceFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* PAGE HEADER */}
//       <div className="mb-6">

//         <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

//           <div>

//             <div className="mb-3 flex flex-wrap items-center gap-2">

//               <Link
//                 href="/entity-management"
//                 className="text-sm font-medium text-slate-500 hover:text-orange-600"
//               >
//                 Entity Management
//               </Link>

//               <span className="text-slate-400">
//                 /
//               </span>

//               <span className="text-sm text-slate-700">
//                 Captains
//               </span>

//             </div>

//             <h1 className="text-2xl font-bold text-slate-900">
//               Captains
//             </h1>

//             <p className="mt-1 text-sm text-slate-500">
//               Manage captain accounts, verification,
//               services, availability and operational
//               status.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* SUCCESS MESSAGE */}
//       {statusMessage && (
//         <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {statusMessage}
//         </div>
//       )}

//       {/* SUMMARY CARDS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Total Captains
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {totalCaptains}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Active
//           </p>

//           <p className="mt-2 text-2xl font-bold text-green-600">
//             {activeCaptains}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Online
//           </p>

//           <p className="mt-2 text-2xl font-bold text-blue-600">
//             {onlineCaptains}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Available
//           </p>

//           <p className="mt-2 text-2xl font-bold text-green-600">
//             {availableCaptains}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Verification Pending
//           </p>

//           <p className="mt-2 text-2xl font-bold text-yellow-600">
//             {pendingVerification}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Blocked / Suspended
//           </p>

//           <p className="mt-2 text-2xl font-bold text-red-600">
//             {blockedCaptains}
//           </p>

//         </div>

//       </div>

//       {/* FILTERS */}
//       <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">

//           <div className="xl:col-span-1">

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Search
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Name, ID, phone, vehicle..."
//               className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | CaptainStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="ACTIVE">
//                 ACTIVE
//               </option>

//               <option value="INACTIVE">
//                 INACTIVE
//               </option>

//               <option value="SUSPENDED">
//                 SUSPENDED
//               </option>

//               <option value="BLOCKED">
//                 BLOCKED
//               </option>

//             </select>

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
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
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Verification
//               </option>

//               <option value="DRAFT">
//                 DRAFT
//               </option>

//               <option value="SUBMITTED">
//                 SUBMITTED
//               </option>

//               <option value="PENDING">
//                 PENDING
//               </option>

//               <option value="ACTIVE">
//                 ACTIVE
//               </option>

//               <option value="REJECTED">
//                 REJECTED
//               </option>

//             </select>

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Online
//             </label>

//             <select
//               value={onlineFilter}
//               onChange={(event) =>
//                 setOnlineFilter(
//                   event.target.value as
//                     | "ALL"
//                     | OnlineStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All
//               </option>

//               <option value="ONLINE">
//                 ONLINE
//               </option>

//               <option value="OFFLINE">
//                 OFFLINE
//               </option>

//             </select>

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Service
//             </label>

//             <select
//               value={serviceFilter}
//               onChange={(event) =>
//                 setServiceFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ServiceId
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Services
//               </option>

//               <option value="JURIDE">
//                 JURIDE
//               </option>

//               <option value="JURENTALS">
//                 JURENTALS
//               </option>

//               <option value="JULOGISTICS">
//                 JULOGISTICS
//               </option>

//               <option value="JUPARCEL">
//                 JUPARCEL
//               </option>

//               <option value="JUPACKERS_MOVERS">
//                 JUPACKERS_MOVERS
//               </option>

//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredCaptains.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {captains.length}
//             </span>{" "}
//             captains
//           </p>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
//           >
//             Clear Filters
//           </button>

//         </div>

//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1200px]">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Captain
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Contact
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Service
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Verification
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Online
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Availability
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Scope
//                 </th>

//                 <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredCaptains.map((captain) => (

//                 <tr
//                   key={captain.captainId}
//                   className="transition hover:bg-slate-50"
//                 >

//                   {/* CAPTAIN */}
//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-3">

//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
//                         {captain.name
//                           .split(" ")
//                           .map((part) =>
//                             part.charAt(0)
//                           )
//                           .join("")
//                           .slice(0, 2)}
//                       </div>

//                       <div>

//                         <p className="text-sm font-semibold text-slate-900">
//                           {captain.name}
//                         </p>

//                         <p className="mt-1 text-xs text-slate-500">
//                           {captain.captainId}
//                         </p>

//                       </div>

//                     </div>

//                   </td>

//                   {/* CONTACT */}
//                   <td className="px-5 py-4">

//                     <p className="text-sm text-slate-700">
//                       {captain.phone}
//                     </p>

//                     <p className="mt-1 max-w-[180px] truncate text-xs text-slate-400">
//                       {captain.email}
//                     </p>

//                   </td>

//                   {/* SERVICE */}
//                   <td className="px-5 py-4">

//                     <div className="flex max-w-[190px] flex-wrap gap-1">

//                       {captain.serviceIds.map(
//                         (service) => (
//                           <span
//                             key={service}
//                             className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getServiceClasses(
//                               service
//                             )}`}
//                           >
//                             {service}
//                           </span>
//                         )
//                       )}

//                     </div>

//                   </td>

//                   {/* VERIFICATION */}
//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                         captain.verificationStatus
//                       )}`}
//                     >
//                       {captain.verificationStatus}
//                     </span>

//                   </td>

//                   {/* ONLINE */}
//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                         captain.onlineStatus
//                       )}`}
//                     >
//                       {captain.onlineStatus}
//                     </span>

//                   </td>

//                   {/* AVAILABILITY */}
//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                         captain.availabilityStatus
//                       )}`}
//                     >
//                       {captain.availabilityStatus}
//                     </span>

//                   </td>

//                   {/* STATUS */}
//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         captain.status
//                       )}`}
//                     >
//                       {captain.status}
//                     </span>

//                   </td>

//                   {/* SCOPE */}
//                   <td className="px-5 py-4">

//                     <p className="text-xs font-semibold text-slate-700">
//                       {captain.districtName}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {captain.pincode}
//                     </p>

//                   </td>

//                   {/* ACTIONS */}
//                   <td className="px-5 py-4">

//                     <div className="flex justify-end gap-2">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openDetails(captain)
//                         }
//                         className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                       >
//                         View
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           openStatusModal(captain)
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

//         {filteredCaptains.length === 0 && (
//           <div className="p-12 text-center">

//             <p className="text-sm font-semibold text-slate-700">
//               No captains found
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Try changing your search or filters.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* MOBILE CARDS */}
//       <div className="space-y-4 md:hidden">

//         {filteredCaptains.map((captain) => (

//           <div
//             key={captain.captainId}
//             className="rounded-xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div className="flex items-center gap-3">

//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
//                   {captain.name
//                     .split(" ")
//                     .map((part) =>
//                       part.charAt(0)
//                     )
//                     .join("")
//                     .slice(0, 2)}
//                 </div>

//                 <div>

//                   <p className="text-sm font-bold text-slate-900">
//                     {captain.name}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {captain.captainId}
//                   </p>

//                 </div>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <div>

//                 <p className="text-[11px] text-slate-400">
//                   Phone
//                 </p>

//                 <p className="mt-1 text-xs font-medium text-slate-700">
//                   {captain.phone}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-[11px] text-slate-400">
//                   Vehicle
//                 </p>

//                 <p className="mt-1 text-xs font-medium text-slate-700">
//                   {captain.vehicleNumber}
//                 </p>

//               </div>

//               <div>

//                 <p className="text-[11px] text-slate-400">
//                   Online
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>

//               </div>

//               <div>

//                 <p className="text-[11px] text-slate-400">
//                   Availability
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>

//               </div>

//             </div>

//             <div className="mt-4">

//               <p className="mb-2 text-[11px] text-slate-400">
//                 Services
//               </p>

//               <div className="flex flex-wrap gap-1">

//                 {captain.serviceIds.map(
//                   (service) => (
//                     <span
//                       key={service}
//                       className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getServiceClasses(
//                         service
//                       )}`}
//                     >
//                       {service}
//                     </span>
//                   )
//                 )}

//               </div>

//             </div>

//             <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

//               <div>

//                 <p className="text-[11px] text-slate-400">
//                   Verification
//                 </p>

//                 <span
//                   className={`mt-1 inline-block rounded-full px-2 py-1 text-[11px] font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   {captain.verificationStatus}
//                 </span>

//               </div>

//               <div className="flex gap-2">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openDetails(captain)
//                   }
//                   className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
//                 >
//                   View
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openStatusModal(captain)
//                   }
//                   className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
//                 >
//                   Status
//                 </button>

//               </div>

//             </div>

//           </div>

//         ))}

//         {filteredCaptains.length === 0 && (
//           <div className="rounded-xl bg-white p-10 text-center shadow-sm">

//             <p className="text-sm font-semibold text-slate-700">
//               No captains found
//             </p>

//             <p className="mt-1 text-xs text-slate-500">
//               Try changing your search or filters.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* DETAILS MODAL */}
//       {showDetailsModal && selectedCaptain && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//             <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">

//               <div>

//                 <h2 className="text-xl font-bold text-slate-900">
//                   Captain Details
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {selectedCaptain.captainId}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowDetailsModal(false)
//                 }
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="space-y-6 p-6">

//               {/* BASIC */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Basic Information
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Name
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.name}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Captain ID
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.captainId}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Firebase UID
//                     </p>

//                     <p className="mt-1 break-all text-sm font-semibold text-slate-900">
//                       {selectedCaptain.uid}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Phone
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.phone}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Email
//                     </p>

//                     <p className="mt-1 break-all text-sm font-semibold text-slate-900">
//                       {selectedCaptain.email}
//                     </p>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-500">
//                       Rating
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       ★ {selectedCaptain.rating}
//                     </p>
//                   </div>

//                 </div>

//               </div>

//               {/* SERVICE */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Captain Services
//                 </h3>

//                 <div className="mt-4 flex flex-wrap gap-2">

//                   {selectedCaptain.serviceIds.map(
//                     (service) => (
//                       <span
//                         key={service}
//                         className={`rounded-md px-3 py-2 text-xs font-semibold ${getServiceClasses(
//                           service
//                         )}`}
//                       >
//                         {service}
//                       </span>
//                     )
//                   )}

//                 </div>

//               </div>

//               {/* VEHICLE */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Vehicle
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-500">
//                       Vehicle Type
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.vehicleType}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-500">
//                       Vehicle Number
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.vehicleNumber}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* STATUS */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Operational Status
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

//                   <div className="rounded-lg border border-slate-200 p-4">

//                     <p className="text-xs text-slate-500">
//                       Account
//                     </p>

//                     <span
//                       className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                         selectedCaptain.status
//                       )}`}
//                     >
//                       {selectedCaptain.status}
//                     </span>

//                   </div>

//                   <div className="rounded-lg border border-slate-200 p-4">

//                     <p className="text-xs text-slate-500">
//                       Online
//                     </p>

//                     <span
//                       className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                         selectedCaptain.onlineStatus
//                       )}`}
//                     >
//                       {selectedCaptain.onlineStatus}
//                     </span>

//                   </div>

//                   <div className="rounded-lg border border-slate-200 p-4">

//                     <p className="text-xs text-slate-500">
//                       Availability
//                     </p>

//                     <span
//                       className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                         selectedCaptain.availabilityStatus
//                       )}`}
//                     >
//                       {selectedCaptain.availabilityStatus}
//                     </span>

//                   </div>

//                 </div>

//               </div>

//               {/* VERIFICATION */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Verification
//                 </h3>

//                 <div className="mt-4 rounded-lg bg-slate-50 p-4">

//                   <p className="text-xs text-slate-500">
//                     Verification Status
//                   </p>

//                   <span
//                     className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
//                       selectedCaptain.verificationStatus
//                     )}`}
//                   >
//                     {selectedCaptain.verificationStatus}
//                   </span>

//                 </div>

//               </div>

//               {/* SCOPE */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Location Scope
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-500">
//                       State
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.stateName}
//                     </p>

//                     <p className="text-xs text-slate-400">
//                       {selectedCaptain.stateId}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-500">
//                       District
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.districtName}
//                     </p>

//                     <p className="text-xs text-slate-400">
//                       {selectedCaptain.districtId}
//                     </p>

//                   </div>

//                   <div className="rounded-lg bg-slate-50 p-4">

//                     <p className="text-xs text-slate-500">
//                       Pincode
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-900">
//                       {selectedCaptain.pincode}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* PERFORMANCE */}
//               <div>

//                 <h3 className="text-sm font-bold text-slate-900">
//                   Operational Summary
//                 </h3>

//                 <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

//                   <div className="rounded-lg border border-green-200 bg-green-50 p-4">

//                     <p className="text-xs text-green-700">
//                       Completed Trips
//                     </p>

//                     <p className="mt-1 text-2xl font-bold text-green-700">
//                       {selectedCaptain.completedTrips}
//                     </p>

//                   </div>

//                   <div className="rounded-lg border border-red-200 bg-red-50 p-4">

//                     <p className="text-xs text-red-700">
//                       Cancelled Trips
//                     </p>

//                     <p className="mt-1 text-2xl font-bold text-red-700">
//                       {selectedCaptain.cancelledTrips}
//                     </p>

//                   </div>

//                   <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">

//                     <p className="text-xs text-blue-700">
//                       Rating
//                     </p>

//                     <p className="mt-1 text-2xl font-bold text-blue-700">
//                       ★ {selectedCaptain.rating}
//                     </p>

//                   </div>

//                 </div>

//               </div>

//               {/* DATES */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

//                 <div>

//                   <p className="text-xs text-slate-500">
//                     Created
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-900">
//                     {selectedCaptain.createdAt}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-xs text-slate-500">
//                     Updated
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-900">
//                     {selectedCaptain.updatedAt}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-xs text-slate-500">
//                     Last Active
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-900">
//                     {selectedCaptain.lastActiveAt}
//                   </p>

//                 </div>

//               </div>

//             </div>

//             <div className="border-t border-slate-200 p-6">

//               <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowDetailsModal(false)
//                   }
//                   className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                 >
//                   Close
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowDetailsModal(false);
//                     openStatusModal(
//                       selectedCaptain
//                     );
//                   }}
//                   className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//                 >
//                   Change Status
//                 </button>

//               </div>

//             </div>

//           </div>

//         </div>
//       )}

//       {/* STATUS MODAL */}
//       {showStatusModal && selectedCaptain && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Change Captain Status
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {selectedCaptain.name} ·{" "}
//                   {selectedCaptain.captainId}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowStatusModal(false)
//                 }
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="mt-6 space-y-2">

//               {(
//                 [
//                   "ACTIVE",
//                   "INACTIVE",
//                   "SUSPENDED",
//                   "BLOCKED",
//                 ] as CaptainStatus[]
//               ).map((status) => (

//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() =>
//                     updateCaptainStatus(status)
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left transition ${
//                     selectedCaptain.status ===
//                     status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >

//                   <span className="text-sm font-semibold text-slate-800">
//                     {status}
//                   </span>

//                   {selectedCaptain.status ===
//                     status && (
//                     <span className="text-orange-600">
//                       ✓
//                     </span>
//                   )}

//                 </button>

//               ))}

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowStatusModal(false)
//               }
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Cancel
//             </button>

//           </div>

//         </div>
//       )}

//       {/* GOVERNANCE NOTE */}
//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-semibold text-orange-800">
//           JUERP Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Captain account, verification, service eligibility,
//           availability, location scope and operational status
//           must ultimately come from authoritative backend and
//           Firestore records. Dispatch, service eligibility,
//           pricing, commission, settlement and other financial
//           rules must not be calculated or overridden by this
//           client page. The status controls above are local
//           development UI actions and must be connected to an
//           authorized backend operation before production use.
//         </p>

//       </div>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useCaptains, {
  type Captain,
  type CaptainStatus,
  type VerificationStatus,
  type OnlineStatus,
  type AvailabilityStatus,
  type ServiceId,
} from "@/hooks/useCaptains";

function getStatusClasses(status: CaptainStatus) {
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

function getOnlineClasses(status: OnlineStatus) {
  return status === "ONLINE"
    ? "bg-green-100 text-green-700"
    : "bg-slate-100 text-slate-700";
}

function getAvailabilityClasses(status: AvailabilityStatus) {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-700";
    case "BUSY":
      return "bg-blue-100 text-blue-700";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getServiceClasses(service: ServiceId) {
  switch (String(service).toUpperCase()) {
    case "JURIDE":
      return "bg-blue-50 text-blue-700";
    case "JURENTALS":
      return "bg-purple-50 text-purple-700";
    case "JULOGISTICS":
      return "bg-orange-50 text-orange-700";
    case "JUPARCEL":
      return "bg-green-50 text-green-700";
    case "JUPACKERS_MOVERS":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CaptainsPage() {
  const { captains, loading, error, demoMode, refresh } = useCaptains();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | CaptainStatus>("ALL");
  const [verificationFilter, setVerificationFilter] = useState<
    "ALL" | VerificationStatus
  >("ALL");
  const [onlineFilter, setOnlineFilter] = useState<"ALL" | OnlineStatus>("ALL");
  const [serviceFilter, setServiceFilter] = useState<"ALL" | ServiceId>("ALL");
  const [selectedCaptain, setSelectedCaptain] = useState<Captain | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const filteredCaptains = useMemo(() => {
    const q = search.trim().toLowerCase();
    return captains.filter((c) => {
      const matchesSearch =
        !q ||
        c.captainId.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.stateName.toLowerCase().includes(q) ||
        c.districtName.toLowerCase().includes(q) ||
        c.vehicleNumber.toLowerCase().includes(q);

      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      const matchesVerification =
        verificationFilter === "ALL" ||
        c.verificationStatus === verificationFilter;
      const matchesOnline =
        onlineFilter === "ALL" || c.onlineStatus === onlineFilter;
      const matchesService =
        serviceFilter === "ALL" ||
        c.serviceIds.some(
          (s) => String(s).toUpperCase() === String(serviceFilter).toUpperCase()
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification &&
        matchesOnline &&
        matchesService
      );
    });
  }, [
    captains,
    search,
    statusFilter,
    verificationFilter,
    onlineFilter,
    serviceFilter,
  ]);

  const totalCaptains = captains.length;
  const activeCaptains = captains.filter((c) => c.status === "ACTIVE").length;
  const onlineCaptains = captains.filter((c) => c.onlineStatus === "ONLINE")
    .length;
  const availableCaptains = captains.filter(
    (c) => c.availabilityStatus === "AVAILABLE"
  ).length;
  const pendingVerification = captains.filter(
    (c) =>
      c.verificationStatus === "SUBMITTED" ||
      c.verificationStatus === "PENDING"
  ).length;
  const blockedCaptains = captains.filter(
    (c) => c.status === "BLOCKED" || c.status === "SUSPENDED"
  ).length;

  function openDetails(captain: Captain) {
    setSelectedCaptain(captain);
    setShowDetailsModal(true);
  }

  function openStatusModal(captain: Captain) {
    setSelectedCaptain(captain);
    setShowStatusModal(true);
  }

  function updateCaptainStatus(newStatus: CaptainStatus) {
    if (!selectedCaptain) return;
    setSelectedCaptain({
      ...selectedCaptain,
      status: newStatus,
      updatedAt: "Just now (local UI)",
      onlineStatus:
        newStatus === "BLOCKED" || newStatus === "SUSPENDED"
          ? "OFFLINE"
          : selectedCaptain.onlineStatus,
      availabilityStatus:
        newStatus === "BLOCKED" || newStatus === "SUSPENDED"
          ? "BLOCKED"
          : selectedCaptain.availabilityStatus,
    });
    setShowStatusModal(false);
    setStatusMessage(
      `${selectedCaptain.name}: local UI status → ${newStatus}. Persist via authorized backend.`
    );
    setTimeout(() => setStatusMessage(""), 4000);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setVerificationFilter("ALL");
    setOnlineFilter("ALL");
    setServiceFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Link
              href="/entity-management"
              className="text-sm font-medium text-slate-500 hover:text-orange-600"
            >
              Entity Management
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-sm text-slate-700">Captains</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Captains</h1>
          <p className="mt-1 text-sm text-slate-500">
            Live data from Firestore <code>captains</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {statusMessage && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {statusMessage}
        </div>
      )}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {/* {demoMode && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Demo mode — set <code>NEXT_PUBLIC_DEMO_MODE=false</code>.
        </div>
      )} */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <Summary label="Total Captains" value={loading ? "…" : String(totalCaptains)} />
        <Summary
          label="Active"
          value={loading ? "…" : String(activeCaptains)}
          className="text-green-600"
        />
        <Summary
          label="Online"
          value={loading ? "…" : String(onlineCaptains)}
          className="text-blue-600"
        />
        <Summary
          label="Available"
          value={loading ? "…" : String(availableCaptains)}
          className="text-green-600"
        />
        <Summary
          label="Verification Pending"
          value={loading ? "…" : String(pendingVerification)}
          className="text-yellow-600"
        />
        <Summary
          label="Blocked / Suspended"
          value={loading ? "…" : String(blockedCaptains)}
          className="text-red-600"
        />
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, ID, phone, vehicle…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Account Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | CaptainStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Verification
            </label>
            <select
              value={verificationFilter}
              onChange={(e) =>
                setVerificationFilter(
                  e.target.value as "ALL" | VerificationStatus
                )
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Verification</option>
              <option value="DRAFT">DRAFT</option>
              <option value="SUBMITTED">SUBMITTED</option>
              <option value="PENDING">PENDING</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Online
            </label>
            <select
              value={onlineFilter}
              onChange={(e) =>
                setOnlineFilter(e.target.value as "ALL" | OnlineStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All</option>
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Service
            </label>
            <select
              value={serviceFilter}
              onChange={(e) =>
                setServiceFilter(e.target.value as "ALL" | ServiceId)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Services</option>
              <option value="JURIDE">JURIDE</option>
              <option value="JURENTALS">JURENTALS</option>
              <option value="JULOGISTICS">JULOGISTICS</option>
              <option value="JUPARCEL">JUPARCEL</option>
              <option value="JUPACKERS_MOVERS">JUPACKERS_MOVERS</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredCaptains.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">{captains.length}</span>{" "}
            captains
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Captain
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Contact
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Service
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Verification
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Online
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Availability
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Scope
                </th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filteredCaptains.length === 0 ? (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Loading captains…
                  </td>
                </tr>
              ) : (
                filteredCaptains.map((captain) => (
                  <tr key={captain.captainId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                          {initials(captain.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {captain.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {captain.captainId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">{captain.phone}</p>
                      <p className="mt-1 max-w-[160px] truncate text-xs text-slate-400">
                        {captain.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1">
                        {captain.serviceIds.length === 0 ? (
                          <span className="text-xs text-slate-400">—</span>
                        ) : (
                          captain.serviceIds.map((s) => (
                            <span
                              key={String(s)}
                              className={`rounded-md px-2 py-1 text-[10px] font-semibold ${getServiceClasses(
                                s
                              )}`}
                            >
                              {s}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getVerificationClasses(
                          captain.verificationStatus
                        )}`}
                      >
                        {captain.verificationStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getOnlineClasses(
                          captain.onlineStatus
                        )}`}
                      >
                        {captain.onlineStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getAvailabilityClasses(
                          captain.availabilityStatus
                        )}`}
                      >
                        {captain.availabilityStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                          captain.status
                        )}`}
                      >
                        {captain.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-700">
                        {captain.districtName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {captain.stateName}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/entity-management/captains/${captain.captainId}`}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => openDetails(captain)}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openStatusModal(captain)}
                          className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
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
        {!loading && filteredCaptains.length === 0 && (
          <div className="p-12 text-center text-sm text-slate-500">
            No captains found. Empty <code>captains</code> collection or filters
            too narrow.
          </div>
        )}
      </div>

      <div className="space-y-4 md:hidden">
        {filteredCaptains.map((captain) => (
          <div
            key={captain.captainId}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {initials(captain.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{captain.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{captain.captainId}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                  captain.status
                )}`}
              >
                {captain.status}
              </span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Link
                href={`/entity-management/captains/${captain.captainId}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                Open
              </Link>
              <button
                type="button"
                onClick={() => openDetails(captain)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => openStatusModal(captain)}
                className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
              >
                Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetailsModal && selectedCaptain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-xl font-bold">{selectedCaptain.name}</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedCaptain.captainId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="text-2xl text-slate-400"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
              <Field label="Phone" value={selectedCaptain.phone} />
              <Field label="Email" value={selectedCaptain.email} />
              <Field label="Vehicle" value={selectedCaptain.vehicleNumber} />
              <Field label="Type" value={selectedCaptain.vehicleType} />
              <Field label="State" value={selectedCaptain.stateName} />
              <Field label="District" value={selectedCaptain.districtName} />
              <Field
                label="Completed trips"
                value={String(selectedCaptain.completedTrips)}
              />
              <Field
                label="Rating"
                value={`★ ${selectedCaptain.rating}`}
              />
            </div>
            <div className="border-t border-slate-200 p-6 text-right">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedCaptain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Change Captain Status</h2>
            <p className="mt-1 text-xs text-slate-500">
              UI-only until authorized backend write
            </p>
            <div className="mt-6 space-y-2">
              {(["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateCaptainStatus(status)}
                    className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
                      selectedCaptain.status === status
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    {status}
                    {selectedCaptain.status === status && (
                      <span className="text-orange-600">✓</span>
                    )}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-semibold text-orange-800">JUERP Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          Captain rows load from Firestore <code>captains</code>. Status controls
          are local UI only until a trusted Cloud Function + audit trail is wired.
        </p>
      </div>
    </div>
  );
}

function Summary({
  label,
  value,
  className = "text-slate-900",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}