export type ComplianceTab = "all" | "upcoming" | "overdue" | "completed";

export type ComplianceStatus = "upcoming" | "overdue" | "on-track" | "completed";

export interface ComplianceRecord {
  id: string;
  name: string;
  category: string; // "Tax" | "Labour" | "License" | "Registration"
  dueDate: string; // "20 Aug 2026"
  daysLeftLabel: string; // "10 days left"
  frequency: string; // "Monthly" | "Quarterly" | "Yearly"
  status: ComplianceStatus;
  icon: ComplianceIconKey;
}

export type ComplianceIconKey = "bank" | "returnFile" | "people" | "shield" | "document";

export interface ComplianceKpis {
  totalCompliances: number;
  upcomingCount: number;
  overdueCount: number;
  completedThisYear: number;
  complianceScorePct: number;
}

export interface ComplianceFiltersState {
  search: string;
  category: string;
  type: string;
  status: string;
}

export type CalendarDayMarker = "upcoming" | "overdue" | "completed";

export interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday?: boolean;
  marker?: CalendarDayMarker;
}

export type RecentActivityKind = "success" | "uploaded" | "pending";

export interface RecentActivity {
  id: string;
  title: string;
  subtitle: string;
  kind: RecentActivityKind;
  kindLabel: string;
}

export interface ComplianceQuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: "add" | "upload" | "report" | "reminders";
  href: string;
}
