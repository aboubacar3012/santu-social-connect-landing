"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminShell } from "@/app/components/admin/admin-shell";
import { useAdminGuard } from "@/app/components/admin/use-admin-guard";
import { EventForm } from "@/app/components/events/event-form";
import { eventItemToFormValues } from "@/lib/event-form-mapper";
import { getEventApi, updateEventApi } from "@/services/events.service";
import type { EventFormValues, EventItem } from "@/types/event";

export default function AdminEventEditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const { isReady, token, isAuthenticated } = useAdminGuard();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!token || !eventId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getEventApi(token, eventId);
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger l'événement.");
    } finally {
      setLoading(false);
    }
  }, [token, eventId]);

  useEffect(() => {
    if (!isAuthenticated) return;
    void fetchEvent();
  }, [isAuthenticated, fetchEvent]);

  const handleUpdate = async (form: EventFormValues) => {
    if (!token || !eventId) return;
    await updateEventApi(token, eventId, form);
    router.push("/admin/events");
  };

  if (!isReady || !isAuthenticated) {
    return (
      <main className="bg-santu-mesh flex min-h-dvh items-center justify-center">
        <p className="text-sm text-santu-muted">Chargement…</p>
      </main>
    );
  }

  return (
    <AdminShell title="Modifier l'événement">
      <Link
        href="/admin/events"
        className="text-sm font-semibold text-santu-accent hover:underline"
      >
        ← Retour à la liste
      </Link>

      {loading ? (
        <p className="mt-6 text-sm text-santu-muted">Chargement…</p>
      ) : error ? (
        <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-200">
          {error}
        </p>
      ) : event ? (
        <div className="mt-6">
          <EventForm
            key={event.id}
            initial={eventItemToFormValues(event)}
            onSubmit={handleUpdate}
            submitLabel="Enregistrer les modifications"
            submittingLabel="Enregistrement…"
            resetOnSubmit={false}
          />
        </div>
      ) : null}
    </AdminShell>
  );
}
