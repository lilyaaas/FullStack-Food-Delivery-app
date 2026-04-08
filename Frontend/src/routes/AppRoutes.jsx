import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { MainLayout, AuthLayout } from "../layouts/index";
import { Login, Register } from "../pages/auth/index";
import Home from "../pages/public/Home";
import Cart from "../pages/app/cart/Cart";

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

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default AppRoutes;
