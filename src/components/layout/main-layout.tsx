import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
