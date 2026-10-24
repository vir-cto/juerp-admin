// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useJuRidePackersMovers, {
//   PM_SLA_HOURS,
//   type PmPartnerRow,
// } from "@/hooks/useJuRidePackersMovers";

// function formatPaise(paise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(paise / 100);
// }

// const STATUS_STYLE: Record<string, string> = {
//   DRAFT: "bg-slate-100 text-slate-600",
//   SUBMITTED: "bg-blue-50 text-blue-700",
//   PENDING: "bg-amber-50 text-amber-700",
//   ACTIVE: "bg-green-50 text-green-700",
//   REJECTED: "bg-red-50 text-red-700",
// };

// export default function JuRidePackersMoversPage() {
//   const {
//     partners,
//     jobs,
//     summary,
//     loading,
//     error,
//     actionId,
//     refresh,
//     approvePartner,
//     rejectPartner,
//   } = useJuRidePackersMovers();

//   const [tab, setTab] = useState<"queue" | "partners" | "jobs">("queue");
//   const [search, setSearch] = useState("");
//   const [modeFilter, setModeFilter] = useState("ALL");
//   const [statusFilter, setStatusFilter] = useState("ALL");
//   const [rejectTarget, setRejectTarget] = useState<PmPartnerRow | null>(null);
//   const [reason, setReason] = useState("");

//   const queue = useMemo(
//     () =>
//       partners
//         .filter((p) => ["SUBMITTED", "PENDING"].includes(p.verificationStatus))
//         .sort((a, b) => b.hoursInQueue - a.hoursInQueue),
//     [partners]
//   );

//   const filteredPartners = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return partners.filter((p) => {
//       const matchQ =
//         !q ||
//         p.businessName.toLowerCase().includes(q) ||
//         p.headName.toLowerCase().includes(q) ||
//         p.captainId.toLowerCase().includes(q) ||
//         p.phone.includes(q);
//       const matchMode = modeFilter === "ALL" || p.mode === modeFilter;
//       const matchSt =
//         statusFilter === "ALL" || p.verificationStatus === statusFilter;
//       return matchQ && matchMode && matchSt;
//     });
//   }, [partners, search, modeFilter, statusFilter]);

//   const filteredJobs = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return jobs.filter(
//       (j) =>
//         !q ||
//         j.rideId.toLowerCase().includes(q) ||
//         j.captainId.toLowerCase().includes(q) ||
//         j.userId.toLowerCase().includes(q) ||
//         j.pickupLabel.toLowerCase().includes(q) ||
//         j.dropLabel.toLowerCase().includes(q)
//     );
//   }, [jobs, search]);

//   function onApprove(p: PmPartnerRow) {
//     if (p.missingDocs.length > 0) {
//       const ok = window.confirm(
//         `Missing: ${p.missingDocs.join(", ")}.\n\nApprove ${p.businessName} anyway?`
//       );
//       if (!ok) return;
//     }
//     void approvePartner(p.id);
//   }

//   async function onConfirmReject() {
//     if (!rejectTarget || !reason.trim()) return;
//     await rejectPartner(rejectTarget.id, reason.trim());
//     setRejectTarget(null);
//     setReason("");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <Link
//             href="/modules/juride"
//             className="text-xs font-semibold text-blue-600"
//           >
//             ← JuRide
//           </Link>
//           <h1 className="mt-1 text-2xl font-black text-slate-900">
//             Packers &amp; Movers
//           </h1>
//           <p className="text-sm text-slate-500">
//             Partner verification (SLA {PM_SLA_HOURS}h), fleet &amp; crew, and
//             50% start / 50% end jobs
//           </p>
//         </div>
//         <button
//           type="button"
//           onClick={() => void refresh()}
//           disabled={loading}
//           className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold disabled:opacity-60"
//         >
//           {loading ? "Refreshing…" : "Refresh"}
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
//         <Kpi title="Partners" value={String(summary.partners)} loading={loading} />
//         <Kpi title="Active" value={String(summary.active)} loading={loading} />
//         <Kpi
//           title="In verification"
//           value={String(summary.queue)}
//           loading={loading}
//         />
//         <Kpi
//           title={`SLA breached (> ${PM_SLA_HOURS}h)`}
//           value={String(summary.slaBreached)}
//           loading={loading}
//           danger={summary.slaBreached > 0}
//         />
//         <Kpi
//           title="Job value"
//           value={formatPaise(summary.jobValuePaise)}
//           loading={loading}
//         />
//       </div>

//       <div className="mb-4 flex gap-2">
//         {(
//           [
//             ["queue", `Verification queue (${queue.length})`],
//             ["partners", `Partners (${partners.length})`],
//             ["jobs", `Jobs (${jobs.length})`],
//           ] as const
//         ).map(([key, label]) => (
//           <button
//             key={key}
//             type="button"
//             onClick={() => setTab(key)}
//             className={`rounded-xl px-4 py-2 text-xs font-bold ${
//               tab === key
//                 ? "bg-blue-400 text-white"
//                 : "border border-slate-200 bg-white text-slate-700"
//             }`}
//           >
//             {label}
//           </button>
//         ))}
//       </div>

//       {tab !== "queue" && (
//         <div className="mb-4 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-4">
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder={
//               tab === "partners"
//                 ? "Search business / head / phone…"
//                 : "Search job / captain / user / place…"
//             }
//             className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
//           />
//           {tab === "partners" && (
//             <>
//               <select
//                 value={modeFilter}
//                 onChange={(e) => setModeFilter(e.target.value)}
//                 className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
//               >
//                 <option value="ALL">All modes</option>
//                 <option value="LOCAL">Local city</option>
//                 <option value="INTERCITY">Intercity</option>
//                 <option value="BOTH">Both</option>
//               </select>
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
//               >
//                 <option value="ALL">All statuses</option>
//                 {["DRAFT", "SUBMITTED", "PENDING", "ACTIVE", "REJECTED"].map(
//                   (s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   )
//                 )}
//               </select>
//             </>
//           )}
//         </div>
//       )}

//       {tab === "queue" && (
//         <div className="space-y-4">
//           {queue.map((p) => {
//             const breached = p.hoursInQueue > PM_SLA_HOURS;
//             const busy = actionId === p.id;
//             return (
//               <div
//                 key={p.id}
//                 className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
//               >
//                 <div className="flex flex-wrap items-start justify-between gap-3">
//                   <div>
//                     <Link
//                       href={`/entity-management/captains/${p.id}`}
//                       className="text-base font-black text-slate-900 hover:text-blue-600"
//                     >
//                       {p.businessName}
//                     </Link>
//                     <p className="text-xs text-slate-500">
//                       {p.captainId} · {p.headName} · {p.phone || "—"} ·{" "}
//                       {p.districtName}
//                     </p>
//                     <p className="mt-1 text-xs text-slate-600">
//                       Mode: <b>{p.mode}</b> · Trucks: <b>{p.trucks}</b> ·
//                       Helpers: <b>{p.helpers}</b>
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <StatusChip status={p.verificationStatus} />
//                     <p
//                       className={`mt-1 text-xs ${
//                         breached ? "font-bold text-red-600" : "text-slate-500"
//                       }`}
//                     >
//                       {p.hoursInQueue.toFixed(1)}h in queue
//                     </p>
//                     <p className="text-[10px] text-slate-400">
//                       Submitted {p.submittedAtLabel}
//                     </p>
//                   </div>
//                 </div>

//                 <div className="mt-3 flex flex-wrap gap-2">
//                   <DocChip ok={p.hasAadhaar} label="Aadhaar" />
//                   <DocChip ok={p.hasPan} label="PAN" />
//                   <DocChip ok={p.hasBusinessProof} label="Business proof" />
//                   {(p.mode === "INTERCITY" || p.mode === "BOTH") && (
//                     <DocChip
//                       ok={Boolean(p.gstin)}
//                       label={p.gstin ? `GSTIN ${p.gstin}` : "GSTIN (required)"}
//                     />
//                   )}
//                 </div>

//                 {p.missingDocs.length > 0 && (
//                   <p className="mt-2 text-xs text-red-600">
//                     Missing: {p.missingDocs.join(", ")}
//                   </p>
//                 )}

//                 <div className="mt-4 flex gap-2">
//                   <button
//                     type="button"
//                     disabled={busy}
//                     onClick={() => onApprove(p)}
//                     className="rounded-xl bg-green-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60"
//                   >
//                     {busy ? "Saving…" : "Approve"}
//                   </button>
//                   <button
//                     type="button"
//                     disabled={busy}
//                     onClick={() => setRejectTarget(p)}
//                     className="rounded-xl border border-red-200 bg-white px-4 py-2 text-xs font-bold text-red-700 disabled:opacity-60"
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//           {!loading && queue.length === 0 && (
//             <div className="rounded-2xl bg-white p-10 text-center text-sm text-slate-400 shadow-sm">
//               Verification queue is empty.
//             </div>
//           )}
//         </div>
//       )}

//       {tab === "partners" && (
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px] text-left">
//               <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
//                 <tr>
//                   <th className="px-4 py-3">Business</th>
//                   <th className="px-4 py-3">District</th>
//                   <th className="px-4 py-3">Mode</th>
//                   <th className="px-4 py-3">Fleet</th>
//                   <th className="px-4 py-3">Crew</th>
//                   <th className="px-4 py-3">GSTIN</th>
//                   <th className="px-4 py-3">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 text-sm">
//                 {filteredPartners.map((p) => (
//                   <tr key={p.id} className="hover:bg-slate-50">
//                     <td className="px-4 py-3">
//                       <Link
//                         href={`/entity-management/captains/${p.id}`}
//                         className="font-bold text-slate-900 hover:text-blue-600"
//                       >
//                         {p.businessName}
//                       </Link>
//                       <p className="text-[10px] text-slate-400">
//                         {p.headName} · {p.phone || "—"}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 text-xs">{p.districtName}</td>
//                     <td className="px-4 py-3 text-xs font-semibold">
//                       {p.mode}
//                     </td>
//                     <td className="px-4 py-3 text-xs">{p.trucks} trucks</td>
//                     <td className="px-4 py-3 text-xs">{p.helpers} helpers</td>
//                     <td className="px-4 py-3 text-xs">{p.gstin || "—"}</td>
//                     <td className="px-4 py-3">
//                       <StatusChip status={p.verificationStatus} />
//                       {p.rejectionReason && (
//                         <p className="mt-1 text-[10px] text-red-600">
//                           {p.rejectionReason}
//                         </p>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//                 {!loading && filteredPartners.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-10 text-center text-sm text-slate-400"
//                     >
//                       No Packers &amp; Movers partners found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {tab === "jobs" && (
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1000px] text-left">
//               <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
//                 <tr>
//                   <th className="px-4 py-3">Job</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Pickup → Drop</th>
//                   <th className="px-4 py-3">Total</th>
//                   <th className="px-4 py-3">50% start</th>
//                   <th className="px-4 py-3">50% end</th>
//                   <th className="px-4 py-3">PIN</th>
//                   <th className="px-4 py-3">Created</th>
//                   <th className="px-4 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 text-sm">
//                 {filteredJobs.map((j) => (
//                   <tr key={j.id} className="hover:bg-slate-50">
//                     <td className="px-4 py-3">
//                       <p className="font-bold text-slate-900">{j.rideId}</p>
//                       <p className="text-[10px] text-slate-400">
//                         {j.captainId || "Unassigned"} · {j.moveType}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 text-xs font-semibold">
//                       {j.status}
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-600">
//                       <p className="line-clamp-1">{j.pickupLabel}</p>
//                       <p className="line-clamp-1 text-slate-400">
//                         → {j.dropLabel}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 font-semibold">
//                       {formatPaise(j.totalPaise)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <Pill ok={j.startPaid} label={j.startPaid ? "Paid" : "Due"} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <Pill ok={j.endPaid} label={j.endPaid ? "Paid" : "Due"} />
//                     </td>
//                     <td className="px-4 py-3">
//                       <Pill
//                         ok={j.pinVerified}
//                         label={j.pinVerified ? "Verified" : "Pending"}
//                       />
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-500">
//                       {j.createdAtLabel}
//                     </td>
//                     <td className="px-4 py-3">
//                       <Link
//                         href={`/modules/juride/rides/${j.id}`}
//                         className="text-xs font-bold text-blue-600"
//                       >
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//                 {!loading && filteredJobs.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-10 text-center text-sm text-slate-400"
//                     >
//                       No Packers &amp; Movers jobs found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {rejectTarget && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
//             <h3 className="text-base font-black text-slate-900">
//               Reject {rejectTarget.businessName}
//             </h3>
//             <p className="mt-1 text-xs text-slate-500">
//               This reason is shown to the partner in the Captain app.
//             </p>
//             <textarea
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               rows={3}
//               placeholder="Rejection reason"
//               className="mt-3 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
//             />
//             <div className="mt-4 flex justify-end gap-2">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setRejectTarget(null);
//                   setReason("");
//                 }}
//                 className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 disabled={!reason.trim() || actionId === rejectTarget.id}
//                 onClick={() => void onConfirmReject()}
//                 className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-50"
//               >
//                 Confirm reject
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// function Kpi({
//   title,
//   value,
//   loading,
//   danger,
// }: {
//   title: string;
//   value: string;
//   loading: boolean;
//   danger?: boolean;
// }) {
//   return (
//     <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
//       <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
//         {title}
//       </p>
//       <p
//         className={`mt-2 text-2xl font-black ${
//           danger ? "text-red-600" : "text-slate-900"
//         }`}
//       >
//         {loading ? "…" : value}
//       </p>
//     </div>
//   );
// }

// function StatusChip({ status }: { status: string }) {
//   return (
//     <span
//       className={`rounded-md px-2 py-1 text-[10px] font-bold ${
//         STATUS_STYLE[status] ?? "bg-slate-100 text-slate-600"
//       }`}
//     >
//       {status}
//     </span>
//   );
// }

// function DocChip({ ok, label }: { ok: boolean; label: string }) {
//   return (
//     <span
//       className={`rounded-md px-2 py-1 text-[10px] font-bold ${
//         ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
//       }`}
//     >
//       {ok ? "✓" : "✗"} {label}
//     </span>
//   );
// }

// function Pill({ ok, label }: { ok: boolean; label: string }) {
//   return (
//     <span
//       className={`rounded-md px-2 py-1 text-[10px] font-bold ${
//         ok ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
//       }`}
//     >
//       {label}
//     </span>
//   );
// }


"use client";

import Link from "next/link";

export default function JuRidePackersMoversPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
              📦
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                JuRide · Module
              </p>
              <h1 className="text-2xl font-bold text-slate-900">
                Packers &amp; Movers
              </h1>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Local &amp; intercity moves — partner KYC, fleet, helpers, 50/50
                payments, item cross-check and customer PIN at handover. ERP is
                source of truth for verification.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/modules/juride"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              ← JuRide
            </Link>
            <Link
              href="/modules/juride/logistics"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Logistics
            </Link>
            <Link
              href="/entity-management/captains"
              className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
            >
              Captains / Partners
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Active moves", value: "—", hint: "In progress" },
          { label: "Local today", value: "—", hint: "Same city" },
          { label: "Intercity today", value: "—", hint: "Cross-city" },
          { label: "Pending KYC", value: "—", hint: "Partners" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              {card.label}
            </p>
            <p className="mt-2 text-2xl font-black text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.hint}</p>
          </div>
        ))}
      </div>

      {/* Modes + execution */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Service modes</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="rounded-lg bg-slate-50 px-3 py-2.5 font-medium">
              LOCAL CITY
            </li>
            <li className="rounded-lg bg-slate-50 px-3 py-2.5 font-medium">
              INTERCITY
            </li>
            <li className="rounded-lg bg-slate-50 px-3 py-2.5 font-medium">
              BOTH
            </li>
          </ul>
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
            <p className="font-semibold">Documentation</p>
            <p className="mt-1">
              Main head profile, Aadhaar, PAN, business proof. Intercity requires
              GSTIN and GST certificates. Each truck: capacity, RC, commercial DL
              driver; helpers and skills tracked in ERP.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Job execution</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-slate-600">
            <li>Partner selected from ERP-approved operational pool.</li>
            <li>
              <span className="font-semibold text-slate-800">50% start</span> —
              collected before load / transit.
            </li>
            <li>Transit local or intercity per booking mode.</li>
            <li>
              <span className="font-semibold text-slate-800">50% end</span> — at
              destination before handover close.
            </li>
            <li>
              Item cross-check + customer{" "}
              <span className="font-semibold text-slate-800">PIN verification</span>{" "}
              via backend.
            </li>
            <li>Status → delivered / settled in ERP ledger.</li>
          </ol>
          <p className="mt-3 text-xs text-slate-500">
            Captain / partner app is input only; verification and commissions stay
            in ERP.
          </p>
        </section>
      </div>

      {/* SLA note */}
      <section className="mt-5 rounded-2xl border border-orange-100 bg-orange-50/60 p-5">
        <h2 className="text-sm font-bold text-orange-900">KYC / review SLA</h2>
        <p className="mt-2 text-sm leading-6 text-orange-800">
          Target review window for packers &amp; movers partners is tighter than
          standard captains (often under a few hours when docs are complete).
          Rejected cases return structured reason codes so the partner app can
          reopen the failed step.
        </p>
      </section>

      {/* Table placeholder */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900">Recent moves</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
            Wire to Firestore / API
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Move ID</th>
                <th className="px-4 py-3 font-semibold">Mode</th>
                <th className="px-4 py-3 font-semibold">Partner</th>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={6}>
                  No packers &amp; movers jobs loaded yet. Connect live query when
                  backend is ready.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

