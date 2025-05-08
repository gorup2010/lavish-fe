import { useMutation } from '@tanstack/react-query';
import { LoginInput, loginWithEmailAndPassword } from '@/lib/auth';
import { useAuth } from '@/providers/AuthProvider';

export const useLogin = () => {
  const authContext = useAuth();
  // Dont need because of ProtectedRoute already direct to login
  // const navigate = useNavigate();

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: LoginInput) => {
      const response = await loginWithEmailAndPassword(userData);
      return response;
    },
    onError: (error) => {
      console.log(error);
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