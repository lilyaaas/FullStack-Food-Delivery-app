import api from "../api/axios";

export const productService = {
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};