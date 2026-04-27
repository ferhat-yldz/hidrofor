import path from "node:path";

export const ADMIN_COOKIE_NAME = "ak_admin_session";
export const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 30;

export const CONTENT_DIR = path.join(process.cwd(), "content");
export const META_DIR = path.join(CONTENT_DIR, "_meta");
export const DRAFT_DIR = path.join(META_DIR, "drafts");
export const BACKUP_DIR = path.join(META_DIR, "backups");
export const MEDIA_UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");

export const AUTH_STATE_FILE = path.join(META_DIR, "admin-auth.json");
export const RATE_LIMIT_WINDOW_MS = 1000 * 60 * 15;
export const RATE_LIMIT_MAX_ATTEMPTS = 10;

export const ALLOWED_CONTENT_FILES = [
  "home.json",
  "services.json",
  "site.json",
  "articles.json",
  "gallery.json",
  "kurumsal.json",
  "brands.json",
] as const;

export type AllowedContentFile = (typeof ALLOWED_CONTENT_FILES)[number];
