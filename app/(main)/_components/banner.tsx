"use client";

import { ConfirmModal } from "@/app/modal/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
	documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
	const router = useRouter();

	const restore = useMutation(api.documents.restore);
	const remove = useMutation(api.documents.remove);

	const onRemove = () => {
		const promise = remove({ id: documentId });

		toast.promise(promise, {
			loading: "Deleting page...",
			success: "Page deleted",
			error: "Error deleting page",
		});

		router.push("/documents");
	};

	const onRestore = () => {
		const promise = restore({ id: documentId });

		toast.promise(promise, {
			loading: "Restoring page...",
			success: "Page restored",
			error: "Error restoring page",
		});
	};
	return (
		<div className="w-full bg-rose-500 text-center text-sm text-white p-2 flex items-center gap-x-2 justify-center">
			<p>This Page is in the Trash</p>
			<Button
				size="sm"
				onClick={onRestore}
				variant="outline"
				className="border-white bg-transparent hover:bg-primary/5 text-white p-1 px-2 h-auto font-normal"
			>
				Restore page
			</Button>
			<ConfirmModal onConfirm={onRemove}>
				<Button
					size="sm"
					variant="outline"
					className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
				>
					Delete forever
				</Button>
			</ConfirmModal>
		</div>
	);
};
