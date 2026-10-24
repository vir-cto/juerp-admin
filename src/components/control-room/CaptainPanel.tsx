// "use client";

// import { useEffect, useState } from "react";
// import {
//   collection,
//   query,
//   where,
//   limit,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "@/lib/firebase/config";
// import type { AuthRole } from "@/hooks/useAuthScope";

// type Captain = {
//   id: string;
//   name: string;
//   vehicleType?: string;
//   onlineStatus: string;
//   availabilityStatus: string;
//   districtId?: string;
//   stateId?: string;
// };

// type Props = {
//   stateId: string | null;
//   districtId: string | null;
//   role: AuthRole | null;
// };

// export default function CaptainPanel({ stateId, districtId, role }: Props) {
//   const [captains, setCaptains] = useState<Captain[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let q = query(
//       collection(db, "captains"),
//       where("onlineStatus", "==", "ONLINE"),
//       limit(40),
//     );

//     if (role === "DISTRICT_ADMIN" && districtId) {
//       q = query(
//         collection(db, "captains"),
//         where("districtId", "==", districtId),
//         where("onlineStatus", "==", "ONLINE"),
//         limit(40),
//       );
//     } else if (role === "STATE_ADMIN" && stateId) {
//       q = query(
//         collection(db, "captains"),
//         where("stateId", "==", stateId),
//         where("onlineStatus", "==", "ONLINE"),
//         limit(40),
//       );
//     }

//     const unsub = onSnapshot(
//       q,
//       (snap) => {
//         const list: Captain[] = snap.docs.map((d) => {
//           const data = d.data();
//           return {
//             id: d.id,
//             name: data.displayName || data.name || d.id,
//             vehicleType: data.vehicleType || data.vehicle?.type,
//             onlineStatus: data.onlineStatus || "OFFLINE",
//             availabilityStatus: data.availabilityStatus || "BUSY",
//             districtId: data.districtId,
//             stateId: data.stateId,
//           };
//         });
//         setCaptains(list);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("CaptainPanel error:", err);
//         setLoading(false);
//       },
//     );

//     return () => unsub();
//   }, [role, stateId, districtId]);

//   const available = captains.filter((c) => c.availabilityStatus === "AVAILABLE");
//   const busy = captains.filter((c) => c.availabilityStatus !== "AVAILABLE");

//   return (
//     <div className="rounded-xl bg-white shadow-sm">
//       <div className="border-b border-slate-200 p-5">
//         <h2 className="text-lg font-semibold text-slate-900">Online Captains</h2>
//         <p className="mt-1 text-xs text-slate-500">
//           {available.length} available · {busy.length} busy
//         </p>
//       </div>

//       <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">
//         {loading ? (
//           <p className="p-6 text-center text-sm text-slate-500">Loading…</p>
//         ) : captains.length === 0 ? (
//           <p className="p-6 text-center text-sm text-slate-500">
//             No online captains in your scope.
//           </p>
//         ) : (
//           captains.map((c) => (
//             <div key={c.id} className="flex items-center justify-between p-4">
//               <div>
//                 <p className="text-sm font-semibold text-slate-900">{c.name}</p>
//                 <p className="text-xs text-slate-500">
//                   {c.vehicleType || "Vehicle"} · {c.id.slice(0, 8)}
//                 </p>
//               </div>
//               <span
//                 className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
//                   c.availabilityStatus === "AVAILABLE"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-amber-100 text-amber-700"
//                 }`}
//               >
//                 {c.availabilityStatus}
//               </span>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import type { AuthRole } from "@/hooks/useAuthScope";

type Captain = {
  id: string;
  name: string;
  vehicleType?: string;
  onlineStatus: string;
  availabilityStatus: string;
  districtId?: string;
  stateId?: string;
  phone?: string;
};

type Props = {
  stateId: string | null;
  districtId: string | null;
  role: AuthRole | null;
};

export default function CaptainPanel({ stateId, districtId, role }: Props) {
  const [captains, setCaptains] = useState<Captain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const constraints: Parameters<typeof query>[1][] = [
      where("onlineStatus", "==", "ONLINE"),
      limit(50),
    ];

    if (role === "DISTRICT_ADMIN" && districtId) {
      constraints.unshift(where("districtId", "==", districtId));
    } else if (role === "STATE_ADMIN" && stateId) {
      constraints.unshift(where("stateId", "==", stateId));
    }

    const q = query(collection(db, "captains"), ...constraints);

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list: Captain[] = snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name:
              (data.displayName as string) ||
              (data.fullName as string) ||
              (data.name as string) ||
              d.id,
            vehicleType:
              (data.vehicleType as string) ||
              (data.vehicle?.type as string) ||
              undefined,
            onlineStatus: (data.onlineStatus as string) || "OFFLINE",
            availabilityStatus:
              (data.availabilityStatus as string) || "BUSY",
            districtId: data.districtId as string | undefined,
            stateId: data.stateId as string | undefined,
            phone: data.phoneNumber as string | undefined,
          };
        });
        setCaptains(list);
        setLoading(false);
      },
      (err) => {
        console.error("CaptainPanel:", err);
        setError(err.message || "Failed to load captains");
        setLoading(false);
      },
    );

    return () => unsub();
  }, [role, stateId, districtId]);

  const available = captains.filter(
    (c) => c.availabilityStatus === "AVAILABLE",
  );
  const busy = captains.filter((c) => c.availabilityStatus !== "AVAILABLE");

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Online Captains</h2>
        <p className="mt-1 text-xs text-slate-500">
          {available.length} available · {busy.length} busy · live
        </p>
      </div>

      {error && (
        <div className="mx-5 mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="max-h-[520px] overflow-y-auto divide-y divide-slate-100">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-500">Loading…</p>
        ) : captains.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            No online captains in your scope.
          </p>
        ) : (
          captains.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between gap-3 p-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {c.name}
                </p>
                <p className="text-xs text-slate-500">
                  {c.vehicleType || "Vehicle"} · {c.id.slice(0, 10)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  c.availabilityStatus === "AVAILABLE"
                    ? "bg-green-100 text-green-700"
                    : c.availabilityStatus === "BLOCKED"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                }`}
              >
                {c.availabilityStatus}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}