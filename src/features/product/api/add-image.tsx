import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileImageDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getProductQueryOptions } from "./get-product";

type Options = {
  mutationConfig?: MutationConfig<typeof addImage>;
};

export const addImage = (fileImage: FileImageDto): Promise<void> => {
  const { id, ...body } = fileImage;
  const formData = new FormData();
  formData.append("image", body.image);
  return api.post(
    `${import.meta.env.VITE_BASE_URL}/products/${id}/images`,
    formData
  );
};

export const useAddImage = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: addImage,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductQueryOptions({ id: args[1].id.toString() })
          .queryKey,
      });
      toast.success("Add image successfully");
      onSuccess?.(...args);
    },
  });
};
