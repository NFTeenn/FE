import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "./_provider/tanstackProvider";

const APP_NAME = "DonDon";
const APP_DEFAULT_TITLE = "DonDon";
const APP_TITLE_TEMPLATE = "%s - DonDon";
const APP_DESCRIPTION = "돈돈은 청소년을 위한 금융지식 플랫폼입니다.";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
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
					<main className="min-h-screen bg-brand-bg">{children}</main>
				</TanstackProvider>
			</body>
		</html>
	);
}
