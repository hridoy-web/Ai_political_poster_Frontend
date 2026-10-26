"use client";

import {
  useContext,
  useState,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authApi, { serverURL } from "@/lib/api/authApi";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "@/context/AuthContext";

/* ---------------- Validation (Zod) ---------------- */

const loginSchema = z.object({
  // Zod v4. If you use Zod v3, change this to: z.string().email("...")
  email: z.email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginData = z.input<typeof loginSchema>;
type FieldErrors = Partial<Record<keyof LoginData, string>>;

/* ---------------- Styles ---------------- */

const inputClass =
  "h-auto w-full rounded-xl border border-input bg-background/80 px-3.5 py-2 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-ring/10 aria-invalid:border-destructive sm:py-2.5";

const labelClass = "mb-1 block text-xs font-semibold sm:text-sm";
const fieldErrorClass = "mt-1 text-xs text-destructive";

/* ---------------- Component ---------------- */

export default function LoginForm() {
  const router = useRouter();

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("LoginForm must be used within AuthProvider");
  }

  const { setUser } = authContext;
  const [form, setForm] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const busy = loading || googleLoading;

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

  /* ---------------- Form Submit ---------------- */

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (busy) return;

    setError("");

    // Validate form data using Zod.
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const errors: FieldErrors = {};

      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof LoginData;
        errors[key] ??= issue.message;
      }

      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      setLoading(true);

      const res = await axios.request({
        baseURL: serverURL,
        url: authApi.login.url,
        method: authApi.login.method,
        data: {
          email: result.data.email,
          password: result.data.password,
        },
        withCredentials: true,
      });
      setUser(res?.data?.data?.user);
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ?? "লগইন সম্পন্ন হয়নি। আবার চেষ্টা করো।",
        );
      } else {
        setError("একটি অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করো।");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Google Login ---------------- */

  const handleGoogleLogin = () => {
    if (busy) return;

    setError("");
    setGoogleLoading(true);

    // Full-page redirect: the backend handles the OAuth flow and
    // redirects back to the frontend after success.
  };

  /* ---------------- Login Form ---------------- */

  return (
    <>
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <LogIn className="h-5 w-5" />
          </span>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back
          </h2>
        </div>

        <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
          Log in to continue creating and sharing your posters.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
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
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password */}

        <div>
          <div className="mb-1 flex items-center justify-between">
            <Label
              htmlFor="password"
              className="block text-xs font-semibold sm:text-sm"
            >
              Password
            </Label>

            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-primary hover:underline sm:text-sm"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
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
            <p role="alert" className={fieldErrorClass}>
              {fieldErrors.password}
            </p>
          )}
        </div>

        {/* API Error */}

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
          disabled={busy}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary/20 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Divider */}

        <div className="flex items-center gap-3 py-1">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-xs">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Google */}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={busy}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-background/80 px-5 py-2.5 text-sm font-semibold transition hover:border-primary hover:bg-secondary hover:text-secondary-foreground active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3"
        >
          <FcGoogle className="h-4 w-4" />
          {googleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-xs text-muted-foreground sm:text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create account
          </Link>
        </p>
      </form>
    </>
  );
}
