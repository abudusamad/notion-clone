import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CoverImageProps {
	url?: string;
	preview?: boolean;
}

export const CoverImage = ({ url, preview }: CoverImageProps) => {
	return (
        <div className={cn("relative w-full h-[35vh] group",
            !url && "h-[8vh]"
            
        )}>
			{!!url && (
				<Image src={url} alt="Cover Image" className="object-cover " fill />
			)}
			{!!url && preview && (
				<div className="opacity-0 group-hover:opacity-100 absolute top-16 right-1/4 flex items-center  ">
					<Button
						variant="outline"
						size="sm"
						className="text-muted-foreground tex-xs"
					>
						<ImageIcon className="w-4 h-4 mr-2" />
						Change Cover
					</Button>
					<Button
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
