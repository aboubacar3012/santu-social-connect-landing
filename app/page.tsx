import Link from "next/link";

const APP_STORE_URL = "#" as const;
const PLAY_STORE_URL = "#" as const;

const FOOTER_LINKS = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/terms", label: "Conditions d’utilisation" },
  { href: "/legal-notice", label: "Mentions légales" },
  { href: "/help", label: "Aide" },
] as const;

export default function Home() {
  return (
    <main className="bg-santu-mesh relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-16">
      <div
        className="bg-santu-grid pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div
        className="animate-santu-float pointer-events-none absolute -top-20 -right-16 h-72 w-72 rounded-full bg-santu-accent/14 blur-3xl"
        aria-hidden
      />
      <div
        className="animate-santu-float-delayed pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-santu-accent-light/12 blur-3xl"
        aria-hidden
      />

      <section
        className="relative flex max-w-lg flex-col items-center text-center"
        aria-labelledby="hero-titre"
      >
        <p className="text-[11px] font-extrabold tracking-[0.28em] text-santu-accent">
          SANTU CONNECT
        </p>
        <p className="mt-1 text-xs font-semibold tracking-wide text-santu-faint">
          Marseille
        </p>

        <h1
          id="hero-titre"
          className="font-display mt-8 text-[2rem] leading-[1.1] font-bold tracking-[-0.04em] text-santu-ink sm:text-4xl dark:text-white"
        >
          Le réseau des
          <span className="text-santu-accent"> entrepreneurs marseillais</span>
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed text-santu-muted dark:text-zinc-400">
          Téléchargez l&apos;application pour rejoindre la communauté.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={APP_STORE_URL}
            className="bg-santu-accent hover:bg-santu-accent-hover focus-visible:ring-santu-accent inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl px-6 text-sm font-bold text-white shadow-lg shadow-santu-accent/28 transition-[transform,box-shadow] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] sm:max-w-[200px] sm:flex-none"
          >
            App Store
          </Link>
          <Link
            href={PLAY_STORE_URL}
            className="focus-visible:ring-santu-accent inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-zinc-300/90 bg-white/80 px-6 text-sm font-bold text-santu-ink backdrop-blur-sm transition-colors hover:border-zinc-400 hover:bg-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:max-w-[200px] sm:flex-none"
          >
            Google Play
          </Link>
        </div>
      </section>

      <nav
        className="relative mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-santu-faint"
        aria-label="Liens légaux et aide"
      >
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-santu-accent transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
