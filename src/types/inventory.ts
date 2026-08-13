// Domain types for the Inventory module.

export type InventoryStatus = "in-stock" | "low-stock" | "expired" | "near-expiry";

export interface InventoryItem {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  pack: string;
  stockQty: number;
  stockUnit: string; // "Strips", "Packs"
  mrp: number;
  status: InventoryStatus;
}

export type InventoryTab = "all" | "low-stock" | "near-expiry" | "expired";

export interface InventoryFiltersState {
  search: string;
  category: string; // "all" | category name
  supplier: string; // "all" | supplier name
  status: string; // "all" | "Active" | "Inactive"
}

export interface CategoryValueSlice {
  label: string;
  amount: string; // "₹5.62L"
  value: number; // for donut sizing
  color: string;
}

export interface InventoryQuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: "adjustment" | "transfer" | "expiryReport" | "reorderReport";
  href: string;
}

export interface StockAgeingBucket {
  label: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface InventoryKpis {
  totalItems: number;
  totalStockValue: string;
  lowStockCount: number;
  nearExpiryCount: number;
  nearExpiryValue: string;
  expiredCount: number;
  expiredValue: string;
}
