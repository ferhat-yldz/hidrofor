import { ShieldCheck, Award, Droplet, Activity, Zap } from "lucide-react";

export default function Brands() {
  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">ÇÖZÜM ORTAKLARIMIZ</span>
        </div>
        <div className="flex overflow-x-auto items-center justify-start xl:justify-center gap-6 lg:gap-10 pb-4 hide-scrollbar snap-x w-full">
          <div className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1">
            <ShieldCheck className="w-8 h-8 text-red-500 shrink-0" />
            <span className="font-black text-2xl tracking-wider text-red-500">ETNA</span>
          </div>
          <div className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1">
            <Award className="w-8 h-8 text-blue-600 shrink-0" />
            <span className="font-black text-2xl tracking-wider text-blue-600">ÜSTÜNEL</span>
          </div>
          <div className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1">
            <Droplet className="w-8 h-8 text-cyan-500 shrink-0" />
            <span className="font-black text-2xl tracking-wider text-cyan-500">ALARKO</span>
          </div>
          <div className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1">
            <Activity className="w-8 h-8 text-yellow-500 shrink-0" />
            <span className="font-black text-2xl tracking-wider text-yellow-500">YILDIZSU</span>
          </div>
          <div className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1">
            <Zap className="w-8 h-8 text-green-600 shrink-0" />
            <span className="font-black text-2xl tracking-wider italic text-green-600">PEDROLLO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
