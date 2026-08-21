export type ReportIconKey =
  | "sales"
  | "stock"
  | "purchase"
  | "supplierDue"
  | "expiry"
  | "salesReturn"
  | "profitLoss"
  | "tax";

export interface ReportDefinition {
  id: string;
  title: string;
  description: string;
  icon: ReportIconKey;
  tint: "primary" | "success" | "accent" | "warning" | "danger";
}
