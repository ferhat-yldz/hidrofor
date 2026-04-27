"use client";

type FieldEditorProps = {
  label: string;
  value: unknown;
  onChange: (next: unknown) => void;
  onPickImage?: (apply: (url: string) => void) => void;
};

function isImageLikeField(label: string, value: unknown) {
  if (typeof value !== "string") return false;
  return /image|gorsel|logo|photo|icon/i.test(label);
}

export function FieldEditor({ label, value, onChange, onPickImage }: FieldEditorProps) {
  if (Array.isArray(value)) {
    return (
      <div className="rounded-lg border border-slate-700 p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">{label}</p>
          <button
            type="button"
            onClick={() => onChange([...value, ""])}
            className="rounded bg-slate-800 px-2 py-1 text-xs hover:bg-slate-700"
          >
            Satir ekle
          </button>
        </div>
        <div className="space-y-2">
          {value.map((item, index) => (
            <div key={`${label}-${index}`} className="rounded border border-slate-800 p-2">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => onChange(value.filter((_, i) => i !== index))}
                  className="rounded bg-rose-700/70 px-2 py-1 text-xs hover:bg-rose-600"
                >
                  Sil
                </button>
              </div>
              <FieldEditor
                label={`${label}[${index}]`}
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
      <div className="rounded-lg border border-slate-700 p-3">
        <p className="mb-2 text-sm font-medium">{label}</p>
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
      <label className="flex items-center gap-2 rounded-lg border border-slate-700 p-3 text-sm">
        <input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />
        <span>{label}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <label className="block text-sm">
        <span className="mb-1 block text-slate-300">{label}</span>
        <input
          type="number"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </label>
    );
  }

  const textValue = typeof value === "string" ? value : "";
  const multiline = textValue.length > 120 || textValue.includes("\n");
  const canPickImage = Boolean(onPickImage && isImageLikeField(label, textValue));

  return (
    <label className="block text-sm">
      <span className="mb-1 block text-slate-300">{label}</span>
      {multiline ? (
        <textarea
          className="min-h-24 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
          value={textValue}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="flex gap-2">
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
            value={textValue}
            onChange={(e) => onChange(e.target.value)}
          />
          {canPickImage ? (
            <button
              type="button"
              className="rounded-lg border border-slate-700 px-3 hover:bg-slate-800"
              onClick={() => onPickImage?.((url) => onChange(url))}
            >
              Medya sec
            </button>
          ) : null}
        </div>
      )}
    </label>
  );
}
