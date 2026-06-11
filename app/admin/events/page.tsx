"use client";

import { Suspense } from "react";

import { AdminEventsListContent } from "./admin-events-list-content";

export default function AdminEventsListPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-santu-mesh flex min-h-dvh items-center justify-center">
          <p className="text-sm text-santu-muted">Chargement…</p>
        </main>
      }
    >
      <AdminEventsListContent />
    </Suspense>
  );
}
