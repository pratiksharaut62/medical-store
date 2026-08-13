import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  ShoppingBag,
  Users,
  BarChart3,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { NavItem } from "./NavItem";
import { MoreMenu, MoreMenuItem } from "./MoreMenu";

export type NavKey =
  | "dashboard"
  | "billing"
  | "inventory"
  | "purchases"
  | "customers"
  | "reports";

interface AppHeaderProps {
  notificationCount?: number;
  userName: string;
  userRole: string;
}

const PRIMARY_NAV: { key: NavKey; label: string; icon: JSX.Element; href: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} />, href: "/" },
  { key: "billing", label: "Billing (POS)", icon: <ShoppingCart size={17} />, href: "/billing" },
  { key: "inventory", label: "Inventory", icon: <Boxes size={17} />, href: "/inventory" },
  { key: "purchases", label: "Purchases", icon: <ShoppingBag size={17} />, href: "/purchases" },
  { key: "customers", label: "Customers", icon: <Users size={17} />, href: "/customers" },
  { key: "reports", label: "Reports", icon: <BarChart3 size={17} />, href: "/reports" },
];

const MORE_ITEMS: MoreMenuItem[] = [
  { label: "Prescriptions", href: "/prescriptions" },
  { label: "Expiry & Returns", href: "/expiry-returns" },
  { label: "Accounts", href: "/accounts" },
  { label: "GST & Tax", href: "/gst" },
  { label: "Compliance", href: "/compliance" },
  { label: "CRM & Loyalty", href: "/crm" },
  { label: "Settings", href: "/settings" },
];

export function AppHeader({
  notificationCount = 0,
  userName,
  userRole,
}: AppHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMobileNav = (href: string) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-header px-4 sm:px-6">
      {/* Left: Mobile Toggle + Logo */}
      <div className="flex shrink-0 items-center gap-2.5">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-header-text p-1 hover:bg-header-secondary rounded-md focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white">
          <Plus size={18} strokeWidth={2.5} />
        </div>
        <span className="text-body font-semibold text-header-text">Medical Store ERP</span>
      </div>

      {/* Center: Desktop Navigation */}
      <nav className="hidden items-center gap-1 lg:flex">
        {PRIMARY_NAV.map((item) => {
          const isActive =
            item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
          return (
            <NavItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              isActive={isActive}
              onClick={() => navigate(item.href)}
            />
          );
        })}
        <MoreMenu items={MORE_ITEMS} />
      </nav>

      {/* Right: Notifications + User profile */}
      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          aria-label={`Notifications${notificationCount ? `, ${notificationCount} unread` : ""}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-header-muted hover:bg-header-secondary hover:text-header-text"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-pill bg-danger px-1 text-[10px] font-semibold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5 border-l border-header-secondary pl-3 sm:pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-caption font-semibold text-white">
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-caption font-semibold leading-tight text-header-text">{userName}</p>
            <p className="text-[11px] leading-tight text-header-muted">{userRole}</p>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-header border-b border-header-secondary p-4 shadow-xl lg:hidden flex flex-col gap-1">
          <p className="px-3 text-xs text-header-muted font-semibold uppercase tracking-wider mb-1">
            Main Navigation
          </p>
          {PRIMARY_NAV.map((item) => {
            const isActive =
              item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);

            return (
              <button
                key={item.key}
                onClick={() => handleMobileNav(item.href)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-header-text hover:bg-header-secondary"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="border-t border-header-secondary pt-3 mt-2">
            <p className="px-3 text-xs text-header-muted font-semibold uppercase tracking-wider mb-1">
              More Modules
            </p>
            {MORE_ITEMS.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <button
                  key={item.href}
                  onClick={() => handleMobileNav(item.href)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-white font-semibold"
                      : "text-header-text hover:bg-header-secondary"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}