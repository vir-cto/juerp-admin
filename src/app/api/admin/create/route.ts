import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";

type AdminRole =
  | "SUPER_ADMIN"
  | "STATE_ADMIN"
  | "DISTRICT_ADMIN"
  | "TECHNICAL_ADMIN";

const ADMIN_ROLES: AdminRole[] = [
  "SUPER_ADMIN",
  "STATE_ADMIN",
  "DISTRICT_ADMIN",
  "TECHNICAL_ADMIN",
];

type CreateBody = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  role?: string;
  stateId?: string;
  stateName?: string;
  districtId?: string;
  districtName?: string;
  correlationId?: string;
};

function isAdminRole(v: unknown): v is AdminRole {
  return typeof v === "string" && ADMIN_ROLES.includes(v as AdminRole);
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer\s+(.+)$/i);
    if (!match?.[1]) {
      return jsonError("Missing authorization token.", 401);
    }

    const adminAuth = getAdminAuth();
    const adminDb = getAdminDb();

    const decoded = await adminAuth.verifyIdToken(match[1], true);
    if (decoded.role !== "SUPER_ADMIN") {
      return jsonError("Only Super Admin can create admin users.", 403);
    }

    const body = (await request.json()) as CreateBody;

    const name = (body.name || "").trim();
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const phone = (body.phone || "").trim();
    const role = body.role;
    const stateId = (body.stateId || "").trim();
    const stateName = (body.stateName || "").trim();
    const districtId = (body.districtId || "").trim();
    const districtName = (body.districtName || "").trim();
    const correlationId =
      (body.correlationId || "").trim() ||
      `admin-create-${Date.now().toString(36)}`;

    if (!name) return jsonError("Name is required.", 400);
    if (!email || !email.includes("@")) {
      return jsonError("A valid email is required.", 400);
    }
    if (password.length < 8) {
      return jsonError("Password must be at least 8 characters.", 400);
    }
    if (!isAdminRole(role)) {
      return jsonError("Invalid admin role.", 400);
    }
    if (role === "STATE_ADMIN" && !stateId) {
      return jsonError("State is required for State Admin.", 400);
    }
    if (role === "DISTRICT_ADMIN") {
      if (!stateId) return jsonError("State is required for District Admin.", 400);
      if (!districtId) {
        return jsonError("District is required for District Admin.", 400);
      }
    }

    // Custom claims used by signInAdmin / getCurrentAdminRole
    const claims: Record<string, string> = { role };
    if (role === "STATE_ADMIN" || role === "DISTRICT_ADMIN") {
      claims.stateId = stateId;
    }
    if (role === "DISTRICT_ADMIN") {
      claims.districtId = districtId;
    }

    let uid: string;
    try {
      const userRecord = await adminAuth.createUser({
        email,
        password,
        displayName: name,
        emailVerified: false,
        disabled: false,
      });
      uid = userRecord.uid;
    } catch (err: unknown) {
      const code =
        err && typeof err === "object" && "code" in err
          ? String((err as { code: string }).code)
          : "";
      if (code === "auth/email-already-exists") {
        return jsonError("An account with this email already exists in Auth.", 409);
      }
      if (code === "auth/invalid-password") {
        return jsonError("Password does not meet Firebase requirements.", 400);
      }
      throw err;
    }

    try {
      await adminAuth.setCustomUserClaims(uid, claims);

      await adminDb.collection("users").doc(uid).set(
        {
          uid,
          userId: uid,
          name,
          email,
          phone,
          role,
          status: "ACTIVE",
          userType: "ADMIN",
          isAdmin: true,
          stateId: claims.stateId || "",
          stateName: stateName || "",
          districtId: claims.districtId || "",
          districtName: districtName || "",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
          createdByUid: decoded.uid,
          correlationId,
        },
        { merge: true }
      );

      await adminDb.collection("audit_logs").add({
        actorUid: decoded.uid,
        actorRole: "SUPER_ADMIN",
        action: "ADMIN_USER_CREATED",
        entityType: "USER",
        entityId: uid,
        correlationId,
        metadata: { email, role, stateId: claims.stateId || null, districtId: claims.districtId || null },
        createdAt: FieldValue.serverTimestamp(),
      });
    } catch (err) {
      // Best-effort rollback if profile/claims fail after Auth create
      try {
        await adminAuth.deleteUser(uid);
      } catch {
        /* ignore */
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: "Admin created successfully.",
      data: { uid, email, role },
      correlationId,
    });
  } catch (err) {
    console.error("POST /api/admin/create error:", err);
    const message =
      err instanceof Error ? err.message : "Unable to create admin user.";
    return jsonError(message, 500);
  }
}