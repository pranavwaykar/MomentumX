import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateInput: string | number | Date) {
  const d = new Date(dateInput);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const day = String(d.getUTCDate());
  const month = months[d.getUTCMonth()];
  const year = String(d.getUTCFullYear());
  return `${month} ${day}, ${year}`;
}
