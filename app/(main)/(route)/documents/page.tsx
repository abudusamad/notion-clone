"use client";

import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";

import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
	const router = useRouter();
	const { user } = useUser();
	const create = useMutation(api.documents.create);

	const onCreate = () => {
		const promise = create({ title: "Untitled" })
			.then((documentId) =>
			router.push(`/documents/${documentId}`)
		);

		toast.promise(promise, {
			loading: "Creating new note...",
			success: "New note created",
			error: "Failed to create new note.",
		});
	};

	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				src="/dashboard.png"
				height="600"
				width="600"
				alt="Empty"
				className="dark:hidden"
			/>
			<Image
				src="/empty-dark.png"
				height="300"
				width="300"
				alt="Empty"
				className="hidden dark:block"
			/>
			<h2 className="text-lg font-medium">
				Welcome to {user?.firstName}&apos;s Notion
			</h2>
			<Button onClick={onCreate}>
				<PlusCircle className="h-4 w-4 mr-2" />
				Create a note
			</Button>
		</div>
	);
};

export default DocumentsPage;
