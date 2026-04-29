import { createClient } from "@supabase/supabase-js";

function getEnv(name: string) {
  return process.env[name]?.trim();
}

export function isSupabaseEnabled() {
  return Boolean(getEnv("SUPABASE_URL") && getEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function getSupabaseAdminClient() {
  const url = getEnv("SUPABASE_URL");
  const key = getEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) {
    throw new Error("Supabase env degiskenleri tanimli degil.");
  }
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const SUPABASE_TABLES = {
  content: "admin_content",
  backups: "admin_backups",
  authState: "admin_auth_state",
} as const;

export const SUPABASE_BUCKETS = {
  media: "admin-media",
} as const;
