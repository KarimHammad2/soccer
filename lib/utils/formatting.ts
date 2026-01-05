import { format, formatDistanceToNow } from "date-fns";

export function formatDateTime(value: string | number | Date) {
  return format(new Date(value), "PP p");
}

export function timeAgo(value: string | number | Date) {
  return formatDistanceToNow(new Date(value), { addSuffix: true });
}

