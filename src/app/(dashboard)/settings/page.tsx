// "use client";

// import { useState } from "react";

// type SettingStatus = "ENABLED" | "DISABLED";

// type SettingItem = {
//   id: string;
//   title: string;
//   description: string;
//   status: SettingStatus;
// };

// export default function SettingsPage() {
//   const [settings, setSettings] = useState<SettingItem[]>([
//     {
//       id: "notifications",
//       title: "Admin Notifications",
//       description:
//         "Receive important operational, governance and system notifications.",
//       status: "ENABLED",
//     },
//     {
//       id: "security-alerts",
//       title: "Security Alerts",
//       description:
//         "Receive alerts for important authentication and security events.",
//       status: "ENABLED",
//     },
//     {
//       id: "maintenance-mode",
//       title: "Maintenance Mode",
//       description:
//         "Temporarily restrict selected platform operations during maintenance.",
//       status: "DISABLED",
//     },
//     {
//       id: "audit-alerts",
//       title: "Audit Alerts",
//       description:
//         "Receive notifications when important audit or governance exceptions occur.",
//       status: "ENABLED",
//     },
//   ]);

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] =
//     useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const [name, setName] = useState("JUERP Administrator");
//   const [email, setEmail] = useState("admin@juone.in");

//   const [currentPassword, setCurrentPassword] =
//     useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   function toggleSetting(id: string) {
//     setSettings((currentSettings) =>
//       currentSettings.map((setting) =>
//         setting.id === id
//           ? {
//               ...setting,
//               status:
//                 setting.status === "ENABLED"
//                   ? "DISABLED"
//                   : "ENABLED",
//             }
//           : setting
//       )
//     );

//     showSuccessMessage();
//   }

//   function showSuccessMessage() {
//     setShowSuccess(true);

//     window.setTimeout(() => {
//       setShowSuccess(false);
//     }, 2500);
//   }

//   function saveProfile() {
//     setShowProfileModal(false);
//     showSuccessMessage();
//   }

//   function changePassword() {
//     if (
//       !currentPassword ||
//       !newPassword ||
//       !confirmPassword
//     ) {
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       return;
//     }

//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");

//     setShowPasswordModal(false);
//     showSuccessMessage();
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* SUCCESS MESSAGE */}

//       {showSuccess && (
//         <div className="fixed right-4 top-4 z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
//           Settings updated successfully.
//         </div>
//       )}

//       {/* HEADER */}

//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">

//         <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

//           <div className="flex items-center gap-4">

//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-600">
//               ⚙
//             </div>

//             <div>

//               <h1 className="text-2xl font-bold text-slate-900">
//                 Settings
//               </h1>

//               <p className="mt-1 text-sm text-slate-500">
//                 Manage JUERP administrator preferences,
//                 security and platform settings.
//               </p>

//             </div>

//           </div>

//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">

//             <p className="text-xs font-bold text-orange-800">
//               JUERP Administration
//             </p>

//             <p className="mt-1 text-xs text-orange-700">
//               Protected settings require authorized access.
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* ACCOUNT SECTION */}

//       <section className="mb-6">

//         <SectionHeader
//           title="Account"
//           description="Manage the administrator profile and authentication."
//         />

//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

//           {/* PROFILE */}

//           <div className="rounded-2xl bg-white p-5 shadow-sm">

//             <div className="flex items-start justify-between">

//               <div className="flex items-center gap-4">

//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">
//                   JA
//                 </div>

//                 <div>

//                   <h3 className="text-base font-bold text-slate-900">
//                     Administrator Profile
//                   </h3>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {name}
//                   </p>

//                 </div>

//               </div>

//               <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
//                 ACTIVE
//               </span>

//             </div>

//             <div className="mt-5 space-y-3">

//               <InfoRow
//                 label="Name"
//                 value={name}
//               />

//               <InfoRow
//                 label="Email"
//                 value={email}
//               />

//               <InfoRow
//                 label="Role"
//                 value="SUPER_ADMIN"
//               />

//               <InfoRow
//                 label="Access"
//                 value="JUERP"
//               />

//             </div>

//             <button
//               type="button"
//               onClick={() => setShowProfileModal(true)}
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Edit Profile
//             </button>

//           </div>

//           {/* SECURITY */}

//           <div className="rounded-2xl bg-white p-5 shadow-sm">

//             <div className="flex items-center gap-3">

//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-600">
//                 🔐
//               </div>

//               <div>

//                 <h3 className="text-base font-bold text-slate-900">
//                   Security
//                 </h3>

//                 <p className="mt-1 text-xs text-slate-500">
//                   Manage administrator authentication settings.
//                 </p>

//               </div>

//             </div>

//             <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-sm font-semibold text-slate-800">
//                     Password
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Change your administrator account password.
//                   </p>

//                 </div>

//                 <span className="text-xs font-semibold text-green-600">
//                   Protected
//                 </span>

//               </div>

//             </div>

//             <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">

//               <div className="flex items-center justify-between">

//                 <div>

//                   <p className="text-sm font-semibold text-slate-800">
//                     Firebase Authentication
//                   </p>

//                   <p className="mt-1 text-xs text-slate-500">
//                     Authentication is handled through the configured
//                     Firebase Auth layer.
//                   </p>

//                 </div>

//                 <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
//                   ACTIVE
//                 </span>

//               </div>

//             </div>

//             <button
//               type="button"
//               onClick={() => setShowPasswordModal(true)}
//               className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
//             >
//               Change Password
//             </button>

//           </div>

//         </div>

//       </section>

//       {/* ADMIN PREFERENCES */}

//       <section className="mb-6">

//         <SectionHeader
//           title="Administrator Preferences"
//           description="Control notification and governance preferences for this account."
//         />

//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

//           {settings.map((setting, index) => (
//             <div
//               key={setting.id}
//               className={`flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between ${
//                 index !== settings.length - 1
//                   ? "border-b border-slate-200"
//                   : ""
//               }`}
//             >

//               <div className="flex items-start gap-4">

//                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
//                   ⚙
//                 </div>

//                 <div>

//                   <h3 className="text-sm font-bold text-slate-900">
//                     {setting.title}
//                   </h3>

//                   <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
//                     {setting.description}
//                   </p>

//                 </div>

//               </div>

//               <button
//                 type="button"
//                 onClick={() => toggleSetting(setting.id)}
//                 className="flex items-center gap-3 self-start md:self-center"
//               >

//                 <span
//                   className={`text-xs font-bold ${
//                     setting.status === "ENABLED"
//                       ? "text-green-600"
//                       : "text-slate-400"
//                   }`}
//                 >
//                   {setting.status}
//                 </span>

//                 <span
//                   className={`relative h-6 w-11 rounded-full transition ${
//                     setting.status === "ENABLED"
//                       ? "bg-green-500"
//                       : "bg-slate-300"
//                   }`}
//                 >

//                   <span
//                     className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
//                       setting.status === "ENABLED"
//                         ? "left-6"
//                         : "left-1"
//                     }`}
//                   />

//                 </span>

//               </button>

//             </div>
//           ))}

//         </div>

//       </section>

//       {/* PLATFORM CONFIGURATION */}

//       <section className="mb-6">

//         <SectionHeader
//           title="Platform Configuration"
//           description="View the major JUONE platform configuration areas managed through JUERP."
//         />

//         <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">

//           <ConfigurationCard
//             icon="◈"
//             title="Module Configuration"
//             description="Manage module-level operational configuration and feature availability."
//           />

//           <ConfigurationCard
//             icon="₹"
//             title="Pricing Rules"
//             description="Authoritative pricing configuration is controlled through trusted backend and ERP rules."
//           />

//           <ConfigurationCard
//             icon="%"
//             title="Commission Rules"
//             description="Manage authorized commission configuration through the Commission Engine."
//             href="/commission-engine"
//           />

//           <ConfigurationCard
//             icon="⌁"
//             title="Feature Flags"
//             description="Control controlled platform feature availability through governed configuration."
//           />

//         </div>

//       </section>

//       {/* GOVERNANCE */}

//       <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">

//         <div className="flex items-start gap-4">

//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
//             !
//           </div>

//           <div>

//             <h2 className="text-sm font-bold text-orange-900">
//               Settings & Governance
//             </h2>

//             <p className="mt-2 text-xs leading-6 text-orange-800">
//               JUERP is the administrative governance layer.
//               Financial rules, pricing, commission,
//               settlement, eligibility, verification and
//               other protected business rules must remain
//               authoritative in the trusted backend and ERP
//               configuration. Client-side settings must not
//               independently redefine those rules.
//             </p>

//           </div>

//         </div>

//         <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">

//           <GovernanceCard
//             title="Authentication"
//             description="Firebase Authentication provides the identity layer. Authorization must also be enforced through backend and Firestore rules."
//           />

//           <GovernanceCard
//             title="Configuration"
//             description="Operational configuration should be read from authoritative configuration sources rather than hard-coded in client applications."
//           />

//           <GovernanceCard
//             title="Audit"
//             description="Protected administrative changes should carry appropriate authorization, correlationId, idempotencyKey and audit records."
//           />

//         </div>

//       </section>

//       {/* PROFILE MODAL */}

//       {showProfileModal && (
//         <Modal
//           title="Edit Administrator Profile"
//           onClose={() => setShowProfileModal(false)}
//         >

//           <div className="space-y-4">

//             <div>

//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Name
//               </label>

//               <input
//                 type="text"
//                 value={name}
//                 onChange={(event) =>
//                   setName(event.target.value)
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />

//             </div>

//             <div>

//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 value={email}
//                 onChange={(event) =>
//                   setEmail(event.target.value)
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />

//             </div>

//             <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
//               This screen currently updates local UI state.
//               Connect profile changes to the authorized
//               backend before using this in production.
//             </p>

//             <div className="flex justify-end gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowProfileModal(false)
//                 }
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={saveProfile}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Save Changes
//               </button>

//             </div>

//           </div>

//         </Modal>
//       )}

//       {/* PASSWORD MODAL */}

//       {showPasswordModal && (
//         <Modal
//           title="Change Password"
//           onClose={() => setShowPasswordModal(false)}
//         >

//           <div className="space-y-4">

//             <div>

//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Current Password
//               </label>

//               <input
//                 type="password"
//                 value={currentPassword}
//                 onChange={(event) =>
//                   setCurrentPassword(
//                     event.target.value
//                   )
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />

//             </div>

//             <div>

//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 New Password
//               </label>

//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(event) =>
//                   setNewPassword(event.target.value)
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />

//             </div>

//             <div>

//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Confirm New Password
//               </label>

//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(event) =>
//                   setConfirmPassword(
//                     event.target.value
//                   )
//                 }
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />

//             </div>

//             {newPassword &&
//               confirmPassword &&
//               newPassword !== confirmPassword && (
//                 <p className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
//                   New password and confirmation password
//                   do not match.
//                 </p>
//               )}

//             <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
//               For production, password changes should be
//               performed through Firebase Authentication or
//               the authorized authentication workflow.
//             </p>

//             <div className="flex justify-end gap-3">

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowPasswordModal(false)
//                 }
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={changePassword}
//                 disabled={
//                   !currentPassword ||
//                   !newPassword ||
//                   !confirmPassword ||
//                   newPassword !== confirmPassword
//                 }
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Update Password
//               </button>

//             </div>

//           </div>

//         </Modal>
//       )}

//     </div>
//   );
// }

// function SectionHeader({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="mb-4">

//       <h2 className="text-lg font-bold text-slate-900">
//         {title}
//       </h2>

//       <p className="mt-1 text-sm text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function InfoRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">

//       <span className="text-xs font-medium text-slate-500">
//         {label}
//       </span>

//       <span className="break-all text-right text-xs font-semibold text-slate-800">
//         {value}
//       </span>

//     </div>
//   );
// }

// function ConfigurationCard({
//   icon,
//   title,
//   description,
//   href,
// }: {
//   icon: string;
//   title: string;
//   description: string;
//   href?: string;
// }) {
//   const content = (
//     <>
//       <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-sm font-bold text-orange-600">
//         {icon}
//       </div>

//       <h3 className="mt-4 text-sm font-bold text-slate-900">
//         {title}
//       </h3>

//       <p className="mt-2 text-xs leading-5 text-slate-500">
//         {description}
//       </p>

//       {href && (
//         <p className="mt-4 text-xs font-bold text-orange-600">
//           Open Configuration →
//         </p>
//       )}
//     </>
//   );

//   if (href) {
//     return (
//       <a
//         href={href}
//         className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
//       >
//         {content}
//       </a>
//     );
//   }

//   return (
//     <div className="rounded-2xl bg-white p-5 shadow-sm">
//       {content}
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
//     <div className="rounded-xl border border-orange-200 bg-white p-4">

//       <p className="text-xs font-bold text-orange-800">
//         {title}
//       </p>

//       <p className="mt-2 text-[11px] leading-5 text-slate-500">
//         {description}
//       </p>

//     </div>
//   );
// }

// function Modal({
//   title,
//   children,
//   onClose,
// }: {
//   title: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

//       <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

//         <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">

//           <h2 className="text-lg font-bold text-slate-900">
//             {title}
//           </h2>

//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
//           >
//             ×
//           </button>

//         </div>

//         <div className="p-5">
//           {children}
//         </div>

//       </div>

//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import useAuthScope from "@/hooks/useAuthScope";
// import { useAppConfig } from "@/hooks/useAppConfig";
// import { useFeatureFlags } from "@/hooks/useFeatureFlags";
// import { useAdminPreferences } from "@/hooks/useAdminPreferences";
// import type { FeatureFlagKey } from "@/lib/constants/feature-flags";

// export default function SettingsPage() {
//   const auth = useAuthScope();
//   const canManagePlatform =
//     auth.role === "SUPER_ADMIN" || auth.role === "TECHNICAL_ADMIN";

//   const {
//     maintenanceMode,
//     setMaintenanceMode,
//     saving: configSaving,
//     error: configError,
//     isDemoMode,
//   } = useAppConfig();

//   const {
//     flags,
//     setFlag,
//     saving: flagsSaving,
//     error: flagsError,
//   } = useFeatureFlags();

//   const {
//     prefs,
//     updatePrefs,
//     saving: prefsSaving,
//     error: prefsError,
//   } = useAdminPreferences();

//   const [showSuccess, setShowSuccess] = useState(false);
//   const [actionError, setActionError] = useState<string | null>(null);

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [showPasswordModal, setShowPasswordModal] = useState(false);

//   const [name, setName] = useState("JUERP Administrator");
//   const [email, setEmail] = useState(
//     auth.user?.email || "admin@juone.in"
//   );

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   function toastOk() {
//     setShowSuccess(true);
//     window.setTimeout(() => setShowSuccess(false), 2500);
//   }

//   async function onTogglePreference(
//     key: keyof typeof prefs,
//     next: boolean
//   ) {
//     setActionError(null);
//     try {
//       await updatePrefs({ [key]: next });
//       toastOk();
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Failed to update preference."
//       );
//     }
//   }

//   async function onToggleMaintenance(next: boolean) {
//     if (!canManagePlatform) {
//       setActionError("Only Super/Technical Admin can change maintenance mode.");
//       return;
//     }
//     setActionError(null);
//     try {
//       await setMaintenanceMode(next);
//       toastOk();
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Failed to update maintenance."
//       );
//     }
//   }

//   async function onToggleFlag(key: FeatureFlagKey, next: boolean) {
//     if (!canManagePlatform) {
//       setActionError("Only Super/Technical Admin can change feature flags.");
//       return;
//     }
//     setActionError(null);
//     try {
//       await setFlag(key, next);
//       toastOk();
//     } catch (err) {
//       setActionError(
//         err instanceof Error ? err.message : "Failed to update feature flag."
//       );
//     }
//   }

//   function saveProfile() {
//     setShowProfileModal(false);
//     toastOk();
//   }

//   function changePassword() {
//     if (!currentPassword || !newPassword || !confirmPassword) return;
//     if (newPassword !== confirmPassword) return;
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmPassword("");
//     setShowPasswordModal(false);
//     toastOk();
//   }

//   const preferenceRows = [
//     {
//       id: "notifications" as const,
//       title: "Admin Notifications",
//       description:
//         "Receive important operational, governance and system notifications.",
//       enabled: prefs.notificationsEnabled,
//       onToggle: (v: boolean) =>
//         void onTogglePreference("notificationsEnabled", v),
//     },
//     {
//       id: "security-alerts" as const,
//       title: "Security Alerts",
//       description:
//         "Receive alerts for important authentication and security events.",
//       enabled: prefs.securityAlertsEnabled,
//       onToggle: (v: boolean) =>
//         void onTogglePreference("securityAlertsEnabled", v),
//     },
//     {
//       id: "audit-alerts" as const,
//       title: "Audit Alerts",
//       description:
//         "Receive notifications when important audit or governance exceptions occur.",
//       enabled: prefs.auditAlertsEnabled,
//       onToggle: (v: boolean) =>
//         void onTogglePreference("auditAlertsEnabled", v),
//     },
//   ];

//   const displayRole = auth.role || "—";
//   const initials = (email || "JA").slice(0, 2).toUpperCase();

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       {showSuccess && (
//         <div className="fixed right-4 top-4 z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg">
//           Settings updated successfully.
//         </div>
//       )}

//       {(actionError || configError || flagsError || prefsError) && (
//         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {actionError || configError || flagsError || prefsError}
//         </div>
//       )}

//       {isDemoMode && (
//         <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
//           Demo mode: settings writes are disabled.
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
//         <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-4">
//             <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-600">
//               ⚙
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
//               <p className="mt-1 text-sm text-slate-500">
//                 Manage JUERP administrator preferences, security and platform
//                 settings.
//               </p>
//             </div>
//           </div>
//           <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-bold text-orange-800">
//               JUERP Administration
//             </p>
//             <p className="mt-1 text-xs text-orange-700">
//               Protected settings require authorized access.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* ACCOUNT */}
//       <section className="mb-6">
//         <SectionHeader
//           title="Account"
//           description="Manage the administrator profile and authentication."
//         />
//         <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//           <div className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-start justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">
//                   {initials}
//                 </div>
//                 <div>
//                   <h3 className="text-base font-bold text-slate-900">
//                     Administrator Profile
//                   </h3>
//                   <p className="mt-1 text-xs text-slate-500">{name}</p>
//                 </div>
//               </div>
//               <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
//                 ACTIVE
//               </span>
//             </div>
//             <div className="mt-5 space-y-3">
//               <InfoRow label="Name" value={name} />
//               <InfoRow label="Email" value={email} />
//               <InfoRow label="Role" value={displayRole} />
//               <InfoRow label="Access" value="JUERP" />
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowProfileModal(true)}
//               className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//             >
//               Edit Profile
//             </button>
//           </div>

//           <div className="rounded-2xl bg-white p-5 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-600">
//                 🔐
//               </div>
//               <div>
//                 <h3 className="text-base font-bold text-slate-900">Security</h3>
//                 <p className="mt-1 text-xs text-slate-500">
//                   Manage administrator authentication settings.
//                 </p>
//               </div>
//             </div>
//             <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800">Password</p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Change your administrator account password.
//                   </p>
//                 </div>
//                 <span className="text-xs font-semibold text-green-600">
//                   Protected
//                 </span>
//               </div>
//             </div>
//             <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800">
//                     Firebase Authentication
//                   </p>
//                   <p className="mt-1 text-xs text-slate-500">
//                     Authentication is handled through the configured Firebase
//                     Auth layer.
//                   </p>
//                 </div>
//                 <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
//                   ACTIVE
//                 </span>
//               </div>
//             </div>
//             <button
//               type="button"
//               onClick={() => setShowPasswordModal(true)}
//               className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
//             >
//               Change Password
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* PLATFORM — Maintenance */}
//       <section className="mb-6">
//         <SectionHeader
//           title="Platform controls"
//           description="Global JUERP switches stored in Firestore app_configs."
//         />
//         <div className="rounded-2xl bg-white shadow-sm">
//           <ToggleRow
//             title="Maintenance Mode"
//             description="When enabled, non–Super Admin sessions see a maintenance banner and restricted access."
//             enabled={maintenanceMode}
//             disabled={!canManagePlatform || configSaving}
//             onToggle={() => void onToggleMaintenance(!maintenanceMode)}
//           />
//         </div>
//       </section>

//       {/* FEATURE FLAGS */}
//       <section className="mb-6">
//         <SectionHeader
//           title="Feature flags"
//           description="Toggle modules in the sidebar (collection feature_flags)."
//         />
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           {flags.map((f, index) => (
//             <div
//               key={f.key}
//               className={
//                 index !== flags.length - 1 ? "border-b border-slate-200" : ""
//               }
//             >
//               <ToggleRow
//                 title={f.title}
//                 description={f.description}
//                 enabled={f.value}
//                 disabled={!canManagePlatform || flagsSaving}
//                 onToggle={() => void onToggleFlag(f.key, !f.value)}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* PER-ADMIN PREFERENCES */}
//       <section className="mb-6">
//         <SectionHeader
//           title="Administrator preferences"
//           description="Saved on your users profile document."
//         />
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           {preferenceRows.map((row, index) => (
//             <div
//               key={row.id}
//               className={
//                 index !== preferenceRows.length - 1
//                   ? "border-b border-slate-200"
//                   : ""
//               }
//             >
//               <ToggleRow
//                 title={row.title}
//                 description={row.description}
//                 enabled={row.enabled}
//                 disabled={prefsSaving}
//                 onToggle={() => row.onToggle(!row.enabled)}
//               />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* GOVERNANCE */}
//       <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
//         <div className="flex items-start gap-4">
//           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
//             !
//           </div>
//           <div>
//             <h2 className="text-sm font-bold text-orange-900">
//               Settings & Governance
//             </h2>
//             <p className="mt-2 text-xs leading-6 text-orange-800">
//               JUERP is the administrative governance layer. Financial rules,
//               pricing, commission, settlement and verification remain
//               authoritative in the trusted backend. Client settings must not
//               redefine those rules.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* PROFILE MODAL */}
//       {showProfileModal && (
//         <Modal title="Edit Administrator Profile" onClose={() => setShowProfileModal(false)}>
//           <div className="space-y-4">
//             <div>
//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />
//             </div>
//             <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
//               Profile fields here update local UI only until wired to the users
//               document / Auth profile API.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowProfileModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={saveProfile}
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* PASSWORD MODAL */}
//       {showPasswordModal && (
//         <Modal title="Change Password" onClose={() => setShowPasswordModal(false)}>
//           <div className="space-y-4">
//             <div>
//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Current Password
//               </label>
//               <input
//                 type="password"
//                 value={currentPassword}
//                 onChange={(e) => setCurrentPassword(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />
//             </div>
//             <div>
//               <label className="mb-2 block text-xs font-bold text-slate-600">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-orange-500"
//               />
//             </div>
//             {newPassword &&
//               confirmPassword &&
//               newPassword !== confirmPassword && (
//                 <p className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
//                   New password and confirmation do not match.
//                 </p>
//               )}
//             <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
//               Production password changes should use Firebase Auth (e.g.
//               updatePassword / reauthenticate).
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={() => setShowPasswordModal(false)}
//                 className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={changePassword}
//                 disabled={
//                   !currentPassword ||
//                   !newPassword ||
//                   !confirmPassword ||
//                   newPassword !== confirmPassword
//                 }
//                 className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Update Password
//               </button>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// function SectionHeader({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="mb-4">
//       <h2 className="text-lg font-bold text-slate-900">{title}</h2>
//       <p className="mt-1 text-sm text-slate-500">{description}</p>
//     </div>
//   );
// }

// function InfoRow({ label, value }: { label: string; value: string }) {
//   return (
//     <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
//       <span className="text-xs font-medium text-slate-500">{label}</span>
//       <span className="break-all text-right text-xs font-semibold text-slate-800">
//         {value}
//       </span>
//     </div>
//   );
// }

// function ToggleRow({
//   title,
//   description,
//   enabled,
//   disabled,
//   onToggle,
// }: {
//   title: string;
//   description: string;
//   enabled: boolean;
//   disabled?: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
//       <div>
//         <h3 className="text-sm font-bold text-slate-900">{title}</h3>
//         <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
//           {description}
//         </p>
//       </div>
//       <button
//         type="button"
//         disabled={disabled}
//         onClick={onToggle}
//         className="flex items-center gap-3 self-start disabled:opacity-50 md:self-center"
//       >
//         <span
//           className={`text-xs font-bold ${
//             enabled ? "text-green-600" : "text-slate-400"
//           }`}
//         >
//           {enabled ? "ENABLED" : "DISABLED"}
//         </span>
//         <span
//           className={`relative h-6 w-11 rounded-full transition ${
//             enabled ? "bg-green-500" : "bg-slate-300"
//           }`}
//         >
//           <span
//             className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
//               enabled ? "left-6" : "left-1"
//             }`}
//           />
//         </span>
//       </button>
//     </div>
//   );
// }

// function Modal({
//   title,
//   children,
//   onClose,
// }: {
//   title: string;
//   children: React.ReactNode;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
//       <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
//         <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
//           <h2 className="text-lg font-bold text-slate-900">{title}</h2>
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
//           >
//             ×
//           </button>
//         </div>
//         <div className="p-5">{children}</div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useCallback, type ReactNode } from "react";
import useAuthScope from "@/hooks/useAuthScope";
import { useAppConfig } from "@/hooks/useAppConfig";
import { useFeatureFlags } from "@/hooks/useFeatureFlags";
import { useAdminPreferences } from "@/hooks/useAdminPreferences";
import type { FeatureFlagKey } from "@/lib/constants/feature-flags";

type PreferenceKey =
  | "notificationsEnabled"
  | "securityAlertsEnabled"
  | "auditAlertsEnabled";

export default function SettingsPage() {
  const auth = useAuthScope();

  const canManagePlatform =
    auth.role === "SUPER_ADMIN" || auth.role === "TECHNICAL_ADMIN";

  const {
    maintenanceMode,
    setMaintenanceMode,
    saving: configSaving,
    error: configError,
    isDemoMode,
  } = useAppConfig();

  const {
    flags,
    setFlag,
    saving: flagsSaving,
    error: flagsError,
  } = useFeatureFlags();

  const {
    prefs,
    updatePrefs,
    saving: prefsSaving,
    error: prefsError,
  } = useAdminPreferences();

  const [showSuccess, setShowSuccess] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [name, setName] = useState("JUERP Administrator");
  const [email, setEmail] = useState(
    auth.user?.email ?? "admin@juone.in"
  );

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const toastOk = useCallback(() => {
    setShowSuccess(true);
    window.setTimeout(() => setShowSuccess(false), 2500);
  }, []);

  const clearActionError = useCallback(() => {
    setActionError(null);
  }, []);

  async function onTogglePreference(key: PreferenceKey, next: boolean) {
    clearActionError();
    try {
      await updatePrefs({ [key]: next });
      toastOk();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update preference."
      );
    }
  }

  async function onToggleMaintenance(next: boolean) {
    if (!canManagePlatform) {
      setActionError(
        "Only Super Admin or Technical Admin can change maintenance mode."
      );
      return;
    }
    clearActionError();
    try {
      await setMaintenanceMode(next);
      toastOk();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update maintenance mode."
      );
    }
  }

  async function onToggleFlag(key: FeatureFlagKey, next: boolean) {
    if (!canManagePlatform) {
      setActionError(
        "Only Super Admin or Technical Admin can change feature flags."
      );
      return;
    }
    clearActionError();
    try {
      await setFlag(key, next);
      toastOk();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update feature flag."
      );
    }
  }

  function saveProfile() {
    // Local UI only until wired to users/{uid} + Auth profile.
    setShowProfileModal(false);
    toastOk();
  }

  function changePassword() {
    setPasswordError(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }

    // Production: reauthenticateWithCredential + updatePassword (Firebase Auth).
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(false);
    toastOk();
  }

  const preferenceRows: Array<{
    id: PreferenceKey;
    title: string;
    description: string;
    enabled: boolean;
  }> = [
    {
      id: "notificationsEnabled",
      title: "Admin Notifications",
      description:
        "Receive important operational, governance and system notifications.",
      enabled: prefs.notificationsEnabled,
    },
    {
      id: "securityAlertsEnabled",
      title: "Security Alerts",
      description:
        "Receive alerts for important authentication and security events.",
      enabled: prefs.securityAlertsEnabled,
    },
    {
      id: "auditAlertsEnabled",
      title: "Audit Alerts",
      description:
        "Receive notifications when important audit or governance exceptions occur.",
      enabled: prefs.auditAlertsEnabled,
    },
  ];

  const displayRole = auth.role ?? "—";
  const initials = (email || "JA").slice(0, 2).toUpperCase();
  const bannerError =
    actionError || configError || flagsError || prefsError || null;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {showSuccess && (
        <div
          role="status"
          className="fixed right-4 top-4 z-50 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Settings updated successfully.
        </div>
      )}

      {bannerError && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {bannerError}
        </div>
      )}

      {isDemoMode && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Demo mode: settings writes are disabled.
        </div>
      )}

      {/* HEADER */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl text-orange-600">
              ⚙
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
              <p className="mt-1 text-sm text-slate-500">
                Manage JUERP administrator preferences, security and platform
                settings.
              </p>
            </div>
          </div>
          <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
            <p className="text-xs font-bold text-orange-800">
              JUERP Administration
            </p>
            <p className="mt-1 text-xs text-orange-700">
              Platform controls require Super Admin or Technical Admin.
            </p>
          </div>
        </div>
      </div>

      {/* ACCOUNT */}
      <section className="mb-6">
        <SectionHeader
          title="Account"
          description="Manage the administrator profile and authentication."
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-700">
                  {initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Administrator Profile
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{name}</p>
                </div>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                ACTIVE
              </span>
            </div>

            <div className="mt-5 space-y-3">
              <InfoRow label="Name" value={name} />
              <InfoRow label="Email" value={email} />
              <InfoRow label="Role" value={displayRole} />
              <InfoRow label="Access" value="JUERP" />
            </div>

            <button
              type="button"
              onClick={() => setShowProfileModal(true)}
              className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Edit Profile
            </button>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-lg text-blue-600">
                🔐
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Security</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Manage administrator authentication settings.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Password
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Change your administrator account password.
                  </p>
                </div>
                <span className="text-xs font-semibold text-green-600">
                  Protected
                </span>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Firebase Authentication
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Authentication is handled through the configured Firebase
                    Auth layer.
                  </p>
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold text-green-700">
                  ACTIVE
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setPasswordError(null);
                setShowPasswordModal(true);
              }}
              className="mt-5 w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Change Password
            </button>
          </div>
        </div>
      </section>

      {/* PLATFORM — Maintenance */}
      <section className="mb-6">
        <SectionHeader
          title="Platform controls"
          description="Global JUERP switches stored in Firestore app_configs."
        />
        <div className="rounded-2xl bg-white shadow-sm">
          <ToggleRow
            title="Maintenance Mode"
            description="When enabled, non–Super Admin sessions see a maintenance banner and restricted access."
            enabled={maintenanceMode}
            disabled={!canManagePlatform || configSaving || isDemoMode}
            onToggle={() => void onToggleMaintenance(!maintenanceMode)}
          />
          {!canManagePlatform && (
            <p className="border-t border-slate-100 px-5 pb-4 text-xs text-slate-500">
              You can view this control. Only Super Admin or Technical Admin can
              change it.
            </p>
          )}
        </div>
      </section>

      {/* FEATURE FLAGS */}
      <section className="mb-6">
        <SectionHeader
          title="Feature flags"
          description="Toggle modules in the sidebar (collection feature_flags)."
        />
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {flags.length === 0 ? (
            <p className="p-5 text-sm text-slate-500">
              No feature flags loaded.
            </p>
          ) : (
            flags.map((f, index) => (
              <div
                key={f.key}
                className={
                  index !== flags.length - 1 ? "border-b border-slate-200" : ""
                }
              >
                <ToggleRow
                  title={f.title}
                  description={f.description}
                  enabled={f.value}
                  disabled={
                    !canManagePlatform || flagsSaving || isDemoMode
                  }
                  onToggle={() => void onToggleFlag(f.key, !f.value)}
                />
              </div>
            ))
          )}
          {!canManagePlatform && flags.length > 0 && (
            <p className="border-t border-slate-100 px-5 py-4 text-xs text-slate-500">
              Feature flags are read-only for your role.
            </p>
          )}
        </div>
      </section>

      {/* PER-ADMIN PREFERENCES */}
      <section className="mb-6">
        <SectionHeader
          title="Administrator preferences"
          description="Saved on your users profile document."
        />
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {preferenceRows.map((row, index) => (
            <div
              key={row.id}
              className={
                index !== preferenceRows.length - 1
                  ? "border-b border-slate-200"
                  : ""
              }
            >
              <ToggleRow
                title={row.title}
                description={row.description}
                enabled={row.enabled}
                disabled={prefsSaving || isDemoMode}
                onToggle={() =>
                  void onTogglePreference(row.id, !row.enabled)
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* GOVERNANCE */}
      <section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
            !
          </div>
          <div>
            <h2 className="text-sm font-bold text-orange-900">
              Settings &amp; Governance
            </h2>
            <p className="mt-2 text-xs leading-6 text-orange-800">
              JUERP is the administrative governance layer. Financial rules,
              pricing, commission, settlement and verification remain
              authoritative in the trusted backend. Client settings must not
              redefine those rules.
            </p>
          </div>
        </div>
      </section>

      {/* PROFILE MODAL */}
      {showProfileModal && (
        <Modal
          title="Edit Administrator Profile"
          onClose={() => setShowProfileModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
              Profile fields update local UI only until wired to the users
              document / Auth profile API.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveProfile}
                className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* PASSWORD MODAL */}
      {showPasswordModal && (
        <Modal
          title="Change Password"
          onClose={() => {
            setPasswordError(null);
            setShowPasswordModal(false);
          }}
        >
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {passwordError && (
              <p className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
                {passwordError}
              </p>
            )}

            {!passwordError &&
              newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600">
                  New password and confirmation do not match.
                </p>
              )}

            <p className="rounded-lg bg-yellow-50 p-3 text-xs leading-5 text-yellow-700">
              Production password changes should use Firebase Auth (e.g.
              reauthenticate + updatePassword).
            </p>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setPasswordError(null);
                  setShowPasswordModal(false);
                }}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={changePassword}
                disabled={
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword ||
                  newPassword !== confirmPassword ||
                  newPassword.length < 8
                }
                className="rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Update Password
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Local UI helpers                                                           */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 px-4 py-3">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <span className="break-all text-right text-xs font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

function ToggleRow({
  title,
  description,
  enabled,
  disabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
          {description}
        </p>
      </div>
      <button
        type="button"
        disabled={disabled}
        onClick={onToggle}
        aria-pressed={enabled}
        className="flex items-center gap-3 self-start disabled:cursor-not-allowed disabled:opacity-50 md:self-center"
      >
        <span
          className={`text-xs font-bold ${
            enabled ? "text-green-600" : "text-slate-400"
          }`}
        >
          {enabled ? "ENABLED" : "DISABLED"}
        </span>
        <span
          className={`relative h-6 w-11 rounded-full transition ${
            enabled ? "bg-green-500" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
              enabled ? "left-6" : "left-1"
            }`}
          />
        </span>
      </button>
    </div>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2
            id="settings-modal-title"
            className="text-lg font-bold text-slate-900"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100"
          >
            ×
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}