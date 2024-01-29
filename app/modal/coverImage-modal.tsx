"use client";

import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useCoverImage } from "../hooks/use-cover-image";

const CoverImageModal = () => {
	const coverImage = useCoverImage();
	const [file, setFile] = useState<File>();
	const { edgestore } = useEdgeStore();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const update = useMutation(api.documents.update);
	const params = useParams();

	const onClose = () => {
		setIsSubmitting(false), setFile(undefined);
		coverImage.onClose;
	};
	const onChange = async (file?: File) => {
		if (file) {
			setFile(file);
			setIsSubmitting(true);

			const res = await edgestore.publicFiles.upload({
				file,
				options: {
					replaceTargetUrl: coverImage.url,
				},
			});
			await update({
				id: params.documentId as Id<"documents">,
				coverImage: res.url,
			});

			onClose();
		}
	};

	return (
		<Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-center text-lg font-semibold">Add Cover Image</h2>
				</DialogHeader>
				<SingleImageDropzone
					className="w-full outline-none"
					disabled={isSubmitting}
					onChange={onChange}
					value={file}
				/>
			</DialogContent>
		</Dialog>
	);
};

export default CoverImageModal;
