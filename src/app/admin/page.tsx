"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BackupManager } from "@/components/admin/BackupManager";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { LoginPanel } from "@/components/admin/LoginPanel";
import { MediaManager } from "@/components/admin/MediaManager";
import { OverviewCards } from "@/components/admin/OverviewCards";
import { SettingsPanel } from "@/components/admin/SettingsPanel";
import { TabNav, type AdminTab } from "@/components/admin/TabNav";
import type { ContentStateItem, MediaItem } from "@/types/admin";

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isBusy, setIsBusy] = useState(false);

  const [files, setFiles] = useState<ContentStateItem[]>([]);
  const [activeFile, setActiveFile] = useState("");
  const [editorValue, setEditorValue] = useState<unknown>(null);
  const [mediaFiles, setMediaFiles] = useState<MediaItem[]>([]);
  const [backups, setBackups] = useState<string[]>([]);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imageApply, setImageApply] = useState<((url: string) => void) | null>(null);

  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [settingsInfo, setSettingsInfo] = useState("");
  const [settingsError, setSettingsError] = useState("");

  const bootstrap = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const meRes = await fetch("/api/admin/me", { cache: "no-store" });
      const meData = (await meRes.json()) as { authenticated?: boolean };
      const ok = Boolean(meData.authenticated);
      setAuthenticated(ok);
      if (ok) {
        await Promise.all([loadContent(), loadMedia(), loadBackups()]);
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

  const draftCount = useMemo(() => files.filter((item) => item.hasDraft).length, [files]);

  async function loadContent() {
    const res = await fetch("/api/admin/content", { cache: "no-store" });
    if (!res.ok) {
      setAuthenticated(false);
      throw new Error("Icerik yuklenemedi.");
    }

    const payload = (await res.json()) as { files?: ContentStateItem[] };
    const nextFiles = payload.files ?? [];
    setFiles(nextFiles);
    if (nextFiles.length > 0) {
      const initial = nextFiles[0];
      setActiveFile(initial.file);
      setEditorValue(initial.draft ?? initial.published);
    }
  }

  async function loadMedia() {
    const res = await fetch("/api/admin/media", { cache: "no-store" });
    if (!res.ok) return;
    const payload = (await res.json()) as { files?: MediaItem[] };
    setMediaFiles(payload.files ?? []);
  }

  async function loadBackups() {
    const res = await fetch("/api/admin/backup", { cache: "no-store" });
    if (!res.ok) return;
    const payload = (await res.json()) as { backups?: string[] };
    setBackups(payload.backups ?? []);
  }

  function selectFile(fileName: string) {
    const selected = files.find((file) => file.file === fileName);
    if (!selected) return;
    setInfo("");
    setError("");
    setActiveFile(fileName);
    setEditorValue(selected.draft ?? selected.published);
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
    await Promise.all([loadContent(), loadMedia(), loadBackups()]);
  }

  async function mutateContent(action: "saveDraft" | "publish" | "discardDraft") {
    if (!activeFile) return;
    setIsBusy(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          file: activeFile,
          action,
          data: editorValue,
        }),
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Kaydetme sirasinda hata olustu.");
        return;
      }

      setInfo(payload.message ?? "Islem tamamlandi.");
      await loadContent();
    } catch {
      setError("Islem sirasinda ag hatasi olustu.");
    } finally {
      setIsBusy(false);
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

  async function onUpload(file: File) {
    setIsBusy(true);
    setError("");
    setInfo("");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Yukleme basarisiz.");
        return;
      }
      setInfo("Dosya yuklendi.");
      await loadMedia();
    } finally {
      setIsBusy(false);
    }
  }

  async function onDeleteMedia(fileName: string) {
    setIsBusy(true);
    setError("");
    setInfo("");
    try {
      const res = await fetch(`/api/admin/media?file=${encodeURIComponent(fileName)}`, {
        method: "DELETE",
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Silme basarisiz.");
        return;
      }
      setInfo("Dosya silindi.");
      await loadMedia();
    } finally {
      setIsBusy(false);
    }
  }

  async function onCreateBackup() {
    setIsBusy(true);
    setInfo("");
    setError("");
    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create" }),
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Yedek olusturulamadi.");
        return;
      }
      setInfo(payload.message ?? "Yedek olusturuldu.");
      await loadBackups();
    } finally {
      setIsBusy(false);
    }
  }

  async function onRestoreBackup(backupId: string) {
    setIsBusy(true);
    setInfo("");
    setError("");
    try {
      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore", backupId }),
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setError(payload.message ?? "Yedek geri yuklenemedi.");
        return;
      }
      setInfo(payload.message ?? "Yedek geri yuklendi.");
      await loadContent();
    } finally {
      setIsBusy(false);
    }
  }

  function openImagePicker(apply: (url: string) => void) {
    setImageApply(() => apply);
    setImagePickerOpen(true);
    void loadMedia();
  }

  async function onChangePassword(e: FormEvent) {
    e.preventDefault();
    setSettingsInfo("");
    setSettingsError("");

    if (nextPassword !== confirmPassword) {
      setSettingsError("Yeni sifre alanlari ayni olmali.");
      return;
    }
    setIsBusy(true);
    try {
      const res = await fetch("/api/admin/password/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          nextPassword,
        }),
      });
      const payload = (await res.json()) as { message?: string };
      if (!res.ok) {
        setSettingsError(payload.message ?? "Sifre degistirilemedi.");
        return;
      }
      setSettingsInfo(payload.message ?? "Sifre degistirildi.");
      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
      await onLogout();
    } finally {
      setIsBusy(false);
    }
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
        <LoginPanel
          username={username}
          password={password}
          showPassword={showPassword}
          error={loginError}
          onUsernameChange={setUsername}
          onPasswordChange={setPassword}
          onTogglePassword={() => setShowPassword((v) => !v)}
          onSubmit={onLogin}
        />
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
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
        <TabNav activeTab={activeTab} onChange={setActiveTab} />

        {activeTab === "overview" ? (
          <OverviewCards
            contentCount={files.length}
            draftCount={draftCount}
            mediaCount={mediaFiles.length}
            backupCount={backups.length}
          />
        ) : null}

        {activeTab === "content" ? (
          <ContentEditor
            files={files}
            activeFile={activeFile}
            selectedData={editorValue}
            isBusy={isBusy}
            message={info}
            error={error}
            onFileSelect={selectFile}
            onDataChange={setEditorValue}
            onSaveDraft={() => void mutateContent("saveDraft")}
            onPublish={() => void mutateContent("publish")}
            onDiscardDraft={() => void mutateContent("discardDraft")}
            onPickImage={openImagePicker}
          />
        ) : null}

        {activeTab === "media" ? (
          <MediaManager
            files={mediaFiles}
            isBusy={isBusy}
            info={info}
            error={error}
            onUpload={(file) => void onUpload(file)}
            onDelete={(fileName) => void onDeleteMedia(fileName)}
            onUseImage={(url) => {
              navigator.clipboard.writeText(url).catch(() => null);
              setInfo("URL panoya kopyalandi.");
            }}
          />
        ) : null}

        {activeTab === "backups" ? (
          <BackupManager
            backups={backups}
            isBusy={isBusy}
            info={info}
            error={error}
            onCreate={() => void onCreateBackup()}
            onRestore={(backupId) => void onRestoreBackup(backupId)}
          />
        ) : null}

        {activeTab === "settings" ? (
          <SettingsPanel
            currentPassword={currentPassword}
            nextPassword={nextPassword}
            confirmPassword={confirmPassword}
            isSubmitting={isBusy}
            info={settingsInfo}
            error={settingsError}
            onCurrentPasswordChange={setCurrentPassword}
            onNextPasswordChange={setNextPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={onChangePassword}
          />
        ) : null}

        {imagePickerOpen ? (
          <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4">
            <div className="max-h-[70vh] w-full max-w-2xl overflow-auto rounded-xl border border-slate-700 bg-slate-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Medya secici</h3>
                <button
                  type="button"
                  onClick={() => setImagePickerOpen(false)}
                  className="rounded border border-slate-600 px-2 py-1 text-xs"
                >
                  Kapat
                </button>
              </div>
              <div className="grid gap-2">
                {mediaFiles.map((file) => (
                  <button
                    key={`picker-${file.name}`}
                    type="button"
                    onClick={() => {
                      imageApply?.(file.url);
                      setImagePickerOpen(false);
                    }}
                    className="rounded border border-slate-700 px-3 py-2 text-left text-sm hover:bg-slate-800"
                  >
                    <span className="block">{file.name}</span>
                    <span className="text-xs text-slate-400">{file.url}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
