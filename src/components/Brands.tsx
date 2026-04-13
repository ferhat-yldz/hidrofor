import { SERVICE_ICON_MAP, isServiceIconKey } from "@/lib/serviceIcons";
import { getBrandsContent } from "@/lib/pages";

export default function Brands() {
  const { bolumEtiketi, markalar } = getBrandsContent();

  return (
    <section className="bg-white py-12 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">
            {bolumEtiketi}
          </span>
        </div>
        <div className="flex overflow-x-auto items-center justify-start xl:justify-center gap-6 lg:gap-10 pb-4 hide-scrollbar snap-x w-full">
          {markalar.map((m, idx) => {
            const key = isServiceIconKey(m.iconKey) ? m.iconKey : "shieldCheck";
            const Icon = SERVICE_ICON_MAP[key];
            return (
              <div
                key={idx}
                className="snap-center bg-slate-50 hover:bg-white hover:shadow-xl transition-all rounded-2xl px-6 py-4 flex shrink-0 items-center justify-center gap-3 border border-slate-100 transform hover:-translate-y-1"
              >
                <Icon className={`w-8 h-8 shrink-0 ${m.renkSinifi}`} />
                <span
                  className={`font-black text-2xl tracking-wider ${m.renkSinifi} ${m.italik ? "italic" : ""}`}
                >
                  {m.ad}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
