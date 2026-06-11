"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminShell } from "@/app/components/admin/admin-shell";
import { useAdminGuard } from "@/app/components/admin/use-admin-guard";
import { EventList } from "@/app/components/events/event-list";
import { deleteEventApi, listMyEventsApi } from "@/services/events.service";
import type { EventItem } from "@/types/event";

export function AdminEventsListContent() {
  const searchParams = useSearchParams();
  const { isReady, token, isAuthenticated } = useAdminGuard();

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const createdTitle = searchParams.get("created");

  const fetchEvents = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await listMyEventsApi(token);
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger les événements.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!isAuthenticated) return;
    void fetchEvents();
  }, [isAuthenticated, fetchEvents]);

  const handleDelete = async (event: EventItem) => {
    if (!token || deletingId) return;
    const confirmed = window.confirm(
      `Supprimer « ${event.title} » ? Cette action est irréversible.`,
    );
    if (!confirmed) return;

    setDeletingId(event.id);
    setError(null);
    try {
      await deleteEventApi(token, event.id);
      setEvents((prev) => prev.filter((item) => item.id !== event.id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de supprimer cet événement.");
    } finally {
      setDeletingId(null);
    }
  };

  if (!isReady || !isAuthenticated) {
    return (
      <main className="bg-santu-mesh flex min-h-dvh items-center justify-center">
        <p className="text-sm text-santu-muted">Chargement…</p>
      </main>
    );
  }

  return (
    <AdminShell title="Événements">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-santu-muted">
          {events.length} événement{events.length > 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void fetchEvents()}
            className="text-sm font-semibold text-santu-accent hover:underline"
          >
            Actualiser
          </button>
          <Link
            href="/admin/events/new"
            className="bg-santu-accent hover:bg-santu-accent-hover rounded-2xl px-4 py-2 text-sm font-bold text-white"
          >
            Créer
          </Link>
        </div>
      </div>

      {createdTitle ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-200">
          « {createdTitle} » a été publié.
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="mt-5">
        {loading ? (
          <p className="text-sm text-santu-muted">Chargement des événements…</p>
        ) : (
          <EventList
            events={events}
            deletingId={deletingId}
            onDelete={(event) => void handleDelete(event)}
          />
        )}
      </div>
    </AdminShell>
  );
}
