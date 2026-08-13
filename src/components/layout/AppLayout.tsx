import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";

// Every module page renders through this shell so the header truly
// never changes between screens (Section 44 of the design spec).
export function AppLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <AppHeader userName="Rohan Gosavi" userRole="Owner" notificationCount={9} />
      <Outlet />
    </div>
  );
}
