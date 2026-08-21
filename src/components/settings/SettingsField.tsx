interface SettingsFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (value: string) => void;
  options?: string[];
  type?: "text" | "number";
}

export function SettingsField({ label, value, isEditing, onChange, options, type = "text" }: SettingsFieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-caption font-medium text-text-secondary">{label}</span>
      {options ? (
        <select
          value={value}
          disabled={!isEditing}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-body text-text-primary disabled:bg-bg disabled:text-text-secondary"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          disabled={!isEditing}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full rounded-sm border border-border bg-surface px-3 text-body text-text-primary disabled:bg-bg disabled:text-text-secondary"
        />
      )}
    </label>
  );
}
