import { GeneratorPageContent } from "@/modules/poster-generator/server/generator-page-content";
import { Metadata } from "next";

 

 export const metadata: Metadata ={
title: "পলিটিক্যাল পোস্টার মেকার",
description: "এক ক্লিকে প্রফেশনাল নির্বাচনী ব্যানার ও রাজনৈতিক পোস্টার তৈরি করুন।",
 };

export default async function CreatePosterPage({
  searchParams,
}: {
  searchParams?: Promise<{ templateId?: string }>;
}) {
  const resolvedParams = searchParams ? await searchParams : {};
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-16 py-6 md:py-8 max-w-7xl">
      <GeneratorPageContent initialTemplateId={resolvedParams.templateId} />
    </main>
  );
}