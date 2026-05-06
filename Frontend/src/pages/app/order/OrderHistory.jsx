import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListOrdered,
  Receipt,
  Search,
  X,
  MapPin,
  RotateCcw,
  Star,
  Loader2,
} from "lucide-react";

import { orderService } from "../../../services/orderService";
import { getImageUrl } from "../../../utils/ImageConfig";
import { formatDate, getStatusBadge } from "../../../utils/helpers";
import CustomFilter from "../../../ui/custom/CustomFilter";
import LoadingSpinner from "../../../ui/loading/LoadingSpinner";

const OrderHistory = () => {
  const navigate = useNavigate();

  // State variables
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);

  const filterOptions = [
    { id: "Progress", label: "In Progress" },
    { id: "Delivered", label: "Delivered" },
    { id: "Cancelled", label: "Cancelled" },
  ];

  // Map frontend filter IDs to backend status values
  const mapFiltersToStatus = useCallback((filters) => {
    const statusMap = {
      Progress: "pending,accepted,preparing,on_way",
      Delivered: "delivered",
      Cancelled: "cancelled",
    };

    const statuses = filters.map((f) => statusMap[f]).filter(Boolean);
    return statuses.join(",");
  }, []);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    const hasSearchOrFilter = searchQuery.trim() || activeFilters.length > 0;

    if (hasSearchOrFilter) setIsSearching(true);

    try {
      let response;

      if (hasSearchOrFilter) {
        const statusParam = mapFiltersToStatus(activeFilters);
        response = await orderService.searchOrders(
          searchQuery.trim(),
          statusParam,
        );
      } else {
        response = await orderService.getMyOrders();
      }

      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, [searchQuery, activeFilters, mapFiltersToStatus]);

  // Initial load
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoading) fetchOrders();
    }, 400);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Re-fetch when filters change
  useEffect(() => {
    if (!isLoading) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);

  if (isLoading)
    return <LoadingSpinner LoadingText="Loading your feast history..." />;

  return (
    <main className="pt-24 pb-20 px-4 min-h-screen bg-background lg:px-8 2xl:px-24 font-body">
      {/* Header Section */}
      <header className="mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-background mb-10">
          Order History
        </h1>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="w-full relative flex items-center max-w-2xl group">
            <Search className="absolute left-4 text-on-surface-variant w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-container-lowest md:border-none border border-amber-800 focus:border-none rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary text-sm outline-none transition-all shadow-sm"
              placeholder="Search by restaurant, reference, or item..."
            />
            {isSearching ? (
              <Loader2 className="absolute right-2 w-6 h-6 text-primary-container animate-spin" />
            ) : (
              <>
                {searchQuery.length !== 0 && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2 bg-primary text-on-primary px-1 py-1 rounded-full font-headline font-bold text-sm tracking-wide hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </>
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
      </header>

      {/* Orders List */}
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-headline font-extrabold tracking-tight text-on-background mb-4">
          Order List ({orders?.length})
        </h1>

        {/* Order Items */}
        {orders.length > 0 ? (
          orders.map((order) => {
            const isActive = [
              "pending",
              "accepted",
              "preparing",
              "on_way",
            ].includes(order.status);
            const isCancelled = order.status === "cancelled";

            return (
              <div
                key={order.id}
                className={`group bg-surface-container-lowest rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-start transition-all duration-300 border md:border-outline-variant/15 relative overflow-hidden border-primary/30 ${isCancelled ? "opacity-75 cursor-not-allowed select-none" : "hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30"}`}
              >
                {/* Image */}
                <div
                  className={`w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-surface-container-high ${isCancelled ? "grayscale" : ""}`}
                >
                  <img
                    src={getImageUrl(order.restaurant.image)}
                    alt={order.restaurant?.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Order Details */}
                <div className="grow w-full">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                    <div>
                      <h3 className="text-2xl font-headline font-bold text-on-background">
                        {order.restaurant?.name}
                      </h3>
                      <p className="text-sm text-on-surface-variant font-medium mt-1">
                        {formatDate(order.created_at)} • {order.reference}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  {/* Items Preview */}
                  <p className="text-on-surface-variant mb-6 font-medium line-clamp-1">
                    {order.items
                      ?.map((item) => `${item.quantity}x ${item.product?.name}`)
                      .join(", ")}
                  </p>

                  {/* Footer Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-outline-variant/15">
                    <span
                      className={`text-2xl font-headline font-extrabold ${isCancelled ? "text-outline" : "text-primary"}`}
                    >
                      ${order.total_amount.toFixed(2)}
                    </span>

                    <div className="flex flex-wrap gap-3">
                      {isActive ? (
                        <button
                          onClick={() => navigate(`/order-success/${order.id}`)}
                          className="px-6 py-2.5 rounded-full text-primary bg-primary/10 font-bold text-sm hover:bg-primary/20 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <MapPin className="w-4 h-4" />
                          Track Order
                        </button>
                      ) : isCancelled ? (
                        <></>
                      ) : (
                        <>
                          <button className="px-5 py-2.5 rounded-full text-on-surface-variant bg-surface-container-low font-bold text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer">
                            <Receipt className="w-4 h-4" />
                            View Receipt
                          </button>

                          <button className="px-5 py-2.5 rounded-full text-on-surface-variant bg-surface-container-low font-bold text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2 cursor-pointer">
                            <Star className="w-4 h-4" />
                            Rate Order
                          </button>
                        </>
                      )}
                      <button
                        onClick={() =>
                          navigate(`/restaurant/${order.restaurant_id}`)
                        }
                        disabled={!!isCancelled}
                        className={`px-8 py-2.5 rounded-full bg-linear-to-br from-primary to-primary-container text-on-primary font-bold text-sm shadow-md transition-all flex items-center gap-2 ${isCancelled ? "cursor-not-allowed" : "cursor-pointer hover:shadow-lg active:scale-95"}`}
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          // EMPTY STATE
          <div className="text-center py-20 bg-surface-container-lowest rounded-3xl border border-outline-variant/10 flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary mb-6 shadow-sm">
              {searchQuery || activeFilters.length > 0 ? (
                <Search className="w-10 h-10" />
              ) : (
                <ListOrdered className="w-10 h-10" />
              )}
            </div>

            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-background mb-4">
              {searchQuery || activeFilters.length > 0
                ? "No orders found"
                : "Your Order List is Empty"}
            </h1>

            <p className="text-on-surface-variant font-medium mb-8 max-w-md">
              {searchQuery || activeFilters.length > 0
                ? "Try adjusting your filters or search term."
                : "No worries! Browse through our restaurants and find something that caters to your cravings."}
            </p>
          </div>
        )}
      </div>

      {/* Asymmetric Promotional Section (From Stitch) */}
      <section className="mt-20 relative bg-primary-container rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center shadow-lg">
        <div className="z-10 max-w-lg text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-primary-container leading-tight mb-4">
            Craving something new?
          </h2>
          <p className="text-on-primary-container/80 text-lg mb-8 font-medium">
            Discover our curated selection of top-rated foods and exclusive
            daily offers around you.
          </p>
          <button
            onClick={() => navigate("/Explore")}
            className="bg-surface-container-lowest text-primary font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:scale-95 cursor-pointer"
          >
            Browse Explores
          </button>
        </div>

        {/* Background blobs for style */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary opacity-20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2 w-64 md:w-96 transform rotate-12 mt-8 md:mt-0 shadow-2xl rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800"
            alt="Burger"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </main>
  );
};

export default OrderHistory;
