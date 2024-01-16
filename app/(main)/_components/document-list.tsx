"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Item } from "./item";

interface DocumentListProps {
	parentDocumentId?: Id<"documents">;
	level?: number;
	data?: Doc<"documents">[];
}

export const DocumentList = ({
	parentDocumentId,
	level = 0,
	data,
}: DocumentListProps) => {
	const router = useRouter();
	const params = useParams();
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});

	const onExpand = useCallback(
		(documentId: string) => {
			setExpanded((prev) => ({
				...prev,
				[documentId]: !prev[documentId],
			}));
		},
		[setExpanded]
	);

	const documents = useQuery(api.documents.getSidebar, {
		parentDocument: parentDocumentId,
	});

	const onRedirect = useCallback(
		(documentId: string) => {
			router.push(`/document/${documentId}`);
		},
		[router]
	);
	if (documents === undefined) {
		return (
			<>
				<Item.Skeleton level={level} />
				{level === 0 && (
					<>
						<Item.Skeleton level={level} />
						<Item.Skeleton level={level} />
					</>
				)}
			</>
		);
	}

	return (
		<>
			<p
				style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
				className={cn(
					"hidden text-xs font-medium text-muted-foreground/80 py-4",
					expanded && Object.keys(expanded).length === 0 && "last:block",
					level === 0 && "hidden"
				)}
			>
				No pages inside
			</p>
			{documents.map((document) => (
				<div key={document._id}>
					<Item
						id={document._id}
						level={level}
						label={document.title}
						onClick={() => onRedirect(document._id)}
						icon={FileIcon}
						onExpand={() => onExpand(document._id)}
						expanded={expanded[document._id]}
						active={params.documentId === document._id}
						documentIcon={document.icon}
					/>
					{expanded[document._id] && (
						<DocumentList parentDocumentId={document._id} level={level + 1} />
					)}
				</div>
			))}
		</>
	);
};
