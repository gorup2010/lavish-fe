import { logout } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async () => {
      logout();
    },
    onError: (error) => {
      console.log("Error in useLogout " + error);
    },
    onSuccess: () => {
      authContext.setAuth(undefined);
      return navigate("/login");
    },
  });
  return {
    logout: mutate,
    isSuccess,
    isPending,
    isError,
    errorMessage: error?.message,
    error,
  };
};
