import { NextResponse } from "next/server";
import { ALLOWED_CONTENT_FILES, type AllowedContentFile } from "@/lib/admin/constants";
import { requireAdmin, requireAdminMutation } from "@/lib/admin/security";
import {
  clearDraft,
  getContentState,
  isAllowedContentFile,
  publishDraft,
  writeDraftContent,
} from "@/lib/admin/storage";

type UpdateBody = {
  file?: AllowedContentFile;
  data?: unknown;
  action?: "saveDraft" | "publish" | "discardDraft";
};

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  return NextResponse.json({
    files: await getContentState(),
    allowedFiles: ALLOWED_CONTENT_FILES,
  });
}

export async function PUT(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  const body = (await req.json()) as UpdateBody;
  if (!body.file || !isAllowedContentFile(body.file)) {
    return NextResponse.json({ message: "Gecersiz dosya." }, { status: 400 });
  }
  const action = body.action ?? "saveDraft";

  if (action === "saveDraft") {
    if (typeof body.data === "undefined") {
      return NextResponse.json({ message: "Kayit icin data gerekli." }, { status: 400 });
    }
    await writeDraftContent(body.file, body.data);
    return NextResponse.json({ ok: true, message: "Taslak kaydedildi." });
  }

  if (action === "publish") {
    await publishDraft(body.file);
    return NextResponse.json({ ok: true, message: "Icerik yayina alindi." });
  }

  if (action === "discardDraft") {
    await clearDraft(body.file);
    return NextResponse.json({ ok: true, message: "Taslak silindi." });
  }

  return NextResponse.json({ message: "Gecersiz islem." }, { status: 400 });
}
