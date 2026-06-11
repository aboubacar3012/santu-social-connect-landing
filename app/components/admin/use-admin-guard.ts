"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/contexts/auth-context";

export function useAdminGuard() {
  const router = useRouter();
  const { isReady, token, isAdmin } = useAuth();

  useEffect(() => {
    if (!isReady) return;
    if (!token || !isAdmin) {
      router.replace("/admin/login");
    }
  }, [isReady, token, isAdmin, router]);

  return {
    isReady,
    token,
    isAdmin,
    isAuthenticated: Boolean(token && isAdmin),
  };
}
