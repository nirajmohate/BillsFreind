import { Link, useParams } from "react-router-dom";
import { ChevronRight, Clock } from "lucide-react";
import { BlogBlocks } from "@/components/BlogBlocks";
import { Seo } from "@/components/Seo";
import { SocialLinks } from "@/components/SocialLinks";
import { BLOG_AUTHOR, getPost, otherPosts, postPath, readingMinutes } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { postJsonLd } from "@/lib/seo";
import { getPreset } from "@/lib/tools";
import NotFound from "@/pages/NotFound";

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const toc = post.body.flatMap((b) => (b.t === "h2" ? [b] : []));
  const more = otherPosts(post.slug, 4);
  const tools = post.relatedTools.map((id) => getPreset(id)).filter((p) => !!p).slice(0, 6);

  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
      <Seo
        title={post.seoTitle}
        description={post.description}
        path={postPath(post)}
        jsonLd={postJsonLd(post)}
        ogType="article"
        publishedTime={post.published}
      />

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-foreground">{post.category}</span>
      </nav>

      <article className="mt-5">
        <header>
          <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span>By {BLOG_AUTHOR}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.published}>{formatDate(post.published)}</time>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1"><Clock className="size-3.5" aria-hidden="true" /> {readingMinutes(post)} min read</span>
          </p>
        </header>

        <nav aria-label="Table of contents" className="mt-6 rounded-xl border border-border/80 bg-card p-4">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">In this guide</p>
          <ol className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
            {toc.map((h) => (
              <li key={h.id}><a href={`#${h.id}`} className="text-muted-foreground transition-colors hover:text-primary">{h.text}</a></li>
            ))}
          </ol>
        </nav>

        <div className="mt-8"><BlogBlocks blocks={post.body} /></div>

        <section aria-labelledby="faq-heading" className="mt-12">
          <h2 id="faq-heading" className="font-heading text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {post.faqs.map((f, i) => (
              <details key={i} className="group rounded-xl border border-border/80 bg-card p-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-foreground marker:hidden">
                  <span className="mr-2 inline-block text-primary transition-transform duration-200 group-open:rotate-90">›</span>
                  {f.q}
                </summary>
                <p className="mt-2 pl-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </article>

      {tools.length > 0 && (
        <section aria-label="Related generators" className="mt-12 border-t border-border/70 pt-8">
          <h2 className="font-heading text-lg font-bold tracking-tight">Free generators mentioned in this guide</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {tools.map((p) => p && (
              <li key={p.id}>
                <Link to={`/${p.id}`} className="inline-block rounded-full border border-border/80 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {more.length > 0 && (
        <section aria-label="More guides" className="mt-10">
          <h2 className="font-heading text-lg font-bold tracking-tight">Keep reading</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {more.map((p) => (
              <li key={p.slug}>
                <Link to={postPath(p)} className="flex h-full flex-col rounded-xl border border-border/80 bg-card p-4 transition-colors hover:border-foreground/25 hover:bg-accent/40">
                  <span className="text-sm font-semibold text-foreground">{p.title}</span>
                  <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{p.excerpt}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="Follow BillsFreind" className="mt-10 rounded-2xl border border-border/80 bg-card p-5">
        <p className="font-heading text-base font-bold">Follow BillsFreind</p>
        <p className="mt-1 text-sm text-muted-foreground">Short tutorials and new bill formats on Instagram and YouTube.</p>
        <SocialLinks showHandles className="mt-3" />
      </section>
    </main>
  );
}
