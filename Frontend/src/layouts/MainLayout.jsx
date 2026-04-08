import { Outlet } from "react-router-dom";

import { Navbar, Footer } from "../ui/index";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
