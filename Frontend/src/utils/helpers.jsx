// Helper function to format date strings
export const formatDate = (dateString) => {
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Helper function to get status badge based on order status
export const getStatusBadge = (status) => {
    if (["pending", "accepted", "preparing", "on_way"].includes(status)) {
      return (
        <span className="px-4 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase">
          In Progress
        </span>
      );
    }
    if (status === "delivered") {
      return (
        <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
          Delivered
        </span>
      );
    }
    return (
      <span className="px-4 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase">
        Cancelled
      </span>
    );
  };
