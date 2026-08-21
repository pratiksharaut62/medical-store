import { MoreVertical, Landmark, FileSpreadsheet, Users, ShieldCheck, FileText } from "lucide-react";
import { ComplianceRecord, ComplianceIconKey, ComplianceStatus } from "@/types/compliance";
import { StatusBadge, BadgeTone } from "@/components/ui/StatusBadge";

interface ComplianceTableProps {
  items: ComplianceRecord[];
}

const ICONS: Record<ComplianceIconKey, JSX.Element> = {
  bank: <Landmark size={16} />,
  returnFile: <FileSpreadsheet size={16} />,
  people: <Users size={16} />,
  shield: <ShieldCheck size={16} />,
  document: <FileText size={16} />,
};

const STATUS_LABEL: Record<ComplianceStatus, string> = {
  upcoming: "Upcoming",
  overdue: "Overdue",
  "on-track": "On Track",
  completed: "Completed",
};

const STATUS_TONE: Record<ComplianceStatus, BadgeTone> = {
  upcoming: "warning",
  overdue: "danger",
  "on-track": "success",
  completed: "success",
};

export function ComplianceTable({ items }: ComplianceTableProps) {
  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-body text-text-secondary">
        No compliances match the current filters.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr className="border-b border-border text-left text-caption text-text-secondary">
          <th className="py-2.5 font-medium">Compliance Name</th>
          <th className="py-2.5 font-medium">Category</th>
          <th className="py-2.5 font-medium">Due Date</th>
          <th className="py-2.5 font-medium">Frequency</th>
          <th className="py-2.5 font-medium">Status</th>
          <th className="w-8 py-2.5" />
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.id} className="border-b border-border last:border-0">
            <td className="py-3 pr-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                  {ICONS[r.icon]}
                </span>
                <span className="text-body font-medium text-text-primary">{r.name}</span>
              </div>
            </td>
            <td className="py-3 pr-2">
              <span className="rounded-sm bg-primary-soft px-2 py-0.5 text-caption font-medium text-primary">
                {r.category}
              </span>
            </td>
            <td className="py-3 pr-2">
              <p className="text-caption text-text-primary">{r.dueDate}</p>
              <p className="text-[11px] text-warning">{r.daysLeftLabel}</p>
            </td>
            <td className="py-3 pr-2 text-caption text-text-secondary">{r.frequency}</td>
            <td className="py-3 pr-2">
              <StatusBadge label={STATUS_LABEL[r.status]} tone={STATUS_TONE[r.status]} />
            </td>
            <td className="py-3">
              <button aria-label={`More actions for ${r.name}`} className="text-text-disabled hover:text-text-primary">
                <MoreVertical size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
