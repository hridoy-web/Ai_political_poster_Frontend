export type TemplateCategory = "all" | "election" | "national-day" | "greetings" | "birthday" | "religious"

export type TemplateSort = "trending" | "popular" | "latest" | "premium"

export interface PosterTemplate {
  id: string
  title: string
  description: string
  category: TemplateCategory
  categoryLabel: string
  thumbnailUrl: string
  previewUrl?: string
  isPremium: boolean
  priceCredits?: number
  downloadsCount: number
  likesCount: number
  tags: string[]
  aspectRatio: "4:5" | "1:1" | "16:9"
  createdAt: string
}

export interface CategoryOption {
  id: TemplateCategory
  label: string
  iconName?: string
  count?: number
}
