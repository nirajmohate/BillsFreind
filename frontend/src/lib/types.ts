// Shared client-side types for the local-first document engine.
// There is no backend — everything here is purely client-side.

export interface Party {
  name: string;
  address: string;
  phone: string;
  email: string;
  gstin: string;
  pan: string;
  logo: string; // dataURL
  upiId: string;
}

export interface DocItem {
  id: string;
  desc: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  gstRate: number;
  /** Only used by presets with `itemKinds` (e.g. parts vs labour on service bills). */
  kind?: string;
}

export interface DocData {
  presetId: string;
  templateStyle: "classic" | "swiss" | "executive";
  accent: string;
  currency: string;
  number: string;
  issueDate: string;
  dueDate: string;
  business: Party;
  client: Party;
  items: DocItem[];
  taxMode: "none" | "intra" | "inter";
  discountPct: number;
  roundTotal: boolean;
  notes: string;
  terms: string;
  signName: string;
  singleAmount: number;
  extra: Record<string, string>;
  /** Optional free-text bank / payment details printed on the bill. */
  bank?: string;
  /** Optional signature / stamp image (data URL). */
  signature?: string;
}

export interface ExtraField {
  key: string;
  label: string;
  type: "text" | "number" | "date";
  placeholder?: string;
}

export interface ToolPreset {
  id: string;
  name: string;
  docTitle: string;
  category: string;
  badge: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  accent: string;
  taxMode: "gst" | "none";
  amountMode: "items" | "single";
  numberPrefix: string;
  numberLabel: string;
  fromLabel: string;
  toLabel: string;
  amountLabel: string;
  itemLabel: string;
  qtyLabel: string;
  rateLabel: string;
  showHsn: boolean;
  /** Column heading for the HSN column (e.g. "Batch No." for pharmacy). Defaults to "HSN/SAC". */
  hsnLabel?: string;
  /** When set, each line item is tagged with one of these kinds and printed in grouped sections. */
  itemKinds?: Array<{ id: string; label: string }>;
  /** GST is available but off by default (small service providers). */
  gstOptional?: boolean;
  /** Which real-world printed layout this preset uses. */
  layout: "invoice" | "cashmemo" | "receipt" | "voucher" | "payslip" | "challan" | "service" | "fuel";
  extraFields: ExtraField[];
}

export interface Totals {
  subtotal: number;
  discountAmt: number;
  taxable: number;
  cgst: number;
  sgst: number;
  igst: number;
  taxTotal: number;
  grandExact: number;
  roundOff: number;
  grand: number;
}

// Local mirror of a saved document (localStorage is the source of truth)
export interface LocalDoc {
  id: string;
  docType: string;
  title: string;
  docNumber: string;
  docDate: string;
  total: number;
  currency: string;
  updatedAt: string;
  payload: DocData;
}
