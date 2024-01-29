"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import { useTheme } from "next-themes";

interface EditorProps {
	onChange: (content: string) => void;
	initialContent?: string;
	editable?: boolean;
}

export const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
	const { resolvedTheme } = useTheme();
	const { edgestore } = useEdgeStore();

	const upload = async (file: File) => {
		const response = await edgestore.publicFiles.upload({
			file,
		});
		return response.url;
	};

	const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent: initialContent ? JSON.parse(initialContent) : undefined,
		onEditorContentChange: (editor) => {
			onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
		},
		uploadFile: upload,
	});
	return (
		<div>
			<BlockNoteView
				editor={editor}
				theme={resolvedTheme === "dark" ? "dark" : "light"}
			/>
		</div>
	);
};
