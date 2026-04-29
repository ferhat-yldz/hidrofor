"use client";

type OverviewCardsProps = {
  contentCount: number;
  mediaCount: number;
  backupCount: number;
};

const cardClass =
  "rounded-xl border border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-900/40 p-4 shadow-[0_8px_24px_rgba(2,6,23,0.35)]";

export function OverviewCards({
  contentCount,
  mediaCount,
  backupCount,
}: OverviewCardsProps) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      <div className={cardClass}>
        <p className="text-xs uppercase tracking-wide text-slate-400">Icerik Dosyasi</p>
        <p className="mt-1 text-2xl font-semibold">{contentCount}</p>
        <p className="mt-1 text-xs text-slate-500">Duzenlenebilir sayfa kaynaklari</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs uppercase tracking-wide text-slate-400">Yuklenen Medya</p>
        <p className="mt-1 text-2xl font-semibold">{mediaCount}</p>
        <p className="mt-1 text-xs text-slate-500">Gorseller ve dosyalar</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs uppercase tracking-wide text-slate-400">Yedek Sayisi</p>
        <p className="mt-1 text-2xl font-semibold">{backupCount}</p>
        <p className="mt-1 text-xs text-slate-500">Geri donus icin olusturulan surumler</p>
      </div>
    </section>
  );
}
