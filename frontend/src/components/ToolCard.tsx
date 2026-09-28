import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ToolPreset } from "@/lib/types";

const SPAN_BY_CATEGORY: Record<string, string> = {
  business: "md:col-span-6",
  financial: "md:col-span-3",
  procurement: "md:col-span-3",
  logistics: "md:col-span-3",
  personal_tax: "md:col-span-3",
  hr_payroll: "md:col-span-6",
  reimbursement: "md:col-span-4",
  travel: "md:col-span-4",
  health_insurance: "md:col-span-4",
};

export function ToolCard({ preset, wide = false }: { preset: ToolPreset; wide?: boolean }) {
  return (
    <Link
      to={`/${preset.id}`}
      data-testid={`preset-card-${preset.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-[0_12px_40px_-16px_rgba(2,8,23,0.35)] ${wide ? "md:col-span-6" : SPAN_BY_CATEGORY[preset.category] ?? "md:col-span-4"}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] opacity-70 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: preset.accent }}
      />
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full border border-border/70 bg-background px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {preset.badge}
          </span>
          <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>
        <h3 className="mt-3 font-heading text-base font-bold tracking-tight text-foreground">{preset.name}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{preset.description}</p>
      </div>
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        Free · PDF · No sign-up
      </p>
    </Link>
  );
}
