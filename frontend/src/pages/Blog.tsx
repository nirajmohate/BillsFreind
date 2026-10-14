import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SocialLinks } from "@/components/SocialLinks";
import { BLOG_POSTS, postPath, readingMinutes } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { blogIndexJsonLd, PAGE_META } from "@/lib/seo";

export default function Blog() {
  return (
    <main className="mx-auto max-w-5xl px-4 pb-24 pt-10 sm:px-6">
      <Seo title={PAGE_META.blog.title} description={PAGE_META.blog.description} path={PAGE_META.blog.path} jsonLd={blogIndexJsonLd()} />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Blog</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Billing guides for Indian businesses</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Plain-language guides on GST invoices, receipts and everyday billing — so every bill you send is correct,
        professional and gets you paid.
      </p>

      <ul className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2">
        {BLOG_POSTS.map((p) => (
          <li key={p.slug}>
            <article className="group relative flex h-full flex-col rounded-2xl border border-border/80 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_12px_40px_-16px_rgba(2,8,23,0.35)]">
              <span className="w-fit rounded-full border border-border/70 bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {p.category}
              </span>
              <h2 className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-foreground">
                <Link to={postPath(p)} className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <time dateTime={p.published}>{formatDate(p.published)}</time>
                  <span aria-hidden="true">·</span>
                  <Clock className="size-3.5" aria-hidden="true" /> {readingMinutes(p)} min read
                </span>
                <span className="flex items-center gap-1 font-medium text-primary">Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <section className="mt-14 rounded-2xl border border-border/80 bg-card p-6" aria-label="Follow BillsFriend">
        <h2 className="font-heading text-lg font-bold">Want more tips and tutorials?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Follow us on Instagram and YouTube for short how-tos and new bill formats.</p>
        <SocialLinks showHandles className="mt-3" />
      </section>
    </main>
  );
}
