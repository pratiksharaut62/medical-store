import { BookOpen, Landmark, ArrowDownToLine, ArrowUpFromLine, FileText } from "lucide-react";
import { AccountsQuickAction } from "@/types/accounts";

interface AccountsQuickActionsRowProps {
  actions: AccountsQuickAction[];
}

const ICONS: Record<AccountsQuickAction["icon"], JSX.Element> = {
  cashBook: <BookOpen size={18} />,
  bankAccounts: <Landmark size={18} />,
  paymentIn: <ArrowDownToLine size={18} />,
  paymentOut: <ArrowUpFromLine size={18} />,
  ledgerReport: <FileText size={18} />,
};

export function AccountsQuickActionsRow({ actions }: AccountsQuickActionsRowProps) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-4 text-section-title text-text-primary">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action) => (
          <a
            key={action.id}
            href={action.href}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2.5 text-body text-text-primary hover:border-success hover:bg-success/5"
          >
            <span className="text-success">{ICONS[action.icon]}</span>
            <span className="truncate">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
