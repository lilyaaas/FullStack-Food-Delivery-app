import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";
import { clearCart } from "../../redux/slices/cartSlice";

export const useLogout = () => {
  const { setUser } = useAuth();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const { message } = await authService.logout();
      toast.success(message);
    } catch {
      console.clear();
      toast.error("An error occurred during logout");
    } finally {
      setUser(null);
      dispatch(clearCart());
    }
  };

  return { logout };
};
