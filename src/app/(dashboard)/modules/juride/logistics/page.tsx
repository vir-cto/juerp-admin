// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";
// import useJuRideLogistics, {
//   CAPTAIN_BLOCK_LIMIT_PAISE,
// } from "@/hooks/useJuRideLogistics";

// function formatPaise(paise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(paise / 100);
// }

// function recommendedVehicle(kg: number) {
//   if (!kg) return "—";
//   if (kg < 10) return "Bike";
//   if (kg <= 50) return "3 Wheeler";
//   return "Truck / Container";
// }

// const STATUSES = [
//   "REQUESTED",
//   "SEARCHING_CAPTAIN",
//   "ASSIGNED",
//   "CONFIRMATION_CALL",
//   "PICKED_UP",
//   "IN_TRANSIT",
//   "ARRIVED",
//   "COMPLETED",
//   "CANCELLED",
// ];

// export default function JuRideLogisticsPage() {
//   const { shipments, captains, summary, loading, error, refresh } =
//     useJuRideLogistics();

//   const [tab, setTab] = useState<"shipments" | "captains">("shipments");
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("ALL");
//   const [service, setService] = useState("ALL");

//   const filteredShipments = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return shipments.filter((s) => {
//       const matchQ =
//         !q ||
//         s.rideId.toLowerCase().includes(q) ||
//         s.captainId.toLowerCase().includes(q) ||
//         s.userId.toLowerCase().includes(q) ||
//         s.pickupLabel.toLowerCase().includes(q) ||
//         s.dropLabel.toLowerCase().includes(q);
//       const matchSt = status === "ALL" || s.status === status;
//       const matchSv = service === "ALL" || s.serviceId === service;
//       return matchQ && matchSt && matchSv;
//     });
//   }, [shipments, search, status, service]);

//   const filteredCaptains = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     return captains.filter(
//       (c) =>
//         !q ||
//         c.name.toLowerCase().includes(q) ||
//         c.captainId.toLowerCase().includes(q) ||
//         c.vehicleNumber.toLowerCase().includes(q) ||
//         c.phone.includes(q)
//     );
//   }, [captains, search]);

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
//             JuRide Logistics
//           </h1>
//           <p className="text-sm text-slate-500">
//             Heavy shipments · 50% at pickup, 50% at destination ·{" "}
//             {summary.total} shipments, {summary.active} active
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
//         <Kpi title="Active" value={String(summary.active)} loading={loading} />
//         <Kpi
//           title="Awaiting confirmation call"
//           value={String(summary.awaitingCall)}
//           loading={loading}
//         />
//         <Kpi
//           title="Stage 2 payment due"
//           value={String(summary.stage2Due)}
//           loading={loading}
//         />
//         <Kpi
//           title="Booking value"
//           value={formatPaise(summary.bookingValuePaise)}
//           loading={loading}
//         />
//         <Kpi
//           title="Captains blocked (dues)"
//           value={String(summary.blockedCaptains)}
//           loading={loading}
//           danger={summary.blockedCaptains > 0}
//         />
//       </div>

//       <div className="mb-4 flex gap-2">
//         {(
//           [
//             ["shipments", `Shipments (${shipments.length})`],
//             ["captains", `Truck captains (${captains.length})`],
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

//       <div className="mb-4 grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-4">
//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder={
//             tab === "shipments"
//               ? "Search shipment / captain / user / place…"
//               : "Search captain / vehicle / phone…"
//           }
//           className="rounded-lg border border-slate-300 px-3 py-2 text-sm md:col-span-2"
//         />
//         {tab === "shipments" && (
//           <>
//             <select
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//               className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
//             >
//               <option value="ALL">All statuses</option>
//               {STATUSES.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={service}
//               onChange={(e) => setService(e.target.value)}
//               className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
//             >
//               <option value="ALL">All services</option>
//               <option value="JULOGISTICS">JuLogistics</option>
//               <option value="JUPARCEL">JuParcel</option>
//             </select>
//           </>
//         )}
//       </div>

//       {tab === "shipments" && (
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[1100px] text-left">
//               <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
//                 <tr>
//                   <th className="px-4 py-3">Shipment</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Pickup → Drop</th>
//                   <th className="px-4 py-3">Weight / Vehicle</th>
//                   <th className="px-4 py-3">Total</th>
//                   <th className="px-4 py-3">50 / 50</th>
//                   <th className="px-4 py-3">Call</th>
//                   <th className="px-4 py-3">Created</th>
//                   <th className="px-4 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 text-sm">
//                 {filteredShipments.map((s) => (
//                   <tr key={s.id} className="hover:bg-slate-50">
//                     <td className="px-4 py-3">
//                       <p className="font-bold text-slate-900">{s.rideId}</p>
//                       <p className="text-[10px] text-slate-400">
//                         {s.captainId || "Unassigned"}
//                       </p>
//                       <span className="mt-1 inline-block rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
//                         {s.serviceId}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-xs font-semibold">
//                       {s.status}
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-600">
//                       <p className="line-clamp-1">{s.pickupLabel}</p>
//                       <p className="line-clamp-1 text-slate-400">
//                         → {s.dropLabel}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-600">
//                       <p className="font-semibold">
//                         {s.weightKg ? `${s.weightKg} kg` : "—"}
//                       </p>
//                       <p className="text-slate-400">
//                         {s.vehicleType} · rec: {recommendedVehicle(s.weightKg)}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 font-semibold">
//                       {formatPaise(s.totalPaise)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex gap-1">
//                         <Pill ok={s.stage1Paid} label="Pickup" />
//                         <Pill ok={s.stage2Paid} label="Drop" />
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <Pill
//                         ok={s.callConfirmed}
//                         label={s.callConfirmed ? "Done" : "Pending"}
//                       />
//                     </td>
//                     <td className="px-4 py-3 text-xs text-slate-500">
//                       {s.createdAtLabel}
//                     </td>
//                     <td className="px-4 py-3">
//                       <Link
//                         href={`/modules/juride/rides/${s.id}`}
//                         className="text-xs font-bold text-blue-600"
//                       >
//                         View
//                       </Link>
//                     </td>
//                   </tr>
//                 ))}
//                 {!loading && filteredShipments.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={9}
//                       className="px-4 py-10 text-center text-sm text-slate-400"
//                     >
//                       No logistics shipments found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {tab === "captains" && (
//         <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px] text-left">
//               <thead className="bg-slate-50 text-xs font-bold uppercase text-slate-500">
//                 <tr>
//                   <th className="px-4 py-3">Captain</th>
//                   <th className="px-4 py-3">Vehicle</th>
//                   <th className="px-4 py-3">District</th>
//                   <th className="px-4 py-3">Verification</th>
//                   <th className="px-4 py-3">Online</th>
//                   <th className="px-4 py-3">Outstanding due</th>
//                   <th className="px-4 py-3">Dispatch</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100 text-sm">
//                 {filteredCaptains.map((c) => (
//                   <tr key={c.id} className="hover:bg-slate-50">
//                     <td className="px-4 py-3">
//                       <Link
//                         href={`/entity-management/captains/${c.id}`}
//                         className="font-bold text-slate-900 hover:text-blue-600"
//                       >
//                         {c.name}
//                       </Link>
//                       <p className="text-[10px] text-slate-400">
//                         {c.captainId} · {c.phone || "—"}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 text-xs">
//                       <p className="font-semibold">{c.vehicleType}</p>
//                       <p className="text-slate-400">{c.vehicleNumber}</p>
//                     </td>
//                     <td className="px-4 py-3 text-xs">{c.districtName}</td>
//                     <td className="px-4 py-3 text-xs font-semibold">
//                       {c.verificationStatus}
//                     </td>
//                     <td className="px-4 py-3">
//                       <Pill
//                         ok={c.onlineStatus === "ONLINE"}
//                         label={c.onlineStatus}
//                       />
//                     </td>
//                     <td className="px-4 py-3 font-semibold">
//                       {formatPaise(c.outstandingDuePaise)}
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`rounded-md px-2 py-1 text-[10px] font-bold ${
//                           c.blocked
//                             ? "bg-red-50 text-red-700"
//                             : "bg-green-50 text-green-700"
//                         }`}
//                       >
//                         {c.blocked ? "BLOCKED_DUE" : "AVAILABLE"}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//                 {!loading && filteredCaptains.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-10 text-center text-sm text-slate-400"
//                     >
//                       No logistics captains found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//           <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
//             Captains with dues above {formatPaise(CAPTAIN_BLOCK_LIMIT_PAISE)} are
//             blocked from new dispatches until cleared via Cashfree.
//           </p>
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

export default function JuRideLogisticsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-2xl">
              🚛
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                JuRide · Module
              </p>
              <h1 className="text-2xl font-bold text-slate-900">Logistics</h1>
              <p className="mt-1 max-w-xl text-sm text-slate-500">
                Heavy parcel &amp; logistics jobs — weight-based vehicle matching,
                captain assignment, confirmation call, and 50/50 milestone
                payments. ERP owns pricing and eligibility.
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
              href="/modules/juride/rides"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Rides
            </Link>
            <Link
              href="/modules/juride/rentals"
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Rentals
            </Link>
            <Link
              href="/modules/juride/packers-movers"
              className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-orange-600"
            >
              Packers &amp; Movers
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Active jobs", value: "—", hint: "In transit" },
          { label: "Pending assign", value: "—", hint: "Awaiting captain" },
          { label: "Delivered today", value: "—", hint: "Completed" },
          { label: "50% pending", value: "—", hint: "Second milestone" },
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

      {/* Rules */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Weight bands</h2>
          <p className="mt-1 text-xs text-slate-500">
            Matching guidance for dispatch (ERP vehicle class still authoritative).
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
              <span>&lt; 10 kg</span>
              <span className="font-semibold text-slate-800">Bike preferred</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
              <span>10 – 50 kg</span>
              <span className="font-semibold text-slate-800">3-wheeler</span>
            </li>
            <li className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
              <span>&gt; 50 kg</span>
              <span className="font-semibold text-slate-800">
                Heavy / 4W / container
              </span>
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900">Payment model</h2>
          <p className="mt-1 text-xs text-slate-500">
            JULOGISTICS two-stage billing (Cashfree / cash per ERP rules).
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="rounded-lg border border-orange-100 bg-orange-50 px-3 py-2.5 text-orange-900">
              <span className="font-semibold">50% at pickup</span>
              <span className="text-orange-800"> — before transit starts</span>
            </li>
            <li className="rounded-lg border border-orange-100 bg-orange-50 px-3 py-2.5 text-orange-900">
              <span className="font-semibold">50% on delivery</span>
              <span className="text-orange-800"> — before final sign-off</span>
            </li>
          </ul>
          <p className="mt-3 text-xs leading-5 text-slate-500">
            After assignment, captain must complete a backend-orchestrated
            confirmation call with the sender. Platform fee / commission
            deductions follow ERP settlement logic.
          </p>
        </section>
      </div>

      {/* Flow */}
      <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900">Operational flow</h2>
        <ol className="mt-3 grid list-decimal gap-2 pl-5 text-sm text-slate-600 md:grid-cols-2">
          <li>Job created from user app (JULOGISTICS / JUPARCEL heavy).</li>
          <li>District / system assigns eligible ONLINE captain.</li>
          <li>Confirmation call with sender.</li>
          <li>Collect first 50% → start transit.</li>
          <li>Arrive destination → collect second 50% → PIN / proof if required.</li>
          <li>Mark delivered → ERP ledger &amp; weekly settlement.</li>
        </ol>
      </section>

      {/* Table placeholder */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-sm font-bold text-slate-900">Recent logistics jobs</h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
            Wire to Firestore / API
          </span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Job ID</th>
                <th className="px-4 py-3 font-semibold">Route</th>
                <th className="px-4 py-3 font-semibold">Weight</th>
                <th className="px-4 py-3 font-semibold">Captain</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="px-4 py-8 text-center text-slate-400" colSpan={6}>
                  No logistics jobs loaded yet. Connect live query when backend is
                  ready.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}