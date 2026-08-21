import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";
import {
  BusinessInfo,
  CurrencyDateFormatSettings,
  InvoiceSettings,
  InventorySettingsCfg,
  OtherSettingsCfg,
  DateFormatPattern,
  TimeFormatPattern,
} from "@/types/settings";

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** The only place that turns a Date into a string per the *current* Settings → Currency & Date Format choice. */
function formatByPattern(date: Date, pattern: DateFormatPattern): string {
  const dd = pad2(date.getDate());
  const mm = pad2(date.getMonth() + 1);
  const yyyy = date.getFullYear();
  const mmm = MONTH_SHORT[date.getMonth()];

  switch (pattern) {
    case "DD MMM YYYY":
      return `${dd} ${mmm} ${yyyy}`;
    case "DD/MM/YYYY":
      return `${dd}/${mm}/${yyyy}`;
    case "MM/DD/YYYY":
      return `${mm}/${dd}/${yyyy}`;
    case "YYYY-MM-DD":
      return `${yyyy}-${mm}-${dd}`;
  }
}

function formatTimeByPattern(date: Date, pattern: TimeFormatPattern): string {
  if (pattern === "24 Hour") {
    return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
  }
  const hours12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${hours12}:${pad2(date.getMinutes())} ${ampm}`;
}

interface SettingsContextValue {
  businessInfo: BusinessInfo;
  updateBusinessInfo: (patch: Partial<BusinessInfo>) => void;
  currencyDateFormat: CurrencyDateFormatSettings;
  updateCurrencyDateFormat: (patch: Partial<CurrencyDateFormatSettings>) => void;
  invoiceSettings: InvoiceSettings;
  updateInvoiceSettings: (patch: Partial<InvoiceSettings>) => void;
  inventorySettings: InventorySettingsCfg;
  updateInventorySettings: (patch: Partial<InventorySettingsCfg>) => void;
  otherSettings: OtherSettingsCfg;
  updateOtherSettings: (patch: Partial<OtherSettingsCfg>) => void;
  /** Formats any Date using the current Settings → Date Format choice. */
  formatDate: (date: Date) => string;
  /** Formats any Date using the current Settings → Time Format choice. */
  formatTime: (date: Date) => string;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

// The "today" every module's date button anchors to — swap for `new
// Date()` once this stops needing to match the reference screenshots.
const REFERENCE_TODAY = new Date(2026, 7, 10, 10, 46);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    businessName: "Suresh Medicals",
    businessType: "Medical Store",
    phoneNumber: "+91 98765 43210",
    email: "sureshmedicals@gmail.com",
    gstin: "27ABCDE1234F1Z5",
  });

  const [currencyDateFormat, setCurrencyDateFormat] = useState<CurrencyDateFormatSettings>({
    currency: "Indian Rupee (₹)",
    dateFormat: "DD MMM YYYY",
    timeFormat: "12 Hour (AM/PM)",
  });

  const [invoiceSettings, setInvoiceSettings] = useState<InvoiceSettings>({
    invoicePrefix: "INV-",
    nextInvoiceNumber: "1024",
    defaultPaymentMode: "Cash",
  });

  const [inventorySettings, setInventorySettings] = useState<InventorySettingsCfg>({
    lowStockAlert: 10,
    expiryAlertDays: 30,
    batchTracking: true,
  });

  const [otherSettings, setOtherSettings] = useState<OtherSettingsCfg>({
    enableBarcodeScanning: true,
    enableRoundingOff: false,
    maintainSalesHistory: true,
  });

  const updateBusinessInfo = useCallback((patch: Partial<BusinessInfo>) => {
    setBusinessInfo((prev) => ({ ...prev, ...patch }));
  }, []);
  const updateCurrencyDateFormat = useCallback((patch: Partial<CurrencyDateFormatSettings>) => {
    setCurrencyDateFormat((prev) => ({ ...prev, ...patch }));
  }, []);
  const updateInvoiceSettings = useCallback((patch: Partial<InvoiceSettings>) => {
    setInvoiceSettings((prev) => ({ ...prev, ...patch }));
  }, []);
  const updateInventorySettings = useCallback((patch: Partial<InventorySettingsCfg>) => {
    setInventorySettings((prev) => ({ ...prev, ...patch }));
  }, []);
  const updateOtherSettings = useCallback((patch: Partial<OtherSettingsCfg>) => {
    setOtherSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const formatDate = useCallback(
    (date: Date) => formatByPattern(date, currencyDateFormat.dateFormat),
    [currencyDateFormat.dateFormat]
  );
  const formatTime = useCallback(
    (date: Date) => formatTimeByPattern(date, currencyDateFormat.timeFormat),
    [currencyDateFormat.timeFormat]
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      businessInfo,
      updateBusinessInfo,
      currencyDateFormat,
      updateCurrencyDateFormat,
      invoiceSettings,
      updateInvoiceSettings,
      inventorySettings,
      updateInventorySettings,
      otherSettings,
      updateOtherSettings,
      formatDate,
      formatTime,
    }),
    [
      businessInfo,
      updateBusinessInfo,
      currencyDateFormat,
      updateCurrencyDateFormat,
      invoiceSettings,
      updateInvoiceSettings,
      inventorySettings,
      updateInventorySettings,
      otherSettings,
      updateOtherSettings,
      formatDate,
      formatTime,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within a SettingsProvider");
  return ctx;
}

export function useToday(): Date {
  return REFERENCE_TODAY;
}
