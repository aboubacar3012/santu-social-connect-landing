"use client";

import { useState } from "react";

const STEPS = [
  {
    label: "Réseau",
    title: "Le réseau des entrepreneurs marseillais",
    body: "Échangez, inspirez-vous et grandissez avec une communauté locale engagée.",
    icon: "hub" as const,
  },
  {
    label: "Connexions",
    title: "Trouvez vos alliés",
    body: "Fondateurs, investisseurs, mentors et talents — des profils complémentaires au vôtre.",
    icon: "groups" as const,
  },
  {
    label: "Événements",
    title: "Faites avancer vos projets",
    body: "Afterworks, conférences et rencontres : votre prochaine collaboration est proche.",
    icon: "event" as const,
  },
] as const;

function StepIcon({ name }: { name: (typeof STEPS)[number]["icon"] }) {
  const cls = "h-9 w-9 text-santu-accent";
  if (name === "hub") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8.4 18.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm7.2 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM12 10.4a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM4.8 10.4a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Zm14.4 0a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8ZM12 2.6a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8Z" />
      </svg>
    );
  }
  if (name === "groups") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 18.5v-.4c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5v.4c0 .8-.7 1.5-1.5 1.5H4.5c-.8 0-1.5-.7-1.5-1.5Zm12 0v-.4c0-1.1-.9-2.1-2.4-2.8 1.1-.3 2.3-.3 3.4 0 1.5.7 2.4 1.7 2.4 2.8v.4c0 .8-.7 1.5-1.5 1.5h-1.4c.5-.4.8-1 .8-1.5Z" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17 3H7a2 2 0 0 0-2 2v2H3v2h2v2H3v2h2v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2h2v-2h-2v-2h2V7h-2V5a2 2 0 0 0-2-2Zm0 14H7V5h10v12Z" />
    </svg>
  );
}

export function WelcomeShowcase() {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="relative w-full max-w-md">
      <div
        className="pointer-events-none absolute -top-16 -right-12 h-56 w-56 rounded-full bg-santu-accent/14 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-santu-accent-light/10 blur-3xl"
        aria-hidden
      />

      <div className="relative flex flex-col items-center gap-7">
        <div className="flex h-[148px] w-[148px] items-center justify-center rounded-full border border-santu-accent/10">
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border-[1.5px] border-santu-accent/28">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-santu-accent/10">
              <StepIcon name={cur.icon} />
            </div>
          </div>
        </div>

        <div key={step} className="animate-santu-fade-in flex flex-col items-center gap-3.5 text-center">
          <span className="inline-flex rounded-full bg-santu-accent/10 px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-santu-accent uppercase">
            {cur.label}
          </span>
          <h2 className="font-display max-w-[360px] text-[1.625rem] leading-8 font-extrabold tracking-[-0.03em] text-santu-ink dark:text-white">
            {cur.title}
          </h2>
          <p className="max-w-[360px] text-[15px] leading-[23px] font-medium text-santu-muted dark:text-zinc-400">
            {cur.body}
          </p>
        </div>
      </div>

      <div className="relative mt-10 rounded-3xl border border-black/[0.06] bg-white px-6 py-5 shadow-[0_-4px_24px_-8px_rgba(0,0,0,0.08)] dark:border-white/[0.08] dark:bg-zinc-900/80">
        <div className="flex items-center gap-3">
          <div className="h-[5px] flex-1 overflow-hidden rounded-full bg-black/[0.07] dark:bg-white/10">
            <div
              className="h-full rounded-full bg-santu-accent transition-[width] duration-400 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="min-w-7 text-right text-xs font-bold tracking-wide text-santu-faint">
            {step + 1}/{STEPS.length}
          </span>
        </div>

        <div className="mt-3.5 flex gap-2">
          {STEPS.map((item, i) => {
            const active = i === step;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setStep(i)}
                className={`flex-1 rounded-xl border px-2 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "border-santu-accent/25 bg-santu-accent/10 text-santu-accent"
                    : "border-transparent text-santu-faint hover:text-santu-muted dark:hover:text-zinc-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
