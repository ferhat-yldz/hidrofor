import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { servicesData } from "@/config/data";
import { getSite, telHref, mapsHref } from "@/lib/site";

export default function Footer() {
  const { contact, agency } = getSite();
  const addressLines = contact.addressLabel.split("\n");

  return (
    <footer id="iletisim" className="bg-slate-900 border-t border-slate-800 pt-20 pb-8 mt-10 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

          {/* Column 1: Info & Contact */}
          <div className="col-span-1 lg:col-span-1 border-r-0 lg:border-r border-slate-800 pr-0 lg:pr-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white p-1 rounded-full shrink-0 shadow-sm shadow-blue-500/20">
                <Image unoptimized src="/images/logo.png" alt="AK Dalgıç Pompa Logo" width={60} height={60} className="w-14 h-14 object-contain rounded-full" />
              </div>
              <div className="text-2xl font-black text-white tracking-tighter leading-none">
                AK <span className="text-blue-500">DALGIÇ POMPA</span>
              </div>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 font-medium text-slate-300">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <a href={mapsHref(contact.mapsQuery)} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed text-sm">
                  {addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < addressLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </a>
              </li>
              <li className="flex items-center gap-4 font-medium">
                <Phone className="w-5 h-5 text-fire-red shrink-0" />
                <a href={telHref(contact.phoneE164)} className="hover:text-white transition-colors text-lg font-bold text-white">{contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-4 font-medium">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors text-[13px] sm:text-sm">{contact.email}</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Working Hours */}
          <div>
            <h4 className="text-md font-black text-white mb-6 uppercase tracking-wider relative inline-block">
              Çalışma Saatleri
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></div>
            </h4>
            <div className="space-y-6">
              <div>
                <h5 className="font-bold text-slate-400 mb-2 text-sm">Pazartesi - Cuma:</h5>
                <p className="text-white font-black bg-blue-500/20 border border-blue-500/30 py-2 px-3 inline-block rounded-xl text-xs shadow-[0_0_15px_rgba(59,130,246,0.2)]">7/24 Kesintisiz Hizmet</p>
              </div>
              <div>
                <h5 className="font-bold text-slate-400 mb-2 text-sm">Cumartesi - Pazar:</h5>
                <p className="text-white font-black bg-fire-red/20 border border-fire-red/30 py-2 px-3 inline-block rounded-xl text-xs shadow-[0_0_15px_rgba(255,50,0,0.2)]">7/24 Kesintisiz Hizmet</p>
              </div>
            </div>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-md font-black text-white mb-6 uppercase tracking-wider relative inline-block">
              Hizmetler
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3">
              {servicesData.slice(0, 5).map((service, idx) => (
                <li key={idx}>
                  <Link href={`/hizmetler/${service.slug}`} className="hover:text-blue-500 transition-colors font-medium flex items-center gap-2 group text-sm">
                    <ChevronRight className="w-4 h-4 text-blue-500 opacity-50 group-hover:translate-x-1 transition-transform" />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Extra / Quick Links */}
          <div>
            <h4 className="text-md font-black text-white mb-6 uppercase tracking-wider relative inline-block">
              Bağlantılar
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></div>
            </h4>
            <ul className="space-y-3 font-medium text-sm">
              <li><Link href="/" className="hover:text-blue-500 transition-colors block">Ana Sayfa</Link></li>
              <li><Link href="/kurumsal" className="hover:text-blue-500 transition-colors block">Kurumsal</Link></li>
              <li><Link href="/bilgiler" className="hover:text-blue-500 transition-colors block">Bilgiler & Blog</Link></li>
              <li><a href="#iletisim" className="hover:text-blue-500 transition-colors block">İletişim</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors block">KVKK Aydınlatma</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors block">Gizlilik Politikası</a></li>
            </ul>
          </div>

          {/* Column 5: Site Yapımcısı / Agency / Credits */}
          <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-700/50">
            <h4 className="text-md font-black text-white mb-5 uppercase tracking-wider relative inline-block">
              Site Yapımcısı
              <div className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-500 rounded-full"></div>
            </h4>
            
            <div className="font-black text-white text-lg mb-1 tracking-tight">
              {agency.nameLine} <span className="text-blue-500">{agency.nameHighlight}</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-5">{agency.tagline}</div>
            
            <ul className="space-y-3 font-medium text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={telHref(agency.phoneE164)} className="hover:text-white transition-colors">{agency.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-500 shrink-0" />
                <a href={`mailto:${agency.email}`} className="hover:text-white transition-colors">{agency.email}</a>
              </li>
              <li className="flex items-start gap-2 pt-2 border-t border-slate-700/50 mt-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-[11px]">{agency.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-slate-500">
            <p>© {new Date().getFullYear()} AK DALGIÇ POMPA Tüm Hakları Saklıdır.</p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
            <div className="flex gap-5 font-bold">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href={telHref(contact.phoneE164)} className="hover:text-white transition-colors">Destek: {contact.phoneDisplay}</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
