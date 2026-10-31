"use client"

import Link from "next/link"
import Image from "next/image"
import { PosterTemplate } from "../template.types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Eye, Wand2, Crown, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplateCardProps {
  template: PosterTemplate
  onPreview: (template: PosterTemplate) => void
  onToggleBookmark: (id: string) => void
  isBookmarked: boolean
}

export function TemplateCard({
  template,
  onPreview,
  onToggleBookmark,
  isBookmarked,
}: TemplateCardProps) {
  const isPro = template.isPremium;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        isPro
          ? "border-2 border-amber-500/50 bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-card shadow-amber-500/10 hover:border-amber-500 hover:shadow-amber-500/20"
          : "border border-border bg-card"
      )}
    >
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
        <Image
          src={template.thumbnailUrl}
          alt={template.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-109"
        />

        {/* Top Badges & Bookmark */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          {isPro ? (
            <span className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-black bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 rounded-full shadow-md">
              <Crown className="size-3 fill-slate-950" /> প্রো
            </span>
          ) : (
            <span className="pointer-events-auto inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-emerald-600/90 text-white rounded-full shadow-xs backdrop-blur-md">
              ফ্রি
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onToggleBookmark(template.id)
            }}
            className={cn(
              "pointer-events-auto cursor-pointer size-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md shadow-md",
              isBookmarked
                ? "bg-white text-brand-primary"
                : "bg-black/40 text-white hover:bg-white hover:text-brand-primary"
            )}
            title={isBookmarked ? "বুকমার্ক সরানো হয়েছে" : "বুকমার্ক করুন"}
          >
            <Heart
              className={cn(
                "size-4 transition-transform active:scale-125",
                isBookmarked && "fill-brand-primary text-brand-primary"
              )}
            />
          </button>
        </div>

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent backdrop-blur-[0.8px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 gap-2 z-10 pointer-events-none group-hover:pointer-events-auto">

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onPreview(template)}
            className="w-full bg-white/90 hover:bg-white text-zinc-900 font-semibold text-xs h-9 rounded-xl shadow-md gap-1.5 dark:bg-rose-600 dark:hover:bg-rose-700 dark:text-white cursor-pointer"
          >
            <Eye className="size-3.5" />
            <span>প্রিভিউ দেখুন</span>
          </Button>

          <Link
            href={`/create-poster?templateId=${template.id}`}
            className="w-full block"
          >
            <Button
              type="button"
              size="sm"
              className="w-full bg-gradient-brand text-white font-semibold text-xs h-9 rounded-xl shadow-md gap-1.5"
            >
              <Wand2 className="size-3.5" />
              <span>Use Template</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Card Info Footer */}
      <div
        className={cn(
          "p-3.5 flex flex-col gap-1.5 flex-1 justify-between",
          isPro ? "bg-amber-500/5" : "bg-card"
        )}
      >
        <h3
          onClick={() => onPreview(template)}
          className="text-sm font-semibold text-foreground line-clamp-1 hover:text-brand-primary cursor-pointer transition-colors"
        >
          {template.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] font-medium pt-1">
          <span className="text-muted-foreground">{template.categoryLabel}</span>
          {isPro ? (
            <span className="text-amber-700 dark:text-amber-400 font-bold flex items-center gap-1">
              <Sparkles className="size-3 text-amber-500" /> ১ ক্রেডিট
            </span>
          ) : (
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              ফ্রি ফ্রেম
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
