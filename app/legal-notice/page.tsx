import type { Metadata } from "next";
import { LegalDocumentLayout } from "../components/legal-document-layout";

export const metadata: Metadata = {
  title: "Mentions légales — Santu Connect",
  description:
    "Informations légales sur l’éditeur du site et de l’application Santu Connect.",
  robots: { index: true, follow: true },
};

export default function LegalNoticePage() {
  return (
    <LegalDocumentLayout>
      <article className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="font-display text-3xl font-bold tracking-tight text-santu-ink sm:text-4xl dark:text-white">
          Mentions légales
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
          Mars 2026 — À compléter avant mise en production
        </p>
        <p className="mt-8">
          Cette page doit préciser : la dénomination sociale et la forme juridique
          de l’éditeur, l’adresse du siège, le numéro d’immatriculation (le cas
          échéant), le nom du directeur de publication, l’hébergeur du site
          (coordonnées), et toute information exigée par la loi applicable en
          France ou dans les pays où le service est proposé.
        </p>
        <p className="mt-4">
          Contact général : adresse e-mail et téléphone à ajouter ici.
        </p>
      </article>
    </LegalDocumentLayout>
  );
}
