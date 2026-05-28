import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oracle POS Support Agent",
  description: "Simphony POS support for Harvey's. Internal tool.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
