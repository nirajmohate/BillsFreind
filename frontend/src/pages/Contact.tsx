import { useState } from "react";
import { toast } from "sonner";
import { Copy, Mail } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";

const CONTACT_EMAIL = "mohateniraj@gmail.com";

const FAQS = [
  { q: "Can you add a document type I need?", a: "Very likely — most generators are presets of the same engine. Email the format and fields you need and it'll be considered for the next release." },
  { q: "I found a calculation bug", a: "Please include the document type, the numbers you entered and what you expected. GST math bugs get fixed first." },
  { q: "Do you offer bulk/API generation?", a: "Not yet — BillsFriend is intentionally server-free for privacy. Sign up for nothing, wait for nothing." },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      toast.success("Email address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please select and copy it manually.");
    }
  };

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("BillsFriend — ")}`;

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title="Contact BillsFriend — Support & Template Requests"
        description="Missing a document type, found a bug, or have a suggestion? Email the BillsFriend team directly — free tools improve from your feedback."
        path="/contact"
      />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Tell us what to build next.</h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
        Found a bug, missing a document type, or just have feedback? Send it straight to our
        inbox — there's no form to fill in, no account, and nothing to sign up for.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border/80 bg-card p-6" data-testid="contact-email-card">
          <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Mail className="size-5" />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Email us directly at</p>
          <p className="mt-1 break-all font-heading text-xl font-bold text-foreground" data-testid="contact-email-address">
            {CONTACT_EMAIL}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={mailtoHref} className="inline-flex" data-testid="contact-mailto-btn">
              <Button size="sm">
                <Mail className="size-4" /> Open in email app
              </Button>
            </a>
            <Button size="sm" variant="outline" onClick={copyEmail} data-testid="contact-copy-btn">
              <Copy className="size-4" /> {copied ? "Copied!" : "Copy address"}
            </Button>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Tip: mention the document type and, if it's a bug, the numbers you entered and what
            you expected instead — it helps us reply faster.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <details key={i} className="group rounded-xl border border-border/80 bg-card p-5" data-testid={`contact-faq-${i}`}>
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground marker:hidden">
                <span className="mr-2 inline-block text-primary transition-transform group-open:rotate-90">›</span>
                {f.q}
              </summary>
              <p className="mt-2 pl-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
