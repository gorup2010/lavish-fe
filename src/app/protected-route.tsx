import { Navigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const authContext = useAuth();

  if (authContext === null) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
};
