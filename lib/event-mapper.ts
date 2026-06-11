import { eventStatusLabel, type EventStatus } from "@/lib/event-status";
import { eventTypeLabel } from "@/lib/event-types";
import type { EventItem } from "@/types/event";

type EventWire = {
  id: string;
  title: string;
  type: string;
  image: string;
  description: string;
  date: { day: number; month: number; year: number };
  time: string;
  endDate: { day: number; month: number; year: number } | null;
  endTime: string | null;
  isAllDay: boolean;
  address: string;
  links: { label: string; url: string }[];
  status: string;
  startsAt: number;
  endsAt: number | null;
};

export function mapEventFromApi(event: EventWire): EventItem {
  return {
    ...event,
    status: event.status as EventStatus,
  };
}

export function eventScheduleLabel(event: EventItem): string {
  if (event.isAllDay) return `${formatDateParts(event.date)} · Toute la journée`;
  const time =
    event.endTime && event.endTime !== event.time
      ? `${event.time} – ${event.endTime}`
      : event.time;
  return `${formatDateParts(event.date)} · ${time}`;
}

function formatDateParts(d: { day: number; month: number; year: number }): string {
  const date = new Date(d.year, d.month - 1, d.day);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function eventMetaLabel(event: EventItem): string {
  return `${eventTypeLabel(event.type)} · ${eventStatusLabel(event.status)}`;
}
