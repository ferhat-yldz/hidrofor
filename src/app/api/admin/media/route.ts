import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { MEDIA_UPLOAD_DIR } from "@/lib/admin/constants";
import { requireAdmin, requireAdminMutation } from "@/lib/admin/security";
import {
  SUPABASE_BUCKETS,
  getSupabaseAdminClient,
  isSupabaseEnabled,
} from "@/lib/admin/supabase";

function publicUrlFromPath(fileName: string) {
  return `/images/uploads/${fileName}`;
}

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.storage.from(SUPABASE_BUCKETS.media).list("", {
      limit: 200,
      sortBy: { column: "updated_at", order: "desc" },
    });
    if (error) {
      return NextResponse.json({ message: "Medya listesi alinamadi." }, { status: 500 });
    }

    const files = (data ?? [])
      .filter((item) => item.name && item.id)
      .map((item) => {
        const { data: publicUrl } = supabase.storage
          .from(SUPABASE_BUCKETS.media)
          .getPublicUrl(item.name);
        return {
          name: item.name,
          url: publicUrl.publicUrl,
          size: item.metadata?.size ?? 0,
          updatedAt: item.updated_at ?? new Date().toISOString(),
        };
      });
    return NextResponse.json({ files });
  }

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

  const formData = await req.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ message: "Dosya bulunamadi." }, { status: 400 });
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9_.-]/g, "_")}`;
  const bytes = await file.arrayBuffer();

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.storage
      .from(SUPABASE_BUCKETS.media)
      .upload(safeName, Buffer.from(bytes), {
        upsert: false,
        contentType: file.type || "application/octet-stream",
      });
    if (error) {
      return NextResponse.json({ message: "Dosya yuklenemedi." }, { status: 500 });
    }
    const { data: publicUrl } = supabase.storage.from(SUPABASE_BUCKETS.media).getPublicUrl(safeName);
    return NextResponse.json({
      ok: true,
      file: {
        name: safeName,
        url: publicUrl.publicUrl,
        size: file.size,
      },
    });
  }

  await fs.mkdir(MEDIA_UPLOAD_DIR, { recursive: true });
  const targetPath = path.join(MEDIA_UPLOAD_DIR, safeName);
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

  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase.storage.from(SUPABASE_BUCKETS.media).remove([safeName]);
    if (error) {
      return NextResponse.json({ message: "Dosya silinemedi." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  }

  const targetPath = path.join(MEDIA_UPLOAD_DIR, safeName);
  try {
    await fs.unlink(targetPath);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "Dosya silinemedi." }, { status: 404 });
  }
}
