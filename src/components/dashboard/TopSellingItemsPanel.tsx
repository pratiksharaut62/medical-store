import { TopSellingItem } from "@/types/dashboard";
import { Section } from "@/components/layout/Section";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface TopSellingItemsPanelProps {
  items: TopSellingItem[];
  isLoading?: boolean;
}

/** Section 8.3: top 5 only — this is a highlight, not a report. */
export function TopSellingItemsPanel({ items, isLoading }: TopSellingItemsPanelProps) {
  return (
    <Section title="Top Selling Items (Today)" action={{ label: "View All", href: "/reports/top-items" }}>
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <LoadingSkeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      ) : (
        <ol className="space-y-3">
          {items.map((item) => (
            <li key={item.rank} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[11px] font-semibold text-primary">
                {item.rank}
              </span>
              <span className="flex-1 truncate text-body text-text-primary">{item.name}</span>
              <span className="text-body font-semibold tabular text-text-primary">{item.amount}</span>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
