"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Wrench, Droplet, Sun, Thermometer, ShieldCheck, MapPin, Phone,
  Mail, ChevronRight, Clock, Award, ChevronDown, CheckCircle, Star,
  Users, ThumbsUp, HelpCircle, ArrowRight, Menu, X
} from "lucide-react";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.571-.012c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const services = [
    {
      title: "Detaylı Kombi Bakımı ve Arıza Onarımı",
      description: "Kombilerinizin kışa hazırlığı, petek temizliği ve uzman onarım hizmetleri. Sıcak yuvanız için yanınızdayız.",
      icon: <Thermometer className="w-8 h-8 text-fire-red" />,
      color: "bg-red-50",
      accent: "border-fire-red",
      image: "/images/kombi-bakimi.jpeg"
    },
    {
      title: "Cihazlı Su Kaçak Tespiti",
      description: "Kırmadan dökmeden, akustik dinleme ve termal kameralarla garantili su kaçağı tespiti.",
      icon: <Droplet className="w-8 h-8 text-turquoise-primary" />,
      color: "bg-cyan-50",
      accent: "border-turquoise-primary",
      image: "/images/su-kacagi-tespiti.jpeg"
    },
    {
      title: "İlaçsız Darbeli Petek Temizliği",
      description: "Özel makinelerle yapılan darbeli temizlik sayesinde ısınma kapasitesini artırın ve yakıt tasarrufu sağlayın.",
      icon: <ShieldCheck className="w-8 h-8 text-turquoise-primary" />,
      color: "bg-cyan-50",
      accent: "border-turquoise-primary",
      image: "/images/petek-temizligi.jpeg"
    },
    {
      title: "Güneş Enerji Sistemleri",
      description: "Dört mevsim sıcak su konforu için yazlık ve kışlık güneş enerji sistemlerinin kurulumu.",
      icon: <Sun className="w-8 h-8 text-orange-500" />,
      color: "bg-orange-50",
      accent: "border-orange-500",
      image: "/images/gunes-enerjisi.jpeg"
    },
    {
      title: "Termosifon Montajı ve Satışı",
      description: "İhtiyacınıza uygun kaliteli termosifonların satışı ve garantili profesyonel montaj hizmeti.",
      icon: <Wrench className="w-8 h-8 text-slate-700" />,
      color: "bg-slate-50",
      accent: "border-slate-400",
      image: "/images/termosifon-montaji.jpeg"
    },
    {
      title: "Kanalizasyon ve Gider Temizliği",
      description: "Profesyonel makineler ile tıkanıklık açma ve gider borularının temizliği işlemleri.",
      icon: <Award className="w-8 h-8 text-turquoise-primary" />,
      color: "bg-cyan-50",
      accent: "border-turquoise-primary",
      image: "https://images.unsplash.com/photo-1595180470217-0b1e42dd6ba2?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const faqs = [
    {
      q: "Su kaçağı nasıl anlaşılır?",
      a: "Tesisat borularındaki su kaçakları alt kata su damlaması, parkelerde şişme, duvarlarda rutubet ve olağandışı yüksek su faturalarıyla tespit edilebilir."
    },
    {
      q: "Kombi bakımı ne kadar sürer?",
      a: "Detaylı kombi bakımı ortalama 45 dakika ile 1 saat arasında sürmektedir. Fan, eşanjör, filtre temizliği ve gaz ayarı titizlikle yapılır."
    },
    {
      q: "Petek temizliği kaç yılda bir yapılmalı?",
      a: "Isı verimi ve yakıt tasarrufu için petek tesisatının cihazla temizliği ortalama olarak 2 yılda bir önerilmektedir."
    },
    {
      q: "Fiyatlar neye göre değişir?",
      a: "Kırılan bölge, kullanılacak malzemenin türü ve kaçağın / arızanın kompleksliğine göre değişir. Net fiyat ancak kaçak tespiti sonrası verilebilir."
    }
  ];

  const reviews = [
    {
      name: "Ahmet Yılmaz",
      body: "Gece saat 02:00'de patlayan borumuz için aradım, 20 dakikada Malatya merkeze ulaştılar. Kırmadan tespit edip onardılar. Çok teşekkürler.",
      rating: 5
    },
    {
      name: "Elif Demir",
      body: "Alt kata su sızıyordu, günlerce usta bekledim. GAP Yapı cihazla 10 dakikada kaçağı buldu. Sadece tek fayansta hallettiler. Garantili ve güvenilir hizmet.",
      rating: 5
    },
    {
      name: "Mustafa Çelik",
      body: "Kış gelmeden petekleri temizlettik, evin ısınması inanılmaz değişti. Çok temiz ve profesyonel çalıştılar. Kesinlikle tavsiye ederim.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20 md:pb-0">

      {/* Top Warning Bar */}
      <div className="bg-fire-red text-white text-center text-sm font-bold py-2 px-4 shadow-sm relative z-[101]">
        Malatya Tesisat Acil Servis | 30 Dakikada Adresinizdeyiz! <a href="tel:+905352456603" className="underline ml-2">Hemen Ara</a>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-[100] border-b border-slate-100 flex items-center shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center relative py-3 lg:py-0">
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <Image src="/logo.jpeg" alt="GAP Sıhhi Tesisat" width={55} height={55} style={{ width: "auto", height: "auto" }} className="rounded-full shadow-md transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter leading-none">
                GAP <span className="text-turquoise-primary">YAPI</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Sıhhi Tesisat</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 h-20">
            <a href="#" className="font-bold text-slate-600 hover:text-turquoise-primary transition-colors">Anasayfa</a>
            <a href="#hakkimizda" className="font-bold text-slate-600 hover:text-turquoise-primary transition-colors">Hakkımızda</a>

            <div className="relative group h-full flex items-center">
              <a href="#hizmetler" className="font-bold text-slate-600 group-hover:text-turquoise-primary transition-colors flex items-center gap-1">
                Hizmetlerimiz <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </a>
              <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl rounded-xl p-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-4 group-hover:translate-y-0 border border-slate-100 before:absolute antes:-top-2 before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-b-white">
                <div className="flex flex-col gap-1 relative z-10">
                  {services.map((service, idx) => (
                    <a key={idx} href="#hizmetler" className="px-3 py-2.5 hover:bg-turquoise-soft rounded-lg text-slate-700 text-sm font-bold hover:text-turquoise-primary transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-turquoise-primary block"></span>
                      {service.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <a href="#galeri" className="font-bold text-slate-600 hover:text-turquoise-primary transition-colors">Galeri</a>
            <a href="#bilgiler" className="font-bold text-slate-600 hover:text-turquoise-primary transition-colors">Bilgiler</a>
            <a href="#iletisim" className="font-bold text-slate-600 hover:text-turquoise-primary transition-colors">İletişim</a>

            <a href="https://wa.me/905352456603" target="_blank" className="bg-[#25D366] hover:bg-green-600 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-green-200 transition-all transform hover:scale-105 flex items-center gap-2">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-turquoise-primary transition-colors z-[110]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

      </nav>

      {/* Hero Section */}
      <section className="relative pt-6 pb-20 md:pt-16 md:pb-24 overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-turquoise-soft blur-[100px] rounded-full opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-red-50 blur-[100px] rounded-full opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-white text-fire-red px-4 py-2 rounded-full font-bold text-sm mb-6 shadow-sm border border-red-100">
                <Wrench className="w-4 h-4" /> Güvenilir, Temiz, Garantili Hizmet
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Malatya'da <br className="hidden md:block" />
                <span className="text-turquoise-primary">Kırmadan</span> Su Kaçağı Tespiti
              </h1>

              <p className="text-xl text-slate-600 mb-8 font-medium">
                30 dakikada servis garantisi. Su kaçaklarını noktasal buluyor, tesisatınızı aynı gün onarıyoruz. Evinize hasar vermeden üstün teknoloji ile hizmetinizdeyiz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="tel:+905352456603" className="bg-fire-red hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black text-lg shadow-xl shadow-red-200 transition-all flex items-center justify-center gap-3">
                  <Phone className="w-6 h-6 animate-pulse" /> 0535 245 66 03
                </a>
                <a href="https://wa.me/905352456603?text=Merhaba,%20fiyat%20almak%20istiyorum." target="_blank" className="bg-white border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white px-8 py-4 rounded-xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-md group">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366] group-hover:text-white transition-colors" /> Foto Gönder Fiyat Al
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-700">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> 15+ Yıl Deneyim</div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> %100 Garantili İşçilik</div>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-100"><CheckCircle className="w-4 h-4 text-green-500" /> Yetkili Usta</div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=2600&auto=format&fit=crop"
                  alt="Su Kaçağı Tespiti Malatya"
                  width={800}
                  height={1000}
                  priority
                  className="object-cover h-[500px] md:h-[600px] w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white text-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="font-bold text-lg">Kameralı ve Akustik Cihazla Noktasal Tespit</p>
                </div>
              </div>

              <div className="absolute top-10 -left-6 bg-white p-4 rounded-2xl shadow-xl z-20 border border-slate-50 flex items-center gap-4">
                <div className="bg-turquoise-soft p-3 rounded-xl text-turquoise-primary"><Users className="w-6 h-6" /></div>
                <div>
                  <div className="text-2xl font-black text-slate-900">1000+</div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Mutlu Müşteri</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Areas */}
      <section id="hakkimizda" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-2">Farkımız</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">Neden Bizi Seçmelisiniz?</h3>
            <p className="text-slate-600 mb-8 text-lg font-medium leading-relaxed">
              Tesisat sorunları ertelenmeye gelmez. Uzman ekibimiz ve modern son teknoloji cihazlarımız sayesinde tesisatınızı kırıp dökmeden, evinize hasar vermeden tamir ediyoruz.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-slate-50 p-3 rounded-lg"><CheckCircle className="text-turquoise-primary w-6 h-6 shrink-0" /> 15+ Yıllık Sektör Deneyimi</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-slate-50 p-3 rounded-lg"><CheckCircle className="text-turquoise-primary w-6 h-6 shrink-0" /> Kırmadan Kameralı Noktasal Tespit</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-slate-50 p-3 rounded-lg"><CheckCircle className="text-turquoise-primary w-6 h-6 shrink-0" /> Malzeme ve İşçilikte %100 Garanti</li>
              <li className="flex items-center gap-3 text-lg font-bold text-slate-800 bg-slate-50 p-3 rounded-lg"><CheckCircle className="text-turquoise-primary w-6 h-6 shrink-0" /> Aynı Gün Çözüm ve Teslimat</li>
            </ul>
          </div>
          <div className="bg-slate-900 text-white rounded-[2rem] p-10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-turquoise-primary rounded-full blur-[80px] opacity-20"></div>
            <MapPin className="w-12 h-12 text-fire-red mb-6" />
            <h4 className="text-2xl md:text-3xl font-black mb-4">Hizmet Verilen Bölgeler</h4>
            <p className="text-slate-300 font-medium mb-6 text-lg">GAP Yapı olarak lokal değil, bölgesel çalışıyoruz. Müşterilerimizin tesisat sorunları için anında yola çıkıyoruz.</p>
            <div className="space-y-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="font-bold text-xl block mb-1">Malatya Tüm İlçeler</span>
                <span className="text-sm text-slate-400">Battalgazi, Yeşilyurt, Doğanşehir, Akçadağ (Tüm Merkez ve Çevre Mahalleler)</span>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/20">
                <span className="font-bold text-xl block mb-1">Tüm Malatya Geneline Servis</span>
                <span className="text-sm text-slate-400">Acil altyapı donanımımız ile mesafeleri dert etmiyoruz. En uzak köyden merkeze kadar ulaşıyoruz.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="hizmetler" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-3">Uzmanlık Alanlarımız</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Profesyonel Teknik Hizmetler</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-turquoise-soft transform hover:-translate-y-2 flex flex-col overflow-hidden">
                <div className="relative h-64 md:h-80 w-full overflow-hidden bg-slate-100">
                  <Image src={service.image} alt={service.title} width={400} height={300} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent mix-blend-multiply"></div>
                  <div className={`absolute -bottom-6 right-6 ${service.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white z-10`}>
                    {service.icon}
                  </div>
                </div>
                <div className="p-8 pb-10 flex flex-col items-start flex-1 mt-4">
                  <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight group-hover:text-turquoise-primary transition-colors">{service.title}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium mb-8 text-sm">{service.description}</p>
                  <div className="mt-auto flex items-center gap-2 text-turquoise-primary font-black uppercase text-xs tracking-widest cursor-pointer group/link">
                    Hemen Bilgi Al <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referanslar (Öncesi - Sonrası) */}
      <section id="galeri" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-fire-red font-black uppercase tracking-widest text-sm mb-3">İşimizi Konuştursun</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-16">Öncesi ve Sonrası (Referanslar)</h3>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <div className="absolute top-2 left-2 bg-fire-red text-white text-xs font-bold px-2 py-1 rounded z-10">ÖNCESİ</div>
                  <Image src="https://images.unsplash.com/photo-1585909613179-88ae57467362?q=80&w=1000&auto=format&fit=crop" width={400} height={300} alt="Gider Tıkanıklığı" className="object-cover h-full w-full grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <div className="absolute top-2 right-2 bg-turquoise-primary text-white text-xs font-bold px-2 py-1 rounded z-10">SONRASI</div>
                  <Image src="https://images.unsplash.com/photo-1521206698660-5735e5ffc844?q=80&w=1000&auto=format&fit=crop" width={400} height={300} alt="Temiz Gider" className="object-cover h-full w-full" />
                </div>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Tıkalı Gider Açma</h4>
              <p className="text-slate-600 mb-4 font-medium">Banyo zemininde yıllanmış tıkanma kırmadan özel robot cihazla açıldı ve yıkanarak teslim edildi.</p>
              <div className="bg-white p-3 rounded-lg border border-slate-100 italic text-sm text-slate-500 shadow-sm">
                "Kırılacak diye korktum ama makine ile 15 dakikada açtılar." - Müşteri
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 shadow-sm">
              <div className="grid grid-cols-2 gap-2 mb-6">
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <div className="absolute top-2 left-2 bg-fire-red text-white text-xs font-bold px-2 py-1 rounded z-10">KIRMADAN</div>
                  <Image src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?q=80&w=1000&auto=format&fit=crop" width={400} height={300} alt="Termal Kamera Tespiti" className="object-cover h-full w-full" />
                </div>
                <div className="relative h-48 rounded-xl overflow-hidden group">
                  <div className="absolute top-2 right-2 bg-turquoise-primary text-white text-xs font-bold px-2 py-1 rounded z-10">NOKTASAL ONARIM</div>
                  <Image src="https://images.unsplash.com/photo-1621250262100-362f6b8a8b13?q=80&w=1000&auto=format&fit=crop" width={400} height={300} alt="Noktasal Tamir" className="object-cover h-full w-full" />
                </div>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Gizli Su Kaçağı Tespiti</h4>
              <p className="text-slate-600 mb-4 font-medium">Alt kata sızdıran gizli kaçak termal kameralarla tek fayansta bulundu, aynı gün onarım yapıldı.</p>
              <div className="bg-white p-3 rounded-lg border border-slate-100 italic text-sm text-slate-500 shadow-sm">
                "Tüm evi kıracaklar sandım tek fayansta bulup hallettiler, helal olsun." - Müşteri
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621250262100-362f6b8a8b13?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <ThumbsUp className="w-12 h-12 text-turquoise-primary mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-black mb-4">Müşterilerimiz Neler Diyor?</h2>
            <p className="text-xl text-slate-400">Yüzlerce başarılı servis ve mutlu müşteri ile güveniniz teminatımızdır.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 relative">
                <div className="flex gap-1 mb-4 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-slate-300 font-medium italic mb-6 leading-relaxed">"{review.body}"</p>
                <div className="font-black text-white">{review.name}</div>
                <div className="text-sm font-bold text-turquoise-primary mt-1">Malatya</div>
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
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <a href="#" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="h-48 overflow-hidden bg-slate-100">
                <Image src="https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1000&auto=format&fit=crop" alt="Su Kaçağı" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-turquoise-primary uppercase tracking-widest mb-3">Rehber</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Su Kaçağı Nasıl Bulunur? (Evde İlk Müdahale)</h4>
                <p className="text-slate-500 font-medium text-sm">Alt kata su damlıyorsa, fayans derzlerinde kararma varsa su kaçağından şüphelenebilirsiniz...</p>
              </div>
            </a>

            <a href="#" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="h-48 overflow-hidden bg-slate-100">
                <Image src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop" alt="Petek Temizliği" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-turquoise-primary uppercase tracking-widest mb-3">Tasarruf</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Petek Temizliği Tasarruf Sağlar Mı?</h4>
                <p className="text-slate-500 font-medium text-sm">Tıkanmış ve kireçlenmiş petekler suyu dolaştıramaz, ısı direkt kaba gider. İlaçlı temizlik %30...</p>
              </div>
            </a>

            <a href="#" className="group block border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
              <div className="h-48 overflow-hidden bg-slate-100">
                <Image src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop" alt="Kombi" width={400} height={200} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="text-xs font-bold text-turquoise-primary uppercase tracking-widest mb-3">Teknik Bilgi</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 group-hover:text-fire-red transition-colors">Kombi Neden Su Akıtır ve Basıncı Düşer?</h4>
                <p className="text-slate-500 font-medium text-sm">Düzenli bakımı yapılmayan kombilerin genleşme tankı zayıflar, basınç dengeleyemeyince siboptan...</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Sık Sorulan Sorular FAQ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-slate-900 mb-4">Sık Sorulan Sorular</h2>
            <p className="text-slate-600 font-medium text-lg">Hizmetlerimizle ilgili aklınıza takılan sorulara SEO odaklı en net yanıtlarımız.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 pb-6 group">
                <h4 className="text-xl font-black text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-turquoise-primary">?</span> {faq.q}
                </h4>
                <p className="text-slate-600 font-medium pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer Structure */}
      <footer id="iletisim" className="bg-slate-900 border-t border-slate-800 pt-20 pb-8 mt-10 text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            {/* Column 1: Info & Contact */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="relative bg-white p-1 rounded-full">
                  <Image src="/logo.jpeg" alt="GAP logo" width={45} height={45} style={{ width: "auto", height: "auto" }} className="rounded-full shadow-sm" />
                </div>
                <div className="text-2xl font-black text-white tracking-tighter">GAP <span className="text-turquoise-primary">YAPI</span></div>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 font-medium text-slate-300">
                  <MapPin className="w-6 h-6 text-turquoise-primary shrink-0 mt-1" />
                  <a href="https://www.google.com/maps/search/?api=1&query=Zafer,+Cumhuriyet+Cd.+44/A,+Bahçelievler+/+İstanbul" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors leading-relaxed">
                    Zafer, Cumhuriyet Cd. 44/A,<br />Bahçelievler / İstanbul
                  </a>
                </li>
                <li className="flex items-center gap-4 font-medium">
                  <Phone className="w-6 h-6 text-fire-red shrink-0" />
                  <a href="tel:+905414640538" className="hover:text-white transition-colors text-xl font-bold text-white">+90 541 464 05 38</a>
                </li>
                <li className="flex items-center gap-4 font-medium">
                  <Mail className="w-6 h-6 text-turquoise-primary shrink-0" />
                  <a href="mailto:gapyapi1@gmail.com" className="hover:text-white transition-colors">Mail İletişim</a>
                </li>
              </ul>
            </div>

            {/* Column 2: Working Hours */}
            <div>
              <h4 className="text-lg font-black text-white mb-8 uppercase tracking-wider relative inline-block">
                Çalışma Saatleri
                <div className="absolute -bottom-3 left-0 w-12 h-1 bg-turquoise-primary rounded-full"></div>
              </h4>
              <div className="space-y-8">
                <div>
                  <h5 className="font-bold text-slate-400 mb-2">Pazartesi - Cuma:</h5>
                  <p className="text-white font-black bg-turquoise-primary/20 border border-turquoise-primary/30 py-2 px-4 inline-block rounded-xl text-sm shadow-[0_0_15px_rgba(0,190,200,0.2)]">7/24 Kesintisiz Hizmet</p>
                </div>
                <div>
                  <h5 className="font-bold text-slate-400 mb-2">Cumartesi - Pazar:</h5>
                  <p className="text-white font-black bg-fire-red/20 border border-fire-red/30 py-2 px-4 inline-block rounded-xl text-sm shadow-[0_0_15px_rgba(255,50,0,0.2)]">7/24 Kesintisiz Hizmet</p>
                </div>
              </div>
            </div>

            {/* Column 3: Services */}
            <div>
              <h4 className="text-lg font-black text-white mb-8 uppercase tracking-wider relative inline-block">
                Hizmetler
                <div className="absolute -bottom-3 left-0 w-12 h-1 bg-turquoise-primary rounded-full"></div>
              </h4>
              <ul className="space-y-4">
                {services.map((service, idx) => (
                  <li key={idx}>
                    <a href="#hizmetler" className="hover:text-turquoise-primary transition-colors font-medium flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-turquoise-primary opacity-50 group-hover:translate-x-1 transition-transform" />
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Extra / Quick Links */}
            <div>
              <h4 className="text-lg font-black text-white mb-8 uppercase tracking-wider relative inline-block">
                Hızlı Bağlantılar
                <div className="absolute -bottom-3 left-0 w-12 h-1 bg-turquoise-primary rounded-full"></div>
              </h4>
              <ul className="space-y-4 font-medium">
                <li><a href="#" className="hover:text-turquoise-primary transition-colors block">Ana Sayfa</a></li>
                <li><a href="#hakkimizda" className="hover:text-turquoise-primary transition-colors block">Hakkımızda</a></li>
                <li><a href="#hizmetler" className="hover:text-turquoise-primary transition-colors block">Projeler / Galeri</a></li>
                <li><a href="#iletisim" className="hover:text-turquoise-primary transition-colors block">İletişim</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-medium text-slate-500">
              <p>© {new Date().getFullYear()} gapyapi.com Her Hakkı Saklıdır.</p>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700"></div>
              <div className="flex gap-5 font-bold">
                <a href="#" className="hover:text-white transition-colors">Anasayfa</a>
                <a href="#" className="hover:text-white transition-colors">Çerezler</a>
                <a href="#" className="hover:text-white transition-colors">Yardım S.S.S</a>
              </div>
            </div>

            <a href="https://tech.betsanglobal.com/" target="_blank" rel="noopener noreferrer" className="overflow-hidden bg-slate-800/50 hover:bg-slate-800 px-6 py-3 rounded-full border border-slate-700 flex items-center gap-3 transition-all group scale-95 hover:scale-100 hover:border-turquoise-primary/50 shadow-2xl">
              <div className="text-slate-400 text-xs text-right leading-tight">
                Site Yapımcısı<br />
                <span className="font-black text-white text-sm group-hover:text-turquoise-primary transition-colors">Betsan Teknoloji</span>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-turquoise-primary opacity-80 group-hover:opacity-100">
                Geleceği Kodluyoruz
              </div>
            </a>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Fixed Buttons */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/80 backdrop-blur-xl border-t border-slate-200 z-[102] flex gap-3 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
        <a href="tel:+905352456603" className="flex-1 bg-fire-red text-white py-3.5 rounded-xl font-black text-center flex items-center justify-center gap-2 shadow-sm">
          <Phone className="w-5 h-5" /> Hemen Ara
        </a>
        <a href="https://wa.me/905352456603?text=Merhaba,%20fiyat%20almak%20istiyorum." target="_blank" className="flex-1 bg-[#25D366] text-white py-3.5 rounded-xl font-black text-center flex items-center justify-center gap-2 shadow-sm">
          <WhatsAppIcon className="w-5 h-5" /> WhatsApp
        </a>
      </div>


      {/* Mobile Menu Drawer - Relocated for full-screen coverage */}
      <div className={`fixed inset-0 w-full h-[100dvh] bg-white z-[200] transition-all duration-500 lg:hidden overflow-y-auto ${isMenuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"}`}>
        <div className="flex flex-col h-full min-h-[100dvh]">

          {/* Header: Logo and Close */}
          <div className="flex justify-between items-center px-6 py-6 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <Image src="/logo.jpeg" alt="GAP logo" width={40} height={40} style={{ width: "auto", height: "auto" }} className="rounded-full" />
              <span className="text-xl font-black text-slate-800 tracking-tighter">GAP <span className="text-turquoise-primary">YAPI</span></span>
            </div>
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-fire-red transition-colors">
              <X className="w-8 h-8" />
            </button>
          </div>

          {/* Content: Centered Links */}
          <div className="flex-1 flex flex-col justify-center px-6">
            <nav className="flex flex-col gap-0">
              {[
                { name: "Anasayfa", href: "#" },
                { name: "Hakkımızda", href: "#hakkimizda" },
                { name: "Hizmetlerimiz", href: "#hizmetler" },
                { name: "Galeri", href: "#galeri" },
                { name: "Bilgiler", href: "#bilgiler" },
                { name: "İletişim", href: "#iletisim" }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-2xl font-black text-slate-800 hover:text-turquoise-primary transition-all py-6 text-center border-b border-slate-100/50 last:border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer: Contacts at bottom */}
          <div className="p-8 border-t border-slate-50 bg-slate-50/50 mt-auto">
            <div className="flex flex-col gap-4 text-center">
              <a href="tel:+905352456603" className="flex items-center justify-center gap-3 text-lg font-black text-slate-900 hover:text-fire-red transition-colors">
                <Phone className="w-5 h-5 text-fire-red" /> 0535 245 66 03
              </a>
              <div className="h-px w-12 bg-slate-200 mx-auto"></div>
              <a href="https://wa.me/905352456603" target="_blank" className="flex items-center justify-center gap-3 text-lg font-black text-slate-900 hover:text-[#25D366] transition-colors">
                <WhatsAppIcon className="w-6 h-6 text-[#25D366]" /> WhatsApp Destek
              </a>
            </div>

            <div className="mt-8 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Malatya Tesisat Acil Servis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
