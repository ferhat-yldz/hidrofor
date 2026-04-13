"use client";

import { Quote, Medal } from "lucide-react";
import { getKurumsalContent } from "@/lib/pages";
import { CmsImage } from "@/components/CmsImage";

export default function Kurumsal() {
  const k = getKurumsalContent();
  const { hero, founder, hikaye, istatistikler } = k;

  return (
    <div className="bg-slate-50 font-sans text-slate-900 pb-20 md:pb-0">

      <section className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${hero.backgroundImage}')` }}
          />
          <div className="absolute inset-0 bg-slate-900/90 mix-blend-multiply" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Medal className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-black mb-6">{hero.title}</h1>
          <p className="text-xl text-slate-300 font-medium max-w-3xl mx-auto">{hero.subtitle}</p>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            <div className="relative">
              <div className="relative z-10 rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl bg-slate-100 aspect-[4/5]">
                <CmsImage
                  src={founder.image}
                  alt={founder.imageAlt}
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-blue-600 text-white text-xs font-black uppercase tracking-widest inline-block px-3 py-1 rounded-full mb-2">
                    {founder.badge}
                  </div>
                  <h3 className="text-3xl font-black text-white">{founder.name}</h3>
                  <p className="text-slate-300 font-medium">{founder.role}</p>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 bg-fire-red p-8 rounded-[2rem] shadow-xl z-0 w-64 h-64 hidden lg:block" />
            </div>

            <div className="prose prose-lg prose-slate max-w-none">
              <h2 className="text-4xl font-black text-slate-900 mb-6 flex items-center gap-4">
                {hikaye.baslik}
                <div className="h-1 flex-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full opacity-20" />
              </h2>

              <p className="text-slate-600 leading-relaxed font-medium">
                {hikaye.girisParagrafi}
              </p>

              <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-2xl my-8 relative">
                <Quote className="absolute top-4 right-6 w-12 h-12 text-blue-200" />
                <p className="not-italic text-slate-700 font-bold text-xl italic relative z-10 m-0">
                  &ldquo;{hikaye.alinti}&rdquo;
                </p>
              </blockquote>

              <p className="text-slate-600 leading-relaxed font-medium">
                {hikaye.kapanisParagrafi}
              </p>

              <div className="mt-10 grid grid-cols-2 gap-6">
                {istatistikler.map((s, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className={`text-4xl font-black mb-2 ${i === 0 ? "text-blue-500" : "text-fire-red"}`}>
                      {s.deger}
                    </div>
                    <div className="font-bold text-slate-700">{s.etiket}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
