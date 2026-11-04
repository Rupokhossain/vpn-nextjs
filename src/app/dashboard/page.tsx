"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="space-y-3">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-bold text-slate-700">Redirecting to Admin Dashboard...</p>
      </div>
    </div>
  );
}
