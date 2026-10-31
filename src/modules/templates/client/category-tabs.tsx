"use client"

import { CategoryOption, TemplateCategory } from "../template.types"
import { cn } from "@/lib/utils"

interface CategoryTabsProps {
  categories: CategoryOption[]
  selectedCategory: TemplateCategory
  onSelectCategory: (category: TemplateCategory) => void
}

export function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  // Filter out any redundant 'all' category so it displays the exact pill categories from design
  const visibleCategories = categories.filter((c) => c.id !== "all")

  return (
    <div className="w-full flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2.5 sm:gap-3.5 flex-nowrap sm:flex-wrap px-1">
        {visibleCategories.map((cat) => {
          const isActive = selectedCategory === cat.id
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                // Toggling the active category resets to show all
                if (isActive) {
                  onSelectCategory("all")
                } else {
                  onSelectCategory(cat.id)
                }
              }}
              className={cn(
                "rounded-full transition-all duration-200 text-sm sm:text-base font-semibold px-5 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap cursor-pointer select-none",
                isActive
                  ? "bg-[#e11d48] text-white shadow-md shadow-rose-500/25 border border-transparent scale-[1.02]"
                  : "bg-white dark:bg-card text-slate-700 dark:text-slate-200 border border-slate-200/90 dark:border-border hover:bg-rose-50/80 hover:text-[#e11d48] hover:border-rose-200 dark:hover:bg-rose-950/40 dark:hover:border-rose-900/60 shadow-xs"
              )}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
