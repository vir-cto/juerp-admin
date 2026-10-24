"use client";

import { useCallback, useEffect, useState } from "react";

export type LedgerEntryType =
  | "DEBIT"
  | "CREDIT"
  | "ADJUSTMENT"
  | "REFUND"
  | "COMMISSION"
  | "PAYOUT"
  | "SETTLEMENT"
  | "FEE"
  | "TAX";

export type LedgerEntryStatus =
  | "PENDING"
  | "POSTED"
  | "REVERSED"
  | "FAILED";

export type LedgerEntry = {
  id: string;

  ledgerEntryId?: string;
  correlationId: string;

  type: LedgerEntryType;
  status: LedgerEntryStatus;

  /**
   * All monetary values are stored in paise.
   */
  amountPaise: number;

  currency: string;

  /**
   * Optional business references.
   */
  orderId?: string;
  bookingId?: string;
  rideId?: string;
  deliveryId?: string;
  settlementId?: string;
  paymentId?: string;

  vendorId?: string;
  captainId?: string;
  userId?: string;

  /**
   * Backend/ERP supplied calculation version.
   */
  calculationVersion?: string;

  description?: string;

  createdAt: string;
  updatedAt?: string;

  createdBy?: string;
};

export type LedgerAuditRecord = {
  id: string;

  action:
    | "CREATED"
    | "UPDATED"
    | "POSTED"
    | "REVERSED"
    | "REFUNDED"
    | "SETTLED"
    | "MANUAL_ADJUSTMENT";

  ledgerEntryId: string;

  correlationId: string;

  actorId?: string;
  actorRole?: string;

  reason?: string;

  previousStatus?: LedgerEntryStatus;
  newStatus?: LedgerEntryStatus;

  previousAmountPaise?: number;
  newAmountPaise?: number;

  createdAt: string;
};

type UseLedgerAuditOptions = {
  ledgerEntryId?: string;
  correlationId?: string;
  orderId?: string;
  settlementId?: string;
  vendorId?: string;
  captainId?: string;
  enabled?: boolean;
};

type UseLedgerAuditReturn = {
  entries: LedgerEntry[];
  auditRecords: LedgerAuditRecord[];

  loading: boolean;
  auditLoading: boolean;

  error: string | null;
  auditError: string | null;

  refresh: () => Promise<void>;
  refreshAudit: () => Promise<void>;

  getEntryById: (
    ledgerEntryId: string,
  ) => LedgerEntry | undefined;

  getAuditForEntry: (
    ledgerEntryId: string,
  ) => LedgerAuditRecord[];

  totalCreditPaise: number;
  totalDebitPaise: number;
};

const DEMO_LEDGER_ENTRIES: LedgerEntry[] = [];

const DEMO_AUDIT_RECORDS: LedgerAuditRecord[] = [];

function normalizeLedgerEntry(
  value: unknown,
): LedgerEntry | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.id !== "string" ||
    typeof item.correlationId !== "string" ||
    typeof item.type !== "string" ||
    typeof item.status !== "string" ||
    typeof item.amountPaise !== "number" ||
    typeof item.currency !== "string" ||
    typeof item.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,
    ledgerEntryId:
      typeof item.ledgerEntryId === "string"
        ? item.ledgerEntryId
        : undefined,

    correlationId: item.correlationId,

    type: item.type as LedgerEntryType,
    status: item.status as LedgerEntryStatus,

    amountPaise: item.amountPaise,
    currency: item.currency,

    orderId:
      typeof item.orderId === "string"
        ? item.orderId
        : undefined,

    bookingId:
      typeof item.bookingId === "string"
        ? item.bookingId
        : undefined,

    rideId:
      typeof item.rideId === "string"
        ? item.rideId
        : undefined,

    deliveryId:
      typeof item.deliveryId === "string"
        ? item.deliveryId
        : undefined,

    settlementId:
      typeof item.settlementId === "string"
        ? item.settlementId
        : undefined,

    paymentId:
      typeof item.paymentId === "string"
        ? item.paymentId
        : undefined,

    vendorId:
      typeof item.vendorId === "string"
        ? item.vendorId
        : undefined,

    captainId:
      typeof item.captainId === "string"
        ? item.captainId
        : undefined,

    userId:
      typeof item.userId === "string"
        ? item.userId
        : undefined,

    calculationVersion:
      typeof item.calculationVersion === "string"
        ? item.calculationVersion
        : undefined,

    description:
      typeof item.description === "string"
        ? item.description
        : undefined,

    createdAt: item.createdAt,

    updatedAt:
      typeof item.updatedAt === "string"
        ? item.updatedAt
        : undefined,

    createdBy:
      typeof item.createdBy === "string"
        ? item.createdBy
        : undefined,
  };
}

function normalizeAuditRecord(
  value: unknown,
): LedgerAuditRecord | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.id !== "string" ||
    typeof item.action !== "string" ||
    typeof item.ledgerEntryId !== "string" ||
    typeof item.correlationId !== "string" ||
    typeof item.createdAt !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,

    action: item.action as LedgerAuditRecord["action"],

    ledgerEntryId: item.ledgerEntryId,

    correlationId: item.correlationId,

    actorId:
      typeof item.actorId === "string"
        ? item.actorId
        : undefined,

    actorRole:
      typeof item.actorRole === "string"
        ? item.actorRole
        : undefined,

    reason:
      typeof item.reason === "string"
        ? item.reason
        : undefined,

    previousStatus:
      typeof item.previousStatus === "string"
        ? (item.previousStatus as LedgerEntryStatus)
        : undefined,

    newStatus:
      typeof item.newStatus === "string"
        ? (item.newStatus as LedgerEntryStatus)
        : undefined,

    previousAmountPaise:
      typeof item.previousAmountPaise === "number"
        ? item.previousAmountPaise
        : undefined,

    newAmountPaise:
      typeof item.newAmountPaise === "number"
        ? item.newAmountPaise
        : undefined,

    createdAt: item.createdAt,
  };
}

function extractArray(
  data: unknown,
  key: string,
): unknown[] {
  if (Array.isArray(data)) {
    return data;
  }

  if (
    data &&
    typeof data === "object" &&
    Array.isArray(
      (data as Record<string, unknown>)[key],
    )
  ) {
    return (data as Record<string, unknown>)[
      key
    ] as unknown[];
  }

  return [];
}

export function useLedgerAudit(
  options: UseLedgerAuditOptions = {},
): UseLedgerAuditReturn {
  const {
    ledgerEntryId,
    correlationId,
    orderId,
    settlementId,
    vendorId,
    captainId,
    enabled = true,
  } = options;

  const [entries, setEntries] = useState<
    LedgerEntry[]
  >([]);

  const [auditRecords, setAuditRecords] = useState<
    LedgerAuditRecord[]
  >([]);

  const [loading, setLoading] =
    useState<boolean>(true);

  const [auditLoading, setAuditLoading] =
    useState<boolean>(false);

  const [error, setError] =
    useState<string | null>(null);

  const [auditError, setAuditError] =
    useState<string | null>(null);

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();

    if (ledgerEntryId) {
      params.set(
        "ledgerEntryId",
        ledgerEntryId,
      );
    }

    if (correlationId) {
      params.set(
        "correlationId",
        correlationId,
      );
    }

    if (orderId) {
      params.set("orderId", orderId);
    }

    if (settlementId) {
      params.set(
        "settlementId",
        settlementId,
      );
    }

    if (vendorId) {
      params.set("vendorId", vendorId);
    }

    if (captainId) {
      params.set("captainId", captainId);
    }

    return params.toString();
  }, [
    ledgerEntryId,
    correlationId,
    orderId,
    settlementId,
    vendorId,
    captainId,
  ]);

  const refresh = useCallback(async () => {
    if (!enabled) {
      setEntries([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const demoMode =
        process.env.NEXT_PUBLIC_DEMO_MODE ===
        "true";

      if (demoMode) {
        setEntries(DEMO_LEDGER_ENTRIES);
        return;
      }

      const query = buildQuery();

      const response = await fetch(
        `/api/ledger/audit${
          query ? `?${query}` : ""
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
          `Failed to load ledger audit (${response.status})`,
        );
      }

      const data: unknown =
        await response.json();

      const rawEntries = extractArray(
        data,
        "entries",
      );

      const normalizedEntries =
        rawEntries
          .map(normalizeLedgerEntry)
          .filter(
            (
              entry,
            ): entry is LedgerEntry =>
              entry !== null,
          );

      setEntries(normalizedEntries);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load ledger entries.";

      setError(message);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, buildQuery]);

  const refreshAudit = useCallback(
    async () => {
      if (!enabled) {
        setAuditRecords([]);
        setAuditLoading(false);
        setAuditError(null);
        return;
      }

      setAuditLoading(true);
      setAuditError(null);

      try {
        const demoMode =
          process.env.NEXT_PUBLIC_DEMO_MODE ===
          "true";

        if (demoMode) {
          setAuditRecords(
            DEMO_AUDIT_RECORDS,
          );
          return;
        }

        const query = buildQuery();

        const response = await fetch(
          `/api/ledger/audit/history${
            query ? `?${query}` : ""
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
            `Failed to load audit history (${response.status})`,
          );
        }

        const data: unknown =
          await response.json();

        const rawRecords = extractArray(
          data,
          "auditRecords",
        );

        const normalizedRecords =
          rawRecords
            .map(normalizeAuditRecord)
            .filter(
              (
                record,
              ): record is LedgerAuditRecord =>
                record !== null,
            );

        setAuditRecords(
          normalizedRecords,
        );
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Unable to load ledger audit history.";

        setAuditError(message);
        setAuditRecords([]);
      } finally {
        setAuditLoading(false);
      }
    },
    [enabled, buildQuery],
  );

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    void refreshAudit();
  }, [refreshAudit]);

  const getEntryById = useCallback(
    (
      requestedLedgerEntryId: string,
    ): LedgerEntry | undefined => {
      return entries.find(
        (entry) =>
          entry.id ===
            requestedLedgerEntryId ||
          entry.ledgerEntryId ===
            requestedLedgerEntryId,
      );
    },
    [entries],
  );

  const getAuditForEntry = useCallback(
    (
      requestedLedgerEntryId: string,
    ): LedgerAuditRecord[] => {
      return auditRecords.filter(
        (record) =>
          record.ledgerEntryId ===
          requestedLedgerEntryId,
      );
    },
    [auditRecords],
  );

  const totalCreditPaise = entries
    .filter(
      (entry) =>
        entry.type === "CREDIT" &&
        entry.status === "POSTED",
    )
    .reduce(
      (total, entry) =>
        total + entry.amountPaise,
      0,
    );

  const totalDebitPaise = entries
    .filter(
      (entry) =>
        entry.type === "DEBIT" &&
        entry.status === "POSTED",
    )
    .reduce(
      (total, entry) =>
        total + entry.amountPaise,
      0,
    );

  return {
    entries,
    auditRecords,

    loading,
    auditLoading,

    error,
    auditError,

    refresh,
    refreshAudit,

    getEntryById,
    getAuditForEntry,

    totalCreditPaise,
    totalDebitPaise,
  };
}

export default useLedgerAudit;