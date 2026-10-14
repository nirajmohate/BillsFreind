import { Instagram, Youtube } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/site";

const ICONS = { instagram: Instagram, youtube: Youtube } as const;

/** Instagram + YouTube links. `showHandles` prints @handle next to each icon. */
export function SocialLinks({ showHandles = false, className = "" }: { showHandles?: boolean; className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="BillsFriend on social media">
      {SOCIAL_LINKS.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={`${s.label} — ${s.handle}`}
              data-testid={`social-${s.id}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/25 hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <Icon className="size-4" aria-hidden="true" />
              {showHandles ? <span>{s.handle}</span> : <span className="sr-only">{s.label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
