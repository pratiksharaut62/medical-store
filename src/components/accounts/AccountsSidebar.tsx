import { NavLink } from "react-router-dom";
import { Home, BookOpen, Landmark, ArrowDownToLine, ArrowUpFromLine, FileText, FileBarChart2 } from "lucide-react";
import clsx from "clsx";

/**
 * Accounts is the one module deep enough to need its own workspace
 * nav (Section 31: role-based / module-specific UI can carry extra
 * structure the top-level chrome shouldn't). Sits inside Accounts.tsx,
 * not AppHeader — Section 44 still holds for the persistent top chrome.
 */
export function AccountsSidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-56">
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible">
        <SidebarLink to="/accounts" end icon={<Home size={16} />} label="Overview" />

        <SidebarGroupLabel>Transactions</SidebarGroupLabel>
        <SidebarLink to="/accounts/cash-book" icon={<BookOpen size={16} />} label="Cash Book" />
        <SidebarLink to="/accounts/bank-accounts" icon={<Landmark size={16} />} label="Bank Accounts" />
        <SidebarLink to="/accounts/payment-in" icon={<ArrowDownToLine size={16} />} label="Payment In" />
        <SidebarLink to="/accounts/payment-out" icon={<ArrowUpFromLine size={16} />} label="Payment Out" />

        <SidebarGroupLabel>Reports</SidebarGroupLabel>
        <SidebarLink to="/accounts/ledger" icon={<FileText size={16} />} label="Ledger Report" />
        <SidebarLink to="/accounts/profit-loss" icon={<FileBarChart2 size={16} />} label="Profit & Loss" />
      </nav>
    </aside>
  );
}

function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 hidden px-3 pb-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-disabled lg:block">
      {children}
    </p>
  );
}

function SidebarLink({
  to,
  end,
  icon,
  label,
}: {
  to: string;
  end?: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        clsx(
          "flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2 text-body font-medium transition-colors",
          isActive
            ? "bg-success/10 text-success"
            : "text-text-secondary hover:bg-bg hover:text-text-primary"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
