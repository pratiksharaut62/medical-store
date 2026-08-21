import { Construction } from "lucide-react";

interface SettingsPlaceholderPageProps {
  title: string;
}

/** Same pattern as AccountsPlaceholderPage — General Settings is the only fully-built section for now. */
export function SettingsPlaceholderPage({ title }: SettingsPlaceholderPageProps) {
  return (
    <div>
      <h1 className="text-page-title text-text-primary">{title}</h1>
      <p className="text-body text-text-secondary">This section isn't built yet.</p>

      <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface py-16 text-center">
        <Construction size={28} className="mb-3 text-text-disabled" />
        <p className="text-body font-medium text-text-primary">{title} is coming soon</p>
        <p className="mt-1 max-w-xs text-caption text-text-secondary">
          Build this the same way as General Settings: a type in{" "}
          <code className="text-text-primary">types/settings.ts</code>, state in{" "}
          <code className="text-text-primary">SettingsContext</code>, and a{" "}
          <code className="text-text-primary">SettingsCard</code>.
        </p>
      </div>
    </div>
  );
}
