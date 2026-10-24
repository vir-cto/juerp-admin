export const HIERARCHY_LEVELS = [
  "NATIONAL",
  "STATE",
  "DISTRICT",
  "CITY",
  "LOCAL",
] as const;

export type HierarchyLevel =
  (typeof HIERARCHY_LEVELS)[number];

export type HierarchyNode = {
  id: string;
  name: string;
  level: HierarchyLevel;

  parentId?: string;
  parentLevel?: HierarchyLevel;

  active: boolean;

  createdAt?: string;
  updatedAt?: string;
};

export type HierarchyScope = {
  organizationId?: string;

  stateIds?: string[];
  districtIds?: string[];
  cityIds?: string[];
  localIds?: string[];

  moduleIds?: string[];

  vendorIds?: string[];
  captainIds?: string[];
};

export const HIERARCHY_PARENT_LEVEL: Record<
  HierarchyLevel,
  HierarchyLevel | null
> = {
  NATIONAL: null,
  STATE: "NATIONAL",
  DISTRICT: "STATE",
  CITY: "DISTRICT",
  LOCAL: "CITY",
};

export const HIERARCHY_CHILD_LEVELS: Record<
  HierarchyLevel,
  HierarchyLevel[]
> = {
  NATIONAL: ["STATE"],
  STATE: ["DISTRICT"],
  DISTRICT: ["CITY"],
  CITY: ["LOCAL"],
  LOCAL: [],
};

export const HIERARCHY_LEVEL_LABELS: Record<
  HierarchyLevel,
  string
> = {
  NATIONAL: "National",
  STATE: "State",
  DISTRICT: "District",
  CITY: "City",
  LOCAL: "Local",
};

export const HIERARCHY_LEVEL_ORDER: Record<
  HierarchyLevel,
  number
> = {
  NATIONAL: 0,
  STATE: 1,
  DISTRICT: 2,
  CITY: 3,
  LOCAL: 4,
};

export function isHierarchyLevel(
  value: unknown,
): value is HierarchyLevel {
  return (
    typeof value === "string" &&
    HIERARCHY_LEVELS.includes(
      value as HierarchyLevel,
    )
  );
}

export function getParentHierarchyLevel(
  level: HierarchyLevel,
): HierarchyLevel | null {
  return HIERARCHY_PARENT_LEVEL[level];
}

export function getChildHierarchyLevels(
  level: HierarchyLevel,
): HierarchyLevel[] {
  return HIERARCHY_CHILD_LEVELS[level];
}

export function getHierarchyLevelLabel(
  level: HierarchyLevel,
): string {
  return HIERARCHY_LEVEL_LABELS[level];
}

export function getHierarchyLevelOrder(
  level: HierarchyLevel,
): number {
  return HIERARCHY_LEVEL_ORDER[level];
}

export function isParentHierarchyLevel(
  parentLevel: HierarchyLevel,
  childLevel: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_PARENT_LEVEL[childLevel] ===
    parentLevel
  );
}

export function isHigherOrEqualHierarchyLevel(
  firstLevel: HierarchyLevel,
  secondLevel: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_LEVEL_ORDER[firstLevel] <=
    HIERARCHY_LEVEL_ORDER[secondLevel]
  );
}

export function isLowerOrEqualHierarchyLevel(
  firstLevel: HierarchyLevel,
  secondLevel: HierarchyLevel,
): boolean {
  return (
    HIERARCHY_LEVEL_ORDER[firstLevel] >=
    HIERARCHY_LEVEL_ORDER[secondLevel]
  );
}

/**
 * Returns true when a hierarchy node can be used
 * as the parent of another node.
 */
export function canBeParent(
  parent: HierarchyNode,
  child: HierarchyNode,
): boolean {
  if (!parent.active || !child.active) {
    return false;
  }

  return isParentHierarchyLevel(
    parent.level,
    child.level,
  );
}

/**
 * Checks whether a node belongs to the requested
 * hierarchy scope.
 *
 * This is a client-side visibility helper only.
 * Authoritative authorization must still be enforced
 * by the backend/Firestore security rules.
 */
export function isNodeWithinScope(
  node: HierarchyNode,
  scope: HierarchyScope,
): boolean {
  if (!node.active) {
    return false;
  }

  if (
    node.level === "NATIONAL"
  ) {
    return true;
  }

  if (node.level === "STATE") {
    if (!scope.stateIds) {
      return true;
    }

    return scope.stateIds.includes(
      node.id,
    );
  }

  if (node.level === "DISTRICT") {
    if (!scope.districtIds) {
      return true;
    }

    return scope.districtIds.includes(
      node.id,
    );
  }

  if (node.level === "CITY") {
    if (!scope.cityIds) {
      return true;
    }

    return scope.cityIds.includes(
      node.id,
    );
  }

  if (node.level === "LOCAL") {
    if (!scope.localIds) {
      return true;
    }

    return scope.localIds.includes(
      node.id,
    );
  }

  return false;
}

/**
 * Returns the IDs that can be used for filtering
 * a particular hierarchy level.
 */
export function getScopeIdsForLevel(
  scope: HierarchyScope,
  level: HierarchyLevel,
): string[] | undefined {
  switch (level) {
    case "NATIONAL":
      return scope.organizationId
        ? [scope.organizationId]
        : undefined;

    case "STATE":
      return scope.stateIds;

    case "DISTRICT":
      return scope.districtIds;

    case "CITY":
      return scope.cityIds;

    case "LOCAL":
      return scope.localIds;

    default:
      return undefined;
  }
}

/**
 * Returns whether a scope explicitly contains
 * the requested hierarchy ID.
 */
export function scopeContainsNode(
  scope: HierarchyScope,
  level: HierarchyLevel,
  nodeId: string,
): boolean {
  const ids =
    getScopeIdsForLevel(
      scope,
      level,
    );

  if (!ids) {
    return true;
  }

  return ids.includes(nodeId);
}

/**
 * Canonical hierarchy metadata used by
 * JuERP UI components.
 */
export const HIERARCHY_METADATA: Record<
  HierarchyLevel,
  {
    level: HierarchyLevel;
    label: string;
    parentLevel: HierarchyLevel | null;
    childLevels: HierarchyLevel[];
  }
> = {
  NATIONAL: {
    level: "NATIONAL",
    label: "National",
    parentLevel: null,
    childLevels: ["STATE"],
  },

  STATE: {
    level: "STATE",
    label: "State",
    parentLevel: "NATIONAL",
    childLevels: ["DISTRICT"],
  },

  DISTRICT: {
    level: "DISTRICT",
    label: "District",
    parentLevel: "STATE",
    childLevels: ["CITY"],
  },

  CITY: {
    level: "CITY",
    label: "City",
    parentLevel: "DISTRICT",
    childLevels: ["LOCAL"],
  },

  LOCAL: {
    level: "LOCAL",
    label: "Local",
    parentLevel: "CITY",
    childLevels: [],
  },
};

export default {
  HIERARCHY_LEVELS,
  HIERARCHY_PARENT_LEVEL,
  HIERARCHY_CHILD_LEVELS,
  HIERARCHY_LEVEL_LABELS,
  HIERARCHY_LEVEL_ORDER,
  HIERARCHY_METADATA,
};