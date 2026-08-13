import { Layers, Wallet, BarChart3, CalendarClock, XCircle } from "lucide-react";
import { InventoryKpis } from "@/types/inventory";
import { MetricCard } from "@/components/ui/MetricCard";

interface InventoryKpiRowProps {
  kpis: InventoryKpis;
}

/** Section 15: exactly 5 operationally meaningful KPIs — same discipline as the dashboard. */
export function InventoryKpiRow({ kpis }: InventoryKpiRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        label="Total Items"
        value={kpis.totalItems.toLocaleString("en-IN")}
        icon={<Layers size={19} />}
        tint="primary"
        supporting={<span className="text-caption text-text-secondary">Active SKUs</span>}
      />
      <MetricCard
        label="Total Stock Value"
        value={kpis.totalStockValue}
        icon={<Wallet size={19} />}
        tint="success"
        supporting={<span className="text-caption text-text-secondary">At MRP</span>}
      />
      <MetricCard
        label="Low Stock Items"
        value={String(kpis.lowStockCount)}
        icon={<BarChart3 size={19} />}
        tint="accent"
        supporting={<span className="text-caption text-danger">Below reorder level</span>}
      />
      <MetricCard
        label="Near Expiry (≤ 90 Days)"
        value={String(kpis.nearExpiryCount)}
        icon={<CalendarClock size={19} />}
        tint="warning"
        supporting={<span className="text-caption text-warning">Value {kpis.nearExpiryValue}</span>}
      />
      <MetricCard
        label="Expired Stock"
        value={String(kpis.expiredCount)}
        icon={<XCircle size={19} />}
        tint="danger"
        supporting={<span className="text-caption text-danger">Value {kpis.expiredValue}</span>}
      />
    </div>
  );
}
