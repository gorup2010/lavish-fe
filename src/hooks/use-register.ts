import { useMutation } from "@tanstack/react-query";

import { RegisterInput, registerWithEmailAndPassword } from "@/lib/auth";
import { useAuth } from "@/providers/AuthProvider";

export const useRegister = () => {
  const authContext = useAuth();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: RegisterInput) => {
      const response = await registerWithEmailAndPassword(userData);
      return response;
    },
    onSuccess: (response) => {
      authContext.setAuth(response);
      return response;
    },
  });
  return {
    register: mutate,
    isPending,
    isSuccess,
    isError,
    errorMessage: error?.message,
  };
};
