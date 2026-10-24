// "use client";

// import type { ReactNode } from "react";

// export type ScopeType =
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "GLOBAL";

// export type ScopeBadgeSize =
//   | "sm"
//   | "md"
//   | "lg";

// export interface ScopeBadgeProps {
//   scopeType: ScopeType;

//   scopeId?: string;

//   scopeName?: string;

//   size?: ScopeBadgeSize;

//   showIcon?: boolean;

//   showId?: boolean;

//   icon?: ReactNode;

//   className?: string;

//   onClick?: () => void;
// }

// const SCOPE_CONFIG: Record<
//   ScopeType,
//   {
//     label: string;
//     shortLabel: string;
//     classes: string;
//   }
// > = {
//   GLOBAL: {
//     label: "Global",
//     shortLabel: "Global",
//     classes:
//       "border-slate-200 bg-slate-100 text-slate-700",
//   },

//   STATE: {
//     label: "State",
//     shortLabel: "State",
//     classes:
//       "border-orange-200 bg-orange-50 text-orange-700",
//   },

//   DISTRICT: {
//     label: "District",
//     shortLabel: "District",
//     classes:
//       "border-blue-200 bg-blue-50 text-blue-700",
//   },

//   PINCODE: {
//     label: "Pincode",
//     shortLabel: "Pincode",
//     classes:
//       "border-purple-200 bg-purple-50 text-purple-700",
//   },

//   VENDOR: {
//     label: "Vendor",
//     shortLabel: "Vendor",
//     classes:
//       "border-green-200 bg-green-50 text-green-700",
//   },

//   CAPTAIN: {
//     label: "Captain",
//     shortLabel: "Captain",
//     classes:
//       "border-cyan-200 bg-cyan-50 text-cyan-700",
//   },
// };

// const SIZE_CLASSES: Record<
//   ScopeBadgeSize,
//   {
//     wrapper: string;
//     icon: string;
//     text: string;
//     id: string;
//   }
// > = {
//   sm: {
//     wrapper:
//       "gap-1 rounded-md px-1.5 py-1",
//     icon: "h-3 w-3",
//     text: "text-[7px]",
//     id: "text-[6px]",
//   },

//   md: {
//     wrapper:
//       "gap-1.5 rounded-lg px-2 py-1.5",
//     icon: "h-3.5 w-3.5",
//     text: "text-[8px]",
//     id: "text-[7px]",
//   },

//   lg: {
//     wrapper:
//       "gap-2 rounded-xl px-3 py-2",
//     icon: "h-4 w-4",
//     text: "text-[9px]",
//     id: "text-[8px]",
//   },
// };

// export default function ScopeBadge({
//   scopeType,
//   scopeId,
//   scopeName,
//   size = "md",
//   showIcon = true,
//   showId = false,
//   icon,
//   className = "",
//   onClick,
// }: ScopeBadgeProps) {
//   const config =
//     SCOPE_CONFIG[
//       scopeType
//     ];

//   const sizeConfig =
//     SIZE_CLASSES[size];

//   const displayName =
//     scopeName ||
//     config.label;

//   const isClickable =
//     Boolean(onClick);

//   const content = (
//     <>
//       {showIcon && (
//         <span
//           className={`flex shrink-0 items-center justify-center ${sizeConfig.icon}`}
//         >
//           {icon ?? (
//             <ScopeIcon
//               type={scopeType}
//             />
//           )}
//         </span>
//       )}

//       <span
//         className={`font-black uppercase tracking-wide ${sizeConfig.text}`}
//       >
//         {displayName}
//       </span>

//       {showId &&
//         scopeId && (
//           <>
//             <span className="text-current opacity-30">
//               •
//             </span>

//             <span
//               className={`font-mono font-semibold opacity-70 ${sizeConfig.id}`}
//             >
//               {scopeId}
//             </span>
//           </>
//         )}
//     </>
//   );

//   if (isClickable) {
//     return (
//       <button
//         type="button"
//         onClick={onClick}
//         title={
//           scopeId
//             ? `${config.label}: ${displayName} (${scopeId})`
//             : `${config.label}: ${displayName}`
//         }
//         className={`inline-flex items-center border transition hover:-translate-y-px hover:shadow-sm ${config.classes} ${sizeConfig.wrapper} ${className}`}
//       >
//         {content}
//       </button>
//     );
//   }

//   return (
//     <span
//       title={
//         scopeId
//           ? `${config.label}: ${displayName} (${scopeId})`
//           : `${config.label}: ${displayName}`
//       }
//       className={`inline-flex items-center border ${config.classes} ${sizeConfig.wrapper} ${className}`}
//     >
//       {content}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* SCOPE ICON */
// /* -------------------------------------------------------------------------- */

// function ScopeIcon({
//   type,
// }: {
//   type: ScopeType;
// }) {
//   if (type === "GLOBAL") {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-full w-full"
//         aria-hidden="true"
//       >
//         <circle
//           cx="12"
//           cy="12"
//           r="9"
//         />

//         <path
//           strokeLinecap="round"
//           d="M3 12h18"
//         />

//         <path
//           strokeLinecap="round"
//           d="M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z"
//         />
//       </svg>
//     );
//   }

//   if (type === "STATE") {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-full w-full"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4 19V5"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4 19h16"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M7 15l4-5 3 3 5-7"
//         />
//       </svg>
//     );
//   }

//   if (type === "DISTRICT") {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-full w-full"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3 21h18"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 21V7l7-4 7 4v14"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M9 21v-5h6v5"
//         />

//         <path
//           strokeLinecap="round"
//           d="M9 9h.01M15 9h.01M9 12h.01M15 12h.01"
//         />
//       </svg>
//     );
//   }

//   if (type === "PINCODE") {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-full w-full"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
//         />

//         <circle
//           cx="12"
//           cy="10"
//           r="2.5"
//         />
//       </svg>
//     );
//   }

//   if (type === "VENDOR") {
//     return (
//       <svg
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         className="h-full w-full"
//         aria-hidden="true"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4 10h16"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M5 10v9h14v-9"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M3 10l2-6h14l2 6"
//         />

//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M9 19v-5h6v5"
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
//       className="h-full w-full"
//       aria-hidden="true"
//     >
//       <circle
//         cx="12"
//         cy="7"
//         r="3"
//       />

//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M5 21a7 7 0 0 1 14 0"
//       />

//       <path
//         strokeLinecap="round"
//         d="M18 8.5a3 3 0 0 1 0 5"
//       />

//       <path
//         strokeLinecap="round"
//         d="M6 8.5a3 3 0 0 0 0 5"
//       />
//     </svg>
//   );
// }

"use client";

import useAuthScope from "@/hooks/useAuthScope";

export default function ScopeBadge() {
  const {
    loading,
    role,
    scope,
    stateId,
    districtId,
    isGlobalAdmin,
  } = useAuthScope();

  if (loading) {
    return (
      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
        Loading scope…
      </span>
    );
  }

  if (!role) {
    return (
      <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold text-red-700">
        No role
      </span>
    );
  }

  if (isGlobalAdmin || role === "SUPER_ADMIN" || role === "TECHNICAL_ADMIN") {
    return (
      <span className="rounded-full bg-purple-100 px-3 py-1 text-[10px] font-bold text-purple-700">
        {role} · Global
      </span>
    );
  }

  if (role === "STATE_ADMIN") {
    return (
      <span className="rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-700">
        STATE_ADMIN · {scope?.name || stateId || "—"}
      </span>
    );
  }

  if (role === "DISTRICT_ADMIN") {
    return (
      <span className="rounded-full bg-orange-100 px-3 py-1 text-[10px] font-bold text-orange-700">
        DISTRICT_ADMIN · {scope?.name || districtId || "—"}
        {scope?.parentName ? ` (${scope.parentName})` : ""}
      </span>
    );
  }

  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
      {role}
    </span>
  );
}