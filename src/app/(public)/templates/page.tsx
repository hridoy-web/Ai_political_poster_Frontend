import { Metadata } from "next"
import { TemplateCardGrid } from "@/modules/templates/server/template-card-grid"

export const metadata: Metadata = {
  title: "টেমপ্লেট গ্যালারি | রাজনৈতিক পোস্টার ফ্রেম ও ডিজাইন কালেকশন",
  description:
    "নির্বাচনী প্রচারণা, জাতীয় দিবস, দলীয় পদের শুভেচ্ছা, শুভ জন্মদিন ও ধর্মীয় উৎসবের জন্য সেরা রাজনৈতিক পোস্টার টেমপ্লেট গ্যালারি। এক ক্লিকে পছন্দ করুন ও কাস্টমাইজ করুন।",
}

export default function TemplatesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 space-y-4">

       <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
  পছন্দের রাজনৈতিক <br className="hidden sm:block" />
  <span className="text-gradient-brand">পোস্টার টেমপ্লেট</span> বেছে নিন
</h1>


        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
          নির্বাচন, জাতীয় দিবস কিংবা দলীয় শুভেচ্ছা—আপনার প্রয়োজনীয় ক্যাটেগরি অনুযায়ী ফ্রেম সিলেক্ট করে সরাসরি আপনার ছবি ও নাম বসিয়ে পোস্টার তৈরি করুন।
        </p>
      </div>

      {/* Server Component for Template Grid & Interactive Client Filtering */}
      <TemplateCardGrid />
    </div>
  )
}