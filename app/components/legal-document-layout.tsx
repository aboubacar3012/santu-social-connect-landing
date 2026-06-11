import Link from "next/link";
import { SiteHeader } from "./site-header";

export function LegalDocumentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
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
