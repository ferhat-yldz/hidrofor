"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, ChevronRight, CheckCircle, Star, Users, ThumbsUp, HelpCircle, ArrowRight,
} from "lucide-react";
import { servicesData } from "@/config/data";
import { getSite, telHref, waHref } from "@/lib/site";
import { getHomeContent, getGallery, getHomeFeaturedArticles } from "@/lib/pages";
import { CmsImage } from "@/components/CmsImage";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

import Brands from "@/components/Brands";

export default function Home() {
  const site = getSite();
  const { contact, faqs, reviews } = site;
  const h = getHomeContent();
  const { items: galeriOğeleri } = getGallery();
  const öneÇıkanYazılar = getHomeFeaturedArticles(h.bilgiKosesi.anasayfaKartSayisi);
  const hero = h.hero;

  return (
    <div className="bg-white font-sans text-slate-900 pb-20 md:pb-0">

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 md:pt-16 md:pb-24 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-blue-50 blur-[100px] rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-red-50 blur-[100px] rounded-full opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-white text-fire-red px-6 py-3 rounded-full font-black text-lg mb-6 shadow-md border-2 border-red-50 hover:shadow-lg transition-shadow">
                <Users className="w-6 h-6" /> {hero.badgeText}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6">
                {hero.titleLine1}{" "}
                <span className="text-blue-500">{hero.titleHighlight}</span>
                <br />
                {hero.titleLine2}
                <br className="hidden md:block" /> {hero.titleLine3}
              </h1>

              <p className="text-xl text-slate-600 mb-8 font-medium">
                {h.heroSubtitle}
              </p>

              <div className="flex flex-col gap-3 mb-10 w-full sm:w-fit">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a href={telHref(contact.phoneE164)} className="bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-3 flex-1">
                    <Phone className="w-6 h-6 animate-pulse" /> HEMEN ARA
                  </a>
                  <a href={waHref(contact.whatsappE164, contact.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-md group flex-1">
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" /> Danışmanlık Al
                  </a>
                </div>
                <a href={telHref(contact.phoneE164)} className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl flex items-center justify-center text-3xl font-black tracking-widest shadow-lg border-2 border-slate-800 transition-colors">
                  {contact.phoneDisplay}
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-700">
                {h.trustBadges.map((rozet, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-green-500" /> {rozet.metin}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                <CmsImage
                  src={hero.heroImage}
                  alt={hero.heroImageAlt}
                  width={800}
                  height={1000}
                  priority
                  className="object-cover h-[500px] md:h-[600px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="font-bold text-lg">{hero.heroCaption}</p>
                </div>
              </div>

              <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-50 flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-500"><Users className="w-6 h-6" /></div>
                <div>
                  <div className="text-2xl font-black text-slate-900">{hero.floatingStatValue}</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">{hero.floatingStatLabel}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Brands Banner */}
      <Brands />

      {/* Why Choose Us & Areas */}
      <section id="hakkimizda" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-2">{h.hakkimizda.eyebrow}</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">{h.hakkimizda.title}</h3>
            <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
              {h.hakkimizda.description}
            </p>
            <ul className="space-y-4 mb-8">
              {h.hakkimizda.bullets.map((satır, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-white shadow-sm p-3 rounded-lg">
                  <CheckCircle className="text-blue-500 w-6 h-6 shrink-0" /> {satır.metin}
                </li>
              ))}
            </ul>
            <Link href="/kurumsal" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              {h.hakkimizda.ctaText} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="bg-slate-900 text-white rounded-[2rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
            <MapPin className="w-12 h-12 text-fire-red mb-6" />
            <h4 className="text-2xl md:text-3xl font-black mb-4">{h.bolgeler.title}</h4>
            <p className="text-slate-300 font-medium mb-6 text-lg">{h.bolgeler.description}</p>
            <div className="space-y-4">
              {h.bolgeler.cards.map((kart, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <span className="font-bold text-xl block mb-1">{kart.title}</span>
                  <span className="text-sm text-slate-400">{kart.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-fire-red font-black uppercase tracking-widest text-lg mb-3">{h.hizmetlerBaslik.eyebrow}</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">{h.hizmetlerBaslik.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <Link href={`/hizmetler/${service.slug}`} key={index} className="group bg-slate-50 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-50 transform hover:-translate-y-2 flex flex-col overflow-hidden">
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-200">
                  <Image src={service.image} alt={service.title} width={400} height={300} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent mix-blend-multiply"></div>
                  <div className={`absolute -bottom-6 right-6 ${service.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white z-10`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-8 pb-10 flex flex-col items-start flex-1 mt-4">
                  <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-blue-500 transition-colors">{service.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium mb-8 text-sm">{service.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-blue-500 font-black uppercase text-xs tracking-widest group/link">
                    {h.hizmetKartCta} <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Galeri / Yapılan İşlemler */}
      <section id="galeri" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-fire-red font-black uppercase tracking-widest text-lg mb-3">{h.galeriBaslik.eyebrow}</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">{h.galeriBaslik.title}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {galeriOğeleri.map((öğe, idx) => {
              const etiket = öğe.tag || h.galeriKart.varsayilanEtiket;
              return (
                <div key={`${öğe.image}-${idx}`} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 aspect-square bg-slate-200">
                  <CmsImage
                    src={öğe.image}
                    alt={öğe.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-left w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-blue-500 font-black text-xs uppercase tracking-widest block mb-1">{etiket}</span>
                      <span className="text-white font-bold text-lg">{öğe.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url('${h.testimonials.backgroundImageUrl}')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <ThumbsUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-black mb-4">{h.testimonials.title}</h2>
            <p className="text-xl text-slate-400">{h.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 relative flex flex-col items-center text-center">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  {Array.from({ length: Math.min(5, Math.max(1, review.rating)) }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 font-medium italic mb-6 leading-relaxed text-sm flex-1">
                  &ldquo;{review.body}&rdquo;
                </p>
                <div className="mt-auto">
                  <div className="font-black text-white text-base">{review.name}</div>
                  <div className="text-xs font-bold text-blue-500 mt-1">{review.location || "Malatya"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bilgi Köşesi / Blog Mini */}
      <section id="bilgiler" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-3">{h.bilgiKosesi.eyebrow}</h2>
              <h3 className="text-4xl font-black text-slate-900">{h.bilgiKosesi.title}</h3>
            </div>
            <Link href="/bilgiler" className="hidden md:flex items-center gap-2 text-blue-500 font-bold hover:text-blue-600 transition-colors">
              {h.bilgiKosesi.linkText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {öneÇıkanYazılar.map((makale) => (
              <Link
                key={makale.id}
                href={`/bilgiler#${makale.id}`}
                className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-slate-50"
              >
                <div className="h-48 overflow-hidden bg-slate-200 relative">
                  <CmsImage
                    src={makale.image}
                    alt={makale.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">{makale.category}</div>
                  <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">{makale.title}</h4>
                  <p className="text-slate-500 font-medium text-sm">{makale.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/bilgiler" className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors">
              {h.bilgiKosesi.linkText} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-slate-900 mb-4">{h.sssBolumu.baslik}</h2>
            <p className="text-slate-600 font-medium text-lg">{h.sssBolumu.altBaslik}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 pb-6 group hover:shadow-md transition-shadow">
                <h4 className="text-xl font-black text-slate-900 mb-3 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" /> {faq.q}
                </h4>
                <p className="text-slate-600 font-medium pl-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
