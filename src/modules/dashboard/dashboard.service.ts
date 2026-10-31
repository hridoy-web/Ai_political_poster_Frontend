import axios from "axios";
import { serverURL } from "@/lib/api/authApi";
import {
  ActiveSubscription,
  Template,
  TransactionHistory,
  UserPoster,
  WalletSummary,
} from "./dashboard.types";

export interface DashboardOverview {
  balance: number;
  credits: number;
  currency: string;
  totalPosters: number;
  bookmarkedTemplates: number;
  activeSubscription: ActiveSubscription | null;
}

export class DashboardService {
  /**
   * Fetches consolidated user dashboard overview statistics from live database.
   * Includes wallet balance, poster count, bookmark count, and active subscription.
   */
  static async getDashboardOverviewStats(): Promise<DashboardOverview> {
    try {
      const [walletRes, postersRes, bookmarksRes] = await Promise.allSettled([
        axios.get(`${serverURL}/api/v1/wallets/me`, { withCredentials: true }),
        axios.get(`${serverURL}/api/v1/posters?limit=1`, { withCredentials: true }),
        axios.get(`${serverURL}/api/v1/bookmarks`, { withCredentials: true }),
      ]);

      const walletData =
        walletRes.status === "fulfilled" && walletRes.value.data?.success
          ? walletRes.value.data.data
          : null;

      const postersCount =
        postersRes.status === "fulfilled" && postersRes.value.data?.success
          ? postersRes.value.data.data?.meta?.total || 0
          : 0;

      const bookmarksCount =
        bookmarksRes.status === "fulfilled" && bookmarksRes.value.data?.success
          ? Array.isArray(bookmarksRes.value.data.data)
            ? bookmarksRes.value.data.data.length
            : 0
          : 0;

      // Parse active subscription from wallet API response
      let activeSubscription: ActiveSubscription | null = null;
      if (walletData?.hasActiveSubscription && walletData.subscription) {
        const sub = walletData.subscription;
        activeSubscription = {
          id: sub.id,
          packageName: sub.packageName,
          packageCode: sub.packageCode,
          posterCredits: sub.posterCredits,
          bonusCredits: sub.bonusCredits,
          remainingCredits: Number(walletData.credits ?? 0),
          startsAt: sub.startsAt,
          endsAt: sub.endsAt,
        };
      }

      return {
        balance: Number(walletData?.moneyBalance ?? 0),
        credits: Number(walletData?.credits ?? 0),
        currency: "BDT",
        totalPosters: postersCount,
        bookmarkedTemplates: bookmarksCount,
        activeSubscription,
      };
    } catch (err) {
      console.warn("Failed to fetch dashboard stats, returning zero state:", err);
      return {
        balance: 0,
        credits: 0,
        currency: "BDT",
        totalPosters: 0,
        bookmarkedTemplates: 0,
        activeSubscription: null,
      };
    }
  }

  /**
   * Fetches real user posters from database via GET /api/v1/posters.
   */
  static async getMyPosters(page: number = 1, limit: number = 20): Promise<UserPoster[]> {
    try {
      const res = await axios.get(
        `${serverURL}/api/v1/posters?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );

      if (res.data?.success && Array.isArray(res.data.data?.items)) {
        return res.data.data.items.map((item: any) => {
          const input = item.inputData || {};
          const candidateName = input.candidateName || input.name;
          const displayTitle = candidateName
            ? `${candidateName} - নির্বাচনী পোস্টার`
            : item.template?.title || "আমার পোস্টার";

          const previewUrl =
            item.outputUrl ||
            item.previewUrl ||
            (item.output && item.output.url) ||
            (item.preview && item.preview.url) ||
            input.photoUrl ||
            "/image/images26.jpg";

          let formattedDate = "তারিখ অনুপলব্ধ";
          if (item.createdAt) {
            try {
              formattedDate = new Intl.DateTimeFormat("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(item.createdAt));
            } catch {
              formattedDate = String(item.createdAt).slice(0, 10);
            }
          }

          return {
            id: item.id,
            title: displayTitle,
            imageUrl: previewUrl,
            createdAt: formattedDate,
            category: item.template?.title || "রাজনৈতিক পোস্টার",
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch user posters from DB:", err);
    }
    return [];
  }

  /**
   * Deletes a poster from the database via DELETE /api/v1/posters/:id.
   */
  static async deletePoster(posterId: string): Promise<boolean> {
    const res = await axios.delete(`${serverURL}/api/v1/posters/${posterId}`, {
      withCredentials: true,
    });
    return Boolean(res.data?.success);
  }

  /**
   * Fetches all templates bookmarked by current user from GET /api/v1/bookmarks.
   */
  static async getMyBookmarks(): Promise<Template[]> {
    try {
      const res = await axios.get(`${serverURL}/api/v1/bookmarks`, {
        withCredentials: true,
      });

      if (res.data?.success && Array.isArray(res.data.data)) {
        return res.data.data.map((item: any) => {
          const tpl = item.template || item || {};
          const cfg = tpl.config || {};
          const preview =
            cfg.previewUrl ||
            cfg.blankTemplateUrl ||
            tpl.thumbnailUrl ||
            "/image/images26.jpg";

          return {
            id: tpl.id || item.templateId,
            title: tpl.title || "সংরক্ষিত পোস্টার ফ্রেম",
            category: tpl.category?.name || "রাজনৈতিক",
            imageUrl: preview,
          };
        });
      }
    } catch (err) {
      console.error("Failed to fetch bookmarks from DB:", err);
    }
    return [];
  }

  /**
   * Toggles bookmark state in database via POST/DELETE /api/v1/bookmarks.
   */
  static async toggleBookmark(templateId: string, currentlyBookmarked: boolean): Promise<boolean> {
    if (currentlyBookmarked) {
      const res = await axios.delete(`${serverURL}/api/v1/bookmarks/${templateId}`, {
        withCredentials: true,
      });
      return Boolean(res.data?.success);
    } else {
      const res = await axios.post(
        `${serverURL}/api/v1/bookmarks`,
        { templateId },
        { withCredentials: true }
      );
      return Boolean(res.data?.success);
    }
  }

  /**
   * Fetches user's transaction history from GET /api/v1/transaction/my-history.
   * Combines gateway payments (recharges) and wallet ledger entries (package purchases).
   */
  static async getMyTransactions(page: number = 1, limit: number = 20): Promise<TransactionHistory[]> {
    try {
      const [txRes, walletRes] = await Promise.allSettled([
        axios.get(
          `${serverURL}/api/v1/transaction/my-history?page=${page}&limit=${limit}`,
          { withCredentials: true }
        ),
        axios.get(`${serverURL}/api/v1/wallets/transactions`, { withCredentials: true }),
      ]);

      const results: TransactionHistory[] = [];

      // Gateway payments (recharges via SSLCommerz)
      if (txRes.status === "fulfilled" && txRes.value.data?.success) {
        const rawPayments = txRes.value.data.data?.payments?.data || [];
        rawPayments.forEach((p: any) => {
          let method: TransactionHistory["method"] = "bKash";
          const ref = (p.providerReference || "").toLowerCase();
          if (ref.includes("nagad")) method = "Nagad";
          else if (ref.includes("card") || ref.includes("visa") || ref.includes("master")) method = "Card";

          let status: "Successful" | "Failed" | "Pending" = "Pending";
          if (p.status === "SUCCEEDED" || p.status === "VALIDATED") status = "Successful";
          else if (p.status === "FAILED" || p.status === "CANCELLED") status = "Failed";

          let formattedDate = "তারিখ অনুপলব্ধ";
          if (p.createdAt) {
            try {
              formattedDate = new Intl.DateTimeFormat("bn-BD", {
                day: "numeric", month: "long", year: "numeric",
              }).format(new Date(p.createdAt));
            } catch {
              formattedDate = String(p.createdAt).slice(0, 10);
            }
          }

          results.push({
            id: p.id,
            amount: Number(p.amount || 0),
            signedAmount: p.packageId ? -Number(p.amount || 0) : Number(p.amount || 0),
            type: p.packageId ? "PACKAGE_PURCHASE" : "RECHARGE",
            method,
            trxId: p.tranId || p.id,
            status,
            date: formattedDate,
            packageName: p.package?.name,
          });
        });
      }

      // Money ledger entries (wallet deductions for package purchases)
      if (walletRes.status === "fulfilled" && walletRes.value.data?.success) {
        const moneyEntries = walletRes.value.data.data?.moneyLedger?.data || [];
        moneyEntries.forEach((entry: any) => {
          // Skip RECHARGE entries — they're already covered by gateway payments above
          if (entry.type === "RECHARGE") return;

          let formattedDate = "তারিখ অনুপলব্ধ";
          if (entry.createdAt) {
            try {
              formattedDate = new Intl.DateTimeFormat("bn-BD", {
                day: "numeric", month: "long", year: "numeric",
              }).format(new Date(entry.createdAt));
            } catch {
              formattedDate = String(entry.createdAt).slice(0, 10);
            }
          }

          results.push({
            id: entry.id,
            amount: Math.abs(Number(entry.amount || 0)),
            signedAmount: Number(entry.amount || 0),
            type: entry.type === "ADJUSTMENT" ? "PACKAGE_PURCHASE" : "OTHER",
            method: "Wallet",
            trxId: entry.idempotencyKey || entry.id,
            status: "Successful",
            date: formattedDate,
          });
        });
      }

      // Sort by most recent first (by id string which includes timestamps)
      return results.sort((a, b) => (b.id > a.id ? 1 : -1));
    } catch (err) {
      console.error("Failed to fetch transaction history from DB:", err);
    }
    return [];
  }
}
