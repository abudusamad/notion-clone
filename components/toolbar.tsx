"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { ImageIcon, Smile, X } from "lucide-react";
import { useState } from "react";
import { IconPicker } from "./icon-picker";

interface ToolbarProps {
	initialData: Doc<"documents">;
	preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
	const [isEditing, setIsEditing] = useState(false);
	return (
		<div className="pl-[54px] group relative">
			{!!initialData.icon && !preview && (
				<div className="flex items-center gap-x-2 group/icon pt-6">
					<IconPicker onChange={() => {}}>
						<p className="text-6xl hover:opacity-75 transition">
							{initialData.icon}
						</p>
					</IconPicker>
					<Button
						onClick={() => {}}
						variant="outline"
						size="icon"
						className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs
                    "
					>
						<X className="w-6 h-6" />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && (
				<p className="text-6xl pt-6">{initialData.icon}</p>
			)}
			<div className="opacity-100 group-hover:opacity-100 flex items-center gap-x-1 py-4">
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={() => {}}>
						<Button
							variant="outline"
							size="icon"
							className="text-muted-foreground text-xs"
						>
							<Smile className="w-6 h-6 mr-2" />
							Add icon
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button
						variant="outline"
						size="icon"
						className="text-muted-foreground text-xs"
					>
						<ImageIcon className="w-6 h-6 mr-2" />
						add cover image
					</Button>
				)}
			</div>
			{isEditing && !preview && <div className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F3] resize-none">{initialData.title}</div>}
		</div>
	);
};
