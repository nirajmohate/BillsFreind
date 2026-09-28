import { Seo } from "@/components/Seo";

const ROWS: [string, string][] = [
  ["Business profile (name, GSTIN, logo…)", "Stored only in your browser's local storage. Never uploaded anywhere."],
  ["Saved documents & drafts", "Local storage on your device only. There is no server-side database — we cannot see or access your documents."],
  ["Analytics", "Anonymous, aggregated usage measurement (Google Analytics 4) may be collected to improve the tool, if enabled. No document contents are transmitted."],
  ["Advertising", "Ad slots may be served by Google AdSense, if enabled. Google may use cookies subject to its own policies — see google.com/policies/privacy."],
  ["Contact", "If you email us, that message goes straight to our inbox through your own email provider — it never touches this site's servers because there are none."],
  ["Cookies / tracking", "No login sessions, no accounts, no third-party trackers beyond analytics/ad providers listed above (if enabled)."],
];

export default function Privacy() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title="Privacy Policy — Zero Server-side Storage | BillsFriend"
        description="BillsFriend stores your bills and business details only in your own browser — zero server-side document storage and no accounts, ever."
        path="/privacy"
      />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 1 March 2026</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border/80">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th className="px-4 py-3 font-heading font-bold">Data</th>
              <th className="px-4 py-3 font-heading font-bold">How it is handled</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map(([k, v], i) => (
              <tr key={k} className={i % 2 ? "bg-card" : "bg-background"}>
                <td className="px-4 py-3 align-top font-medium text-foreground">{k}</td>
                <td className="px-4 py-3 align-top leading-relaxed text-muted-foreground">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          <strong className="text-foreground">The short version:</strong> BillsFriend executes
          100% client-side. Your invoices, receipts and business details are created and stored
          in your browser and are never required to leave it. Clearing your browser data deletes
          them permanently — use the JSON export in the editor to keep a copy if the documents matter.
        </p>
        <p>
          Questions? Email us — see the <a href="/contact" className="text-primary underline underline-offset-2">contact page</a>.
        </p>
      </div>
    </main>
  );
}
