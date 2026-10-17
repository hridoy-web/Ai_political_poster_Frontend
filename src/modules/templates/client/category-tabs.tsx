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
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max p-1 rounded-xl bg-muted/60 border border-border">
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
                "rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium gap-2 px-3 py-1.5 h-9",
                isActive
                  ? "bg-gradient-brand text-white shadow-md hover:text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              )}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
              {typeof cat.count === "number" && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-medium transition-colors duration-200",
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
