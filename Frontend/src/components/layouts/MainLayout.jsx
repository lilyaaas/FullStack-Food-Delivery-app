import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow pt-16 bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
