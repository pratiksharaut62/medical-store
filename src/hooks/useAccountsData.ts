import { mockAccountsKpis, mockRecentTransactions, mockAccountsQuickActions } from "@/data/mockAccountsData";

/**
 * Simple read-model for now (Overview only needs KPIs + a recent
 * transaction list). Swap the fixture imports for `GET
 * /api/accounts/overview` and `GET /api/accounts/transactions?limit=5`
 * — nothing in components/accounts/ needs to change.
 */
export function useAccountsData() {
  return {
    kpis: mockAccountsKpis,
    recentTransactions: mockRecentTransactions,
    quickActions: mockAccountsQuickActions,
  };
}
