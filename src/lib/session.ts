import { cookies } from "next/headers";
import authApi, { serverURL } from "@/lib/api/authApi";
import type { User } from "@/context/AuthContext"; // tomar path onujayi

export async function getSession(): Promise<User | null> {
  const jar = await cookies();
  const cookieHeader = jar.getAll().map((c) => `${c.name}=${c.value}`).join("; ");
  if (!cookieHeader) return null;

  const res = await fetch(
    `${serverURL.replace(/\/$/, "")}/${authApi.getCurrentUser.url.replace(/^\//, "")}`,
    {
      method: authApi.getCurrentUser.method,
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    },
  ).catch(() => null);

  if (!res || !res.ok) return null;

  const json = await res.json().catch(() => null);
  return json?.data ?? null;
}