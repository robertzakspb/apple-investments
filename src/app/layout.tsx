import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apple Investments",
  description: "A clear view of your investment portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Apple Investments home">
            <span className="brand-mark" aria-hidden="true">a</span>
            <span>Apple Investments</span>
          </Link>
          <Navigation />
          <div className="header-note">INVEST WITH CLARITY</div>
        </header>
        <main className="main-content">{children}</main>
      </body>
    </html>
  );
}
