"use client";

import { CoverImage } from "@/components/cover-image";
import { Editor } from "@/components/editor";
import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
	params: {
		documentId: Id<"documents">;
	};
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
	const document = useQuery(api.documents.getById, {
		documentId: params.documentId,
	});

	if (document === undefined) {
		return <div>loading ....</div>;
	}

	if (document === null) {
		return <div>not Found</div>;
	}
	return (
		<div className="pb-40">
			<CoverImage preview url={document.coverImage}/>
			<div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-5">
				<Toolbar initialData={document} />
				<Editor/>
			</div>
		</div>
	);
};

export default DocumentIdPage;
