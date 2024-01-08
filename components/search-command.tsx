"use client";

import useSearch from "@/app/hooks/use-search";
import { useEffect, useState } from "react";

export const SearchCommand = () => {
	const [isMounted, setIsMounted] = useState(false);

	const toggle = useSearch((state) => state.toggle());
	const isOpen = useSearch((state) => state.isOpen);
	const onClose = useSearch((state) => state.onClose);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}
	return <div>Search</div>;
};
