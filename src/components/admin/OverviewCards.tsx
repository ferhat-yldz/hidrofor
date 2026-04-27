"use client";

type OverviewCardsProps = {
  contentCount: number;
  draftCount: number;
  mediaCount: number;
  backupCount: number;
};

const cardClass = "rounded-xl border border-slate-800 bg-slate-900/60 p-4";

export function OverviewCards({
  contentCount,
  draftCount,
  mediaCount,
  backupCount,
}: OverviewCardsProps) {
  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      <div className={cardClass}>
        <p className="text-xs text-slate-400">Icerik dosyasi</p>
        <p className="text-2xl font-semibold">{contentCount}</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs text-slate-400">Taslakli dosya</p>
        <p className="text-2xl font-semibold">{draftCount}</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs text-slate-400">Yuklenen medya</p>
        <p className="text-2xl font-semibold">{mediaCount}</p>
      </div>
      <div className={cardClass}>
        <p className="text-xs text-slate-400">Yedek sayisi</p>
        <p className="text-2xl font-semibold">{backupCount}</p>
      </div>
    </section>
  );
}
