// "use client";

// import { FormEvent, useMemo, useState } from "react";
// import Link from "next/link";
// // import useAuthScope from "@/hooks/useAuth";
// import useAuthScope from "@/hooks/useAuthScope";
// import {
//   useAdminUsers,
//   type AdminRole,
//   type AdminStatus,
//   type AdminUser,
//   type CreateAdminInput,
// } from "@/hooks/useAdminUsers";

// const ROLE_OPTIONS: { value: AdminRole; label: string }[] = [
//   { value: "SUPER_ADMIN", label: "Super Admin" },
//   { value: "STATE_ADMIN", label: "State Admin" },
//   { value: "DISTRICT_ADMIN", label: "District Admin" },
//   { value: "TECHNICAL_ADMIN", label: "Technical Admin" },
// ];

// function formatRole(role: AdminRole) {
//   return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;
// }

// function getRoleClasses(role: AdminRole) {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "bg-purple-100 text-purple-700";
//     case "STATE_ADMIN":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_ADMIN":
//       return "bg-cyan-100 text-cyan-700";
//     case "TECHNICAL_ADMIN":
//       return "bg-slate-200 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getStatusClasses(status: AdminStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";
//     case "SUSPENDED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function AdminUsersPage() {
//   const auth = useAuthScope();
//   const {
//     admins,
//     states,
//     districts,
//     summary,
//     loading,
//     saving,
//     error,
//     refresh,
//     createAdmin,
//     updateAdminStatus,
//     isDemoMode,
//   } = useAdminUsers();

//   const canCreate = auth.role === "SUPER_ADMIN";

//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState<"ALL" | AdminRole>("ALL");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | AdminStatus>("ALL");
//   const [showCreate, setShowCreate] = useState(false);
//   const [selected, setSelected] = useState<AdminUser | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [role, setRole] = useState<AdminRole>("STATE_ADMIN");
//   const [stateId, setStateId] = useState("");
//   const [districtId, setDistrictId] = useState("");

//   const filteredDistricts = useMemo(
//     () =>
//       stateId
//         ? districts.filter((d) => d.stateId === stateId)
//         : districts,
//     [districts, stateId]
//   );

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return admins.filter((a) => {
//       const matchSearch =
//         !q ||
//         a.name.toLowerCase().includes(q) ||
//         a.email.toLowerCase().includes(q) ||
//         a.id.toLowerCase().includes(q) ||
//         a.phone.includes(q);
//       const matchRole = roleFilter === "ALL" || a.role === roleFilter;
//       const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
//       return matchSearch && matchRole && matchStatus;
//     });
//   }, [admins, search, roleFilter, statusFilter]);

//   function resetForm() {
//     setName("");
//     setEmail("");
//     setPhone("");
//     setRole("STATE_ADMIN");
//     setStateId("");
//     setDistrictId("");
//     setFormError(null);
//   }

//   async function handleCreate(e: FormEvent) {
//     e.preventDefault();
//     setFormError(null);

//     if (!canCreate) {
//       setFormError("Only Super Admin can create admin users.");
//       return;
//     }

//     const state = states.find((s) => s.id === stateId);
//     const district = districts.find((d) => d.id === districtId);

//     const payload: CreateAdminInput = {
//       name,
//       email,
//       phone,
//       role,
//       stateId: role === "STATE_ADMIN" || role === "DISTRICT_ADMIN" ? stateId : "",
//       stateName: state?.name || "",
//       districtId: role === "DISTRICT_ADMIN" ? districtId : "",
//       districtName: district?.name || "",
//     };

//     try {
//       const id = await createAdmin(payload);
//       setSuccessMessage(`Admin created: ${id}`);
//       setShowCreate(false);
//       resetForm();
//       window.setTimeout(() => setSuccessMessage(null), 4000);
//     } catch (err) {
//       setFormError(
//         err instanceof Error ? err.message : "Failed to create admin."
//       );
//     }
//   }

//   async function handleStatus(admin: AdminUser, status: AdminStatus) {
//     if (!canCreate) return;
//     try {
//       await updateAdminStatus(admin.id, status);
//       setSuccessMessage(`${admin.name} → ${status}`);
//       setSelected(null);
//       window.setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       setFormError(
//         err instanceof Error ? err.message : "Failed to update status."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
//               👤
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
//               <p className="mt-1 text-sm text-slate-500">
//                 Create and manage Super, State, District and Technical admins.
//               </p>
//             </div>
//           </div>
//           <div className="flex flex-wrap items-center gap-3">
//             <button
//               type="button"
//               onClick={() => void refresh()}
//               disabled={loading}
//               className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//             >
//               {loading ? "Refreshing…" : "Refresh"}
//             </button>
//             {canCreate && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   resetForm();
//                   setShowCreate(true);
//                 }}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 + Create Admin
//               </button>
//             )}
//             <Link
//               href="/system-audit/rbac-roles"
//               className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-800 hover:bg-purple-100"
//             >
//               RBAC Roles
//             </Link>
//           </div>
//         </div>
//       </div>

//       {successMessage && (
//         <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
//           {successMessage}
//         </div>
//       )}
//       {error && (
//         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}
//       {isDemoMode && (
//         <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           Demo mode: admin creates are disabled. Set{" "}
//           <code className="text-xs">NEXT_PUBLIC_DEMO_MODE</code> off to write to
//           Firestore.
//         </div>
//       )}
//       {!canCreate && auth.role && (
//         <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
//           Signed in as {auth.role}. Only Super Admin can create or change admin
//           users.
//         </div>
//       )}

//       <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
//         <SummaryCard title="Total Admins" value={summary.total} />
//         <SummaryCard title="Active" value={summary.active} />
//         <SummaryCard title="Super" value={summary.superAdmins} />
//         <SummaryCard title="State" value={summary.stateAdmins} />
//         <SummaryCard title="District" value={summary.districtAdmins} />
//         <SummaryCard title="Technical" value={summary.technicalAdmins} />
//       </div>

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
//           <div className="md:col-span-2">
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Search
//             </label>
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Name, email, phone…"
//               className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//             />
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Role
//             </label>
//             <select
//               value={roleFilter}
//               onChange={(e) =>
//                 setRoleFilter(e.target.value as "ALL" | AdminRole)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All roles</option>
//               {ROLE_OPTIONS.map((r) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
//               Status
//             </label>
//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value as "ALL" | AdminStatus)
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//             >
//               <option value="ALL">All statuses</option>
//               <option value="ACTIVE">Active</option>
//               <option value="INACTIVE">Inactive</option>
//               <option value="SUSPENDED">Suspended</option>
//             </select>
//           </div>
//         </div>
//         <p className="mt-3 text-xs text-slate-400">
//           Showing{" "}
//           <span className="font-bold text-slate-700">{filtered.length}</span> of{" "}
//           <span className="font-bold text-slate-700">{admins.length}</span>{" "}
//           admins
//           {loading ? " · Loading…" : ""}
//         </p>
//       </div>

//       <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
//         <div className="border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">Admin registry</h2>
//           <p className="mt-1 text-xs text-slate-500">
//             Loaded from Firestore <code className="text-[10px]">users</code>{" "}
//             where role is an admin role.
//           </p>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Admin
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Role
//                 </th>
//                 <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
//                   Scope
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
//               {filtered.map((admin) => (
//                 <tr key={admin.id} className="hover:bg-slate-50">
//                   <td className="px-5 py-4">
//                     <p className="text-sm font-bold text-slate-900">
//                       {admin.name}
//                     </p>
//                     <p className="mt-0.5 text-xs text-slate-500">
//                       {admin.email}
//                     </p>
//                     {admin.phone && (
//                       <p className="text-[11px] text-slate-400">{admin.phone}</p>
//                     )}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(admin.role)}`}
//                     >
//                       {formatRole(admin.role)}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-xs text-slate-600">
//                     {admin.role === "SUPER_ADMIN" ||
//                     admin.role === "TECHNICAL_ADMIN"
//                       ? "Global"
//                       : admin.role === "STATE_ADMIN"
//                         ? admin.stateName || admin.stateId || "—"
//                         : [admin.districtName || admin.districtId, admin.stateName]
//                             .filter(Boolean)
//                             .join(" · ") || "—"}
//                   </td>
//                   <td className="px-5 py-4">
//                     <span
//                       className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(admin.status)}`}
//                     >
//                       {admin.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 text-xs text-slate-500">
//                     {admin.updatedAt}
//                   </td>
//                   <td className="px-5 py-4">
//                     <button
//                       type="button"
//                       onClick={() => setSelected(admin)}
//                       className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                     >
//                       Manage
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {!loading && filtered.length === 0 && (
//           <div className="px-5 py-14 text-center text-sm text-slate-500">
//             No admin users found. Create one or check role fields on{" "}
//             <code className="text-xs">users</code> documents.
//           </div>
//         )}
//       </div>

//       <div className="mt-4 space-y-3 md:hidden">
//         {filtered.map((admin) => (
//           <div key={admin.id} className="rounded-2xl bg-white p-4 shadow-sm">
//             <div className="flex items-start justify-between gap-2">
//               <div>
//                 <p className="text-sm font-bold text-slate-900">{admin.name}</p>
//                 <p className="text-xs text-slate-500">{admin.email}</p>
//               </div>
//               <span
//                 className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${getRoleClasses(admin.role)}`}
//               >
//                 {formatRole(admin.role)}
//               </span>
//             </div>
//             <button
//               type="button"
//               onClick={() => setSelected(admin)}
//               className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700"
//             >
//               Manage
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
//         <p className="text-sm font-bold text-amber-900">Production note</p>
//         <p className="mt-2 text-xs leading-5 text-amber-800">
//           This UI writes the Firestore <code>users</code> profile (role + scope).
//           Login still requires a Firebase Auth account and custom claims (
//           <code>role</code>, <code>stateId</code>, <code>districtId</code>). For
//           production, pair this with a Cloud Function that creates Auth + sets
//           claims after Super Admin approval.
//         </p>
//       </div>

//       {/* CREATE MODAL */}
//       {showCreate && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//               <h2 className="text-lg font-bold text-slate-900">Create Admin</h2>
//               <button
//                 type="button"
//                 onClick={() => setShowCreate(false)}
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleCreate} className="space-y-4 p-5">
//               {formError && (
//                 <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
//                   {formError}
//                 </div>
//               )}
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Full name *
//                 </label>
//                 <input
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Email *
//                 </label>
//                 <input
//                   required
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Phone
//                 </label>
//                 <input
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Role *
//                 </label>
//                 <select
//                   value={role}
//                   onChange={(e) => {
//                     setRole(e.target.value as AdminRole);
//                     setDistrictId("");
//                   }}
//                   className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 >
//                   {ROLE_OPTIONS.map((r) => (
//                     <option key={r.value} value={r.value}>
//                       {r.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {(role === "STATE_ADMIN" || role === "DISTRICT_ADMIN") && (
//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-slate-500">
//                     State *
//                   </label>
//                   <select
//                     required
//                     value={stateId}
//                     onChange={(e) => {
//                       setStateId(e.target.value);
//                       setDistrictId("");
//                     }}
//                     className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                   >
//                     <option value="">Select state</option>
//                     {states.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {role === "DISTRICT_ADMIN" && (
//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-slate-500">
//                     District *
//                   </label>
//                   <select
//                     required
//                     value={districtId}
//                     onChange={(e) => setDistrictId(e.target.value)}
//                     className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                   >
//                     <option value="">Select district</option>
//                     {filteredDistricts.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreate(false)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
//                 >
//                   {saving ? "Saving…" : "Create Admin"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* MANAGE MODAL */}
//       {selected && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h2 className="text-lg font-bold text-slate-900">
//                   {selected.name}
//                 </h2>
//                 <p className="text-xs text-slate-500">{selected.email}</p>
//               </div>
//               <button
//                 type="button"
//                 onClick={() => setSelected(null)}
//                 className="text-slate-400 hover:text-slate-700"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="mt-4 space-y-2 text-sm">
//               <p>
//                 <span className="text-slate-500">Role:</span>{" "}
//                 <span
//                   className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getRoleClasses(selected.role)}`}
//                 >
//                   {formatRole(selected.role)}
//                 </span>
//               </p>
//               <p>
//                 <span className="text-slate-500">Status:</span>{" "}
//                 {selected.status}
//               </p>
//               <p className="text-xs text-slate-400">ID: {selected.id}</p>
//             </div>
//             {canCreate && (
//               <div className="mt-5 flex flex-wrap gap-2">
//                 <button
//                   type="button"
//                   disabled={saving || selected.status === "ACTIVE"}
//                   onClick={() => void handleStatus(selected, "ACTIVE")}
//                   className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
//                 >
//                   Activate
//                 </button>
//                 <button
//                   type="button"
//                   disabled={saving || selected.status === "INACTIVE"}
//                   onClick={() => void handleStatus(selected, "INACTIVE")}
//                   className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50"
//                 >
//                   Deactivate
//                 </button>
//                 <button
//                   type="button"
//                   disabled={saving || selected.status === "SUSPENDED"}
//                   onClick={() => void handleStatus(selected, "SUSPENDED")}
//                   className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
//                 >
//                   Suspend
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function SummaryCard({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">
//       <p className="text-[11px] font-medium text-slate-500">{title}</p>
//       <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }

// "use client";

// import { FormEvent, useMemo, useState } from "react";
// import Link from "next/link";
// import useAuthScope from "@/hooks/useAuthScope";
// import {
//   useAdminUsers,
//   type AdminRole,
//   type AdminStatus,
//   type AdminUser,
//   type CreateAdminInput,
// } from "@/hooks/useAdminUsers";

// const ROLE_OPTIONS: { value: AdminRole; label: string }[] = [
//   { value: "SUPER_ADMIN", label: "Super Admin" },
//   { value: "STATE_ADMIN", label: "State Admin" },
//   { value: "DISTRICT_ADMIN", label: "District Admin" },
//   { value: "TECHNICAL_ADMIN", label: "Technical Admin" },
// ];

// function formatRole(role: AdminRole) {
//   return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;
// }

// function getRoleClasses(role: AdminRole) {
//   switch (role) {
//     case "SUPER_ADMIN":
//       return "bg-purple-100 text-purple-700";
//     case "STATE_ADMIN":
//       return "bg-blue-100 text-blue-700";
//     case "DISTRICT_ADMIN":
//       return "bg-cyan-100 text-cyan-700";
//     case "TECHNICAL_ADMIN":
//       return "bg-slate-200 text-slate-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getStatusClasses(status: AdminStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";
//     case "INACTIVE":
//       return "bg-slate-100 text-slate-600";
//     case "SUSPENDED":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// export default function AdminUsersPage() {
//   const auth = useAuthScope();
//   const {
//     admins,
//     states,
//     districts,
//     summary,
//     loading,
//     saving,
//     error,
//     refresh,
//     createAdmin,
//     updateAdminStatus,
//     isDemoMode,
//   } = useAdminUsers();

//   const canCreate = auth.role === "SUPER_ADMIN";

//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState<"ALL" | AdminRole>("ALL");
//   const [statusFilter, setStatusFilter] = useState<"ALL" | AdminStatus>("ALL");
//   const [showCreate, setShowCreate] = useState(false);
//   const [selected, setSelected] = useState<AdminUser | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState<AdminRole>("STATE_ADMIN");
//   const [stateId, setStateId] = useState("");
//   const [districtId, setDistrictId] = useState("");

//   const filteredDistricts = useMemo(
//     () => (stateId ? districts.filter((d) => d.stateId === stateId) : districts),
//     [districts, stateId]
//   );

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return admins.filter((a) => {
//       const matchSearch =
//         !q ||
//         a.name.toLowerCase().includes(q) ||
//         a.email.toLowerCase().includes(q) ||
//         a.id.toLowerCase().includes(q) ||
//         a.phone.includes(q);
//       const matchRole = roleFilter === "ALL" || a.role === roleFilter;
//       const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
//       return matchSearch && matchRole && matchStatus;
//     });
//   }, [admins, search, roleFilter, statusFilter]);

//   function resetForm() {
//     setName("");
//     setEmail("");
//     setPhone("");
//     setPassword("");
//     setConfirmPassword("");
//     setShowPassword(false);
//     setRole("STATE_ADMIN");
//     setStateId("");
//     setDistrictId("");
//     setFormError(null);
//   }

//   async function handleCreate(e: FormEvent) {
//     e.preventDefault();
//     setFormError(null);

//     if (!canCreate) {
//       setFormError("Only Super Admin can create admin users.");
//       return;
//     }
//     if (password.length < 8) {
//       setFormError("Password must be at least 8 characters.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setFormError("Password and confirm password do not match.");
//       return;
//     }

//     const state = states.find((s) => s.id === stateId);
//     const district = districts.find((d) => d.id === districtId);

//     const payload: CreateAdminInput = {
//       name,
//       email,
//       password,
//       phone,
//       role,
//       stateId: role === "STATE_ADMIN" || role === "DISTRICT_ADMIN" ? stateId : "",
//       stateName: state?.name || "",
//       districtId: role === "DISTRICT_ADMIN" ? districtId : "",
//       districtName: district?.name || "",
//     };

//     try {
//       const id = await createAdmin(payload);
//       setSuccessMessage(`Admin created and can sign in: ${id}`);
//       setShowCreate(false);
//       resetForm();
//       window.setTimeout(() => setSuccessMessage(null), 4000);
//     } catch (err) {
//       setFormError(
//         err instanceof Error ? err.message : "Failed to create admin."
//       );
//     }
//   }

//   async function handleStatus(admin: AdminUser, status: AdminStatus) {
//     if (!canCreate) return;
//     try {
//       await updateAdminStatus(admin.id, status);
//       setSuccessMessage(`${admin.name} → ${status}`);
//       setSelected(null);
//       window.setTimeout(() => setSuccessMessage(null), 3000);
//     } catch (err) {
//       setFormError(
//         err instanceof Error ? err.message : "Failed to update status."
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       {/* ... keep header, filters, table, mobile cards EXACTLY as you had ... */}

//       <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
//         <p className="text-sm font-bold text-amber-900">Login-ready admins</p>
//         <p className="mt-2 text-xs leading-5 text-amber-800">
//           Create Admin now creates a Firebase Auth account, sets custom claims
//           (<code>role</code>, <code>stateId</code>, <code>districtId</code>), and
//           writes the Firestore <code>users</code> profile. The new admin can
//           sign in at Login with the email and password you set.
//         </p>
//       </div>

//       {showCreate && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//           <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
//             <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//               <h2 className="text-lg font-bold text-slate-900">Create Admin</h2>
//               <button
//                 type="button"
//                 onClick={() => setShowCreate(false)}
//                 className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
//               >
//                 ×
//               </button>
//             </div>
//             <form onSubmit={handleCreate} className="space-y-4 p-5">
//               {formError && (
//                 <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
//                   {formError}
//                 </div>
//               )}

//               {/* name, email, phone — same as before */}

//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Full name *
//                 </label>
//                 <input
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Email (login) *
//                 </label>
//                 <input
//                   required
//                   type="email"
//                   autoComplete="off"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Password *
//                 </label>
//                 <div className="relative">
//                   <input
//                     required
//                     type={showPassword ? "text" : "password"}
//                     autoComplete="new-password"
//                     minLength={8}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Min. 8 characters"
//                     className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-16 text-sm outline-none focus:border-orange-500"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((p) => !p)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-600"
//                   >
//                     {showPassword ? "Hide" : "Show"}
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Confirm password *
//                 </label>
//                 <input
//                   required
//                   type={showPassword ? "text" : "password"}
//                   autoComplete="new-password"
//                   minLength={8}
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Phone
//                 </label>
//                 <input
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 />
//               </div>
//               <div>
//                 <label className="mb-1 block text-xs font-bold text-slate-500">
//                   Role *
//                 </label>
//                 <select
//                   value={role}
//                   onChange={(e) => {
//                     setRole(e.target.value as AdminRole);
//                     setDistrictId("");
//                   }}
//                   className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                 >
//                   {ROLE_OPTIONS.map((r) => (
//                     <option key={r.value} value={r.value}>
//                       {r.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               {(role === "STATE_ADMIN" || role === "DISTRICT_ADMIN") && (
//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-slate-500">
//                     State *
//                   </label>
//                   <select
//                     required
//                     value={stateId}
//                     onChange={(e) => {
//                       setStateId(e.target.value);
//                       setDistrictId("");
//                     }}
//                     className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                   >
//                     <option value="">Select state</option>
//                     {states.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {role === "DISTRICT_ADMIN" && (
//                 <div>
//                   <label className="mb-1 block text-xs font-bold text-slate-500">
//                     District *
//                   </label>
//                   <select
//                     required
//                     value={districtId}
//                     onChange={(e) => setDistrictId(e.target.value)}
//                     className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
//                   >
//                     <option value="">Select district</option>
//                     {filteredDistricts.map((d) => (
//                       <option key={d.id} value={d.id}>
//                         {d.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreate(false)}
//                   className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
//                 >
//                   {saving ? "Creating…" : "Create Admin"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* keep MANAGE MODAL as you had */}
//     </div>
//   );
// }

// function SummaryCard({ title, value }: { title: string; value: number }) {
//   return (
//     <div className="rounded-2xl bg-white p-4 shadow-sm">
//       <p className="text-[11px] font-medium text-slate-500">{title}</p>
//       <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
//     </div>
//   );
// }

"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import useAuthScope from "@/hooks/useAuthScope";
import {
  useAdminUsers,
  type AdminRole,
  type AdminStatus,
  type AdminUser,
  type CreateAdminInput,
} from "@/hooks/useAdminUsers";

const ROLE_OPTIONS: { value: AdminRole; label: string }[] = [
  { value: "SUPER_ADMIN", label: "Super Admin" },
  { value: "STATE_ADMIN", label: "State Admin" },
  { value: "DISTRICT_ADMIN", label: "District Admin" },
  { value: "TECHNICAL_ADMIN", label: "Technical Admin" },
];

function formatRole(role: AdminRole) {
  return ROLE_OPTIONS.find((r) => r.value === role)?.label ?? role;
}

function getRoleClasses(role: AdminRole) {
  switch (role) {
    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-700";
    case "STATE_ADMIN":
      return "bg-blue-100 text-blue-700";
    case "DISTRICT_ADMIN":
      return "bg-cyan-100 text-cyan-700";
    case "TECHNICAL_ADMIN":
      return "bg-slate-200 text-slate-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusClasses(status: AdminStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-slate-100 text-slate-600";
    case "SUSPENDED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function AdminUsersPage() {
  const auth = useAuthScope();
  const {
    admins,
    states,
    districts,
    summary,
    loading,
    saving,
    error,
    refresh,
    createAdmin,
    updateAdminStatus,
    isDemoMode,
  } = useAdminUsers();

  const canCreate = auth.role === "SUPER_ADMIN";

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"ALL" | AdminRole>("ALL");
  const [statusFilter, setStatusFilter] = useState<"ALL" | AdminStatus>("ALL");
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<AdminUser | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<AdminRole>("STATE_ADMIN");
  const [stateId, setStateId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const filteredDistricts = useMemo(
    () =>
      stateId ? districts.filter((d) => d.stateId === stateId) : districts,
    [districts, stateId]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return admins.filter((a) => {
      const matchSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.phone.includes(q);
      const matchRole = roleFilter === "ALL" || a.role === roleFilter;
      const matchStatus = statusFilter === "ALL" || a.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [admins, search, roleFilter, statusFilter]);

  function resetForm() {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setRole("STATE_ADMIN");
    setStateId("");
    setDistrictId("");
    setFormError(null);
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!canCreate) {
      setFormError("Only Super Admin can create admin users.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Password and confirm password do not match.");
      return;
    }

    const state = states.find((s) => s.id === stateId);
    const district = districts.find((d) => d.id === districtId);

    const payload: CreateAdminInput = {
      name,
      email,
      password,
      phone,
      role,
      stateId:
        role === "STATE_ADMIN" || role === "DISTRICT_ADMIN" ? stateId : "",
      stateName: state?.name || "",
      districtId: role === "DISTRICT_ADMIN" ? districtId : "",
      districtName: district?.name || "",
    };

    try {
      const id = await createAdmin(payload);
      setSuccessMessage(`Admin created and can sign in: ${id}`);
      setShowCreate(false);
      resetForm();
      window.setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to create admin."
      );
    }
  }

  async function handleStatus(admin: AdminUser, status: AdminStatus) {
    if (!canCreate) return;
    try {
      await updateAdminStatus(admin.id, status);
      setSuccessMessage(`${admin.name} → ${status}`);
      setSelected(null);
      window.setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Failed to update status."
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* HEADER */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl text-purple-600">
              👤
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Users</h1>
              <p className="mt-1 text-sm text-slate-500">
                Create and manage Super, State, District and Technical admins.
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
            {canCreate && (
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowCreate(true);
                }}
                className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
              >
                + Create Admin
              </button>
            )}
            <Link
              href="/system-audit/rbac-roles"
              className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-2.5 text-sm font-semibold text-purple-800 hover:bg-purple-100"
            >
              RBAC Roles
            </Link>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="mb-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}
      {formError && !showCreate && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}
      {isDemoMode && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Demo mode: admin creates are disabled. Set{" "}
          <code className="text-xs">NEXT_PUBLIC_DEMO_MODE</code> off to write.
        </div>
      )}
      {!canCreate && auth.role && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Signed in as {auth.role}. Only Super Admin can create or change admin
          users.
        </div>
      )}
      {auth.loading && (
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Checking your access role…
        </div>
      )}

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <SummaryCard title="Total Admins" value={summary.total} />
        <SummaryCard title="Active" value={summary.active} />
        <SummaryCard title="Super" value={summary.superAdmins} />
        <SummaryCard title="State" value={summary.stateAdmins} />
        <SummaryCard title="District" value={summary.districtAdmins} />
        <SummaryCard title="Technical" value={summary.technicalAdmins} />
      </div>

      {/* FILTERS */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, email, phone…"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value as "ALL" | AdminRole)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All roles</option>
              {ROLE_OPTIONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | AdminStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Showing{" "}
          <span className="font-bold text-slate-700">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-700">{admins.length}</span>{" "}
          admins
          {loading ? " · Loading…" : ""}
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-bold text-slate-900">Admin registry</h2>
          <p className="mt-1 text-xs text-slate-500">
            Loaded from Firestore <code className="text-[10px]">users</code>{" "}
            where role is an admin role.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Admin
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Role
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Scope
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Updated
                </th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((admin) => (
                <tr key={admin.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-bold text-slate-900">
                      {admin.name}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {admin.email}
                    </p>
                    {admin.phone ? (
                      <p className="text-[11px] text-slate-400">{admin.phone}</p>
                    ) : null}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(admin.role)}`}
                    >
                      {formatRole(admin.role)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-600">
                    {admin.role === "SUPER_ADMIN" ||
                    admin.role === "TECHNICAL_ADMIN"
                      ? "Global"
                      : admin.role === "STATE_ADMIN"
                        ? admin.stateName || admin.stateId || "—"
                        : [admin.districtName || admin.districtId, admin.stateName]
                            .filter(Boolean)
                            .join(" · ") || "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(admin.status)}`}
                    >
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-500">
                    {admin.updatedAt}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelected(admin)}
                      className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && filtered.length === 0 && (
          <div className="px-5 py-14 text-center text-sm text-slate-500">
            No admin users found in Firestore yet. Click{" "}
            <span className="font-semibold text-orange-600">+ Create Admin</span>{" "}
            to add one (Auth + claims + profile).
          </div>
        )}
      </div>

      {/* MOBILE CARDS */}
      <div className="mt-4 space-y-3 md:hidden">
        {filtered.map((admin) => (
          <div key={admin.id} className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-slate-900">{admin.name}</p>
                <p className="text-xs text-slate-500">{admin.email}</p>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${getRoleClasses(admin.role)}`}
              >
                {formatRole(admin.role)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSelected(admin)}
              className="mt-3 w-full rounded-lg border border-slate-300 py-2 text-xs font-semibold text-slate-700"
            >
              Manage
            </button>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-slate-500">
            No admin users found.
          </p>
        )}
      </div>

      {/* INFO */}
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <p className="text-sm font-bold text-amber-900">Login-ready admins</p>
        <p className="mt-2 text-xs leading-5 text-amber-800">
          Create Admin creates a Firebase Auth account, sets custom claims (
          <code>role</code>, <code>stateId</code>, <code>districtId</code>), and
          writes the Firestore <code>users</code> profile. New admins sign in at
          Login with the email and password you set.
        </p>
      </div>

      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <h2 className="text-lg font-bold text-slate-900">Create Admin</h2>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4 p-5">
              {formError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {formError}
                </div>
              )}
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Full name *
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Email (login) *
                </label>
                <input
                  required
                  type="email"
                  autoComplete="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Password *
                </label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 pr-16 text-sm outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-orange-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Confirm password *
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-slate-500">
                  Role *
                </label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value as AdminRole);
                    setDistrictId("");
                  }}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                >
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              {(role === "STATE_ADMIN" || role === "DISTRICT_ADMIN") && (
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500">
                    State *
                  </label>
                  <select
                    required
                    value={stateId}
                    onChange={(e) => {
                      setStateId(e.target.value);
                      setDistrictId("");
                    }}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                  >
                    <option value="">Select state</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {role === "DISTRICT_ADMIN" && (
                <div>
                  <label className="mb-1 block text-xs font-bold text-slate-500">
                    District *
                  </label>
                  <select
                    required
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
                  >
                    <option value="">Select district</option>
                    {filteredDistricts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreate(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
                >
                  {saving ? "Creating…" : "Create Admin"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selected.name}
                </h2>
                <p className="text-xs text-slate-500">{selected.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="text-slate-500">Role:</span>{" "}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${getRoleClasses(selected.role)}`}
                >
                  {formatRole(selected.role)}
                </span>
              </p>
              <p>
                <span className="text-slate-500">Status:</span>{" "}
                {selected.status}
              </p>
              <p className="text-xs text-slate-400">ID: {selected.id}</p>
            </div>
            {canCreate && (
              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={saving || selected.status === "ACTIVE"}
                  onClick={() => void handleStatus(selected, "ACTIVE")}
                  className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Activate
                </button>
                <button
                  type="button"
                  disabled={saving || selected.status === "INACTIVE"}
                  onClick={() => void handleStatus(selected, "INACTIVE")}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-50"
                >
                  Deactivate
                </button>
                <button
                  type="button"
                  disabled={saving || selected.status === "SUSPENDED"}
                  onClick={() => void handleStatus(selected, "SUSPENDED")}
                  className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                >
                  Suspend
                </button>
              </div>
            )}
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
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}