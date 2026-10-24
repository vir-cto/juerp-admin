// "use client";

// import Link from "next/link";
// import { ModuleKpiCards } from "@/components/modules/ModuleKpiCards";
// import { ModuleOrderTable } from "@/components/modules/ModuleOrderTable";
// import { useModuleOrders } from "@/hooks/useModuleOrders";
// import { useModuleVendors } from "@/hooks/useModuleVendors";
// import { MODULE_JUSHOPPING, VENDOR_TYPE_SHOPPING } from "@/lib/constants/modules";

// export default function JuShoppingModulePage() {
//   const {
//     orders,
//     loading: ordersLoading,
//     error: ordersError,
//     refresh: refreshOrders,
//   } = useModuleOrders({ moduleId: MODULE_JUSHOPPING, max: 10 });

//   const {
//     vendors,
//     loading: vendorsLoading,
//     refresh: refreshVendors,
//   } = useModuleVendors({ vendorType: VENDOR_TYPE_SHOPPING, max: 5 });

//   const activeVendors = vendors.filter((v) => v.verificationStatus === "ACTIVE").length;
//   const openOrders = orders.filter(
//     (o) => !["DELIVERED", "CANCELLED", "REFUNDED", "SETTLED"].includes(o.status),
//   ).length;
//   const gmvPaise = orders.reduce((sum, o) => sum + (o.totalPaise || 0), 0);

//   const kpis = [
//     {
//       label: "Active Vendors",
//       value: vendorsLoading ? "…" : activeVendors,
//       colorClass: "text-orange-600",
//     },
//     {
//       label: "Open Orders",
//       value: ordersLoading ? "…" : openOrders,
//       colorClass: "text-blue-600",
//     },
//     {
//       label: "Recent GMV",
//       value: ordersLoading
//         ? "…"
//         : `₹${(gmvPaise / 100).toLocaleString("en-IN")}`,
//       colorClass: "text-green-600",
//     },
//     {
//       label: "Total Listed",
//       value: vendorsLoading ? "…" : vendors.length,
//       colorClass: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
//       {/* Header */}
//       <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">JuShopping</h1>
//           <p className="mt-1 text-sm text-slate-500">
//             Marketplace module · <code className="text-xs">MODULE_JUSHOPPING</code>
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-3">
//           <button
//             type="button"
//             onClick={() => {
//               void refreshOrders();
//               void refreshVendors();
//             }}
//             className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//           >
//             Refresh
//           </button>
//           <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-3">
//             <p className="text-xs font-medium text-orange-700">JUERP Authority</p>
//             <p className="mt-1 text-xs text-orange-600">
//               Commissions & settlements are ERP-controlled.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* KPIs */}
//       <ModuleKpiCards kpis={kpis} />

//       {/* Quick links */}
//       <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
//         <Link
//           href="/modules/jushopping/orders"
//           className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow"
//         >
//           <p className="text-sm font-semibold text-slate-900">Orders</p>
//           <p className="mt-1 text-xs text-slate-500">
//             View all marketplace orders & status
//           </p>
//         </Link>
//         <Link
//           href="/modules/jushopping/products"
//           className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow"
//         >
//           <p className="text-sm font-semibold text-slate-900">Products / Catalog</p>
//           <p className="mt-1 text-xs text-slate-500">
//             Browse vendor_catalogs for JUSHOPPING
//           </p>
//         </Link>
//         <Link
//           href="/vendors?type=SHOPPING"
//           className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow"
//         >
//           <p className="text-sm font-semibold text-slate-900">Shopping Vendors</p>
//           <p className="mt-1 text-xs text-slate-500">
//             GST-verified marketplace sellers
//           </p>
//         </Link>
//       </div>

//       {/* Recent orders */}
//       <div className="mt-8">
//         <div className="mb-4 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
//           <Link
//             href="/modules/jushopping/orders"
//             className="text-sm font-semibold text-orange-600 hover:text-orange-700"
//           >
//             View all →
//           </Link>
//         </div>
//         {ordersError && (
//           <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {ordersError}
//           </div>
//         )}
//         <ModuleOrderTable
//           orders={orders}
//           loading={ordersLoading}
//           detailBasePath="/modules/jushopping/orders"
//         />
//       </div>

//       {/* Financial rule reminder */}
//       <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
//         <h3 className="text-sm font-semibold text-slate-900">
//           MSD §7.7 – Shopping Pricing (server-side only)
//         </h3>
//         <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
// {`shoppingCustomerTotalPaise =
//   itemSubtotalPaise + platformFeePaise + juoneExtraAmountPaise
//   + taxPaise + deliveryFeePaise - discountPaise

// shoppingVendorSettlementPaise =
//   totalOrderValuePaise - vendorCommissionPaise
//   - platformFeePaise - juoneExtraAmountPaise`}
//         </pre>
//         <p className="mt-2 text-xs text-slate-500">
//           Never hard-code rates in UI. Use ERP <code>commission_rules</code> + Cloud
//           Function <code>calculateOrderFinancials</code> and persist{" "}
//           <code>financialSnapshot</code> with <code>calculationVersion</code>.
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import useDashboardStats from "@/hooks/useDashboardStats";
import useJuShoppingOrders from "@/hooks/useJuShoppingOrders";
import useJuShoppingVendors from "@/hooks/useJuShoppingVendors";

export default function JuShoppingModulePage() {
  const { stats, loading: dashLoading } = useDashboardStats();
  const { summary: orderSummary, loading: ordersLoading } =
    useJuShoppingOrders();
  const { summary: vendorSummary, loading: vendorsLoading } =
    useJuShoppingVendors();

  const moduleHealth = stats.modules.find((m) => m.moduleId === "JUSHOPPING");
  const loading = dashLoading || ordersLoading || vendorsLoading;

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-pink-600">
            Modules / JuShopping
          </p>
          <h1 className="mt-1 text-2xl font-black text-slate-900">
            JuShopping ERP
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Marketplace orders and SHOPPING vendors from Firestore.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/modules/jushopping/orders"
            className="rounded-xl bg-pink-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-pink-700"
          >
            View Orders
          </Link>
          <Link
            href="/modules/jushopping/vendors"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700"
          >
            Shopping vendors
          </Link>
        </div>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi
          title="Active shopping orders"
          value={moduleHealth?.activeOrders ?? orderSummary.active}
          loading={loading}
        />
        <Kpi title="Order rows" value={orderSummary.total} loading={loading} />
        <Kpi
          title="Shopping vendors"
          value={vendorSummary.total}
          loading={loading}
        />
        <Kpi
          title="Payment pending"
          value={orderSummary.paymentPending}
          loading={loading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/modules/jushopping/orders"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-pink-200 hover:bg-pink-50"
        >
          <p className="text-sm font-bold text-slate-900">Orders</p>
          <p className="mt-1 text-xs text-slate-500">
            module = JUSHOPPING · lifecycle · payment
          </p>
          <p className="mt-4 text-2xl font-black text-pink-600">
            {loading ? "…" : orderSummary.total}
          </p>
        </Link>
        <Link
          href="/modules/jushopping/vendors"
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-pink-200 hover:bg-pink-50"
        >
          <p className="text-sm font-bold text-slate-900">Vendors</p>
          <p className="mt-1 text-xs text-slate-500">
            vendorType / modules includes SHOPPING
          </p>
          <p className="mt-4 text-2xl font-black text-pink-600">
            {loading ? "…" : vendorSummary.total}
          </p>
        </Link>
      </div>
    </div>
  );
}

function Kpi({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <p className="mt-2 text-2xl font-black text-slate-900">
        {loading ? "…" : value}
      </p>
    </div>
  );
}