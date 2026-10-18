import React from "react";
import { isAuthenticated } from "./main-navbar";
import { loginBtnStyle, registerBtnStyle } from "./navbar-actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const DesktopAuthButtons = () => {
  return (
    <div>
     
      {!isAuthenticated && (
        <div className="hidden lg:flex items-center gap-2">
          <Button asChild variant="ghost" className={loginBtnStyle}>
            <Link href="/login">লগইন</Link>
          </Button>

          <Button asChild  className={registerBtnStyle}>
            <Link href="/register">
              <span>রেজিস্ট্রেশন</span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopAuthButtons;
