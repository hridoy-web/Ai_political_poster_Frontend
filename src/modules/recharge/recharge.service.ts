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

const getBaseServerUrl = () => {
  return serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
};

export const initiateRechargePayment = async (
  payload: InitiatePaymentPayload
): Promise<PaymentInitiateResponse> => {
  const baseUrl = getBaseServerUrl();
  const response = await axios.post<PaymentInitiateResponse>(
    `${baseUrl}/api/v1/payments/initiate`,
    payload,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
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
    }>(`${baseUrl}/api/v1/wallets/me`, {
      withCredentials: true,
    });
    return response.data?.data || null;
  } catch (error) {
    console.error("Failed to fetch wallet balance:", error);
    return null;
  }
};
