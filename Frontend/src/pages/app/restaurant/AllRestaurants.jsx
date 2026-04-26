import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, X, Loader2, MapPin, SearchX } from "lucide-react";

import CustomSelect from "../../../ui/custom/CustomSelect";
import { getImageUrl } from "../../../utils/ImageConfig";
import { restaurantService } from "../../../services/restaurantService";

const AllRestaurants = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("All");

  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortOptions = [
    { id: "All", label: "Sort by: All" },
    { id: "Rating", label: "Sort by: Rating" },
    { id: "MinOrder", label: "Sort by: Min Order" },
    { id: "Popular", label: "Sort by: Popular" },
  ];

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await restaurantService.getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const processedRestaurants = restaurants
    .filter((restaurant) => {
      const searchTarget =
        `${restaurant.name} ${restaurant.description}`.toLowerCase();
      return searchTarget.includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      if (sortBy === "Rating") return b.rating - a.rating;
      if (sortBy === "MinOrder") return a.min_order_price - b.min_order_price;
      // if (sortBy === "Popular") return b.popularity - a.popularity; --> COMING SOON
      return 0;
    });

  return (
    <main className="pt-28 pb-20 font-body min-h-screen mx-auto px-6 py-12 2xl:px-24 w-full">
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
            <div className="relative flex items-center w-full sm:w-64 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search places..."
                className="w-full bg-surface-container-lowest border-none rounded-full py-3 pl-12 pr-10 focus:ring-2 focus:ring-primary text-sm outline-none transition-all shadow-sm"
              />
              {searchQuery.length !== 0 && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 bg-primary text-on-primary px-1 py-1 rounded-full font-headline font-bold text-sm tracking-wide hover:shadow-md transition-all active:scale-95 cursor-pointer"
                >
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
      {isLoading ? (
        <div className="w-full flex flex-col items-center justify-center py-20 opacity-70">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-on-surface-variant font-bold font-headline animate-pulse">
            Loading amazing food...
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {processedRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              onClick={() => navigate(`/restaurant/${restaurant.id}`)}
              className="group bg-surface-container-lowest rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-outline-variant/10 cursor-pointer flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={getImageUrl(restaurant.image)}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col grow">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-headline text-xl font-extrabold text-on-background line-clamp-1">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-surface-container-low py-1 px-2 rounded-lg shrink-0">
                    <Star className="w-3.5 h-3.5 text-tertiary-fixed fill-current" />
                    <span className="text-sm font-bold text-on-background">
                      {restaurant.rating || 4}
                    </span>
                  </div>
                </div>

                <p className="text-on-surface-variant text-sm font-medium mb-4 line-clamp-2">
                  {restaurant.description}
                </p>

                <div className="mt-auto pt-4 border-t border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-on-surface-variant font-bold text-sm truncate max-w-[60%]">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md shrink-0">
                    Min ${restaurant.min_order_price}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {processedRestaurants.length === 0 && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mb-6 shadow-inner">
                <SearchX className="w-12 h-12 text-outline" />
              </div>
              <h3 className="text-2xl font-headline font-extrabold text-on-background mb-2">
                No restaurants found
              </h3>
              <p className="text-on-surface-variant font-medium max-w-sm">
                We couldn't find any places matching "{searchQuery}". Try
                adjusting your search or clearing your filters.
              </p>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default AllRestaurants;
