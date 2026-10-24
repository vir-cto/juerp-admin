"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 text-xl font-black text-white shadow-lg">
          J
        </div>

        <h1 className="mt-4 text-xl font-black text-slate-900">
          JUERP
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          JUONE Administration
        </p>

        <div className="mt-5 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-slate-200 border-t-orange-500" />
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Redirecting to login...
        </p>

      </div>
    </main>
  );
}