"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ClusterType } from "@/hooks/useHierarchy";

export interface ClusterCreateData {
  clusterName: string;
  clusterType: ClusterType;
  stateId: string;
  stateName: string;
  districtId?: string;
  districtName?: string;
  pincodes: string[];
  description?: string;
}

export interface HierarchyOption {
  id: string;
  name: string;
  code?: string;
  stateId?: string;
}

interface ClusterCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: ClusterCreateData) => void | Promise<void>;
  states?: HierarchyOption[];
  districts?: HierarchyOption[];
  loading?: boolean;
  title?: string;
  submitLabel?: string;
}

const CLUSTER_TYPES: {
  value: ClusterType;
  label: string;
  description: string;
}[] = [
  {
    value: "STATE_CLUSTER",
    label: "State",
    description: "Cluster scoped to an entire state.",
  },
  {
    value: "DISTRICT_CLUSTER",
    label: "District",
    description: "Cluster under a specific district.",
  },
  {
    value: "PINCODE_CLUSTER",
    label: "Pincode",
    description: "Cluster covering one or more pincodes.",
  },
  {
    value: "OPERATIONAL_CLUSTER",
    label: "Operational",
    description: "Custom operational grouping.",
  },
];

function getInitialForm(): ClusterCreateData {
  return {
    clusterName: "",
    clusterType: "OPERATIONAL_CLUSTER",
    stateId: "",
    stateName: "",
    districtId: "",
    districtName: "",
    pincodes: [],
    description: "",
  };
}

export default function ClusterCreateModal({
  isOpen,
  onClose,
  onSubmit,
  states = [],
  districts = [],
  loading = false,
  title = "Create Cluster",
  submitLabel = "Create Cluster",
}: ClusterCreateModalProps) {
  const [form, setForm] = useState<ClusterCreateData>(getInitialForm());
  const [pincodeInput, setPincodeInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setForm(getInitialForm());
    setPincodeInput("");
    setError("");
  }, [isOpen]);

  const availableDistricts = useMemo(() => {
    if (!form.stateId) return districts;
    return districts.filter(
      (d) =>
        d.stateId === form.stateId ||
        d.id.toLowerCase().startsWith(form.stateId.toLowerCase()) ||
        d.code?.toLowerCase().startsWith(form.stateId.toLowerCase())
    );
  }, [districts, form.stateId]);

  if (!isOpen) return null;

  const needsDistrict =
    form.clusterType === "DISTRICT_CLUSTER" ||
    form.clusterType === "PINCODE_CLUSTER";

  const handleChange = (
    field: keyof ClusterCreateData,
    value: string | string[]
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const handleStateChange = (stateId: string) => {
    const state = states.find((s) => s.id === stateId);
    setForm((current) => ({
      ...current,
      stateId,
      stateName: state?.name ?? "",
      districtId: "",
      districtName: "",
    }));
    setError("");
  };

  const handleDistrictChange = (districtId: string) => {
    const district = availableDistricts.find((d) => d.id === districtId);
    setForm((current) => ({
      ...current,
      districtId,
      districtName: district?.name ?? "",
    }));
    setError("");
  };

  const addPincode = () => {
    const clean = pincodeInput.trim().replace(/\D/g, "");
    if (!/^\d{6}$/.test(clean)) {
      setError("Pincode must be exactly 6 digits.");
      return;
    }
    if (form.pincodes.includes(clean)) {
      setError("This pincode is already added.");
      return;
    }
    setForm((current) => ({
      ...current,
      pincodes: [...current.pincodes, clean],
    }));
    setPincodeInput("");
    setError("");
  };

  const removePincode = (pin: string) => {
    setForm((current) => ({
      ...current,
      pincodes: current.pincodes.filter((p) => p !== pin),
    }));
  };

  const validate = (): boolean => {
    if (!form.clusterName.trim()) {
      setError("Cluster name is required.");
      return false;
    }
    if (!form.stateId) {
      setError("Please select a state.");
      return false;
    }
    if (needsDistrict && !form.districtId) {
      setError("Please select a district.");
      return false;
    }
    if (
      form.clusterType === "PINCODE_CLUSTER" &&
      form.pincodes.length === 0
    ) {
      setError("Add at least one pincode for a pincode cluster.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    if (!validate()) return;

    const clean: ClusterCreateData = {
      clusterName: form.clusterName.trim(),
      clusterType: form.clusterType,
      stateId: form.stateId,
      stateName: form.stateName,
      districtId: form.districtId?.trim() || undefined,
      districtName: form.districtName?.trim() || undefined,
      pincodes: form.pincodes,
      description: form.description?.trim() || undefined,
    };

    try {
      await onSubmit?.(clean);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to create cluster."
      );
    }
  };

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[160] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cluster-create-modal-title"
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl text-orange-600">
              ◈
            </div>
            <div>
              <h2
                id="cluster-create-modal-title"
                className="text-lg font-black text-slate-900"
              >
                {title}
              </h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Add an operational cluster within the JUERP hierarchy scope.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ×
          </button>
        </div>

        {/* CONTENT */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-5 px-5 py-5 sm:px-6">
            {/* CLUSTER TYPE */}
            <section>
              <FieldLabel>Cluster Type</FieldLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {CLUSTER_TYPES.map((item) => {
                  const selected = form.clusterType === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        handleChange("clusterType", item.value)
                      }
                      className={`rounded-xl border p-3.5 text-left transition ${
                        selected
                          ? "border-orange-400 bg-orange-50 ring-2 ring-orange-100"
                          : "border-slate-200 bg-white hover:border-orange-200 hover:bg-orange-50/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-sm font-black ${
                            selected ? "text-orange-700" : "text-slate-700"
                          }`}
                        >
                          {item.label}
                        </span>
                        {selected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-black text-white">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs leading-4 text-slate-400">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* NAME */}
            <section>
              <FieldLabel required>Cluster Name</FieldLabel>
              <input
                type="text"
                value={form.clusterName}
                onChange={(e) => handleChange("clusterName", e.target.value)}
                placeholder="Example: Guntur North Cluster"
                disabled={loading}
                className="form-input"
              />
            </section>

            {/* STATE */}
            <section>
              <FieldLabel required>State</FieldLabel>
              {states.length > 0 ? (
                <select
                  value={form.stateId}
                  onChange={(e) => handleStateChange(e.target.value)}
                  disabled={loading}
                  className="form-input"
                >
                  <option value="">Select state</option>
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                      {s.code ? ` (${s.code})` : ""}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                  <p className="text-sm font-bold text-amber-700">
                    No state options available.
                  </p>
                  <p className="mt-1 text-xs text-amber-600">
                    Load hierarchy states before creating a cluster.
                  </p>
                </div>
              )}
            </section>

            {/* DISTRICT (conditional) */}
            {needsDistrict && (
              <section>
                <FieldLabel required>District</FieldLabel>
                <select
                  value={form.districtId ?? ""}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  disabled={loading || !form.stateId}
                  className="form-input disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">
                    {!form.stateId
                      ? "Select state first"
                      : "Select district"}
                  </option>
                  {availableDistricts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                      {d.code ? ` (${d.code})` : ""}
                    </option>
                  ))}
                </select>
                {form.stateId && availableDistricts.length === 0 && (
                  <p className="mt-1.5 text-xs text-amber-600">
                    No districts available for the selected state.
                  </p>
                )}
              </section>
            )}

            {/* PINCODES */}
            <section>
              <FieldLabel>
                Pincodes
                {form.clusterType === "PINCODE_CLUSTER" ? " *" : " (optional)"}
              </FieldLabel>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pincodeInput}
                  onChange={(e) =>
                    setPincodeInput(e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addPincode();
                    }
                  }}
                  placeholder="6-digit pincode"
                  disabled={loading}
                  className="form-input flex-1"
                />
                <button
                  type="button"
                  onClick={addPincode}
                  disabled={loading}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  Add
                </button>
              </div>
              {form.pincodes.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.pincodes.map((pin) => (
                    <span
                      key={pin}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700"
                    >
                      {pin}
                      <button
                        type="button"
                        onClick={() => removePincode(pin)}
                        disabled={loading}
                        className="text-green-600 hover:text-green-900"
                        aria-label={`Remove ${pin}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-1.5 text-xs text-slate-400">
                Press Enter or click Add. Required for pincode clusters.
              </p>
            </section>

            {/* DESCRIPTION */}
            <section>
              <FieldLabel>Description</FieldLabel>
              <textarea
                value={form.description ?? ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
                disabled={loading}
                placeholder="Optional description for this cluster..."
                className="form-input min-h-[90px] resize-y"
              />
            </section>

            {/* STATUS (read-only draft) */}
            <section>
              <FieldLabel>Status</FieldLabel>
              <div className="flex h-[46px] items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-black text-amber-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  DRAFT → ACTIVE on create
                </span>
              </div>
            </section>

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-semibold text-red-700">{error}</p>
              </div>
            )}

            {/* GOVERNANCE */}
            <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">
              <p className="text-xs font-black uppercase tracking-wider text-orange-800">
                Cluster Governance
              </p>
              <p className="mt-1.5 text-sm leading-5 text-orange-700">
                Creating a cluster is a protected administrative operation.
                Backend validation of uniqueness, parent scope, and
                authorization is required before production activation.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Creating..." : submitLabel}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.75rem 0.9rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: rgb(51 65 85);
          outline: none;
          transition: all 150ms ease;
        }
        .form-input::placeholder {
          color: rgb(148 163 184);
          font-weight: 500;
        }
        .form-input:focus {
          border-color: rgb(251 146 60);
          box-shadow: 0 0 0 3px rgb(255 237 213);
        }
        .form-input:disabled {
          cursor: not-allowed;
          background: rgb(248 250 252);
          color: rgb(148 163 184);
        }
      `}</style>
    </div>
  );
}

function FieldLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-500">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}