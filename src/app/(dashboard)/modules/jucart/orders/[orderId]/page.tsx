"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useJuCartOrders, { type JuCartOrderRow } from "@/hooks/useJuCartOrders";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
} from "@/lib/firebase/firestore";

export default function JuCartOrderDetailPage() {
  const params = useParams();
  const orderId = String(params.orderId ?? "");
  const { getOrderById } = useJuCartOrders();
  const [row, setRow] = useState<JuCartOrderRow | null>(null);
  const [raw, setRaw] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const mapped = await getOrderById(orderId);
        const doc = await getDocument<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.ORDERS,
          orderId
        );
        if (!cancelled) {
          setRow(mapped);
          setRaw(doc);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Load failed");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (orderId) void run();
    return () => {
      cancelled = true;
    };
  }, [orderId, getOrderById]);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <Link
        href="/modules/jucart/orders"
        className="text-xs font-bold text-orange-600"
      >
        ← JuCart orders
      </Link>
      <h1 className="mt-2 text-2xl font-black text-slate-900">
        Order {orderId}
      </h1>

      {loading && <p className="mt-6 text-sm text-slate-500">Loading…</p>}
      {error && (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {row && (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card title="Lifecycle">
            <Row label="Status" value={row.status} />
            <Row label="Payment" value={row.paymentStatus} />
            <Row label="Service" value={row.service} />
            <Row label="Module" value={row.moduleId} />
          </Card>
          <Card title="Parties">
            <Row label="User" value={row.userId || "—"} />
            <Row label="Vendor" value={row.vendorId || "—"} />
            <Row label="Captain" value={row.captainId || "—"} />
          </Card>
          <Card title="Amounts (display only)">
            <Row
              label="Total"
              value={`₹${(row.totalPaise / 100).toFixed(2)}`}
            />
            <p className="mt-2 text-[10px] text-slate-400">
              Financial authority remains on backend snapshots.
            </p>
          </Card>
          <Card title="Timestamps">
            <Row label="Created" value={row.createdAtLabel} />
            <Row label="Updated" value={row.updatedAtLabel} />
          </Card>
        </div>
      )}

      {raw && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-bold text-slate-500">Raw document keys</p>
          <pre className="mt-2 max-h-64 overflow-auto text-[10px] text-slate-600">
            {JSON.stringify(
              Object.keys(raw).reduce(
                (acc, k) => {
                  const v = raw[k];
                  acc[k] =
                    v && typeof v === "object" && "toDate" in (v as object)
                      ? "[Timestamp]"
                      : v;
                  return acc;
                },
                {} as Record<string, unknown>
              ),
              null,
              2
            )}
          </pre>
        </div>
      )}

      {!loading && !row && !error && (
        <p className="mt-6 text-sm text-slate-500">Order not found.</p>
      )}
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-black text-slate-900">{title}</h2>
      <div className="mt-3 space-y-2">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-800 break-all">{value}</span>
    </div>
  );
}