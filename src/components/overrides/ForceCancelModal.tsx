"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ForceCancelEntityType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY";

export type ForceCancelReason =
  | "CUSTOMER_REQUEST"
  | "VENDOR_REQUEST"
  | "CAPTAIN_ISSUE"
  | "SYSTEM_ISSUE"
  | "SERVICE_UNAVAILABLE"
  | "PAYMENT_ISSUE"
  | "DUPLICATE_TRANSACTION"
  | "FRAUD_SUSPECTED"
  | "OTHER";

export type ForceCancelRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "EXECUTED";

export interface ForceCancelTarget {
  entityId: string;

  entityType: ForceCancelEntityType;

  moduleId:
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING";

  currentStatus: string;

  paymentStatus?: string;

  customerId?: string;

  customerName?: string;

  customerPhone?: string;

  vendorId?: string;

  vendorName?: string;

  captainId?: string;

  captainName?: string;

  amountPaise?: number;

  currency?: string;
}

export interface ForceCancelRequest {
  entityId: string;

  entityType: ForceCancelEntityType;

  moduleId:
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING";

  currentStatus: string;

  requestedStatus: "CANCELLED";

  reason: ForceCancelReason;

  reasonText: string;

  refundRequired: boolean;

  refundAmountPaise: number;

  notifyCustomer: boolean;

  notifyVendor: boolean;

  notifyCaptain: boolean;

  requestStatus: ForceCancelRequestStatus;
}

interface ForceCancelModalProps {
  isOpen: boolean;

  target: ForceCancelTarget | null;

  onClose: () => void;

  onSubmit?: (
    request: ForceCancelRequest
  ) => void | Promise<void>;

  loading?: boolean;

  readOnly?: boolean;

  title?: string;

  submitLabel?: string;
}

const REASON_OPTIONS: Array<{
  value: ForceCancelReason;
  label: string;
}> = [
  {
    value: "CUSTOMER_REQUEST",
    label: "Customer Request",
  },
  {
    value: "VENDOR_REQUEST",
    label: "Vendor Request",
  },
  {
    value: "CAPTAIN_ISSUE",
    label: "Captain Issue",
  },
  {
    value: "SYSTEM_ISSUE",
    label: "System Issue",
  },
  {
    value: "SERVICE_UNAVAILABLE",
    label: "Service Unavailable",
  },
  {
    value: "PAYMENT_ISSUE",
    label: "Payment Issue",
  },
  {
    value: "DUPLICATE_TRANSACTION",
    label: "Duplicate Transaction",
  },
  {
    value: "FRAUD_SUSPECTED",
    label: "Fraud Suspected",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const MODULE_LABELS: Record<
  ForceCancelTarget["moduleId"],
  string
> = {
  JUCART: "JuCart",
  JURIDE: "JuRide",
  JUSTAY: "JuStay",
  JUHOME: "JuHome",
  JUSHOPPING: "JuShopping",
};

const ENTITY_LABELS: Record<
  ForceCancelEntityType,
  string
> = {
  ORDER: "Order",
  BOOKING: "Booking",
  RIDE: "Ride",
  DELIVERY: "Delivery",
};

export default function ForceCancelModal({
  isOpen,
  target,
  onClose,
  onSubmit,
  loading = false,
  readOnly = false,
  title = "Force Cancel",
  submitLabel = "Submit Cancellation",
}: ForceCancelModalProps) {
  const [
    reason,
    setReason,
  ] = useState<ForceCancelReason>(
    "SYSTEM_ISSUE"
  );

  const [
    reasonText,
    setReasonText,
  ] = useState("");

  const [
    refundRequired,
    setRefundRequired,
  ] = useState(false);

  const [
    refundAmount,
    setRefundAmount,
  ] = useState("");

  const [
    notifyCustomer,
    setNotifyCustomer,
  ] = useState(true);

  const [
    notifyVendor,
    setNotifyVendor,
  ] = useState(true);

  const [
    notifyCaptain,
    setNotifyCaptain,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setReason(
      "SYSTEM_ISSUE"
    );

    setReasonText("");

    setRefundRequired(false);

    setRefundAmount("");

    setNotifyCustomer(true);

    setNotifyVendor(true);

    setNotifyCaptain(true);

    setError("");
  }, [
    isOpen,
    target?.entityId,
  ]);

  const amountPaise =
    target?.amountPaise ?? 0;

  const maximumRefundPaise =
    amountPaise;

  const parsedRefundPaise =
    useMemo(() => {
      if (
        !refundAmount.trim()
      ) {
        return 0;
      }

      const numericAmount =
        Number(
          refundAmount
        );

      if (
        !Number.isFinite(
          numericAmount
        ) ||
        numericAmount < 0
      ) {
        return -1;
      }

      return Math.round(
        numericAmount * 100
      );
    }, [
      refundAmount,
    ]);

  if (
    !isOpen ||
    !target
  ) {
    return null;
  }

  const canSubmit =
    !readOnly &&
    !loading &&
    !isAlreadyCancelled(
      target.currentStatus
    );

  function handleClose() {
    if (loading) {
      return;
    }

    onClose();
  }

  function validateRefund(): boolean {
    if (!refundRequired) {
      return true;
    }

    if (
      parsedRefundPaise <=
      0
    ) {
      setError(
        "Please enter a valid refund amount."
      );
      return false;
    }

    if (
      parsedRefundPaise >
      maximumRefundPaise
    ) {
      setError(
        `Refund cannot exceed the transaction amount of ${formatCurrency(
          maximumRefundPaise,
          target.currency
        )}.`
      );
      return false;
    }

    return true;
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");

    if (readOnly) {
      return;
    }

    if (
      isAlreadyCancelled(
        target.currentStatus
      )
    ) {
      setError(
        "This transaction is already cancelled."
      );
      return;
    }

    if (
      reasonText.trim().length <
      5
    ) {
      setError(
        "Please provide a clear cancellation reason with at least 5 characters."
      );
      return;
    }

    if (
      !validateRefund()
    ) {
      return;
    }

    const request: ForceCancelRequest =
      {
        entityId:
          target.entityId,

        entityType:
          target.entityType,

        moduleId:
          target.moduleId,

        currentStatus:
          target.currentStatus,

        requestedStatus:
          "CANCELLED",

        reason,

        reasonText:
          reasonText.trim(),

        refundRequired,

        refundAmountPaise:
          refundRequired
            ? parsedRefundPaise
            : 0,

        notifyCustomer,

        notifyVendor,

        notifyCaptain,

        requestStatus:
          "PENDING",
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
          : "Unable to submit the cancellation request."
      );
    }
  }

  return (
    <div
      className="fixed inset-0 z-[170] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="force-cancel-modal-title"
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
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
              <CancelIcon />
            </div>

            <div className="min-w-0">

              <h2
                id="force-cancel-modal-title"
                className="text-base font-black text-slate-900"
              >
                {title}
              </h2>

              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Create a protected administrative
                cancellation request.
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

        {/* FORM */}

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

                    <p className="font-mono text-[10px] font-black text-slate-800">
                      {
                        target.entityId
                      }
                    </p>

                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-red-700">
                      {
                        ENTITY_LABELS[
                          target.entityType
                        ]
                      }
                    </span>

                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-orange-700">
                      {
                        MODULE_LABELS[
                          target.moduleId
                        ]
                      }
                    </span>

                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <InfoItem
                      label="Customer"
                      value={
                        target.customerName ||
                        target.customerId ||
                        "—"
                      }
                    />

                    <InfoItem
                      label="Vendor"
                      value={
                        target.vendorName ||
                        target.vendorId ||
                        "—"
                      }
                    />

                    <InfoItem
                      label="Current Status"
                      value={
                        target.currentStatus
                      }
                    />

                  </div>

                </div>

              </div>

              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-200 pt-3 sm:grid-cols-3">

                <InfoItem
                  label="Payment"
                  value={
                    target.paymentStatus ||
                    "—"
                  }
                />

                <InfoItem
                  label="Captain"
                  value={
                    target.captainName ||
                    target.captainId ||
                    "—"
                  }
                />

                <InfoItem
                  label="Amount"
                  value={formatCurrency(
                    target.amountPaise ||
                      0,
                    target.currency
                  )}
                />

              </div>

            </div>

            {/* ALREADY CANCELLED */}

            {isAlreadyCancelled(
              target.currentStatus
            ) && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                <div className="flex items-start gap-2">

                  <WarningIcon />

                  <div>

                    <p className="text-[9px] font-black text-red-800">
                      Transaction already cancelled
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-red-700">
                      This transaction cannot be
                      force-cancelled again through
                      this override.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* REQUESTED STATUS */}

            <div>

              <FieldLabel>
                Requested Status
              </FieldLabel>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-700">
                  <CancelIcon />
                </div>

                <div>

                  <p className="text-[10px] font-black text-red-800">
                    CANCELLED
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-red-600">
                    The requested terminal state for
                    this override.
                  </p>

                </div>

              </div>

            </div>

            {/* REASON */}

            <div>

              <FieldLabel>
                Cancellation Reason
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
                      .value as ForceCancelReason
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

            {/* REASON DETAILS */}

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
                placeholder="Explain why this transaction must be force-cancelled..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-[8px] text-slate-400">
                This explanation should provide enough
                context for the administrative audit
                trail.
              </p>

            </div>

            {/* REFUND */}

            <div>

              <FieldLabel>
                Refund Handling
              </FieldLabel>

              <div className="mt-2 rounded-xl border border-slate-200 bg-white p-4">

                <label
                  className={`flex items-start gap-3 ${
                    canSubmit
                      ? "cursor-pointer"
                      : "cursor-not-allowed opacity-60"
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={
                      refundRequired
                    }
                    onChange={(
                      event
                    ) => {
                      setRefundRequired(
                        event
                          .target
                          .checked
                      );

                      if (
                        !event
                          .target
                          .checked
                      ) {
                        setRefundAmount(
                          ""
                        );
                      }
                    }}
                    disabled={
                      !canSubmit
                    }
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
                  />

                  <span>

                    <span className="block text-[9px] font-black text-slate-700">
                      Refund is required
                    </span>

                    <span className="mt-1 block text-[8px] leading-4 text-slate-400">
                      The cancellation request should
                      include a refund instruction for
                      backend review.
                    </span>

                  </span>

                </label>

                {refundRequired && (
                  <div className="mt-4 border-t border-slate-100 pt-4">

                    <div className="flex items-center justify-between gap-3">

                      <FieldLabel>
                        Refund Amount
                      </FieldLabel>

                      <span className="text-[7px] font-bold text-slate-400">
                        Max{" "}
                        {formatCurrency(
                          maximumRefundPaise,
                          target.currency
                        )}
                      </span>

                    </div>

                    <div className="relative mt-2">

                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        max={
                          maximumRefundPaise /
                          100
                        }
                        step="0.01"
                        value={
                          refundAmount
                        }
                        onChange={(
                          event
                        ) =>
                          setRefundAmount(
                            event
                              .target
                              .value
                          )
                        }
                        disabled={
                          !canSubmit
                        }
                        placeholder="0.00"
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-3 text-[10px] font-bold text-slate-700 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                      />

                    </div>

                    <p className="mt-1.5 text-[8px] text-slate-400">
                      Financial refund execution must
                      be performed and verified by the
                      trusted payment/backend workflow.
                    </p>

                  </div>
                )}

              </div>

            </div>

            {/* NOTIFICATIONS */}

            <div>

              <FieldLabel>
                Notifications
              </FieldLabel>

              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">

                <NotificationOption
                  checked={
                    notifyCustomer
                  }
                  disabled={
                    !canSubmit
                  }
                  onChange={
                    setNotifyCustomer
                  }
                  title="Customer"
                />

                <NotificationOption
                  checked={
                    notifyVendor
                  }
                  disabled={
                    !canSubmit
                  }
                  onChange={
                    setNotifyVendor
                  }
                  title="Vendor"
                />

                <NotificationOption
                  checked={
                    notifyCaptain
                  }
                  disabled={
                    !canSubmit
                  }
                  onChange={
                    setNotifyCaptain
                  }
                  title="Captain"
                />

              </div>

            </div>

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

            <div className="rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">

              <div className="flex items-start gap-2">

                <div className="mt-0.5 shrink-0 text-red-600">
                  <ShieldIcon />
                </div>

                <div>

                  <p className="text-[8px] font-black uppercase tracking-wider text-red-800">
                    Protected Cancellation Override
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-red-700">
                    Force cancellation is an exceptional
                    JUERP action. The trusted backend must
                    validate administrator role and scope,
                    current entity state, cancellation
                    eligibility, refund rules, payment
                    state, authorization, correlationId
                    and idempotencyKey before execution.
                    The browser must not independently mark
                    the transaction cancelled or execute a
                    refund.
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-[9px] font-black text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                <>
                  <CancelIcon />
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
/* NOTIFICATION OPTION */
/* -------------------------------------------------------------------------- */

function NotificationOption({
  checked,
  disabled,
  onChange,
  title,
}: {
  checked: boolean;

  disabled: boolean;

  onChange: (
    value: boolean
  ) => void;

  title: string;
}) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-2 rounded-xl border p-3 ${
        checked
          ? "border-orange-200 bg-orange-50/50"
          : "border-slate-200 bg-white"
      } ${
        disabled
          ? "cursor-not-allowed opacity-60"
          : ""
      }`}
    >
      <input
        type="checkbox"
        checked={
          checked
        }
        onChange={(
          event
        ) =>
          onChange(
            event.target
              .checked
          )
        }
        disabled={
          disabled
        }
        className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
      />

      <span className="text-[8px] font-black text-slate-700">
        {title}
      </span>
    </label>
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
/* ENTITY ICON */
/* -------------------------------------------------------------------------- */

function EntityIcon({
  type,
}: {
  type: ForceCancelEntityType;
}) {
  if (
    type === "RIDE"
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
          d="M5 17h14"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m7 17-1-6h12l-1 6"
        />

        <circle
          cx="8"
          cy="18"
          r="1.5"
        />

        <circle
          cx="16"
          cy="18"
          r="1.5"
        />

        <path
          strokeLinecap="round"
          d="m9 11 1.5-3h3L15 11"
        />
      </svg>
    );
  }

  if (
    type === "DELIVERY"
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
          d="M3 6h11v11H3z"
        />

        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 10h4l3 3v4h-7"
        />

        <circle
          cx="7"
          cy="19"
          r="1.5"
        />

        <circle
          cx="18"
          cy="19"
          r="1.5"
        />
      </svg>
    );
  }

  if (
    type === "BOOKING"
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
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
        />

        <path
          strokeLinecap="round"
          d="M8 3v4"
        />

        <path
          strokeLinecap="round"
          d="M16 3v4"
        />

        <path
          strokeLinecap="round"
          d="M4 10h16"
        />

        <path
          strokeLinecap="round"
          d="M8 14h3"
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
      <rect
        x="4"
        y="5"
        width="16"
        height="14"
        rx="2"
      />

      <path
        strokeLinecap="round"
        d="M8 9h8"
      />

      <path
        strokeLinecap="round"
        d="M8 13h5"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* ICONS */
/* -------------------------------------------------------------------------- */

function CancelIcon() {
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
        d="m9 9 6 6"
      />

      <path
        strokeLinecap="round"
        d="m15 9-6 6"
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

/* -------------------------------------------------------------------------- */
/* HELPERS */
/* -------------------------------------------------------------------------- */

function isAlreadyCancelled(
  status: string
): boolean {
  return (
    status ===
      "CANCELLED" ||
    status ===
      "REFUNDED"
  );
}

function formatCurrency(
  amountPaise: number,
  currency = "INR"
): string {
  const amount =
    amountPaise / 100;

  try {
    return new Intl.NumberFormat(
      "en-IN",
      {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
      }
    ).format(amount);
  } catch {
    return `₹${amount.toFixed(
      2
    )}`;
  }
}