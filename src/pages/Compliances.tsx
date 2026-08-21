import { Calendar, Search } from "lucide-react";
import { useComplianceData } from "@/hooks/useComplianceData";
import { ComplianceKpiRow } from "@/components/compliance/ComplianceKpiRow";
import { Tabs } from "@/components/ui/Tabs";
import { FilterSelect } from "@/components/ui/FilterSelect";
import { ComplianceTable } from "@/components/compliance/ComplianceTable";
import { Pagination } from "@/components/ui/Pagination";
import { MiniCalendar } from "@/components/ui/MiniCalendar";
import { Section } from "@/components/layout/Section";
import { ComplianceQuickActionsPanel } from "@/components/compliance/ComplianceQuickActionsPanel";
import { RecentActivitiesPanel } from "@/components/compliance/RecentActivitiesPanel";
import { mockComplianceCategoryOptions, mockComplianceTypeOptions, mockCalendarMarkers } from "@/data/mockComplianceData";
import { ComplianceTab } from "@/types/compliance";

const TABS: { id: ComplianceTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
];

export default function Compliances() {
  const comp = useComplianceData();

  // Instantiate the current date once
  const today = new Date();

  // Format the date dynamically for the button header (e.g., "Today, 19 Aug 2026")
  const formattedTodayDate = `Today, ${today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })}`;

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Compliances</h1>
          <p className="text-body text-text-secondary">Track and manage all statutory compliances and renewals.</p>
        </div>
        <button className="flex items-center gap-2 rounded-sm border border-border bg-surface px-3 py-2 text-caption font-medium text-text-primary">
          <Calendar size={15} />
          {formattedTodayDate}
        </button>
      </div>

      <ComplianceKpiRow kpis={comp.kpis} />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
          <Tabs tabs={TABS} activeTab={comp.activeTab} onSelect={comp.selectTab} />

          <div className="my-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[220px] flex-1">
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                value={comp.filters.search}
                onChange={(e) => comp.updateFilters({ search: e.target.value })}
                type="text"
                placeholder="Search compliance..."
                className="h-10 w-full rounded-sm border border-border bg-surface pl-9 pr-3 text-body text-text-primary placeholder:text-text-disabled focus:border-primary"
              />
            </div>
            <FilterSelect
              label="Category"
              value={comp.filters.category}
              options={mockComplianceCategoryOptions}
              onChange={(v) => comp.updateFilters({ category: v })}
            />
            <FilterSelect
              label="Type"
              value={comp.filters.type}
              options={mockComplianceTypeOptions}
              onChange={(v) => comp.updateFilters({ type: v })}
            />
            <FilterSelect
              label="Status"
              value={comp.filters.status}
              options={["All", "Upcoming", "Overdue", "On Track", "Completed"]}
              onChange={(v) => comp.updateFilters({ status: v })}
            />
          </div>

          <div className="overflow-x-auto">
            <ComplianceTable items={comp.items} />
          </div>

          <Pagination
            page={comp.page}
            totalPages={comp.totalPages}
            onPageChange={comp.setPage}
            totalCount={comp.totalFilteredCount}
            pageSize={comp.pageSize}
          />
        </div>

        <div className="space-y-6">
          <Section title="Compliance Calendar" action={{ label: "View Calendar", href: "/compliance/calendar" }}>
            <MiniCalendar
              year={today.getFullYear()}
              month={today.getMonth()} // 0-indexed month (0 = Jan, 11 = Dec)
              todayDate={today.getDate()}
              markers={mockCalendarMarkers}
              legend={[
                { kind: "upcoming", label: "Upcoming" },
                { kind: "overdue", label: "Overdue" },
                { kind: "completed", label: "Completed" },
              ]}
            />
          </Section>
          <ComplianceQuickActionsPanel actions={comp.quickActions} />
          <RecentActivitiesPanel activities={comp.recentActivities} />
        </div>
      </div>
    </div>
  );
}