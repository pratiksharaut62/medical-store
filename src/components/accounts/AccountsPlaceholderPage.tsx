import { Construction } from "lucide-react";

interface AccountsPlaceholderPageProps {
  title: string;
}

/**
 * The Accounts Overview screen is fully built from the reference
 * design; its sidebar links to five more sub-pages the spec didn't
 * include a screenshot for. Rather than leave those as dead links,
 * they render this until each gets its own real page — same
 * pattern to follow when building them out.
 */
export function AccountsPlaceholderPage({ title }: AccountsPlaceholderPageProps) {
  return (
    <div>
      <h1 className="text-page-title text-text-primary">{title}</h1>
      <p className="text-body text-text-secondary">This section isn't built yet.</p>

      <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface py-16 text-center">
        <Construction size={28} className="mb-3 text-text-disabled" />
        <p className="text-body font-medium text-text-primary">{title} is coming soon</p>
        <p className="mt-1 max-w-xs text-caption text-text-secondary">
          Build this the same way as Accounts Overview: a type in{" "}
          <code className="text-text-primary">types/accounts.ts</code>, a fixture in{" "}
          <code className="text-text-primary">data/</code>, and a small hook.
        </p>
      </div>
    </div>
  );
}
