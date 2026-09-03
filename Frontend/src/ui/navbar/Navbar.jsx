import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { DesktopMenu, MobileMenu } from "../index"
import { useAuth } from "../../context/AuthContext";
import QuickFoodLogo from "../../components/QuickFoodLogo";

const Navbar = () => {
  // State and Hooks stay in the Parent
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { user, isLoading } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm font-body">
      <div className="flex justify-between items-center mx-auto px-6 2xl:px-70 h-20">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className="flex gap-2 lg:text-4xl text-2xl font-extrabold text-primary tracking-tighter hover:scale-103 transition-transform duration-300"
        >
          <QuickFoodLogo />
          QuickFood
        </Link>

        {/* Desktop UI */}
        <DesktopMenu
          user={user}
          isLoading={isLoading}
          totalQuantity={totalQuantity}
        />

        {/* Mobile UI */}
        <MobileMenu
          user={user}
          isLoading={isLoading}
          totalQuantity={totalQuantity}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          closeMenu={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
