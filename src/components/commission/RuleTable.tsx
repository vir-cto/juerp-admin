"use client";

import { useMemo, useState } from "react";
import type {
  CommissionModule,
  CommissionType,
  CommissionRuleStatus,
} from "./CommissionRuleForm";

export interface CommissionRule {
  ruleId: string;
  module: CommissionModule;
  commissionType: CommissionType;
  commissionValue: number;
  effectiveFrom: string;
  effectiveTo?: string;
  status: CommissionRuleStatus;
  reason: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RuleTableProps {
  rules: CommissionRule[];
  onEdit?: (
    rule: CommissionRule
  ) => void;
  onToggleStatus?: (
    rule: CommissionRule
  ) => void;
  onView?: (
    rule: CommissionRule
  ) => void;
  onDelete?: (
    rule: CommissionRule
  ) => void;
  loading?: boolean;
  readOnly?: boolean;
}

const MODULE_LABELS: Record<
  CommissionModule,
  string
> = {
  JUCART: "JuCart",
  JURIDE: "JuRide",
  JUSTAY: "JuStay",
  JUHOME: "JuHome",
  JUSHOPPING: "JuShopping",
};

function formatCurrency(
  amount: number
): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatCommissionValue(
  type: CommissionType,
  value: number
): string {
  if (type === "PERCENTAGE") {
    return `${value}%`;
  }

  return formatCurrency(value);
}

function formatDate(
  value?: string
): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getModuleClasses(
  module: CommissionModule
): string {
  switch (module) {
    case "JUCART":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "JURIDE":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "JUSTAY":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "JUHOME":
      return "bg-green-50 text-green-700 border-green-200";

    case "JUSHOPPING":
      return "bg-pink-50 text-pink-700 border-pink-200";

    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
}

function getStatusClasses(
  status: CommissionRuleStatus
): string {
  if (status === "ACTIVE") {
    return "bg-green-50 text-green-700 border-green-200";
  }

  return "bg-slate-100 text-slate-600 border-slate-200";
}

export default function RuleTable({
  rules,
  onEdit,
  onToggleStatus,
  onView,
  onDelete,
  loading = false,
  readOnly = false,
}: RuleTableProps) {
  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<"ALL" | CommissionRuleStatus>(
      "ALL"
    );

  const [moduleFilter, setModuleFilter] =
    useState<
      "ALL" | CommissionModule
    >("ALL");

  const [selectedRule, setSelectedRule] =
    useState<CommissionRule | null>(
      null
    );

  const [
    showDetails,
    setShowDetails,
  ] = useState(false);

  const filteredRules = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return rules.filter((rule) => {
      const matchesSearch =
        !query ||
        rule.ruleId
          .toLowerCase()
          .includes(query) ||
        rule.module
          .toLowerCase()
          .includes(query) ||
        MODULE_LABELS[rule.module]
          .toLowerCase()
          .includes(query) ||
        rule.reason
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "ALL" ||
        rule.status === statusFilter;

      const matchesModule =
        moduleFilter === "ALL" ||
        rule.module === moduleFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesModule
      );
    });
  }, [
    rules,
    search,
    statusFilter,
    moduleFilter,
  ]);

  const summary = useMemo(() => {
    const active = rules.filter(
      (rule) =>
        rule.status === "ACTIVE"
    ).length;

    const inactive = rules.filter(
      (rule) =>
        rule.status === "INACTIVE"
    ).length;

    const percentageRules =
      rules.filter(
        (rule) =>
          rule.commissionType ===
          "PERCENTAGE"
      ).length;

    const fixedRules =
      rules.filter(
        (rule) =>
          rule.commissionType ===
          "FIXED"
      ).length;

    return {
      total: rules.length,
      active,
      inactive,
      percentageRules,
      fixedRules,
    };
  }, [rules]);

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
    setModuleFilter("ALL");
  }

  function handleView(
    rule: CommissionRule
  ) {
    if (onView) {
      onView(rule);
      return;
    }

    setSelectedRule(rule);
    setShowDetails(true);
  }

  function closeDetails() {
    setSelectedRule(null);
    setShowDetails(false);
  }

  return (
    <div className="space-y-5">
      {/* SUMMARY */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

        <SummaryCard
          label="Total Rules"
          value={summary.total}
          icon="Σ"
        />

        <SummaryCard
          label="Active"
          value={summary.active}
          icon="✓"
        />

        <SummaryCard
          label="Inactive"
          value={summary.inactive}
          icon="○"
        />

        <SummaryCard
          label="Percentage"
          value={summary.percentageRules}
          icon="%"
        />

        <SummaryCard
          label="Fixed"
          value={summary.fixedRules}
          icon="₹"
        />

      </div>

      {/* FILTERS */}

      <div className="rounded-2xl border border-slate-200 bg-white p-4">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

          {/* SEARCH */}

          <div className="flex-1">
            <label
              htmlFor="rule-search"
              className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-slate-500"
            >
              Search Rules
            </label>

            <div className="relative">

              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ⌕
              </span>

              <input
                id="rule-search"
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by rule ID, module or reason..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-xs text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />

            </div>
          </div>

          {/* STATUS */}

          <div className="w-full lg:w-44">
            <label
              htmlFor="rule-status"
              className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-slate-500"
            >
              Status
            </label>

            <select
              id="rule-status"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target
                    .value as
                    | "ALL"
                    | CommissionRuleStatus
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="ALL">
                All Statuses
              </option>

              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </div>

          {/* MODULE */}

          <div className="w-full lg:w-48">
            <label
              htmlFor="rule-module"
              className="mb-2 block text-[10px] font-bold uppercase tracking-wide text-slate-500"
            >
              Module
            </label>

            <select
              id="rule-module"
              value={moduleFilter}
              onChange={(event) =>
                setModuleFilter(
                  event.target
                    .value as
                    | "ALL"
                    | CommissionModule
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              <option value="ALL">
                All Modules
              </option>

              {(
                Object.keys(
                  MODULE_LABELS
                ) as CommissionModule[]
              ).map((module) => (
                <option
                  key={module}
                  value={module}
                >
                  {MODULE_LABELS[module]}
                </option>
              ))}
            </select>
          </div>

          {/* CLEAR */}

          {(search ||
            statusFilter !== "ALL" ||
            moduleFilter !== "ALL") && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>
          )}

        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

          <p className="text-[10px] text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {filteredRules.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {rules.length}
            </span>{" "}
            rules
          </p>

          {loading && (
            <div className="flex items-center gap-2 text-[10px] font-semibold text-orange-600">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
              Loading...
            </div>
          )}

        </div>
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Rule
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Module
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Commission
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Effective Period
                </th>

                <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-[10px] font-black uppercase tracking-wide text-slate-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {filteredRules.map(
                (rule) => (
                  <tr
                    key={rule.ruleId}
                    className="transition hover:bg-slate-50"
                  >

                    {/* RULE */}

                    <td className="px-5 py-4">

                      <div>
                        <p className="text-xs font-black text-slate-900">
                          {rule.ruleId}
                        </p>

                        <p className="mt-1 max-w-[260px] truncate text-[10px] text-slate-500">
                          {rule.reason}
                        </p>
                      </div>

                    </td>

                    {/* MODULE */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getModuleClasses(
                          rule.module
                        )}`}
                      >
                        {MODULE_LABELS[
                          rule.module
                        ]}
                      </span>

                      <p className="mt-1 text-[9px] font-semibold text-slate-400">
                        {rule.module}
                      </p>

                    </td>

                    {/* COMMISSION */}

                    <td className="px-5 py-4">

                      <p className="text-sm font-black text-slate-900">
                        {formatCommissionValue(
                          rule.commissionType,
                          rule.commissionValue
                        )}
                      </p>

                      <p className="mt-1 text-[9px] font-semibold uppercase text-slate-400">
                        {rule.commissionType}
                      </p>

                    </td>

                    {/* DATES */}

                    <td className="px-5 py-4">

                      <p className="text-xs font-semibold text-slate-700">
                        {formatDate(
                          rule.effectiveFrom
                        )}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-400">
                        to{" "}
                        {formatDate(
                          rule.effectiveTo
                        )}
                      </p>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClasses(
                          rule.status
                        )}`}
                      >
                        {rule.status}
                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            handleView(
                              rule
                            )
                          }
                          className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          View
                        </button>

                        {!readOnly &&
                          onEdit && (
                            <button
                              type="button"
                              onClick={() =>
                                onEdit(
                                  rule
                                )
                              }
                              className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-[10px] font-bold text-orange-700 transition hover:bg-orange-100"
                            >
                              Edit
                            </button>
                          )}

                        {!readOnly &&
                          onToggleStatus && (
                            <button
                              type="button"
                              onClick={() =>
                                onToggleStatus(
                                  rule
                                )
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600 transition hover:bg-slate-50"
                            >
                              {rule.status ===
                              "ACTIVE"
                                ? "Disable"
                                : "Enable"}
                            </button>
                          )}

                        {!readOnly &&
                          onDelete && (
                            <button
                              type="button"
                              onClick={() =>
                                onDelete(
                                  rule
                                )
                              }
                              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-bold text-red-600 transition hover:bg-red-100"
                            >
                              Delete
                            </button>
                          )}

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

        {filteredRules.length === 0 && (
          <EmptyState
            hasFilters={
              Boolean(search) ||
              statusFilter !== "ALL" ||
              moduleFilter !== "ALL"
            }
            onClear={clearFilters}
          />
        )}

      </div>

      {/* MOBILE CARDS */}

      <div className="space-y-3 lg:hidden">

        {filteredRules.map(
          (rule) => (
            <div
              key={rule.ruleId}
              className="rounded-2xl border border-slate-200 bg-white p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-black text-slate-900">
                    {rule.ruleId}
                  </p>

                  <p className="mt-1 text-[10px] text-slate-500">
                    {rule.reason}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-2 py-1 text-[9px] font-bold ${getStatusClasses(
                    rule.status
                  )}`}
                >
                  {rule.status}
                </span>

              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <MobileInfo
                  label="Module"
                  value={
                    MODULE_LABELS[
                      rule.module
                    ]
                  }
                />

                <MobileInfo
                  label="Commission"
                  value={formatCommissionValue(
                    rule.commissionType,
                    rule.commissionValue
                  )}
                />

                <MobileInfo
                  label="Type"
                  value={
                    rule.commissionType
                  }
                />

                <MobileInfo
                  label="Effective From"
                  value={formatDate(
                    rule.effectiveFrom
                  )}
                />

                <MobileInfo
                  label="Effective To"
                  value={formatDate(
                    rule.effectiveTo
                  )}
                />

                <MobileInfo
                  label="Rule ID"
                  value={rule.ruleId}
                />

              </div>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    handleView(rule)
                  }
                  className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600"
                >
                  View
                </button>

                {!readOnly &&
                  onEdit && (
                    <button
                      type="button"
                      onClick={() =>
                        onEdit(rule)
                      }
                      className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-[10px] font-bold text-orange-700"
                    >
                      Edit
                    </button>
                  )}

                {!readOnly &&
                  onToggleStatus && (
                    <button
                      type="button"
                      onClick={() =>
                        onToggleStatus(rule)
                      }
                      className="rounded-lg border border-slate-200 px-3 py-2 text-[10px] font-bold text-slate-600"
                    >
                      {rule.status ===
                      "ACTIVE"
                        ? "Disable"
                        : "Enable"}
                    </button>
                  )}

                {!readOnly &&
                  onDelete && (
                    <button
                      type="button"
                      onClick={() =>
                        onDelete(rule)
                      }
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[10px] font-bold text-red-600"
                    >
                      Delete
                    </button>
                  )}

              </div>

            </div>
          )
        )}

        {filteredRules.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white">
            <EmptyState
              hasFilters={
                Boolean(search) ||
                statusFilter !== "ALL" ||
                moduleFilter !== "ALL"
              }
              onClear={clearFilters}
            />
          </div>
        )}

      </div>

      {/* DETAILS MODAL */}

      {showDetails &&
        selectedRule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

              {/* MODAL HEADER */}

              <div className="flex items-start justify-between border-b border-slate-200 p-5">

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-orange-600">
                    Commission Rule
                  </p>

                  <h3 className="mt-1 text-lg font-black text-slate-900">
                    {selectedRule.ruleId}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeDetails}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500 transition hover:bg-slate-200"
                >
                  ×
                </button>

              </div>

              {/* MODAL BODY */}

              <div className="space-y-5 p-5">

                <div className="grid gap-4 sm:grid-cols-2">

                  <DetailItem
                    label="Module"
                    value={`${MODULE_LABELS[selectedRule.module]} (${selectedRule.module})`}
                  />

                  <DetailItem
                    label="Status"
                    value={selectedRule.status}
                  />

                  <DetailItem
                    label="Commission Type"
                    value={
                      selectedRule.commissionType
                    }
                  />

                  <DetailItem
                    label="Commission Value"
                    value={formatCommissionValue(
                      selectedRule.commissionType,
                      selectedRule.commissionValue
                    )}
                  />

                  <DetailItem
                    label="Effective From"
                    value={formatDate(
                      selectedRule.effectiveFrom
                    )}
                  />

                  <DetailItem
                    label="Effective To"
                    value={formatDate(
                      selectedRule.effectiveTo
                    )}
                  />

                  <DetailItem
                    label="Created At"
                    value={formatDate(
                      selectedRule.createdAt
                    )}
                  />

                  <DetailItem
                    label="Updated At"
                    value={formatDate(
                      selectedRule.updatedAt
                    )}
                  />

                </div>

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    Governance Reason
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-700">
                    {selectedRule.reason ||
                      "No reason provided."}
                  </p>

                </div>

                <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">

                  <p className="text-xs font-black text-orange-900">
                    Financial Authority
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-orange-800">
                    This table displays commission-rule
                    configuration. The browser must not
                    independently determine financial
                    settlement or payout values. The
                    trusted backend and JUERP governance
                    layer must validate the applicable
                    rule before financial calculation.
                  </p>

                </div>

              </div>

              {/* MODAL FOOTER */}

              <div className="flex justify-end border-t border-slate-200 p-5">

                <button
                  type="button"
                  onClick={closeDetails}
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                >
                  Close
                </button>

              </div>

            </div>

          </div>
        )}
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: number;
  icon: string;
}

function SummaryCard({
  label,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">

      <div className="flex items-center justify-between">

        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500">
          {label}
        </span>

        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-xs font-black text-orange-600">
          {icon}
        </span>

      </div>

      <p className="mt-3 text-2xl font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}

interface MobileInfoProps {
  label: string;
  value: string;
}

function MobileInfo({
  label,
  value,
}: MobileInfoProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-[11px] font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">

      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-xs font-bold text-slate-800">
        {value}
      </p>

    </div>
  );
}

interface EmptyStateProps {
  hasFilters: boolean;
  onClear: () => void;
}

function EmptyState({
  hasFilters,
  onClear,
}: EmptyStateProps) {
  return (
    <div className="px-5 py-12 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-400">
        %
      </div>

      <h3 className="mt-4 text-sm font-black text-slate-800">
        No commission rules found
      </h3>

      <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-500">
        {hasFilters
          ? "No rules match the selected search or filters."
          : "There are currently no commission rules to display."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-xl bg-orange-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-orange-600"
        >
          Clear Filters
        </button>
      )}

    </div>
  );
}