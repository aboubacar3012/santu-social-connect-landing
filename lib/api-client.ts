export function getApiBase(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000").replace(
    /\/+$/,
    "",
  );
}

export function formatApiErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (typeof record.message === "string") return record.message;
    if (Array.isArray(record.message)) {
      return record.message.filter((m) => typeof m === "string").join(", ");
    }
  }
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string } = {},
): Promise<T> {
  const { token, headers, ...rest } = options;
  const isFormData =
    typeof FormData !== "undefined" && rest.body instanceof FormData;
  const res = await fetch(`${getApiBase()}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      ...(!isFormData && rest.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const text = await res.text();
  let body: unknown = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = {};
  }

  if (!res.ok) {
    throw new Error(formatApiErrorMessage(body, text || `Erreur ${res.status}`));
  }

  return body as T;
}
