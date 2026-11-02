// import { z } from "zod";


// /* ---------------- Password Rules (single source of truth) ---------------- */

// // Zod validation ar UI checklist duto-i ey list theke kaj kore,
// // tai dui jaygay rule alada hoye jabe na.
// export const PASSWORD_REQUIREMENTS = [
//   {
//     regex: /.{8,}/,
//     text: "At least 8 characters",
//     error: "Password must be at least 8 characters",
//   },
//   {
//     regex: /[0-9]/,
//     text: "At least 1 number",
//     error: "Password must include a number",
//   },
//   {
//     regex: /[a-z]/,
//     text: "At least 1 lowercase letter",
//     error: "Password must include a lowercase letter",
//   },
//   {
//     regex: /[A-Z]/,
//     text: "At least 1 uppercase letter",
//     error: "Password must include an uppercase letter",
//   },
//   {
//     regex: /[^A-Za-z0-9]/,
//     text: "At least 1 special character",
//     error: "Password must include a special character",
//   },
// ] as const;

// export type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

// export const STRENGTH_BAR_COLORS = [
//   "bg-green-200",
//   "bg-green-300",
//   "bg-green-400",
//   "bg-green-500",
//   "bg-green-600",
// ] as const;

// export const STRENGTH_TEXTS: Record<StrengthScore, string> = {
//   0: "Enter a password",
//   1: "Weak password",
//   2: "Fair password",
//   3: "Medium password",
//   4: "Strong password",
//   5: "Very strong password",
// };

// /* ---------------- Validation (Zod) ---------------- */

// export const registerSchema = z.object({
//   name: z
//     .string()
//     .trim()
//     .min(2, "Name must be at least 2 characters")
//     .max(100, "Name must be 100 characters or less"),

//   email: z.email("Enter a valid email address"),

//   password: z.string().superRefine((value, ctx) => {
//     for (const req of PASSWORD_REQUIREMENTS) {
//       if (!req.regex.test(value)) {
//         ctx.addIssue({ code: "custom", message: req.error });
//       }
//     }
//   }),
// });

// export type FormData_ = z.input<typeof registerSchema>;
// export type FieldErrors = Partial<Record<keyof FormData_, string[]>>;

// /* ---------------- Constants ---------------- */

// export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
// export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

// /* ---------------- Styles ---------------- */

// export const inputClass =
//   "h-auto w-full rounded-xl border border-input bg-background/80 px-3.5 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/10 aria-invalid:border-destructive sm:py-2.5";

// export const labelClass = "mb-1 block text-xs font-semibold sm:text-sm";
// export const fieldErrorClass = "mt-1 text-xs text-destructive";


// // import { z } from "zod";
// // import type { FieldErrors, StrengthScore } from "@/types/type";

// // /* ================================================================
// //  * Login
// //  * ================================================================ */

// // export const loginSchema = z.object({
// //   email: z.email("Enter a valid email address"),
// //   password: z.string().min(1, "Password is required"),
// // });

// // /* ================================================================
// //  * Register
// //  * ================================================================ */

// // export const PASSWORD_REQUIREMENTS = [
// //   { regex: /.{8,}/, text: "At least 8 characters" },
// //   { regex: /[0-9]/, text: "At least 1 number" },
// //   { regex: /[a-z]/, text: "At least 1 lowercase letter" },
// //   { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
// // ] as const;

// // export const registerSchema = z.object({
// //   name: z
// //     .string()
// //     .trim()
// //     .min(2, "Name must be at least 2 characters")
// //     .max(100, "Name is too long"),
// //   email: z.email("Enter a valid email address"),
// //   password: z
// //     .string()
// //     .min(8, "Password must be at least 8 characters")
// //     .regex(/[0-9]/, "Password must contain a number")
// //     .regex(/[a-z]/, "Password must contain a lowercase letter")
// //     .regex(/[A-Z]/, "Password must contain an uppercase letter"),
// // });

// // /* ================================================================
// //  * Helpers
// //  * ================================================================ */

// // /** Zod error -> { fieldName: [messages] } */
// // export function toFieldErrors<T>(error: z.ZodError): FieldErrors<T> {
// //   const errors: FieldErrors<T> = {};

// //   for (const issue of error.issues) {
// //     const key = issue.path[0] as keyof T;
// //     (errors[key] ??= []).push(issue.message);
// //   }

// //   return errors;
// // }

// // /* ================================================================
// //  * Image upload
// //  * ================================================================ */

// // export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
// // export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

// // /* ================================================================
// //  * Password strength
// //  * ================================================================ */

// // export const STRENGTH_TEXTS: Record<StrengthScore, string> = {
// //   0: "Enter a password",
// //   1: "Weak password",
// //   2: "Medium password",
// //   3: "Good password",
// //   4: "Strong password",
// // };

// // export const STRENGTH_BAR_COLORS = [
// //   "bg-red-500",
// //   "bg-orange-500",
// //   "bg-amber-500",
// //   "bg-emerald-500",
// // ] as const;

// // /* ================================================================
// //  * Shared styles
// //  * ================================================================ */

// // export const inputClass =
// //   "h-auto w-full rounded-xl border border-input bg-background/80 px-3.5 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/10 aria-invalid:border-destructive sm:py-2.5";

// // export const labelClass = "mb-1 block text-xs font-semibold sm:text-sm";
// // export const fieldErrorClass = "mt-1 text-xs text-destructive";
// // export const formErrorClass =
// //   "rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive";

// // export const primaryButtonClass =
// //   "flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3";
