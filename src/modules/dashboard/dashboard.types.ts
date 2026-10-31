export interface WalletSummary {
  balance: number;
  currency: string;
  totalPosters: number;
  bookmarkedTemplates: number;
}

export interface UserPoster {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  category: string;
}

export interface TransactionHistory {
  id: string;
  amount: number;
  /** Positive = deposit/recharge, Negative = deduction */
  signedAmount: number;
  type: "RECHARGE" | "PACKAGE_PURCHASE" | "OTHER";
  method: "bKash" | "Nagad" | "Card" | "Wallet";
  trxId: string;
  status: "Successful" | "Failed" | "Pending";
  date: string;
  packageName?: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ActiveSubscription {
  id: string;
  packageName: string;
  packageCode: string;
  posterCredits: number;
  bonusCredits: number;
  remainingCredits: number;
  startsAt: string | null;
  endsAt: string | null;
}
