// "use client";

// import Link from "next/link";
// import useJuRideCaptains from "@/hooks/useJuRideCaptains";

// export default function JuRideCaptainsPage() {
//   const { captains, summary, loading, error, refresh } = useJuRideCaptains();

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       <Link
//         href="/modules/juride"
//         className="text-xs font-bold text-blue-600 hover:text-blue-700"
//       >
//         ← JuRide
//       </Link>

//       <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-black text-slate-900">
//             JuRide · Captains
//           </h1>
//           <p className="mt-1 text-sm text-slate-500">
//             From <code>captains</code> · open full profile for KYC.
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

//       <div className="mt-4 flex flex-wrap gap-3">
//         <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//           <p className="text-[10px] text-slate-400">Total</p>
//           <p className="text-lg font-black text-slate-900">
//             {loading ? "…" : summary.total}
//           </p>
//         </div>
//         <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//           <p className="text-[10px] text-slate-400">Online</p>
//           <p className="text-lg font-black text-slate-900">
//             {loading ? "…" : summary.online}
//           </p>
//         </div>
//         <div className="rounded-xl bg-white px-4 py-3 shadow-sm">
//           <p className="text-[10px] text-slate-400">Verified</p>
//           <p className="text-lg font-black text-slate-900">
//             {loading ? "…" : summary.verified}
//           </p>
//         </div>
//       </div>

//       {error && (
//         <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           {error}
//         </div>
//       )}

//       <div className="mt-6 space-y-3">
//         {captains.map((c) => (
//           <div
//             key={c.id}
//             className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
//           >
//             <div>
//               <p className="font-bold text-slate-900">{c.name}</p>
//               <p className="mt-1 text-xs text-slate-500">
//                 {c.captainId}
//                 {c.phone ? ` · ${c.phone}` : ""}
//               </p>
//               <p className="mt-1 text-xs text-slate-400">
//                 {c.districtName}, {c.stateName}
//               </p>
//               <div className="mt-2 flex flex-wrap gap-2">
//                 <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
//                   {c.serviceType}
//                 </span>
//                 <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
//                   {c.onlineStatus}
//                 </span>
//                 <span className="rounded-md bg-yellow-50 px-2 py-0.5 text-[10px] font-bold text-yellow-700">
//                   KYC {c.verificationStatus}
//                 </span>
//                 {c.vehicleNumber !== "—" && (
//                   <span className="rounded-md bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600">
//                     {c.vehicleType} · {c.vehicleNumber}
//                   </span>
//                 )}
//               </div>
//             </div>
//             <Link
//               href={`/entity-management/captains/${c.captainId}`}
//               className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-center text-xs font-bold text-blue-600 hover:bg-blue-50"
//             >
//               Open captain →
//             </Link>
//           </div>
//         ))}

//         {!loading && captains.length === 0 && !error && (
//           <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-500">
//             No captains found.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo } from "react";
import useJuRideCaptains from "@/hooks/useJuRideCaptains";

export default function JuRideCaptainsPage() {
  const { captains, summary, loading, error, refresh } = useJuRideCaptains();

  const kpis = useMemo(() => {
    const offline = captains.filter((c) => c.onlineStatus !== "ONLINE").length;
    const pending = captains.filter((c) =>
      ["PENDING", "SUBMITTED", "DRAFT"].includes(c.verificationStatus)
    ).length;
    const active = captains.filter((c) => c.status === "ACTIVE").length;
    return {
      total: summary.total,
      online: summary.online,
      offline,
      verified: summary.verified,
      pending,
      active,
    };
  }, [captains, summary]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      {/* Breadcrumb + header — same scale as captain detail */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <Link
            href="/modules/juride"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            ← JuRide
          </Link>
          <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Modules / JuRide / Captains
          </p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
            JuRide · Captains
          </h1>
          <p className="mt-1 max-w-xl text-sm text-slate-500">
            Ride-capable captains from Firestore. Open a profile for KYC,
            vehicle, and status controls.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* KPI tiles — same card language as detail stats row */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatTile
          label="Total"
          value={loading ? "…" : String(kpis.total)}
          hint="All captains"
        />
        <StatTile
          label="Online"
          value={loading ? "…" : String(kpis.online)}
          hint="Available now"
          accent="green"
        />
        <StatTile
          label="Offline"
          value={loading ? "…" : String(kpis.offline)}
          hint="Not on duty"
        />
        <StatTile
          label="KYC active"
          value={loading ? "…" : String(kpis.verified)}
          hint="Verified"
          accent="blue"
        />
        <StatTile
          label="KYC pending"
          value={loading ? "…" : String(kpis.pending)}
          hint="Needs review"
          accent="amber"
        />
        <StatTile
          label="Account active"
          value={loading ? "…" : String(kpis.active)}
          hint="Status ACTIVE"
        />
      </div>

      {/* List */}
      <div className="space-y-4">
        {captains.map((c) => (
          <div
            key={c.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-black text-orange-700">
                {initials(c.name)}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold text-slate-900">{c.name}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      c.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 truncate text-xs text-slate-500">
                  {c.captainId}
                  {c.phone ? ` · ${c.phone}` : ""}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {c.districtName !== "—" ? c.districtName : ""}
                  {c.districtName !== "—" && c.stateName !== "—" ? ", " : ""}
                  {c.stateName}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="blue">{c.serviceType}</Badge>
                  <Badge
                    tone={c.onlineStatus === "ONLINE" ? "green" : "slate"}
                  >
                    {c.onlineStatus}
                  </Badge>
                  <Badge
                    tone={
                      c.verificationStatus === "ACTIVE" ? "green" : "amber"
                    }
                  >
                    KYC {c.verificationStatus}
                  </Badge>
                  {c.vehicleNumber !== "—" && (
                    <Badge tone="slate">
                      {c.vehicleType} · {c.vehicleNumber}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Link
              href={`/entity-management/captains/${c.captainId}`}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
            >
              Open captain →
            </Link>
          </div>
        ))}

        {!loading && captains.length === 0 && !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-800">No captains found</p>
            <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
              Captains appear here after registration in the captain app.
            </p>
          </div>
        )}

        {loading && captains.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500 shadow-sm">
            Loading captains…
          </div>
        )}
      </div>
    </div>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "C";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
}

function StatTile({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: "green" | "blue" | "amber";
}) {
  const valueColor =
    accent === "green"
      ? "text-green-700"
      : accent === "blue"
        ? "text-blue-700"
        : accent === "amber"
          ? "text-amber-700"
          : "text-slate-900";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-[11px] font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-black tracking-tight ${valueColor}`}>
        {value}
      </p>
      <p className="mt-1 text-[10px] font-medium text-slate-400">{hint}</p>
    </div>
  );
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "blue" | "green" | "amber" | "slate";
}) {
  const map = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${map[tone]}`}
    >
      {children}
    </span>
  );
}