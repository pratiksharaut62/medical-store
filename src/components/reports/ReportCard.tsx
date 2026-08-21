import { useState } from "react";
import { Eye, Download, TrendingUp, Box, ShoppingCart, Users, CalendarClock, Undo2, IndianRupee, FileText, X } from "lucide-react";
import { ReportDefinition, ReportIconKey } from "@/types/reports";
import { buildReportCsv } from "@/data/mockReportsData";
import { downloadCsv } from "@/lib/csv";

interface ReportCardProps {
  report: ReportDefinition;
}

const ICONS: Record<ReportIconKey, JSX.Element> = {
  sales: <TrendingUp size={22} />,
  stock: <Box size={22} />,
  purchase: <ShoppingCart size={22} />,
  supplierDue: <Users size={22} />,
  expiry: <CalendarClock size={22} />,
  salesReturn: <Undo2 size={22} />,
  profitLoss: <IndianRupee size={22} />,
  tax: <FileText size={22} />,
};

const TINT_CLASSES: Record<ReportDefinition["tint"], string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  accent: "bg-accent/10 text-accent",
  warning: "bg-warning/10 text-warning",
  danger: "bg-danger/10 text-danger",
};

export function ReportCard({ report }: ReportCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const csv = isPreviewOpen ? buildReportCsv(report.id) : "";

  function handleDownload() {
    const filename = `${report.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}.csv`;
    downloadCsv(filename, buildReportCsv(report.id));
  }

  return (
    <div className="flex flex-col rounded-lg border border-border bg-surface p-4 shadow-card">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-md ${TINT_CLASSES[report.tint]}`}>
        {ICONS[report.icon]}
      </div>
      <p className="text-card-title text-text-primary">{report.title}</p>
      <p className="mt-1 flex-1 text-caption text-text-secondary">{report.description}</p>

      <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="flex items-center gap-1.5 text-caption font-medium text-text-secondary hover:text-text-primary"
        >
          <Eye size={14} />
          View
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 text-caption font-medium text-success hover:underline"
        >
          <Download size={14} />
          Download CSV
        </button>
      </div>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-surface shadow-popover">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-body font-semibold text-text-primary">{report.title}</p>
              <button onClick={() => setIsPreviewOpen(false)} aria-label="Close preview" className="text-text-disabled hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <pre className="max-h-[60vh] overflow-auto whitespace-pre-wrap p-4 text-caption text-text-primary">{csv}</pre>
            <div className="flex justify-end gap-2 border-t border-border px-4 py-3">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 rounded-sm bg-primary px-3 py-2 text-caption font-medium text-white hover:bg-primary-dark"
              >
                <Download size={14} />
                Download CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
