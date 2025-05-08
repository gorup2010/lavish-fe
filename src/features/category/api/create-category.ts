import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Options = {
  mutationConfig?: MutationConfig<typeof createCategory>;
};

export const createCategory = (categoryForm: FormData): Promise<void> => {
  return api.post(`${import.meta.env.VITE_BASE_URL}/categories`, categoryForm);
};

export const useCreateCategory = ({ mutationConfig }: Options = {}) => {

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      toast.success("Category created successfully");
      onSuccess?.(...args);
    },
  });
};
