"use client";

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

  currency?: string;

  /**
   * Cashfree transaction/reference identifiers.
   */
  cashfreeReferenceId?: string;
  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  cashfreeRefundId?: string;

  /**
   * Webhook idempotency information.
   */
  eventId?: string;
  idempotencyKey?: string;

  /**
   * Backend supplied calculation version.
   */
  calculationVersion?: string;

  message?: string;

  createdAt: string;
};

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

  currency?: string;

  cashfreeReferenceId?: string;
  cashfreeOrderId?: string;
  cashfreePaymentId?: string;
  cashfreeRefundId?: string;

  eventId?: string;
  idempotencyKey?: string;

  calculationVersion?: string;

  message?: string;
};

export type CashfreeAuditResponse = {
  success: boolean;
  auditId?: string;
  message?: string;
};

function validateAuditInput(
  input: CreateCashfreeAuditInput,
): void {
  if (!input.action) {
    throw new Error(
      "Cashfree audit action is required.",
    );
  }

  if (!input.status) {
    throw new Error(
      "Cashfree audit status is required.",
    );
  }

  if (!input.correlationId) {
    throw new Error(
      "correlationId is required for Cashfree audit records.",
    );
  }

  if (
    input.amountPaise !== undefined &&
    (!Number.isFinite(
      input.amountPaise,
    ) ||
      input.amountPaise < 0)
  ) {
    throw new Error(
      "amountPaise must be a valid non-negative number.",
    );
  }
}

export async function createCashfreeAuditRecord(
  input: CreateCashfreeAuditInput,
): Promise<CashfreeAuditResponse> {
  validateAuditInput(input);

  /*
   * IMPORTANT:
   *
   * This client only sends audit information to the
   * trusted JuERP backend.
   *
   * Cashfree secrets, signatures, webhook verification,
   * payout credentials and reconciliation credentials
   * must NEVER be placed in this client file.
   */

  const response = await fetch(
    "/api/cashfree/audit",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      credentials: "include",

      body: JSON.stringify(input),
    },
  );

  if (!response.ok) {
    let message =
      "Unable to create Cashfree audit record.";

    try {
      const data: unknown =
        await response.json();

      if (
        data &&
        typeof data === "object" &&
        typeof (
          data as Record<string, unknown>
        ).message === "string"
      ) {
        message =
          (
            data as Record<
              string,
              unknown
            >
          ).message as string;
      }
    } catch {
      // Keep the default error message.
    }

    throw new Error(
      `${message} (${response.status})`,
    );
  }

  const data: unknown =
    await response.json();

  if (
    !data ||
    typeof data !== "object"
  ) {
    throw new Error(
      "Invalid Cashfree audit response.",
    );
  }

  const result =
    data as Record<string, unknown>;

  return {
    success:
      result.success === true,

    auditId:
      typeof result.auditId === "string"
        ? result.auditId
        : undefined,

    message:
      typeof result.message === "string"
        ? result.message
        : undefined,
  };
}

export async function getCashfreeAuditRecords(
  params: {
    correlationId?: string;
    orderId?: string;
    paymentId?: string;
    refundId?: string;
    settlementId?: string;
    payoutId?: string;
    limit?: number;
  } = {},
): Promise<CashfreeAuditRecord[]> {
  const query =
    new URLSearchParams();

  if (params.correlationId) {
    query.set(
      "correlationId",
      params.correlationId,
    );
  }

  if (params.orderId) {
    query.set(
      "orderId",
      params.orderId,
    );
  }

  if (params.paymentId) {
    query.set(
      "paymentId",
      params.paymentId,
    );
  }

  if (params.refundId) {
    query.set(
      "refundId",
      params.refundId,
    );
  }

  if (params.settlementId) {
    query.set(
      "settlementId",
      params.settlementId,
    );
  }

  if (params.payoutId) {
    query.set(
      "payoutId",
      params.payoutId,
    );
  }

  if (params.limit !== undefined) {
    query.set(
      "limit",
      String(
        Math.max(
          1,
          Math.min(
            params.limit,
            500,
          ),
        ),
      ),
    );
  }

  const queryString =
    query.toString();

  const response = await fetch(
    `/api/cashfree/audit${
      queryString
        ? `?${queryString}`
        : ""
    }`,
    {
      method: "GET",

      headers: {
        Accept: "application/json",
      },

      credentials: "include",

      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load Cashfree audit records (${response.status}).`,
    );
  }

  const data: unknown =
    await response.json();

  if (
    !data ||
    typeof data !== "object"
  ) {
    throw new Error(
      "Invalid Cashfree audit response.",
    );
  }

  const object =
    data as Record<string, unknown>;

  const records =
    Array.isArray(object.records)
      ? object.records
      : Array.isArray(object.data)
        ? object.data
        : [];

  return records.filter(
    (
      record,
    ): record is CashfreeAuditRecord => {
      if (
        !record ||
        typeof record !== "object"
      ) {
        return false;
      }

      const item =
        record as Record<
          string,
          unknown
        >;

      return (
        typeof item.auditId ===
          "string" &&
        typeof item.action ===
          "string" &&
        typeof item.status ===
          "string" &&
        typeof item.correlationId ===
          "string" &&
        typeof item.createdAt ===
          "string"
      );
    },
  );
}

export async function getCashfreeAuditByCorrelationId(
  correlationId: string,
): Promise<CashfreeAuditRecord[]> {
  if (!correlationId) {
    throw new Error(
      "correlationId is required.",
    );
  }

  return getCashfreeAuditRecords({
    correlationId,
  });
}

export async function getCashfreeAuditByOrderId(
  orderId: string,
): Promise<CashfreeAuditRecord[]> {
  if (!orderId) {
    throw new Error(
      "orderId is required.",
    );
  }

  return getCashfreeAuditRecords({
    orderId,
  });
}

export async function getCashfreeAuditByPaymentId(
  paymentId: string,
): Promise<CashfreeAuditRecord[]> {
  if (!paymentId) {
    throw new Error(
      "paymentId is required.",
    );
  }

  return getCashfreeAuditRecords({
    paymentId,
  });
}

export async function getCashfreeAuditBySettlementId(
  settlementId: string,
): Promise<CashfreeAuditRecord[]> {
  if (!settlementId) {
    throw new Error(
      "settlementId is required.",
    );
  }

  return getCashfreeAuditRecords({
    settlementId,
  });
}

export default {
  createCashfreeAuditRecord,
  getCashfreeAuditRecords,
  getCashfreeAuditByCorrelationId,
  getCashfreeAuditByOrderId,
  getCashfreeAuditByPaymentId,
  getCashfreeAuditBySettlementId,
};