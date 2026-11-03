// "use client";

// // TODO: authentication শেষ হলে এখানে আসল user logic বসবে।
// // আপাতত AuthContext ছাড়াই navbar যেন build error না দেয়, সেজন্য stub।

// export type User = {
//   id: string;
//   name: string;
//   email: string;
//   roles?: string[];
// };

// export const useAuth = () => {
//   return {
//     user: null as User | null,
//     loading: false,
//     setUser: (_user: User | null) => {},
//     refreshUser: async () => {},
//     logout: async () => {},
//   };
// };


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
    setUser(readUserCookie());
    setLoading(false);
  }, []);

  const roles = user?.roles ?? [];

  return {
    user,
    loading,
    isLoading: loading,
    isAuthenticated: !!user,
    roles,
    role: roles[0] ?? null,
    setUser,
    refreshUser: async () => setUser(readUserCookie()),
  };
};

