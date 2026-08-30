import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
} from "lucide-react";

import { DesktopOnlyGuard } from "../components/index";

const RestaurantOwnerLayout = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

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
            isExpanded ? "w-74" : "w-12"
          }`}
        >
          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-8 mb-22 ml-2 w-min p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors shrink-0 cursor-pointer"
            title={isExpanded ? "Expand menu" : "Collapse menu"}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Links of Side Bar */}
          <ul className="space-y-2 flex-1 overflow-x-hidden">
            {sideNavLinks.map((link) => {
              const isActive = location.pathname === link.to;

              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    title={isExpanded ? "" : link.label}
                    className={`mb-4 mx-2 p-1.5 flex items-center font-body font-bold rounded-xl transition-all cursor-pointer ${
                      isActive
                        ? "bg-primary-container text-on-primary-container"
                        : "text-on-surface-variant hover:bg-surface-container-high transition-colors"
                    }`}
                  >
                    <link.icon className={`w-5 h-5 shrink-0`} />
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
                        isExpanded ? " opacity-100 ml-4" : "w-0 opacity-0 ml-0"
                      }`}
                    >
                      {link.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </DesktopOnlyGuard>
  );
};

export default RestaurantOwnerLayout;
