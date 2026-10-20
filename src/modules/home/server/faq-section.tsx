import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: "item-1",
    question: "এই ওয়েব অ্যাপটি কাদের জন্য তৈরি?",
    answer:
      "এটি শুধুমাত্র রাজনৈতিক দল এবং দলের অনুমোদিত কর্মীদের নির্বাচনী প্রচারণা, দলীয় সভা-সমাবেশ, প্রতিষ্ঠাবার্ষিকী, বিজয় দিবস, নেতার জন্মদিন, স্মরণসভা ও শোকবার্তার পোস্টার তৈরির জন্য নির্দিষ্ট। সাধারণ শুভেচ্ছা বা অন্যান্য সামাজিক পোস্টার এর অন্তর্ভুক্ত নয়।",
  },
  {
    id: "item-2",
    question: "পোস্টার তৈরির জন্য কী কী তথ্য দিতে হবে?",
    answer:
      "ব্যবহারকারী অনুমোদিত Template বেছে নেওয়ার পর সর্বোচ্চ তিনটি ছবি, নাম, পদবি, দল বা সংগঠনের নাম, এলাকা, শিরোনাম এবং প্রচারের প্রয়োজনীয় তথ্য দেবেন।",
  },
  {
    id: "item-3",
    question: "বাংলা লেখা ও যুক্তবর্ণ কি সঠিকভাবে আসবে?",
    answer:
      "হ্যাঁ, বানান ও যুক্তবর্ণ বিকৃত হওয়ার ঝুঁকি এড়াতে সরাসরি AI দিয়ে ছবির মধ্যে বাংলা লেখা তৈরি করা হয় না। পরিবর্তে, সঠিক বাংলা Font ব্যবহার করে HTML/CSS Template-এর মাধ্যমে লেখা বসিয়ে Puppeteer-এর সাহায্যে PNG তৈরি করা হয়।",
  },
  {
    id: "item-4",
    question:
      "AI কাজ না করলে বা ফ্রি লিমিট শেষ হয়ে গেলে কি পোস্টার বানানো যাবে?",
    answer:
      "হ্যাঁ, প্রথম কোনো AI Provider ব্যর্থ হলে বা এর সীমা শেষ হলে সিস্টেম স্বয়ংক্রিয়ভাবে বিকল্প (Fallback) Provider চেষ্টা করবে। সব AI Provider অনুপলব্ধ হলেও সাধারণ Template ব্যবহার করে পোস্টার তৈরির সুযোগ থাকবে।",
  },
  {
    id: "item-5",
    question: "তৈরি করা পোস্টার কি ডাউনলোড করা যাবে?",
    answer:
      "হ্যাঁ, ব্যবহারকারী সম্পাদনা শেষে পোস্টারের Preview দেখতে পাবেন এবং তা PNG ফরম্যাটে ডাউনলোড করতে পারবেন। পাশাপাশি নিজের তৈরি আগের পোস্টারগুলো History-তেও দেখতে পাবেন।",
  },
  {
    id: "item-6",
    question: "এই সেবা ব্যবহার করতে কি কোনো অ্যাকাউন্ট লাগবে?",
    answer:
      "হ্যাঁ, প্ল্যাটফর্মটি ব্যবহারের জন্য প্রথমে অ্যাকাউন্ট তৈরি করে প্রবেশ করতে হবে, যার মাধ্যমে ব্যবহারকারীর পোস্টার হিস্ট্রি ও অনুমতি সুরক্ষিত থাকে।",
  },
];

export function FaqSection() {
  return (
    <section className="max-w-3xl lg:max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6 lg:px-14">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10 space-y-2">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
          সাধারণ জিজ্ঞাসা (<span className="text-gradient-brand">FAQ</span>)
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
          আপনাদের যেকোনো প্রশ্ন বা উত্তর জানতে নিচে দেখতে পারেন
        </p>
      </div>

      {/* Accordion List */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1"
        className="w-full space-y-3.5"
      >
        {faqData.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={
              "border rounded-2xl px-5 py-0.5 shadow-sm transition-all duration-300 backdrop-blur-md " +
              /* ☀️ LIGHT THEME DESIGN: Glass White Card with Emerald Borders */
              "bg-white/80 border-brand-green/20 hover:border-brand-green/40 data-[state=open]:border-brand-green/60 data-[state=open]:shadow-md " +
              /* 🌙 DARK THEME DESIGN: #0c131d Glass Slate with Mint Glowing Borders */
              "dark:bg-(--card)/80 dark:border-white/10 dark:hover:border-brand-mint/40 dark:data-[state=open]:border-brand-mint/60 dark:data-[state=open]:bg-card/95 dark:data-[state=open]:shadow-[0_0_15px_rgba(16,185,129,0.12)]"
            }
          >
            <AccordionTrigger className="cursor-pointer font-semibold text-foreground hover:text-brand-green dark:hover:text-brand-mint transition-colors py-4 text-left text-sm sm:text-base no-underline hover:no-underline border-none">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-xs sm:text-sm leading-relaxed pb-4 pt-1 border-t border-border/40 mt-1">
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}