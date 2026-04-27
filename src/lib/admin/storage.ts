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

export async function ensureAdminDirs() {
  await fs.mkdir(META_DIR, { recursive: true });
  await fs.mkdir(DRAFT_DIR, { recursive: true });
  await fs.mkdir(BACKUP_DIR, { recursive: true });
}

export function isAllowedContentFile(file: string): file is AllowedContentFile {
  return (ALLOWED_CONTENT_FILES as readonly string[]).includes(file);
}

export async function readPublishedContent(file: AllowedContentFile): Promise<unknown> {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as unknown;
}

export async function readDraftContent(file: AllowedContentFile): Promise<unknown | null> {
  const fullPath = path.join(DRAFT_DIR, file);
  try {
    const raw = await fs.readFile(fullPath, "utf8");
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

export async function writeDraftContent(file: AllowedContentFile, data: unknown) {
  await ensureAdminDirs();
  const fullPath = path.join(DRAFT_DIR, file);
  await fs.writeFile(fullPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export async function publishDraft(file: AllowedContentFile) {
  const draft = await readDraftContent(file);
  if (!draft) {
    throw new Error("Taslak bulunamadi.");
  }
  const fullPath = path.join(CONTENT_DIR, file);
  await fs.writeFile(fullPath, `${JSON.stringify(draft, null, 2)}\n`, "utf8");
}

export async function clearDraft(file: AllowedContentFile) {
  const fullPath = path.join(DRAFT_DIR, file);
  try {
    await fs.unlink(fullPath);
  } catch {
    // ignore
  }
}

export async function getContentState() {
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
  await ensureAdminDirs();
  const names = await fs.readdir(BACKUP_DIR, { withFileTypes: true });
  const dirs = names.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  dirs.sort((a, b) => b.localeCompare(a));
  return dirs;
}

export async function restoreBackup(backupId: string) {
  const sourceDir = path.join(BACKUP_DIR, backupId);
  await Promise.all(
    ALLOWED_CONTENT_FILES.map(async (file) => {
      const raw = await fs.readFile(path.join(sourceDir, file), "utf8");
      const parsed = JSON.parse(raw) as unknown;
      await fs.writeFile(path.join(CONTENT_DIR, file), `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
    }),
  );
}
