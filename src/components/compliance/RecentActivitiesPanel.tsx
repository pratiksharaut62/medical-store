import { RecentActivity, RecentActivityKind } from "@/types/compliance";
import { Section } from "@/components/layout/Section";

interface RecentActivitiesPanelProps {
  activities: RecentActivity[];
}

const KIND_COLOR: Record<RecentActivityKind, string> = {
  success: "text-success",
  uploaded: "text-accent",
  pending: "text-warning",
};

export function RecentActivitiesPanel({ activities }: RecentActivitiesPanelProps) {
  return (
    <Section title="Recent Activities" action={{ label: "View All", href: "/compliance/activity" }}>
      <ul className="space-y-3">
        {activities.map((a) => (
          <li key={a.id} className="flex items-center justify-between gap-2">
            <span className="min-w-0">
              <p className="truncate text-body text-text-primary">{a.title}</p>
              <p className="truncate text-caption text-text-secondary">{a.subtitle}</p>
            </span>
            <span className={`shrink-0 text-caption font-medium ${KIND_COLOR[a.kind]}`}>{a.kindLabel}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
