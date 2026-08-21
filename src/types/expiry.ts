export type ExpiryTab = "near-expiry" | "expired" | "returns" | "supplier-claims" | "return-history";

export type DaysLeftSeverity = "danger" | "warning" | "success";

export interface ExpiryBatchItem {
  id: string;
  medicine: string;
  manufacturer: string;
  batchNo: string;
  expiryDate: string; // "15 Sep 2026"
  stockQty: number;
  stockUnit: string;
  valueMrp: number;
  daysLeft: number;
}

export interface ExpirySummarySlice {
  label: string;
  amount: string;
  percentage: number;
  value: number;
  color: string;
}

export interface ExpiryQuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: "report" | "batchWise" | "returnToSupplier" | "discountedSale";
  href: string;
}

export interface ExpiryKpis {
  nearExpiryCount: number;
  nearExpiryValue: string;
  expiredCount: number;
  expiredValue: string;
  returnsPendingCount: number;
  returnsPendingValue: string;
  supplierCreditsCount: number;
  supplierCreditsValue: string;
}

export interface ExpiryFiltersState {
  search: string;
  expiryWithin: string; // "30 Days" | "60 Days" | "90 Days" | "All"
  category: string;
  supplier: string;
}
