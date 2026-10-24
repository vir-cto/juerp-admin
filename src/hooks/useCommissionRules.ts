"use client";

import { useCallback, useEffect, useState } from "react";

export type CommissionRule = {
  id: string;
  name: string;
  moduleId: string;
  serviceType?: string;

  /**
   * Commission percentage is configuration data supplied by ERP/backend.
   * The client must not invent or modify the authoritative value.
   */
  commissionPercentage: number;

  /**
   * Optional fixed commission amount in paise.
   */
  fixedCommissionPaise?: number;

  /**
   * Whether this rule is currently active.
   */
  active: boolean;

  /**
   * Version used for financial calculation/audit consistency.
   */
  calculationVersion: string;

  createdAt?: string;
  updatedAt?: string;
};

type UseCommissionRulesOptions = {
  moduleId?: string;
  serviceType?: string;
  enabled?: boolean;
};

type UseCommissionRulesReturn = {
  rules: CommissionRule[];
  activeRules: CommissionRule[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getRuleForModule: (
    moduleId: string,
    serviceType?: string,
  ) => CommissionRule | undefined;
};

const DEMO_RULES: CommissionRule[] = [
  {
    id: "demo-food-default",
    name: "Food Default Commission",
    moduleId: "FOOD",
    serviceType: "FOOD",
    commissionPercentage: 0,
    fixedCommissionPaise: 0,
    active: true,
    calculationVersion: "DEMO",
  },
  {
    id: "demo-mart-default",
    name: "Mart Default Commission",
    moduleId: "MART",
    serviceType: "MART",
    commissionPercentage: 0,
    fixedCommissionPaise: 0,
    active: true,
    calculationVersion: "DEMO",
  },
  {
    id: "demo-pharmacy-default",
    name: "Pharmacy Default Commission",
    moduleId: "PHARMACY",
    serviceType: "PHARMACY",
    commissionPercentage: 0,
    fixedCommissionPaise: 0,
    active: true,
    calculationVersion: "DEMO",
  },
];

function normalizeRule(value: unknown): CommissionRule | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const item = value as Record<string, unknown>;

  if (
    typeof item.id !== "string" ||
    typeof item.name !== "string" ||
    typeof item.moduleId !== "string" ||
    typeof item.commissionPercentage !== "number" ||
    typeof item.active !== "boolean" ||
    typeof item.calculationVersion !== "string"
  ) {
    return null;
  }

  return {
    id: item.id,
    name: item.name,
    moduleId: item.moduleId,
    serviceType:
      typeof item.serviceType === "string"
        ? item.serviceType
        : undefined,
    commissionPercentage: item.commissionPercentage,
    fixedCommissionPaise:
      typeof item.fixedCommissionPaise === "number"
        ? item.fixedCommissionPaise
        : undefined,
    active: item.active,
    calculationVersion: item.calculationVersion,
    createdAt:
      typeof item.createdAt === "string"
        ? item.createdAt
        : undefined,
    updatedAt:
      typeof item.updatedAt === "string"
        ? item.updatedAt
        : undefined,
  };
}

export function useCommissionRules(
  options: UseCommissionRulesOptions = {},
): UseCommissionRulesReturn {
  const {
    moduleId,
    serviceType,
    enabled = true,
  } = options;

  const [rules, setRules] = useState<CommissionRule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadRules = useCallback(async () => {
    if (!enabled) {
      setRules([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      /*
       * IMPORTANT:
       *
       * JUONE MSD says commission configuration is ERP/backend
       * authoritative.
       *
       * Therefore this hook does NOT calculate commission amounts.
       * It only retrieves configuration supplied by the ERP/backend.
       *
       * If your project already has a backend endpoint, replace the
       * demo section below with that API call.
       */

      const demoMode =
        process.env.NEXT_PUBLIC_DEMO_MODE === "true";

      if (demoMode) {
        let result = [...DEMO_RULES];

        if (moduleId) {
          result = result.filter(
            (rule) => rule.moduleId === moduleId,
          );
        }

        if (serviceType) {
          result = result.filter(
            (rule) =>
              !rule.serviceType ||
              rule.serviceType === serviceType,
          );
        }

        setRules(result);
        return;
      }

      /*
       * Production endpoint.
       *
       * The backend should return the authoritative commission
       * configuration.
       */
      const params = new URLSearchParams();

      if (moduleId) {
        params.set("moduleId", moduleId);
      }

      if (serviceType) {
        params.set("serviceType", serviceType);
      }

      const queryString = params.toString();

      const response = await fetch(
        `/api/commission-rules${
          queryString ? `?${queryString}` : ""
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
          `Failed to load commission rules (${response.status})`,
        );
      }

      const data: unknown = await response.json();

      let rawRules: unknown[] = [];

      if (Array.isArray(data)) {
        rawRules = data;
      } else if (
        data &&
        typeof data === "object" &&
        Array.isArray(
          (data as Record<string, unknown>).rules,
        )
      ) {
        rawRules = (
          data as Record<string, unknown>
        ).rules as unknown[];
      }

      const normalizedRules = rawRules
        .map(normalizeRule)
        .filter(
          (rule): rule is CommissionRule => rule !== null,
        );

      setRules(normalizedRules);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to load commission rules.";

      setError(message);
      setRules([]);
    } finally {
      setLoading(false);
    }
  }, [enabled, moduleId, serviceType]);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  const activeRules = rules.filter(
    (rule) => rule.active,
  );

  const getRuleForModule = useCallback(
    (
      requestedModuleId: string,
      requestedServiceType?: string,
    ): CommissionRule | undefined => {
      return rules.find((rule) => {
        if (rule.moduleId !== requestedModuleId) {
          return false;
        }

        if (!requestedServiceType) {
          return true;
        }

        return (
          !rule.serviceType ||
          rule.serviceType === requestedServiceType
        );
      });
    },
    [rules],
  );

  return {
    rules,
    activeRules,
    loading,
    error,
    refresh: loadRules,
    getRuleForModule,
  };
}

export default useCommissionRules;