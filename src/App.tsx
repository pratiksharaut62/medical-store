import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "@/context/SettingsContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Billing from "@/pages/Billing";
import Inventory from "@/pages/Inventory";
import ExpiryReturns from "@/pages/ExpiryReturns";
import Compliances from "@/pages/Compliances";
import GstTax from "@/pages/GstTax";
import Purchases from "@/pages/Purchases";
import Customers from "@/pages/Customers";
import Reports from "@/pages/Reports";
import Accounts from "@/pages/Accounts";
import AccountsOverview from "@/pages/AccountsOverview";
import { AccountsPlaceholderPage } from "@/components/accounts/AccountsPlaceholderPage";
import Settings from "@/pages/Settings";
import GeneralSettings from "@/pages/settings/GeneralSettings";
import { SettingsPlaceholderPage } from "@/components/settings/SettingsPlaceholderPage";

export default function App() {
  return (
    // SettingsProvider wraps the whole router so every module — not
    // just the Settings pages — can read the current date format,
    // currency, and business info via useSettings().
    <SettingsProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/expiry-returns" element={<ExpiryReturns />} />
            <Route path="/compliance" element={<Compliances />} />
            <Route path="/gst" element={<GstTax />} />

            {/* Accounts and Settings both own a sidebar + nested sub-routes. */}
            <Route path="/accounts" element={<Accounts />}>
              <Route index element={<AccountsOverview />} />
              <Route path="cash-book" element={<AccountsPlaceholderPage title="Cash Book" />} />
              <Route path="bank-accounts" element={<AccountsPlaceholderPage title="Bank Accounts" />} />
              <Route path="payment-in" element={<AccountsPlaceholderPage title="Payment In" />} />
              <Route path="payment-out" element={<AccountsPlaceholderPage title="Payment Out" />} />
              <Route path="ledger" element={<AccountsPlaceholderPage title="Ledger Report" />} />
              <Route path="profit-loss" element={<AccountsPlaceholderPage title="Profit & Loss" />} />
            </Route>

            <Route path="/settings" element={<Settings />}>
              <Route index element={<GeneralSettings />} />
              <Route path="business-profile" element={<SettingsPlaceholderPage title="Business Profile" />} />
              <Route path="users-roles" element={<SettingsPlaceholderPage title="Users & Roles" />} />
              <Route path="taxes" element={<SettingsPlaceholderPage title="Taxes" />} />
              <Route path="payment-methods" element={<SettingsPlaceholderPage title="Payment Methods" />} />
              <Route path="notifications" element={<SettingsPlaceholderPage title="Notifications" />} />
              <Route path="backup-restore" element={<SettingsPlaceholderPage title="Backup & Restore" />} />
              <Route path="data-import" element={<SettingsPlaceholderPage title="Data Import" />} />
              <Route path="preferences" element={<SettingsPlaceholderPage title="Preferences" />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </SettingsProvider>
  );
}
