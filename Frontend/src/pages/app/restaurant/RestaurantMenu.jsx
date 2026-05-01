import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Plus, Info } from "lucide-react";

import { restaurantService } from "../../../services/restaurantService";
import { getImageUrl } from "../../../utils/ImageConfig";
import LoadingSpinner from "../../../ui/loading/LoadingSpinner";
import { addToCart } from "../../../redux/slices/cartSlice";

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // states
  const [restaurant, setRestaurant] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await restaurantService.getRestaurantById(id);
        setRestaurant(data);
        if (data?.categories?.length > 0) {
          setActiveCategory(data.categories[0].name);
        }
      } catch {
        console.log("Error in restaurant details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const scrollToCategory = (categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(`category-${categoryName}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleQuickAdd = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart! 🍔`);
  };

  if (isLoading) return <LoadingSpinner LoadingText="Preparing the menu..." />;

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface text-on-surface">
        <Info className="w-16 h-16 text-outline mb-4" />
        <h2 className="text-2xl font-headline font-bold">
          Restaurant not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-primary font-bold underline cursor-pointer"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <main className="bg-surface font-body text-on-surface min-h-screen pb-24 md:pb-12 pt-20">
      {/* Hero Section */}
      <header className="relative h-112.5 overflow-hidden md:mx-6 md:mt-4 md:rounded-3xl shadow-xl border border-outline-variant/5">
        {/* Floating Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-30 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all text-white cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10"></div>
        <img
          alt={restaurant.name}
          className="w-full h-full object-cover"
          src={getImageUrl(restaurant.image)}
        />

        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 shadow-sm">
                {restaurant.name}
              </h1>
              <p className="font-body text-white/90 text-base md:text-lg max-w-xl mb-6 line-clamp-2">
                {restaurant.description}
              </p>

              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                  <Star className="w-4 h-4 text-tertiary-fixed fill-current" />
                  <span className="text-white font-bold">
                    {restaurant.rating || 4}
                  </span>
                  <span className="text-white/70 text-sm hidden sm:inline">
                    ({restaurant.reviews || 1} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
                  <MapPin className="w-4 h-4 text-white" />
                  <span className="text-white font-bold truncate max-w-37.5 sm:max-w-xs">
                    {restaurant.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto px-6 py-12 2xl:px-24 w-full">
        <div className="w-full">
          {/* Sticky Menu Navigation */}
          {restaurant.categories?.length > 0 && (
            <div className="sticky top-18.75 z-40 bg-surface/95 backdrop-blur-md py-4 -mx-6 px-6 md:mx-0 md:px-0">
              <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
                {restaurant.categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.name)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold transition-all duration-300 cursor-pointer ${
                      activeCategory === category.name
                        ? "bg-primary text-on-primary shadow-md shadow-primary/20"
                        : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Menu Lists */}
          {restaurant.categories && restaurant.categories.length > 0 ? (
            <div>
              {restaurant.categories.map((category) => (
                <section
                  key={category.id}
                  id={`category-${category.name}`}
                  className="scroll-mt-32"
                >
                  <h2 className="font-headline text-3xl font-extrabold mt-15 mb-6 flex items-center gap-3 text-on-background">
                    <span className="w-1.5 h-8 bg-primary rounded-full"></span>
                    {category.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {category.products &&
                      category.products.map((product) => (
                        <Link
                          to={`/food/${product.id}`}
                          key={product.id}
                          className="group relative flex flex-col bg-surface-container-low rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-outline-variant/5"
                        >
                          {/* Image & Badges */}
                          <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-6">
                            <img
                              src={getImageUrl(product.image)}
                              alt={product.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                              PROMO
                            </span>
                            <div className="absolute bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                              <Star className="w-4 h-4 text-tertiary-fixed fill-current" />
                              <span className="font-bold text-sm text-on-background">
                                {product.rating || 4}
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="px-2 pb-2">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-headline font-extrabold text-xl text-on-background">
                                {product.name}
                              </h3>
                              <span className="text-on-surface-variant font-bold text-sm bg-surface-container-low px-2 py-1 rounded-md">
                                {product.time}
                              </span>
                            </div>
                            <p className="text-on-surface-variant text-sm font-medium mb-4">
                              {product.description}
                            </p>

                            {/* Action Bar */}
                            <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                              <span className="font-headline font-bold text-primary">
                                ${product.price}
                              </span>

                              {/* Add to Cart Button */}
                              <button
                                onClick={() => handleQuickAdd(product)}
                                className="bg-surface-container-high text-primary p-2.5 rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-90 cursor-pointer"
                                title="Quick Add Featured Item"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-surface-container-low rounded-3xl border border-outline-variant/10">
              <Info className="w-12 h-12 text-outline mx-auto mb-4" />
              <h3 className="text-xl font-headline font-bold text-on-background mb-2">
                No menu items yet
              </h3>
              <p className="text-on-surface-variant">
                The chef is still preparing the menu for this restaurant.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default RestaurantMenu;
