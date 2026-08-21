import { ShoppingCart, FileText, IndianRupee, Clock, PackageCheck } from "lucide-react";
import { PurchasesKpis } from "@/types/purchases";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendIndicator } from "@/components/ui/TrendIndicator";
import { formatCurrency } from "@/lib/format";

interface PurchasesKpiRowProps {
  kpis: PurchasesKpis;
}

export function PurchasesKpiRow({ kpis }: PurchasesKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        label="Total Purchases"
        value={formatCurrency(kpis.totalPurchases)}
        icon={<ShoppingCart size={19} />}
        tint="success"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalPurchasesTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Total Bills"
        value={String(kpis.totalBills)}
        icon={<FileText size={19} />}
        tint="accent"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalBillsTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Total Paid"
        value={formatCurrency(kpis.totalPaid)}
        icon={<IndianRupee size={19} />}
        tint="primary"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalPaidTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Total Due"
        value={formatCurrency(kpis.totalDue)}
        icon={<Clock size={19} />}
        tint="warning"
        supporting={
          <TrendIndicator direction="down" text={`${Math.abs(kpis.totalDueTrendPct)}% vs 25 Jul – 31 Jul`} />
        }
      />
      <MetricCard
        label="Items Purchased"
        value={kpis.itemsPurchased.toLocaleString("en-IN")}
        icon={<PackageCheck size={19} />}
        tint="success"
        supporting={<TrendIndicator direction="up" text={`${kpis.itemsPurchasedTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
    </div>
  );
}
