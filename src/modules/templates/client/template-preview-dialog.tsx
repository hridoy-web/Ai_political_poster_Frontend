"use client"

import Link from "next/link"
import Image from "next/image"
import { PosterTemplate } from "../template.types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wand2, Heart, Crown, CheckCircle2 } from "lucide-react"

interface TemplatePreviewDialogProps {
  template: PosterTemplate | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onToggleBookmark?: (id: string) => void
  isBookmarked?: boolean
}

export function TemplatePreviewDialog({
  template,
  open,
  onOpenChange,
  onToggleBookmark,
  isBookmarked = false,
}: TemplatePreviewDialogProps) {
  if (!template) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-3xl overflow-hidden p-0 gap-0 border-border bg-card">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Big Poster Preview */}
          <div className="relative bg-muted/80 flex items-center justify-center p-6 min-h-[300px] md:min-h-[460px] overflow-hidden">
            <div className="relative w-full aspect-[4/5] max-w-[280px] rounded-xl overflow-hidden shadow-2xl border border-border/50 group">
              <Image
                src={template.thumbnailUrl}
                alt={template.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Badge overlay */}
              <div className="absolute top-3 left-3 flex gap-2">
                {template.isPremium ? (
                  <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-md flex items-center gap-1 font-bold">
                    <Crown className="size-3" />
                    <span>প্রিমিয়াম</span>
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-md flex items-center gap-1 font-medium">
                    <CheckCircle2 className="size-3" />
                    <span>ফ্রি টেমপ্লেট</span>
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Right: Details & Action */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <DialogHeader className="text-left space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {template.categoryLabel}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => onToggleBookmark?.(template.id)}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-brand-primary"
                    title={isBookmarked ? "বুকমার্ক সরানো হয়েছে" : "বুকমার্ক করুন"}
                  >
                    <Heart
                      className={`size-5 transition-transform active:scale-125 ${
                        isBookmarked
                          ? "fill-brand-primary text-brand-primary"
                          : ""
                      }`}
                    />
                  </button>
                </div>

                <DialogTitle className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  {template.title}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground pt-1 leading-relaxed">
                  {template.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/create-poster?templateId=${template.id}`}
                className="w-full block"
              >
                <Button
                  className="w-full h-11 bg-gradient-brand text-white font-semibold text-sm rounded-xl gap-2 shadow-lg hover:shadow-brand-primary/20"
                >
                  <Wand2 className="size-4" />
                  <span>Customize Poster (পোস্টার বানান)</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="w-full text-xs text-muted-foreground h-9"
                onClick={() => onOpenChange(false)}
              >
                বন্ধ করুন
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
