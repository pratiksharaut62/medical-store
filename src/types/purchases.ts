export type PurchaseTab = "all" | "purchase-orders" | "bills" | "returns";

export type PurchaseStatus = "received" | "pending" | "cancelled";
export type PurchasePaymentStatus = "paid" | "partial" | "unpaid";

export interface PurchaseBill {
  id: string;
  billNo: string;
  supplierName: string;
  supplierLocation: string;
  billDate: string;
  items: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: PurchaseStatus;
  paymentStatus: PurchasePaymentStatus;
}

export interface PurchasesKpis {
  totalPurchases: number;
  totalPurchasesTrendPct: number;
  totalBills: number;
  totalBillsTrendPct: number;
  totalPaid: number;
  totalPaidTrendPct: number;
  totalDue: number;
  totalDueTrendPct: number; // negative = down (good)
  itemsPurchased: number;
  itemsPurchasedTrendPct: number;
}

export interface PurchasesFiltersState {
  search: string;
  supplier: string;
  status: string;
  paymentStatus: string;
}
