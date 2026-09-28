import { Link } from "react-router-dom";
import { BrandMark } from "@/components/SiteHeader";
import { TOOL_PRESETS } from "@/lib/tools";

export function SiteFooter() {
  const colA = TOOL_PRESETS.slice(0, 6);
  const colB = TOOL_PRESETS.slice(6, 12);
  const colC = TOOL_PRESETS.slice(12);

  return (
    <footer className="no-print border-t border-border/70 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5" data-testid="footer-brand">
              <BrandMark />
              <span className="font-heading text-lg font-bold tracking-tight">
                Bills<span className="text-primary">Friend</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Free online bill &amp; invoice generator for Indian businesses — GST-ready, no sign-up,
              no watermark, no paywall. Your data never leaves your browser.
            </p>
          </div>

          {[
            { title: "Popular tools", tools: colA },
            { title: "More generators", tools: colB },
            { title: "Reimbursement & claims", tools: colC },
          ].map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.tools.map((p) => (
                  <li key={p.id}>
                    <Link to={`/${p.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground" data-testid={`footer-tool-${p.id}`}>
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BillsFriend. Free forever — built for small business, freelancers and HR teams.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/contact" className="hover:text-foreground">Contact</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
