import { useState, useCallback } from "react";
import { toast } from "react-hot-toast";

import { userService } from "../services/userService";
import { useAuth } from "../context/AuthContext";

export const useSettings = () => {
  const [isSaving, setIsSaving] = useState(false);
  const { setUser } = useAuth();

  // Fetch the current user profile and sync it into AuthContext
  const getProfile = useCallback(async () => {
    setIsSaving(true);
    try {
      const { user } = await userService.getProfile();
      setUser(user);
    } catch {
      toast.error("Server error. Please try again later.");
    } finally {
      setIsSaving(false);
    }
  }, [setUser]);

  // Update the user's personal information.
  const updateProfile = useCallback(
    async (formData, onSuccess) => {
      setIsSaving(true);
      try {
        const { success, message, user } =
          await userService.updateProfile(formData);

        if (!success) {
          toast.error(message);
          return;
        }

        setUser(user);
        toast.success(message);
        if (success) onSuccess(user);
      } catch {
        toast.error("Please try again later.");
      } finally {
        setIsSaving(false);
      }
    },
    [setUser],
  );

  // Update the user's password.
  const updatePassword = useCallback(async (passwordData, onSuccess) => {
    setIsSaving(true);
    try {
      const { success, message } =
        await userService.updatePassword(passwordData);

      if (!success) {
        toast.error(message);
        return;
      }

      toast.success(message);
      if (success) onSuccess();
    } catch {
      toast.error("Please try again later.");
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { getProfile, updateProfile, updatePassword, isSaving };
};
