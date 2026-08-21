import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { useExpiryData } from "@/hooks/useExpiryData";
import { ExpiryKpiRow } from "@/components/expiry/ExpiryKpiRow";
import { Tabs } from "@/components/ui/Tabs";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { ExpiryTable } from "@/components/expiry/ExpiryTable";
import { Pagination } from "@/components/ui/Pagination";
import { ExpirySummaryPanel } from "@/components/expiry/ExpirySummaryPanel";
import { ExpiryQuickActionsPanel } from "@/components/expiry/ExpiryQuickActionsPanel";
import { mockExpiryCategoryOptions, mockExpirySupplierOptions } from "@/data/mockExpiryData";
import { ExpiryTab } from "@/types/expiry";

const TABS: { id: ExpiryTab; label: string }[] = [
  { id: "near-expiry", label: "Near Expiry" },
  { id: "expired", label: "Expired" },
  { id: "returns", label: "Returns" },
  { id: "supplier-claims", label: "Supplier Claims" },
  { id: "return-history", label: "Return History" },
];

/** Format a Date object into "Today, D MMM YYYY" or "D MMM YYYY" */
function formatDisplayDate(date: Date): string {
  const formatted = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isToday = new Date().toDateString() === date.toDateString();
  return isToday ? `Today, ${formatted}` : formatted;
}

/** Convert a Date object to HTML date input string "YYYY-MM-DD" */
function toInputDateFormat(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function ExpiryReturns() {
  const exp = useExpiryData();

  // Dynamic state initialized to current system date
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toInputDateFormat(new Date())
  );
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const currentDateObj = new Date(selectedDate);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Expiry & Returns</h1>
          <p className="text-body text-text-secondary">Monitor expiry, manage returns and minimise loss.</p>
        </div>

        {/* Dynamic & Editable Date Selector */}
        {isEditingDate ? (
          <div className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 text-caption font-medium text-text-primary">
            <Calendar size={15} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded border border-border bg-transparent px-1 py-0.5 text-caption text-text-primary focus:outline-none"
            />
            <button
              onClick={() => setIsEditingDate(false)}
              className="ml-1 text-xs font-semibold text-primary hover:underline"
            >
              Done
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingDate(true)}
            className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary hover:bg-surface-hover"
            title="Click to edit date"
          >
            <Calendar size={15} />
            {formatDisplayDate(currentDateObj)}
          </button>
        )}
      </div>

      <ExpiryKpiRow kpis={exp.kpis} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <Tabs tabs={TABS} activeTab={exp.activeTab} onSelect={exp.selectTab} />

          <div className="my-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                value={exp.filters.search}
                onChange={(e) => exp.updateFilters({ search: e.target.value })}
                type="text"
                placeholder="Search medicine, batch or supplier..."
                className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
              />
            </div>
            <FilterSelect
              label="Expiry Within"
              value={exp.filters.expiryWithin}
              options={["30 Days", "60 Days", "90 Days", "All"]}
              onChange={(v) => exp.updateFilters({ expiryWithin: v })}
            />
            <FilterSelect
              label="Category"
              value={exp.filters.category}
              options={mockExpiryCategoryOptions}
              onChange={(v) => exp.updateFilters({ category: v })}
            />
            <FilterSelect
              label="Supplier"
              value={exp.filters.supplier}
              options={mockExpirySupplierOptions}
              onChange={(v) => exp.updateFilters({ supplier: v })}
            />
          </div>

          <div className="overflow-x-auto">
            <ExpiryTable items={exp.items} />
          </div>

          <Pagination
            page={exp.page}
            totalPages={exp.totalPages}
            onPageChange={exp.setPage}
            totalCount={exp.totalFilteredCount}
            pageSize={exp.pageSize}
          />
        </div>

        <div className="space-y-6">
          <ExpirySummaryPanel slices={exp.summary} totalValue={exp.kpis.nearExpiryValue} />
          <ExpiryQuickActionsPanel actions={exp.quickActions} />
        </div>
      </div>
    </div>
  );
}