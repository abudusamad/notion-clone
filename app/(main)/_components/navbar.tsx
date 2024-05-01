"use client";

import { MenuIcon } from "lucide-react";
import { Title } from "./title";
import { Menu } from "./menu";
import { useQueries, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Banner } from "./banner";
import { Publish } from "./publish";

interface NavbarProps {
	isCollapsed: boolean;
	onResetWidth: () => void;
}

const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
	const params = useParams();

	const document = useQuery(api.documents.getById, {
		documentId: params.documentId as Id<"documents">,
	})

	if (document === undefined) {
		return (
			<nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
				<div className="flex items-center gap-x-2">
					<Menu.Skeleton/>
				</div>
			</nav>
		)
	}
	if (document === null) {
		return null;
	}
	return (
		<>
			<nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center gap-x-4">
				{isCollapsed && (
					<MenuIcon
						onClick={onResetWidth}
						role="button"
						className="h-6 w-6 text-muted-foreground"
					/>
				)}
				<div className="flex items-center justify-between w-full">
					<Title initialData={document} />
					<div className="flex items-center gap-x-2">
						<Publish initialData={document}/>
						<Menu documentId={document?._id} />
					</div>
				</div>
			</nav>
			{document.isArchived && (
				<Banner documentId={document._id}/>
			)}
		</>
	);
};

export default Navbar;
