import type { EventTypeApi } from "@/lib/event-types";
import type { EventItem, EventFormValues } from "@/types/event";

function toIsoDate(ts: number): string {
  const d = new Date(ts);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function toTimeStr(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function isSameCalendarDay(a: number, b: number): boolean {
  return toIsoDate(a) === toIsoDate(b);
}

export function eventItemToFormValues(event: EventItem): EventFormValues {
  const endTs = event.endsAt ?? event.startsAt;
  const isMultiDay = !isSameCalendarDay(event.startsAt, endTs);

  return {
    title: event.title,
    type: event.type as EventTypeApi,
    status: event.status,
    imageUrl: event.image || "",
    imageFile: null,
    description: event.description,
    startDate: toIsoDate(event.startsAt),
    startTime: event.isAllDay ? "" : toTimeStr(event.startsAt),
    endDate: toIsoDate(endTs),
    endTime: event.isAllDay || !event.endsAt ? "" : toTimeStr(event.endsAt),
    isAllDay: event.isAllDay,
    isMultiDay,
    address: event.address,
    linkLabel: event.links[0]?.label ?? "",
    linkUrl: event.links[0]?.url ?? "",
  };
}
