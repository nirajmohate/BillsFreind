// Single source of truth for site-wide constants. Override the domain at build time with
// VITE_SITE_URL (e.g. https://www.yourdomain.com) — canonical URLs, Open Graph URLs,
// sitemap.xml and robots.txt all follow it.
export const SITE_URL: string = (
  (import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_SITE_URL ??
  "https://bills-freind.vercel.app"
).replace(/\/+$/, "");
export const SITE_NAME = "BillsFriend";
export const OG_IMAGE_PATH = "/og-image.png";
export const OG_IMAGE_ALT = "BillsFriend — free GST invoice and bill generator";
export const absoluteUrl = (path: string): string => `${SITE_URL}${path === "/" ? "/" : path}`;
