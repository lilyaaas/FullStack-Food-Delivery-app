import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { MainLayout, AuthLayout } from "../layouts/index";
import { Login, Register } from "../pages/auth/index";
import Home from "../pages/public/Home";
import Cart from "../pages/app/cart/Cart";
import Checkout from "../pages/app/checkout/Checkout";
import AllRestaurants from "../pages/app/restaurant/AllRestaurants";
import RestaurantMenu from "../pages/app/restaurant/RestaurantMenu";
import Explore from "../pages/app/food/Explore";
import FoodPage from "../pages/app/food/FoodPage"

const AppRoutes = () => {
  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/restaurants" element={<AllRestaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/food/:id" element={<FoodPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
