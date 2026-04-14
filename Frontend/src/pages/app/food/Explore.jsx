import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import {
  Search,
  Star,
  Plus,
  ArrowRight,
  Utensils,
  Leaf,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { addToCart } from "../../../redux/slices/cartSlice";
import CustomFilter from "../../../ui/custom/CustomFilter";

const MOCK_FOODS = [
  {
    id: 1,
    name: "The Burger Loft",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    time: "25 min",
    tags: "American • Fast Food",
    priceLevel: "$$",
    featuredItem: {
      id: 101,
      name: "Loft Classic Burger",
      price: 15.0,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    id: 2,
    name: "Mamma Mia Pizzeria",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    time: "35 min",
    tags: "Italian • Gourmet • Pizza",
    priceLevel: "$$",
    featuredItem: {
      id: 102,
      name: "Margherita Pizza",
      price: 20.0,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    id: 3,
    name: "Sakura Zen",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    time: "40 min",
    tags: "Japanese • Sushi",
    priceLevel: "$$$",
    featuredItem: {
      id: 103,
      name: "Premium Sushi Platter",
      price: 35.0,
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    id: 4,
    name: "The Green Garden",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    time: "20 min",
    tags: "Healthy • Vegan • Organic",
    priceLevel: "$",
    featuredItem: {
      id: 104,
      name: "Avocado Quinoa Bowl",
      price: 12.0,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    },
  },
  {
    id: 5,
    name: "The Burger Loft",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    time: "25 min",
    tags: "American • Fast Food",
    priceLevel: "$$",
    featuredItem: {
      id: 105,
      name: "Loft Classic Burger",
      price: 15.0,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    },
  },
];

const Explore = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filterOptions = [
    { id: "Promo", label: "Has Offers" },
    { id: "Healthy", label: "Healthy" },
    { id: "Vegetarian", label: "Vegetarian" },
    { id: "Fast", label: "Under 30 mins" },
  ];


  // Handles
  const handleCuisineToggle = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter((item) => item !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleQuickAdd = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart! 🍔`);
  };

  return (
    <main className="grow pt-28 pb-20 max-w-7xl mx-auto px-6 w-full font-body min-h-screen">
      {/* HEADER & SEARCH */}
      <header className="md:bg-surface-container-low rounded-2xl p-6 md:p-8 md:mb-12 mb-5 md:border border-outline-variant/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="hidden md:block text-4xl md:text-5xl font-extrabold tracking-tight text-on-background mb-4 font-headline">
              Explore the Best Bites Near You
            </h1>
            <p className="hidden md:block text-on-surface-variant text-lg max-w-2xl mb-4">
              Curated flavors from top-rated kitchens, delivered with the kinetic energy of a gourmet pulse.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="w-full relative flex items-center max-w-2xl group">
              <Search className="absolute left-4 text-on-surface-variant w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest md:border-none border border-amber-800 focus:border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary text-sm outline-none transition-all shadow-sm"
                placeholder="Search"
              />
              {searchQuery.length !== 0 && (
                <button
                  onClick={() =>setSearchQuery("")}
                  className="absolute right-2 bg-primary text-on-primary px-1 py-1 rounded-full font-headline font-bold text-sm tracking-wide hover:shadow-md transition-all active:scale-95 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Custom Sort Dropdown */}
            <CustomFilter 
              label="Filters"
              options={filterOptions}
              selectedValues={activeFilters}
              onChange={setActiveFilters}
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col-reverse lg:flex-row gap-12">
        {/* LEFT SIDE: RESTAURANT GRID */}
        <section className="grow">
          <div className="md:flex md:justify-between md:items-end md:mb-8 mb-4">
            <div>
              <h2 className="font-headline font-bold text-3xl text-on-background tracking-tight mb-2">
                Top Rated Foods
              </h2>
              <p className="text-on-surface-variant font-medium">
                Handpicked flavors delivered to your doorstep.
              </p>
            </div>
            <Link
              to="#"
              className="flex text-primary font-headline font-bold items-center gap-1 hover:gap-2 cursor-pointer transition-all w-full md:w-auto mt-4 justify-end"
            >
              View all{" "}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_FOODS.map((restaurant) => (
              <div
                key={restaurant.id}
                className="group relative flex flex-col bg-surface-container-lowest rounded-2xl p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-outline-variant/10"
              >
                {/* Image & Badges */}
                <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mb-6">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                    PROMO
                  </span>
                  <div className="absolute bottom-4 right-4 bg-surface-container-lowest/95 backdrop-blur px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Star className="w-4 h-4 text-tertiary-fixed fill-current" />
                    <span className="font-bold text-sm text-on-background">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="px-2 pb-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline font-extrabold text-xl text-on-background">
                      {restaurant.name}
                    </h3>
                    <span className="text-on-surface-variant font-bold text-sm bg-surface-container-low px-2 py-1 rounded-md">
                      {restaurant.time}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium mb-4">
                    {restaurant.tags}
                  </p>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                    <span className="font-headline font-bold text-primary">
                      ${restaurant.featuredItem.price.toFixed(2)}
                    </span>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleQuickAdd(restaurant.featuredItem)}
                      className="bg-surface-container-high text-primary p-2.5 rounded-full hover:bg-primary hover:text-on-primary transition-colors active:scale-90 cursor-pointer"
                      title="Quick Add Featured Item"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT SIDE: FILTERS SIDEBAR */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="sticky top-28 space-y-8 bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
            {/* Categories */}
            <section>
              <h3 className="font-bold text-on-background mb-4 flex items-center gap-2 font-headline">
                <Utensils className="text-primary w-5 h-5" />
                Categories
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  "All",
                  "Burgers",
                  "Pizza",
                  "Asian",
                  "Healthy",
                  "Desserts",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left px-4 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                      activeCategory === category
                        ? "bg-primary text-on-primary shadow-md"
                        : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-outline-variant/20" />

            {/* Cuisines */}
            <section>
              <h3 className="flex items-center gap-2 mb-4 font-bold text-on-background font-headline">
                <Utensils className="w-5 h-5 text-primary" />
                Cuisines
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  "Italian Gourmet",
                  "Japanese Zen",
                  "Modern Mexican",
                  "French Bistro",
                ].map((cuisine) => (
                  <label
                    key={cuisine}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCuisines.includes(cuisine)}
                      onChange={() => handleCuisineToggle(cuisine)}
                      className="w-5 h-5 appearance-none rounded-full border-2 border-outline-variant checked:bg-primary checked:border-primary focus:ring-offset-2 focus:ring-primary transition-all bg-surface-container-low text-primary accent-primary cursor-pointer"
                    />
                    <span 
                      className={`ml-3 transition-colors font-medium text-sm ${
                        selectedCuisines.includes(cuisine) 
                          ? "text-primary font-bold" 
                          : "text-on-surface-variant group-hover:text-primary"
                      }`}
                    >
                      {cuisine}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            <hr className="border-outline-variant/20" />

            {/* Dietary */}
            <section>
              <h3 className="font-bold text-on-background mb-4 flex items-center gap-2 font-headline">
                <Leaf className="text-primary w-5 h-5" />
                Dietary
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="cursor-pointer px-4 py-2 rounded-full bg-primary-container text-on-primary-container text-xs font-semibold">
                  Vegan
                </button>
                <button className="cursor-pointer px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold hover:bg-surface-container-highest transition-colors">
                  Gluten-Free
                </button>
                <button className="cursor-pointer px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-semibold hover:bg-surface-container-highest transition-colors">
                  Keto
                </button>
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Explore;
