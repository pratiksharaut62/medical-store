"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { useDashboardData } from "@/hooks/useDashboardData";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { SalesOverviewPanel } from "@/components/dashboard/SalesOverviewPanel";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { InventoryHealthPanel } from "@/components/dashboard/InventoryHealthPanel";
import { TopSellingItemsPanel } from "@/components/dashboard/TopSellingItemsPanel";
import { OutstandingSummaryPanel } from "@/components/dashboard/OutstandingSummaryPanel";
import { QuickActionsRow } from "@/components/dashboard/QuickActionsRow";
import { SystemStatusRow } from "@/components/dashboard/SystemStatusRow";

/**
 * Formats date as "12 Aug 2026"
 */
function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Owner Dashboard — information budget, enforced by
 * construction rather than convention:
 *   Row 1: 5 KPI cards        (KpiRow — hard-capped at 5 in its own type)
 *   Row 2: 1 chart + 1 alerts panel
 *   Row 3: 3 secondary business widgets
 *   Row 4: 1 quick-action row + 1 system-status row
 * Do not add a Row 5. A new metric replaces an existing card/widget.
 */
export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Set initial formatted date on mount
    setCurrentDate(getFormattedDate());

    // Check every minute to automatically switch days at midnight
    const interval = setInterval(() => {
      const freshDate = getFormattedDate();
      setCurrentDate((prev) => (prev !== freshDate ? freshDate : prev));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // Passes the formatted dynamic date to the data hook
  const { data, isLoading } = useDashboardData(currentDate);

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6">
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">
            Good Morning, {data?.ownerName ?? "…"}! 👋
          </h1>
          <p className="text-body text-text-secondary">
            Here&apos;s what&apos;s happening with your store today.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary">
          <Calendar size={15} />
          {currentDate || "Loading..."}
        </button>
      </div>

      <div className="space-y-6">
        {/* Row 1 */}
        <KpiRow kpis={data?.kpis ?? PLACEHOLDER_KPIS} isLoading={isLoading} />

        {/* Row 2 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_420px]">
          <SalesOverviewPanel data={data?.salesTrend ?? []} isLoading={isLoading} />
          <AlertsPanel alerts={data?.alerts ?? []} isLoading={isLoading} />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {data && <InventoryHealthPanel data={data.inventoryHealth} isLoading={isLoading} />}
          {data && <TopSellingItemsPanel items={data.topSellingItems} isLoading={isLoading} />}
          {data && <OutstandingSummaryPanel data={data.outstandingSummary} isLoading={isLoading} />}
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {data && <QuickActionsRow actions={data.quickActions} />}
          {data && <SystemStatusRow status={data.systemStatus} />}
        </div>
      </div>
    </div>
  );
}

// Keeps KpiRow's skeleton grid shape stable before the first fetch resolves.
const PLACEHOLDER_KPIS = Array.from({ length: 5 }).map((_, i) => ({
  id: `placeholder-${i}`,
  label: "",
  value: "",
  icon: "sales" as const,
  iconTint: "primary" as const,
}));