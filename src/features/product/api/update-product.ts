import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateDetailsProductDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProductQueryOptions } from "./get-product";

type Options = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const updateProduct = (
  updateProduct: UpdateDetailsProductDto
): Promise<void> => {
  const { id, ...body } = updateProduct;

  return api.patch(`${import.meta.env.VITE_BASE_URL}/products/${id}`, body);
};

export const useUpdateProduct = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateProduct,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductQueryOptions({ id: args[1].id.toString() }).queryKey,
      });
      toast.success("Product updated successfully");
      onSuccess?.(...args);
    },
  });
};
