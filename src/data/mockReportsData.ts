import { ReportDefinition } from "@/types/reports";
import { mockDashboardData } from "@/data/mockDashboardData";
import { mockInventoryItems } from "@/data/mockInventoryData";
import { mockPurchaseBills } from "@/data/mockPurchasesData";
import { mockExpiryBatches } from "@/data/mockExpiryData";
import { mockGstReturns } from "@/data/mockGstData";
import { toCsv } from "@/lib/csv";

export const mockReportDefinitions: ReportDefinition[] = [
  { id: "sales-summary", title: "Sales Summary", description: "Summary of sales by date, payment method and user.", icon: "sales", tint: "success" },
  { id: "stock-summary", title: "Stock Summary", description: "Current stock status with stock value and stock ageing.", icon: "stock", tint: "primary" },
  { id: "purchase-summary", title: "Purchase Summary", description: "Summary of purchases by supplier, date and payment status.", icon: "purchase", tint: "warning" },
  { id: "supplier-due", title: "Supplier Due Report", description: "Suppliers with outstanding payments and due amount.", icon: "supplierDue", tint: "accent" },
  { id: "expiry-report", title: "Expiry Report", description: "Items expiring within selected date range.", icon: "expiry", tint: "warning" },
  { id: "sales-return", title: "Sales Return Report", description: "Summary of sales returns by date, item and user.", icon: "salesReturn", tint: "danger" },
  { id: "profit-loss", title: "Profit & Loss", description: "Profit and loss statement for the selected period.", icon: "profitLoss", tint: "success" },
  { id: "tax-report", title: "Tax Report (GST)", description: "GST summary with taxable value, tax collected and returns.", icon: "tax", tint: "primary" },
];

/**
 * Builds the CSV text for a given report id, pulling real rows from
 * each module's existing fixture instead of fabricating new data —
 * once each module is backed by a real API, this swaps to a
 * `GET /api/reports/<id>/export` call and the button code below
 * doesn't change.
 */
export function buildReportCsv(reportId: string): string {
  switch (reportId) {
    case "sales-summary":
      return toCsv(
        mockDashboardData.salesTrend.map((p) => ({ date: p.label, sales: p.value })),
        ["date", "sales"]
      );
    case "stock-summary":
      return toCsv(
        mockInventoryItems.map((i) => ({
          item: i.name,
          manufacturer: i.manufacturer,
          category: i.category,
          stockQty: i.stockQty,
          mrp: i.mrp,
          stockValue: i.mrp * i.stockQty,
          status: i.status,
        })),
        ["item", "manufacturer", "category", "stockQty", "mrp", "stockValue", "status"]
      );
    case "purchase-summary":
      return toCsv(
        mockPurchaseBills.map((b) => ({
          billNo: b.billNo,
          supplier: b.supplierName,
          billDate: b.billDate,
          totalAmount: b.totalAmount,
          paidAmount: b.paidAmount,
          dueAmount: b.dueAmount,
          status: b.status,
          paymentStatus: b.paymentStatus,
        })),
        ["billNo", "supplier", "billDate", "totalAmount", "paidAmount", "dueAmount", "status", "paymentStatus"]
      );
    case "supplier-due":
      return toCsv(
        mockPurchaseBills
          .filter((b) => b.dueAmount > 0)
          .map((b) => ({ supplier: b.supplierName, billNo: b.billNo, billDate: b.billDate, dueAmount: b.dueAmount })),
        ["supplier", "billNo", "billDate", "dueAmount"]
      );
    case "expiry-report":
      return toCsv(
        mockExpiryBatches.map((b) => ({
          medicine: b.medicine,
          batchNo: b.batchNo,
          expiryDate: b.expiryDate,
          stockQty: b.stockQty,
          valueMrp: b.valueMrp,
          daysLeft: b.daysLeft,
        })),
        ["medicine", "batchNo", "expiryDate", "stockQty", "valueMrp", "daysLeft"]
      );
    case "sales-return":
      // No returns fixture exists yet — export the column headers a real endpoint would fill in.
      return toCsv([], ["date", "item", "quantity", "refundAmount", "reason", "processedBy"]);
    case "profit-loss":
      return toCsv(
        [
          { line: "Total Sales (Taxable)", amount: mockDashboardData.salesTrend.reduce((s, p) => s + p.value, 0) },
          { line: "Total Purchases", amount: mockPurchaseBills.reduce((s, b) => s + b.totalAmount, 0) },
        ],
        ["line", "amount"]
      );
    case "tax-report":
      return toCsv(
        mockGstReturns.map((r) => ({
          returnPeriod: r.returnPeriod,
          returnType: r.returnType,
          gstCollected: r.gstCollected,
          gstPaid: r.gstPaid,
          netPayable: r.netPayable,
          status: r.statusLabel,
          filedOn: r.filedOn ?? "",
        })),
        ["returnPeriod", "returnType", "gstCollected", "gstPaid", "netPayable", "status", "filedOn"]
      );
    default:
      return toCsv([], ["no data"]);
  }
}
