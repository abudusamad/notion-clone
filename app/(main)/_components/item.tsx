"use client";

import {
	ChevronDown,
	ChevronRight,
	LucideIcon,
	MoreHorizontal,
	Plus,
	Trash
} from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface ItemProps {
	id?: Id<"documents">;
	documentIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExpand?: () => void;
	onClick?: () => void;
	label: string;
	icon: LucideIcon;
}

export const Item = ({
	onClick,
	label,
	icon: Icon,
	active,
	expanded,
	isSearch,
	level = 0,
	onExpand,
	documentIcon,
	id,
}: ItemProps) => {
	const { user } = useUser();
	const router = useRouter();
	const create = useMutation(api.documents.create);


	const handleExpand = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		onExpand?.();
	}

	const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation();
		if (!id) return;
		const promise = create({ title: "Untitle", parentDocumet: id })
			.then((DocumentId) => {
				if (!expanded) {
					onExpand?.();
				}
				router.push(`/document/${DocumentId}`);
			})
		toast.promise(promise, {
			loading: "Creating a new note ...",
			success: "New note created",
			error: "Failed to create new note.",
		});
	}
	const ChevronIcon = expanded ? ChevronDown : ChevronRight;

	return (
		<div
			onClick={onClick}
			role="button"
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
			className={cn(
				"group min-h-[27px] text-sm pr-3 py-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
				active && "bg-primary/5 text-primary"
			)}
		>
			{!!id && (
				<div className="h-full rounded-sm hover:bg-neutral-300 mr-1
				"
					role="button"
					onClick={handleExpand}
				>
					<ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
				</div>
			)}
			{documentIcon ? (
				<div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
			) : (
				<Icon className="shrink-0 h-[18px] w-[18px] text-muted-foreground mr-1" />
			)}
			<span className="truncate">{label}</span>
			{isSearch && (
				<kbd className="ml-auto pointer-events-none inline-flex h-5 selected-none gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="tex-xs">clt</span>K
				</kbd>
			)}
			{!!id && (
				<div className="ml-auto flex  items-center gap-x-2">
					<DropdownMenu>
						<DropdownMenuTrigger
						onClick={(e)=>e.stopPropagation()}
							asChild>
							<div>
								<MoreHorizontal className="h-4 w-4 text-muted-foreground" />
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>
								<Trash className="h-4 w-4 mr-2" />
								Delete
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<div>
								Last edited by: {user?.fullName}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>

				</div>
			)}
			<div className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
				role="button"
				onClick={onCreate}
			>
				<Plus className="h-4 w-4 text-muted-foreground"/>
			</div>
		</div>
	);
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
	return (
		<div
			style={{
				paddingLeft: level ? `${level * 12 + 25}px` : "12px",
			}}
			className="flex gap-x-2 py-[3px]"
		>
			<Skeleton className="h-[18px] w-[18px]" />
			<Skeleton className="h-[18px] w-[18px]" />
		</div>
	);
};
