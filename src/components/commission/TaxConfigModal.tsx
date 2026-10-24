"use client";

import { FormEvent, useEffect, useState } from "react";

export type TaxType =
  | "PERCENTAGE"
  | "FIXED";

export type TaxStatus =
  | "ACTIVE"
  | "INACTIVE";

export interface TaxConfig {
  taxId?: string;
  taxName: string;
  taxType: TaxType;
  taxValue: number;
  module:
    | "ALL"
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING";
  effectiveFrom: string;
  effectiveTo?: string;
  status: TaxStatus;
  description: string;
}

interface TaxConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    config: TaxConfig
  ) => void | Promise<void>;
  initialData?: Partial<TaxConfig>;
  loading?: boolean;
  readOnly?: boolean;
}

const MODULE_OPTIONS = [
  {
    value: "ALL",
    label: "All Modules",
  },
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
] as const;

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

function getInitialData(
  initialData?: Partial<TaxConfig>
): TaxConfig {
  return {
    taxId: initialData?.taxId ?? "",
    taxName:
      initialData?.taxName ?? "",
    taxType:
      initialData?.taxType ??
      "PERCENTAGE",
    taxValue:
      initialData?.taxValue ?? 0,
    module:
      initialData?.module ?? "ALL",
    effectiveFrom:
      initialData?.effectiveFrom ??
      getTodayDate(),
    effectiveTo:
      initialData?.effectiveTo ?? "",
    status:
      initialData?.status ?? "ACTIVE",
    description:
      initialData?.description ?? "",
  };
}

export default function TaxConfigModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  loading = false,
  readOnly = false,
}: TaxConfigModalProps) {
  const [formData, setFormData] =
    useState<TaxConfig>(
      getInitialData(initialData)
    );

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  const [saveError, setSaveError] =
    useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setFormData(
      getInitialData(initialData)
    );

    setErrors({});
    setSaveError("");
  }, [isOpen, initialData]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [
    isOpen,
    loading,
    onClose,
  ]);

  if (!isOpen) {
    return null;
  }

  function updateField<
    K extends keyof TaxConfig
  >(
    field: K,
    value: TaxConfig[K]
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));

    setSaveError("");
  }

  function validateForm(): boolean {
    const nextErrors: Record<
      string,
      string
    > = {};

    if (!formData.taxName.trim()) {
      nextErrors.taxName =
        "Tax name is required.";
    }

    if (!formData.taxType) {
      nextErrors.taxType =
        "Tax type is required.";
    }

    if (
      !Number.isFinite(formData.taxValue) ||
      formData.taxValue < 0
    ) {
      nextErrors.taxValue =
        "Tax value cannot be negative.";
    }

    if (
      formData.taxType === "PERCENTAGE" &&
      formData.taxValue > 100
    ) {
      nextErrors.taxValue =
        "Percentage tax cannot exceed 100%.";
    }

    if (!formData.module) {
      nextErrors.module =
        "Module is required.";
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

    if (
      !formData.description.trim()
    ) {
      nextErrors.description =
        "Please provide a description.";
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

    if (loading || readOnly) {
      return;
    }

    setSaveError("");

    if (!validateForm()) {
      return;
    }

    try {
      await onSave({
        ...formData,
        taxName: formData.taxName.trim(),
        taxValue: Number(
          formData.taxValue
        ),
        description:
          formData.description.trim(),
        effectiveTo:
          formData.effectiveTo || "",
      });
    } catch (error) {
      console.error(
        "Tax configuration save failed:",
        error
      );

      setSaveError(
        "Unable to save tax configuration. Please try again."
      );
    }
  }

  function handleBackdropClick(
    event: React.MouseEvent<HTMLDivElement>
  ) {
    if (
      event.target === event.currentTarget &&
      !loading
    ) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tax-config-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 sm:px-6">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
              Financial Configuration
            </p>

            <h2
              id="tax-config-title"
              className="mt-1 text-lg font-black text-slate-900"
            >
              {initialData?.taxId
                ? "Edit Tax Configuration"
                : "Add Tax Configuration"}
            </h2>

            <p className="mt-1 max-w-lg text-xs leading-5 text-slate-500">
              Configure a tax rule that can be
              referenced by the trusted backend
              during financial calculation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>

        </div>

        {/* CONTENT */}

        <div className="overflow-y-auto px-5 py-5 sm:px-6">

          {/* ERROR */}

          {saveError && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-start gap-3">

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 font-black text-red-600">
                  !
                </span>

                <div>
                  <p className="text-xs font-black text-red-800">
                    Save failed
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-red-700">
                    {saveError}
                  </p>
                </div>

              </div>

            </div>
          )}

          <form
            id="tax-config-form"
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* BASIC INFORMATION */}

            <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

              <div className="mb-5">
                <h3 className="text-sm font-black text-slate-900">
                  Basic Information
                </h3>

                <p className="mt-1 text-[10px] text-slate-500">
                  Identify the tax configuration and
                  where it applies.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* TAX NAME */}

                <div className="md:col-span-2">
                  <label
                    htmlFor="tax-name"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Tax Name
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="tax-name"
                    type="text"
                    maxLength={100}
                    value={formData.taxName}
                    disabled={
                      loading || readOnly
                    }
                    onChange={(event) =>
                      updateField(
                        "taxName",
                        event.target.value
                      )
                    }
                    placeholder="Example: GST"
                    className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                      errors.taxName
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  />

                  {errors.taxName && (
                    <p className="mt-1 text-[10px] font-medium text-red-600">
                      {errors.taxName}
                    </p>
                  )}
                </div>

                {/* TAX TYPE */}

                <div>
                  <label
                    htmlFor="tax-type"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Tax Type
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <select
                    id="tax-type"
                    value={formData.taxType}
                    disabled={
                      loading || readOnly
                    }
                    onChange={(event) =>
                      updateField(
                        "taxType",
                        event.target
                          .value as TaxType
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                      errors.taxType
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  >
                    <option value="PERCENTAGE">
                      Percentage
                    </option>

                    <option value="FIXED">
                      Fixed Amount
                    </option>
                  </select>

                  {errors.taxType && (
                    <p className="mt-1 text-[10px] font-medium text-red-600">
                      {errors.taxType}
                    </p>
                  )}
                </div>

                {/* TAX VALUE */}

                <div>
                  <label
                    htmlFor="tax-value"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Tax Value
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <div className="relative">

                    <input
                      id="tax-value"
                      type="number"
                      min="0"
                      max={
                        formData.taxType ===
                        "PERCENTAGE"
                          ? "100"
                          : undefined
                      }
                      step="0.01"
                      value={formData.taxValue}
                      disabled={
                        loading || readOnly
                      }
                      onChange={(event) =>
                        updateField(
                          "taxValue",
                          Number(
                            event.target.value
                          )
                        )
                      }
                      className={`w-full rounded-xl border bg-white px-3 py-3 pr-12 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                        errors.taxValue
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                      }`}
                      placeholder="0"
                    />

                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                      {formData.taxType ===
                      "PERCENTAGE"
                        ? "%"
                        : "₹"}
                    </span>

                  </div>

                  <p className="mt-1 text-[10px] text-slate-400">
                    {formData.taxType ===
                    "PERCENTAGE"
                      ? "Enter a percentage from 0 to 100."
                      : "Enter the fixed tax amount in INR."}
                  </p>

                  {errors.taxValue && (
                    <p className="mt-1 text-[10px] font-medium text-red-600">
                      {errors.taxValue}
                    </p>
                  )}
                </div>

                {/* MODULE */}

                <div>
                  <label
                    htmlFor="tax-module"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Applicable Module
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <select
                    id="tax-module"
                    value={formData.module}
                    disabled={
                      loading || readOnly
                    }
                    onChange={(event) =>
                      updateField(
                        "module",
                        event.target
                          .value as TaxConfig["module"]
                      )
                    }
                    className={`w-full rounded-xl border bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:ring-2 ${
                      errors.module
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                    }`}
                  >
                    {MODULE_OPTIONS.map(
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

                  {errors.module && (
                    <p className="mt-1 text-[10px] font-medium text-red-600">
                      {errors.module}
                    </p>
                  )}
                </div>

                {/* STATUS */}

                <div>
                  <label
                    htmlFor="tax-status"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Status
                  </label>

                  <select
                    id="tax-status"
                    value={formData.status}
                    disabled={
                      loading || readOnly
                    }
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target
                          .value as TaxStatus
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
            </section>

            {/* EFFECTIVE PERIOD */}

            <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

              <div className="mb-5">
                <h3 className="text-sm font-black text-slate-900">
                  Effective Period
                </h3>

                <p className="mt-1 text-[10px] text-slate-500">
                  Specify the period during which the
                  configuration can apply.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* FROM */}

                <div>
                  <label
                    htmlFor="tax-effective-from"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Effective From
                    <span className="ml-1 text-red-500">
                      *
                    </span>
                  </label>

                  <input
                    id="tax-effective-from"
                    type="date"
                    value={
                      formData.effectiveFrom
                    }
                    disabled={
                      loading || readOnly
                    }
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
                    htmlFor="tax-effective-to"
                    className="mb-2 block text-xs font-bold text-slate-700"
                  >
                    Effective To
                    <span className="ml-1 text-[10px] font-normal text-slate-400">
                      Optional
                    </span>
                  </label>

                  <input
                    id="tax-effective-to"
                    type="date"
                    value={
                      formData.effectiveTo ?? ""
                    }
                    disabled={
                      loading || readOnly
                    }
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
                    }`}
                  />

                  {errors.effectiveTo && (
                    <p className="mt-1 text-[10px] font-medium text-red-600">
                      {errors.effectiveTo}
                    </p>
                  )}

                  <p className="mt-1 text-[10px] text-slate-400">
                    Leave empty if the configuration
                    has no planned end date.
                  </p>
                </div>

              </div>
            </section>

            {/* DESCRIPTION */}

            <section className="rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-5">

              <div className="mb-5">
                <h3 className="text-sm font-black text-slate-900">
                  Configuration Notes
                </h3>

                <p className="mt-1 text-[10px] text-slate-500">
                  Explain the purpose of this tax
                  configuration for governance and
                  audit review.
                </p>
              </div>

              <label
                htmlFor="tax-description"
                className="mb-2 block text-xs font-bold text-slate-700"
              >
                Description
                <span className="ml-1 text-red-500">
                  *
                </span>
              </label>

              <textarea
                id="tax-description"
                rows={4}
                maxLength={500}
                value={formData.description}
                disabled={
                  loading || readOnly
                }
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value
                  )
                }
                placeholder="Enter the reason or business purpose for this tax configuration..."
                className={`w-full resize-none rounded-xl border bg-white px-3 py-3 text-xs text-slate-700 outline-none transition focus:ring-2 ${
                  errors.description
                    ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                    : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
                }`}
              />

              <div className="mt-1 flex justify-between">

                {errors.description ? (
                  <p className="text-[10px] font-medium text-red-600">
                    {errors.description}
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-400">
                    This information should be useful
                    during audit review.
                  </p>
                )}

                <span className="text-[10px] text-slate-400">
                  {formData.description.length}/500
                </span>

              </div>

            </section>

            {/* GOVERNANCE */}

            <section className="rounded-2xl border border-orange-200 bg-orange-50 p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-sm font-black text-orange-700">
                  !
                </div>

                <div>
                  <h3 className="text-xs font-black text-orange-900">
                    Financial Governance
                  </h3>

                  <p className="mt-1 text-[10px] leading-5 text-orange-800">
                    This modal only collects tax
                    configuration. It does not make the
                    browser the financial authority. A
                    trusted backend must validate the
                    configuration, authorization scope,
                    effective dates, rule precedence,
                    calculation version, correlationId
                    and idempotencyKey before the rule
                    is persisted or used for a financial
                    transaction.
                  </p>
                </div>

              </div>

            </section>

          </form>
        </div>

        {/* FOOTER */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <div>
            {initialData?.taxId && (
              <p className="text-[10px] text-slate-400">
                Tax ID:{" "}
                <span className="font-semibold text-slate-600">
                  {initialData.taxId}
                </span>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            {!readOnly && (
              <button
                type="submit"
                form="tax-config-form"
                disabled={loading}
                className="rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center gap-2">

                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                    Saving...

                  </span>
                ) : initialData?.taxId ? (
                  "Update Tax Configuration"
                ) : (
                  "Save Tax Configuration"
                )}
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}