import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import bgFlag from "../../../../public/bgFlag.png";
import { Card } from "@/components/ui/card";
import LoginForm from "@/modules/auth/client/login-form";
import { Logo } from "@/components/brand/logo";

export const metadata: Metadata = {
  title: "Login | Poster Maker",
  description: "Log in to continue creating and sharing your posters.",
};

export default function LoginPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-y-auto bg-background text-foreground">
      {/* BACKGROUND: Bangladesh flag (blurred) + dark overlay */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <Image
          src={bgFlag}
          alt=""
          fill
          priority
          unoptimized
          className="scale-110 object-cover blur-md"
        />
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/65 to-emerald-950/85" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute -left-16 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      </div>

      {/* CENTERED FORM */}
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
        <Card className="w-full max-w-md gap-0 rounded-2xl border border-white/20 bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-7">
          <Link href="/" className="mb-5 flex w-fit items-center gap-2.5">
           <Logo/>
          </Link>

          <LoginForm />
        </Card>
      </div>
    </main>
  );
}