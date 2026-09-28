// Reserved-space advertisement container. Renders a real AdSense <ins> unit only when
// VITE_ADSENSE_CLIENT is configured; otherwise keeps a subtle reserved slot (no layout shift).

const CLIENT = import.meta.env.VITE_ADSENSE_CLIENT as string | undefined;

export function AdSlot({
  id,
  format = "leaderboard",
  className = "",
}: {
  id: string;
  format?: "leaderboard" | "rectangle";
  className?: string;
}) {
  const minH = format === "leaderboard" ? "min-h-[100px]" : "min-h-[260px]";

  if (CLIENT) {
    return (
      <div className={`no-print ${className}`} data-testid={`ad-slot-${id}`}>
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={CLIENT}
          data-ad-slot={id}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return (
    <div
      className={`no-print ${minH} flex items-center justify-center rounded-xl border border-dashed border-border/70 bg-background/40 ${className}`}
      data-testid={`ad-slot-${id}`}
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
        Advertisement · 728×90
      </span>
    </div>
  );
}
