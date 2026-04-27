import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ALLOWED_FILES = [
  "home.json",
  "services.json",
  "site.json",
  "articles.json",
  "gallery.json",
  "kurumsal.json",
  "brands.json",
] as const;

type AllowedFile = (typeof ALLOWED_FILES)[number];

type UpdateBody = {
  file?: AllowedFile;
  jsonText?: string;
};

async function readJsonFile(file: AllowedFile) {
  const fullPath = path.join(CONTENT_DIR, file);
  const raw = await fs.readFile(fullPath, "utf8");
  return JSON.parse(raw) as unknown;
}

function normalizeJsonText(input: string): string {
  const parsed = JSON.parse(input) as unknown;
  return `${JSON.stringify(parsed, null, 2)}\n`;
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  const files = await Promise.all(
    ALLOWED_FILES.map(async (file) => {
      const data = await readJsonFile(file);
      return { file, data };
    }),
  );

  return NextResponse.json({
    files,
    allowedFiles: ALLOWED_FILES,
  });
}

export async function PUT(req: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ message: "Yetkisiz erisim." }, { status: 401 });
  }

  const body = (await req.json()) as UpdateBody;
  if (!body.file || !ALLOWED_FILES.includes(body.file)) {
    return NextResponse.json({ message: "Gecersiz dosya." }, { status: 400 });
  }
  if (typeof body.jsonText !== "string") {
    return NextResponse.json({ message: "jsonText gerekli." }, { status: 400 });
  }

  try {
    const normalized = normalizeJsonText(body.jsonText);
    const fullPath = path.join(CONTENT_DIR, body.file);
    await fs.writeFile(fullPath, normalized, "utf8");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: "JSON gecersiz. Kaydedilemedi." }, { status: 400 });
  }
}
