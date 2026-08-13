import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DonutChartSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  slices: DonutChartSlice[];
  centerValue: string;
  centerLabel: string;
  size?: number;
}

/**
 * Section 23: donut charts get exactly one meaningful number in the
 * center — never stack a second metric in there.
 */
export function DonutChart({
  slices,
  centerValue,
  centerLabel,
  size = 148,
}: DonutChartProps) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={slices}
            dataKey="value"
            nameKey="label"
            innerRadius={size * 0.34}
            outerRadius={size * 0.5}
            paddingAngle={2}
            stroke="none"
          >
            {slices.map((slice) => (
              <Cell key={slice.label} fill={slice.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-card-title text-text-primary">{centerValue}</span>
        <span className="text-caption text-text-secondary">{centerLabel}</span>
      </div>
    </div>
  );
}
