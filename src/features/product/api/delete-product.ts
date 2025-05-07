import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { DeleteProductDto } from "@/types/api";

type Options = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const deleteProduct = (dto: DeleteProductDto): Promise<void> => {
  return api.delete(
    `${import.meta.env.VITE_BASE_URL}/products/${dto.id}`
  );
};

export const useDeleteProduct = ({ mutationConfig }: Options = {}) => {
  const navigate = useNavigate();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      navigate("/admin/products");
      toast.success("Product deleted successfully");
      onSuccess?.(...args);
    },
  });
};
