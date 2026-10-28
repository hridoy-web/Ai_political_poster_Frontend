import axios from "axios";
import { serverURL } from "@/lib/api/authApi";
import { AdminUser } from "./admin.types";

export interface OverviewAnalyticsData {
  todayRevenue: number;
  monthRevenue: number;
  totalRevenue: number;
  totalUsers: number;
  todayUsers: number;
  totalPosters: number;
  todayPosters: number;
  totalTemplates: number;
  dailyRevenue: Array<{ day: string; revenue: number }>;
}

export class AdminService {
  static getBaseUrl() {
    return serverURL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  }

  static async getOverviewAnalytics(): Promise<OverviewAnalyticsData | null> {
    try {
      const res = await axios.get(`${this.getBaseUrl()}/api/v1/admin/analytics/overview`, {
        withCredentials: true,
      });
      if (res.data?.success && res.data.data) {
        return res.data.data;
      }
    } catch (err) {
      console.warn("Failed to fetch admin overview analytics:", err);
    }
    return null;
  }

  static async getUsers(
    page: number = 1,
    limit: number = 20,
    search: string = ""
  ): Promise<{
    users: AdminUser[];
    totalCount: number;
    totalPages: number;
  }> {
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) query.set("search", search.trim());

      const res = await axios.get(
        `${this.getBaseUrl()}/api/v1/admin/users?${query.toString()}`,
        {
          withCredentials: true,
        }
      );

      if (res.data?.success && res.data.data) {
        const items = res.data.data.items || [];
        const meta = res.data.data.meta || {};

        const users: AdminUser[] = items.map((u: any) => {
          let role: "USER" | "ADMIN" = "USER";
          const roleNames = (u.roles || []).map((r: any) =>
            typeof r === "string" ? r : r.name
          );
          if (roleNames.includes("ADMIN") || roleNames.includes("SUPER_ADMIN")) {
            role = "ADMIN";
          }

          let formattedDate = "তারিখ অনুপলব্ধ";
          if (u.createdAt) {
            try {
              formattedDate = new Intl.DateTimeFormat("bn-BD", {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(u.createdAt));
            } catch {
              formattedDate = String(u.createdAt).slice(0, 10);
            }
          }

          return {
            id: u.id,
            name: u.name,
            email: u.email,
            phone: u.phone || "ফোন অনুপলব্ধ",
            balance: 0,
            totalPosters: 0,
            role,
            status: u.status === "ACTIVE" ? "ACTIVE" : "BANNED",
            createdAt: formattedDate,
          };
        });

        return {
          users,
          totalCount: meta.total || users.length,
          totalPages: meta.totalPages || 1,
        };
      }
    } catch (err) {
      console.error("Failed to fetch admin users from backend:", err);
    }

    return { users: [], totalCount: 0, totalPages: 1 };
  }

  static async updateUserStatus(
    userId: string,
    status: "ACTIVE" | "BLOCKED"
  ): Promise<boolean> {
    const res = await axios.patch(
      `${this.getBaseUrl()}/api/v1/admin/users/${userId}/status`,
      { status },
      { withCredentials: true }
    );
    return Boolean(res.data?.success);
  }

  static async updateUserRole(
    userId: string,
    roleName: string
  ): Promise<boolean> {
    const res = await axios.patch(
      `${this.getBaseUrl()}/api/v1/admin/users/${userId}/role`,
      { roleName },
      { withCredentials: true }
    );
    return Boolean(res.data?.success);
  }

  static async getPosters(
    page: number = 1,
    limit: number = 20,
    search: string = ""
  ): Promise<{
    posters: any[];
    totalCount: number;
    totalPages: number;
  }> {
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) query.set("search", search.trim());

      const res = await axios.get(
        `${this.getBaseUrl()}/api/v1/admin/posters?${query.toString()}`,
        { withCredentials: true }
      );

      if (res.data?.success && res.data.data) {
        return {
          posters: res.data.data.items || [],
          totalCount: res.data.data.meta?.total || 0,
          totalPages: res.data.data.meta?.totalPages || 1,
        };
      }
    } catch (err) {
      console.error("Failed to fetch admin posters:", err);
    }
    return { posters: [], totalCount: 0, totalPages: 1 };
  }

  static async getTransactions(
    page: number = 1,
    limit: number = 20,
    search: string = ""
  ): Promise<{
    transactions: any[];
    totalCount: number;
    totalPages: number;
  }> {
    try {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (search.trim()) query.set("search", search.trim());

      const res = await axios.get(
        `${this.getBaseUrl()}/api/v1/admin/transactions?${query.toString()}`,
        { withCredentials: true }
      );

      if (res.data?.success && res.data.data) {
        return {
          transactions: res.data.data.items || [],
          totalCount: res.data.data.meta?.total || 0,
          totalPages: res.data.data.meta?.totalPages || 1,
        };
      }
    } catch (err) {
      console.error("Failed to fetch admin transactions:", err);
    }
    return { transactions: [], totalCount: 0, totalPages: 1 };
  }
}
