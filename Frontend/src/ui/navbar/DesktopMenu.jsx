import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Settings, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { getImageUrl } from "../../utils/ImageConfig";
import { useLogout } from "../../hooks/auth/useLogout";

const DesktopMenu = ({ user, totalQuantity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useLogout();

  // Ref for the dropdown to handle closing when clicking outside
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/explore", label: "Explore" },
    { to: "/restaurants", label: "Restaurants" },
    { to: "/orders", label: "My Orders" },
  ];

  return (
    <>
      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `font-headline font-bold text-sm tracking-tight transition-all duration-300 pb-1 ${
                isActive
                  ? "text-primary border-b-2 border-primary"
                  : "text-on-surface-variant hover:text-primary hover:scale-105"
              } ${!user && link.to === "/orders" && "hidden"}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Auth & Actions */}
      <div
        className="relative hidden md:flex items-center gap-4"
        ref={dropdownRef}
      >
        <Link
          to="/cart"
          className="relative p-2 text-on-surface hover:text-primary transition-colors cursor-pointer"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-primary-container text-on-primary-container text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
              {totalQuantity}
            </span>
          )}
        </Link>

        {user ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 p-1 rounded-full cursor-pointer hover:ring-2 ring-primary/20 transition-all"
            title="User menu"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0">
              {user.avatar ? (
                <img
                  src={getImageUrl(user.avatar)}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name || "User"}&background=ff793e&color=fff&rounded=true&bold=true`}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full font-bold text-sm text-primary hover:bg-surface-container-low transition-colors duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full bg-linear-to-br from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300"
            >
              Sign Up
            </Link>
          </>
        )}

        {/* User Dropdown */}
        {user && isOpen && (
          <div className="absolute top-12 right-0 mt-2 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/20 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3">
              <p className="text-sm font-headline font-bold text-on-background truncate">
                {user.name}
              </p>
              <p className="text-xs font-body font-medium text-on-surface-variant truncate">
                {user.email}
              </p>
            </div>

            <hr className="my-1 border-outline-variant/20" />

            {/* Links Section */}
            <div className="px-2 py-1">
              <Link
                onClick={() => setIsOpen(false)}
                to="/settings"
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </div>

            <hr className="my-1 border-outline-variant/20" />

            {/* Logout Section */}
            <div className="px-2 py-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-on-surface hover:bg-surface-container-low hover:text-primary rounded-xl transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
