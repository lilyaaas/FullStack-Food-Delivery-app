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
      const { user, message } = await authService.register(userData);

      setUser(user);
      toast.success(message);

      if (onSuccess) onSuccess();
      
    } catch (error) {
      console.clear();
      const status = error.response?.status;

      if (status === 422) {
        toast.error("Unable to complete registration with these credentials..");
        return;
      }

      toast.error("Failed to create account. Please try again.");
      
    } finally { setIsLoading(false) }
  };

  return { registerUser, isLoading };
};
