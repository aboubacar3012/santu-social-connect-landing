"use client";

import { useRouter } from "next/navigation";

import { AdminShell } from "@/app/components/admin/admin-shell";
import { useAdminGuard } from "@/app/components/admin/use-admin-guard";
import { EventForm } from "@/app/components/events/event-form";
import { createEventApi } from "@/services/events.service";
import type { EventFormValues } from "@/types/event";

export default function AdminEventsNewPage() {
  const router = useRouter();
  const { isReady, token, isAuthenticated } = useAdminGuard();

  const handleCreate = async (form: EventFormValues) => {
    if (!token) return;
    const event = await createEventApi(token, form);
    router.push(`/admin/events?created=${encodeURIComponent(event.title)}`);
  };

  if (!isReady || !isAuthenticated) {
    return (
      <main className="bg-santu-mesh flex min-h-dvh items-center justify-center">
        <p className="text-sm text-santu-muted">Chargement…</p>
      </main>
    );
  }

  return (
    <AdminShell title="Nouvel événement">
      <p className="text-sm text-santu-muted">
        Publiez un événement sur le réseau Santu Connect.
      </p>
      <div className="mt-6">
        <EventForm onSubmit={handleCreate} />
      </div>
    </AdminShell>
  );
}
