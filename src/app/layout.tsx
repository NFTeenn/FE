import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "./_provider/tanstackProvider";

export const metadata: Metadata = {
	title: "NFTeen",
	description: "NFT Platform for Teens",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ko">
			<body>
				<TanstackProvider>
					<main className="min-h-screen bg-gray-50">{children}</main>
				</TanstackProvider>
			</body>
		</html>
	);
}
