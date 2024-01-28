"use client";

import { useCoverImage } from "@/app/hooks/use-cover-image";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "./ui/button";

interface CoverImageProps {
	url?: string;
	preview?: boolean;
}

export const CoverImage = ({ url, preview }: CoverImageProps) => {
	const { edgestore } = useEdgeStore();
	const coveImage = useCoverImage();
	const removeCoverImage = useMutation(api.documents.removeCoverImage);
	const params = useParams();

	const onRemove = async () => {
		removeCoverImage({ id: params.documentId as Id<"documents"> });
		if (url) {
			await edgestore.publicFiles.delete({
				url: url,
			});
		}
	};
	return (
		<div
			className={cn(
				"relative w-full h-[35vh] group",
				!url && "h-[8vh]",
				url && "bg-muted"
			)}
		>
			{!!url && (
				<Image src={url} alt="Cover Image" className="object-cover " fill />
			)}
			{!!url && preview && (
				<div className="opacity-0 group-hover:opacity-100 absolute top-16 right-1/4 flex items-center  ">
					<Button
						onClick={() => coveImage.onReplace(url)}
						variant="outline"
						size="sm"
						className="text-muted-foreground tex-xs"
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						Change Cover
					</Button>
					<Button
						onClick={onRemove}
						variant="outline"
						size="sm"
						className="text-muted-foreground tex-xs"
					>
						<X className="w-4 h-4 mr-2" />
						remove Cover
					</Button>
				</div>
			)}
		</div>
	);
};
