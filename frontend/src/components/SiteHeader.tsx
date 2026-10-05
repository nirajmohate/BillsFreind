
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, FileText, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TOOL_PRESETS } from "@/lib/tools";
import { applyTheme, getTheme } from "@/lib/storage";

export function BrandMark({ className = "size-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="29" height="29" rx="9" className="fill-primary" />
      <path
        d="M10 8h9.5a4.5 4.5 0 0 1 0 9H10V8Zm0 9h11a4.5 4.5 0 0 1 0 9H10v-9Z"
        className="fill-primary-foreground"
        opacity="0.92"
      />
    </svg>
  );
}

function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const businessTools = TOOL_PRESETS.filter((p) => ["business", "procurement", "logistics", "financial"].includes(p.category));
  const serviceTools = TOOL_PRESETS.filter((p) => p.category === "services");
  const personalTools = TOOL_PRESETS.filter((p) => !["business", "procurement", "logistics", "financial", "services"].includes(p.category));

  const go = (id: string) => {
    setOpen(false);
    navigate(`/${id}`);
  };

  return (
    <div className="relative" ref={rootRef}>
      <Button
        variant="ghost"
        size="sm"
        data-testid="nav-tools-menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <FileText className="size-4" /> All Tools
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </Button>

      {open && (
        <div
          role="menu"
          data-testid="nav-tools-menu-content"
          className="absolute left-0 top-full z-50 mt-2 max-h-[70vh] w-72 overflow-y-auto rounded-xl border border-border/80 bg-popover p-2 text-popover-foreground shadow-xl"
        >
          <p className="px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Business &amp; Procurement
          </p>
          {businessTools.map((p) => (
            <button
              key={p.id}
              role="menuitem"
              onClick={() => go(p.id)}
              className="block w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {p.name}
            </button>
          ))}
          <p className="mt-2 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Electrician, Plumber &amp; Mechanic
          </p>
          {serviceTools.map((p) => (
            <button
              key={p.id}
              role="menuitem"
              onClick={() => go(p.id)}
              className="block w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {p.name}
            </button>
          ))}
          <p className="mt-2 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Personal, Tax &amp; Travel
          </p>
          {personalTools.map((p) => (
            <button
              key={p.id}
              role="menuitem"
              onClick={() => go(p.id)}
              className="block w-full rounded-lg px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground"
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">(() => getTheme());
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5" data-testid="navbar-brand">
          <BrandMark />
          <span className="font-heading text-lg font-bold tracking-tight">
            Bills<span className="text-primary">Friend</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Primary">
          <ToolsMenu />

          {[
            { to: "/dashboard", label: "My Documents" },
            { to: "/upi-qr", label: "UPI QR" },
            { to: "/about", label: "About" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            data-testid="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button size="sm" data-testid="nav-cta-create" onClick={() => navigate("/gst-invoice")} className="hidden sm:inline-flex">
            Create Invoice
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            data-testid="nav-mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="max-h-[75vh] overflow-y-auto border-t border-border/70 bg-background px-4 py-3 md:hidden">
          <div className="grid grid-cols-1 gap-1">
            {[
              { to: "/#tools", label: "All tools" },
              { to: "/dashboard", label: "My Documents" },
              { to: "/upi-qr", label: "UPI QR" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent">
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 px-3 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Popular generators</p>
          <div className="mt-1 grid grid-cols-2 gap-1">
            {TOOL_PRESETS.slice(0, 8).concat(TOOL_PRESETS.filter((p) => p.category === "services")).map((p) => (
              <Link key={p.id} to={`/${p.id}`} className="rounded-lg px-3 py-2 text-[13px] text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                {p.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
