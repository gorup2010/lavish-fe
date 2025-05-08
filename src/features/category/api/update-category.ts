import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateDetailsCategoryDto } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getCategoryQueryOptions } from "./get-category";

type Options = {
  mutationConfig?: MutationConfig<typeof updateCategory>;
};

export const updateCategory = (
  updateCategory: UpdateDetailsCategoryDto
): Promise<void> => {
  const { id, ...body } = updateCategory;

  return api.patch(`${import.meta.env.VITE_BASE_URL}/categories/${id}`, body);
};

export const useUpdateCategory = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: updateCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCategoryQueryOptions({ id: args[1].id.toString() }).queryKey,
      });
      toast.success("Category updated successfully");
      onSuccess?.(...args);
    },
  });
};