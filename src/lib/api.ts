import type { ApiResult, RequestOptions } from "@/lib/type";

const API_URL = (process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

/** Next.js Express backend fetch request */
export async function apiRequest<T = unknown>(
  path: string,
  { method = "POST", body, cookies = {} }: RequestOptions = {},
): Promise<ApiResult<T>> {
  const isForm = body instanceof FormData;
  const headers: Record<string, string> = {};

  if (body && !isForm) headers["Content-Type"] = "application/json";

  const cookieHeader = Object.entries(cookies)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  if (cookieHeader) headers.Cookie = cookieHeader;
  if (cookies.token) headers.Authorization = `Bearer ${cookies.token}`;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: isForm ? body : body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    return {
      success: res.ok && json?.success !== false,
      message: json?.message ?? (res.ok ? "Success" : "Request failed"),
      data: json?.data ?? null,
    };
  } catch {
    return {
      success: false,
      message: "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। আবার চেষ্টা করো।",
      data: null,
    };
  }
}