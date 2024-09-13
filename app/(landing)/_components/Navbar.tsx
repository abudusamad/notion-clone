"use client";

import useScrollTop from "@/app/hooks/use-scroll-top";
import { ModeToggle } from "@/components/media-toggle";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";

import Link from "next/link";
import { Logo } from "./Logo";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const { signOut } = useAuthActions();

  return (
    <div
      className={cn(
        "z-50 bg-background fixed top-0 flex items-center justify-between w-full dark:bg-[#1F1F1F]",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isLoading && !isAuthenticated && (
          <div className={cn("flex justify-between items-center",scrolled && "hidden")}>
            <Button variant="outline">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button onClick={() => void signOut()} variant="ghost">
              Sign Out
            </Button>
          </div>
        )}
      
        <div className="mr-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
