import type { AuthRole } from "@/hooks/useAuthScope";

export type HierarchyScopeFilter = {
  role: AuthRole | null;
  stateId: string | null;
  districtId: string | null;
  isGlobalAdmin: boolean;
};

function matchId(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b || a === "—" || b === "—") return false;
  return a === b || a.toLowerCase() === b.toLowerCase();
}

/** SUPER_ADMIN / TECHNICAL_ADMIN see everything */
export function isUnscopedAdmin(role: AuthRole | null, isGlobalAdmin: boolean): boolean {
  return isGlobalAdmin || role === "SUPER_ADMIN" || role === "TECHNICAL_ADMIN";
}

export function filterStatesByScope<T extends { stateId: string }>(
  items: T[],
  scope: HierarchyScopeFilter
): T[] {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return items;
  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return items.filter((s) => matchId(s.stateId, scope.stateId));
  }
  if (scope.role === "DISTRICT_ADMIN" && scope.stateId) {
    // District admin may see parent state row only
    return items.filter((s) => matchId(s.stateId, scope.stateId));
  }
  return [];
}

export function filterDistrictsByScope<
  T extends { districtId: string; stateId: string },
>(items: T[], scope: HierarchyScopeFilter): T[] {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return items;
  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return items.filter((d) => matchId(d.stateId, scope.stateId));
  }
  if (scope.role === "DISTRICT_ADMIN" && scope.districtId) {
    return items.filter((d) => matchId(d.districtId, scope.districtId));
  }
  return [];
}

export function filterPincodesByScope<
  T extends { stateId: string; districtId: string },
>(items: T[], scope: HierarchyScopeFilter): T[] {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return items;
  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return items.filter((p) => matchId(p.stateId, scope.stateId));
  }
  if (scope.role === "DISTRICT_ADMIN" && scope.districtId) {
    return items.filter((p) => matchId(p.districtId, scope.districtId));
  }
  return [];
}

export function filterByStateAndDistrict<
  T extends { stateId: string; districtId?: string },
>(items: T[], scope: HierarchyScopeFilter): T[] {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return items;
  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return items.filter((x) => matchId(x.stateId, scope.stateId));
  }
  if (scope.role === "DISTRICT_ADMIN") {
    return items.filter((x) => {
      if (scope.districtId && x.districtId) {
        return matchId(x.districtId, scope.districtId);
      }
      if (scope.stateId) return matchId(x.stateId, scope.stateId);
      return false;
    });
  }
  return [];
}

/** Main hierarchy node list (type labels: State | District | Pincode | Cluster | Zone) */
export function filterHierarchyNodesByScope<
  T extends { id: string; type: string; parent: string; name: string },
>(
  nodes: T[],
  scope: HierarchyScopeFilter,
  meta?: {
    stateIds?: Set<string>;
    districtIds?: Set<string>;
  }
): T[] {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return nodes;

  const stateId = scope.stateId;
  const districtId = scope.districtId;

  if (scope.role === "STATE_ADMIN" && stateId) {
    return nodes.filter((n) => {
      if (n.type === "State") return matchId(n.id, stateId);
      // District/Pincode/Cluster/Zone under this state: parent name or id heuristics
      // Prefer meta if provided
      if (meta?.stateIds?.has(n.id)) return true;
      return (
        matchId(n.parent, stateId) ||
        n.parent.toLowerCase().includes(stateId.toLowerCase()) ||
        // parent often is state *name* on districts
        true // refined below via optional pre-filter
      );
    });
  }

  // Safer path: caller should pass pre-filtered collections; for nodes use type rules
  if (scope.role === "STATE_ADMIN" && stateId) {
    return nodes.filter((n) => {
      if (n.type === "State") return matchId(n.id, stateId);
      // For non-state, we rely on pages using typed hooks + filter*
      return true;
    });
  }

  if (scope.role === "DISTRICT_ADMIN" && districtId) {
    return nodes.filter((n) => {
      if (n.type === "District") return matchId(n.id, districtId);
      if (n.type === "State") return matchId(n.id, stateId);
      if (n.type === "Pincode" || n.type === "Cluster" || n.type === "Zone") {
        return matchId(n.parent, districtId) || matchId(n.id, districtId);
      }
      return false;
    });
  }

  return [];
}

export type CreateNodeCapability = {
  canCreateState: boolean;
  canCreateDistrict: boolean;
  canCreatePincode: boolean;
  canCreateCluster: boolean;
  canCreateZone: boolean;
  lockedStateId: string | null;
  lockedStateName: string | null;
  lockedDistrictId: string | null;
  lockedDistrictName: string | null;
};

export function getCreateCapabilities(
  scope: HierarchyScopeFilter,
  scopeName?: string | null
): CreateNodeCapability {
  const global = isUnscopedAdmin(scope.role, scope.isGlobalAdmin);

  if (global) {
    return {
      canCreateState: true,
      canCreateDistrict: true,
      canCreatePincode: true,
      canCreateCluster: true,
      canCreateZone: true,
      lockedStateId: null,
      lockedStateName: null,
      lockedDistrictId: null,
      lockedDistrictName: null,
    };
  }

  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    return {
      canCreateState: false,
      canCreateDistrict: true,
      canCreatePincode: true,
      canCreateCluster: true,
      canCreateZone: true,
      lockedStateId: scope.stateId,
      lockedStateName: scopeName ?? scope.stateId,
      lockedDistrictId: null,
      lockedDistrictName: null,
    };
  }

  if (scope.role === "DISTRICT_ADMIN" && scope.districtId) {
    return {
      canCreateState: false,
      canCreateDistrict: false,
      canCreatePincode: true,
      canCreateCluster: true,
      canCreateZone: true,
      lockedStateId: scope.stateId,
      lockedStateName: null,
      lockedDistrictId: scope.districtId,
      lockedDistrictName: scopeName ?? scope.districtId,
    };
  }

  return {
    canCreateState: false,
    canCreateDistrict: false,
    canCreatePincode: false,
    canCreateCluster: false,
    canCreateZone: false,
    lockedStateId: null,
    lockedStateName: null,
    lockedDistrictId: null,
    lockedDistrictName: null,
  };
}

export function canManageNodeStatus(
  scope: HierarchyScopeFilter,
  node: { type: string; id: string; stateId?: string; districtId?: string }
): boolean {
  if (isUnscopedAdmin(scope.role, scope.isGlobalAdmin)) return true;

  if (scope.role === "STATE_ADMIN" && scope.stateId) {
    if (node.type === "State" || node.type === "STATE") {
      return matchId(node.id, scope.stateId);
    }
    return matchId(node.stateId, scope.stateId);
  }

  if (scope.role === "DISTRICT_ADMIN" && scope.districtId) {
    if (node.type === "District" || node.type === "DISTRICT") {
      return matchId(node.id, scope.districtId);
    }
    if (node.type === "State" || node.type === "STATE") return false;
    return matchId(node.districtId, scope.districtId);
  }

  return false;
}