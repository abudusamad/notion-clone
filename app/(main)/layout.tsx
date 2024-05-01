"use client";

import { AvatarCard } from "@/components/avatar-card";
import { SearchCommand } from "@/components/search-command";
import { Spinner } from "@/components/spinner";
import { UpdatePopover } from "@/components/update-popover";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Navigation } from "./_components/navigation";
import { getSpaceNameFromUrl } from "../utils/helpers";

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

	const spaceName = getSpaceNameFromUrl();
	console.log(spaceName);


	return (
		<>
			<AvatarCard nameOfSpace={ spaceName??"documents"} />
			<div className="h-full flex  dark:bg-[#1F1F1F]">
				<Navigation />
				<main className="flex-1 h-full overflow-y-auto">
					<UpdatePopover />
					<SearchCommand />
					{children}
				</main>
			</div>
		</>
	);
};

export default MainLayout;
