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
  /** Target search phrases — published as BlogPosting.keywords (not shown on page). */
  keywords?: string[];
  body: Block[];
  faqs: Array<{ q: string; a: string }>;
}

export const BLOG_AUTHOR = "BillsFreind Team";

// -------------------------------------------------------------------- posts
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-make-ac-repair-service-bill",
    title: "How to Make an AC Repair Service Bill",
    seoTitle: "AC Repair Service Bill: Format and Example (Free)",
    description:
      "How to make an AC repair or service bill: what to write for gas refill, parts and labour, how to word the warranty, and a free AC bill generator.",
    excerpt:
      "A technician's slip that just says “AC service – ₹2,500” starts arguments later. Here is what to put on an AC repair bill, with an example you can copy.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "Service Bills",
    relatedTools: ["ac-repair-bill", "electrician-bill", "general-bill"],
    keywords: ["AC repair bill", "AC service bill format", "AC repair invoice", "AC gas refill bill", "AC service receipt"],
    body: [
      {
        t: "p",
        text: "Most AC jobs end the same way: the technician is paid in cash, maybe writes a number on a scrap of paper, and leaves. Two weeks later the AC is not cooling again, the customer says “you only just fixed it”, and nobody can say what was actually done. A proper bill settles that argument before it starts. It also gives the customer something to show a housing society, landlord or office accounts team.",
      },
      { t: "h2", id: "what-goes-on-it", text: "What an AC repair bill needs to show" },
      {
        t: "p",
        text: "You don't need anything fancy. You need enough detail that someone reading it a year later understands the job.",
      },
      {
        t: "ul",
        items: [
          "Your business name, phone number and address (plus GSTIN if you are registered)",
          "Customer name and the address where the AC is installed — this matters for flats and offices with several units",
          "Date of service and a bill number",
          "The AC itself: make, type (split or window) and capacity, for example “Split, 1.5 ton, 3 star”",
          "What you did: servicing, repair, gas top-up, installation, or an annual maintenance visit",
          "Parts replaced, one line each, with quantity and price",
          "Labour or service charge, kept separate from parts",
          "Warranty terms, in plain words",
          "Total, how it was paid, and your signature",
        ],
      },
      { t: "h2", id: "gas-and-parts", text: "Gas refills and spare parts deserve their own lines" },
      {
        t: "p",
        text: "“Gas charges ₹1,800” is the line customers question most. Write the refrigerant type (R32 and R410A are the common ones in newer split ACs) and say it was a top-up or a full refill. If you replaced a capacitor, fan motor, sensor or PCB, name the part. Customers rarely check, but a named part is proof the work happened, and it protects you if the same part fails and someone claims you never touched it.",
      },
      {
        t: "table",
        caption: "Example AC service bill (fictional figures — your local rates will differ)",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Running capacitor 35 µF (replaced)", "1", "₹450", "₹450"],
          ["R32 gas top-up", "1", "₹1,800", "₹1,800"],
          ["Split AC jet-wash service, indoor and outdoor unit", "1", "₹700", "₹700"],
          ["Visit and diagnosis charges", "1", "₹250", "₹250"],
          ["**Total**", "", "", "**₹3,200**"],
        ],
      },
      { t: "h2", id: "warranty-wording", text: "How to word the warranty" },
      {
        t: "p",
        text: "Vague promises like “service guarantee” cause trouble. Say exactly what is covered and for how long. For example: “30 days on gas top-up and servicing, 3 months on the replaced capacitor. Compressor and PCB are covered only by the manufacturer's warranty.” If you don't offer a warranty on something, say so. Customers respect a clear “no” more than a fuzzy “yes”.",
      },
      { t: "h2", id: "gst", text: "Do you need to add GST?" },
      {
        t: "p",
        text: "Only if you are registered. Service providers generally have to register once yearly turnover crosses ₹20 lakh (₹10 lakh in some special-category states), though the limit can differ for inter-state work, so check with your accountant. If you are registered, your bill should be a proper GST invoice; our guide on [how to create a GST invoice](/blog/how-to-create-gst-invoice) lists what it must contain. If you are not registered, do not add GST to the bill. The AC bill generator has GST as an option you can switch on or off.",
      },
      { t: "h2", id: "make-it", text: "Making the bill in BillsFreind" },
      {
        t: "steps",
        items: [
          { title: "Open the AC bill generator", text: "Go to the free [AC repair bill generator](/ac-repair-bill). It needs no sign-up." },
          { title: "Fill in who and where", text: "Add your details once (they are remembered in your browser), then the customer and the site address." },
          { title: "Enter the AC details", text: "Write the make, type and capacity, and what kind of service it was." },
          { title: "Split parts and labour", text: "Add each part as a spare-parts line and each charge as a service line. The totals update as you type." },
          { title: "Add warranty and download", text: "Type the warranty terms, check the preview, then press **Download PDF** and send it on WhatsApp or print it." },
        ],
      },
      { t: "h2", id: "mistakes", text: "Mistakes that cause arguments later" },
      {
        t: "ul",
        items: [
          "One lump sum with no breakdown",
          "No AC make or capacity, so the bill could belong to any unit in the building",
          "No date, which makes warranty claims a guessing game",
          "“Warranty included” with no duration",
          "Mixing the customer's own parts with the ones you supplied",
        ],
      },
      {
        t: "p",
        text: "Other trades follow the same logic: see the [electrician invoice format](/blog/electrician-invoice-format-labour-material-charges), the [cleaning service bill format](/blog/cleaning-service-bill-format-with-example) and our general [service bill format for electricians, plumbers and mechanics](/blog/electrician-plumber-mechanic-bill-format). Once the customer has paid, you can hand over a [payment receipt](/blog/how-to-make-payment-receipt). For numbering your bills in order, read [invoice numbering rules](/blog/invoice-numbering-rules-gst).",
      },
      {
        t: "cta",
        text: "Make an AC service bill in about a minute — free, no sign-up, no watermark.",
        to: "/ac-repair-bill",
        label: "Create an AC repair bill",
      },
    ],
    faqs: [
      {
        q: "What should an AC repair bill include?",
        a: "Your details, the customer and site address, the date, the AC make and capacity, a list of parts replaced, labour or service charges, warranty terms and the total. Add GST only if you are GST-registered.",
      },
      {
        q: "How do I show a gas refill on an AC bill?",
        a: "Give it its own line. Write the refrigerant type, such as R32 or R410A, and whether it was a top-up or a full refill, with the charge.",
      },
      {
        q: "Do I have to charge GST on AC repair?",
        a: "Only if you are registered under GST. Registration is generally needed once a service provider's turnover crosses ₹20 lakh a year (₹10 lakh in some special-category states). Confirm with an accountant.",
      },
      {
        q: "Can I make an AC service bill for free?",
        a: "Yes. BillsFreind's AC repair bill generator is free with no sign-up and no watermark, and it gives you a printable PDF.",
      },
    ],
  },

  {
    slug: "cleaning-service-bill-format-with-example",
    title: "Cleaning Service Bill Format With Example",
    seoTitle: "Cleaning Service Bill Format With Example (Free)",
    description:
      "Cleaning service bill format with a worked example: how to list home, sofa and office cleaning, charge for materials, and bill monthly contracts.",
    excerpt:
      "Home deep-cleans, sofa shampooing and monthly office housekeeping are billed differently. Here is a format that works for each, with a full example.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "Service Bills",
    relatedTools: ["cleaning-bill", "general-bill", "payment-receipt"],
    keywords: ["cleaning service bill format", "cleaning invoice", "house cleaning bill", "deep cleaning invoice", "housekeeping bill format"],
    body: [
      {
        t: "p",
        text: "Cleaning is one of those jobs where the customer can't easily judge what they paid for. The floor is clean, the bathroom shines, and the number at the bottom of the bill looks high or low depending on the mood. A bill that says what was cleaned, how big the place was and when, takes most of that guesswork away.",
      },
      { t: "h2", id: "three-kinds", text: "Three kinds of cleaning job, three ways to bill" },
      {
        t: "ul",
        items: [
          "**One-time jobs** like a home deep clean, post-renovation cleaning or a pre-move clean. Bill per job or per room, and mention the size of the property.",
          "**Item jobs** like sofa shampooing, mattress cleaning, carpet washing or water-tank cleaning. Bill per item, because customers want to see what each one cost.",
          "**Regular contracts** such as monthly housekeeping for an office or society. Bill per month and show the number of staff and days covered.",
        ],
      },
      { t: "h2", id: "what-to-list", text: "What to put on the bill" },
      {
        t: "ul",
        items: [
          "Business name, phone and address, with GSTIN if registered",
          "Customer name and the **address that was cleaned**",
          "**Date of service** (or the billing period for a contract)",
          "Type of cleaning, for example “deep cleaning” or “sofa shampooing”",
          "**Size**: “2 BHK, about 1,000 sq ft” or “office floor, 12 workstations”",
          "Each service as its own line with its price",
          "Materials and consumables, if you charge for them separately",
          "Who did the work, such as the team lead's name",
          "Your re-clean policy, if you have one",
        ],
      },
      { t: "h2", id: "example", text: "A worked example" },
      {
        t: "p",
        text: "Here is a home deep-clean with a sofa add-on. The numbers are made up for illustration; use your own rates.",
      },
      {
        t: "table",
        caption: "Example cleaning service bill (fictional figures)",
        head: ["Description", "Qty", "Rate", "Amount"],
        rows: [
          ["Deep cleaning, 2 BHK (kitchen, 2 bathrooms, floors)", "1", "₹4,200", "₹4,200"],
          ["3-seater sofa shampooing", "1", "₹700", "₹700"],
          ["Balcony and window-grill cleaning", "1", "₹500", "₹500"],
          ["Cleaning chemicals and consumables", "1", "₹350", "₹350"],
          ["**Total**", "", "", "**₹5,750**"],
        ],
      },
      {
        t: "p",
        text: "Below the table, add one line such as “Free re-clean of missed spots if reported within 48 hours.” It costs you little, and it gives the customer a reason to pay without hesitation.",
      },
      { t: "h2", id: "contracts", text: "Billing a monthly housekeeping contract" },
      {
        t: "p",
        text: "For a regular client, keep the bill short but specific: the billing period (for example 1 to 30 November), the number of cleaners, working days, the monthly rate per person and any extras like consumables. If attendance changes, show the days actually worked rather than a round number, so the client can match your bill against their own records.",
      },
      { t: "h2", id: "gst", text: "GST on cleaning services" },
      {
        t: "p",
        text: "Cleaning services are taxable once your business is GST-registered, and the rate is generally 18%, but confirm the current position for your service with your accountant. If you are below the registration limit, do not charge GST. Registered businesses should issue a proper tax invoice; see [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice) for the arithmetic.",
      },
      { t: "h2", id: "tool", text: "Using the free generator" },
      {
        t: "p",
        text: "The [cleaning service bill generator](/cleaning-bill) has fields for the site address, type of cleaning, area, service date and a re-clean guarantee, with service charges and materials listed separately. Fill it in, check the preview and download the PDF.",
      },
      {
        t: "p",
        text: "If you also take on small repair jobs, read the guides on the [AC repair service bill](/blog/how-to-make-ac-repair-service-bill) and [plumbing invoices](/blog/plumbing-invoice-format-independent-plumbers). To keep bills in order, see [invoice numbering rules](/blog/invoice-numbering-rules-gst), and use a [payment receipt](/blog/how-to-make-payment-receipt) once you are paid.",
      },
      {
        t: "cta",
        text: "Send your customer a clear cleaning bill today — free, no sign-up, no watermark.",
        to: "/cleaning-bill",
        label: "Create a cleaning bill",
      },
    ],
    faqs: [
      {
        q: "What is the format of a cleaning service bill?",
        a: "Your details, the customer and the address cleaned, the date, the type and size of cleaning, each service on its own line with the price, any materials charged, the total and your signature.",
      },
      {
        q: "Should I charge for cleaning materials separately?",
        a: "You can, and some customers prefer to see it. If your price already includes materials, say so on the bill instead of adding a separate line.",
      },
      {
        q: "How do I bill a monthly cleaning contract?",
        a: "Show the billing period, the number of staff, the working days and the monthly rate, plus any extras. Use actual days worked if attendance varies.",
      },
      {
        q: "Is there a free cleaning bill generator?",
        a: "Yes. BillsFreind's cleaning service bill generator is free, needs no sign-up and adds no watermark to the PDF.",
      },
    ],
  },

  {
    slug: "plumbing-invoice-format-independent-plumbers",
    title: "Plumbing Invoice Format for Independent Plumbers",
    seoTitle: "Plumbing Invoice Format for Independent Plumbers",
    description:
      "A plumbing invoice format for independent plumbers: visit charges, fittings, labour, emergency rates and warranty wording, plus a free plumber bill generator.",
    excerpt:
      "If you work alone, your invoice does the job of a back office. Here is how independent plumbers can bill visits, fittings and labour clearly and get paid without arguments.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "Service Bills",
    relatedTools: ["plumber-bill", "general-bill", "quotation-estimate"],
    keywords: ["plumbing invoice format", "plumber bill format", "plumber invoice", "plumbing bill for independent plumber", "plumber receipt"],
    body: [
      {
        t: "p",
        text: "When you are an independent plumber there is no accounts department. You fix the leak, you buy the fittings, you chase the payment. A clear invoice is the closest thing you have to a back office, and it is mostly about three things: saying what you charged for, making fittings visible, and stating the warranty before anyone has to ask.",
      },
      { t: "h2", id: "charges", text: "Decide how you charge, then show it the same way every time" },
      {
        t: "p",
        text: "Plumbers usually mix a few types of charge. None is wrong; the trouble starts when they are hidden inside one number.",
      },
      {
        t: "ul",
        items: [
          "**Visit or call-out charge** for travel and diagnosis. Many plumbers waive it if the customer books the repair, and that is fine, as long as the bill says so.",
          "**Fixed price per job**, such as “bathroom leakage repair and pipe fitting”, for work you can estimate in advance.",
          "**Fittings and materials**, listed individually with size, brand and quantity.",
          "**Emergency or after-hours charge**, if you have one. Tell the customer the rate on the phone, and show it as its own line on the bill so it does not look like a surprise.",
        ],
      },
      { t: "h2", id: "fittings", text: "List fittings properly" },
      {
        t: "p",
        text: "“Material ₹3,800” invites a fight. “CPVC pipe 1 inch (3 m) × 4, brass ball valve 1 inch × 2, basin mixer tap × 1” does not. Size and brand matter in plumbing because the same-looking tap can cost four times as much. If you bought the item for the customer, charge what you tell them you charge, and keep the shop receipt in case they ask.",
      },
      {
        t: "table",
        caption: "Example plumber invoice (fictional figures)",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["CPVC pipe 1 inch (3 m)", "4", "₹285", "₹1,140"],
          ["Ball valve 1 inch (brass)", "2", "₹360", "₹720"],
          ["Wash basin mixer tap", "1", "₹2,450", "₹2,450"],
          ["Bathroom leakage repair and pipe fitting (labour)", "1", "₹2,200", "₹2,200"],
          ["Mixer tap installation (labour)", "1", "₹400", "₹400"],
          ["**Total**", "", "", "**₹6,910**"],
        ],
      },
      { t: "h2", id: "quote-first", text: "Quote first on bigger jobs" },
      {
        t: "p",
        text: "For anything beyond a quick repair, such as re-piping a bathroom or fixing an overhead tank line, send a short written [quotation](/quotation-estimate) before you start and match your invoice to it. If the job grows, write the extra work on the bill as a separate line, with a note that the customer agreed. For large jobs, taking an advance for materials is normal; show it on the final invoice as “advance received” so the balance is clear.",
      },
      { t: "h2", id: "warranty", text: "Put the warranty on the bill" },
      {
        t: "p",
        text: "Leaks come back, and the customer's first question will be whether you cover it. Answer that on the invoice. For example: “3 months on workmanship for joints and fittings I installed. Manufacturer warranty applies to taps and valves.” That one sentence separates your work from the product's quality, which is where most plumbing disputes begin.",
      },
      { t: "h2", id: "gst", text: "GST and small plumbers" },
      {
        t: "p",
        text: "Many independent plumbers fall below the GST registration limit for services (generally ₹20 lakh a year, or ₹10 lakh in some special-category states). If that is you, do not charge GST. If you are registered, issue a GST invoice; our guide on [how to create a GST invoice](/blog/how-to-create-gst-invoice) shows the required details. When in doubt, ask your accountant before adding tax to a bill.",
      },
      { t: "h2", id: "tool", text: "Making the invoice" },
      {
        t: "p",
        text: "The free [plumber bill generator](/plumber-bill) has separate sections for fittings and labour, plus fields for site address, type of work, technician name and warranty. Add a UPI ID once and the bill will carry a QR code, which makes payment on the spot much easier than counting cash.",
      },
      {
        t: "p",
        text: "Working across trades? Compare the [electrician invoice format](/blog/electrician-invoice-format-labour-material-charges) and the [AC repair bill](/blog/how-to-make-ac-repair-service-bill). For a numbering system that stays tidy, see [invoice numbering rules](/blog/invoice-numbering-rules-gst), and for the paperwork after payment, [how to make a payment receipt](/blog/how-to-make-payment-receipt).",
      },
      {
        t: "cta",
        text: "Give your next customer a clear plumbing invoice — free, with no sign-up and no watermark.",
        to: "/plumber-bill",
        label: "Create a plumber bill",
      },
    ],
    faqs: [
      {
        q: "What should a plumbing invoice include?",
        a: "Your details, the customer and site address, the date, an itemised list of fittings, labour charges, any visit or emergency charge, warranty terms and the total. Add GST only if you are registered.",
      },
      {
        q: "Should a plumber charge a visit fee?",
        a: "That is up to you. If you charge one, show it as a separate line. If you waive it when the customer books the repair, note that on the bill.",
      },
      {
        q: "How should a plumber word the warranty?",
        a: "State the duration and what it covers, for example three months on workmanship for joints and fittings you installed, with manufacturer warranty on taps and valves.",
      },
      {
        q: "Can an independent plumber make an invoice for free?",
        a: "Yes. BillsFreind's plumber bill generator is free with no sign-up and no watermark.",
      },
    ],
  },

  {
    slug: "electrician-invoice-format-labour-material-charges",
    title: "Electrician Invoice Format With Labour and Material Charges",
    seoTitle: "Electrician Invoice Format: Labour and Material Charges",
    description:
      "Electrician invoice format with labour and material charges shown separately: how to list wiring, MCBs and switches, testing charges and warranty wording.",
    excerpt:
      "Customers accept an electrician's bill much faster when materials and labour are split and every item has a rating or brand. Here is the format, with a worked example.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "Service Bills",
    relatedTools: ["electrician-bill", "general-bill", "quotation-estimate"],
    keywords: ["electrician invoice format", "electrician bill format", "electrician labour and material charges", "wiring bill", "electrician invoice sample"],
    body: [
      {
        t: "p",
        text: "Ask an electrician what causes the most friction at the end of a job and the answer is almost always the bill. Not the amount itself, but the feeling that the customer can't see where it came from. The cure is simple: split materials from labour, and give every material a size, rating or brand.",
      },
      { t: "h2", id: "two-blocks", text: "Two blocks: materials and labour" },
      {
        t: "p",
        text: "Keep the invoice in two clear blocks. Materials are things you bought and fitted: wire, MCBs, switches, conduits, fans. Labour is your time and skill: wiring a room, fixing a fault, testing the circuit. Customers can compare materials against shop prices if they want to, and they can see that your labour is a fair number on its own.",
      },
      { t: "h2", id: "material-details", text: "Give materials a rating or brand" },
      {
        t: "p",
        text: "In electrical work, the detail is the credibility. “Wire” could be anything. “Copper wire 2.5 sq mm, 90 m coil” cannot. For MCBs, write the current rating and pole type, such as “MCB 32 A double pole”. For switches and sockets, name the brand or series. This also protects you: if a cheap product fails, the bill shows you never claimed otherwise.",
      },
      {
        t: "table",
        caption: "Example electrician invoice (fictional figures)",
        head: ["Item", "Type", "Qty", "Rate", "Amount"],
        rows: [
          ["MCB 32 A double pole", "Material", "2", "₹640", "₹1,280"],
          ["Copper wire 2.5 sq mm (90 m coil)", "Material", "1", "₹3,150", "₹3,150"],
          ["Modular switch and socket set", "Material", "6", "₹135", "₹810"],
          ["Wiring and fitting labour, 2 BHK", "Labour", "1", "₹3,500", "₹3,500"],
          ["Visit and testing charges", "Labour", "1", "₹300", "₹300"],
          ["**Total**", "", "", "", "**₹9,040**"],
        ],
      },
      {
        t: "p",
        text: "Materials come to ₹5,240 and labour to ₹3,800. Showing the two subtotals separately, even in a line under the table, helps a customer who is reimbursed by an employer or landlord and needs the numbers split.",
      },
      { t: "h2", id: "pricing-style", text: "Per point, per room or per job" },
      {
        t: "p",
        text: "Electricians price labour in different ways: per switch or light point, per room, or as a fixed price for the whole job. Any of them works on an invoice. What matters is that the bill shows the unit you used. “Wiring labour: 14 points × ₹250” reads very differently from “Labour ₹3,500”, and the first one invites no questions.",
      },
      { t: "h2", id: "testing", text: "Testing and safety notes" },
      {
        t: "p",
        text: "If you tested the circuit, checked earthing or fitted protection such as an MCB or RCCB, say so in a line. It is not a legal formality; it is evidence that you did the careful part of the job. A short note like “Circuit tested after installation; earthing checked” also tells the customer what they paid for besides wire and switches.",
      },
      { t: "h2", id: "warranty", text: "Two warranties, kept apart" },
      {
        t: "p",
        text: "There are two separate things to cover. Your **workmanship warranty** is yours to define: for example, six months on wiring and fitting. The **product warranty** belongs to the manufacturer and applies to MCBs, fans and switches. Writing both on the invoice, as two lines, avoids the classic argument when a branded product fails and the customer calls you.",
      },
      { t: "h2", id: "gst", text: "GST on an electrician's bill" },
      {
        t: "p",
        text: "If your turnover is under the service registration limit (generally ₹20 lakh a year), you do not charge GST. If you are registered, materials and labour follow the GST rules applicable to your supply, and the bill should be a tax invoice. The [GST invoice guide](/blog/how-to-create-gst-invoice) and [GST calculation guide](/blog/how-to-calculate-gst-on-invoice) explain the details. The electrician bill generator lets you switch GST on or off.",
      },
      { t: "h2", id: "tool", text: "Using the electrician bill generator" },
      {
        t: "p",
        text: "The free [electrician bill generator](/electrician-bill) marks each line as material or labour and has fields for site address, type of work, technician name and warranty. The totals keep the two groups apart on the printed bill.",
      },
      {
        t: "p",
        text: "If you also do other service work, see the [plumbing invoice format](/blog/plumbing-invoice-format-independent-plumbers), the [AC repair bill](/blog/how-to-make-ac-repair-service-bill) and the [cleaning bill format](/blog/cleaning-service-bill-format-with-example). Our overview of [service bill formats for electricians, plumbers and mechanics](/blog/electrician-plumber-mechanic-bill-format) covers what they share, and [invoice numbering rules](/blog/invoice-numbering-rules-gst) will help you keep records tidy.",
      },
      {
        t: "cta",
        text: "Make an electrician invoice with labour and materials split — free, with no sign-up and no watermark.",
        to: "/electrician-bill",
        label: "Create an electrician bill",
      },
    ],
    faqs: [
      {
        q: "How should an electrician show labour and material charges?",
        a: "In two clear groups. List materials with size, rating or brand, and list labour separately, either per point, per room or as a fixed job price.",
      },
      {
        q: "Does an electrician need to charge GST?",
        a: "Only if registered. Service providers generally need registration once turnover crosses ₹20 lakh a year (₹10 lakh in some special-category states). Confirm with an accountant.",
      },
      {
        q: "What warranty should an electrician write on the invoice?",
        a: "Write your workmanship warranty, such as six months on wiring and fitting, and note that the manufacturer's warranty applies to products like MCBs, fans and switches.",
      },
      {
        q: "Is there a free electrician invoice generator?",
        a: "Yes. BillsFreind's electrician bill generator is free, needs no sign-up and adds no watermark.",
      },
    ],
  },

  {
    slug: "fuel-bill-for-reimbursement",
    title: "Fuel Bill for Reimbursement: What to Include and What to Avoid",
    seoTitle: "Fuel Bill for Reimbursement: What to Include",
    description:
      "How a fuel bill for reimbursement should look: details finance teams check, why petrol and diesel bills show VAT not GST, and mistakes that get claims rejected.",
    excerpt:
      "Finance teams reject fuel claims for small, avoidable reasons. Here is what a proper fuel bill contains, how petrol is taxed, and where honesty matters.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "Expense Claims",
    relatedTools: ["fuel-bill", "general-bill", "payment-receipt"],
    keywords: ["fuel bill for reimbursement", "petrol bill format", "fuel receipt format", "fuel expense claim", "petrol reimbursement bill"],
    body: [
      {
        t: "p",
        text: "Fuel claims are a regular source of small arguments between employees and finance teams. The claim is usually genuine, and the rejection is usually about something trivial: a missing vehicle number, a faded slip, a date that does not fit the trip. This guide covers what a fuel bill should show so the claim passes the first time.",
      },
      { t: "h2", id: "details", text: "Details finance teams look for" },
      {
        t: "ul",
        items: [
          "**Name and location of the fuel station**, or its outlet code",
          "**Date and time** of the fill-up",
          "**Fuel type**: petrol, diesel, CNG or another grade",
          "**Quantity in litres** (or kg for CNG) and the **rate per litre**",
          "**Total amount** paid",
          "**Vehicle registration number**",
          "**Odometer reading**, which helps match the fill-up with a trip",
          "How it was paid, such as cash, UPI or card",
        ],
      },
      { t: "h2", id: "tax", text: "Why a fuel bill shows VAT, not GST" },
      {
        t: "p",
        text: "Petrol, diesel, natural gas, crude oil and aviation turbine fuel are currently outside GST. The price you pay already includes central excise duty and the state's VAT, so a fuel bill has no CGST, SGST or IGST lines. That surprises people who expect every bill in India to show GST. If your company asks for “GST bills” for fuel, the pump receipt with its own tax details is what they get.",
      },
      { t: "h2", id: "own-vehicle", text: "Claiming for your own vehicle" },
      {
        t: "p",
        text: "Companies handle this in two ways. Some reimburse **actual fuel receipts**. Others pay a **rate per kilometre** against a trip log. In the second case a log with date, route, kilometres and the purpose of the trip matters more than the receipt. Ask your finance team which method applies, because sending receipts for a km-based policy only creates confusion.",
      },
      {
        t: "table",
        caption: "A simple trip log (fictional entries)",
        head: ["Date", "From → To", "Km", "Purpose"],
        rows: [
          ["04 Nov", "Office → client site, Chakan", "42", "Product demo"],
          ["04 Nov", "Chakan → Office", "42", "Return"],
          ["07 Nov", "Office → vendor, Bhosari", "18", "Material pickup"],
        ],
      },
      { t: "h2", id: "honesty", text: "A note on generated fuel bills" },
      {
        t: "p",
        text: "A fuel receipt made in any online tool, including ours, is a document you produce yourself. It is not a pump receipt and it is not proof that fuel was bought. It is suitable for legitimate uses: a transport business recording fuel it supplied to its own vehicles, a small dealer issuing a bill for fuel it sold, or a neat record of a real purchase whose slip you lost. It must never be used to claim money for fuel you did not buy. Reimbursement fraud can mean disciplinary action and legal trouble, and finance teams do spot patterns that look invented.",
      },
      { t: "h2", id: "lost-slip", text: "If you lose the pump slip" },
      {
        t: "ul",
        items: [
          "Ask the pump for a duplicate; many outlets can reprint a recent transaction.",
          "For UPI or card payments, the bank or app statement shows the date, amount and merchant.",
          "Write a short, honest note to your manager explaining that the slip is lost, and attach the statement.",
          "Do not recreate a slip and present it as the original.",
        ],
      },
      { t: "h2", id: "mistakes", text: "Why fuel claims get rejected" },
      {
        t: "ul",
        items: [
          "No vehicle number, or one that does not match the registered vehicle",
          "A date outside the trip or claim period",
          "A rate per litre that does not match the day's price at that location",
          "Cash payments with no slip and no note",
          "Round-figure amounts every time, which looks estimated",
        ],
      },
      { t: "h2", id: "tool", text: "Making a clean record" },
      {
        t: "p",
        text: "If you have a genuine reason to produce a fuel receipt, the free [fuel receipt generator](/fuel-bill) has fields for fuel type, litres, rate, nozzle number, vehicle number and odometer reading, and the rate is treated as VAT-inclusive. Use it for real transactions only.",
      },
      {
        t: "p",
        text: "Other expense paperwork follows similar rules. See [how to make a payment receipt](/blog/how-to-make-payment-receipt), the [rent receipt for HRA](/blog/how-to-make-rent-receipt-for-hra) guide, and [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt) if you are unsure which document applies.",
      },
      {
        t: "cta",
        text: "Need a tidy record of a genuine fuel purchase? Make a fuel receipt in a minute — free, no sign-up.",
        to: "/fuel-bill",
        label: "Open the fuel receipt generator",
      },
    ],
    faqs: [
      {
        q: "What should a fuel bill for reimbursement contain?",
        a: "The fuel station, date, fuel type, litres, rate per litre, total amount, vehicle number and odometer reading, along with the payment method.",
      },
      {
        q: "Is GST charged on petrol and diesel?",
        a: "No. Petrol and diesel are currently outside GST. The price includes central excise and state VAT, so the bill has no GST lines.",
      },
      {
        q: "What if I lose my petrol pump receipt?",
        a: "Ask the pump for a duplicate or use your UPI or card statement, and tell your manager honestly. Do not recreate a slip and present it as the original.",
      },
      {
        q: "Can I use a generated fuel bill to claim reimbursement?",
        a: "Only for fuel actually bought, and only if your employer accepts it. A generated receipt is not proof of purchase and must never be used for fuel you did not buy.",
      },
    ],
  },

  {
    slug: "invoice-numbering-rules-gst",
    title: "Invoice Numbering Rules Under GST: How to Number Your Bills",
    seoTitle: "Invoice Numbering Rules Under GST: Format and Series",
    description:
      "Invoice numbering rules under GST: 16-character limit, consecutive series, allowed symbols, restarting each financial year and handling cancelled invoices.",
    excerpt:
      "The law is short on invoice numbers: unique, consecutive, no more than 16 characters. The practical questions are about series, new financial years and cancelled bills.",
    published: "2026-11-11",
    updated: "2026-11-11",
    category: "GST Guide",
    relatedTools: ["gst-invoice", "general-bill", "quotation-estimate"],
    keywords: ["invoice numbering rules GST", "GST invoice number format", "invoice number series", "invoice number 16 characters", "invoice numbering"],
    body: [
      {
        t: "p",
        text: "Nobody enjoys thinking about invoice numbers until a buyer asks why two bills have the same one, or an accountant asks where invoice 0047 went. The GST rules on numbering are brief, so most of the confusion comes from what the rules don't say. Here is what they do say, and the sensible habits that fill the gaps.",
      },
      { t: "h2", id: "the-rule", text: "What the rule says" },
      {
        t: "p",
        text: "Rule 46 of the CGST Rules requires a tax invoice to carry a **consecutive serial number**, not more than **16 characters**, in one or multiple series, containing letters, numbers, or the special characters hyphen and slash, or any combination of these. The number must be **unique for a financial year**. The same standard is applied to a bill of supply, which is covered in our guide on [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply).",
      },
      {
        t: "table",
        caption: "What the numbering rule allows",
        head: ["Question", "Answer"],
        rows: [
          ["Maximum length", "16 characters"],
          ["Allowed characters", "Letters, numbers, hyphen (-) and slash (/)"],
          ["Must be unique?", "Yes, within a financial year"],
          ["Must be consecutive?", "Yes, within each series"],
          ["Can I use more than one series?", "Yes"],
        ],
      },
      { t: "h2", id: "formats", text: "Formats that work" },
      {
        t: "ul",
        items: [
          "**INV-0001**: simple, short, and fine for most small businesses",
          "**2026-27/001**: includes the financial year, so each year starts clean",
          "**MUM/INV/0001**: a branch code plus a running number, useful with multiple locations",
          "**SVC-0001** and **PRD-0001**: separate series for services and products",
        ],
      },
      {
        t: "p",
        text: "Count the characters. “2026-27/INV/0001” is 15 and fits. “MUMBAI/2026-27/INV/0001” is 22 and does not.",
      },
      { t: "h2", id: "new-year", text: "Starting a new financial year" },
      {
        t: "p",
        text: "Because the number only has to be unique within a financial year, you can start again at 1 on 1 April. The easiest way to avoid confusion is to include the year in the number, so INV-0001 from one year is not mistaken for INV-0001 from the next. Some businesses simply keep counting upward forever, and that is also acceptable if it stays within 16 characters.",
      },
      { t: "h2", id: "cancelled", text: "What about a cancelled or wrongly issued invoice?" },
      {
        t: "p",
        text: "Do not delete it and do not reuse its number. Keep the document, mark it as cancelled and carry on with the next number. The numbering reports you file for GST ask for the series of documents issued and cancelled, so a gap that is explained is far better than a gap nobody can explain. If an invoice was issued with a wrong amount after supply, your accountant can advise whether a credit note or debit note is the right fix.",
      },
      { t: "h2", id: "other-docs", text: "Quotations, challans and receipts" },
      {
        t: "p",
        text: "Many businesses use a separate prefix for each document type, such as QT for quotations, DC for challans and RCPT for receipts, so tax invoices keep an unbroken series of their own. That also helps when you are not sure which document is which; see [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt) and [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice) for how they differ.",
      },
      { t: "h2", id: "billsfreind", text: "How BillsFreind numbers your documents" },
      {
        t: "p",
        text: "In the [GST invoice generator](/gst-invoice), each document type has its own prefix and keeps its own counter, saved in your browser, so you get INV-0001, INV-0002 and so on, and a quotation will not use up an invoice number. The number box is editable, so you can switch to a format like 2026-27/001 whenever you need a different series. Because the counter lives in your browser, a different browser or device starts its own count, so keep the number you last used in a safe place or back up your saved documents.",
      },
      { t: "h2", id: "habits", text: "Habits that save trouble" },
      {
        t: "ul",
        items: [
          "Decide your format once and write it down.",
          "Never reuse a number, even for a cancelled bill.",
          "Keep a copy of every invoice, in number order.",
          "Check the character count when you add a branch or year code.",
          "Let your accountant see your numbering before the first filing, not after.",
        ],
      },
      {
        t: "callout",
        title: "Check the current rules",
        text: "This guide summarises the numbering requirement in plain language. GST rules are amended from time to time, so confirm details with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "For the rest of the invoice, see [how to create a GST invoice](/blog/how-to-create-gst-invoice) and [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice).",
      },
      {
        t: "cta",
        text: "Make a GST invoice with an automatic running number — free, with no sign-up and no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      {
        q: "How many characters can a GST invoice number have?",
        a: "No more than 16 characters. It can contain letters, numbers, a hyphen and a slash.",
      },
      {
        q: "Does an invoice number have to be consecutive?",
        a: "Yes. Invoice numbers must run in sequence within a series and be unique for the financial year.",
      },
      {
        q: "Can I restart invoice numbers every financial year?",
        a: "Yes. The number only has to be unique within the financial year, so you can start again at 1 each April. Including the year in the number avoids confusion.",
      },
      {
        q: "What should I do with a cancelled invoice?",
        a: "Keep it, mark it as cancelled, and do not reuse its number. Continue with the next number in the series.",
      },
    ],
  },

  {
    slug: "how-to-make-rent-receipt-for-hra",
    title: "How to Make a Rent Receipt for HRA (Format and Rules)",
    seoTitle: "Rent Receipt for HRA: Format, Rules and Free Generator",
    description:
      "How to make a rent receipt for HRA: what to include, when the landlord's PAN is needed, revenue stamp tips and a free rent receipt generator.",
    excerpt:
      "What a rent receipt for HRA should contain, when your employer needs the landlord's PAN, and how to make a clean monthly receipt in a minute.",
    published: "2026-10-27",
    updated: "2026-10-27",
    category: "Personal Tax",
    relatedTools: ["rent-receipt", "payment-receipt", "general-bill"],
    body: [
      {
        t: "p",
        text: "If you are a salaried employee or have done any other work in your life, and you are living in a rented flat or any other place, I have one great thing for you: a rent receipt. It is very useful if you are living in a rented house. You can use it for free, with unlimited access. You can create bills on the website and select an option like Rent Receipt. [rent receipt generator](/rent-receipt).",
      },
      { t: "h2", id: "why-receipts", text: "Why do you need rent receipts for HRA?" },
      {
        t: "p",
        text: "Do you know about the HRA scheme? Actually, this is only useful for those who are living in a rented house. So, if you live in a rented house, you need to collect your roommate's details and other things to apply for this scheme, which is HRA. For that, you need to have your rent agreement and receipt. Sometimes, that agreement is not available, or sometimes it's not possible to get one. Mostly, no one can carry it around in the future. So, you can carry your rent receipt and generate it for free, with unlimited access, without any cost and without wasting time.",
      },
      { t: "h2", id: "what-to-include", text: "What a rent receipt should include" },
      {
        t: "ul",
        items: [
          "**Receipt number and date** of issue",
          "**Landlord's name** and, where required, **PAN**",
          "**Tenant's name**",
          "**Property address**",
          "**Rent amount** for the period, in figures and in words",
          "**Rent period**, such as the month and year",
          "**Payment mode** — cash, UPI or bank transfer — with a reference if paid digitally",
          "**Landlord's signature**, and a revenue stamp where applicable",
        ],
      },
      { t: "h2", id: "landlord-pan", text: "When is the landlord's PAN needed?" },
      {
        t: "p",
        text: "If the rent you pay in a financial year is more than ₹1 lakh (roughly ₹8,333 a month), you generally need to give your employer the landlord's PAN. If the landlord has no PAN, employers usually accept a written declaration with the landlord's name and address. Policies vary, so ask your employer's payroll team what they accept.",
      },
      { t: "h2", id: "revenue-stamp", text: "Do you need a revenue stamp?" },
      {
        t: "p",
        text: "A ₹1 revenue stamp is commonly affixed on rent receipts for **cash** payments above ₹5,000, with the landlord signing across it. It is generally not used when rent is paid by cheque, UPI or bank transfer. The free generator includes a revenue stamp box on the receipt. Stamp rules can change, so follow your employer's policy.",
      },
      { t: "h2", id: "steps", text: "How to make a rent receipt in 4 steps" },
      {
        t: "steps",
        items: [
          { title: "Open the generator", text: "Go to the free [house rent receipt generator](/rent-receipt). No sign-up is needed." },
          { title: "Enter landlord and tenant details", text: "Add names, the property address and the landlord's PAN if needed." },
          { title: "Fill in rent and period", text: "Enter the amount, the month and year, and the payment mode." },
          { title: "Download and sign", text: "Press **Download PDF**, print it, and ask the landlord to sign (and stamp if paid in cash). Make one receipt per month." },
        ],
      },
      { t: "h2", id: "tips", text: "Tips to avoid problems" },
      {
        t: "ul",
        items: [
          "**Pay by bank transfer or UPI** so there is a record that matches your receipts.",
          "**Keep the rent agreement** with your receipts.",
          "**Use one receipt per month**, with the correct period on each.",
          "**Make sure the receipt amounts match** what you actually paid.",
        ],
      },
      {
        t: "p",
        text: "Receipts for other payments work the same way. See our guide on [how to make a payment receipt](/blog/how-to-make-payment-receipt) and the difference between an [invoice, a bill and a receipt](/blog/invoice-vs-bill-vs-receipt).",
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide is a plain-language overview and not tax advice. HRA rules depend on your tax regime and circumstances; confirm with your employer or a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to make an invoice and payment receipt](/blog/how-to-make-payment-receipt), [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), [choosing a free invoice generator in India](/blog/best-free-invoice-generator-india), [fuel bill for reimbursement](/blog/fuel-bill-for-reimbursement).",
      },
      {
        t: "cta",
        text: "Make this month's rent receipt in under a minute — free, no sign-up, no watermark.",
        to: "/rent-receipt",
        label: "Create a rent receipt",
      },
    ],
    faqs: [
      {
        q: "Is a rent receipt required for HRA?",
        a: "Employers generally ask for rent receipts as proof that rent was paid before allowing HRA exemption. Check your employer's policy for what they need.",
      },
      {
        q: "When is the landlord's PAN required for HRA?",
        a: "Generally when the rent paid in a year exceeds ₹1 lakh. If the landlord has no PAN, employers usually accept a declaration.",
      },
      {
        q: "Do I need a revenue stamp on a rent receipt?",
        a: "A ₹1 revenue stamp is commonly used on cash payments above ₹5,000. It is generally not used for bank transfers or UPI. Follow your employer's policy.",
      },
      {
        q: "Can I make a rent receipt for free online?",
        a: "Yes. BillsFreind's rent receipt generator is free, with no sign-up and no watermark, and gives you a printable PDF.",
      },
    ],
  },

  {
    slug: "electrician-plumber-mechanic-bill-format",
    title: "Electrician, Plumber & Mechanic Bill Format: What to Include",
    seoTitle: "Electrician, Plumber & Mechanic Bill Format (Free)",
    description:
      "What to include in an electrician, plumber or mechanic bill: material and labour split, site address, warranty and GST — plus a free bill generator.",
    excerpt:
      "A clear service bill builds trust and prevents disputes. Here is what an electrician, plumber or mechanic bill should contain, with a free generator for each.",
    published: "2026-10-27",
    updated: "2026-10-27",
    category: "Invoicing Basics",
    relatedTools: ["electrician-bill", "plumber-bill", "mechanic-bill", "general-bill", "payment-receipt"],
    body: [
      {
        t: "p",
        text: "If you fix wiring, pipes or vehicles for a living, a neat written bill does more than ask for money. It shows the customer exactly what they paid for, backs up your warranty, and settles arguments before they start. This guide covers what a tradesperson's bill should contain, with free generators for an [electrician bill](/electrician-bill), a [plumber bill](/plumber-bill) and a [mechanic or garage bill](/mechanic-bill).",
      },
      { t: "h2", id: "what-to-include", text: "What every service bill should include" },
      {
        t: "ul",
        items: [
          "**Your business name, address and phone number** (and GSTIN if you are GST-registered)",
          "**Customer name and site address** — the place where the work was done",
          "**Bill number and date**",
          "**Materials used**, itemised with quantity and rate",
          "**Labour or service charges**, shown separately",
          "**Total in figures and in words**",
          "**Warranty or guarantee terms**, if any",
          "**Payment details** — UPI ID or bank account — and your signature",
        ],
      },
      { t: "h2", id: "material-labour", text: "Show materials and labour separately" },
      {
        t: "p",
        text: "Customers trust a bill more when they can see what went into it. Here is a fictional example for an electrician:",
      },
      {
        t: "table",
        caption: "Example electrician bill (fictional figures)",
        head: ["Item", "Qty", "Rate", "Amount"],
        rows: [
          ["Copper wire, 1.5 sq mm (metres)", "40", "₹30", "₹1,200"],
          ["Modular switch", "6", "₹120", "₹720"],
          ["Labour — rewiring of one room", "1", "₹1,500", "₹1,500"],
          ["**Total**", "", "", "**₹3,420**"],
        ],
      },
      { t: "h2", id: "trade-details", text: "Extra details for each trade" },
      {
        t: "ul",
        items: [
          "**Electrician:** type of work, site address, materials with brand or rating, and warranty on the work.",
          "**Plumber:** fittings used, labour per job or per visit, site address and any warranty.",
          "**Mechanic or garage:** vehicle registration number, spare parts, labour, odometer reading and next service due.",
        ],
      },
      { t: "h2", id: "gst", text: "Do you need to charge GST?" },
      {
        t: "p",
        text: "Only GST-registered businesses can charge GST. If you are registered, issue a proper tax invoice; see [how to create a GST invoice](/blog/how-to-create-gst-invoice) and [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice). If you are not registered, do not add GST to your bill. The tradesperson generators have optional GST, so you can switch it on or off.",
      },
      { t: "h2", id: "steps", text: "How to make a service bill in 4 steps" },
      {
        t: "steps",
        items: [
          { title: "Pick your trade", text: "Open the [electrician](/electrician-bill), [plumber](/plumber-bill) or [mechanic](/mechanic-bill) bill generator." },
          { title: "Add your details once", text: "Your business details are remembered in your browser." },
          { title: "List materials and labour", text: "Add each line; totals and amount in words update live." },
          { title: "Download and share", text: "Press **Download PDF** and send it on WhatsApp, or print it. Once paid, give a [payment receipt](/payment-receipt)." },
        ],
      },
      {
        t: "p",
        text: "Wondering whether to give a bill, an invoice or a receipt? Read [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), and see [how to make an invoice online for free](/blog/how-to-make-payment-receipt).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to make an AC repair service bill](/blog/how-to-make-ac-repair-service-bill), [cleaning service bill format with example](/blog/cleaning-service-bill-format-with-example), [plumbing invoice format for independent plumbers](/blog/plumbing-invoice-format-independent-plumbers), [electrician invoice format with labour and material charges](/blog/electrician-invoice-format-labour-material-charges), [how to make an invoice and payment receipt](/blog/how-to-make-payment-receipt).",
      },
      {
        t: "cta",
        text: "Give every customer a clear, professional bill — free, with no sign-up and no watermark.",
        to: "/electrician-bill",
        label: "Make a service bill",
      },
    ],
    faqs: [
      {
        q: "What should an electrician bill contain?",
        a: "Your details, the customer's name and site address, bill number and date, itemised materials, labour charges, total in figures and words, warranty terms and payment details.",
      },
      {
        q: "Should a plumber bill show labour separately?",
        a: "Yes. Listing fittings and labour separately makes the bill clear and helps avoid disputes.",
      },
      {
        q: "Do mechanics need to put the vehicle number on a bill?",
        a: "It is good practice. A garage bill normally shows the vehicle registration number, parts, labour and the next service due.",
      },
      {
        q: "Can I make a plumber or electrician bill for free?",
        a: "Yes. BillsFreind's electrician, plumber and mechanic bill generators are free with no sign-up and no watermark.",
      },
    ],
  },

  {
    slug: "best-free-invoice-generator-india",
    title: "Best Free Invoice Generator in India: What to Look For",
    seoTitle: "Best Free Invoice Generator in India: What to Look For",
    description:
      "Choosing a free invoice or bill generator in India? A checklist covering GST support, watermarks, sign-up, privacy and PDF quality.",
    excerpt:
      "A practical checklist for choosing a free invoice and bill generator in India — GST fields, watermarks, privacy and limits — and an honest look at where BillsFreind fits.",
    published: "2026-10-26",
    updated: "2026-10-26",
    category: "Invoicing Basics",
    keywords: ["free invoice generator India", "free bill generator", "invoice free", "GST invoice generator", "online invoice maker"],
    relatedTools: ["gst-invoice", "general-bill", "quotation-estimate", "payment-receipt"],
    body: [
      {
        t: "p",
        text: "Search for a free invoice generator and you will find dozens. Many are free only until you try to download the PDF, then ask for a sign-up, a subscription or leave a watermark across your bill. This guide is a checklist for judging any **free bill generator** before you rely on it for real customers — and it is upfront about what BillsFreind does and does not do.",
      },
      { t: "h2", id: "what-makes-good", text: "What makes a good free invoice generator?" },
      {
        t: "p",
        text: "A good free invoice generator lets you create, preview and download a clean invoice without paying, signing up or accepting a watermark, and it includes the fields Indian law requires if you charge GST. If it fails on any of those, it is a trial, not a free tool.",
      },
      { t: "h2", id: "checklist", text: "A 10-point checklist" },
      {
        t: "ol",
        items: [
          "**No watermark** on the downloaded PDF.",
          "**No forced sign-up** just to create or download a bill.",
          "**No hidden limit** on the number of invoices per month.",
          "**GST fields:** GSTIN, HSN/SAC, place of supply, and a CGST + SGST or IGST split — see the [mandatory GST invoice details](/blog/how-to-create-gst-invoice).",
          "**Correct maths:** per-line GST rates, discounts and round-off, as explained in [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice).",
          "**Amount in words**, which many buyers expect on Indian invoices.",
          "**Print-ready A4 PDF** that looks the same on every device.",
          "**Payment details:** bank account and a UPI QR code so customers can pay quickly.",
          "**Privacy:** clear information on where your business and customer data is stored.",
          "**Related documents:** receipts, quotations and challans under the same roof.",
        ],
      },
      { t: "h2", id: "billsfreind-fit", text: "Where does BillsFreind fit?" },
      {
        t: "p",
        text: "BillsFreind is built around the checklist above: the [free GST invoice generator](/gst-invoice) has no sign-up, no watermark and no invoice limit, and it includes HSN/SAC, place of supply, CGST/SGST/IGST, amount in words and a UPI QR code. Everything runs in your browser and your documents are stored only on your own device. It also offers a [general bill / cash memo](/general-bill), a [payment receipt](/payment-receipt), a [quotation maker](/quotation-estimate) and more.",
      },
      {
        t: "img",
        src: "/blog/gst-invoice-sample.webp",
        alt: "Free GST invoice generated online with BillsFreind, showing HSN codes, CGST and SGST summary and amount in words",
        caption: "A GST invoice created with BillsFreind's free generator (fictional business data).",
        width: 900,
        height: 1272,
      },
      { t: "h2", id: "limits", text: "What BillsFreind does not do" },
      {
        t: "p",
        text: "Being clear about limits helps you choose well. BillsFreind does not:",
      },
      {
        t: "ul",
        items: [
          "**Generate e-invoices.** It does not connect to the government's Invoice Registration Portal, so it is meant for businesses below the e-invoicing threshold.",
          "**Sync across devices.** Documents are saved in your browser only. Export a JSON backup if you need to keep them safe or move them.",
          "**File GST returns or track inventory.** For that, use accounting software.",
          "**Offer a dedicated bill-of-supply format yet.** See [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply) for what such a bill must contain.",
        ],
      },
      { t: "h2", id: "free-vs-paid", text: "When is paid software worth it?" },
      {
        t: "p",
        text: "If you have a large business or need to create bills on a daily basis, like if you have a grocery shop, clothing business, or restaurant business, then you need to create many bills in a single day. At that time, you may need to use software or an app. But if you are a freelancer or provide services like electrical work, AC repair, or cleaning services, you don't need to create large business bills, pay monthly taxes, or save everything in a database. So, of course, BillsFreind.in is perfect for you and is available free of cost.",
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide is for general information, not tax or legal advice. Confirm the invoicing rules that apply to your business with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice), [how to make an invoice and payment receipt](/blog/how-to-make-payment-receipt), [electrician, plumber and mechanic bill format](/blog/electrician-plumber-mechanic-bill-format), [fuel bill for reimbursement](/blog/fuel-bill-for-reimbursement).",
      },
      {
        t: "cta",
        text: "Try it on a real bill: fill in the form, check the live preview and download a clean A4 PDF — free, with no sign-up and no watermark.",
        to: "/gst-invoice",
        label: "Create a free GST invoice",
      },
    ],
    faqs: [
      { q: "Which is the best free invoice generator in India?", a: "The best one for you is the one that is truly free — no watermark, sign-up or invoice limit — and includes the GST fields you need. Use the checklist in this guide to compare options." },
      { q: "Is BillsFreind free?", a: "Yes. BillsFreind has no sign-up, no watermark and no limit on the number of invoices." },
      { q: "Can I make a GST invoice with a free bill generator?", a: "Yes, as long as the generator includes the mandatory GST invoice details such as GSTIN, HSN/SAC, place of supply and the tax split." },
      { q: "Does BillsFreind generate e-invoices?", a: "No. It does not connect to the e-invoice portal, so it is designed for businesses below the e-invoicing threshold." },
    ],
  },

  {
    slug: "invoice-vs-bill-vs-receipt",
    title: "Invoice vs Bill vs Receipt: What's the Difference?",
    seoTitle: "Invoice vs Bill vs Receipt: What's the Difference?",
    description:
      "Invoice, bill, cash memo, receipt — what each document means, when to issue it and how they differ under GST, with a simple comparison table.",
    excerpt:
      "Invoice, bill and receipt are not the same thing. See what each document does, when to issue it and which one proves payment.",
    published: "2026-10-26",
    updated: "2026-10-26",
    category: "Invoicing Basics",
    keywords: ["invoice vs bill", "invoice bill", "difference between invoice and receipt", "cash memo", "payment receipt"],
    relatedTools: ["general-bill", "payment-receipt", "gst-invoice", "quotation-estimate", "delivery-challan"],
    body: [
      {
        t: "p",
        text: "People use “invoice”, “bill” and “receipt” interchangeably, but each plays a different role in a sale. Mixing them up can confuse customers, delay payment and, for GST-registered businesses, cause compliance problems. Here is how they differ in plain language.",
      },
      { t: "h2", id: "short-answer", text: "What is the difference between an invoice, a bill and a receipt?" },
      {
        t: "p",
        text: "An **invoice** (or bill) asks the customer to pay for goods or services supplied. A **receipt** confirms that the payment has been received. The invoice comes first and the receipt comes after the money arrives.",
      },
      {
        t: "table",
        caption: "Invoice vs bill vs receipt",
        head: ["", "Invoice", "Bill / cash memo", "Receipt"],
        rows: [
          ["Purpose", "Request payment, record the sale", "Everyday word for a bill; a cash memo is a simple bill for a counter sale", "Confirm payment received"],
          ["Issued", "When goods or services are supplied", "At the time of sale", "When money is received"],
          ["Shows", "Items, rates, taxes, due date", "Items, prices, total", "Amount received, mode, reference, balance due"],
          ["Under GST", "A tax invoice has mandatory particulars", "A bill of supply is used where no GST is charged", "A receipt voucher may be needed for some advances"],
        ],
      },
      { t: "h2", id: "invoice", text: "What is an invoice?" },
      {
        t: "p",
        text: "An invoice is a formal document listing what you sold, the price, any tax and how the customer should pay. For GST-registered sellers it is a legal document: a GST tax invoice must carry the particulars set out in Rule 46, and it is what the buyer uses to claim input tax credit. Read the full list in [how to create a GST invoice](/blog/how-to-create-gst-invoice).",
      },
      { t: "h2", id: "bill", text: "What is a bill or cash memo?" },
      {
        t: "p",
        text: "“Bill” is the everyday word for the same idea — a document showing what is owed. A **cash memo** is a simple bill used for over-the-counter sales, usually without customer or tax details. If you are not registered under GST, a bill or cash memo is the right document; the free [general bill generator](/general-bill) makes one in a minute. If you are registered but do not charge GST, you issue a *bill of supply* — see [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply).",
      },
      { t: "h2", id: "receipt", text: "What is a receipt?" },
      {
        t: "p",
        text: "A receipt is proof of payment. It states who paid, who received the money, how much, how (cash, UPI, cheque or transfer) and what it was for. Customers often need receipts to show that a bill has been settled, and tenants use rent receipts to claim HRA. You can make one with the free [payment receipt generator](/payment-receipt).",
      },
      {
        t: "img",
        src: "/blog/payment-receipt-sample.webp",
        alt: "Sample payment receipt showing amount received in words, payment mode and transaction reference, created with a free online receipt generator",
        caption: "A payment receipt confirms that an invoice has been paid (fictional data).",
        width: 900,
        height: 618,
      },
      { t: "h2", id: "other-documents", text: "How do quotations and challans fit in?" },
      {
        t: "ul",
        items: [
          "**Quotation or estimate:** a price offer sent before the sale. It is not a demand for payment. Make one with the [quotation maker](/quotation-estimate).",
          "**Proforma invoice:** a preliminary bill that is not a tax invoice — see [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice).",
          "**Delivery challan:** accompanies goods that move without an invoice — see [delivery challan vs invoice](/blog/delivery-challan-vs-invoice).",
        ],
      },
      { t: "h2", id: "which", text: "Which one should you issue?" },
      {
        t: "ol",
        items: [
          "Quote the price first, if needed — **quotation**.",
          "When you supply the goods or services — **invoice** (tax invoice if you charge GST) or **bill / cash memo** if you do not.",
          "When the customer pays — **receipt**, especially for part payments and cash.",
        ],
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains common billing terms in plain language. It is not tax or legal advice. Confirm GST requirements with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice), [how to make an invoice and payment receipt](/blog/how-to-make-payment-receipt), [how to make a rent receipt for HRA](/blog/how-to-make-rent-receipt-for-hra), [invoice numbering rules under GST](/blog/invoice-numbering-rules-gst).",
      },
      {
        t: "cta",
        text: "Make the right document in a minute — free, with no sign-up and no watermark.",
        to: "/general-bill",
        label: "Make a free bill",
      },
    ],
    faqs: [
      { q: "What is the difference between an invoice and a receipt?", a: "An invoice requests payment for goods or services supplied. A receipt confirms that the payment has been received." },
      { q: "Is a bill the same as an invoice?", a: "In everyday use, yes. Under GST, a tax invoice and a bill of supply are distinct documents with different rules." },
      { q: "What is a cash memo?", a: "A cash memo is a simple bill given for a counter sale, usually in cash, listing the items and the total." },
      { q: "Do I need to issue a receipt if I have given an invoice?", a: "It is good practice to issue a receipt when payment is received, especially for cash or part payments, because it is the customer's proof that the bill is settled." },
    ],
  },

  {
    slug: "proforma-invoice-vs-tax-invoice",
    title: "Proforma Invoice vs Tax Invoice: What's the Difference?",
    seoTitle: "Proforma Invoice vs Tax Invoice: What's the Difference?",
    description:
      "Proforma invoice vs tax invoice explained: purpose, GST treatment, input tax credit and when to use each — with a simple comparison table.",
    excerpt:
      "A proforma invoice is a preliminary bill; a tax invoice is the legal GST document. Learn when to use each and why the buyer cannot claim credit on a proforma.",
    published: "2026-10-26",
    updated: "2026-10-26",
    category: "GST Guide",
    keywords: ["proforma invoice vs tax invoice", "proforma invoice", "tax invoice", "GST invoice", "invoice free"],
    relatedTools: ["gst-invoice", "quotation-estimate", "purchase-order", "general-bill"],
    body: [
      {
        t: "p",
        text: "The Proforma Invoice looks like an invoice, but it is not actually a real invoice. It is used to send a document in advance, before a sale or purchase is confirmed. This means it is not a real transaction; it is only temporary. However, invoices are real bills. They are generated when our deal or order is confirmed and everything is finalized. At that time, we can generate a Tax Invoice or other bills to maintain a permanent transaction history.",
      },
      { t: "h2", id: "difference", text: "What is the difference between a proforma invoice and a tax invoice?" },
      {
        t: "p",
        text: "A **proforma invoice** is an estimate of what a sale will cost, sent in advance so the buyer can approve it or arrange payment. A **tax invoice** is issued at the time of supply, records the sale and the GST charged, and lets the buyer claim input tax credit. A proforma invoice does none of that.",
      },
      {
        t: "table",
        caption: "Proforma invoice vs tax invoice",
        head: ["", "Proforma invoice", "GST tax invoice"],
        rows: [
          ["Purpose", "Preliminary bill or price confirmation", "Legal record of a taxable supply"],
          ["When issued", "Before the supply", "At the time of supply, as GST law requires"],
          ["Creates tax liability?", "No", "Yes — it is the document on which GST is charged"],
          ["Input tax credit for buyer", "Not available", "Available, if the buyer is eligible"],
          ["Invoice number", "Usually a separate series", "Consecutive series under the GST rules"],
          ["Governing rules", "Not a GST document", "Section 31, CGST Act and Rule 46"],
        ],
      },
      { t: "h2", id: "when-proforma", text: "When should you use a proforma invoice?" },
      {
        t: "ul",
        items: [
          "To give a buyer the final price and terms before they commit.",
          "To ask for an advance or for payment before dispatch.",
          "When a customer needs a document to arrange funds or approvals internally.",
          "For export or import paperwork, where it is often requested before shipment.",
        ],
      },
      {
        t: "p",
        text: "Mark it clearly — for example “Proforma Invoice — not a tax invoice” — so no one mistakes it for the real thing and tries to claim credit on it.",
      },
      { t: "h2", id: "when-tax", text: "When must you issue a tax invoice?" },
      {
        t: "p",
        text: "When you supply taxable goods or services, a registered supplier must issue a tax invoice within the time limits in the GST rules, with all the particulars described in [how to create a GST invoice](/blog/how-to-create-gst-invoice). Moving goods on a proforma invoice is not what the GST rules provide for; goods in transit should be accompanied by the right document, such as a tax invoice, bill of supply or [delivery challan](/blog/delivery-challan-vs-invoice).",
      },
      { t: "h2", id: "advances", text: "What if the customer pays an advance?" },
      {
        t: "p",
        text: "Receiving an advance does not turn a proforma invoice into a tax invoice. Depending on what you supply, GST rules may require a receipt voucher for an advance, and the tax treatment of advances differs between goods and services. Confirm the rule for your supply with a chartered accountant, and issue the tax invoice when the supply happens.",
      },
      { t: "h2", id: "vs-quotation", text: "Proforma invoice vs quotation" },
      {
        t: "p",
        text: "A quotation is an offer to supply at a price, usually valid for a period. A proforma invoice is more like a ready-to-pay bill for that offer. Neither is a tax invoice. If you only need to quote, use the free [quotation maker](/quotation-estimate).",
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains common invoicing practice in plain language. It is not tax or legal advice. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), [delivery challan vs invoice](/blog/delivery-challan-vs-invoice), [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice), [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply).",
      },
      {
        t: "cta",
        text: "Ready to issue the real thing? Create a GST tax invoice free — no sign-up, no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      { q: "Is a proforma invoice a tax invoice?", a: "No. A proforma invoice is a preliminary document. A GST tax invoice is the legal document issued at the time of supply." },
      { q: "Can the buyer claim input tax credit on a proforma invoice?", a: "No. Input tax credit requires a valid tax invoice showing the GST charged." },
      { q: "Do I need to issue a tax invoice after a proforma invoice?", a: "Yes. When the goods or services are supplied, issue a tax invoice with all the mandatory GST particulars." },
      { q: "Can I make a proforma invoice for free?", a: "Yes. You can prepare a quotation or invoice-style document free with BillsFreind; just label it clearly as a proforma if that is what it is." },
    ],
  },

  {
    slug: "delivery-challan-vs-invoice",
    title: "Delivery Challan vs Invoice: What's the Difference?",
    seoTitle: "Delivery Challan vs Invoice: What's the Difference?",
    description:
      "Delivery challan vs invoice under GST: when a challan is used, what it contains, how many copies are needed and how it differs from a tax invoice.",
    excerpt:
      "A delivery challan travels with goods; an invoice records the sale. Learn when each is used under GST and what a challan must contain.",
    published: "2026-10-26",
    updated: "2026-10-26",
    category: "GST Guide",
    keywords: ["delivery challan vs invoice", "delivery challan format", "delivery challan under GST", "GST invoice"],
    relatedTools: ["delivery-challan", "gst-invoice", "purchase-order", "general-bill"],
    body: [
      {
        t: "p",
        text: "Actually, a Delivery Challan and an Invoice are both different things, and both are used for different purposes. An Invoice is used for sales transactions and taxes, whereas a Delivery Challan is used for the details or transactions of goods being transported from one location to another.",
      },
      { t: "h2", id: "difference", text: "What is the difference between a delivery challan and an invoice?" },
      {
        t: "p",
        text: "An Invoice is generated for the supply of goods or services. It contains details of the value and taxes, serving as a record of the transaction value and applicable taxes on the goods. A Delivery Challan is different. It is used to maintain a transportation record of goods moving from one location to another. In simple words, a Delivery Challan is a document used to record the movement of goods during transportation.",
      },
      {
        t: "table",
        caption: "Delivery challan vs tax invoice",
        head: ["", "Delivery challan", "Tax invoice"],
        rows: [
          ["Purpose", "Accompany goods in transit where no invoice is issued at the time", "Record a taxable supply and the GST charged"],
          ["Demands payment?", "No", "Yes"],
          ["Buyer can claim ITC?", "No", "Yes, if eligible"],
          ["Typical use", "Job work, goods sent on approval, movement that is not a supply", "Sale of goods or services"],
          ["Governing rule", "Rule 55, CGST Rules", "Rule 46, CGST Rules"],
        ],
      },
      { t: "h2", id: "when-challan", text: "When is a delivery challan used?" },
      {
        t: "p",
        text: "Rule 55 of the CGST Rules allows a delivery challan, in place of an invoice, in situations such as:",
      },
      {
        t: "ul",
        items: [
          "Transporting goods for **job work**.",
          "Transporting goods for reasons **other than a supply** — for example goods sent for repair or display.",
          "Supply of goods where the **exact quantity is not known** at the time of removal, such as liquid gas.",
          "Goods sent **on approval** for sale or return, before the supply takes place.",
        ],
      },
      {
        t: "p",
        text: "The rule also covers a few other notified cases. Check Rule 55 for your situation.",
      },
      { t: "h2", id: "contents", text: "What must a delivery challan contain?" },
      {
        t: "ul",
        items: [
          "The challan **date and a consecutive number**",
          "**Name, address and GSTIN** of the consignor (and of the consignee, if registered)",
          "**HSN code**, description and quantity of the goods",
          "**Taxable value, tax rate and tax amount** where the movement is a supply",
          "**Place of supply** for inter-state movement, and the place of delivery",
          "**Signature** of the consignor or authorised representative",
        ],
      },
      {
        t: "p",
        text: "Challans are issued in triplicate for goods: the original goes to the consignee, the duplicate to the transporter and the triplicate stays with the consignor. Goods of higher value may also need an e-way bill; check the current limit and rules.",
      },
      { t: "h2", id: "after-challan", text: "Do you still issue an invoice after a challan?" },
      {
        t: "p",
        text: "If the movement turns out to be a supply — for example the buyer accepts goods sent on approval — you issue a tax invoice within the time the GST rules allow. A challan alone does not record a taxable sale. Learn what the invoice must contain in [how to create a GST invoice](/blog/how-to-create-gst-invoice).",
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide summarises common rules in plain language. It is not tax or legal advice. Confirm your position with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice), [HSN code vs SAC code](/blog/hsn-code-vs-sac-code), [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), [invoice numbering rules under GST](/blog/invoice-numbering-rules-gst).",
      },
      {
        t: "cta",
        text: "Need to send goods? Create a delivery challan free — no sign-up, no watermark.",
        to: "/delivery-challan",
        label: "Create a delivery challan",
      },
    ],
    faqs: [
      { q: "What is a delivery challan?", a: "A delivery challan is a document that accompanies goods in transit when a tax invoice is not issued at the time, for example for job work or goods sent on approval." },
      { q: "Is a delivery challan the same as an invoice?", a: "No. A challan records the movement of goods; an invoice records a sale and the tax charged." },
      { q: "How many copies of a delivery challan are required?", a: "Three for goods: original for the consignee, duplicate for the transporter and triplicate for the consignor." },
      { q: "Can the buyer claim input tax credit on a delivery challan?", a: "No. Input tax credit requires a valid tax invoice." },
    ],
  },

  {
    slug: "hsn-code-vs-sac-code",
    title: "HSN Code vs SAC Code: What's the Difference?",
    seoTitle: "HSN Code vs SAC Code: What's the Difference?",
    description:
      "HSN code vs SAC code explained: what they are, how many digits your GST invoice needs, how to find your code and common mistakes to avoid.",
    excerpt:
      "HSN codes classify goods and SAC codes classify services. See how many digits a GST invoice needs and how to find the right code.",
    published: "2026-10-26",
    updated: "2026-10-26",
    category: "GST Guide",
    keywords: ["HSN code vs SAC code", "HSN code", "SAC code", "HSN code for GST invoice", "GST invoice"],
    relatedTools: ["gst-invoice", "quotation-estimate", "purchase-order", "delivery-challan"],
    body: [
      {
        t: "p",
        text: "Every line on a GST invoice needs a classification code, and the code depends on whether you sell goods or services. Goods use **HSN codes**; services use **SAC codes**. Using the right one — with the right number of digits — keeps your invoice valid and helps your buyer claim credit.",
      },
      { t: "h2", id: "difference", text: "What is the difference between an HSN code and a SAC code?" },
      {
        t: "p",
        text: "An **HSN code** (Harmonised System of Nomenclature) classifies **goods**. A **SAC** (Services Accounting Code) classifies **services**. SAC codes are six digits and begin with 99; HSN codes for goods do not.",
      },
      {
        t: "table",
        caption: "HSN vs SAC",
        head: ["", "HSN code", "SAC code"],
        rows: [
          ["Used for", "Goods", "Services"],
          ["Based on", "The international Harmonised System of Nomenclature", "A services classification adopted for GST"],
          ["Format", "4, 6 or 8 digits", "6 digits, starting with 99"],
          ["Appears on", "GST invoices, challans, returns", "GST invoices, returns"],
        ],
      },
      { t: "h2", id: "digits", text: "How many digits must an invoice show?" },
      {
        t: "ul",
        items: [
          "**Annual turnover up to ₹5 crore:** 4-digit HSN on B2B invoices; optional on B2C invoices.",
          "**Annual turnover above ₹5 crore:** 6-digit HSN on all invoices.",
          "**Services:** the SAC code, which has six digits.",
        ],
      },
      {
        t: "p",
        text: "These limits come from Notification 78/2020-Central Tax as amended. Check the current text if your turnover is near a threshold.",
      },
      { t: "h2", id: "find-code", text: "How do you find the right HSN or SAC code?" },
      {
        t: "ol",
        items: [
          "Describe exactly what you sell — material, use and form.",
          "Search for the item in the official GST portal's HSN/SAC search or the customs tariff.",
          "Pick the most specific matching entry and note its GST rate.",
          "If two codes seem possible, ask a chartered accountant or check the notifications — the wrong code can mean the wrong tax rate.",
        ],
      },
      { t: "h2", id: "rate", text: "Does the HSN code decide the GST rate?" },
      {
        t: "p",
        text: "Yes. The GST rate attaches to the code and description, not to the product name you use at the shop. Since the GST rate rationalisation on 22 September 2025, most goods and services are taxed at 5% or 18%, with 40% on a small list of items. Always confirm the rate for your code. Once you have it, see [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice).",
      },
      { t: "h2", id: "mistakes", text: "Common HSN and SAC mistakes" },
      {
        t: "ol",
        items: [
          "**Leaving the code blank** where it is required.",
          "**Using a goods code for a service**, or the reverse.",
          "**Too few digits** for your turnover.",
          "**Copying a code from a competitor** without checking it matches your product.",
        ],
      },
      {
        t: "callout",
        title: "General information only",
        text: "This guide explains classification codes in plain language. It is not tax or legal advice. Rates and rules change, so confirm with a chartered accountant. See our [disclaimer](/disclaimer).",
      },
      {
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice), [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply), [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice), [delivery challan vs invoice](/blog/delivery-challan-vs-invoice).",
      },
      {
        t: "cta",
        text: "Add HSN/SAC codes to every line and download a GST invoice free — no sign-up, no watermark.",
        to: "/gst-invoice",
        label: "Create a GST invoice",
      },
    ],
    faqs: [
      { q: "What is an HSN code?", a: "An HSN code is a standard code that classifies goods for tax purposes. It appears on GST invoices and determines the GST rate." },
      { q: "What is a SAC code?", a: "A SAC code classifies services under GST. It has six digits and begins with 99." },
      { q: "How many digits of HSN code are required on a GST invoice?", a: "Businesses with annual turnover up to ₹5 crore generally need 4 digits on B2B invoices; above ₹5 crore, 6 digits on all invoices." },
      { q: "Does BillsFreind support HSN/SAC codes?", a: "Yes. The GST invoice generator has an HSN/SAC field on every line item." },
    ],
  },

  {
    slug: "gst-invoice-vs-bill-of-supply",
    keywords: ["GST invoice vs bill of supply", "bill of supply", "GST invoice", "invoice bill"],
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
      {
        t: "img",
        src: "/blog/gst-invoice-sample.webp",
        alt: "Sample GST tax invoice showing tax charged, unlike a bill of supply, created with the free BillsFreind GST invoice generator",
        caption: "A GST tax invoice shows the tax separately; a bill of supply does not (fictional data).",
        width: 900,
        height: 1272,
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
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice), [HSN code vs SAC code](/blog/hsn-code-vs-sac-code), [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice).",
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
    keywords: ["how to calculate GST on invoice", "GST calculation", "GST invoice", "GST formula", "invoice bill"],
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
      {
        t: "img",
        src: "/blog/gst-invoice-sample.webp",
        alt: "GST invoice with HSN codes and CGST SGST calculated per line item, generated free online with BillsFreind",
        caption: "A finished GST invoice with the tax calculated line by line (fictional data).",
        width: 900,
        height: 1272,
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
        t: "p",
        text: "**Related guides:** [how to create a GST invoice](/blog/how-to-create-gst-invoice), [HSN code vs SAC code](/blog/hsn-code-vs-sac-code), [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply), [choosing a free invoice generator in India](/blog/best-free-invoice-generator-india), [electrician, plumber and mechanic bill format](/blog/electrician-plumber-mechanic-bill-format).",
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
    keywords: ["GST invoice", "how to create a GST invoice", "GST invoice format", "free GST invoice generator", "invoice free"],
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
        t: "p",
        text: "**Related guides:** [GST invoice vs bill of supply](/blog/gst-invoice-vs-bill-of-supply), [how to calculate GST on an invoice](/blog/how-to-calculate-gst-on-invoice), [HSN code vs SAC code](/blog/hsn-code-vs-sac-code), [proforma invoice vs tax invoice](/blog/proforma-invoice-vs-tax-invoice), [invoice numbering rules under GST](/blog/invoice-numbering-rules-gst).",
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
    keywords: ["invoice free", "free bill generator", "make invoice online free", "payment receipt", "invoice bill"],
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
        text: "If you are a freelancer or have a small business, generating bills and providing them to your customers can be very helpful for you. This is a professional way to manage your billing. If you have a small business, you don't need to pay a large amount for expensive billing software. You can simply use BillsFreind.in, a free website where you can create bills online . It's also very simple to use. Just search for BillsFreind.in on Google and visit the website. If you face any issues, go to the Blog page to learn how to use the website. If you still have any questions, you can visit the Contact page, where you wll find a contact form. You can simply send an email if you have any queries about billing.",
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
        t: "p",
        text: "**Related guides:** [invoice vs bill vs receipt](/blog/invoice-vs-bill-vs-receipt), [choosing a free invoice generator in India](/blog/best-free-invoice-generator-india), [how to make a rent receipt for HRA](/blog/how-to-make-rent-receipt-for-hra), [fuel bill for reimbursement](/blog/fuel-bill-for-reimbursement), [how to create a GST invoice](/blog/how-to-create-gst-invoice).",
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

/** Related guides: most shared generator tools first, then same category, then newest. */
export const otherPosts = (slug: string, n = 4): BlogPost[] => {
  const cur = BLOG_POSTS.find((p) => p.slug === slug);
  const score = (p: BlogPost) =>
    (cur ? p.relatedTools.filter((t) => cur.relatedTools.includes(t)).length : 0) + (cur && p.category === cur.category ? 2 : 0);
  return BLOG_POSTS.filter((p) => p.slug !== slug)
    .map((p, i) => ({ p, i, s: score(p) }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.p);
};

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