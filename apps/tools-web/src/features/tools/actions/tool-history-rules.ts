export const saveAllowedSlugs = new Set(["qr-generator", "png-to-jpg", "jpg-to-png"]);

const saveAllowedMimeTypesBySlug: Record<string, ReadonlySet<string>> = {
  "qr-generator": new Set(["image/png"]),
  "png-to-jpg": new Set(["image/jpeg"]),
  "jpg-to-png": new Set(["image/png"]),
};

export const AUTHENTICATED_SAVE_MAX_BYTES = 10 * 1024 * 1024;

function sanitizeBaseName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-_.]+|[-_.]+$/g, "");
}

export function normalizeArtifactFileName(fileName: string, fallbackExtension: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  const baseName = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  const normalizedBase = sanitizeBaseName(baseName);
  const safeBase = normalizedBase.length > 0 ? normalizedBase : "netmetric-output";
  return `${safeBase}.${fallbackExtension}`;
}

export function getFallbackExtension(mimeType: string): string {
  if (mimeType === "image/png") {
    return "png";
  }

  if (mimeType === "image/jpeg") {
    return "jpg";
  }

  return "bin";
}

export function ensureSaveFileConstraints(params: {
  toolSlug: string;
  mimeType: string;
  fileSize: number;
}): { ok: true } | { ok: false; message: string } {
  if (!saveAllowedSlugs.has(params.toolSlug)) {
    return { ok: false, message: "This tool cannot be saved to history yet." };
  }

  if (params.fileSize <= 0) {
    return { ok: false, message: "Generated output is empty." };
  }

  if (params.fileSize > AUTHENTICATED_SAVE_MAX_BYTES) {
    return { ok: false, message: "Generated output exceeds the 10 MB save limit." };
  }

  const allowedMimeTypes = saveAllowedMimeTypesBySlug[params.toolSlug];
  if (!allowedMimeTypes?.has(params.mimeType)) {
    return { ok: false, message: "Unsupported output type for this tool." };
  }

  if (params.mimeType === "image/svg+xml") {
    return { ok: false, message: "SVG output is not supported for history save." };
  }

  return { ok: true };
}
