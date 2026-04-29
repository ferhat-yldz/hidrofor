import { promises as fs } from "node:fs";
import path from "node:path";
import {
  ALLOWED_CONTENT_FILES,
  BACKUP_DIR,
  CONTENT_DIR,
  DRAFT_DIR,
  META_DIR,
  type AllowedContentFile,
} from "@/lib/admin/constants";
import { SUPABASE_TABLES, getSupabaseAdminClient, isSupabaseEnabled } from "@/lib/admin/supabase";

export async function ensureAdminDirs() {
  await fs.mkdir(META_DIR, { recursive: true });
  await fs.mkdir(DRAFT_DIR, { recursive: true });
  await fs.mkdir(BACKUP_DIR, { recursive: true });
}

export function isAllowedContentFile(file: string): file is AllowedContentFile {
  return (ALLOWED_CONTENT_FILES as readonly string[]).includes(file);
}

async function readPublishedContentFromFs(file: AllowedContentFile): Promise<unknown> {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as unknown;
}

async function readDraftContentFromFs(file: AllowedContentFile): Promise<unknown | null> {
  const fullPath = path.join(DRAFT_DIR, file);
  try {
    const raw = await fs.readFile(fullPath, "utf8");
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

async function writePublishedContentToFs(file: AllowedContentFile, data: unknown) {
  const fullPath = path.join(CONTENT_DIR, file);
  await fs.writeFile(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

type DbContentRow = {
  file: AllowedContentFile;
  published: unknown;
  draft: unknown | null;
  updated_at: string;
};

async function ensureSupabaseContentSeeded() {
  if (!isSupabaseEnabled()) return;
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase.from(SUPABASE_TABLES.content).select("file");
  if (error) throw error;
  if (data && data.length > 0) return;

  const rows = await Promise.all(
    ALLOWED_CONTENT_FILES.map(async (file) => ({
      file,
      published: await readPublishedContentFromFs(file),
      draft: null,
    })),
  );

  const { error: insertError } = await supabase.from(SUPABASE_TABLES.content).insert(rows);
  if (insertError) throw insertError;
}

export async function readPublishedContent(file: AllowedContentFile): Promise<unknown> {
  if (isSupabaseEnabled()) {
    await ensureSupabaseContentSeeded();
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.content)
      .select("published")
      .eq("file", file)
      .single();
    if (error) throw error;
    return data.published as unknown;
  }
  return readPublishedContentFromFs(file);
}

export async function readDraftContent(file: AllowedContentFile): Promise<unknown | null> {
  if (isSupabaseEnabled()) {
    await ensureSupabaseContentSeeded();
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.content)
      .select("draft")
      .eq("file", file)
      .single();
    if (error) throw error;
    return (data.draft ?? null) as unknown | null;
  }
  return readDraftContentFromFs(file);
}

export async function writeDraftContent(file: AllowedContentFile, data: unknown) {
  if (isSupabaseEnabled()) {
    await ensureSupabaseContentSeeded();
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from(SUPABASE_TABLES.content)
      .update({ draft: data, updated_at: new Date().toISOString() })
      .eq("file", file);
    if (error) throw error;
    return;
  }

  await ensureAdminDirs();
  const fullPath = path.join(DRAFT_DIR, file);
  await fs.writeFile(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function writePublishedContent(file: AllowedContentFile, data: unknown) {
  if (isSupabaseEnabled()) {
    await ensureSupabaseContentSeeded();
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from(SUPABASE_TABLES.content)
      .update({ published: data, draft: null, updated_at: new Date().toISOString() })
      .eq("file", file);
    if (error) throw error;
    // Keep JSON files in sync so localhost pages reflect published content immediately.
    await writePublishedContentToFs(file, data);
    return;
  }

  await writePublishedContentToFs(file, data);
}

export async function publishDraft(file: AllowedContentFile) {
  if (isSupabaseEnabled()) {
    const draft = await readDraftContent(file);
    if (!draft) {
      throw new Error("Taslak bulunamadi.");
    }
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from(SUPABASE_TABLES.content)
      .update({
        published: draft,
        draft: null,
        updated_at: new Date().toISOString(),
      })
      .eq("file", file);
    if (error) throw error;
    await writePublishedContentToFs(file, draft);
    return;
  }

  const draft = await readDraftContent(file);
  if (!draft) {
    throw new Error("Taslak bulunamadi.");
  }
  const fullPath = path.join(CONTENT_DIR, file);
  await fs.writeFile(fullPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
}

export async function clearDraft(file: AllowedContentFile) {
  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdminClient();
    const { error } = await supabase
      .from(SUPABASE_TABLES.content)
      .update({ draft: null, updated_at: new Date().toISOString() })
      .eq("file", file);
    if (error) throw error;
    return;
  }

  const fullPath = path.join(DRAFT_DIR, file);
  try {
    await fs.unlink(fullPath);
  } catch {
    // ignore
  }
}

export async function getContentState() {
  if (isSupabaseEnabled()) {
    await ensureSupabaseContentSeeded();
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.content)
      .select("file,published,draft,updated_at");
    if (error) throw error;
    const rows = (data as DbContentRow[]) ?? [];
    const map = new Map(rows.map((row) => [row.file, row]));

    return ALLOWED_CONTENT_FILES.map((file) => {
      const row = map.get(file);
      if (!row) {
        return {
          file,
          published: {},
          draft: null,
          hasDraft: false,
          updatedAt: new Date().toISOString(),
        };
      }
      return {
        file,
        published: row.published,
        draft: row.draft,
        hasDraft: row.draft !== null,
        updatedAt: row.updated_at,
      };
    });
  }

  const files = await Promise.all(
    ALLOWED_CONTENT_FILES.map(async (file) => {
      const published = await readPublishedContent(file);
      const draft = await readDraftContent(file);
      return {
        file,
        published,
        draft,
        hasDraft: draft !== null,
        updatedAt: new Date().toISOString(),
      };
    }),
  );
  return files;
}

export async function createBackup(label?: string) {
  if (isSupabaseEnabled()) {
    const snapshot = await Promise.all(
      ALLOWED_CONTENT_FILES.map(async (file) => ({
        file,
        published: await readPublishedContent(file),
      })),
    );
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.backups)
      .insert({
        label: label ?? null,
        snapshot: snapshot.reduce<Record<string, unknown>>((acc, item) => {
          acc[item.file] = item.published;
          return acc;
        }, {}),
      })
      .select("id")
      .single();
    if (error) throw error;
    return data.id as string;
  }

  await ensureAdminDirs();
  const backupId = `${new Date().toISOString().replace(/[:.]/g, "-")}${label ? `-${label}` : ""}`;
  const targetDir = path.join(BACKUP_DIR, backupId);
  await fs.mkdir(targetDir, { recursive: true });

  await Promise.all(
    ALLOWED_CONTENT_FILES.map(async (file) => {
      const content = await readPublishedContent(file);
      await fs.writeFile(path.join(targetDir, file), `${JSON.stringify(content, null, 2)}\n`, "utf8");
    }),
  );

  return backupId;
}

export async function listBackups() {
  if (isSupabaseEnabled()) {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.backups)
      .select("id,created_at,label")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []).map((row: { id: string; created_at: string; label: string | null }) => {
      const labelText = row.label?.trim() ? ` (${row.label.trim()})` : "";
      return `${row.id}${labelText}`;
    });
  }

  await ensureAdminDirs();
  const names = await fs.readdir(BACKUP_DIR, { withFileTypes: true });
  const dirs = names.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  dirs.sort((a, b) => b.localeCompare(a));
  return dirs;
}

export async function restoreBackup(backupId: string) {
  if (isSupabaseEnabled()) {
    const onlyId = backupId.split(" ")[0];
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from(SUPABASE_TABLES.backups)
      .select("snapshot")
      .eq("id", onlyId)
      .single();
    if (error) throw error;
    const snapshot = (data.snapshot ?? {}) as Record<string, unknown>;

    for (const file of ALLOWED_CONTENT_FILES) {
      if (Object.prototype.hasOwnProperty.call(snapshot, file)) {
        const published = snapshot[file];
        const { error: updateError } = await supabase
          .from(SUPABASE_TABLES.content)
          .update({
            published,
            draft: null,
            updated_at: new Date().toISOString(),
          })
          .eq("file", file);
        if (updateError) throw updateError;
        await writePublishedContentToFs(file, published);
      }
    }
    return;
  }

  const sourceDir = path.join(BACKUP_DIR, backupId);
  await Promise.all(
    ALLOWED_CONTENT_FILES.map(async (file) => {
      const raw = await fs.readFile(path.join(sourceDir, file), "utf8");
      const parsed = JSON.parse(raw) as unknown;
      await fs.writeFile(path.join(CONTENT_DIR, file), `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
    }),
  );
}
