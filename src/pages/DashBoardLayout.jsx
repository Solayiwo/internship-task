import { Outlet } from "react-router-dom";
import NavigationBar from "@components/dashboard/NavigationBar.jsx";
import AppSidebar from "@components/dashboard/AppSideBar.jsx";
import { ThemeProvider, useTheme } from "@components/context/ThemeContext";

function InnerDashboardLayout() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex-1 flex flex-col overflow-hidden 
        ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"}`}
    >
      <NavigationBar />

      <main className="flex-1 overflow-y-auto m-4 rounded-lg p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <AppSidebar>
          <InnerDashboardLayout />
        </AppSidebar>
      </div>
    </ThemeProvider>
  );
}
