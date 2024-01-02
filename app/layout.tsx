import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./Providers/convex-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: "%s | " + siteConfig.name,
	},
	description: siteConfig.description,

	icons: [
		{
			url: "/notionlogo.png",
			href: "/notionlogo.png",
		},
	],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ConvexClientProvider>{children}</ConvexClientProvider>
			</body>
		</html>
	);
}
