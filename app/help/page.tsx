import type { Metadata } from "next";
import { LegalDocumentLayout } from "../components/legal-document-layout";

export const metadata: Metadata = {
  title: "Aide — Santu Connect",
  description:
    "Besoin d’aide avec Santu Connect ? Contact et questions fréquentes.",
  robots: { index: true, follow: true },
};

export default function HelpPage() {
  return (
    <LegalDocumentLayout>
      <article className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="font-display text-3xl font-bold tracking-tight text-santu-ink sm:text-4xl dark:text-white">
          Aide
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
          Santu Connect — support utilisateur
        </p>

        <h2 className="font-display mt-12 text-xl font-bold text-santu-ink dark:text-white">
          Questions fréquentes
        </h2>
        <dl className="mt-6 space-y-8">
          <div>
            <dt className="font-semibold text-santu-ink dark:text-white">
              Comment rejoindre le réseau ?
            </dt>
            <dd className="mt-2">
              Téléchargez l&apos;application sur l&apos;App Store ou Google Play,
              créez un compte et complétez votre profil pour apparaître dans
              l&apos;annuaire.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-santu-ink dark:text-white">
              Comment contacter un autre entrepreneur ?
            </dt>
            <dd className="mt-2">
              Consultez l&apos;annuaire, ouvrez un profil et utilisez la
              messagerie intégrée pour démarrer une conversation.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-santu-ink dark:text-white">
              Comment publier un événement ?
            </dt>
            <dd className="mt-2">
              Depuis l&apos;application, accédez à la section événements pour
              créer et partager un afterwork, une conférence ou une rencontre
              avec le réseau.
            </dd>
          </div>
        </dl>

        <h2 className="font-display mt-12 text-xl font-bold text-santu-ink dark:text-white">
          Nous contacter
        </h2>
        <p className="mt-4">
          Pour toute question ou signalement, écrivez-nous à l&apos;adresse
          e-mail de support à compléter ici.
        </p>
      </article>
    </LegalDocumentLayout>
  );
}
