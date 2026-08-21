import { FileOutput, Percent, FileInput, IndianRupee } from "lucide-react";
import { GstKpis } from "@/types/gst";
import { MetricCard } from "@/components/ui/MetricCard";
import { TrendIndicator } from "@/components/ui/TrendIndicator";
import { formatCurrency } from "@/lib/format";

interface GstKpiRowProps {
  kpis: GstKpis;
  comparisonLabel: string;
}

export function GstKpiRow({ kpis, comparisonLabel }: GstKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Total Sales (Taxable)"
        value={formatCurrency(kpis.totalSalesTaxable)}
        icon={<FileOutput size={19} />}
        tint="success"
        supporting={<TrendIndicator direction="up" text={`${kpis.totalSalesTrendPct}% vs ${comparisonLabel}`} />}
      />
      <MetricCard
        label="Total GST Collected"
        value={formatCurrency(kpis.totalGstCollected)}
        icon={<Percent size={19} />}
        tint="accent"
        supporting={<TrendIndicator direction="up" text={`${kpis.gstCollectedTrendPct}% vs ${comparisonLabel}`} />}
      />
      <MetricCard
        label="Total GST Paid"
        value={formatCurrency(kpis.totalGstPaid)}
        icon={<FileInput size={19} />}
        tint="warning"
        supporting={<TrendIndicator direction="up" text={`${kpis.gstPaidTrendPct}% vs ${comparisonLabel}`} />}
      />
      <MetricCard
        label="Net GST Payable"
        value={formatCurrency(kpis.netGstPayable)}
        icon={<IndianRupee size={19} />}
        tint="primary"
        supporting={<TrendIndicator direction="up" text={`${kpis.netGstPayableTrendPct}% vs ${comparisonLabel}`} />}
      />
    </div>
  );
}
