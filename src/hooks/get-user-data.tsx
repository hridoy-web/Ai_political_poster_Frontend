"use client";

import { useEffect, useState } from "react";

import type { SessionUser } from "@/lib/type";

export type User = SessionUser;

function readUserCookie(): User | null {
  const raw = document.cookie
    .split("; ")
    .find((item) => item.startsWith("user="))
    ?.slice("user=".length);

  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as User;
  } catch {
    return null;
  }
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setUser(readUserCookie());
  setLoading(false);
}, []);

  const roles = user?.roles ?? [];

  const isSuperAdmin = roles.includes("SUPER_ADMIN");
  const isAdmin = isSuperAdmin || roles.includes("ADMIN");
  const isTemplateManager = isAdmin || roles.includes("TEMPLATE_MANAGER");

  return {
    user,
    loading,
    isLoading: loading,
    isAuthenticated: !!user,
    roles,
    role: roles[0] ?? null,
    isSuperAdmin,
    isAdmin,
    isTemplateManager,
    setUser,
    refreshUser: async () => setUser(readUserCookie()),
  };
};

