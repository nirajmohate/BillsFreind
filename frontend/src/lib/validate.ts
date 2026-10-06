// Lightweight, dependency-free form validation for the document editor.

import type { DocData, ToolPreset } from "./types";

export const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
export const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
export const UPI_RE = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,18}$/;

export type Errors = Record<string, string>;

export function validateDoc(data: DocData, preset: ToolPreset): Errors {
  const e: Errors = {};
  if (!data.business.name.trim()) e.businessName = "Enter your business / name";
  if (!data.client.name.trim()) e.clientName = "Enter the customer / recipient name";
  if (!data.number.trim()) e.number = `Enter a ${preset.numberLabel.toLowerCase()}`;
  if (!data.issueDate) e.issueDate = "Pick a date";

  if (data.business.gstin && !GSTIN_RE.test(data.business.gstin)) e.businessGstin = "GSTIN must be 15 characters, e.g. 27ABCDE1234F1Z5";
  if (data.client.gstin && !GSTIN_RE.test(data.client.gstin)) e.clientGstin = "GSTIN must be 15 characters, e.g. 27ABCDE1234F1Z5";
  if (data.business.pan && !PAN_RE.test(data.business.pan)) e.businessPan = "PAN must look like ABCDE1234F";
  if (data.client.pan && !PAN_RE.test(data.client.pan)) e.clientPan = "PAN must look like ABCDE1234F";
  if (data.business.phone && !PHONE_RE.test(data.business.phone)) e.businessPhone = "Enter a valid phone number";
  if (data.client.phone && !PHONE_RE.test(data.client.phone)) e.clientPhone = "Enter a valid phone number";
  if (data.business.email && !EMAIL_RE.test(data.business.email)) e.businessEmail = "Enter a valid email address";
  if (data.client.email && !EMAIL_RE.test(data.client.email)) e.clientEmail = "Enter a valid email address";
  if (data.business.upiId && !UPI_RE.test(data.business.upiId.trim())) e.upiId = "UPI ID looks like name@bank";
  if (data.dueDate && data.issueDate && data.dueDate < data.issueDate) e.dueDate = "Can't be earlier than the issue date";

  if (preset.amountMode === "single") {
    if (!(data.singleAmount > 0)) e.amount = "Enter an amount greater than zero";
  } else {
    const filled = data.items.filter((i) => i.desc.trim() || Number(i.rate));
    if (!filled.length) e.items = "Add at least one line item";
    data.items.forEach((it, idx) => {
      const used = it.desc.trim() || Number(it.rate);
      if (!used) return;
      if (!it.desc.trim()) e[`item-${idx}-desc`] = "Describe this item";
      if (!(Number(it.qty) > 0)) e[`item-${idx}-qty`] = "Qty must be above zero";
    });
  }
  return e;
}
