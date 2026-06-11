export type EventTypeApi =
  | "afterwork"
  | "conference"
  | "networking"
  | "workshop"
  | "concert"
  | "exhibition"
  | "outing"
  | "other";

export const EVENT_TYPE_OPTIONS: { value: EventTypeApi; label: string }[] = [
  { value: "afterwork", label: "Afterwork" },
  { value: "conference", label: "Conférence" },
  { value: "networking", label: "Networking" },
  { value: "workshop", label: "Atelier" },
  { value: "concert", label: "Concert" },
  { value: "exhibition", label: "Exposition" },
  { value: "outing", label: "Sortie" },
  { value: "other", label: "Autre" },
];

export function eventTypeLabel(type: string): string {
  return EVENT_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}
