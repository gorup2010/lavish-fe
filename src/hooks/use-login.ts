import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { LoginInput, loginWithEmailAndPassword } from '@/lib/auth';
import { useAuth } from '@/providers/AuthProvider';

export const useLogin = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: LoginInput) => {
      console.info(userData);
      const response = await loginWithEmailAndPassword(userData);
      return response;
    },
    onError: (error) => {
      console.log("Error in useLogin " + error);
    },
    onSuccess: (response) => {
      authContext.setAuth(response);
      return response;
    },
  });
  return {
    login: mutate,
    isSuccess,
    isPending,
    isError,
    errorMessage: error?.message,
    error,
  };
};