import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { RegisterInput, registerWithEmailAndPassword } from '@/lib/auth';

export const useRegister = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: async (userData: RegisterInput) => {
        const response = await registerWithEmailAndPassword(userData);
        return response;
      },
      onSuccess: () => {
        return navigate('/');
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