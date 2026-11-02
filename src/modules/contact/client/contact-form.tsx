"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const data = {
        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `[Political Poster App] ${formData.subject}`,
        message: formData.message.trim(),
        from_name: "AI Political Poster Maker",
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        setStatus({ type: "success", msg: "আপনার বার্তাটি সফলভাবে আমাদের কাছে পৌঁছেছে! ধন্যবাদ।" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", msg: result.message || "মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" });
      }
    } catch {
      setStatus({ type: "error", msg: "ইন্টারনেট বা সার্ভারে সংযোগে সমস্যা হয়েছে।" });
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field: string, value: string) => setFormData({ ...formData, [field]: value });

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-semibold text-foreground">আপনার নাম</Label>
          <Input
            required
            placeholder="আপনার নাম লিখুন"
            className="w-full h-12 rounded-xl bg-muted/50 border-border/80 focus-visible:ring-primary/20 text-sm"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-semibold text-foreground">ইমেইল ঠিকানা</Label>
          <Input
            type="email"
            required
            placeholder="example@mail.com"
            className="w-full h-12 rounded-xl bg-muted/50 border-border/80 focus-visible:ring-primary/20 text-sm"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs sm:text-sm font-semibold text-foreground">বিষয় / ক্যাটাগরি</Label>
        <Input
          required
          placeholder="যেমন: ফিচারের অনুরোধ, বাগ বা সমস্যা"
          className="w-full h-12 rounded-xl bg-muted/50 border-border/80 focus-visible:ring-primary/20 text-sm"
          value={formData.subject}
          onChange={(e) => updateField("subject", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs sm:text-sm font-semibold text-foreground">বার্তা বা বিবরণ</Label>
        <textarea
          rows={5}
          required
          placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত বিবরণ লিখুন..."
          className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm resize-none text-foreground placeholder:text-muted-foreground"
          value={formData.message}
          onChange={(e) => updateField("message", e.target.value)}
        />
      </div>

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

      {status && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-sm animate-in fade-in duration-300 ${
            status.type === "success"
              ? "bg-secondary/10 border-secondary/35 text-secondary"
              : "bg-destructive/10 border-destructive/35 text-destructive"
          }`}
        >
          {status.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
          <span className="font-medium">{status.msg}</span>
        </div>
      )}
    </form>
  );
}