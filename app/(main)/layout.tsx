"use client";

import { SearchCommand } from "@/components/search-command";
import { Spinner } from "@/components/spinner";
import { UpdatePopover } from "@/components/update-popover";
import Layout from "@/config/Layout";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useConvexAuth();

	if (isLoading) {
		<div className="h-full flex items-center justify-center">
			<Spinner size="lg" />
		</div>;
	}

	if (!isAuthenticated) {
		return redirect("/");
	}

	return (
		<Layout>
			<div className="h-full flex  dark:bg-[#1F1F1F]">
				<Navigation />
				<main className="flex-1 h-full overflow-y-auto">
					<UpdatePopover />
					<SearchCommand />
					{children}
				</main>
			</div>
		</Layout>
	);
};

export default MainLayout;
