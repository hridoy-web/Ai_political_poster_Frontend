import { UserPosterGrid } from "@/modules/dashboard/server/user-poster-grid";
import { UserPoster } from "@/modules/dashboard/dashboard.types";

export const metadata = {
  title: "মাই পোস্টার্স - PosterAI",
  description: "ইউজারের পূর্বে তৈরি করা সমস্ত পোস্টার গ্যালারি",
};

export default async function MyPostersPage() {
  const mockPosters: UserPoster[] = [
    {
      id: "1",
      title: "নির্বাচনী পোস্টার ২০২৬",
      imageUrl: "https://res.cloudinary.com/sib00hcm/image/upload/v1790447508/generated_posters/hvjgfzxynz2fslv2udxf.png",
      createdAt: "১৫ অক্টোবর, ২০২৬",
      category: "রাজনৈতিক",
    },
    {
      id: "2",
      title: "ছাত্রসংগ্রাম সম্মেলন ব্যানার",
      imageUrl: "https://res.cloudinary.com/sib00hcm/image/upload/v1790447768/generated_posters/tqokvwdpynppvhnqrskp.png",
      createdAt: "১০ অক্টোবর, ২০২৬",
      category: "সম্মেলন",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">মাই পোস্টার্স</h1>
        <p className="text-sm text-muted-foreground">
          আপনার পূর্বে তৈরি করা সমস্ত পোস্টার একনজরে দেখুন, পুনরায় এডিট বা ডাউনলোড করুন।
        </p>
      </div>

      <UserPosterGrid posters={mockPosters} />
    </div>
  );
}