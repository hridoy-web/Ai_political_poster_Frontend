import type React from "react";

export interface PackagePlan {
  id: string;
  nameBangla: string;
  nameEnglish: string;
  amount: number;
  posters: number;
  freePosters: number;
  totalPosters: number;
  tag?: string;
  isPopular?: boolean;
  isBestValue?: boolean;
  features: string[];
  bonusText?: string;
}

export interface PosterBenefits {
  base: number;
  bonus: number;
  total: number;
}

export type PaymentGatewayId = "bkash" | "nagad" | "card";

export interface PaymentGateway {
  id: PaymentGatewayId;
  name: string;
  badge: string;
}

export interface TrustBadgeItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  label: string;
}
