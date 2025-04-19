import { logout } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useLogout = () => {
  const authContext = useAuth();
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: () => {
      return logout();
    },
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      console.log("HHH");
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
