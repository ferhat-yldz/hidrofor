import type { AllowedContentFile } from "@/lib/admin/constants";

export type ContentStateItem = {
  file: AllowedContentFile;
  published: unknown;
  draft: unknown | null;
  hasDraft: boolean;
  updatedAt: string;
};

export type MediaItem = {
  name: string;
  url: string;
  size: number;
  updatedAt?: string;
};
