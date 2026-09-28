
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { amountToWords, computeTotals, currencySymbol, formatDate, formatMoney } from "@/lib/format";
import type { DocData, DocItem, ToolPreset, Totals } from "@/lib/types";

const A4_WIDTH_PX = 794; // 210mm at 96dpi

function usePaymentQR(data: DocData, enabled: boolean, amount: number): string {
  const [src, setSrc] = useState("");
  useEffect(() => {
    const vpa = data.business.upiId.trim();
    if (!enabled || !vpa || !/[\w.\-]{2,}@[a-zA-Z]{2,}/.test(vpa)) {
      setSrc("");
      return;
    }
    const params = new URLSearchParams({
      pa: vpa,
      pn: data.business.name || "Payment",
      cu: data.currency,
    });
    if (amount > 0) params.set("am", amount.toFixed(2));
    QRCode.toDataURL(`upi://pay?${params.toString()}`, { margin: 0, width: 160 })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [data.business.upiId, data.business.name, data.currency, enabled, amount]);
  return src;
}

function PartyBlock({ label, party, accent }: { label: string; party: DocData["business"]; accent: string }) {
  return (
    <div className="min-w-0">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-1 text-[12px] font-bold text-slate-900">{party.name || "—"}</p>
      {party.address && <p className="whitespace-pre-line text-[10px] leading-snug text-slate-600">{party.address}</p>}
      <p className="text-[10px] text-slate-600">
        {party.phone}{party.phone && party.email ? " · " : ""}{party.email}
      </p>
      {party.gstin && (
        <p className="mt-0.5 text-[10px] text-slate-700">
          <span className="font-semibold">GSTIN:</span> <span className="font-mono">{party.gstin}</span>
        </p>
      )}
      {party.pan && (
        <p className="text-[10px] text-slate-700">
          <span className="font-semibold">PAN:</span> <span className="font-mono">{party.pan}</span>
        </p>
      )}
      <div className="mt-1 h-0.5 w-8 rounded" style={{ backgroundColor: accent }} />
    </div>
  );
}

function ItemsTable({
  data,
  preset,
  totals,
  rows,
  caption,
}: {
  data: DocData;
  preset: ToolPreset;
  totals: Totals;
  rows?: DocItem[];
  caption?: string;
}) {
  const list = rows ?? data.items;
  const cols =
    preset.amountMode === "single"
      ? []
      : [
          preset.itemLabel,
          ...(preset.showHsn ? ["HSN/SAC"] : []),
          preset.qtyLabel,
          preset.rateLabel,
          ...(preset.taxMode === "gst" && data.taxMode !== "none" ? ["GST %"] : []),
          "Amount",
        ];

  return (
    <table className="w-full border-collapse">
      {caption && (
        <caption className="mb-1 text-left font-mono text-[8px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {caption}
        </caption>
      )}
      {cols.length > 0 && (
        <thead>
          <tr className="border-b border-slate-300 text-left">
            {cols.slice(0, -1).map((c) => (
              <th key={c} className="pb-1 pr-2 font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-500">
                {c}
              </th>
            ))}
            <th className="pb-1 text-right font-mono text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-500">
              {cols[cols.length - 1]}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {list.map((it) => {
          const amount = (Number(it.qty) || 0) * (Number(it.rate) || 0);
          const cells = [
            it.desc || "—",
            ...(preset.showHsn ? [it.hsn] : []),
            preset.amountMode === "items" ? String(it.qty) : "",
            formatMoney(it.rate, data.currency),
            ...(preset.taxMode === "gst" && data.taxMode !== "none" ? [`${it.gstRate}%`] : []),
          ].filter((_, i) => i < cols.length - 1);
          return (
            <tr key={it.id} className="border-b border-slate-100 align-top">
              {cells.map((c, i) => (
                <td key={i} className="py-1.5 pr-2 text-[11px] text-slate-800">
                  {c}
                </td>
              ))}
              <td className="py-1.5 text-right font-mono text-[11px] font-medium text-slate-900">
                {formatMoney(amount, data.currency)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function TotalsBox({ data, preset, totals, boxed }: { data: DocData; preset: ToolPreset; totals: Totals; boxed?: boolean }) {
  const rows: Array<[string, string]> = [["Subtotal", formatMoney(totals.subtotal, data.currency)]];
  if (totals.discountAmt > 0) rows.push([`Discount (${data.discountPct}%)`, `− ${formatMoney(totals.discountAmt, data.currency)}`]);
  if (preset.taxMode === "gst" && data.taxMode !== "none") {
    if (data.taxMode === "intra") {
      rows.push(["CGST", formatMoney(totals.cgst, data.currency)]);
      rows.push(["SGST", formatMoney(totals.sgst, data.currency)]);
    } else {
      rows.push(["IGST", formatMoney(totals.igst, data.currency)]);
    }
  }
  if (totals.roundOff !== 0) rows.push(["Round off", formatMoney(totals.roundOff, data.currency)]);

  const salarySplit = preset.id === "salary-slip";
  const gross = data.items.filter((i) => i.rate >= 0).reduce((s, i) => s + i.rate * i.qty, 0);
  const ded = Math.abs(data.items.filter((i) => i.rate < 0).reduce((s, i) => s + i.rate * i.qty, 0));

  return (
    <div className={boxed ? "rounded-lg border border-slate-300 p-3" : ""}>
      {salarySplit ? (
        <table className="w-full">
          <tbody className="[&_td]:py-0.5 [&_td]:text-[11px]">
            <tr><td className="text-slate-600">Gross Earnings</td><td className="text-right font-mono font-medium">{formatMoney(gross, data.currency)}</td></tr>
            <tr><td className="text-slate-600">Total Deductions</td><td className="text-right font-mono font-medium">− {formatMoney(ded, data.currency)}</td></tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full">
          <tbody className="[&_td]:py-0.5 [&_td]:text-[11px]">
            {rows.map(([k, v]) => (
              <tr key={k}><td className="text-slate-600">{k}</td><td className="text-right font-mono font-medium">{v}</td></tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="mt-2 flex items-center justify-between rounded px-2.5 py-2" style={{ backgroundColor: preset.id === "salary-slip" && data.templateStyle !== "executive" ? data.accent : data.accent }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">
          {preset.id === "salary-slip" ? "Net Payable" : preset.amountLabel}
        </span>
        <span className="font-mono text-[14px] font-bold text-white" data-testid="doc-total-display">
          {formatMoney(totals.grand, data.currency)}
        </span>
      </div>
      <p className="mt-1.5 text-[9px] italic leading-snug text-slate-500">
        {amountToWords(totals.grand, data.currency)}
      </p>
    </div>
  );
}

function MetaRow({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  if (!v) return null;
  return (
    <div className="flex justify-between gap-6">
      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">{k}</span>
      <span className={`text-[11px] text-slate-900 ${mono ? "font-mono" : "font-medium"}`}>{v}</span>
    </div>
  );
}

function SwissDoc({ data, preset, totals }: { data: DocData; preset: ToolPreset; totals: Totals }) {
  const isSalary = preset.id === "salary-slip";
  const earnings = data.items.filter((i) => i.rate >= 0);
  const deductions = data.items.filter((i) => i.rate < 0);
  return (
    <div className="flex min-h-[297mm] flex-col p-[12mm] font-sans text-[12px] leading-normal text-slate-900">
      <header className="flex items-start justify-between gap-8">
        <div className="flex items-start gap-3">
          {data.business.logo
            ? <img src={data.business.logo} alt="Business logo" className="size-14 rounded-md object-contain" />
            : <div className="mt-1 size-12 rounded-md border border-slate-300" />}
          <div>
            <p className="font-heading text-[17px] font-bold uppercase tracking-tight">{data.business.name || "Your Business"}</p>
            <p className="whitespace-pre-line text-[10px] leading-snug text-slate-600">{data.business.address}</p>
            <p className="text-[10px] text-slate-600">{data.business.phone}{data.business.phone && data.business.email ? " · " : ""}{data.business.email}</p>
            {data.business.gstin && <p className="text-[10px] text-slate-700"><span className="font-semibold">GSTIN:</span> <span className="font-mono">{data.business.gstin}</span></p>}
          </div>
        </div>
        <div className="text-right">
          <p className="font-heading text-[22px] font-bold uppercase tracking-tight" style={{ color: data.accent }}>
            {preset.docTitle}
          </p>
          <div className="mt-2 space-y-0.5">
            <MetaRow k={preset.numberLabel} v={data.number} mono />
            <MetaRow k="Date" v={formatDate(data.issueDate)} />
            {data.dueDate && <MetaRow k={preset.id === "quotation-estimate" ? "Valid Until" : "Due Date"} v={formatDate(data.dueDate)} />}
          </div>
        </div>
      </header>

      <div className="my-4 h-px w-full" style={{ backgroundColor: data.accent }} />

      <div className="grid grid-cols-2 gap-6">
        <PartyBlock label={preset.fromLabel} party={data.business} accent={data.accent} />
        <PartyBlock label={preset.toLabel} party={data.client} accent={data.accent} />
      </div>

      {Object.entries(data.extra).some(([, v]) => v) && (
        <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-1 rounded-md border border-slate-200 px-3 py-2">
          {preset.extraFields.map((f) =>
            data.extra[f.key] ? (
              <p key={f.key} className="text-[10px] text-slate-700">
                <span className="font-mono text-[8px] uppercase tracking-wider text-slate-500">{f.label}: </span>
                {f.type === "date" ? formatDate(data.extra[f.key]) : data.extra[f.key]}
              </p>
            ) : null,
          )}
        </div>
      )}

      <div className="mt-5 flex-1">
        {isSalary ? (
          <div className="grid grid-cols-2 gap-6">
            <ItemsTable data={data} preset={preset} totals={totals} rows={earnings} caption="Earnings (+)" />
            <ItemsTable data={data} preset={preset} totals={totals} rows={deductions} caption="Deductions (−)" />
          </div>
        ) : preset.amountMode === "single" ? (
          <div className="flex items-center justify-between rounded-md border border-slate-300 px-4 py-4">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{preset.amountLabel}</span>
            <span className="font-mono text-[16px] font-bold">{formatMoney(data.singleAmount, data.currency)}</span>
          </div>
        ) : (
          <ItemsTable data={data} preset={preset} totals={totals} />
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 items-end gap-8">
        <div className="space-y-3">
          {(data.notes || data.terms) && (
            <div>
              {data.notes && <p className="text-[10px] leading-snug text-slate-600"><span className="font-semibold">Notes: </span>{data.notes}</p>}
              {data.terms && <p className="mt-1 text-[10px] leading-snug text-slate-600"><span className="font-semibold">Terms: </span>{data.terms}</p>}
            </div>
          )}
        </div>
        <div className="w-full">
          <TotalsBox data={data} preset={preset} totals={totals} />
          <div className="mt-6 border-t border-slate-300 pt-1 text-right">
            <p className="text-[10px] font-medium text-slate-800">{data.signName || data.business.name || "Authorised Signatory"}</p>
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">Authorised Signatory</p>
          </div>
        </div>
      </div>

      <p className="mt-6 border-t border-slate-100 pt-2 text-center font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
        Generated free with BillsFriend — bill generator
      </p>
    </div>
  );
}

function ExecutiveDoc({ data, preset, totals, qrSrc }: { data: DocData; preset: ToolPreset; totals: Totals; qrSrc: string }) {
  const isSalary = preset.id === "salary-slip";
  const earnings = data.items.filter((i) => i.rate >= 0);
  const deductions = data.items.filter((i) => i.rate < 0);
  return (
    <div className="flex min-h-[297mm] flex-col font-sans text-[12px] text-slate-900">
      <header className="p-[12mm] pb-6" style={{ backgroundColor: data.accent }}>
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-3">
            {data.business.logo
              ? <img src={data.business.logo} alt="Business logo" className="size-14 rounded-lg bg-white/95 object-contain p-1" />
              : <div className="flex size-14 items-center justify-center rounded-lg bg-white/95 font-heading text-lg font-bold" style={{ color: data.accent }}>
                  {(data.business.name || "B").slice(0, 1).toUpperCase()}
                </div>}
            <div>
              <p className="font-heading text-[18px] font-bold uppercase tracking-tight text-white">{data.business.name || "Your Business"}</p>
              <p className="whitespace-pre-line text-[10px] leading-snug text-white/80">{data.business.address}</p>
              <p className="text-[10px] text-white/80">{data.business.phone}{data.business.phone && data.business.email ? " · " : ""}{data.business.email}</p>
            </div>
          </div>
          <div className="text-right text-white">
            <p className="font-heading text-[20px] font-bold uppercase tracking-tight">{preset.docTitle}</p>
            <div className="mt-2 space-y-0.5 [&_span]:text-white/80 [&_div]:justify-end">
              <MetaRow k={preset.numberLabel} v={data.number} mono />
              <MetaRow k="Date" v={formatDate(data.issueDate)} />
              {data.dueDate && <MetaRow k="Due" v={formatDate(data.dueDate)} />}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-col px-[12mm] py-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
            <PartyBlock label={preset.fromLabel} party={data.business} accent={data.accent} />
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
            <PartyBlock label={preset.toLabel} party={data.client} accent={data.accent} />
          </div>
        </div>

        {Object.entries(data.extra).some(([, v]) => v) && (
          <div className="mt-4 grid grid-cols-3 gap-x-6 gap-y-1">
            {preset.extraFields.map((f) =>
              data.extra[f.key] ? (
                <p key={f.key} className="text-[10px] text-slate-700">
                  <span className="font-mono text-[8px] uppercase tracking-wider text-slate-500">{f.label}: </span>
                  {f.type === "date" ? formatDate(data.extra[f.key]) : data.extra[f.key]}
                </p>
              ) : null,
            )}
          </div>
        )}

        <div className="mt-5 flex-1">
          {isSalary ? (
            <div className="grid grid-cols-2 gap-6">
              <ItemsTable data={data} preset={preset} totals={totals} rows={earnings} caption="Earnings (+)" />
              <ItemsTable data={data} preset={preset} totals={totals} rows={deductions} caption="Deductions (−)" />
            </div>
          ) : preset.amountMode === "single" ? (
            <div className="flex items-center justify-between rounded-md border-2 px-4 py-4" style={{ borderColor: data.accent }}>
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">{preset.amountLabel}</span>
              <span className="font-mono text-[16px] font-bold">{formatMoney(data.singleAmount, data.currency)}</span>
            </div>
          ) : (
            <ItemsTable data={data} preset={preset} totals={totals} />
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-8">
          <div className="max-w-[55%] space-y-2">
            {data.business.upiId && (
              <p className="text-[10px] text-slate-600"><span className="font-semibold">Pay via UPI: </span><span className="font-mono">{data.business.upiId}</span></p>
            )}
            {data.notes && <p className="text-[10px] leading-snug text-slate-600"><span className="font-semibold">Notes: </span>{data.notes}</p>}
            {data.terms && <p className="text-[10px] leading-snug text-slate-600"><span className="font-semibold">Terms: </span>{data.terms}</p>}
          </div>
          <div className="flex items-start gap-4">
            {qrSrc && (
              <figure className="text-center">
                <img src={qrSrc} alt="UPI payment QR" className="size-20 rounded border border-slate-200" />
                <figcaption className="font-mono text-[7px] uppercase tracking-wider text-slate-500">Scan to pay</figcaption>
              </figure>
            )}
            <div className="min-w-[180px]">
              <TotalsBox data={data} preset={preset} totals={totals} boxed />
              <div className="mt-6 border-t border-slate-300 pt-1 text-right">
                <p className="text-[10px] font-medium text-slate-800">{data.signName || data.business.name || "Authorised Signatory"}</p>
                <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500">Authorised Signatory</p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-6 border-t border-slate-100 pt-2 text-center font-mono text-[8px] uppercase tracking-[0.25em] text-slate-400">
          Generated free with BillsFriend — {currencySymbol(data.currency)} bills &amp; invoices
        </p>
      </div>
    </div>
  );
}

export function DocumentPreview({ data, preset }: { data: DocData; preset: ToolPreset }) {
  const totals = useMemo(() => computeTotals(data, preset), [data, preset]);
  const qrSrc = usePaymentQR(data, data.templateStyle === "executive", totals.grand);
  const outerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [sheetH, setSheetH] = useState(1123);

  useEffect(() => {
    const update = () => {
      const w = outerRef.current?.clientWidth ?? A4_WIDTH_PX;
      const s = Math.min(1, w / A4_WIDTH_PX);
      setScale(s);
      if (sheetRef.current) setSheetH(sheetRef.current.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    if (sheetRef.current) ro.observe(sheetRef.current);
    return () => ro.disconnect();
  }, [data, preset]);

  return (
    <div ref={outerRef} className="preview-outer w-full overflow-hidden" data-testid="document-preview">
      <div
        className="preview-scale origin-top-left"
        style={{ transform: `scale(${scale})`, width: A4_WIDTH_PX, height: scale < 1 ? sheetH * scale : undefined }}
      >
        <div
          ref={sheetRef}
          id="printable-a4-document"
          className="w-full bg-white shadow-2xl ring-1 ring-slate-900/10 transition-colors duration-200"
        >
          {data.templateStyle === "executive" ? (
            <ExecutiveDoc data={data} preset={preset} totals={totals} qrSrc={qrSrc} />
          ) : (
            <SwissDoc data={data} preset={preset} totals={totals} />
          )}
        </div>
      </div>
    </div>
  );
}
