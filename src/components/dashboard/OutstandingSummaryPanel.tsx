import { OutstandingSummary } from "@/types/dashboard";
import { DonutChart } from "@/components/ui/DonutChart";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface OutstandingSummaryPanelProps {
  data: OutstandingSummary;
  isLoading?: boolean;
}

export function OutstandingSummaryPanel({ data, isLoading }: OutstandingSummaryPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-4 text-section-title text-text-primary">Outstanding Summary</h2>

      {isLoading ? (
        <LoadingSkeleton className="mx-auto h-36 w-36 rounded-full" />
      ) : (
        <div className="flex items-center gap-4">
          <DonutChart
            slices={data.buckets.map((b) => ({
              label: b.label,
              value: parseAmount(b.amount),
              color: b.color,
            }))}
            centerValue={data.totalOutstanding}
            centerLabel="Total Outstanding"
          />
          <ul className="flex-1 space-y-2">
            {data.buckets.map((bucket) => (
              <li key={bucket.label} className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: bucket.color }}
                  />
                  <span className="truncate text-caption text-text-secondary">{bucket.label}</span>
                </span>
                <span className="text-caption font-semibold tabular text-text-primary">
                  {bucket.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href="/accounts/ledger"
        className="mt-4 inline-block text-caption font-medium text-primary hover:underline"
      >
        View Ledger
      </a>
    </div>
  );
}

// Donut slice sizing only — display strings stay untouched (Section 37).
function parseAmount(display: string): number {
  return Number(display.replace(/[₹,]/g, "")) || 0;
}
