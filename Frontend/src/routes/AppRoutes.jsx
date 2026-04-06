import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/layouts/MainLayout";
import Home from "../pages/public/Home";
import RestaurantList from "../pages/public/sections/RestaurantSection";
import RestaurantDetails from "../pages/app/Restaurant/RestaurantDetails";
import Cart from "../pages/app/Cart";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Profile from "../pages/app/Profile";
import Checkout from "../pages/app/Checkout";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route
          path="/restaurants/:id/products"
          element={<RestaurantDetails />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
