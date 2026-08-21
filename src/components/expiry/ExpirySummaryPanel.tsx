import { Info } from "lucide-react";
import { ExpirySummarySlice } from "@/types/expiry";
import { DonutChart } from "@/components/ui/DonutChart";
import { Section } from "@/components/layout/Section";

interface ExpirySummaryPanelProps {
  slices: ExpirySummarySlice[];
  totalValue: string;
}

export function ExpirySummaryPanel({ slices, totalValue }: ExpirySummaryPanelProps) {
  return (
    <Section title="Expiry Summary (Value)" action={{ label: "View Report", href: "/reports/expiry" }}>
      <div className="flex items-center gap-4">
        <DonutChart slices={slices} centerValue={totalValue} centerLabel="Total Value" />
        <ul className="flex-1 space-y-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="truncate text-caption text-text-secondary">{slice.label}</span>
              </span>
              <span className="text-caption font-semibold tabular text-text-primary">
                {slice.amount} <span className="text-text-disabled">({slice.percentage}%)</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-md bg-primary-soft px-3 py-2.5">
        <Info size={16} className="mt-0.5 shrink-0 text-primary" />
        <p className="text-caption text-text-primary">Take action on near expiry stock to prevent loss.</p>
      </div>
    </Section>
  );
}
