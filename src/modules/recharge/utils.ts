import type { PosterBenefits } from "./types";

/**
 * Convert English digits (0-9) to Bengali digits (০-৯)
 */
export const toBengaliNumber = (val: number | string): string => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return String(val).replace(/[0-9]/g, (d) => bnDigits[parseInt(d, 10)]);
};

/**
 * Convert Bengali digits (০-৯) to English digits (0-9) for arithmetic
 */
export const toEnglishNumber = (val: string): string => {
  const bnMap: Record<string, string> = {
    "০": "0",
    "১": "1",
    "২": "2",
    "৩": "3",
    "৪": "4",
    "৫": "5",
    "৬": "6",
    "৭": "7",
    "৮": "8",
    "৯": "9",
  };
  return val.replace(/[০-৯]/g, (char) => bnMap[char] || char);
};

/**
 * Calculate base posters, free bonus posters, and total poster count
 */
export const calculatePosterBenefits = (amount: number): PosterBenefits => {
  if (amount <= 0) return { base: 0, bonus: 0, total: 0 };
  const base = amount;

  if (amount === 50) {
    return { base: 50, bonus: 10, total: 60 };
  }

  if (amount === 100) {
    return { base: 100, bonus: 25, total: 125 };
  }

  if (amount >= 100) {
    const bonus = Math.floor(amount * 0.25);
    return { base, bonus, total: base + bonus };
  }

  if (amount >= 50) {
    const bonus = Math.floor(amount * 0.2);
    return { base, bonus, total: base + bonus };
  }

  return { base, bonus: 0, total: base };
};

/**
 * Generate motivational upsell tips based on current amount
 */
export const getUpsellTip = (amount: number): string | null => {
  if (amount >= 20 && amount < 50) {
    const diff = 50 - amount;
    return `টিপ: আর মাত্র ৳${toBengaliNumber(diff)} যোগ করলেই পাবেন ১০টি ফ্রি বোনাস পোস্টার (মোট ৬০টি) ও প্রিমিয়াম এআই আনলিমিটেড অ্যাক্সেস!`;
  }
  if (amount >= 50 && amount < 100) {
    const diff = 100 - amount;
    return `টিপ: আর মাত্র ৳${toBengaliNumber(diff)} যোগ করলেই পাবেন ২৫টি ফ্রি বোনাস পোস্টার (মোট ১২৫টি)!`;
  }
  return null;
};
