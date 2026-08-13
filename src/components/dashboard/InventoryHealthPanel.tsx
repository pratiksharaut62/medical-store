import { InventoryHealth } from "@/types/dashboard";
import { DonutChart } from "@/components/ui/DonutChart";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface InventoryHealthPanelProps {
  data: InventoryHealth;
  isLoading?: boolean;
}

export function InventoryHealthPanel({ data, isLoading }: InventoryHealthPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-4 text-section-title text-text-primary">Inventory Health</h2>

      {isLoading ? (
        <LoadingSkeleton className="mx-auto h-36 w-36 rounded-full" />
      ) : (
        <div className="flex items-center gap-4">
          <DonutChart
            slices={data.slices}
            centerValue={data.totalStockValue}
            centerLabel="Total Stock Value"
          />
          <ul className="flex-1 space-y-2">
            {data.slices.map((slice) => (
              <li key={slice.label} className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span className="truncate text-caption text-text-secondary">{slice.label}</span>
                </span>
                <span className="text-caption font-semibold tabular text-text-primary">
                  {slice.value}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a
        href="/inventory"
        className="mt-4 inline-block text-caption font-medium text-primary hover:underline"
      >
        View Inventory
      </a>
    </div>
  );
}
