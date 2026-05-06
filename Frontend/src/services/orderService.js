import api from "../api/axios";

export const orderService = {
  // Place a new Order
  placeOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // Get user orders (My Orders)
  getMyOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

  // Search orders by query text and optional status filter
  searchOrders: async (query = "", status = "") => {
    const params = {};
    if (query) params.q = query;
    if (status) params.status = status;
    const response = await api.get("/search", { params });
    return response.data;
  },

  // Get order details (status + message)
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
};
