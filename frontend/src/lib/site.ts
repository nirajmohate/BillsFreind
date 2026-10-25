// Single source of truth for site-wide constants. Override the domain at build time with
// VITE_SITE_URL (default: the production domain below) — canonical URLs, Open Graph URLs,
// sitemap.xml and robots.txt all follow it.
export const SITE_URL: string = (
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL ??
  "https://www.billsfreind.in"
).replace(/\/+$/, "");
export const SITE_NAME = "BillsFreind";
// Common spellings people may search for — published as alternateName in structured data.
export const SITE_ALTERNATE_NAMES = ["Bills Freind", "BillsFriend", "billsfreind.in"];
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_ALT = "BillsFreind — free GST invoice and bill generator";
export const absoluteUrl = (path: string): string => `${SITE_URL}${path === "/" ? "/" : path}`;

// Official social profiles — shown in the footer, About, Contact and blog pages and
// published as `sameAs` in the Organization structured data.
export const SOCIAL_LINKS = [
  { id: "instagram", label: "Instagram", handle: "@pixelrise.web", url: "https://www.instagram.com/pixelrise.web" },
  { id: "youtube", label: "YouTube", handle: "@pixelrisenine", url: "https://www.youtube.com/@pixelrisenine" },
] as const;
