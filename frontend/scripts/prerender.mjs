// Post-build step: turns the single-page build into one static HTML file per route so every
// page ships with its own <title>, meta description, canonical URL, Open Graph / Twitter tags,
// JSON-LD and crawlable <noscript> content — with zero runtime cost for visitors.
// Also (re)generates sitemap.xml, robots.txt and the 404 page.
//
// Route metadata comes from src/lib/{tools,seo,site}.ts through Vite's SSR loader, so adding a
// new preset to tools.ts automatically adds its page, sitemap entry and meta tags.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const jsonForHtml = (o) => JSON.stringify(o).replace(/</g, "\\u003c").replace(/\u2028|\u2029/g, "");

const server = await createServer({
  root,
  logLevel: "error",
  appType: "custom",
  server: { middlewareMode: true, hmr: false, watch: null },
  optimizeDeps: { noDiscovery: true, include: [] },
});

try {
  const { TOOL_PRESETS } = await server.ssrLoadModule("/src/lib/tools.ts");
  const seo = await server.ssrLoadModule("/src/lib/seo.ts");
  const { SITE_URL, SITE_NAME, OG_IMAGE_PATH, OG_IMAGE_ALT } = await server.ssrLoadModule("/src/lib/site.ts");
  const { PAGE_META, toolJsonLd, homeJsonLd, toolFaqs, toolSteps, HOME_FAQS, withArticle } = seo;

  const template = await fs.readFile(path.join(dist, "index.html"), "utf8");

  // Preload the two fonts every page paints with (hashed names change per build).
  const assets = await fs.readdir(path.join(dist, "assets"));
  const preload = ["plus-jakarta-sans-latin-wght-normal", "outfit-latin-wght-normal"]
    .map((k) => assets.find((f) => f.startsWith(k) && f.endsWith(".woff2")))
    .filter(Boolean)
    .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
    .join("\n    ");

  const abs = (p) => `${SITE_URL}${p}`;
  const image = abs(OG_IMAGE_PATH);

  function headBlock({ title, description, path: p, noindex, jsonLd }) {
    const url = abs(p === "/" ? "/" : p);
    const robots = noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1";
    const lines = [
      `<meta name="description" content="${esc(description)}" />`,
      `<meta name="robots" content="${robots}" />`,
      noindex ? "" : `<link rel="canonical" href="${esc(url)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
      `<meta property="og:locale" content="en_IN" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:url" content="${esc(url)}" />`,
      `<meta property="og:image" content="${esc(image)}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      `<meta name="twitter:image" content="${esc(image)}" />`,
      `<meta name="twitter:image:alt" content="${esc(OG_IMAGE_ALT)}" />`,
      ...(jsonLd ?? []).map((o) => `<script type="application/ld+json" data-bf-jsonld="1">${jsonForHtml(o)}</script>`),
      preload,
    ];
    return lines.filter(Boolean).join("\n    ");
  }

  const navLinks = [
    ...TOOL_PRESETS.map((t) => `<li><a href="/${t.id}">${esc(t.name)}</a></li>`),
    `<li><a href="/upi-qr">UPI QR code generator</a></li>`,
    `<li><a href="/about">About</a></li>`,
    `<li><a href="/contact">Contact</a></li>`,
    `<li><a href="/privacy">Privacy policy</a></li>`,
    `<li><a href="/terms">Terms of service</a></li>`,
  ].join("");

  function noscriptBlock({ h1, description, extra = "" }) {
    return `<noscript>
      <main>
        <h1>${esc(h1)}</h1>
        <p>${esc(description)}</p>
        ${extra}
        <nav aria-label="All generators"><p>Free bill and invoice generators:</p><ul>${navLinks}</ul></nav>
        <p>BillsFriend needs JavaScript to build bills in your browser. Please enable JavaScript.</p>
      </main>
    </noscript>`;
  }

  function render(meta, noscript) {
    return template
      .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${esc(meta.title)}</title>`)
      .replace(/<!--seo-head-->[\s\S]*?<!--\/seo-head-->/, () => headBlock(meta))
      .replace(/<!--seo-noscript-->[\s\S]*?<!--\/seo-noscript-->/, () => noscript);
  }

  async function write(route, html) {
    const file = route === "/" ? path.join(dist, "index.html") : path.join(dist, route.replace(/^\//, ""), "index.html");
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
  }

  const pages = [];

  // Home
  const home = PAGE_META.home;
  await write("/", render(
    { ...home, jsonLd: homeJsonLd() },
    noscriptBlock({
      h1: "Free GST invoice & bill generator",
      description: home.description,
      extra: `<h2>Frequently asked questions</h2>${HOME_FAQS.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}`,
    }),
  ));
  pages.push({ loc: "/", changefreq: home.changefreq, priority: home.priority });

  // Generators
  TOOL_PRESETS.forEach((t, i) => {
    pages.push({ loc: `/${t.id}`, changefreq: "monthly", priority: i < 3 ? 0.9 : 0.8 });
  });
  await Promise.all(
    TOOL_PRESETS.map((t) => {
      const meta = { title: t.seoTitle, description: t.seoDescription, path: `/${t.id}` };
      const extra = `<h2>How to create ${esc(withArticle(t.name.toLowerCase()))} online</h2><ol>${toolSteps(t).map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` +
        `<h2>FAQ</h2>${toolFaqs(t).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join("")}`;
      return write(meta.path, render({ ...meta, jsonLd: toolJsonLd(t) }, noscriptBlock({ h1: t.name, description: t.description, extra })));
    }),
  );

  // Static pages
  for (const key of ["upiQr", "about", "contact", "privacy", "terms", "dashboard"]) {
    const m = PAGE_META[key];
    await write(m.path, render(m, noscriptBlock({ h1: m.title.split(" | ")[0], description: m.description })));
    if (!m.noindex) pages.push({ loc: m.path, changefreq: m.changefreq, priority: m.priority });
  }

  // 404 (served by Vercel / nginx for unknown URLs, with a real 404 status)
  const nf = PAGE_META.notFound;
  await fs.writeFile(
    path.join(dist, "404.html"),
    render(nf, noscriptBlock({ h1: "Page not found (404)", description: nf.description })),
  );

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url>\n    <loc>${esc(abs(p.loc))}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`)
  .join("\n")}
</urlset>
`;

  // robots.txt
  const robots = `# BillsFriend — robots.txt
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /editor/
Disallow: /*?doc=

Sitemap: ${abs("/sitemap.xml")}
`;

  for (const dir of [dist, path.join(root, "public")]) {
    await fs.writeFile(path.join(dir, "sitemap.xml"), sitemap);
    await fs.writeFile(path.join(dir, "robots.txt"), robots);
  }

  console.log(`prerender: ${pages.length + 1} pages + 404 written, sitemap has ${pages.length} URLs (${SITE_URL})`);
} finally {
  await server.close();
}
