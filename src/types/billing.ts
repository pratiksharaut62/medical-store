// Domain types for Billing (POS). Keep aligned with the API contract
// once a backend exists — see hooks/useBillingSession.ts for the one
// seam that will change (medicine lookup + bill submission).

export interface Category {
  id: string;
  label: string;
  icon: CategoryIconKey;
}

export type CategoryIconKey =
  | "all"
  | "painRelief"
  | "antibiotics"
  | "vitamins"
  | "diabetes"
  | "cardiac"
  | "ayurvedic";

/** A sellable medicine/batch as returned by search or the frequently-sold list. */
export interface MedicineListing {
  id: string;
  name: string;
  packInfo: string; // "Strip of 10 Tablets"
  mrp: number;
  stock: number;
  categoryId: string;
  defaultBatch: string;
  defaultExpiry: string; // "05/26"
}

export type PaymentMethod = "cash" | "upi" | "card" | "credit";

/** A line in the current bill — distinct from MedicineListing because
 * qty/discount/batch are mutable per-line, and multiple lines could
 * (in principle) reference the same medicine on different batches. */
export interface BillLineItem {
  lineId: string;
  medicineId: string;
  name: string;
  packInfo: string;
  batch: string;
  expiry: string;
  qty: number;
  mrp: number;
  discountPct: number;
}

export interface CustomerOption {
  id: string;
  label: string;
}

export interface BillingSessionMeta {
  counterLabel: string;
  billNo: string;
  isOnline: boolean;
  lastSyncLabel: string;
  gstPct: number;
}
