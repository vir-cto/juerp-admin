/**
 * JUONE / JuERP Role Constants
 *
 * Source:
 * JUONE Ecosystem Master Specification Document (MSD)
 *
 * Important:
 * - Roles are used for UI/type/scope handling.
 * - Actual authorization must be enforced by the backend
 *   and Firestore security rules.
 * - Do not use frontend role checks as the security boundary.
 */

// export const ERP_ADMIN_ROLES = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "OPERATIONS_ADMIN",
//   "FINANCE_ADMIN",
//   "SUPPORT_ADMIN",
//   "KYC_ADMIN",
//   "DISPATCH_ADMIN",
//   "VIEWER",
// ] as const;

// export type ERPAdminRole =
//   (typeof ERP_ADMIN_ROLES)[number];

// /**
//  * Human-readable labels for JuERP roles.
//  */
// export const ERP_ADMIN_ROLE_LABELS: Record<
//   ERPAdminRole,
//   string
// > = {
//   SUPER_ADMIN: "Super Admin",
//   ADMIN: "Admin",
//   OPERATIONS_ADMIN: "Operations Admin",
//   FINANCE_ADMIN: "Finance Admin",
//   SUPPORT_ADMIN: "Support Admin",
//   KYC_ADMIN: "KYC Admin",
//   DISPATCH_ADMIN: "Dispatch Admin",
//   VIEWER: "Viewer",
// };

// /**
//  * Descriptions used by the JuERP UI.
//  */
// export const ERP_ADMIN_ROLE_DESCRIPTIONS: Record<
//   ERPAdminRole,
//   string
// > = {
//   SUPER_ADMIN:
//     "Full administrative access across JuERP.",
//   ADMIN:
//     "General administrative access.",
//   OPERATIONS_ADMIN:
//     "Operational and order management access.",
//   FINANCE_ADMIN:
//     "Finance, ledger, payment, reconciliation and settlement access.",
//   SUPPORT_ADMIN:
//     "Customer and operational support access.",
//   KYC_ADMIN:
//     "Vendor and captain verification access.",
//   DISPATCH_ADMIN:
//     "Captain dispatch and delivery operations access.",
//   VIEWER:
//     "Read-only access to permitted JuERP information.",
// };

// /**
//  * Display order for role selection/dropdowns.
//  */
// export const ERP_ADMIN_ROLE_ORDER: Record<
//   ERPAdminRole,
//   number
// > = {
//   SUPER_ADMIN: 0,
//   ADMIN: 1,
//   OPERATIONS_ADMIN: 2,
//   FINANCE_ADMIN: 3,
//   SUPPORT_ADMIN: 4,
//   KYC_ADMIN: 5,
//   DISPATCH_ADMIN: 6,
//   VIEWER: 7,
// };

// /**
//  * Validates whether a value is a canonical JuERP role.
//  */
// export function isERPAdminRole(
//   value: unknown,
// ): value is ERPAdminRole {
//   return (
//     typeof value === "string" &&
//     ERP_ADMIN_ROLES.includes(
//       value as ERPAdminRole,
//     )
//   );
// }

// /**
//  * Returns the display label for a role.
//  */
// export function getERPAdminRoleLabel(
//   role: ERPAdminRole,
// ): string {
//   return ERP_ADMIN_ROLE_LABELS[role];
// }

// /**
//  * Returns the description for a role.
//  */
// export function getERPAdminRoleDescription(
//   role: ERPAdminRole,
// ): string {
//   return ERP_ADMIN_ROLE_DESCRIPTIONS[role];
// }

// /**
//  * Returns the display order of a role.
//  */
// export function getERPAdminRoleOrder(
//   role: ERPAdminRole,
// ): number {
//   return ERP_ADMIN_ROLE_ORDER[role];
// }

// /**
//  * Roles with broad administrative authority.
//  *
//  * This is a UI classification only.
//  * It does NOT grant permissions.
//  */
// export const BROAD_ADMIN_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
// ];

// /**
//  * Roles primarily responsible for operational workflows.
//  */
// export const OPERATIONS_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "OPERATIONS_ADMIN",
//   "DISPATCH_ADMIN",
// ];

// /**
//  * Roles responsible for financial workflows.
//  */
// export const FINANCE_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "FINANCE_ADMIN",
// ];

// /**
//  * Roles responsible for support workflows.
//  */
// export const SUPPORT_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "SUPPORT_ADMIN",
// ];

// /**
//  * Roles responsible for KYC / verification workflows.
//  */
// export const KYC_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "KYC_ADMIN",
// ];

// /**
//  * Roles responsible for dispatch workflows.
//  */
// export const DISPATCH_ROLES: ERPAdminRole[] = [
//   "SUPER_ADMIN",
//   "ADMIN",
//   "OPERATIONS_ADMIN",
//   "DISPATCH_ADMIN",
// ];

// /**
//  * Returns true when the role is a broad administrator.
//  */
// export function isBroadAdminRole(
//   role: ERPAdminRole,
// ): boolean {
//   return BROAD_ADMIN_ROLES.includes(role);
// }

// /**
//  * Returns true when the role belongs to operations.
//  */
// export function isOperationsRole(
//   role: ERPAdminRole,
// ): boolean {
//   return OPERATIONS_ROLES.includes(role);
// }

// /**
//  * Returns true when the role belongs to finance.
//  */
// export function isFinanceRole(
//   role: ERPAdminRole,
// ): boolean {
//   return FINANCE_ROLES.includes(role);
// }

// /**
//  * Returns true when the role belongs to support.
//  */
// export function isSupportRole(
//   role: ERPAdminRole,
// ): boolean {
//   return SUPPORT_ROLES.includes(role);
// }

// /**
//  * Returns true when the role belongs to KYC.
//  */
// export function isKycRole(
//   role: ERPAdminRole,
// ): boolean {
//   return KYC_ROLES.includes(role);
// }

// /**
//  * Returns true when the role belongs to dispatch.
//  */
// export function isDispatchRole(
//   role: ERPAdminRole,
// ): boolean {
//   return DISPATCH_ROLES.includes(role);
// }

// /**
//  * Viewer is explicitly read-only.
//  */
// export function isViewerRole(
//   role: ERPAdminRole,
// ): boolean {
//   return role === "VIEWER";
// }

// /**
//  * Role metadata used by admin screens.
//  */
// export const ERP_ADMIN_ROLE_METADATA: Record<
//   ERPAdminRole,
//   {
//     role: ERPAdminRole;
//     label: string;
//     description: string;
//     readOnly: boolean;
//   }
// > = {
//   SUPER_ADMIN: {
//     role: "SUPER_ADMIN",
//     label: "Super Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.SUPER_ADMIN,
//     readOnly: false,
//   },

//   ADMIN: {
//     role: "ADMIN",
//     label: "Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.ADMIN,
//     readOnly: false,
//   },

//   OPERATIONS_ADMIN: {
//     role: "OPERATIONS_ADMIN",
//     label: "Operations Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.OPERATIONS_ADMIN,
//     readOnly: false,
//   },

//   FINANCE_ADMIN: {
//     role: "FINANCE_ADMIN",
//     label: "Finance Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.FINANCE_ADMIN,
//     readOnly: false,
//   },

//   SUPPORT_ADMIN: {
//     role: "SUPPORT_ADMIN",
//     label: "Support Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.SUPPORT_ADMIN,
//     readOnly: false,
//   },

//   KYC_ADMIN: {
//     role: "KYC_ADMIN",
//     label: "KYC Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.KYC_ADMIN,
//     readOnly: false,
//   },

//   DISPATCH_ADMIN: {
//     role: "DISPATCH_ADMIN",
//     label: "Dispatch Admin",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.DISPATCH_ADMIN,
//     readOnly: false,
//   },

//   VIEWER: {
//     role: "VIEWER",
//     label: "Viewer",
//     description:
//       ERP_ADMIN_ROLE_DESCRIPTIONS.VIEWER,
//     readOnly: true,
//   },
// };

// export default {
//   ERP_ADMIN_ROLES,
//   ERP_ADMIN_ROLE_LABELS,
//   ERP_ADMIN_ROLE_DESCRIPTIONS,
//   ERP_ADMIN_ROLE_ORDER,
//   ERP_ADMIN_ROLE_METADATA,
// };

/**
 * JUERP – Canonical Roles
 * Hierarchy roles are the primary access control.
 * Functional roles can be attached as secondary permissions later.
 */

export const ERP_HIERARCHY_ROLES = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
] as const;

export type ERPHierarchyRole = (typeof ERP_HIERARCHY_ROLES)[number];

/** @deprecated – kept only for backward compatibility during migration */
export const ERP_ADMIN_ROLES = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
  "ADMIN",
  "OPERATIONS_ADMIN",
  "FINANCE_ADMIN",
  "SUPPORT_ADMIN",
  "KYC_ADMIN",
  "DISPATCH_ADMIN",
  "VIEWER",
] as const;

export type ERPAdminRole = (typeof ERP_ADMIN_ROLES)[number];

export const ERP_ADMIN_ROLE_LABELS: Record<ERPAdminRole, string> = {
  SUPER_ADMIN: "Super Admin",
  STATE_ADMIN: "State Admin",
  DISTRICT_ADMIN: "District Admin",
  TECHNICAL_ADMIN: "Technical Admin",
  ADMIN: "Admin",
  OPERATIONS_ADMIN: "Operations Admin",
  FINANCE_ADMIN: "Finance Admin",
  SUPPORT_ADMIN: "Support Admin",
  KYC_ADMIN: "KYC Admin",
  DISPATCH_ADMIN: "Dispatch Admin",
  VIEWER: "Viewer",
};

export const ERP_ADMIN_ROLE_DESCRIPTIONS: Record<ERPAdminRole, string> = {
  SUPER_ADMIN:
    "Full access across all states, districts and modules. Can drill into any state → district dashboard.",
  STATE_ADMIN:
    "Manages one state. Can view all districts under that state and drill into any district dashboard.",
  DISTRICT_ADMIN:
    "Manages one district (all pincodes). Sees only that district’s orders, vendors, captains and settlements.",
  TECHNICAL_ADMIN:
    "Company technical access: ads, map icons, profit-share (20%/30%), system logs and configuration.",
  ADMIN: "General administrative access (legacy).",
  OPERATIONS_ADMIN: "Operational and order management access (legacy).",
  FINANCE_ADMIN: "Finance, ledger, payment and settlement access (legacy).",
  SUPPORT_ADMIN: "Customer and operational support access (legacy).",
  KYC_ADMIN: "Vendor and captain verification access (legacy).",
  DISPATCH_ADMIN: "Captain dispatch and delivery operations access (legacy).",
  VIEWER: "Read-only access.",
};

export const ERP_ADMIN_ROLE_ORDER: Record<ERPAdminRole, number> = {
  SUPER_ADMIN: 0,
  STATE_ADMIN: 1,
  DISTRICT_ADMIN: 2,
  TECHNICAL_ADMIN: 3,
  ADMIN: 4,
  OPERATIONS_ADMIN: 5,
  FINANCE_ADMIN: 6,
  SUPPORT_ADMIN: 7,
  KYC_ADMIN: 8,
  DISPATCH_ADMIN: 9,
  VIEWER: 10,
};

export function isERPAdminRole(value: unknown): value is ERPAdminRole {
  return (
    typeof value === "string" &&
    (ERP_ADMIN_ROLES as readonly string[]).includes(value)
  );
}

export function isHierarchyRole(value: unknown): value is ERPHierarchyRole {
  return (
    typeof value === "string" &&
    (ERP_HIERARCHY_ROLES as readonly string[]).includes(value)
  );
}

export function getERPAdminRoleLabel(role: ERPAdminRole): string {
  return ERP_ADMIN_ROLE_LABELS[role] ?? role;
}

export function getERPAdminRoleDescription(role: ERPAdminRole): string {
  return ERP_ADMIN_ROLE_DESCRIPTIONS[role] ?? "";
}

export function getERPAdminRoleOrder(role: ERPAdminRole): number {
  return ERP_ADMIN_ROLE_ORDER[role] ?? 99;
}

/* -------------------------------------------------------------------------- */
/* Role groups                                                                */
/* -------------------------------------------------------------------------- */

export const BROAD_ADMIN_ROLES: ERPAdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
];

export const GOVERNANCE_ROLES: ERPAdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
];

export const FINANCIAL_ROLES: ERPAdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
  "FINANCE_ADMIN",
];

export const TECHNICAL_ROLES: ERPAdminRole[] = [
  "SUPER_ADMIN",
  "TECHNICAL_ADMIN",
];

export const DISPATCH_ROLES: ERPAdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "DISPATCH_ADMIN",
  "OPERATIONS_ADMIN",
];

export function isBroadAdminRole(role: ERPAdminRole): boolean {
  return BROAD_ADMIN_ROLES.includes(role);
}

export function isGovernanceRole(role: ERPAdminRole): boolean {
  return GOVERNANCE_ROLES.includes(role);
}

export function isFinanceRole(role: ERPAdminRole): boolean {
  return FINANCIAL_ROLES.includes(role);
}

export function isTechnicalRole(role: ERPAdminRole): boolean {
  return TECHNICAL_ROLES.includes(role);
}

export function isDispatchRole(role: ERPAdminRole): boolean {
  return DISPATCH_ROLES.includes(role);
}

export function isViewerRole(role: ERPAdminRole): boolean {
  return role === "VIEWER";
}

export const ERP_ADMIN_ROLE_METADATA: Record<
  ERPAdminRole,
  {
    role: ERPAdminRole;
    label: string;
    description: string;
    readOnly: boolean;
    isHierarchy: boolean;
  }
> = {
  SUPER_ADMIN: {
    role: "SUPER_ADMIN",
    label: "Super Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.SUPER_ADMIN,
    readOnly: false,
    isHierarchy: true,
  },
  STATE_ADMIN: {
    role: "STATE_ADMIN",
    label: "State Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.STATE_ADMIN,
    readOnly: false,
    isHierarchy: true,
  },
  DISTRICT_ADMIN: {
    role: "DISTRICT_ADMIN",
    label: "District Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.DISTRICT_ADMIN,
    readOnly: false,
    isHierarchy: true,
  },
  TECHNICAL_ADMIN: {
    role: "TECHNICAL_ADMIN",
    label: "Technical Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.TECHNICAL_ADMIN,
    readOnly: false,
    isHierarchy: true,
  },
  ADMIN: {
    role: "ADMIN",
    label: "Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  OPERATIONS_ADMIN: {
    role: "OPERATIONS_ADMIN",
    label: "Operations Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.OPERATIONS_ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  FINANCE_ADMIN: {
    role: "FINANCE_ADMIN",
    label: "Finance Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.FINANCE_ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  SUPPORT_ADMIN: {
    role: "SUPPORT_ADMIN",
    label: "Support Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.SUPPORT_ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  KYC_ADMIN: {
    role: "KYC_ADMIN",
    label: "KYC Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.KYC_ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  DISPATCH_ADMIN: {
    role: "DISPATCH_ADMIN",
    label: "Dispatch Admin",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.DISPATCH_ADMIN,
    readOnly: false,
    isHierarchy: false,
  },
  VIEWER: {
    role: "VIEWER",
    label: "Viewer",
    description: ERP_ADMIN_ROLE_DESCRIPTIONS.VIEWER,
    readOnly: true,
    isHierarchy: false,
  },
};

export default {
  ERP_HIERARCHY_ROLES,
  ERP_ADMIN_ROLES,
  ERP_ADMIN_ROLE_LABELS,
  ERP_ADMIN_ROLE_DESCRIPTIONS,
  ERP_ADMIN_ROLE_ORDER,
  ERP_ADMIN_ROLE_METADATA,
};