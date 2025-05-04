import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { FileImageDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCategoryQueryOptions } from "./get-category";

type Options = {
  mutationConfig?: MutationConfig<typeof updateThumbnail>;
};

export const updateThumbnail = (fileImage: FileImageDto): Promise<void> => {
  const { id, ...body } = fileImage;
  const formData = new FormData();
  formData.append("image", body.image);
  return api.patch(
    `${import.meta.env.VITE_BASE_URL}/categories/${id}/thumbnail`,
    formData
  );
};

export const useUpdateThumbnail = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateThumbnail,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoryQueryOptions({ id: args[1].id.toString() })
          .queryKey,
      });
      toast.success("Thumbnail updated successfully");
      onSuccess?.(...args);
    },
  });
};
