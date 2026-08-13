import clsx from "clsx";
import { InventoryTab } from "@/types/inventory";

interface InventoryTabsProps {
  activeTab: InventoryTab;
  onSelect: (tab: InventoryTab) => void;
}

const TABS: { id: InventoryTab; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "low-stock", label: "Low Stock" },
  { id: "near-expiry", label: "Near Expiry" },
  { id: "expired", label: "Expired" },
];

export function InventoryTabs({ activeTab, onSelect }: InventoryTabsProps) {
  return (
    <div className="flex items-center gap-1 border-b border-border">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={clsx(
            "border-b-2 px-3 py-2.5 text-body font-medium transition-colors",
            activeTab === tab.id
              ? "border-primary text-primary"
              : "border-transparent text-text-secondary hover:text-text-primary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
