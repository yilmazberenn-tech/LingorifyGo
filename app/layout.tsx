import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lingorify — İngilizce kelimeler, her gün biraz daha",
  description:
    "A1–B2 seviyelerinde İngilizce kelimeler öğren, günlük hedeflerini tamamla ve Ollie ile ilerlemeni takip et.",
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
