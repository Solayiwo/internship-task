import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@components/ui/sidebar";
import { Separator } from "@components/ui/separator";
import { Button } from "@components/ui/button";
import {
  Home,
  Receipt,
  Settings,
  LogOut,
  Coins,
} from "lucide-react";

import { useTheme } from "@components/context/ThemeContext";   // <<— IMPORTANT
import LogoutModal from "../modals/LogoutModal.jsx";

const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/dashboard/transactions", label: "Transactions", icon: Receipt },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function AppSidebar({ children }) {
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const { theme } = useTheme();  // <<— GET CURRENT THEME

  const handleSignOut = () => {
    setShowLogoutModal(true);

    setTimeout(() => {
      localStorage.removeItem("koinsave_loggedInUser");
      navigate("/");
    }, 1500);
  };

  return (
    <SidebarProvider>
      {/* Sidebar Component */}
      <Sidebar
        collapsible="offcanvas"
        side="left"
        className={`
          border-r 
          ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
        `}
      >
        <SidebarHeader className="px-4 py-4">
          <div className="flex items-center space-x-3 pt-3">
            <Coins className="text-[#207681]" />
            <span className="text-2xl font-semibold text-[#207681]">
              Koinsave
            </span>
          </div>
        </SidebarHeader>

        <Separator className="mb-4" />

        <SidebarContent>
          <SidebarMenu className="px-2 space-y-1">
            {menuItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;

              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton
                    asChild
                    className={`
                      flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors

                      ${active
                        ? "bg-teal-700 text-white"
                        : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-800 hover:bg-gray-100"}
                    `}
                  >
                    <Link to={to}>
                      <Icon size={18} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="px-4 py-3">
          <Separator className="mb-3" />

          <Button
            variant="ghost"
            className={`
              flex items-center gap-2 cursor-pointer
              text-red-500 hover:text-red-600
            `}
            onClick={handleSignOut}
          >
            <LogOut size={18} />
            Log Out
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main
        className={`
          flex-1 min-h-screen
          ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}
        `}
      >
        <div className="absolute top-4 z-20">
          <SidebarTrigger />
        </div>

        {children}
      </main>

      <LogoutModal isOpen={showLogoutModal} />
    </SidebarProvider>
  );
}
