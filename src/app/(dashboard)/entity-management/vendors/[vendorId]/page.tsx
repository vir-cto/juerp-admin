// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
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

// type DocumentStatus =
//   | "PENDING"
//   | "VERIFIED"
//   | "REJECTED";

// type VendorDocument = {
//   documentId: string;
//   documentType: string;
//   documentNumber: string;
//   status: DocumentStatus;
//   uploadedAt: string;
// };

// type VendorModuleInfo = {
//   moduleId: VendorModule;
//   status: "ACTIVE" | "INACTIVE" | "PENDING";
//   joinedAt: string;
// };

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
//   updatedAt: string;
//   lastActiveAt: string;

//   rating: number;
//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;

//   modules: VendorModuleInfo[];

//   documents: VendorDocument[];

//   gstNumber: string;
//   panNumber: string;
//   businessType: string;

//   bankAccountLast4: string;
//   ifscCode: string;
// };

// const INITIAL_VENDOR: Vendor = {
//   vendorId: "VEN-10001",
//   userId: "USR-VEN-10001",

//   businessName: "Fresh Food Restaurant",
//   ownerName: "Ravi Kumar",
//   phone: "+91 98765 30001",
//   email: "freshfood@example.com",

//   status: "ACTIVE",
//   verificationStatus: "ACTIVE",

//   stateId: "AP",
//   stateName: "Andhra Pradesh",

//   districtId: "GNT",
//   districtName: "Guntur",

//   pincode: "522001",
//   address:
//     "Lakshmipuram Main Road, Guntur, Andhra Pradesh",

//   joinedAt: "12 Aug 2026",
//   updatedAt: "05 Oct 2026",
//   lastActiveAt: "Today, 8:35 PM",

//   rating: 4.6,
//   totalOrders: 1250,
//   completedOrders: 1185,
//   cancelledOrders: 28,

//   modules: [
//     {
//       moduleId: "FOOD",
//       status: "ACTIVE",
//       joinedAt: "12 Aug 2026",
//     },
//     {
//       moduleId: "MART",
//       status: "ACTIVE",
//       joinedAt: "20 Aug 2026",
//     },
//     {
//       moduleId: "PHARMACY",
//       status: "INACTIVE",
//       joinedAt: "25 Aug 2026",
//     },
//   ],

//   documents: [
//     {
//       documentId: "DOC-10001",
//       documentType: "GST Certificate",
//       documentNumber: "37ABCDE1234F1Z5",
//       status: "VERIFIED",
//       uploadedAt: "12 Aug 2026",
//     },
//     {
//       documentId: "DOC-10002",
//       documentType: "PAN Card",
//       documentNumber: "ABCDE1234F",
//       status: "VERIFIED",
//       uploadedAt: "12 Aug 2026",
//     },
//     {
//       documentId: "DOC-10003",
//       documentType: "Business Registration",
//       documentNumber: "BR-AP-2026-10001",
//       status: "VERIFIED",
//       uploadedAt: "13 Aug 2026",
//     },
//     {
//       documentId: "DOC-10004",
//       documentType: "Bank Proof",
//       documentNumber: "BANK-10001",
//       status: "VERIFIED",
//       uploadedAt: "13 Aug 2026",
//     },
//   ],

//   gstNumber: "37ABCDE1234F1Z5",
//   panNumber: "ABCDE1234F",
//   businessType: "Restaurant",

//   bankAccountLast4: "4821",
//   ifscCode: "SBIN0001234",
// };

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

//     case "PENDING":
//     case "SUBMITTED":
//       return "bg-yellow-100 text-yellow-700";

//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getDocumentClasses(status: DocumentStatus) {
//   switch (status) {
//     case "VERIFIED":
//       return "bg-green-100 text-green-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(moduleId: VendorModule) {
//   switch (moduleId) {
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

// export default function VendorDetailsPage() {
//   const params = useParams();

//   const vendorId = useMemo(() => {
//     const value = params?.vendorId;

//     if (Array.isArray(value)) {
//       return value[0] ?? "";
//     }

//     return value ?? "";
//   }, [params]);

//   const [vendor, setVendor] =
//     useState<Vendor>(INITIAL_VENDOR);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "documents" | "modules" | "activity"
//   >("overview");

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [showVerificationModal, setShowVerificationModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   function updateStatus(newStatus: VendorStatus) {
//     setVendor((current) => ({
//       ...current,
//       status: newStatus,
//       updatedAt: "Just now",
//     }));

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `Vendor status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   }

//   function updateVerification(
//     newStatus: VerificationStatus
//   ) {
//     setVendor((current) => ({
//       ...current,
//       verificationStatus: newStatus,
//       updatedAt: "Just now",
//     }));

//     setShowVerificationModal(false);

//     setSuccessMessage(
//       `Vendor verification status changed to ${newStatus}.`
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
//           href="/entity-management"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <Link
//           href="/entity-management/vendors"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Vendors
//         </Link>

//         <span className="text-slate-400">
//           /
//         </span>

//         <span className="text-sm text-slate-700">
//           {vendorId || vendor.vendorId}
//         </span>

//       </div>

//       {/* HEADER */}
//       <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">

//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

//           <div className="flex items-start gap-4">

//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
//               {vendor.businessName
//                 .split(" ")
//                 .map((word) => word.charAt(0))
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>

//             <div>

//               <div className="flex flex-wrap items-center gap-2">

//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {vendor.businessName}
//                 </h1>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                     vendor.status
//                   )}`}
//                 >
//                   {vendor.status}
//                 </span>

//               </div>

//               <p className="mt-1 text-sm text-slate-500">
//                 Vendor ID: {vendor.vendorId}
//               </p>

//               <p className="mt-1 text-sm text-slate-500">
//                 Owner: {vendor.ownerName}
//               </p>

//             </div>

//           </div>

//           <div className="flex flex-wrap gap-2">

//             <button
//               type="button"
//               onClick={() =>
//                 setShowVerificationModal(true)
//               }
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Verification
//             </button>

//             <button
//               type="button"
//               onClick={() =>
//                 setShowStatusModal(true)
//               }
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//             >
//               Change Status
//             </button>

//           </div>

//         </div>

//         {/* QUICK INFO */}
//         <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">

//           <QuickInfo
//             label="Verification"
//             value={vendor.verificationStatus}
//             badge
//             badgeClass={getVerificationClasses(
//               vendor.verificationStatus
//             )}
//           />

//           <QuickInfo
//             label="Location"
//             value={`${vendor.districtName}, ${vendor.stateName}`}
//           />

//           <QuickInfo
//             label="Rating"
//             value={`${vendor.rating.toFixed(1)} / 5`}
//           />

//           <QuickInfo
//             label="Last Active"
//             value={vendor.lastActiveAt}
//           />

//         </div>

//       </div>

//       {/* SUCCESS */}
//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* TABS */}
//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">

//         <div className="flex min-w-max border-b border-slate-200">

//           <TabButton
//             active={activeTab === "overview"}
//             onClick={() => setActiveTab("overview")}
//           >
//             Overview
//           </TabButton>

//           <TabButton
//             active={activeTab === "documents"}
//             onClick={() => setActiveTab("documents")}
//           >
//             KYC & Documents
//           </TabButton>

//           <TabButton
//             active={activeTab === "modules"}
//             onClick={() => setActiveTab("modules")}
//           >
//             Modules
//           </TabButton>

//           <TabButton
//             active={activeTab === "activity"}
//             onClick={() => setActiveTab("activity")}
//           >
//             Activity
//           </TabButton>

//         </div>

//       </div>

//       {/* OVERVIEW */}
//       {activeTab === "overview" && (
//         <div className="space-y-6">

//           {/* BUSINESS */}
//           <SectionCard title="Business Information">

//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

//               <InfoItem
//                 label="Business Name"
//                 value={vendor.businessName}
//               />

//               <InfoItem
//                 label="Business Type"
//                 value={vendor.businessType}
//               />

//               <InfoItem
//                 label="Owner Name"
//                 value={vendor.ownerName}
//               />

//               <InfoItem
//                 label="Phone"
//                 value={vendor.phone}
//               />

//               <InfoItem
//                 label="Email"
//                 value={vendor.email}
//               />

//               <InfoItem
//                 label="Vendor ID"
//                 value={vendor.vendorId}
//               />

//             </div>

//           </SectionCard>

//           {/* LOCATION */}
//           <SectionCard title="Business Location">

//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

//               <InfoItem
//                 label="State"
//                 value={`${vendor.stateName} (${vendor.stateId})`}
//               />

//               <InfoItem
//                 label="District"
//                 value={`${vendor.districtName} (${vendor.districtId})`}
//               />

//               <InfoItem
//                 label="Pincode"
//                 value={vendor.pincode}
//               />

//               <InfoItem
//                 label="Address"
//                 value={vendor.address}
//               />

//             </div>

//           </SectionCard>

//           {/* STATISTICS */}
//           <SectionCard title="Vendor Statistics">

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//               <StatCard
//                 label="Total Orders"
//                 value={vendor.totalOrders.toLocaleString("en-IN")}
//               />

//               <StatCard
//                 label="Completed Orders"
//                 value={vendor.completedOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//               <StatCard
//                 label="Cancelled Orders"
//                 value={vendor.cancelledOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//               <StatCard
//                 label="Rating"
//                 value={`${vendor.rating.toFixed(1)} / 5`}
//               />

//             </div>

//           </SectionCard>

//           {/* BUSINESS DOCUMENT IDENTIFIERS */}
//           <SectionCard title="Business Identifiers">

//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

//               <InfoItem
//                 label="GST Number"
//                 value={vendor.gstNumber}
//               />

//               <InfoItem
//                 label="PAN Number"
//                 value={vendor.panNumber}
//               />

//               <InfoItem
//                 label="Bank Account"
//                 value={`•••• ${vendor.bankAccountLast4}`}
//               />

//               <InfoItem
//                 label="IFSC"
//                 value={vendor.ifscCode}
//               />

//             </div>

//           </SectionCard>

//           {/* ACTIVE MODULES */}
//           <SectionCard title="Vendor Modules">

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

//               {vendor.modules.map((module) => (

//                 <div
//                   key={module.moduleId}
//                   className="rounded-xl border border-slate-200 p-4"
//                 >

//                   <div className="flex items-center justify-between gap-3">

//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>

//                     <span
//                       className={`text-xs font-semibold ${
//                         module.status === "ACTIVE"
//                           ? "text-green-600"
//                           : module.status ===
//                               "PENDING"
//                             ? "text-yellow-600"
//                             : "text-slate-500"
//                       }`}
//                     >
//                       {module.status}
//                     </span>

//                   </div>

//                   <p className="mt-4 text-xs text-slate-500">
//                     Joined
//                   </p>

//                   <p className="mt-1 text-sm font-semibold text-slate-800">
//                     {module.joinedAt}
//                   </p>

//                 </div>

//               ))}

//             </div>

//           </SectionCard>

//         </div>
//       )}

//       {/* DOCUMENTS */}
//       {activeTab === "documents" && (
//         <div className="space-y-6">

//           <SectionCard title="Verification Status">

//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

//               <div>

//                 <p className="text-xs text-slate-500">
//                   Current verification state
//                 </p>

//                 <span
//                   className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                     vendor.verificationStatus
//                   )}`}
//                 >
//                   {vendor.verificationStatus}
//                 </span>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowVerificationModal(true)
//                 }
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Update Verification
//               </button>

//             </div>

//           </SectionCard>

//           <SectionCard title="KYC & Documents">

//             <div className="space-y-3">

//               {vendor.documents.map((document) => (

//                 <div
//                   key={document.documentId}
//                   className="rounded-xl border border-slate-200 p-4"
//                 >

//                   <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

//                     <div>

//                       <div className="flex flex-wrap items-center gap-2">

//                         <h3 className="text-sm font-bold text-slate-900">
//                           {document.documentType}
//                         </h3>

//                         <span
//                           className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getDocumentClasses(
//                             document.status
//                           )}`}
//                         >
//                           {document.status}
//                         </span>

//                       </div>

//                       <p className="mt-2 text-xs text-slate-500">
//                         Document ID:{" "}
//                         {document.documentId}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-500">
//                         Number:{" "}
//                         {document.documentNumber}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Uploaded:{" "}
//                         {document.uploadedAt}
//                       </p>

//                     </div>

//                     <button
//                       type="button"
//                       className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                     >
//                       View Document
//                     </button>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </SectionCard>

//           <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-5">

//             <p className="text-sm font-bold text-yellow-800">
//               Verification Governance
//             </p>

//             <p className="mt-2 text-xs leading-6 text-yellow-700">
//               Vendor verification must be performed through
//               the authorized JUERP/backend workflow. The
//               client should not independently approve KYC,
//               eligibility or financial authority.
//             </p>

//           </div>

//         </div>
//       )}

//       {/* MODULES */}
//       {activeTab === "modules" && (
//         <div className="space-y-6">

//           <SectionCard title="Vendor Module Access">

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

//               {vendor.modules.map((module) => (

//                 <div
//                   key={module.moduleId}
//                   className="rounded-xl border border-slate-200 p-5"
//                 >

//                   <div className="flex items-center justify-between">

//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
//                         module.status === "ACTIVE"
//                           ? "bg-green-100 text-green-700"
//                           : module.status ===
//                               "PENDING"
//                             ? "bg-yellow-100 text-yellow-700"
//                             : "bg-slate-100 text-slate-600"
//                       }`}
//                     >
//                       {module.status}
//                     </span>

//                   </div>

//                   <div className="mt-5">

//                     <p className="text-xs text-slate-500">
//                       Module Joined
//                     </p>

//                     <p className="mt-1 text-sm font-semibold text-slate-800">
//                       {module.joinedAt}
//                     </p>

//                   </div>

//                 </div>

//               ))}

//             </div>

//           </SectionCard>

//           <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">

//             <p className="text-sm font-bold text-blue-800">
//               Module Eligibility
//             </p>

//             <p className="mt-2 text-xs leading-6 text-blue-700">
//               Module activation and vendor eligibility are
//               authoritative JUERP/backend decisions. The
//               frontend only displays the effective module
//               state and should not independently enable a
//               vendor module.
//             </p>

//           </div>

//         </div>
//       )}

//       {/* ACTIVITY */}
//       {activeTab === "activity" && (
//         <div className="space-y-6">

//           <SectionCard title="Account Timeline">

//             <div className="space-y-5">

//               <TimelineItem
//                 title="Vendor Account Created"
//                 description="Vendor registration record was created."
//                 date={vendor.joinedAt}
//               />

//               <TimelineItem
//                 title="Verification Updated"
//                 description={`Current verification status: ${vendor.verificationStatus}.`}
//                 date={vendor.updatedAt}
//               />

//               <TimelineItem
//                 title="Last Active"
//                 description="Most recent known operational activity."
//                 date={vendor.lastActiveAt}
//               />

//               <TimelineItem
//                 title="Module Access"
//                 description={`${vendor.modules.length} vendor modules are configured for this vendor.`}
//                 date="Current"
//               />

//             </div>

//           </SectionCard>

//           <SectionCard title="Operational Summary">

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//               <StatCard
//                 label="Orders"
//                 value={vendor.totalOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//               <StatCard
//                 label="Completed"
//                 value={vendor.completedOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//               <StatCard
//                 label="Cancelled"
//                 value={vendor.cancelledOrders.toLocaleString(
//                   "en-IN"
//                 )}
//               />

//               <StatCard
//                 label="Rating"
//                 value={vendor.rating.toFixed(1)}
//               />

//             </div>

//           </SectionCard>

//         </div>
//       )}

//       {/* STATUS MODAL */}
//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Change Vendor Status
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {vendor.businessName}
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
//                 ] as VendorStatus[]
//               ).map((status) => (

//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() =>
//                     updateStatus(status)
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
//                     vendor.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >

//                   <span className="text-sm font-semibold text-slate-800">
//                     {status}
//                   </span>

//                   {vendor.status === status && (
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

//       {/* VERIFICATION MODAL */}
//       {showVerificationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//             <div className="flex items-start justify-between">

//               <div>

//                 <h2 className="text-lg font-bold text-slate-900">
//                   Vendor Verification
//                 </h2>

//                 <p className="mt-1 text-xs text-slate-500">
//                   {vendor.vendorId}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowVerificationModal(false)
//                 }
//                 className="text-2xl text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>

//             </div>

//             <div className="mt-6 space-y-2">

//               {(
//                 [
//                   "DRAFT",
//                   "SUBMITTED",
//                   "PENDING",
//                   "ACTIVE",
//                   "REJECTED",
//                 ] as VerificationStatus[]
//               ).map((status) => (

//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() =>
//                     updateVerification(status)
//                   }
//                   className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
//                     vendor.verificationStatus ===
//                     status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200 hover:bg-slate-50"
//                   }`}
//                 >

//                   <span className="text-sm font-semibold text-slate-800">
//                     {status}
//                   </span>

//                   {vendor.verificationStatus ===
//                     status && (
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
//                 setShowVerificationModal(false)
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

//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Vendor verification, module eligibility, account
//           activation, administrative scope, commission,
//           pricing, settlement and financial operations must
//           be controlled by the authoritative JUERP/backend
//           workflow. This page currently uses local development
//           state for the status controls. Production integration
//           should use secured backend operations, Firestore
//           authorization, correlationId, idempotencyKey and
//           audit logging.
//         </p>

//       </div>

//     </div>
//   );
// }

// function TabButton({
//   active,
//   onClick,
//   children,
// }: {
//   active: boolean;
//   onClick: () => void;
//   children: React.ReactNode;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//         active
//           ? "border-orange-500 text-orange-600"
//           : "border-transparent text-slate-500 hover:text-slate-800"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// function QuickInfo({
//   label,
//   value,
//   badge = false,
//   badgeClass = "",
// }: {
//   label: string;
//   value: string;
//   badge?: boolean;
//   badgeClass?: string;
// }) {
//   return (
//     <div>

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       {badge ? (
//         <span
//           className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
//         >
//           {value}
//         </span>
//       ) : (
//         <p className="mt-1 text-sm font-semibold text-slate-800">
//           {value}
//         </p>
//       )}

//     </div>
//   );
// }

// function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl bg-white p-6 shadow-sm">

//       <h2 className="text-base font-bold text-slate-900">
//         {title}
//       </h2>

//       <div className="mt-5">
//         {children}
//       </div>

//     </section>
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

// function StatCard({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-2 text-xl font-bold text-slate-900">
//         {value}
//       </p>

//     </div>
//   );
// }

// function TimelineItem({
//   title,
//   description,
//   date,
// }: {
//   title: string;
//   description: string;
//   date: string;
// }) {
//   return (
//     <div className="relative pl-7">

//       <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-orange-500" />

//       <div className="absolute bottom-0 left-[5px] top-5 w-px bg-slate-200" />

//       <div>

//         <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-sm font-bold text-slate-800">
//             {title}
//           </p>

//           <p className="text-xs text-slate-400">
//             {date}
//           </p>

//         </div>

//         <p className="mt-1 text-xs leading-5 text-slate-500">
//           {description}
//         </p>

//       </div>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useVendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   type DocumentStatus,
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
//     case "PENDING":
//     case "SUBMITTED":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getDocumentClasses(status: DocumentStatus) {
//   switch (String(status).toUpperCase()) {
//     case "VERIFIED":
//       return "bg-green-100 text-green-700";
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(moduleId: VendorModule) {
//   switch (String(moduleId).toUpperCase()) {
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

// export default function VendorDetailsPage() {
//   const params = useParams();
//   const vendorId = useMemo(() => {
//     const value = params?.vendorId;
//     if (Array.isArray(value)) return value[0] ?? "";
//     return value ?? "";
//   }, [params]);

//   const { vendor, loading, error, demoMode, refresh, setVendor } =
//     useVendor(vendorId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "documents" | "modules" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading vendor…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   if (!vendor) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Vendor not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>vendors</code> for{" "}
//           <code>{vendorId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   function updateStatus(newStatus: VendorStatus) {
//     setVendor({
//       ...vendor!,
//       status: newStatus,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowStatusModal(false);
//     setSuccessMessage(
//       `Local UI status → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   function updateVerification(newStatus: VerificationStatus) {
//     setVendor({
//       ...vendor!,
//       verificationStatus: newStatus,
//       updatedAt: "Just now (local UI)",
//     });
//     setShowVerificationModal(false);
//     setSuccessMessage(
//       `Local UI verification → ${newStatus}. Persist via authorized backend.`
//     );
//     setTimeout(() => setSuccessMessage(""), 4000);
//   }

//   const modulesList =
//     vendor.moduleDetails.length > 0
//       ? vendor.moduleDetails
//       : vendor.modules.map((m) => ({
//           moduleId: m,
//           status: "ACTIVE" as const,
//           joinedAt: "—",
//         }));

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-4 flex flex-wrap items-center gap-2">
//         <Link
//           href="/entity-management"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/vendors"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Vendors
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="text-sm text-slate-700">{vendor.vendorId}</span>
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
//               {vendor.businessName
//                 .split(" ")
//                 .map((w) => w.charAt(0))
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {vendor.businessName}
//                 </h1>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                     vendor.status
//                   )}`}
//                 >
//                   {vendor.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Vendor ID: {vendor.vendorId}
//               </p>
//               <p className="mt-1 text-sm text-slate-500">
//                 Owner: {vendor.ownerName}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Verification
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//             >
//               Change Status
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
//           <QuickInfo
//             label="Verification"
//             value={vendor.verificationStatus}
//             badge
//             badgeClass={getVerificationClasses(vendor.verificationStatus)}
//           />
//           <QuickInfo
//             label="Location"
//             value={`${vendor.districtName}, ${vendor.stateName}`}
//           />
//           <QuickInfo
//             label="Rating"
//             value={`${vendor.rating.toFixed(1)} / 5`}
//           />
//           <QuickInfo label="Last Active" value={vendor.lastActiveAt} />
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["documents", "KYC & Documents"],
//               ["modules", "Modules"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([key, label]) => (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveTab(key)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === key
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
//         <div className="space-y-6">
//           <SectionCard title="Business Information">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               <InfoItem label="Business Name" value={vendor.businessName} />
//               <InfoItem label="Business Type" value={vendor.businessType} />
//               <InfoItem label="Owner Name" value={vendor.ownerName} />
//               <InfoItem label="Phone" value={vendor.phone} />
//               <InfoItem label="Email" value={vendor.email} />
//               <InfoItem label="Vendor ID" value={vendor.vendorId} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Location">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem
//                 label="State"
//                 value={`${vendor.stateName} (${vendor.stateId})`}
//               />
//               <InfoItem
//                 label="District"
//                 value={`${vendor.districtName} (${vendor.districtId})`}
//               />
//               <InfoItem label="Pincode" value={vendor.pincode} />
//               <InfoItem label="Address" value={vendor.address} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Vendor Statistics">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <StatCard
//                 label="Total Orders"
//                 value={vendor.totalOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Completed"
//                 value={vendor.completedOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Cancelled"
//                 value={vendor.cancelledOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Rating"
//                 value={`${vendor.rating.toFixed(1)} / 5`}
//               />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Identifiers">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem label="GST Number" value={vendor.gstNumber} />
//               <InfoItem label="PAN Number" value={vendor.panNumber} />
//               <InfoItem
//                 label="Bank Account"
//                 value={
//                   vendor.bankAccountLast4 !== "—"
//                     ? `•••• ${vendor.bankAccountLast4}`
//                     : "—"
//                 }
//               />
//               <InfoItem label="IFSC" value={vendor.ifscCode} />
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "documents" && (
//         <div className="space-y-6">
//           <SectionCard title="Verification Status">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <span
//                 className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                   vendor.verificationStatus
//                 )}`}
//               >
//                 {vendor.verificationStatus}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setShowVerificationModal(true)}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Update Verification
//               </button>
//             </div>
//           </SectionCard>
//           <SectionCard title="KYC & Documents">
//             {vendor.documents.length === 0 ? (
//               <p className="text-sm text-slate-500">
//                 No documents on this vendor record.
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {vendor.documents.map((document) => (
//                   <div
//                     key={document.documentId}
//                     className="rounded-xl border border-slate-200 p-4"
//                   >
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h3 className="text-sm font-bold text-slate-900">
//                         {document.documentType}
//                       </h3>
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getDocumentClasses(
//                           document.status
//                         )}`}
//                       >
//                         {document.status}
//                       </span>
//                     </div>
//                     <p className="mt-2 text-xs text-slate-500">
//                       {document.documentId} · {document.documentNumber}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Uploaded: {document.uploadedAt}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "modules" && (
//         <SectionCard title="Vendor Module Access">
//           {modulesList.length === 0 ? (
//             <p className="text-sm text-slate-500">No modules configured.</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {modulesList.map((module) => (
//                 <div
//                   key={String(module.moduleId)}
//                   className="rounded-xl border border-slate-200 p-5"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>
//                     <span className="text-xs font-semibold text-slate-600">
//                       {module.status}
//                     </span>
//                   </div>
//                   <p className="mt-4 text-xs text-slate-500">Joined</p>
//                   <p className="mt-1 text-sm font-semibold">{module.joinedAt}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {activeTab === "activity" && (
//         <SectionCard title="Account Timeline">
//           <div className="space-y-4 text-sm text-slate-700">
//             <p>Joined: {vendor.joinedAt}</p>
//             <p>Updated: {vendor.updatedAt}</p>
//             <p>Last active: {vendor.lastActiveAt}</p>
//             <p>
//               Orders: {vendor.totalOrders} · Completed: {vendor.completedOrders}{" "}
//               · Cancelled: {vendor.cancelledOrders}
//             </p>
//           </div>
//         </SectionCard>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Vendor Status</h2>
//             <div className="mt-6 space-y-2">
//               {(["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]).map(
//                 (status) => (
//                   <button
//                     key={status}
//                     type="button"
//                     onClick={() => updateStatus(status)}
//                     className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                       vendor.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     {status}
//                     {vendor.status === status && (
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

//       {showVerificationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Vendor Verification</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 [
//                   "DRAFT",
//                   "SUBMITTED",
//                   "PENDING",
//                   "ACTIVE",
//                   "REJECTED",
//                 ] as VerificationStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   onClick={() => updateVerification(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold ${
//                     vendor.verificationStatus === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {status}
//                   {vendor.verificationStatus === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(false)}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Status and verification buttons are local UI only. Production changes
//           require authorized backend operations and audit logging.
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuickInfo({
//   label,
//   value,
//   badge = false,
//   badgeClass = "",
// }: {
//   label: string;
//   value: string;
//   badge?: boolean;
//   badgeClass?: string;
// }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       {badge ? (
//         <span
//           className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
//         >
//           {value}
//         </span>
//       ) : (
//         <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//       )}
//     </div>
//   );
// }

// function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </section>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useVendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   type DocumentStatus,
// } from "@/hooks/useVendors";
// import useAuthScope from "@/hooks/useAuthScope";
// import ScopeBadge from "@/components/hierarchy/ScopeBadge";
// import {
//   FIRESTORE_COLLECTIONS,
//   isFirestoreDemoMode,
//   updateDocument,
// } from "@/lib/firebase/firestore";
// import {
//   canManageNodeStatus,
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
//     case "PENDING":
//     case "SUBMITTED":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getDocumentClasses(status: DocumentStatus) {
//   switch (String(status).toUpperCase()) {
//     case "VERIFIED":
//       return "bg-green-100 text-green-700";
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(moduleId: VendorModule) {
//   switch (String(moduleId).toUpperCase()) {
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

// export default function VendorDetailsPage() {
//   const params = useParams();
//   const vendorId = useMemo(() => {
//     const value = params?.vendorId;
//     if (Array.isArray(value)) return value[0] ?? "";
//     return value ?? "";
//   }, [params]);

//   const auth = useAuthScope();
//   const scopeFilter: HierarchyScopeFilter = {
//     role: auth.role,
//     stateId: auth.stateId,
//     districtId: auth.districtId,
//     isGlobalAdmin: auth.isGlobalAdmin,
//   };

//   const { vendor, loading, error, demoMode, refresh, setVendor } =
//     useVendor(vendorId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "documents" | "modules" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const canManage = useMemo(() => {
//     if (!vendor) return false;
//     return canManageNodeStatus(scopeFilter, {
//       type: "VENDOR",
//       id: vendor.vendorId,
//       stateId: vendor.stateId,
//       districtId: vendor.districtId,
//     });
//   }, [vendor, scopeFilter]);

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading vendor…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   if (!vendor) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Vendor not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>vendors</code> for <code>{vendorId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   if (!canManage && !auth.isGlobalAdmin) {
//     // STATE_ADMIN / DISTRICT_ADMIN outside their tree
//     const inScope =
//       (auth.role === "STATE_ADMIN" &&
//         auth.stateId &&
//         vendor.stateId === auth.stateId) ||
//       (auth.role === "DISTRICT_ADMIN" &&
//         auth.districtId &&
//         vendor.districtId === auth.districtId);

//     if (!inScope && auth.role !== "SUPER_ADMIN" && auth.role !== "TECHNICAL_ADMIN") {
//       return (
//         <div className="p-8 text-center">
//           <p className="text-sm font-semibold text-slate-700">
//             Outside your scope
//           </p>
//           <p className="mt-1 text-xs text-slate-500">
//             This vendor is not in your state/district assignment.
//           </p>
//           <ScopeBadge />
//           <Link
//             href="/entity-management/vendors"
//             className="mt-4 inline-block text-sm font-semibold text-orange-600"
//           >
//             ← Back to vendors
//           </Link>
//         </div>
//       );
//     }
//   }

//   async function updateStatus(newStatus: VendorStatus) {
//     if (!vendor) return;
//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setSaving(true);
//     try {
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, vendor.vendorId, {
//         status: newStatus,
//       });
//       setVendor({
//         ...vendor,
//         status: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(`Status → ${newStatus} (saved)`);
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error ? err.message : "Failed to update status."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function updateVerification(newStatus: VerificationStatus) {
//     if (!vendor) return;
//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setSaving(true);
//     try {
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, vendor.vendorId, {
//         verificationStatus: newStatus,
//         kycStatus: newStatus,
//       });
//       setVendor({
//         ...vendor,
//         verificationStatus: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowVerificationModal(false);
//       setSuccessMessage(`Verification → ${newStatus} (saved)`);
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       setSuccessMessage(
//         err instanceof Error ? err.message : "Failed to update verification."
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   const modulesList =
//     vendor.moduleDetails.length > 0
//       ? vendor.moduleDetails
//       : vendor.modules.map((m) => ({
//           moduleId: m,
//           status: "ACTIVE" as const,
//           joinedAt: "—",
//         }));

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-4 flex flex-wrap items-center gap-2">
//         <Link
//           href="/entity-management"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/vendors"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Vendors
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="text-sm text-slate-700">{vendor.vendorId}</span>
//         <ScopeBadge />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
//               {vendor.businessName
//                 .split(" ")
//                 .map((w) => w.charAt(0))
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {vendor.businessName}
//                 </h1>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                     vendor.status
//                   )}`}
//                 >
//                   {vendor.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Vendor ID: {vendor.vendorId}
//               </p>
//               <p className="mt-1 text-sm text-slate-500">
//                 Owner: {vendor.ownerName}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Verification
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//             >
//               Change Status
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
//           <QuickInfo
//             label="Verification"
//             value={vendor.verificationStatus}
//             badge
//             badgeClass={getVerificationClasses(vendor.verificationStatus)}
//           />
//           <QuickInfo
//             label="Location"
//             value={`${vendor.districtName}, ${vendor.stateName}`}
//           />
//           <QuickInfo
//             label="Rating"
//             value={`${vendor.rating.toFixed(1)} / 5`}
//           />
//           <QuickInfo label="Last Active" value={vendor.lastActiveAt} />
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["documents", "KYC & Documents"],
//               ["modules", "Modules"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([key, label]) => (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveTab(key)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === key
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
//         <div className="space-y-6">
//           <SectionCard title="Business Information">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               <InfoItem label="Business Name" value={vendor.businessName} />
//               <InfoItem label="Business Type" value={vendor.businessType} />
//               <InfoItem label="Owner Name" value={vendor.ownerName} />
//               <InfoItem label="Phone" value={vendor.phone} />
//               <InfoItem label="Email" value={vendor.email} />
//               <InfoItem label="Vendor ID" value={vendor.vendorId} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Location">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem
//                 label="State"
//                 value={`${vendor.stateName} (${vendor.stateId})`}
//               />
//               <InfoItem
//                 label="District"
//                 value={`${vendor.districtName} (${vendor.districtId})`}
//               />
//               <InfoItem label="Pincode" value={vendor.pincode} />
//               <InfoItem label="Address" value={vendor.address} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Vendor Statistics">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <StatCard
//                 label="Total Orders"
//                 value={vendor.totalOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Completed"
//                 value={vendor.completedOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Cancelled"
//                 value={vendor.cancelledOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Rating"
//                 value={`${vendor.rating.toFixed(1)} / 5`}
//               />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Identifiers">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem label="GST Number" value={vendor.gstNumber} />
//               <InfoItem label="PAN Number" value={vendor.panNumber} />
//               <InfoItem
//                 label="Bank Account"
//                 value={
//                   vendor.bankAccountLast4 !== "—"
//                     ? `•••• ${vendor.bankAccountLast4}`
//                     : "—"
//                 }
//               />
//               <InfoItem label="IFSC" value={vendor.ifscCode} />
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "documents" && (
//         <div className="space-y-6">
//           <SectionCard title="Verification Status">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <span
//                 className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                   vendor.verificationStatus
//                 )}`}
//               >
//                 {vendor.verificationStatus}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setShowVerificationModal(true)}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Update Verification
//               </button>
//             </div>
//           </SectionCard>
//           <SectionCard title="KYC & Documents">
//             {vendor.documents.length === 0 ? (
//               <p className="text-sm text-slate-500">
//                 No documents on this vendor record.
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {vendor.documents.map((document) => (
//                   <div
//                     key={document.documentId}
//                     className="rounded-xl border border-slate-200 p-4"
//                   >
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h3 className="text-sm font-bold text-slate-900">
//                         {document.documentType}
//                       </h3>
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getDocumentClasses(
//                           document.status
//                         )}`}
//                       >
//                         {document.status}
//                       </span>
//                     </div>
//                     <p className="mt-2 text-xs text-slate-500">
//                       {document.documentId} · {document.documentNumber}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Uploaded: {document.uploadedAt}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "modules" && (
//         <SectionCard title="Vendor Module Access">
//           {modulesList.length === 0 ? (
//             <p className="text-sm text-slate-500">No modules configured.</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {modulesList.map((module) => (
//                 <div
//                   key={String(module.moduleId)}
//                   className="rounded-xl border border-slate-200 p-5"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>
//                     <span className="text-xs font-semibold text-slate-600">
//                       {module.status}
//                     </span>
//                   </div>
//                   <p className="mt-4 text-xs text-slate-500">Joined</p>
//                   <p className="mt-1 text-sm font-semibold">{module.joinedAt}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {activeTab === "activity" && (
//         <SectionCard title="Account Timeline">
//           <div className="space-y-4 text-sm text-slate-700">
//             <p>Joined: {vendor.joinedAt}</p>
//             <p>Updated: {vendor.updatedAt}</p>
//             <p>Last active: {vendor.lastActiveAt}</p>
//             <p>
//               Orders: {vendor.totalOrders} · Completed: {vendor.completedOrders}{" "}
//               · Cancelled: {vendor.cancelledOrders}
//             </p>
//           </div>
//         </SectionCard>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Vendor Status</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   disabled={saving}
//                   onClick={() => void updateStatus(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     vendor.status === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {saving ? "Saving…" : status}
//                   {vendor.status === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showVerificationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Vendor Verification</h2>
//             <div className="mt-6 space-y-2">
//               {(
//                 [
//                   "DRAFT",
//                   "SUBMITTED",
//                   "PENDING",
//                   "ACTIVE",
//                   "REJECTED",
//                 ] as VerificationStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   disabled={saving}
//                   onClick={() => void updateVerification(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     vendor.verificationStatus === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {saving ? "Saving…" : status}
//                   {vendor.verificationStatus === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Status and verification write to Firestore <code>vendors</code>.
//           Access is limited by your state/district claims. Production should
//           mirror this in security rules and audit logs.
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuickInfo({
//   label,
//   value,
//   badge = false,
//   badgeClass = "",
// }: {
//   label: string;
//   value: string;
//   badge?: boolean;
//   badgeClass?: string;
// }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       {badge ? (
//         <span
//           className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
//         >
//           {value}
//         </span>
//       ) : (
//         <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//       )}
//     </div>
//   );
// }

// function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </section>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }


// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useVendor,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   type DocumentStatus,
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
//   canManageNodeStatus,
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
//     case "PENDING":
//     case "SUBMITTED":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getDocumentClasses(status: DocumentStatus) {
//   switch (String(status).toUpperCase()) {
//     case "VERIFIED":
//       return "bg-green-100 text-green-700";
//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(moduleId: VendorModule) {
//   switch (String(moduleId).toUpperCase()) {
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

// export default function VendorDetailsPage() {
//   const params = useParams();
//   const vendorId = useMemo(() => {
//     const value = params?.vendorId;
//     if (Array.isArray(value)) return value[0] ?? "";
//     return value ?? "";
//   }, [params]);

//   const auth = useAuthScope();
//   const scopeFilter: HierarchyScopeFilter = {
//     role: auth.role,
//     stateId: auth.stateId,
//     districtId: auth.districtId,
//     isGlobalAdmin: auth.isGlobalAdmin,
//   };

//   const { vendor, loading, error, demoMode, refresh, setVendor } =
//     useVendor(vendorId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "documents" | "modules" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const writeId = vendor?.docId || vendor?.vendorId || vendorId;

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading vendor…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   if (!vendor) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Vendor not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>vendors</code> for <code>{vendorId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   const inScope =
//     auth.isGlobalAdmin ||
//     auth.role === "SUPER_ADMIN" ||
//     auth.role === "TECHNICAL_ADMIN" ||
//     (auth.role === "STATE_ADMIN" &&
//       auth.stateId &&
//       vendor.stateId === auth.stateId) ||
//     (auth.role === "DISTRICT_ADMIN" &&
//       auth.districtId &&
//       vendor.districtId === auth.districtId) ||
//     canManageNodeStatus(scopeFilter, {
//       type: "VENDOR",
//       id: vendor.vendorId,
//       stateId: vendor.stateId,
//       districtId: vendor.districtId,
//     });

//   if (!inScope) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">
//           Outside your scope
//         </p>
//         <p className="mt-1 text-xs text-slate-500">
//           This vendor is not in your state/district assignment.
//         </p>
//         <div className="mt-3 flex justify-center">
//           <ScopeBadge />
//         </div>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   async function updateStatus(newStatus: VendorStatus) {
//     if (!vendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     if (
//       newStatus === "ACTIVE" &&
//       isVerificationBlockingActive(vendor.verificationStatus)
//     ) {
//       setSuccessMessage(
//         `Cannot set ACTIVE while verification is ${vendor.verificationStatus}. Set verification to ACTIVE first.`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
//         status: newStatus,
//         accountStatus: newStatus,
//       });
//       setVendor({
//         ...vendor,
//         status: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(`accountStatus / status → ${newStatus} (saved · ${id})`);
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       console.error("updateStatus failed:", err);
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update status. Check console / Firestore rules."
//       );
//       setTimeout(() => setSuccessMessage(""), 6000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function updateVerification(newStatus: VerificationStatus) {
//     if (!vendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;

//       // If verification is not ACTIVE → force account INACTIVE
//       const payload: Record<string, unknown> = {
//         verificationStatus: newStatus,
//         kycStatus: newStatus,
//       };

//       let nextAccountStatus = vendor.status;
//       if (isVerificationBlockingActive(newStatus)) {
//         payload.status = "INACTIVE";
//         payload.accountStatus = "INACTIVE";
//         nextAccountStatus = "INACTIVE";
//       }

//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, payload);

//       setVendor({
//         ...vendor,
//         verificationStatus: newStatus,
//         status: nextAccountStatus,
//         updatedAt: "Just now",
//       });
//       setShowVerificationModal(false);

//       const note = isVerificationBlockingActive(newStatus)
//         ? ` Verification ${newStatus} → account forced INACTIVE.`
//         : "";
//       setSuccessMessage(`Verification → ${newStatus} (saved · ${id}).${note}`);
//       setTimeout(() => setSuccessMessage(""), 5000);
//       await refresh();
//     } catch (err) {
//       console.error("updateVerification failed:", err);
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update verification. Check console / Firestore rules."
//       );
//       setTimeout(() => setSuccessMessage(""), 6000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   const modulesList =
//     vendor.moduleDetails.length > 0
//       ? vendor.moduleDetails
//       : vendor.modules.map((m) => ({
//           moduleId: m,
//           status: "ACTIVE" as const,
//           joinedAt: "—",
//         }));

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-4 flex flex-wrap items-center gap-2">
//         <Link
//           href="/entity-management"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/vendors"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Vendors
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="text-sm text-slate-700">{vendor.vendorId}</span>
//         <ScopeBadge />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
//               {vendor.businessName
//                 .split(" ")
//                 .map((w) => w.charAt(0))
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {vendor.businessName}
//                 </h1>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                     vendor.status
//                   )}`}
//                 >
//                   {vendor.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Vendor ID: {vendor.vendorId}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">
//                 Firestore doc: {writeId}
//               </p>
//               <p className="mt-1 text-sm text-slate-500">
//                 Owner: {vendor.ownerName}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Verification
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//             >
//               Change Status
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
//           <QuickInfo
//             label="Verification"
//             value={vendor.verificationStatus}
//             badge
//             badgeClass={getVerificationClasses(vendor.verificationStatus)}
//           />
//           <QuickInfo
//             label="Location"
//             value={`${vendor.districtName}, ${vendor.stateName}`}
//           />
//           <QuickInfo
//             label="Rating"
//             value={`${vendor.rating.toFixed(1)} / 5`}
//           />
//           <QuickInfo label="Last Active" value={vendor.lastActiveAt} />
//         </div>

//         {isVerificationBlockingActive(vendor.verificationStatus) && (
//           <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
//             Verification is <strong>{vendor.verificationStatus}</strong> —
//             account cannot be ACTIVE until verification is ACTIVE.
//           </p>
//         )}
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["documents", "KYC & Documents"],
//               ["modules", "Modules"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([key, label]) => (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveTab(key)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === key
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
//         <div className="space-y-6">
//           <SectionCard title="Business Information">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               <InfoItem label="Business Name" value={vendor.businessName} />
//               <InfoItem label="Business Type" value={vendor.businessType} />
//               <InfoItem label="Owner Name" value={vendor.ownerName} />
//               <InfoItem label="Phone" value={vendor.phone} />
//               <InfoItem label="Email" value={vendor.email} />
//               <InfoItem label="Vendor ID" value={vendor.vendorId} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Location">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem
//                 label="State"
//                 value={`${vendor.stateName} (${vendor.stateId})`}
//               />
//               <InfoItem
//                 label="District"
//                 value={`${vendor.districtName} (${vendor.districtId})`}
//               />
//               <InfoItem label="Pincode" value={vendor.pincode} />
//               <InfoItem label="Address" value={vendor.address} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Vendor Statistics">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <StatCard
//                 label="Total Orders"
//                 value={vendor.totalOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Completed"
//                 value={vendor.completedOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Cancelled"
//                 value={vendor.cancelledOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Rating"
//                 value={`${vendor.rating.toFixed(1)} / 5`}
//               />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Identifiers">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem label="GST Number" value={vendor.gstNumber} />
//               <InfoItem label="PAN Number" value={vendor.panNumber} />
//               <InfoItem
//                 label="Bank Account"
//                 value={
//                   vendor.bankAccountLast4 !== "—"
//                     ? `•••• ${vendor.bankAccountLast4}`
//                     : "—"
//                 }
//               />
//               <InfoItem label="IFSC" value={vendor.ifscCode} />
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "documents" && (
//         <div className="space-y-6">
//           <SectionCard title="Verification Status">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <span
//                 className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                   vendor.verificationStatus
//                 )}`}
//               >
//                 {vendor.verificationStatus}
//               </span>
//               <button
//                 type="button"
//                 onClick={() => setShowVerificationModal(true)}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//               >
//                 Update Verification
//               </button>
//             </div>
//           </SectionCard>
//           <SectionCard title="KYC & Documents">
//             {vendor.documents.length === 0 ? (
//               <p className="text-sm text-slate-500">
//                 No documents on this vendor record.
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {vendor.documents.map((document) => (
//                   <div
//                     key={document.documentId}
//                     className="rounded-xl border border-slate-200 p-4"
//                   >
//                     <div className="flex flex-wrap items-center gap-2">
//                       <h3 className="text-sm font-bold text-slate-900">
//                         {document.documentType}
//                       </h3>
//                       <span
//                         className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getDocumentClasses(
//                           document.status
//                         )}`}
//                       >
//                         {document.status}
//                       </span>
//                     </div>
//                     <p className="mt-2 text-xs text-slate-500">
//                       {document.documentId} · {document.documentNumber}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Uploaded: {document.uploadedAt}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "modules" && (
//         <SectionCard title="Vendor Module Access">
//           {modulesList.length === 0 ? (
//             <p className="text-sm text-slate-500">No modules configured.</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {modulesList.map((module) => (
//                 <div
//                   key={String(module.moduleId)}
//                   className="rounded-xl border border-slate-200 p-5"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>
//                     <span className="text-xs font-semibold text-slate-600">
//                       {module.status}
//                     </span>
//                   </div>
//                   <p className="mt-4 text-xs text-slate-500">Joined</p>
//                   <p className="mt-1 text-sm font-semibold">{module.joinedAt}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {activeTab === "activity" && (
//         <SectionCard title="Account Timeline">
//           <div className="space-y-4 text-sm text-slate-700">
//             <p>Joined: {vendor.joinedAt}</p>
//             <p>Updated: {vendor.updatedAt}</p>
//             <p>Last active: {vendor.lastActiveAt}</p>
//             <p>
//               Orders: {vendor.totalOrders} · Completed: {vendor.completedOrders}{" "}
//               · Cancelled: {vendor.cancelledOrders}
//             </p>
//           </div>
//         </SectionCard>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Vendor Status</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Writes <code>status</code> + <code>accountStatus</code> to doc{" "}
//               <code>{writeId}</code>
//             </p>
//             {isVerificationBlockingActive(vendor.verificationStatus) && (
//               <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
//                 ACTIVE is blocked until verification is ACTIVE.
//               </p>
//             )}
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
//               ).map((status) => {
//                 const blocked =
//                   status === "ACTIVE" &&
//                   isVerificationBlockingActive(vendor.verificationStatus);
//                 return (
//                   <button
//                     key={status}
//                     type="button"
//                     disabled={saving || blocked}
//                     onClick={() => void updateStatus(status)}
//                     className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-50 ${
//                       vendor.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     <span>
//                       {saving ? "Saving…" : status}
//                       {blocked ? " (blocked)" : ""}
//                     </span>
//                     {vendor.status === status && (
//                       <span className="text-orange-600">✓</span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showVerificationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Vendor Verification</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               DRAFT / PENDING / SUBMITTED / REJECTED force accountStatus =
//               INACTIVE
//             </p>
//             <div className="mt-6 space-y-2">
//               {(
//                 [
//                   "DRAFT",
//                   "SUBMITTED",
//                   "PENDING",
//                   "ACTIVE",
//                   "REJECTED",
//                 ] as VerificationStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   disabled={saving}
//                   onClick={() => void updateVerification(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     vendor.verificationStatus === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {saving ? "Saving…" : status}
//                   {vendor.verificationStatus === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Updates write both <code>status</code> and <code>accountStatus</code>{" "}
//           using Firestore document id <code>{writeId}</code>. Non-ACTIVE
//           verification forces the account inactive.
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuickInfo({
//   label,
//   value,
//   badge = false,
//   badgeClass = "",
// }: {
//   label: string;
//   value: string;
//   badge?: boolean;
//   badgeClass?: string;
// }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       {badge ? (
//         <span
//           className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
//         >
//           {value}
//         </span>
//       ) : (
//         <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//       )}
//     </div>
//   );
// }

// function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </section>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   useVendor,
//   type VendorDocument,
//   type VendorModule,
//   type VendorStatus,
//   type VerificationStatus,
//   type DocumentStatus,
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
//   canManageNodeStatus,
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

// function getVerificationClasses(status: VerificationStatus | DocumentStatus) {
//   switch (String(status).toUpperCase()) {
//     case "ACTIVE":
//     case "VERIFIED":
//       return "bg-green-100 text-green-700";
//     case "PENDING":
//     case "SUBMITTED":
//       return "bg-yellow-100 text-yellow-700";
//     case "REJECTED":
//       return "bg-red-100 text-red-700";
//     case "DRAFT":
//       return "bg-slate-100 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getDocumentClasses(status: DocumentStatus) {
//   return getVerificationClasses(status);
// }

// function getModuleClasses(moduleId: VendorModule) {
//   switch (String(moduleId).toUpperCase()) {
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

// function formatDocType(type: string) {
//   return type.replace(/_/g, " ");
// }

// export default function VendorDetailsPage() {
//   const params = useParams();
//   const vendorId = useMemo(() => {
//     const value = params?.vendorId;
//     if (Array.isArray(value)) return value[0] ?? "";
//     return value ?? "";
//   }, [params]);

//   const auth = useAuthScope();
//   const scopeFilter: HierarchyScopeFilter = {
//     role: auth.role,
//     stateId: auth.stateId,
//     districtId: auth.districtId,
//     isGlobalAdmin: auth.isGlobalAdmin,
//   };

//   const { vendor, loading, error, demoMode, refresh, setVendor } =
//     useVendor(vendorId);

//   const [activeTab, setActiveTab] = useState<
//     "overview" | "documents" | "modules" | "activity"
//   >("overview");
//   const [showStatusModal, setShowStatusModal] = useState(false);
//   const [showVerificationModal, setShowVerificationModal] = useState(false);
//   const [showKycModal, setShowKycModal] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [previewTitle, setPreviewTitle] = useState("");
//   const [rejectReason, setRejectReason] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [actionError, setActionError] = useState("");

//   const writeId = vendor?.docId || vendor?.vendorId || vendorId;

//   if (loading) {
//     return (
//       <div className="p-8 text-center text-sm text-slate-500">
//         Loading vendor…
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-8">
//         <p className="text-sm text-red-600">{error}</p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   if (!vendor) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">Vendor not found</p>
//         <p className="mt-1 text-xs text-slate-500">
//           No document in <code>vendors</code> for <code>{vendorId}</code>
//           {demoMode ? " (demo mode)" : ""}.
//         </p>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   const inScope =
//     auth.isGlobalAdmin ||
//     auth.role === "SUPER_ADMIN" ||
//     auth.role === "TECHNICAL_ADMIN" ||
//     (auth.role === "STATE_ADMIN" &&
//       auth.stateId &&
//       vendor.stateId === auth.stateId) ||
//     (auth.role === "DISTRICT_ADMIN" &&
//       auth.districtId &&
//       vendor.districtId === auth.districtId) ||
//     canManageNodeStatus(scopeFilter, {
//       type: "VENDOR",
//       id: vendor.vendorId,
//       stateId: vendor.stateId,
//       districtId: vendor.districtId,
//     });

//   if (!inScope) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-sm font-semibold text-slate-700">
//           Outside your scope
//         </p>
//         <p className="mt-1 text-xs text-slate-500">
//           This vendor is not in your state/district assignment.
//         </p>
//         <div className="mt-3 flex justify-center">
//           <ScopeBadge />
//         </div>
//         <Link
//           href="/entity-management/vendors"
//           className="mt-4 inline-block text-sm font-semibold text-orange-600"
//         >
//           ← Back to vendors
//         </Link>
//       </div>
//     );
//   }

//   async function updateStatus(newStatus: VendorStatus) {
//     if (!vendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     if (
//       newStatus === "ACTIVE" &&
//       isVerificationBlockingActive(vendor.verificationStatus)
//     ) {
//       setSuccessMessage(
//         `Cannot set ACTIVE while verification is ${vendor.verificationStatus}. Set verification to ACTIVE first.`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;
//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
//         status: newStatus,
//         accountStatus: newStatus,
//       });
//       setVendor({
//         ...vendor,
//         status: newStatus,
//         updatedAt: "Just now",
//       });
//       setShowStatusModal(false);
//       setSuccessMessage(`accountStatus / status → ${newStatus} (saved · ${id})`);
//       setTimeout(() => setSuccessMessage(""), 4000);
//       await refresh();
//     } catch (err) {
//       console.error("updateStatus failed:", err);
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update status. Check console / Firestore rules."
//       );
//       setTimeout(() => setSuccessMessage(""), 6000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function updateVerification(newStatus: VerificationStatus) {
//     if (!vendor) return;

//     if (isFirestoreDemoMode) {
//       setSuccessMessage("Writes are disabled in demo mode.");
//       setTimeout(() => setSuccessMessage(""), 3500);
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;
//       const payload: Record<string, unknown> = {
//         verificationStatus: newStatus,
//         kycStatus: newStatus,
//       };

//       let nextAccountStatus = vendor.status;
//       if (isVerificationBlockingActive(newStatus)) {
//         payload.status = "INACTIVE";
//         payload.accountStatus = "INACTIVE";
//         nextAccountStatus = "INACTIVE";
//       }

//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, payload);

//       setVendor({
//         ...vendor,
//         verificationStatus: newStatus,
//         status: nextAccountStatus,
//         updatedAt: "Just now",
//       });
//       setShowVerificationModal(false);

//       const note = isVerificationBlockingActive(newStatus)
//         ? ` Verification ${newStatus} → account forced INACTIVE.`
//         : "";
//       setSuccessMessage(`Verification → ${newStatus} (saved · ${id}).${note}`);
//       setTimeout(() => setSuccessMessage(""), 5000);
//       await refresh();
//     } catch (err) {
//       console.error("updateVerification failed:", err);
//       setSuccessMessage(
//         err instanceof Error
//           ? err.message
//           : "Failed to update verification. Check console / Firestore rules."
//       );
//       setTimeout(() => setSuccessMessage(""), 6000);
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function markDocumentsStatus(status: "VERIFIED" | "REJECTED") {
//     if (!vendor) return;
//     const docs = vendor.documents.filter(
//       (d) => d.documentId && !d.documentId.startsWith("DOC-")
//     );
//     await Promise.all(
//       docs.map((d) =>
//         updateDocument(FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS, d.documentId, {
//           reviewStatus: status,
//           status,
//           ...(status === "REJECTED" && rejectReason.trim()
//             ? {
//                 reviewComment: rejectReason.trim(),
//                 rejectionReason: rejectReason.trim(),
//               }
//             : {}),
//         }).catch((err) => {
//           console.warn("Doc status update failed:", d.documentId, err);
//         })
//       )
//     );
//   }

//   async function handleAcceptKyc() {
//     if (!vendor) return;
//     setActionError("");

//     if (isFirestoreDemoMode) {
//       setActionError("Writes are disabled in demo mode.");
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;

//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
//         verificationStatus: "ACTIVE",
//         kycStatus: "ACTIVE",
//       });

//       await markDocumentsStatus("VERIFIED");

//       const nextDocs: VendorDocument[] = vendor.documents.map((d) => ({
//         ...d,
//         status: "VERIFIED",
//       }));

//       setVendor({
//         ...vendor,
//         verificationStatus: "ACTIVE",
//         documents: nextDocs,
//         updatedAt: "Just now",
//       });
//       setShowKycModal(false);
//       setSuccessMessage(
//         `KYC accepted — verificationStatus=ACTIVE (saved · ${id}).`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       await refresh();
//     } catch (err) {
//       console.error("handleAcceptKyc failed:", err);
//       setActionError(
//         err instanceof Error ? err.message : "Failed to accept KYC."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   async function handleRejectKyc() {
//     if (!vendor) return;
//     setActionError("");

//     if (isFirestoreDemoMode) {
//       setActionError("Writes are disabled in demo mode.");
//       return;
//     }

//     setSaving(true);
//     try {
//       const id = vendor.docId || vendor.vendorId;

//       await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
//         verificationStatus: "REJECTED",
//         kycStatus: "REJECTED",
//         status: "INACTIVE",
//         accountStatus: "INACTIVE",
//         ...(rejectReason.trim()
//           ? { rejectionReason: rejectReason.trim() }
//           : {}),
//       });

//       await markDocumentsStatus("REJECTED");

//       const nextDocs: VendorDocument[] = vendor.documents.map((d) => ({
//         ...d,
//         status: "REJECTED",
//       }));

//       setVendor({
//         ...vendor,
//         verificationStatus: "REJECTED",
//         status: "INACTIVE",
//         documents: nextDocs,
//         updatedAt: "Just now",
//       });
//       setShowKycModal(false);
//       setRejectReason("");
//       setSuccessMessage(
//         `KYC rejected — verificationStatus=REJECTED, account INACTIVE (saved · ${id}).`
//       );
//       setTimeout(() => setSuccessMessage(""), 5000);
//       await refresh();
//     } catch (err) {
//       console.error("handleRejectKyc failed:", err);
//       setActionError(
//         err instanceof Error ? err.message : "Failed to reject KYC."
//       );
//     } finally {
//       setSaving(false);
//     }
//   }

//   const modulesList =
//     vendor.moduleDetails.length > 0
//       ? vendor.moduleDetails
//       : vendor.modules.map((m) => ({
//           moduleId: m,
//           status: "ACTIVE" as const,
//           joinedAt: "—",
//         }));

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-4 flex flex-wrap items-center gap-2">
//         <Link
//           href="/entity-management"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Entity Management
//         </Link>
//         <span className="text-slate-400">/</span>
//         <Link
//           href="/entity-management/vendors"
//           className="text-sm font-medium text-slate-500 hover:text-orange-600"
//         >
//           Vendors
//         </Link>
//         <span className="text-slate-400">/</span>
//         <span className="text-sm text-slate-700">{vendor.vendorId}</span>
//         <ScopeBadge />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
//         <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
//           <div className="flex items-start gap-4">
//             <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
//               {vendor.businessName
//                 .split(" ")
//                 .map((w) => w.charAt(0))
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>
//             <div>
//               <div className="flex flex-wrap items-center gap-2">
//                 <h1 className="text-2xl font-bold text-slate-900">
//                   {vendor.businessName}
//                 </h1>
//                 <span
//                   className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                     vendor.status
//                   )}`}
//                 >
//                   {vendor.status}
//                 </span>
//               </div>
//               <p className="mt-1 text-sm text-slate-500">
//                 Vendor ID: {vendor.vendorId}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">
//                 Firestore doc: {writeId}
//               </p>
//               <p className="mt-1 text-sm text-slate-500">
//                 Owner: {vendor.ownerName}
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Refresh
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setActionError("");
//                 setShowKycModal(true);
//               }}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               KYC & Documents
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(true)}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//             >
//               Verification
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(true)}
//               className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//             >
//               Change Status
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
//           <QuickInfo
//             label="Verification"
//             value={vendor.verificationStatus}
//             badge
//             badgeClass={getVerificationClasses(vendor.verificationStatus)}
//           />
//           <QuickInfo
//             label="Location"
//             value={`${vendor.districtName}, ${vendor.stateName}`}
//           />
//           <QuickInfo
//             label="Rating"
//             value={`${vendor.rating.toFixed(1)} / 5`}
//           />
//           <QuickInfo label="Last Active" value={vendor.lastActiveAt} />
//         </div>

//         {isVerificationBlockingActive(vendor.verificationStatus) && (
//           <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
//             Verification is <strong>{vendor.verificationStatus}</strong> —
//             account cannot be ACTIVE until verification is ACTIVE. Open{" "}
//             <strong>KYC & Documents</strong> to review and Accept.
//           </p>
//         )}
//       </div>

//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
//         <div className="flex min-w-max border-b border-slate-200">
//           {(
//             [
//               ["overview", "Overview"],
//               ["documents", "KYC & Documents"],
//               ["modules", "Modules"],
//               ["activity", "Activity"],
//             ] as const
//           ).map(([key, label]) => (
//             <button
//               key={key}
//               type="button"
//               onClick={() => setActiveTab(key)}
//               className={`border-b-2 px-5 py-4 text-sm font-semibold ${
//                 activeTab === key
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
//         <div className="space-y-6">
//           <SectionCard title="Business Information">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               <InfoItem label="Business Name" value={vendor.businessName} />
//               <InfoItem label="Business Type" value={vendor.businessType} />
//               <InfoItem label="Owner Name" value={vendor.ownerName} />
//               <InfoItem label="Phone" value={vendor.phone} />
//               <InfoItem label="Email" value={vendor.email} />
//               <InfoItem label="Vendor ID" value={vendor.vendorId} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Location">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem
//                 label="State"
//                 value={`${vendor.stateName} (${vendor.stateId})`}
//               />
//               <InfoItem
//                 label="District"
//                 value={`${vendor.districtName} (${vendor.districtId})`}
//               />
//               <InfoItem label="Pincode" value={vendor.pincode} />
//               <InfoItem label="Address" value={vendor.address} />
//             </div>
//           </SectionCard>
//           <SectionCard title="Vendor Statistics">
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <StatCard
//                 label="Total Orders"
//                 value={vendor.totalOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Completed"
//                 value={vendor.completedOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Cancelled"
//                 value={vendor.cancelledOrders.toLocaleString("en-IN")}
//               />
//               <StatCard
//                 label="Rating"
//                 value={`${vendor.rating.toFixed(1)} / 5`}
//               />
//             </div>
//           </SectionCard>
//           <SectionCard title="Business Identifiers">
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <InfoItem label="GST Number" value={vendor.gstNumber} />
//               <InfoItem label="PAN Number" value={vendor.panNumber} />
//               <InfoItem
//                 label="Bank Account"
//                 value={
//                   vendor.bankAccountLast4 !== "—"
//                     ? `•••• ${vendor.bankAccountLast4}`
//                     : "—"
//                 }
//               />
//               <InfoItem label="IFSC" value={vendor.ifscCode} />
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "documents" && (
//         <div className="space-y-6">
//           <SectionCard title="Verification Status">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//               <span
//                 className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
//                   vendor.verificationStatus
//                 )}`}
//               >
//                 {vendor.verificationStatus}
//               </span>
//               <div className="flex flex-wrap gap-2">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setActionError("");
//                     setShowKycModal(true);
//                   }}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
//                 >
//                   Review documents
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setShowVerificationModal(true)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Set verification manually
//                 </button>
//               </div>
//             </div>
//           </SectionCard>
//           <SectionCard title="KYC & Documents">
//             {vendor.documents.length === 0 ? (
//               <p className="text-sm text-slate-500">
//                 No documents found in <code>vendor_documents</code> for this
//                 vendor. Confirm uploads exist under matching{" "}
//                 <code>vendorId</code> / <code>applicationId</code>.
//               </p>
//             ) : (
//               <div className="space-y-3">
//                 {vendor.documents.map((document) => (
//                   <div
//                     key={document.documentId}
//                     className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                   >
//                     <div className="min-w-0">
//                       <div className="flex flex-wrap items-center gap-2">
//                         <h3 className="text-sm font-bold text-slate-900">
//                           {formatDocType(document.documentType)}
//                         </h3>
//                         <span
//                           className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getDocumentClasses(
//                             document.status
//                           )}`}
//                         >
//                           {document.status}
//                         </span>
//                       </div>
//                       <p className="mt-2 break-all text-xs text-slate-500">
//                         {document.documentId}
//                         {document.fileName && document.fileName !== "—"
//                           ? ` · ${document.fileName}`
//                           : ""}
//                       </p>
//                       <p className="mt-1 text-xs text-slate-400">
//                         Uploaded: {document.uploadedAt}
//                       </p>
//                     </div>
//                     <div className="flex shrink-0 gap-2">
//                       {document.fileUrl ? (
//                         <>
//                           <button
//                             type="button"
//                             onClick={() => {
//                               setPreviewTitle(
//                                 formatDocType(document.documentType)
//                               );
//                               setPreviewUrl(document.fileUrl);
//                             }}
//                             className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
//                           >
//                             Preview
//                           </button>
//                           <a
//                             href={document.fileUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
//                           >
//                             Open
//                           </a>
//                         </>
//                       ) : (
//                         <span className="text-xs text-slate-400">
//                           No file URL
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </SectionCard>
//         </div>
//       )}

//       {activeTab === "modules" && (
//         <SectionCard title="Vendor Module Access">
//           {modulesList.length === 0 ? (
//             <p className="text-sm text-slate-500">No modules configured.</p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               {modulesList.map((module) => (
//                 <div
//                   key={String(module.moduleId)}
//                   className="rounded-xl border border-slate-200 p-5"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span
//                       className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {module.moduleId}
//                     </span>
//                     <span className="text-xs font-semibold text-slate-600">
//                       {module.status}
//                     </span>
//                   </div>
//                   <p className="mt-4 text-xs text-slate-500">Joined</p>
//                   <p className="mt-1 text-sm font-semibold">{module.joinedAt}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </SectionCard>
//       )}

//       {activeTab === "activity" && (
//         <SectionCard title="Account Timeline">
//           <div className="space-y-4 text-sm text-slate-700">
//             <p>Joined: {vendor.joinedAt}</p>
//             <p>Updated: {vendor.updatedAt}</p>
//             <p>Last active: {vendor.lastActiveAt}</p>
//             <p>
//               Orders: {vendor.totalOrders} · Completed: {vendor.completedOrders}{" "}
//               · Cancelled: {vendor.cancelledOrders}
//             </p>
//           </div>
//         </SectionCard>
//       )}

//       {/* KYC review modal */}
//       {showKycModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-start justify-between border-b border-slate-100 px-6 py-4">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   KYC & Documents
//                 </h2>
//                 <p className="mt-1 text-xs text-slate-500">
//                   {vendor.businessName} · Verification:{" "}
//                   <span className="font-semibold">
//                     {vendor.verificationStatus}
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
//               {vendor.documents.length === 0 ? (
//                 <p className="text-sm text-slate-500">
//                   No documents on record for this vendor.
//                 </p>
//               ) : (
//                 <div className="space-y-3">
//                   {vendor.documents.map((doc) => (
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
//                           {doc.fileName && doc.fileName !== "—"
//                             ? ` · ${doc.fileName}`
//                             : ""}
//                         </p>
//                         <p className="mt-1 text-xs text-slate-400">
//                           Uploaded: {doc.uploadedAt}
//                         </p>
//                       </div>
//                       <div className="flex shrink-0 items-center gap-2 sm:justify-end">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs font-semibold ${getDocumentClasses(
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
//                             className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
//                           >
//                             View
//                           </button>
//                         ) : null}
//                       </div>
//                     </div>
//                   ))}
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
//                 disabled={saving || vendor.verificationStatus === "REJECTED"}
//                 onClick={() => void handleRejectKyc()}
//                 className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Reject"}
//               </button>
//               <button
//                 type="button"
//                 disabled={saving || vendor.verificationStatus === "ACTIVE"}
//                 onClick={() => void handleAcceptKyc()}
//                 className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
//               >
//                 {saving ? "Saving…" : "Accept"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* File preview overlay */}
//       {previewUrl && (
//         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
//           <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
//             <div className="flex items-center justify-between border-b px-4 py-3">
//               <p className="text-sm font-semibold text-slate-800">
//                 {previewTitle || "Document"}
//               </p>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewUrl(null);
//                   setPreviewTitle("");
//                 }}
//                 className="rounded-lg px-2 py-1 text-lg text-slate-400 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="flex-1 overflow-auto bg-slate-50 p-2">
//               {previewUrl.match(/\.pdf($|\?)/i) ||
//               previewUrl.includes("application/pdf") ? (
//                 <iframe
//                   title={previewTitle}
//                   src={previewUrl}
//                   className="h-[70vh] w-full rounded-lg border-0 bg-white"
//                 />
//               ) : (
//                 // eslint-disable-next-line @next/next/no-img-element
//                 <img
//                   src={previewUrl}
//                   alt={previewTitle}
//                   className="mx-auto max-h-[70vh] max-w-full object-contain"
//                 />
//               )}
//             </div>
//             <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-3">
//               <a
//                 href={previewUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//               >
//                 Open in new tab
//               </a>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setPreviewUrl(null);
//                   setPreviewTitle("");
//                 }}
//                 className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showStatusModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Change Vendor Status</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Writes <code>status</code> + <code>accountStatus</code> to doc{" "}
//               <code>{writeId}</code>
//             </p>
//             {isVerificationBlockingActive(vendor.verificationStatus) && (
//               <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
//                 ACTIVE is blocked until verification is ACTIVE.
//               </p>
//             )}
//             <div className="mt-6 space-y-2">
//               {(
//                 ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
//               ).map((status) => {
//                 const blocked =
//                   status === "ACTIVE" &&
//                   isVerificationBlockingActive(vendor.verificationStatus);
//                 return (
//                   <button
//                     key={status}
//                     type="button"
//                     disabled={saving || blocked}
//                     onClick={() => void updateStatus(status)}
//                     className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-50 ${
//                       vendor.status === status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200"
//                     }`}
//                   >
//                     <span>
//                       {saving ? "Saving…" : status}
//                       {blocked ? " (blocked)" : ""}
//                     </span>
//                     {vendor.status === status && (
//                       <span className="text-orange-600">✓</span>
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowStatusModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       {showVerificationModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <h2 className="text-lg font-bold">Vendor Verification</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               DRAFT / PENDING / SUBMITTED / REJECTED force accountStatus =
//               INACTIVE
//             </p>
//             <div className="mt-6 space-y-2">
//               {(
//                 [
//                   "DRAFT",
//                   "SUBMITTED",
//                   "PENDING",
//                   "ACTIVE",
//                   "REJECTED",
//                 ] as VerificationStatus[]
//               ).map((status) => (
//                 <button
//                   key={status}
//                   type="button"
//                   disabled={saving}
//                   onClick={() => void updateVerification(status)}
//                   className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
//                     vendor.verificationStatus === status
//                       ? "border-orange-300 bg-orange-50"
//                       : "border-slate-200"
//                   }`}
//                 >
//                   {saving ? "Saving…" : status}
//                   {vendor.verificationStatus === status && (
//                     <span className="text-orange-600">✓</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowVerificationModal(false)}
//               disabled={saving}
//               className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
//         <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           <strong>Accept</strong> sets <code>verificationStatus</code> and{" "}
//           <code>kycStatus</code> to <code>ACTIVE</code> on{" "}
//           <code>{writeId}</code>, and marks documents in{" "}
//           <code>vendor_documents</code> as <code>VERIFIED</code>.
//         </p>
//       </div>
//     </div>
//   );
// }

// function QuickInfo({
//   label,
//   value,
//   badge = false,
//   badgeClass = "",
// }: {
//   label: string;
//   value: string;
//   badge?: boolean;
//   badgeClass?: string;
// }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       {badge ? (
//         <span
//           className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
//         >
//           {value}
//         </span>
//       ) : (
//         <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
//       )}
//     </div>
//   );
// }

// function SectionCard({
//   title,
//   children,
// }: {
//   title: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="rounded-xl bg-white p-6 shadow-sm">
//       <h2 className="text-base font-bold text-slate-900">{title}</h2>
//       <div className="mt-5">{children}</div>
//     </section>
//   );
// }

// function InfoItem({ label, value }: { label: string; value: string }) {
//   return (
//     <div>
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatCard({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
//       <p className="text-xs font-medium text-slate-500">{label}</p>
//       <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import {
  useVendor,
  type VendorDocument,
  type VendorModule,
  type VendorStatus,
  type VerificationStatus,
  type DocumentStatus,
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
  canManageNodeStatus,
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

function getVerificationClasses(status: VerificationStatus | DocumentStatus) {
  switch (String(status).toUpperCase()) {
    case "ACTIVE":
    case "VERIFIED":
      return "bg-green-100 text-green-700";
    case "PENDING":
    case "SUBMITTED":
      return "bg-yellow-100 text-yellow-700";
    case "REJECTED":
      return "bg-red-100 text-red-700";
    case "DRAFT":
      return "bg-slate-100 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getDocumentClasses(status: DocumentStatus) {
  return getVerificationClasses(status);
}

function getModuleClasses(moduleId: VendorModule) {
  switch (String(moduleId).toUpperCase()) {
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

function formatDocType(type: string) {
  return type
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function isImageUrl(url: string) {
  return (
    /\.(png|jpe?g|gif|webp|bmp|svg)(\?|$)/i.test(url) ||
    url.includes("image%") ||
    url.includes("image/")
  );
}

function isPdfUrl(url: string) {
  return /\.pdf(\?|$)/i.test(url) || url.includes("application/pdf");
}

function isRealDocumentId(id: string) {
  return Boolean(id && !id.startsWith("DOC-"));
}

export default function VendorDetailsPage() {
  const params = useParams();
  const vendorId = useMemo(() => {
    const value = params?.vendorId;
    if (Array.isArray(value)) return value[0] ?? "";
    return value ?? "";
  }, [params]);

  const auth = useAuthScope();
  const scopeFilter: HierarchyScopeFilter = {
    role: auth.role,
    stateId: auth.stateId,
    districtId: auth.districtId,
    isGlobalAdmin: auth.isGlobalAdmin,
  };

  const { vendor, loading, error, demoMode, refresh, setVendor } =
    useVendor(vendorId);

  const [activeTab, setActiveTab] = useState<
    "overview" | "documents" | "modules" | "activity"
  >("overview");
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showKycModal, setShowKycModal] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [docSavingId, setDocSavingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const writeId = vendor?.docId || vendor?.vendorId || vendorId;

  if (loading) {
    return (
      <div className="p-8 text-center text-sm text-slate-500">
        Loading vendor…
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-600">{error}</p>
        <Link
          href="/entity-management/vendors"
          className="mt-4 inline-block text-sm text-orange-600"
        >
          ← Back to vendors
        </Link>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">Vendor not found</p>
        <p className="mt-1 text-xs text-slate-500">
          No document in <code>vendors</code> for <code>{vendorId}</code>
          {demoMode ? " (demo mode)" : ""}.
        </p>
        <Link
          href="/entity-management/vendors"
          className="mt-4 inline-block text-sm font-semibold text-orange-600"
        >
          ← Back to vendors
        </Link>
      </div>
    );
  }

  const inScope =
    auth.isGlobalAdmin ||
    auth.role === "SUPER_ADMIN" ||
    auth.role === "TECHNICAL_ADMIN" ||
    (auth.role === "STATE_ADMIN" &&
      auth.stateId &&
      vendor.stateId === auth.stateId) ||
    (auth.role === "DISTRICT_ADMIN" &&
      auth.districtId &&
      vendor.districtId === auth.districtId) ||
    canManageNodeStatus(scopeFilter, {
      type: "VENDOR",
      id: vendor.vendorId,
      stateId: vendor.stateId,
      districtId: vendor.districtId,
    });

  if (!inScope) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm font-semibold text-slate-700">
          Outside your scope
        </p>
        <p className="mt-1 text-xs text-slate-500">
          This vendor is not in your state/district assignment.
        </p>
        <div className="mt-3 flex justify-center">
          <ScopeBadge />
        </div>
        <Link
          href="/entity-management/vendors"
          className="mt-4 inline-block text-sm font-semibold text-orange-600"
        >
          ← Back to vendors
        </Link>
      </div>
    );
  }

  async function updateStatus(newStatus: VendorStatus) {
    if (!vendor) return;
    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }
    if (
      newStatus === "ACTIVE" &&
      isVerificationBlockingActive(vendor.verificationStatus)
    ) {
      setSuccessMessage(
        `Cannot set ACTIVE while verification is ${vendor.verificationStatus}. Set verification to ACTIVE first.`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      return;
    }
    setSaving(true);
    try {
      const id = vendor.docId || vendor.vendorId;
      await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
        status: newStatus,
        accountStatus: newStatus,
      });
      setVendor({ ...vendor, status: newStatus, updatedAt: "Just now" });
      setShowStatusModal(false);
      setSuccessMessage(`accountStatus / status → ${newStatus} (saved · ${id})`);
      setTimeout(() => setSuccessMessage(""), 4000);
      await refresh();
    } catch (err) {
      console.error("updateStatus failed:", err);
      setSuccessMessage(
        err instanceof Error
          ? err.message
          : "Failed to update status. Check console / Firestore rules."
      );
      setTimeout(() => setSuccessMessage(""), 6000);
    } finally {
      setSaving(false);
    }
  }

  async function updateVerification(newStatus: VerificationStatus) {
    if (!vendor) return;
    if (isFirestoreDemoMode) {
      setSuccessMessage("Writes are disabled in demo mode.");
      setTimeout(() => setSuccessMessage(""), 3500);
      return;
    }
    setSaving(true);
    try {
      const id = vendor.docId || vendor.vendorId;
      const payload: Record<string, unknown> = {
        verificationStatus: newStatus,
        kycStatus: newStatus,
      };
      let nextAccountStatus = vendor.status;
      if (isVerificationBlockingActive(newStatus)) {
        payload.status = "INACTIVE";
        payload.accountStatus = "INACTIVE";
        nextAccountStatus = "INACTIVE";
      }
      await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, payload);
      setVendor({
        ...vendor,
        verificationStatus: newStatus,
        status: nextAccountStatus,
        updatedAt: "Just now",
      });
      setShowVerificationModal(false);
      const note = isVerificationBlockingActive(newStatus)
        ? ` Verification ${newStatus} → account forced INACTIVE.`
        : "";
      setSuccessMessage(`Verification → ${newStatus} (saved · ${id}).${note}`);
      setTimeout(() => setSuccessMessage(""), 5000);
      await refresh();
    } catch (err) {
      console.error("updateVerification failed:", err);
      setSuccessMessage(
        err instanceof Error
          ? err.message
          : "Failed to update verification. Check console / Firestore rules."
      );
      setTimeout(() => setSuccessMessage(""), 6000);
    } finally {
      setSaving(false);
    }
  }

  async function markDocumentsStatus(status: "VERIFIED" | "REJECTED") {
    if (!vendor) return;
    const docs = vendor.documents.filter((d) =>
      isRealDocumentId(d.documentId)
    );
    await Promise.all(
      docs.map((d) =>
        updateDocument(FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS, d.documentId, {
          reviewStatus: status,
          status,
          ...(status === "REJECTED" && rejectReason.trim()
            ? {
                reviewComment: rejectReason.trim(),
                rejectionReason: rejectReason.trim(),
              }
            : {}),
        }).catch((err) => {
          console.warn("Doc status update failed:", d.documentId, err);
        })
      )
    );
  }

  async function handleAcceptDocument(doc: VendorDocument) {
    if (!vendor) return;
    setActionError("");
    if (isFirestoreDemoMode) {
      setActionError("Writes are disabled in demo mode.");
      return;
    }
    if (!isRealDocumentId(doc.documentId)) {
      setActionError("This document has no Firestore id to update.");
      return;
    }

    setDocSavingId(doc.documentId);
    try {
      await updateDocument(
        FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
        doc.documentId,
        {
          reviewStatus: "VERIFIED",
          status: "VERIFIED",
        }
      );

      const nextDocs = vendor.documents.map((d) =>
        d.documentId === doc.documentId ? { ...d, status: "VERIFIED" } : d
      );
      setVendor({ ...vendor, documents: nextDocs, updatedAt: "Just now" });
      setSuccessMessage(
        `${formatDocType(doc.documentType)} accepted (VERIFIED).`
      );
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err) {
      console.error("handleAcceptDocument failed:", err);
      setActionError(
        err instanceof Error ? err.message : "Failed to accept document."
      );
    } finally {
      setDocSavingId(null);
    }
  }

  async function handleRejectDocument(doc: VendorDocument) {
    if (!vendor) return;
    setActionError("");
    if (isFirestoreDemoMode) {
      setActionError("Writes are disabled in demo mode.");
      return;
    }
    if (!isRealDocumentId(doc.documentId)) {
      setActionError("This document has no Firestore id to update.");
      return;
    }

    setDocSavingId(doc.documentId);
    try {
      await updateDocument(
        FIRESTORE_COLLECTIONS.VENDOR_DOCUMENTS,
        doc.documentId,
        {
          reviewStatus: "REJECTED",
          status: "REJECTED",
          ...(rejectReason.trim()
            ? {
                reviewComment: rejectReason.trim(),
                rejectionReason: rejectReason.trim(),
              }
            : {}),
        }
      );

      const nextDocs = vendor.documents.map((d) =>
        d.documentId === doc.documentId ? { ...d, status: "REJECTED" } : d
      );
      setVendor({ ...vendor, documents: nextDocs, updatedAt: "Just now" });
      setSuccessMessage(
        `${formatDocType(doc.documentType)} rejected.`
      );
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err) {
      console.error("handleRejectDocument failed:", err);
      setActionError(
        err instanceof Error ? err.message : "Failed to reject document."
      );
    } finally {
      setDocSavingId(null);
    }
  }

  async function handleAcceptKyc() {
    if (!vendor) return;
    setActionError("");
    if (isFirestoreDemoMode) {
      setActionError("Writes are disabled in demo mode.");
      return;
    }
    setSaving(true);
    try {
      const id = vendor.docId || vendor.vendorId;
      await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
        verificationStatus: "ACTIVE",
        kycStatus: "ACTIVE",
      });
      await markDocumentsStatus("VERIFIED");
      const nextDocs: VendorDocument[] = vendor.documents.map((d) => ({
        ...d,
        status: "VERIFIED",
      }));
      setVendor({
        ...vendor,
        verificationStatus: "ACTIVE",
        documents: nextDocs,
        updatedAt: "Just now",
      });
      setShowKycModal(false);
      setSuccessMessage(
        `KYC accepted — verificationStatus=ACTIVE (saved · ${id}).`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      await refresh();
    } catch (err) {
      console.error("handleAcceptKyc failed:", err);
      setActionError(
        err instanceof Error ? err.message : "Failed to accept KYC."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleRejectKyc() {
    if (!vendor) return;
    setActionError("");
    if (isFirestoreDemoMode) {
      setActionError("Writes are disabled in demo mode.");
      return;
    }
    setSaving(true);
    try {
      const id = vendor.docId || vendor.vendorId;
      await updateDocument(FIRESTORE_COLLECTIONS.VENDORS, id, {
        verificationStatus: "REJECTED",
        kycStatus: "REJECTED",
        status: "INACTIVE",
        accountStatus: "INACTIVE",
        ...(rejectReason.trim()
          ? { rejectionReason: rejectReason.trim() }
          : {}),
      });
      await markDocumentsStatus("REJECTED");
      const nextDocs: VendorDocument[] = vendor.documents.map((d) => ({
        ...d,
        status: "REJECTED",
      }));
      setVendor({
        ...vendor,
        verificationStatus: "REJECTED",
        status: "INACTIVE",
        documents: nextDocs,
        updatedAt: "Just now",
      });
      setShowKycModal(false);
      setRejectReason("");
      setSuccessMessage(
        `KYC rejected — verificationStatus=REJECTED, account INACTIVE (saved · ${id}).`
      );
      setTimeout(() => setSuccessMessage(""), 5000);
      await refresh();
    } catch (err) {
      console.error("handleRejectKyc failed:", err);
      setActionError(
        err instanceof Error ? err.message : "Failed to reject KYC."
      );
    } finally {
      setSaving(false);
    }
  }

  const modulesList =
    vendor.moduleDetails.length > 0
      ? vendor.moduleDetails
      : vendor.modules.map((m) => ({
          moduleId: m,
          status: "ACTIVE" as const,
          joinedAt: "—",
        }));

  function renderDocumentRow(document: VendorDocument, compact = false) {
    const busy = docSavingId === document.documentId;
    const statusUpper = String(document.status).toUpperCase();
    const canAccept = statusUpper !== "VERIFIED" && statusUpper !== "ACTIVE";
    const canReject = statusUpper !== "REJECTED";

    return (
      <div
        key={document.documentId}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-md"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900">
                {formatDocType(document.documentType)}
              </h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getDocumentClasses(
                  document.status
                )}`}
              >
                {document.status}
              </span>
            </div>
            <p className="mt-1.5 break-all text-xs text-slate-500">
              {document.documentId}
              {document.fileName && document.fileName !== "—"
                ? ` · ${document.fileName}`
                : ""}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Uploaded: {document.uploadedAt}
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {document.fileUrl ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewTitle(formatDocType(document.documentType));
                    setPreviewUrl(document.fileUrl);
                  }}
                  className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700 transition hover:bg-orange-100"
                >
                  View
                </button>
                {!compact && (
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
                  >
                    Open
                  </a>
                )}
              </>
            ) : (
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-medium text-slate-400">
                No file URL
              </span>
            )}

            <button
              type="button"
              disabled={busy || saving || !canAccept}
              onClick={() => void handleAcceptDocument(document)}
              className="rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "…" : "Accept"}
            </button>
            <button
              type="button"
              disabled={busy || saving || !canReject}
              onClick={() => void handleRejectDocument(document)}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? "…" : "Reject"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/entity-management"
          className="text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          Entity Management
        </Link>
        <span className="text-slate-400">/</span>
        <Link
          href="/entity-management/vendors"
          className="text-sm font-medium text-slate-500 hover:text-orange-600"
        >
          Vendors
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-sm text-slate-700">{vendor.vendorId}</span>
        <ScopeBadge />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-xl font-bold text-orange-600">
              {vendor.businessName
                .split(" ")
                .map((w) => w.charAt(0))
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900">
                  {vendor.businessName}
                </h1>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                    vendor.status
                  )}`}
                >
                  {vendor.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Vendor ID: {vendor.vendorId}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Firestore doc: {writeId}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Owner: {vendor.ownerName}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => void refresh()}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={() => {
                setActionError("");
                setShowKycModal(true);
              }}
              className="rounded-lg border border-orange-300 bg-orange-50 px-4 py-2.5 text-sm font-semibold text-orange-700 transition hover:bg-orange-100"
            >
              KYC & Documents
            </button>
            <button
              type="button"
              onClick={() => setShowVerificationModal(true)}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
            >
              Verification
            </button>
            <button
              type="button"
              onClick={() => setShowStatusModal(true)}
              className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
            >
              Change Status
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <QuickInfo
            label="Verification"
            value={vendor.verificationStatus}
            badge
            badgeClass={getVerificationClasses(vendor.verificationStatus)}
          />
          <QuickInfo
            label="Location"
            value={`${vendor.districtName}, ${vendor.stateName}`}
          />
          <QuickInfo
            label="Rating"
            value={`${vendor.rating.toFixed(1)} / 5`}
          />
          <QuickInfo label="Last Active" value={vendor.lastActiveAt} />
        </div>

        {isVerificationBlockingActive(vendor.verificationStatus) && (
          <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Verification is <strong>{vendor.verificationStatus}</strong> —
            account cannot be ACTIVE until verification is ACTIVE. Open{" "}
            <strong>KYC & Documents</strong> to review and Accept.
          </p>
        )}
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      <div className="mb-6 overflow-x-auto rounded-xl bg-white shadow-sm">
        <div className="flex min-w-max border-b border-slate-200">
          {(
            [
              ["overview", "Overview"],
              ["documents", "KYC & Documents"],
              ["modules", "Modules"],
              ["activity", "Activity"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`border-b-2 px-5 py-4 text-sm font-semibold ${
                activeTab === key
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
        <div className="space-y-6">
          <SectionCard title="Business Information">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Business Name" value={vendor.businessName} />
              <InfoItem label="Business Type" value={vendor.businessType} />
              <InfoItem label="Owner Name" value={vendor.ownerName} />
              <InfoItem label="Phone" value={vendor.phone} />
              <InfoItem label="Email" value={vendor.email} />
              <InfoItem label="Vendor ID" value={vendor.vendorId} />
            </div>
          </SectionCard>
          <SectionCard title="Business Location">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                label="State"
                value={`${vendor.stateName} (${vendor.stateId})`}
              />
              <InfoItem
                label="District"
                value={`${vendor.districtName} (${vendor.districtId})`}
              />
              <InfoItem label="Pincode" value={vendor.pincode} />
              <InfoItem label="Address" value={vendor.address} />
            </div>
          </SectionCard>
          <SectionCard title="Vendor Statistics">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Total Orders"
                value={vendor.totalOrders.toLocaleString("en-IN")}
              />
              <StatCard
                label="Completed"
                value={vendor.completedOrders.toLocaleString("en-IN")}
              />
              <StatCard
                label="Cancelled"
                value={vendor.cancelledOrders.toLocaleString("en-IN")}
              />
              <StatCard
                label="Rating"
                value={`${vendor.rating.toFixed(1)} / 5`}
              />
            </div>
          </SectionCard>
          <SectionCard title="Business Identifiers">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem label="GST Number" value={vendor.gstNumber} />
              <InfoItem label="PAN Number" value={vendor.panNumber} />
              <InfoItem
                label="Bank Account"
                value={
                  vendor.bankAccountLast4 !== "—"
                    ? `•••• ${vendor.bankAccountLast4}`
                    : "—"
                }
              />
              <InfoItem label="IFSC" value={vendor.ifscCode} />
            </div>
          </SectionCard>
        </div>
      )}

      {activeTab === "documents" && (
        <div className="space-y-6">
          <SectionCard title="Verification Status">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getVerificationClasses(
                  vendor.verificationStatus
                )}`}
              >
                {vendor.verificationStatus}
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActionError("");
                    setShowKycModal(true);
                  }}
                  className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Review documents
                </button>
                <button
                  type="button"
                  onClick={() => setShowVerificationModal(true)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Set verification manually
                </button>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="KYC & Documents">
            {vendor.documents.length === 0 ? (
              <p className="text-sm text-slate-500">
                No documents found in <code>vendor_documents</code> for this
                vendor.
              </p>
            ) : (
              <div className="space-y-3">
                {vendor.documents.map((document) =>
                  renderDocumentRow(document)
                )}
              </div>
            )}
          </SectionCard>
        </div>
      )}

      {activeTab === "modules" && (
        <SectionCard title="Vendor Module Access">
          {modulesList.length === 0 ? (
            <p className="text-sm text-slate-500">No modules configured.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {modulesList.map((module) => (
                <div
                  key={String(module.moduleId)}
                  className="rounded-xl border border-slate-200 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold ${getModuleClasses(
                        module.moduleId
                      )}`}
                    >
                      {module.moduleId}
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      {module.status}
                    </span>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Joined</p>
                  <p className="mt-1 text-sm font-semibold">{module.joinedAt}</p>
                </div>
              ))}
            </div>
          )}
        </SectionCard>
      )}

      {activeTab === "activity" && (
        <SectionCard title="Account Timeline">
          <div className="space-y-4 text-sm text-slate-700">
            <p>Joined: {vendor.joinedAt}</p>
            <p>Updated: {vendor.updatedAt}</p>
            <p>Last active: {vendor.lastActiveAt}</p>
            <p>
              Orders: {vendor.totalOrders} · Completed: {vendor.completedOrders}{" "}
              · Cancelled: {vendor.cancelledOrders}
            </p>
          </div>
        </SectionCard>
      )}

      {/* KYC review modal — captain-style CSS + per-document Accept */}
      {showKycModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-4">
          <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wide text-orange-600">
                  Review queue
                </p>
                <h2 className="mt-0.5 text-lg font-bold text-slate-900">
                  KYC & Documents
                </h2>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {vendor.businessName}
                  <span className="mx-1.5 text-slate-300">·</span>
                  Verification:{" "}
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${getVerificationClasses(
                      vendor.verificationStatus
                    )}`}
                  >
                    {vendor.verificationStatus}
                  </span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowKycModal(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-lg leading-none text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Uploaded files
                </p>
                <p className="text-xs text-slate-400">
                  {vendor.documents.length} document
                  {vendor.documents.length === 1 ? "" : "s"}
                </p>
              </div>

              {vendor.documents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    No documents on record
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Nothing found in <code>vendor_documents</code> for this
                    vendor.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {vendor.documents.map((doc) =>
                    renderDocumentRow(doc, true)
                  )}
                </div>
              )}

              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Reject reason{" "}
                  <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows={2}
                  placeholder="Used when rejecting a document or full KYC…"
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {actionError && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
                  <p className="text-sm text-red-700">{actionError}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={() => setShowKycModal(false)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Close
              </button>
              <button
                type="button"
                disabled={saving || vendor.verificationStatus === "REJECTED"}
                onClick={() => void handleRejectKyc()}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Reject all"}
              </button>
              <button
                type="button"
                disabled={saving || vendor.verificationStatus === "ACTIVE"}
                onClick={() => void handleAcceptKyc()}
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving…" : "Accept all"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* File preview overlay */}
      {previewUrl && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-3 sm:p-4">
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
              <p className="truncate text-sm font-bold text-slate-900">
                {previewTitle || "Document"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setPreviewTitle("");
                }}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-lg leading-none text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                aria-label="Close preview"
              >
                ×
              </button>
            </div>
            <div className="min-h-[280px] flex-1 overflow-auto bg-slate-100 p-3">
              {isImageUrl(previewUrl) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt={previewTitle}
                  className="mx-auto max-h-[70vh] max-w-full rounded-lg object-contain shadow-sm"
                />
              ) : (
                <iframe
                  title={previewTitle}
                  src={previewUrl}
                  className="h-[70vh] w-full rounded-lg border border-slate-200 bg-white"
                />
              )}
            </div>
            <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 px-4 py-3">
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Open in new tab
              </a>
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setPreviewTitle("");
                }}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Change Vendor Status</h2>
            <p className="mt-1 text-xs text-slate-500">
              Writes <code>status</code> + <code>accountStatus</code> to doc{" "}
              <code>{writeId}</code>
            </p>
            {isVerificationBlockingActive(vendor.verificationStatus) && (
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                ACTIVE is blocked until verification is ACTIVE.
              </p>
            )}
            <div className="mt-6 space-y-2">
              {(
                ["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as VendorStatus[]
              ).map((status) => {
                const blocked =
                  status === "ACTIVE" &&
                  isVerificationBlockingActive(vendor.verificationStatus);
                return (
                  <button
                    key={status}
                    type="button"
                    disabled={saving || blocked}
                    onClick={() => void updateStatus(status)}
                    className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-50 ${
                      vendor.status === status
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200"
                    }`}
                  >
                    <span>
                      {saving ? "Saving…" : status}
                      {blocked ? " (blocked)" : ""}
                    </span>
                    {vendor.status === status && (
                      <span className="text-orange-600">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              disabled={saving}
              className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {showVerificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold">Vendor Verification</h2>
            <p className="mt-1 text-xs text-slate-500">
              DRAFT / PENDING / SUBMITTED / REJECTED force accountStatus =
              INACTIVE
            </p>
            <div className="mt-6 space-y-2">
              {(
                [
                  "DRAFT",
                  "SUBMITTED",
                  "PENDING",
                  "ACTIVE",
                  "REJECTED",
                ] as VerificationStatus[]
              ).map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={saving}
                  onClick={() => void updateVerification(status)}
                  className={`flex w-full justify-between rounded-lg border p-4 text-left text-sm font-semibold disabled:opacity-60 ${
                    vendor.verificationStatus === status
                      ? "border-orange-300 bg-orange-50"
                      : "border-slate-200"
                  }`}
                >
                  {saving ? "Saving…" : status}
                  {vendor.verificationStatus === status && (
                    <span className="text-orange-600">✓</span>
                  )}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setShowVerificationModal(false)}
              disabled={saving}
              className="mt-5 w-full rounded-lg border border-slate-300 py-2.5 text-sm font-semibold disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          Per-document <strong>Accept</strong> sets that row in{" "}
          <code>vendor_documents</code> to <code>VERIFIED</code>. Footer{" "}
          <strong>Accept all KYC</strong> also sets vendor{" "}
          <code>verificationStatus</code> / <code>kycStatus</code> to{" "}
          <code>ACTIVE</code> on <code>{writeId}</code>.
        </p>
      </div>
    </div>
  );
}

function QuickInfo({
  label,
  value,
  badge = false,
  badgeClass = "",
}: {
  label: string;
  value: string;
  badge?: boolean;
  badgeClass?: string;
}) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      {badge ? (
        <span
          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
      )}
    </div>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}