// The document workspace: preset-driven form (left) + live A4 preview (right).
// Local-first only: every save writes to this browser's localStorage. There is no backend
// document store and nothing here is ever uploaded anywhere.

import { useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Copy, Download, FileJson, FilePlus2, Printer, Save, Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocumentPreview } from "@/components/DocumentPreview";
import { CURRENCIES, computeTotals, formatMoney } from "@/lib/format";
import {
  docTitleFor, getDoc, loadProfile, nextDocNumber, peekDocNumber, putDoc, saveProfile,
} from "@/lib/storage";
import { ACCENTS, emptyDoc, newItem, sampleDoc, TOOL_PRESETS } from "@/lib/tools";
import type { DocData, LocalDoc, Party, ToolPreset } from "@/lib/types";

const TAX_MODE_LABELS: Record<string, string> = { intra: "Within state (CGST + SGST)", inter: "Inter-state (IGST)", none: "No GST" };

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function Section({ title, children, testid }: { title: string; children: React.ReactNode; testid: string }) {
  return (
    <Card size="sm" data-testid={testid}>
      <CardHeader>
        <CardTitle className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
}

async function toLogoDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const max = 360;
      const ratio = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function DocumentEditor({ preset, docId }: { preset: ToolPreset; docId?: string }) {
  const profile = loadProfile();
  const existing = docId ? getDoc(docId) : undefined;
  const [data, setData] = useState<DocData>(
    () => existing?.payload ?? emptyDoc(preset, profile, nextDocNumber(preset.numberPrefix)),
  );
  const [savedId, setSavedId] = useState<string | undefined>(existing?.id);
  const [dirty, setDirty] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const totals = useMemo(() => computeTotals(data, preset), [data, preset]);

  const patch = (p: Partial<DocData>) => {
    setData((d) => ({ ...d, ...p }));
    setDirty(true);
  };
  const patchBusiness = (key: keyof Party, value: string) => {
    setData((d) => {
      const business = { ...d.business, [key]: value };
      saveProfile(business);
      return { ...d, business };
    });
    setDirty(true);
  };
  const patchClient = (key: keyof Party, value: string) => {
    setData((d) => ({ ...d, client: { ...d.client, [key]: value } }));
    setDirty(true);
  };
  const patchItem = (id: string, p: Partial<DocData["items"][number]>) => {
    setData((d) => ({ ...d, items: d.items.map((it) => (it.id === id ? { ...it, ...p } : it)) }));
    setDirty(true);
  };

  const handleSave = async () => {
    const doc: LocalDoc = {
      id: savedId ?? crypto.randomUUID(),
      docType: preset.id,
      title: docTitleFor(data),
      docNumber: data.number,
      docDate: data.issueDate,
      total: totals.grand,
      currency: data.currency,
      updatedAt: new Date().toISOString(),
      payload: data,
    };
    putDoc(doc);
    setSavedId(doc.id);
    setDirty(false);
    toast.success(`Saved “${doc.title}” to this browser`, {
      description: "Find it any time under My Documents.",
    });
  };

  const handleDuplicate = async () => {
    const doc: LocalDoc = {
      id: crypto.randomUUID(),
      docType: preset.id,
      title: `${docTitleFor(data)} (copy)`,
      docNumber: peekDocNumber(preset.numberPrefix),
      docDate: data.issueDate,
      total: totals.grand,
      currency: data.currency,
      updatedAt: new Date().toISOString(),
      payload: { ...data, number: peekDocNumber(preset.numberPrefix) },
    };
    putDoc(doc);
    toast.success("Duplicated to My Documents");
  };

  const handleNew = () => {
    setData(emptyDoc(preset, loadProfile(), nextDocNumber(preset.numberPrefix)));
    setSavedId(undefined);
    setDirty(true);
    toast("Started a fresh document", { description: "Your business details were carried over." });
  };

  const handleSample = () => {
    setData(sampleDoc(preset));
    setDirty(true);
    toast.success("Sample data filled — press “Download PDF” to see the final output");
  };

  const handlePrint = () => {
    toast("Opening print dialog…", { description: "Choose “Save as PDF” as the destination to download." });
    setTimeout(() => window.print(), 350);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify({ generator: "BillsFriend", preset: preset.id, document: data }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.number || preset.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLogo = async (file: File | undefined) => {
    if (!file) return;
    patchBusiness("logo", await toLogoDataUrl(file));
    toast.success("Logo added to your documents");
  };

  const showGst = preset.taxMode === "gst";

  return (
    <div>
      {/* Action bar */}
      <div className="no-print mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-card p-3 shadow-sm">
        <Select value={preset.id} onValueChange={(v: string) => { if (v !== preset.id) window.location.assign(`/${v}`); }}>
          <SelectTrigger className="h-9 w-[210px]" data-testid="editor-preset-selector" aria-label="Switch document type">
            <SelectValue>{(v: string) => TOOL_PRESETS.find((p) => p.id === v)?.name ?? v}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TOOL_PRESETS.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
          {dirty ? "● unsaved" : savedId ? "saved" : "new"}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" data-testid="editor-fill-sample-btn" onClick={handleSample}>
            <Sparkles className="size-4" /> Sample
          </Button>
          <Button variant="outline" size="sm" data-testid="editor-new-btn" onClick={handleNew}>
            <FilePlus2 className="size-4" /> New
          </Button>
          <Button variant="outline" size="sm" data-testid="editor-save-draft-btn" onClick={handleSave}>
            <Save className="size-4" /> Save
          </Button>
          <Button variant="outline" size="sm" data-testid="editor-download-json-btn" onClick={handleDownloadJSON}>
            <FileJson className="size-4" /> JSON
          </Button>
          <Button size="sm" data-testid="editor-print-pdf-btn" onClick={handlePrint}>
            <Printer className="size-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Form column */}
        <div className="no-print space-y-5 lg:col-span-5 xl:col-span-5">
          <Section title="Document" testid="editor-section-document">
            <div className="grid grid-cols-2 gap-3">
              <Field label={preset.numberLabel}>
                <Input value={data.number} onChange={(e) => patch({ number: e.target.value })} data-testid="editor-doc-number-input" />
              </Field>
              <Field label={preset.id === "quotation-estimate" ? "Date" : "Issue Date"}>
                <Input type="date" value={data.issueDate} onChange={(e) => patch({ issueDate: e.target.value })} data-testid="editor-issue-date-input" />
              </Field>
              {preset.id !== "rent-receipt" && (
                <Field label={preset.id === "quotation-estimate" ? "Valid Until" : "Due Date (optional)"}>
                  <Input type="date" value={data.dueDate} onChange={(e) => patch({ dueDate: e.target.value })} data-testid="editor-due-date-input" />
                </Field>
              )}
              <Field label="Currency">
                <Select value={data.currency} onValueChange={(v: string) => patch({ currency: v })}>
                  <SelectTrigger data-testid="editor-currency-select">
                    <SelectValue>{(v: string) => CURRENCIES.find((c) => c.code === v)?.label ?? v}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>
            {showGst && (
              <Field label="GST Supply Type">
                <Select value={data.taxMode} onValueChange={(v: string) => patch({ taxMode: v as DocData["taxMode"] })}>
                  <SelectTrigger data-testid="editor-tax-mode-select">
                    <SelectValue>{(v: string) => TAX_MODE_LABELS[v] ?? v}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="intra">Within state (CGST + SGST)</SelectItem>
                    <SelectItem value="inter">Inter-state (IGST)</SelectItem>
                    <SelectItem value="none">No GST</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            )}
            {preset.amountMode === "items" && (
              <Field label="Discount (% of subtotal, optional)">
                <Input
                  type="number" min={0} max={100} value={data.discountPct}
                  onChange={(e) => patch({ discountPct: Number(e.target.value) || 0 })}
                  data-testid="editor-discount-input"
                />
              </Field>
            )}
            {preset.amountMode === "single" && (
              <Field label={preset.amountLabel}>
                <Input
                  type="number" min={0} value={data.singleAmount || ""}
                  onChange={(e) => patch({ singleAmount: Number(e.target.value) || 0 })}
                  data-testid="editor-single-amount-input"
                />
              </Field>
            )}
          </Section>

          <Section title={preset.fromLabel} testid="editor-section-business">
            <Field label="Business / Your Name">
              <Input value={data.business.name} onChange={(e) => patchBusiness("name", e.target.value)} placeholder="Sharma Traders" data-testid="editor-business-name-input" />
            </Field>
            <Field label="Address">
              <Textarea rows={2} value={data.business.address} onChange={(e) => patchBusiness("address", e.target.value)} data-testid="editor-business-address-input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone"><Input value={data.business.phone} onChange={(e) => patchBusiness("phone", e.target.value)} data-testid="editor-business-phone-input" /></Field>
              <Field label="Email"><Input type="email" value={data.business.email} onChange={(e) => patchBusiness("email", e.target.value)} data-testid="editor-business-email-input" /></Field>
              <Field label="GSTIN"><Input value={data.business.gstin} onChange={(e) => patchBusiness("gstin", e.target.value.toUpperCase())} placeholder="33ABCDE1234F1Z5" data-testid="editor-business-gstin-input" /></Field>
              <Field label="PAN"><Input value={data.business.pan} onChange={(e) => patchBusiness("pan", e.target.value.toUpperCase())} data-testid="editor-business-pan-input" /></Field>
            </div>
            <Field label="Logo">
              <input
                ref={logoInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => void handleLogo(e.target.files?.[0])} data-testid="editor-logo-input"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => logoInputRef.current?.click()} data-testid="editor-logo-upload-btn">
                  Upload logo
                </Button>
                {data.business.logo && (
                  <Button variant="ghost" size="sm" onClick={() => patchBusiness("logo", "")} data-testid="editor-logo-remove-btn">Remove</Button>
                )}
                {data.business.logo && <img src={data.business.logo} alt="Logo preview" className="size-8 rounded border border-border object-contain" />}
              </div>
            </Field>
            <Field label="UPI ID (for payment QR on Executive template)">
              <Input value={data.business.upiId} onChange={(e) => patchBusiness("upiId", e.target.value)} placeholder="business@okicici" data-testid="editor-business-upi-input" />
            </Field>
          </Section>

          <Section title={preset.toLabel} testid="editor-section-client">
            <Field label="Name">
              <Input value={data.client.name} onChange={(e) => patchClient("name", e.target.value)} data-testid="editor-client-name-input" />
            </Field>
            <Field label="Address">
              <Textarea rows={2} value={data.client.address} onChange={(e) => patchClient("address", e.target.value)} data-testid="editor-client-address-input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone"><Input value={data.client.phone} onChange={(e) => patchClient("phone", e.target.value)} data-testid="editor-client-phone-input" /></Field>
              <Field label="Email"><Input type="email" value={data.client.email} onChange={(e) => patchClient("email", e.target.value)} data-testid="editor-client-email-input" /></Field>
              {showGst && <Field label="Client GSTIN"><Input value={data.client.gstin} onChange={(e) => patchClient("gstin", e.target.value.toUpperCase())} data-testid="editor-client-gstin-input" /></Field>}
            </div>
          </Section>

          <Section title={`${preset.itemLabel}s`} testid="editor-section-items">
            <div className="space-y-2">
              {data.items.map((it, idx) => (
                <div key={it.id} className="grid grid-cols-[1fr_auto] gap-2 rounded-lg border border-border/70 p-2" data-testid={`editor-item-row-${idx}`}>
                  <div className="space-y-2">
                    <Input
                      placeholder={preset.itemLabel}
                      value={it.desc}
                      onChange={(e) => patchItem(it.id, { desc: e.target.value })}
                      data-testid={`editor-item-desc-${idx}`}
                    />
                    <div className="grid grid-cols-4 gap-1.5">
                      {preset.showHsn && (
                        <Input placeholder="HSN/SAC" value={it.hsn} onChange={(e) => patchItem(it.id, { hsn: e.target.value })} className="col-span-2" data-testid={`editor-item-hsn-${idx}`} />
                      )}
                      <Input
                        type="number" min={0} value={it.qty || ""} placeholder={preset.qtyLabel}
                        onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) || 0 })}
                        data-testid={`editor-item-qty-${idx}`}
                      />
                      <Input
                        type="number" min={0} value={it.rate || ""} placeholder={preset.rateLabel}
                        onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) || 0 })}
                        data-testid={`editor-item-rate-${idx}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {showGst && (
                        <Select value={String(it.gstRate)} onValueChange={(v: string) => patchItem(it.id, { gstRate: Number(v) })}>
                          <SelectTrigger size="sm" className="w-[130px]" data-testid={`editor-item-gst-${idx}`}>
                            <SelectValue>{(v: string) => `GST ${v}%`}</SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {[0, 0.25, 3, 5, 12, 18, 28].map((r) => (
                              <SelectItem key={r} value={String(r)}>{r}%</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      <p className="ml-auto font-mono text-sm font-medium">{formatMoney(it.qty * it.rate, data.currency)}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost" size="icon-xs" aria-label="Remove item"
                    onClick={() => { setData((d) => ({ ...d, items: d.items.filter((x) => x.id !== it.id) })); setDirty(true); }}
                    data-testid={`editor-item-remove-row-btn-${idx}`}
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full" onClick={() => { setData((d) => ({ ...d, items: [...d.items, newItem(preset)] })); setDirty(true); }} data-testid="editor-item-add-row-btn">
                + Add line item
              </Button>
            </div>
          </Section>

          {preset.extraFields.length > 0 && (
            <Section title="Additional Details" testid="editor-section-extra">
              <div className="grid grid-cols-2 gap-3">
                {preset.extraFields.map((f) => (
                  <Field key={f.key} label={f.label}>
                    <Input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={data.extra[f.key] ?? ""}
                      onChange={(e) => patch({ extra: { ...data.extra, [f.key]: e.target.value } })}
                      data-testid={`editor-extra-${f.key}-input`}
                    />
                  </Field>
                ))}
              </div>
            </Section>
          )}

          <Section title="Notes, Terms & Branding" testid="editor-section-branding">
            <Field label="Notes"><Textarea rows={2} value={data.notes} onChange={(e) => patch({ notes: e.target.value })} data-testid="editor-notes-input" /></Field>
            <Field label="Terms & Conditions"><Textarea rows={2} value={data.terms} onChange={(e) => patch({ terms: e.target.value })} data-testid="editor-terms-input" /></Field>
            <Field label="Signatory Name"><Input value={data.signName} onChange={(e) => patch({ signName: e.target.value })} data-testid="editor-sign-input" /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Template Style">
                <Select value={data.templateStyle} onValueChange={(v: string) => patch({ templateStyle: v as DocData["templateStyle"] })}>
                  <SelectTrigger data-testid="editor-template-style-switch">
                    <SelectValue>{(v: string) => (v === "swiss" ? "Swiss Architectural" : "Corporate Executive")}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="swiss">Swiss Architectural</SelectItem>
                    <SelectItem value="executive">Corporate Executive</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Accent Colour">
                <div className="flex h-9 items-center gap-1.5" data-testid="editor-accent-color-picker">
                  {ACCENTS.map((a) => (
                    <button
                      key={a.value}
                      type="button"
                      aria-label={a.name}
                      title={a.name}
                      onClick={() => patch({ accent: a.value })}
                      className={`size-6 rounded-full border-2 transition-transform hover:scale-110 ${data.accent === a.value ? "border-foreground ring-2 ring-ring ring-offset-2 ring-offset-background" : "border-transparent"}`}
                      style={{ backgroundColor: a.value }}
                      data-testid={`accent-swatch-${a.name.toLowerCase().replace(" ", "-")}`}
                    />
                  ))}
                </div>
              </Field>
            </div>
          </Section>
        </div>

        {/* Preview column */}
        <div className="lg:col-span-7 xl:col-span-7">
          <div className="print-plain sticky top-24 rounded-2xl border border-border/80 bg-slate-200/60 p-4 shadow-inner sm:p-8 dark:bg-slate-900/60">
            <DocumentPreview data={data} preset={preset} />
          </div>
          <div className="no-print mt-4 flex items-center justify-between rounded-xl border border-border/80 bg-card px-4 py-3">
            <div className="text-sm text-muted-foreground">
              {preset.amountLabel} · {data.currency}
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-lg font-bold" data-testid="editor-total-amount-display">
                {formatMoney(totals.grand, data.currency)}
              </span>
              <Button variant="outline" size="sm" data-testid="editor-duplicate-btn" onClick={() => void handleDuplicate()}>
                <Copy className="size-4" /> Duplicate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
