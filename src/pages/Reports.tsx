import { useState } from "react";
import { Info, Calendar } from "lucide-react";
import { ReportCard } from "@/components/reports/ReportCard";
import { mockReportDefinitions } from "@/data/mockReportsData";

/** Formats date dynamically into "Today, D MMM YYYY" or "D MMM YYYY" */
function formatDynamicDate(dateObj: Date): string {
  const formatted = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const isToday = new Date().toDateString() === dateObj.toDateString();
  return isToday ? `Today, ${formatted}` : formatted;
}

/** Formats Date object into standard HTML date input string "YYYY-MM-DD" */
function toInputDateFormat(dateObj: Date): string {
  return dateObj.toISOString().split("T")[0];
}

export default function Reports() {
  // Dynamic Date State
  const [selectedDate, setSelectedDate] = useState<string>(() =>
    toInputDateFormat(new Date())
  );
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);

  const currentDateObj = new Date(selectedDate);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-page-title text-text-primary">Reports</h1>
          <p className="text-body text-text-secondary">View and download your business reports.</p>
        </div>

        {/* Dynamic & Editable Date Selector */}
        {isEditingDate ? (
          <div className="flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-caption font-medium text-text-primary shadow-sm">
            <Calendar size={15} />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-caption text-text-primary focus:outline-none"
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
            className="flex h-10 items-center gap-2 rounded-md border border-border bg-surface px-3 text-caption font-medium text-text-primary shadow-sm hover:bg-surface-hover transition-colors"
            title="Click to edit date"
          >
            <Calendar size={15} />
            <span>{formatDynamicDate(currentDateObj)}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockReportDefinitions.map((report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 rounded-lg border border-border bg-primary-soft px-4 py-3">
        <Info size={16} className="mt-0.5 shrink-0 text-primary" />
        <p className="text-caption text-text-primary">
          All reports are generated for the selected date range and can be downloaded in CSV format.
        </p>
      </div>
    </div>
  );
}