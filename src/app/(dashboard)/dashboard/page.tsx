// "use client";

// export default function DashboardPage() {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-slate-900">
//         JUONE Operations Dashboard
//       </h1>
//       <p className="mt-2 text-sm text-slate-500">
//         Dashboard route is working.
//       </p>
//     </div>
//   );
// }

// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useDashboardStats, {
//   type HealthStatus,
//   type ModuleHealth,
//   type ModuleId,
// } from "@/hooks/useDashboardStats";

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// function getHealthClasses(status: HealthStatus) {
//   if (status === "HEALTHY") return "bg-green-100 text-green-700 border-green-200";
//   if (status === "WARNING") return "bg-amber-100 text-amber-700 border-amber-200";
//   return "bg-red-100 text-red-700 border-red-200";
// }

// function getHealthLabel(status: HealthStatus) {
//   if (status === "HEALTHY") return "Healthy";
//   if (status === "WARNING") return "Warning";
//   return "Critical";
// }

// function getModuleClasses(moduleId: ModuleId) {
//   const classes: Record<ModuleId, string> = {
//     JUCART: "bg-orange-100 text-orange-700",
//     JURIDE: "bg-blue-100 text-blue-700",
//     JUSTAY: "bg-purple-100 text-purple-700",
//     JUHOME: "bg-green-100 text-green-700",
//     JUSHOPPING: "bg-pink-100 text-pink-700",
//   };
//   return classes[moduleId];
// }

// function moduleShort(moduleId: ModuleId) {
//   const map: Record<ModuleId, string> = {
//     JUCART: "JC",
//     JURIDE: "JR",
//     JUSTAY: "JS",
//     JUHOME: "JH",
//     JUSHOPPING: "JSH",
//   };
//   return map[moduleId];
// }

// export default function DashboardPage() {
//   const { stats, loading, error, demoMode, refresh } = useDashboardStats();
//   const [selectedModule, setSelectedModule] = useState<ModuleId | "ALL">("ALL");
//   const [search, setSearch] = useState("");

//   const filteredModules = useMemo(() => {
//     return stats.modules.filter((module) => {
//       const matchesModule =
//         selectedModule === "ALL" || module.moduleId === selectedModule;
//       const q = search.trim().toLowerCase();
//       const matchesSearch =
//         !q ||
//         module.name.toLowerCase().includes(q) ||
//         module.moduleId.toLowerCase().includes(q);
//       return matchesModule && matchesSearch;
//     });
//   }, [stats.modules, selectedModule, search]);

//   const pendingStatus: HealthStatus =
//     stats.totalPendingPayments > 15 ? "WARNING" : "HEALTHY";

//   return (
//     <div className="p-4 md:p-6 lg:p-8">
//         <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="mb-2 flex items-center gap-2">
//             <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700">
//               JUERP
//             </span>
//             <span className="text-xs text-slate-400">/</span>
//             <span className="text-xs font-medium text-slate-500">
//               Executive Dashboard
//             </span>
//           </div>
//           <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
//             JUONE Operations Dashboard
//           </h1>
//           <p className="mt-1 max-w-3xl text-sm text-slate-500">
//             Live operational overview from Firestore for JuCart, JuRide, JuStay,
//             JuHome and JuShopping. Financial authority remains on the trusted
//             backend.
//           </p>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           <button
//             type="button"
//             onClick={() => void refresh()}
//             disabled={loading}
//             className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Refreshing…" : "Refresh"}
//           </button>

//           <Link
//             href="/control-room"
//             className="inline-flex items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
//           >
//             Open Control Room
//           </Link>

//           <Link
//             href="/financial-audit"
//             className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
//           >
//             Financial Audit
//           </Link>
//         </div>
//       </div>
//       </div>

//       {error && (
//         <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
//           <p className="text-sm font-semibold text-red-800">Unable to load live data</p>
//           <p className="mt-1 text-xs text-red-700">{error}</p>
//           <p className="mt-2 text-[11px] text-red-600">
//             Check Firestore rules, indexes, and that collections{" "}
//             <code>orders</code>, <code>vendors</code>, <code>captains</code>,{" "}
//             <code>payments</code>, <code>audit_logs</code> exist.
//           </p>
//         </div>
//       )}

//       {demoMode && (
//         <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
//           <p className="text-sm font-semibold text-amber-800">Demo mode</p>
//           <p className="mt-1 text-xs text-amber-700">
//             <code>NEXT_PUBLIC_DEMO_MODE=true</code> — Firestore reads are disabled.
//             Set it to <code>false</code> for live data.
//           </p>
//         </div>
//       )}

//       <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-start gap-3">
//             <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
//               <span className="h-3 w-3 rounded-full bg-green-500" />
//             </div>
//             <div>
//               <p className="text-sm font-bold text-green-800">Platform Operational</p>
//               <p className="mt-1 text-xs text-green-700">
//                 Metrics are loaded from canonical Firestore collections.
//               </p>
//             </div>
//           </div>
//           <span className="w-fit rounded-full border border-green-200 bg-white px-3 py-1.5 text-[10px] font-bold text-green-700">
//             {loading ? "LOADING" : "LIVE"}
//           </span>
//         </div>
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {[
//           {
//             title: "Active Orders",
//             value: formatNumber(stats.totalActiveOrders),
//             subtitle: "Across all JUONE modules",
//             status: "HEALTHY" as HealthStatus,
//           },
//           {
//             title: "Pending Payments",
//             value: formatNumber(stats.totalPendingPayments),
//             subtitle: "Requires monitoring",
//             status: pendingStatus,
//           },
//           {
//             title: "Active Vendors",
//             value: formatNumber(stats.totalActiveVendors),
//             subtitle: "verificationStatus = ACTIVE",
//             status: "HEALTHY" as HealthStatus,
//           },
//           {
//             title: "Active Captains",
//             value: formatNumber(stats.totalActiveCaptains),
//             subtitle: "ACTIVE / ONLINE",
//             status: "HEALTHY" as HealthStatus,
//           },
//         ].map((card) => (
//           <div
//             key={card.title}
//             className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//           >
//             <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//               {card.title}
//             </p>
//             <p className="mt-2 text-2xl font-black text-slate-900">
//               {loading ? "…" : card.value}
//             </p>
//             <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
//             <div className="mt-4">
//               <span
//                 className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getHealthClasses(
//                   card.status
//                 )}`}
//               >
//                 {getHealthLabel(card.status)}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="mb-4">
//           <h2 className="text-base font-black text-slate-900">Quick Actions</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Frequently used JUERP governance modules.
//           </p>
//         </div>
//         <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
//           {[
//             { href: "/entity-management/customers", label: "Customers", icon: "👤", color: "orange" },
//             { href: "/entity-management/captains", label: "Captains", icon: "🚗", color: "blue" },
//             { href: "/commission-engine", label: "Commission Engine", icon: "%", color: "purple" },
//             { href: "/overrides", label: "Overrides", icon: "⚡", color: "red" },
//           ].map((item) => (
//             <Link
//               key={item.href}
//               href={item.href}
//               className="group rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
//             >
//               <div className="flex items-center gap-3">
//                 <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
//                   {item.icon}
//                 </span>
//                 <div>
//                   <p className="text-sm font-bold text-slate-800">{item.label}</p>
//                   <p className="text-[10px] text-slate-400">Open module</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>

//       <div className="mt-6">
//         <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h2 className="text-lg font-black text-slate-900">Module Operations</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Operational counts by module from Firestore.
//             </p>
//           </div>
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search module..."
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//             />
//             <select
//               value={selectedModule}
//               onChange={(e) =>
//                 setSelectedModule(e.target.value as ModuleId | "ALL")
//               }
//               className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
//             >
//               <option value="ALL">All Modules</option>
//               <option value="JUCART">JuCart</option>
//               <option value="JURIDE">JuRide</option>
//               <option value="JUSTAY">JuStay</option>
//               <option value="JUHOME">JuHome</option>
//               <option value="JUSHOPPING">JuShopping</option>
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
//             Loading module metrics…
//           </div>
//         ) : filteredModules.length > 0 ? (
//           <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
//             {filteredModules.map((module: ModuleHealth) => (
//               <div
//                 key={module.moduleId}
//                 className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${getModuleClasses(
//                         module.moduleId
//                       )}`}
//                     >
//                       {moduleShort(module.moduleId)}
//                     </div>
//                     <div>
//                       <h3 className="text-sm font-bold text-slate-900">{module.name}</h3>
//                       <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
//                         {module.moduleId}
//                       </p>
//                     </div>
//                   </div>
//                   <span
//                     className={`rounded-full border px-2 py-1 text-[9px] font-bold ${getHealthClasses(
//                       module.health
//                     )}`}
//                   >
//                     {getHealthLabel(module.health)}
//                   </span>
//                 </div>
//                 <div className="mt-5 grid grid-cols-2 gap-3">
//                   {[
//                     ["Active Orders", module.activeOrders],
//                     ["Pending Payments", module.pendingPayments],
//                     ["Active Vendors", module.activeVendors],
//                     ["Active Captains", module.activeCaptains],
//                   ].map(([label, value]) => (
//                     <div key={String(label)} className="rounded-xl bg-slate-50 p-3">
//                       <p className="text-[10px] text-slate-400">{label}</p>
//                       <p className="mt-1 text-lg font-black text-slate-800">
//                         {formatNumber(Number(value))}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
//             <p className="text-sm font-bold text-slate-700">No modules found</p>
//             <p className="mt-1 text-xs text-slate-400">
//               Try changing the search or module filter.
//             </p>
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//         <div className="mb-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-base font-black text-slate-900">Recent Activity</h2>
//             <p className="mt-1 text-xs text-slate-500">
//               Latest entries from <code>audit_logs</code>.
//             </p>
//           </div>
//           <Link
//             href="/system-audit"
//             className="text-xs font-bold text-orange-600 hover:text-orange-700"
//           >
//             View Audit →
//           </Link>
//         </div>

//         {loading ? (
//           <p className="py-8 text-center text-sm text-slate-500">Loading activity…</p>
//         ) : stats.recentActivity.length === 0 ? (
//           <p className="py-8 text-center text-sm text-slate-500">
//             No audit log entries yet.
//           </p>
//         ) : (
//           <div className="space-y-3">
//             {stats.recentActivity.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="rounded-xl border border-slate-100 bg-slate-50 p-4"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="text-xs font-bold text-slate-800">{activity.action}</p>
//                     <p className="mt-1 text-[10px] text-slate-400">
//                       {activity.entity} · {activity.referenceId}
//                     </p>
//                   </div>
//                   <span className="shrink-0 rounded-full bg-slate-200 px-2 py-1 text-[9px] font-bold text-slate-700">
//                     {activity.status}
//                   </span>
//                 </div>
//                 <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
//                   <span className="text-[10px] font-semibold text-slate-500">
//                     {activity.actor}
//                   </span>
//                   <span className="text-[10px] text-slate-400">{activity.timestamp}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
//         <h3 className="text-sm font-black text-orange-900">JUERP Governance Boundary</h3>
//         <p className="mt-1 max-w-5xl text-xs leading-5 text-orange-800">
//           This dashboard is a monitoring surface. Pricing, commissions, settlements,
//           payment confirmation, verification and protected status transitions remain
//           under the trusted backend and JuERP governance layer. Counts shown here are
//           operational reads, not the financial source of truth.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useDashboardStats, {
  type HealthStatus,
  type ModuleHealth,
  type ModuleId,
} from "@/hooks/useDashboardStats";

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function getHealthClasses(status: HealthStatus) {
  if (status === "HEALTHY") return "bg-green-100 text-green-700 border-green-200";
  if (status === "WARNING") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-red-100 text-red-700 border-red-200";
}

function getHealthLabel(status: HealthStatus) {
  if (status === "HEALTHY") return "Healthy";
  if (status === "WARNING") return "Warning";
  return "Critical";
}

function getModuleClasses(moduleId: ModuleId) {
  const classes: Record<ModuleId, string> = {
    JUCART: "bg-orange-100 text-orange-700",
    JURIDE: "bg-blue-100 text-blue-700",
    JUSTAY: "bg-purple-100 text-purple-700",
    JUHOME: "bg-green-100 text-green-700",
    JUSHOPPING: "bg-pink-100 text-pink-700",
  };
  return classes[moduleId];
}

function moduleShort(moduleId: ModuleId) {
  const map: Record<ModuleId, string> = {
    JUCART: "JC",
    JURIDE: "JR",
    JUSTAY: "JS",
    JUHOME: "JH",
    JUSHOPPING: "JSH",
  };
  return map[moduleId];
}

export default function DashboardPage() {
  const { stats, loading, error, demoMode, refresh } = useDashboardStats();
  const [selectedModule, setSelectedModule] = useState<ModuleId | "ALL">("ALL");
  const [search, setSearch] = useState("");

  const filteredModules = useMemo(() => {
    return stats.modules.filter((module) => {
      const matchesModule =
        selectedModule === "ALL" || module.moduleId === selectedModule;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        module.name.toLowerCase().includes(q) ||
        module.moduleId.toLowerCase().includes(q);
      return matchesModule && matchesSearch;
    });
  }, [stats.modules, selectedModule, search]);

  const pendingStatus: HealthStatus =
    stats.totalPendingPayments > 15 ? "WARNING" : "HEALTHY";

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-orange-700">
              JUERP
            </span>
            <span className="text-xs text-slate-400">/</span>
            <span className="text-xs font-medium text-slate-500">
              Executive Dashboard
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
            JUONE Operations Dashboard
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            Live operational overview from Firestore for JuCart, JuRide, JuStay,
            JuHome and JuShopping. Financial authority remains on the trusted
            backend.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>

          {/* <Link
            href="/control-room"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-900 bg-slate-900 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
          >
            Open Control Room
          </Link> */}

            <Link
                href="/control-room"
                className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-xs font-bold text-slate-900 shadow-sm transition hover:bg-slate-100"
                >
                Open Control Room
                </Link>

          <Link
            href="/financial-audit"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            Financial Audit
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">Unable to load live data</p>
          <p className="mt-1 text-xs text-red-700">{error}</p>
          <p className="mt-2 text-[11px] text-red-600">
            Check Firestore rules, indexes, and that collections{" "}
            <code>orders</code>, <code>vendors</code>, <code>captains</code>,{" "}
            <code>payments</code>, <code>audit_logs</code> exist.
          </p>
        </div>
      )}

      {/* {demoMode && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-semibold text-amber-800">Demo mode</p>
          <p className="mt-1 text-xs text-amber-700">
            <code>NEXT_PUBLIC_DEMO_MODE=true</code> — Firestore reads are disabled.
            Set it to <code>false</code> for live data.
          </p>
        </div>
      )} */}

      <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100">
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-green-800">Platform Operational</p>
              <p className="mt-1 text-xs text-green-700">
                Metrics are loaded from canonical Firestore collections.
              </p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-green-200 bg-white px-3 py-1.5 text-[10px] font-bold text-green-700">
            {loading ? "LOADING" : "LIVE"}
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Active Orders",
            value: formatNumber(stats.totalActiveOrders),
            subtitle: "Across all JUONE modules",
            status: "HEALTHY" as HealthStatus,
          },
          {
            title: "Pending Payments",
            value: formatNumber(stats.totalPendingPayments),
            subtitle: "Requires monitoring",
            status: pendingStatus,
          },
          {
            title: "Active Vendors",
            value: formatNumber(stats.totalActiveVendors),
            subtitle: "verificationStatus = ACTIVE",
            status: "HEALTHY" as HealthStatus,
          },
          {
            title: "Active Captains",
            value: formatNumber(stats.totalActiveCaptains),
            subtitle: "ACTIVE / ONLINE",
            status: "HEALTHY" as HealthStatus,
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {card.title}
            </p>
            <p className="mt-2 text-2xl font-black text-slate-900">
              {loading ? "…" : card.value}
            </p>
            <p className="mt-1 text-xs text-slate-500">{card.subtitle}</p>
            <div className="mt-4">
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getHealthClasses(
                  card.status
                )}`}
              >
                {getHealthLabel(card.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-black text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-xs text-slate-500">
            Frequently used JUERP governance modules.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              href: "/entity-management/customers",
              label: "Customers",
              icon: "👤",
            },
            {
              href: "/entity-management/captains",
              label: "Captains",
              icon: "🚗",
            },
            {
              href: "/commission-engine",
              label: "Commission Engine",
              icon: "%",
            },
            {
              href: "/overrides",
              label: "Overrides",
              icon: "⚡",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-xl border border-slate-200 p-4 transition hover:border-orange-200 hover:bg-orange-50"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.label}</p>
                  <p className="text-[10px] text-slate-400">Open module</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900">Module Operations</h2>
            <p className="mt-1 text-xs text-slate-500">
              Operational counts by module from Firestore.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search module..."
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            />
            <select
              value={selectedModule}
              onChange={(e) =>
                setSelectedModule(e.target.value as ModuleId | "ALL")
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="ALL">All Modules</option>
              <option value="JUCART">JuCart</option>
              <option value="JURIDE">JuRide</option>
              <option value="JUSTAY">JuStay</option>
              <option value="JUHOME">JuHome</option>
              <option value="JUSHOPPING">JuShopping</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
            Loading module metrics…
          </div>
        ) : filteredModules.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModules.map((module: ModuleHealth) => (
              <div
                key={module.moduleId}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${getModuleClasses(
                        module.moduleId
                      )}`}
                    >
                      {moduleShort(module.moduleId)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {module.name}
                      </h3>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {module.moduleId}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full border px-2 py-1 text-[9px] font-bold ${getHealthClasses(
                      module.health
                    )}`}
                  >
                    {getHealthLabel(module.health)}
                  </span>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    ["Active Orders", module.activeOrders],
                    ["Pending Payments", module.pendingPayments],
                    ["Active Vendors", module.activeVendors],
                    ["Active Captains", module.activeCaptains],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-[10px] text-slate-400">{label}</p>
                      <p className="mt-1 text-lg font-black text-slate-800">
                        {formatNumber(Number(value))}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm font-bold text-slate-700">No modules found</p>
            <p className="mt-1 text-xs text-slate-400">
              Try changing the search or module filter.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-slate-900">Recent Activity</h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest entries from <code>audit_logs</code>.
            </p>
          </div>
          <Link
            href="/system-audit"
            className="text-xs font-bold text-orange-600 hover:text-orange-700"
          >
            View Audit →
          </Link>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-slate-500">Loading activity…</p>
        ) : stats.recentActivity.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No audit log entries yet.
          </p>
        ) : (
          <div className="space-y-3">
            {stats.recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      {activity.action}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-400">
                      {activity.entity} · {activity.referenceId}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-slate-200 px-2 py-1 text-[9px] font-bold text-slate-700">
                    {activity.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-[10px] font-semibold text-slate-500">
                    {activity.actor}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-5">
        <h3 className="text-sm font-black text-orange-900">
          JUERP Governance Boundary
        </h3>
        <p className="mt-1 max-w-5xl text-xs leading-5 text-orange-800">
          This dashboard is a monitoring surface. Pricing, commissions, settlements,
          payment confirmation, verification and protected status transitions remain
          under the trusted backend and JuERP governance layer. Counts shown here are
          operational reads, not the financial source of truth.
        </p>
      </div>
    </div>
  );
}