// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";

// type CaptainStatus =
//   | "ACTIVE"
//   |  "INACTIVE"
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

// type OnlineStatus = "ONLINE" | "OFFLINE";

// type ServiceId =
//   | "JURIDE"
//   | "JURENTALS"
//   | "JULOGISTICS"
//   | "JUPARCEL"
//   | "JUPACKERS_MOVERS";

// type TabId =
//   | "overview"
//   | "kyc"
//   | "services"
//   | "activity";

// interface CaptainDocument {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: VerificationStatus;
//   uploadedAt: string;
// }

// interface CaptainActivity {
//   id: string;
//   title: string;
//   description: string;
//   createdAt: string;
//   type: "ACCOUNT" | "VERIFICATION" | "SERVICE" | "TRIP";
// }

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
//   address: string;

//   joinedAt: string;
//   lastActiveAt: string;
//   updatedAt: string;

//   rating: number;
//   completedTrips: number;
//   completedDeliveries: number;
//   cancelledTrips: number;

//   totalEarningsPaise: number;

//   services: ServiceId[];

//   vehicleType: string;
//   vehicleNumber: string;
//   licenseNumber: string;

//   kycDocuments: CaptainDocument[];

//   activity: CaptainActivity[];
// }

// const INITIAL_CAPTAIN: Captain = {
//   captainId: "CAP-10001",
//   uid: "USR-CAP-10001",

//   name: "Ravi Kumar",
//   phone: "+91 98765 10001",
//   email: "ravi.kumar@example.com",

//   status: "ACTIVE",
//   verificationStatus: "ACTIVE",
//   onlineStatus: "ONLINE",
//   availabilityStatus: "AVAILABLE",

//   stateId: "AP",
//   stateName: "Andhra Pradesh",
//   districtId: "GNT",
//   districtName: "Guntur",
//   pincode: "522001",
//   address: "Guntur, Andhra Pradesh",

//   joinedAt: "12 Aug 2026",
//   lastActiveAt: "Today, 8:45 PM",
//   updatedAt: "05 Oct 2026",

//   rating: 4.8,
//   completedTrips: 342,
//   completedDeliveries: 186,
//   cancelledTrips: 8,

//   totalEarningsPaise: 12845000,

//   services: ["JURIDE"],

//   vehicleType: "Bike",
//   vehicleNumber: "AP07 AB 1234",
//   licenseNumber: "AP07 20260012345",

//   kycDocuments: [
//     {
//       documentId: "DOC-10001",
//       documentType: "Aadhaar",
//       documentNumber: "XXXX XXXX 1234",
//       status: "ACTIVE",
//       uploadedAt: "12 Aug 2026",
//     },
//     {
//       documentId: "DOC-10002",
//       documentType: "Driving License",
//       documentNumber: "AP07 20260012345",
//       status: "ACTIVE",
//       uploadedAt: "12 Aug 2026",
//     },
//     {
//       documentId: "DOC-10003",
//       documentType: "Vehicle RC",
//       documentNumber: "AP07AB1234",
//       status: "ACTIVE",
//       uploadedAt: "12 Aug 2026",
//     },
//   ],

//   activity: [
//     {
//       id: "ACT-001",
//       title: "Captain account activated",
//       description:
//         "Captain account was activated after verification.",
//       createdAt: "12 Aug 2026",
//       type: "ACCOUNT",
//     },
//     {
//       id: "ACT-002",
//       title: "KYC verification completed",
//       description:
//         "Required captain verification documents were approved.",
//       createdAt: "13 Aug 2026",
//       type: "VERIFICATION",
//     },
//     {
//       id: "ACT-003",
//       title: "JURIDE service enabled",
//       description:
//         "Captain became eligible for JURIDE operations.",
//       createdAt: "13 Aug 2026",
//       type: "SERVICE",
//     },
//     {
//       id: "ACT-004",
//       title: "Trip completed",
//       description:
//         "Captain completed a customer trip.",
//       createdAt: "05 Oct 2026, 8:20 PM",
//       type: "TRIP",
//     },
//   ],
// };

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

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
//   if (status === "ONLINE") {
//     return "bg-green-100 text-green-700";
//   }

//   return "bg-slate-100 text-slate-700";
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

// function getActivityIcon(
//   type: CaptainActivity["type"]
// ) {
//   switch (type) {
//     case "ACCOUNT":
//       return "👤";

//     case "VERIFICATION":
//       return "✓";

//     case "SERVICE":
//       return "⚙";

//     case "TRIP":
//       return "🚗";

//     default:
//       return "•";
//   }
// }

// export default function CaptainDetailsPage() {
//   const params = useParams();

//   const captainId = String(
//     params?.captainId || INITIAL_CAPTAIN.captainId
//   );

//   const [captain, setCaptain] =
//     useState<Captain>({
//       ...INITIAL_CAPTAIN,
//       captainId,
//     });

//   const [activeTab, setActiveTab] =
//     useState<TabId>("overview");

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [showSuspendModal, setShowSuspendModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const initials = useMemo(() => {
//     return captain.name
//       .split(" ")
//       .map((part) => part.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain.name]);

//   function updateStatus(
//     newStatus: CaptainStatus
//   ) {
//     setCaptain((current) => ({
//       ...current,
//       status: newStatus,
//       updatedAt: "Just now",
//       onlineStatus:
//         newStatus === "BLOCKED" ||
//         newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : current.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" ||
//         newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : current.availabilityStatus,
//     }));

//     setShowStatusModal(false);
//     setShowSuspendModal(false);

//     setSuccessMessage(
//       `Captain status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   }

//   function openSuspendModal() {
//     setShowSuspendModal(true);
//   }

//   const tabs: {
//     id: TabId;
//     label: string;
//   }[] = [
//     {
//       id: "overview",
//       label: "Overview",
//     },
//     {
//       id: "kyc",
//       label: "KYC & Documents",
//     },
//     {
//       id: "services",
//       label: "Services & Vehicle",
//     },
//     {
//       id: "activity",
//       label: "Activity",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* BREADCRUMB */}
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">

//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <span className="font-medium text-slate-700">
//           {captain.captainId}
//         </span>

//       </div>

//       {/* SUCCESS */}
//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

//           <div className="flex items-start gap-4">

//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>

//             <div>

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>

//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>

//               </div>

//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>

//               <div className="mt-3 flex flex-wrap gap-2">

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification:{" "}
//                   {captain.verificationStatus}
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>

//               </div>

//             </div>

//           </div>

//           <div className="flex flex-col gap-2 sm:flex-row">

//             <button
//               type="button"
//               onClick={() =>
//                 setShowStatusModal(true)
//               }
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Change Status
//             </button>

//             <button
//               type="button"
//               onClick={openSuspendModal}
//               disabled={
//                 captain.status === "SUSPENDED"
//               }
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* STATISTICS */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Rating
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             ★ {captain.rating}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Completed Trips
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {captain.completedTrips}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Completed Deliveries
//           </p>

//           <p className="mt-2 text-2xl font-bold text-slate-900">
//             {captain.completedDeliveries}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Cancelled Trips
//           </p>

//           <p className="mt-2 text-2xl font-bold text-red-600">
//             {captain.cancelledTrips}
//           </p>

//         </div>

//         <div className="rounded-xl bg-white p-5 shadow-sm">

//           <p className="text-xs font-medium text-slate-500">
//             Recorded Earnings
//           </p>

//           <p className="mt-2 text-xl font-bold text-slate-900">
//             {formatCurrency(
//               captain.totalEarningsPaise
//             )}
//           </p>

//         </div>

//       </div>

//       {/* TABS */}
//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">

//         <div className="flex min-w-max border-b border-slate-200">

//           {tabs.map((tab) => (

//             <button
//               key={tab.id}
//               type="button"
//               onClick={() =>
//                 setActiveTab(tab.id)
//               }
//               className={`border-b-2 px-5 py-4 text-sm font-semibold transition ${
//                 activeTab === tab.id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500 hover:text-slate-800"
//               }`}
//             >
//               {tab.label}
//             </button>

//           ))}

//         </div>

//       </div>

//       {/* OVERVIEW */}
//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

//           {/* PERSONAL */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Personal Information
//             </h2>

//             <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">

//               <InfoItem
//                 label="Full Name"
//                 value={captain.name}
//               />

//               <InfoItem
//                 label="Captain ID"
//                 value={captain.captainId}
//               />

//               <InfoItem
//                 label="Phone"
//                 value={captain.phone}
//               />

//               <InfoItem
//                 label="Email"
//                 value={captain.email}
//               />

//               <InfoItem
//                 label="Firebase UID"
//                 value={captain.uid}
//               />

//               <InfoItem
//                 label="Joined At"
//                 value={captain.joinedAt}
//               />

//             </div>

//           </div>

//           {/* LOCATION */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Location Scope
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Administrative scope associated with this
//               captain.
//             </p>

//             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

//               <ScopeCard
//                 title="State"
//                 value={captain.stateName}
//                 code={captain.stateId}
//               />

//               <ScopeCard
//                 title="District"
//                 value={captain.districtName}
//                 code={captain.districtId}
//               />

//               <ScopeCard
//                 title="Pincode"
//                 value={captain.pincode}
//                 code="PINCODE"
//               />

//             </div>

//             <div className="mt-5">

//               <InfoItem
//                 label="Address"
//                 value={captain.address}
//               />

//             </div>

//           </div>

//           {/* OPERATIONAL */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Operational Status
//             </h2>

//             <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

//               <StatusBox
//                 label="Account"
//                 value={captain.status}
//                 className={getStatusClasses(
//                   captain.status
//                 )}
//               />

//               <StatusBox
//                 label="Online"
//                 value={captain.onlineStatus}
//                 className={getOnlineClasses(
//                   captain.onlineStatus
//                 )}
//               />

//               <StatusBox
//                 label="Availability"
//                 value={captain.availabilityStatus}
//                 className={getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}
//               />

//             </div>

//             <div className="mt-5">

//               <InfoItem
//                 label="Last Active"
//                 value={captain.lastActiveAt}
//               />

//             </div>

//           </div>

//           {/* SERVICES */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Enabled Services
//             </h2>

//             <div className="mt-5 flex flex-wrap gap-2">

//               {captain.services.map(
//                 (service) => (
//                   <span
//                     key={service}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       service
//                     )}`}
//                   >
//                     {service}
//                   </span>
//                 )
//               )}

//             </div>

//           </div>

//         </div>
//       )}

//       {/* KYC */}
//       {activeTab === "kyc" && (
//         <div className="rounded-xl bg-white shadow-sm">

//           <div className="border-b border-slate-200 p-6">

//             <h2 className="text-base font-bold text-slate-900">
//               KYC & Documents
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Captain verification documents and their
//               current verification state.
//             </p>

//           </div>

//           <div className="divide-y divide-slate-100">

//             {captain.kycDocuments.map(
//               (document) => (

//                 <div
//                   key={document.documentId}
//                   className="p-6"
//                 >

//                   <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//                     <div>

//                       <p className="text-sm font-bold text-slate-900">
//                         {document.documentType}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-500">
//                         Document ID:{" "}
//                         {document.documentId}
//                       </p>

//                       <p className="mt-2 text-sm text-slate-700">
//                         {document.documentNumber}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Uploaded:{" "}
//                         {document.uploadedAt}
//                       </p>

//                     </div>

//                     <span
//                       className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                         document.status
//                       )}`}
//                     >
//                       {document.status}
//                     </span>

//                   </div>

//                 </div>

//               )
//             )}

//           </div>

//         </div>
//       )}

//       {/* SERVICES & VEHICLE */}
//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

//           {/* SERVICES */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Captain Services
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Services for which this captain is currently
//               registered.
//             </p>

//             <div className="mt-5 space-y-3">

//               {captain.services.map(
//                 (service) => (

//                   <div
//                     key={service}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >

//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         service
//                       )}`}
//                     >
//                       {service}
//                     </span>

//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>

//                   </div>

//                 )
//               )}

//             </div>

//           </div>

//           {/* VEHICLE */}
//           <div className="rounded-xl bg-white p-6 shadow-sm">

//             <h2 className="text-base font-bold text-slate-900">
//               Vehicle Information
//             </h2>

//             <div className="mt-5 space-y-4">

//               <InfoCard
//                 label="Vehicle Type"
//                 value={captain.vehicleType}
//               />

//               <InfoCard
//                 label="Vehicle Number"
//                 value={captain.vehicleNumber}
//               />

//               <InfoCard
//                 label="Driving License"
//                 value={captain.licenseNumber}
//               />

//             </div>

//           </div>

//           {/* SERVICE ELIGIBILITY NOTE */}
//           <div className="rounded-xl border border-orange-200 bg-orange-50 p-6 lg:col-span-2">

//             <h3 className="text-sm font-bold text-orange-800">
//               Service Eligibility
//             </h3>

//             <p className="mt-2 text-xs leading-6 text-orange-700">
//               Service eligibility, vehicle eligibility,
//               verification and operational assignment must
//               ultimately be determined by the authoritative
//               backend and JuERP governance rules. This page
//               only displays the current captain information.
//             </p>

//           </div>

//         </div>
//       )}

//       {/* ACTIVITY */}
//       {activeTab === "activity" && (
//         <div className="rounded-xl bg-white p-6 shadow-sm">

//           <div className="mb-6">

//             <h2 className="text-base font-bold text-slate-900">
//               Captain Activity
//             </h2>

//             <p className="mt-1 text-xs text-slate-500">
//               Recent account, verification, service and
//               operational activity.
//             </p>

//           </div>

//           <div className="relative">

//             <div className="absolute bottom-0 left-5 top-0 w-px bg-slate-200" />

//             <div className="space-y-7">

//               {captain.activity.map(
//                 (activity) => (

//                   <div
//                     key={activity.id}
//                     className="relative flex gap-4"
//                   >

//                     <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-orange-100 text-sm">
//                       {getActivityIcon(
//                         activity.type
//                       )}
//                     </div>

//                     <div className="pt-1">

//                       <p className="text-sm font-bold text-slate-900">
//                         {activity.title}
//                       </p>

//                       <p className="mt-1 text-xs leading-5 text-slate-500">
//                         {activity.description}
//                       </p>

//                       <p className="mt-2 text-xs font-medium text-slate-400">
//                         {activity.createdAt}
//                       </p>

//                     </div>

//                   </div>

//                 )
//               )}

//             </div>

//           </div>

//         </div>
//       )}

//       {/* GOVERNANCE */}
//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Captain identity, verification, service eligibility,
//           account status, location scope and operational
//           state must be controlled by authoritative backend
//           and Firestore records. Dispatch, pricing,
//           commission, settlement and financial decisions must
//           not be calculated or independently overridden by the
//           client. The status controls on this page are
//           development UI actions until connected to an
//           authorized backend operation.
//         </p>

//       </div>

//       {/* STATUS MODAL */}
//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Change Captain Status
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {captain.name}
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
//                     updateStatus(status)
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >

//                   <span className="text-sm font-semibold text-slate-800">
//                     {status}
//                   </span>

//                   {captain.status === status && (
//                     <span className="font-bold text-orange-600">
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

//       {/* SUSPEND MODAL */}
//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <h2 className="text-lg font-bold text-slate-900">
//               Suspend Captain?
//             </h2>

//             <p className="mt-3 text-sm leading-6 text-slate-600">
//               You are about to suspend{" "}
//               <span className="font-semibold text-slate-900">
//                 {captain.name}
//               </span>
//               . In the production system this action must
//               be authorized and recorded by the trusted
//               backend.
//             </p>

//             <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowSuspendModal(false)
//                 }
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   updateStatus("SUSPENDED")
//                 }
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Confirm Suspension
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

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
//     <div>

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function InfoCard({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-sm font-bold text-slate-900">
//         {value}
//       </p>

//     </div>
//   );
// }

// function ScopeCard({
//   title,
//   value,
//   code,
// }: {
//   title: string;
//   value: string;
//   code: string;
// }) {
//   return (
//     <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

//       <p className="text-xs font-medium text-slate-500">
//         {title}
//       </p>

//       <p className="mt-1 text-sm font-bold text-slate-900">
//         {value}
//       </p>

//       <p className="mt-1 text-xs text-slate-400">
//         {code}
//       </p>

//     </div>
//   );
// }

// function StatusBox({
//   label,
//   value,
//   className,
// }: {
//   label: string;
//   value: string;
//   className: string;
// }) {
//   return (
//     <div className="rounded-lg border border-slate-200 p-4">

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <span
//         className={`mt-2 inline-block rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
//       >
//         {value}
//       </span>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const { captain, loading, error, demoMode, refresh, setCaptain } =
//     useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "kyc" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link href="/entity-management" className="text-slate-500 hover:text-orange-600">
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["kyc", "KYC & Documents"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "kyc" && (
//         <Card title="KYC & Documents">
//           {captain.kycDocuments.length === 0 ? (
//             <p className="text-sm text-slate-500">No documents on record.</p>
//           ) : (
//             <div className="space-y-4">
//               {captain.kycDocuments.map((doc) => (
//                 <div
//                   key={doc.documentId}
//                   className="flex flex-col gap-2 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                 >
//                   <div>
//                     <p className="text-sm font-bold">{doc.documentType}</p>
//                     <p className="mt-1 text-xs text-slate-500">
//                       {doc.documentId} · {doc.documentNumber}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Uploaded: {doc.uploadedAt}
//                     </p>
//                   </div>
//                   <span
//                     className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                       doc.status
//                     )}`}
//                   >
//                     {doc.status}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             <div className="space-y-3">
//               {captain.services.map((s) => (
//                 <div
//                   key={String(s)}
//                   className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                 >
//                   <span
//                     className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                   <span className="text-xs font-semibold text-green-600">
//                     Enabled
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries: {captain.completedDeliveries}
//           </p>
//           {captain.activity.length === 0 && (
//             <p className="mt-4 text-xs text-slate-500">
//               No activity feed stored on this document yet.
//             </p>
//           )}
//         </Card>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]).map(
//                 (status) => (
//                   <button
//                     key={status}
//                     type="button"
//                     onClick={() => updateStatus(status)}
//                     className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                       captain.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     {status}
//                     {captain.status === status && (
//                       <span className="text-orange-600">✓</span>
//                     )}
//                   </button>
//                 )
//               )}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only. Production suspension requires authorized backend +
//               audit.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Status / suspend actions are local UI only until wired to authorized
//           backend operations.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const { captain, loading, error, demoMode, refresh, setCaptain } =
//     useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "kyc" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["kyc", "KYC & Documents"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "kyc" && (
//         <Card title="KYC & Documents">
//           <p className="mb-4 text-xs text-slate-500">
//             Loaded from captain profile arrays and{" "}
//             <code>captain_documents</code> (matched by captainId / uid).
//           </p>
//           {captain.kycDocuments.length === 0 ? (
//             <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-500">
//               <p className="font-semibold text-slate-700">No documents found</p>
//               <p className="mt-2 text-xs leading-5">
//                 Ensure docs exist in <code>captain_documents</code> with{" "}
//                 <code>captainId</code> or <code>uid</code> equal to{" "}
//                 <code>{captain.captainId}</code> or <code>{captain.uid}</code>
//                 , or embed <code>kycDocuments</code> / <code>documents</code> on
//                 the captain doc. Include <code>fileUrl</code> (or{" "}
//                 <code>downloadUrl</code> / <code>url</code>) to open files.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {captain.kycDocuments.map((doc) => (
//                 <div
//                   key={doc.documentId}
//                   className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                 >
//                   <div>
//                     <p className="text-sm font-bold text-slate-900">
//                       {doc.documentType}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-500">
//                       {doc.documentId} · {doc.documentNumber}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Uploaded: {doc.uploadedAt}
//                     </p>
//                   </div>
//                   <div className="flex flex-wrap items-center gap-2">
//                     <span
//                       className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                         doc.status
//                       )}`}
//                     >
//                       {doc.status}
//                     </span>
//                     {doc.fileUrl ? (
//                       <a
//                         href={doc.fileUrl}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
//                       >
//                         Open / view
//                       </a>
//                     ) : (
//                       <span className="text-[10px] text-slate-400">
//                         No file URL
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Card>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             {captain.services.length === 0 ? (
//               <p className="text-sm text-slate-500">No services enabled.</p>
//             ) : (
//               <div className="space-y-3">
//                 {captain.services.map((s) => (
//                   <div
//                     key={String(s)}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >
//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         s
//                       )}`}
//                     >
//                       {s}
//                     </span>
//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries:{" "}
//             {captain.completedDeliveries}
//           </p>
//           {captain.activity.length === 0 && (
//             <p className="mt-4 text-xs text-slate-500">
//               No activity feed stored on this document yet.
//             </p>
//           )}
//         </Card>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {captain.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only. Production suspension requires authorized backend +
//               audit.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Status / suspend actions are local UI only until wired to authorized
//           backend operations.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh,
//     setCaptain,
//     setVerificationStatus,
//   } = useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [showKycModal, setShowKycModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewTitle, setPreviewTitle] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   async function handleAccept() {
//     setActionError(null);
//     try {
//       await setVerificationStatus("ACTIVE");
//       setSuccessMessage("KYC accepted — verificationStatus = ACTIVE.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Accept failed (check Firestore rules)."
//       );
//     }
//   }

//   async function handleReject() {
//     setActionError(null);
//     try {
//       await setVerificationStatus(
//         "REJECTED",
//         rejectReason.trim() || undefined
//       );
//       setSuccessMessage("KYC rejected — verificationStatus = REJECTED.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//       setRejectReason("");
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Reject failed (check Firestore rules)."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
//             <button
//               type="button"
//               onClick={() => {
//                 setActionError(null);
//                 setShowKycModal(true);
//               }}
//               className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
//             >
//               KYC / Documents
//             </button>
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Captain Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             {captain.services.length === 0 ? (
//               <p className="text-sm text-slate-500">No services enabled.</p>
//             ) : (
//               <div className="space-y-3">
//                 {captain.services.map((s) => (
//                   <div
//                     key={String(s)}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >
//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         s
//                       )}`}
//                     >
//                       {s}
//                     </span>
//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries:{" "}
//             {captain.completedDeliveries}
//           </p>
//         </Card>
//       )}

//       {/* ─── KYC POPUP ─── */}
//       {showKycModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   KYC & Documents
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {captain.name} · Verification:{" "}
//                   <span className="font-semibold">
//                     {captain.verificationStatus}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-6 py-4">
//               {captain.kycDocuments.length === 0 ? (
//                 <p className="text-sm text-slate-500">
//                   No documents on record for this captain.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {captain.kycDocuments.map((doc) => (
//                     <div
//                       key={doc.documentId}
//                       className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-900">
//                           {doc.documentType}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-500">
//                           {doc.documentId} · {doc.documentNumber}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           Uploaded: {doc.uploadedAt}
//                         </p>
//                       </div>
//                       <div className="flex flex-wrap items-center gap-2">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
//                             doc.status
//                           )}`}
//                         >
//                           {doc.status}
//                         </span>
//                         {/* {doc.fileUrl ? (
//                           <a
//                             href={doc.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700"
//                           >
//                             Open / view
//                           </a>
//                         ) : (
//                           <span className="text-[10px] text-slate-400">
//                             No file URL
//                           </span>
//                         )} */}
//                         {doc.fileUrl ? (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPreviewTitle(doc.documentType);
//                               setPreviewUrl(doc.fileUrl);
//                             }}
//                             className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
//                           >
//                             Open / view
//                           </button>
//                         ) : (
//                           <span className="text-[10px] text-slate-400">No file URL</span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Document preview — same tab popup */}
// {previewUrl && (
//   <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
//     <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//       <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//         <p className="truncate text-sm font-bold text-slate-900">
//           {previewTitle || "Document"}
//         </p>
//         <button
//           type="button"
//           onClick={() => {
//             setPreviewUrl(null);
//             setPreviewTitle("");
//           }}
//           className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//         >
//           ×
//         </button>
//       </div>

//       <div className="min-h-[320px] flex-1 bg-slate-50 p-2">
//         {/* Images */}
//         {/\.(png|jpe?g|gif|webp|bmp)(\?|$)/i.test(previewUrl) ||
//         previewUrl.includes("image") ? (
//           // eslint-disable-next-line @next/next/no-img-element
//           <img
//             src={previewUrl}
//             alt={previewTitle}
//             className="mx-auto max-h-[70vh] max-w-full object-contain"
//           />
//         ) : (
//           /* PDF / other — iframe, stays in this modal */
//           <iframe
//             src={previewUrl}
//             title={previewTitle}
//             className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
//           />
//         )}
//       </div>

//       <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
//         <button
//           type="button"
//           onClick={() => {
//             setPreviewUrl(null);
//             setPreviewTitle("");
//           }}
//           className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//               <div className="mt-6">
//                 <label className="mb-1 block text-xs font-semibold text-slate-600">
//                   Reject reason (optional)
//                 </label>
//                 <textarea
//                   value={rejectReason}
//                   onChange={(e) => setRejectReason(e.target.value)}
//                   rows={2}
//                   placeholder="Reason shown if you reject…"
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
//                 />
//               </div>

//               {actionError && (
//                 <p className="mt-3 text-sm text-red-600">{actionError}</p>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "REJECTED"}
//                 onClick={() => void handleReject()}
//                 className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Reject"}
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "ACTIVE"}
//                 onClick={() => void handleAccept()}
//                 className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {captain.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only for account status. KYC Accept/Reject writes
//               verificationStatus to Firestore.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           KYC Accept / Reject updates <code>verificationStatus</code> on the
//           captain document (client write). If it fails, allow admin update in
//           Firestore rules or move this to a Cloud Function / API route.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function formatDocType(type: string) {
//   const map: Record<string, string> = {
//     BANK_PASSBOOK: "Bank Passbook",
//     DRIVING_LICENCE: "Driving Licence",
//     DRIVING_LICENSE: "Driving Licence",
//     GOVT_ID: "Govt ID / Aadhaar",
//     PAN: "PAN",
//     RC_BOOK: "RC Book",
//     SELFIE: "Selfie",
//   };
//   const key = type.toUpperCase().replace(/\s+/g, "_");
//   if (map[key]) return map[key];
//   return type
//     .replace(/_/g, " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh,
//     setCaptain,
//     setVerificationStatus,
//   } = useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [showKycModal, setShowKycModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewTitle, setPreviewTitle] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   async function handleAccept() {
//     setActionError(null);
//     try {
//       await setVerificationStatus("ACTIVE");
//       setSuccessMessage("KYC accepted — verificationStatus = ACTIVE.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Accept failed (check Firestore rules)."
//       );
//     }
//   }

//   async function handleReject() {
//     setActionError(null);
//     try {
//       await setVerificationStatus(
//         "REJECTED",
//         rejectReason.trim() || undefined
//       );
//       setSuccessMessage("KYC rejected — verificationStatus = REJECTED.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//       setRejectReason("");
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Reject failed (check Firestore rules)."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
//             <button
//               type="button"
//               onClick={() => {
//                 setActionError(null);
//                 setShowKycModal(true);
//               }}
//               className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
//             >
//               KYC / Documents
//             </button>
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Captain Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             {captain.services.length === 0 ? (
//               <p className="text-sm text-slate-500">No services enabled.</p>
//             ) : (
//               <div className="space-y-3">
//                 {captain.services.map((s) => (
//                   <div
//                     key={String(s)}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >
//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         s
//                       )}`}
//                     >
//                       {s}
//                     </span>
//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries:{" "}
//             {captain.completedDeliveries}
//           </p>
//         </Card>
//       )}

//       {/* ─── KYC POPUP ─── */}
//       {showKycModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   KYC & Documents
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {captain.name} · Verification:{" "}
//                   <span className="font-semibold">
//                     {captain.verificationStatus}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-6 py-4">
//               {captain.kycDocuments.length === 0 ? (
//                 <p className="text-sm text-slate-500">
//                   No documents on record for this captain.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {captain.kycDocuments.map((doc) => (
//                     <div
//                       key={doc.documentId}
//                       className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
//                     >
//                       <div className="min-w-0">
//                         <p className="text-sm font-bold text-slate-900">
//                           {formatDocType(doc.documentType)}
//                         </p>
//                         <p className="mt-1 break-all text-xs text-slate-500">
//                           {doc.documentId}
//                           {doc.documentNumber && doc.documentNumber !== "—"
//                             ? ` · ${doc.documentNumber}`
//                             : ""}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           Uploaded: {doc.uploadedAt}
//                         </p>
//                       </div>

//                       <div className="flex shrink-0 items-center gap-2 sm:justify-end">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
//                             doc.status
//                           )}`}
//                         >
//                           {doc.status}
//                         </span>
//                         {doc.fileUrl ? (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPreviewTitle(formatDocType(doc.documentType));
//                               setPreviewUrl(doc.fileUrl);
//                             }}
//                             className="whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
//                           >
//                             Open / view
//                           </button>
//                         ) : (
//                           <span className="text-[10px] text-slate-400">
//                             No file URL
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Document preview — same tab popup */}
//               {previewUrl && (
//                 <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
//                   <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//                     <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//                       <p className="truncate text-sm font-bold text-slate-900">
//                         {previewTitle || "Document"}
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//                       >
//                         ×
//                       </button>
//                     </div>

//                     <div className="min-h-[320px] flex-1 bg-slate-50 p-2">
//                       {/* Images */}
//                       {/\.(png|jpe?g|gif|webp|bmp)(\?|$)/i.test(previewUrl) ||
//                       previewUrl.includes("image") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={previewUrl}
//                           alt={previewTitle}
//                           className="mx-auto max-h-[70vh] max-w-full object-contain"
//                         />
//                       ) : (
//                         /* PDF / other — iframe, stays in this modal */
//                         <iframe
//                           src={previewUrl}
//                           title={previewTitle}
//                           className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
//                         />
//                       )}
//                     </div>

//                     <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-6">
//                 <label className="mb-1 block text-xs font-semibold text-slate-600">
//                   Reject reason (optional)
//                 </label>
//                 <textarea
//                   value={rejectReason}
//                   onChange={(e) => setRejectReason(e.target.value)}
//                   rows={2}
//                   placeholder="Reason shown if you reject…"
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
//                 />
//               </div>

//               {actionError && (
//                 <p className="mt-3 text-sm text-red-600">{actionError}</p>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "REJECTED"}
//                 onClick={() => void handleReject()}
//                 className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Reject"}
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "ACTIVE"}
//                 onClick={() => void handleAccept()}
//                 className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {captain.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only for account status. KYC Accept/Reject writes
//               verificationStatus to Firestore.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           KYC Accept / Reject updates <code>verificationStatus</code> on the
//           captain document (client write). If it fails, allow admin update in
//           Firestore rules or move this to a Cloud Function / API route.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function formatDocType(type: string) {
//   const map: Record<string, string> = {
//     BANK_PASSBOOK: "Bank Passbook",
//     DRIVING_LICENCE: "Driving Licence",
//     DRIVING_LICENSE: "Driving Licence",
//     GOVT_ID: "Govt ID / Aadhaar",
//     PAN: "PAN",
//     RC_BOOK: "RC Book",
//     SELFIE: "Selfie",
//   };
//   const key = type.toUpperCase().replace(/\s+/g, "_");
//   if (map[key]) return map[key];
//   return type
//     .replace(/_/g, " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh,
//     setCaptain,
//     setVerificationStatus,
//   } = useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [showKycModal, setShowKycModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewTitle, setPreviewTitle] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   async function handleAccept() {
//     setActionError(null);
//     try {
//       await setVerificationStatus("ACTIVE");
//       setSuccessMessage("KYC accepted — verificationStatus = ACTIVE.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Accept failed (check Firestore rules)."
//       );
//     }
//   }

//   async function handleReject() {
//     setActionError(null);
//     try {
//       await setVerificationStatus(
//         "REJECTED",
//         rejectReason.trim() || undefined
//       );
//       setSuccessMessage("KYC rejected — verificationStatus = REJECTED.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//       setRejectReason("");
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Reject failed (check Firestore rules)."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
//             <button
//               type="button"
//               onClick={() => {
//                 setActionError(null);
//                 setShowKycModal(true);
//               }}
//               className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
//             >
//               KYC / Documents
//             </button>
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Captain Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             {captain.services.length === 0 ? (
//               <p className="text-sm text-slate-500">No services enabled.</p>
//             ) : (
//               <div className="space-y-3">
//                 {captain.services.map((s) => (
//                   <div
//                     key={String(s)}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >
//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         s
//                       )}`}
//                     >
//                       {s}
//                     </span>
//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries:{" "}
//             {captain.completedDeliveries}
//           </p>
//         </Card>
//       )}

//       {/* ─── KYC POPUP ─── */}
//       {showKycModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   KYC & Documents
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {captain.name} · Verification:{" "}
//                   <span className="font-semibold">
//                     {captain.verificationStatus}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-6 py-4">
//               {captain.kycDocuments.length === 0 ? (
//                 <p className="text-sm text-slate-500">
//                   No documents on record for this captain.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {captain.kycDocuments.map((doc) => (
//                     <div
//                       key={doc.documentId}
//                       className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
//                     >
//                       <div className="min-w-0">
//                         <p className="text-sm font-bold text-slate-900">
//                           {formatDocType(doc.documentType)}
//                         </p>
//                         <p className="mt-1 break-all text-xs text-slate-500">
//                           {doc.documentId}
//                           {doc.documentNumber ? ` · ${doc.documentNumber}` : " · —"}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           Uploaded: {doc.uploadedAt}
//                         </p>
//                       </div>

//                       <div className="flex shrink-0 items-center gap-2 sm:justify-end">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
//                             doc.status
//                           )}`}
//                         >
//                           {doc.status}
//                         </span>
//                         {doc.fileUrl ? (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPreviewTitle(formatDocType(doc.documentType));
//                               setPreviewUrl(doc.fileUrl);
//                             }}
//                             className="whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
//                           >
//                             Open / view
//                           </button>
//                         ) : (
//                           <span className="text-[10px] text-slate-400">
//                             No file URL
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Document preview — same tab popup */}
//               {previewUrl && (
//                 <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
//                   <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//                     <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//                       <p className="truncate text-sm font-bold text-slate-900">
//                         {previewTitle || "Document"}
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//                       >
//                         ×
//                       </button>
//                     </div>

//                     <div className="min-h-[320px] flex-1 bg-slate-50 p-2">
//                       {/\.(png|jpe?g|gif|webp|bmp)(\?|$)/i.test(previewUrl) ||
//                       previewUrl.includes("image") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={previewUrl}
//                           alt={previewTitle}
//                           className="mx-auto max-h-[70vh] max-w-full object-contain"
//                         />
//                       ) : (
//                         <iframe
//                           src={previewUrl}
//                           title={previewTitle}
//                           className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
//                         />
//                       )}
//                     </div>

//                     <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-6">
//                 <label className="mb-1 block text-xs font-semibold text-slate-600">
//                   Reject reason (optional)
//                 </label>
//                 <textarea
//                   value={rejectReason}
//                   onChange={(e) => setRejectReason(e.target.value)}
//                   rows={2}
//                   placeholder="Reason shown if you reject…"
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
//                 />
//               </div>

//               {actionError && (
//                 <p className="mt-3 text-sm text-red-600">{actionError}</p>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "REJECTED"}
//                 onClick={() => void handleReject()}
//                 className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Reject"}
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "ACTIVE"}
//                 onClick={() => void handleAccept()}
//                 className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {captain.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only for account status. KYC Accept/Reject writes
//               verificationStatus to Firestore.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           KYC Accept / Reject updates <code>verificationStatus</code> on the
//           captain document (client write). If it fails, allow admin update in
//           Firestore rules or move this to a Cloud Function / API route.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useCaptain,
//   type CaptainStatus,
//   type VerificationStatus,
//   type OnlineStatus,
//   type AvailabilityStatus,
//   type ServiceId,
// } from "@/hooks/useCaptains";

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function formatDocType(type: string) {
//   const map: Record<string, string> = {
//     BANK_PASSBOOK: "Bank Passbook",
//     DRIVING_LICENCE: "Driving Licence",
//     DRIVING_LICENSE: "Driving Licence",
//     GOVT_ID: "Govt ID / Aadhaar",
//     PAN: "PAN",
//     RC_BOOK: "RC Book",
//     SELFIE: "Selfie",
//   };
//   const key = type.toUpperCase().replace(/\s+/g, "_");
//   if (map[key]) return map[key];
//   return type
//     .replace(/_/g, " ")
//     .toLowerCase()
//     .replace(/\b\w/g, (c) => c.toUpperCase());
// }

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

// function getVerificationClasses(status: VerificationStatus | string) {
//   switch (String(status).toUpperCase()) {
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

// function getAvailabilityClasses(status: AvailabilityStatus) {
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
//   switch (String(service).toUpperCase()) {
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

// export default function CaptainDetailsPage() {
//   const params = useParams();
//   const captainId = String(params?.captainId || "");

//   const {
//     captain,
//     loading,
//     error,
//     demoMode,
//     saving,
//     refresh,
//     setCaptain,
//     setVerificationStatus,
//   } = useCaptain(captainId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "services" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showSuspendModal, setShowSuspendModal] = useState(false);
//   const [showKycModal, setShowKycModal] = useState(false);
//   const [rejectReason, setRejectReason] = useState("");
//   const [actionError, setActionError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewTitle, setPreviewTitle] = useState("");

//   const initials = useMemo(() => {
//     if (!captain) return "—";
//     return captain.name
//       .split(" ")
//       .map((p) => p.charAt(0))
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();
//   }, [captain]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading captain…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   if (!captain) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Captain not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>captains</code> for <code>{captainId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/captains"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: CaptainStatus) {
//     setCaptain({
//       ...captain!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//       onlineStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "OFFLINE"
//           : captain!.onlineStatus,
//       availabilityStatus:
//         newStatus === "BLOCKED" || newStatus === "SUSPENDED"
//           ? "BLOCKED"
//           : captain!.availabilityStatus,
//     });
//     setShowStatusModal(false);
//     setShowSuspendModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   async function handleAccept() {
//     setActionError(null);
//     try {
//       await setVerificationStatus("ACTIVE");
//       setSuccessMessage("KYC accepted — verificationStatus = ACTIVE.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Accept failed (check Firestore rules)."
//       );
//     }
//   }

//   async function handleReject() {
//     setActionError(null);
//     try {
//       await setVerificationStatus(
//         "REJECTED",
//         rejectReason.trim() || undefined
//       );
//       setSuccessMessage("KYC rejected — verificationStatus = REJECTED.");
//       setTimeout(() => setSuccessMessage(""), 4000);
//       setShowKycModal(false);
//       setRejectReason("");
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Reject failed (check Firestore rules)."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
//         <Link
//           href="/entity-management"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/captains"
//           className="text-slate-500 hover:text-orange-600"
//         >
//           Captains
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="font-medium text-slate-700">{captain.captainId}</span>
//       </div>

//       {successMessage && (
//         <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
//               {initials}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {captain.name}
//                 </h1>
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
//                     captain.status
//                   )}`}
//                 >
//                   {captain.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Captain ID:{" "}
//                 <span className="font-semibold text-slate-700">
//                   {captain.captainId}
//                 </span>
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
//                     captain.verificationStatus
//                   )}`}
//                 >
//                   Verification: {captain.verificationStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
//                     captain.onlineStatus
//                   )}`}
//                 >
//                   {captain.onlineStatus}
//                 </span>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
//                     captain.availabilityStatus
//                   )}`}
//                 >
//                   {captain.availabilityStatus}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
//             <button
//               type="button"
//               onClick={() => {
//                 setActionError(null);
//                 setShowKycModal(true);
//               }}
//               className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
//             >
//               KYC / Documents
//             </button>
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Change Captain Status
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowSuspendModal(true)}
//               disabled={captain.status === "SUSPENDED"}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
//             >
//               Suspend Captain
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Stat label="Rating" value={`★ ${captain.rating}`} />
//         <Stat label="Completed Trips" value={String(captain.completedTrips)} />
//         <Stat
//           label="Completed Deliveries"
//           value={String(captain.completedDeliveries)}
//         />
//         <Stat
//           label="Cancelled Trips"
//           value={String(captain.cancelledTrips)}
//           className="text-red-600"
//         />
//         <Stat
//           label="Recorded Earnings"
//           value={formatCurrency(captain.totalEarningsPaise)}
//         />
//       </div>

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["services", "Services & Vehicle"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setActiveTab(id)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === id
//                   ? "border-orange-500 text-orange-600"
//                   : "border-transparent text-slate-500"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Personal Information">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//               <Field label="Full Name" value={captain.name} />
//               <Field label="Captain ID" value={captain.captainId} />
//               <Field label="Phone" value={captain.phone} />
//               <Field label="Email" value={captain.email} />
//               <Field label="Firebase UID" value={captain.uid} />
//               <Field label="Joined At" value={captain.joinedAt} />
//             </div>
//           </Card>
//           <Card title="Location Scope">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <Field label="State" value={captain.stateName} />
//               <Field label="District" value={captain.districtName} />
//               <Field label="Pincode" value={captain.pincode} />
//             </div>
//             <div className="mt-4">
//               <Field label="Address" value={captain.address} />
//             </div>
//           </Card>
//           <Card title="Operational Status">
//             <div className="flex flex-wrap gap-2">
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
//                   captain.status
//                 )}`}
//               >
//                 {captain.status}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
//                   captain.onlineStatus
//                 )}`}
//               >
//                 {captain.onlineStatus}
//               </span>
//               <span
//                 className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
//                   captain.availabilityStatus
//                 )}`}
//               >
//                 {captain.availabilityStatus}
//               </span>
//             </div>
//             <div className="mt-4">
//               <Field label="Last Active" value={captain.lastActiveAt} />
//             </div>
//           </Card>
//           <Card title="Enabled Services">
//             <div className="flex flex-wrap gap-2">
//               {captain.services.length === 0 ? (
//                 <span className="text-sm text-slate-500">No services</span>
//               ) : (
//                 captain.services.map((s) => (
//                   <span
//                     key={String(s)}
//                     className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
//                       s
//                     )}`}
//                   >
//                     {s}
//                   </span>
//                 ))
//               )}
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "services" && (
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//           <Card title="Captain Services">
//             {captain.services.length === 0 ? (
//               <p className="text-sm text-slate-500">No services enabled.</p>
//             ) : (
//               <div className="space-y-3">
//                 {captain.services.map((s) => (
//                   <div
//                     key={String(s)}
//                     className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
//                   >
//                     <span
//                       className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
//                         s
//                       )}`}
//                     >
//                       {s}
//                     </span>
//                     <span className="text-xs font-semibold text-green-600">
//                       Enabled
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </Card>
//           <Card title="Vehicle Information">
//             <div className="space-y-3">
//               <Field label="Vehicle Type" value={captain.vehicleType} />
//               <Field label="Vehicle Number" value={captain.vehicleNumber} />
//               <Field label="Driving License" value={captain.licenseNumber} />
//             </div>
//           </Card>
//         </div>
//       )}

//       {activeTab === "activity" && (
//         <Card title="Captain Activity">
//           <p className="text-sm text-slate-600">
//             Joined: {captain.joinedAt} · Updated: {captain.updatedAt} · Last
//             active: {captain.lastActiveAt}
//           </p>
//           <p className="mt-3 text-sm text-slate-600">
//             Trips completed: {captain.completedTrips} · Cancelled:{" "}
//             {captain.cancelledTrips} · Deliveries:{" "}
//             {captain.completedDeliveries}
//           </p>
//         </Card>
//       )}

//       {/* ─── KYC POPUP ─── */}
//       {showKycModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   KYC & Documents
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {captain.name} · Verification:{" "}
//                   <span className="font-semibold">
//                     {captain.verificationStatus}
//                   </span>
//                 </p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto px-6 py-4">
//               {captain.kycDocuments.length === 0 ? (
//                 <p className="text-sm text-slate-500">
//                   No documents on record for this captain.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {captain.kycDocuments.map((doc) => (
//                     <div
//                       key={doc.documentId}
//                       className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
//                     >
//                       <div className="min-w-0">
//                         <p className="text-sm font-bold text-slate-900">
//                           {formatDocType(doc.documentType)}
//                         </p>
//                         <p className="mt-1 break-all text-xs text-slate-500">
//                           {doc.documentId}
//                           {doc.documentNumber && doc.documentNumber !== "—"
//                             ? ` · ${doc.documentNumber}`
//                             : ""}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           Uploaded: {doc.uploadedAt}
//                         </p>
//                       </div>

//                       <div className="flex shrink-0 items-center gap-2 sm:justify-end">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
//                             doc.status
//                           )}`}
//                         >
//                           {doc.status}
//                         </span>
//                         {doc.fileUrl ? (
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPreviewTitle(formatDocType(doc.documentType));
//                               setPreviewUrl(doc.fileUrl);
//                             }}
//                             className="whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
//                           >
//                             Open / view
//                           </button>
//                         ) : (
//                           <span className="text-[10px] text-slate-400">
//                             No file URL
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Document preview — same tab popup */}
//               {previewUrl && (
//                 <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
//                   <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
//                     <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
//                       <p className="truncate text-sm font-bold text-slate-900">
//                         {previewTitle || "Document"}
//                       </p>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//                       >
//                         ×
//                       </button>
//                     </div>

//                     <div className="min-h-[320px] flex-1 bg-slate-50 p-2">
//                       {/* Images */}
//                       {/\.(png|jpe?g|gif|webp|bmp)(\?|$)/i.test(previewUrl) ||
//                       previewUrl.includes("image") ? (
//                         // eslint-disable-next-line @next/next/no-img-element
//                         <img
//                           src={previewUrl}
//                           alt={previewTitle}
//                           className="mx-auto max-h-[70vh] max-w-full object-contain"
//                         />
//                       ) : (
//                         /* PDF / other — iframe, stays in this modal */
//                         <iframe
//                           src={previewUrl}
//                           title={previewTitle}
//                           className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
//                         />
//                       )}
//                     </div>

//                     <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setPreviewUrl(null);
//                           setPreviewTitle("");
//                         }}
//                         className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="mt-6">
//                 <label className="mb-1 block text-xs font-semibold text-slate-600">
//                   Reject reason (optional)
//                 </label>
//                 <textarea
//                   value={rejectReason}
//                   onChange={(e) => setRejectReason(e.target.value)}
//                   rows={2}
//                   placeholder="Reason shown if you reject…"
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
//                 />
//               </div>

//               {actionError && (
//                 <p className="mt-3 text-sm text-red-600">{actionError}</p>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
//               <button
//                 type="button"
//                 onClick={() => setShowKycModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "REJECTED"}
//                 onClick={() => void handleReject()}
//                 className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Reject"}
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || captain.verificationStatus === "ACTIVE"}
//                 onClick={() => void handleAccept()}
//                 className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Captain Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CaptainStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     captain.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {captain.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showSuspendModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Suspend Captain?</h2>
//             <p className="mt-3 text-sm text-slate-600">
//               Local UI only for account status. KYC Accept/Reject writes
//               verificationStatus to Firestore.
//             </p>
//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowSuspendModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={() => updateStatus("SUSPENDED")}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Confirm Suspension
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           KYC Accept / Reject updates <code>verificationStatus</code> on the
//           captain document (client write). If it fails, allow admin update in
//           Firestore rules or move this to a Cloud Function / API route.
//         </p>
//       </div>
//     </div>
//   );
// }

// function Stat({
//   label,
//   value,
//   className = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   className?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className={`mt-2 text-2xl font-bold ${className}`}>{value}</p>
//     </div>
//   );
// }

// function Card({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </div>
//   );
// }

// function Field({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  useCaptain,
  type CaptainStatus,
  type VerificationStatus,
  type OnlineStatus,
  type AvailabilityStatus,
  type ServiceId,
} from "@/hooks/useCaptains";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function formatDocType(type: string) {
  const map: Record<string, string> = {
    BANK_PASSBOOK: "Bank Passbook",
    DRIVING_LICENCE: "Driving Licence",
    DRIVING_LICENSE: "Driving Licence",
    GOVT_ID: "Govt ID / Aadhaar",
    PAN: "PAN",
    RC_BOOK: "RC Book",
    SELFIE: "Selfie",
  };
  const key = type.toUpperCase().replace(/\s+/g, "_");
  if (map[key]) return map[key];
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

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

function getVerificationClasses(status: VerificationStatus | string) {
  switch (String(status).toUpperCase()) {
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

export default function CaptainDetailsPage() {
  const params = useParams();
  const captainId = String(params?.captainId || "");

  const {
    captain,
    loading,
    error,
    demoMode,
    saving,
    refresh,
    setCaptain,
    setVerificationStatus,
  } = useCaptain(captainId);

  const [activeTab, setActiveTab] = useState<
    "overview" | "services" | "activity"
  >("overview");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");

  const initials = useMemo(() => {
    if (!captain) return "—";
    return captain.name
      .split(" ")
      .map((p) => p.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [captain]);

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading captain…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-600">{error}</p>
        <Link
          href="/entity-management/captains"
          className="mt-4 inline-block text-sm text-orange-600"
        >
          ← Back
        </Link>
      </div>
    );
  }

  if (!captain) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">Captain not found</p>
        <p className="mt-1 text-xs text-slate-500">
          No document in <code>captains</code> for <code>{captainId}</code>
          {demoMode ? " (demo mode)" : ""}.
        </p>
        <Link
          href="/entity-management/captains"
          className="mt-4 inline-block text-sm font-semibold text-orange-600"
        >
          ← Back
        </Link>
      </div>
    );
  }

  function updateStatus(newStatus: CaptainStatus) {
    setCaptain({
      ...captain!,
      status: newStatus,
      updatedAt: "Just now (local UI)",
      onlineStatus:
        newStatus === "BLOCKED" || newStatus === "SUSPENDED"
          ? "OFFLINE"
          : captain!.onlineStatus,
      availabilityStatus:
        newStatus === "BLOCKED" || newStatus === "SUSPENDED"
          ? "BLOCKED"
          : captain!.availabilityStatus,
    });
    setShowStatusModal(false);
    setShowSuspendModal(false);
    setSuccessMessage(
      `Local UI status → ${newStatus}. Persist via authorized backend.`
    );
    setTimeout(() => setSuccessMessage(""), 4000);
  }

  // async function handleAccept() {
  //   setActionError(null);
  //   try {
  //     await setVerificationStatus("ACTIVE");
  //     setSuccessMessage("KYC accepted — verificationStatus = ACTIVE.");
  //     setTimeout(() => setSuccessMessage(""), 4000);
  //     setShowKycModal(false);
  //   } catch (err) {
  //     setActionError(
  //       err instanceof Error
  //         ? err.message
  //         : "Accept failed (check Firestore rules)."
  //     );
  //   }
  // }

  // async function handleReject() {
  //   setActionError(null);
  //   try {
  //     await setVerificationStatus(
  //       "REJECTED",
  //       rejectReason.trim() || undefined
  //     );
  //     setSuccessMessage("KYC rejected — verificationStatus = REJECTED.");
  //     setTimeout(() => setSuccessMessage(""), 4000);
  //     setShowKycModal(false);
  //     setRejectReason("");
  //   } catch (err) {
  //     setActionError(
  //       err instanceof Error
  //         ? err.message
  //         : "Reject failed (check Firestore rules)."
  //     );
  //   }
  // }

    async function handleAccept() {
    setActionError(null);
    try {
      await setVerificationStatus("ACTIVE");
      setSuccessMessage(
        "KYC accepted — verificationStatus=ACTIVE, accountBlockStatus=NONE, availabilityStatus=AVAILABLE."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      setShowKycModal(false);
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Accept failed (check Firestore rules)."
      );
    }
  }

  async function handleReject() {
    setActionError(null);
    try {
      await setVerificationStatus(
        "REJECTED",
        rejectReason.trim() || undefined
      );
      setSuccessMessage(
        "KYC rejected — verificationStatus=REJECTED, availabilityStatus=BLOCKED."
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      setShowKycModal(false);
      setRejectReason("");
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Reject failed (check Firestore rules)."
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
        <Link
          href="/entity-management"
          className="text-slate-500 hover:text-orange-600"
        >
          Entity Management
        </Link>
        <span className="text-slate-400">/</span>
        <Link
          href="/entity-management/captains"
          className="text-slate-500 hover:text-orange-600"
        >
          Captains
        </Link>
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-700">{captain.captainId}</span>
      </div>

      {successMessage && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xl font-bold text-orange-600">
              {initials}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  {captain.name}
                </h1>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    captain.status
                  )}`}
                >
                  {captain.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Captain ID:{" "}
                <span className="font-semibold text-slate-700">
                  {captain.captainId}
                </span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getVerificationClasses(
                    captain.verificationStatus
                  )}`}
                >
                  Verification: {captain.verificationStatus}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getOnlineClasses(
                    captain.onlineStatus
                  )}`}
                >
                  {captain.onlineStatus}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getAvailabilityClasses(
                    captain.availabilityStatus
                  )}`}
                >
                  {captain.availabilityStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={() => {
                setActionError(null);
                setShowKycModal(true);
              }}
              className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 hover:bg-orange-100"
            >
              KYC / Documents
            </button>
            {/* <button
              type="button"
              onClick={() => void refresh()}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Refresh
            </button> */}

            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>

            <button
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Change Captain Status
            </button>
            <button
              type="button"
              onClick={() => setShowSuspendModal(true)}
              disabled={captain.status === "SUSPENDED"}
              className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Suspend Captain
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Rating" value={`★ ${captain.rating}`} />
        <Stat label="Completed Trips" value={String(captain.completedTrips)} />
        <Stat
          label="Completed Deliveries"
          value={String(captain.completedDeliveries)}
        />
        <Stat
          label="Cancelled Trips"
          value={String(captain.cancelledTrips)}
          className="text-red-600"
        />
        <Stat
          label="Recorded Earnings"
          value={formatCurrency(captain.totalEarningsPaise)}
        />
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="flex min-w-max border-b border-slate-200">
          {(
            [
              ["overview", "Overview"],
              ["services", "Services & Vehicle"],
              // ["activity", "Activity"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`border-b-2 px-5 py-4 text-sm font-semibold ${
                activeTab === id
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-slate-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Personal Information">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" value={captain.name} />
              <Field label="Captain ID" value={captain.captainId} />
              <Field label="Phone" value={captain.phone} />
              <Field label="Email" value={captain.email} />
              <Field label="Firebase UID" value={captain.uid} />
              <Field label="Joined At" value={captain.joinedAt} />
            </div>
          </Card>

          {/* <Card title="Location Scope">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="State" value={captain.stateName} />
              <Field label="District" value={captain.districtName} />
              <Field label="Pincode" value={captain.pincode} />
            </div>
            <div className="mt-4">
              <Field label="Address" value={captain.address} />
            </div>
          </Card> */}

          <Card title="Location Scope">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field
                label="State"
                value={
                  captain.stateName !== "—"
                    ? captain.stateName
                    : captain.stateId
                }
              />
              <Field
                label="District"
                value={
                  captain.districtName !== "—"
                    ? captain.districtName
                    : captain.districtId !== "—"
                      ? captain.districtId
                      : "—"
                }
              />
              <Field label="Pincode" value={captain.pincode} />
            </div>
            <div className="mt-4">
              <Field label="Address" value={captain.address} />
            </div>
          </Card>

          <Card title="Operational Status">
            <div className="flex flex-wrap gap-2">
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${getStatusClasses(
                  captain.status
                )}`}
              >
                {captain.status}
              </span>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${getOnlineClasses(
                  captain.onlineStatus
                )}`}
              >
                {captain.onlineStatus}
              </span>
              <span
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${getAvailabilityClasses(
                  captain.availabilityStatus
                )}`}
              >
                {captain.availabilityStatus}
              </span>
            </div>
            <div className="mt-4">
              <Field label="Last Active" value={captain.lastActiveAt} />
            </div>
          </Card>

          <Card title="Enabled Services">
            <div className="flex flex-wrap gap-2">
              {captain.services.length === 0 ? (
                <span className="text-sm text-slate-500">No services</span>
              ) : (
                captain.services.map((s) => (
                  <span
                    key={String(s)}
                    className={`rounded-lg px-3 py-2 text-xs font-bold ${getServiceClasses(
                      s
                    )}`}
                  >
                    {s}
                  </span>
                ))
              )}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "services" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card title="Captain Services">
            {captain.services.length === 0 ? (
              <p className="text-sm text-slate-500">No services enabled.</p>
            ) : (
              <div className="space-y-3">
                {captain.services.map((s) => (
                  <div
                    key={String(s)}
                    className="flex items-center justify-between rounded-lg border border-slate-200 p-4"
                  >
                    <span
                      className={`rounded-md px-3 py-1.5 text-xs font-bold ${getServiceClasses(
                        s
                      )}`}
                    >
                      {s}
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      Enabled
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card title="Vehicle Information">
            <div className="space-y-3">
              <Field label="Vehicle Type" value={captain.vehicleType} />
              <Field label="Vehicle Number" value={captain.vehicleNumber} />
              <Field label="Driving License" value={captain.licenseNumber} />
            </div>
          </Card>
        </div>
      )}

      {/* ─── ACTIVITY TAB (highlighted metrics) ─── */}
      
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  KYC & Documents
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {captain.name} · Verification:{" "}
                  <span className="font-semibold">
                    {captain.verificationStatus}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowKycModal(false)}
                className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {captain.kycDocuments.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No documents on record for this captain.
                </p>
              ) : (
                <div className="space-y-3">
                  {captain.kycDocuments.map((doc) => (
                    <div
                      key={doc.documentId}
                      className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900">
                          {formatDocType(doc.documentType)}
                        </p>
                        <p className="mt-1 break-all text-xs text-slate-500">
                          {doc.documentId}
                          {doc.documentNumber && doc.documentNumber !== "—"
                            ? ` · ${doc.documentNumber}`
                            : ""}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Uploaded: {doc.uploadedAt}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getVerificationClasses(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>
                        {doc.fileUrl ? (
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewTitle(formatDocType(doc.documentType));
                              setPreviewUrl(doc.fileUrl);
                            }}
                            className="whitespace-nowrap rounded-lg border border-orange-200 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700 hover:bg-orange-100"
                          >
                            Open / view
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400">
                            No file URL
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {previewUrl && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4">
                  <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                      <p className="truncate text-sm font-bold text-slate-900">
                        {previewTitle || "Document"}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setPreviewTitle("");
                        }}
                        className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
                      >
                        ×
                      </button>
                    </div>
                    <div className="min-h-[320px] flex-1 bg-slate-50 p-2">
                      {/\.(png|jpe?g|gif|webp|bmp)(\?|$)/i.test(previewUrl) ||
                      previewUrl.includes("image") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={previewUrl}
                          alt={previewTitle}
                          className="mx-auto max-h-[70vh] max-w-full object-contain"
                        />
                      ) : (
                        <iframe
                          src={previewUrl}
                          title={previewTitle}
                          className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
                        />
                      )}
                    </div>
                    <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null);
                          setPreviewTitle("");
                        }}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <label className="mb-1 block text-xs font-semibold text-slate-600">
                  Reject reason (optional)
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={2}
                  placeholder="Reason shown if you reject…"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-orange-400"
                />
              </div>

              {actionError && (
                <p className="mt-3 text-sm text-red-600">{actionError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowKycModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                type="button"
                disabled={saving || captain.verificationStatus === "REJECTED"}
                onClick={() => void handleReject()}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Reject"}
              </button>
              <button
                type="button"
                disabled={saving || captain.verificationStatus === "ACTIVE"}
                onClick={() => void handleAccept()}
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? "Saving…" : "Accept"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Change Captain Status</h2>
            <div className="mt-6 space-y-2">
              {(
                [
                  "ACTIVE",
                  "INACTIVE",
                  "SUSPENDED",
                  "BLOCKED",
                ] as CaptainStatus[]
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateStatus(status)}
                  className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
                    captain.status === status
                      ? "border-orange-300 bg-orange-50"
                      : "border-slate-200"
                  }`}
                >
                  {status}
                  {captain.status === status && (
                    <span className="text-orange-600">✓</span>
                  )}
                </button>
              ))}
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

      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Suspend Captain?</h2>
            <p className="mt-3 text-sm text-slate-600">
              Local UI only for account status. KYC Accept/Reject writes
              verificationStatus to Firestore.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSuspendModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => updateStatus("SUSPENDED")}
                className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Confirm Suspension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          KYC Accept / Reject updates <code>verificationStatus</code> on the
          captain document (client write). If it fails, allow admin update in
          Firestore rules or move this to a Cloud Function / API route.
        </p>
      </div> */}
    </div>
  );
}

function Stat({
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

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/** Large colored metric card for Activity tab */
function ActivityMetric({
  label,
  value,
  accent,
  hint,
}: {
  label: string;
  value: number;
  accent: "green" | "red" | "orange";
  hint: string;
}) {
  const styles = {
    green: {
      wrap: "border-green-200 bg-green-50 ring-green-100",
      value: "text-green-700",
      bar: "bg-green-500",
      badge: "bg-green-100 text-green-700",
    },
    red: {
      wrap: "border-red-200 bg-red-50 ring-red-100",
      value: "text-red-600",
      bar: "bg-red-500",
      badge: "bg-red-100 text-red-700",
    },
    orange: {
      wrap: "border-orange-200 bg-orange-50 ring-orange-100",
      value: "text-orange-700",
      bar: "bg-orange-500",
      badge: "bg-orange-100 text-orange-700",
    },
  }[accent];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm ring-1 ${styles.wrap}`}
    >
      <div className={`absolute left-0 top-0 h-1 w-full ${styles.bar}`} />
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-2 text-4xl font-black tabular-nums ${styles.value}`}>
        {value}
      </p>
      <p className="mt-2 text-[11px] leading-4 text-slate-500">{hint}</p>
      <span
        className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${styles.badge}`}
      >
        Live count
      </span>
    </div>
  );
}

function TimelineChip({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "blue" | "slate" | "green";
}) {
  const styles = {
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    slate: "border-slate-200 bg-slate-50 text-slate-800",
    green: "border-green-200 bg-green-50 text-green-800",
  }[color];

  return (
    <div className={`rounded-xl border px-4 py-3 ${styles}`}>
      <p className="text-[10px] font-bold uppercase tracking-wide opacity-70">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}