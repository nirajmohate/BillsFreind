import { describe, expect, it } from "vitest";
import { emptyDoc, getPreset } from "./tools";
import { DEFAULT_BUSINESS } from "./storage";
import { validateDoc } from "./validate";

describe("cash voucher and receiver tax details", () => {
  it("provides a cash voucher preset with payee GST and PAN support", () => {
    const preset = getPreset("cash-voucher");
    expect(preset?.layout).toBe("voucher");
    expect(preset?.toLabel).toBe("Pay To");
  });

  it("validates receiver GST and PAN on every bill type", () => {
    const preset = getPreset("general-bill");
    expect(preset).toBeDefined();
    if (!preset) return;
    const data = emptyDoc(preset, { ...DEFAULT_BUSINESS, name: "Business" }, "BILL-1");
    data.client.name = "Receiver";
    data.client.gstin = "INVALID";
    data.client.pan = "INVALID";
    data.items[0] = { ...data.items[0], desc: "Item", rate: 100 };
    const errors = validateDoc(data, preset);
    expect(errors.clientGstin).toContain("15 characters");
    expect(errors.clientPan).toContain("ABCDE1234F");
  });
});