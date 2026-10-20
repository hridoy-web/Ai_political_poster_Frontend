"use client";

import { useContext, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { AuthContext } from "@/context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const context = useContext(AuthContext);
  console.log(context)
  const router = useRouter();

  useEffect(() => {
    if (context && !context.loading && !context.user) {
      router.replace("/login");
    }
  }, [context, router]);

  if (!context || context.loading || !context.user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  return <>{children}</>;
}
