import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Sun, Moon, Coins } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { useTheme } from "@components/context/ThemeContext"; // import ThemeContext

const NavigationLinks = [
  { to: "/", label: "Home" },
  { to: "/auth/login", label: "Login" },
  { to: "/auth/signup", label: "SignUp" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // use global theme

  const [toggleAnimation, setToggleAnimation] = useState(false);

  const handleToggleTheme = () => {
    setToggleAnimation(true);
    toggleTheme();
    setTimeout(() => setToggleAnimation(false), 300);
  };

  const NavLinkComponent = ({ to, label, onClick }) => (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `font-medium text-[16px] p-2 rounded-lg transition-colors ${
          isActive
            ? "text-green-600 text-shadow-2xl dark:bg-[#207681]/50 dark:text-white"
            : "text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:bg-[#207681]/30"
        }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Coins className="text-[#207681]" />
          <span className="text-2xl font-semibold text-[#207681]">Koinsave</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:space-x-8 items-center">
          {NavigationLinks.map((link) => (
            <NavLinkComponent key={link.label} {...link} />
          ))}
        </div>

        {/* Desktop Theme Toggle */}
        <div
          className={`hidden lg:flex items-center ml-4 cursor-pointer transform transition-transform duration-300 ${
            toggleAnimation ? "rotate-180 scale-110" : ""
          }`}
          onClick={handleToggleTheme}
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-800" />
          ) : (
            <Sun className="w-5 h-5 text-[#207681]" />
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden items-center space-x-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger aria-label="Open menu">
              <Menu className="h-6 w-6 text-gray-800 dark:text-gray-200 cursor-pointer" />
            </SheetTrigger>

            <SheetContent side="right" className="pt-10">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center justify-between mb-6 px-2">
                  <div className="flex items-center space-x-3">
                    <Coins />
                    <span className="text-2xl font-semibold text-[#207681] dark:text-[#207681]">
                      Koinsave
                    </span>
                  </div>
                  <div
                    className={`cursor-pointer transform transition-transform duration-300 ${
                      toggleAnimation ? "rotate-180 scale-110" : ""
                    }`}
                    onClick={handleToggleTheme}
                  >
                    {theme === "light" ? (
                      <Moon className="w-5 h-5 text-gray-800" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#207681]" />
                    )}
                  </div>
                </div>

                {NavigationLinks.map((link) => (
                  <NavLinkComponent
                    key={link.label}
                    {...link}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

export default Header;
