interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

/** Reused across every module's filter bar (Inventory, Expiry & Returns, Compliances, GST & Tax). */
export function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="flex h-10 shrink-0 items-center gap-2 rounded-sm border border-border bg-surface px-3">
      <span className="text-caption text-text-secondary">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-body text-text-primary"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
