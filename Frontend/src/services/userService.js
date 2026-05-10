import api from "../api/axios";

export const userService = {
  // Get User Profile & Dynamic Stats
  getProfile: async () => {
    const response = await api.get("/user");
    return response.data;
  },

  // Update Personal Information
  updateProfile: async (formData) => {
    const response = await api.post("/user/update", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },

  // Update Password
  updatePassword: async (formData) => {
    const response = await api.post("/user/password", formData);
    return response.data;
  },
};
