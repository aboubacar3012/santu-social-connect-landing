"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth-context";
import { requestOtpApi, verifyOtpApi } from "@/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isReady, isAdmin, signIn } = useAuth();

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isReady && isAdmin) {
      router.replace("/admin/events");
    }
  }, [isReady, isAdmin, router]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestOtpApi(phone.trim());
      setStep("code");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible d'envoyer le code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const data = await verifyOtpApi(phone.trim(), code.trim());
      if (data.user.role !== "admin") {
        throw new Error("Accès réservé aux administrateurs.");
      }
      signIn(data.accessToken, data.user);
      router.replace("/admin/events");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Code invalide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-santu-mesh flex min-h-dvh items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-black/[0.06] bg-white p-8 shadow-xl dark:border-white/10 dark:bg-zinc-900/90">
        <p className="text-[11px] font-extrabold tracking-[0.28em] text-santu-accent">
          SANTU CONNECT
        </p>
        <h1 className="font-display mt-3 text-2xl font-bold text-santu-ink dark:text-white">
          Administration événements
        </h1>
        <p className="mt-2 text-sm text-santu-muted">
          Connectez-vous avec un compte administrateur pour gérer les événements.
        </p>

        {step === "phone" ? (
          <form onSubmit={(e) => void handleRequestOtp(e)} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-santu-muted">Téléphone (E.164)</span>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+33612345678"
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="bg-santu-accent hover:bg-santu-accent-hover w-full rounded-2xl py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {loading ? "Envoi…" : "Recevoir un code"}
            </button>
          </form>
        ) : (
          <form onSubmit={(e) => void handleVerifyOtp(e)} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-xs font-semibold text-santu-muted">Code reçu par SMS</span>
              <input
                required
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
              />
            </label>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button
              type="submit"
              disabled={loading}
              className="bg-santu-accent hover:bg-santu-accent-hover w-full rounded-2xl py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              {loading ? "Vérification…" : "Se connecter"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("phone");
                setCode("");
                setError(null);
              }}
              className="w-full text-sm font-semibold text-santu-muted hover:text-santu-accent"
            >
              Changer de numéro
            </button>
          </form>
        )}

        <Link
          href="/"
          className="mt-8 inline-block text-sm font-semibold text-santu-accent hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
