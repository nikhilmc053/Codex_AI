import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Junk or No Junk",
  description: "A simple food list that labels foods as junk or healthy.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
