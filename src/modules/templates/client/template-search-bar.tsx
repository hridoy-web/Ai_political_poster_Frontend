"use client"

import * as React from "react"
import { TemplateSort } from "../template.types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Flame, Sparkles, Clock, Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplateSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  currentSort: TemplateSort
  onSortChange: (sort: TemplateSort) => void
  totalCount: number
}

const SORT_OPTIONS: { id: TemplateSort; label: string; icon: React.ReactNode }[] = [
  { id: "trending", label: "ট্রেন্ডিং", icon: <Flame className="size-3.5" /> },
  { id: "popular", label: "জনপ্রিয়", icon: <Sparkles className="size-3.5" /> },
  { id: "latest", label: "নতুন", icon: <Clock className="size-3.5" /> },
  { id: "premium", label: "প্রিমিয়াম", icon: <Crown className="size-3.5" /> },
]

export function TemplateSearchBar({
  searchQuery,
  onSearchChange,
  currentSort,
  onSortChange,
  totalCount,
}: TemplateSearchBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 py-2">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="পোস্টার বা ফ্রেম খুঁজুন (যেমন: নির্বাচন, স্বাধীনতা, ঈদ)..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 pr-9 h-10 w-full rounded-xl bg-card border-border shadow-xs focus-visible:ring-1 focus-visible:ring-brand-primary/50 text-sm"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
            title="সার্চ মুছুন"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between md:justify-end gap-2">

        <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
          {SORT_OPTIONS.map((opt) => {
            const isSelected = currentSort === opt.id
            return (
              <Button
                key={opt.id}
                type="button"
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                onClick={() => onSortChange(opt.id)}
                className={cn(
                  "h-8 px-2.5 text-xs font-medium rounded-lg gap-1.5 transition-all",
                  isSelected
                    ? "bg-card text-foreground shadow-xs border border-border font-semibold text-brand-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                )}
              >
                {opt.icon}
                <span>{opt.label}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
