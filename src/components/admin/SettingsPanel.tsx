"use client";

import type { FormEvent } from "react";

type SettingsPanelProps = {
  currentPassword: string;
  nextPassword: string;
  confirmPassword: string;
  isSubmitting: boolean;
  info: string;
  error: string;
  onCurrentPasswordChange: (value: string) => void;
  onNextPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
};

export function SettingsPanel({
  currentPassword,
  nextPassword,
  confirmPassword,
  isSubmitting,
  info,
  error,
  onCurrentPasswordChange,
  onNextPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: SettingsPanelProps) {
  return (
    <section className="max-w-xl rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <h2 className="mb-2 text-sm font-semibold">Sifre degistir</h2>
      <p className="mb-4 text-xs text-slate-400">
        En az 8 karakter, buyuk harf, kucuk harf ve rakam kullanin.
      </p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block">Mevcut sifre</span>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            value={currentPassword}
            onChange={(e) => onCurrentPasswordChange(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block">Yeni sifre</span>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            value={nextPassword}
            onChange={(e) => onNextPasswordChange(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block">Yeni sifre tekrar</span>
          <input
            type="password"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            required
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-emerald-600 px-3 py-2 text-sm hover:bg-emerald-500 disabled:opacity-60"
        >
          {isSubmitting ? "Kaydediliyor..." : "Sifreyi degistir"}
        </button>
      </form>
      {info ? <p className="mt-3 text-sm text-emerald-400">{info}</p> : null}
      {error ? <p className="mt-3 text-sm text-rose-400">{error}</p> : null}
    </section>
  );
}
