"use client";

type BackupManagerProps = {
  backups: string[];
  isBusy: boolean;
  info: string;
  error: string;
  onCreate: () => void;
  onRestore: (backupId: string) => void;
};

export function BackupManager({
  backups,
  isBusy,
  info,
  error,
  onCreate,
  onRestore,
}: BackupManagerProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Yedek yonetimi</h2>
        <button
          type="button"
          onClick={onCreate}
          disabled={isBusy}
          className="rounded-lg bg-cyan-600 px-3 py-2 text-sm hover:bg-cyan-500 disabled:opacity-60"
        >
          Yeni yedek olustur
        </button>
      </div>

      <div className="space-y-2">
        {backups.map((backup) => (
          <div
            key={backup}
            className="flex items-center justify-between rounded-lg border border-slate-700 p-2 text-sm"
          >
            <span>{backup}</span>
            <button
              type="button"
              onClick={() => onRestore(backup)}
              disabled={isBusy}
              className="rounded border border-slate-600 px-2 py-1 text-xs hover:bg-slate-800 disabled:opacity-60"
            >
              Geri yukle
            </button>
          </div>
        ))}
      </div>

      {info ? <p className="mt-3 text-sm text-emerald-400">{info}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
    </section>
  );
}
