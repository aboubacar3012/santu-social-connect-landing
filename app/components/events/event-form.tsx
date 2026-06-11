"use client";

import { useMemo, useState } from "react";

import { EVENT_STATUS_OPTIONS } from "@/lib/event-status";
import { EVENT_TYPE_OPTIONS } from "@/lib/event-types";
import type { EventFormValues } from "@/types/event";

const DEFAULT_TIME_START = "19:00";
const DEFAULT_TIME_END = "21:00";

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function emptyEventForm(): EventFormValues {
  const today = todayIso();
  return {
    title: "",
    type: "networking",
    status: "published",
    imageUrl: "",
    imageFile: null,
    description: "",
    startDate: today,
    startTime: DEFAULT_TIME_START,
    endDate: today,
    endTime: DEFAULT_TIME_END,
    isAllDay: false,
    isMultiDay: false,
    address: "",
    linkLabel: "",
    linkUrl: "",
  };
}

type EventFormProps = {
  onSubmit: (data: EventFormValues) => Promise<void>;
  initial?: EventFormValues;
  submitLabel?: string;
  resetOnSubmit?: boolean;
  submittingLabel?: string;
};

export function EventForm({
  onSubmit,
  initial,
  submitLabel = "Publier l'événement",
  resetOnSubmit = true,
  submittingLabel = "Publication…",
}: EventFormProps) {
  const [form, setForm] = useState<EventFormValues>(initial ?? emptyEventForm());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (submitting || !form.title.trim() || !form.address.trim() || !form.startDate) {
      return false;
    }
    if (!form.isAllDay && !form.startTime) return false;
    if (form.isMultiDay && form.endDate < form.startDate) return false;
    return true;
  }, [submitting, form]);

  const patch = (partial: Partial<EventFormValues>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const linkUrl = form.linkUrl.trim();
    if (linkUrl && !/^https?:\/\//i.test(linkUrl)) {
      setError("Le lien doit commencer par http:// ou https://");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        linkUrl,
      });
      if (resetOnSubmit) {
        setForm(emptyEventForm());
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Impossible d'enregistrer l'événement.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6">
      <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-zinc-900/80">
        <p className="text-[11px] font-bold tracking-[0.16em] text-santu-faint uppercase">
          Informations
        </p>

        <label className="mt-4 block">
          <span className="text-xs font-semibold text-santu-muted">Titre</span>
          <input
            required
            value={form.title}
            onChange={(e) => patch({ title: e.target.value })}
            placeholder="Ex. Afterwork fondateurs"
            className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent focus:ring-2 focus:ring-santu-accent/20 dark:border-white/10 dark:bg-white/5"
          />
        </label>

        <div className="mt-4">
          <span className="text-xs font-semibold text-santu-muted">Type</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {EVENT_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ type: opt.value })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  form.type === opt.value
                    ? "border-santu-accent bg-santu-accent/10 text-santu-accent"
                    : "border-black/[0.08] bg-black/[0.03] text-santu-ink dark:border-white/10 dark:bg-white/5 dark:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold text-santu-muted">Statut</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {EVENT_STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => patch({ status: opt.value })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  form.status === opt.value
                    ? "border-santu-accent bg-santu-accent/10 text-santu-accent"
                    : "border-black/[0.08] bg-black/[0.03] text-santu-ink dark:border-white/10 dark:bg-white/5 dark:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-santu-faint">
            {EVENT_STATUS_OPTIONS.find((o) => o.value === form.status)?.hint}
          </p>
        </div>

        <label className="mt-4 block">
          <span className="text-xs font-semibold text-santu-muted">Image de couverture</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              patch({ imageFile: e.target.files?.[0] ?? null })
            }
            className="mt-1.5 block w-full text-sm text-santu-muted file:mr-3 file:rounded-lg file:border-0 file:bg-santu-accent/10 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-santu-accent"
          />
        </label>

        <label className="mt-3 block">
          <span className="text-xs font-semibold text-santu-muted">
            Ou URL d&apos;image
          </span>
          <input
            value={form.imageUrl}
            onChange={(e) => patch({ imageUrl: e.target.value })}
            placeholder="https://…"
            className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent focus:ring-2 focus:ring-santu-accent/20 dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-zinc-900/80">
        <p className="text-[11px] font-bold tracking-[0.16em] text-santu-faint uppercase">
          Date & lieu
        </p>

        <label className="mt-4 flex items-center justify-between gap-3 border-b border-black/[0.06] py-3 dark:border-white/10">
          <span>
            <span className="block text-sm font-semibold text-santu-ink dark:text-white">
              Toute la journée
            </span>
            <span className="text-xs text-santu-faint">Sans heure de début ni de fin</span>
          </span>
          <input
            type="checkbox"
            checked={form.isAllDay}
            onChange={(e) => patch({ isAllDay: e.target.checked })}
            className="h-5 w-5 accent-santu-accent"
          />
        </label>

        <label className="flex items-center justify-between gap-3 border-b border-black/[0.06] py-3 dark:border-white/10">
          <span>
            <span className="block text-sm font-semibold text-santu-ink dark:text-white">
              Plusieurs jours
            </span>
            <span className="text-xs text-santu-faint">Événement sur plusieurs dates</span>
          </span>
          <input
            type="checkbox"
            checked={form.isMultiDay}
            onChange={(e) =>
              patch({
                isMultiDay: e.target.checked,
                endDate: e.target.checked ? form.endDate || form.startDate : form.startDate,
              })
            }
            className="h-5 w-5 accent-santu-accent"
          />
        </label>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold text-santu-muted">
              {form.isMultiDay ? "Date de début" : "Date"}
            </span>
            <input
              required
              type="date"
              value={form.startDate}
              onChange={(e) =>
                patch({
                  startDate: e.target.value,
                  endDate:
                    !form.isMultiDay || form.endDate < e.target.value
                      ? e.target.value
                      : form.endDate,
                })
              }
              className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
            />
          </label>

          {!form.isAllDay ? (
            <label className="block">
              <span className="text-xs font-semibold text-santu-muted">Heure de début</span>
              <input
                required
                type="time"
                value={form.startTime}
                onChange={(e) => patch({ startTime: e.target.value })}
                className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
              />
            </label>
          ) : null}
        </div>

        {form.isMultiDay || !form.isAllDay ? (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {form.isMultiDay ? (
              <label className="block">
                <span className="text-xs font-semibold text-santu-muted">Date de fin</span>
                <input
                  required
                  type="date"
                  min={form.startDate}
                  value={form.endDate}
                  onChange={(e) => patch({ endDate: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
                />
              </label>
            ) : (
              <div />
            )}

            {!form.isAllDay ? (
              <label className="block">
                <span className="text-xs font-semibold text-santu-muted">Heure de fin</span>
                <input
                  type="time"
                  value={form.endTime}
                  onChange={(e) => patch({ endTime: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
                />
              </label>
            ) : null}
          </div>
        ) : null}

        <label className="mt-4 block">
          <span className="text-xs font-semibold text-santu-muted">Adresse</span>
          <input
            required
            value={form.address}
            onChange={(e) => patch({ address: e.target.value })}
            placeholder="Ex. 12 Quai du Port, Marseille"
            className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-zinc-900/80">
        <p className="text-[11px] font-bold tracking-[0.16em] text-santu-faint uppercase">
          Description
        </p>
        <textarea
          value={form.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="Décrivez l'événement, le programme, le public cible…"
          rows={5}
          maxLength={2000}
          className="mt-4 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
        />
      </section>

      <section className="rounded-2xl border border-black/[0.06] bg-white p-5 dark:border-white/10 dark:bg-zinc-900/80">
        <p className="text-[11px] font-bold tracking-[0.16em] text-santu-faint uppercase">
          Lien utile
        </p>
        <p className="mt-1 text-xs text-santu-faint">Optionnel — billetterie, inscription…</p>
        <label className="mt-4 block">
          <span className="text-xs font-semibold text-santu-muted">Libellé</span>
          <input
            value={form.linkLabel}
            onChange={(e) => patch({ linkLabel: e.target.value })}
            placeholder="Ex. S'inscrire"
            className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
          />
        </label>
        <label className="mt-3 block">
          <span className="text-xs font-semibold text-santu-muted">URL</span>
          <input
            value={form.linkUrl}
            onChange={(e) => patch({ linkUrl: e.target.value })}
            placeholder="https://…"
            className="mt-1.5 w-full rounded-xl border border-black/[0.08] bg-black/[0.03] px-3 py-2.5 text-sm outline-none focus:border-santu-accent dark:border-white/10 dark:bg-white/5"
          />
        </label>
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={!canSubmit}
        className="bg-santu-accent hover:bg-santu-accent-hover focus-visible:ring-santu-accent w-full rounded-2xl px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-santu-accent/25 transition enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        {submitting ? submittingLabel : submitLabel}
      </button>
    </form>
  );
}
