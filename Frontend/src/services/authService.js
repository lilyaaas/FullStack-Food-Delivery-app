import api from "../api/axios";

export const authService = {
  // CSRF Protection
  initCsrf: async () =>
    await api.get(`${import.meta.env.VITE_BACKEND_URL}/sanctum/csrf-cookie`),

  login: async (credentials) => {
    await authService.initCsrf();
    const response = await api.post("/login", credentials);
    return response.data;
  },

  register: async (userData) => {
    await authService.initCsrf();
    const response = await api.post("/register", userData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },

  fetchUser: async () => {
    const response = await api.get("/user");
    return response.data;
  },
};
