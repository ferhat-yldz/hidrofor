"use client";

import { useEffect, useState } from "react";

type PreviewMessage = {
  type: "ak-admin-preview";
  file: string;
  data: unknown;
};

export function postPreviewToFrame(target: Window | null, file: string, data: unknown) {
  if (!target) return;
  const message: PreviewMessage = { type: "ak-admin-preview", file, data };
  target.postMessage(message, window.location.origin);
}

export function useLivePreviewFile<T>(file: string, fallback: T): T {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [value, setValue] = useState<T>(fallback);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsPreviewMode(params.get("preview") === "1");
  }, []);

  useEffect(() => {
    if (!isPreviewMode) return;

    // Preview mode starts from server-rendered fallback value and
    // then only updates from admin postMessage events.

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const payload = event.data as PreviewMessage | undefined;
      if (!payload || payload.type !== "ak-admin-preview" || payload.file !== file) return;
      setValue(payload.data as T);
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [file, isPreviewMode]);

  return value;
}
