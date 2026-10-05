import { Seo } from "@/components/Seo";
import { PAGE_META } from "@/lib/seo";

export default function Terms() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title={PAGE_META.terms.title}
        description={PAGE_META.terms.description}
        path={PAGE_META.terms.path}
      />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 1 March 2026</p>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        {[
          ["Free, unlimited use", "Every BillsFriend generator is free for personal and commercial use, with no document limits, no sign-up and no watermarks."],
          ["No warranty on tax compliance", "Documents are formatting tools. Output is generated from the data you enter; tax fields follow common Indian GST invoice conventions but do not constitute tax, legal or accounting advice. Verify with a qualified chartered accountant before filing."],
          ["Your content", "You own everything you create. We claim no license over your documents or business data. You are responsible for the accuracy of the details you enter."],
          ["Acceptable use", "Don't use BillsFriend to create fraudulent, forged or misleading documents, and don't attempt to disrupt the service or scrape it abusively."],
          ["Monetization disclosure", "The service is funded by advertising (which may include Google AdSense). Ads never gate or alter any generator feature."],
          ["Availability", "The tool is offered \"as is\". Because it is local-first, the generators keep working even if this website's servers are unreachable."],
        ].map(([h, p]) => (
          <section key={h}>
            <h2 className="font-heading text-lg font-bold text-foreground">{h}</h2>
            <p className="mt-2">{p}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
