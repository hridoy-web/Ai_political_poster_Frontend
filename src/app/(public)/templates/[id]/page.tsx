import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { TemplateService } from "@/modules/templates/template.service"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wand2, ArrowLeft, Crown, CheckCircle2 } from "lucide-react"

interface TemplateDetailsPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: TemplateDetailsPageProps): Promise<Metadata> {
  const { id } = await params
  const template = await TemplateService.getTemplateById(id)

  if (!template) {
    return {
      title: "টেমপ্লেট পাওয়া যায়নি | রাজনৈতিক পোস্টার মেকার",
    }
  }

  return {
    title: `${template.title} | রাজনৈতিক পোস্টার ফ্রেম`
  }
}

export default async function TemplateDetailsPage({
  params,
}: TemplateDetailsPageProps) {
  const { id } = await params
  const template = await TemplateService.getTemplateById(id)

  if (!template) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-5xl">
      {/* Back button */}
      <Link
        href="/templates"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="size-4" />
        <span>সকল টেমপ্লেটে ফিরে যান</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start bg-card p-6 md:p-8 rounded-3xl border border-border shadow-sm">
        {/* Poster Preview */}
        <div className="relative aspect-4/5 w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl border border-border bg-muted">
          <Image
            src={template.thumbnailUrl}
            alt={template.title}
            fill
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Info & Customization */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {template.categoryLabel}
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              {template.title}
            </h1>
            
          </div>

          <div className="space-y-3 pt-4">
            <Link
              href={`/create-poster?templateId=${template.id}`}
              className="w-full block"
            >
              <Button
                size="lg"
                className="w-full h-12 bg-gradient-brand text-white font-semibold text-base rounded-xl gap-2 shadow-lg"
              >
                <Wand2 className="size-5" />
                <span>এই টেমপ্লেট দিয়ে পোস্টার বানান</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}