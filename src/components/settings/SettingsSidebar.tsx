import { NavLink } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Building2,
  UserCog,
  Percent,
  CreditCard,
  Bell,
  CloudUpload,
  Upload,
  SlidersHorizontal,
} from "lucide-react";
import clsx from "clsx";

const SECTIONS = [
  { to: "/settings", end: true, icon: <SettingsIcon size={16} />, label: "General" },
  { to: "/settings/business-profile", icon: <Building2 size={16} />, label: "Business Profile" },
  { to: "/settings/users-roles", icon: <UserCog size={16} />, label: "Users & Roles" },
  { to: "/settings/taxes", icon: <Percent size={16} />, label: "Taxes" },
  { to: "/settings/payment-methods", icon: <CreditCard size={16} />, label: "Payment Methods" },
  { to: "/settings/notifications", icon: <Bell size={16} />, label: "Notifications" },
  { to: "/settings/backup-restore", icon: <CloudUpload size={16} />, label: "Backup & Restore" },
  { to: "/settings/data-import", icon: <Upload size={16} />, label: "Data Import" },
  { to: "/settings/preferences", icon: <SlidersHorizontal size={16} />, label: "Preferences" },
];

export function SettingsSidebar() {
  return (
    <aside className="w-full shrink-0 lg:w-56">
      <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0.5 lg:overflow-visible">
        {SECTIONS.map((s) => (
          <NavLink
            key={s.to}
            to={s.to}
            end={s.end}
            className={({ isActive }) =>
              clsx(
                "flex shrink-0 items-center gap-2.5 rounded-sm px-3 py-2 text-body font-medium transition-colors",
                isActive
                  ? "bg-success/10 text-success"
                  : "text-text-secondary hover:bg-bg hover:text-text-primary"
              )
            }
          >
            {s.icon}
            {s.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
