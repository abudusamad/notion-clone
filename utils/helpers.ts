export const getSpaceNameFromUrl = () => {
	const url = new URL(window.location.href);
	const spaceNameInParams = url.searchParams.get("space");
	if (spaceNameInParams) {
		return spaceNameInParams;
	} else {
		const documentId = url.pathname.split("/").pop();
		url.searchParams.set("space", documentId as string);
		window.history.replaceState({}, "", `?${url.searchParams.toString()}`);
		return documentId;
	}
};
