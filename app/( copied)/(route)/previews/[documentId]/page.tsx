"use client";

import { CoverImage } from "@/components/cover-image";
import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

interface DocumentIdPageProps {
	params: {
		documentId: Id<"documents">;
	};
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
	// const Editor = useMemo(
	// 	() => dynamic(() => import("@/components/editor"), { ssr: false }),
	// 	[]
	// );

	const document = useQuery(api.documents.getById, {
		documentId: params.documentId,
	});

	const update = useMutation(api.documents.update);

	const onChange = (content: string) => {
		update({
			id: params.documentId,
			content,
		});
	};

	if (document === undefined) {
		return <div>loading ....</div>;
	}

	if (document === null) {
		return <div>not Found</div>;
	}
	return (
		<div className="pb-40">
			<CoverImage preview url={document.coverImage} />
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-5">
				<Toolbar initialData={document} />
				<Editor initialContent={document.content} onChange={onChange} />
			</div>
		</div>
	);
};

export default DocumentIdPage;
