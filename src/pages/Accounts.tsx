import { Outlet } from "react-router-dom";
import { AccountsSidebar } from "@/components/accounts/AccountsSidebar";

/**
 * Wraps every /accounts/* route. AccountsOverview and the placeholder
 * sub-pages render into the Outlet — the sidebar itself never
 * re-renders between them.
 */
export default function Accounts() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <AccountsSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
