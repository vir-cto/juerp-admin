"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  updateDocument,
  createDocumentWithId,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";
import { auth } from "@/lib/firebase/config";

export type AdminPreferences = {
  notificationsEnabled: boolean;
  securityAlertsEnabled: boolean;
  auditAlertsEnabled: boolean;
};

const DEFAULT_PREFS: AdminPreferences = {
  notificationsEnabled: true,
  securityAlertsEnabled: true,
  auditAlertsEnabled: true,
};

export function useAdminPreferences() {
  const [prefs, setPrefs] = useState<AdminPreferences>(DEFAULT_PREFS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const uid = auth.currentUser?.uid;
    if (!uid || isFirestoreDemoMode) {
      setPrefs(DEFAULT_PREFS);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const doc = await getDocument<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.USERS,
        uid
      );
      const p = (doc?.preferences as Record<string, unknown>) || {};
      setPrefs({
        notificationsEnabled: p.notificationsEnabled !== false,
        securityAlertsEnabled: p.securityAlertsEnabled !== false,
        auditAlertsEnabled: p.auditAlertsEnabled !== false,
      });
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load preferences."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const updatePrefs = useCallback(
    async (patch: Partial<AdminPreferences>) => {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error("Not signed in.");
      if (isFirestoreDemoMode) {
        throw new Error("Writes are disabled in demo mode.");
      }

      setSaving(true);
      try {
        const next = { ...prefs, ...patch };
        const existing = await getDocument(
          FIRESTORE_COLLECTIONS.USERS,
          uid
        );

        if (!existing) {
          await createDocumentWithId(FIRESTORE_COLLECTIONS.USERS, uid, {
            uid,
            preferences: next,
          });
        } else {
          await updateDocument(FIRESTORE_COLLECTIONS.USERS, uid, {
            preferences: next,
          });
        }
        setPrefs(next);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unable to save preferences.";
        setError(message);
        throw err;
      } finally {
        setSaving(false);
      }
    },
    [prefs]
  );

  return {
    prefs,
    loading,
    saving,
    error,
    updatePrefs,
    refresh: load,
    isDemoMode: isFirestoreDemoMode,
  };
}