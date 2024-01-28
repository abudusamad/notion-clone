"use client";

import { Button } from "@/components/ui/button";
import { Doc } from "@/convex/_generated/dataModel";
import { ImageIcon, Smile, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { IconPicker } from "./icon-picker";

import TextareaAutosize from 'react-textarea-autosize';
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCoverImage } from "@/app/hooks/use-cover-image";

interface ToolbarProps {
	initialData: Doc<"documents">;
	preview?: boolean;
}

export const Toolbar = ({ initialData, preview }: ToolbarProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [value, setValue] = useState(initialData.title)
	const inputRef = useRef<ElementRef<"textarea">>(null);

	const update = useMutation(api.documents.update)
	const removeIcon = useMutation(api.documents.removeIcon)

	const coverImage = useCoverImage();
	const enableInput = () => {
		if(preview) return

		setIsEditing(true)
		setTimeout(() => {
			setValue(initialData.title)
			inputRef.current?.focus();
		}, 0);
	}

	const disableInput = () => {
		setIsEditing(false)
	}

	const onInput = (value: string) => {
		setValue(value)
		update({
			id: initialData._id,
			title: value || "Untitled",
		})
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			disableInput()
		}
	}

	const onIconSelect = (icon: string) => {
		update({
			id: initialData._id,
			icon,
		})
	}

	const onRemoveIcon = () => {
		removeIcon({
			id: initialData._id,
		})
	}

	return (
		<div className="pl-[54px] group relative">
			{!!initialData.icon && !preview && (
				<div className="flex items-center gap-x-2 group/icon pt-6">
					<IconPicker onChange={onIconSelect}>
						<p className="text-6xl hover:opacity-75 transition">
							{initialData.icon}
						</p>
					</IconPicker>
					<Button
						onClick={onRemoveIcon}
						variant="outline"
						size="icon"
						className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs
                    "
					>
						<X className="w-4 h-4" />
					</Button>
				</div>
			)}
			{!!initialData.icon && preview && (
				<p className="text-6xl pt-6">{initialData.icon}</p>
			)}
			<div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
				{!initialData.icon && !preview && (
					<IconPicker asChild onChange={onIconSelect}>
						<Button
							variant="outline"
							size="sm"
							className="text-muted-foreground text-xs"
						>
							<Smile className="w-4 h-4 mr-2" />
							Add icon
						</Button>
					</IconPicker>
				)}
				{!initialData.coverImage && !preview && (
					<Button
						onClick={coverImage.onOpen}
						variant="outline"
						size="sm"
						className="text-muted-foreground text-xs"
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						add cover image
					</Button>
				)}
			</div>
			{isEditing && !preview ? (
				<TextareaAutosize
					ref={inputRef}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					onBlur={disableInput}
					onKeyDown={onKeyDown}
					className="text-5xl bg-transparent font-bold break-words outline-none resize-none text-[#3F3F3F3] dark:text-[CFCFCF]"
				/>
			):
				(
				<div
					onClick={enableInput}
					className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F3] dark:text-[CFCFCF] resize-none">
				{initialData.title}
			</div>
				)}
		</div>
	);
};
