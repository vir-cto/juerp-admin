"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar, { type SidebarRole } from "@/components/layout/Sidebar";
import Header, {
  type HeaderAdminRole,
  type HeaderScopeType,
  type HeaderUser,
} from "@/components/layout/Header";
import { useAuthStore } from "@/store/authStore";
import useScope from "@/hooks/useScope";
import { logout as firebaseLogout } from "@/lib/firebase/auth";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  const router = useRouter();
  const auth = useAuthStore();
  const scope = useScope();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!auth.initialized || auth.loading) return;

    if (!auth.user) {
      router.replace("/login");
    }
  }, [auth.initialized, auth.loading, auth.user, router]);

  const role: SidebarRole =
    (scope.role as SidebarRole) ||
    (auth.role as SidebarRole) ||
    "DISTRICT_ADMIN";

  const headerUser: HeaderUser = {
    name:
      auth.user?.displayName ||
      auth.user?.email?.split("@")[0] ||
      "Administrator",
    email: auth.user?.email || undefined,
    role: role as HeaderAdminRole,
    scopeType: (scope.scope?.type as HeaderScopeType) || undefined,
    scopeId: scope.scope?.id,
    scopeName: scope.scope?.name,
  };

  async function handleLogout() {
    try {
      await firebaseLogout();
      auth.clearAuth();
      router.replace("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  if (!auth.initialized || auth.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />
          <p className="mt-4 text-sm font-semibold text-slate-600">
            Loading JUERP…
          </p>
        </div>
      </div>
    );
  }

  if (!auth.user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar
        role={role}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          user={headerUser}
          sidebarOpen={mobileOpen}
          onMenuClick={() => setMobileOpen((v) => !v)}
          onLogout={() => void handleLogout()}
          onProfileClick={() => router.push("/settings")}
          showNotifications={true}
          showProfile={true}
          showSystemStatus={true}
        />

        <main className="min-h-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}