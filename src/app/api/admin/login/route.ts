import { NextResponse } from "next/server";
import { adminCookie, createSessionValue, getAdminCredentials } from "@/lib/adminAuth";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as LoginBody;
  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  const creds = getAdminCredentials();

  if (username !== creds.username || password !== creds.password) {
    return NextResponse.json({ ok: false, message: "Kullanici adi veya sifre hatali." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: adminCookie.name,
    value: createSessionValue(username),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookie.maxAgeSeconds,
  });
  return res;
}
