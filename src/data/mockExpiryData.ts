import { ExpiryBatchItem, ExpiryKpis, ExpirySummarySlice, ExpiryQuickAction } from "@/types/expiry";

export const mockExpiryKpis: ExpiryKpis = {
  nearExpiryCount: 34,
  nearExpiryValue: "₹48,620",
  expiredCount: 7,
  expiredValue: "₹8,430",
  returnsPendingCount: 5,
  returnsPendingValue: "₹17,840",
  supplierCreditsCount: 3,
  supplierCreditsValue: "₹12,560",
};

// Replace with `GET /api/expiry-batches?tab=&expiryWithin=&category=&supplier=&page=`
export const mockExpiryBatches: ExpiryBatchItem[] = [
  {
    id: "batch-augmentin",
    medicine: "Augmentin 625",
    manufacturer: "GSK Pharmaceuticals",
    batchNo: "AUG2503",
    expiryDate: "15 Sep 2026",
    stockQty: 45,
    stockUnit: "Strips",
    valueMrp: 7200,
    daysLeft: 36,
  },
  {
    id: "batch-telma",
    medicine: "Telma 40mg",
    manufacturer: "IPCA Laboratories",
    batchNo: "TLM2405",
    expiryDate: "22 Sep 2026",
    stockQty: 120,
    stockUnit: "Strips",
    valueMrp: 11400,
    daysLeft: 43,
  },
  {
    id: "batch-pan",
    medicine: "Pan 40",
    manufacturer: "Alkem Laboratories",
    batchNo: "PAN2406",
    expiryDate: "28 Sep 2026",
    stockQty: 85,
    stockUnit: "Strips",
    valueMrp: 1827.5,
    daysLeft: 49,
  },
  {
    id: "batch-cetirizine",
    medicine: "Cetirizine 10mg",
    manufacturer: "Cipla Ltd.",
    batchNo: "CET2404",
    expiryDate: "05 Oct 2026",
    stockQty: 95,
    stockUnit: "Strips",
    valueMrp: 1738.5,
    daysLeft: 56,
  },
  {
    id: "batch-azithromycin",
    medicine: "Azithromycin 500mg",
    manufacturer: "Alembic Pharmaceuticals",
    batchNo: "AZI2403",
    expiryDate: "10 Oct 2026",
    stockQty: 60,
    stockUnit: "Strips",
    valueMrp: 4452.0,
    daysLeft: 61,
  },
  {
    id: "batch-dolo",
    medicine: "Dolo 650mg",
    manufacturer: "Micro Labs",
    batchNo: "DLO2405",
    expiryDate: "18 Oct 2026",
    stockQty: 90,
    stockUnit: "Strips",
    valueMrp: 1665.0,
    daysLeft: 69,
  },
];

export const mockExpirySummary: ExpirySummarySlice[] = [
  { label: "0 – 30 Days", amount: "₹12,450", percentage: 26, value: 12450, color: "#22A447" },
  { label: "31 – 60 Days", amount: "₹18,920", percentage: 39, value: 18920, color: "#F59E0B" },
  { label: "61 – 90 Days", amount: "₹17,250", percentage: 35, value: 17250, color: "#FB923C" },
  { label: "> 90 Days", amount: "₹0", percentage: 0, value: 0, color: "#E5484D" },
];

export const mockExpiryQuickActions: ExpiryQuickAction[] = [
  { id: "expiry-report", title: "Expiry Report", subtitle: "View detailed expiry analysis", icon: "report", href: "/reports/expiry" },
  { id: "batch-wise-stock", title: "Batch Wise Stock", subtitle: "View stock by batch", icon: "batchWise", href: "/inventory?view=batches" },
  { id: "return-to-supplier", title: "Return to Supplier", subtitle: "Create return note", icon: "returnToSupplier", href: "/expiry-returns/new-return" },
  { id: "expiry-stock-sale", title: "Expiry Stock Sale", subtitle: "Create offer / discounted sale", icon: "discountedSale", href: "/billing?offer=near-expiry" },
];

export const mockExpiryCategoryOptions = ["All", "Cardiac", "Gastric", "Antibiotic", "Allergy", "Pain Relief"];
export const mockExpirySupplierOptions = [
  "All",
  "GSK Pharmaceuticals",
  "IPCA Laboratories",
  "Alkem Laboratories",
  "Cipla Ltd.",
  "Alembic Pharmaceuticals",
  "Micro Labs",
];
