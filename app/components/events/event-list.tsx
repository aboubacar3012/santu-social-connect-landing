"use client";

import Image from "next/image";
import Link from "next/link";

import { eventMetaLabel, eventScheduleLabel } from "@/lib/event-mapper";
import type { EventItem } from "@/types/event";

type EventListProps = {
  events: EventItem[];
  deletingId: string | null;
  onDelete: (event: EventItem) => void;
  createHref?: string;
};

export function EventList({
  events,
  deletingId,
  onDelete,
  createHref = "/admin/events/new",
}: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/10 bg-white/60 px-6 py-12 text-center dark:border-white/10 dark:bg-zinc-900/40">
        <p className="text-sm font-semibold text-santu-ink dark:text-white">
          Aucun événement publié
        </p>
        <p className="mt-2 text-sm text-santu-muted">
          Créez votre premier événement.
        </p>
        <Link
          href={createHref}
          className="bg-santu-accent hover:bg-santu-accent-hover mt-5 inline-flex rounded-2xl px-5 py-2.5 text-sm font-bold text-white"
        >
          Créer un événement
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {events.map((event) => (
        <li
          key={event.id}
          className="rounded-2xl border border-black/6 bg-white p-4 dark:border-white/10 dark:bg-zinc-900/80"
        >
          <div className="flex items-start gap-4">
            {event.image ? (
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-black/8 dark:border-white/10">
                <Image src={event.image} alt={event.title} fill className="object-cover" sizes="80px" />
              </div>
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-dashed border-black/12 bg-black/3 text-[10px] font-semibold uppercase tracking-wide text-santu-faint dark:border-white/10 dark:bg-white/5">
                No image
              </div>
            )}
            <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-display text-base font-bold text-santu-ink dark:text-white">
                  {event.title}
                </p>
                <p className="mt-1 text-xs font-medium text-santu-accent">
                  {eventMetaLabel(event)}
                </p>
                <p className="mt-2 text-sm text-santu-muted">{eventScheduleLabel(event)}</p>
                <p className="mt-1 text-sm text-santu-faint">{event.address}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Link
                  href={`/admin/events/${event.id}/edit`}
                  className="rounded-xl border border-santu-accent/25 bg-santu-accent/10 px-3 py-2 text-center text-xs font-semibold text-santu-accent transition hover:bg-santu-accent/15"
                >
                  Modifier
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(event)}
                  disabled={deletingId === event.id}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300"
                >
                  {deletingId === event.id ? "Suppression…" : "Supprimer"}
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
