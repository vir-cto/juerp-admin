"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

export type AccountFreezeEntityType =
  | "CUSTOMER"
  | "VENDOR"
  | "CAPTAIN";

export type AccountFreezeStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "BLOCKED"
  | "SUSPENDED";

export type AccountFreezeReason =
  | "SECURITY_CONCERN"
  | "FRAUD_SUSPECTED"
  | "POLICY_VIOLATION"
  | "KYC_ISSUE"
  | "PAYMENT_ISSUE"
  | "USER_REQUEST"
  | "SYSTEM_ISSUE"
  | "OTHER";

export interface AccountFreezeTarget {
  entityId: string;

  entityType: AccountFreezeEntityType;

  name: string;

  phone?: string;

  email?: string;

  currentStatus: AccountFreezeStatus;

  stateId?: string;

  stateName?: string;

  districtId?: string;

  districtName?: string;

  pincode?: string;
}

export interface AccountFreezeRequest {
  entityId: string;

  entityType: AccountFreezeEntityType;

  currentStatus: AccountFreezeStatus;

  requestedStatus: "SUSPENDED" | "BLOCKED";

  reason: AccountFreezeReason;

  reasonText: string;

  freezeDuration: "INDEFINITE" | "TEMPORARY";

  freezeUntil?: string;

  notifyEntity: boolean;
}

interface AccountFreezeModalProps {
  isOpen: boolean;

  target: AccountFreezeTarget | null;

  onClose: () => void;

  onSubmit?: (
    request: AccountFreezeRequest
  ) => void | Promise<void>;

  loading?: boolean;

  readOnly?: boolean;

  title?: string;

  submitLabel?: string;
}

const REASON_OPTIONS: Array<{
  value: AccountFreezeReason;
  label: string;
}> = [
  {
    value: "SECURITY_CONCERN",
    label: "Security Concern",
  },
  {
    value: "FRAUD_SUSPECTED",
    label: "Fraud Suspected",
  },
  {
    value: "POLICY_VIOLATION",
    label: "Policy Violation",
  },
  {
    value: "KYC_ISSUE",
    label: "KYC Issue",
  },
  {
    value: "PAYMENT_ISSUE",
    label: "Payment Issue",
  },
  {
    value: "USER_REQUEST",
    label: "User Request",
  },
  {
    value: "SYSTEM_ISSUE",
    label: "System Issue",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const ENTITY_LABELS: Record<
  AccountFreezeEntityType,
  string
> = {
  CUSTOMER: "Customer",
  VENDOR: "Vendor",
  CAPTAIN: "Captain",
};

const STATUS_CLASSES: Record<
  AccountFreezeStatus,
  string
> = {
  ACTIVE:
    "border-green-200 bg-green-50 text-green-700",

  INACTIVE:
    "border-slate-200 bg-slate-100 text-slate-600",

  BLOCKED:
    "border-red-200 bg-red-50 text-red-700",

  SUSPENDED:
    "border-amber-200 bg-amber-50 text-amber-700",
};

export default function AccountFreezeModal({
  isOpen,
  target,
  onClose,
  onSubmit,
  loading = false,
  readOnly = false,
  title = "Freeze Account",
  submitLabel = "Submit Freeze Request",
}: AccountFreezeModalProps) {
  const [
    requestedStatus,
    setRequestedStatus,
  ] = useState<
    "SUSPENDED" | "BLOCKED"
  >("SUSPENDED");

  const [
    reason,
    setReason,
  ] = useState<AccountFreezeReason>(
    "SECURITY_CONCERN"
  );

  const [
    reasonText,
    setReasonText,
  ] = useState("");

  const [
    freezeDuration,
    setFreezeDuration,
  ] = useState<
    "INDEFINITE" | "TEMPORARY"
  >("INDEFINITE");

  const [
    freezeUntil,
    setFreezeUntil,
  ] = useState("");

  const [
    notifyEntity,
    setNotifyEntity,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setRequestedStatus(
      "SUSPENDED"
    );

    setReason(
      "SECURITY_CONCERN"
    );

    setReasonText("");

    setFreezeDuration(
      "INDEFINITE"
    );

    setFreezeUntil("");

    setNotifyEntity(true);

    setError("");
  }, [
    isOpen,
    target?.entityId,
  ]);

  if (
    !isOpen ||
    !target
  ) {
    return null;
  }

  const entityLabel =
    ENTITY_LABELS[
      target.entityType
    ];

  const canSubmit =
    !readOnly &&
    !loading &&
    target.currentStatus !==
      "BLOCKED" &&
    target.currentStatus !==
      "SUSPENDED";

  function handleClose() {
    if (loading) {
      return;
    }

    onClose();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (readOnly) {
      return;
    }

    if (!reason) {
      setError(
        "Please select a freeze reason."
      );
      return;
    }

    if (
      reasonText.trim().length <
      5
    ) {
      setError(
        "Please provide a clear reason with at least 5 characters."
      );
      return;
    }

    if (
      freezeDuration ===
        "TEMPORARY" &&
      !freezeUntil
    ) {
      setError(
        "Please select when the temporary freeze should end."
      );
      return;
    }

    if (
      freezeDuration ===
        "TEMPORARY" &&
      freezeUntil
    ) {
      const selectedDate =
        new Date(
          freezeUntil
        );

      if (
        Number.isNaN(
          selectedDate.getTime()
        )
      ) {
        setError(
          "Please provide a valid freeze end date."
        );
        return;
      }

      if (
        selectedDate.getTime() <=
        Date.now()
      ) {
        setError(
          "Temporary freeze end date must be in the future."
        );
        return;
      }
    }

    const request: AccountFreezeRequest =
      {
        entityId:
          target.entityId,

        entityType:
          target.entityType,

        currentStatus:
          target.currentStatus,

        requestedStatus,

        reason,

        reasonText:
          reasonText.trim(),

        freezeDuration,

        ...(freezeDuration ===
        "TEMPORARY"
          ? {
              freezeUntil,
            }
          : {}),

        notifyEntity,
      };

    try {
      await onSubmit?.(
        request
      );
    } catch (submitError) {
      setError(
        submitError instanceof
          Error
          ? submitError.message
          : "Unable to submit the freeze request."
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[170] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="account-freeze-modal-title"
      onMouseDown={(
        event
      ) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          handleClose();
        }
      }}
    >
      <div className="flex max-h-[92vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <FreezeIcon />
            </div>

            <div className="min-w-0">

              <h2
                id="account-freeze-modal-title"
                className="text-base font-black text-slate-900"
              >
                {title}
              </h2>

              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Create a protected administrative
                account freeze request.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={
              handleClose
            }
            disabled={
              loading
            }
            aria-label="Close modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ×
          </button>

        </div>

        {/* CONTENT */}

        <form
          onSubmit={
            handleSubmit
          }
          className="min-h-0 flex-1 overflow-y-auto"
        >

          <div className="space-y-5 px-5 py-5 sm:px-6">

            {/* TARGET */}

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">

              <div className="flex items-start gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
                  <EntityIcon
                    type={
                      target.entityType
                    }
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-2">

                    <p className="truncate text-xs font-black text-slate-900">
                      {
                        target.name
                      }
                    </p>

                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-slate-600">
                      {
                        entityLabel
                      }
                    </span>

                  </div>

                  <p className="mt-1 font-mono text-[8px] text-slate-400">
                    {
                      target.entityId
                    }
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2">

                    {target.phone && (
                      <span className="text-[8px] text-slate-500">
                        {target.phone}
                      </span>
                    )}

                    {target.email && (
                      <span className="truncate text-[8px] text-slate-500">
                        {
                          target.email
                        }
                      </span>
                    )}

                  </div>

                </div>

                <span
                  className={`shrink-0 rounded-full border px-2 py-1 text-[7px] font-black uppercase ${STATUS_CLASSES[target.currentStatus]}`}
                >
                  {
                    target.currentStatus
                  }
                </span>

              </div>

              {(target.stateName ||
                target.districtName ||
                target.pincode) && (
                <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-200 pt-3 sm:grid-cols-3">

                  {target.stateName && (
                    <InfoItem
                      label="State"
                      value={
                        target.stateName
                      }
                    />
                  )}

                  {target.districtName && (
                    <InfoItem
                      label="District"
                      value={
                        target.districtName
                      }
                    />
                  )}

                  {target.pincode && (
                    <InfoItem
                      label="Pincode"
                      value={
                        target.pincode
                      }
                    />
                  )}

                </div>
              )}

            </div>

            {/* ALREADY FROZEN */}

            {(target.currentStatus ===
              "BLOCKED" ||
              target.currentStatus ===
                "SUSPENDED") && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex items-start gap-2">

                  <WarningIcon />

                  <div>

                    <p className="text-[9px] font-black text-red-800">
                      Account is already{" "}
                      {
                        target.currentStatus
                      }
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-red-700">
                      A new freeze request cannot
                      be submitted until the current
                      account state is changed through
                      an authorized JUERP workflow.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* REQUESTED STATUS */}

            <div>

              <FieldLabel>
                Requested Account Status
              </FieldLabel>

              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">

                <ChoiceButton
                  selected={
                    requestedStatus ===
                    "SUSPENDED"
                  }
                  disabled={
                    !canSubmit
                  }
                  onClick={() =>
                    setRequestedStatus(
                      "SUSPENDED"
                    )
                  }
                  icon={
                    <PauseIcon />
                  }
                  title="Suspend Account"
                  description="Temporarily restrict account activity"
                  variant="amber"
                />

                <ChoiceButton
                  selected={
                    requestedStatus ===
                    "BLOCKED"
                  }
                  disabled={
                    !canSubmit
                  }
                  onClick={() =>
                    setRequestedStatus(
                      "BLOCKED"
                    )
                  }
                  icon={
                    <BlockIcon />
                  }
                  title="Block Account"
                  description="Restrict account access until reviewed"
                  variant="red"
                />

              </div>

            </div>

            {/* REASON */}

            <div>

              <FieldLabel>
                Freeze Reason
              </FieldLabel>

              <select
                value={
                  reason
                }
                onChange={(
                  event
                ) =>
                  setReason(
                    event
                      .target
                      .value as AccountFreezeReason
                  )
                }
                disabled={
                  !canSubmit
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              >
                {REASON_OPTIONS.map(
                  (option) => (
                    <option
                      key={
                        option.value
                      }
                      value={
                        option.value
                      }
                    >
                      {
                        option.label
                      }
                    </option>
                  )
                )}
              </select>

            </div>

            {/* DESCRIPTION */}

            <div>

              <div className="flex items-center justify-between gap-3">

                <FieldLabel>
                  Reason Details
                </FieldLabel>

                <span className="text-[7px] text-slate-400">
                  {
                    reasonText.length
                  }
                  /500
                </span>

              </div>

              <textarea
                value={
                  reasonText
                }
                onChange={(
                  event
                ) => {
                  if (
                    event.target
                      .value
                      .length <=
                    500
                  ) {
                    setReasonText(
                      event
                        .target
                        .value
                    );
                  }
                }}
                disabled={
                  !canSubmit
                }
                rows={4}
                placeholder="Enter the reason and supporting context for this freeze request..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-[8px] text-slate-400">
                This explanation becomes part of
                the protected administrative audit
                trail.
              </p>

            </div>

            {/* DURATION */}

            <div>

              <FieldLabel>
                Freeze Duration
              </FieldLabel>

              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">

                <ChoiceButton
                  selected={
                    freezeDuration ===
                    "INDEFINITE"
                  }
                  disabled={
                    !canSubmit
                  }
                  onClick={() =>
                    setFreezeDuration(
                      "INDEFINITE"
                    )
                  }
                  icon={
                    <LockIcon />
                  }
                  title="Indefinite"
                  description="Remains frozen until authorized review"
                  variant="slate"
                />

                <ChoiceButton
                  selected={
                    freezeDuration ===
                    "TEMPORARY"
                  }
                  disabled={
                    !canSubmit
                  }
                  onClick={() =>
                    setFreezeDuration(
                      "TEMPORARY"
                    )
                  }
                  icon={
                    <ClockIcon />
                  }
                  title="Temporary"
                  description="Freeze until a specified date"
                  variant="blue"
                />

              </div>

            </div>

            {/* TEMPORARY DATE */}

            {freezeDuration ===
              "TEMPORARY" && (
              <div>

                <FieldLabel>
                  Freeze Until
                </FieldLabel>

                <input
                  type="datetime-local"
                  value={
                    freezeUntil
                  }
                  onChange={(
                    event
                  ) =>
                    setFreezeUntil(
                      event
                        .target
                        .value
                    )
                  }
                  disabled={
                    !canSubmit
                  }
                  min={getDateTimeLocalMin()}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] font-medium text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

              </div>
            )}

            {/* NOTIFICATION */}

            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-slate-300 ${
                !canSubmit
                  ? "cursor-not-allowed opacity-60"
                  : ""
              }`}
            >

              <input
                type="checkbox"
                checked={
                  notifyEntity
                }
                onChange={(
                  event
                ) =>
                  setNotifyEntity(
                    event
                      .target
                      .checked
                  )
                }
                disabled={
                  !canSubmit
                }
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
              />

              <span>

                <span className="block text-[9px] font-black text-slate-700">
                  Notify account holder
                </span>

                <span className="mt-1 block text-[8px] leading-4 text-slate-400">
                  Request notification through the
                  authorized notification service if
                  the backend policy permits it.
                </span>

              </span>

            </label>

            {/* ERROR */}

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex items-start gap-2">

                  <WarningIcon />

                  <p className="text-[9px] font-bold leading-4 text-red-700">
                    {error}
                  </p>

                </div>

              </div>
            )}

            {/* GOVERNANCE */}

            <div className="rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">

              <div className="flex items-start gap-2">

                <div className="mt-0.5 shrink-0 text-orange-600">
                  <ShieldIcon />
                </div>

                <div>

                  <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
                    Protected JUERP Override
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-orange-700">
                    Freezing an account is an
                    administrative override. The
                    browser must not directly change
                    the account status. The trusted
                    backend must validate the
                    administrator role, administrative
                    scope, target eligibility,
                    authorization, audit information,
                    correlationId, and idempotencyKey
                    before execution.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* FOOTER */}

          <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-end sm:px-6">

            <button
              type="button"
              onClick={
                handleClose
              }
              disabled={
                loading
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[9px] font-black text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                !canSubmit
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-[9px] font-black text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                <>
                  <FreezeIcon />
                  {
                    submitLabel
                  }
                </>
              )}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* CHOICE BUTTON */
/* -------------------------------------------------------------------------- */

function ChoiceButton({
  selected,
  disabled,
  onClick,
  icon,
  title,
  description,
  variant,
}: {
  selected: boolean;

  disabled: boolean;

  onClick: () => void;

  icon: React.ReactNode;

  title: string;

  description: string;

  variant:
    | "amber"
    | "red"
    | "slate"
    | "blue";
}) {
  const classes = {
    amber: {
      icon: "bg-amber-100 text-amber-700",
      selected:
        "border-amber-300 bg-amber-50",
    },

    red: {
      icon: "bg-red-100 text-red-700",
      selected:
        "border-red-300 bg-red-50",
    },

    slate: {
      icon: "bg-slate-100 text-slate-600",
      selected:
        "border-slate-300 bg-slate-50",
    },

    blue: {
      icon: "bg-blue-100 text-blue-700",
      selected:
        "border-blue-300 bg-blue-50",
    },
  };

  return (
    <button
      type="button"
      onClick={
        onClick
      }
      disabled={
        disabled
      }
      className={`flex items-start gap-3 rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
        selected
          ? classes[
              variant
            ].selected
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${classes[variant].icon}`}
      >
        {icon}
      </span>

      <span className="min-w-0">

        <span className="flex items-center gap-2">

          <span className="text-[9px] font-black text-slate-800">
            {title}
          </span>

          {selected && (
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          )}

        </span>

        <span className="mt-1 block text-[8px] leading-4 text-slate-400">
          {description}
        </span>

      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* FIELD LABEL */
/* -------------------------------------------------------------------------- */

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <label className="text-[8px] font-black uppercase tracking-wider text-slate-500">
      {children}
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* INFO ITEM */
/* -------------------------------------------------------------------------- */

function InfoItem({
  label,
  value,
}: {
  label: string;

  value: string;
}) {
  return (
    <div>
      <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-[8px] font-bold text-slate-700">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function FreezeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />

      <path
        strokeLinecap="round"
        d="M8 10V7a4 4 0 0 1 8 0v3"
      />

      <path
        strokeLinecap="round"
        d="M12 14v2"
      />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="5"
        width="4"
        height="14"
        rx="1"
      />

      <rect
        x="14"
        y="5"
        width="4"
        height="14"
        rx="1"
      />
    </svg>
  );
}

function BlockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path
        strokeLinecap="round"
        d="m7 7 10 10"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="10"
        width="14"
        height="10"
        rx="2"
      />

      <path
        strokeLinecap="round"
        d="M8 10V7a4 4 0 0 1 8 0v3"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
      />

      <path
        strokeLinecap="round"
        d="M12 8v4l3 2"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m12 3 9 17H3L12 3Z"
      />

      <path
        strokeLinecap="round"
        d="M12 9v4"
      />

      <path
        strokeLinecap="round"
        d="M12 16h.01"
      />
    </svg>
  );
}

function ShieldIcon() {
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
        d="M12 3 5 6v5c0 4.5 2.8 8.3 7 10 4.2-1.7 7-5.5 7-10V6l-7-3Z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 12 2 2 4-4"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <span
      className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
      aria-hidden="true"
    />
  );
}

function EntityIcon({
  type,
}: {
  type: AccountFreezeEntityType;
}) {
  if (
    type ===
    "VENDOR"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 10h18"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 10v10h14V10"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4 10 2-6h12l2 6"
        />

        <path
          strokeLinecap="round"
          d="M9 20v-5h6v5"
        />
      </svg>
    );
  }

  if (
    type ===
    "CAPTAIN"
  ) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="7"
          r="3"
        />

        <path
          strokeLinecap="round"
          d="M5 21a7 7 0 0 1 14 0"
        />

        <path
          strokeLinecap="round"
          d="M18 8.5a3 3 0 0 1 0 5"
        />

        <path
          strokeLinecap="round"
          d="M6 8.5a3 3 0 0 0 0 5"
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
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle
        cx="9"
        cy="8"
        r="3"
      />

      <path
        strokeLinecap="round"
        d="M3 21a6 6 0 0 1 12 0"
      />

      <path
        strokeLinecap="round"
        d="M16 5.5a3 3 0 0 1 0 5.5"
      />

      <path
        strokeLinecap="round"
        d="M18 15a5 5 0 0 1 3 4"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* DATE HELPER */
/* -------------------------------------------------------------------------- */

function getDateTimeLocalMin(): string {
  const now =
    new Date();

  const offset =
    now.getTimezoneOffset();

  const localDate =
    new Date(
      now.getTime() -
        offset * 60 * 1000
    );

  return localDate
    .toISOString()
    .slice(
      0,
      16
    );
}