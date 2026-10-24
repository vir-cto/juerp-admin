// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       {
//         label: "Dashboard",
//         href: "/dashboard",
//         icon: "⌂",
//       },
//       {
//         label: "Control Room",
//         href: "/control-room",
//         icon: "◉",
//       },
//     ],
//   },

//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       {
//         label: "Customers",
//         href: "/entity-management/customers",
//         icon: "👤",
//       },
//       {
//         label: "Vendors",
//         href: "/entity-management/vendors",
//         icon: "🏪",
//       },
//       {
//         label: "Captains",
//         href: "/entity-management/captains",
//         icon: "🚗",
//       },
//     ],
//   },

//   {
//     title: "HIERARCHY",
//     items: [
//       {
//         label: "Hierarchy",
//         href: "/hierarchy",
//         icon: "⌘",
//       },
//       {
//         label: "Clusters",
//         href: "/hierarchy/clusters",
//         icon: "▦",
//       },
//       {
//         label: "Zones",
//         href: "/hierarchy/zones",
//         icon: "◎",
//       },
//     ],
//   },

//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       {
//         label: "Commission Engine",
//         href: "/commission-engine",
//         icon: "%",
//       },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },

//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       {
//         label: "Financial Audit",
//         href: "/financial-audit",
//         icon: "₹",
//       },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       {
//         label: "Payouts",
//         href: "/financial-audit/payouts",
//         icon: "P",
//       },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       {
//         label: "Refunds",
//         href: "/financial-audit/refunds",
//         icon: "R",
//       },
//     ],
//   },

//   {
//     title: "OVERRIDES",
//     items: [
//       {
//         label: "Overrides",
//         href: "/overrides",
//         icon: "⚡",
//       },
//       {
//         label: "Dispatch",
//         href: "/overrides/dispatch",
//         icon: "D",
//       },
//       {
//         label: "Suspensions",
//         href: "/overrides/suspensions",
//         icon: "!",
//       },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },

//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       {
//         label: "System Audit",
//         href: "/system-audit",
//         icon: "🛡",
//       },
//       {
//         label: "RBAC Roles",
//         href: "/system-audit/rbac-roles",
//         icon: "🔐",
//       },
//     ],
//   },

//   {
//     title: "ADMINISTRATION",
//     items: [
//       {
//         label: "Settings",
//         href: "/settings",
//         icon: "⚙",
//       },
//     ],
//   },
// ];

// function isActivePath(
//   pathname: string,
//   href: string
// ) {
//   if (href === "/dashboard") {
//     return pathname === "/dashboard";
//   }

//   return (
//     pathname === href ||
//     pathname.startsWith(`${href}/`)
//   );
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [sidebarOpen, setSidebarOpen] =
//     useState(false);

//   const [collapsed, setCollapsed] =
//     useState(false);

//   const [userMenuOpen, setUserMenuOpen] =
//     useState(false);

//   const [currentTime, setCurrentTime] =
//     useState("");

//   useEffect(() => {
//     function updateTime() {
//       const now = new Date();

//       setCurrentTime(
//         now.toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }

//     updateTime();

//     const timer = window.setInterval(
//       updateTime,
//       30000
//     );

//     return () => {
//       window.clearInterval(timer);
//     };
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of MENU_SECTIONS) {
//       for (const item of section.items) {
//         if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }

//     return null;
//   }, [pathname]);

//   function handleLogout() {
//     try {
//       sessionStorage.removeItem("juerp_session");
//     } catch {
//       // Ignore sessionStorage errors.
//     }

//     router.push("/login");
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   return (
//     <div className="min-h-screen bg-slate-100">

//       {/* MOBILE OVERLAY */}

//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       {/* SIDEBAR */}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed
//             ? "w-20"
//             : "w-72"
//         } ${
//           sidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }`}
//       >

//         {/* LOGO */}

//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">

//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >

//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>

//             {!collapsed && (
//               <div className="min-w-0">

//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>

//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>

//               </div>
//             )}

//           </Link>

//           {/* MOBILE CLOSE */}

//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>

//         </div>

//         {/* SIDEBAR MENU */}

//         <nav className="flex-1 overflow-y-auto px-3 py-4">

//           {MENU_SECTIONS.map((section) => (
//             <div
//               key={section.title}
//               className="mb-5"
//             >

//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}

//               {collapsed && (
//                 <div className="mb-2 border-t border-slate-100" />
//               )}

//               <div className="space-y-1">

//                 {section.items.map((item) => {
//                   const active = isActivePath(
//                     pathname,
//                     item.href
//                   );

//                   return (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       onClick={closeMobileSidebar}
//                       title={
//                         collapsed
//                           ? item.label
//                           : undefined
//                       }
//                       className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                         active
//                           ? "bg-orange-50 font-bold text-orange-600"
//                           : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                       }`}
//                     >

//                       <span
//                         className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                           active
//                             ? "bg-orange-100 text-orange-600"
//                             : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                         }`}
//                       >
//                         {item.icon}
//                       </span>

//                       {!collapsed && (
//                         <span className="truncate">
//                           {item.label}
//                         </span>
//                       )}

//                     </Link>
//                   );
//                 })}

//               </div>

//             </div>
//           ))}

//         </nav>

//         {/* SIDEBAR FOOTER */}

//         <div className="border-t border-slate-200 p-3">

//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">

//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>

//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 SUPER_ADMIN
//               </p>

//               <p className="mt-1 text-[10px] text-slate-400">
//                 Global administrative scope
//               </p>

//             </div>
//           )}

//           <button
//             type="button"
//             onClick={() =>
//               setCollapsed(!collapsed)
//             }
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed
//               ? "→"
//               : "← Collapse Sidebar"}
//           </button>

//         </div>

//       </aside>

//       {/* MAIN AREA */}

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed
//             ? "lg:pl-20"
//             : "lg:pl-72"
//         }`}
//       >

//         {/* TOP HEADER */}

//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">

//             {/* LEFT */}

//             <div className="flex min-w-0 items-center gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setSidebarOpen(true)
//                 }
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setCollapsed(!collapsed)
//                 }
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>

//               <div className="min-w-0">

//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>

//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ??
//                     "JUERP Administration"}
//                 </h2>

//               </div>

//             </div>

//             {/* RIGHT */}

//             <div className="flex items-center gap-2 md:gap-4">

//               {/* SYSTEM STATUS */}

//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">

//                 <span className="h-2 w-2 rounded-full bg-green-500" />

//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>

//               </div>

//               {/* TIME */}

//               {currentTime && (
//                 <div className="hidden text-right lg:block">

//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>

//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>

//                 </div>
//               )}

//               {/* USER MENU */}

//               <div className="relative">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setUserMenuOpen(
//                       !userMenuOpen
//                     )
//                   }
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >

//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     JA
//                   </div>

//                   <div className="hidden text-left sm:block">

//                     <p className="text-xs font-bold text-slate-800">
//                       JUERP Admin
//                     </p>

//                     <p className="text-[10px] text-slate-400">
//                       SUPER_ADMIN
//                     </p>

//                   </div>

//                   <span className="hidden text-slate-400 sm:block">
//                     ▾
//                   </span>

//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

//                     <div className="border-b border-slate-100 p-4">

//                       <p className="text-xs font-bold text-slate-800">
//                         JUERP Admin
//                       </p>

//                       <p className="mt-1 text-[10px] text-slate-400">
//                         admin@juone.in
//                       </p>

//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         SUPER_ADMIN
//                       </span>

//                     </div>

//                     <Link
//                       href="/settings"
//                       onClick={() =>
//                         setUserMenuOpen(false)
//                       }
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>

//                     <button
//                       type="button"
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
//                     >
//                       ↪ Sign Out
//                     </button>

//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>

//         </header>

//         {/* PAGE CONTENT */}

//         <main className="min-h-[calc(100vh-5rem)]">
//           {children}
//         </main>

//       </div>

//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       { label: "Customers", href: "/entity-management/customers", icon: "👤" },
//       { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
//       { label: "Captains", href: "/entity-management/captains", icon: "🚗" },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       { label: "Commission Engine", href: "/commission-engine", icon: "%" },
//       { label: "Global Rules", href: "/commission-engine/global-rules", icon: "G" },
//       { label: "Node Overrides", href: "/commission-engine/node-overrides", icon: "N" },
//       { label: "Vendor Rates", href: "/commission-engine/vendor-rates", icon: "V" },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       { label: "General Ledger", href: "/financial-audit/general-ledger", icon: "L" },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       { label: "Cashfree Reconciliation", href: "/financial-audit/cashfree-reconciliation", icon: "C" },
//       { label: "Settlements", href: "/financial-audit/settlements", icon: "S" },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       { label: "Cancellations", href: "/overrides/cancellations", icon: "×" },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       { label: "Admin Users", href: "/system-audit/admin-users", icon: "👤" },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of MENU_SECTIONS) {
//       for (const item of section.items) {
//         if (isActivePath(pathname, item.href)) return item;
//       }
//     }
//     return null;
//   }, [pathname]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">JUERP</p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {MENU_SECTIONS.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && <div className="mb-2 border-t border-slate-100" />}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const active = isActivePath(pathname, item.href);
//                   return (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       onClick={closeMobileSidebar}
//                       title={collapsed ? item.label : undefined}
//                       className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                         active
//                           ? "bg-orange-50 font-bold text-orange-600"
//                           : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                       }`}
//                     >
//                       <span
//                         className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                           active
//                             ? "bg-orange-100 text-orange-600"
//                             : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                         }`}
//                       >
//                         {item.icon}
//                       </span>
//                       {!collapsed && <span className="truncate">{item.label}</span>}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">{roleLabel(role)}</p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">System Operational</span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">Current Time</p>
//                   <p className="text-xs font-semibold text-slate-700">{currentTime}</p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">{displayName}</p>
//                     <p className="text-[10px] text-slate-400">{roleLabel(role)}</p>
//                   </div>
//                   <span className="hidden text-slate-400 sm:block">▾</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-xs font-bold text-slate-800">{displayName}</p>
//                       <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                     >
//                       {loggingOut ? "Signing out…" : "↪ Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "MODULES",
//     items: [
//       { label: "JuCart", href: "/modules/jucart", icon: "🛒" },
//       { label: "JuStay", href: "/modules/justay", icon: "🏨" },
//       { label: "JuHome", href: "/modules/juhome", icon: "🏠" },
//       { label: "JuShopping", href: "/modules/jushopping", icon: "🛍️" },
//       { label: "JuRide", href: "/modules/juride", icon: "🚗" },
//       // later: JuStay, JuHome, JuShopping, JuRide
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       { label: "Customers", href: "/entity-management/customers", icon: "👤" },
//       { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
//       { label: "Captains", href: "/entity-management/captains", icon: "🚗" },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       { label: "Commission Engine", href: "/commission-engine", icon: "%" },
//       { label: "Global Rules", href: "/commission-engine/global-rules", icon: "G" },
//       { label: "Node Overrides", href: "/commission-engine/node-overrides", icon: "N" },
//       { label: "Vendor Rates", href: "/commission-engine/vendor-rates", icon: "V" },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       { label: "General Ledger", href: "/financial-audit/general-ledger", icon: "L" },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       { label: "Settlements", href: "/financial-audit/settlements", icon: "S" },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       { label: "Cancellations", href: "/overrides/cancellations", icon: "×" },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       { label: "Admin Users", href: "/system-audit/admin-users", icon: "👤" },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }
//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (s) => s.items.length > 0 || s.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (isActivePath(pathname, item.href)) return item;
//       }
//     }
//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && <div className="mb-2 border-t border-slate-100" />}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const active = isActivePath(pathname, item.href);
//                   return (
//                     <Link
//                       key={item.href}
//                       href={item.href}
//                       onClick={closeMobileSidebar}
//                       title={collapsed ? item.label : undefined}
//                       className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                         active
//                           ? "bg-orange-50 font-bold text-orange-600"
//                           : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                       }`}
//                     >
//                       <span
//                         className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                           active
//                             ? "bg-orange-100 text-orange-600"
//                             : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                         }`}
//                       >
//                         {item.icon}
//                       </span>
//                       {!collapsed && (
//                         <span className="truncate">{item.label}</span>
//                       )}
//                     </Link>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>
//                   <span className="hidden text-slate-400 sm:block">▾</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-xs font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-[10px] text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                     >
//                       {loggingOut ? "Signing out…" : "↪ Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuChild = {
//   label: string;
//   href: string;
// };

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
//   children?: MenuChild[];
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "MODULES",
//     items: [
//       { label: "JuCart", href: "/modules/jucart", icon: "🛒" },
//       { label: "JuStay", href: "/modules/justay", icon: "🏨" },
//       { label: "JuHome", href: "/modules/juhome", icon: "🏠" },
//       { label: "JuShopping", href: "/modules/jushopping", icon: "🛍️" },
//       {
//         label: "JuRide",
//         href: "/modules/juride",
//         icon: "🚗",
//         children: [
//           { label: "Overview", href: "/modules/juride" },
//           { label: "Rides", href: "/modules/juride/rides" },
//           { label: "Captains", href: "/modules/juride/captains" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       { label: "Customers", href: "/entity-management/customers", icon: "👤" },
//       { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
//       // Captains moved under MODULES → JuRide
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       { label: "Commission Engine", href: "/commission-engine", icon: "%" },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "👤",
//       },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   if (href === "/modules/juride") {
//     return pathname === "/modules/juride";
//   }
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function itemIsActive(pathname: string, item: MenuItem) {
//   if (item.children?.length) {
//     return item.children.some(
//       (c) =>
//         pathname === c.href ||
//         (c.href !== "/modules/juride" && pathname.startsWith(`${c.href}/`))
//     );
//   }
//   return isActivePath(pathname, item.href);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   // Keep JuRide open when on any /modules/juride* route
//   useEffect(() => {
//     if (pathname.startsWith("/modules/juride")) {
//       setOpenModules((prev) => ({ ...prev, JuRide: true }));
//     }
//   }, [pathname]);

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }
//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (s) => s.items.length > 0 || s.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (item.children?.length) {
//           for (const child of item.children) {
//             if (
//               pathname === child.href ||
//               (child.href !== item.href &&
//                 pathname.startsWith(`${child.href}/`))
//             ) {
//               return { label: `${item.label} · ${child.label}`, href: child.href };
//             }
//           }
//           if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
//             return item;
//           }
//         } else if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }
//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && <div className="mb-2 border-t border-slate-100" />}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const hasChildren = Boolean(item.children?.length);
//                   const active = itemIsActive(pathname, item);
//                   const expanded =
//                     openModules[item.label] ??
//                     (hasChildren && active);

//                   if (!hasChildren) {
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={closeMobileSidebar}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <span className="truncate">{item.label}</span>
//                         )}
//                       </Link>
//                     );
//                   }

//                   // Parent with children (JuRide)
//                   return (
//                     <div key={item.label} className="space-y-0.5">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (collapsed) {
//                             router.push(item.href);
//                             closeMobileSidebar();
//                             return;
//                           }
//                           setOpenModules((prev) => ({
//                             ...prev,
//                             [item.label]: !expanded,
//                           }));
//                         }}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
//                           active
//                             ? "bg-blue-50 font-bold text-blue-700"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-blue-100 text-blue-700"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <>
//                             <span className="min-w-0 flex-1 truncate">
//                               {item.label}
//                             </span>
//                             <span
//                               className={`text-[10px] text-slate-400 transition-transform duration-200 ${
//                                 expanded ? "rotate-180" : ""
//                               }`}
//                             >
//                               ▼
//                             </span>
//                           </>
//                         )}
//                       </button>

//                       {!collapsed && expanded && item.children && (
//                         <div className="ml-4 space-y-0.5 border-l-2 border-blue-100 pl-2">
//                           {item.children.map((child) => {
//                             const childActive =
//                               pathname === child.href ||
//                               (child.href !== item.href &&
//                                 pathname.startsWith(`${child.href}/`));
//                             return (
//                               <Link
//                                 key={child.href}
//                                 href={child.href}
//                                 onClick={closeMobileSidebar}
//                                 className={`block rounded-lg px-3 py-2 text-xs font-semibold transition ${
//                                   childActive
//                                     ? "bg-blue-50 text-blue-700"
//                                     : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
//                                 }`}
//                               >
//                                 {child.label}
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>
//                   <span className="hidden text-slate-400 sm:block">▾</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-xs font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-[10px] text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                     >
//                       {loggingOut ? "Signing out…" : "↪ Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuChild = {
//   label: string;
//   href: string;
// };

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
//   children?: MenuChild[];
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   // {
//   //   title: "MODULES",
//   //   items: [
//   //     { label: "JuCart", href: "/modules/jucart", icon: "🛒" },
//   //     { label: "JuStay", href: "/modules/justay", icon: "🏨" },
//   //     { label: "JuHome", href: "/modules/juhome", icon: "🏠" },
//   //     { label: "JuShopping", href: "/modules/jushopping", icon: "🛍️" },
//   //     {
//   //       label: "JuRide",
//   //       href: "/modules/juride",
//   //       icon: "🚗",
//   //       children: [
//   //         { label: "Overview", href: "/modules/juride" },
//   //         { label: "Rides", href: "/modules/juride/rides" },
//   //         { label: "Captains", href: "/modules/juride/captains" },
//   //       ],
//   //     },
//   //   ],
//   // },

//     {
//     title: "MODULES",
//     items: [
//       {
//         label: "JuCart",
//         href: "/modules/jucart",
//         icon: "🛒",
//         children: [
//           { label: "Dashboard", href: "/modules/jucart" },
//           { label: "Orders", href: "/modules/jucart/orders" },
//           { label: "Food", href: "/modules/jucart/food" },
//           { label: "Mart", href: "/modules/jucart/mart" },
//           { label: "Pharmacy", href: "/modules/jucart/pharmacy" },
//         ],
//       },
//       {
//         label: "JuStay",
//         href: "/modules/justay",
//         icon: "🏨",
//         children: [
//           { label: "Dashboard", href: "/modules/justay" },
//           { label: "Bookings", href: "/modules/justay/bookings" },
//           { label: "Hostel / PG", href: "/modules/justay/hostel-pg" },
//           { label: "Halls", href: "/modules/justay/halls" },
//           { label: "Tourism", href: "/modules/justay/tourism" },
//         ],
//       },
//       {
//         label: "JuHome",
//         href: "/modules/juhome",
//         icon: "🏠",
//         children: [
//           { label: "Dashboard", href: "/modules/juhome" },
//           { label: "Bookings", href: "/modules/juhome/bookings" },
//           { label: "Services", href: "/modules/juhome/services" },
//         ],
//       },
//       {
//         label: "JuShopping",
//         href: "/modules/jushopping",
//         icon: "🛍️",
//         children: [
//           { label: "Dashboard", href: "/modules/jushopping" },
//           { label: "Orders", href: "/modules/jushopping/orders" },
//           { label: "Vendors", href: "/modules/jushopping/vendors" },
//         ],
//       },
//       {
//         label: "JuRide",
//         href: "/modules/juride",
//         icon: "🚗",
//         children: [
//           { label: "Dashboard", href: "/modules/juride" },
//           { label: "Rides", href: "/modules/juride/rides" },
//           { label: "Captains", href: "/modules/juride/captains" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       { label: "Customers", href: "/entity-management/customers", icon: "👤" },
//       { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       { label: "Commission Engine", href: "/commission-engine", icon: "%" },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "👤",
//       },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   if (href === "/modules/juride") {
//     return pathname === "/modules/juride";
//   }
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function itemIsActive(pathname: string, item: MenuItem) {
//   if (item.children?.length) {
//     return item.children.some(
//       (c) =>
//         pathname === c.href ||
//         (c.href !== "/modules/juride" && pathname.startsWith(`${c.href}/`))
//     );
//   }
//   return isActivePath(pathname, item.href);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   useEffect(() => {
//     if (pathname.startsWith("/modules/juride")) {
//       setOpenModules((prev) => ({ ...prev, JuRide: true }));
//     }
//   }, [pathname]);

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }
//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (s) => s.items.length > 0 || s.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (item.children?.length) {
//           for (const child of item.children) {
//             if (
//               pathname === child.href ||
//               (child.href !== item.href &&
//                 pathname.startsWith(`${child.href}/`))
//             ) {
//               return {
//                 label: `${item.label} · ${child.label}`,
//                 href: child.href,
//               };
//             }
//           }
//           if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
//             return item;
//           }
//         } else if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }
//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && <div className="mb-2 border-t border-slate-100" />}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const hasChildren = Boolean(item.children?.length);
//                   const active = itemIsActive(pathname, item);
//                   const expanded =
//                     openModules[item.label] ?? (hasChildren && active);

//                   if (!hasChildren) {
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={closeMobileSidebar}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <span className="truncate">{item.label}</span>
//                         )}
//                       </Link>
//                     );
//                   }

//                   // Parent with children (JuRide) — panel submenu
//                   return (
//                     <div key={item.label} className="space-y-1.5">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (collapsed) {
//                             router.push(item.href);
//                             closeMobileSidebar();
//                             return;
//                           }
//                           setOpenModules((prev) => ({
//                             ...prev,
//                             [item.label]: !expanded,
//                           }));
//                         }}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <>
//                             <span className="min-w-0 flex-1 truncate">
//                               {item.label}
//                             </span>
//                             <span
//                               className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] transition ${
//                                 expanded
//                                   ? "rotate-180 bg-orange-100 text-orange-600"
//                                   : "bg-slate-100 text-slate-400"
//                               }`}
//                             >
//                               ▾
//                             </span>
//                           </>
//                         )}
//                       </button>

//                       {!collapsed && expanded && item.children && (
//                         <div className="mx-1 rounded-xl bg-slate-50 p-1.5 ring-1 ring-slate-100">
//                           {item.children.map((child) => {
//                             const childActive =
//                               pathname === child.href ||
//                               (child.href !== item.href &&
//                                 pathname.startsWith(`${child.href}/`));
//                             return (
//                               <Link
//                                 key={child.href}
//                                 href={child.href}
//                                 onClick={closeMobileSidebar}
//                                 className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition ${
//                                   childActive
//                                     ? "bg-white font-bold text-orange-600 shadow-sm ring-1 ring-orange-100"
//                                     : "font-semibold text-slate-500 hover:bg-white/80 hover:text-slate-800"
//                                 }`}
//                               >
//                                 <span
//                                   className={`h-1.5 w-1.5 shrink-0 rounded-full ${
//                                     childActive
//                                       ? "bg-orange-500"
//                                       : "bg-slate-300"
//                                   }`}
//                                 />
//                                 {child.label}
//                               </Link>
//                             );
//                           })}
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>
//                   <span className="hidden text-slate-400 sm:block">▾</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-xs font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-[10px] text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                     >
//                       {loggingOut ? "Signing out…" : "↪ Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuChild = {
//   label: string;
//   href: string;
// };

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
//   children?: MenuChild[];
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MODULE_ROOTS = [
//   "/modules/jucart",
//   "/modules/justay",
//   "/modules/juhome",
//   "/modules/jushopping",
//   "/modules/juride",
// ] as const;

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "MODULES",
//     items: [
//       {
//         label: "JuCart",
//         href: "/modules/jucart",
//         icon: "🛒",
//         children: [
//           { label: "Dashboard", href: "/modules/jucart" },
//           { label: "Orders", href: "/modules/jucart/orders" },
//           { label: "Food", href: "/modules/jucart/food" },
//           { label: "Mart", href: "/modules/jucart/mart" },
//           { label: "Pharmacy", href: "/modules/jucart/pharmacy" },
//         ],
//       },
//       {
//         label: "JuStay",
//         href: "/modules/justay",
//         icon: "🏨",
//         children: [
//           { label: "Dashboard", href: "/modules/justay" },
//           { label: "Bookings", href: "/modules/justay/bookings" },
//           { label: "Hostel / PG", href: "/modules/justay/hostel-pg" },
//           { label: "Halls", href: "/modules/justay/halls" },
//           { label: "Tourism", href: "/modules/justay/tourism" },
//         ],
//       },
//       {
//         label: "JuHome",
//         href: "/modules/juhome",
//         icon: "🏠",
//         children: [
//           { label: "Dashboard", href: "/modules/juhome" },
//           { label: "Bookings", href: "/modules/juhome/bookings" },
//           { label: "Services", href: "/modules/juhome/services" },
//         ],
//       },
//       {
//         label: "JuShopping",
//         href: "/modules/jushopping",
//         icon: "🛍️",
//         children: [
//           { label: "Dashboard", href: "/modules/jushopping" },
//           { label: "Orders", href: "/modules/jushopping/orders" },
//           { label: "Vendors", href: "/modules/jushopping/vendors" },
//         ],
//       },
//       {
//         label: "JuRide",
//         href: "/modules/juride",
//         icon: "🚗",
//         children: [
//           { label: "Dashboard", href: "/modules/juride" },
//           { label: "Rides", href: "/modules/juride/rides" },
//           { label: "Captains", href: "/modules/juride/captains" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       { label: "Customers", href: "/entity-management/customers", icon: "👤" },
//       { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       { label: "Commission Engine", href: "/commission-engine", icon: "%" },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "👤",
//       },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isModuleDashboard(href: string) {
//   return (MODULE_ROOTS as readonly string[]).includes(href);
// }

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   if (isModuleDashboard(href)) return pathname === href;
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function itemIsActive(pathname: string, item: MenuItem) {
//   if (item.children?.length) {
//     return (
//       pathname === item.href ||
//       pathname.startsWith(`${item.href}/`) ||
//       item.children.some(
//         (c) =>
//           pathname === c.href ||
//           (c.href !== item.href && pathname.startsWith(`${c.href}/`))
//       )
//     );
//   }
//   return isActivePath(pathname, item.href);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   useEffect(() => {
//     const map: Record<string, string> = {
//       JuCart: "/modules/jucart",
//       JuStay: "/modules/justay",
//       JuHome: "/modules/juhome",
//       JuShopping: "/modules/jushopping",
//       JuRide: "/modules/juride",
//     };
//     for (const [label, root] of Object.entries(map)) {
//       if (pathname === root || pathname.startsWith(`${root}/`)) {
//         setOpenModules((prev) => ({ ...prev, [label]: true }));
//       }
//     }
//   }, [pathname]);

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }
//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (s) => s.items.length > 0 || s.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }
//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (item.children?.length) {
//           for (const child of item.children) {
//             if (
//               pathname === child.href ||
//               (child.href !== item.href &&
//                 pathname.startsWith(`${child.href}/`))
//             ) {
//               return {
//                 label: `${item.label} · ${child.label}`,
//                 href: child.href,
//               };
//             }
//           }
//           if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
//             return item;
//           }
//         } else if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }
//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && <div className="mb-2 border-t border-slate-100" />}
//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const hasChildren = Boolean(item.children?.length);
//                   const active = itemIsActive(pathname, item);
//                   const expanded =
//                     openModules[item.label] ?? (hasChildren && active);

//                   if (!hasChildren) {
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={closeMobileSidebar}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <span className="truncate">{item.label}</span>
//                         )}
//                       </Link>
//                     );
//                   }

//                   // Expandable module — accordion style
//                   return (
//                     <div key={item.label} className="overflow-hidden rounded-xl">
//                       <button
//                         type="button"
//                         onClick={() => {
//                           if (collapsed) {
//                             router.push(item.href);
//                             closeMobileSidebar();
//                             return;
//                           }
//                           setOpenModules((prev) => ({
//                             ...prev,
//                             [item.label]: !expanded,
//                           }));
//                         }}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         } ${expanded ? "rounded-t-xl" : "rounded-xl"}`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <>
//                             <span className="min-w-0 flex-1 truncate">
//                               {item.label}
//                             </span>
//                             <span
//                               className={`text-[9px] font-bold transition-transform duration-200 ${
//                                 expanded
//                                   ? "rotate-180 text-orange-500"
//                                   : "text-slate-400"
//                               }`}
//                             >
//                               ▾
//                             </span>
//                           </>
//                         )}
//                       </button>

//                       {!collapsed && (
//                         <div
//                           className={`grid transition-[grid-template-rows] duration-200 ease-out ${
//                             expanded
//                               ? "grid-rows-[1fr]"
//                               : "grid-rows-[0fr]"
//                           }`}
//                         >
//                           <div className="overflow-hidden">
//                             <div className="space-y-0.5 border-l-2 border-orange-200 bg-gradient-to-b from-orange-50/80 to-white py-1.5 pl-2 pr-1.5">
//                               {item.children!.map((child) => {
//                                 const childActive =
//                                   pathname === child.href ||
//                                   (child.href !== item.href &&
//                                     pathname.startsWith(`${child.href}/`));
//                                 return (
//                                   <Link
//                                     key={child.href}
//                                     href={child.href}
//                                     onClick={closeMobileSidebar}
//                                     className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[11px] transition ${
//                                       childActive
//                                         ? "bg-orange-500 font-bold text-white shadow-sm shadow-orange-200"
//                                         : "font-semibold text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm"
//                                     }`}
//                                   >
//                                     <span
//                                       className={`h-1 w-1 shrink-0 rounded-full ${
//                                         childActive
//                                           ? "bg-white"
//                                           : "bg-slate-300"
//                                       }`}
//                                     />
//                                     {child.label}
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">{email}</p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>
//                   <span className="hidden text-slate-400 sm:block">▾</span>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-xs font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-[10px] text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-[9px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="block px-4 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//                     >
//                       ⚙ Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="w-full border-t border-slate-100 px-4 py-3 text-left text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
//                     >
//                       {loggingOut ? "Signing out…" : "↪ Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuChild = {
//   label: string;
//   href: string;
// };

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
//   children?: MenuChild[];
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MODULE_ROOTS = [
//   "/modules/jucart",
//   "/modules/justay",
//   "/modules/juhome",
//   "/modules/jushopping",
//   "/modules/juride",
// ] as const;

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "MODULES",
//     items: [
//       {
//         label: "JuCart",
//         href: "/modules/jucart",
//         icon: "🛒",
//         children: [
//           { label: "Dashboard", href: "/modules/jucart" },
//           { label: "Orders", href: "/modules/jucart/orders" },
//           { label: "Food", href: "/modules/jucart/food" },
//           { label: "Mart", href: "/modules/jucart/mart" },
//           { label: "Pharmacy", href: "/modules/jucart/pharmacy" },
//         ],
//       },
//       {
//         label: "JuStay",
//         href: "/modules/justay",
//         icon: "🏨",
//         children: [
//           { label: "Dashboard", href: "/modules/justay" },
//           { label: "Bookings", href: "/modules/justay/bookings" },
//           { label: "Hostel / PG", href: "/modules/justay/hostel-pg" },
//           { label: "Halls", href: "/modules/justay/halls" },
//           { label: "Tourism", href: "/modules/justay/tourism" },
//         ],
//       },
//       {
//         label: "JuHome",
//         href: "/modules/juhome",
//         icon: "🏠",
//         children: [
//           { label: "Dashboard", href: "/modules/juhome" },
//           { label: "Bookings", href: "/modules/juhome/bookings" },
//           { label: "Services", href: "/modules/juhome/services" },
//         ],
//       },
//       {
//         label: "JuShopping",
//         href: "/modules/jushopping",
//         icon: "🛍️",
//         children: [
//           { label: "Dashboard", href: "/modules/jushopping" },
//           { label: "Orders", href: "/modules/jushopping/orders" },
//           { label: "Vendors", href: "/modules/jushopping/vendors" },
//         ],
//       },
//       {
//         label: "JuRide",
//         href: "/modules/juride",
//         icon: "🚗",
//         children: [
//           { label: "Dashboard", href: "/modules/juride" },
//           { label: "Rides", href: "/modules/juride/rides" },
//           { label: "Captains", href: "/modules/juride/captains" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       {
//         label: "Customers",
//         href: "/entity-management/customers",
//         icon: "👤",
//       },
//       {
//         label: "Vendors",
//         href: "/entity-management/vendors",
//         icon: "🏪",
//       },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       {
//         label: "Commission Engine",
//         href: "/commission-engine",
//         icon: "%",
//       },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "👤",
//       },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isModuleDashboard(href: string) {
//   return (MODULE_ROOTS as readonly string[]).includes(href);
// }

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   if (isModuleDashboard(href)) return pathname === href;

//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function itemIsActive(pathname: string, item: MenuItem) {
//   if (item.children?.length) {
//     return (
//       pathname === item.href ||
//       pathname.startsWith(`${item.href}/`) ||
//       item.children.some(
//         (child) =>
//           pathname === child.href ||
//           (child.href !== item.href &&
//             pathname.startsWith(`${child.href}/`))
//       )
//     );
//   }

//   return isActivePath(pathname, item.href);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";

//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   useEffect(() => {
//     const map: Record<string, string> = {
//       JuCart: "/modules/jucart",
//       JuStay: "/modules/justay",
//       JuHome: "/modules/juhome",
//       JuShopping: "/modules/jushopping",
//       JuRide: "/modules/juride",
//     };

//     for (const [label, root] of Object.entries(map)) {
//       if (pathname === root || pathname.startsWith(`${root}/`)) {
//         setOpenModules((prev) => ({ ...prev, [label]: true }));
//       }
//     }
//   }, [pathname]);

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }

//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (section) =>
//         section.items.length > 0 || section.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // Ignore session storage errors.
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }

//     updateTime();

//     const timer = window.setInterval(updateTime, 30000);

//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (item.children?.length) {
//           for (const child of item.children) {
//             if (
//               pathname === child.href ||
//               (child.href !== item.href &&
//                 pathname.startsWith(`${child.href}/`))
//             ) {
//               return {
//                 label: `${item.label} · ${child.label}`,
//                 href: child.href,
//               };
//             }
//           }

//           if (
//             pathname === item.href ||
//             pathname.startsWith(`${item.href}/`)
//           ) {
//             return item;
//           }
//         } else if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }

//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${
//           sidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>

//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>

//           <button
//             type="button"
//             aria-label="Close sidebar"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}

//               {collapsed && (
//                 <div className="mb-2 border-t border-slate-100" />
//               )}

//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const hasChildren = Boolean(item.children?.length);
//                   const active = itemIsActive(pathname, item);
//                   const expanded =
//                     openModules[item.label] ?? (hasChildren && active);

//                   if (!hasChildren) {
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={closeMobileSidebar}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>

//                         {!collapsed && (
//                           <span className="truncate">{item.label}</span>
//                         )}
//                       </Link>
//                     );
//                   }

//                   // Modern expandable module dropdown.
//                   return (
//                     <div
//                       key={item.label}
//                       className={`mb-1 overflow-hidden rounded-xl border transition-all duration-200 ${
//                         expanded
//                           ? "border-orange-200 bg-white shadow-sm"
//                           : "border-transparent"
//                       }`}
//                     >
//                       <button
//                         type="button"
//                         aria-expanded={Boolean(expanded)}
//                         onClick={() => {
//                           if (collapsed) {
//                             router.push(item.href);
//                             closeMobileSidebar();
//                             return;
//                           }

//                           setOpenModules((prev) => ({
//                             ...prev,
//                             [item.label]: !expanded,
//                           }));
//                         }}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
//                           active
//                             ? "bg-orange-50 text-orange-700"
//                             : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base transition-colors ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>

//                         {!collapsed && (
//                           <>
//                             <span
//                               className={`min-w-0 flex-1 truncate text-sm ${
//                                 active ? "font-bold" : "font-normal"
//                               }`}
//                             >
//                               {item.label}
//                             </span>

//                             <svg
//                               className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
//                                 expanded
//                                   ? "rotate-180 text-orange-500"
//                                   : "text-slate-400 group-hover:text-slate-600"
//                               }`}
//                               viewBox="0 0 20 20"
//                               fill="none"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 d="m5 7.5 5 5 5-5"
//                                 stroke="currentColor"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </>
//                         )}
//                       </button>

//                       {!collapsed && (
//                         <div
//                           className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
//                             expanded
//                               ? "grid-rows-[1fr]"
//                               : "grid-rows-[0fr]"
//                           }`}
//                         >
//                           <div className="min-h-0 overflow-hidden">
//                             <div className="mb-2 ml-[2.2rem] mr-3 space-y-1 border-l border-slate-200 pl-3">
//                               {item.children!.map((child) => {
//                                 const childActive =
//                                   pathname === child.href ||
//                                   (child.href !== item.href &&
//                                     pathname.startsWith(`${child.href}/`));

//                                 return (
//                                   <Link
//                                     key={child.href}
//                                     href={child.href}
//                                     onClick={closeMobileSidebar}
//                                     aria-current={
//                                       childActive ? "page" : undefined
//                                     }
//                                     className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-150 ${
//                                       childActive
//                                         ? "bg-orange-50 font-semibold text-orange-700"
//                                         : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//                                     }`}
//                                   >
//                                     <span
//                                       className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
//                                         childActive
//                                           ? "bg-orange-500"
//                                           : "bg-slate-300 group-hover:bg-orange-300"
//                                       }`}
//                                     />

//                                     <span className="truncate">
//                                       {child.label}
//                                     </span>

//                                     {childActive && (
//                                       <svg
//                                         className="ml-auto h-4 w-4 shrink-0 text-orange-500"
//                                         viewBox="0 0 20 20"
//                                         fill="none"
//                                         aria-hidden="true"
//                                       >
//                                         <path
//                                           d="m7 10 2 2 4-4"
//                                           stroke="currentColor"
//                                           strokeWidth="1.8"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                         />
//                                       </svg>
//                                     )}
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">
//                 {email}
//               </p>
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 aria-label="Open sidebar"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>

//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>

//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   aria-expanded={userMenuOpen}
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>

//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>

//                   <svg
//                     className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${
//                       userMenuOpen ? "rotate-180" : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="m5 7.5 5 5 5-5"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-sm font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-xs text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-3 inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>

//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
//                     >
//                       <span>⚙</span>
//                       Settings
//                     </Link>

//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
//                     >
//                       <span>↪</span>
//                       {loggingOut ? "Signing out…" : "Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   ReactNode,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import type { User } from "firebase/auth";
// import {
//   getCurrentAdminRole,
//   signOutAdmin,
//   subscribeToAuth,
//   type ERPAdminRole,
// } from "@/lib/firebase/auth";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import {
//   FEATURE_FLAG_KEYS,
//   FEATURE_FLAG_META,
//   type FeatureFlagKey,
// } from "@/lib/constants/feature-flags";

// type MenuChild = {
//   label: string;
//   href: string;
// };

// type MenuItem = {
//   label: string;
//   href: string;
//   icon: string;
//   children?: MenuChild[];
// };

// type MenuSection = {
//   title: string;
//   items: MenuItem[];
// };

// const MODULE_ROOTS = [
//   "/modules/jucart",
//   "/modules/justay",
//   "/modules/juhome",
//   "/modules/jushopping",
//   "/modules/juride",
// ] as const;

// const MENU_SECTIONS: MenuSection[] = [
//   {
//     title: "MAIN",
//     items: [
//       { label: "Dashboard", href: "/dashboard", icon: "⌂" },
//       { label: "Control Room", href: "/control-room", icon: "◉" },
//     ],
//   },
//   {
//     title: "MODULES",
//     items: [
//       {
//         label: "JuCart",
//         href: "/modules/jucart",
//         icon: "🛒",
//         children: [
//           { label: "Dashboard", href: "/modules/jucart" },
//           { label: "Orders", href: "/modules/jucart/orders" },
//           { label: "Food", href: "/modules/jucart/food" },
//           { label: "Mart", href: "/modules/jucart/mart" },
//           { label: "Pharmacy", href: "/modules/jucart/pharmacy" },
//         ],
//       },
//       {
//         label: "JuStay",
//         href: "/modules/justay",
//         icon: "🏨",
//         children: [
//           { label: "Dashboard", href: "/modules/justay" },
//           { label: "Bookings", href: "/modules/justay/bookings" },
//           { label: "Hostel / PG", href: "/modules/justay/hostel-pg" },
//           { label: "Halls", href: "/modules/justay/halls" },
//           { label: "Tourism", href: "/modules/justay/tourism" },
//         ],
//       },
//       {
//         label: "JuHome",
//         href: "/modules/juhome",
//         icon: "🏠",
//         children: [
//           { label: "Dashboard", href: "/modules/juhome" },
//           { label: "Bookings", href: "/modules/juhome/bookings" },
//           { label: "Services", href: "/modules/juhome/services" },
//         ],
//       },
//       {
//         label: "JuShopping",
//         href: "/modules/jushopping",
//         icon: "🛍️",
//         children: [
//           { label: "Dashboard", href: "/modules/jushopping" },
//           { label: "Orders", href: "/modules/jushopping/orders" },
//           // Vendors removed — use Entity Management → Vendors
//         ],
//       },
//       {
//         label: "JuRide",
//         href: "/modules/juride",
//         icon: "🚗",
//         children: [
//           { label: "Dashboard", href: "/modules/juride" },
//           { label: "Rides", href: "/modules/juride/rides" },
//           { label: "Rentals", href: "/modules/juride/rentals" },
//           { label: "Logistics", href: "/modules/juride/logistics" },
//           { label: "Packers & Movers", href: "/modules/juride/packers-movers" },
//         ],
//       },
//     ],
//   },
//   {
//     title: "ENTITY MANAGEMENT",
//     items: [
//       {
//         label: "Customers",
//         href: "/entity-management/customers",
//         icon: "👤",
//       },
//       {
//         label: "Vendors",
//         href: "/entity-management/vendors",
//         icon: "🏪",
//       },
//       {
//         label: "Captains",
//         href: "/entity-management/captains",
//         icon: "🛵",
//       },
//     ],
//   },
//   {
//     title: "HIERARCHY",
//     items: [
//       { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
//       { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
//       { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
//     ],
//   },
//   {
//     title: "COMMISSION ENGINE",
//     items: [
//       {
//         label: "Commission Engine",
//         href: "/commission-engine",
//         icon: "%",
//       },
//       {
//         label: "Global Rules",
//         href: "/commission-engine/global-rules",
//         icon: "G",
//       },
//       {
//         label: "Node Overrides",
//         href: "/commission-engine/node-overrides",
//         icon: "N",
//       },
//       {
//         label: "Vendor Rates",
//         href: "/commission-engine/vendor-rates",
//         icon: "V",
//       },
//     ],
//   },
//   {
//     title: "FINANCIAL AUDIT",
//     items: [
//       { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
//       {
//         label: "General Ledger",
//         href: "/financial-audit/general-ledger",
//         icon: "L",
//       },
//       { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
//       {
//         label: "Cashfree Reconciliation",
//         href: "/financial-audit/cashfree-reconciliation",
//         icon: "C",
//       },
//       {
//         label: "Settlements",
//         href: "/financial-audit/settlements",
//         icon: "S",
//       },
//       { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
//     ],
//   },
//   {
//     title: "OVERRIDES",
//     items: [
//       { label: "Overrides", href: "/overrides", icon: "⚡" },
//       { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
//       { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
//       {
//         label: "Cancellations",
//         href: "/overrides/cancellations",
//         icon: "×",
//       },
//     ],
//   },
//   {
//     title: "SYSTEM AUDIT",
//     items: [
//       { label: "System Audit", href: "/system-audit", icon: "🛡" },
//       { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
//       {
//         label: "Admin Users",
//         href: "/system-audit/admin-users",
//         icon: "👤",
//       },
//     ],
//   },
//   {
//     title: "ADMINISTRATION",
//     items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
//   },
// ];

// function isModuleDashboard(href: string) {
//   return (MODULE_ROOTS as readonly string[]).includes(href);
// }

// function isActivePath(pathname: string, href: string) {
//   if (href === "/dashboard") return pathname === "/dashboard";
//   if (isModuleDashboard(href)) return pathname === href;
//   return pathname === href || pathname.startsWith(`${href}/`);
// }

// function itemIsActive(pathname: string, item: MenuItem) {
//   if (item.children?.length) {
//     return (
//       pathname === item.href ||
//       pathname.startsWith(`${item.href}/`) ||
//       item.children.some(
//         (child) =>
//           pathname === child.href ||
//           (child.href !== item.href &&
//             pathname.startsWith(`${child.href}/`))
//       )
//     );
//   }
//   return isActivePath(pathname, item.href);
// }

// function roleLabel(role: ERPAdminRole | null) {
//   return role ?? "—";
// }

// function initialsFromEmail(email: string | null | undefined) {
//   if (!email) return "JA";
//   const part = email.split("@")[0] ?? "JA";
//   return part.slice(0, 2).toUpperCase();
// }

// export default function DashboardLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const [authReady, setAuthReady] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [role, setRole] = useState<ERPAdminRole | null>(null);

//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [currentTime, setCurrentTime] = useState("");
//   const [loggingOut, setLoggingOut] = useState(false);
//   const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

//   const { maintenanceMode, config } = useAppConfig();
//   const { isEnabled } = useFeatureFlags();

//   useEffect(() => {
//     const map: Record<string, string> = {
//       JuCart: "/modules/jucart",
//       JuStay: "/modules/justay",
//       JuHome: "/modules/juhome",
//       JuShopping: "/modules/jushopping",
//       JuRide: "/modules/juride",
//     };

//     for (const [label, root] of Object.entries(map)) {
//       if (pathname === root || pathname.startsWith(`${root}/`)) {
//         setOpenModules((prev) => ({ ...prev, [label]: true }));
//       }
//     }
//   }, [pathname]);

//   const visibleSections = useMemo(() => {
//     return MENU_SECTIONS.map((section) => {
//       const flagKey = (
//         Object.entries(FEATURE_FLAG_META) as [
//           FeatureFlagKey,
//           (typeof FEATURE_FLAG_META)[FeatureFlagKey],
//         ][]
//       ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

//       if (flagKey && !isEnabled(flagKey)) {
//         return { ...section, items: [] as MenuItem[] };
//       }

//       if (section.title === "MAIN") {
//         return {
//           ...section,
//           items: section.items.filter((item) => {
//             if (item.href === "/control-room") {
//               return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
//             }
//             return true;
//           }),
//         };
//       }

//       return section;
//     }).filter(
//       (section) =>
//         section.items.length > 0 || section.title === "ADMINISTRATION"
//     );
//   }, [isEnabled]);

//   useEffect(() => {
//     const unsubscribe = subscribeToAuth(async (firebaseUser) => {
//       if (!firebaseUser) {
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       const resolvedRole = await getCurrentAdminRole(firebaseUser);

//       if (!resolvedRole) {
//         await signOutAdmin();
//         setUser(null);
//         setRole(null);
//         setAuthReady(true);
//         router.replace("/login");
//         return;
//       }

//       setUser(firebaseUser);
//       setRole(resolvedRole);
//       setAuthReady(true);

//       try {
//         sessionStorage.setItem(
//           "juerp_session",
//           JSON.stringify({
//             uid: firebaseUser.uid,
//             email: firebaseUser.email,
//             role: resolvedRole,
//           })
//         );
//       } catch {
//         // ignore
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   useEffect(() => {
//     function updateTime() {
//       setCurrentTime(
//         new Date().toLocaleString("en-IN", {
//           day: "2-digit",
//           month: "short",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//         })
//       );
//     }

//     updateTime();
//     const timer = window.setInterval(updateTime, 30000);
//     return () => window.clearInterval(timer);
//   }, []);

//   const activePage = useMemo(() => {
//     for (const section of visibleSections) {
//       for (const item of section.items) {
//         if (item.children?.length) {
//           for (const child of item.children) {
//             if (
//               pathname === child.href ||
//               (child.href !== item.href &&
//                 pathname.startsWith(`${child.href}/`))
//             ) {
//               return {
//                 label: `${item.label} · ${child.label}`,
//                 href: child.href,
//               };
//             }
//           }
//           if (
//             pathname === item.href ||
//             pathname.startsWith(`${item.href}/`)
//           ) {
//             return item;
//           }
//         } else if (isActivePath(pathname, item.href)) {
//           return item;
//         }
//       }
//     }
//     return null;
//   }, [pathname, visibleSections]);

//   async function handleLogout() {
//     try {
//       setLoggingOut(true);
//       await signOutAdmin();
//       router.replace("/login");
//     } catch (err) {
//       console.error("Logout error:", err);
//       router.replace("/login");
//     } finally {
//       setLoggingOut(false);
//     }
//   }

//   function closeMobileSidebar() {
//     setSidebarOpen(false);
//   }

//   if (!authReady) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-100">
//         <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
//           Checking JUERP session…
//         </div>
//       </div>
//     );
//   }

//   if (!user || !role) {
//     return null;
//   }

//   const email = user.email ?? "admin@juone.in";
//   const displayName = email.split("@")[0] ?? "JUERP Admin";

//   return (
//     <div className="min-h-screen bg-slate-100">
//       {sidebarOpen && (
//         <button
//           type="button"
//           aria-label="Close sidebar"
//           onClick={closeMobileSidebar}
//           className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
//         />
//       )}

//       <aside
//         className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white shadow-xl transition-all duration-300 lg:shadow-none ${
//           collapsed ? "w-20" : "w-72"
//         } ${
//           sidebarOpen
//             ? "translate-x-0"
//             : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         {/* Brand */}
//         <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-4">
//           <Link
//             href="/dashboard"
//             onClick={closeMobileSidebar}
//             className="flex min-w-0 items-center gap-3"
//           >
//             <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-white shadow-sm">
//               J
//             </div>
//             {!collapsed && (
//               <div className="min-w-0">
//                 <p className="truncate text-lg font-black text-slate-900">
//                   JUERP
//                 </p>
//                 <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-400">
//                   JUONE Administration
//                 </p>
//               </div>
//             )}
//           </Link>
//           <button
//             type="button"
//             aria-label="Close sidebar"
//             onClick={closeMobileSidebar}
//             className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden"
//           >
//             ×
//           </button>
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto px-3 py-4">
//           {visibleSections.map((section) => (
//             <div key={section.title} className="mb-5">
//               {!collapsed && (
//                 <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
//                   {section.title}
//                 </p>
//               )}
//               {collapsed && (
//                 <div className="mb-2 border-t border-slate-100" />
//               )}

//               <div className="space-y-1">
//                 {section.items.map((item) => {
//                   const hasChildren = Boolean(item.children?.length);
//                   const active = itemIsActive(pathname, item);
//                   const expanded =
//                     openModules[item.label] ?? (hasChildren && active);

//                   if (!hasChildren) {
//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={closeMobileSidebar}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
//                           active
//                             ? "bg-orange-50 font-bold text-orange-600"
//                             : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>
//                         {!collapsed && (
//                           <span className="truncate">{item.label}</span>
//                         )}
//                       </Link>
//                     );
//                   }

//                   return (
//                     <div
//                       key={item.label}
//                       className={`mb-1 overflow-hidden rounded-xl border transition-all duration-200 ${
//                         expanded
//                           ? "border-orange-200 bg-white shadow-sm"
//                           : "border-transparent"
//                       }`}
//                     >
//                       <button
//                         type="button"
//                         aria-expanded={Boolean(expanded)}
//                         onClick={() => {
//                           if (collapsed) {
//                             router.push(item.href);
//                             closeMobileSidebar();
//                             return;
//                           }
//                           setOpenModules((prev) => ({
//                             ...prev,
//                             [item.label]: !expanded,
//                           }));
//                         }}
//                         title={collapsed ? item.label : undefined}
//                         className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
//                           active
//                             ? "bg-orange-50 text-orange-700"
//                             : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
//                         }`}
//                       >
//                         <span
//                           className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base transition-colors ${
//                             active
//                               ? "bg-orange-100 text-orange-600"
//                               : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600"
//                           }`}
//                         >
//                           {item.icon}
//                         </span>

//                         {!collapsed && (
//                           <>
//                             <span
//                               className={`min-w-0 flex-1 truncate text-sm ${
//                                 active ? "font-bold" : "font-normal"
//                               }`}
//                             >
//                               {item.label}
//                             </span>
//                             <svg
//                               className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
//                                 expanded
//                                   ? "rotate-180 text-orange-500"
//                                   : "text-slate-400 group-hover:text-slate-600"
//                               }`}
//                               viewBox="0 0 20 20"
//                               fill="none"
//                               aria-hidden="true"
//                             >
//                               <path
//                                 d="m5 7.5 5 5 5-5"
//                                 stroke="currentColor"
//                                 strokeWidth="1.8"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                               />
//                             </svg>
//                           </>
//                         )}
//                       </button>

//                       {!collapsed && item.children && item.children.length > 0 && (
//                         <div
//                           className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
//                             expanded
//                               ? "grid-rows-[1fr]"
//                               : "grid-rows-[0fr]"
//                           }`}
//                         >
//                           <div className="min-h-0 overflow-hidden">
//                             <div className="mb-2 ml-[2.2rem] mr-3 space-y-1 border-l border-slate-200 pl-3">
//                               {item.children.map((child) => {
//                                 const childActive =
//                                   pathname === child.href ||
//                                   (child.href !== item.href &&
//                                     pathname.startsWith(`${child.href}/`));

//                                 return (
//                                   <Link
//                                     key={child.href}
//                                     href={child.href}
//                                     onClick={closeMobileSidebar}
//                                     aria-current={
//                                       childActive ? "page" : undefined
//                                     }
//                                     className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-150 ${
//                                       childActive
//                                         ? "bg-orange-50 font-semibold text-orange-700"
//                                         : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//                                     }`}
//                                   >
//                                     <span
//                                       className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
//                                         childActive
//                                           ? "bg-orange-500"
//                                           : "bg-slate-300 group-hover:bg-orange-300"
//                                       }`}
//                                     />
//                                     <span className="truncate">
//                                       {child.label}
//                                     </span>
//                                     {childActive && (
//                                       <svg
//                                         className="ml-auto h-4 w-4 shrink-0 text-orange-500"
//                                         viewBox="0 0 20 20"
//                                         fill="none"
//                                         aria-hidden="true"
//                                       >
//                                         <path
//                                           d="m7 10 2 2 4-4"
//                                           stroke="currentColor"
//                                           strokeWidth="1.8"
//                                           strokeLinecap="round"
//                                           strokeLinejoin="round"
//                                         />
//                                       </svg>
//                                     )}
//                                   </Link>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           ))}
//         </nav>

//         {/* Footer */}
//         <div className="border-t border-slate-200 p-3">
//           {!collapsed && (
//             <div className="mb-3 rounded-xl bg-slate-50 p-3">
//               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
//                 Current Access
//               </p>
//               <p className="mt-1 text-xs font-bold text-slate-800">
//                 {roleLabel(role)}
//               </p>
//               <p className="mt-1 truncate text-[10px] text-slate-400">
//                 {email}
//               </p>
//             </div>
//           )}
//           <button
//             type="button"
//             onClick={() => setCollapsed(!collapsed)}
//             className="hidden w-full items-center justify-center rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 lg:flex"
//           >
//             {collapsed ? "→" : "← Collapse Sidebar"}
//           </button>
//         </div>
//       </aside>

//       {/* Main column */}
//       <div
//         className={`min-h-screen transition-all duration-300 ${
//           collapsed ? "lg:pl-20" : "lg:pl-72"
//         }`}
//       >
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
//           <div className="flex h-20 items-center justify-between px-4 md:px-6 lg:px-8">
//             <div className="flex min-w-0 items-center gap-3">
//               <button
//                 type="button"
//                 aria-label="Open sidebar"
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
//               >
//                 ☰
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
//                 title="Toggle sidebar"
//               >
//                 {collapsed ? "→" : "←"}
//               </button>
//               <div className="min-w-0">
//                 <p className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
//                   JUERP / Administration
//                 </p>
//                 <h2 className="truncate text-base font-bold text-slate-900 md:text-lg">
//                   {activePage?.label ?? "JUERP Administration"}
//                 </h2>
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:gap-4">
//               <div className="hidden items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 md:flex">
//                 <span className="h-2 w-2 rounded-full bg-green-500" />
//                 <span className="text-xs font-bold text-green-700">
//                   System Operational
//                 </span>
//               </div>

//               {currentTime && (
//                 <div className="hidden text-right lg:block">
//                   <p className="text-[10px] font-medium text-slate-400">
//                     Current Time
//                   </p>
//                   <p className="text-xs font-semibold text-slate-700">
//                     {currentTime}
//                   </p>
//                 </div>
//               )}

//               <div className="relative">
//                 <button
//                   type="button"
//                   aria-expanded={userMenuOpen}
//                   onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-2 hover:bg-slate-50"
//                 >
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
//                     {initialsFromEmail(email)}
//                   </div>
//                   <div className="hidden text-left sm:block">
//                     <p className="text-xs font-bold text-slate-800">
//                       {displayName}
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       {roleLabel(role)}
//                     </p>
//                   </div>
//                   <svg
//                     className={`hidden h-4 w-4 text-slate-400 transition-transform duration-200 sm:block ${
//                       userMenuOpen ? "rotate-180" : ""
//                     }`}
//                     viewBox="0 0 20 20"
//                     fill="none"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="m5 7.5 5 5 5-5"
//                       stroke="currentColor"
//                       strokeWidth="1.8"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </button>

//                 {userMenuOpen && (
//                   <div className="absolute right-0 top-14 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
//                     <div className="border-b border-slate-100 p-4">
//                       <p className="text-sm font-bold text-slate-800">
//                         {displayName}
//                       </p>
//                       <p className="mt-1 truncate text-xs text-slate-400">
//                         {email}
//                       </p>
//                       <span className="mt-3 inline-flex rounded-full bg-purple-50 px-2.5 py-1 text-[10px] font-bold text-purple-700">
//                         {roleLabel(role)}
//                       </span>
//                     </div>
//                     <Link
//                       href="/settings"
//                       onClick={() => setUserMenuOpen(false)}
//                       className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
//                     >
//                       <span>⚙</span>
//                       Settings
//                     </Link>
//                     <button
//                       type="button"
//                       disabled={loggingOut}
//                       onClick={handleLogout}
//                       className="flex w-full items-center gap-3 border-t border-slate-100 px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60"
//                     >
//                       <span>↪</span>
//                       {loggingOut ? "Signing out…" : "Sign Out"}
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         {maintenanceMode && role !== "SUPER_ADMIN" && (
//           <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 md:px-8">
//             {config.maintenanceMessage ||
//               "JUERP is under maintenance. Access is restricted."}
//           </div>
//         )}

//         {maintenanceMode && role === "SUPER_ADMIN" && (
//           <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
//             Maintenance mode is ON. Other roles see a restricted experience.
//           </div>
//         )}

//         <main className="min-h-[calc(100vh-5rem)]">{children}</main>
//       </div>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "firebase/auth";
import {
  getCurrentAdminRole,
  signOutAdmin,
  subscribeToAuth,
  type ERPAdminRole,
} from "@/lib/firebase/auth";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import {
  FEATURE_FLAG_KEYS,
  FEATURE_FLAG_META,
  type FeatureFlagKey,
} from "@/lib/constants/feature-flags";

type MenuChild = {
  label: string;
  href: string;
};

type MenuItem = {
  label: string;
  href: string;
  icon: string;
  children?: MenuChild[];
};

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const MODULE_ROOTS = [
  "/modules/jucart",
  "/modules/justay",
  "/modules/juhome",
  "/modules/jushopping",
  "/modules/juride",
] as const;

const MENU_SECTIONS: MenuSection[] = [
  {
    title: "MAIN",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: "⌂" },
      { label: "Control Room", href: "/control-room", icon: "◉" },
    ],
  },
  {
    title: "MODULES",
    items: [
      {
        label: "JuCart",
        href: "/modules/jucart",
        icon: "🛒",
        children: [
          { label: "Dashboard", href: "/modules/jucart" },
          { label: "Orders", href: "/modules/jucart/orders" },
          { label: "Food", href: "/modules/jucart/food" },
          { label: "Mart", href: "/modules/jucart/mart" },
          { label: "Pharmacy", href: "/modules/jucart/pharmacy" },
        ],
      },
      {
        label: "JuStay",
        href: "/modules/justay",
        icon: "🏨",
        children: [
          { label: "Dashboard", href: "/modules/justay" },
          { label: "Bookings", href: "/modules/justay/bookings" },
          { label: "Hostel / PG", href: "/modules/justay/hostel-pg" },
          { label: "Halls", href: "/modules/justay/halls" },
          { label: "Tourism", href: "/modules/justay/tourism" },
        ],
      },
      {
        label: "JuHome",
        href: "/modules/juhome",
        icon: "🏠",
        children: [
          { label: "Dashboard", href: "/modules/juhome" },
          { label: "Bookings", href: "/modules/juhome/bookings" },
          { label: "Services", href: "/modules/juhome/services" },
        ],
      },
      {
        label: "JuShopping",
        href: "/modules/jushopping",
        icon: "🛍️",
        children: [
          { label: "Dashboard", href: "/modules/jushopping" },
          { label: "Orders", href: "/modules/jushopping/orders" },
        ],
      },
      {
        label: "JuRide",
        href: "/modules/juride",
        icon: "🚗",
        children: [
          { label: "Dashboard", href: "/modules/juride" },
          { label: "Rides", href: "/modules/juride/rides" },
          // { label: "Rentals", href: "/modules/juride/rentals" },
          { label: "Logistics", href: "/modules/juride/logistics" },
          { label: "Packers & Movers", href: "/modules/juride/packers-movers" },
        ],
      },
    ],
  },
  {
    title: "ENTITY MANAGEMENT",
    items: [
      { label: "Customers", href: "/entity-management/customers", icon: "👤" },
      { label: "Vendors", href: "/entity-management/vendors", icon: "🏪" },
      { label: "Captains", href: "/entity-management/captains", icon: "🛵" },
    ],
  },
  {
    title: "HIERARCHY",
    items: [
      { label: "Hierarchy", href: "/hierarchy", icon: "⌘" },
      { label: "Clusters", href: "/hierarchy/clusters", icon: "▦" },
      { label: "Zones", href: "/hierarchy/zones", icon: "◎" },
    ],
  },
  {
    title: "COMMISSION ENGINE",
    items: [
      { label: "Commission Engine", href: "/commission-engine", icon: "%" },
      { label: "Global Rules", href: "/commission-engine/global-rules", icon: "G" },
      { label: "Node Overrides", href: "/commission-engine/node-overrides", icon: "N" },
      { label: "Vendor Rates", href: "/commission-engine/vendor-rates", icon: "V" },
    ],
  },
  {
    title: "FINANCIAL AUDIT",
    items: [
      { label: "Financial Audit", href: "/financial-audit", icon: "₹" },
      { label: "General Ledger", href: "/financial-audit/general-ledger", icon: "L" },
      { label: "Payouts", href: "/financial-audit/payouts", icon: "P" },
      {
        label: "Cashfree Reconciliation",
        href: "/financial-audit/cashfree-reconciliation",
        icon: "C",
      },
      { label: "Settlements", href: "/financial-audit/settlements", icon: "S" },
      { label: "Refunds", href: "/financial-audit/refunds", icon: "R" },
    ],
  },
  {
    title: "OVERRIDES",
    items: [
      { label: "Overrides", href: "/overrides", icon: "⚡" },
      { label: "Dispatch", href: "/overrides/dispatch", icon: "D" },
      { label: "Suspensions", href: "/overrides/suspensions", icon: "!" },
      { label: "Cancellations", href: "/overrides/cancellations", icon: "×" },
    ],
  },
  {
    title: "SYSTEM AUDIT",
    items: [
      { label: "System Audit", href: "/system-audit", icon: "🛡" },
      { label: "RBAC Roles", href: "/system-audit/rbac-roles", icon: "🔐" },
      { label: "Admin Users", href: "/system-audit/admin-users", icon: "👤" },
    ],
  },
  {
    title: "ADMINISTRATION",
    items: [{ label: "Settings", href: "/settings", icon: "⚙" }],
  },
];

function isModuleDashboard(href: string) {
  return (MODULE_ROOTS as readonly string[]).includes(href);
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  if (isModuleDashboard(href)) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function itemIsActive(pathname: string, item: MenuItem) {
  if (item.children?.length) {
    return (
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`) ||
      item.children.some(
        (child) =>
          pathname === child.href ||
          (child.href !== item.href && pathname.startsWith(`${child.href}/`))
      )
    );
  }
  return isActivePath(pathname, item.href);
}

function roleLabel(role: ERPAdminRole | null) {
  return role ?? "—";
}

function initialsFromEmail(email: string | null | undefined) {
  if (!email) return "JA";
  const part = email.split("@")[0] ?? "JA";
  return part.slice(0, 2).toUpperCase();
}

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<ERPAdminRole | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const { maintenanceMode, config } = useAppConfig();
  const { isEnabled } = useFeatureFlags();

  useEffect(() => {
    const map: Record<string, string> = {
      JuCart: "/modules/jucart",
      JuStay: "/modules/justay",
      JuHome: "/modules/juhome",
      JuShopping: "/modules/jushopping",
      JuRide: "/modules/juride",
    };

    for (const [label, root] of Object.entries(map)) {
      if (pathname === root || pathname.startsWith(`${root}/`)) {
        setOpenModules((prev) => ({ ...prev, [label]: true }));
      }
    }
  }, [pathname]);

  const visibleSections = useMemo(() => {
    return MENU_SECTIONS.map((section) => {
      const flagKey = (
        Object.entries(FEATURE_FLAG_META) as [
          FeatureFlagKey,
          (typeof FEATURE_FLAG_META)[FeatureFlagKey],
        ][]
      ).find(([, meta]) => meta.menuSectionTitle === section.title)?.[0];

      if (flagKey && !isEnabled(flagKey)) {
        return { ...section, items: [] as MenuItem[] };
      }

      if (section.title === "MAIN") {
        return {
          ...section,
          items: section.items.filter((item) => {
            if (item.href === "/control-room") {
              return isEnabled(FEATURE_FLAG_KEYS.CONTROL_ROOM);
            }
            return true;
          }),
        };
      }

      return section;
    }).filter(
      (section) =>
        section.items.length > 0 || section.title === "ADMINISTRATION"
    );
  }, [isEnabled]);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setRole(null);
        setAuthReady(true);
        router.replace("/login");
        return;
      }

      const resolvedRole = await getCurrentAdminRole(firebaseUser);

      if (!resolvedRole) {
        await signOutAdmin();
        setUser(null);
        setRole(null);
        setAuthReady(true);
        router.replace("/login");
        return;
      }

      setUser(firebaseUser);
      setRole(resolvedRole);
      setAuthReady(true);

      try {
        sessionStorage.setItem(
          "juerp_session",
          JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: resolvedRole,
          })
        );
      } catch {
        // ignore
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    function updateTime() {
      setCurrentTime(
        new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }

    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  const activePage = useMemo(() => {
    for (const section of visibleSections) {
      for (const item of section.items) {
        if (item.children?.length) {
          for (const child of item.children) {
            if (
              pathname === child.href ||
              (child.href !== item.href &&
                pathname.startsWith(`${child.href}/`))
            ) {
              return {
                label: `${item.label} · ${child.label}`,
                href: child.href,
              };
            }
          }
          if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
            return item;
          }
        } else if (isActivePath(pathname, item.href)) {
          return item;
        }
      }
    }
    return null;
  }, [pathname, visibleSections]);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await signOutAdmin();
      router.replace("/login");
    } catch (err) {
      console.error("Logout error:", err);
      router.replace("/login");
    } finally {
      setLoggingOut(false);
    }
  }

  function closeMobileSidebar() {
    setSidebarOpen(false);
  }

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-600 shadow-sm">
          Checking JUERP session…
        </div>
      </div>
    );
  }

  if (!user || !role) {
    return null;
  }

  const email = user.email ?? "admin@juone.in";
  const displayName = email.split("@")[0] ?? "JUERP Admin";

  return (
    <div className="min-h-screen bg-slate-100">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200/80 bg-white transition-all duration-300 ${
          collapsed ? "w-[72px]" : "w-[272px]"
        } ${
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0 lg:shadow-none"
        }`}
      >
        {/* Brand */}
        <div
          className={`flex h-[68px] shrink-0 items-center border-b border-slate-100 ${
            collapsed ? "justify-center px-2" : "px-4"
          }`}
        >
          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-base font-black text-white shadow-md shadow-orange-500/25">
              J
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="truncate text-[15px] font-black tracking-tight text-slate-900">
                  JUERP
                </p>
                <p className="truncate text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  JUONE Admin
                </p>
              </div>
            )}
          </Link>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={closeMobileSidebar}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            ×
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-3 scrollbar-thin">
          {visibleSections.map((section) => (
            <div key={section.title} className="mb-4">
              {!collapsed && (
                <p className="mb-1.5 px-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {section.title}
                </p>
              )}
              {collapsed && <div className="mb-1.5 mx-2 border-t border-slate-100" />}

              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const active = itemIsActive(pathname, item);
                  const expanded =
                    openModules[item.label] ?? (hasChildren && active);

                  /* ── Simple link (no children) ── */
                  if (!hasChildren) {
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileSidebar}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-[13px] transition-colors ${
                          active
                            ? "bg-orange-50 font-semibold text-orange-700"
                            : "font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-orange-500" />
                        )}
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                            active
                              ? "bg-orange-100 text-orange-600"
                              : "bg-slate-100 text-slate-500 group-hover:bg-slate-200/80"
                          }`}
                        >
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </Link>
                    );
                  }

                  /* ── Expandable module ── */
                  return (
                    <div key={item.label} className="select-none">
                      <button
                        type="button"
                        aria-expanded={Boolean(expanded)}
                        onClick={() => {
                          if (collapsed) {
                            router.push(item.href);
                            closeMobileSidebar();
                            return;
                          }
                          setOpenModules((prev) => ({
                            ...prev,
                            [item.label]: !expanded,
                          }));
                        }}
                        title={collapsed ? item.label : undefined}
                        className={`group relative flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors ${
                          active
                            ? "bg-orange-50/80 text-orange-700"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {active && !expanded && (
                          <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-orange-500" />
                        )}
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm transition-colors ${
                            active
                              ? "bg-orange-100 text-orange-600"
                              : "bg-slate-100 text-slate-500 group-hover:bg-orange-50 group-hover:text-orange-600"
                          }`}
                        >
                          {item.icon}
                        </span>

                        {!collapsed && (
                          <>
                            <span
                              className={`min-w-0 flex-1 truncate text-[13px] ${
                                active ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {item.label}
                            </span>
                            <svg
                              className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
                                expanded
                                  ? "rotate-180 text-orange-500"
                                  : "text-slate-400 group-hover:text-slate-500"
                              }`}
                              viewBox="0 0 20 20"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="m5 7.5 5 5 5-5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </>
                        )}
                      </button>

                      {/* Children panel */}
                      {!collapsed && item.children && item.children.length > 0 && (
                        <div
                          className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                            expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="relative ml-5 mt-0.5 mb-1 space-y-0.5 border-l-2 border-orange-100 pl-3">
                              {item.children.map((child) => {
                                const childActive =
                                  pathname === child.href ||
                                  (child.href !== item.href &&
                                    pathname.startsWith(`${child.href}/`));

                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={closeMobileSidebar}
                                    aria-current={childActive ? "page" : undefined}
                                    className={`relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors ${
                                      childActive
                                        ? "bg-orange-50 font-semibold text-orange-700"
                                        : "font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                                  >
                                    {/* Connector dot on the border line */}
                                    <span
                                      className={`absolute -left-[15px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border-2 border-white ${
                                        childActive
                                          ? "bg-orange-500"
                                          : "bg-slate-300"
                                      }`}
                                    />
                                    <span className="truncate">{child.label}</span>
                                    {childActive && (
                                      <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
                                    )}
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-100 p-2.5">
          {!collapsed && (
            <div className="mb-2 rounded-xl bg-gradient-to-br from-slate-50 to-orange-50/40 px-3 py-2.5">
              <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Current Access
              </p>
              <p className="mt-0.5 text-xs font-bold text-slate-800">
                {roleLabel(role)}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-slate-400">
                {email}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-[11px] font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700 lg:flex"
          >
            {collapsed ? (
              <span>→</span>
            ) : (
              <>
                <span>←</span>
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ── MAIN COLUMN ─────────────────────────────────────────────────── */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-[72px]" : "lg:pl-[272px]"
        }`}
      >
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className="flex h-[68px] items-center justify-between px-4 md:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2.5">
              <button
                type="button"
                aria-label="Open sidebar"
                onClick={() => setSidebarOpen(true)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
              >
                ☰
              </button>
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 lg:flex"
                title="Toggle sidebar"
              >
                {collapsed ? "→" : "←"}
              </button>
              <div className="min-w-0">
                <p className="hidden text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 sm:block">
                  JUERP / Administration
                </p>
                <h2 className="truncate text-[15px] font-bold text-slate-900 md:text-base">
                  {activePage?.label ?? "JUERP Administration"}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[11px] font-semibold text-emerald-700">
                  Operational
                </span>
              </div>

              {currentTime && (
                <div className="hidden text-right lg:block">
                  <p className="text-[9px] font-medium text-slate-400">Time</p>
                  <p className="text-[11px] font-semibold text-slate-700">
                    {currentTime}
                  </p>
                </div>
              )}

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={userMenuOpen}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-1.5 py-1.5 hover:bg-slate-50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-[11px] font-black text-white">
                    {initialsFromEmail(email)}
                  </div>
                  <div className="hidden pr-1 text-left sm:block">
                    <p className="text-[12px] font-bold text-slate-800">
                      {displayName}
                    </p>
                    <p className="text-[9px] text-slate-400">{roleLabel(role)}</p>
                  </div>
                  <svg
                    className={`mr-1 hidden h-3.5 w-3.5 text-slate-400 transition-transform sm:block ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="m5 7.5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
                    <div className="border-b border-slate-100 p-3.5">
                      <p className="text-sm font-bold text-slate-800">
                        {displayName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {email}
                      </p>
                      <span className="mt-2 inline-flex rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                        {roleLabel(role)}
                      </span>
                    </div>
                    <Link
                      href="/settings"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                      <span>⚙</span>
                      Settings
                    </Link>
                    <button
                      type="button"
                      disabled={loggingOut}
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2.5 border-t border-slate-100 px-3.5 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
                    >
                      <span>↪</span>
                      {loggingOut ? "Signing out…" : "Sign Out"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {maintenanceMode && role !== "SUPER_ADMIN" && (
          <div className="border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 md:px-8">
            {config.maintenanceMessage ||
              "JUERP is under maintenance. Access is restricted."}
          </div>
        )}

        {maintenanceMode && role === "SUPER_ADMIN" && (
          <div className="border-b border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-800 md:px-8">
            Maintenance mode is ON. Other roles see a restricted experience.
          </div>
        )}

        <main className="min-h-[calc(100vh-68px)]">{children}</main>
      </div>
    </div>
  );
}