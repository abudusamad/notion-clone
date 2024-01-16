"use client";

import { useSearch } from "@/app/hooks/use-search";
import { useSetting } from "@/app/hooks/use-setting";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import {
	ChevronLeft,
	Clock8,
	MenuIcon,
	Plus,
	PlusCircle,
	Search,
	Settings,
	Trash,
} from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { DocumentList } from "./document-list";
import { Item } from "./item";
import Navbar from "./navbar";
import { UserItem } from "./user-item";
import { useUpdate } from "@/app/hooks/use-update";

const Navigation = () => {
	const isMobile = useMediaQuery("(max-width: 768px)");
	const pathname = usePathname();
	const params = useParams();
	const router = useRouter();
	const create = useMutation(api.documents.create);
	const search = useSearch();
	const settings = useSetting();
	const update = useUpdate();

	const isResizingRef = useRef(false);
	const sidebarRef = useRef<ElementRef<"aside">>(null);
	const navbarRef = useRef<ElementRef<"div">>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(isMobile);

	useEffect(() => {
		if (isMobile) {
			collapse();
		} else {
			resetWidth();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			collapse();
		}
	}, [pathname, isMobile]);

	const handleMouseDown = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		event.preventDefault();
		event.stopPropagation();

		isResizingRef.current = true;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent) => {
		if (!isResizingRef.current) return;
		let newWidth = event.clientX;
		if (newWidth < 240) newWidth = 240;
		if (newWidth > 480) newWidth = 480;

		if (sidebarRef.current && navbarRef.current) {
			sidebarRef.current.style.width = `${newWidth}px`;
			navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
		}
	};

	const handleMouseUp = (event: MouseEvent) => {
		isResizingRef.current = false;
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	};

	const resetWidth = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(false);
			setIsResetting(true);

			sidebarRef.current.style.width = isMobile ? "100%" : "240px";
			navbarRef.current.style.setProperty(
				"width",
				isMobile ? "0" : "calc(100% - 240px)"
			);
			navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const collapse = () => {
		if (sidebarRef.current && navbarRef.current) {
			setIsCollapsed(true);
			setIsResetting(true);

			sidebarRef.current.style.width = "0";
			navbarRef.current.style.setProperty("width", "100%");
			navbarRef.current.style.setProperty("left", "0");
			setTimeout(() => setIsResetting(false), 300);
		}
	};

	const handleCreate = () => {
		const promise = create({ title: "Untilted" }).then((documentId) =>
			router.push(`/documents/${documentId}`)
		);

		toast.promise(promise, {
			loading: "Creating document...",
			success: "Document created!",
			error: "Error creating document",
		});
	};

	return (
		<>
			<aside
				ref={sidebarRef}
				className={cn(
					"group/sidebar h-full bg-[#f2f2f2] dark:bg-[#090909] overflow-y-auto relative flex w-60 flex-col z-[99999]",
					isResetting && "transition-all ease-in-out duration-300",
					isMobile && "w-0"
				)}
			>
				<div
					role="button"
					onClick={collapse}
					className={cn(
						"h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute right-3 top-2 opacity-0 group-hover/sidebar:opacity-100 transition",
						isMobile && "opacity-100"
					)}
				>
					<ChevronLeft className="h-6 w-6" />
				</div>
				<div>
					<UserItem />
					<Item label="Search" icon={Search} isSearch onClick={search.onOpen} />
					<Item label="Update" icon={Clock8}  onClick={update.onOpen} />
					<Item
						label="Settings & members"
						icon={Settings}
						onClick={settings.onOpen}
					/>
					<Item onClick={handleCreate} icon={PlusCircle} label="new Page" />
				</div>
				<div className="mt-4">
					<DocumentList />
					<Item label="Add a page" icon={Plus} onClick={handleCreate} />
					<Popover>
						<PopoverTrigger className="w-full mt-4">
							<Item label="Trash" icon={Trash} />
						</PopoverTrigger>
						<PopoverContent
							className="p-0 w-72"
							side={isMobile ? "bottom" : "right"}
						>
							Trash
						</PopoverContent>
					</Popover>
				</div>
				<div
					onMouseDown={handleMouseDown}
					onClick={resetWidth}
					className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
				/>
			</aside>
			<div
				ref={navbarRef}
				className={cn(
					"absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
					isResetting && "transition-all ease-in-out duration-300",
					isMobile && "left-0 w-full"
				)}
			>
				{!!params.documentId ? (
					<Navbar isCollapsed={isCollapsed} onResetWidth={resetWidth} />
				) : (
					<nav className="bg-transparent px-3 py-2 w-full">
						{isCollapsed && (
							<MenuIcon
								onClick={resetWidth}
								role="button"
								className="h-6 w-6 text-muted-foreground"
							/>
						)}
					</nav>
				)}
			</div>
		</>
	);
};

export default Navigation;
