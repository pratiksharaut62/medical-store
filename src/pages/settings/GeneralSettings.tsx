import { Building2, Globe, FileText, Box, MoreHorizontal, Info } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { SettingsCard } from "@/components/settings/SettingsCard";
import { SettingsField } from "@/components/settings/SettingsField";
import { SettingsToggle } from "@/components/settings/SettingsToggle";
import { DateFormatPattern, TimeFormatPattern } from "@/types/settings";

const DATE_FORMAT_OPTIONS: DateFormatPattern[] = ["DD MMM YYYY", "DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"];
const TIME_FORMAT_OPTIONS: TimeFormatPattern[] = ["12 Hour (AM/PM)", "24 Hour"];

export default function GeneralSettings() {
  const {
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
  } = useSettings();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-page-title text-text-primary">General Settings</h1>
        <p className="text-body text-text-secondary">Manage basic system settings and preferences.</p>
      </div>

      <SettingsCard
        icon={<Building2 size={18} />}
        title="Business Information"
        description="Update your business details"
        value={businessInfo}
        onSave={updateBusinessInfo}
      >
        {(draft, setDraft, isEditing) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SettingsField label="Business Name" value={draft.businessName} isEditing={isEditing} onChange={(v) => setDraft({ businessName: v })} />
            <SettingsField
              label="Business Type"
              value={draft.businessType}
              isEditing={isEditing}
              onChange={(v) => setDraft({ businessType: v })}
              options={["Medical Store", "Pharmacy Chain", "Wholesale Distributor"]}
            />
            <SettingsField label="Phone Number" value={draft.phoneNumber} isEditing={isEditing} onChange={(v) => setDraft({ phoneNumber: v })} />
            <SettingsField label="Email Address" value={draft.email} isEditing={isEditing} onChange={(v) => setDraft({ email: v })} />
            <SettingsField label="GSTIN" value={draft.gstin} isEditing={isEditing} onChange={(v) => setDraft({ gstin: v })} />
          </div>
        )}
      </SettingsCard>

      <SettingsCard
        icon={<Globe size={18} />}
        title="Currency & Date Format"
        description="Set your preferred currency and date format"
        value={currencyDateFormat}
        onSave={updateCurrencyDateFormat}
      >
        {(draft, setDraft, isEditing) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SettingsField
              label="Currency"
              value={draft.currency}
              isEditing={isEditing}
              onChange={(v) => setDraft({ currency: v })}
              options={["Indian Rupee (₹)", "US Dollar ($)", "Euro (€)"]}
            />
            <SettingsField
              label="Date Format"
              value={draft.dateFormat}
              isEditing={isEditing}
              onChange={(v) => setDraft({ dateFormat: v as DateFormatPattern })}
              options={DATE_FORMAT_OPTIONS}
            />
            <SettingsField
              label="Time Format"
              value={draft.timeFormat}
              isEditing={isEditing}
              onChange={(v) => setDraft({ timeFormat: v as TimeFormatPattern })}
              options={TIME_FORMAT_OPTIONS}
            />
          </div>
        )}
      </SettingsCard>

      <SettingsCard
        icon={<FileText size={18} />}
        title="Invoice Settings"
        description="Configure invoice and billing preferences"
        value={invoiceSettings}
        onSave={updateInvoiceSettings}
      >
        {(draft, setDraft, isEditing) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SettingsField label="Invoice Prefix" value={draft.invoicePrefix} isEditing={isEditing} onChange={(v) => setDraft({ invoicePrefix: v })} />
            <SettingsField
              label="Next Invoice Number"
              value={draft.nextInvoiceNumber}
              isEditing={isEditing}
              onChange={(v) => setDraft({ nextInvoiceNumber: v })}
            />
            <SettingsField
              label="Default Payment Mode"
              value={draft.defaultPaymentMode}
              isEditing={isEditing}
              onChange={(v) => setDraft({ defaultPaymentMode: v })}
              options={["Cash", "UPI", "Card", "Credit"]}
            />
          </div>
        )}
      </SettingsCard>

      <SettingsCard
        icon={<Box size={18} />}
        title="Inventory Settings"
        description="Set stock and inventory preferences"
        value={inventorySettings}
        onSave={updateInventorySettings}
      >
        {(draft, setDraft, isEditing) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <SettingsField
                label="Low Stock Alert"
                type="number"
                value={String(draft.lowStockAlert)}
                isEditing={isEditing}
                onChange={(v) => setDraft({ lowStockAlert: Number(v) || 0 })}
              />
              <p className="mt-1 text-[11px] text-text-secondary">Show alert when stock is below this level</p>
            </div>
            <div>
              <SettingsField
                label="Expiry Alert Days"
                type="number"
                value={String(draft.expiryAlertDays)}
                isEditing={isEditing}
                onChange={(v) => setDraft({ expiryAlertDays: Number(v) || 0 })}
              />
              <p className="mt-1 text-[11px] text-text-secondary">Show alert before items expire</p>
            </div>
            <SettingsToggle
              label="Batch Tracking"
              description="Track batch numbers for products"
              checked={draft.batchTracking}
              isEditing={isEditing}
              onChange={(v) => setDraft({ batchTracking: v })}
            />
          </div>
        )}
      </SettingsCard>

      <SettingsCard
        icon={<MoreHorizontal size={18} />}
        title="Other Settings"
        description="Manage miscellaneous preferences"
        value={otherSettings}
        onSave={updateOtherSettings}
      >
        {(draft, setDraft, isEditing) => (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <SettingsToggle
              label="Enable Barcode Scanning"
              description="Allow barcode scanning in POS"
              checked={draft.enableBarcodeScanning}
              isEditing={isEditing}
              onChange={(v) => setDraft({ enableBarcodeScanning: v })}
            />
            <SettingsToggle
              label="Enable Rounding Off"
              description="Round off final bill amount"
              checked={draft.enableRoundingOff}
              isEditing={isEditing}
              onChange={(v) => setDraft({ enableRoundingOff: v })}
            />
            <SettingsToggle
              label="Maintain Sales History"
              description="Keep history of all sales invoices"
              checked={draft.maintainSalesHistory}
              isEditing={isEditing}
              onChange={(v) => setDraft({ maintainSalesHistory: v })}
            />
          </div>
        )}
      </SettingsCard>

      <div className="flex items-start gap-2 rounded-lg border border-border bg-primary-soft px-4 py-3">
        <Info size={16} className="mt-0.5 shrink-0 text-primary" />
        <div>
          <p className="text-caption font-medium text-text-primary">Settings are saved automatically.</p>
          <p className="text-caption text-text-secondary">Changes made here will reflect across the system.</p>
        </div>
      </div>
    </div>
  );
}
