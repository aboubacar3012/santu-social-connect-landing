import { mapEventFromApi } from "@/lib/event-mapper";
import { buildEventScheduleFromForm } from "@/lib/event-schedule";
import { apiFetch } from "@/lib/api-client";
import { uploadImageFile } from "@/services/upload.service";
import type { CreateEventPayload, EventFormValues, EventItem } from "@/types/event";

async function buildPayloadFromForm(
  token: string,
  data: EventFormValues,
): Promise<CreateEventPayload> {
  const schedule = buildEventScheduleFromForm(data);

  const payload: CreateEventPayload = {
    title: data.title.trim(),
    type: data.type,
    startsAt: schedule.startsAt,
    address: data.address.trim(),
    status: data.status,
  };

  if (schedule.endsAt) payload.endsAt = schedule.endsAt;
  if (schedule.isAllDay) payload.isAllDay = true;

  const description = data.description.trim();
  if (description) payload.description = description;

  if (data.imageFile) {
    payload.imageUrl = await uploadImageFile(token, data.imageFile);
  } else if (data.imageUrl.trim()) {
    payload.imageUrl = data.imageUrl.trim();
  }

  const linkLabel = data.linkLabel.trim();
  const linkUrl = data.linkUrl.trim();
  if (linkLabel && linkUrl) {
    payload.links = [{ label: linkLabel, url: linkUrl }];
  }

  return payload;
}

export async function listMyEventsApi(token: string): Promise<EventItem[]> {
  const data = await apiFetch<{ events: Parameters<typeof mapEventFromApi>[0][] }>(
    "/events/mine",
    { token },
  );
  if (!Array.isArray(data.events)) {
    throw new Error("Réponse liste événements invalide.");
  }
  return data.events.map(mapEventFromApi);
}

export async function createEventApi(
  token: string,
  form: EventFormValues,
): Promise<EventItem> {
  const payload = await buildPayloadFromForm(token, form);
  const data = await apiFetch<{ event: Parameters<typeof mapEventFromApi>[0] }>(
    "/events",
    {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    },
  );
  if (!data.event) throw new Error("Réponse création événement invalide.");
  return mapEventFromApi(data.event);
}

export async function getEventApi(token: string, eventId: string): Promise<EventItem> {
  const data = await apiFetch<{ event: Parameters<typeof mapEventFromApi>[0] }>(
    `/events/${eventId}`,
    { token },
  );
  if (!data.event) throw new Error("Événement introuvable.");
  return mapEventFromApi(data.event);
}

export async function updateEventApi(
  token: string,
  eventId: string,
  form: EventFormValues,
): Promise<EventItem> {
  const payload = await buildPayloadFromForm(token, form);
  const data = await apiFetch<{ event: Parameters<typeof mapEventFromApi>[0] }>(
    `/events/${eventId}`,
    {
      method: "PATCH",
      token,
      body: JSON.stringify(payload),
    },
  );
  if (!data.event) throw new Error("Réponse mise à jour événement invalide.");
  return mapEventFromApi(data.event);
}

export async function deleteEventApi(token: string, eventId: string): Promise<void> {
  const data = await apiFetch<{ success?: boolean }>(`/events/${eventId}`, {
    method: "DELETE",
    token,
  });
  if (data.success !== true) {
    throw new Error("Réponse suppression événement invalide.");
  }
}
