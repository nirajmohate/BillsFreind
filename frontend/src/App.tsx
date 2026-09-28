import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import Home from "@/pages/Home";
import EditorPage from "@/pages/EditorPage";
import Dashboard from "@/pages/Dashboard";
import UpiQr from "@/pages/UpiQr";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

// One <Route> per page in src/pages; BrowserRouter already wraps this in main.tsx.
// /:presetId (clean SEO URL for every generator) is registered LAST among the app
// routes so React Router's static-over-dynamic ranking keeps real paths winning.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1">
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
      </div>
      <SiteFooter />
      <Toaster />
    </div>
  );
}
