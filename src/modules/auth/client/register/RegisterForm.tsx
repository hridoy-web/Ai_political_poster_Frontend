"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import authApi, { serverURL } from "@/lib/api/authApi";
import {
  Camera,
  CheckCheck,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ChangeEvent, type SyntheticEvent } from "react";
import { ALLOWED_IMAGE_TYPES, fieldErrorClass, FieldErrors, FormData_, inputClass, labelClass, MAX_IMAGE_SIZE, PASSWORD_REQUIREMENTS, registerSchema, STRENGTH_BAR_COLORS, STRENGTH_TEXTS, StrengthScore } from "../../auth.schema";

/* ---------------- Component ---------------- */

export default function RegisterForm() {
  const router = useRouter();
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

  const fileRef = useRef<HTMLInputElement>(null);

  /* ---------------- Password Strength ---------------- */

  const passwordStrength = useMemo(() => {
    const requirements = PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(form.password),
      text: req.text,
    }));

    return {
      score: requirements.filter((req) => req.met).length as StrengthScore,
      requirements,
    };
  }, [form.password]);

  const hasPasswordError = !!fieldErrors.password;
  const showPasswordHelp = form.password.length > 0 || hasPasswordError;

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

  const handleRemoveImage = () => {
    setImage(null);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
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
        withCredentials: true,
      });

      // Redirect directly to home on successful registration
      router.push("/");
      return;
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

  /* ---------------- Registration Form ---------------- */

  return (
    <>
      {/* Heading */}

      {/* <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create your account
        </h1>

        <p className="mt-1.5 text-xs leading-5 text-muted-foreground sm:text-sm">
          Join to start creating and sharing your posters.
        </p>
      </div> */}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Profile Image */}

        <div className="flex flex-col items-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              aria-label={preview ? "Change profile photo" : "Upload profile photo"}
              className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/30 bg-muted/40 transition hover:border-primary hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile image preview"
                  width={96}
                  height={96}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-10 w-10 text-muted-foreground" />
              )}
            </button>

            <span className="pointer-events-none absolute -bottom-0.5 -right-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-gradient-brand text-white shadow-md">
              <Camera className="h-4 w-4" />
            </span>

            <input
              ref={fileRef}
              id="image"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImage}
              className="hidden"
              tabIndex={-1}
              aria-hidden
            />
          </div>

          <p className="mt-2.5 text-xs font-semibold sm:text-sm">
            Profile photo{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </p>

          <div className="mt-0.5 flex max-w-full items-center gap-2">
            <p className="truncate text-[10px] text-muted-foreground sm:text-xs">
              {image ? image.name : "PNG, JPG or WEBP · Max 2 MB"}
            </p>

            {preview && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="shrink-0 text-[10px] font-semibold text-destructive hover:underline sm:text-xs"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Name */}

        <div>
          <Label htmlFor="name" className={labelClass}>
            Full name
          </Label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

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
              className={cn(inputClass, "pl-10")}
            />
          </div>

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

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!fieldErrors.email}
              className={cn(inputClass, "pl-10")}
            />
          </div>

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
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              aria-invalid={hasPasswordError}
              aria-describedby="password-strength"
              className={cn(inputClass, "pl-10 pr-16")}
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

          {/* Password strength + requirements */}

          {showPasswordHelp && (
            <div
              id="password-strength"
              aria-live="polite"
              className="mt-2.5 rounded-xl border border-border bg-muted/40 p-3"
            >
              {/* Strength bar */}
              <div className="flex w-full justify-between gap-1.5">
                {STRENGTH_BAR_COLORS.map((color, i) => (
                  <span
                    key={color}
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      passwordStrength.score >= i + 1 ? color : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Label */}
              <p className="mt-2 flex justify-between text-xs font-medium">
                <span>Must contain:</span>
                <span>{STRENGTH_TEXTS[passwordStrength.score]}</span>
              </p>

              {/* Requirements checklist */}
              <ul
                className="mt-2 grid grid-cols-1 gap-x-3 gap-y-1.5 min-[420px]:grid-cols-2"
                aria-label="Password requirements"
              >
                {passwordStrength.requirements.map((req) => (
                  <li key={req.text} className="flex items-center gap-1.5">
                    {req.met ? (
                      <CheckCheck
                        size={14}
                        className="shrink-0 text-emerald-500"
                      />
                    ) : (
                      <X
                        size={14}
                        className={cn(
                          "shrink-0",
                          hasPasswordError
                            ? "text-destructive"
                            : "text-muted-foreground/80",
                        )}
                      />
                    )}

                    <span
                      className={cn(
                        "text-xs leading-4",
                        req.met
                          ? "text-emerald-600"
                          : hasPasswordError
                            ? "text-destructive"
                            : "text-muted-foreground",
                      )}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
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
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
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