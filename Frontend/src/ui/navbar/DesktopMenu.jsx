import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const DesktopMenu = ({ user, isLoading, totalQuantity }) => {
  return (
    <>
      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className="font-headline font-bold text-sm tracking-tight text-primary border-b-2 border-primary pb-1"
        >
          Explore
        </Link>
        <Link
          to="/offers"
          className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary hover:scale-105 transition-transform duration-300"
        >
          Offers
        </Link>
        <Link
          to="/restaurants"
          className="font-headline font-bold text-sm tracking-tight text-on-surface-variant hover:text-primary hover:scale-105 transition-transform duration-300"
        >
          Restaurants
        </Link>
      </div>

      {/* Auth & Actions */}
      <div className="hidden md:flex items-center gap-4">
        {isLoading ? (
          <div className="w-24 h-10 bg-surface-container-high animate-pulse rounded-full"></div>
        ) : user ? (
          <>
            <Link
              to="/cart"
              className="relative p-2 text-on-surface hover:text-primary transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 bg-primary-container text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 p-1 rounded-full hover:bg-surface-container-low transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0">
                <img
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${user.name || "User"}&background=ff793e&color=fff&rounded=true&bold=true`
                  }
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-6 py-2.5 rounded-full font-bold text-sm text-primary hover:bg-surface-container-low transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-2.5 rounded-full bg-linear-to-br from-primary to-primary-container text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default DesktopMenu;
