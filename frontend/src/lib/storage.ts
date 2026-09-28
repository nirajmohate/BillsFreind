// Local-only persistence: the browser owns all document data. Nothing is ever sent to a server.

import type { DocData, LocalDoc, Party } from "./types";

const KEY_DOCS = "bf_docs";
const KEY_PROFILE = "bf_profile";
const KEY_COUNTER = "bf_counter_";
const KEY_THEME = "bf_theme";

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const DEFAULT_BUSINESS: Party = {
  name: "",
  address: "",
  phone: "",
  email: "",
  gstin: "",
  pan: "",
  logo: "",
  upiId: "",
};

export function loadProfile(): Party {
  return { ...DEFAULT_BUSINESS, ...readJSON<Partial<Party>>(KEY_PROFILE, {}) };
}

export function saveProfile(p: Party): void {
  writeJSON(KEY_PROFILE, p);
}

export function loadDocs(): LocalDoc[] {
  return readJSON<LocalDoc[]>(KEY_DOCS, []).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function putDoc(doc: LocalDoc): void {
  const docs = loadDocs().filter((d) => d.id !== doc.id);
  docs.unshift(doc);
  writeJSON(KEY_DOCS, docs);
}

export function getDoc(id: string): LocalDoc | undefined {
  return loadDocs().find((d) => d.id === id);
}

export function removeDoc(id: string): void {
  writeJSON(KEY_DOCS, loadDocs().filter((d) => d.id !== id));
}

export function nextDocNumber(prefix: string): string {
  const key = `${KEY_COUNTER}${prefix}`;
  const next = (Number(localStorage.getItem(key) ?? "0") || 0) + 1;
  localStorage.setItem(key, String(next));
  return `${prefix}-${String(next).padStart(4, "0")}`;
}

export function peekDocNumber(prefix: string): string {
  const current = Number(localStorage.getItem(`${KEY_COUNTER}${prefix}`) ?? "0") || 0;
  return `${prefix}-${String(current + 1).padStart(4, "0")}`;
}

export function getTheme(): "light" | "dark" {
  return localStorage.getItem(KEY_THEME) === "dark" ? "dark" : "light";
}

export function applyTheme(theme: "light" | "dark"): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(KEY_THEME, theme);
}

export function docTitleFor(data: DocData): string {
  return data.client.name || data.business.name || data.number || "Untitled document";
}
