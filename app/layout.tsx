import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingorifyGo — Learn English, one word at a time",
  description:
    "Learn English vocabulary with short, level-based practice for A1–B2 learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
