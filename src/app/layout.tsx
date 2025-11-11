import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/widgets/sidebar/layout";

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
      <body >
        <main className="min-h-screen bg-brand-bg">
          <Sidebar />
          {children}
          </main>
      </body>
    </html>
  );
}
