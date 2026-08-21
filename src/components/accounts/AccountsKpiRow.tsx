import { Wallet, Landmark, Users, FileWarning } from "lucide-react";
import { AccountsKpis } from "@/types/accounts";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendIndicator } from "@/components/ui/TrendIndicator";
import { formatCurrency } from "@/lib/format";

interface AccountsKpiRowProps {
  kpis: AccountsKpis;
  comparisonLabel: string;
}

export function AccountsKpiRow({ kpis, comparisonLabel }: AccountsKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Cash in Hand"
        value={formatCurrency(kpis.cashInHand)}
        icon={<Wallet size={19} />}
        tint="success"
        supporting={<TrendIndicator direction="up" text={`${kpis.cashInHandTrendPct}% vs ${comparisonLabel}`} />}
      />
      <MetricCard
        label="Bank Balance"
        value={formatCurrency(kpis.bankBalance)}
        icon={<Landmark size={19} />}
        tint="primary"
        supporting={<TrendIndicator direction="up" text={`${kpis.bankBalanceTrendPct}% vs ${comparisonLabel}`} />}
      />
      <MetricCard
        label="Total Receivables"
        value={formatCurrency(kpis.totalReceivables)}
        icon={<Users size={19} />}
        tint="accent"
        supporting={
          <TrendIndicator
            direction={kpis.totalReceivablesTrendPct < 0 ? "down" : "up"}
            text={`${Math.abs(kpis.totalReceivablesTrendPct)}% vs ${comparisonLabel}`}
          />
        }
      />
      <MetricCard
        label="Total Payables"
        value={formatCurrency(kpis.totalPayables)}
        icon={<FileWarning size={19} />}
        tint="warning"
        supporting={
          <TrendIndicator
            direction={kpis.totalPayablesTrendPct < 0 ? "down" : "up"}
            text={`${Math.abs(kpis.totalPayablesTrendPct)}% vs ${comparisonLabel}`}
          />
        }
      />
    </div>
  );
}
