import { Suspense } from "react"
import { Metadata } from "next"
import { TemplateCardGrid } from "@/modules/templates/server/template-card-grid"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "টেমপ্লেট গ্যালারি | রাজনৈতিক পোস্টার ফ্রেম ও ডিজাইন কালেকশন",
  description:
    "নির্বাচনী প্রচারণা, জাতীয় দিবস, দলীয় পদের শুভেচ্ছা, শুভ জন্মদিন ও ধর্মীয় উৎসবের জন্য সেরা রাজনৈতিক পোস্টার টেমপ্লেট গ্যালারি। এক ক্লিকে পছন্দ করুন ও কাস্টমাইজ করুন।",
}

interface TemplatesPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

function TemplateGridSkeleton() {
  return (
    <div className="w-full space-y-6">
      {/* Search and filter controls skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Skeleton className="h-10 w-full sm:w-80 rounded-xl" />
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      {/* Category tabs skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full shrink-0" />
        ))}
      </div>

      {/* Template cards grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border p-3 space-y-3">
            <Skeleton className="aspect-[4/5] w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4 rounded" />
            <div className="flex justify-between items-center pt-1">
              <Skeleton className="h-3 w-1/3 rounded" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Inner async component inside Suspense to consume searchParams without blocking the instant shell
async function TemplateCardGridWrapper({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  if (searchParams) {
    await searchParams
  }

  return <TemplateCardGrid />
}

export default function TemplatesPage(props: TemplatesPageProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 space-y-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.08]">
          পছন্দের রাজনৈতিক
          <span className="block mt-0.5 sm:-mt-0.7">
            <span className="text-gradient-brand">পোস্টার টেমপ্লেট</span> বেছে নিন
          </span>
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          নির্বাচন, জাতীয় দিবস কিংবা দলীয় শুভেচ্ছা—আপনার প্রয়োজনীয় ক্যাটেগরি অনুযায়ী ফ্রেম সিলেক্ট করে সরাসরি আপনার ছবি ও নাম বসিয়ে পোস্টার তৈরি করুন।
        </p>
      </div>

      {/* Streaming SSR: searchParams consumption & grid isolated inside Suspense */}
      <Suspense fallback={<TemplateGridSkeleton />}>
        <TemplateCardGridWrapper searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}
