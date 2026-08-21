export type CustomerTab = "all" | "loyal" | "inactive";
export type LoyaltyTier = "Bronze" | "Silver" | "Gold" | "Platinum";
export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  code: string; // "CUST-1001"
  phone: string;
  email: string;
  group: string; // "Regular" | "Wholesale"
  loyaltyTier: LoyaltyTier;
  totalPurchases: number;
  points: number;
  lastPurchase: string;
  status: CustomerStatus;
  address: string;
  totalOrders: number;
  averageOrderValue: number;
  availablePoints: number;
  pointsEarnedThisMonth: number;
  pointsToNextTier: number;
  nextTier: LoyaltyTier | null;
}

export interface CustomersKpis {
  totalCustomers: number;
  totalCustomersTrendPct: number;
  loyalCustomers: number;
  loyalCustomersTrendPct: number;
  totalSalesThisMonth: number;
  totalSalesTrendPct: number;
  pointsRedeemed: number;
  pointsRedeemedTrendPct: number;
}

export interface CustomersFiltersState {
  search: string;
  group: string;
  loyaltyTier: string;
  status: string;
}
