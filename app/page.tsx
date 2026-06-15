import Link from "next/link";

const APP_STORE_URL = "#" as const;
const PLAY_STORE_URL = "#" as const;

function AppleStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.303 2.303-8.633-8.635z" />
    </svg>
  );
}

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
            className="group bg-santu-accent hover:bg-santu-accent-hover focus-visible:ring-santu-accent inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-2xl px-6 text-sm font-bold text-white shadow-lg shadow-santu-accent/28 transition-[transform,box-shadow] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] sm:max-w-[220px] sm:flex-none"
          >
            <AppleStoreIcon className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />
            App Store
          </Link>
          <Link
            href={PLAY_STORE_URL}
            className="group focus-visible:ring-santu-accent inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-2xl border border-zinc-300/90 bg-white/80 px-6 text-sm font-bold text-santu-ink backdrop-blur-sm transition-[colors,transform,box-shadow] hover:border-zinc-400 hover:bg-white hover:shadow-md focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 sm:max-w-[220px] sm:flex-none"
          >
            <GooglePlayIcon className="h-5 w-5 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110" />
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
