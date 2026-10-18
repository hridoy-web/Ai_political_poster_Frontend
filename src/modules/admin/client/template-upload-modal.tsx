"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, UploadCloud, X, Code2 } from "lucide-react";

export function TemplateUploadModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    htmlLayout: "",
    imageUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Template HTML & Preview:", formData);
    // ব্যাকএন্ডে টেমপ্লেটের HTML ও প্রিভিউ ইমেজ পাঠানোর API কল
    setIsOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-brand text-white font-semibold rounded-2xl h-10 px-4 shadow-md hover:opacity-90 gap-2 text-xs sm:text-sm"
      >
        <Plus className="w-4 h-4" /> নতুন টেমপ্লেট যোগ করুন
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-card border border-border/80 rounded-3xl p-6 space-y-4 shadow-2xl relative my-8">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Code2 className="w-5 h-5 text-brand-primary" />
                Puppeteer HTML টেমপ্লেট আপলোড
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-muted-foreground hover:bg-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    টেমপ্লেট টাইটেল
                  </label>
                  <Input
                    placeholder="যেমন: ইউনিয়ন পরিষদ নির্বাচন ক্যানভাস"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="rounded-xl h-10 bg-background"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground">
                    ক্যাটাগরি
                  </label>
                  <Input
                    placeholder="যেমন: রাজনৈতিক / ইউনিয়ন পরিষদ"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="rounded-xl h-10 bg-background"
                  />
                </div>
              </div>

              {/* Preview Poster Image Upload / URL */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground">
                  পোস্টার প্রিভিউ ইমেজ (Image URL বা ফাইল)
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/template-preview.jpg"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    required
                    className="rounded-xl h-10 bg-background flex-1"
                  />
                  <Button type="button" variant="outline" className="rounded-xl h-10 gap-1 shrink-0">
                    <UploadCloud className="w-4 h-4 text-brand-primary" /> আপলোড
                  </Button>
                </div>
              </div>

              {/* HTML Layout Code Field for Puppeteer */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground flex items-center justify-between">
                  <span>HTML / CSS লেআউট (Puppeteer-এর জন্য)</span>
                  <span className="text-[10px] text-brand-primary">ডায়নামিক ভ্যারিয়েবল: &#123;&#123;name&#125;&#125;, &#123;&#123;designation&#125;&#125;</span>
                </label>
                <Textarea
                  placeholder="<div class='poster-container'>\n  <img src='{{bgImage}}' />\n  <h1>{{title}}</h1>\n</div>"
                  rows={7}
                  value={formData.htmlLayout}
                  onChange={(e) => setFormData({ ...formData, htmlLayout: e.target.value })}
                  required
                  className="rounded-2xl bg-background font-mono text-xs p-3.5 focus:border-brand-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl h-9 text-xs"
                >
                  বাতিল
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-brand text-white rounded-xl h-9 text-xs font-semibold shadow-md"
                >
                  টেমপ্লেট পাবলিশ করুন
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}