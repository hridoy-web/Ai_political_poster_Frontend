import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import bgFlag from "../../../../public/bgFlag.png";
import { Card } from "@/components/ui/card";
// import LoginForm from "@/modules/auth/client/login/login-form";
import { Logo } from "@/components/brand/logo";
import LoginForm from "../_component/loginForm";



// import LoginForm from "../_component/loginForm";

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
      </div>

      {/* CENTERED FORM */}
      <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
        <Card className="w-full max-w-md gap-0 rounded-2xl border border-white/20 bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-7">
          <Link href="/" className="mb-5 flex w-fit items-center gap-2.5">
           <Logo/>
          </Link>

          <LoginForm/>
        </Card>
      </div>
    </main>
  );
}


// import type { Metadata } from "next";
// import Image from "next/image";
// import Link from "next/link";

// import bgFlag from "../../../../public/bgFlag.png";
// import { Card } from "@/components/ui/card";
// import { Logo } from "@/components/brand/logo";
// import LoginForm from "../_component/loginForm";

// export const metadata: Metadata = {
//   title: "Login | Poster Maker",
//   description: "Log in to continue creating and sharing your posters.",
// };

// export default function LoginPage() {
//   return (
//     <div className="relative isolate min-h-dvh overflow-y-auto bg-background text-foreground">
//       {/* Background: blurred flag + dark overlay */}
//       <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
//         <Image
//           src={bgFlag}
//           alt=""
//           fill
//           priority
//           unoptimized
//           className="scale-110 object-cover blur-md"
//         />
//         <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/65 to-emerald-950/85" />
//       </div>

//       {/* Centered form */}
//       <div className="flex min-h-dvh items-center justify-center p-3 sm:p-6">
//         <Card className="w-full max-w-md gap-0 rounded-2xl border border-white/20 bg-card/80 p-5 shadow-2xl backdrop-blur-xl sm:rounded-3xl sm:p-7">
//           <Link href="/" className="mb-5 flex w-fit items-center gap-2.5">
//             <Logo />
//           </Link>

//           <div className="mb-5 space-y-1">
//             <h1 className="text-2xl font-bold sm:text-3xl">Welcome back</h1>
//             <p className="text-sm text-muted-foreground">
//               Log in to continue creating and sharing your posters.
//             </p>
//           </div>

//           <LoginForm />
//         </Card>
//       </div>
//     </div>
//   );
// }