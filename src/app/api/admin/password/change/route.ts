import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminPassword, verifyAdminPassword } from "@/lib/adminAuth";
import { requireAdminMutation } from "@/lib/admin/security";

type ChangePasswordBody = {
  currentPassword?: string;
  nextPassword?: string;
};

function validatePassword(password: string) {
  if (password.length < 8) {
    return "Sifre en az 8 karakter olmali.";
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Sifre buyuk harf, kucuk harf ve rakam icermeli.";
  }
  return null;
}

export async function POST(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  const body = (await req.json()) as ChangePasswordBody;
  const currentPassword = body.currentPassword ?? "";
  const nextPassword = body.nextPassword ?? "";
  const creds = getAdminCredentials();

  const isCurrentValid = await verifyAdminPassword(currentPassword);
  if (!isCurrentValid) {
    return NextResponse.json({ message: "Mevcut sifre hatali." }, { status: 400 });
  }

  if (nextPassword === creds.password) {
    return NextResponse.json({ message: "Yeni sifre eski sifreyle ayni olamaz." }, { status: 400 });
  }

  const policyError = validatePassword(nextPassword);
  if (policyError) {
    return NextResponse.json({ message: policyError }, { status: 400 });
  }

  await setAdminPassword(nextPassword);
  return NextResponse.json({ ok: true, message: "Sifre basariyla degistirildi. Tekrar giris yapin." });
}
