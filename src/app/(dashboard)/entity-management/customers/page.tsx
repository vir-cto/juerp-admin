// "use client";

// import Link from "next/link";
// import { useMemo, useState } from "react";

// type CustomerStatus =
//   | "ACTIVE"
//   | "INACTIVE"
//   | "BLOCKED"
//   | "SUSPENDED";

// type PaymentStatus =
//   | "PAID"
//   | "PENDING"
//   | "FAILED"
//   | "REFUNDED";

// type OrderStatus =
//   | "CREATED"
//   | "PAYMENT_PENDING"
//   | "PAID"
//   | "ACCEPTED"
//   | "PREPARING"
//   | "READY"
//   | "ASSIGNED"
//   | "PICKED_UP"
//   | "OUT_FOR_DELIVERY"
//   | "DELIVERED"
//   | "CANCELLED"
//   | "REJECTED"
//   | "REFUND_PENDING"
//   | "REFUNDED";

// type CustomerModule =
//   | "JUCART"
//   | "JURIDE"
//   | "JUSTAY"
//   | "JUHOME"
//   | "JUSHOPPING";

// type CustomerOrder = {
//   orderId: string;
//   moduleId: CustomerModule;
//   vendorName: string;
//   status: OrderStatus;
//   paymentStatus: PaymentStatus;
//   amountPaise: number;
//   createdAt: string;
// };

// type Customer = {
//   customerId: string;
//   uid: string;

//   name: string;
//   phone: string;
//   email: string;

//   status: CustomerStatus;

//   stateId: string;
//   stateName: string;
//   districtId: string;
//   districtName: string;
//   pincode: string;
//   address: string;

//   createdAt: string;
//   updatedAt: string;
//   lastActiveAt: string;

//   totalOrders: number;
//   completedOrders: number;
//   cancelledOrders: number;
//   totalSpentPaise: number;

//   orders: CustomerOrder[];
// };

// const INITIAL_CUSTOMERS: Customer[] = [
//   {
//     customerId: "CUS-10001",
//     uid: "USR-CUS-10001",

//     name: "Anjali Reddy",
//     phone: "+91 98765 20001",
//     email: "anjali.reddy@example.com",

//     status: "ACTIVE",

//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522001",
//     address: "Lakshmipuram, Guntur, Andhra Pradesh",

//     createdAt: "10 Aug 2026",
//     updatedAt: "05 Oct 2026",
//     lastActiveAt: "Today, 8:40 PM",

//     totalOrders: 28,
//     completedOrders: 24,
//     cancelledOrders: 2,
//     totalSpentPaise: 684500,

//     orders: [
//       {
//         orderId: "ORD-20001",
//         moduleId: "JUCART",
//         vendorName: "Fresh Food Restaurant",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 85000,
//         createdAt: "05 Oct 2026",
//       },
//       {
//         orderId: "ORD-20002",
//         moduleId: "JUSHOPPING",
//         vendorName: "Smart Electronics",
//         status: "OUT_FOR_DELIVERY",
//         paymentStatus: "PAID",
//         amountPaise: 249900,
//         createdAt: "04 Oct 2026",
//       },
//       {
//         orderId: "ORD-20003",
//         moduleId: "JUCART",
//         vendorName: "Daily Mart",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 42500,
//         createdAt: "01 Oct 2026",
//       },
//       {
//         orderId: "ORD-20004",
//         moduleId: "JUSTAY",
//         vendorName: "JuStay Hotel",
//         status: "PAID",
//         paymentStatus: "PAID",
//         amountPaise: 520000,
//         createdAt: "28 Sep 2026",
//       },
//     ],
//   },

//   {
//     customerId: "CUS-10002",
//     uid: "USR-CUS-10002",

//     name: "Rahul Kumar",
//     phone: "+91 98765 20002",
//     email: "rahul.kumar@example.com",

//     status: "ACTIVE",

//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VJA",
//     districtName: "NTR",
//     pincode: "520010",
//     address: "Benz Circle, Vijayawada, Andhra Pradesh",

//     createdAt: "18 Aug 2026",
//     updatedAt: "05 Oct 2026",
//     lastActiveAt: "Today, 7:55 PM",

//     totalOrders: 16,
//     completedOrders: 14,
//     cancelledOrders: 1,
//     totalSpentPaise: 356800,

//     orders: [
//       {
//         orderId: "ORD-20005",
//         moduleId: "JUCART",
//         vendorName: "City Pharmacy",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 125000,
//         createdAt: "05 Oct 2026",
//       },
//       {
//         orderId: "ORD-20006",
//         moduleId: "JURIDE",
//         vendorName: "JuRide",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 18500,
//         createdAt: "03 Oct 2026",
//       },
//     ],
//   },

//   {
//     customerId: "CUS-10003",
//     uid: "USR-CUS-10003",

//     name: "Sneha Sharma",
//     phone: "+91 98765 20003",
//     email: "sneha.sharma@example.com",

//     status: "ACTIVE",

//     stateId: "TS",
//     stateName: "Telangana",
//     districtId: "HYD",
//     districtName: "Hyderabad",
//     pincode: "500001",
//     address: "Abids, Hyderabad, Telangana",

//     createdAt: "22 Aug 2026",
//     updatedAt: "04 Oct 2026",
//     lastActiveAt: "Yesterday, 9:20 PM",

//     totalOrders: 34,
//     completedOrders: 30,
//     cancelledOrders: 3,
//     totalSpentPaise: 925000,

//     orders: [
//       {
//         orderId: "ORD-20007",
//         moduleId: "JUSHOPPING",
//         vendorName: "Fashion Hub",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 189900,
//         createdAt: "03 Oct 2026",
//       },
//       {
//         orderId: "ORD-20008",
//         moduleId: "JUHOME",
//         vendorName: "Home Services",
//         status: "ACCEPTED",
//         paymentStatus: "PAID",
//         amountPaise: 85000,
//         createdAt: "02 Oct 2026",
//       },
//     ],
//   },

//   {
//     customerId: "CUS-10004",
//     uid: "USR-CUS-10004",

//     name: "Vikram Singh",
//     phone: "+91 98765 20004",
//     email: "vikram.singh@example.com",

//     status: "SUSPENDED",

//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "GNT",
//     districtName: "Guntur",
//     pincode: "522034",
//     address: "Mangalagiri Road, Guntur, Andhra Pradesh",

//     createdAt: "01 Sep 2026",
//     updatedAt: "03 Oct 2026",
//     lastActiveAt: "03 Oct 2026, 6:10 PM",

//     totalOrders: 9,
//     completedOrders: 6,
//     cancelledOrders: 2,
//     totalSpentPaise: 142500,

//     orders: [
//       {
//         orderId: "ORD-20009",
//         moduleId: "JURIDE",
//         vendorName: "JuRide",
//         status: "CANCELLED",
//         paymentStatus: "REFUNDED",
//         amountPaise: 22000,
//         createdAt: "03 Oct 2026",
//       },
//     ],
//   },

//   {
//     customerId: "CUS-10005",
//     uid: "USR-CUS-10005",

//     name: "Priya Nair",
//     phone: "+91 98765 20005",
//     email: "priya.nair@example.com",

//     status: "INACTIVE",

//     stateId: "KA",
//     stateName: "Karnataka",
//     districtId: "BLR",
//     districtName: "Bengaluru Urban",
//     pincode: "560001",
//     address: "MG Road, Bengaluru, Karnataka",

//     createdAt: "08 Sep 2026",
//     updatedAt: "01 Oct 2026",
//     lastActiveAt: "01 Oct 2026, 4:30 PM",

//     totalOrders: 5,
//     completedOrders: 4,
//     cancelledOrders: 0,
//     totalSpentPaise: 78500,

//     orders: [
//       {
//         orderId: "ORD-20010",
//         moduleId: "JUSHOPPING",
//         vendorName: "Lifestyle Store",
//         status: "DELIVERED",
//         paymentStatus: "PAID",
//         amountPaise: 49900,
//         createdAt: "01 Oct 2026",
//       },
//     ],
//   },

//   {
//     customerId: "CUS-10006",
//     uid: "USR-CUS-10006",

//     name: "Arjun Mehta",
//     phone: "+91 98765 20006",
//     email: "arjun.mehta@example.com",

//     status: "BLOCKED",

//     stateId: "AP",
//     stateName: "Andhra Pradesh",
//     districtId: "VJA",
//     districtName: "NTR",
//     pincode: "520015",
//     address: "Patamata, Vijayawada, Andhra Pradesh",

//     createdAt: "15 Sep 2026",
//     updatedAt: "30 Sep 2026",
//     lastActiveAt: "30 Sep 2026, 2:15 PM",

//     totalOrders: 3,
//     completedOrders: 1,
//     cancelledOrders: 2,
//     totalSpentPaise: 32000,

//     orders: [
//       {
//         orderId: "ORD-20011",
//         moduleId: "JUCART",
//         vendorName: "Daily Mart",
//         status: "CANCELLED",
//         paymentStatus: "REFUNDED",
//         amountPaise: 12500,
//         createdAt: "30 Sep 2026",
//       },
//     ],
//   },
// ];

// function formatCurrency(amountPaise: number) {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 2,
//   }).format(amountPaise / 100);
// }

// function getStatusClasses(status: CustomerStatus) {
//   switch (status) {
//     case "ACTIVE":
//       return "bg-green-100 text-green-700";

//     case "INACTIVE":
//       return "bg-slate-100 text-slate-700";

//     case "BLOCKED":
//       return "bg-red-100 text-red-700";

//     case "SUSPENDED":
//       return "bg-orange-100 text-orange-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getPaymentClasses(status: PaymentStatus) {
//   switch (status) {
//     case "PAID":
//       return "bg-green-100 text-green-700";

//     case "PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     case "FAILED":
//       return "bg-red-100 text-red-700";

//     case "REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getOrderStatusClasses(status: OrderStatus) {
//   switch (status) {
//     case "DELIVERED":
//       return "bg-green-100 text-green-700";

//     case "PAID":
//     case "ACCEPTED":
//     case "PREPARING":
//     case "READY":
//       return "bg-blue-100 text-blue-700";

//     case "OUT_FOR_DELIVERY":
//     case "ASSIGNED":
//     case "PICKED_UP":
//       return "bg-orange-100 text-orange-700";

//     case "CANCELLED":
//     case "REJECTED":
//       return "bg-red-100 text-red-700";

//     case "REFUNDED":
//       return "bg-purple-100 text-purple-700";

//     case "PAYMENT_PENDING":
//     case "REFUND_PENDING":
//       return "bg-yellow-100 text-yellow-700";

//     default:
//       return "bg-slate-100 text-slate-700";
//   }
// }

// function getModuleClasses(module: CustomerModule) {
//   switch (module) {
//     case "JUCART":
//       return "bg-orange-50 text-orange-700";

//     case "JURIDE":
//       return "bg-blue-50 text-blue-700";

//     case "JUSTAY":
//       return "bg-purple-50 text-purple-700";

//     case "JUHOME":
//       return "bg-green-50 text-green-700";

//     case "JUSHOPPING":
//       return "bg-pink-50 text-pink-700";

//     default:
//       return "bg-slate-50 text-slate-700";
//   }
// }

// export default function CustomersPage() {
//   const [customers, setCustomers] =
//     useState<Customer[]>(INITIAL_CUSTOMERS);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] = useState<
//     "ALL" | CustomerStatus
//   >("ALL");

//   const [moduleFilter, setModuleFilter] = useState<
//     "ALL" | CustomerModule
//   >("ALL");

//   const [selectedCustomer, setSelectedCustomer] =
//     useState<Customer | null>(null);

//   const [showStatusModal, setShowStatusModal] =
//     useState(false);

//   const [showDetailsModal, setShowDetailsModal] =
//     useState(false);

//   const [successMessage, setSuccessMessage] =
//     useState("");

//   const filteredCustomers = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     return customers.filter((customer) => {
//       const matchesSearch =
//         query.length === 0 ||
//         customer.customerId
//           .toLowerCase()
//           .includes(query) ||
//         customer.name
//           .toLowerCase()
//           .includes(query) ||
//         customer.phone
//           .toLowerCase()
//           .includes(query) ||
//         customer.email
//           .toLowerCase()
//           .includes(query) ||
//         customer.stateName
//           .toLowerCase()
//           .includes(query) ||
//         customer.districtName
//           .toLowerCase()
//           .includes(query) ||
//         customer.pincode
//           .toLowerCase()
//           .includes(query);

//       const matchesStatus =
//         statusFilter === "ALL" ||
//         customer.status === statusFilter;

//       const matchesModule =
//         moduleFilter === "ALL" ||
//         customer.orders.some(
//           (order) =>
//             order.moduleId === moduleFilter
//         );

//       return (
//         matchesSearch &&
//         matchesStatus &&
//         matchesModule
//       );
//     });
//   }, [
//     customers,
//     search,
//     statusFilter,
//     moduleFilter,
//   ]);

//   const totalCustomers = customers.length;

//   const activeCustomers = customers.filter(
//     (customer) =>
//       customer.status === "ACTIVE"
//   ).length;

//   const inactiveCustomers = customers.filter(
//     (customer) =>
//       customer.status === "INACTIVE"
//   ).length;

//   const blockedCustomers = customers.filter(
//     (customer) =>
//       customer.status === "BLOCKED" ||
//       customer.status === "SUSPENDED"
//   ).length;

//   const totalOrders = customers.reduce(
//     (total, customer) =>
//       total + customer.totalOrders,
//     0
//   );

//   const totalSpentPaise = customers.reduce(
//     (total, customer) =>
//       total + customer.totalSpentPaise,
//     0
//   );

//   function openDetails(customer: Customer) {
//     setSelectedCustomer(customer);
//     setShowDetailsModal(true);
//   }

//   function openStatusModal(customer: Customer) {
//     setSelectedCustomer(customer);
//     setShowStatusModal(true);
//   }

//   function updateCustomerStatus(
//     newStatus: CustomerStatus
//   ) {
//     if (!selectedCustomer) {
//       return;
//     }

//     setCustomers((current) =>
//       current.map((customer) =>
//         customer.customerId ===
//         selectedCustomer.customerId
//           ? {
//               ...customer,
//               status: newStatus,
//               updatedAt: "Just now",
//             }
//           : customer
//       )
//     );

//     setSelectedCustomer((current) =>
//       current
//         ? {
//             ...current,
//             status: newStatus,
//             updatedAt: "Just now",
//           }
//         : null
//     );

//     setShowStatusModal(false);

//     setSuccessMessage(
//       `${selectedCustomer.name} status changed to ${newStatus}.`
//     );

//     setTimeout(() => {
//       setSuccessMessage("");
//     }, 3000);
//   }

//   function clearFilters() {
//     setSearch("");
//     setStatusFilter("ALL");
//     setModuleFilter("ALL");
//   }

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">

//       {/* HEADER */}
//       <div className="mb-6">

//         <div className="mb-3 flex flex-wrap items-center gap-2">

//           <Link
//             href="/entity-management"
//             className="text-sm font-medium text-slate-500 hover:text-orange-600"
//           >
//             Entity Management
//           </Link>

//           <span className="text-slate-400">
//             /
//           </span>

//           <span className="text-sm text-slate-700">
//             Customers
//           </span>

//         </div>

//         <h1 className="text-2xl font-bold text-slate-900">
//           Customers
//         </h1>

//         <p className="mt-1 text-sm text-slate-500">
//           Manage customer accounts, activity, orders,
//           module usage and account status.
//         </p>

//       </div>

//       {/* SUCCESS MESSAGE */}
//       {successMessage && (
//         <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
//           {successMessage}
//         </div>
//       )}

//       {/* SUMMARY */}
//       <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

//         <SummaryCard
//           label="Total Customers"
//           value={String(totalCustomers)}
//         />

//         <SummaryCard
//           label="Active"
//           value={String(activeCustomers)}
//           valueClass="text-green-600"
//         />

//         <SummaryCard
//           label="Inactive"
//           value={String(inactiveCustomers)}
//           valueClass="text-slate-600"
//         />

//         <SummaryCard
//           label="Blocked / Suspended"
//           value={String(blockedCustomers)}
//           valueClass="text-red-600"
//         />

//         <SummaryCard
//           label="Total Orders"
//           value={String(totalOrders)}
//           valueClass="text-blue-600"
//         />

//         <SummaryCard
//           label="Customer Spend"
//           value={formatCurrency(totalSpentPaise)}
//         />

//       </div>

//       {/* FILTERS */}
//       <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

//           <div className="md:col-span-1">

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Search Customer
//             </label>

//             <input
//               type="text"
//               value={search}
//               onChange={(event) =>
//                 setSearch(event.target.value)
//               }
//               placeholder="Name, ID, phone, email..."
//               className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             />

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Account Status
//             </label>

//             <select
//               value={statusFilter}
//               onChange={(event) =>
//                 setStatusFilter(
//                   event.target.value as
//                     | "ALL"
//                     | CustomerStatus
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Statuses
//               </option>

//               <option value="ACTIVE">
//                 ACTIVE
//               </option>

//               <option value="INACTIVE">
//                 INACTIVE
//               </option>

//               <option value="BLOCKED">
//                 BLOCKED
//               </option>

//               <option value="SUSPENDED">
//                 SUSPENDED
//               </option>

//             </select>

//           </div>

//           <div>

//             <label className="mb-1 block text-xs font-semibold text-slate-600">
//               Module
//             </label>

//             <select
//               value={moduleFilter}
//               onChange={(event) =>
//                 setModuleFilter(
//                   event.target.value as
//                     | "ALL"
//                     | CustomerModule
//                 )
//               }
//               className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//             >

//               <option value="ALL">
//                 All Modules
//               </option>

//               <option value="JUCART">
//                 JUCART
//               </option>

//               <option value="JURIDE">
//                 JURIDE
//               </option>

//               <option value="JUSTAY">
//                 JUSTAY
//               </option>

//               <option value="JUHOME">
//                 JUHOME
//               </option>

//               <option value="JUSHOPPING">
//                 JUSHOPPING
//               </option>

//             </select>

//           </div>

//         </div>

//         <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

//           <p className="text-xs text-slate-500">
//             Showing{" "}
//             <span className="font-semibold text-slate-800">
//               {filteredCustomers.length}
//             </span>{" "}
//             of{" "}
//             <span className="font-semibold text-slate-800">
//               {customers.length}
//             </span>{" "}
//             customers
//           </p>

//           <button
//             type="button"
//             onClick={clearFilters}
//             className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//           >
//             Clear Filters
//           </button>

//         </div>

//       </div>

//       {/* DESKTOP TABLE */}
//       <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">

//         <div className="overflow-x-auto">

//           <table className="w-full min-w-[1100px]">

//             <thead className="bg-slate-50">

//               <tr>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Customer
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Contact
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Location
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Orders
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Spend
//                 </th>

//                 <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Status
//                 </th>

//                 <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
//                   Actions
//                 </th>

//               </tr>

//             </thead>

//             <tbody className="divide-y divide-slate-100">

//               {filteredCustomers.map(
//                 (customer) => (

//                   <tr
//                     key={customer.customerId}
//                     className="transition hover:bg-slate-50"
//                   >

//                     {/* CUSTOMER */}
//                     <td className="px-5 py-4">

//                       <div className="flex items-center gap-3">

//                         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
//                           {customer.name
//                             .split(" ")
//                             .map((part) =>
//                               part.charAt(0)
//                             )
//                             .join("")
//                             .slice(0, 2)
//                             .toUpperCase()}
//                         </div>

//                         <div>

//                           <p className="text-sm font-semibold text-slate-900">
//                             {customer.name}
//                           </p>

//                           <p className="mt-1 text-xs text-slate-500">
//                             {customer.customerId}
//                           </p>

//                         </div>

//                       </div>

//                     </td>

//                     {/* CONTACT */}
//                     <td className="px-5 py-4">

//                       <p className="text-sm text-slate-700">
//                         {customer.phone}
//                       </p>

//                       <p className="mt-1 max-w-[200px] truncate text-xs text-slate-400">
//                         {customer.email}
//                       </p>

//                     </td>

//                     {/* LOCATION */}
//                     <td className="px-5 py-4">

//                       <p className="text-xs font-semibold text-slate-700">
//                         {customer.districtName}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {customer.stateName}
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         {customer.pincode}
//                       </p>

//                     </td>

//                     {/* ORDERS */}
//                     <td className="px-5 py-4">

//                       <p className="text-sm font-bold text-slate-900">
//                         {customer.totalOrders}
//                       </p>

//                       <p className="mt-1 text-xs text-green-600">
//                         {customer.completedOrders} completed
//                       </p>

//                     </td>

//                     {/* SPEND */}
//                     <td className="px-5 py-4">

//                       <p className="text-sm font-semibold text-slate-900">
//                         {formatCurrency(
//                           customer.totalSpentPaise
//                         )}
//                       </p>

//                     </td>

//                     {/* STATUS */}
//                     <td className="px-5 py-4">

//                       <span
//                         className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
//                           customer.status
//                         )}`}
//                       >
//                         {customer.status}
//                       </span>

//                     </td>

//                     {/* ACTIONS */}
//                     <td className="px-5 py-4">

//                       <div className="flex justify-end gap-2">

//                         <button
//                           type="button"
//                           onClick={() =>
//                             openDetails(customer)
//                           }
//                           className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
//                         >
//                           View
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             openStatusModal(customer)
//                           }
//                           className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
//                         >
//                           Status
//                         </button>

//                       </div>

//                     </td>

//                   </tr>

//                 )
//               )}

//             </tbody>

//           </table>

//         </div>

//         {filteredCustomers.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* MOBILE CARDS */}
//       <div className="space-y-4 md:hidden">

//         {filteredCustomers.map(
//           (customer) => (

//             <div
//               key={customer.customerId}
//               className="rounded-xl bg-white p-5 shadow-sm"
//             >

//               <div className="flex items-start justify-between gap-3">

//                 <div className="flex items-center gap-3">

//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
//                     {customer.name
//                       .split(" ")
//                       .map((part) =>
//                         part.charAt(0)
//                       )
//                       .join("")
//                       .slice(0, 2)
//                       .toUpperCase()}
//                   </div>

//                   <div>

//                     <p className="text-sm font-bold text-slate-900">
//                       {customer.name}
//                     </p>

//                     <p className="mt-1 text-xs text-slate-500">
//                       {customer.customerId}
//                     </p>

//                   </div>

//                 </div>

//                 <span
//                   className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
//                     customer.status
//                   )}`}
//                 >
//                   {customer.status}
//                 </span>

//               </div>

//               <div className="mt-5 grid grid-cols-2 gap-4">

//                 <div>

//                   <p className="text-[11px] text-slate-400">
//                     Phone
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {customer.phone}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-[11px] text-slate-400">
//                     Orders
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {customer.totalOrders}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-[11px] text-slate-400">
//                     Location
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {customer.districtName}
//                   </p>

//                 </div>

//                 <div>

//                   <p className="text-[11px] text-slate-400">
//                     Total Spend
//                   </p>

//                   <p className="mt-1 text-xs font-semibold text-slate-700">
//                     {formatCurrency(
//                       customer.totalSpentPaise
//                     )}
//                   </p>

//                 </div>

//               </div>

//               <div className="mt-5 border-t border-slate-100 pt-4">

//                 <p className="mb-2 text-[11px] text-slate-400">
//                   Recent Modules
//                 </p>

//                 <div className="flex flex-wrap gap-2">

//                   {Array.from(
//                     new Set(
//                       customer.orders.map(
//                         (order) =>
//                           order.moduleId
//                       )
//                     )
//                   ).map((module) => (

//                     <span
//                       key={module}
//                       className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
//                         module
//                       )}`}
//                     >
//                       {module}
//                     </span>

//                   ))}

//                 </div>

//               </div>

//               <div className="mt-5 flex justify-end gap-2">

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openDetails(customer)
//                   }
//                   className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
//                 >
//                   View
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     openStatusModal(customer)
//                   }
//                   className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
//                 >
//                   Status
//                 </button>

//               </div>

//             </div>

//           )
//         )}

//         {filteredCustomers.length === 0 && (
//           <EmptyState />
//         )}

//       </div>

//       {/* DETAILS MODAL */}
//       {showDetailsModal &&
//         selectedCustomer && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//             <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">

//               {/* MODAL HEADER */}
//               <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">

//                 <div>

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
//                       {selectedCustomer.name
//                         .split(" ")
//                         .map((part) =>
//                           part.charAt(0)
//                         )
//                         .join("")
//                         .slice(0, 2)
//                         .toUpperCase()}
//                     </div>

//                     <div>

//                       <h2 className="text-xl font-bold text-slate-900">
//                         {selectedCustomer.name}
//                       </h2>

//                       <p className="mt-1 text-xs text-slate-500">
//                         {selectedCustomer.customerId}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowDetailsModal(false)
//                   }
//                   className="text-2xl text-slate-400 hover:text-slate-700"
//                 >
//                   ×
//                 </button>

//               </div>

//               <div className="space-y-6 p-6">

//                 {/* ACCOUNT */}
//                 <section>

//                   <h3 className="text-sm font-bold text-slate-900">
//                     Account Information
//                   </h3>

//                   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

//                     <InfoItem
//                       label="Customer ID"
//                       value={
//                         selectedCustomer.customerId
//                       }
//                     />

//                     <InfoItem
//                       label="Firebase UID"
//                       value={selectedCustomer.uid}
//                     />

//                     <InfoItem
//                       label="Name"
//                       value={selectedCustomer.name}
//                     />

//                     <InfoItem
//                       label="Phone"
//                       value={selectedCustomer.phone}
//                     />

//                     <InfoItem
//                       label="Email"
//                       value={selectedCustomer.email}
//                     />

//                     <InfoItem
//                       label="Account Status"
//                       value={selectedCustomer.status}
//                     />

//                   </div>

//                 </section>

//                 {/* LOCATION */}
//                 <section>

//                   <h3 className="text-sm font-bold text-slate-900">
//                     Location
//                   </h3>

//                   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

//                     <InfoItem
//                       label="State"
//                       value={`${selectedCustomer.stateName} (${selectedCustomer.stateId})`}
//                     />

//                     <InfoItem
//                       label="District"
//                       value={`${selectedCustomer.districtName} (${selectedCustomer.districtId})`}
//                     />

//                     <InfoItem
//                       label="Pincode"
//                       value={selectedCustomer.pincode}
//                     />

//                   </div>

//                   <div className="mt-4">

//                     <InfoItem
//                       label="Address"
//                       value={
//                         selectedCustomer.address
//                       }
//                     />

//                   </div>

//                 </section>

//                 {/* STATISTICS */}
//                 <section>

//                   <h3 className="text-sm font-bold text-slate-900">
//                     Customer Statistics
//                   </h3>

//                   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

//                     <StatBox
//                       label="Total Orders"
//                       value={String(
//                         selectedCustomer.totalOrders
//                       )}
//                     />

//                     <StatBox
//                       label="Completed Orders"
//                       value={String(
//                         selectedCustomer.completedOrders
//                       )}
//                     />

//                     <StatBox
//                       label="Cancelled Orders"
//                       value={String(
//                         selectedCustomer.cancelledOrders
//                       )}
//                     />

//                     <StatBox
//                       label="Total Spent"
//                       value={formatCurrency(
//                         selectedCustomer.totalSpentPaise
//                       )}
//                     />

//                   </div>

//                 </section>

//                 {/* ORDERS */}
//                 <section>

//                   <div className="flex items-center justify-between">

//                     <div>

//                       <h3 className="text-sm font-bold text-slate-900">
//                         Recent Orders
//                       </h3>

//                       <p className="mt-1 text-xs text-slate-500">
//                         Orders associated with this
//                         customer.
//                       </p>

//                     </div>

//                   </div>

//                   <div className="mt-4 space-y-3">

//                     {selectedCustomer.orders.map(
//                       (order) => (

//                         <div
//                           key={order.orderId}
//                           className="rounded-lg border border-slate-200 p-4"
//                         >

//                           <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

//                             <div>

//                               <div className="flex flex-wrap items-center gap-2">

//                                 <p className="text-sm font-bold text-slate-900">
//                                   {order.orderId}
//                                 </p>

//                                 <span
//                                   className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
//                                     order.moduleId
//                                   )}`}
//                                 >
//                                   {order.moduleId}
//                                 </span>

//                               </div>

//                               <p className="mt-1 text-xs text-slate-500">
//                                 {order.vendorName}
//                               </p>

//                               <p className="mt-1 text-xs text-slate-400">
//                                 {order.createdAt}
//                               </p>

//                             </div>

//                             <div className="flex flex-wrap items-center gap-2">

//                               <span
//                                 className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getOrderStatusClasses(
//                                   order.status
//                                 )}`}
//                               >
//                                 {order.status}
//                               </span>

//                               <span
//                                 className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPaymentClasses(
//                                   order.paymentStatus
//                                 )}`}
//                               >
//                                 {order.paymentStatus}
//                               </span>

//                               <span className="text-sm font-bold text-slate-900">
//                                 {formatCurrency(
//                                   order.amountPaise
//                                 )}
//                               </span>

//                             </div>

//                           </div>

//                         </div>

//                       )
//                     )}

//                   </div>

//                 </section>

//                 {/* DATES */}
//                 <section>

//                   <h3 className="text-sm font-bold text-slate-900">
//                     Account Timeline
//                   </h3>

//                   <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">

//                     <InfoItem
//                       label="Created At"
//                       value={
//                         selectedCustomer.createdAt
//                       }
//                     />

//                     <InfoItem
//                       label="Updated At"
//                       value={
//                         selectedCustomer.updatedAt
//                       }
//                     />

//                     <InfoItem
//                       label="Last Active"
//                       value={
//                         selectedCustomer.lastActiveAt
//                       }
//                     />

//                   </div>

//                 </section>

//               </div>

//               <div className="border-t border-slate-200 p-6">

//                 <div className="flex justify-end">

//                   <button
//                     type="button"
//                     onClick={() =>
//                       setShowDetailsModal(false)
//                     }
//                     className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//                   >
//                     Close
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>
//         )}

//       {/* STATUS MODAL */}
//       {showStatusModal &&
//         selectedCustomer && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

//             <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

//               <div className="flex items-start justify-between">

//                 <div>

//                   <h2 className="text-lg font-bold text-slate-900">
//                     Change Customer Status
//                   </h2>

//                   <p className="mt-1 text-xs text-slate-500">
//                     {selectedCustomer.name} ·{" "}
//                     {selectedCustomer.customerId}
//                   </p>

//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowStatusModal(false)
//                   }
//                   className="text-2xl text-slate-400 hover:text-slate-700"
//                 >
//                   ×
//                 </button>

//               </div>

//               <div className="mt-6 space-y-2">

//                 {(
//                   [
//                     "ACTIVE",
//                     "INACTIVE",
//                     "SUSPENDED",
//                     "BLOCKED",
//                   ] as CustomerStatus[]
//                 ).map((status) => (

//                   <button
//                     key={status}
//                     type="button"
//                     onClick={() =>
//                       updateCustomerStatus(
//                         status
//                       )
//                     }
//                     className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition ${
//                       selectedCustomer.status ===
//                       status
//                         ? "border-orange-300 bg-orange-50"
//                         : "border-slate-200 hover:bg-slate-50"
//                     }`}
//                   >

//                     <span className="text-sm font-semibold text-slate-800">
//                       {status}
//                     </span>

//                     {selectedCustomer.status ===
//                       status && (
//                       <span className="font-bold text-orange-600">
//                         ✓
//                       </span>
//                     )}

//                   </button>

//                 ))}

//               </div>

//               <button
//                 type="button"
//                 onClick={() =>
//                   setShowStatusModal(false)
//                 }
//                 className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>
//         )}

//       {/* GOVERNANCE NOTE */}
//       <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">

//         <h2 className="text-sm font-bold text-orange-800">
//           JUERP Governance
//         </h2>

//         <p className="mt-2 text-xs leading-6 text-orange-700">
//           Customer identity is based on the authoritative
//           user/customer records. Orders, payments, refunds
//           and financial information must come from trusted
//           backend and Firestore records. This client page must
//           not independently calculate pricing, commission,
//           settlement or refund values. The status controls
//           above are development UI actions until connected to
//           an authorized backend operation and audit trail.
//         </p>

//       </div>

//     </div>
//   );
// }

// function SummaryCard({
//   label,
//   value,
//   valueClass = "text-slate-900",
// }: {
//   label: string;
//   value: string;
//   valueClass?: string;
// }) {
//   return (
//     <div className="rounded-xl bg-white p-5 shadow-sm">

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p
//         className={`mt-2 text-xl font-bold ${valueClass}`}
//       >
//         {value}
//       </p>

//     </div>
//   );
// }

// function InfoItem({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div>

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-1 break-words text-sm font-semibold text-slate-800">
//         {value}
//       </p>

//     </div>
//   );
// }

// function StatBox({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">

//       <p className="text-xs font-medium text-slate-500">
//         {label}
//       </p>

//       <p className="mt-2 text-xl font-bold text-slate-900">
//         {value}
//       </p>

//     </div>
//   );
// }

// function EmptyState() {
//   return (
//     <div className="p-12 text-center">

//       <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl">
//         🔍
//       </div>

//       <p className="mt-4 text-sm font-bold text-slate-700">
//         No customers found
//       </p>

//       <p className="mt-1 text-xs text-slate-500">
//         Try changing your search or filters.
//       </p>

//     </div>
//   );
// }

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import useCustomers, {
  type Customer,
  type CustomerModule,
  type CustomerStatus,
  type OrderStatus,
  type PaymentStatus,
} from "@/hooks/useCustomers";

function formatCurrency(amountPaise: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountPaise / 100);
}

function getStatusClasses(status: CustomerStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "INACTIVE":
      return "bg-slate-100 text-slate-700";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    case "SUSPENDED":
      return "bg-orange-100 text-orange-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getPaymentClasses(status: PaymentStatus) {
  switch (String(status).toUpperCase()) {
    case "PAID":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "REFUNDED":
      return "bg-purple-100 text-purple-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getOrderStatusClasses(status: OrderStatus) {
  const s = String(status).toUpperCase();
  if (s === "DELIVERED" || s === "SETTLED") return "bg-green-100 text-green-700";
  if (["PAID", "ACCEPTED", "PREPARING", "READY"].includes(s))
    return "bg-blue-100 text-blue-700";
  if (["OUT_FOR_DELIVERY", "ASSIGNED", "PICKED_UP"].includes(s))
    return "bg-orange-100 text-orange-700";
  if (["CANCELLED", "REJECTED"].includes(s)) return "bg-red-100 text-red-700";
  if (s === "REFUNDED") return "bg-purple-100 text-purple-700";
  if (["PAYMENT_PENDING", "REFUND_PENDING"].includes(s))
    return "bg-yellow-100 text-yellow-700";
  return "bg-slate-100 text-slate-700";
}

function getModuleClasses(module: CustomerModule) {
  switch (String(module).toUpperCase()) {
    case "JUCART":
      return "bg-orange-50 text-orange-700";
    case "JURIDE":
      return "bg-blue-50 text-blue-700";
    case "JUSTAY":
      return "bg-purple-50 text-purple-700";
    case "JUHOME":
      return "bg-green-50 text-green-700";
    case "JUSHOPPING":
      return "bg-pink-50 text-pink-700";
    default:
      return "bg-slate-50 text-slate-700";
  }
}

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CustomersPage() {
  const { customers, loading, error, demoMode, refresh } = useCustomers();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | CustomerStatus>("ALL");
  const [moduleFilter, setModuleFilter] = useState<"ALL" | CustomerModule>("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesSearch =
        query.length === 0 ||
        customer.customerId.toLowerCase().includes(query) ||
        customer.name.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.stateName.toLowerCase().includes(query) ||
        customer.districtName.toLowerCase().includes(query) ||
        customer.pincode.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || customer.status === statusFilter;

      const matchesModule =
        moduleFilter === "ALL" ||
        customer.orders.some(
          (order) => String(order.moduleId).toUpperCase() === String(moduleFilter)
        );

      return matchesSearch && matchesStatus && matchesModule;
    });
  }, [customers, search, statusFilter, moduleFilter]);

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter((c) => c.status === "ACTIVE").length;
  const inactiveCustomers = customers.filter((c) => c.status === "INACTIVE").length;
  const blockedCustomers = customers.filter(
    (c) => c.status === "BLOCKED" || c.status === "SUSPENDED"
  ).length;
  const totalOrders = customers.reduce((t, c) => t + c.totalOrders, 0);
  const totalSpentPaise = customers.reduce((t, c) => t + c.totalSpentPaise, 0);

  function openDetails(customer: Customer) {
    setSelectedCustomer(customer);
    setShowDetailsModal(true);
  }

  function openStatusModal(customer: Customer) {
    setSelectedCustomer(customer);
    setShowStatusModal(true);
  }

  function updateCustomerStatus(newStatus: CustomerStatus) {
    if (!selectedCustomer) return;

    // UI-only label until backend Cloud Function exists
    setSelectedCustomer({
      ...selectedCustomer,
      status: newStatus,
      updatedAt: "Just now (local UI)",
    });
    setShowStatusModal(false);
    setSuccessMessage(
      `${selectedCustomer.name}: local UI status set to ${newStatus}. Persist via authorized backend.`
    );
    setTimeout(() => setSuccessMessage(""), 4000);
  }

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setModuleFilter("ALL");
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Link
            href="/entity-management"
            className="text-sm font-medium text-slate-500 hover:text-orange-600"
          >
            Entity Management
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-sm text-slate-700">Customers</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
            <p className="mt-1 text-sm text-slate-500">
              Live accounts from Firestore <code>users</code> + related{" "}
              <code>orders</code>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void refresh()}
            disabled={loading}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* {demoMode && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Demo mode — set <code>NEXT_PUBLIC_DEMO_MODE=false</code> for live data.
        </div>
      )} */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <SummaryCard label="Total Customers" value={loading ? "…" : String(totalCustomers)} />
        <SummaryCard
          label="Active"
          value={loading ? "…" : String(activeCustomers)}
          valueClass="text-green-600"
        />
        <SummaryCard
          label="Inactive"
          value={loading ? "…" : String(inactiveCustomers)}
          valueClass="text-slate-600"
        />
        <SummaryCard
          label="Blocked / Suspended"
          value={loading ? "…" : String(blockedCustomers)}
          valueClass="text-red-600"
        />
        <SummaryCard
          label="Total Orders"
          value={loading ? "…" : String(totalOrders)}
          valueClass="text-blue-600"
        />
        <SummaryCard
          label="Customer Spend"
          value={loading ? "…" : formatCurrency(totalSpentPaise)}
        />
      </div>

      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Search Customer
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, ID, phone, email…"
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Account Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "ALL" | CustomerStatus)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="BLOCKED">BLOCKED</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">
              Module
            </label>
            <select
              value={moduleFilter}
              onChange={(e) =>
                setModuleFilter(e.target.value as "ALL" | CustomerModule)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-orange-500"
            >
              <option value="ALL">All Modules</option>
              <option value="JUCART">JUCART</option>
              <option value="JURIDE">JURIDE</option>
              <option value="JUSTAY">JUSTAY</option>
              <option value="JUHOME">JUHOME</option>
              <option value="JUSHOPPING">JUSHOPPING</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {filteredCustomers.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-800">{customers.length}</span>{" "}
            customers
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-xl bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Customer
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Contact
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Location
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Orders
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Spend
                </th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                  Status
                </th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-500">
                    Loading customers…
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.customerId} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                          {initials(customer.name)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {customer.customerId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-700">{customer.phone}</p>
                      <p className="mt-1 max-w-[200px] truncate text-xs text-slate-400">
                        {customer.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs font-semibold text-slate-700">
                        {customer.districtName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{customer.stateName}</p>
                      <p className="mt-1 text-xs text-slate-400">{customer.pincode}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-900">
                        {customer.totalOrders}
                      </p>
                      <p className="mt-1 text-xs text-green-600">
                        {customer.completedOrders} completed
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(customer.totalSpentPaise)}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/entity-management/customers/${customer.customerId}`}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Open
                        </Link>
                        <button
                          type="button"
                          onClick={() => openDetails(customer)}
                          className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => openStatusModal(customer)}
                          className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white hover:bg-orange-600"
                        >
                          Status
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && filteredCustomers.length === 0 && <EmptyState />}
      </div>

      <div className="space-y-4 md:hidden">
        {filteredCustomers.map((customer) => (
          <div key={customer.customerId} className="rounded-xl bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
                  {initials(customer.name)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{customer.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{customer.customerId}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
                  customer.status
                )}`}
              >
                {customer.status}
              </span>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Link
                href={`/entity-management/customers/${customer.customerId}`}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                Open
              </Link>
              <button
                type="button"
                onClick={() => openDetails(customer)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => openStatusModal(customer)}
                className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-semibold text-white"
              >
                Status
              </button>
            </div>
          </div>
        ))}
        {!loading && filteredCustomers.length === 0 && <EmptyState />}
      </div>

      {showDetailsModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white p-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCustomer.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedCustomer.customerId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="text-2xl text-slate-400 hover:text-slate-700"
              >
                ×
              </button>
            </div>
            <div className="space-y-6 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Phone" value={selectedCustomer.phone} />
                <InfoItem label="Email" value={selectedCustomer.email} />
                <InfoItem label="Status" value={selectedCustomer.status} />
                <InfoItem label="State" value={selectedCustomer.stateName} />
                <InfoItem label="District" value={selectedCustomer.districtName} />
                <InfoItem label="Pincode" value={selectedCustomer.pincode} />
              </div>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatBox label="Total Orders" value={String(selectedCustomer.totalOrders)} />
                <StatBox
                  label="Completed"
                  value={String(selectedCustomer.completedOrders)}
                />
                <StatBox
                  label="Cancelled"
                  value={String(selectedCustomer.cancelledOrders)}
                />
                <StatBox
                  label="Spent"
                  value={formatCurrency(selectedCustomer.totalSpentPaise)}
                />
              </div>
              <div className="space-y-3">
                {selectedCustomer.orders.length === 0 ? (
                  <p className="text-sm text-slate-500">No orders linked.</p>
                ) : (
                  selectedCustomer.orders.map((order) => (
                    <div
                      key={order.orderId}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold">{order.orderId}</p>
                          <p className="text-xs text-slate-500">{order.vendorName}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`rounded-md px-2 py-1 text-[11px] font-semibold ${getModuleClasses(
                              order.moduleId
                            )}`}
                          >
                            {order.moduleId}
                          </span>
                          <span
                            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${getOrderStatusClasses(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                          <span
                            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${getPaymentClasses(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                          <span className="text-sm font-bold">
                            {formatCurrency(order.amountPaise)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="border-t border-slate-200 p-6 text-right">
              <button
                type="button"
                onClick={() => setShowDetailsModal(false)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatusModal && selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">Change Customer Status</h2>
            <p className="mt-1 text-xs text-slate-500">
              UI-only until authorized backend write exists.
            </p>
            <div className="mt-6 space-y-2">
              {(["ACTIVE", "INACTIVE", "SUSPENDED", "BLOCKED"] as CustomerStatus[]).map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateCustomerStatus(status)}
                    className={`flex w-full items-center justify-between rounded-lg border p-4 text-left ${
                      selectedCustomer.status === status
                        ? "border-orange-300 bg-orange-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-sm font-semibold">{status}</span>
                    {selectedCustomer.status === status && (
                      <span className="font-bold text-orange-600">✓</span>
                    )}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowStatusModal(false)}
              className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 rounded-xl border border-orange-200 bg-orange-50 p-6">
        <h2 className="text-sm font-bold text-orange-800">JUERP Governance</h2>
        <p className="mt-2 text-xs leading-6 text-orange-700">
          Customer rows come from Firestore <code>users</code>. Order stats are joined
          from <code>orders</code>. Status buttons do not write to Firestore until a
          trusted Cloud Function + audit trail is wired.
        </p>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-2 text-xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="p-12 text-center">
      <p className="text-sm font-bold text-slate-700">No customers found</p>
      <p className="mt-1 text-xs text-slate-500">
        Empty <code>users</code> collection, filters too narrow, or no CUSTOMER role docs.
      </p>
    </div>
  );
}