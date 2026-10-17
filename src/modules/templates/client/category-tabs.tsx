"use client"

import { CategoryOption, TemplateCategory } from "../template.types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Vote,
  Flag,
  Award,
  Cake,
  Sparkles,
  LayoutGrid,
} from "lucide-react"

interface CategoryTabsProps {
  categories: CategoryOption[]
  selectedCategory: TemplateCategory
  onSelectCategory: (category: TemplateCategory) => void
}

const getCategoryIcon = (id: TemplateCategory) => {
  switch (id) {
    case "election":
      return <Vote className="size-4" />
    case "national-day":
      return <Flag className="size-4" />
    case "greetings":
      return <Award className="size-4" />
    case "birthday":
      return <Cake className="size-4" />
    case "religious":
      return <Sparkles className="size-4" />
    case "all":
    default:
      return <LayoutGrid className="size-4" />
  }
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-muted/60 border border-border">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <Button
              key={cat.id}
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium gap-2 px-3.5 py-1.5 h-9 cursor-pointer select-none",
                isActive
                  ? "bg-gradient-brand text-white shadow-md hover:text-white"
                  : "text-muted-foreground hover:text-brand-primary hover:bg-brand-primary/10"
              )}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
              {typeof cat.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium transition-colors duration-200 leading-none",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {cat.count}
                </span>
              )}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
