import { useState } from "react";
import { Search, Star, X } from "lucide-react";

import CustomSelect from "../../../ui/custom/CustomSelect";

const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: "Bella Napoli",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    description:
      "Authentic wood-fired pizzas and handmade pasta crafted with traditional Neapolitan recipes.",
  },
  {
    id: 2,
    name: "Poke Haven",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    description:
      "Fresh, colorful poke bowls featuring premium sashimi-grade seafood and seasonal organic toppings.",
  },
  {
    id: 3,
    name: "Burger Theory",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
    rating: 4.6,
    description:
      "Gourmet smashed burgers using dry-aged beef, melted cheddar, and our secret signature sauce.",
  },
  {
    id: 4,
    name: "Green Garden",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    description:
      "Nutrition-focused vegan bowls and vibrant salads designed to fuel your body and mind.",
  },
  {
    id: 5,
    name: "Taco Republic",
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800&auto=format&fit=crop",
    rating: 4.5,
    description:
      "Street-style Mexican tacos served on warm corn tortillas with zesty lime and handmade salsa.",
  },
  {
    id: 6,
    name: "Zen Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    description:
      "A premium Japanese dining experience featuring masterfully rolled sushi and delicate sashimi platters.",
  },
];

const AllRestaurants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("All");

  const sortOptions = [
    { id: "All", label: "Sort by: All" },
    { id: "Rating", label: "Sort by: Rating" },
    { id: "Open", label: "Sort by: Open Now" },
    { id: "Popular", label: "Sort by: Popular" },
  ];

  return (
    <main className="pt-28 pb-20 max-w-7xl mx-auto px-6 w-full font-body min-h-screen">
      {/* HERO & FILTERS */}
      <section className="bg-surface-container-low rounded-2xl p-6 md:p-8 mb-12 border border-outline-variant/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tighter mb-4 text-on-background">
              Explore All Restaurants
            </h1>
            <p className="text-on-surface-variant max-w-lg leading-relaxed font-medium">
              Discover the finest culinary delights in your city, with delivery
              handled directly by our driver network.
            </p>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="w-full relative flex items-center max-w-2xl group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places..."
                className="w-full bg-surface-container-lowest border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary text-sm outline-none transition-all shadow-sm"
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
            <CustomSelect
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>
      </section>

      {/* RESTAURANT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {MOCK_RESTAURANTS.map((restaurant) => (
          <div
            key={restaurant.id}
            className="group bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-outline-variant/10 cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Details */}
            <div className="p-5 flex flex-col grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline text-xl font-extrabold text-on-background truncate pr-2">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-1 bg-surface-container-low py-1 px-2 rounded-lg shrink-0">
                  <Star className="w-3.5 h-3.5 text-tertiary-fixed fill-current" />
                  <span className="text-sm font-bold text-on-background">
                    {restaurant.rating}
                  </span>
                </div>
              </div>
              <p className="text-on-surface-variant text-sm font-medium mb-4">
                {restaurant.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AllRestaurants;
