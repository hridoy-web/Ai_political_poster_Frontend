export type TemplateCategory =
  | "all"
  | "election"
  | "gathering"
  | "birthday"
  | "victory-day"
  | "independence-day"
  | "mourning"
  | (string & {});

export type TemplateSort = "trending" | "popular" | "latest" | "premium"

export interface PosterTemplate {
  id: string
  title: string
  category: TemplateCategory
  categoryLabel: string
  thumbnailUrl: string
  previewUrl?: string
  isPremium: boolean
  tags: string[]
  createdAt: string
  width?: number
  height?: number
  aspectRatio?: string
  previewAssetId?: string | null
  config?: any
}

export interface CategoryOption {
  id: TemplateCategory
  label: string
  iconName?: string
  count?: number
}
