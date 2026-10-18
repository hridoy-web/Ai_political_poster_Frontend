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
  method: "bKash" | "Nagad" | "Card";
  trxId: string;
  status: "Successful" | "Failed" | "Pending";
  date: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}