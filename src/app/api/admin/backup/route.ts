import { NextResponse } from "next/server";
import { requireAdmin, requireAdminMutation } from "@/lib/admin/security";
import { createBackup, listBackups, restoreBackup } from "@/lib/admin/storage";

type BackupBody = {
  action?: "create" | "restore";
  backupId?: string;
  label?: string;
};

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;
  const backups = await listBackups();
  return NextResponse.json({ backups });
}

export async function POST(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  const body = (await req.json()) as BackupBody;
  if (body.action === "restore") {
    if (!body.backupId) {
      return NextResponse.json({ message: "backupId gerekli." }, { status: 400 });
    }
    await restoreBackup(body.backupId);
    return NextResponse.json({ ok: true, message: "Yedek geri yuklendi." });
  }

  const backupId = await createBackup(body.label);
  return NextResponse.json({ ok: true, backupId, message: "Yedek olusturuldu." });
}
