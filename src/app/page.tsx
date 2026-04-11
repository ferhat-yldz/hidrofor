"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Wrench, Droplet, Sun, Thermometer, ShieldCheck, MapPin, Phone,
  Mail, ChevronRight, Clock, Award, ChevronDown, CheckCircle, Star,
  Users, ThumbsUp, HelpCircle, ArrowRight, Activity, Waves, Zap, Target, Zap as Bolt
} from "lucide-react";
import { servicesData } from "@/config/data";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

import Brands from "@/components/Brands";

export default function Home() {

  const faqs = [
    {
      q: "Hidrofor bakımı ne sıklıkla yapılmalı?",
      a: "Sistemin ömrünü uzatmak ve enerji tasarrufu sağlamak için yılda bir kez detaylı kontrol önerilir."
    },
    {
      q: "Arıza durumunda ne kadar sürede ulaşıyorsunuz?",
      a: "Malatya merkez ve çevre ilçelere hızlı servis garantisi ile acil müdahale ekibimiz en kısa sürede ulaşmaktadır."
    },
    {
      q: "Pompa montajı sonrası garanti veriyor musunuz?",
      a: "Evet, tüm teknik destek ve montaj işlemlerimiz %100 garantili işçilik prensibiyle gerçekleştirilmektedir."
    },
    {
      q: "Fiyatlar neye göre değişir?",
      a: "Kaçak tespitine veya derin kuyunun sondaj ihtiyacına göre yerinde arıza tespiti sonrası en uygun fiyat verilmektedir."
    },
    {
      q: "Motor sarım işlemi kaç gün sürüyor?",
      a: "Fabrikasyon standartlarında orijinal izolasyonlarla yapılan sarım işlemleri arızanın durumuna göre ortalama 1-2 gün sürmektedir."
    },
    {
      q: "Depomdaki su basıncı neden sürekli dalgalanıyor?",
      a: "Genellikle genleşme tankındaki membran yırtığı veya basınç şalteri ayarsızlığından kaynaklanır. Hızlıca tamir edilebilir."
    },
    {
      q: "Kuyu sondajı için keşif ücretli mi?",
      a: "Hayır. Uzman ekibimiz jeolojik yapıya uygun keşifleri tamamen ücretsiz olarak yapmaktadır."
    },
    {
      q: "Pano tamamen yandıysa yenilenmesi mi gerekir?",
      a: "Hasarın boyutuna göre sadece kontaktör/röle takımı değişebilir ya da yepyeni akıllı dijital pano eklenebilir."
    }
  ];

  const reviews = [
    {
      name: "Ali Rıza Coşkun",
      body: "Gece hidrofor arızalandı ve tüm site susuz kaldı. Çok kısa sürede ulaşıp hızlıca onardılar. Çok teşekkürler.",
      rating: 5,
      location: "Yeşilyurt"
    },
    {
      name: "Mehmet Kılıç",
      body: "Kuyu pompası yanmıştı, yenisinin montajını kusursuz ve oldukça profesyonelce tamamladılar. Güvenilir hizmet.",
      rating: 5,
      location: "Battalgazi"
    },
    {
      name: "Ayberk Şahin",
      body: "Pano arızası yüzünden sürekli sigorta atıyordu. Kerem Usta gelip pano tamirini ustalıkla çözdü. Kesinlikle tavsiye ederim.",
      rating: 5,
      location: "Doğanşehir"
    },
    {
      name: "Süleyman Aksoy",
      body: "Sondaj suyu basıncı hep düşüktü, genleşme tankını söküp değiştirdiler şu an tazyikli su alıyoruz. Harika işçilik.",
      rating: 5,
      location: "Akçadağ"
    },
    {
      name: "Cemil Demir",
      body: "Sabahın 4'ünde bahçe motoru su basmayı kesti. Ustayı aradım ve anında geldi. İşinin ehline denk gelmek büyük şans.",
      rating: 5,
      location: "Darende"
    }
  ];

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
                <Users className="w-6 h-6" /> M. Kerem Akarslan
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-6">
                AK <span className="text-blue-500">HİDROFOR</span><br />
                Dalgıç Pompa<br className="hidden md:block" /> Ve Mekanik
              </h1>

              <p className="text-xl text-slate-600 mb-8 font-medium">
                Malatya ve çevresinde 7/24 profesyonel hidrofor ve pompa çözümleri. Sisteminize en uygun çözümler ile uzman kadromuz her daim yanınızda.
              </p>

              <div className="flex flex-col gap-3 mb-10 w-full sm:w-fit">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <a href="tel:+905433363944" className="bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-3 flex-1">
                    <Phone className="w-6 h-6 animate-pulse" /> HEMEN ARA
                  </a>
                  <a href="https://wa.me/905433363944?text=Merhaba,%20bilgi%20almak%20istiyorum." target="_blank" className="bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-md group flex-1">
                    <WhatsAppIcon className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" /> Danışmanlık Al
                  </a>
                </div>
                <a href="tel:+905433363944" className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl flex items-center justify-center text-3xl font-black tracking-widest shadow-lg border-2 border-slate-800 transition-colors">
                  0543 336 39 44
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-700">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> 7/24 Kesintisiz Hizmet</div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> %100 Garantili İşçilik</div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> Profesyonel Çözüm</div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> 15+ Yıl Tecrübe</div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="/images/hero/ana-sayfa-hero.jpg"
                  alt="Hidrofor ve Pompa Sistemleri"
                  width={800}
                  height={1000}
                  priority
                  className="object-cover h-[500px] md:h-[600px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="font-bold text-lg">Yüksek Verimli Hidrofor ve Pompa Sistemleri</p>
                </div>
              </div>

              <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-50 flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl text-blue-500"><Users className="w-6 h-6" /></div>
                <div>
                  <div className="text-2xl font-black text-slate-900">1000+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Mutlu Müşteri</div>
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
            <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-2">Farkımız</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">SUYUNUZ GÜVENDE</h3>
            <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
              Ak Dalgıç Pompa olarak, yılların verdiği tecrübe ve uzman kadromuzla Malatya genelinde hidrofor ve pompa sistemleriniz için kalıcı çözümler üretiyoruz.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-white shadow-sm p-3 rounded-lg"><CheckCircle className="text-blue-500 w-6 h-6 shrink-0" /> Profesyonel Kuyu Sondaj ve Etüt</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-white shadow-sm p-3 rounded-lg"><CheckCircle className="text-blue-500 w-6 h-6 shrink-0" /> Yerinde Arıza Tespiti ve Danışmanlık</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-white shadow-sm p-3 rounded-lg"><CheckCircle className="text-blue-500 w-6 h-6 shrink-0" /> Depo Hijyeni (Sağlık Bakanlığı Standartlarında)</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-white shadow-sm p-3 rounded-lg"><CheckCircle className="text-blue-500 w-6 h-6 shrink-0" /> Elektrofüzyon Kaynak İle Sızdırmaz Boru Birleştirme</li>
            </ul>
            <Link href="/kurumsal" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Hakkımızda Daha Fazla Bilgi <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="bg-slate-900 text-white rounded-[2rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
            <MapPin className="w-12 h-12 text-fire-red mb-6" />
            <h4 className="text-2xl md:text-3xl font-black mb-4">Hizmet Verilen Bölgeler</h4>
            <p className="text-slate-300 font-medium mb-6 text-lg">Acil altyapı donanımımız ile mesafeleri dert etmiyoruz. Profesyonel çözümler için bir telefon uzağınızdayız.</p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="font-bold text-xl block mb-1">Malatya Tüm İlçeler</span>
                <span className="text-sm text-slate-400">Battalgazi, Yeşilyurt, Doğanşehir (Tüm Merkez ve Çevre Mahalleler)</span>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="font-bold text-xl block mb-1">7/24 Teknik Destek Ekibi</span>
                <span className="text-sm text-slate-400">Hidrofor kurulumu, dalgıç pompa ve diğer tüm mekanik taleplerinizde anında yola çıkıyoruz.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-fire-red font-black uppercase tracking-widest text-lg mb-3">Uzmanlık Alanlarımız</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Profesyonel Çözümler</h3>
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
                    Hizmet Detayı İçin Tıklayın <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
          <h2 className="text-fire-red font-black uppercase tracking-widest text-lg mb-3">İşlerimiz</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">Tamamlanan İşler & Galeri</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const src = `/images/galeri/galeri-${num}.jpg`;

              return (
                <div key={num} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 aspect-square bg-slate-200">
                  <Image src={src} alt={`Galeri ${num}`} width={400} height={400} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-left w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-blue-500 font-black text-xs uppercase tracking-widest block mb-1">REFERANS</span>
                      <span className="text-white font-bold text-lg">Hizmet #{num}</span>
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
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621250262100-362f6b8a8b13?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <ThumbsUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-black mb-4">Müşterilerimiz Neler Diyor?</h2>
            <p className="text-xl text-slate-400">Yüzlerce başarılı servis ve mutlu müşteri ile güveniniz teminatımızdır.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 relative flex flex-col items-center text-center">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-slate-200 font-medium italic mb-6 leading-relaxed text-sm flex-1">"{review.body}"</p>
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
              <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-3">Bilgibank</h2>
              <h3 className="text-4xl font-black text-slate-900">Usta'dan Öneriler (Blog)</h3>
            </div>
            <Link href="/bilgiler" className="hidden md:flex items-center gap-2 text-blue-500 font-bold hover:text-blue-600 transition-colors">
              Tüm Bilgileri Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/bilgiler" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-slate-50">
              <div className="h-48 overflow-hidden bg-slate-200">
                <Image src="/images/galeri/galeri-1.jpg" alt="Pano arızası" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Rehber</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Hidrofor Basıncı Neden Düşer?</h4>
                <p className="text-slate-500 font-medium text-sm">Genleşme tankınızın membranı patlamış veya sisteme hava dolmuş olabilir, doğru kalibrasyonla çözülür...</p>
              </div>
            </Link>

            <Link href="/bilgiler" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-slate-50">
              <div className="h-48 overflow-hidden bg-slate-200">
                <Image src="/images/galeri/galeri-2.jpg" alt="Kuyu Sondaj" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Tasarruf</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Periyodik Bakım Tasarruf Sağlar Mı?</h4>
                <p className="text-slate-500 font-medium text-sm">Paslanmış ve yorulmuş motorlar çok yüksek devirlerde dahi basınç sağlamaz, gereksiz enerji tüketir...</p>
              </div>
            </Link>

            <Link href="/bilgiler" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all bg-slate-50">
              <div className="h-48 overflow-hidden bg-slate-200">
                <Image src="/images/galeri/galeri-3.jpg" alt="Motor Sarım" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3">Teknik Bilgi</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Motor Neden Yanar ve Nasıl Sarılır?</h4>
                <p className="text-slate-500 font-medium text-sm">Pano otomasyon arızası veya aşınma yüzünden yanan motorlar, titiz izolasyon ile fabrikasyon standartlarda...</p>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/bilgiler" className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-100 transition-colors">
              Tüm Bilgileri Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-slate-900 mb-4">Sık Sorulan Sorular</h2>
            <p className="text-slate-600 font-medium text-lg">Hizmetlerimizle ilgili aklınıza takılan sorulara en net yanıtlarımız.</p>
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
