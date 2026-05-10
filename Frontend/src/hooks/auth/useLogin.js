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
      const { success, message, user } = await authService.login(credentials);

      if (!success) {
        toast.error(message);
        return;
      }

      setUser(user);
      toast.success(message);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
