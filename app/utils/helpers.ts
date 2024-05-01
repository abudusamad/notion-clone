export const getSpaceNameFromUrl = () => {
	const url = new URL(window.location.href);
	const spaceNameInParams = url.searchParams.get("space");

	if (spaceNameInParams) {
		return spaceNameInParams;
	} else {
		const documentId = url.pathname.split("/").pop();
		url.searchParams.set("space", documentId as string);
		window.history.replaceState({}, "", `${url.searchParams.toString}`);
		return documentId;
	}
};

export const REMOVE_USER_AFTER_MILLIS = 120_000;
export const MAX_USERS_BEFORE_LIST = 5;

