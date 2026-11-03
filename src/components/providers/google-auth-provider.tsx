"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import type { ReactNode } from "react";

interface GoogleAuthProviderProps {
  children: ReactNode;
}

const FALLBACK_CLIENT_ID =
  "1092641471377-7a1uo4i2jc9n8ljigmb90s19vuojv0ja.apps.googleusercontent.com";

export function GoogleAuthProvider({ children }: GoogleAuthProviderProps) {
  const rawClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || FALLBACK_CLIENT_ID;
  const clientId = rawClientId.trim().replace(/^["']|["']$/g, "") || FALLBACK_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}

