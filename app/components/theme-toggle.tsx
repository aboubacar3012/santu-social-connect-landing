"use client";

import { useAppTheme } from "../providers";

export function ThemeToggle({ onHero = false }: { onHero?: boolean }) {
  const { theme, toggleTheme } = useAppTheme();
  const isDark = theme === "dark";

  const base =
    "focus-visible:ring-santu-accent flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";

  const surface = onHero
    ? "border border-white/25 bg-white/12 text-white shadow-lg shadow-black/10 hover:border-white/40 hover:bg-white/20 focus-visible:ring-offset-transparent"
    : "border border-black/[0.08] bg-white text-zinc-800 shadow-sm hover:border-black/[0.12] hover:bg-zinc-50 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700 dark:focus-visible:ring-offset-zinc-950";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`${base} ${surface}`}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <span className="text-[15px]" aria-hidden>
          ☀
        </span>
      ) : (
        <span className="text-[15px]" aria-hidden>
          ☾
        </span>
      )}
    </button>
  );
}
