"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

const NAV = [
  { href: "/admin/events", label: "Événements" },
  { href: "/admin/events/new", label: "Créer" },
] as const;

type AdminShellProps = {
  title: string;
  children: React.ReactNode;
};

export function AdminShell({ title, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <main className="bg-santu-canvas min-h-dvh dark:bg-[#0a1219]">
      <header className="border-b border-black/[0.06] bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-950/90">
        <div className="mx-auto max-w-4xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[11px] font-extrabold tracking-[0.28em] text-santu-accent">
                SANTU CONNECT
              </p>
              <h1 className="font-display text-xl font-bold text-santu-ink dark:text-white">
                {title}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm font-semibold text-santu-muted hover:text-santu-accent"
              >
                Accueil
              </Link>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  router.replace("/admin/login");
                }}
                className="rounded-xl border border-black/[0.08] px-3 py-2 text-sm font-semibold text-santu-muted hover:text-santu-accent dark:border-white/10"
              >
                Déconnexion
              </button>
            </div>
          </div>

          <nav
            className="mt-4 flex gap-2"
            aria-label="Navigation administration"
          >
            {NAV.map((item) => {
              const active =
                item.href === "/admin/events"
                  ? pathname === "/admin/events" ||
                    (pathname.startsWith("/admin/events/") &&
                      pathname !== "/admin/events/new")
                  : pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-santu-accent text-white"
                      : "bg-black/[0.04] text-santu-muted hover:text-santu-accent dark:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">{children}</div>
    </main>
  );
}
