import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, LucideIcon } from "lucide-react";

interface ItemProps {
	id?: Id<"documents">;
	documentIcon?: string;
	active?: boolean;
	expanded?: boolean;
	isSearch?: boolean;
	level?: number;
	onExapand?: () => void;
	onClick: () => void;
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
	onExapand,
	documentIcon,
	id,
}: ItemProps) => {
	const ChevronIcon = expanded ? ChevronDown : ChevronRight;

	return (
		<div
			style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
			className={cn(
				"group min-h-[27px] text-sm pr-3 py-1 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
				active && "bg-primary/5 text-primary"
			)}
		>
			{!!id && (
				<div className="h-full rounded-sm hover:bg-neutral-300 mr-1 ">
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
					<span className="tex-xs">Clt</span>K
				</kbd>
			)}
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
