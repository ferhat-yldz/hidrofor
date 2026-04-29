"use client";

import { useEffect, useRef } from "react";
import type { ContentStateItem } from "@/types/admin";
import { FieldEditor } from "@/components/admin/FieldEditor";
import { postPreviewToFrame } from "@/lib/adminLivePreview";

type ContentEditorProps = {
  files: ContentStateItem[];
  activeFile: string;
  selectedData: unknown;
  isBusy: boolean;
  message: string;
  error: string;
  onFileSelect: (file: string) => void;
  onDataChange: (data: unknown) => void;
  onPublish: () => void;
  hasChanges: boolean;
  onPickImage: (apply: (url: string) => void) => void;
};

const FILE_META: Record<string, { title: string; subtitle: string }> = {
  "home.json": { title: "Ana Sayfa", subtitle: "Hero, rozetler, ana bolum metinleri" },
  "services.json": { title: "Hizmetler", subtitle: "Hizmet kartlari ve detay metinleri" },
  "site.json": { title: "Site Genel", subtitle: "Iletisim bilgileri ve footer verileri" },
  "articles.json": { title: "Bilgiler", subtitle: "Blog yazilari ve kategori metinleri" },
  "gallery.json": { title: "Galeri", subtitle: "Galeri kartlari ve gorseller" },
  "kurumsal.json": { title: "Kurumsal", subtitle: "Kurumsal sayfa bolumleri" },
  "brands.json": { title: "Markalar", subtitle: "Marka seridi icerigi" },
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
  onPublish,
  hasChanges,
  onPickImage,
}: ContentEditorProps) {
  const selected = files.find((file) => file.file === activeFile);
  const selectedMeta = selected ? FILE_META[selected.file] : null;
  const statusText = hasChanges ? "Degisiklik var" : "Kayitla ayni";
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const previewPath =
    activeFile === "kurumsal.json"
      ? "/kurumsal"
      : activeFile === "articles.json"
        ? "/bilgiler"
        : "/";
  const previewUrl = `${previewPath}${previewPath.includes("?") ? "&" : "?"}preview=1`;

  useEffect(() => {
    if (!activeFile) return;
    postPreviewToFrame(iframeRef.current?.contentWindow ?? null, activeFile, selectedData);
  }, [activeFile, selectedData]);

  return (
    <div className="grid gap-4 md:grid-cols-[250px_1fr]">
      <aside className="rounded-xl border border-slate-800 bg-slate-900/50 p-3">
        <p className="mb-3 text-sm font-semibold text-slate-200">Icerik Dosyalari</p>
        <div className="space-y-1.5">
          {files.map((file) => (
            <button
              key={file.file}
              type="button"
              onClick={() => onFileSelect(file.file)}
              className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                activeFile === file.file
                  ? "border-blue-500/70 bg-blue-500/10"
                  : "border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/50"
              }`}
            >
              <span className="block text-sm font-semibold text-slate-100">
                {FILE_META[file.file]?.title ?? file.file}
              </span>
              <span className="mt-0.5 block text-[11px] text-slate-500">{file.file}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <p className="text-base font-semibold text-slate-100">
              {selectedMeta?.title ?? "Duzenlenecek dosya secin"}
            </p>
            {selectedMeta ? <p className="text-xs text-slate-400">{selectedMeta.subtitle}</p> : null}
            {selected ? <p className="text-[11px] text-slate-500">{selected.file}</p> : null}
            {activeFile ? (
              <p className={`mt-1 text-xs ${hasChanges ? "text-amber-300" : "text-slate-400"}`}>
                {statusText}
              </p>
            ) : null}
            <p className="mt-1 text-[11px] text-slate-500">
              Not: Sadece metin alanlari duzenlenir. Renk/gorsel gibi teknik alanlar kilitli.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onPublish}
              disabled={!activeFile || isBusy || !hasChanges}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Degisiklikleri yayinla
            </button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
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

          <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-950">
            <div className="border-b border-slate-800 px-3 py-2 text-xs text-slate-400">
              Canli Onizleme ({previewPath})
            </div>
            <iframe
              ref={iframeRef}
              title="Site onizleme"
              src={previewUrl}
              className="h-[70vh] w-full bg-white"
              onLoad={() => {
                if (!activeFile) return;
                window.setTimeout(() => {
                  postPreviewToFrame(iframeRef.current?.contentWindow ?? null, activeFile, selectedData);
                }, 60);
              }}
            />
          </div>
        </div>

        {message ? <p className="mt-3 text-sm text-emerald-400">{message}</p> : null}
        {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
      </section>
    </div>
  );
}
