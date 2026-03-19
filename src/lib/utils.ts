import { getApiBaseUrl } from "@/lib/api-config";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function resolveAssetUrl(path?: string | null) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, getApiBaseUrl()).toString();
}

export function splitParagraphs(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
