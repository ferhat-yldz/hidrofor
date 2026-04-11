"use client";

import Image from "next/image";
import { Quote, Medal } from "lucide-react";

export default function Kurumsal() {

  return (
    <div className="bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">

      {/* Breadcrumb & Hero */}
      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <Image src="https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=2600" alt="Kurumsal" fill className="object-cover" />
           <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Medal className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">Kurumsal Biyografi</h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl mx-auto">Sektöre yıllarını vermiş, güven ve kaliteyi öncelik sayan bir anlayışla Malatya'ya hizmet ediyoruz.</p>
        </div>
      </section>

      {/* Founder Biography Content */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Image Column */}
            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-[4/5]">
                {/* Fallback AI placeholder for the owner */}
                <Image 
                  src="/images/team/kerem-akarslan.jpg.png" 
                  alt="M. Kerem Akarslan" 
                  fill 
                  className="object-cover object-top" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-blue-600 text-white text-xs font-black uppercase tracking-widest inline-block px-3 py-1 rounded-full mb-2">Firma Kurucusu</div>
                  <h3 className="text-3xl font-black text-white">M. Kerem Akarslan</h3>
                  <p className="text-slate-300 font-medium">Uzman Teknisyen & Dalgıç Pompa Ustası</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-fire-red p-8 rounded-[2rem] shadow-xl z-0 w-64 h-64 hidden lg:block"></div>
            </div>

            {/* Text Column */}
            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                Hikayemiz
                <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-20"></div>
              </h2>
              
              <p className="text-slate-600 leading-relaxed font-medium">
                Meslek hayatına yıllar önce çıraklıktan başlayarak hidrofor, kuyu sondaj ve dalgıç pompa sistemlerinin her detayında tecrübe kazanan <strong>M. Kerem Akarslan</strong>, işin mutfağından yetişmiş donanımlı bir tesisat ve otomasyon uzmanıdır. Yılların verdiği birikimi profesyonel bir çatı altında toplamak amacıyla <strong>Ak Dalgıç Pompa & Mekanik</strong> firmasını kurarak Malatya ve çevresinde sektöre yeni bir vizyon kazandırmıştır.
              </p>

              <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-2xl my-8 relative">
                <Quote className="absolute top-4 right-6 w-12 h-12 text-blue-200" />
                <p className="not-italic text-slate-700 font-bold text-xl italic relative z-10 m-0">
                  "Bizim işimiz sadece bozulanı tamir etmek değil, su gibi hayati bir kaynağın kesintisiz ve verimli şekilde akmasını sağlayan uzun ömürlü sistemler inşa etmektir."
                </p>
              </blockquote>

              <p className="text-slate-600 leading-relaxed font-medium">
                Sektörde sağladığı %100 işçilik garantisi ve 7/24 esasına dayalı çalışma prensibiyle, tarımsal sulamadan endüstriyel tesislere, apartman ve sitelerden müstakil evlere kadar geniş bir yelpazede hizmet vermektedir. Panoların karmaşık otomasyonlarından, yer altındaki kuyu sistemlerine kadar her alanda teknik hakimiyete sahip olan Kerem Usta, kaliteden ödün vermeyen yaklaşımı ile Malatya'nın aranan çözüm ortaklarından biri haline gelmiştir.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-4xl font-black text-blue-500 mb-2">15+</div>
                  <div className="font-bold text-slate-700">Yıllık Sektör Tecrübesi</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div className="text-4xl font-black text-fire-red mb-2">1000+</div>
                  <div className="font-bold text-slate-700">Tamamlanan Proje</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
