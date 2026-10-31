export interface AdminStat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

export type UserRoleType = "SUPER_ADMIN" | "ADMIN" | "TEMPLATE_MANAGER" | "USER";

export interface SystemRole {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
  credits: number;
  totalPosters: number;
  role: UserRoleType;
  roles: string[];
  status: "ACTIVE" | "BLOCKED" | "BANNED" | string;
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

export interface AdminTransaction {
  id: string;
  trxId: string;
  method: "bKash" | "Nagad" | "Card" | string;
  amount: number;
  status: "Successful" | "Failed" | "Pending";
  date: string;
  userName?: string;
  userEmail?: string;
}