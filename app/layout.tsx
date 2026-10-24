import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lingorify — Bir dil, bin yeni ihtimal",
  description:
    "Her gün sana özel, kısa ve keyifli derslerle yeni bir dil öğrenmeye başla.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
