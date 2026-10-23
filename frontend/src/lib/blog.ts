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

export const BLOG_AUTHOR = "BillsFreind Team";

// -------------------------------------------------------------------- posts
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "gst-invoice-vs-bill-of-supply",
    title: "GST Invoice vs Bill of Supply: What's the Difference?",
    seoTitle: "GST Invoice vs Bill of Supply: What's the Difference?",
    description:
      "GST tax invoice vs bill of supply explained: who issues which, what each must contain, input tax credit impact and common mistakes — in plain language.",
    excerpt:
      "A tax invoice charges GST; a bill of supply does not. Learn who must issue which, what each document contains and what it means for the buyer's input tax credit.",
    published: "2026-10-23",
    updated: "2026-10-23",
    category: "GST Guide",
    relatedTools: ["gst-invoice", "general-bill", "quotation-estimate", "delivery-challan"],
    body: [
      {
        t: "p",
        text: "Indian businesses often use the words “invoice” and “bill” as if they mean the same thing. Under GST they do not. A **tax invoice** and a **bill of supply** are two different documents, issued in different situations, and using the wrong one can cost your customer their input tax credit or leave you out of step with the law. This guide explains the difference in plain language, with a quick table and examples.",
      },
      { t: "h2", id: "short-answer", text: "The short answer" },
      {
        t: "p",
        text: "A **GST tax invoice** is issued when you supply taxable goods or services and charge GST. A **bill of supply** is issued when you do **not** charge GST — either because you are a composition-scheme dealer, or because what you are supplying is exempt from GST. Both are required by Section 31 of the CGST Act, 2017: the tax invoice is covered in detail by Rule 46 of the CGST Rules, and the bill of supply by Rule 49.",
      },
      {
        t: "table",
        caption: "GST tax invoice vs bill of supply at a glance",
        head: ["", "GST tax invoice", "Bill of supply"],
        rows: [
          ["Charges GST?", "Yes — tax is shown separately", "No — no tax is charged or shown"],
          ["Issued by", "Regular GST-registered suppliers of taxable goods or services", "Composition-scheme dealers; suppliers of exempt goods or services"],
          ["Buyer can claim ITC?", "Yes, if the buyer is eligible and the details are correct", "No — there is no GST to claim"],
          ["Tax columns", "Rate, CGST + SGST or IGST, cess where applicable", "None"],
          ["Place of supply", "Shown for inter-state supplies", "Not required"],
          ["Governing rule", "Rule 46, CGST Rules", "Rule 49, CGST Rules"],
          ["Document title", "Tax Invoice", "Bill of Supply"],
        ],
      },
      { t: "h2", id: "what-is-tax-invoice", text: "What is a GST tax invoice?" },
      {
        t: "p",
        text: "A tax invoice is the document a registered supplier issues for a taxable supply. It shows the value of the supply, the GST rate and the GST charged — split into CGST and SGST for in-state sales or IGST for inter-state sales. Because the tax is itemised, the buyer can use the invoice to claim input tax credit (ITC). The full list of mandatory details is in our guide on [how to create a GST invoice](/blog/how-to-create-gst-invoice).",
      },
      { t: "h2", id: "what-is-bill-of-supply", text: "What is a bill of supply?" },
      {
        t: "p",
        text: "A bill of supply is a simpler document. It records what was supplied and its value, but it carries no tax, because none is being collected. Section 31(3)(c) of the CGST Act requires a registered person who supplies exempt goods or services, or who pays tax under the composition scheme, to issue one instead of a tax invoice.",
      },
      { t: "h2", id: "who-issues-which", text: "Who issues which document?" },
      {
        t: "ul",
        items: [
          "**Regular GST-registered supplier of taxable goods or services:** tax invoice.",
          "**Composition-scheme dealer:** bill of supply, always. A composition dealer cannot collect GST from customers, so it cannot issue a tax invoice.",
          "**Registered supplier of exempt or nil-rated goods or services:** bill of supply for those supplies. Examples include certain healthcare and educational services and fresh produce that is exempt under the GST notifications. Whether something is exempt depends on the notification for that item, so verify the entry for what you sell.",
          "**Supplier of both taxable and exempt items:** a tax invoice for the taxable supplies and a bill of supply for the exempt ones — or a single invoice-cum-bill of supply in the case described below.",
          "**Business that is not registered under GST:** neither document. It cannot charge GST, so it issues an ordinary bill or cash memo.",
        ],
      },
      { t: "h2", id: "bill-of-supply-contents", text: "What a bill of supply must contain" },
      {
        t: "p",
        text: "Rule 49 lists the particulars. In summary, a bill of supply must show:",
      },
      {
        t: "ul",
        items: [
          "Supplier's **name, address and GSTIN**",
          "A **consecutive serial number** of up to 16 characters, unique for the financial year (letters, numbers, hyphen and slash only)",
          "**Date of issue**",
          "Recipient's **name, address and GSTIN or UIN**, if the recipient is registered",
          "**HSN code** for goods or **SAC** for services, where applicable",
          "**Description** of the goods or services",
          "**Value of supply**, after any discount or abatement",
          "**Signature or digital signature** of the supplier or authorised representative",
        ],
      },
      {
        t: "callout",
        title: "Composition dealers",
        text: "A composition dealer must also state on the bill of supply, at the top, that it is a “composition taxable person, not eligible to collect tax on supplies”. That wording tells the buyer why no GST appears on the bill.",
      },
      {
        t: "p",
        text: "The rules also allow relief for very small sales. For supplies below ₹200 to an unregistered buyer who does not ask for a bill, a bill of supply need not be issued for each sale, provided a consolidated bill of supply is issued at the end of the day. Check Rule 49 for the exact conditions.",
      },
      { t: "h2", id: "invoice-cum-bill", text: "What is an invoice-cum-bill of supply?" },
      {
        t: "p",
        text: "Imagine a grocery shop that sells exempt items and taxable items to a walk-in customer in one purchase. Rule 46A allows a registered person who supplies taxable and exempt goods or services to an **unregistered** buyer to issue one combined document, an “invoice-cum-bill of supply”, instead of two separate bills. Where the buyer is a registered business that needs to claim ITC, keep the taxable and exempt supplies clearly separate.",
      },
      { t: "h2", id: "which-to-issue", text: "Which one should you issue? Common situations" },
      {
        t: "table",
        head: ["Your situation", "Document to issue"],
        rows: [
          ["Regular registered dealer selling taxable goods or services", "Tax invoice"],
          ["Composition-scheme dealer", "Bill of supply (with the composition wording)"],
          ["Registered supplier whose supply is wholly exempt", "Bill of supply"],
          ["Registered supplier selling taxable and exempt items to an unregistered buyer", "Invoice-cum-bill of supply, or two separate documents"],
          ["Business with no GST registration", "Plain bill or cash memo — no GST shown"],
        ],
      },
      { t: "h2", id: "itc-impact", text: "What it means for the buyer's input tax credit" },
      {
        t: "p",
        text: "Input tax credit lets a registered buyer subtract the GST paid on purchases from the GST owed on sales. That only works if the purchase was supported by a **tax invoice** that shows the GST. A bill of supply carries no GST, so there is nothing to claim. If you are a buyer and a registered supplier has given you a bill of supply for a taxable purchase, ask why. If you are a seller, remember that issuing the wrong document can hurt your customer.",
      },
      { t: "h2", id: "mistakes", text: "5 common mistakes to avoid" },
      {
        t: "ol",
        items: [
          "**Charging GST on a bill of supply**, or showing a tax column on it. A composition dealer in particular must not collect tax.",
          "**Issuing a tax invoice from a composition registration.** The two cannot go together.",
          "**Leaving out the composition wording** on a composition dealer's bill of supply.",
          "**Skipping the customer's GSTIN** when the customer is registered.",
          "**Duplicate or non-sequential numbers.** Each document series must be consecutive.",
        ],
      },
      { t: "h2", id: "billsfreind", text: "Making these documents with BillsFreind" },
      {
        t: "p",
        text: "If you are a regular GST-registered seller, the free [GST tax invoice generator](/gst-invoice) produces a Rule 46 style invoice with HSN/SAC codes, a CGST/SGST or IGST split, place of supply and amount in words. If you are not registered, the [general bill / cash memo](/general-bill) is the right format. BillsFreind does not yet have a dedicated bill-of-supply format, so composition and exempt suppliers should make sure whatever they issue is titled “Bill of Supply” and carries the particulars listed above. Wondering how the tax on an invoice is worked out? See [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice).",
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains common GST documentation rules in plain language. It is not tax or legal advice. Rules, rates and exemptions change, so confirm your position with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "cta",
        text: "Registered and charging GST? Fill in the form, check the live preview and download a print-ready A4 tax invoice — free, with no sign-up and no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      {
        q: "What is the difference between a GST invoice and a bill of supply?",
        a: "A GST tax invoice charges GST and shows the tax separately, so the buyer can claim input tax credit. A bill of supply is issued when no GST is charged — by composition-scheme dealers and for exempt supplies — and shows no tax.",
      },
      {
        q: "Can a composition dealer issue a tax invoice?",
        a: "No. A composition dealer cannot collect GST from customers, so it issues a bill of supply instead.",
      },
      {
        q: "Can the buyer claim input tax credit on a bill of supply?",
        a: "No. A bill of supply carries no GST, so there is no tax credit to claim. Only a valid tax invoice showing the GST supports an ITC claim.",
      },
      {
        q: "Is a bill of supply mandatory?",
        a: "Yes, for a registered person who supplies exempt goods or services or who is under the composition scheme, subject to the small-value relief in the rules. A business that is not GST-registered does not issue one.",
      },
      {
        q: "Does a bill of supply need a GSTIN?",
        a: "It must show the supplier's GSTIN. The recipient's GSTIN or UIN is required if the recipient is registered.",
      },
    ],
  },

  {
    slug: "how-to-calculate-gst-on-invoice",
    title: "How to Calculate GST on an Invoice (With Examples)",
    seoTitle: "How to Calculate GST on an Invoice (With Examples)",
    description:
      "Learn how to calculate GST on an invoice: add or remove GST, apply discounts, split CGST/SGST/IGST and handle mixed rates — with worked examples.",
    excerpt:
      "The GST formula, how to add GST to a price or remove it from a GST-inclusive price, and worked examples with discounts, CGST/SGST/IGST and multiple rates.",
    published: "2026-10-23",
    updated: "2026-10-23",
    category: "GST Guide",
    relatedTools: ["gst-invoice", "quotation-estimate", "purchase-order", "electrician-bill", "plumber-bill", "mechanic-bill"],
    body: [
      {
        t: "p",
        text: "Calculating GST on an invoice is simple arithmetic once you know three things: the **taxable value**, the **GST rate** and whether the sale is **within one state or between states**. This guide walks through the formulas and worked examples for the situations you meet most often — adding GST to a price, removing GST from a GST-inclusive price, giving a discount, and billing items with different rates on one invoice.",
      },
      { t: "h2", id: "formula", text: "The basic GST formula" },
      {
        t: "ul",
        items: [
          "**GST amount = taxable value × GST rate ÷ 100**",
          "**Invoice total = taxable value + GST amount**",
        ],
      },
      {
        t: "p",
        text: "For example, GST at 18% on ₹1,000 is ₹1,000 × 18 ÷ 100 = ₹180, so the invoice total is ₹1,180. The same ₹1,000 at other common rates:",
      },
      {
        t: "table",
        caption: "GST on ₹1,000 at common rates",
        head: ["GST rate", "GST amount", "Invoice total"],
        rows: [
          ["5%", "₹50", "₹1,050"],
          ["18%", "₹180", "₹1,180"],
          ["40%", "₹400", "₹1,400"],
        ],
      },
      { t: "h2", id: "taxable-value", text: "What counts as the taxable value?" },
      {
        t: "p",
        text: "GST is charged on the **value of the supply** — the price the buyer pays for the goods or services, before GST. Under Section 15 of the CGST Act, incidental charges the supplier bills along with the supply, such as packing or commission, are generally part of the taxable value. A discount given at the time of supply and shown on the invoice reduces it. If you are unsure how a particular charge is treated, ask your chartered accountant.",
      },
      { t: "h2", id: "add-gst", text: "Example 1: Adding GST to a price" },
      {
        t: "p",
        text: "You sell goods for ₹8,500 before tax, and the GST rate is 18%.",
      },
      {
        t: "ul",
        items: [
          "GST = 8,500 × 18 ÷ 100 = **₹1,530**",
          "Invoice total = 8,500 + 1,530 = **₹10,030**",
        ],
      },
      { t: "h2", id: "remove-gst", text: "Example 2: Removing GST from a GST-inclusive price" },
      {
        t: "p",
        text: "Sometimes you only know the final, GST-inclusive price and need to work out how much of it is tax. Reverse the formula:",
      },
      {
        t: "ul",
        items: [
          "**Taxable value = inclusive price × 100 ÷ (100 + GST rate)**",
          "**GST amount = inclusive price − taxable value**",
        ],
      },
      {
        t: "table",
        caption: "Splitting GST-inclusive prices",
        head: ["Inclusive price", "GST rate", "Taxable value", "GST amount"],
        rows: [
          ["₹11,800", "18%", "₹10,000", "₹1,800"],
          ["₹2,360", "18%", "₹2,000", "₹360"],
          ["₹1,050", "5%", "₹1,000", "₹50"],
        ],
      },
      {
        t: "p",
        text: "Take the first row: 11,800 × 100 ÷ 118 = 10,000, so the GST is 11,800 − 10,000 = 1,800. Note that you cannot simply take 18% of ₹11,800 — that would give ₹2,124, which is wrong because the 18% applies to the price *before* tax.",
      },
      { t: "h2", id: "discount", text: "Example 3: GST when you give a discount" },
      {
        t: "p",
        text: "When the discount is given at the time of supply and shown on the invoice, GST is calculated on the **discounted** value. You sell goods worth ₹20,000 with a 10% discount, at 18% GST, within one state:",
      },
      {
        t: "table",
        head: ["Step", "Calculation", "Amount"],
        rows: [
          ["Price before discount", "", "₹20,000"],
          ["Discount @ 10%", "20,000 × 10%", "− ₹2,000"],
          ["Taxable value", "20,000 − 2,000", "₹18,000"],
          ["CGST @ 9%", "18,000 × 9%", "₹1,620"],
          ["SGST @ 9%", "18,000 × 9%", "₹1,620"],
          ["**Invoice total**", "18,000 + 3,240", "**₹21,240**"],
        ],
      },
      { t: "h2", id: "cgst-sgst-igst", text: "CGST, SGST and IGST: how the tax is split" },
      {
        t: "p",
        text: "The total GST is the same either way — only the split changes. For a **sale within one state**, the GST is divided equally into CGST (Centre) and SGST (State), each at half the rate. For a **sale between two states**, the whole amount is charged as IGST. On a taxable value of ₹10,000 at 18%, that is ₹900 CGST + ₹900 SGST within a state, or ₹1,800 IGST between states. Our guide on [how to create a GST invoice](/blog/how-to-create-gst-invoice) explains how to decide which applies.",
      },
      { t: "h2", id: "multiple-rates", text: "Example 4: An invoice with different GST rates" },
      {
        t: "p",
        text: "Calculate GST on each line at its own rate, then add up. Here is a within-state invoice with three items:",
      },
      {
        t: "table",
        caption: "Line-by-line GST calculation",
        head: ["Item", "Qty × rate", "Taxable value", "GST rate", "GST"],
        rows: [
          ["Item A", "10 × ₹500", "₹5,000", "5%", "₹250"],
          ["Item B", "4 × ₹1,200", "₹4,800", "18%", "₹864"],
          ["Item C", "2 × ₹750", "₹1,500", "18%", "₹270"],
          ["**Total**", "", "**₹11,300**", "", "**₹1,384**"],
        ],
      },
      {
        t: "ul",
        items: [
          "CGST = 1,384 ÷ 2 = **₹692**, SGST = **₹692**",
          "Invoice total = 11,300 + 1,384 = **₹12,684**",
        ],
      },
      { t: "h2", id: "gst-rates", text: "Which GST rate applies?" },
      {
        t: "p",
        text: "The rate depends on the HSN/SAC code of what you sell. Since the GST rate rationalisation on 22 September 2025, most goods and services are taxed at **5% or 18%**, with **40%** on a small list of select items, alongside 0% for exempt and nil-rated items and special rates such as 3% on gold. Always confirm the rate for your specific HSN/SAC code on the official GST portal or with your chartered accountant, because rates can be revised.",
      },
      { t: "h2", id: "rounding", text: "Rounding off the invoice total" },
      {
        t: "p",
        text: "Calculations often end in paise. Say three items at ₹999 each are taxed at 18%: taxable value ₹2,997, GST ₹539.46, total ₹3,536.46. Many businesses show a round-off line so the amount payable is a whole rupee — here, −₹0.46, making ₹3,536. The round-off is only a presentation of the total; the tax amounts themselves should be shown accurately.",
      },
      { t: "h2", id: "billsfreind", text: "Let the GST invoice generator do the maths" },
      {
        t: "steps",
        items: [
          { title: "Open the generator", text: "Go to the free [GST tax invoice generator](/gst-invoice) — no sign-up needed." },
          { title: "Choose the supply type", text: "Pick **Within state (CGST + SGST)** or **Inter-state (IGST)**. The tax is split for you." },
          { title: "Add items with their own GST rate", text: "Enter the description, HSN/SAC code, quantity, rate and GST rate on every line. Enter the rate **before** GST — the generator adds the tax on top, so if you only know a GST-inclusive price, convert it with the formula above first." },
          { title: "Add a discount if needed", text: "Enter a discount percentage. GST is calculated on each line after the discount." },
          { title: "Download the PDF", text: "Totals, tax split, round-off and amount in words update live. Press **Download PDF** and choose “Save as PDF”." },
        ],
      },
      { t: "h2", id: "mistakes", text: "5 common GST calculation mistakes" },
      {
        t: "ol",
        items: [
          "**Taking GST on a GST-inclusive price** instead of extracting it with the reverse formula.",
          "**Charging GST before subtracting a discount** that was given on the invoice.",
          "**Applying one rate to every line** when the items attract different rates.",
          "**Charging CGST + SGST on an inter-state sale**, or IGST on a local one.",
          "**Using an outdated rate.** Check the current rate for your HSN/SAC code.",
        ],
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains how to work out GST on an invoice. It is not tax or legal advice. Rates, rules and exemptions change, so confirm details with a chartered accountant before filing returns. See our [disclaimer](/disclaimer).",
      },
      {
        t: "cta",
        text: "Skip the manual maths. Add your items, pick the GST rate and download an invoice with the tax already calculated — free, with no sign-up and no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      {
        q: "What is the formula to calculate GST on an invoice?",
        a: "GST amount = taxable value × GST rate ÷ 100, and invoice total = taxable value + GST amount. For example, 18% GST on ₹1,000 is ₹180, so the total is ₹1,180.",
      },
      {
        q: "How do I calculate GST from a GST-inclusive price?",
        a: "Divide the inclusive price by (100 + GST rate) and multiply by 100 to get the taxable value; the rest is GST. For ₹11,800 at 18%, taxable value is ₹10,000 and GST is ₹1,800.",
      },
      {
        q: "How are CGST and SGST calculated?",
        a: "For a sale within one state, total GST is split equally. At an 18% rate, CGST is 9% and SGST is 9% of the taxable value. For an inter-state sale, the full 18% is charged as IGST.",
      },
      {
        q: "Is GST calculated before or after a discount?",
        a: "When the discount is given at the time of supply and shown on the invoice, GST is calculated on the value after the discount.",
      },
      {
        q: "Can I calculate GST on an invoice for free?",
        a: "Yes. BillsFreind's GST invoice generator calculates the tax, the CGST/SGST or IGST split and the total automatically — free, with no sign-up and no watermark.",
      },
    ],
  },

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
          "**Composition-scheme dealers** cannot charge GST on their sales. They issue a *bill of supply* instead — see [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply).",
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
        text: "BillsFreind's GST invoice uses the boxed layout Indian businesses actually print, with an HSN-wise tax summary, amount in words, a bank-details block, a UPI QR code and signature lines. You remain responsible for the accuracy of the details you enter.",
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
        alt: "Sample GST tax invoice created with BillsFreind, showing supplier and buyer details, HSN-coded line items, an HSN-wise CGST and SGST summary, amount in words and signature lines",
        caption: "A sample GST tax invoice (fictional business data) generated with BillsFreind.",
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
          "**Numbering:** consecutive, never repeated within a financial year. You may run separate series (for example one per branch), each consecutive. BillsFreind auto-increments the number for every document type.",
          "**Copies:** for goods, three — original for the recipient, duplicate for the transporter, triplicate for the supplier. For services, two — original for the recipient and duplicate for the supplier.",
          "**When to issue (goods):** on or before removal of the goods, or on or before delivery if they do not move.",
          "**When to issue (services):** within 30 days of the supply (45 days for banks and NBFCs).",
          "**Corrections:** once issued, mistakes are generally fixed with a credit note or debit note rather than by editing the original.",
        ],
      },
      { t: "h2", id: "e-invoicing", text: "E-invoicing: does it apply to you?" },
      {
        t: "p",
        text: "E-invoicing — registering each B2B invoice on the government's Invoice Registration Portal to get an IRN and QR code — is mandatory for businesses with aggregate turnover of ₹5 crore or more, in force since 1 August 2023. Below that limit, a normal PDF invoice with the mandatory details is enough. BillsFreind does not connect to the e-invoice portal, so it is designed for businesses under the threshold.",
      },
      { t: "h2", id: "mistakes", text: "6 common GST invoice mistakes" },
      {
        t: "ol",
        items: [
          "**Wrong or missing customer GSTIN** — the buyer cannot claim ITC.",
          "**Charging CGST + SGST on an inter-state sale** (or IGST on a local one).",
          "**Leaving out the HSN/SAC code** where it is required.",
          "**Duplicate or non-sequential invoice numbers.**",
          "**Issuing a tax invoice when you should issue a bill of supply** (composition dealers, exempt supplies) — see [the difference](/blog/gst-invoice-vs-bill-of-supply).",
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
        a: "Yes. BillsFreind's GST invoice generator is free with unlimited invoices, no sign-up and no watermark. You fill in the form and download a PDF.",
      },
      {
        q: "Is a PDF GST invoice valid?",
        a: "Yes, an electronic invoice is accepted as long as it carries all the mandatory particulars. If your business is liable for e-invoicing, it must also carry the IRN and QR code generated by the government portal.",
      },
      {
        q: "What is the difference between a tax invoice and a bill of supply?",
        a: "A tax invoice charges GST and lets the buyer claim input tax credit. A bill of supply is issued by composition-scheme dealers and for exempt supplies, and does not show tax. Read the full comparison in our guide to GST invoice vs bill of supply.",
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
    seoTitle: "How to Make an Invoice Online for Free | BillsFreind",
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
        text: "Whether you run a shop, freelance, or fix things for a living, you need to hand customers a proper bill. Spreadsheet templates break when you change a formula, and paid software is overkill for a few bills a month. A free online invoice maker needs only a browser. This guide shows what an invoice must include, how to make one in about a minute with BillsFreind, and how it differs from a **payment receipt** — the document you issue once the money arrives.",
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
          { title: "Enter your business details once", text: "Add your name, address and contact details, and a logo if you like. BillsFreind remembers them in your browser so the next bill starts pre-filled." },
          { title: "Add your customer", text: "Type the customer's name and address, and their phone number if you want it printed on the bill." },
          { title: "List the items", text: "Add each product or service with quantity, unit and rate. Mix parts and labour where the format allows it. Totals, discounts and amount in words calculate as you type. Press **Sample** to see a filled example first." },
          { title: "Add payment details", text: "Enter your UPI ID to print a scannable payment QR code, and add bank details and payment terms so there is no confusion about how and when to pay." },
          { title: "Preview and download", text: "Check the live A4 preview, press **Download PDF** and choose “Save as PDF”. Share the file on WhatsApp or email, or print it. Press **Save** to keep a copy in My Documents." },
        ],
      },
      {
        t: "img",
        src: "/blog/payment-receipt-sample.webp",
        alt: "Sample payment receipt created with BillsFreind: a ruled voucher stating a sum received with the amount in words, payment mode, transaction reference and balance due, with a receiver's signature line",
        caption: "A payment receipt in the traditional “received with thanks” voucher format (fictional data).",
        width: 900,
        height: 618,
      },
      { t: "h2", id: "comparison", text: "Free invoice maker vs spreadsheet vs paid software" },
      {
        t: "table",
        head: ["Option", "Cost", "Setup", "Best for"],
        rows: [
          ["Online invoice maker (BillsFreind)", "Free", "None — no sign-up", "One-off and small-business bills, tradespeople, freelancers"],
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
        text: "BillsFreind stores your saved documents only in your own browser — nothing is uploaded. That is great for privacy, but clearing your browser data also clears your saved bills. For anything you may need later, use the **JSON** button to export a backup and keep the PDF alongside your accounts.",
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
        a: "Yes. BillsFreind has no sign-up, no limit on the number of invoices and no watermark on the PDF.",
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
