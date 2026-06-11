"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ solidHeader = false }: { solidHeader?: boolean }) {
  const [solid, setSolid] = useState(solidHeader);

  useEffect(() => {
    if (solidHeader) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solidHeader]);

  const onHero = !solid;

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "border-b border-black/[0.06] bg-white/85 text-santu-ink shadow-[0_8px_32px_-12px_rgba(0,0,0,0.12)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/[0.08] dark:bg-zinc-950/88 dark:text-white"
          : "border-b border-transparent bg-transparent text-santu-ink dark:text-white"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:h-[3.75rem] sm:px-8">
        <Link href="/" className="flex flex-col gap-0.5">
          <span
            className={`text-[11px] font-extrabold tracking-[0.28em] ${
              solid ? "text-santu-accent" : "text-santu-accent"
            }`}
          >
            SANTU CONNECT
          </span>
          <span
            className={`text-xs font-semibold tracking-wide ${
              solid
                ? "text-santu-faint dark:text-zinc-400"
                : "text-santu-muted dark:text-zinc-400"
            }`}
          >
            Marseille
          </span>
        </Link>
        <nav className="flex items-center" aria-label="Navigation principale">
          <ThemeToggle onHero={onHero} />
        </nav>
      </div>
    </header>
  );
}
