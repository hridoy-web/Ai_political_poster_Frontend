export interface AdminStat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  totalPosters: number;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
}

export interface AdminTemplate {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  isPremium: boolean;
  isActive: boolean;
  aspectRatio?: string;
  width?: number;
  height?: number;
  description?: string;
  photoSlotsCount?: number;
  textSlotsCount?: number;
  createdAt?: string;
}

export interface AdminPoster {
  id: string;
  title: string;
  userName: string;
  userEmail: string;
  imageUrl: string;
  createdAt: string;
  category: string;
}