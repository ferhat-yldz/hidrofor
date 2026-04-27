import crypto from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { cookies } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  AUTH_STATE_FILE,
  DEFAULT_SESSION_TTL_MS,
} from "@/lib/admin/constants";

type AuthState = {
  passwordHash: string;
  salt: string;
  sessionVersion: number;
  updatedAt: string;
};

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

function getSessionVersionFromEnv(): number {
  return Number(process.env.ADMIN_SESSION_VERSION ?? "1") || 1;
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function createSessionValue(username: string): string {
  const expires = Date.now() + getSessionTtlMs();
  const payload = `${username}.${expires}.${getSessionVersionFromEnv()}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export async function verifySessionValue(value: string | undefined): Promise<boolean> {
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

  const [username, expiresRaw, versionRaw] = payload.split(".");
  if (!username || !expiresRaw || !versionRaw) return false;
  if (username !== getUsername()) return false;

  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires)) return false;
  const version = Number(versionRaw);
  if (!Number.isFinite(version)) return false;

  const currentVersion = await getCurrentSessionVersion();
  if (version !== currentVersion) return false;

  return Date.now() < expires;
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionValue(value);
}

export const adminCookie = {
  name: ADMIN_COOKIE_NAME,
  maxAgeSeconds: getSessionTtlMs() / 1000,
};

function hashPassword(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (error, derivedKey) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(derivedKey.toString("hex"));
    });
  });
}

async function readAuthState(): Promise<AuthState | null> {
  try {
    const raw = await fs.readFile(AUTH_STATE_FILE, "utf8");
    return JSON.parse(raw) as AuthState;
  } catch {
    return null;
  }
}

export async function verifyAdminPassword(candidate: string): Promise<boolean> {
  const state = await readAuthState();
  if (!state) {
    return candidate === getPassword();
  }
  const hashed = await hashPassword(candidate, state.salt);
  return crypto.timingSafeEqual(Buffer.from(hashed), Buffer.from(state.passwordHash));
}

export async function setAdminPassword(nextPassword: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = await hashPassword(nextPassword, salt);
  const previous = await readAuthState();
  const sessionVersion = (previous?.sessionVersion ?? getSessionVersionFromEnv()) + 1;

  const payload: AuthState = {
    passwordHash,
    salt,
    sessionVersion,
    updatedAt: new Date().toISOString(),
  };

  await fs.mkdir(path.dirname(AUTH_STATE_FILE), { recursive: true });
  await fs.writeFile(AUTH_STATE_FILE, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return payload;
}

export async function getCurrentSessionVersion(): Promise<number> {
  const state = await readAuthState();
  return state?.sessionVersion ?? getSessionVersionFromEnv();
}

export async function createSessionValueForUser(username: string): Promise<string> {
  const expires = Date.now() + getSessionTtlMs();
  const version = await getCurrentSessionVersion();
  const payload = `${username}.${expires}.${version}`;
  const signature = sign(payload);
  return `${payload}.${signature}`;
}
