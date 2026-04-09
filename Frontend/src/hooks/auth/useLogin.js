import { useState } from "react";
import { toast } from "react-hot-toast";

import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const login = async (credentials, onSuccess) => {
    setIsLoading(true);

    try {
      const { message, user } = await authService.login(credentials);

      setUser(user);
      toast.success(message);

      if (onSuccess) onSuccess();

    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 401 || status === 404) {
        toast.error(message);
        return;
      }

      if (status !== 422) {
        toast.error("Server error. Please try again later.");
        return;
      }

    } finally { setIsLoading(false) }
  };

  return { login, isLoading };
};
