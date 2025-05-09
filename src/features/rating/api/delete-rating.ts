import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DeleteCommentDto } from "@/types/api";
import { getInfiniteRatingsQueryOptions } from "./get-ratings";

type Options = {
  mutationConfig?: MutationConfig<typeof deleteComment>;
};

export const deleteComment = (dto: DeleteCommentDto): Promise<void> => {
    console.log(dto);
  return api.delete(`${import.meta.env.VITE_BASE_URL}/ratings/${dto.commentId}`);
};

export const useDeleteComment = ({ mutationConfig }: Options = {}) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: deleteComment,
    onError: (error) => {
      toast.error(error.message);
    },
    ...restConfig,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getInfiniteRatingsQueryOptions({
          productId: args[1].productId,
        }).queryKey,
      });
      toast.success("Comment deleted successfully");
      onSuccess?.(...args);
    },
  });
};
