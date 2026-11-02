"use client";

import { useContext, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContext } from "@/context/AuthContext";

import { getApiErrorMessage, registerRequest } from "../_action/authAction";
import { ALLOWED_IMAGE_TYPES, RegisterData, registerSchema, validateImage } from "@/lib/validation/authValidation";

function FieldError({ message }: { message?: string }) {
  return message ? (
    <p role="alert" className="text-xs text-destructive">
      {message}
    </p>
  ) : null;
}

export default function RegisterForm() {
  const router = useRouter();
  const setUser = useContext(AuthContext)?.setUser;

  const [image, setImage] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  /* ---------- Image ---------- */

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const message = validateImage(file);
    if (message) {
      setError(message);
      setImage(null);
      e.target.value = "";
      return;
    }

    setError("");
    setImage(file);
  };

  /* ---------- Submit ---------- */

  const onSubmit = async (values: RegisterData) => {
    setError("");

    // multipart/form-data body
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("password", values.password);
    if (image) data.append("image", image);

    try {
      const user = await registerRequest(data);
      if (user) setUser?.(user);

      router.push("/");
      router.refresh();
    } catch (err) {
      setError(getApiErrorMessage(err, "Registration failed. Please try again."));
    }
  };

  /* ---------- UI ---------- */

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">Full name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          autoComplete="name"
          maxLength={100}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        <FieldError message={errors.email?.message} />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            className="pr-10"
            aria-invalid={!!errors.password}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 text-muted-foreground hover:text-primary"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <FieldError message={errors.password?.message} />
      </div>

      {/* Profile photo (optional) */}
      <div className="space-y-1.5">
        <Label htmlFor="image">
          Profile photo <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="image"
          type="file"
          accept={ALLOWED_IMAGE_TYPES.join(",")}
          onChange={onImageChange}
        />
        <p className="text-xs text-muted-foreground">PNG, JPG or WEBP · Max 2 MB</p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? "Submitting..." : "Create account"}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}