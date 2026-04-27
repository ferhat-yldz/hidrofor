import { NextResponse } from "next/server";
import {
  adminCookie,
  createSessionValueForUser,
  getAdminCredentials,
  verifyAdminPassword,
} from "@/lib/adminAuth";
import { checkRateLimit, verifySameOrigin } from "@/lib/admin/security";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(req: Request) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json({ ok: false, message: "Origin dogrulamasi basarisiz." }, { status: 403 });
  }
  if (!checkRateLimit(req)) {
    return NextResponse.json({ ok: false, message: "Cok fazla deneme yapildi." }, { status: 429 });
  }

  const body = (await req.json()) as LoginBody;
  const username = (body.username ?? "").trim();
  const password = body.password ?? "";

  const creds = getAdminCredentials();
  const passwordOk = await verifyAdminPassword(password);

  if (username !== creds.username || !passwordOk) {
    return NextResponse.json({ ok: false, message: "Kullanici adi veya sifre hatali." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: adminCookie.name,
    value: await createSessionValueForUser(username),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: adminCookie.maxAgeSeconds,
  });
  return res;
}
