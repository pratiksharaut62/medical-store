import { ReactNode, useState } from "react";
import { Pencil, Check, X } from "lucide-react";

interface SettingsCardProps<T> {
  icon: ReactNode;
  title: string;
  description: string;
  /** Current committed values from SettingsContext. */
  value: T;
  /** Persists the draft back to SettingsContext. */
  onSave: (draft: T) => void;
  /** Renders the fields. Receives the live draft plus a setter — fields stay disabled until Edit is clicked. */
  children: (draft: T, setDraft: (patch: Partial<T>) => void, isEditing: boolean) => ReactNode;
}

/**
 * Every settings section (Business Information, Currency & Date
 * Format, Invoice, Inventory, Other) is this same shell: view mode
 * shows the committed value, Edit unlocks a local draft, Save commits
 * it to SettingsContext (so e.g. Currency & Date Format's change is
 * what makes every module's date button update), Cancel discards it.
 */
export function SettingsCard<T>({ icon, title, description, value, onSave, children }: SettingsCardProps<T>) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraftState] = useState<T>(value);

  function startEdit() {
    setDraftState(value);
    setIsEditing(true);
  }

  function setDraft(patch: Partial<T>) {
    setDraftState((prev) => ({ ...prev, ...patch }));
  }

  function save() {
    onSave(draft);
    setIsEditing(false);
  }

  function cancel() {
    setIsEditing(false);
  }

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-success/10 text-success">
            {icon}
          </span>
          <div>
            <p className="text-card-title text-text-primary">{title}</p>
            <p className="text-caption text-text-secondary">{description}</p>
          </div>
        </div>

        {isEditing ? (
          <div className="flex shrink-0 gap-2">
            <button
              onClick={cancel}
              className="flex items-center gap-1.5 rounded-sm border border-border px-3 py-1.5 text-caption font-medium text-text-secondary hover:bg-bg"
            >
              <X size={14} />
              Cancel
            </button>
            <button
              onClick={save}
              className="flex items-center gap-1.5 rounded-sm bg-success px-3 py-1.5 text-caption font-medium text-white hover:opacity-90"
            >
              <Check size={14} />
              Save
            </button>
          </div>
        ) : (
          <button
            onClick={startEdit}
            className="flex shrink-0 items-center gap-1.5 rounded-sm border border-success px-3 py-1.5 text-caption font-medium text-success hover:bg-success/5"
          >
            <Pencil size={13} />
            Edit
          </button>
        )}
      </div>

      <div className="mt-4">{children(isEditing ? draft : value, setDraft, isEditing)}</div>
    </div>
  );
}
