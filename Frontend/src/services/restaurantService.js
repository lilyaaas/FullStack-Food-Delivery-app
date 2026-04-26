import api from "../api/axios";

export const restaurantService = {
  getAllRestaurants: async () => {
    const response = await api.get("/restaurants");
    return response.data;
  },

  createRestaurant: async (data) => {
    const response = await api.post("/restaurants", data);
    return response.data;
  },

  getRestaurantById: async (id) => {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  },
};
