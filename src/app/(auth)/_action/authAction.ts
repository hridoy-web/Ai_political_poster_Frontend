import axios from "axios";
import authApi, { serverURL } from "@/lib/api/authApi";
import { SessionUser } from "@/types/type";
import { LoginData } from "@/lib/validation/authValidation";
// import type { LoginData, SessionUser } from "@/types/type";



/* ================================================================
 * API calls (the backend sets the session cookie)
 * ================================================================ */

export async function loginRequest(data: LoginData) {
  const res = await axios.request({
    baseURL: serverURL,
    url: authApi.login.url,
    method: authApi.login.method,
    data,
    withCredentials: true,
  });

  return res?.data?.data?.user;
}

export async function googleLoginRequest(idToken: string) {
  const res = await axios.request({
    baseURL: serverURL,
    url: authApi.googleLogin.url,
    method: authApi.googleLogin.method,
    data: { idToken },
    withCredentials: true,
  });

  return res?.data?.data?.user;
}

/** `data` is multipart/form-data: name, email, password, image (optional) */
export async function registerRequest(data: FormData) {
  const res = await axios.request({
    baseURL: serverURL,
    url: authApi.register.url,
    method: authApi.register.method,
    data,
    withCredentials: true,
  });

  return res?.data?.data?.user;
}

/* ================================================================
 * Helpers
 * ================================================================ */

/** Role-based redirect. Works for both `roles[]` and a single `role`. */
export function getRedirectPath(user?: SessionUser | null): string {
  const roles =
    user?.roles ?? user?.roleNames ?? (user?.role ? [user.role] : []);

  if (roles.includes("SUPER_ADMIN") || roles.includes("ADMIN")) return "/admin";
  if (roles.includes("TEMPLATE_MANAGER")) return "/admin/templates";
  return "/";
}

/** Axios / unknown error -> user friendly message */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.message ?? fallback;
  }
  return "Something went wrong. Please try again.";
}