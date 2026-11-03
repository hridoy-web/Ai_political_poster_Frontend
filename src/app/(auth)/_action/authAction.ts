"use server";

import { redirect } from "next/navigation";
import { apiRequest } from "@/lib/api";
import {
  clearGuestSession,
  clearSession,
  getGuestSessionId,
  getRedirectPath,
  getToken,
  setSession,
} from "@/lib/auth";
import type { ActionState, ApiResult, AuthData, LoginInput } from "@/lib/type";
import { ALLOWED_IMAGE_TYPES, loginSchema, MAX_IMAGE_SIZE, registerSchema, toFieldErrors } from "@/lib/validation/authValidation";

const AUTH = "/auth";

async function finishAuth(res: ApiResult<AuthData>): Promise<ActionState> {
  if (!res.success) {
    return { success: false, message: res.message };
  }

  if (!res.data?.token || !res.data.user) {
    return { success: false, message: "সার্ভার থেকে অপ্রত্যাশিত উত্তর এসেছে।" };
  }

  await setSession(res.data.token, res.data.user); 
  await clearGuestSession();

  redirect(getRedirectPath(res.data.user));
}

export async function loginAction(input: LoginInput): Promise<ActionState> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const res = await apiRequest<AuthData>(`${AUTH}/login`, {
    body: parsed.data,
    cookies: { guest_session_id: await getGuestSessionId() },
  });

  return finishAuth(res);
}

export async function registerAction(formData: FormData): Promise<ActionState> {
  const parsed = registerSchema.safeParse({
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0].message,
      fieldErrors: toFieldErrors(parsed.error),
    };
  }

  const body = new FormData();
  body.append("name", parsed.data.name);
  body.append("email", parsed.data.email);
  body.append("password", parsed.data.password);

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    if (!ALLOWED_IMAGE_TYPES.includes(image.type)) {
      return { success: false, message: "PNG, JPG অথবা WEBP ছবি নির্বাচন করো।" };
    }
    if (image.size > MAX_IMAGE_SIZE) {
      return { success: false, message: "ছবির সাইজ সর্বোচ্চ 2 MB হতে পারবে।" };
    }
    body.append("image", image, image.name); 
  }

  const res = await apiRequest<AuthData>(`${AUTH}/register`, {
    body,
    cookies: { guest_session_id: await getGuestSessionId() },
  });

  return finishAuth(res);
}

export async function googleLoginAction(credential: string): Promise<ActionState> {
  if (!credential || typeof credential !== "string") {
    return { success: false, message: "Google authorization token is required" };
  }

  const res = await apiRequest<AuthData>(`${AUTH}/google`, {
    body: { credential },
    cookies: { guest_session_id: await getGuestSessionId() },
  });

  return finishAuth(res);
}

export async function logoutAction() {
  // backend logout-এ verifyToken 
  await apiRequest(`${AUTH}/logout`, { cookies: { token: await getToken() } });

  await clearSession();
  redirect("/login");
}