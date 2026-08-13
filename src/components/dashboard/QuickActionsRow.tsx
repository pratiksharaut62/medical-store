import { FileText, ShoppingCart, UserPlus2, Warehouse, RotateCcw } from "lucide-react";
import { QuickActionItem } from "@/types/dashboard";

interface QuickActionsRowProps {
  actions: QuickActionItem[];
}

const ICONS: Record<QuickActionItem["icon"], JSX.Element> = {
  newBill: <FileText size={18} />,
  newPurchase: <ShoppingCart size={18} />,
  addCustomer: <UserPlus2 size={18} />,
  stockAdjustment: <Warehouse size={18} />,
  expiryReturn: <RotateCcw size={18} />,
};

/**
 * Section 8.4: shortcuts only — no reports, tables, or analytics
 * belong in this row.
 */
export function QuickActionsRow({ actions }: QuickActionsRowProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-4 text-section-title text-text-primary">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-body text-text-primary hover:border-primary hover:bg-primary-soft"
          >
            <span className="text-primary">{ICONS[action.icon]}</span>
            <span className="truncate">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
