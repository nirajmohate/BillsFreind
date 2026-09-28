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
}

export interface DocData {
  presetId: string;
  templateStyle: "swiss" | "executive";
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
