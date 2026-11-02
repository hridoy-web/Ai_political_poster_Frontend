import { z } from "zod";

/* ---------------- Image rules (register) ---------------- */

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

/** Returns an error message, or null if the file is OK. */
export function validateImage(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Please select a PNG, JPG or WEBP image.";
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return "Image size must be 2 MB or less.";
  }
  return null;
}

/* ---------------- Schemas ---------------- */

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add at least one uppercase letter")
    .regex(/[a-z]/, "Add at least one lowercase letter")
    .regex(/[0-9]/, "Add at least one number"),
});

/* ---------------- Types (inferred from the schemas) ---------------- */

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;