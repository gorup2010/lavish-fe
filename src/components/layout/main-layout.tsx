import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
      <footer className="h-20 border-t-2"></footer>
    </div>
  );
}

export default MainLayout;
