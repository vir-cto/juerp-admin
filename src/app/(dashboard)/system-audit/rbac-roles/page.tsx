// "use client";

// import { useMemo, useState } from "react";

// type RoleId =
//   | "SUPER_ADMIN"
//   | "STATE_ADMIN"
//   | "DISTRICT_ADMIN"
//   | "TECHNICAL_ADMIN"
//   | "VENDOR_OWNER"
//   | "CAPTAIN"
//   | "CUSTOMER";

// type RoleStatus = "ACTIVE" | "RESTRICTED";

// type ScopeType =
//   | "GLOBAL"
//   | "STATE"
//   | "DISTRICT"
//   | "PINCODE"
//   | "VENDOR"
//   | "CAPTAIN"
//   | "CUSTOMER";

// type PermissionLevel =
//   | "FULL"
//   | "MANAGE"
//   | "VIEW"
//   | "LIMITED"
//   | "NONE";

// type Role = {
//   id: RoleId;
//   name: string;
//   description: string;
//   status: RoleStatus;
//   scope: ScopeType;
//   users: number;
//   permissions: number;
//   lastUpdated: string;
// };

// type Permission = {
//   module: string;
//   view: PermissionLevel;
//   create: PermissionLevel;
//   update: PermissionLevel;
//   approve: PermissionLevel;
//   delete: PermissionLevel;
// };

// const INITIAL_ROLES: Role[] = [
//   {
//     id: "SUPER_ADMIN",
//     name: "Super Admin",
//     description:
//       "Highest JUERP administrative authority with platform-wide governance access.",
//     status: "ACTIVE",
//     scope: "GLOBAL",
//     users: 2,
//     permissions: 42,
//     lastUpdated: "05 Oct 2026, 09:10 AM",
//   },
//   {
//     id: "STATE_ADMIN",
//     name: "State Admin",
//     description:
//       "Administrative authority for assigned state-level operational scope.",
//     status: "ACTIVE",
//     scope: "STATE",
//     users: 8,
//     permissions: 31,
//     lastUpdated: "05 Oct 2026, 09:15 AM",
//   },
//   {
//     id: "DISTRICT_ADMIN",
//     name: "District Admin",
//     description:
//       "Administrative authority for assigned district and subordinate pincode scope.",
//     status: "ACTIVE",
//     scope: "DISTRICT",
//     users: 26,
//     permissions: 24,
//     lastUpdated: "05 Oct 2026, 09:18 AM",
//   },
//   {
//     id: "TECHNICAL_ADMIN",
//     name: "Technical Admin",
//     description:
//       "Privileged technical operations and system governance role.",
//     status: "ACTIVE",
//     scope: "GLOBAL",
//     users: 4,
//     permissions: 28,
//     lastUpdated: "05 Oct 2026, 09:20 AM",
//   },
//   {
//     id: "VENDOR_OWNER",
//     name: "Vendor Owner",
//     description:
//       "Vendor-side access for authorized business and module operations.",
//     status: "ACTIVE",
//     scope: "VENDOR",
//     users: 184,
//     permissions: 18,
//     lastUpdated: "04 Oct 2026, 06:30 PM",
//   },
//   {
//     id: "CAPTAIN",
//     name: "Captain",
//     description:
//       "Captain-side access for authorized service and assignment operations.",
//     status: "ACTIVE",
//     scope: "CAPTAIN",
//     users: 642,
//     permissions: 14,
//     lastUpdated: "04 Oct 2026, 06:25 PM",
//   },
//   {
//     id: "CUSTOMER",
//     name: "Customer",
//     description:
//       "Customer application role with access to customer-owned operations.",
//     status: "ACTIVE",
//     scope: "CUSTOMER",
//     users: 18452,
//     permissions: 11,
//     lastUpdated: "04 Oct 2026, 06:20 PM",
//   },
// ];

// const PERMISSIONS: Record<RoleId, Permission[]> = {
//   SUPER_ADMIN: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "FULL",
//     },
//     {
//       module: "Entity Management",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "FULL",
//     },
//     {
//       module: "Hierarchy",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "FULL",
//     },
//     {
//       module: "Commission Engine",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "FULL",
//     },
//     {
//       module: "Financial Audit",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "FULL",
//       delete: "LIMITED",
//     },
//     {
//       module: "Overrides",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "LIMITED",
//     },
//     {
//       module: "System Audit",
//       view: "FULL",
//       create: "FULL",
//       update: "FULL",
//       approve: "FULL",
//       delete: "LIMITED",
//     },
//   ],

//   STATE_ADMIN: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "MANAGE",
//       approve: "MANAGE",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "MANAGE",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "MANAGE",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "MANAGE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "FULL",
//       create: "VIEW",
//       update: "LIMITED",
//       approve: "LIMITED",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "MANAGE",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "FULL",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],

//   DISTRICT_ADMIN: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "MANAGE",
//       approve: "LIMITED",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "LIMITED",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "LIMITED",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "FULL",
//       create: "LIMITED",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "VIEW",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "LIMITED",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "VIEW",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],

//   TECHNICAL_ADMIN: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "FULL",
//       create: "VIEW",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "FULL",
//       create: "LIMITED",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "FULL",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],

//   VENDOR_OWNER: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "LIMITED",
//       create: "MANAGE",
//       update: "MANAGE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "LIMITED",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "VIEW",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "LIMITED",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "VIEW",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],

//   CAPTAIN: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "LIMITED",
//       create: "NONE",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "LIMITED",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "VIEW",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "LIMITED",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],

//   CUSTOMER: [
//     {
//       module: "Dashboard",
//       view: "FULL",
//       create: "NONE",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Entity Management",
//       view: "LIMITED",
//       create: "NONE",
//       update: "LIMITED",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Hierarchy",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Commission Engine",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Financial Audit",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "Overrides",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//     {
//       module: "System Audit",
//       view: "NONE",
//       create: "NONE",
//       update: "NONE",
//       approve: "NONE",
//       delete: "NONE",
//     },
//   ],
// };

// function getRoleClasses(role: RoleId) {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "bg-purple-100 text-purple-700";

//     case "STATE_ADMIN":
//       return "bg-blue-100 text-blue-700";

//     case "DISTRICT_ADMIN":
//       return "bg-cyan-100 text-cyan-700";

//     case "TECHNICAL_ADMIN":
//       return "bg-slate-200 text-slate-700";

//     case "VENDOR_OWNER":
//       return "bg-orange-100 text-orange-700";

//     case "CAPTAIN":
//       return "bg-green-100 text-green-700";

//     case "CUSTOMER":
//       return "bg-pink-100 text-pink-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getPermissionClasses(
//   permission: PermissionLevel
// ) {
//   switch (permission) {
//     case "FULL":
//       return "bg-green-100 text-green-700";

//     case "MANAGE":
//       return "bg-blue-100 text-blue-700";

//     case "VIEW":
//       return "bg-slate-100 text-slate-700";

//     case "LIMITED":
//       return "bg-yellow-100 text-yellow-700";

//     case "NONE":
//       return "bg-red-50 text-red-500";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getScopeLabel(scope: ScopeType) {
//   switch (scope) {
//     case "GLOBAL":
//       return "Global";

//     case "STATE":
//       return "State";

//     case "DISTRICT":
//       return "District";

//     case "PINCODE":
//       return "Pincode";

//     case "VENDOR":
//       return "Vendor";

//     case "CAPTAIN":
//       return "Captain";

//     case "CUSTOMER":
//       return "Customer";

//     default:
//       return scope;
//   }
// }

// function formatNumber(value: number) {
//   return new Intl.NumberFormat("en-IN").format(value);
// }

// export default function RBACRolesPage() {
//   const [roles] = useState<Role[]>(INITIAL_ROLES);

//   const [selectedRole, setSelectedRole] =
//     useState<RoleId | null>(null);

//   const [search, setSearch] = useState("");

//   const [roleFilter, setRoleFilter] =
//     useState<"ALL" | RoleId>("ALL");

//   const [scopeFilter, setScopeFilter] =
//     useState<"ALL" | ScopeType>("ALL");

//   const [statusFilter, setStatusFilter] =
//     useState<"ALL" | RoleStatus>("ALL");

//   const filteredRoles = useMemo(() => {
//     const value = search.trim().toLowerCase();

//     return roles.filter((role) => {
//       const matchesSearch =
//         value.length === 0 ||
//         role.id.toLowerCase().includes(value) ||
//         role.name.toLowerCase().includes(value) ||
//         role.description.toLowerCase().includes(value);

//       const matchesRole =
//         roleFilter === "ALL" ||
//         role.id === roleFilter;

//       const matchesScope =
//         scopeFilter === "ALL" ||
//         role.scope === scopeFilter;

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         role.status === statusFilter;

//       return (
//         matchesSearch &&
//         matchesRole &&
//         matchesScope &&
//         matchesStatus
//       );
//     });
//   }, [
//     roles,
//     search,
//     roleFilter,
//     scopeFilter,
//     statusFilter,
//   ]);

//   const summary = useMemo(() => {
//     const totalUsers = roles.reduce(
//       (total, role) => total + role.users,
//       0
//     );

//     const totalPermissions = roles.reduce(
//       (total, role) => total + role.permissions,
//       0
//     );

//     return {
//       totalRoles: roles.length,
//       activeRoles: roles.filter(
//         (role) => role.status === "ACTIVE"
//       ).length,
//       restrictedRoles: roles.filter(
//         (role) => role.status === "RESTRICTED"
//       ).length,
//       totalUsers,
//       totalPermissions,
//       adminRoles: roles.filter((role) =>
//         [
//           "SUPER_ADMIN",
//           "STATE_ADMIN",
//           "DISTRICT_ADMIN",
//           "TECHNICAL_ADMIN",
//         ].includes(role.id)
//       ).length,
//     };
//   }, [roles]);

//   const selectedRoleData = selectedRole
//     ? roles.find((role) => role.id === selectedRole) ??
//       null
//     : null;

//   function clearFilters() {
//     setSearch("");
//     setRoleFilter("ALL");
//     setScopeFilter("ALL");
//     setStatusFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

//           <div className="flex items-center gap-4">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
//               🔐
//             </div>

//             <div>

//               <h1 className="text-2xl font-bold text-slate-900">
//                 RBAC Roles
//               </h1>

//               <p className="mt-1 text-sm text-slate-500">
//                 Review JUERP role definitions, scope and
//                 permission assignments.
//               </p>

//             </div>

//           </div>

//           <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3">

//             <p className="text-xs font-bold text-purple-800">
//               System Audit
//             </p>

//             <p className="mt-1 text-xs text-purple-700">
//               Role access is governed by backend authorization.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* SUMMARY */}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">

//         <SummaryCard
//           title="Total Roles"
//           value={summary.totalRoles}
//         />

//         <SummaryCard
//           title="Active Roles"
//           value={summary.activeRoles}
//         />

//         <SummaryCard
//           title="Restricted"
//           value={summary.restrictedRoles}
//         />

//         <SummaryCard
//           title="Admin Roles"
//           value={summary.adminRoles}
//         />

//         <SummaryCard
//           title="Assigned Users"
//           value={summary.totalUsers}
//         />

//         <SummaryCard
//           title="Permissions"
//           value={summary.totalPermissions}
//         />

//       </div>

//       {/* ROLE HIERARCHY */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="mb-5">

//           <h2 className="text-lg font-bold text-slate-900">
//             JUERP Role Hierarchy
//           </h2>

//           <p className="mt-1 text-sm text-slate-500">
//             Administrative roles follow the governed
//             authority model.
//           </p>

//         </div>

//         <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

//           <HierarchyBox
//             title="SUPER_ADMIN"
//             description="Platform-wide authority"
//             color="purple"
//           />

//           <Arrow />

//           <HierarchyBox
//             title="STATE_ADMIN"
//             description="State scope"
//             color="blue"
//           />

//           <Arrow />

//           <HierarchyBox
//             title="DISTRICT_ADMIN"
//             description="District scope"
//             color="cyan"
//           />

//           <Arrow />

//           <HierarchyBox
//             title="PINCODE SCOPE"
//             description="Operational boundary"
//             color="orange"
//           />

//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">

//           <SmallRoleBox
//             title="TECHNICAL_ADMIN"
//             description="Separate privileged technical role."
//           />

//           <SmallRoleBox
//             title="VENDOR_OWNER"
//             description="Vendor-scoped operational access."
//           />

//           <SmallRoleBox
//             title="CAPTAIN / CUSTOMER"
//             description="Role-specific client access."
//           />

//         </div>

//       </div>

//       {/* FILTERS */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">

//           <div className="lg:col-span-2">

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Search role or description..."
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Role
//             </label>

//             <select
//               value={roleFilter}
//               onChange={(event) =>
//                 setRoleFilter(
//                   event.target.value as
//                     | "ALL"
//                     | RoleId
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Roles
//               </option>

//               {roles.map((role) => (
//                 <option
//                   key={role.id}
//                   value={role.id}
//                 >
//                   {role.name}
//                 </option>
//               ))}

//             </select>

//           </div>

//           <div>

//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Scope
//             </label>

//             <select
//               value={scopeFilter}
//               onChange={(event) =>
//                 setScopeFilter(
//                   event.target.value as
//                     | "ALL"
//                     | ScopeType
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Scopes
//               </option>

//               <option value="GLOBAL">
//                 Global
//               </option>

//               <option value="STATE">
//                 State
//               </option>

//               <option value="DISTRICT">
//                 District
//               </option>

//               <option value="VENDOR">
//                 Vendor
//               </option>

//               <option value="CAPTAIN">
//                 Captain
//               </option>

//               <option value="CUSTOMER">
//                 Customer
//               </option>

//             </select>

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
//                     | RoleStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >

//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="ACTIVE">
//                 Active
//               </option>

//               <option value="RESTRICTED">
//                 Restricted
//               </option>

//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex items-center justify-between">

//           <p className="text-xs text-slate-400">

//             Showing{" "}

//             <span className="font-bold text-slate-700">
//               {filteredRoles.length}
//             </span>

//             {" "}of{" "}

//             <span className="font-bold text-slate-700">
//               {roles.length}
//             </span>

//             {" "}roles

//           </p>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             Clear Filters
//           </button>

//         </div>

//       </div>

//       {/* ROLE TABLE */}

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

//         <div className="border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             Role Registry
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             System-defined roles and their governed scope.
//           </p>

//         </div>

//         <div className="overflow-x-auto">

//           <table className="w-full text-left">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Role
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Scope
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Users
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Permissions
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Updated
//                 </th>

//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Action
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredRoles.map((role) => (
//                 <tr
//                   key={role.id}
//                   className="hover:bg-slate-50"
//                 >

//                   <td className="px-5 py-4">

//                     <div className="flex items-center gap-3">

//                       <div
//                         className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${getRoleClasses(
//                           role.id
//                         )}`}
//                       >
//                         {role.id.substring(0, 2)}
//                       </div>

//                       <div>

//                         <p className="text-sm font-bold text-slate-900">
//                           {role.name}
//                         </p>

//                         <p className="mt-1 max-w-xs text-xs text-slate-400">
//                           {role.description}
//                         </p>

//                       </div>

//                     </div>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
//                       {getScopeLabel(role.scope)}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="text-sm font-bold text-slate-800">
//                       {formatNumber(role.users)}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="text-sm font-bold text-slate-800">
//                       {role.permissions}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
//                         role.status === "ACTIVE"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {role.status}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <span className="text-xs text-slate-500">
//                       {role.lastUpdated}
//                     </span>

//                   </td>

//                   <td className="px-5 py-4">

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setSelectedRole(role.id)
//                       }
//                       className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                     >
//                       View Permissions
//                     </button>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {filteredRoles.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE ROLE CARDS */}

//       <div className="space-y-4 md:hidden">

//         <div>

//           <h2 className="text-lg font-bold text-slate-900">
//             Role Registry
//           </h2>

//           <p className="mt-1 text-xs text-slate-500">
//             System-defined roles and their governed scope.
//           </p>

//         </div>

//         {filteredRoles.map((role) => (
//           <div
//             key={role.id}
//             className="rounded-2xl bg-white p-5 shadow-sm"
//           >

//             <div className="flex items-start justify-between gap-3">

//               <div className="flex items-center gap-3">

//                 <div
//                   className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${getRoleClasses(
//                     role.id
//                   )}`}
//                 >
//                   {role.id.substring(0, 2)}
//                 </div>

//                 <div>

//                   <p className="text-sm font-bold text-slate-900">
//                     {role.name}
//                   </p>

//                   <p className="mt-1 text-[11px] text-slate-400">
//                     {role.id}
//                   </p>

//                 </div>

//               </div>

//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
//                   role.status === "ACTIVE"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {role.status}
//               </span>

//             </div>

//             <p className="mt-4 text-xs leading-5 text-slate-500">
//               {role.description}
//             </p>

//             <div className="mt-4 grid grid-cols-2 gap-3">

//               <MobileInfo
//                 label="Scope"
//                 value={getScopeLabel(role.scope)}
//               />

//               <MobileInfo
//                 label="Users"
//                 value={formatNumber(role.users)}
//               />

//               <MobileInfo
//                 label="Permissions"
//                 value={String(role.permissions)}
//               />

//               <MobileInfo
//                 label="Updated"
//                 value={role.lastUpdated}
//               />

//             </div>

//             <button
//               type="button"
//               onClick={() =>
//                 setSelectedRole(role.id)
//               }
//               className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700"
//             >
//               View Permissions
//             </button>

//           </div>
//         ))}

//         {filteredRoles.length === 0 && (
//           <div className="rounded-2xl bg-white">
//             <EmptyState />
//           </div>
//         )}

//       </div>

//       {/* GOVERNANCE */}

//       <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">

//         <div className="flex items-start gap-4">

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
//             🔐
//           </div>

//           <div>

//             <h2 className="text-sm font-bold text-purple-900">
//               RBAC Governance
//             </h2>

//             <p className="mt-2 text-xs leading-6 text-purple-800">
//               This page is a system-audit view of the JUERP
//               role model. The browser must not be treated as
//               the security boundary. Authentication claims,
//               backend authorization, Firestore security rules
//               and authoritative scope records must enforce
//               the actual permissions.
//             </p>

//           </div>

//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">

//           <GovernanceCard
//             title="Identity"
//             description="Firebase Authentication establishes the authenticated user identity."
//           />

//           <GovernanceCard
//             title="Role"
//             description="The authorized role is derived from trusted claims and backend-controlled identity data."
//           />

//           <GovernanceCard
//             title="Scope"
//             description="State, district and pincode scope must be enforced from authoritative scope data."
//           />

//           <GovernanceCard
//             title="Audit"
//             description="Sensitive role and authorization changes must be traceable through audit records."
//           />

//         </div>

//       </div>

//       {/* PERMISSIONS MODAL */}

//       {selectedRoleData && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//           <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">

//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

//               <div>

//                 <div className="flex items-center gap-3">

//                   <span
//                     className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(
//                       selectedRoleData.id
//                     )}`}
//                   >
//                     {selectedRoleData.id}
//                   </span>

//                   <h2 className="text-lg font-bold text-slate-900">
//                     {selectedRoleData.name}
//                   </h2>

//                 </div>

//                 <p className="mt-2 text-xs text-slate-500">
//                   {selectedRoleData.description}
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() => setSelectedRole(null)}
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100"
//               >
//                 ×
//               </button>

//             </div>

//             {/* MODAL CONTENT */}

//             <div className="max-h-[70vh] overflow-y-auto p-5">

//               <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">

//                 <InfoCard
//                   label="Scope"
//                   value={getScopeLabel(
//                     selectedRoleData.scope
//                   )}
//                 />

//                 <InfoCard
//                   label="Assigned Users"
//                   value={formatNumber(
//                     selectedRoleData.users
//                   )}
//                 />

//                 <InfoCard
//                   label="Permissions"
//                   value={String(
//                     selectedRoleData.permissions
//                   )}
//                 />

//                 <InfoCard
//                   label="Status"
//                   value={selectedRoleData.status}
//                 />

//               </div>

//               <div className="overflow-x-auto rounded-xl border border-slate-200">

//                 <table className="w-full min-w-[800px] text-left">

//                   <thead className="bg-slate-50">

//                     <tr>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Module
//                       </th>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         View
//                       </th>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Create
//                       </th>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Update
//                       </th>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Approve
//                       </th>

//                       <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
//                         Delete
//                       </th>

//                     </tr>

//                   </thead>

//                   <tbody className="divide-y divide-slate-100">

//                     {PERMISSIONS[
//                       selectedRoleData.id
//                     ].map((permission) => (
//                       <tr key={permission.module}>

//                         <td className="px-4 py-3">

//                           <span className="text-sm font-semibold text-slate-800">
//                             {permission.module}
//                           </span>

//                         </td>

//                         <PermissionCell
//                           value={permission.view}
//                         />

//                         <PermissionCell
//                           value={permission.create}
//                         />

//                         <PermissionCell
//                           value={permission.update}
//                         />

//                         <PermissionCell
//                           value={permission.approve}
//                         />

//                         <PermissionCell
//                           value={permission.delete}
//                         />

//                       </tr>
//                     ))}

//                   </tbody>

//                 </table>

//               </div>

//               <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">

//                 <p className="text-xs font-bold text-yellow-800">
//                   Important
//                 </p>

//                 <p className="mt-1 text-xs leading-5 text-yellow-700">
//                   The permission matrix displayed here is an
//                   administrative audit representation. It must
//                   not be used as the client-side security
//                   boundary. Actual authorization must be
//                   enforced by trusted backend services and
//                   Firestore security rules.
//                 </p>

//               </div>

//             </div>

//             {/* MODAL FOOTER */}

//             <div className="flex justify-end border-t border-slate-200 px-5 py-4">

//               <button
//                 type="button"
//                 onClick={() => setSelectedRole(null)}
//                 className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>
//       )}

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

//       <p className="text-[11px] font-medium text-slate-500">
//         {title}
//       </p>

//       <p className="mt-2 text-lg font-bold text-slate-900">
//         {formatNumber(value)}
//       </p>

//     </div>
//   );
// }

// function HierarchyBox({
//   title,
//   description,
//   color,
// }: {
//   title: string;
//   description: string;
//   color: "purple" | "blue" | "cyan" | "orange";
// }) {
//   const classes = {
//     purple:
//       "border-purple-200 bg-purple-50 text-purple-800",
//     blue:
//       "border-blue-200 bg-blue-50 text-blue-800",
//     cyan:
//       "border-cyan-200 bg-cyan-50 text-cyan-800",
//     orange:
//       "border-orange-200 bg-orange-50 text-orange-800",
//   };

//   return (
//     <div
//       className={`flex-1 rounded-xl border p-4 ${classes[color]}`}
//     >

//       <p className="text-xs font-bold">
//         {title}
//       </p>

//       <p className="mt-1 text-[11px] opacity-70">
//         {description}
//       </p>

//     </div>
//   );
// }

// function Arrow() {
//   return (
//     <div className="hidden text-lg font-bold text-slate-300 md:block">
//       →
//     </div>
//   );
// }

// function SmallRoleBox({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

//       <p className="text-xs font-bold text-slate-700">
//         {title}
//       </p>

//       <p className="mt-1 text-[11px] leading-5 text-slate-500">
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

// function InfoCard({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-xl bg-slate-50 p-4">

//       <p className="text-[10px] font-medium text-slate-400">
//         {label}
//       </p>

//       <p className="mt-1 text-sm font-bold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function PermissionCell({
//   value,
// }: {
//   value: PermissionLevel;
// }) {
//   return (
//     <td className="px-4 py-3">

//       <span
//         className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getPermissionClasses(
//           value
//         )}`}
//       >
//         {value}
//       </span>

//     </td>
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
//     <div className="rounded-xl border border-purple-200 bg-white p-4">

//       <p className="text-xs font-bold text-purple-800">
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
//         🔐
//       </div>

//       <p className="mt-3 text-sm font-bold text-slate-800">
//         No roles found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing the search or filter values.
//       </p>

//     </div>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import {
  useRbacRoles,
  type RoleId,
  type RoleStatus,
  type ScopeType,
} from "@/hooks/useRbacRoles";

type PermissionLevel = "FULL" | "MANAGE" | "VIEW" | "LIMITED" | "NONE";

type Permission = {
  module: string;
  view: PermissionLevel;
  create: PermissionLevel;
  update: PermissionLevel;
  approve: PermissionLevel;
  delete: PermissionLevel;
};

/** Static policy matrix (audit representation only — not the security boundary). */
const PERMISSIONS: Record<RoleId, Permission[]> = {
  SUPER_ADMIN: [
    { module: "Dashboard", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "FULL" },
    { module: "Entity Management", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "FULL" },
    { module: "Hierarchy", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "FULL" },
    { module: "Commission Engine", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "FULL" },
    { module: "Financial Audit", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "FULL", delete: "LIMITED" },
    { module: "Overrides", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "LIMITED" },
    { module: "System Audit", view: "FULL", create: "FULL", update: "FULL", approve: "FULL", delete: "LIMITED" },
  ],
  STATE_ADMIN: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "MANAGE", approve: "MANAGE", delete: "NONE" },
    { module: "Entity Management", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "MANAGE", delete: "NONE" },
    { module: "Hierarchy", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "MANAGE", delete: "NONE" },
    { module: "Commission Engine", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "MANAGE", delete: "NONE" },
    { module: "Financial Audit", view: "FULL", create: "VIEW", update: "LIMITED", approve: "LIMITED", delete: "NONE" },
    { module: "Overrides", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "MANAGE", delete: "NONE" },
    { module: "System Audit", view: "FULL", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
  ],
  DISTRICT_ADMIN: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "MANAGE", approve: "LIMITED", delete: "NONE" },
    { module: "Entity Management", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "LIMITED", delete: "NONE" },
    { module: "Hierarchy", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "LIMITED", delete: "NONE" },
    { module: "Commission Engine", view: "FULL", create: "LIMITED", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Financial Audit", view: "VIEW", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Overrides", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "LIMITED", delete: "NONE" },
    { module: "System Audit", view: "VIEW", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
  ],
  TECHNICAL_ADMIN: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "Entity Management", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "Hierarchy", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "Commission Engine", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "Financial Audit", view: "FULL", create: "VIEW", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Overrides", view: "FULL", create: "LIMITED", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "System Audit", view: "FULL", create: "MANAGE", update: "MANAGE", approve: "NONE", delete: "NONE" },
  ],
  VENDOR_OWNER: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Entity Management", view: "LIMITED", create: "MANAGE", update: "MANAGE", approve: "NONE", delete: "NONE" },
    { module: "Hierarchy", view: "LIMITED", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Commission Engine", view: "VIEW", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Financial Audit", view: "LIMITED", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Overrides", view: "VIEW", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "System Audit", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
  ],
  CAPTAIN: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Entity Management", view: "LIMITED", create: "NONE", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Hierarchy", view: "LIMITED", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Commission Engine", view: "VIEW", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Financial Audit", view: "LIMITED", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Overrides", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "System Audit", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
  ],
  CUSTOMER: [
    { module: "Dashboard", view: "FULL", create: "NONE", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Entity Management", view: "LIMITED", create: "NONE", update: "LIMITED", approve: "NONE", delete: "NONE" },
    { module: "Hierarchy", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Commission Engine", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Financial Audit", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "Overrides", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
    { module: "System Audit", view: "NONE", create: "NONE", update: "NONE", approve: "NONE", delete: "NONE" },
  ],
};

function getRoleClasses(role: RoleId) {
  switch (role) {
    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-700";
    case "STATE_ADMIN":
      return "bg-blue-100 text-blue-700";
    case "DISTRICT_ADMIN":
      return "bg-cyan-100 text-cyan-700";
    case "TECHNICAL_ADMIN":
      return "bg-slate-200 text-slate-700";
    case "VENDOR_OWNER":
      return "bg-orange-100 text-orange-700";
    case "CAPTAIN":
      return "bg-green-100 text-green-700";
    case "CUSTOMER":
      return "bg-pink-100 text-pink-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPermissionClasses(permission: PermissionLevel) {
  switch (permission) {
    case "FULL":
      return "bg-green-100 text-green-700";
    case "MANAGE":
      return "bg-blue-100 text-blue-700";
    case "VIEW":
      return "bg-slate-100 text-slate-700";
    case "LIMITED":
      return "bg-yellow-100 text-yellow-700";
    case "NONE":
      return "bg-red-50 text-red-500";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getScopeLabel(scope: ScopeType) {
  switch (scope) {
    case "GLOBAL":
      return "Global";
    case "STATE":
      return "State";
    case "DISTRICT":
      return "District";
    case "PINCODE":
      return "Pincode";
    case "VENDOR":
      return "Vendor";
    case "CAPTAIN":
      return "Captain";
    case "CUSTOMER":
      return "Customer";
    default:
      return scope;
  }
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export default function RBACRolesPage() {
  const { roles, summary, loading, error, refresh } = useRbacRoles();

  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | RoleId>("ALL");
  const [scopeFilter, setScopeFilter] = useState<"ALL" | ScopeType>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | RoleStatus>("ALL");

  const filteredRoles = useMemo(() => {
    const value = search.trim().toLowerCase();
    return roles.filter((role) => {
      const matchesSearch =
        value.length === 0 ||
        role.id.toLowerCase().includes(value) ||
        role.name.toLowerCase().includes(value) ||
        role.description.toLowerCase().includes(value);
      const matchesRole = roleFilter === "ALL" || role.id === roleFilter;
      const matchesScope = scopeFilter === "ALL" || role.scope === scopeFilter;
      const matchesStatus =
        statusFilter === "ALL" || role.status === statusFilter;
      return matchesSearch && matchesRole && matchesScope && matchesStatus;
    });
  }, [roles, search, roleFilter, scopeFilter, statusFilter]);

  const selectedRoleData = selectedRole
    ? roles.find((role) => role.id === selectedRole) ?? null
    : null;

  function clearFilters() {
    setSearch("");
    setRoleFilter("ALL");
    setScopeFilter("ALL");
    setStatusFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
              🔐
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">RBAC Roles</h1>
              <p className="mt-1 text-sm text-slate-500">
                Role definitions are platform policy. Assigned user counts are
                live from Firestore (<code className="text-[10px]">users</code>
                , <code className="text-[10px]">vendors</code>,{" "}
                <code className="text-[10px]">captains</code>).
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
              {loading ? "Refreshing…" : "Refresh counts"}
            </button>
            <div className="rounded-xl border border-purple-200 bg-purple-50 px-4 py-3">
              <p className="text-xs font-bold text-purple-800">System Audit</p>
              <p className="mt-1 text-xs text-purple-700">
                Role access is governed by backend authorization.
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

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <SummaryCard title="Total Roles" value={summary.totalRoles} />
        <SummaryCard title="Active Roles" value={summary.activeRoles} />
        <SummaryCard title="Restricted" value={summary.restrictedRoles} />
        <SummaryCard title="Admin Roles" value={summary.adminRoles} />
        <SummaryCard title="Assigned Users" value={summary.totalUsers} />
        <SummaryCard title="Permissions" value={summary.totalPermissions} />
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-slate-900">JUERP Role Hierarchy</h2>
          <p className="mt-1 text-sm text-slate-500">
            Administrative roles follow the governed authority model.
          </p>
        </div>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <HierarchyBox title="SUPER_ADMIN" description="Platform-wide authority" color="purple" />
          <Arrow />
          <HierarchyBox title="STATE_ADMIN" description="State scope" color="blue" />
          <Arrow />
          <HierarchyBox title="DISTRICT_ADMIN" description="District scope" color="cyan" />
          <Arrow />
          <HierarchyBox title="PINCODE SCOPE" description="Operational boundary" color="orange" />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          <SmallRoleBox title="TECHNICAL_ADMIN" description="Separate privileged technical role." />
          <SmallRoleBox title="VENDOR_OWNER" description="Vendor-scoped operational access." />
          <SmallRoleBox title="CAPTAIN / CUSTOMER" description="Role-specific client access." />
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search role or description..."
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as "ALL" | RoleId)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Roles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Scope
            </label>
            <select
              value={scopeFilter}
              onChange={(e) =>
                setScopeFilter(e.target.value as "ALL" | ScopeType)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Scopes</option>
              <option value="GLOBAL">Global</option>
              <option value="STATE">State</option>
              <option value="DISTRICT">District</option>
              <option value="VENDOR">Vendor</option>
              <option value="CAPTAIN">Captain</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | RoleStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="RESTRICTED">Restricted</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-700">{filteredRoles.length}</span>{" "}
            of <span className="font-bold text-slate-700">{roles.length}</span>{" "}
            roles
            {loading ? " · Loading counts…" : ""}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Role Registry</h2>
          <p className="mt-1 text-xs text-slate-500">
            User counts are aggregated live from Firestore.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Role</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Scope</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Users</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Permissions</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Counts as of</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${getRoleClasses(role.id)}`}
                      >
                        {role.id.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{role.name}</p>
                        <p className="mt-1 max-w-xs text-xs text-slate-400">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {getScopeLabel(role.scope)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-slate-800">
                      {formatNumber(role.users)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-bold text-slate-800">
                      {role.permissions}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        role.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {role.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs text-slate-500">{role.lastUpdated}</span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      View Permissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredRoles.length === 0 && <EmptyState />}
      </div>

      <div className="space-y-4 md:hidden">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Role Registry</h2>
          <p className="mt-1 text-xs text-slate-500">
            Live assigned-user counts from Firestore.
          </p>
        </div>
        {filteredRoles.map((role) => (
          <div key={role.id} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${getRoleClasses(role.id)}`}
                >
                  {role.id.substring(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{role.name}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{role.id}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  role.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {role.status}
              </span>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">{role.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <MobileInfo label="Scope" value={getScopeLabel(role.scope)} />
              <MobileInfo label="Users" value={formatNumber(role.users)} />
              <MobileInfo label="Permissions" value={String(role.permissions)} />
              <MobileInfo label="Counts as of" value={role.lastUpdated} />
            </div>
            <button
              type="button"
              onClick={() => setSelectedRole(role.id)}
              className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-xs font-semibold text-slate-700"
            >
              View Permissions
            </button>
          </div>
        ))}
        {filteredRoles.length === 0 && (
          <div className="rounded-2xl bg-white">
            <EmptyState />
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-purple-200 bg-purple-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            🔐
          </div>
          <div>
            <h2 className="text-sm font-bold text-purple-900">RBAC Governance</h2>
            <p className="mt-2 text-xs leading-6 text-purple-800">
              Role definitions and the permission matrix are platform policy for
              audit display only. Assigned user counts are live. The browser is
              not the security boundary — enforcement stays on backend claims,
              authorization services, and Firestore security rules.
            </p>
          </div>
        </div>
      </div>

      {selectedRoleData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(selectedRoleData.id)}`}
                  >
                    {selectedRoleData.id}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {selectedRoleData.name}
                  </h2>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  {selectedRoleData.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-lg text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>
            <div className="max-h-[70vh] overflow-y-auto p-5">
              <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <InfoCard label="Scope" value={getScopeLabel(selectedRoleData.scope)} />
                <InfoCard
                  label="Assigned Users"
                  value={formatNumber(selectedRoleData.users)}
                />
                <InfoCard
                  label="Permissions"
                  value={String(selectedRoleData.permissions)}
                />
                <InfoCard label="Status" value={selectedRoleData.status} />
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Module</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">View</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Create</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Update</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Approve</th>
                      <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PERMISSIONS[selectedRoleData.id].map((permission) => (
                      <tr key={permission.module}>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-slate-800">
                            {permission.module}
                          </span>
                        </td>
                        <PermissionCell value={permission.view} />
                        <PermissionCell value={permission.create} />
                        <PermissionCell value={permission.update} />
                        <PermissionCell value={permission.approve} />
                        <PermissionCell value={permission.delete} />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-5 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                <p className="text-xs font-bold text-yellow-800">Important</p>
                <p className="mt-1 text-xs leading-5 text-yellow-700">
                  This permission matrix is an administrative audit
                  representation. It must not be used as the client-side
                  security boundary.
                </p>
              </div>
            </div>
            <div className="flex justify-end border-t border-slate-200 px-5 py-4">
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-bold text-slate-900">{formatNumber(value)}</p>
    </div>
  );
}

function HierarchyBox({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: "purple" | "blue" | "cyan" | "orange";
}) {
  const classes = {
    purple: "border-purple-200 bg-purple-50 text-purple-800",
    blue: "border-blue-200 bg-blue-50 text-blue-800",
    cyan: "border-cyan-200 bg-cyan-50 text-cyan-800",
    orange: "border-orange-200 bg-orange-50 text-orange-800",
  };
  return (
    <div className={`flex-1 rounded-xl border p-4 ${classes[color]}`}>
      <p className="text-xs font-bold">{title}</p>
      <p className="mt-1 text-[11px] opacity-70">{description}</p>
    </div>
  );
}

function Arrow() {
  return (
    <div className="hidden text-lg font-bold text-slate-300 md:block">→</div>
  );
}

function SmallRoleBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-700">{title}</p>
      <p className="mt-1 text-[11px] leading-5 text-slate-500">{description}</p>
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

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-[10px] font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}

function PermissionCell({ value }: { value: PermissionLevel }) {
  return (
    <td className="px-4 py-3">
      <span
        className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${getPermissionClasses(value)}`}
      >
        {value}
      </span>
    </td>
  );
}

function EmptyState() {
  return (
    <div className="px-5 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
        🔐
      </div>
      <p className="mt-3 text-sm font-bold text-slate-800">No roles found</p>
      <p className="mt-1 text-xs text-slate-500">
        Try changing the search or filter values.
      </p>
    </div>
  );
}