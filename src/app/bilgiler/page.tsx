"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, BookOpen, ChevronRight } from "lucide-react";
import { servicesData } from "@/config/data";

export default function Bilgiler() {
  const articles = [
    {
      id: "hidrofor-basinci",
      category: "Rehber",
      title: "Hidrofor Basıncı Neden Düşer?",
      content: "Hidrofor sistemlerinde en sık karşılaşılan sorunlardan biri basıncın aniden düşmesi veya dalgalanmasıdır. Bunun temel sebepleri arasında genleşme tankının zarının (membran) patlaması, sistemde hava dengesizliği veya şebeke su basıncının aşırı düşük olması yer alır. Ayrıca basınç şalterinin oksitlenmesi veya ayarının bozulması da pompanın doğru zamanda devreye girmemesine neden olur. Bu durumlarda tankın hava basınç kontrolü yapılmalı ve membran yırtıksa değiştirilmelidir. Evde kendi başınıza yapabileceğiniz ilk şey gösterge saatindeki (manometre) basınç değerini kontrol etmektir.",
      image: "/images/galeri/galeri-1.jpg"
    },
    {
      id: "periyodik-bakim-tasarrufu",
      category: "Tasarruf",
      title: "Periyodik Bakım Tasarruf Sağlar Mı?",
      content: "Kesinlikle evet. Zamanla kireçlenen pompalar, paslanan motor rulmanları ve dengesi bozulan genleşme tankları, sistemi olması gerekenden çok daha fazla yorar. Zorlanan bir motor, suyu basmak için normalden iki kat daha fazla elektrik enerjisi çekebilir. Ayrıca sızdıran çekvalfler nedeniyle hidrofor sürekli boşuna çalışır. Yılda bir kez yapılan detaylı periyodik bakım (pano kontaklarının temizlenmesi, rulman yağlaması ve basınç ayarları) sistemin ilk günkü verimiyle çalışıp elektrik faturalarından ciddi bir tasarruf etmenizi sağlar.",
      image: "/images/galeri/galeri-2.jpg"
    },
    {
      id: "motor-yanmasi",
      category: "Teknik Bilgi",
      title: "Motor Neden Yanar ve Nasıl Sarılır?",
      content: "Dalgıç ve hidrofor motorlarının yanma sebepleri genellikle düşük/yüksek elektrik voltajı, panodaki termik röle arızaları, susuz çalışma ya da içine su kaçması (izolasyon hatası) dır. Motor yandığında sistem kilitlenir. Ak Dalgıç Pompa olarak, yanmış motorları yerinden söküyor ve tesisimizde karkas izolasyonu, bobin sarımı ve profesyonel vernik kurutma teknolojisiyle yeniden hayata döndürüyoruz. Doğru kalite bakır tel kullanımı, motorun fabrikasyon standartlarda, hatta bazen eskisinden daha dayanıklı şekilde çalışmasını sağlar.",
      image: "/images/galeri/galeri-3.jpg"
    }
  ];

  return (
    <div className="bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">

      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <Image src="/images/hero/ana-sayfa-hero.jpg" alt="Bilgiler Hero" fill className="object-cover" />
           <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Bilgibank & Hizmetler</h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl mx-auto">Ustamın kaleminden öneriler ve sunduğumuz profesyonel hizmetler.</p>
        </div>
      </section>

      {/* Blog Articles */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
             <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-3">Blog</h2>
             <h3 className="text-3xl md:text-4xl font-black text-slate-900">Usta'dan Öneriler</h3>
          </div>
          <div className="space-y-16">
            {articles.map((article, idx) => (
              <div key={idx} id={article.id} className="grid md:grid-cols-5 gap-8 items-center bg-slate-50 p-6 md:p-10 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow">
                
                <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg h-64 md:h-auto relative aspect-video md:aspect-square lg:aspect-[4/3]">
                   <Image src={article.image} alt={article.title} fill className="object-cover" />
                </div>
                
                <div className="md:col-span-3">
                  <div className="text-xs font-black text-blue-500 uppercase tracking-widest mb-3 bg-blue-100/50 inline-block px-3 py-1 rounded-full">{article.category}</div>
                  <h2 className="text-3xl font-black text-slate-900 mb-6">{article.title}</h2>
                  <p className="text-slate-600 leading-relaxed font-medium text-lg">
                    {article.content}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid Integration */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
             <h2 className="text-blue-600 font-black uppercase tracking-widest text-sm mb-3">Tüm Kapsam</h2>
             <h3 className="text-3xl md:text-4xl font-black text-slate-900">Hizmetlerimiz</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <Link href={`/hizmetler/${service.slug}`} key={index} className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-50 transform hover:-translate-y-2 flex flex-col overflow-hidden">
                <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                  <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent mix-blend-multiply"></div>
                  <div className={`absolute -bottom-6 right-6 ${service.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white z-10`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-8 pb-10 flex flex-col items-start flex-1 mt-4">
                  <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-blue-500 transition-colors">{service.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium mb-8 text-sm line-clamp-3">{service.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-blue-500 font-black uppercase text-xs tracking-widest group-hover:translate-x-1 transition-transform">
                    Hizmet Detayı <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-blue-600 text-white p-12 rounded-3xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-white rounded-full blur-[80px] opacity-20"></div>
             <h3 className="text-3xl font-black mb-4">Sisteminizde farklı bir arıza mı var?</h3>
             <p className="text-blue-100 text-lg font-medium mb-8">Ücretsiz arıza tespiti ve danışmanlık hizmeti almak için bizi 7/24 arayabilirsiniz.</p>
             <a href="tel:+905433363944" className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-lg shadow-xl hover:bg-slate-50 transition-colors">
                <Phone className="w-6 h-6" /> Hemen Ara
             </a>
          </div>
        </div>
      </section>

    </div>
  );
}
