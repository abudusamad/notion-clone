"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ModeToggle } from "@/components/media-toggle";

const Navbar = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div className="z-50 bg-background fixed top-0 flex items-center w-full">
			<Logo />
			<div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
				{isLoading && <Spinner />}
				{!isLoading && !isAuthenticated && (
					<>
						<SignInButton mode="modal">
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</SignInButton>
						<SignInButton mode="modal">
							<Button size="sm" className="mr-2">
								Get Notion free
							</Button>
						</SignInButton>
					</>
				)}
				{!isLoading && isAuthenticated && (
					<>
						<Button>
							<Link href="/documents">Enter Notion</Link>
						</Button>
						<UserButton afterSignOutUrl="/" />
					</>
				)}
				<div className="mr-2">

				<ModeToggle/>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
