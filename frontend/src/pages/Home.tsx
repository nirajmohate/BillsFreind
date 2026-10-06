import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, BadgeCheck, Lock, Printer, ShieldOff, WifiOff } from "lucide-react";
import { Seo } from "@/components/Seo";
import { AdSlot } from "@/components/AdSlot";
import { ToolCard } from "@/components/ToolCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/format";
import { TOOL_PRESETS } from "@/lib/tools";
import { HOME_FAQS, homeJsonLd, PAGE_META } from "@/lib/seo";


const FAQS = HOME_FAQS;

function MiniTestDrive() {
  const [desc, setDesc] = useState("Consulting — March");
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState(12500);
  const total = (Number(qty) || 0) * (Number(rate) || 0);

  return (
    <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-xl backdrop-blur" data-testid="hero-mini-generator">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Try it — live totals
      </p>
      <div className="mt-3 space-y-2.5">
        <Input value={desc} onChange={(e) => setDesc(e.target.value)} aria-label="Item description" data-testid="mini-item-desc-input" />
        <div className="grid grid-cols-2 gap-2.5">
          <Input type="number" min={0} value={qty} onChange={(e) => setQty(Number(e.target.value))} aria-label="Quantity" data-testid="mini-item-qty-input" />
          <Input type="number" min={0} value={rate} onChange={(e) => setRate(Number(e.target.value))} aria-label="Rate" data-testid="mini-item-rate-input" />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-lg bg-primary px-4 py-3 text-primary-foreground">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">Total</span>
        <span className="font-mono text-lg font-bold" data-testid="mini-total-display">{formatMoney(total, "INR")}</span>
      </div>
      <Link to="/gst-invoice" className={`${buttonVariants({ size: "lg" })} mt-3 w-full`} data-testid="mini-open-editor-btn">
        Open full generator <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

export default function Home() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#tools") document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return (
    <main>
      <Seo title={PAGE_META.home.title} description={PAGE_META.home.description} path={PAGE_META.home.path} jsonLd={homeJsonLd()} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/70 bg-gradient-to-b from-accent/40 to-background">
        <div aria-hidden="true" className="bg-ledger pointer-events-none absolute inset-0 opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-sky-600/20 bg-sky-100/70 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-800 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-300" data-testid="hero-free-badge">
              <BadgeCheck className="size-3.5" /> 100% free · no sign-up · no watermark
            </p>
            <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Bills &amp; invoices,
              <br />
              done in under a minute.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {TOOL_PRESETS.length} professional document generators — GST tax invoices, receipts, challans,
              quotations, cash vouchers, payslips, electrician, plumber and mechanic bills. Live totals, GST split, amount in words, and a
              pixel-perfect A4 PDF. Your data never leaves your browser.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/gst-invoice" className={buttonVariants({ size: "lg" })} data-testid="hero-cta-create">
                Create a GST invoice <ArrowRight className="size-4" />
              </Link>
              <Link to="/payment-receipt" className={buttonVariants({ variant: "outline", size: "lg" })} data-testid="hero-cta-receipt">
                Payment receipt
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground">
              {[
                { icon: Lock, t: "No account needed" },
                { icon: ShieldOff, t: "No data harvesting" },
                { icon: Printer, t: "A4 print-ready PDF" },
                { icon: WifiOff, t: "Works offline" },
              ].map(({ icon: Icon, t }) => (
                <li key={t} className="flex items-center gap-1.5"><Icon className="size-3.5 text-primary" /> {t}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <MiniTestDrive />
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6" aria-label="All document generators">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">The complete toolkit</p>
            <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">Pick a document. Start typing.</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-muted-foreground md:block">
            Every generator is free, ships with realistic sample data and downloads a clean A4 PDF.
          </p>
        </div>
        <div className="mt-8 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOL_PRESETS.map((p) => (
            <ToolCard key={p.id} preset={p} />
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <AdSlot id="home-mid" format="leaderboard" className="my-6" />
      </div>

      {/* How it works */}
      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight">Three steps. One minute. Zero rupees.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Choose a generator", d: "From GST tax invoices to rent receipts — every document type has a purpose-built preset." },
              { n: "02", t: "Fill & customize", d: "Your business profile is remembered. Add items, pick GST rates, switch currency and accent colours — totals update live." },
              { n: "03", t: "Download or save", d: "Print a pixel-perfect A4 PDF, export JSON for records, or save drafts in My Documents." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border/80 bg-background p-6">
                <p className="font-mono text-3xl font-bold text-primary/25">{s.n}</p>
                <h3 className="mt-3 font-heading text-lg font-bold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (SEO) */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6" aria-label="Frequently asked questions">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Good to know</p>
        <h2 className="mt-2 font-heading text-3xl font-bold tracking-tight">Frequently asked questions</h2>
        <div className="mt-8 space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group rounded-xl border border-border/80 bg-card p-5" data-testid={`faq-item-${i}`}>
              <summary className="cursor-pointer list-none font-heading text-base font-bold tracking-tight text-foreground marker:hidden">
                <span className="mr-2 inline-block text-primary transition-transform duration-200 group-open:rotate-90">›</span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span className="font-medium">Popular:</span>
          {["gst-invoice", "general-bill", "rent-receipt", "salary-slip", "electrician-bill", "plumber-bill", "mechanic-bill", "payment-receipt"].map((id) => {
            const p = TOOL_PRESETS.find((t) => t.id === id)!;
            return (
              <Link key={id} to={`/${id}`} className="rounded-full border border-border/80 px-3 py-1 transition-colors hover:bg-accent hover:text-accent-foreground">
                {p.name.toLowerCase()} generator
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
