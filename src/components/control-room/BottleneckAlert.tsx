// "use client";

// import Link from "next/link";
// import {
//   ReactNode,
// } from "react";

// export type BottleneckSeverity =
//   | "CRITICAL"
//   | "HIGH"
//   | "MEDIUM"
//   | "LOW";

// export type BottleneckStatus =
//   | "OPEN"
//   | "INVESTIGATING"
//   | "MONITORING"
//   | "RESOLVED";

// export type BottleneckModule =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING"
//   | "PLATFORM";

// export interface BottleneckAlertData {
//   id: string;
//   title: string;
//   description: string;
//   module: BottleneckModule;
//   severity: BottleneckSeverity;
//   status: BottleneckStatus;
//   affectedCount: number;
//   affectedEntity: string;
//   detectedAt: string;
//   lastUpdated: string;
//   owner: string;
// }

// interface BottleneckAlertProps {
//   bottleneck: BottleneckAlertData;

//   compact?: boolean;

//   showDetailsLink?: boolean;

//   detailsHref?: string;

//   onClick?: (
//     bottleneck: BottleneckAlertData
//   ) => void;

//   onResolve?: (
//     bottleneck: BottleneckAlertData
//   ) => void;

//   loading?: boolean;

//   className?: string;
// }

// const SEVERITY_CONFIG: Record<
//   BottleneckSeverity,
//   {
//     label: string;
//     background: string;
//     text: string;
//     border: string;
//     dot: string;
//   }
// > = {
//   CRITICAL: {
//     label: "Critical",
//     background: "bg-red-100",
//     text: "text-red-700",
//     border: "border-red-200",
//     dot: "bg-red-500",
//   },

//   HIGH: {
//     label: "High",
//     background: "bg-orange-100",
//     text: "text-orange-700",
//     border: "border-orange-200",
//     dot: "bg-orange-500",
//   },

//   MEDIUM: {
//     label: "Medium",
//     background: "bg-amber-100",
//     text: "text-amber-700",
//     border: "border-amber-200",
//     dot: "bg-amber-500",
//   },

//   LOW: {
//     label: "Low",
//     background: "bg-blue-100",
//     text: "text-blue-700",
//     border: "border-blue-200",
//     dot: "bg-blue-500",
//   },
// };

// const STATUS_CONFIG: Record<
//   BottleneckStatus,
//   {
//     label: string;
//     background: string;
//     text: string;
//     dot: string;
//   }
// > = {
//   OPEN: {
//     label: "Open",
//     background: "bg-red-50",
//     text: "text-red-700",
//     dot: "bg-red-500",
//   },

//   INVESTIGATING: {
//     label: "Investigating",
//     background: "bg-amber-50",
//     text: "text-amber-700",
//     dot: "bg-amber-500",
//   },

//   MONITORING: {
//     label: "Monitoring",
//     background: "bg-blue-50",
//     text: "text-blue-700",
//     dot: "bg-blue-500",
//   },

//   RESOLVED: {
//     label: "Resolved",
//     background: "bg-green-50",
//     text: "text-green-700",
//     dot: "bg-green-500",
//   },
// };

// const MODULE_CONFIG: Record<
//   BottleneckModule,
//   {
//     label: string;
//     background: string;
//     text: string;
//   }
// > = {
//   JUCART: {
//     label: "JuCart",
//     background: "bg-orange-100",
//     text: "text-orange-700",
//   },

//   JURIDE: {
//     label: "JuRide",
//     background: "bg-blue-100",
//     text: "text-blue-700",
//   },

//   JUSTAY: {
//     label: "JuStay",
//     background: "bg-purple-100",
//     text: "text-purple-700",
//   },

//   JUHOME: {
//     label: "JuHome",
//     background: "bg-green-100",
//     text: "text-green-700",
//   },

//   JUSHOPPING: {
//     label: "JuShopping",
//     background: "bg-pink-100",
//     text: "text-pink-700",
//   },

//   PLATFORM: {
//     label: "Platform",
//     background: "bg-slate-100",
//     text: "text-slate-700",
//   },
// };

// function formatNumber(
//   value: number
// ): string {
//   return new Intl.NumberFormat(
//     "en-IN"
//   ).format(value);
// }

// function formatDate(
//   value: string
// ): string {
//   if (!value) {
//     return "—";
//   }

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return value;
//   }

//   return new Intl.DateTimeFormat(
//     "en-IN",
//     {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   ).format(date);
// }

// function getSeverityIcon(
//   severity: BottleneckSeverity
// ): ReactNode {
//   switch (severity) {
//     case "CRITICAL":
//       return (
//         <span className="text-sm">
//           !
//         </span>
//       );

//     case "HIGH":
//       return (
//         <span className="text-sm">
//           ⚠
//         </span>
//       );

//     case "MEDIUM":
//       return (
//         <span className="text-sm">
//           !
//         </span>
//       );

//     case "LOW":
//       return (
//         <span className="text-sm">
//           i
//         </span>
//       );

//     default:
//       return null;
//   }
// }

// export default function BottleneckAlert({
//   bottleneck,
//   compact = false,
//   showDetailsLink = true,
//   detailsHref,
//   onClick,
//   onResolve,
//   loading = false,
//   className = "",
// }: BottleneckAlertProps) {
//   const severity =
//     SEVERITY_CONFIG[
//       bottleneck.severity
//     ];

//   const status =
//     STATUS_CONFIG[
//       bottleneck.status
//     ];

//   const module =
//     MODULE_CONFIG[
//       bottleneck.module
//     ];

//   const defaultDetailsHref =
//     `/control-room/bottlenecks?bottleneckId=${encodeURIComponent(
//       bottleneck.id
//     )}`;

//   const href =
//     detailsHref ??
//     defaultDetailsHref;

//   const isResolved =
//     bottleneck.status ===
//     "RESOLVED";

//   return (
//     <div
//       className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition ${
//         bottleneck.severity ===
//         "CRITICAL"
//           ? "border-red-200"
//           : bottleneck.severity ===
//             "HIGH"
//           ? "border-orange-200"
//           : "border-slate-200"
//       } ${
//         onClick
//           ? "cursor-pointer hover:shadow-md"
//           : ""
//       } ${className}`}
//       onClick={() =>
//         onClick?.(bottleneck)
//       }
//     >

//       {/* TOP SEVERITY BAR */}

//       <div
//         className={`h-1 w-full ${
//           bottleneck.severity ===
//           "CRITICAL"
//             ? "bg-red-500"
//             : bottleneck.severity ===
//               "HIGH"
//             ? "bg-orange-500"
//             : bottleneck.severity ===
//               "MEDIUM"
//             ? "bg-amber-500"
//             : "bg-blue-500"
//         }`}
//       />

//       <div
//         className={
//           compact
//             ? "p-4"
//             : "p-5"
//         }
//       >

//         {/* HEADER */}

//         <div className="flex items-start gap-3">

//           <div
//             className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${severity.background} ${severity.text}`}
//           >
//             {getSeverityIcon(
//               bottleneck.severity
//             )}
//           </div>

//           <div className="min-w-0 flex-1">

//             <div className="flex flex-wrap items-center gap-2">

//               <h3 className="text-sm font-black text-slate-900">
//                 {bottleneck.title}
//               </h3>

//               <span
//                 className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-bold ${severity.background} ${severity.text}`}
//               >
//                 <span
//                   className={`h-1.5 w-1.5 rounded-full ${severity.dot}`}
//                 />

//                 {severity.label}
//               </span>

//             </div>

//             <p className="mt-1 text-[10px] font-medium text-slate-400">
//               {bottleneck.id}
//             </p>

//           </div>

//           <span
//             className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${status.background} ${status.text}`}
//           >
//             {status.label}
//           </span>

//         </div>

//         {/* DESCRIPTION */}

//         {!compact && (
//           <p className="mt-4 text-xs leading-5 text-slate-600">
//             {bottleneck.description}
//           </p>
//         )}

//         {/* MODULE + ENTITY */}

//         <div
//           className={`grid gap-3 ${
//             compact
//               ? "mt-3"
//               : "mt-5"
//           } sm:grid-cols-2`}
//         >

//           <InfoItem
//             label="Module"
//             value={
//               <span
//                 className={`inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${module.background} ${module.text}`}
//               >
//                 {module.label}
//               </span>
//             }
//           />

//           <InfoItem
//             label="Affected Entity"
//             value={
//               <span className="font-bold text-slate-700">
//                 {bottleneck.affectedEntity}
//               </span>
//             }
//           />

//           <InfoItem
//             label="Affected Count"
//             value={
//               <span
//                 className={`font-black ${
//                   bottleneck.affectedCount >
//                   0
//                     ? "text-red-600"
//                     : "text-green-600"
//                 }`}
//               >
//                 {formatNumber(
//                   bottleneck.affectedCount
//                 )}
//               </span>
//             }
//           />

//           <InfoItem
//             label="Owner"
//             value={
//               <span className="font-semibold text-slate-700">
//                 {bottleneck.owner ||
//                   "Unassigned"}
//               </span>
//             }
//           />

//         </div>

//         {/* TIMELINE */}

//         {!compact && (
//           <div className="mt-5 grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:grid-cols-2">

//             <InfoItem
//               label="Detected"
//               value={
//                 <span className="text-[10px] font-semibold text-slate-600">
//                   {formatDate(
//                     bottleneck.detectedAt
//                   )}
//                 </span>
//               }
//             />

//             <InfoItem
//               label="Last Updated"
//               value={
//                 <span className="text-[10px] font-semibold text-slate-600">
//                   {formatDate(
//                     bottleneck.lastUpdated
//                   )}
//                 </span>
//               }
//             />

//           </div>
//         )}

//         {/* ACTIONS */}

//         {(showDetailsLink ||
//           onResolve) && (
//           <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-end">

//             {showDetailsLink && (
//               <Link
//                 href={href}
//                 onClick={(event) =>
//                   event.stopPropagation()
//                 }
//                 className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-[10px] font-bold text-slate-700 transition hover:bg-slate-50"
//               >
//                 View Details
//               </Link>
//             )}

//             {onResolve &&
//               !isResolved && (
//                 <button
//                   type="button"
//                   disabled={loading}
//                   onClick={(event) => {
//                     event.stopPropagation();
//                     onResolve(
//                       bottleneck
//                     );
//                   }}
//                   className="rounded-xl bg-green-600 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
//                 >
//                   {loading
//                     ? "Processing..."
//                     : "Mark Resolved"}
//                 </button>
//               )}

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

// function InfoItem({
//   label,
//   value,
// }: {
//   label: string;
//   value: ReactNode;
// }) {
//   return (
//     <div className="min-w-0">

//       <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//         {label}
//       </p>

//       <div className="mt-1 text-xs">
//         {value}
//       </div>

//     </div>
//   );
// }


"use client";

type Props = {
  orderId: string;
  module: string;
  status: string;
  minutesWaiting: number;
};

export default function BottleneckAlert({
  orderId,
  module,
  status,
  minutesWaiting,
}: Props) {
  const critical = minutesWaiting >= 20;

  return (
    <div
      className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
        critical
          ? "border-red-200 bg-red-50"
          : "border-orange-200 bg-orange-50"
      }`}
    >
      <div>
        <p
          className={`text-sm font-bold ${
            critical ? "text-red-800" : "text-orange-800"
          }`}
        >
          {orderId}
        </p>
        <p
          className={`mt-0.5 text-xs ${
            critical ? "text-red-600" : "text-orange-600"
          }`}
        >
          {module} · {status} · waiting {minutesWaiting} min
        </p>
      </div>
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-black ${
          critical ? "bg-red-200 text-red-800" : "bg-orange-200 text-orange-800"
        }`}
      >
        {critical ? "CRITICAL" : "DELAYED"}
      </span>
    </div>
  );
}