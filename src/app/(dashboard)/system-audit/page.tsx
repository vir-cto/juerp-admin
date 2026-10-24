// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type AuditStatus =
//   | "SUCCESS"
//   | "WARNING"
//   | "FAILED"
//   | "PENDING";

// type AuditCategory =
//   | "AUTHENTICATION"
//   | "AUTHORIZATION"
//   | "RBAC"
//   | "CONFIGURATION"
//   | "OVERRIDE"
//   | "FINANCIAL"
//   | "SYSTEM";

// type AuditEvent = {
//   id: string;
//   category: AuditCategory;
//   action: string;
//   actor: string;
//   actorRole: string;
//   target: string;
//   status: AuditStatus;
//   correlationId: string;
//   timestamp: string;
//   ipAddress: string;
// };

// const INITIAL_EVENTS: AuditEvent[] = [
//   {
//     id: "AUD-20261005-001",
//     category: "AUTHENTICATION",
//     action: "Administrator Login",
//     actor: "JUERP Admin",
//     actorRole: "SUPER_ADMIN",
//     target: "JUERP Console",
//     status: "SUCCESS",
//     correlationId: "COR-A81F23",
//     timestamp: "05 Oct 2026, 09:42 AM",
//     ipAddress: "192.168.1.20",
//   },
//   {
//     id: "AUD-20261005-002",
//     category: "RBAC",
//     action: "Role Permission Review",
//     actor: "System Auditor",
//     actorRole: "TECHNICAL_ADMIN",
//     target: "SUPER_ADMIN",
//     status: "SUCCESS",
//     correlationId: "COR-B72104",
//     timestamp: "05 Oct 2026, 09:36 AM",
//     ipAddress: "192.168.1.31",
//   },
//   {
//     id: "AUD-20261005-003",
//     category: "AUTHORIZATION",
//     action: "Scope Validation",
//     actor: "State Administrator",
//     actorRole: "STATE_ADMIN",
//     target: "Andhra Pradesh",
//     status: "SUCCESS",
//     correlationId: "COR-C93177",
//     timestamp: "05 Oct 2026, 09:28 AM",
//     ipAddress: "192.168.1.42",
//   },
//   {
//     id: "AUD-20261005-004",
//     category: "OVERRIDE",
//     action: "Cancellation Override Request",
//     actor: "District Administrator",
//     actorRole: "DISTRICT_ADMIN",
//     target: "ORD-10452",
//     status: "PENDING",
//     correlationId: "COR-D54109",
//     timestamp: "05 Oct 2026, 09:20 AM",
//     ipAddress: "192.168.1.45",
//   },
//   {
//     id: "AUD-20261005-005",
//     category: "FINANCIAL",
//     action: "Reconciliation Exception",
//     actor: "Financial Auditor",
//     actorRole: "SUPER_ADMIN",
//     target: "PAY-78421",
//     status: "WARNING",
//     correlationId: "COR-E12988",
//     timestamp: "05 Oct 2026, 09:14 AM",
//     ipAddress: "192.168.1.52",
//   },
//   {
//     id: "AUD-20261005-006",
//     category: "CONFIGURATION",
//     action: "Commission Rule Review",
//     actor: "JUERP Admin",
//     actorRole: "SUPER_ADMIN",
//     target: "JUCART",
//     status: "SUCCESS",
//     correlationId: "COR-F88213",
//     timestamp: "05 Oct 2026, 08:58 AM",
//     ipAddress: "192.168.1.20",
//   },
//   {
//     id: "AUD-20261005-007",
//     category: "AUTHENTICATION",
//     action: "Failed Login Attempt",
//     actor: "Unknown User",
//     actorRole: "UNKNOWN",
//     target: "JUERP Console",
//     status: "FAILED",
//     correlationId: "COR-G44291",
//     timestamp: "05 Oct 2026, 08:41 AM",
//     ipAddress: "10.20.14.81",
//   },
//   {
//     id: "AUD-20261005-008",
//     category: "SYSTEM",
//     action: "Configuration Health Check",
//     actor: "System",
//     actorRole: "SYSTEM",
//     target: "JUERP Platform",
//     status: "SUCCESS",
//     correlationId: "COR-H71290",
//     timestamp: "05 Oct 2026, 08:30 AM",
//     ipAddress: "SYSTEM",
//   },
// ];

// const CATEGORY_LABELS: Record<AuditCategory, string> = {
//   AUTHENTICATION: "Authentication",
//   AUTHORIZATION: "Authorization",
//   RBAC: "RBAC",
//   CONFIGURATION: "Configuration",
//   OVERRIDE: "Override",
//   FINANCIAL: "Financial",
//   SYSTEM: "System",
// };

// function getStatusClasses(status: AuditStatus) {
//   switch (status) {
//     case "SUCCESS":
//       return "bg-green-100 text-green-700";

//     case "WARNING":
//       return "bg-yellow-100 text-yellow-700";

//     case "FAILED":
//       return "bg-red-100 text-red-700";

//     case "PENDING":
//       return "bg-blue-100 text-blue-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getCategoryClasses(category: AuditCategory) {
//   switch (category) {
//     case "AUTHENTICATION":
//       return "bg-blue-100 text-blue-700";

//     case "AUTHORIZATION":
//       return "bg-cyan-100 text-cyan-700";

//     case "RBAC":
//       return "bg-purple-100 text-purple-700";

//     case "CONFIGURATION":
//       return "bg-orange-100 text-orange-700";

//     case "OVERRIDE":
//       return "bg-red-100 text-red-700";

//     case "FINANCIAL":
//       return "bg-green-100 text-green-700";

//     case "SYSTEM":
//       return "bg-slate-200 text-slate-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function SystemAuditPage() {
//   const [events] = useState<AuditEvent[]>(INITIAL_EVENTS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | AuditStatus>("ALL");

//   const [categoryFilter, setCategoryFilter] =
//     useState<"ALL" | AuditCategory>("ALL");

//   const filteredEvents = useMemo(() => {
//     const value = search.trim().toLowerCase();

//     return events.filter((event) => {
//       const matchesSearch =
//         value.length === 0 ||
//         event.id.toLowerCase().includes(value) ||
//         event.action.toLowerCase().includes(value) ||
//         event.actor.toLowerCase().includes(value) ||
//         event.actorRole.toLowerCase().includes(value) ||
//         event.target.toLowerCase().includes(value) ||
//         event.correlationId.toLowerCase().includes(value);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         event.status === statusFilter;

//       const matchesCategory =
//         categoryFilter === "ALL" ||
//         event.category === categoryFilter;

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesCategory
//       );
//     });
//   }, [
//     events,
//     search,
//     statusFilter,
//     categoryFilter,
//   ]);

//   const summary = useMemo(() => {
//     return {
//       total: events.length,

//       successful: events.filter(
//         (event) => event.status === "SUCCESS"
//       ).length,

//       warnings: events.filter(
//         (event) => event.status === "WARNING"
//       ).length,

//       failed: events.filter(
//         (event) => event.status === "FAILED"
//       ).length,

//       pending: events.filter(
//         (event) => event.status === "PENDING"
//       ).length,

//       authentication: events.filter(
//         (event) => event.category === "AUTHENTICATION"
//       ).length,

//       authorization: events.filter(
//         (event) => event.category === "AUTHORIZATION"
//       ).length,

//       rbac: events.filter(
//         (event) => event.category === "RBAC"
//       ).length,
//     };
//   }, [events]);

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setCategoryFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//           <div className="flex items-center gap-4">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
//               🛡️
//             </div>

//             <div>

//               <h1 className="text-2xl font-bold text-slate-900">
//                 System Audit
//               </h1>

//               <p className="mt-1 text-sm text-slate-500">
//                 Monitor authentication, authorization,
//                 RBAC, configuration and protected system
//                 activities.
//               </p>

//             </div>

//           </div>

//           <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3">

//             <p className="text-xs font-bold text-purple-800">
//               Governance Monitoring
//             </p>

//             <p className="mt-1 text-xs text-purple-700">
//               Audit events are authoritative only when
//               recorded by trusted backend services.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">

//         <SummaryCard
//           title="Total Events"
//           value={summary.total}
//         />

//         <SummaryCard
//           title="Successful"
//           value={summary.successful}
//         />

//         <SummaryCard
//           title="Warnings"
//           value={summary.warnings}
//         />

//         <SummaryCard
//           title="Failed"
//           value={summary.failed}
//         />

//         <SummaryCard
//           title="Pending"
//           value={summary.pending}
//         />

//         <SummaryCard
//           title="Auth Events"
//           value={summary.authentication}
//         />

//         <SummaryCard
//           title="Authorization"
//           value={summary.authorization}
//         />

//         <SummaryCard
//           title="RBAC"
//           value={summary.rbac}
//         />

//       </div>

//       {/* AUDIT MODULES */}

//       <div className="mb-6">

//         <div className="mb-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Audit Modules
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Review important governance areas of the
//             JUERP platform.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

//           <AuditModuleCard
//             icon="🔐"
//             title="RBAC Roles"
//             description="Review system roles, scope and permission assignments."
//             href="/system-audit/rbac-roles"
//             count={`${summary.rbac} recent events`}
//           />

//           <AuditModuleCard
//             icon="👤"
//             title="Authentication"
//             description="Monitor administrator authentication and login events."
//             count={`${summary.authentication} recent events`}
//           />

//           <AuditModuleCard
//             icon="🛡️"
//             title="Authorization"
//             description="Monitor role and scope authorization checks."
//             count={`${summary.authorization} recent events`}
//           />

//           <AuditModuleCard
//             icon="⚙️"
//             title="Configuration"
//             description="Review important configuration and governance activity."
//             count="System monitored"
//           />

//         </div>

//       </div>

//       {/* AUDIT FLOW */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="mb-5">

//           <h2 className="text-lg font-bold text-slate-900">
//             System Audit Flow
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Protected administrative activity should follow
//             a traceable audit path.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-5">

//           <FlowStep
//             number="01"
//             title="Authenticate"
//             description="Identify the authenticated actor."
//           />

//           <FlowStep
//             number="02"
//             title="Authorize"
//             description="Validate role and administrative scope."
//           />

//           <FlowStep
//             number="03"
//             title="Execute"
//             description="Perform the authorized operation."
//           />

//           <FlowStep
//             number="04"
//             title="Record"
//             description="Create the authoritative audit event."
//           />

//           <FlowStep
//             number="05"
//             title="Review"
//             description="Monitor exceptions and governance."
//           />

//         </div>

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

//           <div className="md:col-span-2">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search Audit Events
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search event, actor, target or correlation ID..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | AuditStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="SUCCESS">
//                 Success
//               </option>

//               <option value="WARNING">
//                 Warning
//               </option>

//               <option value="FAILED">
//                 Failed
//               </option>

//               <option value="PENDING">
//                 Pending
//               </option>

//             </select>

//           </div>

//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">

//           <div>

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Category
//             </label>

//             <select
//               value={categoryFilter}
//               onChange={(event) =>
//                 setCategoryFilter(
//                   event.target.value as
//                     | "ALL"
//                     | AuditCategory
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Categories
//               </option>

//               {Object.entries(
//                 CATEGORY_LABELS
//               ).map(([value, label]) => (
//                 <option
//                   key={value}
//                   value={value}
//                 >
//                   {label}
//                 </option>
//               ))}

//             </select>

//           </div>

//           <div className="flex items-end">

//             <p className="pb-2 text-xs text-slate-400">

//               Showing{" "}

//               <span className="font-bold text-slate-700">
//                 {filteredEvents.length}
//               </span>

//               {" "}of{" "}

//               <span className="font-bold text-slate-700">
//                 {events.length}
//               </span>

//               {" "}audit events

//             </p>

//           </div>

//           <div className="flex items-end justify-start md:justify-end">

//             <button
//               type="button"
//               onClick={clearFilters}
//               className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//             >
//               Clear Filters
//             </button>

//           </div>

//         </div>

//       </div>

//       {/* AUDIT EVENTS DESKTOP */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Recent Audit Events
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and system governance activity.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Event
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Category
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Actor
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Target
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Correlation ID
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Time
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredEvents.map((event) => (
//                 <tr
//                   key={event.id}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <div>

//                       <p className="text-sm font-bold text-slate-900">
//                         {event.action}
//                       </p>

//                       <p className="mt-1 text-[11px] text-slate-400">
//                         {event.id}
//                       </p>

//                     </div>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getCategoryClasses(
//                         event.category
//                       )}`}
//                     >
//                       {CATEGORY_LABELS[event.category]}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <p className="text-sm font-semibold text-slate-800">
//                       {event.actor}
//                     </p>

//                     <p className="mt-1 text-[11px] text-slate-400">
//                       {event.actorRole}
//                     </p>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="text-sm text-slate-700">
//                       {event.target}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
//                         event.status
//                       )}`}
//                     >
//                       {event.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <code className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
//                       {event.correlationId}
//                     </code>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="whitespace-nowrap text-xs text-slate-500">
//                       {event.timestamp}
//                     </span>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredEvents.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE EVENTS */}

//       <div className="space-y-4 md:hidden">

//         <div>

//           <h2 className="text-lg font-bold text-slate-900">
//             Recent Audit Events
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             Administrative and system governance activity.
//           </p>

//         </div>

//         {filteredEvents.map((event) => (
//           <div
//             key={event.id}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div>

//                 <p className="text-sm font-bold text-slate-900">
//                   {event.action}
//                 </p>

//                 <p className="mt-1 text-[10px] text-slate-400">
//                   {event.id}
//                 </p>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
//                   event.status
//                 )}`}
//               >
//                 {event.status}
//               </span>

//             </div>

//             <div className="mt-4">

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getCategoryClasses(
//                   event.category
//                 )}`}
//               >
//                 {CATEGORY_LABELS[event.category]}
//               </span>

//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileInfo
//                 label="Actor"
//                 value={event.actor}
//               />

//               <MobileInfo
//                 label="Role"
//                 value={event.actorRole}
//               />

//               <MobileInfo
//                 label="Target"
//                 value={event.target}
//               />

//               <MobileInfo
//                 label="Time"
//                 value={event.timestamp}
//               />

//             </div>

//             <div className="mt-3 rounded-xl bg-slate-50 p-3">

//               <p className="text-[10px] font-medium text-slate-400">
//                 Correlation ID
//               </p>

//               <p className="mt-1 break-all font-mono text-[11px] font-semibold text-slate-700">
//                 {event.correlationId}
//               </p>

//             </div>

//           </div>
//         ))}

//         {filteredEvents.length === 0 && (
//           <div className="rounded-2xl bg-white">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* SECURITY GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">

//         <div className="flex items-start gap-4">

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
//             🛡️
//           </div>

//           <div>

//             <h2 className="text-sm font-bold text-red-900">
//               Security & Audit Governance
//             </h2>

//             <p className="mt-2 text-xs leading-6 text-red-800">
//               System Audit is a governance and monitoring
//               layer. It must not become the security boundary
//               itself. Authentication, role authorization,
//               administrative scope and protected operations
//               must be enforced by trusted backend services,
//               Firebase Authentication claims and Firestore
//               security rules.
//             </p>

//           </div>

//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="Authentication"
//             description="Verify the authenticated identity before allowing protected operations."
//           />

//           <GovernanceCard
//             title="RBAC"
//             description="Apply the authoritative role model and never trust client-only role checks."
//           />

//           <GovernanceCard
//             title="Scope"
//             description="State, district and pincode boundaries must be enforced from trusted scope data."
//           />

//           <GovernanceCard
//             title="Audit Log"
//             description="Protected actions should generate immutable audit records with traceability."
//           />

//         </div>

//       </div>

//       {/* AUDIT DATA MODEL */}

//       <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="mb-5">

//           <h2 className="text-lg font-bold text-slate-900">
//             Audit Data Model
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Important identifiers used to trace protected
//             administrative operations.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

//           <DataModelCard
//             title="audit_logs"
//             description="Authoritative audit records for protected operations."
//           />

//           <DataModelCard
//             title="correlationId"
//             description="Connects related operations across the trusted backend."
//           />

//           <DataModelCard
//             title="idempotencyKey"
//             description="Prevents duplicate execution of protected commands."
//           />

//           <DataModelCard
//             title="actor / role / scope"
//             description="Identifies who performed an action and under which authority."
//           />

//         </div>

//       </div>

//     </div>
//   );
// }

// function SummaryCard({
//   title,
//   value,
// }: {
//   title: string;
//   value: number;
// }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">

//       <p className="text-[10px] font-medium text-slate-500">
//         {title}
//       </p>

//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {value}
//       </p>

//     </div>
//   );
// }

// function AuditModuleCard({
//   icon,
//   title,
//   description,
//   count,
//   href,
// }: {
//   icon: string;
//   title: string;
//   description: string;
//   count: string;
//   href?: string;
// }) {
//   const content = (
//     <>
//       <div className="flex items-center justify-between">

//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
//           {icon}
//         </div>

//         {href && (
//           <span className="text-xs font-bold text-orange-600">
//             Open →
//           </span>
//         )}

//       </div>

//       <h3 className="mt-4 text-sm font-bold text-slate-900">
//         {title}
//       </h3>

//       <p className="mt-2 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//       <p className="mt-4 text-[11px] font-semibold text-slate-400">
//         {count}
//       </p>
//     </>
//   );

//   if (href) {
//     return (
//       <Link
//         href={href}
//         className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//       >
//         {content}
//       </Link>
//     );
//   }

//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       {content}
//     </div>
//   );
// }

// function FlowStep({
//   number,
//   title,
//   description,
// }: {
//   number: string;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

//       <div className="flex items-center gap-3">

//         <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-white">
//           {number}
//         </div>

//         <p className="text-xs font-bold text-slate-800">
//           {title}
//         </p>

//       </div>

//       <p className="mt-3 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

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
//     <div className="rounded-xl bg-slate-50 p-3">

//       <p className="text-[10px] font-medium text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-xs font-bold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function GovernanceCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-red-200 bg-white p-4">

//       <p className="text-xs font-bold text-red-800">
//         {title}
//       </p>

//       <p className="mt-2 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function DataModelCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

//       <p className="font-mono text-xs font-bold text-slate-800">
//         {title}
//       </p>

//       <p className="mt-2 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="px-5 py-14 text-center">

//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         🛡️
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No audit events found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  useSystemAudit,
  type AuditCategory,
  type AuditStatus,
} from "@/hooks/useSystemAudit";

const CATEGORY_LABELS: Record<AuditCategory, string> = {
  AUTHENTICATION: "Authentication",
  AUTHORIZATION: "Authorization",
  RBAC: "RBAC",
  CONFIGURATION: "Configuration",
  OVERRIDE: "Override",
  FINANCIAL: "Financial",
  SYSTEM: "System",
};

function getStatusClasses(status: AuditStatus) {
  switch (status) {
    case "SUCCESS":
      return "bg-green-100 text-green-700";
    case "WARNING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "PENDING":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getCategoryClasses(category: AuditCategory) {
  switch (category) {
    case "AUTHENTICATION":
      return "bg-blue-100 text-blue-700";
    case "AUTHORIZATION":
      return "bg-cyan-100 text-cyan-700";
    case "RBAC":
      return "bg-purple-100 text-purple-700";
    case "CONFIGURATION":
      return "bg-orange-100 text-orange-700";
    case "OVERRIDE":
      return "bg-red-100 text-red-700";
    case "FINANCIAL":
      return "bg-green-100 text-green-700";
    case "SYSTEM":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function SystemAuditPage() {
  const { events, summary, loading, error, refresh } = useSystemAudit();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AuditStatus>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<"ALL" | AuditCategory>(
    "ALL"
  );

  const filteredEvents = useMemo(() => {
    const value = search.trim().toLowerCase();
    return events.filter((event) => {
      const matchesSearch =
        value.length === 0 ||
        event.id.toLowerCase().includes(value) ||
        event.action.toLowerCase().includes(value) ||
        event.actor.toLowerCase().includes(value) ||
        event.actorRole.toLowerCase().includes(value) ||
        event.target.toLowerCase().includes(value) ||
        event.correlationId.toLowerCase().includes(value);

      const matchesStatus =
        statusFilter === "ALL" || event.status === statusFilter;
      const matchesCategory =
        categoryFilter === "ALL" || event.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [events, search, statusFilter, categoryFilter]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
              🛡️
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                System Audit
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Live authentication, authorization, RBAC, configuration and
                protected system activity from Firestore{" "}
                <code className="text-[10px]">audit_logs</code>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void refresh()}
              disabled={loading}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
            <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3">
              <p className="text-xs font-bold text-purple-800">
                Governance Monitoring
              </p>
              <p className="mt-1 text-xs text-purple-700">
                Audit events are authoritative only when recorded by trusted
                backend services.
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        <SummaryCard title="Total Events" value={summary.total} />
        <SummaryCard title="Successful" value={summary.successful} />
        <SummaryCard title="Warnings" value={summary.warnings} />
        <SummaryCard title="Failed" value={summary.failed} />
        <SummaryCard title="Pending" value={summary.pending} />
        <SummaryCard title="Auth Events" value={summary.authentication} />
        <SummaryCard title="Authorization" value={summary.authorization} />
        <SummaryCard title="RBAC" value={summary.rbac} />
      </div>

      <div className="mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">Audit Modules</h2>
          <p className="mt-1 text-sm text-slate-500">
            Review important governance areas of the JUERP platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AuditModuleCard
            icon="🔐"
            title="RBAC Roles"
            description="Review system roles, scope and permission assignments."
            href="/system-audit/rbac-roles"
            count={`${summary.rbac} recent RBAC events`}
          />
          <AuditModuleCard
            icon="👤"
            title="Authentication"
            description="Monitor administrator authentication and login events."
            count={`${summary.authentication} recent events`}
          />
          <AuditModuleCard
            icon="🛡️"
            title="Authorization"
            description="Monitor role and scope authorization checks."
            count={`${summary.authorization} recent events`}
          />
          <AuditModuleCard
            icon="⚙️"
            title="Configuration"
            description="Review important configuration and governance activity."
            count="System monitored"
          />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">System Audit Flow</h2>
          <p className="mt-1 text-sm text-slate-500">
            Protected administrative activity should follow a traceable audit
            path.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
          <FlowStep number="01" title="Authenticate" description="Identify the authenticated actor." />
          <FlowStep number="02" title="Authorize" description="Validate role and administrative scope." />
          <FlowStep number="03" title="Execute" description="Perform the authorized operation." />
          <FlowStep number="04" title="Record" description="Create the authoritative audit event." />
          <FlowStep number="05" title="Review" description="Monitor exceptions and governance." />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search Audit Events
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search event, actor, target or correlation ID..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | AuditStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUCCESS">Success</option>
              <option value="WARNING">Warning</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as "ALL" | AuditCategory)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <p className="pb-2 text-xs text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-700">
                {filteredEvents.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-700">{events.length}</span>{" "}
              audit events
              {loading ? " · Loading…" : ""}
            </p>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Audit Events
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            From collection <code className="text-[10px]">audit_logs</code>
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Event</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Category</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Actor</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Target</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Correlation ID</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">{event.action}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{event.id}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getCategoryClasses(event.category)}`}>
                      {CATEGORY_LABELS[event.category]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">{event.actor}</p>
                    <p className="mt-1 text-[11px] text-slate-400">{event.actorRole}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-slate-700">{event.target}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(event.status)}`}>
                      {event.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <code className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
                      {event.correlationId}
                    </code>
                  </td>
                  <td className="px-5 py-4">
                    <span className="whitespace-nowrap text-xs text-slate-500">
                      {event.timestamp}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filteredEvents.length === 0 && <EmptyState />}
        {loading && events.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Loading audit logs from Firestore…
          </div>
        )}
      </div>

      <div className="space-y-4 md:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Recent Audit Events</h2>
          <p className="mt-1 text-xs text-slate-500">Live Firestore audit feed.</p>
        </div>
        {filteredEvents.map((event) => (
          <div key={event.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-slate-900">{event.action}</p>
                <p className="mt-1 text-[10px] text-slate-400">{event.id}</p>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(event.status)}`}>
                {event.status}
              </span>
            </div>
            <div className="mt-4">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getCategoryClasses(event.category)}`}>
                {CATEGORY_LABELS[event.category]}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <MobileInfo label="Actor" value={event.actor} />
              <MobileInfo label="Role" value={event.actorRole} />
              <MobileInfo label="Target" value={event.target} />
              <MobileInfo label="Time" value={event.timestamp} />
            </div>
            <div className="mt-3 rounded-xl bg-slate-50 p-3">
              <p className="text-[10px] font-medium text-slate-400">Correlation ID</p>
              <p className="mt-1 break-all font-mono text-[11px] font-semibold text-slate-700">
                {event.correlationId}
              </p>
            </div>
          </div>
        ))}
        {!loading && filteredEvents.length === 0 && (
          <div className="rounded-2xl bg-white">
            <EmptyState />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
            🛡️
          </div>
          <div>
            <h2 className="text-sm font-bold text-red-900">
              Security & Audit Governance
            </h2>
            <p className="mt-2 text-xs leading-6 text-red-800">
              System Audit is a governance and monitoring layer. It must not
              become the security boundary itself. Authentication, role
              authorization, administrative scope and protected operations must
              be enforced by trusted backend services, Firebase Authentication
              claims and Firestore security rules.
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">
          <GovernanceCard title="Authentication" description="Verify the authenticated identity before allowing protected operations." />
          <GovernanceCard title="RBAC" description="Apply the authoritative role model and never trust client-only role checks." />
          <GovernanceCard title="Scope" description="State, district and pincode boundaries must be enforced from trusted scope data." />
          <GovernanceCard title="Audit Log" description="Protected actions should generate immutable audit records with traceability." />
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">Audit Data Model</h2>
          <p className="mt-1 text-sm text-slate-500">
            Important identifiers used to trace protected administrative
            operations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DataModelCard title="audit_logs" description="Authoritative audit records for protected operations." />
          <DataModelCard title="correlationId" description="Connects related operations across the trusted backend." />
          <DataModelCard title="idempotencyKey" description="Prevents duplicate execution of protected commands." />
          <DataModelCard title="actor / role / scope" description="Identifies who performed an action and under which authority." />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-[10px] font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}

function AuditModuleCard({
  icon,
  title,
  description,
  count,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  count: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
          {icon}
        </div>
        {href && (
          <span className="text-xs font-bold text-orange-600">Open →</span>
        )}
      </div>
      <h3 className="mt-4 text-sm font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
      <p className="mt-4 text-[11px] font-semibold text-slate-400">{count}</p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
      >
        {content}
      </Link>
    );
  }

  return <div className="rounded-2xl bg-white p-5 shadow-sm">{content}</div>;
}

function FlowStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-white">
          {number}
        </div>
        <p className="text-xs font-bold text-slate-800">{title}</p>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function MobileInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 break-words text-xs font-bold text-slate-800">{value}</p>
    </div>
  );
}

function GovernanceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-white p-4">
      <p className="text-xs font-bold text-red-800">{title}</p>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function DataModelCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-mono text-xs font-bold text-slate-800">{title}</p>
      <p className="mt-2 text-[11px] leading-5 text-slate-500">{description}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        🛡️
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">No audit events found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty <code className="text-[10px]">audit_logs</code> collection or filters
        too narrow.
      </p>
    </div>
  );
}