"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  createDocumentWithId,
  updateDocument,
  subscribeToCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import {
  FEATURE_FLAG_KEYS,
  FEATURE_FLAG_META,
  type FeatureFlagKey,
} from "@/lib/constants/feature-flags";
import { auth } from "@/lib/firebase/config";

export type FeatureFlag = {
  id: string;
  key: FeatureFlagKey;
  value: boolean;
  status: "ACTIVE" | "INACTIVE";
  title: string;
  description: string;
};

function allKeys(): FeatureFlagKey[] {
  return Object.values(FEATURE_FLAG_KEYS);
}

function defaultFlags(): FeatureFlag[] {
  return allKeys().map((key) => ({
    id: key,
    key,
    value: true,
    status: "ACTIVE",
    title: FEATURE_FLAG_META[key].title,
    description: FEATURE_FLAG_META[key].description,
  }));
}

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlag[]>(defaultFlags);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirestoreDemoMode) {
      setFlags(defaultFlags());
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeToCollection<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.FEATURE_FLAGS,
      [],
      (docs) => {
        const byKey = new Map(
          docs.map((d) => [String(d.key || d.id), d] as const)
        );

        const merged = allKeys().map((key) => {
          const raw = byKey.get(key);
          const enabled =
            raw == null
              ? true
              : Boolean(
                  raw.value === true ||
                    raw.value === "true" ||
                    raw.enabled === true
                );
          return {
            id: key,
            key,
            value: enabled,
            status: (enabled ? "ACTIVE" : "INACTIVE") as "ACTIVE" | "INACTIVE",
            title: FEATURE_FLAG_META[key].title,
            description: FEATURE_FLAG_META[key].description,
          };
        });

        setFlags(merged);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const isEnabled = useCallback(
    (key: FeatureFlagKey) => {
      const f = flags.find((x) => x.key === key);
      return f ? f.value : true;
    },
    [flags]
  );

  const setFlag = useCallback(async (key: FeatureFlagKey, enabled: boolean) => {
    if (isFirestoreDemoMode) {
      throw new Error("Writes are disabled in demo mode.");
    }

    const uid = auth.currentUser?.uid || "";
    setSaving(true);
    setError(null);

    try {
      const existing = await getDocument(
        FIRESTORE_COLLECTIONS.FEATURE_FLAGS,
        key
      );
      const payload = {
        flagId: key,
        key,
        value: enabled,
        status: enabled ? "ACTIVE" : "INACTIVE",
        targetScope: "GLOBAL",
        updatedByUid: uid,
      };

      if (!existing) {
        await createDocumentWithId(
          FIRESTORE_COLLECTIONS.FEATURE_FLAGS,
          key,
          payload
        );
      } else {
        await updateDocument(
          FIRESTORE_COLLECTIONS.FEATURE_FLAGS,
          key,
          payload
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update feature flag.";
      setError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  const flagMap = useMemo(() => {
    const m: Record<string, boolean> = {};
    flags.forEach((f) => {
      m[f.key] = f.value;
    });
    return m;
  }, [flags]);

  return {
    flags,
    flagMap,
    loading,
    saving,
    error,
    isEnabled,
    setFlag,
    isDemoMode: isFirestoreDemoMode,
  };
}