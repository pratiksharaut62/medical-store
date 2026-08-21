export type GstTab = "summary" | "returns" | "invoices" | "hsn-summary";

export type GstReturnStatus = "due-soon" | "filed" | "overdue";

export interface GstReturnRow {
  id: string;
  returnPeriod: string; // "Jul 2026"
  returnType: string; // "GSTR-1" | "GSTR-3B"
  dueDate: string;
  gstCollected: number;
  gstPaid: number;
  netPayable: number;
  status: GstReturnStatus;
  statusLabel: string; // "Due in 1 day" | "Filed"
  filedOn: string | null;
}

export interface GstKpis {
  totalSalesTaxable: number;
  totalSalesTrendPct: number;
  totalGstCollected: number;
  gstCollectedTrendPct: number;
  totalGstPaid: number;
  gstPaidTrendPct: number;
  netGstPayable: number;
  netGstPayableTrendPct: number;
}

export interface GstBreakdownStat {
  label: string;
  amount: number;
}

export interface GstFiltersState {
  search: string;
  returnType: string;
  gstType: string;
  status: string;
}
