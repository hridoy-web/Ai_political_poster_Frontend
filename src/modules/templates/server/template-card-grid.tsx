// Server Component 
import { TemplateService } from "../template.service"
import { TemplateGalleryView } from "../client/template-gallery-view"

export async function TemplateCardGrid() {
  // Fetch initial templates on the server for instant TTFB & SEO
  const templates = await TemplateService.getAllTemplates()
  const categories = await TemplateService.getCategories()

  return (
    <section className="w-full">
      <TemplateGalleryView initialTemplates={templates} categories={categories} />
    </section>
  )
}