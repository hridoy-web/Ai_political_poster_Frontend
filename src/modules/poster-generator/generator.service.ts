import { CandidateInfo, SloganTopicOption } from "./generator.types";

export const SLOGAN_TOPICS: SloganTopicOption[] =[
  { id: "youth", label: "তারুণ্য", icon: "zap" },
  { id: "development", label: "উন্নয়ন", icon: "building" },
  { id: "governance", label: "সুশাসন", icon: "scale" },
  { id: "education", label: "শিক্ষা", icon: "graduation-cap" },
];

export const SLOGAN_KNOWLEDGE_BASE: Record<string, string[]> = {
  youth: [
    "তারুণ্যের শক্তি, সমৃদ্ধির ভবিষ্যৎ — গড়ে তুলবো আধুনিক সমাজ",
    "তরুণ প্রজন্মের অঙ্গীকার, মেধা ও কর্মসংস্থানমুখী দেশ গড়ার",
    "তারুণ্যের জয়গান, সততা ও সাহসে এগিয়ে যাবে প্রিয় বাংলাদেশ",
  ],
  development: [
    "উন্নয়নের ধারাবাহিকতায়, জনগণের পাশে সবসময়",
    "কথায় নয় কাজে বিশ্বাসী — এলাকার সার্বিক উন্নয়নে নিবেদিতপ্রাণ",
    "টেকসই অবকাঠামো ও সমৃদ্ধ জনপদ বিনির্মাণে ঐক্যবদ্ধ জনতা",
  ],
  governance: [
    "জনগণের সেবায় নিবেদিতপ্রাণ, দুর্নীতির বিরুদ্ধে আপোষহীন কণ্ঠস্বর",
    "গণতন্ত্র ও ন্যায়বিচারের পথে, নির্ভীক ও জনবান্ধব নেতৃত্ব",
    "স্বচ্ছতা ও ইনসাফ প্রতিষ্ঠায় — গড়ে তুলবো জনতার মডেল এলাকা",
  ],
  education: [
    "মানসম্মত আধুনিক শিক্ষা ও নাগরিক স্বাস্থ্যসেবা সবার অধিকার",
    "জ্ঞানের আলোয় আলোকিত সমাজ — মেধাভিত্তিক নতুন প্রজন্ম",
    "সুশিক্ষা ও মানবিক সমাজ গঠনে আপোষহীন অঙ্গীকার",
  ],
};
export const DEFAULT_CANDIDATE_INFO: CandidateInfo = {
  name: "জনাব মোঃ আরিফুল ইসলাম",
  designation: "সাধারণ সম্পাদক পদপ্রার্থী",
  area: "ঢাকা-১০ সংসদীয় আসন",
  bannerTitle: "গণতন্ত্র ও জনগণের অধিকার আদায়ে",
  slogan: "তারুণ্যের শক্তি, সমৃদ্ধির ভবিষ্যৎ — গড়ে তুলবো আধুনিক সমাজ",
  courtesy: "এলাকাবাসী ও দলীয় সর্বস্তরের কর্মী-সমর্থক",
};
export class PosterGeneratorService{
    static getSlogansByTopic(topic:string): string[] {
        const clean =(topic || "").trim().toLocaleLowerCase(); 
    
    if (clean.includes("তারুণ্য") ||  clean.includes("কর্মসংস্থান") || clean.includes("তরুণ")){
       return SLOGAN_KNOWLEDGE_BASE.youth;
    }
    else if (clean.includes("উন্নয়ন") || clean.includes("অবকাঠামো") || clean.includes("কাজ")) {
      return SLOGAN_KNOWLEDGE_BASE.development;
    }
    else if (clean.includes("সুশাসন") || clean.includes("দুর্নীতি") || clean.includes("অধিকার") || clean.includes("গণতন্ত্র")) {
      return SLOGAN_KNOWLEDGE_BASE.governance;
    }
    else if (clean.includes("শিক্ষা") || clean.includes("স্বাস্থ্য") || clean.includes("মেধা")) {
      return SLOGAN_KNOWLEDGE_BASE.education;
    }
     return [
      `${topic} বাস্তবায়নে ঐক্যবদ্ধ জনতা — গড়বো আগামীর নতুন দিগন্ত`,
      `${topic} ও নাগরিক অধিকার প্রতিষ্ঠায় — নির্ভীক ও আপোষহীন নেতৃত্ব`,
      `জনগণের প্রত্যাশায় ${topic} — পরিবর্তনের প্রত্যয়ে এগিয়ে চলুন`,
    ];
} 

static getThemeGradientClass(theme: string): string {
    switch (theme) {
      case "crimson":
        return "bg-gradient-to-br from-[#881337] via-[#6b0f2b] to-[#4c0519] border-rose-500/30";
      case "navy":
        return "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1d] border-blue-500/30";
      case "charcoal":
        return "bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b] border-zinc-600/30";
      case "emerald":
      default:
        return "bg-gradient-to-br from-[#063923] via-[#052d1c] to-[#031d12] border-emerald-500/30";
    }
  }}