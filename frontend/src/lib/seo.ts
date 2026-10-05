// Page metadata + structured data shared by the React app (Seo.tsx) and the build-time
// prerender script (scripts/prerender.mjs), so crawlers see the same thing with or without JS.

import { absoluteUrl, OG_IMAGE_PATH, SITE_NAME, SITE_URL } from "./site";
import type { ToolPreset } from "./types";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  /** sitemap hints */
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: number;
}

export const PAGE_META = {
  home: {
    path: "/",
    title: "BillsFriend — Free GST Invoice & Bill Generator (No Sign-up)",
    description: "Create GST invoices, receipts, quotations, challans, payslips and electrician, plumber & mechanic bills free online. Instant PDF, no sign-up, no watermark.",
    changefreq: "weekly", priority: 1,
  },
  upiQr: {
    path: "/upi-qr",
    title: "Free UPI QR Code Generator Online | BillsFriend",
    description: "Generate a scannable UPI payment QR code from any UPI ID — free, instant, downloadable PNG. Optional pre-filled amount and note.",
    changefreq: "monthly", priority: 0.7,
  },
  about: {
    path: "/about",
    title: "About BillsFriend — Free, Private Bill Generator",
    description: "BillsFriend is a 100% free bill and invoice generator that runs entirely in your browser. No accounts, no data harvesting, no watermarks — by design.",
    changefreq: "yearly", priority: 0.5,
  },
  contact: {
    path: "/contact",
    title: "Contact BillsFriend — Support & Template Requests",
    description: "Missing a document type, found a bug, or have a suggestion? Email the BillsFriend team directly — free tools improve from your feedback.",
    changefreq: "yearly", priority: 0.5,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy — Zero Server-side Storage | BillsFriend",
    description: "BillsFriend stores your bills and business details only in your own browser — zero server-side document storage and no accounts, ever.",
    changefreq: "yearly", priority: 0.3,
  },
  terms: {
    path: "/terms",
    title: "Terms of Service — Free Fair Use | BillsFriend",
    description: "Terms of service for BillsFriend: free fair-use document generation, no warranty on tax compliance, and an advertising disclosure.",
    changefreq: "yearly", priority: 0.3,
  },
  dashboard: {
    path: "/dashboard",
    title: "My Documents — Saved Bills & Drafts | BillsFriend",
    description: "All bills, invoices and receipts saved in this browser — reopen, duplicate or delete them. Stored locally on your device only.",
    noindex: true,
  },
  notFound: {
    path: "/404",
    title: "Page not found (404) | BillsFriend",
    description: "That page doesn't exist. Browse BillsFriend's free bill and invoice generators instead.",
    noindex: true,
  },
} satisfies Record<string, PageMeta>;

export const HOME_FAQS = [
  { q: "Is BillsFriend really 100% free?", a: "Yes. Every generator — GST invoices, receipts, challans, payslips, electrician, plumber and mechanic bills — is free with unlimited documents, no sign-up, no watermark and no premium tier." },
  { q: "Do I need to create an account?", a: "No. BillsFriend works instantly in your browser. Your business profile and saved documents live on your own device — we never ask for your data." },
  { q: "Where is my data stored?", a: "In your browser's local storage only. Documents are created and saved client-side; nothing is ever uploaded to a server." },
  { q: "How do I download a bill as PDF?", a: "Press “Download PDF” on any generator and choose “Save as PDF” in the print dialog. The output is a clean, A4, print-ready document." },
  { q: "Is the GST invoice compliant with tax rules?", a: "The generator produces Rule 46 style tax invoices with HSN/SAC codes, GSTIN, place of supply and a CGST/SGST or IGST breakdown. For filing, always cross-check with your chartered accountant." },
  { q: "Does it work on mobile?", a: "Yes — BillsFriend is fully responsive, and documents are formatted to A4 whatever device you create them on." },
];

const faqLd = (items: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export function homeJsonLd(): object[] {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: absoluteUrl("/apple-touch-icon.png"),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "BillsFriend — Free Bill & Invoice Generator",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (Web)",
      browserRequirements: "Requires JavaScript",
      description: PAGE_META.home.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    faqLd(HOME_FAQS),
  ];
}

export function toolFaqs(preset: ToolPreset) {
  return [
    { q: `Is this ${preset.name.toLowerCase()} generator free?`, a: "Yes — completely free with unlimited documents, no sign-up and no watermark on the output." },
    { q: `Can I download the ${preset.docTitle.toLowerCase()} as PDF?`, a: "Yes. Press “Download PDF” and pick “Save as PDF” in your browser's print dialog — the output is a print-ready A4 document." },
    { q: "Is my data safe?", a: "Everything is created in your browser. Your business details and documents are never uploaded to a server." },
  ];
}

export function toolSteps(preset: ToolPreset): string[] {
  return [
    `Fill in your ${preset.fromLabel.toLowerCase()} — it is remembered on this device for every future document.`,
    `Add line items with ${preset.qtyLabel.toLowerCase()} and ${preset.rateLabel.toLowerCase()}${preset.taxMode === "gst" ? ", pick the GST rate" : ""} — totals and amount in words are calculated live.`,
    "Press “Download PDF” and choose “Save as PDF” in the print dialog, or press “Save” to keep the draft in My Documents.",
  ];
}

export function toolJsonLd(preset: ToolPreset): object[] {
  const url = absoluteUrl(`/${preset.id}`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `BillsFriend — ${preset.name}`,
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (Web)",
      description: preset.seoDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: preset.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to create ${withArticle(preset.name.toLowerCase())} online`,
      step: toolSteps(preset).map((text, i) => ({ "@type": "HowToStep", position: i + 1, text })),
    },
    faqLd(toolFaqs(preset)),
  ];
}

/** "a plumber bill" / "an electrician bill" */
export const withArticle = (noun: string): string => `${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun}`;

export function relatedPresets(preset: ToolPreset, all: ToolPreset[], n = 6): ToolPreset[] {
  const same = all.filter((p) => p.id !== preset.id && p.category === preset.category);
  const rest = all.filter((p) => p.id !== preset.id && p.category !== preset.category);
  return [...same, ...rest].slice(0, n);
}

export { OG_IMAGE_PATH };
