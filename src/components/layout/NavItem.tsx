import { ReactNode } from "react";
import clsx from "clsx";

interface NavItemProps {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export function NavItem({ label, icon, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-2 rounded-sm px-3 py-2 text-body font-medium transition-colors",
        isActive
          ? "bg-header-secondary text-header-text"
          : "text-header-muted hover:bg-header-secondary/60 hover:text-header-text"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
