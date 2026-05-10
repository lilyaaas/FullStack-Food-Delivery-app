import { useState, useEffect } from "react";
import {
  CalendarDays,
  LogOut,
  Edit2,
  User,
  CreditCard,
  MapPin,
  Bell,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useLogout } from "../hooks/auth/useLogout";
import { getImageUrl } from "../utils/ImageConfig";
import { formatDate } from "../utils/helpers";
import { Modal } from "../components/index";
import { useSettings } from "../hooks/useSettings";

// Reusable Sidebar Button Component
const SidebarButton = ({ id, icon: Icon, label, activeTab, onTabClick }) => (
  <button
    onClick={() => onTabClick(id)}
    className={`flex items-center justify-between md:px-4 py-4 rounded-full font-medium transition-all duration-300 text-left w-full cursor-pointer text-on-surface-variant ${
      activeTab === id
        ? "md:bg-primary-container md:text-on-primary-container font-bold"
        : "hover:bg-surface-container-low"
    }`}
  >
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5" />}
      {label}
    </div>
    <ChevronRight className="w-5 h-5 md:hidden" />
  </button>
);

// Main Settings Layout
const SettingsLayout = ({ children, activeTab, setActiveTab }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  const { user } = useAuth();
  const { logout } = useLogout();
  const { getProfile } = useSettings();

  // Define the sidebar buttons with their respective icons and labels
  const sidebarButtons = [
    { id: "personal", icon: User, label: "Personal Information" },
    { id: "payment", icon: CreditCard, label: "Payment Methods" },
    { id: "addresses", icon: MapPin, label: "Saved Addresses" },
    { id: "notifications", icon: Bell, label: "Notifications" },
    { id: "security", icon: ShieldCheck, label: "Security" },
  ];

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setShowMobileMenu(false);
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-background lg:px-8 2xl:px-24 font-body">
      <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full border-4 border-surface-container-lowest overflow-hidden shadow-xl bg-surface-container-high flex items-center justify-center">
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
            <button className="absolute bottom-1 right-1 bg-primary p-2.5 rounded-full text-on-primary shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Edit2 className="w-4 h-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="text-center md:text-left">
            <h1 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-2">
              {user.name}
            </h1>
            <p className="text-on-surface-variant font-medium flex items-center justify-center md:justify-start gap-2">
              <CalendarDays className="w-4 h-4 text-primary" />
              Joined {formatDate(user.created_at, "month_and_year")}
            </p>
          </div>
        </div>

        {/* Quick Stats Bento-lite */}
        <div
          className={`${showMobileMenu ? "block" : "hidden"} grid grid-cols-2 md:flex gap-4 w-full md:w-auto`}
        >
          <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center md:items-start min-w-35 shadow-sm border border-outline-variant/10">
            <span className="text-primary font-headline text-3xl font-black">
              {user.total_orders || 0}
            </span>
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mt-1">
              Total Orders
            </span>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center md:items-start min-w-35 shadow-sm border border-outline-variant/10 border-l-4 border-l-primary">
            <span className="text-primary font-headline text-3xl font-black">
              {user.reward_points || 0}
            </span>
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mt-1">
              Reward Points
            </span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="grid md:grid-cols-12 md:gap-10 items-start">
        <aside
          className={`${showMobileMenu ? "block" : "hidden"} md:block md:col-span-4 xl:col-span-3 space-y-2`}
        >
          {/* Sidebar Navigation */}
          <nav className="flex flex-col gap-2">
            {sidebarButtons.map((buttonData) => (
              <SidebarButton
                key={buttonData.id}
                id={buttonData.id}
                icon={buttonData.icon}
                label={buttonData.label}
                activeTab={activeTab}
                onTabClick={handleTabClick}
              />
            ))}

            <div className="pt-4 mt-2 border-t border-outline-variant/15">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-4 md:px-4 py-4 rounded-full text-red-600 font-medium hover:bg-red-100 transition-all duration-300 text-left w-full cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main
          className={`${!showMobileMenu ? "block" : "hidden"} md:block md:col-span-8 xl:col-span-9`}
        >
          <button
            onClick={() => setShowMobileMenu(true)}
            className="md:hidden flex items-center gap-2 mb-6 text-primary font-bold transition-transform active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" /> Back
          </button>
          {children}
        </main>
      </div>

      {/* The Warning Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Logout"
        message="Are you sure you want to sign out?"
        confirmText="Sign Out"
        onConfirm={() => {
          logout();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default SettingsLayout;
