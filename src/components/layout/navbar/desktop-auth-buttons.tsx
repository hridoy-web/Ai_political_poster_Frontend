
import { registerBtnStyle } from "./navbar-actions";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/get-user-data";
import Link from "next/link";

const DesktopAuthButtons = () => {
  const { loading, user } = useAuth();

  if (loading || user) {
    return null;
  }

  return (
    <div className="hidden lg:flex items-center gap-2 shrink-0">
      <Button asChild className={registerBtnStyle}>
        <Link href="/register">
          <span>রেজিস্ট্রেশন</span>
        </Link>
      </Button>
    </div>
  );
};

export default DesktopAuthButtons;

