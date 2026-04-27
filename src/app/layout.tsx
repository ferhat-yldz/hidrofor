import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AK DALGIÇ POMPA & MEKANİK | Malatya Hidrofor, Dalgıç Pompa ve Mekanik Çözümler",
  description: "Malatya ve çevresinde 7/24 profesyonel hidrofor, kuyu sondaj ve pompa sistemleri. 15+ yıllık deneyimle kesintisiz su basıncı garantisi.",
  keywords: ["Malatya Hidrofor", "Malatya Dalgıç Pompa Tamiri", "Yeşilyurt Tesisatçı", "hidrofor kurulumu malatya", "kuyu sondaj malatya", "su tesisatı malatya"],
  authors: [{ name: "AK DALGIÇ POMPA & MEKANİK" }],
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "AK DALGIÇ POMPA & MEKANİK | Malatya Hidrofor, Dalgıç Pompa ve Mekanik Çözümler",
    description: "Malatya ve çevresinde 7/24 profesyonel hidrofor, kuyu sondaj ve pompa sistemleri. 15+ yıllık deneyimle kesintisiz su basıncı garantisi.",
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
    <html lang="tr" className="scroll-smooth">
      <body className={`${inter.className} flex flex-col min-h-screen`} suppressHydrationWarning>
        <SiteChrome />
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
