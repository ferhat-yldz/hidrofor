import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { MEDIA_UPLOAD_DIR } from "@/lib/admin/constants";
import { requireAdmin, requireAdminMutation } from "@/lib/admin/security";

function publicUrlFromPath(fileName: string) {
  return `/images/uploads/${fileName}`;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  await fs.mkdir(MEDIA_UPLOAD_DIR, { recursive: true });
  const entries = await fs.readdir(MEDIA_UPLOAD_DIR, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((entry) => entry.isFile())
      .map(async (entry) => {
        const fullPath = path.join(MEDIA_UPLOAD_DIR, entry.name);
        const stat = await fs.stat(fullPath);
        return {
          name: entry.name,
          url: publicUrlFromPath(entry.name),
          size: stat.size,
          updatedAt: stat.mtime.toISOString(),
        };
      }),
  );

  files.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  return NextResponse.json({ files });
}

export async function POST(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  await fs.mkdir(MEDIA_UPLOAD_DIR, { recursive: true });
  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Dosya bulunamadi." }, { status: 400 });
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
  const targetPath = path.join(MEDIA_UPLOAD_DIR, safeName);
  const bytes = await file.arrayBuffer();
  await fs.writeFile(targetPath, Buffer.from(bytes));

  return NextResponse.json({
    ok: true,
    file: {
      name: safeName,
      url: publicUrlFromPath(safeName),
      size: file.size,
    },
  });
}

export async function DELETE(req: Request) {
  const authError = await requireAdminMutation(req);
  if (authError) return authError;

  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file) {
    return NextResponse.json({ message: "Silinecek dosya belirtilmedi." }, { status: 400 });
  }

  const safeName = file.replace(/[^a-zA-Z0-9_.-]/g, "_");
  const targetPath = path.join(MEDIA_UPLOAD_DIR, safeName);
  try {
    await fs.unlink(targetPath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Dosya silinemedi." }, { status: 404 });
  }
}
