export type DateFormatPattern = "DD MMM YYYY" | "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type TimeFormatPattern = "12 Hour (AM/PM)" | "24 Hour";

export interface BusinessInfo {
  businessName: string;
  businessType: string;
  phoneNumber: string;
  email: string;
  gstin: string;
}

export interface CurrencyDateFormatSettings {
  currency: string;
  dateFormat: DateFormatPattern;
  timeFormat: TimeFormatPattern;
}

export interface InvoiceSettings {
  invoicePrefix: string;
  nextInvoiceNumber: string;
  defaultPaymentMode: string;
}

export interface InventorySettingsCfg {
  lowStockAlert: number;
  expiryAlertDays: number;
  batchTracking: boolean;
}

export interface OtherSettingsCfg {
  enableBarcodeScanning: boolean;
  enableRoundingOff: boolean;
  maintainSalesHistory: boolean;
}

export type SettingsSectionKey =
  | "general"
  | "business-profile"
  | "users-roles"
  | "taxes"
  | "payment-methods"
  | "notifications"
  | "backup-restore"
  | "data-import"
  | "preferences";
