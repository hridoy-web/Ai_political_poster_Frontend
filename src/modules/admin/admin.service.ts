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
          const roleNames: string[] = (u.roles || []).map((r: any) =>
            typeof r === "string" ? r : r.name
          );

          let primaryRole: any = "USER";
          if (roleNames.includes("SUPER_ADMIN")) {
            primaryRole = "SUPER_ADMIN";
          } else if (roleNames.includes("ADMIN")) {
            primaryRole = "ADMIN";
          } else if (roleNames.includes("TEMPLATE_MANAGER")) {
            primaryRole = "TEMPLATE_MANAGER";
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
            balance: Number(u.balance || 0),
            credits: Number(u.credits || 0),
            totalPosters: Number(u.totalPosters || 0),
            role: primaryRole,
            roles: roleNames,
            status: u.status === "ACTIVE" ? "ACTIVE" : u.status || "BLOCKED",
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

  static async getRoles(): Promise<any[]> {
    try {
      const res = await axios.get(`${this.getBaseUrl()}/api/v1/admin/roles`, {
        withCredentials: true,
      });
      if (res.data?.success && Array.isArray(res.data.data)) {
        return res.data.data;
      }
    } catch (err) {
      console.warn("Failed to fetch system roles:", err);
    }
    return [
      { id: "1", name: "SUPER_ADMIN", description: "সকল সিস্টেম পারমিশন নিয়ন্ত্রণ", isSystem: true },
      { id: "2", name: "ADMIN", description: "ইউজার, ক্যাটাগরি ও টেমপ্লেট পরিচালনা", isSystem: true },
      { id: "3", name: "TEMPLATE_MANAGER", description: "ক্যানভাস টেমপ্লেট ডিজাইন ও পাবলিশ", isSystem: true },
      { id: "4", name: "USER", description: "সাধারণ ব্যবহারকারী সুবিধা", isSystem: true },
    ];
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

  static async deletePoster(posterId: string): Promise<boolean> {
    try {
      const res = await axios.delete(
        `${this.getBaseUrl()}/api/v1/admin/posters/${posterId}`,
        { withCredentials: true }
      );
      return Boolean(res.data?.success);
    } catch (err) {
      console.error("Failed to delete poster:", err);
      return false;
    }
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
