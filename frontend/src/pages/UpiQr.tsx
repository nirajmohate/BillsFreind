import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Copy, Download, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpiQr() {
  const [name, setName] = useState("");
  const [vpa, setVpa] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [src, setSrc] = useState("");
  const validVpa = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(vpa.trim());

  const payload = (() => {
    const params = new URLSearchParams({ pa: vpa.trim(), cu: "INR" });
    if (name.trim()) params.set("pn", name.trim());
    if (Number(amount) > 0) params.set("am", String(Number(amount)));
    if (note.trim()) params.set("tn", note.trim());
    return `upi://pay?${params.toString()}`;
  })();

  useEffect(() => {
    if (!validVpa) {
      setSrc("");
      return;
    }
    QRCode.toDataURL(payload, { margin: 2, width: 360 })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [payload, validVpa]);

  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title="Free UPI QR Code Generator — Payment QR Online | BillsFriend"
        description="Generate a scannable UPI payment QR code from any UPI ID — free, instant, downloadable PNG. Optional pre-filled amount and note."
        path="/upi-qr"
      />
      <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">UPI QR Generator</h1>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        Turn any UPI ID into a scannable payment QR — print it on your bills (the Executive
        template embeds it automatically) or download the PNG.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-6">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Payee name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Sharma Traders" data-testid="upi-name-input" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">UPI ID (VPA)</Label>
            <Input value={vpa} onChange={(e) => setVpa(e.target.value)} placeholder="name@okicici" data-testid="upi-vpa-input" />
            {vpa && !validVpa && <p className="text-xs text-red-500">Enter a valid UPI ID like name@bank</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Amount (₹, optional)</Label>
              <Input type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} data-testid="upi-amount-input" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Note (optional)</Label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} data-testid="upi-note-input" />
            </div>
          </div>
          <Button
            variant="outline" size="sm"
            onClick={() => { navigator.clipboard?.writeText(payload); toast.success("UPI payload copied"); }}
            data-testid="upi-copy-payload-btn"
          >
            <Copy className="size-4" /> Copy UPI payload
          </Button>
          <p className="break-all rounded-lg bg-muted px-3 py-2 font-mono text-[10px] text-muted-foreground">{payload}</p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-2xl border border-border/80 bg-card p-6">
          {src ? (
            <>
              <img src={src} alt="UPI payment QR code" className="size-64 rounded-xl border border-border" data-testid="upi-qr-image-display" />
              <a href={src} download="upi-qr.png" className="mt-4" data-testid="upi-download-png-btn">
                <Button size="sm"><Download className="size-4" /> Download PNG</Button>
              </a>
            </>
          ) : (
            <div className="flex size-64 flex-col items-center justify-center rounded-xl border border-dashed border-border text-muted-foreground/50" data-testid="upi-qr-placeholder">
              <QrCode className="size-10" />
              <p className="mt-3 max-w-[180px] text-center text-xs">Enter a valid UPI ID — the QR renders live</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
