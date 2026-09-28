import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { buttonVariants } from "@/components/ui/button";
import { TOOL_PRESETS } from "@/lib/tools";

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title="About BillsFriend — Free, Private, Local-first Bill Generator"
        description="BillsFriend is a 100% free bill and invoice generator that runs entirely in your browser. No accounts, no data harvesting, no watermarks — by design."
        path="/about"
      />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">About</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Billing tools should be free, private and fast.</h1>

      <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground">
        <p>
          BillsFriend exists because small businesses, freelancers and families shouldn't need
          paid accounting software to produce a clean, professional bill. Every generator on
          this site — {TOOL_PRESETS.length} of them — is free forever, with no sign-up and no
          watermark.
        </p>
        <p>
          The tool is <strong className="text-foreground">local-first</strong>: documents are
          created, calculated and stored inside your own browser. Your business profile, client
          details and saved drafts never touch a server at all — there's no database and no
          account, ever.
        </p>
        <div className="rounded-2xl border border-border/80 bg-card p-6">
          <h2 className="font-heading text-lg font-bold text-foreground">How the offline architecture works</h2>
          <ol className="mt-4 space-y-2 text-sm">
            <li><span className="font-mono font-semibold text-primary">1 · Input →</span> You type in the form; every keystroke recalculates totals, GST splits and amount-in-words locally.</li>
            <li><span className="font-mono font-semibold text-primary">2 · Render →</span> The A4 document preview is real HTML/CSS — what you see is exactly what prints.</li>
            <li><span className="font-mono font-semibold text-primary">3 · Output →</span> “Download PDF” uses your browser's own print engine; nothing is uploaded to make a PDF.</li>
          </ol>
        </div>
        <p>
          Monetization is limited to unobtrusive ad slots, which keep the lights on without ever
          gating a single feature. If a tool is useful to you, share it — that's the whole
          growth plan.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/gst-invoice" className={buttonVariants({ size: "lg" })}>Try the GST invoice generator</Link>
        <Link to="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>Request a template</Link>
      </div>
    </main>
  );
}
