import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_MS,
} from "@/lib/admin/constants";

const requestMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

export function checkRateLimit(req: Request) {
  const now = Date.now();
  const ip = getClientIp(req);
  const current = requestMap.get(ip);
  if (!current || now > current.resetAt) {
    requestMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return false;
  }
  current.count += 1;
  requestMap.set(ip, current);
  return true;
}

export function verifySameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    const url = new URL(origin);
    return url.host === host;
  } catch {
    return false;
  }
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }
  return null;
}

export async function requireAdminMutation(req: Request) {
  const authError = await requireAdmin();
  if (authError) return authError;
  if (!verifySameOrigin(req)) {
    return NextResponse.json({ message: "Origin dogrulamasi basarisiz." }, { status: 403 });
  }
  return null;
}
