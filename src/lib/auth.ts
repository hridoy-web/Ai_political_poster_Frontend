import { cookies } from "next/headers";

import type { AuthUser, SessionUser } from "@/lib/type";

const TOKEN_COOKIE = "token";
const USER_COOKIE = "user";
const GUEST_COOKIE = "guest_session_id";
const SEVEN_DAYS = 60 * 60 * 24 * 7; 


export function getRedirectPath(user: AuthUser): string {
  const roles = user.roles ?? user.roleNames ?? [];

  if (roles.includes("SUPER_ADMIN") || roles.includes("ADMIN")) return "/admin";
  if (roles.includes("TEMPLATE_MANAGER")) return "/admin/templates";
  return "/";
}

/* ---------------- session ---------------- */

export async function setSession(token: string, user: AuthUser) {
  const store = await cookies();
  const base = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SEVEN_DAYS,
  };

    const roles = user.roles ?? user.roleNames ?? ["USER"];

  const sessionUser: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ?? roles[0] ?? "USER",
    roles,
    roleNames: roles,
    hasCreditBypass: user.hasCreditBypass ?? false,
  };

  store.set(TOKEN_COOKIE, token, { ...base, httpOnly: true });
  store.set(USER_COOKIE, JSON.stringify(sessionUser), { ...base, httpOnly: false });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(TOKEN_COOKIE);
  store.delete(USER_COOKIE);
}

export async function getToken() {
  return (await cookies()).get(TOKEN_COOKIE)?.value;
}

/* ---------------- guest ---------------- */

export async function getGuestSessionId() {
  return (await cookies()).get(GUEST_COOKIE)?.value;
}

export async function clearGuestSession() {
  (await cookies()).delete(GUEST_COOKIE);
}