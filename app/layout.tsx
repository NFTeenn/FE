import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
	src: "./fonts/PretendardVariable.woff2",
	weight: "100 900",
	variable: "--font-pretendard",
	display: "swap",
});

export const metadata: Metadata = {
	title: "돈돈이",
	description: "청소년 금융/경제 지식 플랫폼",
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${pretendard.variable}`}>{children}</body>
		</html>
	);
}
