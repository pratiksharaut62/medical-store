import { StockAgeingBucket } from "@/types/inventory";
import { Section } from "@/components/layout/Section";

interface StockAgeingPanelProps {
  buckets: StockAgeingBucket[];
}

export function StockAgeingPanel({ buckets }: StockAgeingPanelProps) {
  return (
    <Section title="Stock Ageing (Value)" action={{ label: "View Report", href: "/reports/stock-ageing" }}>
      <ul className="space-y-3">
        {buckets.map((bucket) => (
          <li key={bucket.label} className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: bucket.color }} />
              <span className="text-caption text-text-secondary">{bucket.label}</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="tabular text-body font-medium text-text-primary">{bucket.amount}</span>
              <span className="w-9 text-right tabular text-caption text-text-secondary">
                {bucket.percentage}%
              </span>
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] text-text-disabled">Values at MRP (Inclusive of Tax)</p>
    </Section>
  );
}
