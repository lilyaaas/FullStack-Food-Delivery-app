import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Clock, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { productService } from "../../../services/productService";
import { getImageUrl } from "../../../utils/ImageConfig";
import { addToCart, clearCart } from "../../../redux/slices/cartSlice";
import LoadingSpinner from "../../../ui/loading/LoadingSpinner";
import Modal from "../../../components/Modal";

const FoodPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  // State
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSide, setSelectedSide] = useState("");
  const [addons, setAddons] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        setProduct(data);

        if (data.sides && data.sides.length > 0)
          setSelectedSide(data.sides[0].id);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <LoadingSpinner LoadingText="Plating your food..." />;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-on-surface font-body">
        <h2 className="text-2xl font-headline font-bold mb-4">
          Item not found
        </h2>
        <button
          onClick={() => navigate("/explore")}
          className="text-primary font-bold underline cursor-pointer"
        >
          Go back to menu
        </button>
      </div>
    );
  }

  // Calculate Total Price
  let basePrice = product.price;
  if (product.sides && selectedSide) {
    const activeSide = product.sides.find((s) => s.id === selectedSide);
    if (activeSide) basePrice += activeSide.price || 0;
  }
  if (product.addons) {
    product.addons.forEach((addon) => {
      if (addons[addon.id]) basePrice += addon.price || 0;
    });
  }

  const totalPrice = (basePrice * quantity).toFixed(2);
  const handleAddToCart = () => {
    if (
      cartItems.length > 0 &&
      cartItems[0].restaurant_id !== product.restaurant_id
    ) {
      setIsModalOpen(true);
      return;
    }

    proceedToCart();
  };

  const proceedToCart = () => {
    const sideObj = product.sides?.find((s) => s.id === selectedSide);

    const orderItem = {
      ...product,
      quantity,
      selectedSide,
      selectedSideName: sideObj ? sideObj.name : "",
      addons,
      selectedAddonNames:
        product.addons
          ?.filter((addon) => addons[addon.id])
          .map((addon) => addon.name) || [],
      finalPrice: parseFloat(totalPrice),
      specialInstructions: "",
    };

    // Add to Redux
    dispatch(addToCart(orderItem));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-background text-on-background font-body min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col">
      {/* Main Content */}
      <main className="grow pt-12 md:pt-20 pb-32">
        <div className="relative mx-auto px-6 py-12 2xl:px-24 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5 -mx-4 md:mx-0">
            {/* Hero Image */}
            <div className="aspect-4/3 md:aspect-square relative overflow-hidden rounded-xl md:rounded-3xl shadow-lg">
              <img
                src={getImageUrl(product.image)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent md:hidden pointer-events-none"></div>
            </div>

            {/*  */}
            <div className="absolute lg:static w-full bottom-0 left-0 p-6 lg:p-0 lg:mt-8 transition-all">
              <div className="max-w-3xl mx-auto flex flex-row items-center justify-between gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center bg-surface-container-low border border-outline-variant/30 rounded-full h-14 shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-l-full active:bg-surface-container-high cursor-pointer"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="font-body font-black text-on-surface w-8 text-center text-xl select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-full flex items-center justify-center text-on-surface hover:text-primary transition-colors rounded-r-full active:bg-surface-container-high cursor-pointer"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="grow bg-linear-to-br from-primary to-primary-container text-on-primary font-display font-bold text-lg h-14 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span className="hidden sm:inline">Add to Order</span>
                  <span className="sm:hidden">Add</span>
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
                  <span>${totalPrice}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Details & Customization */}
          <div className="lg:col-span-7 flex flex-col pt-6 lg:pt-12">
            {/* Title & Description */}
            <div className="mb-8">
              <div className="flex justify-between items-start gap-4 mb-4">
                <h1 className="text-4xl md:text-5xl font-display font-extrabold text-on-surface tracking-tight">
                  {product.name}
                </h1>
              </div>
              <p className="text-on-surface-variant font-body text-base md:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stats/Meta Badges */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-outline-variant/20 overflow-x-auto hide-scrollbar whitespace-nowrap">
              <div className="flex gap-4 md:gap-6">
                <div className="flex items-center gap-1.5 shrink-0">
                  <Star className="text-tertiary-fixed w-5 h-5 fill-current" />
                  <span className="font-body font-bold text-on-surface text-lg">
                    {product.rating || 4}
                  </span>
                  <span className="text-on-surface-variant text-sm">
                    ({product.reviews || 1})
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <Clock className="text-primary w-5 h-5" />
                  <span className="font-body font-medium text-on-surface">
                    {product.prepTime || "30-40 mins"}
                  </span>
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-2xl lg:text-3xl font-black text-primary shrink-0">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Customization Options */}
            <div className="flex flex-col gap-8 mb-20 lg:mb-12">
              {/* Choose Your Side */}
              {product.sides && product.sides.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display font-bold text-xl text-on-surface">
                      Choose Your Side
                    </h2>
                    <span className="bg-surface-container-low text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Required
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {product.sides.map((side) => (
                      <label
                        key={side.id}
                        className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer group shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="side"
                            checked={selectedSide === side.id}
                            onChange={() => setSelectedSide(side.id)}
                            className="w-5 h-5 text-primary border-outline-variant focus:ring-primary cursor-pointer"
                          />
                          <span className="font-body font-medium text-on-surface group-hover:text-primary transition-colors">
                            {side.name}
                          </span>
                        </div>
                        <span className="font-body text-on-surface-variant text-sm">
                          {side.price === 0
                            ? "+ $0.00"
                            : `+ $${side.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>
              )}

              {/* Add-ons */}
              {product.addons && product.addons.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display font-bold text-xl text-on-surface">
                      Make it Yours
                    </h2>
                    <span className="bg-surface-container-low text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Optional
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    {product.addons.map((addon) => (
                      <label
                        key={addon.id}
                        className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all cursor-pointer group shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={!!addons[addon.id]}
                            onChange={(e) =>
                              setAddons({
                                ...addons,
                                [addon.id]: e.target.checked,
                              })
                            }
                            className="w-5 h-5 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer"
                          />
                          <span className="font-body font-medium text-on-surface group-hover:text-primary transition-colors">
                            {addon.name}
                          </span>
                        </div>
                        <span className="font-body text-on-surface-variant text-sm">
                          + ${addon.price.toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Related Items */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mt-16 md:mt-24">
          <h2 className="font-display font-extrabold text-3xl text-on-surface mb-8">
            People also ordered (COMING SOON)
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
              <div className="aspect-square bg-surface-container-high relative">
                <img
                  src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400"
                  alt="Lemonade"
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-primary shadow-sm hover:scale-110 transition-transform cursor-pointer">
                  <Plus className="w-5 h-5 font-bold" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-display font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                  Artisan Lemonade
                </h3>
                <p className="font-body text-primary font-bold mt-1">$4.50</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Warning Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Start a new order?"
          message="Your cart contains items from a different restaurant. Adding this item will clear your current cart. Do you want to proceed?"
          confirmText="Clear Cart & Add"
          onConfirm={() => {
            dispatch(clearCart());
            setIsModalOpen(false);
            proceedToCart();
          }}
        />
      </main>
    </div>
  );
};

export default FoodPage;
