// Domain types for the Owner Dashboard.
// Keep these aligned with the API contract when the backend lands —
// components should never inline shapes that belong here.

export type TrendDirection = "up" | "down" | "flat";

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  supportingText?: string;
  trend?: TrendDirection;
  icon: KpiIconKey;
  iconTint: "primary" | "success" | "accent" | "warning" | "danger";
}

export type KpiIconKey =
  | "sales"
  | "margin"
  | "bills"
  | "customers"
  | "outstanding";

export interface SalesPoint {
  label: string; // e.g. "Mon 4 Aug"
  value: number;
}

export type AlertSeverity = "danger" | "warning" | "info";

export interface DashboardAlert {
  id: string;
  title: string;
  description: string; // "What + Why", e.g. "₹48,620 across 34 batches"
  severity: AlertSeverity;
  count: number;
  countLabel: string; // "Batches", "Items", "Claims", "License"
  href: string; // drill-down route (Rule: dashboard numbers must be clickable)
}

export interface InventoryHealthSlice {
  label: string;
  value: number; // percentage, slices should sum to ~100
  color: string;
}

export interface InventoryHealth {
  totalStockValue: string;
  slices: InventoryHealthSlice[];
}

export interface TopSellingItem {
  rank: number;
  name: string;
  amount: string;
}

export interface OutstandingBucket {
  label: string;
  amount: string;
  color: string;
}

export interface OutstandingSummary {
  totalOutstanding: string;
  buckets: OutstandingBucket[];
}

export type ConnectivityState = "online" | "offline" | "syncing";

export interface SystemStatus {
  connectivity: ConnectivityState;
  lastBackup: string;
  lastSync: string;
  posTerminalsActive: number;
}

export interface QuickActionItem {
  id: string;
  label: string;
  icon: "newBill" | "newPurchase" | "addCustomer" | "stockAdjustment" | "expiryReturn";
  href: string;
}

export interface DashboardData {
  ownerName: string;
  dateLabel: string;
  kpis: KpiMetric[];
  salesTrend: SalesPoint[];
  salesTrendTotal: string;
  alerts: DashboardAlert[];
  inventoryHealth: InventoryHealth;
  topSellingItems: TopSellingItem[];
  outstandingSummary: OutstandingSummary;
  quickActions: QuickActionItem[];
  systemStatus: SystemStatus;
}
