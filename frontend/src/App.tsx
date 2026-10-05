import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Home from "@/pages/Home";

// Everything except the home page is code-split, so first load ships only what the landing
// page needs; the editor (and its QR dependency) loads when a generator is opened.
const EditorPage = lazy(() => import("@/pages/EditorPage"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const UpiQr = lazy(() => import("@/pages/UpiQr"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);
  return null;
}

function PageLoader() {
  return (
    <div role="status" aria-live="polite" className="flex min-h-[60vh] items-center justify-center gap-2 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Loading…
    </div>
  );
}

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
// /:presetId (clean SEO URL for every generator) is registered LAST among the app
// routes so React Router's static-over-dynamic ranking keeps real paths winning.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground">
        Skip to content
      </a>
      <SiteHeader />
      <ScrollManager />
      <div id="main-content" className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upi-qr" element={<UpiQr />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/editor/:presetId" element={<EditorPage />} />
            <Route path="/:presetId" element={<EditorPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
