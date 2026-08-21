import { GstBreakdownStat } from "@/types/gst";
import { formatCurrency } from "@/lib/format";

interface GstBreakdownGridProps {
  stats: GstBreakdownStat[];
}

/** Section 2.1 minimal-not-empty: raw tax breakdown, laid out as scannable stat tiles rather than a table. */
export function GstBreakdownGrid({ stats }: GstBreakdownGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 border-b border-border pb-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="text-caption text-text-secondary">{stat.label}</p>
          <p className="mt-1 tabular text-body font-semibold text-text-primary">
            {formatCurrency(stat.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
