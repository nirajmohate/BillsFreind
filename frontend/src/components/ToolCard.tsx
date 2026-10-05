import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ToolPreset } from "@/lib/types";

// Every card is identical in size: the grid uses equal rows (auto-rows-fr) and the
// footer is pinned to the bottom, so the section reads as one clean, even grid.
export function ToolCard({ preset }: { preset: ToolPreset }) {
  return (
    <Link
      to={`/${preset.id}`}
      data-testid={`preset-card-${preset.id}`}
      aria-label={`${preset.name} — free online generator`}
      className="group relative flex h-full min-h-[212px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_12px_40px_-16px_rgba(2,8,23,0.35)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: preset.accent }}
      />
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full border border-border/70 bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {preset.badge}
        </span>
        <ArrowUpRight aria-hidden="true" className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
      <h3 className="mt-3 font-heading text-base font-bold tracking-tight text-foreground">{preset.name}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{preset.description}</p>
      <p className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        Free · PDF · No sign-up
      </p>
    </Link>
  );
}
