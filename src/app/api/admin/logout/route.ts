import { NextResponse } from "next/server";
import { adminCookie } from "@/lib/adminAuth";
import { verifySameOrigin } from "@/lib/admin/security";

export async function POST(req: Request) {
  if (!verifySameOrigin(req)) {
    return NextResponse.json({ message: "Origin dogrulamasi basarisiz." }, { status: 403 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: adminCookie.name,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
}
