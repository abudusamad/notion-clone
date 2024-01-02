"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { Logo } from "./Logo";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
							<Button  size="sm" className="mr-2">
								Get Notion  free
							</Button>
						</SignInButton>
					</>
                )}
                {!isLoading && isAuthenticated && (
                    <>
                        <Button>
                            <Link href="/documents">
                                Enter Notion
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        
                         />
                    </>
                )
                }
			</div>
		</div>
	);
};

export default Navbar;
