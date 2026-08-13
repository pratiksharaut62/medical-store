import {
  InventoryItem,
  InventoryKpis,
  CategoryValueSlice,
  InventoryQuickAction,
  StockAgeingBucket,
} from "@/types/inventory";

// Replace with `GET /api/inventory` (paginated, filterable server-side)
// once a backend exists — useInventoryData currently paginates/filters
// this fixture client-side so the UI contract stays identical.
export const mockInventoryItems: InventoryItem[] = [
  {
    id: "inv-telma-40",
    name: "Telma 40mg",
    manufacturer: "IPCA Laboratories",
    category: "Cardiac",
    pack: "Strip of 10",
    stockQty: 120,
    stockUnit: "Strips",
    mrp: 95.0,
    status: "in-stock",
  },
  {
    id: "inv-pan-40",
    name: "Pan 40",
    manufacturer: "Alkem Laboratories",
    category: "Gastric",
    pack: "Strip of 10",
    stockQty: 85,
    stockUnit: "Strips",
    mrp: 21.5,
    status: "in-stock",
  },
  {
    id: "inv-augmentin-625",
    name: "Augmentin 625",
    manufacturer: "GSK Pharmaceuticals",
    category: "Antibiotic",
    pack: "Strip of 10",
    stockQty: 45,
    stockUnit: "Strips",
    mrp: 160.0,
    status: "low-stock",
  },
  {
    id: "inv-cetirizine-10",
    name: "Cetirizine 10mg",
    manufacturer: "Cipla Ltd.",
    category: "Allergy",
    pack: "Strip of 10",
    stockQty: 95,
    stockUnit: "Strips",
    mrp: 18.3,
    status: "in-stock",
  },
  {
    id: "inv-azithromycin-500",
    name: "Azithromycin 500mg",
    manufacturer: "Alembic Pharmaceuticals",
    category: "Antibiotic",
    pack: "Strip of 3",
    stockQty: 60,
    stockUnit: "Strips",
    mrp: 74.2,
    status: "low-stock",
  },
  {
    id: "inv-dolo-650",
    name: "Dolo 650mg",
    manufacturer: "Micro Labs",
    category: "Pain Relief",
    pack: "Strip of 15",
    stockQty: 90,
    stockUnit: "Strips",
    mrp: 18.5,
    status: "in-stock",
  },
  {
    id: "inv-ors",
    name: "ORS",
    manufacturer: "FDC Ltd.",
    category: "ORS",
    pack: "Pack of 21.8gm",
    stockQty: 150,
    stockUnit: "Packs",
    mrp: 20.0,
    status: "in-stock",
  },
  {
    id: "inv-glycomet-gp1",
    name: "Glycomet GP 1",
    manufacturer: "USV Ltd.",
    category: "Diabetes",
    pack: "Strip of 15",
    stockQty: 8,
    stockUnit: "Strips",
    mrp: 52.1,
    status: "low-stock",
  },
  {
    id: "inv-rosuvas-10",
    name: "Rosuvas 10",
    manufacturer: "Sun Pharma",
    category: "Cardiac",
    pack: "Strip of 10",
    stockQty: 0,
    stockUnit: "Strips",
    mrp: 88.0,
    status: "expired",
  },
];

export const mockInventoryKpis: InventoryKpis = {
  totalItems: 3245,
  totalStockValue: "₹18,42,360",
  lowStockCount: 18,
  nearExpiryCount: 34,
  nearExpiryValue: "₹48,620",
  expiredCount: 7,
  expiredValue: "₹8,430",
};

export const mockInventoryTotalStockValueCompact = "₹18.42L";

export const mockStockValueByCategory: CategoryValueSlice[] = [
  { label: "Cardiac", amount: "₹5.62L", value: 5.62, color: "#1677FF" },
  { label: "Antibiotics", amount: "₹4.81L", value: 4.81, color: "#22A447" },
  { label: "Pain Relief", amount: "₹3.25L", value: 3.25, color: "#F59E0B" },
  { label: "Vitamins", amount: "₹2.10L", value: 2.1, color: "#7C4DFF" },
  { label: "Others", amount: "₹2.64L", value: 2.64, color: "#98A2B3" },
];

export const mockInventoryQuickActions: InventoryQuickAction[] = [
  {
    id: "stock-adjustment",
    title: "Stock Adjustment",
    subtitle: "Add or reduce stock",
    icon: "adjustment",
    href: "/inventory/adjust",
  },
  {
    id: "stock-transfer",
    title: "Stock Transfer",
    subtitle: "Transfer between stores",
    icon: "transfer",
    href: "/inventory/transfer",
  },
  {
    id: "batch-expiry-report",
    title: "Batch Expiry Report",
    subtitle: "View expiry analysis",
    icon: "expiryReport",
    href: "/reports/batch-expiry",
  },
  {
    id: "reorder-report",
    title: "Reorder Report",
    subtitle: "Items below reorder level",
    icon: "reorderReport",
    href: "/reports/reorder",
  },
];

export const mockStockAgeing: StockAgeingBucket[] = [
  { label: "0 – 90 Days", amount: "₹9.82L", percentage: 53, color: "#22A447" },
  { label: "91 – 180 Days", amount: "₹4.21L", percentage: 23, color: "#F59E0B" },
  { label: "181 – 365 Days", amount: "₹2.63L", percentage: 14, color: "#FB923C" },
  { label: "> 365 Days", amount: "₹1.76L", percentage: 10, color: "#E5484D" },
];

export const mockCategoryOptions = [
  "All",
  "Cardiac",
  "Gastric",
  "Antibiotic",
  "Allergy",
  "Pain Relief",
  "ORS",
  "Diabetes",
];

export const mockSupplierOptions = [
  "All",
  "IPCA Laboratories",
  "Alkem Laboratories",
  "GSK Pharmaceuticals",
  "Cipla Ltd.",
  "Alembic Pharmaceuticals",
  "Micro Labs",
  "FDC Ltd.",
  "USV Ltd.",
  "Sun Pharma",
];
