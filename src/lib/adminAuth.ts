import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ak_admin_session";
const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 30;

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET ?? "ak_hidrofor_panel_secret";
}

function getUsername(): string {
  return process.env.ADMIN_USERNAME ?? "admin";
}

function getPassword(): string {
  return process.env.ADMIN_PASSWORD ?? "admin1233";
}

function getSessionTtlMs(): number {
  const ttlMinutesRaw = process.env.ADMIN_SESSION_TTL_MINUTES;
  const ttlMinutes = Number(ttlMinutesRaw);
  if (Number.isFinite(ttlMinutes) && ttlMinutes > 0) {
    return Math.floor(ttlMinutes) * 60 * 1000;
  }
  return DEFAULT_SESSION_TTL_MS;
}

export function getAdminCredentials() {
  return {
    username: getUsername(),
    password: getPassword(),
  };
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionValue(username: string): string {
  const expires = Date.now() + getSessionTtlMs();
  const payload = `${username}.${expires}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length < 3) return false;

  const signature = parts.pop();
  const payload = parts.join(".");
  if (!signature) return false;

  const expectedSignature = sign(payload);
  const validSignature = crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature),
  );

  if (!validSignature) return false;

  const [username, expiresRaw] = payload.split(".");
  if (!username || !expiresRaw) return false;
  if (username !== getUsername()) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires)) return false;

  return Date.now() < expires;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return verifySessionValue(value);
}

export const adminCookie = {
  name: COOKIE_NAME,
  maxAgeSeconds: getSessionTtlMs() / 1000,
};
