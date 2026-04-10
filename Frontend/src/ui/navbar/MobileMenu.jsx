import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const MobileMenu = ({
  user,
  isLoading,
  totalQuantity,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  closeMenu,
}) => {
  return (
    <>
      {/* Mobile Toggle & Cart */}
      <div className="md:hidden flex items-center gap-4">
        <Link
          to="/cart"
          onClick={closeMenu}
          className="relative p-2 text-on-surface"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalQuantity > 0 && (
            <span className="absolute top-0 right-0 bg-primary-container text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-on-surface hover:text-primary transition-colors focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div onClick={closeMenu} className="fixed inset-0 top-20 bg-black/60 backdrop-blur-3xl h-screen">
          <div className="md:hidden absolute right-0 w-3/4 h-screen bg-white shadow-xl border-t border-outline-variant/10 flex flex-col py-4 px-6 space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="font-headline font-bold text-lg text-on-surface hover:text-primary"
            >
              Home
            </Link>
            <Link
              to="/explore"
              onClick={closeMenu}
              className="font-headline font-bold text-lg text-on-surface hover:text-primary"
            >
              Explore
            </Link>
            <Link
              to="/offers"
              onClick={closeMenu}
              className="font-headline font-bold text-lg text-on-surface hover:text-primary"
            >
              Offers
            </Link>
            <Link
              to="/restaurants"
              onClick={closeMenu}
              className="font-headline font-bold text-lg text-on-surface hover:text-primary"
            >
              Restaurants
            </Link>

            <hr className="border-outline-variant/20" />

            {isLoading ? (
              <div className="w-full h-10 bg-surface-container-high animate-pulse rounded-full"></div>
            ) : user ? (
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 text-lg font-bold text-on-surface"
              >
                <User className="w-6 h-6 text-primary" /> My Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full text-center py-3 rounded-full bg-linear-to-br from-primary to-primary-container text-on-primary font-bold shadow-md shadow-primary/20"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
