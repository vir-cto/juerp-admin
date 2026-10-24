"use client";

import { FormEvent, useEffect, useState } from "react";

export type CommissionModule =
  | "JUCART"
  | "JURIDE"
  | "JUSTAY"
  | "JUHOME"
  | "JUSHOPPING";

export type CommissionType =
  | "PERCENTAGE"
  | "FIXED";

export type CommissionRuleStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface CommissionRuleFormData {
  ruleId?: string;
  module: CommissionModule;
  commissionType: CommissionType;
  commissionValue: number;
  effectiveFrom: string;
  effectiveTo?: string;
  status: CommissionRuleStatus;
  reason: string;
}

interface CommissionRuleFormProps {
  initialData?: Partial<CommissionRuleFormData>;
  onSubmit: (
    data: CommissionRuleFormData
  ) => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  loading?: boolean;
  readOnly?: boolean;
}

const MODULE_OPTIONS: {
  value: CommissionModule;
  label: string;
}[] = [
  {
    value: "JUCART",
    label: "JuCart",
  },
  {
    value: "JURIDE",
    label: "JuRide",
  },
  {
    value: "JUSTAY",
    label: "JuStay",
  },
  {
    value: "JUHOME",
    label: "JuHome",
  },
  {
    value: "JUSHOPPING",
    label: "JuShopping",
  },
];

const COMMISSION_TYPE_OPTIONS: {
  value: CommissionType;
  label: string;
}[] = [
  {
    value: "PERCENTAGE",
    label: "Percentage",
  },
  {
    value: "FIXED",
    label: "Fixed Amount",
  },
];

function getTodayDate(): string {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getInitialFormData(
  initialData?: Partial<CommissionRuleFormData>
): CommissionRuleFormData {
  return {
    ruleId: initialData?.ruleId ?? "",
    module: initialData?.module ?? "JUCART",
    commissionType:
      initialData?.commissionType ??
      "PERCENTAGE",
    commissionValue:
      initialData?.commissionValue ?? 0,
    effectiveFrom:
      initialData?.effectiveFrom ??
      getTodayDate(),
    effectiveTo:
      initialData?.effectiveTo ?? "",
    status:
      initialData?.status ?? "ACTIVE",
    reason:
      initialData?.reason ?? "",
  };
}

export default function CommissionRuleForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save Commission Rule",
  loading = false,
  readOnly = false,
}: CommissionRuleFormProps) {
  const [formData, setFormData] =
    useState<CommissionRuleFormData>(
      getInitialFormData(initialData)
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [submitError, setSubmitError] =
    useState("");

  useEffect(() => {
    setFormData(
      getInitialFormData(initialData)
    );

    setErrors({});
    setSubmitError("");
  }, [initialData]);

  function updateField<
    K extends keyof CommissionRuleFormData
  >(
    field: K,
    value: CommissionRuleFormData[K]
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSubmitError("");
  }

  function validateForm(): boolean {
    const nextErrors: Record<
      string,
      string
    > = {};

    if (!formData.module) {
      nextErrors.module =
        "Please select a module.";
    }

    if (!formData.commissionType) {
      nextErrors.commissionType =
        "Please select a commission type.";
    }

    if (
      !Number.isFinite(
        formData.commissionValue
      ) ||
      formData.commissionValue < 0
    ) {
      nextErrors.commissionValue =
        "Commission value cannot be negative.";
    }

    if (
      formData.commissionType ===
        "PERCENTAGE" &&
      formData.commissionValue > 100
    ) {
      nextErrors.commissionValue =
        "Percentage commission cannot exceed 100%.";
    }

    if (!formData.effectiveFrom) {
      nextErrors.effectiveFrom =
        "Effective-from date is required.";
    }

    if (
      formData.effectiveTo &&
      formData.effectiveFrom &&
      formData.effectiveTo <
        formData.effectiveFrom
    ) {
      nextErrors.effectiveTo =
        "Effective-to date cannot be before the effective-from date.";
    }

    if (!formData.reason.trim()) {
      nextErrors.reason =
        "Please provide a reason for this rule.";
    }

    setErrors(nextErrors);

    return (
      Object.keys(nextErrors).length === 0
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (readOnly || loading) {
      return;
    }

    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        ...formData,
        commissionValue: Number(
          formData.commissionValue
        ),
        reason: formData.reason.trim(),
        effectiveTo:
          formData.effectiveTo || "",
      });
    } catch (error) {
      console.error(
        "Commission rule submission failed:",
        error
      );

      setSubmitError(
        "Unable to save the commission rule. Please try again."
      );
    }
  }

  function handleReset() {
    setFormData(
      getInitialFormData(initialData)
    );

    setErrors({});
    setSubmitError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* HEADER */}

      <div>
        <h2 className="text-lg font-black text-slate-900">
          {initialData?.ruleId
            ? "Edit Commission Rule"
            : "Create Commission Rule"}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          Configure the commission rule for a
          JUONE module. Financial calculations must
          be validated by the trusted backend.
        </p>
      </div>

      {/* ERROR */}

      {submitError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 font-bold text-red-600">
              !
            </span>

            <div>
              <p className="text-xs font-bold text-red-800">
                Unable to save rule
              </p>

              <p className="mt-1 text-xs text-red-700">
                {submitError}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* RULE CONFIGURATION */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5">
          <h3 className="text-sm font-black text-slate-900">
            Rule Configuration
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Select the JUONE module and commission
            model.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* MODULE */}

          <div>
            <label
              htmlFor="commission-module"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Module
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="commission-module"
              value={formData.module}
              disabled={loading || readOnly}
              onChange={(event) =>
                updateField(
                  "module",
                  event.target
                    .value as CommissionModule
                )
              }
              className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                errors.module
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
              } ${
                readOnly
                  ? "cursor-not-allowed bg-slate-50"
                  : ""
              }`}
            >
              {MODULE_OPTIONS.map(
                (module) => (
                  <option
                    key={module.value}
                    value={module.value}
                  >
                    {module.label} (
                    {module.value})
                  </option>
                )
              )}
            </select>

            {errors.module && (
              <p className="mt-1 text-[10px] font-medium text-red-600">
                {errors.module}
              </p>
            )}
          </div>

          {/* TYPE */}

          <div>
            <label
              htmlFor="commission-type"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Commission Type
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="commission-type"
              value={formData.commissionType}
              disabled={loading || readOnly}
              onChange={(event) =>
                updateField(
                  "commissionType",
                  event.target
                    .value as CommissionType
                )
              }
              className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                errors.commissionType
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
              } ${
                readOnly
                  ? "cursor-not-allowed bg-slate-50"
                  : ""
              }`}
            >
              {COMMISSION_TYPE_OPTIONS.map(
                (option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>

            {errors.commissionType && (
              <p className="mt-1 text-[10px] font-medium text-red-600">
                {errors.commissionType}
              </p>
            )}
          </div>

          {/* VALUE */}

          <div>
            <label
              htmlFor="commission-value"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Commission Value
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">
              <input
                id="commission-value"
                type="number"
                min="0"
                max={
                  formData.commissionType ===
                  "PERCENTAGE"
                    ? "100"
                    : undefined
                }
                step="0.01"
                value={
                  formData.commissionValue
                }
                disabled={loading || readOnly}
                onChange={(event) =>
                  updateField(
                    "commissionValue",
                    Number(
                      event.target.value
                    )
                  )
                }
                className={`w-full rounded-xl border bg-white px-3 py-3 pr-14 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                  errors.commissionValue
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                } ${
                  readOnly
                    ? "cursor-not-allowed bg-slate-50"
                    : ""
                }`}
                placeholder="0"
              />

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                {formData.commissionType ===
                "PERCENTAGE"
                  ? "%"
                  : "₹"}
              </span>
            </div>

            <p className="mt-1 text-[10px] text-slate-400">
              {formData.commissionType ===
              "PERCENTAGE"
                ? "Enter a value from 0 to 100."
                : "Enter the fixed amount in INR."}
            </p>

            {errors.commissionValue && (
              <p className="mt-1 text-[10px] font-medium text-red-600">
                {errors.commissionValue}
              </p>
            )}
          </div>

          {/* STATUS */}

          <div>
            <label
              htmlFor="commission-status"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Status
            </label>

            <select
              id="commission-status"
              value={formData.status}
              disabled={loading || readOnly}
              onChange={(event) =>
                updateField(
                  "status",
                  event.target
                    .value as CommissionRuleStatus
                )
              }
              className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 ${
                readOnly
                  ? "cursor-not-allowed bg-slate-50"
                  : ""
              }`}
            >
              <option value="ACTIVE">
                Active
              </option>

              <option value="INACTIVE">
                Inactive
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* EFFECTIVE PERIOD */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5">
          <h3 className="text-sm font-black text-slate-900">
            Effective Period
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Define when the commission rule is
            applicable.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {/* FROM */}

          <div>
            <label
              htmlFor="effective-from"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Effective From
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              id="effective-from"
              type="date"
              value={formData.effectiveFrom}
              disabled={loading || readOnly}
              onChange={(event) =>
                updateField(
                  "effectiveFrom",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                errors.effectiveFrom
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
              } ${
                readOnly
                  ? "cursor-not-allowed bg-slate-50"
                  : ""
              }`}
            />

            {errors.effectiveFrom && (
              <p className="mt-1 text-[10px] font-medium text-red-600">
                {errors.effectiveFrom}
              </p>
            )}
          </div>

          {/* TO */}

          <div>
            <label
              htmlFor="effective-to"
              className="mb-2 block text-xs font-bold text-slate-700"
            >
              Effective To
              <span className="ml-1 text-[10px] font-normal text-slate-400">
                Optional
              </span>
            </label>

            <input
              id="effective-to"
              type="date"
              value={formData.effectiveTo ?? ""}
              disabled={loading || readOnly}
              onChange={(event) =>
                updateField(
                  "effectiveTo",
                  event.target.value
                )
              }
              className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                errors.effectiveTo
                  ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                  : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
              } ${
                readOnly
                  ? "cursor-not-allowed bg-slate-50"
                  : ""
              }`}
            />

            {errors.effectiveTo && (
              <p className="mt-1 text-[10px] font-medium text-red-600">
                {errors.effectiveTo}
              </p>
            )}

            <p className="mt-1 text-[10px] text-slate-400">
              Leave empty if there is no planned end
              date.
            </p>
          </div>
        </div>
      </div>

      {/* GOVERNANCE */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="mb-5">
          <h3 className="text-sm font-black text-slate-900">
            Governance Information
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Record the reason for creating or changing
            this rule.
          </p>
        </div>

        <div>
          <label
            htmlFor="commission-reason"
            className="mb-2 block text-xs font-bold text-slate-700"
          >
            Reason
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <textarea
            id="commission-reason"
            value={formData.reason}
            disabled={loading || readOnly}
            onChange={(event) =>
              updateField(
                "reason",
                event.target.value
              )
            }
            rows={4}
            maxLength={500}
            placeholder="Enter the business reason for this commission rule..."
            className={`w-full resize-none rounded-xl border bg-white px-3 py-3 text-xs text-slate-700 outline-none transition focus:ring-2 ${
              errors.reason
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
            } ${
              readOnly
                ? "cursor-not-allowed bg-slate-50"
                : ""
            }`}
          />

          <div className="mt-1 flex justify-between">
            {errors.reason ? (
              <p className="text-[10px] font-medium text-red-600">
                {errors.reason}
              </p>
            ) : (
              <p className="text-[10px] text-slate-400">
                Keep this reason available for audit
                and governance review.
              </p>
            )}

            <span className="text-[10px] text-slate-400">
              {formData.reason.length}/500
            </span>
          </div>
        </div>
      </div>

      {/* FINANCIAL GOVERNANCE NOTICE */}

      <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-black text-orange-700">
            !
          </div>

          <div>
            <p className="text-xs font-black text-orange-900">
              Financial Governance
            </p>

            <p className="mt-1 text-[10px] leading-5 text-orange-800">
              This component collects commission-rule
              configuration only. The trusted backend
              must validate authorization, scope,
              effective dates, rule precedence,
              correlationId, idempotencyKey and the
              applicable calculation version before
              persisting the rule.
            </p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {!readOnly && (
            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="rounded-xl px-4 py-2.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset
            </button>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          {!readOnly && (
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Saving...
                </span>
              ) : (
                submitLabel
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}