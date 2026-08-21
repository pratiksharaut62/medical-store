import { ChevronDown } from "lucide-react";
import { GstReturnRow, GstReturnStatus } from "@/types/gst";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";
import { formatCurrency } from "@/lib/format";

interface GstReturnsTableProps {
  items: GstReturnRow[];
}

const STATUS_TONE: Record<GstReturnStatus, BadgeTone> = {
  "due-soon": "warning",
  filed: "success",
  overdue: "danger",
};

export function GstReturnsTable({ items }: GstReturnsTableProps) {
  if (items.length === 0) {
    return <p className="py-10 text-center text-body text-text-secondary">No returns match the current filters.</p>;
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Return Period</th>
          <th className="py-2.5 font-medium">Return Type</th>
          <th className="py-2.5 font-medium">Due Date</th>
          <th className="py-2.5 text-right font-medium">GST Collected (₹)</th>
          <th className="py-2.5 text-right font-medium">GST Paid (₹)</th>
          <th className="py-2.5 text-right font-medium">Net Payable (₹)</th>
          <th className="py-2.5 font-medium">Status</th>
          <th className="py-2.5 font-medium">Filed On</th>
          <th className="py-2.5 font-medium">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.id} className="border-b border-border last:border-0">
            <td className="py-3 pr-2 text-body font-medium text-text-primary">{r.returnPeriod}</td>
            <td className="py-3 pr-2 text-caption text-text-secondary">{r.returnType}</td>
            <td className="py-3 pr-2 text-caption text-text-primary">{r.dueDate}</td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {formatCurrency(r.gstCollected)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body text-text-primary">
              {formatCurrency(r.gstPaid)}
            </td>
            <td className="py-3 pr-2 text-right tabular text-body font-semibold text-text-primary">
              {formatCurrency(r.netPayable)}
            </td>
            <td className="py-3 pr-2">
              <StatusBadge label={r.statusLabel} tone={STATUS_TONE[r.status]} />
            </td>
            <td className="py-3 pr-2 text-caption text-text-secondary">{r.filedOn ?? "–"}</td>
            <td className="py-3">
              <button className="flex items-center gap-1 rounded-sm border border-border px-2.5 py-1.5 text-caption font-medium text-text-primary hover:border-primary hover:text-primary">
                {r.status === "filed" ? "View / Download" : "Prepare"}
                <ChevronDown size={13} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
