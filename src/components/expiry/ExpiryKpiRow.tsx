import { CalendarClock, XCircle, RotateCcw, BadgeIndianRupee } from "lucide-react";
import { ExpiryKpis } from "@/types/expiry";
import { MetricCard } from "@/components/ui/MetricCard";

interface ExpiryKpiRowProps {
  kpis: ExpiryKpis;
}

export function ExpiryKpiRow({ kpis }: ExpiryKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        label="Near Expiry (≤ 90 Days)"
        value={String(kpis.nearExpiryCount)}
        icon={<CalendarClock size={19} />}
        tint="warning"
        supporting={<span className="text-caption text-warning">Value {kpis.nearExpiryValue}</span>}
      />
      <MetricCard
        label="Expired Stock"
        value={String(kpis.expiredCount)}
        icon={<XCircle size={19} />}
        tint="danger"
        supporting={<span className="text-caption text-danger">Value {kpis.expiredValue}</span>}
      />
      <MetricCard
        label="Returns Pending"
        value={String(kpis.returnsPendingCount)}
        icon={<RotateCcw size={19} />}
        tint="accent"
        supporting={<span className="text-caption text-text-secondary">Value {kpis.returnsPendingValue}</span>}
      />
      <MetricCard
        label="Supplier Credits (Approved)"
        value={String(kpis.supplierCreditsCount)}
        icon={<BadgeIndianRupee size={19} />}
        tint="success"
        supporting={<span className="text-caption text-success">Value {kpis.supplierCreditsValue}</span>}
      />
    </div>
  );
}
