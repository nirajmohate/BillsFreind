import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { DocumentEditor } from "@/components/DocumentEditor";
import { getPreset } from "@/lib/tools";
import NotFound from "@/pages/NotFound";

export default function EditorPage() {
  const { presetId } = useParams();
  const [sp] = useSearchParams();
  const docId = sp.get("doc") ?? undefined;
  const preset = getPreset(presetId);

  if (!preset) return <NotFound />;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: `BillsFriend — ${preset.name}`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (Web)",
      description: preset.seoDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: window.location.origin },
        { "@type": "ListItem", position: 2, name: preset.name },
      ],
    },
  ];

  const steps = [
    `Fill in your ${preset.fromLabel.toLowerCase()} — it is remembered on this device for every future document.`,
    `Add line items with ${preset.qtyLabel.toLowerCase()} and ${preset.rateLabel.toLowerCase()}${preset.taxMode === "gst" ? ", pick the GST rate" : ""} — totals, tax split and amount in words are calculated live.`,
    `Press “Download PDF” and choose “Save as PDF” in the print dialog, or press “Save” to keep the draft in My Documents.`,
  ];

  return (
    <main className="pb-24">
      <Seo title={preset.seoTitle} description={preset.seoDescription} path={`/${preset.id}`} jsonLd={jsonLd} />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{preset.name}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{preset.name}</h1>
              <span className="rounded-full border border-border bg-accent px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                {preset.badge}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{preset.description}</p>
          </div>
          <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400" data-testid="editor-free-badge">
            100% Free · No sign-up
          </p>
        </div>

        <div className="mt-8">
          <DocumentEditor key={`${preset.id}-${docId ?? "new"}`} preset={preset} docId={docId} />
        </div>

        <section className="no-print mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight">How to create a {preset.name.toLowerCase()} online</h2>
            <ol className="mt-4 space-y-3">
              {steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-[10px] font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold tracking-tight">{preset.name} FAQ</h2>
            <div className="mt-4 space-y-3">
              {[
                {
                  q: `Is this ${preset.name.toLowerCase()} generator free?`,
                  a: "Yes — completely free with unlimited documents, no sign-up and no watermark on the output.",
                },
                {
                  q: `Can I download the ${preset.docTitle.toLowerCase()} as PDF?`,
                  a: "Yes. Press “Download PDF” and pick “Save as PDF” in your browser's print dialog — the output is a pixel-perfect A4 document.",
                },
              ].map((f, i) => (
                <details key={i} className="group rounded-xl border border-border/80 bg-card p-4" data-testid={`editor-faq-item-${i}`}>
                  <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:hidden">
                    <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
                    {f.q}
                  </summary>
                  <p className="mt-2 pl-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
