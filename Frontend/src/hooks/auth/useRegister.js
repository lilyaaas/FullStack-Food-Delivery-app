import { useState } from "react";
import { toast } from "react-hot-toast";

import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const registerUser = async (userData, onSuccess) => {
    setIsLoading(true);

    try {
      const { success, message, user } = await authService.register(userData);

      if (!success) {
        toast.error(message);
        return;
      }

      setUser(user);
      toast.success(message);
      if (onSuccess) onSuccess();
    } catch {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, isLoading };
};
