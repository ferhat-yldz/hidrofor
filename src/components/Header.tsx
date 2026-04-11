"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, ChevronDown, Menu, X, ArrowLeft } from "lucide-react";
import { servicesData } from "@/config/data";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Ana Sayfa", href: "/", isHash: false },
    { name: "Kurumsal", href: "/kurumsal", isHash: false },
    { name: "Galeri", href: "/#galeri", isHash: true },
    { name: "Bilgiler", href: "/bilgiler", isHash: false },
    { name: "İletişim", href: "/#iletisim", isHash: true }
  ];

  const getLinkClasses = (href: string, isHash: boolean) => {
    const isActive = !isHash && (pathname === href || (href !== "/" && pathname.startsWith(href)));
    return `transition-colors ${isActive ? "text-blue-600 font-black" : "text-slate-600 font-bold hover:text-blue-500"}`;
  };

  return (
    <header className="sticky top-0 z-[100] w-full flex flex-col shadow-sm">
      {/* Top Warning Bar */}
      <div className="bg-fire-red text-white text-center text-sm font-bold py-2 px-4 relative z-20">
        Malatya'nın Güvenilir Su Çözümleri | 7/24 Kesintisiz Hizmet <a href="tel:+905433363944" className="underline ml-2">Hemen Ara</a>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-100 flex items-center relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center py-3 lg:py-0">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer lg:h-24">
            <Image unoptimized priority src="/images/logo.png" alt="AK Dalgıç Pompa Logo" width={75} height={75} className="w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain drop-shadow-md" />
            <div className="flex flex-col justify-center gap-0.5">
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter leading-[0.9] whitespace-nowrap group-hover:text-blue-600 transition-colors">
                HİDROFOR
              </span>
              <span className="text-xl md:text-2xl lg:text-3xl font-black text-blue-500 tracking-tighter leading-[0.9] whitespace-nowrap group-hover:text-slate-900 transition-colors">
                DALGIÇ POMPA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 h-20">
            <Link 
              href="/" 
              className={getLinkClasses("/", false)}
              onClick={() => window.scrollTo(0, 0)}
            >
              Ana Sayfa
            </Link>
            <Link href="/kurumsal" className={getLinkClasses("/kurumsal", false)}>Kurumsal</Link>

            <div className="relative group h-full flex items-center">
              <Link href="/#hizmetler" className={`flex items-center gap-1 ${getLinkClasses("/hizmetler", false)}`}>
                Hizmetler <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-xl p-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-4 group-hover:translate-y-0 border border-slate-100 before:absolute antes:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white max-h-[70vh] overflow-y-auto z-50">
                <div className="flex flex-col gap-1 relative z-10">
                  {servicesData.map((service, idx) => {
                    const isServiceActive = pathname === `/hizmetler/${service.slug}`;
                    return (
                      <Link key={idx} href={`/hizmetler/${service.slug}`} className={`px-3 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 ${isServiceActive ? "bg-blue-50 text-blue-600 font-black" : "text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-500"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full block shrink-0 ${isServiceActive ? "bg-fire-red" : "bg-blue-500"}`}></span>
                        {service.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <Link href="/#galeri" className={getLinkClasses("/#galeri", true)}>Galeri</Link>
            <Link href="/bilgiler" className={getLinkClasses("/bilgiler", false)}>Bilgiler</Link>
            <Link href="/#iletisim" className={getLinkClasses("/#iletisim", true)}>İletişim</Link>

            <a href="https://wa.me/905433363944" target="_blank" className="bg-[#25D366] hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-green-200 transition-all transform hover:scale-105 flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden p-3 -mr-2 text-slate-800 hover:text-blue-600 z-[200] relative pointer-events-auto"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen((prev) => !prev);
            }}
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 w-full h-[100dvh] bg-white z-[150] transition-transform duration-300 transform lg:hidden overflow-y-auto flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Absolute Back Button in Mobile Menu */}
        <div className="p-6 flex justify-end items-center relative z-20 border-b border-slate-100 bg-white">
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-5 py-2.5 rounded-full font-black hover:bg-slate-200 hover:text-fire-red transition-all shadow-sm"
          >
             <ArrowLeft className="w-5 h-5" /> Geri
          </button>
        </div>

        {/* Content Box */}
        <div className="flex-1 flex flex-col justify-start px-6 pt-4">
          <nav className="flex flex-col gap-0 w-full">
            {navLinks.map((link, i) => {
              const isActive = !link.isHash && (pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href)));
              return (
                <Link
                  key={i}
                  href={link.href}
                  className={`text-2xl transition-all py-6 text-center border-b border-slate-100/50 last:border-0 ${isActive ? "text-blue-600 font-black" : "font-bold text-slate-800 hover:text-blue-500"}`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (link.href === "/") {
                      window.scrollTo(0, 0);
                    }
                  }}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/#hizmetler"
              className={`text-2xl transition-all py-6 text-center border-b border-slate-100/50 ${pathname.startsWith("/hizmetler") ? "text-blue-600 font-black" : "font-bold text-slate-800 hover:text-blue-500"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Hizmetler
            </Link>
          </nav>
        </div>

        {/* Footer: Contacts at bottom */}
        <div className="p-8 border-t border-slate-50 bg-slate-50/50 mt-auto">
          <div className="flex flex-col gap-4 text-center">
            <a href="tel:+905433363944" className="flex items-center justify-center gap-3 text-lg font-black text-slate-900 hover:text-fire-red transition-colors">
              <Phone className="w-5 h-5 text-fire-red" /> 0543 336 39 44
            </a>
            <div className="h-px w-12 bg-slate-200 mx-auto"></div>
            <a href="https://wa.me/905433363944" target="_blank" className="flex items-center justify-center gap-3 text-lg font-black text-slate-900 hover:text-[#25D366] transition-colors">
              <WhatsAppIcon className="w-6 h-6 text-[#25D366]" /> WhatsApp Destek
            </a>
          </div>

          <div className="mt-8 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AK DALGIÇ POMPA ACİL SERVİS</div>
          </div>
        </div>
      </div>
    </header>
  );
}
