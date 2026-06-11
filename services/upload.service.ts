import { apiFetch } from "@/lib/api-client";

type PresignResponse = {
  uploadUrl: string;
  fileUrl: string;
  contentType?: string;
};

export async function uploadImageFile(token: string, file: File): Promise<string> {
  const contentType = file.type || "image/jpeg";
  const presign = await apiFetch<PresignResponse>("/uploads/presign", {
    method: "POST",
    token,
    body: JSON.stringify({
      contentType,
      fileName: file.name || "event-cover.jpg",
    }),
  });

  const uploadRes = await fetch(presign.uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": presign.contentType ?? contentType },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Échec de l’upload de l’image");
  }

  return presign.fileUrl;
}
