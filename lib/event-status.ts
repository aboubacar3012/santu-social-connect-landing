export type EventStatus =
  | "draft"
  | "published"
  | "cancelled"
  | "completed"
  | "archived";

export const EVENT_STATUS_OPTIONS: { value: EventStatus; label: string; hint: string }[] = [
  { value: "draft", label: "Brouillon", hint: "Non visible dans la liste publique" },
  { value: "published", label: "Publié", hint: "Visible par tous les membres" },
  { value: "cancelled", label: "Annulé", hint: "Événement annulé" },
  { value: "completed", label: "Terminé", hint: "Événement terminé" },
  { value: "archived", label: "Archivé", hint: "Retiré de la liste active" },
];

export function eventStatusLabel(status: string): string {
  return EVENT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}
