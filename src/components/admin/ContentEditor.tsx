"use client";

import type { ContentStateItem } from "@/types/admin";
import { FieldEditor } from "@/components/admin/FieldEditor";

type ContentEditorProps = {
  files: ContentStateItem[];
  activeFile: string;
  selectedData: unknown;
  isBusy: boolean;
  message: string;
  error: string;
  onFileSelect: (file: string) => void;
  onDataChange: (data: unknown) => void;
  onSaveDraft: () => void;
  onPublish: () => void;
  onDiscardDraft: () => void;
  onPickImage: (apply: (url: string) => void) => void;
};

const FILE_LABELS: Record<string, string> = {
  "home.json": "Ana Sayfa Icerikleri",
  "services.json": "Hizmetler",
  "site.json": "Iletisim ve Site Geneli",
  "articles.json": "Bilgiler / Blog Yazilari",
  "gallery.json": "Galeri",
  "kurumsal.json": "Kurumsal Sayfasi",
  "brands.json": "Marka Seridi",
};

export function ContentEditor({
  files,
  activeFile,
  selectedData,
  isBusy,
  message,
  error,
  onFileSelect,
  onDataChange,
  onSaveDraft,
  onPublish,
  onDiscardDraft,
  onPickImage,
}: ContentEditorProps) {
  const selected = files.find((file) => file.file === activeFile);
  const selectedLabel = selected ? FILE_LABELS[selected.file] ?? selected.file : "";

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr]">
      <aside className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Dosyalar</p>
        <div className="space-y-2">
          {files.map((file) => (
            <button
              key={file.file}
              type="button"
              onClick={() => onFileSelect(file.file)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                activeFile === file.file
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:bg-slate-800"
              }`}
            >
              <span className="block font-semibold">{FILE_LABELS[file.file] ?? file.file}</span>
              <span className="block text-[11px] text-slate-500">{file.file}</span>
              <span className={`text-xs ${file.hasDraft ? "text-amber-300" : "text-slate-400"}`}>
                {file.hasDraft ? "Taslak var" : "Yayinda"}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium">{selectedLabel || "Dosya secin"}</p>
            {selected ? <p className="text-[11px] text-slate-500">{selected.file}</p> : null}
            {selected ? (
              <p className="text-xs text-slate-400">
                Durum: {selected.hasDraft ? "Taslak mevcut" : "Yayinlanan surum"}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onSaveDraft}
              disabled={!activeFile || isBusy}
              className="rounded-lg bg-sky-600 px-3 py-2 text-sm hover:bg-sky-500 disabled:opacity-60"
            >
              Taslak kaydet
            </button>
            <button
              type="button"
              onClick={onPublish}
              disabled={!activeFile || isBusy || !selected?.hasDraft}
              className="rounded-lg bg-emerald-600 px-3 py-2 text-sm hover:bg-emerald-500 disabled:opacity-60"
            >
              Yayina al
            </button>
            <button
              type="button"
              onClick={onDiscardDraft}
              disabled={!activeFile || isBusy || !selected?.hasDraft}
              className="rounded-lg border border-slate-600 px-3 py-2 text-sm hover:bg-slate-800 disabled:opacity-60"
            >
              Taslagi sil
            </button>
          </div>
        </div>

        {selectedData && typeof selectedData === "object" ? (
          <div className="max-h-[70vh] space-y-3 overflow-auto pr-1">
            {Object.entries(selectedData as Record<string, unknown>).map(([key, value]) => (
              <FieldEditor
                key={`${activeFile}-${key}`}
                label={key}
                value={value}
                onChange={(next) =>
                  onDataChange({
                    ...(selectedData as Record<string, unknown>),
                    [key]: next,
                  })
                }
                onPickImage={onPickImage}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Duzenlenecek veri bulunamadi.</p>
        )}

        {message ? <p className="mt-3 text-sm text-emerald-400">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
      </section>
    </div>
  );
}
