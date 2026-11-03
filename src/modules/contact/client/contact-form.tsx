"use client";

import React, { useState } from "react";
import { z } from "zod";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// zod validation
const contactSchema = z.object({
  name: z
    .string()
    .min(3, { message: "নাম অন্তত ৩ অক্ষরের হতে হবে" })
    .max(50, { message: "নাম সর্বোচ্চ ৫০ অক্ষরের হতে পারবে" }),
  email: z.string().email({ message: "একটি বৈধ ইমেইল অ্যাড্রেস প্রদান করুন" }),
  subject: z
    .enum(["ফিচারের অনুরোধ", "বাগ বা সমস্যা", "অন্যান্য"])
    .refine(
      (val) => ["ফিচারের অনুরোধ", "বাগ বা সমস্যা", "অন্যান্য"].includes(val),
      {
        message: "দয়া করে একটি ক্যাটাগরি সিলেক্ট করুন",
      },
    ),
  message: z
    .string()
    .min(10, { message: "বার্তা অন্তত ১০ অক্ষরের হতে হবে" })
    .max(1000, { message: "বার্তা সর্বোচ্চ ১০০০ অক্ষরের হতে পারবে" }),
});

type FormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "ফিচারের অনুরোধ",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStatus(null);

    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};

      validationResult.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof FormData] = err.message;
        }
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const data = {
        access_key:
          process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
          "YOUR_ACCESS_KEY_HERE",
        name: formData.name,
        email: formData.email,
        subject: `[Political Poster App] ${formData.subject}`,
        message: formData.message,
        from_name: "AI Political Poster Maker",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({
          type: "success",
          msg: "আপনার বার্তাটি সফলভাবে আমাদের কাছে পৌঁছেছে! ধন্যবাদ।",
        });
        setFormData({
          name: "",
          email: "",
          subject: "ফিচারের অনুরোধ",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          msg:
            result.message || "মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        });
      }
    } catch {
      setStatus({
        type: "error",
        msg: "ইন্টারনেট বা সার্ভারে সংযোগে সমস্যা হয়েছে।",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-semibold text-foreground">
            আপনার নাম
          </Label>
          <Input
            placeholder="আপনার নাম লিখুন"
            className="w-full h-12 rounded-xl bg-muted/50 border-border/80 focus-visible:ring-primary/20 text-sm"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {errors.name && (
            <p className="text-xs text-destructive font-medium">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-semibold text-foreground">
            ইমেইল ঠিকানা
          </Label>
          <Input
            type="email"
            placeholder="example@mail.com"
            className="w-full h-12 rounded-xl bg-muted/50 border-border/80 focus-visible:ring-primary/20 text-sm"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-destructive font-medium">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Category Field (z.enum) */}
      <div className="space-y-1.5">
        <Label className="text-xs sm:text-sm font-semibold text-foreground">
          বিষয় / ক্যাটাগরি
        </Label>
        <select
          className="w-full h-12 px-3 rounded-xl bg-muted/50 border border-border/80 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
        >
          <option value="ফিচারের অনুরোধ">ফিচারের অনুরোধ</option>
          <option value="বাগ বা সমস্যা">বাগ বা সমস্যা</option>
          <option value="অন্যান্য">অন্যান্য</option>
        </select>
        {errors.subject && (
          <p className="text-xs text-destructive font-medium">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-1.5">
        <Label className="text-xs sm:text-sm font-semibold text-foreground">
          বার্তা বা বিবরণ
        </Label>
        <textarea
          rows={5}
          placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত বিবরণ লিখুন..."
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm resize-none text-foreground placeholder:text-muted-foreground"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
        {errors.message && (
          <p className="text-xs text-destructive font-medium">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full h-12 rounded-xl font-bold bg-gradient-brand text-white shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 text-sm flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>বার্তা পাঠানো হচ্ছে...</span>
          </>
        ) : (
          <>
            <span>বার্তা পাঠান</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </Button>

      {/* API Status*/}
      {status && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm animate-in fade-in duration-300 ${
            status.type === "success"
              ? "bg-secondary/10 border-secondary/35 text-secondary"
              : "bg-destructive/10 border-destructive/35 text-destructive"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0" />
          )}
          <span className="font-medium">{status.msg}</span>
        </div>
      )}
    </form>
  );
}
