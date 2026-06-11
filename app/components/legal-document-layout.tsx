import Link from "next/link";
import { SiteHeader } from "./site-header";

export function LegalDocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#legal-content"
        className="focus-visible:ring-santu-accent sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-santu-ink focus:ring-2 focus:ring-offset-2"
      >
        Aller au contenu
      </a>
      <SiteHeader solidHeader />
      <div className="bg-santu-canvas min-h-dvh dark:bg-[#0a1219]">
        <main
          id="legal-content"
          className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:px-8 lg:pb-28"
        >
          <Link
            href="/"
            className="text-santu-accent hover:text-santu-accent-hover text-sm font-semibold transition-colors"
          >
            ← Retour à l’accueil
          </Link>
          <div className="mt-10">{children}</div>
        </main>
      </div>
    </>
  );
}
