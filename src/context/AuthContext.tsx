"use client";

import { createContext, useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import authApi, { serverURL } from "@/lib/api/authApi";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios({
          url: `${serverURL}${authApi.getCurrentUser.url}`,
          method: authApi.getCurrentUser.method,
          withCredentials: true,
        });
        console.log(response.data);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, []);

  const info = {
    user,
    setUser,
    loading,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
}
