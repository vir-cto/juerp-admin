// "use client";

// import Link from "next/link";
// import {
//   usePathname,
// } from "next/navigation";
// import {
//   useMemo,
//   useState,
// } from "react";

// export type SidebarRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN";

// interface SidebarProps {
//   collapsed?: boolean;

//   mobileOpen?: boolean;

//   onClose?: () => void;

//   role?: SidebarRole;

//   className?: string;
// }

// interface NavigationItem {
//   label: string;
//   href: string;
//   icon: SidebarIconName;
//   roles?: SidebarRole[];
// }

// interface NavigationSection {
//   id: string;
//   label: string;
//   icon: SidebarIconName;
//   items: NavigationItem[];
//   roles?: SidebarRole[];
// }

// type SidebarIconName =
//   | "dashboard"
//   | "control"
//   | "entities"
//   | "customers"
//   | "vendors"
//   | "captains"
//   | "hierarchy"
//   | "clusters"
//   | "zones"
//   | "commission"
//   | "globalRules"
//   | "nodeOverrides"
//   | "vendorRates"
//   | "finance"
//   | "ledger"
//   | "payouts"
//   | "cashfree"
//   | "settlements"
//   | "refunds"
//   | "overrides"
//   | "dispatch"
//   | "suspensions"
//   | "cancellations"
//   | "audit"
//   | "rbac"
//   | "adminUsers"
//   | "settings";

// const ALL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// const GOVERNANCE_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
// ];

// const TECHNICAL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// const NAVIGATION_SECTIONS: NavigationSection[] =
//   [
//     {
//       id: "entity-management",
//       label: "Entity Management",
//       icon: "entities",
//       roles: GOVERNANCE_ROLES,
//       items: [
//         {
//           label: "Customers",
//           href: "/entity-management/customers",
//           icon: "customers",
//         },
//         {
//           label: "Vendors",
//           href: "/entity-management/vendors",
//           icon: "vendors",
//         },
//         {
//           label: "Captains",
//           href: "/entity-management/captains",
//           icon: "captains",
//         },
//       ],
//     },

//     {
//       id: "hierarchy",
//       label: "Hierarchy",
//       icon: "hierarchy",
//       roles: GOVERNANCE_ROLES,
//       items: [
//         {
//           label: "Hierarchy",
//           href: "/hierarchy",
//           icon: "hierarchy",
//         },
//         {
//           label: "Clusters",
//           href: "/hierarchy/clusters",
//           icon: "clusters",
//         },
//         {
//           label: "Zones",
//           href: "/hierarchy/zones",
//           icon: "zones",
//         },
//       ],
//     },

//     {
//       id: "commission-engine",
//       label: "Commission Engine",
//       icon: "commission",
//       roles: GOVERNANCE_ROLES,
//       items: [
//         {
//           label: "Overview",
//           href: "/commission-engine",
//           icon: "commission",
//         },
//         {
//           label: "Global Rules",
//           href: "/commission-engine/global-rules",
//           icon: "globalRules",
//         },
//         {
//           label: "Node Overrides",
//           href: "/commission-engine/node-overrides",
//           icon: "nodeOverrides",
//         },
//         {
//           label: "Vendor Rates",
//           href: "/commission-engine/vendor-rates",
//           icon: "vendorRates",
//         },
//       ],
//     },

//     {
//       id: "financial-audit",
//       label: "Financial Audit",
//       icon: "finance",
//       roles: ALL_ROLES,
//       items: [
//         {
//           label: "Overview",
//           href: "/financial-audit",
//           icon: "finance",
//         },
//         {
//           label: "General Ledger",
//           href: "/financial-audit/general-ledger",
//           icon: "ledger",
//         },
//         {
//           label: "Payouts",
//           href: "/financial-audit/payouts",
//           icon: "payouts",
//         },
//         {
//           label: "Cashfree Reconciliation",
//           href: "/financial-audit/cashfree-reconciliation",
//           icon: "cashfree",
//         },
//         {
//           label: "Settlements",
//           href: "/financial-audit/settlements",
//           icon: "settlements",
//         },
//         {
//           label: "Refunds",
//           href: "/financial-audit/refunds",
//           icon: "refunds",
//         },
//       ],
//     },

//     {
//       id: "overrides",
//       label: "Overrides",
//       icon: "overrides",
//       roles: GOVERNANCE_ROLES,
//       items: [
//         {
//           label: "Overview",
//           href: "/overrides",
//           icon: "overrides",
//         },
//         {
//           label: "Dispatch",
//           href: "/overrides/dispatch",
//           icon: "dispatch",
//         },
//         {
//           label: "Suspensions",
//           href: "/overrides/suspensions",
//           icon: "suspensions",
//         },
//         {
//           label: "Cancellations",
//           href: "/overrides/cancellations",
//           icon: "cancellations",
//         },
//       ],
//     },

//     {
//       id: "system-audit",
//       label: "System Audit",
//       icon: "audit",
//       roles: TECHNICAL_ROLES,
//       items: [
//         {
//           label: "Audit Overview",
//           href: "/system-audit",
//           icon: "audit",
//         },
//         {
//           label: "RBAC Roles",
//           href: "/system-audit/rbac-roles",
//           icon: "rbac",
//         },
//         {
//           label: "Admin Users",
//           href: "/system-audit/admin-users",
//           icon: "adminUsers",
//           roles: ["SUPER_ADMIN"], // only Super Admin sees this
//         },
//       ],
//     },
//   ];

// export default function Sidebar({
//   collapsed = false,
//   mobileOpen = false,
//   onClose,
//   role = "SUPER_ADMIN",
//   className = "",
// }: SidebarProps) {
//   const pathname =
//     usePathname();

//   const [
//     openSections,
//     setOpenSections,
//   ] = useState<
//     Record<string, boolean>
//   >(() =>
//     getInitialOpenSections(
//       pathname
//     )
//   );

//   const visibleSections =
//     useMemo(
//       () =>
//         NAVIGATION_SECTIONS.filter(
//           (section) =>
//             canAccess(
//               section.roles,
//               role
//             )
//         ).map(
//           (section) => ({
//             ...section,
//             items:
//               section.items.filter(
//                 (item) =>
//                   canAccess(
//                     item.roles,
//                     role
//                   )
//               ),
//           })
//         ),
//       [role]
//     );

//   function toggleSection(
//     sectionId: string
//   ) {
//     setOpenSections(
//       (current) => ({
//         ...current,
//         [sectionId]:
//           !current[
//             sectionId
//           ],
//       })
//     );
//   }

//   function handleNavigation() {
//     onClose?.();
//   }

//   return (
//     <>
//       {/* MOBILE OVERLAY */}

//       {mobileOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={onClose}
//           className="fixed inset-0 z-[130] bg-slate-950/50 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       {/* SIDEBAR */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-[140] flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:static lg:z-auto lg:shadow-none ${
//           collapsed
//             ? "lg:w-[76px]"
//             : "lg:w-[280px]"
//         } ${
//           mobileOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         } ${className}`}
//       >
//         {/* BRAND */}

//         <div
//           className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
//             collapsed
//               ? "justify-center px-2"
//               : "justify-between px-4"
//           }`}
//         >
//           <Link
//             href="/dashboard"
//             onClick={
//               handleNavigation
//             }
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
//               <span className="text-lg font-black text-white">
//                 J
//               </span>
//             </div>

//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-black tracking-tight text-slate-900">
//                   JUERP
//                 </p>

//                 <p className="truncate text-[7px] font-bold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>

//           {/* MOBILE CLOSE */}

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close sidebar"
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         {/* ROLE / SCOPE */}

//         {!collapsed && (
//           <div className="border-b border-slate-100 px-4 py-3">

//             <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">

//               <div className="flex items-center gap-2">

//                 <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
//                   <ShieldIcon />
//                 </div>

//                 <div className="min-w-0">

//                   <p className="text-[7px] font-black uppercase tracking-wider text-orange-700">
//                     Access Role
//                   </p>

//                   <p className="mt-0.5 truncate text-[9px] font-black text-slate-800">
//                     {formatRole(
//                       role
//                     )}
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>
//         )}

//         {/* NAVIGATION */}

//         <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">

//           {/* DASHBOARD */}

//           <SidebarNavItem
//             item={{
//               label: "Dashboard",
//               href: "/dashboard",
//               icon: "dashboard",
//             }}
//             pathname={
//               pathname
//             }
//             collapsed={
//               collapsed
//             }
//             onNavigate={
//               handleNavigation
//             }
//           />

//           {/* CONTROL ROOM */}

//           <SidebarNavItem
//             item={{
//               label: "Control Room",
//               href: "/control-room",
//               icon: "control",
//             }}
//             pathname={
//               pathname
//             }
//             collapsed={
//               collapsed
//             }
//             onNavigate={
//               handleNavigation
//             }
//           />

//           <div className="my-4 border-t border-slate-100" />

//           {/* SECTIONS */}

//           <div className="space-y-1.5">

//             {visibleSections.map(
//               (section) => (
//                 <SidebarSection
//                   key={
//                     section.id
//                   }
//                   section={
//                     section
//                   }
//                   pathname={
//                     pathname
//                   }
//                   collapsed={
//                     collapsed
//                   }
//                   open={
//                     Boolean(
//                       openSections[
//                         section.id
//                       ]
//                     )
//                   }
//                   onToggle={() =>
//                     toggleSection(
//                       section.id
//                     )
//                   }
//                   onNavigate={
//                     handleNavigation
//                   }
//                 />
//               )
//             )}

//           </div>

//           <div className="my-4 border-t border-slate-100" />

//           {/* SETTINGS */}

//           <SidebarNavItem
//             item={{
//               label: "Settings",
//               href: "/settings",
//               icon: "settings",
//               roles: ALL_ROLES,
//             }}
//             pathname={
//               pathname
//             }
//             collapsed={
//               collapsed
//             }
//             onNavigate={
//               handleNavigation
//             }
//           />

//         </nav>

//         {/* FOOTER */}

//         <div
//           className={`shrink-0 border-t border-slate-200 bg-slate-50/70 ${
//             collapsed
//               ? "p-2"
//               : "p-3"
//           }`}
//         >

//           {collapsed ? (
//             <div
//               title="JUERP Governance"
//               className="flex h-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
//             >
//               <ShieldIcon />
//             </div>
//           ) : (
//             <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-3">

//               <div className="flex items-start gap-2">

//                 <div className="mt-0.5 text-orange-600">
//                   <ShieldIcon />
//                 </div>

//                 <div>

//                   <p className="text-[7px] font-black uppercase tracking-wider text-orange-800">
//                     Governance Boundary
//                   </p>

//                   <p className="mt-1 text-[8px] leading-4 text-orange-700">
//                     Authorization and financial
//                     rules are enforced by the
//                     trusted JUERP backend.
//                   </p>

//                 </div>

//               </div>

//             </div>
//           )}

//         </div>

//       </aside>
//     </>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* SIDEBAR SECTION */
// /* -------------------------------------------------------------------------- */

// function SidebarSection({
//   section,
//   pathname,
//   collapsed,
//   open,
//   onToggle,
//   onNavigate,
// }: {
//   section: NavigationSection;

//   pathname: string;

//   collapsed: boolean;

//   open: boolean;

//   onToggle: () => void;

//   onNavigate: () => void;
// }) {
//   const sectionActive =
//     section.items.some(
//       (item) =>
//         isRouteActive(
//           pathname,
//           item.href
//         )
//     );

//   if (collapsed) {
//     return (
//       <div className="relative">

//         <button
//           type="button"
//           title={
//             section.label
//           }
//           onClick={
//             onToggle
//           }
//           className={`group flex h-11 w-full items-center justify-center rounded-xl transition ${
//             sectionActive
//               ? "bg-orange-50 text-orange-600"
//               : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
//           }`}
//         >
//           <SidebarIcon
//             name={
//               section.icon
//             }
//           />

//           {sectionActive && (
//             <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
//           )}
//         </button>

//         {open && (
//           <div className="absolute left-[68px] top-0 z-[160] w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">

//             <p className="px-3 py-2 text-[8px] font-black uppercase tracking-wider text-slate-400">
//               {section.label}
//             </p>

//             {section.items.map(
//               (item) => (
//                 <SidebarNavItem
//                   key={
//                     item.href
//                   }
//                   item={
//                     item
//                   }
//                   pathname={
//                     pathname
//                   }
//                   collapsed={
//                     false
//                   }
//                   onNavigate={
//                     onNavigate
//                   }
//                 />
//               )
//             )}

//           </div>
//         )}

//       </div>
//     );
//   }

//   return (
//     <div>

//       {/* SECTION HEADER */}

//       <button
//         type="button"
//         onClick={
//           onToggle
//         }
//         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
//           sectionActive
//             ? "text-orange-700"
//             : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
//         }`}
//       >

//         <span
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
//             sectionActive
//               ? "bg-orange-100 text-orange-600"
//               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//           }`}
//         >
//           <SidebarIcon
//             name={
//               section.icon
//             }
//           />
//         </span>

//         <span className="min-w-0 flex-1">

//           <span className="block truncate text-[9px] font-black">
//             {section.label}
//           </span>

//           <span className="mt-0.5 block text-[7px] text-slate-400">
//             {section.items.length}{" "}
//             {section.items.length ===
//             1
//               ? "module"
//               : "modules"}
//           </span>

//         </span>

//         <ChevronDownIcon
//           className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
//             open
//               ? "rotate-180"
//               : ""
//           }`}
//         />

//       </button>

//       {/* CHILD ITEMS */}

//       {open && (
//         <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">

//           {section.items.map(
//             (item) => (
//               <SidebarNavItem
//                 key={
//                   item.href
//                 }
//                 item={
//                   item
//                 }
//                 pathname={
//                   pathname
//                 }
//                 collapsed={
//                   false
//                 }
//                 onNavigate={
//                   onNavigate
//                 }
//                 nested
//               />
//             )
//           )}

//         </div>
//       )}

//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* NAV ITEM */
// /* -------------------------------------------------------------------------- */

// function SidebarNavItem({
//   item,
//   pathname,
//   collapsed,
//   onNavigate,
//   nested = false,
// }: {
//   item: NavigationItem;

//   pathname: string;

//   collapsed: boolean;

//   onNavigate: () => void;

//   nested?: boolean;
// }) {
//   const active =
//     isRouteActive(
//       pathname,
//       item.href
//     );

//   return (
//     <Link
//       href={
//         item.href
//       }
//       onClick={
//         onNavigate
//       }
//       title={
//         collapsed
//           ? item.label
//           : undefined
//       }
//       className={`group relative flex items-center transition ${
//         collapsed
//           ? "h-11 justify-center rounded-xl px-2"
//           : nested
//             ? "min-h-9 rounded-lg px-3"
//             : "min-h-11 rounded-xl px-3"
//       } ${
//         active
//           ? "bg-orange-50 text-orange-700"
//           : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
//       }`}
//     >

//       {/* ACTIVE INDICATOR */}

//       {active && (
//         <span
//           className={`absolute left-0 w-1 rounded-r-full bg-orange-500 ${
//             collapsed
//               ? "top-1/2 h-6 -translate-y-1/2"
//               : "top-1/2 h-5 -translate-y-1/2"
//           }`}
//         />
//       )}

//       <span
//         className={`flex shrink-0 items-center justify-center ${
//           collapsed
//             ? "h-8 w-8"
//             : nested
//               ? "h-7 w-7"
//               : "h-8 w-8"
//         } ${
//           active
//             ? "text-orange-600"
//             : "text-slate-400 group-hover:text-slate-600"
//         }`}
//       >
//         <SidebarIcon
//           name={
//             item.icon
//           }
//         />
//       </span>

//       {!collapsed && (
//         <span
//           className={`ml-2 min-w-0 truncate font-bold ${
//             nested
//               ? "text-[8px]"
//               : "text-[9px]"
//           }`}
//         >
//           {item.label}
//         </span>
//       )}

//       {!collapsed &&
//         active && (
//           <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
//         )}

//     </Link>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* ACCESS CONTROL */
// /* -------------------------------------------------------------------------- */

// function canAccess(
//   roles:
//     | SidebarRole[]
//     | undefined,
//   role: SidebarRole
// ): boolean {
//   if (!roles) {
//     return true;
//   }

//   return roles.includes(
//     role
//   );
// }

// function formatRole(
//   role: SidebarRole
// ): string {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "Super Admin";

//     case "STATE_ADMIN":
//       return "State Admin";

//     case "DISTRICT_ADMIN":
//       return "District Admin";

//     case "TECHNICAL_ADMIN":
//       return "Technical Admin";

//     default:
//       return role;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* ROUTE HELPERS */
// /* -------------------------------------------------------------------------- */

// function isRouteActive(
//   pathname: string,
//   href: string
// ): boolean {
//   if (
//     href ===
//     "/dashboard"
//   ) {
//     return (
//       pathname ===
//       "/dashboard"
//     );
//   }

//   return (
//     pathname ===
//       href ||
//     pathname.startsWith(
//       `${href}/`
//     )
//   );
// }

// function getInitialOpenSections(
//   pathname: string
// ): Record<string, boolean> {
//   const result: Record<
//     string,
//     boolean
//   > = {};

//   NAVIGATION_SECTIONS.forEach(
//     (section) => {
//       result[section.id] =
//         section.items.some(
//           (item) =>
//             isRouteActive(
//               pathname,
//               item.href
//             )
//         );
//     }
//   );

//   return result;
// }

// /* -------------------------------------------------------------------------- */
// /* SIDEBAR ICON */
// /* -------------------------------------------------------------------------- */

// function SidebarIcon({
//   name,
// }: {
//   name: SidebarIconName;
// }) {
//   const common =
//     "h-4 w-4";

//   switch (name) {
//     case "dashboard":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <rect
//             x="3"
//             y="3"
//             width="7"
//             height="7"
//             rx="1"
//           />

//           <rect
//             x="14"
//             y="3"
//             width="7"
//             height="7"
//             rx="1"
//           />

//           <rect
//             x="3"
//             y="14"
//             width="7"
//             height="7"
//             rx="1"
//           />

//           <rect
//             x="14"
//             y="14"
//             width="7"
//             height="7"
//             rx="1"
//           />
//         </svg>
//       );

//     case "control":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             d="M4 19V5"
//           />

//           <path
//             strokeLinecap="round"
//             d="M4 19h16"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m7 15 3-4 3 2 5-7"
//           />

//           <circle
//             cx="18"
//             cy="6"
//             r="1"
//           />
//         </svg>
//       );

//     case "entities":
//     case "customers":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <circle
//             cx="9"
//             cy="8"
//             r="3"
//           />

//           <path
//             strokeLinecap="round"
//             d="M3 21a6 6 0 0 1 12 0"
//           />

//           <path
//             strokeLinecap="round"
//             d="M16 5.5a3 3 0 0 1 0 5.5"
//           />

//           <path
//             strokeLinecap="round"
//             d="M18 15a5 5 0 0 1 3 4"
//           />
//         </svg>
//       );

//     case "vendors":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M3 10h18"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 10v10h14V10"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m4 10 2-6h12l2 6"
//           />

//           <path
//             strokeLinecap="round"
//             d="M9 20v-5h6v5"
//           />
//         </svg>
//       );

//     case "captains":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <circle
//             cx="12"
//             cy="7"
//             r="3"
//           />

//           <path
//             strokeLinecap="round"
//             d="M5 21a7 7 0 0 1 14 0"
//           />

//           <path
//             strokeLinecap="round"
//             d="M18 8.5a3 3 0 0 1 0 5"
//           />

//           <path
//             strokeLinecap="round"
//             d="M6 8.5a3 3 0 0 0 0 5"
//           />
//         </svg>
//       );

//     case "hierarchy":
//     case "clusters":
//     case "zones":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <rect
//             x="8"
//             y="3"
//             width="8"
//             height="5"
//             rx="1"
//           />

//           <rect
//             x="3"
//             y="16"
//             width="7"
//             height="5"
//             rx="1"
//           />

//           <rect
//             x="14"
//             y="16"
//             width="7"
//             height="5"
//             rx="1"
//           />

//           <path
//             strokeLinecap="round"
//             d="M12 8v4M6.5 16v-4h11v4"
//           />

//           <path
//             strokeLinecap="round"
//             d="M12 12H6.5M12 12h5.5"
//           />
//         </svg>
//       );

//     case "commission":
//     case "globalRules":
//     case "nodeOverrides":
//     case "vendorRates":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <circle
//             cx="12"
//             cy="12"
//             r="8"
//           />

//           <path
//             strokeLinecap="round"
//             d="M12 7v10"
//           />

//           <path
//             strokeLinecap="round"
//             d="M15 9.5c-.8-.8-1.8-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.2-.4-3-1.2"
//           />
//         </svg>
//       );

//     case "finance":
//     case "ledger":
//     case "payouts":
//     case "cashfree":
//     case "settlements":
//     case "refunds":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <rect
//             x="3"
//             y="5"
//             width="18"
//             height="14"
//             rx="2"
//           />

//           <path
//             strokeLinecap="round"
//             d="M3 10h18"
//           />

//           <path
//             strokeLinecap="round"
//             d="M7 15h3"
//           />

//           <path
//             strokeLinecap="round"
//             d="M15 15h2"
//           />
//         </svg>
//       );

//     case "overrides":
//     case "dispatch":
//     case "suspensions":
//     case "cancellations":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 3v18"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m7 8 5-5 5 5"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m7 16 5 5 5-5"
//           />

//           <circle
//             cx="12"
//             cy="12"
//             r="2"
//           />
//         </svg>
//       );

//     case "audit":
//     case "rbac":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="m9 12 2 2 4-4"
//           />
//         </svg>
//       );

//     case "settings":
//       return (
//         <svg
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           className={common}
//           aria-hidden="true"
//         >
//           <circle
//             cx="12"
//             cy="12"
//             r="3"
//           />

//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V7h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.7V16h-.7a1.7 1.7 0 0 0-1.6 1Z"
//           />
//         </svg>
//       );

//     default:
//       return null;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* COMMON ICONS */
// /* -------------------------------------------------------------------------- */

// function ChevronDownIcon({
//   className = "",
// }: {
//   className?: string;
// }) {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       className={className}
//       aria-hidden="true"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="m6 9 6 6 6-6"
//       />
//     </svg>
//   );
// }

// function CloseIcon() {
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
//         d="M6 6l12 12"
//       />

//       <path
//         strokeLinecap="round"
//         d="M18 6 6 18"
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

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   MODULE_JUCART,
//   MODULE_JURIDE,
//   MODULE_JUSTAY,
//   MODULE_JUHOME,
//   MODULE_JUSHOPPING,
//   MODULE_JUONLINE,
//   JUCART_SERVICES,
//   JUCART_SERVICE_LABELS,
//   JUSTAY_SERVICES,
//   JUSTAY_SERVICE_LABELS,
// } from "@/lib/constants/modules";

// export type SidebarRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN";

// interface SidebarProps {
//   collapsed?: boolean;
//   mobileOpen?: boolean;
//   onClose?: () => void;
//   role?: SidebarRole;
//   className?: string;
// }

// interface NavigationItem {
//   label: string;
//   href: string;
//   icon: SidebarIconName;
//   roles?: SidebarRole[];
//   badge?: string;
// }

// interface NavigationSection {
//   id: string;
//   label: string;
//   icon: SidebarIconName;
//   items: NavigationItem[];
//   roles?: SidebarRole[];
// }

// type SidebarIconName =
//   | "dashboard"
//   | "control"
//   | "jucart"
//   | "justay"
//   | "juhome"
//   | "jushopping"
//   | "juride"
//   | "juonline"
//   | "entities"
//   | "customers"
//   | "vendors"
//   | "captains"
//   | "hierarchy"
//   | "clusters"
//   | "zones"
//   | "commission"
//   | "globalRules"
//   | "nodeOverrides"
//   | "vendorRates"
//   | "finance"
//   | "ledger"
//   | "payouts"
//   | "cashfree"
//   | "settlements"
//   | "refunds"
//   | "overrides"
//   | "dispatch"
//   | "suspensions"
//   | "cancellations"
//   | "audit"
//   | "rbac"
//   | "adminUsers"
//   | "settings"
//   | "orders"
//   | "bookings"
//   | "rides"
//   | "food"
//   | "mart"
//   | "pharmacy";

// const ALL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// const GOVERNANCE_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
// ];

// const TECHNICAL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// /* -------------------------------------------------------------------------- */
// /* MODULE SECTIONS (product modules)                                          */
// /* -------------------------------------------------------------------------- */

// const MODULE_SECTIONS: NavigationSection[] = [
//   {
//     id: "module-jucart",
//     label: "JuCart",
//     icon: "jucart",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: `/modules/${MODULE_JUCART.toLowerCase()}`,
//         icon: "jucart",
//       },
//       {
//         label: "Orders",
//         href: `/modules/${MODULE_JUCART.toLowerCase()}/orders`,
//         icon: "orders",
//       },
//       ...JUCART_SERVICES.map((service) => ({
//         label: JUCART_SERVICE_LABELS[service],
//         href: `/modules/${MODULE_JUCART.toLowerCase()}/${service.toLowerCase()}`,
//         icon: (service === "FOOD"
//           ? "food"
//           : service === "MART"
//             ? "mart"
//             : "pharmacy") as SidebarIconName,
//       })),
//     ],
//   },
//   {
//     id: "module-justay",
//     label: "JuStay",
//     icon: "justay",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}`,
//         icon: "justay",
//       },
//       {
//         label: "Bookings",
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}/bookings`,
//         icon: "bookings",
//       },
//       ...JUSTAY_SERVICES.map((service) => ({
//         label: JUSTAY_SERVICE_LABELS[service],
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}/${service.toLowerCase()}`,
//         icon: "justay" as SidebarIconName,
//       })),
//     ],
//   },
//   {
//     id: "module-juhome",
//     label: "JuHome",
//     icon: "juhome",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}`,
//         icon: "juhome",
//       },
//       {
//         label: "Bookings",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}/bookings`,
//         icon: "bookings",
//       },
//       {
//         label: "Services",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}/services`,
//         icon: "juhome",
//       },
//     ],
//   },
//   {
//     id: "module-jushopping",
//     label: "JuShopping",
//     icon: "jushopping",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}`,
//         icon: "jushopping",
//       },
//       {
//         label: "Orders",
//         href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}/orders`,
//         icon: "orders",
//       },
//       {
//         label: "Catalog",
//         href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}/catalog`,
//         icon: "jushopping",
//       },
//     ],
//   },
//   {
//     id: "module-juride",
//     label: "JuRide",
//     icon: "juride",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}`,
//         icon: "juride",
//       },
//       {
//         label: "Rides",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/rides`,
//         icon: "rides",
//       },
//       {
//         label: "Rentals",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/rentals`,
//         icon: "juride",
//       },
//       {
//         label: "Logistics",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/logistics`,
//         icon: "juride",
//       },
//       {
//         label: "Packers & Movers",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/packers-movers`,
//         icon: "juride",
//       },
//     ],
//   },
//   {
//     id: "module-juonline",
//     label: "JuOnline",
//     icon: "juonline",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Coming Soon",
//         href: `/modules/${MODULE_JUONLINE.toLowerCase()}`,
//         icon: "juonline",
//         badge: "Soon",
//       },
//     ],
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /* GOVERNANCE / OPS SECTIONS                                                  */
// /* -------------------------------------------------------------------------- */

// const GOVERNANCE_SECTIONS: NavigationSection[] = [
//   {
//     id: "entity-management",
//     label: "Entity Management",
//     icon: "entities",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Customers",
//         href: "/entity-management/customers",
//         icon: "customers",
//       },
//       {
//         label: "Vendors",
//         href: "/entity-management/vendors",
//         icon: "vendors",
//       },
//       {
//         label: "Captains",
//         href: "/entity-management/captains",
//         icon: "captains",
//       },
//     ],
//   },
//   {
//     id: "hierarchy",
//     label: "Hierarchy",
//     icon: "hierarchy",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Hierarchy",
//         href: "/hierarchy",
//         icon: "hierarchy",
//       },
//       {
//         label: "Clusters",
//         href: "/hierarchy/clusters",
//         icon: "clusters",
//       },
//       {
//         label: "Zones",
//         href: "/hierarchy/zones",
//         icon: "zones",
//       },
//     ],
//   },
//   {
//     id: "commission-engine",
//     label: "Commission Engine",
//     icon: "commission",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/commission-engine",
//         icon: "commission",
//       },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "globalRules",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "nodeOverrides",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "vendorRates",
//       },
//     ],
//   },
//   {
//     id: "financial-audit",
//     label: "Financial Audit",
//     icon: "finance",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/financial-audit",
//         icon: "finance",
//       },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "ledger",
//       },
//       {
//         label: "Payouts",
//         href: "/financial-audit/payouts",
//         icon: "payouts",
//       },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "cashfree",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "settlements",
//       },
//       {
//         label: "Refunds",
//         href: "/financial-audit/refunds",
//         icon: "refunds",
//       },
//     ],
//   },
//   {
//     id: "overrides",
//     label: "Overrides",
//     icon: "overrides",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/overrides",
//         icon: "overrides",
//       },
//       {
//         label: "Dispatch",
//         href: "/overrides/dispatch",
//         icon: "dispatch",
//       },
//       {
//         label: "Suspensions",
//         href: "/overrides/suspensions",
//         icon: "suspensions",
//       },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "cancellations",
//       },
//     ],
//   },
//   {
//     id: "system-audit",
//     label: "System Audit",
//     icon: "audit",
//     roles: TECHNICAL_ROLES,
//     items: [
//       {
//         label: "Audit Overview",
//         href: "/system-audit",
//         icon: "audit",
//       },
//       {
//         label: "RBAC Roles",
//         href: "/system-audit/rbac-roles",
//         icon: "rbac",
//       },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "adminUsers",
//         roles: ["SUPER_ADMIN"],
//       },
//     ],
//   },
// ];

// const NAVIGATION_SECTIONS: NavigationSection[] = [
//   ...MODULE_SECTIONS,
//   ...GOVERNANCE_SECTIONS,
// ];

// export default function Sidebar({
//   collapsed = false,
//   mobileOpen = false,
//   onClose,
//   role = "SUPER_ADMIN",
//   className = "",
// }: SidebarProps) {
//   const pathname = usePathname();

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>(
//     () => getInitialOpenSections(pathname)
//   );

//   const visibleModuleSections = useMemo(
//     () =>
//       MODULE_SECTIONS.filter((section) => canAccess(section.roles, role)).map(
//         (section) => ({
//           ...section,
//           items: section.items.filter((item) => canAccess(item.roles, role)),
//         })
//       ),
//     [role]
//   );

//   const visibleGovernanceSections = useMemo(
//     () =>
//       GOVERNANCE_SECTIONS.filter((section) =>
//         canAccess(section.roles, role)
//       ).map((section) => ({
//         ...section,
//         items: section.items.filter((item) => canAccess(item.roles, role)),
//       })),
//     [role]
//   );

//   function toggleSection(sectionId: string) {
//     setOpenSections((current) => ({
//       ...current,
//       [sectionId]: !current[sectionId],
//     }));
//   }

//   function handleNavigation() {
//     onClose?.();
//   }

//   return (
//     <>
//       {mobileOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={onClose}
//           className="fixed inset-0 z-[130] bg-slate-950/50 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-[140] flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:static lg:z-auto lg:shadow-none ${
//           collapsed ? "lg:w-[76px]" : "lg:w-[280px]"
//         } ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         } ${className}`}
//       >
//         {/* BRAND */}
//         <div
//           className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
//             collapsed ? "justify-center px-2" : "justify-between px-4"
//           }`}
//         >
//           <Link
//             href="/dashboard"
//             onClick={handleNavigation}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
//               <span className="text-lg font-black text-white">J</span>
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-black tracking-tight text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close sidebar"
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
//           {/* MAIN */}
//           {!collapsed && (
//             <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//               Main
//             </p>
//           )}

//           <SidebarNavItem
//             item={{
//               label: "Dashboard",
//               href: "/dashboard",
//               icon: "dashboard",
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />

//           <SidebarNavItem
//             item={{
//               label: "Control Room",
//               href: "/control-room",
//               icon: "control",
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />

//           {/* MODULES */}
//           {visibleModuleSections.length > 0 && (
//             <>
//               <div className="my-4 border-t border-slate-100" />
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//                   Modules
//                 </p>
//               )}
//               <div className="space-y-1">
//                 {visibleModuleSections.map((section) => (
//                   <SidebarSection
//                     key={section.id}
//                     section={section}
//                     pathname={pathname}
//                     collapsed={collapsed}
//                     open={Boolean(openSections[section.id])}
//                     onToggle={() => toggleSection(section.id)}
//                     onNavigate={handleNavigation}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* ENTITY + GOVERNANCE */}
//           {visibleGovernanceSections.length > 0 && (
//             <>
//               <div className="my-4 border-t border-slate-100" />
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//                   Operations
//                 </p>
//               )}
//               <div className="space-y-1.5">
//                 {visibleGovernanceSections.map((section) => (
//                   <SidebarSection
//                     key={section.id}
//                     section={section}
//                     pathname={pathname}
//                     collapsed={collapsed}
//                     open={Boolean(openSections[section.id])}
//                     onToggle={() => toggleSection(section.id)}
//                     onNavigate={handleNavigation}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           <div className="my-4 border-t border-slate-100" />

//           <SidebarNavItem
//             item={{
//               label: "Settings",
//               href: "/settings",
//               icon: "settings",
//               roles: ALL_ROLES,
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />
//         </nav>

//         {/* FOOTER — CURRENT ACCESS */}
//         <div
//           className={`shrink-0 border-t border-slate-200 bg-slate-50/70 ${
//             collapsed ? "p-2" : "p-3"
//           }`}
//         >
//           {collapsed ? (
//             <div
//               title={formatRole(role)}
//               className="flex h-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
//             >
//               <ShieldIcon />
//             </div>
//           ) : (
//             <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
//               <p className="text-[10px] font-black uppercase tracking-wider text-orange-700">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-black text-slate-900">
//                 {role}
//               </p>
//               <p className="mt-0.5 truncate text-[11px] text-slate-500">
//                 {formatRole(role)}
//               </p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* SECTION                                                                    */
// /* -------------------------------------------------------------------------- */

// function SidebarSection({
//   section,
//   pathname,
//   collapsed,
//   open,
//   onToggle,
//   onNavigate,
// }: {
//   section: NavigationSection;
//   pathname: string;
//   collapsed: boolean;
//   open: boolean;
//   onToggle: () => void;
//   onNavigate: () => void;
// }) {
//   const sectionActive = section.items.some((item) =>
//     isRouteActive(pathname, item.href)
//   );

//   if (collapsed) {
//     return (
//       <div className="relative">
//         <button
//           type="button"
//           title={section.label}
//           onClick={onToggle}
//           className={`group flex h-11 w-full items-center justify-center rounded-xl transition ${
//             sectionActive
//               ? "bg-orange-50 text-orange-600"
//               : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
//           }`}
//         >
//           <SidebarIcon name={section.icon} />
//           {sectionActive && (
//             <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
//           )}
//         </button>

//         {open && (
//           <div className="absolute left-[68px] top-0 z-[160] w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
//             <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
//               {section.label}
//             </p>
//             {section.items.map((item) => (
//               <SidebarNavItem
//                 key={item.href}
//                 item={item}
//                 pathname={pathname}
//                 collapsed={false}
//                 onNavigate={onNavigate}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={onToggle}
//         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
//           sectionActive
//             ? "bg-orange-50/80 text-orange-700"
//             : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
//         }`}
//       >
//         <span
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
//             sectionActive
//               ? "bg-orange-100 text-orange-600"
//               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//           }`}
//         >
//           <SidebarIcon name={section.icon} />
//         </span>

//         <span className="min-w-0 flex-1">
//           <span className="block truncate text-sm font-bold">
//             {section.label}
//           </span>
//         </span>

//         <ChevronDownIcon
//           className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {open && (
//         <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
//           {section.items.map((item) => (
//             <SidebarNavItem
//               key={item.href}
//               item={item}
//               pathname={pathname}
//               collapsed={false}
//               onNavigate={onNavigate}
//               nested
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* NAV ITEM                                                                   */
// /* -------------------------------------------------------------------------- */

// function SidebarNavItem({
//   item,
//   pathname,
//   collapsed,
//   onNavigate,
//   nested = false,
// }: {
//   item: NavigationItem;
//   pathname: string;
//   collapsed: boolean;
//   onNavigate: () => void;
//   nested?: boolean;
// }) {
//   const active = isRouteActive(pathname, item.href);

//   return (
//     <Link
//       href={item.href}
//       onClick={onNavigate}
//       title={collapsed ? item.label : undefined}
//       className={`group relative flex items-center transition ${
//         collapsed
//           ? "h-11 justify-center rounded-xl px-2"
//           : nested
//             ? "min-h-9 rounded-lg px-3"
//             : "min-h-11 rounded-xl px-3"
//       } ${
//         active
//           ? "bg-orange-50 text-orange-700"
//           : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
//       }`}
//     >
//       {active && (
//         <span
//           className={`absolute left-0 w-1 rounded-r-full bg-orange-500 ${
//             collapsed
//               ? "top-1/2 h-6 -translate-y-1/2"
//               : "top-1/2 h-5 -translate-y-1/2"
//           }`}
//         />
//       )}

//       <span
//         className={`flex shrink-0 items-center justify-center ${
//           collapsed ? "h-8 w-8" : nested ? "h-7 w-7" : "h-8 w-8"
//         } ${
//           active
//             ? "text-orange-600"
//             : "text-slate-400 group-hover:text-slate-600"
//         }`}
//       >
//         <SidebarIcon name={item.icon} />
//       </span>

//       {!collapsed && (
//         <>
//           <span
//             className={`ml-2 min-w-0 truncate font-semibold ${
//               nested ? "text-xs" : "text-sm"
//             }`}
//           >
//             {item.label}
//           </span>
//           {item.badge && (
//             <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
//               {item.badge}
//             </span>
//           )}
//           {!item.badge && active && (
//             <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
//           )}
//         </>
//       )}
//     </Link>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* HELPERS                                                                    */
// /* -------------------------------------------------------------------------- */

// function canAccess(
//   roles: SidebarRole[] | undefined,
//   role: SidebarRole
// ): boolean {
//   if (!roles) return true;
//   return roles.includes(role);
// }

// function formatRole(role: SidebarRole): string {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "Super Admin";
//     case "STATE_ADMIN":
//       return "State Admin";
//     case "DISTRICT_ADMIN":
//       return "District Admin";
//     case "TECHNICAL_ADMIN":
//       return "Technical Admin";
//     default:
//       return role;
//   }
// }

// function isRouteActive(pathname: string, href: string): boolean {
//   if (href === "/dashboard") {
//     return pathname === "/dashboard";
//   }
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function getInitialOpenSections(
//   pathname: string
// ): Record<string, boolean> {
//   const result: Record<string, boolean> = {};
//   NAVIGATION_SECTIONS.forEach((section) => {
//     result[section.id] = section.items.some((item) =>
//       isRouteActive(pathname, item.href)
//     );
//   });
//   return result;
// }

// /* -------------------------------------------------------------------------- */
// /* ICONS                                                                      */
// /* -------------------------------------------------------------------------- */

// function SidebarIcon({ name }: { name: SidebarIconName }) {
//   const common = "h-4 w-4";

//   switch (name) {
//     case "dashboard":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="3" y="3" width="7" height="7" rx="1" />
//           <rect x="14" y="3" width="7" height="7" rx="1" />
//           <rect x="3" y="14" width="7" height="7" rx="1" />
//           <rect x="14" y="14" width="7" height="7" rx="1" />
//         </svg>
//       );

//     case "control":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" d="M4 19V5" />
//           <path strokeLinecap="round" d="M4 19h16" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 15 3-4 3 2 5-7" />
//           <circle cx="18" cy="6" r="1" />
//         </svg>
//       );

//     case "jucart":
//     case "food":
//     case "mart":
//     case "pharmacy":
//     case "orders":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="9" cy="20" r="1.5" />
//           <circle cx="17" cy="20" r="1.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 12h10.2l2-8H7" />
//         </svg>
//       );

//     case "justay":
//     case "bookings":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 4l9 6.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v9h14v-9" />
//           <path strokeLinecap="round" d="M10 19v-5h4v5" />
//         </svg>
//       );

//     case "juhome":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 11 12 4l9 7" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
//           <path strokeLinecap="round" d="M9 20v-6h6v6" />
//         </svg>
//       );

//     case "jushopping":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 11H7L6 8Z" />
//           <path strokeLinecap="round" d="M9 8V7a3 3 0 0 1 6 0v1" />
//         </svg>
//       );

//     case "juride":
//     case "rides":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="7" cy="17" r="2.5" />
//           <circle cx="17" cy="17" r="2.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3v-4l2-5h8l3 5h3v4h-2" />
//           <path strokeLinecap="round" d="M9.5 17h5" />
//         </svg>
//       );

//     case "juonline":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="9" />
//           <path strokeLinecap="round" d="M3 12h18" />
//           <path strokeLinecap="round" d="M12 3a14 14 0 0 1 0 18" />
//           <path strokeLinecap="round" d="M12 3a14 14 0 0 0 0 18" />
//         </svg>
//       );

//     case "entities":
//     case "customers":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="9" cy="8" r="3" />
//           <path strokeLinecap="round" d="M3 21a6 6 0 0 1 12 0" />
//           <path strokeLinecap="round" d="M16 5.5a3 3 0 0 1 0 5.5" />
//           <path strokeLinecap="round" d="M18 15a5 5 0 0 1 3 4" />
//         </svg>
//       );

//     case "vendors":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 2-6h12l2 6" />
//           <path strokeLinecap="round" d="M9 20v-5h6v5" />
//         </svg>
//       );

//     case "captains":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="7" r="3" />
//           <path strokeLinecap="round" d="M5 21a7 7 0 0 1 14 0" />
//           <path strokeLinecap="round" d="M18 8.5a3 3 0 0 1 0 5" />
//           <path strokeLinecap="round" d="M6 8.5a3 3 0 0 0 0 5" />
//         </svg>
//       );

//     case "hierarchy":
//     case "clusters":
//     case "zones":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="8" y="3" width="8" height="5" rx="1" />
//           <rect x="3" y="16" width="7" height="5" rx="1" />
//           <rect x="14" y="16" width="7" height="5" rx="1" />
//           <path strokeLinecap="round" d="M12 8v4M6.5 16v-4h11v4" />
//           <path strokeLinecap="round" d="M12 12H6.5M12 12h5.5" />
//         </svg>
//       );

//     case "commission":
//     case "globalRules":
//     case "nodeOverrides":
//     case "vendorRates":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="8" />
//           <path strokeLinecap="round" d="M12 7v10" />
//           <path strokeLinecap="round" d="M15 9.5c-.8-.8-1.8-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.2-.4-3-1.2" />
//         </svg>
//       );

//     case "finance":
//     case "ledger":
//     case "payouts":
//     case "cashfree":
//     case "settlements":
//     case "refunds":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="3" y="5" width="18" height="14" rx="2" />
//           <path strokeLinecap="round" d="M3 10h18" />
//           <path strokeLinecap="round" d="M7 15h3" />
//           <path strokeLinecap="round" d="M15 15h2" />
//         </svg>
//       );

//     case "overrides":
//     case "dispatch":
//     case "suspensions":
//     case "cancellations":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 8 5-5 5 5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 16 5 5 5-5" />
//           <circle cx="12" cy="12" r="2" />
//         </svg>
//       );

//     case "audit":
//     case "rbac":
//     case "adminUsers":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
//         </svg>
//       );

//     case "settings":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="3" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V7h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.7V16h-.7a1.7 1.7 0 0 0-1.6 1Z" />
//         </svg>
//       );

//     default:
//       return null;
//   }
// }

// function ChevronDownIcon({ className = "" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
//       <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
//     </svg>
//   );
// }

// function CloseIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
//       <path strokeLinecap="round" d="M6 6l12 12" />
//       <path strokeLinecap="round" d="M18 6 6 18" />
//     </svg>
//   );
// }

// function ShieldIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
//       <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
//     </svg>
//   );
// }


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useMemo, useState } from "react";
// import {
//   MODULE_JUCART,
//   MODULE_JURIDE,
//   MODULE_JUSTAY,
//   MODULE_JUHOME,
//   MODULE_JUSHOPPING,
//   MODULE_JUONLINE,
//   JUCART_SERVICES,
//   JUCART_SERVICE_LABELS,
//   JUSTAY_SERVICES,
//   JUSTAY_SERVICE_LABELS,
// } from "@/lib/constants/modules";

// export type SidebarRole =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN";

// interface SidebarProps {
//   collapsed?: boolean;
//   mobileOpen?: boolean;
//   onClose?: () => void;
//   role?: SidebarRole;
//   className?: string;
// }

// interface NavigationItem {
//   label: string;
//   href: string;
//   icon: SidebarIconName;
//   roles?: SidebarRole[];
//   badge?: string;
// }

// interface NavigationSection {
//   id: string;
//   label: string;
//   icon: SidebarIconName;
//   items: NavigationItem[];
//   roles?: SidebarRole[];
// }

// type SidebarIconName =
//   | "dashboard"
//   | "control"
//   | "jucart"
//   | "justay"
//   | "juhome"
//   | "jushopping"
//   | "juride"
//   | "juonline"
//   | "entities"
//   | "customers"
//   | "vendors"
//   | "captains"
//   | "hierarchy"
//   | "clusters"
//   | "zones"
//   | "commission"
//   | "globalRules"
//   | "nodeOverrides"
//   | "vendorRates"
//   | "finance"
//   | "ledger"
//   | "payouts"
//   | "cashfree"
//   | "settlements"
//   | "refunds"
//   | "overrides"
//   | "dispatch"
//   | "suspensions"
//   | "cancellations"
//   | "audit"
//   | "rbac"
//   | "adminUsers"
//   | "settings"
//   | "orders"
//   | "bookings"
//   | "rides"
//   | "food"
//   | "mart"
//   | "pharmacy";

// const ALL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// const GOVERNANCE_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "STATE_ADMIN",
//   "DISTRICT_ADMIN",
// ];

// const TECHNICAL_ROLES: SidebarRole[] = [
//   "SUPER_ADMIN",
//   "TECHNICAL_ADMIN",
// ];

// /* -------------------------------------------------------------------------- */
// /* MODULE SECTIONS — no Vendors under modules                                 */
// /* -------------------------------------------------------------------------- */

// const MODULE_SECTIONS: NavigationSection[] = [
//   {
//     id: "module-jucart",
//     label: "JuCart",
//     icon: "jucart",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Dashboard",
//         href: `/modules/${MODULE_JUCART.toLowerCase()}`,
//         icon: "dashboard",
//       },
//       {
//         label: "Orders",
//         href: `/modules/${MODULE_JUCART.toLowerCase()}/orders`,
//         icon: "orders",
//       },
//       ...JUCART_SERVICES.map((service) => ({
//         label: JUCART_SERVICE_LABELS[service],
//         href: `/modules/${MODULE_JUCART.toLowerCase()}/${service.toLowerCase()}`,
//         icon: (service === "FOOD"
//           ? "food"
//           : service === "MART"
//             ? "mart"
//             : "pharmacy") as SidebarIconName,
//       })),
//     ],
//   },
//   {
//     id: "module-justay",
//     label: "JuStay",
//     icon: "justay",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Dashboard",
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}`,
//         icon: "dashboard",
//       },
//       {
//         label: "Bookings",
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}/bookings`,
//         icon: "bookings",
//       },
//       ...JUSTAY_SERVICES.map((service) => ({
//         label: JUSTAY_SERVICE_LABELS[service],
//         href: `/modules/${MODULE_JUSTAY.toLowerCase()}/${service.toLowerCase()}`,
//         icon: "justay" as SidebarIconName,
//       })),
//     ],
//   },
//   {
//     id: "module-juhome",
//     label: "JuHome",
//     icon: "juhome",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Dashboard",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}`,
//         icon: "dashboard",
//       },
//       {
//         label: "Bookings",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}/bookings`,
//         icon: "bookings",
//       },
//       {
//         label: "Services",
//         href: `/modules/${MODULE_JUHOME.toLowerCase()}/services`,
//         icon: "juhome",
//       },
//     ],
//   },
//   {
//     id: "module-jushopping",
//     label: "JuShopping",
//     icon: "jushopping",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Dashboard",
//         href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}`,
//         icon: "dashboard",
//       },
//       {
//         label: "Orders",
//         href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}/orders`,
//         icon: "orders",
//       },
//     ],
//   },
//   {
//     id: "module-juride",
//     label: "JuRide",
//     icon: "juride",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Dashboard",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}`,
//         icon: "dashboard",
//       },
//       {
//         label: "Rides",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/rides`,
//         icon: "rides",
//       },
//       {
//         label: "Rentals",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/rentals`,
//         icon: "juride",
//       },
//       {
//         label: "Logistics",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/logistics`,
//         icon: "juride",
//       },
//       {
//         label: "Packers & Movers",
//         href: `/modules/${MODULE_JURIDE.toLowerCase()}/packers-movers`,
//         icon: "juride",
//       },
//     ],
//   },
//   {
//     id: "module-juonline",
//     label: "JuOnline",
//     icon: "juonline",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Coming Soon",
//         href: `/modules/${MODULE_JUONLINE.toLowerCase()}`,
//         icon: "juonline",
//         badge: "Soon",
//       },
//     ],
//   },
// ];

// /* -------------------------------------------------------------------------- */
// /* GOVERNANCE / OPS — Vendors live only here                                  */
// /* -------------------------------------------------------------------------- */

// const GOVERNANCE_SECTIONS: NavigationSection[] = [
//   {
//     id: "entity-management",
//     label: "Entity Management",
//     icon: "entities",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Customers",
//         href: "/entity-management/customers",
//         icon: "customers",
//       },
//       {
//         label: "Vendors",
//         href: "/entity-management/vendors",
//         icon: "vendors",
//       },
//       {
//         label: "Captains",
//         href: "/entity-management/captains",
//         icon: "captains",
//       },
//     ],
//   },
//   {
//     id: "hierarchy",
//     label: "Hierarchy",
//     icon: "hierarchy",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Hierarchy",
//         href: "/hierarchy",
//         icon: "hierarchy",
//       },
//       {
//         label: "Clusters",
//         href: "/hierarchy/clusters",
//         icon: "clusters",
//       },
//       {
//         label: "Zones",
//         href: "/hierarchy/zones",
//         icon: "zones",
//       },
//     ],
//   },
//   {
//     id: "commission-engine",
//     label: "Commission Engine",
//     icon: "commission",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/commission-engine",
//         icon: "commission",
//       },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "globalRules",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "nodeOverrides",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "vendorRates",
//       },
//     ],
//   },
//   {
//     id: "financial-audit",
//     label: "Financial Audit",
//     icon: "finance",
//     roles: ALL_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/financial-audit",
//         icon: "finance",
//       },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "ledger",
//       },
//       {
//         label: "Payouts",
//         href: "/financial-audit/payouts",
//         icon: "payouts",
//       },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "cashfree",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "settlements",
//       },
//       {
//         label: "Refunds",
//         href: "/financial-audit/refunds",
//         icon: "refunds",
//       },
//     ],
//   },
//   {
//     id: "overrides",
//     label: "Overrides",
//     icon: "overrides",
//     roles: GOVERNANCE_ROLES,
//     items: [
//       {
//         label: "Overview",
//         href: "/overrides",
//         icon: "overrides",
//       },
//       {
//         label: "Dispatch",
//         href: "/overrides/dispatch",
//         icon: "dispatch",
//       },
//       {
//         label: "Suspensions",
//         href: "/overrides/suspensions",
//         icon: "suspensions",
//       },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "cancellations",
//       },
//     ],
//   },
//   {
//     id: "system-audit",
//     label: "System Audit",
//     icon: "audit",
//     roles: TECHNICAL_ROLES,
//     items: [
//       {
//         label: "Audit Overview",
//         href: "/system-audit",
//         icon: "audit",
//       },
//       {
//         label: "RBAC Roles",
//         href: "/system-audit/rbac-roles",
//         icon: "rbac",
//       },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "adminUsers",
//         roles: ["SUPER_ADMIN"],
//       },
//     ],
//   },
// ];

// const NAVIGATION_SECTIONS: NavigationSection[] = [
//   ...MODULE_SECTIONS,
//   ...GOVERNANCE_SECTIONS,
// ];

// export default function Sidebar({
//   collapsed = false,
//   mobileOpen = false,
//   onClose,
//   role = "SUPER_ADMIN",
//   className = "",
// }: SidebarProps) {
//   const pathname = usePathname();

//   const [openSections, setOpenSections] = useState<Record<string, boolean>>(
//     () => getInitialOpenSections(pathname)
//   );

//   const visibleModuleSections = useMemo(
//     () =>
//       MODULE_SECTIONS.filter((section) => canAccess(section.roles, role)).map(
//         (section) => ({
//           ...section,
//           items: section.items.filter((item) => canAccess(item.roles, role)),
//         })
//       ),
//     [role]
//   );

//   const visibleGovernanceSections = useMemo(
//     () =>
//       GOVERNANCE_SECTIONS.filter((section) =>
//         canAccess(section.roles, role)
//       ).map((section) => ({
//         ...section,
//         items: section.items.filter((item) => canAccess(item.roles, role)),
//       })),
//     [role]
//   );

//   function toggleSection(sectionId: string) {
//     setOpenSections((current) => ({
//       ...current,
//       [sectionId]: !current[sectionId],
//     }));
//   }

//   function handleNavigation() {
//     onClose?.();
//   }

//   return (
//     <>
//       {mobileOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={onClose}
//           className="fixed inset-0 z-[130] bg-slate-950/50 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-[140] flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:static lg:z-auto lg:shadow-none ${
//           collapsed ? "lg:w-[76px]" : "lg:w-[280px]"
//         } ${
//           mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         } ${className}`}
//       >
//         {/* BRAND */}
//         <div
//           className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
//             collapsed ? "justify-center px-2" : "justify-between px-4"
//           }`}
//         >
//           <Link
//             href="/dashboard"
//             onClick={handleNavigation}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
//               <span className="text-lg font-black text-white">J</span>
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-black tracking-tight text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close sidebar"
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
//           >
//             <CloseIcon />
//           </button>
//         </div>

//         {/* NAVIGATION */}
//         <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
//           {/* MAIN */}
//           {!collapsed && (
//             <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//               Main
//             </p>
//           )}

//           <SidebarNavItem
//             item={{
//               label: "Dashboard",
//               href: "/dashboard",
//               icon: "dashboard",
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />

//           <SidebarNavItem
//             item={{
//               label: "Control Room",
//               href: "/control-room",
//               icon: "control",
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />

//           {/* MODULES */}
//           {visibleModuleSections.length > 0 && (
//             <>
//               <div className="my-4 border-t border-slate-100" />
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//                   Modules
//                 </p>
//               )}
//               <div className="space-y-1">
//                 {visibleModuleSections.map((section) => (
//                   <SidebarSection
//                     key={section.id}
//                     section={section}
//                     pathname={pathname}
//                     collapsed={collapsed}
//                     open={Boolean(openSections[section.id])}
//                     onToggle={() => toggleSection(section.id)}
//                     onNavigate={handleNavigation}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           {/* OPERATIONS */}
//           {visibleGovernanceSections.length > 0 && (
//             <>
//               <div className="my-4 border-t border-slate-100" />
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
//                   Operations
//                 </p>
//               )}
//               <div className="space-y-1.5">
//                 {visibleGovernanceSections.map((section) => (
//                   <SidebarSection
//                     key={section.id}
//                     section={section}
//                     pathname={pathname}
//                     collapsed={collapsed}
//                     open={Boolean(openSections[section.id])}
//                     onToggle={() => toggleSection(section.id)}
//                     onNavigate={handleNavigation}
//                   />
//                 ))}
//               </div>
//             </>
//           )}

//           <div className="my-4 border-t border-slate-100" />

//           <SidebarNavItem
//             item={{
//               label: "Settings",
//               href: "/settings",
//               icon: "settings",
//               roles: ALL_ROLES,
//             }}
//             pathname={pathname}
//             collapsed={collapsed}
//             onNavigate={handleNavigation}
//           />
//         </nav>

//         {/* FOOTER */}
//         <div
//           className={`shrink-0 border-t border-slate-200 bg-slate-50/70 ${
//             collapsed ? "p-2" : "p-3"
//           }`}
//         >
//           {collapsed ? (
//             <div
//               title={formatRole(role)}
//               className="flex h-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
//             >
//               <ShieldIcon />
//             </div>
//           ) : (
//             <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
//               <p className="text-[10px] font-black uppercase tracking-wider text-orange-700">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-black text-slate-900">{role}</p>
//               <p className="mt-0.5 truncate text-[11px] text-slate-500">
//                 {formatRole(role)}
//               </p>
//             </div>
//           )}
//         </div>
//       </aside>
//     </>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* SECTION                                                                    */
// /* -------------------------------------------------------------------------- */

// function SidebarSection({
//   section,
//   pathname,
//   collapsed,
//   open,
//   onToggle,
//   onNavigate,
// }: {
//   section: NavigationSection;
//   pathname: string;
//   collapsed: boolean;
//   open: boolean;
//   onToggle: () => void;
//   onNavigate: () => void;
// }) {
//   const sectionActive = section.items.some((item) =>
//     isRouteActive(pathname, item.href)
//   );

//   if (collapsed) {
//     return (
//       <div className="relative">
//         <button
//           type="button"
//           title={section.label}
//           onClick={onToggle}
//           className={`group flex h-11 w-full items-center justify-center rounded-xl transition ${
//             sectionActive
//               ? "bg-orange-50 text-orange-600"
//               : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
//           }`}
//         >
//           <SidebarIcon name={section.icon} />
//           {sectionActive && (
//             <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
//           )}
//         </button>

//         {open && (
//           <div className="absolute left-[68px] top-0 z-[160] w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
//             <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
//               {section.label}
//             </p>
//             {section.items.map((item) => (
//               <SidebarNavItem
//                 key={item.href}
//                 item={item}
//                 pathname={pathname}
//                 collapsed={false}
//                 onNavigate={onNavigate}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div>
//       <button
//         type="button"
//         onClick={onToggle}
//         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
//           sectionActive
//             ? "bg-orange-50/80 text-orange-700"
//             : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
//         }`}
//       >
//         <span
//           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
//             sectionActive
//               ? "bg-orange-100 text-orange-600"
//               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//           }`}
//         >
//           <SidebarIcon name={section.icon} />
//         </span>

//         <span className="min-w-0 flex-1">
//           <span className="block truncate text-sm font-bold">
//             {section.label}
//           </span>
//         </span>

//         <ChevronDownIcon
//           className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {open && (
//         <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
//           {section.items.map((item) => (
//             <SidebarNavItem
//               key={item.href}
//               item={item}
//               pathname={pathname}
//               collapsed={false}
//               onNavigate={onNavigate}
//               nested
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* NAV ITEM                                                                   */
// /* -------------------------------------------------------------------------- */

// function SidebarNavItem({
//   item,
//   pathname,
//   collapsed,
//   onNavigate,
//   nested = false,
// }: {
//   item: NavigationItem;
//   pathname: string;
//   collapsed: boolean;
//   onNavigate: () => void;
//   nested?: boolean;
// }) {
//   const active = isRouteActive(pathname, item.href);

//   return (
//     <Link
//       href={item.href}
//       onClick={onNavigate}
//       title={collapsed ? item.label : undefined}
//       className={`group relative flex items-center transition ${
//         collapsed
//           ? "h-11 justify-center rounded-xl px-2"
//           : nested
//             ? "min-h-9 rounded-lg px-3"
//             : "min-h-11 rounded-xl px-3"
//       } ${
//         active
//           ? "bg-orange-50 text-orange-700"
//           : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
//       }`}
//     >
//       {active && (
//         <span
//           className={`absolute left-0 w-1 rounded-r-full bg-orange-500 ${
//             collapsed
//               ? "top-1/2 h-6 -translate-y-1/2"
//               : "top-1/2 h-5 -translate-y-1/2"
//           }`}
//         />
//       )}

//       <span
//         className={`flex shrink-0 items-center justify-center ${
//           collapsed ? "h-8 w-8" : nested ? "h-7 w-7" : "h-8 w-8"
//         } ${
//           active
//             ? "text-orange-600"
//             : "text-slate-400 group-hover:text-slate-600"
//         }`}
//       >
//         <SidebarIcon name={item.icon} />
//       </span>

//       {!collapsed && (
//         <>
//           <span
//             className={`ml-2 min-w-0 truncate font-semibold ${
//               nested ? "text-xs" : "text-sm"
//             }`}
//           >
//             {item.label}
//           </span>
//           {item.badge && (
//             <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
//               {item.badge}
//             </span>
//           )}
//           {!item.badge && active && (
//             <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
//           )}
//         </>
//       )}
//     </Link>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* HELPERS                                                                    */
// /* -------------------------------------------------------------------------- */

// function canAccess(
//   roles: SidebarRole[] | undefined,
//   role: SidebarRole
// ): boolean {
//   if (!roles) return true;
//   return roles.includes(role);
// }

// function formatRole(role: SidebarRole): string {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "Super Admin";
//     case "STATE_ADMIN":
//       return "State Admin";
//     case "DISTRICT_ADMIN":
//       return "District Admin";
//     case "TECHNICAL_ADMIN":
//       return "Technical Admin";
//     default:
//       return role;
//   }
// }

// function isRouteActive(pathname: string, href: string): boolean {
//   if (href === "/dashboard") {
//     return pathname === "/dashboard";
//   }
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function getInitialOpenSections(
//   pathname: string
// ): Record<string, boolean> {
//   const result: Record<string, boolean> = {};
//   NAVIGATION_SECTIONS.forEach((section) => {
//     result[section.id] = section.items.some((item) =>
//       isRouteActive(pathname, item.href)
//     );
//   });
//   return result;
// }

// /* -------------------------------------------------------------------------- */
// /* ICONS                                                                      */
// /* -------------------------------------------------------------------------- */

// function SidebarIcon({ name }: { name: SidebarIconName }) {
//   const common = "h-4 w-4";

//   switch (name) {
//     case "dashboard":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="3" y="3" width="7" height="7" rx="1" />
//           <rect x="14" y="3" width="7" height="7" rx="1" />
//           <rect x="3" y="14" width="7" height="7" rx="1" />
//           <rect x="14" y="14" width="7" height="7" rx="1" />
//         </svg>
//       );

//     case "control":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" d="M4 19V5" />
//           <path strokeLinecap="round" d="M4 19h16" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 15 3-4 3 2 5-7" />
//           <circle cx="18" cy="6" r="1" />
//         </svg>
//       );

//     case "jucart":
//     case "food":
//     case "mart":
//     case "pharmacy":
//     case "orders":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="9" cy="20" r="1.5" />
//           <circle cx="17" cy="20" r="1.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 12h10.2l2-8H7" />
//         </svg>
//       );

//     case "justay":
//     case "bookings":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 4l9 6.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v9h14v-9" />
//           <path strokeLinecap="round" d="M10 19v-5h4v5" />
//         </svg>
//       );

//     case "juhome":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 11 12 4l9 7" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
//           <path strokeLinecap="round" d="M9 20v-6h6v6" />
//         </svg>
//       );

//     case "jushopping":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 11H7L6 8Z" />
//           <path strokeLinecap="round" d="M9 8V7a3 3 0 0 1 6 0v1" />
//         </svg>
//       );

//     case "juride":
//     case "rides":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="7" cy="17" r="2.5" />
//           <circle cx="17" cy="17" r="2.5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3v-4l2-5h8l3 5h3v4h-2" />
//           <path strokeLinecap="round" d="M9.5 17h5" />
//         </svg>
//       );

//     case "juonline":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="9" />
//           <path strokeLinecap="round" d="M3 12h18" />
//           <path strokeLinecap="round" d="M12 3a14 14 0 0 1 0 18" />
//           <path strokeLinecap="round" d="M12 3a14 14 0 0 0 0 18" />
//         </svg>
//       );

//     case "entities":
//     case "customers":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="9" cy="8" r="3" />
//           <path strokeLinecap="round" d="M3 21a6 6 0 0 1 12 0" />
//           <path strokeLinecap="round" d="M16 5.5a3 3 0 0 1 0 5.5" />
//           <path strokeLinecap="round" d="M18 15a5 5 0 0 1 3 4" />
//         </svg>
//       );

//     case "vendors":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 2-6h12l2 6" />
//           <path strokeLinecap="round" d="M9 20v-5h6v5" />
//         </svg>
//       );

//     case "captains":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="7" r="3" />
//           <path strokeLinecap="round" d="M5 21a7 7 0 0 1 14 0" />
//           <path strokeLinecap="round" d="M18 8.5a3 3 0 0 1 0 5" />
//           <path strokeLinecap="round" d="M6 8.5a3 3 0 0 0 0 5" />
//         </svg>
//       );

//     case "hierarchy":
//     case "clusters":
//     case "zones":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="8" y="3" width="8" height="5" rx="1" />
//           <rect x="3" y="16" width="7" height="5" rx="1" />
//           <rect x="14" y="16" width="7" height="5" rx="1" />
//           <path strokeLinecap="round" d="M12 8v4M6.5 16v-4h11v4" />
//           <path strokeLinecap="round" d="M12 12H6.5M12 12h5.5" />
//         </svg>
//       );

//     case "commission":
//     case "globalRules":
//     case "nodeOverrides":
//     case "vendorRates":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="8" />
//           <path strokeLinecap="round" d="M12 7v10" />
//           <path strokeLinecap="round" d="M15 9.5c-.8-.8-1.8-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.2-.4-3-1.2" />
//         </svg>
//       );

//     case "finance":
//     case "ledger":
//     case "payouts":
//     case "cashfree":
//     case "settlements":
//     case "refunds":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <rect x="3" y="5" width="18" height="14" rx="2" />
//           <path strokeLinecap="round" d="M3 10h18" />
//           <path strokeLinecap="round" d="M7 15h3" />
//           <path strokeLinecap="round" d="M15 15h2" />
//         </svg>
//       );

//     case "overrides":
//     case "dispatch":
//     case "suspensions":
//     case "cancellations":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 8 5-5 5 5" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m7 16 5 5 5-5" />
//           <circle cx="12" cy="12" r="2" />
//         </svg>
//       );

//     case "audit":
//     case "rbac":
//     case "adminUsers":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
//         </svg>
//       );

//     case "settings":
//       return (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
//           <circle cx="12" cy="12" r="3" />
//           <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V7h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.7V16h-.7a1.7 1.7 0 0 0-1.6 1Z" />
//         </svg>
//       );

//     default:
//       return null;
//   }
// }

// function ChevronDownIcon({ className = "" }: { className?: string }) {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
//       <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
//     </svg>
//   );
// }

// function CloseIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
//       <path strokeLinecap="round" d="M6 6l12 12" />
//       <path strokeLinecap="round" d="M18 6 6 18" />
//     </svg>
//   );
// }

// function ShieldIcon() {
//   return (
//     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
//       <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
//     </svg>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import {
  MODULE_JUCART,
  MODULE_JURIDE,
  MODULE_JUSTAY,
  MODULE_JUHOME,
  MODULE_JUSHOPPING,
  MODULE_JUONLINE,
  JUCART_SERVICES,
  JUCART_SERVICE_LABELS,
  JUSTAY_SERVICES,
  JUSTAY_SERVICE_LABELS,
} from "@/lib/constants/modules";

export type SidebarRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

interface SidebarProps {
  collapsed?: boolean;
  mobileOpen?: boolean;
  onClose?: () => void;
  role?: SidebarRole;
  className?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: SidebarIconName;
  roles?: SidebarRole[];
  badge?: string;
}

interface NavigationSection {
  id: string;
  label: string;
  icon: SidebarIconName;
  items: NavigationItem[];
  roles?: SidebarRole[];
}

type SidebarIconName =
  | "dashboard"
  | "control"
  | "jucart"
  | "justay"
  | "juhome"
  | "jushopping"
  | "juride"
  | "juonline"
  | "entities"
  | "customers"
  | "vendors"
  | "captains"
  | "hierarchy"
  | "clusters"
  | "zones"
  | "commission"
  | "globalRules"
  | "nodeOverrides"
  | "vendorRates"
  | "finance"
  | "ledger"
  | "payouts"
  | "cashfree"
  | "settlements"
  | "refunds"
  | "overrides"
  | "dispatch"
  | "suspensions"
  | "cancellations"
  | "audit"
  | "rbac"
  | "adminUsers"
  | "settings"
  | "orders"
  | "bookings"
  | "rides"
  | "food"
  | "mart"
  | "pharmacy";

const ALL_ROLES: SidebarRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
];

const GOVERNANCE_ROLES: SidebarRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
];

const TECHNICAL_ROLES: SidebarRole[] = [
  "SUPER_ADMIN",
  "TECHNICAL_ADMIN",
];

const COMMISSION_ROLES: SidebarRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
];

/* -------------------------------------------------------------------------- */
/* MODULE SECTIONS                                                            */
/* -------------------------------------------------------------------------- */

const MODULE_SECTIONS: NavigationSection[] = [
  {
    id: "module-jucart",
    label: "JuCart",
    icon: "jucart",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Dashboard",
        href: `/modules/${MODULE_JUCART.toLowerCase()}`,
        icon: "dashboard",
      },
      {
        label: "Orders",
        href: `/modules/${MODULE_JUCART.toLowerCase()}/orders`,
        icon: "orders",
      },
      ...JUCART_SERVICES.map((service) => ({
        label: JUCART_SERVICE_LABELS[service],
        href: `/modules/${MODULE_JUCART.toLowerCase()}/${service.toLowerCase()}`,
        icon: (service === "FOOD"
          ? "food"
          : service === "MART"
            ? "mart"
            : "pharmacy") as SidebarIconName,
      })),
    ],
  },
  {
    id: "module-justay",
    label: "JuStay",
    icon: "justay",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Dashboard",
        href: `/modules/${MODULE_JUSTAY.toLowerCase()}`,
        icon: "dashboard",
      },
      {
        label: "Bookings",
        href: `/modules/${MODULE_JUSTAY.toLowerCase()}/bookings`,
        icon: "bookings",
      },
      ...JUSTAY_SERVICES.map((service) => ({
        label: JUSTAY_SERVICE_LABELS[service],
        href: `/modules/${MODULE_JUSTAY.toLowerCase()}/${service.toLowerCase()}`,
        icon: "justay" as SidebarIconName,
      })),
    ],
  },
  {
    id: "module-juhome",
    label: "JuHome",
    icon: "juhome",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Dashboard",
        href: `/modules/${MODULE_JUHOME.toLowerCase()}`,
        icon: "dashboard",
      },
      {
        label: "Bookings",
        href: `/modules/${MODULE_JUHOME.toLowerCase()}/bookings`,
        icon: "bookings",
      },
      {
        label: "Services",
        href: `/modules/${MODULE_JUHOME.toLowerCase()}/services`,
        icon: "juhome",
      },
    ],
  },
  {
    id: "module-jushopping",
    label: "JuShopping",
    icon: "jushopping",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Dashboard",
        href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}`,
        icon: "dashboard",
      },
      {
        label: "Orders",
        href: `/modules/${MODULE_JUSHOPPING.toLowerCase()}/orders`,
        icon: "orders",
      },
    ],
  },
  {
    id: "module-juride",
    label: "JuRide",
    icon: "juride",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Dashboard",
        href: `/modules/${MODULE_JURIDE.toLowerCase()}`,
        icon: "dashboard",
      },
      {
        label: "Rides",
        href: `/modules/${MODULE_JURIDE.toLowerCase()}/rides`,
        icon: "rides",
      },
      {
        label: "Rentals",
        href: `/modules/${MODULE_JURIDE.toLowerCase()}/rentals`,
        icon: "juride",
      },
      {
        label: "Logistics",
        href: `/modules/${MODULE_JURIDE.toLowerCase()}/logistics`,
        icon: "juride",
      },
      {
        label: "Packers & Movers",
        href: `/modules/${MODULE_JURIDE.toLowerCase()}/packers-movers`,
        icon: "juride",
      },
    ],
  },
  {
    id: "module-juonline",
    label: "JuOnline",
    icon: "juonline",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Coming Soon",
        href: `/modules/${MODULE_JUONLINE.toLowerCase()}`,
        icon: "juonline",
        badge: "Soon",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* GOVERNANCE / OPS                                                           */
/* -------------------------------------------------------------------------- */

const GOVERNANCE_SECTIONS: NavigationSection[] = [
  {
    id: "entity-management",
    label: "Entity Management",
    icon: "entities",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Customers",
        href: "/entity-management/customers",
        icon: "customers",
      },
      {
        label: "Vendors",
        href: "/entity-management/vendors",
        icon: "vendors",
      },
      {
        label: "Captains",
        href: "/entity-management/captains",
        icon: "captains",
      },
    ],
  },
  {
    id: "hierarchy",
    label: "Hierarchy",
    icon: "hierarchy",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Hierarchy",
        href: "/hierarchy",
        icon: "hierarchy",
      },
      {
        label: "Clusters",
        href: "/hierarchy/clusters",
        icon: "clusters",
      },
      {
        label: "Zones",
        href: "/hierarchy/zones",
        icon: "zones",
      },
    ],
  },
  {
    id: "commission-engine",
    label: "Commission Engine",
    icon: "commission",
    roles: COMMISSION_ROLES,
    items: [
      {
        label: "Overview",
        href: "/commission-engine",
        icon: "commission",
        roles: COMMISSION_ROLES,
      },
      {
        label: "Global Rules",
        href: "/commission-engine/global-rules",
        icon: "globalRules",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Node Overrides",
        href: "/commission-engine/node-overrides",
        icon: "nodeOverrides",
        roles: COMMISSION_ROLES,
      },
      {
        label: "Vendor Rates",
        href: "/commission-engine/vendor-rates",
        icon: "vendorRates",
        roles: COMMISSION_ROLES,
      },
    ],
  },
  {
    id: "financial-audit",
    label: "Financial Audit",
    icon: "finance",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Overview",
        href: "/financial-audit",
        icon: "finance",
      },
      {
        label: "General Ledger",
        href: "/financial-audit/general-ledger",
        icon: "ledger",
        roles: ["SUPER_ADMIN", "STATE_ADMIN"],
      },
      {
        label: "Payouts",
        href: "/financial-audit/payouts",
        icon: "payouts",
        roles: ["SUPER_ADMIN", "STATE_ADMIN"],
      },
      {
        label: "Cashfree Reconciliation",
        href: "/financial-audit/cashfree-reconciliation",
        icon: "cashfree",
        roles: ["SUPER_ADMIN"],
      },
      {
        label: "Settlements",
        href: "/financial-audit/settlements",
        icon: "settlements",
      },
      {
        label: "Refunds",
        href: "/financial-audit/refunds",
        icon: "refunds",
        roles: ["SUPER_ADMIN", "STATE_ADMIN"],
      },
    ],
  },
  {
    id: "overrides",
    label: "Overrides",
    icon: "overrides",
    roles: GOVERNANCE_ROLES,
    items: [
      {
        label: "Overview",
        href: "/overrides",
        icon: "overrides",
      },
      {
        label: "Dispatch",
        href: "/overrides/dispatch",
        icon: "dispatch",
      },
      {
        label: "Suspensions",
        href: "/overrides/suspensions",
        icon: "suspensions",
      },
      {
        label: "Cancellations",
        href: "/overrides/cancellations",
        icon: "cancellations",
      },
    ],
  },
  {
    id: "system-audit",
    label: "System Audit",
    icon: "audit",
    roles: TECHNICAL_ROLES,
    items: [
      {
        label: "Audit Overview",
        href: "/system-audit",
        icon: "audit",
      },
      {
        label: "RBAC Roles",
        href: "/system-audit/rbac-roles",
        icon: "rbac",
        roles: TECHNICAL_ROLES,
      },
      {
        label: "Admin Users",
        href: "/system-audit/admin-users",
        icon: "adminUsers",
        roles: ["SUPER_ADMIN"],
      },
    ],
  },
];

const NAVIGATION_SECTIONS: NavigationSection[] = [
  ...MODULE_SECTIONS,
  ...GOVERNANCE_SECTIONS,
];

export default function Sidebar({
  collapsed = false,
  mobileOpen = false,
  onClose,
  role = "DISTRICT_ADMIN",
  className = "",
}: SidebarProps) {
  const pathname = usePathname();

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => getInitialOpenSections(pathname),
  );

  const visibleModuleSections = useMemo(
    () =>
      MODULE_SECTIONS.filter((section) => canAccess(section.roles, role)).map(
        (section) => ({
          ...section,
          items: section.items.filter((item) => canAccess(item.roles, role)),
        }),
      ),
    [role],
  );

  const visibleGovernanceSections = useMemo(
    () =>
      GOVERNANCE_SECTIONS.filter((section) =>
        canAccess(section.roles, role),
      ).map((section) => ({
        ...section,
        items: section.items.filter((item) => canAccess(item.roles, role)),
      })),
    [role],
  );

  const showControlRoom = GOVERNANCE_ROLES.includes(role);

  function toggleSection(sectionId: string) {
    setOpenSections((current) => ({
      ...current,
      [sectionId]: !current[sectionId],
    }));
  }

  function handleNavigation() {
    onClose?.();
  }

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-[130] bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[140] flex w-[280px] flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:static lg:z-auto lg:shadow-none ${
          collapsed ? "lg:w-[76px]" : "lg:w-[280px]"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${className}`}
      >
        {/* BRAND */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-slate-200 ${
            collapsed ? "justify-center px-2" : "justify-between px-4"
          }`}
        >
          <Link
            href="/dashboard"
            onClick={handleNavigation}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
              <span className="text-lg font-black text-white">J</span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-sm font-black tracking-tight text-slate-900">
                  JUERP
                </p>
                <p className="truncate text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  JUONE Administration
                </p>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          {!collapsed && (
            <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Main
            </p>
          )}

          <SidebarNavItem
            item={{
              label: "Dashboard",
              href: "/dashboard",
              icon: "dashboard",
            }}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={handleNavigation}
          />

          {showControlRoom && (
            <SidebarNavItem
              item={{
                label: "Control Room",
                href: "/control-room",
                icon: "control",
              }}
              pathname={pathname}
              collapsed={collapsed}
              onNavigate={handleNavigation}
            />
          )}

          {visibleModuleSections.length > 0 && (
            <>
              <div className="my-4 border-t border-slate-100" />
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Modules
                </p>
              )}
              <div className="space-y-1">
                {visibleModuleSections.map((section) => (
                  <SidebarSection
                    key={section.id}
                    section={section}
                    pathname={pathname}
                    collapsed={collapsed}
                    open={Boolean(openSections[section.id])}
                    onToggle={() => toggleSection(section.id)}
                    onNavigate={handleNavigation}
                  />
                ))}
              </div>
            </>
          )}

          {visibleGovernanceSections.length > 0 && (
            <>
              <div className="my-4 border-t border-slate-100" />
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Operations
                </p>
              )}
              <div className="space-y-1.5">
                {visibleGovernanceSections.map((section) => (
                  <SidebarSection
                    key={section.id}
                    section={section}
                    pathname={pathname}
                    collapsed={collapsed}
                    open={Boolean(openSections[section.id])}
                    onToggle={() => toggleSection(section.id)}
                    onNavigate={handleNavigation}
                  />
                ))}
              </div>
            </>
          )}

          <div className="my-4 border-t border-slate-100" />

          <SidebarNavItem
            item={{
              label: "Settings",
              href: "/settings",
              icon: "settings",
              roles: ALL_ROLES,
            }}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={handleNavigation}
          />
        </nav>

        {/* FOOTER */}
        <div
          className={`shrink-0 border-t border-slate-200 bg-slate-50/70 ${
            collapsed ? "p-2" : "p-3"
          }`}
        >
          {collapsed ? (
            <div
              title={formatRole(role)}
              className="flex h-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"
            >
              <ShieldIcon />
            </div>
          ) : (
            <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
              <p className="text-[10px] font-black uppercase tracking-wider text-orange-700">
                Current Access
              </p>
              <p className="mt-1 text-xs font-black text-slate-900">{role}</p>
              <p className="mt-0.5 truncate text-[11px] text-slate-500">
                {formatRole(role)}
              </p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION                                                                    */
/* -------------------------------------------------------------------------- */

function SidebarSection({
  section,
  pathname,
  collapsed,
  open,
  onToggle,
  onNavigate,
}: {
  section: NavigationSection;
  pathname: string;
  collapsed: boolean;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const sectionActive = section.items.some((item) =>
    isRouteActive(pathname, item.href),
  );

  if (collapsed) {
    return (
      <div className="relative">
        <button
          type="button"
          title={section.label}
          onClick={onToggle}
          className={`group flex h-11 w-full items-center justify-center rounded-xl transition ${
            sectionActive
              ? "bg-orange-50 text-orange-600"
              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
          }`}
        >
          <SidebarIcon name={section.icon} />
          {sectionActive && (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-orange-500" />
          )}
        </button>

        {open && (
          <div className="absolute left-[68px] top-0 z-[160] w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
            <p className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              {section.label}
            </p>
            {section.items.map((item) => (
              <SidebarNavItem
                key={item.href}
                item={item}
                pathname={pathname}
                collapsed={false}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
          sectionActive
            ? "bg-orange-50/80 text-orange-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
        }`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
            sectionActive
              ? "bg-orange-100 text-orange-600"
              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
          }`}
        >
          <SidebarIcon name={section.icon} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-bold">
            {section.label}
          </span>
        </span>

        <ChevronDownIcon
          className={`h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="ml-4 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
          {section.items.map((item) => (
            <SidebarNavItem
              key={item.href}
              item={item}
              pathname={pathname}
              collapsed={false}
              onNavigate={onNavigate}
              nested
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* NAV ITEM                                                                   */
/* -------------------------------------------------------------------------- */

function SidebarNavItem({
  item,
  pathname,
  collapsed,
  onNavigate,
  nested = false,
}: {
  item: NavigationItem;
  pathname: string;
  collapsed: boolean;
  onNavigate: () => void;
  nested?: boolean;
}) {
  const active = isRouteActive(pathname, item.href);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center transition ${
        collapsed
          ? "h-11 justify-center rounded-xl px-2"
          : nested
            ? "min-h-9 rounded-lg px-3"
            : "min-h-11 rounded-xl px-3"
      } ${
        active
          ? "bg-orange-50 text-orange-700"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`}
    >
      {active && (
        <span
          className={`absolute left-0 w-1 rounded-r-full bg-orange-500 ${
            collapsed
              ? "top-1/2 h-6 -translate-y-1/2"
              : "top-1/2 h-5 -translate-y-1/2"
          }`}
        />
      )}

      <span
        className={`flex shrink-0 items-center justify-center ${
          collapsed ? "h-8 w-8" : nested ? "h-7 w-7" : "h-8 w-8"
        } ${
          active
            ? "text-orange-600"
            : "text-slate-400 group-hover:text-slate-600"
        }`}
      >
        <SidebarIcon name={item.icon} />
      </span>

      {!collapsed && (
        <>
          <span
            className={`ml-2 min-w-0 truncate font-semibold ${
              nested ? "text-xs" : "text-sm"
            }`}
          >
            {item.label}
          </span>
          {item.badge && (
            <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700">
              {item.badge}
            </span>
          )}
          {!item.badge && active && (
            <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
          )}
        </>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function canAccess(
  roles: SidebarRole[] | undefined,
  role: SidebarRole,
): boolean {
  if (!roles) return true;
  return roles.includes(role);
}

function formatRole(role: SidebarRole): string {
  switch (role) {
    case "SUPER_ADMIN":
      return "Super Admin";
    case "STATE_ADMIN":
      return "State Admin";
    case "DISTRICT_ADMIN":
      return "District Admin";
    case "TECHNICAL_ADMIN":
      return "Technical Admin";
    default:
      return role;
  }
}

function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === "/dashboard";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function getInitialOpenSections(pathname: string): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  NAVIGATION_SECTIONS.forEach((section) => {
    result[section.id] = section.items.some((item) =>
      isRouteActive(pathname, item.href),
    );
  });
  return result;
}

/* -------------------------------------------------------------------------- */
/* ICONS (same as your original)                                              */
/* -------------------------------------------------------------------------- */

function SidebarIcon({ name }: { name: SidebarIconName }) {
  const common = "h-4 w-4";

  switch (name) {
    case "dashboard":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "control":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" d="M4 19V5" />
          <path strokeLinecap="round" d="M4 19h16" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m7 15 3-4 3 2 5-7" />
          <circle cx="18" cy="6" r="1" />
        </svg>
      );
    case "jucart":
    case "food":
    case "mart":
    case "pharmacy":
    case "orders":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="17" cy="20" r="1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h2l2.4 12h10.2l2-8H7" />
        </svg>
      );
    case "justay":
    case "bookings":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 4l9 6.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v9h14v-9" />
          <path strokeLinecap="round" d="M10 19v-5h4v5" />
        </svg>
      );
    case "juhome":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 11 12 4l9 7" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
          <path strokeLinecap="round" d="M9 20v-6h6v6" />
        </svg>
      );
    case "jushopping":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 11H7L6 8Z" />
          <path strokeLinecap="round" d="M9 8V7a3 3 0 0 1 6 0v1" />
        </svg>
      );
    case "juride":
    case "rides":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="7" cy="17" r="2.5" />
          <circle cx="17" cy="17" r="2.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3v-4l2-5h8l3 5h3v4h-2" />
          <path strokeLinecap="round" d="M9.5 17h5" />
        </svg>
      );
    case "juonline":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" d="M3 12h18" />
          <path strokeLinecap="round" d="M12 3a14 14 0 0 1 0 18" />
          <path strokeLinecap="round" d="M12 3a14 14 0 0 0 0 18" />
        </svg>
      );
    case "entities":
    case "customers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="9" cy="8" r="3" />
          <path strokeLinecap="round" d="M3 21a6 6 0 0 1 12 0" />
          <path strokeLinecap="round" d="M16 5.5a3 3 0 0 1 0 5.5" />
          <path strokeLinecap="round" d="M18 15a5 5 0 0 1 3 4" />
        </svg>
      );
    case "vendors":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h14V10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4 10 2-6h12l2 6" />
          <path strokeLinecap="round" d="M9 20v-5h6v5" />
        </svg>
      );
    case "captains":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="12" cy="7" r="3" />
          <path strokeLinecap="round" d="M5 21a7 7 0 0 1 14 0" />
          <path strokeLinecap="round" d="M18 8.5a3 3 0 0 1 0 5" />
          <path strokeLinecap="round" d="M6 8.5a3 3 0 0 0 0 5" />
        </svg>
      );
    case "hierarchy":
    case "clusters":
    case "zones":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <rect x="8" y="3" width="8" height="5" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
          <rect x="14" y="16" width="7" height="5" rx="1" />
          <path strokeLinecap="round" d="M12 8v4M6.5 16v-4h11v4" />
          <path strokeLinecap="round" d="M12 12H6.5M12 12h5.5" />
        </svg>
      );
    case "commission":
    case "globalRules":
    case "nodeOverrides":
    case "vendorRates":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path strokeLinecap="round" d="M12 7v10" />
          <path strokeLinecap="round" d="M15 9.5c-.8-.8-1.8-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.2-.4-3-1.2" />
        </svg>
      );
    case "finance":
    case "ledger":
    case "payouts":
    case "cashfree":
    case "settlements":
    case "refunds":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path strokeLinecap="round" d="M3 10h18" />
          <path strokeLinecap="round" d="M7 15h3" />
          <path strokeLinecap="round" d="M15 15h2" />
        </svg>
      );
    case "overrides":
    case "dispatch":
    case "suspensions":
    case "cancellations":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m7 8 5-5 5 5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m7 16 5 5 5-5" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "audit":
    case "rbac":
    case "adminUsers":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
        </svg>
      );
    case "settings":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={common} aria-hidden="true">
          <circle cx="12" cy="12" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V22h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 19l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6v-2.4h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 10.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V7h2.4v.7a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.7V16h-.7a1.7 1.7 0 0 0-1.6 1Z" />
        </svg>
      );
    default:
      return null;
  }
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" d="M6 6l12 12" />
      <path strokeLinecap="round" d="M18 6 6 18" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </svg>
  );
}