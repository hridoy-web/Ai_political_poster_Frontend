"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { ImagePlus, Check, UserPlus, User, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authApi, { serverURL } from "@/lib/api/authApi";

/* ---------------- Validation (Zod) ---------------- */

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be 100 characters or less"),

  email: z.email("Enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must include an uppercase letter")
    .regex(/[a-z]/, "Password must include a lowercase letter")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
});

type FormData_ = z.input<typeof registerSchema>;
type FieldErrors = Partial<Record<keyof FormData_, string[]>>;

/* ---------------- Constants ---------------- */

const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB






/* ---------------- Styles ---------------- */

const inputClass =
  "h-auto w-full rounded-xl border border-input bg-background/80 px-3.5 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/10 aria-invalid:border-destructive sm:py-2.5";

const labelClass = "mb-1 block text-xs font-semibold sm:text-sm";
const fieldErrorClass = "mt-1 text-xs text-destructive";

/* ---------------- Component ---------------- */

export default function RegisterForm() {
  const [form, setForm] = useState<FormData_>({
    name: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  /* ---------------- Image Preview ---------------- */

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  /* ---------------- Input Change ---------------- */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setError("");
  };

  /* ---------------- Image Upload ---------------- */

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("PNG, JPG অথবা WEBP ছবি নির্বাচন করো।");
    } else if (file.size > MAX_IMAGE_SIZE) {
      setError("ছবির সাইজ সর্বোচ্চ 2 MB হতে পারবে।");
    } else {
      setImage(file);
      setError("");
    }

    // Allow selecting the same file again.
    e.target.value = "";
  };

  /* ---------------- Form Submit ---------------- */

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    // Validate form data using Zod.
    const result = registerSchema.safeParse(form);

    if (!result.success) {
      const errors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormData_;
        (errors[key] ??= []).push(issue.message);
      }

      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    // Build the multipart/form-data body sent to the backend.

    const data = new FormData();

    data.append("name", result.data.name);
    data.append("email", result.data.email);
    data.append("password", result.data.password);

    if (image) {
      data.append("image", image);
    }

    try {
      setLoading(true);

      await axios.request({
        baseURL: serverURL,
        url: authApi.register.url,
        method: authApi.register.method,
        data,
        // todo
        // withCredentials: true,
      });

      setDone(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ??
            "রেজিস্ট্রেশন সম্পন্ন হয়নি। আবার চেষ্টা করুন",
        );
      } else {
        setError("একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Success Screen ---------------- */

  if (done) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground">
          <Check className="h-7 w-7 text-white" />
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Account created
        </h2>

        <p className="mt-2 max-w-sm text-xs leading-5 text-muted-foreground sm:text-sm">
          Your account is ready. Log in to start creating your posters.
        </p>

        <Link
          href="/login"
          className="mt-6 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105"
        >
          Go to login
        </Link>
      </div>
    );
  }

  /* ---------------- Registration Form ---------------- */

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <UserPlus className="h-5 w-5" />
          </span>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Create your account
          </h2>
        </div>

        <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
          Join to start creating and sharing your posters.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Profile Image */}

        <div>
          <Label htmlFor="image" className={labelClass}>
            Profile image{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>

          <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-2.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/20 bg-card">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile image preview"
                  width={64}
                  height={64}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold transition hover:border-primary hover:bg-secondary hover:text-secondary-foreground sm:text-sm"
                >
                  <ImagePlus className="h-3.5 w-3.5" />
                  {preview ? "Change photo" : "Upload photo"}
                </button>

                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);

                      if (fileRef.current) {
                        fileRef.current.value = "";
                      }
                    }}
                    className="text-xs font-semibold text-destructive hover:underline sm:text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <p className="mt-1 truncate text-[10px] text-muted-foreground sm:text-xs">
                {image ? image.name : "PNG, JPG or WEBP · Max 2 MB"}
              </p>

              <input
                ref={fileRef}
                id="image"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImage}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Name */}

        <div>
          <Label htmlFor="name" className={labelClass}>
            Full name
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            maxLength={100}
            aria-invalid={!!fieldErrors.name}
            className={inputClass}
          />

          {fieldErrors.name && (
            <p role="alert" className={fieldErrorClass}>
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* Email */}

        <div>
          <Label htmlFor="email" className={labelClass}>
            Email address
          </Label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!fieldErrors.email}
            className={inputClass}
          />

          {fieldErrors.email && (
            <p role="alert" className={fieldErrorClass}>
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <Label htmlFor="password" className={labelClass}>
            Password
          </Label>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.password}
              className={`${inputClass} pr-16`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute inset-y-0 right-3 flex items-center gap-1 text-xs font-medium text-muted-foreground transition hover:text-primary sm:text-sm"
            >
              {showPassword ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Hide</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Show</span>
                </>
              )}
            </button>
          </div>

          {fieldErrors.password && (
            <ul role="alert" className="mt-1 space-y-0.5">
              {fieldErrors.password.map((msg) => (
                <li
                  key={msg}
                  className="flex items-start gap-1.5 text-xs text-destructive"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-destructive" />
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* API / Upload Error */}

        {error && (
          <p
            role="alert"
            className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive"
          >
            {error}
          </p>
        )}

        {/* Submit */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
        >
          {loading ? "Submitting..." : "Create account"}
        </button>

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
