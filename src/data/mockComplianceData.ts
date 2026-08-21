import {
  ComplianceRecord,
  ComplianceKpis,
  RecentActivity,
  ComplianceQuickAction,
} from "@/types/compliance";

export const mockComplianceKpis: ComplianceKpis = {
  totalCompliances: 12,
  upcomingCount: 3,
  overdueCount: 2,
  completedThisYear: 7,
  complianceScorePct: 92,
};

// Replace with `GET /api/compliances?tab=&category=&type=&status=&page=`
export const mockComplianceRecords: ComplianceRecord[] = [
  {
    id: "gstr-3b",
    name: "GST Return - GSTR 3B",
    category: "Tax",
    dueDate: "20 Aug 2026",
    daysLeftLabel: "10 days left",
    frequency: "Monthly",
    status: "upcoming",
    icon: "bank",
  },
  {
    id: "gstr-1",
    name: "GST Return - GSTR 1",
    category: "Tax",
    dueDate: "20 Aug 2026",
    daysLeftLabel: "10 days left",
    frequency: "Monthly",
    status: "upcoming",
    icon: "returnFile",
  },
  {
    id: "epf-return",
    name: "EPF Return",
    category: "Labour",
    dueDate: "15 Aug 2026",
    daysLeftLabel: "5 days left",
    frequency: "Monthly",
    status: "upcoming",
    icon: "people",
  },
  {
    id: "esic-return",
    name: "ESIC Return",
    category: "Labour",
    dueDate: "15 Aug 2026",
    daysLeftLabel: "5 days left",
    frequency: "Monthly",
    status: "upcoming",
    icon: "shield",
  },
  {
    id: "professional-tax",
    name: "Professional Tax (PTRC)",
    category: "Tax",
    dueDate: "31 Aug 2026",
    daysLeftLabel: "21 days left",
    frequency: "Quarterly",
    status: "on-track",
    icon: "document",
  },
  {
    id: "drug-license",
    name: "Drug License Renewal",
    category: "License",
    dueDate: "30 Sep 2026",
    daysLeftLabel: "51 days left",
    frequency: "Yearly",
    status: "on-track",
    icon: "document",
  },
  {
    id: "fssai-license",
    name: "FSSAI License Renewal",
    category: "License",
    dueDate: "25 Oct 2026",
    daysLeftLabel: "76 days left",
    frequency: "Yearly",
    status: "on-track",
    icon: "document",
  },
  {
    id: "shop-establishment",
    name: "Shop & Establishment Renewal",
    category: "Registration",
    dueDate: "10 Nov 2026",
    daysLeftLabel: "92 days left",
    frequency: "Yearly",
    status: "on-track",
    icon: "shield",
  },
];

export const mockRecentActivities: RecentActivity[] = [
  {
    id: "act-1",
    title: "GST Return - GSTR 3B filed",
    subtitle: "Filed on 20 Jul 2026",
    kind: "success",
    kindLabel: "Success",
  },
  {
    id: "act-2",
    title: "Drug License document uploaded",
    subtitle: "Uploaded on 05 Jul 2026",
    kind: "uploaded",
    kindLabel: "Uploaded",
  },
  {
    id: "act-3",
    title: "ESIC Return payment pending",
    subtitle: "Due on 15 Aug 2026",
    kind: "pending",
    kindLabel: "Pending",
  },
];

export const mockComplianceQuickActions: ComplianceQuickAction[] = [
  { id: "add-compliance", title: "Add New Compliance", subtitle: "Register a new compliance", icon: "add", href: "/compliance/new" },
  { id: "upload-documents", title: "Upload Documents", subtitle: "Add compliance documents", icon: "upload", href: "/compliance/documents" },
  { id: "compliance-report", title: "Compliance Report", subtitle: "Generate compliance report", icon: "report", href: "/reports/compliance" },
  { id: "reminder-settings", title: "Reminder Settings", subtitle: "Manage alerts and reminders", icon: "reminders", href: "/compliance/reminders" },
];

export const mockComplianceCategoryOptions = ["All", "Tax", "Labour", "License", "Registration"];
export const mockComplianceTypeOptions = ["All", "Monthly", "Quarterly", "Yearly"];

// Marks used on the mini calendar for August 2026 (Section: Compliance Calendar).
export const mockCalendarMarkers: Record<number, "upcoming" | "overdue" | "completed"> = {
  10: "upcoming", // today, highlighted separately
  15: "overdue",
  20: "upcoming",
};
