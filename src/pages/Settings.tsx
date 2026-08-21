import { Outlet } from "react-router-dom";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function Settings() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-6 lg:flex-row">
        <SettingsSidebar />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
