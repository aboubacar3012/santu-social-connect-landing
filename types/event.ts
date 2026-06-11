import type { EventStatus } from "@/lib/event-status";
import type { EventTypeApi } from "@/lib/event-types";

export type EventLink = {
  label: string;
  url: string;
};

export type EventItem = {
  id: string;
  title: string;
  type: EventTypeApi | string;
  image: string;
  description: string;
  date: { day: number; month: number; year: number };
  time: string;
  endDate: { day: number; month: number; year: number } | null;
  endTime: string | null;
  isAllDay: boolean;
  address: string;
  links: EventLink[];
  status: EventStatus;
  startsAt: number;
  endsAt: number | null;
};

export type EventFormValues = {
  title: string;
  type: EventTypeApi;
  status: EventStatus;
  imageUrl: string;
  imageFile: File | null;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  isAllDay: boolean;
  isMultiDay: boolean;
  address: string;
  linkLabel: string;
  linkUrl: string;
};

export type CreateEventPayload = {
  title: string;
  type: EventTypeApi;
  imageUrl?: string;
  description?: string;
  startsAt: string;
  endsAt?: string;
  isAllDay?: boolean;
  status?: EventStatus;
  address: string;
  links?: EventLink[];
};
