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
  return (
    <div className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail Aspect Container */}
      <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden">
        <Image
          src={template.thumbnailUrl}
          alt={template.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-108"
        />

        {/* Top Badges & Bookmark */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
          <div className="pointer-events-auto">
            {template.isPremium ? (
              <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-md backdrop-blur-md flex items-center gap-1 font-bold">
                <Crown className="size-3" />
                <span>প্রিমিয়াম</span>
              </Badge>
            ) : (
              <Badge variant="outline" className="border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shadow-md backdrop-blur-md flex items-center gap-1 font-medium">
                <Sparkles className="size-3" />
                <span>ফ্রি</span>
              </Badge>
            )}
          </div>

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 z-10 pointer-events-none group-hover:pointer-events-auto">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onPreview(template)}
            className="w-full bg-white/90 hover:bg-white text-foreground font-semibold text-xs h-9 rounded-xl shadow-md gap-1.5"
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
      <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between bg-card">
        <div>
          <span className="text-[11px] font-medium text-brand-primary uppercase tracking-wider block">
            {template.categoryLabel}
          </span>
          <h3
            onClick={() => onPreview(template)}
            className="text-sm font-semibold text-foreground line-clamp-1 hover:text-brand-primary cursor-pointer transition-colors"
          >
            {template.title}
          </h3>
        </div>
      </div>
    </div>
  )
}
