import { Search, User, Sun, Moon } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { useTheme } from "../context/ThemeContext"; // import your global theme

const NavigationBar = () => {
  const { theme, toggleTheme } = useTheme(); // get current theme and toggle function

  // Conditional classes for icons and buttons
  const iconButtonClasses =
    theme === "dark"
      ? "rounded-full h-9 w-9 text-gray-300 hover:bg-gray-700"
      : "rounded-full h-9 w-9 text-gray-600 hover:bg-gray-100";

  const searchInputClasses =
    theme === "dark"
      ? "pl-10 h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:ring-0"
      : "pl-10 h-10 w-full rounded-md border border-gray-300 bg-white text-gray-800 focus:ring-0";

  return (
    <header
      className={`sticky top-0 z-10 border-b w-full pb-3 ${
        theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-4 hidden sm:flex">
          <div className="relative w-full">
            <Search
              className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              type="text"
              placeholder="Search Koinsave"
              className={searchInputClasses}
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={iconButtonClasses}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Theme</span>
          </Button>

          {/* User Avatar */}
          <Button variant="ghost" size="icon" className={iconButtonClasses}>
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>

          {/* Optional Mobile Search */}
          <Button
            variant="ghost"
            size="icon"
            className={`${iconButtonClasses} sm:hidden`}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
