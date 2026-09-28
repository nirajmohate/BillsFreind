import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Copy, FileText, Plus, Trash2 } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Button, buttonVariants } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate, formatMoney } from "@/lib/format";
import { getTheme, loadDocs, peekDocNumber, putDoc, removeDoc } from "@/lib/storage";
import { getPreset, TOOL_PRESETS } from "@/lib/tools";
import type { LocalDoc } from "@/lib/types";

export default function Dashboard() {
  const [docs, setDocs] = useState<LocalDoc[]>(() => loadDocs());

  const refresh = () => setDocs(loadDocs());

  const stats = useMemo(() => {
    const month = new Date().toISOString().slice(0, 7);
    const topTool = TOOL_PRESETS.filter((p) => docs.some((d) => d.docType === p.id))
      .sort((a, b) => docs.filter((d) => d.docType === b.id).length - docs.filter((d) => d.docType === a.id).length)[0];
    return {
      count: docs.length,
      monthCount: docs.filter((d) => d.docDate.startsWith(month)).length,
      inrValue: docs.filter((d) => d.currency === "INR").reduce((s, d) => s + d.total, 0),
      topTool,
    };
  }, [docs]);

  const handleDuplicate = (doc: LocalDoc) => {
    const copy: LocalDoc = {
      ...doc,
      id: crypto.randomUUID(),
      docNumber: peekDocNumber(getPreset(doc.docType)?.numberPrefix ?? "DOC"),
      updatedAt: new Date().toISOString(),
      payload: { ...doc.payload, number: peekDocNumber(getPreset(doc.docType)?.numberPrefix ?? "DOC") },
      title: `${doc.title} (copy)`,
    };
    putDoc(copy);
    refresh();
    toast.success("Duplicated — open it to edit");
  };

  const handleDelete = (doc: LocalDoc) => {
    removeDoc(doc.id);
    refresh();
    toast.success("Deleted from this browser");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title="My Documents — Saved Bills & Drafts | BillsFriend"
        description="All bills, invoices and receipts saved in this browser — reopen, duplicate or delete them. Stored locally on your device only."
        path="/dashboard"
      />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">My Documents</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Saved in this browser only — nothing is ever uploaded anywhere.
          </p>
        </div>
        <Link to="/gst-invoice" className={buttonVariants({ size: "sm" })} data-testid="dashboard-new-doc-btn">
          <Plus className="size-4" /> New document
        </Link>
      </div>

      {/* Stat tiles */}
      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Documents stored", value: String(stats.count), sub: "on this device" },
          { label: "Total billed (INR)", value: formatMoney(stats.inrValue, "INR"), sub: "sum of INR documents" },
          { label: "Created this month", value: String(stats.monthCount), sub: new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" }) },
          { label: "Most used tool", value: stats.topTool?.name ?? "—", sub: stats.topTool ? "your workhorse" : "create your first bill" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-slate-900 p-5 text-slate-50 dark:bg-slate-800/80" data-testid="dashboard-stat-tile">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{s.label}</p>
            <p className="mt-2 truncate font-heading text-xl font-bold">{s.value}</p>
            <p className="mt-1 text-[11px] text-slate-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Document list */}
      {docs.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border p-14 text-center" data-testid="dashboard-empty-state">
          <FileText className="mx-auto size-8 text-muted-foreground/50" />
          <p className="mt-4 font-heading text-lg font-bold">No documents yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
            Create your first GST invoice, receipt or challan — it takes under a minute and needs no sign-up.
          </p>
          <Link to="/gst-invoice" className={`${buttonVariants({ size: "sm" })} mt-5`}>Create first document</Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-border/80 bg-card" data-testid="dashboard-document-list">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Number</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {docs.map((d) => {
                const preset = getPreset(d.docType);
                return (
                  <TableRow key={d.id} data-testid={`dashboard-row-${d.id}`}>
                    <TableCell>
                      <Link to={`/${d.docType}?doc=${d.id}`} className="font-medium hover:text-primary" data-testid={`dashboard-open-link-${d.docNumber}`}>
                        {d.title}
                      </Link>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{preset?.name ?? d.docType}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs">{d.docNumber}</TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">{formatDate(d.docDate)}</TableCell>
                    <TableCell className="text-right font-mono">{formatMoney(d.total, d.currency)}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon-xs" aria-label="Duplicate" data-testid="dashboard-duplicate-btn" onClick={() => handleDuplicate(d)}>
                          <Copy className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-xs" aria-label="Delete" data-testid="dashboard-delete-btn" onClick={() => handleDelete(d)}>
                          <Trash2 className="size-3.5 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
        {docs.length} document(s) · {getTheme() === "dark" ? "dark" : "light"} theme · stored only in this browser
      </p>
    </main>
  );
}
