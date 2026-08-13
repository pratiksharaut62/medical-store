import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { SalesPoint } from "@/types/dashboard";
import { formatCompactCurrency } from "@/lib/format";

interface SalesTrendChartProps {
  data: SalesPoint[];
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 shadow-popover">
      <p className="text-caption text-text-secondary">{label}</p>
      <p className="text-body font-semibold text-text-primary">
        {formatCompactCurrency(payload[0].value)}
      </p>
    </div>
  );
}

/**
 * Section 8.2 + 22: one chart, one question ("how are sales trending
 * this week?"). Deliberately no second series, no hour-by-hour data —
 * that granularity belongs in Reports, not the dashboard.
 */
export function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1677FF" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#1677FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#E5EAF0" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#667085" }}
        />
        <YAxis
          tickFormatter={(v) => formatCompactCurrency(v)}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12, fill: "#667085" }}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1677FF"
          strokeWidth={2}
          fill="url(#salesFill)"
          dot={{ r: 3, fill: "#1677FF", strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
