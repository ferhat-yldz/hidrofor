import { NextResponse } from "next/server";
import { ALLOWED_CONTENT_FILES, type AllowedContentFile } from "@/lib/admin/constants";
import { requireAdmin, requireAdminMutation } from "@/lib/admin/security";
import {
  getContentState,
  isAllowedContentFile,
  writePublishedContent,
} from "@/lib/admin/storage";

type UpdateBody = {
  file?: AllowedContentFile;
  data?: unknown;
};

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) => a.localeCompare(b));
  return `{${entries
    .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
    .join(",")}}`;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    return NextResponse.json({
      files: await getContentState(),
      allowedFiles: ALLOWED_CONTENT_FILES,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Icerikler yuklenemedi.";
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  try {
    const body = (await req.json()) as UpdateBody;
    if (!body.file || !isAllowedContentFile(body.file)) {
      return NextResponse.json({ message: "Gecersiz dosya." }, { status: 400 });
    }
    if (typeof body.data === "undefined") {
      return NextResponse.json({ message: "Kayit icin data gerekli." }, { status: 400 });
    }

    const state = await getContentState();
    const current = state.find((item) => item.file === body.file);
    if (!current) {
      return NextResponse.json({ message: "Icerik dosyasi bulunamadi." }, { status: 404 });
    }

    if (stableStringify(current.published) === stableStringify(body.data)) {
      return NextResponse.json(
        { message: "Ayni icerik tekrar yayinlanamaz. Once bir degisiklik yapin." },
        { status: 400 },
      );
    }

    await writePublishedContent(body.file, body.data);
    return NextResponse.json({ ok: true, message: "Degisiklikler yayina alindi." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Icerik islemi basarisiz.";
    return NextResponse.json({ message }, { status: 500 });
  }
}
