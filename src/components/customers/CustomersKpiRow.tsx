import { Users, Crown, IndianRupee, Gift } from "lucide-react";
import { CustomersKpis } from "@/types/customers";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendIndicator } from "@/components/ui/TrendIndicator";
import { formatCurrency } from "@/lib/format";

interface CustomersKpiRowProps {
  kpis: CustomersKpis;
}

export function CustomersKpiRow({ kpis }: CustomersKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Customers"
        value={kpis.totalCustomers.toLocaleString("en-IN")}
        icon={<Users size={19} />}
        tint="primary"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalCustomersTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Loyal Customers"
        value={kpis.loyalCustomers.toLocaleString("en-IN")}
        icon={<Crown size={19} />}
        tint="accent"
        supporting={<TrendIndicator direction="up" text={`${kpis.loyalCustomersTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Total Sales (This Month)"
        value={formatCurrency(kpis.totalSalesThisMonth)}
        icon={<IndianRupee size={19} />}
        tint="warning"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalSalesTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
      <MetricCard
        label="Points Redeemed"
        value={kpis.pointsRedeemed.toLocaleString("en-IN")}
        icon={<Gift size={19} />}
        tint="success"
        supporting={<TrendIndicator direction="up" text={`${kpis.pointsRedeemedTrendPct}% vs 25 Jul – 31 Jul`} />}
      />
    </div>
  );
}
