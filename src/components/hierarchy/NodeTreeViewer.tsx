"use client";

import {
  useMemo,
  useState,
} from "react";

export type HierarchyNodeType =
  | "STATE"
  | "DISTRICT"
  | "PINCODE";

export type HierarchyNodeStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED";

export interface HierarchyTreeNode {
  nodeId: string;

  nodeType: HierarchyNodeType;

  nodeName: string;

  nodeCode: string;

  status: HierarchyNodeStatus;

  stateId?: string;

  stateName?: string;

  districtId?: string;

  districtName?: string;

  pincode?: string;

  description?: string;

  vendorCount?: number;

  captainCount?: number;

  customerCount?: number;

  orderCount?: number;

  children?: HierarchyTreeNode[];
}

interface NodeTreeViewerProps {
  nodes: HierarchyTreeNode[];

  loading?: boolean;

  searchable?: boolean;

  showSearch?: boolean;

  showCounts?: boolean;

  showStatus?: boolean;

  defaultExpanded?: boolean;

  selectedNodeId?: string;

  onNodeSelect?: (
    node: HierarchyTreeNode
  ) => void;

  onEditNode?: (
    node: HierarchyTreeNode
  ) => void;

  onCreateChild?: (
    node: HierarchyTreeNode
  ) => void;

  className?: string;

  emptyMessage?: string;
}

const NODE_TYPE_CONFIG: Record<
  HierarchyNodeType,
  {
    label: string;
    shortLabel: string;
  }
> = {
  STATE: {
    label: "State",
    shortLabel: "State",
  },

  DISTRICT: {
    label: "District",
    shortLabel: "District",
  },

  PINCODE: {
    label: "Pincode",
    shortLabel: "Pincode",
  },
};

function getStatusClasses(
  status: HierarchyNodeStatus
): string {
  switch (status) {
    case "ACTIVE":
      return "border-green-200 bg-green-50 text-green-700";

    case "INACTIVE":
      return "border-slate-200 bg-slate-100 text-slate-600";

    case "BLOCKED":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-slate-200 bg-slate-100 text-slate-600";
  }
}

function getNodeTypeClasses(
  type: HierarchyNodeType
): string {
  switch (type) {
    case "STATE":
      return "bg-orange-100 text-orange-700";

    case "DISTRICT":
      return "bg-blue-100 text-blue-700";

    case "PINCODE":
      return "bg-purple-100 text-purple-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function formatNumber(
  value?: number
): string {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(value ?? 0);
}

function normalizeSearch(
  value: string
): string {
  return value
    .trim()
    .toLowerCase();
}

function nodeMatchesSearch(
  node: HierarchyTreeNode,
  search: string
): boolean {
  if (!search) {
    return true;
  }

  const values = [
    node.nodeId,
    node.nodeName,
    node.nodeCode,
    node.nodeType,
    node.status,
    node.stateName,
    node.districtName,
    node.pincode,
    node.description,
  ];

  return values.some(
    (value) =>
      value
        ?.toString()
        .toLowerCase()
        .includes(search)
  );
}

function filterTree(
  nodes: HierarchyTreeNode[],
  search: string
): HierarchyTreeNode[] {
  if (!search) {
    return nodes;
  }

  const filtered: HierarchyTreeNode[] =
    [];

  for (const node of nodes) {
    const filteredChildren =
      filterTree(
        node.children ?? [],
        search
      );

    const matches =
      nodeMatchesSearch(
        node,
        search
      );

    if (
      matches ||
      filteredChildren.length > 0
    ) {
      filtered.push({
        ...node,
        children:
          filteredChildren,
      });
    }
  }

  return filtered;
}

function countAllNodes(
  nodes: HierarchyTreeNode[]
): number {
  return nodes.reduce(
    (total, node) =>
      total +
      1 +
      countAllNodes(
        node.children ?? []
      ),
    0
  );
}

function countByType(
  nodes: HierarchyTreeNode[],
  type: HierarchyNodeType
): number {
  return nodes.reduce(
    (total, node) =>
      total +
      (node.nodeType ===
      type
        ? 1
        : 0) +
      countByType(
        node.children ?? [],
        type
      ),
    0
  );
}

function countByStatus(
  nodes: HierarchyTreeNode[],
  status: HierarchyNodeStatus
): number {
  return nodes.reduce(
    (total, node) =>
      total +
      (node.status ===
      status
        ? 1
        : 0) +
      countByStatus(
        node.children ?? [],
        status
      ),
    0
  );
}

export default function NodeTreeViewer({
  nodes,
  loading = false,
  searchable = true,
  showSearch = true,
  showCounts = true,
  showStatus = true,
  defaultExpanded = true,
  selectedNodeId,
  onNodeSelect,
  onEditNode,
  onCreateChild,
  className = "",
  emptyMessage = "No hierarchy nodes found.",
}: NodeTreeViewerProps) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    expandedNodes,
    setExpandedNodes,
  ] = useState<
    Set<string>
  >(
    () =>
      new Set(
        defaultExpanded
          ? getExpandableNodeIds(
              nodes
            )
          : []
      )
  );

  const normalizedSearch =
    normalizeSearch(search);

  const filteredNodes =
    useMemo(
      () =>
        filterTree(
          nodes,
          normalizedSearch
        ),
      [nodes, normalizedSearch]
    );

  const totalNodes =
    useMemo(
      () =>
        countAllNodes(
          nodes
        ),
      [nodes]
    );

  const stateCount =
    useMemo(
      () =>
        countByType(
          nodes,
          "STATE"
        ),
      [nodes]
    );

  const districtCount =
    useMemo(
      () =>
        countByType(
          nodes,
          "DISTRICT"
        ),
      [nodes]
    );

  const pincodeCount =
    useMemo(
      () =>
        countByType(
          nodes,
          "PINCODE"
        ),
      [nodes]
    );

  const activeCount =
    useMemo(
      () =>
        countByStatus(
          nodes,
          "ACTIVE"
        ),
      [nodes]
    );

  const toggleNode = (
    nodeId: string
  ) => {
    setExpandedNodes(
      (current) => {
        const next =
          new Set(current);

        if (
          next.has(nodeId)
        ) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }

        return next;
      }
    );
  };

  const expandAll = () => {
    setExpandedNodes(
      new Set(
        getExpandableNodeIds(
          nodes
        )
      )
    );
  };

  const collapseAll = () => {
    setExpandedNodes(
      new Set()
    );
  };

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);

    if (value.trim()) {
      setExpandedNodes(
        new Set(
          getExpandableNodeIds(
            nodes
          )
        )
      );
    }
  };

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white ${className}`}
    >
      {/* HEADER */}

      <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <HierarchyIcon />
              </div>

              <div>

                <h2 className="text-base font-black text-slate-900">
                  Hierarchy Tree
                </h2>

                <p className="mt-1 text-[9px] leading-4 text-slate-500">
                  Administrative hierarchy and
                  operational scope.
                </p>

              </div>

            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            <button
              type="button"
              onClick={expandAll}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Expand All
            </button>

            <button
              type="button"
              onClick={collapseAll}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Collapse All
            </button>

          </div>

        </div>

        {/* SUMMARY */}

        {showCounts && (
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-5">

            <SummaryCard
              label="Total Nodes"
              value={totalNodes}
              variant="orange"
            />

            <SummaryCard
              label="States"
              value={stateCount}
              variant="orange"
            />

            <SummaryCard
              label="Districts"
              value={districtCount}
              variant="blue"
            />

            <SummaryCard
              label="Pincodes"
              value={pincodeCount}
              variant="purple"
            />

            <SummaryCard
              label="Active"
              value={activeCount}
              variant="green"
            />

          </div>
        )}

      </div>

      {/* SEARCH */}

      {searchable &&
        showSearch && (
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">

            <div className="relative">

              <SearchIcon />

              <input
                type="text"
                value={search}
                onChange={(
                  event
                ) =>
                  handleSearchChange(
                    event.target
                      .value
                  )
                }
                placeholder="Search node name, code, ID, state, district or pincode..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-10 text-[10px] font-medium text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-2 focus:ring-orange-100"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    handleSearchChange(
                      ""
                    )
                  }
                  className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-sm font-bold text-slate-400 hover:bg-slate-200 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}

            </div>

            {search && (
              <p className="mt-2 text-[8px] text-slate-400">
                Showing matching nodes and
                their parent hierarchy.
              </p>
            )}

          </div>
        )}

      {/* TREE */}

      <div className="p-5 sm:p-6">

        {loading ? (
          <TreeLoading />
        ) : filteredNodes.length ===
          0 ? (
          <EmptyTree
            message={
              search
                ? "No hierarchy nodes match your search."
                : emptyMessage
            }
          />
        ) : (
          <div className="overflow-x-auto">

            <div className="min-w-[680px]">

              {filteredNodes.map(
                (node) => (
                  <TreeNode
                    key={
                      node.nodeId
                    }
                    node={node}
                    level={0}
                    expandedNodes={
                      expandedNodes
                    }
                    selectedNodeId={
                      selectedNodeId
                    }
                    showCounts={
                      showCounts
                    }
                    showStatus={
                      showStatus
                    }
                    onToggle={
                      toggleNode
                    }
                    onSelect={
                      onNodeSelect
                    }
                    onEdit={
                      onEditNode
                    }
                    onCreateChild={
                      onCreateChild
                    }
                  />
                )
              )}

            </div>

          </div>
        )}

      </div>

      {/* LEGEND */}

      <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:px-6">

        <div className="flex flex-wrap items-center gap-4">

          <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">
            Node Types
          </span>

          <LegendItem
            label="State"
            className="bg-orange-100 text-orange-700"
          />

          <LegendItem
            label="District"
            className="bg-blue-100 text-blue-700"
          />

          <LegendItem
            label="Pincode"
            className="bg-purple-100 text-purple-700"
          />

          <span className="ml-0 hidden h-4 w-px bg-slate-200 sm:block" />

          <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">
            Status
          </span>

          <LegendItem
            label="Active"
            className="bg-green-100 text-green-700"
          />

          <LegendItem
            label="Inactive"
            className="bg-slate-100 text-slate-600"
          />

          <LegendItem
            label="Blocked"
            className="bg-red-100 text-red-700"
          />

        </div>

      </div>

      {/* GOVERNANCE */}

      <div className="border-t border-orange-100 bg-orange-50/60 px-5 py-3 sm:px-6">

        <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
          Hierarchy Governance
        </p>

        <p className="mt-1 text-[9px] leading-4 text-orange-700">
          This tree is a visualization of
          authoritative hierarchy data. Node
          creation, editing, activation,
          blocking, scope assignment, and
          parent-child relationships must be
          validated by the trusted JUERP backend.
          The browser must not independently
          establish administrative scope.
        </p>

      </div>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* TREE NODE */
/* -------------------------------------------------------------------------- */

interface TreeNodeProps {
  node: HierarchyTreeNode;

  level: number;

  expandedNodes: Set<string>;

  selectedNodeId?: string;

  showCounts: boolean;

  showStatus: boolean;

  onToggle: (
    nodeId: string
  ) => void;

  onSelect?: (
    node: HierarchyTreeNode
  ) => void;

  onEdit?: (
    node: HierarchyTreeNode
  ) => void;

  onCreateChild?: (
    node: HierarchyTreeNode
  ) => void;
}

function TreeNode({
  node,
  level,
  expandedNodes,
  selectedNodeId,
  showCounts,
  showStatus,
  onToggle,
  onSelect,
  onEdit,
  onCreateChild,
}: TreeNodeProps) {
  const hasChildren =
    (node.children?.length ??
      0) > 0;

  const expanded =
    expandedNodes.has(
      node.nodeId
    );

  const selected =
    selectedNodeId ===
    node.nodeId;

  const canCreateChild =
    node.nodeType !==
    "PINCODE";

  return (
    <div className="relative">

      {/* NODE ROW */}

      <div
        className={`group relative flex items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
          selected
            ? "border-orange-300 bg-orange-50 shadow-sm"
            : "border-transparent hover:border-slate-200 hover:bg-slate-50"
        }`}
        style={{
          marginLeft: `${level * 32}px`,
        }}
      >

        {/* CONNECTOR */}

        {level > 0 && (
          <div
            className="absolute bottom-1/2 -left-6 h-px w-6 bg-slate-200"
            aria-hidden="true"
          />
        )}

        {/* EXPAND BUTTON */}

        <button
          type="button"
          onClick={() =>
            hasChildren &&
            onToggle(
              node.nodeId
            )
          }
          disabled={!hasChildren}
          aria-label={
            hasChildren
              ? expanded
                ? `Collapse ${node.nodeName}`
                : `Expand ${node.nodeName}`
              : `${node.nodeName} has no children`
          }
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
            hasChildren
              ? "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
              : "cursor-default text-slate-200"
          }`}
        >
          {hasChildren ? (
            <ChevronIcon
              expanded={
                expanded
              }
            />
          ) : (
            <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          )}
        </button>

        {/* NODE ICON */}

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${getNodeTypeClasses(
            node.nodeType
          )}`}
        >
          <NodeTypeIcon
            type={
              node.nodeType
            }
          />
        </div>

        {/* MAIN INFORMATION */}

        <button
          type="button"
          onClick={() =>
            onSelect?.(node)
          }
          className="min-w-0 flex-1 text-left"
        >

          <div className="flex flex-wrap items-center gap-2">

            <span className="truncate text-[10px] font-black text-slate-800 sm:text-xs">
              {node.nodeName}
            </span>

            <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[7px] font-bold text-slate-500">
              {node.nodeCode}
            </span>

            <span className="hidden rounded-md bg-slate-50 px-1.5 py-0.5 text-[7px] font-medium text-slate-400 lg:inline-flex">
              {node.nodeId}
            </span>

          </div>

          <div className="mt-1 flex flex-wrap items-center gap-2">

            <span className="text-[8px] font-medium text-slate-400">
              {
                NODE_TYPE_CONFIG[
                  node.nodeType
                ].label
              }
            </span>

            {node.stateName && (
              <>
                <span className="text-[7px] text-slate-300">
                  •
                </span>

                <span className="text-[8px] text-slate-400">
                  {node.stateName}
                </span>
              </>
            )}

            {node.districtName && (
              <>
                <span className="text-[7px] text-slate-300">
                  •
                </span>

                <span className="text-[8px] text-slate-400">
                  {
                    node.districtName
                  }
                </span>
              </>
            )}

            {node.pincode && (
              <>
                <span className="text-[7px] text-slate-300">
                  •
                </span>

                <span className="font-mono text-[8px] text-slate-400">
                  {node.pincode}
                </span>
              </>
            )}

          </div>

        </button>

        {/* COUNTS */}

        {showCounts && (
          <div className="hidden shrink-0 items-center gap-1.5 xl:flex">

            {typeof node.vendorCount ===
              "number" && (
              <CountBadge
                label="V"
                value={
                  node.vendorCount
                }
                title="Vendors"
              />
            )}

            {typeof node.captainCount ===
              "number" && (
              <CountBadge
                label="C"
                value={
                  node.captainCount
                }
                title="Captains"
              />
            )}

            {typeof node.customerCount ===
              "number" && (
              <CountBadge
                label="U"
                value={
                  node.customerCount
                }
                title="Customers"
              />
            )}

            {typeof node.orderCount ===
              "number" && (
              <CountBadge
                label="O"
                value={
                  node.orderCount
                }
                title="Orders"
              />
            )}

          </div>
        )}

        {/* STATUS */}

        {showStatus && (
          <span
            className={`hidden shrink-0 rounded-full border px-2 py-1 text-[7px] font-black uppercase sm:inline-flex ${getStatusClasses(
              node.status
            )}`}
          >
            {node.status}
          </span>
        )}

        {/* ACTIONS */}

        <div className="flex shrink-0 items-center gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">

          {onCreateChild &&
            canCreateChild && (
              <button
                type="button"
                onClick={(
                  event
                ) => {
                  event.stopPropagation();
                  onCreateChild(
                    node
                  );
                }}
                title="Create child node"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-slate-400 hover:bg-orange-100 hover:text-orange-600"
              >
                +
              </button>
            )}

          {onEdit && (
            <button
              type="button"
              onClick={(
                event
              ) => {
                event.stopPropagation();
                onEdit(node);
              }}
              title="Edit node"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              <EditIcon />
            </button>
          )}

        </div>

      </div>

      {/* CHILDREN */}

      {hasChildren &&
        expanded && (
          <div className="relative">

            {/* VERTICAL CONNECTOR */}

            {level >= 0 && (
              <div
                className="absolute top-0 bottom-5 w-px bg-slate-200"
                style={{
                  left: `${
                    level *
                      32 +
                    13
                  }px`,
                }}
                aria-hidden="true"
              />
            )}

            {node.children!.map(
              (child) => (
                <TreeNode
                  key={
                    child.nodeId
                  }
                  node={
                    child
                  }
                  level={
                    level + 1
                  }
                  expandedNodes={
                    expandedNodes
                  }
                  selectedNodeId={
                    selectedNodeId
                  }
                  showCounts={
                    showCounts
                  }
                  showStatus={
                    showStatus
                  }
                  onToggle={
                    onToggle
                  }
                  onSelect={
                    onSelect
                  }
                  onEdit={
                    onEdit
                  }
                  onCreateChild={
                    onCreateChild
                  }
                />
              )
            )}

          </div>
        )}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SUMMARY CARD */
/* -------------------------------------------------------------------------- */

function SummaryCard({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant:
    | "orange"
    | "blue"
    | "purple"
    | "green";
}) {
  const classes = {
    orange:
      "border-orange-100 bg-orange-50 text-orange-700",

    blue:
      "border-blue-100 bg-blue-50 text-blue-700",

    purple:
      "border-purple-100 bg-purple-50 text-purple-700",

    green:
      "border-green-100 bg-green-50 text-green-700",
  };

  return (
    <div
      className={`rounded-xl border px-3 py-2.5 ${classes[variant]}`}
    >
      <p className="text-[7px] font-black uppercase tracking-wider opacity-70">
        {label}
      </p>

      <p className="mt-1 text-sm font-black">
        {formatNumber(
          value
        )}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* COUNT BADGE */
/* -------------------------------------------------------------------------- */

function CountBadge({
  label,
  value,
  title,
}: {
  label: string;
  value: number;
  title: string;
}) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-1.5 py-1"
    >
      <span className="text-[7px] font-black text-slate-400">
        {label}
      </span>

      <span className="text-[8px] font-bold text-slate-600">
        {formatNumber(
          value
        )}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* LEGEND */
/* -------------------------------------------------------------------------- */

function LegendItem({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-[7px] font-black ${className}`}
    >
      {label}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE */
/* -------------------------------------------------------------------------- */

function EmptyTree({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 px-6 text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <HierarchyIcon />
      </div>

      <p className="mt-3 text-xs font-bold text-slate-600">
        {message}
      </p>

      <p className="mt-1 max-w-sm text-[9px] leading-4 text-slate-400">
        Hierarchy information will appear here
        when authorized hierarchy data is
        available.
      </p>

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING */
/* -------------------------------------------------------------------------- */

function TreeLoading() {
  return (
    <div className="space-y-3">

      {Array.from({
        length: 6,
      }).map(
        (_, index) => (
          <div
            key={index}
            className="flex animate-pulse items-center gap-3 rounded-xl border border-slate-100 px-3 py-3"
            style={{
              marginLeft:
                `${(index % 3) * 32}px`,
            }}
          >

            <div className="h-7 w-7 rounded-lg bg-slate-100" />

            <div className="h-9 w-9 rounded-xl bg-slate-100" />

            <div className="flex-1">

              <div className="h-3 w-40 rounded bg-slate-100" />

              <div className="mt-2 h-2 w-24 rounded bg-slate-100" />

            </div>

            <div className="h-6 w-16 rounded-full bg-slate-100" />

          </div>
        )
      )}

    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function HierarchyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect
        x="8"
        y="3"
        width="8"
        height="5"
        rx="1"
      />

      <rect
        x="3"
        y="16"
        width="7"
        height="5"
        rx="1"
      />

      <rect
        x="14"
        y="16"
        width="7"
        height="5"
        rx="1"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 8v4M6.5 16v-4h11v4M12 12H6.5M12 12h5.5"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path
        strokeLinecap="round"
        d="m20 20-4-4"
      />
    </svg>
  );
}

function ChevronIcon({
  expanded,
}: {
  expanded: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`h-4 w-4 transition-transform ${
        expanded
          ? "rotate-90"
          : ""
      }`}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 6 6 6-6 6"
      />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20h9"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
      />
    </svg>
  );
}

function NodeTypeIcon({
  type,
}: {
  type: HierarchyNodeType;
}) {
  if (type === "STATE") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19V5"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 19h16"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 15l4-5 3 3 5-7"
        />
      </svg>
    );
  }

  if (type === "DISTRICT") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 21h18"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 21V7l7-4 7 4v14"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 21v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 4h16v16H4z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 8h8M8 12h8M8 16h5"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function getExpandableNodeIds(
  nodes: HierarchyTreeNode[]
): string[] {
  const ids: string[] = [];

  function walk(
    currentNodes: HierarchyTreeNode[]
  ) {
    for (const node of currentNodes) {
      if (
        node.children &&
        node.children.length > 0
      ) {
        ids.push(
          node.nodeId
        );

        walk(
          node.children
        );
      }
    }
  }

  walk(nodes);

  return ids;
}