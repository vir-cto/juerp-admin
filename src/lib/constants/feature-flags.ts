/** Canonical feature flag keys — do not invent alternate names in UI code */
export const FEATURE_FLAG_KEYS = {
  CONTROL_ROOM: "control_room",
  COMMISSION_ENGINE: "commission_engine",
  FINANCIAL_AUDIT: "financial_audit",
  OVERRIDES: "overrides",
  ENTITY_MANAGEMENT: "entity_management",
  HIERARCHY: "hierarchy",
  SYSTEM_AUDIT: "system_audit",
} as const;

export type FeatureFlagKey =
  (typeof FEATURE_FLAG_KEYS)[keyof typeof FEATURE_FLAG_KEYS];

export const FEATURE_FLAG_META: Record<
  FeatureFlagKey,
  { title: string; description: string; menuSectionTitle?: string }
> = {
  control_room: {
    title: "Control Room",
    description: "Live operations control room access.",
    menuSectionTitle: "MAIN",
  },
  commission_engine: {
    title: "Commission Engine",
    description: "Commission rules, overrides and vendor rates.",
    menuSectionTitle: "COMMISSION ENGINE",
  },
  financial_audit: {
    title: "Financial Audit",
    description: "Ledger, payouts, settlements and refunds.",
    menuSectionTitle: "FINANCIAL AUDIT",
  },
  overrides: {
    title: "Overrides",
    description: "Dispatch, suspension and cancellation overrides.",
    menuSectionTitle: "OVERRIDES",
  },
  entity_management: {
    title: "Entity Management",
    description: "Customers, vendors and captains.",
    menuSectionTitle: "ENTITY MANAGEMENT",
  },
  hierarchy: {
    title: "Hierarchy",
    description: "States, districts, clusters and zones.",
    menuSectionTitle: "HIERARCHY",
  },
  system_audit: {
    title: "System Audit",
    description: "Audit, RBAC and admin users.",
    menuSectionTitle: "SYSTEM AUDIT",
  },
};

export const JUERP_APP_ID = "JUERP";