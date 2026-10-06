// The preset manifest: every document generator is this engine + one config object.

import type { DocData, DocItem, ExtraField, Party, ToolPreset } from "./types";
import { DEFAULT_BUSINESS } from "./storage";
import { todayISO } from "./format";

export const ACCENTS = [
  { name: "Obsidian", value: "#0F172A" },
  { name: "Ocean Blue", value: "#0284C7" },
  { name: "Forest Emerald", value: "#059669" },
  { name: "Royal Amber", value: "#B45309" },
  { name: "Crimson", value: "#DC2626" },
  { name: "Amethyst", value: "#7C3AED" },
];

const E = (key: string, label: string, type: ExtraField["type"] = "text", placeholder = ""): ExtraField => ({
  key, label, type, placeholder,
});

const SAMPLE_BUSINESS: Party = {
  ...DEFAULT_BUSINESS,
  name: "Sharma Traders",
  address: "12, Anna Salai, T. Nagar,\nChennai, Tamil Nadu 600017",
  phone: "+91 98400 12345",
  email: "billing@sharmatraders.in",
  gstin: "33ABCDE1234F1Z5",
  pan: "ABCDE1234F",
  upiId: "sharmatraders@okicici",
};

const SAMPLE_CLIENT: Party = {
  ...DEFAULT_BUSINESS,
  name: "Mehta & Sons Hardware",
  address: "88, Commercial Street,\nBengaluru, Karnataka 560001",
  phone: "+91 98860 45678",
  email: "accounts@mehtasons.in",
  gstin: "29AACCM1234K1Z2",
  pan: "AACCM1234K",
};

function items(list: Array<[string, string, number, string, number, number]>): DocItem[] {
  return list.map(([desc, hsn, qty, unit, rate, gstRate], i) => ({
    id: crypto.randomUUID(), desc, hsn, qty, unit, rate, gstRate,
  }));
}

export function emptyDoc(preset: ToolPreset, business: Party, number: string): DocData {
  return {
    presetId: preset.id,
    templateStyle: "classic",
    accent: preset.accent,
    currency: "INR",
    number,
    issueDate: todayISO(),
    dueDate: "",
    business: { ...business },
    client: { name: "", address: "", phone: "", email: "", gstin: "", pan: "", logo: "", upiId: "" },
    items: [newItem(preset), newItem(preset)],
    taxMode: preset.taxMode === "gst" && !preset.gstOptional ? "intra" : "none",
    discountPct: 0,
    roundTotal: true,
    notes: "",
    terms: "",
    signName: business.name || "",
    singleAmount: 0,
    extra: {},
    bank: "",
    signature: "",
  };
}

export function newItem(preset: ToolPreset, kind?: string): DocItem {
  return {
    id: crypto.randomUUID(), desc: "", hsn: "", qty: 1, unit: "NOS", rate: 0,
    gstRate: preset.taxMode === "gst" ? 18 : 0,
    ...(preset.itemKinds ? { kind: kind ?? preset.itemKinds[0].id } : {}),
  };
}

export const TOOL_PRESETS: ToolPreset[] = [
  {
    id: "gst-invoice", layout: "invoice", name: "GST Tax Invoice", docTitle: "TAX INVOICE", category: "business", badge: "B2B / B2C",
    description: "GST-compliant invoice with HSN/SAC codes, CGST/SGST/IGST breakdown, place of supply and reverse-charge note.",
    seoTitle: "Free GST Invoice Generator Online (PDF) | BillsFriend",
    seoDescription: "Create a GST tax invoice with HSN/SAC codes, CGST/SGST/IGST split, place of supply and amount in words. Free, no sign-up, instant A4 PDF.",
    accent: "#0F172A", taxMode: "gst", amountMode: "items", numberPrefix: "INV", numberLabel: "Invoice No.",
    fromLabel: "Supplier Details", toLabel: "Bill To", amountLabel: "Invoice Amount", itemLabel: "Description of Goods / Services",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: true,
    extraFields: [E("placeOfSupply", "Place of Supply"), E("poNumber", "P.O. Number"), E("reverseCharge", "Reverse Charge", "text", "No")],
  },
  {
    id: "general-bill", layout: "cashmemo", name: "General Bill / Cash Memo", docTitle: "BILL / CASH MEMO", category: "business", badge: "Universal",
    description: "Clean modern retail bill with itemized quantities, unit rates, discount and a signature line.",
    seoTitle: "Free Bill & Cash Memo Generator Online | BillsFriend",
    seoDescription: "Make a printable bill or cash memo with itemised quantities, rates, discount and signature line. Free, no sign-up, no watermark, instant PDF.",
    accent: "#0284C7", taxMode: "none", amountMode: "items", numberPrefix: "BILL", numberLabel: "Bill No.",
    fromLabel: "Billed By", toLabel: "Bill To", amountLabel: "Bill Amount", itemLabel: "Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false, extraFields: [],
  },
  {
    id: "cash-voucher", layout: "voucher", name: "Cash Voucher", docTitle: "CASH VOUCHER", category: "financial", badge: "Accounts",
    description: "Traditional cash voucher with payee details, particulars, amount in words, payment reference and approval signatures.",
    seoTitle: "Free Cash Voucher Generator Online (PDF) | BillsFriend",
    seoDescription: "Create a printable cash payment voucher with payee GST and PAN, particulars, amount in words and approval signatures. Free instant PDF.",
    accent: "#0369A1", taxMode: "none", amountMode: "single", numberPrefix: "CV", numberLabel: "Voucher No.",
    fromLabel: "Prepared By", toLabel: "Pay To", amountLabel: "Voucher Amount", itemLabel: "Particulars",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    extraFields: [E("particulars", "Particulars", "text", "Being cash paid for…"), E("paymentMode", "Payment Mode", "text", "Cash / Cheque"), E("chequeNumber", "Cash / Cheque No."), E("accountOf", "Account Of")],
  },
  {
    id: "payment-receipt", layout: "receipt", name: "Payment Receipt", docTitle: "PAYMENT RECEIPT", category: "financial", badge: "Voucher",
    description: "Formal proof of payment received via Cash / UPI / NEFT / Cheque, with transaction reference and balance due.",
    seoTitle: "Free Payment Receipt Generator Online | BillsFriend",
    seoDescription: "Generate a payment receipt with amount in words, payment mode, transaction reference and balance due. Free, no sign-up, instant PDF download.",
    accent: "#16A34A", taxMode: "none", amountMode: "single", numberPrefix: "RCPT", numberLabel: "Receipt No.",
    fromLabel: "Received By", toLabel: "Received From", amountLabel: "Amount Received", itemLabel: "Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    extraFields: [E("purpose", "Being payment towards", "text", "e.g. Invoice INV-0042 / advance for work"), E("paymentMode", "Payment Mode", "text", "Cash / UPI / NEFT / Cheque"), E("transactionRef", "Transaction / Cheque Ref."), E("balanceDue", "Balance Due (₹)", "number")],
  },
  {
    id: "quotation-estimate", layout: "invoice", name: "Quotation & Estimate", docTitle: "QUOTATION / ESTIMATE", category: "business", badge: "Commercial",
    description: "Formal project quotation with validity period, itemized pricing and an acceptance sign-off block.",
    seoTitle: "Free Quotation & Estimate Maker Online | BillsFriend",
    seoDescription: "Build a professional quotation or estimate with itemised pricing, GST, validity period and terms. Free, no sign-up, instant PDF download.",
    accent: "#4F46E5", taxMode: "gst", amountMode: "items", numberPrefix: "QT", numberLabel: "Quotation No.",
    fromLabel: "Quotation By", toLabel: "Quotation For", amountLabel: "Quoted Amount", itemLabel: "Scope / Item",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    extraFields: [E("validity", "Valid Until (days)", "number"), E("projectRef", "Project / Enquiry Ref.")],
  },
  {
    id: "purchase-order", layout: "invoice", name: "Purchase Order (PO)", docTitle: "PURCHASE ORDER", category: "procurement", badge: "Supply Chain",
    description: "Official vendor purchase order with delivery terms, shipping method and authorized signatory block.",
    seoTitle: "Free Purchase Order (PO) Generator | BillsFriend",
    seoDescription: "Create a purchase order with vendor details, HSN codes, delivery terms and authorised signatory. Free, no sign-up, instant A4 PDF.",
    accent: "#0D9488", taxMode: "gst", amountMode: "items", numberPrefix: "PO", numberLabel: "P.O. No.",
    fromLabel: "Ordered By", toLabel: "Vendor / Supplier", amountLabel: "Order Value", itemLabel: "Item / Material",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: true,
    extraFields: [E("deliveryTerms", "Delivery Terms"), E("shippingMethod", "Shipping Method"), E("warehouseCode", "Warehouse Code")],
  },
  {
    id: "delivery-challan", layout: "challan", name: "Delivery Challan", docTitle: "DELIVERY CHALLAN", category: "logistics", badge: "Dispatch",
    description: "Goods dispatch note with vehicle registration, driver contact, dispatch details and receiver stamp box.",
    seoTitle: "Free Delivery Challan Generator Online | BillsFriend",
    seoDescription: "Make a delivery challan with vehicle number, dispatch details and receiver's signature box. Free, no sign-up, print-ready A4 PDF.",
    accent: "#EA580C", taxMode: "none", amountMode: "items", numberPrefix: "CH", numberLabel: "Challan No.",
    fromLabel: "Dispatch By", toLabel: "Deliver To", amountLabel: "Goods Value", itemLabel: "Goods Description",
    qtyLabel: "Qty", rateLabel: "Value", showHsn: false,
    extraFields: [E("vehicleNumber", "Vehicle Number"), E("driverPhone", "Driver Contact"), E("dispatchThrough", "Dispatch Through"), E("destination", "Destination")],
  },
  {
    id: "rent-receipt", layout: "receipt", name: "House Rent Receipt", docTitle: "RENT RECEIPT", category: "personal_tax", badge: "HRA Exemption",
    description: "Month-wise house rent receipt for income-tax (HRA) claims with landlord PAN and property address.",
    seoTitle: "Free Rent Receipt Generator for HRA | BillsFriend",
    seoDescription: "Create month-wise house rent receipts for HRA tax claims with landlord PAN and revenue stamp box. Free, no sign-up, instant PDF.",
    accent: "#B45309", taxMode: "none", amountMode: "single", numberPrefix: "RENT", numberLabel: "Receipt No.",
    fromLabel: "Landlord", toLabel: "Tenant", amountLabel: "Rent Received", itemLabel: "Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    extraFields: [E("rentPeriod", "Rent Period (Month/Year)"), E("propertyAddress", "Property Address"), E("paymentMode", "Payment Mode", "text", "Cash / UPI / Bank Transfer")],
  },
  {
    id: "salary-slip", layout: "payslip", name: "Salary Slip / Payslip", docTitle: "SALARY SLIP", category: "hr_payroll", badge: "HR & Payroll",
    description: "Monthly pay summary with Earnings vs Deductions, net payable in words and employer signature.",
    seoTitle: "Free Salary Slip Generator Online (PDF) | BillsFriend",
    seoDescription: "Generate a salary slip with earnings, deductions, net pay in words and employer signature. Free, no sign-up, no watermark, instant PDF.",
    accent: "#2563EB", taxMode: "none", amountMode: "items", numberPrefix: "PAY", numberLabel: "Payslip No.",
    fromLabel: "Employer", toLabel: "Employee", amountLabel: "Net Payable", itemLabel: "Earnings (+) / Deductions (−)",
    qtyLabel: "Days", rateLabel: "Amount", showHsn: false,
    extraFields: [E("payPeriod", "Pay Period (Month/Year)"), E("employeeId", "Employee ID"), E("designation", "Designation"), E("workingDays", "Working Days", "number")],
  },
  {
    id: "driver-salary", layout: "receipt", name: "Driver Salary Receipt", docTitle: "DRIVER SALARY RECEIPT", category: "personal_tax", badge: "Perk Exemption",
    description: "Income-tax claim receipt for driver compensation with vehicle registration number and declaration.",
    seoTitle: "Free Driver Salary Receipt Generator | BillsFriend",
    seoDescription: "Create a driver salary receipt with vehicle number and declaration for income-tax perquisite claims. Free, no sign-up, instant PDF.",
    accent: "#7C3AED", taxMode: "none", amountMode: "single", numberPrefix: "DSR", numberLabel: "Receipt No.",
    fromLabel: "Employer", toLabel: "Driver", amountLabel: "Salary Paid", itemLabel: "Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    extraFields: [E("vehicleNumber", "Vehicle Number"), E("salaryPeriod", "Salary Period (Month/Year)"), E("licenseNumber", "Driving Licence No.")],
  },
  {
    id: "fuel-bill", layout: "fuel", name: "Fuel / Petrol Receipt", docTitle: "FUEL RECEIPT", category: "reimbursement", badge: "Expense",
    description: "Fuel-station format receipt with fuel type, nozzle number, vehicle number and meter reading (rate inclusive of VAT).",
    seoTitle: "Free Petrol & Diesel Bill Generator | BillsFriend",
    seoDescription: "Make a petrol or diesel fuel receipt with nozzle, vehicle number and odometer reading for reimbursement. Free, no sign-up, instant PDF.",
    accent: "#D97706", taxMode: "none", amountMode: "items", numberPrefix: "FUEL", numberLabel: "Bill No.",
    fromLabel: "Fuel Station", toLabel: "Customer", amountLabel: "Total Fuel Amount", itemLabel: "Fuel Type / Grade",
    qtyLabel: "Litres", rateLabel: "Rate / L", showHsn: false,
    extraFields: [E("vehicleNumber", "Vehicle Number"), E("nozzleNumber", "Nozzle Number"), E("odometer", "Odometer (km)", "number"), E("pumpName", "Pump / Outlet Code")],
  },
  {
    id: "restaurant-bill", layout: "cashmemo", name: "Restaurant Bill", docTitle: "RESTAURANT BILL", category: "reimbursement", badge: "F&B",
    description: "Dine-in / takeaway food bill with table number, steward name, service charge and FSSAI number.",
    seoTitle: "Free Restaurant Bill Generator Online | BillsFriend",
    seoDescription: "Create a restaurant bill with table number, GST, steward name and FSSAI licence number. Free, no sign-up, no watermark, instant PDF.",
    accent: "#DC2626", taxMode: "gst", amountMode: "items", numberPrefix: "FNB", numberLabel: "Bill No.",
    fromLabel: "Restaurant", toLabel: "Guest", amountLabel: "Bill Amount", itemLabel: "Cuisine / Item",
    qtyLabel: "Qty", rateLabel: "Price", showHsn: false,
    extraFields: [E("tableNumber", "Table Number"), E("diningMode", "Dine-in / Takeaway / Delivery"), E("stewardName", "Steward / Server"), E("fssaiNumber", "FSSAI License No.")],
  },
  {
    id: "hotel-stay-bill", layout: "invoice", name: "Hotel Stay Bill", docTitle: "HOTEL FOLIO / BILL", category: "travel", badge: "Hospitality",
    description: "Lodging folio with check-in / check-out dates, room category, guest details and taxes.",
    seoTitle: "Free Hotel Bill & Folio Generator | BillsFriend",
    seoDescription: "Generate a hotel stay folio with check-in and check-out dates, room category and GST breakup. Free, no sign-up, instant PDF download.",
    accent: "#0891B2", taxMode: "gst", amountMode: "items", numberPrefix: "HTL", numberLabel: "Folio No.",
    fromLabel: "Hotel", toLabel: "Guest", amountLabel: "Total Tariff", itemLabel: "Room / Service",
    qtyLabel: "Nights", rateLabel: "Tariff", showHsn: true,
    extraFields: [E("roomNumber", "Room Number"), E("roomCategory", "Room Category"), E("checkIn", "Check-in", "date"), E("checkOut", "Check-out", "date"), E("guests", "Guests", "number")],
  },
  {
    id: "cab-trip-receipt", layout: "invoice", name: "Cab / Taxi Receipt", docTitle: "CAB / TAXI RECEIPT", category: "travel", badge: "Commute",
    description: "Trip summary with pickup / drop locations, distance, toll charges, waiting time and vehicle model.",
    seoTitle: "Free Cab & Taxi Receipt Generator | BillsFriend",
    seoDescription: "Create a cab or taxi receipt with pickup, drop, distance, toll and waiting charges. Free, no sign-up, instant PDF for reimbursement.",
    accent: "#65A30D", taxMode: "gst", amountMode: "items", numberPrefix: "CAB", numberLabel: "Receipt No.",
    fromLabel: "Cab Operator", toLabel: "Passenger", amountLabel: "Fare Total", itemLabel: "Charge Head",
    qtyLabel: "Qty", rateLabel: "Amount", showHsn: false,
    extraFields: [E("pickup", "Pickup Location"), E("drop", "Drop Location"), E("distanceKm", "Distance (km)", "number"), E("vehicleModel", "Vehicle Model"), E("tripDate", "Trip Date", "date")],
  },
  {
    id: "wifi-internet-bill", layout: "invoice", name: "Internet / Broadband Bill", docTitle: "INTERNET / BROADBAND BILL", category: "reimbursement", badge: "Utility",
    description: "Broadband billing invoice with plan speed, billing cycle, data quota and account number.",
    seoTitle: "Free Internet & Broadband Bill Generator | BillsFriend",
    seoDescription: "Make an internet or broadband bill with plan speed, billing cycle, data quota and account number. Free, no sign-up, instant PDF.",
    accent: "#0284C7", taxMode: "gst", amountMode: "items", numberPrefix: "NET", numberLabel: "Invoice No.",
    fromLabel: "ISP / Provider", toLabel: "Subscriber", amountLabel: "Amount Payable", itemLabel: "Plan / Charge",
    qtyLabel: "Months", rateLabel: "Amount", showHsn: false,
    extraFields: [E("planSpeed", "Plan Speed"), E("billingCycle", "Billing Cycle"), E("dataQuota", "Data Quota"), E("accountNumber", "Account Number")],
  },
  {
    id: "medical-pharmacy-bill", layout: "cashmemo", name: "Medical / Pharmacy Bill", docTitle: "PHARMACY BILL", category: "health_insurance", badge: "Health Claim",
    description: "Pharmacy cash memo with doctor name, patient details, medicine batch numbers and drug license.",
    seoTitle: "Free Medical & Pharmacy Bill Generator | BillsFriend",
    seoDescription: "Create a pharmacy bill with doctor, patient, batch and expiry details and drug licence number. Free, no sign-up, instant PDF download.",
    accent: "#059669", taxMode: "gst", amountMode: "items", numberPrefix: "MED", numberLabel: "Bill No.",
    fromLabel: "Pharmacy / Hospital", toLabel: "Patient", amountLabel: "Medicine Total", itemLabel: "Medicine / Item",
    qtyLabel: "Qty", rateLabel: "MRP", showHsn: true, hsnLabel: "Batch / Exp",
    extraFields: [E("doctorName", "Doctor Name"), E("patientAge", "Patient Age", "number"), E("doctorRegNo", "Doctor Reg. No."), E("drugLicense", "Drug License No.")],
  },
  {
    id: "electrician-bill", layout: "service", name: "Electrician Bill", docTitle: "ELECTRICIAN BILL", category: "services", badge: "Home Service",
    description: "Job bill for wiring, repairs and installations — separate material and labour charges, site address, warranty and optional GST.",
    seoTitle: "Free Electrician Bill Format & Generator | BillsFriend",
    seoDescription: "Make an electrician bill with material and labour charges, site address, warranty and optional GST. Free, no sign-up, instant A4 PDF.",
    accent: "#A16207", taxMode: "gst", gstOptional: true, amountMode: "items", numberPrefix: "ELC", numberLabel: "Bill No.",
    fromLabel: "Electrician / Contractor", toLabel: "Customer", amountLabel: "Total Payable", itemLabel: "Work / Material Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    itemKinds: [{ id: "part", label: "Material / Spares" }, { id: "labour", label: "Labour / Service Charges" }],
    extraFields: [E("siteAddress", "Site / Job Address"), E("jobType", "Type of Work", "text", "Wiring / Repair / Installation"), E("technician", "Technician Name"), E("warrantyPeriod", "Warranty on Work")],
  },
  {
    id: "plumber-bill", layout: "service", name: "Plumber Bill", docTitle: "PLUMBER BILL", category: "services", badge: "Home Service",
    description: "Job bill for plumbing, leakage repair and fittings — material and labour charges, site address, warranty and optional GST.",
    seoTitle: "Free Plumber Bill Format & Generator | BillsFriend",
    seoDescription: "Create a plumber bill with fittings, labour charges, site address, warranty and optional GST. Free, no sign-up, instant A4 PDF download.",
    accent: "#0E7490", taxMode: "gst", gstOptional: true, amountMode: "items", numberPrefix: "PLB", numberLabel: "Bill No.",
    fromLabel: "Plumber / Contractor", toLabel: "Customer", amountLabel: "Total Payable", itemLabel: "Work / Material Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: false,
    itemKinds: [{ id: "part", label: "Fittings / Material" }, { id: "labour", label: "Labour / Service Charges" }],
    extraFields: [E("siteAddress", "Site / Job Address"), E("jobType", "Type of Work", "text", "Leakage / Fitting / Pipeline"), E("technician", "Technician Name"), E("warrantyPeriod", "Warranty on Work")],
  },
  {
    id: "mechanic-bill", layout: "service", name: "Mechanic / Garage Bill", docTitle: "SERVICE INVOICE", category: "services", badge: "Vehicle Service",
    description: "Garage job-card invoice with vehicle number, model, odometer, spare parts and labour charges, next service due and optional GST.",
    seoTitle: "Free Mechanic & Garage Bill Generator | BillsFriend",
    seoDescription: "Make a garage or mechanic bill with vehicle number, spare parts, labour, next service due and GST. Free, no sign-up, instant PDF.",
    accent: "#9A3412", taxMode: "gst", gstOptional: true, amountMode: "items", numberPrefix: "GRG", numberLabel: "Invoice No.",
    fromLabel: "Garage / Workshop", toLabel: "Customer", amountLabel: "Total Payable", itemLabel: "Part / Service Description",
    qtyLabel: "Qty", rateLabel: "Rate", showHsn: true,
    itemKinds: [{ id: "part", label: "Spare Parts" }, { id: "labour", label: "Labour / Service Charges" }],
    extraFields: [E("vehicleNumber", "Vehicle Number"), E("vehicleModel", "Vehicle Make / Model"), E("odometer", "Odometer (km)", "number"), E("jobCardNo", "Job Card No."), E("nextService", "Next Service Due"), E("warrantyPeriod", "Warranty on Work")],
  },
];


export function getPreset(id: string | undefined): ToolPreset | undefined {
  return TOOL_PRESETS.find((p) => p.id === id);
}

// ---------------------------------------------------------------- sample data
export function sampleDoc(preset: ToolPreset): DocData {
  const base: DocData = {
    presetId: preset.id,
    templateStyle: "classic",
    accent: preset.accent,
    currency: "INR",
    number: `${preset.numberPrefix}-0042`,
    issueDate: todayISO(),
    dueDate: preset.id === "gst-invoice" ? todayISO() : "",
    business: { ...SAMPLE_BUSINESS },
    client: { ...SAMPLE_CLIENT },
    items: [],
    taxMode: preset.taxMode === "gst" && !preset.gstOptional ? "intra" : "none",
    discountPct: 0,
    roundTotal: true,
    notes: "",
    terms: "",
    signName: "R. Sharma",
    singleAmount: 0,
    extra: {},
    bank: "",
    signature: "",
  };

  switch (preset.id) {
    case "gst-invoice":
      base.items = items([
        ["LED Panel Light 18W", "9405", 24, "NOS", 420, 18],
        ["Copper Wire 1.5sqmm (90m)", "8544", 6, "RL", 1450, 18],
        ["Installation Service", "995421", 1, "JOB", 2500, 18],
      ]);
      base.dueDate = todayISO();
      base.extra = { placeOfSupply: "Karnataka (29)", poNumber: "PO-8841", reverseCharge: "No" };
      base.terms = "Payment due within 15 days. Interest @18% p.a. on overdue amounts.";
      base.notes = "Thank you for your business!";
      base.bank = "HDFC Bank, T. Nagar Branch\nA/c No. 50200012345678  ·  IFSC HDFC0000412";
      break;
    case "general-bill":
      base.items = items([
        ["Brass Hinges 4 inch", "", 12, "PCS", 85, 0],
        ["Door Stopper", "", 6, "PCS", 120, 0],
        ["Teak Wood Screws (box)", "", 4, "BOX", 210, 0],
      ]);
      base.notes = "Goods once sold will not be taken back.";
      break;
    case "cash-voucher":
      base.singleAmount = 440;
      base.client = { ...SAMPLE_CLIENT, name: "Raghav Sir", gstin: "29AACCM1234K1Z2", pan: "AACCM1234K" };
      base.extra = { particulars: "Being cash paid for machine spray foam WD-40", paymentMode: "Cash", chequeNumber: "", accountOf: "Workshop supplies" };
      base.signName = "Accounts Manager";
      break;
    case "payment-receipt":
      base.singleAmount = 25000;
      base.client = { ...SAMPLE_CLIENT, name: "Mehta & Sons Hardware" };
      base.extra = { purpose: "Invoice INV-0042 (part payment)", paymentMode: "UPI — HDFC", transactionRef: "UPI/339211447221", balanceDue: "15000" };
      base.notes = "Received with thanks. Balance of ₹15,000 payable before 30 Mar.";
      break;
    case "quotation-estimate":
      base.items = items([
        ["Office interior — civil work", "", 1, "LOT", 185000, 18],
        ["Modular workstations (8)", "", 8, "NOS", 14500, 18],
        ["Networking & cabling", "", 1, "LOT", 32000, 18],
      ]);
      base.extra = { validity: "15", projectRef: "ENQ-2291" };
      base.notes = "Prices inclusive of GST. Valid for 15 days from date of issue.";
      break;
    case "purchase-order":
      base.items = items([
        ["A4 Copier Paper 75gsm", "4802", 100, "REAM", 265, 18],
        ["Toner Cartridge 2612A", "8443", 10, "NOS", 3350, 18],
        ["File Folders (box of 100)", "4821", 20, "BOX", 480, 12],
      ]);
      base.extra = { deliveryTerms: "FOB — 10 days", shippingMethod: "Road", warehouseCode: "WH-BLR-02" };
      break;
    case "delivery-challan":
      base.items = items([
        ["Cartons — LED lights (sealed)", "", 18, "CTN", 0, 0],
        ["Pallet — copper wire rolls", "", 2, "PLT", 0, 0],
      ]);
      base.extra = { vehicleNumber: "TN 09 BQ 4412", driverPhone: "+91 90940 22110", dispatchThrough: "SRL Roadways", destination: "Bengaluru Hub" };
      base.notes = "Goods in good condition received.";
      break;
    case "rent-receipt":
      base.singleAmount = 28000;
      base.client = { ...base.client, name: "Ankit Verma" };
      base.business = { ...SAMPLE_BUSINESS, name: "Sunita Devi", address: "22, Rose Villa, Indiranagar,\nBengaluru, Karnataka 560038", pan: "ABGPS9921K" };
      base.extra = { rentPeriod: "February 2026", propertyAddress: "Flat 4B, Rose Villa, Indiranagar, Bengaluru 560038", paymentMode: "Bank Transfer" };
      base.signName = "Sunita Devi";
      break;
    case "salary-slip":
      base.client = { ...base.client, name: "Pooja Nair" };
      base.items = items([
        ["Basic Pay", "", 1, "MTH", 45000, 0],
        ["House Rent Allowance", "", 1, "MTH", 18000, 0],
        ["Special Allowance", "", 1, "MTH", 7500, 0],
        ["Provident Fund (EPF)", "", 1, "MTH", -5400, 0],
        ["Professional Tax", "", 1, "MTH", -200, 0],
      ]);
      base.extra = { payPeriod: "February 2026", employeeId: "EMP-0142", designation: "Senior Designer", workingDays: "24" };
      base.notes = "This is a computer-generated payslip.";
      break;
    case "driver-salary":
      base.singleAmount = 22000;
      base.client = { ...base.client, name: "Mahesh Yadav" };
      base.extra = { vehicleNumber: "KA 05 MJ 7788", salaryPeriod: "February 2026", licenseNumber: "KA0320210004512" };
      base.notes = "Received full and final salary for the period stated above.";
      break;
    case "fuel-bill":
      base.items = items([["Diesel (HSD)", "", 42.5, "LTR", 94.2, 0]]);
      base.notes = "Price inclusive of VAT / taxes as applicable. Petrol & diesel are outside GST.";
      base.client = { ...base.client, name: "Self — Field Trip" };
      base.extra = { vehicleNumber: "TN 09 BQ 4412", nozzleNumber: "N-3", odometer: "48,215", pumpName: "IOCL — T. Nagar" };
      break;
    case "restaurant-bill":
      base.items = items([
        ["Paneer Butter Masala + Naan", "", 2, "PLT", 480, 5],
        ["Veg Fried Rice", "", 1, "PLT", 320, 5],
        ["Masala Papad", "", 2, "NOS", 90, 5],
        ["Filter Coffee", "", 2, "CUP", 120, 5],
      ]);
      base.extra = { tableNumber: "T-12", diningMode: "Dine-in", stewardName: "Karthik", fssaiNumber: "12419002000875" };
      break;
    case "hotel-stay-bill":
      base.items = items([
        ["Deluxe Room — tariff", "996311", 3, "NGT", 4200, 12],
        ["Airport transfers", "9964", 2, "TRP", 900, 5],
        ["Laundry", "9971", 1, "LOT", 450, 18],
      ]);
      base.extra = { roomNumber: "412", roomCategory: "Deluxe Twin", checkIn: todayISO(), checkOut: todayISO(), guests: "2" };
      break;
    case "cab-trip-receipt":
      base.items = items([
        ["Base fare + distance", "", 1, "TRP", 640, 5],
        ["Toll & parking", "", 1, "LOT", 185, 0],
        ["Waiting charges", "", 30, "MIN", 2, 5],
      ]);
      base.extra = { pickup: "Indiranagar Metro", drop: "Kempegowda Airport T2", distanceKm: "38", vehicleModel: "Swift Dzire — White", tripDate: todayISO() };
      break;
    case "wifi-internet-bill":
      base.items = items([["Fiber 300 Mbps — monthly plan", "", 1, "MTH", 1180, 18]]);
      base.extra = { planSpeed: "300 Mbps", billingCycle: "01 Feb – 29 Feb 2026", dataQuota: "3.3 TB FUP", accountNumber: "ACT-88422190" };
      break;
    case "medical-pharmacy-bill":
      base.items = items([
        ["Pan-D 40mg (strip of 15)", "PD2411 / 08-27", 2, "STR", 148, 12],
        ["Azithral 500 (strip of 5)", "AZ9921 / 03-27", 1, "STR", 122, 12],
        ["Dettol Antiseptic 500ml", "DT4410 / 11-28", 1, "BTL", 245, 18],
        ["Crepe Bandage 10cm", "CB1182 / 06-29", 1, "NOS", 180, 12],
      ]);
      base.client = { ...base.client, name: "Ramesh Gupta" };
      base.extra = { doctorName: "Dr. A. Krishnan, MD", patientAge: "46", doctorRegNo: "TMC-44821", drugLicense: "TN-B20-88412" };
      break;
    case "electrician-bill":
      base.business = { ...SAMPLE_BUSINESS, name: "Shree Ram Electricals", address: "Shop 4, Gandhi Road,\nNashik, Maharashtra 422001", phone: "+91 98220 41100", email: "", gstin: "", pan: "", upiId: "shreeramelectricals@okaxis" };
      base.client = { ...base.client, name: "Mr. Vikas Patil", address: "Flat 302, Sai Residency,\nCollege Road, Nashik 422005", phone: "+91 98230 11456", gstin: "", pan: "", email: "" };
      base.items = items([
        ["MCB 32A Double Pole (Havells)", "", 2, "NOS", 640, 0],
        ["Copper Wire 2.5 sq.mm (90 m coil)", "", 1, "COIL", 3150, 0],
        ["Modular Switch & Socket set", "", 6, "NOS", 135, 0],
        ["Wiring & fitting labour — 2 BHK", "", 1, "JOB", 3500, 0],
        ["Visit & testing charges", "", 1, "VISIT", 300, 0],
      ]);
      base.items[3].kind = "labour"; base.items[4].kind = "labour";
      base.items.slice(0, 3).forEach((i) => { i.kind = "part"; });
      base.extra = { siteAddress: "Flat 302, Sai Residency, College Road, Nashik", jobType: "Rewiring & MCB replacement", technician: "Ramesh Kale", warrantyPeriod: "6 months on workmanship" };
      base.notes = "Material warranty as per manufacturer. Payment due on completion of work.";
      break;
    case "plumber-bill":
      base.business = { ...SAMPLE_BUSINESS, name: "Om Sai Plumbing Works", address: "Plot 12, Panchavati,\nNashik, Maharashtra 422003", phone: "+91 97650 33210", email: "", gstin: "", pan: "", upiId: "" };
      base.client = { ...base.client, name: "Mrs. Sunita Deshmukh", address: "B-14, Ganga Heights,\nGangapur Road, Nashik 422013", phone: "+91 98812 55043", gstin: "", pan: "", email: "" };
      base.items = items([
        ["CPVC Pipe 1 inch (3 m)", "", 4, "NOS", 285, 0],
        ["Ball Valve 1 inch (brass)", "", 2, "NOS", 360, 0],
        ["Wash basin mixer tap (Jaquar)", "", 1, "NOS", 2450, 0],
        ["Bathroom leakage repair & pipe fitting", "", 1, "JOB", 2200, 0],
        ["Mixer tap installation", "", 1, "JOB", 400, 0],
      ]);
      base.items[0].kind = "part"; base.items[1].kind = "part"; base.items[2].kind = "part";
      base.items[3].kind = "labour"; base.items[4].kind = "labour";
      base.extra = { siteAddress: "B-14, Ganga Heights, Gangapur Road, Nashik", jobType: "Bathroom leakage & fitting", technician: "Sandeep More", warrantyPeriod: "3 months on workmanship" };
      base.notes = "Please check work before payment. Thank you for choosing us.";
      break;
    case "mechanic-bill":
      base.business = { ...SAMPLE_BUSINESS, name: "Shivam Auto Garage", address: "Gala 7, MIDC Satpur,\nNashik, Maharashtra 422007", phone: "+91 98908 77120", email: "service@shivamauto.in", gstin: "27ABCDE1234F1Z5", pan: "ABCDE1234F", upiId: "" };
      base.client = { ...base.client, name: "Mr. Amit Joshi", address: "12, Shivaji Nagar,\nNashik, Maharashtra 422002", phone: "+91 99230 66781", gstin: "", pan: "", email: "" };
      base.items = items([
        ["Engine oil 5W-30 synthetic (3.5 L)", "2710", 1, "SET", 2150, 18],
        ["Oil filter", "8421", 1, "NOS", 340, 18],
        ["Front brake pads (set)", "8708", 1, "SET", 1850, 28],
        ["Periodic service labour", "9987", 1, "JOB", 1800, 18],
        ["Brake overhaul & wheel alignment", "9987", 1, "JOB", 900, 18],
      ]);
      base.items[0].kind = "part"; base.items[1].kind = "part"; base.items[2].kind = "part";
      base.items[3].kind = "labour"; base.items[4].kind = "labour";
      base.taxMode = "intra";
      base.extra = { vehicleNumber: "MH 15 FK 2214", vehicleModel: "Maruti Swift VXi", odometer: "48,210", jobCardNo: "JC-1187", nextService: "At 53,000 km or 6 months", warrantyPeriod: "30 days on labour" };
      base.notes = "Replaced parts handed over to customer on request.";
      break;
  }
  return base;
}
