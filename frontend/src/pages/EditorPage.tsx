import { Link, useParams, useSearchParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Seo } from "@/components/Seo";
import { DocumentEditor } from "@/components/DocumentEditor";
import { getPreset, TOOL_PRESETS } from "@/lib/tools";
import { relatedPresets, toolFaqs, toolJsonLd, toolSteps, withArticle } from "@/lib/seo";
import NotFound from "@/pages/NotFound";

export default function EditorPage() {
  const { presetId } = useParams();
  const [sp] = useSearchParams();
  const docId = sp.get("doc") ?? undefined;
  const preset = getPreset(presetId);

  if (!preset) return <NotFound />;

  const steps = toolSteps(preset);
  const faqs = toolFaqs(preset);
  const related = relatedPresets(preset, TOOL_PRESETS, 6);

  return (
    <main className="pb-24">
      <Seo title={preset.seoTitle} description={preset.seoDescription} path={`/${preset.id}`} jsonLd={toolJsonLd(preset)} />
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
            <h2 className="font-heading text-xl font-bold tracking-tight">How to create {withArticle(preset.name.toLowerCase())} online</h2>
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
              {faqs.map((f, i) => (
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

        <nav aria-label="Related generators" className="no-print mt-16 border-t border-border/70 pt-10">
          <h2 className="font-heading text-xl font-bold tracking-tight">More free bill &amp; invoice generators</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/${p.id}`}
                  className="flex h-full flex-col rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-foreground/25 hover:bg-accent/40"
                >
                  <span className="text-sm font-semibold text-foreground">{p.name}</span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">
            Need to accept payments too? Try the free <Link to="/upi-qr" className="font-medium text-primary underline underline-offset-2">UPI QR code generator</Link>, or open{" "}
            <Link to="/dashboard" className="font-medium text-primary underline underline-offset-2">My Documents</Link> to reuse saved bills.
          </p>
        </nav>
      </div>
    </main>
  );
}
