import { useEffect } from "react";
import { absoluteUrl, OG_IMAGE_ALT, OG_IMAGE_PATH, SITE_NAME } from "@/lib/site";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Client-side metadata for SPA navigation. The same tags are baked into each page's static
 *  HTML at build time (scripts/prerender.mjs), so crawlers get them without running JS. */
export function Seo({
  title,
  description,
  path,
  jsonLd,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: object | object[];
  noindex?: boolean;
}) {
  const jsonKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    const url = absoluteUrl(path);
    const image = absoluteUrl(OG_IMAGE_PATH);
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1");

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", OG_IMAGE_ALT);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);
    upsertMeta("name", "twitter:image:alt", OG_IMAGE_ALT);

    document.querySelectorAll("script[data-bf-jsonld]").forEach((n) => n.remove());
    if (jsonKey !== "null") {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.bfJsonld = "1";
      script.textContent = jsonKey;
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonKey, noindex]);

  return null;
}
