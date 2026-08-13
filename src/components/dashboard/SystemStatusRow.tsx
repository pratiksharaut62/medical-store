import { Wifi, WifiOff, RefreshCw, Database, Server } from "lucide-react";
import clsx from "clsx";
import { SystemStatus } from "@/types/dashboard";

interface SystemStatusRowProps {
  status: SystemStatus;
}

/**
 * Section 32/33: connectivity state is never hidden, and this stays a
 * compact strip — full technical monitoring lives under Admin, not here.
 */
export function SystemStatusRow({ status }: SystemStatusRowProps) {
  const isOnline = status.connectivity === "online";

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-card">
      <h2 className="mb-4 text-section-title text-text-primary">System Status</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatusItem
          icon={isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
          label="Internet"
          value={isOnline ? "Connected" : "Offline"}
          dotClass={isOnline ? "bg-success" : "bg-danger"}
        />
        <StatusItem icon={<Database size={16} />} label="Last Backup" value={status.lastBackup} />
        <StatusItem icon={<RefreshCw size={16} />} label="Data Sync" value={status.lastSync} />
        <StatusItem
          icon={<Server size={16} />}
          label="POS Terminals"
          value={`${status.posTerminalsActive} Active`}
        />
      </div>
    </div>
  );
}

function StatusItem({
  icon,
  label,
  value,
  dotClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  dotClass?: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-text-secondary">{icon}</span>
      <div>
        <p className="text-caption text-text-secondary">{label}</p>
        <p className="flex items-center gap-1.5 text-caption font-medium text-text-primary">
          {dotClass && <span className={clsx("h-1.5 w-1.5 rounded-full", dotClass)} />}
          {value}
        </p>
      </div>
    </div>
  );
}
