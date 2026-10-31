import axios from "axios";
import { serverURL } from "@/lib/api/authApi";

export interface InitiatePaymentPayload {
  customAmount?: number;
  packageId?: string;
  paymentMethod?: string;
}

export interface PaymentInitiateResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: {
    GatewayPageURL: string;
    tranId: string;
  };
}

export interface WalletPurchaseResponse {
  success: boolean;
  message: string;
  data: {
    creditsGranted: number;
    newMoneyBalance: number;
    newCreditBalance: number;
  };
}

const getBaseServerUrl = () =>
  serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

/** Initiates an SSLCommerz gateway payment session (for recharge/top-up). */
export const initiateRechargePayment = async (
  payload: InitiatePaymentPayload
): Promise<PaymentInitiateResponse> => {
  const baseUrl = getBaseServerUrl();
  const response = await axios.post<PaymentInitiateResponse>(
    `${baseUrl}/api/v1/payments/initiate`,
    payload,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

/** Purchases a package by deducting its price from the user's existing wallet balance. */
export const purchasePackageFromWallet = async (
  packageId: string
): Promise<WalletPurchaseResponse> => {
  const baseUrl = getBaseServerUrl();
  const response = await axios.post<WalletPurchaseResponse>(
    `${baseUrl}/api/v1/payments/buy-with-wallet`,
    { packageId },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );
  return response.data;
};

export interface WalletBalanceData {
  credits: number;
  moneyBalance: number;
  hasActiveSubscription: boolean;
  subscription?: {
    id: string;
    packageCode: string;
    packageName: string;
    startsAt: string;
    endsAt?: string | null;
    posterCredits: number;
    bonusCredits: number;
    aiCaptionLimit: number;
    aiBackgroundLimit: number;
    premiumAccess: boolean;
  } | null;
  features?: {
    premiumAccess: boolean;
    aiCaptionLimit: number;
    aiBackgroundLimit: number;
  };
}

export const fetchWalletBalance = async (): Promise<WalletBalanceData | null> => {
  try {
    const baseUrl = getBaseServerUrl();
    const response = await axios.get<{
      success: boolean;
      data: WalletBalanceData;
    }>(`${baseUrl}/api/v1/wallets/me`, { withCredentials: true });
    return response.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch wallet balance:", error);
    return null;
  }
};

import type { PackagePlan } from "./types";

export const fetchPackagesFromApi = async (): Promise<PackagePlan[]> => {
  try {
    const baseUrl = getBaseServerUrl();
    const response = await axios.get<{ success: boolean; data: any[] }>(
      `${baseUrl}/api/v1/packages`
    );

    if (response.data?.success && Array.isArray(response.data.data)) {
      return response.data.data.map((pkg: any) => {
        const isCampaign = pkg.code === "campaign" || pkg.posterCredits === 50;
        const isPro = pkg.code === "pro" || pkg.posterCredits === 100;

        return {
          id: pkg.code || pkg.id,
          nameBangla: pkg.name,
          nameEnglish: (pkg.code || "Package").toUpperCase(),
          amount: Number(pkg.price || 0),
          posters: Number(pkg.posterCredits || 0),
          freePosters: Number(pkg.bonusCredits || 0),
          totalPosters:
            Number(pkg.posterCredits || 0) + Number(pkg.bonusCredits || 0),
          tag: isCampaign
            ? "সবচেয়ে জনপ্রিয়"
            : isPro
            ? "সেরা ভ্যালু (২৫% ফ্রি)"
            : "স্টার্টার প্যাক",
          isPopular: isCampaign,
          isBestValue: isPro,
          features: [
            pkg.description || `${pkg.posterCredits}টি পোস্টার তৈরির সুযোগ`,
            "সমস্ত প্রিমিয়াম টেমপ্লেট এবং এআই স্লোগান জেনারেটরের অ্যাক্সেস",
          ],
          bonusText:
            (pkg.bonusCredits || 0) > 0
              ? `${pkg.bonusCredits}টি পোস্টার সম্পূর্ণ ফ্রি!`
              : "কোনো অতিরিক্ত চার্জ ছাড়া ডাউনলোড",
        };
      });
    }
  } catch (error) {
    console.error("Failed to fetch packages from API:", error);
  }
  return [];
};
