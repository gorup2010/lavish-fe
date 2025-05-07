import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { DeleteCategoryDto } from "@/types/api";

type Options = {
  mutationConfig?: MutationConfig<typeof deleteCategory>;
};

export const deleteCategory = (dto: DeleteCategoryDto): Promise<void> => {
  return api.delete(
    `${import.meta.env.VITE_BASE_URL}/categories/${dto.id}`
  );
};

export const useDeleteCategory = ({ mutationConfig }: Options = {}) => {
  const navigate = useNavigate();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteCategory,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      navigate("/admin/categories");
      toast.success("Category deleted successfully");
      onSuccess?.(...args);
    },
  });
};
