"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ManualRefundEntityType =
  | "ORDER"
  | "BOOKING"
  | "RIDE"
  | "DELIVERY";

export type ManualRefundReason =
  | "CUSTOMER_REQUEST"
  | "DUPLICATE_PAYMENT"
  | "PAYMENT_FAILURE"
  | "ORDER_CANCELLED"
  | "BOOKING_CANCELLED"
  | "RIDE_CANCELLED"
  | "SERVICE_UNAVAILABLE"
  | "SYSTEM_ISSUE"
  | "CASHFREE_ISSUE"
  | "OTHER";

export type ManualRefundStatus =
  | "PENDING"
  | "APPROVED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "REJECTED";

export interface ManualRefundTarget {
  entityId: string;

  entityType: ManualRefundEntityType;

  moduleId:
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING";

  customerId?: string;

  customerName?: string;

  customerPhone?: string;

  vendorId?: string;

  vendorName?: string;

  paymentId?: string;

  cashfreeOrderId?: string;

  currentStatus: string;

  paymentStatus:
    | "CREATED"
    | "PENDING"
    | "PAID"
    | "FAILED"
    | "REFUNDED"
    | "PARTIALLY_REFUNDED"
    | "CANCELLED";

  amountPaise: number;

  refundedAmountPaise?: number;

  currency?: string;
}

export interface ManualRefundRequest {
  entityId: string;

  entityType: ManualRefundEntityType;

  moduleId:
    | "JUCART"
    | "JURIDE"
    | "JUSTAY"
    | "JUHOME"
    | "JUSHOPPING";

  paymentId?: string;

  cashfreeOrderId?: string;

  reason: ManualRefundReason;

  reasonText: string;

  refundAmountPaise: number;

  currency: string;

  notifyCustomer: boolean;

  requestStatus: ManualRefundStatus;

  requestedAt: string;
}

interface ManualRefundModalProps {
  isOpen: boolean;

  target: ManualRefundTarget | null;

  onClose: () => void;

  onSubmit?: (
    request: ManualRefundRequest
  ) => void | Promise<void>;

  loading?: boolean;

  readOnly?: boolean;

  title?: string;

  submitLabel?: string;
}

const REASON_OPTIONS: Array<{
  value: ManualRefundReason;
  label: string;
}> = [
  {
    value: "CUSTOMER_REQUEST",
    label: "Customer Request",
  },
  {
    value: "DUPLICATE_PAYMENT",
    label: "Duplicate Payment",
  },
  {
    value: "PAYMENT_FAILURE",
    label: "Payment Failure",
  },
  {
    value: "ORDER_CANCELLED",
    label: "Order Cancelled",
  },
  {
    value: "BOOKING_CANCELLED",
    label: "Booking Cancelled",
  },
  {
    value: "RIDE_CANCELLED",
    label: "Ride Cancelled",
  },
  {
    value: "SERVICE_UNAVAILABLE",
    label: "Service Unavailable",
  },
  {
    value: "SYSTEM_ISSUE",
    label: "System Issue",
  },
  {
    value: "CASHFREE_ISSUE",
    label: "Cashfree / Payment Gateway Issue",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const MODULE_LABELS: Record<
  ManualRefundTarget["moduleId"],
  string
> = {
  JUCART: "JuCart",
  JURIDE: "JuRide",
  JUSTAY: "JuStay",
  JUHOME: "JuHome",
  JUSHOPPING: "JuShopping",
};

const ENTITY_LABELS: Record<
  ManualRefundEntityType,
  string
> = {
  ORDER: "Order",
  BOOKING: "Booking",
  RIDE: "Ride",
  DELIVERY: "Delivery",
};

const PAYMENT_STATUS_LABELS: Record<
  ManualRefundTarget["paymentStatus"],
  string
> = {
  CREATED: "Created",
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially Refunded",
  CANCELLED: "Cancelled",
};

export default function ManualRefundModal({
  isOpen,
  target,
  onClose,
  onSubmit,
  loading = false,
  readOnly = false,
  title = "Manual Refund",
  submitLabel = "Submit Refund Request",
}: ManualRefundModalProps) {
  const [
    reason,
    setReason,
  ] = useState<ManualRefundReason>(
    "CUSTOMER_REQUEST"
  );

  const [
    reasonText,
    setReasonText,
  ] = useState("");

  const [
    refundAmount,
    setRefundAmount,
  ] = useState("");

  const [
    notifyCustomer,
    setNotifyCustomer,
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
      "CUSTOMER_REQUEST"
    );

    setReasonText("");

    setRefundAmount("");

    setNotifyCustomer(true);

    setError("");
  }, [
    isOpen,
    target?.entityId,
  ]);

  const alreadyRefundedPaise =
    target?.refundedAmountPaise ?? 0;

  const transactionAmountPaise =
    target?.amountPaise ?? 0;

  const refundableAmountPaise =
    Math.max(
      0,
      transactionAmountPaise -
        alreadyRefundedPaise
    );

  const requestedRefundPaise =
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

  const isPaymentRefundable =
    target
      ? target.paymentStatus ===
          "PAID" ||
        target.paymentStatus ===
          "PARTIALLY_REFUNDED"
      : false;

  const canSubmit =
    !readOnly &&
    !loading &&
    Boolean(target) &&
    isPaymentRefundable &&
    refundableAmountPaise > 0;

  if (
    !isOpen ||
    !target
  ) {
    return null;
  }

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

    if (!isPaymentRefundable) {
      setError(
        "A manual refund can only be requested for a paid or partially refunded payment."
      );
      return;
    }

    if (
      refundableAmountPaise <=
      0
    ) {
      setError(
        "There is no refundable balance remaining for this transaction."
      );
      return;
    }

    if (
      reasonText.trim().length <
      5
    ) {
      setError(
        "Please provide a clear refund reason with at least 5 characters."
      );
      return;
    }

    if (
      requestedRefundPaise <=
      0
    ) {
      setError(
        "Please enter a valid refund amount."
      );
      return;
    }

    if (
      requestedRefundPaise >
      refundableAmountPaise
    ) {
      setError(
        `Refund cannot exceed the remaining refundable amount of ${formatCurrency(
          refundableAmountPaise,
          target.currency
        )}.`
      );
      return;
    }

    const request: ManualRefundRequest =
      {
        entityId:
          target.entityId,

        entityType:
          target.entityType,

        moduleId:
          target.moduleId,

        paymentId:
          target.paymentId,

        cashfreeOrderId:
          target.cashfreeOrderId,

        reason,

        reasonText:
          reasonText.trim(),

        refundAmountPaise:
          requestedRefundPaise,

        currency:
          target.currency ||
          "INR",

        notifyCustomer,

        requestStatus:
          "PENDING",

        requestedAt:
          new Date().toISOString(),
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
          : "Unable to submit the refund request."
      );
    }
  }

  function handleFullRefund() {
    if (!canSubmit) {
      return;
    }

    setRefundAmount(
      (
        refundableAmountPaise /
        100
      ).toFixed(2)
    );
  }

  return (
    <div
      className="fixed inset-0 z-[170] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-refund-modal-title"
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

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
              <RefundIcon />
            </div>

            <div className="min-w-0">

              <h2
                id="manual-refund-modal-title"
                className="text-base font-black text-slate-900"
              >
                {title}
              </h2>

              <p className="mt-1 text-[9px] leading-4 text-slate-500">
                Create a protected refund request for
                an eligible payment.
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

            {/* PAYMENT TARGET */}

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

                    <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-orange-700">
                      {
                        MODULE_LABELS[
                          target.moduleId
                        ]
                      }
                    </span>

                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[7px] font-black uppercase tracking-wide text-slate-600">
                      {
                        ENTITY_LABELS[
                          target.entityType
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
                      label="Payment"
                      value={
                        PAYMENT_STATUS_LABELS[
                          target.paymentStatus
                        ]
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

              {/* PAYMENT IDS */}

              {(target.paymentId ||
                target.cashfreeOrderId) && (
                <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2">

                  <InfoItem
                    label="Payment ID"
                    value={
                      target.paymentId ||
                      "—"
                    }
                  />

                  <InfoItem
                    label="Cashfree Order ID"
                    value={
                      target.cashfreeOrderId ||
                      "—"
                    }
                  />

                </div>
              )}

              {/* FINANCIAL SUMMARY */}

              <div className="mt-3 grid grid-cols-1 gap-3 border-t border-slate-200 pt-3 sm:grid-cols-3">

                <MoneyInfo
                  label="Transaction Amount"
                  amountPaise={
                    transactionAmountPaise
                  }
                  currency={
                    target.currency
                  }
                />

                <MoneyInfo
                  label="Already Refunded"
                  amountPaise={
                    alreadyRefundedPaise
                  }
                  currency={
                    target.currency
                  }
                />

                <MoneyInfo
                  label="Refundable Balance"
                  amountPaise={
                    refundableAmountPaise
                  }
                  currency={
                    target.currency
                  }
                  highlight
                />

              </div>

            </div>

            {/* PAYMENT NOT REFUNDABLE */}

            {!isPaymentRefundable && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">

                <div className="flex items-start gap-2">

                  <WarningIcon />

                  <div>

                    <p className="text-[9px] font-black text-amber-800">
                      Payment is not currently refundable
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-amber-700">
                      Manual refunds are available only
                      when the authoritative payment state
                      is PAID or PARTIALLY_REFUNDED.
                    </p>

                  </div>

                </div>

              </div>
            )}

            {/* REFUND REASON */}

            <div>

              <FieldLabel>
                Refund Reason
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
                      .value as ManualRefundReason
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
                  Refund Details
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
                placeholder="Explain why this refund is required..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[10px] leading-5 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
              />

              <p className="mt-1.5 text-[8px] text-slate-400">
                This explanation becomes part of the
                administrative refund audit trail.
              </p>

            </div>

            {/* REFUND AMOUNT */}

            <div>

              <div className="flex items-center justify-between gap-3">

                <FieldLabel>
                  Refund Amount
                </FieldLabel>

                <button
                  type="button"
                  onClick={
                    handleFullRefund
                  }
                  disabled={
                    !canSubmit
                  }
                  className="text-[8px] font-black text-orange-600 transition hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Refund Full Balance
                </button>

              </div>

              <div className="relative mt-2">

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400">
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  max={
                    refundableAmountPaise /
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
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-8 pr-3 text-sm font-black text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                />

              </div>

              <div className="mt-2 flex items-center justify-between gap-3">

                <p className="text-[8px] text-slate-400">
                  Maximum refundable:
                </p>

                <p className="text-[9px] font-black text-slate-700">
                  {formatCurrency(
                    refundableAmountPaise,
                    target.currency
                  )}
                </p>

              </div>

            </div>

            {/* CUSTOMER NOTIFICATION */}

            <div>

              <FieldLabel>
                Customer Notification
              </FieldLabel>

              <label
                className={`mt-2 flex items-start gap-3 rounded-xl border p-4 ${
                  notifyCustomer
                    ? "border-orange-200 bg-orange-50/50"
                    : "border-slate-200 bg-white"
                } ${
                  canSubmit
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-60"
                }`}
              >

                <input
                  type="checkbox"
                  checked={
                    notifyCustomer
                  }
                  onChange={(
                    event
                  ) =>
                    setNotifyCustomer(
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
                    Notify customer about refund
                  </span>

                  <span className="mt-1 block text-[8px] leading-4 text-slate-400">
                    Notification should be dispatched
                    only after the trusted backend confirms
                    the appropriate refund state.
                  </span>

                </span>

              </label>

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

            <div className="rounded-xl border border-orange-100 bg-orange-50/60 px-4 py-3">

              <div className="flex items-start gap-2">

                <div className="mt-0.5 shrink-0 text-orange-600">
                  <ShieldIcon />
                </div>

                <div>

                  <p className="text-[8px] font-black uppercase tracking-wider text-orange-800">
                    Protected Financial Action
                  </p>

                  <p className="mt-1 text-[8px] leading-4 text-orange-700">
                    This component creates a refund
                    request only. Refund execution must
                    remain server-side. The trusted backend
                    must validate authorization, payment
                    state, refundable balance, Cashfree
                    state, idempotency, correlationId and
                    audit requirements before executing or
                    marking a refund as successful.
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-[9px] font-black text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Spinner />
                  Processing...
                </>
              ) : (
                <>
                  <RefundIcon />
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
    <div className="min-w-0">
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
/* MONEY INFO */
/* -------------------------------------------------------------------------- */

function MoneyInfo({
  label,
  amountPaise,
  currency,
  highlight = false,
}: {
  label: string;

  amountPaise: number;

  currency?: string;

  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-lg bg-orange-50 p-2"
          : ""
      }
    >
      <p className="text-[7px] font-black uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-1 text-[9px] font-black ${
          highlight
            ? "text-orange-700"
            : "text-slate-800"
        }`}
      >
        {formatCurrency(
          amountPaise,
          currency
        )}
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
  type: ManualRefundEntityType;
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

function RefundIcon() {
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
        d="M9 7H5v4"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 11a7 7 0 1 0 2-5"
      />

      <path
        strokeLinecap="round"
        d="M12 9v6"
      />

      <path
        strokeLinecap="round"
        d="M10 11h3a1.5 1.5 0 0 1 0 3h-3"
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
      className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
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