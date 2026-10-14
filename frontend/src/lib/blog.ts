// Blog content. Each post is plain data, so the same source feeds the React pages,
// the JSON-LD, the prerendered static HTML and the sitemap. To add a post: append an
// object to BLOG_POSTS (newest first) — its page, sitemap entry and meta tags are generated
// automatically on the next build.
//
// Inline markup inside text fields: **bold** and [label](/internal-or-https-link).

export type Block =
  | { t: "h2"; id: string; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "steps"; items: Array<{ title: string; text: string }> }
  | { t: "table"; head: string[]; rows: string[][]; caption?: string }
  | { t: "callout"; title: string; text: string }
  | { t: "img"; src: string; alt: string; caption: string; width: number; height: number }
  | { t: "cta"; text: string; to: string; label: string };

export interface BlogPost {
  slug: string;
  /** On-page H1 */
  title: string;
  /** <title> tag (kept under ~60 characters) */
  seoTitle: string;
  /** Meta description (kept under ~160 characters) */
  description: string;
  excerpt: string;
  /** ISO dates */
  published: string;
  updated: string;
  category: string;
  /** Generator pages this post is relevant to — used for "read the guide" links on tool pages. */
  relatedTools: string[];
  body: Block[];
  faqs: Array<{ q: string; a: string }>;
}

export const BLOG_AUTHOR = "BillsFriend Team";

// -------------------------------------------------------------------- posts
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-create-gst-invoice",
    title: "How to Create a GST Invoice in India: Step-by-Step Guide",
    seoTitle: "How to Create a GST Invoice in India: Step-by-Step Guide",
    description:
      "Learn how to create a GST invoice in India: mandatory Rule 46 details, CGST/SGST vs IGST, HSN codes, numbering and timelines — plus a free generator.",
    excerpt:
      "Everything a GST tax invoice must contain, how to choose between CGST + SGST and IGST, and how to make a compliant invoice in about a minute — free.",
    published: "2026-10-13",
    updated: "2026-10-13",
    category: "GST Guide",
    relatedTools: ["gst-invoice", "quotation-estimate", "purchase-order", "electrician-bill", "plumber-bill", "mechanic-bill"],
    body: [
      {
        t: "p",
        text: "A GST invoice is the document that lets you collect GST from a customer — and lets that customer claim input tax credit (ITC) on it. Get a detail wrong and your buyer can lose credit, which is a quick way to lose a client. This guide explains exactly what an Indian GST tax invoice must contain, how to fill each part, and how to produce one in about a minute with the free [GST invoice generator](/gst-invoice).",
      },
      { t: "h2", id: "what-is-a-gst-invoice", text: "What is a GST invoice?" },
      {
        t: "p",
        text: "A GST tax invoice is the bill a GST-registered seller issues for supplying goods or services. It is governed by Section 31 of the CGST Act, 2017 and **Rule 46 of the CGST Rules**, which list the particulars it must carry. It records what was sold, the value, the tax charged and who the parties are.",
      },
      { t: "h2", id: "who-can-issue", text: "Who can (and cannot) issue a GST tax invoice" },
      {
        t: "ul",
        items: [
          "**Regular GST-registered businesses** issue tax invoices and charge GST.",
          "**Composition-scheme dealers** cannot charge GST on their sales. They issue a *bill of supply* instead.",
          "**Suppliers of exempt or nil-rated goods and services** also issue a bill of supply.",
          "**Unregistered businesses** cannot charge GST at all. A plain bill or cash memo — such as the [general bill generator](/general-bill) — is the right document.",
        ],
      },
      { t: "h2", id: "mandatory-details", text: "Mandatory details on a GST invoice (Rule 46)" },
      {
        t: "p",
        text: "Every tax invoice must show the following. Missing items are the most common reason a buyer's ITC claim is questioned.",
      },
      {
        t: "ul",
        items: [
          "Supplier's **name, address and GSTIN**",
          "A **unique, consecutive invoice number** — up to 16 characters, using letters, numbers, a hyphen (-) or a slash (/) only",
          "**Date of issue**",
          "Recipient's **name, address and GSTIN** (if registered)",
          "For an unregistered recipient on an invoice of **₹50,000 or more**: name, address and the state with its code",
          "**HSN code** for goods or **SAC** for services",
          "Description of the goods or services, **quantity and unit**",
          "Total value, any discount, and the **taxable value**",
          "**Rate and amount of tax** — CGST and SGST (or UTGST), or IGST, plus cess where applicable",
          "**Place of supply** (with the state name) for inter-state supplies",
          "Whether **tax is payable on reverse charge**",
          "**Signature or digital signature** of the supplier or authorised representative",
        ],
      },
      {
        t: "callout",
        title: "Built in",
        text: "BillsFriend's GST invoice uses the boxed layout Indian businesses actually print, with an HSN-wise tax summary, amount in words, a bank-details block, a UPI QR code and signature lines. You remain responsible for the accuracy of the details you enter.",
      },
      { t: "h2", id: "steps", text: "How to create a GST invoice in 7 steps" },
      {
        t: "steps",
        items: [
          { title: "Open the generator", text: "Go to the free [GST Tax Invoice generator](/gst-invoice). There is nothing to install and no account to create." },
          { title: "Enter your business details", text: "Add your business name, address, GSTIN, PAN, phone and email. You can add a logo and your UPI ID too. These are remembered in your browser, so you only type them once." },
          { title: "Add your customer", text: "Enter the customer's name and address. For a registered business, add their GSTIN — they need it to claim ITC." },
          { title: "Choose the supply type", text: "Select **Within state (CGST + SGST)** or **Inter-state (IGST)**, and fill in the place of supply. The next section shows how to decide." },
          { title: "Add line items", text: "For each item enter the description, HSN/SAC code, quantity, unit, rate and GST rate. Subtotal, tax split, grand total and amount in words update live as you type." },
          { title: "Add bank details, terms and signature", text: "Add your bank account and IFSC, payment terms (for example “payment due within 15 days”) and upload a signature or stamp image if you use one." },
          { title: "Download the PDF", text: "Press **Download PDF** and choose “Save as PDF” in the print dialog. If anything required is missing, the form highlights it first. Press **Save** to keep a draft in My Documents." },
        ],
      },
      {
        t: "img",
        src: "/blog/gst-invoice-sample.webp",
        alt: "Sample GST tax invoice created with BillsFriend, showing supplier and buyer details, HSN-coded line items, an HSN-wise CGST and SGST summary, amount in words and signature lines",
        caption: "A sample GST tax invoice (fictional business data) generated with BillsFriend.",
        width: 900,
        height: 1272,
      },
      { t: "h2", id: "cgst-sgst-igst", text: "CGST + SGST or IGST? A worked example" },
      {
        t: "p",
        text: "The tax rate does not change — only how it is split. If the place of supply is in the same state as the supplier, the tax is split equally into CGST and SGST. If it is in a different state, the full amount is charged as IGST. Take a sale of ₹10,000 of goods taxed at 18%:",
      },
      {
        t: "table",
        caption: "Same sale, two supply types",
        head: ["", "Within one state", "Between two states"],
        rows: [
          ["Taxable value", "₹10,000", "₹10,000"],
          ["CGST @ 9%", "₹900", "—"],
          ["SGST @ 9%", "₹900", "—"],
          ["IGST @ 18%", "—", "₹1,800"],
          ["**Invoice total**", "**₹11,800**", "**₹11,800**"],
        ],
      },
      {
        t: "p",
        text: "Place-of-supply rules for some services work differently from goods, so check the rule for your service if you are unsure.",
      },
      { t: "h2", id: "gst-rates", text: "Which GST rate should you charge?" },
      {
        t: "p",
        text: "The rate depends on the HSN/SAC code of what you sell. Since the GST rate rationalisation on 22 September 2025, most goods and services are taxed at **5% or 18%**, with **40%** on a small list of select items, alongside 0% for exempt items and special rates such as 3% on gold. Always confirm the rate for your specific code on the official GST portal or with your chartered accountant. In the generator you can set the rate separately on every line item.",
      },
      { t: "h2", id: "hsn-sac", text: "HSN and SAC codes: how many digits?" },
      {
        t: "ul",
        items: [
          "**Annual turnover up to ₹5 crore:** 4-digit HSN on B2B invoices; optional on B2C invoices.",
          "**Annual turnover above ₹5 crore:** 6-digit HSN on all invoices.",
          "**Services** use SAC codes, which begin with 99.",
        ],
      },
      {
        t: "p",
        text: "These limits come from Notification 78/2020-Central Tax as amended. Check the current text if your turnover is near a threshold.",
      },
      { t: "h2", id: "numbering-timelines", text: "Invoice numbering, copies and timelines" },
      {
        t: "ul",
        items: [
          "**Numbering:** consecutive, never repeated within a financial year. You may run separate series (for example one per branch), each consecutive. BillsFriend auto-increments the number for every document type.",
          "**Copies:** for goods, three — original for the recipient, duplicate for the transporter, triplicate for the supplier. For services, two — original for the recipient and duplicate for the supplier.",
          "**When to issue (goods):** on or before removal of the goods, or on or before delivery if they do not move.",
          "**When to issue (services):** within 30 days of the supply (45 days for banks and NBFCs).",
          "**Corrections:** once issued, mistakes are generally fixed with a credit note or debit note rather than by editing the original.",
        ],
      },
      { t: "h2", id: "e-invoicing", text: "E-invoicing: does it apply to you?" },
      {
        t: "p",
        text: "E-invoicing — registering each B2B invoice on the government's Invoice Registration Portal to get an IRN and QR code — is mandatory for businesses with aggregate turnover of ₹5 crore or more, in force since 1 August 2023. Below that limit, a normal PDF invoice with the mandatory details is enough. BillsFriend does not connect to the e-invoice portal, so it is designed for businesses under the threshold.",
      },
      { t: "h2", id: "mistakes", text: "6 common GST invoice mistakes" },
      {
        t: "ol",
        items: [
          "**Wrong or missing customer GSTIN** — the buyer cannot claim ITC.",
          "**Charging CGST + SGST on an inter-state sale** (or IGST on a local one).",
          "**Leaving out the HSN/SAC code** where it is required.",
          "**Duplicate or non-sequential invoice numbers.**",
          "**Issuing a tax invoice when you should issue a bill of supply** (composition dealers, exempt supplies).",
          "**Forgetting the place of supply** on inter-state invoices.",
        ],
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains common invoicing rules in plain language. It is not tax or legal advice. Rules and rates change, so confirm details with a chartered accountant before filing returns. See our [disclaimer](/disclaimer).",
      },
      {
        t: "cta",
        text: "Ready to make one? Fill in the form, check the live preview and download a print-ready A4 PDF — free, with no sign-up and no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      {
        q: "Can I create a GST invoice for free?",
        a: "Yes. BillsFriend's GST invoice generator is free with unlimited invoices, no sign-up and no watermark. You fill in the form and download a PDF.",
      },
      {
        q: "Is a PDF GST invoice valid?",
        a: "Yes, an electronic invoice is accepted as long as it carries all the mandatory particulars. If your business is liable for e-invoicing, it must also carry the IRN and QR code generated by the government portal.",
      },
      {
        q: "What is the difference between a tax invoice and a bill of supply?",
        a: "A tax invoice charges GST and lets the buyer claim input tax credit. A bill of supply is issued by composition-scheme dealers and for exempt supplies, and does not show tax.",
      },
      {
        q: "Do I need a GSTIN to make an invoice?",
        a: "You need a GSTIN to issue a GST tax invoice. If you are not GST-registered, issue a normal bill without GST, such as a cash memo.",
      },
    ],
  },

  {
    slug: "how-to-make-payment-receipt",
    title: "How to Make an Invoice Online for Free",
    seoTitle: "How to Make an Invoice Online for Free | BillsFriend",
    description:
      "Make a professional invoice online for free in 6 steps — no sign-up, no watermark. Learn what to include and how a payment receipt differs from an invoice.",
    excerpt:
      "Six steps to a professional invoice in your browser, what every invoice must include — and how to issue a payment receipt once you are paid.",
    published: "2026-10-13",
    updated: "2026-10-13",
    category: "Invoicing Basics",
    relatedTools: ["general-bill", "payment-receipt", "rent-receipt", "quotation-estimate", "electrician-bill", "plumber-bill", "mechanic-bill"],
    body: [
      {
        t: "p",
        text: "Whether you run a shop, freelance, or fix things for a living, you need to hand customers a proper bill. Spreadsheet templates break when you change a formula, and paid software is overkill for a few bills a month. A free online invoice maker needs only a browser. This guide shows what an invoice must include, how to make one in about a minute with BillsFriend, and how it differs from a **payment receipt** — the document you issue once the money arrives.",
      },
      { t: "h2", id: "what-to-include", text: "What every invoice should include" },
      {
        t: "p",
        text: "Whatever you sell, a clear invoice has the same core parts. If you are GST-registered, a few more are mandatory — see our [GST invoice guide](/blog/how-to-create-gst-invoice).",
      },
      {
        t: "ul",
        items: [
          "**Your details:** business or personal name, address, phone and email (plus GSTIN and PAN if you have them).",
          "**Customer details:** name and address.",
          "**Invoice number:** unique and sequential, such as BILL-0042.",
          "**Dates:** the date of issue and, ideally, a due date.",
          "**Itemised list:** description, quantity, rate and amount for every line.",
          "**Totals:** subtotal, any discount, taxes if applicable, and the final amount payable — in numbers and in words.",
          "**Payment details:** bank account, IFSC or UPI ID so the customer knows how to pay.",
          "**Terms and signature:** payment terms, notes, and an authorised signature.",
        ],
      },
      { t: "h2", id: "steps", text: "How to make an invoice online for free in 6 steps" },
      {
        t: "steps",
        items: [
          { title: "Pick the right format", text: "Selling goods in a shop? Use the [general bill / cash memo](/general-bill). GST-registered? Use the [GST invoice](/gst-invoice). Electrician, plumber or mechanic? There are dedicated formats for [electricians](/electrician-bill), [plumbers](/plumber-bill) and [garages](/mechanic-bill). Need to quote first? Use the [quotation maker](/quotation-estimate)." },
          { title: "Enter your business details once", text: "Add your name, address and contact details, and a logo if you like. BillsFriend remembers them in your browser so the next bill starts pre-filled." },
          { title: "Add your customer", text: "Type the customer's name and address, and their phone number if you want it printed on the bill." },
          { title: "List the items", text: "Add each product or service with quantity, unit and rate. Mix parts and labour where the format allows it. Totals, discounts and amount in words calculate as you type. Press **Sample** to see a filled example first." },
          { title: "Add payment details", text: "Enter your UPI ID to print a scannable payment QR code, and add bank details and payment terms so there is no confusion about how and when to pay." },
          { title: "Preview and download", text: "Check the live A4 preview, press **Download PDF** and choose “Save as PDF”. Share the file on WhatsApp or email, or print it. Press **Save** to keep a copy in My Documents." },
        ],
      },
      {
        t: "img",
        src: "/blog/payment-receipt-sample.webp",
        alt: "Sample payment receipt created with BillsFriend: a ruled voucher stating a sum received with the amount in words, payment mode, transaction reference and balance due, with a receiver's signature line",
        caption: "A payment receipt in the traditional “received with thanks” voucher format (fictional data).",
        width: 900,
        height: 618,
      },
      { t: "h2", id: "comparison", text: "Free invoice maker vs spreadsheet vs paid software" },
      {
        t: "table",
        head: ["Option", "Cost", "Setup", "Best for"],
        rows: [
          ["Online invoice maker (BillsFriend)", "Free", "None — no sign-up", "One-off and small-business bills, tradespeople, freelancers"],
          ["Excel / Google Sheets template", "Free", "Build or download, keep formulas intact", "Fully custom layouts"],
          ["Paid accounting software", "Monthly subscription", "Account and onboarding", "Inventory, GST filing, e-invoicing, many users"],
        ],
      },
      { t: "h2", id: "invoice-vs-receipt", text: "Invoice vs payment receipt: what is the difference?" },
      {
        t: "p",
        text: "An **invoice** asks for payment. It is issued when you sell, and states what is owed and by when. A **payment receipt** confirms that payment has arrived. It is issued when you are paid, and states how much was received, by whom and how. Many customers — especially businesses claiming expenses — will ask for both.",
      },
      {
        t: "table",
        head: ["", "Invoice", "Payment receipt"],
        rows: [
          ["Purpose", "Request payment", "Confirm payment received"],
          ["Issued", "When goods or services are supplied", "When money is received"],
          ["Key details", "Items, rates, taxes, due date", "Amount received, payment mode, reference, balance due"],
          ["Who needs it", "Customer, to pay and to book the expense", "Customer, as proof of payment"],
        ],
      },
      { t: "h2", id: "payment-receipt-steps", text: "How to make a payment receipt" },
      {
        t: "ol",
        items: [
          "Open the free [payment receipt generator](/payment-receipt).",
          "Enter who received the money and who paid it.",
          "Fill in the amount, the payment mode (cash, UPI, NEFT or cheque), the transaction or cheque reference, and what the payment was for — for example “Invoice BILL-0042”.",
          "If it is a part payment, enter the balance due so both sides have a clear record.",
          "Download the PDF and send it to the payer. Issue a fresh receipt for every instalment.",
        ],
      },
      {
        t: "p",
        text: "Renting out a property? Tenants use monthly proof of rent to claim HRA, and the [rent receipt generator](/rent-receipt) is set up for exactly that. If you take an advance payment against future services in a GST-registered business, GST law may require a receipt voucher, so check with your accountant.",
      },
      { t: "h2", id: "get-paid-faster", text: "Tips to get paid faster" },
      {
        t: "ul",
        items: [
          "**Invoice the same day** the work is done, while it is fresh.",
          "**Put a due date on it** — “payment due in 7 days” works better than nothing.",
          "**Make paying effortless:** a UPI QR code on the bill removes the need to type details.",
          "**Number invoices consistently** so both of you can find them later.",
          "**Spell out late-payment terms** in the notes, even a single line.",
          "**Send a polite reminder** with the PDF attached the day after the due date.",
        ],
      },
      { t: "h2", id: "records", text: "Keep your records safe" },
      {
        t: "p",
        text: "BillsFriend stores your saved documents only in your own browser — nothing is uploaded. That is great for privacy, but clearing your browser data also clears your saved bills. For anything you may need later, use the **JSON** button to export a backup and keep the PDF alongside your accounts.",
      },
      {
        t: "cta",
        text: "Make your first invoice now. Pick a format, fill in the details and download a clean A4 PDF in about a minute.",
        to: "/general-bill",
        label: "Make a free invoice",
      },
    ],
    faqs: [
      {
        q: "Is it really free to make an invoice online?",
        a: "Yes. BillsFriend has no sign-up, no limit on the number of invoices and no watermark on the PDF.",
      },
      {
        q: "Do I need an account to make an invoice?",
        a: "No. Everything runs in your browser. Your business details and saved documents stay on your own device.",
      },
      {
        q: "Can I add my logo and a payment QR code?",
        a: "Yes. Upload a logo, and enter your UPI ID to print a scannable payment QR code on the bill.",
      },
      {
        q: "Is a free online invoice legally valid?",
        a: "An invoice is a commercial record of a sale. GST-registered businesses must also include the particulars required by GST law, so use the GST invoice format if that applies to you.",
      },
      {
        q: "What is the difference between an invoice and a payment receipt?",
        a: "An invoice requests payment for goods or services supplied. A payment receipt confirms that the payment has been received.",
      },
    ],
  },
];

// -------------------------------------------------------------------- helpers
export const getPost = (slug: string | undefined): BlogPost | undefined => BLOG_POSTS.find((p) => p.slug === slug);

export const postsForTool = (toolId: string): BlogPost[] => BLOG_POSTS.filter((p) => p.relatedTools.includes(toolId));

export const otherPosts = (slug: string, n = 3): BlogPost[] => BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, n);

export const postPath = (p: BlogPost): string => `/blog/${p.slug}`;

const stripMarkup = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function postText(p: BlogPost): string {
  const parts: string[] = [];
  for (const b of p.body) {
    if (b.t === "p" || b.t === "callout" || b.t === "cta") parts.push(stripMarkup(b.text));
    else if (b.t === "h2") parts.push(b.text);
    else if (b.t === "ul" || b.t === "ol") parts.push(...b.items.map(stripMarkup));
    else if (b.t === "steps") parts.push(...b.items.map((s) => `${s.title} ${stripMarkup(s.text)}`));
    else if (b.t === "table") parts.push(...b.rows.map((r) => r.map(stripMarkup).join(" ")));
  }
  return parts.join(" ");
}

export const readingMinutes = (p: BlogPost): number => Math.max(1, Math.round(postText(p).split(/\s+/).length / 200));

export type InlineToken = { k: "text" | "bold" | "em"; v: string } | { k: "link"; v: string; href: string };

/** Splits **bold**, *italic* and [label](href) markup into tokens. */
export function parseInline(text: string): InlineToken[] {
  const out: InlineToken[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ k: "text", v: text.slice(last, i) });
    const tok = m[0];
    if (tok.startsWith("**")) out.push({ k: "bold", v: tok.slice(2, -2) });
    else if (tok.startsWith("*")) out.push({ k: "em", v: tok.slice(1, -1) });
    else {
      const mm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok)!;
      out.push({ k: "link", v: mm[1], href: mm[2] });
    }
    last = i + tok.length;
  }
  if (last < text.length) out.push({ k: "text", v: text.slice(last) });
  return out;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function inlineHtml(text: string): string {
  return parseInline(text)
    .map((t) => (t.k === "bold" ? `<strong>${esc(t.v)}</strong>` : t.k === "em" ? `<em>${esc(t.v)}</em>` : t.k === "link" ? `<a href="${esc(t.href)}">${esc(t.v)}</a>` : esc(t.v)))
    .join("");
}

/** Static HTML for a post body — used for the crawlable <noscript> block at build time. */
export function bodyHtml(p: BlogPost): string {
  return p.body
    .map((b) => {
      switch (b.t) {
        case "h2": return `<h2 id="${esc(b.id)}">${esc(b.text)}</h2>`;
        case "p": return `<p>${inlineHtml(b.text)}</p>`;
        case "ul": return `<ul>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join("")}</ul>`;
        case "ol": return `<ol>${b.items.map((i) => `<li>${inlineHtml(i)}</li>`).join("")}</ol>`;
        case "steps": return `<ol>${b.items.map((s) => `<li><strong>${esc(s.title)}.</strong> ${inlineHtml(s.text)}</li>`).join("")}</ol>`;
        case "table":
          return `<table><thead><tr>${b.head.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inlineHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
        case "callout": return `<aside><strong>${esc(b.title)}.</strong> ${inlineHtml(b.text)}</aside>`;
        case "img": return `<figure><img src="${esc(b.src)}" alt="${esc(b.alt)}" width="${b.width}" height="${b.height}" /><figcaption>${esc(b.caption)}</figcaption></figure>`;
        case "cta": return `<p>${inlineHtml(b.text)} <a href="${esc(b.to)}">${esc(b.label)}</a></p>`;
      }
    })
    .join("\n");
}
