// Currency formatting, amount-in-words (Indian + Western systems) and the tax math engine.

import type { DocData, ToolPreset, Totals } from "./types";

export const CURRENCIES: { code: string; symbol: string; label: string }[] = [
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "AED", symbol: "AED", label: "UAE Dirham (AED)" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar (A$)" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar (C$)" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar (S$)" },
];

export function currencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
}

export function formatMoney(amount: number, currency: string): string {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(amount));
  const sign = amount < 0 ? "-" : "";
  return `${sign}${currencySymbol(currency)}${formatted}`;
}

// ---------------------------------------------------------------- number to words
const ONES = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function twoDigitWords(n: number): string {
  if (n < 20) return ONES[n];
  const t = TENS[Math.floor(n / 10)];
  const o = ONES[n % 10];
  return o ? `${t} ${o}` : t;
}

function threeDigitWords(n: number): string {
  const h = Math.floor(n / 100);
  const rest = n % 100;
  if (!h) return twoDigitWords(rest);
  return `${ONES[h]} Hundred${rest ? ` ${twoDigitWords(rest)}` : ""}`;
}

/** Indian system: crore / lakh / thousand */
function indianWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;
  if (crore) parts.push(`${indianWords(crore)} Crore`);
  if (lakh) parts.push(`${twoDigitWords(lakh)} Lakh`);
  if (thousand) parts.push(`${twoDigitWords(thousand)} Thousand`);
  if (rest) parts.push(threeDigitWords(rest));
  return parts.join(" ");
}

/** Western system: million / thousand */
function westernWords(n: number): string {
  if (n === 0) return "Zero";
  const parts: string[] = [];
  const billion = Math.floor(n / 1000000000);
  const million = Math.floor((n % 1000000000) / 1000000);
  const thousand = Math.floor((n % 1000000) / 1000);
  const rest = n % 1000;
  if (billion) parts.push(`${westernWords(billion)} Billion`);
  if (million) parts.push(`${westernWords(million)} Million`);
  if (thousand) parts.push(`${threeDigitWords(thousand)} Thousand`);
  if (rest) parts.push(threeDigitWords(rest));
  return parts.join(" ");
}

const CURRENCY_NAMES: Record<string, { major: string; minor: string }> = {
  INR: { major: "Rupees", minor: "Paise" },
  USD: { major: "Dollars", minor: "Cents" },
  EUR: { major: "Euros", minor: "Cents" },
  GBP: { major: "Pounds", minor: "Pence" },
  AED: { major: "Dirhams", minor: "Fils" },
  AUD: { major: "Dollars", minor: "Cents" },
  CAD: { major: "Dollars", minor: "Cents" },
  SGD: { major: "Dollars", minor: "Cents" },
};

export function amountToWords(amount: number, currency: string): string {
  const names = CURRENCY_NAMES[currency] ?? { major: currency, minor: "Cents" };
  const negative = amount < 0;
  const abs = Math.abs(amount);
  const major = Math.floor(abs);
  const minor = Math.round((abs - major) * 100);
  const words = currency === "INR" ? indianWords(major) : westernWords(major);
  let out = `${names.major} ${words}`;
  if (minor > 0) {
    const minorWords = currency === "INR" ? indianWords(minor) : westernWords(minor);
    out += ` and ${minorWords} ${names.minor}`;
  }
  return `${negative ? "Minus " : ""}${out} Only`;
}

// ---------------------------------------------------------------- tax engine
export function computeTotals(data: DocData, preset: ToolPreset): Totals {
  const zero: Totals = {
    subtotal: 0, discountAmt: 0, taxable: 0, cgst: 0, sgst: 0, igst: 0,
    taxTotal: 0, grandExact: 0, roundOff: 0, grand: 0,
  };

  if (preset.amountMode === "single") {
    const grand = data.singleAmount || 0;
    return { ...zero, subtotal: grand, taxable: grand, grandExact: grand, grand: data.roundTotal ? Math.round(grand) : grand, roundOff: data.roundTotal ? Math.round(grand) - grand : 0 };
  }

  const subtotal = data.items.reduce((sum, it) => sum + (Number(it.qty) || 0) * (Number(it.rate) || 0), 0);
  const discountPct = Math.min(Math.max(Number(data.discountPct) || 0, 0), 100);
  const discountAmt = (subtotal * discountPct) / 100;
  const taxable = subtotal - discountAmt;

  let taxTotal = 0;
  if (preset.taxMode === "gst" && data.taxMode !== "none") {
    for (const it of data.items) {
      const itemAmount = (Number(it.qty) || 0) * (Number(it.rate) || 0);
      const itemTaxable = itemAmount - (discountPct / 100) * itemAmount;
      taxTotal += (itemTaxable * (Number(it.gstRate) || 0)) / 100;
    }
  }

  const cgst = data.taxMode === "intra" ? taxTotal / 2 : 0;
  const sgst = data.taxMode === "intra" ? taxTotal / 2 : 0;
  const igst = data.taxMode === "inter" ? taxTotal : 0;
  const grandExact = taxable + taxTotal;
  const roundOff = data.roundTotal ? Math.round(grandExact) - grandExact : 0;
  const grand = grandExact + roundOff;

  return { subtotal, discountAmt, taxable, cgst, sgst, igst, taxTotal, grandExact, roundOff, grand };
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function todayISO(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
