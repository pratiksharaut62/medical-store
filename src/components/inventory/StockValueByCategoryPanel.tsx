import { CategoryValueSlice } from "@/types/inventory";
import { DonutChart } from "@/components/ui/DonutChart";
import { Section } from "@/components/layout/Section";

interface StockValueByCategoryPanelProps {
  slices: CategoryValueSlice[];
  totalLabel: string;
}

export function StockValueByCategoryPanel({ slices, totalLabel }: StockValueByCategoryPanelProps) {
  return (
    <Section title="Stock Value by Category" action={{ label: "View Report", href: "/reports/inventory-value" }}>
      <div className="flex flex-col items-center gap-4">
        <DonutChart slices={slices} centerValue={totalLabel} centerLabel="Total Value" />
        <ul className="w-full space-y-2">
          {slices.map((slice) => (
            <li key={slice.label} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="truncate text-caption text-text-secondary">{slice.label}</span>
              </span>
              <span className="text-caption font-semibold tabular text-text-primary">{slice.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
