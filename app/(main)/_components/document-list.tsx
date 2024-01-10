"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react";
import { useCallback, useState } from "react";

interface DocumentListProps {
    parentDocumentId?: Id<"documents">
    level?: number;
    data?: Doc<"documents">[]
}

export const DocumentList = ({
    parentDocumentId,
    level = 0,
    data
}: DocumentListProps) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({})

    const onExpand = useCallback((documentId: string) => {
        setExpanded((prev) => ({
            ...prev,
            [documentId]: !prev[documentId]
        }))
    }, [setExpanded])

    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId
    })
    
    return (
        <div>
            Document List page
        </div>
    )
}