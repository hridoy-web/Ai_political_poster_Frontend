// দায়িত্বে: Miskat (Frontend)
"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

import { serverURL } from "@/lib/api/authApi";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const baseUrl = serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
            const res = await fetch(`${baseUrl}/api/v1/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                }),
            });

            const result = await res.json();

            if (result.success) {
                setStatus({
                    type: "success",
                    msg: result.message || "আপনার বার্তাটি সফলভাবে আমাদের কাছে পৌঁছেছে! ধন্যবাদ।",
                });
                setFormData({ name: "", email: "", subject: "", message: "" });
            } else {
                setStatus({
                    type: "error",
                    msg: result.message || "মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
                });
            }
        } catch (error) {
            setStatus({
                type: "error",
                msg: "সার্ভারে সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে পুনরায় চেষ্টা করুন।",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">আপনার নাম</label>
                    <input
                        type="text"
                        required
                        placeholder="আপনার নাম লিখুন"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-foreground">ইমেইল ঠিকানা</label>
                    <input
                        type="email"
                        required
                        placeholder="example@mail.com"
                        className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
            </div>

            {/* Subject Field */}
            <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-foreground">বিষয় / ক্যাটাগরি</label>
                <input
                    type="text"
                    required
                    placeholder="যেমন: ফিচারের অনুরোধ, বাগ বা সমস্যা"
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
            </div>

            {/* Message Field */}
            <div className="space-y-1.5">
                <label className="text-xs sm:text-sm font-semibold text-foreground">বার্তা বা বিবরণ</label>
                <textarea
                    rows={5}
                    required
                    placeholder="আপনার সমস্যা বা প্রশ্নের বিস্তারিত বিবরণ লিখুন..."
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/80 focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full md:mt-18 py-3.5 px-6 rounded-xl font-bold bg-gradient-brand text-white shadow-lg hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center gap-2 text-sm"
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
            </button>

            {/* Status Messages */}
            {status && (
                <div
                    className={`p-4 rounded-xl border flex items-center gap-3 text-sm animate-in fade-in duration-300 ${status.type === "success"
                            ? "bg-secondary/10 border-secondary/30 text-secondary"
                            : "bg-destructive/10 border-destructive/30 text-destructive"
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