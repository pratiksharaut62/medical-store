import clsx from "clsx";

interface SettingsToggleProps {
  label: string;
  description: string;
  checked: boolean;
  isEditing: boolean;
  onChange: (checked: boolean) => void;
}

export function SettingsToggle({ label, description, checked, isEditing, onChange }: SettingsToggleProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-caption font-medium text-text-secondary">{label}</span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={!isEditing}
          onClick={() => onChange(!checked)}
          className={clsx(
            "relative h-6 w-11 shrink-0 rounded-pill transition-colors disabled:cursor-not-allowed disabled:opacity-70",
            checked ? "bg-success" : "bg-border"
          )}
        >
          <span
            className={clsx(
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
              checked ? "translate-x-[22px]" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
      <p className="text-caption text-text-secondary">{description}</p>
    </div>
  );
}
