import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GAP Sıhhi Tesisat | Malatya Su Tesisatı & Arıza Onarımı",
  description: "Malatya'da cihazlı su kaçak tespiti, detaylı kombi bakımı, ilaçsız darbeli petek temizliği, termosifon ve güneş enerji sistemleri kurulumu. 7/24 hizmetinizdeyiz.",
  keywords: ["malatya su tesisatı", "malatya su arızası", "su tesisatçısı malatya", "kombi bakımı malatya", "petek temizliği malatya", "su kaçağı tespiti cihazlı malatya"],
  authors: [{ name: "GAP Yapı Sıhhi Tesisat" }],
  openGraph: {
    title: "GAP Sıhhi Tesisat | Malatya Su Tesisatı & Arıza Onarımı",
    description: "Malatya profesyonel sıhhi tesisat hizmetleri.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
