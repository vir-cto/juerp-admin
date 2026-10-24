"use client";

import {
  ReactNode,
  useEffect,
} from "react";

export type CashfreeAuditReconciliationStatus =
  | "MATCHED"
  | "MISMATCH"
  | "PENDING"
  | "INVESTIGATING"
  | "RESOLVED";

export type CashfreeAuditPaymentStatus =
  | "CREATED"
  | "PENDING"
  | "PAID"
  | "FAILED"
  | "REFUNDED"
  | "PARTIALLY_REFUNDED"
  | "CANCELLED";

export type CashfreeAuditEntityType =
  | "ORDER"
  | "BOOKING"
  | "RIDE";

export interface CashfreeAuditRecord {
  reconciliationId: string;
  paymentId: string;
  cashfreeOrderId: string;
  entityId: string;
  entityType: CashfreeAuditEntityType;
  customerId: string;
  amountPaise: number;
  cashfreeAmountPaise: number;
  paymentStatus: CashfreeAuditPaymentStatus;
  reconciliationStatus: CashfreeAuditReconciliationStatus;
  eventType: string;
  signatureVerified: boolean;
  currency: string;
  receivedAt: string;
  reconciledAt?: string;
  mismatchReason?: string;
  correlationId: string;
}

interface CashfreeAuditModalProps {
  isOpen: boolean;

  record: CashfreeAuditRecord | null;

  onClose: () => void;

  onResolve?: (
    record: CashfreeAuditRecord
  ) => void;

  loading?: boolean;

  readOnly?: boolean;
}

const RECONCILIATION_CONFIG: Record<
  CashfreeAuditReconciliationStatus,
  {
    label: string;
    background: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  MATCHED: {
    label: "Matched",
    background: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    dot: "bg-green-500",
  },

  MISMATCH: {
    label: "Mismatch",
    background: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    dot: "bg-red-500",
  },

  PENDING: {
    label: "Pending",
    background: "bg-amber-100",
    text: "text-amber-700",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },

  INVESTIGATING: {
    label: "Investigating",
    background: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
  },

  RESOLVED: {
    label: "Resolved",
    background: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    dot: "bg-purple-500",
  },
};

const PAYMENT_CONFIG: Record<
  CashfreeAuditPaymentStatus,
  {
    label: string;
    background: string;
    text: string;
  }
> = {
  CREATED: {
    label: "Created",
    background: "bg-slate-100",
    text: "text-slate-700",
  },

  PENDING: {
    label: "Pending",
    background: "bg-amber-100",
    text: "text-amber-700",
  },

  PAID: {
    label: "Paid",
    background: "bg-green-100",
    text: "text-green-700",
  },

  FAILED: {
    label: "Failed",
    background: "bg-red-100",
    text: "text-red-700",
  },

  REFUNDED: {
    label: "Refunded",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  PARTIALLY_REFUNDED: {
    label: "Partially Refunded",
    background: "bg-purple-100",
    text: "text-purple-700",
  },

  CANCELLED: {
    label: "Cancelled",
    background: "bg-slate-100",
    text: "text-slate-700",
  },
};

function formatCurrency(
  amountPaise: number,
  currency = "INR"
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }
  ).format(amountPaise / 100);
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

  return new Intl.DateTimeFormat(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  ).format(date);
}

function getAmountDifference(
  record: CashfreeAuditRecord
): number {
  return (
    record.cashfreeAmountPaise -
    record.amountPaise
  );
}

function formatDifference(
  differencePaise: number,
  currency: string
): string {
  if (differencePaise === 0) {
    return "₹0.00";
  }

  const absoluteValue =
    formatCurrency(
      Math.abs(differencePaise),
      currency
    );

  return differencePaise > 0
    ? `+${absoluteValue}`
    : `-${absoluteValue}`;
}

function ModalIcon() {
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
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path
        strokeLinecap="round"
        d="M3 10h18"
      />

      <path
        strokeLinecap="round"
        d="M7 15h3"
      />
    </svg>
  );
}

function CloseIcon() {
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
        d="M6 6l12 12"
      />

      <path
        strokeLinecap="round"
        d="M18 6L6 18"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12l4 4L19 6"
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
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.3 4.6L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.6a2 2 0 00-3.4 0z"
      />

      <path
        strokeLinecap="round"
        d="M12 9v4"
      />

      <circle
        cx="12"
        cy="16.5"
        r=".75"
        fill="currentColor"
        stroke="none"
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
        d="M12 3l7 3v5c0 4.5-2.9 8-7 10-4.1-2-7-5.5-7-10V6l7-3z"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4"
      />
    </svg>
  );
}

function CopyButton({
  value,
}: {
  value: string;
}) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        value
      );
    } catch {
      // Clipboard access may be blocked by
      // browser permissions.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[8px] font-bold text-slate-500 transition hover:border-orange-200 hover:text-orange-600"
    >
      Copy
    </button>
  );
}

function InfoRow({
  label,
  value,
  copyable = false,
  mono = false,
}: {
  label: string;
  value: string;
  copyable?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-slate-100 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <div className="flex min-w-0 items-center justify-between gap-2 sm:justify-end">

        <span
          className={`break-all text-right text-[10px] font-semibold text-slate-700 ${
            mono
              ? "font-mono"
              : ""
          }`}
        >
          {value}
        </span>

        {copyable && (
          <CopyButton value={value} />
        )}

      </div>
    </div>
  );
}

export default function CashfreeAuditModal({
  isOpen,
  record,
  onClose,
  onResolve,
  loading = false,
  readOnly = false,
}: CashfreeAuditModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape" &&
        !loading
      ) {
        onClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [
    isOpen,
    loading,
    onClose,
  ]);

  if (
    !isOpen ||
    !record
  ) {
    return null;
  }

  const reconciliation =
    RECONCILIATION_CONFIG[
      record.reconciliationStatus
    ];

  const payment =
    PAYMENT_CONFIG[
      record.paymentStatus
    ];

  const amountDifference =
    getAmountDifference(record);

  const isAmountMatched =
    amountDifference === 0;

  const canResolve =
    !readOnly &&
    !loading &&
    (record.reconciliationStatus ===
      "MISMATCH" ||
      record.reconciliationStatus ===
        "INVESTIGATING");

  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (
      event.target !==
      event.currentTarget
    ) {
      return;
    }

    if (!loading) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cashfree-audit-title"
      onMouseDown={
        handleBackdropClick
      }
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <ModalIcon />
            </div>

            <div className="min-w-0">

              <h2
                id="cashfree-audit-title"
                className="truncate text-base font-black text-slate-900"
              >
                Cashfree Audit Details
              </h2>

              <p className="mt-1 truncate text-[10px] text-slate-400">
                Reconciliation ID:{" "}
                {record.reconciliationId}
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CloseIcon />
          </button>

        </div>

        {/* BODY */}

        <div className="min-h-0 flex-1 overflow-y-auto">

          <div className="space-y-5 p-5 sm:p-6">

            {/* STATUS BANNER */}

            <div
              className={`rounded-2xl border ${reconciliation.border} ${reconciliation.background} p-4`}
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-3">

                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${reconciliation.background} ${reconciliation.text}`}
                  >
                    {record.reconciliationStatus ===
                    "MATCHED" ? (
                      <CheckIcon />
                    ) : (
                      <WarningIcon />
                    )}
                  </span>

                  <div>
                    <p
                      className={`text-sm font-black ${reconciliation.text}`}
                    >
                      {
                        reconciliation.label
                      }
                    </p>

                    <p className="mt-0.5 text-[9px] font-medium text-slate-500">
                      Cashfree reconciliation
                      status
                    </p>
                  </div>

                </div>

                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-black uppercase ${reconciliation.background} ${reconciliation.text}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${reconciliation.dot}`}
                  />

                  {
                    record.reconciliationStatus
                  }
                </span>

              </div>

              {record.mismatchReason && (
                <div className="mt-4 rounded-xl border border-red-200 bg-white/60 p-3">
                  <p className="text-[8px] font-black uppercase tracking-wider text-red-500">
                    Mismatch Reason
                  </p>

                  <p className="mt-1 text-[10px] font-semibold leading-5 text-red-800">
                    {
                      record.mismatchReason
                    }
                  </p>
                </div>
              )}

            </div>

            {/* PAYMENT SUMMARY */}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

              <SummaryBox
                label="Internal Amount"
                value={formatCurrency(
                  record.amountPaise,
                  record.currency
                )}
              />

              <SummaryBox
                label="Cashfree Amount"
                value={formatCurrency(
                  record.cashfreeAmountPaise,
                  record.currency
                )}
              />

              <SummaryBox
                label="Difference"
                value={formatDifference(
                  amountDifference,
                  record.currency
                )}
                valueClassName={
                  isAmountMatched
                    ? "text-green-600"
                    : "text-red-600"
                }
              />

            </div>

            {/* PAYMENT STATUS */}

            <section className="rounded-2xl border border-slate-200 bg-white">

              <SectionHeader
                title="Payment Information"
                icon={<ModalIcon />}
              />

              <div className="px-4 sm:px-5">

                <InfoRow
                  label="Payment ID"
                  value={
                    record.paymentId
                  }
                  copyable
                  mono
                />

                <InfoRow
                  label="Cashfree Order ID"
                  value={
                    record.cashfreeOrderId
                  }
                  copyable
                  mono
                />

                <InfoRow
                  label="Payment Status"
                  value={
                    payment.label
                  }
                />

                <InfoRow
                  label="Currency"
                  value={
                    record.currency
                  }
                />

                <InfoRow
                  label="Entity Type"
                  value={
                    record.entityType
                  }
                />

                <InfoRow
                  label="Entity ID"
                  value={
                    record.entityId
                  }
                  copyable
                  mono
                />

                <InfoRow
                  label="Customer ID"
                  value={
                    record.customerId
                  }
                  copyable
                  mono
                />

              </div>

            </section>

            {/* WEBHOOK / EVENT */}

            <section className="rounded-2xl border border-slate-200 bg-white">

              <SectionHeader
                title="Cashfree Event Audit"
                icon={<ShieldIcon />}
              />

              <div className="px-4 sm:px-5">

                <InfoRow
                  label="Event Type"
                  value={
                    record.eventType
                  }
                  mono
                />

                <InfoRow
                  label="Signature Verification"
                  value={
                    record.signatureVerified
                      ? "Verified"
                      : "Not Verified"
                  }
                />

                <InfoRow
                  label="Received At"
                  value={formatDate(
                    record.receivedAt
                  )}
                />

                <InfoRow
                  label="Reconciled At"
                  value={formatDate(
                    record.reconciledAt
                  )}
                />

              </div>

              <div className="m-4 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:m-5">

                <div className="flex items-start gap-2">

                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      record.signatureVerified
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {record.signatureVerified ? (
                      <CheckIcon />
                    ) : (
                      <WarningIcon />
                    )}
                  </span>

                  <div>
                    <p className="text-[9px] font-black text-slate-700">
                      Webhook Signature
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-slate-500">
                      {record.signatureVerified
                        ? "The Cashfree event signature was verified before the event entered the reconciliation flow."
                        : "The Cashfree event signature has not been verified. Financial processing must not treat this event as authoritative."}
                    </p>
                  </div>

                </div>

              </div>

            </section>

            {/* RECONCILIATION */}

            <section className="rounded-2xl border border-slate-200 bg-white">

              <SectionHeader
                title="Reconciliation"
                icon={<CheckIcon />}
              />

              <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 sm:p-5">

                <AuditCheck
                  label="Amount Match"
                  passed={
                    isAmountMatched
                  }
                  detail={
                    isAmountMatched
                      ? "Internal and Cashfree amounts match."
                      : `Difference detected: ${formatDifference(
                          amountDifference,
                          record.currency
                        )}`
                  }
                />

                <AuditCheck
                  label="Signature Verified"
                  passed={
                    record.signatureVerified
                  }
                  detail={
                    record.signatureVerified
                      ? "Webhook signature verified."
                      : "Webhook signature requires verification."
                  }
                />

                <AuditCheck
                  label="Payment Recorded"
                  passed={
                    Boolean(
                      record.paymentId
                    )
                  }
                  detail={
                    record.paymentId
                      ? "Payment record is present."
                      : "Payment record is unavailable."
                  }
                />

                <AuditCheck
                  label="Cashfree Reference"
                  passed={
                    Boolean(
                      record.cashfreeOrderId
                    )
                  }
                  detail={
                    record.cashfreeOrderId
                      ? "Cashfree order reference is present."
                      : "Cashfree order reference is unavailable."
                  }
                />

              </div>

            </section>

            {/* CORRELATION / AUDIT */}

            <section className="rounded-2xl border border-slate-200 bg-white">

              <SectionHeader
                title="Audit Trace"
                icon={<ShieldIcon />}
              />

              <div className="px-4 sm:px-5">

                <InfoRow
                  label="Reconciliation ID"
                  value={
                    record.reconciliationId
                  }
                  copyable
                  mono
                />

                <InfoRow
                  label="Correlation ID"
                  value={
                    record.correlationId
                  }
                  copyable
                  mono
                />

              </div>

            </section>

            {/* GOVERNANCE */}

            <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">

              <div className="flex items-start gap-3">

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <ShieldIcon />
                </span>

                <div>

                  <p className="text-[10px] font-black text-orange-900">
                    Financial Governance
                  </p>

                  <p className="mt-1 text-[9px] leading-5 text-orange-800">
                    Cashfree financial status
                    must be established by
                    the trusted backend after
                    webhook signature
                    verification. This modal
                    only displays audit data.
                    Browser-side actions must
                    not independently mark a
                    payment as paid, refunded,
                    settled, or reconciled.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* FOOTER */}

        <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

          <p className="text-[8px] leading-4 text-slate-400">
            Financial actions require
            authorized backend execution,
            correlation ID, idempotency, and
            audit logging.
          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Close
            </button>

            {canResolve &&
              onResolve && (
                <button
                  type="button"
                  onClick={() =>
                    onResolve(record)
                  }
                  disabled={loading}
                  className="rounded-xl bg-orange-500 px-4 py-2.5 text-[10px] font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Processing..."
                    : "Mark for Resolution"}
                </button>
              )}

          </div>

        </div>

      </div>
    </div>
  );
}

function SectionHeader({
  title,
  icon,
}: {
  title: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3 sm:px-5">

      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </span>

      <h3 className="text-xs font-black text-slate-800">
        {title}
      </h3>

    </div>
  );
}

function SummaryBox({
  label,
  value,
  valueClassName = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

      <p className="text-[8px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p
        className={`mt-2 text-lg font-black ${valueClassName}`}
      >
        {value}
      </p>

    </div>
  );
}

function AuditCheck({
  label,
  passed,
  detail,
}: {
  label: string;
  passed: boolean;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">

      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
          passed
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {passed ? (
          <CheckIcon />
        ) : (
          <WarningIcon />
        )}
      </span>

      <div className="min-w-0">

        <p className="text-[10px] font-black text-slate-700">
          {label}
        </p>

        <p className="mt-1 text-[9px] leading-4 text-slate-500">
          {detail}
        </p>

      </div>

    </div>
  );
}