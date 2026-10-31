"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  Eye,
  Tag,
  AlertTriangle,
  X,
  Crown,
  Sparkles,
  Layers,
  Loader2,
  ExternalLink,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { AdminTemplate } from "../admin.types";
import { serverURL } from "@/lib/api/authApi";

export function AdminTemplatesGrid({ templates: initialTemplates }: { templates: AdminTemplate[] }) {
  const [templatesList, setTemplatesList] = useState<AdminTemplate[]>(initialTemplates);
  const [previewTemplate, setPreviewTemplate] = useState<AdminTemplate | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<AdminTemplate | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTemplatesList(initialTemplates);
  }, [initialTemplates]);

  const handleDeleteConfirm = async () => {
    if (!deleteCandidate) return;

    try {
      setIsDeleting(true);
      const res = await axios.delete(`${serverURL}/api/v1/template/${deleteCandidate.id}`, {
        withCredentials: true,
      });

      if (res.data?.success || res.status === 200) {
        toast.success(`"${deleteCandidate.title}" টেমপ্লেট সফলভাবে মুছে ফেলা হয়েছে!`);
        setTemplatesList((prev) => prev.filter((item) => item.id !== deleteCandidate.id));
        setDeleteCandidate(null);
      } else {
        throw new Error(res.data?.message || "মুছে ফেলা সম্ভব হয়নি।");
      }
    } catch (err: any) {
      console.error("Failed to delete template:", err);
      const msg = err.response?.data?.message || err.message || "টেমপ্লেট মুছতে সমস্যা হয়েছে।";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!templatesList || templatesList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/80 bg-card/40">
        <div className="size-14 rounded-2xl bg-muted/60 flex items-center justify-center text-muted-foreground mb-3">
          <Layers className="size-7" />
        </div>
        <p className="text-sm font-semibold text-foreground">কোনো টেমপ্লেট পাওয়া যায়নি।</p>
        <p className="text-xs text-muted-foreground mt-1">
          উপরে &ldquo;নতুন ক্যানভাস টেমপ্লেট ডিজাইন করুন&rdquo; বাটনে ক্লিক করে নতুন ফ্রেম যুক্ত করুন।
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {templatesList.map((tpl) => (
          <Card
            key={tpl.id}
            className="group border border-border/80 bg-card/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full hover:border-brand-primary/40"
          >
            <div className="relative w-full p-3 bg-muted/30 rounded-t-3xl overflow-hidden flex items-center justify-center">
              {/* Aspect Ratio Box with Performance Optimization */}
              <div className="relative w-full aspect-3/4 rounded-2xl overflow-hidden shadow-xs bg-muted/70 group-hover:shadow-sm transition-shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tpl.imageUrl}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Category Badge */}
              <div className="absolute top-5 left-5 z-10">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold bg-background/90 backdrop-blur-md text-foreground border border-border/60 rounded-full shadow-xs">
                  <Tag className="w-3 h-3 text-brand-primary" /> {tpl.category}
                </span>
              </div>

              {/* Premium / Free Badge */}
              <div className="absolute top-5 right-5 z-10">
                {tpl.isPremium ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-amber-500/90 backdrop-blur-md text-slate-950 rounded-full shadow-xs">
                    <Crown className="w-3 h-3" /> প্রো
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-600/90 backdrop-blur-md text-white rounded-full shadow-xs">
                    ফ্রি
                  </span>
                )}
              </div>
            </div>

            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-foreground text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {tpl.aspectRatio ? `রেশিও: ${tpl.aspectRatio}` : "স্ট্যান্ডার্ড পোস্টার"} •{" "}
                  {tpl.width && tpl.height ? `${tpl.width}×${tpl.height}px` : "1080×1350"}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-border/40">
                {/* Preview Button */}
                <Button
                  id={`btn-preview-${tpl.id}`}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewTemplate(tpl)}
                  className="flex-1 text-xs h-9 rounded-xl font-semibold hover:bg-muted gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-brand-primary" /> প্রিভিউ
                </Button>

                {/* Delete Button */}
                <Button
                  id={`btn-delete-${tpl.id}`}
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteCandidate(tpl)}
                  title="টেমপ্লেট মুছুন"
                  className="h-9 w-9 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-3xl max-h-[90vh] bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border/60 bg-muted/20">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                  <Eye className="size-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-foreground truncate">
                    {previewTemplate.title}
                  </h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>{previewTemplate.category}</span>
                    <span>•</span>
                    <span className="text-emerald-500 font-medium">ক্যানভাস টেমপ্লেট</span>
                  </p>
                </div>
              </div>

              <Button
                id="btn-close-preview-x"
                variant="ghost"
                size="icon"
                onClick={() => setPreviewTemplate(null)}
                className="size-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <X className="size-4" />
              </Button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left: Full Preview Image */}
                <div className="md:col-span-6 bg-slate-950/80 rounded-2xl overflow-hidden p-2 flex items-center justify-center border border-border shadow-inner">
                  <div className="relative w-full max-w-[340px] aspect-3/4 rounded-xl overflow-hidden bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewTemplate.imageUrl}
                      alt={previewTemplate.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Right: Template Specs & Metadata */}
                <div className="md:col-span-6 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                      টেমপ্লেট বিবরণ
                    </span>
                    <h4 className="text-base font-bold text-foreground">
                      {previewTemplate.title}
                    </h4>
                    {previewTemplate.description && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {previewTemplate.description}
                      </p>
                    )}
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground font-semibold">অ্যাসপেক্ট রেশিও</span>
                      <p className="text-xs font-bold text-foreground">
                        {previewTemplate.aspectRatio || "4:5"}
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground font-semibold">ক্যানভাস সাইজ</span>
                      <p className="text-xs font-bold text-foreground">
                        {previewTemplate.width || 1080} × {previewTemplate.height || 1350} px
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground font-semibold">প্রার্থীর ছবি স্লট</span>
                      <p className="text-xs font-bold text-foreground">
                        {previewTemplate.photoSlotsCount || 1} টি
                      </p>
                    </div>

                    <div className="p-3 rounded-2xl bg-muted/40 border border-border/60 space-y-1">
                      <span className="text-[10px] text-muted-foreground font-semibold">টেক্সট স্লট</span>
                      <p className="text-xs font-bold text-foreground">
                        {previewTemplate.textSlotsCount || 4} টি
                      </p>
                    </div>
                  </div>

                  {/* Badges Info */}
                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-muted text-foreground border border-border rounded-xl">
                      <Tag className="w-3.5 h-3.5 text-brand-primary" /> {previewTemplate.category}
                    </span>
                    {previewTemplate.isPremium ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-xl">
                        <Crown className="w-3.5 h-3.5" /> প্রো মেম্বারশিপ
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ফ্রি অ্যাক্সেস
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-2.5 p-4 sm:p-5 border-t border-border/60 bg-muted/20">
              <Button
                id="btn-close-preview"
                variant="outline"
                onClick={() => setPreviewTemplate(null)}
                className="h-10 rounded-xl px-4 text-xs font-semibold hover:bg-muted"
              >
                বন্ধ করুন
              </Button>

              <Button
                id="btn-use-template"
                asChild
                className="bg-gradient-brand text-white h-10 rounded-xl px-5 text-xs font-semibold shadow-md shadow-brand-primary/20 hover:opacity-90 gap-1.5"
              >
                <Link href={`/create-poster?templateId=${previewTemplate.id}`}>
                  <Sparkles className="size-4" /> পোস্টার তৈরিতে ব্যবহার করুন
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-card border border-border/80 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Icon & Title */}
            <div className="flex items-start gap-4">
              <div className="size-11 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0">
                <AlertTriangle className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  টেমপ্লেট মুছে ফেলতে চান?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  আপনি কি নিশ্চিতভাবে <span className="font-semibold text-foreground">&ldquo;{deleteCandidate.title}&rdquo;</span> টেমপ্লেটটি মুছে ফেলতে চান?
                </p>
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-3 rounded-2xl bg-destructive/5 border border-destructive/20 text-[11px] text-destructive leading-relaxed">
              ⚠️ টেমপ্লেটটি মুছে ফেললে সাধারণ ব্যবহারকারীরা আর এই ক্যানভাসে নতুন পোস্টার তৈরি করতে পারবেন না।
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button
                id="btn-cancel-delete"
                type="button"
                variant="outline"
                disabled={isDeleting}
                onClick={() => setDeleteCandidate(null)}
                className="h-10 rounded-xl px-4 text-xs font-semibold hover:bg-muted"
              >
                বাতিল করুন
              </Button>

              <Button
                id="btn-confirm-delete"
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={handleDeleteConfirm}
                className="h-10 rounded-xl px-5 text-xs font-semibold gap-1.5 shadow-sm shadow-destructive/20"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> মুছে ফেলা হচ্ছে...
                  </>
                ) : (
                  <>
                    <Trash2 className="size-4" /> হ্যাঁ, মুছে ফেলুন
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}