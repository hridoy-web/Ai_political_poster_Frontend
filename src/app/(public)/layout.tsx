import { MainFooter } from "@/components/layout/footer/main-footer";
import { MainNavbar } from "@/components/layout/navbar/main-navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col font-sans">
      <MainNavbar />
      <main className="grow flex flex-col">
        {children}
      </main>
      <MainFooter />
    </div>
  );
}
