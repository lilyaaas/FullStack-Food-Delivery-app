import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { removeItem, incrementQuantity, decrementQuantity } from "../../../redux/slices/cartSlice";

const Cart = () => {
  // Redux state & dispatch
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Auth & Routing
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate(
      user ? "/checkout" : "/register",
      !user ? { state: { from: "/checkout" } } : {},
    );
  };

  // EMPTY STATE
  if (cartItems.length === 0) {
    return (
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[70vh] flex flex-col items-center justify-center font-body text-center">
        <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-background mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-on-surface-variant font-medium mb-8 max-w-md">
          Looks like you haven't added anything to your feast yet. Discover
          top-rated restaurants around you.
        </p>
        <Link
          to="/restaurants"
          className="bg-linear-to-br from-primary to-primary-container px-8 py-4 rounded-xl text-on-primary font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Explore Restaurants
        </Link>
      </main>
    );
  }

  // POPULATED CART
  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto font-body min-h-screen">
      <header className="mb-12">
        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-background mb-2">
          Your Feast Awaits
        </h1>
        <p className="text-on-surface-variant font-medium">
          Review your selection from our curated kinetic kitchen.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {cartItems.map((item) => {
            // Check if the item has customizations to display
            const hasCustomizations =
              item.selectedSide ||
              (item.addons && Object.keys(item.addons).length > 0) ||
              (item.specialInstructions &&
                item.specialInstructions !== "Quick Add");

            return (
              <div
                key={item.cartItemId}
                className="bg-surface-container-lowest rounded-xl p-4 sm:p-6 flex flex-row gap-4 sm:gap-6 items-center group transition-all duration-300 hover:shadow-[0_20px_40px_rgba(75,36,9,0.08)] border border-outline-variant/10"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 sm:w-40 sm:h-40 overflow-visible shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-500 -mt-4 sm:-mt-10 shadow-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="grow w-full">
                  <div className="flex justify-between items-start mb-1 sm:mb-2">
                    <h3 className="font-headline text-lg sm:text-xl font-bold text-on-background line-clamp-1 sm:line-clamp-none pr-2">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => dispatch(removeItem(item.cartItemId))}
                      className="text-on-surface-variant hover:text-red-500 transition-colors p-1 shrink-0 hover:cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {hasCustomizations && (
                    <div className="mb-4 text-sm bg-surface-container-low p-3 rounded-lg text-on-surface-variant border border-outline-variant/10 flex flex-col gap-1.5">
                      {/* Display the Side Name */}
                      {item.selectedSideName && (
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-on-background shrink-0">
                            Side:
                          </span>
                          <span className="capitalize">
                            {item.selectedSideName}
                          </span>
                        </div>
                      )}

                      {/* Display the Add-on Names */}
                      {item.selectedAddonNames &&
                        item.selectedAddonNames.length > 0 && (
                          <div className="flex items-start gap-2">
                            <span className="font-bold text-on-background shrink-0">
                              Add-ons:
                            </span>
                            <span className="capitalize">
                              {item.selectedAddonNames.join(", ")}
                            </span>
                          </div>
                        )}

                      {/* Display Special Instructions */}
                      {item.specialInstructions &&
                        item.specialInstructions !== "Quick Add" && (
                          <div className="flex items-start gap-2 mt-1 pt-1 border-t border-outline-variant/10 italic text-on-surface-variant/80">
                            <span className="font-bold not-italic text-on-background shrink-0">
                              Note:
                            </span>
                            "{item.specialInstructions}"
                          </div>
                        )}
                    </div>
                  )}

                  {/* Price & Controls */}
                  <div className="flex justify-between items-center mt-2 sm:mt-0">
                    <span className="font-headline text-lg sm:text-xl font-extrabold text-primary">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center bg-surface-container-low rounded-full px-1 sm:px-2 py-1 border border-outline-variant/20">
                      <button
                        onClick={() =>
                          dispatch(decrementQuantity(item.cartItemId))
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-error rounded-full transition-colors focus:outline-none hover:cursor-pointer"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <span className="px-2 sm:px-4 font-bold text-on-surface min-w-8 sm:min-w-10 text-center text-sm sm:text-base">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(incrementQuantity(item.cartItemId))
                        }
                        className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-primary rounded-full transition-colors focus:outline-none hover:cursor-pointer"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-4 sticky top-28">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_20px_40px_rgba(75,36,9,0.04)] border border-outline-variant/10">
            <h2 className="font-headline text-2xl font-bold text-on-background mb-8">
              Order Summary
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-on-surface-variant">
                <span className="font-medium">Subtotal</span>
                <span className="text-on-background font-semibold">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="pt-6 mb-8 bg-surface-container-low rounded-xl p-4 border border-outline-variant/20">
              <div className="flex justify-between items-center">
                <span className="text-on-background font-bold text-lg">
                  Grand Total
                </span>
                <span className="text-primary font-black text-3xl">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="hover:cursor-pointer w-full py-4 bg-linear-to-br from-primary to-primary-container rounded-xl text-on-primary font-headline font-bold text-lg shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant text-xs font-medium">
              <ShieldCheck className="w-4 h-4" />
              Secure transaction powered by QuickFood
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Cart;
