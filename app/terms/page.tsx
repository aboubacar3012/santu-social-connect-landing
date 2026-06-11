import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocumentLayout } from "../components/legal-document-layout";

export const metadata: Metadata = {
  title: "Conditions d’utilisation — Santu Connect",
  description:
    "Conditions générales d’utilisation de l’application mobile Santu Connect.",
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <LegalDocumentLayout>
      <article className="text-[15px] leading-relaxed text-zinc-700 dark:text-zinc-300">
        <h1 className="font-display text-3xl font-bold tracking-tight text-santu-ink sm:text-4xl dark:text-white">
          Conditions d’utilisation
        </h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">
          Dernière mise à jour : mars 2026 · Application mobile Santu Connect
        </p>
        <p className="mt-8 rounded-xl border border-sky-200/80 bg-sky-50/80 p-4 text-sm text-sky-950 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-100">
          Document type à adapter avec un conseil juridique. Les mentions
          d’éditeur, de droit applicable et de juridiction doivent être complétées
          selon votre structure et le pays concerné.
        </p>

        <h2 className="font-display mt-12 text-xl font-bold text-santu-ink dark:text-white">
          1. Objet
        </h2>
        <p className="mt-4">
          Les présentes conditions générales d’utilisation (« CGU ») régissent
          l’accès et l’usage de l’application mobile Santu Connect (« l’Application »)
          et, le cas échéant, des services associés proposés par l’éditeur («
          nous »). En créant un compte ou en utilisant l’Application, vous («
          l’Utilisateur ») acceptez sans réserve les présentes CGU.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          2. Description du service
        </h2>
        <p className="mt-4">
          Santu Connect est un réseau entrepreneurial local destiné aux
          entrepreneurs marseillais. L’Application permet notamment de consulter
          un annuaire de membres, d’échanger via une messagerie, de publier et
          consulter des événements (afterworks, conférences, rencontres), et de
          faciliter les connexions professionnelles. Le service peut évoluer
          (fonctionnalités en bêta, couverture géographique progressive, etc.).
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          3. Compte et âge
        </h2>
        <p className="mt-4">
          Vous devez fournir des informations exactes et à jour. Vous êtes
          responsable de la confidentialité de vos identifiants. Si un âge
          minimum est fixé par la loi locale pour utiliser un tel service,
          l’Utilisateur déclare le respecter.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          4. Règles de comportement
        </h2>
        <p className="mt-4">Vous vous engagez notamment à :</p>
        <ul className="mt-4 list-inside list-disc space-y-2">
          <li>
            Ne pas utiliser l’Application à des fins illégales, frauduleuses ou
            trompeuses ;
          </li>
          <li>
            Ne pas harceler, menacer, discriminer ou porter atteinte à autrui ;
          </li>
          <li>
            Ne pas publier de contenus faux, offensants ou contraires aux lois ;
          </li>
          <li>
            Respecter les autres membres du réseau et les règles des événements
            auxquels vous participez.
          </li>
        </ul>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          5. Profils, annuaire et événements
        </h2>
        <p className="mt-4">
          Les informations publiées sur votre profil et les événements que vous
          créez doivent être exactes et respectueuses. Chaque Utilisateur reste
          responsable des contenus qu’il publie et des échanges qu’il entretient
          via l’Application. Les rencontres et collaborations conclues entre
          membres se font sous leur responsabilité respective.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          6. Limitation de responsabilité
        </h2>
        <p className="mt-4">
          Dans les limites autorisées par la loi applicable, nous déclinons toute
          responsabilité pour les dommages indirects, perte de données, perte
          d’exploitation, ou incidents survenus lors de rencontres ou
          collaborations entre utilisateurs. L’Application est fournie « en l’état » ; nous ne
          garantissons pas une disponibilité ininterrompue ni l’absence
          d’erreurs. Nous ne validons pas systématiquement l’identité ou les
          antécédents de chaque utilisateur sauf dispositif explicitement indiqué
          dans l’Application.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          7. Modération et sanctions
        </h2>
        <p className="mt-4">
          Nous pouvons retirer un contenu, suspendre ou supprimer un compte en cas
          de violation des présentes CGU, de signalement fondé ou d’exigence
          légale, sans préjudice d’autres recours.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          8. Propriété intellectuelle
        </h2>
        <p className="mt-4">
          L’Application, sa marque, ses textes, designs et éléments techniques
          sont protégés. Toute reproduction non autorisée est interdite.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          9. Données personnelles
        </h2>
        <p className="mt-4">
          Le traitement des données est décrit dans la{" "}
          <Link
            href="/privacy"
            className="text-santu-accent hover:text-santu-accent-hover font-semibold underline-offset-2 hover:underline"
          >
            politique de confidentialité
          </Link>
          .
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          10. Modification des CGU
        </h2>
        <p className="mt-4">
          Nous pouvons modifier les CGU. La date de mise à jour sera indiquée.
          La poursuite de l’utilisation après notification vaut acceptation des
          nouvelles conditions, sauf disposition impérative contraire.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          11. Résiliation
        </h2>
        <p className="mt-4">
          Vous pouvez cesser d’utiliser l’Application à tout moment et demander
          la suppression de votre compte selon les modalités prévues dans l’app ou
          auprès du support.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          12. Droit applicable et litiges
        </h2>
        <p className="mt-4">
          À compléter : droit applicable (ex. droit français) et juridiction
          compétente ou mécanisme de médiation, selon votre situation.
        </p>

        <h2 className="font-display mt-10 text-xl font-bold text-santu-ink dark:text-white">
          13. Contact
        </h2>
        <p className="mt-4">
          Pour toute question relative aux présentes CGU : coordonnées de l’éditeur
          à insérer (adresse e-mail de support, etc.).
        </p>
      </article>
    </LegalDocumentLayout>
  );
}
