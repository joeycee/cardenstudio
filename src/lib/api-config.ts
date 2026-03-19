const LOCAL_API_BASE_URL = "http://127.0.0.1:8000";

export const API_ENDPOINTS = {
  services: "/api/services/",
  testimonials: "/api/testimonials/",
  blog: "/api/blog/",
  portfolio: "/api/portfolio/",
  contact: "/api/contact/",
} as const;

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, "");
  }

  if (process.env.NODE_ENV !== "production") {
    return LOCAL_API_BASE_URL;
  }

  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not set. Add it to your frontend environment before running the app.",
  );
}
