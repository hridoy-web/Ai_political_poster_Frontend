import React, { Suspense } from "react";
import { TemplateStudioWorkspace } from "@/modules/template-studio/client/template-studio-workspace";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "টেমপ্লেট এডিট স্টুডিও - PosterAI",
  description: "HTML5 Canvas 2D ভিজ্যুয়াল টেমপ্লেট এডিটর ও কাস্টমাইজেশন",
};

interface EditTemplatePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function EditTemplateContent({ params }: EditTemplatePageProps) {
  const { id } = await params;
  return <TemplateStudioWorkspace editTemplateId={id} />;
}

export default function EditTemplatePage({ params }: EditTemplatePageProps) {
  return (
    <Suspense fallback={<Skeleton className="h-[750px] w-full rounded-2xl" />}>
      <EditTemplateContent params={params} />
    </Suspense>
  );
}
