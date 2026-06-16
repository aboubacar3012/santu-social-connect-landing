import { apiFetch } from "@/lib/api-client";

const ALLOWED_PRESIGN_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "video/mp4",
  "video/quicktime",
  "application/pdf",
]);

function normalizeContentTypeForUpload(raw: string, fileName: string): string {
  const t = raw.split(";")[0]?.trim().toLowerCase() ?? "";
  if (t === "image/jpg") return "image/jpeg";
  if (ALLOWED_PRESIGN_CONTENT_TYPES.has(t)) return t;

  const lower = fileName.toLowerCase();
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".heic")) return "image/heic";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";

  return "image/jpeg";
}

type UploadFileResponse = {
  fileUrl: string;
};

/**
 * Upload via l’API (multipart) : évite le PUT direct navigateur → S3 bloqué par CORS.
 * L’app mobile continue d’utiliser le presign natif sans restriction CORS.
 */
export async function uploadImageFile(
  token: string,
  file: File,
): Promise<string> {
  const fileName = file.name || "event-cover.jpg";
  const contentType = normalizeContentTypeForUpload(file.type, fileName);
  const uploadFile =
    file.type && file.type !== contentType
      ? new File([file], fileName, { type: contentType })
      : file;

  const formData = new FormData();
  formData.append("file", uploadFile, fileName);

  const data = await apiFetch<UploadFileResponse>("/uploads/file", {
    method: "POST",
    token,
    body: formData,
  });

  if (!data.fileUrl) {
    throw new Error("Réponse upload invalide.");
  }

  return data.fileUrl;
}
