import { ArrowLeftRight, ChevronRight, ClipboardList, FileClock, PackageSearch } from "lucide-react";
import { InventoryQuickAction } from "@/types/inventory";

interface InventoryQuickActionsPanelProps {
  actions: InventoryQuickAction[];
}

const ICONS: Record<InventoryQuickAction["icon"], JSX.Element> = {
  adjustment: <ClipboardList size={17} />,
  transfer: <ArrowLeftRight size={17} />,
  expiryReport: <FileClock size={17} />,
  reorderReport: <PackageSearch size={17} />,
};

export function InventoryQuickActionsPanel({ actions }: InventoryQuickActionsPanelProps) {
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
