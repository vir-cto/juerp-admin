// "use client";

// import type { AuthRole } from "@/hooks/useAuthScope";

// type Props = {
//   stateId: string | null;
//   districtId: string | null;
//   role: AuthRole | null;
// };

// /**
//  * Placeholder for map + bottleneck summary.
//  * Wire your existing OperationsMap / BottleneckAlert here.
//  */
// export default function DispatchPanel({ stateId, districtId, role }: Props) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">
//       <h2 className="text-lg font-semibold text-slate-900">Dispatch Map & Alerts</h2>
//       <p className="mt-1 text-xs text-slate-500">
//         Scope: {role || "—"}
//         {districtId ? ` · District ${districtId}` : ""}
//         {stateId ? ` · State ${stateId}` : ""}
//       </p>

//       <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
//         <p className="text-sm font-medium text-slate-600">
//           Drop your existing <code>OperationsMap</code> +{" "}
//           <code>BottleneckAlert</code> here
//         </p>
//         <p className="mt-2 text-xs text-slate-400">
//           Live captain markers and delayed-order alerts will show in this panel.
//         </p>
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
import BottleneckAlert from "@/components/control-room/BottleneckAlert";

type Props = {
  stateId: string | null;
  districtId: string | null;
  role: AuthRole | null;
};

type BottleneckOrder = {
  id: string;
  orderId: string;
  module: string;
  status: string;
  minutesWaiting: number;
};

export default function DispatchPanel({ stateId, districtId, role }: Props) {
  const [bottlenecks, setBottlenecks] = useState<BottleneckOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const constraints: Parameters<typeof query>[1][] = [
      where("status", "in", ["PAID", "READY", "ACCEPTED"]),
      limit(30),
    ];

    if (role === "DISTRICT_ADMIN" && districtId) {
      constraints.unshift(where("districtId", "==", districtId));
    } else if (role === "STATE_ADMIN" && stateId) {
      constraints.unshift(where("stateId", "==", stateId));
    }

    const q = query(collection(db, "orders"), ...constraints);

    const unsub = onSnapshot(
      q,
      (snap) => {
        const now = Date.now();
        const list: BottleneckOrder[] = [];

        snap.docs.forEach((d) => {
          const data = d.data();
          if (data.captainId) return; // only unassigned

          const created =
            data.createdAt?.toDate?.()?.getTime?.() ??
            data.updatedAt?.toDate?.()?.getTime?.() ??
            now;
          const minutesWaiting = Math.floor((now - created) / 60000);

          if (minutesWaiting >= 8) {
            list.push({
              id: d.id,
              orderId: data.orderId || d.id,
              module: data.module || "JUCART",
              status: data.status || "UNKNOWN",
              minutesWaiting,
            });
          }
        });

        list.sort((a, b) => b.minutesWaiting - a.minutesWaiting);
        setBottlenecks(list);
        setLoading(false);
      },
      () => setLoading(false),
    );

    return () => unsub();
  }, [role, stateId, districtId]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Live Bottlenecks
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Unassigned orders waiting ≥ 8 minutes (live)
        </p>

        {loading ? (
          <p className="mt-6 text-center text-sm text-slate-500">Loading…</p>
        ) : bottlenecks.length === 0 ? (
          <p className="mt-6 text-center text-sm text-green-600">
            No bottlenecks in your scope.
          </p>
        ) : (
          <div className="mt-4 space-y-2">
            {bottlenecks.map((b) => (
              <BottleneckAlert
                key={b.id}
                orderId={b.orderId}
                module={b.module}
                status={b.status}
                minutesWaiting={b.minutesWaiting}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}