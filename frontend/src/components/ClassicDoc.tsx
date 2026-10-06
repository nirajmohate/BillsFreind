// "Classic Boxed" bill renderer — the printed formats Indian businesses actually use:
// bordered header, ruled item grid that runs the full height of the sheet, totals box,
// amount in words, and customer / authorised signature lines. Each preset picks one of
// the layouts below via `preset.layout`.

import type { ReactNode } from "react";
import { amountToWords, formatDate, formatMoney } from "@/lib/format";
import type { DocData, DocItem, ToolPreset, Totals } from "@/lib/types";

const LINE = "border-slate-700";

type Col = { key: string; label: string; w: string; align: "left" | "right" | "center" };

const ALIGN = { left: "text-left", right: "text-right", center: "text-center" } as const;

// ------------------------------------------------------------------ helpers
const isVisible = (it: DocItem) => Boolean(it.desc.trim()) || (Number(it.rate) || 0) !== 0;
const lineAmount = (it: DocItem) => (Number(it.qty) || 0) * (Number(it.rate) || 0);

function qtyText(it: DocItem): string {
  const q = Number(it.qty) || 0;
  const n = Number.isInteger(q) ? String(q) : String(Number(q.toFixed(3)));
  return it.unit ? `${n} ${it.unit}` : n;
}

function extraPairs(data: DocData, preset: ToolPreset): Array<[string, string]> {
  return preset.extraFields
    .map((f): [string, string] => [f.label, f.type === "date" ? formatDate(data.extra[f.key] ?? "") : (data.extra[f.key] ?? "")])
    .filter(([, v]) => v);
}

function gstOn(data: DocData, preset: ToolPreset): boolean {
  return preset.taxMode === "gst" && data.taxMode !== "none";
}

function buildColumns(data: DocData, preset: ToolPreset, showRate: boolean): Col[] {
  const cols: Col[] = [
    { key: "sr", label: "Sr.", w: "34px", align: "center" },
    { key: "desc", label: preset.itemLabel, w: "minmax(0,1fr)", align: "left" },
  ];
  if (preset.showHsn) cols.push({ key: "hsn", label: preset.hsnLabel ?? "HSN/SAC", w: preset.hsnLabel ? "118px" : "66px", align: "center" });
  cols.push({ key: "qty", label: preset.qtyLabel, w: "70px", align: "center" });
  if (showRate) cols.push({ key: "rate", label: preset.rateLabel, w: "82px", align: "right" });
  if (gstOn(data, preset)) cols.push({ key: "gst", label: "GST %", w: "48px", align: "center" });
  if (showRate) cols.push({ key: "amt", label: "Amount", w: "96px", align: "right" });
  return cols;
}

function cellFor(col: Col, it: DocItem, idx: number, data: DocData): string {
  switch (col.key) {
    case "sr": return String(idx + 1);
    case "desc": return it.desc;
    case "hsn": return it.hsn;
    case "qty": return qtyText(it);
    case "rate": return formatMoney(Number(it.rate) || 0, data.currency);
    case "gst": return `${it.gstRate}%`;
    case "amt": return formatMoney(lineAmount(it), data.currency);
    default: return "";
  }
}

// ------------------------------------------------------------------ small blocks
function Placeholder({ text }: { text: string }) {
  return <span className="font-medium text-slate-300">{text}</span>;
}

function PartyCell({ label, party, accent, placeholder }: { label: string; party: DocData["business"]; accent: string; placeholder: string }) {
  return (
    <div className="min-w-0 p-3">
      <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: accent }}>{label}</p>
      <p className="mt-1 text-[13px] font-bold leading-tight text-slate-900">{party.name || <Placeholder text={placeholder} />}</p>
      {party.address && <p className="mt-0.5 whitespace-pre-line text-[10.5px] leading-snug text-slate-700">{party.address}</p>}
      {(party.phone || party.email) && (
        <p className="mt-0.5 text-[10.5px] text-slate-700">{party.phone}{party.phone && party.email ? " · " : ""}{party.email}</p>
      )}
      {party.gstin && <p className="mt-0.5 text-[10.5px] text-slate-800"><b>GSTIN:</b> <span className="tabular-nums">{party.gstin}</span></p>}
      {party.pan && <p className="text-[10.5px] text-slate-800"><b>PAN:</b> <span className="tabular-nums">{party.pan}</span></p>}
    </div>
  );
}

function KV({ pairs }: { pairs: Array<[string, string]> }) {
  if (!pairs.length) return null;
  return (
    <dl className="space-y-1 p-3">
      {pairs.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[96px_1fr] gap-2 text-[10.5px] leading-snug">
          <dt className="font-semibold uppercase tracking-wide text-slate-500">{k}</dt>
          <dd className="break-words font-medium text-slate-900">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function BusinessBlock({ data, centered = false }: { data: DocData; centered?: boolean }) {
  const b = data.business;
  return (
    <div className={`flex min-w-0 items-start gap-3 ${centered ? "justify-center text-center" : ""}`}>
      {b.logo && <img src={b.logo} alt={`${b.name || "Business"} logo`} className="size-14 shrink-0 object-contain" />}
      <div className="min-w-0">
        <p className="font-heading text-[21px] font-extrabold uppercase leading-tight tracking-tight" style={{ color: b.name ? data.accent : "#CBD5E1" }}>
          {b.name || "Your Business Name"}
        </p>
        {b.address && <p className="mt-0.5 whitespace-pre-line text-[10.5px] leading-snug text-slate-700">{b.address}</p>}
        {(b.phone || b.email) && <p className="mt-0.5 text-[10.5px] text-slate-700">{b.phone}{b.phone && b.email ? " · " : ""}{b.email}</p>}
        {(b.gstin || b.pan) && (
          <p className="mt-0.5 text-[10.5px] text-slate-800">
            {b.gstin && <span><b>GSTIN:</b> <span className="tabular-nums">{b.gstin}</span></span>}
            {b.gstin && b.pan ? "   " : ""}
            {b.pan && <span><b>PAN:</b> <span className="tabular-nums">{b.pan}</span></span>}
          </p>
        )}
      </div>
    </div>
  );
}

function MetaTable({ data, preset }: { data: DocData; preset: ToolPreset }) {
  const rows: Array<[string, string]> = [[preset.numberLabel.replace(/\s*No\.?$/i, "").toUpperCase() + " NO.", data.number], ["DATE", formatDate(data.issueDate)]];
  if (data.dueDate) rows.push([preset.id === "quotation-estimate" ? "VALID UNTIL" : "DUE DATE", formatDate(data.dueDate)]);
  return (
    <div>
      {rows.map(([k, v], i) => (
        <div key={k} className={`grid grid-cols-[auto_1fr] gap-3 px-3 py-1.5 text-[10.5px] ${i ? `border-t ${LINE}` : ""}`}>
          <span className="font-semibold uppercase tracking-wide text-slate-500">{k}</span>
          <span className="text-right font-bold tabular-nums text-slate-900">{v || "—"}</span>
        </div>
      ))}
    </div>
  );
}

/** Header with business on the left and a titled meta box on the right. */
function SplitHeader({ data, preset, tag }: { data: DocData; preset: ToolPreset; tag?: string }) {
  return (
    <div className={`grid grid-cols-[1fr_auto] border-b ${LINE}`}>
      <div className="p-3"><BusinessBlock data={data} /></div>
      <div className={`w-[215px] border-l ${LINE}`}>
        <div className={`border-b px-3 py-2 text-center ${LINE}`}>
          <p className="font-heading text-[21px] font-extrabold leading-none tracking-wide text-slate-900">{preset.docTitle}</p>
          {tag && <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500">{tag}</p>}
        </div>
        <MetaTable data={data} preset={preset} />
      </div>
    </div>
  );
}

/** Centered letterhead + ribbon title (cash memos, receipts, fuel slips). */
function CenteredHeader({ data, preset, withMeta = true }: { data: DocData; preset: ToolPreset; withMeta?: boolean }) {
  return (
    <div className={`border-b ${LINE}`}>
      <div className="px-4 py-3"><BusinessBlock data={data} centered /></div>
      <div className={`border-t py-1.5 text-center text-[12px] font-extrabold uppercase tracking-[0.3em] text-white ${LINE}`} style={{ backgroundColor: data.accent }}>
        {preset.docTitle}
      </div>
      {withMeta && (
        <div className={`flex items-center justify-between gap-4 border-t px-4 py-1.5 text-[11px] ${LINE}`}>
          <span><b className="text-slate-500">{preset.numberLabel.toUpperCase()}</b>&nbsp; <b className="tabular-nums">{data.number || "—"}</b></span>
          <span><b className="text-slate-500">DATE</b>&nbsp; <b className="tabular-nums">{formatDate(data.issueDate) || "—"}</b></span>
        </div>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ item grid
function groupsOf(data: DocData, preset: ToolPreset): Array<{ label: string | null; rows: DocItem[] }> {
  const visible = data.items.filter(isVisible);
  if (!preset.itemKinds) return [{ label: null, rows: visible }];
  const first = preset.itemKinds[0].id;
  return preset.itemKinds
    .map((k) => ({ label: k.label, rows: visible.filter((i) => (i.kind ?? first) === k.id) }))
    .filter((g) => g.rows.length > 0);
}

function ItemGrid({ data, preset, showRate = true, minBodyPx = 180 }: { data: DocData; preset: ToolPreset; showRate?: boolean; minBodyPx?: number }) {
  const cols = buildColumns(data, preset, showRate);
  const tpl = cols.map((c) => c.w).join(" ");
  const groups = groupsOf(data, preset);
  let n = 0;

  return (
    <div className="flex flex-1 flex-col">
      <div className="grid text-white" style={{ gridTemplateColumns: tpl, backgroundColor: data.accent }}>
        {cols.map((c, i) => (
          <div key={c.key} className={`px-2 py-1.5 text-[9.5px] font-bold uppercase tracking-wider ${ALIGN[c.align]} ${i < cols.length - 1 ? "border-r border-white/35" : ""}`}>
            {c.label}
          </div>
        ))}
      </div>

      <div className="relative flex-1" style={{ minHeight: minBodyPx }}>
        {/* full-height column rules */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid" style={{ gridTemplateColumns: tpl }}>
          {cols.map((c, i) => <div key={c.key} className={i < cols.length - 1 ? `border-r ${LINE}` : ""} />)}
        </div>

        <div className="relative">
          {groups.map((g, gi) => (
            <div key={g.label ?? gi}>
              {g.label && (
                <div className={`border-b border-slate-300 bg-slate-100 px-2 py-1 text-[9.5px] font-bold uppercase tracking-wider text-slate-700 ${gi ? `border-t ${LINE}` : ""}`}>
                  {g.label}
                </div>
              )}
              {g.rows.map((it) => {
                const idx = n++;
                return (
                  <div key={it.id} className="grid" style={{ gridTemplateColumns: tpl }}>
                    {cols.map((c) => (
                      <div
                        key={c.key}
                        className={`break-words px-2 py-1.5 text-[11px] leading-snug text-slate-900 ${ALIGN[c.align]} ${["rate", "amt", "qty", "gst"].includes(c.key) ? "tabular-nums" : ""} ${c.key === "amt" ? "font-semibold" : ""}`}
                      >
                        {cellFor(c, it, idx, data)}
                      </div>
                    ))}
                  </div>
                );
              })}
              {g.label && showRate && (
                <div className={`flex justify-between border-t border-slate-300 bg-slate-50 px-2 py-1 text-[10.5px] font-semibold text-slate-700`}>
                  <span>Total — {g.label}</span>
                  <span className="tabular-nums">{formatMoney(g.rows.reduce((s, i) => s + lineAmount(i), 0), data.currency)}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ totals / footer
function TotalsPanel({ data, preset, totals }: { data: DocData; preset: ToolPreset; totals: Totals }) {
  const rows: Array<[string, string]> = [["Sub Total", formatMoney(totals.subtotal, data.currency)]];
  if (totals.discountAmt > 0) rows.push([`Discount (${data.discountPct}%)`, `− ${formatMoney(totals.discountAmt, data.currency)}`]);
  if (gstOn(data, preset)) {
    if (data.taxMode === "intra") {
      rows.push(["CGST", formatMoney(totals.cgst, data.currency)], ["SGST", formatMoney(totals.sgst, data.currency)]);
    } else {
      rows.push(["IGST", formatMoney(totals.igst, data.currency)]);
    }
  }
  if (totals.roundOff !== 0) rows.push(["Round off", formatMoney(totals.roundOff, data.currency)]);
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1">
        {rows.map(([k, v], i) => (
          <div key={k} className={`flex justify-between px-3 py-1.5 text-[11px] ${i ? "border-t border-slate-200" : ""}`}>
            <span className="text-slate-700">{k}</span>
            <span className="font-semibold tabular-nums text-slate-900">{v}</span>
          </div>
        ))}
      </div>
      <div className={`flex items-center justify-between border-t px-3 py-2 text-white ${LINE}`} style={{ backgroundColor: data.accent }}>
        <span className="text-[10.5px] font-extrabold uppercase tracking-[0.14em]">{preset.id === "salary-slip" ? "Net Payable" : "Grand Total"}</span>
        <span className="text-[15px] font-extrabold tabular-nums" data-testid="doc-total-display">{formatMoney(totals.grand, data.currency)}</span>
      </div>
    </div>
  );
}

function TermsList({ data }: { data: DocData }) {
  const lines = data.terms.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length && !data.notes) return null;
  return (
    <div className="text-[10px] leading-snug text-slate-700">
      {data.notes && <p className="mb-1"><b>Note:</b> {data.notes}</p>}
      {lines.length > 1 ? (
        <ol className="list-decimal space-y-0.5 pl-4">{lines.map((l, i) => <li key={i}>{l}</li>)}</ol>
      ) : lines.length === 1 ? (
        <p><b>Terms:</b> {lines[0]}</p>
      ) : null}
    </div>
  );
}

function FooterBlock({ data, preset, totals, qrSrc, showTotals = true }: { data: DocData; preset: ToolPreset; totals: Totals; qrSrc: string; showTotals?: boolean }) {
  return (
    <div className={`grid border-t ${LINE} ${showTotals ? "grid-cols-[1.2fr_1fr]" : "grid-cols-1"}`}>
      <div className={`space-y-2.5 p-3 ${showTotals ? `border-r ${LINE}` : ""}`}>
        {showTotals && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Amount in words</p>
            <p className="mt-0.5 text-[11px] font-bold leading-snug text-slate-900">{amountToWords(totals.grand, data.currency)}</p>
            <p className="text-[8px] text-slate-400">E. &amp; O.E.</p>
          </div>
        )}
        {data.bank && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Bank / payment details</p>
            <p className="mt-0.5 whitespace-pre-line text-[10.5px] leading-snug text-slate-800">{data.bank}</p>
          </div>
        )}
        {data.business.upiId && (
          <div className="flex items-center gap-3">
            {qrSrc && <img src={qrSrc} alt="UPI payment QR code" className="size-[68px] border border-slate-300 p-0.5" />}
            <p className="text-[10.5px] text-slate-800"><b>Pay via UPI:</b><br /><span className="tabular-nums">{data.business.upiId}</span>{qrSrc && <><br /><span className="text-[9px] text-slate-500">Scan to pay</span></>}</p>
          </div>
        )}
        <TermsList data={data} />
      </div>
      {showTotals && <TotalsPanel data={data} preset={preset} totals={totals} />}
    </div>
  );
}

function SignatureRow({ data, left, right = "Authorised Signatory" }: { data: DocData; left: string; right?: string }) {
  return (
    <div className={`grid grid-cols-2 border-t ${LINE}`}>
      <div className={`flex flex-col justify-end border-r p-3 ${LINE}`} style={{ minHeight: 92 }}>
        <p className="border-t border-slate-400 pt-1 text-[10px] font-medium text-slate-700">{left}</p>
      </div>
      <div className="flex flex-col items-end justify-between p-3 text-right" style={{ minHeight: 92 }}>
        <p className="text-[10.5px] text-slate-800">For <b className="uppercase" style={{ color: data.accent }}>{data.business.name || "Your Business Name"}</b></p>
        <div className="flex w-full flex-col items-end">
          {data.signature ? <img src={data.signature} alt="Authorised signature" className="mb-1 h-10 max-w-[160px] object-contain" /> : <div className="h-10" />}
          <p className="w-[250px] border-t border-slate-400 pt-1 text-[10px] font-medium text-slate-700">
            {right}{data.signName ? ` — ${data.signName}` : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ GST HSN summary
function HsnSummary({ data, preset }: { data: DocData; preset: ToolPreset }) {
  if (!(gstOn(data, preset) && preset.showHsn && preset.layout === "invoice")) return null;
  const disc = Math.min(Math.max(Number(data.discountPct) || 0, 0), 100) / 100;
  const map = new Map<string, { hsn: string; rate: number; taxable: number }>();
  for (const it of data.items.filter(isVisible)) {
    const key = `${it.hsn || "-"}|${it.gstRate}`;
    const cur = map.get(key) ?? { hsn: it.hsn || "—", rate: Number(it.gstRate) || 0, taxable: 0 };
    cur.taxable += lineAmount(it) * (1 - disc);
    map.set(key, cur);
  }
  const rows = [...map.values()];
  if (!rows.length) return null;
  const intra = data.taxMode === "intra";
  const m = (v: number) => formatMoney(v, data.currency);
  const th = "px-2 py-1 text-[8.5px] font-bold uppercase tracking-wider text-slate-600";
  const td = "px-2 py-1 text-[10px] tabular-nums";
  const totTaxable = rows.reduce((s, r) => s + r.taxable, 0);
  const totTax = rows.reduce((s, r) => s + (r.taxable * r.rate) / 100, 0);
  return (
    <div className={`border-t ${LINE}`}>
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr className={`border-b ${LINE}`}>
            <th className={`${th} text-left`}>HSN/SAC</th>
            <th className={`${th} text-right`}>Taxable value</th>
            {intra ? <><th className={`${th} text-center`}>CGST %</th><th className={`${th} text-right`}>CGST amt</th><th className={`${th} text-center`}>SGST %</th><th className={`${th} text-right`}>SGST amt</th></>
              : <><th className={`${th} text-center`}>IGST %</th><th className={`${th} text-right`}>IGST amt</th></>}
            <th className={`${th} text-right`}>Total tax</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const tax = (r.taxable * r.rate) / 100;
            return (
              <tr key={`${r.hsn}${r.rate}`} className="border-b border-slate-200">
                <td className={td}>{r.hsn}</td>
                <td className={`${td} text-right`}>{m(r.taxable)}</td>
                {intra ? <><td className={`${td} text-center`}>{r.rate / 2}%</td><td className={`${td} text-right`}>{m(tax / 2)}</td><td className={`${td} text-center`}>{r.rate / 2}%</td><td className={`${td} text-right`}>{m(tax / 2)}</td></>
                  : <><td className={`${td} text-center`}>{r.rate}%</td><td className={`${td} text-right`}>{m(tax)}</td></>}
                <td className={`${td} text-right font-semibold`}>{m(tax)}</td>
              </tr>
            );
          })}
          <tr className="bg-slate-50 font-bold">
            <td className={td}>Total</td>
            <td className={`${td} text-right`}>{m(totTaxable)}</td>
            <td colSpan={intra ? 4 : 2} />
            <td className={`${td} text-right`}>{m(totTax)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ------------------------------------------------------------------ sheet shells
function Sheet({ children, fill = true }: { children: ReactNode; fill?: boolean }) {
  return (
    <div className="p-[8mm] font-sans text-[12px] leading-normal text-slate-900">
      <div className={`flex flex-col border-[1.5px] ${LINE} bg-white ${fill ? "min-h-[calc(297mm-16mm)]" : ""}`}>{children}</div>
    </div>
  );
}

// ------------------------------------------------------------------ layouts
function InvoiceLayout({ data, preset, totals, qrSrc }: Props) {
  const extras = extraPairs(data, preset);
  const isGst = gstOn(data, preset) && preset.id === "gst-invoice";
  return (
    <Sheet>
      <SplitHeader data={data} preset={preset} tag={isGst ? "Original for recipient" : undefined} />
      <div className={`grid border-b ${LINE} ${extras.length ? "grid-cols-2 divide-x divide-slate-700" : "grid-cols-1"}`}>
        <PartyCell label={preset.toLabel} party={data.client} accent={data.accent} placeholder="Customer name" />
        <KV pairs={extras} />
      </div>
      <ItemGrid data={data} preset={preset} />
      <HsnSummary data={data} preset={preset} />
      <FooterBlock data={data} preset={preset} totals={totals} qrSrc={qrSrc} />
      <SignatureRow data={data} left="Customer Signature" />
    </Sheet>
  );
}

function ServiceLayout({ data, preset, totals, qrSrc }: Props) {
  const extras = extraPairs(data, preset);
  return (
    <Sheet>
      <SplitHeader data={data} preset={preset} />
      <div className={`grid grid-cols-2 divide-x divide-slate-700 border-b ${LINE}`}>
        <PartyCell label={preset.toLabel} party={data.client} accent={data.accent} placeholder="Customer name" />
        <div>
          <p className="px-3 pt-3 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: data.accent }}>Job details</p>
          <KV pairs={extras} />
        </div>
      </div>
      <ItemGrid data={data} preset={preset} />
      <FooterBlock data={data} preset={preset} totals={totals} qrSrc={qrSrc} />
      <SignatureRow data={data} left="Customer Signature" />
    </Sheet>
  );
}

function CashMemoLayout({ data, preset, totals, qrSrc }: Props) {
  const extras = extraPairs(data, preset);
  return (
    <Sheet>
      <CenteredHeader data={data} preset={preset} />
      <div className={`grid border-b ${LINE} ${extras.length ? "grid-cols-[1.2fr_1fr] divide-x divide-slate-700" : "grid-cols-1"}`}>
        <PartyCell label={preset.toLabel} party={data.client} accent={data.accent} placeholder="Customer name" />
        <KV pairs={extras} />
      </div>
      <ItemGrid data={data} preset={preset} />
      <FooterBlock data={data} preset={preset} totals={totals} qrSrc={qrSrc} />
      <SignatureRow data={data} left="Customer Signature" />
    </Sheet>
  );
}

function ChallanLayout({ data, preset, totals }: Props) {
  const extras = extraPairs(data, preset);
  const rows = data.items.filter(isVisible);
  const showRate = rows.some((i) => (Number(i.rate) || 0) > 0);
  const totalQty = rows.reduce((s, i) => s + (Number(i.qty) || 0), 0);
  return (
    <Sheet>
      <SplitHeader data={data} preset={preset} tag="Not a tax invoice" />
      <div className={`grid grid-cols-2 divide-x divide-slate-700 border-b ${LINE}`}>
        <PartyCell label={preset.toLabel} party={data.client} accent={data.accent} placeholder="Consignee name" />
        <div>
          <p className="px-3 pt-3 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: data.accent }}>Dispatch details</p>
          <KV pairs={extras} />
        </div>
      </div>
      <ItemGrid data={data} preset={preset} showRate={showRate} />
      <div className={`flex items-center justify-between border-t px-3 py-2 text-[11px] font-bold ${LINE}`}>
        <span>Total quantity: <span className="tabular-nums">{Number.isInteger(totalQty) ? totalQty : totalQty.toFixed(2)}</span></span>
        {showRate && <span>Total value: <span className="tabular-nums">{formatMoney(totals.grand, data.currency)}</span></span>}
      </div>
      <div className={`border-t px-3 py-2 ${LINE}`}>
        <TermsList data={data} />
        <p className="mt-1 text-[10px] text-slate-700">Received the above goods in good order and condition.</p>
      </div>
      <div className={`grid grid-cols-2 border-t ${LINE}`}>
        <div className={`flex flex-col justify-between border-r p-3 ${LINE}`} style={{ minHeight: 110 }}>
          <div className="h-14 w-40 border border-dashed border-slate-400" aria-hidden="true" />
          <p className="border-t border-slate-400 pt-1 text-[10px] font-medium text-slate-700">Receiver's signature &amp; stamp</p>
        </div>
        <div className="flex flex-col items-end justify-between p-3 text-right" style={{ minHeight: 110 }}>
          <p className="text-[10.5px]">For <b className="uppercase" style={{ color: data.accent }}>{data.business.name || "Your Business Name"}</b></p>
          <div className="flex w-full flex-col items-end">
            {data.signature ? <img src={data.signature} alt="Authorised signature" className="mb-1 h-10 max-w-[160px] object-contain" /> : <div className="h-10" />}
            <p className="w-[190px] border-t border-slate-400 pt-1 text-[10px] font-medium text-slate-700">Authorised Signatory{data.signName ? ` — ${data.signName}` : ""}</p>
          </div>
        </div>
      </div>
    </Sheet>
  );
}

function PayslipLayout({ data, preset, totals }: Props) {
  const vis = data.items.filter(isVisible);
  const earn = vis.filter((i) => (Number(i.rate) || 0) >= 0);
  const ded = vis.filter((i) => (Number(i.rate) || 0) < 0);
  const gross = earn.reduce((s, i) => s + lineAmount(i), 0);
  const dedTotal = Math.abs(ded.reduce((s, i) => s + lineAmount(i), 0));
  const n = Math.max(earn.length, ded.length, 8);
  const m = (v: number) => formatMoney(v, data.currency);
  const x = data.extra;
  const info: Array<[string, string]> = [
    ["Employee name", data.client.name],
    ["Employee ID", x.employeeId ?? ""],
    ["Designation", x.designation ?? ""],
    ["Pay period", x.payPeriod ?? ""],
    ["Working days", x.workingDays ?? ""],
    ["PAN", data.client.pan],
  ];
  return (
    <Sheet fill={false}>
      <SplitHeader data={data} preset={{ ...preset, docTitle: "PAYSLIP" }} />
      <div className={`border-b py-1.5 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white ${LINE}`} style={{ backgroundColor: data.accent }}>
        Payslip for the month of {x.payPeriod || "—"}
      </div>
      <div className={`grid grid-cols-2 border-b ${LINE}`}>
        {info.map(([k, v], i) => (
          <div key={k} className={`grid grid-cols-[110px_1fr] gap-2 px-3 py-1.5 text-[10.5px] ${i % 2 === 0 ? `border-r ${LINE}` : ""} ${i >= 2 ? `border-t border-slate-300` : ""}`}>
            <span className="font-semibold uppercase tracking-wide text-slate-500">{k}</span>
            <span className="font-bold text-slate-900">{v || <Placeholder text="—" />}</span>
          </div>
        ))}
      </div>
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className={`border-b text-[9.5px] uppercase tracking-wider text-slate-800 ${LINE}`} style={{ backgroundColor: `${data.accent}18` }}>
            <th className={`border-r px-3 py-1.5 text-left ${LINE}`}>Earnings</th>
            <th className={`w-[110px] border-r px-3 py-1.5 text-right ${LINE}`}>Amount</th>
            <th className={`border-r px-3 py-1.5 text-left ${LINE}`}>Deductions</th>
            <th className="w-[110px] px-3 py-1.5 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: n }).map((_, i) => (
            <tr key={i} className="h-[26px] text-[11px]">
              <td className={`border-r px-3 ${LINE}`}>{earn[i]?.desc}</td>
              <td className={`border-r px-3 text-right tabular-nums ${LINE}`}>{earn[i] ? m(lineAmount(earn[i])) : ""}</td>
              <td className={`border-r px-3 ${LINE}`}>{ded[i]?.desc.replace(/\s*\(−\)\s*$/, "")}</td>
              <td className="px-3 text-right tabular-nums">{ded[i] ? m(Math.abs(lineAmount(ded[i]))) : ""}</td>
            </tr>
          ))}
          <tr className={`border-t bg-slate-50 text-[11px] font-bold ${LINE}`}>
            <td className={`border-r px-3 py-1.5 ${LINE}`}>Gross earnings</td>
            <td className={`border-r px-3 py-1.5 text-right tabular-nums ${LINE}`}>{m(gross)}</td>
            <td className={`border-r px-3 py-1.5 ${LINE}`}>Total deductions</td>
            <td className="px-3 py-1.5 text-right tabular-nums">{m(dedTotal)}</td>
          </tr>
        </tbody>
      </table>
      <div className={`flex items-center justify-between border-t px-3 py-2 text-white ${LINE}`} style={{ backgroundColor: data.accent }}>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.15em]">Net pay (gross − deductions)</span>
        <span className="text-[16px] font-extrabold tabular-nums" data-testid="doc-total-display">{m(totals.grand)}</span>
      </div>
      <div className={`border-t px-3 py-2 ${LINE}`}>
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Net pay in words</p>
        <p className="mt-0.5 text-[11px] font-bold">{amountToWords(totals.grand, data.currency)}</p>
        {data.bank && <p className="mt-1.5 whitespace-pre-line text-[10.5px] text-slate-800"><b>Bank details:</b> {data.bank}</p>}
        <div className="mt-1.5"><TermsList data={data} /></div>
      </div>
      <SignatureRow data={data} left="Employee Signature" right="Employer / Authorised Signatory" />
    </Sheet>
  );
}

// ---- voucher-style receipts ------------------------------------------------
function V({ children }: { children: ReactNode }) {
  const empty = children === undefined || children === null || children === "";
  return empty
    ? <span className="inline-block min-w-[90px] border-b border-dotted border-slate-500">&nbsp;</span>
    : <b className="border-b border-dotted border-slate-500 px-0.5">{children}</b>;
}

function receiptSentence(data: DocData, preset: ToolPreset, totals: Totals): ReactNode {
  const x = data.extra;
  const amt = formatMoney(totals.grand, data.currency);
  const words = amountToWords(totals.grand, data.currency);
  switch (preset.id) {
    case "rent-receipt":
      return (
        <>Received a sum of <V>{amt}</V> (<V>{words}</V>) from <V>{data.client.name}</V> towards the rent of the property situated at <V>{x.propertyAddress}</V> for the period <V>{x.rentPeriod}</V>, paid by <V>{x.paymentMode}</V>.</>
      );
    case "driver-salary":
      return (
        <>Received a sum of <V>{amt}</V> (<V>{words}</V>) from <V>{data.business.name}</V> as salary for driving the vehicle bearing registration No. <V>{x.vehicleNumber}</V> for the period <V>{x.salaryPeriod}</V>. My driving licence No. is <V>{x.licenseNumber}</V>.</>
      );
    default:
      return (
        <>Received with thanks from <V>{data.client.name}</V>{data.client.address ? <> of <V>{data.client.address.replace(/,?\s*\n\s*/g, ", ")}</V></> : null} a sum of <V>{amt}</V> (<V>{words}</V>) by <V>{x.paymentMode}</V>{x.transactionRef ? <> (Ref. <V>{x.transactionRef}</V>)</> : null}, being payment towards <V>{x.purpose}</V>.</>
      );
  }
}

function ReceiptLayout({ data, preset, totals }: Props) {
  const x = data.extra;
  const needsStamp = (x.paymentMode ?? "").toLowerCase().includes("cash") && totals.grand > 5000;
  // For rent / driver receipts the person who *receives* the money is the "From" party.
  const receiverName = preset.id === "driver-salary" ? data.client.name : data.business.name;
  const receiverPan = preset.id === "driver-salary" ? data.client.pan : data.business.pan;
  const balance = Number(x.balanceDue) || 0;
  return (
    <Sheet fill={false}>
      <CenteredHeader data={data} preset={preset} />
      <div className="px-6 py-6 text-[13px] leading-[2.1] text-slate-900">
        {receiptSentence(data, preset, totals)}
        {preset.id === "driver-salary" && (
          <p className="mt-3 text-[11px] leading-snug text-slate-700">
            I declare that I am employed as a driver by the above person and that the amount stated was received by me for the purpose mentioned.
          </p>
        )}
        {preset.id === "rent-receipt" && data.business.pan && (
          <p className="mt-2 text-[11px] leading-snug text-slate-700">Landlord's PAN: <b className="tabular-nums">{data.business.pan}</b></p>
        )}
        {preset.id === "payment-receipt" && balance > 0 && (
          <p className="mt-2 text-[12px] leading-snug text-slate-800">Balance due: <b className="tabular-nums">{formatMoney(balance, data.currency)}</b></p>
        )}
        {data.notes && <p className="mt-3 text-[11px] leading-snug text-slate-700"><b>Note:</b> {data.notes}</p>}
      </div>
      <div className={`grid grid-cols-[auto_1fr_auto] items-end gap-6 border-t px-6 py-5 ${LINE}`}>
        <div className="space-y-2">
          <div className={`inline-flex items-center border-2 px-4 py-2 ${LINE}`}>
            <span className="text-[18px] font-extrabold tabular-nums" style={{ color: data.accent }}>{formatMoney(totals.grand, data.currency)}/-</span>
          </div>
          {needsStamp && (
            <div className="flex h-14 w-24 items-center justify-center border border-dashed border-slate-400 text-center text-[8px] font-semibold uppercase tracking-wider text-slate-400">
              Affix revenue stamp
            </div>
          )}
        </div>
        <div />
        <div className="flex flex-col items-end text-right">
          {data.signature ? <img src={data.signature} alt="Receiver's signature" className="mb-1 h-10 max-w-[160px] object-contain" /> : <div className="h-12" />}
          <p className="w-[210px] border-t border-slate-400 pt-1 text-[10px] font-medium text-slate-700">
            Signature of receiver{receiverName ? ` — ${receiverName}` : ""}
          </p>
          {receiverPan && preset.id !== "rent-receipt" && <p className="text-[9px] text-slate-500">PAN {receiverPan}</p>}
        </div>
      </div>
    </Sheet>
  );
}

function VoucherLayout({ data, preset, totals }: Props) {
  const x = data.extra;
  const payeeDetails = [
    data.client.gstin ? `GST No. ${data.client.gstin}` : "",
    data.client.pan ? `PAN No. ${data.client.pan}` : "",
  ].filter(Boolean).join("  ·  ");
  return (
    <Sheet fill={false}>
      <div className={`grid grid-cols-[1fr_225px] border-b ${LINE}`}>
        <div className="p-4"><BusinessBlock data={data} /></div>
        <div className={`border-l ${LINE}`}>
          <div className={`border-b px-3 py-3 text-center ${LINE}`}>
            <p className="font-heading text-[23px] font-extrabold tracking-wide" style={{ color: data.accent }}>{preset.docTitle}</p>
          </div>
          <MetaTable data={data} preset={preset} />
        </div>
      </div>
      <div className={`grid grid-cols-[112px_1fr] border-b text-[11px] ${LINE}`}>
        <div className={`border-r px-3 py-2 font-bold uppercase tracking-wide text-slate-500 ${LINE}`}>Pay to</div>
        <div className="px-3 py-2 font-bold text-slate-900">{data.client.name || <Placeholder text="Receiver / payee name" />}</div>
        <div className={`border-r border-t px-3 py-2 font-bold uppercase tracking-wide text-slate-500 ${LINE}`}>Address</div>
        <div className={`border-t px-3 py-2 whitespace-pre-line text-slate-800 ${LINE}`}>{data.client.address || <Placeholder text="Receiver address" />}</div>
        <div className={`border-r border-t px-3 py-2 font-bold uppercase tracking-wide text-slate-500 ${LINE}`}>Tax details</div>
        <div className={`border-t px-3 py-2 font-mono text-[10.5px] text-slate-800 ${LINE}`}>{payeeDetails || <Placeholder text="GST No. / PAN No." />}</div>
      </div>
      <div className={`grid min-h-[210px] grid-cols-[112px_1fr] border-b text-[12px] ${LINE}`}>
        <div className={`border-r px-3 py-4 font-bold uppercase tracking-wide text-slate-500 ${LINE}`}>Particulars</div>
        <div className="px-4 py-4 leading-relaxed text-slate-900">{x.particulars || <Placeholder text="Being cash paid for…" />}</div>
      </div>
      <div className={`grid grid-cols-2 border-b ${LINE}`}>
        <div className={`border-r p-4 ${LINE}`}>
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Amount in words</p>
          <p className="mt-1 text-[12px] font-bold leading-snug text-slate-900">{amountToWords(totals.grand, data.currency)}</p>
          <dl className="mt-4 space-y-1.5 text-[10.5px]">
            {[["Payment mode", x.paymentMode], ["Cash / Cheque No.", x.chequeNumber], ["Account of", x.accountOf]].filter(([, v]) => v).map(([k, v]) => (
              <div key={k} className="grid grid-cols-[110px_1fr] gap-2"><dt className="font-semibold text-slate-500">{k}</dt><dd className="font-medium text-slate-900">{v}</dd></div>
            ))}
          </dl>
        </div>
        <div className="flex items-center justify-between gap-3 p-4" style={{ backgroundColor: `${data.accent}12` }}>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: data.accent }}>Total</span>
          <span className="border-2 px-4 py-2 text-[20px] font-extrabold tabular-nums" style={{ borderColor: data.accent, color: data.accent }} data-testid="doc-total-display">{formatMoney(totals.grand, data.currency)}/-</span>
        </div>
      </div>
      <div className={`grid grid-cols-3 divide-x divide-slate-700 ${LINE}`}>
        {["Prepared by", "Approved by", "Receiver's signature"].map((label, index) => (
          <div key={label} className="flex min-h-[105px] flex-col justify-end p-3">
            {index === 2 && data.signature ? <img src={data.signature} alt="Receiver signature" className="mb-1 h-10 max-w-[150px] object-contain" /> : <div className="h-10" />}
            <p className="border-t border-slate-400 pt-1 text-center text-[10px] font-medium text-slate-700">{label}</p>
          </div>
        ))}
      </div>
    </Sheet>
  );
}

// ---- fuel station slip -----------------------------------------------------
function FuelLayout({ data, preset, totals }: Props) {
  const x = data.extra;
  const rows = data.items.filter(isVisible);
  const m = (v: number) => formatMoney(v, data.currency);
  const meta: Array<[string, string]> = [
    ["Bill no.", data.number], ["Date", formatDate(data.issueDate)], ["Vehicle no.", x.vehicleNumber ?? ""],
    ["Nozzle", x.nozzleNumber ?? ""], ["Odometer", x.odometer ? `${x.odometer} km` : ""], ["Outlet", x.pumpName ?? ""],
    ["Customer", data.client.name],
  ];
  return (
    <div className="p-[10mm] font-mono text-[11.5px] leading-snug text-slate-900">
      <div className="mx-auto w-[360px] border border-dashed border-slate-500 bg-white px-4 py-4">
        <div className="text-center">
          {data.business.logo && <img src={data.business.logo} alt={`${data.business.name || "Fuel station"} logo`} className="mx-auto mb-1 h-10 object-contain" />}
          <p className="font-heading text-[16px] font-extrabold uppercase tracking-tight" style={{ color: data.business.name ? data.accent : "#CBD5E1" }}>
            {data.business.name || "Fuel Station Name"}
          </p>
          {data.business.address && <p className="whitespace-pre-line text-[10px]">{data.business.address}</p>}
          {data.business.phone && <p className="text-[10px]">Ph: {data.business.phone}</p>}
          {data.business.gstin && <p className="text-[10px]">GSTIN: {data.business.gstin}</p>}
          <p className="mt-2 border-y border-dashed border-slate-500 py-1 text-[11px] font-bold tracking-[0.25em]">{preset.docTitle}</p>
        </div>
        <dl className="mt-2 space-y-0.5">
          {meta.filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3"><dt className="uppercase text-slate-500">{k}</dt><dd className="text-right font-bold">{v}</dd></div>
          ))}
        </dl>
        <div className="mt-2 border-t border-dashed border-slate-500 pt-1">
          <div className="grid grid-cols-[1fr_62px_62px_80px] gap-1 text-[9.5px] font-bold uppercase text-slate-500">
            <span>Product</span><span className="text-right">Rate</span><span className="text-right">Litres</span><span className="text-right">Amount</span>
          </div>
          {rows.map((it) => (
            <div key={it.id} className="grid grid-cols-[1fr_62px_62px_80px] gap-1 py-0.5">
              <span className="break-words">{it.desc}</span>
              <span className="text-right tabular-nums">{Number(it.rate).toFixed(2)}</span>
              <span className="text-right tabular-nums">{Number(it.qty)}</span>
              <span className="text-right font-bold tabular-nums">{Number(lineAmount(it)).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-1 flex items-center justify-between border-y border-dashed border-slate-500 py-1.5 text-[14px] font-extrabold">
          <span>TOTAL</span><span className="tabular-nums" data-testid="doc-total-display">{m(totals.grand)}</span>
        </div>
        <p className="mt-1 text-[9.5px] font-bold">{amountToWords(totals.grand, data.currency)}</p>
        {(data.notes || data.terms) && <p className="mt-1.5 text-[9.5px] text-slate-600">{data.notes}{data.notes && data.terms ? " " : ""}{data.terms}</p>}
        <div className="mt-6 flex items-end justify-between text-[9.5px] text-slate-600">
          <span className="border-t border-slate-500 pt-0.5">Customer sign</span>
          <span className="text-right">{data.signature && <img src={data.signature} alt="Authorised signature" className="mb-0.5 ml-auto h-8 object-contain" />}<span className="border-t border-slate-500 pt-0.5">Authorised sign</span></span>
        </div>
        <p className="mt-3 text-center text-[10px] font-bold tracking-wider">*** THANK YOU · VISIT AGAIN ***</p>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ entry
type Props = { data: DocData; preset: ToolPreset; totals: Totals; qrSrc: string };

export function ClassicDoc(props: Props) {
  switch (props.preset.layout) {
    case "service": return <ServiceLayout {...props} />;
    case "cashmemo": return <CashMemoLayout {...props} />;
    case "challan": return <ChallanLayout {...props} />;
    case "payslip": return <PayslipLayout {...props} />;
    case "receipt": return <ReceiptLayout {...props} />;
    case "voucher": return <VoucherLayout {...props} />;
    case "fuel": return <FuelLayout {...props} />;
    default: return <InvoiceLayout {...props} />;
  }
}
