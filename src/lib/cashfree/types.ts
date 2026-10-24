export type CashfreeEnvironment =
  | "sandbox"
  | "production";

export type CashfreeCurrency = "INR";

export type CashfreePaymentStatus =
  | "USER_DROPPED"
  | "FAILED"
  | "SUCCESS"
  | "PENDING"
  | "NOT_ATTEMPTED";

export type CashfreeRefundStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

export type CashfreePayoutStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

export type CashfreeWebhookEventType =
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "PAYMENT_USER_DROPPED"
  | "REFUND_STATUS"
  | "PAYOUT_SUCCESS"
  | "PAYOUT_FAILED"
  | "PAYOUT_PENDING";

export type CashfreeAuditAction =
  | "PAYMENT_CREATED"
  | "PAYMENT_SUCCESS"
  | "PAYMENT_FAILED"
  | "PAYMENT_PENDING"
  | "PAYMENT_REFUNDED"
  | "REFUND_CREATED"
  | "REFUND_SUCCESS"
  | "REFUND_FAILED"
  | "PAYOUT_CREATED"
  | "PAYOUT_SUCCESS"
  | "PAYOUT_FAILED"
  | "WEBHOOK_RECEIVED"
  | "RECONCILIATION_STARTED"
  | "RECONCILIATION_COMPLETED"
  | "RECONCILIATION_FAILED";

export type CashfreeAuditStatus =
  | "SUCCESS"
  | "FAILED"
  | "PENDING"
  | "RECEIVED";

/**
 * Common identifiers used to connect Cashfree activity
 * with JUONE business transactions.
 */
export type CashfreeCorrelation = {
  correlationId: string;

  orderId?: string;
  paymentId?: string;
  refundId?: string;
  settlementId?: string;
  payoutId?: string;
};

/**
 * Cashfree payment amount.
 *
 * JUONE financial values are represented in paise internally.
 * Cashfree API integrations may use the provider's required
 * monetary representation at the server boundary.
 */
export type CashfreeAmount = {
  amountPaise: number;
  currency: CashfreeCurrency;
};

/**
 * Cashfree payment/order information used by JuERP.
 */
export type CashfreePayment = {
  paymentId?: string;

  orderId: string;

  cashfreeOrderId?: string;
  cashfreePaymentId?: string;

  status: CashfreePaymentStatus;

  amountPaise: number;
  currency: CashfreeCurrency;

  paymentMethod?: string;

  bankReference?: string;

  paymentTime?: string;

  createdAt?: string;
  updatedAt?: string;

  correlationId: string;
};

/**
 * Cashfree refund information.
 */
export type CashfreeRefund = {
  refundId: string;

  orderId?: string;
  paymentId?: string;

  cashfreeRefundId?: string;

  status: CashfreeRefundStatus;

  amountPaise: number;

  currency: CashfreeCurrency;

  refundNote?: string;

  refundTime?: string;

  createdAt?: string;
  updatedAt?: string;

  correlationId: string;
};

/**
 * Cashfree payout information.
 *
 * Secrets, authentication credentials and provider
 * signing keys must never be stored in this type.
 */
export type CashfreePayout = {
  payoutId: string;

  settlementId?: string;

  cashfreePayoutId?: string;

  status: CashfreePayoutStatus;

  amountPaise: number;

  currency: CashfreeCurrency;

  beneficiaryId?: string;

  transferReference?: string;

  payoutTime?: string;

  createdAt?: string;
  updatedAt?: string;

  correlationId: string;
};

/**
 * Cashfree webhook event.
 *
 * Signature verification must be performed by the
 * trusted backend before this event is accepted.
 */
export type CashfreeWebhookEvent = {
  eventId: string;

  eventType: CashfreeWebhookEventType;

  receivedAt: string;

  correlationId?: string;

  orderId?: string;
  paymentId?: string;
  refundId?: string;
  payoutId?: string;

  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  cashfreeRefundId?: string;

  amountPaise?: number;

  currency?: CashfreeCurrency;

  idempotencyKey?: string;

  /**
   * Raw provider payload should be handled server-side.
   * This field is optional and should not be exposed
   * unnecessarily to browser clients.
   */
  payload?: unknown;
};

/**
 * Cashfree reconciliation record.
 */
export type CashfreeReconciliationRecord = {
  reconciliationId: string;

  correlationId: string;

  orderId?: string;
  paymentId?: string;
  refundId?: string;
  payoutId?: string;
  settlementId?: string;

  expectedAmountPaise?: number;

  actualAmountPaise?: number;

  differencePaise?: number;

  status:
    | "MATCHED"
    | "MISMATCH"
    | "PENDING"
    | "FAILED";

  reason?: string;

  calculationVersion?: string;

  createdAt: string;
  updatedAt?: string;
};

/**
 * Cashfree audit record.
 */
export type CashfreeAuditRecord = {
  auditId: string;

  action: CashfreeAuditAction;

  status: CashfreeAuditStatus;

  correlationId: string;

  paymentId?: string;
  orderId?: string;
  refundId?: string;
  settlementId?: string;
  payoutId?: string;

  amountPaise?: number;

  currency?: CashfreeCurrency;

  cashfreeReferenceId?: string;

  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  cashfreeRefundId?: string;

  eventId?: string;

  idempotencyKey?: string;

  calculationVersion?: string;

  message?: string;

  createdAt: string;
};

/**
 * Cashfree reconciliation request.
 */
export type CashfreeReconciliationRequest = {
  correlationId: string;

  orderId?: string;

  paymentId?: string;

  refundId?: string;

  payoutId?: string;

  settlementId?: string;

  expectedAmountPaise?: number;

  calculationVersion?: string;
};

/**
 * Result returned by the trusted backend after
 * reconciliation.
 */
export type CashfreeReconciliationResult = {
  success: boolean;

  reconciliationId?: string;

  status:
    | "MATCHED"
    | "MISMATCH"
    | "PENDING"
    | "FAILED";

  differencePaise?: number;

  message?: string;

  correlationId: string;
};

/**
 * Cashfree audit creation request.
 */
export type CreateCashfreeAuditInput = {
  action: CashfreeAuditAction;

  status: CashfreeAuditStatus;

  correlationId: string;

  paymentId?: string;
  orderId?: string;
  refundId?: string;
  settlementId?: string;
  payoutId?: string;

  amountPaise?: number;

  currency?: CashfreeCurrency;

  cashfreeReferenceId?: string;

  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  cashfreeRefundId?: string;

  eventId?: string;

  idempotencyKey?: string;

  calculationVersion?: string;

  message?: string;
};

/**
 * Generic Cashfree API response.
 */
export type CashfreeApiResponse<T> = {
  success: boolean;

  data?: T;

  message?: string;

  correlationId?: string;

  errorCode?: string;
};

/**
 * Cashfree payment creation request.
 *
 * This type contains only data needed by the application.
 * Cashfree authentication credentials must remain on the
 * server.
 */
export type CashfreePaymentRequest = {
  orderId: string;

  amountPaise: number;

  currency: CashfreeCurrency;

  customerId: string;

  customerEmail?: string;

  customerPhone?: string;

  customerName?: string;

  returnUrl?: string;

  notifyUrl?: string;

  correlationId: string;

  idempotencyKey: string;
};

/**
 * Payment creation response returned by the backend.
 */
export type CashfreePaymentResponse = {
  success: boolean;

  orderId: string;

  paymentId?: string;

  cashfreeOrderId?: string;

  paymentSessionId?: string;

  status?: CashfreePaymentStatus;

  correlationId: string;

  message?: string;
};

/**
 * Refund request.
 */
export type CashfreeRefundRequest = {
  orderId: string;

  paymentId?: string;

  amountPaise: number;

  refundNote?: string;

  correlationId: string;

  idempotencyKey: string;
};

/**
 * Refund response.
 */
export type CashfreeRefundResponse = {
  success: boolean;

  refundId?: string;

  cashfreeRefundId?: string;

  status?: CashfreeRefundStatus;

  correlationId: string;

  message?: string;
};

/**
 * Payout request.
 *
 * The actual payout operation must be performed by the
 * trusted backend.
 */
export type CashfreePayoutRequest = {
  payoutId: string;

  settlementId: string;

  beneficiaryId: string;

  amountPaise: number;

  currency: CashfreeCurrency;

  correlationId: string;

  idempotencyKey: string;
};

/**
 * Payout response.
 */
export type CashfreePayoutResponse = {
  success: boolean;

  payoutId: string;

  cashfreePayoutId?: string;

  status?: CashfreePayoutStatus;

  correlationId: string;

  message?: string;
};