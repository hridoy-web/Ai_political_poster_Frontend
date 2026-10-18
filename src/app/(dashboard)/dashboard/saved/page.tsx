import { BookmarkedTemplatesGrid } from "@/modules/dashboard/server/bookmarked-templates-grid";
import { Template } from "@/modules/dashboard/dashboard.types";

export const metadata = {
  title: "বুকমার্কস - PosterAI",
  description: "সংরক্ষিত কাস্টম টেমপ্লেট গ্যালারি",
};

export default async function SavedTemplatesPage() {
  const mockSavedTemplates: Template[] = [
    {
      id: "tpl-1",
      title: "চেয়ারম্যান পদপ্রার্থী ক্যানভাস ফ্রেম",
      category: "ইউনিয়ন পরিষদ",
      imageUrl: "https://res.cloudinary.com/sib00hcm/image/upload/v1790447768/generated_posters/tqokvwdpynppvhnqrskp.png",
    },
    {
      id: "tpl-2",
      title: "সম্মেলন ও শুভেচ্ছা বার্তা ফ্রেম",
      category: "রাজনৈতিক",
      imageUrl: "https://res.cloudinary.com/sib00hcm/image/upload/v1790447508/generated_posters/hvjgfzxynz2fslv2udxf.png",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">সংরক্ষিত টেমপ্লেট</h1>
        <p className="text-sm text-muted-foreground">
          আপনার সংরক্ষিত টেমপ্লেটগুলো থেকে এক ক্লিকে নতুন পোস্টার তৈরি শুরু করুন।
        </p>
      </div>

      <BookmarkedTemplatesGrid templates={mockSavedTemplates} />
    </div>
  );
}