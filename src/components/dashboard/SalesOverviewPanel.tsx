import { useState } from "react";
import { SalesPoint } from "@/types/dashboard";
import { SalesTrendChart } from "@/components/ui/SalesTrendChart";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

interface SalesOverviewPanelProps {
  data: SalesPoint[];
  isLoading?: boolean;
}

const PERIODS = ["This Week", "This Month", "Last 30 Days"] as const;

export function SalesOverviewPanel({ data, isLoading }: SalesOverviewPanelProps) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("This Week");

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-section-title text-text-primary">Sales Overview</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as (typeof PERIODS)[number])}
          className="rounded-sm border border-border bg-surface px-2.5 py-1.5 text-caption text-text-primary"
        >
          {PERIODS.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <LoadingSkeleton className="h-[220px] w-full" />
      ) : (
        <SalesTrendChart data={data} />
      )}
    </div>
  );
}
