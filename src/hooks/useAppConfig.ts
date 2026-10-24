"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getDocument,
  isFirestoreDemoMode,
  createDocumentWithId,
  updateDocument,
  subscribeToDocument,
} from "@/lib/firebase/firestore";
import { JUERP_APP_ID } from "@/lib/constants/feature-flags";
import { auth } from "@/lib/firebase/config";

export type JuErpAppConfig = {
  id: string;
  appId: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  updatedAt?: unknown;
  updatedByUid?: string;
};

const DEFAULT_CONFIG: JuErpAppConfig = {
  id: JUERP_APP_ID,
  appId: JUERP_APP_ID,
  maintenanceMode: false,
  maintenanceMessage:
    "JUERP is under maintenance. Only Super Admins can continue.",
};

export function useAppConfig() {
  const [config, setConfig] = useState<JuErpAppConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isFirestoreDemoMode) {
      setConfig(DEFAULT_CONFIG);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsub = subscribeToDocument<Record<string, unknown>>(
      FIRESTORE_COLLECTIONS.APP_CONFIGS,
      JUERP_APP_ID,
      (doc) => {
        if (!doc) {
          setConfig(DEFAULT_CONFIG);
        } else {
          setConfig({
            id: doc.id,
            appId: String(doc.appId || JUERP_APP_ID),
            maintenanceMode: Boolean(doc.maintenanceMode),
            maintenanceMessage:
              typeof doc.maintenanceMessage === "string"
                ? doc.maintenanceMessage
                : DEFAULT_CONFIG.maintenanceMessage,
            updatedAt: doc.updatedAt,
            updatedByUid:
              typeof doc.updatedByUid === "string"
                ? doc.updatedByUid
                : undefined,
          });
        }
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

  const setMaintenanceMode = useCallback(async (enabled: boolean) => {
    if (isFirestoreDemoMode) {
      throw new Error("Writes are disabled in demo mode.");
    }

    const uid = auth.currentUser?.uid || "";
    setSaving(true);
    setError(null);

    try {
      const existing = await getDocument(
        FIRESTORE_COLLECTIONS.APP_CONFIGS,
        JUERP_APP_ID
      );

      const payload = {
        appId: JUERP_APP_ID,
        maintenanceMode: enabled,
        maintenanceMessage:
          DEFAULT_CONFIG.maintenanceMessage,
        updatedByUid: uid,
      };

      if (!existing) {
        await createDocumentWithId(
          FIRESTORE_COLLECTIONS.APP_CONFIGS,
          JUERP_APP_ID,
          payload
        );
      } else {
        await updateDocument(
          FIRESTORE_COLLECTIONS.APP_CONFIGS,
          JUERP_APP_ID,
          payload
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update app config.";
      setError(message);
      throw err;
    } finally {
      setSaving(false);
    }
  }, []);

  return {
    config,
    loading,
    saving,
    error,
    maintenanceMode: config.maintenanceMode,
    setMaintenanceMode,
    isDemoMode: isFirestoreDemoMode,
  };
}