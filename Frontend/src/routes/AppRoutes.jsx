import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import {
  MainLayout,
  AuthLayout,
  RestaurantOwnerLayout,
} from "../layouts/index";
import { Login, Register } from "../pages/auth/index";
import Home from "../pages/public/Home";
import Cart from "../pages/app/cart/Cart";
import Checkout from "../pages/app/checkout/Checkout";
import AllRestaurants from "../pages/app/restaurant/AllRestaurants";
import RestaurantMenu from "../pages/app/restaurant/RestaurantMenu";
import Explore from "../pages/app/food/Explore";
import FoodPage from "../pages/app/food/FoodPage";
import OrderSuccess from "../pages/app/order/OrderSuccess";
import OrderHistory from "../pages/app/order/OrderHistory";
import Settings from "../pages/app/settings/user/Settings";

const AppRoutes = () => {
  return (
    <div className="selection:bg-primary-container selection:text-on-primary-container">
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Customer / Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/restaurants" element={<AllRestaurants />} />
          <Route path="/restaurant/:id" element={<RestaurantMenu />} />
          <Route path="/food/:id" element={<FoodPage />} />

          {/* Protected Customer Routes */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Protected Restaurant Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={["restaurant_owner"]} />}>
          <Route element={<RestaurantOwnerLayout />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
