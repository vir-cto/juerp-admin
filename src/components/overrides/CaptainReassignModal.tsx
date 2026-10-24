// "use client";

// import {
//   FormEvent,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// export type CaptainReassignEntityType =
//   | "ORDER"
//   | "RIDE"
//   | "DELIVERY";

// export type CaptainReassignReason =
//   | "CAPTAIN_UNAVAILABLE"
//   | "CAPTAIN_REJECTED"
//   | "CAPTAIN_TIMEOUT"
//   | "CUSTOMER_REQUEST"
//   | "SERVICE_ISSUE"
//   | "SYSTEM_ISSUE"
//   | "EMERGENCY"
//   | "OTHER";

// export type CaptainReassignRequestStatus =
//   | "PENDING"
//   | "APPROVED"
//   | "REJECTED"
//   | "EXECUTED";

// export interface CaptainReassignTarget {
//   entityId: string;

//   entityType: CaptainReassignEntityType;

//   moduleId:
//     | "JUCART"
//     | "JURIDE"
//     | "JUSTAY"
//     | "JUHOME"
//     | "JUSHOPPING";

//   currentCaptainId: string;

//   currentCaptainName: string;

//   currentCaptainPhone?: string;

//   currentStatus: string;

//   customerId?: string;

//   customerName?: string;

//   vendorId?: string;

//   vendorName?: string;

//   amountPaise?: number;
// }

// export interface ReassignCaptain {
//   captainId: string;

//   name: string;

//   phone?: string;

//   vehicleType?: string;

//   vehicleNumber?: string;

//   serviceId?: string;

//   onlineStatus:
//     | "ONLINE"
//     | "OFFLINE";

//   availability:
//     | "AVAILABLE"
//     | "BUSY"
//     | "BLOCKED";

//   distanceKm?: number;

//   rating?: number;

//   completedTrips?: number;
// }

// export interface CaptainReassignRequest {
//   entityId: string;

//   entityType: CaptainReassignEntityType;

//   moduleId:
//     | "JUCART"
//     | "JURIDE"
//     | "JUSTAY"
//     | "JUHOME"
//     | "JUSHOPPING";

//   currentCaptainId: string;

//   newCaptainId: string;

//   reason: CaptainReassignReason;

//   reasonText: string;

//   notifyCurrentCaptain: boolean;

//   notifyNewCaptain: boolean;

//   requestStatus: CaptainReassignRequestStatus;
// }

// interface CaptainReassignModalProps {
//   isOpen: boolean;

//   target: CaptainReassignTarget | null;

//   availableCaptains?: ReassignCaptain[];

//   onClose: () => void;

//   onSubmit?: (
//     request: CaptainReassignRequest
//   ) => void | Promise<void>;

//   loading?: boolean;

//   captainsLoading?: boolean;

//   readOnly?: boolean;

//   title?: string;

//   submitLabel?: string;
// }

// const REASON_OPTIONS: Array<{
//   value: CaptainReassignReason;
//   label: string;
// }> = [
//   {
//     value: "CAPTAIN_UNAVAILABLE",
//     label: "Captain Unavailable",
//   },
//   {
//     value: "CAPTAIN_REJECTED",
//     label: "Captain Rejected Assignment",
//   },
//   {
//     value: "CAPTAIN_TIMEOUT",
//     label: "Captain Assignment Timeout",
//   },
//   {
//     value: "CUSTOMER_REQUEST",
//     label: "Customer Request",
//   },
//   {
//     value: "SERVICE_ISSUE",
//     label: "Service Issue",
//   },
//   {
//     value: "SYSTEM_ISSUE",
//     label: "System Issue",
//   },
//   {
//     value: "EMERGENCY",
//     label: "Emergency",
//   },
//   {
//     value: "OTHER",
//     label: "Other",
//   },
// ];

// const MODULE_LABELS: Record<
//   CaptainReassignTarget["moduleId"],
//   string
// > = {
//   JUCART: "JuCart",
//   JURIDE: "JuRide",
//   JUSTAY: "JuStay",
//   JUHOME: "JuHome",
//   JUSHOPPING: "JuShopping",
// };

// const ENTITY_LABELS: Record<
//   CaptainReassignEntityType,
//   string
// > = {
//   ORDER: "Order",
//   RIDE: "Ride",
//   DELIVERY: "Delivery",
// };

// export default function CaptainReassignModal({
//   isOpen,
//   target,
//   availableCaptains = [],
//   onClose,
//   onSubmit,
//   loading = false,
//   captainsLoading = false,
//   readOnly = false,
//   title = "Reassign Captain",
//   submitLabel = "Submit Reassignment",
// }: CaptainReassignModalProps) {
//   const [
//     selectedCaptainId,
//     setSelectedCaptainId,
//   ] = useState("");

//   const [
//     reason,
//     setReason,
//   ] = useState<CaptainReassignReason>(
//     "CAPTAIN_UNAVAILABLE"
//   );

//   const [
//     reasonText,
//     setReasonText,
//   ] = useState("");

//   const [
//     notifyCurrentCaptain,
//     setNotifyCurrentCaptain,
//   ] = useState(true);

//   const [
//     notifyNewCaptain,
//     setNotifyNewCaptain,
//   ] = useState(true);

//   const [
//     error,
//     setError,
//   ] = useState("");

//   const [
//     search,
//     setSearch,
//   ] = useState("");

//   useEffect(() => {
//     if (!isOpen) {
//       return;
//     }

//     setSelectedCaptainId("");

//     setReason(
//       "CAPTAIN_UNAVAILABLE"
//     );

//     setReasonText("");

//     setNotifyCurrentCaptain(
//       true
//     );

//     setNotifyNewCaptain(
//       true
//     );

//     setSearch("");

//     setError("");
//   }, [
//     isOpen,
//     target?.entityId,
//   ]);

//   const filteredCaptains =
//     useMemo(() => {
//       const normalized =
//         search
//           .trim()
//           .toLowerCase();

//       return availableCaptains
//         .filter(
//           (captain) =>
//             captain.captainId !==
//             target?.currentCaptainId
//         )
//         .filter(
//           (captain) =>
//             captain.availability !==
//             "BLOCKED"
//         )
//         .filter(
//           (captain) =>
//             !normalized ||
//             captain.name
//               .toLowerCase()
//               .includes(
//                 normalized
//               ) ||
//             captain.captainId
//               .toLowerCase()
//               .includes(
//                 normalized
//               ) ||
//             captain.phone
//               ?.toLowerCase()
//               .includes(
//                 normalized
//               )
//         );
//     }, [
//       availableCaptains,
//       search,
//       target?.currentCaptainId,
//     ]);

//   const selectedCaptain =
//     availableCaptains.find(
//       (captain) =>
//         captain.captainId ===
//         selectedCaptainId
//     );

//   if (
//     !isOpen ||
//     !target
//   ) {
//     return null;
//   }

//   const canSubmit =
//     !readOnly &&
//     !loading &&
//     !captainsLoading &&
//     Boolean(
//       selectedCaptainId
//     );

//   function handleClose() {
//     if (loading) {
//       return;
//     }

//     onClose();
//   }

//   async function handleSubmit(
//     event: FormEvent<HTMLFormElement>
//   ) {
//     event.preventDefault();

//     setError("");

//     if (readOnly) {
//       return;
//     }

//     if (!selectedCaptainId) {
//       setError(
//         "Please select a captain for reassignment."
//       );
//       return;
//     }

//     if (
//       selectedCaptainId ===
//       target.currentCaptainId
//     ) {
//       setError(
//         "The new captain must be different from the current captain."
//       );
//       return;
//     }

//     if (
//       reasonText.trim().length <
//       5
//     ) {
//       setError(
//         "Please provide a clear reassignment reason with at least 5 characters."
//       );
//       return;
//     }

//     const captain =
//       availableCaptains.find(
//         (item) =>
//           item.captainId ===
//           selectedCaptainId
//       );

//     if (!captain) {
//       setError(
//         "The selected captain is no longer available."
//       );
//       return;
//     }

//     if (
//       captain.availability ===
//       "BLOCKED"
//     ) {
//       setError(
//         "The selected captain is blocked and cannot be assigned."
//       );
//       return;
//     }

//     const request: CaptainReassignRequest =
//       {
//         entityId:
//           target.entityId,

//         entityType:
//           target.entityType,

//         moduleId:
//           target.moduleId,

//         currentCaptainId:
//           target.currentCaptainId,

//         newCaptainId:
//           selectedCaptainId,

//         reason,

//         reasonText:
//           reasonText.trim(),

//         notifyCurrentCaptain,

//         notifyNewCaptain,

//         requestStatus:
//           "PENDING",
//       };

//     try {
//       await onSubmit?.(
//         request
//       );
//     } catch (submitError) {
//       setError(
//         submitError instanceof
//           Error
//           ? submitError.message
//           : "Unable to submit the captain reassignment request."
//       );
//     }
//   }

//   return (
//     <div
//       className="fixed inset-0 z-[170] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
//       role="dialog"
//       aria-modal="true"
//       aria-labelledby="captain-reassign-modal-title"
//       onMouseDown={(
//         event
//       ) => {
//         if (
//           event.target ===
//           event.currentTarget
//         ) {
//           handleClose();
//         }
//       }}
//     >
//       <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

//         {/* HEADER */}

//         <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">

//           <div className="flex min-w-0 items-center gap-3">

//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
//               <ReassignIcon />
//             </div>

//             <div className="min-w-0">

//               <h2
//                 id="captain-reassign-modal-title"
//                 className="text-base font-black text-slate-900"
//               >
//                 {title}
//               </h2>

//               <p className="mt-1 text-[9px] leading-4 text-slate-500">
//                 Select an eligible captain for this
//                 dispatch override.
//               </p>

//             </div>

//           </div>

//           <button
//             type="button"
//             onClick={
//               handleClose
//             }
//             disabled={
//               loading
//             }
//             aria-label="Close modal"
//             className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             ×
//           </button>

//         </div>

//         {/* FORM */}

//         <form
//           onSubmit={
//             handleSubmit
//           }
//           className="min-h-0 flex-1 overflow-y-auto"
//         >
//           <div className="space-y-5 px-5 py-5 sm:px-6">

//             {/* ENTITY */}

//             <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">

//               <div className="flex items-start gap-3">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
//                   <EntityIcon
//                     type={
//                       target.entityType
//                     }
//                   />
//                 </div>

//                 <div className="min-w-0 flex-1">

//                   <div className="flex flex-wrap items-center gap-2">

//                     <p className="font-mono text-[10px] font-black text-slate-800">
//                       {
//                         target.entityId
//                       }
//                     </p>

//                     <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-blue-700">
//                       {
//                         ENTITY_LABELS[
//                           target.entityType
//                         ]
//                       }
//                     </span>

//                     <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-orange-700">
//                       {
//                         MODULE_LABELS[
//                           target.moduleId
//                         ]
//                       }
//                     </span>

//                   </div>

//                   <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">

//                     <InfoItem
//                       label="Customer"
//                       value={
//                         target.customerName ||
//                         target.customerId ||
//                         "—"
//                       }
//                     />

//                     <InfoItem
//                       label="Vendor"
//                       value={
//                         target.vendorName ||
//                         target.vendorId ||
//                         "—"
//                       }
//                     />

//                     <InfoItem
//                       label="Current Status"
//                       value={
//                         target.currentStatus
//                       }
//                     />

//                   </div>

//                 </div>

//               </div>

//             </div>

//             {/* CURRENT CAPTAIN */}

//             <div>

//               <FieldLabel>
//                 Current Captain
//               </FieldLabel>

//               <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">

//                 <div className="flex items-center gap-3">

//                   <CaptainAvatar
//                     name={
//                       target.currentCaptainName
//                     }
//                   />

//                   <div className="min-w-0 flex-1">

//                     <p className="truncate text-[10px] font-black text-slate-800">
//                       {
//                         target.currentCaptainName
//                       }
//                     </p>

//                     <p className="mt-1 font-mono text-[7px] text-slate-400">
//                       {
//                         target.currentCaptainId
//                       }
//                     </p>

//                     {target.currentCaptainPhone && (
//                       <p className="mt-1 text-[8px] text-slate-500">
//                         {
//                           target.currentCaptainPhone
//                         }
//                       </p>
//                     )}

//                   </div>

//                   <span className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[7px] font-black uppercase text-amber-700">
//                     Current
//                   </span>

//                 </div>

//               </div>

//             </div>

//             {/* SEARCH */}

//             <div>

//               <div className="flex items-center justify-between gap-3">

//                 <FieldLabel>
//                   Select New Captain
//                 </FieldLabel>

//                 <span className="text-[7px] font-bold text-slate-400">
//                   {
//                     filteredCaptains.length
//                   }{" "}
//                   eligible
//                 </span>

//               </div>

//               <div className="relative mt-2">

//                 <SearchIcon />

//                 <input
//                   type="text"
//                   value={
//                     search
//                   }
//                   onChange={(
//                     event
//                   ) =>
//                     setSearch(
//                       event
//                         .target
//                         .value
//                     )
//                   }
//                   disabled={
//                     readOnly ||
//                     loading ||
//                     captainsLoading
//                   }
//                   placeholder="Search captain by name, ID or phone..."
//                   className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-[9px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
//                 />

//               </div>

//             </div>

//             {/* CAPTAIN LIST */}

//             <div className="rounded-xl border border-slate-200 bg-slate-50/50">

//               {captainsLoading ? (
//                 <CaptainListLoading />
//               ) : filteredCaptains.length ===
//                 0 ? (
//                 <EmptyCaptainState
//                   search={
//                     search
//                   }
//                 />
//               ) : (
//                 <div className="max-h-[270px] space-y-2 overflow-y-auto p-2">

//                   {filteredCaptains.map(
//                     (
//                       captain
//                     ) => {
//                       const selected =
//                         captain.captainId ===
//                         selectedCaptainId;

//                       return (
//                         <CaptainOption
//                           key={
//                             captain.captainId
//                           }
//                           captain={
//                             captain
//                           }
//                           selected={
//                             selected
//                           }
//                           disabled={
//                             readOnly ||
//                             loading
//                           }
//                           onSelect={() =>
//                             setSelectedCaptainId(
//                               captain.captainId
//                             )
//                           }
//                         />
//                       );
//                     }
//                   )}

//                 </div>
//               )}

//             </div>

//             {/* SELECTED CAPTAIN SUMMARY */}

//             {selectedCaptain && (
//               <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-3">

//                 <div className="flex items-center gap-3">

//                   <CaptainAvatar
//                     name={
//                       selectedCaptain.name
//                     }
//                   />

//                   <div className="min-w-0 flex-1">

//                     <p className="text-[9px] font-black text-blue-900">
//                       New Captain
//                     </p>

//                     <p className="mt-1 truncate text-[10px] font-black text-slate-800">
//                       {
//                         selectedCaptain.name
//                       }
//                     </p>

//                     <p className="mt-1 font-mono text-[7px] text-slate-500">
//                       {
//                         selectedCaptain.captainId
//                       }
//                     </p>

//                   </div>

//                   <span className="rounded-full border border-green-200 bg-green-50 px-2 py-1 text-[7px] font-black uppercase text-green-700">
//                     {
//                       selectedCaptain.availability
//                     }
//                   </span>

//                 </div>

//               </div>
//             )}

//             {/* REASON */}

//             <div>

//               <FieldLabel>
//                 Reassignment Reason
//               </FieldLabel>

//               <select
//                 value={
//                   reason
//                 }
//                 onChange={(
//                   event
//                 ) =>
//                   setReason(
//                     event
//                       .target
//                       .value as CaptainReassignReason
//                   )
//                 }
//                 disabled={
//                   readOnly ||
//                   loading
//                 }
//                 className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
//               >
//                 {REASON_OPTIONS.map(
//                   (option) => (
//                     <option
//                       key={
//                         option.value
//                       }
//                       value={
//                         option.value
//                       }
//                     >
//                       {
//                         option.label
//                       }
//                     </option>
//                   )
//                 )}
//               </select>

//             </div>

//             {/* REASON DETAILS */}

//             <div>

//               <div className="flex items-center justify-between">

//                 <FieldLabel>
//                   Reason Details
//                 </FieldLabel>

//                 <span className="text-[7px] text-slate-400">
//                   {
//                     reasonText.length
//                   }
//                   /500
//                 </span>

//               </div>

//               <textarea
//                 value={
//                   reasonText
//                 }
//                 onChange={(
//                   event
//                 ) => {
//                   if (
//                     event.target
//                       .value
//                       .length <=
//                     500
//                   ) {
//                     setReasonText(
//                       event
//                         .target
//                         .value
//                     );
//                   }
//                 }}
//                 disabled={
//                   readOnly ||
//                   loading
//                 }
//                 rows={3}
//                 placeholder="Explain why the captain needs to be reassigned..."
//                 className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
//               />

//             </div>

//             {/* NOTIFICATIONS */}

//             <div>

//               <FieldLabel>
//                 Notifications
//               </FieldLabel>

//               <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">

//                 <NotificationOption
//                   checked={
//                     notifyCurrentCaptain
//                   }
//                   disabled={
//                     readOnly ||
//                     loading
//                   }
//                   onChange={
//                     setNotifyCurrentCaptain
//                   }
//                   title="Current Captain"
//                   description="Notify about reassignment"
//                 />

//                 <NotificationOption
//                   checked={
//                     notifyNewCaptain
//                   }
//                   disabled={
//                     readOnly ||
//                     loading
//                   }
//                   onChange={
//                     setNotifyNewCaptain
//                   }
//                   title="New Captain"
//                   description="Notify about new assignment"
//                 />

//               </div>

//             </div>

//             {/* ERROR */}

//             {error && (
//               <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

//                 <div className="flex items-start gap-2">

//                   <WarningIcon />

//                   <p className="text-[9px] font-bold leading-4 text-red-700">
//                     {error}
//                   </p>

//                 </div>

//               </div>
//             )}

//             {/* GOVERNANCE */}

//             <div className="rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">

//               <div className="flex items-start gap-2">

//                 <div className="mt-0.5 shrink-0 text-orange-600">
//                   <ShieldIcon />
//                 </div>

//                 <div>

//                   <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
//                     Protected Dispatch Override
//                   </p>

//                   <p className="mt-1 text-[8px] leading-4 text-orange-700">
//                     Captain reassignment is an
//                     exceptional administrative action.
//                     The trusted backend must validate
//                     administrator role and scope,
//                     captain service eligibility,
//                     availability, assignment state,
//                     authorization, correlationId and
//                     idempotencyKey before changing the
//                     authoritative assignment.
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//           {/* FOOTER */}

//           <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">

//             <button
//               type="button"
//               onClick={
//                 handleClose
//               }
//               disabled={
//                 loading
//               }
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[9px] font-black text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={
//                 !canSubmit
//               }
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-[9px] font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {loading ? (
//                 <>
//                   <Spinner />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <ReassignIcon />
//                   {
//                     submitLabel
//                   }
//                 </>
//               )}
//             </button>

//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CAPTAIN OPTION */
// /* -------------------------------------------------------------------------- */

// function CaptainOption({
//   captain,
//   selected,
//   disabled,
//   onSelect,
// }: {
//   captain: ReassignCaptain;

//   selected: boolean;

//   disabled: boolean;

//   onSelect: () => void;
// }) {
//   const online =
//     captain.onlineStatus ===
//     "ONLINE";

//   const available =
//     captain.availability ===
//     "AVAILABLE";

//   return (
//     <button
//       type="button"
//       onClick={
//         onSelect
//       }
//       disabled={
//         disabled
//       }
//       className={`w-full rounded-xl border p-3 text-left transition ${
//         selected
//           ? "border-blue-300 bg-blue-50"
//           : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
//       } ${
//         disabled
//           ? "cursor-not-allowed opacity-60"
//           : ""
//       }`}
//     >
//       <div className="flex items-center gap-3">

//         <CaptainAvatar
//           name={
//             captain.name
//           }
//         />

//         <div className="min-w-0 flex-1">

//           <div className="flex flex-wrap items-center gap-2">

//             <p className="truncate text-[9px] font-black text-slate-800">
//               {
//                 captain.name
//               }
//             </p>

//             <span
//               className={`h-1.5 w-1.5 rounded-full ${
//                 online
//                   ? "bg-green-500"
//                   : "bg-slate-300"
//               }`}
//             />

//             <span
//               className={`text-[7px] font-bold ${
//                 online
//                   ? "text-green-600"
//                   : "text-slate-400"
//               }`}
//             >
//               {online
//                 ? "Online"
//                 : "Offline"}
//             </span>

//           </div>

//           <p className="mt-1 font-mono text-[7px] text-slate-400">
//             {
//               captain.captainId
//             }
//           </p>

//           <div className="mt-2 flex flex-wrap gap-1.5">

//             {captain.vehicleType && (
//               <span className="rounded-md bg-slate-100 px-1.5 py-1 text-[7px] font-bold text-slate-500">
//                 {
//                   captain.vehicleType
//                 }
//               </span>
//             )}

//             {captain.vehicleNumber && (
//               <span className="rounded-md bg-slate-100 px-1.5 py-1 font-mono text-[7px] font-bold text-slate-500">
//                 {
//                   captain.vehicleNumber
//                 }
//               </span>
//             )}

//             {captain.serviceId && (
//               <span className="rounded-md bg-orange-50 px-1.5 py-1 text-[7px] font-bold text-orange-600">
//                 {
//                   captain.serviceId
//                 }
//               </span>
//             )}

//           </div>

//         </div>

//         <div className="shrink-0 text-right">

//           <span
//             className={`inline-flex rounded-full border px-2 py-1 text-[7px] font-black uppercase ${
//               available
//                 ? "border-green-200 bg-green-50 text-green-700"
//                 : "border-amber-200 bg-amber-50 text-amber-700"
//             }`}
//           >
//             {
//               captain.availability
//             }
//           </span>

//           {captain.distanceKm !==
//             undefined && (
//             <p className="mt-1 text-[7px] text-slate-400">
//               {
//                 captain.distanceKm.toFixed(
//                   1
//                 )
//               }{" "}
//               km
//             </p>
//           )}

//           {captain.rating !==
//             undefined && (
//             <p className="mt-1 text-[7px] font-bold text-slate-500">
//               ★{" "}
//               {
//                 captain.rating.toFixed(
//                   1
//                 )
//               }
//             </p>
//           )}

//         </div>

//         <div
//           className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
//             selected
//               ? "border-blue-500 bg-blue-500 text-white"
//               : "border-slate-300 bg-white text-transparent"
//           }`}
//         >
//           <CheckIcon />
//         </div>

//       </div>
//     </button>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* NOTIFICATION OPTION */
// /* -------------------------------------------------------------------------- */

// function NotificationOption({
//   checked,
//   disabled,
//   onChange,
//   title,
//   description,
// }: {
//   checked: boolean;

//   disabled: boolean;

//   onChange: (
//     value: boolean
//   ) => void;

//   title: string;

//   description: string;
// }) {
//   return (
//     <label
//       className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${
//         checked
//           ? "border-orange-200 bg-orange-50/50"
//           : "border-slate-200 bg-white"
//       } ${
//         disabled
//           ? "cursor-not-allowed opacity-60"
//           : ""
//       }`}
//     >
//       <input
//         type="checkbox"
//         checked={
//           checked
//         }
//         onChange={(
//           event
//         ) =>
//           onChange(
//             event.target
//               .checked
//           )
//         }
//         disabled={
//           disabled
//         }
//         className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
//       />

//       <span>
//         <span className="block text-[8px] font-black text-slate-700">
//           {title}
//         </span>

//         <span className="mt-1 block text-[7px] leading-4 text-slate-400">
//           {description}
//         </span>
//       </span>
//     </label>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* EMPTY STATE */
// /* -------------------------------------------------------------------------- */

// function EmptyCaptainState({
//   search,
// }: {
//   search: string;
// }) {
//   return (
//     <div className="px-5 py-8 text-center">

//       <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
//         <CaptainIcon />
//       </div>

//       <p className="mt-3 text-[9px] font-black text-slate-600">
//         No eligible captains found
//       </p>

//       <p className="mt-1 text-[8px] leading-4 text-slate-400">
//         {search
//           ? "Try another captain name, ID or phone number."
//           : "No eligible captain is currently available for reassignment."}
//       </p>

//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* LOADING */
// /* -------------------------------------------------------------------------- */

// function CaptainListLoading() {
//   return (
//     <div className="space-y-2 p-2">

//       {[1, 2, 3].map(
//         (item) => (
//           <div
//             key={
//               item
//             }
//             className="animate-pulse rounded-xl border border-slate-200 bg-white p-3"
//           >
//             <div className="flex items-center gap-3">

//               <div className="h-9 w-9 rounded-full bg-slate-200" />

//               <div className="flex-1">

//                 <div className="h-2.5 w-32 rounded bg-slate-200" />

//                 <div className="mt-2 h-2 w-20 rounded bg-slate-100" />

//                 <div className="mt-2 h-2 w-40 rounded bg-slate-100" />

//               </div>

//             </div>
//           </div>
//         )
//       )}

//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* CAPTAIN AVATAR */
// /* -------------------------------------------------------------------------- */

// function CaptainAvatar({
//   name,
// }: {
//   name: string;
// }) {
//   return (
//     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[9px] font-black text-blue-700">
//       {getInitials(
//         name
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* FIELD LABEL */
// /* -------------------------------------------------------------------------- */

// function FieldLabel({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <label className="text-[8px] font-black uppercase tracking-wider text-slate-500">
//       {children}
//     </label>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* INFO ITEM */
// /* -------------------------------------------------------------------------- */

// function InfoItem({
//   label,
//   value,
// }: {
//   label: string;

//   value: string;
// }) {
//   return (
//     <div>
//       <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 truncate text-[8px] font-bold text-slate-700">
//         {value}
//       </p>
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* ICONS */
// /* -------------------------------------------------------------------------- */

// function ReassignIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-4 w-4"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M7 7h10l-3-3"
//       />

//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m17 7-3 3"
//       />

//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M17 17H7l3 3"
//       />

//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m7 17 3-3"
//       />
//     </svg>
//   );
// }

// function SearchIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
//       aria-hidden="true"
//     >
//       <circle
//         cx="11"
//         cy="11"
//         r="6"
//       />

//       <path
//         strokeLinecap="round"
//         d="m16 16 4 4"
//       />
//     </svg>
//   );
// }

// function CheckIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="3"
//       className="h-3 w-3"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m6 12 4 4 8-8"
//       />
//     </svg>
//   );
// }

// function WarningIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m12 3 9 17H3L12 3Z"
//       />

//       <path
//         strokeLinecap="round"
//         d="M12 9v4"
//       />

//       <path
//         strokeLinecap="round"
//         d="M12 16h.01"
//       />
//     </svg>
//   );
// }

// function ShieldIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-4 w-4"
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z"
//       />

//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m9 12 2 2 4-4"
//       />
//     </svg>
//   );
// }

// function Spinner() {
//   return (
//     <span
//       className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
//       aria-hidden="true"
//     />
//   );
// }

// function CaptainIcon() {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-5 w-5"
//       aria-hidden="true"
//     >
//       <circle
//         cx="12"
//         cy="7"
//         r="3"
//       />

//       <path
//         strokeLinecap="round"
//         d="M5 21a7 7 0 0 1 14 0"
//       />
//     </svg>
//   );
// }

// function EntityIcon({
//   type,
// }: {
//   type: CaptainReassignEntityType;
// }) {
//   if (
//     type === "RIDE"
//   ) {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-5 w-5"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 17h14"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="m7 17-1-6h12l-1 6"
//         />

//         <circle
//           cx="8"
//           cy="18"
//           r="1.5"
//         />

//         <circle
//           cx="16"
//           cy="18"
//           r="1.5"
//         />

//         <path
//           strokeLinecap="round"
//           d="m9 11 1.5-3h3L15 11"
//         />
//       </svg>
//     );
//   }

//   if (
//     type === "DELIVERY"
//   ) {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-5 w-5"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3 6h11v11H3z"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M14 10h4l3 3v4h-7"
//         />

//         <circle
//           cx="7"
//           cy="19"
//           r="1.5"
//         />

//         <circle
//           cx="18"
//           cy="19"
//           r="1.5"
//         />
//       </svg>
//     );
//   }

//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className="h-5 w-5"
//       aria-hidden="true"
//     >
//       <rect
//         x="4"
//         y="5"
//         width="16"
//         height="14"
//         rx="2"
//       />

//       <path
//         strokeLinecap="round"
//         d="M8 9h8"
//       />

//       <path
//         strokeLinecap="round"
//         d="M8 13h5"
//       />
//     </svg>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* HELPERS */
// /* -------------------------------------------------------------------------- */

// function getInitials(
//   name: string
// ): string {
//   const parts =
//     name
//       .trim()
//       .split(/\s+/)
//       .filter(Boolean);

//   if (
//     parts.length ===
//     0
//   ) {
//     return "C";
//   }

//   if (
//     parts.length ===
//     1
//   ) {
//     return parts[0]
//       .slice(0, 2)
//       .toUpperCase();
//   }

//   return (
//     parts[0][0] +
//     parts[
//       parts.length - 1
//     ][0]
//   ).toUpperCase();
// }

"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  limit,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { getAuth } from "firebase/auth";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  orderDocId: string;
  currentCaptainId?: string | null;
  module?: string;
  districtId?: string | null;
  stateId?: string | null;
};

type CaptainOption = {
  id: string;
  name: string;
  vehicleType?: string;
  availabilityStatus: string;
};

export default function CaptainReassignModal({
  isOpen,
  onClose,
  orderId,
  orderDocId,
  currentCaptainId,
  module,
  districtId,
}: Props) {
  const [captains, setCaptains] = useState<CaptainOption[]>([]);
  const [selectedCaptainId, setSelectedCaptainId] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setError("");
    setSuccess("");
    setSelectedCaptainId("");
    setFetching(true);

    async function load() {
      try {
        const constraints: Parameters<typeof query>[1][] = [
          where("onlineStatus", "==", "ONLINE"),
          where("availabilityStatus", "==", "AVAILABLE"),
          limit(40),
        ];
        if (districtId) {
          constraints.unshift(where("districtId", "==", districtId));
        }

        const q = query(collection(db, "captains"), ...constraints);
        const snap = await getDocs(q);

        const list: CaptainOption[] = snap.docs
          .map((d) => {
            const data = d.data();
            return {
              id: d.id,
              name:
                (data.displayName as string) ||
                (data.fullName as string) ||
                (data.name as string) ||
                d.id,
              vehicleType: (data.vehicleType as string) || undefined,
              availabilityStatus:
                (data.availabilityStatus as string) || "AVAILABLE",
            };
          })
          .filter((c) => c.id !== currentCaptainId);

        setCaptains(list);
      } catch (err) {
        console.error(err);
        setError("Unable to load available captains.");
      } finally {
        setFetching(false);
      }
    }

    void load();
  }, [isOpen, districtId, currentCaptainId]);

  if (!isOpen) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedCaptainId) {
      setError("Select a captain.");
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const adminUid = auth.currentUser?.uid || "unknown";

      const captain = captains.find((c) => c.id === selectedCaptainId);

      await updateDoc(doc(db, "orders", orderDocId), {
        captainId: selectedCaptainId,
        captainName: captain?.name || null,
        status: "ASSIGNED",
        assignedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        assignment: {
          captainId: selectedCaptainId,
          assignedAt: serverTimestamp(),
          assignedBy: adminUid,
          source: "ERP_MANUAL",
        },
      });

      // Audit log
      await addDoc(collection(db, "audit_logs"), {
        action: currentCaptainId ? "CAPTAIN_REASSIGNED" : "CAPTAIN_ASSIGNED",
        title: currentCaptainId
          ? "Captain re-assigned"
          : "Captain assigned",
        description: `Order ${orderId} → captain ${captain?.name || selectedCaptainId}`,
        module: module || "SYSTEM",
        orderId,
        captainId: selectedCaptainId,
        previousCaptainId: currentCaptainId || null,
        severity: "INFO",
        actorUid: adminUid,
        districtId: districtId || null,
        createdAt: serverTimestamp(),
      });

      setSuccess(
        currentCaptainId
          ? "Captain re-assigned successfully."
          : "Captain assigned successfully.",
      );

      setTimeout(() => {
        onClose();
      }, 900);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Assignment failed. Check Firestore rules.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {currentCaptainId ? "Re-assign Captain" : "Assign Captain"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Order {orderId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          {fetching ? (
            <p className="text-sm text-slate-500">Loading available captains…</p>
          ) : captains.length === 0 ? (
            <p className="text-sm text-slate-500">
              No ONLINE + AVAILABLE captains in this district.
            </p>
          ) : (
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                Select Captain
              </label>
              <select
                value={selectedCaptainId}
                onChange={(e) => setSelectedCaptainId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
              >
                <option value="">Choose captain…</option>
                {captains.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.vehicleType ? `(${c.vehicleType})` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
              {success}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !selectedCaptainId}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Saving…" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}