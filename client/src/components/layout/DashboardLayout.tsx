import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};
