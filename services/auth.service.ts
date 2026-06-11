import { apiFetch } from "@/lib/api-client";
import type { VerifyOtpResponse } from "@/types/auth";

export async function requestOtpApi(phoneE164: string): Promise<{ ok: boolean }> {
  return apiFetch("/auth/phone/request-otp", {
    method: "POST",
    body: JSON.stringify({ phoneE164 }),
  });
}

export async function verifyOtpApi(
  phoneE164: string,
  code: string,
): Promise<VerifyOtpResponse> {
  return apiFetch("/auth/phone/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneE164, code }),
  });
}
