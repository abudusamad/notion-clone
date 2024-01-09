"use client";

import useSearch from "@/app/hooks/use-search";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";

export const SearchCommand = () => {
	const [isMounted, setIsMounted] = useState(false);



	const toggle = useSearch((store) => store.toggle);
	const isOpen = useSearch((store) => store.isOpen);
	const onClose = useSearch((store) => store.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				toggle();
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, [toggle]);

	if (!isMounted) {
		return null;
	}
	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder="Type a command or search..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup heading="Suggestions">
					<CommandItem>Calendar</CommandItem>
					<CommandItem>Search Emoji</CommandItem>
					<CommandItem>Calculator</CommandItem>
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
};
