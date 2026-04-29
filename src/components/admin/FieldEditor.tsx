"use client";

type FieldEditorProps = {
  label: string;
  value: unknown;
  onChange: (next: unknown) => void;
  onPickImage?: (apply: (url: string) => void) => void;
};

const FIELD_LABELS: Record<string, string> = {
  title: "Baslik",
  slug: "URL Kisa Adi",
  description: "Aciklama",
  content: "Icerik Metni",
  image: "Gorsel",
  detailImage: "Detay Gorseli",
  heroImage: "Hero Gorseli",
  heroImageAlt: "Hero Alt Metni",
  iconKey: "Ikon",
  iconColorClass: "Ikon Rengi",
  color: "Kart Arka Plan Rengi",
  accent: "Vurgu Rengi",
  category: "Kategori",
  excerpt: "Kisa Ozet",
  showOnHome: "Anasayfada Goster",
  phoneE164: "Telefon (Uluslararasi)",
  phoneDisplay: "Telefon (Gorunen)",
  whatsappE164: "WhatsApp Numara",
  whatsappMessage: "WhatsApp Mesaji",
  email: "E-posta",
  addressLabel: "Adres",
  mapsQuery: "Harita Sorgusu",
};

function toFriendlyLabel(label: string) {
  const normalized = label.replace(/\[\d+\]/g, "");
  return FIELD_LABELS[normalized] ?? normalized;
}

function isImageLikeField(label: string, value: unknown) {
  if (typeof value !== "string") return false;
  return /image|gorsel|logo|photo|icon/i.test(label);
}

function isTextEditableField(label: string) {
  const key = label.replace(/\[\d+\]/g, "").toLowerCase();
  return !/color|accent|icon|image|logo|photo|slug|mapsquery|phonee164|whatsappe164/.test(key);
}

function buildEmptyTextShape(value: unknown): unknown {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      next[key] = buildEmptyTextShape(child);
    }
    return next;
  }
  if (typeof value === "string") return "";
  return value;
}

export function FieldEditor({ label, value, onChange, onPickImage }: FieldEditorProps) {
  const friendlyLabel = toFriendlyLabel(label);
  const editable = isTextEditableField(label);

  if (Array.isArray(value)) {
    const sample = value[0];
    return (
      <div className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">{friendlyLabel}</p>
          <button
            type="button"
            onClick={() => onChange([...value, buildEmptyTextShape(sample ?? "")])}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-xs hover:bg-slate-800"
          >
            Yazi ekle
          </button>
        </div>
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={`${label}-${index}`} className="rounded-lg border border-slate-800 bg-slate-900/40 p-2">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  className="rounded border border-rose-700/70 bg-rose-900/40 px-2 py-1 text-xs hover:bg-rose-800/60"
                >
                  Sil
                </button>
              </div>
              <FieldEditor
                label={`${friendlyLabel}[${index}]`}
                value={item}
                onChange={(next) => {
                  const copy = [...value];
                  copy[index] = next;
                  onChange(copy);
                }}
                onPickImage={onPickImage}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
        <p className="mb-2 text-sm font-medium">{friendlyLabel}</p>
        <div className="space-y-3">
          {Object.entries(value as Record<string, unknown>).map(([key, child]) => (
            <FieldEditor
              key={`${label}-${key}`}
                label={key}
              value={child}
              onChange={(next) =>
                onChange({
                  ...(value as Record<string, unknown>),
                  [key]: next,
                })
              }
              onPickImage={onPickImage}
            />
          ))}
        </div>
      </div>
    );
  }

  if (typeof value === "boolean") {
    return (
      <div className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3 text-sm">
        <p className="text-slate-300">{friendlyLabel}</p>
        <p className="mt-1 text-xs text-slate-500">{value ? "Acik (duzenlenemez)" : "Kapali (duzenlenemez)"}</p>
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block text-sm">
        <span className="mb-1 block text-slate-300">{friendlyLabel}</span>
        <input
          readOnly
          className="w-full rounded-lg border border-slate-700 bg-slate-950/40 px-3 py-2 text-slate-400 outline-none"
          value={value}
        />
        <span className="mt-1 block text-xs text-slate-500">Sadece metin alanlari duzenlenebilir.</span>
      </label>
    );
  }

  const textValue = typeof value === "string" ? value : "";
  const multiline = textValue.length > 120 || textValue.includes("\n");
  const canPickImage = editable && Boolean(onPickImage && isImageLikeField(friendlyLabel, textValue));

  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-300">{friendlyLabel}</span>
      {multiline ? (
        <textarea
          readOnly={!editable}
          className={`min-h-24 w-full rounded-lg border px-3 py-2 outline-none ${
            editable
              ? "border-slate-700 bg-slate-950/80 focus:border-cyan-400"
              : "border-slate-700 bg-slate-950/40 text-slate-400"
          }`}
          value={textValue}
          onChange={(e) => {
            if (!editable) return;
            onChange(e.target.value);
          }}
        />
      ) : (
        <div className="flex gap-2">
          <input
            readOnly={!editable}
            className={`w-full rounded-lg border px-3 py-2 outline-none ${
              editable
                ? "border-slate-700 bg-slate-950/80 focus:border-cyan-400"
                : "border-slate-700 bg-slate-950/40 text-slate-400"
            }`}
            value={textValue}
            onChange={(e) => {
              if (!editable) return;
              onChange(e.target.value);
            }}
          />
          {canPickImage ? (
            <button
              type="button"
              className="rounded-lg border border-slate-700 bg-slate-900 px-3 hover:bg-slate-800"
              onClick={() => onPickImage?.((url) => onChange(url))}
            >
              Medya sec
            </button>
          ) : null}
        </div>
      )}
      {!editable ? (
        <span className="mt-1 block text-xs text-slate-500">Teknik alan: sadece goruntuleme.</span>
      ) : null}
    </label>
  );
}
