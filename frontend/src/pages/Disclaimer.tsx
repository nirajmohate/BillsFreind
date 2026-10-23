import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { PAGE_META } from "@/lib/seo";

const SECTIONS: Array<[string, string]> = [
  [
    "Not tax, legal or accounting advice",
    "BillsFreind is a document-formatting tool and its blog is general information. Nothing on this website — including the GST invoice generator, sample data and articles — is tax, legal, financial or accounting advice. Rules, rates and thresholds change, so confirm anything that affects your filings or compliance with a qualified chartered accountant or other professional.",
  ],
  [
    "You are responsible for what you enter",
    "Every document is generated from the details you type in. You are responsible for the accuracy and completeness of names, GSTIN and PAN numbers, HSN/SAC codes, tax rates, amounts and any other content, and for checking each document before you issue, send or file it. Sample data shown in the tools and in blog images is fictional.",
  ],
  [
    "GST invoices and e-invoicing",
    "The GST invoice format follows common Indian invoicing conventions, but we do not guarantee that a document meets every requirement of the CGST Act, the CGST Rules or any state law for your particular business. BillsFreind does not connect to the government's Invoice Registration Portal and does not generate an IRN or e-invoice QR code. If your business is required to issue e-invoices, you must generate them through the government system.",
  ],
  [
    "Not affiliated with any authority",
    "BillsFreind is an independent project. It is not affiliated with, endorsed by or approved by the GST Council, the Central Board of Indirect Taxes and Customs (CBIC), the Income Tax Department, the Government of India, or any bank, UPI app or payment provider mentioned on this site.",
  ],
  [
    "Accuracy of information",
    "We try to keep the tools and articles accurate and up to date, but we make no warranty that they are complete, current or error-free. Information on this website may become outdated when laws, rates or procedures change.",
  ],
  [
    "Payments and UPI QR codes",
    "BillsFreind does not process, hold or transfer money. A UPI QR code is generated on your device from the UPI ID you enter. Check the ID and the amount before sharing a QR code or relying on one, because we are not responsible for payments made to a wrong or mistyped UPI ID.",
  ],
  [
    "Your data and backups",
    "Documents and business details are stored only in your own browser. They can be lost if you clear your browser data, switch devices or use private browsing, and we cannot recover them. Download a PDF or export JSON for anything you need to keep.",
  ],
  [
    "Advertising and external links",
    "This website may show advertising from third parties, such as Google AdSense. Ads and links to external sites, including our Instagram and YouTube pages, are provided for convenience and are not an endorsement. We do not control third-party content or their privacy practices.",
  ],
  [
    "Limitation of liability",
    "BillsFreind is provided “as is” and “as available”, free of charge. To the fullest extent permitted by law, we are not liable for any loss, penalty, tax demand, lost credit, lost data or other damage arising from the use of — or inability to use — this website, its tools or its content.",
  ],
];

export default function Disclaimer() {
  return (
    <main className="mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6">
      <Seo
        title={PAGE_META.disclaimer.title}
        description={PAGE_META.disclaimer.description}
        path={PAGE_META.disclaimer.path}
      />
      <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Legal</p>
      <h1 className="mt-2 font-heading text-4xl font-bold tracking-tight">Disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: 13 October 2026</p>

      <div className="mt-6 rounded-2xl border border-primary/25 bg-accent/60 p-5 text-sm leading-relaxed text-accent-foreground">
        <strong>In short:</strong> BillsFreind helps you format bills and invoices. It is not a substitute for professional
        tax or legal advice, and you are responsible for checking every document before you use it.
      </div>

      <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        {SECTIONS.map(([h, p]) => (
          <section key={h}>
            <h2 className="font-heading text-lg font-bold text-foreground">{h}</h2>
            <p className="mt-2">{p}</p>
          </section>
        ))}
        <p>
          Read this together with our <Link to="/terms" className="text-primary underline underline-offset-2">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="text-primary underline underline-offset-2">Privacy Policy</Link>. Questions? See the{" "}
          <Link to="/contact" className="text-primary underline underline-offset-2">contact page</Link>.
        </p>
      </div>
    </main>
  );
}
