import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { startCase } from "lodash";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: {
		documentId: Id<"documents">;
	};
	children: React.ReactNode;
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	return {
		title: startCase("Untitled")
	};
}

const DocumentIdLayout = ({ children }: Props) => {
	return <main>{children}</main>;
};

export default DocumentIdLayout;
