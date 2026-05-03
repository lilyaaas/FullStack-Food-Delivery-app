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

  // Get order details (status + message)
  getOrderDetails: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },
};
