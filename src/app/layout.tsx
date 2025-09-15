import type { Metadata } from "next";
import "./globals.css";

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
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  );
}
