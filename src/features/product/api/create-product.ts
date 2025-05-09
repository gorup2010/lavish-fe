import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type Options = {
  mutationConfig?: MutationConfig<typeof createProduct>;
};

export const createProduct = (productForm: FormData): Promise<void> => {
  return api.post(`${import.meta.env.VITE_BASE_URL}/products`, productForm);
};

export const useCreateProduct = ({ mutationConfig }: Options = {}) => {

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      toast.success("Product created successfully");
      onSuccess?.(...args);
    },
  });
};
