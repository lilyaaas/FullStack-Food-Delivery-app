import api from "../api/axios";

export const orderService = {
  placeOrder: async (orderData) => {
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  getMyOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },
};
