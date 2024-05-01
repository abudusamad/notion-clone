import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { debounce, throttle } from "lodash";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();

	// Debounce localStorage updates
	const debouncedSavePage = debounce((page) => {
		localStorage.setItem("currentPage", page);
	}, 500);

	useEffect(() => {
		debouncedSavePage(pathname);
		return () => {
			// Clean up on unmount
			localStorage.removeItem("currentPage");
			debouncedSavePage.cancel(); // Cancel any pending debounced updates
		};
	}, [pathname, debouncedSavePage]);

	// Throttle router.push calls
	const throttledNavigate = throttle((page) => {
		router.push(page);
	}, 1000);

	useEffect(() => {
		const lastPage = localStorage.getItem("currentPage");

		if (lastPage && lastPage !== pathname) {
			throttledNavigate(lastPage);
		}

		return () => {
			throttledNavigate.cancel(); // Cancel any pending throttled navigations
		};
	}, [pathname, router , throttledNavigate]);

	return <>{children}</>;
};

export default Layout;
