import { ReactNode } from "react";

interface SectionProps {
  title: string;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
}

/**
 * Section 46: "View All" / secondary links always sit top-right of
 * their section header. Every dashboard panel below is built on this
 * shell so that rule can't be broken accidentally.
 */
export function Section({ title, action, children, className }: SectionProps) {
  return (
    <div className={`rounded-lg border border-border bg-surface p-4 shadow-card ${className ?? ""}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-section-title text-text-primary">{title}</h2>
        {action && (
          <a href={action.href} className="text-caption font-medium text-primary hover:underline">
            {action.label}
          </a>
        )}
      </div>
      {children}
    </div>
  );
}
