import { useState } from "react";
import { Calendar, Download, Search } from "lucide-react";
import { useGstData } from "@/hooks/useGstData";
import { GstKpiRow } from "@/components/gst/GstKpiRow";
import { GstBreakdownGrid } from "@/components/gst/GstBreakdownGrid";
import { Tabs } from "@/components/ui/Tabs";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { GstReturnsTable } from "@/components/gst/GstReturnsTable";
import { Pagination } from "@/components/ui/Pagination";
import { Button } from "@/components/ui/Button";
import { mockGstReturnTypeOptions, mockGstTypeOptions } from "@/data/mockGstData";
import { GstTab } from "@/types/gst";

const TABS: { id: GstTab; label: string }[] = [
  { id: "summary", label: "GST Summary" },
  { id: "returns", label: "Returns" },
  { id: "invoices", label: "Tax Invoices" },
  { id: "hsn-summary", label: "HSN Summary" },
];

/** Helper to format dates to "D MMM YYYY" format (e.g., "10 Aug 2026") */
function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Helper to convert Date to HTML date input format "YYYY-MM-DD" */
function toInputDateFormat(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function GstTax() {
  const gst = useGstData();

  // Dynamic Date Setup: Default range is the last 10 days up to today
  const [startDate, setStartDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() - 10);
    return toInputDateFormat(d);
  });
  const [endDate, setEndDate] = useState<string>(() => {
    return toInputDateFormat(new Date());
  });

  const [isEditingDates, setIsEditingDates] = useState(false);

  // Formatted date string display (e.g., "10 Aug 2026 – 20 Aug 2026")
  const formattedDisplay = `${formatDate(new Date(startDate))} – ${formatDate(new Date(endDate))}`;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">GST & Tax</h1>
          <p className="text-body text-text-secondary">Track GST summary, tax liability and file returns.</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Dynamic & Editable Date Selector */}
          {isEditingDates ? (
            <div className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1 text-caption font-medium text-text-primary">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded border border-border bg-transparent px-1 py-0.5 text-caption text-text-primary focus:outline-none"
              />
              <span>–</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded border border-border bg-transparent px-1 py-0.5 text-caption text-text-primary focus:outline-none"
              />
              <button
                onClick={() => setIsEditingDates(false)}
                className="ml-1 text-xs font-semibold text-primary hover:underline"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingDates(true)}
              className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary hover:bg-surface-hover"
              title="Click to edit date range"
            >
              <Calendar size={15} />
              {formattedDisplay}
            </button>
          )}

          <Button variant="primary">
            <Download size={15} />
            Download Summary (CSV)
          </Button>
        </div>
      </div>

      <GstKpiRow kpis={gst.kpis} comparisonLabel="25 Jul – 31 Jul" />

      <div className="mt-6 rounded-lg border border-border bg-surface p-4 shadow-card">
        <Tabs tabs={TABS} activeTab={gst.activeTab} onSelect={gst.setActiveTab} />

        <div className="my-4">
          <GstBreakdownGrid stats={gst.breakdown} />
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input
              value={gst.filters.search}
              onChange={(e) => gst.updateFilters({ search: e.target.value })}
              type="text"
              placeholder="Search by date..."
              className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
            />
          </div>
          <FilterSelect
            label="Return Type"
            value={gst.filters.returnType}
            options={mockGstReturnTypeOptions}
            onChange={(v) => gst.updateFilters({ returnType: v })}
          />
          <FilterSelect
            label="GST Type"
            value={gst.filters.gstType}
            options={mockGstTypeOptions}
            onChange={(v) => gst.updateFilters({ gstType: v })}
          />
          <FilterSelect
            label="Status"
            value={gst.filters.status}
            options={["All", "Due Soon", "Filed", "Overdue"]}
            onChange={(v) => gst.updateFilters({ status: v })}
          />
          <Button variant="secondary" className="ml-auto">
            <Download size={15} />
            Export CSV
          </Button>
        </div>

        <div className="overflow-x-auto">
          <GstReturnsTable items={gst.items} />
        </div>

        <Pagination
          page={gst.page}
          totalPages={gst.totalPages}
          onPageChange={gst.setPage}
          totalCount={gst.totalFilteredCount}
          pageSize={gst.pageSize}
        />
      </div>

      <div className="mt-6 rounded-lg border border-border bg-primary-soft p-4">
        <p className="text-body font-medium text-text-primary">About GST</p>
        <p className="mt-1 text-caption text-text-secondary">
          Ensure invoices are correctly generated with valid GSTIN and HSN codes to maintain accurate tax
          records.{" "}
          <a href="https://www.gst.gov.in" target="_blank" rel="noreferrer" className="font-medium text-primary hover:underline">
            Learn More
          </a>
        </p>
      </div>
    </div>
  );
}