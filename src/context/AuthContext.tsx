"use client";

import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import apiClient from "@/lib/api-client";
import authApi, { serverURL } from "@/lib/api/authApi";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title?: string;
  area?: string;
  avatar?: { url?: string } | any;
  avatarAssetId?: string;
  role?: string;
  roles?: string[];
  roleNames?: string[];
  permissions?: string[];
  hasCreditBypass?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<User | null>;
  loading: boolean;
  isTemplateManager: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasCreditBypass: boolean;
  canBypassCredits: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = useCallback(async (): Promise<User | null> => {
    try {
      const response = await apiClient.request({
        url: authApi.getCurrentUser.url,
        method: authApi.getCurrentUser.method,

      });
      console.log("[AuthContext] Current user loaded:", response.data?.data);
      const fetchedUser = response.data?.data || null;
      setUser(fetchedUser);
      return fetchedUser;
    } catch (error) {
      console.warn("[AuthContext] Failed to fetch current user (not authenticated):", error);
      setUser(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  const rawRoles: string[] = [
    ...(Array.isArray(user?.roles) ? user.roles : []),
    ...(Array.isArray(user?.roleNames) ? user.roleNames : []),
    ...(typeof user?.role === "string" ? [user.role] : []),
  ].map((r) => String(r).toUpperCase().trim());

  const roles = Array.from(new Set(rawRoles));
  const permissions = user?.permissions || [];

  const isSuperAdmin =
    roles.includes("SUPER_ADMIN") ||
    roles.includes("SUPER ADMIN") ||
    user?.email?.toLowerCase() === "superadmin@posterai.com";

  const isAdmin =
    isSuperAdmin ||
    roles.includes("ADMIN");

  const isTemplateManager =
    isSuperAdmin ||
    isAdmin ||
    roles.includes("TEMPLATE_MANAGER") ||
    roles.includes("TEMPLATE MANAGER");

  const hasCreditBypass = Boolean(
    user?.hasCreditBypass ||
      isSuperAdmin ||
      isAdmin ||
      permissions.includes("UNLIMITED_CREDITS") ||
      permissions.includes("BYPASS_CREDIT_CHECK") ||
      permissions.includes("POSTER_CREATE_FREE") ||
      permissions.includes("POSTER:CREATE:FREE") ||
      permissions.includes("CREDITS:BYPASS")
  );

  const info = {
    user,
    setUser,
    refreshUser: getCurrentUser,
    loading,
    isTemplateManager,
    isAdmin,
    isSuperAdmin,
    hasCreditBypass,
    canBypassCredits: hasCreditBypass,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
