"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
	const { isAuthenticated, isLoading } = useConvexAuth();
	return (
		<div className="max-w-3xl space-y-4 ">
			<h1 className="text-7xl sm:text-5xl md:text-6xl font-bold">
				New year, New Plans.
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-medium">
				Your all-in-one workspace for notes, tasks, wikis, and databases. With
				AI by your side, you and your team can get back to doing your best work.
			</h3>
			{isLoading && (
				<div className="w-full flex items-center justify-center">
					<Spinner size="lg" />
				</div>
			)}
			{isAuthenticated && !isLoading && (
				<Button asChild>
					<Link href="/documents">
						Enter Notion
						<ArrowRight className=" h-4 w-4 ml-2" />
					</Link>
				</Button>
			)}

			{!isAuthenticated && !isLoading && (
				<SignInButton mode="modal">
					<Button>
						Get Notion for free
						<ArrowRight className="h-4 w-4 ml-2" />
					</Button>
				</SignInButton>
			)}
		</div>
	);
};

export default Heading;
