import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import bgFlag from "../../../../public/bgFlag.png";

import { Card } from "@/components/ui/card";
import { Logo } from "@/components/brand/logo";
import RegisterForm from "../_component/registerForm";



export const metadata: Metadata = {
  title: "Create your account | Poster Maker",
  description: "Join to start creating and sharing your posters.",
};

export default function RegisterPage() {
  return (
    <main className="relative isolate min-h-dvh overflow-y-auto bg-background text-foreground">
      {/* BACKGROUND: Bangladesh flag  */}
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
      </div>

      {/* CENTERED FORM */}
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
        <Card className="w-full max-w-md gap-0 rounded-2xl border border-white/20 bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-8">
          <Link href="/" className="mb-4 mr-auto flex w-fit items-start gap-2.5">
            <Logo />
          </Link>

          <RegisterForm/>
        </Card>
      </div>
    </main>
  );
}

// import type { Metadata } from "next";
// import RegisterForm from "../_component/registerForm";

// export const metadata: Metadata = {
//   title: "Create Account | Poster Maker",
//   description: "Join to start creating and sharing your posters.",
// };

// export default function RegisterPage() {
//   return (
//     <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
//       <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow-lg">
//         <div className="space-y-2 text-center">
//           <h1 className="text-3xl font-bold">Create Account</h1>
//           <p className="text-muted-foreground">
//             Join to start creating and sharing your posters.
//           </p>
//         </div>

//         <RegisterForm />
//       </div>
//     </div>
//   );
// }