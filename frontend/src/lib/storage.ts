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

/** Returns false (instead of throwing) when storage is full, blocked or unavailable. */
function writeJSON(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
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

export function saveProfile(p: Party): boolean {
  return writeJSON(KEY_PROFILE, p);
}

export function loadDocs(): LocalDoc[] {
  return readJSON<LocalDoc[]>(KEY_DOCS, []).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function putDoc(doc: LocalDoc): boolean {
  const docs = loadDocs().filter((d) => d.id !== doc.id);
  docs.unshift(doc);
  return writeJSON(KEY_DOCS, docs);
}

export function getDoc(id: string): LocalDoc | undefined {
  return loadDocs().find((d) => d.id === id);
}

export function removeDoc(id: string): boolean {
  return writeJSON(KEY_DOCS, loadDocs().filter((d) => d.id !== id));
}

function readCounter(prefix: string): number {
  try {
    return Number(localStorage.getItem(`${KEY_COUNTER}${prefix}`) ?? "0") || 0;
  } catch {
    return 0;
  }
}

export function nextDocNumber(prefix: string): string {
  const next = readCounter(prefix) + 1;
  try {
    localStorage.setItem(`${KEY_COUNTER}${prefix}`, String(next));
  } catch {
    /* storage unavailable — numbering simply restarts next time */
  }
  return `${prefix}-${String(next).padStart(4, "0")}`;
}

export function peekDocNumber(prefix: string): string {
  return `${prefix}-${String(readCounter(prefix) + 1).padStart(4, "0")}`;
}

export function getTheme(): "light" | "dark" {
  try {
    return localStorage.getItem(KEY_THEME) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function applyTheme(theme: "light" | "dark"): void {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(KEY_THEME, theme);
  } catch {
    /* ignore */
  }
}

export function docTitleFor(data: DocData): string {
  return data.client.name || data.business.name || data.number || "Untitled document";
}
