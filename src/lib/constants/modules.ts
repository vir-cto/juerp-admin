// /** Canonical module IDs from JUONE MSD §3.2 — do not rename */

// export const MODULE_JUCART = "JUCART" as const;
// export const MODULE_JURIDE = "JURIDE" as const;
// export const MODULE_JUSTAY = "JUSTAY" as const;
// export const MODULE_JUHOME = "JUHOME" as const;
// export const MODULE_JUSHOPPING = "JUSHOPPING" as const;
// export const MODULE_JUONLINE = "JUONLINE" as const;
// export const JUSHOPPING_SHOPPING = "SHOPPING" as const;

// export type CustomerModuleId =
//   | typeof MODULE_JUCART
//   | typeof MODULE_JURIDE
//   | typeof MODULE_JUSTAY
//   | typeof MODULE_JUHOME
//   | typeof MODULE_JUSHOPPING
//   | typeof MODULE_JUONLINE;

// export type JuShoppingServiceId = typeof JUSHOPPING_SHOPPING;

// export const JUCART_FOOD = "FOOD" as const;
// export const JUCART_MART = "MART" as const;
// export const JUCART_PHARMACY = "PHARMACY" as const;

// export type JuCartServiceId =
//   | typeof JUCART_FOOD
//   | typeof JUCART_MART
//   | typeof JUCART_PHARMACY;

// export const JUCART_SERVICES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ];

// export const JUCART_SERVICE_LABELS: Record<JuCartServiceId, string> = {
//   FOOD: "Food",
//   MART: "Mart",
//   PHARMACY: "Pharmacy",
// };

// /** Vendor module types used on vendors collection for JuCart */
// export const JUCART_VENDOR_TYPES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ];

// export const JUSTAY_HOTELS = "HOTELS" as const;
// export const JUSTAY_HOSTEL_PG = "HOSTEL_PG" as const;
// export const JUSTAY_HALLS = "HALLS" as const;
// export const JUSTAY_TOURISM = "TOURISM" as const;

// export type JuStayServiceId =
//   | typeof JUSTAY_HOTELS
//   | typeof JUSTAY_HOSTEL_PG
//   | typeof JUSTAY_HALLS
//   | typeof JUSTAY_TOURISM;

// export const JUSTAY_SERVICES: readonly JuStayServiceId[] = [
//   JUSTAY_HOTELS,
//   JUSTAY_HOSTEL_PG,
//   JUSTAY_HALLS,
//   JUSTAY_TOURISM,
// ];

// export const JUSTAY_SERVICE_LABELS: Record<JuStayServiceId, string> = {
//   HOTELS: "Hotels",
//   HOSTEL_PG: "Hostel / PG",
//   HALLS: "Function halls",
//   TOURISM: "Tourism",
// };

// /** Vendor tags for Stay */
// export const JUSTAY_VENDOR_TYPES = ["STAY", "HOTELS", "HOSTEL_PG", "HALLS", "TOURISM"] as const;

// // export const MODULE_JUHOME = "JUHOME" as const; // if not already

// export const JUHOME_VENDOR_TYPES = ["HOME_SERVICES", "JUHOME"] as const;

// /** Optional service labels for home bookings (extend as needed) */
// export type JuHomeServiceId = string;

// export const JUHOME_SERVICE_HINTS = [
//   "PLUMBING",
//   "ELECTRICAL",
//   "CLEANING",
//   "AC_REPAIR",
//   "PAINTING",
//   "CARPENTRY",
//   "APPLIANCE",
//   "OTHER",
// ] as const;







/**
 * Canonical module IDs & service constants from JUONE MSD §3.2 / §1.2
 * NEVER rename shared constants. Teams must import from this file.
 * MSD_VERSION = "1.0.0"
 */








/* -------------------------------------------------------------------------- */
/* Customer Module IDs                                                        */
/* -------------------------------------------------------------------------- */

// export const MODULE_JUCART = "JUCART" as const;
// export const MODULE_JURIDE = "JURIDE" as const;
// export const MODULE_JUSTAY = "JUSTAY" as const;
// export const MODULE_JUHOME = "JUHOME" as const;
// export const MODULE_JUSHOPPING = "JUSHOPPING" as const;
// export const MODULE_JUONLINE = "JUONLINE" as const;

// export type CustomerModuleId =
//   | typeof MODULE_JUCART
//   | typeof MODULE_JURIDE
//   | typeof MODULE_JUSTAY
//   | typeof MODULE_JUHOME
//   | typeof MODULE_JUSHOPPING
//   | typeof MODULE_JUONLINE;

// export const CUSTOMER_MODULES: readonly CustomerModuleId[] = [
//   MODULE_JUCART,
//   MODULE_JURIDE,
//   MODULE_JUSTAY,
//   MODULE_JUHOME,
//   MODULE_JUSHOPPING,
//   MODULE_JUONLINE,
// ] as const;

// export const MODULE_LABELS: Record<CustomerModuleId, string> = {
//   JUCART: "JuCart",
//   JURIDE: "JuRide",
//   JUSTAY: "JuStay",
//   JUHOME: "JuHome",
//   JUSHOPPING: "JuShopping",
//   JUONLINE: "JuOnline",
// };

// /* -------------------------------------------------------------------------- */
// /* JuCart sub-services (FOOD / MART / PHARMACY)                               */
// /* -------------------------------------------------------------------------- */

// export const JUCART_FOOD = "FOOD" as const;
// export const JUCART_MART = "MART" as const;
// export const JUCART_PHARMACY = "PHARMACY" as const;

// export type JuCartServiceId =
//   | typeof JUCART_FOOD
//   | typeof JUCART_MART
//   | typeof JUCART_PHARMACY;

// export const JUCART_SERVICES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ] as const;

// export const JUCART_SERVICE_LABELS: Record<JuCartServiceId, string> = {
//   FOOD: "Food",
//   MART: "Mart",
//   PHARMACY: "Pharmacy",
// };

// /** Vendor types that belong under JuCart */
// export const JUCART_VENDOR_TYPES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* JuRide service IDs                                                         */
// /* -------------------------------------------------------------------------- */

// export const JURIDE_RIDE = "RIDE" as const;
// export const JURIDE_RENTALS = "RENTALS" as const;
// export const JURIDE_LOGISTICS = "LOGISTICS" as const;
// export const JURIDE_PACKERS_MOVERS = "PACKERS_MOVERS" as const;

// export type JuRideServiceId =
//   | typeof JURIDE_RIDE
//   | typeof JURIDE_RENTALS
//   | typeof JURIDE_LOGISTICS
//   | typeof JURIDE_PACKERS_MOVERS;

// export const JURIDE_SERVICES: readonly JuRideServiceId[] = [
//   JURIDE_RIDE,
//   JURIDE_RENTALS,
//   JURIDE_LOGISTICS,
//   JURIDE_PACKERS_MOVERS,
// ] as const;

// export const JURIDE_SERVICE_LABELS: Record<JuRideServiceId, string> = {
//   RIDE: "Ride",
//   RENTALS: "Rentals",
//   LOGISTICS: "Logistics",
//   PACKERS_MOVERS: "Packers & Movers",
// };

// /* -------------------------------------------------------------------------- */
// /* JuStay sub-modules (MSD exact names)                                       */
// /* -------------------------------------------------------------------------- */

// export const JUSTAY_HOTEL = "HOTEL" as const;
// export const JUSTAY_HOSTEL_PG = "HOSTEL_PG" as const;
// export const JUSTAY_MEETING_EVENT_HALL = "MEETING_EVENT_HALL" as const;
// export const JUSTAY_TOURISM = "TOURISM" as const;

// export type JuStayServiceId =
//   | typeof JUSTAY_HOTEL
//   | typeof JUSTAY_HOSTEL_PG
//   | typeof JUSTAY_MEETING_EVENT_HALL
//   | typeof JUSTAY_TOURISM;

// export const JUSTAY_SERVICES: readonly JuStayServiceId[] = [
//   JUSTAY_HOTEL,
//   JUSTAY_HOSTEL_PG,
//   JUSTAY_MEETING_EVENT_HALL,
//   JUSTAY_TOURISM,
// ] as const;

// export const JUSTAY_SERVICE_LABELS: Record<JuStayServiceId, string> = {
//   HOTEL: "Hotels",
//   HOSTEL_PG: "Hostel / PG",
//   MEETING_EVENT_HALL: "Meeting / Event Halls",
//   TOURISM: "Tourism",
// };

// /** Vendor types that belong under JuStay */
// export const JUSTAY_VENDOR_TYPES = [
//   "STAY",
//   JUSTAY_HOTEL,
//   JUSTAY_HOSTEL_PG,
//   JUSTAY_MEETING_EVENT_HALL,
//   JUSTAY_TOURISM,
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* JuHome                                                                     */
// /* -------------------------------------------------------------------------- */

// export const JUHOME_SERVICE = "HOME_SERVICE" as const;

// export type JuHomeServiceId = typeof JUHOME_SERVICE | string; // extendable

// export const JUHOME_VENDOR_TYPES = ["HOME_SERVICES", "JUHOME"] as const;

// /** Common service category hints (not hard contract – UI only) */
// export const JUHOME_SERVICE_HINTS = [
//   "PLUMBING",
//   "ELECTRICAL",
//   "CLEANING",
//   "AC_REPAIR",
//   "PAINTING",
//   "CARPENTRY",
//   "APPLIANCE",
//   "OTHER",
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* JuShopping                                                                 */
// /* -------------------------------------------------------------------------- */

// export const JUSHOPPING_MARKETPLACE = "MARKETPLACE" as const;

// export type JuShoppingServiceId = typeof JUSHOPPING_MARKETPLACE;

// export const JUSHOPPING_SERVICES: readonly JuShoppingServiceId[] = [
//   JUSHOPPING_MARKETPLACE,
// ] as const;

// export const JUSHOPPING_SERVICE_LABELS: Record<JuShoppingServiceId, string> = {
//   MARKETPLACE: "Marketplace",
// };

// /** Vendor type for marketplace sellers (MSD §1.2) */
// export const VENDOR_TYPE_SHOPPING = "SHOPPING" as const;

// export const JUSHOPPING_VENDOR_TYPES = [VENDOR_TYPE_SHOPPING] as const;

// /* -------------------------------------------------------------------------- */
// /* JuOnline (future – Coming Soon only)                                       */
// /* -------------------------------------------------------------------------- */

// export const JUONLINE_FUTURE = "FUTURE" as const;

// /* -------------------------------------------------------------------------- */
// /* Vendor Module IDs (canonical from MSD §1.2)                                */
// /* -------------------------------------------------------------------------- */

// export const VENDOR_TYPE_FOOD = "FOOD" as const;
// export const VENDOR_TYPE_MART = "MART" as const;
// export const VENDOR_TYPE_PHARMACY = "PHARMACY" as const;
// export const VENDOR_TYPE_STAY = "STAY" as const;
// export const VENDOR_TYPE_HOME_SERVICES = "HOME_SERVICES" as const;
// // VENDOR_TYPE_SHOPPING already defined above

// export type VendorModuleId =
//   | typeof VENDOR_TYPE_FOOD
//   | typeof VENDOR_TYPE_MART
//   | typeof VENDOR_TYPE_PHARMACY
//   | typeof VENDOR_TYPE_SHOPPING
//   | typeof VENDOR_TYPE_STAY
//   | typeof VENDOR_TYPE_HOME_SERVICES;

// export const VENDOR_MODULE_IDS: readonly VendorModuleId[] = [
//   VENDOR_TYPE_FOOD,
//   VENDOR_TYPE_MART,
//   VENDOR_TYPE_PHARMACY,
//   VENDOR_TYPE_SHOPPING,
//   VENDOR_TYPE_STAY,
//   VENDOR_TYPE_HOME_SERVICES,
// ] as const;

// export const VENDOR_MODULE_LABELS: Record<VendorModuleId, string> = {
//   FOOD: "Food / Restaurant",
//   MART: "Mart / Grocery",
//   PHARMACY: "Pharmacy",
//   SHOPPING: "Shopping Seller",
//   STAY: "Hotel / Hostel / Event / Tourism",
//   HOME_SERVICES: "Home Service Provider",
// };

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// export function getModuleLabel(moduleId: CustomerModuleId | string): string {
//   if (moduleId in MODULE_LABELS) {
//     return MODULE_LABELS[moduleId as CustomerModuleId];
//   }
//   return moduleId;
// }

// export function getVendorModuleLabel(vendorType: VendorModuleId | string): string {
//   if (vendorType in VENDOR_MODULE_LABELS) {
//     return VENDOR_MODULE_LABELS[vendorType as VendorModuleId];
//   }
//   return vendorType;
// }

// export function isShoppingModule(moduleId: string): boolean {
//   return moduleId === MODULE_JUSHOPPING;
// }

// export function isJuCartModule(moduleId: string): boolean {
//   return moduleId === MODULE_JUCART;
// }

// export function isJuStayModule(moduleId: string): boolean {
//   return moduleId === MODULE_JUSTAY;
// }

// export function isJuHomeModule(moduleId: string): boolean {
//   return moduleId === MODULE_JUHOME;
// }

// export function isJuRideModule(moduleId: string): boolean {
//   return moduleId === MODULE_JURIDE;
// }

// export function isCustomerModuleId(value: unknown): value is CustomerModuleId {
//   return (
//     typeof value === "string" &&
//     (CUSTOMER_MODULES as readonly string[]).includes(value)
//   );
// }

// export function isVendorModuleId(value: unknown): value is VendorModuleId {
//   return (
//     typeof value === "string" &&
//     (VENDOR_MODULE_IDS as readonly string[]).includes(value)
//   );
// }

// /** Map customer module → typical vendor types that serve it */
// export function getVendorTypesForModule(
//   moduleId: CustomerModuleId,
// ): readonly string[] {
//   switch (moduleId) {
//     case MODULE_JUCART:
//       return JUCART_VENDOR_TYPES;
//     case MODULE_JUSHOPPING:
//       return JUSHOPPING_VENDOR_TYPES;
//     case MODULE_JUSTAY:
//       return JUSTAY_VENDOR_TYPES;
//     case MODULE_JUHOME:
//       return JUHOME_VENDOR_TYPES;
//     case MODULE_JURIDE:
//       return []; // captains, not vendors
//     case MODULE_JUONLINE:
//       return [];
//     default:
//       return [];
//   }
// }

// /* -------------------------------------------------------------------------- */
// /* Default export (optional convenience)                                      */
// /* -------------------------------------------------------------------------- */

// const modules = {
//   // Customer
//   MODULE_JUCART,
//   MODULE_JURIDE,
//   MODULE_JUSTAY,
//   MODULE_JUHOME,
//   MODULE_JUSHOPPING,
//   MODULE_JUONLINE,
//   CUSTOMER_MODULES,
//   MODULE_LABELS,

//   // JuCart
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
//   JUCART_SERVICES,
//   JUCART_SERVICE_LABELS,
//   JUCART_VENDOR_TYPES,

//   // JuRide
//   JURIDE_RIDE,
//   JURIDE_RENTALS,
//   JURIDE_LOGISTICS,
//   JURIDE_PACKERS_MOVERS,
//   JURIDE_SERVICES,
//   JURIDE_SERVICE_LABELS,

//   // JuStay
//   JUSTAY_HOTEL,
//   JUSTAY_HOSTEL_PG,
//   JUSTAY_MEETING_EVENT_HALL,
//   JUSTAY_TOURISM,
//   JUSTAY_SERVICES,
//   JUSTAY_SERVICE_LABELS,
//   JUSTAY_VENDOR_TYPES,

//   // JuHome
//   JUHOME_SERVICE,
//   JUHOME_VENDOR_TYPES,
//   JUHOME_SERVICE_HINTS,

//   // JuShopping
//   JUSHOPPING_MARKETPLACE,
//   JUSHOPPING_SERVICES,
//   JUSHOPPING_SERVICE_LABELS,
//   VENDOR_TYPE_SHOPPING,
//   JUSHOPPING_VENDOR_TYPES,

//   // JuOnline
//   JUONLINE_FUTURE,

//   // Vendor
//   VENDOR_TYPE_FOOD,
//   VENDOR_TYPE_MART,
//   VENDOR_TYPE_PHARMACY,
//   VENDOR_TYPE_STAY,
//   VENDOR_TYPE_HOME_SERVICES,
//   VENDOR_MODULE_IDS,
//   VENDOR_MODULE_LABELS,

//   // Helpers
//   getModuleLabel,
//   getVendorModuleLabel,
//   isShoppingModule,
//   isJuCartModule,
//   isJuStayModule,
//   isJuHomeModule,
//   isJuRideModule,
//   isCustomerModuleId,
//   isVendorModuleId,
//   getVendorTypesForModule,
// };

// export default modules;

/** Canonical module IDs from JUONE MSD §3.2 — do not rename */

// export const MODULE_JUCART = "JUCART" as const;
// export const MODULE_JURIDE = "JURIDE" as const;
// export const MODULE_JUSTAY = "JUSTAY" as const;
// export const MODULE_JUHOME = "JUHOME" as const;
// export const MODULE_JUSHOPPING = "JUSHOPPING" as const;
// export const MODULE_JUONLINE = "JUONLINE" as const;

// export type CustomerModuleId =
//   | typeof MODULE_JUCART
//   | typeof MODULE_JURIDE
//   | typeof MODULE_JUSTAY
//   | typeof MODULE_JUHOME
//   | typeof MODULE_JUSHOPPING
//   | typeof MODULE_JUONLINE;

// /* -------------------------------------------------------------------------- */
// /* JuCart                                                                     */
// /* -------------------------------------------------------------------------- */

// export const JUCART_FOOD = "FOOD" as const;
// export const JUCART_MART = "MART" as const;
// export const JUCART_PHARMACY = "PHARMACY" as const;

// export type JuCartServiceId =
//   | typeof JUCART_FOOD
//   | typeof JUCART_MART
//   | typeof JUCART_PHARMACY;

// export const JUCART_SERVICES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ];

// export const JUCART_SERVICE_LABELS: Record<JuCartServiceId, string> = {
//   FOOD: "Food",
//   MART: "Mart",
//   PHARMACY: "Pharmacy",
// };

// /** Vendor module types used on vendors collection for JuCart */
// export const JUCART_VENDOR_TYPES: readonly JuCartServiceId[] = [
//   JUCART_FOOD,
//   JUCART_MART,
//   JUCART_PHARMACY,
// ];

// /* -------------------------------------------------------------------------- */
// /* JuStay                                                                     */
// /* -------------------------------------------------------------------------- */

// export const JUSTAY_HOTELS = "HOTELS" as const;
// export const JUSTAY_HOSTEL_PG = "HOSTEL_PG" as const;
// export const JUSTAY_HALLS = "HALLS" as const;
// export const JUSTAY_TOURISM = "TOURISM" as const;

// export type JuStayServiceId =
//   | typeof JUSTAY_HOTELS
//   | typeof JUSTAY_HOSTEL_PG
//   | typeof JUSTAY_HALLS
//   | typeof JUSTAY_TOURISM;

// export const JUSTAY_SERVICES: readonly JuStayServiceId[] = [
//   JUSTAY_HOTELS,
//   JUSTAY_HOSTEL_PG,
//   JUSTAY_HALLS,
//   JUSTAY_TOURISM,
// ];

// export const JUSTAY_SERVICE_LABELS: Record<JuStayServiceId, string> = {
//   HOTELS: "Hotels",
//   HOSTEL_PG: "Hostel / PG",
//   HALLS: "Function halls",
//   TOURISM: "Tourism",
// };

// /** Vendor tags for Stay */
// export const JUSTAY_VENDOR_TYPES = [
//   "STAY",
//   "HOTELS",
//   "HOSTEL_PG",
//   "HALLS",
//   "TOURISM",
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* JuHome                                                                     */
// /* -------------------------------------------------------------------------- */

// export const JUHOME_VENDOR_TYPES = ["HOME_SERVICES", "JUHOME"] as const;

// /** Optional service labels for home bookings (extend as needed) */
// export type JuHomeServiceId = string;

// export const JUHOME_SERVICE_HINTS = [
//   "PLUMBING",
//   "ELECTRICAL",
//   "CLEANING",
//   "AC_REPAIR",
//   "PAINTING",
//   "CARPENTRY",
//   "APPLIANCE",
//   "OTHER",
// ] as const;

// /* -------------------------------------------------------------------------- */
// /* JuShopping                                                                 */
// /* -------------------------------------------------------------------------- */

// export const JUSHOPPING_SHOPPING = "SHOPPING" as const;

// export type JuShoppingServiceId = typeof JUSHOPPING_SHOPPING;

// export const JUSHOPPING_SERVICES: readonly JuShoppingServiceId[] = [
//   JUSHOPPING_SHOPPING,
// ];

// export const JUSHOPPING_SERVICE_LABELS: Record<JuShoppingServiceId, string> = {
//   SHOPPING: "Shopping",
// };

// /** Vendor tags for JuShopping */
// export const JUSHOPPING_VENDOR_TYPES = ["SHOPPING", "JUSHOPPING"] as const;

// /* -------------------------------------------------------------------------- */
// /* Helpers                                                                    */
// /* -------------------------------------------------------------------------- */

// export const ALL_CUSTOMER_MODULES: readonly CustomerModuleId[] = [
//   MODULE_JUCART,
//   MODULE_JURIDE,
//   MODULE_JUSTAY,
//   MODULE_JUHOME,
//   MODULE_JUSHOPPING,
//   MODULE_JUONLINE,
// ];

// export function isCustomerModuleId(value: unknown): value is CustomerModuleId {
//   return (
//     typeof value === "string" &&
//     (ALL_CUSTOMER_MODULES as readonly string[]).includes(value)
//   );
// }

/** Canonical module IDs from JUONE MSD §3.2 — do not rename */

export const MODULE_JUCART = "JUCART" as const;
export const MODULE_JURIDE = "JURIDE" as const;
export const MODULE_JUSTAY = "JUSTAY" as const;
export const MODULE_JUHOME = "JUHOME" as const;
export const MODULE_JUSHOPPING = "JUSHOPPING" as const;
export const MODULE_JUONLINE = "JUONLINE" as const;

export type CustomerModuleId =
  | typeof MODULE_JUCART
  | typeof MODULE_JURIDE
  | typeof MODULE_JUSTAY
  | typeof MODULE_JUHOME
  | typeof MODULE_JUSHOPPING
  | typeof MODULE_JUONLINE;

/* -------------------------------------------------------------------------- */
/* JuCart                                                                     */
/* -------------------------------------------------------------------------- */

export const JUCART_FOOD = "FOOD" as const;
export const JUCART_MART = "MART" as const;
export const JUCART_PHARMACY = "PHARMACY" as const;

export type JuCartServiceId =
  | typeof JUCART_FOOD
  | typeof JUCART_MART
  | typeof JUCART_PHARMACY;

export const JUCART_SERVICES: readonly JuCartServiceId[] = [
  JUCART_FOOD,
  JUCART_MART,
  JUCART_PHARMACY,
];

export const JUCART_SERVICE_LABELS: Record<JuCartServiceId, string> = {
  FOOD: "Food",
  MART: "Mart",
  PHARMACY: "Pharmacy",
};

/** Vendor module types used on vendors collection for JuCart */
export const JUCART_VENDOR_TYPES: readonly JuCartServiceId[] = [
  JUCART_FOOD,
  JUCART_MART,
  JUCART_PHARMACY,
];

/* -------------------------------------------------------------------------- */
/* JuRide                                                                     */
/* -------------------------------------------------------------------------- */

export const JURIDE_RIDE = "RIDE" as const;
export const JURIDE_BIKE = "BIKE" as const;
export const JURIDE_AUTO = "AUTO" as const;
export const JURIDE_CAR = "CAR" as const;

export type JuRideServiceId =
  | typeof JURIDE_RIDE
  | typeof JURIDE_BIKE
  | typeof JURIDE_AUTO
  | typeof JURIDE_CAR
  | string;

export const JURIDE_SERVICES: readonly string[] = [
  JURIDE_RIDE,
  JURIDE_BIKE,
  JURIDE_AUTO,
  JURIDE_CAR,
];

export const JURIDE_SERVICE_LABELS: Record<string, string> = {
  RIDE: "Ride",
  BIKE: "Bike",
  AUTO: "Auto",
  CAR: "Car",
};

/* -------------------------------------------------------------------------- */
/* JuStay                                                                     */
/* -------------------------------------------------------------------------- */

export const JUSTAY_HOTELS = "HOTELS" as const;
export const JUSTAY_HOSTEL_PG = "HOSTEL_PG" as const;
export const JUSTAY_HALLS = "HALLS" as const;
export const JUSTAY_TOURISM = "TOURISM" as const;

export type JuStayServiceId =
  | typeof JUSTAY_HOTELS
  | typeof JUSTAY_HOSTEL_PG
  | typeof JUSTAY_HALLS
  | typeof JUSTAY_TOURISM;

export const JUSTAY_SERVICES: readonly JuStayServiceId[] = [
  JUSTAY_HOTELS,
  JUSTAY_HOSTEL_PG,
  JUSTAY_HALLS,
  JUSTAY_TOURISM,
];

export const JUSTAY_SERVICE_LABELS: Record<JuStayServiceId, string> = {
  HOTELS: "Hotels",
  HOSTEL_PG: "Hostel / PG",
  HALLS: "Function halls",
  TOURISM: "Tourism",
};

/** Vendor tags for Stay */
export const JUSTAY_VENDOR_TYPES = [
  "STAY",
  "HOTELS",
  "HOSTEL_PG",
  "HALLS",
  "TOURISM",
] as const;

/* -------------------------------------------------------------------------- */
/* JuHome                                                                     */
/* -------------------------------------------------------------------------- */

export const JUHOME_VENDOR_TYPES = ["HOME_SERVICES", "JUHOME"] as const;

/** Optional service labels for home bookings (extend as needed) */
export type JuHomeServiceId = string;

export const JUHOME_SERVICE_HINTS = [
  "PLUMBING",
  "ELECTRICAL",
  "CLEANING",
  "AC_REPAIR",
  "PAINTING",
  "CARPENTRY",
  "APPLIANCE",
  "OTHER",
] as const;

/* -------------------------------------------------------------------------- */
/* JuShopping                                                                 */
/* -------------------------------------------------------------------------- */

export const JUSHOPPING_SHOPPING = "SHOPPING" as const;

export type JuShoppingServiceId = typeof JUSHOPPING_SHOPPING;

export const JUSHOPPING_SERVICES: readonly JuShoppingServiceId[] = [
  JUSHOPPING_SHOPPING,
];

export const JUSHOPPING_SERVICE_LABELS: Record<JuShoppingServiceId, string> = {
  SHOPPING: "Shopping",
};

/** Vendor tags for JuShopping */
export const JUSHOPPING_VENDOR_TYPES = ["SHOPPING", "JUSHOPPING"] as const;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

export const ALL_CUSTOMER_MODULES: readonly CustomerModuleId[] = [
  MODULE_JUCART,
  MODULE_JURIDE,
  MODULE_JUSTAY,
  MODULE_JUHOME,
  MODULE_JUSHOPPING,
  MODULE_JUONLINE,
];

export function isCustomerModuleId(value: unknown): value is CustomerModuleId {
  return (
    typeof value === "string" &&
    (ALL_CUSTOMER_MODULES as readonly string[]).includes(value)
  );
}