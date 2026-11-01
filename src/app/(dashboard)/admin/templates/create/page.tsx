import React from "react";
import { TemplateStudioWorkspace } from "@/modules/template-studio/client/template-studio-workspace";

export const metadata = {
  title: "নতুন টেমপ্লেট ডিজাইন স্টুডিও - PosterAI",
  description: "HTML5 Canvas 2D ড্র্যাগ-এন্ড-ড্রপ ভিজ্যুয়াল টেমপ্লেট বিল্ডার",
};

export default function CreateTemplatePage() {
  return <TemplateStudioWorkspace />;
}
