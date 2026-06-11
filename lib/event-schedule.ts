import type { EventFormValues } from "@/types/event";

export function startOfDay(date: Date): Date {
  const out = new Date(date);
  out.setHours(0, 0, 0, 0);
  return out;
}

export function endOfDay(date: Date): Date {
  const out = new Date(date);
  out.setHours(23, 59, 59, 999);
  return out;
}

export function mergeDateAndTime(dateStr: string, timeStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [h, min] = timeStr.split(":").map(Number);
  return new Date(y, m - 1, d, h, min, 0, 0);
}

export function formatEventDateFr(isoOrTs: string | number): string {
  const d = new Date(isoOrTs);
  return d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatEventTimeFr(isoOrTs: string | number): string {
  const d = new Date(isoOrTs);
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function buildEventScheduleFromForm(data: EventFormValues): {
  startsAt: string;
  endsAt?: string;
  isAllDay: boolean;
} {
  const endDay = data.isMultiDay ? data.endDate : data.startDate;

  if (data.isAllDay) {
    return {
      startsAt: startOfDay(new Date(data.startDate)).toISOString(),
      endsAt: endOfDay(new Date(endDay)).toISOString(),
      isAllDay: true,
    };
  }

  if (!data.startTime) {
    throw new Error("Heure de début requise");
  }

  const startsAt = mergeDateAndTime(data.startDate, data.startTime);

  if (data.endTime) {
    const endsAt = mergeDateAndTime(endDay, data.endTime);
    if (endsAt.getTime() < startsAt.getTime()) {
      throw new Error("La fin doit être postérieure au début");
    }
    return {
      startsAt: startsAt.toISOString(),
      endsAt: endsAt.toISOString(),
      isAllDay: false,
    };
  }

  return {
    startsAt: startsAt.toISOString(),
    isAllDay: false,
  };
}
