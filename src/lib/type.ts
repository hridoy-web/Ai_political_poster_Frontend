import type { z } from "zod";
import { loginSchema, registerSchema } from "./validation/authValidation";



/* ---------------- API ---------------- */

export type ApiResult<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

export type RequestOptions = {
  method?: string;
  body?: Record<string, unknown> | FormData;
  /** Backend-এ forward করার cookie (যেমন token, guest_session_id) */
  cookies?: Record<string, string | undefined>;
};

/* ---------------- Auth ---------------- */
export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
  roles?: string[];
  roleNames?: string[];
  permissions?: string[];
  hasCreditBypass?: boolean;
};

/** Cookie-তে রাখা হালকা user (UI দেখানোর জন্য) */


export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  roles: string[];
  roleNames: string[];
  hasCreditBypass?: boolean;
};

export type RegisterInput = z.input<typeof registerSchema>;
export type LoginInput = z.input<typeof loginSchema>;

export type AuthData = {
  token: string;
  user: AuthUser;
};

export type FieldErrors = Partial<Record<"name" | "email" | "password", string>>;

export type ActionState = {
  success: boolean;
  message: string;
  fieldErrors?: FieldErrors;
};