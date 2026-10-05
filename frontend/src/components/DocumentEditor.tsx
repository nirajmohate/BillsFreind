
import { Children, cloneElement, isValidElement, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Copy, FileJson, FilePlus2, Loader2, Printer, Save, Sparkles,
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
import { validateDoc } from "@/lib/validate";
import type { DocData, LocalDoc, Party, ToolPreset } from "@/lib/types";

const TAX_MODE_LABELS: Record<string, string> = { intra: "Within state (CGST + SGST)", inter: "Inter-state (IGST)", none: "No GST" };

function Field({ label, children, error }: { label: string; children: React.ReactNode; error?: string }) {
  const id = useId();
  const single = Children.count(children) === 1 && isValidElement<Record<string, unknown>>(children) ? children : null;
  const attachable = single && (typeof single.type !== "string" || single.type === "input" || single.type === "textarea");
  return (
    <div className="space-y-1.5">
      <Label htmlFor={attachable ? id : undefined} className="text-xs text-muted-foreground">{label}</Label>
      {attachable
        ? cloneElement(single, { id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-err` : undefined })
        : children}
      {error && <p id={`${id}-err`} role="alert" className="text-xs font-medium text-destructive">{error}</p>}
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

const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;

async function toLogoDataUrl(file: File, max = 360): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
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
  const signInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [uploading, setUploading] = useState<"" | "logo" | "signature">("");

  const totals = useMemo(() => computeTotals(data, preset), [data, preset]);

  const errors = useMemo(() => validateDoc(data, preset), [data, preset]);
  const err = (key: string) => (showErrors ? errors[key] : undefined);

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
    if (!putDoc(doc)) {
      toast.error("Couldn't save in this browser", {
        description: "Storage is full or blocked (private mode?). Use the JSON button to keep a copy.",
      });
      return;
    }
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
    if (!putDoc(doc)) {
      toast.error("Couldn't duplicate — browser storage is full or blocked.");
      return;
    }
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
    const found = validateDoc(data, preset);
    const keys = Object.keys(found);
    if (keys.length) {
      setShowErrors(true);
      toast.error(`Please fix ${keys.length} field${keys.length > 1 ? "s" : ""} before downloading`, { description: found[keys[0]] });
      setTimeout(() => document.querySelector<HTMLElement>('[aria-invalid="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" }), 60);
      return;
    }
    setPrinting(true);
    toast("Opening print dialog…", { description: "Choose “Save as PDF” as the destination to download." });
    setTimeout(() => {
      try {
        window.print();
      } finally {
        setPrinting(false);
      }
    }, 350);
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

  const checkImage = (file: File): boolean => {
    if (!file.type.startsWith("image/")) {
      toast.error("That file isn't an image", { description: "Please choose a PNG, JPG or WebP file." });
      return false;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      toast.error("Image is too large", { description: "Please choose an image under 3 MB." });
      return false;
    }
    return true;
  };

  const handleLogo = async (file: File | undefined) => {
    if (!file || !checkImage(file)) return;
    setUploading("logo");
    try {
      patchBusiness("logo", await toLogoDataUrl(file));
      toast.success("Logo added to your documents");
    } catch {
      toast.error("Couldn't read that image — try another file.");
    } finally {
      setUploading("");
      if (logoInputRef.current) logoInputRef.current.value = "";
    }
  };

  const handleSignature = async (file: File | undefined) => {
    if (!file || !checkImage(file)) return;
    setUploading("signature");
    try {
      patch({ signature: await toLogoDataUrl(file, 420) });
      toast.success("Signature added");
    } catch {
      toast.error("Couldn't read that image — try another file.");
    } finally {
      setUploading("");
      if (signInputRef.current) signInputRef.current.value = "";
    }
  };

  const showGst = preset.taxMode === "gst";

  return (
    <div>
      {/* Action bar */}
      <div className="no-print mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-border/80 bg-card p-3 shadow-sm">
        <Select value={preset.id} onValueChange={(v: string) => { if (v !== preset.id) navigate(`/${v}`); }}>
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
          <Button size="sm" data-testid="editor-print-pdf-btn" onClick={handlePrint} disabled={printing} aria-busy={printing}>
            {printing ? <Loader2 className="size-4 animate-spin" /> : <Printer className="size-4" />} {printing ? "Preparing…" : "Download PDF"}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Form column */}
        <div className="no-print space-y-5 lg:col-span-5 xl:col-span-5">
          <Section title="Document" testid="editor-section-document">
            <div className="grid grid-cols-2 gap-3">
              <Field label={preset.numberLabel} error={err("number")}>
                <Input value={data.number} onChange={(e) => patch({ number: e.target.value })} data-testid="editor-doc-number-input" />
              </Field>
              <Field label={preset.id === "quotation-estimate" ? "Date" : "Issue Date"} error={err("issueDate")}>
                <Input type="date" value={data.issueDate} onChange={(e) => patch({ issueDate: e.target.value })} data-testid="editor-issue-date-input" />
              </Field>
              {preset.id !== "rent-receipt" && (
                <Field label={preset.id === "quotation-estimate" ? "Valid Until" : "Due Date (optional)"} error={err("dueDate")}>
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
              <Field label={preset.amountLabel} error={err("amount")}>
                <Input
                  type="number" min={0} inputMode="decimal" value={data.singleAmount || ""}
                  onChange={(e) => patch({ singleAmount: Number(e.target.value) || 0 })}
                  data-testid="editor-single-amount-input"
                />
              </Field>
            )}
          </Section>

          <Section title={preset.fromLabel} testid="editor-section-business">
            <Field label="Business / Your Name" error={err("businessName")}>
              <Input value={data.business.name} onChange={(e) => patchBusiness("name", e.target.value)} placeholder="Sharma Traders" data-testid="editor-business-name-input" />
            </Field>
            <Field label="Address">
              <Textarea rows={2} value={data.business.address} onChange={(e) => patchBusiness("address", e.target.value)} data-testid="editor-business-address-input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" error={err("businessPhone")}><Input type="tel" inputMode="tel" value={data.business.phone} onChange={(e) => patchBusiness("phone", e.target.value)} data-testid="editor-business-phone-input" /></Field>
              <Field label="Email" error={err("businessEmail")}><Input type="email" value={data.business.email} onChange={(e) => patchBusiness("email", e.target.value)} data-testid="editor-business-email-input" /></Field>
              <Field label="GSTIN" error={err("businessGstin")}><Input maxLength={15} value={data.business.gstin} onChange={(e) => patchBusiness("gstin", e.target.value.toUpperCase())} placeholder="33ABCDE1234F1Z5" data-testid="editor-business-gstin-input" /></Field>
              <Field label="PAN" error={err("businessPan")}><Input maxLength={10} value={data.business.pan} onChange={(e) => patchBusiness("pan", e.target.value.toUpperCase())} data-testid="editor-business-pan-input" /></Field>
            </div>
            <Field label="Logo">
              <input
                ref={logoInputRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => void handleLogo(e.target.files?.[0])} data-testid="editor-logo-input"
              />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={uploading === "logo"} onClick={() => logoInputRef.current?.click()} data-testid="editor-logo-upload-btn">
                  {uploading === "logo" && <Loader2 className="size-4 animate-spin" />} {uploading === "logo" ? "Uploading…" : "Upload logo"}
                </Button>
                {data.business.logo && (
                  <Button variant="ghost" size="sm" onClick={() => patchBusiness("logo", "")} data-testid="editor-logo-remove-btn">Remove</Button>
                )}
                {data.business.logo && <img src={data.business.logo} alt="Logo preview" className="size-8 rounded border border-border object-contain" />}
              </div>
            </Field>
            <Field label="UPI ID (prints a pay-by-QR on Classic & Executive styles)" error={err("upiId")}>
              <Input value={data.business.upiId} onChange={(e) => patchBusiness("upiId", e.target.value)} placeholder="business@okicici" data-testid="editor-business-upi-input" />
            </Field>
          </Section>

          <Section title={preset.toLabel} testid="editor-section-client">
            <Field label="Name" error={err("clientName")}>
              <Input value={data.client.name} onChange={(e) => patchClient("name", e.target.value)} data-testid="editor-client-name-input" />
            </Field>
            <Field label="Address">
              <Textarea rows={2} value={data.client.address} onChange={(e) => patchClient("address", e.target.value)} data-testid="editor-client-address-input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Phone" error={err("clientPhone")}><Input type="tel" inputMode="tel" value={data.client.phone} onChange={(e) => patchClient("phone", e.target.value)} data-testid="editor-client-phone-input" /></Field>
              <Field label="Email" error={err("clientEmail")}><Input type="email" value={data.client.email} onChange={(e) => patchClient("email", e.target.value)} data-testid="editor-client-email-input" /></Field>
              {showGst && <Field label="Client GSTIN" error={err("clientGstin")}><Input maxLength={15} value={data.client.gstin} onChange={(e) => patchClient("gstin", e.target.value.toUpperCase())} data-testid="editor-client-gstin-input" /></Field>}
            </div>
          </Section>

          <Section title={preset.layout === "payslip" ? "Earnings & Deductions" : `${preset.itemLabel}s`} testid="editor-section-items">
            <div className="space-y-2">
              {showErrors && errors.items && <p role="alert" className="text-xs font-medium text-destructive">{errors.items}</p>}
              {data.items.map((it, idx) => {
                const amountOnly = preset.layout === "payslip";
                const payKind = it.kind ?? (it.rate < 0 ? "deduction" : "earning");
                return (
                <div key={it.id} className="grid grid-cols-[1fr_auto] gap-2 rounded-lg border border-border/70 p-2" data-testid={`editor-item-row-${idx}`}>
                  <div className="space-y-2">
                    {preset.itemKinds && (
                      <div className="flex gap-1.5" role="group" aria-label="Item type">
                        {preset.itemKinds.map((k) => (
                          <button
                            key={k.id} type="button"
                            aria-pressed={(it.kind ?? preset.itemKinds![0].id) === k.id}
                            onClick={() => patchItem(it.id, { kind: k.id })}
                            className={`rounded-md border px-2 py-0.5 text-[11px] font-medium transition-colors ${(it.kind ?? preset.itemKinds![0].id) === k.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}
                          >
                            {k.label}
                          </button>
                        ))}
                      </div>
                    )}
                    {amountOnly && (
                      <div className="flex gap-1.5" role="group" aria-label="Earning or deduction">
                        {(["earning", "deduction"] as const).map((k) => (
                          <button
                            key={k} type="button" aria-pressed={payKind === k}
                            onClick={() => patchItem(it.id, { kind: k, rate: k === "deduction" ? -Math.abs(it.rate) : Math.abs(it.rate), qty: 1 })}
                            className={`rounded-md border px-2 py-0.5 text-[11px] font-medium capitalize transition-colors ${payKind === k ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}
                          >
                            {k}
                          </button>
                        ))}
                      </div>
                    )}
                    <Input
                      placeholder={preset.itemLabel}
                      aria-label={`${preset.itemLabel} ${idx + 1}`}
                      aria-invalid={err(`item-${idx}-desc`) ? true : undefined}
                      value={it.desc}
                      onChange={(e) => patchItem(it.id, { desc: e.target.value })}
                      data-testid={`editor-item-desc-${idx}`}
                    />
                    {err(`item-${idx}-desc`) && <p role="alert" className="text-xs font-medium text-destructive">{err(`item-${idx}-desc`)}</p>}
                    {preset.showHsn && (
                      <Input placeholder={preset.hsnLabel ?? "HSN/SAC"} aria-label={preset.hsnLabel ?? "HSN/SAC code"} value={it.hsn} onChange={(e) => patchItem(it.id, { hsn: e.target.value })} data-testid={`editor-item-hsn-${idx}`} />
                    )}
                    {amountOnly ? (
                      <Input
                        type="number" min={0} inputMode="decimal" value={Math.abs(it.rate) || ""} placeholder="Amount"
                        aria-label="Amount"
                        onChange={(e) => { const v = Math.abs(Number(e.target.value) || 0); patchItem(it.id, { qty: 1, rate: payKind === "deduction" ? -v : v }); }}
                        data-testid={`editor-item-rate-${idx}`}
                      />
                    ) : (
                      <div className="grid grid-cols-3 gap-1.5">
                        <Input
                          type="number" min={0} inputMode="decimal" value={it.qty || ""} placeholder={preset.qtyLabel}
                          aria-label={preset.qtyLabel}
                          aria-invalid={err(`item-${idx}-qty`) ? true : undefined}
                          onChange={(e) => patchItem(it.id, { qty: Number(e.target.value) || 0 })}
                          data-testid={`editor-item-qty-${idx}`}
                        />
                        <Input
                          value={it.unit} placeholder="Unit" aria-label="Unit" maxLength={8}
                          onChange={(e) => patchItem(it.id, { unit: e.target.value.toUpperCase() })}
                          data-testid={`editor-item-unit-${idx}`}
                        />
                        <Input
                          type="number" min={0} inputMode="decimal" value={it.rate || ""} placeholder={preset.rateLabel}
                          aria-label={preset.rateLabel}
                          onChange={(e) => patchItem(it.id, { rate: Number(e.target.value) || 0 })}
                          data-testid={`editor-item-rate-${idx}`}
                        />
                      </div>
                    )}
                    {err(`item-${idx}-qty`) && <p role="alert" className="text-xs font-medium text-destructive">{err(`item-${idx}-qty`)}</p>}
                    <div className="flex items-center gap-2">
                      {showGst && data.taxMode !== "none" && !amountOnly && (
                        <Select value={String(it.gstRate)} onValueChange={(v: string) => patchItem(it.id, { gstRate: Number(v) })}>
                          <SelectTrigger size="sm" className="w-[130px]" aria-label="GST rate" data-testid={`editor-item-gst-${idx}`}>
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
                    variant="ghost" size="icon-xs" aria-label={`Remove item ${idx + 1}`}
                    onClick={() => { setData((d) => ({ ...d, items: d.items.filter((x) => x.id !== it.id) })); setDirty(true); }}
                    data-testid={`editor-item-remove-row-btn-${idx}`}
                  >
                    ✕
                  </Button>
                </div>
                );
              })}
              <div className="flex flex-wrap gap-2">
                {(preset.itemKinds
                  ? preset.itemKinds.map((k) => ({ label: `+ Add ${k.label.split(" / ")[0].toLowerCase()}`, kind: k.id }))
                  : preset.layout === "payslip"
                    ? [{ label: "+ Add earning", kind: "earning" }, { label: "+ Add deduction", kind: "deduction" }]
                    : [{ label: "+ Add line item", kind: undefined as string | undefined }]
                ).map((b, bi) => (
                  <Button
                    key={b.label} variant="outline" size="sm" className="min-w-[140px] flex-1"
                    data-testid={bi === 0 ? "editor-item-add-row-btn" : `editor-item-add-row-btn-${bi}`}
                    onClick={() => {
                      const row = preset.layout === "payslip" ? { ...newItem(preset), kind: b.kind } : newItem(preset, b.kind);
                      setData((d) => ({ ...d, items: [...d.items, row] }));
                      setDirty(true);
                    }}
                  >
                    {b.label}
                  </Button>
                ))}
              </div>
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
            <Field label="Bank / payment details (optional)"><Textarea rows={2} value={data.bank ?? ""} placeholder={"Bank name, A/c no., IFSC"} onChange={(e) => patch({ bank: e.target.value })} data-testid="editor-bank-input" /></Field>
            <Field label="Signatory Name"><Input value={data.signName} onChange={(e) => patch({ signName: e.target.value })} data-testid="editor-sign-input" /></Field>
            <Field label="Signature / stamp image (optional)">
              <input ref={signInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => void handleSignature(e.target.files?.[0])} data-testid="editor-signature-input" />
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled={uploading === "signature"} onClick={() => signInputRef.current?.click()} data-testid="editor-signature-upload-btn">
                  {uploading === "signature" && <Loader2 className="size-4 animate-spin" />} {uploading === "signature" ? "Uploading…" : "Upload signature"}
                </Button>
                {data.signature && <Button variant="ghost" size="sm" onClick={() => patch({ signature: "" })}>Remove</Button>}
                {data.signature && <img src={data.signature} alt="Signature preview" className="h-8 max-w-[96px] rounded border border-border bg-white object-contain" />}
              </div>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Template Style">
                <Select value={data.templateStyle} onValueChange={(v: string) => patch({ templateStyle: v as DocData["templateStyle"] })}>
                  <SelectTrigger data-testid="editor-template-style-switch">
                    <SelectValue>{(v: string) => (v === "classic" ? "Classic Boxed (real bill)" : v === "swiss" ? "Swiss Architectural" : "Corporate Executive")}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic Boxed (real bill)</SelectItem>
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
