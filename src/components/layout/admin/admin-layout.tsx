import { FC, memo, Fragment } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import AdminSidebar from "./admin-sidebar";

const AdminLayout: FC = memo(() => {
  const { auth } = useAuth();

  if (auth === undefined || auth.roles.includes("ADMIN") === false) {
      return <Navigate to={"/login"} replace />;
  }

  return (
    <Fragment>
      <AdminSidebar />
      <div className="p-4 sm:ml-64 mt-16">
        <Outlet />
      </div>
    </Fragment>
  );
});

export default AdminLayout;
