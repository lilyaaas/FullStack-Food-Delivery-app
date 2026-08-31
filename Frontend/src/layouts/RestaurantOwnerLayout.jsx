import { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ConciergeBell,
  TrendingUp,
  Users,
  ClipboardList,
  BarChart3,
  Package,
  UserCog,
  Megaphone,
  Menu,
  X,
  Settings as SettingsIcon,
} from "lucide-react";

import { DesktopOnlyGuard } from "../components/index";
import { useAuth } from "../context/AuthContext";

const RestaurantOwnerLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  const { user } = useAuth();

  // Sidebar Links
  const sideNavLinks = [
    {
      to: "/restaurant-owner/dashboard",
      icon: LayoutDashboard,
      label: "Overview",
    },
    {
      to: "/restaurant-owner/orders",
      icon: ConciergeBell,
      label: "Live Orders",
    },
    {
      to: "/restaurant-owner/menu",
      icon: TrendingUp,
      label: "Menu Performance",
    },
    {
      to: "/restaurant-owner/customer-insights",
      icon: Users,
      label: "Customer Insights",
    },
    {
      to: "/restaurant-owner/reports",
      icon: ClipboardList,
      label: "Reports",
    },
    {
      to: "/restaurant-owner/analytics",
      icon: BarChart3,
      label: "Analytics",
    },
    {
      to: "/restaurant-owner/inventory",
      icon: Package,
      label: "Inventory",
    },
    {
      to: "/restaurant-owner/staff",
      icon: UserCog,
      label: "Staff",
    },
    {
      to: "/restaurant-owner/marketing",
      icon: Megaphone,
      label: "Marketing",
    },
  ];

  return (
    <DesktopOnlyGuard>
      <div className="bg-surface text-on-surface font-body antialiased min-h-screen">
        {/* SIDEBAR NAVIGATION (Collapsible)*/}
        <nav
          className={`bg-surface-container-lowest dark:bg-surface-container h-screen fixed left-0 top-0 flex flex-col shadow-[20px_0_40px_rgba(75,36,9,0.04)] z-50 transition-all duration-300 ease-in-out ${
            isExpanded ? "lg:w-65 2xl:w-75" : "w-12"
          }`}
        >
          {/* Hamburger/Close Toggle */}
          <div className="mt-8 mb-22 flex">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`ml-2 relative p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-all duration-300 ease-in-out shrink-0 cursor-pointer flex items-center justify-center w-8 h-8 ${
                isExpanded ? "lg:translate-x-52 2xl:translate-x-63" : "translate-x-0"
              }`}
              title={isExpanded ? "Collapse menu" : "Expand menu"}
            >
              {/* Menu Icon */}
              <Menu
                className={`absolute w-5 h-5 transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />

              {/* X Icon */}
              <X
                className={`absolute w-5 h-5 transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </button>
          </div>

          {/* Links of Side Bar */}
          <ul className="space-y-2 flex-1 overflow-x-hidden">
            {sideNavLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    title={isExpanded ? "" : link.label}
                    className={`mb-4 mx-2 p-1.5 flex items-center font-body font-bold rounded-xl transition-colors duration-100 cursor-pointer ${
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <link.icon className="w-5 h-5 shrink-0" />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded
                          ? "w-40 opacity-100 ml-4 translate-x-0"
                          : "w-0 opacity-0 ml-0 -translate-x-4"
                      }`}
                    >
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          {/* BOTTOM PROFILE WIDGET */}
          <div
            className={`relative mt-auto mx-2 mb-3 transition-all duration-500 ease-in-out ${
              isExpanded ? "h-12" : "h-20"
            }`}
          >
            {/* Avatar & Text Group */}
            <div
              className={`absolute flex items-center overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "top-2" : "top-10"
              }`}
            >
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=ff793e&color=fff`
                }
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shadow-sm shrink-0 cursor-pointer hover:scale-105 transition-transform"
              />

              <div
                className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "w-40 opacity-100 ml-2" : "w-0 opacity-0 ml-0"
                }`}
              >
                <span className="font-headline font-bold text-sm text-on-surface truncate leading-tight">
                  {user.name}
                </span>
                <span className="font-body text-[10px] font-bold text-on-surface-variant truncate uppercase tracking-wider">
                  {user?.role ? user.role.replace("_", " ") : "Manager"}
                </span>
              </div>
            </div>

            {/* Settings Icon */}
            <button
              title="Settings"
              className={`absolute text-on-surface-variant hover:text-primary transition-all duration-500 ease-in-out shrink-0 cursor-pointer ${
                isExpanded ? "left-[calc(100%-32px)] top-3.5" : "left-1.5 top-1"
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </nav>

        {/* MAIN CONTENT */}
        <main
          className={`pt-8 pr-5 mx-auto w-full min-h-screen transition-all duration-300 ${
            isExpanded ? "lg:pl-75 2xl:pl-83" : "pl-20"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </DesktopOnlyGuard>
  );
};

export default RestaurantOwnerLayout;
