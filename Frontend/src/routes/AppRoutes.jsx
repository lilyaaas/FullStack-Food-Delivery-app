import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import { MainLayout, AuthLayout } from "../layouts/index";
import { Login, Register } from "../pages/auth/index";
import Home from "../pages/public/Home";


const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
