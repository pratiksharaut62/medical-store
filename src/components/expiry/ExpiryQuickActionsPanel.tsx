import { ChevronRight, FileBarChart, Layers3, Undo2, Tag } from "lucide-react";
import { ExpiryQuickAction } from "@/types/expiry";

interface ExpiryQuickActionsPanelProps {
  actions: ExpiryQuickAction[];
}

const ICONS: Record<ExpiryQuickAction["icon"], JSX.Element> = {
  report: <FileBarChart size={17} />,
  batchWise: <Layers3 size={17} />,
  returnToSupplier: <Undo2 size={17} />,
  discountedSale: <Tag size={17} />,
};

/** Section 19: every flagged item leads to an action — these are the three named in the spec (return, transfer, discounted sale) plus the report entry point. */
export function ExpiryQuickActionsPanel({ actions }: ExpiryQuickActionsPanelProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-3 text-section-title text-text-primary">Quick Actions</h2>
      <ul className="divide-y divide-border">
        {actions.map((action) => (
          <li key={action.id}>
            <a href={action.href} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 hover:opacity-80">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                {ICONS[action.icon]}
              </span>
              <span className="min-w-0 flex-1">
                <p className="truncate text-body font-medium text-text-primary">{action.title}</p>
                <p className="truncate text-caption text-text-secondary">{action.subtitle}</p>
              </span>
              <ChevronRight size={16} className="shrink-0 text-text-disabled" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
