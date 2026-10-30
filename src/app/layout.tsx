import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I was made by Jaah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
