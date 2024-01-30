"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Error = () => {
	return (
		<div className="h-full flex flex-col items-center justify-center space-y-4">
			<Image
				alt="error"
				height={300}
				width={300}
				src="/error.png"
				className="dark:hidden"
			/>
			<Image
				alt="error"
				height={300}
				width={300}
				src="/error-dark.png"
				className="hidden dark:block"
			/>
			<h2 className="text-xl font-medium">Something went wrong</h2>
			<Button asChild>
				<Link href="/documents">Go back</Link>
			</Button>
		</div>
	);
};

export default Error;
