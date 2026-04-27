"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

type ContentFile = {
  file: string;
  data: unknown;
};

const prettyBytes = (str: string) => new Blob([str]).size;

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [files, setFiles] = useState<ContentFile[]>([]);
  const [activeFile, setActiveFile] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const bootstrap = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const meRes = await fetch("/api/admin/me", { cache: "no-store" });
      const meData = (await meRes.json()) as { authenticated?: boolean };
      const ok = Boolean(meData.authenticated);
      setAuthenticated(ok);
      if (ok) {
        await loadContent();
      }
    } catch {
      setError("Panel baslatilirken hata olustu.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  const activeFileStats = useMemo(() => {
    if (!activeFile) return null;
    return {
      chars: editorValue.length,
      bytes: prettyBytes(editorValue),
    };
  }, [activeFile, editorValue]);

  async function loadContent() {
    setError("");
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    if (!res.ok) {
      setAuthenticated(false);
      throw new Error("Icerik yuklenemedi.");
    }

    const payload = (await res.json()) as { files?: ContentFile[] };
    const nextFiles = payload.files ?? [];
    setFiles(nextFiles);
    if (nextFiles.length > 0) {
      const initial = nextFiles[0];
      setActiveFile(initial.file);
      setEditorValue(JSON.stringify(initial.data, null, 2));
    }
  }

  function selectFile(fileName: string) {
    const selected = files.find((file) => file.file === fileName);
    if (!selected) return;
    setInfo("");
    setError("");
    setActiveFile(fileName);
    setEditorValue(JSON.stringify(selected.data, null, 2));
  }

  async function onLogin(e: FormEvent) {
    e.preventDefault();
    setLoginError("");
    setError("");
    setInfo("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const payload = (await res.json()) as { message?: string };
      setLoginError(payload.message ?? "Giris basarisiz.");
      return;
    }

    setAuthenticated(true);
    setPassword("");
    await loadContent();
  }

  async function onSave() {
    if (!activeFile) return;
    setIsSaving(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: activeFile,
          jsonText: editorValue,
        }),
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Kaydetme sirasinda hata olustu.");
        return;
      }

      setInfo(`${activeFile} basariyla kaydedildi.`);
      await loadContent();
    } catch {
      setError("Kaydetme sirasinda ag hatasi olustu.");
    } finally {
      setIsSaving(false);
    }
  }

  async function onLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setFiles([]);
    setActiveFile("");
    setEditorValue("");
    setUsername("");
    setPassword("");
    setInfo("");
    setError("");
    setLoginError("");
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 grid place-items-center p-6">
        <p>Yukleniyor...</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 grid place-items-center p-6">
        <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <h1 className="text-2xl font-semibold">AK Admin Panel</h1>
          <p className="mt-2 text-sm text-slate-300">
            Sadece yetkili kullanicilar erisebilir.
          </p>
          <form className="mt-6 space-y-4" onSubmit={onLogin}>
            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">Kullanici adi</span>
              <input
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </label>

            <label className="block text-sm">
              <span className="mb-1 block text-slate-300">Sifre</span>
              <div className="flex gap-2">
                <input
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="rounded-lg border border-slate-700 px-3 text-sm hover:bg-slate-800"
                >
                  {showPassword ? "Gizle" : "Goster"}
                </button>
              </div>
            </label>

            {loginError ? <p className="text-sm text-rose-400">{loginError}</p> : null}

            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500"
            >
              Giris yap
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/70 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">AK Hidrofor Yonetim Paneli</h1>
            <p className="text-xs text-slate-300">Decap olmadan JSON tabanli icerik yonetimi</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-800"
          >
            Cikis
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-4 md:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Dosyalar</p>
          <div className="space-y-2">
            {files.map((file) => (
              <button
                key={file.file}
                onClick={() => selectFile(file.file)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm transition ${
                  activeFile === file.file
                    ? "border-cyan-500 bg-cyan-500/10"
                    : "border-slate-700 hover:bg-slate-800"
                }`}
              >
                {file.file}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-medium">{activeFile || "Dosya secin"}</p>
              {activeFileStats ? (
                <p className="text-xs text-slate-400">
                  {activeFileStats.chars} karakter - {activeFileStats.bytes} bayt
                </p>
              ) : null}
            </div>
            <button
              onClick={onSave}
              disabled={!activeFile || isSaving}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </button>
          </div>

          <textarea
            value={editorValue}
            onChange={(e) => setEditorValue(e.target.value)}
            className="h-[65vh] w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-sm outline-none focus:border-cyan-400"
            spellCheck={false}
          />

          {info ? <p className="mt-2 text-sm text-emerald-400">{info}</p> : null}
          {error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null}
        </section>
      </div>
    </main>
  );
}
