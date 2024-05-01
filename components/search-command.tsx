"use client"

import { useSearch } from "@/app/hooks/use-search";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { File } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const SearchCommand = () => {
	const [isMounted, setIsMounted] = useState(false);
	const { user } = useUser();
	const router = useRouter();
	const documents = useQuery(api.documents.get)

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

	const onSelect = (id: string) => {
		router.push(`/documents/${id}`);
		onClose();
	};
	return (
		<CommandDialog open={isOpen} onOpenChange={onClose}>
			<CommandInput placeholder={`search ${user?.fullName}' Notion`} />
			<CommandList>
				<CommandGroup heading="Documents">
					{documents?.map((document) => (
						<CommandItem
							key={document._id}
							value={`${document._id}-${document.title}`}
							title={document.title}
							onSelect={() => onSelect(document._id)}
						>
							{document.icon ? (
								<p className="mr-2 text-[18px]">{document.icon}</p>
							) : (
								<File className="mr-2 h-4 w-4" />
							)}
							<span>{document.title}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandDialog>
	);
};
