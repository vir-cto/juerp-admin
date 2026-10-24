// "use client";

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   FIRESTORE_COLLECTIONS,
//   getFilteredCollection,
//   isFirestoreDemoMode,
// } from "@/lib/firebase/firestore";

// export type AuditStatus = "SUCCESS" | "WARNING" | "FAILED" | "PENDING";

// export type AuditCategory =
//   | "AUTHENTICATION"
//   | "AUTHORIZATION"
//   | "RBAC"
//   | "CONFIGURATION"
//   | "OVERRIDE"
//   | "FINANCIAL"
//   | "SYSTEM";

// export type AuditEvent = {
//   id: string;
//   category: AuditCategory;
//   action: string;
//   actor: string;
//   actorRole: string;
//   target: string;
//   status: AuditStatus;
//   correlationId: string;
//   timestamp: string;
//   ipAddress: string;
//   sortKey: number;
// };

// function str(v: unknown, fallback = "—"): string {
//   if (typeof v === "string" && v.trim()) return v.trim();
//   if (typeof v === "number") return String(v);
//   return fallback;
// }

// function dateLabel(v: unknown): string {
//   if (typeof v === "string" && v.trim()) {
//     const d = new Date(v);
//     if (!Number.isNaN(d.getTime())) {
//       return d.toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     }
//     return v.trim();
//   }
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().toLocaleString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch {
//       return "—";
//     }
//   }
//   return "—";
// }

// function sortMs(v: unknown): number {
//   if (typeof v === "string") {
//     const t = Date.parse(v);
//     return Number.isNaN(t) ? 0 : t;
//   }
//   if (v && typeof v === "object" && "toDate" in v) {
//     try {
//       return (v as { toDate: () => Date }).toDate().getTime();
//     } catch {
//       return 0;
//     }
//   }
//   if (v && typeof v === "object" && "seconds" in v) {
//     return Number((v as { seconds: number }).seconds) * 1000;
//   }
//   return 0;
// }

// function asStatus(v: unknown): AuditStatus {
//   const s = String(v ?? "PENDING").toUpperCase();
//   if (s === "SUCCESS" || s === "OK" || s === "COMPLETED") return "SUCCESS";
//   if (s === "WARNING" || s === "WARN") return "WARNING";
//   if (s === "FAILED" || s === "ERROR" || s === "FAILURE") return "FAILED";
//   if (s === "PENDING" || s === "IN_PROGRESS") return "PENDING";
//   return "PENDING";
// }

// function asCategory(v: unknown): AuditCategory {
//   const s = String(v ?? "SYSTEM").toUpperCase();
//   const allowed: AuditCategory[] = [
//     "AUTHENTICATION",
//     "AUTHORIZATION",
//     "RBAC",
//     "CONFIGURATION",
//     "OVERRIDE",
//     "FINANCIAL",
//     "SYSTEM",
//   ];
//   if ((allowed as string[]).includes(s)) return s as AuditCategory;
//   if (s.includes("AUTH") && s.includes("LOGIN")) return "AUTHENTICATION";
//   if (s.includes("AUTH")) return "AUTHORIZATION";
//   if (s.includes("ROLE") || s.includes("RBAC")) return "RBAC";
//   if (s.includes("CONFIG")) return "CONFIGURATION";
//   if (s.includes("OVERRIDE") || s.includes("CANCEL") || s.includes("DISPATCH"))
//     return "OVERRIDE";
//   if (s.includes("PAY") || s.includes("LEDGER") || s.includes("SETTLE") || s.includes("REFUND"))
//     return "FINANCIAL";
//   return "SYSTEM";
// }

// function mapAuditEvent(
//   raw: Record<string, unknown> & { id: string }
// ): AuditEvent {
//   const created = raw.createdAt ?? raw.timestamp ?? raw.eventAt;
//   return {
//     id: str(raw.eventId ?? raw.auditId ?? raw.id, raw.id),
//     category: asCategory(raw.category ?? raw.type ?? raw.eventType),
//     action: str(raw.action ?? raw.event ?? raw.title ?? raw.message, "Audit event"),
//     actor: str(raw.actor ?? raw.actorName ?? raw.userName ?? raw.performedBy, "—"),
//     actorRole: str(raw.actorRole ?? raw.role ?? raw.userRole, "—"),
//     target: str(raw.target ?? raw.resource ?? raw.entityId ?? raw.resourceId, "—"),
//     status: asStatus(raw.status ?? raw.outcome ?? raw.result),
//     correlationId: str(raw.correlationId ?? raw.correlation_id, "—"),
//     timestamp: dateLabel(created),
//     ipAddress: str(raw.ipAddress ?? raw.ip ?? raw.clientIp, "—"),
//     sortKey: sortMs(created),
//   };
// }

// export function useSystemAudit(pollMs = 30000) {
//   const [events, setEvents] = useState<AuditEvent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError(null);

//     if (isFirestoreDemoMode) {
//       setEvents([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       const raw = await getFilteredCollection<Record<string, unknown>>(
//         FIRESTORE_COLLECTIONS.AUDIT_LOGS,
//         [],
//         undefined,
//         300
//       );

//       const mapped = raw
//         .map(mapAuditEvent)
//         .sort((a, b) => b.sortKey - a.sortKey);

//       setEvents(mapped);
//     } catch (err) {
//       setError(
//         err instanceof Error ? err.message : "Unable to load audit logs."
//       );
//       setEvents([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     void load();
//   }, [load]);

//   useEffect(() => {
//     if (!pollMs || pollMs <= 0 || isFirestoreDemoMode) return;
//     const id = window.setInterval(() => {
//       void load();
//     }, pollMs);
//     return () => window.clearInterval(id);
//   }, [load, pollMs]);

//   const summary = useMemo(
//     () => ({
//       total: events.length,
//       successful: events.filter((e) => e.status === "SUCCESS").length,
//       warnings: events.filter((e) => e.status === "WARNING").length,
//       failed: events.filter((e) => e.status === "FAILED").length,
//       pending: events.filter((e) => e.status === "PENDING").length,
//       authentication: events.filter((e) => e.category === "AUTHENTICATION")
//         .length,
//       authorization: events.filter((e) => e.category === "AUTHORIZATION")
//         .length,
//       rbac: events.filter((e) => e.category === "RBAC").length,
//     }),
//     [events]
//   );

//   return {
//     events,
//     summary,
//     loading,
//     error,
//     refresh: load,
//     isDemoMode: isFirestoreDemoMode,
//   };
// }

// export default useSystemAudit;

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FIRESTORE_COLLECTIONS,
  getFilteredCollection,
  isFirestoreDemoMode,
} from "@/lib/firebase/firestore";

export type AuditStatus = "SUCCESS" | "WARNING" | "FAILED" | "PENDING";

export type AuditCategory =
  | "AUTHENTICATION"
  | "AUTHORIZATION"
  | "RBAC"
  | "CONFIGURATION"
  | "OVERRIDE"
  | "FINANCIAL"
  | "SYSTEM";

export type SystemAuditEvent = {
  id: string;
  action: string;
  category: AuditCategory;
  status: AuditStatus;
  actor: string;
  actorRole: string;
  target: string;
  correlationId: string;
  timestamp: string;
};

export type SystemAuditSummary = {
  total: number;
  successful: number;
  warnings: number;
  failed: number;
  pending: number;
  authentication: number;
  authorization: number;
  rbac: number;
};

function str(value: unknown, fallback = "—"): string {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number") return String(value);
  return fallback;
}

function timestampLabel(value: unknown): string {
  let ms = 0;
  if (value && typeof value === "object" && "toDate" in value) {
    try {
      ms = (value as { toDate: () => Date }).toDate().getTime();
    } catch {
      ms = 0;
    }
  } else if (value instanceof Date) {
    ms = value.getTime();
  } else if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) ms = d.getTime();
  }
  if (!ms) return "—";
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function asStatus(value: unknown): AuditStatus {
  const s = String(value ?? "SUCCESS").toUpperCase();
  if (s === "WARNING" || s === "FAILED" || s === "PENDING" || s === "SUCCESS") {
    return s;
  }
  if (s === "ERROR" || s === "FAILURE") return "FAILED";
  if (s === "OK" || s === "COMPLETED") return "SUCCESS";
  return "SUCCESS";
}

function asCategory(value: unknown): AuditCategory {
  const s = String(value ?? "SYSTEM").toUpperCase();
  const allowed: AuditCategory[] = [
    "AUTHENTICATION",
    "AUTHORIZATION",
    "RBAC",
    "CONFIGURATION",
    "OVERRIDE",
    "FINANCIAL",
    "SYSTEM",
  ];
  if (allowed.includes(s as AuditCategory)) return s as AuditCategory;
  if (s.includes("AUTH") && s.includes("LOGIN")) return "AUTHENTICATION";
  if (s.includes("AUTH")) return "AUTHORIZATION";
  if (s.includes("ROLE") || s.includes("RBAC")) return "RBAC";
  if (s.includes("MONEY") || s.includes("PAY") || s.includes("SETTLE")) {
    return "FINANCIAL";
  }
  if (s.includes("OVERRIDE") || s.includes("FORCE")) return "OVERRIDE";
  if (s.includes("CONFIG")) return "CONFIGURATION";
  return "SYSTEM";
}

function mapEvent(
  raw: Record<string, unknown> & { id: string }
): SystemAuditEvent {
  return {
    id: raw.id,
    action: str(
      raw.action ?? raw.eventType ?? raw.event ?? raw.message,
      "System event"
    ),
    category: asCategory(raw.category ?? raw.module ?? raw.type),
    status: asStatus(raw.status ?? raw.result),
    actor: str(
      raw.actor ?? raw.actorEmail ?? raw.actorName ?? raw.userEmail ?? raw.uid,
      "—"
    ),
    actorRole: str(raw.actorRole ?? raw.role ?? raw.userRole, "—"),
    target: str(
      raw.target ?? raw.resource ?? raw.entityId ?? raw.targetId,
      "—"
    ),
    correlationId: str(
      raw.correlationId ?? raw.correlation_id ?? raw.traceId,
      "—"
    ),
    timestamp: timestampLabel(
      raw.timestamp ?? raw.createdAt ?? raw.occurredAt
    ),
  };
}

export function useSystemAudit(pollMs = 30000) {
  const [events, setEvents] = useState<SystemAuditEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);

    if (isFirestoreDemoMode) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      const docs = await getFilteredCollection<Record<string, unknown>>(
        FIRESTORE_COLLECTIONS.AUDIT_LOGS,
        [],
        { fieldPath: "createdAt", direction: "desc" },
        200
      ).catch(async () => {
        // Fallback if createdAt index/order missing
        return getFilteredCollection<Record<string, unknown>>(
          FIRESTORE_COLLECTIONS.AUDIT_LOGS,
          [],
          undefined,
          200
        );
      });

      const mapped = docs.map(mapEvent);
      // Soft sort by timestamp string is weak; keep server order when possible
      setEvents(mapped);
    } catch (err) {
      console.error("useSystemAudit:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load audit_logs from Firestore."
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    if (pollMs <= 0) return;
    const id = window.setInterval(() => void load(), pollMs);
    return () => window.clearInterval(id);
  }, [load, pollMs]);

  const summary: SystemAuditSummary = useMemo(() => {
    return {
      total: events.length,
      successful: events.filter((e) => e.status === "SUCCESS").length,
      warnings: events.filter((e) => e.status === "WARNING").length,
      failed: events.filter((e) => e.status === "FAILED").length,
      pending: events.filter((e) => e.status === "PENDING").length,
      authentication: events.filter((e) => e.category === "AUTHENTICATION")
        .length,
      authorization: events.filter((e) => e.category === "AUTHORIZATION")
        .length,
      rbac: events.filter((e) => e.category === "RBAC").length,
    };
  }, [events]);

  return { events, summary, loading, error, refresh: load };
}

export default useSystemAudit;