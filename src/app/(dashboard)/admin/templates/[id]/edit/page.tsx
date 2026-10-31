import React from "react";
import { TemplateStudioWorkspace } from "@/modules/template-studio/client/template-studio-workspace";

export const metadata = {
  title: "টেমপ্লেট এডিট স্টুডিও - PosterAI",
  description: "HTML5 Canvas 2D ভিজ্যুয়াল টেমপ্লেট এডিটর ও কাস্টমাইজেশন",
};

interface EditTemplatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const { id } = await params;

  return <TemplateStudioWorkspace editTemplateId={id} />;
}

