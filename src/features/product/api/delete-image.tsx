import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { DeleteImageDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProductQueryOptions } from "./get-product";

type Options = {
  mutationConfig?: MutationConfig<typeof deleteImage>;
};

export const deleteImage = (dto: DeleteImageDto): Promise<void> => {
  return api.delete(
    `${import.meta.env.VITE_BASE_URL}/products/${dto.productId}/images/${
      dto.imageId
    }`
  );
};

export const useDeleteImage = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteImage,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductQueryOptions({ id: args[1].productId.toString() })
          .queryKey,
      });
      toast.success("Image deleted successfully");
      onSuccess?.(...args);
    },
  });
};
