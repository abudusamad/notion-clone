"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Save the current page state to localStorage
		localStorage.setItem("currentPage", pathname);
	}, [pathname]);

	useEffect(() => {
		// Retrieve the last saved page from localStorage
		const lastPage = localStorage.getItem("currentPage");

		if (lastPage && lastPage !== pathname) {
			// Navigate to the last saved page
			router.push(lastPage);
		}
	}, [pathname, router]);

	return <>{children}</>;
};

export default Layout;
