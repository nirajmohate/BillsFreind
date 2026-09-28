import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { buttonVariants } from "@/components/ui/button";
import { TOOL_PRESETS } from "@/lib/tools";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-20 text-center sm:px-6">
      <Seo
        title="Page not found (404) | BillsFriend"
        description="That page doesn't exist. Browse BillsFriend's free bill and invoice generators instead."
        path="/404"
      />
      <p className="font-mono text-7xl font-bold text-primary/25">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight">This page was never invoiced.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        The generator you're looking for doesn't exist — but all {TOOL_PRESETS.length} real ones do, and every one is free.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {TOOL_PRESETS.slice(0, 6).map((p) => (
          <Link key={p.id} to={`/${p.id}`} className="rounded-full border border-border/80 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
            {p.name}
          </Link>
        ))}
      </div>
      <Link to="/" className={`${buttonVariants({ size: "lg" })} mt-8`} data-testid="notfound-home-btn">
        Back to home
      </Link>
    </main>
  );
}
