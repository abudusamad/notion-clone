"use client";

import { useUpdate } from "@/app/hooks/use-update";
import { useEffect, useState } from "react";
import { Popover, PopoverContent } from "./ui/popover";

interface UpdatePopoverProps {
	side?: "left" | "right" | "top" | "bottom";
	sideOffset?: number;
	align?: "start" | "center" | "end";
}

export const UpdatePopover = ({
	side = "right",
	sideOffset = 0,
	align = "start",
}: UpdatePopoverProps) => {
	const [isMounted, setIsMounted] = useState(false);

	const isOpen = useUpdate((store) => store.isOpen);
	const onClose = useUpdate((store) => store.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return (
		<Popover open={isOpen} onOpenChange={onClose}>
			<PopoverContent
				className="w-80 pt-3"
				align={align}
				side={side}
				sideOffset={sideOffset}
			>
				<div className="flex flex-col gap-y-2">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-medium">Update</h3>
					</div>
					<div className="flex flex-col gap-y-2">
						<div className="flex items-center justify-between">
							<span className="text-[0.8rem] text-muted-foreground">
								Version 1.0.0
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-[0.8rem] text-muted-foreground">
								Released on 2021-10-10
							</span>
						</div>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};
