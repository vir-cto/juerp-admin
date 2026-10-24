"use client";

import {
  FormEvent,
  useEffect,
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

export interface HierarchyNodeEditData {
  nodeId: string;
  nodeType: HierarchyNodeType;
  nodeName: string;
  nodeCode: string;
  stateId?: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  pincode?: string;
  description?: string;
  status: HierarchyNodeStatus;
}

export interface HierarchyNodeEditDrawerProps {
  isOpen: boolean;

  node: HierarchyNodeEditData | null;

  onClose: () => void;

  onSave?: (
    data: HierarchyNodeEditData
  ) => void | Promise<void>;

  states?: {
    id: string;
    name: string;
    code?: string;
  }[];

  districts?: {
    id: string;
    name: string;
    code?: string;
    stateId?: string;
  }[];

  loading?: boolean;

  readOnly?: boolean;

  title?: string;
}

const NODE_TYPE_LABELS: Record<
  HierarchyNodeType,
  string
> = {
  STATE: "State",
  DISTRICT: "District",
  PINCODE: "Pincode",
};

const STATUS_OPTIONS: HierarchyNodeStatus[] =
  [
    "ACTIVE",
    "INACTIVE",
    "BLOCKED",
  ];

function getStatusClasses(
  status: HierarchyNodeStatus
): string {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700 border-green-200";

    case "INACTIVE":
      return "bg-slate-100 text-slate-600 border-slate-200";

    case "BLOCKED":
      return "bg-red-100 text-red-700 border-red-200";

    default:
      return "bg-slate-100 text-slate-600 border-slate-200";
  }
}

export default function NodeEditDrawer({
  isOpen,
  node,
  onClose,
  onSave,
  states = [],
  districts = [],
  loading = false,
  readOnly = false,
  title = "Edit Hierarchy Node",
}: HierarchyNodeEditDrawerProps) {
  const [
    form,
    setForm,
  ] = useState<HierarchyNodeEditData | null>(
    null
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    saved,
    setSaved,
  ] = useState(false);

  useEffect(() => {
    if (!isOpen || !node) {
      return;
    }

    setForm({
      ...node,
    });

    setError("");
    setSaved(false);
  }, [isOpen, node]);

  if (
    !isOpen ||
    !node ||
    !form
  ) {
    return null;
  }

  const selectedState =
    states.find(
      (state) =>
        state.id ===
        form.stateId
    );

  const availableDistricts =
    form.stateId
      ? districts.filter(
          (district) =>
            !district.stateId ||
            district.stateId ===
              form.stateId
        )
      : districts;

  const handleChange = (
    field: keyof HierarchyNodeEditData,
    value: string
  ) => {
    setForm(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          [field]: value,
        };
      }
    );

    setError("");
    setSaved(false);
  };

  const handleStateChange = (
    stateId: string
  ) => {
    const state =
      states.find(
        (item) =>
          item.id === stateId
      );

    setForm(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          stateId,
          stateName:
            state?.name ?? "",
          districtId:
            current.nodeType ===
            "PINCODE"
              ? ""
              : current.districtId,
          districtName:
            current.nodeType ===
            "PINCODE"
              ? ""
              : current.districtName,
        };
      }
    );

    setError("");
    setSaved(false);
  };

  const handleDistrictChange = (
    districtId: string
  ) => {
    const district =
      districts.find(
        (item) =>
          item.id ===
          districtId
      );

    setForm(
      (current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          districtId,
          districtName:
            district?.name ?? "",
        };
      }
    );

    setError("");
    setSaved(false);
  };

  const validateForm =
    (): boolean => {
      if (
        !form.nodeName.trim()
      ) {
        setError(
          "Node name is required."
        );
        return false;
      }

      if (
        !form.nodeCode.trim()
      ) {
        setError(
          "Node code is required."
        );
        return false;
      }

      if (
        form.nodeType ===
          "DISTRICT" &&
        !form.stateId
      ) {
        setError(
          "State is required for a district node."
        );
        return false;
      }

      if (
        form.nodeType ===
          "PINCODE" &&
        !form.stateId
      ) {
        setError(
          "State is required for a pincode node."
        );
        return false;
      }

      if (
        form.nodeType ===
          "PINCODE" &&
        !form.districtId
      ) {
        setError(
          "District is required for a pincode node."
        );
        return false;
      }

      if (
        form.nodeType ===
          "PINCODE"
      ) {
        const cleanPincode =
          form.pincode?.trim() ??
          "";

        if (
          !/^\d{6}$/.test(
            cleanPincode
          )
        ) {
          setError(
            "Pincode must contain exactly 6 digits."
          );
          return false;
        }
      }

      return true;
    };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      loading ||
      readOnly
    ) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const cleanData: HierarchyNodeEditData =
      {
        ...form,

        nodeName:
          form.nodeName.trim(),

        nodeCode:
          form.nodeCode
            .trim()
            .toUpperCase(),

        stateId:
          form.stateId
            ?.trim() || undefined,

        stateName:
          form.stateName
            ?.trim() || undefined,

        districtId:
          form.districtId
            ?.trim() || undefined,

        districtName:
          form.districtName
            ?.trim() || undefined,

        pincode:
          form.nodeType ===
          "PINCODE"
            ? form.pincode?.trim()
            : undefined,

        description:
          form.description
            ?.trim() || undefined,
      };

    try {
      await onSave?.(
        cleanData
      );

      setSaved(true);
      setError("");
    } catch (saveError) {
      setSaved(false);

      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to save hierarchy node."
      );
    }
  };

  const handleClose = () => {
    if (loading) {
      return;
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[155] flex justify-end bg-slate-950/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="node-edit-drawer-title"
    >
      {/* BACKDROP */}

      <button
        type="button"
        aria-label="Close drawer"
        onClick={handleClose}
        disabled={loading}
        className="absolute inset-0 cursor-default"
      />

      {/* DRAWER */}

      <aside className="relative z-10 flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

          <div className="min-w-0 flex-1">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                <HierarchyIcon />
              </div>

              <div className="min-w-0">

                <h2
                  id="node-edit-drawer-title"
                  className="truncate text-base font-black text-slate-900"
                >
                  {title}
                </h2>

                <p className="mt-1 text-[9px] text-slate-500">
                  Update the selected
                  hierarchy node.
                </p>

              </div>

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

        {/* NODE SUMMARY */}

        <div className="shrink-0 border-b border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">

          <div className="flex flex-wrap items-center gap-2">

            <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[8px] font-black uppercase text-orange-700">
              {
                NODE_TYPE_LABELS[
                  form.nodeType
                ]
              }
            </span>

            <span
              className={`rounded-full border px-2.5 py-1 text-[8px] font-black uppercase ${getStatusClasses(
                form.status
              )}`}
            >
              {form.status}
            </span>

            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[8px] font-bold text-slate-500">
              ID:{" "}
              {form.nodeId}
            </span>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >

          <div className="space-y-5 px-5 py-5 sm:px-6">

            {/* READ ONLY NOTICE */}

            {readOnly && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                <p className="text-[9px] font-black text-amber-700">
                  Read-only mode
                </p>

                <p className="mt-1 text-[8px] leading-4 text-amber-600">
                  You do not have permission to
                  modify this hierarchy node.
                </p>

              </div>
            )}

            {/* NODE ID */}

            <section>

              <FieldLabel>
                Node ID
              </FieldLabel>

              <input
                type="text"
                value={
                  form.nodeId
                }
                readOnly
                className="form-input bg-slate-50 text-slate-500"
              />

              <p className="mt-1 text-[8px] text-slate-400">
                The canonical node ID should not
                be changed from the client.
              </p>

            </section>

            {/* NODE TYPE */}

            <section>

              <FieldLabel>
                Node Type
              </FieldLabel>

              <div className="grid grid-cols-3 gap-2">

                {(
                  Object.keys(
                    NODE_TYPE_LABELS
                  ) as HierarchyNodeType[]
                ).map(
                  (nodeType) => {
                    const selected =
                      form.nodeType ===
                      nodeType;

                    return (
                      <button
                        key={
                          nodeType
                        }
                        type="button"
                        disabled={
                          loading ||
                          readOnly
                        }
                        onClick={() =>
                          handleChange(
                            "nodeType",
                            nodeType
                          )
                        }
                        className={`rounded-xl border px-3 py-3 text-[9px] font-black transition ${
                          selected
                            ? "border-orange-400 bg-orange-50 text-orange-700 ring-2 ring-orange-100"
                            : "border-slate-200 bg-white text-slate-500 hover:border-orange-200"
                        } disabled:cursor-not-allowed disabled:opacity-50`}
                      >
                        {
                          NODE_TYPE_LABELS[
                            nodeType
                          ]
                        }
                      </button>
                    );
                  }
                )}

              </div>

              <p className="mt-1 text-[8px] text-amber-600">
                Changing node type should be
                backend-authorized. The client
                only prepares the edit request.
              </p>

            </section>

            {/* BASIC INFORMATION */}

            <section className="space-y-4">

              <div>

                <FieldLabel required>
                  Node Name
                </FieldLabel>

                <input
                  type="text"
                  value={
                    form.nodeName
                  }
                  onChange={(
                    event
                  ) =>
                    handleChange(
                      "nodeName",
                      event.target
                        .value
                    )
                  }
                  disabled={
                    loading ||
                    readOnly
                  }
                  placeholder="Enter node name"
                  className="form-input"
                />

              </div>

              <div>

                <FieldLabel required>
                  Node Code
                </FieldLabel>

                <input
                  type="text"
                  value={
                    form.nodeCode
                  }
                  onChange={(
                    event
                  ) =>
                    handleChange(
                      "nodeCode",
                      event.target
                        .value
                    )
                  }
                  disabled={
                    loading ||
                    readOnly
                  }
                  placeholder="Enter canonical node code"
                  className="form-input uppercase"
                />

                <p className="mt-1 text-[8px] text-slate-400">
                  The trusted backend must verify
                  uniqueness and canonical hierarchy
                  rules.
                </p>

              </div>

            </section>

            {/* STATE */}

            {(form.nodeType ===
              "DISTRICT" ||
              form.nodeType ===
                "PINCODE") && (
              <section>

                <FieldLabel required>
                  State
                </FieldLabel>

                {states.length >
                0 ? (
                  <select
                    value={
                      form.stateId ??
                      ""
                    }
                    onChange={(
                      event
                    ) =>
                      handleStateChange(
                        event.target
                          .value
                      )
                    }
                    disabled={
                      loading ||
                      readOnly
                    }
                    className="form-input"
                  >

                    <option value="">
                      Select state
                    </option>

                    {states.map(
                      (
                        state
                      ) => (
                        <option
                          key={
                            state.id
                          }
                          value={
                            state.id
                          }
                        >
                          {
                            state.name
                          }
                          {state.code
                            ? ` (${state.code})`
                            : ""}
                        </option>
                      )
                    )}

                  </select>
                ) : (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                    <p className="text-[9px] font-bold text-amber-700">
                      State data is not
                      available.
                    </p>

                  </div>
                )}

                {selectedState && (
                  <p className="mt-1 text-[8px] text-slate-400">
                    Selected:{" "}
                    {
                      selectedState.name
                    }
                  </p>
                )}

              </section>
            )}

            {/* DISTRICT */}

            {form.nodeType ===
              "PINCODE" && (
              <section>

                <FieldLabel required>
                  District
                </FieldLabel>

                <select
                  value={
                    form.districtId ??
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    handleDistrictChange(
                      event.target
                        .value
                    )
                  }
                  disabled={
                    loading ||
                    readOnly ||
                    !form.stateId
                  }
                  className="form-input disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >

                  <option value="">
                    {!form.stateId
                      ? "Select state first"
                      : "Select district"}
                  </option>

                  {availableDistricts.map(
                    (
                      district
                    ) => (
                      <option
                        key={
                          district.id
                        }
                        value={
                          district.id
                        }
                      >
                        {
                          district.name
                        }
                        {district.code
                          ? ` (${district.code})`
                          : ""}
                      </option>
                    )
                  )}

                </select>

              </section>
            )}

            {/* PINCODE */}

            {form.nodeType ===
              "PINCODE" && (
              <section>

                <FieldLabel required>
                  Pincode
                </FieldLabel>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={
                    form.pincode ??
                    ""
                  }
                  onChange={(
                    event
                  ) =>
                    handleChange(
                      "pincode",
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  disabled={
                    loading ||
                    readOnly
                  }
                  placeholder="Example: 522001"
                  className="form-input"
                />

              </section>
            )}

            {/* STATUS */}

            <section>

              <FieldLabel required>
                Status
              </FieldLabel>

              <select
                value={
                  form.status
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "status",
                    event.target
                      .value
                  )
                }
                disabled={
                  loading ||
                  readOnly
                }
                className="form-input"
              >

                {STATUS_OPTIONS.map(
                  (status) => (
                    <option
                      key={
                        status
                      }
                      value={
                        status
                      }
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

              <p className="mt-1 text-[8px] text-amber-600">
                Status changes must be validated
                against the authenticated
                administrator's scope.
              </p>

            </section>

            {/* DESCRIPTION */}

            <section>

              <FieldLabel>
                Description
              </FieldLabel>

              <textarea
                value={
                  form.description ??
                  ""
                }
                onChange={(
                  event
                ) =>
                  handleChange(
                    "description",
                    event.target
                      .value
                  )
                }
                rows={4}
                disabled={
                  loading ||
                  readOnly
                }
                placeholder="Enter an optional description..."
                className="form-input min-h-[100px] resize-y"
              />

            </section>

            {/* SUCCESS */}

            {saved && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3">

                <div className="flex items-center gap-2">

                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[10px] font-black text-green-700">
                    ✓
                  </span>

                  <p className="text-[9px] font-bold text-green-700">
                    Save request completed.
                  </p>

                </div>

              </div>
            )}

            {/* ERROR */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex items-start gap-2">

                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[10px] font-black text-red-600">
                    !
                  </span>

                  <p className="text-[9px] font-semibold leading-4 text-red-700">
                    {error}
                  </p>

                </div>

              </div>
            )}

            {/* GOVERNANCE */}

            <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-4">

              <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
                Hierarchy Governance
              </p>

              <p className="mt-1 text-[9px] leading-4 text-orange-700">
                Hierarchy updates are protected
                administrative operations. The
                trusted backend must validate
                authorization scope, parent-child
                relationships, node uniqueness,
                status transitions, audit logging,
                correlationId, and idempotencyKey
                before applying the change.
              </p>

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <p className="text-[8px] leading-4 text-slate-400">
              Node:{" "}
              <span className="font-bold text-slate-500">
                {form.nodeId}
              </span>
            </p>

            <div className="flex flex-col-reverse gap-2 sm:flex-row">

              <button
                type="button"
                onClick={
                  handleClose
                }
                disabled={
                  loading
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              {!readOnly && (
                <button
                  type="submit"
                  disabled={
                    loading
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}

                  {loading
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              )}

            </div>

          </div>

        </form>

      </aside>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(226 232 240);
          background: white;
          padding: 0.7rem 0.85rem;
          font-size: 0.75rem;
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
          box-shadow:
            0 0 0 3px
            rgb(255 237 213);
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
    <label className="mb-1.5 block text-[9px] font-black uppercase tracking-wider text-slate-500">
      {children}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
}

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