"use client";

import type { FormEvent } from "react";

type LoginPanelProps = {
  username: string;
  password: string;
  showPassword: boolean;
  error: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (e: FormEvent) => void;
};

export function LoginPanel({
  username,
  password,
  showPassword,
  error,
  onUsernameChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginPanelProps) {
  return (
    <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
      <h1 className="text-2xl font-semibold">AK Admin Panel</h1>
      <p className="mt-2 text-sm text-slate-300">Sadece yetkili kullanicilar erisebilir.</p>
      <form className="mt-6 space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm">
          <span className="mb-1 block text-slate-300">Kullanici adi</span>
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none focus:border-cyan-400"
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
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
              onChange={(e) => onPasswordChange(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={onTogglePassword}
              className="rounded-lg border border-slate-700 px-3 text-sm hover:bg-slate-800"
            >
              {showPassword ? "Gizle" : "Goster"}
            </button>
          </div>
        </label>
        {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-medium hover:bg-cyan-500"
        >
          Giris yap
        </button>
      </form>
    </section>
  );
}
