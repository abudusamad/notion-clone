"use client";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const fonts = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Heading = () => {
  const date = new Date();

  return (
    <div className="max-w-3xl space-y-4 mt-3 md:text-left">
      <h1 className="text-6xl sm:text-xl md:text-3xl font-switzerSemibold">
        Notion Extended is a{" "}
        <span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-red-500 animate-text">
          realtime collaborative
        </span>
        &nbsp; workspace
      </h1>
      <h3 className="text-4xl sm:text-xl md:text-3xl font-switzerMedium ">
        Notion Extended is my submission for <br />
        <a
          href="https://stack.convex.dev/build-bounty-jotion/"
          target="_blank"
          className="hover:cursor-pointer bg-gradient-to-r bg-clip-text text-transparent from-blue-100 via-purple-500 to-red-900 animate-text"
        >
          Convex Build Bounty {date.getFullYear()}
        </a>
      </h3>
      <h3 className="text-3xl sm:text-xl md:text-2xl font-switzerMedium">
        Notion Extended is made possible by <br />
        <span className="bg-gradient-to-r bg-clip-text text-transparent from-yellow-500 via-purple-500 to-red-500 animate-text">
          Convex
        </span>{" "}
        and more
      </h3>
      <AuthLoading>
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      </AuthLoading>

      <Authenticated>
        <Button
          asChild
          variant="default"
          className="bg-inherit border-indigo-500 rounded-md"
        >
          <Link href="/documents">
            Go to Documents
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </Authenticated>

      <Unauthenticated>
        <Button
          asChild
          variant="default"
          className={cn("rounded-xl text-lg p-6", fonts.className)}
        >
          <Link href="/signin">Get Notion free</Link>
        </Button>
      </Unauthenticated>
    </div>
  );
};
