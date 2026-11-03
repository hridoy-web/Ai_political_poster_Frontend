import { z } from "zod";
import { FieldErrors } from "../type";



/* ---------------- Schemas (backend-এর সাথে মেলানো) ---------------- */

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Enter a valid email address" }));

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Name is required" })
    .max(100, { error: "Name must be 100 characters or fewer" }),
  email: emailSchema,
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[a-z]/, { error: "Password must contain a lowercase letter" })
    .regex(/[A-Z]/, { error: "Password must contain an uppercase letter" })
    .regex(/[0-9]/, { error: "Password must contain a number" })
    .regex(/[^a-zA-Z0-9]/, { error: "Password must contain a special character" })
    .refine((v) => new TextEncoder().encode(v).length <= 72, {
      error: "Password must not exceed 72 bytes",
    }),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { error: "Password is required" }),
});

/** Zod error থেকে প্রতিটি field-এর প্রথম message বের করে। */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0] as keyof FieldErrors;
    errors[key] ??= issue.message;
  }

  return errors;
}

/* ---------------- Password strength (UI) ---------------- */

export const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[a-z]/, text: "One lowercase letter" },
  { regex: /[A-Z]/, text: "One uppercase letter" },
  { regex: /[0-9]/, text: "One number" },
  { regex: /[^a-zA-Z0-9]/, text: "One special character" },
];

export const STRENGTH_BAR_COLORS = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-lime-500",
  "bg-emerald-500",
];

export const STRENGTH_TEXTS = [
  "Enter a password",
  "Very weak",
  "Weak",
  "Medium",
  "Strong",
  "Very strong",
];

/* ---------------- Profile image ---------------- */

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB