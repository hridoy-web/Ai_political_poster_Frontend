import { Suspense } from "react";
import { GeneratorPageContent } from "@/modules/poster-generator/server/generator-page-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "পলিটিক্যাল পোস্টার মেকার",
  description: "এক ক্লিকে প্রফেশনাল নির্বাচনী ব্যানার ও রাজনৈতিক পোস্টার তৈরি করুন।",
};

interface CreatePosterPageProps {
  searchParams?: Promise<{ templateId?: string }>;
}

async function GeneratorPageContentWrapper({
  searchParams,
}: {
  searchParams?: Promise<{ templateId?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  return <GeneratorPageContent initialTemplateId={resolvedParams.templateId} />;
}

export default function CreatePosterPage({ searchParams }: CreatePosterPageProps) {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-16 py-6 md:py-8 max-w-7xl">
      <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-2xl" />}>
        <GeneratorPageContentWrapper searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
