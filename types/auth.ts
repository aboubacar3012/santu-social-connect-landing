export type AuthUser = {
  id: string;
  phoneE164: string;
  email: string | null;
  role: string;
  firstName: string | null;
  lastName: string | null;
};

export type VerifyOtpResponse = {
  accessToken: string;
  user: AuthUser;
};
