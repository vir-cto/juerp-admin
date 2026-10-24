"use client";

import { useState } from "react";
import { useCatalogItems } from "@/hooks/useCatalogItems";
import { ModuleStatusBadge } from "@/components/modules/ModuleStatusBadge";
import { MODULE_JUSHOPPING } from "@/lib/constants/modules";

function formatPaise(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}

export default function JuShoppingProductsPage() {
  const [search, setSearch] = useState("");
  const { items, loading, error, refresh } = useCatalogItems({
    moduleId: MODULE_JUSHOPPING,
    max: 60,
  });

  const filtered = items.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.catalogItemId.toLowerCase().includes(q) ||
      item.vendorId.toLowerCase().includes(q) ||
      (item.categoryName ?? "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shopping Catalog</h1>
          <p className="mt-1 text-sm text-slate-500">
            Live data from <code>vendor_catalogs</code> · moduleId = JUSHOPPING
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 disabled:opacity-60"
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, SKU, vendor…"
          className="w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-slate-50">
              <tr>
                {["Product", "Vendor", "Price", "Stock", "Status", "Category"].map(
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
              {loading && filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                    Loading catalog…
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                    No catalog items found.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.catalogItemId} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-slate-900">{item.name}</p>
                      <p className="mt-0.5 font-mono text-xs text-slate-400">
                        {item.catalogItemId.slice(0, 14)}…
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {item.vendorId.slice(0, 12)}…
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900">
                      {formatPaise(item.sellingPricePaise)}
                      {item.mrpPaise != null && item.mrpPaise > item.sellingPricePaise && (
                        <span className="ml-1 text-xs font-normal text-slate-400 line-through">
                          {formatPaise(item.mrpPaise)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {item.quantity}
                      {!item.isAvailable && (
                        <span className="ml-1 text-xs text-red-500">(unavailable)</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <ModuleStatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {item.categoryName || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        ERP can view and force-disable items. Catalog ownership remains with the vendor.
        Writes that change availability must go through trusted Cloud Functions.
      </p>
    </div>
  );
}