import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { parseInline, type Block } from "@/lib/blog";

/** Renders **bold**, *italic* and [links](/path) — internal links use the router. */
export function Inline({ text }: { text: string }) {
  return (
    <>
      {parseInline(text).map((t, i) => {
        if (t.k === "bold") return <strong key={i} className="font-semibold text-foreground">{t.v}</strong>;
        if (t.k === "em") return <em key={i}>{t.v}</em>;
        if (t.k === "link") {
          const cls = "font-medium text-primary underline underline-offset-2 hover:no-underline";
          return t.href.startsWith("/")
            ? <Link key={i} to={t.href} className={cls}>{t.v}</Link>
            : <a key={i} href={t.href} className={cls} target="_blank" rel="noopener noreferrer">{t.v}</a>;
        }
        return <span key={i}>{t.v}</span>;
      })}
    </>
  );
}

export function BlogBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[15.5px] leading-7 text-muted-foreground">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i} id={b.id} className="scroll-mt-24 pt-6 font-heading text-2xl font-bold tracking-tight text-foreground">{b.text}</h2>;
          case "p":
            return <p key={i}><Inline text={b.text} /></p>;
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-2 pl-5 marker:text-primary/60">
                {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-2 pl-5 marker:font-semibold marker:text-primary">
                {b.items.map((it, j) => <li key={j}><Inline text={it} /></li>)}
              </ol>
            );
          case "steps":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((s, j) => (
                  <li key={j} className="flex gap-4 rounded-xl border border-border/80 bg-card p-4">
                    <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">{j + 1}</span>
                    <div>
                      <h3 className="font-heading text-base font-bold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed"><Inline text={s.text} /></p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-border/80">
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  {b.caption && <caption className="sr-only">{b.caption}</caption>}
                  <thead className="bg-muted/60">
                    <tr>{b.head.map((h, j) => <th key={j} scope="col" className="px-4 py-2.5 font-heading font-bold text-foreground">{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className="border-t border-border/70">
                        {r.map((c, k) => <td key={k} className={`px-4 py-2.5 align-top ${k === 0 ? "font-medium text-foreground" : ""}`}><Inline text={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "callout":
            return (
              <aside key={i} className="rounded-xl border border-primary/25 bg-accent/60 p-4 text-sm">
                <p className="font-heading font-bold text-accent-foreground">{b.title}</p>
                <p className="mt-1 leading-relaxed"><Inline text={b.text} /></p>
              </aside>
            );
          case "img":
            return (
              <figure key={i} className="mx-auto max-w-[520px]">
                <img
                  src={b.src} alt={b.alt} width={b.width} height={b.height}
                  loading="lazy" decoding="async"
                  className="h-auto w-full rounded-lg border border-border/80 bg-white shadow-sm"
                />
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">{b.caption}</figcaption>
              </figure>
            );
          case "cta":
            return (
              <div key={i} className="rounded-2xl border border-border/80 bg-card p-6 text-center shadow-sm">
                <p className="mx-auto max-w-lg text-[15px] leading-relaxed text-foreground">{b.text}</p>
                <Link to={b.to} className={`${buttonVariants({ size: "lg" })} mt-4`} data-testid="blog-cta">
                  {b.label} <ArrowRight className="size-4" />
                </Link>
              </div>
            );
        }
      })}
    </div>
  );
}
