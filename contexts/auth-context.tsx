"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { AuthUser } from "@/types/auth";

const STORAGE_TOKEN = "santu-landing/access_token";
const STORAGE_USER = "santu-landing/user";

type AuthContextValue = {
  isReady: boolean;
  token: string | null;
  user: AuthUser | null;
  isAdmin: boolean;
  signIn: (accessToken: string, user: AuthUser) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_USER);
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);
      }
    } catch {
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER);
    } finally {
      setIsReady(true);
    }
  }, []);

  const signIn = useCallback((accessToken: string, nextUser: AuthUser) => {
    localStorage.setItem(STORAGE_TOKEN, accessToken);
    localStorage.setItem(STORAGE_USER, JSON.stringify(nextUser));
    setToken(accessToken);
    setUser(nextUser);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      token,
      user,
      isAdmin: user?.role === "admin",
      signIn,
      signOut,
    }),
    [isReady, token, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
