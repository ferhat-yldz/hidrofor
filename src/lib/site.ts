import siteFile from "../../content/site.json";
import type { SiteContent } from "@/types/content";

const site = siteFile as SiteContent;

export function getSite(): SiteContent {
  return site;
}

export function telHref(phoneE164: string): string {
  const n = phoneE164.replace(/\s/g, "");
  return n.startsWith("+") ? `tel:${n}` : `tel:+${n.replace(/^\+/, "")}`;
}

export function waHref(whatsappE164: string, message: string): string {
  return `https://wa.me/${whatsappE164}?text=${message}`;
}

export function waMeHref(whatsappE164: string): string {
  return `https://wa.me/${whatsappE164}`;
}

export function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
