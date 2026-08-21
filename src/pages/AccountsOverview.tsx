import { SlidersHorizontal, FileText, ArrowRight } from "lucide-react";
import { useAccountsData } from "@/hooks/useAccountsData";
import { AccountsKpiRow } from "@/components/accounts/AccountsKpiRow";
import { RecentTransactionsTable } from "@/components/accounts/RecentTransactionsTable";
import { AccountsQuickActionsRow } from "@/components/accounts/AccountsQuickActionsRow";
import { Button } from "@/components/ui/Button";

export default function AccountsOverview() {
  const acc = useAccountsData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-page-title text-text-primary">Accounts Overview</h1>
        <p className="text-body text-text-secondary">Track your cash, banks and transactions.</p>
      </div>

      <AccountsKpiRow kpis={acc.kpis} comparisonLabel="25 Jul – 31 Jul" />

      <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-section-title text-text-primary">Recent Transactions</h2>
          <div className="flex gap-2">
            <Button variant="secondary">
              <SlidersHorizontal size={15} />
              Filters
            </Button>
            <Button variant="secondary">
              <FileText size={15} />
              View All Transactions
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <RecentTransactionsTable transactions={acc.recentTransactions} />
        </div>

        <div className="mt-4 flex justify-center">
          <a href="/accounts/ledger" className="flex items-center gap-1.5 text-body font-medium text-success hover:underline">
            View All Transactions
            <ArrowRight size={15} />
          </a>
        </div>
      </div>

      <AccountsQuickActionsRow actions={acc.quickActions} />
    </div>
  );
}
