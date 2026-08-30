import { Navigate, Outlet, useLocation } from "react-router-dom";

import { LoadingSpinner } from "../ui/index";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <LoadingSpinner LoadingText="Verifying Access... 🔐" />;

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  // If route requires specific roles, check if user has the right role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    if (user.role === "restaurant_owner") {
      return <Navigate to="/restaurant-owner/dashboard" replace />;
    }

    if (user.role === "customer") {
      return <Navigate to="/" replace />;
    }
  }

  // User is logged in and has the correct role -> Let them in!
  return <Outlet />;
};

export default ProtectedRoute;
