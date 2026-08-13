import { TrendingUp, PieChart, Receipt, UserPlus, IndianRupee } from "lucide-react";
import { KpiMetric } from "@/types/dashboard";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendIndicator } from "@/components/ui/TrendIndicator";

interface KpiRowProps {
  kpis: KpiMetric[];
  isLoading?: boolean;
}

const ICONS: Record<KpiMetric["icon"], JSX.Element> = {
  sales: <TrendingUp size={19} />,
  margin: <PieChart size={19} />,
  bills: <Receipt size={19} />,
  customers: <UserPlus size={19} />,
  outstanding: <IndianRupee size={19} />,
};

/**
 * Section 8.1 rule: five KPI cards, no more. Resist the urge to add a
 * sixth — a new metric here must replace one of these, not join them.
 */
export function KpiRow({ kpis, isLoading }: KpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <MetricCard
          key={kpi.id}
          label={kpi.label}
          value={kpi.value}
          icon={ICONS[kpi.icon]}
          tint={kpi.iconTint}
          isLoading={isLoading}
          supporting={
            kpi.supportingText ? (
              <TrendIndicator direction={kpi.trend} text={kpi.supportingText} />
            ) : undefined
          }
        />
      ))}
    </div>
  );
}
