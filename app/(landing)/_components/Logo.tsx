import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
const font = Poppins({
	subsets: ["latin"],
	weight: ["400", "600"],
});

export const Logo = () => {
	return (
		<div className="flex items-center gap-x-2">
			<Image
                width={100}
                height={100}
				alt="Logo"
				src="/Notion.svg"
				className={cn("font-semibold ", font.className)}
			/>
		</div>
	);
};
