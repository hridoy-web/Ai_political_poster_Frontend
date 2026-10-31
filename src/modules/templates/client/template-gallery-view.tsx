"use client"

import * as React from "react"
import { CategoryOption, PosterTemplate, TemplateCategory, TemplateSort } from "../template.types"
import { TemplateService } from "../template.service"
import { CategoryTabs } from "./category-tabs"
import { TemplateSearchBar } from "./template-search-bar"
import { TemplateCard } from "./template-card"
import { TemplatePreviewDialog } from "./template-preview-dialog"
import { LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/get-user-data"
import { DashboardService } from "@/modules/dashboard/dashboard.service"
import { toast } from "sonner"

interface TemplateGalleryViewProps {
  initialTemplates: PosterTemplate[]
  categories: CategoryOption[]
}

export function TemplateGalleryView({
  initialTemplates,
  categories,
}: TemplateGalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<TemplateCategory>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentSort, setCurrentSort] = React.useState<TemplateSort>("trending")
  const [previewTemplate, setPreviewTemplate] = React.useState<PosterTemplate | null>(null)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(new Set())
  const { user } = useAuth()

  // Load real user bookmarks from database
  React.useEffect(() => {
    let isMounted = true

    if (user) {
      DashboardService.getMyBookmarks()
        .then((bookmarks) => {
          if (isMounted && Array.isArray(bookmarks)) {
            setBookmarkedIds(new Set(bookmarks.map((b) => b.id)))
          }
        })
        .catch((err) => {
          console.warn("Could not load user bookmarks:", err)
        })
    } else {
      setBookmarkedIds(new Set())
    }

    return () => {
      isMounted = false
    }
  }, [user])

  // Filter & sort templates interactively
  const filteredTemplates = React.useMemo(() => {
    return TemplateService.filterTemplates(initialTemplates, {
      category: selectedCategory,
      search: searchQuery,
      sort: currentSort,
      bookmarkedIds,
    })
  }, [initialTemplates, selectedCategory, searchQuery, currentSort, bookmarkedIds])

  const handleOpenPreview = (tpl: PosterTemplate) => {
    setPreviewTemplate(tpl)
    setDialogOpen(true)
  }

  const handleToggleBookmark = async (id: string) => {
    if (!user) {
      toast.error("বুকমার্ক করতে অনুগ্রহ করে প্রথমে লগইন করুন!")
      return
    }

    const isCurrentlyBookmarked = bookmarkedIds.has(id)

    // Optimistic local state update for instant bookmark toggle
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (isCurrentlyBookmarked) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })

    try {
      const success = await DashboardService.toggleBookmark(id, isCurrentlyBookmarked)
      if (success) {
        toast.success(
          isCurrentlyBookmarked
            ? "বুকমার্ক থেকে সরানো হয়েছে!"
            : "পছন্দের তালিকায় সংরক্ষণ করা হয়েছে!"
        )
      } else {
        throw new Error("Action failed")
      }
    } catch (error) {
      // Revert optimistic update on failure
      setBookmarkedIds((prev) => {
        const next = new Set(prev)
        if (isCurrentlyBookmarked) {
          next.add(id)
        } else {
          next.delete(id)
        }
        return next
      })
      toast.error("বুকমার্ক সংরক্ষণ করতে লগইন করুন বা পুনরায় চেষ্টা করুন।")
    }
  }

  return (
    <div className="space-y-6">
      {/* Search & Sort Bar */}
      <TemplateSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        totalCount={filteredTemplates.length}
      />

      {/* Category Tabs */}
      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Templates Grid or Empty State */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={handleOpenPreview}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={bookmarkedIds.has(template.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-card/50 flex flex-col items-center justify-center space-y-3">
          <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <LayoutGrid className="size-6" />
          </div>
          <h3 className="text-base font-semibold text-foreground">
            {currentSort === "popular"
              ? "পছন্দের কোনো পোস্টার পাওয়া যায়নি"
              : "কোনো টেমপ্লেট খুঁজে পাওয়া যায়নি"}
          </h3>
          <p className="text-xs text-muted-foreground max-w-sm">
            {currentSort === "popular"
              ? "পোস্টারের ওপরের লাভ (হার্ট) আইকনে ক্লিক করে আপনার পছন্দের তালিকা তৈরি করুন।"
              : "আপনার অনুসন্ধান বা ফিল্টারের সাথে মিলে এমন কোনো পোস্টার পাওয়া যায়নি। অনুগ্রহ করে অন্য কি-ওয়ার্ড দিয়ে চেষ্টা করুন।"}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory("all")
              setSearchQuery("")
              setCurrentSort("trending")
            }}
            className="text-xs rounded-xl"
          >
            ফিল্টার রিসেট করুন
          </Button>
        </div>
      )}

      {/* Preview Dialog */}
      <TemplatePreviewDialog
        template={previewTemplate}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onToggleBookmark={handleToggleBookmark}
        isBookmarked={previewTemplate ? bookmarkedIds.has(previewTemplate.id) : false}
      />
    </div>
  )
}
