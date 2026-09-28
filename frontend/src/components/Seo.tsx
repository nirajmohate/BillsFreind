
import { useEffect } from "react";

function upsertMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function Seo({
  title,
  description,
  path,
  jsonLd,
}: {
  title: string;
  description: string;
  path: string;
  jsonLd?: object | object[];
}) {
  const jsonKey = JSON.stringify(jsonLd ?? null);

  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}${path}`;

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", `${window.location.origin}${path}`);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    document.querySelectorAll("script[data-bf-jsonld]").forEach((n) => n.remove());
    if (jsonKey !== "null") {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.bfJsonld = "1";
      script.textContent = jsonKey;
      document.head.appendChild(script);
    }
  }, [title, description, path, jsonKey]);

  return null;
}
