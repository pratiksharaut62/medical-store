import { ShieldCheck, CalendarCheck, Clock, FileCheck2, TrendingUp } from "lucide-react";
import { ComplianceKpis } from "@/types/compliance";
import { MetricCard } from "@/components/ui/MetricCard";

interface ComplianceKpiRowProps {
  kpis: ComplianceKpis;
}

function scoreLabel(pct: number): string {
  if (pct >= 90) return "Excellent";
  if (pct >= 75) return "Good";
  if (pct >= 50) return "Needs Attention";
  return "At Risk";
}

export function ComplianceKpiRow({ kpis }: ComplianceKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        label="Total Compliances"
        value={String(kpis.totalCompliances)}
        icon={<ShieldCheck size={19} />}
        tint="primary"
        supporting={<span className="text-caption text-text-secondary">All registered</span>}
      />
      <MetricCard
        label="Upcoming (Next 30 Days)"
        value={String(kpis.upcomingCount)}
        icon={<CalendarCheck size={19} />}
        tint="success"
        supporting={<span className="text-caption text-warning">Require attention</span>}
      />
      <MetricCard
        label="Overdue"
        value={String(kpis.overdueCount)}
        icon={<Clock size={19} />}
        tint="warning"
        supporting={<span className="text-caption text-danger">Action required</span>}
      />
      <MetricCard
        label="Completed This Year"
        value={String(kpis.completedThisYear)}
        icon={<FileCheck2 size={19} />}
        tint="accent"
        supporting={<span className="text-caption text-text-secondary">Till date</span>}
      />
      <MetricCard
        label="Compliance Score"
        value={`${kpis.complianceScorePct}%`}
        icon={<TrendingUp size={19} />}
        tint="success"
        supporting={<span className="text-caption text-success">{scoreLabel(kpis.complianceScorePct)}</span>}
      />
    </div>
  );
}
