"use client";

import { useMemo, useState } from "react";
import type { MediaItem } from "@/types/admin";

type MediaManagerProps = {
  files: MediaItem[];
  isBusy: boolean;
  info: string;
  error: string;
  onUpload: (file: File) => void;
  onDelete: (fileName: string) => void;
  onUseImage: (url: string) => void;
};

export function MediaManager({
  files,
  isBusy,
  info,
  error,
  onUpload,
  onDelete,
  onUseImage,
}: MediaManagerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return files;
    return files.filter((file) => file.name.toLowerCase().includes(q));
  }, [files, query]);

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-sm font-semibold">Medya yonetimi</h2>
        <label className="rounded-lg bg-cyan-600 px-3 py-2 text-sm hover:bg-cyan-500">
          Dosya yukle
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onUpload(file);
              e.currentTarget.value = "";
            }}
          />
        </label>
      </div>

      <input
        className="mb-3 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:border-cyan-400"
        placeholder="Dosya ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid gap-2">
        {filtered.map((file) => (
          <div
            key={file.name}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-700 p-2 text-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{file.name}</p>
              <p className="text-xs text-slate-400">{file.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded border border-slate-600 px-2 py-1 text-xs hover:bg-slate-800"
                onClick={() => onUseImage(file.url)}
              >
                URL kullan
              </button>
              <button
                type="button"
                className="rounded border border-rose-700 px-2 py-1 text-xs hover:bg-rose-700/20"
                onClick={() => onDelete(file.name)}
                disabled={isBusy}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {info ? <p className="mt-3 text-sm text-emerald-400">{info}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
    </section>
  );
}
