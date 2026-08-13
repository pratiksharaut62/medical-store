import { Category, MedicineListing, CustomerOption, BillingSessionMeta } from "@/types/billing";

// Replace with a real product-search API (`GET /api/medicines?q=`) —
// components/billing/SearchBar and FrequentlySoldGrid both already
// read through useBillingSession, so only the hook's data source
// needs to change.

export const mockCategories: Category[] = [
  { id: "all", label: "All", icon: "all" },
  { id: "pain-relief", label: "Pain Relief", icon: "painRelief" },
  { id: "antibiotics", label: "Antibiotics", icon: "antibiotics" },
  { id: "vitamins", label: "Vitamins", icon: "vitamins" },
  { id: "diabetes", label: "Diabetes", icon: "diabetes" },
  { id: "cardiac", label: "Cardiac", icon: "cardiac" },
  { id: "ayurvedic", label: "Ayurvedic", icon: "ayurvedic" },
];

export const mockMedicineCatalog: MedicineListing[] = [
  {
    id: "med-paracetamol-650",
    name: "Paracetamol 650mg",
    packInfo: "Strip of 15 Tablets",
    mrp: 15.6,
    stock: 120,
    categoryId: "pain-relief",
    defaultBatch: "PCM2411",
    defaultExpiry: "09/26",
  },
  {
    id: "med-telma-40",
    name: "Telma 40mg",
    packInfo: "Strip of 10 Tablets",
    mrp: 92.5,
    stock: 85,
    categoryId: "cardiac",
    defaultBatch: "TLM2405",
    defaultExpiry: "05/26",
  },
  {
    id: "med-pan-40",
    name: "Pan 40",
    packInfo: "Strip of 10 Tablets",
    mrp: 20.8,
    stock: 110,
    categoryId: "antibiotics",
    defaultBatch: "PAN2406",
    defaultExpiry: "06/26",
  },
  {
    id: "med-augmentin-625",
    name: "Augmentin 625",
    packInfo: "Strip of 10 Tablets",
    mrp: 156.4,
    stock: 45,
    categoryId: "antibiotics",
    defaultBatch: "AUG2503",
    defaultExpiry: "03/27",
  },
  {
    id: "med-cetirizine-10",
    name: "Cetirizine 10mg",
    packInfo: "Strip of 10 Tablets",
    mrp: 18.3,
    stock: 95,
    categoryId: "pain-relief",
    defaultBatch: "CTZ2409",
    defaultExpiry: "09/27",
  },
  {
    id: "med-azithromycin-500",
    name: "Azithromycin 500mg",
    packInfo: "Strip of 3 Tablets",
    mrp: 74.2,
    stock: 60,
    categoryId: "antibiotics",
    defaultBatch: "AZM2408",
    defaultExpiry: "08/27",
  },
  {
    id: "med-glycomet-gp1",
    name: "Glycomet GP 1",
    packInfo: "Strip of 15 Tablets",
    mrp: 52.1,
    stock: 70,
    categoryId: "diabetes",
    defaultBatch: "GLY2410",
    defaultExpiry: "10/26",
  },
  {
    id: "med-ors",
    name: "ORS",
    packInfo: "Pack of 21.8gm",
    mrp: 20.0,
    stock: 150,
    categoryId: "vitamins",
    defaultBatch: "ORS2412",
    defaultExpiry: "12/27",
  },
  {
    id: "med-dolo-650",
    name: "Dolo 650mg",
    packInfo: "Strip of 15 Tablets",
    mrp: 18.5,
    stock: 90,
    categoryId: "pain-relief",
    defaultBatch: "DOL2411",
    defaultExpiry: "11/26",
  },
];

// "Frequently Sold" is the same catalog for this mock — a real API
// would return a separate ranked endpoint (`GET /api/medicines/frequent`).
export const mockFrequentlySold = mockMedicineCatalog;

export const mockCustomers: CustomerOption[] = [
  { id: "walk-in", label: "Walk-in Customer" },
  { id: "cust-101", label: "Rahul Sharma — 98xxxxxx21" },
  { id: "cust-102", label: "Priya Nair — 90xxxxxx48" },
];

export const mockBillingSessionMeta: BillingSessionMeta = {
  counterLabel: "Counter 01",
  billNo: "POS-2026-08-10-0015",
  isOnline: true,
  lastSyncLabel: "10:46 AM",
  gstPct: 12,
};

// Seed lines so the screen matches the reference screenshot on first load.
export const mockInitialBillLines = [
  {
    lineId: "line-1",
    medicineId: "med-telma-40",
    name: "Telma 40mg",
    packInfo: "Strip of 10 Tablets",
    batch: "TLM2405",
    expiry: "05/26",
    qty: 1,
    mrp: 95.0,
    discountPct: 5,
  },
  {
    lineId: "line-2",
    medicineId: "med-pan-40",
    name: "Pan 40",
    packInfo: "Strip of 10 Tablets",
    batch: "PAN2406",
    expiry: "06/26",
    qty: 1,
    mrp: 21.5,
    discountPct: 0,
  },
  {
    lineId: "line-3",
    medicineId: "med-augmentin-625",
    name: "Augmentin 625",
    packInfo: "Strip of 10 Tablets",
    batch: "AUG2503",
    expiry: "03/27",
    qty: 1,
    mrp: 160.0,
    discountPct: 5,
  },
];
