/**
 * JUERP - Hierarchy Types
 *
 * File:
 * src/types/hierarchy.ts
 *
 * Purpose:
 * - Shared TypeScript types for ERP hierarchy and scope.
 * - Supports National, State, District, City and Local levels.
 * - Provides types for hierarchy nodes and admin scope.
 *
 * IMPORTANT:
 * - These types support UI and API contracts.
 * - They do NOT replace backend authorization.
 * - Backend authorization and Firestore security rules remain authoritative.
 * - Do not use client-side hierarchy checks as a security boundary.
 */

/* -------------------------------------------------------------------------- */
/* Hierarchy Level                                                            */
/* -------------------------------------------------------------------------- */

export type HierarchyLevel =
  | "NATIONAL"
  | "STATE"
  | "DISTRICT"
  | "CITY"
  | "LOCAL";

/* -------------------------------------------------------------------------- */
/* Hierarchy Node Status                                                      */
/* -------------------------------------------------------------------------- */

export type HierarchyNodeStatus =
  | "ACTIVE"
  | "INACTIVE";

/* -------------------------------------------------------------------------- */
/* Hierarchy Node                                                             */
/* -------------------------------------------------------------------------- */

export interface HierarchyNode {
  /**
   * Unique hierarchy node identifier.
   */
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Hierarchy level.
   */
  level: HierarchyLevel;

  /**
   * Parent hierarchy node.
   *
   * National nodes normally have no parent.
   */
  parentId?: string | null;

  /**
   * Optional state identifier.
   */
  stateId?: string;

  /**
   * Optional district identifier.
   */
  districtId?: string;

  /**
   * Optional city identifier.
   */
  cityId?: string;

  /**
   * Optional local identifier.
   */
  localId?: string;

  /**
   * Backend status.
   */
  status?: HierarchyNodeStatus;

  /**
   * Optional geographic metadata.
   */
  latitude?: number;

  longitude?: number;

  /**
   * Optional backend metadata.
   */
  metadata?: Record<
    string,
    unknown
  >;

  createdAt?:
    | string
    | number
    | Date;

  updatedAt?:
    | string
    | number
    | Date;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Scope                                                            */
/* -------------------------------------------------------------------------- */

export interface HierarchyScope {
  /**
   * Highest level available to the administrator.
   */
  level: HierarchyLevel;

  /**
   * IDs of nodes explicitly included in the scope.
   */
  nodeIds: string[];

  /**
   * Optional national IDs.
   */
  nationalIds?: string[];

  /**
   * Optional state IDs.
   */
  stateIds?: string[];

  /**
   * Optional district IDs.
   */
  districtIds?: string[];

  /**
   * Optional city IDs.
   */
  cityIds?: string[];

  /**
   * Optional local IDs.
   */
  localIds?: string[];
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Assignment                                                       */
/* -------------------------------------------------------------------------- */

export interface HierarchyAssignment {
  entityId: string;

  entityType:
    | "USER"
    | "ADMIN"
    | "VENDOR"
    | "CAPTAIN";

  hierarchyLevel: HierarchyLevel;

  hierarchyNodeId: string;

  assignedBy?: string;

  assignedAt?:
    | string
    | number
    | Date;

  status?:
    | "ACTIVE"
    | "INACTIVE";
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Path                                                             */
/* -------------------------------------------------------------------------- */

export interface HierarchyPath {
  national?: HierarchyNode;

  state?: HierarchyNode;

  district?: HierarchyNode;

  city?: HierarchyNode;

  local?: HierarchyNode;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Query                                                            */
/* -------------------------------------------------------------------------- */

export interface HierarchyQuery {
  level?: HierarchyLevel;

  parentId?: string;

  nodeId?: string;

  search?: string;

  status?: HierarchyNodeStatus;

  includeChildren?: boolean;

  includeParents?: boolean;

  page?: number;

  pageSize?: number;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy List Response                                                    */
/* -------------------------------------------------------------------------- */

export interface HierarchyListResponse {
  nodes: HierarchyNode[];

  total?: number;

  page?: number;

  pageSize?: number;

  totalPages?: number;

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Detail Response                                                  */
/* -------------------------------------------------------------------------- */

export interface HierarchyDetailResponse {
  node: HierarchyNode;

  path?: HierarchyPath;

  children?: HierarchyNode[];

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Scope Response                                                   */
/* -------------------------------------------------------------------------- */

export interface HierarchyScopeResponse {
  scope: HierarchyScope;

  nodes?: HierarchyNode[];

  correlationId?: string;
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Constants                                                        */
/* -------------------------------------------------------------------------- */

export const HIERARCHY_LEVELS:
  readonly HierarchyLevel[] = [
  "NATIONAL",
  "STATE",
  "DISTRICT",
  "CITY",
  "LOCAL",
];

export const HIERARCHY_NODE_STATUSES:
  readonly HierarchyNodeStatus[] = [
  "ACTIVE",
  "INACTIVE",
];

/* -------------------------------------------------------------------------- */
/* Hierarchy Order                                                            */
/* -------------------------------------------------------------------------- */

export const HIERARCHY_LEVEL_ORDER:
  Record<
    HierarchyLevel,
    number
  > = {
  NATIONAL: 0,
  STATE: 1,
  DISTRICT: 2,
  CITY: 3,
  LOCAL: 4,
};

/* -------------------------------------------------------------------------- */
/* Hierarchy Labels                                                           */
/* -------------------------------------------------------------------------- */

export const HIERARCHY_LEVEL_LABELS:
  Record<
    HierarchyLevel,
    string
  > = {
  NATIONAL: "National",

  STATE: "State",

  DISTRICT: "District",

  CITY: "City",

  LOCAL: "Local",
};

/* -------------------------------------------------------------------------- */
/* Parent Mapping                                                             */
/* -------------------------------------------------------------------------- */

export const HIERARCHY_PARENT_LEVEL:
  Record<
    HierarchyLevel,
    HierarchyLevel | null
  > = {
  NATIONAL: null,

  STATE: "NATIONAL",

  DISTRICT: "STATE",

  CITY: "DISTRICT",

  LOCAL: "CITY",
};

/* -------------------------------------------------------------------------- */
/* Child Mapping                                                              */
/* -------------------------------------------------------------------------- */

export const HIERARCHY_CHILD_LEVELS:
  Record<
    HierarchyLevel,
    HierarchyLevel[]
  > = {
  NATIONAL: ["STATE"],

  STATE: ["DISTRICT"],

  DISTRICT: ["CITY"],

  CITY: ["LOCAL"],

  LOCAL: [],
};

/* -------------------------------------------------------------------------- */
/* Type Guards                                                                */
/* -------------------------------------------------------------------------- */

export function isHierarchyLevel(
  value: unknown,
): value is HierarchyLevel {
  return (
    typeof value === "string" &&
    (
      HIERARCHY_LEVELS as readonly string[]
    ).includes(value)
  );
}

export function isHierarchyNodeStatus(
  value: unknown,
): value is HierarchyNodeStatus {
  return (
    value === "ACTIVE" ||
    value === "INACTIVE"
  );
}

/* -------------------------------------------------------------------------- */
/* Level Helpers                                                              */
/* -------------------------------------------------------------------------- */

export function getHierarchyLevelLabel(
  level: HierarchyLevel,
): string {
  return HIERARCHY_LEVEL_LABELS[
    level
  ];
}

export function getHierarchyLevelOrder(
  level: HierarchyLevel,
): number {
  return HIERARCHY_LEVEL_ORDER[
    level
  ];
}

export function getParentHierarchyLevel(
  level: HierarchyLevel,
): HierarchyLevel | null {
  return HIERARCHY_PARENT_LEVEL[
    level
  ];
}

export function getChildHierarchyLevels(
  level: HierarchyLevel,
): HierarchyLevel[] {
  return [
    ...HIERARCHY_CHILD_LEVELS[
      level
    ],
  ];
}

export function isRootHierarchyLevel(
  level: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_PARENT_LEVEL[
      level
    ] === null
  );
}

export function isLeafHierarchyLevel(
  level: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_CHILD_LEVELS[
      level
    ].length === 0
  );
}

/* -------------------------------------------------------------------------- */
/* Hierarchy Relationship Helpers                                             */
/* -------------------------------------------------------------------------- */

/**
 * Returns true when `parentLevel` can directly contain
 * children of `childLevel`.
 */
export function canBeParentLevel(
  parentLevel: HierarchyLevel,
  childLevel: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_CHILD_LEVELS[
      parentLevel
    ].includes(childLevel)
  );
}

/**
 * Returns true when the first level is above the second
 * level in the hierarchy.
 */
export function isHigherHierarchyLevel(
  first: HierarchyLevel,
  second: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_LEVEL_ORDER[
      first
    ] <
    HIERARCHY_LEVEL_ORDER[
      second
    ]
  );
}

/**
 * Returns true when two levels are identical.
 */
export function isSameHierarchyLevel(
  first: HierarchyLevel,
  second: HierarchyLevel,
): boolean {
  return first === second;
}

/**
 * Returns true when the first level is below the second
 * level in the hierarchy.
 */
export function isLowerHierarchyLevel(
  first: HierarchyLevel,
  second: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_LEVEL_ORDER[
      first
    ] >
    HIERARCHY_LEVEL_ORDER[
      second
    ]
  );
}

/* -------------------------------------------------------------------------- */
/* Scope Helpers                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Get IDs applicable to a hierarchy level.
 */
export function getScopeIdsForLevel(
  scope: HierarchyScope,
  level: HierarchyLevel,
): string[] {
  switch (level) {
    case "NATIONAL":
      return [
        ...(scope.nationalIds ??
          []),
      ];

    case "STATE":
      return [
        ...(scope.stateIds ??
          []),
      ];

    case "DISTRICT":
      return [
        ...(scope.districtIds ??
          []),
      ];

    case "CITY":
      return [
        ...(scope.cityIds ??
          []),
      ];

    case "LOCAL":
      return [
        ...(scope.localIds ??
          []),
      ];

    default:
      return [];
  }
}

/**
 * Check whether a node ID is directly present
 * in a scope at the requested level.
 *
 * This is a client-side helper only.
 */
export function isNodeInScope(
  scope: HierarchyScope,
  level: HierarchyLevel,
  nodeId: string,
): boolean {
  const normalizedId =
    nodeId.trim();

  if (!normalizedId) {
    return false;
  }

  return getScopeIdsForLevel(
    scope,
    level,
  ).includes(
    normalizedId,
  );
}

/**
 * Check whether the scope itself is unrestricted
 * at the given level.
 *
 * An empty array means that this helper cannot infer
 * unrestricted access; backend authorization remains
 * authoritative.
 */
export function hasExplicitScopeIds(
  scope: HierarchyScope,
  level: HierarchyLevel,
): boolean {
  return (
    getScopeIdsForLevel(
      scope,
      level,
    ).length > 0
  );
}

/* -------------------------------------------------------------------------- */
/* Node Helpers                                                               */
/* -------------------------------------------------------------------------- */

export function isActiveHierarchyNode(
  node: HierarchyNode,
): boolean {
  return (
    node.status === undefined ||
    node.status === "ACTIVE"
  );
}

export function isRootHierarchyNode(
  node: HierarchyNode,
): boolean {
  return (
    HIERARCHY_PARENT_LEVEL[
      node.level
    ] === null
  );
}

export function getHierarchyNodeDisplayName(
  node: HierarchyNode,
): string {
  return node.name;
}

/* -------------------------------------------------------------------------- */
/* Path Helpers                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Build a hierarchy path from a collection of nodes.
 *
 * This is a UI/data-shaping helper.
 * It does not fetch missing nodes.
 */
export function buildHierarchyPath(
  nodes: HierarchyNode[],
): HierarchyPath {
  const path: HierarchyPath = {};

  nodes.forEach(
    (node) => {
      switch (node.level) {
        case "NATIONAL":
          path.national = node;
          break;

        case "STATE":
          path.state = node;
          break;

        case "DISTRICT":
          path.district = node;
          break;

        case "CITY":
          path.city = node;
          break;

        case "LOCAL":
          path.local = node;
          break;

        default:
          break;
      }
    },
  );

  return path;
}

/**
 * Convert a hierarchy path into an ordered array.
 */
export function hierarchyPathToArray(
  path: HierarchyPath,
): HierarchyNode[] {
  const result: HierarchyNode[] = [];

  if (path.national) {
    result.push(
      path.national,
    );
  }

  if (path.state) {
    result.push(
      path.state,
    );
  }

  if (path.district) {
    result.push(
      path.district,
    );
  }

  if (path.city) {
    result.push(
      path.city,
    );
  }

  if (path.local) {
    result.push(
      path.local,
    );
  }

  return result;
}

/* -------------------------------------------------------------------------- */
/* Default Export                                                             */
/* -------------------------------------------------------------------------- */

const hierarchyTypes = {
  HIERARCHY_LEVELS,

  HIERARCHY_NODE_STATUSES,

  HIERARCHY_LEVEL_ORDER,

  HIERARCHY_LEVEL_LABELS,

  HIERARCHY_PARENT_LEVEL,

  HIERARCHY_CHILD_LEVELS,

  isHierarchyLevel,

  isHierarchyNodeStatus,

  getHierarchyLevelLabel,

  getHierarchyLevelOrder,

  getParentHierarchyLevel,

  getChildHierarchyLevels,

  isRootHierarchyLevel,

  isLeafHierarchyLevel,

  canBeParentLevel,

  isHigherHierarchyLevel,

  isSameHierarchyLevel,

  isLowerHierarchyLevel,

  getScopeIdsForLevel,

  isNodeInScope,

  hasExplicitScopeIds,

  isActiveHierarchyNode,

  isRootHierarchyNode,

  getHierarchyNodeDisplayName,

  buildHierarchyPath,

  hierarchyPathToArray,
};

export default hierarchyTypes;