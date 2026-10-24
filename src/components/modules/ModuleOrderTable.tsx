"use client";

import Link from "next/link";
import { ModuleStatusBadge } from "./ModuleStatusBadge";
import type { ModuleOrderSummary } from "@/hooks/useModuleOrders";

function formatPaise(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function formatDate(d?: Date | null): string {
  if (!d) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ModuleOrderTableProps {
  orders: ModuleOrderSummary[];
  loading?: boolean;
  detailBasePath?: string; // e.g. "/modules/jushopping/orders"
}

export function ModuleOrderTable({
  orders,
  loading,
  detailBasePath = "/modules/jushopping/orders",
}: ModuleOrderTableProps) {
  if (loading && orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        Loading orders…
      </div>
    );
  }

  if (!loading && orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        No orders found for this module.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px]">
          <thead className="bg-slate-50">
            <tr>
              {["Order ID", "Customer", "Status", "Payment", "Total", "Created", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <tr key={order.orderId} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-medium text-slate-800">
                    {order.orderId.slice(0, 12)}…
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">
                  {order.userId.slice(0, 10)}…
                </td>
                <td className="px-4 py-3">
                  <ModuleStatusBadge status={order.status} />
                </td>
                <td className="px-4 py-3">
                  {order.paymentStatus ? (
                    <ModuleStatusBadge status={order.paymentStatus} />
                  ) : (
                    "—"
                  )}
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                  {formatPaise(order.totalPaise)}
                </td>
                <td className="px-4 py-3 text-xs text-slate-500">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`${detailBasePath}/${order.orderId}`}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}